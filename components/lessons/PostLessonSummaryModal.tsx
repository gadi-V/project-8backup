"use client";

import React, { useState } from "react";

interface PostLessonSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string;
  teacherId: string;
  existingGaps?: string[];
  onSummarySaved?: () => void;
}

export default function PostLessonSummaryModal({
  isOpen,
  onClose,
  lessonId,
  teacherId,
  existingGaps = [],
  onSummarySaved,
}: PostLessonSummaryModalProps) {
  const [summaryText, setSummaryText] = useState("");
  const [homeworkAssigned, setHomeworkAssigned] = useState("");
  const [selectedResolvedGaps, setSelectedResolvedGaps] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleResolvedGap = (gap: string) => {
    setSelectedResolvedGaps((prev) =>
      prev.includes(gap) ? prev.filter((g) => g !== gap) : [...prev, gap]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summaryText.trim()) {
      setErrorMsg("Please enter a pedagogical summary for the lesson");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg(null);

      const res = await fetch(`/api/lessons/${lessonId}/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId,
          summaryText: summaryText.trim(),
          homeworkAssigned: homeworkAssigned.trim() || undefined,
          resolvedGaps: selectedResolvedGaps,
        }),
      });

      if (!res.ok) throw new Error("Failed to save lesson summary");

      if (onSummarySaved) onSummarySaved();
      onClose();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 font-sans backdrop-blur-sm" dir="rtl">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Lesson summary and knowledge gap update</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter pedagogical highlights, homework, and mark gaps resolved during the session.
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Lesson summary and topics covered *
            </label>
            <textarea
              rows={3}
              required
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              placeholder="Describe the material practiced, the student's understanding level, and key points..."
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Homework and practice tasks (optional)
            </label>
            <input
              type="text"
              value={homeworkAssigned}
              onChange={(e) => setHomeworkAssigned(e.target.value)}
              placeholder="Pages, exercise numbers, or instructions for the next session..."
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {existingGaps.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Resolved knowledge gaps (mark topics fully understood):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {existingGaps.map((gap) => {
                  const isResolved = selectedResolvedGaps.includes(gap);
                  return (
                    <button
                      key={gap}
                      type="button"
                      onClick={() => toggleResolvedGap(gap)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium border transition ${
                        isResolved
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {isResolved ? "\u2713 " : ""}{gap}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save summary and close lesson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
