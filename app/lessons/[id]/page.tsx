import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session";
import { getAuthorizedLessonById } from "../../../lib/lessons";
import {
  dailyRoomNameForLesson,
  generateDailyToken,
  roomNameFromDailyUrl,
} from "../../../lib/daily";
import { generateStreamToken } from "../../../lib/stream";
import LessonRoomUI from "./LessonRoomUI";

export default async function LessonPage(props: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const params = await props.params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?from=/lessons/" + params.id);
  }

  const lesson = await getAuthorizedLessonById(params.id, user.id, user.role);

  // Strict RBAC: only the lesson's teacher, student, MANAGER, or ADMIN may enter.
  if (!lesson) {
    redirect("/dashboard");
  }

  const roomUrl = lesson.dailyRoomUrl;
  let dailyToken: string | null = null;
  let streamToken: string | null = null;

  if (roomUrl) {
    const roomName =
      roomNameFromDailyUrl(roomUrl) ?? dailyRoomNameForLesson(lesson.id);
    const isOwner =
      user.role === "TEACHER" ||
      user.role === "MANAGER" ||
      user.role === "ADMIN";

    try {
      dailyToken = await generateDailyToken(roomName, isOwner, user.id);
    } catch (error) {
      console.error("Failed to generate Daily meeting token:", error);
    }
  }

  try {
    streamToken = generateStreamToken(user.id);
  } catch (error) {
    console.error("Failed to generate Stream Chat token:", error);
  }

  const streamApiKey =
    process.env.NEXT_PUBLIC_STREAM_API_KEY || process.env.STREAM_API_KEY || null;

  return (
    <LessonRoomUI
      lesson={{
        id: lesson.id,
        title: lesson.title,
        status: lesson.status,
        roomUrl,
        dailyToken,
        streamToken,
        streamApiKey,
        scheduledAt: lesson.scheduledAt.toISOString(),
        createdAt: lesson.createdAt.toISOString(),
        chatChannel: lesson.chatChannel,
        durationMinutes: lesson.durationMinutes,
      }}
      user={{
        id: user.id,
        name: user.name,
        role: user.role,
      }}
    />
  );
}
