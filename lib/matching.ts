/**
 * Teacher–student smart matching + student-driven availability search
 * with Fair Dispatch sorting (anti-concentration workload balancing).
 */

export type OpenSlotBrief = {
  id: string;
  startTime: Date | string;
};

export type MatchableTeacher = {
  id: string;
  name: string;
  profile: {
    subjects: string[];
    ageGroups: string[];
    bio: string | null;
    profileImageUrl: string | null;
    referralCount: number;
    activeStudentsCount: number;
    lastReferralAt: Date | null;
    topicProficiencies?: Record<string, number> | null;
  };
  openSlotsCount: number;
  /** Future unbooked slots (required for time-window filtering). */
  openSlots?: OpenSlotBrief[];
  /** Scheduled / in-progress lessons in the current calendar week. */
  weeklyLessonCount?: number;
};

export type DiagnosticTopicInfo = {
  id: string;
  topicName: string;
  subTopics?: string[];
  weightInExam?: number;
};

export type DiagnosticInput = {
  ageGroup: string;
  subject: string;
  challenge: string;
  topics?: DiagnosticTopicInfo[];
};

/** Preferred study windows from the student (multi-day / multi-hour, Asia/Jerusalem). */
export type TimeWindowPreference = {
  /** Inclusive start `HH:mm`. */
  start: string;
  /** Inclusive end `HH:mm`. */
  end: string;
  /** Optional UI id (e.g. "morning"). */
  id?: string;
};

/** Activity-range slot starts for Granular Multi-Hour Filter (08:00–21:00 → ends 22:00). */
export const ACTIVITY_HOUR_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
] as const;

export type ActivityHourSlot = (typeof ACTIVITY_HOUR_SLOTS)[number];

export type StudentAvailabilityPreference = {
  /** @deprecated Prefer `requestedDays`. Single day 0–6. */
  requestedDay?: number;
  /** Multi-select days: 0 = Sunday … 6 = Saturday. */
  requestedDays?: number[];
  /** @deprecated Prefer `requestedTimes` / `requestedSlots`. Single start hour. */
  requestedTime?: string;
  /** Multi-select discrete hour-slot starts `HH:mm` (alias of requestedSlots). */
  requestedTimes?: string[];
  /** Multi-select discrete hour-slot starts `HH:mm` (canonical Granular Multi-Hour API name). */
  requestedSlots?: string[];
  /** @deprecated Prefer `timeWindows`. Single range end. */
  timeRangeEnd?: string;
  /** Multi-select inclusive hour windows (OR with discrete times). */
  timeWindows?: TimeWindowPreference[];
};

export type RankedMatch = {
  teacherId: string;
  teacherName: string;
  matchScore: number;
  subjectFitScore: number;
  levelFitScore: number;
  availabilityScore: number;
  isSoftRecommendation: boolean;
  /** True when ≥1 open slot matches any selected day/hour (OR). */
  exactAvailabilityMatch: boolean;
  /** Count of open slots overlapping the student's multi-select options. */
  overlapCount: number;
  /** Days (0–6) that had at least one matching open slot. */
  matchedHighlightDays: number[];
  /** Hours `HH:00` that had at least one matching open slot. */
  matchedHighlightHours: string[];
  /** ISO start of the nearest open slot (exact or nearest fallback). */
  nearestSlotStart: string | null;
  /** Minutes from requested clock time to nearest slot (null if no preference / no slots). */
  nearestSlotDeltaMinutes: number | null;
  weeklyLessonCount: number;
  reasons: string[];
  referralCount: number;
  activeStudentsCount: number;
  lastReferralAt: string | null;
  openSlotsCount: number;
  bio: string | null;
  subjects: string[];
  ageGroups: string[];
  profileImageUrl: string | null;
};

