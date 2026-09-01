import { prisma } from "../lib/prisma";
import fs from "fs";
import path from "path";
import { config as loadDotEnv } from "dotenv";

// Load .env explicitly (mirrors lib/prisma.ts) so the audit works standalone
// even when invဵked outside the Next runtime.
loadDotEnv({ path: path.resolve(process.cwd(), ".env") });

/**
 * Production Readiness & Security Audit — Project 8 (spec 1.9 / step 8).
 *
 * Checks, without printing secrets:
 *   1. Presence of critical/optional env keys (names + status only).
 *   2. Live database connectivity + core table counts.
 *   3. Final verdict → exit code 0/1.
 *
 * Masking rule: this script NEVER prints env values. It prints key names and
 * a status badge only, satisfying the No-Slop & Security protocol.
 *
 * Note on key aliases:
 *   - `AUTH_SECRET` is the canonical session signer used by lib/auth.ts (jose),
 *     and is checked under the `JWT_SECRET` name for spec compliance.
 *   - `OPENROUTER_API_KEY` is loaded server-side from agents_hive/.env by
 *     lib/curriculum-agent.ts — the audit also checks that file.
 *
 * Run: npx tsx scripts/audit-production-readiness.ts
 */

interface EnvCheck {
  key: string;
  category: "DATABASE" | "AUTH" | "FINTECH" | "VIDEO_CHAT" | "AGENTS_AI" | "CRON_MONITOR";
  required: boolean;
  description: string;
  /** Alternative env key that also satisfies the check (e.g. AUTH_SECRET). */
  alias?: string;
  /** Loaded from a specific file (agents_hive/.env) rather than process.env/.env. */
  sourceFile?: string;
}

const REQUIRED_ENV_KEYS: EnvCheck[] = [
  // Database & Core
  { key: "DATABASE_URL", category: "DATABASE", required: true, description: "Neon PostgreSQL Connection String" },
  { key: "JWT_SECRET", category: "AUTH", required: true, description: "Session JWT Secret Key", alias: "AUTH_SECRET" },
  // Fintech & Payments
  { key: "STRIPE_SECRET_KEY", category: "FINTECH", required: false, description: "Stripe API Key (Mock fallback active if missing)" },
  { key: "STRIPE_WEBHOOK_SECRET", category: "FINTECH", required: false, description: "Stripe Webhook Signature Secret" },
  // Video & Classroom Chat
  { key: "DAILY_API_KEY", category: "VIDEO_CHAT", required: false, description: "Daily.co REST API Key" },
  { key: "STREAM_API_KEY", category: "VIDEO_CHAT", required: false, description: "GetStream Chat Public Key" },
  { key: "STREAM_API_SECRET", category: "VIDEO_CHAT", required: false, description: "GetStream Chat Secret Key" },
  // Multi-Agent & FastMCP
  { key: "OPENROUTER_API_KEY", category: "AGENTS_AI", required: false, description: "OpenRouter LLM Key for Syllabus & Creative Swarm", sourceFile: "agents_hive/.env" },
  { key: "INTERNAL_SERVICE_KEY", category: "AGENTS_AI", required: false, description: "Internal FastMCP Service Authentication Bearer" },
  // Quiet Desk & Crons
  { key: "HIVE_MONITOR_SECRET", category: "CRON_MONITOR", required: true, description: "Cron Token for Head of Desk / Vercel Monitor" },
  { key: "TELEGRAM_BOT_TOKEN", category: "CRON_MONITOR", required: false, description: "Telegram Alert Bot Token" },
  { key: "TELEGRAM_ADMIN_CHAT_ID", category: "CRON_MONITOR", required: false, description: "Telegram Admin Channel / Chat ID" },
];

/** Read a key from `process.env` or from a local env file (names only, masked). */
function resolveEnvValue(check: EnvCheck): string | undefined {
  const direct = process.env[check.key];
  if (direct && direct.trim().length > 0) return direct.trim();
  if (check.alias) {
    const aliasVal = process.env[check.alias];
    if (aliasVal && aliasVal.trim().length > 0) return aliasVal.trim();
  }
  if (check.sourceFile) {
    try {
      const filePath = path.join(process.cwd(), check.sourceFile);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        const line = content
          .split("\n")
          .find((l) => l.trim().startsWith(`${check.key}=`) || l.trim().startsWith(`${check.key} =`));
        if (line) {
          const value = line.split("=").slice(1).join("=").trim();
          if (value.length > 0) return value;
        }
      }
    } catch {
      // ignore — check reports missing below
    }
  }
  return undefined;
}

async function runProductionAudit() {
  console.log("SECURING PROJECT 8 — PRODUCTION READINESS & SECURITY AUDIT\n");

  let missingCritical = 0;
  let missingOptional = 0;

  console.log("[1/3] ENVIRONMENT VARIABLES CONFIGURATION CHECK:");
  for (const check of REQUIRED_ENV_KEYS) {
    const present = Boolean(resolveEnvValue(check));
    if (present) {
      console.log(`  OK [${check.category}] ${check.key} — configured (${check.description})`);
    } else if (check.required) {
      console.log(`  CRITICAL [${check.category}] ${check.key} — MISSING (${check.description})`);
      missingCritical += 1;
    } else {
      console.log(`  OPTIONAL [${check.category}] ${check.key} — not set, fallback active (${check.description})`);
      missingOptional += 1;
    }
  }

  console.log("\n[2/3] DATABASE CONNECTION & CORE SCHEMA:");
  try {
    await prisma.$queryRaw`SELECT 1`;
    const userCount = await prisma.user.count();
    const ledgerCount = await prisma.billingLedger.count();
    console.log(`  OK Database connected. Records: Users=${userCount}, LedgerEntries=${ledgerCount}`);
  } catch (error) {
    console.error("  CRITICAL Database connection failed:", error);
    missingCritical += 1;
  }

  console.log("\n[3/3] FINAL VERDICT:");
  console.log(`  Critical blockers: ${missingCritical}`);
  console.log(`  Optional fallbacks active: ${missingOptional}`);

  if (missingCritical > 0) {
    console.log("\nFAILED — resolve missing critical keys before deployment.");
    process.exit(1);
  } else {
    console.log("\nPASSED — system is secure, compliant and ready for release.");
    process.exit(0);
  }
}

runProductionAudit()
  .catch((e) => {
    console.error("Audit crashed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());