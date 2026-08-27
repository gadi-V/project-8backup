-- P1: Rating System & Reschedule Policy
-- Adds student rating fields to Lesson and aggregate rating fields to TeacherProfile.

-- Lesson: student rating (1-5 stars) + reschedule counter
ALTER TABLE "Lesson"
  ADD COLUMN IF NOT EXISTS "rating"           INTEGER,
  ADD COLUMN IF NOT EXISTS "reviewComment"    TEXT,
  ADD COLUMN IF NOT EXISTS "ratedAt"          TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "rescheduledCount" INTEGER NOT NULL DEFAULT 0;

-- Validate rating range at DB level
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'Lesson_rating_range_check'
  ) THEN
    ALTER TABLE "Lesson"
      ADD CONSTRAINT "Lesson_rating_range_check"
      CHECK ("rating" IS NULL OR ("rating" >= 1 AND "rating" <= 5));
  END IF;
END
$$;

-- TeacherProfile: aggregated rating statistics
ALTER TABLE "TeacherProfile"
  ADD COLUMN IF NOT EXISTS "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
  ADD COLUMN IF NOT EXISTS "totalReviews"  INTEGER          NOT NULL DEFAULT 0;