const SUBJECT_WEIGHT = 1;
const LEVEL_WEIGHT = 1;
const AVAILABILITY_WEIGHT = 1;
const SOFT_SUBJECT_THRESHOLD = 70;
const JERUSALEM_TZ = "Asia/Jerusalem";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/["'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function inferAgeBuckets(ageGroup: string): string[] {
  const n = normalize(ageGroup);
  const buckets: string[] = [];
  if (n.includes("יסודי") || n.includes("א'") || /\b[א-ו]\b/.test(n)) {
    buckets.push("יסודי");
  }
  if (n.includes("חטיב") || n.includes("ז'") || n.includes("ח'") || n.includes("ט'")) {
    buckets.push("חטיבה");
  }
  if (
    n.includes("תיכון") ||
    n.includes("בגרות") ||
    n.includes("י'") ||
    n.includes("יא") ||
    n.includes("יב") ||
    n.includes("בית ספר")
  ) {
    buckets.push("תיכון");
  }
  if (n.includes("אקדמ") || n.includes("סטודנט") || n.includes("אוניבר") || n.includes("מכלל")) {
    buckets.push("אקדמיה");
  }
  if (buckets.length === 0) {
    buckets.push(n.includes("כיתה") ? "תיכון" : "אקדמיה");
  }
  return buckets;
}

export function extractMaterialTokens(challenge: string): string[] {
  const raw = challenge?.trim() ?? "";
  if (!raw) return [];

  const tokens: string[] = [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const obj = parsed as Record<string, unknown>;
      for (const key of [
        "specificTopics",
        "coreChallenge",
        "learningTarget",
        "level",
        "degreeName",
        "institution",
      ]) {
        const val = obj[key];
        if (typeof val === "string" && val.trim()) {
          tokens.push(...val.split(/[,،\n/|]+/).map((s) => s.trim()).filter(Boolean));
        }
      }
    }
  } catch {
    tokens.push(...raw.split(/[,،\n/|]+/).map((s) => s.trim()).filter(Boolean));
  }

  return tokens.map(normalize).filter((t) => t.length > 1);
}

function parseHourMinute(value: string): { hour: number; minute: number } | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return { hour, minute };
}

function minutesOfDay(hour: number, minute: number): number {
  return hour * 60 + minute;
}

/** Calendar parts in Asia/Jerusalem for Fair Dispatch / preference matching. */
export function jerusalemDateParts(input: Date | string): {
  day: number;
  hour: number;
  minute: number;
} {
  const date = typeof input === "string" ? new Date(input) : input;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: JERUSALEM_TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hourRaw = parts.find((p) => p.type === "hour")?.value ?? "0";
  const minuteRaw = parts.find((p) => p.type === "minute")?.value ?? "0";

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  let hour = parseInt(hourRaw, 10);
  // Some engines emit "24" for midnight.
  if (hour === 24) hour = 0;

  return {
    day: dayMap[weekday] ?? 0,
    hour,
    minute: parseInt(minuteRaw, 10),
  };
}

function subjectOverlapScore(studentSubject: string, teacherSubjects: string[]): number {
  const student = normalize(studentSubject);
  if (!student || teacherSubjects.length === 0) return 0;

  let best = 0;
  for (const raw of teacherSubjects) {
    const t = normalize(raw);
    if (!t) continue;
    if (t === student) {
      best = Math.max(best, 100);
    } else if (t.includes(student) || student.includes(t)) {
      best = Math.max(best, 80);
    } else {
      const sTokens = student.split(" ").filter((x) => x.length > 1);
      const tTokens = new Set(t.split(" ").filter((x) => x.length > 1));
      const hits = sTokens.filter((tok) => tTokens.has(tok)).length;
      if (hits > 0) {
        best = Math.max(best, Math.min(70, 40 + hits * 15));
      }
    }
  }
  return best;
}

function topicProficiencyScore(
  diagnosticTopics: DiagnosticTopicInfo[] | undefined,
  materialTokens: string[],
  teacherProficiencies: Record<string, number> | null | undefined,
  teacherSubjects: string[],
  bio: string | null
): number {
  let score = 0;

  // 1. Concrete CurriculumTopic checking against teacherProficiencies
  if (diagnosticTopics && diagnosticTopics.length > 0 && teacherProficiencies) {
    let matchedWeights = 0;
    let totalWeight = 0;

    for (const dt of diagnosticTopics) {
      const weight = dt.weightInExam ?? 1.0;
      totalWeight += weight;

      // Match by ID or by normalized topicName
      const directProficiency =
        teacherProficiencies[dt.id] ??
        teacherProficiencies[normalize(dt.topicName)] ??
        teacherProficiencies[dt.topicName];

      if (typeof directProficiency === "number") {
        matchedWeights += (directProficiency / 100) * weight * 35;
      } else {
        // Check subtopics
        const subList = Array.isArray(dt.subTopics) ? dt.subTopics : [];
        let subMatches = 0;
        for (const sub of subList) {
          const subProf =
            teacherProficiencies[sub] ?? teacherProficiencies[normalize(sub)];
          if (typeof subProf === "number" && subProf >= 60) {
            subMatches++;
          }
        }
        if (subList.length > 0 && subMatches > 0) {
          matchedWeights += (subMatches / subList.length) * weight * 30;
        }
      }
    }

    if (totalWeight > 0) {
      score += Math.min(35, Math.round(matchedWeights / totalWeight));
    }
  }

  // 2. Fallback / supplementary NLP matching against bio and subject definitions
  const textScore = materialRelevanceScore(materialTokens, teacherSubjects, bio);
  return Math.min(40, score + textScore);
}

