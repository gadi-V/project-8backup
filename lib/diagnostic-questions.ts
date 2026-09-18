import type { DiagnosticTrackType } from "./diagnostic-taxonomy";
import { DIAGNOSTIC_MATH_BANK } from "./diagnostic-bank";

export type DiagnosticOption = {
  id: string;
  mathText?: string;
  plainText?: string;
  isCorrect: boolean;
  explanation: string;
};

export type DiagnosticQuestion = {
  id: string;
  domain: string;
  title: string;
  context: string;
  instruction: string;
  formulaLatex: string;
  options: DiagnosticOption[];
};

export type ChallengeQuestionParams = {
  trackType: DiagnosticTrackType;
  /** Bagrut exam paper code (e.g. 35582, 582, ALL_5). */
  examCode?: string | null;
  /** Bagrut subject id (math, physics, …). */
  subjectId?: string | null;
  /** Academic course label / catalog name. */
  courseId?: string | null;
  /** Mechina subject label. */
  mechinaSubject?: string | null;
  /** Screening battery label. */
  screeningBattery?: string | null;
};

/* -------------------------------------------------------------------------- */
/* BAGRUT — 582 (vectors / complex / exponential)                              */
/* -------------------------------------------------------------------------- */

export const DIAGNOSTIC_3_DOMAIN_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "domain-1-calculus",
    domain: "חדו״א ופונקציות מעריכיות",
    title: "שאלה 1: אסימפטוטות וגבול יסודי (5 יח״ל)",
    context: "שאלון 582 / חדו״א — חקירה מלאה של פונקציה מעריכית",
    instruction:
      "נתונה הפונקציה. מהי האסימפטוטה האופקית כאשר x→−∞, ומהו הגבול lim_{x→0} f(x)/x?",
    formulaLatex:
      "f(x) = \\frac{e^x - 1}{e^x + 1},\\quad \\lim_{x \\to -\\infty} f(x) = ?,\\quad \\lim_{x \\to 0}\\frac{f(x)}{x} = ?",
    options: [
      {
        id: "d1-opt-a",
        mathText: "y = -1,\\; \\tfrac{1}{2}",
        isCorrect: true,
        explanation:
          "נכון: ב-−∞ מתקבל (−1)/1 = −1. הגבול ב-0 שווה ל-f'(0)=2/(1+1)²=1/2.",
      },
      {
        id: "d1-opt-b",
        mathText: "y = 1,\\; \\tfrac{1}{2}",
        isCorrect: false,
        explanation: "שגיאה נפוצה: y=1 היא האסימפטוטה ב-+∞, לא ב-−∞.",
      },
      {
        id: "d1-opt-c",
        mathText: "y = -1,\\; 1",
        isCorrect: false,
        explanation: "הגבול האופקי נכון, אך lim f(x)/x ב-0 הוא 1/2 ולא 1.",
      },
      {
        id: "d1-opt-d",
        plainText: "אין אסימפטוטה אופקית; הגבול ב-0 אינו קיים",
        isCorrect: false,
        explanation: "שני הגבולות קיימים וסופיים.",
      },
    ],
  },
  {
    id: "domain-2-vectors",
    domain: "וקטורים במרחב וגיאומטריה אנליטית",
    title: "שאלה 2: מכפלה משולשת ונפח מקבילון",
    context: "שאלון 582 — גיאומטריה וקטורית תלת-ממדית",
    instruction:
      "נתונים שלושה וקטורים. מהו נפח המקבילון שהם פורשים (ערך מוחלט של המכפלה המשולשת)?",
    formulaLatex:
      "\\vec{a}=(1,2,0),\\; \\vec{b}=(0,1,3),\\; \\vec{c}=(2,0,1),\\quad V=|\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})|=?",
    options: [
      {
        id: "d2-opt-a",
        mathText: "13",
        isCorrect: true,
        explanation:
          "מדויק: det[a b c] = 1·(1·1−3·0) − 2·(0·1−3·2) + 0 = 1 − 2(−6) = 13.",
      },
      {
        id: "d2-opt-b",
        mathText: "7",
        isCorrect: false,
        explanation: "שגיאה בחישוב הדטרמיננטה / סימני קופקטורים.",
      },
      {
        id: "d2-opt-c",
        mathText: "5",
        isCorrect: false,
        explanation: "חישוב חלקי של מכפלה וקטורית בלבד.",
      },
      {
        id: "d2-opt-d",
        mathText: "0",
        isCorrect: false,
        explanation: "הווקטורים אינם קופלנריים — הנפח אינו אפס.",
      },
    ],
  },
  {
    id: "domain-3-complex",
    domain: "מספרים מרוכבים ומשפט דה-מואבר",
    title: "שאלה 3: הצגה קוטבית, חזקה ושורשי יחידה",
    context: "שאלון 582 / אלגברה — דה-מואבר ומישור גאוס",
    instruction:
      "נתון z בהצגה קוטבית. חשב z³ וקבע באיזה רביע במישור גאוס נמצאת התוצאה.",
    formulaLatex:
      "z = \\sqrt{2}\\,\\mathrm{cis}(45^\\circ) = \\sqrt{2}\\,e^{i\\pi/4},\\quad z^3 = ?",
    options: [
      {
        id: "d3-opt-a",
        mathText: "2\\sqrt{2}\\,\\mathrm{cis}(135^\\circ) = -2+2i\\;(\\text{QII})",
        isCorrect: true,
        explanation:
          "דה-מואבר: r³=(√2)³=2√2, זווית 135°. אלגברית −2+2i — רביע שני.",
      },
      {
        id: "d3-opt-b",
        mathText: "2\\,\\mathrm{cis}(135^\\circ)\\;(\\text{QII})",
        isCorrect: false,
        explanation: "שגיאה ברדיוס: (√2)³ = 2√2 ולא 2.",
      },
      {
        id: "d3-opt-c",
        mathText: "2\\sqrt{2}\\,\\mathrm{cis}(45^\\circ)\\;(\\text{QI})",
        isCorrect: false,
        explanation: "שגיאה בזווית: יש להכפיל ב-3 → 135°.",
      },
      {
        id: "d3-opt-d",
        mathText: "-2-2i\\;(\\text{QIII})",
        isCorrect: false,
        explanation: "רביע שלישי — זווית שגויה (225° במקום 135°).",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* BAGRUT — 581 (diff / geometry / sequences) via diagnostic-bank bridge       */
/* -------------------------------------------------------------------------- */

function bankToOnboardingQuestions(
  bankKey: string,
  contextLabel: string
): DiagnosticQuestion[] {
  const bank = DIAGNOSTIC_MATH_BANK[bankKey] ?? [];
  return bank.map((q, idx) => ({
    id: `bank-${bankKey}-${q.id}`,
    domain: q.topic,
    title: `שאלה ${idx + 1}: ${q.topic}`,
    context: contextLabel,
    instruction: q.questionText,
    formulaLatex: q.questionLatex || q.questionText,
    options: q.options.map((opt) => ({
      id: `${q.id}-${opt.id}`,
      mathText: opt.textLatex,
      plainText: opt.textLatex ? undefined : opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.gapIndication
        ? `פער מזוהה: ${opt.gapIndication}`
        : opt.isCorrect
          ? "תשובה נכונה."
          : "תשובה שגויה.",
    })),
  }));
}

const BAGRUT_581_QUESTIONS: DiagnosticQuestion[] = bankToOnboardingQuestions(
  "math_581",
  "שאלון 581 — דיפרנציאלי, גיאומטריה וסדרות"
);

const BAGRUT_4U_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "bagrut-4u-1",
    domain: "אלגברה — אי-שוויונים עם ערך מוחלט מקונן",
    title: "שאלה 1: אי-שוויון עם ערך מוחלט כפול",
    context: "שאלון 481/482 — אלגברה מתקדמת",
    instruction:
      "כמה פתרונות ממשיים שלמים יש לאי-שוויון |||x|−2|−1| ≤ 1?",
    formulaLatex: "\\bigl|\\,|\\,|x|-2\\,|-1\\,\\bigr| \\le 1",
    options: [
      {
        id: "b4-1a",
        mathText: "9",
        isCorrect: true,
        explanation:
          "|u−1|≤1 עם u=||x|−2| ⇒ 0≤u≤2 ⇒ ||x|−2|≤2 ⇒ |x|≤4 ⇒ x∈[−4,4]. שלמים: 9.",
      },
      {
        id: "b4-1b",
        mathText: "7",
        isCorrect: false,
        explanation: "צמצום יתר ל-|x|≤3 בלי לכלול את הקצוות ±4.",
      },
      {
        id: "b4-1c",
        mathText: "5",
        isCorrect: false,
        explanation: "התעלמות מאחד מענפי הערך המוחלט.",
      },
      {
        id: "b4-1d",
        mathText: "3",
        isCorrect: false,
        explanation: "צמצום יתר לתחום צר מדי.",
      },
    ],
  },
  {
    id: "bagrut-4u-2",
    domain: "גיאומטריה — מרובע ציקלי",
    title: "שאלה 2: מרובע ציקלי ומשפט הזוויות",
    context: "שאלון 481 — גיאומטריה אוקלידית",
    instruction:
      "במרובע ציקלי ABCD נתון ∠DAB = 70° ו-∠ABC = 95°. מהו ∠ADC?",
    formulaLatex:
      "ABCD\\text{ cyclic},\\quad \\angle DAB=70^\\circ,\\; \\angle ABC=95^\\circ,\\quad \\angle ADC=?",
    options: [
      {
        id: "b4-2a",
        mathText: "85^\\circ",
        isCorrect: true,
        explanation:
          "במרובע ציקלי סכום זוויות נגדיות = 180°: ∠ABC+∠ADC=180 ⇒ 95+∠ADC=180 ⇒ ∠ADC=85°.",
      },
      {
        id: "b4-2b",
        mathText: "110^\\circ",
        isCorrect: false,
        explanation: "זו ∠BCD (נגדית ל-A), לא ∠ADC.",
      },
      {
        id: "b4-2c",
        mathText: "70^\\circ",
        isCorrect: false,
        explanation: "העתקת זווית A במקום זווית נגדית ל-B.",
      },
      {
        id: "b4-2d",
        mathText: "95^\\circ",
        isCorrect: false,
        explanation: "העתקת זווית B.",
      },
    ],
  },
  {
    id: "bagrut-4u-3",
    domain: "חדו״א — אופטימיזציה",
    title: "שאלה 3: מקסימום שטח תחת אילוץ",
    context: "שאלון 481 — חדו״א יישומי",
    instruction:
      "מלבן חסום תחת הפרבולה y=4−x² כך שבסיסו על ציר x והקודקודים העליונים על העקום. מהו השטח המקסימלי?",
    formulaLatex:
      "y=4-x^2,\\quad S(x)=2x(4-x^2),\\quad S_{\\max}=?",
    options: [
      {
        id: "b4-3a",
        mathText: "\\tfrac{16\\sqrt{3}}{3}",
        isCorrect: true,
        explanation:
          "S=8x−2x³, S'=8−6x²=0 ⇒ x²=4/3. S_max=16√3/3.",
      },
      {
        id: "b4-3b",
        mathText: "8",
        isCorrect: false,
        explanation: "שטח בנקודת החיתוך עם הצירים, לא במקסימום.",
      },
      {
        id: "b4-3c",
        mathText: "\\tfrac{32}{3}",
        isCorrect: false,
        explanation: "שכחת את √3 ברציונליזציה.",
      },
      {
        id: "b4-3d",
        mathText: "4\\sqrt{3}",
        isCorrect: false,
        explanation: "חישוב חלקי של S בנקודת הקיצון.",
      },
    ],
  },
];

const BAGRUT_PHYSICS_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "phys-1",
    domain: "מכניקה — תנועה יחסית עם יתרון התחלה",
    title: "שאלה 1: מהירות יחסית ורדיפת רכב",
    context: "פיזיקה 5 יח״ל — קינטיקה חד-ממדית",
    instruction:
      "רכב A נוסע במהירות קבועה 20 מ׳/ש׳. רכב B מתחיל 80 מ׳ מאחוריו במהירות 28 מ׳/ש׳ ותאוצה 0. מהו הזמן עד ש-B מדביק את A?",
    formulaLatex:
      "v_A=20,\\; v_B=28,\\; \\Delta x_0=80,\\quad t=\\frac{\\Delta x_0}{v_B-v_A}=?",
    options: [
      {
        id: "p1a",
        mathText: "10\\,\\mathrm{s}",
        isCorrect: true,
        explanation: "מהירות יחסית 8 מ׳/ש׳, מרחק 80 ⇒ t=10 שניות.",
      },
      {
        id: "p1b",
        mathText: "4\\,\\mathrm{s}",
        isCorrect: false,
        explanation: "חלוקה ב-v_B במקום בהפרש המהירויות.",
      },
      {
        id: "p1c",
        mathText: "2.86\\,\\mathrm{s}",
        isCorrect: false,
        explanation: "חלוקה ב-v_A במקום בהפרש.",
      },
      {
        id: "p1d",
        mathText: "80\\,\\mathrm{s}",
        isCorrect: false,
        explanation: "שכחת את המהירות היחסית.",
      },
    ],
  },
  {
    id: "phys-2",
    domain: "חשמל — מעגלים מורכבים",
    title: "שאלה 2: התנגדות שקולה עם מקבילים בטור",
    context: "פיזיקה — חשמל ומגנטיות",
    instruction:
      "שתי התנגדויות 6Ω במקביל, והתוצאה בטור עם 4Ω. מהי ההתנגדות השקולה?",
    formulaLatex:
      "R_{eq}=4+\\Bigl(\\frac{1}{6}+\\frac{1}{6}\\Bigr)^{-1}=?",
    options: [
      {
        id: "p2a",
        mathText: "7\\,\\Omega",
        isCorrect: true,
        explanation: "מקביל של 6||6 = 3Ω, ועם 4 בטור: 7Ω.",
      },
      {
        id: "p2b",
        mathText: "10\\,\\Omega",
        isCorrect: false,
        explanation: "חיבור הכל בטור בלי מקביל.",
      },
      {
        id: "p2c",
        mathText: "3\\,\\Omega",
        isCorrect: false,
        explanation: "רק חלק המקביל, בלי הטור.",
      },
      {
        id: "p2d",
        mathText: "16\\,\\Omega",
        isCorrect: false,
        explanation: "חיבור שגוי של כל הרכיבים.",
      },
    ],
  },
  {
    id: "phys-3",
    domain: "אנרגיה — שימור מכני עם חיכוך",
    title: "שאלה 3: גובה מקסימלי עם עבודת חיכוך",
    context: "פיזיקה — שימור אנרגיה",
    instruction:
      "גוף מסה 2 ק״ג משוגר במהירות 10 מ׳/ש׳ במעלה מישור משופע (μ_k=0.1, θ=30°). עד איזה מרחק לאורך המישור יגיע לפני עצירה? (g=10)",
    formulaLatex:
      "\\tfrac12 mv^2 = mg s\\sin\\theta + \\mu_k mg s\\cos\\theta,\\quad s=?",
    options: [
      {
        id: "p3a",
        mathText: "\\approx 8.45\\,\\mathrm{m}",
        isCorrect: true,
        explanation:
          "100 = 2·10·s·(0.5+0.1·√3/2) ≈ 20s·0.5866 ⇒ s≈8.45 מ׳.",
      },
      {
        id: "p3b",
        mathText: "5\\,\\mathrm{m}",
        isCorrect: false,
        explanation: "התעלמות מחיכוך: s=v²/(2g sinθ)=5.",
      },
      {
        id: "p3c",
        mathText: "10\\,\\mathrm{m}",
        isCorrect: false,
        explanation: "שימוש ב-v במקום v²/2g.",
      },
      {
        id: "p3d",
        mathText: "1\\,\\mathrm{m}",
        isCorrect: false,
        explanation: "שגיאת יחידות / שכחת המסה בצורה שגויה.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* ACADEMIC                                                                    */
/* -------------------------------------------------------------------------- */

const ACADEMIC_CALC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "acad-calc-1",
    domain: "נגזרות — שרשרת טריגונומטרית-מעריכית",
    title: "שאלה 1: נגזרת מורכבת (חדו״א 1)",
    context: "אקדמיה — חדו״א 1 / אינפי 1",
    instruction: "מהי הנגזרת של f(x)=e^{sin(2x)} בנקודה x=0?",
    formulaLatex: "f(x)=e^{\\sin(2x)},\\quad f'(0)=?",
    options: [
      {
        id: "ac1a",
        mathText: "2",
        isCorrect: true,
        explanation: "f'=e^{sin(2x)}·cos(2x)·2. ב-0: e^0·1·2=2.",
      },
      {
        id: "ac1b",
        mathText: "1",
        isCorrect: false,
        explanation: "שכחת את כלל השרשרת הפנימי (מקדם 2).",
      },
      {
        id: "ac1c",
        mathText: "0",
        isCorrect: false,
        explanation: "בלבול עם f(0) במקום f'(0).",
      },
      {
        id: "ac1d",
        mathText: "e",
        isCorrect: false,
        explanation: "הערכה שגויה של e^{sin(0)}·cos(0) בלי המקדם.",
      },
    ],
  },
  {
    id: "acad-calc-2",
    domain: "אופטימיזציה — קיצון עם אילוץ",
    title: "שאלה 2: מינימום עלות ייצור",
    context: "אקדמיה — חדו״א יישומי",
    instruction:
      "עלות C(x)=x³−6x²+20x+100 ליחידות x>0. באיזה x העלות השולית מינימלית?",
    formulaLatex: "C'(x)=3x^2-12x+20,\\quad C''(x)=0 \\Rightarrow x=?",
    options: [
      {
        id: "ac2a",
        mathText: "x=2",
        isCorrect: true,
        explanation: "עלות שולית מינימלית כאשר C''=0: 6x−12=0 ⇒ x=2 (ו-C'''>0).",
      },
      {
        id: "ac2b",
        mathText: "x=4",
        isCorrect: false,
        explanation: "בלבול עם נקודת קיצון של C' עצמה בפתרון שגוי של הנגזרת.",
      },
      {
        id: "ac2c",
        mathText: "x=0",
        isCorrect: false,
        explanation: "מחוץ לתחום הרלוונטי / לא נקודת מינימום שולית.",
      },
      {
        id: "ac2d",
        mathText: "x=6",
        isCorrect: false,
        explanation: "חלוקה שגויה במקדם של C''.",
      },
    ],
  },
  {
    id: "acad-calc-3",
    domain: "אינטגרלים — החלפת משתנה",
    title: "שאלה 3: אינטגרל מסוים עם החלפה",
    context: "אקדמיה — חדו״א 1",
    instruction: "חשב את האינטגרל המסוים:",
    formulaLatex: "\\int_0^{\\pi/2} \\sin x\\,\\cos^2 x\\, dx = ?",
    options: [
      {
        id: "ac3a",
        mathText: "\\tfrac{1}{3}",
        isCorrect: true,
        explanation: "u=cos x, du=−sin x dx. מ-1 ל-0: ∫_0^1 u² du = 1/3.",
      },
      {
        id: "ac3b",
        mathText: "\\tfrac{1}{2}",
        isCorrect: false,
        explanation: "שגיאה בגבולות או בחזקת u.",
      },
      {
        id: "ac3c",
        mathText: "1",
        isCorrect: false,
        explanation: "אינטגרל של sin בלבד בלי cos².",
      },
      {
        id: "ac3d",
        mathText: "0",
        isCorrect: false,
        explanation: "הפונקציה אינה אי-זוגית על הקטע הנתון.",
      },
    ],
  },
];

const ACADEMIC_LINALG_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "acad-la-1",
    domain: "דטרמיננטה — מטריצה 3×3",
    title: "שאלה 1: דטרמיננטת 3×3",
    context: "אקדמיה — אלגברה לינארית",
    instruction: "מהי הדטרמיננטה של המטריצה?",
    formulaLatex:
      "A=\\begin{pmatrix}1&2&0\\\\0&1&3\\\\2&0&1\\end{pmatrix},\\quad\\det A=?",
    options: [
      {
        id: "la1a",
        mathText: "13",
        isCorrect: true,
        explanation: "פיתוח לפי שורה/עמודה: 1·(1−0)−2·(0−6)+0=1+12=13.",
      },
      {
        id: "la1b",
        mathText: "-13",
        isCorrect: false,
        explanation: "סימן הפוך בפיתוח.",
      },
      {
        id: "la1c",
        mathText: "0",
        isCorrect: false,
        explanation: "המטריצה הפיכה — הדטרמיננטה אינה אפס.",
      },
      {
        id: "la1d",
        mathText: "7",
        isCorrect: false,
        explanation: "שגיאה בחישוב מינורים.",
      },
    ],
  },
  {
    id: "acad-la-2",
    domain: "תלות לינארית — וקטורים ב-R³",
    title: "שאלה 2: תלות לינארית במרחב",
    context: "אקדמיה — אלגברה לינארית",
    instruction:
      "האם הווקטורים (1,2,0), (0,1,3), (2,0,1) בלתי-תלויים לינארית ב-R³?",
    formulaLatex: "\\{(1,2,0),\\,(0,1,3),\\,(2,0,1)\\}",
    options: [
      {
        id: "la2a",
        plainText: "כן — הדטרמיננטה ≠ 0",
        isCorrect: true,
        explanation: "det=13≠0 ⇒ בסיס ל-R³, בלתי-תלויים.",
      },
      {
        id: "la2b",
        plainText: "לא — תלויים כי יש אפס ברכיב",
        isCorrect: false,
        explanation: "אפס ברכיב אינו מרמז על תלות.",
      },
      {
        id: "la2c",
        plainText: "תלויים כי שלושה וקטורים ב-R³ תמיד תלויים",
        isCorrect: false,
        explanation: "שלושה וקטורים יכולים להיות בסיס.",
      },
      {
        id: "la2d",
        plainText: "בלתי-תלויים רק ב-R²",
        isCorrect: false,
        explanation: "הם ב-R³.",
      },
    ],
  },
  {
    id: "acad-la-3",
    domain: "מכפלה וקטורית — נורמל למישור",
    title: "שאלה 3: משוואת מישור מנורמל",
    context: "אקדמיה — אלגברה לינארית / גיאומטריה אנליטית",
    instruction:
      "מישור עובר ב-(1,0,0) עם נורמל n=(2,−1,1). מהי משוואת המישור?",
    formulaLatex: "\\vec{n}\\cdot\\bigl(\\vec{r}-(1,0,0)\\bigr)=0",
    options: [
      {
        id: "la3a",
        mathText: "2x - y + z = 2",
        isCorrect: true,
        explanation: "2(x−1)−y+z=0 ⇒ 2x−y+z=2.",
      },
      {
        id: "la3b",
        mathText: "2x - y + z = 0",
        isCorrect: false,
        explanation: "שכחת את ההצבה בנקודה על המישור.",
      },
      {
        id: "la3c",
        mathText: "x + 2y - z = 1",
        isCorrect: false,
        explanation: "ערבוב רכיבי הנורמל.",
      },
      {
        id: "la3d",
        mathText: "2x + y + z = 2",
        isCorrect: false,
        explanation: "סימן שגוי ברכיב y.",
      },
    ],
  },
];

