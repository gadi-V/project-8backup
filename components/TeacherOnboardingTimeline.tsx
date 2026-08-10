"use client";

import type { TeacherOnboardingStatus } from "../lib/teacher-onboarding";

type Props = {
  onboarding: TeacherOnboardingStatus;
  compact?: boolean;
};

export default function TeacherOnboardingTimeline({ onboarding, compact = false }: Props) {
  const { steps, currentStep, isFullyActive } = onboarding;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold text-slate-400">
          מסלול קליטה · שלב {currentStep} מתוך {steps.length}
        </p>
        <span
          className={`text-[10px] font-black px-2 py-0.5 rounded font-mono ${
            isFullyActive
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
          }`}
        >
          {isFullyActive ? "ACTIVE" : `STEP_${currentStep}`}
        </span>
      </div>

      <ol className={`relative ${compact ? "space-y-3" : "space-y-4"}`}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const dotClass =
            step.status === "completed"
              ? "bg-emerald-500 border-emerald-400 text-white"
              : step.status === "current"
                ? "bg-amber-500 border-amber-300 text-slate-950 animate-pulse"
                : "bg-slate-800 border-slate-600 text-slate-500";

          const lineClass =
            step.status === "completed"
              ? "bg-emerald-500/60"
              : step.status === "current"
                ? "bg-gradient-to-b from-emerald-500/60 to-slate-700"
                : "bg-slate-700/60";

          const labelClass =
            step.status === "completed"
              ? "text-emerald-300"
              : step.status === "current"
                ? "text-amber-200 font-black"
                : "text-slate-500";

          return (
            <li key={step.id} className="relative flex gap-3 text-right">
              {!isLast && (
                <span
                  className={`absolute top-6 bottom-0 right-[11px] w-0.5 ${lineClass}`}
                  aria-hidden
                />
              )}
              <span
                className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-black ${dotClass}`}
              >
                {step.status === "completed" ? "✓" : step.id}
              </span>
              <div className="flex-1 pb-1 pt-0.5">
                <p className={`text-xs leading-relaxed ${labelClass}`}>{step.label}</p>
                {step.status === "current" && (
                  <p className="text-[10px] text-slate-400 mt-0.5">בטיפול כעת</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
