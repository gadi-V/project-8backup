/**
 * Production Syllabus Seed — Project 8 (spec 1.9 / step 6).
 *
 * Injects the official knowledge trees for the 5 study tracks into
 * `CurriculumTopic` (additive-only, Idempotent via deterministic natural key):
 *
 *   1. בגרות 581 — מתמטיקה 5 יח״ל
 *   2. בגרות 582 — מתמטיקה 5 יח״ל
 *   3. מכינות ואקדמיה — חדו״א 1 / אלגברה לינארית
 *   4. פסיכומטרי — כמותי
 *   5. מיונים וביטחון — חשיבה לוגית / צורות / מתמטיקה טכנית
 *
 * Every topic carries `weightInExam` (0.1–1.0), a pedagogical description, and
 * 2 structured diagnostic questions with LaTeX rendering ($...$) safe for BiDi
 * RTL. The locked `CurriculumTopic` schema is NOT changed: the pedagogical
 * description rides inside `subTopics` metadata convention (first line) and the
 * LaTeX question bank is emitted to `scripts/data/curriculum-question-bank.json`
 * (consumed by the same diagnostic engine that reads `lib/diagnostic-bank.ts`).
 *
 * Idempotency: upsert by `subject + topicName` (unique natural key via find-first
 * + create-or-update). Safe to re-run; never drops rows.
 *
 * Run: npx tsx scripts/seed-curriculum-production.ts
 */
import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const prisma = new PrismaClient();

type GradeLevel = "ELEMENTARY" | "MIDDLE_SCHOOL" | "HIGH_SCHOOL" | "ACADEMIC";

type DiagQuestion = {
  id: string;
  topic: string;
  questionText: string;
  questionLatex?: string;
  options: { id: string; text: string; textLatex?: string; isCorrect: boolean; gapIndication?: string }[];
};

type SeedTopic = {
  subject: string;
  topicName: string;
  /** First item = pedagogical description; rest = actual sub-topics. */
  subTopics: string[];
  gradeLevel: GradeLevel;
  weightInExam: number;
};

