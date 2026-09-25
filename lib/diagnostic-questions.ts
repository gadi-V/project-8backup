import type { DiagnosticTrackType } from "./diagnostic-taxonomy";
import {
  BAGRUT_CS_1_QUESTIONS,
  BAGRUT_CS_2_QUESTIONS,
} from "./bagrut-cs-questions";
import {
  BAGRUT_ENGLISH_QUESTIONS,
  ENGLISH_WRITING_PROMPTS,
  type EnglishWritingPrompt,
} from "./bagrut-english-questions";
import { BAGRUT_CHEMISTRY_QUESTIONS } from "./bagrut-chemistry-questions";
import { BAGRUT_BIOLOGY_QUESTIONS } from "./bagrut-biology-questions";
import { BAGRUT_BIBLE_QUESTIONS } from "./bagrut-bible-questions";
import { BAGRUT_LITERATURE_QUESTIONS } from "./bagrut-literature-questions";
import {
  BAGRUT_HEBREW_1_QUESTIONS,
  BAGRUT_HEBREW_2_QUESTIONS,
  BAGRUT_HEBREW_QUESTIONS,
} from "./bagrut-hebrew-questions";
import type { AcademicCourseKey } from "./academic-questions";
import { ACADEMIC_COURSE_DISPATCH } from "./academic-questions";

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
  formulaLatex?: string;
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
  // ================= פרק ראשון: גאומטריה אנליטית ווקטורים =================
  {
    id: "b582-geo-tangent-circle",
    domain: "GEOMETRY_VECTORS",
    title: "שאלון שני - גאומטריה אנליטית",
    context:
      "נתונים הישרים המקבילים I ו-II. מרכזו של מעגל נמצא על ישר II, והמעגל משיק לישר I ולציר ה-x.",
    instruction: "מהם רדיוס המעגל ושיעורי מרכזו האפשריים?",
    formulaLatex: "I: -4x+3y+2=0, \\quad II: -4x+3y+27=0",
    options: [
      {
        id: "1",
        plainText: "R=5, והמרכזים האפשריים הם (10.5, 5) ו-(3, -5)",
        isCorrect: true,
        explanation:
          "המרחק בין הישרים המקבילים הוא 25 חלקי 5 שווה 5, ולכן הרדיוס הוא 5. השקה לציר ה-x מחייבת שיעור y של המרכז בערך מוחלט 5. הצבה בישר II נותנת x=10.5 (עבור y=5) ו-x=3 (עבור y=-5).",
      },
      {
        id: "2",
        plainText: "R=5, והמרכזים האפשריים הם (10.5, -5) ו-(3, 5)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "R=2.5, והמרכזים האפשריים הם (5.25, 2.5) ו-(1.5, -2.5)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "R=sqrt(5), והמרכזים האפשריים הם (6, sqrt(5)) ו-(0, -sqrt(5))",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b582-geo-parabola-circle",
    domain: "GEOMETRY_VECTORS",
    title: "שאלון שני - פרבולה ומעגל",
    context:
      "נתונה פרבולה. בנקודה A הנמצאת עליה ברביע הראשון מעבירים משיק בעל שיפוע 3/4. משיק זה משיק גם למעגל שמרכזו M בנקודה A. ציר ה-y משיק למעגל זה, ושיעור ה-x של M קטן משיעור ה-x של A.",
    instruction: "מהם שיעורי המרכז M ורדיוס המעגל R?",
    formulaLatex: "y^2 = 54x, \\quad m = \\frac{3}{4}",
    options: [
      {
        id: "1",
        plainText: "M(24, 36), R=24",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "M(15, 48), R=15",
        isCorrect: true,
        explanation:
          "שיפוע משיק לפרבולה הוא p חלקי y_A, ומכאן y_A=36 ו-x_A=24. משוואת הנורמל ודרישת המרחק AM=x_M (השקה לציר ה-y) מניבים x_M=15, y_M=48 ורדיוס 15.",
      },
      {
        id: "3",
        plainText: "M(12, 52), R=12",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "M(15, 36), R=18",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b582-vec-box-linear-comb",
    domain: "GEOMETRY_VECTORS",
    title: "שאלון שני - וקטורים במרחב",
    context:
      "בתיבה ABCDA'B'C'D' נסמן u=AD, v=AB, w=AA'. הנקודה E היא אמצע המקצוע BB'. נתונה נקודה M המקיימת את המשוואה להלן, וכן מתקיים כי הווקטור EM הוא צירוף לינארי של EA ו-EC.",
    instruction:
      "מהם ערכי המקדמים a ו-b, והאם הנקודה M נמצאת במישור המשולש AEC?",
    formulaLatex:
      "\\vec{BM} = \\frac{1}{6}\\underline{u} - \\frac{2}{3}\\underline{v} + \\frac{1}{12}\\underline{w}, \\quad \\vec{EM} = a\\vec{EA} + b\\vec{EC}",
    options: [
      {
        id: "1",
        plainText: "a = 1/3, b = 1/6, והנקודה M אינה נמצאת במישור",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "a = -2/3, b = -1/6, והנקודה M נמצאת במישור",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "a = 2/3, b = 1/6, והנקודה M נמצאת במישור המשולש AEC",
        isCorrect: true,
        explanation:
          "ביטוי הווקטורים לפי בסיס התיבה והשוואת מקדמים נותנת ישירות a=2/3 ו-b=1/6. כיוון שקיים צירוף לינארי של שני וקטורי המישור, הנקודה M בהכרח מוכלת במישור.",
      },
      {
        id: "4",
        plainText: "a = 2/3, b = 1/3, והנקודה M אינה נמצאת במישור",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b582-vec-pyramid-ratio",
    domain: "GEOMETRY_VECTORS",
    title: "שאלון שני - פירמידה ישרה",
    context:
      "בפירמידה ישרה SABCD שבסיסה ריבוע, המקצוע AS הוא גובה הפירמידה ואורכו שווה לצלע הבסיס (|u|=|v|=|w|). הנקודה E על SD מקיימת SE=3/4 SD, והנקודה N מקיימת SN=k SC.",
    instruction: "נתון אורך הווקטור EN. מהו הערך של הפרמטר k?",
    formulaLatex: "|\\vec{EN}| = \\frac{\\sqrt{6}}{4}|\\underline{w}|",
    options: [
      {
        id: "1",
        plainText: "k = 1/2",
        mathText: "k = \\frac{1}{2}",
        isCorrect: true,
        explanation:
          "מבטאים את EN כהפרש וקטורים ומחשבים את גודלו בריבוע בעזרת מכפלה סקלרית (הווקטורים מאונכים). השוואה לאורך הנתון מובילה למשוואה (k - 1/2)^2 = 0, שממנה נובע k = 1/2.",
      },
      {
        id: "2",
        plainText: "k = 3/4",
        mathText: "k = \\frac{3}{4}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "k = 1/3",
        mathText: "k = \\frac{1}{3}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "k = sqrt(2)/2",
        mathText: "k = \\frac{\\sqrt{2}}{2}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק שני: מספרים מרוכבים =================
  {
    id: "b582-cplx-collinear-origin",
    domain: "COMPLEX_NUMBERS",
    title: "שאלון שני - ישר במישור גאוס",
    context:
      "נתונים המספרים המרוכבים w1 ו-w2. ידוע כי הנקודות המייצגות אותם נמצאות על ישר אחד העובר דרך ראשית הצירים.",
    instruction: "מהם שני הערכים האפשריים של הזווית בתחום הנתון?",
    formulaLatex:
      "w_1 = r\\operatorname{cis}\\alpha, \\quad w_2 = 2r\\operatorname{cis}(4\\alpha), \\quad 50^\\circ < \\alpha < 130^\\circ",
    options: [
      {
        id: "1",
        plainText: "alpha = 60° או alpha = 90°",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "alpha = 75° או alpha = 105°",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "alpha = 90° או alpha = 120°",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "alpha = 60° או alpha = 120°",
        isCorrect: true,
        explanation:
          "הימצאות על ישר דרך הראשית מחייבת 4alpha = alpha + 180°k, כלומר 3alpha = 180°k, ומכאן alpha = 60°k. בתחום בין 50° ל-130° הזוויות המתאימות הן 60° ו-120°.",
      },
    ],
  },
  {
    id: "b582-cplx-conjugate-equation",
    domain: "COMPLEX_NUMBERS",
    title: "שאלון שני - משוואת צמוד והופכי",
    context:
      "נתון מספר מרוכב u המקיים |u| > 1, והנקודה המייצגת אותו נמצאת ברביע הראשון במישור גאוס.",
    instruction: "מהו המספר המרוכב u המקיים את המשוואה הבאה?",
    formulaLatex:
      "\\overline{u} + \\frac{1}{u} = 5.2(\\cos 285^\\circ + i\\sin 285^\\circ)",
    options: [
      {
        id: "1",
        plainText: "u = 5.2 cis(75°)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "u = 5 cis(75°)",
        mathText: "u = 5(\\cos 75^\\circ + i\\sin 75^\\circ)",
        isCorrect: true,
        explanation:
          "בהצגה קוטבית u=R cis(θ), מתקבל (R + 1/R) cis(-θ). לכן הזווית היא מינוס 285 מעלות השקולה ל-75 מעלות. המשוואה R + 1/R = 5.2 מניבה R=5 (הפתרון 0.2 נפסל כי נתון |u|>1).",
      },
      {
        id: "3",
        plainText: "u = 5 cis(285°)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "u = 0.2 cis(75°)",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b582-cplx-product-quotient",
    domain: "COMPLEX_NUMBERS",
    title: "שאלון שני - פעולות במרוכבים",
    context:
      "נתונים המספרים המרוכבים z1 ו-z2 ברביע הראשון. נגדיר w = z1*z2 + z1/z2. הנקודה המייצגת את w היא (-1, -1).",
    instruction: "מהם ערכי הזווית והרדיוס של z1?",
    formulaLatex:
      "z_1 = r\\operatorname{cis}\\alpha, \\quad z_2 = \\frac{1}{r}\\operatorname{cis}(\\alpha+90^\\circ), \\quad w = -1 - i",
    options: [
      {
        id: "1",
        plainText: "alpha = 45°, r = 1",
        mathText: "\\alpha = 45^\\circ, \\quad r = 1",
        isCorrect: true,
        explanation:
          "מכפלת המספרים נותנת cis(2alpha+90°) = -sin(2alpha) + i cos(2alpha), ומנת המספרים נותנת -r^2 i. השוואת החלק הממשי ל- (-1) נותנת sin(2alpha)=1 ולכן alpha=45°. השוואת החלק המדומה מניבה r=1.",
      },
      {
        id: "2",
        plainText: "alpha = 45°, r = sqrt(2)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "alpha = 30°, r = 1",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "alpha = 60°, r = 1",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b582-cplx-roots-geometry",
    domain: "COMPLEX_NUMBERS",
    title: "שאלון שני - שורשי יחידה ומרובע",
    context:
      "נתונה המשוואה הבאה במישור גאוס, כאשר z1 = cis(45°) ו-w = -1 - i.",
    instruction: "מהם ארבעת פתרונות המשוואה?",
    formulaLatex: "z^4 = 128(z_1 w)^2",
    options: [
      {
        id: "1",
        plainText: "zk = 4 cis(90°k)",
        mathText: "z_k = 4\\operatorname{cis}(90^\\circ k)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "zk = 2*sqrt(2) cis(45° + 90°k)",
        mathText: "z_k = 2\\sqrt{2}\\operatorname{cis}(45^\\circ + 90^\\circ k)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "zk = 4 cis(45° + 90°k)",
        mathText: "z_k = 4\\operatorname{cis}(45^\\circ + 90^\\circ k)",
        isCorrect: true,
        explanation:
          "המכפלה z1*w שווה sqrt(2) cis(270°). העלאה בריבוע נותנת מינוס 2, וכפל ב-128 נותן מינוס 256. הוצאת שורש רביעי מ-256 cis(180°) נותנת רדיוס 4 וזוויות של 45° + 90°k.",
      },
      {
        id: "4",
        plainText: "zk = 16 cis(45° + 90°k)",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק שלישי: חדו״א מעריכית ולוגריתמית =================
  {
    id: "b582-calc-ln-slope-intersect",
    domain: "CALCULUS",
    title: "שאלון שני - חדו״א לוגריתמית",
    context:
      "נתונה הפונקציה המוגדרת עבור x>0, כאשר n טבעי. נתון כי שיפוע המשיק לגרף הפונקציה בנקודה x=1 הוא 2.",
    instruction:
      "מהו הערך של הפרמטר n, ומהי נקודת החיתוך של גרף הפונקציה עם ציר ה-x?",
    formulaLatex: "f(x) = x^n(3 - \\ln x), \\quad f'(1) = 2",
    options: [
      {
        id: "1",
        plainText: "n = 2, ונקודת החיתוך היא (e^3, 0)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "n = 1, ונקודת החיתוך היא (e^3, 0)",
        mathText: "n = 1, \\quad (e^3, 0)",
        isCorrect: true,
        explanation:
          "גזירה לפי מכפלה והצבת x=1 נותנת f'(1) = 3n - 1 = 2, ומכאן n=1. איפוס הפונקציה נותן 3 - ln(x) = 0, כלומר x = e^3.",
      },
      {
        id: "3",
        plainText: "n = 1, ונקודת החיתוך היא (3, 0)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "n = 3, ונקודת החיתוך היא (e, 0)",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b582-calc-integral-substitution",
    domain: "CALCULUS",
    title: "שאלון שני - אינטגרל לוגריתמי",
    context:
      "נתונה הפונקציה g(x) בתחום x בין 1 ל-e^3. השטח המוגבל על ידי הפונקציה, ציר ה-x והישרים x=e ו-x=e^a (כאשר 1 < a < 3) שווה ל-ln(4).",
    instruction: "מהו הערך של הפרמטר a?",
    formulaLatex:
      "g(x) = \\frac{1}{x(3-\\ln x)}, \\quad \\int_e^{e^a} g(x)\\,dx = \\ln 4",
    options: [
      {
        id: "1",
        plainText: "a = 2.5",
        mathText: "a = 2.5",
        isCorrect: true,
        explanation:
          "הנגזרת הפנימית של המכנה מופיעה במונה (1/x). האינטגרל שווה ל- [-ln(3 - ln x)]. הצבת הגבולות נותנת ln(2 / (3-a)) = ln(4), ומכאן 2 / (3-a) = 4 המוביל ל- a = 2.5.",
      },
      {
        id: "2",
        plainText: "a = 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "a = 1.5",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "a = 3 - 1/e^4",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b582-calc-exp-monotonicity",
    domain: "CALCULUS",
    title: "שאלון שני - חקירת פונקציה מעריכית",
    context: "נתונה הפונקציה הבאה המוגדרת בתחומה המרבי.",
    instruction:
      "מהם תחום ההגדרה, משוואת המשיק המקביל לציר ה-x, ותחומי העלייה והירידה של הפונקציה?",
    formulaLatex: "f(x) = 4e^x - x + 9\\ln(4 - e^x)",
    options: [
      {
        id: "1",
        plainText:
          "התחום x < ln 4; המשיק y=0; הפונקציה עולה עבור x<0 ויורדת עבור 0 < x < ln 4",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "התחום x > 0; המשיק y = 4 + 9 ln 3; הפונקציה עולה תמיד",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "התחום כל x; המשיק y=4; הפונקציה יורדת עבור x>0 ועולה עבור x<0",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "התחום x < ln 4; המשיק y = 4 + 9 ln 3; הפונקציה יורדת בכל תחום הגדרתה",
        mathText: "x < \\ln 4, \\quad y = 4 + 9\\ln 3",
        isCorrect: true,
        explanation:
          "תחום ההגדרה דורש 4 - e^x > 0 כלומר x < ln(4). הנגזרת היא -4(e^x - 1)^2 חלקי (4 - e^x), שהיא שלילית תמיד ומתאפסת רק ב-x=0 (פיתול). לכן הפונקציה יורדת בכל התחום והמשיק האופקי הוא y = f(0) = 4 + 9 ln(3).",
      },
    ],
  },
  {
    id: "b582-calc-rational-exp-asymptote",
    domain: "CALCULUS",
    title: "שאלון שני - אסימפטוטות אופקיות",
    context:
      "נתונה הפונקציה הבאה עם פרמטר a. נתון כי הישר y=2 הוא אסימפטוטה אופקית של הפונקציה.",
    instruction: "מהם שני הערכים האפשריים של הפרמטר a?",
    formulaLatex:
      "f(x) = \\frac{1}{e^x-1} + \\frac{5}{e^x-5} + a, \\quad y = 2",
    options: [
      {
        id: "1",
        plainText: "a = 2 או a = 0",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "a = -2 או a = 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "a = 2 או a = 4",
        mathText: "a = 2 \\;\\text{או}\\; a = 4",
        isCorrect: true,
        explanation:
          'כאשר x שואף לאינסוף, שני השברים שואפים ל-0 והגבול הוא a, לכן a=2. כאשר x שואף למינוס אינסוף, e^x שואף ל-0 והשברים שואפים למינוס 1 ומינוס 1 (סה"כ a - 2). השוואה ל-2 מניבה a=4.',
      },
      {
        id: "4",
        plainText: "a = 1 או a = 5",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* BAGRUT — 581 (sequences / motion / probability / calculus)                  */
/* -------------------------------------------------------------------------- */

export const BAGRUT_581_QUESTIONS: DiagnosticQuestion[] = [
  // ================= פרק ראשון: סדרות ואינדוקציה =================
  {
    id: "b581-seq-identity-sum",
    domain: "SEQUENCES",
    title: "שאלון ראשון - סכום סדרה",
    context: "נתונה הזהות המתקיימת לכל $n$ טבעי:",
    instruction: "מהו ערכו של הסכום המבוקש מ-$k=11$ ועד $k=20$?",
    formulaLatex:
      "\\sum_{k=1}^n \\frac{k^2}{(2k-1)(2k+1)} = \\frac{n(n+1)}{2(2n+1)}, \\quad \\sum_{k=11}^{20} \\frac{k^2}{(2k-1)(2k+1)} = ?",
    options: [
      {
        id: "1",
        plainText: "210 / 41",
        mathText: "\\frac{210}{41}",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב S(20) בלבד ללא החסרת S(10).",
      },
      {
        id: "2",
        plainText: "2155 / 861",
        mathText: "\\frac{2155}{861}",
        isCorrect: true,
        explanation:
          "הסכום שווה ל-S(20) - S(10). חישוב ישיר לפי הנוסחה: (20*21)/(2*41) פחות (10*11)/(2*21) = 210/41 - 55/21 = (4410 - 2255) / 861 = 2155 / 861.",
      },
      {
        id: "3",
        plainText: "55 / 21",
        mathText: "\\frac{55}{21}",
        isCorrect: false,
        explanation: "מסיח הנובע מחישוב S(10) בלבד.",
      },
      {
        id: "4",
        plainText: "4410 / 861",
        mathText: "\\frac{4410}{861}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "math5-1-geom-sequences-product",
    domain: "SEQUENCES",
    title: "שאלון ראשון - מכפלת סדרות הנדסיות",
    context:
      "נתונות שתי סדרות הנדסיות אינסופיות עולות: $a_n$ שמנתה $q$, ו-$b_n$ שמנתה $2q$. נתונה הסדרה $c_n = a_n \\cdot b_n$, ונתון כי $a_1 = b_1$.",
    instruction: "מהם ערכי המנה $q$ והאיבר הראשון $a_1$ בהינתן הנתונים הבאים?",
    formulaLatex: "c_2 = \\frac{1}{8} (a_1)^2, \\qquad S_1 + S_2 + S_3 = 434",
    options: [
      {
        id: "1",
        plainText: "q = 1/4, a_1 = 14",
        mathText: "q = \\frac{1}{4}, \\quad a_1 = 14",
        isCorrect: true,
        explanation:
          "האיבר השני של הסדרה c_n הוא c_2 = a_2 * b_2 = (a_1 * q) * (b_1 * 2q) = 2(a_1)^2 * q^2. מהמשוואה 2(a_1)^2 * q^2 = 1/8 (a_1)^2 נובע ש-q^2 = 1/16, ומאחר שמדובר בסדרה עולה מתקבל q = 1/4. הצבת המנות בסכומי הסדרות האינסופיות המתכנסות ופתרון המשוואה עבור S_1 + S_2 + S_3 = 434 מניבים a_1 = 14.",
      },
      {
        id: "2",
        plainText: "q = 1/2, a_1 = 7",
        mathText: "q = \\frac{1}{2}, \\quad a_1 = 7",
        isCorrect: false,
        explanation:
          "מסיח הנובע מאי-הכפלת מנת הסדרה b_n במקדם 2q, מה שמוביל לטעות בחישוב המנה q.",
      },
      {
        id: "3",
        plainText: "q = 1/4, a_1 = 28",
        mathText: "q = \\frac{1}{4}, \\quad a_1 = 28",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב מוטעה של סכום הסדרה השלישית c_n ללא העלאת המנה בריבוע.",
      },
      {
        id: "4",
        plainText: "q = 1/8, a_1 = 21",
        mathText: "q = \\frac{1}{8}, \\quad a_1 = 21",
        isCorrect: false,
        explanation:
          "מסיח הנובע מהוצאת שורש שגויה מתוך המשוואה של c_2.",
      },
    ],
  },
  {
    id: "b581-seq-geom-triangle-golden",
    domain: "SEQUENCES",
    title: "שאלון ראשון - סדרה הנדסית במשולש ישר זווית",
    context:
      "אורכי שלוש צלעותיו של משולש ישר-זווית מהווים שלושה איברים עוקבים בסדרה הנדסית עולה שמנתה $q$.",
    instruction: "מהו ערכה המדויק של מנת הסדרה $q$?",
    options: [
      {
        id: "1",
        plainText: "q = (1 + sqrt(5)) / 2",
        mathText: "q = \\frac{1+\\sqrt{5}}{2}",
        isCorrect: false,
        explanation: "מסיח (זהו יחס הזהב בריבוע, q^2 ולא q).",
      },
      {
        id: "2",
        plainText: "q = sqrt(2)",
        mathText: "q = \\sqrt{2}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "q = sqrt((sqrt(5) - 1) / 2)",
        mathText: "q = \\sqrt{\\frac{\\sqrt{5}-1}{2}}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "q = sqrt((1 + sqrt(5)) / 2)",
        mathText: "q = \\sqrt{\\frac{1+\\sqrt{5}}{2}}",
        isCorrect: true,
        explanation:
          "צלעות המשולש הן a, aq, aq^2 (כאשר aq^2 הוא היתר). ממשפט פיתגורס: a^2 + a^2 q^2 = a^2 q^4, כלומר q^4 - q^2 - 1 = 0. השורש החיובי של המשוואה הריבועית הוא q^2 = (1 + sqrt(5))/2, ולכן q הוא השורש הריבועי של ערך זה.",
      },
    ],
  },

  // ================= פרק שני: בעיות תנועה =================
  {
    id: "b581-motion-abc-pedestrian-bike",
    domain: "WORD_PROBLEMS",
    title: "שאלון ראשון - בעיית תנועה",
    context:
      "היישובים A, B, C נמצאים על ישר אחד, כך ש-B באמצע הדרך בין A ל-C. הולך רגל יצא מ-B ל-A, ובו-זמנית יצא רוכב אופניים מ-B ל-C, הגיע ל-C וחזר מיד ל-B. כאשר הגיע הרוכב חזרה ל-B, עבר הולך הרגל בדיוק 2/3 מהמרחק שבין B ל-A.",
    instruction: "פי כמה גדולה מהירות הרוכב ממהירות הולך הרגל?",
    options: [
      {
        id: "1",
        plainText: "פי 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "פי 3",
        isCorrect: true,
        explanation:
          "בזמן שהרוכב עבר מרחק של פעמיים BC (הלוך וחזור, כלומר 2d), הולך הרגל עבר מרחק של 2/3 d. יחס המהירויות באותו פרק זמן שווה ליחס המרחקים: 2d חלקי (2/3 d) שווה 3.",
      },
      {
        id: "3",
        plainText: "פי 1.5",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "פי 4/3",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b581-motion-cars-headstart",
    domain: "WORD_PROBLEMS",
    title: "שאלון ראשון - שתי מכוניות",
    context:
      "מכונית א' יצאה מעיר $A$ לעיר $B$ במהירות $v$ בשעה 8:00. מכונית ב' יצאה באותו מסלול בשעה 8:27 במהירות $mv$ (כאשר $m > 1$). שתיהן הגיעו לעיר $B$ באותו הזמן בדיוק.",
    instruction: "איזה ביטוי מייצג את המרחק הכולל בין שתי הערים?",
    options: [
      {
        id: "1",
        plainText: "0.45mv / (m - 1)",
        mathText: "\\frac{0.45mv}{m-1}",
        isCorrect: true,
        explanation:
          "27 דקות הן 0.45 שעה. נסמן ב-T את זמן נסיעת מכונית א'. השוואת מרחקים: vT = mv(T - 0.45), ומכאן T = 0.45m / (m - 1). המרחק הוא מהירות א' כפול זמנה: S = vT = 0.45mv / (m - 1).",
      },
      {
        id: "2",
        plainText: "0.55mv / (m - 1)",
        mathText: "\\frac{0.55mv}{m-1}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "1.45mv / (m + 1)",
        mathText: "\\frac{1.45mv}{m+1}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "0.27mv / (m - 1)",
        mathText: "\\frac{0.27mv}{m-1}",
        isCorrect: false,
        explanation:
          "מסיח הנובע משימוש ישיר ב-27 דקות במקום המרה לשעות.",
      },
    ],
  },
  {
    id: "b581-motion-cars-opposite-directions",
    domain: "WORD_PROBLEMS",
    title: "שאלון ראשון - תנועה בכיוונים מנוגדים",
    context:
      'מכונית א\' יצאה מ-B ל-A, ומכונית ב\' מ-A ל-B במהירויות v ו-mv. לאחר 45 דקות נסיעה היה המרחק ביניהן 36 ק"מ, והן נפגשו כעבור שעה בדיוק מרגע יציאתן.',
    instruction: "מהם הערך של $m$ והמרחק הכולל $S$ בין $A$ ל-$B$?",
    options: [
      {
        id: "1",
        plainText: 'm = 1.5, S = 120 ק"מ',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: 'm = 1.25, S = 108 ק"מ',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: 'm = 1.25, S = 144 ק"מ',
        mathText: "m = 1.25, \\quad S = 144\\text{ km}",
        isCorrect: true,
        explanation:
          "בשלושת-רבעי שעה עברו יחד S - 36 ק\"מ, ובשעה שלמה עברו את כל S. לכן 0.75S = S - 36, מה שנותן 0.25S = 36 ומכאן S = 144 ק\"מ. בשילוב עם תנאי יציאת המכוניות בפיגור של 27 דקות מתקבל m = 1.25.",
      },
      {
        id: "4",
        plainText: 'm = 1.33, S = 144 ק"מ',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק שלישי: הסתברות =================
  {
    id: "b581-prob-books-contingency",
    domain: "PROBABILITY",
    title: "שאלון ראשון - אי-שוויונות בהסתברות",
    context:
      "בספרייה 60% מספרי הקריאה הם קומיקס והשאר עיון. 70% מכלל הספרים הם בעברית והשאר באנגלית. נתונות הטענות: (I) ייתכן שאין בספרייה אף ספר קומיקס בעברית. (II) ההסתברות לבחור באקראי ספר בעברית מבין ספרי הקומיקס גדולה בהכרח מההסתברות לבחור ספר קומיקס מבין הספרים שבעברית.",
    instruction: "מהי הקביעה הנכונה לגבי שתי הטענות?",
    options: [
      {
        id: "1",
        plainText: "שתי הטענות נכונות תמיד",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "שתי הטענות אינן נכונות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "טענה I נכונה, וטענה II תלויה בהתפלגות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "טענה I אינה נכונה, וטענה II נכונה תמיד",
        isCorrect: true,
        explanation:
          "נסמן x בהסתברות החיתוך. לפי אי-שוויון איחוד מאורעות, x >= 0.6 + 0.7 - 1 = 0.3 > 0, ולכן טענה I נפסלת. בהסתברות מותנית: x/0.6 גדול מ-x/0.7, ולכן טענה II נכונה תמיד.",
      },
    ],
  },
  {
    id: "b581-prob-two-urns-replacement",
    domain: "PROBABILITY",
    title: "שאלון ראשון - בחירת כדורים משני שקים",
    context:
      "בשק א' יש 4 כדורים רכים ו-6 קשים. בשק ב' יש 12 כדורים: x רכים והשאר קשים. בוחרים באקראי שק בהסתברות שווה ומוציאים ממנו 2 כדורים עם החזרה. ההסתברות ששני הכדורים רכים היא 41/200.",
    instruction: "מהו מספר הכדורים הרכים x בשק ב'?",
    options: [
      {
        id: "1",
        plainText: "x = 4",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "x = 6",
        mathText: "x = 6",
        isCorrect: true,
        explanation:
          "נוסחת הסתברות שלמה: 0.5*(4/10)^2 + 0.5*(x/12)^2 = 41/200 = 0.205. מכאן 0.08 + x^2 / 288 = 0.205, כלומר x^2 / 288 = 0.125 -> x^2 = 36, ומכאן x = 6.",
      },
      {
        id: "3",
        plainText: "x = 8",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "x = 5",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b581-prob-conditional-hiring-stages",
    domain: "PROBABILITY",
    title: "שאלון ראשון - מודל קבלה לעבודה",
    context:
      "מועמד נדרש לעבור מבחן א', מבחן ב' וריאיון בזה אחר זה. הסיכוי לעבור את א' הוא p. הסיכוי לעבור את ב' בהינתן שעבר את א' הוא 2p. הסיכוי להתקבל לעבודה (מעבר כל השלבים) גדול פי 3 מהסיכוי לעבור את שני המבחנים אך להיכשל בריאיון. נתון כי 94% מהמועמדים אינם מתקבלים לעבודה.",
    instruction: "מהי ההסתברות שמועמד שלא התקבל לעבודה עבר את מבחן א'?",
    options: [
      {
        id: "1",
        plainText: "7 / 47",
        mathText: "\\frac{7}{47}",
        isCorrect: true,
        explanation:
          "הסיכוי לעבור ריאיון הוא 3/4. הסיכוי להתקבל הוא 2p^2 * 0.75 = 1.5p^2 = 0.06, ומכאן p = 0.2. ההסתברות שעבר את מבחן א' ולא התקבל היא p - 0.06 = 0.14. בהינתן שלא התקבל (0.94): 0.14 / 0.94 = 7/47.",
      },
      {
        id: "2",
        plainText: "14 / 100",
        mathText: "\\frac{14}{100}",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחוסר חלוקה בהסתברות המותנית של אי-הקבלה.",
      },
      {
        id: "3",
        plainText: "3 / 50",
        mathText: "\\frac{3}{50}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "1 / 5",
        mathText: "\\frac{1}{5}",
        isCorrect: false,
        explanation: "מסיח הנובע מלקיחת ערך ה-p המקורי.",
      },
    ],
  },

  // ================= פרק רביעי: חדו״א =================
  {
    id: "b581-calc-rational-antiderivative",
    domain: "CALCULUS",
    title: "שאלון ראשון - מציאת פונקציה קדומה",
    context:
      "נתונה הנגזרת $g'(x)$. גרף הפונקציה $g(x)$ עובר דרך הנקודה $(0, 0.75)$.",
    instruction:
      "מהו הביטוי האלגברי של הפונקציה $g(x)$ ומהי משוואת האסימפטוטה האופקית שלה?",
    formulaLatex:
      "g'(x) = \\frac{-30x^2}{(x^3-8)^2}, \\quad g(0) = 0.75",
    options: [
      {
        id: "1",
        plainText: "g(x) = -10/(x^3-8) - 0.5, אסימפטוטה y = -0.5",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "g(x) = 10/(x^3-8)^2 + 0.75, אסימפטוטה y = 0.75",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "g(x) = 10/(x^3-8) + 2, אסימפטוטה y = 2",
        mathText: "g(x) = \\frac{10}{x^3-8} + 2, \\quad y = 2",
        isCorrect: true,
        explanation:
          "אינטגרל לפי הצבה u = x^3 - 8 נותן g(x) = 10/(x^3 - 8) + C. מהצבת הנקודה (0, 0.75): 10/(-8) + C = 0.75, ומכאן C = 2. כאשר x שואף לאינסוף, השבר שואף ל-0 ולכן האסימפטוטה האופקית היא y = 2.",
      },
      {
        id: "4",
        plainText: "g(x) = 30/(x^3-8) + 4.5, אסימפטוטה y = 4.5",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b581-calc-rational-tangent-root",
    domain: "CALCULUS",
    title: "שאלון ראשון - חיתוך יחיד עם הציר",
    context:
      "נתונה הפונקציה $f(x)$ עבור $a > 0$. מגדירים $g(x) = f(x) + 0.5$. נתון כי לגרף של $g(x)$ יש בדיוק נקודה משותפת אחת עם ציר ה-$x$.",
    instruction: "מהו הערך של הפרמטר $a$?",
    formulaLatex:
      "f(x) = \\frac{ax}{(x-3)^2}, \\quad g(x) = f(x) + 0.5",
    options: [
      {
        id: "1",
        plainText: "a = 12",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "a = 3",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "a = 1.5",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "a = 6",
        mathText: "a = 6",
        isCorrect: true,
        explanation:
          "חקירת f(x) מראה נקודת מינימום ב-x = -3 עם ערך f(-3) = -a/12. כדי של-g(x) תהיה נקודת אפס יחידה עליה להשיק לציר ה-x בנקודת המינימום: -a/12 + 0.5 = 0, ומכאן a = 6.",
      },
    ],
  },
  {
    id: "b581-calc-trig-absolute-value",
    domain: "CALCULUS",
    title: "שאלון ראשון - חדו״א טריגונומטרית וערך מוחלט",
    context:
      "נתונה הפונקציה $f(x)$ בתחום הסגור $[-\\pi, \\pi]$ כאשר $0 < b < 1$. ידוע כי לפונקציה נקודת קיצון ב-$x = \\pi/3$.",
    instruction:
      "מהו הערך של $b$, ומהי תמונת הפונקציה $h(x) = f(x) + |f(x)|$ באותו תחום?",
    formulaLatex:
      "f(x) = (1+\\cos x)(-1 + b\\cos x), \\quad x_{ext} = \\frac{\\pi}{3}",
    options: [
      {
        id: "1",
        plainText: "b = 0.5, ותמונת h(x) היא הקטע [0, 1.125]",
        isCorrect: false,
        explanation:
          "מסיח הנובע מאי-זיהוי שהפונקציה אי-חיובית בכל התחום.",
      },
      {
        id: "2",
        plainText: "b = 0.5, וערכה של h(x) הוא 0 בכל תחום הגדרתה",
        mathText: "b = 0.5, \\quad h(x) \\equiv 0",
        isCorrect: true,
        explanation:
          "גזירה והצבת x = π/3 נותנת b = 0.5. עם ערך זה, הביטוי -1 + 0.5cos(x) קטן או שווה למינוס 0.5 לכל x, ולכן f(x) אי-חיובית בכל התחום. מכאן ש-|f(x)| = -f(x), ולכן h(x) = f(x) + (-f(x)) = 0 לכל x.",
      },
      {
        id: "3",
        plainText: "b = 0.25, וערכה של h(x) שווה ל-0 בכל תחום הגדרתה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "b = 0.75, ותמונת h(x) היא הקטע [0, 2]",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
];

export const BAGRUT_481_QUESTIONS: DiagnosticQuestion[] = [
  // ================= פרק ראשון: בעיות תנועה =================
  {
    id: "b481-motion-uri-hanan",
    domain: "WORD_PROBLEMS",
    title: "שאלון ראשון - בעיית תנועה",
    context:
      'המרחק בין ביתו של אורי לבית חנן הוא 3 ק"מ, והמרחק מבית חנן למכולת הוא 5 ק"מ (שלושתם על קו ישר). אורי יצא מביתו במהירות v. חנן יצא 20 דקות לאחר אורי במהירות הגבוהה ב-3 קמ"ש מזו של אורי. שניהם הגיעו למכולת בו-זמנית.',
    instruction: "מהי מהירות הרכיבה של אורי?",
    options: [
      {
        id: "1",
        plainText: '9 קמ"ש',
        isCorrect: false,
        explanation:
          "מסיח הנובע מהמרה שגויה של 20 דקות ל-0.2 שעה במקום שליש שעה.",
      },
      {
        id: "2",
        plainText: '12 קמ"ש',
        mathText: "12\\text{ km/h}",
        isCorrect: true,
        explanation:
          'המרחק שעבר אורי הוא 8 ק"מ וחנן 5 ק"מ. משוואת הזמנים: 8/v פחות 5/(v+3) שווה 1/3 (20 דקות הן שליש שעה). כפל במכנה משותף מניב v^2 - 6v - 72 = 0, שפתרונה החיובי הוא v = 12 קמ"ש.',
      },
      {
        id: "3",
        plainText: '15 קמ"ש',
        isCorrect: false,
        explanation: 'מסיח המייצג את מהירותו של חנן (v+3).',
      },
      {
        id: "4",
        plainText: '10 קמ"ש',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b481-motion-tractor-car",
    domain: "WORD_PROBLEMS",
    title: "שאלון ראשון - מפגש טרקטורון ומכונית",
    context:
      'היישובים A, B, C נמצאים על ישר אחד. המרחק מ-A ל-B הוא 30 ק"מ ומ-B ל-C הוא 40 ק"מ. בשעה 7:00 יצא טרקטורון מ-B לכיוון C במהירות v. בשעה 7:05 יצאה מכונית מ-A לכיוון C במהירות הגבוהה ב-28 קמ"ש מזו של הטרקטורון. שניהם נפגשו ב-C.',
    instruction: "מהי מהירות הטרקטורון?",
    options: [
      {
        id: "1",
        plainText: '32 קמ"ש',
        mathText: "32\\text{ km/h}",
        isCorrect: true,
        explanation:
          'הטרקטורון עבר 40 ק"מ והמכונית 70 ק"מ. הפרש הזמנים הוא 5 דקות (1/12 שעה). המשוואה: 40/v פחות 70/(v+28) שווה 1/12. פישוט מוביל למשוואה v^2 + 388v - 13440 = 0 שפתרונה החיובי הוא v = 32 קמ"ש.',
      },
      {
        id: "2",
        plainText: '28 קמ"ש',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: '35 קמ"ש',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: '60 קמ"ש',
        isCorrect: false,
        explanation: "מסיח המייצג את מהירות המכונית.",
      },
    ],
  },

  // ================= פרק שני: סטטיסטיקה והתפלגות נורמלית =================
  {
    id: "b481-stat-normal-steps",
    domain: "STATISTICS",
    title: "שאלון ראשון - התפלגות נורמלית",
    context:
      "במחקר נבדק מספר הצעדים היומי של מבוגרים ונמצא כי הוא מתפלג נורמלית עם סטיית תקן של 800 צעדים. ידוע כי 37.5% מן המשתתפים צועדים פחות מ-6,944 צעדים ביום.",
    instruction: "מהו ממוצע הצעדים היומי באוכלוסייה זו?",
    options: [
      {
        id: "1",
        plainText: "7,000 צעדים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "7,456 צעדים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "7,200 צעדים",
        mathText: "\\mu = 7,200",
        isCorrect: true,
        explanation:
          "בהתפלגות נורמלית, שטח של 0.375 משמאל מתאים לציון תקן Z = -0.32. לכן: (6944 - mu)/800 = -0.32, מה שנותן 6944 - mu = -256, ומכאן mu = 7,200 צעדים.",
      },
      {
        id: "4",
        plainText: "6,800 צעדים",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b481-stat-regression-error",
    domain: "STATISTICS",
    title: "שאלון ראשון - קו רגרסיה",
    context:
      'חוקר מצא כי ממוצע השטח הירוק לנפש ב-6 ערים הוא 15 מ"ר, וממוצע רמת הזיהום הוא 30. משוואת ישר הרגרסיה המקורית הייתה y = -1.8x + 57. עקב תקלה במכשיר, רמת הזיהום האמיתית בכל עיר גבוהה ב-4 יחידות מזו שנמדדה.',
    instruction: "מהי משוואת ישר הרגרסיה המעודכנת לאחר תיקון המדידות?",
    formulaLatex: "y = -1.8x + b",
    options: [
      {
        id: "1",
        plainText: "y = -1.8x + 57",
        isCorrect: false,
        explanation: "מסיח הנובע מאי-עדכון משוואת הישר.",
      },
      {
        id: "2",
        plainText: "y = -1.4x + 61",
        isCorrect: false,
        explanation: "מסיח הנובע משינוי שגוי של השיפוע.",
      },
      {
        id: "3",
        plainText: "y = -2.2x + 61",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "y = -1.8x + 61",
        mathText: "y = -1.8x + 61",
        isCorrect: true,
        explanation:
          "הוספת קבוע 4 לכל ערכי y אינה משנה את סטיית התקן או השונות המשותפת, ולכן שיפוע הישר נותר 1.8-. ממוצע y החדש הוא 34. הצבת נקודת הממוצעים (15, 34) במשוואה נותנת: 34 = -1.8(15) + b, ומכאן b = 61.",
      },
    ],
  },

  // ================= פרק שלישי: הסתברות =================
  {
    id: "b481-prob-factory-two-tests",
    domain: "PROBABILITY",
    title: "שאלון ראשון - בדיקות איכות כפולות",
    context:
      "במפעל נבדקים מוצרים בשתי בדיקות. בראשונה 80% נמצאים תקינים. אם מוצר תקין בראשונה, הסיכוי שיימצא תקין בשנייה הוא 0.9. אם אינו תקין בראשונה, הסיכוי שיימצא תקין בשנייה הוא 0.35.",
    instruction:
      "מהן ההסתברויות שמוצר יימצא תקין: (1) בדיוק באחת הבדיקות? (2) לפחות באחת הבדיקות?",
    options: [
      {
        id: "1",
        plainText: "בדיוק באחת: 0.28; לפחות באחת: 0.87",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "בדיוק באחת: 0.15; לפחות באחת: 0.87",
        isCorrect: true,
        explanation:
          "הסתברויות החיתוך: תקין בשתיהן = 0.8*0.9 = 0.72; תקין רק בראשונה = 0.8*0.1 = 0.08; תקין רק בשנייה = 0.2*0.35 = 0.07; לא תקין באף אחת = 0.2*0.65 = 0.13. לכן: בדיוק באחת = 0.08 + 0.07 = 0.15. לפחות באחת = 1 - 0.13 = 0.87.",
      },
      {
        id: "3",
        plainText: "בדיוק באחת: 0.15; לפחות באחת: 0.72",
        isCorrect: false,
        explanation: "מסיח המבלבל בין לפחות באחת לתקין בשתיהן.",
      },
      {
        id: "4",
        plainText: "בדיוק באחת: 0.08; לפחות באחת: 0.92",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b481-prob-peppers-bayes",
    domain: "PROBABILITY",
    title: "שאלון ראשון - הסתברות מותנית (בייס)",
    context:
      "מספר הפלפלים הגדולים גדול פי 4 ממספר הקטנים (80% גדולים, 20% קטנים). 60% מהגדולים אדומים, ו-75% מהקטנים אדומים. בוחרים באקראי פלפל ונמצא כי הוא אדום.",
    instruction: "מהי ההסתברות שהוא פלפל גדול?",
    options: [
      {
        id: "1",
        plainText: "16 / 21",
        mathText: "\\frac{16}{21}",
        isCorrect: true,
        explanation:
          "סך ההסתברות לפלפל אדום: 0.8*0.6 + 0.2*0.75 = 0.48 + 0.15 = 0.63. לפי נוסחת בייס, ההסתברות שהוא גדול בהינתן שהוא אדום היא: 0.48 חלקי 0.63 = 48/63 = 16/21 (כ-0.7619).",
      },
      {
        id: "2",
        plainText: "0.48",
        isCorrect: false,
        explanation: "מסיח המייצג את החיתוך בלבד ללא התנאה.",
      },
      {
        id: "3",
        plainText: "0.80",
        isCorrect: false,
        explanation: "מסיח המייצג את שיעור הפלפלים הגדולים הכולל.",
      },
      {
        id: "4",
        plainText: "0.60",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b481-prob-bernoulli-computers",
    domain: "PROBABILITY",
    title: "שאלון ראשון - התפלגות בינומית (ברנולי)",
    context:
      "ההסתברות שמוצר במפעל יאושר למכירה היא 0.72. דוגמים באקראי 4 מוצרים באופן בלתי תלוי.",
    instruction: "מהי ההסתברות שבדיוק 3 מתוכם הועברו למכירה?",
    options: [
      {
        id: "1",
        plainText: "0.3732",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב 0.72 בחזקת 3 ללא המקדם הבינומי והכישלון הבודד.",
      },
      {
        id: "2",
        plainText: "0.1045",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "0.2688",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "0.4180",
        mathText: "\\approx 0.4180",
        isCorrect: true,
        explanation:
          "לפי נוסחת ברנולי: 4 מעל 3 כפול (0.72)^3 כפול (0.28)^1 = 4 * 0.373248 * 0.28 = 0.418037... כ-0.4180.",
      },
    ],
  },

  // ================= פרק רביעי: חדו״א רציונלית =================
  {
    id: "b481-calc-rational-extrema",
    domain: "CALCULUS_RATIONAL",
    title: "שאלון ראשון - חקירת פונקציה רציונלית",
    context: "נתונה פונקציה עם פרמטר a. גרף הפונקציה חותך את ציר ה-x בנקודה שבה x = sqrt(3).",
    instruction: "מהם הערך של הפרמטר a, שיעורי נקודת הקיצון וסוגה?",
    formulaLatex: "f(x) = \\frac{4x^2}{x^2-9} + a",
    options: [
      {
        id: "1",
        plainText: "a = -2, ונקודת הקיצון היא מקסימום ב-(0, -2)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "a = 2, ונקודת הקיצון היא מינימום ב-(0, 2)",
        isCorrect: false,
        explanation: "מסיח הנובע מסיווג שגוי של סוג הקיצון.",
      },
      {
        id: "3",
        plainText: "a = 2, ונקודת הקיצון היא מקסימום ב-(0, 2)",
        mathText: "a = 2, \\quad \\max(0, 2)",
        isCorrect: true,
        explanation:
          "הצבת x=sqrt(3) ו-y=0 נותנת: 4(3)/(3-9) + a = 0 -> -2 + a = 0 -> a = 2. נגזרת הפונקציה היא f'(x) = -72x / (x^2-9)^2. היא מתאפסת ב-x=0, ועוברת מסימן חיובי לשלילי, ולכן (0, 2) היא נקודת מקסימום.",
      },
      {
        id: "4",
        plainText: "a = 4, ונקודת הקיצון היא מינימום ב-(0, 4)",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b481-calc-rational-asymptote",
    domain: "CALCULUS_RATIONAL",
    title: "שאלון ראשון - אסימפטוטות וחיתוך",
    context:
      "לפונקציה f(x) נקודת קיצון ב-x=0 עם ערך y=20 (ולכן a=3). מגדירים g(x) = -f(x) + 9.",
    instruction:
      "מהי משוואת האסימפטוטה האופקית של g(x), וכמה נקודות חיתוך יש לה עם ציר ה-x?",
    formulaLatex:
      "f(x) = \\frac{2x^2-17}{x^2-1} + 3, \\quad g(x) = -f(x) + 9",
    options: [
      {
        id: "1",
        plainText: "אסימפטוטה y = 9, ואף לא נקודת חיתוך אחת עם ציר ה-x",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "אסימפטוטה y = 4, ואף לא נקודת חיתוך אחת עם ציר ה-x",
        mathText: "y = 4, \\quad 0\\text{ points}",
        isCorrect: true,
        explanation:
          "כאשר x שואף לאינסוף, השבר שואף ל-2 ולכן f(x) שואפת ל-5. מכאן ש-g(x) שואפת ל- (-5)+9 = 4, וזו האסימפטוטה האופקית. המשוואה g(x)=0 שקולה ל-f(x)=9 המובילה למשוואה 4x^2 = -11 שלה אין פתרון ממשי (0 נקודות חיתוך).",
      },
      {
        id: "3",
        plainText: "אסימפטוטה y = 4, ושתי נקודות חיתוך עם ציר ה-x",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "אסימפטוטה y = -5, ושתי נקודות חיתוך עם ציר ה-x",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק חמישי: חדו״א של פונקציות שורש =================
  {
    id: "b481-calc-root-extrema",
    domain: "CALCULUS_RADICAL",
    title: "שאלון ראשון - חקירת פונקציית שורש",
    context: "נתונה הפונקציה הבאה בתחום הגדרתה המרבי:",
    instruction:
      "מהן נקודות החיתוך עם ציר ה-x ונקודות הקיצון (כולל קצוות) של הפונקציה?",
    formulaLatex: "f(x) = 2x - 4\\sqrt{5x-16}",
    options: [
      {
        id: "1",
        plainText:
          "חיתוך: (4,0), (16,0); מקסימום קצה: (3.2, 6.4); מינימום פנימי: (8.2, -3.6)",
        mathText:
          "(4,0), (16,0), \\; \\max(3.2, 6.4), \\; \\min(8.2, -3.6)",
        isCorrect: true,
        explanation:
          "תחום ההגדרה x >= 3.2. נקודות אפס: 2x = 4sqrt(5x-16) מניב x=4 ו-x=16. הנגזרת f'(x) = 2 - 10/sqrt(5x-16) מתאפסת ב-x=8.2 שבה מתקבל מינימום פנימי עם y=-3.6. בקצה התחום x=3.2 מתקבל מקסימום קצה ב-(3.2, 6.4).",
      },
      {
        id: "2",
        plainText:
          "חיתוך: (4,0), (16,0); מינימום קצה: (3.2, 0); מקסימום פנימי: (8.2, 3.6)",
        isCorrect: false,
        explanation: "מסיח הנובע מסיווג הפוך של נקודות הקיצון.",
      },
      {
        id: "3",
        plainText:
          "חיתוך: (16,0) בלבד; נקודת מינימום פנימית יחידה: (8.2, -3.6)",
        isCorrect: false,
        explanation: "מסיח הנובע מאיבוד פתרון בריבוע משוואה.",
      },
      {
        id: "4",
        plainText: "חיתוך: (4,0), (16,0); ללא נקודות קיצון בקצוות",
        isCorrect: false,
        explanation: "מסיח המתעלם מנקודת קצה.",
      },
    ],
  },
  {
    id: "b481-calc-root-integral-split",
    domain: "CALCULUS_RADICAL",
    title: "שאלון ראשון - אינטגרל של נגזרת שורש",
    context:
      "עבור הפונקציה f(x) = 2x - 4sqrt(5x-16), פונקציית הנגזרת f'(x) מתאפסת ב-x=8.2, שלילית לפני כן וחיובית לאחר מכן. נתון: f(4)=0, f(8.2)=-3.6, f(13)=-2.",
    instruction:
      "מהו השטח המוגבל על ידי גרף הנגזרת f'(x), ציר ה-x והישרים x=4 ו-x=13?",
    options: [
      {
        id: "1",
        plainText: "2.0",
        isCorrect: false,
        explanation:
          "מסיח הנובע מאינטגרל ישיר של f(13)-f(4) תוך התעלמות משינוי סימן הנגזרת מתחת לציר.",
      },
      {
        id: "2",
        plainText: "1.6",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "5.2",
        mathText: "S = 5.2",
        isCorrect: true,
        explanation:
          "מפצלים את השטח בנקודת איפוס הנגזרת x=8.2: השטח הראשון (שבו הנגזרת שלילית) הוא f(4) - f(8.2) = 0 - (-3.6) = 3.6. השטח השני (שבו הנגזרת חיובית) הוא f(13) - f(8.2) = -2 - (-3.6) = 1.6. סך השטח הכולל: 3.6 + 1.6 = 5.2.",
      },
      {
        id: "4",
        plainText: "3.6",
        isCorrect: false,
        explanation: "מסיח הכולל רק את החלק השמאלי של השטח.",
      },
    ],
  },

  // ================= פרק שישי: בעיות קיצון =================
  {
    id: "b481-opt-public-area-min",
    domain: "OPTIMIZATION",
    title: "שאלון ראשון - בעיית קיצון גאומטרית",
    context: "השטח הכולל של מתחם ציבורי נתון על ידי הפונקציה הבאה עבור x > 0:",
    instruction:
      'עבור איזה ערך של x השטח הכולל הוא מינימלי, והאם ייתכן ששטח המתחם יהיה 9 מ"ר?',
    formulaLatex: "S(x) = 4x^2 + \\frac{8}{x} - 2",
    options: [
      {
        id: "1",
        plainText:
          'x = 2 מטרים; השטח המינימלי הוא 18 מ"ר, ולכן 9 מ"ר אינו ייתכן',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: 'x = 1 מטר; השטח המינימלי הוא בדיוק 9 מ"ר',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          'x = 0.5 מטר; השטח המינימלי הוא 15 מ"ר, ולכן 9 מ"ר אינו ייתכן',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          'x = 1 מטר; השטח המינימלי הוא 10 מ"ר, ולכן שטח של 9 מ"ר אינו ייתכן כלל',
        mathText: "x = 1\\text{ m}, \\quad S_{\\min} = 10\\text{ m}^2",
        isCorrect: true,
        explanation:
          'נגזרת השטח: S\'(x) = 8x - 8/x^2 = 0 מובילה ל-x^3 = 1 ומכאן x = 1 מטר. הנגזרת השנייה חיובית (מינימום מוחלט). השטח המינימלי הוא S(1) = 4(1) + 8/1 - 2 = 10 מ"ר. כיוון ש-10 הוא הערך הנמוך ביותר שהפונקציה מקבלת, שטח של 9 מ"ר אינו אפשרי בתחום.',
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* BAGRUT — 482 (sequences / growth-decay / trig / exp / log calculus)         */
/* -------------------------------------------------------------------------- */

export const BAGRUT_482_QUESTIONS: DiagnosticQuestion[] = [
  // ================= פרק ראשון: סדרות =================
  {
    id: "b482-seq-geom-bottles",
    domain: "SEQUENCES",
    title: "שאלון שני - סדרה הנדסית",
    context:
      "תלמידים אספו בקבוקים במשך 5 שבועות כסדרה הנדסית שמנתה q. מספר הבקבוקים בשבוע הרביעי היה גדול פי 3.375 מזה שבשבוע הראשון. סך הבקבוקים בשבוע הראשון והחמישי יחד היה 2,425.",
    instruction: "מהם מנת הסדרה q ומספר הבקבוקים שנאספו בשבוע הראשון?",
    options: [
      {
        id: "1",
        plainText: "q = 1.5, a_1 = 400",
        mathText: "q = 1.5, \\quad a_1 = 400",
        isCorrect: true,
        explanation:
          "מתקיים a_4 = a_1 * q^3 = 3.375 a_1, ומכאן q^3 = 3.375 = 27/8 -> q = 1.5. המשוואה a_1 + a_5 = a_1(1 + 1.5^4) = 6.0625 a_1 = 2,425 מניבה a_1 = 400.",
      },
      {
        id: "2",
        plainText: "q = 1.5, a_1 = 485",
        mathText: "q = 1.5, \\quad a_1 = 485",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "q = 1.25, a_1 = 400",
        mathText: "q = 1.25, \\quad a_1 = 400",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "q = 1.5, a_1 = 500",
        mathText: "q = 1.5, \\quad a_1 = 500",
        isCorrect: false,
        explanation: "מסיח הנובע מחילוק שגוי של סכום הבקבוקים.",
      },
    ],
  },
  {
    id: "b482-seq-arith-budget",
    domain: "SEQUENCES",
    title: "שאלון שני - סדרה חשבונית ומימון",
    context:
      'איסוף בקבוקים במשך 18 שבועות כסדרה חשבונית עם הפרש d. בשבוע השני נאספו 230 בקבוקים, ובסך הכול 6,300 בקבוקים. עלות מסיבת הסיום היא 3,400 ש"ח, ופדיון כל בקבוק הוא 0.3 ש"ח. יחד עם הכיתה המקבילה נאספו 11,575 בקבוקים בסך הכול.',
    instruction: "מהו הפרש הסדרה d, והאם סכום הכסף הכולל יספיק למימון המסיבה?",
    options: [
      {
        id: "1",
        plainText:
          'd = 16; הסכום הכולל הוא 3,375 ש"ח, ולכן חסרים 25 שקלים',
        isCorrect: false,
        explanation: "מסיח הנובע מחישוב הפדיון של כיתה אחת בלבד.",
      },
      {
        id: "2",
        plainText:
          'd = 16; הסכום הכולל הוא 3,472.5 ש"ח, ולכן הוא יספיק (עודף של 72.5 ש"ח)',
        isCorrect: true,
        explanation:
          'לפי נוסחת הסכום S_18 = 9(2a_1 + 17d) = 6,300, ובשילוב a_1 = 230 - d מתקבל 15d = 240, כלומר d = 16. סך הפדיון משתי הכיתות: 11,575 * 0.3 = 3,472.5 ש"ח, העולה על עלות המסיבה (עודף של 72.5 ש"ח).',
      },
      {
        id: "3",
        plainText: 'd = 15; הסכום הכולל הוא 3,400 ש"ח בדיוק',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: 'd = 18; הסכום הכולל הוא 3,520 ש"ח',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק שני: גדילה ודעיכה =================
  {
    id: "b482-decay-comparison-logic",
    domain: "GROWTH_DECAY",
    title: "שאלון שני - מודל דעיכה מעריכית",
    context:
      'ביום הקנייה היה נפח גלגל ים 3,700 סמ"ק ונפח מזרן 7,400 סמ"ק. שניהם מאבדים אוויר באחוז יומי קבוע, וכעבור 7 ימים בדיוק נפחיהם השתוו. נתונות הטענות: (I) כעבור 6 ימים נפח הגלגל היה גדול מנפח המזרן. (II) כעבור 8 ימים נפח הגלגל היה גדול מנפח המזרן.',
    instruction: "איזו קביעה נכונה לגבי שתי הטענות?",
    options: [
      {
        id: "1",
        plainText: "שתי הטענות נכונות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "טענה I נכונה, וטענה II אינה נכונה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "טענה I אינה נכונה, וטענה II נכונה",
        isCorrect: true,
        explanation:
          "מכיוון שהגלגל החל מנפח קטן יותר אך השתווה למזרן ביום ה-7, קצב הדעיכה של המזרן מהיר יותר. לכן לפני היום ה-7 נפח המזרן היה גדול יותר (טענה I שגויה), ולאחר היום ה-7 נפח הגלגל גדול יותר (טענה II נכונה).",
      },
      {
        id: "4",
        plainText: "שתי הטענות אינן נכונות",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b482-decay-rate-percent",
    domain: "GROWTH_DECAY",
    title: "שאלון שני - חישוב אחוז דעיכה",
    context:
      'נפח גלגל ים (התחלתי 3,700 סמ"ק) קטן ב-4% בכל יום (בסיס 0.96). נפח מזרן ים (התחלתי 7,400 סמ"ק) דועך בקצב יומי קבוע q_2, והנפחים משתווים כעבור 7 ימים בדיוק.',
    instruction: "מהו אחוז הדעיכה היומי של נפח מזרן הים?",
    options: [
      {
        id: "1",
        plainText: "כ-8.50% בכל יום",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "כ-10.25% בכל יום",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "כ-15.42% בכל יום",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "כ-13.07% בכל יום",
        isCorrect: true,
        explanation:
          "משוואת השוויון: 3700*(0.96)^7 = 7400*(q_2)^7, ומכאן (q_2)^7 = 0.5*(0.96)^7 שווה כ-0.3757. הוצאת שורש שביעי נותנת q_2 שווה כ-0.8693. אחוז הדעיכה היומי: 1 פחות 0.8693 שווה כ-13.07%.",
      },
    ],
  },

  // ================= פרק שלישי: חדו״א טריגונומטרית =================
  {
    id: "b482-calc-trig-extrema-domain",
    domain: "TRIG_CALCULUS",
    title: "שאלון שני - נגזרת וקיצון טריגונומטרי",
    context:
      "נתונה הפונקציה f(x) בתחום הסגור שבין 0 ל-(2/3) פאי. שיפוע המשיק לגרף בנקודה שבה x = פאי/4 הוא 5-.",
    instruction:
      "מהו הערך של a, ומהם שיעורי נקודות הקיצון הפנימיות של הפונקציה?",
    formulaLatex: "f(x) = ax + 5\\cos(2x) - 1, \\quad 0 \\le x \\le \\frac{2}{3}\\pi",
    options: [
      {
        id: "1",
        plainText:
          "a = 5; מקסימום פנימי ב-x=pi/12, מינימום פנימי ב-x=5pi/12",
        mathText:
          "a = 5, \\quad \\max\\left(\\frac{\\pi}{12}\\right), \\; \\min\\left(\\frac{5\\pi}{12}\\right)",
        isCorrect: true,
        explanation:
          "הנגזרת f'(x) = a - 10sin(2x). בנקודה x = pi/4 מתקבל a - 10 = -5 ומכאן a = 5. המשוואה 5 - 10sin(2x) = 0 מובילה ל-sin(2x) = 0.5, שמניבה בתחום את x = pi/12 (מקסימום) ואת x = 5pi/12 (מינימום).",
      },
      {
        id: "2",
        plainText:
          "a = 5; מינימום פנימי ב-x=pi/12, מקסימום פנימי ב-x=5pi/12",
        isCorrect: false,
        explanation: "מסיח הנובע מהיפוך סוג נקודות הקיצון.",
      },
      {
        id: "3",
        plainText: "a = -5; מקסימום פנימי ב-x=pi/6",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "a = 10; נקודת פיתול יחידה",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b482-calc-trig-integral-area",
    domain: "TRIG_CALCULUS",
    title: "שאלון שני - אינטגרל של פונקציית קוסינוס",
    context:
      "לפונקציה f(x) בתחום שבין מינוס פאי לפאי יש נקודות מינימום שכולן מונחות על הישר y = a - 15 (ולכן a = 6).",
    instruction:
      "מהו השטח המוגבל על ידי גרף הפונקציה והישר y = a - 15 בתחום שבין מינוס פאי/2 לפאי/2?",
    formulaLatex: "f(x) = 3\\cos(2x) - 6, \\quad y = -9",
    options: [
      {
        id: "1",
        plainText: "6*pi",
        mathText: "S = 6\\pi",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "3*pi",
        mathText: "S = 3\\pi",
        isCorrect: true,
        explanation:
          "הפרש הפונקציות: (3cos(2x) - 6) - (-9) = 3cos(2x) + 3. האינטגרל המסוים בין מינוס פאי/2 לפאי/2 הוא: [1.5sin(2x) + 3x] בגבולות אלו. כיוון ש-sin מתאפס בגבולות, השטח הוא 3*(pi/2 - (-pi/2)) = 3*pi.",
      },
      {
        id: "3",
        plainText: "4.5*pi",
        mathText: "S = 4.5\\pi",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "1.5*pi",
        mathText: "S = 1.5\\pi",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק רביעי: חדו״א מעריכית =================
  {
    id: "b482-calc-exp-extrema-points",
    domain: "EXP_CALCULUS",
    title: "שאלון שני - חקירת פונקציה מעריכית",
    context: "נתונה פונקציה עם פרמטר a המוגדרת לכל x. לפונקציה נקודת קיצון ב-x = 1.",
    instruction:
      "מהו הערך של הפרמטר a, ומהם שיעורי נקודות הקיצון של הפונקציה וסוגן?",
    formulaLatex: "f(x) = (2x^2 - ax)e^x",
    options: [
      {
        id: "1",
        plainText: "a = 3; מינימום ב-(-1.5), מקסימום ב-(1)",
        isCorrect: false,
        explanation: "מסיח הנובע מסיווג הפוך של הקיצון.",
      },
      {
        id: "2",
        plainText: "a = 2; מקסימום ב-(-1), מינימום ב-(1)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "a = 3; מקסימום ב-(-1.5, 9e^-1.5), מינימום ב-(1, -e)",
        mathText:
          "a = 3, \\quad \\max(-1.5, 9e^{-1.5}), \\; \\min(1, -e)",
        isCorrect: true,
        explanation:
          "הנגזרת f'(x) = [2x^2 + (4-a)x - a]e^x. התאפסות ב-x=1 נותנת 6 - 2a = 0 כלומר a = 3. פירוק לגורמים: (2x+3)(x-1)e^x = 0 מניב נקודת מקסימום ב-x = -1.5 ונקודת מינימום ב-x = 1 עם ערך y = -e.",
      },
      {
        id: "4",
        plainText: "a = 4; מינימום ב-(1, -2e) בלבד",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b482-calc-exp-tangent-slope",
    domain: "EXP_CALCULUS",
    title: "שאלון שני - משיק וקיצון מעריכי",
    context: "שיפוע המשיק לגרף הפונקציה f(x) בנקודה שבה x=0 הוא 16 חלקי e.",
    instruction:
      "מהו הערך של הפרמטר a, ומהם שיעורי נקודת הקיצון של הפונקציה וסוגה?",
    formulaLatex: "f(x) = (a - 4x)e^{2x-1}, \\quad f'(0) = \\frac{16}{e}",
    options: [
      {
        id: "1",
        plainText: "a = 10; נקודת מינימום ב-(2, 2e^3)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "a = 6; נקודת מקסימום ב-(1, 2e)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "a = 10; נקודת מקסימום ב-(2.5, 0)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "a = 10; נקודת מקסימום ב-(2, 2e^3)",
        mathText: "a = 10, \\quad \\max(2, 2e^3)",
        isCorrect: true,
        explanation:
          "הנגזרת היא f'(x) = (2a - 4 - 8x)e^{2x-1}. הצבת x=0 נותנת (2a-4)/e = 16/e, ומכאן 2a - 4 = 16 כלומר a = 10. איפוס הנגזרת נותן 16 - 8x = 0 כלומר x = 2, ושם f(2) = (10 - 8)e^3 = 2e^3 (מקסימום).",
      },
    ],
  },
  {
    id: "b482-calc-exp-intersection-area",
    domain: "EXP_CALCULUS",
    title: "שאלון שני - חיתוך ושטח פונקציה מעריכית",
    context: "נתונות הפונקציות f(x) ו-g(x). נקודה A היא נקודת החיתוך בין שני הגרפים.",
    instruction:
      "מהם שיעורי הנקודה A, ומהו השטח המוגבל על ידי g(x), האנך מ-A לציר ה-x, ציר ה-x וציר ה-y?",
    formulaLatex: "f(x) = (10 - 4x)e^{2x-1}, \\quad g(x) = 4e^{2x-1}",
    options: [
      {
        id: "1",
        plainText: "A(1.5, 4e^2); השטח הוא 2(e^2 - 1/e)",
        mathText:
          "A(1.5, 4e^2), \\quad S = 2\\left(e^2 - \\frac{1}{e}\\right)",
        isCorrect: true,
        explanation:
          "השוואת הפונקציות: (10 - 4x)e^{2x-1} = 4e^{2x-1} מניבה 10 - 4x = 4 כלומר x = 1.5, ושם y = 4e^2. חישוב השטח: אינטגרל של 4e^{2x-1} מ-0 עד 1.5 הוא [2e^{2x-1}] מ-0 עד 1.5, שנותן 2e^2 - 2e^{-1} = 2(e^2 - 1/e).",
      },
      {
        id: "2",
        plainText: "A(1.5, 4e^2); השטח הוא 4(e^2 - 1/e)",
        isCorrect: false,
        explanation: "מסיח הנובע מאי-חלוקה בנגזרת הפנימית באינטגרל.",
      },
      {
        id: "3",
        plainText: "A(2, 4e^3); השטח הוא 2e^3",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "A(1.5, 4e^2); השטח הוא 2(e^2 + 1/e)",
        isCorrect: false,
        explanation:
          "מסיח הנובע מטעות בסימן בעת הצבת גבול האינטגרציה התחתון.",
      },
    ],
  },

  // ================= פרק חמישי: חדו״א לוגריתמית =================
  {
    id: "b482-calc-log-domain-asymptote",
    domain: "LOG_CALCULUS",
    title: "שאלון שני - תחום הגדרה ואסימפטוטות",
    context: "נתונה הפונקציה הבאה המכילה ביטוי לוגריתמי במכנה:",
    instruction:
      "מהו תחום ההגדרה של הפונקציה, מהי האסימפטוטה האנכית שלה, וכמה נקודות חיתוך יש לה עם הצירים?",
    formulaLatex: "f(x) = \\frac{x^2}{-6 + 4\\ln x}",
    options: [
      {
        id: "1",
        plainText:
          "תחום x > 0, x != e^1.5; אסימפטוטה x = e^1.5; חיתוך בראשית (0,0)",
        isCorrect: false,
        explanation:
          "מסיח (הנקודה x=0 אינה בתחום ההגדרה של ln x).",
      },
      {
        id: "2",
        plainText:
          "תחום x > 0, x != e^1.5; אסימפטוטה x = e^1.5; אין נקודות חיתוך עם הצירים כלל",
        mathText:
          "x > 0, \\; x \\ne e^{1.5}, \\quad x = e^{1.5}, \\quad 0\\text{ points}",
        isCorrect: true,
        explanation:
          "דרישות התחום: תוכן הלוגריתם חיובי (x > 0) והמכנה שונה מאפס (-6 + 4ln(x) != 0 -> ln(x) != 1.5 -> x != e^{1.5}). האפס של המכנה מאפס אסימפטוטה אנכית ב-x = e^{1.5}. המונה מתאפס רק ב-x=0 שאינו בתחום, ולכן אין חיתוך עם הצירים.",
      },
      {
        id: "3",
        plainText:
          "תחום x > 0, x != 1.5; אסימפטוטה x = 1.5; חיתוך ב-(e^1.5, 0)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "תחום כל x != e^1.5; אסימפטוטה x = e^1.5; חיתוך ב-(1, 0)",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b482-calc-log-extrema-derivative-area",
    domain: "LOG_CALCULUS",
    title: "שאלון שני - קיצון ואינטגרל של נגזרת לוגריתמית",
    context:
      "עבור הפונקציה f(x) = x^2 / (-6 + 4ln x), פונקציית הנגזרת f'(x) חיובית עבור x > e^2.",
    instruction:
      "מהם שיעורי נקודת הקיצון וסוגה, ומהו השטח המוגבל על ידי גרף הנגזרת f'(x), ציר ה-x והישר x = e^3 בתחום x >= e^2?",
    options: [
      {
        id: "1",
        plainText:
          "נקודת מקסימום ב-(e^2, e^4/2); השטח הוא (e^6 - 3e^4)/6",
        isCorrect: false,
        explanation: "מסיח הנובע מסיווג שגוי של הקיצון.",
      },
      {
        id: "2",
        plainText:
          "נקודת מינימום ב-(e^2, e^4/2); השטח הוא e^6 / 6",
        isCorrect: false,
        explanation: "מסיח הנובע מאי-החסרת f(e^2) באינטגרל.",
      },
      {
        id: "3",
        plainText:
          "נקודת מינימום ב-(e^2, e^4/2); השטח הוא (e^6 - 3e^4)/6",
        mathText:
          "\\min\\left(e^2, \\frac{e^4}{2}\\right), \\quad S = \\frac{e^6 - 3e^4}{6}",
        isCorrect: true,
        explanation:
          "הנגזרת f'(x) = 8x(ln x - 2) / (-6 + 4ln x)^2 מתאפסת ב-ln x = 2 כלומר x = e^2 (מינימום שערכו e^4/2). כיוון שהנגזרת חיובית עבור x >= e^2, השטח שווה ישירות ל-f(e^3) - f(e^2) = e^6/6 - e^4/2 = (e^6 - 3e^4)/6.",
      },
      {
        id: "4",
        plainText:
          "נקודת מינימום ב-(e, -e^2/2); השטח הוא e^4 / 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b482-calc-log-rational-extrema",
    domain: "LOG_CALCULUS",
    title: "שאלון שני - חיתוך וקיצון לוגריתמי",
    context: "נתונה הפונקציה הבאה בתחום x > 0:",
    instruction:
      "מהם שיעורי נקודות החיתוך עם הצירים ושיעורי נקודות הקיצון של הפונקציה?",
    formulaLatex: "f(x) = \\frac{14(\\ln x)^2}{x^2}",
    options: [
      {
        id: "1",
        plainText:
          "חיתוך ב-(0, 0) וב-(1, 0); מקסימום ב-(1, 0), מינימום ב-(e, 14/e^2)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "חיתוך יחיד ב-(1, 0); מקסימום ב-(e, 14/e^2) בלבד (ללא מינימום)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "אין חיתוך עם הצירים; מינימום ב-(1, 0), מקסימום ב-(e, 14/e^2)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "חיתוך יחיד עם הצירים ב-(1, 0); מינימום ב-(1, 0) ומקסימום ב-(e, 14/e^2)",
        mathText:
          "(1, 0), \\quad \\min(1, 0), \\; \\max\\left(e, \\frac{14}{e^2}\\right)",
        isCorrect: true,
        explanation:
          "הפונקציה מתאפסת רק כאשר ln x = 0 כלומר x = 1. הנגזרת f'(x) = 28 ln(x)(1 - ln x) / x^3 מתאפסת ב-ln x = 0 (מינימום ב-(1,0)) וב-ln x = 1 (מקסימום ב-(e, 14/e^2)).",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* BAGRUT — Physics: חשמל ומגנטיות                                            */
/* -------------------------------------------------------------------------- */

/**
 * Authentic bagrut-level electricity & magnetism bank (12 items).
 * Titles follow: "חשמל ומגנטיות - [נושא]". Domain is ELECTRICITY.
 * Correct-option balance: exactly 3 of each id 1/2/3/4.
 */
export const BAGRUT_PHYSICS_ELECTRICITY_QUESTIONS: DiagnosticQuestion[] = [
  // ================= פרק 1: אלקטרוסטטיקה ושדות חשמליים =================
  {
    id: "phys-elec-millikan-droplet",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - תנועת טיפה בשדה חשמלי",
    context:
      "טיפת שמן בעלת מסה m ומטען חיובי q משוחררת באזור שבו שורר שדה חשמלי אחיד שכיוונו כלפי מעלה. עבור שני ערכי שדה שונים נמדדה תאוצת הטיפה (הכיוון החיובי מוגדר כלפי מעלה).",
    instruction:
      "מהו יחס המטען למסה q/m של הטיפה, ובאיזה שדה חשמלי היא תרחף במנוחה?",
    formulaLatex:
      "E_1 = 1.0 \\times 10^5\\text{ V/m}, \\; a_1 = -4.0\\text{ m/s}^2, \\quad E_2 = 2.5 \\times 10^5\\text{ V/m}, \\; a_2 = 5.0\\text{ m/s}^2",
    options: [
      {
        id: "1",
        plainText: "יחס של 3.6 * 10^-5 C/kg; שדה של 2.78 * 10^5 V/m",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב שגוי של שיפוע התאוצה תוך התעלמות מסימנה השלילי של התאוצה הראשונה.",
      },
      {
        id: "2",
        plainText: "יחס של 6.0 * 10^-5 C/kg; שדה של 1.00 * 10^5 V/m",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "יחס של 6.0 * 10^-5 C/kg; שדה של 1.67 * 10^5 V/m",
        mathText:
          "\\frac{q}{m} = 6.0 \\times 10^{-5}\\text{ C/kg}, \\quad E = 1.67 \\times 10^5\\text{ V/m}",
        isCorrect: true,
        explanation:
          "משוואת התנועה: a = (q/m)E - g. שיפוע הגרף: Delta a / Delta E = 9.0 / (1.5*10^5) = 6.0*10^-5 C/kg. תנאי שיווי משקל (a=0): E = g / (q/m) = 10 / (6.0*10^-5) = 1.67*10^5 V/m.",
      },
      {
        id: "4",
        plainText: "יחס של 2.0 * 10^-5 C/kg; שדה של 5.00 * 10^5 V/m",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-elec-shell-potential-proton",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - פוטנציאל מעטפת כדורית",
    context:
      "מעטפת כדורית מוליכה שרדיוסה 10 ס\"מ טעונה במטען אחיד Q1. במרחק 5 ס\"מ מפני המעטפת (15 ס\"מ ממרכזה) נמדד פוטנציאל חשמלי של 120V (הפוטנציאל באינסוף מוגדר כאפס).",
    instruction:
      "מהו מטענה של המעטפת Q1, ומהי המהירות ההתחלתית המינימלית שיש להעניק לפרוטון באינסוף כדי שיגיע לפני המעטפת?",
    formulaLatex: "R_1 = 10\\text{ cm}, \\quad V(r = 15\\text{ cm}) = 120\\text{ V}",
    options: [
      {
        id: "1",
        plainText: "מטען 2.0nC; מהירות מינימלית כ-1.86 * 10^5 m/s",
        mathText: "Q_1 = 2.0\\text{ nC}, \\quad v_0 \\approx 1.86 \\times 10^5\\text{ m/s}",
        isCorrect: true,
        explanation:
          "מחוץ למעטפת V = kQ/r, ומכאן Q1 = (120*0.15)/k = 2.0 nC. על פני המעטפת (r=0.1m) הפוטנציאל הוא 180V. משימור אנרגיה: 0.5*m_p*v^2 = e*V_surface, ומכאן v_0 = sqrt(2*1.6*10^-19*180 / 1.67*10^-27) כ-1.86*10^5 m/s.",
      },
      {
        id: "2",
        plainText: "מטען 1.33nC; מהירות מינימלית כ-1.52 * 10^5 m/s",
        isCorrect: false,
        explanation:
          "מסיח הנובע מהצבת המרחק מפני המעטפת (5 ס\"מ) במקום המרחק ממרכזה.",
      },
      {
        id: "3",
        plainText: "מטען 2.0nC; מהירות מינימלית כ-1.35 * 10^5 m/s",
        isCorrect: false,
        explanation:
          "מסיח הנובע משימוש בפוטנציאל שבמרחק 15 ס\"מ במקום פוטנציאל פני השטח.",
      },
      {
        id: "4",
        plainText: "מטען 3.0nC; מהירות מינימלית כ-2.40 * 10^5 m/s",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-elec-charge-sharing-wire",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - חלוקת מטענים בין מעטפות",
    context:
      "מעטפת כדורית 1 (רדיוס 10 ס\"מ, מטען 2.0nC) מחוברת בתיל דק וארוך למעטפת 2 (רדיוס 60 ס\"מ, מטען 10.0nC).",
    instruction:
      "מהו המטען הסופי על מעטפת 1 לאחר הגעה לשיווי משקל, וכמה אלקטרונים עברו בתיל?",
    formulaLatex:
      "R_1 = 10\\text{ cm}, \\; Q_1 = 2.0\\text{ nC}, \\quad R_2 = 60\\text{ cm}, \\; Q_2 = 10.0\\text{ nC}",
    options: [
      {
        id: "1",
        plainText: "מטען 6.0 nC; עברו כ-2.5 * 10^10 אלקטרונים ממעטפת 1 ל-2",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחלוקת מטען שווה תוך התעלמות מיחס הרדיוסים.",
      },
      {
        id: "2",
        plainText:
          "מטען כ-1.71 nC; עברו כ-1.79 * 10^9 אלקטרונים ממעטפת 2 למעטפת 1",
        mathText: "Q_1' \\approx 1.71\\text{ nC}, \\quad N_e \\approx 1.79 \\times 10^9",
        isCorrect: true,
        explanation:
          "בשיווי משקל הפוטנציאלים משתווים והמטען מתחלק ביחס הרדיוסים: Q1' = 12nC * (10/70) = 1.714 nC. המטען החיובי על מעטפת 1 קטן ב-0.286 nC, כלומר אלקטרונים עברו ממעטפת 2 למעטפת 1: N = 0.286nC / e = 1.79*10^9.",
      },
      {
        id: "3",
        plainText:
          "מטען כ-1.71 nC; עברו כ-1.79 * 10^9 אלקטרונים ממעטפת 1 למעטפת 2",
        isCorrect: false,
        explanation:
          "מסיח המבלבל בין כיוון הזרם המוסכם לתנועת האלקטרונים.",
      },
      {
        id: "4",
        plainText: "מטען 2.0 nC; לא עברו אלקטרונים",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 2: קיבול וקבלים =================
  {
    id: "phys-elec-capacitor-plate-area",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - קבל לוחות ומתח מקור",
    context:
      "קבל לוחות בעל מרווח של 15 מ\"מ מחובר למקור מתח ישר. בין שתי נקודות בקבל שהמרחק ביניהן 6 מ\"מ נמדד הפרש מתחים של 88V. על הלוח השלילי נאגר מטען של 1.3nC-.",
    instruction: "מהו מתח המקור V, ומהו שטח הלוחות A של הקבל?",
    formulaLatex:
      "d = 15\\text{ mm}, \\quad \\Delta y = 6\\text{ mm}, \\; \\Delta V = 88\\text{ V}, \\quad Q = -1.3\\text{ nC}",
    options: [
      {
        id: "1",
        plainText: "V = 88V, שטח כ-250 סמ\"ר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "V = 220V, שטח כ-40 סמ\"ר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "V = 146.7V, שטח כ-150 סמ\"ר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "V = 220V, שטח כ-100 סמ\"ר (0.01 מ\"ר)",
        mathText: "V = 220\\text{ V}, \\quad A \\approx 1.00 \\times 10^{-2}\\text{ m}^2",
        isCorrect: true,
        explanation:
          "השדה בקבל אחיד: E = 88V / 0.006m = 14,666.7 V/m. מתח המקור הכולל: V = E*d = 14,666.7 * 0.015 = 220V. קיבול הקבל: C = Q/V = 5.91 pF. מתוך C = eps0*A/d מקבלים A = C*d/eps0 = 0.01 מ\"ר (100 סמ\"ר).",
      },
    ],
  },
  {
    id: "phys-elec-braking-particle-separation",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - תנועת מטען בקבל מנותק",
    context:
      "חלקיק בעל מטען q ומסה m נורה מהלוח השלילי של קבל (הטעון למתח 220V) לעבר הלוח החיובי. הקבל נותק ממקור המתח.",
    instruction:
      "מהי המהירות ההתחלתית המינימלית שיש להעניק לחלקיק כדי שיגיע ללוח החיובי, וכיצד תשתנה מהירות זו אם ירחיקו את הלוחות זה מזה?",
    formulaLatex:
      "q = +3.2 \\times 10^{-19}\\text{ C}, \\quad m = 6.64 \\times 10^{-27}\\text{ kg}, \\quad V = 220\\text{ V}",
    options: [
      {
        id: "1",
        plainText:
          "מהירות כ-1.45 * 10^5 m/s; המהירות המינימלית תגדל ככל שמרחיקים את הלוחות",
        mathText: "v_0 \\approx 1.45 \\times 10^5\\text{ m/s}",
        isCorrect: true,
        explanation:
          "עבודת השדה בבלימת החלקיק: 0.5*m*v^2 = q*V, ומכאן v = sqrt(2*q*V/m) = 1.45*10^5 m/s. כשהקבל מנותק, המטען וצפיפותו קבועים ולכן השדה E קבוע. הרחקת הלוחות מגדילה את המרחק d ואת המתח הכולל V=E*d, ולכן נדרשת מהירות גדולה יותר כדי לעבור את כל המרווח.",
      },
      {
        id: "2",
        plainText:
          "מהירות כ-1.45 * 10^5 m/s; המהירות המינימלית לא תשתנה כי המתח נשאר קבוע",
        isCorrect: false,
        explanation:
          "מסיח המניח בטעות שהמתח קבוע (הוא היה קבוע רק לו הקבל נותר מחובר למקור).",
      },
      {
        id: "3",
        plainText: "מהירות כ-2.10 * 10^5 m/s; המהירות תקטן כי הקיבול קטן",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "מהירות כ-1.03 * 10^5 m/s; המהירות תגדל",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 3: מעגלי זרם ישר והספק =================
  {
    id: "phys-elec-wire-resistivity",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - התנגדות סגולית של תיל",
    context:
      "תיל מוליך אוהמי בעל אורך 2 מטרים ושטח חתך 0.45 ממ\"ר מציג אופיין זרם-מתח ליניארי ששיפועו 0.20A/V.",
    instruction: "מהי ההתנגדות הסגולית rho של החומר שממנו עשוי התיל?",
    formulaLatex:
      "L = 2.0\\text{ m}, \\quad A = 0.45\\text{ mm}^2, \\quad \\frac{\\Delta I}{\\Delta V} = 0.20\\text{ A/V}",
    options: [
      {
        id: "1",
        plainText: "rho = 4.50 * 10^-6 Ohm*m",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "rho = 1.125 * 10^-6 Ohm*m",
        mathText: "\\rho = 1.125 \\times 10^{-6}\\,\\Omega\\cdot\\text{m}",
        isCorrect: true,
        explanation:
          "התנגדות התיל היא הופכי השיפוע: R = 1 / 0.20 = 5.0 Ohm. שטח החתך במ\"ר: A = 0.45*10^-6 m^2. לפי R = rho*L/A מקבלים rho = R*A/L = (5.0 * 0.45*10^-6) / 2.0 = 1.125*10^-6 Ohm*m.",
      },
      {
        id: "3",
        plainText: "rho = 2.25 * 10^-7 Ohm*m",
        isCorrect: false,
        explanation: "מסיח הנובע מטעות המרה מיחידות שטח.",
      },
      {
        id: "4",
        plainText: "rho = 5.00 * 10^-6 Ohm*m",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-elec-emf-internal-res-circuits",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - כא\"מ והתנגדות פנימית",
    context:
      "חיבור שני רכיבים בטור למקור מתח הניב מתח הדקים של 4.50V בזרם 0.45A. חיבורם במקביל לאותו מקור הניב מתח הדקים של 3.50V בזרם 1.22A.",
    instruction: "מהם ערכי הכא\"מ E וההתנגדות הפנימית r של מקור המתח?",
    formulaLatex:
      "V_1 = 4.50\\text{ V} \\; (I_1 = 0.45\\text{ A}), \\quad V_2 = 3.50\\text{ V} \\; (I_2 = 1.22\\text{ A})",
    options: [
      {
        id: "1",
        plainText: "E = 6.00V, r = 2.00 Ohm",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "E = 4.50V, r = 0.85 Ohm",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "E = 5.08V, r כ-1.30 Ohm",
        mathText: "\\mathcal{E} = 5.08\\text{ V}, \\quad r \\approx 1.30\\,\\Omega",
        isCorrect: true,
        explanation:
          "משוואות מתח הדקים V = E - Ir: מקבלים E - 0.45r = 4.50 וכן E - 1.22r = 3.50. חיסור המשוואות מניב 0.77r = 1.00 כלומר r = 1.30 Ohm. הצבה נותנת E = 4.50 + 0.45*1.30 = 5.08V.",
      },
      {
        id: "4",
        plainText: "E = 5.50V, r = 1.00 Ohm",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-elec-max-power-parabola",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - הספק מרבי וזרם קצר",
    context:
      "במעגל עם מקור מתח בעל התנגדות פנימית r ועומס משתנה, גרף ההספק המנוצל על העומס כפונקציה של מתח ההדקים הוא פרבולה בעלת נקודת שיא בערכים הנתונים.",
    instruction: "מהם הכא\"מ E, ההתנגדות הפנימית r, וזרם הקצר של מקור המתח?",
    formulaLatex: "V_{\\text{peak}} = 9\\text{ V}, \\quad P_{\\max} = 27\\text{ W}",
    options: [
      {
        id: "1",
        plainText: "E = 9V, r = 1.5 Ohm, זרם קצר 6A",
        isCorrect: false,
        explanation:
          "מסיח המבלבל בין מתח שיא ההספק לכא\"מ המקור.",
      },
      {
        id: "2",
        plainText: "E = 18V, r = 1.5 Ohm, זרם קצר 12A",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "E = 12V, r = 2 Ohm, זרם קצר 6A",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "E = 18V, r = 3 Ohm, זרם קצר 6A",
        mathText:
          "\\mathcal{E} = 18\\text{ V}, \\quad r = 3\\,\\Omega, \\quad I_{\\text{short}} = 6\\text{ A}",
        isCorrect: true,
        explanation:
          "הספק העומס הוא P = V*(E-V)/r. שיא הפרבולה מתקבל ב-V = E/2 = 9V, ומכאן E = 18V. ההספק המרבי הוא P_max = E^2 / (4r) = 27W, ולכן 4r = 18^2 / 27 = 12, כלומר r = 3 Ohm. זרם הקצר: I = E/r = 18/3 = 6A.",
      },
    ],
  },

  // ================= פרק 4: שדות מגנטיים וכוח לורנץ =================
  {
    id: "phys-elec-proton-magnetic-circle",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - תנועת פרוטון בשדה מגנטי",
    context:
      "פרוטון נע במהירות 1.0 * 10^6 מטר לשנייה אופקית ונכנס בניצב לשדה מגנטי אחיד בעוצמה 0.02T המכוון אנכית מטה.",
    instruction:
      "מהם גודל הכוח המגנטי הפועל על הפרוטון, רדיוס מסלולו המעגלי וזמן המחזור של תנועתו?",
    formulaLatex: "v = 1.0 \\times 10^6\\text{ m/s}, \\quad B = 0.02\\text{ T}",
    options: [
      {
        id: "1",
        plainText:
          "כוח של 3.2 * 10^-15 N, רדיוס כ-0.522 מ', זמן מחזור כ-3.28 מיקרו-שניות",
        mathText:
          "F_B = 3.2 \\times 10^{-15}\\text{ N}, \\; R \\approx 0.522\\text{ m}, \\; T \\approx 3.28\\,\\mu\\text{s}",
        isCorrect: true,
        explanation:
          "כוח לורנץ: F = q*v*B = 1.6*10^-19 * 10^6 * 0.02 = 3.2*10^-15 N. רדיוס התנועה: R = m*v / (q*B) = (1.67*10^-27 * 10^6) / (1.6*10^-19 * 0.02) = 0.522 מטר. זמן המחזור: T = 2*pi*m / (q*B) = 3.28*10^-6 שניות.",
      },
      {
        id: "2",
        plainText:
          "כוח של 3.2 * 10^-15 N, רדיוס כ-0.261 מ', זמן מחזור כ-1.64 מיקרו-שניות",
        isCorrect: false,
        explanation:
          "מסיח הנובע מאיבוד פקטור 2 בחישוב זמן המחזור והרדיוס.",
      },
      {
        id: "3",
        plainText: "כוח של 1.6 * 10^-15 N, רדיוס כ-1.044 מ'",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "כוח אפס כי המהירות מקבילה לשדה",
        isCorrect: false,
        explanation:
          "מסיח (השדה אנכי והמהירות אופקית, הזווית ביניהם 90 מעלות).",
      },
    ],
  },
  {
    id: "phys-elec-hanging-rod-magnet",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - כוח על תיל במגנט פרסה",
    context:
      "מוט מוליך שמסתו m תלוי אופקית על שני חוטים אנכיים זהים, כך שקטע באורך 10 ס\"מ עובר בניצב לשדה מגנטי אחיד B. עבור זרם של 1A נמדדה בכל חוט מתיחות של 0.090N, ועבור זרם של 9A נמדדה מתיחות של 0.010N.",
    instruction: "מהם מסת המוט m ועוצמת השדה המגנטי B של המגנט?",
    formulaLatex:
      "L = 10\\text{ cm}, \\quad T(1\\text{ A}) = 0.090\\text{ N}, \\quad T(9\\text{ A}) = 0.010\\text{ N}",
    options: [
      {
        id: "1",
        plainText: "m = 10g, B = 0.10T",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "m = 20g, B = 0.40T",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "m = 40g, B = 0.20T",
        isCorrect: false,
        explanation:
          "מסיח הנובע משכחה לחלק את המשקל בין שני החוטים.",
      },
      {
        id: "4",
        plainText: "m = 20g, B = 0.20T",
        mathText: "m = 20\\text{ g}, \\quad B = 0.20\\text{ T}",
        isCorrect: true,
        explanation:
          "שיווי משקל אנכי: 2T = mg - i*L*B כלומר T = mg/2 - (LB/2)*i. שיפוע הגרף: Delta T / Delta i = -0.010 N/A, ולכן LB/2 = 0.010 -> B = 0.020 / 0.1 = 0.20T. החיתוך עם הציר הוא T(0) = 0.100N, ולכן mg/2 = 0.100N -> mg = 0.200N -> m = 20g.",
      },
    ],
  },

  // ================= פרק 5: השראה אלקטרומגנטית =================
  {
    id: "phys-elec-terminal-velocity-induction",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - מהירות טרמינלית של מוט",
    context:
      "מוט מוליך חופשי לנוע ללא חיכוך על מסילה אופקית המחוברת לנגד R בתוך שדה מגנטי B הניצב למסילה. חוט הכרוך על גלגלת מחבר את המוט למשקולת m היורדת בהשפעת הכובד.",
    instruction:
      "מהו ערכה של המהירות הקבועה (הטרמינלית) שאליה מגיע המוט לאחר זמן מה?",
    formulaLatex:
      "m = 0.05\\text{ kg}, \\quad \\ell = 0.8\\text{ m}, \\quad B = 1.8\\text{ T}, \\quad R = 7.2\\,\\Omega",
    options: [
      {
        id: "1",
        plainText: "מהירות טרמינלית כ-3.47 m/s",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "מהירות טרמינלית כ-1.74 m/s",
        mathText: "v_t \\approx 1.74\\text{ m/s}",
        isCorrect: true,
        explanation:
          "כא\"מ מושרה: E = B*ell*v, וזרם מושרה: I = B*ell*v/R. כוח הבלימה המגנטי: F = B^2*ell^2*v / R. במהירות קבועה כוח זה מאזן את כוח הכובד mg: v_t = (mg*R) / (B^2*ell^2) = (0.05*10*7.2) / (1.8^2 * 0.8^2) = 3.6 / 2.0736 = 1.736 m/s.",
      },
      {
        id: "3",
        plainText: "מהירות טרמינלית כ-0.87 m/s",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "מהירות טרמינלית כ-2.50 m/s",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-elec-solenoid-faraday-flux",
    domain: "ELECTRICITY",
    title: "חשמל ומגנטיות - כא\"מ מושרה בטבעת סביב סילונית",
    context:
      "סילונית ארוכה בעלת רדיוס r וצפיפות ליפופים n מחוברת לזרם חילופין סינוסי. סביב מרכז הסילונית מוצבת טבעת מוליכה בעלת כריכה אחת ורדיוס R (כאשר R גדול מ-r).",
    instruction:
      "מהו הכא\"מ המושרה המרבי בטבעת, וכיצד תלוי ערך זה ברדיוס הטבעת R?",
    formulaLatex:
      "r = 10\\text{ cm}, \\quad n = 4000\\text{ m}^{-1}, \\quad I(t) = 2.42\\sin(314t)\\text{ A}, \\quad R = 12\\text{ cm}",
    options: [
      {
        id: "1",
        plainText: "כ-1.73V ופרופורציוני לשטח הטבעת pi*R^2",
        isCorrect: false,
        explanation:
          "מסיח המניח בטעות שהשדה המגנטי ממלא את כל שטח הטבעת ולא מוגבל לחלל הסילונית בלבד.",
      },
      {
        id: "2",
        plainText: "הכא\"מ מתאפס כי מחוץ לסילונית אין שדה מגנטי",
        isCorrect: false,
        explanation:
          "מסיח הנובע מבלבול בין קיום שדה מקומי על הטבעת לבין שינוי השטף הכולל החודר דרכה.",
      },
      {
        id: "3",
        plainText:
          "כ-1.20V ואינו תלוי ברדיוס הטבעת R אלא ברדיוס הסילונית r בלבד",
        mathText: "\\mathcal{E}_{\\max} \\approx 1.20\\text{ V}",
        isCorrect: true,
        explanation:
          "השדה המגנטי קיים אך ורק בתוך הסילונית ולכן השטף מוגבל לשטחה בלבד: Phi(t) = B(t)*pi*r^2 = mu0*n*pi*r^2 * I0*sin(omega*t). לפי חוק פאראדיי, משרעת הכא\"מ המושרה היא mu0*n*pi*r^2 * I0*omega = (4pi*10^-7)*4000*pi*(0.1)^2 * 2.42 * 314 = 1.205V, והיא אינה תלויה ברדיוס R כל עוד R > r.",
      },
      {
        id: "4",
        plainText: "כ-1.20V אך יגדל עם הגדלת רדיוס הטבעת",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
];


/* -------------------------------------------------------------------------- */
/* BAGRUT — Physics: מכניקה                                                    */
/* -------------------------------------------------------------------------- */

export const BAGRUT_PHYSICS_MECHANICS_QUESTIONS: DiagnosticQuestion[] = [
  // ================= פרק 1: קינמטיקה =================
  {
    id: "phys-mech-two-cars-bus-stop",
    domain: "MECHANICS",
    title: "מכניקה - קינמטיקה בקו ישר",
    context:
      "שתי מכוניות יוצאות בו-זמנית ברגע t=0 מאותה נקודה x=0 ונעות לאורך כביש ישר בכיוון החיובי. מכונית א' מתחילה במהירות 12 מטר לשנייה ומאיטה בתאוצה קבועה עד 8 מטר לשנייה ברגע t=10 שניות, וממשיכה באותה תאוצה עד לעצירה מוחלטת בתחנת אוטובוס.",
    instruction:
      "מהו מרחקה של תחנת האוטובוס מנקודת המוצא, ובאיזה רגע נעצרה בה מכונית א'?",
    formulaLatex: "v_0 = 12\\text{ m/s}, \\quad v(10\\text{ s}) = 8\\text{ m/s}",
    options: [
      {
        id: "1",
        plainText:
          "המרחק הוא 180 מטר, ומכונית א' נעצרה ברגע t = 30 שניות",
        mathText: "x = 180\\text{ m}, \\quad t = 30\\text{ s}",
        isCorrect: true,
        explanation:
          "תאוצת מכונית א': a = (8-12)/10 = -0.4 m/s^2. זמן העצירה מרגע היציאה: t = (0-12)/(-0.4) = 30 שניות. מרחק העצירה הכולל: x = (0^2 - 12^2)/(2 * -0.4) = -144 / -0.8 = 180 מטר.",
      },
      {
        id: "2",
        plainText:
          "המרחק הוא 160 מטר, ומכונית א' נעצרה ברגע t = 25 שניות",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב מרחק שגוי ללא התחשבות בשיפוע ההאטה המלא.",
      },
      {
        id: "3",
        plainText:
          "המרחק הוא 180 מטר, ומכונית א' נעצרה ברגע t = 20 שניות",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב הזמן החל מרגע t=10 במקום מרגע תחילת התנועה.",
      },
      {
        id: "4",
        plainText:
          "המרחק הוא 200 מטר, ומכונית א' נעצרה ברגע t = 30 שניות",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-mech-javelin-projectile",
    domain: "MECHANICS",
    title: "מכניקה - תנועה בליסטית",
    context:
      "כידון מוטל במסלול בליסטי. בשיא גובהו מהירותו אופקית לחלוטין. הכידון פוגע בקרקע בזווית נתונה מתחת לאופק, בהנחה שהתנגדות האוויר זניחה.",
    instruction:
      "מהם גובה השיא מעל נקודת הפגיעה ומהירות הפגיעה הכוללת של הכידון בקרקע?",
    formulaLatex:
      "v_{\\text{top}} = 74\\text{ km/h} \\approx 20.56\\text{ m/s}, \\quad \\theta_{\\text{impact}} = 42^\\circ",
    options: [
      {
        id: "1",
        plainText:
          "גובה שיא כ-19.4 מטר, מהירות פגיעה כ-25.1 מטר לשנייה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "גובה שיא כ-17.1 מטר, מהירות פגיעה כ-27.7 מטר לשנייה",
        mathText: "H \\approx 17.1\\text{ m}, \\quad v \\approx 27.7\\text{ m/s}",
        isCorrect: true,
        explanation:
          "המהירות האופקית קבועה: vx = 74/3.6 = 20.556 m/s. הרכיב האנכי בפגיעה: vy = vx * tan(42°) = 20.556 * 0.9004 = 18.51 m/s. מהירות הפגיעה השקולה: v = vx / cos(42°) = 27.66 m/s. גובה השיא: H = vy^2 / (2g) = 18.51^2 / 20 = 17.13 מטר.",
      },
      {
        id: "3",
        plainText:
          "גובה שיא כ-17.1 מטר, מהירות פגיעה כ-20.6 מטר לשנייה",
        isCorrect: false,
        explanation:
          "מסיח המבלבל בין מהירות הפגיעה הכוללת למהירות האופקית בלבד.",
      },
      {
        id: "4",
        plainText:
          "גובה שיא כ-13.8 מטר, מהירות פגיעה כ-27.7 מטר לשנייה",
        isCorrect: false,
        explanation: "מסיח הנובע מחישוב גובה שגוי.",
      },
    ],
  },

  // ================= פרק 2: דינמיקה וחוקי ניוטון =================
  {
    id: "phys-mech-box-friction-linear-fit",
    domain: "MECHANICS",
    title: "מכניקה - חוקי ניוטון וחיכוך",
    context:
      "תיבה שמסתה m מונחת על משטח אופקי בעל מקדם חיכוך קינטי mu. מושכים את התיבה בכוח אופקי F המשתנה מניסוי לניסוי ומודדים את תאוצתה. התקבל קשר ליניארי בין הכוח לתאוצה.",
    instruction: "מהם מסת התיבה ומקדם החיכוך הקינטי של המשטח?",
    formulaLatex:
      "F_1 = 3.5\\text{ N} \\implies a_1 = 1.9\\text{ m/s}^2, \\quad F_2 = 5.5\\text{ N} \\implies a_2 = 5.0\\text{ m/s}^2",
    options: [
      {
        id: "1",
        plainText: 'מסה כ-0.50 ק"ג, מקדם חיכוך כ-0.20',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: 'מסה כ-0.65 ק"ג, מקדם חיכוך כ-0.54',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: 'מסה כ-0.65 ק"ג, מקדם חיכוך כ-0.35',
        mathText: "m \\approx 0.65\\text{ kg}, \\quad \\mu \\approx 0.35",
        isCorrect: true,
        explanation:
          "משוואת התנועה: a = (1/m)F - mu*g. שיפוע הישר הוא 1/m = (5.0 - 1.9)/(5.5 - 3.5) = 3.1 / 2.0 = 1.55 kg^-1, ומכאן m = 1/1.55 = 0.645 ק\"ג. הצבת הנתון הראשון: 1.9 = 1.55*3.5 - 10*mu, ומכאן 10*mu = 5.425 - 1.9 = 3.525, כלומר mu = 0.35.",
      },
      {
        id: "4",
        plainText: 'מסה כ-1.55 ק"ג, מקדם חיכוך כ-0.35',
        isCorrect: false,
        explanation:
          "מסיח הנובע מבלבול בין מסת הגוף לשיפוע הגרף (1/m).",
      },
    ],
  },
  {
    id: "phys-mech-atwood-mass-ratio",
    domain: "MECHANICS",
    title: "מכניקה - מכונת אטווד",
    context:
      "במכונת אטווד אידיאלית תלויות שתי מסות משני צידי גלגלת חסרת חיכוך ומסה. המערכת משוחררת ממנוחה, והמסה הגדולה יורדת מרחק של מטר אחד במשך השנייה הראשונה לתנועתה.",
    instruction: "מהו היחס בין שתי המסות במערכת?",
    formulaLatex: "\\Delta y(1\\text{ s}) = 1\\text{ m}, \\quad m_1 > m_2",
    options: [
      {
        id: "1",
        plainText: "יחס מסות של 1.25",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "יחס מסות של 2.00",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "יחס מסות של 1.20",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "יחס מסות של 1.50",
        mathText: "\\frac{m_1}{m_2} = 1.50",
        isCorrect: true,
        explanation:
          "מתוך נוסחת המרחק: Delta y = 0.5 * a * t^2 -> 1 = 0.5 * a * 1^2, ומכאן תאוצת המערכת היא a = 2 m/s^2. במכונת אטווד: a = g * (m1 - m2)/(m1 + m2). לכן 2 = 10 * (m1 - m2)/(m1 + m2) -> m1 + m2 = 5m1 - 5m2 -> 4m1 = 6m2 -> m1/m2 = 1.5.",
      },
    ],
  },
  {
    id: "phys-mech-incline-up-down-accel",
    domain: "MECHANICS",
    title: "מכניקה - תנועה במישור משופע עם חיכוך",
    context:
      "מעניקים לגוף מהירות התחלתית במעלה מישור משופע בעל זווית שיפוע ומקדם חיכוך קינטי. הגוף עולה עד לעצירה רגעית ומחליק חזרה מטה.",
    instruction:
      "מהו היחס בין גודל תאוצת הגוף בעלייה לגודל תאוצתו בירידה?",
    formulaLatex: "\\alpha, \\quad \\mu_k",
    options: [
      {
        id: "1",
        plainText:
          "תאוצת העלייה קטנה מתאוצת הירידה כיוון שבירידה הגוף צובר מהירות",
        isCorrect: false,
        explanation:
          "מסיח המבלבל בין צבירת מהירות לגודל תאוצה.",
      },
      {
        id: "2",
        plainText: "תאוצת העלייה גדולה מתאוצת הירידה תמיד",
        mathText:
          "a_u = g(\\sin\\alpha + \\mu_k\\cos\\alpha) > a_d = g(\\sin\\alpha - \\mu_k\\cos\\alpha)",
        isCorrect: true,
        explanation:
          "כוח החיכוך פועל תמיד בניגוד לכיוון התנועה: בעלייה כוח החיכוך פועל במורד המישור ומצטרף לרכיב משקל הגוף, בעוד שבירידה כוח החיכוך פועל במעלה המישור ומתנגד לרכיב המשקל. לכן תמיד au > ad.",
      },
      {
        id: "3",
        plainText:
          "שתי התאוצות שוות ל-g*sin(alpha) כי חיכוך משפיע רק על אנרגיה",
        isCorrect: false,
        explanation:
          "מסיח המתעלם מכך שחיכוך הוא כוח חיצוני בלתי משמר המשפיע על משוואת ניוטון.",
      },
      {
        id: "4",
        plainText:
          "תאוצת העלייה גדולה מתאוצת הירידה רק אם זווית השיפוע גדולה מ-45 מעלות",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 3: תנועה מעגלית =================
  {
    id: "phys-mech-rotating-arm-pendulum",
    domain: "MECHANICS",
    title: "מכניקה - תנועה מעגלית אופקית",
    context:
      'מתקן מסתובב מורכב מזרוע אופקית באורך 3 מטרים המחוברת לציר אנכי. בקצה הזרוע קשור חוט באורך מטר אחד שבקצהו גוף שמסתו 2 ק"ג. בסיבוב בתדירות קבועה f החוט נטוי בזווית של 30 מעלות לאנך.',
    instruction:
      "מהם רדיוס המסלול המעגלי של הגוף, מתיחות החוט, ותדירות הסיבוב של המתקן?",
    formulaLatex:
      "a = 3\\text{ m}, \\quad l = 1\\text{ m}, \\quad m = 2\\text{ kg}, \\quad \\alpha = 30^\\circ",
    options: [
      {
        id: "1",
        plainText:
          "רדיוס 3.5 מטר, מתיחות כ-23.1 ניוטון, תדירות כ-0.204 הרץ",
        mathText:
          "R = 3.5\\text{ m}, \\quad T \\approx 23.1\\text{ N}, \\quad f \\approx 0.204\\text{ Hz}",
        isCorrect: true,
        explanation:
          "רדיוס המסלול: R = a + l*sin(30°) = 3 + 0.5 = 3.5 מטר. ציר אנכי: T*cos(30°) = mg -> T = 20 / cos(30°) = 23.09 N. ציר רדיאלי: T*sin(30°) = m*omega^2*R -> omega^2 = (g*tan(30°))/R = (10*0.577)/3.5 = 1.65, ומכאן omega = 1.284 rad/s. תדירות הסיבוב: f = omega/(2pi) = 0.204 Hz.",
      },
      {
        id: "2",
        plainText:
          "רדיוס 3.0 מטר, מתיחות 20.0 ניוטון, תדירות כ-0.290 הרץ",
        isCorrect: false,
        explanation:
          "מסיח הנובע מהתעלמות מרכיב אורך החוט בהגדרת הרדיוס.",
      },
      {
        id: "3",
        plainText:
          "רדיוס 3.5 מטר, מתיחות כ-23.1 ניוטון, תדירות כ-1.28 הרץ",
        isCorrect: false,
        explanation:
          "מסיח המבלבל בין תדירות זוויתית (omega) לתדירות בסיבובים לשנייה (f).",
      },
      {
        id: "4",
        plainText:
          "רדיוס 3.86 מטר, מתיחות 40.0 ניוטון, תדירות כ-0.150 הרץ",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 4: מתקף ותנע =================
  {
    id: "phys-mech-momentum-two-boxes",
    domain: "MECHANICS",
    title: "מכניקה - שימור תנע בהתנגשות",
    context:
      "שתי תיבות נעות זו לקראת זו על משטח אופקי חלק ומתנגשות ביניהן. נתונות מסת תיבה A ומהירויות שתי התיבות לפני ההתנגשות ולאחריה (הכיוון החיובי מוגדר ימינה).",
    instruction: "מהי מסתה של תיבה B?",
    formulaLatex:
      "m_A = 0.14\\text{ kg}, \\; u_A = +3.0\\text{ m/s}, \\; v_A = +1.0\\text{ m/s}, \\quad u_B = -1.5\\text{ m/s}, \\; v_B = +5.5\\text{ m/s}",
    options: [
      {
        id: "1",
        plainText: 'מסה של 0.07 ק"ג',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: 'מסה של 0.04 ק"ג (40 גרם)',
        mathText: "m_B = 0.04\\text{ kg} = 40\\text{ g}",
        isCorrect: true,
        explanation:
          "לפי חוק שימור התנע: mA*Delta vA + mB*Delta vB = 0. שינוי מהירות A: Delta vA = 1.0 - 3.0 = -2.0 m/s. שינוי מהירות B: Delta vB = 5.5 - (-1.5) = +7.0 m/s. לכן 0.14*(-2.0) + mB*(7.0) = 0 -> 7*mB = 0.28 -> mB = 0.04 ק\"ג (40 גרם).",
      },
      {
        id: "3",
        plainText: 'מסה של 0.08 ק"ג',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: 'מסה של 0.02 ק"ג',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-mech-elastic-collision-target",
    domain: "MECHANICS",
    title: "מכניקה - התנגשות אלסטית",
    context:
      'גוף B בעל מסה 0.2 ק"ג נע ימינה על מסילה חלקה ומתנגש התנגשות אלסטית לחלוטין בגוף C הנמצא במנוחה. בעקבות ההתנגשות גוף B חוזר שמאלה במהירות שגודלה מחצית ממהירותו לפני ההתנגשות.',
    instruction: "מהי מסתו של גוף C?",
    formulaLatex:
      "m_B = 0.2\\text{ kg}, \\quad v_B' = -0.5 v_B, \\quad v_C = 0",
    options: [
      {
        id: "1",
        plainText: 'מסה של 0.4 ק"ג',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: 'מסה של 0.3 ק"ג',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: 'מסה של 0.6 ק"ג',
        mathText: "m_C = 0.6\\text{ kg}",
        isCorrect: true,
        explanation:
          "בהתנגשות אלסטית חד-ממדית עם גוף במנוחה מתקיים: vB' = (mB - mC)/(mB + mC) * vB. נתון vB' = -0.5 vB, ולכן (mB - mC)/(mB + mC) = -0.5 -> mB - mC = -0.5mB - 0.5mC -> 1.5mB = 0.5mC -> mC = 3*mB = 3*0.2 = 0.6 ק\"ג.",
      },
      {
        id: "4",
        plainText: 'מסה של 0.8 ק"ג',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 5: עבודה ואנרגיה =================
  {
    id: "phys-mech-work-energy-variable-force",
    domain: "MECHANICS",
    title: "מכניקה - משפט עבודה ואנרגיה",
    context:
      'גוף שמסתו 2 ק"ג מונח על משטח אופקי עם חיכוך קינטי (mu=0.2). מפעילים עליו כוח אופקי: 5 ניוטון לאורך 3 המטרים הראשונים, ועולה ליניארית מ-5 ל-15 ניוטון בשני המטרים הבאים. בנקודה x=5m הכוח מפסיק לפעול והגוף מחליק תחת חיכוך בלבד עד לעצירה.',
    instruction:
      "מהם מהירות הגוף בנקודה שבה נפסק הכוח ומיקום נקודת העצירה הסופית שלו?",
    formulaLatex:
      "m = 2\\text{ kg}, \\quad \\mu = 0.2, \\quad x_A = 5\\text{ m}",
    options: [
      {
        id: "1",
        plainText:
          "מהירות 5.00 מטר לשנייה, מיקום עצירה 10.25 מטר",
        isCorrect: false,
        explanation:
          "מסיח הנובע מאיבוד עבודת החיכוך בחלק הראשון של התנועה.",
      },
      {
        id: "2",
        plainText:
          "מהירות כ-3.87 מטר לשנייה, מיקום עצירה 7.50 מטר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "מהירות כ-4.24 מטר לשנייה, מיקום עצירה 9.50 מטר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "מהירות כ-3.87 מטר לשנייה, מיקום עצירה 8.75 מטר",
        mathText:
          "v_A \\approx 3.87\\text{ m/s}, \\quad x_B = 8.75\\text{ m}",
        isCorrect: true,
        explanation:
          "עבודת הכוח: WF = (5*3) + ((5+15)/2)*2 = 15 + 20 = 35 J. עבודת החיכוך עד x=5m: Wf1 = -mu*m*g*x = -0.2*2*10*5 = -20 J. האנרגיה הקינטית ב-A: EkA = 35 - 20 = 15 J -> vA = sqrt(2*15/2) = sqrt(15) = 3.87 m/s. מנקודה A ועד העצירה: עבודת החיכוך שווה למינוס האנרגיה הקינטית: -f_k * Delta x = -15 -> 4 * Delta x = 15 -> Delta x = 3.75 m. מיקום העצירה: xB = 5 + 3.75 = 8.75 מטר.",
      },
    ],
  },
  {
    id: "phys-mech-vertical-loop-min-height",
    domain: "MECHANICS",
    title: "מכניקה - לולאה מעגלית אנכית",
    context:
      'גוף קטן משוחרר ממנוחה מגובה H מעל תחתית מסילה חלקה הכוללת לולאה מעגלית אנכית שרדיוסה 10 ס"מ.',
    instruction:
      "מהו הגובה המינימלי שממנו יש לשחרר את הגוף כדי שישלים את הסיבוב בלולאה מבלי להתנתק ממנה בשיאה?",
    formulaLatex: "r = 10\\text{ cm}, \\quad v_{\\text{top}}^2 \\ge gr",
    options: [
      {
        id: "1",
        plainText: 'גובה מינימלי של 25 ס"מ (0.25 מטר)',
        mathText: "H_{\\min} = 25\\text{ cm} = 0.25\\text{ m}",
        isCorrect: true,
        explanation:
          'תנאי אי-התנתקות בשיא הלולאה (בגובה 2r) הוא שהכוח הנורמלי אי-שלילי: m*v^2/r >= mg -> v^2 >= gr. משימור אנרגיה בין נקודת השחרור לשיא הלולאה: mgH = mg(2r) + 0.5*m*v^2. הצבת תנאי הקצה נותנת mgH = 2mgr + 0.5mgr = 2.5mgr -> H_min = 2.5r = 2.5 * 10 = 25 ס"מ.',
      },
      {
        id: "2",
        plainText: 'גובה מינימלי של 20 ס"מ (0.20 מטר)',
        isCorrect: false,
        explanation:
          "מסיח המייצג שחרור מגובה שיא הלולאה (2r) בדיוק, שבו המהירות בשיא תהיה אפס והגוף ייפול.",
      },
      {
        id: "3",
        plainText: 'גובה מינימלי של 30 ס"מ (0.30 מטר)',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: 'גובה מינימלי של 15 ס"מ (0.15 מטר)',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 6: תנועה הרמונית פשוטה =================
  {
    id: "phys-mech-harmonic-oscillator-spring",
    domain: "MECHANICS",
    title: "מכניקה - מתנד הרמוני אופקי",
    context:
      'גוף שמסתו 0.5 ק"ג מחובר לקפיץ אופקי ומתנדנד ללא חיכוך. נמדד הכוח המחזיר כפונקציה של ההעתק: ב-x=0.6m פועל כוח של 9.4N-, וב-x=-0.5m פועל כוח של 7.8N. משרעת התנודה היא 0.6 מטר.',
    instruction:
      "מהם קבוע הקפיץ, התדירות הזוויתית, וגודל המהירות המרבית של הגוף במעבר בנקודת שיווי המשקל?",
    formulaLatex: "m = 0.5\\text{ kg}, \\quad A = 0.6\\text{ m}",
    options: [
      {
        id: "1",
        plainText:
          "קבוע קפיץ כ-10.0 N/m, תדירות זוויתית כ-4.47 rad/s, מהירות מרבית כ-2.68 m/s",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "קבוע קפיץ כ-15.6 N/m, תדירות זוויתית כ-31.3 rad/s, מהירות מרבית כ-18.8 m/s",
        isCorrect: false,
        explanation:
          "מסיח הנובע מאי-הוצאת שורש בחישוב התדירות הזוויתית.",
      },
      {
        id: "3",
        plainText:
          "קבוע קפיץ כ-15.6 N/m, תדירות זוויתית כ-5.6 rad/s, מהירות מרבית כ-3.36 m/s",
        mathText:
          "k \\approx 15.6\\text{ N/m}, \\quad \\omega \\approx 5.6\\text{ rad/s}, \\quad v_{\\max} \\approx 3.36\\text{ m/s}",
        isCorrect: true,
        explanation:
          "קבוע הקפיץ מחושב משיפוע הכוח: k = Delta F / Delta x = (9.4 - (-7.8))/(0.6 - (-0.5)) = 17.2 / 1.1 = 15.64 N/m. התדירות הזוויתית: omega = sqrt(k/m) = sqrt(15.64/0.5) = sqrt(31.28) = 5.59 rad/s. המהירות המרבית בנקודת שיווי המשקל: vmax = omega * A = 5.59 * 0.6 = 3.36 m/s.",
      },
      {
        id: "4",
        plainText:
          "קבוע קפיץ כ-15.6 N/m, תדירות זוויתית כ-5.6 rad/s, מהירות מרבית כ-1.68 m/s",
        isCorrect: false,
        explanation: "מסיח הנובע משימוש במחצית המשרעת.",
      },
    ],
  },

  // ================= פרק 7: כבידה ולוויינים =================
  {
    id: "phys-mech-kepler-third-law-ratio",
    domain: "MECHANICS",
    title: "מכניקה - כבידה וחוקי קפלר",
    context: "שניים מירחיו של אורנוס נעים במסלולים מעגליים ברדיוסים נתונים.",
    instruction:
      "מהו היחס בין זמני המחזור של שני הירחים, ומה יהיה היחס בין זמני המחזור של שני לוויינים שינועו סביב כדור הארץ באותם רדיוסים בהתאמה?",
    formulaLatex:
      "r_1 = 1.3 \\times 10^8\\text{ m}, \\quad r_2 = 1.9 \\times 10^8\\text{ m}",
    options: [
      {
        id: "1",
        plainText:
          "יחס זמני מחזור כ-1.46; סביב כדור הארץ היחס יהיה שונה",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחילוק ישיר של הרדיוסים (r2/r1) ללא העלאה בחזקת 1.5.",
      },
      {
        id: "2",
        plainText:
          "יחס זמני מחזור כ-2.13; סביב כדור הארץ היחס יהיה זהה",
        isCorrect: false,
        explanation:
          "מסיח הנובע מהעלאת יחס הרדיוסים בריבוע במקום בחזקת 1.5.",
      },
      {
        id: "3",
        plainText:
          "יחס זמני מחזור כ-1.77; סביב כדור הארץ היחס יהיה קטן בהרבה בגלל מסת כדור הארץ",
        isCorrect: false,
        explanation:
          "מסיח המתעלם מכך שמסת הגוף המרכזי מצטמצמת בחישוב יחס זמני המחזור באותם רדיוסים.",
      },
      {
        id: "4",
        plainText:
          "יחס זמני מחזור כ-1.77; סביב כדור הארץ היחס יהיה זהה לחלוטין (1.77)",
        mathText: "\\frac{T_2}{T_1} \\approx 1.77",
        isCorrect: true,
        explanation:
          "לפי חוק קפלר השלישי מתקיים T^2 / r^3 = 4pi^2 / (G*M). לכן עבור שני גופים המקיפים את אותו גרם שמיים: T2/T1 = (r2/r1)^1.5 = (1.9/1.3)^1.5 = (1.4615)^1.5 = 1.767 כ-1.77. מכיוון שהיחס תלוי אך ורק ברדיוסי המסלול (מסת הכוכב המרכזי מצטמצמת ביחס), שני לוויינים שיקיפו את כדור הארץ באותם הרדיוסים יציגו בדיוק את אותו יחס זמני מחזור (1.77).",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* BAGRUT — Physics: קרינה וחומר (waves / modern / optics)                     */
/* -------------------------------------------------------------------------- */

export const BAGRUT_PHYSICS_WAVES_QUESTIONS: DiagnosticQuestion[] = [
  // ================= פרק 1: אופטיקה גלית =================
  {
    id: "phys-waves-interference-water",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - התאבכות גלי מים",
    context:
      'שני מקורות נקודתיים מתנודדים באמבט גלים באותה תדירות ומופע. נקודה A נמצאת על קו המקסימום הראשון (n=1), ומרחקיה מהמקורות הם 29.0 ס"מ ו-30.0 ס"מ. מהירות הגלים היא 3.0 ס"מ לשנייה.',
    instruction:
      "מהם אורך הגל ותדירות התנודות, ומה יקרה למרחק בין קווי המקסימום אם תוכפל התדירות?",
    formulaLatex:
      "S_1 A = 29.0\\text{ cm}, \\quad S_2 A = 30.0\\text{ cm}, \\quad v = 3.0\\text{ cm/s}, \\quad n=1",
    options: [
      {
        id: "1",
        plainText:
          'אורך גל 1.0 ס"מ, תדירות 3.0 הרץ; המרחק בין קווי המקסימום יקטן פי 2',
        mathText: "\\lambda = 1.0\\text{ cm}, \\; f = 3.0\\text{ Hz}",
        isCorrect: true,
        explanation:
          'הפרש המרחקים עבור קו מקסימום ראשון מקיים Delta r = n*lambda = 1*lambda, ולכן אורך הגל הוא 30.0 - 29.0 = 1.0 ס"מ. התדירות: f = v/lambda = 3.0 / 1.0 = 3.0 Hz. המרחק הזוויתי/הקטורי בין קווי המקסימום פרופורציוני לאורך הגל (x ~ lambda = v/f), ולכן הכפלת התדירות תקטין את המרווחים פי 2.',
      },
      {
        id: "2",
        plainText:
          'אורך גל 0.5 ס"מ, תדירות 6.0 הרץ; המרחק בין קווי המקסימום יוכפל',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          'אורך גל 1.0 ס"מ, תדירות 3.0 הרץ; המרחק בין קווי המקסימום לא ישתנה',
        isCorrect: false,
        explanation:
          "מסיח הנובע מהתעלמות מתלות הפיזור הגיאומטרי באורך הגל.",
      },
      {
        id: "4",
        plainText:
          'אורך גל 2.0 ס"מ, תדירות 1.5 הרץ; המרחק בין קווי המקסימום יקטן פי 2',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-waves-young-double-slit-colors",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - ניסוי יאנג וצבעי אור",
    context:
      'בניסוי שני הסדקים באור כחול ואדום, אורך הגל של האדום גדול ב-200 ננומטר מזה של הכחול. בתבנית ההתאבכות, רוחבם של 2 פסי אור אדום זהה לרוחבם של 3 פסי אור כחול. רוחב פס כחול בודד הוא 0.8 ס"מ (0.008 מטר), ומרחק המרקע 1.5 מטרים.',
    instruction:
      "מהם אורכי הגל של שני הצבעים והמרחק d בין שני החריצים?",
    formulaLatex:
      "\\lambda_R = \\lambda_B + 200\\text{ nm}, \\quad 2\\Delta x_R = 3\\Delta x_B, \\quad L = 1.5\\text{ m}",
    options: [
      {
        id: "1",
        plainText: 'אורכי גל 400 ו-600 ננומטר, מרחק 0.075 מ"מ',
        mathText:
          "\\lambda_B = 400\\text{ nm}, \\quad \\lambda_R = 600\\text{ nm}, \\quad d = 0.075\\text{ mm}",
        isCorrect: true,
        explanation:
          'רוחב הפס Delta x יחסי לאורך הגל. לכן 2*lambda_R = 3*lambda_B. נציב את הקשר ונקבל: 2(lambda_B + 200) = 3*lambda_B, שמניב lambda_B = 400 nm ו-lambda_R = 600 nm. מרחק החריצים הוא d = (lambda_B * L)/Delta x_B = (400*10^-9 * 1.5)/0.008 = 7.5*10^-5 מטר, כלומר 0.075 מ"מ.',
      },
      {
        id: "2",
        plainText: 'אורכי גל 400 ו-600 ננומטר, מרחק 0.75 מ"מ',
        isCorrect: false,
        explanation:
          "מסיח הנובע משגיאת סדר גודל בהמרת היחידות.",
      },
      {
        id: "3",
        plainText: 'אורכי גל 300 ו-500 ננומטר, מרחק 0.056 מ"מ',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: 'אורכי גל 500 ו-700 ננומטר, מרחק 0.094 מ"מ',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-waves-microwaves-diffraction",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - התאבכות גלי מיקרו",
    context:
      "מקור גלי מיקרו מוצב מול שני סדקים (d=5.0cm). אנטנה הנעה במקביל במרחק מטר אחד מוצאת את המקסימום הראשון (m=1) במרחק של 24.75 ס\"מ מהמרכז.",
    instruction:
      "מהו אורך הגל המדויק (ללא קירוב זוויות קטנות) של גלי המיקרו?",
    formulaLatex:
      "d = 5.0\\text{ cm}, \\quad L = 100\\text{ cm}, \\quad x_1 = 24.75\\text{ cm}",
    options: [
      {
        id: "1",
        plainText: 'אורך הגל כ-1.24 ס"מ',
        isCorrect: false,
        explanation:
          'מסיח הנובע משימוש שגוי בקירוב זוויות קטנות: lambda = d * (x/L) הנותן כ-1.2375 ס"מ, מה שאינו מדויק כאן.',
      },
      {
        id: "2",
        plainText: 'אורך הגל כ-1.20 ס"מ',
        mathText: "\\lambda \\approx 1.20\\text{ cm}",
        isCorrect: true,
        explanation:
          'זווית המקסימום מקיימת tan(theta) = x1/L = 24.75/100 = 0.2475. לפי טריגונומטריה, sin(theta) = 0.2475 / sqrt(1 + 0.2475^2) = 0.2402. תנאי ההתאבכות: d*sin(theta) = 1*lambda -> lambda = 5.0 * 0.2402 = 1.201 ס"מ.',
      },
      {
        id: "3",
        plainText: 'אורך הגל כ-2.40 ס"מ',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: 'אורך הגל כ-0.60 ס"מ',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 2: אופטיקה גאומטרית =================
  {
    id: "phys-waves-lenses-virtual-image",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - עדשה מרכזת ודמות מדומה",
    context:
      'עדשה מרכזת דקה בעלת מרחק מוקד f = 25.0 cm. מוצב עצם על הציר האופטי במרחק של 20.0 ס"מ מן העדשה.',
    instruction: "מהן תכונות הדמות הנוצרת ומיקומה (v)?",
    formulaLatex: "f = +25.0\\text{ cm}, \\quad u = 20.0\\text{ cm}",
    options: [
      {
        id: "1",
        plainText: "v = +100 cm; דמות ממשית, הפוכה ומוגדלת פי 5",
        isCorrect: false,
        explanation: "מסיח הנובע מטעות סימן במשוואת גאוס.",
      },
      {
        id: "2",
        plainText:
          "לא נוצרת דמות כלל כיוון שהעצם קרוב ממרחק המוקד",
        isCorrect: false,
        explanation:
          "מסיח המניח שבמרחק הקטן מ-f לא נוצרת דמות (היא אכן לא נוצרת רק במוקד עצמו).",
      },
      {
        id: "3",
        plainText: "v = -100 cm; דמות מדומה, ישרה ומוגדלת פי 5",
        mathText: "v = -100\\text{ cm}, \\quad M = 5",
        isCorrect: true,
        explanation:
          'הצבה בנוסחת גאוס: 1/v = 1/f - 1/u = 1/25 - 1/20 = -1/100, ומכאן v = -100 ס"מ. הסימן השלילי מציין דמות מדומה (נוצרת באותו צד של העצם). בעדשה מרכזת דמות מדומה היא תמיד ישרה. ההגדלה הקווית היא |v/u| = 100/20 = 5.',
      },
      {
        id: "4",
        plainText: "v = -11.1 cm; דמות מדומה, ישרה ומוקטנת",
        isCorrect: false,
        explanation: "מסיח האופייני לעדשה מפזרת (f < 0).",
      },
    ],
  },

  // ================= פרק 3: האפקט הפוטואלקטרי =================
  {
    id: "phys-waves-photoelectric-work-function",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - מתח עצירה ואורך גל",
    context:
      "בניסוי פוטואלקטרי, גרף מתח העצירה כפונקציה של 1 חלקי אורך הגל חותך את הציר האופקי בערך 1.60 * 10^6 מטר בחזקת מינוס אחת. עבור אורך גל 400 ננומטר נמדד מתח עצירה של 1.12 וולט.",
    instruction:
      "מהם קבוע פלאנק (h) שהתקבל בניסוי, ופונקציית העבודה של המתכת?",
    formulaLatex:
      "\\frac{1}{\\lambda_0} = 1.60 \\times 10^6\\text{ m}^{-1}, \\quad V_0(\\lambda = 400\\text{ nm}) = 1.12\\text{ V}",
    options: [
      {
        id: "1",
        plainText:
          "קבוע פלאנק כ-6.63 * 10^-34, פונקציית עבודה כ-1.12 eV",
        isCorrect: false,
        explanation:
          "מסיח המבלבל בין פונקציית העבודה לאנרגיה הקינטית (שערכה 1.12 eV ב-400nm).",
      },
      {
        id: "2",
        plainText:
          "קבוע פלאנק כ-4.14 * 10^-34, פונקציית עבודה כ-3.10 eV",
        isCorrect: false,
        explanation:
          "מסיח המבלבל עם ערך קבוע פלאנק ב-eV*s.",
      },
      {
        id: "3",
        plainText:
          "קבוע פלאנק כ-5.85 * 10^-34, פונקציית עבודה כ-2.45 eV",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "קבוע פלאנק כ-6.63 * 10^-34, פונקציית עבודה כ-1.98 eV",
        mathText:
          "h \\approx 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}, \\quad W \\approx 1.98\\text{ eV}",
        isCorrect: true,
        explanation:
          "משוואת איינשטיין: V_0 = (hc/e)*(1/lambda) - W/e. שיפוע הגרף: 1.12 / ((2.50 - 1.60)*10^6) = 1.244*10^-6 V*m. מכאן h = (e * Slope) / c = (1.6*10^-19 * 1.244*10^-6) / 3*10^8 = 6.63*10^-34 J*s. פונקציית העבודה ב-eV שווה לחיתוך האופקי: W = hc*(1/lambda_0) = 1240 * (1.6*10^-3) = 1.984 eV.",
      },
    ],
  },
  {
    id: "phys-waves-photoelectric-light-intensity",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - עוצמת אור ואפקט פוטואלקטרי",
    context:
      "אלומת אור פוגעת בתא פוטואלקטרי וגורמת לפליטת אלקטרונים. מכפילים פי 2 את עוצמת האור (הספק) מבלי לשנות את תדירותו (אנרגיית פוטון בודד).",
    instruction:
      "כיצד יושפעו זרם הרוויה ומתח העצירה משינוי זה?",
    options: [
      {
        id: "1",
        plainText:
          "מתח העצירה יוכפל פי 2, זרם הרוויה לא ישתנה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "זרם הרוויה יוכפל פי 2, בעוד מתח העצירה יישאר ללא שינוי",
        isCorrect: true,
        explanation:
          "עוצמת האור היא מספר הפוטונים ביחידת זמן. הכפלתה מכפילה את קצב הפליטה (זרם הרוויה). מכיוון שהתדירות נותרה קבועה, האנרגיה הקינטית של כל פוטואלקטרון (ומכאן גם מתח העצירה הנדרש לבלימתו) אינה משתנה כלל (eV0 = hf - W).",
      },
      {
        id: "3",
        plainText:
          "גם זרם הרוויה וגם מתח העצירה יוכפלו פי 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "זרם הרוויה יגדל פי 4, ומתח העצירה יישאר קבוע",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 4: רמות אנרגיה ומבנה האטום =================
  {
    id: "phys-waves-mercury-excitation-photon-electron",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - עירור אטום כספית",
    context:
      "רמות האנרגיה של אטום כספית: E1 = -10.4 eV (רמת יסוד), E2 = -5.5 eV, E3 = -3.7 eV. שולחים פעם אחת פוטון באנרגיה של 5.5 eV, ופעם אחרת אלקטרון חופשי באותה אנרגיה קינטית לעבר אטום ברמת היסוד.",
    instruction: "מה יקרה בכל אחד מהמקרים?",
    formulaLatex:
      "E_1 = -10.4\\text{ eV}, \\quad E_2 = -5.5\\text{ eV}, \\quad E_3 = -3.7\\text{ eV}",
    options: [
      {
        id: "1",
        plainText:
          "הפוטון יעורר לרמה n=2; האלקטרון לא יעורר",
        isCorrect: false,
        explanation:
          "מסיח השוגה בכללים הקוונטיים של בליעה: הפוטון חייב להתאים בדיוק להפרש.",
      },
      {
        id: "2",
        plainText:
          "גם הפוטון וגם האלקטרון יעוררו את האטום לרמה 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "הפוטון לא יעורר; האלקטרון יעורר לרמה 2 ויירתע עם 0.6 eV",
        mathText: "\\Delta E = 4.9\\text{ eV}",
        isCorrect: true,
        explanation:
          "פוטון נבלע בבליעה של 'הכל או כלום' ויכול להתקיים רק אם אנרגייתו שווה בדיוק להפרש בין רמות. ההפרש E2 - E1 הוא 4.9 eV, והפוטון הנושא 5.5 eV לא ייבלע כלל. אלקטרון חופשי לעומתו יכול להתנגש אי-אלסטית, למסור 4.9 eV לצורך עירור, ולהמשיך לנוע עם היתרה (5.5 - 4.9 = 0.6 eV).",
      },
      {
        id: "4",
        plainText:
          "הפוטון יינן את האטום; האלקטרון יתנגש אלסטית בלבד",
        isCorrect: false,
        explanation: "מסיח (כדי ליינן יש לספק 10.4 eV).",
      },
    ],
  },
  {
    id: "phys-waves-hydrogen-balmer-series",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - פליטה באטום מימן",
    context:
      "אטומי מימן ברמת היסוד מופגזים באלקטרונים בעלי אנרגיה של 12.6 eV, המעוררים אותם. אנרגיות המימן: E1=-13.6 eV, E2=-3.4 eV, E3=-1.51 eV, E4=-0.85 eV.",
    instruction:
      "כמה קווי פליטה בדידים ייתכנו מן המערכת, וכמה מהם בתחום האור הנראה (סדרת באלמר)?",
    options: [
      {
        id: "1",
        plainText:
          "3 קווים בסך הכול, מתוכם קו אחד באור הנראה (מעבר מ-3 ל-2)",
        isCorrect: true,
        explanation:
          "הפרש האנרגיה מ-1 ל-3 הוא 12.09 eV, ולרמה 4 הוא 12.75 eV. לכן אלקטרון בעל 12.6 eV יכול לעורר רק עד רמה n=3. בחזרה ייתכנו 3 מעברים: 3->1, 2->1 (בסדרת ליימן - קרינת UV), ו-3->2 באנרגיה 1.89 eV, שמתורגם לאורך גל של כ-656 ננומטר השייך לאור הנראה האדום בסדרת באלמר.",
      },
      {
        id: "2",
        plainText: "6 קווים בסך הכול, מתוכם 2 באור הנראה",
        isCorrect: false,
        explanation: "מסיח המניח בטעות עירור עד רמה n=4.",
      },
      {
        id: "3",
        plainText: "קו פליטה יחיד ב-121.6 ננומטר",
        isCorrect: false,
        explanation: "מסיח המתייחס למעבר 2->1 בלבד.",
      },
      {
        id: "4",
        plainText:
          "3 קווים בסך הכול, אף אחד מהם לא באור הנראה",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-waves-hydrogen-ionization",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - יינון אטום מימן",
    context:
      "פוטון נורה לעבר אטום מימן ברמת היסוד כדי ליינן אותו.",
    instruction:
      "מהו אורך הגל המרבי המסוגל ליינן את האטום, ומה יקרה אם הפוטון הפוגע יהיה באורך גל קצר יותר של 82 ננומטר?",
    formulaLatex:
      "E_{\\text{ion}} = 13.6\\text{ eV}, \\quad \\lambda_{\\text{incident}} = 82\\text{ nm}",
    options: [
      {
        id: "1",
        plainText:
          "אורך מרבי כ-121.6nm; פוטון של 82nm לא ייבלע כי האנרגיה אינה בדיוק כהפרש",
        isCorrect: false,
        explanation:
          "מסיח המתעלם מכך שבמצב יינון האלקטרון הופך לחופשי ויכול לקבל כל אנרגיה קינטית רציפה מעל ערך היינון.",
      },
      {
        id: "2",
        plainText:
          "אורך מרבי כ-91.2nm; פוטון של 82nm ייבלע אך האלקטרון ייפלט במהירות אפס",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "אורך מרבי כ-364.6nm; עודף האנרגיה יפלוט פוטון משני",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "אורך מרבי כ-91.2nm; פוטון של 82nm יינן ויפלוט אלקטרון עם אנרגיה קינטית של 1.52 eV",
        mathText:
          "\\lambda_{\\max} \\approx 91.2\\text{ nm}, \\quad E_k \\approx 1.52\\text{ eV}",
        isCorrect: true,
        explanation:
          "אנרגיית היינון למימן היא 13.6 eV, התואמת לאורך גל מרבי L = hc/13.6 = 1240/13.6 = 91.18 nm. פוטון של 82 nm בעל אנרגיה 1240/82 = 15.12 eV. הוא יאבד 13.6 eV ליינון, והיתרה (1.52 eV) תהפוך לאנרגיה הקינטית של האלקטרון המשוחרר.",
      },
    ],
  },

  // ================= פרק 5: פיזיקה גרעינית ורדיואקטיביות =================
  {
    id: "phys-waves-radioactive-radiation-magnetic",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - קרני רדיואקטיביות בשדה מגנטי",
    context:
      "אלומת קרינה המכילה אלפא, בטא מינוס וגמא חולפת באזור עם שדה מגנטי אחיד הניצב לתנועתה.",
    instruction:
      "מהי הקביעה הנכונה לגבי סטיית הקרניים וכושר חדירותן באוויר?",
    options: [
      {
        id: "1",
        plainText:
          "אלפא לא סוטה (כי היא כבדה), גמא נבלמת מיד",
        isCorrect: false,
        explanation:
          "מסיח הסותר לחלוטין את הפיזיקה של הקרינה הרדיואקטיבית (קרינת אלפא נבלמת באוויר, גמא חודרת הכי הרבה).",
      },
      {
        id: "2",
        plainText:
          "כל סוגי הקרינה סוטים לאותו כיוון אך ברדיוס שונה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "גמא אינה סוטה וחודרת הכי הרבה; אלפא סוטה ברדיוס גדול לצד אחד ונבלמת בקלות; בטא מינוס סוטה בחדות לצד הנגדי",
        isCorrect: true,
        explanation:
          "לפי כוח לורנץ, כיוון הסטייה תלוי בסימן המטען: אלפא (חיובי) סוטה לצד אחד ברדיוס גדול עקב מסתה, בטא (שלילי קל) סוטה לצד הנגדי ברדיוס קטן, וגמא (פוטון חסר מטען) ממשיכה בקו ישר. מבחינת חדירות, אלפא הכי פחות חודרת וגמא חודרת ביותר.",
      },
      {
        id: "4",
        plainText:
          "בטא מינוס אינה מושפעת מהשדה כי היא קרינה אלקטרומגנטית טהורה",
        isCorrect: false,
        explanation:
          "מסיח (בטא מינוס היא זרם אלקטרונים מן הגרעין, קרינת גמא היא האלקטרומגנטית).",
      },
    ],
  },
  {
    id: "phys-waves-nuclear-beta-decay",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - התפרקות בטא מינוס",
    context:
      "בהתפרקות בטא מינוס של גרעין מוליבדן (Molybdenum-99) מתקבל גרעין טכנציום (Technetium-99).",
    instruction:
      "כיצד נוצר האלקטרון הנפלט מן הגרעין, ומהי משוואת הגרעין המלאה?",
    options: [
      {
        id: "1",
        plainText:
          "אלקטרון ממעטפת האטום נלכד בגרעין ונפלט החוצה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "נייטרון בגרעין מתפרק לפרוטון, אלקטרון ואנטי-ניוטרינו (מסה נשמרת 99, אטומי עולה ל-43)",
        mathText:
          "_{42}^{99}\\text{Mo} \\to \\,_{43}^{99}\\text{Tc} + \\,_{-1}^{0}e + \\bar{\\nu}_e",
        isCorrect: true,
        explanation:
          "בתוך הגרעין אין אלקטרונים מובנים. בהתפרקות בטא מינוס הכוח הגרעיני החלש הופך נייטרון לפרוטון, תוך פליטת אלקטרון (שמקורו בגרעין) ואנטי-ניוטרינו כדי לשמר מסה ותנע. המספר האטומי Z עולה ב-1, ומשקל המסה נשמר.",
      },
      {
        id: "3",
        plainText: "פרוטון הופך לנייטרון ופולט פוזיטרון",
        isCorrect: false,
        explanation: "מסיח המתאר התפרקות בטא פלוס.",
      },
      {
        id: "4",
        plainText: "הגרעין פולט חלקיק אלפא וקרינת גמא",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "phys-waves-radioactive-half-life-graph",
    domain: "WAVES_MATTER",
    title: "קרינה וחומר - גרף דעיכת חומר רדיואקטיבי",
    context:
      "מדגם מכיל בתחילה 100% גרעיני מוליבדן-99 המשמש לחשיינים רפואיים. גרף הדעיכה של המוליבדן וגרף ההצטברות של תוצר הדעיכה (טכנציום-99) נחתכים כעבור 66 שעות בדיוק.",
    instruction:
      "מהו זמן מחצית החיים של המוליבדן, ומהו סך הגרעינים הכולל לאחר 143 שעות?",
    formulaLatex: "t_{\\text{intersect}} = 66\\text{ hours}",
    options: [
      {
        id: "1",
        plainText:
          "מחצית חיים 33 שעות; סך הגרעינים הכולל קטן בחצי",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "מחצית חיים 132 שעות; סך הגרעינים גדל פי 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "מחצית חיים 66 שעות; סך הגרעינים דועך לאפס אקספוננציאלית",
        isCorrect: false,
        explanation:
          "מסיח המתייחס רק לגרעיני האם ולא לסך הכללי של אם ובת יחד.",
      },
      {
        id: "4",
        plainText:
          "מחצית חיים 66 שעות; סך הגרעינים הכולל של אם ובת שווה בכל רגע ל-N0 התחלתי (קבוע)",
        mathText:
          "T_{1/2} = 66\\text{ hours}, \\quad N_{\\text{total}} = N_0",
        isCorrect: true,
        explanation:
          "חיתוך הגרפים מתרחש בנקודה שבה כמות חומר האם שווה בדיוק לכמות חומר הבת (כלומר 50% מהחומר המקורי דעך). לכן נקודת החיתוך היא בדיוק זמן מחצית החיים - 66 שעות. כיוון שכל גרעין מוליבדן מתפרק לטכנציום יחיד, המספר הכולל במדגם נשמר תמיד קבוע בערך ההתחלתי N0.",
      },
    ],
  },
];

export { BAGRUT_CS_1_QUESTIONS, BAGRUT_CS_2_QUESTIONS };
export {
  BAGRUT_ENGLISH_QUESTIONS,
  ENGLISH_WRITING_PROMPTS,
  type EnglishWritingPrompt,
};
export { BAGRUT_CHEMISTRY_QUESTIONS };
export { BAGRUT_BIOLOGY_QUESTIONS };
export { BAGRUT_BIBLE_QUESTIONS };
export { BAGRUT_LITERATURE_QUESTIONS };
export {
  BAGRUT_HEBREW_1_QUESTIONS,
  BAGRUT_HEBREW_2_QUESTIONS,
  BAGRUT_HEBREW_QUESTIONS,
};

/** Combined CS bank — routing uses CS_1 / CS_2 via exam dispatch. */
export const BAGRUT_CS_QUESTIONS: DiagnosticQuestion[] = [
  ...BAGRUT_CS_1_QUESTIONS,
  ...BAGRUT_CS_2_QUESTIONS,
];

/** אזרחות — שאלון ראשון (34281). Titles: "אזרחות - שאלון ראשון - [נושא]". */
export const BAGRUT_CIVICS_1_QUESTIONS: DiagnosticQuestion[] = [];

/** אזרחות — שאלון שני (34282). Titles: "אזרחות - שאלון שני - [נושא]". */
export const BAGRUT_CIVICS_2_QUESTIONS: DiagnosticQuestion[] = [
  // ================= אפשרות 1 נכונה (3 שאלות) =================
  {
    id: "civ2-executive-legislative-democratic-deficit",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - יחסי רשויות: גירעון דמוקרטי בכנסת",
    context:
      "בדיון על יחסי הרשויות בישראל נטען כי מתקיים 'גירעון דמוקרטי' עקב היטשטשות הגבולות בין הרשות המחוקקת למבצעת והיחלשות מעמדה המפקח של הכנסת.",
    instruction: "מהו הגורם המרכזי המייצר את הגירעון הזה בתפקוד הכנסת בישראל?",
    options: [
      {
        id: "1",
        plainText:
          "שליטת הממשלה בכנסת באמצעות ועדת השרים לענייני חקיקה והטלת משמעת קואליציונית נוקשה, השוללת מחברי הקואליציה עצמאות פרלמנטרית",
        isCorrect: true,
        explanation:
          "ועדת השרים לחקיקה קובעת את עמדת הממשלה בכל הצעת חוק, והמשמעת הקואליציונית הנוקשה מחייבת את כל חברי סיעות הקואליציה להצביע בהתאם. בכך הממשלה שולטת למעשה בלוח הזמנים ובתוכן החקיקה של הכנסת, ומסרסת את יכולתה לפקח על הרשות המבצעת.",
      },
      {
        id: "2",
        plainText:
          "ריבוי מפלגות באופוזיציה שאינו מאפשר גיבוש אלטרנטיבה שלטונית יציבה",
        isCorrect: false,
        explanation:
          "מסיח: פיצול האופוזיציה מקשה עליה אך אינו הגורם המוסדי לשליטת הממשלה בעבודת הכנסת.",
      },
      {
        id: "3",
        plainText:
          "חוסר היכולת של אזרחים לבחור את נציגיהם בבחירות אישיות-אזוריות",
        isCorrect: false,
        explanation:
          "מסיח הנוגע לשיטת הבחירות ולא לממשק השוטף שבין הממשלה לכנסת.",
      },
      {
        id: "4",
        plainText:
          "התערבות בלעדית של נשיא המדינה בהליכי קביעת סדר היום של מליאת הכנסת",
        isCorrect: false,
        explanation: "מסיח: נשיא המדינה אינו מתערב בסדר יומה של הכנסת.",
      },
    ],
  },
  {
    id: "civ2-separation-powers-cheerleaders-flaw",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - הפרדת רשויות: כשל בפיקוח הפרלמנטרי",
    context:
      'שופטי בג"ץ התבטאו בעבר (כגון בפסיקה על מתווה הגז) כי הכנסת משמשת לעיתים כ\'להקת מעודדות\' של הממשלה.',
    instruction: "איזה כשל דמוקרטי מומחש בדימוי זה?",
    options: [
      {
        id: "1",
        plainText:
          "כשל בעקרון הפרדת הרשויות, שבו הרשות המחוקקת מוותרת על תפקידה כמפקחת ומבקרת על הרשות המבצעת ומאשרת אוטומטית את רצונותיה",
        isCorrect: true,
        explanation:
          "הדימוי 'להקת מעודדות' מבטא פגיעה מהותית בעקרון הפרדת הרשויות ובמערכת האיזונים והבלמים: כאשר רוב חברי הכנסת מתגייסים באופן אוטומטי להריע לממשלה ולאשר את מהלכיה ללא בקרה עצמאית, תפקיד הפיקוח הפרלמנטרי מתרוקן מתוכן.",
      },
      {
        id: "2",
        plainText:
          "כשל במימוש עקרון הפלורליזם עקב היעדר מפלגות אופוזיציה בתוך ועדות הכנסת",
        isCorrect: false,
        explanation:
          "מסיח: האופוזיציה מיוצגת בוועדות הכנסת על פי מפתח סיעתי.",
      },
      {
        id: "3",
        plainText:
          "פגיעה בעקרון הכרעת הרוב משום שהממשלה נאלצת להתחשב בדעת המיעוט בכנסת",
        isCorrect: false,
        explanation: "מסיח הפוך.",
      },
      {
        id: "4",
        plainText:
          "היעדר סמכות שיפוטית לבית המשפט לבקר החלטות כלכליות של הרשות המבצעת",
        isCorrect: false,
        explanation:
          "מסיח: לבית המשפט סמכות לבקר החלטות מנהליות של הממשלה.",
      },
    ],
  },
  {
    id: "civ2-constitution-constitutional-moment",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - תורת המשטר: מושג 'הרגע החוקתי'",
    context:
      "בספרות המשפטית והפוליטית מושם דגש על התנאים ההיסטוריים המאפשרים כינון חוקה פורמלית, המכונים 'רגע חוקתי' (Constitutional Moment).",
    instruction:
      "מהו 'רגע חוקתי' על פי מושגי מדע המדינה והמשפט החוקתי?",
    options: [
      {
        id: "1",
        plainText:
          "שעת כושר היסטורית ייחודית (בעת הקמת מדינה או בעקבות משבר ואירוע דרמטי) שבה העם ונציגיו מוכנים להתעלות מעל אינטרסים סקטוריאליים צרים למען הסכמה חוקתית משותפת",
        isCorrect: true,
        explanation:
          "'רגע חוקתי' מוגדר כחלון הזדמנויות היסטורי שבו קיימת בשלות ציבורית ונכונות של קבוצות יריבות להגיע לפשרות רחבות ולהגדיר את ערכי היסוד של המדינה וכללי המשטר במסמך חוקתי עליון.",
      },
      {
        id: "2",
        plainText:
          "המועד המדויק שבו מושבעת כנסת חדשה ומתחילה את דיוניה בחוקי יסוד",
        isCorrect: false,
        explanation: "מסיח המתאר הליך פרוצדורלי שגרתי.",
      },
      {
        id: "3",
        plainText:
          "הרגע שבו נשיא בית המשפט העליון מאשר פסק דין הפוסל חקיקה ראשית של הכנסת",
        isCorrect: false,
        explanation:
          "מסיח המתאר ביקורת שיפוטית נקודתית ולא הליך של כינון חוקה.",
      },
      {
        id: "4",
        plainText:
          "יום הבחירות הכלליות שבו נקבע הרכב הקואליציה והאופוזיציה",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= אפשרות 2 נכונה (3 שאלות) =================
  {
    id: "civ2-constitution-thin-vs-full-constitution",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - סוגי חוקות: חוקה רזה מול חוקה מלאה",
    context:
      "בדיון על המשבר החוקתי בישראל הוצע הרעיון לכונן 'חוקה רזה' כתחליף מציאותי לחוקה מלאה ושלמה.",
    instruction: "מהי 'חוקה רזה', ומדוע יש התומכים בהצעתה בישראל בעת הזו?",
    options: [
      {
        id: "1",
        plainText:
          "חוקה הכוללת רק חוקי חירום כלכליים לצורך מניעת משברים תקציביים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "חוקה המגדירה אך ורק את כללי המשטר הפרוצדורליים ויחסי הרשויות (סמכויות ומינוי שופטים), ללא הכרעה בסוגיות זהות ומגילת ערכים השנויות במחלוקת עמוקה בחברה",
        isCorrect: true,
        explanation:
          "'חוקה רזה' מתמקדת בהסדרת 'כללי המשחק' המשטריים שבהם ניתן להגיע להסכמה (איזונים ובלמים, הליכי חקיקה ומינויים), ונמנעת מסוגיות שסע אידיאולוגיות ותרבותיות (כגון דת ומדינה) שאינן ניתנות להכרעה מוסכמת בחברה מקוטבת.",
      },
      {
        id: "3",
        plainText:
          'חוקה הנכתבת על ידי בית המשפט העליון בלבד ומחייבת אישור של מועצת הביטחון של האו"ם',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "חוקה המחייבת את פקידי הממשלה בלבד ואינה חלה על אזרחים פרטיים",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "civ2-democracy-tyranny-majority-61",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - עקרון הכרעת הרוב: עריצות הרוב",
    context:
      "חוקרי משטר מתריעים כי במצב החוקתי הנוכחי בישראל, קואליציה של 61 חברי כנסת יכולה לשנות כל נורמה וכלל משטרי במחטף פוליטי מהיר.",
    instruction: "איזה עיוות של עקרון הכרעת הרוב מודגש באזהרה זו?",
    options: [
      {
        id: "1",
        plainText:
          "אי-ציות אזרחי של המיעוט לחוקי המדינה שנחקקו בהליך תקין",
        isCorrect: false,
        explanation: "מסיח העוסק בתגובת האזרחים ולא בפעולת השלטון.",
      },
      {
        id: "2",
        plainText:
          "עריצות הרוב — מצב שבו רוב פרלמנטרי מינימלי מנצל את כוחו לרעה כדי לפגוע בכללי המשחק, בזכויות המיעוט וביציבות המשטר ללא הסכמה רחבה",
        isCorrect: true,
        explanation:
          "הכרעת הרוב בדמוקרטיה מהותית מותנית בשמירה על זכויות המיעוט ואי-שינוי שרירותי של כללי המשחק הדמוקרטיים. ניצול רוב מזערי כדי לשנות סדרי משטר ללא קונצנזוס הוא דוגמה מובהקת ל'עריצות הרוב'.",
      },
      {
        id: "3",
        plainText:
          "שלילת זכות הבחירה מנציגי האופוזיציה בתוך מליאת הכנסת",
        isCorrect: false,
        explanation: "מסיח שאינו תואם את המציאות הפרלמנטרית.",
      },
      {
        id: "4",
        plainText:
          'פגיעה בעקרון שלטון החוק הפורמלי הדורש רוב של 90 חברי כנסת',
        isCorrect: false,
        explanation: 'מסיח: חוקים רגילים אינם דורשים רוב של 90 ח"כים.',
      },
    ],
  },
  {
    id: "civ2-judiciary-independence-selection-committee",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - עצמאות השפיטה: הוועדה לבחירת שופטים",
    context:
      "עצמאותה של הרשות השופטת היא תנאי בל-יעבור לקיומה של דמוקרטיה מהותית ולהגנה על שלטון החוק.",
    instruction:
      "איזה מבין הכללים הבאים הוא מנגנון מוסדי מרכזי שנועד להבטיח את אי-תלותה ועצמאותה של הרשות השופטת בישראל?",
    options: [
      {
        id: "1",
        plainText:
          "קביעת שכר השופטים בהצבעה חודשית ישירה של שר האוצר בהתאם לטיב פסקי הדין",
        isCorrect: false,
        explanation:
          "מסיח: שכר השופטים קבוע בחוק ואינו תלוי בפסיקותיהם כדי למנוע שוחד או לחץ שלטוני.",
      },
      {
        id: "2",
        plainText:
          "שיטת בחירת שופטים בוועדה מגוונת ומאוזנת הכוללת שופטים, שרים, חברי כנסת ולשכת עורכי הדין, המונעת השתלטות פוליטית של הרשות המבצעת",
        isCorrect: true,
        explanation:
          'הרכב הוועדה לבחירת שופטים בישראל (3 שופטי עליון, 2 שרים, 2 ח"כים ו-2 נציגי לשכת עוה"ד) נבנה במכוון כדי שאף גורם פוליטי לא יחזיק ברוב מוחלט, ובכך מובטחת עצמאות השופטים מלחצים פוליטיים של הקואליציה.',
      },
      {
        id: "3",
        plainText:
          "כפיפות מלאה של פסקי דין שיפוטיים לאישורו המוקדם של שר המשפטים",
        isCorrect: false,
        explanation: "מסיח הפוגע לחלוטין בעצמאות השפיטה.",
      },
      {
        id: "4",
        plainText:
          "הגבלת כהונתם של שופטים לקדנציה קצרה בת ארבע שנים הניתנת להארכה לפי שיקול דעת הכנסת",
        isCorrect: false,
        explanation:
          "מסיח: כהונת שופט נמשכת עד גיל 70 בדיוק כדי שלא יהיה תלוי בחסדי נבחרי ציבור להארכת כהונתו.",
      },
    ],
  },

  // ================= אפשרות 3 נכונה (3 שאלות) =================
  {
    id: "civ2-constitution-supremacy-entrenchment",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - המדרג הנורמטיבי: עליונות החוקה ושריון",
    context:
      "במשטרים בעלי חוקה פורמלית נקבע כי לחוקה יש עליונות נורמטיבית על פני שאר חוקי המדינה.",
    instruction:
      "מהי המשמעות המעשית של עליונות נורמטיבית זו במשטר דמוקרטי?",
    options: [
      {
        id: "1",
        plainText:
          "החוקה נכתבת מחדש לאחר כל מערכת בחירות על פי דרישת ראש הממשלה הנבחר",
        isCorrect: false,
        explanation: "מסיח המנוגד לחלוטין לרעיון היציבות החוקתית.",
      },
      {
        id: "2",
        plainText:
          "שופטים רשאים לשנות את סעיפי החוקה בהחלטה מנהלית ללא מעורבות הפרלמנט",
        isCorrect: false,
        explanation: "מסיח: שינוי חוקה דורש הליך פרלמנטרי מיוחד.",
      },
      {
        id: "3",
        plainText:
          "חוק רגיל הסותר הוראה מפורשת בחוקה נפסל על ידי בית המשפט (או מוכרז כבטל), וכל שינוי בחוקה דורש פרוצדורה נוקשה ורוב מיוחס (שריון)",
        isCorrect: true,
        explanation:
          "עליונות נורמטיבית משמעה שהחוקה עומדת בראש פירמידת החוקים: חוק רגיל של הפרלמנט שסותר אותה בטל ומבוטל. בנוסף, חוקה משוריינת מחייבת הליך שינוי מורכב (רוב מיוחס, קריאות מרובות) כדי להגן על המשטר מפני שינויים חפוזים.",
      },
      {
        id: "4",
        plainText:
          "חוקי החוקה חלים על הרשות השופטת בלבד, בעוד הממשלה כפופה לחוקים רגילים",
        isCorrect: false,
        explanation:
          "מסיח: החוקה מחייבת את כל רשויות השלטון ללא יוצא מן הכלל.",
      },
    ],
  },
  {
    id: "civ2-elections-party-switching-calantherism",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - ייצוגיות ושלטון העם: תופעת הכלנתריזם",
    context:
      "תופעת ה'כלנתריזם' מתארת מעבר של חבר כנסת מסיעתו לסיעה יריבה בתמורה להטבות פוליטיות ומינויים (כגון שריון מקום או מינוי לשר).",
    instruction: "כיצד פוגעת תופעה זו בראש ובראשונה בעקרון שלטון העם?",
    options: [
      {
        id: "1",
        plainText:
          "המעבר הסיעתי מונע מנשיא המדינה להטיל את מלאכת הרכבת הממשלה על ראשי המפלגות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "עריקת חבר כנסת מבטלת רטרואקטיבית את כל החוקים שנחקקו במושב הקודם",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "בשיטת בחירות יחסית-רשימתית האזרחים מצביעים למפלגה ולמצעה; עריקה מעבירה את קולות הבוחרים למפלגה יריבה ובכך מעוותת ומסלפת את רצון הבוחר והכרעת העם",
        isCorrect: true,
        explanation:
          'בישראל האזרח אינו בוחר מועמד באופן אישי-אזורי אלא מצביע לרשימת מועמדים ולמצע רעיוני של מפלגה. כאשר ח"כ עובר סיעה עם המנדט שקיבל מהציבור, הוא סוחר בקולות בוחריו ומעוות את המאזן הפוליטי שנקבע בקלפי, ובכך פוגע ישירות בריבונות העם.',
      },
      {
        id: "4",
        plainText:
          "חבר כנסת שערק מאבד באופן אוטומטי את אזרחותו הישראלית",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "civ2-knesset-factional-split-sanctions",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - סעיף 6א לחוק יסוד הכנסת: סנקציות על פורש",
    context:
      "בעקבות משברים פוליטיים (כגון 'התרגיל המסריח' ב-1990), נחקק סעיף 6א לחוק יסוד: הכנסת להגבלת עריקות סיעתית.",
    instruction:
      "אילו סנקציות מופעלות נגד חבר כנסת שהוכרז רשמית כפורש מסיעתו ולא התפטר מחברותו בכנסת?",
    options: [
      {
        id: "1",
        plainText:
          "נשללת ממנו חסינותו הפרלמנטרית והוא מועמד מיד לדין פלילי על שוחד בחירות",
        isCorrect: false,
        explanation:
          "מסיח: פרישה אינה מהווה עבירה פלילית כשלעצמה אלא עילה לסנקציות משטריות.",
      },
      {
        id: "2",
        plainText:
          "הוא מודח באופן מיידי מחברותו בכנסת ומוחלף במועמד הבא ברשימה",
        isCorrect: false,
        explanation:
          "מסיח: חבר הכנסת אינו מודח מהכנסת אלא מוגבל פוליטית.",
      },
      {
        id: "3",
        plainText:
          "הוא לא יוכל לכהן כשר או סגן שר באותה כנסת, ולא יוכל להתמודד בבחירות הבאות במסגרת סיעה שהייתה מיוצגת באותה הכנסת",
        isCorrect: true,
        explanation:
          'סעיף 6א לחוק יסוד הכנסת קובע שח"כ שהוכרז כפורש ולא התפטר מיד, נענש באיסור כהונה בממשלה באותה כהונה, ואינו רשאי להתמודד בבחירות הבאות ברשימת מפלגה שמכהנת בכנסת הנוכחית, כדי למנוע קבלת תמורה עבור עריקה.',
      },
      {
        id: "4",
        plainText:
          "משכורתו הפרלמנטרית מעוקלת ומועברת למימון מפלגת האם שממנה פרש",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= אפשרות 4 נכונה (3 שאלות) =================
  {
    id: "civ2-knesset-constructive-no-confidence",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - כלי פיקוח: אי-אמון קונסטרוקטיבי",
    context:
      "הצעת אי-אמון היא כלי הפיקוח החריף ביותר העומד לרשות הפרלמנט במשטר דמוקרטי פרלמנטרי.",
    instruction:
      "כיצד פועל מנגנון הצעת אי-אמון בישראל על פי עקרון 'אי-אמון קונסטרוקטיבי'?",
    options: [
      {
        id: "1",
        plainText:
          "הממשלה נופלת באופן מיידי בכל מקרה שבו רוב רגיל מבין הנוכחים במליאה מצביע נגדה",
        isCorrect: false,
        explanation:
          "מסיח המתאר אי-אמון פשוט שהיה נהוג בעבר וגרם לחוסר יציבות שלטונית.",
      },
      {
        id: "2",
        plainText:
          "הצעת אי-אמון מוגשת אך ורק על ידי נשיא המדינה לאחר התייעצות עם שופטי העליון",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "אי-אמון הוא הליך סמלי הצהרתי בלבד שאינו מחייב את הממשלה להתפטר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          'כדי להפיל את הממשלה המכהנת, על הכנסת להביע אמון בממשלה חלופית ברוב מוחלט של 61 ח"כים לפחות, המציגה קווי יסוד וראש ממשלה מיועד',
        isCorrect: true,
        explanation:
          "בשיטת אי-אמון קונסטרוקטיבי לא די ברוב המפיל את הממשלה, אלא יש להציג ממשלה חלופית מוסכמת שזוכה לתמיכת 61 חברי כנסת לפחות (ראש ממשלה, שרים וקווי יסוד). בכך מובטחת יציבות שלטונית ונמנעת הפלת ממשלה ללא חלופה.",
      },
    ],
  },
  {
    id: "civ2-legislation-private-bill-preliminary-reading",
    domain: "CIVICS",
    title: "אזרחות - שאלון שני - הליכי חקיקה: הצעת חוק פרטית מול ממשלתית",
    context:
      'הליכי החקיקה בכנסת מבחינים בין הצעת חוק ממשלתית לבין הצעת חוק פרטית המוגשת על ידי חבר כנסת יחיד או קבוצת ח"כים.',
    instruction:
      "באיזה שלב חקיקתי ייחודי מחויבת הצעת חוק פרטית לעבור בטרם תגיע לשלוש הקריאות הרגילות במליאת הכנסת?",
    options: [
      {
        id: "1",
        plainText:
          "קריאת ביניים מיוחדת המתקיימת בבית המשפט המחוזי בירושלים",
        isCorrect: false,
        explanation: "מסיח: בית המשפט אינו חלק מהליך החקיקה.",
      },
      {
        id: "2",
        plainText: "שימוע חוקתי פומבי בלשכת נשיא המדינה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "אישור במשאל עם מחייב בקרב כלל האזרחים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "קריאה טרומית במליאת הכנסת — הצבעה מוקדמת שרק לאחריה מועברת ההצעה לניסוח ראשוני באחת מוועדות הכנסת",
        isCorrect: true,
        explanation:
          "הצעת חוק ממשלתית מתחילה ישירות בקריאה ראשונה משום שכבר עברה בדיקות במשרדי הממשלה. לעומתה, הצעת חוק פרטית מחויבת לעבור תחילה 'קריאה טרומית' במליאה כדי שהכנסת תחליט עקרונית האם להעבירה לוועדה להכנה לקריאה ראשונה.",
      },
    ],
  },
  {
    id: "civ2-elections-proportional-system-sovereignty",
    domain: "CIVICS",
    title:
      "אזרחות - שאלון שני - שיטות בחירות: הקשר בין השיטה היחסית לשלטון העם",
    context:
      "במדינת ישראל נהוגה שיטת בחירות יחסית, ארצית ורשימתית לקביעת הרכב הרשות המחוקקת.",
    instruction:
      "כיצד מגשימה שיטת הבחירות היחסית את עקרון שלטון העם והשוויון הדמוקרטי?",
    options: [
      {
        id: "1",
        plainText:
          "היא מבטיחה כי המפלגה שזכתה במרב הקולות תמנה באופן אוטומטי את כל שרי הממשלה ללא צורך בקואליציה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "היא מחלקת את המדינה למחוזות גאוגרפיים קטנים שבהם נבחר נציג אישי בלבד לכל אזור",
        isCorrect: false,
        explanation: "מסיח המתאר שיטה רובנית-אזורית.",
      },
      {
        id: "3",
        plainText:
          "היא קובעת כי רק מפלגות שזכו ביותר מ-50% מקולות הבוחרים זכאיות לייצוג בפרלמנט",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "היא מחלקת את המנדטים בכנסת בהתאמה מדויקת לאחוז הקולות שקיבלה כל רשימה ברחבי הארץ, ובכך משקפת נאמנה את מכלול הדעות בעם ומעניקה שוויון מלא לערך כל קול",
        isCorrect: true,
        explanation:
          "בשיטה היחסית-ארצית (כל המדינה אזור בחירה יחיד), כל קול מעבר לאחוז החסימה משפיע במידה שווה על חלוקת המושבים. הדבר מבטיח ייצוג למגוון הקבוצות והעמדות בחברה (פלורליזם) ומממש באופן מלא את עקרון ריבונות העם ושוויון ערך הקול.",
      },
    ],
  },
];

/** Combined civics bank — routing uses CIVICS_1 / CIVICS_2 via exam dispatch. */
export const BAGRUT_CIVICS_QUESTIONS: DiagnosticQuestion[] = [
  ...BAGRUT_CIVICS_1_QUESTIONS,
  ...BAGRUT_CIVICS_2_QUESTIONS,
];

/** היסטוריה — שאלון ראשון (22261). Titles: "היסטוריה - שאלון ראשון - [נושא]". domain: HISTORY. */
export const BAGRUT_HISTORY_1_QUESTIONS: DiagnosticQuestion[] = [
  // ================= אפשרות 1 נכונה (3 שאלות) =================
  {
    id: "hist1-shoah-emigration-1936-1938",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - גרמניה הנאצית: מדיניות ההגירה",
    context:
      "נתוני ההגירה של יהודי גרמניה בשנים 1933–1938 מראים תנודתיות ניכרת: שיא הגירה של כ-37,000 יהודים ב-1933, ירידה מתונה ל-25,000 ב-1936, וזינוק חדש ליותר מ-35,000 מהגרים ב-1938.",
    instruction:
      "מהו ההסבר ההיסטורי למיתון הזמני בהגירה בשנת 1936 לעומת ההסלמה ב-1938?",
    options: [
      {
        id: "1",
        plainText:
          "בשנת 1936 מיתן המשטר הנאצי זמנית את הרדיפות הגלויות בשל אירוח המשחקים האולימפיים בברלין; ב-1938 חלה הקצנה טוטלית בעקבות סיפוח אוסטריה, האריזציה הכפויה ופרעות 'ליל הבדולח'",
        isCorrect: true,
        explanation:
          "בשנת 1936 ביקש היטלר להציג חזות נאורה כלפי חוץ לרגל האולימפיאדה בברלין והורה למתן את ההסתה הפומבית. לעומת זאת, 1938 הייתה 'שנת מפנה' שבה עבר המשטר ליוזמות אלימות ישירות, סיפוח אוסטריה, מאסר המוני במחנות ריכוז ושריפת בתי כנסת ב'ליל הבדולח', מה שחולל גל בריחה המוני.",
      },
      {
        id: "2",
        plainText:
          "בשנת 1936 בוטלו חוקי נירנברג בהוראת היטלר עקב לחץ כלכלי בינלאומי, אך בשנת 1938 הוחזרו לתוקף בחומרה יתרה",
        isCorrect: false,
        explanation: "מסיח: חוקי נירנברג מעולם לא בוטלו.",
      },
      {
        id: "3",
        plainText:
          "בשנת 1936 נחתם הסכם העברה שחסם את היציאה, ובשנת 1938 בריטניה פתחה לחלוטין את שערי ארץ ישראל",
        isCorrect: false,
        explanation:
          "מסיח: הסכם העברה עודד יציאה, ובריטניה לא פתחה את שערי הארץ.",
      },
      {
        id: "4",
        plainText:
          "המיתון ב-1936 נבע מסגירת גבולות מוחלטת, ואילו ב-1938 החל גירוש פיזי ישיר למחנות ההשמדה במזרח אירופה",
        isCorrect: false,
        explanation:
          "מסיח: מחנות ההשמדה טרם הוקמו ב-1938 (הם החלו לפעול רק ב-1941/42).",
      },
    ],
  },
  {
    id: "hist1-shoah-barbarossa-final-solution",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - מבצע ברברוסה והמעבר להשמדה",
    context:
      "ביוני 1941 פלשה גרמניה הנאצית לברית המועצות במסגרת 'מבצע ברברוסה'.",
    instruction:
      "כיצד השפיע מהלך צבאי זה על המדיניות הנאצית כלפי היהודים בשטחים שנכבשו?",
    options: [
      {
        id: "1",
        plainText:
          "הפלישה סימנה את המעבר מרדיפה, בידוד וריכוז בגטאות לשלב הרצח ההמוני והשיטתי ('הפתרון הסופי'), שהחל בירי בורות המוני בידי האיינזצגרופן",
        isCorrect: true,
        explanation:
          "הפלישה לברית המועצות נתפסה כמלחמת חורמה אידאולוגית כנגד ה'יודאו-בולשביזם'. בעקבות הצבא הפולש פעלו ארבע עוצבות מבצע (איינזצגרופן) שביצעו ירי המוני בבורות (כגון בבאבי יאר ובפונאר), וסימנו את פתיחת שלב הרצח הטוטלי והשיטתי של יהדות אירופה.",
      },
      {
        id: "2",
        plainText:
          "הפלישה הובילה להפסקת הרדיפות במזרח אירופה במטרה לרתום את האוכלוסייה היהודית לייצור מלחמתי עבור הוורמאכט",
        isCorrect: false,
        explanation:
          "מסיח: המדיניות הפכה לרצחנית הרבה יותר ולא נרתמה להקלה על היהודים.",
      },
      {
        id: "3",
        plainText:
          "הפלישה הביאה להחלטה מיידית לגרש את כל יהודי אירופה מעבר להרי האורל ולסגור את מחנות הריכוז",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "בעקבות הפלישה החליטו הנאצים להקים גטאות פתוחים בכל ערי ברית המועצות ולהעניק אוטונומיה תרבותית",
        isCorrect: false,
        explanation: "מסיח המנוגד לחלוטין לעובדות ההיסטוריות.",
      },
    ],
  },
  {
    id: "hist1-zionism-herzl-orthodox-dispute",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - ציונות: המחלוקת על הגדרת הלאומיות",
    context:
      "לאחר מותו של הרצל ב-1904 שיבח עיתון 'השקפה' את פועלו כיוצר הציונות המדינית, בעוד עיתון 'חבצלת' החרדי תקף אותו וטען כי 'לאומיותנו היא רק תורתנו'.",
    instruction: "מהו שורש המחלוקת האידאולוגית בין שני הקטבים הללו?",
    options: [
      {
        id: "1",
        plainText:
          "מחלוקת על הגדרת הזהות: הציונות ראתה בעם היהודי לאום מודרני הזכאי לריבונות פוליטית כעמי אירופה, בעוד האורתודוקסיה ראתה ביהדות קהילה דתית וראתה בציונות 'דחיקת הקץ' וכפירה",
        isCorrect: true,
        explanation:
          "הציונות החילונית הגדירה את היהודים כלאום מודרני הזקוק להגדרה עצמית טריטוריאלית. לעומתה, האורתודוקסיה השמרנית ראתה ביהדות דת בלבד, שללה את הלאומיות החילונית וראתה בניסיון העלייה המאורגן מרידה בהבטחה המשיחית ו'דחיקת הקץ'.",
      },
      {
        id: "2",
        plainText:
          "מחלוקת על אופן חלוקת כספי החלוקה שהגיעו מיהודי הגולה ליישוב הישן",
        isCorrect: false,
        explanation:
          "מסיח העוסק בוויכוח כלכלי פנים-יישובי ולא במחלוקת האידאולוגית הלאומית.",
      },
      {
        id: "3",
        plainText:
          "ויכוח בין תומכי העלייה הראשונה לתומכי העלייה השנייה בנוגע להעסקת פועלים ערבים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "מחלוקת אישית בלבד בין אליעזר בן-יהודה לעורכי העיתונות הערבית בירושלים",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= אפשרות 2 נכונה (3 שאלות) =================
  {
    id: "hist1-shoah-ghetto-sanctification-of-life",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - גטאות: התנגדות וקידוש החיים",
    context:
      "ביומנו בגטו ורשה כתב חיים אהרן קפלן: 'על פי ההיגיון – אנחנו מחויבים לגווע... אבל יהודי פולין אוהבים את החיים ואינם רוצים להסתלק מן העולם לפני זמנם'.",
    instruction:
      "איזו דרך התנגדות של היהודים למדיניות הנאצית משתקפת בדברים אלו?",
    options: [
      {
        id: "1",
        plainText:
          "מרד חמוש ולחימת גרילה של אילי הפרטיזנים מחוץ לחומות הגטו",
        isCorrect: false,
        explanation:
          "מסיח: המקור מתאר התנגדות אזרחית יומיומית ולא לחימה צבאית חמושה.",
      },
      {
        id: "2",
        plainText:
          "'קידוש החיים' (התנגדות אזרחית, רוחנית וקיומית) — מאבק יומיומי בלתי-חמוש להישרדות פיזית, הברחת מזון, קיום מוסדות חינוך ותרבות ושמירה על צלם אנוש",
        isCorrect: true,
        explanation:
          "המושג 'קידוש החיים' (שטבע הרב ניסנבוים) ביטא את ההכרה שהנאצים רוצים בהשמדה פיזית מלאה, ועל כן כל מעשה של הישרדות, למידה, הברחת מזון, תרבות ושמירה על כבוד האדם מהווה מעשה התנגדות יהודי מובהק.",
      },
      {
        id: "3",
        plainText:
          "שיתוף פעולה מלא עם פקודות הגירוש של הגרמנים כדי לזכות בהקלות תזונתיות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "פנייה להגנת הצלב האדום הבינלאומי וארגוני סיוע ניטרליים",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "hist1-state-ben-gurion-statism-palmach",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - הקמת המדינה: עקרון הממלכתיות",
    context:
      'באוקטובר 1948 הורה דוד בן-גוריון על פירוק מטה הפלמ"ח והדגיש כי אין לשמר צורות ארגון מפלגתיות או כיתתיות בצבא המדינה הריבונית.',
    instruction: "מהו העיקרון השלטוני שעמד ביסוד החלטתו של בן-גוריון?",
    options: [
      {
        id: "1",
        plainText:
          "רצון לחסוך בהוצאות הביטחון באמצעות פירוק חטיבות סדירות ומעבר לצבא שכיר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          'עקרון הממלכתיות — הכפפת כל הכוחות החמושים למרות הממשלה הריבונית והקמת צבא לאומי אחיד (צה"ל) בעל שרשרת פיקוד אחת, ללא יחידות פוליטיות נפרדות',
        isCorrect: true,
        explanation:
          'תפיסת \'הממלכתיות\' של בן-גוריון קבעה כי במדינה ריבונית כל הכוח הצבאי חייב להיות כפוף בלעדית להנהגה הנבחרת. פירוק מטה הפלמ"ח נועד למנוע קיומו של כוח חמוש בעל זיקה אידאולוגית-מפלגתית עצמאית (מפ"ם) ולהבטיח שצה"ל יהיה צבא ממלכתי אחיד.',
      },
      {
        id: "3",
        plainText:
          "כניעה לדרישת האו\"ם ומתווך השלום ברנדוט לפרק את יחידות העילית של היישוב",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          'העדפת ארגוני המחתרת אצ"ל ולח"י על פני כוחות ההגנה והפלמ"ח',
        isCorrect: false,
        explanation:
          'מסיח: בן-גוריון פירק גם את האצ"ל והלח"י באותה נחישות ממלכתית בדיוק.',
      },
    ],
  },
  {
    id: "hist1-shoah-wwii-turning-points",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - מלחמת העולם השנייה: שנת המפנה 1942–1943",
    context:
      "קריקטורה של אריה נבון שפורסמה באוגוסט 1943 הציגה את היטלר בשנת 1939 כענק מאיים, ובשנת 1943 כדמות כפופה, מבוהלת ומכותרת.",
    instruction:
      "אילו אירועים צבאיים הובילו לתפנית חדה זו במהלך מלחמת העולם השנייה?",
    options: [
      {
        id: "1",
        plainText:
          "כיבוש צרפת בידי בנות הברית ושחרור פריז כבר בראשית שנת 1943",
        isCorrect: false,
        explanation:
          "מסיח: שחרור צרפת ופריז התרחש רק במחצית השנייה של 1944.",
      },
      {
        id: "2",
        plainText:
          "התבוסה הגרמנית בקרב סטלינגרד, כניעת כוחות הציר בצפון אפריקה (לאחר אל-עלמיין ולפיד), ונחיתת בעלות הברית בסיציליה שהובילה להפלת מוסוליני",
        isCorrect: true,
        explanation:
          "שנת 1942–1943 הייתה 'שנת המפנה' במלחמה: כיתור והשמדת הארמייה השישית בסטלינגרד פתחו את מתקפת הנגד הסובייטית, הניצחון באל-עלמיין ומבצע לפיד טיהרו את צפון אפריקה, והפלישה לסיציליה מוטטה את המשטר הפשיסטי באיטליה.",
      },
      {
        id: "3",
        plainText:
          "הטלת פצצות האטום על יפן שהביאה לכניעה מיידית של גרמניה",
        isCorrect: false,
        explanation:
          "מסיח: פצצות האטום הוטלו באוגוסט 1945, חודשים לאחר כניעת גרמניה.",
      },
      {
        id: "4",
        plainText:
          "נסיגת גרמניה מבריטניה בעקבות כישלון המתקפה הימית בתעלת למאנש",
        isCorrect: false,
        explanation: "מסיח: הקרב על בריטניה התרחש ב-1940.",
      },
    ],
  },

  // ================= אפשרות 3 נכונה (3 שאלות) =================
  {
    id: "hist1-shoah-ideology-lebensraum-race",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - אידאולוגיה נאצית: מרחב מחיה ותורת הגזע",
    context:
      "לאחר כיבוש פולין (1939) קראו הנאצים לגרמנים אתניים ('פולקסדויטשה') להתיישב בחבל הוורטגאו במערב פולין תוך נישול וגירוש התושבים המקומיים.",
    instruction: "אילו שני עקרונות מרכזיים מן האידאולוגיה הנאצית מומשו במהלך זה?",
    options: [
      {
        id: "1",
        plainText:
          "עקרון הפיהרר ועקרון המאבק בקומוניזם הבינלאומי ללא קשר לטריטוריה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "עקרון הסוציאליזם הלאומי הדוגל בשוויון זכויות כלכלי לכל תושבי השטחים הכבושים",
        isCorrect: false,
        explanation: "מסיח הסותר את האידאולוגיה הנאצית.",
      },
      {
        id: "3",
        plainText:
          "עקרון 'מרחב המחיה' (Lebensraum) ועקרון הגזע וטוהר הדם — סיפוח אדמות ממזרח ויישובן בארים תוך סילוק ונישול האוכלוסייה הסלאבית והיהודית",
        isCorrect: true,
        explanation:
          "יישוב פולקסדויטשה בוורטגאו שילב ישירות את רעיון 'מרחב המחיה' (השתלטות על אדמות חקלאיות במזרח למחיית הגזע הארי) יחד עם עקרון עליונות הגזע וטוהר הדם (איחוד דם גרמני וטיהור אתני של האוכלוסייה הנחותה).",
      },
      {
        id: "4",
        plainText:
          "עקרון ההגדרה העצמית של העמים על פי תוכנית 14 הנקודות של וילסון",
        isCorrect: false,
        explanation: "מסיח דמוקרטי שאינו קשור לנאציזם.",
      },
    ],
  },
  {
    id: "hist1-shoah-new-order-hierarchy",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - מלחמת העולם השנייה: תוכנית 'הסדר החדש'",
    context:
      "בשנתיים הראשונות למלחמת העולם השנייה (1939–1941) עיצב המשטר הנאצי את אירופה הכבושה על פי עקרונותיו.",
    instruction: "כיצד פעל המשטר הנאצי להגשמת רעיון 'הסדר החדש' באירופה?",
    options: [
      {
        id: "1",
        plainText:
          "יצירת איחוד כלכלי שוויוני בין כל מדינות אירופה והענקת אוטונומיה מדינית למיעוטים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "פיתוח תוכנית סיוע הומניטרית לשיקום תשתיות המגורים של עמי מזרח אירופה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "חלוקת אירופה על בסיס היררכיה גזעית: סיפוח שטחים לרייך, שעבוד וניצול האוכלוסייה הסלאבית ככוח עבודה זול, ובידוד היהודים בגטאות כשלב מקדים להשמדתם",
        isCorrect: true,
        explanation:
          "'הסדר החדש' נועד לממש את הפירמידה הגזעית: הגזע הארי בראש, עמים נורדיים כשותפים זוטרים, העמים הסלאביים במזרח משועבדים לעבודות כפייה ללא השכלה ('תת-אדם'), והיהודים מנושלים, מבודדים בגטאות ונידונים לעקירה והשמדה.",
      },
      {
        id: "4",
        plainText:
          "פירוק מוחלט של מחנות הריכוז בגרמניה והעברת סמכויות לממשלות בובות עצמאיות",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "hist1-mandate-britain-un-transfer-reasons",
    domain: "HISTORY",
    title: 'היסטוריה - שאלון ראשון - סיום המנדט: העברת שאלת א"י לאו"ם',
    context:
      "באוקטובר 1947 הצהיר שר המושבות הבריטי ארתור קריץ' ג'ונס כי המנדט עלה לבריטניה במחיר דמים כבד, וכי בריטניה אינה יכולה עוד לשאת בעול שלטונו.",
    instruction:
      'אילו שיקולים עיקריים הניעו את ממשלת בריטניה להעביר את שאלת ארץ ישראל להכרעת האו"ם?',
    options: [
      {
        id: "1",
        plainText:
          "רצון בריטי להעביר את שטח המנדט ישירות לשליטתה הבלעדית של ברית המועצות",
        isCorrect: false,
        explanation:
          "מסיח: בריטניה נאבקה במלחמה הקרה נגד התפשטות ברית המועצות.",
      },
      {
        id: "2",
        plainText:
          "דרישה של הליגה הערבית מבריטניה להקים מיד מדינה יהודית עצמאית על כל שטח הארץ",
        isCorrect: false,
        explanation: "מסיח הפוך מעמדת הליגה הערבית.",
      },
      {
        id: "3",
        plainText:
          'לחץ צבאי ופגיעות בנפש מפעולות המחתרות, משבר כלכלי בריטי כבד לאחר המלחמה, וביקורת בינלאומית חריפה (בייחוד מארה"ב) סביב פרשות ההעפלה והספר הלבן',
        isCorrect: true,
        explanation:
          "בריטניה נקלעה למבוי סתום: הכלכלה הבריטית קרסה לאחר המלחמה, פעילות המחתרות (תנועת המרי העברי) גבתה אבדות רבות וחייבה החזקת 100,000 חיילים בארץ, ומדיניות הגירוש כנגד מעפילי 'אקסודוס' יצרה ביקורת עולמית קשה ולחץ אמריקאי כבד.",
      },
      {
        id: "4",
        plainText:
          "פקיעת תוקף המנדט על פי החלטת חבר הלאומים ללא אפשרות הארכה",
        isCorrect: false,
        explanation: "מסיח משפטי מוטעה.",
      },
    ],
  },

  // ================= אפשרות 4 נכונה (3 שאלות) =================
  {
    id: "hist1-shoah-ghetto-vilna-gens-work-vs-revolt",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - הנהגת הגטאות: דילמת היודנראט והמחתרות",
    context:
      "ביוני 1943 הכריז ראש היודנראט בגטו וילנה, יעקב גנס, כי 'העבודה למען הוורמאכט היא צו השעה כדי להוכיח שאנו מועילים ואין לנו תחליף'.",
    instruction:
      "מה הייתה תפיסתו של גנס בניהול הגטו, ומה טענו כנגדו חברי המחתרת ותנועות הנוער?",
    options: [
      {
        id: "1",
        plainText:
          "גנס תמך ביציאה מיידית של כל יושבי הגטו ללחימה ביערות, בעוד המחתרת דרשה להמשיך בעבודה יצרנית",
        isCorrect: false,
        explanation: "מסיח הפוך.",
      },
      {
        id: "2",
        plainText:
          "גנס פעל מטעם האס-אס מרצונו כדי להסגיר את המחתרת, ללא כל רצון להציל יהודים",
        isCorrect: false,
        explanation:
          "מסיח המציג דמוניזציה שאינה משקפת את המניע הטראגי של היודנראט להצלת חיים.",
      },
      {
        id: "3",
        plainText:
          "המחתרת טענה שגרמניה עומדת לנצח במלחמה ולכן יש לציית לכל פקודות הייצור ללא התנגדות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "גנס דגל ב'הצלה באמצעות עבודה' כדי לדחות את ההשמדה בתקווה לסיום המלחמה; המחתרת טענה כי ההשמדה טוטלית, העבודה מחזקת את האויב והמענה היחיד הוא מרד מזוין",
        isCorrect: true,
        explanation:
          "גנס האמין כי תועלת כלכלית תגרום לנאצים לדחות את חיסול הגטו עד שתובס גרמניה ('הצלה באמצעות עבודה'). המחתרת היהודית (פ.פ.או) הבינה שתוכנית ההשמדה היא טוטלית, שאין לתת אמון בהבטחות האויב, ושאין מנוס מיציאה לקרב חמוש למען כבוד העם היהודי.",
      },
    ],
  },
  {
    id: "hist1-zionism-basel-program-goals-means",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - ציונות: מטרות תוכנית בזל",
    context:
      "תוכנית בזל, שאושרה בקונגרס הציוני הראשון ב-1897, הגדירה את מטרת התנועה הציונית: 'להקים לעם היהודי בית מולדת בארץ ישראל מובטח לפי משפט הכלל'.",
    instruction: "אילו אמצעים מרכזיים נקבעו בתוכנית בזל להשגת מטרה זו?",
    options: [
      {
        id: "1",
        plainText:
          "פתיחה במרד צבאי מיידי נגד האימפריה העות'מאנית והקמת צבא יהודי חשאי",
        isCorrect: false,
        explanation:
          "מסיח: הרצל שלל מאבק צבאי ודגל בדיפלומטיה גלויה.",
      },
      {
        id: "2",
        plainText:
          "עידוד הגירה המונית של יהודים לארצות הברית ולמערב אירופה לצבירת הון כלכלי",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "התמקדות בהקמת ישיבות ובתי כנסת בכל רחבי הגולה ללא פעילות התיישבותית בארץ",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "יישוב הארץ בעובדי אדמה ובעלי מלאכה, ארגון העם במפעלים כלכליים, חיזוק התודעה והרגש הלאומי, ונקיטת צעדים דיפלומטיים להשגת הסכמת המעצמות (צ'רטר)",
        isCorrect: true,
        explanation:
          "תוכנית בזל פירטה ארבעה אמצעים מעשיים: פיתוח התיישבות יצרנית בארץ ישראל, ארגון וליכוד כלל היהדות במפעלים מתאימים, חיזוק התודעה הלאומית היהודית, ופעילות מדינית-דיפלומטית מול ממשלות העולם להשגת ערבות בינלאומית מוכרת (צ'רטר).",
      },
    ],
  },
  {
    id: "hist1-israel-islamic-lands-jews-impact",
    domain: "HISTORY",
    title: "היסטוריה - שאלון ראשון - יהודי ארצות האסלאם והקמת המדינה",
    context:
      "בתזכיר ששלח ראש הקהילה היהודית בבגדד באוקטובר 1949 נכתב כי התקוות שהמלחמה בארץ ישראל לא תפגע בקהילה הוותיקה נכזבו, וכי המצור והרדיפות מתהדקים.",
    instruction:
      "מה הייתה השפעת הקמת מדינת ישראל ומלחמת העצמאות על מעמדם של היהודים בארצות האסלאם?",
    options: [
      {
        id: "1",
        plainText:
          "שיפור מיידי במעמד היהודים והענקת שוויון זכויות פוליטי מלא כפיצוי על המלחמה",
        isCorrect: false,
        explanation: "מסיח הפוך מהמציאות ההיסטורית.",
      },
      {
        id: "2",
        plainText:
          "חתימה על הסכמי חסות בינלאומיים שהגנו לחלוטין על הרכוש והחיים של יהודי ארצות ערב",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "השתלבות מנהיגי הקהילות היהודיות בצמרת הממשלות הערביות במטרה לתווך מול ישראל",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "הרעה דרמטית בביטחונם ובמעמדם: השלטונות והחברה זיהו אותם כ'גיס חמישי' וסייעני האויב הציוני, מה שהוביל לרדיפות, מאסרים, פוגרומים ונישול שהאיצו את עלייתם ההמונית",
        isCorrect: true,
        explanation:
          "מלחמת העצמאות והתבוסה הערבית הביאו לגל פרעות, נישול אזרחי וכלכלי, מעצרים המוניים והתנכלויות כלפי היהודים במדינות ערב (עיראק, מצרים, סוריה, לוב ועוד), שנחשדו בבגידה כסוכני הציונות. תהליך זה הביא לקריסת ביטחונם ולהצלתם בעלייה המונית לישראל.",
      },
    ],
  },
];

/** היסטוריה — שאלון שני (22262). Titles: "היסטוריה - שאלון שני - [נושא]". domain: HISTORY. */
export const BAGRUT_HISTORY_2_QUESTIONS: DiagnosticQuestion[] = [
  // ================= אפשרות 1 נכונה (3 שאלות) =================
  {
    id: "hist2-hasmonean-hellenization-duality",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - החשמונאים: דואליות ההלניזציה",
    context:
      "בשירו של קוואפיס מתוארים אלכסנדר ינאי ושלומציון: 'הם יהודים טובים, יהודים טהורים... אבל בתוקף נסיבות מסוימות, הם שולטים היטב ביוונית המדוברת והם חוברים ליוונים ולשליטים המתיוונים'.",
    instruction:
      "מה מאפיין את תהליך ההלניזציה של השליטים החשמונאים המאוחרים על פי תיאור זה ועל פי המחקר ההיסטורי?",
    options: [
      {
        id: "1",
        plainText:
          "אימוץ סממנים הלניסטיים חיצוניים ודפוסי שלטון מלוכניים (שמות כפולים, גינוני חצר, שפת דיפלומטיה וצבא שכירים), לצד שמירה על מחויבות דתית-לאומית ליהדות ולבית המקדש",
        isCorrect: true,
        explanation:
          "החשמונאים המאוחרים לא עבדו אלילים, אלא שילבו בין שמירה על מעמדם ככוהנים גדולים ומנהיגי האומה היהודית לבין אימוץ כלים פוליטיים, צבאיים ותרבותיים הלניסטיים שאפשרו להם לשלוט כשווים במרחב הגיאופוליטי של המזרח הקדום.",
      },
      {
        id: "2",
        plainText:
          "נטישה מוחלטת של דת משה והמרת פולחן בית המקדש בפולחן האלים הסלאוקיים",
        isCorrect: false,
        explanation:
          "מסיח: החשמונאים מעולם לא המירו את דתם ולא עבדו אלילים במקדש.",
      },
      {
        id: "3",
        plainText:
          "כניעה מרצון של החשמונאים לשלטון מלכי אנטיוכיה וביטול העצמאות המדינית היהודית",
        isCorrect: false,
        explanation:
          "מסיח: החשמונאים הרחיבו את עצמאותם ונלחמו בסלאוקים.",
      },
      {
        id: "4",
        plainText:
          "התבדלות מוחלטת מכל מגע עם העולם ההלניסטי ואיסור השימוש בשפה היוונית",
        isCorrect: false,
        explanation: "מסיח הפוך מהמציאות ההיסטורית.",
      },
    ],
  },
  {
    id: "hist2-herod-client-king-dilemma",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - הורדוס: דילמת מלך החסות במפעלי הבנייה",
    context:
      "מפת מפעלי הבנייה של הורדוס מציגה מבצרים (מצדה, הרודיון), ערי נמל ופוליס אליליות (קיסריה, סבסטיה) ושיקום מפואר של בית המקדש בירושלים.",
    instruction:
      "כיצד שיקפה מדיניות בנייה זו את הדילמה המרכזית של הורדוס כמלך חסות רומי?",
    options: [
      {
        id: "1",
        plainText:
          "תמרון מתמיד בין שני קהלי יעד מנוגדים: בניית ערי פוליס ומקדשי קיסר כדי להוכיח נאמנות לפטרוניו ברומא, מול שיקום בית המקדש בקנה מידה מפואר כדי לזכות בלגיטימציה דתית מנתיניו היהודים",
        isCorrect: true,
        explanation:
          "הורדוס היה נתון במלכוד מתמיד: כ'מלך חסות' של רומא היה חייב לרצות את פטרוניו הקיסריים באמצעות בנייה הלניסטית-רומית, ומנגד נזקק ללגיטימציה מנתיניו היהודים שראו בו 'עבד אדומי', ועל כן השקיע ממון רב בפיאור המקדש בירושלים תוך הקפדה על חוקי ההלכה.",
      },
      {
        id: "2",
        plainText:
          "רצון לבזבז את כל כספי האוצר כדי למנוע מן הרומאים לדרוש תשלום מיסים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "כוונה להפוך את קיסריה למרכז הרוחני של היהדות במקום ירושלים",
        isCorrect: false,
        explanation: "מסיח: ירושלים נותרה המרכז הדתי הבלעדי.",
      },
      {
        id: "4",
        plainText:
          "ניסיון לפתות את הפרושים להפוך לכוהנים במקדשי האלילים בסבסטיה",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "hist2-great-revolt-destruction-trauma",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - חורבן בית שני: השבר הדתי וההנהגתי",
    context:
      "חורבן בית המקדש השני בידי טיטוס (שנת 70 לספירה) גרר טראומה עמוקה ואיום ממשי על המשך קיומו של העם היהודי.",
    instruction:
      "מדוע היווה חורבן המקדש שבר עמוק וטראומה חסרת תקדים בחברה ובהגות היהודית?",
    options: [
      {
        id: "1",
        plainText:
          "המקדש נתפס כמשכן הבלעדי של השכינה, מרכז כפרת העוונות והפולחן הדתי, הנהגת הכהונה והצדוקים קרסה לחלוטין, ואובדן המרכז הלאומי יצר תחושת נטישה אלוהית וסכנת התפוררות",
        isCorrect: true,
        explanation:
          "בית המקדש היה המוקד היחיד להקרבת קורבנות ולכפרת עוונות. חורבנו העלה שאלות תאולוגיות מייסרות על נטישת ה', שבר לחלוטין את מעמד הכהונה והצדוקים שהנהיגו את המדינה, ואיים להטביע את העם בייאוש, אבלות מתמדת ופריקת עול.",
      },
      {
        id: "2",
        plainText:
          "החורבן גרם לאובדן התורה שבכתב ולשריפת כל ספרי המקרא שהיו קיימים בעולם",
        isCorrect: false,
        explanation:
          "מסיח: התורה נשמרה והועתקה ברחבי הארץ והתפוצות.",
      },
      {
        id: "3",
        plainText:
          "העם היהודי התנצר באופן המוני מיד לאחר נפילת חומות ירושלים",
        isCorrect: false,
        explanation: "מסיח היסטורי שגוי.",
      },
      {
        id: "4",
        plainText:
          "הרומאים אסרו לחלוטין על מגורי יהודים בכל רחבי המזרח התיכון בעקבות החורבן",
        isCorrect: false,
        explanation:
          "מסיח: היישוב היהודי המשיך להתקיים ביהודה ובגליל.",
      },
    ],
  },

  // ================= אפשרות 2 נכונה (3 שאלות) =================
  {
    id: "hist2-hasmonean-expansion-demography",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - החשמונאים: גירוש מול גיור (שמעון והורקנוס)",
    context:
      "בספר מקבים מסופר כי שמעון כבש את גזר וגירש את יושביה הנוכרים, ואילו יוסף בן מתתיהו מספר כי יוחנן הורקנוס כבש את אדום וחייב את תושביה להימול ולקבל את חוקי התורה.",
    instruction:
      "מהו ההבדל המרכזי בין שני המנהיגים ומה הייתה מטרתם המשותפת?",
    options: [
      {
        id: "1",
        plainText:
          "שמעון שיתף פעולה עם עובדי האלילים, ואילו הורקנוס ראה בהם אויב שיש להשמידו פיזית ללא תנאי",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "שמעון נקט מדיניות של גירוש וטיהור אתני-דתי של השטח, בעוד הורקנוס נקט גיור כפוי; שניהם פעלו במטרה משותפת לבער עבודה זרה ולהבטיח ביטחון ורצף טריטוריאלי יהודי",
        isCorrect: true,
        explanation:
          "שמעון פעל באמצעות פינוי וגירוש אוכלוסייה נוכרית עוינת ויישוב יהודים במקומה, בעוד הורקנוס בחר בהטמעת האוכלוסייה המקומית (האדומים) בתוך העם היהודי באמצעות גיור כפוי. המטרה המשותפת לשניהם הייתה יצירת מרחב גיאוגרפי יהודי רציף, בטוח ונאמן שלטונית.",
      },
      {
        id: "3",
        plainText:
          "שמעון פעל ממניעים כלכליים בלבד, בעוד הורקנוס ביקש להקים צבא אדומי לכיבוש רומא",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "שמעון התנגד להתרחבות הממלכה, בעוד הורקנוס ביקש לספח את שטחי מצרים",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "hist2-roman-procurators-oppression",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - שלטון הנציבים ועושק הפרובינקיה",
    context:
      "עם תחילת תקופת הנציבים הרומיים (שנת 6 לספירה) עברה יהודה לשלטון ישיר של נציבים ממעמד הפרשים הרומי.",
    instruction:
      "אילו מאפיינים של שלטון הנציבים העמיקו את האיבה וקרבו את פרוץ המרד הגדול?",
    options: [
      {
        id: "1",
        plainText:
          "הקמת מוסדות חינוך חובה לכלל ילדי יהודה במימון מלא של הקיסרות הרומית",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "עול מיסים מכביד, עריצות ושחיתות אישית של הנציבים (במיוחד פלורוס), פגיעה ברגשות הדת היהודיים ומינוי שרירותי של כוהנים גדולים תמורת שוחד",
        isCorrect: true,
        explanation:
          "הנציבים ראו ביהודה פרובינקיה נידחת שנועדה להתעשרות אישית מהירה. הם עשקו את התושבים במיסים כבדים, בזזו את אוצרות המקדש (פלורוס), פגעו בקודשי הדת והפכו את משרת הכהן הגדול לסחורה הנמכרת למרבה במחיר, מה שהביא לתסיסה עממית שפרצה כמרד.",
      },
      {
        id: "3",
        plainText:
          "ביטול המשפט הפלילי והעברת כל סמכויות הממשל לידי מועצת הקנאים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "הענקת אזרחות רומית מלאה לכל תושבי יהודה ופטור מוחלט משירות צבאי וממיסים",
        isCorrect: false,
        explanation: "מסיח הפוך לחלוטין.",
      },
    ],
  },
  {
    id: "hist2-yavne-temple-to-book-transition",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - רבן יוחנן בן זכאי: מעם מקדש לעם הספר",
    context:
      'לאחר חורבן הבית השני הקים רבן יוחנן בן זכאי (ריב"ז) בהסכמת הרומאים את המרכז התורני וההנהגתי ביבנה.',
    instruction:
      'כיצד הובילו פעולותיהם ותקנותיהם של ריב"ז וחכמי יבנה למעבר העם מ\'עם המקדש\' ל\'עם הספר\'?',
    options: [
      {
        id: "1",
        plainText:
          "קבעו כי אין לקיים מצוות כלל עד שייבנה בית המקדש השלישי בידי מלך המשיח",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "יצרו חלופות רוחניות לפולחן המקדש (תפילה, גמילות חסדים ולימוד תורה), העבירו מנהגים זכר למקדש לרחבי הארץ (כשופר ולולב), ומיקמו את בית הכנסת ובית המדרש במרכז החיים",
        isCorrect: true,
        explanation:
          "חכמי יבנה יצרו 'יהדות ללא מקדש': הם קבעו כי תפילה, תשובה וגמילות חסדים מכפרים במקום קורבנות ('חסד חפצתי ולא זבח'), הפכו את לימוד התורה לעבודה הדתית העליונה, והעבירו סמכויות ומנהגים שהיו ייחודיים לירושלים לכלל הקהילות, מה שאיפשר ליהדות לשרוד גם בגלות.",
      },
      {
        id: "3",
        plainText:
          "חייבו את כל הגברים היהודים להתגייס למרד מזוין כנגד שלטון הנציבים הרומיים",
        isCorrect: false,
        explanation:
          'מסיח: ריב"ז התנגד למרד ודגל בפייסנות מול רומא.',
      },
      {
        id: "4",
        plainText:
          "ביטלו את מעמד הסנהדרין והכפיפו את פסיקת ההלכה לפקידי הממשל הקיסרי",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= אפשרות 3 נכונה (3 שאלות) =================
  {
    id: "hist2-hasmonean-monarchy-high-priesthood-clash",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - החשמונאים: התנגדות הפרושים לכתר המלוכה",
    context:
      "החל מימי יהודה אריסטובולוס ואלכסנדר ינאי נטלו לעצמם שליטי בית חשמונאי את תואר המלוכה במקביל לכהונה הגדולה.",
    instruction:
      "מדוע עורר שינוי זה במעמד המנהיג התנגדות חריפה במיוחד מצד חכמי הפרושים?",
    options: [
      {
        id: "1",
        plainText:
          "משום שהמלכים החשמונאים סירבו להמשיך להטיל מס שנתי על ערי הפוליס הנוכריות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "משום שהשליטים החשמונאים החליטו להעביר את הבירה מירושלים לשומרון",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          'משום שהשליטים החשמונאים ריכזו בידיהם את כתר המלכות יחד עם הכהונה הגדולה, בניגוד למסורת התנ"כית המפרידה בין מלכות (מזרע דוד) לכהונה (מזרע אהרן)',
        isCorrect: true,
        explanation:
          "הפרושים ראו באיחוד סמכויות המלוכה והכהונה הגדולה בידי אדם אחד ריכוז כוח רודני המסכן את טוהר המקדש וסותר את המסורת המקראית של הפרדת רשויות: מלוכה משבט יהודה (בית דוד), וכהונה משבט לוי (בית צדוק/אהרן).",
      },
      {
        id: "4",
        plainText:
          "משום שהפרושים דרשו למנות נציב רומי שיעמוד בראש מנגנון המשפט והמקדש",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "hist2-bar-kokhba-messianic-controversy",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - מרד בר כוכבא: המחלוקת על המשיחיות",
    context:
      "במדרש מסופר כי רבי עקיבא קרא על שמעון בן כוסיבא: 'דרך כוכב מיעקב – זהו מלך המשיח', ואילו רבי יוחנן בן תורתא השיב לו: 'עקיבא, יעלו עשבים בלחייך ועדיין בן דוד אינו בא'.",
    instruction:
      "מה מלמד דיאלוג מפורסם זה על היחס למרד בקרב הנהגת החכמים?",
    options: [
      {
        id: "1",
        plainText:
          "הייתה תמימות דעים מוחלטת בקרב כל חכמי ישראל כי שעת הגאולה הסופית הגיעה",
        isCorrect: false,
        explanation:
          "מסיח: הדיאלוג מוכיח מחלוקת עמוקה ולא הסכמה.",
      },
      {
        id: "2",
        plainText:
          "כל החכמים התנגדו התנגדות נחרצת למרד וסירבו לתמוך בלוחמים בשום שלב",
        isCorrect: false,
        explanation: "מסיח: רבי עקיבא תמך בו בבירור.",
      },
      {
        id: "3",
        plainText:
          "שררה מחלוקת עמוקה: חלק ממנהיגי הדור (כרבי עקיבא) ראו בבר כוכבא משיח גואל ומצביא שיחדש את המלכות, בעוד חכמים אחרים הביעו ספקנות גמורה והתנגדו למשיחיות פוליטית מסוכנת",
        isCorrect: true,
        explanation:
          "המקור משקף את הוויכוח הנוקב בקרב חכמי ישראל ערב המרד: האם בר כוכבא הוא משיח צדק שנשלח לגאול את ישראל מיד רומא (עמדת רבי עקיבא), או שמא מדובר בהרפתקה משיחית מסוכנת שתוביל לאסון לאומי (עמדת רבי יוחנן בן תורתא).",
      },
      {
        id: "4",
        plainText:
          "הוויכוח נסב אך ורק על השאלה האם בר כוכבא ראוי לכהן ככהן גדול במקדש החרב",
        isCorrect: false,
        explanation:
          "מסיח: הוויכוח נגע למשיחיות ולעצם היציאה למרד.",
      },
    ],
  },
  {
    id: "hist2-bar-kokhba-tactics-hiding-systems",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - מרד בר כוכבא: טקטיקת מערכות המסתור",
    context:
      "בראשית מרד בר כוכבא (132 לספירה) נחלו המורדים הצלחה כבירה והביסו את הלגיונות הרומיים שהוצבו בארץ.",
    instruction:
      "אילו גורמים אסטרטגיים וטקטיים אפשרו לכוחותיו של בר כוכבא לנחול הצלחה זו בתחילת המרד?",
    options: [
      {
        id: "1",
        plainText:
          "עליונות ימית של הצי היהודי שהטיל מצור מושלם על חופי איטליה",
        isCorrect: false,
        explanation: "מסיח דמיוני.",
      },
      {
        id: "2",
        plainText:
          "תמיכה צבאית ישירה של גדודי חיל רגלים שנשלחו מן האימפריה הפרתית",
        isCorrect: false,
        explanation: "מסיח: הפרתים לא התערבו צבאית במרד.",
      },
      {
        id: "3",
        plainText:
          "הכנה ממושכת ומחתרתית שכללה חפירת רשת מערכות מסתור ומערות מקושרות, איסוף נשק סודי, לוחמת גרילה והפתעה, והנהגה צבאית ורוחנית מלוכדת",
        isCorrect: true,
        explanation:
          "בר כוכבא נמנע מקרבות פנים-אל-פנים מול הלגיונות. הוא ניצל רשת ענפה של מערכות מסתור תת-קרקעיות שנחפרו מראש בשפלת יהודה, אגר אספקה ונשק, תקף את הצבא הרומי במארבי פתע וגרילה, והפעיל משמעת צבאית הדוקה.",
      },
      {
        id: "4",
        plainText:
          "שימוש בנשק חם מתקדם שלא היה מוכר ללגיונות הרומיים",
        isCorrect: false,
        explanation: "מסיח אנכרוניסטי.",
      },
    ],
  },

  // ================= אפשרות 4 נכונה (3 שאלות) =================
  {
    id: "hist2-herod-rebuilding-temple-contradiction",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - הורדוס: פיאור בית המקדש מול עריצותו",
    context:
      "ההיסטוריון גדליהו אלון קבע כי הורדוס 'לא היה מלך הגויים ואף לא מלך היהודים אלא עריץ סתם'.",
    instruction:
      "איזו מבין העובדות ההיסטוריות הבאות סותרת במידה הבולטת ביותר את קביעתו החד-צדדית של אלון?",
    options: [
      {
        id: "1",
        plainText:
          "הוצאתם להורג של אשתו מרים החשמונאית ושני בניו מחשש לקשר כנגדו",
        isCorrect: false,
        explanation:
          "מסיח המחזק את טענת העריצות של הורדוס ולא סותר אותה.",
      },
      {
        id: "2",
        plainText:
          "חיסול מרבית חברי הסנהדרין והפקעת סמכויות השיפוט של הכהונה הגדולה",
        isCorrect: false,
        explanation: "מסיח המחזק את עריצותו.",
      },
      {
        id: "3",
        plainText:
          "הקמת רשת ביון פנימית והטלת עונשי מוות אכזריים על מתנגדי משטרו",
        isCorrect: false,
        explanation: "מסיח המאשר את טענת העריצות.",
      },
      {
        id: "4",
        plainText:
          "מפעלו האדיר לשחזור, פיאור והרחבת בית המקדש בירושלים תוך הקפדה על חוקי ההלכה והטהרה, לצד הגנתו על זכויות היהודים בתפוצות",
        isCorrect: true,
        explanation:
          'הורדוס שיקם את בית המקדש השני במפעל בנייה מהמפוארים בעולם העתיק (חז"ל העידו: \'מי שלא ראה בניין הורדוס לא ראה בניין נאה מימיו\'), תוך שיתוף פעולה עם החכמים והקפדה על איסור כניסת זרים. בנוסף, הוא התערב אצל אוגוסטוס להבטחת חופש הפולחן ומעמדם של יהודי התפוצות.',
      },
    ],
  },
  {
    id: "hist2-leadership-transformation-pharisees-rise",
    domain: "HISTORY",
    title:
      "היסטוריה - שאלון שני - תוצאות המרד הגדול: קריסת הכהונה ועליית החכמים",
    context:
      "תוצאות המרד הגדול ונפילת ירושלים (70 לספירה) שינו מן היסוד את המבנה המעמדי והחברתי של העם היהודי.",
    instruction:
      "כיצד השפיעו תוצאות המרד על יחסי הכוחות וההנהגה בתוך העם היהודי?",
    options: [
      {
        id: "1",
        plainText:
          "התחזקות מוחלטת של מעמד האיסיים שהפכו למנהיגי היישוב היהודי בגליל",
        isCorrect: false,
        explanation: "מסיח: כת האיסיים הושמדה או נעלמה במרד.",
      },
      {
        id: "2",
        plainText:
          "העברת השלטון הפוליטי ביהודה לידי ראשי תנועת הסיקריים שנמלטו מירושלים",
        isCorrect: false,
        explanation: "מסיח: הסיקריים הובסו במצדה ונעלמו.",
      },
      {
        id: "3",
        plainText:
          "היעלמות מוחלטת של מוסד החכמים והקמת שלטון כוהנים חדש בטבריה",
        isCorrect: false,
        explanation: "מסיח הפוך.",
      },
      {
        id: "4",
        plainText:
          "קריסה מוחלטת של מעמד האריסטוקרטיה הצדוקית והכהונה הגדולה שאיבדו את מקור כוחן עם חורבן המקדש, ועליית החכמים הפרושים כמנהיגות הבלעדית של האומה",
        isCorrect: true,
        explanation:
          "מעמד הצדוקים והכוהנים הגדולים נשען בלעדית על עבודת בית המקדש ומרכזיותה הפוליטית של ירושלים. עם חורבן המקדש נשמט הבסיס לקיומם, ואת מקומם תפסו חכמי הפרושים (חכמי יבנה) שהנהיגו את העם על בסיס ידע תורני, מוסר והלכה.",
      },
    ],
  },
  {
    id: "hist2-hadrian-decrees-aelia-capitolina",
    domain: "HISTORY",
    title: "היסטוריה - שאלון שני - תוצאות מרד בר כוכבא: גזרות אדריאנוס",
    context:
      "לאחר דיכוי מרד בר כוכבא (135 לספירה) נקט הקיסר אדריאנוס שורה של צעדי ענישה חסרי תקדים כנגד היישוב היהודי.",
    instruction:
      "אילו אמצעים מנהליים ואידאולוגיים נקט אדריאנוס כדי להבטיח שלא תפרוץ עוד התקוממות יהודית בארץ?",
    options: [
      {
        id: "1",
        plainText:
          "כריתת ברית שלום עם החכמים והקמת מרכז אוטונומי יהודי חדש בהר הבית",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "החזרת שושלת בית הורדוס לשלוט בירושלים תחת חסות הסנאט",
        isCorrect: false,
        explanation: "מסיח: שושלת הורדוס כבר לא הייתה קיימת.",
      },
      {
        id: "3",
        plainText:
          "חלוקת אדמות יהודה למורדים היהודים שהסכימו להניח את נשקם",
        isCorrect: false,
        explanation: "מסיח: המורדים הוצאו להורג או נמכרו לעבדות.",
      },
      {
        id: "4",
        plainText:
          "הטלת גזרות שמד על קיום מצוות התורה (מילה, שבת וסמיכת חכמים), הקמת העיר האלילית איליה קפיטולינה על חורבות ירושלים, ומחיקת השם 'יהודה' לטובת 'סוריה-פלשתינה'",
        isCorrect: true,
        explanation:
          "אדריאנוס ביקש לעקור את הלאומיות היהודית מן השורש: הוא גזר עונש מוות על קיום מצוות היסוד (עשרת הרוגי מלכות), אסר על יהודים להיכנס לירושלים שהפכה לעיר אלילית ('איליה קפיטולינה') עם מקדש ליופיטר, ושינה את שם הפרובינקיה ל'סוריה-פלשתינה' כדי למחוק כל זיקה היסטורית של עם ישראל לארצו.",
      },
    ],
  },
];

/** Combined history bank — routing uses HISTORY_1 / HISTORY_2 via exam dispatch. */
export const BAGRUT_HISTORY_QUESTIONS: DiagnosticQuestion[] = [
  ...BAGRUT_HISTORY_1_QUESTIONS,
  ...BAGRUT_HISTORY_2_QUESTIONS,
];

/* -------------------------------------------------------------------------- */
/* ACADEMIC — banks in lib/academic-questions (12Q contract, isolated files)  */
/* -------------------------------------------------------------------------- */

export type {
  AcademicDegreeId,
  AcademicCourseMeta,
  AcademicCourseKey,
} from "./academic-questions";

export {
  ACADEMIC_CALC_QUESTIONS,
  ACADEMIC_CALC2_QUESTIONS,
  ACADEMIC_LINALG_QUESTIONS,
  ACADEMIC_LINALG2_QUESTIONS,
  ACADEMIC_CS_QUESTIONS,
  ACADEMIC_DISCRETE_MATH_QUESTIONS,
  ACADEMIC_INTRO_CS_QUESTIONS,
  ACADEMIC_ALGORITHMS_QUESTIONS,
  ACADEMIC_OPERATING_SYSTEMS_QUESTIONS,
  ACADEMIC_AUTOMATA_QUESTIONS,
  ACADEMIC_ELECTRIC_CIRCUITS_QUESTIONS,
  ACADEMIC_PHYSICS_1_QUESTIONS,
  ACADEMIC_PHYSICS_2_QUESTIONS,
  ACADEMIC_PROB_QUESTIONS,
  ACADEMIC_ODE_QUESTIONS,
  ACADEMIC_PDE_QUESTIONS,
  ACADEMIC_SIGNALS_SYSTEMS_QUESTIONS,
  ACADEMIC_COMPUTER_ARCHITECTURE_QUESTIONS,
  ACADEMIC_MECHANICS_MATERIALS_QUESTIONS,
  ACADEMIC_OPERATIONS_RESEARCH_QUESTIONS,
  ACADEMIC_DATABASES_QUESTIONS,
  ACADEMIC_COMPUTER_NETWORKS_QUESTIONS,
  ACADEMIC_MACHINE_LEARNING_QUESTIONS,
  ACADEMIC_CONTROL_THEORY_QUESTIONS,
  ACADEMIC_OOP_ADVANCED_QUESTIONS,
  ACADEMIC_THERMODYNAMICS_QUESTIONS,
  ACADEMIC_COURSES,
  ACADEMIC_COURSE_DISPATCH,
  CALCULUS_QUESTIONS,
  CALCULUS_2_QUESTIONS,
  LINEAR_ALGEBRA_1_QUESTIONS,
  LINEAR_ALGEBRA_2_QUESTIONS,
  DISCRETE_MATHEMATICS_QUESTIONS,
  INTRO_CS_QUESTIONS,
  ALGORITHMS_QUESTIONS,
  OPERATING_SYSTEMS_QUESTIONS,
  AUTOMATA_QUESTIONS,
  ELECTRIC_CIRCUITS_QUESTIONS,
  PHYSICS_1_QUESTIONS,
  PHYSICS_2_QUESTIONS,
  PROBABILITY_STATISTICS_QUESTIONS,
  ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS,
  PDE_FOURIER_QUESTIONS,
  SIGNALS_SYSTEMS_QUESTIONS,
  COMPUTER_ARCHITECTURE_QUESTIONS,
  MECHANICS_MATERIALS_QUESTIONS,
  OPERATIONS_RESEARCH_QUESTIONS,
  DATABASES_QUESTIONS,
  COMPUTER_NETWORKS_QUESTIONS,
  MACHINE_LEARNING_QUESTIONS,
  CONTROL_THEORY_QUESTIONS,
  OOP_ADVANCED_QUESTIONS,
  THERMODYNAMICS_QUESTIONS,
  SEMICONDUCTORS_QUESTIONS,
  FLUID_MECHANICS_QUESTIONS,
  COMPILERS_QUESTIONS,
  ELECTROMAGNETICS_QUESTIONS,
  INFORMATION_SECURITY_QUESTIONS,
  ELECTRONIC_CIRCUITS_QUESTIONS,
  ENERGY_CONVERSION_QUESTIONS,
  HEAT_MASS_TRANSFER_QUESTIONS,
  sampleAcademicCalcQuestions,
  sampleAcademicCalc2Questions,
  sampleAcademicLinAlgQuestions,
  sampleAcademicLinAlg2Questions,
  sampleAcademicCsQuestions,
  sampleAcademicDiscreteMathQuestions,
  sampleAcademicIntroCsQuestions,
  sampleAcademicAlgorithmsQuestions,
  sampleAcademicOperatingSystemsQuestions,
  sampleAcademicAutomataQuestions,
  sampleAcademicCircuitsQuestions,
  sampleAcademicPhysics1Questions,
  sampleAcademicPhysics2Questions,
  sampleAcademicProbQuestions,
  sampleAcademicOdeQuestions,
  sampleAcademicPdeQuestions,
  sampleAcademicSignalsSystemsQuestions,
  sampleAcademicComputerArchitectureQuestions,
  sampleAcademicMechanicsMaterialsQuestions,
  sampleAcademicOperationsResearchQuestions,
  sampleAcademicDatabasesQuestions,
  sampleAcademicComputerNetworksQuestions,
  sampleAcademicMachineLearningQuestions,
  sampleAcademicControlTheoryQuestions,
  sampleAcademicOOPAdvancedQuestions,
  sampleAcademicThermodynamicsQuestions,
  sampleAcademicSemiconductorsQuestions,
  sampleAcademicFluidMechanicsQuestions,
  sampleAcademicCompilersQuestions,
  sampleAcademicElectromagneticsQuestions,
  sampleAcademicInformationSecurityQuestions,
  sampleAcademicElectronicCircuitsQuestions,
  sampleAcademicEnergyConversionQuestions,
  sampleAcademicHeatMassTransferQuestions,
  sampleAcademicAppliedRegressionQuestions,
  sampleAcademicDeepLearningQuestions,
  sampleAcademicKinematicsDynamicsQuestions,
  sampleAcademicStochasticModelsQuestions,
  sampleAcademicMachineDesignQuestions,
  sampleAcademicProductionPlanningQuestions,
  sampleAcademicStratified,
  sampleCalculusOnboardingQuestions,
  sampleCalculus2OnboardingQuestions,
  sampleLinearAlgebra1OnboardingQuestions,
  sampleLinearAlgebra2OnboardingQuestions,
  sampleDiscreteMathOnboardingQuestions,
  sampleDiscreteMathByTag,
  sampleIntroCSOnboardingQuestions,
  sampleAlgorithmsOnboardingQuestions,
  sampleOperatingSystemsOnboardingQuestions,
  sampleAutomataOnboardingQuestions,
  sampleCircuitsOnboardingQuestions,
  samplePhysics1OnboardingQuestions,
  samplePhysics2OnboardingQuestions,
  sampleProbabilityStatisticsOnboardingQuestions,
  sampleODEOnboardingQuestions,
  samplePDEOnboardingQuestions,
  sampleSignalsSystemsOnboardingQuestions,
  sampleComputerArchitectureOnboardingQuestions,
  sampleMechanicsMaterialsOnboardingQuestions,
  sampleOperationsResearchOnboardingQuestions,
  sampleDatabasesOnboardingQuestions,
  sampleComputerNetworksOnboardingQuestions,
  sampleMachineLearningOnboardingQuestions,
  sampleControlTheoryOnboardingQuestions,
  sampleOOPAdvancedOnboardingQuestions,
  sampleThermodynamicsOnboardingQuestions,
  sampleSemiconductorsOnboardingQuestions,
  sampleFluidMechanicsOnboardingQuestions,
  sampleCompilersOnboardingQuestions,
  sampleElectromagneticsOnboardingQuestions,
  sampleInformationSecurityOnboardingQuestions,
  sampleElectronicCircuitsOnboardingQuestions,
  sampleEnergyConversionOnboardingQuestions,
  sampleHeatMassTransferOnboardingQuestions,
  ACADEMIC_APPLIED_REGRESSION_QUESTIONS,
  APPLIED_REGRESSION_QUESTIONS,
  sampleAppliedRegressionOnboardingQuestions,
  ACADEMIC_DEEP_LEARNING_QUESTIONS,
  DEEP_LEARNING_QUESTIONS,
  sampleDeepLearningOnboardingQuestions,
  ACADEMIC_KINEMATICS_DYNAMICS_QUESTIONS,
  KINEMATICS_DYNAMICS_QUESTIONS,
  sampleKinematicsDynamicsOnboardingQuestions,
  ACADEMIC_STOCHASTIC_MODELS_QUESTIONS,
  STOCHASTIC_MODELS_QUESTIONS,
  sampleStochasticModelsOnboardingQuestions,
  ACADEMIC_MACHINE_DESIGN_QUESTIONS,
  MACHINE_DESIGN_QUESTIONS,
  sampleMachineDesignOnboardingQuestions,
  ACADEMIC_PRODUCTION_PLANNING_QUESTIONS,
  PRODUCTION_PLANNING_QUESTIONS,
  sampleProductionPlanningOnboardingQuestions,
  ACADEMIC_NONLINEAR_OPTIMIZATION_QUESTIONS,
  NONLINEAR_OPTIMIZATION_QUESTIONS,
  sampleNonlinearOptimizationOnboardingQuestions,
  ACADEMIC_BIG_DATA_ANALYTICS_QUESTIONS,
  BIG_DATA_ANALYTICS_QUESTIONS,
  sampleBigDataAnalyticsOnboardingQuestions,
  sampleAcademicNonlinearOptimizationQuestions,
  sampleAcademicBigDataAnalyticsQuestions,
  ACADEMIC_ADVANCED_MACHINE_LEARNING_QUESTIONS,
  ADVANCED_MACHINE_LEARNING_QUESTIONS,
  sampleAdvancedMachineLearningOnboardingQuestions,
  sampleAcademicAdvancedMachineLearningQuestions,
  ACADEMIC_DATA_TEXT_MINING_QUESTIONS,
  DATA_TEXT_MINING_QUESTIONS,
  sampleDataTextMiningOnboardingQuestions,
  sampleAcademicDataTextMiningQuestions,
  ACADEMIC_ADVANCED_DATABASES_NOSQL_QUESTIONS,
  ADVANCED_DATABASES_NOSQL_QUESTIONS,
  sampleAdvancedDatabasesNoSQLOnboardingQuestions,
  sampleAcademicAdvancedDatabasesNoSQLQuestions,
  ACADEMIC_SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS,
  SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS,
  sampleSystemsAnalysisArchitectureOnboardingQuestions,
  sampleAcademicSystemsAnalysisArchitectureQuestions,
  ACADEMIC_SIMULATION_SYSTEMS_QUESTIONS,
  SIMULATION_SYSTEMS_QUESTIONS,
  sampleSimulationSystemsOnboardingQuestions,
  sampleAcademicSimulationSystemsQuestions,
  ACADEMIC_UI_UX_ENGINEERING_QUESTIONS,
  UI_UX_ENGINEERING_QUESTIONS,
  sampleUIUXEngineeringOnboardingQuestions,
  sampleAcademicUIUXEngineeringQuestions,
  ACADEMIC_ENGINEERING_ECONOMY_QUESTIONS,
  ENGINEERING_ECONOMY_QUESTIONS,
  sampleEngineeringEconomyOnboardingQuestions,
  sampleAcademicEngineeringEconomyQuestions,
  ACADEMIC_QUALITY_ENGINEERING_QUESTIONS,
  QUALITY_ENGINEERING_QUESTIONS,
  sampleQualityEngineeringOnboardingQuestions,
  sampleAcademicQualityEngineeringQuestions,
  ACADEMIC_METHODS_ENGINEERING_ERGONOMICS_QUESTIONS,
  METHODS_ENGINEERING_ERGONOMICS_QUESTIONS,
  sampleMethodsEngineeringErgonomicsOnboardingQuestions,
  sampleAcademicMethodsErgonomicsQuestions,
  ACADEMIC_IS_SECURITY_RISK_MANAGEMENT_QUESTIONS,
  IS_SECURITY_RISK_MANAGEMENT_QUESTIONS,
  sampleISSecurityRiskManagementOnboardingQuestions,
  sampleAcademicISSecurityRiskQuestions,
  ACADEMIC_STRUCTURAL_STATICS_QUESTIONS,
  STRUCTURAL_STATICS_QUESTIONS,
  sampleStructuralStaticsOnboardingQuestions,
  sampleAcademicStructuralStaticsQuestions,
  ACADEMIC_DIGITAL_LOGIC_QUESTIONS,
  DIGITAL_LOGIC_QUESTIONS,
  sampleDigitalLogicOnboardingQuestions,
  sampleAcademicDigitalLogicQuestions,
  ACADEMIC_DISTRIBUTED_SYSTEMS_QUESTIONS,
  DISTRIBUTED_SYSTEMS_QUESTIONS,
  sampleDistributedSystemsOnboardingQuestions,
  sampleAcademicDistributedSystemsQuestions,
  ACADEMIC_COMPUTER_VISION_QUESTIONS,
  COMPUTER_VISION_QUESTIONS,
  sampleComputerVisionOnboardingQuestions,
  sampleAcademicComputerVisionQuestions,
  ACADEMIC_THEORY_COMPUTATION_COMPLEXITY_QUESTIONS,
  THEORY_COMPUTATION_COMPLEXITY_QUESTIONS,
  sampleTheoryComputationComplexityOnboardingQuestions,
  sampleAcademicTheoryComputationComplexityQuestions,
  ACADEMIC_COMPLEX_FUNCTIONS_QUESTIONS,
  COMPLEX_FUNCTIONS_QUESTIONS,
  sampleComplexFunctionsOnboardingQuestions,
  sampleAcademicComplexFunctionsQuestions,
  ACADEMIC_DIGITAL_COMMUNICATIONS_QUESTIONS,
  DIGITAL_COMMUNICATIONS_QUESTIONS,
  sampleDigitalCommunicationsOnboardingQuestions,
  sampleAcademicDigitalCommunicationsQuestions,
  ACADEMIC_GENERAL_CHEMISTRY_QUESTIONS,
  GENERAL_CHEMISTRY_QUESTIONS,
  sampleGeneralChemistryOnboardingQuestions,
  ACADEMIC_CAD_QUESTIONS,
  CAD_MECHANICAL_DESIGN_QUESTIONS,
  sampleCadMechanicalDesignOnboardingQuestions,
  ACADEMIC_MATERIALS_SCIENCE_QUESTIONS,
  MATERIALS_SCIENCE_QUESTIONS,
  sampleMaterialsScienceOnboardingQuestions,
  ACADEMIC_MECHANICAL_VIBRATIONS_QUESTIONS,
  MECHANICAL_VIBRATIONS_QUESTIONS,
  sampleMechanicalVibrationsOnboardingQuestions,
  ACADEMIC_FEM_QUESTIONS,
  FINITE_ELEMENT_METHOD_QUESTIONS,
  sampleFemOnboardingQuestions,
  ACADEMIC_DIGITAL_CONTROL_ROBOTICS_QUESTIONS,
  DIGITAL_CONTROL_ROBOTICS_QUESTIONS,
  sampleDigitalControlRoboticsOnboardingQuestions,
  ACADEMIC_PYTHON_QUESTIONS,
  PYTHON_PROGRAMMING_QUESTIONS,
  samplePythonProgrammingOnboardingQuestions,
  ACADEMIC_ORGANIZATION_THEORY_QUESTIONS,
  ORGANIZATION_THEORY_QUESTIONS,
  sampleOrganizationTheoryOnboardingQuestions,
  ACADEMIC_SUPPLY_CHAIN_QUESTIONS,
  SUPPLY_CHAIN_MANAGEMENT_QUESTIONS,
  sampleSupplyChainOnboardingQuestions,
  ACADEMIC_GAME_THEORY_QUESTIONS,
  GAME_THEORY_QUESTIONS,
  sampleGameTheoryOnboardingQuestions,
  ACADEMIC_PLANT_LAYOUT_QUESTIONS,
  PLANT_LAYOUT_DESIGN_QUESTIONS,
  samplePlantLayoutOnboardingQuestions,
  ACADEMIC_BI_QUESTIONS,
  BUSINESS_INTELLIGENCE_QUESTIONS,
  sampleBusinessIntelligenceOnboardingQuestions,
  ACADEMIC_INTRO_DS_QUESTIONS,
  INTRO_DATA_SCIENCE_QUESTIONS,
  sampleIntroDataScienceOnboardingQuestions,
  ACADEMIC_NLP_QUESTIONS,
  NLP_LANGUAGE_PROCESSING_QUESTIONS,
  sampleNlpOnboardingQuestions,
} from "./academic-questions";

/* -------------------------------------------------------------------------- */
/* MECHINA / PSYCHOMETRIC / SCREENING                                          */
/* -------------------------------------------------------------------------- */

const MECHINA_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "mech-1",
    domain: "אלגברה — מערכת עם ערך מוחלט ושורש",
    title: "שאלה 1: משוואה מקוננת (מכינה מתקדמת)",
    context: "מכינה קדם-אקדמית — מתמטיקה",
    instruction: "כמה פתרונות ממשיים יש למשוואה הבאה בתחום ההגדרה?",
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

export const PSYCHOMETRIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "psy-verbal-15",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "במאמר נכתב: \"לאורך ההיסטוריה ניסו בני האדם שוב ושוב לחלץ את עצמם מן ההשתייכות המטרידה לכלל בעלי החיים, ובכל פעם השליכו את יהבם על תכונה אחרת כעל זו שתבצר את ייחודו של האדם: שימוש בכלים, שימוש בשפה, התנהגות מוסרית, הבעת חמלה או הזדהות - אך ללא הועיל. את הכישלונות החוזרים יש לתלות לא בהערכה עצמית מופרזת של האדם, אלא בכך שלא העריך כראוי את אחיו לממלכת החי.\"",
    instruction:
      "על פי המשתמע מהכתוב במאמר, מדוע לא הצליחו בני האדם \"לחלץ את עצמם מן ההשתייכות המטרידה לכלל בעלי החיים\"?",
    options: [
      {
        id: "1",
        plainText:
          "משום שכל תכונה שבני האדם חשבו שהם בלבד התברכו בה התגלתה לבסוף גם אצל בעלי חיים אחרים",
        isCorrect: true,
        explanation:
          "המשפט האחרון מציין שהכישלון נובע מכך שהאדם לא העריך כראוי את שאר בעלי החיים, כלומר התכונות קיימות גם אצלם.",
      },
      {
        id: "2",
        plainText:
          "משום שבני האדם חיפשו את ייחודם דווקא בתכונותיהם הבסיסיות ולא במאפייניהם הנשגבים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "משום שבני האדם לא הבינו שייחודם נעוץ דווקא בהיותם מין נעלה של בעלי חיים, ולא יצור חי מסוג אחר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "משום שהתכונות שבני האדם טענו שהן ייחודיות למין האנושי אינן מאפיינות את כל בני האדם",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-16",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "כיצד מכשיר GPS מחשב את מקומו המדויק על פני כדור הארץ? המכשיר משדר אות ללוויין, ובאמצעות מדידת הזמן שנדרש לאות כדי לעבור את המרחק אל הלוויין ובחזרה, הוא מחשב את מרחקו ממנו. ואולם, חישוב זה אינו מספיק: על פני כדור הארץ יש נקודות רבות המרוחקות מלוויין זה אותו מרחק בדיוק. לכן המכשיר אינו מסתפק בלוויין אחד, אלא מודד את מרחקו מכמה לוויינים.",
    instruction: "איזו מהטענות הבאות עולה מן הפסקה?",
    options: [
      {
        id: "1",
        plainText:
          "כל אחד מחישובי המרחקים של מכשיר ה-GPS מתאים לכמה נקודות על פני כדור הארץ, אך כל החישובים יחד מתאימים רק לנקודה שבה המכשיר נמצא",
        isCorrect: true,
        explanation:
          "הפסקה מסבירה שמדידה אחת נותנת מספר נקודות, ולכן צריך כמה לוויינים כדי להצליב ולמצוא את הנקודה המדויקת.",
      },
      {
        id: "2",
        plainText:
          "תוצאת מדידת המרחק של מכשיר ה-GPS מלוויין אחד בלבד יכולה להתאים לכל נקודה על פני כדור הארץ",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "מכשיר ה-GPS מחשב את מקומו באמצעות מדידת מרחקו מכמה נקודות אחרות על פני כדור הארץ",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "לשם חישוב מקומו המדויק על פני כדור הארץ מכשיר ה-GPS משדר אותות לכמה לוויינים שכל אחד מהם נמצא במרחק שווה ממנו",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-17",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "חוקרים שיערו כי מתן תמריץ כספי גדול לבני נוער המתאמנים במכון כושר יגביר את המוטיבציה שלהם לשפר את ביצועיהם, ואילו מתן תמריץ כספי קטן דווקא יחליש אותה. כדי לבדוק את השערתם הם תכננו ניסוי בהשתתפות תשעים בני נוער המתאמנים בקביעות במכון כושר, שיחולקו באופן אקראי לשלוש קבוצות שוות בגודלן. המשתתפים בניסוי יתבקשו להרים משקולת קלה פעמים רבות ככל האפשר במהלך חצי דקה. לכל משתתף בקבוצה הראשונה יוצעו עשר אגורות על כל הרמה; לכל משתתף בקבוצה השנייה - חמישה שקלים; ואילו למשתתפים בקבוצה השלישית לא יוצע תשלום כלל.",
    instruction:
      "איזו מההנחות הבאות אינה אחת מההנחות שהחוקרים התבססו עליהן בתכנון הניסוי?",
    options: [
      {
        id: "1",
        plainText:
          "כאשר מעמידים בני נוער בפני אתגר גופני קצוב בזמן, יש להם מוטיבציה גבוהה להצליח בו",
        isCorrect: true,
        explanation:
          "החוקרים בודקים את רמת המוטיבציה בעזרת קבוצת ביקורת ללא תשלום, ולא מניחים מראש שיש להם מוטיבציה גבוהה.",
      },
      {
        id: "2",
        plainText:
          "הצלחה בהרמת משקולות קלות משקפת במידה סבירה את היכולת להצליח במגוון התרגילים שמתאמנים במכון כושר נוהגים לבצע",
        isCorrect: false,
        explanation: "הנחה הכרחית לתוקף הניסוי.",
      },
      {
        id: "3",
        plainText:
          "כשמחלקים משתתפים לקבוצות באופן אקראי, אין הבדלים ניכרים בכושר הגופני הממוצע בין הקבוצות",
        isCorrect: false,
        explanation: "הנחה הכרחית כדי לבודד את השפעת התמריץ.",
      },
      {
        id: "4",
        plainText:
          "עשר אגורות לכל הרמת משקולת ייחשבו תגמול קטן בעיני המשתתפים, ואילו חמישה שקלים ייחשבו תגמול גדול בעיניהם",
        isCorrect: false,
        explanation: "הנחה הכרחית לקיומו של תמריץ קטן מול גדול.",
      },
    ],
  },
  {
    id: "psy-quant-19",
    domain: "QUANTITATIVE",
    title: "אלגברה",
    context: "A, B ו-C הן אותיות המייצגות ספרות שונות זו מזו בין 1 ל-9.",
    instruction: "ההפרש בערך מוחלט בין המספרים ABC ו-CBA בהכרח מתחלק ב-",
    formulaLatex: "|ABC - CBA|",
    options: [
      { id: "1", plainText: "6", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "7", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "8", isCorrect: false, explanation: "מסיח." },
      {
        id: "4",
        plainText: "9",
        isCorrect: true,
        explanation:
          "ההפרש בין מספר תלת-ספרתי להיפוכו שווה ל-99 כפול ההפרש בין ספרת המאות לספרת האחדות, ולכן מתחלק תמיד ב-9.",
      },
    ],
  },
  {
    id: "psy-quant-18",
    domain: "QUANTITATIVE",
    title: "בעיות מילוליות",
    context:
      "צב הלך לאורך שביל שאורכו קילומטר. ביום הראשון הוא יצא לדרכו מתחילת השביל והלך מחצית קילומטר, ביום השני רבע קילומטר, ביום השלישי שמינית קילומטר, וכך הלאה עד היום העשירי.",
    instruction:
      "מה היה מרחקו של הצב מסוף השביל (בקילומטרים) בתום היום העשירי?",
    options: [
      {
        id: "1",
        plainText: "1 / (10^2)",
        mathText: "\\dfrac{1}{10^2}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "1 / (2 * 10^2)",
        mathText: "\\dfrac{1}{2 \\cdot 10^2}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "1 / (2^10)",
        mathText: "\\dfrac{1}{2^{10}}",
        isCorrect: true,
        explanation:
          "בכל יום הצב הולך מחצית מהמרחק הנותר עד סוף השביל, ולכן בסוף היום העשירי מרחקו הוא 1 חלקי (2 בחזקת 10).",
      },
      {
        id: "4",
        plainText: "1 / (2 * 2^10)",
        mathText: "\\dfrac{1}{2 \\cdot 2^{10}}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-ana-1",
    domain: "VERBAL",
    title: "אנלוגיות",
    context: "",
    instruction: "לחלופין : חלופה",
    options: [
      { id: "1", plainText: "מאידך : חיזוק", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "מדוע : מַעֲנֶה", isCorrect: false, explanation: "מסיח." },
      {
        id: "3",
        plainText: "ובלבד : תנאי",
        isCorrect: true,
        explanation:
          "המילה 'לחלופין' משמשת כדי להציג חלופה, בדיוק כפי שהמילה 'ובלבד' משמשת כדי להציג תנאי.",
      },
      { id: "4", plainText: "ניחא : הסכמה", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-verbal-ana-2",
    domain: "VERBAL",
    title: "אנלוגיות",
    context: "",
    instruction: "דקיק : עבה",
    options: [
      { id: "1", plainText: "מריר : מתוק", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "לוהט : קר",
        isCorrect: true,
        explanation:
          "דקיק הוא ההיפך הקיצוני של עבה (דק מאוד). לוהט הוא ההיפך הקיצוני של קר (חם מאוד).",
      },
      { id: "3", plainText: "זעיר : עצום", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "חריג : רגיל", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-verbal-ana-3",
    domain: "VERBAL",
    title: "אנלוגיות",
    context: "",
    instruction: "אשפה : יורים",
    options: [
      {
        id: "1",
        plainText: "קולב : לובשים",
        isCorrect: true,
        explanation:
          "אשפה נועדה להחזיק בתוכה את מה שיורים (חיצים). קולב נועד להחזיק עליו את מה שלובשים (בגדים).",
      },
      { id: "2", plainText: "מגל : טוחנים", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "מחסן : מאחסנים", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "מפה : סועדים", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-verbal-ana-4",
    domain: "VERBAL",
    title: "אנלוגיות",
    context: "",
    instruction: "כִּזֵּב : שקר",
    options: [
      { id: "1", plainText: "הכביר מילים : דיבור", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "המתיק סוד : לחש", isCorrect: false, explanation: "מסיח." },
      {
        id: "3",
        plainText: "הלין : קובלנה",
        isCorrect: true,
        explanation:
          "כיזב משמעותו ביטא/אמר שקר. הלין משמעותו ביטא/הביע קובלנה (תלונה).",
      },
      { id: "4", plainText: "צידד : עמדה", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-verbal-ana-5",
    domain: "VERBAL",
    title: "אנלוגיות",
    context: "",
    instruction: "ודאי! : מהסס",
    options: [
      { id: "1", plainText: "הס! : מדבר", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "כך! : מדגים", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "די! : מפסיק", isCorrect: false, explanation: "מסיח." },
      {
        id: "4",
        plainText: "לא! : מסכים",
        isCorrect: true,
        explanation:
          "מי שאומר 'ודאי!' מעיד על עצמו שאינו מהסס, כפי שמי שאומר 'לא!' מעיד על עצמו שאינו מסכים.",
      },
    ],
  },
  {
    id: "psy-verbal-ana-6",
    domain: "VERBAL",
    title: "אנלוגיות",
    context: "",
    instruction: "אבוס : שוקת",
    options: [
      { id: "1", plainText: "קלשון : מזלג", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "מזלג : קשית",
        isCorrect: true,
        explanation:
          "אבוס הוא כלי להגשת מזון (מוצק) לבהמות ושוקת להגשת מים. מזלג הוא כלי לצריכת מזון (מוצק) וקשית לצריכת שתייה.",
      },
      { id: "3", plainText: "קנקן : כוס", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "כוס : ספל", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-prob-19",
    domain: "QUANTITATIVE",
    title: "הסתברות",
    context: "חנה מטילה קובייה הוגנת 6 פעמים.",
    instruction:
      "מה הסיכוי שתוצאת כל אחת מההטלות (חוץ מהראשונה) תהיה גדולה מתוצאת ההטלה שלפניה?",
    options: [
      {
        id: "1",
        plainText: "1 / (6^6)",
        mathText: "\\dfrac{1}{6^6}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "1 / (6!)",
        mathText: "\\dfrac{1}{6!}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "5 / (6^6)",
        mathText: "\\dfrac{5}{6^6}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "1 / 6!",
        mathText: "\\dfrac{1}{6!}",
        isCorrect: true,
        explanation:
          "כדי שהתוצאות יהיו בסדר עולה ממש ב-6 הטלות, חייבות להתקבל כל 6 הספרות השונות בסדר הספציפי 1,2,3,4,5,6. מספר הסדרות השונות של 6 תוצאות שונות הוא 6!, ולכל סדרה כזו הסתברות זהה — לכן ההסתברות לסדרה הספציפית היא 1/6!.",
      },
    ],
  },
  {
    id: "psy-quant-ratio-18",
    domain: "QUANTITATIVE",
    title: "בעיות יחס ותערובת",
    context:
      "דני חילק 33 ליטרים מים לשני מכלים באופן ששלושת-רבעי מכמות המים במכל הראשון שווה לחמש-שמיניות מכמות המים במכל השני.",
    instruction: "כמה ליטרים מים יש במכל הראשון?",
    formulaLatex: "\\dfrac{3}{4}x = \\dfrac{5}{8}y",
    options: [
      { id: "1", plainText: "10", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "14", isCorrect: false, explanation: "מסיח." },
      {
        id: "3",
        plainText: "15",
        isCorrect: true,
        explanation:
          "נסמן x למכל הראשון ו-y לשני. 3/4x = 5/8y. נכפול ב-8 ונקבל 6x = 5y, כלומר היחס בין המכלים הוא 5:6. סכום חלקי היחס הוא 11, שמייצגים 33 ליטר, ולכן כל 'חלק יחס' שווה ל-3 ליטר. המכל הראשון מכיל 5 חלקי יחס, שהם 15 ליטר.",
      },
      { id: "4", plainText: "20", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-motion-20",
    domain: "QUANTITATIVE",
    title: "בעיות תנועה",
    context:
      "נהג אוטובוס נוסע הלוך ושוב בין התחנות A ו-B. הנסיעה נמשכת 30 דקות בכל כיוון. בכל פעם שהנהג מגיע ל-A או ל-B הוא נח 10 דקות, ואז ממשיך בנסיעה. ידוע שבשעה 9:00 היה הנהג בדרכו מ-A ל-B.",
    instruction: "לא ייתכן שבשעה 10:00 היה הנהג -",
    options: [
      {
        id: "1",
        plainText: "ב-A",
        isCorrect: false,
        explanation:
          "ייתכן. אם יצא ב-9:00, הגיע ל-B ב-9:30, נח עד 9:40, וחזר ל-A ב-10:10. בשעה 10:00 הוא בדרך ל-A, לא בתחנה עצמה.",
      },
      {
        id: "2",
        plainText: "ב-B",
        isCorrect: true,
        explanation:
          "הוא יצא מ-A בשעה 9:00 או לפני כן. בכל תרחיש עקבי עם הנתון שבשעה 9:00 היה בדרכו מ-A ל-B, בשעה 10:00 הוא אינו יכול להיות בתחנה B.",
      },
      { id: "3", plainText: "בדרכו מ-A ל-B", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "בדרכו מ-B ל-A", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-algebra-18",
    domain: "QUANTITATIVE",
    title: "אלגברה - חלוקה וראשוניים",
    context: "a הוא מספר ראשוני הקטן מ-10. נתון:",
    instruction: "x מתחלק בהכרח ב-",
    formulaLatex: "x = (a+1)(a+2),\\quad a < 10",
    options: [
      {
        id: "1",
        plainText: "6",
        isCorrect: true,
        explanation:
          "המספרים הראשוניים הקטנים מ-10 הם 2, 3, 5, 7. בדיקת כל ההצבות מראה ש-(a+1)(a+2) מתחלק תמיד ב-6 עבור ערכים אלה.",
      },
      { id: "2", plainText: "9", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "13", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "4", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-ratio-19",
    domain: "QUANTITATIVE",
    title: "קנה מידה ושטחים",
    context:
      'אזורה ובונדק הן שתי שכונות. במפת כל אחת מהשכונות מסורטט מגרש משחקים בצורת ריבוע, שאורך צלעו 5 ס"מ. כל 1 ס"מ במפה של שכונת אזורה מייצג 100 ס"מ במציאות, וכל 1 ס"מ במפה של שכונת בונדק מייצג 1,000 ס"מ במציאות.',
    instruction:
      "פי כמה גדול שטח מגרש המשחקים בשכונת בונדק משטח מגרש המשחקים בשכונת אזורה?",
    options: [
      {
        id: "1",
        plainText: "פי 100",
        isCorrect: true,
        explanation:
          "קנה המידה האורכי של בונדק גדול פי 10 מזה של אזורה (1000 מול 100). מכיוון ששטח תלוי בריבוע האורך, יחס השטחים הוא ריבוע יחס האורכים: 10² = 100.",
      },
      { id: "2", plainText: "פי 25", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "פי 10", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "פי 5", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-algebra-17-ineq",
    domain: "QUANTITATIVE",
    title: "אי-שוויונות ועצרת",
    context: "x הוא מספר שלם וחיובי. נתון אי-השוויון:",
    instruction: "כמה ערכים שונים יכולים להיות ל-x?",
    formulaLatex: "\\frac{x!}{x^2} < 1",
    options: [
      { id: "1", plainText: "1", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "2",
        isCorrect: true,
        explanation:
          "נבדוק הצבות: עבור x=1, נקבל 1/1 < 1 — לא נכון. עבור x=2, נקבל 2/4 < 1 — נכון. עבור x=3, נקבל 6/9 < 1 — נכון. עבור x=4, נקבל 24/16 < 1 — לא נכון. מכאן ואילך המונה גדל מהר יותר מהמכנה, לכן רק הערכים 2 ו-3 מקיימים את אי-השוויון.",
      },
      { id: "3", plainText: "0", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "אינסוף", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-comb-19",
    domain: "QUANTITATIVE",
    title: "קומבינטוריקה",
    context:
      "אורנה מטילה בזה אחר זה x מטבעות, ולאחר מכן מטילה בזה אחר זה y קוביות. היא כותבת על דף את סדרת תוצאות ההטלות. התוצאות האפשריות בהטלת מטבע הן עץ ופלי, והתוצאות האפשריות בהטלת קובייה הן המספרים 1 עד 6.",
    instruction: "כמה סדרות שונות זו מזו יכולות להתקבל?",
    options: [
      {
        id: "1",
        plainText: "2^x * 6^y",
        mathText: "2^x \\cdot 6^y",
        isCorrect: true,
        explanation:
          'על פי עקרון הכפל: לכל מטבע 2 אפשרויות (סה"כ 2^x), ולכל קובייה 6 אפשרויות (סה"כ 6^y). כופלים את סך האפשרויות.',
      },
      {
        id: "2",
        plainText: "x^2 * y^6",
        mathText: "x^2 \\cdot y^6",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "2^x + 6^y",
        mathText: "2^x + 6^y",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "x^2 + y^6",
        mathText: "x^2 + y^6",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-quant-algebra-17-exp",
    domain: "QUANTITATIVE",
    title: "אלגברה - שברים",
    context: "נתון: a אינו שווה למינוס b. פשט את הביטוי:",
    instruction: "מהו הביטוי המפושט?",
    formulaLatex:
      "1 - \\frac{a^2 + (2b - 1)a + (b - 1)b}{(a + b)^2}",
    options: [
      { id: "1", plainText: "1", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "1/2",
        mathText: "\\dfrac{1}{2}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "1 / (a+b)^2",
        mathText: "\\dfrac{1}{(a+b)^2}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "1 / (a+b)",
        mathText: "\\dfrac{1}{a+b}",
        isCorrect: true,
        explanation:
          "פותחים את המונה: a² + 2ab − a + b² − b = (a+b)² − (a+b). נחלק במכנה (a+b)² ונקבל 1 − 1/(a+b). כשנחסיר זאת מ-1 (בתחילת הביטוי) נקבל 1/(a+b).",
      },
    ],
  },
  {
    id: "psy-quant-ratio-20",
    domain: "QUANTITATIVE",
    title: "בעיות חפיפה / אחוזים",
    context:
      "על מדף מונחים בין 50 ל-100 ספרים. חמישית מהם ספרים מקצועיים, ושביעית מהם ספרי קריאה.",
    instruction: "כמה ספרי קריאה מונחים על המדף?",
    formulaLatex: "0.2N \\in \\mathbb{Z},\\quad \\tfrac{1}{7}N \\in \\mathbb{Z},\\quad 50 < N < 100",
    options: [
      {
        id: "1",
        plainText: "10",
        isCorrect: true,
        explanation:
          "כדי שאפשר יהיה לקחת 20% (חמישית) ו-1/7 ממספר הספרים (והתוצאה תהיה שלמה), מספר הספרים חייב להתחלק ב-5 וב-7, כלומר בכפולה של 35. בין 50 ל-100 הכפולה היחידה היא 70. שביעית מ-70 היא 10 ספרי קריאה.",
      },
      { id: "2", plainText: "12", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "14", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "16", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-motion-16",
    domain: "QUANTITATIVE",
    title: "בעיות הספק",
    context:
      "מתן עולה במדרגות. הוא מתחיל לעלות בקצב של 27 מדרגות לדקה. בסוף כל דקה הוא מתעייף ומאט את קצב העלייה לשני שלישים מהקצב הקודם. במשך כל דקה קצב העלייה נשאר קבוע.",
    instruction: "אם מתן צריך לעלות 65 מדרגות, כמה דקות תארך העלייה?",
    formulaLatex: "v_{n+1}=\\tfrac{2}{3}v_n,\\quad v_1=27",
    options: [
      { id: "1", plainText: "5.5", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "2", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "3.5", isCorrect: false, explanation: "מסיח." },
      {
        id: "4",
        plainText: "4",
        isCorrect: true,
        explanation:
          "בדקה הראשונה עולה 27 (סה״כ 27), קצב חדש: 18. בדקה השנייה עולה 18 (סה״כ 45), קצב חדש: 12. בדקה השלישית עולה 12 (סה״כ 57), קצב חדש: 8. נותרו 8 מדרגות בקצב 8 לדקה — עוד דקה אחת. סה״כ 4 דקות.",
      },
    ],
  },
  {
    id: "psy-verbal-logic-16-jer",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "בתי הקפה בירושלים קמו בערך באותן השנים שבהן נבטו ניצני המוסד הזה בערים אחרות באימפריה העות'מאנית. אולם עם כל החידוש שבדבר לא הייתה התופעה יוצאת דופן בעיר: על אף קדושתה הבלתי מעורערת של ירושלים לכל תושביה רווחו בה תופעות רבות שנתפסו כבלתי מוסריות. בשנות השישים של המאה השש עשרה טופלו בבתי הדין המקומיים תלונות רבות על צעירים פורקי עול העוסקים בשתיית יין, האסורה במפורש על פי האסלאם, במשחקי כדור, במשחקי קלפים ואף בתחרויות יונים.",
    instruction: "מה משתמע מן האמור בפסקה בנוגע לבתי הקפה בירושלים העות'מאנית?",
    options: [
      {
        id: "1",
        plainText: "הבילוי בהם נחשב להתנהגות בלתי מוסרית",
        isCorrect: true,
        explanation:
          "המשפט השני מקשר בין הופעת בתי הקפה לתופעות שנחשבו 'בלתי מוסריות' בעיר, מה שמעיד על היחס כלפיהם.",
      },
      {
        id: "2",
        plainText:
          "המבקרים בהם נהגו לשתות יין, לשחק בכדור ובקלפים ולערוך תחרויות יונים",
        isCorrect: false,
        explanation:
          "מסיח. הפעילויות האלו מוזכרות כתופעות בלתי מוסריות אחרות, אך לא נאמר שביצעו אותן בתוך בתי הקפה.",
      },
      {
        id: "3",
        plainText: "בעקבותיהם נראו בירושלים תופעות דומות אחרות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "בשעה שבשאר חלקי האימפריה הם רק החלו להופיע, בירושלים הם כבר היו בשיאם",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-logic-17-hly",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      'במשפט "הוליווד אוהבת במאים צעירים" נעשה שימוש במטונימיה - הוליווד, מקום מושבה של תעשיית הקולנוע האמריקנית, מסמלת את אנשי התעשייה עצמם.',
    instruction:
      "על פי המשתמע מהאמור לעיל, באיזה מהמשפטים הבאים נעשה גם כן שימוש במטונימיה?",
    options: [
      {
        id: "1",
        plainText: "מדריד שלחה סיוע הומניטרי לתושבי אנגולה",
        isCorrect: true,
        explanation:
          "כמו שהוליווד מייצגת את אנשי התעשייה, מדריד (עיר הבירה) מסמלת במשפט זה את ממשלת ספרד או את תושביה.",
      },
      {
        id: "2",
        plainText: "תל-אביב נחשבת לניו-יורק של המזרח התיכון",
        isCorrect: false,
        explanation: "מסיח (השוואה, לא מטונימיה).",
      },
      {
        id: "3",
        plainText: "באר שבע היא בירת הנגב",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "לונדון עוברת שינוי גדול בשנים האחרונות",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-cloze-14-dror",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      "במדורי השבועי לא _____ נגינתה של נינה לוין, שלדבריו _____ שבעבר הרבה דרור לשבח את סגנונו של דותן, _____ מסכים עם המאשימים את דרור בחוסר עקיבות בהעדפותיו המוזיקליות.",
    instruction: "בחר את רצף המילים המשלים את המשפט בצורה הטובה ביותר:",
    options: [
      {
        id: "1",
        plainText:
          "חסך דרור את שבטו מ- / אינה טובה כמו נגינתו / מאחר / אני",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "חדל דרור לשבח את / נופלת ברמתה מנגינתו / אף / אינני",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "חסך דרור את שבטו מ- / אינה טובה מנגינתו חסרת המעוף / מאחר / אינני",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "חדל דרור לשבח את / היא בבחינת חידוש מרענן לעומת נגינתו המשמימה / מאחר / אני",
        isCorrect: true,
        explanation:
          "המשפט התקין: במדורי השבועי לא חדל דרור לשבח את נגינתה של נינה לוין, שלדבריו היא בבחינת חידוש מרענן לעומת נגינתו המשמימה של רפי דותן. מאחר שבעבר הרבה דרור לשבח את סגנונו של דותן, אני מסכים עם המאשימים את דרור בחוסר עקיבות...",
      },
    ],
  },
  {
    id: "psy-verbal-cloze-15-jobs",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      'התמעטות המשרות הפנויות במשק וירידה במספר העובדים המתפטרים מעבודתם ביוזמתם הן שתי תופעות הנחשבות בקרב כלכלנים לסימנים של מצב כלכלי עגום. בהתבססו על כך ד"ר חמו טוען: "סימן המעיד על _____ של המשק בחודשים האחרונים הוא ה_____ במספר העובדים המתפטרים ביוזמתם. _____ המשרות הפנויות במשק _____."',
    instruction: "בחר את רצף המילים המשלים את המשפט בצורה הטובה ביותר:",
    options: [
      {
        id: "1",
        plainText:
          "הידרדרותו / ירידה / זאת ועוד, גם / התרבו בעת האחרונה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "התאוששותו / עלייה / ואולם, מספר / נותר לעת עתה זעום כשהיה",
        isCorrect: true,
        explanation:
          "המשפט התקין: סימן המעיד על התאוששותו של המשק הוא העלייה במספר המתפטרים. ואולם, מספר המשרות הפנויות נותר זעום כשהיה. (החלק הראשון מציג סימן חיובי שמנוגד לכלל, והחלק השני מציג הסתייגות).",
      },
      {
        id: "3",
        plainText:
          "הידרדרותו / עלייה / לעומת זאת, מספר / עלה בחודשים אלה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "התאוששותו / עלייה / זאת ועוד, גם / הפכו מצרך נדיר בעת האחרונה",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-logic-16-art",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "יש הטוענים שמאז החל הביקוש ליצירות אמנות, החלו להופיע גם זיופי אמנות, אך טענה זו אינה מדויקת. בעת העתיקה אספו רבים יצירות אמנות, אך נראה שהם היו אדישים לשאלה אם היצירה שבידיהם היא מקור או העתק. כדי להבחין בין מקור להעתק דרושה מומחיות שלא הייתה קיימת באותם ימים. לא זו בלבד, אלא שהמונח 'זיוף' באמנות מבוסס על הרעיון, החדש יחסית, שליצירה מקורית יש תכונות שהעתק - ולו המדויק ביותר - אינו ניחן בהן.",
    instruction: "לפי הפסקה, מדוע נטען בשורה הראשונה כי 'טענה זו אינה מדויקת'?",
    options: [
      {
        id: "1",
        plainText:
          "משום שאמנם כבר בעת העתיקה נהגו לייצר העתקים של יצירות, אך אספני האמנות באותם ימים לא כינו אותם 'זיופים' ולא היו להם לא דרך ולא עניין להבחין בין מקור להעתק",
        isCorrect: true,
        explanation:
          "הפסקה מסבירה שהמושג 'זיוף' הוא מודרני, ובעת העתיקה אמנם היה ביקוש, אך לא היו 'זיופים' כי לא התעניינו ולא ידעו להבדיל בין מקור להעתק.",
      },
      {
        id: "2",
        plainText:
          "משום שאספני האמנות בעת העתיקה ידעו שממילא לא יוכלו להבחין בין מקור לזיוף, ולכן לא ייחסו למקור תכונות עדיפות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "משום שאילו היו לאספני האמנות בעת העתיקה הכלים להבחין בין מקור להעתק סביר שהיו עושים זאת",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "משום שבעת העתיקה לא היה הידע הדרוש כדי לייצר העתקים מדויקים, וממילא אספני האמנות לא התעניינו בהבחנה זו",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-logic-17-law",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "המשפטן הבריטי סמית: 'השאלה אם אפשר לראות במנהג רווח כלשהו כלל חברתי מחייב אינה תלויה רק בשאלה עד כמה הוא רווח. השוו בין מנהגם של האנגלים לשתות תה בחמש אחר הצהריים ובין מנהגם להוריד את הכובע בכניסה לכנסייה: רוב האנגלים נוהגים לשתות תה בכל יום בחמש אחר הצהריים, אך אי-אפשר לומר שהם קיבלו על עצמם כלל שדורש מהם לעשות זאת. מנהג כלשהו הוא ביטוי של כלל חברתי מחייב רק אם מי שנוהג לפיו מכיר בכך שהכלל מחייב אותו, ורואה בו הצדקה להתנהגותו וסיבה לגינוי של מי שאינו מציית לו.'",
    instruction: "איזו מהטענות הבאות אינה משתמעת מדבריו של סמית?",
    options: [
      {
        id: "1",
        plainText:
          "ככל הנראה, אנגלי שיראה אנגלי אחר שאינו שותה תה בחמש אחר הצהריים לא יחשוב שיש לגנות אותו",
        isCorrect: false,
        explanation:
          "זה כן משתמע מדבריו (כי שתיית תה אינה כלל מחייב).",
      },
      {
        id: "2",
        plainText:
          "גם אם אדם רואה בהתנהגות כלשהי כלל חברתי מחייב, הוא ככל הנראה לא יחשוב שיש סיבה לגנות את מי שאינו מציית לו",
        isCorrect: true,
        explanation:
          "טענה זו סותרת את סמית, שטוען במפורש שכלל מחייב גורר סיבה לגינוי של מי שאינו מציית לו. לכן היא זו שאינה משתמעת מדבריו.",
      },
      {
        id: "3",
        plainText:
          "ייתכן שאדם יקפיד באדיקות על מנהג כלשהו ובכל זאת לא יראה בו כלל חברתי מחייב",
        isCorrect: false,
        explanation: "משתמע מדבריו (כמו דוגמת שתיית התה).",
      },
      {
        id: "4",
        plainText:
          "ככל הנראה, אנגלי שמוריד את הכובע בכניסה לכנסייה יטען שהוא עושה כך משום שכלל חברתי קובע שכך יש לנהוג",
        isCorrect: false,
        explanation: "משתמע מדבריו (זהו מנהג מחייב לעומת התה).",
      },
    ],
  },
  {
    id: "psy-verbal-logic-14-sound",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "צליל קולי הוא צליל שבעת הפקתו הדובר מרטיט את מיתרי הקול. צלילים המשתייכים לקבוצת הצלילים הקוליים הם למשל: ב, ג, ד, מ, נ. צלילים המשתייכים לקבוצת הצלילים הלא-קוליים הם למשל: ת, ט, ס, פ, ק. בזמן הדיבור מתרחשת לעתים תופעה המכונה הידמות בקוליות: צליל הופך מקולי ללא-קולי אם הצליל שמופיע מיד אחריו ברצף הדיבור אינו קולי, או הופך מלא-קולי לקולי אם הצליל שמופיע מיד אחריו ברצף הדיבור הוא קולי.",
    instruction: "איזו מהנטיות הבאות אינה מדגימה הידמות בקוליות?",
    options: [
      {
        id: "1",
        plainText: "הנטייה לומר 'מִדְבָּח' במקום מטבח",
        isCorrect: false,
        explanation:
          "זו כן הידמות בקוליות: ט' (לא-קולי) הופך ל-ד' (קולי) בהשפעת ב' הקולי שאחריו.",
      },
      {
        id: "2",
        plainText: "הנטייה לומר 'מוגדם' במקום מוקדם",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "הנטייה לומר 'עמבל' במקום ענבל",
        isCorrect: true,
        explanation:
          "נ' ומ' שניהם צלילים קוליים. המעבר ביניהם אינו שינוי בקוליות אלא במיקום החיתוך (מהשיניים לשפתיים בגלל ה-ב'), ולכן אינו מדגים הידמות בקוליות.",
      },
      {
        id: "4",
        plainText: "הנטייה לומר 'רפקה' במקום רבקה",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-logic-15-edu",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "בישראל, חלקו של תקציב המדינה המופנה לחינוך הוא הגבוה ביותר בקרב מדינות המערב. השיעור מתקציב המדינה המופנה לחינוך הוא המדד המקובל להשוואת ההשקעה בחינוך בין מדינות, אך בנוגע לישראל השימוש במדד זה בעייתי: שיעור התלמידים באוכלוסייתה גבוה משיעורם במרבית מדינות המערב, ולכן הגיוני שחלק גדול יותר מתקציבה מופנה לחינוך. לפיכך, מדד נכון יותר יהיה ההוצאה הציבורית הממוצעת לתלמיד בכל מדינה.",
    instruction: "איזו מן הטענות הבאות משקפת את דעתו של כותב הפסקה?",
    options: [
      {
        id: "1",
        plainText:
          "לדעתו, חלקו של תקציב המדינה המופנה לחינוך הוא המדד המתאים ביותר להשוואת ההשקעה בחינוך בין מדינות ששיעורי התלמידים באוכלוסייתיהן שונים זה מזה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "לדעתו, סביר שאם תושווה ההוצאה הציבורית הממוצעת לתלמיד בישראל להוצאה הציבורית הממוצעת לתלמיד בשאר מדינות המערב, לא תדורג ישראל במקום הראשון",
        isCorrect: true,
        explanation:
          "הכותב טוען שהדירוג הגבוה של ישראל נובע משיעור התלמידים הגבוה, ושאם נשתמש במדד של הוצאה לתלמיד התמונה תשתנה. מכאן משתמע שבמדד זה ישראל לא תדורג ראשונה.",
      },
      {
        id: "3",
        plainText:
          "לדעתו, יהיה אפשר להשוות את ההשקעה בחינוך בישראל להשקעה בחינוך בשאר מדינות המערב רק כאשר שיעור התלמידים באוכלוסייתה יהיה דומה לשיעור התלמידים במדינות אלו",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "לדעתו, העובדה שישראל נמצאת במקום הראשון בהשקעה בחינוך במערב בהשוואה בחינוך לפי המדד המקובל, מדד בעייתי, היא הישג למערכת החינוך הישראלית",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verbal-cloze-13-friends",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      "יש שאדם רואה את חבריו _____ ונמלא בן רגע _____ או אז הוא גומר אומר _____, אלא שהאדם מטבעו _____, ועל כן לרוב לא יצאו ימים רבים בטרם _____.",
    instruction: "בחר את רצף המילים המשלים את המשפט בצורה הטובה ביותר:",
    options: [
      {
        id: "1",
        plainText:
          "שורדו מנכסיהם / חמלה / להושיט להם יד לעזרה / נוטה לשים את עצמו לפני זולתו / ישקע אף הוא בחובות בעודו מכלכל את חבריו",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "נהנים מפירות עמלם / תקווה להצלחתם הוא / לשנס מותניים / חסר אורך רוח / יאחז בו הייאוש",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "שעסקיהם עולים כפורחים / קנאה עזה / להתנתק מאותם חברים לבל יחזה בהצלחתם / צר עין / יחזור בו מהחלטתו",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "שופכים את כספם לריק ושוקעים בחובות / פחד שגורלו יהיה כגורלם / לכלכל את מעשיו בתבונה / מתקשה לדבוק בהחלטותיו / יזנח את מנהג חבריו ויחזור לסורו",
        isCorrect: true,
        explanation:
          "רצף 4 יוצר משפט הגיוני שבו הפחד גורם להחלטה על התנהגות נבונה, אך טבע האדם שמתקשה לדבוק בהחלטות גורם לו לזנוח אותן.",
      },
    ],
  },
  {
    id: "psy-verbal-logic-14-aliens",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      "האסטרונום טלמון, המאמין בקיומם של חיים מחוץ לכדור הארץ, סבור שהמרחקים העצומים המפרידים בין הכוכבים _____ המכשול העיקרי הניצב בפני מפגשים עם יצורים מן החלל. לפיכך, _____ שהוא _____ שבניית חלליות שיכולות לעבור מרחק רב יותר מן החלליות הקיימות היום _____ בהרבה את הסיכויים לגלות צורות חיים בכוכבים אחרים.",
    instruction: "בחר את רצף המילים המשלים את המשפט בצורה הטובה ביותר:",
    options: [
      {
        id: "1",
        plainText: "אינם / אין פלא / מחזיק בדעה / לא תגדיל",
        isCorrect: true,
        explanation:
          "אם הוא מאמין בחיים אך סבור שהמרחקים אינם המכשול העיקרי, אזי אין פלא שהוא מחזיק בדעה שחלליות למרחקים ארוכים יותר לא יגדילו בהרבה את הסיכויים.",
      },
      {
        id: "2",
        plainText: "הם / מתמיה / חולק על הטענה / לא תגדיל",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "הם / אין פלא / מחזיק בדעה / לא תגדיל",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "אינם / מתמיה / אינו מחזיק בדעה / תגדיל",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-quant-prob-dice-unfair",
    domain: "QUANTITATIVE",
    title: "הסתברות",
    context:
      "מטילים קובייה לא הוגנת שהמספרים 1 עד 6 רשומים על פאותיה. הסיכוי לקבל את המספר 1 הוא x, הסיכוי לקבל את המספר 2 הוא 2x, וכך הלאה עד 6x.",
    instruction: "מצא את x:",
    formulaLatex: "x + 2x + 3x + 4x + 5x + 6x = 1",
    options: [
      {
        id: "1",
        plainText: "1 / 6",
        mathText: "\\dfrac{1}{6}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "1 / 9",
        mathText: "\\dfrac{1}{9}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "1 / 21",
        mathText: "\\dfrac{1}{21}",
        isCorrect: true,
        explanation:
          "סכום ההסתברויות של כל התוצאות האפשריות חייב להיות שווה ל-1. לכן: x + 2x + 3x + 4x + 5x + 6x = 21x = 1, ומכאן x = 1/21.",
      },
      {
        id: "4",
        plainText: "1 / 36",
        mathText: "\\dfrac{1}{36}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-quant-alg-factorial-fraction",
    domain: "QUANTITATIVE",
    title: "אלגברה - עצרת",
    context: "נתון הביטוי:",
    instruction: "מה ערך הביטוי?",
    formulaLatex: "\\frac{17!}{15! + 16!}",
    options: [
      { id: "1", plainText: "17", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "16",
        isCorrect: true,
        explanation:
          "נוציא גורם משותף !15 במכנה: 15!(1 + 16) = 15! * 17. נפתח את המונה: 17! = 17 * 16 * 15!. נצמצם את (17 * 15!) מהמונה והמכנה ונקבל 16.",
      },
      {
        id: "3",
        plainText: "1 / 15",
        mathText: "\\dfrac{1}{15}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "1 / 14",
        mathText: "\\dfrac{1}{14}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-quant-avg-pct-diff",
    domain: "QUANTITATIVE",
    title: "ממוצעים ואחוזים",
    context: "a ו-b הם מספרים חיוביים. נתון: a גדול ב-40% מהממוצע של a ו-b.",
    instruction: "בכמה אחוזים קטן b מהממוצע של a ו-b?",
    options: [
      { id: "1", plainText: "20%", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "40%",
        isCorrect: true,
        explanation:
          "הממוצע של שני מספרים נמצא בדיוק באמצע ביניהם. המרחק של a מהממוצע שווה למרחק של b מהממוצע. אם a גדול מהממוצע ב-40% מערך הממוצע, אזי b קטן מהממוצע בדיוק באותו אחוז מערך הממוצע (40%).",
      },
      { id: "3", plainText: "60%", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "80%", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-number-theory-6pct",
    domain: "QUANTITATIVE",
    title: "תכונות מספרים ואחוזים",
    context: "נתון: a הוא מספר שלם. 6% מ-a הם מספר שלם.",
    instruction: "a בהכרח מתחלק ב-",
    options: [
      { id: "1", plainText: "20", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "25",
        isCorrect: true,
        explanation:
          "6% מ-a שווה ל- (6 * a) / 100 = (3 * a) / 50. כדי שהתוצאה תהיה מספר שלם, a חייב להתחלק ב-50 (מאחר ש-3 ו-50 זרים). כל מספר שמתחלק ב-50 מתחלק בהכרח גם ב-25.",
      },
      { id: "3", plainText: "30", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "35", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-weighted-avg-salary",
    domain: "QUANTITATIVE",
    title: "ממוצע משוקלל",
    context:
      "ההכנסה החודשית הממוצעת של עובדי חברה כלשהי היא 1,800 דולרים. ההכנסה הממוצעת של כל העובדים מלבד המנהל היא 1,700 דולרים. הכנסתו של המנהל היא 8,000 דולרים.",
    instruction: "כמה עובדים, כולל המנהל, יש בחברה?",
    options: [
      { id: "1", plainText: "18", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "31", isCorrect: false, explanation: "מסיח." },
      { id: "3", plainText: "52", isCorrect: false, explanation: "מסיח." },
      {
        id: "4",
        plainText: "63",
        isCorrect: true,
        explanation:
          "המנהל מרוויח 8,000$, שזה 6,200$ מעל הממוצע הכללי (1,800). כל עובד רגיל מרוויח 1,700$, שזה 100$ מתחת לממוצע. כדי לאזן את העודף של המנהל דרושים 62 עובדים (6,200 חלקי 100). יחד עם המנהל ישנם 63 עובדים.",
      },
    ],
  },
  {
    id: "psy-quant-prob-dice-avg-int",
    domain: "QUANTITATIVE",
    title: "הסתברות",
    context: "אבי מטיל קובייה הוגנת פעמיים.",
    instruction: "מה הסיכוי שממוצע תוצאות שתי ההטלות יהיה מספר שלם?",
    options: [
      {
        id: "1",
        plainText: "1 / 6",
        mathText: "\\dfrac{1}{6}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "1 / 2",
        mathText: "\\dfrac{1}{2}",
        isCorrect: true,
        explanation:
          "ממוצע שתי הטלות הוא שלם אם ורק אם סכומן זוגי. סכום זוגי מתקבל כאשר שתי ההטלות זוגיות (הסתברות 1/4) או שתיהן אי-זוגיות (הסתברות 1/4). סך הכל: 1/4 + 1/4 = 1/2.",
      },
      {
        id: "3",
        plainText: "1 / 3",
        mathText: "\\dfrac{1}{3}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "1 / 4",
        mathText: "\\dfrac{1}{4}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-quant-alg-factorial-impossible",
    domain: "QUANTITATIVE",
    title: "אלגברה - עצרת",
    context: "A ו-B הם שני מספרים שלמים וחיוביים השונים זה מזה. נתון:",
    instruction: "איזו מהאפשרויות הבאות לא תיתכן?",
    formulaLatex: "A \\cdot B = B!",
    options: [
      {
        id: "1",
        plainText: "A = 8",
        mathText: "A = 8",
        isCorrect: true,
        explanation:
          "נחלק ב-B ונקבל A = (B-1)!. ערכי עצרת אפשריים הם 1, 2, 6, 24, 120... המספר 8 אינו עצרת של אף מספר שלם, ולכן A=8 אינו ייתכן.",
      },
      {
        id: "2",
        plainText: "A = 2",
        mathText: "A = 2",
        isCorrect: false,
        explanation:
          "ייתכן: אם B=3, אז A = 2! = 2 (אך נתון שהם שונים, כאן A=2 ו-B=3 שונים).",
      },
      {
        id: "3",
        plainText: "B = 5",
        mathText: "B = 5",
        isCorrect: false,
        explanation: "ייתכן: אם B=5, אז A = 4! = 24.",
      },
      {
        id: "4",
        plainText: "B = 4",
        mathText: "B = 4",
        isCorrect: false,
        explanation: "ייתכן: אם B=4, אז A = 3! = 6.",
      },
    ],
  },
  {
    id: "psy-quant-alg-inequality-square",
    domain: "QUANTITATIVE",
    title: "אלגברה - אי-שוויונות",
    context: "נתון:",
    instruction: "איזה מהאי-שוויונות הבאים נובע בהכרח מנתון זה?",
    formulaLatex: "2xy < x^2 + y^2",
    options: [
      {
        id: "1",
        plainText: "0 < x^2 - y^2",
        mathText: "0 < x^2 - y^2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "0 < x + y",
        mathText: "0 < x + y",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "xy ≠ 0",
        mathText: "xy \\neq 0",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "x - y ≠ 0",
        mathText: "x - y \\neq 0",
        isCorrect: true,
        explanation:
          "נעביר אגפים: x^2 - 2xy + y^2 > 0, כלומר (x - y)^2 > 0. ריבוע של מספר ממשי גדול ממש מ-0 אם ורק אם המספר שונה מ-0, כלומר x - y ≠ 0.",
      },
    ],
  },
  {
    id: "psy-quant-pct-discount-bundle",
    domain: "QUANTITATIVE",
    title: "בעיות אחוזים",
    context:
      "מחירו של צג מחשב גבוה פי 4 ממחירה של מקלדת (ללא הנחה). גלי קנתה צג מחשב בהנחה של 60% ומקלדת בהנחה של 20%.",
    instruction: "מה אחוז ההנחה הכולל שקיבלה גלי בקנייה זו?",
    options: [
      { id: "1", plainText: "58%", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "52%",
        isCorrect: true,
        explanation:
          'נציב מחירים: מחיר מקלדת 100 ש"ח, מחיר צג 400 ש"ח (סה"כ 500 ש"ח ללא הנחה). הנחה על הצג: 240 ש"ח (60% מ-400). הנחה על המקלדת: 20 ש"ח (20% מ-100). סך ההנחה: 260 ש"ח מתוך 500 ש"ח, שהם 52%.',
      },
      { id: "3", plainText: "44%", isCorrect: false, explanation: "מסיח." },
      { id: "4", plainText: "40%", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-verb-inf-tsetse",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "טפיל מחלת השינה מועבר מאדם לאדם באמצעות עקיצת זבוב הצה-צה, חרק נפוץ למדי באפריקה הטרופית. כאשר זבוב צה-צה עוקץ אדם החולה במחלת השינה, הטפיל עובר לגופו של הזבוב ומתרבה שם. אם זבוב אחד עוקץ כמה חולים ואוסף לגופו טפילים מכמה בני אדם, מידע גנטי יכול לעבור בין הטפילים בזמן שהותם בגוף הזבוב. הדבר מסייע בהגדלת השונות הגנטית שלהם ועלול להפוך אותם לעמידים יותר לטיפול תרופתי.",
    instruction:
      "לפי הפסקה, כיצד אפשר להסביר את העובדה שבאזורים שבהם חולים רבים במחלת השינה, העלייה בעמידות הטפיל לטיפול תרופתי מהירה יותר מבאזורים אחרים?",
    options: [
      {
        id: "1",
        plainText: "באזורים אלו שיעור זבובי הצה-צה הנושאים בגופם את הטפיל נמוך יותר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "באזורים אלו מספר זבובי הצה-צה גבוה יותר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "באזורים אלו יש סיכוי גבוה יותר שמידע גנטי יעבור מגופו של זבוב הצה-צה אל הטפיל",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "באזורים אלו הסיכוי שזבוב צה-צה יעקוץ כמה חולים במחלת השינה גבוה יותר",
        isCorrect: true,
        explanation:
          "ריבוי חולים מעלה את הסיכוי שזבוב אחד יעקוץ כמה חולים שונים, מה שמאפשר מעבר מידע גנטי בין טפילים שונים והגברת העמידות לתרופות.",
      },
    ],
  },
  {
    id: "psy-verb-logic-football-summer",
    domain: "VERBAL",
    title: "היגיון פורמלי",
    context: "",
    instruction:
      "תשובה שלילית על איזו מן השאלות הבאות תאפשר לקבוע בוודאות שיום הולדתו של כל תלמיד שאינו אוהב לשחק כדורגל חל בקיץ?",
    options: [
      {
        id: "1",
        plainText: "האם יש תלמידים שאוהבים לשחק כדורגל ולא נולדו בקיץ?",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "האם יש תלמידים שנולדו בקיץ ואינם אוהבים לשחק כדורגל?",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "האם יש תלמידים שלא נולדו בקיץ ואוהבים לשחק כדורגל?",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "האם יש תלמידים שאינם אוהבים לשחק כדורגל ולא נולדו בקיץ?",
        isCorrect: true,
        explanation:
          "תשובה שלילית ('לא, אין כאלה') פירושה שאין אף תלמיד שלא אוהב כדורגל שנולד מחוץ לקיץ, כלומר כל מי שאינו אוהב כדורגל בהכרח נולד בקיץ.",
      },
    ],
  },
  {
    id: "psy-verb-cloze-face-expressions",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      "שלא כמו תקשורת מילולית, שמאפשרת לאדם לבחור אם _____, הבעות הפנים מבטאות את רגשותיו באופן _____. למרות זאת, עשויים רגשות אלו _____, כיוון שרוב האנשים _____ הבעות פנים.",
    instruction: "איזה מרצפי המילים משלים את המשפט בצורה הטובה ביותר?",
    options: [
      {
        id: "1",
        plainText:
          "לחשוף את צערו או להסתירו / בלתי נשלט / להיחשף / מבטאים את כאבם רק באמצעות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "לעדן או להחריף את ביטוי עמדותיו / מדויק / להתפרש באופן שגוי / מפענחים היטב",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "לומר אמת או שקר / מהימן תמיד / שלא להיחשף / אינם מסוגלים לשקר באמצעות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "לדבר או להחריש / לא רצוני / שלא להתגלות / לעיתים אינם מפענחים נכון",
        isCorrect: true,
        explanation:
          "התקשורת המילולית מאפשרת לבחור אם לדבר או להחריש, הבעות הפנים אינן רצוניות, ולמרות זאת הרגש עלול שלא להתגלות כי אנשים לא תמיד מפענחים נכון.",
      },
    ],
  },
  {
    id: "psy-verb-cloze-travel-agent",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      'אני עצמי _____ לשמש דוגמה _____ למימרה העממית _____, שכן אני מנהלת של סוכנות נסיעות, ומעולם לא _____!',
    instruction: "איזה מרצפי המילים משלים את המשפט בצורה הטובה ביותר?",
    options: [
      {
        id: "1",
        plainText:
          'איני יכולה / חיה / "הסנדלר הולך יחף" / יצאתי את גבולות הארץ',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          'איני יכולה / נגדית / "נהנה מי שקרוב לצלחת" / השגתי כרטיסי טיסה חינם בשבילי או בשביל בני משפחתי',
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          'יכולה / נגדית / "הסנדלר הולך יחף" / נתקלתי באדם שנוסע לחוץ לארץ יותר ממני',
        isCorrect: true,
        explanation:
          "המימרה 'הסנדלר הולך יחף' מתארת מי שאינו נהנה מתחום עיסוקו. היות והיא נוסעת יותר מכולם, היא מהווה דוגמה נגדית למימרה זו.",
      },
      {
        id: "4",
        plainText:
          'איני יכולה / חיה / "נהנה מי שקרוב לצלחת" / החמצתי הזדמנות לתת כרטיסי טיסה חינם לבני משפחתי',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verb-cloze-teacher-gender",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      "במחקר שנערך בעת האחרונה נמצא כי כאשר מורה _____ את האוטונומיה של תלמידו, התלמיד נוטה לאבד ריכוז בזמן השיעור, אלא אם כן שניהם בני אותו המין. לנוכח ממצאי המחקר, _____ לגלות שטל, תלמידתי, שמורה שאני מעניק לה חופש פעולה רב, _____ מקושי כזה.",
    instruction: "איזה מרצפי המילים משלים את המשפט בצורה הטובה ביותר?",
    options: [
      {
        id: "1",
        plainText: "מעודד / הופתעתי / אינה סובלת",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "מעודד / לא הופתעתי / סובלת",
        isCorrect: true,
        explanation:
          "עידוד אוטונומיה מוביל לאיבוד ריכוז אלא אם כן הם מאותו המין. מכיוון שהמורה גבר והתלמידה אישה (מינים שונים), אין זה מפתיע שהיא סובלת מקושי זה.",
      },
      {
        id: "3",
        plainText: "אינו מעודד / לא הופתעתי / אינו סובל",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "אינו מעודד / לא הופתעתי / סובל",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verb-cloze-museum-enemy",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      "_____ שבזמן ביקורי במוזיאון אפגוש את הגדול שבאיוביי, _____ הייתי _____ לקראת הביקור.",
    instruction: "איזה מרצפי המילים משלים את המשפט בצורה הטובה ביותר?",
    options: [
      {
        id: "1",
        plainText: "לולא ידעתי / לא / מודאג כל כך",
        isCorrect: true,
        explanation:
          "משפט הגיוני לחלוטין: אילולא ידעתי שאפגוש את האויב, לא הייתי כל כך מודאג (ומאחר שידעתי - הייתי מודאג).",
      },
      {
        id: "2",
        plainText: "ידעתי / ובכל זאת / מודאג",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "אילו ידעתי / סביר ש- / שאנן אף יותר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "אף שלא ידעתי / לא / מודאג",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-verb-cloze-sterling-island",
    domain: "VERBAL",
    title: "השלמת משפטים",
    context:
      "מאחר שכמות הדגים בקרבת חופי האי סטרלינג _____, בחרו הדייגים לתור אחרי שלל _____ אי. _____, מפני שהדיג בים הפתוח _____.",
    instruction: "איזה מרצפי המילים משלים את המשפט בצורה הטובה ביותר?",
    options: [
      {
        id: "1",
        plainText:
          "גדלה / רק שם, ולא בנהרות שב- / הם העדיפו להתרחק מן הנהרות / מסוכן מן הדיג בנהרות",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "פחתה / בלב ים, הרחק מן ה- / הדבר הכביד עליהם / אינו מסוכן מן הדיג בקרבת החופים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "גדלה / רק בנהרות שב- / השינוי הקשה עליהם / אינו מסוכן כמו הדיג בנהרות האי",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "פחתה / בנהרות שב- / הם עשו זאת בחשש / מסוכן פחות מן הדיג בנהרות הסוערים",
        isCorrect: true,
        explanation:
          "הירידה בכמות הדגים אילצה אותם לעבור לנהרות, והם עשו זאת בחשש מאחר שהדיג בנהרות מסוכן יותר מדיג בים הפתוח.",
      },
    ],
  },
  {
    id: "psy-verb-inf-pinker-music",
    domain: "VERBAL",
    title: "הבנה והסקה",
    context:
      "הפסיכולוג סטיבן פינקר טוען כי השפה טבעית לאדם, שהרי אנו רוכשים את השפה ודוברים אותה ללא תרגול מכוון, ואילו המוזיקה אינה טבעית לאדם, שהרי רק מעטים מסוגלים לרכוש את היכולת לנגן בכלי נגינה, ואף הם נזקקים לתרגול תמידי. ואולם, מבקריו של פינקר מצביעים על כך שלמעשה, _____, ולפיכך טענתו של פינקר כמוה כטענה שהשפה אינה טבעית לאדם שכן כתיבה מחייבת תרגול מכוון.",
    instruction: "איזו מהאפשרויות הבאות משלימה את דברי המבקרים בצורה הטובה ביותר?",
    options: [
      {
        id: "1",
        plainText:
          "רכישת היכולת לדבר אינה מורכבת פחות מרכישת היכולת לנגן בכלי נגינה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText:
          "היכולת לדבר נרכשת אחרי היכולת להבין דיבור, ותהליך רכישתה מורכב יותר",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "אף שמעטים מנגנים בפועל בכלי נגינה, לרבים יש היכולת לעשות זאת",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "המקבילה בתחום המוזיקה לדיבור היא השירה, ולא הנגינה בכלי נגינה",
        isCorrect: true,
        explanation:
          "המבקרים טוענים להקבלה שגויה: נגינה בכלי מקבילה לכתיבה (שתיהן דורשות תרגול), בעוד שירה היא המקבילה הטבעית לדיבור.",
      },
    ],
  },
  {
    id: "psy-quant-prob-hoops-markov",
    domain: "QUANTITATIVE",
    title: "הסתברות",
    context:
      "נטע מתאמנת בקליעה לסל. אם היא קולעת לסל בזריקה כלשהי, ההסתברות שתקלע לסל בזריקה הבאה היא מחצית. אם אינה קולעת לסל בזריקה כלשהי, ההסתברות שתקלע בזריקה הבאה היא רבע. ידוע שבזריקה הראשונה קלעה נטע לסל.",
    instruction: "מה ההסתברות שתקלע לסל בזריקה השלישית?",
    formulaLatex:
      "P(\\text{hit}\\mid\\text{hit})=\\tfrac12,\\quad P(\\text{hit}\\mid\\text{miss})=\\tfrac14",
    options: [
      {
        id: "1",
        plainText: "1 / 8",
        mathText: "\\dfrac{1}{8}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "1 / 4",
        mathText: "\\dfrac{1}{4}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "3 / 8",
        mathText: "\\dfrac{3}{8}",
        isCorrect: true,
        explanation:
          'זריקה 1: קלעה. זריקה 2: קלעה (1/2) או החטיאה (1/2). לזריקה 3: אם קלעה בשנייה (1/2), תקלע בשלישית בהסתברות 1/2 (סה"כ 1/4). אם החטיאה בשנייה (1/2), תקלע בשלישית בהסתברות 1/4 (סה"כ 1/8). סה"כ: 1/4 + 1/8 = 3/8.',
      },
      {
        id: "4",
        plainText: "3 / 4",
        mathText: "\\dfrac{3}{4}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "psy-quant-motion-hare-tortoise",
    domain: "QUANTITATIVE",
    title: "בעיות תנועה",
    context:
      "צב וארנב התחרו בריצה לאורך 100 מטרים. הצב החל לרוץ עם תחילת התחרות במהירות קבועה של 0.5 מטר לשנייה. הארנב החל לרוץ T שניות אחרי תחילת התחרות, במהירות הגדולה פי 20 ממהירות הצב. שניהם הגיעו לקו הסיום יחד.",
    instruction: "מצא את ערך T:",
    formulaLatex:
      "v_{\\text{turtle}}=0.5,\\quad v_{\\text{hare}}=10,\\quad T=?",
    options: [
      { id: "1", plainText: "160", isCorrect: false, explanation: "מסיח." },
      { id: "2", plainText: "180", isCorrect: false, explanation: "מסיח." },
      {
        id: "3",
        plainText: "190",
        isCorrect: true,
        explanation:
          "זמן ריצת הצב: 100 מטר חלקי 0.5 מ' לשנייה = 200 שניות. מהירות הארנב: 0.5 * 20 = 10 מ' לשנייה. זמן ריצת הארנב: 100 חלקי 10 = 10 שניות. מכיוון שהגיעו יחד, הארנב יצא 10 שניות לפני הסיום: T = 200 - 10 = 190 שניות.",
      },
      { id: "4", plainText: "200", isCorrect: false, explanation: "מסיח." },
    ],
  },
  {
    id: "psy-quant-alg-ineq-multiplication",
    domain: "QUANTITATIVE",
    title: "אי-שוויונות",
    context: "נתון:",
    instruction: "איזו מהטענות הבאות נכונה בנוגע למספר M?",
    formulaLatex: "a < 1,\\quad b < 1,\\quad a \\cdot b = M",
    options: [
      { id: "1", plainText: "הוא בהכרח שלילי", isCorrect: false, explanation: "מסיח." },
      {
        id: "2",
        plainText: "הוא בהכרח חיובי וקטן מ-1",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "הוא עשוי להיות כל מספר חוץ מ-1",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "הוא עשוי להיות כל מספר, ובכלל זה גם 1",
        isCorrect: true,
        explanation:
          "אם a = -1 ו-b = -1, אזי M = 1. עבור ערכים שונים M יכול להיות שלילי, חיובי, שבר או כל ערך אחר.",
      },
    ],
  },
  {
    id: "psy-quant-avg-asaf-david",
    domain: "QUANTITATIVE",
    title: "ממוצעים",
    context: "נסמן ב-A את גילו של אסף וב-D את גילו של דוד. נתון:",
    instruction: "איזו מהטענות הבאות נכונה בהכרח?",
    formulaLatex: "\\frac{A + D}{2} > \\frac{D}{2}",
    options: [
      {
        id: "1",
        plainText: "גילו של אסף גדול מגילו של דוד",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "גילו של אסף קטן מגילו של דוד",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "גילו של אסף שווה לגילו של דוד",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: 'אי אפשר לדעת על פי הנתונים איזו מהטענות הנ"ל נכונה',
        isCorrect: true,
        explanation:
          "מתמטית: (A + D) / 2 > D / 2 גורר ש-A > 0. מכיוון שגיל הוא תמיד חיובי, האי-שוויון מתקיים תמיד, ואינו מעיד על יחסי הגילים בין אסף לדוד.",
      },
    ],
  },
  {
    id: "psy-quant-alg-fraction-reduction",
    domain: "QUANTITATIVE",
    title: "אלגברה - שברים",
    context: "נתון ש-a שונה מ-b וכן b שונה מאפס. פשט את הביטוי:",
    instruction: "מהו הביטוי המפושט?",
    formulaLatex: "\\frac{a^2 + b^2}{ab - b^2} - \\frac{2a}{a - b}",
    options: [
      {
        id: "1",
        plainText: "(a + b) / (a - b)",
        mathText: "\\dfrac{a + b}{a - b}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "(a - b) / b",
        mathText: "\\dfrac{a - b}{b}",
        isCorrect: true,
        explanation:
          "מכנה משותף: b(a - b). מרחיבים את השבר השני ב-b ומקבלים: [a^2 + b^2 - 2ab] / [b(a - b)]. המונה הוא כפל מקוצר: (a - b)^2. מצמצמים ב-(a - b) ומקבלים: (a - b) / b.",
      },
      {
        id: "3",
        plainText: "(a - b)^2",
        mathText: "(a - b)^2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "(2a^2) / b",
        mathText: "\\dfrac{2a^2}{b}",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
];

/** Isolated psychometric banks — never mixed with bagrut/academic pools. */
export const PSYCHOMETRIC_QUANT_QUESTIONS: DiagnosticQuestion[] =
  PSYCHOMETRIC_QUESTIONS.filter((q) => q.domain === "QUANTITATIVE");

export const PSYCHOMETRIC_VERBAL_QUESTIONS: DiagnosticQuestion[] =
  PSYCHOMETRIC_QUESTIONS.filter((q) => q.domain === "VERBAL");

/** Fisher–Yates shuffle — returns a new array, leaves the source untouched. */
function shuffleQuestions(pool: DiagnosticQuestion[]): DiagnosticQuestion[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Sample up to `count` items from a single bank — never crosses banks. */
function sampleFromBank(
  bank: readonly DiagnosticQuestion[],
  count = 3
): DiagnosticQuestion[] {
  if (bank.length === 0) return [];
  return shuffleQuestions([...bank]).slice(0, Math.min(count, bank.length));
}

/**
 * Psychometric onboarding suite: exactly 4 questions when the bank allows —
 * 2 QUANTITATIVE + 2 VERBAL from the dedicated psych banks only.
 */
function samplePsychometricOnboardingQuestions(): DiagnosticQuestion[] {
  const TARGET_PER_DOMAIN = 2;
  const TARGET_TOTAL = 4;

  const quantitative = sampleFromBank(
    PSYCHOMETRIC_QUANT_QUESTIONS,
    TARGET_PER_DOMAIN
  );
  const verbal = sampleFromBank(PSYCHOMETRIC_VERBAL_QUESTIONS, TARGET_PER_DOMAIN);

  const selected: DiagnosticQuestion[] = [...quantitative, ...verbal];

  // Same-subject top-up only (psych banks), never bagrut/academic.
  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = shuffleQuestions(
      [...PSYCHOMETRIC_QUANT_QUESTIONS, ...PSYCHOMETRIC_VERBAL_QUESTIONS].filter(
        (q) => !selectedIds.has(q.id)
      )
    );
    for (const q of leftovers) {
      if (selected.length >= TARGET_TOTAL) break;
      selected.push(q);
    }
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Bagrut 582 onboarding suite: one question from each exam chapter —
 * GEOMETRY_VECTORS, COMPLEX_NUMBERS, CALCULUS — then shuffle the trio.
 * Falls back by topping up from the remaining 582 bank if a domain is empty.
 */
function sampleBagrut582OnboardingQuestions(): DiagnosticQuestion[] {
  const DOMAINS = [
    "GEOMETRY_VECTORS",
    "COMPLEX_NUMBERS",
    "CALCULUS",
  ] as const;
  const TARGET_TOTAL = 3;

  const selected: DiagnosticQuestion[] = [];
  for (const domain of DOMAINS) {
    const pool = DIAGNOSTIC_3_DOMAIN_QUESTIONS.filter((q) => q.domain === domain);
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = shuffleQuestions(
      DIAGNOSTIC_3_DOMAIN_QUESTIONS.filter((q) => !selectedIds.has(q.id))
    );
    for (const q of leftovers) {
      if (selected.length >= TARGET_TOTAL) break;
      selected.push(q);
    }
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Bagrut 581 onboarding suite: pick 3 of the 4 exam domains
 * (SEQUENCES, WORD_PROBLEMS, PROBABILITY, CALCULUS), one random question
 * each, then shuffle. Tops up from the remaining bank if a domain is empty.
 */
function sampleBagrut581OnboardingQuestions(): DiagnosticQuestion[] {
  const DOMAINS = [
    "SEQUENCES",
    "WORD_PROBLEMS",
    "PROBABILITY",
    "CALCULUS",
  ] as const;
  const TARGET_TOTAL = 3;

  const domainOrder = [...DOMAINS];
  for (let i = domainOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [domainOrder[i], domainOrder[j]] = [domainOrder[j], domainOrder[i]];
  }

  const selected: DiagnosticQuestion[] = [];
  for (const domain of domainOrder) {
    if (selected.length >= TARGET_TOTAL) break;
    const pool = BAGRUT_581_QUESTIONS.filter((q) => q.domain === domain);
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = shuffleQuestions(
      BAGRUT_581_QUESTIONS.filter((q) => !selectedIds.has(q.id))
    );
    for (const q of leftovers) {
      if (selected.length >= TARGET_TOTAL) break;
      selected.push(q);
    }
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/** 5 יח״ל — שאלון 581 (חלק א׳). Alias for mechina DRY routing. */
function sampleMath5_1_OnboardingQuestions(): DiagnosticQuestion[] {
  return sampleBagrut581OnboardingQuestions();
}

/** 5 יח״ל — שאלון 582 (חלק ב׳). Alias for mechina DRY routing. */
function sampleMath5_2_OnboardingQuestions(): DiagnosticQuestion[] {
  return sampleBagrut582OnboardingQuestions();
}

/**
 * Combined 5 יח״ל math: 2 questions from one paper + 1 from the other
 * (coin-flip which paper is primary), then shuffle. 5U banks only.
 */
function sampleMath5AllOnboardingQuestions(): DiagnosticQuestion[] {
  const primaryIs581 = Math.random() < 0.5;
  const primary = primaryIs581
    ? sampleMath5_1_OnboardingQuestions()
    : sampleMath5_2_OnboardingQuestions();
  const secondary = primaryIs581
    ? sampleMath5_2_OnboardingQuestions()
    : sampleMath5_1_OnboardingQuestions();

  const selectedIds = new Set<string>();
  const picks: DiagnosticQuestion[] = [];
  for (const q of [...primary.slice(0, 2), ...secondary.slice(0, 1)]) {
    if (!q || selectedIds.has(q.id)) continue;
    selectedIds.add(q.id);
    picks.push(q);
  }

  if (picks.length < 3) {
    const leftovers = [...primary, ...secondary].filter(
      (q) => !selectedIds.has(q.id)
    );
    picks.push(...sampleFromBank(leftovers, 3 - picks.length));
  }

  return shuffleQuestions(picks).slice(0, 3);
}

/**
 * Bagrut 481 onboarding suite: pick 3 distinct domains from the 4U bank
 * (WORD_PROBLEMS, STATISTICS, PROBABILITY, CALCULUS_RATIONAL,
 * CALCULUS_RADICAL, OPTIMIZATION), one random question each, then shuffle.
 */
function sampleBagrut481OnboardingQuestions(): DiagnosticQuestion[] {
  const DOMAINS = [
    "WORD_PROBLEMS",
    "STATISTICS",
    "PROBABILITY",
    "CALCULUS_RATIONAL",
    "CALCULUS_RADICAL",
    "OPTIMIZATION",
  ] as const;
  const TARGET_TOTAL = 3;

  const domainOrder = [...DOMAINS];
  for (let i = domainOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [domainOrder[i], domainOrder[j]] = [domainOrder[j], domainOrder[i]];
  }

  const selected: DiagnosticQuestion[] = [];
  for (const domain of domainOrder) {
    if (selected.length >= TARGET_TOTAL) break;
    const pool = BAGRUT_481_QUESTIONS.filter((q) => q.domain === domain);
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = shuffleQuestions(
      BAGRUT_481_QUESTIONS.filter((q) => !selectedIds.has(q.id))
    );
    for (const q of leftovers) {
      if (selected.length >= TARGET_TOTAL) break;
      selected.push(q);
    }
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Bagrut 482 onboarding suite: one question from each curriculum cluster —
 * (SEQUENCES | GROWTH_DECAY), (TRIG_CALCULUS | EXP_CALCULUS), LOG_CALCULUS —
 * then shuffle the trio. Tops up from the remaining bank if a cluster is empty.
 */
function sampleBagrut482OnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    ["SEQUENCES", "GROWTH_DECAY"],
    ["TRIG_CALCULUS", "EXP_CALCULUS"],
    ["LOG_CALCULUS"],
  ];
  const TARGET_TOTAL = 3;

  const selected: DiagnosticQuestion[] = [];
  for (const cluster of CLUSTERS) {
    const pool = BAGRUT_482_QUESTIONS.filter((q) => cluster.includes(q.domain));
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = shuffleQuestions(
      BAGRUT_482_QUESTIONS.filter((q) => !selectedIds.has(q.id))
    );
    for (const q of leftovers) {
      if (selected.length >= TARGET_TOTAL) break;
      selected.push(q);
    }
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Physics — חשמל ומגנטיות: one question from each curriculum cluster —
 * (אלקטרוסטטיקה/קבלים), (מעגלי DC), (מגנטיות/השראה) — then shuffle the trio.
 * Fail-safe: empty electricity bank → [] (never mechanics/math/psych).
 */
function samplePhysicsElectricityOnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "phys-elec-millikan-droplet",
      "phys-elec-shell-potential-proton",
      "phys-elec-charge-sharing-wire",
      "phys-elec-capacitor-plate-area",
      "phys-elec-braking-particle-separation",
    ],
    [
      "phys-elec-wire-resistivity",
      "phys-elec-emf-internal-res-circuits",
      "phys-elec-max-power-parabola",
    ],
    [
      "phys-elec-proton-magnetic-circle",
      "phys-elec-hanging-rod-magnet",
      "phys-elec-terminal-velocity-induction",
      "phys-elec-solenoid-faraday-flux",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_PHYSICS_ELECTRICITY_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_PHYSICS_ELECTRICITY_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => q !== undefined);
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_PHYSICS_ELECTRICITY_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Mechanics onboarding: one question from each topic cluster —
 * (קינמטיקה/ניוטון), (מעגלית/תנע), (אנרגיה/הרמונית/כבידה) — then shuffle the trio.
 * Fail-safe: empty mechanics bank → [] (never electricity/math/psych).
 */
function samplePhysicsMechanicsOnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "phys-mech-two-cars-bus-stop",
      "phys-mech-javelin-projectile",
      "phys-mech-box-friction-linear-fit",
      "phys-mech-atwood-mass-ratio",
      "phys-mech-incline-up-down-accel",
    ],
    [
      "phys-mech-rotating-arm-pendulum",
      "phys-mech-momentum-two-boxes",
      "phys-mech-elastic-collision-target",
    ],
    [
      "phys-mech-work-energy-variable-force",
      "phys-mech-vertical-loop-min-height",
      "phys-mech-harmonic-oscillator-spring",
      "phys-mech-kepler-third-law-ratio",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_PHYSICS_MECHANICS_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_PHYSICS_MECHANICS_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => q !== undefined);
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_PHYSICS_MECHANICS_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Mechina physics — general (tech/engineering core): 2 mechanics + 1 electricity.
 * Fail-safe: empty banks → [] / top-up within mechanics+electricity only.
 */
function sampleMechinaPhysicsGeneralOnboardingQuestions(): DiagnosticQuestion[] {
  const TARGET_TOTAL = 3;
  const mech = samplePhysicsMechanicsOnboardingQuestions();
  const elec = samplePhysicsElectricityOnboardingQuestions();

  const selectedIds = new Set<string>();
  const picks: DiagnosticQuestion[] = [];
  for (const q of [...mech.slice(0, 2), ...elec.slice(0, 1)]) {
    if (!q || selectedIds.has(q.id)) continue;
    selectedIds.add(q.id);
    picks.push(q);
  }

  if (picks.length < TARGET_TOTAL) {
    const pool = [
      ...BAGRUT_PHYSICS_MECHANICS_QUESTIONS,
      ...BAGRUT_PHYSICS_ELECTRICITY_QUESTIONS,
    ].filter((q) => !selectedIds.has(q.id));
    picks.push(...sampleFromBank(pool, TARGET_TOTAL - picks.length));
  }

  return shuffleQuestions(picks).slice(0, TARGET_TOTAL);
}

/**
 * Waves/radiation onboarding: one question from each topic cluster —
 * (אופטיקה גלית), (גאומטרית/פוטואלקטרי), (אטומי/גרעיני) — then shuffle the trio.
 * Fail-safe: empty waves bank → [] (never mechanics/math/psych).
 */
function samplePhysicsWavesOnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "phys-waves-interference-water",
      "phys-waves-young-double-slit-colors",
      "phys-waves-microwaves-diffraction",
    ],
    [
      "phys-waves-lenses-virtual-image",
      "phys-waves-photoelectric-work-function",
      "phys-waves-photoelectric-light-intensity",
    ],
    [
      "phys-waves-mercury-excitation-photon-electron",
      "phys-waves-hydrogen-balmer-series",
      "phys-waves-hydrogen-ionization",
      "phys-waves-radioactive-radiation-magnetic",
      "phys-waves-nuclear-beta-decay",
      "phys-waves-radioactive-half-life-graph",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_PHYSICS_WAVES_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_PHYSICS_WAVES_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => q !== undefined);
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_PHYSICS_WAVES_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/** Within-physics ALL: one from each non-empty physics bank, still physics-only. */
function samplePhysicsAllOnboardingQuestions(): DiagnosticQuestion[] {
  const picks: DiagnosticQuestion[] = [];
  const elec = samplePhysicsElectricityOnboardingQuestions()[0];
  const mech = samplePhysicsMechanicsOnboardingQuestions()[0];
  const waves = samplePhysicsWavesOnboardingQuestions()[0];
  if (elec) picks.push(elec);
  if (mech) picks.push(mech);
  if (waves) picks.push(waves);
  if (picks.length >= 3) return shuffleQuestions(picks).slice(0, 3);
  // Top up from remaining physics banks only
  const selectedIds = new Set(picks.map((q) => q.id));
  const physicsPool = [
    ...BAGRUT_PHYSICS_ELECTRICITY_QUESTIONS,
    ...BAGRUT_PHYSICS_MECHANICS_QUESTIONS,
    ...BAGRUT_PHYSICS_WAVES_QUESTIONS,
  ].filter((q) => !selectedIds.has(q.id));
  return [...picks, ...sampleFromBank(physicsPool, 3 - picks.length)];
}

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
    instruction: "מהו פתרון האי-שוויון הבא?",
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

/* -------------------------------------------------------------------------- */
/* Deterministic routing isolation — subject first, then exact paper keys      */
/* -------------------------------------------------------------------------- */

type MathExamKey = "581" | "582" | "481" | "482" | "ALL_5" | "ALL_4" | "ALL_3";
type PhysicsExamKey = "ELECTRICITY" | "MECHANICS" | "WAVES" | "LAB" | "ALL";
type CsExamKey = "CS_1" | "CS_2";
type HebrewExamKey = "HEBREW_1" | "HEBREW_2";
type CivicsExamKey = "CIVICS_1" | "CIVICS_2";
type HistoryExamKey = "HISTORY_1" | "HISTORY_2";

/** Exact math paper codes only — no substring matching. */
const MATH_EXAM_KEY_BY_CODE: Readonly<Record<string, MathExamKey>> = {
  "35581": "581",
  "581": "581",
  MATH_581: "581",
  "35582": "582",
  "582": "582",
  MATH_582: "582",
  "35481": "481",
  "481": "481",
  "35482": "482",
  "482": "482",
  ALL_5: "ALL_5",
  ALL_4: "ALL_4",
  ALL_3: "ALL_3",
  // 3U papers share the ALL_3 math bank (same subject)
  "35182": "ALL_3",
  "35381": "ALL_3",
  "35382": "ALL_3",
};

/** Exact physics paper codes only — 036582 never collides with math 582. */
const PHYSICS_EXAM_KEY_BY_CODE: Readonly<Record<string, PhysicsExamKey>> = {
  "036582": "ELECTRICITY",
  "5382": "ELECTRICITY",
  PHYS_ELEC: "ELECTRICITY",
  ELECTRICITY: "ELECTRICITY",
  "036581": "MECHANICS",
  "5381": "MECHANICS",
  PHYS_MECH: "MECHANICS",
  MECHANICS: "MECHANICS",
  "036583": "WAVES",
  "5383": "WAVES",
  PHYS_RAD: "WAVES",
  RADIATION: "WAVES",
  WAVES: "WAVES",
  "036586": "LAB",
  PHYS_LAB: "LAB",
  ALL_PHYS: "ALL",
  PHYSICS: "ALL",
};

/** Exact CS paper codes only — first vs second questionnaire. */
const CS_EXAM_KEY_BY_CODE: Readonly<Record<string, CsExamKey>> = {
  "899381": "CS_1",
  CS_1: "CS_1",
  CS1: "CS_1",
  "899282": "CS_2",
  "899283": "CS_2",
  CS_2: "CS_2",
  CS2: "CS_2",
};

/** Exact Hebrew paper codes — שאלון ראשון (צורות/תחביר) vs שאלון שני (הבנה/סמנטיקה). */
const HEBREW_EXAM_KEY_BY_CODE: Readonly<Record<string, HebrewExamKey>> = {
  HEBREW_1: "HEBREW_1",
  HEB_1: "HEBREW_1",
  "011281": "HEBREW_1",
  "11281": "HEBREW_1",
  HEBREW_2: "HEBREW_2",
  HEB_2: "HEBREW_2",
  "011282": "HEBREW_2",
  "11282": "HEBREW_2",
};

/** Exact civics paper codes — שאלון ראשון (34281) vs שאלון שני (34282). */
const CIVICS_EXAM_KEY_BY_CODE: Readonly<Record<string, CivicsExamKey>> = {
  "34281": "CIVICS_1",
  "034281": "CIVICS_1",
  CIVICS_1: "CIVICS_1",
  CIV1: "CIVICS_1",
  "34282": "CIVICS_2",
  "034282": "CIVICS_2",
  CIVICS_2: "CIVICS_2",
  CIV2: "CIVICS_2",
};

/** Exact history paper codes — שאלון ראשון (22261) vs שאלון שני (22262). */
const HISTORY_EXAM_KEY_BY_CODE: Readonly<Record<string, HistoryExamKey>> = {
  "22261": "HISTORY_1",
  "022261": "HISTORY_1",
  HISTORY_1: "HISTORY_1",
  HIST_1: "HISTORY_1",
  "22262": "HISTORY_2",
  "022262": "HISTORY_2",
  HISTORY_2: "HISTORY_2",
  HIST_2: "HISTORY_2",
};

type MechinaMathPaper = "581" | "582" | "ALL_5";
type MechinaPhysicsPaper = "ELECTRICITY" | "MECHANICS" | "GENERAL";
type MechinaRoute =
  | { subject: "math"; paper: MechinaMathPaper }
  | { subject: "physics"; paper: MechinaPhysicsPaper };

/**
 * Mechina → 5 יח״ל bagrut banks (DRY). Keys include taxonomy Hebrew labels
 * and stable ids (mechina_math / MECHINA_MATH / mechina_physics / …).
 * Never routes math⇄physics or into unrelated subjects.
 */
const MECHINA_ROUTE_BY_LABEL: Readonly<Record<string, MechinaRoute>> = {
  // —— Math 5U (combined) ——
  mechina_math: { subject: "math", paper: "ALL_5" },
  MECHINA_MATH: { subject: "math", paper: "ALL_5" },
  "מתמטיקה (רמת 5 יח״ל / קדם-הנדסה ומדעים מדויקים)": {
    subject: "math",
    paper: "ALL_5",
  },
  // —— Math 5U questionnaire split (581 / 582) ——
  mechina_math_581: { subject: "math", paper: "581" },
  mechina_math_5_1: { subject: "math", paper: "581" },
  "מתמטיקה מכינה — חלק א׳": { subject: "math", paper: "581" },
  "מתמטיקה מכינה — שאלון 581": { subject: "math", paper: "581" },
  mechina_math_582: { subject: "math", paper: "582" },
  mechina_math_5_2: { subject: "math", paper: "582" },
  "מתמטיקה מכינה — חלק ב׳": { subject: "math", paper: "582" },
  "מתמטיקה מכינה — שאלון 582": { subject: "math", paper: "582" },
  // —— Physics modules ——
  mechina_physics: { subject: "physics", paper: "GENERAL" },
  MECHINA_PHYSICS: { subject: "physics", paper: "GENERAL" },
  "פיזיקה למכינות": { subject: "physics", paper: "GENERAL" },
  "פיזיקה - מכניקה למכינות": { subject: "physics", paper: "MECHANICS" },
  mechina_physics_mechanics: { subject: "physics", paper: "MECHANICS" },
  MECHINA_PHYSICS_MECHANICS: { subject: "physics", paper: "MECHANICS" },
  "פיזיקה - חשמל ומגנטיות למכינות": {
    subject: "physics",
    paper: "ELECTRICITY",
  },
  mechina_physics_electricity: { subject: "physics", paper: "ELECTRICITY" },
  MECHINA_PHYSICS_ELECTRICITY: { subject: "physics", paper: "ELECTRICITY" },
};

const MECHINA_MATH_DISPATCH: Readonly<
  Record<MechinaMathPaper, () => DiagnosticQuestion[]>
> = {
  "581": sampleMath5_1_OnboardingQuestions,
  "582": sampleMath5_2_OnboardingQuestions,
  ALL_5: sampleMath5AllOnboardingQuestions,
};

const MECHINA_PHYSICS_DISPATCH: Readonly<
  Record<MechinaPhysicsPaper, () => DiagnosticQuestion[]>
> = {
  MECHANICS: samplePhysicsMechanicsOnboardingQuestions,
  ELECTRICITY: samplePhysicsElectricityOnboardingQuestions,
  GENERAL: sampleMechinaPhysicsGeneralOnboardingQuestions,
};

/**
 * Exact / catalog academic course keys.
 * Includes both clean display labels and legacy catalog strings with codes.
 * Unknown courses must fail closed (never default to another bank).
 */
const ACADEMIC_COURSE_KEY_BY_ID: Readonly<Record<string, AcademicCourseKey>> = {
  // —— Linear algebra 1 (no institutional UI nicknames / codes) ——
  "אלגברה ליניארית 1": "LINALG",
  "אלגברה ליניארית": "LINALG",
  "אלגברה לינארית": "LINALG",
  "אלגברה לינארית 1": "LINALG",
  "academic-linear-algebra-1": "LINALG",
  "academic-linear-algebra": "LINALG",
  "linear-algebra": "LINALG",
  "linear-algebra-1": "LINALG",
  // Legacy catalog keys for LA1 (routing only — never shown as UI labels)
  "אלגברה לינארית מ": "LINALG",
  "אלגברה לינארית מ (104166)": "LINALG",
  "אלגברה לינארית (104019)": "LINALG",
  "104166": "LINALG",
  "104019": "LINALG",
  // —— Linear algebra 2 ——
  "אלגברה ליניארית 2": "LINALG2",
  "אלגברה ליניארית 2 / אלגברה 2": "LINALG2",
  "אלגברה לינארית 2": "LINALG2",
  "אלגברה 2": "LINALG2",
  "academic-linear-algebra-2": "LINALG2",
  "linear-algebra-2": "LINALG2",
  // Legacy catalog keys for LA2 (routing only)
  "אלגברה 2מ": "LINALG2",
  "אלגברה 2מ'": "LINALG2",
  "אלגברה לינארית 2מ": "LINALG2",
  "אלגברה 2מ (104038)": "LINALG2",
  "104038": "LINALG2",
  // —— Calculus / Infinitesimal (no institutional UI nicknames) ——
  "חדו״א": "CALC",
  "חדו״א / אינפי": "CALC",
  "academic-calculus": "CALC",
  "academic-calculus-1": "CALC",
  "calc-1": "CALC",
  // Legacy catalog keys for calc 1 (routing only — never shown as UI labels)
  "חדו״א 1": "CALC",
  "חדו״א 1ת": "CALC",
  "חדו״א 1 / אינפי 1": "CALC",
  "חדו״א 1ת (104016)": "CALC",
  "104016": "CALC",
  "10401": "CALC",
  // —— Calculus 2 ——
  "חדו״א 2": "CALC2",
  "חדו״א 2 / אינפי 2": "CALC2",
  "academic-calculus-2": "CALC2",
  "calc-2": "CALC2",
  // Legacy catalog keys for calc 2 (routing only)
  "חדו״א 2ת": "CALC2",
  "חדו״א 2מ": "CALC2",
  "חדו״א 2ת (104013)": "CALC2",
  "חדו״א 2מ (104022)": "CALC2",
  "104013": "CALC2",
  "104022": "CALC2",
  "אינפי 2": "CALC2",
  // —— Intro CS (clean UI label only; never mis-route to data-structures) ——
  "מבוא למדעי המחשב": "INTRO_CS",
  "academic-intro-cs": "INTRO_CS",
  "intro-cs": "INTRO_CS",
  "intro-to-cs": "INTRO_CS",
  // Legacy catalog keys for intro CS (routing only — never shown as UI labels)
  "מבוא למדעי המחשב ת": "INTRO_CS",
  "מבוא למדעי המחשב ת (234114)": "INTRO_CS",
  "מבוא למדעי המחשב מ (234117)": "INTRO_CS",
  "234114": "INTRO_CS",
  "234117": "INTRO_CS",
  // —— Algorithms / Design & Analysis (before data-structures; never collapse into CS) ——
  "תכנון וניתוח אלגוריתמים": "ALGORITHMS",
  "אלגוריתמים 1": "ALGORITHMS",
  "אלגוריתמים": "ALGORITHMS",
  "academic-algorithms": "ALGORITHMS",
  "algorithms": "ALGORITHMS",
  // Legacy catalog keys for algorithms (routing only)
  "תכנון וניתוח אלגוריתמים (236360)": "ALGORITHMS",
  "אלגוריתמים 1 (234247)": "ALGORITHMS",
  "236360": "ALGORITHMS",
  "234247": "ALGORITHMS",
  // —— Operating Systems ——
  "מערכות הפעלה": "OPERATING_SYSTEMS",
  "academic-operating-systems": "OPERATING_SYSTEMS",
  "operating-systems": "OPERATING_SYSTEMS",
  "os": "OPERATING_SYSTEMS",
  // Legacy catalog keys for OS (routing only)
  "מערכות הפעלה (234123)": "OPERATING_SYSTEMS",
  "234123": "OPERATING_SYSTEMS",
  // —— Theory of Computation & Complexity (before automata: "אוטומט" must not swallow it) ——
  "תורת החישוב וסיבוכיות": "THEORY_COMPUTATION_COMPLEXITY",
  "תורת החישוב": "THEORY_COMPUTATION_COMPLEXITY",
  "academic-theory-computation": "THEORY_COMPUTATION_COMPLEXITY",
  "theory-computation": "THEORY_COMPUTATION_COMPLEXITY",
  "theory-computation-complexity": "THEORY_COMPUTATION_COMPLEXITY",
  // —— Automata / Computational Models ——
  "מודלים חישוביים ואוטומטים": "AUTOMATA",
  "מודלים חישוביים": "AUTOMATA",
  "אוטומטים": "AUTOMATA",
  "academic-automata": "AUTOMATA",
  "automata": "AUTOMATA",
  "computational-models": "AUTOMATA",
  // Legacy catalog keys for automata (routing only)
  "מודלים חישוביים (236343)": "AUTOMATA",
  "מודלים חישוביים ואוטומטים (236343)": "AUTOMATA",
  "236343": "AUTOMATA",
  // —— CS / data structures ——
  "מבני נתונים": "CS",
  "מבני נתונים (234218)": "CS",
  "234218": "CS",
  "cs-data-structures": "CS",
  // —— Discrete mathematics (clean UI label only) ——
  "מתמטיקה בדידה": "DISCRETE",
  "מתמטיקה דיסקרטית": "DISCRETE",
  "academic-discrete-math": "DISCRETE",
  "discrete-math": "DISCRETE",
  "discrete-mathematics": "DISCRETE",
  // Legacy catalog keys for discrete math (routing only — never shown as UI labels)
  "מתמטיקה בדידה ת": "DISCRETE",
  "מתמטיקה בדידה ת (104036)": "DISCRETE",
  "104036": "DISCRETE",
  "234141": "DISCRETE",
  // —— Physics 1 / Mechanics (clean UI label only; no institutional codes) ——
  "פיזיקה 1 - מכניקה": "PHYSICS1",
  "פיזיקה 1": "PHYSICS1",
  "academic-physics-1": "PHYSICS1",
  "physics-1": "PHYSICS1",
  "physics1": "PHYSICS1",
  // Legacy catalog keys for physics 1 (routing only — never shown as UI labels)
  "פיזיקה 1 - מכניקה (114051)": "PHYSICS1",
  "פיזיקה 1 (114051)": "PHYSICS1",
  "פיזיקה 1מ": "PHYSICS1",
  "פיזיקה 1ר": "PHYSICS1",
  "פיזיקה 1מ/1ר": "PHYSICS1",
  "0509-1118": "PHYSICS1",
  "114051": "PHYSICS1",
  // —— Physics 2 / E&M (clean UI label only; no institutional codes) ——
  "פיזיקה 2 - חשמל ומגנטיות": "PHYSICS2",
  "פיזיקה 2": "PHYSICS2",
  "academic-physics-2": "PHYSICS2",
  "physics-2": "PHYSICS2",
  "physics2": "PHYSICS2",
  // Legacy catalog keys for physics 2 (routing only — never shown as UI labels)
  "פיזיקה 2 - חשמל ומגנטיות (114052)": "PHYSICS2",
  "פיזיקה 2מ": "PHYSICS2",
  "פיזיקה 2ח": "PHYSICS2",
  "פיזיקה 2מ/2ח": "PHYSICS2",
  "0509.1829": "PHYSICS2",
  "0509-1829": "PHYSICS2",
  "114052": "PHYSICS2",
  // —— Probability & Statistics (clean UI label only) ——
  "הסתברות וסטטיסטיקה": "PROB",
  "הסתברות": "PROB",
  "סטטיסטיקה": "PROB",
  "תהליכים אקראיים והסתברות": "PROB",
  "academic-probability-statistics": "PROB",
  "probability-statistics": "PROB",
  "prob-stats": "PROB",
  // Legacy catalog keys for probability (routing only — never shown as UI labels)
  "הסתברות וסטטיסטיקה מ": "PROB",
  "הסתברות וסטטיסטיקה מ (094412)": "PROB",
  "הסתברות (094412)": "PROB",
  "הסתברות וסטטיסטיקה מתמטית": "PROB",
  "סטטיסטיקה להנדסה": "PROB",
  "סטטיסטיקה להנדסה (094424)": "PROB",
  "094412": "PROB",
  "094424": "PROB",
  "104034": "PROB",
  "044201": "PROB",
  // —— Ordinary Differential Equations (clean UI label only) ——
  "משוואות דיפרנציאליות רגילות": "ODE",
  "משוואות דיפרנציאליות": "ODE",
  "מד״ר": "ODE",
  'מד"ר': "ODE",
  "academic-ordinary-differential-equations": "ODE",
  "ordinary-differential-equations": "ODE",
  "ode": "ODE",
  // Legacy catalog keys for ODE (routing only — never shown as UI labels)
  "משוואות דיפרנציאליות ת": "ODE",
  "משוואות דיפרנציאליות ת (104035)": "ODE",
  "משוואות דיפרנציאליות רגילות להנדסה": "ODE",
  "משוואות דיפרנציאליות רגילות להנדסה (104035)": "ODE",
  "משוואות דיפרנציאליות ואופטימיזציה": "ODE",
  "104035": "ODE",
  // —— PDE & Fourier (clean UI label only) ——
  "משוואות דיפרנציאליות חלקיות וטורי פורייה": "PDE",
  "משוואות דיפרנציאליות חלקיות": "PDE",
  "טורי פורייה": "PDE",
  "מד״ח": "PDE",
  'מד"ח': "PDE",
  "academic-pde-fourier": "PDE",
  "pde-fourier": "PDE",
  "pde": "PDE",
  // —— Electric / Linear Circuits ——
  "תורת המעגלים": "CIRCUITS",
  "תורת המעגלים החשמליים": "CIRCUITS",
  "מעגלים ליניאריים": "CIRCUITS",
  "academic-circuits": "CIRCUITS",
  "circuits": "CIRCUITS",
  "electric-circuits": "CIRCUITS",
  // Legacy catalog keys for circuits (routing only)
  "מבוא להנדסת חשמל ומעגלים (044101)": "CIRCUITS",
  "מבוא להנדסת חשמל ומעגלים": "CIRCUITS",
  "044101": "CIRCUITS",
  // —— Signals & Systems (clean UI label only) ——
  "אותות ומערכות": "SIGNALS_SYSTEMS",
  "academic-signals-systems": "SIGNALS_SYSTEMS",
  "signals-systems": "SIGNALS_SYSTEMS",
  "signals-and-systems": "SIGNALS_SYSTEMS",
  // Legacy catalog keys for signals (routing only)
  "אותות ומערכות (044131)": "SIGNALS_SYSTEMS",
  "044131": "SIGNALS_SYSTEMS",
  // DSP electives route to the signals & systems diagnostic bank
  "עיבוד אותות ספרתי - DSP (044198)": "SIGNALS_SYSTEMS",
  "עיבוד אותות ספרתי": "SIGNALS_SYSTEMS",
  "עיבוד אותות ספרתי - DSP": "SIGNALS_SYSTEMS",
  DSP: "SIGNALS_SYSTEMS",
  "044198": "SIGNALS_SYSTEMS",
  // Microwaves / electro-optics electives → electromagnetics bank
  "מיקרוגלים ואופטיקה (044167)": "ELECTROMAGNETICS",
  "מיקרוגלים ואופטיקה": "ELECTROMAGNETICS",
  "044167": "ELECTROMAGNETICS",
  "אלקטרואופטיקה ולייזרים (044191)": "ELECTROMAGNETICS",
  "אלקטרואופטיקה ולייזרים": "ELECTROMAGNETICS",
  "044191": "ELECTROMAGNETICS",
  // —— Complex functions & integral transforms (clean UI label only) ——
  "פונקציות מרוכבות והתמרות אינטגרליות": "COMPLEX_FUNCTIONS",
  "פונקציות מרוכבות": "COMPLEX_FUNCTIONS",
  "התמרות אינטגרליות": "COMPLEX_FUNCTIONS",
  "academic-complex-functions": "COMPLEX_FUNCTIONS",
  "complex-functions": "COMPLEX_FUNCTIONS",
  // Legacy catalog keys for complex functions (routing only)
  "פונקציות מרוכבות והתמרות אינטגרליות (104214)": "COMPLEX_FUNCTIONS",
  "104214": "COMPLEX_FUNCTIONS",
  // —— Digital communications (clean UI label; not computer networks) ——
  "תקשורת ספרתית": "DIGITAL_COMMUNICATIONS",
  "academic-digital-communications": "DIGITAL_COMMUNICATIONS",
  "digital-communications": "DIGITAL_COMMUNICATIONS",
  // Legacy catalog keys for digital communications (routing only)
  "תקשורת ספרתית (044149)": "DIGITAL_COMMUNICATIONS",
  "044149": "DIGITAL_COMMUNICATIONS",
  // —— Computer Architecture (clean UI label only) ——
  "מבנה מחשבים וארכיטקטורה": "COMPUTER_ARCHITECTURE",
  "מבנה מחשבים": "COMPUTER_ARCHITECTURE",
  "ארכיטקטורת מחשבים": "COMPUTER_ARCHITECTURE",
  "academic-computer-architecture": "COMPUTER_ARCHITECTURE",
  "computer-architecture": "COMPUTER_ARCHITECTURE",
  "architecture": "COMPUTER_ARCHITECTURE",
  // Legacy catalog keys for architecture (routing only)
  "מערכות ספרתיות ומבנה מחשבים (234145)": "COMPUTER_ARCHITECTURE",
  "מערכות ספרתיות ומבנה מחשבים": "COMPUTER_ARCHITECTURE",
  "מבנה מחשבים מתקדם וארכיטקטורה (044252)": "COMPUTER_ARCHITECTURE",
  "מבנה מחשבים מתקדם וארכיטקטורה": "COMPUTER_ARCHITECTURE",
  "234145": "COMPUTER_ARCHITECTURE",
  "044252": "COMPUTER_ARCHITECTURE",
  // —— Statics & Strength of Materials (clean UI label only) ——
  "סטטיקה וחוזק חומרים": "MECHANICS_MATERIALS",
  "סטטיקה": "MECHANICS_MATERIALS",
  "חוזק חומרים": "MECHANICS_MATERIALS",
  "academic-mechanics-materials": "MECHANICS_MATERIALS",
  "mechanics-materials": "MECHANICS_MATERIALS",
  "statics-strength": "MECHANICS_MATERIALS",
  // Legacy catalog keys for mechanics/materials (routing only)
  "סטטיקה של גוף קשיח": "MECHANICS_MATERIALS",
  "סטטיקה של גוף קשיח (034013)": "MECHANICS_MATERIALS",
  "חוזק חומרים 1": "MECHANICS_MATERIALS",
  "חוזק חומרים 1 (034015)": "MECHANICS_MATERIALS",
  "חוזק חומרים 2": "MECHANICS_MATERIALS",
  "חוזק חומרים 2 (034016)": "MECHANICS_MATERIALS",
  "034013": "MECHANICS_MATERIALS",
  "034015": "MECHANICS_MATERIALS",
  "034016": "MECHANICS_MATERIALS",
  // —— Structural statics (clean UI label; distinct from rigid-body statics) ——
  "סטטיקה של מבנים": "STRUCTURAL_STATICS",
  "אנליזת מבנים": "STRUCTURAL_STATICS",
  "academic-structural-statics": "STRUCTURAL_STATICS",
  "structural-statics": "STRUCTURAL_STATICS",
  // —— Digital systems & logic design (clean UI label; not computer architecture) ——
  "מערכות ספרתיות ותכן לוגי": "DIGITAL_LOGIC",
  "תכן לוגי": "DIGITAL_LOGIC",
  "לוגיקה ספרתית": "DIGITAL_LOGIC",
  "academic-digital-logic": "DIGITAL_LOGIC",
  // —— Distributed systems & cloud computing (clean UI label only) ——
  "מערכות מבוזרות ומחשוב ענן": "DISTRIBUTED_SYSTEMS",
  "מערכות מבוזרות": "DISTRIBUTED_SYSTEMS",
  "מחשוב ענן": "DISTRIBUTED_SYSTEMS",
  "academic-distributed-systems": "DISTRIBUTED_SYSTEMS",
  "distributed-systems": "DISTRIBUTED_SYSTEMS",
  // Legacy catalog keys for cloud architecture (routing only — never shown as UI labels)
  "ארכיטקטורת ענן ו-Enterprise Systems (094224)": "DISTRIBUTED_SYSTEMS",
  "ארכיטקטורת ענן ו-Enterprise Systems": "DISTRIBUTED_SYSTEMS",
  "ארכיטקטורת ענן": "DISTRIBUTED_SYSTEMS",
  "094224": "DISTRIBUTED_SYSTEMS",
  // —— Computer vision & image processing (clean UI label only) ——
  "ראייה ממוחשבת ועיבוד תמונה": "COMPUTER_VISION",
  "ראייה ממוחשבת": "COMPUTER_VISION",
  "עיבוד תמונה": "COMPUTER_VISION",
  "academic-computer-vision": "COMPUTER_VISION",
  "computer-vision": "COMPUTER_VISION",
  // Legacy catalog label — routing only, never shown as a UI label
  "ראייה ממוחשבת (Computer Vision)": "COMPUTER_VISION",
  "digital-logic": "DIGITAL_LOGIC",
  // —— Operations Research / Linear Optimization (clean UI label only) ——
  "חקר ביצועים": "OPERATIONS_RESEARCH",
  "חקר ביצועים ואופטימיזציה ליניארית": "OPERATIONS_RESEARCH",
  "אופטימיזציה ליניארית": "OPERATIONS_RESEARCH",
  "academic-operations-research": "OPERATIONS_RESEARCH",
  "operations-research": "OPERATIONS_RESEARCH",
  "or": "OPERATIONS_RESEARCH",
  // Legacy catalog keys for OR1 (routing only — OR2 is the stochastic bank)
  "חקר ביצועים 1 - תכנות לינארי": "OPERATIONS_RESEARCH",
  "חקר ביצועים 1 - תכנות לינארי (094313)": "OPERATIONS_RESEARCH",
  "חקר ביצועים 1": "OPERATIONS_RESEARCH",
  "094313": "OPERATIONS_RESEARCH",
  // —— Kinematics & Dynamics of Bodies and Mechanisms (clean UI label only) ——
  "קינמטיקה ודינמיקה של גופים ומנגנונים": "KINEMATICS_DYNAMICS",
  "קינמטיקה ודינמיקה": "KINEMATICS_DYNAMICS",
  "academic-kinematics-dynamics": "KINEMATICS_DYNAMICS",
  "kinematics-dynamics": "KINEMATICS_DYNAMICS",
  // Legacy catalog keys for dynamics (routing only — never shown as UI labels)
  "דינמיקה": "KINEMATICS_DYNAMICS",
  "דינמיקה (034014)": "KINEMATICS_DYNAMICS",
  "034014": "KINEMATICS_DYNAMICS",
  // —— Operations Research 2 / Stochastic Models & Queueing (clean UI label only) ——
  "חקר ביצועים 2 (מודלים סטוכסטיים ותורת התורים)": "STOCHASTIC_MODELS",
  "מודלים סטוכסטיים ותורת התורים": "STOCHASTIC_MODELS",
  "תורת התורים": "STOCHASTIC_MODELS",
  "academic-stochastic-models": "STOCHASTIC_MODELS",
  "stochastic-models": "STOCHASTIC_MODELS",
  // Legacy catalog keys for OR2 (routing only — never collapse into linear programming)
  "חקר ביצועים 2 - מודלים סטוכסטיים": "STOCHASTIC_MODELS",
  "חקר ביצועים 2 - מודלים סטוכסטיים (094314)": "STOCHASTIC_MODELS",
  "חקר ביצועים 2": "STOCHASTIC_MODELS",
  "094314": "STOCHASTIC_MODELS",
  // —— Machine Design (clean UI label only) ——
  "תכן מכני": "MACHINE_DESIGN",
  "academic-machine-design": "MACHINE_DESIGN",
  "machine-design": "MACHINE_DESIGN",
  // Legacy catalog keys for machine design (routing only — never shown as UI labels)
  "תכן איברים מכניים ומערכות": "MACHINE_DESIGN",
  "תכן איברים מכניים ומערכות (034039)": "MACHINE_DESIGN",
  "034039": "MACHINE_DESIGN",
  // —— Production Planning & Control (clean UI label only) ——
  "תכנון ופיקוח הייצור (תפ״י)": "PRODUCTION_PLANNING",
  "תכנון ופיקוח הייצור": "PRODUCTION_PLANNING",
  "תפ״י": "PRODUCTION_PLANNING",
  'תפ"י': "PRODUCTION_PLANNING",
  "academic-production-planning": "PRODUCTION_PLANNING",
  "production-planning": "PRODUCTION_PLANNING",
  // Legacy catalog keys for PPC (routing only)
  "ניהול ייצור ותפעול": "PRODUCTION_PLANNING",
  "ניהול ייצור ותפעול (094501)": "PRODUCTION_PLANNING",
  "094501": "PRODUCTION_PLANNING",
  // —— Continuous & Nonlinear Optimization (clean UI label only) ——
  "אופטימיזציה רציפה ולא-ליניארית": "NONLINEAR_OPTIMIZATION",
  "אופטימיזציה לא-ליניארית": "NONLINEAR_OPTIMIZATION",
  "אופטימיזציה לא ליניארית": "NONLINEAR_OPTIMIZATION",
  "academic-nonlinear-optimization": "NONLINEAR_OPTIMIZATION",
  "nonlinear-optimization": "NONLINEAR_OPTIMIZATION",
  // Legacy catalog keys for nonlinear optimization (routing only — never shown)
  "אופטימיזציה לא לינארית": "NONLINEAR_OPTIMIZATION",
  // —— Big Data Analytics (clean UI label only) ——
  "אלגוריתמים לנתוני עתק (Big Data)": "BIG_DATA_ANALYTICS",
  "אלגוריתמים לנתוני עתק": "BIG_DATA_ANALYTICS",
  "academic-big-data": "BIG_DATA_ANALYTICS",
  "big-data-analytics": "BIG_DATA_ANALYTICS",
  "big-data": "BIG_DATA_ANALYTICS",
  // Legacy catalog keys for big data (routing only — never shown as UI labels)
  "כריית נתונים ו-Big Data Analytics": "BIG_DATA_ANALYTICS",
  "כריית נתונים ו-Big Data Analytics (096225)": "BIG_DATA_ANALYTICS",
  "096225": "BIG_DATA_ANALYTICS",
  // —— Advanced Machine Learning (clean UI label only) ——
  "למידת מכונה מתקדמת": "ADVANCED_MACHINE_LEARNING",
  "academic-advanced-ml": "ADVANCED_MACHINE_LEARNING",
  "advanced-machine-learning": "ADVANCED_MACHINE_LEARNING",
  "advanced-ml": "ADVANCED_MACHINE_LEARNING",
  // —— Data & Text Mining (clean UI label only) ——
  "כריית נתונים וטקסט": "DATA_TEXT_MINING",
  "academic-data-text-mining": "DATA_TEXT_MINING",
  "data-text-mining": "DATA_TEXT_MINING",
  // —— Advanced databases & NoSQL (clean UI label only; before basic SQL) ——
  "בסיסי נתונים מתקדמים ומערכות NoSQL": "ADVANCED_DATABASES_NOSQL",
  "בסיסי נתונים מתקדמים": "ADVANCED_DATABASES_NOSQL",
  "academic-advanced-databases": "ADVANCED_DATABASES_NOSQL",
  "advanced-databases-nosql": "ADVANCED_DATABASES_NOSQL",
  "advanced-databases": "ADVANCED_DATABASES_NOSQL",
  // —— Systems analysis & information-systems architecture (clean UI label) ——
  "ניתוח, תכן וארכיטקטורת מערכות מידע": "SYSTEMS_ANALYSIS_ARCHITECTURE",
  "ניתוח תכן וארכיטקטורת מערכות מידע": "SYSTEMS_ANALYSIS_ARCHITECTURE",
  "academic-systems-analysis": "SYSTEMS_ANALYSIS_ARCHITECTURE",
  "systems-analysis-architecture": "SYSTEMS_ANALYSIS_ARCHITECTURE",
  "systems-analysis": "SYSTEMS_ANALYSIS_ARCHITECTURE",
  // Legacy catalog label — routing only, never shown as a UI label
  "ניתוח ועיצוב מערכות מידע (096211)": "SYSTEMS_ANALYSIS_ARCHITECTURE",
  "ניתוח ועיצוב מערכות מידע": "SYSTEMS_ANALYSIS_ARCHITECTURE",
  // —— Simulation of manufacturing & service systems (clean UI label) ——
  "סימולציה של מערכות ייצור ושירות": "SIMULATION_SYSTEMS",
  "סימולציה של מערכות": "SIMULATION_SYSTEMS",
  "academic-simulation-systems": "SIMULATION_SYSTEMS",
  "simulation-systems": "SIMULATION_SYSTEMS",
  // Legacy catalog keys for simulation (routing only — never shown as UI labels)
  "סימולציה של מערכות תפעול (094114)": "SIMULATION_SYSTEMS",
  "סימולציה של מערכות תפעול": "SIMULATION_SYSTEMS",
  "094114": "SIMULATION_SYSTEMS",
  // —— Requirements engineering & UI/UX (clean UI label) ——
  "הנדסת דרישות וממשקי משתמש (UI/UX)": "UI_UX_ENGINEERING",
  "הנדסת דרישות וממשקי משתמש": "UI_UX_ENGINEERING",
  "הנדסת דרישות וממשקי אדם-מחשב": "UI_UX_ENGINEERING",
  "academic-ui-ux-engineering": "UI_UX_ENGINEERING",
  "ui-ux-engineering": "UI_UX_ENGINEERING",
  // Legacy catalog keys for HCI (routing only — never shown as UI labels)
  "אינטראקציית אדם-מחשב - HCI (236370)": "UI_UX_ENGINEERING",
  "אינטראקציית אדם-מחשב": "UI_UX_ENGINEERING",
  "236370": "UI_UX_ENGINEERING",
  // —— Engineering economy & cost analysis (clean UI label only) ——
  "תמחור ובקרת עלויות הנדסית": "ENGINEERING_ECONOMY",
  "תמחור וכלכלת הנדסה": "ENGINEERING_ECONOMY",
  "כלכלת הנדסה": "ENGINEERING_ECONOMY",
  "academic-engineering-economy": "ENGINEERING_ECONOMY",
  "engineering-economy": "ENGINEERING_ECONOMY",
  // Legacy catalog keys for engineering economy (routing only — never shown)
  "כלכלת הנדסה ומימון": "ENGINEERING_ECONOMY",
  "כלכלת הנדסה ומימון (094511)": "ENGINEERING_ECONOMY",
  "094511": "ENGINEERING_ECONOMY",
  // —— Quality engineering & Six Sigma (clean UI label only) ——
  "ניהול איכות ושיטות שש-סיגמא": "QUALITY_ENGINEERING",
  "ניהול איכות ושש-סיגמא": "QUALITY_ENGINEERING",
  "הנדסת איכות ושש-סיגמא": "QUALITY_ENGINEERING",
  "academic-quality-engineering": "QUALITY_ENGINEERING",
  "quality-engineering": "QUALITY_ENGINEERING",
  // Legacy catalog keys for quality / Six Sigma (routing only — never shown)
  "הנדסת איכות ו-Six Sigma": "QUALITY_ENGINEERING",
  "הנדסת איכות ו-Six Sigma (094142)": "QUALITY_ENGINEERING",
  "הנדסת איכות": "QUALITY_ENGINEERING",
  "094142": "QUALITY_ENGINEERING",
  // —— Methods engineering & ergonomics (clean UI label only) ——
  "הנדסת שיטות וארגונומיה": "METHODS_ERGONOMICS",
  "הנדסת שיטות": "METHODS_ERGONOMICS",
  "ארגונומיה": "METHODS_ERGONOMICS",
  "academic-methods-ergonomics": "METHODS_ERGONOMICS",
  "methods-engineering-ergonomics": "METHODS_ERGONOMICS",
  "methods-ergonomics": "METHODS_ERGONOMICS",
  // Legacy catalog keys for methods / work measurement (routing only — never shown)
  "הנדסת שיטות ומדידת עבודה": "METHODS_ERGONOMICS",
  "הנדסת שיטות ומדידת עבודה (094120)": "METHODS_ERGONOMICS",
  "094120": "METHODS_ERGONOMICS",
  // —— Databases / SQL (clean UI label only) ——
  "בסיסי נתונים": "DATABASES",
  "academic-databases": "DATABASES",
  databases: "DATABASES",
  "database-systems": "DATABASES",
  // Legacy catalog keys for databases (routing only)
  "בסיסי נתונים - Database Systems (236363)": "DATABASES",
  "בסיסי נתונים - Database Systems": "DATABASES",
  "בסיסי נתונים ומערכות מידע (094220)": "DATABASES",
  "בסיסי נתונים ומערכות מידע": "DATABASES",
  "בסיסי נתונים ו-SQL למדעי הנתונים": "DATABASES",
  "236363": "DATABASES",
  "094220": "DATABASES",
  // —— Computer Networks (clean UI label only) ——
  "רשתות תקשורת מחשבים": "NETWORKS",
  "רשתות תקשורת": "NETWORKS",
  "academic-computer-networks": "NETWORKS",
  "computer-networks": "NETWORKS",
  networks: "NETWORKS",
  // Legacy catalog keys for networks (routing only)
  "מבוא לרשתות תקשורת מחשבים (236334)": "NETWORKS",
  "מבוא לרשתות תקשורת מחשבים": "NETWORKS",
  "236334": "NETWORKS",
  // —— Applied regression / statistical models (clean UI label only) ——
  "מודלים סטטיסטיים ורגרסיה ליניארית ומיושמת": "APPLIED_REGRESSION",
  "מודלים סטטיסטיים ורגרסיה מיושמת": "APPLIED_REGRESSION",
  "רגרסיה ליניארית ומודלים סטטיסטיים": "APPLIED_REGRESSION",
  "academic-applied-regression": "APPLIED_REGRESSION",
  "applied-regression": "APPLIED_REGRESSION",
  // Legacy catalog labels for applied regression (routing only — never shown)
  "הסקה סטטיסטית ומודלים לינאריים": "APPLIED_REGRESSION",
  // —— Deep Learning (clean UI label only) ——
  "למידה עמוקה": "DEEP_LEARNING",
  "academic-deep-learning": "DEEP_LEARNING",
  "deep-learning": "DEEP_LEARNING",
  // Legacy catalog labels for deep learning (routing only — never shown)
  "למידה עמוקה (Deep Learning & Neural Networks)": "DEEP_LEARNING",
  "למידה עמוקה (Deep Learning)": "DEEP_LEARNING",
  // —— Introduction to Machine Learning (clean UI label only) ——
  "מבוא ללמידת מכונה": "MACHINE_LEARNING",
  "למידת מכונה": "MACHINE_LEARNING",
  "academic-machine-learning": "MACHINE_LEARNING",
  "machine-learning": "MACHINE_LEARNING",
  ml: "MACHINE_LEARNING",
  // Legacy catalog keys for ML (routing only)
  "למידת מכונה - Machine Learning (236756)": "MACHINE_LEARNING",
  "למידת מכונה - Machine Learning": "MACHINE_LEARNING",
  "למידת מכונה (Machine Learning)": "MACHINE_LEARNING",
  "236756": "MACHINE_LEARNING",
  // —— Control Theory & Linear Systems (clean UI label only) ——
  "תורת הבקרה ומערכות ליניאריות": "CONTROL_THEORY",
  "תורת הבקרה": "CONTROL_THEORY",
  "academic-control-theory": "CONTROL_THEORY",
  "control-theory": "CONTROL_THEORY",
  // Legacy catalog keys for control theory (routing only)
  "תורת הבקרה (044148)": "CONTROL_THEORY",
  "044148": "CONTROL_THEORY",
  // —— OOP / Advanced Programming (clean UI label only) ——
  "תכנות מונחה עצמים ומתקדם": "OOP_ADVANCED",
  "תכנות מונחה עצמים": "OOP_ADVANCED",
  "academic-oop": "OOP_ADVANCED",
  oop: "OOP_ADVANCED",
  // Legacy catalog keys for OOP (routing only)
  "תכנות מונחה עצמים (234129)": "OOP_ADVANCED",
  "234129": "OOP_ADVANCED",
  // —— Engineering Thermodynamics (clean UI label only) ——
  "תרמודינמיקה הנדסית": "THERMODYNAMICS",
  תרמודינמיקה: "THERMODYNAMICS",
  "academic-thermodynamics": "THERMODYNAMICS",
  thermodynamics: "THERMODYNAMICS",
  // Legacy catalog keys for thermodynamics (routing only)
  "תרמודינמיקה הנדסית 1 (034028)": "THERMODYNAMICS",
  "תרמודינמיקה הנדסית 1": "THERMODYNAMICS",
  "034028": "THERMODYNAMICS",
  // —— Semiconductor Devices (clean UI label only) ——
  "התקני מוליכים למחצה": "SEMICONDUCTORS",
  "מוליכים למחצה": "SEMICONDUCTORS",
  "פיזיקת מצב מוצק": "SEMICONDUCTORS",
  "academic-semiconductors": "SEMICONDUCTORS",
  semiconductors: "SEMICONDUCTORS",
  // Legacy catalog keys for semiconductors (routing only)
  "התקני מוליכים למחצה ומל״מ (044125)": "SEMICONDUCTORS",
  "התקני מוליכים למחצה ומל״מ": "SEMICONDUCTORS",
  "044125": "SEMICONDUCTORS",
  // —— Fluid Mechanics (clean UI label only) ——
  "מכניקת זורמים": "FLUID_MECHANICS",
  "academic-fluid-mechanics": "FLUID_MECHANICS",
  "fluid-mechanics": "FLUID_MECHANICS",
  // Legacy catalog keys for fluid mechanics (routing only)
  "מכניקת זורמים 1 (034033)": "FLUID_MECHANICS",
  "מכניקת זורמים 1": "FLUID_MECHANICS",
  "034033": "FLUID_MECHANICS",
  // —— Compilers & Programming Languages (clean UI label only) ——
  "קומפילציה ושפות תכנות": "COMPILERS",
  קומפילציה: "COMPILERS",
  "academic-compilers": "COMPILERS",
  compilers: "COMPILERS",
  // Legacy catalog keys for compilers (routing only)
  "תכנון שפות תכנות וקומפילציה (236703)": "COMPILERS",
  "תכנון שפות תכנות וקומפילציה": "COMPILERS",
  "תכנון שפות תכנות (236703)": "COMPILERS",
  "תכנון שפות תכנות": "COMPILERS",
  "236703": "COMPILERS",
  // —— Waves & Electromagnetics (clean UI label only) ——
  "גלים ושדות אלקטרומגנטיים": "ELECTROMAGNETICS",
  "שדות אלקטרומגנטיים": "ELECTROMAGNETICS",
  "academic-electromagnetics": "ELECTROMAGNETICS",
  electromagnetics: "ELECTROMAGNETICS",
  // Legacy catalog keys for electromagnetics (routing only)
  "שדות אלקטרומגנטיים (044140)": "ELECTROMAGNETICS",
  "044140": "ELECTROMAGNETICS",
  // —— Information Security & Cryptography (clean UI label only) ——
  "אבטחת מידע וקריפטוגרפיה": "INFORMATION_SECURITY",
  "אבטחת מידע": "INFORMATION_SECURITY",
  "academic-information-security": "INFORMATION_SECURITY",
  "information-security": "INFORMATION_SECURITY",
  // Legacy catalog keys for information security (routing only)
  "אבטחת מחשבים וקריפטוגרפיה (236350)": "INFORMATION_SECURITY",
  "אבטחת מחשבים וקריפטוגרפיה": "INFORMATION_SECURITY",
  "אבטחת מידע וסייבר (236350)": "INFORMATION_SECURITY",
  "אבטחת מידע וסייבר": "INFORMATION_SECURITY",
  "236350": "INFORMATION_SECURITY",
  // —— IS security & risk management (clean UI label; distinct from cryptography) ——
  "אבטחת מערכות מידע וניהול סיכונים": "IS_SECURITY_RISK",
  "אבטחת מערכות מידע": "IS_SECURITY_RISK",
  "ניהול סיכוני סייבר": "IS_SECURITY_RISK",
  "academic-is-security-risk": "IS_SECURITY_RISK",
  "is-security-risk": "IS_SECURITY_RISK",
  "is-security-risk-management": "IS_SECURITY_RISK",
  // —— Analog & Digital Electronic Circuits (clean UI label only) ——
  "מעגלים אלקטרוניים אנלוגיים וספרתיים": "ELECTRONIC_CIRCUITS",
  "מעגלים אלקטרוניים": "ELECTRONIC_CIRCUITS",
  "academic-electronic-circuits": "ELECTRONIC_CIRCUITS",
  "electronic-circuits": "ELECTRONIC_CIRCUITS",
  // Legacy catalog keys for electronic circuits (routing only — never shown as UI labels)
  "מעגלים אלקטרוניים ספרתיים (044202)": "ELECTRONIC_CIRCUITS",
  "מעגלים אלקטרוניים ספרתיים": "ELECTRONIC_CIRCUITS",
  "מעגלים אלקטרוניים תקביליים / לינאריים (044137)": "ELECTRONIC_CIRCUITS",
  "מעגלים אלקטרוניים תקביליים / לינאריים": "ELECTRONIC_CIRCUITS",
  "מעגלים אלקטרוניים תקביליים": "ELECTRONIC_CIRCUITS",
  "044202": "ELECTRONIC_CIRCUITS",
  "044137": "ELECTRONIC_CIRCUITS",
  // —— Energy Conversion & Power Systems (clean UI label only) ——
  "המרת אנרגיה ומערכות הספק": "ENERGY_CONVERSION",
  "המרת אנרגיה": "ENERGY_CONVERSION",
  "מערכות הספק": "ENERGY_CONVERSION",
  "academic-energy-conversion": "ENERGY_CONVERSION",
  "energy-conversion": "ENERGY_CONVERSION",
  // Legacy catalog keys for energy conversion (routing only — never shown as UI labels)
  "המרת אנרגיה (044109)": "ENERGY_CONVERSION",
  "044109": "ENERGY_CONVERSION",
  // —— Heat and Mass Transfer (clean UI label only) ——
  "מעבר חום ומעבר מסה": "HEAT_MASS_TRANSFER",
  "מעבר חום": "HEAT_MASS_TRANSFER",
  "מעבר מסה": "HEAT_MASS_TRANSFER",
  "academic-heat-mass-transfer": "HEAT_MASS_TRANSFER",
  "heat-mass-transfer": "HEAT_MASS_TRANSFER",
  // Legacy catalog keys for heat transfer (routing only — never shown as UI labels)
  "מעבר חום (034035)": "HEAT_MASS_TRANSFER",
  "034035": "HEAT_MASS_TRANSFER",
  // —— General Chemistry ——
  "כימיה כללית": "GENERAL_CHEMISTRY",
  "כימיה כללית (125001)": "GENERAL_CHEMISTRY",
  "academic-general-chemistry": "GENERAL_CHEMISTRY",
  "general-chemistry": "GENERAL_CHEMISTRY",
  "125001": "GENERAL_CHEMISTRY",
  // —— CAD / Computer-Aided Design ——
  "גרפיקה הנדסית ותכן בעזרת מחשב": "CAD",
  "גרפיקה הנדסית ותכן בעזרת מחשב - CAD (034032)": "CAD",
  "תכן בעזרת מחשב (CAD)": "CAD",
  "תכן בעזרת מחשב": "CAD",
  "academic-cad": "CAD",
  "cad-mechanical-design": "CAD",
  "034032": "CAD",
  // —— Materials Science ——
  "תורת החומרים": "MATERIALS_SCIENCE",
  "תורת החומרים (034005)": "MATERIALS_SCIENCE",
  "academic-materials-science": "MATERIALS_SCIENCE",
  "materials-science": "MATERIALS_SCIENCE",
  "034005": "MATERIALS_SCIENCE",
  // —— Mechanical Vibrations ——
  "תורת התנודות והרעידות": "MECHANICAL_VIBRATIONS",
  "תנודות ורעידות": "MECHANICAL_VIBRATIONS",
  "תורת התנודות והרעידות (034029)": "MECHANICAL_VIBRATIONS",
  "academic-mechanical-vibrations": "MECHANICAL_VIBRATIONS",
  "mechanical-vibrations": "MECHANICAL_VIBRATIONS",
  "034029": "MECHANICAL_VIBRATIONS",
  // —— Finite Element Method ——
  "אלמנטים סופיים - FEM": "FEM",
  "אלמנטים סופיים": "FEM",
  "שיטת האלמנטים הסופיים (FEM)": "FEM",
  "אלמנטים סופיים - FEM (034038)": "FEM",
  "academic-fem": "FEM",
  "finite-element-method": "FEM",
  "034038": "FEM",
  // —— Digital Control & Robotics ——
  "בקרה ספרתית ורובוטיקה": "DIGITAL_CONTROL_ROBOTICS",
  "בקרה ספרתית ורובוטיקה (034042)": "DIGITAL_CONTROL_ROBOTICS",
  "academic-digital-control-robotics": "DIGITAL_CONTROL_ROBOTICS",
  "digital-control-robotics": "DIGITAL_CONTROL_ROBOTICS",
  "034042": "DIGITAL_CONTROL_ROBOTICS",
  // —— Python Programming (IE) ——
  "עקרונות תכנות ופייתון": "PYTHON",
  "מבוא לתכנות בפייתון": "PYTHON",
  "עקרונות תכנות ופייתון (094219)": "PYTHON",
  "academic-python": "PYTHON",
  "python-programming": "PYTHON",
  "094219": "PYTHON",
  // —— Organization Theory ——
  "תורת הארגון והתנהגות ארגונית": "ORGANIZATION_THEORY",
  "תורת הארגון והניהול": "ORGANIZATION_THEORY",
  "תורת הארגון והתנהגות ארגונית (094115)": "ORGANIZATION_THEORY",
  "academic-organization-theory": "ORGANIZATION_THEORY",
  "organization-theory": "ORGANIZATION_THEORY",
  "094115": "ORGANIZATION_THEORY",
  // —— Supply Chain ——
  "שרשרת אספקה ולוגיסטיקה": "SUPPLY_CHAIN",
  "ניהול שרשרת אספקה": "SUPPLY_CHAIN",
  "שרשרת אספקה ולוגיסטיקה (094503)": "SUPPLY_CHAIN",
  "academic-supply-chain": "SUPPLY_CHAIN",
  "supply-chain-management": "SUPPLY_CHAIN",
  "094503": "SUPPLY_CHAIN",
  // —— Game Theory ——
  "תורת המשחקים ומודלים כלכליים": "GAME_THEORY",
  "תורת המשחקים": "GAME_THEORY",
  "תורת המשחקים ומודלים כלכליים (094320)": "GAME_THEORY",
  "academic-game-theory": "GAME_THEORY",
  "game-theory": "GAME_THEORY",
  "094320": "GAME_THEORY",
  // —— Plant Layout ——
  "תכנון מערכי מפעל ומתקנים": "PLANT_LAYOUT",
  "תכנון מערכי מפעל וייצור": "PLANT_LAYOUT",
  "תכנון מערכי מפעל ומתקנים (094140)": "PLANT_LAYOUT",
  "academic-plant-layout": "PLANT_LAYOUT",
  "plant-layout-design": "PLANT_LAYOUT",
  "094140": "PLANT_LAYOUT",
  // —— Business Intelligence ——
  "בינה עסקית ומחסני נתונים (BI)": "BI",
  "בינה עסקית ו-BI": "BI",
  "בינה עסקית ו-BI (096210)": "BI",
  "academic-bi": "BI",
  "business-intelligence": "BI",
  "096210": "BI",
  // —— Intro Data Science ——
  "מבוא למדעי הנתונים ופייתון": "INTRO_DS",
  "academic-intro-ds": "INTRO_DS",
  "intro-data-science": "INTRO_DS",
  // —— NLP ——
  "עיבוד שפה טבעית (NLP)": "NLP",
  "עיבוד שפה טבעית": "NLP",
  "academic-nlp": "NLP",
  "nlp-language-processing": "NLP",
};

const BAGRUT_OTHER_SUBJECT_BANKS: Readonly<
  Record<string, DiagnosticQuestion[]>
> = {
  // cs / english / chemistry / biology / hebrew / civics / history / bible /
  // literature routed via dedicated samplers — not this map
};

function exactCodeLookup<T extends string>(
  map: Readonly<Record<string, T>>,
  code: string | null | undefined
): T | null {
  if (!code) return null;
  const trimmed = code.trim();
  if (!trimmed) return null;
  return map[trimmed] ?? map[trimmed.toUpperCase()] ?? null;
}

const MATH_EXAM_DISPATCH: Readonly<
  Record<MathExamKey, () => DiagnosticQuestion[]>
> = {
  "581": sampleMath5_1_OnboardingQuestions,
  "582": sampleMath5_2_OnboardingQuestions,
  "481": sampleBagrut481OnboardingQuestions,
  "482": sampleBagrut482OnboardingQuestions,
  ALL_5: sampleMath5AllOnboardingQuestions,
  ALL_4: () => {
    const from481 = sampleBagrut481OnboardingQuestions().slice(0, 2);
    const from482 = sampleBagrut482OnboardingQuestions().slice(0, 1);
    return shuffleQuestions([...from481, ...from482]).slice(0, 3);
  },
  ALL_3: sampleBagrut481OnboardingQuestions,
};

const PHYSICS_EXAM_DISPATCH: Readonly<
  Record<PhysicsExamKey, () => DiagnosticQuestion[]>
> = {
  ELECTRICITY: samplePhysicsElectricityOnboardingQuestions,
  MECHANICS: samplePhysicsMechanicsOnboardingQuestions,
  WAVES: samplePhysicsWavesOnboardingQuestions,
  // Lab has no dedicated bank yet — stay inside physics (waves scaffold), never math
  LAB: samplePhysicsWavesOnboardingQuestions,
  ALL: samplePhysicsAllOnboardingQuestions,
};

function sampleCs1OnboardingQuestions(): DiagnosticQuestion[] {
  return sampleFromBank(BAGRUT_CS_1_QUESTIONS, 3);
}

function sampleCs2OnboardingQuestions(): DiagnosticQuestion[] {
  return sampleFromBank(BAGRUT_CS_2_QUESTIONS, 3);
}

/**
 * Civics שאלון ראשון (34281): random 3 from BAGRUT_CIVICS_1_QUESTIONS, then shuffle.
 * Fail-safe: empty bank → [] (never leaks שאלון שני or other subjects).
 */
function sampleCivics1OnboardingQuestions(): DiagnosticQuestion[] {
  return sampleFromBank(BAGRUT_CIVICS_1_QUESTIONS, 3);
}

/**
 * History שאלון ראשון (22261): random 3 from BAGRUT_HISTORY_1_QUESTIONS, then shuffle.
 * Fail-safe: empty bank → [] (never leaks שאלון שני or other subjects).
 */
function sampleHistory1OnboardingQuestions(): DiagnosticQuestion[] {
  return sampleFromBank(BAGRUT_HISTORY_1_QUESTIONS, 3);
}

/**
 * History שאלון שני (22262): one from each cluster —
 * (חשמונאים / הורדוס / נציבים), (מרד גדול / יבנה), (בר כוכבא) —
 * then shuffle. Fail-safe: empty bank → [] (never leaks שאלון ראשון or other subjects).
 */
function sampleHistory2OnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "hist2-hasmonean-hellenization-duality",
      "hist2-herod-client-king-dilemma",
      "hist2-hasmonean-expansion-demography",
      "hist2-roman-procurators-oppression",
      "hist2-hasmonean-monarchy-high-priesthood-clash",
      "hist2-herod-rebuilding-temple-contradiction",
    ],
    [
      "hist2-great-revolt-destruction-trauma",
      "hist2-yavne-temple-to-book-transition",
      "hist2-leadership-transformation-pharisees-rise",
    ],
    [
      "hist2-bar-kokhba-messianic-controversy",
      "hist2-bar-kokhba-tactics-hiding-systems",
      "hist2-hadrian-decrees-aelia-capitolina",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_HISTORY_2_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_HISTORY_2_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => Boolean(q));
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_HISTORY_2_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Civics שאלון שני: one from each cluster —
 * (יחסי כנסת–ממשלה / גירעון דמוקרטי), (חוקה ומשטר), (עריקות / בחירות / אי-אמון) —
 * then shuffle. Fail-safe: empty bank → [] (never leaks שאלון ראשון or other subjects).
 */
function sampleCivics2OnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "civ2-executive-legislative-democratic-deficit",
      "civ2-separation-powers-cheerleaders-flaw",
      "civ2-legislation-private-bill-preliminary-reading",
    ],
    [
      "civ2-constitution-constitutional-moment",
      "civ2-constitution-thin-vs-full-constitution",
      "civ2-democracy-tyranny-majority-61",
      "civ2-judiciary-independence-selection-committee",
      "civ2-constitution-supremacy-entrenchment",
    ],
    [
      "civ2-elections-party-switching-calantherism",
      "civ2-knesset-factional-split-sanctions",
      "civ2-knesset-constructive-no-confidence",
      "civ2-elections-proportional-system-sovereignty",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_CIVICS_2_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_CIVICS_2_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => Boolean(q));
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_CIVICS_2_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Chemistry onboarding: random 3 from the full authentic bank, then shuffle.
 * Fail-safe: empty chemistry bank → [].
 */
function sampleChemistryOnboardingQuestions(): DiagnosticQuestion[] {
  return sampleFromBank(BAGRUT_CHEMISTRY_QUESTIONS, 3);
}

/**
 * Bible (תנ״ך) onboarding — single theoretical questionnaire:
 * one from each cluster — (סיפורי תורה/אבות/משה), (נבואה), (חוק/חוכמה) —
 * then shuffle the trio. Fail-safe: empty bank → [] (never leaks other subjects).
 */
function sampleBibleOnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "bible-avraham-ramban-faith",
      "bible-covenant-between-parts-egypt-punishment",
      "bible-joseph-goblet-search-suspense",
      "bible-rebekah-well-kindness-sherlo",
      "bible-moses-radiant-face-veil",
      "bible-golden-calf-aaron-delay-tactic",
    ],
    [
      "bible-jeremiah-almond-rod-vision",
      "bible-jeremiah-hananiah-true-prophet-iron-yoke",
      "bible-jeremiah-temple-sermon-shiloh",
    ],
    [
      "bible-blind-stumbling-block-fear-god",
      "bible-ten-commandments-do-not-covet-heart",
      "bible-ecclesiastes-nature-cycle-sorrow",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_BIBLE_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_BIBLE_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => Boolean(q));
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_BIBLE_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Literature (ספרות) onboarding — single theoretical questionnaire:
 * one from each cluster — (דרמה/טרגדיה או רומן), (סיפור קצר), (שירה) —
 * then shuffle the trio. Fail-safe: empty bank → [] (never leaks other subjects).
 */
function sampleLiteratureOnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    // דרמה / טרגדיה / רומן
    [
      "lit-drama-sophocles-antigone-conflict",
      "lit-drama-sophocles-oedipus-tiresias",
      "lit-novel-orwell-1984-solipsism",
      "lit-novel-orwell-1984-love-rebellion",
    ],
    // סיפור קצר / פרוזה
    [
      "lit-short-story-capote-christmas",
      "lit-short-story-keret-autocorrect",
    ],
    // שירה (ימי הביניים + עברית מודרנית)
    [
      "lit-medieval-gabirol-shchi-lael",
      "lit-poetry-bialik-levadi",
      "lit-poetry-goldberg-hayamim-guilt",
      "lit-poetry-alterman-nigun-wanderer",
      "lit-poetry-pagis-new-lover-gender-reversal",
      "lit-poetry-gouri-yerusha-binding-isaac",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_LITERATURE_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_LITERATURE_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => Boolean(q));
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_LITERATURE_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Hebrew שאלון ראשון: one from each cluster —
 * (מערכת הצורות), (תחביר וקשרים לוגיים), (שם המספר / חלקי דיבור) —
 * then shuffle. Fail-safe: empty bank → [].
 */
function sampleHebrew1OnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "heb-morph-roots-binyanim-identification",
      "heb-morph-noun-pattern-shatafet",
      "heb-morph-word-formation-blends-roots",
      "heb-morph-root-odd-one-out",
      "heb-morph-guttural-nla-nlh-roots",
      "heb-morph-homophones-mehu-machau",
    ],
    [
      "heb-syntax-subject-clauses",
      "heb-syntax-compound-sentence-conversion",
      "heb-syntax-modal-vs-existential-yesh",
      "heb-syntax-real-vs-unreal-condition",
    ],
    [
      "heb-grammar-number-rules-comprehensive",
      "heb-sem-part-of-speech-okvim",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_HEBREW_1_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_HEBREW_1_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => Boolean(q));
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_HEBREW_1_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * Hebrew שאלון שני: random 3 from comprehension / idioms / semantics bank.
 * Fail-safe: empty bank → [] (never leaks שאלון ראשון or other subjects).
 */
function sampleHebrew2OnboardingQuestions(): DiagnosticQuestion[] {
  return sampleFromBank(BAGRUT_HEBREW_2_QUESTIONS, 3);
}

/**
 * Biology onboarding: one question from each curriculum cluster —
 * (תא/ביוכימיה), (פיזיולוגיה/הומיאוסטזיס), (גנטיקה/מולקולרית/אקולוגיה) —
 * then shuffle the trio. Fail-safe: empty biology bank → [].
 */
function sampleBiologyOnboardingQuestions(): DiagnosticQuestion[] {
  const CLUSTERS: readonly (readonly string[])[] = [
    [
      "bio-cell-rbc-atp-glycolysis",
      "bio-biochem-enzyme-saturation-kinetics",
      "bio-cell-penicillin-osmosis-peptidoglycan",
      "bio-cell-osmosis-concentration-gradient",
    ],
    [
      "bio-phys-kidney-active-transport",
      "bio-phys-glucose-fasting-homeostasis",
      "bio-phys-renal-vessels-composition",
      "bio-phys-neuromuscular-synapse-toxins",
    ],
    [
      "bio-mol-mrna-vaccine-mechanism",
      "bio-evo-natural-selection-glucose-aversion",
      "bio-eco-bergmann-rule-sa-volume",
      "bio-gen-cdna-introns-bacteria-expression",
    ],
  ];
  const TARGET_TOTAL = 3;

  if (BAGRUT_BIOLOGY_QUESTIONS.length === 0) return [];

  const byId = new Map(
    BAGRUT_BIOLOGY_QUESTIONS.map((q) => [q.id, q] as const)
  );
  const selected: DiagnosticQuestion[] = [];

  for (const cluster of CLUSTERS) {
    const pool = cluster
      .map((id) => byId.get(id))
      .filter((q): q is DiagnosticQuestion => Boolean(q));
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_BIOLOGY_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

/**
 * English onboarding: mix VOCABULARY + RESTATEMENT (2 from one domain, 1 from the other).
 * Fail-safe: empty english bank → [].
 */
function sampleEnglishOnboardingQuestions(): DiagnosticQuestion[] {
  const TARGET_TOTAL = 3;
  if (BAGRUT_ENGLISH_QUESTIONS.length === 0) return [];

  const vocab = BAGRUT_ENGLISH_QUESTIONS.filter((q) => q.domain === "VOCABULARY");
  const restatement = BAGRUT_ENGLISH_QUESTIONS.filter(
    (q) => q.domain === "RESTATEMENT"
  );

  const vocabGetsTwo = Math.random() < 0.5;
  const primary = vocabGetsTwo ? vocab : restatement;
  const secondary = vocabGetsTwo ? restatement : vocab;

  const selected: DiagnosticQuestion[] = [
    ...sampleFromBank(primary, 2),
    ...sampleFromBank(secondary, 1),
  ];

  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const leftovers = BAGRUT_ENGLISH_QUESTIONS.filter(
      (q) => !selectedIds.has(q.id)
    );
    selected.push(...sampleFromBank(leftovers, TARGET_TOTAL - selected.length));
  }

  return shuffleQuestions(selected).slice(0, TARGET_TOTAL);
}

const CS_EXAM_DISPATCH: Readonly<
  Record<CsExamKey, () => DiagnosticQuestion[]>
> = {
  CS_1: sampleCs1OnboardingQuestions,
  CS_2: sampleCs2OnboardingQuestions,
};

const HEBREW_EXAM_DISPATCH: Readonly<
  Record<HebrewExamKey, () => DiagnosticQuestion[]>
> = {
  HEBREW_1: sampleHebrew1OnboardingQuestions,
  HEBREW_2: sampleHebrew2OnboardingQuestions,
};

const CIVICS_EXAM_DISPATCH: Readonly<
  Record<CivicsExamKey, () => DiagnosticQuestion[]>
> = {
  CIVICS_1: sampleCivics1OnboardingQuestions,
  CIVICS_2: sampleCivics2OnboardingQuestions,
};

const HISTORY_EXAM_DISPATCH: Readonly<
  Record<HistoryExamKey, () => DiagnosticQuestion[]>
> = {
  HISTORY_1: sampleHistory1OnboardingQuestions,
  HISTORY_2: sampleHistory2OnboardingQuestions,
};

function resolveMathExamKey(examCode: string | null | undefined): MathExamKey {
  return exactCodeLookup(MATH_EXAM_KEY_BY_CODE, examCode) ?? "581";
}

function resolvePhysicsExamKey(
  examCode: string | null | undefined
): PhysicsExamKey {
  return exactCodeLookup(PHYSICS_EXAM_KEY_BY_CODE, examCode) ?? "ELECTRICITY";
}

function resolveCsExamKey(examCode: string | null | undefined): CsExamKey {
  return exactCodeLookup(CS_EXAM_KEY_BY_CODE, examCode) ?? "CS_1";
}

function resolveHebrewExamKey(
  examCode: string | null | undefined
): HebrewExamKey {
  return exactCodeLookup(HEBREW_EXAM_KEY_BY_CODE, examCode) ?? "HEBREW_1";
}

function resolveCivicsExamKey(
  examCode: string | null | undefined
): CivicsExamKey {
  return exactCodeLookup(CIVICS_EXAM_KEY_BY_CODE, examCode) ?? "CIVICS_1";
}

function resolveHistoryExamKey(
  examCode: string | null | undefined
): HistoryExamKey {
  return exactCodeLookup(HISTORY_EXAM_KEY_BY_CODE, examCode) ?? "HISTORY_1";
}

/**
 * Resolve academic course → bank key.
 * Fail-closed: unknown / empty courseId → null (never default to another bank).
 */
export function resolveAcademicCourseKey(
  courseId: string | null | undefined
): AcademicCourseKey | null {
  const exact = exactCodeLookup(ACADEMIC_COURSE_KEY_BY_ID, courseId);
  if (exact) return exact;

  const c = (courseId || "").trim();
  if (!c) return null;

  // Subject-scoped catalog heuristics (academic branch only — never exam codes)
  if (
    c.includes("מתמטיקה בדידה") ||
    c.includes("מתמטיקה דיסקרטית") ||
    /academic-discrete-math/i.test(c) ||
    /discrete-math/i.test(c)
  ) {
    return "DISCRETE";
  }
  // Intro CS before generic "מדעי המחשב" / data-structures heuristic
  if (
    c.includes("מבוא למדעי המחשב") ||
    /academic-intro-cs/i.test(c) ||
    /^intro-cs/i.test(c) ||
    /\b234114\b/.test(c) ||
    /\b234117\b/.test(c)
  ) {
    return "INTRO_CS";
  }
  // Big Data before generic "אלגוריתמים" — "אלגוריתמים לנתוני עתק" ≠ אלגוריתמים 1
  if (
    /אלגוריתמים\s+לנתוני\s+עתק/.test(c) ||
    /נתוני\s+עתק/.test(c) ||
    /Big\s+Data\s+Analytics/i.test(c) ||
    /academic-big-data/i.test(c) ||
    /big-data-analytics/i.test(c) ||
    /^big-data$/i.test(c) ||
    /\b096225\b/.test(c)
  ) {
    return "BIG_DATA_ANALYTICS";
  }
  // Continuous / nonlinear optimization — before linear OR and before generic "אופטימיזציה"
  if (
    /אופטימיזציה\s+רציפה/.test(c) ||
    /אופטימיזציה\s+לא[-\s]?לינ/.test(c) ||
    /nonlinear-optimization/i.test(c) ||
    /academic-nonlinear-optimization/i.test(c)
  ) {
    return "NONLINEAR_OPTIMIZATION";
  }
  // Algorithms before data-structures — "אלגוריתמים" must not hit CS bank
  if (
    /תכנון\s+וניתוח\s+אלגוריתמים/.test(c) ||
    /אלגוריתמים/.test(c) ||
    /academic-algorithms/i.test(c) ||
    /^algorithms$/i.test(c) ||
    /\b236360\b/.test(c) ||
    /\b234247\b/.test(c)
  ) {
    return "ALGORITHMS";
  }
  // Operating systems
  if (
    /מערכות\s+הפעלה/.test(c) ||
    /academic-operating-systems/i.test(c) ||
    /operating-systems/i.test(c) ||
    /\b234123\b/.test(c)
  ) {
    return "OPERATING_SYSTEMS";
  }
  // Theory of computation & complexity — before automata ("אוטומט" / "מודלים חישוביים")
  if (
    /תורת\s+החישוב/.test(c) ||
    /theory[- ]of[- ]computation/i.test(c) ||
    /academic-theory-computation/i.test(c) ||
    /theory-computation/i.test(c)
  ) {
    return "THEORY_COMPUTATION_COMPLEXITY";
  }
  // Automata / computational models
  if (
    /מודלים\s+חישוביים/.test(c) ||
    /אוטומט/.test(c) ||
    /academic-automata/i.test(c) ||
    /^automata$/i.test(c) ||
    /computational-models/i.test(c) ||
    /\b236343\b/.test(c)
  ) {
    return "AUTOMATA";
  }
  // Analog & digital electronic circuits — before circuit-theory bank
  if (
    /מעגלים\s+אלקטרוניים/.test(c) ||
    /academic-electronic-circuits/i.test(c) ||
    /electronic-circuits/i.test(c) ||
    /\b044202\b/.test(c) ||
    /\b044137\b/.test(c)
  ) {
    return "ELECTRONIC_CIRCUITS";
  }
  // Electric / linear circuits (before generic physics heuristics)
  if (
    /תורת\s+המעגלים/.test(c) ||
    /מעגלים\s+ליניאר/.test(c) ||
    /מבוא\s+להנדסת\s+חשמל\s+ומעגלים/.test(c) ||
    /academic-circuits/i.test(c) ||
    /^circuits$/i.test(c) ||
    /electric-circuits/i.test(c) ||
    /\b044101\b/.test(c)
  ) {
    return "CIRCUITS";
  }
  if (
    c.includes("אלגברה לינארית") ||
    c.includes("אלגברה ליניארית") ||
    /\bלינארית\b/.test(c) ||
    /\bליניארית\b/.test(c) ||
    /אלגברה\s*2/.test(c)
  ) {
    if (
      /academic-linear-algebra-2/i.test(c) ||
      /linear-algebra-2/i.test(c) ||
      /לינ[יא]*רית\s*2/.test(c) ||
      /אלגברה\s*2/.test(c) ||
      /\b104038\b/.test(c)
    ) {
      return "LINALG2";
    }
    return "LINALG";
  }
  if (c.includes("מבני נתונים") || /cs-data-structures/i.test(c)) {
    return "CS";
  }
  if (c.includes("חדו") || c.includes("אינפי") || c.includes("חשבון דיפרנציאלי")) {
    // Prefer Calc 2 when the label explicitly marks a second course.
    if (
      /academic-calculus-2/i.test(c) ||
      /חדו״א\s*2/.test(c) ||
      /אינפי\s*2/.test(c) ||
      /חשבון דיפרנציאלי\s*2/.test(c) ||
      /\b104022\b/.test(c) ||
      /\b104013\b/.test(c)
    ) {
      return "CALC2";
    }
    return "CALC";
  }
  // Academic Physics 2 — E&M before Physics 1 heuristics
  if (
    /פיזיקה\s*2/.test(c) ||
    /academic-physics-2/i.test(c) ||
    /^physics-?2$/i.test(c) ||
    /\b114052\b/.test(c) ||
    /\b0509[.\-]1829\b/.test(c) ||
    (/חשמל|מגנטיות/.test(c) && /פיזיקה/.test(c))
  ) {
    return "PHYSICS2";
  }
  // Academic Physics 1 — Mechanics (never bagrut / mechina physics banks)
  if (
    /פיזיקה\s*1/.test(c) ||
    /academic-physics-1/i.test(c) ||
    /^physics-?1$/i.test(c) ||
    /\b114051\b/.test(c) ||
    /\b0509-1118\b/.test(c)
  ) {
    return "PHYSICS1";
  }
  // Probability & Statistics (before generic fail-closed)
  if (
    /הסתברות/.test(c) ||
    /סטטיסטיקה/.test(c) ||
    /תהליכים\s+אקראיים/.test(c) ||
    /academic-probability/i.test(c) ||
    /probability-statistics/i.test(c) ||
    /\b094412\b/.test(c) ||
    /\b094424\b/.test(c) ||
    /\b104034\b/.test(c) ||
    /\b044201\b/.test(c)
  ) {
    return "PROB";
  }
  // Complex functions & integral transforms — before PDE ("התמרות" ≠ Fourier series)
  if (
    /פונקציות\s+מרוכבות/.test(c) ||
    /התמרות\s+אינטגרליות/.test(c) ||
    /academic-complex-functions/i.test(c) ||
    /complex-functions/i.test(c) ||
    /\b104214\b/.test(c)
  ) {
    return "COMPLEX_FUNCTIONS";
  }
  // Digital communications — before computer networks ("תקשורת ספרתית" ≠ "רשתות תקשורת")
  if (
    /תקשורת\s+ספרתית/.test(c) ||
    /academic-digital-communications/i.test(c) ||
    /digital-communications/i.test(c) ||
    /\b044149\b/.test(c)
  ) {
    return "DIGITAL_COMMUNICATIONS";
  }
  // DSP / digital signal processing — nearest bank is signals & systems
  if (
    /עיבוד\s+אותות\s+ספרתי/.test(c) ||
    /\bDSP\b/i.test(c) ||
    /\b044198\b/.test(c)
  ) {
    return "SIGNALS_SYSTEMS";
  }
  // Signals & systems
  if (
    /אותות\s+ומערכות/.test(c) ||
    /academic-signals-systems/i.test(c) ||
    /signals-systems/i.test(c) ||
    /signals-and-systems/i.test(c) ||
    /\b044131\b/.test(c)
  ) {
    return "SIGNALS_SYSTEMS";
  }
  // PDE / Fourier — before ODE; never collapse into ordinary DE bank
  if (
    /חלקיות/.test(c) ||
    /פורייה|Fourier/i.test(c) ||
    /מד״ח|מד"ח/.test(c) ||
    /academic-pde-fourier/i.test(c) ||
    /pde-fourier/i.test(c) ||
    /^pde$/i.test(c)
  ) {
    return "PDE";
  }
  // ODE — before fail-closed; never route PDE / Fourier into this bank
  if (
    /משוואות\s+דיפרנציאליות/.test(c) ||
    /מד״ר|מד"ר/.test(c) ||
    /academic-ordinary-differential/i.test(c) ||
    /ordinary-differential-equations/i.test(c) ||
    /^ode$/i.test(c) ||
    /\b104035\b/.test(c)
  ) {
    return "ODE";
  }
  // Advanced databases / NoSQL — before basic SQL ("מתקדמים" ≠ "בסיסי נתונים")
  if (
    /בסיסי\s+נתונים\s+מתקדמים/.test(c) ||
    /NoSQL/i.test(c) ||
    /academic-advanced-databases/i.test(c) ||
    /advanced-databases/i.test(c)
  ) {
    return "ADVANCED_DATABASES_NOSQL";
  }
  // Systems analysis & IS architecture — before computer-architecture "ארכיטקטורה"
  if (
    /ניתוח[,\s]+תכן\s+וארכיטקטורת\s+מערכות\s+מידע/.test(c) ||
    /ארכיטקטורת\s+מערכות\s+מידע/.test(c) ||
    /ניתוח\s+ועיצוב\s+מערכות\s+מידע/.test(c) ||
    /academic-systems-analysis/i.test(c) ||
    /systems-analysis/i.test(c)
  ) {
    return "SYSTEMS_ANALYSIS_ARCHITECTURE";
  }
  // Databases — before data-structures; "בסיסי נתונים" ≠ "מבני נתונים"
  if (
    /בסיסי\s+נתונים/.test(c) ||
    /academic-databases/i.test(c) ||
    /^databases$/i.test(c) ||
    /database-systems/i.test(c) ||
    /\b236363\b/.test(c) ||
    /\b094220\b/.test(c)
  ) {
    return "DATABASES";
  }
  // Computer Networks
  if (
    /רשתות\s+תקשורת/.test(c) ||
    /academic-computer-networks/i.test(c) ||
    /computer-networks/i.test(c) ||
    /^networks$/i.test(c) ||
    /\b236334\b/.test(c)
  ) {
    return "NETWORKS";
  }
  // Deep Learning — before Machine Learning ("למידה עמוקה" ≠ "למידת מכונה")
  if (
    /למידה\s+עמוקה/.test(c) ||
    /Deep\s+Learning/i.test(c) ||
    /academic-deep-learning/i.test(c) ||
    /deep-learning/i.test(c)
  ) {
    return "DEEP_LEARNING";
  }
  // Advanced ML — before intro ML ("למידת מכונה מתקדמת" ≠ "מבוא ללמידת מכונה")
  if (
    /למידת\s+מכונה\s+מתקדמת/.test(c) ||
    /Advanced\s+Machine\s+Learning/i.test(c) ||
    /academic-advanced-ml/i.test(c) ||
    /advanced-machine-learning/i.test(c) ||
    /advanced-ml/i.test(c)
  ) {
    return "ADVANCED_MACHINE_LEARNING";
  }
  // Data & text mining — before Big Data ("כריית נתונים וטקסט" ≠ "Big Data Analytics")
  if (
    /כריית\s+נתונים\s+וטקסט/.test(c) ||
    (/כריית\s+טקסט/.test(c) && !/Big\s+Data\s+Analytics/i.test(c)) ||
    /academic-data-text-mining/i.test(c) ||
    /data-text-mining/i.test(c)
  ) {
    return "DATA_TEXT_MINING";
  }
  // Applied regression — before generic statistics and before control "מערכות ליניאריות"
  if (
    /מודלים\s+סטטיסטיים/.test(c) ||
    /רגרסיה\s+ליניארית/.test(c) ||
    /רגרסיה\s+מיושמת/.test(c) ||
    /הסקה\s+סטטיסטית\s+ומודלים\s+לינאריים/.test(c) ||
    /academic-applied-regression/i.test(c) ||
    /applied-regression/i.test(c)
  ) {
    return "APPLIED_REGRESSION";
  }
  // Introduction to Machine Learning
  if (
    /למידת\s+מכונה/.test(c) ||
    /Machine\s+Learning/i.test(c) ||
    /academic-machine-learning/i.test(c) ||
    /machine-learning/i.test(c) ||
    /^ml$/i.test(c) ||
    /\b236756\b/.test(c)
  ) {
    return "MACHINE_LEARNING";
  }
  // Control Theory & Linear Systems
  if (
    /תורת\s+הבקרה/.test(c) ||
    /מערכות\s+ליניאריות/.test(c) ||
    /academic-control-theory/i.test(c) ||
    /control-theory/i.test(c) ||
    /\b044148\b/.test(c)
  ) {
    return "CONTROL_THEORY";
  }
  // OOP / Advanced Programming
  if (
    /תכנות\s+מונחה\s+עצמים/.test(c) ||
    /academic-oop/i.test(c) ||
    /^oop$/i.test(c) ||
    /\b234129\b/.test(c)
  ) {
    return "OOP_ADVANCED";
  }
  // Engineering Thermodynamics
  if (
    /תרמודינמיקה/.test(c) ||
    /academic-thermodynamics/i.test(c) ||
    /thermodynamics/i.test(c) ||
    /\b034028\b/.test(c)
  ) {
    return "THERMODYNAMICS";
  }
  // Semiconductor devices
  if (
    /מוליכים\s+למחצה/.test(c) ||
    /מל״מ|מל"מ/.test(c) ||
    /academic-semiconductors/i.test(c) ||
    /semiconductors/i.test(c) ||
    /\b044125\b/.test(c)
  ) {
    return "SEMICONDUCTORS";
  }
  // Fluid mechanics
  if (
    /מכניקת\s+זורמים/.test(c) ||
    /academic-fluid-mechanics/i.test(c) ||
    /fluid-mechanics/i.test(c) ||
    /\b034033\b/.test(c)
  ) {
    return "FLUID_MECHANICS";
  }
  // Compilers & Programming Languages
  if (
    /קומפילציה/.test(c) ||
    /תכנון\s+שפות\s+תכנות/.test(c) ||
    /academic-compilers/i.test(c) ||
    /^compilers$/i.test(c) ||
    /\b236703\b/.test(c)
  ) {
    return "COMPILERS";
  }
  // Waves & Electromagnetics (incl. microwaves / electro-optics electives)
  if (
    /שדות\s+אלקטרומגנטיים/.test(c) ||
    /גלים\s+ושדות/.test(c) ||
    /מיקרוגלים/.test(c) ||
    /אלקטרואופטיקה/.test(c) ||
    /academic-electromagnetics/i.test(c) ||
    /electromagnetics/i.test(c) ||
    /\b044140\b/.test(c) ||
    /\b044167\b/.test(c) ||
    /\b044191\b/.test(c)
  ) {
    return "ELECTROMAGNETICS";
  }
  // Information security & cryptography — before generic CS fallthrough
  if (
    /אבטחת\s+מידע/.test(c) ||
    /אבטחת\s+מחשבים/.test(c) ||
    /קריפטוגרפיה/.test(c) ||
    /academic-information-security/i.test(c) ||
    /information-security/i.test(c) ||
    /\b236350\b/.test(c)
  ) {
    return "INFORMATION_SECURITY";
  }
  // Energy conversion & power systems — before generic fail-closed
  if (
    /המרת\s+אנרגיה/.test(c) ||
    /מערכות\s+הספק/.test(c) ||
    /academic-energy-conversion/i.test(c) ||
    /energy-conversion/i.test(c) ||
    /\b044109\b/.test(c)
  ) {
    return "ENERGY_CONVERSION";
  }
  // Heat and mass transfer — before thermodynamics mention of heat, and before fail-closed
  if (
    /מעבר\s+חום/.test(c) ||
    /מעבר\s+מסה/.test(c) ||
    /academic-heat-mass-transfer/i.test(c) ||
    /heat-mass-transfer/i.test(c) ||
    /\b034035\b/.test(c)
  ) {
    return "HEAT_MASS_TRANSFER";
  }
  // Intro data science — before Python / intro CS
  if (
    /מבוא\s+למדעי\s+הנתונים/.test(c) ||
    /academic-intro-ds/i.test(c) ||
    /intro-data-science/i.test(c)
  ) {
    return "INTRO_DS";
  }
  // NLP — before generic text mining / ML
  if (
    /עיבוד\s+שפה\s+טבעית/.test(c) ||
    /\bNLP\b/i.test(c) ||
    /academic-nlp/i.test(c) ||
    /nlp-language/i.test(c)
  ) {
    return "NLP";
  }
  // Business intelligence — before generic databases
  if (
    /בינה\s+עסקית/.test(c) ||
    /מחסני\s+נתונים/.test(c) ||
    /academic-bi/i.test(c) ||
    /business-intelligence/i.test(c) ||
    /\b096210\b/.test(c)
  ) {
    return "BI";
  }
  // General chemistry
  if (
    /כימיה\s+כללית/.test(c) ||
    /academic-general-chemistry/i.test(c) ||
    /general-chemistry/i.test(c) ||
    /\b125001\b/.test(c)
  ) {
    return "GENERAL_CHEMISTRY";
  }
  // CAD — before machine design ("תכן מכני")
  if (
    /תכן\s+בעזרת\s+מחשב/.test(c) ||
    /גרפיקה\s+הנדסית/.test(c) ||
    /\bCAD\b/i.test(c) ||
    /academic-cad/i.test(c) ||
    /\b034032\b/.test(c)
  ) {
    return "CAD";
  }
  // Materials science — before strength of materials
  if (
    /תורת\s+החומרים/.test(c) ||
    /academic-materials-science/i.test(c) ||
    /materials-science/i.test(c) ||
    /\b034005\b/.test(c)
  ) {
    return "MATERIALS_SCIENCE";
  }
  // Mechanical vibrations
  if (
    /תנודות/.test(c) ||
    /רעידות/.test(c) ||
    /academic-mechanical-vibrations/i.test(c) ||
    /mechanical-vibrations/i.test(c) ||
    /\b034029\b/.test(c)
  ) {
    return "MECHANICAL_VIBRATIONS";
  }
  // FEM
  if (
    /אלמנטים\s+סופיים/.test(c) ||
    /\bFEM\b/i.test(c) ||
    /academic-fem/i.test(c) ||
    /finite-element/i.test(c) ||
    /\b034038\b/.test(c)
  ) {
    return "FEM";
  }
  // Digital control & robotics — before classical control theory
  if (
    /בקרה\s+ספרתית/.test(c) ||
    /רובוטיקה/.test(c) ||
    /academic-digital-control-robotics/i.test(c) ||
    /digital-control-robotics/i.test(c) ||
    /\b034042\b/.test(c)
  ) {
    return "DIGITAL_CONTROL_ROBOTICS";
  }
  // Python (IE) — after intro DS
  if (
    /עקרונות\s+תכנות\s+ופייתון/.test(c) ||
    (/פייתון/.test(c) && !/מדעי\s+הנתונים/.test(c)) ||
    /academic-python/i.test(c) ||
    /python-programming/i.test(c) ||
    /\b094219\b/.test(c)
  ) {
    return "PYTHON";
  }
  // Organization theory
  if (
    /תורת\s+הארגון/.test(c) ||
    /התנהגות\s+ארגונית/.test(c) ||
    /academic-organization-theory/i.test(c) ||
    /organization-theory/i.test(c) ||
    /\b094115\b/.test(c)
  ) {
    return "ORGANIZATION_THEORY";
  }
  // Supply chain
  if (
    /שרשרת\s+אספקה/.test(c) ||
    /לוגיסטיקה/.test(c) ||
    /academic-supply-chain/i.test(c) ||
    /supply-chain/i.test(c) ||
    /\b094503\b/.test(c)
  ) {
    return "SUPPLY_CHAIN";
  }
  // Game theory
  if (
    /תורת\s+המשחקים/.test(c) ||
    /academic-game-theory/i.test(c) ||
    /game-theory/i.test(c) ||
    /\b094320\b/.test(c)
  ) {
    return "GAME_THEORY";
  }
  // Plant layout
  if (
    /מערכי\s+מפעל/.test(c) ||
    /תכנון\s+מערכי/.test(c) ||
    /academic-plant-layout/i.test(c) ||
    /plant-layout/i.test(c) ||
    /\b094140\b/.test(c)
  ) {
    return "PLANT_LAYOUT";
  }
  // Stochastic models / queueing — before generic "חקר ביצועים" (OR1 linear programming)
  if (
    /מודלים\s+סטוכסטיים/.test(c) ||
    /תורת\s+התורים/.test(c) ||
    /חקר\s+ביצועים\s*2/.test(c) ||
    /academic-stochastic-models/i.test(c) ||
    /stochastic-models/i.test(c) ||
    /\b094314\b/.test(c)
  ) {
    return "STOCHASTIC_MODELS";
  }
  // Kinematics & dynamics — never match תרמודינמיקה (substring דינמיקה)
  if (
    /קינמטיקה/.test(c) ||
    (/דינמיקה/.test(c) && !/תרמודינמיקה/.test(c)) ||
    /academic-kinematics-dynamics/i.test(c) ||
    /kinematics-dynamics/i.test(c) ||
    /\b034014\b/.test(c)
  ) {
    return "KINEMATICS_DYNAMICS";
  }
  // Machine design — before generic mechanical mentions
  if (
    /תכן\s+מכני/.test(c) ||
    /איברים\s+מכניים/.test(c) ||
    /academic-machine-design/i.test(c) ||
    /machine-design/i.test(c) ||
    /\b034039\b/.test(c)
  ) {
    return "MACHINE_DESIGN";
  }
  // Production planning & control — before generic "תכנון" (algorithms)
  if (
    /תכנון\s+ופיקוח\s+הייצור/.test(c) ||
    /ניהול\s+ייצור/.test(c) ||
    /תפ״י|תפ"י/.test(c) ||
    /academic-production-planning/i.test(c) ||
    /production-planning/i.test(c) ||
    /\b094501\b/.test(c)
  ) {
    return "PRODUCTION_PLANNING";
  }

  // Simulation of manufacturing & service systems — before generic "מערכות"
  if (
    /סימולציה\s+של\s+מערכות/.test(c) ||
    /academic-simulation-systems/i.test(c) ||
    /simulation-systems/i.test(c) ||
    /\b094114\b/.test(c)
  ) {
    return "SIMULATION_SYSTEMS";
  }
  // Requirements engineering & UI/UX — before generic HCI / interface mentions
  if (
    /הנדסת\s+דרישות/.test(c) ||
    /ממשקי\s+משתמש/.test(c) ||
    /ממשקי\s+אדם[-\s]מחשב/.test(c) ||
    /אינטראקציית\s+אדם[-\s]מחשב/.test(c) ||
    /UI\s*\/\s*UX/i.test(c) ||
    /academic-ui-ux-engineering/i.test(c) ||
    /ui-ux-engineering/i.test(c) ||
    /\b236370\b/.test(c)
  ) {
    return "UI_UX_ENGINEERING";
  }

  // Engineering economy & cost analysis — before generic "תמחור" / finance mentions
  if (
    /תמחור\s+ובקרת\s+עלויות/.test(c) ||
    /כלכלת\s+הנדסה/.test(c) ||
    /engineering-economy/i.test(c) ||
    /\b094511\b/.test(c)
  ) {
    return "ENGINEERING_ECONOMY";
  }
  // Quality engineering & Six Sigma — before generic quality mentions
  if (
    /ניהול\s+איכות/.test(c) ||
    /הנדסת\s+איכות/.test(c) ||
    /שש[-\s]?סיגמ/.test(c) ||
    /Six\s*Sigma/i.test(c) ||
    /quality-engineering/i.test(c) ||
    /\b094142\b/.test(c)
  ) {
    return "QUALITY_ENGINEERING";
  }
  // Methods engineering & ergonomics — before generic "שיטות" / industrial fallthrough
  if (
    /הנדסת\s+שיטות/.test(c) ||
    /מדידת\s+עבודה/.test(c) ||
    /ארגונומיה/.test(c) ||
    /academic-methods-ergonomics/i.test(c) ||
    /methods-ergonomics/i.test(c) ||
    /\b094120\b/.test(c)
  ) {
    return "METHODS_ERGONOMICS";
  }
  // IS security & risk management — before cryptography ("אבטחת מידע")
  if (
    /אבטחת\s+מערכות\s+מידע/.test(c) ||
    /ניהול\s+סיכוני\s+סייבר/.test(c) ||
    /academic-is-security-risk/i.test(c) ||
    /is-security-risk/i.test(c)
  ) {
    return "IS_SECURITY_RISK";
  }
  // Structural statics — before rigid-body "סטטיקה" / strength of materials
  if (
    /סטטיקה\s+של\s+מבנים/.test(c) ||
    /אנליזת\s+מבנים/.test(c) ||
    /academic-structural-statics/i.test(c) ||
    /structural-statics/i.test(c)
  ) {
    return "STRUCTURAL_STATICS";
  }
  // Digital logic — before "מערכות ספרתיות ומבנה מחשבים" (architecture)
  if (
    (/מערכות\s+ספרתיות/.test(c) && !/מבנה\s+מחשבים/.test(c)) ||
    /תכן\s+לוגי/.test(c) ||
    /לוגיקה\s+ספרתית/.test(c) ||
    /academic-digital-logic/i.test(c) ||
    /digital-logic/i.test(c)
  ) {
    return "DIGITAL_LOGIC";
  }

  // Distributed systems & cloud — before generic "מערכות" and IS architecture
  if (
    /מערכות\s+מבוזרות/.test(c) ||
    /מחשוב\s+ענן/.test(c) ||
    /ארכיטקטורת\s+ענן/.test(c) ||
    /distributed\s+systems/i.test(c) ||
    /cloud\s+computing/i.test(c) ||
    /academic-distributed-systems/i.test(c) ||
    /distributed-systems/i.test(c) ||
    /\b094224\b/.test(c)
  ) {
    return "DISTRIBUTED_SYSTEMS";
  }

  // Computer vision & image processing — before generic vision / ML labels
  if (
    /ראייה\s+ממוחשבת/.test(c) ||
    /עיבוד\s+תמונה/.test(c) ||
    /computer\s+vision/i.test(c) ||
    /image\s+processing/i.test(c) ||
    /academic-computer-vision/i.test(c) ||
    /computer-vision/i.test(c)
  ) {
    return "COMPUTER_VISION";
  }

  // Unknown academic course — fail closed
  return null;
}

function resolveBagrutMathQuestions(
  examCode: string | null | undefined
): DiagnosticQuestion[] {
  const key = resolveMathExamKey(examCode);
  return MATH_EXAM_DISPATCH[key]();
}

function resolveBagrutPhysicsQuestions(
  examCode: string | null | undefined
): DiagnosticQuestion[] {
  const key = resolvePhysicsExamKey(examCode);
  return PHYSICS_EXAM_DISPATCH[key]();
}

function resolveBagrutCsQuestions(
  examCode: string | null | undefined
): DiagnosticQuestion[] {
  const key = resolveCsExamKey(examCode);
  return CS_EXAM_DISPATCH[key]();
}

function resolveBagrutHebrewQuestions(
  examCode: string | null | undefined
): DiagnosticQuestion[] {
  const key = resolveHebrewExamKey(examCode);
  return HEBREW_EXAM_DISPATCH[key]();
}

function resolveBagrutCivicsQuestions(
  examCode: string | null | undefined
): DiagnosticQuestion[] {
  const key = resolveCivicsExamKey(examCode);
  return CIVICS_EXAM_DISPATCH[key]();
}

function resolveBagrutHistoryQuestions(
  examCode: string | null | undefined
): DiagnosticQuestion[] {
  const key = resolveHistoryExamKey(examCode);
  return HISTORY_EXAM_DISPATCH[key]();
}

function resolveBagrutQuestions(params: ChallengeQuestionParams): DiagnosticQuestion[] {
  const subject = (params.subjectId || "").trim().toLowerCase();

  // 1) Subject first — physics / CS codes never enter the math map
  if (subject === "physics") {
    return resolveBagrutPhysicsQuestions(params.examCode);
  }

  if (subject === "cs") {
    return resolveBagrutCsQuestions(params.examCode);
  }

  if (subject === "english") {
    return sampleEnglishOnboardingQuestions();
  }

  if (subject === "chemistry") {
    return sampleChemistryOnboardingQuestions();
  }

  if (subject === "biology") {
    return sampleBiologyOnboardingQuestions();
  }

  // hebrew_lang is the taxonomy id; "hebrew" / לשון aliases kept for hermetic match
  if (
    subject === "hebrew" ||
    subject === "hebrew_lang" ||
    subject === "lashon" ||
    subject.includes("לשון")
  ) {
    return resolveBagrutHebrewQuestions(params.examCode);
  }

  if (subject === "civics" || subject === "ezrahut" || subject.includes("אזרחות")) {
    return resolveBagrutCivicsQuestions(params.examCode);
  }

  if (
    subject === "history" ||
    subject === "historia" ||
    subject.includes("היסטוריה")
  ) {
    return resolveBagrutHistoryQuestions(params.examCode);
  }

  // bible / tanakh — single theoretical paper; no exam-code split
  if (
    subject === "bible" ||
    subject === "tanakh" ||
    subject.includes("תנ״ך") ||
    subject.includes('תנ"ך')
  ) {
    return sampleBibleOnboardingQuestions();
  }

  // literature — single theoretical paper; no exam-code split (never surface 8281)
  if (
    subject === "literature" ||
    subject === "sifrut" ||
    subject.includes("ספרות")
  ) {
    return sampleLiteratureOnboardingQuestions();
  }

  if (subject === "math" || subject === "") {
    return resolveBagrutMathQuestions(params.examCode);
  }

  const otherBank = BAGRUT_OTHER_SUBJECT_BANKS[subject];
  if (otherBank) {
    return sampleFromBank(otherBank, 3);
  }

  // Unknown bagrut subject: empty (fail closed) — never leak math/psych
  return [];
}

function resolveAcademicByCourse(
  courseId: string | null | undefined
): DiagnosticQuestion[] {
  const key = resolveAcademicCourseKey(courseId);
  if (!key) return [];
  // AcademicDiagnosticQuestion is structurally identical to DiagnosticQuestion
  return ACADEMIC_COURSE_DISPATCH[key]() as DiagnosticQuestion[];
}

function resolveMechinaQuestions(
  mechinaSubject: string | null | undefined
): DiagnosticQuestion[] {
  const label = (mechinaSubject || "").trim();
  if (!label) return [];

  const exact = MECHINA_ROUTE_BY_LABEL[label];
  if (exact?.subject === "math") {
    return MECHINA_MATH_DISPATCH[exact.paper]();
  }
  if (exact?.subject === "physics") {
    return MECHINA_PHYSICS_DISPATCH[exact.paper]();
  }

  // Soft match for questionnaire-split wording without leaking codes to UI
  if (/מתמטיקה|mechina_math/i.test(label)) {
    if (/\b581\b|חלק\s*א|5_1|math_5_1/i.test(label)) {
      return sampleMath5_1_OnboardingQuestions();
    }
    if (/\b582\b|חלק\s*ב|5_2|math_5_2/i.test(label)) {
      return sampleMath5_2_OnboardingQuestions();
    }
    if (/5\s*יח|5U|קדם-הנדסה|מדעים מדויקים/i.test(label)) {
      return sampleMath5AllOnboardingQuestions();
    }
    // 4U mechina math → bagrut ALL_4 (DRY); never physics/psych
    if (/4\s*יח|מדעי החברה|רוח וניהול/i.test(label)) {
      return MATH_EXAM_DISPATCH.ALL_4();
    }
    // Ambiguous math label — fail closed (no cross-subject leak)
    return [];
  }

  if (/פיזיקה|mechina_physics|physics/i.test(label)) {
    if (/מכניקה|mechanics/i.test(label)) {
      return samplePhysicsMechanicsOnboardingQuestions();
    }
    if (/חשמל|מגנטיות|electric/i.test(label)) {
      return samplePhysicsElectricityOnboardingQuestions();
    }
    // General mechina physics questionnaire → 2 mechanics + 1 electricity
    return sampleMechinaPhysicsGeneralOnboardingQuestions();
  }

  // Non math/physics mechina (English, chemistry, …) — generic bank only
  return sampleFromBank(MECHINA_QUESTIONS, 3);
}

/**
 * Resolve the onboarding challenge suite via a keyed subject → paper matrix.
 * Fallbacks never cross subjects (physics ↛ math, psych ↛ bagrut, etc.).
 */
export function getOnboardingChallengeQuestions(
  params: ChallengeQuestionParams
): DiagnosticQuestion[] {
  switch (params.trackType) {
    case "BAGRUT":
      return resolveBagrutQuestions(params);
    case "ACADEMIC":
      return resolveAcademicByCourse(params.courseId);
    case "MECHINA":
      return resolveMechinaQuestions(params.mechinaSubject);
    case "PSYCHOMETRIC":
      return samplePsychometricOnboardingQuestions();
    case "SCREENING_INST":
      return sampleFromBank(SCREENING_QUESTIONS, 3);
    default:
      return [];
  }
}
