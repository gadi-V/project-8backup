import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/api-auth";
import { writeAuditLog } from "../../../lib/audit";
import {
  rankTeachersForDiagnostic,
  type MatchableTeacher,
  type StudentAvailabilityPreference,
} from "../../../lib/matching";

function startOfLocalWeek(now = new Date()): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function parseOptionalDay(raw: string | null): number | undefined {
  if (raw === null || raw === "") return undefined;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0 || n > 6) return undefined;
  return n;
}

function parseOptionalTime(raw: string | null): string | undefined {
  if (!raw || !raw.trim()) return undefined;
  return /^\d{1,2}:\d{2}$/.test(raw.trim()) ? raw.trim() : undefined;
}

function parseCsvDays(raw: string | null): number[] {
  if (!raw || !raw.trim()) return [];
  const out: number[] = [];
  for (const part of raw.split(",")) {
    const d = parseOptionalDay(part.trim());
    if (d !== undefined && !out.includes(d)) out.push(d);
  }
  return out;
}

function parseCsvTimes(raw: string | null): string[] {
  if (!raw || !raw.trim()) return [];
  const out: string[] = [];
  for (const part of raw.split(",")) {
    const t = parseOptionalTime(part.trim());
    if (t && !out.includes(t)) out.push(t);
  }
  return out;
}

