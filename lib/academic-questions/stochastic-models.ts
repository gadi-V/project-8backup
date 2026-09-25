import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic חקר ביצועים 2 diagnostic bank (12Q).
 * Display name: "חקר ביצועים 2 (מודלים סטוכסטיים ותורת התורים)" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const STOCHASTIC_MODELS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "stoch-q01-dtmc-stationary-distribution-ergodicity",
    domain: "התפלגות סטציונרית בשרשרת מרקוב",
    title: "מודלים סטוכסטיים - שרשראות מרקוב בדידות (DTMC) והתפלגות סטציונרית",
    context:
      "נתונה שרשרת מרקוב בזמן בדיד (DTMC) מעל מרחב מצבים סופי $S = \\{1, 2, \\dots, m\\}$ עם מטריצת הסתברויות מעבר $P$.",
    formulaLatex: "\\pi P = \\pi, \\quad \\sum_{i=1}^m \\pi_i = 1",
    instruction:
      "באילו תנאים מובטח קיומה של התפלגות סטציונרית יחידה $\\pi$, ומתי מתקיימת תכונת ההתכנסות הגבולית $\\lim_{n \\to \\infty} P_{ij}^n = \\pi_j$ לכל מצב התחלתי $i$?",
    options: [
      {
        id: "stoch-q01-opt1",
        plainText:
          "קיום ויחידות של $\\pi$ מובטחים אם השרשרת אי-פריקה (Irreducible); התכנסות הגבול $\\lim_{n \\to \\infty} P^n$ לכל שורה דורשת בנוסף שהשרשרת תהיה לא-מחזורית (Aperiodic, שרשרת ארגודית).",
        isCorrect: true,
        explanation:
          "נכון: אם שרשרת סופית היא אי-פריקה (מכל מצב ניתן להגיע לכל מצב אחר), קיים וקטור הסתברות יחיד המקיים $\\pi P = \\pi$ ו-$\\sum \\pi_i = 1$. המשתנה $\\pi_j$ הוא החלק היחסי של הזמן שהמערכת שוהה במצב $j$ בטווח הארוך. קיום $\\pi$ אינו מבטיח התכנסות של $P^n$: בשרשרת מחזורית (למשל מחזור $d=2$) ההסתברויות מתנודדות והגבול אינו קיים. כדי שיובטח $\\lim_{n \\to \\infty} P_{ij}^n = \\pi_j$, השרשרת חייבת להיות גם אי-פריקה וגם לא-מחזורית ($\\gcd\\{n \\mid P_{ii}^n > 0\\} = 1$).",
      },
      {
        id: "stoch-q01-opt2",
        plainText: "ההתכנסות מתקיימת רק אם כל איברי האלכסון של מטריצת המעבר שווים לאפס ($P_{ii} = 0$).",
        isCorrect: false,
        explanation:
          "שגוי: אם כל $P_{ii}=0$ השרשרת עלולה להיות מחזורית; קיום לולאה עצמית ($P_{ii} > 0$) דווקא מבטיח אי-מחזוריות.",
      },
      {
        id: "stoch-q01-opt3",
        plainText: "התפלגות סטציונרית קיימת אך ורק אם המטריצה $P$ סימטרית ($P = P^T$).",
        isCorrect: false,
        explanation:
          "שגוי: סימטריות גוררת התפלגות אחידה $\\pi_i = 1/m$ במטריצה סטוכסטית-כפולה, אך שרשראות רבות אינן סימטריות ובעלות $\\pi$ ייחודי.",
      },
      {
        id: "stoch-q01-opt4",
        plainText: "השרשרת חייבת להכיל לפחות מצב בולע אחד (Absorbing State).",
        isCorrect: false,
        explanation:
          "שגוי: מצב בולע שובר אי-פריקות ומייצר התפלגות גבולית התלויה במצב ההתחלתי, ולא התפלגות ארגודית יחידה.",
      },
    ],
  },
  {
    id: "stoch-q02-littles-law-general-validity",
    domain: "חוק ליטל",
    title: "מודלים סטוכסטיים - חוק ליטל (Little's Law) ותחולתו בתורת התורים",
    context:
      "חוק ליטל קושר בין מספר הלקוחות הממוצע במערכת שירות ($L$), קצב ההגעה הממוצע ($\\lambda$), וזמן השהייה הממוצע של לקוח במערכת ($W$).",
    formulaLatex: "L = \\lambda W, \\quad L_q = \\lambda W_q",
    instruction: "באילו הנחות ותנאים מתקיים חוק ליטל?",
    options: [
      {
        id: "stoch-q02-opt1",
        plainText:
          "החוק מתקיים כמעט באופן אוניברסלי לכל מערכת יציבה סטטיסטית במצב מתמיד ($L = \\lambda W$): ללא תלות בהתפלגות זמני ההגעה (אינו דורש פואסון), ללא תלות בהתפלגות זמני השירות, תקף למערכות מרובות שרתים ($G/G/c$), ולמשטרי שירות שונים (FIFO, LIFO, סדר שרירותי).",
        isCorrect: true,
        explanation:
          "נכון: כוחו של חוק ליטל ($L = \\lambda W$) הוא בשימור זרימה במצב יציב: שטח האינטגרל של מספר הלקוחות בזמן שווה לסכום זמני השהייה. ההוכחה אינה מניחה תהליך פואסון, שירות מעריכי, או אי-תלות. החוק חל על כל מערכת יציבה שבה לקוחות אינם נוצרים יש מאין ואינם נעלמים, כולל התור בלבד ($L_q = \\lambda W_q$) והשרתים בלבד ($L_s = \\lambda / \\mu$).",
      },
      {
        id: "stoch-q02-opt2",
        plainText: "החוק תקף אך ורק לתורי M/M/1 שבהם הן ההגעות והן השירות מעריכיים.",
        isCorrect: false,
        explanation: "שגוי: M/M/1 הוא מקרה פרטי; חוק ליטל חל על מערכות כלליות $G/G/c$.",
      },
      {
        id: "stoch-q02-opt3",
        plainText: "החוק מתקיים רק כאשר המערכת פועלת בעומס יתר בלתי-יציב ($\\rho > 1$).",
        isCorrect: false,
        explanation:
          "שגוי: אם $\\rho > 1$ התור גדל לאינסוף ($L \\to \\infty$), המערכת אינה מגיעה למצב מתמיד וחוק ליטל אינו מוגדר.",
      },
      {
        id: "stoch-q02-opt4",
        plainText: "החוק דורש כי זמני ההמתנה יתפלגו נורמלית לפי משפט הגבול המרכזי.",
        isCorrect: false,
        explanation: "שגוי: החוק עוסק בתוחלות בלבד ($L, W$) ומתקיים לכל התפלגות זמני המתנה שרירותית.",
      },
    ],
  },
  {
    id: "stoch-q03-ctmc-generator-matrix-balance-equations",
    domain: "מטריצת קצבים Q",
    title: "מודלים סטוכסטיים - שרשראות מרקוב בזמן רציף (CTMC) ומטריצת הקצבים $Q$",
    context:
      "נתונה שרשרת מרקוב בזמן רציף (CTMC) הומוגנית ואי-פריקה מעל מרחב מצבים סופי. מטריצת הקצבים האינפיניטסימלית (Generator Matrix) מסומנת ב-$Q = (q_{ij})$.",
    formulaLatex:
      "q_{ij} \\ge 0 \\; (i \\neq j), \\quad q_{ii} = -\\sum_{j \\neq i} q_{ij}, \\quad \\pi Q = 0, \\quad \\sum_{i} \\pi_i = 1",
    instruction:
      "מה מאפיין את שורות המטריצה $Q$, ומהי המשמעות הפיזיקלית של משוואת האיזון הסטציונרי $\\pi Q = 0$?",
    options: [
      {
        id: "stoch-q03-opt1",
        plainText:
          "סכום כל שורה במטריצה $Q$ שווה לאפס במדויק ($\\sum_j q_{ij} = 0$), והמשוואה $\\pi Q = 0$ מבטאת שוויון מלא בין קצב המעברים הכולל הנכנס לכל מצב לקצב המעברים הכולל היוצא ממנו (Global Balance Equations).",
        isCorrect: true,
        explanation:
          "נכון: האיברים מחוץ לאלכסון $q_{ij} \\ge 0$ הם קצבי המעבר ממצב $i$ למצב $j$. האיבר באלכסון $q_{ii} = -\\sum_{j \\neq i} q_{ij} = -v_i$ הוא קצב עזיבת מצב $i$ (זמן השהייה מעריכי עם תוחלת $1/v_i$). לכן $\\sum_j q_{ij} = 0$. המשוואה $\\pi Q = 0$ לכל רכיב $j$ היא $\\sum_{i \\neq j} \\pi_i q_{ij} = \\pi_j v_j$: אגף שמאל הוא קצב הזרימה הממוצע לתוך $j$, ואגף ימין הוא קצב הזרימה החוצה (משוואות שיווי משקל גלובלי).",
      },
      {
        id: "stoch-q03-opt2",
        plainText: "סכום כל עמודה במטריצה $Q$ שווה ל-$1$, והיא מייצגת מטריצה סטוכסטית רגילה.",
        isCorrect: false,
        explanation: "שגוי: $Q$ היא מטריצת קצבים (יחידות $1/\\text{time}$) בעלת סכום שורות אפס, ואינה מטריצת הסתברויות.",
      },
      {
        id: "stoch-q03-opt3",
        plainText: "המשוואה $\\pi Q = 0$ גוררת כי כל המצבים הם מצבים חולפים (Transient).",
        isCorrect: false,
        explanation: "שגוי: בשרשרת סופית אי-פריקה כל המצבים הם Positive Recurrent (נשנים חיוביים).",
      },
      {
        id: "stoch-q03-opt4",
        plainText: "הדטרמיננטה של $Q$ חייבת להיות שונה מאפס כדי שהמערכת תהיה הפיכה בזמן.",
        isCorrect: false,
        explanation:
          "שגוי: מכיוון שסכום כל שורה ב-$Q$ הוא אפס, הווקטור $\\mathbf{1}$ שייך לגרעין ($Q\\mathbf{1} = 0$), ולכן $\\det(Q) = 0$ תמיד.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "stoch-q04-mm1-queue-performance-metrics",
    domain: "תור M/M/1",
    title: "מודלים סטוכסטיים - תור M/M/1 ומדדי ביצועים במצב מתמיד",
    context:
      "בתור M/M/1 קלאסי, קצב ההגעות הפואסוני הוא $\\lambda$ וקצב השירות המעריכי הוא $\\mu$. עוצמת התנועה (Traffic Intensity) היא $\\rho = \\frac{\\lambda}{\\mu} < 1$.",
    formulaLatex: "P_n = (1 - \\rho)\\rho^n, \\quad L = \\frac{\\rho}{1 - \\rho}, \\quad W = \\frac{1}{\\mu - \\lambda}",
    instruction:
      "מהו פילוג מספר הלקוחות במערכת במצב מתמיד ($P_n$), וכיצד מגיב זמן השהייה הממוצע $W$ כאשר העומס מתקרב לקיבולת המלאה ($\\rho \\to 1^-$)?",
    options: [
      {
        id: "stoch-q04-opt1",
        plainText: "$P_n$ מתפלג פואסונית עם תוחלת $\\rho$, וזמן השהייה גדל ליניארית עם $\\rho$.",
        isCorrect: false,
        explanation: "שגוי: מספר הלקוחות במערכת M/M/1 מתפלג גאומטרית ולא פואסונית, והעלייה בעומס אינה ליניארית אלא היפרבולית.",
      },
      {
        id: "stoch-q04-opt2",
        plainText:
          "$P_n = (1 - \\rho)\\rho^n$ (התפלגות גאומטרית על $\\{0, 1, 2, \\dots\\}$); זמן השהייה הממוצע הוא $W = \\frac{1}{\\mu(1 - \\rho)}$, וכאשר $\\rho \\to 1^-$ זמני ההמתנה ואורך התור נוסקים אסימפטוטית לאינסוף ($\\sim \\frac{1}{1-\\rho}$).",
        mathText: "P_n = (1 - \\rho)\\rho^n, \\quad W = \\frac{1}{\\mu - \\lambda} \\to \\infty \\; \\text{as } \\rho \\to 1",
        isCorrect: true,
        explanation:
          "נכון: משוואות האיזון $P_n \\lambda = P_{n+1} \\mu$ נותנות $P_n = \\rho^n P_0$. תנאי הנרמול $\\sum P_n = 1$ נותן $P_0 = 1 - \\rho$, ולכן $P_n = (1 - \\rho)\\rho^n$. מספר הלקוחות הממוצע: $L = \\frac{\\rho}{1 - \\rho}$. לפי חוק ליטל: $W = \\frac{L}{\\lambda} = \\frac{1}{\\mu(1 - \\rho)} = \\frac{1}{\\mu - \\lambda}$. כאשר $\\rho \\to 1^-$ המכנה שואף לאפס וזמני ההמתנה מתבדרים.",
      },
      {
        id: "stoch-q04-opt3",
        plainText: "המערכת מתייצבת על תור קבוע של $10$ לקוחות לכל ערך של $\\rho$.",
        isCorrect: false,
        explanation: "שגוי: אורך התור תלוי ישירות ב-$\\rho$ וגדל לאינסוף כאשר מנצלים את מלוא קיבולת השרת.",
      },
      {
        id: "stoch-q04-opt4",
        plainText: "התור יציב גם כאשר $\\lambda > \\mu$ הודות לחוק המספרים הגדולים.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי הכרחי ומספיק ליציבות תור M/M/1 הוא $\\rho = \\lambda/\\mu < 1$; אם קצב ההגעה עולה על קצב השירות התור מתבדר.",
      },
    ],
  },
  {
    id: "stoch-q05-pasta-property-poisson-arrivals",
    domain: "תכונת PASTA",
    title: "מודלים סטוכסטיים - תכונת PASTA (Poisson Arrivals See Time Averages)",
    context:
      "בתורת התורים משווים בין שתי התפלגויות: ההתפלגות בזמן רציף (Time-average distribution $P_n$: החלק היחסי של הזמן שבו יש $n$ לקוחות במערכת), לבין התפלגות המצב כפי שנצפית ע״י לקוח ברגע הגעתו (Arrival-average distribution $a_n$: ההסתברות שלקוח מגיע ומוצא $n$ לקוחות).",
    instruction: "מתי מתקיימת תכונת PASTA ($a_n = P_n$ לכל $n$), ומדוע היא נכשלת בהגעות דטרמיניסטיות (D/M/1)?",
    options: [
      {
        id: "stoch-q05-opt1",
        plainText: "PASTA מתקיימת תמיד לכל תהליך הגעה ללא יוצא מן הכלל.",
        isCorrect: false,
        explanation: "שגוי: PASTA דורשת במפורש שההגעות יתפלגו פואסונית; אחרת התפלגות ההגעה יכולה להיות מוטה ביחס לממוצע בזמן.",
      },
      {
        id: "stoch-q05-opt2",
        plainText:
          "תכונת PASTA מתקיימת אם ורק אם תהליך ההגעות הוא תהליך פואסון (הגעות ב״ת וזיכרון מעריכי שאינן תלויות במצב המערכת); בתור D/M/1 שבו לקוחות מגיעים במרווחים קבועים, הלקוח רואה תור ריק יותר מהממוצע בזמן משום שהגעתו מתואמת מראש עם זמן פינוי השרת.",
        isCorrect: true,
        explanation:
          "נכון: אם תהליך ההגעה פואסוני, חוסר הזיכרון מבטיח שההסתברות להגעה ברגע $t$ בלתי-תלויה במצב המערכת, ולכן $a_n = P_n$. בהגעות דטרמיניסטיות (D/M/1) הדגימה מוטה: מרווח קבוע ארוך מזמן שירות טיפוסי משאיר את השרת פנוי סמוך לרגע ההגעה הבא, ולכן $a_0 > P_0$. לדוגמה, הגעה כל שעה ושירות של כחצי שעה מותירים את השרת פנוי בממוצע בזמן חצי מהזמן, אך הלקוח המגיע במחזור הקבוע מוצא אותו פנוי בהסתברות גבוהה בהרבה מהממוצע בזמן.",
      },
      {
        id: "stoch-q05-opt3",
        plainText: "תכונת PASTA תקפה רק עבור מערכות עם שרתים אינסופיים ($M/M/\\infty$).",
        isCorrect: false,
        explanation: "שגוי: PASTA תקפה לכל מערכת שירות שבה תהליך ההגעה הוא פואסון, כולל $M/M/1$, $M/G/c$ ו-$M/M/c/K$.",
      },
      {
        id: "stoch-q05-opt4",
        plainText: "PASTA מוכיחה שזמן השירות חייב להתפלג לפי התפלגות פראטו.",
        isCorrect: false,
        explanation: "שגוי: PASTA אינה מציבה שום דרישה על התפלגות זמני השירות (היא מתקיימת גם עבור $M/G/1$ כללי).",
      },
    ],
  },
  {
    id: "stoch-q06-mmc-erlang-c-formula-wait-probability",
    domain: "נוסחת ארלנג-C",
    title: "מודלים סטוכסטיים - מערכות מרובות שרתים ותור M/M/c (נוסחת ארלנג-C)",
    context:
      "במוקד שירות טלפוני (Call Center) הפועל לפי מודל M/M/c עם $c$ נציגים מקבילים, קצב ההגעות הוא $\\lambda$ וקצב השירות של כל נציג הוא $\\mu$. עוצמת העבודה הכוללת היא $A = \\frac{\\lambda}{\\mu}$, ועומס השרת הממוצע הוא $\\rho = \\frac{\\lambda}{c\\mu} < 1$.",
    formulaLatex:
      "P_0 = \\left[ \\sum_{k=0}^{c-1} \\frac{A^k}{k!} + \\frac{A^c}{c!(1 - \\rho)} \\right]^{-1}, \\quad C(c, A) = \\frac{\\frac{A^c}{c!(1 - \\rho)}}{\\sum_{k=0}^{c-1} \\frac{A^k}{k!} + \\frac{A^c}{c!(1 - \\rho)}}",
    instruction: "מה מייצגת נוסחת ארלנג-C ($C(c, A)$), ומהו זמן ההמתנה הממוצע בתור בלבד ($W_q$)?",
    options: [
      {
        id: "stoch-q06-opt1",
        plainText: "הנוסחה מייצגת את אחוז השיחות שמתנתקות ללא מענה, ו-$W_q = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: ניתוקי שיחות מאפיינים מערכת ללא המתנה (ארלנג-B בתור M/M/c/c); ארלנג-C מניחה תור אינסופי שבו כל שיחה ממתינה עד למענה.",
      },
      {
        id: "stoch-q06-opt2",
        plainText:
          "הנוסחה מייצגת את ההסתברות ששיחה נכנסת תמצא את כל $c$ הנציגים תפוסים ותיאלץ להמתין בתור ($P(W_q > 0)$); זמן ההמתנה הממוצע בתור הוא $W_q = \\frac{C(c, A)}{c\\mu - \\lambda}$.",
        mathText: "P(\\text{Wait}) = C(c, A), \\quad W_q = \\frac{C(c, A)}{c\\mu - \\lambda}",
        isCorrect: true,
        explanation:
          "נכון: נוסחת ארלנג-C היא $P(N \\ge c) = C(c, A)$. לפי PASTA זוהי הסתברות שלקוח חדש ימצא את כל $c$ העמדות תפוסות. כאשר כל השרתים תפוסים, קצב השירות המצרפי הוא $c\\mu$, וזמן ההמתנה המותנה מתפלג מעריכית בקצב $c\\mu - \\lambda$. זמן ההמתנה הבלתי-מותנה בתור הוא $W_q = \\frac{C(c, A)}{c\\mu - \\lambda}$.",
      },
      {
        id: "stoch-q06-opt3",
        plainText: "הנוסחה מייצגת את הרווח הנקי של המוקד כפונקציה של עלות השרתים.",
        isCorrect: false,
        explanation: "שגוי: זוהי נוסחה הסתברותית של מצב מתמיד ואינה מודל פיננסי.",
      },
      {
        id: "stoch-q06-opt4",
        plainText: "זמן ההמתנה בתור שווה תמיד ל-$W_q = \\frac{1}{\\mu}$ ללא תלות במספר השרתים $c$.",
        isCorrect: false,
        explanation: "שגוי: הוספת שרתים מקטינה את $C(c, A)$ ואת $W_q$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "stoch-q07-erlang-b-loss-system-insensitivity",
    domain: "נוסחת ארלנג-B וחוסר-רגישות",
    title: "מודלים סטוכסטיים - מערכת אובדנים M/M/c/c, נוסחת ארלנג-B ותכונת חוסר-הרגישות",
    context:
      "במערכת תקשורת עם $c$ קווי תמסורת ללא מקום המתנה (M/G/c/c Loss System), שיחות מגיעות בתהליך פואסון עם קצב $\\lambda$. שיחה שמוצאת את כל $c$ הקווים תפוסים נחסמת ואובדת מיד (Blocked Calls Cleared). עומס התנועה המוצע הוא $A = \\lambda / \\mu$ בארלנג.",
    formulaLatex:
      "B(c, A) = \\frac{A^c / c!}{\\sum_{k=0}^c A^k / k!}, \\quad B(c, A) = \\frac{A B(c-1, A)}{c + A B(c-1, A)}",
    instruction: "מהי תכונת חוסר-הרגישות (Insensitivity Property) המפורסמת של נוסחת ארלנג-B?",
    options: [
      {
        id: "stoch-q07-opt1",
        plainText: "הנוסחה אינה רגישה למספר הקווים $c$ וקבועה לכל גודל מרכזייה.",
        isCorrect: false,
        explanation: "שגוי: ערך החסימה תלוי חזק מאוד במספר הקווים $c$.",
      },
      {
        id: "stoch-q07-opt2",
        plainText: "הנוסחה תקפה רק אם כל השיחות נמשכות בדיוק $3$ דקות ללא שונות.",
        isCorrect: false,
        explanation: "שגוי: הנוסחה תקפה לכל התפלגות זמני שיחה, כולל בעלי שונות גדולה או קטנה.",
      },
      {
        id: "stoch-q07-opt3",
        plainText:
          "נוסחת ארלנג-B מדויקת לחלוטין עבור כל התפלגות שרירותית של זמני השיחה (מערכת M/G/c/c כללית) ותלויה אך ורק בתוחלת זמן השיחה ($1/\\mu$), ללא שום תלות בשונות או בצורת הפילוג של משך השיחה.",
        mathText: "P_{\\text{block}} = B(c, \\lambda \\mathbb{E}[S]) \\quad \\forall \\text{ service distribution } G",
        isCorrect: true,
        explanation:
          "נכון: זוהי תכונת ה-Insensitivity של מערכות אובדן. אף על פי שהפיתוח הקלאסי נעשה עבור שירות מעריכי (M/M/c/c), הסתברות החסימה $B(c, A)$ במערכת $M/G/c/c$ עם הגעות פואסון תלויה אך ורק בעומס המוצע $A = \\lambda \\mathbb{E}[S]$. לא משנה אם זמני השיחה קבועים, מעריכיים או בעלי זנב עבה — כל עוד התוחלת זהה, הסתברות החסימה זהה. תכונה זו אינה מתקיימת במערכות עם המתנה (ארלנג-C, M/G/1).",
      },
      {
        id: "stoch-q07-opt4",
        plainText: "ההסתברות לחסימה שווה תמיד לאפס הודות לשיטת קידוד הופמן.",
        isCorrect: false,
        explanation: "שגוי: קו חסום דוחה שיחות בהסתברות חיובית בהתאם לעומס, ואין קשר לקידוד.",
      },
    ],
  },
  {
    id: "stoch-q08-pollaczek-khinchine-mg1-variance-effect",
    domain: "נוסחת פולאצ׳ק-חינצ׳ין",
    title: "מודלים סטוכסטיים - תור M/G/1 ונוסחת פולאצ׳ק-חינצ׳ין (P-K Formula)",
    context:
      "בתור M/G/1, קצב ההגעות הוא פואסוני $\\lambda$, וזמני השירות הם בעלי התפלגות כללית בלתי-תלויה בעלת תוחלת $\\mathbb{E}[S] = 1/\\mu$ ושונות $\\operatorname{Var}(S) = \\sigma_s^2$. עומס המערכת הוא $\\rho = \\lambda \\mathbb{E}[S] < 1$.",
    formulaLatex:
      "W_q = \\frac{\\lambda \\mathbb{E}[S^2]}{2(1 - \\rho)} = \\frac{\\lambda (\\sigma_s^2 + 1/\\mu^2)}{2(1 - \\rho)}",
    instruction:
      "מה ממחישה נוסחת פולאצ׳ק-חינצ׳ין לגבי השפעת השונות של זמני השירות ($\\sigma_s^2$) על זמני ההמתנה בתור?",
    options: [
      {
        id: "stoch-q08-opt1",
        plainText: "השונות של זמני השירות אינה משפיעה על זמן ההמתנה; רק הממוצע $1/\\mu$ קובע את התור.",
        isCorrect: false,
        explanation: "שגוי: הנוסחה מראה תלות ישירה וחיובית ב-$\\sigma_s^2$; שונות גבוהה מאריכה את התור.",
      },
      {
        id: "stoch-q08-opt2",
        plainText: "הגדלת השונות מקטינה את התור משום שלקוחות קצרים מפצים על ארוכים.",
        isCorrect: false,
        explanation: "שגוי: לקוחות ארוכים במיוחד תוקעים את השרת וגורמים להצטברות תור מאחוריהם.",
      },
      {
        id: "stoch-q08-opt3",
        plainText:
          "זמן ההמתנה הממוצע גדל ליניארית עם שונות השירות $\\sigma_s^2$; בתור בעל שירות קבוע לחלוטין (M/D/1, $\\sigma_s^2 = 0$) זמן ההמתנה נחתך בדיוק בחצי בהשוואה לתור בעל שירות מעריכי (M/M/1, $\\sigma_s^2 = 1/\\mu^2$) באותו עומס $\\rho$.",
        mathText: "W_q^{M/D/1} = \\frac{1}{2} W_q^{M/M/1} = \\frac{\\rho}{2\\mu(1 - \\rho)}",
        isCorrect: true,
        explanation:
          "נכון: $W_q = \\frac{\\lambda(\\sigma_s^2 + \\mu^{-2})}{2(1 - \\rho)}$. בשירות מעריכי $\\sigma_s^2 = 1/\\mu^2$, ולכן $W_q^{M/M/1} = \\frac{\\rho}{\\mu(1 - \\rho)}$. בשירות דטרמיניסטי $\\sigma_s^2 = 0$, ולכן $W_q^{M/D/1} = \\frac{\\rho}{2\\mu(1 - \\rho)} = \\frac{1}{2} W_q^{M/M/1}$. ביטול אי-הוודאות בזמני הטיפול חותך בדיוק מחצית מזמן ההמתנה בתור.",
      },
      {
        id: "stoch-q08-opt4",
        plainText: "אם השונות אינסופית, זמן ההמתנה שואף לאפס לפי משפט הגבול המרכזי.",
        isCorrect: false,
        explanation:
          "שגוי: אם $\\sigma_s^2 \\to \\infty$ (זנב עבה), $W_q \\to \\infty$ והתור מתבדר גם אם $\\rho < 1$.",
      },
    ],
  },
  {
    id: "stoch-q09-renewal-theory-residual-lifetime-paradox",
    domain: "פרדוקס זמן ההמתנה",
    title: "מודלים סטוכסטיים - תאוריית ההתחדשות (Renewal Theory) ופרדוקס זמן ההמתנה לאוטובוס",
    context:
      "אוטובוסים מגיעים לתחנה לפי תהליך התחדשות שבו מרווחי הזמן בין אוטובוסים עוקבים $X_i$ הם משתנים ב״ת ושווי התפלגות עם תוחלת $\\mathbb{E}[X]$ ושונות $\\sigma_X^2$. נוסע מגיע לתחנה בזמן אקראי גדול $t$ (במצב מתמיד) וממתין לאוטובוס הבא (זמן חיים שיורי - Residual Lifetime $Y$).",
    formulaLatex:
      "\\mathbb{E}[Y] = \\frac{\\mathbb{E}[X^2]}{2\\mathbb{E}[X]} = \\frac{\\mathbb{E}[X]}{2} + \\frac{\\sigma_X^2}{2\\mathbb{E}[X]}",
    instruction:
      "מדוע זמן ההמתנה הממוצע של הנוסע $\\mathbb{E}[Y]$ גדול ממחצית מרווח הזמן הממוצע בין אוטובוסים (פרדוקס הבדיקה / Inspection Paradox)?",
    options: [
      {
        id: "stoch-q09-opt1",
        plainText: "משום שחברות האוטובוסים מבטלות נסיעות באופן שיטתי בשעות העומס.",
        isCorrect: false,
        explanation: "שגוי: הפרדוקס מתמטי-סטטיסטי ואינו תלוי בכשל תפעולי.",
      },
      {
        id: "stoch-q09-opt2",
        plainText: "משום שהנוסע מגיע תמיד בזמן קבוע לאחר יציאת אוטובוס.",
        isCorrect: false,
        explanation: "שגוי: הנוסע מגיע בזמן אקראי לחלוטין; ההטיה נובעת מאורך המרווח ולא משעת הגעה קבועה.",
      },
      {
        id: "stoch-q09-opt3",
        plainText:
          "נוסע המגיע ברגע אקראי בזמן בעל סיכוי גבוה יותר \"ליפול\" לתוך מרווח זמן ארוך מהממוצע מאשר לתוך מרווח קצר (Length-Biased Sampling), ותוספת השונות $\\frac{\\sigma_X^2}{2\\mathbb{E}[X]}$ גורמת לכך שזמן ההמתנה הממוצע שווה לחצי מהמרווח רק אם האוטובוסים מגיעים בדיוק מושלם ללא שונות ($\\sigma_X = 0$).",
        isCorrect: true,
        explanation:
          "נכון: ההסתברות שנקודת זמן אקראית תיפול בתוך מרווח $X$ פרופורציונית לאורכו (Length-Biased Sampling). הנוסחה היא $\\mathbb{E}[Y] = \\frac{\\mathbb{E}[X^2]}{2\\mathbb{E}[X]} = \\frac{\\mathbb{E}[X]}{2} + \\frac{\\sigma_X^2}{2\\mathbb{E}[X]}$. רק אם $\\sigma_X = 0$ מתקבל $\\mathbb{E}[Y] = \\mathbb{E}[X]/2$. שונות חיובית מגדילה את זמן ההמתנה השיורי מעל מחצית המרווח הממוצע.",
      },
      {
        id: "stoch-q09-opt4",
        plainText: "התוחלת תמיד שווה לאפס לפי חוק ההתחדשות האלמנטרי.",
        isCorrect: false,
        explanation:
          "שגוי: חוק ההתחדשות האלמנטרי עוסק בקצב ההתחדשויות $\\lim N(t)/t = 1/\\mathbb{E}[X]$, ואינו מאפס את זמן ההמתנה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "stoch-q10-mdp-bellman-optimality-contraction",
    domain: "משוואת בלמן",
    title: "מודלים סטוכסטיים - תהליכי החלטה מרקוביים (MDP) ומשוואת בלמן",
    context:
      "בתהליך החלטה מרקובי (MDP) עם מרחב מצבים $S$, מרחב פעולות $A$, פונקציית תגמול $R(s, a)$ ופקטור היוון $0 < \\gamma < 1$. משוואת בלמן לאופטימליות היא:",
    formulaLatex:
      "V^*(s) = \\max_{a \\in A} \\left[ R(s, a) + \\gamma \\sum_{s' \\in S} P(s' \\mid s, a) V^*(s') \\right]",
    instruction: "כיצד מוכחת התכנסות אלגוריתם איטרציית ערך (Value Iteration) לפתרון האופטימלי היחיד $V^*$?",
    options: [
      {
        id: "stoch-q10-opt1",
        plainText: "באמצעות משפט גאוס-מרקוב על שגיאות אופרטור התגמול.",
        isCorrect: false,
        explanation: "שגוי: גאוס-מרקוב שייך לרגרסיה ליניארית ולא לתכנון דינמי סטוכסטי.",
      },
      {
        id: "stoch-q10-opt2",
        plainText: "האלגוריתם מתכנס אך ורק אם פקטור ההיוון גדול מ-$1$ ($\\gamma > 1$).",
        isCorrect: false,
        explanation: "שגוי: אם $\\gamma \\ge 1$ סכום התגמולים מתבדר והאופרטור אינו מכווץ.",
      },
      {
        id: "stoch-q10-opt3",
        plainText: "ההתכנסות נובעת מכך שמספר המדיניות האפשריות קטן מ-$n$.",
        isCorrect: false,
        explanation:
          "שגוי: מספר המדיניות הוא $|A|^{|S|}$, ואיטרציית ערך פועלת במרחב הפונקציות $\\mathbb{R}^{|S|}$ ולא על ידי ספירת מדיניות.",
      },
      {
        id: "stoch-q10-opt4",
        plainText:
          "אופרטור בלמן $T$ הוא העתקה מכווצת (Contraction Mapping) ביחס לנורמת המקסימום $\\|\\cdot\\|_\\infty$ עם פקטור כיווץ $\\gamma < 1$ (כלומר $\\|T V_1 - T V_2\\|_\\infty \\le \\gamma \\|V_1 - V_2\\|_\\infty$); לפי משפט נקודת השבת של בנך, קיימת נקודת שבת יחידה $V^*$ והאיטרציה $V_{k+1} = T V_k$ מובטחת להתכנס אליה גלובלית מכל נקודת אתחול.",
        isCorrect: true,
        explanation:
          "נכון: במרחב בנך של פונקציות הערך עם $\\|V\\|_\\infty = \\max_s |V(s)|$, אופרטור בלמן מקיים $\\|T V_1 - T V_2\\|_\\infty \\le \\gamma \\|V_1 - V_2\\|_\\infty$. מאחר ש-$0 < \\gamma < 1$, האופרטור הוא כיווץ. משפט בנך מבטיח נקודת שבת יחידה $V^*$ המקיימת $T V^* = V^*$, והתכנסות של $V_{k+1} = T V_k$ מכל אתחול בקצב $\\gamma^k$. המדיניות החמדנית הנגזרת מ-$V^*$ היא אופטימלית.",
      },
    ],
  },
  {
    id: "stoch-q11-absorbing-markov-chain-fundamental-matrix",
    domain: "מטריצת היסוד של שרשרת בולעת",
    title: "מודלים סטוכסטיים - שרשראות מרקוב בולעות ומטריצת היסוד (Fundamental Matrix)",
    context:
      "בשרשרת מרקוב בדידה עם מצבים בולעים ומצבים חולפים (Transient States), נסדר את המטריצה בצורה קנונית: $P = \\begin{pmatrix} Q & R \\\\ 0 & I \\end{pmatrix}$, כאשר $Q$ היא מטריצת המעברים בין המצבים החולפים ($m$ מצבים), ו-$R$ המעברים ממצבים חולפים למצבים בולעים.",
    formulaLatex: "N = (I - Q)^{-1} = I + Q + Q^2 + Q^3 + \\dots, \\quad B = N R",
    instruction: "מה מייצג האיבר $N_{ij}$ במטריצת היסוד $N$, ומה מייצג הווקטור $t = N \\mathbf{1}$?",
    options: [
      {
        id: "stoch-q11-opt1",
        plainText: "$N_{ij}$ הוא ההסתברות שהשרשרת לא תיבלע לעולם אם התחילה במצב $i$.",
        isCorrect: false,
        explanation: "שגוי: בשרשרת בולעת סופית ההסתברות להיבלע בסופו של דבר היא $1$ מכל מצב חולף.",
      },
      {
        id: "stoch-q11-opt2",
        plainText: "$N_{ij}$ מייצג את מספר המצבים הבולעים הקיימים ברשת.",
        isCorrect: false,
        explanation: "שגוי: ממדי $N$ הם $m \\times m$ וכוללים רק מצבים חולפים.",
      },
      {
        id: "stoch-q11-opt3",
        plainText: "$t = N \\mathbf{1}$ הוא וקטור ההסתברויות הסטציונריות $\\pi$ של המערכת.",
        isCorrect: false,
        explanation: "שגוי: במערכת בולעת ההתפלגות הסטציונרית מתרכזת במצבים הבולעים בלבד.",
      },
      {
        id: "stoch-q11-opt4",
        plainText:
          "$N_{ij}$ מייצג את התוחלת של מספר הפעמים הכולל שהשרשרת תבקר במצב החולף $j$ בהינתן שהחלה במצב $i$ (לפני הבליעה); והווקטור $t = N \\mathbf{1}$ (סכום שורות $N$) נותן את תוחלת הזמן הכולל עד לבליעה ממצב התחלתי $i$.",
        mathText:
          "N_{ij} = \\mathbb{E}[\\text{visits to } j \\mid X_0 = i], \\quad t_i = \\sum_j N_{ij}",
        isCorrect: true,
        explanation:
          "נכון: מאחר שכל המצבים ב-$Q$ חולפים, $\\rho(Q) < 1$ והטור $I + Q + Q^2 + \\dots = (I - Q)^{-1} = N$ מתכנס. תוחלת הביקורים במצב $j$ היא $\\sum_{k=0}^\\infty (Q^k)_{ij} = N_{ij}$. סכום השורה $t_i = (N\\mathbf{1})_i$ הוא תוחלת מספר הצעדים עד עזיבת הקבוצה החולפת. הסתברויות הבליעה נתונות ע״י $B = NR$.",
      },
    ],
  },
  {
    id: "stoch-q12-jackson-networks-product-form-solution",
    domain: "רשתות ג׳קסון",
    title: "מודלים סטוכסטיים - רשתות תורים פתוחות של ג׳קסון (Jackson Networks) ופתרון מכפלה",
    context:
      "ברשת תורים פתוחה של ג׳קסון (Open Jackson Network) בעלת $M$ צמתים (תחנות שירות M/M/1), לקוחות חיצוניים מגיעים לתחנה $i$ בקצב פואסוני $r_i$. לקוח המסיים שירות בתחנה $i$ מנותב לתחנה $j$ בהסתברות $P_{ij}$, או עוזב את הרשת בהסתברות $d_i = 1 - \\sum_{j=1}^M P_{ij}$. קצבי השירות המעריכיים הם $\\mu_i$.",
    formulaLatex: "\\lambda_i = r_i + \\sum_{j=1}^M \\lambda_j P_{ji}, \\quad \\rho_i = \\frac{\\lambda_i}{\\mu_i} < 1",
    instruction: "מה קובע משפט ג׳קסון (Jackson's Theorem) לגבי התפלגות המצב במצב מתמיד ברשת?",
    options: [
      {
        id: "stoch-q12-opt1",
        plainText: "הרשת מתנהגת כתור M/M/1 ענק יחיד שקצב השירות שלו שווה ל-$\\sum \\mu_i$.",
        isCorrect: false,
        explanation: "שגוי: התורים נפרדים פיזית ואינם מתמזגים לתור פיזי יחיד עם קצב שירות מסכם.",
      },
      {
        id: "stoch-q12-opt2",
        plainText: "התורים תלויים זה בזה באופן מובהק ולא ניתן לחשב את ההסתברות המשותפת ללא סימולציית מונטה-קרלו.",
        isCorrect: false,
        explanation: "שגוי: משפט ג׳קסון מספק פתרון אנליטי סגור בצורת מכפלה.",
      },
      {
        id: "stoch-q12-opt3",
        plainText: "התפלגות המצב מוגדרת רק אם המטריצה $P$ היא משולשית עליונה (ללא מעגלי ניתוב חוזרים).",
        isCorrect: false,
        explanation: "שגוי: המשפט תקף גם כאשר קיימים מעגלי ניתוב ומשוב בין התחנות.",
      },
      {
        id: "stoch-q12-opt4",
        plainText:
          "ההתפלגות המשותפת מתפרקת לצורת מכפלה (Product-Form Solution): $P(n_1, n_2, \\dots, n_M) = \\prod_{i=1}^M (1 - \\rho_i)\\rho_i^{n_i}$, כלומר במצב מתמיד מספר הלקוחות בכל תחנה מתנהג סטטיסטית כאילו כל התחנות הן תורי M/M/1 בלתי-תלויים לחלוטין עם קצב הגעה אפקטיבי $\\lambda_i$ הנקבע ע״י משוואות התנועה.",
        mathText: "P(n_1, \\dots, n_M) = \\prod_{i=1}^M (1 - \\rho_i)\\rho_i^{n_i}",
        isCorrect: true,
        explanation:
          "נכון: משפט ג׳קסון קובע כי במצב מתמיד $P(n_1, \\dots, n_M) = \\prod_{i=1}^M (1-\\rho_i)\\rho_i^{n_i}$, אף על פי שזרמים פנימיים עם משוב אינם בהכרח פואסוניים. כל תחנה מתנהגת שולית כמו M/M/1 עם קצב אפקטיבי $\\lambda_i$ הנפתר מ-$\\lambda_i = r_i + \\sum_j \\lambda_j P_{ji}$. תנאי היציבות הוא $\\rho_i = \\lambda_i/\\mu_i < 1$ לכל תחנה.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_STOCHASTIC_MODELS_QUESTIONS = STOCHASTIC_MODELS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleStochasticModelsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = STOCHASTIC_MODELS_QUESTIONS.slice(0, 3);
  const groupB = STOCHASTIC_MODELS_QUESTIONS.slice(3, 6);
  const groupC = STOCHASTIC_MODELS_QUESTIONS.slice(6, 12);

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
