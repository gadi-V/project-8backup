/**
 * Teacher–student matching: subject/age fit + fair load balancing.
 */

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
  };
  openSlotsCount: number;
};

export type DiagnosticInput = {
  ageGroup: string;
  subject: string;
  challenge: string;
};

export type RankedMatch = {
  teacherId: string;
  teacherName: string;
  matchScore: number;
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

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/["'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Map diagnostic ageGroup free-text → canonical buckets */
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
    // fallback: treat school-ish as תיכון, else אקדמיה
    buckets.push(n.includes("כיתה") ? "תיכון" : "אקדמיה");
  }
  return buckets;
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
      // token overlap (e.g. "מתמטיקה 5 יח" vs "מתמטיקה")
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

function ageOverlapScore(studentAgeGroup: string, teacherAgeGroups: string[]): number {
  const needed = inferAgeBuckets(studentAgeGroup);
  if (teacherAgeGroups.length === 0) return 20; // mild penalty if unspecified
  const teacherNorm = teacherAgeGroups.map(normalize);
  const hits = needed.filter((b) => teacherNorm.some((t) => t.includes(normalize(b)) || normalize(b).includes(t)));
  if (hits.length === 0) return 0;
  return Math.min(40, hits.length * 25);
}

/**
 * Score teachers by diagnostic fit, then fair-distribute among top tier.
 */
export function rankTeachersForDiagnostic(
  diagnostic: DiagnosticInput,
  teachers: MatchableTeacher[]
): RankedMatch[] {
  const scored = teachers.map((teacher) => {
    const reasons: string[] = [];
    const subjectScore = subjectOverlapScore(diagnostic.subject, teacher.profile.subjects);
    const ageScore = ageOverlapScore(diagnostic.ageGroup, teacher.profile.ageGroups);

    if (subjectScore >= 80) reasons.push("התאמת מקצוע גבוהה");
    else if (subjectScore >= 40) reasons.push("התאמת מקצוע חלקית");
    if (ageScore >= 25) reasons.push("התאמת קבוצת גיל");
    if (teacher.openSlotsCount > 0) reasons.push(`${teacher.openSlotsCount} שעות פנויות`);

    // Availability bonus (small)
    const availabilityBonus = Math.min(15, teacher.openSlotsCount * 3);

    const matchScore = subjectScore + ageScore + availabilityBonus;

    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      matchScore,
      reasons,
      referralCount: teacher.profile.referralCount,
      activeStudentsCount: teacher.profile.activeStudentsCount,
      lastReferralAt: teacher.profile.lastReferralAt
        ? teacher.profile.lastReferralAt.toISOString()
        : null,
      openSlotsCount: teacher.openSlotsCount,
      bio: teacher.profile.bio,
      subjects: teacher.profile.subjects,
      ageGroups: teacher.profile.ageGroups,
      profileImageUrl: teacher.profile.profileImageUrl,
    } satisfies RankedMatch;
  });

  // Keep only teachers with meaningful subject fit
  const eligible = scored.filter((t) => t.matchScore >= 40 || t.openSlotsCount > 0);

  // Top quality band: within 20 points of the best subject+age score
  const qualitySorted = [...eligible].sort((a, b) => b.matchScore - a.matchScore);
  if (qualitySorted.length === 0) return [];

  const bestScore = qualitySorted[0].matchScore;
  const topBand = qualitySorted.filter((t) => t.matchScore >= bestScore - 20);

  // Fair distribution inside the top band
  topBand.sort((a, b) => {
    if (a.referralCount !== b.referralCount) return a.referralCount - b.referralCount;
    if (a.activeStudentsCount !== b.activeStudentsCount) {
      return a.activeStudentsCount - b.activeStudentsCount;
    }
    const aTime = a.lastReferralAt ? new Date(a.lastReferralAt).getTime() : 0;
    const bTime = b.lastReferralAt ? new Date(b.lastReferralAt).getTime() : 0;
    if (aTime !== bTime) return aTime - bTime; // older / never → first
    return b.matchScore - a.matchScore;
  });

  // Append the rest (outside band) by score for fallback UI
  const rest = qualitySorted.filter((t) => !topBand.some((x) => x.teacherId === t.teacherId));
  return [...topBand, ...rest];
}
