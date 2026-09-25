import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Linear Algebra 1 diagnostic bank (12Q).
 * Display name: "אלגברה ליניארית 1" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const LINEAR_ALGEBRA_1_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "la1-q01-complex-roots-unity",
    domain: "מספרים מרוכבים ושורשי יחידה",
    title: "אלגברה ליניארית 1 - מספרים מרוכבים ושורשי יחידה",
    context:
      "יהי $z_0$ הפתרון בעל הארגומנט החיובי הקטן ביותר של המשוואה המרוכבת $z^4 = -16i$.",
    formulaLatex: "z^4 = -16i = 16\\operatorname{cis}\\left(\\frac{3\\pi}{2}\\right)",
    instruction: "למה שווה הביטוי $z_0^6$?",
    options: [
      {
        id: "la1-q01-opt1",
        plainText: "$64 \\operatorname{cis}\\left(\\frac{\\pi}{4}\\right)$",
        mathText: "64 \\operatorname{cis}\\left(\\frac{\\pi}{4}\\right)",
        isCorrect: true,
        explanation:
          "נכון: נמיר להצגה קוטבית: $-16i = 16\\operatorname{cis}(3\\pi/2)$. שורשי המשוואה לפי דה-מואבר הם $z_k = 2\\operatorname{cis}\\left(\\frac{3\\pi/2 + 2\\pi k}{4}\\right) = 2\\operatorname{cis}\\left(\\frac{3\\pi}{8} + \\frac{\\pi k}{2}\\right)$. הארגומנט החיובי הקטן ביותר מתקבל עבור $k=0$ והוא $\\theta_0 = \\frac{3\\pi}{8}$. לפיכך: $z_0^6 = 2^6\\operatorname{cis}\\left(6 \\cdot \\frac{3\\pi}{8}\\right) = 64\\operatorname{cis}\\left(\\frac{9\\pi}{4}\\right) = 64\\operatorname{cis}\\left(\\frac{\\pi}{4}\\right)$.",
      },
      {
        id: "la1-q01-opt2",
        plainText: "$64 \\operatorname{cis}\\left(\\frac{3\\pi}{4}\\right)$",
        mathText: "64 \\operatorname{cis}\\left(\\frac{3\\pi}{4}\\right)",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה הנובעת מטעות חישוב בכפל הזווית ב-6 או מחלוקה שגויה של הארגומנט המקורי.",
      },
      {
        id: "la1-q01-opt3",
        plainText: "$64 \\operatorname{cis}\\left(\\frac{\\pi}{2}\\right)$",
        mathText: "64 \\operatorname{cis}\\left(\\frac{\\pi}{2}\\right)",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה הנובעת משכחת השורש הרביעי של הארגומנט ($3\\pi/2$) והעלאתו ישירות בחזקת 6.",
      },
      {
        id: "la1-q01-opt4",
        plainText: "$-64$",
        mathText: "-64",
        isCorrect: false,
        explanation:
          "שגוי: $-64 = 64\\operatorname{cis}(\\pi)$, אך הזווית שהתקבלה היא $\\pi/4$, ולכן לתוצאה יש חלק מדומה שאינו אפס ($32\\sqrt{2} + 32\\sqrt{2}i$).",
      },
    ],
  },
  {
    id: "la1-q02-linear-systems-inf-solutions",
    domain: "מערכות משוואות ליניאריות ודרגה",
    title: "אלגברה ליניארית 1 - מערכות משוואות ליניאריות ודרגה",
    context:
      "נתונה מערכת של 5 משוואות ליניאריות ב-5 נעלמים, $Ax = b$, שיש לה אינסוף פתרונות שונים.",
    formulaLatex: "Ax = b, \\quad A \\in \\mathbb{R}^{5 \\times 5}, \\; b \\in \\mathbb{R}^5",
    instruction: "איזו מהטענות הבאות חייבת להתקיים בהכרח?",
    options: [
      {
        id: "la1-q02-opt1",
        plainText: "שורות המטריצה המורחבת $(A \\mid b)$ תלויות ליניארית.",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט רושה-קפלי, קיום אינסוף פתרונות מחייב כי $\\operatorname{rank}(A \\mid b) = \\operatorname{rank}(A) < 5$. מאחר שלמטריצה המורחבת יש 5 שורות ודרגתה קטנה ממש מ-5, בהכרח שורותיה תלויות ליניארית.",
      },
      {
        id: "la1-q02-opt2",
        plainText:
          "למטריצה המורחבת $(A \\mid b)$ יש שורת אפסים עוד לפני ביצוע פעולות דירוג.",
        isCorrect: false,
        explanation:
          "שגוי: תלות ליניארית של שורות אינה מחייבת שורת אפסים במטריצה הגולמית; שורת אפסים עשויה להופיע רק במהלך הדירוג.",
      },
      {
        id: "la1-q02-opt3",
        plainText: "קיימות שתי משוואות במערכת שהן כפולה סקלרית זו של זו.",
        isCorrect: false,
        explanation:
          "שגוי: תלות ליניארית יכולה לערב 3, 4 או את כל 5 המשוואות יחד (למשל $R_5 = R_1 + R_2 + R_3 + R_4$), ללא קיום שתי שורות פרופורציוניות.",
      },
      {
        id: "la1-q02-opt4",
        plainText:
          "דרגת המטריצה המורחבת $(A \\mid b)$ שונה מדרגת מטריצת המקדמים $A$.",
        mathText: "\\operatorname{rank}(A \\mid b) \\neq \\operatorname{rank}(A)",
        isCorrect: false,
        explanation:
          "שגוי: אי-שוויון בין הדרגות מאפיין מערכת סתירה ללא פתרון כלל. עבור מערכת בעלת אינסוף פתרונות הדרגות שוות בהכרח.",
      },
    ],
  },
  {
    id: "la1-q03-subspaces-dimension-theorem",
    domain: "משפט הממדים ותת-מרחבים",
    title: "אלגברה ליניארית 1 - משפט הממדים ותת-מרחבים",
    context:
      "יהיו $U, W$ שני תת-מרחבים שונים של מרחב המטריצות $\\mathbb{R}^{2\\times 2}$ (שממדו 4), כך ש-$\\dim(U) = \\dim(W) = 3$.",
    formulaLatex:
      "U \\neq W \\le \\mathbb{R}^{2 \\times 2}, \\quad \\dim(U) = \\dim(W) = 3",
    instruction: "מהו ממד מרחב החיתוך $\\dim(U \\cap W)$?",
    options: [
      {
        id: "la1-q03-opt1",
        plainText: "בהכרח $2$.",
        mathText: "\\dim(U \\cap W) = 2",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט הממדים: $\\dim(U+W) = \\dim(U) + \\dim(W) - \\dim(U \\cap W) = 3 + 3 - \\dim(U \\cap W) = 6 - \\dim(U \\cap W)$. מכיוון ש-$U \\neq W$ ו-$U \\subseteq U+W$, ממד הסכום גדול ממש מ-3. מאידך, $U+W \\le \\mathbb{R}^{2\\times 2}$ שממדו 4, ולכן בהכרח $\\dim(U+W) = 4$. מכאן: $\\dim(U \\cap W) = 6 - 4 = 2$.",
      },
      {
        id: "la1-q03-opt2",
        plainText: "בהכרח $1$.",
        mathText: "\\dim(U \\cap W) = 1",
        isCorrect: false,
        explanation:
          "שגוי: אם ממד החיתוך היה 1, ממד הסכום היה $6 - 1 = 5$, אך המרחב כולו הוא ממימד 4 ולכן לא ייתכן תת-מרחב ממימד 5.",
      },
      {
        id: "la1-q03-opt3",
        plainText: "יכול להיות $2$ או $3$.",
        isCorrect: false,
        explanation:
          "שגוי: אם ממד החיתוך היה 3, מאחר ש-$U \\cap W \\subseteq U$ ו-$\\dim(U)=3$ היה נובע ש-$U \\cap W = U = W$, בסתירה ישירה לנתון ש-$U \\neq W$.",
      },
      {
        id: "la1-q03-opt4",
        plainText: "בהכרח $0$ (הסכום הוא סכום ישר $U \\oplus W$).",
        mathText: "\\dim(U \\cap W) = 0",
        isCorrect: false,
        explanation:
          "שגוי: סכום ישר דורש שממד הסכום יהיה $3+3=6$, דבר שאינו אפשרי במרחב ממימד 4.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "la1-q04-linear-transformation-kernel",
    domain: "טרנספורמציות ליניאריות וגרעין",
    title: "אלגברה ליניארית 1 - טרנספורמציות ליניאריות וגרעין",
    context:
      "תהי $T: \\mathbb{R}^{2\\times 2} \\to \\mathbb{R}_3[x]$ העתקה ליניארית המוגדרת על ידי:",
    formulaLatex:
      "T\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = (a+c-d) + 4cx + 4cx^2 + (a+c-d)x^3",
    instruction: "מהו ממד הגרעין של ההעתקה, $\\dim(\\ker(T))$?",
    options: [
      {
        id: "la1-q04-opt1",
        plainText: "$1$",
        mathText: "\\dim(\\ker(T)) = 1",
        isCorrect: false,
        explanation:
          "שגוי: קביעה זו מתעלמת מכך שהמשתנה $b$ אינו מופיע כלל בהגדרת ההעתקה ומהווה משתנה חופשי בפני עצמו.",
      },
      {
        id: "la1-q04-opt2",
        plainText: "$2$",
        mathText: "\\dim(\\ker(T)) = 2",
        isCorrect: true,
        explanation:
          "נכון: מטריצה שייכת לגרעין אם פולינום התמונה הוא פולינום האפס. מהשוואת מקדמים: $4c = 0 \\implies c = 0$, וכן $a + c - d = 0 \\implies a - d = 0 \\implies d = a$. המשתנה $b$ אינו מופיע כלל ולכן חופשי. ישנם 2 משתנים חופשיים ($a, b$), ובסיס לגרעין נפרס על ידי שתי מטריצות בלתי תלויות (למשל עבור $a=1,b=0$ ועבור $a=0,b=1$). לכן הממד הוא 2.",
      },
      {
        id: "la1-q04-opt3",
        plainText: "$3$",
        mathText: "\\dim(\\ker(T)) = 3",
        isCorrect: false,
        explanation:
          "שגוי: במרחב יש 4 דרגות חופש ומתקבלות 2 משוואות בלתי תלויות ($c=0, a=d$), ולכן נותרים 2 משתנים חופשיים ולא 3.",
      },
      {
        id: "la1-q04-opt4",
        plainText: "$0$ (ההעתקה חח״ע)",
        mathText: "\\dim(\\ker(T)) = 0",
        isCorrect: false,
        explanation:
          "שגוי: כל מטריצה שבה רק $b \\neq 0$ (למשל $a=c=d=0$) מועתקת לפולינום האפס, ולכן ההעתקה אינה חח״ע.",
      },
    ],
  },
  {
    id: "la1-q05-operator-composition-containment",
    domain: "הרכבת אופרטורים ליניאריים",
    title: "אלגברה ליניארית 1 - הרכבת אופרטורים ליניאריים",
    context:
      "יהיו $T, S: V \\to V$ אופרטורים ליניאריים על מרחב וקטורי $V$. נתון כי מתקיים היחס $\\operatorname{Im}(S) \\subseteq \\ker(T)$.",
    formulaLatex: "\\operatorname{Im}(S) \\subseteq \\ker(T)",
    instruction: "איזו מהטענות הבאות נכונה בהכרח?",
    options: [
      {
        id: "la1-q05-opt1",
        plainText: "$S \\circ T = 0$ (אופרטור האפס).",
        mathText: "S \\circ T = 0",
        isCorrect: false,
        explanation:
          "שגוי: סדר ההרכבה משמעותי. הנתון אינו מבטיח כי $\\operatorname{Im}(T) \\subseteq \\ker(S)$, ולכן ההרכבה ההפוכה אינה בהכרח אפס.",
      },
      {
        id: "la1-q05-opt2",
        plainText: "$T \\circ S = 0$ (אופרטור האפס).",
        mathText: "T \\circ S = 0",
        isCorrect: true,
        explanation:
          "נכון: לכל וקטור $v \\in V$, תמונתו $S(v)$ שייכת למרחב התמונה $\\operatorname{Im}(S)$. מכיוון שנתון $\\operatorname{Im}(S) \\subseteq \\ker(T)$, נובע ש-$S(v) \\in \\ker(T)$. לפי הגדרת הגרעין: $T(S(v)) = 0$, ולכן $(T \\circ S)(v) = 0$ לכל $v \\in V$, כלומר $T \\circ S = 0$.",
      },
      {
        id: "la1-q05-opt3",
        plainText: "$\\dim(\\ker(T)) = \\dim(\\ker(S))$.",
        isCorrect: false,
        explanation:
          "שגוי: ממדי הגרעינים אינם חייבים להיות שווים (למשל כאשר $S=0$ ו-$T$ היא העתקת הזהות).",
      },
      {
        id: "la1-q05-opt4",
        plainText: "$T$ או $S$ הן בהכרח הפיכות.",
        isCorrect: false,
        explanation:
          "שגוי: אם שתיהן אופרטור האפס התנאי מתקיים, ואף אחת מהן אינה הפיכה (בהנחה ש-$V \\neq \\{0\\}$).",
      },
    ],
  },
  {
    id: "la1-q06-parametric-determinant",
    domain: "חישוב דטרמיננטה פרמטרית",
    title: "אלגברה ליניארית 1 - חישוב דטרמיננטה פרמטרית",
    context:
      "עבור פרמטר ממשי $x \\in \\mathbb{R}$, נתונה המטריצה הריבועית $A$ מסדר $3 \\times 3$:",
    formulaLatex:
      "A = \\begin{pmatrix} 2x & x & 3x \\\\ x & 3x & 2x \\\\ 3x & 2x & x \\end{pmatrix}",
    instruction: "למה שווה הדטרמיננטה $\\det(A)$?",
    options: [
      {
        id: "la1-q06-opt1",
        plainText: "$18x^3$",
        mathText: "18x^3",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה הנובעת מטעות בסימן במהלך פיתוח הדטרמיננטה לפי מינורים או דירוג.",
      },
      {
        id: "la1-q06-opt2",
        plainText: "$-18x^3$",
        mathText: "-18x^3",
        isCorrect: true,
        explanation:
          "נכון: נוציא סקלר $x$ מכל אחת מ-3 השורות: $\\det(A) = x^3 \\begin{vmatrix} 2 & 1 & 3 \\\\ 1 & 3 & 2 \\\\ 3 & 2 & 1 \\end{vmatrix}$. נחבר את כל השורות לשורה הראשונה: $R_1 \\to R_1 + R_2 + R_3 = (6, 6, 6) = 6(1, 1, 1)$. נדרג באמצעות השורה הראשונה: השורות הבאות הופכות ל-$(0, 2, 1)$ ו-$(0, -1, -2)$. דטרמיננטת המטריצה $2\\times 2$ היא $2(-2) - 1(-1) = -3$. לכן: $\\det(A) = x^3 \\cdot 6 \\cdot (-3) = -18x^3$.",
      },
      {
        id: "la1-q06-opt3",
        plainText: "$12x^3$",
        mathText: "12x^3",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה המתקבלת מחישוב לקוי של האלכסונים (כלל סארוס) עם השמטת חלק מהאיברים השליליים.",
      },
      {
        id: "la1-q06-opt4",
        plainText: "$0$",
        mathText: "0",
        isCorrect: false,
        explanation:
          "שגוי: שורות המטריצה בלתי תלויות ליניארית (לכל $x \\neq 0$), ולכן הדטרמיננטה אינה מתאפסת זהותית.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "la1-q07-similarity-characteristic-polynomial",
    domain: "דמיון מטריצות ופולינום אופייני",
    title: "אלגברה ליניארית 1 - דמיון מטריצות ופולינום אופייני",
    context:
      "יהיו $A, B \\in \\mathbb{R}^{n \\times n}$ מטריצות ריבועיות. נתון כי $A$ הפיכה, $B$ אינה הפיכה, ולשתיהן אותו הפולינום האופייני בדיוק ($p_A(\\lambda) = p_B(\\lambda)$).",
    formulaLatex:
      "A, B \\in \\mathbb{R}^{n \\times n}, \\; \\det(A) \\neq 0, \\; \\det(B) = 0, \\; p_A(\\lambda) = p_B(\\lambda)",
    instruction: "מה מהבאים מתאר נכונה את המצב הנתון?",
    options: [
      {
        id: "la1-q07-opt1",
        plainText:
          "המטריצות $A$ ו-$B$ דומות אם ורק אם הן בעלות אותה דרגה.",
        isCorrect: false,
        explanation:
          "שגוי: מטריצות דומות הן תמיד בעלות אותה דרגה, אך כאן $A$ הפיכה (דרגה $n$) ו-$B$ אינה הפיכה (דרגה קטנה מ-$n$).",
      },
      {
        id: "la1-q07-opt2",
        plainText:
          "המטריצות בהכרח דומות כי שוויון פולינומים אופייניים גורר שוויון ערכים עצמיים וריבויים.",
        isCorrect: false,
        explanation:
          "שגוי: שוויון פולינומים אופייניים אינו גורר דמיון מטריצות בכללי, ובפרט לא בין מטריצה הפיכה ללא הפיכה.",
      },
      {
        id: "la1-q07-opt3",
        plainText:
          "נתוני השאלה סותרים: לא ייתכן שלמטריצה הפיכה ולמטריצה שאינה הפיכה יהיה אותו פולינום אופייני.",
        isCorrect: true,
        explanation:
          "נכון: האיבר החופשי של הפולינום האופייני מקיים $p_M(0) = (-1)^n \\det(M)$. היות ש-$A$ הפיכה, $\\det(A) \\neq 0 \\implies p_A(0) \\neq 0$. היות ש-$B$ אינה הפיכה, $\\det(B) = 0 \\implies p_B(0) = 0$. מכאן ש-$p_A(0) \\neq p_B(0)$, בסתירה לכך שהפולינומים האופייניים זהים.",
      },
      {
        id: "la1-q07-opt4",
        plainText: "הדמיון תלוי בריבוי הגיאומטרי של הערך העצמי $0$.",
        isCorrect: false,
        explanation:
          "שגוי: למטריצה הפיכה כלל אין ערך עצמי $0$, ולכן לא ייתכן שוויון פולינומים מלכתחילה.",
      },
    ],
  },
  {
    id: "la1-q08-eigenvalues-multiplicities",
    domain: "ריבוי אלגברי וריבוי גיאומטרי",
    title: "אלגברה ליניארית 1 - ריבוי אלגברי וריבוי גיאומטרי",
    context: "נתונה המטריצה $A$ מסדר $3 \\times 3$ שכל שורותיה זהות:",
    formulaLatex:
      "A = \\begin{pmatrix} 1 & -2 & 3 \\\\ 1 & -2 & 3 \\\\ 1 & -2 & 3 \\end{pmatrix}",
    instruction:
      "מהם הריבוי האלגברי (ר״א) והריבוי הגיאומטרי (ר״ג) של הערך העצמי $\\lambda = 0$?",
    options: [
      {
        id: "la1-q08-opt1",
        plainText: "ר״א = $2$, ר״ג = $1$",
        isCorrect: false,
        explanation:
          "שגוי: מאחר שדרגת המטריצה היא 1, ממד הגרעין הוא $3-1=2$, ולכן הריבוי הגיאומטרי הוא 2 ולא 1.",
      },
      {
        id: "la1-q08-opt2",
        plainText: "ר״א = $1$, ר״ג = $1$",
        isCorrect: false,
        explanation:
          "שגוי: הריבוי האלגברי חוסם מלרע את הריבוי הגיאומטרי, ולכן לא ייתכן שר״ג יהיה גדול מ-1 אם ר״א היה 1.",
      },
      {
        id: "la1-q08-opt3",
        plainText: "ר״א = $2$, ר״ג = $2$",
        mathText: "\\text{ר״א} = 2, \\quad \\text{ר״ג} = 2",
        isCorrect: true,
        explanation:
          "נכון: שורות המטריצה זהות, ולכן $\\operatorname{rank}(A) = 1$. לפי משפט הממד, הריבוי הגיאומטרי הוא $\\dim(\\ker(A - 0I)) = 3 - \\operatorname{rank}(A) = 3 - 1 = 2$. עקבת המטריצה היא $\\operatorname{tr}(A) = 1 + (-2) + 3 = 2$. סכום כל הערכים העצמיים שווה לעקבה: מאחר ש-$\\lambda=0$ בעל ר״ג 2, הריבוי האלגברי שלו הוא לפחות 2. אם נסמן $0 + 0 + \\lambda_3 = 2$, נקבל $\\lambda_3 = 2$. לכן הריבוי האלגברי של 0 הוא בדיוק 2.",
      },
      {
        id: "la1-q08-opt4",
        plainText: "ר״א = $3$, ר״ג = $2$",
        isCorrect: false,
        explanation:
          "שגוי: אם הריבוי האלגברי היה 3, סכום הערכים העצמיים (העקבה) היה חייב להיות $0+0+0=0$, אך עקבת המטריצה היא $1-2+3 = 2$.",
      },
    ],
  },
  {
    id: "la1-q09-diagonalizability-geometric-multiplicity",
    domain: "לכסון מטריצות ומשפט הפירוק",
    title: "אלגברה ליניארית 1 - לכסון מטריצות ומשפט הפירוק",
    context:
      "תהי $A \\in \\mathbb{R}^{3 \\times 3}$ מטריצה בעלת פולינום אופייני $p_A(\\lambda) = \\lambda(\\lambda-2)^2$. ידוע כי דרגת המטריצה המוסטת היא $\\operatorname{rank}(A-2I) = 1$.",
    formulaLatex:
      "p_A(\\lambda) = \\lambda(\\lambda-2)^2, \\quad \\operatorname{rank}(A-2I) = 1",
    instruction: "האם המטריצה $A$ לכסינה מעל $\\mathbb{R}$?",
    options: [
      {
        id: "la1-q09-opt1",
        plainText:
          "לא, משום שהריבוי הגיאומטרי של $\\lambda=2$ הוא $1$, בעוד שריבויו האלגברי הוא $2$.",
        isCorrect: false,
        explanation:
          "שגוי: לפי משפט הממד $\\dim(\\ker(A-2I)) = 3 - \\operatorname{rank}(A-2I) = 3 - 1 = 2$, ולכן הריבוי הגיאומטרי הוא 2 ולא 1.",
      },
      {
        id: "la1-q09-opt2",
        plainText:
          "לא, משום שיש לה ערך עצמי $0$ ולכן היא אינה הפיכה.",
        isCorrect: false,
        explanation:
          "שגוי: הפיכות אינה תנאי ללכסון; מטריצת האפס ומטריצות הטלה רבות אינן הפיכות אך הן לכסינות לחלוטין.",
      },
      {
        id: "la1-q09-opt3",
        plainText:
          "כן, משום שהריבוי הגיאומטרי של $\\lambda=2$ הוא $3 - 1 = 2$, והוא שווה לריבוי האלגברי.",
        mathText:
          "\\dim(\\ker(A-2I)) = 3 - 1 = 2 = \\text{ר״א}(\\lambda=2)",
        isCorrect: true,
        explanation:
          "נכון: עבור $\\lambda=0$, הריבוי האלגברי הוא 1 ולכן תמיד ר״ג = ר״א = 1. עבור $\\lambda=2$, הריבוי האלגברי הוא 2 (החזקה בפולינום). הריבוי הגיאומטרי הוא $\\dim(\\ker(A-2I)) = 3 - \\operatorname{rank}(A-2I) = 3 - 1 = 2$. מכיוון שלכל הערכים העצמיים הריבוי האלגברי שווה לגיאומטרי והפולינום מתפרק לגורמים ליניאריים, המטריצה לכסינה.",
      },
      {
        id: "la1-q09-opt4",
        plainText:
          "לא ניתן לקבוע מבלי לדעת מהי הדרגה של המטריצה $A$ עצמה.",
        isCorrect: false,
        explanation:
          "שגוי: הנתונים שסופקו על הפולינום האופייני ועל $\\operatorname{rank}(A-2I)$ מספיקים באופן מלא לקביעת לכסינות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "la1-q10-adjugate-matrix-determinant",
    domain: "מטריצה צמודה קלאסית (Adjugate)",
    title: "אלגברה ליניארית 1 - מטריצה צמודה קלאסית (Adjugate)",
    context:
      "תהי $B \\in \\mathbb{R}^{4 \\times 4}$ מטריצה הפיכה המקיימת $\\det(B) = -2$. נגדיר $C = B^{-1}$.",
    formulaLatex:
      "B \\in \\mathbb{R}^{4 \\times 4}, \\quad \\det(B) = -2, \\quad C = B^{-1}",
    instruction: "מה ערך הדטרמיננטה של המטריצה הצמודה, $\\det(\\operatorname{adj}(C))$?",
    options: [
      {
        id: "la1-q10-opt1",
        plainText: "$\\frac{1}{8}$",
        mathText: "\\frac{1}{8}",
        isCorrect: false,
        explanation:
          "שגוי: נשמט סימן המינוס; חזקה אי-זוגית של מספר שלילי ($(-1/2)^3$) מניבה תוצאה שלילית.",
      },
      {
        id: "la1-q10-opt2",
        plainText: "$-8$",
        mathText: "-8",
        isCorrect: false,
        explanation:
          "שגוי: חישוב זה מבוצע עבור המטריצה המקורית $B$ (כאשר $\\det(\\operatorname{adj}(B)) = (-2)^3 = -8$) ולא עבור המטריצה ההופכית $C$.",
      },
      {
        id: "la1-q10-opt3",
        plainText: "$8$",
        mathText: "8",
        isCorrect: false,
        explanation:
          "שגוי: שילוב של חישוב על המטריצה הלא-נכונה עם טעות בסימן החזקה.",
      },
      {
        id: "la1-q10-opt4",
        plainText: "$-\\frac{1}{8}$",
        mathText: "-\\frac{1}{8}",
        isCorrect: true,
        explanation:
          "נכון: ידוע כי $\\det(C) = \\det(B^{-1}) = \\frac{1}{\\det(B)} = -\\frac{1}{2}$. לפי הזהות עבור מטריצה מסדר $n \\times n$: $\\det(\\operatorname{adj}(M)) = (\\det(M))^{n-1}$. כאן $n = 4$, ולכן: $\\det(\\operatorname{adj}(C)) = (\\det(C))^{4-1} = \\left(-\\frac{1}{2}\\right)^3 = -\\frac{1}{8}$.",
      },
    ],
  },
  {
    id: "la1-q11-spanning-sets-linear-combination",
    domain: "מרחבים נפרשים ותלות ליניארית",
    title: "אלגברה ליניארית 1 - מרחבים נפרשים ותלות ליניארית",
    context:
      "יהי $V$ מרחב וקטורי מעל $\\mathbb{R}$, ויהיו $v_1, v_2, v_3 \\in V \\setminus \\{0\\}$ וקטורים שאינם וקטור האפס. נתון שוויון המרחבים הנפרשים הבא:",
    formulaLatex: "\\operatorname{Sp}\\{v_1, v_2\\} = \\operatorname{Sp}\\{v_1, v_3\\}",
    instruction: "איזו מהטענות הבאות נכונה בהכרח?",
    options: [
      {
        id: "la1-q11-opt1",
        plainText: "קיים סקלר $k \\in \\mathbb{R}$ כך ש-$v_3 = k v_2$.",
        isCorrect: false,
        explanation:
          "שגוי: $v_3$ יכול להיות תלוי ליניארית גם ב-$v_1$. לדוגמה ב-$\\mathbb{R}^2$: $v_1=(1,0)$, $v_2=(0,1)$ ו-$v_3=(1,1)$. המרחבים הנפרשים זהים אך $v_3$ אינו כפולה של $v_2$.",
      },
      {
        id: "la1-q11-opt2",
        plainText: "הקבוצה $\\{v_1, v_2, v_3\\}$ היא בלתי תלויה ליניארית.",
        isCorrect: false,
        explanation:
          "שגוי: הקבוצה תלויה ליניארית בהכרח מכיוון ש-$v_3 \\in \\operatorname{Sp}\\{v_1, v_2\\}$.",
      },
      {
        id: "la1-q11-opt3",
        plainText: "בהכרח מתקיים שוויון וקטורים $v_2 = v_3$.",
        isCorrect: false,
        explanation:
          "שגוי: בסיסים שונים או קבוצות פורשות שונות יכולים לפרוש בדיוק את אותו תת-מרחב ללא שוויון בין הווקטורים.",
      },
      {
        id: "la1-q11-opt4",
        plainText:
          "הווקטור $v_3$ הוא צירוף ליניארי של הווקטורים $v_1$ ו-$v_2$.",
        mathText: "v_3 \\in \\operatorname{Sp}\\{v_1, v_2\\}",
        isCorrect: true,
        explanation:
          "נכון: שוויון קבוצות פורשות גורר שכל איבר בקבוצה הפורשת הימנית שייך למרחב הנפרש על ידי הקבוצה השמאלית. בפרט, $v_3 \\in \\operatorname{Sp}\\{v_1, v_3\\} = \\operatorname{Sp}\\{v_1, v_2\\}$, ולכן לפי הגדרת ה-$\\operatorname{Sp}$, הווקטור $v_3$ ניתן להצגה כצירוף ליניארי של $v_1$ ו-$v_2$.",
      },
    ],
  },
  {
    id: "la1-q12-nilpotent-kernel-image-equality",
    domain: "אופרטורים נילפוטנטיים ושוויון תמונה וגרעין",
    title: "אלגברה ליניארית 1 - אופרטורים נילפוטנטיים ושוויון תמונה וגרעין",
    context:
      "יהי $V$ מרחב וקטורי ממימד סופי, ותהי $T: V \\to V$ העתקה ליניארית המקיימת את השוויון $\\ker(T) = \\operatorname{Im}(T)$.",
    formulaLatex: "\\ker(T) = \\operatorname{Im}(T)",
    instruction: "מה ניתן להסיק לגבי ההרכבה $T^2 = T \\circ T$?",
    options: [
      {
        id: "la1-q12-opt1",
        plainText: "$T^2 = I$ (העתקת הזהות).",
        mathText: "T^2 = I",
        isCorrect: false,
        explanation:
          "שגוי: אם $T^2=I$, ההעתקה $T$ הפיכה ולכן $\\ker(T)=\\{0\\}$ בעוד $\\operatorname{Im}(T)=V$, בסתירה לכך ש-$V \\neq \\{0\\}$.",
      },
      {
        id: "la1-q12-opt2",
        plainText: "$T^2$ היא העתקה הפיכה.",
        isCorrect: false,
        explanation:
          "שגוי: כפי שנראה, $T^2$ היא העתקת האפס ולכן רחוקה מלהיות הפיכה.",
      },
      {
        id: "la1-q12-opt3",
        plainText: "$\\dim(\\ker(T^2)) = \\frac{1}{2}\\dim(V)$.",
        isCorrect: false,
        explanation:
          "שגוי: ממד הגרעין של $T$ עצמה הוא מחצית ממד $V$ (לפי משפט הממד), אך עבור $T^2$ הגרעין הוא המרחב כולו $V$, ולכן ממדו הוא $\\dim(V)$.",
      },
      {
        id: "la1-q12-opt4",
        plainText: "$T^2 = 0$ (אופרטור האפס).",
        mathText: "T^2 = 0",
        isCorrect: true,
        explanation:
          "נכון: לכל וקטור $v \\in V$, הווקטור $T(v)$ שייך למרחב התמונה $\\operatorname{Im}(T)$. מאחר שנתון $\\operatorname{Im}(T) = \\ker(T)$, נובע כי $T(v) \\in \\ker(T)$. לכן, הפעלת ההעתקה $T$ על וקטור זה מאפסת אותו: $T^2(v) = T(T(v)) = 0$. מכיוון שהדבר מתקיים לכל $v \\in V$, נובע כי $T^2 = 0$ זהותית (אופרטור נילפוטנטי מסדר 2).",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_LINALG_QUESTIONS = LINEAR_ALGEBRA_1_QUESTIONS;

/**
 * Onboarding sample: one from blocks A and B, one from combined C+D, then shuffle.
 */
export function sampleLinearAlgebra1OnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = LINEAR_ALGEBRA_1_QUESTIONS.slice(0, 3);
  const groupB = LINEAR_ALGEBRA_1_QUESTIONS.slice(3, 6);
  const groupC = LINEAR_ALGEBRA_1_QUESTIONS.slice(6, 12);

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
