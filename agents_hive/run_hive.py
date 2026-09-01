#!/usr/bin/env python3
"""
run_hive.py — managed runner for the Project 8 Agent Hive (production/background).

Starts and supervises:
  1. FastMCP server:   agents_hive/hive_mcp.py  (stdio, `mcp.run()`)
  2. Head of Desk:     agents_hive/head_of_desk.py quiet loop —
     polls `GET /api/admin/audit/risk-events` every 60s (server-to-server auth
     via HIVE_MONITOR_SECRET) and never emits idle alerts.

Graceful shutdown on SIGINT/SIGTERM: cancels tasks, closes subprocess, exits 0.

Env loading: reads `agents_hive/.env` first (FastMCP/OpenRouter config), then
`project_root/.env.local` (Next.js runtime overrides) — additive, never mutates
existing files. Internal FastMCP service auth uses INTERNAL_SERVICE_KEY when set.
"""

import asyncio
import json
import os
import signal
import subprocess
import sys
import time
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv

HIVE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = HIVE_DIR.parent

# 1) Hive-local secrets (OpenRouter, Telegram, manager phone, monitor secret).
load_dotenv(dotenv_path=HIVE_DIR / ".env")
# 2) Next.js runtime overrides (.env.local or .env) — additive, never overwrites.
load_dotenv(dotenv_path=PROJECT_ROOT / ".env.local", override=False)
load_dotenv(dotenv_path=PROJECT_ROOT / ".env", override=False)

# Server-to-server token for the Head of Desk poller.
MONITOR_SECRET = os.getenv("HIVE_MONITOR_SECRET", "").strip()
INTERNAL_SERVICE_KEY = os.getenv("INTERNAL_SERVICE_KEY", "").strip()
APP_URL = (os.getenv("NEXT_PUBLIC_APP_URL") or os.getenv("APP_URL") or "http://localhost:3000").rstrip("/")

HEAD_OF_DESK_INTERVAL_SECONDS = int(os.getenv("HEAD_OF_DESK_INTERVAL_SECONDS", "60"))
RISK_ENDPOINT = "/api/admin/audit/risk-events"

SHUTDOWN_EVENT = asyncio.Event()


def _log(line: str) -> None:
    print(f"[run_hive {time.strftime('%H:%M:%S')}] {line}", flush=True)


