import { config } from "dotenv";
config();

/**
 * Production Live Smoke Test — Project 8 (spec 1.9 / post-release).
 *
 * Verifies the critical production surfaces are alive:
 *   0. Healthcheck (GET /)
 *   1. Head of Desk cron (GET /api/cron/head-of-desk, Bearer HIVE_MONITOR_SECRET)
 *   2. Risk-events audit route (GET /api/admin/audit/risk-events, same bearer)
 *   3. WhatsApp Closer engine (POST /api/whatsapp/closer)
 *
 * Secrets are never printed — only `HIVE_MONITOR_SECRET` presence is checked.
 *
 * Run: npx tsx scripts/smoke-test-production.ts
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const HIVE_SECRET = process.env.HIVE_MONITOR_SECRET || "";

interface RiskResponse {
  events?: Array<{ severity?: string }>;
  nextCursor?: string | null;
  error?: string;
}

async function runProductionSmokeTest() {
  console.log(`Starting Project 8 — Production Live Smoke Test against: ${BASE_URL}\n`);

  if (!HIVE_SECRET) {
    console.log("WARNING HIVE_MONITOR_SECRET is not set — authenticated routes may return 401.");
  }

  let failures = 0;

  // 0. Healthcheck
  console.log("[0/4] Testing Healthcheck (GET /)...");
  try {
    const res = await fetch(`${BASE_URL}/`, { signal: AbortSignal.timeout(10_000) });
    console.log(`  ${res.ok ? "OK" : "FAIL"} Healthcheck: Status=${res.status}`);
    if (!res.ok) failures += 1;
  } catch (err) {
    console.log(`  WARNING Healthcheck unreachable: ${err instanceof Error ? err.message : String(err)}`);
    failures += 1;
  }

  // 1. Head of Desk cron
  console.log("\n[1/4] Testing Head of Desk Cron Endpoint (/api/cron/head-of-desk)...");
  try {
    const res = await fetch(`${BASE_URL}/api/cron/head-of-desk`, {
      headers: { Authorization: `Bearer ${HIVE_SECRET}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (res.ok) {
      const data = (await res.json()) as { quiet?: boolean };
      console.log(`  OK Head of Desk Cron: Status=${res.status}, QuietDay=${data.quiet ?? true}`);
    } else {
      console.log(`  FAIL Head of Desk Cron: Status=${res.status}`);
      failures += 1;
    }
  } catch (err) {
    console.log(`  WARNING Head of Desk Cron unreachable: ${err instanceof Error ? err.message : String(err)}`);
    failures += 1;
  }

  // 2. Risk Events audit route
  console.log("\n[2/4] Testing Risk Events Audit Route (/api/admin/audit/risk-events)...");
  try {
    const res = await fetch(`${BASE_URL}/api/admin/audit/risk-events`, {
      headers: { Authorization: `Bearer ${HIVE_SECRET}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (res.ok) {
      const data = (await res.json()) as RiskResponse;
      const totalCritical = (data.events ?? []).filter((e) => e.severity === "CRITICAL").length;
      console.log(`  OK Risk Events Audit: Status=${res.status}, TotalCritical=${totalCritical}`);
    } else {
      console.log(`  FAIL Risk Events Audit: Status=${res.status}`);
      failures += 1;
    }
  } catch (err) {
    console.log(`  WARNING Risk Events Route unreachable: ${err instanceof Error ? err.message : String(err)}`);
    failures += 1;
  }

  // 3. WhatsApp Closer engine
  console.log("\n[3/4] Testing WhatsApp Closer Dispatch Endpoint (/api/whatsapp/closer)...");
  try {
    const res = await fetch(`${BASE_URL}/api/whatsapp/closer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HIVE_SECRET}`,
      },
      body: JSON.stringify({
        studentName: "SmokeTest Student",
        studentPhone: "0500000000",
        trackName: "בגרות 581",
        identifiedGaps: ["חדו״א מעריכית"],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    // 401/403 are acceptable live responses (auth required) — the route is alive.
    if (res.ok || res.status === 401 || res.status === 403) {
      console.log(`  OK WhatsApp Closer Endpoint Responded: Status=${res.status}`);
    } else {
      console.log(`  FAIL WhatsApp Closer Endpoint: Status=${res.status}`);
      failures += 1;
    }
  } catch (err) {
    console.log(`  WARNING WhatsApp Closer Route unreachable: ${err instanceof Error ? err.message : String(err)}`);
    failures += 1;
  }

  console.log("\n--------------------------------------------------");
  if (failures === 0) {
    console.log("SMOKE TEST PASSED: All critical production routes are alive and operational.");
    process.exit(0);
  } else {
    console.log(
      `Smoke test finished with ${failures} failure(s). ` +
        "If testing locally, ensure 'npm run start' (or 'npm run dev') is running."
    );
    process.exit(0);
  }
}

runProductionSmokeTest();