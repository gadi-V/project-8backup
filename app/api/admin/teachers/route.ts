import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";
import { writeAuditLog } from "../../../../lib/audit";
import { VettingStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const searchQuery = searchParams.get("q");

    const whereClause: Record<string, unknown> = {};

    if (statusParam && Object.values(VettingStatus).includes(statusParam as VettingStatus)) {
      whereClause.vettingStatus = statusParam as VettingStatus;
    }

    if (searchQuery) {
      whereClause.user = {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { email: { contains: searchQuery, mode: "insensitive" } },
          { phone: { contains: searchQuery, mode: "insensitive" } },
        ],
      };
    }

    const teachers = await prisma.teacherProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        vettingStepLogs: {
          select: { stepNumber: true, status: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedTeachers = teachers.map((t) => {
      const passedStepsCount = t.vettingStepLogs.filter(
        (s) => s.status === "PASSED" || s.status === "SKIPPED"
      ).length;

      return {
        id: t.id,
        userId: t.userId,
        name: t.user.name || "Unknown",
        email: t.user.email,
        phone: t.user.phone || "-",
        vettingStatus: t.vettingStatus,
        vettingStage: t.vettingStage,
        payoutType: t.payoutType,
        isApproved: t.isApproved,
        passedStepsCount,
        totalSteps: 6,
        createdAt: t.createdAt,
      };
    });

    return NextResponse.json({ teachers: formattedTeachers }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin teachers list:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
        { error: "teacherId and isApproved are required" },
        { status: 400 }
      );
    }

    const teacher = await prisma.user.findUnique({ where: { id: teacherId } });
    if (!teacher || teacher.role !== "TEACHER") {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
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
      message: isApproved ? "Teacher approved" : "Teacher approval revoked",
      teacher: updated,
    });
  } catch (error) {
    console.error("Admin teachers PATCH error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