const ACADEMIC_CS_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "acad-cs-1",
    domain: "סיבוכיות",
    title: "שאלה 1: סיבוכיות חיפוש בינארי",
    context: "אקדמיה — מבני נתונים / אלגוריתמים",
    instruction: "מהי סיבוכיות הזמן של חיפוש בינארי במערך ממוין?",
    formulaLatex: "T(n) = ?",
    options: [
      { id: "cs1a", mathText: "O(\\log n)", isCorrect: true, explanation: "חצייה חוזרת של המערך." },
      { id: "cs1b", mathText: "O(n)", isCorrect: false, explanation: "זו סיבוכיות חיפוש ליניארי." },
      { id: "cs1c", mathText: "O(n\\log n)", isCorrect: false, explanation: "אופייני למיון." },
      { id: "cs1d", mathText: "O(1)", isCorrect: false, explanation: "גישה ישירה באינדקס בלבד." },
    ],
  },
  {
    id: "acad-cs-2",
    domain: "מבני נתונים",
    title: "שאלה 2: מחסנית",
    context: "אקדמיה — מבני נתונים",
    instruction: "איזו מדיניות סדר מתארת מחסנית (Stack)?",
    formulaLatex: "\\text{Stack policy}",
    options: [
      { id: "cs2a", plainText: "LIFO", isCorrect: true, explanation: "Last In, First Out." },
      { id: "cs2b", plainText: "FIFO", isCorrect: false, explanation: "זו תור (Queue)." },
      { id: "cs2c", plainText: "Random", isCorrect: false, explanation: "לא." },
      { id: "cs2d", plainText: "Priority only", isCorrect: false, explanation: "זו תור עדיפויות." },
    ],
  },
  {
    id: "acad-cs-3",
    domain: "גרפים",
    title: "שאלה 3: BFS מול DFS",
    context: "אקדמיה — אלגוריתמים",
    instruction: "איזו סריקה מתאימה למציאת המסלול הקצר ביותר בגרף לא ממושקל?",
    formulaLatex: "\\text{unweighted shortest path}",
    options: [
      { id: "cs3a", plainText: "BFS", isCorrect: true, explanation: "BFS מוצא מסלול קצר ביותר בקשתות." },
      { id: "cs3b", plainText: "DFS בלבד", isCorrect: false, explanation: "DFS לא מבטיח קצר ביותר." },
      { id: "cs3c", plainText: "Bubble sort", isCorrect: false, explanation: "לא אלגוריתם גרפים." },
      { id: "cs3d", plainText: "Binary search", isCorrect: false, explanation: "לא על גרף כללי." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* MECHINA / PSYCHOMETRIC / SCREENING                                          */
/* -------------------------------------------------------------------------- */

const MECHINA_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "mech-1",
    domain: "אלגברה — מערכת עם ערך מוחלט ושורש",
    title: "שאלה 1: משוואה מקוננת (מכינה מתקדמת)",
    context: "מכינה קדם-אקדמית — מתמטיקה",
    instruction:
      "כמה פתרונות ממשיים יש ל-|√(2x+1) − 3| = 1 בתחום ההגדרה?",
    formulaLatex: "|\\sqrt{2x+1}-3|=1,\\quad x\\ge -\\tfrac12",
    options: [
      {
        id: "m1a",
        mathText: "2",
        isCorrect: true,
        explanation:
          "√(2x+1)=4 או 2 ⇒ 2x+1=16 או 4 ⇒ x=7.5 או 1.5. שני פתרונות בתחום.",
      },
      {
        id: "m1b",
        mathText: "1",
        isCorrect: false,
        explanation: "התעלמות מאחד משני ענפי הערך המוחלט.",
      },
      {
        id: "m1c",
        mathText: "0",
        isCorrect: false,
        explanation: "יש פתרונות ממשיים בתחום.",
      },
      {
        id: "m1d",
        mathText: "3",
        isCorrect: false,
        explanation: "הוספת פתרון זר מחוץ לתחום.",
      },
    ],
  },
  {
    id: "mech-2",
    domain: "כמותי — ממוצע משוקלל עם משתנה",
    title: "שאלה 2: ממוצע משוקלל דו-קבוצתי",
    context: "מכינה — סטטיסטיקה ואחוזים מתקדמים",
    instruction:
      "בקבוצה A יש 40 תלמידים בממוצע 72. בקבוצה B יש n תלמידים בממוצע 84. הממוצע המשותף 78. מהו n?",
    formulaLatex:
      "\\frac{40\\cdot 72 + n\\cdot 84}{40+n}=78 \\quad\\Rightarrow\\; n=?",
    options: [
      {
        id: "m2a",
        mathText: "40",
        isCorrect: true,
        explanation: "2880+84n=78(40+n) ⇒ 2880+84n=3120+78n ⇒ 6n=240 ⇒ n=40.",
      },
      {
        id: "m2b",
        mathText: "30",
        isCorrect: false,
        explanation: "ממוצע אריתמטי פשוט של הציונים בלי משקלים.",
      },
      {
        id: "m2c",
        mathText: "20",
        isCorrect: false,
        explanation: "שגיאה בפישוט המשוואה הליניארית.",
      },
      {
        id: "m2d",
        mathText: "60",
        isCorrect: false,
        explanation: "החלפת תפקידי הקבוצות בחישוב.",
      },
    ],
  },
  {
    id: "mech-3",
    domain: "גיאומטריה — חיתוך מישור עם גוף תלת-ממדי",
    title: "שאלה 3: חתך קובייה במישור",
    context: "מכינה — גיאומטריה במרחב",
    instruction:
      "קובייה של צלע 2. מישור עובר דרך אמצעי שלוש צלעות היוצאות מקודקוד משותף. מהו שטח החתך המשולש?",
    formulaLatex:
      "\\text{cube edge }=2,\\quad \\text{midpoints},\\quad S_{\\triangle}=\\tfrac{\\sqrt{3}}{4}\\cdot(\\sqrt{2})^2=?",
    options: [
      {
        id: "m3a",
        mathText: "\\tfrac{\\sqrt{3}}{2}",
        isCorrect: true,
        explanation:
          "משולש שווה-צלעות באורך √2. שטח=(√3/4)·2=√3/2.",
      },
      {
        id: "m3b",
        mathText: "\\sqrt{3}",
        isCorrect: false,
        explanation: "שימוש בצלע 2 במקום √2 בנוסחת השטח.",
      },
      {
        id: "m3c",
        mathText: "2",
        isCorrect: false,
        explanation: "שטח פאה של הקובייה, לא החתך.",
      },
      {
        id: "m3d",
        mathText: "2\\sqrt{2}",
        isCorrect: false,
        explanation: "אורך/היקף במקום שטח.",
      },
    ],
  },
];

const PSYCHOMETRIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "psych-1",
    domain: "כמותי — מהירות ומרחק עם יתרון התחלה",
    title: "שאלה 1: רדיפה דו-שלבית עם head-start",
    context: "פסיכומטרי NITE — חשיבה כמותית (מהירות)",
    instruction:
      "רץ A מתחיל 12 שניות לפני רץ B. A רץ במהירות קבועה 6 מ׳/ש׳, B במהירות 9 מ׳/ש׳. כמה זמן אחרי תחילת B עד שהוא מדביק את A?",
    formulaLatex:
      "\\Delta t_0=12,\\; v_A=6,\\; v_B=9,\\quad t=\\frac{v_A\\Delta t_0}{v_B-v_A}=?",
    options: [
      {
        id: "pq1a",
        mathText: "24\\,\\mathrm{s}",
        isCorrect: true,
        explanation:
          "ב-12 שניות A צבר 72 מ׳. מהירות יחסית 3 מ׳/ש׳ ⇒ t=72/3=24 שניות.",
      },
      {
        id: "pq1b",
        mathText: "12\\,\\mathrm{s}",
        isCorrect: false,
        explanation: "מלכודת: שימוש ביתרון הזמן במקום במרחק שנצבר.",
      },
      {
        id: "pq1c",
        mathText: "8\\,\\mathrm{s}",
        isCorrect: false,
        explanation: "חלוקה ב-v_B במקום בהפרש המהירויות.",
      },
      {
        id: "pq1d",
        mathText: "36\\,\\mathrm{s}",
        isCorrect: false,
        explanation: "חיבור המהירויות במקום חיסור.",
      },
    ],
  },
  {
    id: "psych-2",
    domain: "כמותי — אלגברה עם ערך מוחלט ושורשים",
    title: "שאלה 2: מערכת עם ערך מוחלט ושורש",
    context: "פסיכומטרי NITE — חשיבה כמותית (אלגברה)",
    instruction:
      "כמה פתרונות ממשיים יש למשוואה |√(x+3) − 2| = 1 בתחום ההגדרה?",
    formulaLatex: "|\\sqrt{x+3} - 2| = 1,\\quad x \\ge -3",
    options: [
      {
        id: "pq2a",
        mathText: "2",
        isCorrect: true,
        explanation:
          "√(x+3)−2 = ±1 → √(x+3)=3 או 1 → x+3=9 או 1 → x=6 או −2. שני פתרונות בתחום.",
      },
      {
        id: "pq2b",
        mathText: "1",
        isCorrect: false,
        explanation: "התעלמות מאחד משני ענפי הערך המוחלט.",
      },
      {
        id: "pq2c",
        mathText: "3",
        isCorrect: false,
        explanation: "הוספת פתרון זר מחוץ לתחום או ריבוע כפול מיותר.",
      },
      {
        id: "pq2d",
        mathText: "0",
        isCorrect: false,
        explanation: "יש פתרונות ממשיים בתחום.",
      },
    ],
  },
  {
    id: "psych-3",
    domain: "כמותי — גיאומטריה רב-משתנית",
    title: "שאלה 3: מלבן חסום במשולש",
    context: "פסיכומטרי NITE — חשיבה כמותית (גיאומטריה)",
    instruction:
      "משולש ישר-זווית עם ניצבים 6 ו-8. מלבן חסום כך ששתי צלעותיו על הניצבים וקודקוד נגדי על היתר. אם צלע המלבן על הניצב באורך 6 היא x, מהו שטח המלבן כפונקציה של x?",
    formulaLatex:
      "\\text{legs }6,8;\\quad S(x)=x\\cdot\\Bigl(8-\\frac{8}{6}x\\Bigr)=?",
    options: [
      {
        id: "pq3a",
        mathText: "S(x)=8x-\\tfrac{4}{3}x^2",
        isCorrect: true,
        explanation:
          "דמיון משולשים: הגובה הנותר = 8(1−x/6)=8−(8/6)x. שטח=x·(8−4x/3).",
      },
      {
        id: "pq3b",
        mathText: "S(x)=6x-\\tfrac{4}{3}x^2",
        isCorrect: false,
        explanation: "ערבוב בין אורכי הניצבים בנוסחת הדמיון.",
      },
      {
        id: "pq3c",
        mathText: "S(x)=48-x",
        isCorrect: false,
        explanation: "שטח המשולש פחות x — לא שטח המלבן החסום.",
      },
      {
        id: "pq3d",
        mathText: "S(x)=\\tfrac{1}{2}\\cdot 6\\cdot 8",
        isCorrect: false,
        explanation: "שטח המשולש כולו, לא המלבן.",
      },
    ],
  },
];

