import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/api-auth";

const PACKAGES: Record<string, { price: number; credits: number }> = {
  SINGLE: { price: 180, credits: 1 },
  TRIO: { price: 510, credits: 3 },
  MULTI: { price: 800, credits: 5 },
};

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { packageType } = body;

    if (!packageType) {
      return NextResponse.json({ error: "סוג חבילה הוא שדה חובה" }, { status: 400 });
    }

    const selectedPackage = PACKAGES[packageType];
    if (!selectedPackage) {
      return NextResponse.json({ error: "סוג חבילה לא תקין" }, { status: 400 });
    }

    const mockTransactionId = `TX-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    const result = await prisma.$transaction(async (tx) => {
      const paymentLog = await tx.payment.create({
        data: {
          studentId: auth.user.id,
          packageType,
          amountPaid: selectedPackage.price,
          creditsAdded: selectedPackage.credits,
          transactionId: mockTransactionId,
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: auth.user.id },
        data: {
          lessonCredits: { increment: selectedPackage.credits },
        },
      });

      return { paymentLog, updatedUser };
    });

    return NextResponse.json({
      message: "הרכישה בוצעה בהצלחה והקרדיטים עודכנו",
      newCredits: result.updatedUser.lessonCredits,
      transactionId: result.paymentLog.transactionId,
    });
  } catch (error: unknown) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: "שגיאה פנימית בשרת במהלך עיבוד הרכישה" }, { status: 500 });
  }
}
