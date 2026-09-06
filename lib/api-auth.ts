import crypto from "crypto";
import { NextResponse } from "next/server";
import type { Role } from "@prisma/client";
import { getCurrentUser, type AuthUser } from "./session";
import { isHiveMonitorBearer } from "./hive-m2m-auth";

export { isHiveMonitorBearer } from "./hive-m2m-auth";

type AuthSuccess = { user: AuthUser; error?: never };
type AuthFailure = { user?: never; error: NextResponse };

export type DualAuthSuccess = {
  user: AuthUser;
  /** session = browser cookie; m2m = Authorization Bearer HIVE_MONITOR_SECRET */
  via: "session" | "m2m";
  /** Prefer for AuditLog.actorId — null for pure machine callers (FK-safe). */
  actorId: string | null;
  error?: never;
};

type DualAuthFailure = { user?: never; via?: never; actorId?: never; error: NextResponse };

/** Synthetic ADMIN principal used when FastMCP / cron authenticates via monitor secret. */
export const HIVE_M2M_ACTOR: AuthUser = {
  id: "system:hive-monitor",
  name: "Agents Hive (M2M)",
  role: "ADMIN",
  lessonCredits: 0,
  isApproved: true,
};

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

/**
 * Dual-auth for FastMCP ↔ Next.js M2M:
 * 1. Valid `Authorization: Bearer HIVE_MONITOR_SECRET` → ADMIN system actor.
 * 2. Else fall back to session cookie + role check (`requireAuth`).
 */
export async function requireAuthOrMonitor(
  request: Request,
  allowedRoles?: Role[]
): Promise<DualAuthSuccess | DualAuthFailure> {
  if (isHiveMonitorBearer(request)) {
    return {
      user: HIVE_M2M_ACTOR,
      via: "m2m",
      actorId: null,
    };
  }

  const session = await requireAuth(allowedRoles);
  if (session.error) {
    return { error: session.error };
  }

  return {
    user: session.user,
    via: "session",
    actorId: session.user.id,
  };
}

/** Node-only token check (cron helpers). Prefer isHiveMonitorBearer for Request objects. */
export function verifyHiveMonitorToken(token: string): boolean {
  const secret = process.env.HIVE_MONITOR_SECRET?.trim();
  if (!secret || !token) return false;
  try {
    const expected = Buffer.from(secret);
    const actual = Buffer.from(token);
    if (expected.length !== actual.length) return false;
    return crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
