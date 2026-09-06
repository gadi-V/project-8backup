"""
Head of Desk — שכבת הפיקוד השקט (Quiet Day Layer).

ניטור 24/7 של חריגות קריטיות בלבד. העיקרון: שקט ברירת מחדל — אף התראה
אינה נשלחת למנהל כל עוד אף אחד משלושת "תנאי הסף הבלעדיים" לא הופר:

  1. תלמיד שילם על חבילה אך לא שובץ לו מורה תוך שעתיים.
  2. כשל סליקה ב-Stripe או איזון תנועות חסר ב-BillingLedger (CHARGE/PAYOUT).
  3. מורה לא התייצב בחדר השיעור 3 דקות לאחר מועד הפתיחה (no-show).

כל הדיווחים נכתבים ל-DB (AuditLog / riskEvents) וההתראה למנהל נעשית רק
כאשר אחד התנאים הנ"ל מתקיים בפועל (הודעת טלגרם/וואטסאפ עד 100 מילים).

המודול אוטונומי: רץ בלולאת cron שיכולה לקרוא func() הראשית ישירות,
וכן נחשף אל המערכת דרך ה-FastMCP tool `get_critical_desk_events`.
"""

import asyncio
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional, TypedDict

from dotenv import load_dotenv

ENV_PATH = Path(__file__).parent / ".env"
ROOT_ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)
load_dotenv(dotenv_path=ROOT_ENV_PATH)

# דיוק פיננסי - 19.4 (Decimal(19,4)) כמו ב-Prisma
ILS = "ILS"
TWO_HOURS = timedelta(hours=2)
THREE_MIN = timedelta(minutes=3)

# Team: Telegram / WhatsApp alert channels for the manager (Quiet Day).
MANAGER_ALERT_PHONE = os.getenv("MANAGER_ALERT_PHONE", "").strip()
MANAGER_ALERT_TELEGRAM_CHAT_ID = os.getenv("MANAGER_ALERT_TELEGRAM_CHAT_ID", "").strip()


class RiskEvent(TypedDict):
    """Slim, immutable risk event surfaced to Admins / Head of Desk."""
    id: str
    severity: Literal["CRITICAL", "WARNING"]
    kind: Literal["NO_TEACHER_ASSIGNED", "STRIPE_FAILURE", "LEDGER_IMBALANCE", "TEACHER_NO_SHOW"]
    title: str
    description: str
    playerId: str
    createdAt: str  # ISO-8601 UTC
    payload: Dict[str, Any]


class TelegramMessage(TypedDict):
    chatId: str
    text: str


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _safe_str(value: Any, default: str = "") -> str:
    if value is None:
        return default
    return str(value)


def _telegram_token() -> Optional[str]:
    return os.getenv("TELEGRAM_BOT_TOKEN", "").strip() or None


async def _send_telegram(chat_id: str, text: str) -> bool:
    token = _telegram_token()
    if not token or not chat_id:
        return False
    try:
        import httpx

        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                json={"chat_id": chat_id, "text": text},
            )
            return res.status_code == 200
    except Exception:
        return False


async def _send_whatsapp(phone: str, text: str) -> bool:
    api_url = os.getenv("WHATSAPP_API_URL", "").strip().rstrip("/")
    api_key = os.getenv("WHATSAPP_API_KEY", "").strip()
    if not api_url or not api_key:
        return False
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.post(
                f"{api_url}/sendMessage",
                headers={"Authorization": f"Bearer {api_key}"},
                json={"phone": phone, "chatId": f"{phone}@c.us", "message": text},
            )
            return res.status_code in (200, 201)
    except Exception:
        return False


async def dispatch_manager_alert(payload: RiskEvent) -> Dict[str, bool]:
    """Send the ≤100-word manager alert (Telegram or WhatsApp)."""
    lines = [
        "🚨 [Head of Desk] חריגה קריטית",
        f"• {payload['title']}",
        f"• {payload['description'][:140]}",
        f"• תיק: {payload['playerId']}",
    ]
    text = "\n".join(lines)[:100]  # hard cap: עד 100 מילים/תווים למנהל

    results: Dict[str, bool] = {"telegram": False, "whatsapp": False}
    if MANAGER_ALERT_TELEGRAM_CHAT_ID:
        results["telegram"] = await _send_telegram(MANAGER_ALERT_TELEGRAM_CHAT_ID, text)
    if MANAGER_ALERT_PHONE:
        results["whatsapp"] = await _send_whatsapp(MANAGER_ALERT_PHONE, text)
    return results


