import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from rich.console import Console
from rich.panel import Panel

# טעינת משתני סביבה
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

console = Console()

api_key = os.getenv("OPENROUTER_API_KEY")
base_url = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")

client = OpenAI(
    base_url=base_url,
    api_key=api_key
)

# מיפוי מודלים יציבים ב-100%
MODELS = {
    "cto": "deepseek/deepseek-chat",
    "media": "deepseek/deepseek-chat",
    "fintech": "deepseek/deepseek-chat",
    "automation": "deepseek/deepseek-chat",
    "security": "deepseek/deepseek-r1",
    "delivery": "deepseek/deepseek-chat"
}

def ask_agent(role: str, model_key: str, system_prompt: str, user_prompt: str) -> str:
    console.print(f"[bold cyan]🤖 [{role}] מעבד משימה באמצעות {MODELS[model_key]}...[/bold cyan]")
    response = client.chat.completions.create(
        model=MODELS[model_key],
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )
    return response.choices[0].message.content

def run_tech_company():
    console.print(Panel.fit("[bold green]🚀 הפעלת כוורת הסוכנים לפיתוח ותיקון הפרויקט[/bold green]"))

    project_context = """
    פרויקט Next.js App Router, Prisma ORM, Neon PostgreSQL, Daily.co (וידאו), Stream Chat, Excalidraw, Stripe, WhatsApp.
    פערים לטיפול:
    1. אבטחת הקלטות: יצירת Signed URLs ב-Daily.co עם תוקף לשעתיים.
    2. תזמון תזכורות WhatsApp: API Route של Cron Job 15 דקות לפני שיעור.
    3. ייצוא PDF וקטורי מה-Excalidraw בעזרת pdf-lib או SVG.
    4. מודל פיננסי ב-Prisma: יצירת מודל TeacherPayout ו-BillingLedger (אי-מחיקה, סטטוסים pending/paid/refunded).
    """

    # 1. CTO - תכנון ארכיטקטוני
    cto_system = "You are the CTO & Principal Architect. Break down architectural specs and DB migrations for Prisma & Next.js."
    cto_plan = ask_agent("CTO Architect", "cto", cto_system, f"Plan the technical roadmap for:\n{project_context}")

    # 2. Media Pod - Signed URLs ו-PDF וקטורי
    media_system = "You are the Senior Media & Canvas Engineer. Write TypeScript code for Daily.co Signed URLs and Excalidraw vector PDF exports."
    media_code = ask_agent("Media & Canvas Pod", "media", media_system, f"CTO Plan:\n{cto_plan}\nWrite the exact code for Signed URLs and Vector PDF Export.")

    # 3. Fintech Pod - מודל שכר מורים ב-Prisma
    fintech_system = "You are the Principal Fintech Engineer. Write strict Prisma schemas and payout calculation services with immutable ledger logic."
    fintech_code = ask_agent("Fintech Pod", "fintech", fintech_system, f"CTO Plan:\n{cto_plan}\nGenerate Prisma Schema additions and Payout logic.")

    # 4. Automation Pod - קרון ג'וב לתזכורות WhatsApp
    automation_system = "You are the DevOps & Automation Lead. Write Next.js App Router Cron API routes and security middleware."
    automation_code = ask_agent("Automation Pod", "automation", automation_system, f"CTO Plan:\n{cto_plan}\nGenerate /api/cron/lesson-reminders/route.ts.")

    # 5. Red Team Security - בדיקות אבטחה
    security_system = "You are the Red-Team Lead & Penetration Tester. Analyze all provided code for authorization bypasses and token leakage."
    combined_code = f"MEDIA CODE:\n{media_code}\n\nFINTECH CODE:\n{fintech_code}\n\nAUTOMATION CODE:\n{automation_code}"
    security_audit = ask_agent("Red Team Auditor", "security", security_system, f"Perform an aggressive security audit on this generated code:\n{combined_code}")

    # 6. Delivery Lead - אריזת הקבצים ל-Cursor
    delivery_system = "You are the Release Manager. Package the final validated code into organized, copy-pasteable files with exact file paths."
    final_output = ask_agent("Delivery Lead", "delivery", delivery_system, f"""
    Consolidate the approved code taking into account the Red Team audit:
    Audit: {security_audit}
    Code: {combined_code}
    Output format: Markdown with exact file paths.
    """)

    output_path = "HIVE_SPRINT_OUTPUT.md"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(final_output)

    console.print(Panel.fit(f"[bold green]✨ סבב הפיתוח הושלם! כל הקוד מאומת נשמר בקובץ: {output_path}[/bold green]"))

if __name__ == "__main__":
    run_tech_company()