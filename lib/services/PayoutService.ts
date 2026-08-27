import { prisma } from "../prisma";
import { PayoutStatus } from "@prisma/client";
import type { Prisma, PrismaClient } from "@prisma/client";

const PAYOUT_STATUS = PayoutStatus.SCHEDULED;

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
 * Core payout scheduling against a given transaction (or the global client).
 * Idempotent: returns the existing payout if `idempotencyKey` already exists.
 * Writes the immutable Payout + PAYOUT ledger entry in the same transaction.
 */
async function schedulePayoutInClient(
  tx: PrismaClient | Prisma.TransactionClient,
  input: PayoutInput
): Promise<PayoutResult> {
  const existing = await tx.teacherPayout.findUnique({
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
      status: PAYOUT_STATUS,
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
      transactionId: input.idempotencyKey,
    },
  });

  return {
    id: payout.id,
    teacherId: payout.teacherId,
    amount: payout.amount.toString(),
    currency: payout.currency,
    status: payout.status,
  };
}

/**
 * Schedule a teacher payout with idempotency protection.
 * Only MANAGER or ADMIN roles may call this.
 */
export async function schedulePayout(
  input: PayoutInput
): Promise<PayoutResult> {
  return prisma.$transaction((tx) => schedulePayoutInClient(tx, input));
}

/**
 * Transaction-scoped variant for embedding a teacher payout inside a caller's
 * own atomic transaction (e.g. lesson completion). This keeps the payout and
 * its ledger writes consistent with the surrounding writes, rolling back
 * together if any step fails.
 */
export async function schedulePayoutInTransaction(
  tx: Prisma.TransactionClient,
  input: PayoutInput
): Promise<PayoutResult> {
  return schedulePayoutInClient(tx, input);
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
    const existing = await tx.teacherPayout.findUnique({
      where: { id: payoutId },
    });

    if (!existing) {
      throw new Error(`Payout not found: ${payoutId}`);
    }

    if (existing.status === PayoutStatus.PAID) {
      return {
        id: existing.id,
        teacherId: existing.teacherId,
        amount: existing.amount.toString(),
        currency: existing.currency,
        status: existing.status,
      };
    }

    const paidAt = new Date().toISOString();
    const priorMeta =
      existing.metadata &&
      typeof existing.metadata === "object" &&
      !Array.isArray(existing.metadata)
        ? (existing.metadata as Record<string, unknown>)
        : {};

    const payout = await tx.teacherPayout.update({
      where: { id: payoutId },
      data: {
        status: PayoutStatus.PAID,
        metadata: {
          ...priorMeta,
          paidAt,
          completedAt: paidAt,
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
        transactionId: `payout-paid-${payout.id}-${transactionId}`,
        metadata: { paidAt, settlementTransactionId: transactionId },
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