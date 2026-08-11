import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";
import { writeAuditLog } from "../../../../lib/audit";

export async function GET() {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        isApproved: true,
        createdAt: true,
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
        _count: {
          select: {
            availabilities: true,
            givenLessons: true,
          },
        },
      },
      orderBy: [{ isApproved: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ teachers });
  } catch (error) {
    console.error("Admin teachers GET error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת המורים" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { teacherId, isApproved } = body;

    if (!teacherId || typeof isApproved !== "boolean") {
      return NextResponse.json(
        { error: "teacherId ו-isApproved הם שדות חובה" },
        { status: 400 }
      );
    }

    const teacher = await prisma.user.findUnique({ where: { id: teacherId } });
    if (!teacher || teacher.role !== "TEACHER") {
      return NextResponse.json({ error: "מורה לא נמצא" }, { status: 404 });
    }

    const updated = await prisma.user.update({
      where: { id: teacherId },
      data: { isApproved },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        isApproved: true,
      },
    });

    await writeAuditLog({
      actorId: auth.user.id,
      action: isApproved ? "TEACHER_APPROVED" : "TEACHER_REVOKED",
      entityType: "User",
      entityId: teacherId,
      metadata: { teacherName: updated.name, isApproved },
    });

    return NextResponse.json({
      message: isApproved ? "המורה אושר בהצלחה" : "אישור המורה בוטל",
      teacher: updated,
    });
  } catch (error) {
    console.error("Admin teachers PATCH error:", error);
    return NextResponse.json({ error: "שגיאה בעדכון סטטוס המורה" }, { status: 500 });
  }
}
