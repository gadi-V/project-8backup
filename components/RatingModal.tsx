"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface RatingModalProps {
  lessonId: string;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  onSkip: () => void;
}

export default function RatingModal({
  lessonId: _lessonId,
  onSubmit,
  onSkip,
}: RatingModalProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedStar === 0) {
      toast.error("אנא בחר דירוג בין 1 ל-5 כוכבים");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(selectedStar, comment);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "שגיאה בשמירת הדירוג";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayStars = hoveredStar > 0 ? hoveredStar : selectedStar;

  const starLabel = (n: number): string => {
    switch (n) {
      case 1: return "גרוע";
      case 2: return "לא טוב";
      case 3: return "סביר";
      case 4: return "טוב";
      case 5: return "מצוין";
      default: return "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col gap-6">
        <div className="text-center">
          <div className="text-4xl mb-3">🎓</div>
          <h2 className="text-2xl font-black text-slate-900">
            איך היה השיעור?
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            הדירוג עוזר לנו לשפר את חוויית הלמידה עבורך
          </p>
        </div>

        {/* Star selector */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2" role="group" aria-label="דירוג כוכבים">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`${star} כוכבים — ${starLabel(star)}`}
                className="text-4xl transition-transform hover:scale-125 focus:outline-none focus:scale-125"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setSelectedStar(star)}
              >
                {star <= displayStars ? "⭐" : "☆"}
              </button>
            ))}
          </div>
          {displayStars > 0 && (
            <span className="text-sm font-bold text-indigo-600">
              {starLabel(displayStars)}
            </span>
          )}
        </div>

        {/* Comment textarea */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="review-comment"
            className="text-sm font-bold text-slate-700"
          >
            הערות נוספות (אופציונלי)
          </label>
          <textarea
            id="review-comment"
            rows={3}
            maxLength={1000}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="שתף את החוויה שלך מהשיעור..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <span className="text-xs text-slate-400 text-left">
            {comment.length}/1000
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || selectedStar === 0}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black py-3 px-6 rounded-xl shadow-lg transition-all text-sm"
          >
            {isSubmitting ? "שומר..." : "שלח דירוג"}
          </button>
          <button
            type="button"
            onClick={onSkip}
            disabled={isSubmitting}
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-sm transition-all"
          >
            דלג
          </button>
        </div>
      </div>
    </div>
  );
}
