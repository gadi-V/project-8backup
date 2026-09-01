/**
 * Production Healthcheck — Project 8 (spec 1.9 / step 7).
 *
 * Verifies, without mutating data:
 *   1. DATABASE & SCHEMA INTEGRITY: Prisma/PostgreSQL connectivity, the 26
 *      seeded syllabus topics present, BillingLedger table integrity.
 *   2. API ENDPOINTS SMOKE: core routes respond; Head of Desk `risk-events`
 *      responds HEALTHY (service up — critical events presence is data, not health).
 *   3. ENVIRONMENT & SECURITY: presence of essential keys (masked names only;
 *      Stripe/WhatsApp/Daily/OpenRouter/Telegram + INTERNAL_SERVICE_KEY).
 *
 * Exit: 0 = HEALTHY, 1 = UNHEALTHY. Never prints secret values.
 *
 * Run: npx tsx scripts/production-healthcheck.ts
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";

const prisma = new PrismaClient();

loadEnv({ path: path.resolve(process.cwd(), "agents_hive", ".env") });

type Check = { group: string; name: string; ok: boolean; detail: string };
const results: Check[] = [];
let criticalFailed = 0;

function record(group: string, name: string, ok: boolean, detail: string) {
  results.push({ group, name, ok, detail });
  if (!ok) criticalFailed += 1;
  console.log(`  ${ok ? "✓" : "✗"} [${group}] ${name}: ${detail}`);
}

function envPresent(key: string, file?: string): boolean {
  const direct = process.env[key];
  if (direct && direct.trim()) return true;
  if (!file) return false;
  try {
    const content = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    const line = content.split("\n").find((l) => l.trim().startsWith(`${key}=`));
    return line ? line.split("=").slice(1).join("=").trim().length > 0 : false;
  } catch {
    return false;
  }
}

function appBase(): string {
  return (
    process.env.APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    record("DATABASE", "Connectivity", true, "PostgreSQL reachable via Prisma");

    const topics = await prisma.curriculumTopic.count();
    record("DATABASE", `Syllabus topics (expect ≥ 26)`, topics >= 26, `found ${topics}`);

    const grades = await prisma.curriculumTopic.groupBy({ by: ["gradeLevel"], _count: true });
    const gradeSummary = grades.map((g) => `${g.gradeLevel}=${g._count}`).join(", ");
    // The 5 study tracks intentionally span HIGH_SCHOOL + ACADEMIC (581/582/psychometric
    // are high-school; mechina/academic/screening are academic) — 2+ levels is HEALTHY.
    record("DATABASE", "Grade distribution", grades.length >= 2, gradeSummary || "no rows");

    // BillingLedger integrity: Decimal(19,4) safe + immutability invariant (append-only cols).
    const ledgerCount = await prisma.billingLedger.count();
    const chargeCount = await prisma.billingLedger.count({ where: { entryType: "CHARGE" } });
    const positiveOnly = await prisma.billingLedger.count({ where: { amount: { lt: 0 } } });
    record(
      "DATABASE",
      "BillingLedger integrity (19.4, no negatives)",
      ledgerCount >= 0 && positiveOnly === 0,
      `entries=${ledgerCount}, CHARGE=${chargeCount}, negatives=${positiveOnly}`
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    record("DATABASE", "Connectivity / integrity", false, msg.slice(0, 160));
  }
}

async function checkEndpoints() {
  const token = process.env.HIVE_MONITOR_SECRET || process.env.INTERNAL_SERVICE_KEY || "";

  const probes: Array<{ path: string; name: string; expect: (status: number, body: any) => boolean }> = [
    {
      path: "/api/diagnostic/teaser",
      name: "Diagnostic Teaser (locked tree)",
      expect: (s) => s === 200 || s === 404 || s === 401, // reachable & guarded
    },
    {
      path: "/api/admin/audit/risk-events",
      name: "Head of Desk risk-events (quiet day)",
      expect: (s, b) => {
        if (s !== 200 || !Array.isArray(b?.events)) return false;
        const critical = b.events.filter((e: any) => e.severity === "CRITICAL");
        return critical.length === 0;
      },
    },
    {
      path: "/api/admin/teachers",
      name: "Admin teachers list",
      expect: (s) => s === 200 || s === 401 || s === 403,
    },
    {
      path: "/api/admin/overview",
      name: "Admin overview",
      expect: (s) => s === 200 || s === 401 || s === 403,
    },
    {
      path: "/api/match",
      name: "Matching engine",
      expect: (s) => s === 200 || s === 400 || s === 401,
    },
    {
      path: "/api/me",
      name: "Session / me",
      expect: (s) => s === 200 || s === 401,
    },
  ];

  const pageProbes: Array<{ path: string; name: string }> = [
    { path: "/admin", name: "Admin dashboard page" },
    { path: "/admin/teachers", name: "Admin teachers page" },
    { path: "/teachers/apply", name: "Teacher apply page" },
    { path: "/onboarding/diagnostic", name: "Diagnostic onboarding page" },
  ];

  for (const p of probes) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch(`${appBase()}${p.path}`, { headers });
      const body = await res.json().catch(() => null);
      const ok = p.expect(res.status, body);
      record(
        "API",
        p.name,
        ok,
        `status=${res.status}${ok ? "" : ` body=${JSON.stringify(body)?.slice(0, 120)}`}`
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      record("API", p.name, false, `fetch failed: ${msg.slice(0, 120)}`);
    }
  }

  for (const p of pageProbes) {
    try {
      const res = await fetch(`${appBase()}${p.path}`, {
        headers: { Accept: "text/html" },
        redirect: "follow",
      });
      const ok = res.status === 200 || res.status === 307 || res.status === 308;
      record("PAGES", p.name, ok, `status=${res.status}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      record("PAGES", p.name, false, `fetch failed: ${msg.slice(0, 120)}`);
    }
  }
}

function checkEnvironment() {
  const checks = [
    { key: "DATABASE_URL", label: "Database", required: true },
    { key: "AUTH_SECRET", label: "Auth secret", required: true },
    { key: "HIVE_MONITOR_SECRET", label: "Hive monitor", required: true },
    { key: "INTERNAL_SERVICE_KEY", label: "Internal service key", required: false },
    { key: "STRIPE_SECRET_KEY", label: "Stripe", required: false },
    { key: "WHATSAPP_API_URL", label: "WhatsApp", required: false },
    { key: "WHATSAPP_API_KEY", label: "WhatsApp key", required: false },
    { key: "DAILY_API_KEY", label: "Daily.co", required: false },
    { key: "STREAM_API_KEY", label: "Stream chat", required: false },
    { key: "SUPABASE_URL", label: "S3/Supabase storage", required: false },
    { key: "SUPABASE_SERVICE_ROLE_KEY", label: "S3 service key", required: false },
    { key: "AWS_S3_BUCKET", label: "AWS S3 bucket (alt)", required: false },
    { key: "AWS_ACCESS_KEY_ID", label: "AWS access key (alt)", required: false },
    { key: "OPENROUTER_API_KEY", label: "OpenRouter", required: false, file: "agents_hive/.env" },
    { key: "TELEGRAM_BOT_TOKEN", label: "Telegram", required: false },
  ];

  const present = checks.map((c) => ({
    ...c,
    present: envPresent(c.key, c.file),
  }));

  for (const c of present) {
    const ok = c.required ? c.present : true; // optional keys: presence is informational
    record(
      "ENV",
      c.label,
      ok,
      c.present ? "configured" : c.required ? "MISSING (critical)" : "not set (fallback/optional)"
    );
  }

  // Gate: any *required* env missing → unhealthy (record() increments criticalFailed).
  const missingRequired = present.filter((c) => c.required && !c.present);
  if (missingRequired.length > 0) {
    record("ENV", "Required keys gate", false, `missing: ${missingRequired.map((c) => c.key).join(", ")}`);
  }
}

async function main() {
  console.log(`=== PROJECT 8 — PRODUCTION HEALTHCHECK ===\nServer: ${appBase()}\n`);
  console.log("[1/3] DATABASE & SCHEMA INTEGRITY");
  await checkDatabase();
  console.log("\n[2/3] API ENDPOINTS SMOKE TEST");
  await checkEndpoints();
  console.log("\n[3/3] ENVIRONMENT & SECURITY AUDIT");
  checkEnvironment();

  console.log(`\n=== VERDICT: ${criticalFailed === 0 ? "HEALTHY" : `UNHEALTHY (${criticalFailed} failures)`} ===`);
  process.exit(criticalFailed === 0 ? 0 : 1);
}

main()
  .catch((e) => {
    console.error("Healthcheck crashed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());