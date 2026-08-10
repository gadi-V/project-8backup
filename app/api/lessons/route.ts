import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/api-auth";

export async function GET() {
  try {
    const auth = await requireAuth(["STUDENT", "TEACHER"]);
    if (auth.error) return auth.error;

    const where =
      auth.user.role === "TEACHER"
        ? { teacherId: auth.user.id }
        : { studentId: auth.user.id };

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        teacher: { select: { id: true, name: true } },
        student: { select: { id: true, name: true } },
      },
      orderBy: { scheduledAt: "asc" },
      take: 30,
    });

    // Teachers must not see student contact beyond name (already limited)
    return NextResponse.json(lessons, { status: 200 });
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

    const slot = await prisma.teacherAvailability.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      return NextResponse.json({ error: "חלון הזמן המבוקש לא נמצא במערכת" }, { status: 404 });
    }

    if (slot.isBooked) {
      return NextResponse.json({ error: "חלון זמן זה כבר נתפס על ידי סטודנט אחר" }, { status: 400 });
    }

    const student = await prisma.user.findUnique({
      where: { id: auth.user.id },
    });

    if (!student || student.role !== "STUDENT") {
      return NextResponse.json({ error: "משתמש זה אינו מורשה לבצע שיבוץ סטודנטים" }, { status: 403 });
    }

    if (student.lessonCredits < 1) {
      return NextResponse.json(
        {
          error: "אין לך מספיק קרדיטים בחבילה. אנא רכוש חבילת שיעורים בדאשבורד כדי להשתבץ.",
        },
        { status: 400 }
      );
    }

    const slotStart = new Date(slot.startTime);
    const slotEnd = new Date(slot.endTime);
    const slotStartMinus50 = new Date(slotStart.getTime() - 50 * 60 * 1000);

    const studentOverlap = await prisma.lesson.findFirst({
      where: {
        studentId: auth.user.id,
        status: "SCHEDULED",
        AND: [{ scheduledAt: { lt: slotEnd } }, { scheduledAt: { gt: slotStartMinus50 } }],
      },
    });

    if (studentOverlap) {
      return NextResponse.json(
        {
          error:
            "הנך משובץ כבר לשיעור אחר בטווח שעות זה. חפיפת זמנים חסומה (מינימום 50 דקות לשיעור).",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
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
          zoomLink: null,
        },
      });

      return {
        lesson: newLesson,
        newCredits: updatedStudent.lessonCredits,
      };
    });

    return NextResponse.json(
      {
        message: "השיעור שובץ בהצלחה וננעל בלוח הזמנים!",
        lesson: result.lesson,
        newCredits: result.newCredits,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL BOOKING ENGINE ERROR:", error);
    return NextResponse.json({ error: "שגיאה פנימית במנוע השיבוצים בזמן הריצה" }, { status: 500 });
  }
}
