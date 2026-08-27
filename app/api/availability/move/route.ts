import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";
import {
  computeSlotBounds,
  overlappingAvailabilityWhere,
} from "../../../../lib/scheduling";

/**
 * Atomically move an unbooked availability slot to a new 60-minute grid start.
 * Used by the interactive weekly calendar Drag & Drop.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["TEACHER"]);
    if (auth.error) return auth.error;

    if (!auth.user.isApproved) {
      return NextResponse.json({ error: "חשבון המורה טרם אושר" }, { status: 403 });
    }

    const body = (await request.json()) as { slotId?: string; startTime?: string };
    const { slotId, startTime } = body;

    if (!slotId || !startTime) {
      return NextResponse.json(
        { success: false, error: "חסרים מזהה משבצת או שעת יעד" },
        { status: 400 }
      );
    }

    const start = new Date(startTime);
    if (Number.isNaN(start.getTime())) {
      return NextResponse.json(
        { success: false, error: "שעת יעד לא תקינה" },
        { status: 400 }
      );
    }

    // Snap to hour boundary in local interpretation is done by the client;
    // server enforces 60-minute anti-collision against other slots.
    const { contentEnd, blockEnd } = computeSlotBounds(start);

    const existing = await prisma.teacherAvailability.findFirst({
      where: { id: slotId, teacherId: auth.user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "חלון הזמן לא נמצא" },
        { status: 404 }
      );
    }

    if (existing.isBooked) {
      return NextResponse.json(
        { success: false, error: "לא ניתן להזיז משבצת שכבר שובצה לשיעור" },
        { status: 409 }
      );
    }

    // Same start → no-op success.
    if (existing.startTime.getTime() === start.getTime()) {
      return NextResponse.json({
        success: true,
        data: { slot: existing, message: "המשבצת כבר במיקום זה" },
      });
    }

    const conflict = await prisma.teacherAvailability.findFirst({
      where: overlappingAvailabilityWhere({
        teacherId: auth.user.id,
        start,
        blockEnd,
        excludeSlotId: slotId,
      }),
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          error: "חלון ה-60 דקות ביעד חופף למשבצת קיימת. בחר שעה אחרת.",
        },
        { status: 409 }
      );
    }

    const updated = await prisma.teacherAvailability.update({
      where: { id: slotId },
      data: {
        startTime: start,
        endTime: contentEnd,
      },
    });

    return NextResponse.json({
      success: true,
      data: { slot: updated, message: "המשבצת הוזזה בהצלחה" },
    });
  } catch (error) {
    console.error("Availability move error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בהזזת המשבצת" },
      { status: 500 }
    );
  }
}
