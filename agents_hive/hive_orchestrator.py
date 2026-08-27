import os
import sys
import time
from pathlib import Path
from dataclasses import dataclass
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv
from openai import OpenAI
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TimeElapsedColumn
from rich.syntax import Syntax
from rich.rule import Rule

# ---------------------------------------------------------------------------
# הגדרות סביבה ותצורה
# ---------------------------------------------------------------------------
ENV_PATH = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

console = Console()

API_KEY = os.getenv("OPENROUTER_API_KEY")
BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")

if not API_KEY:
    console.print("[bold red]❌ שגיאה: OPENROUTER_API_KEY אינו מוגדר בקובץ ה-.env[/bold red]")
    sys.exit(1)

client = OpenAI(
    base_url=BASE_URL,
    api_key=API_KEY
)

# ---------------------------------------------------------------------------
# מיפוי מודלים ייעודי לפי תפקיד (Reasoning vs Generation)
# ---------------------------------------------------------------------------
MODELS = {
    # תכנון אסטרטגי, פירוק משימות ובדיקות קפדניות דורשים מודלי Reasoning / Thinking
    "architect": os.getenv("MODEL_ARCHITECT", "deepseek/deepseek-r1"),
    "security_redteam": os.getenv("MODEL_SECURITY", "deepseek/deepseek-r1"),
    "qa_auditor": os.getenv("MODEL_QA", "deepseek/deepseek-r1"),
    
    # כתיבת קוד מהירה, רינדור UI והרכבת קבצים
    "media_engineer": os.getenv("MODEL_MEDIA", "deepseek/deepseek-chat"),
    "fintech_engineer": os.getenv("MODEL_FINTECH", "deepseek/deepseek-chat"),
    "automation_engineer": os.getenv("MODEL_AUTOMATION", "deepseek/deepseek-chat"),
    "frontend_engineer": os.getenv("MODEL_FRONTEND", "deepseek/deepseek-chat"),
    "release_manager": os.getenv("MODEL_DELIVERY", "deepseek/deepseek-chat"),
}

# ---------------------------------------------------------------------------
# חוקי הברזל הארכיטקטוניים המוזרקים לכל הסוכנים
# ---------------------------------------------------------------------------
MASTER_ARCHITECTURAL_INVARIANTS = """
### MANDATORY SYSTEM INVARIANTS (VIOLATIONS WILL REJECT BUILD):
1. ZERO DATA LEAKING & STRICT RBAC:
   - Server Actions must ALWAYS authenticate with session and verify user database role via Prisma.
   - Tutors can NEVER access unassigned student info or platform-wide revenue.
2. WHITEBOARD & EXCALIDRAW ENGINE:
   - All Excalidraw instances MUST be wrapped in `<div dir="ltr">`. Excalidraw UI breaks in RTL.
   - Touch/tablet toolbars must be draggable floating panels with show/hide toggle.
   - PDF exports must be vectorized (SVG/pdf-lib) with discrete A4 framed pages (840x1188px).
   - Images must use FileReader Base64 DataURL + addFiles(), NEVER browser File System Access API.
3. DATA & FINTECH IMMUTABILITY:
   - Financial ledgers are strictly append-only (No DELETE queries). Status transitions: pending -> paid -> refunded.
   - UTC timestamps (TIMESTAMPTZ) in database, displayed in 'Asia/Jerusalem'.
   - Active lesson timers must compute against scheduledAt/createdAt timestamps, not local intervals.
4. CODEBASE QUALITY & CONVENTIONS:
   - Next.js 14/15 App Router (RSC by default, 'use client' only when necessary).
   - Strict TypeScript: No 'any', no '@ts-ignore'.
   - Hebrew UI must use Tailwind Logical Properties (ms-*, me-*, ps-*, pe-*, start-*, end-*).
   - Standard response pattern for Server Actions: { success: boolean, data?: T, error?: string }.
"""

