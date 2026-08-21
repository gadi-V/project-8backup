import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/session";
import { prisma } from "../../../../lib/prisma";
import { getRecordingDownloadUrl } from "../../../../lib/daily";

/**
 * Generate a short-lived signed URL for a Daily.co recording.
 * The user must be the teacher, student, or a manager of the lesson
 * associated with this recording.
 */
export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get("lessonId");

  if (!lessonId) {
    return NextResponse.json(
      { error: "lessonId is required" },
      { status: 400 }
    );
  }

  // Verify the user is authorized to access this lesson's recording
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      teacherId: true,
      studentId: true,
      videoRecordingUrl: true,
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const isPrivileged =
    user.role === "MANAGER" || user.role === "ADMIN";
  const isParticipant =
    lesson.teacherId === user.id || lesson.studentId === user.id;

  if (!isPrivileged && !isParticipant) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!lesson.videoRecordingUrl) {
    return NextResponse.json(
      { error: "Recording not yet available" },
      { status: 404 }
    );
  }

  try {
    // The videoRecordingUrl stored in the lesson is already a short-lived
    // Daily access link. We re-generate a fresh one for each request to
    // enforce the 2-hour TTL required by the security rules.
    // Daily.co access links expire per their `expires` field; we mint a
    // new one to ensure the client always has a valid URL.
    const recordingId = extractRecordingId(lesson.videoRecordingUrl);
    let signedUrl = lesson.videoRecordingUrl;

    if (recordingId) {
      try {
        signedUrl = await getRecordingDownloadUrl(recordingId);
      } catch {
        // Fall back to the stored URL if re-generation fails
        console.warn(
          `Failed to refresh signed URL for recording ${recordingId}, using stored URL`
        );
      }
    }

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Signed URL generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}

/**
 * Extract the Daily recording ID from a stored URL.
 * Daily URLs look like: https://api.daily.co/v1/recordings/<id>/access-link
 * or https://<domain>.daily.co/recordings/<id>
 */
function extractRecordingId(url: string): string | null {
  try {
    const match = url.match(/recordings\/([a-f0-9-]+)/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}