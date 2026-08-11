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

type VideoRoomProps = {
  roomUrl: string;
  token: string;
};

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

/** Mic / camera only — never expose recording start/stop controls. */
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
      <button
        type="button"
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
        type="button"
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
  const [joinError, setJoinError] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .catch((err) => {
        console.warn("User denied or browser blocked media permissions:", err);
      });

    if (!roomUrl || !token) {
      setJoinError("חסרים פרטי חדר הווידאו");
      return;
    }

    const newCallObject = DailyIframe.createCallObject();
    setCallObject(newCallObject);
    setJoinError(null);

    newCallObject.join({ url: roomUrl, token }).catch((err) => {
      console.error("Daily join failed:", err);
      setJoinError("התחברות לחדר הווידאו נכשלה");
    });

    return () => {
      newCallObject.leave().catch(() => undefined);
      newCallObject.destroy();
    };
  }, [roomUrl, token]);

  if (joinError) {
    return (
      <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-slate-900 border border-slate-700 rounded-xl px-4">
        <span className="text-red-400 font-bold text-sm text-center">{joinError}</span>
      </div>
    );
  }

  if (!callObject) {
    return (
      <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-slate-900 border border-slate-700 rounded-xl">
        <span className="text-slate-500 font-bold text-sm animate-pulse">
          טוען ממשק וידאו...
        </span>
      </div>
    );
  }

  return (
    <DailyProvider callObject={callObject}>
      <div className="h-full w-full min-h-[200px]">
        <CallContainer />
      </div>
    </DailyProvider>
  );
}
