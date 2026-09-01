#!/usr/bin/env python3
"""
Isolated unit test for `parse_syllabus_to_curriculum` (FastMCP tool).

Runs the real tool against a realistic Israeli matriculation focus snippet
(מתמטיקה 5 יחל) and asserts the returned JSON conforms strictly to the
`CurriculumTopic[]` schema.

Self-cleaning by design: this test performs NO database writes, so there is
nothing to tear down. Idempotent: safe to run repeatedly.

Run:
    agents_hive/venv/bin/python agents_hive/test_syllabus_parser.py
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hive_mcp import parse_syllabus_to_curriculum

FIVE_UNITS_SNIPPET = (
    'מתמטיקה 5 יח״ל שאלון 582: וקטורים (אלגבריים וגיאומטריים), '
    'גיאומטריה אנליטית (אליפסה והיפרבולה), מספרים מרוכבים, '
    'חדו״א של פונקציות מעריכיות ולוגריתמיות.'
)

VALID_GRADE_LEVELS = {"ELEMENTARY", "MIDDLE_SCHOOL", "HIGH_SCHOOL", "ACADEMIC"}


def fail(msg: str) -> None:
    raise AssertionError(msg)


def main() -> None:
    print("=" * 78)
    print("FastMCP Syllabus Parser Test — parse_syllabus_to_curriculum")
    print("=" * 78)
    print(f"Input (matriculation focus snippet):\n  {FIVE_UNITS_SNIPPET}\n")

    raw = parse_syllabus_to_curriculum(FIVE_UNITS_SNIPPET)
    payload = json.loads(raw)

    if not payload.get("success"):
        fail(f"Syllabus parse failed: {payload.get('error')}")

    topics = payload.get("topics", [])
    print(f"Parsed {len(topics)} CurriculumTopic object(s).")

    if len(topics) == 0:
        fail("Expected at least one CurriculumTopic object.")

    for i, t in enumerate(topics):
        label = f"topic[{i}]"
        if not isinstance(t, dict):
            fail(f"{label}: expected object, got {type(t).__name__}")

        for field, ftype in (
            ("subject", str),
            ("topicName", str),
        ):
            val = t.get(field)
            if not isinstance(val, ftype) or not val.strip():
                fail(f"{label}.{field}: missing or not {ftype.__name__}")

        sub_topics = t.get("subTopics")
        if not isinstance(sub_topics, list):
            fail(f"{label}.subTopics: expected list, got {type(sub_topics).__name__}")
        if len(sub_topics) == 0:
            print(f"  … topic[{i}] '{t.get('topicName')}' has empty subTopics " "(valid per schema default [])")

        grade = t.get("gradeLevel")
        if grade not in VALID_GRADE_LEVELS:
            fail(f"{label}.gradeLevel: unexpected value {grade!r}")

        weight = t.get("weightInExam")
        if not isinstance(weight, (int, float)) or not (0.1 <= weight <= 1.0):
            fail(f"{label}.weightInExam: must be number in [0.1, 1.0], got {weight!r}")

        # Spot-check that one parsed topic is the weak topic we care about.
        if "וקטור" in t.get("topicName", ""):
            print(f"  ✓ Found vectors topic: {t['topicName']} (subTopics={len(sub_topics)})")

    print("\n✅ PASS: output conforms strictly to CurriculumTopic[].")
    print("(No DB writes performed; idempotent, zero teardown needed.)")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:
        print(f"\n❌ FAIL: {exc}")
        sys.exit(1)