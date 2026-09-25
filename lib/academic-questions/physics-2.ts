import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Physics 2 — Electricity & Magnetism diagnostic bank (12Q).
 * Display name: "פיזיקה 2 - חשמל ומגנטיות" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const PHYSICS_2_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "phys2-q01-dielectric-slab-capacitance",
    domain: "קבלים וחומרים דיאלקטריים לא-אחידים",
    title: "פיזיקה 2 - קבלים וחומרים דיאלקטריים לא-אחידים",
    context:
      "בין שני לוחות קבל מישורי בעלי שטח $A$ והפרדה $d$ ($d \\ll \\sqrt{A}$) מוכנס חומר דיאלקטרי שהמקדם הדיאלקטרי היחסי שלו משתנה ליניארית עם המרחק מהלוח השמאלי: $\\epsilon_r(x) = 1 + \\frac{x}{d}$.",
    formulaLatex:
      "\\epsilon_r(x) = 1 + \\frac{x}{d}, \\quad \\frac{1}{C} = \\int_0^d \\frac{dx}{\\epsilon_0 \\epsilon_r(x) A}",
    instruction: "מהו הקיבול השקול $C$ של הקבל?",
    options: [
      {
        id: "phys2-q01-opt1",
        plainText: "$C = \\frac{\\epsilon_0 A}{d \\ln 2}$",
        mathText: "C = \\frac{\\epsilon_0 A}{d \\ln 2}",
        isCorrect: true,
        explanation:
          "נכון: ניתן לחשוב על הקבל כאינסוף קבלים אינפיניטסימליים המחוברים בטור. קיבול של שכבה בעובי $dx$ הוא $dC = \\frac{\\epsilon_0 \\epsilon_r(x) A}{dx}$. סכימת הטור: $\\frac{1}{C} = \\int_0^d \\frac{dx}{\\epsilon_0 (1 + x/d) A} = \\frac{d}{\\epsilon_0 A} \\int_0^d \\frac{dx}{d + x} = \\frac{d}{\\epsilon_0 A} [\\ln(2d) - \\ln d] = \\frac{d \\ln 2}{\\epsilon_0 A}$. היפוך השבר נותן $C = \\frac{\\epsilon_0 A}{d \\ln 2}$.",
      },
      {
        id: "phys2-q01-opt2",
        plainText: "$C = \\frac{3\\epsilon_0 A}{2d}$",
        mathText: "C = \\frac{3\\epsilon_0 A}{2d}",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה הנובעת מחישוב ממוצע אריתמטי נאיבי של המקדם הדיאלקטרי ($\\bar{\\epsilon}_r = 1.5$), התקף לחיבור במקביל ולא בטור.",
      },
      {
        id: "phys2-q01-opt3",
        plainText: "$C = \\frac{\\epsilon_0 A \\ln 2}{d}$",
        mathText: "C = \\frac{\\epsilon_0 A \\ln 2}{d}",
        isCorrect: false,
        explanation:
          "שגוי: טעות בהיפוך המונה והמכנה בסיום אינטגרציית הטור.",
      },
      {
        id: "phys2-q01-opt4",
        plainText: "$C = \\frac{2\\epsilon_0 A}{d}$",
        mathText: "C = \\frac{2\\epsilon_0 A}{d}",
        isCorrect: false,
        explanation:
          "שגוי: שימוש בערך הדיאלקטרי המקסימלי בשפה הימנית $\\epsilon_r(d) = 2$ לאורך כל הקבל.",
      },
    ],
  },
  {
    id: "phys2-q02-non-uniform-resistor-volume-charge",
    domain: "זרם מתמיד והצטברות מטען נפחי בנגד לא-הומוגני",
    title: "פיזיקה 2 - זרם מתמיד והצטברות מטען נפחי בנגד לא-הומוגני",
    context:
      "נגד גלילי בעל שטח חתך $A$ ואורך $L$ מחובר למתח $V$. ההתנגדות הסגולית תלויה במיקום: $\\rho(x) = \\rho_0 \\frac{x^2}{L^2}$ ($0 \\le x \\le L$). במערכת זורם זרם מתמיד $I$.",
    formulaLatex:
      "R = \\int_0^L \\frac{\\rho(x)}{A}\\,dx = \\frac{\\rho_0 L}{3A}, \\quad E(x) = \\rho(x) J = \\frac{3V x^2}{L^3}",
    instruction:
      "מהי צפיפות המטען הנפחית $\\rho_e(x)$ בתוך הנגד כפונקציה של המיקום $x$?",
    options: [
      {
        id: "phys2-q02-opt1",
        plainText: "$\\rho_e(x) = \\frac{6\\epsilon_0 V x}{L^3}$",
        mathText: "\\rho_e(x) = \\frac{6\\epsilon_0 V x}{L^3}",
        isCorrect: true,
        explanation:
          "נכון: הזרם הוא $I = V/R = \\frac{3VA}{\\rho_0 L}$ וצפיפות הזרם היא $J = \\frac{3V}{\\rho_0 L}$. השדה החשמלי הוא $E(x) = \\rho(x) J = \\frac{3V x^2}{L^3}$. לפי חוק גאוס הדיפרנציאלי: $\\rho_e(x) = \\epsilon_0 \\frac{dE}{dx} = \\epsilon_0 \\frac{d}{dx}\\left(\\frac{3V x^2}{L^3}\\right) = \\frac{6\\epsilon_0 V x}{L^3}$. במוליך לא אחיד נוצר מטען נפחי פנימי כדי לקיים זרם קבוע.",
      },
      {
        id: "phys2-q02-opt2",
        plainText: "$\\rho_e(x) = 0$ בכל מקום בתוך הנגד.",
        isCorrect: false,
        explanation:
          "שגוי: תכונת איפוס המטען הפנימי נכונה למוליך בעל התנגדות סגולית אחידה. כאשר ההתנגדות משתנה במרחב, $\\vec{\\nabla}\\cdot\\vec{E} \\neq 0$ ונוצר מטען פנימי.",
      },
      {
        id: "phys2-q02-opt3",
        plainText: "$\\rho_e(x) = \\frac{3\\epsilon_0 V x^2}{L^3}$",
        isCorrect: false,
        explanation:
          "שגוי: שכחת פעולת הנגזרת של השדה החשמלי בחוק גאוס הדיפרנציאלי ($d(x^2)/dx = 2x$).",
      },
      {
        id: "phys2-q02-opt4",
        plainText: "$\\rho_e(x) = \\frac{2\\epsilon_0 V}{L^2}$",
        isCorrect: false,
        explanation:
          "שגוי: הנחה שגויה שהשדה משתנה ליניארית ולכן צפיפות המטען קבועה במרחב.",
      },
    ],
  },
  {
    id: "phys2-q03-rotating-cone-magnetic-field",
    domain: "שדות מגנטיים של גופים מסתובבים",
    title: "פיזיקה 2 - שדות מגנטיים של גופים מסתובבים",
    context:
      "חרוט בעל גובה $h$ ורדיוס בסיס $h$ ניצב כשקודקודו בראשית הצירים וצירו לאורך ציר $z$. מעטפת החרוט טעונה בצפיפות משטחית $\\sigma(z) = \\sigma_0 \\frac{z}{h}$. מסובבים את החרוט סביב צירו במהירות זוויתית קבועה $\\omega \\hat{z}$.",
    formulaLatex:
      "\\sigma(z) = \\frac{\\sigma_0 z}{h}, \\quad dI(z) = \\frac{\\sqrt{2}\\omega \\sigma_0}{h} z^2 dz",
    instruction:
      "מהו וקטור השדה המגנטי $\\vec{B}$ בראשית הצירים (בקודקוד החרוט)?",
    options: [
      {
        id: "phys2-q03-opt1",
        plainText: "$\\vec{B} = \\frac{\\mu_0 \\omega \\sigma_0 h}{8} \\hat{z}$",
        mathText: "\\vec{B} = \\frac{\\mu_0 \\omega \\sigma_0 h}{8} \\hat{z}",
        isCorrect: true,
        explanation:
          "נכון: נחלק את החרוט לטבעות בגובה $z$ ורדיוס $r=z$ (זווית פריסה של $45^\\circ$, $r=z$). אלמנט המטען של טבעת הוא $dq = 2\\sqrt{2}\\pi \\frac{\\sigma_0 z^2}{h} dz$, והזרם הוא $dI = \\frac{\\omega}{2\\pi}dq = \\frac{\\sqrt{2}\\omega \\sigma_0}{h} z^2 dz$. השדה המגנטי שיוצרת טבעת בקודקודה במרחק $z$ הוא $dB = \\frac{\\mu_0 dI}{2} \\frac{z^2}{(z^2+z^2)^{3/2}} = \\frac{\\mu_0 dI}{4\\sqrt{2}z}$. אינטגרציה: $B = \\int_0^h \\frac{\\mu_0 \\omega \\sigma_0}{4h} z\\,dz = \\frac{\\mu_0 \\omega \\sigma_0 h}{8}$ לאורך ציר $z$.",
      },
      {
        id: "phys2-q03-opt2",
        plainText: "$\\vec{B} = \\frac{\\mu_0 \\omega \\sigma_0 h}{4} \\hat{z}$",
        isCorrect: false,
        explanation:
          "שגוי: נשכחה החלוקה ב-2 מאינטגרציית הגובה $\\int_0^h z\\,dz = h^2/2$.",
      },
      {
        id: "phys2-q03-opt3",
        plainText: "$\\vec{B} = \\frac{\\mu_0 \\omega \\sigma_0 h}{2\\sqrt{2}} \\hat{z}$",
        isCorrect: false,
        explanation:
          "שגוי: השמטת הפקטור הנובע מזווית פתיחת החרוט במכנה חוק ביו-סבר.",
      },
      {
        id: "phys2-q03-opt4",
        plainText: "$\\vec{B} = 0$",
        isCorrect: false,
        explanation:
          "שגוי: כל הטבעות מסתובבות באותו כיוון ויוצרות שדות מגנטיים באותו כיוון ($\\hat{z}$) שאינם מתבטלים.",
      },
    ],
  },
  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "phys2-q04-rotating-discs-generator-capacitors",
    domain: "כא״מ תנועתי ודיסקות פאראדיי במעגל מקבילי",
    title: "פיזיקה 2 - כא״מ תנועתי ודיסקות פאראדיי במעגל מקבילי",
    context:
      "שתי דיסקות מוליכות בעלות רדיוסים $R_1, R_2$ ($R_2 > R_1$) מסתובבות באותה מהירות זוויתית $\\omega$ בשדה מגנטי אחיד $B$ הניצב למישורן. צירי הסיבוב מחוברים לקבל $C_2$, וההיקפים מחוברים דרך מגעים מחליקים לקבל $C_1$.",
    formulaLatex:
      "\\mathcal{E}_1 = \\frac{1}{2} B \\omega R_1^2, \\quad \\mathcal{E}_2 = \\frac{1}{2} B \\omega R_2^2",
    instruction: "מהו המתח $V_1$ שנוצר על לוחות הקבל $C_1$ במצב מתמיד?",
    options: [
      {
        id: "phys2-q04-opt1",
        plainText: "$V_1 = \\frac{B\\omega (R_2^2 - R_1^2)}{2}$",
        isCorrect: false,
        explanation:
          "שגוי: זהו הכא״מ הכולל במעגל ($\\Delta\\mathcal{E}$), והוא מתחלק בין שני הקבלים המחוברים בטור.",
      },
      {
        id: "phys2-q04-opt2",
        plainText:
          "$V_1 = \\frac{B\\omega (R_2^2 - R_1^2) C_2}{2(C_1 + C_2)}$",
        mathText:
          "V_1 = \\frac{B\\omega (R_2^2 - R_1^2) C_2}{2(C_1 + C_2)}",
        isCorrect: true,
        explanation:
          "נכון: כל דיסקה פועלת כמחולל פאראדיי עם כא״מ $\\mathcal{E} = \\int_0^R \\omega r B\\,dr = \\frac{1}{2}B\\omega R^2$. הכא״מ השקול במעגל הוא $\\Delta\\mathcal{E} = \\mathcal{E}_2 - \\mathcal{E}_1 = \\frac{1}{2}B\\omega(R_2^2 - R_1^2)$. הקבלים מחוברים בטור ולכן המטען עליהם זהה: $Q = \\frac{\\Delta\\mathcal{E}}{1/C_1 + 1/C_2} = \\frac{\\Delta\\mathcal{E} C_1 C_2}{C_1 + C_2}$. המתח על $C_1$ הוא $V_1 = \\frac{Q}{C_1} = \\frac{\\Delta\\mathcal{E} C_2}{C_1 + C_2} = \\frac{B\\omega(R_2^2 - R_1^2)C_2}{2(C_1 + C_2)}$.",
      },
      {
        id: "phys2-q04-opt3",
        plainText:
          "$V_1 = \\frac{B\\omega (R_2^2 - R_1^2) C_1}{2(C_1 + C_2)}$",
        isCorrect: false,
        explanation:
          "שגוי: היפוך מחלק המתח בין קבלים בטור (המתח על קבל פרופורציוני הפוך לקיבולו, כלומר תלוי ב-$C_2$).",
      },
      {
        id: "phys2-q04-opt4",
        plainText:
          "$V_1 = \\frac{B\\omega (R_1 + R_2)^2 C_2}{4(C_1 + C_2)}$",
        isCorrect: false,
        explanation:
          "שגוי: הכא״מים של הדיסקות מתנגדים זה לזה במעגל ולכן תלויים בהפרש הריבועים ולא בסכום.",
      },
    ],
  },
  {
    id: "phys2-q05-spherical-grounded-image-charge",
    domain: "שיטת מטעני הדמות עבור קליפה כדורית מוארקת",
    title: "פיזיקה 2 - שיטת מטעני הדמות עבור קליפה כדורית מוארקת",
    context:
      "מטען נקודתי $+q$ מונח במרחק $d$ ממרכזה של קליפה כדורית מוליכה ומוארקת ($V=0$) בעלת רדיוס $R$, כאשר המטען נמצא בתוך הקליפה ($d < R$).",
    formulaLatex: "V(R) = 0, \\quad q' = -q\\frac{R}{d}",
    instruction:
      "מהו גודלו ומיקומו של מטען הדמות $q'$ המאפשר לחשב את הפוטנציאל והשדה בתוך הקליפה?",
    options: [
      {
        id: "phys2-q05-opt1",
        plainText:
          "מטען דמות $q' = -q$ הממוקם במרחק סימטרי $d' = -d$ מהמרכז.",
        isCorrect: false,
        explanation:
          "שגוי: שיקוף סימטרי תקף למישור אינסופי, אך עבור שפה כדורית עקמומיות המשטח דורשת יחסי אינוורסיה גאומטריים.",
      },
      {
        id: "phys2-q05-opt2",
        plainText:
          "מטען דמות $q' = -q\\frac{R}{d}$ הממוקם מחוץ לקליפה במרחק $d' = \\frac{R^2}{d}$ ממרכז הכדור.",
        mathText: "q' = -q\\frac{R}{d}, \\quad d' = \\frac{R^2}{d}",
        isCorrect: true,
        explanation:
          "נכון: לפי שיטת מטעני הדמות לספירה מוארקת, כדי לאפס את הפוטנציאל על שפת הכדור $r=R$, מטען הדמות חייב להיות ממוקם בנקודת האינוורסיה $d' = R^2/d$ (מחוץ לתחום הפיזיקלי של הבעיה שבו $d < R$) וערכו הוא $q' = -q\\frac{R}{d}$.",
      },
      {
        id: "phys2-q05-opt3",
        plainText:
          "מטען דמות $q' = +q\\frac{d}{R}$ הממוקם במרכז הכדור ממש ($d' = 0$).",
        isCorrect: false,
        explanation:
          "שגוי: מטען במרכז יוצר פוטנציאל אחיד על השפה ולא יכול לפצות על תלות הזווית שיוצר המטען המוסט $q$.",
      },
      {
        id: "phys2-q05-opt4",
        plainText:
          "מטען דמות $q' = -q\\left(1 - \\frac{d}{R}\\right)$ הממוקם על שפת הקליפה במרחק $R$.",
        isCorrect: false,
        explanation:
          "שגוי: מטען דמות חייב להימצא מחוץ לאזור הפתרון ואינו יכול לשבת על השפה הפיזיקלית.",
      },
    ],
  },
  {
    id: "phys2-q06-displacement-current-moving-plates",
    domain: "זרם העתקה ושדה מגנטי מושרה בקבל לוחות נע",
    title: "פיזיקה 2 - זרם העתקה ושדה מגנטי מושרה בקבל לוחות נע",
    context:
      "קבל לוחות עגולים בעלי רדיוס $R$ מחובר למקור מתח קבוע $V_0$. מקרבים את הלוחות זה אל זה במהירות קבועה $v$, כך שהמרחק ביניהם נתון ע״י $y(t) = y_0 - v t$.",
    formulaLatex:
      "E(t) = \\frac{V_0}{y(t)}, \\quad I_d = \\epsilon_0 \\frac{d\\Phi_E}{dt}, \\quad \\oint \\vec{B} \\cdot d\\vec{\\ell} = \\mu_0 I_{d,enc}",
    instruction:
      "מהו השדה המגנטי המושרה $B(r, t)$ בין לוחות הקבל במרחק $r \\le R$ מציר הסימטריה?",
    options: [
      {
        id: "phys2-q06-opt1",
        plainText: "$B(r, t) = \\frac{\\mu_0 \\epsilon_0 V_0 v}{(y_0 - vt)} r$",
        isCorrect: false,
        explanation:
          "שגוי: גזירת השדה החשמלי ביחס לזמן מייצרת חזקה ריבועית של המרחק במכנה ($\\frac{d}{dt}(1/y) = v/y^2$) ולא חזקה ראשונה.",
      },
      {
        id: "phys2-q06-opt2",
        plainText:
          "$B(r, t) = \\frac{\\mu_0 \\epsilon_0 V_0 v}{2(y_0 - vt)^2} r$",
        mathText:
          "B(r, t) = \\frac{\\mu_0 \\epsilon_0 V_0 v}{2(y_0 - vt)^2} r = \\frac{V_0 v}{2 c^2 (y_0 - vt)^2} r",
        isCorrect: true,
        explanation:
          "נכון: השדה החשמלי הוא $E(t) = \\frac{V_0}{y_0 - vt}$. קצב שינויו: $\\frac{\\partial E}{\\partial t} = \\frac{V_0 v}{(y_0 - vt)^2}$. לפי משוואת אמפר-מקסוול במעגל ברדיוס $r \\le R$: $B \\cdot 2\\pi r = \\mu_0 \\epsilon_0 \\int \\frac{\\partial E}{\\partial t}\\,dA = \\mu_0 \\epsilon_0 \\frac{V_0 v}{(y_0 - vt)^2} (\\pi r^2)$. חלוקה ב-$2\\pi r$ נותנת ישירות $B(r, t) = \\frac{\\mu_0 \\epsilon_0 V_0 v}{2(y_0 - vt)^2} r$.",
      },
      {
        id: "phys2-q06-opt3",
        plainText:
          "$B(r, t) = \\frac{\\mu_0 \\epsilon_0 V_0 v R^2}{2(y_0 - vt)^2 r}$",
        isCorrect: false,
        explanation:
          "שגוי: ביטוי זה מתאר את השדה מחוץ ללוחות הקבל ($r > R$), ולא בתוכם.",
      },
      {
        id: "phys2-q06-opt4",
        plainText: "$B(r, t) = 0$",
        isCorrect: false,
        explanation:
          "שגוי: המתח אמנם קבוע אך המרחק משתנה, ולכן השדה החשמלי משתנה בזמן ומייצר זרם העתקה ושדה מגנטי מושרה.",
      },
    ],
  },
  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "phys2-q07-faraday-moving-loop-total-charge",
    domain: "חוק פאראדיי ומטען כולל שזרם בכריכה",
    title: "פיזיקה 2 - חוק פאראדיי ומטען כולל שזרם בכריכה",
    context:
      "כריכה ריבועית בעלת צלע $a$ והתנגדות כוללת $R_{tot}$ נעה במהירות קבועה $v_0 \\hat{x}$ בשדה מגנטי לא-אחיד $\\vec{B}(x) = \\frac{B_0}{x}\\hat{z}$. ברגע $t=0$ הקצה השמאלי ב-$x=a$ והימני ב-$x=2a$.",
    formulaLatex:
      "\\Phi_B(t) = B_0 a \\ln\\left(1 + \\frac{a}{a + v_0 t}\\right), \\quad q = \\int_0^\\infty I(t)\\,dt",
    instruction:
      "מהי כמות המטען הכוללת $Q_{tot}$ שתזרום בכריכה מרגע $t=0$ ועד להתרחקותה לאינסוף ($t \\to \\infty$)?",
    options: [
      {
        id: "phys2-q07-opt1",
        plainText: "$Q_{tot} = \\frac{B_0 a^2 v_0}{R_{tot}}$",
        isCorrect: false,
        explanation:
          "שגוי: המטען הכולל אינו תלוי במהירות התנועה $v_0$, אלא רק בשינוי הכולל בשטף המגנטי המחולק בהתנגדות.",
      },
      {
        id: "phys2-q07-opt2",
        plainText: "$Q_{tot} = \\frac{B_0 a}{2 R_{tot}}$",
        isCorrect: false,
        explanation:
          "שגוי: הלוגריתם הטבעי של היחס ההתחלתי ($\\ln 2$) הוחלף בטעות בשבר אלגברי.",
      },
      {
        id: "phys2-q07-opt3",
        plainText: "$Q_{tot} = \\frac{B_0 a \\ln 2}{R_{tot}}$",
        mathText: "Q_{tot} = \\frac{B_0 a \\ln 2}{R_{tot}}",
        isCorrect: true,
        explanation:
          "נכון: לפי חוק פאראדיי והגדרת הזרם: $I = \\frac{|\\mathcal{E}|}{R_{tot}} = \\frac{1}{R_{tot}}\\frac{d\\Phi_B}{dt}$. אינטגרציה בזמן נותנת: $Q_{tot} = \\int_0^\\infty I\\,dt = \\frac{\\Delta\\Phi_B}{R_{tot}} = \\frac{\\Phi_B(0) - \\Phi_B(\\infty)}{R_{tot}}$. ברגע $t=0$ השטף הוא $\\Phi_B(0) = \\int_a^{2a} \\frac{B_0}{x} a\\,dx = B_0 a \\ln 2$. באינסוף השדה דועך ולכן $\\Phi_B(\\infty) = 0$. מכאן $Q_{tot} = \\frac{B_0 a \\ln 2}{R_{tot}}$.",
      },
      {
        id: "phys2-q07-opt4",
        plainText: "$Q_{tot} \\to \\infty$",
        isCorrect: false,
        explanation:
          "שגוי: השטף המגנטי חסום ודועך מהר מספיק, ולכן אינטגרל המטען מתכנס לערך סופי מדויק.",
      },
    ],
  },
  {
    id: "phys2-q08-moving-cylinders-electromagnetic-energy",
    domain: "שדות משולבים ואנרגיה אלקטרומגנטית של גלילים נעים",
    title: "פיזיקה 2 - שדות משולבים ואנרגיה אלקטרומגנטית של גלילים נעים",
    context:
      "שני גלילים קואקסיאליים דקים ברדיוסים $a, b$ ($b > a$) טעונים בצפיפות מטען אורכית $+\\lambda$ ו-$-\\lambda$ בהתאמה, ונעים במקביל לצירם במהירות משותפת $v$ ביחס למעבדה.",
    formulaLatex:
      "E = \\frac{\\lambda}{2\\pi\\epsilon_0 r}, \\quad B = \\frac{\\mu_0 \\lambda v}{2\\pi r}, \\quad u = \\frac{1}{2}\\epsilon_0 E^2 + \\frac{1}{2\\mu_0} B^2",
    instruction:
      "מהי האנרגיה האלקטרומגנטית הכוללת ליחידת אורך $U/L$ האגורה במערכת?",
    options: [
      {
        id: "phys2-q08-opt1",
        plainText:
          "$\\frac{U}{L} = \\frac{\\lambda^2}{4\\pi\\epsilon_0} \\ln\\left(\\frac{b}{a}\\right)$",
        isCorrect: false,
        explanation:
          "שגוי: ביטוי זה מכיל רק את האנרגיה האלקטרוסטטית, ומתעלם לחלוטין מהאנרגיה המגנטית שיוצרת תנועת המטענים.",
      },
      {
        id: "phys2-q08-opt2",
        plainText:
          "$\\frac{U}{L} = \\frac{\\lambda^2}{4\\pi\\epsilon_0} \\left(1 - \\frac{v^2}{c^2}\\right) \\ln\\left(\\frac{b}{a}\\right)$",
        isCorrect: false,
        explanation:
          "שגוי: אנרגיות חשמליות ומגנטיות חיוביות תמיד ומתווספות זו לזו בסימן פלוס, ולא מחסירות זו את זו.",
      },
      {
        id: "phys2-q08-opt3",
        plainText:
          "$\\frac{U}{L} = \\frac{\\lambda^2}{4\\pi\\epsilon_0} \\left(1 + \\frac{v^2}{c^2}\\right) \\ln\\left(\\frac{b}{a}\\right)$",
        mathText:
          "\\frac{U}{L} = \\frac{\\lambda^2}{4\\pi\\epsilon_0} \\left(1 + \\frac{v^2}{c^2}\\right) \\ln\\left(\\frac{b}{a}\\right)",
        isCorrect: true,
        explanation:
          "נכון: בין הגלילים קיים שדה חשמלי $E = \\frac{\\lambda}{2\\pi\\epsilon_0 r}$ ושדה מגנטי שיוצר הזרם $I = \\lambda v$, כלומר $B = \\frac{\\mu_0 \\lambda v}{2\\pi r}$. צפיפות האנרגיה: $u = \\frac{1}{2}\\epsilon_0 E^2 + \\frac{1}{2\\mu_0}B^2 = \\frac{\\lambda^2}{8\\pi^2\\epsilon_0 r^2} + \\frac{\\mu_0 \\lambda^2 v^2}{8\\pi^2 r^2} = \\frac{\\lambda^2}{8\\pi^2\\epsilon_0 r^2}(1 + \\epsilon_0\\mu_0 v^2) = \\frac{\\lambda^2}{8\\pi^2\\epsilon_0 r^2}(1 + v^2/c^2)$. אינטגרציה על אלמנט נפח $dV = 2\\pi r dr L$ מניבה בדיוק $\\frac{\\lambda^2 L}{4\\pi\\epsilon_0}(1 + v^2/c^2)\\ln(b/a)$.",
      },
      {
        id: "phys2-q08-opt4",
        plainText:
          "$\\frac{U}{L} = \\frac{\\mu_0 \\lambda^2 v^2}{4\\pi} \\ln\\left(\\frac{b}{a}\\right)$",
        isCorrect: false,
        explanation:
          "שגוי: ביטוי זה מייצג את האנרגיה המגנטית בלבד, ללא התחשבות באנרגיית השדה החשמלי.",
      },
    ],
  },
  {
    id: "phys2-q09-leaky-dielectric-charge-relaxation",
    domain: "מוליכות בתווך דיאלקטרי וזמן רלקסציה",
    title: "פיזיקה 2 - מוליכות בתווך דיאלקטרי וזמן רלקסציה",
    context:
      "שתי קליפות כדוריות מוליכות קונצנטריות ברדיוסים $R_1, R_2$ ($R_2 > R_1$) טעונות במטענים התחלתיים $Q_1, Q_2$. התווך שביניהן ממולא בחומר בעל מקדם דיאלקטרי $\\epsilon$ ומוליכות סגולית $\\sigma$.",
    formulaLatex:
      "\\vec{J} = \\sigma \\vec{E}, \\quad \\vec{\\nabla} \\cdot \\vec{J} = -\\frac{\\partial \\rho}{\\partial t} \\implies \\frac{\\partial \\rho}{\\partial t} + \\frac{\\sigma}{\\epsilon}\\rho = 0",
    instruction:
      "מהו המטען $Q_1(t)$ על פני הקליפה הפנימית כפונקציה של הזמן, ומהו המטען שיישאר עליה כעבור זמן רב ($t \\to \\infty$)?",
    options: [
      {
        id: "phys2-q09-opt1",
        plainText:
          "$Q_1(t) = Q_1 e^{-t/\\tau}$ כאשר $\\tau = \\frac{4\\pi\\sigma}{\\epsilon} \\frac{R_1 R_2}{R_2 - R_1}$, והמטען הסופי הוא $Q_1(\\infty) = \\frac{Q_1 + Q_2}{2}$.",
        isCorrect: false,
        explanation:
          "שגוי: זמן הרלקסציה של דעיכת מטען בחומר מוליך הוא גודל מקומי בלתי תלוי ברדיוסי הקליפות ($\\tau = \\epsilon/\\sigma$).",
      },
      {
        id: "phys2-q09-opt2",
        plainText:
          "$Q_1(t) = Q_1\\left(1 - \\frac{\\sigma}{\\epsilon} t\\right)$, והמטען הסופי מתאפס בזמן סופי.",
        isCorrect: false,
        explanation:
          "שגוי: משוואת הדעיכה היא מעריכית ולא ליניארית; פריקת המטען שואפת לאפס באסימפטוטה אינסופית.",
      },
      {
        id: "phys2-q09-opt3",
        plainText:
          "$Q_1(t) = Q_1 e^{-\\frac{\\sigma}{\\epsilon} t}$, וכעבור זמן רב כל המטען דולף כך ש-$Q_1(\\infty) = 0$.",
        mathText:
          "Q_1(t) = Q_1 e^{-\\frac{\\sigma}{\\epsilon} t}, \\quad Q_1(t \\to \\infty) = 0",
        isCorrect: true,
        explanation:
          "נכון: ממשוואת הרציפות וחוק אוהם הדיפרנציאלי: $\\nabla \\cdot \\vec{J} = \\sigma (\\nabla \\cdot \\vec{E}) = \\frac{\\sigma}{\\epsilon}\\rho = -\\frac{\\partial \\rho}{\\partial t}$. פתרון המשוואה הוא דעיכה מעריכית כללית עם זמן רלקסציה אוניברסלי $\\tau = \\frac{\\epsilon}{\\sigma}$. כל עוד קיים מטען על הקליפה הפנימית קיים שדה רדיאלי וזרם החוצה, ולכן במצב מתמיד $t \\to \\infty$ לא יכול להישאר שדה בתווך והמטען הפנימי מתאפס לחלוטין ($Q_1 \\to 0$, כל המטען עובר לקליפה החיצונית).",
      },
      {
        id: "phys2-q09-opt4",
        plainText:
          "$Q_1(t) = Q_1 e^{-\\frac{\\sigma}{\\epsilon} t}$, והמטען הסופי שווה לפוטנציאל הממוצע מוכפל בקיבול.",
        isCorrect: false,
        explanation:
          "שגוי: מאחר שהתווך בין הקליפות מוליך, המערכת אינה מבודדת וכל המטען של הקליפה הפנימית נדחף אל שפת הקליפה החיצונית.",
      },
    ],
  },
  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "phys2-q10-circular-polarized-poynting-vector",
    domain: "גלים אלקטרומגנטיים ווקטור פוינטינג בקיטוב מעגלי",
    title: "פיזיקה 2 - גלים אלקטרומגנטיים ווקטור פוינטינג בקיטוב מעגלי",
    context:
      "גל אלקטרומגנטי מישורי מתקדם בריק עם שדה מגנטי בעל קיטוב מעגלי ימני: $\\vec{B}(z, t) = B_0\\cos(kz - \\omega t)\\hat{x} + B_0\\sin(kz - \\omega t)\\hat{y}$.",
    formulaLatex:
      "\\vec{E} = c \\vec{B} \\times \\hat{k}, \\quad \\vec{S} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B})",
    instruction: "מהו וקטור פוינטינג הרגעי $\\vec{S}(z, t)$ של הגל?",
    options: [
      {
        id: "phys2-q10-opt1",
        plainText:
          "$\\vec{S} = \\frac{c B_0^2}{\\mu_0} \\cos(2kz - 2\\omega t) \\hat{z}$",
        isCorrect: false,
        explanation:
          "שגוי: תנודות הרמוניות בזמן כפול מאפיינות גל בקיטוב ליניארי, אך בקיטוב מעגלי גודל השדה קבוע בזמן.",
      },
      {
        id: "phys2-q10-opt2",
        plainText: "$\\vec{S} = \\frac{c B_0^2}{2\\mu_0} \\hat{z}$",
        isCorrect: false,
        explanation:
          "שגוי: פקטור $1/2$ מופיע בממוצע זמן של גל מקוטב ליניארית, בעוד שבקיטוב מעגלי הערך הרגעי שווה לערך השיא של שני הרכיבים.",
      },
      {
        id: "phys2-q10-opt3",
        plainText: "$\\vec{S} = \\frac{B_0^2}{\\mu_0 c} (\\hat{x} + \\hat{y})$",
        isCorrect: false,
        explanation:
          "שגוי: וקטור פוינטינג מצביע תמיד בכיוון התקדמות הגל ($\\hat{z}$) ולא במישור הקיטוב הרוחבי.",
      },
      {
        id: "phys2-q10-opt4",
        plainText:
          "$\\vec{S} = \\frac{c B_0^2}{\\mu_0} \\hat{z}$ (וקטור קבוע לחלוטין בזמן ובמרחב בכיוון התקדמות הגל)",
        mathText: "\\vec{S} = \\frac{c B_0^2}{\\mu_0} \\hat{z}",
        isCorrect: true,
        explanation:
          "נכון: כיוון התקדמות הגל הוא $\\hat{k} = \\hat{z}$. השדה החשמלי ניצב ל-$\\vec{B}$ ול-$\\hat{k}$: $\\vec{E} = c \\vec{B} \\times \\hat{z} = c B_0 \\sin(kz - \\omega t)\\hat{x} - c B_0 \\cos(kz - \\omega t)\\hat{y}$. וקטור פוינטינג: $\\vec{S} = \\frac{1}{\\mu_0}(\\vec{E} \\times \\vec{B}) = \\frac{c B_0^2}{\\mu_0} [\\sin^2(kz-\\omega t) + \\cos^2(kz-\\omega t)] \\hat{z} = \\frac{c B_0^2}{\\mu_0}\\hat{z}$. בקיטוב מעגלי צפיפות שטף האנרגיה קבועה בזמן לחלוטין.",
      },
    ],
  },
  {
    id: "phys2-q11-rotating-disc-magnetic-dipole",
    domain: "מומנט דיפול מגנטי של דסקה טעונה מסתובבת",
    title: "פיזיקה 2 - מומנט דיפול מגנטי של דסקה טעונה מסתובבת",
    context:
      "דסקה דקה ברדיוס $R$ טעונה בצפיפות מטען משטחית התלויה ברדיוס: $\\sigma(r) = \\sigma_0 \\frac{r}{R}$. הדסקה מסתובבת סביב צירה המרכזי במהירות זוויתית $\\vec{\\omega} = \\omega \\hat{z}$.",
    formulaLatex:
      "dI(r) = \\frac{\\omega}{2\\pi} dq = \\frac{\\sigma_0 \\omega}{R} r^2 dr, \\quad d\\vec{\\mu} = (\\pi r^2) dI \\hat{z}",
    instruction: "מהו מומנט הדיפול המגנטי הכולל $\\vec{\\mu}$ של הדסקה?",
    options: [
      {
        id: "phys2-q11-opt1",
        plainText: "$\\vec{\\mu} = \\frac{\\pi \\sigma_0 \\omega R^4}{4} \\hat{z}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה זו מתקבלת עבור דסקה בעלת צפיפות מטען אחידה $\\sigma = \\text{const}$ (שבה $d\\mu \\propto r^3 dr$), ולא עבור צפיפות הגדלה ליניארית.",
      },
      {
        id: "phys2-q11-opt2",
        plainText: "$\\vec{\\mu} = \\frac{\\pi \\sigma_0 \\omega R^3}{3} \\hat{z}$",
        isCorrect: false,
        explanation:
          "שגוי: ניתוח ממדים שגוי; מומנט דיפול מגנטי של משטח דורש יחידות הכוללות חזקה רביעית של הרדיוס.",
      },
      {
        id: "phys2-q11-opt3",
        plainText: "$\\vec{\\mu} = \\frac{\\pi \\sigma_0 \\omega R^4}{2} \\hat{z}$",
        isCorrect: false,
        explanation:
          "שגוי: אינטגרציה שגויה של הפונקציה הריבועית ללא התחשבות בשטח הטבעת האינפיניטסימלית.",
      },
      {
        id: "phys2-q11-opt4",
        plainText: "$\\vec{\\mu} = \\frac{\\pi \\sigma_0 \\omega R^4}{5} \\hat{z}$",
        mathText: "\\vec{\\mu} = \\frac{\\pi \\sigma_0 \\omega R^4}{5} \\hat{z}",
        isCorrect: true,
        explanation:
          "נכון: נחלק את הדסקה לטבעות ברדיוס $r$ ועובי $dr$. המטען בטבעת הוא $dq = \\sigma(r) 2\\pi r dr = 2\\pi \\frac{\\sigma_0}{R} r^2 dr$. הזרם האפקטיבי הוא $dI = \\frac{\\omega}{2\\pi} dq = \\frac{\\sigma_0 \\omega}{R} r^2 dr$. מומנט הדיפול המגנטי של הטבעת הוא $d\\mu = (\\pi r^2) dI = \\frac{\\pi \\sigma_0 \\omega}{R} r^4 dr$. אינטגרציה מ-$0$ עד $R$: $\\mu = \\frac{\\pi \\sigma_0 \\omega}{R} \\int_0^R r^4 dr = \\frac{\\pi \\sigma_0 \\omega R^4}{5}$ לאורך ציר הסיבוב $\\hat{z}$.",
      },
    ],
  },
  {
    id: "phys2-q12-mutual-inductance-solenoid-coil",
    domain: "השראות הדדית של סלילים קואקסיאליים",
    title: "פיזיקה 2 - השראות הדדית של סלילים קואקסיאליים",
    context:
      "סליל סולנואיד אינסופי בעל רדיוס $r_1$ ו-$n_1$ כריכות ליחידת אורך. בתוכו ממוקמת לולאה מעגלית קואקסיאלית קטנה בעלת רדיוס $r_2$ ($r_2 < r_1$) ו-$N_2$ כריכות צמודות.",
    formulaLatex:
      "B_1 = \\mu_0 n_1 I_1, \\quad \\Phi_{12} = N_2 (B_1 \\pi r_2^2) = M I_1",
    instruction:
      "מהי ההשראות ההדדית $M$ בין הסולנואיד לבין הלולאה הפנימית?",
    options: [
      {
        id: "phys2-q12-opt1",
        plainText: "$M = \\mu_0 \\pi n_1 N_2 r_1^2$",
        isCorrect: false,
        explanation:
          "שגוי: השדה המגנטי של הסולנואיד חודר אך ורק דרך שטח הלולאה הקטנה ($\\pi r_2^2$), ולכן השטח הקובע הוא לפי $r_2$ ולא לפי רדיוס הסולנואיד החיצוני $r_1$.",
      },
      {
        id: "phys2-q12-opt2",
        plainText: "$M = \\frac{\\mu_0 n_1 N_2 r_2}{2}$",
        isCorrect: false,
        explanation:
          "שגוי: שטח הלולאה דורש חזקה ריבועית של הרדיוס ($\\pi r_2^2$) ולא חזקה ראשונה.",
      },
      {
        id: "phys2-q12-opt3",
        plainText: "$M = \\mu_0 \\pi n_1 N_2 (r_1^2 - r_2^2)$",
        isCorrect: false,
        explanation:
          "שגוי: השטף אינו נמדד ברווח הטבעתי שבין הסלילים, אלא בתוך שטח הכריכות הפנימיות עצמן.",
      },
      {
        id: "phys2-q12-opt4",
        plainText: "$M = \\mu_0 \\pi n_1 N_2 r_2^2$",
        mathText: "M = \\mu_0 \\pi n_1 N_2 r_2^2",
        isCorrect: true,
        explanation:
          "נכון: כאשר זורם זרם $I_1$ בסולנואיד, הוא מייצר בתוכו שדה מגנטי אחיד $B_1 = \\mu_0 n_1 I_1$. השטף המגנטי דרך כל כריכה של הלולאה הפנימית (ששטחה $\\pi r_2^2$) הוא $\\Phi_1 = B_1 \\pi r_2^2 = \\mu_0 n_1 I_1 \\pi r_2^2$. סך השטף המגנטי המצומד ל-$N_2$ הכריכות הוא $\\Phi_{total} = N_2 \\Phi_1 = \\mu_0 \\pi n_1 N_2 r_2^2 I_1$. לפי הגדרת ההשראות ההדדית $M = \\frac{\\Phi_{total}}{I_1} = \\mu_0 \\pi n_1 N_2 r_2^2$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_PHYSICS_2_QUESTIONS = PHYSICS_2_QUESTIONS;

/**
 * Stratified onboarding sample:
 * stratum 1: electrostatics / Gauss / dielectrics (Q1–3)
 * stratum 2: image charges / Faraday discs / displacement current (Q4–6)
 * stratum 3: induction / EM energy / waves / Poynting (Q7–12)
 */
export function samplePhysics2OnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupElectrostatics = PHYSICS_2_QUESTIONS.slice(0, 3);
  const groupElectrodynamics = PHYSICS_2_QUESTIONS.slice(3, 6);
  const groupMagnetismWaves = PHYSICS_2_QUESTIONS.slice(6, 12);

  const pickedA =
    groupElectrostatics[Math.floor(Math.random() * groupElectrostatics.length)];
  const pickedB =
    groupElectrodynamics[Math.floor(Math.random() * groupElectrodynamics.length)];
  const pickedC =
    groupMagnetismWaves[Math.floor(Math.random() * groupMagnetismWaves.length)];

  const sampled = [pickedA, pickedB, pickedC].filter(
    (q): q is AcademicDiagnosticQuestion => Boolean(q)
  );

  for (let i = sampled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sampled[i], sampled[j]] = [sampled[j], sampled[i]];
  }

  return sampled;
}
