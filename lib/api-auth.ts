import { NextResponse } from "next/server";
import type { Role } from "@prisma/client";
import { getCurrentUser, type AuthUser } from "./session";

type AuthSuccess = { user: AuthUser; error?: never };
type AuthFailure = { user?: never; error: NextResponse };

export async function requireAuth(allowedRoles?: Role[]): Promise<AuthSuccess | AuthFailure> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: NextResponse.json({ error: "נדרשת התחברות למערכת" }, { status: 401 }),
    };
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return {
      error: NextResponse.json({ error: "אין לך הרשאה לפעולה זו" }, { status: 403 }),
    };
  }

  return { user };
}