const SCREENING_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "screen-1",
    domain: "חשיבה כמותית — סדרות וממוצעים",
    title: "שאלה 1: ממוצע משוקלל בסדרה",
    context: "מיונים / דפ״ר — חשיבה כמותית",
    instruction:
      "ממוצע של 5 מספרים הוא 12. מוסיפים מספר שישי כך שהממוצע החדש הוא 14. מהו המספר שנוסף?",
    formulaLatex:
      "\\frac{5\\cdot 12 + x}{6}=14 \\quad\\Rightarrow\\; x=?",
    options: [
      {
        id: "s1a",
        mathText: "24",
        isCorrect: true,
        explanation: "60+x=84 ⇒ x=24.",
      },
      {
        id: "s1b",
        mathText: "14",
        isCorrect: false,
        explanation: "העתקת הממוצע החדש במקום הערך החסר.",
      },
      {
        id: "s1c",
        mathText: "2",
        isCorrect: false,
        explanation: "הפרש הממוצעים בלבד.",
      },
      {
        id: "s1d",
        mathText: "26",
        isCorrect: false,
        explanation: "שגיאה בפישוט: 6·14−5·12 עם חישוב שגוי.",
      },
    ],
  },
  {
    id: "screen-2",
    domain: "צורות ומרחב — חתך תלת-ממדי",
    title: "שאלה 2: חתך גליל במישור",
    context: "מיונים — חשיבה מרחבית",
    instruction:
      "גליל ישר נחתך במישור שאינו מקביל לבסיס ואינו מאונך לציר. מהי צורת החתך?",
    formulaLatex: "\\text{oblique plane }\\cap\\text{ cylinder}",
    options: [
      {
        id: "s2a",
        plainText: "אליפסה",
        isCorrect: true,
        explanation: "חתך אלכסוני של גליל מעגלי הוא אליפסה.",
      },
      {
        id: "s2b",
        plainText: "מעגל",
        isCorrect: false,
        explanation: "מעגל רק כאשר המישור מאונך לציר.",
      },
      {
        id: "s2c",
        plainText: "פרבולה",
        isCorrect: false,
        explanation: "פרבולה אופיינית לחרוט, לא לגליל סופי בחתך זה.",
      },
      {
        id: "s2d",
        plainText: "משולש",
        isCorrect: false,
        explanation: "לא צורת חתך של גליל מעגלי.",
      },
    ],
  },
  {
    id: "screen-3",
    domain: "מתמטיקה טכנית — אי-שוויון עם ערך מוחלט",
    title: "שאלה 3: אי-שוויון מקונן",
    context: "מיונים — מתמטיקה טכנית",
    instruction: "מהו פתרון האי-שוויון |2x−3| > 5?",
    formulaLatex: "|2x-3|>5",
    options: [
      {
        id: "s3a",
        mathText: "x<-1\\;\\text{ או }\\; x>4",
        isCorrect: true,
        explanation: "2x−3>5 או 2x−3<−5 ⇒ x>4 או x<−1.",
      },
      {
        id: "s3b",
        mathText: "-1<x<4",
        isCorrect: false,
        explanation: "זה פתרון |2x−3|<5, ההפך.",
      },
      {
        id: "s3c",
        mathText: "x>4",
        isCorrect: false,
        explanation: "רק ענף אחד של האי-שוויון.",
      },
      {
        id: "s3d",
        mathText: "x<-1",
        isCorrect: false,
        explanation: "רק הענף השני.",
      },
    ],
  },
];

