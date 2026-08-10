"use client";

import React, { useEffect, useState, useRef } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import {
  DailyProvider,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
  useParticipantIds,
  useDaily,
} from "@daily-co/daily-react";

/**
 * ---------------------------------------------------------------------------------
 * הערה חשובה למפתח השרת (API):
 * חדר ה-Daily אמור להיווצר בצד השרת עם מאפייני ההקלטה הבאים:
 * 
 * const room = await fetch('https://api.daily.co/v1/rooms', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
 *   },
 *   body: JSON.stringify({
 *     properties: {
 *       // 4. הקלטה אוטומטית: הגדרה שגורמת לשיעור להיות מוקלט ישירות בענן של Daily
 *       enable_recording: "cloud",
 *       auto_start_recording: true,
 *     },
 *   }),
 * });
 * ---------------------------------------------------------------------------------
 */

type VideoRoomProps = {
  roomUrl: string;
  token?: string;
};

// רכיב פנימי המציג וידאו של משתתף אחד בשיחה
const ParticipantTile = ({ id }: { id: string }) => {
  const videoTrack = useVideoTrack(id);
  const audioTrack = useAudioTrack(id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (videoRef.current && videoTrack?.persistentTrack) {
      videoRef.current.srcObject = new MediaStream([videoTrack.persistentTrack]);
    }
  }, [videoTrack]);

  useEffect(() => {
    if (audioRef.current && audioTrack?.persistentTrack) {
      audioRef.current.srcObject = new MediaStream([audioTrack.persistentTrack]);
    }
  }, [audioTrack]);

  return (
    <div className="relative bg-slate-800 rounded-xl overflow-hidden aspect-video sm:aspect-square md:aspect-video flex items-center justify-center">
      {videoTrack?.persistentTrack ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-slate-500 font-bold text-sm">מצלמה כבויה</div>
      )}
      <audio ref={audioRef} autoPlay />
    </div>
  );
};

// רכיב לשליטה על בקרות הווידאו והשמע (מיקרופון/מצלמה בלבד)
const Controls = () => {
  const localParticipant = useLocalParticipant();
  const daily = useDaily();

  if (!localParticipant || !daily) return null;

  const isAudioEnabled = localParticipant.audio;
  const isVideoEnabled = localParticipant.video;

  const toggleAudio = () => daily.setLocalAudio(!isAudioEnabled);
  const toggleVideo = () => daily.setLocalVideo(!isVideoEnabled);

  return (
    <div className="p-4 bg-slate-900 border-t border-slate-700 flex justify-center gap-4">
      {/* 2 + 3. בקרות מותרות: כפתורי מיקרופון ומצלמה בלבד. 
          אין כאן שום כפתור להתחלה/הפסקה של הקלטה! */}
      <button
        onClick={toggleAudio}
        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
          isAudioEnabled
            ? "bg-slate-700 text-white hover:bg-slate-600"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {isAudioEnabled ? "השתק מיקרופון" : "הפעל מיקרופון"}
      </button>

      <button
        onClick={toggleVideo}
        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
          isVideoEnabled
            ? "bg-slate-700 text-white hover:bg-slate-600"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {isVideoEnabled ? "כבה מצלמה" : "הפעל מצלמה"}
      </button>
    </div>
  );
};

// הרכיב הראשי המנהל את השיחה
const CallContainer = () => {
  const participantIds = useParticipantIds();

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-sm">
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
        {participantIds.map((id) => (
          <ParticipantTile key={id} id={id} />
        ))}
        {participantIds.length === 0 && (
          <div className="col-span-full h-full flex items-center justify-center text-slate-500 text-sm font-bold">
            ממתין למשתתפים...
          </div>
        )}
      </div>
      <Controls />
    </div>
  );
};

export default function VideoRoom({ roomUrl, token }: VideoRoomProps) {
  const [callObject, setCallObject] = useState<DailyCall | null>(null);

  useEffect(() => {
    // 1. בקשת הרשאות מצלמה ומיקרופון עם טעינת הרכיב (מניעת שגיאות שמע/וידאו כבויים בהמשך)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .catch((err) => {
        console.warn("User denied or browser blocked media permissions:", err);
      });

    if (!roomUrl) return;

    // יצירת אובייקט השיחה של Daily.co
    const newCallObject = DailyIframe.createCallObject();
    setCallObject(newCallObject);
    
    // התחברות לחדר בצורה בטוחה (אם יש טוקן תקין נעביר אותו, אחרת נתחבר כמשתמש רגיל)
    const joinOptions = typeof token === "string" && token.length > 0 ? { url: roomUrl, token } : { url: roomUrl };
    newCallObject.join(joinOptions);

    return () => {
      // עזיבה וניקוי המשאבים עם פירוק הרכיב
      newCallObject.leave();
      newCallObject.destroy();
    };
  }, [roomUrl, token]);

  if (!callObject) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center bg-slate-50 border border-slate-200 rounded-xl">
        <span className="text-slate-500 font-bold text-sm animate-pulse">
          טוען ממשק וידאו...
        </span>
      </div>
    );
  }

  return (
    <DailyProvider callObject={callObject}>
      {/* 1. לשונית קבועה של שיחת וידאו (האבא יעטוף ויתאים ב-Grid לצד הלוח המחיק) */}
      <div className="h-[600px] w-full max-w-xl mx-auto">
        <CallContainer />
      </div>
    </DailyProvider>
  );
}
