import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic תנודות ורעידות diagnostic bank (12Q).
 * Display name: "תנודות ורעידות" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const MECHANICAL_VIBRATIONS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "vib-q01-sdof-free-vibration-equation-motion",
    domain: "תנודה חופשית SDOF",
    title: "תנודות ורעידות - מערכת בעלת דרגת חופש אחת: תנודה חופשית",
    context:
      "מסה $m$ מחוברת לקפיץ ליניארי $k$ ולמעכב צמיגי $c$. ההעתקה מנקודת שיווי המשקל הסטטי היא $x(t)$. אין כוח חיצוני ($F(t) = 0$).",
    formulaLatex:
      "m\\ddot{x} + c\\dot{x} + kx = 0, \\quad \\omega_n = \\sqrt{\\frac{k}{m}}, \\quad \\zeta = \\frac{c}{2\\sqrt{km}}",
    instruction:
      "מהי משוואת התנועה של מערכת SDOF ליניארית בתנודה חופשית, וכיצד מוגדרים התדר הטבעי $\\omega_n$ ויחס הריסון $\\zeta$?",
    options: [
      {
        id: "vib-q01-opt1",
        plainText:
          "משוואת ניוטון נותנת $m\\ddot{x} + c\\dot{x} + kx = 0$. התדר הטבעי הלא-מרוסן הוא $\\omega_n = \\sqrt{k/m}$, ויחס הריסון הוא $\\zeta = c/(2\\sqrt{km}) = c/(2m\\omega_n)$. הצורה הסטנדרטית: $\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$.",
        mathText:
          "m\\ddot{x}+c\\dot{x}+kx=0,\\quad \\omega_n=\\sqrt{k/m},\\quad \\zeta=c/(2m\\omega_n)",
        isCorrect: true,
        explanation:
          "נכון: על המסה פועלים כוח הקפיץ $-kx$ וכוח הריסון הצמיגי $-c\\dot{x}$ (הכוחות מנוגדים להעתקה ולמהירות בהתאמה). חוק שני של ניוטון: $m\\ddot{x} = -c\\dot{x} - kx$, ולכן $m\\ddot{x} + c\\dot{x} + kx = 0$. חלוקה ב-$m$ והגדרות $\\omega_n^2 = k/m$ ו-$2\\zeta\\omega_n = c/m$ מובילות לצורה הקנונית $\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$. $\\omega_n$ הוא תדר הזוויתי (rad/s) של התנודה אילו לא היה ריסון; $\\zeta$ מנרמל את הריסון ביחס לריסון הקריטי $c_c = 2\\sqrt{km} = 2m\\omega_n$, ולכן הוא חסר ממדים.",
      },
      {
        id: "vib-q01-opt2",
        plainText: "משוואת התנועה היא $m\\ddot{x} - kx = 0$ כי הריסון תמיד מזין אנרגיה למערכת.",
        isCorrect: false,
        explanation:
          "שגוי: ריסון צמיגי ליניארי מפזר אנרגיה מכנית לחום ($P = c\\dot{x}^2 \\ge 0$), ולכן מופיע עם סימן חיובי באגף שמאל ($+c\\dot{x}$). כוח הקפיץ הוא $-kx$, כלומר $+kx$ במשוואה הסטנדרטית — לא $-kx$ באגף שמאל בלבד ללא ריסון. משוואה מהצורה $m\\ddot{x} - kx = 0$ מתארת אי-יציבות (שורשים ממשיים חיוביים), לא תנודה חופשית יציבה.",
      },
      {
        id: "vib-q01-opt3",
        plainText: "$\\omega_n = k/m$ (ללא שורש), ו-$\\zeta$ חסר ממדים רק אם $c$ נמדד בהרץ.",
        isCorrect: false,
        explanation:
          "שגוי: יחידות של $k/m$ הן $1/\\mathrm{s}^2$, ולכן התדר הזוויתי הוא $\\omega_n = \\sqrt{k/m}$ (rad/s). יחס הריסון $\\zeta = c/(2\\sqrt{km})$ חסר ממדים זהותית לכל בחירת יחידות עקבית של $c,k,m$ — אין צורך למדוד את $c$ בהרץ.",
      },
      {
        id: "vib-q01-opt4",
        plainText: "בתנודה חופשית חייבים להוסיף כוח הרמוני $F_0\\cos\\omega t$ באגף ימין של המשוואה.",
        isCorrect: false,
        explanation:
          "שגוי: תנודה חופשית מוגדרת כתגובה לתנאי התחלה בלבד ($x(0),\\dot{x}(0)$) ללא כוח חיצוני — אגף ימין הוא אפס. כוח הרמוני $F_0\\cos\\omega t$ שייך לתגובה מאולצת (Forced Response) ולניתוח רזוננס במצב מתמיד.",
      },
    ],
  },
  {
    id: "vib-q02-natural-frequency-energy-stiffness",
    domain: "תדר טבעי",
    title: "תנודות ורעידות - תדר טבעי: אנרגיה, קשיחות ושיטת ריילי",
    context:
      "למערכת לא-מרוסנת SDOF עם קשיחות אפקטיבית $k_{\\text{eq}}$ ומסה אפקטיבית $m_{\\text{eq}}$ (למשל מסה על קורה או מערכת מופחתת), התדר הטבעי נקבע מיחס האנרגיה המקסימלית האלסטית לקינטית.",
    formulaLatex:
      "\\omega_n = \\sqrt{\\frac{k_{\\text{eq}}}{m_{\\text{eq}}}}, \\quad \\omega_n^2 = \\frac{\\max U}{\\max T^*}",
    instruction:
      "כיצד מחושב $\\omega_n$ למערכת מרוכזת, ומה העיקרון מאחורי קירוב ריילי למערכת רציפה?",
    options: [
      {
        id: "vib-q02-opt1",
        plainText:
          "למערכת מרוכזת $\\omega_n = \\sqrt{k_{\\text{eq}}/m_{\\text{eq}}}$. בשיטת ריילי מניחים צורת מוד $\\psi(x)$, משווים $\\max U = \\max T$, ומקבלים $\\omega^2 = \\bigl(\\int EI(\\psi'')^2 dx\\bigr)/\\bigl(\\int \\mu\\psi^2 dx\\bigr)$ — חסם עליון לתדר האמיתי של המוד הראשון.",
        mathText:
          "\\omega_n=\\sqrt{k_{eq}/m_{eq}},\\quad \\omega_R^2=\\frac{\\int EI(\\psi'')^2\\,dx}{\\int\\mu\\psi^2\\,dx}",
        isCorrect: true,
        explanation:
          "נכון: בתנודה הרמונית $x = A\\cos(\\omega_n t+\\phi)$ האנרגיה האלסטית המקסימלית $\\frac{1}{2}k A^2$ שווה לאנרגיה הקינטית המקסימלית $\\frac{1}{2}m(\\omega_n A)^2$, ולכן $\\omega_n = \\sqrt{k/m}$. בשיטת ריילי למערכת רציפה בוחרים צורה משוערת $\\psi(x)$ המקיימת לפחות את תנאי השפה הגיאומטריים, מחשבים $U_{\\max}$ ו-$T_{\\max}$, ומציבים שוויון אנרגטי. התוצאה היא מנת ריילי (Rayleigh quotient) — חסם עליון ל-$\\omega_1$; ככל שהצורה קרובה למוד האמיתי, השגיאה בתדר היא מסדר שני בשגיאת הצורה (רגישות נמוכה).",
      },
      {
        id: "vib-q02-opt2",
        plainText: "$\\omega_n$ תלוי רק במסה ואינו מושפע מקשיחות המבנה.",
        isCorrect: false,
        explanation:
          "שגוי: $\\omega_n = \\sqrt{k_{\\text{eq}}/m_{\\text{eq}}}$ עולה עם $\\sqrt{k}$ ויורד עם $\\sqrt{m}$. הגדלת קשיחות (חיזוק מבני, הקטנת אורך קורה אפקטיבי) מעלה את התדר הטבעי; הוספת מסה מורידה אותו. שני הפרמטרים חיוניים לתכן למניעת רזוננס.",
      },
      {
        id: "vib-q02-opt3",
        plainText: "שיטת ריילי נותנת תמיד חסם תחתון מדויק ל-$\\omega_n$ ללא תלות בצורת המוד שנבחרה.",
        isCorrect: false,
        explanation:
          "שגוי: מנת ריילי נותנת חסם עליון לתדר העצמי הנמוך ביותר עבור כל צורה קבילה במרחב הפונקציות האדיסיביליות. חסם תחתון דורש שיטות אחרות (למשל Southwell, או נוסחאות מבוססות-קומפלימנטיות). הצורה משפיעה על דיוק החסם — צורה גרועה נותנת חסם עליון גבוה מדי.",
      },
      {
        id: "vib-q02-opt4",
        plainText: "הגדלת הקשיחות $k$ מקטינה את $\\omega_n$ ומקרבת את המערכת לרזוננס סטטי.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת $k$ מעלה את $\\omega_n$. רזוננס נקבע לפי יחס התדרים $r = \\omega/\\omega_n$ בין תדר העירור לבין התדר הטבעי — לא לפי ערך $k$ לבדו. \"רזוננס סטטי\" אינו מושג סטנדרטי; ב-$r\\to 0$ מתקבלת תגובה סטטית $X\\approx F_0/k$ ללא הגברה דינמית.",
      },
    ],
  },
  {
    id: "vib-q03-damping-ratio-critical-logarithmic-decrement",
    domain: "יחס ריסון",
    title: "תנודות ורעידות - יחס ריסון $\\zeta$ ודקרמנט לוגריתמי",
    context:
      "במערכת SDOF מרוסנת תת-קריטית ($\\zeta < 1$) התנודה החופשית דועכת. היחס בין שתי משרעות עוקבות מאפשר אמידה ניסויית של הריסון באמצעות הדקרמנט הלוגריתמי $\\delta$.",
    formulaLatex:
      "\\delta = \\ln\\frac{x(t)}{x(t+T_d)} = \\frac{2\\pi\\zeta}{\\sqrt{1-\\zeta^2}}, \\quad T_d = \\frac{2\\pi}{\\omega_d}",
    instruction:
      "כיצד קשור הדקרמנט הלוגריתמי ליחס הריסון, ומהו התדר המרוסן $\\omega_d$?",
    options: [
      {
        id: "vib-q03-opt1",
        plainText:
          "$\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$ ו-$\\delta = 2\\pi\\zeta/\\sqrt{1-\\zeta^2}$. לריסון קל ($\\zeta \\ll 1$): $\\zeta \\approx \\delta/(2\\pi)$. כך מודדים $\\zeta$ מניסוי תנודה חופשית ללא צורך לדעת את $c$ במפורש.",
        mathText:
          "\\omega_d=\\omega_n\\sqrt{1-\\zeta^2},\\quad \\zeta\\approx\\delta/(2\\pi)\\;(\\zeta\\ll 1)",
        isCorrect: true,
        explanation:
          "נכון: הפתרון התת-קריטי הוא $x(t) = e^{-\\zeta\\omega_n t}(A\\cos\\omega_d t + B\\sin\\omega_d t)$ עם $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$. היחס בין שיאים בהפרש מחזור $T_d = 2\\pi/\\omega_d$ הוא $e^{\\zeta\\omega_n T_d}$, ולכן $\\delta = \\ln(x_n/x_{n+1}) = \\zeta\\omega_n T_d = 2\\pi\\zeta/\\sqrt{1-\\zeta^2}$. עבור $\\zeta$ קטן (אופייני למבנים ומכונות, לרוב $\\zeta < 0.05$) מתקיים $\\sqrt{1-\\zeta^2}\\approx 1$ ו-$\\zeta\\approx\\delta/(2\\pi)$. זו שיטת המדידה הסטנדרטית במעבדת תנודות — מודדים יחס משרעות עוקבות ומפיקים $\\zeta$ ישירות.",
      },
      {
        id: "vib-q03-opt2",
        plainText: "$\\omega_d = \\omega_n\\sqrt{1+\\zeta^2}$ תמיד גדול מ-$\\omega_n$, כי ריסון \"מקשיח\" את המערכת.",
        isCorrect: false,
        explanation:
          "שגוי: ריסון צמיגי מוריד את תדר התנודה החופשית: $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2} < \\omega_n$ לכל $0 < \\zeta < 1$. הסימן הוא מינוס תחת השורש, לא פלוס. ריסון אינו מגדיל קשיחות אלסטית; הוא מוסיף כוח פרופורציונלי למהירות.",
      },
      {
        id: "vib-q03-opt3",
        plainText: "הדקרמנט הלוגריתמי מוגדר רק למערכת מרוסנת-יתר ($\\zeta > 1$) שבה אין תנודות.",
        isCorrect: false,
        explanation:
          "שגוי: דקרמנט לוגריתמי מוגדר כיחס בין משרעות עוקבות בתנודה מתנדנדת — כלומר במשטר תת-קריטי $\\zeta < 1$. במרוסן-יתר אין אוסצילציה ואין מחזור $T_d$, ולכן $\\delta$ אינו מוגדר באותה צורה.",
      },
      {
        id: "vib-q03-opt4",
        plainText: "$\\zeta = 1$ משמעו היעדר מוחלט של ריסון והתמדדות אינסופית ללא דעיכה.",
        isCorrect: false,
        explanation:
          "שגוי: $\\zeta = 0$ הוא היעדר ריסון (תנודה הרמונית מתמדת במערכת אידיאלית). $\\zeta = 1$ הוא ריסון קריטי — החזרה המהירה ביותר לשיווי משקל ללא אוסצילציה, עם פתרון $(A+Bt)e^{-\\omega_n t}$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "vib-q04-under-critical-overdamped-regimes",
    domain: "משטרי ריסון",
    title: "תנודות ורעידות - משטרים תת-קריטי, קריטי ומרוסן-יתר",
    context:
      "המשוואה האופיינית של SDOF היא $s^2 + 2\\zeta\\omega_n s + \\omega_n^2 = 0$. השורשים $s = -\\zeta\\omega_n \\pm \\omega_n\\sqrt{\\zeta^2 - 1}$ קובעים את אופי התגובה החופשית.",
    formulaLatex:
      "s = -\\zeta\\omega_n \\pm \\omega_n\\sqrt{\\zeta^2-1}, \\quad \\zeta < 1,\\;=1,\\;>1",
    instruction:
      "מה ההבדל בין שלושת משטרי הריסון מבחינת צורת הפתרון $x(t)$?",
    options: [
      {
        id: "vib-q04-opt1",
        plainText: "במשטר מרוסן-יתר ($\\zeta > 1$) המערכת מתנדנדת בתדר $\\omega_n$ ללא דעיכה.",
        isCorrect: false,
        explanation:
          "שגוי: במרוסן-יתר הדיסקרמיננטה חיובית והשורשים ממשיים שליליים שונים — הפתרון הוא סכום של שני אקספוננטים דועכים ללא אוסצילציה. תנודה ללא דעיכה שייכת ל-$\\zeta = 0$, לא ל-$\\zeta > 1$.",
      },
      {
        id: "vib-q04-opt2",
        plainText:
          "תת-קריטי ($\\zeta < 1$): תנודה דועכת בתדר $\\omega_d$. קריטי ($\\zeta = 1$): $x(t) = (A+Bt)e^{-\\omega_n t}$ — חזרה מהירה ביותר ללא אוסצילציה. מרוסן-יתר ($\\zeta > 1$): שני אקספוננטים ממשיים, חזרה איטית יותר מהקריטי.",
        mathText:
          "\\zeta<1:\\;e^{-\\zeta\\omega_n t}\\sin(\\omega_d t+\\phi);\\quad \\zeta=1:\\;(A+Bt)e^{-\\omega_n t}",
        isCorrect: true,
        explanation:
          "נכון: הדיסקרמיננטה $D = \\zeta^2-1$ קובעת: (1) $\\zeta < 1$ — שורשים מרוכבים צמודים, תנודה הרמונית עם מעטפת $e^{-\\zeta\\omega_n t}$ ותדר $\\omega_d$. (2) $\\zeta = 1$ — שורש כפול $-\\omega_n$; הפתרון כולל גורם $t e^{-\\omega_n t}$. זה הריסון המינימלי שמונע אוסצילציה, ולכן זמן ההגעה לשיווי משקל (ללא חריגה) הוא הקצר ביותר מבין כל $\\zeta\\ge 1$. (3) $\\zeta > 1$ — שני שורשים ממשיים שליליים; הפתרון דועך מונוטונית אך לאט יותר מהקריטי בגלל הקוטב הקרוב לאפס. ביישומי בקרה ומתלים שואפים לרוב ל-$\\zeta\\approx 0.7$ (פשרה בין זמן תגובה לחריגה).",
      },
      {
        id: "vib-q04-opt3",
        plainText: "ריסון קריטי מוגדר כ-$\\zeta = 0$, ואז בהכרח $c = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: $\\zeta = 0$ הוא היעדר ריסון ($c = 0$). ריסון קריטי הוא $\\zeta = 1$, כלומר $c = c_c = 2\\sqrt{km} = 2m\\omega_n$. בנקודה זו נעלמת האוסצילציה והמערכת חוזרת לשיווי משקל במהירות מרבית ללא חריגה.",
      },
      {
        id: "vib-q04-opt4",
        plainText: "בכל שלושת המשטרים התדר $\\omega_d$ זהה ושווה ל-$\\omega_n$.",
        isCorrect: false,
        explanation:
          "שגוי: $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$ מוגדר רק במשטר התת-קריטי, ושם הוא קטן מ-$\\omega_n$. בריסון קריטי ובמרוסן-יתר אין תדר תנודה — הפתרון אינו מחזורי.",
      },
    ],
  },
  {
    id: "vib-q05-forced-harmonic-response-magnification",
    domain: "תגובה מאולצת הרמונית",
    title: "תנודות ורעידות - תגובה מאולצת להעירור הרמוני ומקדם הגברה",
    context:
      "על מערכת SDOF פועל כוח $F(t) = F_0\\cos\\omega t$. במצב מתמיד התגובה היא $x(t) = X\\cos(\\omega t - \\phi)$. יחס התדרים $r = \\omega/\\omega_n$.",
    formulaLatex:
      "\\frac{X}{\\delta_{st}} = \\frac{1}{\\sqrt{(1-r^2)^2 + (2\\zeta r)^2}}, \\quad \\delta_{st} = \\frac{F_0}{k}",
    instruction:
      "מהו מקדם ההגברה הדינמית $X/\\delta_{st}$ כתלות ב-$r$ ו-$\\zeta$, והיכן מופיע שיא התגובה?",
    options: [
      {
        id: "vib-q05-opt1",
        plainText: "ההגברה מקסימלית תמיד ב-$r = 0$, ללא תלות בריסון.",
        isCorrect: false,
        explanation:
          "שגוי: ב-$r = 0$ (עירור סטטי איטי) מתקבלת התגובה הסטטית $X = \\delta_{st}$ ומקדם ההגברה שווה ל-$1$. השיא הדינמי מופיע ליד $r\\approx 1$ (עבור $\\zeta$ קטן), לא ב-$r = 0$.",
      },
      {
        id: "vib-q05-opt2",
        plainText:
          "$\\dfrac{X}{\\delta_{st}} = 1/\\sqrt{(1-r^2)^2+(2\\zeta r)^2}$. ל-$\\zeta < 1/\\sqrt{2}$ השיא ב-$r_{\\text{peak}} = \\sqrt{1-2\\zeta^2}$, וגובהו יורד עם $\\zeta$. ב-$r\\to\\infty$ ההגברה $\\to 0$ (אינרציה שולטת).",
        mathText:
          "\\frac{X}{\\delta_{st}}=\\frac{1}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}},\\quad r_{pk}=\\sqrt{1-2\\zeta^2}",
        isCorrect: true,
        explanation:
          "נכון: פתרון פרטי הרמוני (הצבה מרוכבת) נותן את משרעת המצב המתמיד ואת הפאזה $\\tan\\phi = 2\\zeta r/(1-r^2)$. מקדם ההגברה מראה שלושה אזורים: (א) $r\\ll 1$ — תגובה כמעט סטטית; (ב) $r\\approx 1$ — הגברה חזקה מסדר $1/(2\\zeta)$ בקירוב; (ג) $r\\gg 1$ — המסה כמעט אינה זזה ביחס לכוח ($X\\propto 1/(m\\omega^2)$). גזירת ההגברה לפי $r$ מראה ששיא המשרעת קיים רק כאשר $\\zeta < 1/\\sqrt{2}$ וב-$r = \\sqrt{1-2\\zeta^2}$ (מעט מתחת ל-$\\omega_n$). זה הבסיס לתכן בידוד רעידות ולמניעת מעבר איטי דרך רזוננס בהנעה.",
      },
      {
        id: "vib-q05-opt3",
        plainText: "המשרעת $X$ גדלה לינארית עם $\\omega$ ללא גבול, גם בנוכחות ריסון חיובי.",
        isCorrect: false,
        explanation:
          "שגוי: מעל אזור הרזוננס המשרעת דועכת ל-$0$ כש-$r\\to\\infty$. ריסון מגביל את גובה השיא ליד $r\\approx 1$ אך אינו מונע את הדעיכה בתדרים גבוהים, שבהם האינרציה שולטת.",
      },
      {
        id: "vib-q05-opt4",
        plainText: "$\\delta_{st} = F_0/m$ וההגברה חסרת תלות מוחלטת בקשיחות $k$.",
        isCorrect: false,
        explanation:
          "שגוי: ההעתקה הסטטית היא $\\delta_{st} = F_0/k$ (לא $F_0/m$). הקשיחות מופיעה גם ב-$\\omega_n = \\sqrt{k/m}$ שבתוך $r = \\omega/\\omega_n$, ולכן משפיעה על כל עקומת ההגברה.",
      },
    ],
  },
  {
    id: "vib-q06-resonance-phase-energy-damping",
    domain: "רזוננס",
    title: "תנודות ורעידות - רזוננס: פאזה, אנרגיה ותפקיד הריסון",
    context:
      "ברזוננס תדר העירור קרוב לתדר הטבעי. הפאזה בין הכוח להעתקה והמאזן האנרגטי למחזור קובעים את משרעת המצב המתמיד.",
    formulaLatex:
      "r = 1:\\; \\frac{X}{\\delta_{st}} = \\frac{1}{2\\zeta}, \\quad \\phi = 90^\\circ, \\quad E_{\\text{in/cycle}} = \\pi c\\omega X^2",
    instruction:
      "מה קורה בפאזה ובמשרעת כאשר $r = 1$, ומדוע ריסון חיוני לקיום מצב מתמיד ברזוננס?",
    options: [
      {
        id: "vib-q06-opt1",
        plainText: "ב-$r = 1$ הפאזה היא תמיד $0^\\circ$ והמשרעת אינסופית גם כאשר $\\zeta > 0$.",
        isCorrect: false,
        explanation:
          "שגוי: ב-$r = 1$ הפאזה היא $\\phi = 90^\\circ$ (לא $0^\\circ$), והמשרעת $X = \\delta_{st}/(2\\zeta)$ סופית כל עוד $\\zeta > 0$. משרעת אינסופית מתקבלת רק במודל הלא-מרוסן ($\\zeta = 0$) ברזוננס מדויק.",
      },
      {
        id: "vib-q06-opt2",
        plainText:
          "ב-$r = 1$: $\\phi = 90^\\circ$ ו-$X/\\delta_{st} = 1/(2\\zeta)$. הכוח במופע עם המהירות, מזרים אנרגיה מקסימלית למחזור; במצב מתמיד אנרגיה זו מתאזנת בדיוק עם האנרגיה שמפזר הריסון. ב-$\\zeta = 0$ אין איזון והמשרעת גדלה לינארית בזמן.",
        mathText:
          "r=1:\\;\\phi=\\pi/2,\\; X=F_0/(c\\omega_n)=\\delta_{st}/(2\\zeta)",
        isCorrect: true,
        explanation:
          "נכון: כאשר $\\omega = \\omega_n$, האיבר $(1-r^2)$ מתאפס וההגברה נשלטת רק ע״י הריסון: $1/(2\\zeta)$. הפאזה $\\phi = 90^\\circ$ משמעה שהכוח תואם למהירות ($\\dot{x}$), ולכן הספק ממוצע $\\langle F\\dot{x}\\rangle$ מקסימלי. האנרגיה למחזור הנכנסת היא $\\pi F_0 X$, והיוצאת דרך הריסון $\\pi c\\omega X^2$; השוואתן נותנת את $X$ של המצב המתמיד. ללא ריסון ($\\zeta = 0$) אין מנגנון פיזור, והתגובה ברזוננס כוללת תנודה עם משרעת הגדלה כ-$t\\sin\\omega_n t$ — תופעה מסוכנת במבנים ובמכונות סובבות.",
      },
      {
        id: "vib-q06-opt3",
        plainText: "ריסון מוריד את המשרעת ברזוננס אך הופך את הפאזה ל-$180^\\circ$ כבר ב-$r = 1$.",
        isCorrect: false,
        explanation:
          "שגוי: לכל $\\zeta > 0$ מתקיים $\\phi = 90^\\circ$ בדיוק כאשר $r = 1$. פאזה של $180^\\circ$ מתקבלת רק בגבול $r\\to\\infty$, לא ברזוננס התדר הטבעי.",
      },
      {
        id: "vib-q06-opt4",
        plainText: "ברזוננס המסה נמצאת תמיד במנוחה מוחלטת והקפיץ נושא לבדו את כל הכוח החיצוני.",
        isCorrect: false,
        explanation:
          "שגוי: ברזוננס המשרעת מקסימלית בקירוב (לא אפס). האינרציה והקפיץ מבטלים זה את זה ($m\\ddot{x}+kx\\approx 0$ כאשר $\\omega=\\omega_n$), והריסון הוא שמאזן את הכוח החיצוני — לכן $X = F_0/(c\\omega_n)$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "vib-q07-force-displacement-transmissibility",
    domain: "מקדם העברה",
    title: "תנודות ורעידות - מקדם העברת כוח ותזוזה (Transmissibility)",
    context:
      "מכונה רוטטת על מבודדים אלסטיים מעבירה כוח דינמי לרצפה. מקדם העברת הכוח הוא $TR = F_T/F_0$. לחלופין, בתנודת בסיס, מקדם העברת התזוזה הוא $X/Y$.",
    formulaLatex:
      "TR = \\sqrt{\\frac{1+(2\\zeta r)^2}{(1-r^2)^2+(2\\zeta r)^2}}, \\quad r = \\frac{\\omega}{\\omega_n}",
    instruction:
      "מתי מתקבל בידוד רעידות אפקטיבי ($TR < 1$), וכיצד משפיע הריסון על אזור הבידוד?",
    options: [
      {
        id: "vib-q07-opt1",
        plainText: "בידוד מתקבל רק כאשר $r < 1$, כלומר כאשר המכונה קשיחה מאוד ביחס לתדר העירור.",
        isCorrect: false,
        explanation:
          "שגוי: באזור $r < 1$ יש הגברה דינמית ($TR > 1$ ליד הרזוננס), לא בידוד. בידוד אפקטיבי ($TR < 1$) דורש $r > \\sqrt{2}$, כלומר מבודדים רכים יחסית לתדר העירור ($\\omega_n$ נמוך).",
      },
      {
        id: "vib-q07-opt2",
        plainText: "הגדלת $\\zeta$ משפרת תמיד את הבידוד ב-$r \\gg 1$ ומקטינה את $TR$ באזור זה.",
        isCorrect: false,
        explanation:
          "שגוי: זהו פרדוקס הריסון בבידוד — ב-$r > \\sqrt{2}$ הגדלת $\\zeta$ מעלה את $TR$ ופוגעת בבידוד. ריסון גבוה מועיל בעיקר בהקטנת השיא במעבר דרך רזוננס בהנעה/עצירה, לא בבידוד מתמיד בתדר גבוה.",
      },
      {
        id: "vib-q07-opt3",
        plainText:
          "$TR = \\sqrt{\\bigl(1+(2\\zeta r)^2\\bigr)/\\bigl((1-r^2)^2+(2\\zeta r)^2\\bigr)}$. בידוד כאשר $r > \\sqrt{2}$. תכן טיפוסי: $\\omega_n$ נמוך (מבודדים רכים) כך ש-$r\\approx 3$–$5$; ריסון מתון נדרש למעבר בטוח דרך הרזוננס בהנעה/עצירה, אך גבוה מדי פוגע בבידוד.",
        mathText:
          "TR<1 \\Leftrightarrow r>\\sqrt{2},\\quad TR(r,\\zeta)=\\sqrt{\\frac{1+(2\\zeta r)^2}{(1-r^2)^2+(2\\zeta r)^2}}",
        isCorrect: true,
        explanation:
          "נכון: הכוח המועבר לרצפה הוא סכום כוחות הקפיץ והריסון. הנוסחה ל-$TR$ מראה חיתוך $TR = 1$ ב-$r = \\sqrt{2}$ לכל $\\zeta$. מעבר לכך $TR$ יורד עם $r$ — זה אזור הבידוד. פרדוקס הריסון: הגדלת $\\zeta$ מורידה את השיא ליד $r = 1$ (רצוי בהאצה דרך רזוננס) אך מעלה את $TR$ ב-$r > \\sqrt{2}$ (לא רצוי בבידוד מתמיד). לכן בוחרים לעיתים מבודדים בעלי ריסון תלוי-משרעת או ריסון נמוך בתוספת מעצורי משרעת. אותה נוסחה (בקירוב) מתארת גם העברת תזוזה מבידוד בסיס.",
      },
      {
        id: "vib-q07-opt4",
        plainText: "$TR$ זהה תמיד ל-$X/\\delta_{st}$ ואינו תלוי בריסון כלל.",
        isCorrect: false,
        explanation:
          "שגוי: מקדם העברת הכוח $TR$ שונה ממקדם הגברת המשרעת $X/\\delta_{st}$. ב-$TR$ מופיע המונה $1+(2\\zeta r)^2$ שמבטא את תרומת הריסון להעברת כוח — ולכן $TR$ תלוי מפורשות ב-$\\zeta$.",
      },
    ],
  },
  {
    id: "vib-q08-2dof-modal-analysis-eigenfrequencies",
    domain: "ניתוח מודלי 2DOF",
    title: "תנודות ורעידות - מערכת שתי דרגות חופש וניתוח מודלי",
    context:
      "שתי מסות $m_1, m_2$ מחוברות בקפיצים $k_1, k_2, k_3$ (קונפיגורציה טיפוסית). משוואות התנועה הלא-מרוסנות: $\\mathbf{M}\\ddot{\\mathbf{x}} + \\mathbf{K}\\mathbf{x} = \\mathbf{0}$. תדרים עצמיים מתקבלים מ-$\\det(\\mathbf{K} - \\omega^2\\mathbf{M}) = 0$.",
    formulaLatex:
      "\\det(\\mathbf{K}-\\omega^2\\mathbf{M})=0, \\quad \\mathbf{x}(t)=\\sum_{i=1}^{2} q_i(t)\\,\\boldsymbol{\\phi}^{(i)}",
    instruction:
      "מהם המודים העצמיים במערכת 2DOF, וכיצד מפרקים תגובה כללית לקואורדינטות מודליות?",
    options: [
      {
        id: "vib-q08-opt1",
        plainText: "למערכת 2DOF יש תדר עצמי יחיד הזהה ל-$\\sqrt{k/m}$ של מסה בודדת, ללא תלות בצימוד.",
        isCorrect: false,
        explanation:
          "שגוי: למערכת בעלת $n$ דרגות חופש יש $n$ תדרים עצמיים. ב-2DOF יש שני תדרים $\\omega_1 < \\omega_2$ ושני וקטורי מוד בלתי-תלויים; הצימוד דרך הקפיצים קובע את פיצול התדרים ואת צורות המוד.",
      },
      {
        id: "vib-q08-opt2",
        plainText: "המודים אינם אורתוגונליים ביחס ל-$\\mathbf{M}$ ול-$\\mathbf{K}$, ולכן לא ניתן לפרק לקואורדינטות מודליות.",
        isCorrect: false,
        explanation:
          "שגוי: עבור מטריצות סימטריות חיוביות-מוגדרות, המודים העצמיים אורתוגונליים ביחס ל-$\\mathbf{M}$ ול-$\\mathbf{K}$: $\\boldsymbol{\\phi}^{(i)T}\\mathbf{M}\\boldsymbol{\\phi}^{(j)}=0$ ל-$i\\neq j$. אורתוגונליות זו היא בדיוק הבסיס לפירוק מודלי ולמשוואות SDOF בלתי-מצומדות.",
      },
      {
        id: "vib-q08-opt3",
        plainText:
          "שני תדרים $\\omega_1,\\omega_2$ ושני מודים $\\boldsymbol{\\phi}^{(1)},\\boldsymbol{\\phi}^{(2)}$ (למשל תנועה במופע מול תנועה מנוגדת). אורתוגונליות: $\\boldsymbol{\\phi}^{(i)T}\\mathbf{M}\\boldsymbol{\\phi}^{(j)}=0$ ל-$i\\neq j$. התגובה $\\mathbf{x}=\\sum q_i(t)\\boldsymbol{\\phi}^{(i)}$ מפרקת את המערכת לשתי משוואות SDOF מודליות בלתי-מצומדות.",
        mathText:
          "(\\mathbf{K}-\\omega_i^2\\mathbf{M})\\boldsymbol{\\phi}^{(i)}=\\mathbf{0},\\quad \\mathbf{x}=\\boldsymbol{\\Phi}\\mathbf{q}",
        isCorrect: true,
        explanation:
          "נכון: בעיית העצמים $\\mathbf{K}\\boldsymbol{\\phi} = \\omega^2\\mathbf{M}\\boldsymbol{\\phi}$ נותנת שני ערכים עצמיים חיוביים (למערכת חיובית-מוגדרת ללא גוף חופשי). המוד הנמוך הוא לרוב תנועה באותו כיוון של שתי המסות; המוד הגבוה — תנועה מנוגדת עם צומת. בגלל $\\boldsymbol{\\phi}^{(i)T}\\mathbf{M}\\boldsymbol{\\phi}^{(j)} = \\mu_i\\delta_{ij}$ ו-$\\boldsymbol{\\phi}^{(i)T}\\mathbf{K}\\boldsymbol{\\phi}^{(j)} = \\mu_i\\omega_i^2\\delta_{ij}$, הצבה $\\mathbf{x} = \\boldsymbol{\\Phi}\\mathbf{q}$ מאלכסנת את המשוואות ל-$\\ddot{q}_i + \\omega_i^2 q_i = Q_i(t)/\\mu_i$. זהו כלי מרכזי בניתוח מבנים, רכבים ורוטורים מצומדים.",
      },
      {
        id: "vib-q08-opt4",
        plainText: "ניתוח מודלי אפשרי רק אם יש ריסון צמיגי מצומד מלא בין כל דרגות החופש.",
        isCorrect: false,
        explanation:
          "שגוי: הניתוח המודלי הקלאסי מתחיל במערכת לא-מרוסנת. ריסון מודלי (או ריסון פרופורציונלי מסוג ריילי) מתווסף לאחר האלכסון. ריסון מצומד כללי עלול דווקא לשבור את האלכסון המודלי — ההפך מהטענה.",
      },
    ],
  },
  {
    id: "vib-q09-rayleigh-damping-proportional-caughey",
    domain: "ריסון ריילי",
    title: "תנודות ורעידות - ריסון ריילי (פרופורציונלי) ושימור מודליות",
    context:
      "במערכות רב-דרגתיות, מטריצת ריסון כללית $\\mathbf{C}$ עלולה לצומד מודים. ריסון ריילי (Caughey פרופורציונלי מסדר ראשון) בוחר $\\mathbf{C} = \\alpha\\mathbf{M} + \\beta\\mathbf{K}$ כך שהמודים של המערכת הלא-מרוסנת נשארים מודים של המערכת המרוסנת.",
    formulaLatex:
      "\\mathbf{C}=\\alpha\\mathbf{M}+\\beta\\mathbf{K}, \\quad \\zeta_i = \\frac{\\alpha}{2\\omega_i} + \\frac{\\beta\\omega_i}{2}",
    instruction:
      "כיצד נקבעים $\\alpha$ ו-$\\beta$, ומה צורת תלות $\\zeta_i$ בתדר המוד $\\omega_i$?",
    options: [
      {
        id: "vib-q09-opt1",
        plainText: "ריסון ריילי מצומד תמיד את כל המודים ולכן אסור לשימוש בניתוח מודלי.",
        isCorrect: false,
        explanation:
          "שגוי: דווקא ריסון ריילי משמר אורתוגונליות מודלית: $\\boldsymbol{\\phi}^{(i)T}\\mathbf{C}\\boldsymbol{\\phi}^{(j)}=0$ ל-$i\\neq j$. לכן הוא מאפשר שיוך $\\zeta_i$ לכל מוד בנפרד ושימוש באינטגרציית זמן מודלית — זה יתרונו העיקרי.",
      },
      {
        id: "vib-q09-opt2",
        plainText: "$\\zeta_i$ קבוע לכל המודים ואינו תלוי ב-$\\omega_i$ כאשר $\\alpha,\\beta \\neq 0$.",
        isCorrect: false,
        explanation:
          "שגוי: $\\zeta_i = \\alpha/(2\\omega_i) + \\beta\\omega_i/2$ תלוי מפורשות ב-$\\omega_i$: האיבר הראשון יורד עם התדר והשני עולה. $\\zeta$ קבוע לכל המודים רק במקרים מנוונים (למשל $\\alpha=\\beta=0$, או בחירה מלאכותית אחרת שאינה ריילי סטנדרטי).",
      },
      {
        id: "vib-q09-opt3",
        plainText:
          "בוחרים שני מודים יעד (למשל $i,j$) עם $\\zeta$ רצוי, ופותרים למערכת $2\\times 2$ עבור $\\alpha,\\beta$. אז $\\zeta_i = \\alpha/(2\\omega_i) + \\beta\\omega_i/2$: האיבר $\\alpha$ שולט במודים נמוכים, $\\beta$ במודים גבוהים. זה מאפשר אינטגרציית זמן מודלית יציבה.",
        mathText:
          "\\zeta_i=\\frac{\\alpha}{2\\omega_i}+\\frac{\\beta\\omega_i}{2},\\quad \\mathbf{C}=\\alpha\\mathbf{M}+\\beta\\mathbf{K}",
        isCorrect: true,
        explanation:
          "נכון: מכיוון ש-$\\boldsymbol{\\phi}^{(i)T}\\mathbf{C}\\boldsymbol{\\phi}^{(j)} = (\\alpha + \\beta\\omega_i^2)\\mu_i\\delta_{ij}$, המשוואות המודליות נותרות בלתי-מצומדות עם $2\\zeta_i\\omega_i = \\alpha + \\beta\\omega_i^2$. התאמת $\\alpha,\\beta$ לשני תדרים מבטיחה ריסון רצוי שם; למודים אחרים $\\zeta(\\omega)$ נקבע אוטומטית — לעיתים גבוה מדי במודים הגבוהים (בעיית יתר-ריסון של $\\beta\\omega/2$). לכן בפרקטיקה לעיתים משתמשים בריסון מודלי ישיר או בהרחבת Caughey מסדר גבוה יותר. ריסון ריילי נפוץ ב-FE דינמי של מבנים ורכב.",
      },
      {
        id: "vib-q09-opt4",
        plainText: "$\\alpha$ ו-$\\beta$ חייבים להיות שליליים כדי לקיים פיזור אנרגיה במערכת.",
        isCorrect: false,
        explanation:
          "שגוי: לפיזור אנרגיה נדרשת מטריצת ריסון חיובית-מוגדרת ($\\mathbf{x}^T\\mathbf{C}\\mathbf{x} > 0$ לכל $\\mathbf{x}\\neq\\mathbf{0}$). בריסון ריילי זה מתקיים כאשר $\\alpha\\ge 0$ ו-$\\beta\\ge 0$ (ולא כאשר הם שליליים, מה שהיה מזין אנרגיה).",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "vib-q10-whirling-shafts-critical-speed",
    domain: "סיבוב גלים קריטי",
    title: "תנודות ורעידות - סיבוב גלים (Whirling) ומהירות קריטית",
    context:
      "גל מסתובב עם דיסק לא-מאוזן (אקסצנטריות $e$) מתכופף סטטית דינמית. במהירות זוויתית $\\Omega$ קרובה לתדר הכיפוף הטבעי $\\omega_n$ מתרחש Whirl מסוכן. המודל הפשוט של Jeffcott Rotor: מסה $m$ על גל חסר מסה בקשיחות $k$.",
    formulaLatex:
      "r = \\frac{e\\,(\\Omega/\\omega_n)^2}{\\sqrt{(1-(\\Omega/\\omega_n)^2)^2+(2\\zeta\\Omega/\\omega_n)^2}}, \\quad \\omega_n=\\sqrt{k/m}",
    instruction:
      "מהי המהירות הקריטית של גל Jeffcott, ומה קורה למשראת הסיבוב מתחת ומעל לה?",
    options: [
      {
        id: "vib-q10-opt1",
        plainText: "המהירות הקריטית היא $\\Omega = 0$ בלבד, ומעליה אין רזוננס כי הגל נחשב קשיח לחלוטין.",
        isCorrect: false,
        explanation:
          "שגוי: המהירות הקריטית של רוטור Jeffcott היא $\\Omega_{cr} = \\omega_n = \\sqrt{k/m}$ — תדר הכיפוף הטבעי. שם משרעת ה-Whirl מקסימלית. $\\Omega = 0$ הוא מנוחה סטטית, לא רזוננס סיבובי.",
      },
      {
        id: "vib-q10-opt2",
        plainText: "מעל המהירות הקריטית המרכז הגיאומטרי ומרכז המסה מתרחקים זה מזה לאינסוף תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: מעל $\\Omega_{cr}$ המערכת עוברת לסיבוב סביב מרכז המסה (Self-Centering): המשרעת היחסית דועכת לכיוון $e$ עם פאזה הקרובה ל-$180^\\circ$, ולא מתבדרת לאינסוף (כל עוד יש ריסון או שהמערכת רחוקה מהרזוננס).",
      },
      {
        id: "vib-q10-opt3",
        plainText: "ריסון אינו משפיע כלל על משרעת ה-Whirl ליד המהירות הקריטית.",
        isCorrect: false,
        explanation:
          "שגוי: ליד $\\Omega = \\omega_n$ המשרעת נשלטת ע״י $\\zeta$ — בדומה ל-$X\\propto 1/(2\\zeta)$ ברזוננס כוח. ללא ריסון המשרעת תאורטית אינסופית במעבר הסינכרוני דרך הקריטיות.",
      },
      {
        id: "vib-q10-opt4",
        plainText:
          "המהירות הקריטית $\\Omega_{cr} = \\omega_n = \\sqrt{k/m}$. מתחתיה הסיבוב במופע עם חוסר האיזון; מעליה — סיבוב עצמי-ממורכז ($r\\to e$ עם פאזה $180^\\circ$). מעבר איטי דרך $\\Omega_{cr}$ מסוכן; לכן מאיצים במהירות או מוסיפים ריסון/מסבים מתאימים.",
        mathText:
          "\\Omega_{cr}=\\omega_n,\\quad r(\\Omega)=\\frac{e r_\\Omega^2}{\\sqrt{(1-r_\\Omega^2)^2+(2\\zeta r_\\Omega)^2}}",
        isCorrect: true,
        explanation:
          "נכון: במערכת הקואורדינטות המסתובבת, כוח הצנטריפוגלי של חוסר האיזון $m e\\Omega^2$ מניע את התגובה הרדיאלית כמו עירור הרמוני עם $r_\\Omega = \\Omega/\\omega_n$. הנוסחה למשראת הסיבוב זהה בצורתה להגברה מאולצת עם מונה $e r_\\Omega^2$. ב-$\\Omega = \\omega_n$ רזוננס כיפוף (Whirl קדמי סינכרוני). מעל הקריטיות, האינרציה שולטת והדיסק מסתובב סביב מרכז המסה — תופעת Self-Centering הקריטית לטורבינות ומנועים מהירים. תכן: הימנעות מעבודה ממושכת ליד $\\Omega_{cr}$, מעבר מהיר, איזון דינמי ($e\\to 0$), וריסון מסבים.",
      },
    ],
  },
  {
    id: "vib-q11-base-excitation-relative-absolute-response",
    domain: "עירור בסיס",
    title: "תנודות ורעידות - עירור בסיס: תגובה יחסית ומוחלטת",
    context:
      "בסיס נע בתנודה $y(t) = Y\\cos\\omega t$ (למשל רכב על כביש או מבנה ברעידת אדמה). ההעתקה המוחלטת של המסה היא $x(t)$, וההעתקה היחסית $z = x - y$. משוואת התנועה: $m\\ddot{z} + c\\dot{z} + kz = -m\\ddot{y}$.",
    formulaLatex:
      "m\\ddot{z}+c\\dot{z}+kz=-m\\ddot{y}, \\quad \\frac{Z}{Y}=\\frac{r^2}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}",
    instruction:
      "מהו הקשר בין משראת התנודה היחסית $Z$ לתנודת הבסיס $Y$, ומתי המסה נשארת כמעט במנוחה במרחב האינרציאלי?",
    options: [
      {
        id: "vib-q11-opt1",
        plainText: "עירור בסיס זהה מתמטית לכוח קבוע סטטי, ולכן $Z = 0$ לכל תדר.",
        isCorrect: false,
        explanation:
          "שגוי: עירור בסיס שקול לכוח אינרציה $-m\\ddot{y} = m\\omega^2 Y\\cos\\omega t$, התלוי ב-$\\omega^2$ — לא לכוח סטטי. $Z$ אינו אפס ככלל, וב-$r$ גבוה אף מתקרב ל-$Y$.",
      },
      {
        id: "vib-q11-opt2",
        plainText: "$Z/Y = 1$ לכל $r$, כי המסה צמודה קשיח לבסיס בכל תדר עירור.",
        isCorrect: false,
        explanation:
          "שגוי: ב-$r\\to 0$ המסה עוקבת אחרי הבסיס ($x\\approx y$) ולכן $Z\\to 0$, לא $1$. ב-$r\\gg 1$ אכן $Z/Y\\to 1$ והמסה כמעט נייחת במרחב — אבל זה לא נכון לכל $r$.",
      },
      {
        id: "vib-q11-opt3",
        plainText: "ההעתקה המוחלטת $X$ תמיד גדולה מ-$Y$ פי $1/(2\\zeta)$ בלבד, לכל תדר.",
        isCorrect: false,
        explanation:
          "שגוי: מקדם העברת התזוזה המוחלטת $X/Y$ תלוי ב-$r$ וב-$\\zeta$ ומתנהג כמו $TR$ — אינו קבוע $1/(2\\zeta)$. היחס $1/(2\\zeta)$ מאפיין את הגברת המשרעת לכוח ברזוננס $r=1$, לא את עירור הבסיס לכל תדר.",
      },
      {
        id: "vib-q11-opt4",
        plainText:
          "$Z/Y = r^2/\\sqrt{(1-r^2)^2+(2\\zeta r)^2}$. ב-$r\\ll 1$ המסה עוקבת אחרי הבסיס ($Z\\approx 0$). ב-$r\\gg 1$ האינרציה משאירה את המסה כמעט נייחת בחלל ($X\\approx 0$, $Z\\approx -Y$) — עקרון בידוד רעידות לרכב/מכשור רגיש.",
        mathText:
          "\\frac{Z}{Y}=\\frac{r^2}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}},\\quad r\\gg 1\\Rightarrow X\\approx 0",
        isCorrect: true,
        explanation:
          "נכון: הצבת $\\ddot{y} = -\\omega^2 Y\\cos\\omega t$ באגף ימין נותנת עירור שקול ל-$m\\omega^2 Y$, ולכן משראת $Z$ כוללת מונה $r^2$ ביחס ל-$Y$. ב-$r$ נמוך הקפיץ קשיח יחסית והמסה נעה עם הבסיס. ב-$r$ גבוה המסה \"לא מספיקה\" לעקוב, והתנודה היחסית מתקרבת לתנודת הבסיס עצמה — כלומר המסה מבודדת במרחב האינרציאלי. מקדם העברת התזוזה המוחלטת $X/Y$ זהה ל-$TR$ של העברת כוח. זה הבסיס לתכן מתלי רכב, שולחנות אופטיים מבודדים, ומבנים עם בידוד בסיס סייסמי.",
      },
    ],
  },
  {
    id: "vib-q12-impulse-response-green-function-sdof",
    domain: "תגובת הלם",
    title: "תנודות ורעידות - תגובת הלם (Impulse Response) וקונבולוציה",
    context:
      "הלם אידיאלי $F(t) = \\hat{F}\\delta(t)$ מעניק למסה תנע רגעי $m\\dot{x}(0^+) = \\hat{F}$. תגובת ההלם $h(t)$ היא תגובת המערכת להלם יחידה, ומשמשת לחישוב תגובה לכוח כללי ע״י קונבולוציה.",
    formulaLatex:
      "h(t)=\\frac{1}{m\\omega_d}e^{-\\zeta\\omega_n t}\\sin(\\omega_d t)\\,u(t), \\quad x(t)=\\int_0^t h(t-\\tau)F(\\tau)\\,d\\tau",
    instruction:
      "מהי תגובת ההלם של SDOF תת-קריטי, וכיצד מחשבים ממנה תגובה לכוח שרירותי?",
    options: [
      {
        id: "vib-q12-opt1",
        plainText: "תגובת הלם קיימת רק למערכות מרוסנות-יתר ואינה מוגדרת כלל ל-$\\zeta < 1$.",
        isCorrect: false,
        explanation:
          "שגוי: $h(t)$ מוגדרת לכל משטר ריסון. הצורה עם $e^{-\\zeta\\omega_n t}\\sin(\\omega_d t)$ שייכת במפורש לתת-קריטי. למרוסן-יתר ולקריטי יש ביטויים אחרים (היפרבוליים / עם גורם $t$), אך התגובה קיימת.",
      },
      {
        id: "vib-q12-opt2",
        plainText: "לאחר הלם, המהירות נותרת אפס וההעתקה קופצת מיידית ל-$\\hat{F}/k$.",
        isCorrect: false,
        explanation:
          "שגוי: אינטגרציה של משוואת התנועה סביב $t=0$ מראה שהלם משנה מהירות מיידית ($\\Delta v = \\hat{F}/m$) בעוד שההעתקה רציפה ($x(0^+)=x(0^-)$). קפיצת העתקה ל-$\\hat{F}/k$ מתארת תגובה סטטית לכוח קבוע, לא להלם.",
      },
      {
        id: "vib-q12-opt3",
        plainText: "קונבולוציה עם $h(t)$ תקפה רק לכוחות הרמוניים טהורים, לא לאותות כלליים בזמן.",
        isCorrect: false,
        explanation:
          "שגוי: עבור מערכת ליניארית קבועת-זמן, $x = h * F$ תקף לכל כוח בעל תמיכה מתאימה — כולל אותות שרירותיים, הלמים, ומעברים. כוח הרמוני הוא מקרה פרטי; במרחב התדר $X(s)=H(s)F(s)$.",
      },
      {
        id: "vib-q12-opt4",
        plainText:
          "לתת-קריטי: $h(t) = \\frac{1}{m\\omega_d}e^{-\\zeta\\omega_n t}\\sin(\\omega_d t)$ ל-$t\\ge 0$. תגובה כללית: $x(t) = \\int_0^t h(t-\\tau)F(\\tau)\\,d\\tau$ (קונבולוציה). זהו גם גרעין גרין של המשוואה הדיפרנציאלית.",
        mathText:
          "h(t)=\\frac{e^{-\\zeta\\omega_n t}}{m\\omega_d}\\sin(\\omega_d t)\\,u(t),\\quad x=h*F",
        isCorrect: true,
        explanation:
          "נכון: אינטגרציה של משוואת התנועה סביב $t = 0$ נותנת קפיצת מהירות $\\dot{x}(0^+) = \\hat{F}/m$ עם $x(0^+)=0$. התגובה החופשית עם תנאי התחלה אלה היא בדיוק $h(t)$ כש-$\\hat{F}=1$. לכל כוח $F(t)$ ניתן לפרק לסופרפוזיציה של הלמים אינפיניטסימליים $F(\\tau)d\\tau$, ולכן $x = h * F$. במרחב התדר: $X(s) = H(s)F(s)$ עם $H(s) = 1/(ms^2 + cs + k)$. זה כלי מרכזי לניתוח הלמי פגיעה, רעידות אדמה (אינטגרל Duhamel), וזיהוי מודלי מניסויי הלם.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_MECHANICAL_VIBRATIONS_QUESTIONS = MECHANICAL_VIBRATIONS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleMechanicalVibrationsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = MECHANICAL_VIBRATIONS_QUESTIONS.slice(0, 3);
  const groupB = MECHANICAL_VIBRATIONS_QUESTIONS.slice(3, 6);
  const groupC = MECHANICAL_VIBRATIONS_QUESTIONS.slice(6, 12);

  if (groupA.length === 0 || groupB.length === 0 || groupC.length === 0) {
    return [];
  }

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
