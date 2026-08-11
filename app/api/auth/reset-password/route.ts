import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import {
  normalizePhone,
  OTP_MAX_ATTEMPTS,
} from "../../../../lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = normalizePhone(typeof body.phone === "string" ? body.phone : "");
    const code = typeof body.code === "string" ? body.code.trim() : "";
    const newPassword =
      typeof body.newPassword === "string" ? body.newPassword : "";

    if (!phone || phone.length < 9) {
      return NextResponse.json({ error: "מספר טלפון לא תקין" }, { status: 400 });
    }
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "קוד האימות חייב להיות 6 ספרות" }, { status: 400 });
    }
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "הסיסמה החדשה חייבת להכיל לפחות 6 תווים" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return NextResponse.json({ error: "פרטי האימות שגויים או שפגו תוקפם" }, { status: 400 });
    }

    const otp = await prisma.otpCode.findFirst({
      where: {
        phone,
        purpose: "PASSWORD_RESET",
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otp) {
      return NextResponse.json(
        { error: "לא נמצא קוד תקף. בקשו קוד חדש." },
        { status: 400 }
      );
    }

    if (otp.attempts >= OTP_MAX_ATTEMPTS) {
      await prisma.otpCode.update({
        where: { id: otp.id },
        data: { usedAt: new Date() },
      });
      return NextResponse.json(
        { error: "חרגתם ממספר ניסיונות האימות. בקשו קוד חדש." },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(code, otp.codeHash);
    if (!isValid) {
      await prisma.otpCode.update({
        where: { id: otp.id },
        data: { attempts: { increment: 1 } },
      });
      return NextResponse.json({ error: "קוד האימות שגוי" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      }),
      prisma.otpCode.update({
        where: { id: otp.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json({
      message: "הסיסמה עודכנה בהצלחה. אפשר להתחבר עם הסיסמה החדשה.",
    });
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "שגיאה באיפוס הסיסמה" }, { status: 500 });
  }
}