/** Parse `08:00-12:00,16:00-20:00` style windows. */
function parseCsvWindows(
  raw: string | null
): Array<{ start: string; end: string }> {
  if (!raw || !raw.trim()) return [];
  const out: Array<{ start: string; end: string }> = [];
  for (const part of raw.split(",")) {
    const m = /^(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/.exec(part.trim());
    if (!m) continue;
    const start = parseOptionalTime(m[1]);
    const end = parseOptionalTime(m[2]);
    if (start && end) out.push({ start, end });
  }
  return out;
}

/**
 * Single source of truth for turning loosely-typed preference parts (from a
 * query string OR a JSON body) into a `StudentAvailabilityPreference`, or `null`
 * when no preference is active. Field-level normalization (folding legacy
 * single-value fields, dedup, sorting) remains in `normalizeAvailabilityPreference`.
 */
function buildPreference(input: {
  requestedDays?: number[];
  requestedDay?: number;
  requestedSlots?: string[];
  requestedTime?: string;
  timeWindows?: Array<{ start: string; end: string; id?: string }>;
  timeRangeEnd?: string;
}): StudentAvailabilityPreference | null {
  const days = (input.requestedDays ?? []).filter(
    (d) => Number.isInteger(d) && d >= 0 && d <= 6
  );
  if (
    typeof input.requestedDay === "number" &&
    input.requestedDay >= 0 &&
    input.requestedDay <= 6 &&
    !days.includes(input.requestedDay)
  ) {
    days.push(input.requestedDay);
  }

  const slots = [
    ...new Set(
      (input.requestedSlots ?? []).filter(
        (t): t is string => typeof t === "string" && t.length > 0
      )
    ),
  ];
  const singleTime =
    typeof input.requestedTime === "string" && input.requestedTime.length > 0
      ? input.requestedTime
      : undefined;
  if (singleTime && !slots.includes(singleTime)) slots.push(singleTime);

  const timeWindows = Array.isArray(input.timeWindows) ? input.timeWindows : [];
  const timeRangeEnd =
    typeof input.timeRangeEnd === "string" && input.timeRangeEnd.length > 0
      ? input.timeRangeEnd
      : undefined;

  if (
    days.length === 0 &&
    slots.length === 0 &&
    timeWindows.length === 0 &&
    !timeRangeEnd
  ) {
    return null;
  }

  const pref: StudentAvailabilityPreference = {};
  if (days.length > 0) pref.requestedDays = days;
  if (slots.length > 0) {
    pref.requestedSlots = slots;
    pref.requestedTimes = slots;
  }
  if (timeWindows.length > 0) pref.timeWindows = timeWindows;
  if (timeRangeEnd && singleTime && timeWindows.length === 0) {
    pref.requestedTime = singleTime;
    pref.timeRangeEnd = timeRangeEnd;
  }

  return pref;
}

/** Query-string preference parser — supports requestedDays + requestedSlots (and legacy aliases). */
function preferenceFromSearchParams(
  searchParams: URLSearchParams
): StudentAvailabilityPreference | null {
  return buildPreference({
    requestedDays: parseCsvDays(
      searchParams.get("requestedDays") ?? searchParams.get("days")
    ),
    requestedDay: parseOptionalDay(
      searchParams.get("requestedDay") ?? searchParams.get("day")
    ),
    requestedSlots: parseCsvTimes(
      searchParams.get("requestedSlots") ??
        searchParams.get("requestedTimes") ??
        searchParams.get("times") ??
        searchParams.get("slots")
    ),
    requestedTime: parseOptionalTime(
      searchParams.get("requestedTime") ?? searchParams.get("time")
    ),
    timeWindows: parseCsvWindows(
      searchParams.get("timeWindows") ?? searchParams.get("windows")
    ),
    timeRangeEnd: parseOptionalTime(
      searchParams.get("timeRangeEnd") ?? searchParams.get("timeRange")
    ),
  });
}

async function loadMatchableTeachers(): Promise<MatchableTeacher[]> {
  const weekStart = startOfLocalWeek();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const teachers = await prisma.user.findMany({
    where: {
      role: "TEACHER",
      isApproved: true,
      teacherProfile: { isNot: null },
    },
    select: {
      id: true,
      name: true,
      teacherProfile: {
        select: {
          subjects: true,
          ageGroups: true,
          bio: true,
          profileImageUrl: true,
          referralCount: true,
          activeStudentsCount: true,
          lastReferralAt: true,
          topicProficiencies: true,
        },
      },
      availabilities: {
        where: {
          isBooked: false,
          startTime: { gte: new Date() },
        },
        select: { id: true, startTime: true },
        orderBy: { startTime: "asc" },
        take: 80,
      },
      givenLessons: {
        where: {
          status: { in: ["SCHEDULED", "IN_PROGRESS"] },
          scheduledAt: { gte: weekStart, lt: weekEnd },
        },
        select: { id: true },
      },
    },
  });

  return teachers
    .filter((t) => t.teacherProfile)
    .map((t) => ({
      id: t.id,
      name: t.name,
      profile: {
        subjects: t.teacherProfile!.subjects,
        ageGroups: t.teacherProfile!.ageGroups,
        bio: t.teacherProfile!.bio,
        profileImageUrl: t.teacherProfile!.profileImageUrl,
        referralCount: t.teacherProfile!.referralCount,
        activeStudentsCount: t.teacherProfile!.activeStudentsCount,
        lastReferralAt: t.teacherProfile!.lastReferralAt,
        topicProficiencies: (t.teacherProfile!.topicProficiencies as Record<string, number> | null) ?? null,
      },
      openSlotsCount: t.availabilities.length,
      openSlots: t.availabilities.map((s) => ({
        id: s.id,
        startTime: s.startTime,
      })),
      weeklyLessonCount: t.givenLessons.length,
    }));
}

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT", "ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const requestedStudentId = searchParams.get("studentId");
    const preference = preferenceFromSearchParams(searchParams);

    let studentId = auth.user.id;
    if (auth.user.role === "ADMIN" || auth.user.role === "MANAGER") {
      if (!requestedStudentId) {
        return NextResponse.json(
          { error: "לאדמין חובה לציין studentId" },
          { status: 400 }
        );
      }
      studentId = requestedStudentId;
    }

    const diagnostic = await prisma.diagnosticQuiz.findFirst({
      where: { studentId },
      include: { topics: true },
      orderBy: { createdAt: "desc" },
    });

    if (!diagnostic) {
      return NextResponse.json(
        { error: "לא נמצא אבחון לתלמיד. יש להשלים שאלון דיאגנוסטי תחילה." },
        { status: 400 }
      );
    }

    const matchable = await loadMatchableTeachers();
    const ranked = rankTeachersForDiagnostic(
      {
        ageGroup: diagnostic.ageGroup,
        subject: diagnostic.subject,
        challenge: diagnostic.challenge,
        topics: diagnostic.topics.map((t) => ({
          id: t.id,
          topicName: t.topicName,
          subTopics: Array.isArray(t.subTopics) ? (t.subTopics as string[]) : [],
          weightInExam: t.weightInExam,
        })),
      },
      matchable,
      preference
    );

    const recommended = ranked[0] ?? null;
    const exactCount = ranked.filter((t) => t.exactAvailabilityMatch).length;

    const payload = {
      diagnostic: {
        id: diagnostic.id,
        ageGroup: diagnostic.ageGroup,
        subject: diagnostic.subject,
      },
      preference,
      fairDispatch: true,
      exactAvailabilityMatches: exactCount,
      matches: ranked,
      recommended,
      softRecommendation:
        recommended?.isSoftRecommendation === true
          ? {
              teacherId: recommended.teacherId,
              message:
                "התאמת חומר גבוהה ללא שעות פנויות כרגע — המורה מוצג כמוביל; תאמו שעה בלוח כשייפתחו משבצות.",
            }
          : null,
      nearestFallback:
        preference && exactCount === 0 && recommended?.nearestSlotStart
          ? {
              teacherId: recommended.teacherId,
              nearestSlotStart: recommended.nearestSlotStart,
              message:
                "אין מורה פנוי בשעה המדויקת — מוצגים המתאימים ביותר עם החלון הקרוב ביותר (Fair Dispatch).",
            }
          : null,
    };

    return NextResponse.json({
      success: true,
      data: payload,
      ...payload,
    });
  } catch (error: unknown) {
    console.error("Match GET error:", error);
    return NextResponse.json({ error: "שגיאה בחישוב התאמת מורים" }, { status: 500 });
  }
}

