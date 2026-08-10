import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";
import { writeAuditLog } from "../../../../lib/audit";

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean);
}

export async function PUT(request: Request) {
  try {
    const auth = await requireAuth(["ADMIN", "TEACHER"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const teacherId =
      auth.user.role === "ADMIN" && typeof body.teacherId === "string"
        ? body.teacherId
        : auth.user.id;

    if (auth.user.role === "TEACHER" && teacherId !== auth.user.id) {
      return NextResponse.json({ error: "אין הרשאה לערוך פרופיל של מורה אחר" }, { status: 403 });
    }

    if (auth.user.role === "TEACHER" && !auth.user.isApproved) {
      return NextResponse.json({ error: "חשבון המורה טרם אושר" }, { status: 403 });
    }

    const teacher = await prisma.user.findUnique({ where: { id: teacherId } });
    if (!teacher || teacher.role !== "TEACHER") {
      return NextResponse.json({ error: "מורה לא נמצא" }, { status: 404 });
    }

    const subjects = parseStringArray(body.subjects);
    const ageGroups = parseStringArray(body.ageGroups);
    const bio = typeof body.bio === "string" ? body.bio.trim() || null : null;
    const profileImageUrl =
      typeof body.profileImageUrl === "string" ? body.profileImageUrl.trim() || null : null;

    if (subjects.length === 0) {
      return NextResponse.json({ error: "יש להזין לפחות מקצוע התמחות אחד" }, { status: 400 });
    }

    const profile = await prisma.teacherProfile.upsert({
      where: { userId: teacherId },
      create: {
        userId: teacherId,
        subjects,
        ageGroups,
        bio,
        profileImageUrl,
      },
      update: {
        subjects,
        ageGroups,
        bio,
        profileImageUrl,
      },
    });

    await writeAuditLog({
      actorId: auth.user.id,
      action: "TEACHER_PROFILE_UPSERT",
      entityType: "TeacherProfile",
      entityId: profile.id,
      metadata: { teacherId, subjects, ageGroups },
    });

    return NextResponse.json({
      message: "פרופיל המורה נשמר בהצלחה",
      profile,
    });
  } catch (error: unknown) {
    console.error("Teacher profile PUT error:", error);
    return NextResponse.json({ error: "שגיאה בשמירת פרופיל המורה" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(["ADMIN", "TEACHER"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const teacherIdParam = searchParams.get("teacherId");

    const teacherId =
      auth.user.role === "ADMIN" && teacherIdParam
        ? teacherIdParam
        : auth.user.id;

    if (auth.user.role === "TEACHER" && teacherId !== auth.user.id) {
      return NextResponse.json({ error: "אין הרשאה" }, { status: 403 });
    }

    const profile = await prisma.teacherProfile.findUnique({
      where: { userId: teacherId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            isApproved: true,
            _count: {
              select: {
                availabilities: true,
                givenLessons: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ profile });
  } catch (error: unknown) {
    console.error("Teacher profile GET error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת פרופיל המורה" }, { status: 500 });
  }
}
