import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/api-auth";
import { writeAuditLog } from "../../../lib/audit";
import {
  rankTeachersForDiagnostic,
  type MatchableTeacher,
} from "../../../lib/matching";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT", "ADMIN"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const requestedStudentId = searchParams.get("studentId");

    let studentId = auth.user.id;
    if (auth.user.role === "ADMIN") {
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
      orderBy: { createdAt: "desc" },
    });

    if (!diagnostic) {
      return NextResponse.json(
        { error: "לא נמצא אבחון לתלמיד. יש להשלים שאלון דיאגנוסטי תחילה." },
        { status: 400 }
      );
    }

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
          },
        },
        availabilities: {
          where: {
            isBooked: false,
            startTime: { gte: new Date() },
          },
          select: { id: true },
        },
      },
    });

    const matchable: MatchableTeacher[] = teachers
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
        },
        openSlotsCount: t.availabilities.length,
      }));

    const ranked = rankTeachersForDiagnostic(
      {
        ageGroup: diagnostic.ageGroup,
        subject: diagnostic.subject,
        challenge: diagnostic.challenge,
      },
      matchable
    );

    return NextResponse.json({
      diagnostic: {
        id: diagnostic.id,
        ageGroup: diagnostic.ageGroup,
        subject: diagnostic.subject,
      },
      matches: ranked,
      recommended: ranked[0] ?? null,
    });
  } catch (error: unknown) {
    console.error("Match GET error:", error);
    return NextResponse.json({ error: "שגיאה בחישוב התאמת מורים" }, { status: 500 });
  }
}

/** Assign / record a fair referral to the chosen (or auto-picked) teacher */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT", "ADMIN"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const studentId =
      auth.user.role === "ADMIN" && typeof body.studentId === "string"
        ? body.studentId
        : auth.user.id;

    if (auth.user.role === "STUDENT" && studentId !== auth.user.id) {
      return NextResponse.json({ error: "אין הרשאה" }, { status: 403 });
    }

    const diagnostic = await prisma.diagnosticQuiz.findFirst({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    if (!diagnostic) {
      return NextResponse.json({ error: "לא נמצא אבחון לתלמיד" }, { status: 400 });
    }

    // Recompute ranking to pick fair teacher (or validate provided teacherId is in band)
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
          },
        },
        availabilities: {
          where: { isBooked: false, startTime: { gte: new Date() } },
          select: { id: true },
        },
      },
    });

    const matchable: MatchableTeacher[] = teachers
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
        },
        openSlotsCount: t.availabilities.length,
      }));

    const ranked = rankTeachersForDiagnostic(
      {
        ageGroup: diagnostic.ageGroup,
        subject: diagnostic.subject,
        challenge: diagnostic.challenge,
      },
      matchable
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

      const profile = await tx.teacherProfile.update({
        where: { userId: chosen.teacherId },
        data: {
          referralCount: { increment: 1 },
          activeStudentsCount: { increment: 1 },
          lastReferralAt: new Date(),
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
      },
    });

    return NextResponse.json(
      {
        message: "ההפניה למורה נרשמה בהצלחה",
        match: chosen,
        referralId: result.referral.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Match POST error:", error);
    return NextResponse.json({ error: "שגיאה ברישום הפנייה למורה" }, { status: 500 });
  }
}
