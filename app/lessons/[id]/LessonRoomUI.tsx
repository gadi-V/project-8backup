"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import type { Channel as StreamChannelType } from "stream-chat";
import ClassroomWhiteboard, { ClassroomWhiteboardRef } from "../../../components/ClassroomWhiteboard";
import ClassroomChat from "../../../components/ClassroomChat";
import VideoRoom from "../../../components/VideoRoom";

interface LessonRoomUIProps {
  lesson: {
    id: string;
    title: string | null;
    status: string;
    roomUrl: string | null;
    dailyToken: string | null;
    streamToken: string | null;
    streamApiKey: string | null;
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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [boardChannel, setBoardChannel] = useState<StreamChannelType | null>(null);

  const handleChannelReady = useCallback((channel: StreamChannelType | null) => {
    setBoardChannel(channel);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleEndLesson = async () => {
    if (!whiteboardRef.current) return;

    setIsEnding(true);
    const endToast = toast.loading("מסיים את השיעור ומפיק סיכום PDF...");

    try {
      const pdfBlob = await whiteboardRef.current.exportBoardToPdf();

      const formData = new FormData();
      formData.append("lessonId", lesson.id);

      if (pdfBlob) {
        formData.append("pdfFile", pdfBlob, `lesson_${lesson.id}.pdf`);
      }

      const response = await fetch("/api/lessons/complete", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "שגיאה בסיום השיעור");
      }

      toast.success("השיעור הסתיים בהצלחה! סיכום יישלח בוואטסאפ.", { id: endToast });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "שגיאה בתהליך הסיום";
      toast.error(message, { id: endToast });
    } finally {
      setIsEnding(false);
    }
  };

  const streamChannelId = lesson.chatChannel?.streamChannelId ?? null;
  const chatReady =
    Boolean(lesson.streamApiKey) &&
    Boolean(lesson.streamToken) &&
    Boolean(streamChannelId);

  return (
    <div className="h-[100dvh] min-h-0 bg-slate-900 flex flex-col overflow-hidden" dir="rtl">
      <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-black text-lg">
            {lesson.title || "כיתה וירטואלית"}
          </h1>
          <div className="bg-slate-900 px-3 py-1 rounded-lg text-emerald-400 font-mono text-sm font-bold border border-slate-700">
            {formatTime(elapsedTime)}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm font-bold hidden sm:inline">
            מחובר כ: {user.name}
          </span>

          {(user.role === "TEACHER" || user.role === "MANAGER" || user.role === "ADMIN") && (
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
            {lesson.roomUrl && lesson.dailyToken ? (
              <VideoRoom roomUrl={lesson.roomUrl} token={lesson.dailyToken} />
            ) : (
              <div className="flex h-full items-center justify-center px-4">
                <span className="text-slate-400 font-bold text-sm text-center">
                  חדר הווידאו עדיין לא מוכן. ודא ש־DAILY_API_KEY מוגדר ושהשיעור נוצר מחדש.
                </span>
              </div>
            )}
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
                  הצ&apos;אט עדיין לא מוכן. ודא ש־Stream מוגדר ושהשיעור נוצר מחדש.
                </span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