/** Track-level defaults (parent category) — never hard-default everything to 582. */
const TRACK_DEFAULT_QUESTIONS: Record<DiagnosticTrackType, DiagnosticQuestion[]> = {
  BAGRUT: BAGRUT_581_QUESTIONS.length >= 3 ? BAGRUT_581_QUESTIONS : BAGRUT_4U_QUESTIONS,
  ACADEMIC: ACADEMIC_CALC_QUESTIONS,
  MECHINA: MECHINA_QUESTIONS,
  PSYCHOMETRIC: PSYCHOMETRIC_QUESTIONS,
  SCREENING_INST: SCREENING_QUESTIONS,
};

function normalizeExamCode(code: string | null | undefined): string {
  if (!code) return "";
  const c = code.trim().toUpperCase();
  // Strip leading zeros / ministry prefixes → short form (35582 → 582)
  if (c.includes("581") || c === "MATH_581") return "581";
  if (c.includes("582") || c === "MATH_582") return "582";
  if (c.includes("481")) return "481";
  if (c.includes("482")) return "482";
  if (c.startsWith("ALL_5")) return "ALL_5";
  if (c.startsWith("ALL_4")) return "ALL_4";
  if (c.startsWith("ALL_3")) return "ALL_3";
  if (c.includes("PHYS") || c.startsWith("036")) return "PHYSICS";
  if (c.includes("CS") || c.startsWith("899")) return "CS";
  return c;
}