async def _http_get(path: str) -> dict:
    """Server-to-server GET with monitor/internal bearer when configured."""
    headers = {"Content-Type": "application/json"}
    token = MONITOR_SECRET or INTERNAL_SERVICE_KEY
    if token:
        headers["Authorization"] = f"Bearer {token}"
    import urllib.request
    import urllib.error

    req = urllib.request.Request(f"{APP_URL}{path}", headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        return {"success": False, "httpStatus": e.code, "error": body[:300]}
    except Exception as e:  # network / conn refused
        return {"success": False, "error": str(e)}


async def head_of_desk_loop() -> None:
    """Quiet loop: poll risk-events every 60s. Only surfaces CRITICAL events."""
    _log(f"Head of Desk loop started (interval={HEAD_OF_DESK_INTERVAL_SECONDS}s) → {APP_URL}{RISK_ENDPOINT}")
    while not SHUTDOWN_EVENT.is_set():
        try:
            payload = await _http_get(RISK_ENDPOINT)
            events = payload.get("events", [])
            critical = [e for e in events if e.get("severity") == "CRITICAL"]
            if critical:
                _log(f"CRITICAL events: {len(critical)} → {[e.get('kind') for e in critical]}")
            else:
                _log("quiet — 0 critical events")
        except Exception as exc:  # never crash the runner
            _log(f"risk-events poll failed (silent): {exc}")
        try:
            await asyncio.wait_for(SHUTDOWN_EVENT.wait(), timeout=HEAD_OF_DESK_INTERVAL_SECONDS)
        except asyncio.TimeoutError:
            continue


async def run_mcp_server() -> None:
    """Spawn `hive_mcp.py` (stdio) and stream its output."""
    venv_python = HIVE_DIR / "venv" / "bin" / "python"
    python_exec = str(venv_python) if venv_python.exists() else sys.executable

    _log(f"Starting FastMCP server: {python_exec} hive_mcp.py")
    proc = await asyncio.create_subprocess_exec(
        python_exec,
        str(HIVE_DIR / "hive_mcp.py"),
        cwd=str(HIVE_DIR),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
    )

    async def _tail():
        assert proc.stdout is not None
        while True:
            line = await proc.stdout.readline()
            if not line:
                break
            _log(f"[mcp] {line.decode('utf-8', errors='replace').rstrip()}")

    tail_task = asyncio.create_task(_tail())

    async def _wait():
        rc = await proc.wait()
        _log(f"FastMCP server exited rc={rc}")
        SHUTDOWN_EVENT.set()

    wait_task = asyncio.create_task(_wait())

    # Keep alive until shutdown; kill child on exit.
    try:
        while not SHUTDOWN_EVENT.is_set():
            await asyncio.sleep(1)
    finally:
        if proc.returncode is None:
            proc.terminate()
            try:
                await asyncio.wait_for(proc.wait(), timeout=5)
            except asyncio.TimeoutError:
                proc.kill()
        tail_task.cancel()
        wait_task.cancel()


async def run_head_of_desk_process() -> None:
    """Supervise `head_of_desk.py` as a recurring subprocess (60s cycle)."""
    venv_python = HIVE_DIR / "venv" / "bin" / "python"
    python_exec = str(venv_python) if venv_python.exists() else sys.executable
    hod_script = str(HIVE_DIR / "head_of_desk.py")

    while not SHUTDOWN_EVENT.is_set():
        _log(f"Starting Head of Desk daemon cycle: {python_exec} head_of_desk.py")
        proc = await asyncio.create_subprocess_exec(
            python_exec,
            hod_script,
            cwd=str(HIVE_DIR),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
        )

        async def _tail() -> None:
            assert proc.stdout is not None
            while True:
                line = await proc.stdout.readline()
                if not line:
                    break
                _log(f"[hod] {line.decode('utf-8', errors='replace').rstrip()}")

        tail_task = asyncio.create_task(_tail())
        try:
            rc = await proc.wait()
        finally:
            tail_task.cancel()

        _log(f"Head of Desk cycle exited rc={rc}")
        if SHUTDOWN_EVENT.is_set():
            break
        # Respawn after the quiet interval (never a busy loop).
        try:
            await asyncio.wait_for(SHUTDOWN_EVENT.wait(), timeout=HEAD_OF_DESK_INTERVAL_SECONDS)
        except asyncio.TimeoutError:
            continue


async def heartbeat() -> None:
    """5-minute liveness tick while the daemon runs (no-op; proves the loop is alive)."""
    while not SHUTDOWN_EVENT.is_set():
        try:
            await asyncio.wait_for(SHUTDOWN_EVENT.wait(), timeout=300)
        except asyncio.TimeoutError:
            _log("heartbeat ok")


def _setup_signal_handlers() -> None:
    loop = asyncio.get_running_loop()

    def _handler(signum, _frame):
        _log(f"signal {signum} received — graceful shutdown")
        SHUTDOWN_EVENT.set()

    for sig in (signal.SIGINT, signal.SIGTERM):
        try:
            loop.add_signal_handler(sig, _handler, sig, None)
        except (NotImplementedError, RuntimeError):
            signal.signal(sig, lambda s, f: _handler(s, f))


async def main() -> int:
    _setup_signal_handlers()
    _log(f"run_hive up — project_root={PROJECT_ROOT}, monitor_secret={'set' if MONITOR_SECRET else 'NOT SET (401 risk)'}")
    _log(f"internal_service_key={'set' if INTERNAL_SERVICE_KEY else 'not set'}")

    # Production gate: the internal service key is REQUIRED for server-to-server
    # auth of the Head of Desk poller. Refuse to run fully without it.
    if not (MONITOR_SECRET or INTERNAL_SERVICE_KEY):
        _log("ABORT: neither HIVE_MONITOR_SECRET nor INTERNAL_SERVICE_KEY is set — refusing to start insecure daemon.")
        return 2

    tasks = []
    # Explicit supervision: run head_of_desk.py as a subprocess (not only in-process poll),
    # so the quiet-desk logic is exercised exactly as in production.
    tasks.append(asyncio.create_task(run_head_of_desk_process(), name="head-of-desk"))
    tasks.append(asyncio.create_task(run_mcp_server(), name="fastmcp"))
    tasks.append(asyncio.create_task(heartbeat(), name="heartbeat"))

    try:
        await asyncio.gather(*tasks)
    except asyncio.CancelledError:
        pass
    finally:
        SHUTDOWN_EVENT.set()
        for t in tasks:
            t.cancel()
        await asyncio.gather(*tasks, return_exceptions=True)
        _log("shutdown complete")
    return 0


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        sys.exit(0)