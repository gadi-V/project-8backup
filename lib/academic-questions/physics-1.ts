import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Physics 1 — Mechanics diagnostic bank (30Q master pool).
 * Display name: "פיזיקה 1 - מכניקה" — no institutional course codes.
 * Answer-key contract (hard): Q1–8 → A, Q9–15 → B, Q16–23 → C, Q24–30 → D.
 */
export const PHYSICS_1_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–8 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "phys1-q01-rotating-tube-equilibrium",
    domain: "מערכות מסתובבות וכוחות מדומים",
    title: "פיזיקה 1 - מערכות מסתובבות וכוחות מדומים",
    context:
      "גוף שמסתו $m$ מחובר לקפיץ בעל קבוע $k$ ואורך רפוי $x_0$ בתוך צינור חלק המסתובב במהירות זוויתית קבועה $\\omega$ סביב ציר אנכי ללא כבידה.",
    formulaLatex: "m \\omega^2 R - k(R - x_0) = 0",
    instruction:
      "מהו התנאי על מהירות הסיבוב לקיום נקודת שיווי משקל רדיאלית, ומהו רדיוס שיווי המשקל $R$?",
    options: [
      {
        id: "phys1-q01-opt1",
        plainText:
          "$k > m\\omega^2$, ורדיוס שיווי המשקל הוא $R = \\frac{k x_0}{k - m\\omega^2}$.",
        mathText: "k > m\\omega^2, \\quad R = \\frac{k x_0}{k - m\\omega^2}",
        isCorrect: true,
        explanation:
          "נכון: במערכת הצינור פועל כוח צנטריפוגלי $m\\omega^2 x$ החוצה וכוח קפיץ מחזיר $-k(x-x_0)$. באיזון: $(k-m\\omega^2)R = k x_0$. כדי שיתקבל רדיוס חיובי ושיווי משקל יציב, כוח הקפיץ חייב לגבור על הכוח הצנטריפוגלי, כלומר $k > m\\omega^2$.",
      },
      {
        id: "phys1-q01-opt2",
        plainText:
          "$k < m\\omega^2$, ורדיוס שיווי המשקל הוא $R = \\frac{k x_0}{m\\omega^2 - k}$.",
        isCorrect: false,
        explanation:
          "שגוי: כאשר $k < m\\omega^2$, הכוח הצנטריפוגלי חזק מכוח ההחזרה לכל $x > x_0$ והגוף יברח לאינסוף (חוסר יציבות).",
      },
      {
        id: "phys1-q01-opt3",
        plainText:
          "לכל $\\omega$ קיים שיווי משקל, ורדיוסו $R = x_0 \\left(1 + \\frac{m\\omega^2}{k}\\right)$.",
        isCorrect: false,
        explanation:
          "שגוי: זהו קירוב טיילור בלבד עבור מהירויות סיבוב איטיות מאוד, ואינו נכון במדויק.",
      },
      {
        id: "phys1-q01-opt4",
        plainText: "$\\omega = \\sqrt{k/m}$, ורדיוס שיווי המשקל הוא $R = 2x_0$.",
        isCorrect: false,
        explanation:
          "שגוי: בתדירות זו נוצרת תהודה (מכנה מתאפס) והרדיוס שואף לאינסוף.",
      },
    ],
  },
  {
    id: "phys1-q02-spool-pull-critical-angle",
    domain: "גלגול ללא החלקה וזווית משיכה קריטית",
    title: "פיזיקה 1 - גלגול ללא החלקה וזווית משיכה קריטית",
    context:
      "סליל בעל רדיוס פנימי $r$ ורדיוס חיצוני $R$ מונח על משטח אופקי מחוספס. חוט הכרוך סביב הרדיוס הפנימי נמשך במתיחות $T$ בזווית $\\alpha$ מעל האופק.",
    formulaLatex:
      "\\tau = R f_s - r T = I \\dot{\\omega}, \\quad T\\cos\\alpha - f_s = m a_{cm}",
    instruction:
      "מהי הזווית הקריטית $\\alpha_c$ שבה הגוף נמצא על סף החלקה מבלי להסתובב כלל ($a_{cm} = \\dot{\\omega} = 0$)?",
    options: [
      {
        id: "phys1-q02-opt1",
        plainText: "$\\cos\\alpha_c = \\frac{r}{R}$",
        mathText: "\\cos\\alpha_c = \\frac{r}{R}",
        isCorrect: true,
        explanation:
          "נכון: כאשר אין סיבוב ואין תנועה קווית, מומנט הכוח סביב נקודת המגע עם הקרקע חייב להתאפס. קו הפעולה של המתיחות חותך את נקודת המגע כאשר $\\cos\\alpha = r/R$. בזווית זו זרוע המומנט של $T$ ביחס לנקודת המגע היא אפס.",
      },
      {
        id: "phys1-q02-opt2",
        plainText: "$\\sin\\alpha_c = \\frac{r}{R}$",
        isCorrect: false,
        explanation:
          "שגוי: נובע מטעות טריגונומטרית בהיטל זרוע המתיחות ביחס לציר האנכי במקום האופקי.",
      },
      {
        id: "phys1-q02-opt3",
        plainText: "$\\tan\\alpha_c = \\frac{r}{R}$",
        isCorrect: false,
        explanation:
          "שגוי: זרוע הכוח נקבעת על ידי משולש ישר זווית שבו היתר הוא $R$ והניצב הוא $r$, ולכן היחס הוא קוסינוס ולא טנגנס.",
      },
      {
        id: "phys1-q02-opt4",
        plainText: "$\\cos\\alpha_c = \\frac{r^2}{R^2}$",
        isCorrect: false,
        explanation:
          "שגוי: תלות ריבועית מופיעה במומנטי התמד אך זרוע הכוח היא ליניארית ברדיוסים.",
      },
    ],
  },
  {
    id: "phys1-q03-conveyor-belt-variable-mass",
    domain: "מסה משתנה וכוח על מסוע נע",
    title: "פיזיקה 1 - מסה משתנה וכוח על מסוע נע",
    context:
      "חול נופל אנכית מגובה $h$ בקצב קבוע $k = \\frac{dm}{dt}$ על גבי מסוע משופע בזווית $\\alpha$ הנע במעלה המדרון במהירות קבועה $v$. מסת החול הכוללת על המסוע היא $m_s$.",
    formulaLatex:
      "\\vec{F}_{ext} = \\frac{d\\vec{p}}{dt} = M(t)\\frac{d\\vec{v}}{dt} - \\vec{v}_{rel}\\frac{dM}{dt}",
    instruction: "מהו רכיב הכוח שמפעיל החול על המסוע בכיוון המקביל לתנועתו?",
    options: [
      {
        id: "phys1-q03-opt1",
        plainText:
          "$F_{||} = -(v + \\sqrt{2gh}\\sin\\alpha)k - m_s g \\sin\\alpha$",
        mathText:
          "F_{||} = -(v + \\sqrt{2gh}\\sin\\alpha)k - m_s g \\sin\\alpha",
        isCorrect: true,
        explanation:
          "נכון: מהירות הנפילה של החול היא $\\sqrt{2gh}$ כלפי מטה, ורכיבה לאורך המסוע לפני הפגיעה הוא $-\\sqrt{2gh}\\sin\\alpha$. לאחר הפגיעה מהירותו היא $+v$. שינוי התנע ליחידת זמן דורש כוח האצה $(v + \\sqrt{2gh}\\sin\\alpha)k$. בתוספת רכיב הכבידה של החול שכבר נמצא על המסוע ($m_s g\\sin\\alpha$), מתקבל הכוח הכולל.",
      },
      {
        id: "phys1-q03-opt2",
        plainText: "$F_{||} = -v k - m_s g \\sin\\alpha$",
        isCorrect: false,
        explanation:
          "שגוי: התעלמות מהתנע ההתחלתי שהחול נושא איתו בעת הפגיעה במסוע המשופע עקב הנפילה החופשית מגובה $h$.",
      },
      {
        id: "phys1-q03-opt3",
        plainText:
          "$F_{||} = -(v - \\sqrt{2gh}\\cos\\alpha)k - m_s g \\sin\\alpha$",
        isCorrect: false,
        explanation:
          "שגוי: רכיב המהירות המקביל למדרון תלוי ב-$\\sin\\alpha$ ולא ב-$\\cos\\alpha$, וסימנו מנוגד לכיוון העלייה.",
      },
      {
        id: "phys1-q03-opt4",
        plainText: "$F_{||} = -\\sqrt{2gh} k \\sin\\alpha$",
        isCorrect: false,
        explanation:
          "שגוי: נשמט הכוח הנדרש להאצת החול ממהירות אפס למהירות המסוע $v$, וכן רכיב הכבידה הסטטי.",
      },
    ],
  },
  {
    id: "phys1-q04-inverted-pendulum-control-stability",
    domain: "מטוטלת הפוכה מיוצבת ושיווי משקל",
    title: "פיזיקה 1 - מטוטלת הפוכה מיוצבת ושיווי משקל",
    context:
      "מטוטלת הפוכה ממוט קשיח באורך $L$ ומסה $M$ מיוצבת על ידי מנוע המאיץ את נקודת התלייה בתאוצה אופקית $a = k\\theta(t)$ הפרופורציונית לזווית הנטייה $\\theta$.",
    formulaLatex:
      "I\\ddot{\\theta} = Mg\\frac{L}{2}\\theta - M a \\cos\\theta \\frac{L}{2} \\approx M(g - k)\\frac{L}{2}\\theta",
    instruction:
      "עבור אילו ערכים של קבוע הבקרה $k$ המטוטלת ההפוכה תימצא בשיווי משקל יציב סביב $\\theta = 0$?",
    options: [
      {
        id: "phys1-q04-opt1",
        plainText: "$k > g$",
        mathText: "k > g",
        isCorrect: true,
        explanation:
          "נכון: במערכת המואצת של נקודת התלייה פועל כוח מדומה $M a = M k \\theta$ בכיוון ההפוך. מומנט הכוח השקול הוא $\\tau = \\frac{ML}{2}(g - k)\\theta$. כדי לקבל תנודות הרמוניות יציבות (מומנט מחזיר), מקדם הזווית חייב להיות שלילי במשוואת התנועה $\\ddot{\\theta} + \\frac{3(k-g)}{2L}\\theta = 0$, דבר המתקיים אם ורק אם $k > g$.",
      },
      {
        id: "phys1-q04-opt2",
        plainText: "$k < g$",
        isCorrect: false,
        explanation:
          "שגוי: כאשר $k < g$, כוח הכובד גובר על הכוח המדומה והמטוטלת תיפול הלאה מהאנך (שיווי משקל לא יציב).",
      },
      {
        id: "phys1-q04-opt3",
        plainText: "$k > \\frac{2}{3}g$",
        isCorrect: false,
        explanation:
          "שגוי: הפקטור $2/3$ נובע ממומנט ההתמד ומשפיע על תדירות התנודות, אך אינו משנה את תנאי הסימן ליציבות.",
      },
      {
        id: "phys1-q04-opt4",
        plainText: "$k = 0$",
        isCorrect: false,
        explanation:
          "שגוי: ללא בקרה ($k=0$) מטוטלת הפוכה תמיד אינה יציבה בשדה כבידה.",
      },
    ],
  },
  {
    id: "phys1-q05-rocket-incline-takeoff-condition",
    domain: "משוואת הטיל ותנועה במדרון עם חיכוך",
    title: "פיזיקה 1 - משוואת הטיל ותנועה במדרון עם חיכוך",
    context:
      "טיל בעל מסה התחלתית $m_0$ עומד על מדרון בעל זווית שיפוע $\\theta$ ומקדם חיכוך $\\mu$. הטיל פולט מסה במורד המדרון בקצב $\\gamma = -\\frac{dm}{dt}$ ובמהירות פליטה יחסית $u$.",
    formulaLatex: "m(t)a = u\\gamma - m(t)g(\\sin\\theta + \\mu\\cos\\theta)",
    instruction:
      "מהו התנאי על קצב הפליטה $\\gamma$ כדי שהטיל יתחיל לנוע במעלה המדרון מיד ברגע השיגור $t=0$?",
    options: [
      {
        id: "phys1-q05-opt1",
        plainText: "$\\gamma > \\frac{m_0 g (\\sin\\theta + \\mu\\cos\\theta)}{u}$",
        mathText: "\\gamma > \\frac{m_0 g (\\sin\\theta + \\mu\\cos\\theta)}{u}",
        isCorrect: true,
        explanation:
          "נכון: כוח הדחף שמייצרת פליטת המסה הוא $F_{thrust} = u\\gamma$. כדי להתחיל תנועה במעלה המדרון, כוח הדחף חייב להתגבר על סכום רכיב המשקל המקביל למדרון ועל כוח החיכוך הסטטי המקסימלי: $u\\gamma > m_0 g\\sin\\theta + \\mu m_0 g\\cos\\theta$.",
      },
      {
        id: "phys1-q05-opt2",
        plainText: "$\\gamma > \\frac{m_0 g (\\sin\\theta - \\mu\\cos\\theta)}{u}$",
        isCorrect: false,
        explanation:
          "שגוי: סימן המינוס מתאים למצב שבו הטיל נע במורד המדרון והחיכוך מסייע בבלימה, ולא לתנועה במעלהו.",
      },
      {
        id: "phys1-q05-opt3",
        plainText: "$\\gamma > \\frac{m_0 g}{u\\cos\\theta}$",
        isCorrect: false,
        explanation:
          "שגוי: ביטוי שגוי שאינו לוקח בחשבון את הפירוק הנכון של רכיבי הכבידה והנורמל על המדרון.",
      },
      {
        id: "phys1-q05-opt4",
        plainText: "$\\gamma > \\frac{m_0 u}{g\\sin\\theta}$",
        isCorrect: false,
        explanation:
          "שגוי: ניתוח ממדים שגוי; אגף ימין אינו בעל יחידות של קצב פליטת מסה ($kg/s$).",
      },
    ],
  },
  {
    id: "phys1-q06-cylinder-incline-pure-rolling-transition",
    domain: "מעבר מהחלקה לגלגול ללא החלקה",
    title: "פיזיקה 1 - מעבר מהחלקה לגלגול ללא החלקה",
    context:
      "גליל מלא בעל רדיוס $R$ ומסה $M$ ($I = \\frac{1}{2}MR^2$) נורה במעלה מדרון ששיפועו $\\theta = \\pi/4$ במהירות קווית $v_0$ וללא סיבוב התחלתי ($\\omega_0 = 0$). מקדם החיכוך הוא $\\mu_k = 1$.",
    formulaLatex:
      "v(t) = v_0 - g(\\sin\\theta + \\mu_k\\cos\\theta)t, \\quad \\omega(t) = \\frac{2\\mu_k g\\cos\\theta}{R}t",
    instruction:
      "כמה זמן יחלוף מרגע השחרור ועד שהגליל יגיע למצב של גלגול ללא החלקה ($v = \\omega R$)?",
    options: [
      {
        id: "phys1-q06-opt1",
        plainText: "$\\tilde{t} = \\frac{\\sqrt{2}v_0}{4g}$",
        mathText: "\\tilde{t} = \\frac{\\sqrt{2}v_0}{4g}",
        isCorrect: true,
        explanation:
          "נכון: תנאי הגלגול ללא החלקה הוא $v(t) = \\omega(t)R$. מהצבת המשוואות: $v_0 - g(\\sin\\theta + \\mu_k\\cos\\theta)t = 2\\mu_k g\\cos\\theta\\cdot t \\implies t = \\frac{v_0}{g(\\sin\\theta + 3\\mu_k\\cos\\theta)}$. עבור $\\theta = \\pi/4$ ו-$\\mu_k=1$: $\\sin\\theta = \\cos\\theta = \\frac{\\sqrt{2}}{2}$, ולכן המכנה הוא $g(\\frac{\\sqrt{2}}{2} + \\frac{3\\sqrt{2}}{2}) = 2\\sqrt{2}g$. חלוקה מניבה $\\frac{v_0}{2\\sqrt{2}g} = \\frac{\\sqrt{2}v_0}{4g}$.",
      },
      {
        id: "phys1-q06-opt2",
        plainText: "$\\tilde{t} = \\frac{v_0}{2g}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה זו מתעלמת מהזווית של המדרון ($\\sqrt{2}/2$) ומניחה תנועה על מישור אופקי.",
      },
      {
        id: "phys1-q06-opt3",
        plainText: "$\\tilde{t} = \\frac{\\sqrt{2}v_0}{2g}$",
        isCorrect: false,
        explanation:
          "שגוי: נשכחה התרומה של מומנט ההתמד של הגליל המלא המוסיפה את הפקטור 3 במכנה.",
      },
      {
        id: "phys1-q06-opt4",
        plainText: "$\\tilde{t} = \\frac{3\\sqrt{2}v_0}{8g}$",
        isCorrect: false,
        explanation: "שגוי: חישוב שגוי של תאוצת הסיבוב הזוויתית.",
      },
    ],
  },
  {
    id: "phys1-q07-semicircular-disc-center-of-mass",
    domain: "מרכז מסה של גופים רציפים",
    title: "פיזיקה 1 - מרכז מסה של גופים רציפים",
    context:
      "נתונה חצי-דסקה דקה ואחידה בעלת רדיוס $R$ ומסה $M$ הממוקמת בחצי המישור העליון $y \\ge 0$ סביב הראשית.",
    formulaLatex:
      "y_{cm} = \\frac{1}{M}\\int y \\, dm = \\frac{1}{\\frac{1}{2}\\pi R^2}\\int_0^\\pi \\int_0^R (r\\sin\\theta) r \\, dr d\\theta",
    instruction: "מהו מיקום מרכז המסה $y_{cm}$ של חצי הדסקה ביחס למרכז המעגל?",
    options: [
      {
        id: "phys1-q07-opt1",
        plainText: "$y_{cm} = \\frac{4R}{3\\pi}$",
        mathText: "y_{cm} = \\frac{4R}{3\\pi}",
        isCorrect: true,
        explanation:
          "נכון: האינטגרל בקואורדינטות קוטביות: $\\int_0^R r^2 dr = \\frac{R^3}{3}$, ו-$\\int_0^\\pi \\sin\\theta d\\theta = 2$. שטח חצי הדסקה הוא $\\frac{\\pi R^2}{2}$. חלוקת האינטגרל בשטח נותנת: $\\frac{2R^3/3}{\\pi R^2/2} = \\frac{4R}{3\\pi}$.",
      },
      {
        id: "phys1-q07-opt2",
        plainText: "$y_{cm} = \\frac{2R}{\\pi}$",
        isCorrect: false,
        explanation:
          "שגוי: זהו מרכז המסה של חצי-חישוק דק (חד-ממדי), ולא של חצי-דסקה מלאה דו-ממדית.",
      },
      {
        id: "phys1-q07-opt3",
        plainText: "$y_{cm} = \\frac{3R}{8}$",
        isCorrect: false,
        explanation:
          "שגוי: זהו מרכז המסה של חצי-כדור תלת-ממדי מלא, ולא של חצי-דסקה מישורית.",
      },
      {
        id: "phys1-q07-opt4",
        plainText: "$y_{cm} = \\frac{R}{2}$",
        isCorrect: false,
        explanation:
          "שגוי: הנחה נאיבית שמרכז המסה ממוקם במחצית הרדיוס, שאינה מתחשבת בכך שיש יותר שטח באזורים החיצוניים.",
      },
    ],
  },
  {
    id: "phys1-q08-block-on-block-pulley-max-force",
    domain: "דינמיקה של גופים מחוברים וכוח גבולי להחלקה",
    title: "פיזיקה 1 - דינמיקה של גופים מחוברים וכוח גבולי להחלקה",
    context:
      "שתי מסות $M_1$ ו-$M_2$ ($M_2 > M_1$) מונחות זו על גבי זו. מסה $M_2$ מונחת על משטח חלק. המסות מחוברות בחוט אידאלי העובר דרך גלגלת חסרת מסה. כוח אופקי $F$ מושך את הגלגלת ימינה ומקדם החיכוך בין המסות הוא $\\mu$.",
    formulaLatex:
      "T = \\frac{F}{2}, \\quad M_1 a_1 = T - \\mu M_1 g, \\quad M_2 a_2 = T + \\mu M_1 g",
    instruction: "מהו הכוח המינימלי $F$ שיגרום להחלקה יחסית בין המסות?",
    options: [
      {
        id: "phys1-q08-opt1",
        plainText: "$F > 2\\mu g M_1 \\frac{M_2 + M_1}{M_2 - M_1}$",
        mathText: "F > 2\\mu g M_1 \\frac{M_2 + M_1}{M_2 - M_1}",
        isCorrect: true,
        explanation:
          "נכון: מתיחות החוט היא $T = F/2$. תאוצות המסות הן $a_1 = \\frac{F}{2M_1} - \\mu g$ ו-$a_2 = \\frac{F}{2M_2} + \\mu g \\frac{M_1}{M_2}$. החלקה מתרחשת כאשר $a_1 > a_2$. פתרון אי-השוויון מבודד את $F$ ונותן בדיוק $F > 2\\mu g M_1 \\frac{M_1 + M_2}{M_2 - M_1}$.",
      },
      {
        id: "phys1-q08-opt2",
        plainText: "$F > \\mu (M_1 + M_2) g$",
        isCorrect: false,
        explanation:
          "שגוי: ביטוי המתאים למשיכת שתי מסות הנעות יחד כנגד חיכוך עם הרצפה, ולא למערכת עם גלגלת נעה.",
      },
      {
        id: "phys1-q08-opt3",
        plainText: "$F > 2\\mu M_1 g$",
        isCorrect: false,
        explanation:
          "שגוי: מתעלם מהתאוצה של המסה התחתונה $M_2$ ומההשפעה ההדדית של מתיחות החוט עליה.",
      },
      {
        id: "phys1-q08-opt4",
        plainText: "$F > 4\\mu g \\frac{M_1 M_2}{M_1 + M_2}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי המסה המצומצמת המוכפלת בחיכוך, שאינה מייצגת את תנאי הפריצה להחלקה הדדית במבנה זה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 9–15 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "phys1-q09-black-hole-hyperbolic-scattering",
    domain: "כוחות מרכזיים ופיזור היפרבולי",
    title: "פיזיקה 1 - כוחות מרכזיים ופיזור היפרבולי",
    context:
      "טיל במסה $m$ נורה ממרחק רב $R$ לעבר חור שחור במסה $M$ ($M \\gg m$) במהירות $v_0$ עם פרמטר פגיעה $b = R\\sin\\delta$. הטיל מתפזר ונפלט בזווית סטייה כוללת $\\phi_0$.",
    formulaLatex:
      "e = \\sqrt{1 + \\left(\\frac{R v_0^2}{G M}\\right)^2 \\sin^2\\delta}, \\quad \\theta_\\infty = \\frac{\\pi}{2} + \\frac{\\phi_0}{2}",
    instruction:
      "מהו הביטוי הנכון עבור מסת החור השחור $M$ במונחי זווית הפיזור $\\phi_0$ ושאר הפרמטרים?",
    options: [
      {
        id: "phys1-q09-opt1",
        plainText:
          "$M = \\frac{R v_0^2}{G} \\sin\\delta \\cos\\left(\\frac{\\phi_0}{2}\\right)$",
        isCorrect: false,
        explanation:
          "שגוי: הקשר הגאומטרי של האסימפטוטות בהיפרבולה מקשר בין האקסצנטריות לטנגנס מחצית הזווית ולא לקוסינוס.",
      },
      {
        id: "phys1-q09-opt2",
        plainText:
          "$M = \\frac{R v_0^2}{G} \\sin\\delta \\tan\\left(\\frac{\\phi_0}{2}\\right)$",
        mathText:
          "M = \\frac{R v_0^2}{G} \\sin\\delta \\tan\\left(\\frac{\\phi_0}{2}\\right)",
        isCorrect: true,
        explanation:
          "נכון: האסימפטוטה מקיימת $\\cos\\theta_\\infty = -1/e$. מכיוון ש-$\\theta_\\infty = \\frac{\\pi + \\phi_0}{2}$, מתקיים $\\sin(\\phi_0/2) = 1/e$. לפי זהויות היפרבוליות, $\\cot(\\phi_0/2) = \\frac{R v_0^2 \\sin\\delta}{G M}$, ומכאן בידוד המסה מניב ישירות $M = \\frac{R v_0^2}{G}\\sin\\delta\\tan(\\phi_0/2)$.",
      },
      {
        id: "phys1-q09-opt3",
        plainText: "$M = \\frac{R v_0^2}{2G} \\tan\\phi_0$",
        isCorrect: false,
        explanation:
          "שגוי: נשמטה התלות בפרמטר הפגיעה $\\sin\\delta$ והזווית אינה מחולקת ב-2.",
      },
      {
        id: "phys1-q09-opt4",
        plainText:
          "$M = \\frac{G R v_0^2}{\\sin^2\\delta} \\cot\\left(\\frac{\\phi_0}{2}\\right)$",
        isCorrect: false,
        explanation:
          "שגוי: קבוע הכבידה $G$ הוצב במונה במקום במכנה בניגוד לניתוח ממדים.",
      },
    ],
  },
  {
    id: "phys1-q10-unwinding-chain-external-force-paradox",
    domain: "גוף בעל מסה משתנה ואי-תקפות החוק השני הפשוט",
    title: "פיזיקה 1 - גוף בעל מסה משתנה ואי-תקפות החוק השני הפשוט",
    context:
      "גליל שמסתו $m$ נופל בהשפעת הכבידה תוך פרימת שרשרת מלופפת בעלת מסה כוללת $M$ ואורך $L$. ברגע שבו נפרם אורך $x \\to L$, הכוח החיצוני השקול הוא $\\Sigma F_{ext} = mg - T$.",
    formulaLatex:
      "\\Sigma F_{ext} \\neq m a(L), \\quad \\Sigma F_{ext} = m a + v_{rel}\\frac{dm}{dt}",
    instruction:
      "מדוע במערכת זו הכוח החיצוני השקול ברגע $x \\to L$ אינו שווה למכפלת מסת הגליל בתאוצתו ($F_{ext} \\neq m a$)?",
    options: [
      {
        id: "phys1-q10-opt1",
        plainText:
          "משום שהחיכוך בין חוליות השרשרת מבזבז אנרגיה מכנית והופך אותה לחום.",
        isCorrect: false,
        explanation:
          "שגוי: התופעה מתרחשת גם בהזנחה מלאה של חיכוך פנימי, ומקורה בחוקי התנע של מסה משתנה.",
      },
      {
        id: "phys1-q10-opt2",
        plainText:
          "משום שאלמנט השרשרת הנפרם עוזב את הגליל במהירות שאינה אפס ביחס למרכז המסה של הגליל, ולכן נישא תנע החוצה מהמערכת.",
        isCorrect: true,
        explanation:
          "נכון: לפי משוואת התנועה של מסה משתנה: $\\Sigma F_{ext} = m(t)a - v_{rel}\\frac{dm}{dt}$. אלמנט השרשרת הנפרם נשאר תלוי במנוחה במערכת המעבדה, ולכן מהירותו ביחס למרכז המסה היורד היא $v_{rel} = -v_{cm} \\neq 0$. איבר תוספת התנע גורם לכך ש-$F_{ext} \\neq ma$.",
      },
      {
        id: "phys1-q10-opt3",
        plainText: "משום שתאוצת הגליל גדולה מ-$g$ עקב אפקט צנטריפוגלי.",
        isCorrect: false,
        explanation:
          "שגוי: תאוצת הגליל תמיד קטנה או שווה ל-$g$ ואינה גורמת לסתירת חוקי המכניקה הניוטונית.",
      },
      {
        id: "phys1-q10-opt4",
        plainText: "משום שמומנט ההתמד של השרשרת מתאפס לחלוטין ברגע זה.",
        isCorrect: false,
        explanation:
          "שגוי: מומנט ההתמד של הגליל עצמו נותר $\\frac{1}{2}mR^2$, ואיפוס חלק השרשרת אינו מבטל את החוק השני.",
      },
    ],
  },
  {
    id: "phys1-q11-sphere-sliding-to-rolling-time",
    domain: "זמן מעבר להחלקה עבור כדור מלא",
    title: "פיזיקה 1 - זמן מעבר להחלקה עבור כדור מלא",
    context:
      "כדור מלא בעל מסה $m$, רדיוס $R$ ומומנט התמד $I = \\frac{2}{5}mR^2$ מחליק במהירות קווית $v_2$ וללא מהירות זוויתית ($\\omega = 0$) על משטח בעל מקדם חיכוך קינטי $\\mu$.",
    formulaLatex:
      "v(t) = v_2 - \\mu g t, \\quad \\omega(t) = \\frac{\\mu m g R}{I}t = \\frac{5\\mu g}{2R}t",
    instruction: "כמה זמן יחלוף עד שהכדור יגיע למצב של גלגול ללא החלקה מלא?",
    options: [
      {
        id: "phys1-q11-opt1",
        plainText: "$t_f = \\frac{v_2}{3\\mu g}$",
        isCorrect: false,
        explanation:
          "שגוי: מתאים לגליל מלא ($I = \\frac{1}{2}mR^2$) ולא לכדור מלא.",
      },
      {
        id: "phys1-q11-opt2",
        plainText: "$t_f = \\frac{2v_2}{7\\mu g}$",
        mathText: "t_f = \\frac{2v_2}{7\\mu g}",
        isCorrect: true,
        explanation:
          "נכון: תנאי הגלגול ללא החלקה הוא $v(t_f) = \\omega(t_f)R$. מהצבת המשוואות: $v_2 - \\mu g t_f = \\frac{5\\mu g}{2} t_f \\implies v_2 = \\frac{7}{2}\\mu g t_f \\implies t_f = \\frac{2v_2}{7\\mu g}$.",
      },
      {
        id: "phys1-q11-opt3",
        plainText: "$t_f = \\frac{v_2}{\\mu g}$",
        isCorrect: false,
        explanation:
          "שגוי: זהו הזמן הנדרש לעצירה מוחלטת של גוף נקודתי מחליק, ללא התחשבות במומנט המסובב.",
      },
      {
        id: "phys1-q11-opt4",
        plainText: "$t_f = \\frac{5v_2}{7\\mu g}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי המהירות הסופית של מרכז המסה ($v_f = \\frac{5}{7}v_2$), ולא משך הזמן.",
      },
    ],
  },
  {
    id: "phys1-q12-rolling-coin-precession-angle",
    domain: "גירוסקופים ופרסציית מטבע מתגלגל",
    title: "פיזיקה 1 - גירוסקופים ופרסציית מטבע מתגלגל",
    context:
      "מטבע אחיד בעל רדיוס $R$ ומסה $m$ מתגלגל ללא החלקה על שולחן אופקי כך שמרכז המסה שלו קבוע ונקודת המגע מבצעת תנועה מעגלית במהירות זוויתית $\\Omega$. זווית הנטייה של המטבע ביחס לשולחן היא $\\theta$.",
    formulaLatex:
      "\\vec{\\tau} = \\frac{d\\vec{L}}{dt} = \\vec{\\Omega} \\times \\vec{L}, \\quad I_x = \\frac{1}{4}mR^2",
    instruction:
      "מהו הקשר המחייב בין זווית הנטייה $\\theta$ לבין מהירות הפרסציה $\\Omega$?",
    options: [
      {
        id: "phys1-q12-opt1",
        plainText: "$\\cos\\theta = \\frac{g}{\\Omega^2 R}$",
        isCorrect: false,
        explanation:
          "שגוי: המומנט נובע מרכיב הנורמל המאונך לציר הסיבוב, והקשר המתקבל מבוסס על סינוס הזווית.",
      },
      {
        id: "phys1-q12-opt2",
        plainText: "$\\sin\\theta = \\frac{4g}{\\Omega^2 R}$",
        mathText: "\\sin\\theta = \\frac{4g}{\\Omega^2 R}",
        isCorrect: true,
        explanation:
          "נכון: מומנט כוח הכובד והנורמל סביב מרכז המסה הוא $\\tau = N R\\cos\\theta = mg R\\cos\\theta$. התנע הזוויתי של המטבע הוא $L_x = I_x \\Omega\\sin\\theta = \\frac{1}{4}mR^2\\Omega\\sin\\theta$. קצב שינוי כיוון התנע הזוויתי הוא $|\\vec{\\Omega} \\times \\vec{L}| = \\frac{1}{4}mR^2\\Omega^2\\sin\\theta\\cos\\theta$. השוואת המומנטים: $mg R\\cos\\theta = \\frac{1}{4}mR^2\\Omega^2\\sin\\theta\\cos\\theta \\implies \\sin\\theta = \\frac{4g}{\\Omega^2 R}$.",
      },
      {
        id: "phys1-q12-opt3",
        plainText: "$\\tan\\theta = \\frac{\\Omega^2 R}{g}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי הזווית של מטוטלת קונית פשוטה או מכונית בסיבוב מוגבה, ולא פרסציה של גוף קשיח מסתובב.",
      },
      {
        id: "phys1-q12-opt4",
        plainText: "$\\sin\\theta = \\frac{g}{4\\Omega^2 R}$",
        isCorrect: false,
        explanation:
          "שגוי: הפקטור 4 הוצב במכנה במקום במונה עקב שימוש שגוי במומנט התמד של דסקה סביב צירה הראשי במקום הקוטרי.",
      },
    ],
  },
  {
    id: "phys1-q13-block-rolling-on-cylinder-stability",
    domain: "יציבות שיווי משקל של גוף מתגלגל על משטח קמור",
    title: "פיזיקה 1 - יציבות שיווי משקל של גוף מתגלגל על משטח קמור",
    context:
      "תיבה אחידה בעלת מסה $M$, אורך $L$ וגובה $2d$ מונחת בשיווי משקל על גבי חצי גליל קבוע בעל רדיוס $R$. התיבה מתגלגלת ללא החלקה סביב נקודת המגע העליונה.",
    formulaLatex: "U(\\theta) \\approx \\frac{1}{2}Mg(R - d)\\theta^2 + \\text{const}",
    instruction:
      "מהו התנאי על ממדי המערכת לכך שהתיבה תימצא בשיווי משקל יציב כנגד הסטות זוויתיות קטנות?",
    options: [
      {
        id: "phys1-q13-opt1",
        plainText: "$d > R$",
        isCorrect: false,
        explanation:
          "שגוי: כאשר מחצית הגובה $d$ גדולה מרדיוס העקמומיות $R$, מרכז המסה נופל בעת גלגול והמערכת אינה יציבה.",
      },
      {
        id: "phys1-q13-opt2",
        plainText: "$R > d$",
        mathText: "R > d",
        isCorrect: true,
        explanation:
          "נכון: בפיתוח אנרגיה פוטנציאלית לזוויות קטנות: $h_{cm}(\\theta) = (R+d)\\cos\\theta + R\\theta\\sin\\theta \\approx (R+d)(1 - \\theta^2/2) + R\\theta^2 = R + d + \\frac{1}{2}(R-d)\\theta^2$. הנגזרת השנייה היא $U''(0) = Mg(R - d)$. כדי שנקודת שיווי המשקל תהיה נקודת מינימום של האנרגיה הפוטנציאלית (יציבות), נדרש $U''(0) > 0 \\iff R > d$.",
      },
      {
        id: "phys1-q13-opt3",
        plainText: "$L > 2R$",
        isCorrect: false,
        explanation:
          "שגוי: אורך התיבה $L$ משפיע על מומנט ההתמד ותדירות התנודות, אך תנאי היציבות הסטטי נקבע אך ורק על ידי היחס בין $R$ ל-$d$.",
      },
      {
        id: "phys1-q13-opt4",
        plainText: "$R > \\sqrt{L^2 + 4d^2}$",
        isCorrect: false,
        explanation:
          "שגוי: ערבוב שגוי של תנאי היציבות עם אורך אלכסון התיבה מתוך מומנט ההתמד.",
      },
    ],
  },
  {
    id: "phys1-q14-special-relativity-velocity-addition",
    domain: "יחסות פרטית וחיבור מהירויות לורנץ",
    title: "פיזיקה 1 - יחסות פרטית וחיבור מהירויות לורנץ",
    context:
      "רכבת נעה במהירות $v = \\frac{c}{2}$ ביחס לקרקע. כדור נזרק בתוך הרכבת מחלקה האחורי לקדמי במהירות $u' = \\frac{c}{3}$ ביחס לרכבת.",
    formulaLatex: "u = \\frac{u' + v}{1 + \\frac{u' v}{c^2}}",
    instruction: "מהי מהירות הכדור $u$ כפי שהיא נמדדת על ידי צופה נייח בקרקע?",
    options: [
      {
        id: "phys1-q14-opt1",
        plainText: "$u = \\frac{5}{6}c$",
        isCorrect: false,
        explanation:
          "שגוי: זהו חיבור מהירויות גלילאי קלאסי ($c/2 + c/3 = 5c/6$), שאינו תקף במהירויות יחסותיות.",
      },
      {
        id: "phys1-q14-opt2",
        plainText: "$u = \\frac{5}{7}c$",
        mathText: "u = \\frac{5}{7}c",
        isCorrect: true,
        explanation:
          "נכון: לפי טרנספורמציית לורנץ לחיבור מהירויות: $u = \\frac{c/3 + c/2}{1 + \\frac{(c/3)(c/2)}{c^2}} = \\frac{5/6 c}{1 + 1/6} = \\frac{5/6}{7/6} c = \\frac{5}{7}c$.",
      },
      {
        id: "phys1-q14-opt3",
        plainText: "$u = \\frac{5}{12}c$",
        isCorrect: false,
        explanation:
          "שגוי: טעות בחישוב המכנה שבו הוכפל המונה ב-2 במקום חיבור שברים תקין.",
      },
      {
        id: "phys1-q14-opt4",
        plainText: "$u = c$",
        isCorrect: false,
        explanation:
          "שגוי: מהירות האור מתקבלת רק אם אחד הגופים נע בעצמו במהירות האור $c$.",
      },
    ],
  },
  {
    id: "phys1-q15-central-force-kepler-areal-velocity",
    domain: "כוחות מרכזיים ומהירות סקטוריאלית",
    title: "פיזיקה 1 - כוחות מרכזיים ומהירות סקטוריאלית",
    context:
      "חלקיק נע תחת השפעת כוח מרכזי $\\vec{F}(\\vec{r}) = f(r)\\hat{r}$. נסמן ב-$dA$ את השטח שמטאטא וקטור המיקום בזמן $dt$.",
    formulaLatex: "\\frac{dA}{dt} = \\frac{|\\vec{r} \\times \\vec{v}|}{2} = \\frac{L}{2m}",
    instruction:
      "מדוע המהירות הסקטוריאלית $\\frac{dA}{dt}$ קבועה בזמן (החוק השני של קפלר)?",
    options: [
      {
        id: "phys1-q15-opt1",
        plainText:
          "משום שהאנרגיה המכנית הכוללת של החלקיק נשמרת תחת כל כוח מרכזי.",
        isCorrect: false,
        explanation:
          "שגוי: שימור האנרגיה קובע את גודל המהירות כפונקציה של המרחק, אך קביעות המהירות הסקטוריאלית נובעת משימור התנע הזוויתי בלבד.",
      },
      {
        id: "phys1-q15-opt2",
        plainText:
          "משום שמומנט הכוח סביב הראשית מתאפס זהותית ($\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$), ולכן התנע הזוויתי $\\vec{L}$ נשמר.",
        isCorrect: true,
        explanation:
          "נכון: מאחר שהכוח פועל לאורך הקו המחבר לראשית ($\\vec{F} \\parallel \\vec{r}$), המכפלה הווקטורית מתאפסת: $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$. לפיכך $\\frac{d\\vec{L}}{dt} = 0$, וגודל התנע הזוויתי $L = m |\\vec{r} \\times \\vec{v}|$ קבוע, ומכאן $\\frac{dA}{dt} = \\frac{L}{2m} = \\text{const}$.",
      },
      {
        id: "phys1-q15-opt3",
        plainText: "משום שהתנע הקווי הכולל של החלקיק נשמר.",
        isCorrect: false,
        explanation:
          "שגוי: התנע הקווי אינו נשמר מכיוון שפועל על החלקיק כוח שקול שאינו אפס (הוא מאיץ לעבר המרכז).",
      },
      {
        id: "phys1-q15-opt4",
        plainText:
          "החוק תקף אך ורק עבור כוח כבידה התלוי בריבוע הפוך ($1/r^2$).",
        isCorrect: false,
        explanation:
          "שגוי: חוק השטחים השווים נכון לכל כוח מרכזי $f(r)$, כולל מתנד הרמוני איזוטרופי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 16–23 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "phys1-q16-pendulum-accelerating-slope-resonance",
    domain: "מתנד הרמוני מאולץ ותהודה על מדרון",
    title: "פיזיקה 1 - מתנד הרמוני מאולץ ותהודה על מדרון",
    context:
      "מטוטלת בעלת שני חרוזים במסה $m$ כל אחד ומוט באורך $l$ מאולצת לנוע על מסילה נטויה בזווית $\\beta$. משנים את זווית המדרון מחזורית לפי $\\beta(t) = \\beta_0 \\sin(\\Omega t)$.",
    formulaLatex: "\\ddot{\\varphi} + \\frac{2g}{l}\\varphi = \\frac{2g}{l}\\beta(t)",
    instruction:
      "עבור איזו תדירות עירור $\\Omega$ תתקבל אמפליטודת תנודות מקסימלית (רזוננס)?",
    options: [
      {
        id: "phys1-q16-opt1",
        plainText: "$\\Omega = \\sqrt{\\frac{g}{l}}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי תדירות מטוטלת פשוטה עם נקודת תלייה קבועה, אך כאן נקודת התלייה חופשית לנוע לאורך המדרון.",
      },
      {
        id: "phys1-q16-opt2",
        plainText: "$\\Omega = \\sqrt{\\frac{g}{2l}}$",
        isCorrect: false,
        explanation:
          "שגוי: פקטור חצי שגוי במומנט האינרציאלי של המערכת המשותפת.",
      },
      {
        id: "phys1-q16-opt3",
        plainText: "$\\Omega = \\sqrt{\\frac{2g}{l}}$",
        mathText: "\\Omega = \\sqrt{\\frac{2g}{l}}",
        isCorrect: true,
        explanation:
          "נכון: ממשוואת התנועה המצומדת של מרכז המסה והחרוז התחתון: $\\ddot{\\varphi} + \\frac{2g}{l}\\varphi = \\frac{2g}{l}\\beta_0 \\sin(\\Omega t)$. התדירות העצמית של האוסצילטור היא $\\omega_0 = \\sqrt{\\frac{2g}{l}}$, ולכן תהודה (רזוננס) מתקבלת כאשר תדירות הכוח המאלץ שווה לתדירות העצמית $\\Omega = \\omega_0$.",
      },
      {
        id: "phys1-q16-opt4",
        plainText: "$\\Omega = 2\\sqrt{\\frac{g}{l}}$",
        isCorrect: false,
        explanation: "שגוי: הפקטור 2 נמצא בתוך השורש ולא מחוצה לו.",
      },
    ],
  },
  {
    id: "phys1-q17-mud-accretion-terminal-motion",
    domain: "ספיחת מסה רציפה ומשוואת תנועה לא-ליניארית",
    title: "פיזיקה 1 - ספיחת מסה רציפה ומשוואת תנועה לא-ליניארית",
    context:
      "גלגל בעל מסה ראשונית $M_0$ מתגלגל ללא החלקה במישור בוצי וסופח בוץ בקצב קבוע ליחידת מרחק $\\gamma = \\frac{dm}{dx}$. משוואת המהירות המתקבלת היא:",
    formulaLatex:
      "v_{cm}(x) = v_0 \\left(\\frac{M_0 + \\frac{I_0}{R^2}}{M_0 + \\frac{I_0}{R^2} + 2\\gamma x}\\right)",
    instruction:
      "היכן ומתי ייעצר הגלגל לחלוטין בהנחה שהמשטח ארוך ככל שנדרש?",
    options: [
      {
        id: "phys1-q17-opt1",
        plainText:
          "הגלגל ייעצר במרחק סופי $x_{stop} = \\frac{M_0}{2\\gamma}$ ובזמן סופי.",
        isCorrect: false,
        explanation:
          "שגוי: המהירות דועכת בצורה היפרבולית ולא מתאפסת עבור ערך $x$ סופי כלשהו.",
      },
      {
        id: "phys1-q17-opt2",
        plainText:
          "הגלגל ייעצר במרחק סופי $x_{stop} = \\frac{M_0 + I_0/R^2}{\\gamma}$ אך לאחר זמן אינסופי.",
        isCorrect: false,
        explanation:
          "שגוי: גם המרחק אינו חסום; השבר שואף לאפס רק בגבול $x \\to \\infty$.",
      },
      {
        id: "phys1-q17-opt3",
        plainText:
          "הגלגל ייעצר רק במרחק אינסופי ($x \\to \\infty$) ולאחר זמן אינסופי ($t \\to \\infty$).",
        isCorrect: true,
        explanation:
          "נכון: המהירות $v_{cm}(x) \\propto \\frac{1}{C + 2\\gamma x}$ חיובית ממש לכל $x$ סופי ושואפת לאפס רק כאשר $x \\to \\infty$. אינטגרל הזמן $t = \\int \\frac{dx}{v(x)} \\propto \\int x \\, dx \\sim x^2$ מתבדר גם הוא, ולכן הגלגל אינו נעצר לעולם במרחק סופי.",
      },
      {
        id: "phys1-q17-opt4",
        plainText: "הגלגל יגיע למהירות אסימפטוטית קבועה שאינה אפס.",
        isCorrect: false,
        explanation:
          "שגוי: המכנה גדל ללא חסם עם הוספת המסה, ולכן הגבול של המהירות באינסוף הוא 0.",
      },
    ],
  },
  {
    id: "phys1-q18-spoked-wheel-moment-of-inertia",
    domain: "מומנט התמד של גוף מורכב (חישוק וחישורים)",
    title: "פיזיקה 1 - מומנט התמד של גוף מורכב (חישוק וחישורים)",
    context:
      "גלגל מורכב מחישוק מעגלי דק בעל רדיוס $R$ ומסה $M$, ו-8 חישורים (מוטות דקים) היוצאים ממרכז הגלגל אל החישוק, כל אחד בעל אורך $R$ ומסה $M$.",
    formulaLatex: "I_{rim} = M R^2, \\quad I_{rod,end} = \\frac{1}{3}M R^2",
    instruction:
      "מהו מומנט ההתמד הכולל של הגלגל סביב ציר הסיבוב העובר במרכזו ומאונך למישורו?",
    options: [
      {
        id: "phys1-q18-opt1",
        plainText: "$I = 3 M R^2$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה מחישוב שגוי של מומנט מוט סביב מרכזו במקום סביב קצהו.",
      },
      {
        id: "phys1-q18-opt2",
        plainText: "$I = \\frac{9}{2} M R^2$",
        isCorrect: false,
        explanation:
          "שגוי: הנחה שגויה שהחישורים יוצרים דסקה רציפה במקום סכימת מוטות בדידים.",
      },
      {
        id: "phys1-q18-opt3",
        plainText: "$I = \\frac{11}{3} M R^2$",
        mathText: "I = \\frac{11}{3} M R^2",
        isCorrect: true,
        explanation:
          "נכון: מומנט החישוק הוא $I_{rim} = M R^2$. מומנט ההתמד של כל אחד מ-8 החישורים (מוט דק המסתובב סביב קצהו) הוא $I_{rod} = \\frac{1}{3}M R^2$. לפי עקרון הסופרפוזיציה: $I_{total} = M R^2 + 8 \\cdot \\left(\\frac{1}{3}M R^2\\right) = \\left(1 + \\frac{8}{3}\\right) M R^2 = \\frac{11}{3} M R^2$.",
      },
      {
        id: "phys1-q18-opt4",
        plainText: "$I = 9 M R^2$",
        isCorrect: false,
        explanation:
          "שגוי: מתייחס לכל החישורים כאילו כל מסתם מרוכזת בשפה ברדיוס $R$.",
      },
    ],
  },
  {
    id: "phys1-q19-moon-soft-landing-burn-fraction",
    domain: "תמרון מסלולי ושימור תנע במסלול קפלרי",
    title: "פיזיקה 1 - תמרון מסלולי ושימור תנע במסלול קפלרי",
    context:
      "חללית בעלת מסה $m$ נעה במסלול מעגלי ברדיוס $2R$ סביב הירח (רדיוס הירח $R$). כדי לנחות, מנוע הבלימה פולט גז קדימה בכיוון התנועה במהירות יחסית $u_{rel} = \\frac{1}{2}v$.",
    formulaLatex:
      "v = \\sqrt{\\frac{G M_M}{2R}}, \\quad v_A = \\sqrt{\\frac{G M_M}{3R}}",
    instruction:
      "מהי המהירות $v_A$ בנקודת הבלימה $r=2R$ הנדרשת כדי שהחללית תיכנס למסלול אליפטי שמשיא לו משיק לפני הירח ב-$r=R$?",
    options: [
      {
        id: "phys1-q19-opt1",
        plainText: "$v_A = \\sqrt{\\frac{G M_M}{2R}}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי מהירות המסלול המעגלי המקורי, שאינה מאפשרת ירידה לעבר פני הירח.",
      },
      {
        id: "phys1-q19-opt2",
        plainText: "$v_A = \\sqrt{\\frac{2 G M_M}{3R}}$",
        isCorrect: false,
        explanation:
          "שגוי: מהירות זו גדולה מדי וגורמת לאפוגיאה לעלות מעל $2R$.",
      },
      {
        id: "phys1-q19-opt3",
        plainText: "$v_A = \\sqrt{\\frac{G M_M}{3R}}$",
        mathText: "v_A = \\sqrt{\\frac{G M_M}{3R}}",
        isCorrect: true,
        explanation:
          "נכון: משימור תנע זוויתי ואנרגיה במסלול האליפטי בין נקודת הבלימה $r_A = 2R$ לנקודת הנחיתה המשיקית $r_B = R$: $v_B = 2 v_A$. משוואת האנרגיה: $\\frac{1}{2}v_A^2 - \\frac{G M}{2R} = \\frac{1}{2}(2v_A)^2 - \\frac{G M}{R} \\implies \\frac{3}{2}v_A^2 = \\frac{G M}{2R} \\implies v_A = \\sqrt{\\frac{G M}{3R}}$.",
      },
      {
        id: "phys1-q19-opt4",
        plainText: "$v_A = \\sqrt{\\frac{G M_M}{6R}}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה מאי-העלאה בריבוע של יחס המהירויות בשימור האנרגיה.",
      },
    ],
  },
  {
    id: "phys1-q20-bead-on-ring-with-potential",
    domain: "תנודות קטנות ופוטנציאל משולב (קפיץ וכבידה)",
    title: "פיזיקה 1 - תנודות קטנות ופוטנציאל משולב (קפיץ וכבידה)",
    context:
      "חרוז במסה $m$ מושחל על טבעת אנכית חלקה ברדיוס $R$. על החרוז פועלים כוח כובד וכוח מרכזי דו-ממדי $\\vec{F} = -k(x\\hat{x} + y\\hat{y})$ המושך לתחתית הטבעת.",
    formulaLatex:
      "U(x) = k R^2 + m g R - (k R + m g)\\sqrt{R^2 - x^2}",
    instruction:
      "מהי תדירות התנודות הקטנות $\\omega_0$ של החרוז סביב תחתית הטבעת ($x = 0$)?",
    options: [
      {
        id: "phys1-q20-opt1",
        plainText: "$\\omega_0 = \\sqrt{\\frac{g}{R}}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי תדירות מטוטלת פשוטה בהיעדר כוח הקפיץ ($k=0$).",
      },
      {
        id: "phys1-q20-opt2",
        plainText: "$\\omega_0 = \\sqrt{\\frac{k}{m}}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי תדירות של קפיץ חופשי בהיעדר כוח הכובד ועיקום הטבעת.",
      },
      {
        id: "phys1-q20-opt3",
        plainText: "$\\omega_0 = \\sqrt{\\frac{g}{R} + \\frac{k}{m}}$",
        mathText: "\\omega_0 = \\sqrt{\\frac{g}{R} + \\frac{k}{m}}",
        isCorrect: true,
        explanation:
          "נכון: הנגזרת השנייה של הפוטנציאל בראשית היא $U''(0) = \\frac{k R + m g}{R} = k + \\frac{m g}{R}$. תדירות התנודות הקטנות היא $\\omega_0 = \\sqrt{\\frac{U''(0)}{m}} = \\sqrt{\\frac{k}{m} + \\frac{g}{R}}$. שני הכוחות פועלים יחד להחזרת החרוז לשיווי משקל.",
      },
      {
        id: "phys1-q20-opt4",
        plainText: "$\\omega_0 = \\sqrt{\\frac{g}{R} - \\frac{k}{m}}$",
        isCorrect: false,
        explanation:
          "שגוי: כוח המשיכה של הקפיץ פועל לאותו כיוון מחזיר כמו הכבידה ולכן נוסף בסימן חיובי.",
      },
    ],
  },
  {
    id: "phys1-q21-colliding-discs-energy-loss-max",
    domain: "התנגשות פלסטית של גופים קשיחים ואיבוד אנרגיה",
    title: "פיזיקה 1 - התנגשות פלסטית של גופים קשיחים ואיבוד אנרגיה",
    context:
      "שתי דסקות זהות בעלות מסה $M$ ורדיוס $R$ נעות במהירויות מנוגדות $\\vec{v}_1, \\vec{v}_2$ עם פרמטר פגיעה $d$ ($2R > d$) ונדבקות זו לזו בהתנגשות.",
    formulaLatex:
      "\\Delta E = M(v_1 + v_2)^2 \\left[\\frac{1}{4} - \\frac{d^2}{24 R^2}\\right]",
    instruction:
      "עבור איזה מרחק פגיעה $d$ איבוד האנרגיה הקינטית בהתנגשות הוא מקסימלי?",
    options: [
      {
        id: "phys1-q21-opt1",
        plainText: "$d = 2R$ (התנגשות בקצה השפה)",
        isCorrect: false,
        explanation:
          "שגוי: בהתנגשות בקצה חלק גדול מאוד מהאנרגיה הופך לאנרגיית סיבוב סביב מרכז המסה, ולכן איבוד האנרגיה קטן יותר.",
      },
      {
        id: "phys1-q21-opt2",
        plainText: "$d = R$",
        isCorrect: false,
        explanation: "שגוי: ערך ביניים שאינו ממקסם את איבוד האנרגיה.",
      },
      {
        id: "phys1-q21-opt3",
        plainText: "$d = 0$ (התנגשות חזיתית מושלמת)",
        mathText: "d = 0",
        isCorrect: true,
        explanation:
          "נכון: כאשר $d = 0$, התנע הזוויתי סביב מרכז המסה מתאפס, ולכן המערכת אינה מסתובבת כלל לאחר ההתנגשות ($\\omega = 0$). כל האנרגיה הקינטית של התנועה היחסית מתבזבזת לחום ועיוות פלסטי, ללא שימור אנרגיה בסיבוב.",
      },
      {
        id: "phys1-q21-opt4",
        plainText: "איבוד האנרגיה קבוע ובלתי תלוי ב-$d$.",
        isCorrect: false,
        explanation:
          "שגוי: אנרגיית הסיבוב הסופית תלויה ישירות בריבוע פרמטר הפגיעה $d^2$.",
      },
    ],
  },
  {
    id: "phys1-q22-relativistic-incline-angle",
    domain: "יחסות פרטית והתכווצות אורך במדרון",
    title: "פיזיקה 1 - יחסות פרטית והתכווצות אורך במדרון",
    context:
      "מדרון בעל זווית שיפוע $\\theta$ ביחס לקרקע. טיל חולף במהירות יחסותית גבוהה $v$ במקביל לבסיס האופקי של המסילה.",
    formulaLatex: "l' = \\frac{l}{\\gamma} = l\\sqrt{1 - v^2/c^2}, \\quad h' = h",
    instruction:
      "מהי זווית השיפוע $\\theta'$ של המדרון כפי שהיא נמדדת במערכת המנוחה של הטיל?",
    options: [
      {
        id: "phys1-q22-opt1",
        plainText: "$\\theta' = \\theta$ (הזווית היא אינווריאנט לורנץ)",
        isCorrect: false,
        explanation:
          "שגוי: התכווצות האורך פועלת רק בכיוון התנועה ולכן משנה את היחס בין הניצב לבסיס.",
      },
      {
        id: "phys1-q22-opt2",
        plainText: "$\\tan\\theta' = \\frac{\\tan\\theta}{\\gamma}$",
        isCorrect: false,
        explanation:
          "שגוי: הבסיס בכיוון התנועה מתקצר ($l' = l/\\gamma$), ולכן השיפוע $\\tan\\theta' = h/l'$ גדל ולא קטן.",
      },
      {
        id: "phys1-q22-opt3",
        plainText: "$\\tan\\theta' = \\gamma \\tan\\theta$",
        mathText: "\\tan\\theta' = \\gamma \\tan\\theta",
        isCorrect: true,
        explanation:
          "נכון: הגובה $h$ ניצב לכיוון התנועה ולכן אינו עובר התכווצות לורנץ ($h' = h$). האורך האופקי $l$ מקביל לתנועה ומתכווץ: $l' = l/\\gamma$. לכן: $\\tan\\theta' = \\frac{h'}{l'} = \\frac{h}{l/\\gamma} = \\gamma \\frac{h}{l} = \\gamma \\tan\\theta$.",
      },
      {
        id: "phys1-q22-opt4",
        plainText: "$\\cos\\theta' = \\gamma \\cos\\theta$",
        isCorrect: false,
        explanation:
          "שגוי: היחס בין היתר לרכיבים אינו שומר על קוסינוס פשוט עקב עיוות המשולש.",
      },
    ],
  },
  {
    id: "phys1-q23-circular-pipe-rocket-torque",
    domain: "מערכות מסה משתנה ותנע זוויתי של צינור פולט גז",
    title: "פיזיקה 1 - מערכות מסה משתנה ותנע זוויתי של צינור פולט גז",
    context:
      "צינור קשיח חצי מעגלי בעל רדיוס $R$ ומסה $M$ פולט גז מקצהו בקצב קבוע $\\dot{m}$ ובמהירות $u$ משיקית לצינור בהיעדר כבידה. המרחק ממרכז המעגל למרכז המסה של הצינור הוא $R/2$.",
    formulaLatex: "I_{cm} = \\frac{3}{4}M R^2, \\quad \\tau_{cm} = R \\dot{m} u",
    instruction: "מהי התאוצה הזוויתית $\\ddot{\\theta}$ של הצינור סביב מרכז המסה שלו?",
    options: [
      {
        id: "phys1-q23-opt1",
        plainText: "$\\ddot{\\theta} = \\frac{\\dot{m} u}{M R}$",
        isCorrect: false,
        explanation:
          "שגוי: נשמט מומנט ההתמד המדויק של הצינור החצי-מעגלי סביב מרכז המסה שלו.",
      },
      {
        id: "phys1-q23-opt2",
        plainText: "$\\ddot{\\theta} = \\frac{4\\dot{m} u}{3M R^2}$",
        isCorrect: false,
        explanation:
          "שגוי: ניתוח ממדים שגוי של תאוצה זוויתית (חסרה חלוקה ברדיוס אחד).",
      },
      {
        id: "phys1-q23-opt3",
        plainText: "$\\ddot{\\theta} = \\frac{4\\dot{m} u}{3M R}$",
        mathText: "\\ddot{\\theta} = \\frac{4\\dot{m} u}{3M R}",
        isCorrect: true,
        explanation:
          "נכון: כוח הדחף שמפעיל הגז הנפלט הוא $F = \\dot{m}u$ הפועל משיקית במרחק $R$ ממרכז המעגל. מומנט ההתמד סביב מרכז המסה לפי משפט שטיינר הוא $I_{cm} = M R^2 - M(R/2)^2 = \\frac{3}{4}M R^2$. המומנט הוא $\\tau = R F = R \\dot{m} u$. מכאן: $\\ddot{\\theta} = \\frac{\\tau}{I_{cm}} = \\frac{R \\dot{m} u}{\\frac{3}{4}M R^2} = \\frac{4\\dot{m} u}{3M R}$.",
      },
      {
        id: "phys1-q23-opt4",
        plainText: "$\\ddot{\\theta} = \\frac{2\\dot{m} u}{M R}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה משימוש במומנט התמד סביב מרכז המעגל ולא סביב מרכז המסה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 24–30 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "phys1-q24-damped-pendulum-overdamping-condition",
    domain: "ריסון מלאכותי ותנאי לריסון חזק (Overdamping)",
    title: "פיזיקה 1 - ריסון מלאכותי ותנאי לריסון חזק (Overdamping)",
    context:
      "מטוטלת פיזיקלית מרוסנת על ידי מנוע המאיץ את נקודת התלייה בתאוצה $a = \\beta\\dot{\\theta}$. משוואת התנועה המתקבלת היא $\\ddot{\\theta} + \\frac{3\\beta}{2L}\\dot{\\theta} + \\frac{3g}{2L}\\theta = 0$.",
    formulaLatex: "\\omega_0^2 = \\frac{3g}{2L}, \\quad 2\\gamma = \\frac{3\\beta}{2L}",
    instruction:
      "מהו התנאי על מקדם הריסון $\\beta$ כדי שהמערכת תימצא במצב של ריסון חזק (ללא תנודות כלל)?",
    options: [
      {
        id: "phys1-q24-opt1",
        plainText: "$\\beta > \\sqrt{g L}$",
        isCorrect: false,
        explanation:
          "שגוי: ביטוי מקורב שאינו מתחשב במקדמי מומנט ההתמד של המוט הפיזיקלי.",
      },
      {
        id: "phys1-q24-opt2",
        plainText: "$\\beta > \\frac{2}{3}\\sqrt{g L}$",
        isCorrect: false,
        explanation: "שגוי: הפיכת היחס של מקדמי המשוואה הדיפרנציאלית.",
      },
      {
        id: "phys1-q24-opt3",
        plainText: "$\\beta = \\sqrt{\\frac{3gL}{2}}$",
        isCorrect: false,
        explanation:
          "שגוי: זהו מקרה בודד שאינו מקיים אי-שוויון לריסון חזק מלא.",
      },
      {
        id: "phys1-q24-opt4",
        plainText: "$\\beta > \\frac{2\\sqrt{2}}{\\sqrt{3}}\\sqrt{g L}$",
        mathText: "\\beta > \\sqrt{\\frac{8}{3} g L}",
        isCorrect: true,
        explanation:
          "נכון: תנאי לריסון חזק (Overdamping) באוסצילטור הרמוני הוא $\\gamma^2 > \\omega_0^2$. כאן $\\gamma = \\frac{3\\beta}{4L}$ ו-$\\omega_0^2 = \\frac{3g}{2L}$. נדרוש: $\\left(\\frac{3\\beta}{4L}\\right)^2 > \\frac{3g}{2L} \\implies \\frac{9\\beta^2}{16 L^2} > \\frac{3g}{2L} \\implies \\beta^2 > \\frac{8}{3}g L \\implies \\beta > \\frac{2\\sqrt{2}}{\\sqrt{3}}\\sqrt{g L}$.",
      },
    ],
  },
  {
    id: "phys1-q25-spacetime-interval-invariance",
    domain: "יחסות פרטית ואינווריאנטיות אינטרוול מרחב-זמן",
    title: "פיזיקה 1 - יחסות פרטית ואינווריאנטיות אינטרוול מרחב-זמן",
    context:
      "שני מאורעות מתרחשים במרחב-זמן. במערכת מעבדה $S$ הפרש הזמנים ביניהם הוא $\\Delta t$ והמרחק המרחבי הוא $\\Delta x$. במערכת נעה $S'$ ההפרשים הם $\\Delta t'$ ו-$\\Delta x'$.",
    formulaLatex: "s^2 = c^2 (\\Delta t)^2 - (\\Delta x)^2",
    instruction:
      "איזו מהטענות הבאות נכונה בהכרח לגבי אינטרוול מרחב-זמן $s^2$?",
    options: [
      {
        id: "phys1-q25-opt1",
        plainText:
          "האינטרוול גדל בפקטור $\\gamma$ במעבר למערכת הנעה במהירות $v$.",
        isCorrect: false,
        explanation:
          "שגוי: אינטרוול אינו תלוי במהירות המערכת; הוא גודל סקלרי שמור.",
      },
      {
        id: "phys1-q25-opt2",
        plainText:
          "האינטרוול שמור רק אם המאורעות מתרחשים באותו מקום במרחב ($\\Delta x = 0$).",
        isCorrect: false,
        explanation:
          "שגוי: האינטרוול שמור לכל זוג מאורעות במרחב-זמן, ללא תלות במיקומם.",
      },
      {
        id: "phys1-q25-opt3",
        plainText:
          "האינטרוול חיובי תמיד ($s^2 > 0$) עבור כל זוג מאורעות אפשרי בפיזיקה.",
        isCorrect: false,
        explanation:
          "שגוי: עבור מאורעות מופרדים מרחבית (שלא ניתן לחברם באות אור) האינטרוול שלילי ($s^2 < 0$).",
      },
      {
        id: "phys1-q25-opt4",
        plainText:
          "האינטרוול זהה לחלוטין בכל מערכות הייחוס האינרציאליות: $c^2 (\\Delta t)^2 - (\\Delta x)^2 = c^2 (\\Delta t')^2 - (\\Delta x')^2$.",
        mathText: "s^2 = s'^2 \\quad \\forall S, S'",
        isCorrect: true,
        explanation:
          "נכון: אינטרוול מרחב-זמן הוא אינווריאנט לורנץ יסודי. מהצבה ישירה של טרנספורמציית לורנץ: $c^2 t'^2 - x'^2 = c^2 \\gamma^2 (t - vx/c^2)^2 - \\gamma^2 (x - vt)^2 = c^2 t^2 - x^2$.",
      },
    ],
  },
  {
    id: "phys1-q26-unwinding-chain-moment-of-inertia",
    domain: "מומנט התמד ומסה של גוף בפרימת שרשרת",
    title: "פיזיקה 1 - מומנט התמד ומסה של גוף בפרימת שרשרת",
    context:
      "על גליל מלא ברדיוס $R$ ומסה $m$ מלופפת שרשרת במסה $M$ ואורך כולל $L$. נפרם מהגליל קטע שרשרת באורך $x$. השרשרת הדוקה סביב הגליל ברדיוס $R$.",
    formulaLatex: "m_{tot}(x) = m + M\\left(1 - \\frac{x}{L}\\right)",
    instruction:
      "מהו מומנט ההתמד הכולל $I_{tot}(x)$ של הגליל וחלקה של השרשרת שעדיין מלופף עליו?",
    options: [
      {
        id: "phys1-q26-opt1",
        plainText:
          "$I_{tot}(x) = \\frac{1}{2} m R^2 + \\frac{1}{2} M \\left(1 - \\frac{x}{L}\\right) R^2$",
        isCorrect: false,
        explanation:
          "שגוי: חלק השרשרת המלופף נמצא כולו על השפה ברדיוס $R$ (גליל חלול דק), ולכן אין עבורו פקטור $1/2$.",
      },
      {
        id: "phys1-q26-opt2",
        plainText:
          "$I_{tot}(x) = \\left[m + M\\left(1 - \\frac{x}{L}\\right)\\right] R^2$",
        isCorrect: false,
        explanation:
          "שגוי: הגליל הפנימי הוא גליל מלא שמומנט ההתמד שלו הוא $\\frac{1}{2}mR^2$ ולא $mR^2$.",
      },
      {
        id: "phys1-q26-opt3",
        plainText:
          "$I_{tot}(x) = \\frac{1}{2} m R^2 + M \\left(\\frac{x}{L}\\right) R^2$",
        isCorrect: false,
        explanation:
          "שגוי: הביטוי סוכם את החלק שנפרם במקום את החלק שנותר מלופף על הגליל.",
      },
      {
        id: "phys1-q26-opt4",
        plainText:
          "$I_{tot}(x) = \\frac{1}{2} m R^2 + M\\left(1 - \\frac{x}{L}\\right) R^2$",
        mathText:
          "I_{tot}(x) = \\frac{1}{2} m R^2 + M\\left(1 - \\frac{x}{L}\\right) R^2",
        isCorrect: true,
        explanation:
          "נכון: הגליל המלא תורם $\\frac{1}{2}m R^2$. השרשרת המלופפת מהווה קליפה גלילית דקה ברדיוס $R$ שמסתה $M(1 - x/L)$, ולכן מומנט ההתמד שלה הוא מסתה מוכפלת ישירות בריבוע הרדיוס: $M(1 - x/L)R^2$. סכומם נותן את מומנט ההתמד הכולל.",
      },
    ],
  },
  {
    id: "phys1-q27-double-incline-wedge-acceleration",
    domain: "טריז מאיץ ואיזון מסות בעזרת כוחות מדומים",
    title: "פיזיקה 1 - טריז מאיץ ואיזון מסות בעזרת כוחות מדומים",
    context:
      "טריז כפול בעל זוויות $\\theta_1, \\theta_2$ מאיץ אופקית בתאוצה $A$. שתי מסות $m_1, m_2$ מחוברות בחוט מעל קודקוד הטריז ונמצאות במנוחה ביחס לטריז ללא חיכוך.",
    formulaLatex:
      "T = m_1 g\\sin\\theta_1 + m_1 A\\cos\\theta_1 = m_2 g\\sin\\theta_2 - m_2 A\\cos\\theta_2",
    instruction:
      "מהו גודל תאוצת הטריז $A$ המבטיחה שהמסות יישארו במנוחה יחסית לטריז?",
    options: [
      {
        id: "phys1-q27-opt1",
        plainText:
          "$A = g \\frac{m_2 \\cos\\theta_2 - m_1 \\cos\\theta_1}{m_2 \\sin\\theta_2 + m_1 \\sin\\theta_1}$",
        isCorrect: false,
        explanation:
          "שגוי: החלפה שגויה בין פונקציות הסינוס והקוסינוס בפירוק כוח הכובד והכוח המדומה.",
      },
      {
        id: "phys1-q27-opt2",
        plainText: "$A = g \\tan(\\theta_2 - \\theta_1)$",
        isCorrect: false,
        explanation: "שגוי: ביטוי שמתעלם מיחס המסות $m_1, m_2$.",
      },
      {
        id: "phys1-q27-opt3",
        plainText:
          "$A = g \\frac{m_2 \\sin\\theta_2 + m_1 \\sin\\theta_1}{m_2 \\cos\\theta_2 - m_1 \\cos\\theta_1}$",
        isCorrect: false,
        explanation:
          "שגוי: סימן חיבור שגוי במונה המבטא כוחות הפועלים לאותו כיוון במקום להתנגד.",
      },
      {
        id: "phys1-q27-opt4",
        plainText:
          "$A = g \\frac{m_2 \\sin\\theta_2 - m_1 \\sin\\theta_1}{m_2 \\cos\\theta_2 + m_1 \\cos\\theta_1}$",
        mathText:
          "A = \\frac{g(m_2\\sin\\theta_2 - m_1\\sin\\theta_1)}{m_2\\cos\\theta_2 + m_1\\cos\\theta_1}",
        isCorrect: true,
        explanation:
          "נכון: במערכת המואצת של הטריז, על מסה 1 פועל כוח מדומה $m_1 A$ שמאלה שרכיבו במורד המדרון הוא $m_1 A\\cos\\theta_1$, ועל מסה 2 רכיבו במעלה המדרון הוא $m_2 A\\cos\\theta_2$. ממשוואות שיווי המשקל לאורך החוט: $T = m_1 g\\sin\\theta_1 + m_1 A\\cos\\theta_1$ ו-$T = m_2 g\\sin\\theta_2 - m_2 A\\cos\\theta_2$. השוואת המתיחויות ובידוד $A$ נותנים את התוצאה.",
      },
    ],
  },
  {
    id: "phys1-q28-coriolis-force-vector-direction",
    domain: "כוח קוריוליס במערכת ייחוס מסתובבת",
    title: "פיזיקה 1 - כוח קוריוליס במערכת ייחוס מסתובבת",
    context:
      "צינור מסתובב במישור האופקי במהירות זוויתית קבועה $\\vec{\\omega} = \\omega \\hat{z}$. גוף בתוך הצינור נע בכיוון הרדיאלי החוצה במהירות $\\vec{v}' = v \\hat{x}'$ ביחס לצינור.",
    formulaLatex: "\\vec{F}_{cor} = -2m (\\vec{\\omega} \\times \\vec{v}')",
    instruction: "מהו וקטור כוח קוריוליס הפועל על הגוף במערכת הצינור?",
    options: [
      {
        id: "phys1-q28-opt1",
        plainText:
          "$\\vec{F}_{cor} = 2m\\omega v \\hat{x}'$ (בכיוון הרדיאלי החוצה)",
        isCorrect: false,
        explanation:
          "שגוי: כוח קוריוליס מאונך תמיד לכיוון המהירות היחסית, ולכן אינו יכול לפעול בכיוון $\\hat{x}'$.",
      },
      {
        id: "phys1-q28-opt2",
        plainText: "$\\vec{F}_{cor} = m\\omega^2 x \\hat{x}'$",
        isCorrect: false,
        explanation: "שגוי: זהו הכוח הצנטריפוגלי ולא כוח קוריוליס.",
      },
      {
        id: "phys1-q28-opt3",
        plainText: "$\\vec{F}_{cor} = 2m\\omega v \\hat{y}'$",
        isCorrect: false,
        explanation:
          "שגוי: נשמט סימן המינוס מהגדרת הכוח המדומה של קוריוליס.",
      },
      {
        id: "phys1-q28-opt4",
        plainText:
          "$\\vec{F}_{cor} = -2m\\omega v \\hat{y}'$ (בכיוון המשיקי הלוחץ על דופן הצינור)",
        mathText: "\\vec{F}_{cor} = -2m\\omega v \\hat{y}'",
        isCorrect: true,
        explanation:
          "נכון: לפי הגדרת כוח קוריוליס: $\\vec{F}_{cor} = -2m (\\vec{\\omega} \\times \\vec{v}') = -2m (\\omega\\hat{z} \\times v\\hat{x}') = -2m\\omega v (\\hat{z} \\times \\hat{x}') = -2m\\omega v \\hat{y}'$. כוח זה לוחץ את הגוף כנגד דופן הצינור ומאוזן על ידי כוח הנורמל.",
      },
    ],
  },
  {
    id: "phys1-q29-unstable-square-pivot-collision",
    domain: "שימור תנע זוויתי בהתנגשות בגוף קשיח סביב ציר",
    title: "פיזיקה 1 - שימור תנע זוויתי בהתנגשות בגוף קשיח סביב ציר",
    context:
      "דסקה ריבועית במסה $M$ וצלע $a$ ($I_{cm} = \\frac{1}{6}M a^2$) עומדת על קודקודה על משטח מחוספס מאוד בשיווי משקל לא יציב. מסה נקודתית $m$ הנעה במהירות $v_0$ פוגעת בפינה העליונה ונדבקת אליה.",
    formulaLatex:
      "L_{pivot} = m v_0 \\frac{a}{\\sqrt{2}} = I_{new} \\omega, \\quad I_{new} = \\frac{2}{3}M a^2 + 2m a^2",
    instruction:
      "מהי המהירות הזוויתית $\\omega$ של המערכת מיד לאחר ההתנגשות ביחס לקודקוד התחתון?",
    options: [
      {
        id: "phys1-q29-opt1",
        plainText: "$\\omega = \\frac{v_0}{a}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה המניחה התנגשות של מסות נקודתיות ללא אינרציית גוף קשיח.",
      },
      {
        id: "phys1-q29-opt2",
        plainText: "$\\omega = \\frac{m v_0}{M a}$",
        isCorrect: false,
        explanation:
          "שגוי: התעלמות מהמרחק הגאומטרי לקודקוד (אלכסון $\\sqrt{2}a$) וממשפט שטיינר.",
      },
      {
        id: "phys1-q29-opt3",
        plainText: "$\\omega = \\frac{v_0}{a\\left(1 + \\frac{M}{m}\\right)}$",
        isCorrect: false,
        explanation:
          "שגוי: המקדמים המספריים של מומנט התמד ריבועי אינם תואמים.",
      },
      {
        id: "phys1-q29-opt4",
        plainText: "$\\omega = \\frac{v_0}{a\\left(2 + \\frac{2M}{3m}\\right)}$",
        mathText: "\\omega = \\frac{v_0}{a\\left(2 + \\frac{2}{3}\\frac{M}{m}\\right)}",
        isCorrect: true,
        explanation:
          "נכון: מומנט ההתמד של הריבוע סביב הקודקוד לפי שטיינר הוא $I_{sq} = \\frac{1}{6}Ma^2 + M(a/\\sqrt{2})^2 = \\frac{2}{3}Ma^2$. המסה $m$ פוגעת במרחק אלכסון מלא $\\sqrt{2}a$ ולכן תורמת $m(\\sqrt{2}a)^2 = 2ma^2$. התנע הזוויתי לפני הפגיעה סביב הציר הוא $L = m v_0 \\frac{a}{\\sqrt{2}} \\cdot \\sqrt{2} = m v_0 a$. השוואת התנע הזוויתי: $m v_0 a = (2ma^2 + \\frac{2}{3}Ma^2)\\omega \\implies \\omega = \\frac{v_0}{a(2 + \\frac{2M}{3m})}$.",
      },
    ],
  },
  {
    id: "phys1-q30-relativistic-pursuit-arrival-time",
    domain: "יחסות פרטית וזמני הגעה של טיל לכוכב",
    title: "פיזיקה 1 - יחסות פרטית וזמני הגעה של טיל לכוכב",
    context:
      "חללית טסה לעבר כוכב $B$ במהירות $\\frac{c}{2}$ ביחס לכוכב. בהגיעה למרחק $L$ מהכוכב (כפי שנמדד במערכת הכוכב), היא יורה טיל לעבר הכוכב במהירות $\\frac{c}{2}$ ביחס לחללית.",
    formulaLatex: "u' = \\frac{\\frac{c}{2} + \\frac{c}{2}}{1 + 1/4} = \\frac{4}{5}c",
    instruction:
      "מהו משך הזמן בין יריית הטיל לפגיעתו בכוכב כפי שנמדד במערכת הכוכב ($t$) ובמערכת החללית ($t_{ship}$)?",
    options: [
      {
        id: "phys1-q30-opt1",
        plainText: "$t = \\frac{L}{c}, \\quad t_{ship} = \\frac{L}{2c}$",
        isCorrect: false,
        explanation:
          "שגוי: מהירות הטיל ביחס לכוכב אינה $c$ אלא $\\frac{4}{5}c$ לפי חיבור מהירויות יחסותי.",
      },
      {
        id: "phys1-q30-opt2",
        plainText:
          "$t = \\frac{5L}{4c}, \\quad t_{ship} = \\frac{5L}{4c}$ (שוויון זמנים מוחלט)",
        isCorrect: false,
        explanation:
          "שגוי: הזמן אינו גודל מוחלט; במעבר בין מערכות ייחוס יחסותיות חלה התארכות זמן והתכווצות מרחק.",
      },
      {
        id: "phys1-q30-opt3",
        plainText: "$t = \\frac{4L}{5c}, \\quad t_{ship} = \\frac{\\sqrt{3}L}{c}$",
        isCorrect: false,
        explanation:
          "שגוי: היפוך השבר בחישוב הזמן במערכת הכוכב ($L / (4c/5) = 5L/4c$).",
      },
      {
        id: "phys1-q30-opt4",
        plainText:
          "$t = \\frac{5L}{4c}, \\quad t_{ship} = \\frac{\\sqrt{3}L}{2c}$",
        mathText: "t = \\frac{5L}{4c}, \\quad t_{ship} = \\frac{\\sqrt{3}L}{2c}",
        isCorrect: true,
        explanation:
          "נכון: במערכת הכוכב, מהירות הטיל לפי חיבור מהירויות היא $u = \\frac{c/2 + c/2}{1 + 1/4} = \\frac{4}{5}c$. לכן זמן ההגעה הוא $t = \\frac{L}{4c/5} = \\frac{5L}{4c}$. במערכת החללית, המרחק לכוכב מתכווץ לפי לורנץ: $L' = L/\\gamma = L\\sqrt{1 - 1/4} = \\frac{\\sqrt{3}}{2}L$. מהירות ההתקרבות של הכוכב והטיל בעיני החללית היא $c/2 + c/2 = c$, ולכן הזמן הוא $t_{ship} = \\frac{L'}{c} = \\frac{\\sqrt{3}L}{2c}$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_PHYSICS_1_QUESTIONS = PHYSICS_1_QUESTIONS;

/**
 * Stratified sample of exactly 3 questions from the 30Q master pool:
 * stratum 1: kinematics / forces / energy / friction (Q1–10)
 * stratum 2: rigid body / inertia / rolling / variable mass (Q11–20)
 * stratum 3: oscillations / fictitious forces / central forces / relativity (Q21–30)
 */
export function samplePhysics1OnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = PHYSICS_1_QUESTIONS.slice(0, 10);
  const groupB = PHYSICS_1_QUESTIONS.slice(10, 20);
  const groupC = PHYSICS_1_QUESTIONS.slice(20, 30);

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