function pickFirstNonEmpty(
  candidates: Array<DiagnosticQuestion[] | undefined>
): DiagnosticQuestion[] | null {
  for (const c of candidates) {
    if (c && c.length >= 3) return c.slice(0, 3);
    if (c && c.length > 0) return c;
  }
  return null;
}

function resolveAcademicByCourse(courseId: string | null | undefined): DiagnosticQuestion[] {
  const course = (courseId || "").toLowerCase();
  if (
    course.includes("אלגברה לינארית") ||
    course.includes("לינארית") ||
    course.includes("104166")
  ) {
    return ACADEMIC_LINALG_QUESTIONS;
  }
  if (
    course.includes("מבני נתונים") ||
    course.includes("אלגוריתמים") ||
    course.includes("מדעי המחשב") ||
    course.includes("234") ||
    course.includes("מערכות")
  ) {
    return ACADEMIC_CS_QUESTIONS;
  }
  if (
    course.includes("חדו") ||
    course.includes("אינפי") ||
    course.includes("10401") ||
    course.includes("חשבון דיפרנציאלי")
  ) {
    return ACADEMIC_CALC_QUESTIONS;
  }
  // Parent academic category fallback (calc suite — not 582 bagrut)
  return ACADEMIC_CALC_QUESTIONS;
}

