"use client";

import { useMemo, useState } from "react";

export interface FallbackTeacher {
  teacherId: string;
  teacherName: string;
  matchScore: number;
  openSlotsCount: number;
  subjects: string[];
  reasons: string[];
  isSoftRecommendation?: boolean;
}

interface TeacherFallbackSwitcherProps {
  teachers: FallbackTeacher[];
  selectedTeacherId: string | null;
  /** When true, expand the panel automatically (e.g. 0 slots in displayed week). */
  forceOpen?: boolean;
  busy?: boolean;
  onSelectTeacher: (teacher: FallbackTeacher) => void;
}

export default function TeacherFallbackSwitcher({
  teachers,
  selectedTeacherId,
  forceOpen = false,
  busy = false,
  onSelectTeacher,
}: TeacherFallbackSwitcherProps) {
  const [manualOpen, setManualOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isOpen = forceOpen || manualOpen;

  const alternatives = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teachers
      .filter((t) => t.teacherId !== selectedTeacherId)
      .filter((t) => {
        if (!q) return true;
        const hay = `${t.teacherName} ${t.subjects.join(" ")}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 8);
  }, [teachers, selectedTeacherId, query]);

  return (
    <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-4 space-y-3 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-amber-200">
            {forceOpen
              ? "אין שעות פנויות למורה בשבוע זה"
              : "החלפת מורה / חיפוש חלופי"}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            מורים חלופיים לפי ציון התאמה ומקצוע — בחירה מרעננת את הלוח מיד.
          </p>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => setManualOpen((v) => !v)}
          className="text-[11px] font-bold px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-amber-500/50 disabled:opacity-50 self-start"
        >
          {isOpen && !forceOpen ? "סגור חיפוש" : "החלף מורה"}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש לפי שם או מקצוע..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            dir="rtl"
          />

          {alternatives.length === 0 ? (
            <p className="text-xs text-slate-500">
              לא נמצאו מורים חלופיים מתאימים כרגע.
            </p>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {alternatives.map((teacher) => (
                <button
                  key={teacher.teacherId}
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    onSelectTeacher(teacher);
                    setManualOpen(false);
                    setQuery("");
                  }}
                  className="min-w-[180px] shrink-0 text-right bg-slate-900/80 border border-slate-700 hover:border-amber-500/50 active:scale-[0.98] p-3 rounded-xl transition-all disabled:opacity-50"
                >
                  <div className="text-xs font-black text-white truncate">
                    {teacher.teacherName}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    ציון {teacher.matchScore} ·{" "}
                    {teacher.openSlotsCount > 0
                      ? `${teacher.openSlotsCount} פנויות`
                      : "ללא שעות כרגע"}
                  </div>
                  {teacher.subjects.length > 0 && (
                    <div className="text-[10px] text-amber-200/80 mt-1 truncate">
                      {teacher.subjects.slice(0, 2).join(" · ")}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
