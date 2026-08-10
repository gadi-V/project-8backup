import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { signSession, sessionCookieOptions } from "../../../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json({ error: "אימייל/טלפון וסיסמה הם שדות חובה" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: identifier },
          { email: identifier },
        ]
      },
    });

    if (!user) {
      return NextResponse.json({ error: "פרטי ההתחברות שגויים" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "פרטי ההתחברות שגויים" }, { status: 401 });
    }

    const token = await signSession(user.id);

    const response = NextResponse.json({
      message: "התחברת בהצלחה",
      user: {
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (error: unknown) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "שגיאה פנימית בשרת במהלך ההתחברות" }, { status: 500 });
  }
}