function resolveBagrutQuestions(params: ChallengeQuestionParams): DiagnosticQuestion[] {
  const exam = normalizeExamCode(params.examCode);
  const subject = (params.subjectId || "").toLowerCase();

  // Exact exam paper / sub-topic depth
  if (exam === "582" || exam === "ALL_5") {
    return DIAGNOSTIC_3_DOMAIN_QUESTIONS;
  }
  if (exam === "581") {
    return pickFirstNonEmpty([BAGRUT_581_QUESTIONS, TRACK_DEFAULT_QUESTIONS.BAGRUT])!;
  }
  if (exam === "481" || exam === "482" || exam === "ALL_4" || exam === "ALL_3") {
    return BAGRUT_4U_QUESTIONS;
  }
  if (exam === "PHYSICS" || subject === "physics") {
    return BAGRUT_PHYSICS_QUESTIONS;
  }
  if (subject === "math" || subject === "") {
    // Parent math category — prefer 581 bank over forcing 582
    return pickFirstNonEmpty([
      BAGRUT_581_QUESTIONS,
      BAGRUT_4U_QUESTIONS,
      TRACK_DEFAULT_QUESTIONS.BAGRUT,
    ])!;
  }
  if (subject === "cs") {
    return ACADEMIC_CS_QUESTIONS;
  }
  // Other bagrut subjects → parent track default
  return TRACK_DEFAULT_QUESTIONS.BAGRUT;
}

