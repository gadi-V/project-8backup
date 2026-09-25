import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Signals & Systems diagnostic bank (12Q).
 * Display name: "אותות ומערכות" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const SIGNALS_SYSTEMS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "sig-q01-lti-bibo-stability-impulse",
    domain: "תכונות מערכות LTI ויציבות BIBO",
    title: "אותות ומערכות - תכונות מערכות LTI ויציבות BIBO",
    context:
      "נתונה מערכת LTI רציפה בזמן בעלת תגובה להלם $h(t) = e^{-2t} u(t - 1) + \\delta(t - 3)$.",
    formulaLatex: "\\int_{-\\infty}^{\\infty} |h(t)| \\, dt < \\infty",
    instruction:
      "מה ניתן לקבוע לגבי סיבתיות (Causality) ויציבות BIBO של המערכת?",
    options: [
      {
        id: "sig-q01-opt1",
        plainText: "המערכת סיבתית ויציבה BIBO.",
        isCorrect: true,
        explanation:
          "נכון: מערכת LTI רציפה היא סיבתית אם ורק אם $h(t) = 0$ לכל $t < 0$. כאן $h(t)$ נתמך עבור $t \\ge 1$ בלבד (הודות ל-$u(t-1)$ והלם ב-$t=3$), ולכן היא סיבתית. תנאי הכרחי ומספיק ליציבות BIBO הוא אינטגרביליות בהחלט של התגובה להלם: $\\int_{-\\infty}^\\infty |h(t)|dt = \\int_1^\\infty e^{-2t}dt + \\int_{-\\infty}^\\infty \\delta(t-3)dt = \\frac{e^{-2}}{2} + 1 < \\infty$, ולכן המערכת יציבה.",
      },
      {
        id: "sig-q01-opt2",
        plainText:
          "המערכת אינה סיבתית אך יציבה BIBO עקב נוכחות ההלם המושהה.",
        isCorrect: false,
        explanation:
          "שגוי: הלם ב-$t=3$ מופיע בזמן חיובי ($t > 0$) ואינו מפר סיבתיות בשום אופן.",
      },
      {
        id: "sig-q01-opt3",
        plainText:
          "המערכת סיבתית אך אינה יציבה BIBO משום שההלם מתבדר באינסוף.",
        isCorrect: false,
        explanation:
          "שגוי: האינטגרל של פונקציית דלתא שווה בדיוק ל-1 (סופי), ולכן אינו פוגע ביציבות BIBO.",
      },
      {
        id: "sig-q01-opt4",
        plainText: "המערכת אינה סיבתית ואינה יציבה BIBO.",
        isCorrect: false,
        explanation:
          "שגוי: התגובה להלם מתאפסת זהותית לכל $t < 0$ ובעלת אינטגרל סופי בהחלט.",
      },
    ],
  },
  {
    id: "sig-q02-fourier-series-dirichlet-gibbs",
    domain: "טורי פורייה רציפים ותופעת גיבס",
    title: "אותות ומערכות - טורי פורייה רציפים ותופעת גיבס",
    context:
      "יהי $x(t)$ אות מחזורי עם זמן מחזור $T_0 = 2$, המוגדר בקטע $[-1, 1)$ על ידי $x(t) = \\begin{cases} -1 & -1 \\le t < 0 \\\\ +1 & 0 \\le t < 1 \\end{cases}$ (גל מרובע אי-זוגי). מפתחים את $x(t)$ לטור פורייה $\\sum_{k=-\\infty}^\\infty a_k e^{j k \\omega_0 t}$.",
    formulaLatex:
      "x(t) \\sim \\sum_{k=1,3,5,\\dots}^\\infty \\frac{4}{\\pi k} \\sin(k\\pi t)",
    instruction:
      "מהו ערך סכום הטור בנקודת אי-הרציפות $t = 0$, ומה מאפיין את קירוב הטור הסופי $x_N(t)$ בסביבת נקודה זו?",
    options: [
      {
        id: "sig-q02-opt1",
        plainText:
          "הטור מתכנס לממוצע הגבולות החד-צדדיים $\\frac{x(0^+) + x(0^-)}{2} = 0$, ובסביבת $t = 0$ מתרחשת תופעת גיבס עם אוברשוט של כ-$9\\%$ מגודל הקפיצה שאינו דועך כאשר $N \\to \\infty$.",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט דיריכלה, בנקודת אי-רציפות מסוג קפיצה טור פורייה מתכנס לממוצע הגבולות החד-צדדיים: $\\frac{1 + (-1)}{2} = 0$. תופעת גיבס קובעת כי קירוב של טור קטוע מפתח תנודות יתר (Overshoot) של כ-$8.95\\%$ מגודל הקפיצה הכוללת (כאן הקפיצה היא 2 ולכן האוברשוט כ-$0.18$), ורוחב התנודה מתכווץ אך גובהה נשאר קבוע גם כאשר $N \\to \\infty$.",
      },
      {
        id: "sig-q02-opt2",
        plainText:
          "הטור מתכנס לערך הימני $x(0^+) = 1$, והאוברשוט דועך לאפס בקצב של $O(1/N)$.",
        isCorrect: false,
        explanation:
          "שגוי: הטור אינו בוחר צד אחד אלא מתכנס בדיוק לממוצע, ותופעת גיבס אינה דועכת בגובהה באף $N$.",
      },
      {
        id: "sig-q02-opt3",
        plainText:
          "הטור אינו מתכנס כלל בנקודה $t = 0$ עקב אי-קיום תנאי דיריכלה.",
        isCorrect: false,
        explanation:
          "שגוי: גל מרובע מקיים את כל תנאי דיריכלה (מספר סופי של נקודות אי-רציפות וקיצון במחזור ואינטגרבילי בהחלט).",
      },
      {
        id: "sig-q02-opt4",
        plainText:
          "הטור מתכנס במידה שווה (Uniformly) בכל הישר הממשי כולל ב-$t = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: התכנסות במידה שווה דורשת פונקציה רציפה בכל מקום; אי-רציפות שוללת התכנסות במ״ש ויוצרת את תופעת גיבס.",
      },
    ],
  },
  {
    id: "sig-q03-ctft-duality-sinc-rect",
    domain: "התמרת פורייה ודואליות פולס-Sinc",
    title: "אותות ומערכות - התמרת פורייה ודואליות פולס-Sinc",
    context:
      "נתונה התמרת פורייה הרציפה של פולס מלבני: $\\mathcal{F}\\{\\operatorname{rect}(t/T)\\} = T \\operatorname{sinc}\\left(\\frac{\\omega T}{2\\pi}\\right) = \\frac{2\\sin(\\omega T / 2)}{\\omega}$. אנו מעוניינים לחשב את ההתמרה של האות $x(t) = \\operatorname{sinc}(W t) = \\frac{\\sin(\\pi W t)}{\\pi W t}$.",
    formulaLatex:
      "\\mathcal{F}\\{x(t)\\} = \\int_{-\\infty}^\\infty x(t)e^{-j\\omega t}\\,dt, \\quad \\mathcal{F}\\{X(t)\\} = 2\\pi x(-\\omega)",
    instruction:
      "מהי התמרת פורייה $X(j\\omega)$ של האות $x(t) = \\operatorname{sinc}(W t)$ לפי תכונת הדואליות?",
    options: [
      {
        id: "sig-q03-opt1",
        plainText:
          "$X(j\\omega) = \\frac{1}{W} \\operatorname{rect}\\left(\\frac{\\omega}{2\\pi W}\\right) = \\begin{cases} \\frac{1}{W} & |\\omega| \\le \\pi W \\\\ 0 & |\\omega| > \\pi W \\end{cases}$",
        mathText:
          "X(j\\omega) = \\frac{1}{W} \\operatorname{rect}\\left(\\frac{\\omega}{2\\pi W}\\right)",
        isCorrect: true,
        explanation:
          "נכון: לפי עקרון הדואליות: אם $\\mathcal{F}\\{f(t)\\} = F(\\omega)$, אזי $\\mathcal{F}\\{F(t)\\} = 2\\pi f(-\\omega)$. נגדיר $f(t) = \\operatorname{rect}(t/\\tau) \\implies F(\\omega) = \\tau \\operatorname{sinc}(\\frac{\\omega \\tau}{2\\pi})$. נציב $\\tau = 2\\pi W$ ונקבל את האות המבוקש. התמרתו היא פולס מלבני אידיאלי במישור התדר החסום בין $-\\pi W$ ל-$+\\pi W$ עם גובה $1/W$.",
      },
      {
        id: "sig-q03-opt2",
        plainText: "$X(j\\omega) = W \\operatorname{rect}\\left(\\frac{\\omega}{\\pi W}\\right)$",
        isCorrect: false,
        explanation:
          "שגוי: חלוקה/כפל שגויים בקבוע $W$, ורוחב סרט שגוי בפקטור 2.",
      },
      {
        id: "sig-q03-opt3",
        plainText: "$X(j\\omega) = \\frac{\\pi}{W} e^{-j\\omega W}$",
        isCorrect: false,
        explanation:
          "שגוי: התמרת Sinc היא ממשית וסימטרית (מלבן בתדר) ואינה מכילה פאזה מעריכית ללא היסט בזמן.",
      },
      {
        id: "sig-q03-opt4",
        plainText: "$X(j\\omega) = \\frac{1}{1 + (\\omega/W)^2}$",
        isCorrect: false,
        explanation:
          "שגוי: פונקציה לורנציאנית זו היא התמרת פורייה של אקספוננט דועך דו-צדדי $e^{-W|t|}$, ולא של פונקציית Sinc.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "sig-q04-nyquist-shannon-sampling-aliasing",
    domain: "משפט הדגימה של נייקוויסט ועיוות קיפול",
    title: "אותות ומערכות - משפט הדגימה של נייקוויסט ועיוות קיפול (Aliasing)",
    context:
      "נתון האות הרציף $x(t) = \\cos(120\\pi t) + 2\\sin(300\\pi t)$. דוגמים את האות בתדר דגימה $f_s = 200\\text{ Hz}$ ליצירת הסדרה הבדידה $x[n] = x(n/f_s)$. לאחר מכן משחזרים את האות באמצעות מסנן שחזור אידיאלי (Low-Pass Filter) בעל תדר קטעון $f_c = 100\\text{ Hz}$.",
    formulaLatex:
      "x(t) = \\cos(2\\pi \\cdot 60 t) + 2\\sin(2\\pi \\cdot 150 t), \\quad f_s = 200\\text{ Hz}",
    instruction: "מהו האות המשוחזר $x_r(t)$ שיתקבל במוצא מסנן השחזור?",
    options: [
      {
        id: "sig-q04-opt1",
        plainText:
          "$x_r(t) = \\cos(120\\pi t) + 2\\sin(300\\pi t)$ (שחזור מושלם ללא שגיאה)",
        isCorrect: false,
        explanation:
          "שגוי: הרכיב השני הוא בתדר $f_2 = 150\\text{ Hz}$, הדורש תדר נייקוויסט של לפחות $300\\text{ Hz}$. דגימה ב-$200\\text{ Hz}$ מפרה את משפט הדגימה ויוצרת Aliasing חמור.",
      },
      {
        id: "sig-q04-opt2",
        plainText: "$x_r(t) = \\cos(120\\pi t) - 2\\sin(100\\pi t)$",
        mathText: "x_r(t) = \\cos(2\\pi \\cdot 60 t) - 2\\sin(2\\pi \\cdot 50 t)",
        isCorrect: true,
        explanation:
          "נכון: תדרי האות הם $f_1 = 60\\text{ Hz}$ ו-$f_2 = 150\\text{ Hz}$. הרכיב הראשון ($60\\text{ Hz} < f_s/2 = 100\\text{ Hz}$) עובר ללא עיוות. הרכיב השני סובל מקיפול (Aliasing): התדר המדומה הוא $|150 - 200| = 50\\text{ Hz}$. בשחזור דיגיטלי: $\\sin(2\\pi \\frac{150}{200} n) = \\sin(2\\pi \\frac{3}{4} n) = \\sin(2\\pi n - 2\\pi \\frac{1}{4} n) = -\\sin(2\\pi \\cdot 50 \\frac{n}{200})$. לכן הרכיב משוחזר כתדר $50\\text{ Hz}$ בהיפוך מופע: $-2\\sin(100\\pi t)$.",
      },
      {
        id: "sig-q04-opt3",
        plainText:
          "$x_r(t) = \\cos(120\\pi t)$ בלבד (הרכיב המהיר נבלם לחלוטין ע״י המסנן)",
        isCorrect: false,
        explanation:
          "שגוי: הרכיב המהיר מקופל לתדר $50\\text{ Hz}$ שנמצא בתוך רוחב הפס של המסנן ($< 100\\text{ Hz}$) ולכן אינו נבלם, אלא מופיע כתדר שגוי.",
      },
      {
        id: "sig-q04-opt4",
        plainText: "$x_r(t) = \\cos(120\\pi t) + 2\\sin(100\\pi t)$",
        isCorrect: false,
        explanation:
          "שגוי: נשמט סימן המינוס הנובע מהזזת המופע של גל הסינוס מעבר למחצית תדר הדגימה.",
      },
    ],
  },
  {
    id: "sig-q05-laplace-roc-causality-stability",
    domain: "התמרת לפלס ותחום התכנסות",
    title: "אותות ומערכות - התמרת לפלס ותחום התכנסות (ROC)",
    context:
      "פונקציית התמסורת של מערכת LTI רציפה בזמן נתונה ע״י $H(s) = \\frac{s - 2}{(s + 1)(s - 3)}$. למערכת קטבים ב-$s = -1$ וב-$s = 3$.",
    formulaLatex: "H(s) = \\frac{s - 2}{(s + 1)(s - 3)}",
    instruction:
      "מהו תחום ההתכנסות (ROC) של המערכת אם ידוע כי היא יציבה במובן BIBO, והאם היא סיבתית במצב זה?",
    options: [
      {
        id: "sig-q05-opt1",
        plainText:
          "$\\operatorname{Re}(s) > 3$; המערכת סיבתית ויציבה BIBO.",
        isCorrect: false,
        explanation:
          "שגוי: תחום זה נמצא מימין לקוטב הימני ביותר ולכן המערכת סיבתית, אך הוא אינו מכיל את הציר המדומה ($j\\omega$), ולכן המערכת אינה יציבה BIBO.",
      },
      {
        id: "sig-q05-opt2",
        plainText:
          "$-1 < \\operatorname{Re}(s) < 3$; המערכת יציבה BIBO אך אינה סיבתית (אנטי-סיבתית בחלקה).",
        mathText: "-1 < \\operatorname{Re}(s) < 3",
        isCorrect: true,
        explanation:
          "נכון: מערכת LTI יציבה BIBO אם ורק אם תחום ההתכנסות (ROC) מכיל את הציר המדומה $\\operatorname{Re}(s) = 0$. הרצועה היחידה המכילה את $s=0$ היא $-1 < \\operatorname{Re}(s) < 3$. מאידך, מערכת היא סיבתית אם ורק אם ה-ROC הוא חצי-מישור ימני מהצורה $\\operatorname{Re}(s) > \\max(\\operatorname{Re}(p_i))$. מכיוון שכאן ה-ROC חסום בין שני קטבים (רצועה אנכית), התגובה להלם היא דו-צדדית והמערכת אינה סיבתית.",
      },
      {
        id: "sig-q05-opt3",
        plainText:
          "$\\operatorname{Re}(s) < -1$; המערכת אנטי-סיבתית ויציבה BIBO.",
        isCorrect: false,
        explanation:
          "שגוי: התחום $\\operatorname{Re}(s) < -1$ אינו מכיל את הציר המדומה ולכן אינו יציב.",
      },
      {
        id: "sig-q05-opt4",
        plainText:
          "כל המישור המרוכב פרט ל-$s = -1, 3$; המערכת יציבה תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: ה-ROC של התמרת לפלס לעולם אינו מכיל נקודות מבודדות אלא רצועות אנכיות רציפות בלבד.",
      },
    ],
  },
  {
    id: "sig-q06-dtft-lpf-ideal-impulse-response",
    domain: "מסנן תדר נמוך אידיאלי ותגובה להלם בדידה",
    title: "אותות ומערכות - מסנן תדר נמוך אידיאלי (DTFT) ותגובה להלם בדידה",
    context:
      "מסנן בדיד אידיאלי מעביר נמוכים (Ideal Discrete LPF) מוגדר בתחום התדר הבסיסי $[-\\pi, \\pi]$ על ידי תגובת תדר $H(e^{j\\omega}) = \\begin{cases} 1 & |\\omega| \\le \\omega_c \\\\ 0 & \\omega_c < |\\omega| \\le \\pi \\end{cases}$ (כאשר $0 < \\omega_c < \\pi$).",
    formulaLatex:
      "h[n] = \\frac{1}{2\\pi}\\int_{-\\pi}^{\\pi} H(e^{j\\omega})e^{j\\omega n}\\,d\\omega",
    instruction:
      "מהי התגובה להלם $h[n]$ של המסנן, ומדוע לא ניתן לממשו במערכת זמן-אמת מעשית?",
    options: [
      {
        id: "sig-q06-opt1",
        plainText:
          "$h[n] = \\omega_c \\operatorname{rect}\\left(\\frac{n}{\\omega_c}\\right)$, והוא סובל מדליפת זיכרון בחומרה.",
        isCorrect: false,
        explanation:
          "שגוי: התמרת מלבן בתדר היא פונקציית Sinc בזמן ולא מלבן.",
      },
      {
        id: "sig-q06-opt2",
        plainText:
          "$h[n] = \\frac{\\sin(\\omega_c n)}{\\pi n}$, והוא אינו בר-מימוש משום שהוא דו-צדדי ואינו סיבתי ($h[n] \\neq 0$ עבור $n < 0$) ובעל תמיכה אינסופית.",
        mathText:
          "h[n] = \\frac{\\sin(\\omega_c n)}{\\pi n} = \\frac{\\omega_c}{\\pi}\\operatorname{sinc}\\left(\\frac{\\omega_c n}{\\pi}\\right)",
        isCorrect: true,
        explanation:
          "נכון: אינטגרל ההתמרה ההפוכה: $h[n] = \\frac{1}{2\\pi}\\int_{-\\omega_c}^{\\omega_c} e^{j\\omega n}d\\omega = \\frac{1}{2\\pi j n}[e^{j\\omega_c n} - e^{-j\\omega_c n}] = \\frac{\\sin(\\omega_c n)}{\\pi n}$. פונקציה זו סימטרית סביב $n=0$ ואינה מתאפסת לאף $n < 0$, מה שמחייב ידיעה של דגימות עתידיות אינסופיות ולכן שולל סיבתיות ומימוש בזמן-אמת.",
      },
      {
        id: "sig-q06-opt3",
        plainText:
          "$h[n] = \\cos(\\omega_c n) u[n]$, והוא אינו יציב BIBO משום שהקוסינוס אינו דועך.",
        isCorrect: false,
        explanation:
          "שגוי: תגובת ההלם היא פונקציית סינוס מחולקת ב-$n$ הדועכת אסימפטוטית כ-$1/n$.",
      },
      {
        id: "sig-q06-opt4",
        plainText:
          "$h[n] = \\delta[n] - \\frac{\\sin(\\omega_c n)}{\\pi n}$, והוא מתאר מסנן מעביר גבוהים (HPF).",
        isCorrect: false,
        explanation:
          "שגוי: זהו הביטוי למסנן מעביר גבוהים (High-Pass), ולא למסנן מעביר נמוכים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "sig-q07-z-transform-roc-properties",
    domain: "התמרת Z ותכונות יציבות של אות בדיד",
    title: "אותות ומערכות - התמרת Z ותכונות יציבות של אות בדיד",
    context:
      "נתונה התמרת ה-Z של מערכת בדידה: $X(z) = \\frac{1}{1 - 0.5 z^{-1}} - \\frac{1}{1 - 2 z^{-1}}$. למערכת שני קטבים: $z = 0.5$ ו-$z = 2$.",
    formulaLatex:
      "X(z) = \\frac{1}{1 - 0.5 z^{-1}} - \\frac{1}{1 - 2 z^{-1}}, \\quad |z| = 1",
    instruction:
      "מהו תחום ההתכנסות (ROC) שמבטיח קיום התמרת פורייה בדידה (DTFT יציב), ומהו האות $x[n]$ המתאים בזמן?",
    options: [
      {
        id: "sig-q07-opt1",
        plainText:
          "$|z| > 2$, והאות הוא סיבתי $x[n] = (0.5)^n u[n] - 2^n u[n]$.",
        isCorrect: false,
        explanation:
          "שגוי: בתחום זה האות אמנם סיבתי, אך ה-ROC אינו מכיל את מעגל היחידה ($|z|=1$), ולכן האות מתבדר מעריכית ($2^n$) ואינו יציב BIBO (אין DTFT).",
      },
      {
        id: "sig-q07-opt2",
        plainText:
          "$|z| < 0.5$, והאות הוא אנטי-סיבתי $x[n] = -(0.5)^n u[-n-1] + 2^n u[-n-1]$.",
        isCorrect: false,
        explanation:
          "שגוי: תחום זה אינו מכיל את מעגל היחידה ולכן אינו יציב.",
      },
      {
        id: "sig-q07-opt3",
        plainText:
          "$0.5 < |z| < 2$, והאות הוא דו-צדדי $x[n] = (0.5)^n u[n] + 2^n u[-n-1]$.",
        mathText:
          "0.5 < |z| < 2, \\quad x[n] = (0.5)^n u[n] + 2^n u[-n-1]",
        isCorrect: true,
        explanation:
          "נכון: התמרת DTFT קיימת אם ורק אם תחום ההתכנסות של התמרת ה-Z מכיל את מעגל היחידה $|z| = 1$. הטבעת היחידה המכילה את מעגל היחידה היא $0.5 < |z| < 2$. קוטב ב-$0.5$ פונה החוצה ($|z| > 0.5$) ומייצג רכיב סיבתי $(0.5)^n u[n]$, בעוד שהקוטב ב-$2$ פונה פנימה ($|z| < 2$) ומייצג רכיב אנטי-סיבתי $-(-2^n)u[-n-1] = +2^n u[-n-1]$.",
      },
      {
        id: "sig-q07-opt4",
        plainText:
          "המערכת אינה יכולה להיות יציבה תחת שום ROC בגלל קיומו של קוטב מחוץ למעגל היחידה.",
        isCorrect: false,
        explanation:
          "שגוי: קוטב מחוץ למעגל היחידה מונע יציבות *סיבתית*, אך מאפשר יציבות עבור אות דו-צדדי שבו הקוטב מתורגם לרכיב שדועך שמאלה בזמן שלילי.",
      },
    ],
  },
  {
    id: "sig-q08-convolution-circ-vs-linear-zero-padding",
    domain: "קונבולוציה מעגלית מול קונבולוציה קווית",
    title:
      "אותות ומערכות - קונבולוציה מעגלית (DFT) מול קונבולוציה קווית וריפוד אפסים",
    context:
      "נתונים שני אותות בדידים באורך סופי: $x_1[n]$ באורך $N_1 = 16$ דגימות, ו-$x_2[n]$ באורך $N_2 = 32$ דגימות. מעוניינים לחשב את הקונבולוציה הקווית המלאה $y[n] = x_1[n] * x_2[n]$ באמצעות כפל במישור התדר דרך FFT/IFFT בגודל $N$.",
    formulaLatex:
      "y[n] = \\sum_{k} x_1[k] x_2[n - k], \\quad Y[k] = X_1[k] \\cdot X_2[k]",
    instruction:
      "מהו האורך המינימלי $N$ של התמרת ה-DFT הנדרש כדי למנוע עיוות מחזורי (Time-domain Aliasing) ולשמור על שקילות מדויקת לקונבולוציה קווית?",
    options: [
      {
        id: "sig-q08-opt1",
        plainText: "$N = 32$ (כאורך האות הארוך מביניהם)",
        isCorrect: false,
        explanation:
          "שגוי: קונבולוציה מעגלית בגודל 32 תגרום לזנב הפלט להתקפל ולהתווסף לתחילתו, מה שישחית את התוצאה.",
      },
      {
        id: "sig-q08-opt2",
        plainText: "$N = 48$",
        isCorrect: false,
        explanation:
          "שגוי: אורך תוצאת הקונבולוציה הקווית הוא $N_1 + N_2 - 1 = 16 + 32 - 1 = 47$, ולכן $N=48$ מספיק אך אינו המינימום המתמטי המדויק.",
      },
      {
        id: "sig-q08-opt3",
        plainText: "$N = 47$",
        mathText: "N \\ge N_1 + N_2 - 1 = 16 + 32 - 1 = 47",
        isCorrect: true,
        explanation:
          "נכון: תמיכת הקונבולוציה הקווית של שני אותות באורכים $N_1$ ו-$N_2$ היא בדיוק באורך $L = N_1 + N_2 - 1$. כפל במישור ה-DFT שקול לקונבולוציה מעגלית מודולו $N$. כדי שהקונבולוציה המעגלית תתלכד בדיוק עם הקונבולוציה הקווית ללא שום קיפול בזמן, אורך ה-DFT חייב לקיים $N \\ge N_1 + N_2 - 1 = 16 + 32 - 1 = 47$.",
      },
      {
        id: "sig-q08-opt4",
        plainText: "$N = 512$ (החזקה השלמה של 2 הקרובה למכפלתם)",
        isCorrect: false,
        explanation:
          "שגוי: אין צורך במכפלת האורכים; סכום האורכים פחות 1 הוא החסם המדויק.",
      },
    ],
  },
  {
    id: "sig-q09-group-delay-linear-phase-distortion",
    domain: "השהיית קבוצה ומערכות בעלות פאזה ליניארית",
    title:
      "אותות ומערכות - השהיית קבוצה (Group Delay) ומערכות בעלות פאזה ליניארית",
    context:
      "מערכת LTI רציפה מתוארת על ידי תגובת תדר $H(j\\omega) = |H(j\\omega)| e^{j\\theta(\\omega)}$. השהיית הקבוצה מוגדרת כנגזרת השלילית של הפאזה: $\\tau_g(\\omega) = -\\frac{d\\theta(\\omega)}{d\\omega}$.",
    formulaLatex:
      "\\tau_g(\\omega) = -\\frac{d\\theta(\\omega)}{d\\omega} = \\tau_0 = \\text{const}",
    instruction:
      "מה מבטיחה התכונה שהשהיית הקבוצה קבועה לחלוטין לכל התדרים ברוחב הפס של האות?",
    options: [
      {
        id: "sig-q09-opt1",
        plainText:
          "הגבר המערכת קבוע ואחיד לכל התדרים ($|H(j\\omega)| = 1$, מסנן All-Pass).",
        isCorrect: false,
        explanation:
          "שגוי: השהיית קבוצה קשורה למופע (פאזה) בלבד, ואינה קובעת את גודל ההגבר האמפליטודי.",
      },
      {
        id: "sig-q09-opt2",
        plainText:
          "המערכת היא סיבתית בהכרח ללא שום קטבים בחצי המישור השמאלי.",
        isCorrect: false,
        explanation:
          "שגוי: פאזה ליניארית מדויקת במערכות רציפות דורשת השהיית זמן טהורה $e^{-j\\omega \\tau_0}$, שקיימת גם במערכות ללא קטבים.",
      },
      {
        id: "sig-q09-opt3",
        plainText:
          "המופע ליניארי בתדר (Linear Phase), וכל רכיבי התדר השונים של האות עוברים את המערכת באותה השהיית זמן בדיוק ללא עיוות פאזה (Dispersion-free).",
        isCorrect: true,
        explanation:
          "נכון: אם $\\tau_g(\\omega) = \\tau_0$ קבוע, אינטגרציה מראה שהפאזה היא ליניארית: $\\theta(\\omega) = -\\omega \\tau_0 + \\phi_0$. פאזה ליניארית שומרת על יחסי הזמנים המדויקים בין ההרמוניות השונות של האות (לפי משפט ההזזה בזמן $x(t - \\tau_0) \\leftrightarrow X(j\\omega)e^{-j\\omega \\tau_0}$), ומונעת עיוות צורני הנובע מהתפשטות ופיזור זמנים של פולסים.",
      },
      {
        id: "sig-q09-opt4",
        plainText:
          "האות במוצא מושהה בזמן אפס ואינו חווה שום עיכוב פיזיקלי.",
        isCorrect: false,
        explanation:
          "שגוי: האות מושהה בזמן קבוע $\\tau_0 > 0$, אך אין פירוש הדבר שההשהיה היא אפס.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "sig-q10-parseval-energy-spectral-density",
    domain: "משפט פרסבל וצפיפות ספקטרלית של אנרגיה",
    title: "אותות ומערכות - משפט פרסבל וצפיפות ספקטרלית של אנרגיה",
    context:
      "נתון האות הרציף $x(t) = e^{-3t} u(t)$. אנו מעוניינים לחשב את סך כל האנרגיה המכילה התמרת פורייה של האות בתחום התדרים החיוביים והשליליים $|\\omega| \\le 3\\text{ rad/s}$.",
    formulaLatex:
      "E_{total} = \\int_{-\\infty}^\\infty |x(t)|^2 \\, dt = \\frac{1}{2\\pi}\\int_{-\\infty}^\\infty |X(j\\omega)|^2 \\, d\\omega, \\quad X(j\\omega) = \\frac{1}{3 + j\\omega}",
    instruction:
      "מהו החלק היחסי של האנרגיה הכוללת המוכל בתחום התדרים $|\\omega| \\le 3\\text{ rad/s}$?",
    options: [
      {
        id: "sig-q10-opt1",
        plainText: "$100\\%$ מכלל האנרגיה",
        isCorrect: false,
        explanation:
          "שגוי: הספקטרום של אקספוננט קטום הוא בעל זנבות אינסופיים ($1/(9+\\omega^2)$) ולכן אינו חסום סרט לחלוטין.",
      },
      {
        id: "sig-q10-opt2",
        plainText:
          "יותר ממחצית האנרגיה, משום שתדר הקטעון $|\\omega|=3$ הוא רוחב הפס לחצי-הספק של האמפליטודה ולכן האנרגיה צוברת מעל $50\\%$.",
        isCorrect: false,
        explanation:
          "שגוי: רוחב הפס לחצי-הספק של האמפליטודה אינו קובע אוטומטית שיותר ממחצית האנרגיה נמצאת בתוך אותו תחום; יש לחשב במפורש את אינטגרל פרסבל.",
      },
      {
        id: "sig-q10-opt3",
        plainText: "$\\frac{\\pi}{4} \\approx 78.5\\%$ מכלל האנרגיה",
        isCorrect: false,
        explanation:
          "שגוי: חישוב שגוי של אינטגרל הארק-טנגנס ללא נרמול באנרגיה הכוללת.",
      },
      {
        id: "sig-q10-opt4",
        plainText:
          "בדיוק מחצית ($50\\%$) מכלל האנרגיה של האות, כפי שמתקבל מאינטגרל $\\frac{1}{2\\pi}\\int_{-3}^3 \\frac{d\\omega}{9+\\omega^2} = \\frac{1}{12}$ ביחס לאנרגיה הכוללת $E = \\frac{1}{6}$.",
        mathText:
          "\\frac{E_{|\\omega| \\le 3}}{E_{total}} = \\frac{1/12}{1/6} = 50\\%",
        isCorrect: true,
        explanation:
          "נכון: האנרגיה הכוללת בזמן היא $E = \\int_0^\\infty (e^{-3t})^2 dt = \\int_0^\\infty e^{-6t} dt = \\frac{1}{6}$. לפי משפט פרסבל, צפיפות האנרגיה בתדר היא $|X(j\\omega)|^2 = \\frac{1}{9 + \\omega^2}$. האנרגיה בתחום $|\\omega| \\le 3$ היא $\\frac{1}{2\\pi}\\int_{-3}^3 \\frac{d\\omega}{9 + \\omega^2} = \\frac{1}{\\pi} [\\frac{1}{3}\\arctan(\\frac{\\omega}{3})]_0^3 = \\frac{1}{3\\pi}\\arctan(1) = \\frac{1}{3\\pi} \\frac{\\pi}{4} = \\frac{1}{12}$. היחס מכלל האנרגיה הוא בדיוק $\\frac{1/12}{1/6} = \\frac{6}{12} = 50\\%$.",
      },
    ],
  },
  {
    id: "sig-q11-paley-wiener-causality-criterion",
    domain: "קריטריון פיילי-וינר ומגבלות מסננים אידיאליים",
    title: "אותות ומערכות - קריטריון פיילי-וינר ומגבלות מסננים אידיאליים",
    context:
      "משפט פיילי-וינר (Paley-Wiener Theorem) קובע תנאי הכרחי ומספיק על תגובת האמפליטודה $|H(j\\omega)|$ של מערכת LTI יציבה כדי שתוכל להיות סיבתית בזמן.",
    formulaLatex:
      "\\int_{-\\infty}^{\\infty} \\frac{|\\ln |H(j\\omega)||\\,}{1 + \\omega^2} \\, d\\omega < \\infty",
    instruction:
      "איזו מסקנה מהותית נובעת ישירות מקריטריון פיילי-וינר לגבי מסננים מעשיים?",
    options: [
      {
        id: "sig-q11-opt1",
        plainText:
          "כל מסנן סיבתי חייב להיות בעל תגובת מופע ליניארית בדיוק של $90^\\circ$.",
        isCorrect: false,
        explanation:
          "שגוי: הקריטריון מציב מגבלה על גודל ההגבר האמפליטודי $|H(j\\omega)|$ בלבד, ללא תלות ישירה בפאזה.",
      },
      {
        id: "sig-q11-opt2",
        plainText:
          "ההגבר של מסנן סיבתי חייב לשאוף לאינסוף בתדרים גבוהים כדי למנוע התכנסות האינטגרל.",
        isCorrect: false,
        explanation:
          "שגוי: הגבר השואף לאינסוף שובר יציבות BIBO ואינו קשור לקריטריון.",
      },
      {
        id: "sig-q11-opt3",
        plainText:
          "מסנן סיבתי אינו יכול להכיל שום קטבים מרוכבים על גבי המישור הימני.",
        isCorrect: false,
        explanation:
          "שגוי: זוהי הגדרת יציבות לפי לפלס, אך אינה הליבה של פיילי-וינר.",
      },
      {
        id: "sig-q11-opt4",
        plainText:
          "תגובת האמפליטודה של מסנן סיבתי אינה יכולה להתאפס זהותית על פני קטע תדרים רציף בעל רוחב סופי (ולכן מסנן קיר-לבנים אידיאלי אינו סיבתי ואינו ניתן למימוש פיזיקלי).",
        isCorrect: true,
        explanation:
          "נכון: אם $|H(j\\omega)| = 0$ על פני קטע תדרים כלשהו (כמו בתחום החסימה של מסנן אידיאלי שבו ההגבר הוא 0 זהותית), אזי $\\ln |H(j\\omega)| = -\\infty$ על פני קטע זה, והאינטגרל מתבדר לאינסוף. לפיכך, אף מסנן עם תחום חסימה מוחלט אינו יכול להיות סיבתי. מסננים פיזיקליים מעשיים חייבים להיות בעלי הנחתה סופית בלבד (כגון בטרוורת', צ׳בישב).",
      },
    ],
  },
  {
    id: "sig-q12-state-space-poles-transfer-function",
    domain: "ייצוג במרחב המצב וקטבי מערכת",
    title: "אותות ומערכות - ייצוג במרחב המצב (State-Space) וקטבי מערכת",
    context:
      "מערכת LTI רציפה מתוארת במרחב המצב על ידי המשוואות: $\\dot{\\vec{x}}(t) = A \\vec{x}(t) + B u(t)$, $y(t) = C \\vec{x}(t) + D u(t)$.",
    formulaLatex:
      "H(s) = C(sI - A)^{-1}B + D = \\frac{C \\operatorname{adj}(sI - A) B}{\\det(sI - A)} + D",
    instruction:
      "מהו הקשר בין הערכים העצמיים של המטריצה $A$ לבין קטבי פונקציית התמסורת $H(s)$ של המערכת?",
    options: [
      {
        id: "sig-q12-opt1",
        plainText:
          "קטבי המערכת שווים תמיד לערכים העצמיים של המטריצה $A^{-1}$.",
        isCorrect: false,
        explanation:
          "שגוי: הקטבים מתאימים למטריצה $A$ עצמה ולא להופכית שלה.",
      },
      {
        id: "sig-q12-opt2",
        plainText:
          "אין כל קשר מתמטי בין ערכי $A$ לבין $H(s)$, שכן $H(s)$ תלויה רק במטריצות $B$ ו-$C$.",
        isCorrect: false,
        explanation:
          "שגוי: המכנה של פונקציית התמסורת נקבע ישירות על ידי הדטרמיננטה של $(sI - A)$.",
      },
      {
        id: "sig-q12-opt3",
        plainText:
          "הערכים העצמיים של $A$ מייצגים תמיד את אפסי המערכת (Zeros) ולא את הקטבים שלה.",
        isCorrect: false,
        explanation:
          "שגוי: האפסים נקבעים על ידי מונה השבר, בעוד שהערכים העצמיים של $A$ מאפסים את המכנה.",
      },
      {
        id: "sig-q12-opt4",
        plainText:
          "כל קוטב של $H(s)$ הוא בהכרח ערך עצמי של המטריצה $A$, והם מתלכדים באופן מלא אם ורק אם המערכת ניתנת לשליטה מלאה (Controllable) ולצפייה מלאה (Observable) ללא ביטולי אפס-קוטב.",
        mathText:
          "\\text{Poles} \\subseteq \\operatorname{eig}(A), \\quad \\text{Equality iff Minimal Realization}",
        isCorrect: true,
        explanation:
          "נכון: המכנה של $H(s)$ הוא הפולינום האופייני $\\det(sI - A)$, ששורשיו הם בדיוק הערכים העצמיים של המטריצה $A$. אם המערכת היא מימוש מינימלי (כלומר ניתנת לשליטה ולצפייה מלאות לפי קריטריון דרגת קלמן), אין ביטול של גורמים משותפים בין המונה למכנה, וקטבי פונקציית התמסורת שווים במדויק לספקטרום של $A$. במקרה של חוסר שליטה או צפייה, חלק מהערכים העצמיים מתבטלים מ-$H(s)$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_SIGNALS_SYSTEMS_QUESTIONS = SIGNALS_SYSTEMS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from LTI / Fourier / CTFT (Q1–3)
 * - 1 from sampling / Laplace / DTFT LPF (Q4–6)
 * - 1 from Z / circular conv / group delay / Parseval / Paley–Wiener / state-space (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleSignalsSystemsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = SIGNALS_SYSTEMS_QUESTIONS.slice(0, 3);
  const groupB = SIGNALS_SYSTEMS_QUESTIONS.slice(3, 6);
  const groupC = SIGNALS_SYSTEMS_QUESTIONS.slice(6, 12);

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
