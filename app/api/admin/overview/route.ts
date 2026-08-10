import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";

export async function GET() {
  try {
    const auth = await requireAuth(["ADMIN"]);
    if (auth.error) return auth.error;

    const [
      studentsCount,
      teachersCount,
      pendingTeachers,
      openLeads,
      lessonsCount,
      paymentsAgg,
      recentDiagnostics,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "TEACHER" } }),
      prisma.user.count({ where: { role: "TEACHER", isApproved: false } }),
      prisma.fallbackLead.count({ where: { isHandled: false } }),
      prisma.lesson.count(),
      prisma.payment.aggregate({ _sum: { amountPaid: true }, _count: true }),
      prisma.diagnosticQuiz.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          student: { select: { id: true, name: true, phone: true } },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        studentsCount,
        teachersCount,
        pendingTeachers,
        openLeads,
        lessonsCount,
        paymentsCount: paymentsAgg._count,
        revenueTotal: paymentsAgg._sum.amountPaid ?? 0,
      },
      recentDiagnostics,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת סקירת האדמין" }, { status: 500 });
  }
}
