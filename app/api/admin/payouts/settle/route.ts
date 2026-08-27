import { NextResponse } from "next/server";
import { PayoutStatus } from "@prisma/client";
import { prisma } from "../../../../../lib/prisma";
import { requireAuth } from "../../../../../lib/api-auth";
import { writeAuditLog } from "../../../../../lib/audit";
import { markPayoutPaid } from "../../../../../lib/services/PayoutService";

/**
 * Mark a payout as PAID via markPayoutPaid (timestamp + transaction id).
 * Body: { payoutId: string, transactionId?: string }
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const body = (await request.json()) as {
      payoutId?: unknown;
      transactionId?: unknown;
    };

    if (typeof body.payoutId !== "string" || !body.payoutId.trim()) {
      return NextResponse.json({ error: "payoutId הוא שדה חובה" }, { status: 400 });
    }

    const payoutId = body.payoutId.trim();
    const transactionId =
      typeof body.transactionId === "string" && body.transactionId.trim()
        ? body.transactionId.trim()
        : `manual-settle-${payoutId}-${Date.now()}`;

    const existing = await prisma.teacherPayout.findUnique({
      where: { id: payoutId },
      select: { id: true, status: true, teacherId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "תשלום לא נמצא" }, { status: 404 });
    }

    if (existing.status === PayoutStatus.PAID) {
      return NextResponse.json({
        success: true,
        alreadyPaid: true,
        payout: { id: existing.id, status: existing.status },
      });
    }

    const result = await markPayoutPaid(payoutId, transactionId);

    await writeAuditLog({
      actorId: auth.user.id,
      action: "PAYOUT_SETTLED",
      entityType: "TeacherPayout",
      entityId: payoutId,
      metadata: {
        teacherId: result.teacherId,
        amount: result.amount,
        transactionId,
      },
    });

    return NextResponse.json({
      success: true,
      payout: result,
      transactionId,
    });
  } catch (error: unknown) {
    console.error("Admin payouts settle error:", error);
    return NextResponse.json({ error: "שגיאה בסימון התשלום כשולם" }, { status: 500 });
  }
}
