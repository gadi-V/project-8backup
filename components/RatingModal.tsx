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
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-neutral-200/80 w-full max-w-md p-8 flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            איך היה השיעור?
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
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
                {star <= displayStars ? "★" : "☆"}
              </button>
            ))}
          </div>
          {displayStars > 0 && (
            <span className="text-sm font-bold text-neutral-800">
              {starLabel(displayStars)}
            </span>
          )}
        </div>

        {/* Comment textarea */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="review-comment"
            className="text-sm font-bold text-neutral-700"
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
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 resize-none"
          />
          <span className="text-xs text-neutral-400 text-start">
            {comment.length}/1000
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || selectedStar === 0}
            className="flex-1 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-full transition-colors text-sm"
          >
            {isSubmitting ? "שומר..." : "שלח דירוג"}
          </button>
          <button
            type="button"
            onClick={onSkip}
            disabled={isSubmitting}
            className="px-5 py-3 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-medium text-sm transition-colors"
          >
            דלג
          </button>
        </div>
      </div>
    </div>
  );
}
