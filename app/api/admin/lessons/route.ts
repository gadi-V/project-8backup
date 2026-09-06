import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";

/**
 * GET /api/admin/lessons
 * Read-only lesson list for the Admin Lesson Management / Super-Override panel.
 * Does not mutate Lesson, BillingLedger, or cancellation policy.
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();
    const takeRaw = Number(searchParams.get("take") || "40");
    const take = Number.isFinite(takeRaw) ? Math.min(Math.max(takeRaw, 1), 100) : 40;

    const lessons = await prisma.lesson.findMany({
      where: q
        ? {
            OR: [
              { id: { contains: q } },
              { title: { contains: q, mode: "insensitive" } },
              { student: { name: { contains: q, mode: "insensitive" } } },
              { student: { phone: { contains: q } } },
              { teacher: { name: { contains: q, mode: "insensitive" } } },
            ],
          }
        : undefined,
      orderBy: { scheduledAt: "desc" },
      take,
      select: {
        id: true,
        title: true,
        status: true,
        scheduledAt: true,
        canceledAt: true,
        appealStatus: true,
        studentId: true,
        teacherId: true,
        student: { select: { id: true, name: true, phone: true } },
        teacher: { select: { id: true, name: true, phone: true } },
      },
    });

    return NextResponse.json({ success: true, data: { lessons } });
  } catch (error: unknown) {
    console.error("[admin/lessons] GET error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בטעינת רשימת השיעורים" },
      { status: 500 }
    );
  }
}
