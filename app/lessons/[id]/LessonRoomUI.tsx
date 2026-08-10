"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ClassroomWhiteboard, { ClassroomWhiteboardRef } from "../../../components/ClassroomWhiteboard";
import ClassroomChat from "../../../components/ClassroomChat";
import VideoRoom from "../../../components/VideoRoom";

interface LessonRoomUIProps {
  lesson: {
    id: string;
    title: string | null;
    status: string;
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

  // טיימר פשוט לזמן השיעור
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
      // 1. קבלת ה-PDF מהלוח
      const pdfBlob = await whiteboardRef.current.exportBoardToPdf();
      
      // 2. הכנת הנתונים לשליחה (כ-FormData)
      const formData = new FormData();
      formData.append("lessonId", lesson.id);
      
      // בדרך כלל Daily ישלחו לנו Webhook עם הוידאו, אבל אנחנו נשלח כאן דמה
      formData.append("videoRecordingUrl", "https://daily.co/mock-recording-link");
      
      if (pdfBlob) {
        formData.append("pdfFile", pdfBlob, `lesson_${lesson.id}.pdf`);
      }

      // 3. קריאה ל-API של סיום השיעור
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
    } catch (err: any) {
      toast.error(err.message || "שגיאה בתהליך הסיום", { id: endToast });
    } finally {
      setIsEnding(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col" dir="rtl">
      {/* סרגל עליון */}
      <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-black text-lg">
            {lesson.title || "כיתה וירטואלית"}
          </h1>
          <div className="bg-slate-900 px-3 py-1 rounded-lg text-emerald-400 font-mono text-sm font-bold border border-slate-700">
            {formatTime(elapsedTime)}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm font-bold">מחובר כ: {user.name}</span>
          
          {/* כפתור סיום שיעור מופיע רק למורה או למנהל */}
          {(user.role === "TEACHER" || user.role === "MANAGER" || user.role === "ADMIN") && (
            <button
              onClick={handleEndLesson}
              disabled={isEnding}
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all disabled:opacity-50 text-sm"
            >
              {isEnding ? "מסיים..." : "סיום שיעור"}
            </button>
          )}
        </div>
      </header>

      {/* אזור מרכזי (Split View) */}
      <div className="flex-1 flex overflow-hidden">
        {/* לוח מחיק - אזור מרכזי (תופס את רוב המקום) */}
        <main className="flex-1 relative bg-slate-100 p-2">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
            <ClassroomWhiteboard ref={whiteboardRef} />
          </div>
        </main>

        {/* סרגל צדדי (וידאו + צ'אט) */}
        <aside className="w-96 flex flex-col border-r border-slate-800 bg-slate-900 shrink-0 p-2 gap-2 overflow-y-auto">
          {/* שיחת וידאו - חלק עליון */}
          <div className="h-64 rounded-2xl overflow-hidden shrink-0 border border-slate-800 bg-black">
            <VideoRoom 
              roomUrl="https://mock-domain.daily.co/mock-room" 
              // token="" 
            />
          </div>

          {/* צ'אט מוגן - חלק תחתון */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-white">
            <ClassroomChat
              apiKey={process.env.NEXT_PUBLIC_STREAM_API_KEY || "mock-api-key"}
              userToken="mock-token" // בעולם האמיתי יש לייצר Token בשרת
              userId={user.id}
              firstName={user.name.split(" ")[0]}
              channelId={lesson.chatChannel?.streamChannelId || `lesson_${lesson.id}`}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}