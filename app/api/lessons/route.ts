import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/api-auth";
import {
  createDailyRoom,
  dailyRoomNameForLesson,
  deleteDailyRoom,
  generateDailyToken,
  roomNameFromDailyUrl,
} from "../../../lib/daily";
import {
  createStreamChannel,
  generateStreamToken,
} from "../../../lib/stream";

async function attachLessonCredentials<
  T extends {
    id: string;
    dailyRoomUrl: string | null;
    teacherId: string;
    chatChannel?: { streamChannelId: string } | null;
  },
>(lesson: T, userId: string, role: string) {
  const roomUrl = lesson.dailyRoomUrl;
  let dailyToken: string | null = null;
  let streamToken: string | null = null;

  if (roomUrl) {
    const roomName =
      roomNameFromDailyUrl(roomUrl) ?? dailyRoomNameForLesson(lesson.id);
    const isOwner = role === "TEACHER" || role === "MANAGER" || role === "ADMIN";

    try {
      dailyToken = await generateDailyToken(roomName, isOwner, userId);
    } catch (error) {
      console.error(`Daily token generation failed for lesson ${lesson.id}:`, error);
    }
  }

  try {
    streamToken = generateStreamToken(userId);
  } catch (error) {
    console.error(`Stream token generation failed for user ${userId}:`, error);
  }

  return {
    ...lesson,
    roomUrl,
    dailyToken,
    streamToken,
    streamChannelId: lesson.chatChannel?.streamChannelId ?? null,
  };
}

/**
 * Full booking compensation: restore credits/slot, delete lesson rows,
 * and tear down any Daily room that may have been provisioned.
 */