function materialRelevanceScore(
  materialTokens: string[],
  teacherSubjects: string[],
  bio: string | null
): number {
  if (materialTokens.length === 0) return 0;
  const haystack = normalize(
    [...teacherSubjects, bio ?? ""].filter(Boolean).join(" ")
  );
  if (!haystack) return 0;

  let hits = 0;
  for (const tok of materialTokens) {
    if (tok.length < 2) continue;
    if (haystack.includes(tok)) hits += 1;
  }
  if (hits === 0) return 0;
  return Math.min(30, 10 + hits * 8);
}

function ageOverlapScore(studentAgeGroup: string, teacherAgeGroups: string[]): number {
  const needed = inferAgeBuckets(studentAgeGroup);
  if (teacherAgeGroups.length === 0) return 20;
  const teacherNorm = teacherAgeGroups.map(normalize);
  const hits = needed.filter((b) =>
    teacherNorm.some((t) => t.includes(normalize(b)) || normalize(b).includes(t))
  );
  if (hits.length === 0) return 0;
  return Math.min(40, hits.length * 25);
}

function availabilityOverlapScore(openSlotsCount: number): number {
  if (openSlotsCount <= 0) return 0;
  return Math.min(25, 5 + openSlotsCount * 4);
}

function padHourLabel(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

/** Normalize legacy single fields into multi-select arrays. */
export function normalizeAvailabilityPreference(
  preference?: StudentAvailabilityPreference | null
): {
  days: number[];
  times: string[];
  windows: Array<{ startMin: number; endMin: number }>;
  active: boolean;
} {
  if (!preference) {
    return { days: [], times: [], windows: [], active: false };
  }

  const daySet = new Set<number>();
  if (Array.isArray(preference.requestedDays)) {
    for (const d of preference.requestedDays) {
      if (Number.isInteger(d) && d >= 0 && d <= 6) daySet.add(d);
    }
  }
  if (
    typeof preference.requestedDay === "number" &&
    preference.requestedDay >= 0 &&
    preference.requestedDay <= 6
  ) {
    daySet.add(preference.requestedDay);
  }

  const timeSet = new Set<string>();
  const slotSources = [
    ...(Array.isArray(preference.requestedSlots) ? preference.requestedSlots : []),
    ...(Array.isArray(preference.requestedTimes) ? preference.requestedTimes : []),
  ];
  for (const t of slotSources) {
    if (parseHourMinute(t)) timeSet.add(t.trim());
  }
  if (preference.requestedTime && parseHourMinute(preference.requestedTime)) {
    timeSet.add(preference.requestedTime.trim());
  }

  const windows: Array<{ startMin: number; endMin: number }> = [];
  if (Array.isArray(preference.timeWindows)) {
    for (const w of preference.timeWindows) {
      const s = parseHourMinute(w.start);
      const e = parseHourMinute(w.end);
      if (!s || !e) continue;
      const startMin = minutesOfDay(s.hour, s.minute);
      const endMin = minutesOfDay(e.hour, e.minute);
      windows.push({
        startMin: Math.min(startMin, endMin),
        endMin: Math.max(startMin, endMin),
      });
    }
  }
  if (preference.requestedTime && preference.timeRangeEnd) {
    const s = parseHourMinute(preference.requestedTime);
    const e = parseHourMinute(preference.timeRangeEnd);
    if (s && e) {
      const startMin = minutesOfDay(s.hour, s.minute);
      const endMin = minutesOfDay(e.hour, e.minute);
      windows.push({
        startMin: Math.min(startMin, endMin),
        endMin: Math.max(startMin, endMin),
      });
    }
  }

  const days = [...daySet].sort((a, b) => a - b);
  const times = [...timeSet].sort();
  const active = days.length > 0 || times.length > 0 || windows.length > 0;

  return { days, times, windows, active };
}

function preferenceActive(pref?: StudentAvailabilityPreference | null): boolean {
  return normalizeAvailabilityPreference(pref).active;
}

function slotMatchesTimeFilters(
  slotMinutes: number,
  times: string[],
  windows: Array<{ startMin: number; endMin: number }>
): boolean {
  if (times.length === 0 && windows.length === 0) return true;
  for (const t of times) {
    const parsed = parseHourMinute(t);
    if (!parsed) continue;
    if (slotMinutes === minutesOfDay(parsed.hour, parsed.minute)) return true;
  }
  for (const w of windows) {
    if (slotMinutes >= w.startMin && slotMinutes <= w.endMin) return true;
  }
  return false;
}

type SlotFit = {
  exact: boolean;
  nearestStart: string | null;
  deltaMinutes: number | null;
  matchingCount: number;
  matchedDays: number[];
  matchedHours: string[];
};

/**
 * Evaluate open slots against multi-day / multi-hour preference (OR across selections).
 */
export function evaluateSlotPreference(
  openSlots: OpenSlotBrief[],
  preference?: StudentAvailabilityPreference | null
): SlotFit {
  const normalized = normalizeAvailabilityPreference(preference);

  if (!normalized.active || openSlots.length === 0) {
    const first = openSlots[0];
    return {
      exact: false,
      nearestStart: first ? new Date(first.startTime).toISOString() : null,
      deltaMinutes: null,
      matchingCount: 0,
      matchedDays: [],
      matchedHours: [],
    };
  }

  const { days, times, windows } = normalized;
  const dayFilterActive = days.length > 0;
  const timeFilterActive = times.length > 0 || windows.length > 0;

  let matchingCount = 0;
  const matchedDaySet = new Set<number>();
  const matchedHourSet = new Set<string>();
  let bestExact: OpenSlotBrief | null = null;
  let nearest: OpenSlotBrief | null = null;
  let nearestDelta = Number.POSITIVE_INFINITY;

  const referenceDay = days[0];
  const referenceTimeMin = (() => {
    if (times[0]) {
      const p = parseHourMinute(times[0]);
      return p ? minutesOfDay(p.hour, p.minute) : null;
    }
    if (windows[0]) return windows[0].startMin;
    return null;
  })();

  for (const slot of openSlots) {
    const parts = jerusalemDateParts(slot.startTime);
    const slotMinutes = minutesOfDay(parts.hour, parts.minute);
    const hourLabel = padHourLabel(parts.hour);

    const dayOk = !dayFilterActive || days.includes(parts.day);
    const timeOk =
      !timeFilterActive || slotMatchesTimeFilters(slotMinutes, times, windows);

    if (dayOk && timeOk) {
      matchingCount += 1;
      matchedDaySet.add(parts.day);
      matchedHourSet.add(hourLabel);
      if (!bestExact) bestExact = slot;
      if (referenceTimeMin !== null) {
        const d = Math.abs(slotMinutes - referenceTimeMin);
        if (d < nearestDelta) {
          nearestDelta = d;
          nearest = slot;
        }
      } else if (!nearest) {
        nearest = slot;
        nearestDelta = 0;
      }
      continue;
    }

    let dayDelta = 0;
    if (dayFilterActive && referenceDay !== undefined) {
      dayDelta = Math.min(
        ...days.map((d) =>
          Math.min(Math.abs(parts.day - d), 7 - Math.abs(parts.day - d))
        )
      );
    }
    const clockDelta =
      referenceTimeMin === null ? 0 : Math.abs(slotMinutes - referenceTimeMin);
    const combined = dayDelta * 24 * 60 + clockDelta;
    if (combined < nearestDelta) {
      nearestDelta = combined;
      nearest = slot;
    }
  }

  if (bestExact) {
    return {
      exact: true,
      nearestStart: new Date(bestExact.startTime).toISOString(),
      deltaMinutes: 0,
      matchingCount,
      matchedDays: [...matchedDaySet].sort((a, b) => a - b),
      matchedHours: [...matchedHourSet].sort(),
    };
  }

  return {
    exact: false,
    nearestStart: nearest ? new Date(nearest.startTime).toISOString() : null,
    deltaMinutes: nearest ? nearestDelta : null,
    matchingCount: 0,
    matchedDays: [],
    matchedHours: [],
  };
}

/** Fair Dispatch comparator: lower weekly load, then referrals, then active students, then RR. */
export function compareFairDispatch(a: RankedMatch, b: RankedMatch): number {
  if (a.weeklyLessonCount !== b.weeklyLessonCount) {
    return a.weeklyLessonCount - b.weeklyLessonCount;
  }
  if (a.referralCount !== b.referralCount) return a.referralCount - b.referralCount;
  if (a.activeStudentsCount !== b.activeStudentsCount) {
    return a.activeStudentsCount - b.activeStudentsCount;
  }
  const aTime = a.lastReferralAt ? new Date(a.lastReferralAt).getTime() : 0;
  const bTime = b.lastReferralAt ? new Date(b.lastReferralAt).getTime() : 0;
  if (aTime !== bTime) return aTime - bTime;
  return b.matchScore - a.matchScore;
}

/**
 * Score teachers by subject/material, level, availability; Fair-Dispatch within bands.
 * Multi-select preference: OR across days/hours; rank by overlap count then Fair Dispatch.
 */
export function rankTeachersForDiagnostic(
  diagnostic: DiagnosticInput,
  teachers: MatchableTeacher[],
  preference?: StudentAvailabilityPreference | null
): RankedMatch[] {
  const materialTokens = extractMaterialTokens(diagnostic.challenge);
  const hasPref = preferenceActive(preference);

  const scored = teachers.map((teacher) => {
    const reasons: string[] = [];
    const slots = teacher.openSlots ?? [];
    const slotFit = evaluateSlotPreference(slots, preference);

    const subjectBase = subjectOverlapScore(diagnostic.subject, teacher.profile.subjects);
    const materialBonus = topicProficiencyScore(
      diagnostic.topics,
      materialTokens,
      teacher.profile.topicProficiencies,
      teacher.profile.subjects,
      teacher.profile.bio
    );
    const subjectFitScore = Math.min(100, subjectBase + materialBonus);
    const levelFitScore = ageOverlapScore(diagnostic.ageGroup, teacher.profile.ageGroups);

    const effectiveOpenCount = hasPref
      ? slotFit.matchingCount || (slotFit.nearestStart ? 1 : 0)
      : teacher.openSlotsCount;

    let availabilityScore = availabilityOverlapScore(
      hasPref ? slotFit.matchingCount : teacher.openSlotsCount
    );
    if (hasPref && slotFit.exact) {
      availabilityScore = Math.min(
        45,
        availabilityScore + 10 + Math.min(20, slotFit.matchingCount * 3)
      );
      reasons.push(`חפיפת זמינות: ${slotFit.matchingCount} משבצות`);
    } else if (hasPref && slotFit.nearestStart) {
      availabilityScore = Math.min(
        20,
        8 + Math.max(0, 12 - Math.floor((slotFit.deltaMinutes ?? 0) / 30))
      );
      reasons.push("חלון קרוב ביותר לבחירה המרובה");
    }

    const weeklyLessonCount = teacher.weeklyLessonCount ?? 0;
    const isSoftRecommendation =
      subjectFitScore >= SOFT_SUBJECT_THRESHOLD &&
      effectiveOpenCount === 0 &&
      !slotFit.exact;

    if (subjectBase >= 80) reasons.push("התאמת מקצוע גבוהה");
    else if (subjectBase >= 40) reasons.push("התאמת מקצוע חלקית");
    if (materialBonus >= 10) reasons.push("התאמת חומר לימוד");
    if (levelFitScore >= 25) reasons.push("התאמת רמת לימוד / קבוצת גיל");
    if (!hasPref && teacher.openSlotsCount > 0) {
      reasons.push(`${teacher.openSlotsCount} שעות פנויות חופפות`);
    }
    if (isSoftRecommendation) {
      reasons.push("המלצה רכה: התאמת חומר גבוהה — תיאום שעה דרך לוח הזמנים");
    }
    if (weeklyLessonCount === 0) reasons.push("עומס שבועי נמוך (Fair Dispatch)");
    else if (weeklyLessonCount <= 2) reasons.push(`עומס שבועי מאוזן (${weeklyLessonCount})`);

    const matchScore =
      subjectFitScore * SUBJECT_WEIGHT +
      levelFitScore * LEVEL_WEIGHT +
      availabilityScore * AVAILABILITY_WEIGHT;

    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      matchScore,
      subjectFitScore,
      levelFitScore,
      availabilityScore,
      isSoftRecommendation,
      exactAvailabilityMatch: slotFit.exact,
      overlapCount: slotFit.matchingCount,
      matchedHighlightDays: slotFit.matchedDays,
      matchedHighlightHours: slotFit.matchedHours,
      nearestSlotStart: slotFit.nearestStart,
      nearestSlotDeltaMinutes: slotFit.deltaMinutes,
      weeklyLessonCount,
      reasons,
      referralCount: teacher.profile.referralCount,
      activeStudentsCount: teacher.profile.activeStudentsCount,
      lastReferralAt: teacher.profile.lastReferralAt
        ? teacher.profile.lastReferralAt.toISOString()
        : null,
      openSlotsCount: hasPref
        ? slotFit.matchingCount || teacher.openSlotsCount
        : teacher.openSlotsCount,
      bio: teacher.profile.bio,
      subjects: teacher.profile.subjects,
      ageGroups: teacher.profile.ageGroups,
      profileImageUrl: teacher.profile.profileImageUrl,
    } satisfies RankedMatch;
  });

  let eligible = scored.filter(
    (t) =>
      t.subjectFitScore >= 40 ||
      t.levelFitScore >= 25 ||
      t.openSlotsCount > 0 ||
      t.exactAvailabilityMatch ||
      t.isSoftRecommendation
  );

  if (hasPref) {
    const exact = eligible.filter((t) => t.exactAvailabilityMatch);
    if (exact.length > 0) {
      exact.sort((a, b) => {
        if (b.overlapCount !== a.overlapCount) return b.overlapCount - a.overlapCount;
        if (Math.abs(b.subjectFitScore - a.subjectFitScore) > 15) {
          return b.subjectFitScore - a.subjectFitScore;
        }
        return compareFairDispatch(a, b);
      });
      const rest = eligible
        .filter((t) => !t.exactAvailabilityMatch)
        .sort((a, b) => {
          const aDelta = a.nearestSlotDeltaMinutes ?? Number.POSITIVE_INFINITY;
          const bDelta = b.nearestSlotDeltaMinutes ?? Number.POSITIVE_INFINITY;
          if (aDelta !== bDelta) return aDelta - bDelta;
          if (b.subjectFitScore !== a.subjectFitScore) {
            return b.subjectFitScore - a.subjectFitScore;
          }
          return compareFairDispatch(a, b);
        });
      return [...exact, ...rest];
    }

    eligible = eligible
      .filter((t) => t.subjectFitScore >= 40 || t.nearestSlotStart)
      .sort((a, b) => {
        const aDelta = a.nearestSlotDeltaMinutes ?? Number.POSITIVE_INFINITY;
        const bDelta = b.nearestSlotDeltaMinutes ?? Number.POSITIVE_INFINITY;
        if (aDelta !== bDelta) return aDelta - bDelta;
        if (Math.abs(b.subjectFitScore - a.subjectFitScore) > 15) {
          return b.subjectFitScore - a.subjectFitScore;
        }
        return compareFairDispatch(a, b);
      });
    return eligible;
  }

  const qualitySorted = [...eligible].sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    if (a.isSoftRecommendation !== b.isSoftRecommendation) {
      return a.isSoftRecommendation ? 1 : -1;
    }
    return b.subjectFitScore - a.subjectFitScore;
  });

  if (qualitySorted.length === 0) return [];

  const bestScore = qualitySorted[0].matchScore;
  const topBand = qualitySorted.filter((t) => t.matchScore >= bestScore - 20);
  topBand.sort(compareFairDispatch);

  const rest = qualitySorted.filter(
    (t) => !topBand.some((x) => x.teacherId === t.teacherId)
  );
  return [...topBand, ...rest];
}
