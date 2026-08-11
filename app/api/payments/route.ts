import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireAuth } from "../../../lib/api-auth";

const PACKAGES: Record<string, { price: number; credits: number; label: string }> = {
  SINGLE: { price: 180, credits: 1, label: "שיעור בודד" },
  TRIO: { price: 510, credits: 3, label: "חבילת 3 שיעורים" },
  MULTI: { price: 800, credits: 5, label: "חבילת 5 שיעורים" },
};

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

function appBaseUrl(request: Request): string {
  return (
    process.env.APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    new URL(request.url).origin
  );
}

/**
 * Create a Stripe Checkout Session. Credits are granted only via the Stripe webhook
 * after `checkout.session.completed` is verified — never here.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { packageType } = body;

    if (!packageType || typeof packageType !== "string") {
      return NextResponse.json({ error: "סוג חבילה הוא שדה חובה" }, { status: 400 });
    }

    const selectedPackage = PACKAGES[packageType];
    if (!selectedPackage) {
      return NextResponse.json({ error: "סוג חבילה לא תקין" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "מערכת התשלומים אינה מוגדרת. פנו לתמיכה." },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const baseUrl = appBaseUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "ils",
            unit_amount: selectedPackage.price * 100,
            product_data: {
              name: selectedPackage.label,
              description: `${selectedPackage.credits} קרדיטי שיעור`,
            },
          },
        },
      ],
      success_url: `${baseUrl}/dashboard?payment=success`,
      cancel_url: `${baseUrl}/dashboard?payment=cancelled`,
      metadata: {
        userId: auth.user.id,
        packageType,
        credits: String(selectedPackage.credits),
        amountPaid: String(selectedPackage.price),
      },
      client_reference_id: auth.user.id,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "יצירת סשן תשלום נכשלה" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error: unknown) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      { error: "שגיאה פנימית בשרת במהלך יצירת התשלום" },
      { status: 500 }
    );
  }
}
