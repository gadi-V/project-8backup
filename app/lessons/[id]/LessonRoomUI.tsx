"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import type { Channel as StreamChannelType } from "stream-chat";
import ClassroomWhiteboard, {
  ClassroomWhiteboardRef,
} from "../../../components/ClassroomWhiteboard";
import ClassroomChat from "../../../components/ClassroomChat";
import VideoRoom from "../../../components/VideoRoom";
import RatingModal from "../../../components/RatingModal";

interface LessonRoomUIProps {
  lesson: {
    id: string;
    title: string | null;
    status: string;
    roomUrl: string | null;
    dailyToken: string | null;
    streamToken: string | null;
    streamApiKey: string | null;
    scheduledAt: string;
    createdAt: string;
    durationMinutes: number | null;
    chatChannel?: {
      streamChannelId: string;
    } | null;
  };
  user: {
    id: string;
    name: string;
    role: "STUDENT" | "TEACHER" | "ADMIN" | "MANAGER";
  };
}

export default function LessonRoomUI({ lesson, user }: LessonRoomUIProps) {
  const router = useRouter();
  const whiteboardRef = useRef<ClassroomWhiteboardRef>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [boardChannel, setBoardChannel] = useState<StreamChannelType | null>(
    null
  );

  const handleChannelReady = useCallback(
    (channel: StreamChannelType | null) => {
      setBoardChannel(channel);
    },
    []
  );

  // Lock in the instant the teacher/student entered the room.
  // A ref prevents re-renders; the state tracks only the derived elapsed seconds.
  const roomEntryMs = useRef(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - roomEntryMs.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleEndLesson = async () => {
    if (!whiteboardRef.current) return;

    setIsEnding(true);
    const endToast = toast.loading("מסיים את השיעור ומפיק סיכום PDF...");

    try {
      // Export all A4 pages → upload to storage → receive URL (or Blob fallback).
      const exportResult = await whiteboardRef.current.exportBoardToPdf(lesson.id);

      const formData = new FormData();
      formData.append("lessonId", lesson.id);

      if (typeof exportResult === "string") {
        // Storage URL returned by the export API — pass it so complete can skip re-upload.
        formData.append("pdfUrl", exportResult);
      } else if (exportResult instanceof Blob) {
        // Blob fallback (no lessonId or storage not configured).
        formData.append("pdfFile", exportResult, `lesson_${lesson.id}.pdf`);
      }

      const response = await fetch("/api/lessons/complete", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "שגיאה בסיום השיעור");
      }

      toast.success("השיעור הסתיים בהצלחה! סיכום יישלח בוואטסאפ.", {
        id: endToast,
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "שגיאה בתהליך הסיום";
      toast.error(message, { id: endToast });
    } finally {
      setIsEnding(false);
    }
  };

  const handleRatingSubmit = async (rating: number, comment: string) => {
    const res = await fetch(`/api/lessons/${lesson.id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, reviewComment: comment }),
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      throw new Error(data.error ?? "שגיאה בשמירת הדירוג");
    }
    router.push("/dashboard");
  };

  const handleLeaveAndRate = () => {
    setShowRating(true);
  };

  const streamChannelId = lesson.chatChannel?.streamChannelId ?? null;
  const chatReady =
    Boolean(lesson.streamApiKey) &&
    Boolean(lesson.streamToken) &&
    Boolean(streamChannelId);

  return (
    <div
      className="h-[100dvh] min-h-0 bg-slate-900 flex flex-col overflow-hidden"
      dir="rtl"
    >
      {showRating && (
        <RatingModal
          lessonId={lesson.id}
          onSubmit={handleRatingSubmit}
          onSkip={() => router.push("/dashboard")}
        />
      )}

      <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-black text-lg">
            {lesson.title || "כיתה וירטואלית"}
          </h1>
          <div className="bg-slate-900 px-3 py-1 rounded-lg text-emerald-400 font-mono text-sm font-bold border border-slate-700">
            {formatTime(elapsed)}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm font-bold hidden sm:inline">
            מחובר כ: {user.name}
          </span>

          {user.role === "STUDENT" && (
            <button
              type="button"
              onClick={handleLeaveAndRate}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all text-sm"
            >
              עזוב ודרג
            </button>
          )}

          {(user.role === "TEACHER" ||
            user.role === "MANAGER" ||
            user.role === "ADMIN") && (
            <button
              type="button"
              onClick={handleEndLesson}
              disabled={isEnding}
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all disabled:opacity-50 text-sm"
            >
              {isEnding ? "מסיים..." : "סיום שיעור"}
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <main className="flex-1 relative bg-slate-100 p-2 min-h-0">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
            <ClassroomWhiteboard
              ref={whiteboardRef}
              role={user.role}
              streamChannel={boardChannel}
            />
          </div>
        </main>

        <aside className="w-full max-w-sm sm:w-96 flex flex-col border-r border-slate-800 bg-slate-900 shrink-0 p-2 gap-2 overflow-y-auto">
          <div className="h-64 rounded-2xl overflow-hidden shrink-0 border border-slate-800 bg-black">
            <VideoRoom roomUrl={lesson.roomUrl} token={lesson.dailyToken} />
          </div>

          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-white min-h-[240px]">
            {chatReady ? (
              <ClassroomChat
                apiKey={lesson.streamApiKey!}
                userToken={lesson.streamToken!}
                userId={user.id}
                firstName={user.name.split(" ")[0]}
                channelId={streamChannelId!}
                onChannelReady={handleChannelReady}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4">
                <span className="text-slate-500 font-bold text-sm text-center">
                  הצ&apos;אט עדיין לא מוכן. ודא ש־Stream מוגדר ושהשיעור נוצר
                  מחדש.
                </span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}