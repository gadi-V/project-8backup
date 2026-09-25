import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Linear Algebra 2 diagnostic bank (12Q).
 * Display name: "אלגברה ליניארית 2" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const LINEAR_ALGEBRA_2_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "la2-q01-inner-product-matrix-trace",
    domain: "מטריצת מכפלה פנימית ועקבה",
    title: "אלגברה ליניארית 2 - מטריצת מכפלה פנימית ועקבה",
    context:
      "יהי $V = \\mathbb{R}^2$ מצויד במכפלה פנימית $\\langle u, v \\rangle = u^T A v$, כאשר $A \\in \\mathbb{R}^{2\\times 2}$ היא מטריצה סימטרית ומוגדרת חיובית. נתון כי הבסיס $B$ הוא בסיס אורתונורמלי ביחס למכפלה פנימית זו:",
    formulaLatex:
      "B = \\left\\{ \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}, \\begin{pmatrix} 4 \\\\ 3 \\end{pmatrix} \\right\\}, \\quad P^T A P = I",
    instruction: "מהי עקבת המטריצה $\\operatorname{tr}(A)$?",
    options: [
      {
        id: "la2-q01-opt1",
        plainText: "$38$",
        mathText: "38",
        isCorrect: true,
        explanation:
          "נכון: נגדיר את מטריצת המעבר $P = \\begin{pmatrix} 3 & 4 \\\\ 2 & 3 \\end{pmatrix}$. תנאי האורתונורמליות שקול ל-$P^T A P = I$, ולכן $A = (P P^T)^{-1}$. נחשב: $P P^T = \\begin{pmatrix} 3 & 4 \\\\ 2 & 3 \\end{pmatrix} \\begin{pmatrix} 3 & 2 \\\\ 4 & 3 \\end{pmatrix} = \\begin{pmatrix} 25 & 18 \\\\ 18 & 13 \\end{pmatrix}$. הדטרמיננטה היא $25 \\cdot 13 - 18^2 = 325 - 324 = 1$. המטריצה ההופכית היא $A = \\begin{pmatrix} 13 & -18 \\\\ -18 & 25 \\end{pmatrix}$, ומכאן $\\operatorname{tr}(A) = 13 + 25 = 38$.",
      },
      {
        id: "la2-q01-opt2",
        plainText: "$25$",
        mathText: "25",
        isCorrect: false,
        explanation:
          "שגוי: ערך זה מייצג רק את אחד מאיברי האלכסון הראשי של המטריצה $A$, ולא את סכום איברי האלכסון כולו.",
      },
      {
        id: "la2-q01-opt3",
        plainText: "$13$",
        mathText: "13",
        isCorrect: false,
        explanation:
          "שגוי: ערך זה מייצג את איבר האלכסון הראשון בלבד ($a_{11}$).",
      },
      {
        id: "la2-q01-opt4",
        plainText: "$50$",
        mathText: "50",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה זו מתקבלת מחישוב שגוי של העקבה מתוך $P P^T$ במקום מתוך המטריצה ההופכית שלו ($A$).",
      },
    ],
  },
  {
    id: "la2-q02-adjoint-operator-matrix-space",
    domain: "אופרטור צמוד במרחב מטריצות",
    title: "אלגברה ליניארית 2 - אופרטור צמוד במרחב מטריצות",
    context:
      "יהי $V = \\mathbb{R}^{2\\times 2}$ מעל $\\mathbb{R}$ עם המכפלה הפנימית הסטנדרטית $\\langle X, Y \\rangle = \\operatorname{tr}(Y^T X)$. נגדיר אופרטור ליניארי $T: V \\to V$ על ידי $T(X) = 2X - 3X^T$. נסמן ב-$T^*$ את האופרטור הצמוד ל-$T$, ונגדיר אופרטור חדש $S$:",
    formulaLatex: "T(X) = 2X - 3X^T, \\quad S = T^2 - 2T^*",
    instruction: "מהי הדטרמיננטה של האופרטור $\\det(S)$?",
    options: [
      {
        id: "la2-q02-opt1",
        plainText: "$405$",
        mathText: "405",
        isCorrect: true,
        explanation:
          "נכון: האופרטור צמוד לעצמו ($T^* = T$) כי $\\langle T(X), Y \\rangle = \\operatorname{tr}(Y^T(2X-3X^T)) = 2\\operatorname{tr}(Y^T X) - 3\\operatorname{tr}(X Y^T) = \\langle X, T(Y) \\rangle$. נפרק את המרחב לסכום ישר של מטריצות סימטריות (ממד 3) ואנטי-סימטריות (ממד 1): על הסימטריות $T(X) = -X \\implies \\mu = (-1)^2 - 2(-1) = 3$ (בריבוי 3). על האנטי-סימטריות $T(X) = 5X \\implies \\mu = 5^2 - 2(5) = 15$ (בריבוי 1). מכאן $\\det(S) = 3^3 \\cdot 15 = 27 \\cdot 15 = 405$.",
      },
      {
        id: "la2-q02-opt2",
        plainText: "$135$",
        mathText: "135",
        isCorrect: false,
        explanation:
          "שגוי: נשכח הריבוי של תת-המרחב הסימטרי ($3^2 \\cdot 15$ במקום $3^3 \\cdot 15$).",
      },
      {
        id: "la2-q02-opt3",
        plainText: "$-405$",
        mathText: "-405",
        isCorrect: false,
        explanation:
          "שגוי: טעות בסימן הערך העצמי של $S$ על תת-המרחב הסימטרי (חישוב $(-1)^2 + 2(-1) = -1$ במקום $1+2=3$).",
      },
      {
        id: "la2-q02-opt4",
        plainText: "$45$",
        mathText: "45",
        isCorrect: false,
        explanation:
          "שגוי: כפל פשוט של שני הערכים העצמיים השונים $3 \\cdot 15$ ללא התחשבות בריבויים הגיאומטריים במרחב ה-4-ממדי.",
      },
    ],
  },
  {
    id: "la2-q03-positive-definite-complex",
    domain: "מטריצות מוגדרות חיוביות מעל שדה המרוכבים",
    title: "אלגברה ליניארית 2 - מטריצות מוגדרות חיוביות מעל שדה המרוכבים",
    context:
      "תהי המטריצה $A \\in \\mathbb{C}^{2\\times 2}$ התלויה בפרמטר ממשי $a \\in \\mathbb{R}$:",
    formulaLatex:
      "A = \\begin{pmatrix} a & a^2 - 15 - 2i \\\\ 1 + 2i & a - 1 \\end{pmatrix}",
    instruction:
      "עבור אילו ערכים של הפרמטר הממשי $a$ המטריצה $A$ מוגדרת חיובית?",
    options: [
      {
        id: "la2-q03-opt1",
        plainText: "$a = 4$ בלבד",
        mathText: "a = 4",
        isCorrect: true,
        explanation:
          "נכון: מטריצה מוגדרת חיובית מעל $\\mathbb{C}$ חייבת להיות הרמיטית ($A = A^*$). לכן האיברים מחוץ לאלכסון מקיימים $a^2 - 15 - 2i = \\overline{1 + 2i} = 1 - 2i \\implies a^2 = 16 \\implies a = \\pm 4$. לפי קריטריון סילבסטר: איבר האלכסון חייב להיות חיובי, כלומר $a > 0$, ולכן $a = -4$ נפסל מיד. עבור $a = 4$: $a_{11} = 4 > 0$ ו-$\\det(A) = 4 \\cdot 3 - |1+2i|^2 = 12 - 5 = 7 > 0$. לכן $a=4$ הוא הפתרון היחיד.",
      },
      {
        id: "la2-q03-opt2",
        plainText: "$a = -4$ בלבד",
        mathText: "a = -4",
        isCorrect: false,
        explanation:
          "שגוי: עבור $a = -4$ איברי האלכסון שליליים ($a_{11} = -4 < 0$), ולכן המטריצה אינה מוגדרת חיובית.",
      },
      {
        id: "la2-q03-opt3",
        plainText: "$a = 4$ או $a = -4$",
        mathText: "a = \\pm 4",
        isCorrect: false,
        explanation:
          "שגוי: נבדק רק תנאי ההרמיטיות ללא בדיקת חיוביות איברי האלכסון והמינורים הראשיים.",
      },
      {
        id: "la2-q03-opt4",
        plainText: "לכל $a > 1$",
        mathText: "a > 1",
        isCorrect: false,
        explanation:
          "שגוי: לכל $a \\neq \\pm 4$ המטריצה אינה הרמיטית כלל, ולכן מושג ההגדרה החיובית אינו מוגדר עבורה מעל $\\mathbb{C}$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "la2-q04-spectral-decomposition-normal-unitary",
    domain: "פירוק ספקטרלי ואופרטורים נורמליים",
    title: "אלגברה ליניארית 2 - פירוק ספקטרלי ואופרטורים נורמליים",
    context:
      "תהי $A \\in \\mathbb{C}^{n\\times n}$ בעלת פירוק ספקטרלי $A = \\sum_{j=1}^n \\lambda_j v_j v_j^*$, כאשר $\\{v_j\\}_{j=1}^n$ בסיס אורתונורמלי וערכיה העצמיים מקיימים $\\lambda_j \\in \\{i, -i\\}$. תהי $C \\in \\mathbb{C}^{n\\times n}$ מטריצה נורמלית המקיימת $C^2 = A$.",
    formulaLatex:
      "A = \\sum_{j=1}^n \\lambda_j v_j v_j^*, \\quad \\lambda_j \\in \\{i, -i\\}, \\quad C^* C = C C^*, \\quad C^2 = A",
    instruction: "איזו מהטענות הבאות נכונה בהכרח לגבי המטריצה $C$?",
    options: [
      {
        id: "la2-q04-opt1",
        plainText: "המטריצה $C$ היא הרמיטית (צמודה לעצמה).",
        isCorrect: false,
        explanation:
          "שגוי: הערכים העצמיים של $C$ מקיימים $\\mu^2 = \\pm i$, ולכן $\\mu = e^{i\\pi/4}, e^{i3\\pi/4}, \\dots$ שאינם ממשיים. מטריצה הרמיטית חייבת להיות בעלת ערכים עצמיים ממשיים.",
      },
      {
        id: "la2-q04-opt2",
        plainText: "המטריצה $C$ היא אוניטרית ($C^* C = I$).",
        isCorrect: true,
        explanation:
          "נכון: המטריצה $C$ נורמלית ולכן לכסינה אוניטרית. אם $\\mu$ ערך עצמי של $C$, אזי $\\mu^2$ הוא ערך עצמי של $C^2 = A$. נתון ש-$|\\lambda_j| = |\\pm i| = 1$, ולכן $|\\mu|^2 = |\\mu^2| = 1 \\implies |\\mu| = 1$. אופרטור נורמלי שכל ערכיו העצמיים בעלי ערך מוחלט 1 הוא בהכרח אופרטור אוניטרי.",
      },
      {
        id: "la2-q04-opt3",
        plainText: "המטריצה $C$ היא אנטי-הרמיטית ($C^* = -C$).",
        isCorrect: false,
        explanation:
          "שגוי: ערכים עצמיים של מטריצה אנטי-הרמיטית הם מדומים טהורים, אך שורשי $\\pm i$ הם בעלי חלק ממשי שאינו אפס ($\\pm \\frac{1}{\\sqrt{2}}$).",
      },
      {
        id: "la2-q04-opt4",
        plainText: "כל הערכים העצמיים של $C$ הם ממשיים.",
        isCorrect: false,
        explanation:
          "שגוי: ריבוע של מספר ממשי אינו יכול להיות $\\pm i$.",
      },
    ],
  },
  {
    id: "la2-q05-quadratic-form-orthogonal-constraint",
    domain: "תבניות ריבועיות ואופטימיזציה תחת אילוץ",
    title: "אלגברה ליניארית 2 - תבניות ריבועיות ואופטימיזציה תחת אילוץ",
    context:
      "תהי המטריצה הסימטרית $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 2 & 1 & 0 \\\\ 0 & 0 & 5 \\end{pmatrix}$. אנו בוחנים את ערך התבנית הריבועית $x^T A x$ עבור וקטור יחידה $x \\in \\mathbb{R}^3$ ($\\|x\\|_2 = 1$) המאונך לווקטור $(0, 0, 1)^T$.",
    formulaLatex:
      "A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 2 & 1 & 0 \\\\ 0 & 0 & 5 \\end{pmatrix}, \\quad \\|x\\|=1, \\quad x \\perp \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}",
    instruction: "מהו הערך המקסימלי של התבנית הריבועית תחת אילוצים אלו?",
    options: [
      {
        id: "la2-q05-opt1",
        plainText: "$5$",
        mathText: "5",
        isCorrect: false,
        explanation:
          "שגוי: 5 הוא הערך העצמי המקסימלי הגלובלי המתקבל עבור הווקטור $(0,0,1)^T$, אך וקטור זה נפסל מפורשות על ידי תנאי האורתוגונליות.",
      },
      {
        id: "la2-q05-opt2",
        plainText: "$3$",
        mathText: "3",
        isCorrect: true,
        explanation:
          "נכון: האילוץ $x \\perp (0,0,1)^T$ פירושו $x_3 = 0$. תחת אילוץ זה, התבנית מצטמצמת לבלוק הדו-ממדי $\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$. הערכים העצמיים של בלוק זה הם $\\lambda_1 = 3$ (עבור הווקטור הנורמלי $\\frac{1}{\\sqrt{2}}(1, 1, 0)^T$) ו-$\\lambda_2 = -1$. לפי עקרון קוראנט-פישר, המקסימום על תת-המרחב הוא הערך העצמי המקסימלי של הבלוק, שהוא 3.",
      },
      {
        id: "la2-q05-opt3",
        plainText: "$1$",
        mathText: "1",
        isCorrect: false,
        explanation:
          "שגוי: 1 הוא איבר האלכסון ולא הערך העצמי המקסימלי של הבלוק.",
      },
      {
        id: "la2-q05-opt4",
        plainText: "$4$",
        mathText: "4",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה שגויה שאינה שייכת לספקטרום של המטריצה או של הבלוק המצומצם.",
      },
    ],
  },
  {
    id: "la2-q06-riesz-representation-functional-distance",
    domain: "משפט ההצגה של ריס ומרחק מגרעין",
    title: "אלגברה ליניארית 2 - משפט ההצגה של ריס ומרחק מגרעין",
    context:
      "במרחב הפולינומים $V = \\mathbb{R}_2[x]$ מוגדרת מכפלה פנימית $\\langle p, q \\rangle = \\int_{-1}^1 p(x)q(x) \\, dx$. נגדיר פונקציונל ליניארי $\\varphi(p) = \\int_{-1}^1 x p(x) \\, dx$.",
    formulaLatex: "\\varphi(p) = \\langle p, x \\rangle, \\quad h(x) = x",
    instruction:
      "מהו המרחק של הפולינום $h(x) = x$ מתת-המרחב $\\ker(\\varphi)$?",
    options: [
      {
        id: "la2-q06-opt1",
        plainText: "$\\frac{2}{3}$",
        mathText: "\\frac{2}{3}",
        isCorrect: false,
        explanation:
          "שגוי: זהו ריבוע המרחק (ריבוע הנורמה $\\|x\\|^2 = \\int_{-1}^1 x^2 dx = 2/3$) ולא המרחק עצמו.",
      },
      {
        id: "la2-q06-opt2",
        plainText: "$\\sqrt{\\frac{2}{3}}$",
        mathText: "\\sqrt{\\frac{2}{3}}",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט ההצגה של ריס, הפונקציונל מיוצג ישירות על ידי הווקטור $v_0(x) = x$. גרעין הפונקציונל הוא המשלים האורתוגונלי: $\\ker(\\varphi) = (\\operatorname{Sp}\\{x\\})^\\perp$. לכן המרחק מ-$h(x) = x$ אל $\\ker(\\varphi)$ שווה בדיוק לאורך ההטלה על $(\\ker(\\varphi))^\\perp = \\operatorname{Sp}\\{x\\}$, שהוא פשוט הנורמה של $x$: $\\|x\\| = \\sqrt{\\int_{-1}^1 x^2 dx} = \\sqrt{2/3}$.",
      },
      {
        id: "la2-q06-opt3",
        plainText: "$\\sqrt{\\frac{1}{3}}$",
        mathText: "\\sqrt{\\frac{1}{3}}",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה מאינטגרציה בקטע $[0, 1]$ במקום בקטע הסימטרי $[-1, 1]$.",
      },
      {
        id: "la2-q06-opt4",
        plainText: "$0$",
        mathText: "0",
        isCorrect: false,
        explanation:
          "שגוי: $h(x) = x$ אינו שייך לגרעין כי $\\varphi(x) = \\int_{-1}^1 x^2 dx = 2/3 \\neq 0$, ולכן המרחק חיובי ממש.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "la2-q07-pythagorean-theorem-complex",
    domain: "משפט פיתגורס במרחב מכפלה פנימית מרוכב",
    title: "אלגברה ליניארית 2 - משפט פיתגורס במרחב מכפלה פנימית מרוכב",
    context:
      "יהי $V$ מרחב מכפלה פנימית מעל שדה המרוכבים $\\mathbb{C}$, ויהיו $u, v \\in V$. אנו מעוניינים בתנאי לקיום שוויון פיתגורס:",
    formulaLatex: "\\|u + v\\|^2 = \\|u\\|^2 + \\|v\\|^2",
    instruction:
      "איזה מהתנאים הבאים הוא תנאי הכרחי ומספיק (אם ורק אם) לקיום השוויון מעל $\\mathbb{C}$?",
    options: [
      {
        id: "la2-q07-opt1",
        plainText: "$u \\perp v$ (כלומר $\\langle u, v \\rangle = 0$).",
        mathText: "\\langle u, v \\rangle = 0",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה נכון במרחב ממשי, אך במרחב מרוכב הוא תנאי מספיק בלבד ואינו הכרחי (הוא דורש התאפסות של החלק הממשי והמדומה כאחד).",
      },
      {
        id: "la2-q07-opt2",
        plainText: "$\\operatorname{Im}\\langle u, v \\rangle = 0$.",
        mathText: "\\operatorname{Im}\\langle u, v \\rangle = 0",
        isCorrect: false,
        explanation:
          "שגוי: החלק המדומה של המכפלה הפנימית אינו משתתף כלל בנוסחת ריבוע הנורמה של הסכום.",
      },
      {
        id: "la2-q07-opt3",
        plainText: "$\\operatorname{Re}\\langle u, v \\rangle = 0$.",
        mathText: "\\operatorname{Re}\\langle u, v \\rangle = 0",
        isCorrect: true,
        explanation:
          "נכון: נפתח את ריבוע הנורמה במרחב מרוכב: $\\|u + v\\|^2 = \\langle u+v, u+v \\rangle = \\|u\\|^2 + \\|v\\|^2 + \\langle u, v \\rangle + \\langle v, u \\rangle = \\|u\\|^2 + \\|v\\|^2 + 2\\operatorname{Re}\\langle u, v \\rangle$. השוויון מתקיים אם ורק אם האיבר הנוסף מתאפס, כלומר $\\operatorname{Re}\\langle u, v \\rangle = 0$.",
      },
      {
        id: "la2-q07-opt4",
        plainText: "$\\langle u, v \\rangle = \\langle v, u \\rangle$.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה שקול לכך שהמכפלה הפנימית היא מספר ממשי טהור, אך אינו מבטיח שערכו שווה לאפס.",
      },
    ],
  },
  {
    id: "la2-q08-normal-operators-spectral-properties",
    domain: "אופרטורים נורמליים ותכונות ספקטרליות",
    title: "אלגברה ליניארית 2 - אופרטורים נורמליים ותכונות ספקטרליות",
    context:
      "יהי $T: V \\to V$ אופרטור ליניארי מעל מרחב מכפלה פנימית מממד סופי מעל $\\mathbb{C}$.",
    instruction: "איזו מבין הטענות הבאות אינה נכונה בהכרח?",
    options: [
      {
        id: "la2-q08-opt1",
        plainText:
          "אם $T$ נורמלי ו-$W \\subseteq V$ תת-מרחב $T$-אינווריאנטי, אז גם המשלים האורתוגונלי $W^\\perp$ הוא $T$-אינווריאנטי.",
        isCorrect: false,
        explanation:
          "שגוי לבחור בטענה זו: זוהי טענה נכונה לחלוטין לגבי אופרטורים נורמליים.",
      },
      {
        id: "la2-q08-opt2",
        plainText:
          "אם $T$ נורמלי, אז מתקיים שוויון גרעינים $\\ker(T) = \\ker(T^*)$.",
        isCorrect: false,
        explanation:
          "שגוי לבחור בטענה זו: זוהי טענה נכונה; עבור אופרטור נורמלי מתקיים $\\|T(v)\\| = \\|T^*(v)\\|$ לכל $v$, ולכן הגרעינים זהים.",
      },
      {
        id: "la2-q08-opt3",
        plainText:
          "אם לכל $v \\in V$ מתקיים $\\|T(v)\\| = \\|v\\|$, אז כל הערכים העצמיים של $T$ הם בהכרח ממשיים.",
        isCorrect: true,
        explanation:
          "נכון (הטענה אינה נכונה): התנאי מגדיר אופרטור אוניטרי. ערכיו העצמיים מקיימים $|\\lambda| = 1$ (על מעגל היחידה במישור המרוכב), אך אינם בהכרח ממשיים. לדוגמה, סיבוב ב-$\\pi/2$ הוא אוניטרי וערכיו העצמיים הם $\\pm i$.",
      },
      {
        id: "la2-q08-opt4",
        plainText:
          "אם $T$ נורמלי, וקטורים עצמיים של $T$ השייכים לערכים עצמיים שונים הם אורתוגונליים.",
        isCorrect: false,
        explanation:
          "שגוי לבחור בטענה זו: זוהי אחת התכונות היסודיות והנכונות של אופרטורים נורמליים.",
      },
    ],
  },
  {
    id: "la2-q09-real-orthogonal-matrices-eigenvalues",
    domain: "מטריצות אורתוגונליות ממשיות וערכים עצמיים",
    title: "אלגברה ליניארית 2 - מטריצות אורתוגונליות ממשיות וערכים עצמיים",
    context:
      "תהי $U \\in \\mathbb{R}^{n\\times n}$ מטריצה אורתוגונלית המקיימת $\\det(U) = -1$.",
    formulaLatex: "U^T U = I, \\quad \\det(U) = -1",
    instruction: "איזו מהטענות הבאות נכונה בהכרח לגבי המטריצה $U$?",
    options: [
      {
        id: "la2-q09-opt1",
        plainText: "ל-$U$ יש בהכרח ערך עצמי $\\lambda = 1$.",
        isCorrect: false,
        explanation:
          "שגוי: לדוגמה עבור $n=1$, המטריצה $U = (-1)$ מקיימת $\\det(U) = -1$ אך אין לה ערך עצמי 1.",
      },
      {
        id: "la2-q09-opt2",
        plainText: "הממד $n$ חייב להיות מספר זוגי.",
        isCorrect: false,
        explanation:
          "שגוי: המטריצה $U = (-1)$ מסדר $1 \\times 1$ או שיקוף ב-$\\mathbb{R}^3$ הם מסדר אי-זוגי ובעלי דטרמיננטה $-1$.",
      },
      {
        id: "la2-q09-opt3",
        plainText: "ל-$U$ יש בהכרח ערך עצמי $\\lambda = -1$.",
        mathText: "\\exists v \\neq 0: \\; U v = -v",
        isCorrect: true,
        explanation:
          "נכון: הערכים העצמיים המרוכבים שאינם ממשיים מופיעים בזוגות צמודים מהצורה $e^{i\\theta}, e^{-i\\theta}$, שמכפלתם היא $|e^{i\\theta}|^2 = 1 > 0$. הערכים העצמיים הממשיים היחידים האפשריים עבור מטריצה אורתוגונלית הם $1$ או $-1$. היות ש-$\\det(U) = -1$ היא מכפלת כל הערכים העצמיים, מכפלת הערכים העצמיים הממשיים חייבת להיות שלילית, דבר המחייב קיום מספר אי-זוגי של ערכים עצמיים השווים ל-$-1$, ובפרט קיים לפחות אחד כזה.",
      },
      {
        id: "la2-q09-opt4",
        plainText:
          "המטריצה $U$ ניתנת ללכסון מעל שדה הממשיים $\\mathbb{R}$.",
        isCorrect: false,
        explanation:
          "שגוי: המטריצה יכולה לכלול בלוקי סיבוב בעלי ערכים עצמיים מרוכבים טהורים, ולכן אינה לכסינה מעל $\\mathbb{R}$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "la2-q10-singular-values-spectral-radius",
    domain: "ערכים סינגולריים ורדיוס ספקטרלי",
    title: "אלגברה ליניארית 2 - ערכים סינגולריים ורדיוס ספקטרלי",
    context:
      "תהי $A \\in \\mathbb{C}^{n\\times n}$ מטריצה ריבועית. נסמן ב-$\\sigma_{\\max}(A)$ את הערך הסינגולרי המקסימלי של $A$, וב-$|\\lambda_{\\max}(A)|$ את הרדיוס הספקטרלי שלה.",
    formulaLatex:
      "\\sigma_{\\max}(A) = \\|A\\|_2, \\quad |\\lambda_{\\max}(A)| = \\max_j |\\lambda_j(A)|",
    instruction: "איזו מהטענות הבאות נכונה תמיד לכל מטריצה ריבועית?",
    options: [
      {
        id: "la2-q10-opt1",
        plainText:
          "$\\sigma_{\\max}(A) \\le |\\lambda_{\\max}(A)|$, ומתקיים שוויון אם $A$ נורמלית.",
        isCorrect: false,
        explanation:
          "שגוי: כיוון אי-השוויון הפוך; הנורמה האופרטורית חוסמת מלמעלה את הערכים העצמיים ולא להפך.",
      },
      {
        id: "la2-q10-opt2",
        plainText:
          "$|\\lambda_{\\max}(A)| = \\sigma_{\\max}(A)$ לכל מטריצה ריבועית $A$.",
        isCorrect: false,
        explanation:
          "שגוי: לדוגמה עבור מטריצת ז'ורדן נילפוטנטית $A = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$, כל הערכים העצמיים הם 0 אך $\\sigma_{\\max}(A) = 1$.",
      },
      {
        id: "la2-q10-opt3",
        plainText:
          "$\\sigma_{\\max}(A) = \\sqrt{|\\lambda_{\\max}(A)|}$ לכל מטריצה $A$.",
        isCorrect: false,
        explanation:
          "שגוי: זוהי שגיאה הנובעת מבלבול עם הקשר $\\sigma_j = \\sqrt{\\lambda_j(A^* A)}$.",
      },
      {
        id: "la2-q10-opt4",
        plainText:
          "$|\\lambda_{\\max}(A)| \\le \\sigma_{\\max}(A)$, ומתקיים שוויון אם $A$ נורמלית.",
        mathText: "|\\lambda_{\\max}(A)| \\le \\sigma_{\\max}(A)",
        isCorrect: true,
        explanation:
          "נכון: הנורמה המושרית היא $\\sigma_{\\max}(A) = \\sup_{\\|x\\|=1} \\|Ax\\|$. עבור וקטור עצמי מנורמל $v$ עם ע\"ע $\\lambda$ מתקיים $|\\lambda| = \\|Av\\| \\le \\sigma_{\\max}(A)$, ולכן תמיד $|\\lambda_{\\max}| \\le \\sigma_{\\max}$. אם $A$ נורמלית, לפי הפירוק הספקטרלי האוניטרי הערכים הסינגולריים הם בדיוק הערכים המוחלטים של הערכים העצמיים, ולכן מתקיים שוויון מדויק.",
      },
    ],
  },
  {
    id: "la2-q11-orthogonal-projection-gram-schmidt",
    domain: "הטלה אורתוגונלית על תת-מרחב",
    title: "אלגברה ליניארית 2 - הטלה אורתוגונלית על תת-מרחב",
    context:
      "במרחב $\\mathbb{R}^4$ עם המכפלה הפנימית הסטנדרטית, נתון תת-המרחב $W = \\operatorname{Sp}\\{w_1, w_2\\}$, כאשר:",
    formulaLatex:
      "w_1 = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad w_2 = \\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\\\ -1 \\end{pmatrix}, \\quad v = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\\\ 4 \\end{pmatrix}",
    instruction:
      "מהו וקטור ההטלה האורתוגונלית $P_W(v)$ של הווקטור $v$ על תת-המרחב $W$?",
    options: [
      {
        id: "la2-q11-opt1",
        plainText: "$(3, 2, 3, 2)^T$",
        mathText: "(3, 2, 3, 2)^T",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה הנובעת מטעות חישוב במקדמי המכפלות הסקלריות של $w_1$ ו-$w_2$.",
      },
      {
        id: "la2-q11-opt2",
        plainText: "$(1, 2, 1, 2)^T$",
        mathText: "(1, 2, 1, 2)^T",
        isCorrect: false,
        explanation:
          "שגוי: וקטור זה אינו מוכל במרחב $W$ הנפרש ע\"י $w_1$ ו-$w_2$ (אינו מקיים את תנאי השוויון בין הקואורדינטות האי-זוגיות).",
      },
      {
        id: "la2-q11-opt3",
        plainText: "$\\frac{1}{2}(5, -1, 5, -1)^T$",
        mathText: "\\frac{1}{2}(5, -1, 5, -1)^T",
        isCorrect: false,
        explanation:
          "שגוי: שגיאה באחד מסימני הווקטורים במהלך סכימת ההטלות.",
      },
      {
        id: "la2-q11-opt4",
        plainText: "$(2, 3, 2, 3)^T$",
        mathText: "(2, 3, 2, 3)^T",
        isCorrect: true,
        explanation:
          "נכון: הווקטורים $w_1, w_2$ אורתוגונליים זה לזה: $\\langle w_1, w_2 \\rangle = 1 - 1 + 1 - 1 = 0$. לכן נוסחת ההטלה היא $P_W(v) = \\frac{\\langle v, w_1 \\rangle}{\\|w_1\\|^2} w_1 + \\frac{\\langle v, w_2 \\rangle}{\\|w_2\\|^2} w_2$. נחשב: $\\|w_1\\|^2 = 4, \\langle v, w_1 \\rangle = 1+2+3+4 = 10 \\implies 5/2$; וכן $\\|w_2\\|^2 = 4, \\langle v, w_2 \\rangle = 1-2+3-4 = -2 \\implies -1/2$. ההטלה: $\\frac{5}{2}(1,1,1,1)^T - \\frac{1}{2}(1,-1,1,-1)^T = (2, 3, 2, 3)^T$.",
      },
    ],
  },
  {
    id: "la2-q12-canonical-self-adjoint-decomposition",
    domain: "פירוק קנוני לאופרטורים צמודים לעצמם וחילופיות",
    title:
      "אלגברה ליניארית 2 - פירוק קנוני לאופרטורים צמודים לעצמם וחילופיות",
    context:
      "יהי $V$ מרחב מכפלה פנימית מממד סופי מעל $\\mathbb{C}$, ויהי $T: V \\to V$ אופרטור ליניארי המוצג באופן יחיד כ-$T = T_1 + i T_2$, כאשר $T_1, T_2$ הם אופרטורים צמודים לעצמם ($T_1^* = T_1, T_2^* = T_2$).",
    formulaLatex: "T = T_1 + i T_2, \\quad T^* = T_1 - i T_2",
    instruction:
      "איזה מהתנאים הבאים שקול לכך ש-$T$ הוא אופרטור נורמלי ($T T^* = T^* T$)?",
    options: [
      {
        id: "la2-q12-opt1",
        plainText: "$T_1 T_2 = -T_2 T_1$",
        mathText: "T_1 T_2 = -T_2 T_1",
        isCorrect: false,
        explanation:
          "שגוי: אנטי-קומוטטיביות מביאה לכך ש-$T T^* - T^* T = 4i T_1 T_2 \\neq 0$, ולכן אינה גוררת נורמליות.",
      },
      {
        id: "la2-q12-opt2",
        plainText: "$T_1$ או $T_2$ הוא אופרטור האפס.",
        isCorrect: false,
        explanation:
          "שגוי: זהו מקרה פרטי שבו $T$ צמוד לעצמו או אנטי-צמוד לעצמו, אך אינו תנאי הכרחי; קיימים אופרטורים נורמליים רבים שבהם שני החלקים שונים מאפס.",
      },
      {
        id: "la2-q12-opt3",
        plainText: "$T_1^2 + T_2^2 = I$",
        mathText: "T_1^2 + T_2^2 = I",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה שקול לכך ש-$T$ אופרטור אוניטרי (בהנחה שהוא נורמלי), אך אינו מאפיין את כלל האופרטורים הנורמליים.",
      },
      {
        id: "la2-q12-opt4",
        plainText: "$T_1 T_2 = T_2 T_1$ (האופרטורים מתחלפים).",
        mathText: "T_1 T_2 = T_2 T_1",
        isCorrect: true,
        explanation:
          "נכון: נחשב את שני האגפים: $T T^* = (T_1 + i T_2)(T_1 - i T_2) = T_1^2 + T_2^2 + i(T_2 T_1 - T_1 T_2)$, וכן $T^* T = (T_1 - i T_2)(T_1 + i T_2) = T_1^2 + T_2^2 + i(T_1 T_2 - T_2 T_1)$. השוויון $T T^* = T^* T$ מתקיים אם ורק אם $i(T_2 T_1 - T_1 T_2) = i(T_1 T_2 - T_2 T_1) \\iff 2(T_1 T_2 - T_2 T_1) = 0 \\iff T_1 T_2 = T_2 T_1$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_LINALG2_QUESTIONS = LINEAR_ALGEBRA_2_QUESTIONS;

/**
 * Onboarding sample: one from blocks A and B, one from combined C+D, then shuffle.
 */
export function sampleLinearAlgebra2OnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = LINEAR_ALGEBRA_2_QUESTIONS.slice(0, 3);
  const groupB = LINEAR_ALGEBRA_2_QUESTIONS.slice(3, 6);
  const groupC = LINEAR_ALGEBRA_2_QUESTIONS.slice(6, 12);

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
