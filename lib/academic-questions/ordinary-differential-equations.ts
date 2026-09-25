import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Ordinary Differential Equations diagnostic bank (20Q).
 * Display name: "משוואות דיפרנציאליות רגילות" — no institutional course codes.
 * Answer-key contract (hard): Q1–5 → A, Q6–10 → B, Q11–15 → C, Q16–20 → D (5-5-5-5).
 */
export const ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS: AcademicDiagnosticQuestion[] =
  [
    // =========================================================================
    // בלוק 1: שאלות 1–5 — מפתח תשובה: אופציה 1 (אינדקס 0) נכונה
    // =========================================================================
    {
      id: "ode-q01-abel-wronskian-third-order",
      domain: "נוסחת אבל ותלות ליניארית",
      title: "משוואות דיפרנציאליות רגילות - נוסחת אבל ותלות ליניארית",
      context:
        "תהי המשוואה הליניארית ההומוגנית מסדר שלישי $y''' = f(x)y'' + g(x)y' + h(x)y$, כאשר $f, g, h: [-2, 2] \\to \\mathbb{R}$ פונקציות רציפות. נתונים שלושה פתרונות $y_1, y_2, y_3$ המקיימים בנקודה $x_0 = 0$ את התנאים: $y_1(0) = y_1'(0)$, $y_2(0) = y_2'(0)$, $y_3(0) = y_3'(0)$.",
      formulaLatex:
        "W(y_1, y_2, y_3)(x) = \\det \\begin{pmatrix} y_1(x) & y_2(x) & y_3(x) \\\\ y_1'(x) & y_2'(x) & y_3'(x) \\\\ y_1''(x) & y_2''(x) & y_3''(x) \\end{pmatrix}",
      instruction:
        "מה ניתן להסיק בוודאות לגבי התלות הליניארית של שלושת הפתרונות בקטע $[-2, 2]$?",
      options: [
        {
          id: "ode-q01-opt1",
          plainText:
            "שלושת הפתרונות תלויים ליניארית בהכרח בכל הקטע $[-2, 2]$.",
          isCorrect: true,
          explanation:
            "נכון: הוורונסקיאן בנקודה $x_0 = 0$ מכיל שתי שורות ראשונות זהות לחלוטין ($y_i(0) = y_i'(0)$ לכל $i$), ולכן $\\det W(0) = 0$. לפי נוסחת אבל, הוורונסקיאן של פתרונות למשוואה ליניארית הומוגנית עם מקדמים רציפים מקיים $W(x) = W(0)e^{\\int_0^x f(t)dt}$. מאחר ש-$W(0) = 0$, מתקיים $W(x) \\equiv 0$ לכל $x \\in [-2, 2]$, מה שגורר בהכרח שהפתרונות תלויים ליניארית.",
        },
        {
          id: "ode-q01-opt2",
          plainText:
            "הפתרונות בלתי תלויים ליניארית אם ורק אם ערכי הנגזרת השנייה $y_i''(0)$ שונים מאפס.",
          isCorrect: false,
          explanation:
            "שגוי: שוויון שתי השורות הראשונות מאפס את הדטרמיננטה ללא כל תלות בשורת הנגזרות השניות.",
        },
        {
          id: "ode-q01-opt3",
          plainText:
            "לא ניתן לקבוע תלות ליניארית ללא ידיעת המקדמים $g(x)$ ו-$h(x)$.",
          isCorrect: false,
          explanation:
            "שגוי: התאפסות הוורונסקיאן בנקודה אחת מכריעה את התלות הליניארית בכל תחום הרציפות.",
        },
        {
          id: "ode-q01-opt4",
          plainText:
            "הפתרונות תלויים ליניארית בנקודה $x=0$ בלבד, אך עשויים להיות בלתי תלויים בנקודות אחרות.",
          isCorrect: false,
          explanation:
            "שגוי: פתרונות של מד״ר ליניארית אינם יכולים להיות בת״ל בחלק מהתחום ות״ל בחלק אחר; הוורונסקיאן מתאפס זהותית או שאינו מתאפס באף נקודה.",
        },
      ],
    },
    {
      id: "ode-q02-integrating-factor-sum-argument",
      domain: "גורם אינטגרציה התלוי בסכום המשתנים",
      title:
        "משוואות דיפרנציאליות רגילות - גורם אינטגרציה התלוי בסכום המשתנים",
      context: "נתונה המשוואה הדיפרנציאלית הבאה שאינה מדויקת:",
      formulaLatex:
        "(y - xy\\tan(x+y))\\,dx + (x - xy\\tan(x+y))\\,dy = 0",
      instruction:
        "מהו גורם האינטגרציה $\\mu(x+y)$ ההופך את המשוואה למדויקת, ומהו פתרונה הכללי?",
      options: [
        {
          id: "ode-q02-opt1",
          plainText:
            "$\\mu(x+y) = \\cos(x+y)$, והפתרון הכללי הוא $xy\\cos(x+y) = C$.",
          mathText: "\\mu = \\cos(x+y), \\quad xy\\cos(x+y) = C",
          isCorrect: true,
          explanation:
            "נכון: עבור גורם אינטגרציה $\\mu(u)$ כאשר $u = x+y$, תנאי המדויקות דורש $\\frac{\\mu'(u)}{\\mu(u)} = \\frac{N_x - M_y}{M - N} = \\frac{(x-y)\\tan(x+y)}{y-x} = -\\tan(x+y)$. אינטגרציה נותנת $\\ln\\mu = \\ln|\\cos(x+y)| \\implies \\mu = \\cos(x+y)$. הכפלת המשוואה בגורם זה מניבה דיפרנציאל שלם שאינטגרצייתו הישירה נותנת את פונקציית הפוטנציאל $\\Phi(x,y) = xy\\cos(x+y) = C$.",
        },
        {
          id: "ode-q02-opt2",
          plainText:
            "$\\mu(x+y) = \\sin(x+y)$, והפתרון הכללי הוא $xy\\sin(x+y) = C$.",
          isCorrect: false,
          explanation:
            "שגוי: אינטגרל של $-\\tan(u)$ הוא $\\ln|\\cos u|$ ולא $\\ln|\\sin u|$; הכפלה בסינוס אינה מאפסת את הנגזרות המעורבות.",
        },
        {
          id: "ode-q02-opt3",
          plainText:
            "$\\mu(x+y) = e^{x+y}$, והפתרון הכללי הוא $(x+y)e^{xy} = C$.",
          isCorrect: false,
          explanation:
            "שגוי: מסיח הנובע מבלבול עם גורם אינטגרציה מעריכי המתאים למשוואות עם מקדמים פולינומיים פשוטים.",
        },
        {
          id: "ode-q02-opt4",
          plainText:
            "$\\mu(x+y) = \\frac{1}{\\cos^2(x+y)}$, והפתרון הכללי הוא $\\frac{xy}{\\cos(x+y)} = C$.",
          isCorrect: false,
          explanation:
            "שגוי: חזקה ריבועית במכנה נובעת מגזירה שגויה של הטנגנס במקום אינטגרציה שלו.",
        },
      ],
    },
    {
      id: "ode-q03-laplace-ramp-step-response",
      domain: "התמרת לפלס עם פונקציות מדרגה ושיפוע",
      title:
        "משוואות דיפרנציאליות רגילות - התמרת לפלס עם פונקציות מדרגה ושיפוע",
      context:
        "נתונה בעיית ההתחלה עם כוח מאלץ רציף למקוטעין: $y'' + 4y = g(t)$, $y(0) = 0, y'(0) = 0$, כאשר $g(t) = \\begin{cases} 0 & 0 \\le t < 5 \\\\ \\frac{t-5}{5} & 5 \\le t < 10 \\\\ 1 & t \\ge 10 \\end{cases}$.",
      formulaLatex:
        "g(t) = \\frac{u_5(t)(t-5) - u_{10}(t)(t-10)}{5}",
      instruction:
        "מהי התמרת לפלס $Y(s) = \\mathcal{L}\\{y(t)\\}$ של פתרון המשוואה?",
      options: [
        {
          id: "ode-q03-opt1",
          plainText:
            "$Y(s) = \\frac{e^{-5s} - e^{-10s}}{5s^2(s^2 + 4)}$",
          mathText: "Y(s) = \\frac{e^{-5s} - e^{-10s}}{5s^2(s^2 + 4)}",
          isCorrect: true,
          explanation:
            "נכון: ניתן להציג את האגף הימני באמצעות פונקציות מדרגה מוזזות: $g(t) = \\frac{1}{5}u_5(t)(t-5) - \\frac{1}{5}u_{10}(t)(t-10)$. לפי משפט ההזזה בציר הזמן, $\\mathcal{L}\\{u_c(t)(t-c)\\} = \\frac{e^{-cs}}{s^2}$. לכן $\\mathcal{L}\\{g(t)\\} = \\frac{e^{-5s} - e^{-10s}}{5s^2}$. חלוקה בפולינום האופייני $(s^2+4)$ עם תנאי התחלה אפס נותנת את הביטוי המבוקש.",
        },
        {
          id: "ode-q03-opt2",
          plainText: "$Y(s) = \\frac{e^{-5s} - e^{-10s}}{5s(s^2 + 4)}$",
          isCorrect: false,
          explanation:
            "שגוי: מסיח שבו נלקחה התמרה של פונקציית מדרגה $u_c(t)$ (התורמת חזקה ראשונה $1/s$) במקום פונקציית שיפוע $t-c$ (התורמת $1/s^2$).",
        },
        {
          id: "ode-q03-opt3",
          plainText:
            "$Y(s) = \\frac{e^{-5s} + e^{-10s}}{5s^2(s^2 + 4)}$",
          isCorrect: false,
          explanation:
            "שגוי: הסימן בין האקספוננטים חייב להיות שלילי כדי לקטוע את השיפוע ולהפוך את הפונקציה לקבועה ($1$) עבור $t \\ge 10$.",
        },
        {
          id: "ode-q03-opt4",
          plainText:
            "$Y(s) = \\frac{e^{-5s}}{5s^2(s^2 + 4)} - \\frac{e^{-10s}}{s(s^2 + 4)}$",
          isCorrect: false,
          explanation:
            "שגוי: פירוק שאינו משתמש בהזזה מלאה של פונקציית השיפוע בקטיעה ב-$t=10$.",
        },
      ],
    },
    {
      id: "ode-q04-legendre-polynomial-recurrence",
      domain: "משוואת לג׳נדר ונוסחת נסיגה",
      title: "משוואות דיפרנציאליות רגילות - משוואת לג׳נדר ונוסחת נסיגה",
      context:
        "נתונה משוואת לג׳נדר: $(1-x^2)y'' - 2xy' + \\alpha(\\alpha+1)y = 0$ סביב הנקודה הרגולרית $x_0 = 0$.",
      formulaLatex:
        "y(x) = \\sum_{n=0}^\\infty a_n x^n, \\quad a_{n+2} = \\frac{n(n+1) - \\alpha(\\alpha+1)}{(n+2)(n+1)} a_n",
      instruction:
        "מהי נוסחת הנסיגה למקדמי הטור, ועבור אילו ערכי $\\alpha$ מתקבל פתרון שהוא פולינום?",
      options: [
        {
          id: "ode-q04-opt1",
          plainText:
            "$a_{n+2} = -\\frac{(\\alpha - n)(\\alpha + n + 1)}{(n+2)(n+1)} a_n$, ומתקבל פולינום לכל $\\alpha = m \\in \\mathbb{N} \\cup \\{0\\}$.",
          mathText:
            "a_{n+2} = -\\frac{(\\alpha - n)(\\alpha + n + 1)}{(n+2)(n+1)} a_n, \\quad \\alpha \\in \\mathbb{N} \\cup \\{0\\}",
          isCorrect: true,
          explanation:
            "נכון: פירוק המונה: $n^2 + n - \\alpha^2 - \\alpha = (n - \\alpha)(n + \\alpha + 1) = -(\\alpha - n)(\\alpha + n + 1)$. כאשר $\\alpha = m$ מספר שלם אי-שלילי, עבור האינדקס $n = m$ המונה מתאפס לחלוטין ($a_{m+2} = 0$), וכל המקדמים הבאים מאותו סוג זוגיות מתאפסים. כך הטור קטוע ומתקבל פולינום לג׳נדר מדרגה $m$.",
        },
        {
          id: "ode-q04-opt2",
          plainText:
            "$a_{n+2} = \\frac{(\\alpha - n)^2}{(n+2)(n+1)} a_n$, ומתקבל פולינום רק עבור ערכים זוגיים של $\\alpha$.",
          isCorrect: false,
          explanation:
            "שגוי: המונה אינו ריבועי ב-$(\\alpha-n)$, ופולינומים מתקבלים הן עבור דרגות זוגיות (פולינומים זוגיים) והן עבור אי-זוגיות (פולינומים אי-זוגיים).",
        },
        {
          id: "ode-q04-opt3",
          plainText:
            "$a_{n+2} = -\\frac{\\alpha(\\alpha+1)}{(n+2)(n+1)} a_n$, ופתרון פולינומי מתקבל רק עבור $\\alpha = 0$.",
          isCorrect: false,
          explanation:
            "שגוי: נשמטו איברי הגזירה המגיעים מהכפל ב-$x^2 y''$ וב-$2xy'$, אשר מקזזים את התלות ב-$\\alpha$ עבור $n=\\alpha$.",
        },
        {
          id: "ode-q04-opt4",
          plainText:
            "$a_{n+2} = -\\frac{\\alpha - n}{n+2} a_n$, ורדיוס ההתכנסות תמיד אינסופי לכל $\\alpha$ ממשי.",
          isCorrect: false,
          explanation:
            "שגוי: עבור $\\alpha$ שאינו שלם הטור אינו קטוע ורדיוס התכנסותו מוגבל ל-$R=1$ עקב הנקודות הסינגולריות ב-$x = \\pm 1$.",
        },
      ],
    },
    {
      id: "ode-q05-cauchy-euler-variation-parameters",
      domain: "משוואת אוילר-קושי בשיטת וריאציית הפרמטרים",
      title:
        "משוואות דיפרנציאליות רגילות - משוואת אוילר-קושי בשיטת וריאציית הפרמטרים",
      context:
        "נתונה המשוואה הלא-הומוגנית $x^2 y'' - xy' + y = x + \\frac{3}{x}$ עבור $x > 0$. ידוע כי פתרונות המשוואה ההומוגנית הם $y_1 = x, y_2 = x\\ln x$.",
      formulaLatex:
        "y'' - \\frac{1}{x}y' + \\frac{1}{x^2}y = \\frac{1}{x} + \\frac{3}{x^3}, \\quad W(x, x\\ln x) = x",
      instruction: "מהו הפתרון הפרטי $y_p(x)$ של המשוואה?",
      options: [
        {
          id: "ode-q05-opt1",
          plainText: "$y_p(x) = \\frac{1}{2}x\\ln^2 x + \\frac{3}{4x}$",
          mathText: "y_p(x) = \\frac{1}{2}x\\ln^2 x + \\frac{3}{4x}",
          isCorrect: true,
          explanation:
            "נכון: בהעברה לצורה קנונית (חלוקה ב-$x^2$), האיבר החופשי הוא $g(x) = \\frac{1}{x} + \\frac{3}{x^3}$. הוורונסקיאן הוא $W = x(\\ln x + 1) - x\\ln x = x$. לפי וריאציית פרמטרים: $u_1' = -\\frac{y_2 g}{W} = -\\frac{\\ln x}{x} - \\frac{3\\ln x}{x^3} \\implies u_1 = -\\frac{\\ln^2 x}{2} + \\frac{3\\ln x}{2x^2} + \\frac{3}{4x^2}$; וכן $u_2' = \\frac{y_1 g}{W} = \\frac{1}{x} + \\frac{3}{x^3} \\implies u_2 = \\ln x - \\frac{3}{2x^2}$. הצבה ב-$y_p = u_1 y_1 + u_2 y_2$ וכינוס איברים מניבה בדיוק $\\frac{1}{2}x\\ln^2 x + \\frac{3}{4x}$.",
        },
        {
          id: "ode-q05-opt2",
          plainText: "$y_p(x) = x\\ln x + \\frac{3}{x^2}$",
          isCorrect: false,
          explanation:
            "שגוי: האיבר $x\\ln x$ כבר שייך למרחב ההומוגני ולכן אינו מהווה פתרון פרטי עצמאי.",
        },
        {
          id: "ode-q05-opt3",
          plainText: "$y_p(x) = x^2 + \\frac{3}{x}$",
          isCorrect: false,
          explanation:
            "שגוי: תוצאה הנובעת משימוש בנוסחת וריאציית פרמטרים מבלי לחלק את המשוואה במקדם המוביל $x^2$.",
        },
        {
          id: "ode-q05-opt4",
          plainText: "$y_p(x) = \\frac{1}{2}x^2 \\ln x - \\frac{3}{2x}$",
          isCorrect: false,
          explanation:
            "שגוי: שגיאה באינטגרציה בחלקים של האיברים המכילים חזקות שליליות של $x$ עם לוגריתם.",
        },
      ],
    },

    // =========================================================================
    // בלוק 2: שאלות 6–10 — מפתח תשובה: אופציה 2 (אינדקס 1) נכונה
    // =========================================================================
    {
      id: "ode-q06-superposition-linear-vs-coefficients",
      domain: "עקרון הסופרפוזיציה ומשוואות ליניאריות",
      title:
        "משוואות דיפרנציאליות רגילות - עקרון הסופרפוזיציה ומשוואות ליניאריות",
      context:
        "נתונות שלוש משוואות דיפרנציאליות מסדר ראשון: (1) $y' + p_1(x)y = g(x)$, (2) $y' + p_2(x)y = g(x)$, (3) $y' + (p_1(x) + p_2(x))y = g(x)$. יהיו $y_1, y_2$ פתרונות של (1) ו-(2) בהתאמה.",
      instruction:
        "האם סכום הפתרונות $y_1 + y_2$ מהווה בהכרח פתרון של משוואה (3)?",
      options: [
        {
          id: "ode-q06-opt1",
          plainText:
            "כן, תמיד, מכיוון שהמשוואות ליניאריות ועקרון הסופרפוזיציה תקף לכל צירוף ליניארי של משוואות.",
          isCorrect: false,
          explanation:
            "שגוי: עקרון הסופרפוזיציה תקף לשינויים באגף ימין (איבר חופשי $g(x)$) עבור אותה משוואה הומוגנית (אותו $p(x)$), ולא כאשר משנים את מקדמי המשוואה עצמה.",
        },
        {
          id: "ode-q06-opt2",
          plainText:
            "לא בהכרח; סופרפוזיציה ליניארית מתקיימת עבור סכום איברים חופשיים $g_1+g_2$, אך לא עבור חיבור מקדמי הפונקציה $p_1+p_2$.",
          isCorrect: true,
          explanation:
            "נכון: בהצבה: $(y_1+y_2)' + (p_1+p_2)(y_1+y_2) = (y_1'+p_1 y_1) + (y_2'+p_2 y_2) + p_2 y_1 + p_1 y_2 = 2g(x) + p_2 y_1 + p_1 y_2 \\neq g(x)$. לדוגמה נגדית: עבור $y' + y = 1$ הפתרון הוא $y_1 = 1$, ועבור $y' = 1$ הפתרון הוא $y_2 = x$; סכומם $1+x$ אינו פותר את $y' + y = 1$.",
        },
        {
          id: "ode-q06-opt3",
          plainText:
            "כן, בתנאי שהאיבר החופשי $g(x)$ מתאפס זהותית ($g(x) \\equiv 0$).",
          isCorrect: false,
          explanation:
            "שגוי: גם במקרה ההומוגני מתקבל איבר מוצלב $p_2 y_1 + p_1 y_2$ שאינו מתאפס בדרך כלל.",
        },
        {
          id: "ode-q06-opt4",
          plainText:
            "כן, בתנאי שהפתרונות $y_1, y_2$ אורתוגונליים זה לזה.",
          isCorrect: false,
          explanation:
            "שגוי: אורתוגונליות אינה קשורה לתקפות הסופרפוזיציה במשוואות בעלות אופרטורים דיפרנציאליים שונים.",
        },
      ],
    },
    {
      id: "ode-q07-sturm-liouville-euler-cauchy-bvp",
      domain: "בעיית שטורם-ליוביל ומשוואת אוילר",
      title:
        "משוואות דיפרנציאליות רגילות - בעיית שטורם-ליוביל ומשוואת אוילר",
      context:
        "נתונה בעיית השפה $x^2 y'' + xy' + \\lambda y = 0$ בקטע $1/e < x < 1$ עם תנאי שפה דיריכלה $y(1/e) = 0, y(1) = 0$.",
      formulaLatex:
        "(x y')' + \\frac{\\lambda}{x} y = 0, \\quad y(1/e) = y(1) = 0",
      instruction:
        "מהם הערכים העצמיים $\\lambda_n$ והפונקציות העצמיות $\\phi_n(x)$ של הבעיה?",
      options: [
        {
          id: "ode-q07-opt1",
          plainText:
            "$\\lambda_n = n^2$, $\\phi_n(x) = \\sin(n \\ln x)$ עבור $n = 1, 2, \\dots$",
          isCorrect: false,
          explanation:
            "שגוי: אורך הקטע הלוגריתמי הוא $0 - \\ln(1/e) = 1$, ולכן מחזוריות הסינוס דורשת כפולה של $\\pi$ בארגומנט.",
        },
        {
          id: "ode-q07-opt2",
          plainText:
            "$\\lambda_n = (n\\pi)^2$, $\\phi_n(x) = \\sin(n\\pi \\ln x)$ עבור $n = 1, 2, \\dots$",
          mathText:
            "\\lambda_n = (n\\pi)^2, \\quad \\phi_n(x) = \\sin(n\\pi \\ln x)",
          isCorrect: true,
          explanation:
            "נכון: בהצבת $x = e^t$ המשוואה הופכת ל-$y''(t) + \\lambda y(t) = 0$ בקטע $[-1, 0]$. שורשי הפולינום האופייני עבור $\\lambda > 0$ הם $\\pm i\\sqrt{\\lambda}$. הפתרון הוא $y(x) = C_1\\cos(\\sqrt{\\lambda}\\ln x) + C_2\\sin(\\sqrt{\\lambda}\\ln x)$. מהתנאי $y(1)=0$ נובע $C_1 = 0$. מהתנאי $y(1/e) = C_2\\sin(-\\sqrt{\\lambda}) = 0$ נובע $\\sqrt{\\lambda} = n\\pi \\implies \\lambda_n = (n\\pi)^2$ והפונקציות העצמיות הן $\\sin(n\\pi\\ln x)$.",
        },
        {
          id: "ode-q07-opt3",
          plainText:
            "$\\lambda_n = \\left(\\frac{n\\pi}{2}\\right)^2$, $\\phi_n(x) = \\cos(n\\pi \\ln x)$ עבור $n = 0, 1, 2, \\dots$",
          isCorrect: false,
          explanation:
            "שגוי: פונקציית הקוסינוס אינה מתאפסת ב-$x=1$ ($\\cos(0)=1$), ולכן אינה מקיימת את תנאי השפה.",
        },
        {
          id: "ode-q07-opt4",
          plainText:
            "$\\lambda_n = -(n\\pi)^2$, $\\phi_n(x) = x^{n\\pi} - x^{-n\\pi}$ עבור $n = 1, 2, \\dots$",
          isCorrect: false,
          explanation:
            "שגוי: עבור $\\lambda \\le 0$ מתקבל רק הפתרון הטריוויאלי $y \\equiv 0$, ואין ערכים עצמיים שליליים בבעיה זו.",
        },
      ],
    },
    {
      id: "ode-q08-repeated-eigenvalue-system-jordan",
      domain: "מערכות ליניאריות עם ערך עצמי מנוון",
      title:
        "משוואות דיפרנציאליות רגילות - מערכות ליניאריות עם ערך עצמי מנוון",
      context:
        "נתונה המערכת ההומוגנית $\\vec{x}'(t) = A \\vec{x}(t)$ עם המטריצה $A = \\begin{pmatrix} 3 & -1 \\\\ 4 & -1 \\end{pmatrix}$.",
      formulaLatex:
        "\\det(A - \\lambda I) = (\\lambda - 1)^2 = 0, \\quad (A - I)\\vec{v}_1 = 0, \\quad (A - I)\\vec{v}_2 = \\vec{v}_1",
      instruction:
        "מהו הפתרון הכללי של המערכת במונחי וקטורים עצמיים ומוכללים?",
      options: [
        {
          id: "ode-q08-opt1",
          plainText:
            "$\\vec{x}(t) = C_1 e^t \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + C_2 e^{-t} \\begin{pmatrix} 1 \\\\ 4 \\end{pmatrix}$",
          isCorrect: false,
          explanation:
            "שגוי: למטריצה יש ערך עצמי יחיד $\\lambda = 1$ בריבוי אלגברי 2, ואין לה ערך עצמי $-1$.",
        },
        {
          id: "ode-q08-opt2",
          plainText:
            "$\\vec{x}(t) = C_1 e^t \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + C_2 e^t \\begin{pmatrix} t+1 \\\\ 2t+1 \\end{pmatrix}$",
          mathText:
            "\\vec{x}(t) = C_1 e^t \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + C_2 e^t \\left[ t \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} \\right]",
          isCorrect: true,
          explanation:
            "נכון: הפולינום האופייני הוא $(\\lambda-1)^2 = 0$. הריבוי הגאומטרי הוא $\\dim \\ker(A-I) = 1$, עם וקטור עצמי $\\vec{v}_1 = (1, 2)^T$. וקטור עצמי מוכלל מתקבל מ-$(A-I)\\vec{v}_2 = \\vec{v}_1 \\implies \\begin{pmatrix} 2 & -1 \\\\ 4 & -2 \\end{pmatrix}\\vec{v}_2 = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} \\implies \\vec{v}_2 = (1, 1)^T$. הפתרון השני הוא $\\vec{x}_2(t) = e^t (t\\vec{v}_1 + \\vec{v}_2) = e^t (t+1, 2t+1)^T$.",
        },
        {
          id: "ode-q08-opt3",
          plainText:
            "$\\vec{x}(t) = C_1 e^t \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + C_2 t e^t \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$",
          isCorrect: false,
          explanation:
            "שגוי: הביטוי $t e^t \\vec{v}_1$ לבדו אינו פותר את המערכת; הפתרון היסודי השני מחייב הוספת וקטור עצמי מוכלל $\\vec{v}_2$ שאינו כפולה של $\\vec{v}_1$.",
        },
        {
          id: "ode-q08-opt4",
          plainText:
            "$\\vec{x}(t) = C_1 e^{3t} \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + C_2 e^{-t} \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$",
          isCorrect: false,
          explanation:
            "שגוי: אלו איברי האלכסון הראשי של המטריצה, שאינם שווים לערכים העצמיים שלה.",
        },
      ],
    },
    {
      id: "ode-q09-undetermined-coefficients-annihilator-form",
      domain: "שיטת המקדמים הלא-ידועים ותהודה",
      title:
        "משוואות דיפרנציאליות רגילות - שיטת המקדמים הלא-ידועים ותהודה",
      context:
        "נתונה המשוואה הלא-הומוגנית מסדר שלישי: $y''' - y'' + 4y' - 4y = 40\\cos^2 x$.",
      formulaLatex:
        "r^3 - r^2 + 4r - 4 = (r - 1)(r^2 + 4) = 0, \\quad 40\\cos^2 x = 20 + 20\\cos(2x)",
      instruction:
        "מהי התבנית הנכונה לחיפוש פתרון פרטי $y_p(x)$ בשיטת המקדמים הלא-ידועים?",
      options: [
        {
          id: "ode-q09-opt1",
          plainText: "$y_p(x) = A + B\\cos(2x) + C\\sin(2x)$",
          isCorrect: false,
          explanation:
            "שגוי: השורשים האופייניים הם $r = 1, \\pm 2i$. התדירות $\\pm 2i$ מהווה שורש של המשוואה ההומוגנית (תהודה), ולכן הצבת תבנית זו תתאפס ולא תניב פתרון.",
        },
        {
          id: "ode-q09-opt2",
          plainText: "$y_p(x) = A + x(B\\cos(2x) + C\\sin(2x))$",
          mathText: "y_p(x) = A + x(B\\cos(2x) + C\\sin(2x))",
          isCorrect: true,
          explanation:
            "נכון: נשתמש בזהות $\\cos^2 x = \\frac{1 + \\cos 2x}{2}$ לקבלת האגף $20 + 20\\cos(2x)$. שורשי המשוואה ההומוגנית הם $r = 1, \\pm 2i$. עבור הקבוע $20$ (המתאים ל-$e^{0\\cdot x}$), $0$ אינו שורש אופייני ולכן הניחוש הוא $A$. עבור $20\\cos(2x)$, $\\pm 2i$ הוא שורש מריבוי 1, ולכן יש לכפול ב-$x$ ולקבל $x(B\\cos 2x + C\\sin 2x)$.",
        },
        {
          id: "ode-q09-opt3",
          plainText: "$y_p(x) = A\\cos^2 x + B\\sin^2 x$",
          isCorrect: false,
          explanation:
            "שגוי: גזירת פונקציות טריגונומטריות בריבוע מייצרת איברים של $\\sin(2x)$ שאינם נכללים בתבנית זו.",
        },
        {
          id: "ode-q09-opt4",
          plainText: "$y_p(x) = x(A + B\\cos(2x) + C\\sin(2x))$",
          isCorrect: false,
          explanation:
            "שגוי: הקבוע $A$ הוכפל ב-$x$ ללא צורך, שכן $r=0$ אינו שורש של הפולינום האופייני.",
        },
      ],
    },
    {
      id: "ode-q10-picard-lindelof-singularity-family",
      domain: "משפט הקיום והיחידות ואי-יחידות בראשית",
      title:
        "משוואות דיפרנציאליות רגילות - משפט הקיום והיחידות ואי-יחידות בראשית",
      context:
        "נתונה המשוואה הדיפרנציאלית $y\\,dx - (2x + y^3)\\,dy = 0$, וכן תנאי ההתחלה $(x_0, y_0) = (0, 0)$.",
      formulaLatex:
        "\\frac{dx}{dy} - \\frac{2}{y}x = y^2 \\implies x(y) = y^2(y + C)",
      instruction:
        "מה ניתן לקבוע לגבי קיום ויחידות פתרון המקיים $y(0) = 0$ דרך הראשית?",
      options: [
        {
          id: "ode-q10-opt1",
          plainText:
            "קיים פתרון יחיד לפי משפט פיקאר-לינדלף, והוא הפתרון הטריוויאלי $y(x) \\equiv 0$.",
          isCorrect: false,
          explanation:
            "שגוי: בהצגת המשוואה כ-$y' = \\frac{y}{2x+y^3}$, אגף ימין אינו רציף בראשית $(0,0)$ ולכן תנאי משפט הקיום והיחידות אינם מתקיימים.",
        },
        {
          id: "ode-q10-opt2",
          plainText:
            "קיימים אינסוף פתרונות שונים העוברים דרך הראשית, ומשפט הקיום והיחידות אינו מבטיח יחידות.",
          isCorrect: true,
          explanation:
            "נכון: בהיפוך תפקידי המשתנים מתקבלת משוואה ליניארית ב-$x(y)$ שפתרונה הכללי הוא $x(y) = y^3 + Cy^2$. כל עקומה כזו עבור כל $C \\in \\mathbb{R}$ עוברת דרך $(0,0)$, ובנוסף $y(x) \\equiv 0$ הוא פתרון שעובר בראשית. מאחר שהמקדם $p(y) = -2/y$ אינו רציף ב-$y=0$, משפט היחידות אינו תקף וקיימים אינסוף פתרונות.",
        },
        {
          id: "ode-q10-opt3",
          plainText:
            "לא קיים אף פתרון ממשי העובר דרך הראשית עקב סינגולריות במכנה.",
          isCorrect: false,
          explanation:
            "שגוי: הן $y \\equiv 0$ והן העקומות $x(y) = y^2(y+C)$ מוגדרות ועוברות דרך $(0,0)$.",
        },
        {
          id: "ode-q10-opt4",
          plainText:
            "קיים פתרון יחיד עבור $C=0$, וכל שאר הפתרונות אינם גזירים בראשית.",
          isCorrect: false,
          explanation:
            "שגוי: כל הפונקציות מהמשפחה $x(y) = y^3 + Cy^2$ גזירות ברציפות ב-$y=0$ ומספקות פתרונות חוקיים.",
        },
      ],
    },

    // =========================================================================
    // בלוק 3: שאלות 11–15 — מפתח תשובה: אופציה 3 (אינדקס 2) נכונה
    // =========================================================================
    {
      id: "ode-q11-chebyshev-self-adjoint-weight",
      domain: "משוואת צ׳בישב ופונקציית משקל",
      title: "משוואות דיפרנציאליות רגילות - משוואת צ׳בישב ופונקציית משקל",
      context:
        "נתונה משוואת צ׳בישב: $(1-x^2)y'' - xy' + \\alpha^2 y = 0$ בקטע $(-1, 1)$. אנו מעוניינים להעבירה לצורה קנונית של שטורם-ליוביל $(P(x)y')' + \\alpha^2 w(x)y = 0$.",
      formulaLatex:
        "\\frac{d}{dx}\\left(\\sqrt{1-x^2}\\,y'\\right) + \\frac{\\alpha^2}{\\sqrt{1-x^2}}\\,y = 0",
      instruction:
        "מהי פונקציית המשקל $w(x)$ שביחס אליה פולינומי צ׳בישב אורתוגונליים בקטע $[-1, 1]$?",
      options: [
        {
          id: "ode-q11-opt1",
          plainText: "$w(x) = 1$",
          isCorrect: false,
          explanation:
            "שגוי: פולינומי צ׳בישב אינם אורתוגונליים ביחס למשקל יחידה; בדיקה ישירה מראה כי $\\int_{-1}^1 T_0(x)T_2(x)\\,dx = \\frac{2}{3} \\neq 0$.",
        },
        {
          id: "ode-q11-opt2",
          plainText: "$w(x) = \\sqrt{1 - x^2}$",
          isCorrect: false,
          explanation:
            "שגוי: $\\sqrt{1-x^2}$ היא הפונקציה המובילה $P(x)$ בצורה הקנונית, ולא פונקציית המשקל המכפילה את הערך העצמי.",
        },
        {
          id: "ode-q11-opt3",
          plainText: "$w(x) = \\frac{1}{\\sqrt{1 - x^2}}$",
          mathText: "w(x) = \\frac{1}{\\sqrt{1 - x^2}}",
          isCorrect: true,
          explanation:
            "נכון: חלוקת המשוואה ב-$1-x^2$ נותנת $y'' - \\frac{x}{1-x^2}y' + \\frac{\\alpha^2}{1-x^2}y = 0$. גורם האינטגרציה להעברה לצורה צמודה-לעצמה הוא $\\mu(x) = e^{\\int -\\frac{x}{1-x^2}dx} = \\sqrt{1-x^2}$. הכפלה ב-$\\mu$ נותנת $(\\sqrt{1-x^2}y')' + \\frac{\\alpha^2}{\\sqrt{1-x^2}}y = 0$. לפיכך פונקציית המשקל לצד הערך העצמי $\\lambda = \\alpha^2$ היא $w(x) = \\frac{1}{\\sqrt{1-x^2}}$.",
        },
        {
          id: "ode-q11-opt4",
          plainText: "$w(x) = \\frac{1}{1 - x^2}$",
          isCorrect: false,
          explanation:
            "שגוי: משקל זה יוצר אינטגרל מתבדר בקצוות ואינו מקיים את הצמידות העצמית של האופרטור.",
        },
      ],
    },
    {
      id: "ode-q12-dirac-delta-laplace-jump-discontinuity",
      domain: "פונקציית דלתא של דיראק וקפיצה בנגזרת",
      title:
        "משוואות דיפרנציאליות רגילות - פונקציית דלתא של דיראק וקפיצה בנגזרת",
      context:
        "נתונה בעיית ההתחלה עם פונקציית דלתא של דיראק: $y''' - 3y'' + 2y' = \\delta(t - 2)$, עם תנאי התחלה $y(0) = y'(0) = y''(0) = 1$.",
      formulaLatex:
        "\\mathcal{L}\\{\\delta(t - 2)\\} = e^{-2s}, \\quad y(t) = y_h(t) + u_2(t)k(t - 2)",
      instruction:
        "מה מתרחש לפתרון $y(t)$ ולנגזרותיו בנקודת ההלם $t = 2$?",
      options: [
        {
          id: "ode-q12-opt1",
          plainText:
            "הפונקציה $y(t)$ עצמה עוברת קפיצה בדידה של יחידה אחת ב-$t=2$.",
          isCorrect: false,
          explanation:
            "שגוי: פונקציית הלם במשוואה מסדר $n$ אינה יוצרת אי-רציפות בפונקציה או בנגזרותיה עד סדר $n-2$; הן נשארות רציפות לחלוטין.",
        },
        {
          id: "ode-q12-opt2",
          plainText:
            "הנגזרת הראשונה $y'(t)$ קופצת ב-1, בעוד $y(t)$ רציפה.",
          isCorrect: false,
          explanation:
            "שגוי: קפיצה בנגזרת ראשונה מתרחשת במשוואה מסדר שני ($y''$), אך כאן המשוואה היא מסדר שלישי ($y'''$).",
        },
        {
          id: "ode-q12-opt3",
          plainText:
            "הפונקציה $y(t)$ והנגזרת $y'(t)$ רציפות ב-$t=2$, ואילו הנגזרת השנייה $y''(t)$ חווה קפיצה של יחידה אחת ($y''(2^+) - y''(2^-) = 1$).",
          isCorrect: true,
          explanation:
            "נכון: אינטגרציה של המשוואה בקטע אינפיניטסימלי $[2-\\epsilon, 2+\\epsilon]$ מעלימה את האיברים התלויים ב-$y, y', y''$ (שהם חסומים), ומשאירה $\\int_{2-\\epsilon}^{2+\\epsilon} y'''\\,dt = \\int_{2-\\epsilon}^{2+\\epsilon} \\delta(t-2)\\,dt \\implies y''(2^+) - y''(2^-) = 1$. הנגזרות הנמוכות יותר רציפות.",
        },
        {
          id: "ode-q12-opt4",
          plainText:
            "כל הנגזרות נותרות רציפות חלקות ורק הנגזרת הרביעית מתבדרת.",
          isCorrect: false,
          explanation:
            "שגוי: אינטגרל של פונקציית דלתא מניב פונקציית מדרגה, המחייבת קפיצה בנגזרת השנייה.",
        },
      ],
    },
    {
      id: "ode-q13-picard-domain-riccati-type",
      domain: "תחום קיום ויחידות למשוואה לא-ליניארית",
      title:
        "משוואות דיפרנציאליות רגילות - תחום קיום ויחידות למשוואה לא-ליניארית",
      context:
        "נתונה המשוואה הלא-ליניארית $y' = \\frac{y}{x} + y^2$. ידוע כי למשוואה משפחת פתרונות $y(x) = \\frac{2x}{c - x^2}$ וכן הפתרון $y(x) \\equiv 0$. נתון תנאי התחלה $y(a) = 0$.",
      formulaLatex:
        "f(x, y) = \\frac{y}{x} + y^2, \\quad \\frac{\\partial f}{\\partial y} = \\frac{1}{x} + 2y",
      instruction:
        "עבור אילו ערכי $a \\in \\mathbb{R}$ מבטיח משפט פיקאר-לינדלף קיום ויחידות של פתרון בסביבת הנקודה?",
      options: [
        {
          id: "ode-q13-opt1",
          plainText: "לכל $a \\in \\mathbb{R}$ כולל $a = 0$.",
          isCorrect: false,
          explanation:
            "שגוי: ב-$a = 0$ הפונקציה $\\frac{y}{x}$ אינה מוגדרת והנגזרת החלקית מתבדרת, כך שתנאי המשפט אינם מתקיימים.",
        },
        {
          id: "ode-q13-opt2",
          plainText: "רק עבור $a > 0$.",
          isCorrect: false,
          explanation:
            "שגוי: המשפט תקף באותה מידה גם עבור $a < 0$, שכן $f$ ו-$\\frac{\\partial f}{\\partial y}$ רציפות בכל נקודה שבה $x \\neq 0$.",
        },
        {
          id: "ode-q13-opt3",
          plainText: "לכל $a \\neq 0$ בלבד.",
          mathText: "a \\in \\mathbb{R} \\setminus \\{0\\}",
          isCorrect: true,
          explanation:
            "נכון: הפונקציה $f(x, y) = \\frac{y}{x} + y^2$ ונגזרתה $\\frac{\\partial f}{\\partial y} = \\frac{1}{x} + 2y$ רציפות במלבן סביב כל נקודה $(a, 0)$ שבה $a \\neq 0$. לכן לפי משפט קיום ויחידות קיים פתרון יחיד בסביבת כל $a \\neq 0$ (שהוא הפתרון $y \\equiv 0$). ב-$a = 0$ אין רציפות, ועוברים שם אינסוף פתרונות שונים מתוך המשפחה עבור $c \\neq 0$.",
        },
        {
          id: "ode-q13-opt4",
          plainText:
            "לא קיים אף ערך של $a$ שבו הפתרון יחיד כי המשוואה מסדר שני ב-$y$.",
          isCorrect: false,
          explanation:
            "שגוי: זוהי מד״ר מסדר ראשון (מסוג ריקטי/ברנולי), ויחידות מובטחת בכל נקודה רגולרית של שדה הכיוונים.",
        },
      ],
    },
    {
      id: "ode-q14-sturm-liouville-non-orthogonality-proof",
      domain: "אורתוגונליות ואי-היתכנות בעיית שטורם-ליוביל",
      title:
        "משוואות דיפרנציאליות רגילות - אורתוגונליות ואי-היתכנות בעיית שטורם-ליוביל",
      context:
        "חוקר מעוניין לבנות בעיית שטורם-ליוביל רגולרית מהצורה $(p(x)y')' - q(x)y + \\lambda e^x y = 0$ בקטע $[-1, 1]$ עם תנאי שפה דיריכלה $y(-1) = y(1) = 0$, כך שהפונקציות $y_1(x) = e^x$ ו-$y_2(x) = e^{-x}$ יהיו פונקציות עצמיות שלה.",
      formulaLatex:
        "\\langle f, g \\rangle_{e^x} = \\int_{-1}^1 f(x)g(x)e^x\\,dx",
      instruction:
        "מדוע לא תיתכן בעיית שטורם-ליוביל כזו בשום אופן?",
      options: [
        {
          id: "ode-q14-opt1",
          plainText:
            "משום שהפונקציות $e^x$ ו-$e^{-x}$ אינן פתרונות של שום משוואה ליניארית במקדמים קבועים.",
          isCorrect: false,
          explanation:
            "שגוי: הן מהוות בסיס פתרונות מוכר למשוואה $y'' - y = 0$.",
        },
        {
          id: "ode-q14-opt2",
          plainText:
            "משום שפונקציית המשקל $r(x) = e^x$ אינה חיובית ממש בכל הקטע $[-1, 1]$.",
          isCorrect: false,
          explanation:
            "שגוי: $e^x > 0$ לכל $x$ ממשי, ולכן היא פונקציית משקל חוקית לחלוטין.",
        },
        {
          id: "ode-q14-opt3",
          plainText:
            "משום שהפונקציות אינן אורתוגונליות ביחס לפונקציית המשקל: $\\int_{-1}^1 e^x (e^x)(e^{-x})\\,dx = e - \\frac{1}{e} \\neq 0$.",
          mathText:
            "\\langle e^x, e^{-x} \\rangle_{e^x} = \\int_{-1}^1 e^x \\, dx = e - e^{-1} \\neq 0",
          isCorrect: true,
          explanation:
            "נכון: משפט יסודי בשטורם-ליוביל קובע כי פונקציות עצמיות המתאימות לערכים עצמיים שונים חייבות להיות אורתוגונליות ביחס לפונקציית המשקל הנתונה $w(x) = e^x$. חישוב המכפלה הפנימית מראה: $\\int_{-1}^1 e^x \\cdot e^x \\cdot e^{-x} dx = \\int_{-1}^1 e^x dx = e - e^{-1} \\neq 0$. אי-האורתוגונליות סותרת את תכונת היסוד של הבעיה.",
        },
        {
          id: "ode-q14-opt4",
          plainText:
            "משום שלכל בעיית שטורם-ליוביל הפונקציות העצמיות חייבות להיות טריגונומטריות בלבד.",
          isCorrect: false,
          explanation:
            "שגוי: קיימות בעיות SL רבות עם פונקציות עצמיות שאינן טריגונומטריות (כגון פולינומי לז׳נדר, צ׳בישב או פונקציות בסל).",
        },
      ],
    },
    {
      id: "ode-q15-nilpotent-system-polynomial-solutions",
      domain: "מערכות ליניאריות ומטריצות נילפוטנטיות",
      title:
        "משוואות דיפרנציאליות רגילות - מערכות ליניאריות ומטריצות נילפוטנטיות",
      context:
        "נתונה המערכת $\\vec{x}'(t) = A\\vec{x}(t)$ עם המטריצה הנילפוטנטית $A = \\begin{pmatrix} 0 & 1 & 1 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}$.",
      formulaLatex:
        "A^2 = \\begin{pmatrix} 0 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}, \\quad A^3 = 0 \\implies \\vec{x}'''(t) = \\vec{0}",
      instruction:
        "מהו המבנה המתמטי הכללי של פתרונות המערכת $\\vec{x}(t)$?",
      options: [
        {
          id: "ode-q15-opt1",
          plainText: "וקטור של אקספוננטים דועכים מהצורה $e^{-t}$.",
          isCorrect: false,
          explanation:
            "שגוי: הערך העצמי היחיד הוא $\\lambda = 0$, ולכן אין במערכת אקספוננטים דועכים או גדלים.",
        },
        {
          id: "ode-q15-opt2",
          plainText:
            "צירוף ליניארי של פונקציות הרמוניות $\\cos t, \\sin t$.",
          isCorrect: false,
          explanation:
            "שגוי: אין למטריצה ערכים עצמיים מדומים, ולכן אין תנודות מחזוריות.",
        },
        {
          id: "ode-q15-opt3",
          plainText:
            "וקטור של פולינומים מדרגה 2 לכל היותר: $\\vec{x}(t) = \\vec{v}_0 + \\vec{v}_1 t + \\vec{v}_2 t^2$.",
          mathText:
            "\\vec{x}(t) = \\left(I + At + \\frac{1}{2}A^2 t^2\\right)\\vec{x}(0)",
          isCorrect: true,
          explanation:
            "נכון: נגזור שלוש פעמים: $\\vec{x}'''(t) = A^3 \\vec{x}(t) = 0$ מכיוון ש-$A^3 = 0$. אינטגרציה רצופה שלוש פעמים מניבה בהכרח פולינומים מדרגה שנייה לכל היותר בכל רכיב. לחלופין, האקספוננט המטריצי $e^{At} = I + At + \\frac{1}{2}A^2 t^2$ נקטע עקב הנילפוטנטיות של $A$.",
        },
        {
          id: "ode-q15-opt4",
          plainText:
            "וקטור קבוע בזמן $\\vec{x}(t) \\equiv \\vec{C}$ לכל תנאי התחלה.",
          isCorrect: false,
          explanation:
            "שגוי: רק וקטורים השייכים לגרעין של $A$ מניבים פתרון קבוע בזמן; פתרונות אחרים גדלים פולינומית.",
        },
      ],
    },

    // =========================================================================
    // בלוק 4: שאלות 16–20 — מפתח תשובה: אופציה 4 (אינדקס 3) נכונה
    // =========================================================================
    {
      id: "ode-q16-variation-parameters-secant-forcing",
      domain: "וריאציית פרמטרים עם כוח מאלץ טריגונומטרי",
      title:
        "משוואות דיפרנציאליות רגילות - וריאציית פרמטרים עם כוח מאלץ טריגונומטרי",
      context:
        "נתונה המשוואה הלא-הומוגנית מסדר שני: $y'' + 64y = \\frac{1}{\\cos(8x)}$ בקטע $(-\\pi/16, \\pi/16)$.",
      formulaLatex:
        "y_h(x) = C_1\\cos(8x) + C_2\\sin(8x), \\quad W(\\cos 8x, \\sin 8x) = 8",
      instruction: "מהו פתרונה הכללי של המשוואה?",
      options: [
        {
          id: "ode-q16-opt1",
          plainText:
            "$y(x) = C_1\\cos(8x) + C_2\\sin(8x) + \\frac{1}{64\\cos(8x)}$",
          isCorrect: false,
          explanation:
            "שגוי: הצבה ישירה מראה שהנגזרת השנייה של שבר טריגונומטרי מייצרת איברים שאינם מתקזזים לקבלת אגף ימין.",
        },
        {
          id: "ode-q16-opt2",
          plainText:
            "$y(x) = C_1\\cos(8x) + C_2\\sin(8x) + \\frac{x}{8}\\cos(8x)$",
          isCorrect: false,
          explanation:
            "שגוי: פתרון זה מתאים לכוח מאלץ מהצורה $\\sin(8x)$ (תהודה הרמונית טהורה), ולא ל-$\\sec(8x)$.",
        },
        {
          id: "ode-q16-opt3",
          plainText:
            "$y(x) = C_1\\cos(8x) + C_2\\sin(8x) + \\frac{1}{8}\\ln|\\cos(8x)|\\sin(8x)$",
          isCorrect: false,
          explanation:
            "שגוי: פונקציית הלוגריתם מוכפלת בקוסינוס ולא בסינוס, והמקדם המספרי חסר חלוקה נוספת ב-8 מאינטגרל הטנגנס.",
        },
        {
          id: "ode-q16-opt4",
          plainText:
            "$y(x) = C_1\\cos(8x) + C_2\\sin(8x) + \\frac{1}{64}\\ln|\\cos(8x)|\\cos(8x) + \\frac{x}{8}\\sin(8x)$",
          mathText:
            "y(x) = y_h(x) + \\frac{1}{64}\\cos(8x)\\ln|\\cos(8x)| + \\frac{x}{8}\\sin(8x)",
          isCorrect: true,
          explanation:
            "נכון: הפתרונות ההומוגניים הם $y_1 = \\cos(8x), y_2 = \\sin(8x)$ עם ורונסקיאן $W = 8$. לפי וריאציית פרמטרים: $u_1' = -\\frac{\\sin(8x)}{8\\cos(8x)} = -\\frac{1}{8}\\tan(8x) \\implies u_1 = \\frac{1}{64}\\ln|\\cos(8x)|$; וכן $u_2' = \\frac{\\cos(8x)}{8\\cos(8x)} = \\frac{1}{8} \\implies u_2 = \\frac{x}{8}$. הרכבת הפתרון הפרטי $y_p = u_1 y_1 + u_2 y_2$ נותנת בדיוק את הביטוי הרשום.",
        },
      ],
    },
    {
      id: "ode-q17-frobenius-integer-root-difference",
      domain: "שיטת פרובניוס והפרש שורשים אינדקסלי שלם",
      title:
        "משוואות דיפרנציאליות רגילות - שיטת פרובניוס והפרש שורשים אינדקסלי שלם",
      context:
        "נתונה המשוואה: $xy'' + (x - 1)y' - y = 0$ סביב הנקודה הסינגולרית-רגולרית $x_0 = 0$.",
      formulaLatex:
        "r(r - 1) + p_0 r + q_0 = 0 \\implies r(r - 1) - r = r(r - 2) = 0",
      instruction:
        "מהם שורשי המשוואה האינדיצאלית, ומהו מבנה הפתרון הכללי של המשוואה?",
      options: [
        {
          id: "ode-q17-opt1",
          plainText:
            "השורשים הם $r_1 = 1, r_2 = 0$, ושני הפתרונות היסודיים הם טורי חזקות פשוטים ללא איברים לוגריתמיים.",
          isCorrect: false,
          explanation:
            "שגוי: המשוואה האינדיצאלית היא $r(r-1) - r = r(r-2) = 0$ ושורשיה הם 2 ו-0.",
        },
        {
          id: "ode-q17-opt2",
          plainText:
            "השורשים הם $r_1 = r_2 = 1$ (שורש כפול), ולכן הפתרון השני מכיל תמיד $\\ln x$.",
          isCorrect: false,
          explanation:
            "שגוי: השורשים אינם שווים; הם נבדלים במספר שלם ($2 - 0 = 2$).",
        },
        {
          id: "ode-q17-opt3",
          plainText:
            "השורשים הם $r_1 = 2, r_2 = -1$, ושני הפתרונות מוגדרים היטב בראשית.",
          isCorrect: false,
          explanation:
            "שגוי: הצבת $x_0 = 0$ נותנת $q_0 = \\lim x^2(-1/x) = 0$, ולכן השורש הקטן הוא 0 ולא $-1$.",
        },
        {
          id: "ode-q17-opt4",
          plainText:
            "השורשים הם $r_1 = 2, r_2 = 0$; פתרון יסודי אחד הוא $y_1(x) = e^{-x}$, והפתרון השני הוא $y_2(x) = x - 1$.",
          mathText:
            "r_1 = 2, \\; r_2 = 0 \\implies y(x) = C_1 e^{-x} + C_2 (x - 1)",
          isCorrect: true,
          explanation:
            "נכון: הצורה הסטנדרטית היא $y'' + \\frac{x-1}{x}y' - \\frac{1}{x}y = 0$. המשוואה האינדיצאלית היא $r(r-1) - r = r(r-2) = 0$ עם שורשים $r_1 = 2, r_2 = 0$. הפתרון עבור השורש הגדול $r=0$ מניב $y_1 = e^{-x}$. הורדת סדר על ידי $y_2 = u(x)e^{-x}$ מניבה $u'' + \\frac{1-x}{x}u' = 0 \\implies u' = x e^x \\implies u = (x-1)e^x$, ולכן הפתרון השני הוא $y_2 = (x-1)e^x e^{-x} = x-1$. למרות שהפרש השורשים שלם ($2$), לא מופיע איבר לוגריתמי במקרה מנוון זה.",
        },
      ],
    },
    {
      id: "ode-q18-laplace-t-derivative-transform",
      domain: "תכונות גזירה והכפלה ב-t בהתמרת לפלס",
      title:
        "משוואות דיפרנציאליות רגילות - תכונות גזירה והכפלה ב-$t$ בהתמרת לפלס",
      context:
        "תהי $y(t)$ פונקציה חלקה מסדר מעריכי, ונסמן ב-$Y(s) = \\mathcal{L}\\{y(t)\\}$ את התמרת לפלס שלה. אנו מעוניינים בהתמרת האיבר המעורב $\\mathcal{L}\\{t \\cdot y'(t)\\}$.",
      formulaLatex:
        "\\mathcal{L}\\{t f(t)\\} = -\\frac{d}{ds}F(s), \\quad \\mathcal{L}\\{y'(t)\\} = s Y(s) - y(0)",
      instruction:
        "למה שווה ההתמרה $\\mathcal{L}\\{t \\cdot y'(t)\\}$ במונחי $Y(s)$ ונגזרותיה?",
      options: [
        {
          id: "ode-q18-opt1",
          plainText: "$\\mathcal{L}\\{t \\cdot y'\\} = -s Y'(s)$",
          isCorrect: false,
          explanation:
            "שגוי: נשמטה הנגזרת של $s$ לפי כלל המכפלה: $\\frac{d}{ds}[sY(s)] = Y(s) + sY'(s)$.",
        },
        {
          id: "ode-q18-opt2",
          plainText: "$\\mathcal{L}\\{t \\cdot y'\\} = s^2 Y'(s) - y(0)$",
          isCorrect: false,
          explanation:
            "שגוי: פעולת הכפל ב-$t$ מתורגמת לגזירה שלילית יחידה במישור $s$, ולא לכפל בריבועי.",
        },
        {
          id: "ode-q18-opt3",
          plainText: "$\\mathcal{L}\\{t \\cdot y'\\} = -Y(s) - y(0)$",
          isCorrect: false,
          explanation:
            "שגוי: הנגזרת של הקבוע $y(0)$ מתאפסת זהותית, והאיבר הראשי $sY'(s)$ נשמט לחלוטין.",
        },
        {
          id: "ode-q18-opt4",
          plainText:
            "$\\mathcal{L}\\{t \\cdot y'\\} = -s \\frac{dY(s)}{ds} - Y(s)$",
          mathText: "\\mathcal{L}\\{t \\cdot y'\\} = -s Y'(s) - Y(s)",
          isCorrect: true,
          explanation:
            "נכון: לפי תכונת ההכפלה ב-$t$: $\\mathcal{L}\\{t f(t)\\} = -\\frac{d}{ds}F(s)$. נציב $f(t) = y'(t)$, שהתמרתה היא $sY(s) - y(0)$. לכן: $\\mathcal{L}\\{t y'\\} = -\\frac{d}{ds}[sY(s) - y(0)] = -[1\\cdot Y(s) + s Y'(s) - 0] = -s Y'(s) - Y(s)$. זהות זו מאפשרת לפתור מד״ר עם מקדמים פולינומיים (כמו משוואת איירי או בסל) באמצעות לפלס.",
        },
      ],
    },
    {
      id: "ode-q19-bernoulli-integrating-factor-substitution",
      domain: "משוואת ברנולי והצבה ליניארית",
      title: "משוואות דיפרנציאליות רגילות - משוואת ברנולי והצבה ליניארית",
      context:
        "נתונה המשוואה הדיפרנציאלית: $x^2 y' - 2xy - y^2 = 0$ עבור $x > 0, y \\neq 0$.",
      formulaLatex:
        "y' - \\frac{2}{x}y = \\frac{1}{x^2}y^2, \\quad v = y^{1-2} = \\frac{1}{y}",
      instruction: "מהו סיווג המשוואה, ומהו פתרונה הכללי?",
      options: [
        {
          id: "ode-q19-opt1",
          plainText: "משוואה פרידה, ופתרונה הוא $y(x) = Cx^2 e^{x}$.",
          isCorrect: false,
          explanation:
            "שגוי: המשוואה אינה פרידה, שכן לא ניתן להפריד את אגף ימין למכפלה של פונקציה ב-$x$ בלבד ופונקציה ב-$y$ בלבד.",
        },
        {
          id: "ode-q19-opt2",
          plainText:
            "משוואה ליניארית מסדר ראשון, ופתרונה הוא $y(x) = x^2 + Cx$.",
          isCorrect: false,
          explanation:
            "שגוי: האיבר הריבועי $y^2$ הופך את המשוואה ללא-ליניארית.",
        },
        {
          id: "ode-q19-opt3",
          plainText: "משוואה מדויקת, ופתרונה הוא $x^2 y - y^2 x = C$.",
          isCorrect: false,
          explanation:
            "שגוי: הנגזרות המעורבות אינן שוות ($M_y = -2x-2y \\neq N_x = 2x$), ולכן ללא גורם אינטגרציה היא אינה מדויקת.",
        },
        {
          id: "ode-q19-opt4",
          plainText:
            "משוואת ברנולי (עם $n=2$), ופתרונה הכללי הוא $y(x) = -\\frac{x^2}{x + C}$ (בנוסף לפתרון הסינגולרי $y \\equiv 0$).",
          mathText: "y(x) = -\\frac{x^2}{x + C}",
          isCorrect: true,
          explanation:
            "נכון: רישום בצורה קנונית: $y' - \\frac{2}{x}y = \\frac{1}{x^2}y^2$ היא משוואת ברנולי מובהקת עם $n=2$. הצבת $v = y^{-1}$ מניבה משוואה ליניארית: $v' + \\frac{2}{x}v = -\\frac{1}{x^2}$. כפל בגורם אינטגרציה $x^2$ נותן $(x^2 v)' = -1 \\implies x^2 v = -x - C \\implies v = -\\frac{x+C}{x^2}$. חזרה למשתנה המקורי: $y = \\frac{1}{v} = -\\frac{x^2}{x+C}$.",
        },
      ],
    },
    {
      id: "ode-q20-phase-portrait-eigenvalue-classification",
      domain: "מיון מרחב הפאזה של מערכת מישורית",
      title:
        "משוואות דיפרנציאליות רגילות - מיון מרחב הפאזה של מערכת מישורית",
      context:
        "נתונה מערכת המשוואות במישור: $\\vec{x}'(t) = A\\vec{x}(t)$ כאשר $A = \\begin{pmatrix} 2 & -a \\\\ 5a & -2 \\end{pmatrix}$ עם פרמטר ממשי $a$.",
      formulaLatex:
        "\\det(A - \\lambda I) = \\lambda^2 - (4 - 5a^2) = 0 \\implies \\lambda_{1,2} = \\pm\\sqrt{4 - 5a^2}",
      instruction:
        "מהו האפיון של נקודת שיווי המשקל בראשית $(0, 0)$ כפונקציה של הפרמטר $a$?",
      options: [
        {
          id: "ode-q20-opt1",
          plainText:
            "הראשית היא מוקד יציב (Stable Spiral) לכל $a > 0$.",
          isCorrect: false,
          explanation:
            "שגוי: עקבת המטריצה היא $\\operatorname{tr}(A) = 2 + (-2) = 0$, ולכן החלק הממשי של הערכים העצמיים לעולם אינו שלילי ממש (אין שקיעה אסימפטוטית יציבה).",
        },
        {
          id: "ode-q20-opt2",
          plainText:
            "הראשית היא קשר לא-יציב (Unstable Node) לכל $a \\in \\mathbb{R}$.",
          isCorrect: false,
          explanation:
            "שגוי: כדי לקבל קשר נדרשים שני ערכים עצמיים בעלי אותו סימן, אך כאן סכום הערכים העצמיים הוא אפס ולכן סימניהם מנוגדים או מדומים טהורים.",
        },
        {
          id: "ode-q20-opt3",
          plainText:
            "הראשית היא מרכז (Center) עבור $|a| < \\frac{2}{\\sqrt{5}}$, ואוכף (Saddle) עבור $|a| > \\frac{2}{\\sqrt{5}}$.",
          isCorrect: false,
          explanation:
            "שגוי: התנאי הפוך; כאשר $4 - 5a^2 > 0$ הביטוי תחת השורש חיובי והערכים העצמיים ממשיים בעלי סימנים מנוגדים ($\\pm$), דבר המגדיר נקודת אוכף.",
        },
        {
          id: "ode-q20-opt4",
          plainText:
            "הראשית היא נקודת אוכף (Saddle) עבור $|a| < \\frac{2}{\\sqrt{5}}$, ומרכז (Center) עבור $|a| > \\frac{2}{\\sqrt{5}}$.",
          mathText:
            "|a| < \\frac{2}{\\sqrt{5}} \\implies \\text{Saddle}, \\quad |a| > \\frac{2}{\\sqrt{5}} \\implies \\text{Center}",
          isCorrect: true,
          explanation:
            "נכון: המשוואה האופיינית היא $\\lambda^2 = 4 - 5a^2$. אם $|a| < 2/\\sqrt{5}$, מתקיים $4 - 5a^2 > 0$ והערכים העצמיים הם $\\pm\\lambda_0$ ממשיים בעלי סימן מנוגד, ולכן הראשית היא נקודת אוכף (Saddle point) לא יציבה. אם $|a| > 2/\\sqrt{5}$, מתקיים $4 - 5a^2 < 0$ והערכים העצמיים הם מדומים טהורים $\\pm i\\omega$, ולכן הראשית היא מרכז (Center) המוקף במסלולים סגורים אליפטיים.",
        },
      ],
    },
  ];

export const ACADEMIC_ODE_QUESTIONS =
  ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS;

/**
 * Stratified onboarding sample: one from blocks A (0–6), B (7–13), C (14–19), then shuffle.
 * Fail-closed: undersized stratum → [].
 */
export function sampleODEOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS.slice(0, 7);
  const groupB = ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS.slice(7, 14);
  const groupC = ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS.slice(14, 20);
  if (!groupA.length || !groupB.length || !groupC.length) return [];

  const pickedA = groupA[Math.floor(Math.random() * groupA.length)];
  const pickedB = groupB[Math.floor(Math.random() * groupB.length)];
  const pickedC = groupC[Math.floor(Math.random() * groupC.length)];

  const sampled = [pickedA, pickedB, pickedC].filter(
    (q): q is AcademicDiagnosticQuestion => Boolean(q)
  );
  if (sampled.length !== 3) return [];

  for (let i = sampled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sampled[i], sampled[j]] = [sampled[j], sampled[i]];
  }

  return sampled;
}
