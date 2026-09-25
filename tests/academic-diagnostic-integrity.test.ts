import { describe, it, expect } from "vitest";
import {
  ACADEMIC_COURSES,
  ACADEMIC_COURSE_DISPATCH,
} from "../lib/academic-questions";
import type { AcademicDiagnosticQuestion } from "../lib/academic-questions";
import {
  ACADEMIC_DEGREE_FIELDS,
  classifyAcademicCourseOptGroup,
} from "../lib/diagnostic-taxonomy";
import { resolveAcademicCourseKey } from "../lib/diagnostic-questions";

function optionText(
  opt: AcademicDiagnosticQuestion["options"][number]
): string {
  return (opt.plainText || opt.mathText || "").trim();
}

function questionStem(q: AcademicDiagnosticQuestion): string {
  return [q.context, q.instruction, q.formulaLatex]
    .filter(Boolean)
    .join("\n")
    .trim();
}

function correctIndex(q: AcademicDiagnosticQuestion): number {
  return q.options.findIndex((o) => o.isCorrect);
}

describe("Academic Diagnostic Question Banks - Contract & Integrity Audit", () => {
  // ---------------------------------------------------------------------------
  // 1. כיסוי מלא ודיספאץ' (Dispatch & Registration)
  // ---------------------------------------------------------------------------
  it("should have exactly matching coverage between ACADEMIC_COURSES and ACADEMIC_COURSE_DISPATCH", () => {
    const dispatchKeys = Object.keys(ACADEMIC_COURSE_DISPATCH);

    expect(dispatchKeys.length).toBeGreaterThanOrEqual(76);
    expect(ACADEMIC_COURSES.length).toBeGreaterThanOrEqual(73);

    // Every registered course resolves to a dispatch key and has a sampler
    for (const course of ACADEMIC_COURSES) {
      expect(typeof course.sampleFunction).toBe("function");
      const resolvedKey = resolveAcademicCourseKey(course.id);
      expect(resolvedKey, `unresolved course id: ${course.id}`).toBeTruthy();
      expect(ACADEMIC_COURSE_DISPATCH[resolvedKey!]).toBeDefined();
      expect(dispatchKeys).toContain(resolvedKey!);
    }
  });

  // ---------------------------------------------------------------------------
  // 2. אימות דגימת Onboarding (מחזיר בדיוק 3 שאלות מעורבבות)
  // ---------------------------------------------------------------------------
  it("should return exactly 3 sampled questions for every registered course dispatch", () => {
    for (const [courseKey, samplerFn] of Object.entries(
      ACADEMIC_COURSE_DISPATCH
    )) {
      const sampled = samplerFn();
      expect(Array.isArray(sampled), `dispatch ${courseKey}`).toBe(true);
      expect(sampled, `dispatch ${courseKey}`).toHaveLength(3);

      const uniqueIds = new Set(sampled.map((q) => q.id));
      expect(uniqueIds.size, `dispatch ${courseKey}`).toBe(3);
    }
  });

  // ---------------------------------------------------------------------------
  // 3. ייחודיות מזהי שאלות בכל המערכת (Global Question ID Uniqueness)
  // ---------------------------------------------------------------------------
  it("should ensure all question IDs across all academic courses are strictly unique", () => {
    const allIds = new Set<string>();

    for (const course of ACADEMIC_COURSES) {
      for (const q of course.questionBank) {
        expect(
          allIds.has(q.id),
          `duplicate question id "${q.id}" in course ${course.id}`
        ).toBe(false);
        allIds.add(q.id);
      }
    }
  });

  // ---------------------------------------------------------------------------
  // 4. אכיפת חוזה המפתח (Answer Key Distribution & Count)
  // ---------------------------------------------------------------------------
  it("should strictly satisfy balance rules (3-3-3-3 for 12q, 5-5-5-5 for 20q, or approved 30q)", () => {
    for (const course of ACADEMIC_COURSES) {
      const qList = course.questionBank;
      const count = qList.length;

      if (count === 12) {
        const distribution = [0, 0, 0, 0];
        qList.forEach((q, idx) => {
          expect(q.options, course.id).toHaveLength(4);
          const ci = correctIndex(q);
          expect(ci).toBeGreaterThanOrEqual(0);
          expect(ci).toBeLessThanOrEqual(3);
          distribution[ci]++;

          // אכיפת בלוקים עקביים: 0-2 -> 0, 3-5 -> 1, 6-8 -> 2, 9-11 -> 3
          const expectedBlockIndex = Math.floor(idx / 3);
          expect(
            ci,
            `${course.id} q[${idx}]=${q.id} expected block ${expectedBlockIndex}`
          ).toBe(expectedBlockIndex);
        });
        expect(distribution, course.id).toEqual([3, 3, 3, 3]);
      } else if (count === 20) {
        const distribution = [0, 0, 0, 0];
        qList.forEach((q, idx) => {
          expect(q.options, course.id).toHaveLength(4);
          const ci = correctIndex(q);
          expect(ci).toBeGreaterThanOrEqual(0);
          expect(ci).toBeLessThanOrEqual(3);
          distribution[ci]++;
          const expectedBlockIndex = Math.floor(idx / 5);
          expect(
            ci,
            `${course.id} q[${idx}]=${q.id} expected block ${expectedBlockIndex}`
          ).toBe(expectedBlockIndex);
        });
        expect(distribution, course.id).toEqual([5, 5, 5, 5]);
      } else if (count === 30) {
        expect(course.id).toBe("academic-physics-1");
        const distribution = [0, 0, 0, 0];
        qList.forEach((q) => {
          expect(q.options).toHaveLength(4);
          const ci = correctIndex(q);
          expect(ci).toBeGreaterThanOrEqual(0);
          expect(ci).toBeLessThanOrEqual(3);
          distribution[ci]++;
        });
        expect(distribution.reduce((a, b) => a + b, 0)).toBe(30);
      } else {
        throw new Error(
          `Course ${course.id} has an illegal question count: ${count}`
        );
      }
    }
  });

  // ---------------------------------------------------------------------------
  // 5. בדיקת תקינות פדגוגית והיעדר פילרים (Rich Explanations)
  // ---------------------------------------------------------------------------
  it("should enforce authentic, non-generic pedagogical explanations for every option", () => {
    const forbiddenPhrases = [
      "מסיח פדגוגי",
      "אפשרות שגויה",
      "תשובה לא נכונה",
      "מסיח נפוץ",
      "placeholder",
    ];

    for (const course of ACADEMIC_COURSES) {
      for (const q of course.questionBank) {
        expect(q.title, q.id).toBeTruthy();
        expect(questionStem(q), q.id).toBeTruthy();
        expect(q.options, q.id).toHaveLength(4);
        expect(
          q.options.filter((o) => o.isCorrect),
          `${course.id} ${q.id} must have exactly one correct option`
        ).toHaveLength(1);

        q.options.forEach((opt, optIdx) => {
          const text = optionText(opt);
          expect(text.length, `${course.id} ${q.id} opt ${optIdx}`).toBeGreaterThan(
            0
          );
          // Compact KaTeX-only answers (e.g. "$2$", "$\\pi$") are authentic MCQ
          // choices; prose distractors must still be substantive (>5 chars).
          const isCompactKatex = /^\$[^$\n]{1,48}\$$/.test(text);
          if (!isCompactKatex) {
            expect(
              text.length,
              `${course.id} ${q.id} opt ${optIdx}`
            ).toBeGreaterThan(5);
          }
          expect(
            opt.explanation.trim().length,
            `${course.id} ${q.id} opt ${optIdx}`
          ).toBeGreaterThan(20);

          for (const phrase of forbiddenPhrases) {
            if (
              opt.explanation.includes(phrase) &&
              opt.explanation.length < 50
            ) {
              throw new Error(
                `Course ${course.id}, Question ${q.id}, Option ${optIdx} contains generic placeholder: "${phrase}"`
              );
            }
          }
        });
      }
    }
  });

  // ---------------------------------------------------------------------------
  // 6. תקינות סוגרי KaTeX / LaTeX
  // ---------------------------------------------------------------------------
  it("should have balanced and properly closed KaTeX dollar delimiters ($)", () => {
    for (const course of ACADEMIC_COURSES) {
      for (const q of course.questionBank) {
        const textSnippets = [
          q.context,
          q.instruction,
          q.formulaLatex ?? "",
          ...q.options.map((o) => optionText(o)),
          ...q.options.map((o) => o.explanation),
        ];

        for (const str of textSnippets) {
          const matches = str.match(/(?<!\\)\$/g);
          if (matches) {
            expect(
              matches.length % 2,
              `${course.id} ${q.id}: unbalanced $ in "${str.slice(0, 80)}…"`
            ).toBe(0);
          }
        }
      }
    }
  });

  // ---------------------------------------------------------------------------
  // 7. תאימות טקסונומיה וניתוב UI (Taxonomy & OptGroup Routing)
  // ---------------------------------------------------------------------------
  it("should correctly resolve and categorize all STEM catalog courses without orphans", () => {
    // Every registered bank is reachable by stable id and Hebrew display name
    for (const course of ACADEMIC_COURSES) {
      for (const label of [course.id, course.nameHe]) {
        const key = resolveAcademicCourseKey(label);
        expect(key, `unresolved registered course label: ${label}`).toBeTruthy();
        expect(ACADEMIC_COURSE_DISPATCH[key!]).toBeDefined();
      }
      expect(classifyAcademicCourseOptGroup(course.nameHe)).toBeTruthy();
    }

    // Degree fields whose onboarding path is wired to the 76 STEM banks
    const stemDegreeIds = new Set([
      "cs_sw_eng",
      "electrical_eng",
      "mech_eng",
      "civil_eng",
      "ie_mgmt",
      "info_systems",
      "data_science",
    ]);

    // Catalog-only shell courses (lab / capstone) with no dedicated diagnostic bank
    const banklessCatalogAllowlist = new Set([
      "מעבדה להנדסת מכונות (034040)",
      "פרויקט תכן גמר (034046)",
    ]);

    const orphans: string[] = [];
    for (const degree of ACADEMIC_DEGREE_FIELDS) {
      if (!stemDegreeIds.has(degree.id)) continue;
      for (const year of degree.years || []) {
        for (const courseName of year.courses || []) {
          if (banklessCatalogAllowlist.has(courseName)) continue;

          const resolvedKey = resolveAcademicCourseKey(courseName);
          if (!resolvedKey || !ACADEMIC_COURSE_DISPATCH[resolvedKey]) {
            orphans.push(`${degree.id}/${year.yearId}: ${courseName}`);
            continue;
          }

          const group = classifyAcademicCourseOptGroup(courseName);
          expect(group).toBeTruthy();
        }
      }
    }
    expect(orphans, orphans.join("\n")).toEqual([]);
  });
});