/** Assign / record a fair referral to the chosen (or auto-picked) teacher */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT", "ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const body = (await request.json()) as {
      studentId?: string;
      teacherId?: string;
      requestedDay?: number;
      requestedDays?: number[];
      requestedTime?: string;
      requestedTimes?: string[];
      requestedSlots?: string[];
      timeRangeEnd?: string;
      timeWindows?: Array<{ start: string; end: string; id?: string }>;
    };

    const studentId =
      (auth.user.role === "ADMIN" || auth.user.role === "MANAGER") &&
      typeof body.studentId === "string"
        ? body.studentId
        : auth.user.id;

    if (auth.user.role === "STUDENT" && studentId !== auth.user.id) {
      return NextResponse.json({ error: "אין הרשאה" }, { status: 403 });
    }

    const diagnostic = await prisma.diagnosticQuiz.findFirst({
      where: { studentId },
      include: { topics: true },
      orderBy: { createdAt: "desc" },
    });

    if (!diagnostic) {
      return NextResponse.json({ error: "לא נמצא אבחון לתלמיד" }, { status: 400 });
    }

    const mergedSlots = [
      ...(Array.isArray(body.requestedSlots) ? body.requestedSlots : []),
      ...(Array.isArray(body.requestedTimes) ? body.requestedTimes : []),
    ].filter((t): t is string => typeof t === "string" && t.length > 0);

    const preference = buildPreference({
      requestedDays: Array.isArray(body.requestedDays) ? body.requestedDays : undefined,
      requestedDay:
        typeof body.requestedDay === "number" ? body.requestedDay : undefined,
      requestedSlots: mergedSlots,
      requestedTime:
        typeof body.requestedTime === "string" ? body.requestedTime : undefined,
      timeWindows: Array.isArray(body.timeWindows) ? body.timeWindows : undefined,
      timeRangeEnd:
        typeof body.timeRangeEnd === "string" ? body.timeRangeEnd : undefined,
    });

    const matchable = await loadMatchableTeachers();
    const ranked = rankTeachersForDiagnostic(
      {
        ageGroup: diagnostic.ageGroup,
        subject: diagnostic.subject,
        challenge: diagnostic.challenge,
        topics: diagnostic.topics.map((t) => ({
          id: t.id,
          topicName: t.topicName,
          subTopics: Array.isArray(t.subTopics) ? (t.subTopics as string[]) : [],
          weightInExam: t.weightInExam,
        })),
      },
      matchable,
      preference
    );

    if (ranked.length === 0) {
      return NextResponse.json(
        { error: "לא נמצא מורה מתאים לפי האבחון. נסו שוב מאוחר יותר." },
        { status: 404 }
      );
    }

    let chosen = ranked[0];
    if (typeof body.teacherId === "string") {
      const requested = ranked.find((t) => t.teacherId === body.teacherId);
      if (!requested) {
        return NextResponse.json(
          { error: "המורה שנבחר אינו ברשימת ההתאמות" },
          { status: 400 }
        );
      }
      chosen = requested;
    }

    const existingReferral = await prisma.teacherReferral.findFirst({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    if (existingReferral) {
      const existingTeacher = ranked.find((t) => t.teacherId === existingReferral.teacherId);
      return NextResponse.json({
        message: "כבר קיימת הפנייה פעילה לתלמיד זה",
        match: existingTeacher ?? chosen,
        referralId: existingReferral.id,
        alreadyAssigned: true,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const referral = await tx.teacherReferral.create({
        data: {
          teacherId: chosen.teacherId,
          studentId,
          diagnosticId: diagnostic.id,
          matchScore: chosen.matchScore,
          reason: chosen.reasons.join(" · ") || "fair-match",
        },
      });

      const activeRows = await tx.lesson.findMany({
        where: {
          teacherId: chosen.teacherId,
          status: { in: ["SCHEDULED", "IN_PROGRESS"] },
        },
        select: { studentId: true },
      });
      const activeStudentsCount = new Set(activeRows.map((l) => l.studentId)).size;

      const profile = await tx.teacherProfile.update({
        where: { userId: chosen.teacherId },
        data: {
          referralCount: { increment: 1 },
          activeStudentsCount,
          lastReferralAt: new Date(),
          lastMatchScore: chosen.matchScore,
        },
      });

      return { referral, profile };
    });

    await writeAuditLog({
      actorId: auth.user.id,
      action: "TEACHER_REFERRAL_CREATED",
      entityType: "TeacherReferral",
      entityId: result.referral.id,
      metadata: {
        teacherId: chosen.teacherId,
        studentId,
        matchScore: chosen.matchScore,
        fairDispatch: true,
      },
    });

    const successPayload = {
      message: "ההפניה למורה נרשמה בהצלחה",
      match: chosen,
      referralId: result.referral.id,
    };

    return NextResponse.json(
      {
        success: true,
        data: successPayload,
        ...successPayload,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Match POST error:", error);
    return NextResponse.json({ error: "שגיאה ברישום הפנייה למורה" }, { status: 500 });
  }
}
