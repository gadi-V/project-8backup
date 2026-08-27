"use client";

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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 text-right shadow-2xl">
        <div>
          <h3 id="booking-modal-title" className="text-base font-black text-white">
            אישור שיבוץ שיעור
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            משבצת של 60 דקות · השיעור עצמו 50 דקות
          </p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-bold">מורה</span>
            <span className="text-white font-black">{slot.teacherName}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-bold">תאריך</span>
            <span className="text-slate-200 font-bold">{dateLabel}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-bold">שעה</span>
            <span className="text-blue-300 font-mono font-black">{timeLabel}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-50"
          >
            ביטול
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onConfirm(slot.id)}
            className="text-xs font-bold py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-all"
          >
            {busy ? "משבץ..." : "קבע שיעור"}
          </button>
        </div>
      </div>
    </div>
  );
}