/**
 * Resolve the 3-domain onboarding challenge suite for the selected track.
 * Fallback chain: exact sub-topic → parent category → track default.
 * Does NOT force 582 questions when another track/exam was selected.
 *
 * Returns the canonical bank (includes isCorrect / explanation).
 * Prefer {@link getSanitizedOnboardingChallengeQuestions} for any client-facing
 * payload; only server evaluation paths should use this full form.
 */
export function getOnboardingChallengeQuestions(
  params: ChallengeQuestionParams
): DiagnosticQuestion[] {
  const { trackType } = params;

  switch (trackType) {
    case "BAGRUT":
      return resolveBagrutQuestions(params);
    case "ACADEMIC":
      return resolveAcademicByCourse(params.courseId);
    case "MECHINA": {
      const subj = (params.mechinaSubject || "").toLowerCase();
      if (subj.includes("פיזיק")) return BAGRUT_PHYSICS_QUESTIONS;
      return pickFirstNonEmpty([MECHINA_QUESTIONS, TRACK_DEFAULT_QUESTIONS.MECHINA])!;
    }
    case "PSYCHOMETRIC":
      return PSYCHOMETRIC_QUESTIONS;
    case "SCREENING_INST":
      return SCREENING_QUESTIONS;
    default:
      return TRACK_DEFAULT_QUESTIONS.BAGRUT;
  }
}

