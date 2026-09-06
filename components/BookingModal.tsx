"use client";

import { frostCard, primaryCta, secondaryCta } from "../lib/ui";

export interface BookingModalSlot {
  id: string;
  startTime: string;
  endTime: string;
  teacherName: string;
}

interface BookingModalProps {
  slot: BookingModalSlot;
  busy?: boolean;
  onConfirm: (slotId: string) => void;
  onClose: () => void;
}

export default function BookingModal({
  slot,
  busy = false,
  onConfirm,
  onClose,
}: BookingModalProps) {
  const start = new Date(slot.startTime);
  const dateLabel = start.toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeLabel = start.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className={`${frostCard} p-6 max-w-md w-full space-y-4 text-start shadow-lg`}>
        <div>
          <h3 id="booking-modal-title" className="text-base font-semibold text-neutral-900">
            אישור שיבוץ שיעור
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            משבצת של 60 דקות · השיעור עצמו 50 דקות
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex justify-between gap-3">
            <span className="text-neutral-500 font-medium">מורה</span>
            <span className="text-neutral-900 font-semibold">{slot.teacherName}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-neutral-500 font-medium">תאריך</span>
            <span className="text-neutral-700 font-medium">{dateLabel}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-neutral-500 font-medium">שעה</span>
            <span className="text-neutral-900 font-mono font-semibold">{timeLabel}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className={secondaryCta}
          >
            ביטול
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onConfirm(slot.id)}
            className={primaryCta}
          >
            {busy ? "משבץ..." : "קבע שיעור"}
          </button>
        </div>
      </div>
    </div>
  );
}
