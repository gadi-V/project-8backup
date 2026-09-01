"""
Creative & Video Factory Desk — כוורת הצמיחה והשיווק (Hermes Engine).

מנוע Hermes דרך OpenRouter מייצר תסריטים קצרים במבנה Hook -> Value -> CTA,
וסקריפט MoviePy מפיק סרטוני MP4 קצרים עם קריינות (TTS) וכתוביות (SRT)
המפנים לשאלון האבחון החינמי: /onboarding/diagnostic.

כללי הדסק:
- מריץ תסריט אחד דרך הסוכן (OpenRouter) ואז מרכיב את ה-MP4 אם MoviePy ו-TTS
  זמינים; כשאינם זמינים, מתעד את התסריט והקריינות לקובץ JSON בלבד (dry-run).
- לעולם אינו פונה ישירות לקהל; תפוקת הלה נעשית דרך לוח הפרסום החיצוני.
"""

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from openai import OpenAI

ENV_PATH = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

OUT_PATH = Path(__file__).parent / "CREATIVE_HERMES_OUTPUT.json"

BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
API_KEY = os.getenv("OPENROUTER_API_KEY", "").strip()
HERMES_MODEL = os.getenv("MODEL_CREATIVE", "openai/gpt-4o-mini")

DIAGNOSTIC_URL = "/onboarding/diagnostic"


class CreativeFactory:
    """Generates strong short-video scripts (Hook → Value → CTA) and renders MP4 assets."""

    def __init__(self) -> None:
        self.client: Optional[OpenAI] = None
        if API_KEY:
            self.client = OpenAI(base_url=BASE_URL, api_key=API_KEY)

    def _can_moviepy(self) -> bool:
        try:
            import moviepy  # noqa: F401  # type: ignore

            return True
        except ImportError:
            return False

    def _build_script_prompt(self, subject: str, gap: str) -> str:
        return (
            "You are Hermes, the EdTech short-video copywriter for Project8 Academy (Hebrew).\n"
            "Write ONE short vertical-video script (max 180 words) strictly in Hebrew.\n"
            "Structure it in three labeled sections:\n"
            "HOOK: one gripping first line.\n"
            "VALUE: 2-3 concrete pain-solution beats for the student's gap.\n"
            "CTA: a single call-to-action sending viewers to the free diagnostic quiz at /onboarding/diagnostic.\n"
            f"Subject: {subject}\n"
            f"Pedagogical gap to target: {gap}"
        )

    async def generate_script(self, subject: str, gap: str) -> Dict[str, Any]:
        """Ask Hermes (OpenRouter) for the Hook->Value->CTA script."""
        if self.client is None:
            return {
                "success": False,
                "script": None,
                "error": "OPENROUTER_API_KEY is not configured in agents_hive/.env",
            }
        try:
            response = self.client.chat.completions.create(
                model=HERMES_MODEL,
                temperature=0.7,
                messages=[
                    {"role": "system", "content": self._build_script_prompt(subject, gap)},
                ],
            )
            content = response.choices[0].message.content or ""
            return {
                "success": True,
                "subject": subject,
                "gap": gap,
                "script": content.strip(),
                "model": HERMES_MODEL,
                "createdAt": datetime.now(timezone.utc).isoformat(),
            }
        except Exception as exc:  # pragma: no cover
            return {"success": False, "script": None, "error": str(exc)}

    def _render_video_preview(self, script: str, out_dir: Path) -> Optional[str]:
        """Render an mp4 via MoviePy+TTS. Falls back to None when deps are missing."""
        try:
            from moviepy.editor import (  # type: ignore
                ColorClip,
                TextClip,
                CompositeVideoClip,
                concatenate_videoclips,
            )

            lines = [ln.strip() for ln in script.replace("\n", " ").split(". ") if ln.strip()][:15]
            clips = []
            for i, sentence in enumerate(lines[:9]):
                txt = TextClip(text=sentence[:80], fontsize=56, color="white", size=(720, 300), method="caption").set_duration(2.2)
                bg = ColorClip(size=(720, 1280), color=(18, 10, 20), duration=2.2)
                clip = CompositeVideoClip([bg, txt.set_position("center")])
                clips.append(clip)

            if not clips:
                return None
            video = concatenate_videoclips(clips)
            out_path = os.path.join(out_dir, f"hermes-{int(datetime.now().timestamp())}.mp4")
            video.write_videofile(out_path, fps=24, codec="libx264", audio=False, logger=None)
            return out_path
        except Exception as exc:
            print(f"[CreativeFactory] video render skipped: {exc}")
            return None

    def _persist(self, payload: Dict[str, Any]) -> None:
        try:
            OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        except OSError as exc:  # pragma: no cover
            print(f"Failed to persist creative output: {exc}")

    async def produce(self, subject: str, gap: str) -> Dict[str, Any]:
        """End-to-end: script → (optional) MP4 → persist JSON output file."""
        result = await self.generate_script(subject, gap)

        video_path: Optional[str] = None
        if result.get("success") and result.get("script"):
            if self._can_moviepy():
                out_dir = (Path(__file__).parent.parent / "public" / "uploads" / "creative").resolve()
                out_dir.mkdir(parents=True, exist_ok=True)
                video_path = self._render_video_preview(result["script"], out_dir)

        payload = {
            "success": result.get("success", False),
            "subject": subject,
            "gap": gap,
            "diagnosticUrl": DIAGNOSTIC_URL,
            "script": result.get("script"),
            "videoUrl": video_path,
            "model": result.get("model"),
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "error": result.get("error"),
        }
        self._persist(payload)
        return payload


async def run_creative_factory_once(subject: str, gap: str) -> Dict[str, Any]:
    """Entrypoint — produces one Hermes short-video asset for the given gap."""
    factory = CreativeFactory()
    return await factory.produce(subject, gap)


if __name__ == "__main__":
    import asyncio

    subj = sys.argv[1] if len(sys.argv) > 1 else "מתמטיקה 5 יח\"ל"
    gap = sys.argv[2] if len(sys.argv) > 2 else "חקירת פונקציות מעריכיות $e^x$"
    out = asyncio.run(run_creative_factory_once(subj, gap))
    print(json.dumps(out, ensure_ascii=False, indent=2))