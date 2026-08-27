import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/api-auth";
import {
  computeSlotBounds,
  overlappingAvailabilityWhere,
} from "../../../lib/scheduling";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(["TEACHER", "STUDENT"]);
    if (auth.error) return auth.error;

    if (auth.user.role === "TEACHER") {
      if (!auth.user.isApproved) {
        return NextResponse.json({ error: "חשבון המורה טרם אושר" }, { status: 403 });
      }

      const slots = await prisma.teacherAvailability.findMany({
        where: { teacherId: auth.user.id },
        orderBy: { startTime: "asc" },
      });

      return NextResponse.json(slots, { status: 200 });
    }

    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get("teacherId");

    // STUDENT: open future slots from approved teachers only
    const slots = await prisma.teacherAvailability.findMany({
      where: {
        isBooked: false,
        startTime: { gte: new Date() },
        ...(teacherId ? { teacherId } : {}),
        teacher: {
          role: "TEACHER",
          isApproved: true,
        },
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            teacherProfile: {
              select: { subjects: true, ageGroups: true, bio: true },
            },
          },
        },
      },
      orderBy: { startTime: "asc" },
      take: 200,
    });

    return NextResponse.json(slots, { status: 200 });
  } catch (error) {
    console.error("Availability GET Error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת השעות" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth(["TEACHER"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const slotId = searchParams.get("id");

    if (!slotId) {
      return NextResponse.json({ error: "מזהה חלון הזמן חסר" }, { status: 400 });
    }

    const slot = await prisma.teacherAvailability.findFirst({
      where: { id: slotId, teacherId: auth.user.id },
    });

    if (!slot) {
      return NextResponse.json({ error: "חלון הזמן לא נמצא" }, { status: 404 });
    }

    if (slot.isBooked) {
      return NextResponse.json(
        { error: "לא ניתן להסיר שעה שכבר שובצה לשיעור" },
        { status: 409 }
      );
    }

    await prisma.teacherAvailability.delete({ where: { id: slotId } });

    return NextResponse.json({ message: "חלון הזמן הוסר מהיומן" }, { status: 200 });
  } catch (error) {
    console.error("Availability DELETE Error:", error);
    return NextResponse.json({ error: "שגיאה בהסרת השעה" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["TEACHER"]);
    if (auth.error) return auth.error;

    if (!auth.user.isApproved) {
      return NextResponse.json({ error: "חשבון המורה טרם אושר" }, { status: 403 });
    }

    const body = await request.json();
    const { startTime } = body;

    if (!startTime) {
      return NextResponse.json({ error: "שעת התחלה היא שדה חובה" }, { status: 400 });
    }

    const start = new Date(startTime);
    // Lesson content is 50 minutes; calendar block lock is 60 minutes (anti-collision).
    const { contentEnd, blockEnd } = computeSlotBounds(start);

    const overlappingSlot = await prisma.teacherAvailability.findFirst({
      where: overlappingAvailabilityWhere({
        teacherId: auth.user.id,
        start,
        blockEnd,
      }),
    });

    if (overlappingSlot) {
      return NextResponse.json(
        {
          error:
            "כבר הגדרת חלון זמן חופף ביומן בשעות אלו. אנא בחר שעה אחרת (נעילת 60 דקות למשבצת).",
        },
        { status: 400 }
      );
    }

    const newSlot = await prisma.teacherAvailability.create({
      data: {
        teacherId: auth.user.id,
        startTime: start,
        endTime: contentEnd,
        isBooked: false,
      },
    });

    return NextResponse.json({ message: "חלון הזמן ננעל ביומן", slot: newSlot }, { status: 201 });
  } catch (error: unknown) {
    console.error("Availability Overlap Error:", error);
    return NextResponse.json({ error: "שגיאה פנימית במהלך שמירת השעה" }, { status: 500 });
  }
}