/* -------------------------------------------------------------------------- */
/* Client-safe sanitization & server-authoritative evaluation                  */
/* -------------------------------------------------------------------------- */

/** Option shape safe to ship to the browser — no answer key or solutions. */
export type SanitizedChallengeOption = {
  id: string;
  mathText?: string;
  plainText?: string;
};

/** Question shape safe to ship to the browser — no isCorrect / explanation. */
export type SanitizedChallengeQuestion = {
  id: string;
  domain: string;
  title: string;
  context: string;
  instruction: string;
  formulaLatex: string;
  options: SanitizedChallengeOption[];
};

/** Client → server answer submission (never includes correctness flags). */
export type ChallengeAnswerSubmission = {
  questionId: string;
  selectedOptionId: string;
};

/**
 * Stable course / bank selector the client echoes back so the server can
 * re-resolve the same canonical suite without trusting answer keys.
 * Alias of {@link ChallengeQuestionParams} for the teaser submit contract.
 */
export type ChallengeCourseKey = ChallengeQuestionParams;

export type ChallengeEvaluationResult = {
  correctCount: number;
  totalQuestions: number;
  weakDomains: string[];
  /** Single teaser explanation only — never a full solution set. */
  sampleExplanation: string | null;
  answerSummaries: string[];
};

export function sanitizeChallengeOption(
  option: DiagnosticOption
): SanitizedChallengeOption {
  const sanitized: SanitizedChallengeOption = { id: option.id };
  if (option.mathText !== undefined) sanitized.mathText = option.mathText;
  if (option.plainText !== undefined) sanitized.plainText = option.plainText;
  return sanitized;
}

export function sanitizeChallengeQuestion(
  question: DiagnosticQuestion
): SanitizedChallengeQuestion {
  return {
    id: question.id,
    domain: question.domain,
    title: question.title,
    context: question.context,
    instruction: question.instruction,
    formulaLatex: question.formulaLatex,
    options: question.options.map(sanitizeChallengeOption),
  };
}

export function sanitizeChallengeQuestions(
  questions: DiagnosticQuestion[]
): SanitizedChallengeQuestion[] {
  return questions.map(sanitizeChallengeQuestion);
}

/**
 * Client-facing onboarding suite: same bank resolution as canonical,
 * with isCorrect / explanation stripped before any browser use.
 */
export function getSanitizedOnboardingChallengeQuestions(
  params: ChallengeQuestionParams
): SanitizedChallengeQuestion[] {
  return sanitizeChallengeQuestions(getOnboardingChallengeQuestions(params));
}

/**
 * Resolve academic course label → bank the same way as onboarding selection.
 * Kept as an explicit export for server teaser evaluation call sites.
 */
export function resolveAcademicCourseKey(
  courseId: string | null | undefined
): DiagnosticQuestion[] {
  return resolveAcademicByCourse(courseId);
}

/**
 * Score challenge answers against the canonical server bank.
 * Validates each selectedOptionId; ignores any client-supplied correctness.
 */
export function evaluateChallengeAnswers(
  questions: DiagnosticQuestion[],
  answers: ChallengeAnswerSubmission[]
): ChallengeEvaluationResult {
  const answerByQuestionId = new Map<string, string>();
  for (const answer of answers) {
    if (
      typeof answer?.questionId === "string" &&
      typeof answer?.selectedOptionId === "string" &&
      answer.questionId.length > 0 &&
      answer.selectedOptionId.length > 0
    ) {
      answerByQuestionId.set(answer.questionId, answer.selectedOptionId);
    }
  }

  let correctCount = 0;
  const weakDomains: string[] = [];
  const answerSummaries: string[] = [];
  let sampleExplanation: string | null = null;
  let fallbackExplanation: string | null = null;

  for (const question of questions) {
    const selectedOptionId = answerByQuestionId.get(question.id);
    const selectedOption = selectedOptionId
      ? question.options.find((opt) => opt.id === selectedOptionId)
      : undefined;

    if (selectedOption?.isCorrect) {
      correctCount++;
      if (!fallbackExplanation) {
        fallbackExplanation = selectedOption.explanation;
      }
    } else {
      weakDomains.push(question.domain);
      if (!sampleExplanation && selectedOption?.explanation) {
        // Prefer a missed-question explanation as the single teaser sample.
        sampleExplanation = selectedOption.explanation;
      }
    }

    const label =
      selectedOption?.mathText ||
      selectedOption?.plainText ||
      (selectedOptionId ? selectedOptionId : "לא נענה");
    answerSummaries.push(`${question.domain}: ${label}`);
  }

  return {
    correctCount,
    totalQuestions: questions.length,
    weakDomains,
    sampleExplanation: sampleExplanation ?? fallbackExplanation,
    answerSummaries,
  };
}

/**
 * Parse and validate the courseKey payload from the teaser POST body.
 */
export function parseChallengeCourseKey(raw: unknown): ChallengeCourseKey | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const trackType = obj.trackType;
  const validTracks: DiagnosticTrackType[] = [
    "BAGRUT",
    "ACADEMIC",
    "MECHINA",
    "PSYCHOMETRIC",
    "SCREENING_INST",
  ];
  if (typeof trackType !== "string" || !validTracks.includes(trackType as DiagnosticTrackType)) {
    return null;
  }

  const asOptionalString = (value: unknown): string | null =>
    typeof value === "string" ? value : value == null ? null : null;

  return {
    trackType: trackType as DiagnosticTrackType,
    examCode: asOptionalString(obj.examCode),
    subjectId: asOptionalString(obj.subjectId),
    courseId: asOptionalString(obj.courseId),
    mechinaSubject: asOptionalString(obj.mechinaSubject),
    screeningBattery: asOptionalString(obj.screeningBattery),
  };
}

/**
 * Parse answer submissions from the teaser POST body.
 */
export function parseChallengeAnswerSubmissions(
  raw: unknown
): ChallengeAnswerSubmission[] {
  if (!Array.isArray(raw)) return [];
  const parsed: ChallengeAnswerSubmission[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    if (typeof row.questionId !== "string" || typeof row.selectedOptionId !== "string") {
      continue;
    }
    if (!row.questionId || !row.selectedOptionId) continue;
    parsed.push({
      questionId: row.questionId,
      selectedOptionId: row.selectedOptionId,
    });
  }
  return parsed;
}
