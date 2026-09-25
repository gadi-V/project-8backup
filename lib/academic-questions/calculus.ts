import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic calculus / Infinitesimal Analysis diagnostic bank (12Q).
 * Display name: "חדו״א / אינפי" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const CALCULUS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "calculus-q01-sequences-bolzano",
    domain: "סדרות וגבולות חלקיים",
    title: "חדו״א - סדרות וגבולות חלקיים",
    context:
      "תהי $(a_n)_{n=1}^{\\infty}$ סדרה חסומה של מספרים ממשיים. נסמן ב-$L$ את קבוצת כל הגבולות החלקיים שלה.",
    formulaLatex:
      "L = \\{ l \\in \\mathbb{R} \\mid \\exists (a_{n_k}) \\text{ so that } a_{n_k} \\to l \\}",
    instruction: "איזו מהטענות הבאות נכונה בהכרח לכל סדרה חסומה כזו?",
    options: [
      {
        id: "calc-q01-opt1",
        plainText:
          "הסדרה $(a_n)$ מתכנסת אם ורק אם $\\limsup_{n \\to \\infty} a_n = \\liminf_{n \\to \\infty} a_n$.",
        mathText:
          "\\limsup_{n \\to \\infty} a_n = \\liminf_{n \\to \\infty} a_n \\iff \\exists \\lim_{n \\to \\infty} a_n",
        isCorrect: true,
        explanation:
          "נכון: עבור סדרה חסומה, הגבול העליון והגבול התחתון הם איברים ממשיים ב-$L$. הסדרה מתכנסת במובן הצר אם ורק אם קבוצת הגבולות החלקיים היא יחידון, וזה שקול לשוויון $\\limsup a_n = \\liminf a_n$.",
      },
      {
        id: "calc-q01-opt2",
        plainText:
          "אם הקבוצה $L$ אינה בת-מנייה, אזי הסדרה $(a_n)$ אינה חסומה.",
        mathText: "|L| > \\aleph_0 \\implies (a_n) \\text{ אינה חסומה}",
        isCorrect: false,
        explanation:
          "שגוי: נתון שהסדרה חסומה. קבוצת הגבולות החלקיים יכולה להיות קטע שלם (למשל סדרה המונה את כל הרציונליים ב-$[0,1]$), שהוא קבוצה בעלת עוצמת הרצף.",
      },
      {
        id: "calc-q01-opt3",
        plainText:
          "אם לכל תת-סדרה מתכנסת $(a_{n_k})$ מתקיים $\\lim_{k \\to \\infty} a_{n_k} > 0$, אזי החל מאיבר מסוים $a_n > 0$.",
        mathText:
          "\\forall (a_{n_k}) \\to l \\implies l > 0 \\implies a_n > 0 \\text{ a.e.}",
        isCorrect: false,
        explanation:
          "שגוי: אם היו אינסוף איברים שליליים השואפים ל-0 מלמטה, היה קיים גבול חלקי 0, בסתירה לנתון שכל הגבולות החלקיים גדולים ממש מ-0.",
      },
      {
        id: "calc-q01-opt4",
        plainText:
          "קבוצת הגבולות החלקיים $L$ היא תמיד קבוצה פתוחה ב-$\\mathbb{R}$.",
        mathText: "L \\subseteq \\mathbb{R} \\text{ is open}",
        isCorrect: false,
        explanation:
          "שגוי: קבוצת הגבולות החלקיים של סדרה היא תמיד קבוצה סגורה (ועבור סדרה חסומה היא קומפקטית).",
      },
    ],
  },
  {
    id: "calculus-q02-heine-dirichlet",
    domain: "הגדרת הגבול ועקרון היינה",
    title: "חדו״א - הגדרת הגבול ועקרון היינה",
    context:
      "תהי $f: \\mathbb{R} \\to \\mathbb{R}$ פונקציה. נתון כי לכל סדרה של מספרים רציונליים $(q_n) \\subset \\mathbb{Q} \\setminus \\{0\\}$ המקיימת $q_n \\to 0$, מתקיים $f(q_n) \\to 5$.",
    formulaLatex:
      "\\forall (q_n) \\subset \\mathbb{Q} \\setminus \\{0\\},\\; q_n \\to 0 \\implies \\lim_{n \\to \\infty} f(q_n) = 5",
    instruction:
      "מה ניתן להסיק לגבי קיום הגבול $\\lim_{x \\to 0} f(x)$?",
    options: [
      {
        id: "calc-q02-opt1",
        plainText:
          "לא ניתן להסיק כי $\\lim_{x \\to 0} f(x) = 5$ ללא מידע על התנהגות הפונקציה בסדרות אי-רציונליות.",
        isCorrect: true,
        explanation:
          "נכון: עקרון היינה דורש שהתנאי יתקיים לכל סדרה השואפת ל-0. פונקציה המוגדרת כ-$5$ ברציונליים ו-$0$ באי-רציונליים מקיימת את הנתון אך אין לה גבול ב-0.",
      },
      {
        id: "calc-q02-opt2",
        plainText:
          "הגבול $\\lim_{x \\to 0} f(x) = 5$ קיים בהכרח לפי צפיפות המספרים הרציונליים ב-$\\mathbb{R}$.",
        isCorrect: false,
        explanation:
          "שגוי: צפיפות הרציונליים אינה מספיקה; ערכי הפונקציה בנקודות האי-רציונליות עשויים שלא להתקרב ל-5.",
      },
      {
        id: "calc-q02-opt3",
        plainText:
          "הפונקציה בהכרח רציפה בנקודה $x = 0$, ומתקיים $f(0) = 5$.",
        isCorrect: false,
        explanation:
          "שגוי: הגבול אינו תלוי כלל בערך הפונקציה בנקודה $f(0)$, ואין ערובה לרציפות.",
      },
      {
        id: "calc-q02-opt4",
        plainText:
          "אם בנוסף ידוע כי $f$ חסומה בסביבת $0$, אזי בהכרח $\\lim_{x \\to 0} f(x) = 5$.",
        isCorrect: false,
        explanation:
          "שגוי: פונקציית דיריכלה חסומה ומקיימת את הנתון אם נכפיל אותה בקבוע, אך הגבול עדיין לא קיים.",
      },
    ],
  },
  {
    id: "calculus-q03-uniform-continuity",
    domain: "רציפות במידה שווה",
    title: "חדו״א - רציפות במידה שווה",
    context:
      "תהי $f: (0, 1) \\to \\mathbb{R}$ פונקציה רציפה בקטע הפתוח $(0, 1)$.",
    formulaLatex:
      "\\forall \\varepsilon > 0 \\; \\exists \\delta > 0 \\; \\forall x, y \\in (0, 1): |x - y| < \\delta \\implies |f(x) - f(y)| < \\varepsilon",
    instruction:
      "איזה מהתנאים הבאים מהווה תנאי הכרחי ומספיק (אם ורק אם) לכך ש-$f$ תהיה רציפה במידה שווה ב-$(0, 1)$?",
    options: [
      {
        id: "calc-q03-opt1",
        plainText:
          "הגבולות החד-צדדיים $\\lim_{x \\to 0^+} f(x)$ ו-$\\lim_{x \\to 1^-} f(x)$ שניהם קיימים וסופיים.",
        mathText:
          "\\exists \\lim_{x \\to 0^+} f(x) \\in \\mathbb{R} \\quad \\land \\quad \\exists \\lim_{x \\to 1^-} f(x) \\in \\mathbb{R}",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט ההרחבה של קנטור, פונקציה רציפה בקטע פתוח וחסום היא רמ״ש אם ורק אם ניתנת להרחבה רציפה לסגור שלו, דבר השקול לקיום גבולות סופיים בקצוות.",
      },
      {
        id: "calc-q03-opt2",
        plainText: "הפונקציה $f$ חסומה בקטע $(0, 1)$.",
        mathText: "\\sup_{x \\in (0,1)} |f(x)| < \\infty",
        isCorrect: false,
        explanation:
          "שגוי: חסימות היא תנאי הכרחי אך לא מספיק. לדוגמה, $f(x) = \\sin(1/x)$ חסומה ב-$(0,1)$ אך אינה רציפה במידה שווה.",
      },
      {
        id: "calc-q03-opt3",
        plainText: "הנגזרת $f'(x)$ קיימת וחסומה בקטע $(0, 1)$.",
        mathText: "\\sup_{x \\in (0,1)} |f'(x)| < \\infty",
        isCorrect: false,
        explanation:
          "שגוי: חסימות הנגזרת היא תנאי מספיק (תנאי ליפשיץ) אך לא הכרחי. לדוגמה, $f(x) = \\sqrt{x}$ רמ״ש על אף שנגזרתה אינה חסומה ליד 0.",
      },
      {
        id: "calc-q03-opt4",
        plainText:
          "לכל זוג סדרות $(x_n), (y_n) \\subset (0, 1)$, אם $|x_n - y_n| \\to 0$ אז הסדרה $|f(x_n) - f(y_n)|$ חסומה.",
        isCorrect: false,
        explanation:
          "שגוי: התנאי מחייב שההפרש ישאף ל-0 ($|f(x_n) - f(y_n)| \\to 0$) ולא סתם שיהיה חסום.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "calculus-q04-darboux-property",
    domain: "תכונות נגזרת ומשפט דרבו",
    title: "חדו״א - תכונות נגזרת ומשפט דרבו",
    context:
      "תהי $f: \\mathbb{R} \\to \\mathbb{R}$ פונקציה גזירה בכל נקודה ב-$\\mathbb{R}$. נסמן ב-$D$ את קבוצת נקודות אי-הרציפות של פונקציית הנגזרת $f'$.",
    instruction: "מה ניתן לקבוע בוודאות לגבי נקודות אי-הרציפות של $f'$?",
    options: [
      {
        id: "calc-q04-opt1",
        plainText:
          "פונקציית הנגזרת $f'$ יכולה להכיל נקודות אי-רציפות מסוג קפיצה (סוג ראשון).",
        isCorrect: false,
        explanation:
          "שגוי: לפי משפט דרבו, לנגזרת יש תכונת ערך הביניים, ולכן נשללת לחלוטין האפשרות לאי-רציפות ממין ראשון (קפיצה או סליקה).",
      },
      {
        id: "calc-q04-opt2",
        plainText:
          "לנגזרת $f'$ לא יכולות להיות נקודות אי-רציפות ממין ראשון; כל אי-רציפות שלה היא בהכרח ממין שני (עיקרית).",
        isCorrect: true,
        explanation:
          "נכון: תכונת ערך הביניים של דרבו מחייבת שבכל נקודת אי-רציפות, לפחות אחד הגבולות החד-צדדיים אינו קיים כלל (אי-רציפות ממין שני).",
      },
      {
        id: "calc-q04-opt3",
        plainText:
          "הנגזרת $f'$ חייבת להיות רציפה בכל נקודה מעצם קיומה בכל הישר ($D = \\emptyset$).",
        isCorrect: false,
        explanation:
          "שגוי: הפונקציה $f(x) = x^2 \\sin(1/x)$ (ו-$f(0)=0$) גזירה בכל הישר, אך נגזרתה אינה רציפה ב-$x=0$.",
      },
      {
        id: "calc-q04-opt4",
        plainText: "קבוצת נקודות אי-הרציפות $D$ אינה יכולה להיות צפופה באף קטע.",
        isCorrect: false,
        explanation:
          "שגוי: קיימות פונקציות גזירות שהנגזרת שלהן אינה רציפה על קבוצה צפופה בעלת מידה חיובית.",
      },
    ],
  },
  {
    id: "calculus-q05-lagrange-mvt",
    domain: "משפט הערך הממוצע וחד-חד-ערכיות",
    title: "חדו״א - משפט הערך הממוצע וחד-חד-ערכיות",
    context:
      "תהי $f: [a, b] \\to \\mathbb{R}$ פונקציה רציפה בקטע הסגור $[a, b]$ וגזירה ב-$(a, b)$. נתון כי לכל $x \\in (a, b)$ מתקיים $f'(x) \\neq 0$.",
    formulaLatex: "\\forall x \\in (a, b): \\; f'(x) \\neq 0",
    instruction: "איזו מהמסקנות הבאות נובעת בהכרח מהנתונים?",
    options: [
      {
        id: "calc-q05-opt1",
        plainText: "קיימת נקודה $c \\in (a, b)$ כך ש-$f(c) = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: הפונקציה יכולה להיות חיובית לחלוטין בקטע (למשל $f(x) = x + 10$ בקטע $[0,1]$).",
      },
      {
        id: "calc-q05-opt2",
        plainText:
          "הפונקציה $f$ חד-חד-ערכית בקטע $[a, b]$, וערכיה בקצוות שונים ($f(a) \\neq f(b)$).",
        isCorrect: true,
        explanation:
          "נכון: אם היו שתי נקודות עם ערך זהה, לפי משפט רול הנגזרת הייתה מתאפסת ביניהן, בסתירה לנתון ש-$f'(x) \\neq 0$. לכן $f$ מונוטונית ממש וחח״ע.",
      },
      {
        id: "calc-q05-opt3",
        plainText: "הנגזרת $f'(x)$ חסומה בקטע $(a, b)$ מטעמי רציפות.",
        isCorrect: false,
        explanation:
          "שגוי: הנגזרת אינה נתונה כרציפה ואינה בהכרח חסומה (למשל $f(x) = \\sqrt{x}$ בקטע $[0,1]$ שנגזרתה שואפת לאינסוף ב-0).",
      },
      {
        id: "calc-q05-opt4",
        plainText: "הפונקציה מקבלת מקסימום מקומי בקטע הפתוח $(a, b)$.",
        isCorrect: false,
        explanation:
          "שגוי: קיצון מקומי פנימי מאפס את הנגזרת (משפט פרמה), ואילו כאן הנגזרת אינה מתאפסת לעולם.",
      },
    ],
  },
  {
    id: "calculus-q06-taylor-expansion",
    domain: "פיתוח טיילור ושארית פיאנו",
    title: "חדו״א - פיתוח טיילור ושארית פיאנו",
    context:
      "נתונה הפונקציה $f(x) = \\ln(1 + \\sin x)$. אנו מעוניינים בפולינום טיילור מסדר 2 של הפונקציה סביב הנקודה $x_0 = 0$.",
    formulaLatex: "f(x) = \\ln(1 + \\sin x), \\quad x_0 = 0",
    instruction:
      "מהו פיתוח טיילור הנכון מסדר 2 עם שארית פיאנו עבור פונקציה זו?",
    options: [
      {
        id: "calc-q06-opt1",
        plainText: "$f(x) = x + \\frac{1}{2}x^2 + o(x^2)$",
        mathText: "x + \\frac{1}{2}x^2 + o(x^2)",
        isCorrect: false,
        explanation:
          "שגוי: הסימן של האיבר הריבועי שגוי. בהצבת פיתוח הסינוס לתוך פיתוח הלוגריתם מקבלים מקדם שלילי: $-1/2$.",
      },
      {
        id: "calc-q06-opt2",
        plainText: "$f(x) = x - \\frac{1}{2}x^2 + o(x^2)$",
        mathText: "x - \\frac{1}{2}x^2 + o(x^2)",
        isCorrect: true,
        explanation:
          "נכון: מתקיים $\\sin x = x + o(x^2)$ וכן $\\ln(1+u) = u - \\frac{u^2}{2} + o(u^2)$. נציב $u = \\sin x$: נקבל $(x + o(x^2)) - \\frac{1}{2}(x + o(x^2))^2 + o(x^2) = x - \\frac{1}{2}x^2 + o(x^2)$.",
      },
      {
        id: "calc-q06-opt3",
        plainText: "$f(x) = x - x^2 + o(x^2)$",
        mathText: "x - x^2 + o(x^2)",
        isCorrect: false,
        explanation:
          "שגוי: נשמט הפקטור $1/2$ הנובע מהנגזרת השנייה של הלוגריתם בנקודה 0.",
      },
      {
        id: "calc-q06-opt4",
        plainText: "$f(x) = x - \\frac{1}{6}x^3 + o(x^2)$",
        mathText: "x - \\frac{1}{6}x^3 + o(x^2)",
        isCorrect: false,
        explanation:
          "שגוי: הפיתוח חסר את האיבר הריבועי $x^2$, שמקדמו אינו מתאפס.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "calculus-q07-riemann-integrability",
    domain: "אינטגרביליות לפי רימן ומשפט לבג",
    title: "חדו״א - אינטגרביליות לפי רימן ומשפט לבג",
    context:
      "תהי $f: [a, b] \\to \\mathbb{R}$ פונקציה חסומה. נסמן ב-$D$ את קבוצת כל נקודות אי-הרציפות של $f$ בקטע $[a, b]$.",
    instruction:
      "איזה מהתנאים הבאים מבטיח בהכרח ש-$f$ אינטגרבילית לפי רימן בקטע $[a, b]$?",
    options: [
      {
        id: "calc-q07-opt1",
        plainText: "הקבוצה $D$ היא בת-מנייה בלבד.",
        isCorrect: false,
        explanation:
          "שגוי חלקית: קבוצה בת-מנייה היא אמנם תנאי מספיק, אך משפט לבג המלא נותן תנאי הכרחי ומספיק רחב בהרבה (מידת לבג אפס).",
      },
      {
        id: "calc-q07-opt2",
        plainText: "הפונקציה $f$ מקבלת רק ערכים רציונליים בכל תחום הגדרתה.",
        isCorrect: false,
        explanation:
          "שגוי: פונקציות כמו פונקציית דיריכלה מקבלות רק ערכים רציונליים ואינן אינטגרביליות רימן.",
      },
      {
        id: "calc-q07-opt3",
        plainText:
          "קבוצת נקודות אי-הרציפות $D$ היא בעלת מידת לבג אפס (תנאי לבג לאינטגרביליות).",
        mathText: "\\lambda(D) = 0",
        isCorrect: true,
        explanation:
          "נכון: משפט לבג לאינטגרביליות רימן קובע כי פונקציה חסומה בקטע סגור אינטגרבילית לפי רימן אם ורק אם קבוצת נקודות אי-הרציפות שלה היא ממידה אפס.",
      },
      {
        id: "calc-q07-opt4",
        plainText:
          "הפונקציה $f^2$ (המוגדרת על ידי $f^2(x) = (f(x))^2$) היא אינטגרבילית לפי רימן.",
        isCorrect: false,
        explanation:
          "שגוי: אם $f$ שווה ל-1 ברציונליים ו--1 באי-רציונליים, $f^2 \\equiv 1$ אינטגרבילית, אך $f$ עצמה אינה אינטגרבילית.",
      },
    ],
  },
  {
    id: "calculus-q08-ftc-leibniz",
    domain: "המשפט היסודי של החדו״א וכלל לייבניץ",
    title: "חדו״א - המשפט היסודי של החדו״א וכלל לייבניץ",
    context:
      "נגדיר את הפונקציה $F: \\mathbb{R} \\to \\mathbb{R}$ באמצעות אינטגרל עם גבול עליון משתנה:",
    formulaLatex: "F(x) = \\int_{0}^{x^2} \\cos(t^2) \\, dt",
    instruction: "מהי הנגזרת הראשונה $F'(x)$ לכל $x \\in \\mathbb{R}$?",
    options: [
      {
        id: "calc-q08-opt1",
        plainText: "$F'(x) = \\cos(x^4)$",
        mathText: "F'(x) = \\cos(x^4)",
        isCorrect: false,
        explanation:
          "שגוי: נשכחה ההכפלה בנגזרת הפנימית של הגבול העליון לפי כלל השרשרת ($2x$).",
      },
      {
        id: "calc-q08-opt2",
        plainText: "$F'(x) = 2x \\cos(x^2)$",
        mathText: "F'(x) = 2x \\cos(x^2)",
        isCorrect: false,
        explanation:
          "שגוי: הוצב $t = x$ במקום $t = x^2$. ההצבה הנכונה נותנת $t^2 = (x^2)^2 = x^4$.",
      },
      {
        id: "calc-q08-opt3",
        plainText: "$F'(x) = 2x \\cos(x^4)$",
        mathText: "F'(x) = 2x \\cos(x^4)",
        isCorrect: true,
        explanation:
          "נכון: לפי המשפט היסודי של החדו״א וכלל השרשרת: נגדיר $G(u) = \\int_0^u \\cos(t^2) dt$. אזי $F(x) = G(x^2)$, ולכן $F'(x) = G'(x^2) \\cdot (x^2)' = 2x\\cos(x^4)$.",
      },
      {
        id: "calc-q08-opt4",
        plainText: "$F'(x) = -2x \\sin(x^4)$",
        mathText: "F'(x) = -2x \\sin(x^4)",
        isCorrect: false,
        explanation:
          "שגוי: בוצעה גזירה שגויה של הפונקציה הפנימית במקום שימוש במשפט היסודי.",
      },
    ],
  },
  {
    id: "calculus-q09-improper-integrals",
    domain: "אינטגרלים לא-אמיתיים",
    title: "חדו״א - אינטגרלים לא-אמיתיים",
    context:
      "נתון האינטגרל הלא-אמיתי הבא התלוי בפרמטר הממשי $p$:",
    formulaLatex: "I(p) = \\int_{1}^{\\infty} \\frac{\\sin^2(x)}{x^p} \\, dx",
    instruction: "עבור אילו ערכים של הפרמטר $p$ האינטגרל $I(p)$ מתכנס?",
    options: [
      {
        id: "calc-q09-opt1",
        plainText: "האינטגרל מתכנס לכל $p > 0$.",
        mathText: "p > 0",
        isCorrect: false,
        explanation:
          "שגוי: עבור $p \\le 1$ האינטגרל מתבדר (לפי פירוק $\\sin^2 x = \\frac{1 - \\cos 2x}{2}$, האיבר עם $1/x^p$ מתבדר).",
      },
      {
        id: "calc-q09-opt2",
        plainText: "האינטגרל מתכנס רק כאשר $p \\ge 2$.",
        mathText: "p \\ge 2",
        isCorrect: false,
        explanation:
          "שגוי: לכל $p > 1$ מתקיים $\\frac{\\sin^2 x}{x^p} \\le \\frac{1}{x^p}$ והאינטגרל מתכנס לפי מבחן ההשוואה; אין צורך ב-$p \\ge 2$.",
      },
      {
        id: "calc-q09-opt3",
        plainText: "האינטגרל מתכנס אם ורק אם $p > 1$.",
        mathText: "p > 1",
        isCorrect: true,
        explanation:
          "נכון: לכל $p > 1$ מתקיים $\\frac{\\sin^2 x}{x^p} \\le \\frac{1}{x^p}$, ולכן מתכנס. עבור $p \\le 1$, הפירוק $\\sin^2 x = 1/2 - (\\cos 2x)/2$ מראה שהחלק הראשון מתבדר והשני מתכנס בדיריכלה, ולכן הסכום מתבדר.",
      },
      {
        id: "calc-q09-opt4",
        plainText: "האינטגרל מתבדר לכל ערך ממשי של $p$.",
        mathText: "\\forall p \\in \\mathbb{R}: I(p) = \\infty",
        isCorrect: false,
        explanation:
          "שגוי: ראינו שעבור $p > 1$ יש התכנסות ברורה לפי חסימה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "calculus-q10-convexity-tangent",
    domain: "פונקציות קמורות ומשיקים",
    title: "חדו״א - פונקציות קמורות ומשיקים",
    context:
      "תהי $f: \\mathbb{R} \\to \\mathbb{R}$ פונקציה גזירה פעמיים בכל הישר, המקיימת לכל $x \\in \\mathbb{R}$ את התנאי $f''(x) > 0$.",
    formulaLatex: "\\forall x \\in \\mathbb{R}: \\quad f''(x) > 0",
    instruction: "איזו מבין הטענות הבאות נכונה בהכרח לגבי הפונקציה $f$?",
    options: [
      {
        id: "calc-q10-opt1",
        plainText: "הפונקציה $f$ מונוטונית עולה ממש בכל הישר $\\mathbb{R}$.",
        isCorrect: false,
        explanation:
          "שגוי: הפרבולית $f(x) = x^2$ מקיימת $f''(x) = 2 > 0$ אך יורדת עבור $x < 0$.",
      },
      {
        id: "calc-q10-opt2",
        plainText:
          "בהכרח מתקיים $\\lim_{x \\to \\infty} f(x) = \\infty$ וגם $\\lim_{x \\to -\\infty} f(x) = -\\infty$.",
        isCorrect: false,
        explanation:
          "שגוי: עבור $f(x) = e^x$ הנגזרת השנייה חיובית בכל הישר, אך באינסוף השלילי הגבול הוא 0.",
      },
      {
        id: "calc-q10-opt3",
        plainText:
          "לפונקציה יש נקודת פיתול יחידה בנקודה שבה הנגזרת הראשונה מתאפסת.",
        isCorrect: false,
        explanation:
          "שגוי: נקודת פיתול דורשת החלפת סימן של $f''$, אך נתון כי $f''(x) > 0$ לכל $x$, ולכן אין לפונקציה נקודות פיתול.",
      },
      {
        id: "calc-q10-opt4",
        plainText:
          "לכל $x_0 \\in \\mathbb{R}$, ישר המשיק לגרף הפונקציה ב-$x_0$ נמצא כולו מתחת לגרף הפונקציה (למעט בנקודת ההשקה).",
        mathText:
          "\\forall x \\neq x_0: \\quad f(x) > f(x_0) + f'(x_0)(x - x_0)",
        isCorrect: true,
        explanation:
          "נכון: מכיוון ש-$f''(x) > 0$, הפונקציה קמורה ממש. לפי שארית לגראנז': $f(x) = f(x_0) + f'(x_0)(x - x_0) + \\frac{f''(c)}{2}(x - x_0)^2$. מאחר ש-$f''(c) > 0$, הגרף נמצא ממש מעל המשיק לכל $x \\neq x_0$.",
      },
    ],
  },
  {
    id: "calculus-q11-series-conditional-convergence",
    domain: "טורים והתכנסות בתנאי",
    title: "חדו״א - טורים והתכנסות בתנאי",
    context:
      "יהי $\\sum_{n=1}^{\\infty} a_n$ טור מספרים ממשיים המתכנס בתנאי. נגדיר את חלקיו החיוביים והשליליים:",
    formulaLatex:
      "a_n^+ = \\max(a_n, 0), \\quad a_n^- = \\max(-a_n, 0)",
    instruction:
      "מה ניתן להסיק לגבי התכנסות הטורים $\\sum_{n=1}^{\\infty} a_n^+$ ו-$\\sum_{n=1}^{\\infty} a_n^-$?",
    options: [
      {
        id: "calc-q11-opt1",
        plainText: "שני הטורים מתכנסים בהכרח למספרים סופיים.",
        isCorrect: false,
        explanation:
          "שגוי: אם שניהם היו מתכנסים, סכומם היה מראה שהטור מתכנס בהחלט, בסתירה להגדרה של התכנסות בתנאי.",
      },
      {
        id: "calc-q11-opt2",
        plainText:
          "הטור $\\sum a_n^+$ מתכנס, ואילו הטור $\\sum a_n^-$ מתבדר ל-$+\\infty$.",
        isCorrect: false,
        explanation:
          "שגוי: אם אחד מתכנס והשני מתבדר, הטור המקורי כולו היה מתבדר לאינסוף, בסתירה לכך שהוא מתכנס.",
      },
      {
        id: "calc-q11-opt3",
        plainText:
          "לפחות אחד משני הטורים מתכנס, אך לא ניתן לדעת איזה מהם ללא נוסחת האיבר הכללי.",
        isCorrect: false,
        explanation:
          "שגוי: התכנסות של אחד מהם בלבד סותרת את התכנסות הטור המקורי.",
      },
      {
        id: "calc-q11-opt4",
        plainText:
          "שני הטורים מתבדרים לאינסוף: $\\sum_{n=1}^{\\infty} a_n^+ = \\infty$ וגם $\\sum_{n=1}^{\\infty} a_n^- = \\infty$.",
        mathText:
          "\\sum_{n=1}^\\infty a_n^+ = \\infty \\quad \\land \\quad \\sum_{n=1}^\\infty a_n^- = \\infty",
        isCorrect: true,
        explanation:
          "נכון: מאחר ש-$a_n = a_n^+ - a_n^-$ ו-$|a_n| = a_n^+ + a_n^-$, אם אחד היה מתכנס נובע שגם השני היה מתכנס והטור היה מתכנס בהחלט. לכן שניהם חייבים להתבדר לאינסוף (משפט רימן לסידור טורים מחדש).",
      },
    ],
  },
  {
    id: "calculus-q12-lhopital-limitations",
    domain: "גבולות וכלל לופיטל",
    title: "חדו״א - גבולות וכלל לופיטל",
    context:
      "תהיינה $f, g: (a, \\infty) \\to \\mathbb{R}$ פונקציות גזירות, כאשר $g'(x) \\neq 0$. נתון כי מתקיים המקרה $\\lim_{x \\to \\infty} f(x) = \\infty$ וגם $\\lim_{x \\to \\infty} g(x) = \\infty$.",
    formulaLatex:
      "\\lim_{x \\to \\infty} f(x) = \\infty, \\quad \\lim_{x \\to \\infty} g(x) = \\infty",
    instruction:
      "באיזה מהמקרים הבאים לא ניתן להסיק מסקנה לגבי קיום וערך הגבול $\\lim_{x \\to \\infty} \\frac{f(x)}{g(x)}$ באמצעות הפעלה ישירה של כלל לופיטל?",
    options: [
      {
        id: "calc-q12-opt1",
        plainText:
          "כאשר גבול הנגזרות $\\lim_{x \\to \\infty} \\frac{f'(x)}{g'(x)} = L$ קיים וסופי.",
        isCorrect: false,
        explanation:
          "שגוי: במקרה זה לופיטל תקף לחלוטין ומבטיח שהגבול המקורי קיים ושווה ל-$L$.",
      },
      {
        id: "calc-q12-opt2",
        plainText:
          "כאשר גבול מנת הנגזרות שואף לאינסוף: $\\lim_{x \\to \\infty} \\frac{f'(x)}{g'(x)} = \\infty$.",
        isCorrect: false,
        explanation:
          "שגוי: כלל לופיטל תקף גם לגבולות אינסופיים במובן הרחב.",
      },
      {
        id: "calc-q12-opt3",
        plainText:
          "כאשר הנגזרות מקיימות $f'(x) > 0$ ו-$g'(x) > 0$ לכל $x > a$.",
        isCorrect: false,
        explanation:
          "שגוי: חיוביות הנגזרות אינה מהווה מכשול להפעלת כלל לופיטל.",
      },
      {
        id: "calc-q12-opt4",
        plainText:
          "כאשר גבול מנת הנגזרות $\\lim_{x \\to \\infty} \\frac{f'(x)}{g'(x)}$ אינו קיים כלל (אף לא במובן הרחב).",
        mathText: "\\not\\exists \\lim_{x \\to \\infty} \\frac{f'(x)}{g'(x)}",
        isCorrect: true,
        explanation:
          "נכון: כלל לופיטל הוא תנאי בכיוון אחד בלבד. אם גבול מנת הנגזרות אינו קיים (למשל $f(x) = x + \\sin x$, $g(x) = x$), הגבול המקורי יכול עדיין להתקיים ($1$), אך לא ניתן להסיקו מלופיטל.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_CALC_QUESTIONS = CALCULUS_QUESTIONS;

/**
 * Onboarding sample: one question from answer-key blocks A and B,
 * one from the combined C+D block, then shuffle.
 */
export function sampleCalculusOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = CALCULUS_QUESTIONS.slice(0, 3);
  const groupB = CALCULUS_QUESTIONS.slice(3, 6);
  const groupC = CALCULUS_QUESTIONS.slice(6, 12);

  const pickedA = groupA[Math.floor(Math.random() * groupA.length)];
  const pickedB = groupB[Math.floor(Math.random() * groupB.length)];
  const pickedC = groupC[Math.floor(Math.random() * groupC.length)];

  const sampled = [pickedA, pickedB, pickedC].filter(
    (q): q is AcademicDiagnosticQuestion => Boolean(q)
  );

  for (let i = sampled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sampled[i], sampled[j]] = [sampled[j], sampled[i]];
  }

  return sampled;
}