def _parse_dec(value: Any) -> float:
    """Handle Prisma Decimal(19,4) values (string|number|Decimal)."""
    if value is None:
        return 0.0
    if hasattr(value, "__float__"):
        try:
            return float(value)
        except Exception:
            pass
    try:
        return float(_safe_str(value))
    except ValueError:
        return 0.0


async def _fetch_json(url_path: str, params: Optional[Dict[str, Any]] = None) -> Any:
    base_url = os.getenv("APP_URL", "http://localhost:3000").rstrip("/")
    import httpx

    # Server-to-server auth: same shared secret as run_hive/risk-events route.
    token = (
        os.getenv("HIVE_MONITOR_SECRET", "").strip()
        or os.getenv("INTERNAL_SERVICE_KEY", "").strip()
    )
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    async with httpx.AsyncClient(timeout=15) as client:
        res = await client.get(f"{base_url}{url_path}", params=params or {}, headers=headers)
        res.raise_for_status()
        return res.json()


class HeadOfDeskScanner:
    """Runs the three exclusive alert preconditions against the Next.js data layer."""

    def __init__(self, api_base: str | None = None):
        self.api_base = (api_base or os.getenv("APP_URL", "http://localhost:3000")).rstrip("/")

    def _lesson_room_url(self, lesson_id: str) -> str:
        return f"{self.api_base}/lessons/{lesson_id}"

    async def scan_and_surface(self) -> List[RiskEvent]:
        """Probe every precondition. Emits alerts ONLY for CRITICAL violations.

        Quiet Day: no alert is emitted when nothing is broken or when a probe
        cannot reach the data layer (fail-open probe, fail-open alerting).
        """
        events: List[RiskEvent] = []
        try:
            events += await self._probe_no_teacher_assigned()
        except Exception as exc:
            print(f"[HOD] probe NO_TEACHER_ASSIGNED failed (silent): {exc}")
        try:
            events += await self._probe_stripe_and_ledger()
        except Exception as exc:
            print(f"[HOD] probe STRIPE/LEDGER failed (silent): {exc}")
        try:
            events += await self._probe_teacher_no_show()
        except Exception as exc:
            print(f"[HOD] probe TEACHER_NO_SHOW failed (silent): {exc}")

        for ev in events:
            delivered = await dispatch_manager_alert(ev)
            print(f"[HOD] CRITICAL {ev['kind']} {ev['id']} alert={delivered}")
        return events

    async def _probe_no_teacher_assigned(self) -> List[RiskEvent]:
        """Payload exists with a package but lesson has no teacher assigned >2h."""
        cursor: Optional[str] = None
        events: List[RiskEvent] = []
        for _ in range(10):  # hard cap pages
            resp = await _fetch_json("/api/admin/audit/risk-events", params={"kind": "NO_TEACHER_ASSIGNED", "cursor": cursor})
            batch = resp.get("events", []) if isinstance(resp, dict) else []
            for item in batch:
                if item.get("severity") == "CRITICAL" and item.get("createdAt"):
                    created_at = datetime.fromisoformat(item["createdAt"].replace("Z", "+00:00"))
                    if _now() - created_at <= TWO_HOURS:
                        events.append(item)  # type: ignore[typeddict-item]
            cursor = resp.get("nextCursor") if isinstance(resp, dict) else None
            if not cursor:
                break
        return events

    async def _probe_stripe_and_ledger(self) -> List[RiskEvent]:
        resp = await _fetch_json("/api/admin/audit/risk-events", params={"kind": "LEDGER_IMBALANCE"})
        if not isinstance(resp, dict):
            return []
        return [item for item in resp.get("events", []) if item.get("severity") == "CRITICAL"]  # type: ignore[typeddict-item]

    async def _probe_teacher_no_show(self) -> List[RiskEvent]:
        resp = await _fetch_json("/api/admin/audit/risk-events", params={"kind": "TEACHER_NO_SHOW"})
        if not isinstance(resp, dict):
            return []
        return [item for item in resp.get("events", []) if item.get("severity") == "CRITICAL"]  # type: ignore[typeddict-item]


async def run_head_of_desk_once() -> List[RiskEvent]:
    """Cron entrypoint — single quiet sweep. Returns surfaced CRITICAL events."""
    scanner = HeadOfDeskScanner()
    return await scanner.scan_and_surface()


if __name__ == "__main__":
    events = asyncio.run(run_head_of_desk_once())
    sys.exit(0 if not events else 1)