# ---------------------------------------------------------------------------
# פונקציות ליבה להרצת סוכנים
# ---------------------------------------------------------------------------
def execute_agent_step(
    role_title: str,
    squad: str,
    model_alias: str,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.2
) -> str:
    model_name = MODELS.get(model_alias, "deepseek/deepseek-chat")
    
    # הזרקת חוקי הברזל לפרומפט המערכת
    enriched_system_prompt = f"{system_prompt}\n\n{MASTER_ARCHITECTURAL_INVARIANTS}"
    
    start_time = time.time()
    try:
        response = client.chat.completions.create(
            model=model_name,
            temperature=temperature,
            messages=[
                {"role": "system", "content": enriched_system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        )
        output = response.choices[0].message.content or ""
        elapsed = time.time() - start_time
        
        console.print(f"[bold green]✓[/bold green] [cyan]{role_title}[/cyan] ({squad}) השלים משימה תוך [yellow]{elapsed:.2f}s[/yellow] [{model_name}]")
        return output
    except Exception as e:
        console.print(f"[bold red]✗ שגיאה בהרצת {role_title}: {str(e)}[/bold red]")
        raise e

# ---------------------------------------------------------------------------
# תהליך הריצה המרכזי (The Enterprise Orchestrator Pipeline)
# ---------------------------------------------------------------------------
def run_enterprise_hive():
    console.clear()
    console.print(Rule("[bold magenta]🏛️ ENTERPRISE AGENT HIVE - SPRINT ORCHESTRATION[/bold magenta]"))
    
    # טבלת סקוואדים
    table = Table(title="מיפוי סקוואדים והיררכיית הנדסה", show_header=True, header_style="bold cyan")
    table.add_column("סקוואד (Squad)", style="dim", width=22)
    table.add_column("תפקיד (Role)", width=32)
    table.add_column("מודל בשימוש", justify="left")
    
    table.add_row("Architecture & Security", "Chief Architect (L8)", MODELS["architect"])
    table.add_row("Classroom & Graphics", "Staff Canvas Engineer (L6)", MODELS["media_engineer"])
    table.add_row("Fintech & Payments", "Principal Fintech Engineer (L7)", MODELS["fintech_engineer"])
    table.add_row("Infra & Automation", "Senior DevOps & Integrations (L5)", MODELS["automation_engineer"])
    table.add_row("Design System & UX", "Staff RTL Frontend Engineer (L6)", MODELS["frontend_engineer"])
    table.add_row("Red Team & Audit", "Principal Security Auditor (L8)", MODELS["security_redteam"])
    table.add_row("Quality Assurance", "Staff QA Gatekeeper (L6)", MODELS["qa_auditor"])
    table.add_row("Release & Delivery", "Technical Release Manager (L7)", MODELS["release_manager"])
    
    console.print(table)
    console.print()

    # מפרט הספרינט הנוכחי
    sprint_mission = """
    יעד הספרינט: שדרוג לוח Excalidraw למבנה דפים מתוחמים (A4 GoodNotes Style), ייצוא PDF וקטורי רב-עמודי, ואבטחת הקלטות שיעור.
    
    דרישות פיתוח מרכזיות:
    1. Whiteboard: הוספת מנגנון עמודי A4 מוגדרים (Frames 840x1188px עם מרווח 60px) ב-ClassroomWhiteboard.tsx, כולל סרגל ניווט צף וייצוא רב-עמודי.
    2. PDF Engine: שדרוג app/api/excalidraw/export/route.ts לפיצול לפי Frames, רינדור SVG ואיגוד ל-PDF וקטורי באמצעות pdf-lib.
    3. Daily.co Security: יצירת Presigned Access Tokens עם תוקף מוגבל של שעתיים עבור שיעורים פעילים.
    4. WhatsApp & Cron: שליחת סיכום שיעור עם ה-PDF המעודכן, ו-Cron Route לתזכורות 15 דקות לפני מועד השיעור.
    5. Prisma & Fintech: הגדרת מודל TeacherPayout ו-BillingLedger סטריקטלי (Pending -> Paid -> Refunded).
    """

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TimeElapsedColumn(),
        console=console
    ) as progress:
        
        main_task = progress.add_task("[bold green]מריץ ספרינט פיתוח מלא...", total=7)

        # -------------------------------------------------------------------
        # שלב 1: Chief Architect - תכנון ארכיטקטוני ומפרט טכני
        # -------------------------------------------------------------------
        progress.update(main_task, description="[bold cyan]1/7: Chief Architect מתכנן מפרט טכני וסכמות...")
        arch_system = """You are the Principal Chief Architect (L8).
Produce a strict technical roadmap, Prisma schema extensions, component contracts, and interface definitions.
Specify exact data structures and algorithmic flows without writing full boilerplate."""
        
        arch_spec = execute_agent_step(
            role_title="Chief Architect",
            squad="Architecture",
            model_alias="architect",
            system_prompt=arch_system,
            user_prompt=f"Create engineering architectural blueprint for:\n{sprint_mission}"
        )
        progress.advance(main_task)

        # -------------------------------------------------------------------
        # שלב 2: Classroom & Canvas Squad - מימוש הלוח וה-PDF
        # -------------------------------------------------------------------
        progress.update(main_task, description="[bold cyan]2/7: Classroom Pod מפתח דפי A4 ב-Excalidraw וייצוא PDF...")
        media_system = """You are the Staff Canvas & Realtime Engineer (L6).
Your expertise: Excalidraw, SVG rendering, pdf-lib, and Stream Chat syncing.
Strictly follow: Excalidraw must be in <div dir="ltr">, A4 frame dimensions (840x1188px), floating draggable panels, and zero 'any' typing."""
        
        media_code = execute_agent_step(
            role_title="Staff Canvas Engineer",
            squad="Classroom Pod",
            model_alias="media_engineer",
            system_prompt=media_system,
            user_prompt=f"Architectural Spec:\n{arch_spec}\n\nWrite the exact code for components/ClassroomWhiteboard.tsx and app/api/excalidraw/export/route.ts."
        )
        progress.advance(main_task)

        # -------------------------------------------------------------------
        # שלב 3: Fintech & Backend Pod - שכר מורים, אבטחת Daily.co ואינטגרציות
        # -------------------------------------------------------------------
        progress.update(main_task, description="[bold cyan]3/7: Fintech & Backend Pod מפתחים Ledger, Daily.co ו-Cron...")
        fintech_system = """You are the Principal Fintech & Backend Engineer (L7).
Your expertise: Prisma ORM, Stripe ledgers, Daily.co 2-hour TTL token generation, and Next.js Cron APIs.
Strictly follow: Immutable financial ledger logic (No DELETE), UTC timestamps, and role-based Server Action validation."""
        
        fintech_code = execute_agent_step(
            role_title="Principal Fintech Engineer",
            squad="Fintech & Backend Pod",
            model_alias="fintech_engineer",
            system_prompt=fintech_system,
            user_prompt=f"Architectural Spec:\n{arch_spec}\n\nWrite the exact code for Prisma schema additions, Daily.co token generator, and Cron reminder routes."
        )
        progress.advance(main_task)

        # -------------------------------------------------------------------
        # שלב 4: Red Team Security Audit (L8)
        # -------------------------------------------------------------------
        progress.update(main_task, description="[bold red]4/7: Red Team Security מבצע בדיקת חדירות ובקרת הרשאות...")
        security_system = """You are the Lead Red-Team Security Auditor & Penetration Tester (L8).
Aggressively analyze the code for:
1. Multi-tenant data leakage (Tutor accessing another tutor's earnings/students).
2. Missing getServerSession() or Prisma role verification in Server Actions.
3. Daily.co token TTL expiration overflows.
4. Dangerous File System APIs or XSS injection in SVG/PDF generation.
Return a structured audit: PASS/FAIL status per file, and exact exploit scenarios."""
        
        combined_squad_code = f"### CLASSROOM & CANVAS CODE:\n{media_code}\n\n### FINTECH & BACKEND CODE:\n{fintech_code}"
        
        security_audit = execute_agent_step(
            role_title="Red Team Security Auditor",
            squad="Security",
            model_alias="security_redteam",
            system_prompt=security_system,
            user_prompt=f"Perform static security analysis on this sprint output:\n{combined_squad_code}"
        )
        progress.advance(main_task)

        # -------------------------------------------------------------------
        # שלב 5: Quality Assurance & Code Standards Gatekeeper
        # -------------------------------------------------------------------
        progress.update(main_task, description="[bold magenta]5/7: QA Auditor בודק עמידה ב-TypeScript וכללי הברזל...")
        qa_system = """You are the Staff QA & Code Standards Auditor (L6).
Verify compliance against Master Architectural Invariants:
1. Is there any usage of 'any' or '@ts-ignore'? (Reject if found).
2. Is Excalidraw strictly isolated in <div dir="ltr">?
3. Are Tailwind classes using logical properties (ms-*, pe-*) for RTL?
4. Are Server Action returns adhering to { success, data, error }?"""
        
        qa_audit = execute_agent_step(
            role_title="Staff QA Auditor",
            squad="Quality Assurance",
            model_alias="qa_auditor",
            system_prompt=qa_system,
            user_prompt=f"Audit this codebase against standards:\n{combined_squad_code}"
        )
        progress.advance(main_task)

        # -------------------------------------------------------------------
        # שלב 6: Remediation & Patching (אם נמצאו ליקויים)
        # -------------------------------------------------------------------
        progress.update(main_task, description="[bold yellow]6/7: מבצע תיקון וסגירת פערים אוטומטית...")
        remediation_system = """You are the Principal Remediation Engineer.
Review the Security and QA audits. If any vulnerabilities, typing issues, or invariant violations were discovered, rewrite the affected code sections to be 100% compliant and production-ready."""
        
        remediated_code = execute_agent_step(
            role_title="Remediation Lead",
            squad="Core Engineering",
            model_alias="architect",
            system_prompt=remediation_system,
            user_prompt=f"Original Code:\n{combined_squad_code}\n\nSecurity Audit:\n{security_audit}\n\nQA Audit:\n{qa_audit}\n\nOutput the final, perfected code."
        )
        progress.advance(main_task)

        # -------------------------------------------------------------------
        # שלב 7: Technical Release Manager - אריזה סופית ל-Cursor
        # -------------------------------------------------------------------
        progress.update(main_task, description="[bold green]7/7: Release Manager אורז את הקבצים לקובץ ספרינט...")
        delivery_system = """You are the Technical Release Manager.
Package the approved, audited, and remediated code into a clean, copy-pasteable Markdown file.
Format Requirements:
1. Clear directory structure tree.
2. Every file preceded by its exact relative path (e.g. `### File: components/ClassroomWhiteboard.tsx`).
3. Full complete code without placeholders or 'TODO' blocks.
4. A brief deployment/migration checklist at the end."""
        
        final_delivery = execute_agent_step(
            role_title="Technical Release Manager",
            squad="Delivery",
            model_alias="release_manager",
            system_prompt=delivery_system,
            user_prompt=f"Package this finalized codebase for Cursor:\n{remediated_code}"
        )
        progress.advance(main_task)

    # שמירת קובץ הפלט
    output_path = Path(__file__).parent / "HIVE_SPRINT_OUTPUT.md"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(final_delivery)

    console.print()
    console.print(Panel(
        f"[bold green]✨ הספרינט הושלם בהצלחה מלאה![/bold green]\n\n"
        f"📄 כל הקוד המאומת, המאובטח והמתוקן נשמר ב:\n"
        f"[bold cyan]{output_path}[/bold cyan]\n\n"
        f"[yellow]הקובץ מוכן להדבקה או קריאה ישירה בתוך Cursor IDE.[/yellow]",
        title="Sprint Release Delivered",
        border_style="green"
    ))

if __name__ == "__main__":
    run_enterprise_hive()