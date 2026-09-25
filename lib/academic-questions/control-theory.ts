import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Control Theory diagnostic bank (12Q).
 * Display name: "תורת הבקרה ומערכות ליניאריות" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const CONTROL_THEORY_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "ctrl-q01-routh-hurwitz-stability-criterion",
    domain: "קריטריון יציבות ראות׳-הורביץ",
    title: "תורת הבקרה - קריטריון יציבות ראות׳-הורביץ",
    context: "המשוואה האופיינית של מערכת בחוג סגור היא $P(s) = s^4 + 2s^3 + 3s^2 + 4s + K = 0$, כאשר $K$ הוא הגבר חיובי.",
    formulaLatex: "P(s) = s^4 + 2s^3 + 3s^2 + 4s + K = 0",
    instruction: "מהו תחום ערכי ההגבר $K$ המבטיח יציבות אסימפטוטית של המערכת בחוג סגור לפי קריטריון ראות׳-הורביץ?",
    options: [
      {
        id: "ctrl-q01-opt1",
        mathText: "0 < K < 2",
        plainText: "$0 < K < 2$",
        isCorrect: true,
        explanation: "נכון: נבנה את טבלת ראות׳: שורה $s^4$: $[1, 3, K]$; שורה $s^3$: $[2, 4, 0]$. שורה $s^2$: איבר ראשון הוא $\\frac{2 \\times 3 - 1 \\times 4}{2} = 1$, איבר שני הוא $\\frac{2 \\times K - 0}{2} = K$. שורה $s^1$: $\\frac{1 \\times 4 - 2 \\times K}{1} = 4 - 2K$. שורה $s^0$: שווה ל-$K$. לתנאי יציבות, כל איברי העמודה הראשונה חייבים להיות חיוביים ממש: $K > 0$ ו-$4 - 2K > 0 \\implies 2K < 4 \\implies K < 2$. לכן תחום היציבות הוא $0 < K < 2$.",
      },
      {
        id: "ctrl-q01-opt2",
        plainText: "$K > 2$",
        isCorrect: false,
        explanation: "שגוי: עבור $K > 2$ איבר שורת $s^1$ ($4 - 2K$) הופך לשלילי, ומתקבלים שני חילופי סימן בעמודה הראשונה המייצגים שני קטבים בלתי-יציבים ב-RHP.",
      },
      {
        id: "ctrl-q01-opt3",
        plainText: "$0 < K < 6$",
        isCorrect: false,
        explanation: "שגוי: טעות בחישוב דטרמיננטת האיבר בשורת $s^1$.",
      },
      {
        id: "ctrl-q01-opt4",
        plainText: "המערכת אינה יציבה לאף ערך של $K$ עקב אי-שוויון סטורודולה.",
        isCorrect: false,
        explanation: "שגוי: כל מקדמי המשוואה חיוביים עבור $K > 0$, וקיים תחום יציבות מוגדר.",
      }
    ],
  },
  {
    id: "ctrl-q02-system-type-steady-state-error",
    domain: "שגיאת מצב מתמיד וסוג מערכת (System Type)",
    title: "תורת הבקרה - שגיאת מצב מתמיד וסוג מערכת (System Type)",
    context: "מערכת משוב יחידה עם פונקציית תמסורת בחוג פתוח $L(s) = \\frac{10(s + 2)}{s^2(s + 5)(s + 10)}$. למבוא המערכת מוזן אות שיפוע יחידה $r(t) = t \\cdot u(t)$ ($R(s) = 1/s^2$).",
    formulaLatex: "e_{ss} = \\lim_{s \\to 0} \\frac{s R(s)}{1 + L(s)}, \\quad K_v = \\lim_{s \\to 0} s L(s)",
    instruction: "מהו סוג המערכת (System Type), ומהי שגיאת המצב המתמיד $e_{ss}$ עבור אות כניסה זה?",
    options: [
      {
        id: "ctrl-q02-opt1",
        mathText: "\\text{Type 2} \\implies e_{ss} = 0",
        plainText: "המערכת היא מסוג 2 (Type 2, שני אינטגרטורים בראשית), ושגיאת המצב המתמיד עבור כניסת שיפוע היא $e_{ss} = 0$.",
        isCorrect: true,
        explanation: "נכון: סוג המערכת נקבע על פי מספר הקטבים של $L(s)$ בראשית הצירים ($s=0$). במכנה מופיע $s^2$, ולכן המערכת היא מסוג 2 (Type 2). קבוע שגיאת המהירות הוא $K_v = \\lim_{s \\to 0} s L(s) = \\lim_{s \\to 0} \\frac{10(s+2)}{s(s+5)(s+10)} = \\infty$. שגיאת המצב המתמיד לכניסת שיפוע נתונה ע״י $e_{ss} = \\frac{1}{K_v} = \\frac{1}{\\infty} = 0$. מערכת מסוג 2 עוקבת אחר שיפוע באפס שגיאה.",
      },
      {
        id: "ctrl-q02-opt2",
        plainText: "המערכת היא מסוג 1 (Type 1), ושגיאת המצב המתמיד היא $e_{ss} = 2.5$.",
        isCorrect: false,
        explanation: "שגוי: במכנה יש $s^2$ ולא $s$, ולכן המערכת היא מסוג 2 ולא 1.",
      },
      {
        id: "ctrl-q02-opt3",
        plainText: "המערכת היא מסוג 0 (Type 0), והשגיאה מתבדרת לאינסוף ($e_{ss} = \\infty$).",
        isCorrect: false,
        explanation: "שגוי: מערכת מסוג 0 אינה מכילה אינטגרטורים כלל.",
      },
      {
        id: "ctrl-q02-opt4",
        plainText: "המערכת מסוג 2, אך שגיאת המצב המתמיד היא $e_{ss} = 0.4$ עקב הקטבים ב-$s=-5,-10$.",
        isCorrect: false,
        explanation: "שגוי: שגיאה סופית במערכת מסוג 2 מתקבלת רק עבור כניסת פרבולה ($t^2/2$), בעוד עבור שיפוע השגיאה היא 0 מדויק.",
      }
    ],
  },
  {
    id: "ctrl-q03-root-locus-asymptotes-breakaway",
    domain: "מקום גאומטרי של השורשים (Root Locus)",
    title: "תורת הבקרה - מקום גאומטרי של השורשים (Root Locus)",
    context: "מערכת משוב עם פונקציית חוג פתוח $K G(s) = \\frac{K}{s(s + 2)(s + 4)}$. משרטטים את מקום השורשים עבור $K \\ge 0$.",
    formulaLatex: "\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n - m}, \\quad \\phi_k = \\frac{(2k + 1)180^\\circ}{n - m}",
    instruction: "מהו מרכז האסימפטוטות $\\sigma_a$, מהן זוויות האסימפטוטות $\\phi_k$, ומהי נקודת ההתפצלות (Breakaway point) על הציר הממשי?",
    options: [
      {
        id: "ctrl-q03-opt1",
        mathText: "\\sigma_a = -2, \\quad \\phi = \\pm 60^\\circ, 180^\\circ, \\quad s_b \\approx -0.845",
        plainText: "מרכז האסימפטוטות הוא $\\sigma_a = -2$, הזוויות הן $\\pm 60^\\circ, 180^\\circ$, ונקודת ההתפצלות היא ב-$s \\approx -0.845$ (בין 0 ל-$-2$).",
        isCorrect: true,
        explanation: "נכון: למערכת יש $n = 3$ קטבים ($0, -2, -4$) ו-$m = 0$ אפסים. מרכז האסימפטוטות: $\\sigma_a = \\frac{0 + (-2) + (-4) - 0}{3 - 0} = -\\frac{6}{3} = -2$. זוויות האסימפטוטות: $\\frac{(2k+1)180^\\circ}{3} = 60^\\circ, 180^\\circ, 300^\\circ$ (או $\\pm 60^\\circ, 180^\\circ$). נקודת ההתפצלות נגזרת מ-$\\frac{dK}{ds} = 0$: $K = -(s^3 + 6s^2 + 8s) \\implies 3s^2 + 12s + 8 = 0 \\implies s = \\frac{-12 \\pm \\sqrt{144 - 96}}{6} = -2 \\pm \\frac{\\sqrt{48}}{6} = -2 \\pm 1.155$. הנקודה על מקום השורשים בין 0 ל-$-2$ היא $s = -2 + 1.155 = -0.845$.",
      },
      {
        id: "ctrl-q03-opt2",
        plainText: "מרכז האסימפטוטות הוא $\\sigma_a = -3$, הזוויות הן $\\pm 90^\\circ$, ונקודת ההתפצלות היא ב-$s = -1$.",
        isCorrect: false,
        explanation: "שגוי: זוויות של $\\pm 90^\\circ$ מתאימות להפרש של 2 קטבים ואפסים ($n-m=2$), אך כאן ההפרש הוא 3.",
      },
      {
        id: "ctrl-q03-opt3",
        plainText: "מרכז האסימפטוטות בראשית $\\sigma_a = 0$, ואין נקודות התפצלות כלל.",
        isCorrect: false,
        explanation: "שגוי: שני קטבים נעים זה לקראת זה על הציר הממשי בין 0 ל-$-2$ וחייבים להתפצל למישור המרוכב.",
      },
      {
        id: "ctrl-q03-opt4",
        plainText: "מרכז האסימפטוטות הוא $\\sigma_a = -2$, אך הזוויות הן $\\pm 45^\\circ, \\pm 135^\\circ$.",
        isCorrect: false,
        explanation: "שגוי: זוויות של $45^\\circ$ מתאימות למערכת עם $n-m=4$.",
      }
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "ctrl-q04-nyquist-stability-encirclements",
    domain: "קריטריון היציבות של נייקוויסט והקפות הנקודה הקריטית",
    title: "תורת הבקרה - קריטריון היציבות של נייקוויסט והקפות הנקודה הקריטית",
    context: "נתונה מערכת בחוג פתוח $L(s)$ בעלת שני קטבים בלתי-יציבים בחצי המישור הימני ($P_{ol} = 2$). משרטטים את עקומת נייקוויסט המלאה של $L(s)$ סביב הנקודה הקריטית $-1 + j0$.",
    formulaLatex: "Z = N + P_{ol}, \\quad N = \\text{Clockwise Encirclements of } -1",
    instruction: "מהו התנאי על עקומת נייקוויסט כדי שהמערכת בחוג סגור תהיה יציבה אסימפטוטית ($Z = 0$ קטבים ב-RHP)?",
    options: [
      {
        id: "ctrl-q04-opt1",
        plainText: "העקומה אסור לה להקיף את הנקודה $-1 + j0$ כלל ($N = 0$).",
        isCorrect: false,
        explanation: "שגוי: תנאי $N=0$ מבטיח יציבות אך ורק אם המערכת בחוג פתוח יציבה מראש ($P_{ol}=0$). כאשר $P_{ol}=2$, $N=0 \\implies Z = 2$ והחוג הסגור בלתי יציב.",
      },
      {
        id: "ctrl-q04-opt2",
        mathText: "Z = N + P_{ol} = -2 + 2 = 0 \\implies N = -2",
        plainText: "העקומה חייבת להקיף את הנקודה הקריטית $-1 + j0$ בדיוק פעמיים נגד כיוון השעון ($N = -2$).",
        isCorrect: true,
        explanation: "נכון: נוסחת נייקוויסט היא $Z = N + P_{ol}$, כאשר $Z$ הוא מספר קטבי החוג הסגור ב-RHP, $P_{ol}$ הוא מספר קטבי החוג הפתוח ב-RHP, ו-$N$ הוא מספר ההקפות של הנקודה $-1+j0$ עם כיוון השעון. ליציבות בחוג סגור אנו דורשים שאין קטבים ב-RHP, כלומר $Z = 0$. נציב $P_{ol} = 2$: $0 = N + 2 \\implies N = -2$. משמעות הסימן השלילי היא בדיוק 2 הקפות של הנקודה הקריטית נגד כיוון השעון (Counter-Clockwise).",
      },
      {
        id: "ctrl-q04-opt3",
        plainText: "העקומה חייבת לעבור ישירות דרך הנקודה $-1 + j0$.",
        isCorrect: false,
        explanation: "שגוי: מעבר דרך $-1+j0$ פירושו קיום קטבים על הציר המדומה בחוג סגור (גבול יציבות / תנודות בלתי-מרוסנות).",
      },
      {
        id: "ctrl-q04-opt4",
        plainText: "העקומה חייבת להקיף את הנקודה הקריטית פעמיים עם כיוון השעון ($N = +2$).",
        isCorrect: false,
        explanation: "שגוי: $N = +2$ יביא ל-$Z = 2 + 2 = 4$ קטבים בלתי יציבים בחוג סגור.",
      }
    ],
  },
  {
    id: "ctrl-q05-bode-gain-phase-margins",
    domain: "שולי הגבר (GM) ושולי מופע (PM) בעקומות בודה",
    title: "תורת הבקרה - שולי הגבר (GM) ושולי מופע (PM) בעקומות בודה",
    context: "בעקומות בודה של מערכת בחוג פתוח $L(j\\omega)$: תדר חציית ההגבר הוא $\\omega_{gc} = 10\\text{ rad/s}$ (שבו $|L(j\\omega_{gc})| = 1 = 0\\text{ dB}$), והמופע בתדר זה הוא $\\angle L(j\\omega_{gc}) = -135^\\circ$. תדר חציית המופע הוא $\\omega_{pc} = 25\\text{ rad/s}$ (שבו $\\angle L(j\\omega_{pc}) = -180^\\circ$), וההגבר בתדר זה הוא $|L(j\\omega_{pc})| = -12\\text{ dB}$.",
    formulaLatex: "\\text{PM} = 180^\\circ + \\angle L(j\\omega_{gc}), \\quad \\text{GM} = -|L(j\\omega_{pc})|_{\\text{dB}}",
    instruction: "מהם שולי המופע (PM) ושולי ההגבר (GM) של המערכת, והאם החוג הסגור יציב?",
    options: [
      {
        id: "ctrl-q05-opt1",
        plainText: "$\\text{PM} = -45^\\circ$, $\\text{GM} = -12\\text{ dB}$, והמערכת בלתי יציבה.",
        isCorrect: false,
        explanation: "שגוי: שולי מופע מוגדרים כ-$180^\\circ + (-135^\\circ) = +45^\\circ$ ולא שליליים.",
      },
      {
        id: "ctrl-q05-opt2",
        mathText: "\\text{PM} = 45^\\circ, \\quad \\text{GM} = 12\\text{ dB}",
        plainText: "$\\text{PM} = 45^\\circ$, $\\text{GM} = 12\\text{ dB}$, והמערכת יציבה בחוג סגור.",
        isCorrect: true,
        explanation: "נכון: 1. שולי מופע נמדדים בתדר חציית ההגבר $\\omega_{gc}$: $\\text{PM} = 180^\\circ + \\angle L(j\\omega_{gc}) = 180^\\circ - 135^\\circ = 45^\\circ$. 2. שולי הגבר נמדדים בתדר חציית המופע $\\omega_{pc}$: $\\text{GM} = 0\\text{ dB} - |L(j\\omega_{pc})|_{\\text{dB}} = -(-12\\text{ dB}) = +12\\text{ dB}$ (פקטור הגבר של פי 4). 3. מאחר ששני המדדים חיוביים (ו-$\\omega_{gc} < \\omega_{pc}$), המערכת יציבה אסימפטוטית בחוג סגור עם עמידות טובה לשינויי פרמטרים.",
      },
      {
        id: "ctrl-q05-opt3",
        plainText: "$\\text{PM} = 135^\\circ$, $\\text{GM} = 12\\text{ dB}$, והמערכת על סף יציבות.",
        isCorrect: false,
        explanation: "שגוי: המופע הוא $-135^\\circ$ ולכן המרחק מ-$-180^\\circ$ הוא $45^\\circ$ ולא $135^\\circ$.",
      },
      {
        id: "ctrl-q05-opt4",
        plainText: "$\\text{PM} = 45^\\circ$, $\\text{GM} = -12\\text{ dB}$, והמערכת בלתי יציבה.",
        isCorrect: false,
        explanation: "שגוי: שולי הגבר חיוביים ($+12\\text{ dB}$) משום שההגבר בתדר חציית הפאזה נמוך מ-0 dB.",
      }
    ],
  },
  {
    id: "ctrl-q06-lead-vs-lag-compensator-design",
    domain: "תכנון רשתות פיצוי מקדים-מופע (Lead) מול מפגר-מופע (Lag)",
    title: "תורת הבקרה - תכנון רשתות פיצוי מקדים-מופע (Lead) מול מפגר-מופע (Lag)",
    context: "משווים בין מפצה מקדים-מופע (Lead Compensator: $D_{lead}(s) = \\frac{s + 1/T}{s + 1/(\\alpha T)}, \\alpha < 1$) לבין מפצה מפגר-מופע (Lag Compensator: $D_{lag}(s) = \\frac{s + 1/T}{s + 1/(\\beta T)}, \\beta > 1$).",
    instruction: "מהו התפקיד הראשי של כל אחד משני המפצים בשיפור ביצועי המערכת?",
    options: [
      {
        id: "ctrl-q06-opt1",
        plainText: "מפצה Lead נועד אך ורק להורדת שגיאת מצב מתמיד, ומפצה Lag נועד להרחבת רוחב הפס.",
        isCorrect: false,
        explanation: "שגוי: התפקידים הפוכים; שיפור שגיאת מצב מתמיד נעשה ע״י Lag (העלאת הגבר ב-DC).",
      },
      {
        id: "ctrl-q06-opt2",
        plainText: "מפצה Lead מוסיף מופע חיובי בסביבת תדר החיתוך ובכך מגדיל את שולי המופע ומהירות התגובה (הקטנת זמן העלייה); מפצה Lag מגדיל את ההגבר בתדרים נמוכים (DC) ומקטין את שגיאת המצב המתמיד מבלי לפגוע בשולי המופע.",
        isCorrect: true,
        explanation: "נכון: 1. מפצה Lead (קוטב רחוק מאפס שמאלה) תורם פאזה חיובית סביב תדר החיתוך, מגדיל את שולי המופע (משפר שיכוך ומקטין Overshoot), ומרחיב את רוחב הפס (תגובה מהירה יותר בזמן). 2. מפצה Lag (אפס וקוטב קרובים מאוד לראשית, קוטב קרוב יותר) מעניק הגבר גבוה $\\beta > 1$ בתדרים נמוכים מאוד כדי לאפס/להקטין שגיאות מצב מתמיד, תוך הנחתת מופע זניחה בתדר החיתוך $\\omega_{gc}$ כדי לשמר את היציבות.",
      },
      {
        id: "ctrl-q06-opt3",
        plainText: "שני המפצים שקולים לחלוטין ומשמשים רק לביטול קטבים ב-RHP.",
        isCorrect: false,
        explanation: "שגוי: ביטול קטבים בלתי יציבים ב-RHP אסור בחוג פתוח (מפר שליטות/צפיות פנימית).",
      },
      {
        id: "ctrl-q06-opt4",
        plainText: "מפצה Lead ממיר את המערכת לדיגיטלית, ומפצה Lag משמש כמסנן רעשים בלבד.",
        isCorrect: false,
        explanation: "שגוי: שני המפצים הם מעגלים/אלגוריתמים אנלוגיים או בדידים לעיצוב תגובת התדר.",
      }
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "ctrl-q07-kalman-controllability-observability-rank",
    domain: "שליטות וצפיות במרחב המצב (קריטריון דרגת קלמן)",
    title: "תורת הבקרה - שליטות וצפיות במרחב המצב (קריטריון דרגת קלמן)",
    context: "מערכת רציפה מממד $n=2$ מתוארת ע״י מטריצות המצב: $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & -3 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$, $C = \\begin{pmatrix} 1 & 1 \\end{pmatrix}$.",
    formulaLatex: "\\mathcal{C} = \\begin{pmatrix} B & AB \\end{pmatrix}, \\quad \\mathcal{O} = \\begin{pmatrix} C \\\\ CA \\end{pmatrix}",
    instruction: "האם המערכת ניתנת לשליטה מלאה (Controllable) ולצפייה מלאה (Observable) לפי קלמן?",
    options: [
      {
        id: "ctrl-q07-opt1",
        plainText: "המערכת נשלטת לחלוטין ואינה ניתנת לצפייה.",
        isCorrect: false,
        explanation: "שגוי: מטריצת השליטות אינה מדרגה מלאה (השורה השנייה מתאפסת).",
      },
      {
        id: "ctrl-q07-opt2",
        plainText: "המערכת נשלטת לחלוטין וניתנת לצפייה מלאה.",
        isCorrect: false,
        explanation: "שגוי: דרגת מטריצת השליטות היא 1 ולא 2.",
      },
      {
        id: "ctrl-q07-opt3",
        mathText: "\\operatorname{rank}(\\mathcal{C}) = 1 < 2, \\quad \\operatorname{rank}(\\mathcal{O}) = 2",
        plainText: "המערכת אינה נשלטת (Uncontrollable), אך ניתנת לצפייה מלאה (Observable).",
        isCorrect: true,
        explanation: "נכון: 1. שליטות: $AB = \\begin{pmatrix} 1 & 2 \\\\ 0 & -3 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$. מטריצת השליטות היא $\\mathcal{C} = \\begin{pmatrix} 1 & 1 \\\\ 0 & 0 \\end{pmatrix}$. הדרגה היא $\\operatorname{rank}(\\mathcal{C}) = 1 < 2$, ולכן משתנה המצב השני אינו נשלט ע״י המבוא. 2. צפיות: $CA = \\begin{pmatrix} 1 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 2 \\\\ 0 & -3 \\end{pmatrix} = \\begin{pmatrix} 1 & -1 \\end{pmatrix}$. מטריצת הצפיות היא $\\mathcal{O} = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$. הדטרמיננטה היא $-1 - 1 = -2 \\neq 0$, ולכן $\\operatorname{rank}(\\mathcal{O}) = 2$ מלאה, והמערכת צפייה לחלוטין.",
      },
      {
        id: "ctrl-q07-opt4",
        plainText: "המערכת אינה נשלטת ואינה צפייה.",
        isCorrect: false,
        explanation: "שגוי: מטריצת הצפיות בעלת דרגה מלאה ולכן המערכת כן צפייה.",
      }
    ],
  },
  {
    id: "ctrl-q08-ackermann-formula-state-feedback",
    domain: "מיקום קטבים במשוב מצב (נוסחת אקרמן)",
    title: "תורת הבקרה - מיקום קטבים במשוב מצב (נוסחת אקרמן)",
    context: "במערכת LTI נשלטת $\\dot{x} = Ax + Bu$, מעוניינים למקם את קטבי החוג הסגור של מטריצת המצב $(A - BK)$ בשורשי הפולינום הרצוי $\\alpha_c(s) = s^n + \\alpha_{n-1}s^{n-1} + \\dots + \\alpha_0$.",
    formulaLatex: "K = \\begin{pmatrix} 0 & 0 & \\dots & 1 \\end{pmatrix} \\mathcal{C}^{-1} \\alpha_c(A)",
    instruction: "מהו התנאי המתמטי ההכרחי והמספיק שבלעדיו לא ניתן ליישם את נוסחת אקרמן להשגת קטבים רצויים שרירותיים?",
    options: [
      {
        id: "ctrl-q08-opt1",
        plainText: "המטריצה $A$ חייבת להיות סימטרית והפיכה.",
        isCorrect: false,
        explanation: "שגוי: $A$ יכולה להיות לא הפיכה (קוטב ב-0) ולא סימטרית.",
      },
      {
        id: "ctrl-q08-opt2",
        plainText: "המערכת חייבת להיות יציבה אסימפטוטית בחוג פתוח.",
        isCorrect: false,
        explanation: "שגוי: אחת המטרות העיקריות של משוב מצב היא לייצב מערכות בלתי-יציבות מובהקות בחוג פתוח.",
      },
      {
        id: "ctrl-q08-opt3",
        mathText: "\\det(\\mathcal{C}) \\neq 0 \\iff \\operatorname{rank}(\\mathcal{C}) = n",
        plainText: "המערכת חייבת להיות נשלטת לחלוטין (Controllable, $\\operatorname{rank}(\\mathcal{C}) = n$), כך שמטריצת השליטות $\\mathcal{C}$ תהיה הפיכה.",
        isCorrect: true,
        explanation: "נכון: נוסחת אקרמן כוללת את איבר ההיפוך $\\mathcal{C}^{-1}$. אם המערכת אינה נשלטת במלואה, מטריצת השליטות סינגולרית (בעלת דטרמיננטה 0) ולא ניתנת להיפוך. משפט קלמן קובע כי ניתן למקם את כל $n$ הקטבים של המערכת במיקומים שרירותיים במישור המרוכב (בזוגות צמודים) אם ורק אם המערכת נשלטת לחלוטין; קטבים במרחב הבלתי-נשלט אינם ניתנים להזזה על ידי שום וקטור משוב $K$.",
      },
      {
        id: "ctrl-q08-opt4",
        plainText: "המבוא $u(t)$ חייב להיות מוגבל לטווח סינוסואידלי בלבד.",
        isCorrect: false,
        explanation: "שגוי: משוב מצב מבוסס על ערכי המצב הפנימיים $u = -Kx$ ואינו תלוי בכניסה הרמונית.",
      }
    ],
  },
  {
    id: "ctrl-q09-bode-sensitivity-waterbed-effect",
    domain: "פונקציית רגישות (Sensitivity) ואפקט מיטת המים של בודה",
    title: "תורת הבקרה - פונקציית רגישות (Sensitivity) ואפקט מיטת המים של בודה",
    context: "במערכת משוב עם חוג פתוח $L(s)$, פונקציית הרגישות מוגדרת כ-$S(s) = \\frac{1}{1 + L(s)}$. משפט אינטגרל הרגישות של בודה (Bode's Sensitivity Integral) קובע עבור מערכת יציבה בחוג פתוח עם לפחות שני קטבים יותר מאפסים ($n - m \\ge 2$):",
    formulaLatex: "\\int_0^\\infty \\ln |S(j\\omega)| \\, d\\omega = 0",
    instruction: "מהי המשמעות ההנדסית של שוויון זה (המכונה \"Waterbed Effect\") בתכנון בקרה?",
    options: [
      {
        id: "ctrl-q09-opt1",
        plainText: "ניתן לדכא הפרעות בכל תחום התדרים בו-זמנית על ידי הגדלת ההגבר $K \\to \\infty$.",
        isCorrect: false,
        explanation: "שגוי: הגדלת הגבר מקטינה רגישות בתדר נמוך אך מעלה אותה בחדות סביב תדר החיתוך.",
      },
      {
        id: "ctrl-q09-opt2",
        plainText: "המערכת חסינה לחלוטין מפני רעשי מדידה בתדרים גבוהים.",
        isCorrect: false,
        explanation: "שגוי: רעשי מדידה נשלטים ע״י פונקציית הרגישות המשלימה $T(s)$, ומקיימים $S + T = 1$.",
      },
      {
        id: "ctrl-q09-opt3",
        plainText: "שיפור ביצועים ודיכוי הפרעות בתחום תדרים מסוים ($|S(j\\omega)| < 1$) מחייב בהכרח הרעה והגברת רגישות ($|S(j\\omega)| > 1$) בתחום תדרים אחר; \"לחיצה על המים\" במקום אחד מעלה אותם במקום אחר.",
        isCorrect: true,
        explanation: "נכון: מאחר שהאינטגרל של $\\ln |S(j\\omega)|$ על פני כל התדרים שווה לאפס, השטח שבו $\\ln|S| < 0$ (כלומר $|S| < 1$, דיכוי הפרעות מוצלח) חייב להתאזן במדויק עם שטח שבו $\\ln|S| > 0$ (כלומר $|S| > 1$, הגברת רעשים והפרעות). זוהי מגבלה יסודית בפיזיקה של מערכות משוב ליניאריות: לא ניתן להנחית רגישות בכל מקום; אם משפרים עקיבה ודיכוי הפרעות בתדרים נמוכים, משלמים על כך בהכרח בהגברת רגישות לתנודות סביב תדר החיתוך.",
      },
      {
        id: "ctrl-q09-opt4",
        plainText: "האינטגרל מוכיח שפונקציית הרגישות תמיד שווה ל-1 בכל תדר.",
        isCorrect: false,
        explanation: "שגוי: אם $S=1$ בכל תדר, פירוש הדבר שאין משוב פעיל כלל במערכת.",
      }
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "ctrl-q10-second-order-step-response-overshoot",
    domain: "תגובת מערכת מסדר שני למדרגה ושיא תנודה (Overshoot)",
    title: "תורת הבקרה - תגובת מערכת מסדר שני למדרגה ושיא תנודה (Overshoot)",
    context: "מערכת מסדר שני סטנדרטית בחוג סגור מתוארת ע״י $T(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta \\omega_n s + \\omega_n^2}$ עם מקדם ריסון בתחום תת-ריסון $0 < \\zeta < 1$.",
    formulaLatex: "M_p = e^{-\\frac{\\pi \\zeta}{\\sqrt{1 - \\zeta^2}}} \\times 100\\%, \\quad t_p = \\frac{\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}}",
    instruction: "מהו שיא התנודה באחוזים ($M_p$) אם נתון כי מקדם הריסון הוא $\\zeta = \\frac{1}{\\sqrt{2}} \\approx 0.707$?",
    options: [
      {
        id: "ctrl-q10-opt1",
        plainText: "$M_p = 50\\%$",
        isCorrect: false,
        explanation: "שגוי: $50\\%$ מתקבל עבור מקדם ריסון נמוך בהרבה (כ-$0.2$).",
      },
      {
        id: "ctrl-q10-opt2",
        plainText: "$M_p = 16.3\\%$",
        isCorrect: false,
        explanation: "שגוי: $16.3\\%$ הוא ה-Overshoot המתקבל עבור $\\zeta = 0.5$.",
      },
      {
        id: "ctrl-q10-opt3",
        plainText: "$M_p = 0\\%$ (ללא שום תנודה מעבר לערך המדרגה)",
        isCorrect: false,
        explanation: "שגוי: $M_p = 0$ מתקבל רק בריסון קריטי $\\zeta \\ge 1$; עבור $\\zeta = 0.707$ עדיין קיים אוברשוט קטן.",
      },
      {
        id: "ctrl-q10-opt4",
        mathText: "M_p = e^{-\\frac{\\pi (1/\\sqrt{2})}{\\sqrt{1 - 1/2}}} = e^{-\\pi} \\approx 4.32\\%",
        plainText: "$M_p = e^{-\\pi} \\approx 4.32\\%$",
        isCorrect: true,
        explanation: "נכון: נציב $\\zeta = 1/\\sqrt{2}$: $\\sqrt{1 - \\zeta^2} = \\sqrt{1 - 1/2} = 1/\\sqrt{2}$. היחס במעריך הוא $\\frac{\\zeta}{\\sqrt{1 - \\zeta^2}} = \\frac{1/\\sqrt{2}}{1/\\sqrt{2}} = 1$. לכן שיא התנודה הוא במדויק: $M_p = e^{-\\pi \\times 1} = e^{-\\pi} \\approx 0.04321 = 4.32\\%$. זהו ערך תכנון קלאסי ומקובל מאוד בהנדסה המבטיח ריסון מצוין עם תגובה מהירה.",
      }
    ],
  },
  {
    id: "ctrl-q11-pid-controller-derivative-kick-filtering",
    domain: "בקרת PID ותופעת בעיטת הנגזרת (Derivative Kick)",
    title: "תורת הבקרה - בקרת PID ותופעת בעיטת הנגזרת (Derivative Kick)",
    context: "בקר PID אידיאלי פועל על אות השגיאה $e(t) = r(t) - y(t)$: $u(t) = K_p e(t) + K_i \\int_0^t e(\\tau)d\\tau + K_d \\frac{de(t)}{dt}$. למערכת מוזן אות מדרגה בכניסה ($r(t) = A u(t)$).",
    formulaLatex: "\\frac{de(t)}{dt} = \\frac{dr(t)}{dt} - \\frac{dy(t)}{dt} = A \\delta(t) - \\frac{dy(t)}{dt}",
    instruction: "מה גורם לאיבר הנגזרת ($D$) לייצר אות בקרה הרסני ברגע קפיצת המדרגה (Derivative Kick), וכיצד פותרים זאת במימוש תעשייתי תקני?",
    options: [
      {
        id: "ctrl-q11-opt1",
        plainText: "האיבר האינטגרלי $K_i$ גורם לרוויה (Windup), והפתרון הוא איפוס האינטגרל.",
        isCorrect: false,
        explanation: "שגוי: זוהי בעיית Integral Windup הנפרדת מתופעת הנגזרת.",
      },
      {
        id: "ctrl-q11-opt2",
        plainText: "ההגבר הפרופורציוני $K_p$ מתבדר לאינסוף, ויש להקטינו לאפס.",
        isCorrect: false,
        explanation: "שגוי: האיבר הפרופורציוני קופץ בקפיצה סופית בגודל $K_p A$, ואינו מתבדר לאינסוף.",
      },
      {
        id: "ctrl-q11-opt3",
        plainText: "הגזירה גורמת לעיכוב פאזה של $90^\\circ$ המבטל את היציבות, ויש להחליפו במפצה Lag.",
        isCorrect: false,
        explanation: "שגוי: פעולת הגזירה מוסיפה פאזה חיובית ($+90^\\circ$) ולא מעכבת פאזה.",
      },
      {
        id: "ctrl-q11-opt4",
        plainText: "גזירת מדרגת הייחוס $\\frac{dr}{dt}$ מייצרת הלם אינסופי ($A\\delta(t)$) המכה במפעילי המערכת (Actuators); הפתרון התעשייתי הוא גזירת אות המוצא בלבד (Derivative on Measurement: $-K_d \\frac{dy}{dt}$) בשילוב מסנן מעביר-נמוכים (LP Filter).",
        isCorrect: true,
        explanation: "נכון: מכיוון ש-$e(t) = r(t) - y(t)$, שינוי חד במדרגת הייחוס גורר שנגזרת אות הייחוס היא פונקציית דלתא אינסופית $\\frac{dr}{dt} = A \\delta(t)$. איבר הנגזרת מנסה להוציא פולס מתח/זרם אינסופי (Derivative Kick) שדוחף את המפעיל לרוויה חריפה וגורם לבלאי מכני. בבקרים תעשייתיים מיישמים שתי הגנות: 1. גזירת אות המדידה $y(t)$ בלבד במקום אות השגיאה: $u_D(s) = -\\frac{K_d s}{1 + s T_f} Y(s)$, משום שהמוצא הפיזיקלי $y(t)$ רציף ואינו קופץ במדרגה. 2. הוספת קוטב סינון בתדר גבוה ($1/(1 + s T_f)$) למניעת הגברת רעשי מדידה.",
      }
    ],
  },
  {
    id: "ctrl-q12-luenberger-observer-separation-principle",
    domain: "צופה מצב (לואנברגר) ועקרון ההפרדה (Separation Principle)",
    title: "תורת הבקרה - צופה מצב (לואנברגר) ועקרון ההפרדה (Separation Principle)",
    context: "במערכת מרובת-מצבים $\\dot{x} = Ax + Bu, y = Cx$, בונים צופה מצב של לואנברגר $\\dot{\\hat{x}} = A\\hat{x} + Bu + L(y - C\\hat{x})$ ומפעילים משוב מצב מבוסס שערוך: $u = -K\\hat{x}$.",
    formulaLatex: "\\begin{pmatrix} \\dot{x} \\\\ \\dot{e} \\end{pmatrix} = \\begin{pmatrix} A - BK & BK \\\\ 0 & A - LC \\end{pmatrix} \\begin{pmatrix} x \\\\ e \\end{pmatrix}, \\quad e = x - \\hat{x}",
    instruction: "מה קובע עקרון ההפרדה (Separation Principle) לגבי תכנון הבקר ($K$) וצופה המצב ($L$)?",
    options: [
      {
        id: "ctrl-q12-opt1",
        plainText: "לא ניתן לתכנן את $K$ ללא ידיעת מטריצת הצופה $L$, והם חייבים להיפתר במשותף כבעיית אופטימיזציה ריבועית משולבת.",
        isCorrect: false,
        explanation: "שגוי: זוהי בדיוק מהותו של עקרון ההפרדה — ביטול הצורך בתכנון משותף.",
      },
      {
        id: "ctrl-q12-opt2",
        plainText: "קטבי המערכת בחוג סגור שווים למכפלת הקטבים של הבקר והצופה.",
        isCorrect: false,
        explanation: "שגוי: הקטבים הם איחוד (סכום שורשים) ולא מכפלה.",
      },
      {
        id: "ctrl-q12-opt3",
        plainText: "צופה המצב מבטל את יציבות המערכת אם למטריצה $A$ יש ערכים עצמיים שליליים.",
        isCorrect: false,
        explanation: "שגוי: צופה מתוכנן נכון מייצב את שגיאת השערוך $e(t) \\to 0$ לכל מטריצה $A$ צפייה.",
      },
      {
        id: "ctrl-q12-opt4",
        mathText: "\\det \\begin{pmatrix} sI - (A - BK) & -BK \\\\ 0 & sI - (A - LC) \\end{pmatrix} = \\det(sI - (A - BK)) \\cdot \\det(sI - (A - LC))",
        plainText: "ניתן לתכנן את וקטור המשוב $K$ ואת וקטור הגברי הצופה $L$ באופן בלתי-תלוי לחלוטין; $2n$ הקטבים של המערכת המשולבת בחוג סגור הם בדיוק איחוד $n$ הקטבים שנקבעו ע״י הבקר ($A - BK$) ו-$n$ הקטבים שנקבעו ע״י הצופה ($A - LC$).",
        isCorrect: true,
        explanation: "נכון: בהגדרת שגיאת השערוך $e = x - \\hat{x}$, הדינמיקה המשותפת מקבלת מבנה בלוקים משולשי עליון: שגיאת הצופה מקיימת $\\dot{e} = (A - LC)e$ ואינה תלויה ב-$K$ או ב-$u$. הדטרמיננטה של מטריצת בלוקים משולשית שווה בדיוק למכפלת הדטרמיננטות של הבלוקים האלכסוניים: $\\det(sI - A_{cl}) = \\det(sI - (A - BK)) \\cdot \\det(sI - (A - LC))$. לכן, שורשי המשוואה האופיינית הכוללת הם איחוד הקטבים של המשוב ושל הצופה, וניתן לתכנן כל אחד מהם בנפרד (בדרך כלל בוחרים את קטבי הצופה מהירים פי 2 עד פי 5 מקטבי הבקר).",
      }
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_CONTROL_THEORY_QUESTIONS = CONTROL_THEORY_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Routh-Hurwitz / system type / root locus (Q1–3)
 * - 1 from Nyquist / Bode margins / Lead-Lag (Q4–6)
 * - 1 from Kalman / Ackermann / waterbed / overshoot / PID / observer (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleControlTheoryOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = CONTROL_THEORY_QUESTIONS.slice(0, 3);
  const groupB = CONTROL_THEORY_QUESTIONS.slice(3, 6);
  const groupC = CONTROL_THEORY_QUESTIONS.slice(6, 12);

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
