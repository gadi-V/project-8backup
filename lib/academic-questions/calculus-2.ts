import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Calculus 2 / Infinitesimal Analysis 2 diagnostic bank (12Q).
 * Display name: "חדו״א 2 / אינפי 2" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const CALCULUS_2_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "calc2-q01-vector-geometry-triangle",
    domain: "גאומטריה וקטורית ומכפלה וקטורית",
    title: "חדו״א 2 - גאומטריה וקטורית ומכפלה וקטורית",
    context:
      "נתונים שני וקטורים $\\vec{m}, \\vec{n} \\in \\mathbb{R}^3$ המקיימים $|\\vec{m}| = 3$, $|\\vec{n}| = 2$, והזווית ביניהם היא $\\frac{\\pi}{3}$. נגדיר שני וקטורים חדשים:",
    formulaLatex: "\\vec{a} = \\vec{m} - 2\\vec{n}, \\quad \\vec{b} = 2\\vec{m} + \\vec{n}",
    instruction:
      "מהו שטח המשולש ששתיים מצלעותיו נפרסות על ידי הווקטורים $\\vec{a}$ ו-$\\vec{b}$?",
    options: [
      {
        id: "calc2-q01-opt1",
        plainText: "$\\frac{15\\sqrt{3}}{2}$",
        mathText: "\\frac{15\\sqrt{3}}{2}",
        isCorrect: true,
        explanation:
          "נכון: שטח המשולש שווה למחצית גודל המכפלה הווקטורית $\\frac{1}{2}|\\vec{a} \\times \\vec{b}|$. נפתח את המכפלה לפי תכונותיה: $\\vec{a} \\times \\vec{b} = (\\vec{m} - 2\\vec{n}) \\times (2\\vec{m} + \\vec{n}) = \\vec{m} \\times \\vec{n} - 4(\\vec{n} \\times \\vec{m}) = 5(\\vec{m} \\times \\vec{n})$. גודל המכפלה הוא $5|\\vec{m}||\\vec{n}|\\sin(\\pi/3) = 5 \\cdot 3 \\cdot 2 \\cdot \\frac{\\sqrt{3}}{2} = 15\\sqrt{3}$. מחציתו היא $\\frac{15\\sqrt{3}}{2}$.",
      },
      {
        id: "calc2-q01-opt2",
        plainText: "$\\frac{15\\sqrt{3}}{4}$",
        mathText: "\\frac{15\\sqrt{3}}{4}",
        isCorrect: false,
        explanation:
          "שגוי: בוצעה חלוקה מיותרת ב-2 פעם נוספת, כאילו נוסחת שטח המשולש דורשת רבע מגודל המקבילון.",
      },
      {
        id: "calc2-q01-opt3",
        plainText: "$15\\sqrt{3}$",
        mathText: "15\\sqrt{3}",
        isCorrect: false,
        explanation:
          "שגוי: זהו שטח המקבילון הנפרס על ידי הווקטורים $|\\vec{a} \\times \\vec{b}|$, ולא שטח המשולש (נשכחה החלוקה ב-2).",
      },
      {
        id: "calc2-q01-opt4",
        plainText: "$\\frac{3\\sqrt{3}}{2}$",
        mathText: "\\frac{3\\sqrt{3}}{2}",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה זו מתקבלת מחישוב שגוי של פתיחת הסוגריים במכפלה הווקטורית ללא התחשבות באנטי-סימטריות (ביטול המקדמים ל-1 במקום ל-5).",
      },
    ],
  },
  {
    id: "calc2-q02-directional-derivatives-singularity",
    domain: "נגזרות חלקיות ונגזרת כיוונית",
    title: "חדו״א 2 - נגזרות חלקיות ונגזרת כיוונית",
    context:
      "תהי הפונקציה $f(x, y) = x^{1/3} y^{1/3}$. נתון וקטור הכיוון היחידתי $\\vec{u} = \\left(\\frac{1}{\\sqrt{2}}, -\\frac{1}{\\sqrt{2}}\\right)$.",
    formulaLatex:
      "f(x, y) = x^{1/3} y^{1/3}, \\quad \\vec{u} = \\left(\\frac{1}{\\sqrt{2}}, -\\frac{1}{\\sqrt{2}}\\right)",
    instruction:
      "מה ניתן לקבוע לגבי הנגזרות החלקיות בראשית והנגזרת הכיוונית $\\frac{\\partial f}{\\partial \\vec{u}}(0, 0)$?",
    options: [
      {
        id: "calc2-q02-opt1",
        plainText:
          "מתקיים $f_x(0,0) = f_y(0,0) = 0$, אך הנגזרת הכיוונית $\\frac{\\partial f}{\\partial \\vec{u}}(0,0)$ אינה קיימת.",
        mathText:
          "f_x(0,0) = f_y(0,0) = 0 \\quad \\land \\quad \\not\\exists \\frac{\\partial f}{\\partial \\vec{u}}(0,0)",
        isCorrect: true,
        explanation:
          "נכון: לפי הגדרת הנגזרת החלקית על הצירים, $f(x,0)=0$ ולכן $f_x(0,0)=0$, ובאופן זהה $f_y(0,0)=0$. מאידך, לפי הגדרת נגזרת כיוונית: $\\lim_{t \\to 0} \\frac{f(t/\\sqrt{2}, -t/\\sqrt{2}) - 0}{t} = \\lim_{t \\to 0} \\frac{-t^{2/3}/2^{1/3}}{t} = \\lim_{t \\to 0} \\frac{-1}{2^{1/3} t^{1/3}}$, וגבול זה אינו קיים (שואף לאינסוף).",
      },
      {
        id: "calc2-q02-opt2",
        plainText:
          "מתקיים $f_x(0,0) = f_y(0,0) = 0$ וגם הנגזרת הכיוונית מתאפסת: $\\frac{\\partial f}{\\partial \\vec{u}}(0,0) = 0$.",
        mathText:
          "f_x(0,0) = f_y(0,0) = \\frac{\\partial f}{\\partial \\vec{u}}(0,0) = 0",
        isCorrect: false,
        explanation:
          "שגוי: הכלל $\\frac{\\partial f}{\\partial \\vec{u}} = \\nabla f \\cdot \\vec{u}$ תקף אך ורק כאשר הפונקציה דיפרנציאבילית. כאן הפונקציה אינה דיפרנציאבילית בראשית, והגבול הישיר מתבדר.",
      },
      {
        id: "calc2-q02-opt3",
        plainText:
          "הנגזרות החלקיות $f_x(0,0)$ ו-$f_y(0,0)$ אינן קיימות בגלל החזקה השברית $1/3$.",
        isCorrect: false,
        explanation:
          "שגוי: על הצירים עצמם הפונקציה מתאפסת זהותית ($f(x,0)=0$), ולכן גבול מנת ההפרשים קיים ושווה בדיוק לאפס.",
      },
      {
        id: "calc2-q02-opt4",
        plainText:
          "מתקיים $f_x(0,0) = f_y(0,0) = 0$, והנגזרת הכיוונית שווה ל-$\\frac{\\partial f}{\\partial \\vec{u}}(0,0) = -1$.",
        mathText: "\\frac{\\partial f}{\\partial \\vec{u}}(0,0) = -1",
        isCorrect: false,
        explanation:
          "שגוי: ערך זה מתקבל מחישוב שגוי של המונה מבלי לחלק ב-$t$ עד תום במסגרת הגדרת הגבול.",
      },
    ],
  },
  {
    id: "calc2-q03-double-integral-order-change",
    domain: "אינטגרלים כפולים והחלפת סדר אינטגרציה",
    title: "חדו״א 2 - אינטגרלים כפולים והחלפת סדר אינטגרציה",
    context: "נתון האינטגרל הכפול הבא בתחום $D$:",
    formulaLatex:
      "I = \\iint_D x e^{y^2} \\, dxdy, \\quad D = \\{(x,y) \\mid 0 \\le x \\le 1, \\; x^2 \\le y \\le 1\\}",
    instruction: "מהו ערכו של האינטגרל $I$?",
    options: [
      {
        id: "calc2-q03-opt1",
        plainText: "$\\frac{e - 1}{4}$",
        mathText: "\\frac{e - 1}{4}",
        isCorrect: true,
        explanation:
          "נכון: החלפת סדר אינטגרציה מעבירה את התחום ל-$0 \\le y \\le 1$ ו-$0 \\le x \\le \\sqrt{y}$. נקבל: $\\int_0^1 e^{y^2} \\left(\\int_0^{\\sqrt{y}} x dx\\right) dy = \\int_0^1 e^{y^2} \\left[\\frac{x^2}{2}\\right]_0^{\\sqrt{y}} dy = \\int_0^1 \\frac{y}{2} e^{y^2} dy = \\left[\\frac{1}{4} e^{y^2}\\right]_0^1 = \\frac{e - 1}{4}$.",
      },
      {
        id: "calc2-q03-opt2",
        plainText: "$\\frac{e - 1}{2}$",
        mathText: "\\frac{e - 1}{2}",
        isCorrect: false,
        explanation:
          "שגוי: נשמט הפקטור $1/2$ המגיע מאינטגרציית $x$ ביחס ל-$dx$ (הוצב בטעות $y$ במקום $y/2$).",
      },
      {
        id: "calc2-q03-opt3",
        plainText: "$\\frac{e - 2}{3}$",
        mathText: "\\frac{e - 2}{3}",
        isCorrect: false,
        explanation:
          "שגוי: זוהי תוצאה של הנחה שגויה לגבי גבולות האינטגרציה כאילו מדובר במשולש ולא בפרבולה.",
      },
      {
        id: "calc2-q03-opt4",
        plainText: "$\\frac{e}{4}$",
        mathText: "\\frac{e}{4}",
        isCorrect: false,
        explanation:
          "שגוי: נשכחה החסרת הגבול התחתון בהצבת $y=0$ לתוך האיבר $\\frac{1}{4}e^{y^2}$ ($e^0 = 1$).",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "calc2-q04-arc-length-ftc",
    domain: "אורך עקום ואינטגרל עם גבול משתנה",
    title: "חדו״א 2 - אורך עקום ואינטגרל עם גבול משתנה",
    context:
      "נתון עקום פרמטרי במישור $\\vec{r}(t)$ המוגדר באמצעות אינטגרלים עבור תחום הפרמטר $2 \\le t \\le 4$:",
    formulaLatex:
      "\\vec{r}(t) = \\left( \\int_1^t \\frac{\\cos w}{w} \\, dw, \\; \\int_1^t \\frac{\\sin w}{w} \\, dw \\right), \\quad 2 \\le t \\le 4",
    instruction: "מהו אורך העקום הנתון?",
    options: [
      {
        id: "calc2-q04-opt1",
        plainText: "$\\ln 4$",
        mathText: "\\ln 4",
        isCorrect: false,
        explanation:
          "שגוי: נשכחה החסרת הגבול התחתון באינטגרל: $\\int_2^4 \\frac{1}{t}dt = \\ln 4 - \\ln 2$, ולא $\\ln 4$.",
      },
      {
        id: "calc2-q04-opt2",
        plainText: "$\\ln 2$",
        mathText: "\\ln 2",
        isCorrect: true,
        explanation:
          "נכון: לפי המשפט היסודי של החדו״א, וקטור המהירות הוא $\\vec{r}'(t) = \\left(\\frac{\\cos t}{t}, \\frac{\\sin t}{t}\\right)$. גודלו הוא $|\\vec{r}'(t)| = \\sqrt{\\frac{\\cos^2 t + \\sin^2 t}{t^2}} = \\frac{1}{t}$ (עבור $t>0$). אורך העקום הוא $L = \\int_2^4 \\frac{1}{t} dt = [\\ln t]_2^4 = \\ln 4 - \\ln 2 = \\ln(4/2) = \\ln 2$.",
      },
      {
        id: "calc2-q04-opt3",
        plainText: "$\\frac{1}{2} \\ln 2$",
        mathText: "\\frac{1}{2} \\ln 2",
        isCorrect: false,
        explanation:
          "שגוי: פקטור $1/2$ נוסף בטעות כתוצאה מטיפול שגוי בריבוע מהירות הנורמה.",
      },
      {
        id: "calc2-q04-opt4",
        plainText: "$2$",
        mathText: "2",
        isCorrect: false,
        explanation:
          "שגוי: חושב ההפרש בין קצוות הזמן $4-2=2$ ללא אינטגרציה של פונקציית המהירות $1/t$.",
      },
    ],
  },
  {
    id: "calc2-q05-tangent-intersection-surfaces",
    domain: "חיתוך משטחים וישר משיק",
    title: "חדו״א 2 - חיתוך משטחים וישר משיק",
    context: "יהי $L$ עקום החיתוך בין שני המשטחים $S_1$ ו-$S_2$ במרחב:",
    formulaLatex:
      "S_1: x^2 y z + x y^2 z + x y z^2 = 3, \\quad S_2: 3x^3 - y^3 + z^3 = 3",
    instruction:
      "איזה מהווקטורים הבאים מקביל לישר המשיק לעקום $L$ בנקודה $(1, 1, 1)$?",
    options: [
      {
        id: "calc2-q05-opt1",
        plainText: "$(1, -1, 2)$",
        mathText: "(1, -1, 2)",
        isCorrect: false,
        explanation:
          "שגוי: וקטור זה אינו מאונך לגרדיאנט של משטח $S_1$ (המכפלה הסקלרית עם $(1,1,1)$ אינה מתאפסת: $1-1+2 = 2 \\neq 0$).",
      },
      {
        id: "calc2-q05-opt2",
        plainText: "$(1, 1, -2)$",
        mathText: "(1, 1, -2)",
        isCorrect: true,
        explanation:
          "נכון: וקטור המשיק לעקום חיתוך מקביל למכפלה הווקטורית של שני הגרדיאנטים $\\nabla F_1 \\times \\nabla F_2$. בנקודה $(1,1,1)$: $\\nabla F_1(1,1,1) = (4, 4, 4) \\parallel (1, 1, 1)$, ו-$\\nabla F_2(1,1,1) = (9, -3, 3) \\parallel (3, -1, 1)$. המכפלה הווקטורית: $(1, 1, 1) \\times (3, -1, 1) = (2, 2, -4) \\parallel (1, 1, -2)$.",
      },
      {
        id: "calc2-q05-opt3",
        plainText: "$(2, -1, 1)$",
        mathText: "(2, -1, 1)",
        isCorrect: false,
        explanation:
          "שגוי: וקטור זה אינו מאונך לגרדיאנט של המשטח הראשון (המכפלה עם $(1,1,1)$ שווה $2 \\neq 0$).",
      },
      {
        id: "calc2-q05-opt4",
        plainText: "$(1, 2, 3)$",
        mathText: "(1, 2, 3)",
        isCorrect: false,
        explanation:
          "שגוי: וקטור שרירותי שאינו עונה על התנאי הגאומטרי של השתייכות לשני המישורים המשיקים בו-זמנית.",
      },
    ],
  },
  {
    id: "calc2-q06-torus-surface-area",
    domain: "שטח משטח פרמטרי (טורוס)",
    title: "חדו״א 2 - שטח משטח פרמטרי (טורוס)",
    context:
      "נתון משטח פרמטרי במרחב המוגדר עבור הפרמטרים $0 \\le u, v \\le 2\\pi$:",
    formulaLatex:
      "\\vec{r}(u, v) = \\big((2 + \\cos u)\\cos v, \\; (2 + \\cos u)\\sin v, \\; \\sin u\\big)",
    instruction: "מהו שטחו הכולל של משטח זה?",
    options: [
      {
        id: "calc2-q06-opt1",
        plainText: "$4\\pi^2$",
        mathText: "4\\pi^2",
        isCorrect: false,
        explanation:
          "שגוי: שטח זה מתקבל כאשר רדיוס הסיבוב הוא $R=1$, בעוד שבמשוואה הנתונה $R=2$.",
      },
      {
        id: "calc2-q06-opt2",
        plainText: "$8\\pi^2$",
        mathText: "8\\pi^2",
        isCorrect: true,
        explanation:
          "נכון: המשטח מתאר טורוס סיבוב של מעגל ברדיוס $r=1$ סביב ציר $z$ במרחק ציר $R=2$. לפי משפט פאפוס (או חישוב ישיר של מכפלת הנגזרות $\\sqrt{EG-F^2} = 2+\\cos u$), השטח שווה ל-$(2\\pi r)(2\\pi R) = (2\\pi \\cdot 1)(2\\pi \\cdot 2) = 8\\pi^2$.",
      },
      {
        id: "calc2-q06-opt3",
        plainText: "$16\\pi^2$",
        mathText: "16\\pi^2",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה הנובעת משימוש שגוי ברדיוס הריבועי $R^2$ במקום $R$ בנוסחת פאפוס לשטח מעטפת.",
      },
      {
        id: "calc2-q06-opt4",
        plainText: "$32\\pi^2$",
        mathText: "32\\pi^2",
        isCorrect: false,
        explanation:
          "שגוי: זוהי הכפלה כפולה של ממדי הטורוס שאינה תואמת את נוסחת השטח הדו-ממדית.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "calc2-q07-volume-slicing-cylinder",
    domain: "אינטגרלים משולשים וחלוקת נפח",
    title: "חדו״א 2 - אינטגרלים משולשים וחלוקת נפח",
    context:
      "נתון הגוף התחום $V = \\{(x, y, z) \\mid 0 \\le z \\le x^2 + y^2 \\le 1\\}$. המישור $z = a$ (כאשר $0 < a < 1$) מחלק את הגוף לשני חלקים בעלי נפח שווה לחלוטין.",
    formulaLatex:
      "V = \\{(x, y, z) \\mid 0 \\le z \\le x^2 + y^2 \\le 1\\}, \\quad z = a",
    instruction: "מהו ערכו של הפרמטר $a$?",
    options: [
      {
        id: "calc2-q07-opt1",
        plainText: "$\\frac{1}{2}$",
        mathText: "\\frac{1}{2}",
        isCorrect: false,
        explanation:
          "שגוי: שטחי החתכים האופקיים $A(z) = \\pi(1-z)$ אינם קבועים אלא ליניאריים ב-$z$, ולכן נקודת חצי הנפח אינה באמצע הגובה.",
      },
      {
        id: "calc2-q07-opt2",
        plainText: "$\\frac{1}{\\sqrt{2}}$",
        mathText: "\\frac{1}{\\sqrt{2}}",
        isCorrect: false,
        explanation:
          "שגוי: זהו השורש של חצי, אך פתרון המשוואה הריבועית לנפח מניב $1 - 1/\\sqrt{2}$.",
      },
      {
        id: "calc2-q07-opt3",
        plainText: "$1 - \\frac{1}{\\sqrt{2}}$",
        mathText: "1 - \\frac{1}{\\sqrt{2}}",
        isCorrect: true,
        explanation:
          "נכון: שטח חתך אופקי בגובה $z$ הוא טבעת שבין $r^2=z$ ל-$r^2=1$, כלומר $A(z) = \\pi(1 - z)$. הנפח הכולל: $V = \\int_0^1 \\pi(1-z)dz = \\frac{\\pi}{2}$. הנפח שמתחת ל-$z=a$ הוא $\\int_0^a \\pi(1-z)dz = \\pi\\left(a - \\frac{a^2}{2}\\right)$. נשווה למחצית הנפח $\\frac{\\pi}{4}$: נקבל $a - \\frac{a^2}{2} = \\frac{1}{4} \\implies 2a^2 - 4a + 1 = 0$. מאחר ש-$a \\in (0,1)$, הפתרון היחיד הוא $a = \\frac{4 - \\sqrt{8}}{4} = 1 - \\frac{\\sqrt{2}}{2} = 1 - \\frac{1}{\\sqrt{2}}$.",
      },
      {
        id: "calc2-q07-opt4",
        plainText: "$\\frac{1}{\\sqrt{3}}$",
        mathText: "\\frac{1}{\\sqrt{3}}",
        isCorrect: false,
        explanation:
          "שגוי: ערך זה מתקבל כאשר הנפח תלוי בחזקה ריבועית של שטח החתך (כמו בחרוט מלא), ולא בגוף הנתון.",
      },
    ],
  },
  {
    id: "calc2-q08-flux-gauss-divergence-hemisphere",
    domain: "משפט הדיברגנס (גאוס) ושטף שדה וקטורי",
    title: "חדו״א 2 - משפט הדיברגנס (גאוס) ושטף שדה וקטורי",
    context:
      "נתון השדה הווקטורי $\\vec{F}$ והמשטח הפתוח $S$ (חצי כדור) עם נורמל בעל רכיב $x$ אי-שלילי ($n_x \\ge 0$):",
    formulaLatex:
      "\\vec{F} = \\big(x y^2, \\; y z^2 + x z e^{\\sin(z^2)}, \\; z x^2 + e^{x^2}\\big), \\quad S = \\{(x,y,z) \\mid x^2+y^2+z^2=9, \\; x \\ge 0\\}",
    instruction:
      "מהו שטף השדה $\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS$ דרך המשטח $S$?",
    options: [
      {
        id: "calc2-q08-opt1",
        plainText: "$\\frac{3^4\\pi}{5}$",
        mathText: "\\frac{3^4\\pi}{5}",
        isCorrect: false,
        explanation:
          "שגוי: נשמט מקדם באינטגרל הכדורי עקב חישוב שגוי של אינטגרל הרדיוס.",
      },
      {
        id: "calc2-q08-opt2",
        plainText: "$\\frac{3^5\\pi}{2}$",
        mathText: "\\frac{3^5\\pi}{2}",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה הנובעת מאי-הכללת יעקוביאן הקואורדינטות הכדוריות $\\rho^2 \\sin\\phi$.",
      },
      {
        id: "calc2-q08-opt3",
        plainText: "$\\frac{2 \\cdot 3^5\\pi}{5}$",
        mathText: "\\frac{2 \\cdot 3^5\\pi}{5}",
        isCorrect: true,
        explanation:
          "נכון: הדיברגנס הוא $\\operatorname{div}\\vec{F} = y^2 + z^2 + x^2 = r^2$. נסגור את חצי הכדור בעזרת עיגול הבסיס במישור $x=0$ ($y^2+z^2\\le 9$). על עיגול זה הנורמל החיצוני הוא $(-1,0,0)$, והשטף דרכו הוא $\\iint -F_1 dS$. מאחר שעל המישור $x=0$, נקבל $F_1 = 0 \\cdot y^2 = 0$, ולכן השטף דרך הבסיס מתאפס! לפי גאוס, השטף דרך $S$ שווה ישירות לאינטגרל המשולש של הדיברגנס על חצי הכדור: $\\iiint_V \\rho^2 \\, dV = (2\\pi) \\int_0^3 \\rho^4 d\\rho = 2\\pi \\cdot \\frac{3^5}{5} = \\frac{2 \\cdot 3^5\\pi}{5}$.",
      },
      {
        id: "calc2-q08-opt4",
        plainText: "$24\\pi$",
        mathText: "24\\pi",
        isCorrect: false,
        explanation:
          "שגוי: ערך זה מתקבל אם הדיברגנס היה קבוע (נפח חצי הכדור מוכפל בקבוע שגוי).",
      },
    ],
  },
  {
    id: "calc2-q09-stokes-theorem-plane-curve",
    domain: "משפט סטוקס ועבודה במישור",
    title: "חדו״א 2 - משפט סטוקס ועבודה במישור",
    context:
      "נתון השדה הווקטורי $\\vec{F}(x,y,z) = (yz - y, \\; xz, \\; xy + y - x - 1)$. יהי $\\Pi$ המישור $Ax + By + Cz + D = 0$, כאשר ידוע כי $A + B + C = 0$. יהי $L$ עקום חלק, פשוט וסגור המוכל כולו במישור $\\Pi$.",
    formulaLatex:
      "\\vec{\\nabla} \\times \\vec{F} = (1, 1, 1), \\quad \\Pi: Ax+By+Cz+D=0 \\quad (A+B+C=0)",
    instruction:
      "מהי עבודת השדה $\\oint_L \\vec{F} \\cdot d\\vec{r}$ לאורך העקום הסגור $L$?",
    options: [
      {
        id: "calc2-q09-opt1",
        plainText:
          "העבודה שווה לשטח התחום המישורי המוקף על ידי העקום $L$ מוכפל ב-$\\sqrt{A^2+B^2+C^2}$.",
        isCorrect: false,
        explanation:
          "שגוי: המכפלה הסקלרית בין הרוטור לנורמל המישור מתאפסת זהותית, ולכן השטח אינו משפיע על התוצאה.",
      },
      {
        id: "calc2-q09-opt2",
        plainText: "העבודה תלויה בפרמטר החופשי $D$ ושווה ל-$2\\pi D$.",
        isCorrect: false,
        explanation:
          "שגוי: מרחק המישור מהראשית ($D$) אינו משפיע על כיוון הנורמל, והאינטגרנד נותר אפס בכל מקרה.",
      },
      {
        id: "calc2-q09-opt3",
        plainText:
          "העבודה מתאפסת תמיד ($\\oint_L \\vec{F} \\cdot d\\vec{r} = 0$), מכיוון שהרוטור קבוע $(1,1,1)$ ומאונך לנורמל המישור.",
        mathText: "\\oint_L \\vec{F} \\cdot d\\vec{r} = 0",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט סטוקס, $\\oint_L \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\vec{\\nabla} \\times \\vec{F}) \\cdot \\hat{n} \\, dS$. נחשב את הרוטור: $\\vec{\\nabla} \\times \\vec{F} = (x+1-x, \\; -(y-(y-1)), \\; z-(z-1)) = (1, 1, 1)$. וקטור הנורמל למישור הוא $\\vec{n} = (A, B, C)$. המכפלה הסקלרית היא $(\\vec{\\nabla} \\times \\vec{F}) \\cdot \\vec{n} = 1\\cdot A + 1\\cdot B + 1\\cdot C = A+B+C = 0$. מכיוון שהאינטגרנד מתאפס בכל נקודה במשטח, העבודה מתאפסת בהכרח.",
      },
      {
        id: "calc2-q09-opt4",
        plainText:
          "העבודה מתאפסת אך ורק אם העקום $L$ סימטרי ביחס לראשית הצירים.",
        isCorrect: false,
        explanation:
          "שגוי: ההתאפסות נובעת מאורתוגונליות הרוטור לנורמל המישור לכל אורך המשטח, ללא כל תלות בצורת העקום או בסימטריה שלו.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "calc2-q10-lagrange-multipliers-ellipse",
    domain: "קיצון תחת אילוץ וכופלי לגראנז׳",
    title: "חדו״א 2 - קיצון תחת אילוץ וכופלי לגראנז׳",
    context: "נתונה הפונקציה $f(x, y) = xy$ בתחום האליפטי הסגור והחסום:",
    formulaLatex: "D = \\{(x, y) \\mid x^2 + 2y^2 \\le 4\\}",
    instruction:
      "מהם הערכים המקסימליים והמינימליים המוחלטים של $f$ בתחום $D$?",
    options: [
      {
        id: "calc2-q10-opt1",
        plainText: "מקסימום מוחלט $2$, ומינימום מוחלט $-2$.",
        isCorrect: false,
        explanation:
          "שגוי: ערכים אלו היו מתקבלים עבור מעגל ברדיוס 2 ($x^2+y^2 \\le 4$), אך האילוץ הנוכחי מכווץ את ציר $y$ בפקטור $\\sqrt{2}$.",
      },
      {
        id: "calc2-q10-opt2",
        plainText: "מקסימום מוחלט $1$, ומינימום מוחלט $-1$.",
        isCorrect: false,
        explanation:
          "שגוי: ערכים אלו מתקבלים בנקודות שאינן שפת האליפסה המרבית.",
      },
      {
        id: "calc2-q10-opt3",
        plainText:
          "מקסימום מוחלט $2\\sqrt{2}$, ומינימום מוחלט $-2\\sqrt{2}$.",
        isCorrect: false,
        explanation:
          "שגוי: ערך זה חורג מגבולות התחום ונובע מחלוקה שגויה של משוואת לגראנז׳.",
      },
      {
        id: "calc2-q10-opt4",
        plainText:
          "מקסימום מוחלט $\\sqrt{2}$, ומינימום מוחלט $-\\sqrt{2}$.",
        mathText: "\\max f = \\sqrt{2}, \\quad \\min f = -\\sqrt{2}",
        isCorrect: true,
        explanation:
          "נכון: בפנים התחום, הנקודה הקריטית היחידה היא $(0,0)$ שבה $f=0$. על השפה $g(x,y) = x^2+2y^2 = 4$, נפעיל כופלי לגראנז': $\\nabla f = \\lambda \\nabla g \\implies (y, x) = \\lambda(2x, 4y)$. מכאן $\\lambda = \\frac{y}{2x} = \\frac{x}{4y} \\implies 4y^2 = 2x^2 \\implies x^2 = 2y^2$. נציב באילוץ: $2y^2 + 2y^2 = 4 \\implies y^2 = 1 \\implies y = \\pm 1$, ומכאן $x^2 = 2 \\implies x = \\pm \\sqrt{2}$. בנקודות אלו מקבלים $f(\\pm\\sqrt{2}, \\pm 1) = \\pm\\sqrt{2}$.",
      },
    ],
  },
  {
    id: "calc2-q11-gauss-point-singularity-flux",
    domain: "שדות בעלי נקודת סינגולריות ומשפט גאוס",
    title: "חדו״א 2 - שדות בעלי נקודת סינגולריות ומשפט גאוס",
    context:
      "נתון שדה וקטורי מרכזי בעל סינגולריות בראשית $\\vec{F}(x,y,z) = \\frac{(x,y,z)}{(x^2+y^2+z^2)^{3/2}}$ (המוגדר לכל $\\mathbb{R}^3 \\setminus \\{(0,0,0)\\}$). נתון המשטח $S$ עם נורמל המכוון כלפי מעלה ($n_z > 0$):",
    formulaLatex:
      "S = \\left\\{ (x,y,z) \\;\\middle|\\; z = 1 - \\frac{(1-x^2-y^2)^{100}}{2}, \\; x^2+y^2 \\le 1 \\right\\}",
    instruction:
      "מהו שטף השדה $\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS$ דרך המשטח הנתון?",
    options: [
      {
        id: "calc2-q11-opt1",
        plainText: "$4\\pi$",
        mathText: "4\\pi",
        isCorrect: false,
        explanation:
          "שגוי: $4\\pi$ הוא השטף דרך משטח סגור המכיל את הראשית בתוכו (חוק גאוס למטען נקודתי), אך כאן הראשית נמצאת מחוץ לתחום.",
      },
      {
        id: "calc2-q11-opt2",
        plainText: "$0$",
        mathText: "0",
        isCorrect: false,
        explanation:
          "שגוי: המשטח $S$ הוא משטח פתוח ולא משטח סגור, ולכן השטף דרכו לבדו אינו מתאפס.",
      },
      {
        id: "calc2-q11-opt3",
        plainText: "$2\\pi$",
        mathText: "2\\pi",
        isCorrect: false,
        explanation:
          "שגוי: זוהי תוצאת השטף של חצי כדור סביב הראשית, ואינה לוקחת בחשבון את המרחק $z=1$.",
      },
      {
        id: "calc2-q11-opt4",
        plainText: "$2\\pi\\left(1 - \\frac{1}{\\sqrt{2}}\\right)$",
        mathText: "2\\pi\\left(1 - \\frac{1}{\\sqrt{2}}\\right)",
        isCorrect: true,
        explanation:
          "נכון: על $S$ מתקיים $1/2 \\le z \\le 1$, ולכן הנקודה הסינגולרית $(0,0,0)$ נמצאת מחוץ לנפח הכלוא בין $S$ לבין המכסה המישורי $D: x^2+y^2\\le 1, z=1$. מאחר ש-$\\operatorname{div}\\vec{F} = 0$, השטף דרך $S$ עם נורמל למעלה שווה בדיוק לשטף דרך המכסה $D$ עם נורמל למעלה $(0,0,1)$: $\\iint_D \\frac{1}{(r^2+1)^{3/2}} r\\,dr\\,d\\theta = 2\\pi \\left[ -\\frac{1}{\\sqrt{r^2+1}} \\right]_0^1 = 2\\pi\\left(1 - \\frac{1}{\\sqrt{2}}\\right)$.",
      },
    ],
  },
  {
    id: "calc2-q12-hessian-matrix-determinant",
    domain: "מטריצת הסיאן ומיון נקודות קריטיות",
    title: "חדו״א 2 - מטריצת הסיאן ומיון נקודות קריטיות",
    context:
      "תהי $f(x, y)$ פונקציה בעלת נגזרות חלקיות מסדר שני רציפות ($C^2$). תהי $(x_0, y_0)$ נקודה קריטית שבה הדטרמיננטה של מטריצת הסיאן חיובית ממש:",
    formulaLatex:
      "\\det H(x_0, y_0) = \\det \\begin{pmatrix} f_{xx}(x_0, y_0) & f_{xy}(x_0, y_0) \\\\ f_{xy}(x_0, y_0) & f_{yy}(x_0, y_0) \\end{pmatrix} > 0",
    instruction:
      "מה ניתן להסיק בוודאות לגבי הנגזרות החלקיות השניות $f_{xx}(x_0, y_0)$ ו-$f_{yy}(x_0, y_0)$?",
    options: [
      {
        id: "calc2-q12-opt1",
        plainText:
          "בהכרח מתקיים $f_{xx}(x_0, y_0) > 0$ וגם $f_{yy}(x_0, y_0) > 0$, והנקודה היא תמיד נקודת מינימום מקומי.",
        isCorrect: false,
        explanation:
          "שגוי: הנגזרות יכולות להיות שתיהן שליליות ממש, ואז הנקודה היא נקודת מקסימום מקומי (למשל עבור $f(x,y) = -x^2 - y^2$).",
      },
      {
        id: "calc2-q12-opt2",
        plainText: "הנגזרת המעורבת בהכרח מתאפסת: $f_{xy}(x_0, y_0) = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: הנגזרת המעורבת יכולה לקבל כל ערך, כל עוד המכפלה $f_{xx}f_{yy}$ גדולה יותר מ-$(f_{xy})^2$.",
      },
      {
        id: "calc2-q12-opt3",
        plainText:
          "אחת הנגזרות יכולה להתאפס כל עוד הנגזרת השנייה גדולה ממנה בהרבה.",
        isCorrect: false,
        explanation:
          "שגוי: אם אחת מהן הייתה מתאפסת, המכפלה $f_{xx}f_{yy}$ הייתה $0$, ואז הדטרמיננטה הייתה $-(f_{xy})^2 \\le 0$, בסתירה לנתון שהיא חיובית ממש.",
      },
      {
        id: "calc2-q12-opt4",
        plainText:
          "שתי הנגזרות $f_{xx}$ ו-$f_{yy}$ בהכרח שונות מאפס ובעלות אותו סימן בדיוק (שתיהן חיוביות או שתיהן שליליות).",
        mathText: "f_{xx}(x_0,y_0) \\cdot f_{yy}(x_0,y_0) > 0",
        isCorrect: true,
        explanation:
          "נכון: הדטרמיננטה מוגדרת כ-$f_{xx}f_{yy} - (f_{xy})^2 > 0$, כלומר $f_{xx}f_{yy} > (f_{xy})^2 \\ge 0$. מכפלת שני מספרים שהיא חיובית ממש מחייבת ששני המספרים יהיו שונים מאפס ובעלי אותו סימן בדיוק (שניהם חיוביים לקבלת מינימום, או שניהם שליליים לקבלת מקסימום).",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_CALC2_QUESTIONS = CALCULUS_2_QUESTIONS;

/**
 * Onboarding sample: one from blocks A and B, one from combined C+D, then shuffle.
 */
export function sampleCalculus2OnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = CALCULUS_2_QUESTIONS.slice(0, 3);
  const groupB = CALCULUS_2_QUESTIONS.slice(3, 6);
  const groupC = CALCULUS_2_QUESTIONS.slice(6, 12);

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
