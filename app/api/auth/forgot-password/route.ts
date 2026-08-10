import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import {
  generateOtpCode,
  normalizePhone,
  OTP_TTL_MS,
  sendMockSmsOtp,
} from "../../../../lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = normalizePhone(typeof body.phone === "string" ? body.phone : "");

    if (!phone || phone.length < 9) {
      return NextResponse.json({ error: "מספר טלפון לא תקין" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { phone } });

    // Generic response to avoid account enumeration; still no OTP if missing
    if (!user) {
      return NextResponse.json({
        message: "אם המספר רשום במערכת, נשלח אליו קוד אימות.",
        sent: false,
      });
    }

    const code = generateOtpCode();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    // Invalidate previous unused reset OTPs for this phone
    await prisma.otpCode.updateMany({
      where: {
        phone,
        purpose: "PASSWORD_RESET",
        usedAt: null,
      },
      data: { usedAt: new Date() },
    });

    await prisma.otpCode.create({
      data: {
        phone,
        codeHash,
        purpose: "PASSWORD_RESET",
        expiresAt,
      },
    });

    sendMockSmsOtp(phone, code);

    return NextResponse.json({
      message: "קוד אימות נשלח לטלפון (בדיקה: ראו את הקוד בטרמינל השרת).",
      sent: true,
      expiresInMinutes: 10,
    });
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "שגיאה בשליחת קוד האימות" }, { status: 500 });
  }
}
