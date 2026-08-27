import subprocess
import os
from mcp.server.fastmcp import FastMCP

# שם השרת עודכן כדי לשקף את היכולות המורחבות
mcp = FastMCP("agents-hive-enterprise")

PROJECT_ROOT = "/Users/gaditzumi/project8"
HIVE_DIR = os.path.join(PROJECT_ROOT, "agents_hive")

# 🚨 קודש קודשים - אזורים שאסור ל-AI לדרוס בטעות
PROTECTED_DOMAINS = [
    "src/lib/ledger",
    "src/lib/dispatch",
    "src/app/api/fintech",
    "src/app/api/cancellations",
    "prisma/schema.prisma"
]

@mcp.tool()
def run_orchestration() -> str:
    """Runs the main Hive Orchestrator and generates the sprint plan."""
    try:
        venv_python = os.path.join(HIVE_DIR, "venv", "bin", "python")
        python_exec = venv_python if os.path.exists(venv_python) else "python3"
        result = subprocess.run(
            [python_exec, "hive_orchestrator.py"],
            cwd=HIVE_DIR,
            capture_output=True,
            text=True,
            check=True
        )
        output_file = os.path.join(HIVE_DIR, "HIVE_SPRINT_OUTPUT.md")
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                return f"✅ ORCHESTRATION SUCCESS:\n\n{f.read()}"
        return result.stdout or "Orchestration completed successfully."
    except subprocess.CalledProcessError as e:
        return f"🚨 CRITICAL ORCHESTRATION ERROR:\n{e.stderr}"

@mcp.tool()
def run_typecheck() -> str:
    """Strict TypeScript compiler check. Must pass (Exit Code 0) before task completion."""
    try:
        result = subprocess.run(
            ["npx", "tsc", "--noEmit"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            return "✅ SUCCESS: TypeScript Typecheck PASSED. Code is structurally sound."
        return f"❌ FAILED: TypeScript Errors Found:\n{result.stdout}\nFix these errors immediately before continuing!"
    except Exception as e:
        return f"Error executing tsc: {str(e)}"

@mcp.tool()
def run_eslint() -> str:
    """Runs ESLint to ensure code quality and rule adherence."""
    try:
        result = subprocess.run(
            ["npx", "eslint", ".", "--ext", ".ts,.tsx", "--max-warnings=0"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            return "✅ SUCCESS: ESLint PASSED. Clean code."
        return f"⚠️ WARNING: ESLint Issues Found:\n{result.stdout}\nPlease review and fix styling/linting bugs."
    except Exception as e:
        return f"ESLint check skipped or failed to run: {str(e)}"

@mcp.tool()
def check_guardrails() -> str:
    """Security check: Verifies if any protected business logic files were modified in Git."""
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", "HEAD"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        changed_files = result.stdout.strip().split('\n')
        
        # מחפש האם קובץ ששונה נמצא ברשימת המוגנים
        violations = [f for f in changed_files if any(p in f for p in PROTECTED_DOMAINS)]
        
        if violations:
            return f"🚨 SECURITY ALERT: You have modified protected core files without authorization!\nViolating files:\n" + "\n".join(violations) + "\nREVERT these changes immediately unless explicitly authorized by the user."
        return "✅ Guardrails check passed. No protected domains were altered."
    except Exception as e:
        return f"Error checking guardrails: {str(e)}"

@mcp.tool()
def verify_git_safety() -> str:
    """Checks Git status to ensure the working tree is clean before starting new major features."""
    try:
        status = subprocess.run(["git", "status", "--porcelain"], cwd=PROJECT_ROOT, capture_output=True, text=True)
        changes = status.stdout.strip()
        if not changes:
            return "✅ Git tree clean. Safe to proceed with major codebase changes."
        return f"⚠️ CAUTION: Uncommitted changes detected in working tree:\n{changes}\nProceed with extreme caution. Do not overwrite existing unstaged work."
    except Exception as e:
        return f"Git check failed: {str(e)}"

if __name__ == "__main__":
    mcp.run()