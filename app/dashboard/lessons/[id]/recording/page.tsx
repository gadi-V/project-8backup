import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "../../../../../lib/session";
import { getAuthorizedLessonById } from "../../../../../lib/lessons";

export default async function LessonRecordingPage(props: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const params = await props.params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?from=/dashboard/lessons/${params.id}/recording`);
  }

  const lesson = await getAuthorizedLessonById(params.id, user.id, user.role);

  if (!lesson) {
    redirect("/dashboard");
  }

  const recordingUrl = lesson.videoRecordingUrl;
  const title = lesson.title || "הקלטת שיעור";

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-400">
              צפייה מאובטחת
            </p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-slate-400">
              גישה מוגבלת למורה, לתלמיד ולמנהלי השיעור בלבד.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-slate-800"
          >
            חזרה לדשבורד
          </Link>
        </div>

        {recordingUrl ? (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
            <video
              className="aspect-video w-full bg-black"
              controls
              playsInline
              preload="metadata"
              src={recordingUrl}
            >
              הדפדפן שלך אינו תומך בנגן וידאו HTML5.
            </video>
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-12 text-center">
            <p className="text-lg font-bold text-amber-200">
              ההקלטה בתהליך עיבוד, אנא נסה שוב בעוד מספר דקות
            </p>
            <p className="mt-3 text-sm text-amber-100/70">
              ברגע שההקלטה תהיה מוכנה מ־Daily.co היא תופיע כאן אוטומטית.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