async function compensateBooking(
  lessonId: string,
  slotId: string,
  studentId: string,
  dailyRoomName?: string | null
) {
  try {
    if (dailyRoomName) {
      await deleteDailyRoom(dailyRoomName);
    }
  } catch (error) {
    console.error(`Failed to delete Daily room ${dailyRoomName} during compensate:`, error);
  }

  await prisma.$transaction(async (tx) => {
    await tx.chatChannel.deleteMany({ where: { lessonId } });
    await tx.lesson.deleteMany({ where: { id: lessonId } });
    await tx.teacherAvailability.update({
      where: { id: slotId },
      data: { isBooked: false },
    });
    await tx.user.update({
      where: { id: studentId },
      data: { lessonCredits: { increment: 1 } },
    });
  });
}

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT", "TEACHER", "MANAGER", "ADMIN"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("id");

    // Single-lesson join credentials (Daily + Stream)
    if (lessonId) {
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
          teacher: { select: { id: true, name: true } },
          student: { select: { id: true, name: true } },
          chatChannel: true,
        },
      });

      if (!lesson) {
        return NextResponse.json({ error: "השיעור לא נמצא" }, { status: 404 });
      }

      const allowed =
        auth.user.role === "MANAGER" ||
        auth.user.role === "ADMIN" ||
        (auth.user.role === "TEACHER" && lesson.teacherId === auth.user.id) ||
        (auth.user.role === "STUDENT" && lesson.studentId === auth.user.id);

      if (!allowed) {
        return NextResponse.json({ error: "אין לך הרשאה לשיעור זה" }, { status: 403 });
      }

      const withCreds = await attachLessonCredentials(
        lesson,
        auth.user.id,
        auth.user.role
      );

      return NextResponse.json(withCreds, { status: 200 });
    }

    const where =
      auth.user.role === "TEACHER"
        ? { teacherId: auth.user.id }
        : auth.user.role === "STUDENT"
          ? { studentId: auth.user.id }
          : {};

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        teacher: { select: { id: true, name: true } },
        student: { select: { id: true, name: true } },
        chatChannel: { select: { streamChannelId: true } },
      },
      orderBy: { scheduledAt: "asc" },
      take: 30,
    });

    const payload = lessons.map((lesson) => ({
      ...lesson,
      roomUrl: lesson.dailyRoomUrl,
      streamChannelId: lesson.chatChannel?.streamChannelId ?? null,
    }));

    return NextResponse.json(payload, { status: 200 });
  } catch (error: unknown) {
    console.error("Lessons GET Error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת השיעורים" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { slotId } = body;

    if (!slotId) {
      return NextResponse.json({ error: "מזהה חלון זמן הוא שדה חובה" }, { status: 400 });
    }

    // Atomic: credit check, overlap check, slot lock, lesson create
    let result: { lessonId: string; teacherId: string; studentId: string; newCredits: number };
    try {
      result = await prisma.$transaction(async (tx) => {
        const slot = await tx.teacherAvailability.findUnique({
          where: { id: slotId },
        });

        if (!slot) {
          throw Object.assign(new Error("SLOT_NOT_FOUND"), { status: 404 });
        }
        if (slot.isBooked) {
          throw Object.assign(new Error("SLOT_BOOKED"), { status: 400 });
        }

        const student = await tx.user.findUnique({
          where: { id: auth.user.id },
        });

        if (!student || student.role !== "STUDENT") {
          throw Object.assign(new Error("FORBIDDEN"), { status: 403 });
        }
        if (student.lessonCredits < 1) {
          throw Object.assign(new Error("NO_CREDITS"), { status: 400 });
        }

        const slotEnd = new Date(slot.endTime);
        const slotStartMinus50 = new Date(slot.startTime.getTime() - 50 * 60 * 1000);

        const studentOverlap = await tx.lesson.findFirst({
          where: {
            studentId: auth.user.id,
            status: "SCHEDULED",
            AND: [{ scheduledAt: { lt: slotEnd } }, { scheduledAt: { gt: slotStartMinus50 } }],
          },
        });

        if (studentOverlap) {
          throw Object.assign(new Error("OVERLAP"), { status: 400 });
        }

        const updatedStudent = await tx.user.update({
          where: { id: auth.user.id },
          data: { lessonCredits: { decrement: 1 } },
        });

        await tx.teacherAvailability.update({
          where: { id: slotId },
          data: { isBooked: true },
        });

        const newLesson = await tx.lesson.create({
          data: {
            teacherId: slot.teacherId,
            studentId: auth.user.id,
            scheduledAt: slot.startTime,
            status: "SCHEDULED",
            dailyRoomUrl: null,
          },
        });

        return {
          lessonId: newLesson.id,
          teacherId: newLesson.teacherId,
          studentId: newLesson.studentId,
          newCredits: updatedStudent.lessonCredits,
        };
      });
    } catch (txError: unknown) {
      const code =
        txError instanceof Error ? txError.message : "UNKNOWN";
      const status =
        typeof txError === "object" &&
        txError &&
        "status" in txError &&
        typeof (txError as { status: unknown }).status === "number"
          ? (txError as { status: number }).status
          : 500;

      const messages: Record<string, string> = {
        SLOT_NOT_FOUND: "חלון הזמן המבוקש לא נמצא במערכת",
        SLOT_BOOKED: "חלון זמן זה כבר נתפס על ידי סטודנט אחר",
        FORBIDDEN: "משתמש זה אינו מורשה לבצע שיבוץ סטודנטים",
        NO_CREDITS:
          "אין לך מספיק קרדיטים בחבילה. אנא רכוש חבילת שיעורים בדאשבורד כדי להשתבץ.",
        OVERLAP:
          "הנך משובץ כבר לשיעור אחר בטווח שעות זה. חפיפת זמנים חסומה (מינימום 50 דקות לשיעור).",
      };

      return NextResponse.json(
        { error: messages[code] ?? "שגיאה פנימית במנוע השיבוצים בזמן הריצה" },
        { status }
      );
    }

    const roomName = dailyRoomNameForLesson(result.lessonId);

    // 1) Daily room — compensate fully on failure
    let roomUrl: string | null = null;
    try {
      const room = await createDailyRoom(result.lessonId);
      roomUrl = room.url;

      await prisma.lesson.update({
        where: { id: result.lessonId },
        data: { dailyRoomUrl: room.url },
      });
    } catch (dailyError) {
      console.error("Daily room creation failed after booking:", dailyError);
      await compensateBooking(result.lessonId, slotId, result.studentId, roomName);
      return NextResponse.json(
        { error: "שיבוץ השיעור נכשל ביצירת חדר הווידאו. נסה שוב." },
        { status: 502 }
      );
    }

    // 2) Stream Chat channel — compensate DB + Daily room on failure
    let streamChannelId: string | null = null;
    try {
      const managers = await prisma.user.findMany({
        where: { role: { in: ["MANAGER", "ADMIN"] } },
        select: { id: true },
      });

      const memberIds = [
        result.teacherId,
        result.studentId,
        ...managers.map((m) => m.id),
      ];

      streamChannelId = await createStreamChannel(result.lessonId, memberIds);

      await prisma.chatChannel.create({
        data: {
          lessonId: result.lessonId,
          streamChannelId,
        },
      });
    } catch (streamError) {
      console.error("Stream channel creation failed after booking:", streamError);
      await compensateBooking(result.lessonId, slotId, result.studentId, roomName);
      return NextResponse.json(
        { error: "שיבוץ השיעור נכשל ביצירת ערוץ הצ'אט. נסה שוב." },
        { status: 502 }
      );
    }

    const lessonWithInfra = {
      id: result.lessonId,
      teacherId: result.teacherId,
      studentId: result.studentId,
      dailyRoomUrl: roomUrl,
      roomUrl,
      streamChannelId,
      chatChannel: { streamChannelId },
    };

    return NextResponse.json(
      {
        message: "השיעור שובץ בהצלחה וננעל בלוח הזמנים!",
        lesson: lessonWithInfra,
        newCredits: result.newCredits,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL BOOKING ENGINE ERROR:", error);
    return NextResponse.json({ error: "שגיאה פנימית במנוע השיבוצים בזמן הריצה" }, { status: 500 });
  }
}
