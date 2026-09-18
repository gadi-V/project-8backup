import { NextResponse } from "next/server";
import Stripe from "stripe";
import { LedgerEntryType } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { writeLedgerEntryInTransaction } from "../../../../lib/services/LedgerService";

export const runtime = "nodejs";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

/**
 * Stripe webhooks — credit User + create Payment only after verified signature.
 * Idempotent via WebhookEvent.externalId.
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 401 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Invalid signature";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const externalId = event.id;

  const existing = await prisma.webhookEvent.findUnique({
    where: { externalId },
  });
  if (existing?.processed) {
    return NextResponse.json({ ok: true, duplicate: true }, { status: 200 });
  }

  const eventRow =
    existing ??
    (await prisma.webhookEvent.create({
      data: {
        provider: "stripe",
        eventType: event.type,
        externalId,
        payload: event as object,
        processed: false,
      },
    }));

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }

    await prisma.webhookEvent.update({
      where: { id: eventRow.id },
      data: { processed: true, processedAt: new Date(), error: null },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Webhook handler failed";
    console.error("Stripe webhook error:", error);

    await prisma.webhookEvent.update({
      where: { id: eventRow.id },
      data: { error: message },
    });

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId =
    session.metadata?.userId ||
    (typeof session.client_reference_id === "string" ? session.client_reference_id : null);

  if (!userId) {
    throw new Error("checkout.session.completed missing userId metadata");
  }

  const packageType = session.metadata?.packageType ?? "UNKNOWN";
  const credits = Number(session.metadata?.credits ?? 0);
  const amountPaid = Number(
    session.metadata?.amountPaid ??
      (session.amount_total != null ? session.amount_total / 100 : 0)
  );

  if (!Number.isFinite(credits) || credits < 1) {
    throw new Error("Invalid credits in checkout session metadata");
  }

  const transactionId = session.payment_intent
    ? String(session.payment_intent)
    : session.id;

  // Idempotency: skip if this payment intent / session was already recorded
  const existingPayment = await prisma.payment.findFirst({
    where: { transactionId },
  });
  if (existingPayment) {
    return;
  }

  await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        studentId: userId,
        packageType,
        amountPaid: Math.round(amountPaid),
        creditsAdded: credits,
        transactionId,
        status: "COMPLETED",
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { lessonCredits: { increment: credits } },
    });

    await writeLedgerEntryInTransaction(tx, {
      userId,
      entryType: LedgerEntryType.CHARGE,
      amount: Math.round(amountPaid),
      currency: "ILS",
      description: `תשלום Stripe: ${packageType}`,
      relatedId: payment.id,
      transactionId,
      metadata: {
        packageType,
        creditsAdded: credits,
        status: "COMPLETED",
      },
    });
  });
}
