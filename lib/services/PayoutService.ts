import { prisma } from "../prisma";
import { PayoutStatus } from "@prisma/client";
import type { Prisma } from "@prisma/client";

export type PayoutInput = {
  teacherId: string;
  amount: number;
  currency?: string;
  periodStart: Date;
  periodEnd: Date;
  idempotencyKey: string;
  lessonId?: string;
  metadata?: Prisma.JsonValue;
};

export type PayoutResult = {
  id: string;
  teacherId: string;
  amount: string;
  currency: string;
  status: PayoutStatus;
};

/**
 * Schedule a teacher payout with idempotency protection.
 * Only MANAGER or ADMIN roles may call this.
 */
export async function schedulePayout(
  input: PayoutInput
): Promise<PayoutResult> {
  // Check for duplicate idempotency key
  const existing = await prisma.teacherPayout.findUnique({
    where: { idempotencyKey: input.idempotencyKey },
  });

  if (existing) {
    return {
      id: existing.id,
      teacherId: existing.teacherId,
      amount: existing.amount.toString(),
      currency: existing.currency,
      status: existing.status,
    };
  }

  return prisma.$transaction(async (tx) => {
    const payout = await tx.teacherPayout.create({
      data: {
        teacherId: input.teacherId,
        amount: input.amount,
        currency: input.currency ?? "ILS",
        periodStart: input.periodStart,
        periodEnd: input.periodEnd,
        idempotencyKey: input.idempotencyKey,
        lessonId: input.lessonId ?? null,
        metadata: input.metadata ?? undefined,
        status: PayoutStatus.SCHEDULED,
      },
    });

    // Record in immutable ledger
    await tx.billingLedger.create({
      data: {
        userId: input.teacherId,
        entryType: "PAYOUT",
        amount: input.amount,
        currency: input.currency ?? "ILS",
        description: `Payout scheduled: ${input.idempotencyKey}`,
        relatedId: payout.id,
      },
    });

    return {
      id: payout.id,
      teacherId: payout.teacherId,
      amount: payout.amount.toString(),
      currency: payout.currency,
      status: payout.status,
    };
  });
}

/**
 * Mark a payout as processed (PAID).
 * Only MANAGER or ADMIN roles may call this.
 */
export async function markPayoutPaid(
  payoutId: string,
  transactionId: string
): Promise<PayoutResult> {
  return prisma.$transaction(async (tx) => {
    const payout = await tx.teacherPayout.update({
      where: { id: payoutId },
      data: {
        status: PayoutStatus.PAID,
        metadata: {
          completedAt: new Date().toISOString(),
          transactionId,
        },
      },
    });

    await tx.billingLedger.create({
      data: {
        userId: payout.teacherId,
        entryType: "PAYOUT",
        amount: payout.amount,
        currency: payout.currency,
        description: `Payout completed: ${transactionId}`,
        relatedId: payout.id,
        transactionId,
      },
    });

    return {
      id: payout.id,
      teacherId: payout.teacherId,
      amount: payout.amount.toString(),
      currency: payout.currency,
      status: payout.status,
    };
  });
}

/**
 * Get all payouts for a teacher with optional status filter.
 */
export async function getTeacherPayouts(
  teacherId: string,
  status?: PayoutStatus
) {
  return prisma.teacherPayout.findMany({
    where: {
      teacherId,
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}