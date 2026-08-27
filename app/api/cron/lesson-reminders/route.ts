import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
import { sendLessonReminderNotification } from "../../../../lib/whatsapp";

/**
 * Cron endpoint: sends WhatsApp reminders for lessons starting in 15–20 minutes.
 * Called by Vercel Cron, external scheduler, or manual trigger.
 * Protected by Authorization: Bearer <CRON_API_KEY> (constant-time compare).
 */
export async function GET(request: Request) {
  if (!validateCronAuthorization(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);
    const twentyMinutesFromNow = new Date(now.getTime() + 20 * 60 * 1000);

    const upcomingLessons = await prisma.lesson.findMany({
      where: {
        scheduledAt: {
          gte: fifteenMinutesFromNow,
          lte: twentyMinutesFromNow,
        },
        reminderSent: false,
        status: "SCHEDULED",
      },
      select: {
        id: true,
        title: true,
        scheduledAt: true,
        student: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        teacher: {
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
        console.log(`[Cron] Sending reminder for lesson ${lesson.id}`);

        await Promise.all([
          sendLessonReminderNotification({
            phone: lesson.student.phone,
            recipientName: lesson.student.name,
            lessonId: lesson.id,
            startTime: lesson.scheduledAt,
          }),
          sendLessonReminderNotification({
            phone: lesson.teacher.phone,
            recipientName: lesson.teacher.name,
            lessonId: lesson.id,
            startTime: lesson.scheduledAt,
          }),
        ]);

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
 * Constant-time API key validation via Authorization Bearer header.
 */
function validateCronAuthorization(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;

  const input = authHeader.slice("Bearer ".length).trim();
  if (!input) return false;

  const secret = process.env.CRON_API_KEY;
  if (!secret) {
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
