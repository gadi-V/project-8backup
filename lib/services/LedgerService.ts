import { prisma } from "../prisma";
import { LedgerEntryType } from "@prisma/client";
import type { Prisma, PrismaClient } from "@prisma/client";

export type LedgerEntryInput = {
  userId: string;
  entryType: LedgerEntryType;
  amount: number;
  currency?: string;
  description?: string;
  relatedId?: string;
  transactionId?: string;
  metadata?: Prisma.JsonValue;
};

/**
 * Immutable financial ledger entry — never DELETE, only append.
 * Used for all financial tracking: charges, payouts, refunds, platform fees, adjustments.
 */
export async function writeLedgerEntry(
  input: LedgerEntryInput
): Promise<string> {
  return writeLedgerEntryInClient(prisma, input);
}

/**
 * Transaction-scoped variant for embedding ledger writes inside a caller's own
 * atomic transaction (e.g. lesson completion pays out the tutor and books the
 * platform fee in the same unit of work).
 */
export async function writeLedgerEntryInTransaction(
  tx: Prisma.TransactionClient,
  input: LedgerEntryInput
): Promise<string> {
  return writeLedgerEntryInClient(tx, input);
}

/** Core implementation shared by both entry points. */
async function writeLedgerEntryInClient(
  client: PrismaClient | Prisma.TransactionClient,
  input: LedgerEntryInput
): Promise<string> {
  const entry = await client.billingLedger.create({
    data: {
      userId: input.userId,
      entryType: input.entryType,
      amount: input.amount,
      currency: input.currency ?? "ILS",
      description: input.description ?? null,
      relatedId: input.relatedId ?? null,
      transactionId: input.transactionId ?? null,
      metadata: input.metadata ?? undefined,
    },
  });

  return entry.id;
}

/**
 * Get all ledger entries for a user, ordered by most recent first.
 */
export async function getUserLedgerEntries(
  userId: string,
  options?: {
    entryType?: LedgerEntryType;
    limit?: number;
    cursor?: string;
  }
) {
  return prisma.billingLedger.findMany({
    where: {
      userId,
      ...(options?.entryType ? { entryType: options.entryType } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: options?.limit ?? 50,
    ...(options?.cursor
      ? { cursor: { id: options.cursor }, skip: 1 }
      : {}),
  });
}

/**
 * Get aggregated financial summary for a user.
 */
export async function getUserFinancialSummary(userId: string) {
  const entries = await prisma.billingLedger.groupBy({
    by: ["entryType"],
    where: { userId },
    _sum: { amount: true },
    _count: { id: true },
  });

  const summary: Record<string, { total: string; count: number }> = {};
  for (const entry of entries) {
    summary[entry.entryType] = {
      total: entry._sum.amount?.toString() ?? "0",
      count: entry._count.id,
    };
  }

  return summary;
}