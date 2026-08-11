import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import {
  generateOtpCode,
  normalizePhone,
  OTP_TTL_MS,
  sendSmsOtp,
} from "../../../../lib/otp";

const UNIFORM_MESSAGE = "אם המספר רשום במערכת, נשלח אליו קוד אימות.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = normalizePhone(typeof body.phone === "string" ? body.phone : "");

    if (!phone || phone.length < 9) {
      return NextResponse.json({ error: "מספר טלפון לא תקין" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { phone } });

    // Uniform response — never reveal whether the phone exists (anti user-enumeration).
    if (!user) {
      return NextResponse.json({
        message: UNIFORM_MESSAGE,
        sent: true,
        expiresInMinutes: 10,
      });
    }

    const code = generateOtpCode();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

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

    try {
      await sendSmsOtp(phone, code);
    } catch (smsError) {
      console.error("Forgot password SMS delivery failed");
      // Still return uniform success to avoid enumeration / probing via error differences.
    }

    return NextResponse.json({
      message: UNIFORM_MESSAGE,
      sent: true,
      expiresInMinutes: 10,
    });
  } catch (error: unknown) {
    console.error("Forgot password error");
    return NextResponse.json({ error: "שגיאה בשליחת קוד האימות" }, { status: 500 });
  }
}
