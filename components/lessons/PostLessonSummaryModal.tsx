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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4 font-sans backdrop-blur-sm" dir="rtl">
      <div className="w-full max-w-lg rounded-2xl bg-white/90 backdrop-blur-md p-6 shadow-sm border border-neutral-200/80 space-y-4">
        <div className="border-b border-neutral-100 pb-3">
          <h2 className="text-base font-bold text-neutral-900">Lesson summary and knowledge gap update</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Enter pedagogical highlights, homework, and mark gaps resolved during the session.
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-xl bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1">
              Lesson summary and topics covered *
            </label>
            <textarea
              rows={3}
              required
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              placeholder="Describe the material practiced, the student's understanding level, and key points..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-800 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1">
              Homework and practice tasks (optional)
            </label>
            <input
              type="text"
              value={homeworkAssigned}
              onChange={(e) => setHomeworkAssigned(e.target.value)}
              placeholder="Pages, exercise numbers, or instructions for the next session..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-xs text-neutral-800 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
            />
          </div>

          {existingGaps.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
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
                      className={`rounded-full px-2.5 py-1 text-xs font-medium border transition ${
                        isResolved
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {isResolved ? "\u2713 " : ""}{gap}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save summary and close lesson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
