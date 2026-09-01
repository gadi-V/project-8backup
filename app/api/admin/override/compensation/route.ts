import { NextResponse } from "next/server";
import { LedgerEntryType } from "@prisma/client";
import { prisma } from "../../../../../lib/prisma";
import { requireAuth } from "../../../../../lib/api-auth";
import { writeAuditLog } from "../../../../../lib/audit";

/**
 * Admin Super-Override — הנפקת שיעור חוזר (make-up) ללא חיוב התלמיד.
 *
 * POST /api/admin/override/compensation
 * Body: { studentId: string, reason: string }
 *
 * Financial logic (Immutable Ledger, add-only):
 * ・ רוכש את  שורת ה-CHARGE המקורית האחרונה של התלמיד (relatedId / metadata).
 * ・ כותב שורת PLATFORM_COMPENSATION מאוזנת מול אותה CHARGE — זיכוי מלא
 *    לעומת החיוב המקורי, ללא תנועת מזומן נוספת.
 * ・ מעניק קרדיט שיעור אחד (lessonCredits +1) לטובת התלמיד.
 * ・ Idempotency: מפתח קבוע ליום — מניעת כפילויות באותו יום.
 */

const LESSON_CREDIT_COMPENSATION = 1;
const LESSON_VALUE_ILS = 180;

async function hasIssuedCompensationToday(studentId: string, now: Date): Promise<boolean> {
  const startOfDay = new Date(now);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const existing = await prisma.billingLedger.findFirst({
    where: {
      userId: studentId,
      entryType: LedgerEntryType.PLATFORM_COMPENSATION,
      createdAt: { gte: startOfDay },
    },
    select: { id: true },
  });
  return existing !== null;
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const body = (await request.json()) as {
      studentId?: unknown;
      reason?: unknown;
      amountIls?: unknown;
    };

    const studentId = typeof body.studentId === "string" ? body.studentId.trim() : "";
    const reason =
      typeof body.reason === "string" && body.reason.trim()
        ? body.reason.trim().slice(0, 500)
        : "";
    const amountIls =
      typeof body.amountIls === "number" && body.amountIls > 0
        ? body.amountIls
        : LESSON_VALUE_ILS;

    if (!studentId || !reason) {
      return NextResponse.json(
        { success: false, error: "studentId ו-reason הם שדות חובה" },
        { status: 400 }
      );
    }

    const student = await prisma.user.findUnique({
      where: { id: studentId },
      select: { id: true, name: true, lessonCredits: true },
    });
    if (!student) {
      return NextResponse.json(
        { success: false, error: "התלמיד לא נמצא" },
        { status: 404 }
      );
    }

    const today = new Date();
    if (await hasIssuedCompensationToday(studentId, today)) {
      return NextResponse.json(
        {
          success: false,
          error: "כבר הונפק שיעור פיצוי היום לתלמיד זה — יש להמתין ליום הבא",
        },
        { status: 409 }
      );
    }

    // 1) Original CHARGE to balance against.
    const originalCharge = await prisma.billingLedger.findFirst({
      where: {
        userId: studentId,
        entryType: LedgerEntryType.CHARGE,
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, transactionId: true, amount: true },
    });

    // 2) Idempotency key — one compensation per student per day.
    const dayKey = today.toISOString().slice(0, 10);
    const idempotencyKey = `platform-comp-${studentId}-${dayKey}`;

    const compensated = await prisma.$transaction(async (tx) => {
      const existing = await tx.billingLedger.findUnique({
        where: { transactionId: idempotencyKey },
        select: { id: true },
      });
      if (existing) {
        return { alreadyIssued: true as const };
      }

      const entry = await tx.billingLedger.create({
        data: {
          userId: studentId,
          entryType: LedgerEntryType.PLATFORM_COMPENSATION,
          amount: amountIls,
          currency: "ILS",
          description: `שיעור פיצוי ללא חיוב (Head of Desk override): ${reason}`,
          relatedId: originalCharge?.id ?? null,
          transactionId: idempotencyKey,
          metadata: {
            reason,
            issuedById: auth.user.id,
            balancedAgainst: "CHARGE",
            originalChargeTransactionId: originalCharge?.transactionId ?? null,
            originalChargeAmount: originalCharge
              ? Number(originalCharge.amount)
              : null,
            issuedAt: today.toISOString(),
          },
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: studentId },
        data: { lessonCredits: { increment: LESSON_CREDIT_COMPENSATION } },
        select: { lessonCredits: true },
      });

      await tx.auditLog.create({
        data: {
          actorId: auth.user.id,
          action: "ADMIN_OVERRIDE_COMPENSATION",
          entityType: "User",
          entityId: studentId,
          metadata: {
            reason,
            ledgerEntryId: entry.id,
            idempotencyKey,
            creditsGranted: LESSON_CREDIT_COMPENSATION,
            amountIls,
            balancedAgainst: originalCharge?.id ?? null,
          },
        },
      });

      return { alreadyIssued: false as const, entryId: entry.id, lessonCredits: updatedUser.lessonCredits };
    });

    if (compensated.alreadyIssued) {
      return NextResponse.json({
        success: true,
        alreadyIssued: true,
        data: { message: "שיעור הפיצוי כבר הונפק קודם לכן (Idempotent)" },
      });
    }

    void writeAuditLog({
      actorId: auth.user.id,
      action: "ADMIN_OVERRIDE_COMPENSATION",
      entityType: "User",
      entityId: studentId,
      metadata: { reason, idempotencyKey, amountIls },
    }).catch(() => undefined);

    return NextResponse.json({
      success: true,
      data: {
        message: "שיעור פיצוי הונפק בהצלחה ללא חיוב התלמיד",
        studentId,
        creditsGranted: LESSON_CREDIT_COMPENSATION,
        lessonCredits: compensated.lessonCredits,
        ledgerEntryId: compensated.entryId,
        amountIls,
        balancedAgainst: originalCharge?.id ?? null,
      },
    });
  } catch (error: unknown) {
    console.error("[override/compensation] error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בהנפקת שיעור הפיצוי" },
      { status: 500 }
    );
  }
}