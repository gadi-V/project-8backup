import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
import { sendLessonReminderNotification } from "../../../../lib/whatsapp";

/**
 * Cron endpoint: sends WhatsApp reminders for lessons starting in ~15 minutes.
 * Called by Vercel Cron, external scheduler, or manual trigger.
 * Protected by a constant-time API key check.
 */
export async function GET(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (!validateCronApiKey(apiKey)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);

    const upcomingLessons = await prisma.lesson.findMany({
      where: {
        startTime: {
          gte: now,
          lte: fifteenMinutesFromNow,
        },
        reminderSent: false,
        status: "SCHEDULED",
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        scheduledAt: true,
        student: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
    });

    if (upcomingLessons.length === 0) {
      return NextResponse.json({ success: true, sent: 0 });
    }

    const results = await Promise.allSettled(
      upcomingLessons.map(async (lesson) => {
        // Masked logging — never log phone numbers
        console.log(`[Cron] Sending reminder for lesson ${lesson.id}`);

        await sendLessonReminderNotification({
          phone: lesson.student.phone,
          studentName: lesson.student.name,
          lessonId: lesson.id,
          startTime: lesson.startTime ?? lesson.scheduledAt,
        });

        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { reminderSent: true },
        });
      })
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    results
      .filter((r) => r.status === "rejected")
      .forEach((r) => {
        console.error(
          "[Cron] Reminder failed:",
          (r as PromiseRejectedResult).reason
        );
      });

    return NextResponse.json({
      success: true,
      sent: succeeded,
      failed,
      total: upcomingLessons.length,
    });
  } catch (error) {
    console.error("[Cron] Reminder error:", error);
    return NextResponse.json(
      { error: "Processing error" },
      { status: 500 }
    );
  }
}

/**
 * Constant-time API key validation to prevent timing attacks.
 */
function validateCronApiKey(input: string | null): boolean {
  if (!input) return false;
  const secret = process.env.CRON_API_KEY;
  if (!secret) {
    // In development without CRON_API_KEY, allow access for manual testing
    console.warn(
      "[Cron] CRON_API_KEY not set — allowing request in dev mode"
    );
    return process.env.NODE_ENV === "development";
  }
  const validKey = Buffer.from(secret);
  const testKey = Buffer.from(input);
  if (validKey.length !== testKey.length) return false;
  return crypto.timingSafeEqual(validKey, testKey);
}