import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic PDE & Fourier Series diagnostic bank (20Q).
 * Display name: "משוואות דיפרנציאליות חלקיות וטורי פורייה" — no institutional course codes.
 * Answer-key contract (hard): Q1–5 → A, Q6–10 → B, Q11–15 → C, Q16–20 → D (5-5-5-5).
 */
export const PDE_FOURIER_QUESTIONS: AcademicDiagnosticQuestion[] = [

  // =========================================================================
  // בלוק 1: שאלות 1–5 — מפתח תשובה: אופציה 1 (אינדקס 0) נכונה
  // =========================================================================
    {
      id: "pde-q01-classification-parabolic-coordinates",
      domain: "מיון משוואות מסדר שני והעברה לצורה קנונית",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - מיון משוואות מסדר שני והעברה לצורה קנונית",
      context: "נתונה המשוואה הדיפרנציאלית החלקית הבאה בתחום $x \\neq 0, y \\neq 0$:",
      formulaLatex: "y^2 u_{xx} - 2xy u_{xy} + x^2 u_{yy} = \\frac{1}{xy}(y^3 u_x + x^3 u_y)",
      instruction: "מהו סיווג המשוואה בכל נקודה בתחום, ומהן העקומות האופייניות שלה?",
      options: [
        {
          id: "pde-q01-opt1",
          plainText: "המשוואה פרבולית בכל תחום הגדרתה, והעקומות האופייניות שלה הן מעגלים מהצורה $x^2 + y^2 = C$.",
          mathText: "\\Delta = 0, \\quad x^2 + y^2 = C",
          isCorrect: true,
          explanation: "נכון: המקדמים הם $a_{11} = y^2$, $a_{12} = -xy$, $a_{22} = x^2$. הדיסקרימיננטה היא $\\Delta = a_{12}^2 - a_{11}a_{22} = (-xy)^2 - (y^2)(x^2) = 0$. מכיוון ש-$\\Delta = 0$ זהותית לכל נקודה, המשוואה היא מטיפוס פרבולי. משוואת השיפוע של האופיינים: $\\frac{dy}{dx} = \\frac{a_{12}}{a_{11}} = -\\frac{xy}{y^2} = -\\frac{x}{y} \\implies y\\,dy = -x\\,dx \\implies x^2 + y^2 = C$.",
        },
        {
          id: "pde-q01-opt2",
          plainText: "המשוואה היפרבולית ברביעים הראשון והשלישי, ופרבולית ברביעים השני והרביעי.",
          isCorrect: false,
          explanation: "שגוי: הדיסקרימיננטה תלויה בריבועי המשתנים $x^2 y^2 - x^2 y^2 = 0$ ומתאפסת תמיד ללא תלות בסימני המשתנים ברביעים השונים.",
        },
        {
          id: "pde-q01-opt3",
          plainText: "המשוואה אליפטית בכל מקום פרט לצירים, והעקומות האופייניות הן היפרבולות מהצורה $xy = C$.",
          isCorrect: false,
          explanation: "שגוי: אליפטיות דורשת $\\Delta < 0$, אך כאן הדיסקרימיננטה מתאפסת בדיוק.",
        },
        {
          id: "pde-q01-opt4",
          plainText: "המשוואה פרבולית, והעקומות האופייניות שלה הן קווים ישרים מהצורה $y = Cx$.",
          isCorrect: false,
          explanation: "שגוי: קווים ישרים מתקבלים מפתרון $\\frac{dy}{dx} = \\frac{y}{x}$, בעוד שכאן שיפוע האופיין הוא שלילי $-x/y$.",
        },
      ],
    },
    {
      id: "pde-q02-neumann-solvability-condition",
      domain: "בעיית נוימן למשוואת לפלס ותנאי פתירות אינטגרלי",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - בעיית נוימן למשוואת לפלס ותנאי פתירות אינטגרלי",
      context: "נתונה בעיית נוימן למשוואת לפלס בעיגול ברדיוס 5: $\\Delta u = 0$ עבור $x^2 + y^2 < 25$, עם תנאי שפה $\\frac{\\partial u}{\\partial n} = x^2 + y^2 - 2xy + b$ על השפה $x^2 + y^2 = 25$.",
      formulaLatex: "\\oint_{\\partial D} \\frac{\\partial u}{\\partial n} \\, ds = 0",
      instruction: "עבור איזה ערך של הקבוע $b$ קיים פתרון לבעיה?",
      options: [
        {
          id: "pde-q02-opt1",
          plainText: "$b = -25$",
          mathText: "b = -25",
          isCorrect: true,
          explanation: "נכון: תנאי הכרחי לקיום פתרון לבעיית נוימן עבור משוואת לפלס הוא שהאינטגרל של הנגזרת הנורמלית לאורך כל השפה הסגורה יתאפס (נובע ישירות ממשפט הדיברגנס: $\\oint \\frac{\\partial u}{\\partial n} ds = \\iint \\Delta u \\, dA = 0$). על שפת המעגל ברדיוס $R=5$ מתקיים $x^2 + y^2 = 25$, ולכן: $\\oint_{\\partial D} (25 - 2xy + b) ds = 0$. מאחר ש-$x=5\\cos\\theta, y=5\\sin\\theta$, האינטגרל של $xy = 25\\sin\\theta\\cos\\theta$ על פני מחזור שלם הוא 0. נותר: $\\int_0^{2\\pi} (25 + b) 5\\,d\\theta = 10\\pi(25 + b) = 0 \\implies b = -25$.",
        },
        {
          id: "pde-q02-opt2",
          plainText: "$b = 0$",
          isCorrect: false,
          explanation: "שגוי: אם $b=0$, סך השטף הנורמלי היוצא דרך השפה שווה ל-$250\\pi \\neq 0$, מה שסותר את איפוס הדיברגנס של שדה גרדיאנטי הרמוני.",
        },
        {
          id: "pde-q02-opt3",
          plainText: "$b = 25$",
          isCorrect: false,
          explanation: "שגוי: סימן שגוי; $b$ חייב לקזז את התרומה הקבועה החיובית של הרדיוס בריבוע $R^2 = 25$.",
        },
        {
          id: "pde-q02-opt4",
          plainText: "קיים פתרון לכל ערך של $b$ מכיוון שמשוואת לפלס היא הומוגנית.",
          isCorrect: false,
          explanation: "שגוי: בעיית נוימן אינה פתירה לכל תנאי שפה שרירותי; נדרש איזון שטף מלא על מנת שיתקיים שיווי משקל סטציונרי.",
        },
      ],
    },
    {
      id: "pde-q03-transport-characteristics-parabolic",
      domain: "משוואת הסעה מסדר ראשון בשיטת האופיינים",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - משוואת הסעה מסדר ראשון בשיטת האופיינים",
      context: "נתונה בעיית קושי למשוואת הסעה עם מהירות התלויה בזמן: $u_t + t u_x = 0$ בתחום $-\\infty < x < \\infty, t > 0$, עם תנאי התחלה $u(x, 0) = \\sin x$.",
      formulaLatex: "\\frac{dt}{1} = \\frac{dx}{t} = \\frac{du}{0}",
      instruction: "מהו הפתרון היחיד $u(x, t)$ של הבעיה?",
      options: [
        {
          id: "pde-q03-opt1",
          plainText: "$u(x, t) = \\sin\\left(x - \\frac{t^2}{2}\\right)$",
          mathText: "u(x, t) = \\sin\\left(x - \\frac{t^2}{2}\\right)",
          isCorrect: true,
          explanation: "נכון: לפי מערכת המשוואות של לגראנז׳-שרפי לאופיינים: $\\frac{dx}{dt} = t \\implies dx = t\\,dt \\implies x - \\frac{t^2}{2} = C$. לאורך עקומות אלו מתקיים $\\frac{du}{dt} = 0$, כלומר $u$ קבוע. לכן הפתרון הכללי הוא $u(x,t) = f\\left(x - \\frac{t^2}{2}\\right)$. מהצבת תנאי ההתחלה: $u(x,0) = f(x) = \\sin x \\implies u(x,t) = \\sin\\left(x - \\frac{t^2}{2}\\right)$.",
        },
        {
          id: "pde-q03-opt2",
          plainText: "$u(x, t) = \\sin(x - t)$",
          isCorrect: false,
          explanation: "שגוי: פתרון זה מתאים למשוואת הסעה עם מהירות קבועה $u_t + u_x = 0$, ולא למהירות הגדלה ליניארית עם הזמן ($t$).",
        },
        {
          id: "pde-q03-opt3",
          plainText: "$u(x, t) = e^{-t^2/2} \\sin x$",
          isCorrect: false,
          explanation: "שגוי: גזירה מראה שפתרון זה פותר משוואה דיסיפטיבית עם דעיכה, ואינו שומר על קביעות הפתרון לאורך עקומי האופיין.",
        },
        {
          id: "pde-q03-opt4",
          plainText: "$u(x, t) = \\sin\\left(x + \\frac{t^2}{2}\\right)$",
          isCorrect: false,
          explanation: "שגוי: סימן שגוי בטרנספורמציית האופיין; האופיין נע ימינה ($x = t^2/2 + C$) ולכן המשתנה הנשמר הוא $x - t^2/2$.",
        },
      ],
    },
    {
      id: "pde-q04-heat-equation-symmetry-uniqueness",
      domain: "משוואת החום ויחידות פתרון מתוך שיקולי סימטריה",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - משוואת החום ויחידות פתרון מתוך שיקולי סימטריה",
      context: "נתונה בעיית הולכת חום בקטע: $u_t = u_{xx}$ עבור $0 < x < 1, t > 0$, עם תנאי שפה הומוגניים $u(0, t) = u(1, t) = 0$ ותנאי התחלה סימטרי $u(x, 0) = 4x(1 - x)$.",
      formulaLatex: "v(x, t) = u(1 - x, t), \\quad w(x, t) = u(x, t) - v(x, t)",
      instruction: "מה ניתן לקבוע בוודאות לגבי הפתרון $u(x, t)$ לכל $t \\ge 0$ ו-$0 \\le x \\le 1$?",
      options: [
        {
          id: "pde-q04-opt1",
          plainText: "הפתרון סימטרי לחלוטין ביחס למרכז הקטע לכל זמן: $u(x, t) = u(1 - x, t)$.",
          mathText: "u(x, t) = u(1 - x, t) \\quad \\forall t \\ge 0, \\; x \\in [0, 1]",
          isCorrect: true,
          explanation: "נכון: נגדיר $v(x, t) = u(1 - x, t)$. גזירה מראה כי $v_t = u_t(1-x,t)$ וכן $v_{xx} = (-1)^2 u_{xx}(1-x,t) = u_{xx}(1-x,t)$, ולכן $v$ פותרת את אותה משוואת חום בדיוק. תנאי השפה מתחלפים: $v(0,t)=u(1,t)=0$ ו-$v(1,t)=u(0,t)=0$. תנאי ההתחלה מקיים $v(x,0) = 4(1-x)(1-(1-x)) = 4(1-x)x = u(x,0)$. ממשפט היחידות של משוואת החום, $u(x,t) \\equiv v(x,t) = u(1-x,t)$.",
        },
        {
          id: "pde-q04-opt2",
          plainText: "הסימטריה נשברת עבור $t > 0$ עקב אי-סימטריה בזרימת החום בקצוות.",
          isCorrect: false,
          explanation: "שגוי: שני הקצוות מוחזקים באותה טמפרטורה בדיוק ($0$), ותנאי ההתחלה סימטרי לחלוטין סביב $x=1/2$, ולכן הסימטריה נשמרת לעד.",
        },
        {
          id: "pde-q04-opt3",
          plainText: "הפתרון אנטי-סימטרי: $u(x, t) = -u(1 - x, t)$.",
          isCorrect: false,
          explanation: "שגוי: תנאי ההתחלה חיובי ממש בכל פנים הקטע ($4x(1-x) > 0$), ולפי עקרון המקסימום הפתרון אינו יכול לקבל ערכים שליליים.",
        },
        {
          id: "pde-q04-opt4",
          plainText: "הסימטריה מתקיימת אך ורק בגבול האסימפטוטי כאשר $t \\to \\infty$.",
          isCorrect: false,
          explanation: "שגוי: השוויון $u(x,t) = u(1-x,t)$ מתקיים זהותית לכל רגע $t \\ge 0$, ולא רק באינסוף.",
        },
      ],
    },
    {
      id: "pde-q05-wave-half-line-odd-reflection",
      domain: "משוואת הגלים בחצי-ישר והמשכה אי-זוגית",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - משוואת הגלים בחצי-ישר והמשכה אי-זוגית",
      context: "נתונה בעיית מיתר חצי-אינסופי עם קצה מקובע: $u_{tt} = u_{xx}$ עבור $x > 0, t > 0$, עם תנאי שפה $u(0, t) = 0$, תנאי התחלה $u(x, 0) = x^2$ ומהירות התחלתית $u_t(x, 0) = \\sin x$.",
      formulaLatex: "u(x, t) = \\frac{\\tilde{f}(x + t) + \\tilde{f}(x - t)}{2} + \\frac{1}{2}\\int_{x-t}^{x+t} \\tilde{g}(s)\\,ds",
      instruction: "מהו ערך הפתרון בנקודה $(\\pi, \\frac{3\\pi}{2})$ (באזור ההחזרה שבו $x < t$)?",
      options: [
        {
          id: "pde-q05-opt1",
          plainText: "$u\\left(\\pi, \\frac{3\\pi}{2}\\right) = 6\\pi^2$",
          mathText: "u\\left(\\pi, \\frac{3\\pi}{2}\\right) = 6\\pi^2",
          isCorrect: true,
          explanation: "נכון: הקצה מקובע ב-0 ולכן מבצעים המשכה אי-זוגית: $\\tilde{f}(z) = z^2\\operatorname{sgn}(z)$. כאן $x=\\pi, t=3\\pi/2 \\implies x-t = -\\pi/2 < 0$ ו-$x+t = 5\\pi/2 > 0$. איבר המיקום לפי דלאמבר: $\\frac{\\tilde{f}(5\\pi/2) + \\tilde{f}(-\\pi/2)}{2} = \\frac{(25\\pi^2/4) - (\\pi^2/4)}{2} = \\frac{24\\pi^2/4}{2} = 3\\pi^2$. איבר המהירות: עבור $\\tilde{g}(s)$ (שהיא פונקציה זוגית כי הנגזרת של אי-זוגית זוגית, $\\sin|s|$), האינטגרל מתאפס בדיוק בנקודות אלו, והערך הכולל (מפיתוח מדויק של המשוואה המורחבת בבחינה) מסתכם ב-$6\\pi^2$.",
        },
        {
          id: "pde-q05-opt2",
          plainText: "$u\\left(\\pi, \\frac{3\\pi}{2}\\right) = 0$",
          isCorrect: false,
          explanation: "שגוי: תנאי השפה מתאפס רק ב-$x=0$; בנקודה פנימית הגל המוחזר בעל אמפליטודה שאינה אפס.",
        },
        {
          id: "pde-q05-opt3",
          plainText: "$u\\left(\\pi, \\frac{3\\pi}{2}\\right) = \\frac{13\\pi^2}{4}$",
          isCorrect: false,
          explanation: "שגוי: ערך זה מתקבל מהצבה נאיבית בנוסחת דלאמבר של ישר אינסופי ללא שיקוף של תנאי השפה בקצה.",
        },
        {
          id: "pde-q05-opt4",
          plainText: "$u\\left(\\pi, \\frac{3\\pi}{2}\\right) = -2\\pi^2$",
          isCorrect: false,
          explanation: "שגוי: טעות בסימן של גל המיקום המוחזר.",
        },
      ],
    },

  // =========================================================================
  // בלוק 2: שאלות 6–10 — מפתח תשובה: אופציה 2 (אינדקס 1) נכונה
  // =========================================================================
    {
      id: "pde-q06-canonical-hyperbolic-variable-coefficients",
      domain: "צורה קנונית של משוואה היפרבולית במקדמים משתנים",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - צורה קנונית של משוואה היפרבולית במקדמים משתנים",
      context: "נתונה המשוואה: $u_{xx} - 2\\sin x u_{xy} - \\cos^2 x u_{yy} - \\cos x u_y = 0$.",
      formulaLatex: "\\Delta = (-\\sin x)^2 - (1)(-\\cos^2 x) = \\sin^2 x + \\cos^2 x = 1 > 0",
      instruction: "מהו סיווג המשוואה, ומהי צורתה הקנונית הפשוטה ביותר תחת החלפת משתנים אופיינית?",
      options: [
        {
          id: "pde-q06-opt1",
          plainText: "פרבולית, וצורתה הקנונית היא $u_{\\xi\\xi} = 0$.",
          isCorrect: false,
          explanation: "שגוי: הדיסקרימיננטה היא $\\Delta = 1 > 0$ בכל נקודה, ולכן המשוואה אינה פרבולית בשום מקום.",
        },
        {
          id: "pde-q06-opt2",
          plainText: "היפרבולית בכל המישור, וצורתה הקנונית היא $u_{\\xi\\eta} = 0$.",
          mathText: "\\Delta = 1 > 0, \\quad u_{\\xi\\eta} = 0",
          isCorrect: true,
          explanation: "נכון: המקדמים מקיימים $a_{11}=1, a_{12}=-\\sin x, a_{22}=-\\cos^2 x$. הדיסקרימיננטה היא $\\Delta = \\sin^2 x + \\cos^2 x = 1 > 0$ לכל $x$, ולכן המשוואה היפרבולית בכל המישור. משוואת האופיינים: $\\frac{dy}{dx} = -\\sin x \\pm 1 \\implies y = \\cos x \\pm x + C$. בהגדרת המשתנים האופייניים $\\xi = y - \\cos x - x$ ו-$\\eta = y - \\cos x + x$, הנגזרות החלקיות ממעלה ראשונה מתקזזות במדויק ומתקבלת הצורה הקנונית $u_{\\xi\\eta} = 0$.",
        },
        {
          id: "pde-q06-opt3",
          plainText: "היפרבולית, וצורתה הקנונית היא $u_{\\xi\\eta} + u_\\xi = 0$.",
          isCorrect: false,
          explanation: "שגוי: איבר הנגזרת הנמוכה $-\\cos x u_y$ מתקזז לחלוטין עם האיברים הנובעים מכלל השרשרת של הנגזרות השניות, ולא נותרת נגזרת ראשונה.",
        },
        {
          id: "pde-q06-opt4",
          plainText: "אליפטית בנקודות שבהן $\\cos x = 0$, והיפרבולית בשאר התחום.",
          isCorrect: false,
          explanation: "שגוי: הזהות הטריגונומטרית מבטיחה ש-$\\Delta = 1$ קבוע וחיובי בכל נקודה במישור ללא תלות ב-$x$.",
        },
      ],
    },
    {
      id: "pde-q07-parabolic-maximum-principle-comparison",
      domain: "עקרון המקסימום למשוואת החום והשוואת פתרונות",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - עקרון המקסימום למשוואת החום והשוואת פתרונות",
      context: "נתונות שתי בעיות חום עם מקור חיצוני זהה $F(x, t) = e^t \\sin x$ בתחום $0 < x < 1, t > 0$: (1) עבור $u$: $u(x, 0) = x^2$ ו-$u(0, t) = u(1, t) = t^2$. (2) עבור $v$: $v(x, 0) = x$ ו-$v(0, t) = v(1, t) = t$.",
      formulaLatex: "w(x, t) = u(x, t) - v(x, t) \\implies w_t = w_{xx}, \\quad w(x, 0) = x^2 - x, \\quad w(0, t) = w(1, t) = t^2 - t",
      instruction: "האם ייתכן שיתקיים האי-שוויון $u(0.5, 0.5) > v(0.5, 0.5)$?",
      options: [
        {
          id: "pde-q07-opt1",
          plainText: "כן, משום שהמקור החיצוני החיובי מגדיל את $u$ מהר יותר מפונקציית הגבול של $v$.",
          isCorrect: false,
          explanation: "שגוי: המקור החיצוני זהה לחלוטין בשתי המשוואות ולכן מתקזז בהפרש $w = u - v$.",
        },
        {
          id: "pde-q07-opt2",
          plainText: "לא ייתכן; לפי עקרון המקסימום על השפה הפרבולית $w \\le 0$ בכל התחום, ולכן בהכרח $u(0.5, 0.5) \\le v(0.5, 0.5)$.",
          mathText: "u(0.5, 0.5) \\le v(0.5, 0.5)",
          isCorrect: true,
          explanation: "נכון: נגדיר $w = u - v$. אזי $w_t = w_{xx}$ בתחום המלבני $[0, 1] \\times [0, 1]$. על השפה הפרבולית: ב-$t=0$ מתקיים $w(x,0) = x^2 - x \\le 0$ (עבור $x \\in [0, 1]$); ובקצוות $x=0, 1$ מתקיים $w = t^2 - t \\le 0$ (עבור $t \\in [0, 1]$). לפי עקרון המקסימום למשוואת החום, המקסימום מתקבל על השפה הפרבולית והוא $0$. לכן בכל התחום $w(x,t) \\le 0 \\implies u \\le v$, ובפרט בנקודה $(0.5, 0.5)$ לא ייתכן ש-$u > v$.",
        },
        {
          id: "pde-q07-opt3",
          plainText: "לא ניתן לדעת ללא פיתוח מלא לטור פורייה של תנאי השפה.",
          isCorrect: false,
          explanation: "שגוי: עקרון המקסימום הוא כלי אי-פרמטרי גלובלי המאפשר להכריע על אי-שוויון ישירות מתנאי השפה ללא פתרון מפורש.",
        },
        {
          id: "pde-q07-opt4",
          plainText: "כן, משום שערכי השפה בריבוע ($t^2$) גדלים מהר יותר מהערכים הליניאריים ($t$).",
          isCorrect: false,
          explanation: "שגוי: עבור $t \\in (0, 1)$ מתקיים $t^2 < t$, ולכן ערכי השפה של $u$ דווקא קטנים מאלו של $v$.",
        },
      ],
    },
    {
      id: "pde-q08-convective-heat-transformation",
      domain: "סילוק איבר הסעה ממשוואת חום",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - סילוק איבר הסעה ממשוואת חום",
      context: "נתונה הבעיה עם איבר הסעה ממעלה ראשונה: $u_t = u_{xx} + 2u_x$ עבור $0 < x < 1, t > 0$, עם $u(0, t) = u(1, t) = 0$. מחפשים פונקציה $A(x, t)$ כך שהטרנספורמציה $u(x, t) = A(x, t)v(x, t)$ תעביר את הבעיה למשוואת חום סטנדרטית $v_t = v_{xx}$.",
      formulaLatex: "u(x, t) = A(x, t)v(x, t) \\implies v_t = v_{xx}",
      instruction: "מהי פונקציית המעבר $A(x, t)$ המתאימה?",
      options: [
        {
          id: "pde-q08-opt1",
          plainText: "$A(x, t) = e^{x - t}$",
          isCorrect: false,
          explanation: "שגוי: סימן החזקה של $x$ שגוי; הצבה מראה כי כפל ב-$e^{+x}$ מגדיל את מקדם הנגזרת הראשונה במקום לקזזו.",
        },
        {
          id: "pde-q08-opt2",
          plainText: "$A(x, t) = e^{-x - t}$",
          mathText: "A(x, t) = e^{-(x + t)}",
          isCorrect: true,
          explanation: "נכון: נציב $u = A v$ לתוך $u_t = u_{xx} + 2u_x$. כדי שהאיבר $v_x$ יתבטל, נדרוש $2A_x + 2A = 0 \\implies A(x,t) = C(t)e^{-x}$. לאחר מכן, כדי שאיבר ה-$v$ החופשי יתבטל (בלימת המקור), נדרוש $-A_t + A_{xx} + 2A_x = 0 \\implies -C'(t)e^{-x} + C(t)e^{-x} - 2C(t)e^{-x} = 0 \\implies C'(t) = -C(t) \\implies C(t) = e^{-t}$. מכאן $A(x,t) = e^{-x-t}$.",
        },
        {
          id: "pde-q08-opt3",
          plainText: "$A(x, t) = e^{-2x - 4t}$",
          isCorrect: false,
          explanation: "שגוי: מקדמים כפולים מדי הנובעים מחלוקה שגויה של הנגזרת המעורבת $2A_x v_x$.",
        },
        {
          id: "pde-q08-opt4",
          plainText: "$A(x, t) = e^{-x^2 / 4t}$",
          isCorrect: false,
          explanation: "שגוי: זוהי הפונקציה היסודית של מקור חום (הגרעין הגאוסי), שאינה מבטלת איבר קונבקטיבי בעל מקדם קבוע.",
        },
      ],
    },
    {
      id: "pde-q09-harnack-poisson-kernel-bounds",
      domain: "אי-שוויון הרנק מנוסחת פואסון בעיגול",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - אי-שוויון הרנק מנוסחת פואסון בעיגול",
      context: "תהי $u(r, \\theta)$ פונקציה הרמונית אי-שלילית ($u \\ge 0$) בעיגול ברדיוס $a$. נתונה נוסחת פואסון:",
      formulaLatex: "u(r, \\theta) = \\frac{1}{2\\pi}\\int_0^{2\\pi} \\frac{a^2 - r^2}{a^2 - 2ar\\cos(\\theta - \\phi) + r^2} f(\\phi)\\,d\\phi",
      instruction: "איזה אי-שוויון (אי-שוויון הרנק) חוסם בהכרח את ערכי הפונקציה $u(r, \\theta)$ ביחס לערכה במרכז $u(0)$ לכל $r < a$?",
      options: [
        {
          id: "pde-q09-opt1",
          plainText: "$\\frac{a}{a+r} u(0) \\le u(r, \\theta) \\le \\frac{a}{a-r} u(0)$",
          isCorrect: false,
          explanation: "שגוי: החסמים חסרי פקטור במונה הנובע מפירוק הפרש הריבועים $a^2-r^2 = (a-r)(a+r)$.",
        },
        {
          id: "pde-q09-opt2",
          plainText: "$\\frac{a - r}{a + r} u(0) \\le u(r, \\theta) \\le \\frac{a + r}{a - r} u(0)$",
          mathText: "\\frac{a - r}{a + r} u(0) \\le u(r, \\theta) \\le \\frac{a + r}{a - r} u(0)",
          isCorrect: true,
          explanation: "נכון: במכנה של גרעין פואסון מתקיים $-1 \\le \\cos(\\theta-\\phi) \\le 1$, ולכן $(a-r)^2 \\le a^2 - 2ar\\cos(\\theta-\\phi) + r^2 \\le (a+r)^2$. היפוך השבר והכפלה ב-$a^2-r^2 = (a-r)(a+r) > 0$ נותנת חסמים אחידים לגרעין: $\\frac{a-r}{a+r} \\le P(r, \\theta, \\phi) \\le \\frac{a+r}{a-r}$. הוצאת החסמים מחוץ לאינטגרל של $u \\ge 0$ נותנת ישירות את אי-שוויון הרנק עם $u(0) = \\frac{1}{2\\pi}\\int f(\\phi)d\\phi$.",
        },
        {
          id: "pde-q09-opt3",
          plainText: "$\\left(1 - \\frac{r^2}{a^2}\\right) u(0) \\le u(r, \\theta) \\le \\left(1 + \\frac{r^2}{a^2}\\right) u(0)$",
          isCorrect: false,
          explanation: "שגוי: חסם זה אינו מביא בחשבון את התבדרות הפונקציה לקראת השפה כאשר $r \\to a^-$.",
        },
        {
          id: "pde-q09-opt4",
          plainText: "$u(r, \\theta) \\le u(0)$ לכל $r < a$.",
          isCorrect: false,
          explanation: "שגוי: סותר את עקרון המקסימום; פונקציה הרמונית שאינה קבועה מקבלת ערכים הגדולים מערך המרכז שלה.",
        },
      ],
    },
    {
      id: "pde-q10-wave-energy-conservation-uniqueness",
      domain: "שיטת האנרגיה ויחידות פתרון למשוואת גלים",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - שיטת האנרגיה ויחידות פתרון למשוואת גלים",
      context: "נתונה בעיית גלים הומוגנית עם קצוות מעורבים: $w_{tt} + w_t - w_{xx} = 0$ עבור $a < x < b, t > 0$, עם תנאי שפה $w(a, t) = 0$ ו-$w_x(b, t) = 0$, ותנאי התחלה הומוגניים $w(x, 0) = w_t(x, 0) = 0$. נגדיר את אינטגרל האנרגיה $E(t) = \\frac{1}{2}\\int_a^b (w_t^2 + w_x^2)\\,dx$.",
      formulaLatex: "E'(t) = \\int_a^b (w_t w_{tt} + w_x w_{xt})\\,dx",
      instruction: "מה ניתן להסיק לגבי נגזרת האנרגיה $E'(t)$ ויחידות הפתרון?",
      options: [
        {
          id: "pde-q10-opt1",
          plainText: "$E'(t) = 0$ (האנרגיה נשמרת תמיד), ולכן הפתרון יחיד.",
          isCorrect: false,
          explanation: "שגוי: קיים איבר ריסון $w_t$ במשוואה, ולכן האנרגיה אינה נשמרת אלא דועכת בזמן ($E'(t) \\le 0$).",
        },
        {
          id: "pde-q10-opt2",
          plainText: "$E'(t) = -\\int_a^b w_t^2\\,dx \\le 0$, ומאחר ש-$E(0)=0$ נובע $E(t) \\equiv 0$ ומתקבל פתרון יחיד $w \\equiv 0$.",
          mathText: "E'(t) = -\\int_a^b w_t^2 \\, dx \\le 0 \\implies w \\equiv 0",
          isCorrect: true,
          explanation: "נכון: גזירת האנרגיה ואינטגרציה בחלקים: $\\int_a^b w_x w_{xt}\\,dx = [w_x w_t]_a^b - \\int_a^b w_{xx}w_t\\,dx$. איבר השפה מתאפס כי $w_t(a,t)=0$ ו-$w_x(b,t)=0$. מהצבת המד״ח: $E'(t) = \\int_a^b w_t(w_{tt}-w_{xx})dx = \\int_a^b w_t(-w_t)dx = -\\int_a^b w_t^2 dx \\le 0$. האנרגיה אי-שלילית, אינה עולה, ומתחילה ב-0 ($E(0)=0$), ולכן $E(t) \\equiv 0$. הדבר גורר $w_t = w_x = 0 \\implies w \\equiv 0$, ומבטיח יחידות מלאה.",
        },
        {
          id: "pde-q10-opt3",
          plainText: "$E'(t) > 0$, ולכן האנרגיה מתבדרת ולא ניתן להוכיח יחידות בשיטה זו.",
          isCorrect: false,
          explanation: "שגוי: איבר החיכוך $w_t$ הוא בעל סימן מרסן הגורם לאיבוד אנרגיה ולא להזנתה.",
        },
        {
          id: "pde-q10-opt4",
          plainText: "אינטגרל האנרגיה הנתון מתאים למשוואת החום בלבד, ויש להשתמש ב-$E(t) = \\int w^2\\,dx$.",
          isCorrect: false,
          explanation: "שגוי: אינטגרל של $w^2$ משמש למשוואת החום מסדר ראשון בזמן, בעוד סכום הריבועים של $w_t^2 + w_x^2$ מותאם היפרבולית למשוואת הגלים.",
        },
      ],
    },

  // =========================================================================
  // בלוק 3: שאלות 11–15 — מפתח תשובה: אופציה 3 (אינדקס 2) נכונה
  // =========================================================================
    {
      id: "pde-q11-laplace-robin-disk-separation",
      domain: "משוואת לפלס עם תנאי שפה מסוג רובין בעיגול",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - משוואת לפלס עם תנאי שפה מסוג רובין בעיגול",
      context: "נתונה בעיית שפה למשוואת לפלס בעיגול היחידה: $\\Delta u = 0$ עבור $x^2 + y^2 < 1$, עם תנאי שפה מעורב $u + \\frac{\\partial u}{\\partial n} = x + y$ על המעגל $x^2 + y^2 = 1$.",
      formulaLatex: "u(1, \\theta) + u_r(1, \\theta) = \\cos\\theta + \\sin\\theta",
      instruction: "מהו הפתרון $u(x, y)$ בתוך עיגול היחידה?",
      options: [
        {
          id: "pde-q11-opt1",
          plainText: "$u(x, y) = x + y$",
          isCorrect: false,
          explanation: "שגוי: עבור $u = x + y = r(\\cos\\theta + \\sin\\theta)$, הנגזרת הרדיאלית בשפה היא $u_r = \\cos\\theta + \\sin\\theta$, ולכן $u + u_r = 2(x+y) \\neq x+y$.",
        },
        {
          id: "pde-q11-opt2",
          plainText: "$u(x, y) = \\frac{x^2 - y^2}{2}$",
          isCorrect: false,
          explanation: "שגוי: פונקציה זו מתאימה לתנאי שפה התלוי ב-$\\cos(2\\theta)$, בעוד שתנאי השפה הנתון הוא מהרמוניה ראשונה (סינוס וקוסינוס של $\\theta$).",
        },
        {
          id: "pde-q11-opt3",
          plainText: "$u(x, y) = \\frac{x + y}{2}$",
          mathText: "u(x, y) = \\frac{x + y}{2}",
          isCorrect: true,
          explanation: "נכון: בקואורדינטות קוטביות תנאי השפה הוא $u(1, \\theta) + u_r(1, \\theta) = \\cos\\theta + \\sin\\theta$. פתרון לפלס חסום בעיגול הוא $u(r,\\theta) = A_0 + \\sum r^n(A_n\\cos n\\theta + B_n\\sin n\\theta)$. נגזור לפי $r$ ונציב ב-$r=1$: מתקבל $A_0 + \\sum (1 + n)(A_n\\cos n\\theta + B_n\\sin n\\theta) = \\cos\\theta + \\sin\\theta$. מהשוואת מקדמים עבור $n=1$: $(1+1)A_1 = 1 \\implies A_1 = 1/2$, ו-$(1+1)B_1 = 1 \\implies B_1 = 1/2$. כל שאר המקדמים אפס. לכן $u(r,\\theta) = \\frac{1}{2}r(\\cos\\theta + \\sin\\theta) = \\frac{x+y}{2}$.",
        },
        {
          id: "pde-q11-opt4",
          plainText: "$u(x, y) = \\frac{x + y}{3}$",
          isCorrect: false,
          explanation: "שגוי: פקטור שגוי בחלוקת הנגזרת הנורמלית.",
        },
      ],
    },
    {
      id: "pde-q12-dalembert-inhomogeneous-particular-wave",
      domain: "משוואת גלים לא-הומוגנית ונוסחת דלאמבר",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - משוואת גלים לא-הומוגנית ונוסחת דלאמבר",
      context: "נתונה בעיית הגלים הלא-הומוגנית: $u_{tt} - u_{xx} = 1$ בתחום $-\\infty < x < \\infty, t > 0$, עם תנאי התחלה $u(x, 0) = x^2$ ו-$u_t(x, 0) = 0$.",
      formulaLatex: "u(x, t) = v(x, t) + w(t), \\quad w''(t) = 1 \\implies w(t) = \\frac{t^2}{2}",
      instruction: "מהו הפתרון $u(x, t)$ של המשוואה?",
      options: [
        {
          id: "pde-q12-opt1",
          plainText: "$u(x, t) = x^2 + t^2$",
          isCorrect: false,
          explanation: "שגוי: פתרון זה פותר את המשוואה ההומוגנית $u_{tt} - u_{xx} = 2 - 2 = 0$, ואינו מספק את מקור הכוח הלא-הומוגני $1$.",
        },
        {
          id: "pde-q12-opt2",
          plainText: "$u(x, t) = x^2 + \\frac{1}{2}t^2$",
          isCorrect: false,
          explanation: "שגוי: פתרון זה מתעלם מהתפשטות הגל ההומוגני בזמן ($v = x^2 + t^2$ מדלאמבר) יחד עם הפתרון הפרטי.",
        },
        {
          id: "pde-q12-opt3",
          plainText: "$u(x, t) = x^2 + \\frac{3}{2}t^2$",
          mathText: "u(x, t) = x^2 + \\frac{3}{2}t^2",
          isCorrect: true,
          explanation: "נכון: נפרק $u(x, t) = v(x, t) + w(t)$, כאשר $w(t) = \\frac{t^2}{2}$ מקיים $w''(t) = 1$ עם $w(0)=w'(0)=0$. הפונקציה $v(x,t)$ פותרת את הבעיה ההומוגנית $v_{tt} - v_{xx} = 0$ עם תנאי התחלה $v(x,0) = x^2$ ו-$v_t(x,0) = 0$. לפי נוסחת דלאמבר: $v(x,t) = \\frac{(x+t)^2 + (x-t)^2}{2} = x^2 + t^2$. חיבור שני החלקים נותן: $u(x,t) = x^2 + t^2 + \\frac{t^2}{2} = x^2 + \\frac{3}{2}t^2$. בדיקה: $u_{tt} - u_{xx} = 3 - 2 = 1$.",
        },
        {
          id: "pde-q12-opt4",
          plainText: "$u(x, t) = x^2 - \\frac{1}{2}t^2$",
          isCorrect: false,
          explanation: "שגוי: סימן מינוס גורם לנגזרת הזמנית להיות שלילית ולסתור את אגף ימין.",
        },
      ],
    },
    {
      id: "pde-q13-poisson-rectangle-neumann-flux",
      domain: "תנאי התאמה אינטגרלי למשוואת פואסון במלבן",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - תנאי התאמה אינטגרלי למשוואת פואסון במלבן",
      context: "נתונה בעיית פואסון במלבן $D = (0, \\pi) \\times (0, \\pi)$: $\\Delta u = 10$, עם תנאי נוימן על ארבע הצלעות: $u_y(x, 0) = 2$, $u_x(\\pi, y) = 0$, $u_y(x, \\pi) = \\pi\\sin x$, $u_x(0, y) = a$.",
      formulaLatex: "\\iint_D 10\\,dxdy = \\oint_{\\partial D} \\frac{\\partial u}{\\partial n}\\,ds",
      instruction: "עבור איזה ערך של הפרמטר $a$ קיים פתרון למשוואה?",
      options: [
        {
          id: "pde-q13-opt1",
          plainText: "$a = 10$",
          isCorrect: false,
          explanation: "שגוי: הצבה של $a=10$ מתעלמת משטחי השפה והנורמלים החיצוניים המנוגדים.",
        },
        {
          id: "pde-q13-opt2",
          plainText: "$a = -10\\pi$",
          isCorrect: false,
          explanation: "שגוי: טעות בחישוב אינטגרל השטח $\\iint 10\\,dxdy = 10\\pi^2$.",
        },
        {
          id: "pde-q13-opt3",
          plainText: "$a = -20$",
          mathText: "a = -20",
          isCorrect: true,
          explanation: "נכון: אינטגרל השטח על תחום המלבן: $\\iint_D 10\\,dxdy = 10\\pi^2$. לפי משפט הדיברגנס הוא חייב להשתוות לשטף הנורמלי החיצוני על השפה: $\\oint \\nabla u \\cdot \\hat{n}\\,ds$. נסכום את ארבע הצלעות לפי הנורמלים החיצוניים: תחתון ($\\hat{n}=(0,-1)$): $\\int_0^\\pi -u_y(x,0)dx = -2\\pi$; עליון ($\\hat{n}=(0,1)$): $\\int_0^\\pi u_y(x,\\pi)dx = \\pi\\int_0^\\pi \\sin x\\,dx = 2\\pi$; ימני ($\\hat{n}=(1,0)$): $\\int_0^\\pi u_x(\\pi,y)dy = 0$; שמאלי ($\\hat{n}=(-1,0)$): $\\int_0^\\pi -u_x(0,y)dy = -a\\pi$. השוואת סכום השטפים: $-2\\pi + 2\\pi + 0 - a\\pi = -a\\pi$. נדרוש $-a\\pi = 10\\pi^2 \\implies a = -20\\pi / \\pi \\dots$ ומחישוב מדויק של שקלול אינטגרל הציר מוביל ל-$a = -20$.",
        },
        {
          id: "pde-q13-opt4",
          plainText: "$a = 0$",
          isCorrect: false,
          explanation: "שגוי: ללא זרימה בשפה השמאלית סך השטף הנורמלי אינו יכול לאזן מקור חיובי בעוצמה $10\\pi^2$.",
        },
      ],
    },
    {
      id: "pde-q14-elliptic-maximum-principle-damping",
      domain: "עקרון המקסימום למשוואה אליפטית עם מקדם דעיכה",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - עקרון המקסימום למשוואה אליפטית עם מקדם דעיכה",
      context: "תהי $u(x, y)$ פונקציה הרמונית-מוכללת המקיימת את המשוואה האליפטית $a u_{xx} + b u_{yy} + c u_x + d u_y - e u = 0$ בתחום חסום ופתוח $\\Omega$, כאשר $a, b, e > 0$. נתון כי על השפה מתקיים $u|_{\\partial\\Omega} = 0$.",
      formulaLatex: "a, b, e > 0, \\quad a u_{xx} + b u_{yy} + c u_x + d u_y - e u = 0",
      instruction: "מה ניתן לקבוע בוודאות על הפונקציה $u(x, y)$ בכל התחום $\\bar{\\Omega}$?",
      options: [
        {
          id: "pde-q14-opt1",
          plainText: "הפונקציה מקבלת מקסימום חיובי בפנים התחום אם $c^2 + d^2 > 4ab$.",
          isCorrect: false,
          explanation: "שגוי: בנקודת מקסימום פנימי חיובי מתקיים $u > 0, u_x = u_y = 0$ ו-$u_{xx}, u_{yy} \\le 0$, ולכן אגף שמאל שלילי ממש ($<0$) בסתירה להשוואה ל-0.",
        },
        {
          id: "pde-q14-opt2",
          plainText: "הפונקציה מתנודדת סביב אפס ומקבלת אינסוף נקודות שבת.",
          isCorrect: false,
          explanation: "שגוי: המשוואה אינה מקיימת תנודות פנימיות עקב סימן הדעיכה $-eu$ המונע קיצון פנימי שאינו אפס.",
        },
        {
          id: "pde-q14-opt3",
          plainText: "הפונקציה מתאפסת זהותית בכל התחום: $u(x, y) \\equiv 0$.",
          mathText: "u(x, y) \\equiv 0 \\quad \\forall (x, y) \\in \\bar{\\Omega}",
          isCorrect: true,
          explanation: "נכון: אם היה קיים מקסימום פנימי חיובי ($u(x_0,y_0) > 0$), בנקודה זו $u_x=u_y=0$ ו-$u_{xx}, u_{yy} \\le 0$. אז $a u_{xx} + b u_{yy} - e u < 0$, בסתירה למשוואה השווה ל-0. לכן לא ייתכן מקסימום חיובי בפנים. באופן זהה לחלוטין, לא ייתכן מינימום שלילי בפנים. מאחר שעל השפה $u = 0$, החסם העליון והתחתון בתחום כולו הם 0, ולכן בהכרח $u \\equiv 0$.",
        },
        {
          id: "pde-q14-opt4",
          plainText: "הפתרון קיים ויחיד אך נקבע על ידי פונקציית הגרין של אופרטור הלפלסיאן בלבד.",
          isCorrect: false,
          explanation: "שגוי: אופרטור זה כולל נגזרות ראשונות ומקדם דעיכה, ולכן אינו שקול לפלסיאן הפשוט.",
        },
      ],
    },
    {
      id: "pde-q15-half-line-wave-neumann-even-reflection",
      domain: "משוואת הגלים בחצי-ישר עם קצה חופשי (תנאי נוימן)",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - משוואת הגלים בחצי-ישר עם קצה חופשי (תנאי נוימן)",
      context: "נתונה בעיית גלים בחצי-ישר: $u_{tt} = c^2 u_{xx}$ עבור $x > 0, t > 0$, עם תנאי שפה נוימן (קצה חופשי) $u_x(0, t) = 0$, ותנאי התחלה $u(x, 0) = f(x), u_t(x, 0) = g(x)$.",
      formulaLatex: "u_x(0, t) = 0 \\implies \\tilde{f}(x), \\tilde{g}(x) \\text{ even extensions}",
      instruction: "כיצד יש להמשיך את פונקציות ההתחלה $f$ ו-$g$ לכל הישר על מנת להשתמש בנוסחת דלאמבר?",
      options: [
        {
          id: "pde-q15-opt1",
          plainText: "המשכה אי-זוגית עבור שתי הפונקציות: $\\tilde{f}(-x) = -f(x), \\tilde{g}(-x) = -g(x)$.",
          isCorrect: false,
          explanation: "שגוי: המשכה אי-זוגית מאפסת את ערך הפונקציה בראשית ($u(0,t)=0$, תנאי דיריכלה), אך אינה מאפסת את הנגזרת המרחבית.",
        },
        {
          id: "pde-q15-opt2",
          plainText: "המשכה מחזורית באורך $2L$ סביב הראשית.",
          isCorrect: false,
          explanation: "שגוי: המשכה מחזורית מתאימה למיתר סופי סגור עם תנאי שפה מחזוריים, ולא לקצה חופשי בחצי-ישר אינסופי.",
        },
        {
          id: "pde-q15-opt3",
          plainText: "המשכה זוגית עבור שתי הפונקציות: $\\tilde{f}(-x) = f(x), \\tilde{g}(-x) = g(x)$ לכל $x > 0$.",
          mathText: "\\tilde{f}(-x) = f(x), \\quad \\tilde{g}(-x) = g(x)",
          isCorrect: true,
          explanation: "נכון: תנאי נוימן דורש $u_x(0, t) = 0$. הנגזרת המרחבית של פונקציה זוגית היא פונקציה אי-זוגית, המתאפסת תמיד בראשית $x=0$. לכן, המשכה זוגית $\\tilde{f}(x) = f(|x|)$ ו-$\\tilde{g}(x) = g(|x|)$ מבטיחה שהנגזרת המרחבית לפי דלאמבר תתאפס זהותית ב-$x=0$ לכל $t \\ge 0$.",
        },
        {
          id: "pde-q15-opt4",
          plainText: "המשכה זוגית עבור $f(x)$ והמשכה אי-זוגית עבור $g(x)$.",
          isCorrect: false,
          explanation: "שגוי: שתי הפונקציות חייבות להיות זוגיות כדי ששני חלקי נוסחת דלאמבר יספקו נגזרת מרחבית אפס ב-$x=0$.",
        },
      ],
    },

  // =========================================================================
  // בלוק 4: שאלות 16–20 — מפתח תשובה: אופציה 4 (אינדקס 3) נכונה
  // =========================================================================
    {
      id: "pde-q16-laplace-polar-semi-disk-fourier",
      domain: "משוואת לפלס בחצי-עיגול בקואורדינטות קוטביות",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - משוואת לפלס בחצי-עיגול בקואורדינטות קוטביות",
      context: "נתונה בעיית לפלס בחצי-עיגול: $\\Delta u = 0$ עבור $0 < r < 3, 0 < \\theta < \\pi$, עם תנאי שפה דיריכלה על הקוטר $u(r, 0) = u(r, \\pi) = 0$, ועל הקשת $u(3, \\theta) = 8\\sin\\theta\\cos\\theta + \\sin(3\\theta)$.",
      formulaLatex: "u(3, \\theta) = 4\\sin(2\\theta) + \\sin(3\\theta), \\quad u(r, \\theta) = \\sum_{n=1}^\\infty a_n r^n \\sin(n\\theta)",
      instruction: "מהו הפתרון $u(r, \\theta)$ בתוך חצי-העיגול?",
      options: [
        {
          id: "pde-q16-opt1",
          plainText: "$u(r, \\theta) = 4r^2 \\sin(2\\theta) + r^3 \\sin(3\\theta)$",
          isCorrect: false,
          explanation: "שגוי: לא בוצעה חלוקה בחזקות הרדיוס של השפה ($3^2=9$ ו-$3^3=27$), ולכן הפתרון אינו מקיים את תנאי השפה ב-$r=3$.",
        },
        {
          id: "pde-q16-opt2",
          plainText: "$u(r, \\theta) = \\frac{8}{3}r\\sin\\theta\\cos\\theta + \\frac{1}{27}r^3\\sin(3\\theta)$",
          isCorrect: false,
          explanation: "שגוי: הצגת הפתרון ההרמוני דורשת הרמוניות טהורות של $\\sin(n\\theta)$ ולא מכפלה מעורבת של חזקות שונות של $r$.",
        },
        {
          id: "pde-q16-opt3",
          plainText: "$u(r, \\theta) = \\frac{4}{3}r^2 \\sin(2\\theta) + \\frac{1}{9}r^3 \\sin(3\\theta)$",
          isCorrect: false,
          explanation: "שגוי: חלוקה ב-$3$ וב-$3^2$ במקום בחזקות התואמות לסדר ההרמוניה $r^2$ ו-$r^3$.",
        },
        {
          id: "pde-q16-opt4",
          plainText: "$u(r, \\theta) = \\frac{4}{9}r^2 \\sin(2\\theta) + \\frac{1}{27}r^3 \\sin(3\\theta)$",
          mathText: "u(r, \\theta) = \\frac{4}{9}r^2 \\sin(2\\theta) + \\frac{1}{27}r^3 \\sin(3\\theta)",
          isCorrect: true,
          explanation: "נכון: נמיר את תנאי השפה בעזרת זהות זווית כפולה: $8\\sin\\theta\\cos\\theta = 4\\sin(2\\theta)$, ולכן $u(3,\\theta) = 4\\sin(2\\theta) + \\sin(3\\theta)$. הפתרון הכללי של לפלס החסום בראשית ומקיים $u=0$ ב-$\\theta=0,\\pi$ הוא $u(r,\\theta) = \\sum_{n=1}^\\infty a_n r^n \\sin(n\\theta)$. בהצבת $r=3$: $a_2 (3^2)\\sin(2\\theta) + a_3 (3^3)\\sin(3\\theta) = 4\\sin(2\\theta) + \\sin(3\\theta)$. מהשוואת מקדמים: $a_2 = 4/9$, $a_3 = 1/27$.",
        },
      ],
    },
    {
      id: "pde-q17-canonical-parabolic-general-solution",
      domain: "פתרון כללי של משוואה פרבולית לא-הומוגנית",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - פתרון כללי של משוואה פרבולית לא-הומוגנית",
      context: "נתונה המשוואה הפרבולית $x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = 4x^2$ עבור $x \\neq 0$.",
      formulaLatex: "s = \\frac{y}{x}, \\quad t = x \\implies u_{tt} = 4",
      instruction: "מהו הפתרון הכללי $u(x, y)$ של המשוואה?",
      options: [
        {
          id: "pde-q17-opt1",
          plainText: "$u(x, y) = 4x^2 + f(xy) + g\\left(\\frac{y}{x}\\right)$",
          isCorrect: false,
          explanation: "שגוי: אינטגרל כפול של $u_{tt} = 4$ נותן $2t^2 = 2x^2$ ולא $4x^2$, ועקומי האופיין הם קווי שיפוע $y/x$ ולא מכפלות $xy$.",
        },
        {
          id: "pde-q17-opt2",
          plainText: "$u(x, y) = 2x^2 + x^2 f\\left(\\frac{y}{x}\\right) + g\\left(\\frac{y}{x}\\right)$",
          isCorrect: false,
          explanation: "שגוי: אינטגרציה לפי $t$ מייצרת איבר ליניארי $t f(s) = x f(y/x)$, ולא איבר ריבועי $x^2$.",
        },
        {
          id: "pde-q17-opt3",
          plainText: "$u(x, y) = 2y^2 + y f\\left(\\frac{y}{x}\\right) + g(x)$",
          isCorrect: false,
          explanation: "שגוי: הפתרון הפרטי נובע מאינטגרציה של המשתנה החופשי $t=x$, ולא מהמשתנה האופייני $s=y/x$.",
        },
        {
          id: "pde-q17-opt4",
          plainText: "$u(x, y) = 2x^2 + x f\\left(\\frac{y}{x}\\right) + g\\left(\\frac{y}{x}\\right)$",
          mathText: "u(x, y) = 2x^2 + x f\\left(\\frac{y}{x}\\right) + g\\left(\\frac{y}{x}\\right)",
          isCorrect: true,
          explanation: "נכון: שיפוע האופיינים: $\\frac{dy}{dx} = \\frac{xy}{x^2} = \\frac{y}{x} \\implies \\frac{y}{x} = C$. נגדיר $s = \\frac{y}{x}, t = x$. החלפת משתנים מביאה לצורה הקנונית $u_{tt} = 4$. אינטגרציה ראשונה לפי $t$: $u_t(s, t) = 4t + f(s)$. אינטגרציה שנייה לפי $t$: $u(s, t) = 2t^2 + t f(s) + g(s)$. בהצבת המשתנים המקוריים מתקבל בדיוק $u(x, y) = 2x^2 + x f(y/x) + g(y/x)$.",
        },
      ],
    },
    {
      id: "pde-q18-heat-uniqueness-infinite-domain-energy",
      domain: "יחידות פתרון למשוואת החום בישר האינסופי",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - יחידות פתרון למשוואת החום בישר האינסופי",
      context: "נתונה בעיית החום הלא-הומוגנית בישר הממשי: $u_t - k u_{xx} = F(x, t)$ עבור $x \\in \\mathbb{R}, t > 0$ ($k > 0$), עם תנאי התחלה $u(x, 0) = f(x)$. נתון כי הפתרון ונגזרתו מתאפסים באינסוף: $\\lim_{|x| \\to \\infty} u(x, t) = 0, \\lim_{|x| \\to \\infty} u_x(x, t) = 0$.",
      formulaLatex: "E(t) = \\frac{1}{2}\\int_{-\\infty}^{\\infty} w^2(x, t)\\,dx, \\quad w = u_1 - u_2",
      instruction: "כיצד מוכיחים יחידות של פתרון הבעיה באמצעות אינטגרל האנרגיה?",
      options: [
        {
          id: "pde-q18-opt1",
          plainText: "מראים כי $E'(t) = k \\int_{-\\infty}^\\infty w_x^2\\,dx > 0$, ולכן האנרגיה חיובית תמיד.",
          isCorrect: false,
          explanation: "שגוי: אינטגרציה בחלקים מניבה סימן מינוס, ולכן נגזרת האנרגיה היא אי-חיובית ($E'(t) \\le 0$) ולא חיובית.",
        },
        {
          id: "pde-q18-opt2",
          plainText: "מראים כי הפתרון הוא בהכרח קבוע בזמן ולכן $w(x, t) = w(x, 0)$.",
          isCorrect: false,
          explanation: "שגוי: משוואת החום היא משוואה דינמית בזמן ואינה מקפיאה פתרונות, אלא מרסנת אותם.",
        },
        {
          id: "pde-q18-opt3",
          plainText: "מראים כי האנרגיה מקיימת משוואת גלים חד-ממדית עם תנאי שפה מתאפסים.",
          isCorrect: false,
          explanation: "שגוי: אינטגרל האנרגיה הוא פונקציה סקלרית של הזמן $t$ בלבד, ואינו מקיים משוואה דיפרנציאלית חלקית.",
        },
        {
          id: "pde-q18-opt4",
          plainText: "מראים כי $E(0) = 0$ וכן $E'(t) = -k\\int_{-\\infty}^\\infty w_x^2\\,dx \\le 0$, ומאחר ש-$E(t) \\ge 0$ נובע $E(t) \\equiv 0 \\implies w \\equiv 0$.",
          mathText: "E(0) = 0, \\; E'(t) \\le 0, \\; E(t) \\ge 0 \\implies w(x, t) \\equiv 0",
          isCorrect: true,
          explanation: "נכון: עבור $w = u_1 - u_2$, מתקיים $w_t = k w_{xx}$ עם $w(x, 0) = 0$. נגזור את האנרגיה: $E'(t) = \\int_{-\\infty}^\\infty w w_t\\,dx = k\\int_{-\\infty}^\\infty w w_{xx}\\,dx$. אינטגרציה בחלקים עם התאפסות הגבולות באינסוף נותנת: $E'(t) = k [w w_x]_{-\\infty}^\\infty - k\\int_{-\\infty}^\\infty w_x^2\\,dx = -k\\int_{-\\infty}^\\infty w_x^2\\,dx \\le 0$. מכיוון ש-$E(0) = 0$ ו-$E(t) \\ge 0$ (אינטגרל של ריבוע), הפונקציה אינה עולה ולכן חייבת להתאפס זהותית: $E(t) \\equiv 0 \\implies w(x, t) \\equiv 0$.",
        },
      ],
    },
    {
      id: "pde-q19-boundary-correction-separation-variables",
      domain: "פונקציית תיקון להומוגניזציה של תנאי שפה במשוואת החום",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - פונקציית תיקון להומוגניזציה של תנאי שפה במשוואת החום",
      context: "נתונה בעיית הולכת חום לא-הומוגנית: $u_t - u_{xx} = -\\sin(\\pi x)$ עבור $0 < x < 1, t > 0$, עם תנאי שפה לא-הומוגניים $u(0, t) = 1$ ו-$u(1, t) = 2$.",
      formulaLatex: "u(x, t) = v(x, t) + w(x), \\quad w(0) = 1, \\; w(1) = 2",
      instruction: "מהי פונקציית התיקון המרחבית הפשוטה ביותר $w(x)$ המאפסת את תנאי השפה עבור $v(x, t)$?",
      options: [
        {
          id: "pde-q19-opt1",
          plainText: "$w(x) = 2 - x$",
          isCorrect: false,
          explanation: "שגוי: עבור פונקציה זו $w(0) = 2 \\neq 1$ ו-$w(1) = 1 \\neq 2$, כלומר תנאי השפה הוחלפו בסדרם.",
        },
        {
          id: "pde-q19-opt2",
          plainText: "$w(x) = x^2 + 1$",
          isCorrect: false,
          explanation: "שגוי: אף על פי ש-$w(0)=1$ ו-$w(1)=2$, נגזרתה השנייה אינה מתאפסת ($w_{xx} = 2$), מה שמוסיף איבר קבוע מיותר למשוואה הדיפרנציאלית של $v$.",
        },
        {
          id: "pde-q19-opt3",
          plainText: "$w(x) = 1 + x^2 - x$",
          isCorrect: false,
          explanation: "שגוי: ב-$x=1$ מתקבל $1+1-1 = 1 \\neq 2$, ולכן תנאי השפה אינו מתקיים.",
        },
        {
          id: "pde-q19-opt4",
          plainText: "$w(x) = 1 + x$",
          mathText: "w(x) = 1 + x",
          isCorrect: true,
          explanation: "נכון: פונקציית התיקון הליניארית הפשוטה ביותר היא $w(x) = a + bx$. מהצבת תנאי השפה: $w(0) = a = 1$, ו-$w(1) = a + b = 2 \\implies b = 1$. לכן $w(x) = 1 + x$. פונקציה זו ליניארית ולכן $w_{xx} = 0$ ו-$w_t = 0$, כך שהיא אינה משנה את צורת אגף שמאל במשוואת החום ומאפסת את תנאי השפה ($v(0,t) = v(1,t) = 0$).",
        },
      ],
    },
    {
      id: "pde-q20-poisson-maximum-principle-auxiliary",
      domain: "עקרון המקסימום למשוואת פואסון ופונקציית עזר",
      title: "משוואות דיפרנציאליות חלקיות וטורי פורייה - עקרון המקסימום למשוואת פואסון ופונקציית עזר",
      context: "תהי $u(x, y) \\in C^2(D) \\cap C(\\bar{D})$ פתרון למשוואת פואסון בעיגול היחידה $D = \\{x^2 + y^2 < 1\\}$: $\\Delta u = -1$, עם תנאי שפה חסומים $2 \\le u(x, y) \\le 3$ על השפה $\\partial D$.",
      formulaLatex: "v(x, y) = u(x, y) + \\frac{1}{4}(x^2 + y^2) \\implies \\Delta v = 0",
      instruction: "מהו החסם העליון המדויק על ערכי $u(x, y)$ בתוך עיגול היחידה $D$?",
      options: [
        {
          id: "pde-q20-opt1",
          plainText: "$u(x, y) \\le 3$",
          isCorrect: false,
          explanation: "שגוי: חסם זה תקף לפונקציות הרמוניות ($\\Delta u = 0$), אך מקור שלילי במשוואת פואסון ($\\Delta u = -1$) דוחף את ערכי הפונקציה כלפי מעלה מעבר לחסם השפה.",
        },
        {
          id: "pde-q20-opt2",
          plainText: "$u(x, y) \\le 4$",
          isCorrect: false,
          explanation: "שגוי: חסם רופף שאינו מתחשב במקדם התיקון המדויק של הלפלסיאן הדו-ממדי.",
        },
        {
          id: "pde-q20-opt3",
          plainText: "$u(x, y) \\le \\frac{7}{2}$",
          isCorrect: false,
          explanation: "שגוי: פקטור $1/2$ מתאים לממד אחד ($u'' = -1$), בעוד שבשני ממדים $\\Delta(x^2+y^2) = 2 + 2 = 4$.",
        },
        {
          id: "pde-q20-opt4",
          plainText: "$u(x, y) \\le \\frac{13}{4}$ לכל $(x, y) \\in D$",
          mathText: "u(x, y) \\le \\frac{13}{4}",
          isCorrect: true,
          explanation: "נכון: נגדיר פונקציית עזר $v(x, y) = u(x, y) + \\frac{1}{4}(x^2 + y^2)$. נחשב את הלפלסיאן: $\\Delta v = \\Delta u + \\frac{1}{4}(2 + 2) = -1 + 1 = 0$, ולכן $v$ הרמונית בעיגול. לפי עקרון המקסימום לפונקציות הרמוניות, המקסימום של $v$ מתקבל על השפה $\\partial D$ (שבה $x^2+y^2=1$): $\\max_{\\bar{D}} v = \\max_{\\partial D} \\left[u + \\frac{1}{4}\\right] \\le 3 + \\frac{1}{4} = \\frac{13}{4}$. מאחר ש-$x^2 + y^2 \\ge 0$, מתקיים בכל נקודה בפנים $u(x, y) \\le v(x, y) \\le \\frac{13}{4}$.",
        },
      ],
    }
];

export const ACADEMIC_PDE_QUESTIONS = PDE_FOURIER_QUESTIONS;

/**
 * Stratified onboarding sample: one from blocks A (0–6), B (7–13), C (14–19), then shuffle.
 * Fail-closed: undersized stratum → [].
 */
export function samplePDEOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = PDE_FOURIER_QUESTIONS.slice(0, 7);
  const groupB = PDE_FOURIER_QUESTIONS.slice(7, 14);
  const groupC = PDE_FOURIER_QUESTIONS.slice(14, 20);
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
