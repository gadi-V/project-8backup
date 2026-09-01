/**
 * Server-side rubric validator for CurriculumTopic payloads.
 *
 * Mirrors the Pydantic validation in agents_hive/hive_mcp.py
 * (`.cursor/rules/09-curriculum-pedagogy.mdc §4`) so the FastMCP tool is NOT
 * the only gate: the admin commit route enforces the same contract before
 * touching PostgreSQL.
 */

export const CURRICULUM_GRADE_LEVELS = [
  "ELEMENTARY",
  "MIDDLE_SCHOOL",
  "HIGH_SCHOOL",
  "ACADEMIC",
] as const;

export type CurriculumGradeLevel = (typeof CURRICULUM_GRADE_LEVELS)[number];

export type ParsedCurriculumTopic = {
  subject: string;
  topicName: string;
  subTopics: string[];
  gradeLevel: CurriculumGradeLevel;
  weightInExam: number;
};

const hasOwn = (obj: unknown, key: string): boolean =>
  typeof obj === "object" && obj !== null && key in obj;

export function isParsedCurriculumTopic(value: unknown): value is ParsedCurriculumTopic {
  if (!value || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;

  if (typeof t.subject !== "string" || t.subject.trim().length === 0) return false;
  if (typeof t.topicName !== "string" || t.topicName.trim().length === 0) return false;

  if (
    !hasOwn(t, "subTopics") ||
    !Array.isArray(t.subTopics) ||
    !t.subTopics.every((s) => typeof s === "string" && s.trim().length > 0)
  ) {
    return false;
  }

  if (
    typeof t.gradeLevel !== "string" ||
    !(CURRICULUM_GRADE_LEVELS as readonly string[]).includes(t.gradeLevel)
  ) {
    return false;
  }

  if (typeof t.weightInExam !== "number" || !Number.isFinite(t.weightInExam)) {
    return false;
  }
  if (t.weightInExam < 0.1 || t.weightInExam > 1.0) return false;

  return true;
}

export function sanitizeCurriculumTopics(parsed: unknown): ParsedCurriculumTopic[] {
  if (!Array.isArray(parsed)) {
    throw new Error("יש לשלוח מערך של CurriculumTopic");
  }
  const topics: ParsedCurriculumTopic[] = [];
  for (const item of parsed) {
    if (!isParsedCurriculumTopic(item)) {
      throw new Error(
        `רישום אינו תואם את סכמת CurriculumTopic (subject, topicName, subTopics[], gradeLevel, weightInExam).`
      );
    }
    topics.push({
      subject: item.subject.trim(),
      topicName: item.topicName.trim(),
      subTopics: item.subTopics.map((s: string) => s.trim()).filter(Boolean),
      gradeLevel: item.gradeLevel,
      weightInExam: item.weightInExam,
    });
  }
  return topics;
}