import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
import { writeAuditLog } from "../../../../lib/audit";

/**
 * Head of Desk quiet-monitor cron — pulls the CRITICAL risk surface built by
 * `app/api/admin/audit/risk-events` and records the result to AuditLog.
 *
 * Quiet by default: when there are no critical events the route returns
 * `{ quiet: true, critical: 0 }` WITHOUT alerting anyone (the manager only gets
 * a message when an exclusive precondition is violated — see head_of_desk.py).
 *
 * Auth: Authorization: Bearer <HIVE_MONITOR_SECRET> (constant-time compare);
 * falls back to ADMIN/MANAGER session in dev when the secret is unset.
 */
export async function GET(request: Request) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolved = await fetch(
      `${new URL(request.url).origin}/api/admin/audit/risk-events`,
      {
        headers: {
          authorization: request.headers.get("authorization") ?? "",
        },
      }
    ).catch(() => null);

    if (!resolved || !resolved.ok) {
      return NextResponse.json(
        { error: "risk-events probe failed" },
        { status: 502 }
      );
    }

    const data = (await resolved.json()) as {
      events?: Array<{ severity?: string; id?: string }>;
      error?: string;
    };
    const critical = (data.events ?? []).filter(
      (e) => e.severity === "CRITICAL"
    );

    // Record sweep outcome — always append (immutable audit trail), never delete.
    await writeAuditLog({
      action: critical.length > 0 ? "HOD_CRITICAL_SWEEP" : "HOD_QUIET_SWEEP",
      entityType: "HeadOfDesk",
      entityId: critical.map((c) => c.id).join(",") || "quiet",
      metadata: {
        criticalCount: critical.length,
        totalEvents: data.events?.length ?? 0,
        drivenBy: "cron",
      },
    });

    return NextResponse.json({
      success: true,
      quiet: critical.length === 0,
      critical: critical.length,
      eventIds: critical.map((c) => c.id),
    });
  } catch (error: unknown) {
    console.error("[head-of-desk cron] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Constant-time auth identical to the lesson-reminders cron:
 * `HIVE_MONITOR_SECRET` (server-to-server) → else ADMIN/MANAGER session.
 */
async function isAuthorized(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  const input = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  const secret = process.env.HIVE_MONITOR_SECRET;
  if (secret) {
    if (!input) return false;
    const valid = Buffer.from(secret);
    const test = Buffer.from(input);
    if (valid.length !== test.length) return false;
    return crypto.timingSafeEqual(valid, test);
  }

  // Fallback: ADMIN/MANAGER session (dev convenience — matches risk-events).
  const { requireAuth } = await import("../../../../lib/api-auth");
  const session = await requireAuth(["ADMIN", "MANAGER"]);
  return !session.error;
}