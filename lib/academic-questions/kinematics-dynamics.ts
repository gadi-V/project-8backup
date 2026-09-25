import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic קינמטיקה ודינמיקה של גופים ומנגנונים diagnostic bank (12Q).
 * Display name: "קינמטיקה ודינמיקה של גופים ומנגנונים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const KINEMATICS_DYNAMICS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "dyn-q01-coriolis-acceleration-rotating-frame",
    domain: "תאוצת קוריוליס",
    title: "קינמטיקה ודינמיקה - קינמטיקה במערכת צירים מסתובבת ותאוצת קוריוליס",
    context:
      "גוף נע בתוך מסילה ישרה המסתובבת במהירות זוויתית קבועה $\\vec{\\omega} = \\omega \\hat{k}$ סביב ציר אנכי קבוע בראשית $O$. הגוף מתרחק מהראשית במהירות יחסית קבועה $\\vec{v}_{rel} = v_r \\hat{e}_r$ לאורך המסילה.",
    formulaLatex:
      "\\vec{a} = \\vec{a}_{frame} + \\vec{a}_{rel} + \\vec{a}_{cor} = -r\\omega^2 \\hat{e}_r + 2\\vec{\\omega} \\times \\vec{v}_{rel}",
    instruction:
      "מהו גודלה וכיוונה של תאוצת קוריוליס (Coriolis Acceleration) $\\vec{a}_{cor}$ הפועלת על הגוף?",
    options: [
      {
        id: "dyn-q01-opt1",
        plainText:
          "$\\vec{a}_{cor} = 2\\omega v_r \\hat{e}_\\theta$; תאוצה משיקית הניצבת למסילה בכיוון הסיבוב, הנובעת הן משינוי כיוון המהירות היחסית במרחב והן משינוי מהירות הגרירה ככל שהרדיוס גדל.",
        mathText: "\\vec{a}_{cor} = 2\\vec{\\omega} \\times \\vec{v}_{rel} = 2(\\omega \\hat{k}) \\times (v_r \\hat{e}_r) = 2\\omega v_r \\hat{e}_\\theta",
        isCorrect: true,
        explanation:
          "נכון: תאוצת קוריוליס מוגדרת כ-$\\vec{a}_{cor} = 2\\vec{\\omega} \\times \\vec{v}_{rel}$. בהצבת $\\vec{\\omega} = \\omega \\hat{k}$ ו-$\\vec{v}_{rel} = v_r \\hat{e}_r$: $\\hat{k} \\times \\hat{e}_r = \\hat{e}_\\theta$, ולכן $\\vec{a}_{cor} = 2\\omega v_r \\hat{e}_\\theta$. גודלה $2\\omega v_r$ והיא ניצבת למסילה בכיוון התנועה הזוויתית. גורם ה-$2$ משקף שני מנגנונים פיזיקליים נפרדים השווים בעוצמתם: (1) סיבוב וקטור המהירות היחסית במרחב האינרציאלי בקצב $\\omega$, (2) תנועת החלקיק לרדיוס גדול יותר שבו מהירות הגרירה המשיקית של המערכת המסתובבת ($v_{drag} = r\\omega$) גבוהה יותר.",
      },
      {
        id: "dyn-q01-opt2",
        plainText: "$\\vec{a}_{cor} = \\omega v_r \\hat{e}_\\theta$ ללא פקטור $2$.",
        isCorrect: false,
        explanation:
          "שגוי: פקטור $2$ הוא תוצאה מתמטית ישירה של כלל השרשרת וגזירת וקטורי היחידה המסתובבים בזמן.",
      },
      {
        id: "dyn-q01-opt3",
        plainText: "$\\vec{a}_{cor} = -r\\omega^2 \\hat{e}_r$ ומכוונת אל מרכז הסיבוב.",
        isCorrect: false,
        explanation:
          "שגוי: זהו איבר התאוצה הצנטריפטלית (גרירה צנטריפוגלית במערכת הלא-אינרציאלית), ולא תאוצת קוריוליס.",
      },
      {
        id: "dyn-q01-opt4",
        plainText:
          "$\\vec{a}_{cor} = 0$ משום שמהירות הסיבוב הזוויתית $\\omega$ קבועה בזמן (אין תאוצה זוויתית $\\dot{\\omega} = 0$).",
        isCorrect: false,
        explanation:
          "שגוי: תאוצת קוריוליס אינה תלויה ב-$\\dot{\\omega}$ אלא במהירות הזוויתית $\\omega$ ובמהירות היחסית $v_{rel}$, ומתאפסת רק אם הגוף נח במסילה ($v_{rel} = 0$).",
      },
    ],
  },
  {
    id: "dyn-q02-instantaneous-center-of-rotation-icz",
    domain: "מרכז סיבוב רגעי",
    title: "קינמטיקה ודינמיקה - תנועה מישורית של גוף קשיח ומרכז סיבוב רגעי (ICR / ICZ)",
    context:
      "גליל בעל רדיוס $R$ מתגלגל ללא החלקה (Rolling without slipping) על גבי משטח אופקי נייח. מרכז המסה של הגליל נע במהירות קווית אופקית $v_{cm}$.",
    formulaLatex: "\\vec{v}_P = \\vec{v}_{cm} + \\vec{\\omega} \\times \\vec{r}_{P/cm}, \\quad \\vec{v}_{ICR} = 0",
    instruction:
      "היכן נמצא מרכז הסיבוב הרגעי (ICR) של הגליל, ומהן המהירויות של נקודת המגע עם הקרקע ($B$) והנקודה העליונה ביותר של הגליל ($T$)?",
    options: [
      {
        id: "dyn-q02-opt1",
        plainText:
          "ה-ICR נמצא בנקודת המגע הרגעית עם המשטח ($B$); מהירות נקודת המגע היא אפס ($v_B = 0$), ומהירות הנקודה העליונה היא כפולה ממהירות המרכז ($v_T = 2 v_{cm}$).",
        mathText: "v_B = 0, \\quad v_{cm} = \\omega R, \\quad v_T = 2\\omega R = 2v_{cm}",
        isCorrect: true,
        explanation:
          "נכון: בתנאי גלגול ללא החלקה, נקודת המגע של הגליל עם המשטח הנייח נחה רגעית ביחס למשטח ($v_B = 0$). לכן נקודה $B$ היא בהגדרה מרכז הסיבוב הרגעי (ICR). התנועה המישורית של כל נקודה בגוף שקולה באותו רגע לסיבוב טהור סביב נקודת המגע $B$ במהירות זוויתית $\\omega = v_{cm}/R$. מרחק נקודת המרכז מ-$B$ הוא $R$, ולכן $v_{cm} = \\omega R$. מרחק הנקודה העליונה $T$ מ-$B$ הוא קוטר שלם ($2R$), ולכן מהירותה היא $v_T = \\omega (2R) = 2v_{cm}$.",
      },
      {
        id: "dyn-q02-opt2",
        plainText:
          "ה-ICR נמצא במרכז המסה של הגליל; מהירות נקודת המגע היא $v_{cm}$, ומהירות הנקודה העליונה היא $v_{cm}$.",
        isCorrect: false,
        explanation:
          "שגוי: מרכז המסה נע במהירות $v_{cm}$ ולכן אינו יכול להוות מרכז מהירות אפס (אלא אם הגליל סובב סביב ציר קבוע).",
      },
      {
        id: "dyn-q02-opt3",
        plainText: "מהירות כל הנקודות על שפת הגליל שווה במדויק ל-$v_{cm}$ משימור אנרגיה קינטית.",
        isCorrect: false,
        explanation:
          "שגוי: התנועה היא צירוף של העתקה וסיבוב ולכן מהירות הנקודות משתנה במרחב בין $0$ ל-$2v_{cm}$.",
      },
      {
        id: "dyn-q02-opt4",
        plainText: "ה-ICR נמצא באינסוף משום שהתנועה היא העתקה קווית טהורה ללא סיבוב.",
        isCorrect: false,
        explanation:
          "שגוי: גלגול מחייב סיבוב מובהק במהירות $\\omega = v_{cm}/R$; ICR באינסוף מתקבל רק בהעתקה טהורה ($\\omega = 0$).",
      },
    ],
  },
  {
    id: "dyn-q03-lagrangian-mechanics-generalized-coordinates",
    domain: "מכניקה לגראנז׳יאנית",
    title: "קינמטיקה ודינמיקה - מכניקה אנליטית ומשוואות אוילר-לגראנז׳",
    context:
      "מטוטלת כפולה מישורית מורכבת משתי מסות נקודתיות $m_1, m_2$ המחוברות באמצעות שני מוטות קשיחים חסרי מסה באורכים $l_1, l_2$. המערכת פועלת תחת שדה כובד אחיד $g$ ללא חיכוך.",
    formulaLatex:
      "L = T - V, \\quad \\frac{d}{dt}\\left(\\frac{\\partial L}{\\partial \\dot{\\theta}_i}\\right) - \\frac{\\partial L}{\\partial \\theta_i} = 0, \\quad i \\in \\{1, 2\\}",
    instruction:
      "מהם מספר דרגות החופש (DOF) של המערכת, וכיצד מוגדר הלגראנז׳יאן $L$ במערכת משמרת הולונומית?",
    options: [
      {
        id: "dyn-q03-opt1",
        plainText:
          "למערכת יש בדיוק $2$ דרגות חופש הניתנות לתיאור ע״י זוויות המוטות ביחס לאנך ($\\theta_1, \\theta_2$), והלגראנז׳יאן מוגדר כהפרש בין האנרגיה הקינטית לפוטנציאלית: $L = T - V$.",
        mathText: "\\text{DOF} = 2, \\quad L = T(\\theta_1, \\theta_2, \\dot{\\theta}_1, \\dot{\\theta}_2) - V(\\theta_1, \\theta_2)",
        isCorrect: true,
        explanation:
          "נכון: שתי מסות במישור הן בעלות $2 \\times 2 = 4$ קואורדינטות קרטזיות. שני המוטות הקשיחים מטילים שני אילוצים גאומטריים הולונומיים קשיחים על המרחקים: $x_1^2 + y_1^2 = l_1^2$ ו-$(x_2 - x_1)^2 + (y_2 - y_1)^2 = l_2^2$. לכן מספר דרגות החופש הוא $4 - 2 = 2$. הקואורדינטות המוכללות הנוחות הן זוויות ההטיה של המוטות מהאנך $(\\theta_1, \\theta_2)$. במכניקה לגראנז׳יאנית עבור מערכות משמרות, הלגראנז׳יאן מוגדר כ-$L = T - V$, ומשוואות התנועה מתקבלות ישירות מעקרון הפעולה המינימלית של המילטון דרך משוואות אוילר-לגראנז׳ ללא צורך בכוחות תגובה פנימיים במוטות.",
      },
      {
        id: "dyn-q03-opt2",
        plainText: "למערכת יש $4$ דרגות חופש משום שכל מסה דורשת שתי קואורדינטות מהירות נפרדות.",
        isCorrect: false,
        explanation: "שגוי: אילוצי המוטות הקשיחים מקטינים את מספר דרגות החופש מ-$4$ ל-$2$.",
      },
      {
        id: "dyn-q03-opt3",
        plainText: "הלגראנז׳יאן מוגדר כסכום האנרגיות: $L = T + V$, המייצג את האנרגיה המכנית הכוללת.",
        isCorrect: false,
        explanation: "שגוי: סכום האנרגיות $T+V$ הוא ההמילטוניאן ($H$), בעוד שהלגראנז׳יאן הוא תמיד ההפרש $L = T - V$.",
      },
      {
        id: "dyn-q03-opt4",
        plainText: "למערכת יש דרגת חופש יחידה משום ששתי המסות מצומדות באותו מישור אנכי.",
        isCorrect: false,
        explanation: "שגוי: המסה השנייה חופשית להסתובב בזווית $\\theta_2$ בלתי תלויה בזווית המסה הראשונה $\\theta_1$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "dyn-q04-parallel-axis-theorem-3d-inertia-tensor",
    domain: "טנזור אינרציה ומשפט שטיינר",
    title: "קינמטיקה ודינמיקה - טנזור אינרציה תלת-ממדי ומשפט הצירים המקבילים (שטיינר)",
    context:
      "טנזור האינרציה של גוף קשיח בעל מסה $m$ סביב מרכז המסה שלו מסומן ב-$[I_{cm}]$. מעתיקים את מערכת הצירים במקביל לנקודה $P$ המוגדרת ע״י וקטור ההעתקה $\\vec{d} = (d_x, d_y, d_z)^T$.",
    formulaLatex: "I_{xx}^P = I_{xx}^{cm} + m(d_y^2 + d_z^2), \\quad I_{xy}^P = I_{xy}^{cm} - m d_x d_y",
    instruction:
      "כיצד מנוסח משפט שטיינר המוכלל לטנזור האינרציה התלת-ממדי, ומהם האיברים האלכסוניים מול איברי המכפלה?",
    options: [
      {
        id: "dyn-q04-opt1",
        plainText: "מומנטי האינרציה האלכסוניים קטנים ב-$m d^2$ כאשר מתרחקים ממרכז המסה.",
        isCorrect: false,
        explanation:
          "שגוי: מומנט האינרציה סביב מרכז המסה הוא המינימלי ביותר; התרחקות ממרכז המסה מגדילה תמיד את מומנט האינרציה ($+m d^2$) ולא מקטינה אותו.",
      },
      {
        id: "dyn-q04-opt2",
        plainText:
          "האיברים האלכסוניים גדלים במסת הגוף כפול ריבוע המרחק מציר הסיבוב החדש: $I_{xx}^P = I_{xx}^{cm} + m(d_y^2 + d_z^2)$; ואילו איברי מכפלת האינרציה מוסטים ע״י $I_{xy}^P = I_{xy}^{cm} - m d_x d_y$ (בהתאם להגדרת הסימן של מכפלת האינרציה).",
        mathText: "\\mathbf{I}_P = \\mathbf{I}_{cm} + m \\left[ (\\vec{d} \\cdot \\vec{d}) \\mathbf{E} - \\vec{d} \\otimes \\vec{d} \\right]",
        isCorrect: true,
        explanation:
          "נכון: משפט הצירים המקבילים בצורתו הטנזורית: $\\mathbf{I}_P = \\mathbf{I}_{cm} + m [(\\vec{d}^T\\vec{d})\\mathbf{I}_{3\\times 3} - \\vec{d}\\vec{d}^T]$. ברמת הרכיבים: המרחק של נקודה מהציר $x$ החדש תלוי בקואורדינטות $y$ ו-$z$, ולכן מומנט האינרציה העצמי גדל בסכום ריבועי ההיסט הניצבים: $I_{xx}^P = I_{xx}^{cm} + m(d_y^2 + d_z^2)$. לעומת זאת, מכפלות האינרציה (המוגדרות לפי ההגדרה הקלאסית כ-$I_{xy} = -\\iiint x y \\rho\\, dV$) מקבלות תוספת הסטה הפרשית של $-m d_x d_y$. משפט זה מאפשר מעבר פשוט בין צירים ראשיים במרכז המסה לנקודות משען שרירותיות.",
      },
      {
        id: "dyn-q04-opt3",
        plainText: "טנזור האינרציה של כל גוף תלת-ממדי הופך למטריצה אלכסונית לכל נקודת ייחוס.",
        isCorrect: false,
        explanation:
          "שגוי: טנזור האינרציה הוא אלכסוני אך ורק כאשר מערכת הצירים מיושרת לאורך הצירים הראשיים (Principal Axes of Inertia) של הגוף.",
      },
      {
        id: "dyn-q04-opt4",
        plainText: "משפט הצירים המקבילים תקף אך ורק לגופים בעלי סימטריה גלילית או כדורית.",
        isCorrect: false,
        explanation: "שגוי: משפט שטיינר הוא זהות אלגברית אוניברסלית התקפה לכל גוף קשיח בעל צורה שרירותית.",
      },
    ],
  },
  {
    id: "dyn-q05-damped-oscillation-logarithmic-decrement",
    domain: "דקרמנט לוגריתמי",
    title: "קינמטיקה ודינמיקה - תנודות חופשיות מרוסנות ודקרמנט לוגריתמי",
    context:
      "מתנד הרמוני בעל דרגת חופש יחידה עם מסה $m$, קפיץ $k$, ומרסן צמיג $c$ פועל בתחום תת-ריסון ($0 < \\zeta < 1$). המשוואה: $\\ddot{x} + 2\\zeta \\omega_n \\dot{x} + \\omega_n^2 x = 0$. מודדים שתי משרעות שיא עוקבות באותו כיוון: $x_1$ ו-$x_2$.",
    formulaLatex:
      "\\omega_n = \\sqrt{\\frac{k}{m}}, \\quad \\zeta = \\frac{c}{2\\sqrt{km}}, \\quad \\delta = \\ln\\left(\\frac{x_1}{x_2}\\right) = \\frac{2\\pi \\zeta}{\\sqrt{1 - \\zeta^2}}",
    instruction:
      "מהו הדקרמנט הלוגריתמי $\\delta$ (Logarithmic Decrement), וכיצד הוא מאפשר לחלץ ישירות את מקדם הריסון $\\zeta$ בניסוי מעבדה?",
    options: [
      {
        id: "dyn-q05-opt1",
        plainText: "$\\delta = 2\\pi \\zeta \\omega_n$; חילוץ הריסון דורש מדידה מדויקת של מסת הקפיץ בלבד.",
        isCorrect: false,
        explanation: "שגוי: הנוסחה חסרת הממד תלויה ב-$\\zeta$ בלבד ואינה תלויה בתדירות הטבעית $\\omega_n$.",
      },
      {
        id: "dyn-q05-opt2",
        plainText:
          "$\\delta = \\ln(x_1 / x_2) = \\frac{2\\pi \\zeta}{\\sqrt{1 - \\zeta^2}}$; מתוך מדידת יחס המשרעות מחלצים את מקדם הריסון במדויק ע״י $\\zeta = \\frac{\\delta}{\\sqrt{4\\pi^2 + \\delta^2}}$ (ולריסון קל $\\zeta \\approx \\frac{\\delta}{2\\pi}$).",
        mathText:
          "\\delta = \\ln\\left(\\frac{x_1}{x_2}\\right) = \\frac{2\\pi \\zeta}{\\sqrt{1 - \\zeta^2}} \\implies \\zeta = \\frac{\\delta}{\\sqrt{4\\pi^2 + \\delta^2}}",
        isCorrect: true,
        explanation:
          "נכון: תגובת המערכת בתת-ריסון היא $x(t) = X_0 e^{-\\zeta \\omega_n t} \\cos(\\omega_d t - \\phi)$, כאשר זמן המחזור המשוכך הוא $\\tau_d = \\frac{2\\pi}{\\omega_d} = \\frac{2\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}}$. יחס המשרעות בין שני שיאים במרחק מחזור אחד: $\\frac{x(t)}{x(t + \\tau_d)} = e^{\\zeta \\omega_n \\tau_d} = e^{\\frac{2\\pi \\zeta}{\\sqrt{1 - \\zeta^2}}}$. לוגריתם טבעי של יחס זה מגדיר את הדקרמנט הלוגריתמי: $\\delta = \\ln(x_1/x_2) = \\frac{2\\pi\\zeta}{\\sqrt{1-\\zeta^2}}$. בידוד אלגברי של $\\zeta$: $\\delta^2(1 - \\zeta^2) = 4\\pi^2 \\zeta^2 \\implies \\zeta^2(4\\pi^2 + \\delta^2) = \\delta^2 \\implies \\zeta = \\frac{\\delta}{\\sqrt{4\\pi^2 + \\delta^2}}$. זוהי השיטה הניסויית הסטנדרטית ביותר למדידת מקדם שיכוך בחומרים ומבנים.",
      },
      {
        id: "dyn-q05-opt3",
        plainText: "$\\delta = 1 - \\zeta^2$, והוא מתאפס כאשר אין חיכוך חיצוני באוויר.",
        isCorrect: false,
        explanation:
          "שגוי: כאשר אין ריסון ($\\zeta = 0$) מתקיים $x_1 = x_2 \\implies \\delta = \\ln(1) = 0$, אך התלות ב-$\\zeta$ אינה ריבועית.",
      },
      {
        id: "dyn-q05-opt4",
        plainText: "הדקרמנט תלוי במשרעת ההתחלתית $X_0$ ומחייב תנודות גדולות בלבד.",
        isCorrect: false,
        explanation: "שגוי: במערכת ליניארית היחס $x_1/x_2$ קבוע לחלוטין ובלתי תלוי באמפליטודת ההתחלה.",
      },
    ],
  },
  {
    id: "dyn-q06-rolling-down-incline-acceleration",
    domain: "גלגול על מישור משופע",
    title: "קינמטיקה ודינמיקה - תנועה משולבת של גופים קשיחים על מישור משופע",
    context:
      "גוף קשיח מעגלי בעל מסה $m$, רדיוס $R$, ומומנט אינרציה סביב מרכז המסה $I_{cm} = \\beta m R^2$ (כאשר $\\beta = 1/2$ לגליל מלא, $\\beta = 2/5$ לכדור מלא, ו-$\\beta = 1$ לחישוק דק) משוחרר ממנוחה על גבי מישור משופע בזווית $\\theta$. הגוף מתגלגל ללא החלקה תחת כוח חיכוך סטטי $f_s$.",
    formulaLatex: "m g \\sin\\theta - f_s = m a_{cm}, \\quad f_s R = I_{cm} \\alpha, \\quad a_{cm} = \\alpha R",
    instruction: "מהי תאוצת מרכז המסה $a_{cm}$ של הגוף, ואיזה גוף יגיע ראשון לתחתית המדרון?",
    options: [
      {
        id: "dyn-q06-opt1",
        plainText: "$a_{cm} = g\\sin\\theta$ לכל הגופים, וכולם יגיעו יחד באותו זמן בדיוק.",
        isCorrect: false,
        explanation:
          "שגוי: תאוצה $g\\sin\\theta$ מתקבלת בהחלקה חסרת חיכוך בלבד. בגלגול, חלק מהאנרגיה הפוטנציאלית מושקע בסיבוב, מה שמאיט את ההתקדמות הקווית.",
      },
      {
        id: "dyn-q06-opt2",
        plainText:
          "$a_{cm} = \\frac{g\\sin\\theta}{1 + \\beta} = \\frac{g\\sin\\theta}{1 + I_{cm}/(mR^2)}$; הכדור המלא ($\\beta = 0.4$) יגיע ראשון, אחריו הגליל המלא ($\\beta = 0.5$), והחישוק הדק ($\\beta = 1.0$) יגיע אחרון.",
        mathText: "a_{cm} = \\frac{g\\sin\\theta}{1 + \\beta}, \\quad a_{\\text{sphere}} > a_{\\text{cylinder}} > a_{\\text{hoop}}",
        isCorrect: true,
        explanation:
          "נכון: ממשוואת מומנטים סביב מרכז המסה: $f_s R = I_{cm}\\alpha = (\\beta m R^2)(a_{cm}/R) \\implies f_s = \\beta m a_{cm}$. נציב במשוואת הכוחות לאורך המדרון: $m g \\sin\\theta - \\beta m a_{cm} = m a_{cm} \\implies a_{cm}(1 + \\beta) = g\\sin\\theta \\implies a_{cm} = \\frac{g\\sin\\theta}{1 + \\beta}$. ככל שמקדם האינרציה $\\beta$ קטן יותר, פחות אנרגיה מומרת לסיבוב עצמי ויותר לתנועה קווית. לכן: כדור מלא ($a = \\frac{5}{7}g\\sin\\theta$) מאיץ הכי מהר ויגיע ראשון; גליל מלא ($a = \\frac{2}{3}g\\sin\\theta$) מגיע שני; וחישוק חלול ($a = \\frac{1}{2} g\\sin\\theta$) מגיע אחרון (בלתי תלוי במסות וברדיוסים שלהם).",
      },
      {
        id: "dyn-q06-opt3",
        plainText: "החישוק הדק יגיע ראשון משום שכל המסה שלו מרוכזת ברדיוס החיצוני ומייצרת מומנט מאיץ גדול יותר.",
        isCorrect: false,
        explanation:
          "שגוי: ריכוז המסה ברדיוס גדול מקנה לו אינרציה סיבובית מרבית, הדורשת מומנט גדול יותר לסיבובו ומאטה את מהירותו הקווית.",
      },
      {
        id: "dyn-q06-opt4",
        plainText: "$a_{cm} = \\frac{g\\sin\\theta}{1 - \\beta}$, והגוף הכבד ביותר מנצח תמיד.",
        isCorrect: false,
        explanation: "שגוי: המסה $m$ מצטמצמת לחלוטין ממשוואת התנועה ואינה משפיעה על המנצח.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "dyn-q07-gyroscopic-precession-torque",
    domain: "פרצסיה גירוסקופית",
    title: "קינמטיקה ודינמיקה - אפקטים גירוסקופיים ופרצסיה (Precession)",
    context:
      "גלגל תנע גירוסקופי סימטרי בעל מומנט אינרציה פולרי $I$ סובב במהירות סביבונית עצמית גבוהה מאוד $\\vec{\\omega}_s = \\omega_s \\hat{i}$ סביב ציר אופקי (תנע זוויתי $\\vec{L} \\approx I \\omega_s \\hat{i}$). על ציר הגירוסקופ מופעל מומנט כוח חיצוני סביב ציר $y$: $\\vec{\\tau} = \\tau \\hat{j}$.",
    formulaLatex: "\\vec{\\tau} = \\left.\\frac{d\\vec{L}}{dt}\\right|_{\\text{space}} = \\vec{\\Omega}_p \\times \\vec{L}",
    instruction:
      "לאיזה כיוון תתרחש תנועת הנקיפה (Precession) $\\vec{\\Omega}_p$ של ציר הגלגל, ומהו גודל מהירות הנקיפה?",
    options: [
      {
        id: "dyn-q07-opt1",
        plainText: "הציר ייפול כלפי מטה לאורך ציר המומנט $y$ בנפילה חופשית.",
        isCorrect: false,
        explanation: "שגוי: זוהי תגובה של גוף שאינו מסתובב; גירוסקופ מסתובב מתנגד לנפילה ומגיב בתנועה הניצבת למומנט.",
      },
      {
        id: "dyn-q07-opt2",
        plainText: "מהירות הסיבוב העצמית $\\omega_s$ תאט לאפס כתוצאה מהמומנט.",
        isCorrect: false,
        explanation:
          "שגוי: המומנט החיצוני ניצב לציר הסיבוב העצמי ולכן אינו מבצע עבודה על התנע הסביבוני ואינו משנה את $\\omega_s$.",
      },
      {
        id: "dyn-q07-opt3",
        plainText:
          "ציר הגירוסקופ יבצע פרצסיה סביב ציר $z$ הניצב הן לווקטור התנע הזוויתי והן לווקטור המומנט: $\\vec{\\Omega}_p = \\Omega_p \\hat{k}$, כאשר מהירות הפרצסיה היא $\\Omega_p = \\frac{\\tau}{I \\omega_s}$.",
        mathText: "\\vec{\\tau} = \\vec{\\Omega}_p \\times \\vec{L} \\implies \\tau \\hat{j} = (\\Omega_p \\hat{k}) \\times (I\\omega_s \\hat{i}) = \\Omega_p I\\omega_s \\hat{j}",
        isCorrect: true,
        explanation:
          "נכון: לפי משוואת המומנטים של אוילר: $\\vec{\\tau} = \\frac{d\\vec{L}}{dt} = \\vec{\\Omega}_p \\times \\vec{L}$. כדי לייצר מומנט בכיוון $\\hat{j}$ בעזרת תנע זוויתי בכיוון $\\hat{i}$, על וקטור מהירות הנקיפה $\\vec{\\Omega}_p$ להיות מכוון לאורך ציר $\\hat{k}$, משום ש-$\\hat{k} \\times \\hat{i} = \\hat{j}$. לכן: $\\tau = \\Omega_p (I \\omega_s) \\implies \\Omega_p = \\frac{\\tau}{I \\omega_s}$. הציר אינו נופל בכיוון המומנט, אלא מסתובב בזווית של $90^\\circ$ ביחס אליו במישור האופקי (תופעת הפרצסיה הגירוסקופית).",
      },
      {
        id: "dyn-q07-opt4",
        plainText: "מהירות הפרצסיה פרופורציונית לריבוע מהירות הסיבוב $\\Omega_p \\propto \\omega_s^2$.",
        isCorrect: false,
        explanation:
          "שגוי: מהירות הפרצסיה נמצאת ביחס הפוך למהירות הסיבוב הסביבונית ($\\Omega_p \\propto 1/\\omega_s$); ככל שהגירוסקופ מהיר יותר, הוא יציב וקשיח יותר.",
      },
    ],
  },
  {
    id: "dyn-q08-virtual-work-principle-mechanisms",
    domain: "עקרון העבודה הווירטואלית",
    title: "קינמטיקה ודינמיקה - עקרון העבודה הווירטואלית ושיווי משקל סטטי במנגנונים",
    context:
      "מנגנון מכני מורכב ממספר גופים קשיחים המחוברים ביניהם בפרקים אידיאליים חסרי חיכוך, בעל דרגת חופש יחידה ($q$). על המערכת פועלים כוחות חיצוניים $\\vec{F}_i$ ומומנטים $\\vec{M}_j$.",
    formulaLatex:
      "\\delta W = \\sum_{i} \\vec{F}_i \\cdot \\delta \\vec{r}_i + \\sum_{j} \\vec{M}_j \\cdot \\delta \\vec{\\theta}_j = Q \\delta q = 0",
    instruction:
      "מהו היתרון המתודי המרכזי של שימוש בעקרון העבודה הווירטואלית (Principle of Virtual Work) למציאת כוח שיווי משקל, בהשוואה לפירוק כוחות ניוטוני קלאסי?",
    options: [
      {
        id: "dyn-q08-opt1",
        plainText: "הוא מחשב באופן מדויק את כל כוחות התגובה הפנימיים בכל מפרק ומפרק במנגנון.",
        isCorrect: false,
        explanation: "שגוי: העבודה הווירטואלית מעלימה את כוחות התגובה הפנימיים לחלוטין ואינה מחשבת אותם.",
      },
      {
        id: "dyn-q08-opt2",
        plainText: "הוא תקף אך ורק כאשר המערכת מאיצה בתאוצה קבועה.",
        isCorrect: false,
        explanation: "שגוי: עקרון העבודה הווירטואלית פותח עבור שיווי משקל סטטי (ומוכלל לדינמיקה דרך עקרון דלאמבר).",
      },
      {
        id: "dyn-q08-opt3",
        plainText:
          "כוחות התגובה והחיבור הפנימיים בפרקים אידיאליים אינם מבצעים עבודה וירטואלית ($\\delta W_{internal} = 0$), ולכן הם מתבטלים לחלוטין מהמשוואה ומאפשרים למצוא ישירות את היחס בין הכוחות החיצוניים במשוואה סקלרית בודדת ללא צורך בפירוק המנגנון לגורמיו.",
        isCorrect: true,
        explanation:
          "נכון: במנגנון עם חיבורים אידיאליים הולונומיים (סמכים חלקים, צירים ללא חיכוך, מוטות קשיחים), ההעתקים הווירטואליים תואמים את האילוצים הפיזיים. כוחות התגובה בצירים פועלים בזוגות שווים ומנוגדים (חוק שלישי) על אותה נקודת מגע, ולכן סך העבודה הווירטואלית של כל כוחות האילוץ הפנימיים מתאפסת זהותית: $\\sum \\vec{R}_k \\cdot \\delta \\vec{r}_k = 0$. עקב כך, משוואת העבודה הווירטואלית $\\delta W = Q \\delta q = 0$ מכילה אך ורק את הכוחות הפעילים החיצוניים (עומסים ומנועים), ומאפשרת לפתור שיווי משקל של מנגנונים מורכבים במשוואה סקלרית אחת.",
      },
      {
        id: "dyn-q08-opt4",
        plainText: "הוא מאפשר לבטל את חוק שימור האנרגיה לטובת חוקי קפלר.",
        isCorrect: false,
        explanation: "שגוי: עקרון העבודה הווירטואלית הוא הבסיס לאנליזת אנרגיה במכניקה ואינו סותר שום חוק פיזיקלי.",
      },
    ],
  },
  {
    id: "dyn-q09-epicyclic-gear-train-willis-formula",
    domain: "תמסורת פלנטרית",
    title: "קינמטיקה ודינמיקה - תמסורות גלגלי שיניים אפיציקליות (פלנטריות) ונוסחת ויליס",
    context:
      "בתמסורת גלגלי שיניים פלנטרית מישורית, גלגל השמש (Sun gear, $S$) בעל $N_s$ שיניים ומהירות $\\omega_s$, גלגל העטרה/טבעת הפנימית (Ring gear, $R$) בעל $N_r$ שיניים ומהירות $\\omega_r$, והזרוע הנושאת את גלגלי הפלנטות (Carrier / Arm, $A$) סובבת במהירות $\\omega_a$.",
    formulaLatex: "\\frac{\\omega_s - \\omega_a}{\\omega_r - \\omega_a} = -\\frac{N_r}{N_s}",
    instruction:
      "אם גלגל העטרה מקובע לשלדה ($\\omega_r = 0$), מהו יחס התמסורת $\\frac{\\omega_s}{\\omega_a}$ בין גלגל השמש לזרוע הנושאת?",
    options: [
      {
        id: "dyn-q09-opt1",
        plainText: "$\\frac{\\omega_s}{\\omega_a} = -\\frac{N_r}{N_s}$",
        isCorrect: false,
        explanation: "שגוי: זהו יחס התמסורת היחסי ביחס לזרוע עומדת, ולא ביחס לקרקע כאשר העטרה מקובעת.",
      },
      {
        id: "dyn-q09-opt2",
        plainText: "$\\frac{\\omega_s}{\\omega_a} = \\frac{N_r}{N_s}$",
        isCorrect: false,
        explanation: "שגוי: נשמטה התוספת של יחידה הנובעת מתנועת הזרוע העצמית.",
      },
      {
        id: "dyn-q09-opt3",
        plainText:
          "$\\frac{\\omega_s}{\\omega_a} = 1 + \\frac{N_r}{N_s}$; יחס הפחתה חיובי (שניהם מסתובבים באותו כיוון), כאשר מהירות הזרוע תמיד איטית ממהירות השמש.",
        mathText: "\\frac{\\omega_s}{\\omega_a} = 1 + \\frac{N_r}{N_s}",
        isCorrect: true,
        explanation:
          "נכון: לפי נוסחת ויליס היסודית לרכבות פלנטריות: המהירויות ביחס לזרוע מתנהגות כרכבת רגילה שבה השמש מניעה את הטבעת דרך הפלנטה. היחס הוא שילוב של תמסורת חיצונית ותמסורת פנימית, המניב יחס תמסורת בסיסי שלילי: $\\frac{\\omega_s - \\omega_a}{\\omega_r - \\omega_a} = -\\frac{N_r}{N_s}$. נציב את תנאי השפה $\\omega_r = 0$: $\\frac{\\omega_s - \\omega_a}{-\\omega_a} = -\\frac{N_r}{N_s} \\implies \\frac{\\omega_s}{\\omega_a} - 1 = \\frac{N_r}{N_s} \\implies \\frac{\\omega_s}{\\omega_a} = 1 + \\frac{N_r}{N_s}$. יחס זה חיובי וגדול מ-$1$, ולכן התמסורת משמשת כממסרת הפחתה קומפקטית.",
      },
      {
        id: "dyn-q09-opt4",
        plainText: "$\\frac{\\omega_s}{\\omega_a} = \\frac{N_s}{N_s + N_r}$",
        isCorrect: false,
        explanation: "שגוי: זהו היחס ההפוך $\\frac{\\omega_a}{\\omega_s}$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "dyn-q10-two-dof-vibration-orthogonality-modes",
    domain: "אורתוגונליות אופני תנודה",
    title: "קינמטיקה ודינמיקה - תנודות חופשיות במערכות מרובות דרגות חופש ואורתוגונליות אופני תנודה",
    context:
      "במערכת דינמית ליניארית בעלת $2$ דרגות חופש ללא ריסון: $\\mathbf{M}\\ddot{\\vec{x}} + \\mathbf{K}\\vec{x} = 0$, כאשר $\\mathbf{M}$ ו-$\\mathbf{K}$ הן מטריצות סימטריות וחיוביות מוגדרות. פותרים את בעיית הע״ע: $(\\mathbf{K} - \\omega_i^2 \\mathbf{M})\\vec{\\phi}_i = 0$. שתי התדירויות הטבעיות שונות ($\\omega_1 \\neq \\omega_2$), והווקטורים העצמיים הם $\\vec{\\phi}_1, \\vec{\\phi}_2$.",
    formulaLatex: "\\vec{\\phi}_1^T \\mathbf{M} \\vec{\\phi}_2 = 0, \\quad \\vec{\\phi}_1^T \\mathbf{K} \\vec{\\phi}_2 = 0",
    instruction:
      "מהן תכונות האורתוגונליות של אופני התנודה הטבעיים (Mode Shapes) ביחס למטריצות המסה והקשיחות?",
    options: [
      {
        id: "dyn-q10-opt1",
        plainText:
          "אופני התנודה אורתוגונליים במובן הגיאומטרי הרגיל: $\\vec{\\phi}_1 \\cdot \\vec{\\phi}_2 = 0$, אך אינם אורתוגונליים ביחס למטריצת המסה.",
        isCorrect: false,
        explanation:
          "שגוי: הווקטורים אינם בהכרח ניצבים גיאומטרית במרחב האוקלידי, אלא ניצבים מוכללים ביחס למטריצת המשקל $\\mathbf{M}$.",
      },
      {
        id: "dyn-q10-opt2",
        plainText: "המכפלה $\\vec{\\phi}_1^T \\mathbf{M} \\vec{\\phi}_2$ שווה למסה הכוללת של המערכת.",
        isCorrect: false,
        explanation:
          "שגוי: עבור אופנים שונים המכפלה מתאפסת זהותית; המסה המודלית מתקבלת רק עבור אותו אופן ($\\vec{\\phi}_i^T \\mathbf{M} \\vec{\\phi}_i$).",
      },
      {
        id: "dyn-q10-opt3",
        plainText: "אורתוגונליות מתקיימת רק כאשר מטריצת הקשיחות אלכסונית מראש.",
        isCorrect: false,
        explanation:
          "שגוי: תכונת האורתוגונליות נובעת מהסימטריות של $\\mathbf{M}$ ו-$\\mathbf{K}$ ומתקיימת לכל מטריצות קשיחות סימטריות.",
      },
      {
        id: "dyn-q10-opt4",
        plainText:
          "אופני התנודה אורתוגונליים בו-זמנית הן ביחס למטריצת המסה והן ביחס למטריצת הקשיחות: $\\vec{\\phi}_1^T \\mathbf{M} \\vec{\\phi}_2 = 0$ ו-$\\vec{\\phi}_1^T \\mathbf{K} \\vec{\\phi}_2 = 0$, מה שמאפשר לפרק את מערכת המשוואות המצומדת לשתי משוואות דיפרנציאליות בלתי-תלויות נפרדות בקואורדינטות מודליות.",
        isCorrect: true,
        explanation:
          "נכון: מאחר ש-$\\mathbf{M}$ ו-$\\mathbf{K}$ סימטריות, כפל משוואת האופן הראשון ב-$\\vec{\\phi}_2^T$ נותן $\\vec{\\phi}_2^T \\mathbf{K} \\vec{\\phi}_1 = \\omega_1^2 \\vec{\\phi}_2^T \\mathbf{M} \\vec{\\phi}_1$, ובאופן דומה עבור האופן השני. חיסור לאחר חילוף (בזכות הסימטריה) מניב $(\\omega_1^2 - \\omega_2^2)\\vec{\\phi}_1^T \\mathbf{M} \\vec{\\phi}_2 = 0$. מאחר ש-$\\omega_1 \\neq \\omega_2$, נקבל $\\vec{\\phi}_1^T \\mathbf{M} \\vec{\\phi}_2 = 0$, ומהצבה חוזרת גם $\\vec{\\phi}_1^T \\mathbf{K} \\vec{\\phi}_2 = 0$. מטריצת האופנים $\\Phi$ מלכסנת בו-זמנית את שתי המטריצות ומפרידה מערכת מרובת דרגות חופש לאוסף מתנדים בודדים.",
      },
    ],
  },
  {
    id: "dyn-q11-grubler-kutzbach-mobility-criterion",
    domain: "קריטריון גריבלר-קוצבאך",
    title: "קינמטיקה ודינמיקה - ניידות מנגנונים וקריטריון גריבלר-קוצבאך",
    context:
      "במנגנון מישורי המורכב מ-$n$ חוליות (כולל גוף היסוד/הקרקע הנייח), ישנם $j_1$ מפרקים בעלי דרגת חופש יחידה (כגון מפרק סיבוב Revolute או מפרק החלקה Prismatic), ו-$j_2$ מפרקים בעלי $2$ דרגות חופש (כגון מגע גלגול עם החלקה / מפרק זיז Cam-Follower).",
    formulaLatex: "M = 3(n - 1) - 2 j_1 - j_2",
    instruction:
      "מהו קריטריון גריבלר-קוצבאך (Grübler / Kutzbach Criterion) לחישוב מספר דרגות החופש (Mobility / DOF) $M$ של המנגנון, ומה משמעות התוצאות $M=1, M=0, M<0$?",
    options: [
      {
        id: "dyn-q11-opt1",
        plainText: "$M = 6(n - 1) - 5j_1$; אם $M = 0$ המנגנון נע במהירות קבועה.",
        isCorrect: false,
        explanation: "שגוי: נוסחה זו שייכת למנגנון מרחבי תלת-ממדי (שבו לכל גוף $6$ דרגות חופש), ולא למנגנון מישורי.",
      },
      {
        id: "dyn-q11-opt2",
        plainText: "$M = 2n - j_1 - j_2$; כל ערך של $M$ מבטיח תנועה רציפה של המפרקים.",
        isCorrect: false,
        explanation: "שגוי: נוסחה שגויה שאינה מתחשבת ב-$3$ דרגות החופש במישור ובקיבוע גוף היסוד.",
      },
      {
        id: "dyn-q11-opt3",
        plainText: "הקריטריון מוגבל למסבכים סטטיים בלבד ואינו תקף למנגנונים נעים.",
        isCorrect: false,
        explanation: "שגוי: הקריטריון פותח במיוחד עבור מנגנונים קינמטיים (ארבע-מוטות, מנגנון ארכובה-בוכנה וכו׳).",
      },
      {
        id: "dyn-q11-opt4",
        plainText:
          "$M = 3(n - 1) - 2 j_1 - j_2$; אם $M = 1$ המנגנון בעל תנועה מוגדרת ונשלט ע״י מנוע יחיד; אם $M = 0$ המבנה מסוים סטטית (מסבך/שלדה ללא תנועה); ואם $M < 0$ המבנה בלתי-מסוים סטטית ונעול ע״י אילוצי יתר (Prestressed / Overconstrained).",
        isCorrect: true,
        explanation:
          "נכון: לכל גוף חופשי במישור יש $3$ דרגות חופש ($x, y, \\theta$). עבור $n$ חוליות כאשר אחת מקובעת לקרקע, ישנן $n-1$ חוליות נעות, סך הכל $3(n-1)$ דרגות חופש בלתי מרוסנות. כל מפרק מסוג $j_1$ נועל $2$ דרגות חופש יחסיות, ולכן תורם $-2j_1$. כל מפרק מסוג $j_2$ נועל דרגת חופש אחת בלבד ($-j_2$). התוצאה: $M = 3(n - 1) - 2 j_1 - j_2$. במנגנון ארבע-מוטות $n=4, j_1=4 \\implies M=3(3)-8=1$. $M=0$ הוא מבנה סטטי, ו-$M<0$ הוא מבנה עם אילוצי יתר.",
      },
    ],
  },
  {
    id: "dyn-q12-eccentric-impact-restitution-angular-momentum",
    domain: "התנגשות אקסצנטרית ומרכז הלימה",
    title: "קינמטיקה ודינמיקה - התנגשות אקסצנטרית של גופים קשיחים ומקדם השבה (Restitution)",
    context:
      "מוט דק ואחיד בעל מסה $m$, אורך $L$, ומומנט אינרציה $I_{cm} = \\frac{1}{12}m L^2$ תלוי במנוחה סביב פרק אידיאלי בקצהו העליון $O$. קליע נקודתי בעל מסה $m_0$ ומהירות אופקית $v_0$ פוגע במוט במרחק $d$ מתחת לפרק $O$. מקדם ההשבה של ההתנגשות הוא $e$.",
    formulaLatex:
      "e = -\\frac{v_{sep}}{v_{app}} = -\\frac{v_{bullet}^+ - v_{bar}^+(d)}{v_{bullet}^- - v_{bar}^-(d)}, \\quad \\sum L_O^- = \\sum L_O^+",
    instruction:
      "אילו עקרונות שימור מאפשרים את פתרון המהירות הזוויתית של המוט מיד לאחר הפגיעה ($\\omega^+$), ומהו מרכז ההלימה (Center of Percussion)?",
    options: [
      {
        id: "dyn-q12-opt1",
        plainText: "התנע הקווי של המערכת נשמר במלואו משום שזמן הפגיעה שואף לאפס.",
        isCorrect: false,
        explanation:
          "שגוי: בציר התמיכה $O$ פועל כוח הלם חיצוני אימפולסיבי (Impulsive Reaction), ולכן התנע הקווי אינו נשמר.",
      },
      {
        id: "dyn-q12-opt2",
        plainText: "האנרגיה המכנית הקינטית נשמרת תמיד לכל ערך של מקדם השבה $e$.",
        isCorrect: false,
        explanation:
          "שגוי: אנרגיה קינטית נשמרת אך ורק בהתנגשות אלסטית מושלמת ($e=1$); לכל $e < 1$ אנרגיה הולכת לאיבוד בחום ועיוות.",
      },
      {
        id: "dyn-q12-opt3",
        plainText: "המהירות הזוויתית מתאפסת עקב כוח שקול בכיוון הרדיאלי.",
        isCorrect: false,
        explanation: "שגוי: הפגיעה מפעילה מומנט מובהק סביב $O$ המקנה למוט מהירות סיבוב.",
      },
      {
        id: "dyn-q12-opt4",
        plainText:
          "התנע הזוויתי הכולל סביב ציר הסיבוב הקבוע $O$ נשמר במדויק (משום שכוח ההלם בציר אינו מייצר מומנט סביב $O$); בנוסף, פגיעה ב״מרכז ההלימה״ (Center of Percussion, במיקום $d = \\frac{I_O}{m \\bar{r}} = \\frac{2}{3}L$) מאפסת לחלוטין את כוח התגובה האימפולסיבי בציר הפרק $O$.",
        isCorrect: true,
        explanation:
          "נכון: במהלך הפגיעה האימפולסיבית, בציר $O$ פועל כוח תגובה חזק, ולכן התנע הקווי אינו נשמר. אולם זרוע כוח זה ביחס לנקודה $O$ היא אפס, ולכן מומנט ההלם סביב $O$ מתאפס: $\\sum \\tau_O = 0 \\implies L_O^- = L_O^+$. שימור התנע הזוויתי סביב $O$ יחד עם מקדם ההשבה של ניוטון בנקודת המגע סוגרים את $\\omega^+$. מרכז ההלימה הוא הנקודה שבה המכה אינה יוצרת הלם בציר: $I_O = I_{cm} + m(L/2)^2 = \\frac{1}{3}m L^2$, ולכן $d_{cop} = \\frac{I_O}{m(L/2)} = \\frac{2}{3}L$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_KINEMATICS_DYNAMICS_QUESTIONS = KINEMATICS_DYNAMICS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleKinematicsDynamicsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = KINEMATICS_DYNAMICS_QUESTIONS.slice(0, 3);
  const groupB = KINEMATICS_DYNAMICS_QUESTIONS.slice(3, 6);
  const groupC = KINEMATICS_DYNAMICS_QUESTIONS.slice(6, 12);

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
