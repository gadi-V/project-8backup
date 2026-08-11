import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";
import { writeAuditLog } from "../../../../lib/audit";
import { uploadLessonPdf } from "../../../../lib/storage";
import { sendLessonSummaryNotification } from "../../../../lib/whatsapp";

function appBaseUrl(): string {
  return (
    process.env.APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://app.project8.co.il"
  );
}

/** Strip contact fields so phones/emails are never returned to callers. */
function publicUser<T extends { phone?: string; email?: string | null }>(
  user: T
): Omit<T, "phone" | "email"> {
  const { phone: _phone, email: _email, ...safe } = user;
  return safe;
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["TEACHER", "MANAGER", "ADMIN"]);
    if (auth.error) return auth.error;

    const formData = await request.formData();
    const lessonId = formData.get("lessonId") as string;
    // Intentionally ignore any client-supplied videoRecordingUrl —
    // recording URLs come exclusively from the Daily webhook.
    const pdfFile = formData.get("pdfFile") as File | null;

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, teacherId: true, status: true },
    });

    if (!lesson) {
      return NextResponse.json({ error: "השיעור לא נמצא" }, { status: 404 });
    }

    const isPrivileged = auth.user.role === "MANAGER" || auth.user.role === "ADMIN";
    const isLessonTeacher =
      auth.user.role === "TEACHER" && lesson.teacherId === auth.user.id;

    if (!isPrivileged && !isLessonTeacher) {
      return NextResponse.json(
        { error: "אין לך הרשאה לסיים שיעור זה" },
        { status: 403 }
      );
    }

    // Idempotent: already completed — return success without re-sending notifications.
    if (lesson.status === "COMPLETED") {
      const existing = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { student: true, teacher: true },
      });
      return NextResponse.json({
        success: true,
        message: "השיעור כבר סומן כהושלם.",
        alreadyCompleted: true,
        lesson: existing
          ? {
              ...existing,
              student: publicUser(existing.student),
              teacher: publicUser(existing.teacher),
            }
          : null,
      });
    }

    let uploadedPdfUrl: string | null = null;
    let pdfBuffer: Buffer | null = null;
    if (pdfFile) {
      pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
      try {
        uploadedPdfUrl = await uploadLessonPdf(lessonId, pdfBuffer);
      } catch (uploadError) {
        console.error("Board PDF upload failed:", uploadError);
        uploadedPdfUrl = null;
      }
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        status: "COMPLETED",
        ...(uploadedPdfUrl ? { excalidrawPdfUrl: uploadedPdfUrl } : {}),
        // Never write videoRecordingUrl from the client — Daily webhook owns that field.
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    const videoStreamingUrl = `${appBaseUrl()}/dashboard/lessons/${lessonId}/recording`;

    const managers = await prisma.user.findMany({
      where: { role: { in: ["MANAGER", "ADMIN"] } },
      select: { id: true, name: true, phone: true },
    });

    const summaryRecipients = [
      { phone: updatedLesson.student.phone, userName: updatedLesson.student.name },
      ...managers.map((manager) => ({ phone: manager.phone, userName: manager.name })),
    ];

    const notificationResults = await Promise.allSettled(
      summaryRecipients.map((recipient) =>
        sendLessonSummaryNotification({
          phone: recipient.phone,
          userName: recipient.userName,
          pdfBuffer,
          videoStreamingUrl,
        })
      )
    );

    const failedNotifications = notificationResults.filter(
      (r) => r.status === "rejected"
    ).length;
    if (failedNotifications > 0) {
      console.error(
        `WhatsApp summary: ${failedNotifications}/${summaryRecipients.length} notifications failed`
      );
    }

    await writeAuditLog({
      actorId: auth.user.id,
      action: "LESSON_COMPLETED",
      entityType: "Lesson",
      entityId: lessonId,
      metadata: {
        pdfStored: Boolean(uploadedPdfUrl),
        recipients: summaryRecipients.length,
        failedNotifications,
      },
    });

    return NextResponse.json({
      success: true,
      message: "השיעור הסתיים, הנתונים נשמרו והודעות הווטסאפ נשלחו.",
      lesson: {
        ...updatedLesson,
        student: publicUser(updatedLesson.student),
        teacher: publicUser(updatedLesson.teacher),
      },
    });
  } catch (error) {
    console.error("Complete Lesson Error:", error);
    return NextResponse.json({ error: "שגיאה פנימית בסיום השיעור" }, { status: 500 });
  }
}
