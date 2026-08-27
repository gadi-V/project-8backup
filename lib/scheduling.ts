/**
 * Shared 60-minute slot-locking / anti-collision primitives.
 *
 * Platform rule (see .cursor/rules/02-matching-scheduling): a lesson is 50 minutes
 * of content but reserves a full 60-minute calendar block (50 min lesson + 10 min
 * break). All overlap/double-booking checks are computed against the 60-minute
 * block, never the 50-minute content duration.
 *
 * NOTE: This module is intentionally NOT used by the protected cancel/reschedule
 * routes — those keep their own audited copies.
 */

import type { Prisma } from "@prisma/client";

/** Full calendar block reserved per lesson (lesson + mandatory break). */
export const BLOCK_MS = 60 * 60 * 1000;
/** Actual lesson content duration. */
export const LESSON_CONTENT_MS = 50 * 60 * 1000;

/** Compute the content-end (50 min) and block-end (60 min) for a slot start. */
export function computeSlotBounds(start: Date): {
  contentEnd: Date;
  blockEnd: Date;
} {
  return {
    contentEnd: new Date(start.getTime() + LESSON_CONTENT_MS),
    blockEnd: new Date(start.getTime() + BLOCK_MS),
  };
}

/**
 * Prisma `where` fragment for an interval overlap against a teacher's other
 * availability slots: [start, blockEnd) intersects an existing [startTime, endTime).
 * Pass `excludeSlotId` when moving an existing slot so it doesn't collide with itself.
 */
export function overlappingAvailabilityWhere(params: {
  teacherId: string;
  start: Date;
  blockEnd: Date;
  excludeSlotId?: string;
}): Prisma.TeacherAvailabilityWhereInput {
  const { teacherId, start, blockEnd, excludeSlotId } = params;
  return {
    teacherId,
    ...(excludeSlotId ? { id: { not: excludeSlotId } } : {}),
    AND: [{ startTime: { lt: blockEnd } }, { endTime: { gt: start } }],
  };
}

/**
 * Point-based ±60-minute window used to detect whether a lesson `scheduledAt`
 * collides with another active lesson's 60-minute block. Two 60-minute blocks
 * [T, T+60) and [E, E+60) conflict when E ∈ (T−60, T+60).
 */
export function lessonAntiCollisionWindow(start: Date): {
  windowStart: Date;
  windowEnd: Date;
} {
  return {
    windowStart: new Date(start.getTime() - BLOCK_MS),
    windowEnd: new Date(start.getTime() + BLOCK_MS),
  };
}
