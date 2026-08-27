"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export type LessonRole = "STUDENT" | "TEACHER" | "ADMIN" | "MANAGER";

interface LessonRowLesson {
  id: string;
  title: string | null;
  scheduledAt: string;
  status: string;
  canceledById?: string;
  teacherId: string;
  appealStatus?: string;
  teacher: { id: string; name: string };
  student: { id: string; name: string };
}

interface AvailabilitySlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface LessonRowProps {
  lesson: LessonRowLesson;
  userRole: LessonRole;
  onRefresh: () => void;
}

type CancelResponse = {
  error?: string;
  message?: string;
};

type AppealResponse = {
  error?: string;
  success?: boolean;
};

type RescheduleResponse = {
  error?: string;
  success?: boolean;
  message?: string;
  newScheduledAt?: string;
};

type AvailabilityResponse = AvailabilitySlot[];

export default function LessonRow({ lesson, userRole, onRefresh }: LessonRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isAppealing, setIsAppealing] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedNewSlotId, setSelectedNewSlotId] = useState<string | null>(null);

  const isTeacher = userRole === "TEACHER";
  const canAppeal =
    isTeacher &&
    lesson.canceledById === lesson.teacherId &&
    (lesson.status === "CANCELLED" || lesson.status === "CANCELLED_LATE") &&
    lesson.appealStatus === "NONE";

  const handleAppeal = async () => {
    setIsAppealing(true);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}/appeal`, { method: "POST" });
      const data = (await res.json()) as AppealResponse;
      if (!res.ok) throw new Error(data.error || "הגשת הערעור נכשלה");
      toast.success("הערעור על הקנס הוגש בהצלחה");
      setIsMenuOpen(false);
      onRefresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בהגשת הערעור");
    } finally {
      setIsAppealing(false);
    }
  };

  const scheduledAtMs = new Date(lesson.scheduledAt).getTime();
  const isWithin24h = scheduledAtMs - Date.now() < TWENTY_FOUR_HOURS_MS;

  const warningMessage = isTeacher
    ? isWithin24h
      ? "אזהרה: יגרור קנס 15%. ננסה למצוא מחליף. להמשיך?"
      : "השיעור יבוטל והקרדיט יוחזר לתלמיד."
    : isWithin24h
      ? "אזהרה: הביטול הוא פחות מ-24 שעות. הקרדיט לא יוחזר."
      : "השיעור יבוטל והקרדיט יוחזר במלואו.";

  const peerLabel = isTeacher ? "תלמיד" : "מורה";
  const peerName = isTeacher ? lesson.student.name : lesson.teacher.name;
  const peerColorClass = isTeacher ? "text-indigo-300 mt-1" : "text-blue-300 mt-1";
  const liveButtonText = isTeacher ? "התחל שיעור בלייב" : "כניסה לשיעור בלייב";

  const openCancelModal = () => {
    setIsMenuOpen(false);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    if (isCancelling) return;
    setIsCancelModalOpen(false);
  };

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}/cancel`, { method: "POST" });
      const data = (await res.json()) as CancelResponse;
      if (!res.ok) throw new Error(data.error || "ביטול השיעור נכשל");
      toast.success(data.message || "השיעור בוטל בהצלחה");
      setIsCancelModalOpen(false);
      setIsMenuOpen(false);
      onRefresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בביטול שיעור");
    } finally {
      setIsCancelling(false);
    }
  };

  const openRescheduleModal = async () => {
    setIsMenuOpen(false);
    setSelectedNewSlotId(null);
    setIsRescheduleModalOpen(true);
    setIsSlotsLoading(true);
    try {
      // Fetch available slots for this lesson's teacher.
      const url =
        userRole === "STUDENT"
          ? `/api/availability?teacherId=${encodeURIComponent(lesson.teacherId)}`
          : "/api/availability";
      const res = await fetch(url);
      const data = (await res.json()) as AvailabilityResponse;
      if (!res.ok) throw new Error("שגיאה בטעינת השעות הפנויות");
      // Filter out the current lesson's slot and already-booked ones.
      const currentStart = new Date(lesson.scheduledAt).getTime();
      const free = data.filter((s) => {
        const sStart = new Date(s.startTime).getTime();
        return sStart !== currentStart;
      });
      setAvailableSlots(free);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בטעינת השעות");
      setIsRescheduleModalOpen(false);
    } finally {
      setIsSlotsLoading(false);
    }
  };

  const closeRescheduleModal = () => {
    if (isRescheduling) return;
    setIsRescheduleModalOpen(false);
    setSelectedNewSlotId(null);
  };

  const handleConfirmReschedule = async () => {
    if (!selectedNewSlotId) {
      toast.error("יש לבחור מועד חלופי");
      return;
    }
    setIsRescheduling(true);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newSlotId: selectedNewSlotId }),
      });
      const data = (await res.json()) as RescheduleResponse;
      if (!res.ok) throw new Error(data.error || "הזזת השיעור נכשלה");
      toast.success(data.message || "השיעור הוזז בהצלחה");
      setIsRescheduleModalOpen(false);
      onRefresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בהזזת השיעור");
    } finally {
      setIsRescheduling(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-4 text-xs gap-3">
      <div className="text-right">
        <div className="font-bold text-white">{lesson.title || "שיעור פרטי"}</div>
        <div className={peerColorClass}>
          {peerLabel}: {peerName}
        </div>
        <div className="text-slate-400 mt-0.5">
          {new Date(lesson.scheduledAt).toLocaleString("he-IL")}
        </div>
      </div>

      <div className="flex flex-col sm:items-end gap-2 relative">
        {(lesson.status === "SCHEDULED" || canAppeal) && (
          <div className="relative w-full flex justify-end">
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg w-8 h-8 flex items-center justify-center transition-all text-sm"
              aria-label="תפריט פעולות"
            >
              ⚙️
            </button>

            {isMenuOpen && (
              <div className="absolute end-0 top-full mt-1 z-30 min-w-[160px] bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                {canAppeal ? (
                  <button
                    type="button"
                    onClick={handleAppeal}
                    disabled={isAppealing}
                    className="w-full text-right px-3 py-2.5 text-[11px] font-bold text-red-400 hover:bg-slate-700 transition-all disabled:opacity-50"
                  >
                    {isAppealing ? "מגיש ערעור..." : "הגש ערעור על הקנס"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={openRescheduleModal}
                      className="w-full text-right px-3 py-2.5 text-[11px] font-bold text-blue-400 hover:bg-slate-700 transition-all border-b border-slate-700"
                    >
                      הזזת מועד שיעור 📅
                    </button>
                    <button
                      type="button"
                      onClick={openCancelModal}
                      className="w-full text-right px-3 py-2.5 text-[11px] font-bold text-red-400 hover:bg-slate-700 transition-all"
                    >
                      ביטול שיעור
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-center">
          {lesson.status}
        </span>

        {(lesson.status === "SCHEDULED" || lesson.status === "IN_PROGRESS") && (
          <a
            href={`/lessons/${lesson.id}`}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all"
          >
            {liveButtonText}
          </a>
        )}
      </div>

      {/* Cancel modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 text-right shadow-2xl">
            <h3 className="text-base font-black text-white">ביטול שיעור</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{warningMessage}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={isCancelling}
                onClick={closeCancelModal}
                className="text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-50"
              >
                ביטול
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className={`text-xs font-bold py-2.5 px-4 rounded-xl text-white transition-all ${
                  isWithin24h && isTeacher
                    ? "bg-amber-600 hover:bg-amber-500"
                    : "bg-red-600 hover:bg-red-500"
                } disabled:opacity-50`}
              >
                {isCancelling ? "מבטל..." : "אישור ביטול"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule modal */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 text-right shadow-2xl">
            <div>
              <h3 className="text-base font-black text-white">הזזת מועד שיעור</h3>
              <p className="text-xs text-slate-400 mt-1">
                בחרו מועד חלופי מהשעות הפנויות של המורה. השיעור יישמר ללא קנס ביטול.
              </p>
            </div>

            {isSlotsLoading ? (
              <p className="text-xs text-slate-400">טוען שעות פנויות...</p>
            ) : availableSlots.length === 0 ? (
              <p className="text-xs text-slate-400">
                אין שעות פנויות זמינות כרגע. ניתן לבטל את השיעור או לנסות שוב מאוחר יותר.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedNewSlotId(slot.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-xl border transition-all text-xs font-bold ${
                      selectedNewSlotId === slot.id
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500/50"
                    }`}
                  >
                    {new Date(slot.startTime).toLocaleString("he-IL", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {selectedNewSlotId === slot.id && (
                      <span className="ms-2 text-blue-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                disabled={isRescheduling}
                onClick={closeRescheduleModal}
                className="text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-50"
              >
                ביטול
              </button>
              <button
                type="button"
                disabled={isRescheduling || !selectedNewSlotId}
                onClick={handleConfirmReschedule}
                className="text-xs font-bold py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-all"
              >
                {isRescheduling ? "מזיז..." : "אישור הזזה"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
