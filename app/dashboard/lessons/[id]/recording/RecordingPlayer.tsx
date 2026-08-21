"use client";

import { useEffect, useState } from "react";

/**
 * Client component that fetches a short-lived signed URL for the recording
 * and renders the HTML5 video player. Never exposes the raw Daily.co URL.
 */
export default function RecordingPlayer({ lessonId }: { lessonId: string }) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchSignedUrl() {
      try {
        const res = await fetch(
          `/api/daily/signed-url?lessonId=${encodeURIComponent(lessonId)}`
        );
        if (cancelled) return;

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to get secure URL");
        }

        const data = await res.json();
        if (cancelled) return;
        setSignedUrl(data.url);
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load recording"
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSignedUrl();

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-black shadow-xl px-6 py-12 text-center">
        <p className="text-sm text-slate-400 animate-pulse">
          מאבטח את חיבור הצפייה...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-12 text-center">
        <p className="text-lg font-bold text-red-200">
          שגיאה בטעינת ההקלטה
        </p>
        <p className="mt-3 text-sm text-red-100/70">{error}</p>
      </div>
    );
  }

  if (!signedUrl) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-12 text-center">
        <p className="text-lg font-bold text-amber-200">
          ההקלטה בתהליך עיבוד, אנא נסה שוב בעוד מספר דקות
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
      <video
        className="aspect-video w-full bg-black"
        controls
        playsInline
        preload="metadata"
        src={signedUrl}
      >
        הדפדפן שלך אינו תומך בנגן וידאו HTML5.
      </video>
    </div>
  );
}