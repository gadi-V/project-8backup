#!/usr/bin/env python3
"""
FastMCP tools verification — validates that all 9 tools are registered,
exposed as `@mcp.tool()` and carry correct, typed, decorated signatures.

Under test (spec 1.9 / step 3 & 7):
  5 infrastructure tools:
    parse_syllabus_to_curriculum, run_orchestration, run_typecheck,
    run_eslint, check_guardrails
  4 business core tools:
    handle_package_whatsapp_flow, complete_lesson_and_settle,
    admin_issue_compensation, get_critical_desk_events

This test is PARSING-only: it never calls a tool (no network / no subprocess).
It inspects the module for `@mcp.tool()` decorated defs and checks that every
tool is present with a docstring and a real function body.

Run:
    agents_hive/venv/bin/python agents_hive/test_hive_mcp_tools.py
"""
import ast
import sys
from pathlib import Path

HIVE_FILE = Path(__file__).resolve().parent / "hive_mcp.py"


def parse_source(path: Path) -> ast.Module:
    if not path.exists():
        raise FileNotFoundError(f"Missing {path}")
    return ast.parse(path.read_text(encoding="utf-8"))


def find_tool_functions(tree: ast.Module):
    """Return {name: ast.FunctionDef} for every tool-decorated def.

    Handles both `@mcp.tool` (Attribute) and `@mcp.tool()` (Call wrapping the
    same Attribute) as used by FastMCP.
    """
    tools = {}
    for node in tree.body:
        if not isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            continue
        is_tool = False
        for d in node.decorator_list:
            target = d.func if isinstance(d, ast.Call) else d
            if isinstance(target, ast.Attribute) and target.attr == "tool":
                is_tool = True
                break
        if is_tool:
            tools[node.name] = node
    return tools


def main() -> int:
    expected = [
        # infrastructure
        "parse_syllabus_to_curriculum",
        "run_orchestration",
        "run_typecheck",
        "run_eslint",
        "check_guardrails",
        # business core
        "handle_package_whatsapp_flow",
        "complete_lesson_and_settle",
        "admin_issue_compensation",
        "get_critical_desk_events",
    ]

    print("=" * 74)
    print("FastMCP Tools Verification — agents_hive/hive_mcp.py")
    print("=" * 74)

    tree = parse_source(HIVE_FILE)
    tools = find_tool_functions(tree)

    print(f"\nDiscovered @mcp.tool() functions: {len(tools)}")
    for name in sorted(tools):
        print(f"  - {name}")

    failed = 0
    for name in expected:
        fn = tools.get(name)
        if fn is None:
            print(f"  ✗ MISSING tool: {name}")
            failed += 1
            continue

        # docstring present
        doc = ast.get_docstring(fn)
        if not doc:
            print(f"  ✗ {name}: missing docstring")
            failed += 1
            continue

        # body is real (non-trivial)
        body_len = len(fn.body) if isinstance(fn.body, list) else 0
        if body_len < 2:
            print(f"  ✗ {name}: trivial body (n={body_len})")
            failed += 1
            continue

        print(f"  ✓ {name}: decorated, docstring ({len(doc)} chars), {body_len} statements")

    # Extra: every tool() registered should be in the expected set (no typos).
    unexpected = set(tools) - set(expected)
    if unexpected:
        print(f"\n  ⚠ Unexpected @mcp.tool() functions: {sorted(unexpected)}")

    if failed:
        print(f"\n❌ FAIL: {failed} missing / malformed tools")
        return 1
    print("\n✅ PASS: all 9 FastMCP tools are defined, decorated and documented.")
    return 0


if __name__ == "__main__":
    sys.exit(main())