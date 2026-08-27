"use client";

import { ACTIVITY_HOUR_SLOTS } from "../lib/matching";

const DAY_OPTIONS = [
  { value: 0, label: "א'" },
  { value: 1, label: "ב'" },
  { value: 2, label: "ג'" },
  { value: 3, label: "ד'" },
  { value: 4, label: "ה'" },
  { value: 5, label: "ו'" },
  { value: 6, label: "ש'" },
] as const;

const ALL_DAY_VALUES = DAY_OPTIONS.map((d) => d.value);

/** Label a 60-minute slot start as `HH:00-HH+1:00` within 08:00–22:00. */
export function formatHourSlotLabel(start: string): string {
  const hour = Number.parseInt(start.split(":")[0] ?? "0", 10);
  const endHour = hour + 1;
  return `${String(hour).padStart(2, "0")}:00-${String(endHour).padStart(2, "0")}:00`;
}

export type StudentTimeWindow = {
  id: string;
  start: string;
  end: string;
};

export type StudentTimePreference = {
  requestedDays: number[];
  /** Discrete slot starts; also sent as `requestedSlots` to `/api/match`. */
  requestedTimes: string[];
  timeWindows: StudentTimeWindow[];
};

interface StudentTimePreferenceBarProps {
  value: StudentTimePreference;
  busy?: boolean;
  onChange: (next: StudentTimePreference) => void;
  onClear: () => void;
}

function toggleInList<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function hasActiveTimePreference(value: StudentTimePreference): boolean {
  return (
    value.requestedDays.length > 0 ||
    value.requestedTimes.length > 0 ||
    value.timeWindows.length > 0
  );
}

export default function StudentTimePreferenceBar({
  value,
  busy = false,
  onChange,
  onClear,
}: StudentTimePreferenceBarProps) {
  const hasFilter = hasActiveTimePreference(value);
  const allDaysSelected = ALL_DAY_VALUES.every((d) => value.requestedDays.includes(d));
  const allSlotsSelected = ACTIVITY_HOUR_SLOTS.every((h) =>
    value.requestedTimes.includes(h)
  );

  const toggleDay = (day: number) => {
    onChange({
      ...value,
      requestedDays: toggleInList(value.requestedDays, day).sort((a, b) => a - b),
    });
  };

  const selectAllDays = () => {
    onChange({
      ...value,
      requestedDays: allDaysSelected ? [] : [...ALL_DAY_VALUES],
    });
  };

  const toggleHour = (hour: string) => {
    onChange({
      ...value,
      requestedTimes: toggleInList(value.requestedTimes, hour).sort(),
    });
  };

  const selectAllHours = () => {
    onChange({
      ...value,
      requestedTimes: allSlotsSelected ? [] : [...ACTIVITY_HOUR_SLOTS],
    });
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 space-y-4 text-right">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-white">מתי נוח לך ללמוד?</h3>
          <p className="text-[11px] text-slate-400 mt-1">
            בחירה מרובה של ימים ומשבצות שעה (08:00–22:00) — סינון לפי הצלבות Day×Hour ודירוג Fair
            Dispatch.
          </p>
        </div>
        {hasFilter && (
          <button
            type="button"
            disabled={busy}
            onClick={onClear}
            className="text-xs font-bold py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 self-start"
          >
            נקה הכל
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-[11px] font-bold text-slate-400">ימים (בחירה מרובה)</label>
          <button
            type="button"
            disabled={busy}
            onClick={selectAllDays}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white disabled:opacity-50"
          >
            {allDaysSelected ? "בטל הכל" : "בחר הכל"}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {DAY_OPTIONS.map((day) => {
            const active = value.requestedDays.includes(day.value);
            return (
              <button
                key={day.value}
                type="button"
                disabled={busy}
                aria-pressed={active}
                onClick={() => toggleDay(day.value)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all disabled:opacity-50 ${
                  active
                    ? "bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-600/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600"
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-[11px] font-bold text-slate-400">
            משבצות שעה (60 דק׳, 08:00–22:00)
          </label>
          <button
            type="button"
            disabled={busy}
            onClick={selectAllHours}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white disabled:opacity-50"
          >
            {allSlotsSelected ? "בטל הכל" : "בחר הכל"}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
          {ACTIVITY_HOUR_SLOTS.map((hour) => {
            const active = value.requestedTimes.includes(hour);
            return (
              <button
                key={hour}
                type="button"
                disabled={busy}
                aria-pressed={active}
                onClick={() => toggleHour(hour)}
                className={`text-[10px] sm:text-[11px] font-mono font-bold px-2 py-2 rounded-xl border transition-all disabled:opacity-50 ${
                  active
                    ? "bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-600/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600"
                }`}
              >
                {formatHourSlotLabel(hour)}
              </button>
            );
          })}
        </div>
      </div>

      {busy && (
        <p className="text-[11px] text-slate-500 text-left">מעדכן מורים פנויים...</p>
      )}
    </div>
  );
}
