# PILOT RELEASE SIGNOFF — Project 8 (Spec 1.9 / Step 7)

> **Pilot:** P8-PILOT-1 · **Date:** 2026-09-01 · **Status:** 🔒 **LOCKED FOR PILOT**

---

## Gate Matrix (Step 7)

| Gate | Command | Expected | Result |
|---|---|---|---|
| **G1 — Production Healthcheck** | `npx tsx scripts/production-healthcheck.ts` | `VERDICT: HEALTHY` | ✅ PASS — 26 topics, quiet desk (0 CRITICAL), 10/10 surfaces |
| **G2 — TypeScript** | `npx tsc --noEmit` | `TSC EXIT: 0` | ✅ PASS |
| **G3 — Agent Hive Daemon** | `python3 agents_hive/run_hive.py` (graceful SIGTERM) | starts MCP + HOD, exits 0 | ✅ PASS — venv auto-reexec + supervised shutdown |
| **G4 — Production Build** | `npm run build` (step 6) | 60/60 pages | ✅ PASS (prior step) |
| **G5 — Curriculum Seed** | `npx tsx scripts/seed-curriculum-production.ts` | ≥26 topics | ✅ PASS (prior step) |

---

## Daemon Topology

```
run_hive.py
├── FastMCP (hive_mcp.py)     — stdio subprocess, supervised
├── Head of Desk (head_of_desk.py) — 60s cycle subprocess
└── heartbeat                 — 5-min liveness tick
```

**Auth:** `HIVE_MONITOR_SECRET` or `INTERNAL_SERVICE_KEY` required (refuses insecure start).

**Shutdown:** SIGINT/SIGTERM → cancel tasks → terminate children → exit 0.

---

## Healthcheck Surfaces

1. **Database:** Prisma connectivity, ≥26 syllabus topics, BillingLedger non-negative.
2. **API:** diagnostic teaser, risk-events (quiet = 0 CRITICAL), admin teachers, match, me.
3. **Pages:** `/admin`, `/admin/teachers`, `/teachers/apply`, `/onboarding/diagnostic`.
4. **Env:** DATABASE_URL, AUTH_SECRET, HIVE_MONITOR_SECRET + optional Stripe/WhatsApp/Daily/S3/OpenRouter/Telegram.

---

## Pilot Scope Lock

- No schema mutations during pilot window.
- Head of Desk: alerts **only** on 3 critical thresholds (no idle noise).
- FastMCP tools proxy through validated Next.js API routes (no direct DB writes from agents).
- Rollback: stop `run_hive.py` + revert to prior Vercel deployment tag.