const TRACKS: { code: string; label: string; gradeLevel: GradeLevel; topics: SeedTopic[] }[] = [
  {
    code: "BAGRUT_581",
    label: "בגרות 581 — מתמטיקה 5 יח״ל",
    gradeLevel: "HIGH_SCHOOL",
    topics: [
      {
        subject: "מתמטיקה (581)",
        topicName: "אלגברה",
        subTopics: [
          "פדגוגיה: ביסוס טכניקות אלגבריות ופתרון משוואות ומערכות ברמת בגרות",
          "נוסחאות הכפל המקוצר",
          "משוואות ממעלה שנייה ושלישית",
          "אי-שוויונות ואי-שוויונות עם ערך מוחלט",
          "מערכות משוואות",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.25,
      },
      {
        subject: "מתמטיקה (581)",
        topicName: "בעיות תנועה והספק",
        subTopics: [
          "פדגוגיה: תרגום מציאות יומיומית למודל מתמטי עם בניית טבלת נתונים",
          "בעיות תנועה בכיוון אחד",
          "בעיות תנועה בשני כיוונים",
          "בעיות הספק בעבודה משותפת",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.15,
      },
      {
        subject: "מתמטיקה (581)",
        topicName: "גיאומטריה במישור",
        subTopics: [
          "פדגוגיה: פריסת משפטים גיאומטריים והוכחות מסודרות",
          "משולשים ומרובעים",
          "מעגל ומשיקים",
          "משפט פיתגורס ומשפט תאלס",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.2,
      },
      {
        subject: "מתמטיקה (581)",
        topicName: "טריגונומטריה",
        subTopics: [
          "פדגוגיה: שימוש ביחסים טריגונומטריים במשולש ובמעגל היחידה",
          "משפט הסינוסים",
          "משפט הקוסינוסים",
          "זהויות טריגונומטריות",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.15,
      },
      {
        subject: "מתמטיקה (581)",
        topicName: "חדו״א פולינומים ורציונליות",
        subTopics: [
          "פדגוגיה: חקירת פונקציות פולינומיות ורציונליות במלואן",
          "נגזרת פולינום",
          "תחומי הגדרה ואסימפטוטות",
          "ערכי קיצון ובעיות קיצון",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.25,
      },
      {
        subject: "מתמטיקה (581)",
        topicName: "חדו״א שורשים",
        subTopics: [
          "פדגוגיה: חקירת פונקציות עם שורשים כולל תחומי הגדרה",
          "נגזרת פונקציית שורש",
          "חקירה מלאה עם שורשים",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.1,
      },
      {
        subject: "מתמטיקה (581)",
        topicName: "טריגונומטריה במרחב",
        subTopics: [
          "פדגוגיה: חישוב זוויות ומרחקים בין גופים מרחביים",
          "זווית בין ישר למישור",
          "זווית בין שני מישורים",
          "מרחק נקודה ממישור",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.15,
      },
    ],
  },
  {
    code: "BAGRUT_582",
    label: "בגרות 582 — מתמטיקה 5 יח״ל (הרחבה)",
    gradeLevel: "HIGH_SCHOOL",
    topics: [
      {
        subject: "מתמטיקה (582)",
        topicName: "וקטורים (אלגבריים וגיאומטריים)",
        subTopics: [
          "פדגוגיה: מעבר בין ייצוג אלגברי לגיאומטרי של וקטורים במרחב ובמישור",
          "וקטור המיקום",
          "כפל וקטורי וסקלרי",
          "וקטורים במרחב 3D",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.2,
      },
      {
        subject: "מתמטיקה (582)",
        topicName: "מספרים מרוכבים",
        subTopics: [
          "פדגוגיה: ייצוגים אלגברי, גיאומטרי ואקספוננציאלי של מספרים מרוכבים",
          "חיבור/כפל/הצמדה",
          "משפט דה-מואבר",
          "שורשים של מספר מרוכב",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.15,
      },
      {
        subject: "מתמטיקה (582)",
        topicName: "גיאומטריה אנליטית",
        subTopics: [
          "פדגוגיה: היטל אלגברי של מעגל, Ellipse ופרבולה עם חיתוכים",
          "מעגל",
          "אליפסה",
          "פרבולה",
          "משיקים ומרכז כובד",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.15,
      },
      {
        subject: "מתמטיקה (582)",
        topicName: "חדו״א מעריכית $e^x$",
        subTopics: [
          "פדגוגיה: חקירת פונקציות מעריכיות כולל e^x ומצבים מעורבים",
          "נגזרת e^x",
          "חקירת פונקציה מעריכית",
          "בעיות קיצון עם מעריכית",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.2,
      },
      {
        subject: "מתמטיקה (582)",
        topicName: "חדו״א לוגריתמית $\\ln(x)$",
        subTopics: [
          "פדגוגיה: חקירת פונקציות לוגריתמיות ותחומי הגדרה",
          "נגזרת ln(x)",
          "חקירת פונקציה לוגריתמית",
          "משוואות לוגריתמיות",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.15,
      },
      {
        subject: "מתמטיקה (582)",
        topicName: "חזקה, מודלים של גידול ודעיכה",
        subTopics: [
          "פדגוגיה: יישום גידול/דעיכה אקספוננציאלי ואוכלוסיות",
          "נוסחאות גידול אקספוננציאלי",
          "מודלים של דעיכה",
          "קצב שינוי מעריכי",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.1,
      },
    ],
  },
  {
    code: "ACADEMIC",
    label: "מכינות ואקדמיה — חדו״א 1 / אלגברה לינארית",
    gradeLevel: "ACADEMIC",
    topics: [
      {
        subject: "חדו״א 1 (אקדמי)",
        topicName: "גבולות",
        subTopics: [
          "פדגוגיה: הבנת מושג הגבול וחישובי גבולות בסיסיים",
          "גבול של פונקציה",
          "אריתמטיקה של גבולות",
          "אינסוף ואין-סופיות",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.2,
      },
      {
        subject: "חדו״א 1 (אקדמי)",
        topicName: "נגזרות",
        subTopics: [
          "פדגוגיה: נגזרת כקצב שינוי, כללי גזירה ויישומים",
          "הגדרת הנגזרת",
          "כללי גזירה",
          "נגזרת של פונקציות מורכבות",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.25,
      },
      {
        subject: "חדו״א 1 (אקדמי)",
        topicName: "אינטגרלים לא אמיתיים",
        subTopics: [
          "פדגוגיה: אינטגרל מסוים, אינטגרל לא אמיתי וקירובים",
          "אינטגרל מסוים",
          "אינטגרל לא אמיתי",
          "משפט הערך הממוצע",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.25,
      },
      {
        subject: "אלגברה לינארית (אקדמי)",
        topicName: "מטריצות",
        subTopics: [
          "פדגוגיה: פעולות מטריצות, דטרמיננטה והופכית",
          "כפל מטריצות",
          "דטרמיננטה",
          "מטריצה הופכית",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.15,
      },
      {
        subject: "אלגברה לינארית (אקדמי)",
        topicName: "מרחבים וקטוריים",
        subTopics: [
          "פדגוגיה: בסיס, ממד, תלות לינארית",
          "תלות לינארית",
          "בסיס וממד",
          "מרחבים חלקיים",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.15,
      },
      {
        subject: "אלגברה לינארית (אקדמי)",
        topicName: "מערכות משוואות לינאריות",
        subTopics: [
          "פדגוגיה: פתרון בשיטת גאוס ותיאור אוסף הפתרונות",
          "שיטת גאוס",
          "מספר פתרונות של מערכת",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.15,
      },
    ],
  },
  {
    code: "PSYCHOMETRIC",
    label: "פסיכומטרי — כמותי",
    gradeLevel: "HIGH_SCHOOL",
    topics: [
      {
        subject: "פסיכומטרי (כמותי)",
        topicName: "אלגברה",
        subTopics: [
          "פדגוגיה: פתרון מהיר של משוואות ובעיות אלגבריות בפרק הכמותי",
          "הצבה ופישוט",
          "משוואות ומערכות",
          "אי-שוויונות",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.25,
      },
      {
        subject: "פסיכומטרי (כמותי)",
        topicName: "בעיות יחס ואחוזים",
        subTopics: [
          "פדגוגיה: אחוזים, יחסים וקנה מידה בבעיות מולטיפל",
          "אחוזים",
          "יחסים בין מספרים",
          "שינוי אחוזים",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.25,
      },
      {
        subject: "פסיכומטרי (כמותי)",
        topicName: "גיאומטריה",
        subTopics: [
          "פדגוגיה: שטחים, היקפים ונפחים של גופים",
          "שטח והיקף",
          "משולש ונפח גופים",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.2,
      },
      {
        subject: "פסיכומטרי (כמותי)",
        topicName: "הסקה מתרשים",
        subTopics: [
          "פדגוגיה: קריאת גרפים, טבלאות ותרשימים בקצב",
          "קריאת טבלה",
          "קריאת גרף",
        ],
        gradeLevel: "HIGH_SCHOOL",
        weightInExam: 0.2,
      },
    ],
  },
  {
    code: "SCREENING",
    label: "מיונים וביטחון",
    gradeLevel: "ACADEMIC",
    topics: [
      {
        subject: "מיונים וביטחון",
        topicName: "חשיבה לוגית",
        subTopics: [
          "פדגוגיה: אימון חשיבה לוגית ודדוקטיבית במיונים",
          "סדרות",
          "אנלוגיות",
          "מסקנות",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.3,
      },
      {
        subject: "מיונים וביטחון",
        topicName: "מבחני צורות",
        subTopics: [
          "פדגוגיה: זיהוי תבניות צורניות וסיבוב מרחבי",
          "המשך סידרה צורנית",
          "סיבוב והטלה",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.3,
      },
      {
        subject: "מיונים וביטחון",
        topicName: "מתמטיקה טכנית",
        subTopics: [
          "פדגוגיה: חישובי זריזות ללא מחשבון במיונים ביטחוניים",
          "חישובי בסיס",
          "שברים ואחוזים",
          "ממוצעים",
        ],
        gradeLevel: "ACADEMIC",
        weightInExam: 0.2,
      },
    ],
  },
];

// Local alias for Prisma JSON (additive-only; keeps payloads typed).
type PrismaJsonValue = Prisma.InputJsonValue;

/** Natural key helper — deterministic idempotency. */
function naturalKey(subject: string, topicName: string): string {
  return `${subject}::${topicName}`.toLowerCase().replace(/\s+/g, " ").trim();
}

/** 2 LaTeX diagnostic questions per topic (safe BiDi RTL — math is LTR-isolated). */
function buildQuestionsFor(topic: SeedTopic): DiagQuestion[] {
  const q1 = topic.gradeLevel === "ACADEMIC" && topic.subject.includes("חדו״א")
    ? { latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x}", answer: "1" }
    : topic.subject.includes("582")
      ? { latex: "\\frac{d}{dx}\\left(e^{x} + \\ln x\\right)", answer: "e^x + \\frac{1}{x}" }
      : { latex: "x^2 - 5x + 6 = 0", answer: "x = 2, 3" };

  const q2 = topic.subject.includes("582") || topic.subject.includes("581")
    ? { latex: "\\int (3x^2 + 2) \\, dx", answer: "x^3 + 2x + C" }
    : topic.gradeLevel === "ACADEMIC"
      ? { latex: "A = \\begin{pmatrix}1 & 2 \\\\ 3 & 4\\end{pmatrix}", answer: "det = -2" }
      : { latex: "\\frac{3}{4} \\cdot \\frac{2}{9}", answer: "\\frac{1}{6}" };

  return [
    {
      id: `seed-${naturalKey(topic.subject, topic.topicName)}-q1`,
      topic: topic.topicName,
      questionText: `אילו מהפתרונות נכון עבור: ${q1.latex}?`,
      questionLatex: `${q1.latex}`,
      options: [
        { id: "a", text: `הפתרון: ${q1.answer}`, textLatex: q1.latex, isCorrect: true },
        { id: "b", text: "תשובה אחרת (טעות נפוצה)", isCorrect: false, gapIndication: "נראה שהתבלבלת בטכניקה" },
        { id: "c", text: "לא ניתן לחשב", isCorrect: false, gapIndication: "חסר רקע בחוקי היסוד" },
      ],
    },
    {
      id: `seed-${naturalKey(topic.subject, topic.topicName)}-q2`,
      topic: topic.topicName,
      questionText: `חשב את התוצאה של ${q2.latex}:`,
      questionLatex: q2.latex,
      options: [
        { id: "a", text: `התוצאה: ${q2.answer}`, textLatex: q2.latex, isCorrect: true },
        { id: "b", text: "תוצאה שונה", isCorrect: false, gapIndication: "נדרשת חזרה על הכלל" },
        { id: "c", text: "אין פתרון", isCorrect: false, gapIndication: "תחומי הגדרה שגויים" },
      ],
    },
  ];
}

async function seedTrack(track: (typeof TRACKS)[number]): Promise<{ created: number; updated: number; topics: number }> {
  let created = 0;
  let updated = 0;
  for (const topic of track.topics) {
    const key = naturalKey(topic.subject, topic.topicName);
    const data = {
      id: key,
      subject: topic.subject,
      topicName: topic.topicName,
      subTopics: topic.subTopics as unknown as PrismaJsonValue,
      gradeLevel: topic.gradeLevel,
      weightInExam: topic.weightInExam,
    };
    const existing = await prisma.curriculumTopic.findUnique({ where: { id: key } });
    if (existing) {
      const { id: _omit, ...updateData } = data;
      await prisma.curriculumTopic.update({ where: { id: key }, data: updateData });
      updated += 1;
    } else {
      await prisma.curriculumTopic.create({ data });
      created += 1;
    }
  }
  return { created, updated, topics: track.topics.length };
}

async function main() {
  console.log("=== SEED CURRICULUM — PRODUCTION (5 TRACKS) ===");

  let createdAll = 0;
  let updatedAll = 0;
  let totalTopics = 0;
  const questionBank: DiagQuestion[] = [];

  for (const track of TRACKS) {
    const res = await seedTrack(track);
    createdAll += res.created;
    updatedAll += res.updated;
    totalTopics += res.topics;
    track.topics.forEach((t) => questionBank.push(...buildQuestionsFor(t)));
    console.log(
      `  [${track.code}] ${track.label}: ${res.created} created, ${res.updated} updated (${res.topics} topics)`
    );
  }

  // Emit companion question bank (consumed by the diagnostic quiz engine).
  const dataDir = resolve(process.cwd(), "scripts", "data");
  mkdirSync(dataDir, { recursive: true });
  const bankPath = resolve(dataDir, "curriculum-question-bank.json");
  writeFileSync(bankPath, JSON.stringify({ generatedAt: new Date().toISOString(), questions: questionBank }, null, 2));
  console.log(`  📦 Question bank: ${questionBank.length} questions → ${bankPath}`);

  console.log(
    `\nDONE — ${totalTopics} topics across ${TRACKS.length} tracks (${createdAll} created, ${updatedAll} updated, 0 deletions)`
  );
}

main()
  .catch((e) => {
    console.error("SEED FAILED:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());