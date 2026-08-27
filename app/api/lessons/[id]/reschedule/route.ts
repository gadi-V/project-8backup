import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { requireAuth } from "../../../../../lib/api-auth";
import {
  createDailyRoom,
  dailyRoomNameForLesson,
  deleteDailyRoom,
  roomNameFromDailyUrl,
} from "../../../../../lib/daily";

const BLOCK_MS = 60 * 60 * 1000; // 60-minute calendar block per platform rules
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export async function POST(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id: lessonId } = await ctx.params;

    const auth = await requireAuth(["STUDENT", "TEACHER"]);
    if (auth.error) return auth.error;

    const body = (await request.json()) as { newSlotId?: string };
    const { newSlotId } = body;

    if (!newSlotId) {
      return NextResponse.json(
        { success: false, error: "יש לבחור שעה חלופית" },
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: "השיעור לא נמצא" },
        { status: 404 }
      );
    }

    const isLessonTeacher =
      auth.user.role === "TEACHER" && lesson.teacherId === auth.user.id;
    const isLessonStudent =
      auth.user.role === "STUDENT" && lesson.studentId === auth.user.id;

    if (!isLessonTeacher && !isLessonStudent) {
      return NextResponse.json(
        { success: false, error: "אין לך הרשאה להזיז שיעור זה" },
        { status: 403 }
      );
    }

    if (lesson.status !== "SCHEDULED") {
      return NextResponse.json(
        { success: false, error: "ניתן להזיז רק שיעורים מתוזמנים" },
        { status: 409 }
      );
    }

    // ── Policy: 24-hour advance notice required ────────────────────────────────
    const msUntilLesson = lesson.scheduledAt.getTime() - Date.now();
    if (msUntilLesson <= TWENTY_FOUR_HOURS_MS) {
      return NextResponse.json(
        {
          success: false,
          error:
            "לא ניתן לדחות שיעור בפחות מ-24 שעות ממועד ההתחלה. ניתן לבטל בכפוף למדיניות הביטול.",
        },
        { status: 422 }
      );
    }

    // ── Policy: single reschedule per lesson ───────────────────────────────────
    if (lesson.rescheduledCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "שיעור זה כבר הוזז פעם אחת ואינו ניתן לדחייה נוספת.",
        },
        { status: 422 }
      );
    }

    // New slot must belong to same teacher and be available.
    const newSlot = await prisma.teacherAvailability.findFirst({
      where: { id: newSlotId, teacherId: lesson.teacherId, isBooked: false },
    });

    if (!newSlot) {
      return NextResponse.json(
        { success: false, error: "השעה הנבחרת אינה זמינה" },
        { status: 409 }
      );
    }

    // ── Anti-collision: 60-minute block check for new slot ────────────────────
    // Two 60-min blocks [T, T+60) and [E, E+60) conflict when E ∈ (T−60, T+60).
    const newSlotStart = newSlot.startTime;
    const blockWindowStart = new Date(newSlotStart.getTime() - BLOCK_MS);
    const blockWindowEnd = new Date(newSlotStart.getTime() + BLOCK_MS);

    const teacherConflict = await prisma.lesson.findFirst({
      where: {
        id: { not: lessonId }, // exclude the lesson being rescheduled itself
        teacherId: lesson.teacherId,
        status: { in: ["SCHEDULED", "IN_PROGRESS"] },
        scheduledAt: { gt: blockWindowStart, lt: blockWindowEnd },
      },
    });

    if (teacherConflict) {
      return NextResponse.json(
        {
          success: false,
          error:
            "חלון ה-60 דקות של המועד החדש מתנגש עם שיעור קיים של המורה. בחר מועד אחר.",
        },
        { status: 409 }
      );
    }

    const studentConflict = await prisma.lesson.findFirst({
      where: {
        id: { not: lessonId },
        studentId: lesson.studentId,
        status: { in: ["SCHEDULED", "IN_PROGRESS"] },
        scheduledAt: { gt: blockWindowStart, lt: blockWindowEnd },
      },
    });

    if (studentConflict) {
      return NextResponse.json(
        {
          success: false,
          error:
            "חלון ה-60 דקות של המועד החדש מתנגש עם שיעור קיים של התלמיד. בחר מועד אחר.",
        },
        { status: 409 }
      );
    }

    // Find old backing availability slot (best-effort).
    const oldSlot = await prisma.teacherAvailability.findFirst({
      where: { teacherId: lesson.teacherId, startTime: lesson.scheduledAt },
    });

    // ── Atomic DB update ───────────────────────────────────────────────────────
    await prisma.$transaction(async (tx) => {
      if (oldSlot) {
        await tx.teacherAvailability.update({
          where: { id: oldSlot.id },
          data: { isBooked: false },
        });
      }

      await tx.teacherAvailability.update({
        where: { id: newSlotId },
        data: { isBooked: true },
      });

      await tx.lesson.update({
        where: { id: lessonId },
        data: {
          scheduledAt: newSlot.startTime,
          rescheduledCount: { increment: 1 },
        },
      });
    });

    // ── Daily.co room renewal (best-effort, non-blocking) ──────────────────────
    // Delete the old room and create a fresh one with the new scheduledAt so
    // the meeting token window aligns with the updated lesson time.
    let newRoomUrl: string | null = lesson.dailyRoomUrl;
    try {
      const oldRoomName = lesson.dailyRoomUrl
        ? roomNameFromDailyUrl(lesson.dailyRoomUrl)
        : null;

      if (oldRoomName) {
        await deleteDailyRoom(oldRoomName).catch((err: unknown) =>
          console.warn(`[reschedule] Could not delete old Daily room (non-fatal):`, err)
        );
      }

      const newRoom = await createDailyRoom(lessonId, {
        scheduledAt: newSlot.startTime,
        durationMinutes: lesson.durationMinutes ?? 50,
      });

      newRoomUrl = newRoom.url;

      await prisma.lesson.update({
        where: { id: lessonId },
        data: { dailyRoomUrl: newRoom.url },
      });
    } catch (dailyErr) {
      console.error(
        `[reschedule] Daily room renewal failed (non-fatal):`,
        dailyErr
      );
      // Lesson DB is already updated; room renewal failure is non-blocking.
    }

    // Fetch the room name for token generation hint.
    const updatedRoomName = newRoomUrl
      ? (roomNameFromDailyUrl(newRoomUrl) ?? dailyRoomNameForLesson(lessonId))
      : dailyRoomNameForLesson(lessonId);

    return NextResponse.json({
      success: true,
      data: {
        message: "השיעור הוזז בהצלחה למועד החדש",
        newScheduledAt: newSlot.startTime,
        dailyRoomUrl: newRoomUrl,
        dailyRoomName: updatedRoomName,
      },
    });
  } catch (error) {
    console.error("Lesson Reschedule Error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה פנימית בהזזת השיעור" },
      { status: 500 }
    );
  }
}
