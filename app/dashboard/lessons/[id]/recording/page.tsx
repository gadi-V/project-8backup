import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "../../../../../lib/session";
import { getAuthorizedLessonById } from "../../../../../lib/lessons";
import {
  emptyState,
  eyebrow,
  pageCanvas,
  secondaryCta,
} from "../../../../../lib/ui";
import RecordingPlayer from "./RecordingPlayer";

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

  const hasRecording = Boolean(lesson.videoRecordingUrl);
  const title = lesson.title || "הקלטת שיעור";

  return (
    <div className={pageCanvas} dir="rtl">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className={eyebrow}>צפייה מאובטחת</p>
            <h1 className="mt-1 text-2xl font-semibold text-neutral-900 sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-neutral-500">
              גישה מוגבלת למורה, לתלמיד ולמנהלי השיעור בלבד.
            </p>
          </div>
          <Link href="/dashboard" className={secondaryCta}>
            חזרה לדשבורד
          </Link>
        </div>

        {hasRecording ? (
          <RecordingPlayer lessonId={lesson.id} />
        ) : (
          <div className={emptyState}>
            <p className="text-lg font-semibold text-neutral-900">
              ההקלטה בתהליך עיבוד
            </p>
            <p className="text-sm text-neutral-500">
              אנא נסו שוב בעוד מספר דקות. ברגע שההקלטה תהיה מוכנה מ־Daily.co היא תופיע כאן.
            </p>
            <Link href="/dashboard" className={`${secondaryCta} inline-block`}>
              חזרה לדשבורד
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
