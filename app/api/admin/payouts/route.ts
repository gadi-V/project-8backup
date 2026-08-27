import { NextResponse } from "next/server";
import { PayoutStatus } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";

/**
 * List payouts awaiting settlement (SCHEDULED / PROCESSING) with teacher bank details.
 */
export async function GET() {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const payouts = await prisma.teacherPayout.findMany({
      where: {
        status: { in: [PayoutStatus.SCHEDULED, PayoutStatus.PROCESSING] },
      },
      orderBy: { createdAt: "asc" },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            teacherProfile: {
              select: {
                bankName: true,
                bankBranch: true,
                accountNumber: true,
                accountHolderName: true,
              },
            },
          },
        },
        lesson: {
          select: {
            id: true,
            title: true,
            scheduledAt: true,
          },
        },
      },
    });

    return NextResponse.json({
      payouts: payouts.map((p) => ({
        id: p.id,
        amount: p.amount.toString(),
        currency: p.currency,
        status: p.status,
        periodStart: p.periodStart.toISOString(),
        periodEnd: p.periodEnd.toISOString(),
        createdAt: p.createdAt.toISOString(),
        lessonId: p.lessonId,
        lesson: p.lesson
          ? {
              id: p.lesson.id,
              title: p.lesson.title,
              scheduledAt: p.lesson.scheduledAt.toISOString(),
            }
          : null,
        teacher: {
          id: p.teacher.id,
          name: p.teacher.name,
          phone: p.teacher.phone,
          email: p.teacher.email,
          bank: p.teacher.teacherProfile
            ? {
                bankName: p.teacher.teacherProfile.bankName,
                bankBranch: p.teacher.teacherProfile.bankBranch,
                accountNumber: p.teacher.teacherProfile.accountNumber,
                accountHolderName: p.teacher.teacherProfile.accountHolderName,
              }
            : null,
        },
      })),
    });
  } catch (error: unknown) {
    console.error("Admin payouts GET error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת תור התשלומים" }, { status: 500 });
  }
}
