import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Probability & Statistics diagnostic bank (20Q).
 * Display name: "הסתברות וסטטיסטיקה" — no institutional course codes.
 * Answer-key contract (hard): Q1–5 → A, Q6–10 → B, Q11–15 → C, Q16–20 → D (5-5-5-5).
 */
export const PROBABILITY_STATISTICS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–5 — מפתח תשובה: אופציה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "prob-q01-coffee-capsules-stopping",
    domain: "התפלגויות בדידות וזמני עצירה",
    title: "הסתברות וסטטיסטיקה - התפלגויות בדידות וזמני עצירה",
    context: "בשתי קופסאות יש בתחילה $N$ קפסולות קפה בכל אחת (חומה ולבנה). בכל שלב נבחרת קפסולה מהקופסה החומה בהסתברות $p$ ומהלבנה בהסתברות $1-p$ באופן בלתי תלוי. נסמן ב-$W$ את מספר הקפסולות שנותרו בקופסה הלבנה ברגע שבו נשלפה הקפסולה האחרונה מהקופסה החומה.",
    formulaLatex: "P(W = k) = \\binom{2N - k - 1}{N - 1} p^N (1 - p)^{N - k}, \\quad k \\in \\{1, 2, \\dots, N\\}",
    instruction: "מהי ההסתברות $P(W = k)$ שעבור $k \\in \\{1, 2, \\dots, N\\}$ נותרו בדיוק $k$ קפסולות בקופסה הלבנה?",
    options: [
      {
        id: "prob-q01-opt1",
        plainText: "$P(W = k) = \\binom{2N - k - 1}{N - 1} p^N (1 - p)^{N - k}$",
        mathText: "\\binom{2N - k - 1}{N - 1} p^N (1 - p)^{N - k}",
        isCorrect: true,
        explanation: "נכון: אם נותרו $k$ קפסולות בלבנה, נשלפו בסך הכל $N$ חומות ו-$N-k$ לבנות (סה״כ $2N-k$ שליפות). השליפה האחרונה חייבת להיות חומה (התרוקנות הקופסה החומה). לכן ב-$2N-k-1$ השליפות הראשונות היו בדיוק $N-1$ חומות ו-$N-k$ לבנות, בהסתברות הנתונה לפי המודל הבינומי השלילי."
      },
      {
        id: "prob-q01-opt2",
        plainText: "$P(W = k) = \\binom{2N - k}{N} p^N (1 - p)^{N - k}$",
        mathText: "\\binom{2N - k}{N} p^N (1 - p)^{N - k}",
        isCorrect: false,
        explanation: "שגוי: מסיח הנובע מהתעלמות מכך שהשליפה האחרונה מקובעת להיות מהקופסה החומה; נוסחה זו סופרת מקרים שבהם הקופסה החומה התרוקנה עוד קודם לכן."
      },
      {
        id: "prob-q01-opt3",
        plainText: "$P(W = k) = \\binom{N}{k} p^k (1 - p)^{N - k}$",
        mathText: "\\binom{N}{k} p^k (1 - p)^{N - k}",
        isCorrect: false,
        explanation: "שגוי: זוהי התפלגות בינומית פשוטה ל-$N$ ניסיונות קבועים מראש, שאינה מתאימה למודל של תהליך עצירה עם מספר ניסיונות משתנה."
      },
      {
        id: "prob-q01-opt4",
        plainText: "$P(W = k) = p^N (1 - p)^{N - k}$",
        mathText: "p^N (1 - p)^{N - k}",
        isCorrect: false,
        explanation: "שגוי: נשמט המקדם הקומבינטורי המונה את כל סדרי השליפה האפשריים של הקפסולות."
      }
    ]
  },
  {
    id: "prob-q02-poisson-superposition-waiting-time",
    domain: "תהליכי פואסון וזמני המתנה",
    title: "הסתברות וסטטיסטיקה - תהליכי פואסון וזמני המתנה",
    context: "למרפאה מגיעים מטופלים משלוש קופות חולים שונות בתהליכי פואסון בלתי תלויים: קצב 2 לשעה, קצב 1.5 לשעה, וקצב 0.5 לשעה. הרופא מתחיל לקבל קהל רק כאשר מגיע המטופל השלישי למרפאה.",
    formulaLatex: "\\lambda_{total} = 2 + 1.5 + 0.5 = 4 \\text{ patients/hour}, \\quad T_i \\sim \\operatorname{Exp}(\\lambda_{total})",
    instruction: "מהי תוחלת זמן ההמתנה של המטופל שהגיע ראשון למרפאה עד לתחילת הטיפול (הגעת המטופל השלישי)?",
    options: [
      {
        id: "prob-q02-opt1",
        plainText: "$\\frac{1}{2}$ שעה (30 דקות)",
        mathText: "\\frac{1}{2} \\text{ hour}",
        isCorrect: true,
        explanation: "נכון: איחוד שלושת התהליכים יוצר תהליך פואסון יחיד בקצב $\\lambda = 2 + 1.5 + 0.5 = 4$ מטופלים לשעה. המטופל הראשון ממתין להגעת המטופל השני והשלישי. זמני הביניים הבין-מופעיים מתפלגים $T_2, T_3 \\sim \\operatorname{Exp}(4)$. לפיכך תוחלת ההמתנה היא $E[T_2 + T_3] = 1/4 + 1/4 = 1/2$ שעה."
      },
      {
        id: "prob-q02-opt2",
        plainText: "$\\frac{3}{4}$ שעה (45 דקות)",
        mathText: "\\frac{3}{4} \\text{ hour}",
        isCorrect: false,
        explanation: "שגוי: זוהי תוחלת הזמן הכוללת מפתיחת המרפאה ועד הגעת המטופל השלישי ($E[T_1+T_2+T_3] = 3/4$), אך המטופל הראשון ממתין רק מרגע הגעתו שלו."
      },
      {
        id: "prob-q02-opt3",
        plainText: "$\\frac{1}{4}$ שעה (15 דקות)",
        mathText: "\\frac{1}{4} \\text{ hour}",
        isCorrect: false,
        explanation: "שגוי: מחושב זמן המתנה עבור מטופל אחד נוסף בלבד ($T_2$) במקום שניים ($T_2 + T_3$)."
      },
      {
        id: "prob-q02-opt4",
        plainText: "$1$ שעה (60 דקות)",
        mathText: "1 \\text{ hour}",
        isCorrect: false,
        explanation: "שגוי: חישוב הנובע משימוש בקצב הגעה שגוי של 2 מטופלים לשעה בלבד במקום איחוד כלל הקופות."
      }
    ]
  },
  {
    id: "prob-q03-joint-density-covariance",
    domain: "צפיפות משותפת ושונות משותפת",
    title: "הסתברות וסטטיסטיקה - צפיפות משותפת ושונות משותפת",
    context: "נתון משתנה מקרי $X \\sim U(0, 1)$, ובהינתן $X = x$ המשתנה $Y$ מקיים צפיפות מותנית $f_{Y|X=x}(y) = \\frac{2y}{x^2}$ עבור $0 < y < x$.",
    formulaLatex: "f_{X, Y}(x, y) = \\frac{2y}{x^2} \\quad (0 < y < x < 1), \\quad E[Y|X=x] = \\frac{2x}{3}",
    instruction: "מהי השונות המשותפת $\\operatorname{Cov}(X, Y)$ של המשתנים?",
    options: [
      {
        id: "prob-q03-opt1",
        plainText: "$\\operatorname{Cov}(X, Y) = \\frac{1}{18}$",
        mathText: "\\operatorname{Cov}(X, Y) = \\frac{1}{18}",
        isCorrect: true,
        explanation: "נכון: $E[X] = 1/2$. $E[Y|X] = \\int_0^X y \\frac{2y}{X^2}\\,dy = \\frac{2X}{3} \\implies E[Y] = E[2X/3] = 1/3$. כמו כן $E[XY] = E[X E[Y|X]] = E[2X^2/3] = \\frac{2}{3}\\left(\\operatorname{Var}(X) + E[X]^2\\right) = \\frac{2}{3}(1/12 + 1/4) = 2/9$. מכאן: $\\operatorname{Cov}(X,Y) = E[XY] - E[X]E[Y] = 2/9 - 1/6 = 1/18$."
      },
      {
        id: "prob-q03-opt2",
        plainText: "$\\operatorname{Cov}(X, Y) = \\frac{1}{12}$",
        mathText: "\\operatorname{Cov}(X, Y) = \\frac{1}{12}",
        isCorrect: false,
        explanation: "שגוי: ערך זה שווה לשונות השולית $\\operatorname{Var}(X) = 1/12$ של משתנה אחיד על $(0,1)$, ולא לשונות המשותפת."
      },
      {
        id: "prob-q03-opt3",
        plainText: "$\\operatorname{Cov}(X, Y) = 0$",
        mathText: "\\operatorname{Cov}(X, Y) = 0",
        isCorrect: false,
        explanation: "שגוי: המשתנים תלויים חזק (תחום ההגדרה של $Y$ מוגבל על ידי $X$), ותוחלתו של $Y$ עולה ככל ש-$X$ גדל."
      },
      {
        id: "prob-q03-opt4",
        plainText: "$\\operatorname{Cov}(X, Y) = \\frac{2}{9}$",
        mathText: "\\operatorname{Cov}(X, Y) = \\frac{2}{9}",
        isCorrect: false,
        explanation: "שגוי: $2/9$ היא התוחלת המשולבת $E[XY]$, ונשכחה החסרת מכפלת התוחלות השוליות $E[X]E[Y] = 1/6$."
      }
    ]
  },
  {
    id: "prob-q04-coin-toss-alternation-distribution",
    domain: "סדרות ברנולי ומספר החלפות תוצאה",
    title: "הסתברות וסטטיסטיקה - סדרות ברנולי ומספר החלפות תוצאה",
    context: "מטילים מטבע הוגן $n$ פעמים ($n \\ge 2$). נגדיר ״שינוי בתוצאה״ כאשר תוצאת הטלה שונה מזו שקדמה לה ישירות. נסמן ב-$X$ את סך כל השינויים בסדרה.",
    formulaLatex: "I_k = \\mathbb{I}_{\\{A_k \\neq A_{k-1}\\}}, \\quad X = \\sum_{k=2}^n I_k",
    instruction: "כיצד מתפלג המשתנה המקרי $X$?",
    options: [
      {
        id: "prob-q04-opt1",
        plainText: "$X \\sim \\operatorname{Bin}\\left(n - 1, \\frac{1}{2}\\right)$",
        mathText: "X \\sim \\operatorname{Bin}\\left(n - 1, \\frac{1}{2}\\right)",
        isCorrect: true,
        explanation: "נכון: לכל שלב $k \\in \\{2, \\dots, n\\}$, ההסתברות שתוצאת ההטלה ה-$k$ שונה מההטלה ה-$(k-1)$ היא בדיוק $1/2$. מאחר שכל הטלה בלתי תלויה בקודמותיה, האינדיקטורים של השינוי בלתי תלויים זה בזה. לכן סכום של $n-1$ אינדיקטורים בלתי תלויים בעלי סיכוי $1/2$ מתפלג בינומית $X \\sim \\operatorname{Bin}(n-1, 1/2)$."
      },
      {
        id: "prob-q04-opt2",
        plainText: "$X \\sim \\operatorname{Bin}\\left(n, \\frac{1}{2}\\right)$",
        mathText: "X \\sim \\operatorname{Bin}\\left(n, \\frac{1}{2}\\right)",
        isCorrect: false,
        explanation: "שגוי: ישנם רק $n-1$ מעברים בין $n$ הטלות עוקבות, ולכן לא ייתכנו $n$ שינויים."
      },
      {
        id: "prob-q04-opt3",
        plainText: "$X$ אינו מתפלג בינומית עקב תלות בין הטלות עוקבות.",
        isCorrect: false,
        explanation: "שגוי: האינדיקטורים של החלפת התוצאה הם בלתי תלויים הדדית כאשר המטבע הוגן ($p=1/2$)."
      },
      {
        id: "prob-q04-opt4",
        plainText: "$X \\sim \\operatorname{Geo}\\left(\\frac{1}{2}\\right)$",
        mathText: "X \\sim \\operatorname{Geo}\\left(\\frac{1}{2}\\right)",
        isCorrect: false,
        explanation: "שגוי: התפלגות גאומטרית סופרת את מספר הניסיונות עד לשינוי הראשון, ולא את סך השינויים בסדרה סופית."
      }
    ]
  },
  {
    id: "prob-q05-poisson-random-sample-maximum",
    domain: "מקסימום של מספר מקרי של משתנים",
    title: "הסתברות וסטטיסטיקה - מקסימום של מספר מקרי של משתנים",
    context: "יהיו $X_1, X_2, \\dots$ משתנים מקריים בלתי תלויים שווי-התפלגות $X_i \\sim U(0, 1)$. יהי $N \\sim \\operatorname{Pois}(\\lambda)$ משתנה מקרי פואסוני בלתי תלוי בהם. נגדיר $M_N = \\max\\{X_1, \\dots, X_N\\}$ (ועבור $N=0$ נגדיר $M_N = 0$).",
    formulaLatex: "F_{M_N}(t) = \\sum_{n=0}^{\\infty} P(N=n) F(t)^n = e^{-\\lambda(1 - t)}, \\quad t \\in [0, 1]",
    instruction: "מהי התוחלת $E[M_N]$ של מקסימום המדגם המקרי?",
    options: [
      {
        id: "prob-q05-opt1",
        plainText: "$E[M_N] = \\frac{\\lambda - 1 + e^{-\\lambda}}{\\lambda}$",
        mathText: "E[M_N] = \\frac{\\lambda - 1 + e^{-\\lambda}}{\\lambda}",
        isCorrect: true,
        explanation: "נכון: פונקציית ההתפלגות המצטברת היא $F_{M_N}(t) = \\sum_{n=0}^\\infty \\frac{e^{-\\lambda}\\lambda^n}{n!} t^n = e^{-\\lambda(1-t)}$. הצפיפות היא $f(t) = \\lambda e^{-\\lambda(1-t)}$. אינטגרציה בחלקים: $E[M_N] = \\int_0^1 t \\lambda e^{-\\lambda(1-t)} dt = \\frac{\\lambda - 1 + e^{-\\lambda}}{\\lambda}$. לחלופין דרך $E[M_N] = \\int_0^1 (1 - F(t))dt = \\int_0^1 (1 - e^{-\\lambda(1-t)})dt = 1 - \\frac{1 - e^{-\\lambda}}{\\lambda}$."
      },
      {
        id: "prob-q05-opt2",
        plainText: "$E[M_N] = \\frac{\\lambda}{\\lambda + 1}$",
        mathText: "E[M_N] = \\frac{\\lambda}{\\lambda + 1}",
        isCorrect: false,
        explanation: "שגוי: זוהי התוחלת של מקסימום מתוך מספר קבוע מראש $n=\\lambda$ של משתנים אחידים, ואינה משקללת את ההתפלגות הפואסונית של גודל המדגם."
      },
      {
        id: "prob-q05-opt3",
        plainText: "$E[M_N] = 1 - e^{-\\lambda}$",
        mathText: "E[M_N] = 1 - e^{-\\lambda}",
        isCorrect: false,
        explanation: "שגוי: זהו הסיכוי שהמדגם אינו ריק ($P(N > 0)$), ולא תוחלת ערך המקסימום."
      },
      {
        id: "prob-q05-opt4",
        plainText: "$E[M_N] = \\frac{1 - e^{-\\lambda}}{\\lambda}$",
        mathText: "E[M_N] = \\frac{1 - e^{-\\lambda}}{\\lambda}",
        isCorrect: false,
        explanation: "שגוי: זהו הערך של $\\int_0^1 F_{M_N}(t) dt$, השווה ל-$1 - E[M_N]$ ולא לתוחלת עצמה."
      }
    ]
  },

  // =========================================================================
  // בלוק 2: שאלות 6–10 — מפתח תשובה: אופציה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "prob-q06-first-to-lead-by-two-gambler",
    domain: "הסתברות מותנית והפרש ניצחונות",
    title: "הסתברות וסטטיסטיקה - הסתברות מותנית והפרש ניצחונות",
    context: "שני שחקנים, נועם וגיא, משחקים סדרת משחקים בלתי תלויים עד שאחד מהם מוביל בשני ניצחונות על יריבו ומוכרז כמנצח. בכל משחק בודד נועם מנצח בהסתברות $p=0.6$ וגיא ב-$q=0.4$.",
    formulaLatex: "P(A) = p^2 \\cdot 1 + q^2 \\cdot 0 + 2pq P(A)",
    instruction: "מהי ההסתברות שנועם יוכרז כמנצח הסדרה?",
    options: [
      {
        id: "prob-q06-opt1",
        plainText: "$0.60$",
        isCorrect: false,
        explanation: "שגוי: זהו סיכוי הזכייה במשחק בודד בלבד. היתרון מוכפל בסדרה הדורשת פער של 2 משחקים."
      },
      {
        id: "prob-q06-opt2",
        plainText: "$\\frac{9}{13} \\approx 0.692$",
        mathText: "\\frac{9}{13}",
        isCorrect: true,
        explanation: "נכון: לאחר כל שני משחקים יש 3 אפשרויות: נועם מנצח פעמיים בהסתברות $p^2=0.36$, גיא מנצח פעמיים ב-$q^2=0.16$, או שוויון 1-1 בהסתברות $2pq = 0.48$ שמחזיר את המצב להתחלה. לפי הסתברות שלמה: $P = \\frac{p^2}{p^2 + q^2} = \\frac{0.36}{0.36 + 0.16} = \\frac{36}{52} = \\frac{9}{13} \\approx 0.692$."
      },
      {
        id: "prob-q06-opt3",
        plainText: "$\\frac{3}{5}$",
        isCorrect: false,
        explanation: "שגוי: שווה ל-0.60 (ההסתברות הבודדת), ללא התחשבות במנגנון ההכרעה הרקורסיבי."
      },
      {
        id: "prob-q06-opt4",
        plainText: "$\\frac{27}{35}$",
        isCorrect: false,
        explanation: "שגוי: תוצאה המניחה בטעות שנדרשים 3 ניצחונות רצופים במקום יתרון של 2 משחקים."
      }
    ]
  },
  {
    id: "prob-q07-poisson-splitting-independence",
    domain: "פיצול פואסוני ואי-תלות זרמים",
    title: "הסתברות וסטטיסטיקה - פיצול פואסוני ואי-תלות זרמים",
    context: "מכוניות נכנסות לצומת בתהליך פואסון בקצב $\\lambda = 3$ לדקה. כל מכונית פונה ימינה בהסתברות $p=0.25$ או שמאלה בהסתברות $1-p=0.75$, באופן בלתי תלוי. נסמן ב-$R$ וב-$L$ את מספר הפונות ימינה ושמאלה בדקה הראשונה.",
    formulaLatex: "R \\sim \\operatorname{Pois}(p\\lambda), \\quad L \\sim \\operatorname{Pois}((1-p)\\lambda)",
    instruction: "מה ניתן לקבוע לגבי ההתפלגות והתלות בין המשתנים $R$ ו-$L$?",
    options: [
      {
        id: "prob-q07-opt1",
        plainText: "$R \\sim \\operatorname{Pois}(0.75)$, $L \\sim \\operatorname{Pois}(2.25)$, אך הם תלויים הדדית כי סכומם מוגבל לסך המכוניות שהגיעו.",
        isCorrect: false,
        explanation: "שגוי: על אף שסכומם שווה למספר המכוניות הכולל, משפט הפיצול הפואסוני מבטיח אי-תלות סטטיסטית מלאה בין שני המשתנים."
      },
      {
        id: "prob-q07-opt2",
        plainText: "$R \\sim \\operatorname{Pois}(0.75)$, $L \\sim \\operatorname{Pois}(2.25)$, והמשתנים $R$ ו-$L$ בלתי תלויים לחלוטין.",
        mathText: "R \\sim \\operatorname{Pois}(0.75), \\; L \\sim \\operatorname{Pois}(2.25), \\; R \\perp L",
        isCorrect: true,
        explanation: "נכון: לפי משפט הפיצול של תהליכי פואסון (Poisson Thinning), פיצול של תהליך פואסון עם קצב $\\lambda$ בעזרת ניסויי ברנולי בלתי תלויים עם הסתברות $p$ מייצר שני תהליכי פואסון בלתי תלויים לחלוטין עם קצבים $p\\lambda = 0.75$ ו-$(1-p)\\lambda = 2.25$."
      },
      {
        id: "prob-q07-opt3",
        plainText: "$R \\sim \\operatorname{Bin}(3, 0.25)$ ו-$L \\sim \\operatorname{Bin}(3, 0.75)$.",
        isCorrect: false,
        explanation: "שגוי: מספר המכוניות הכולל אינו קבוע ל-3, אלא הוא משתנה מקרי פואסוני בעל תוחלת 3."
      },
      {
        id: "prob-q07-opt4",
        plainText: "$R$ ו-$L$ מתפלגים פואסונית עם מקדם מתאם שלילי $\\rho = -0.25$.",
        isCorrect: false,
        explanation: "שגוי: השונות המשותפת ומקדם המתאם ביניהם שווים בדיוק לאפס עקב אי-תלותם המוחלטת."
      }
    ]
  },
  {
    id: "prob-q08-shifted-exponential-mle",
    domain: "אמידת נראות מקסימלית (MLE) להתפלגות מוסטת",
    title: "הסתברות וסטטיסטיקה - אמידת נראות מקסימלית (MLE) להתפלגות מוסטת",
    context: "משך הזמן לפתרון בחינה הוא משתנה מקרי בעל צפיפות מעריכית מוסטת: $f(x; \\lambda) = \\lambda e^{-\\lambda(x - 1)}$ עבור $x \\ge 1$ (ואפס עבור $x < 1$). נתון מדגם מקרי בלתי תלוי $X_1, \\dots, X_n$.",
    formulaLatex: "L(\\lambda) = \\lambda^n e^{-\\lambda \\sum_{i=1}^n (x_i - 1)}, \\quad \\ln L(\\lambda) = n\\ln\\lambda - \\lambda n (\\bar{X} - 1)",
    instruction: "מהו אומד הנראות המקסימלית $\\hat{\\lambda}_{MLE}$ עבור הפרמטר $\\lambda$?",
    options: [
      {
        id: "prob-q08-opt1",
        plainText: "$\\hat{\\lambda} = \\frac{1}{\\bar{X}}$",
        isCorrect: false,
        explanation: "שגוי: זהו האומד להתפלגות מעריכית רגילה המתחילה מ-$0$, שאינו מתחשב בהסטה הקבועה של יחידה אחת ימינה."
      },
      {
        id: "prob-q08-opt2",
        plainText: "$\\hat{\\lambda} = \\frac{1}{\\bar{X} - 1}$",
        mathText: "\\hat{\\lambda} = \\frac{1}{\\bar{X} - 1}",
        isCorrect: true,
        explanation: "נכון: נגדיר $Y_i = X_i - 1 \\sim \\operatorname{Exp}(\\lambda)$. פונקציית הלוג-נראות: $\\ln L = n\\ln\\lambda - \\lambda\\sum(x_i - 1)$. גזירה לפי $\\lambda$ והשוואה לאפס: $\\frac{n}{\\lambda} - \\sum(x_i - 1) = 0 \\implies \\hat{\\lambda} = \\frac{n}{\\sum x_i - n} = \\frac{1}{\\bar{X} - 1}$."
      },
      {
        id: "prob-q08-opt3",
        plainText: "$\\hat{\\lambda} = \\frac{\\bar{X} - 1}{n}$",
        isCorrect: false,
        explanation: "שגוי: היפוך שגוי של התלות בין ממוצע המדגם לפרמטר הקצב של ההתפלגות."
      },
      {
        id: "prob-q08-opt4",
        plainText: "$\\hat{\\lambda} = \\frac{1}{\\min(X_i) - 1}$",
        isCorrect: false,
        explanation: "שגוי: פרמטר הקצב $\lambda$ מופיע במעריך ואינו נקבע על ידי הסטטיסטי הסדורי המינימלי."
      }
    ]
  },
  {
    id: "prob-q09-order-statistics-memoryless-wait",
    domain: "תכונת חוסר הזיכרון ומינימום מעריכיים",
    title: "הסתברות וסטטיסטיקה - תכונת חוסר הזיכרון ומינימום מעריכיים",
    context: "20 סועדים יושבים סביב שולחן במסעדה. זמן השהייה של כל סועד מתפלג מעריכית עם תוחלת של שעתיים ($X_i \\sim \\operatorname{Exp}(0.5)$) באופן בלתי תלוי.",
    formulaLatex: "T_{(1)} = \\min_{1 \\le i \\le 20} X_i \\sim \\operatorname{Exp}(20 \\cdot 0.5), \\quad T_{(2)} - T_{(1)} \\sim \\operatorname{Exp}(19 \\cdot 0.5)",
    instruction: "מהי תוחלת הזמן שיחלוף בין עזיבת הסועד הראשון לעזיבת הסועד השני?",
    options: [
      {
        id: "prob-q09-opt1",
        plainText: "$\\frac{1}{10}$ שעה (6 דקות)",
        isCorrect: false,
        explanation: "שגוי: זהו זמן ההמתנה הממוצע עד לעזיבת הסועד הראשון ($1/(20 \\cdot 0.5) = 1/10$), ולא משך הזמן בין הסועד הראשון לשני."
      },
      {
        id: "prob-q09-opt2",
        plainText: "$\\frac{2}{19}$ שעה (כ-6.3 דקות)",
        mathText: "\\frac{2}{19} \\text{ hour}",
        isCorrect: true,
        explanation: "נכון: מתכונת חוסר הזיכרון של ההתפלגות המעריכית, ברגע שהסועד הראשון עוזב, 19 הסועדים שנותרו ממשיכים לשהות זמן שמתפלג מחדש $\\operatorname{Exp}(1/2)$ באופן בלתי תלוי. הזמן עד העזיבה הבאה הוא מינימום של 19 משתנים כאלו, המתפלג $\\operatorname{Exp}(19 \\cdot 0.5) = \\operatorname{Exp}(9.5)$. לפיכך תוחלת הזמן היא $1/9.5 = 2/19$ שעה."
      },
      {
        id: "prob-q09-opt3",
        plainText: "$\\frac{2}{20}$ שעה",
        isCorrect: false,
        explanation: "שגוי: לאחר עזיבת הסועד הראשון נותרו ליד השולחן 19 סועדים בלבד ולא 20."
      },
      {
        id: "prob-q09-opt4",
        plainText: "$2$ שעות",
        isCorrect: false,
        explanation: "שגוי: זוהי תוחלת השהייה של סועד בודד העוזב לבדו במסעדה ריקה."
      }
    ]
  },
  {
    id: "prob-q10-hypothesis-testing-type-i-error",
    domain: "בדיקת השערות והסתברות לטעות מסוג ראשון",
    title: "הסתברות וסטטיסטיקה - בדיקת השערות והסתברות לטעות מסוג ראשון",
    context: "מתקן התרעה מודד ממוצע של מדגם בגודל $n=16$ אותות. במצב רגיל חוזק אות מתפלג $N(3000, 400^2)$. נקבע כלל הכרעה: התרעת חירום מופעלת אם ממוצע המדגם $\\bar{X}$ עולה על 3150.",
    formulaLatex: "H_0: \\mu = 3000 \\quad \\text{vs.} \\quad H_1: \\mu > 3000, \\quad \\sigma_{\\bar{X}} = \\frac{400}{\\sqrt{16}} = 100",
    instruction: "מהי ההסתברות להתראת שווא (טעות מסוג ראשון $\\alpha$)?",
    options: [
      {
        id: "prob-q10-opt1",
        plainText: "$\\alpha = 0.0500$",
        isCorrect: false,
        explanation: "שגוי: $0.05$ היא רמת מובהקות סטנדרטית מקובלת, אך כלל ההכרעה הספציפי שנקבע כאן אינו מתאים לציון תקן $1.645$."
      },
      {
        id: "prob-q10-opt2",
        plainText: "$\\alpha = 0.0668$",
        mathText: "\\alpha = 0.0668",
        isCorrect: true,
        explanation: "נכון: תחת השערת האפס $H_0$, ממוצע המדגם מתפלג $\\bar{X} \\sim N(3000, 400^2/16) = N(3000, 100^2)$. ההסתברות לדחיית $H_0$ כשאינה נכונה: $P(\\bar{X} > 3150) = P\\left(Z > \\frac{3150 - 3000}{100}\\right) = P(Z > 1.5) = 1 - \\Phi(1.5) = 1 - 0.9332 = 0.0668$."
      },
      {
        id: "prob-q10-opt3",
        plainText: "$\\alpha = 0.0228$",
        isCorrect: false,
        explanation: "שגוי: מתאים לציון תקן $Z = 2.0$ ($1 - \\Phi(2) = 0.0228$), הנובע מחלוקה שגויה של סטיית התקן."
      },
      {
        id: "prob-q10-opt4",
        plainText: "$\\alpha = 0.3520$",
        isCorrect: false,
        explanation: "שגוי: חישוב ללא חלוקה ב-$\\sqrt{n}$, כלומר שימוש בסטיית התקן של תצפית בודדת במקום של ממוצע המדגם."
      }
    ]
  },

  // =========================================================================
  // בלוק 3: שאלות 11–15 — מפתח תשובה: אופציה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "prob-q11-coupon-collector-expectation",
    domain: "בעיית אספן הקופונים וסכומי גאומטריים",
    title: "הסתברות וסטטיסטיקה - בעיית אספן הקופונים וסכומי גאומטריים",
    context: "בקופסה $n$ פתקים שונים הממוספרים מ-$1$ עד $n$ ($n \\ge 6$). שולפים פתקים עם החזרה ורושמים את ערכם. נסמן ב-$Y_6$ את מספר השליפות הכולל עד אשר יופיעו ברשימה בדיוק 6 מספרים שונים.",
    formulaLatex: "Y_6 = 1 + \\sum_{i=1}^5 X_i, \\quad X_i \\sim \\operatorname{Geo}\\left(\\frac{n - i}{n}\\right)",
    instruction: "מהי התוחלת $E[Y_6]$ של מספר השליפות הנדרש?",
    options: [
      {
        id: "prob-q11-opt1",
        plainText: "$E[Y_6] = \\frac{6n}{n - 5}$",
        isCorrect: false,
        explanation: "שגוי: קירוב נאיבי המניח שכל שלבי השליפה מתבצעים לפי הסיכוי בשלב האחרון בלבד."
      },
      {
        id: "prob-q11-opt2",
        plainText: "$E[Y_6] = 6$",
        isCorrect: false,
        explanation: "שגוי: 6 הוא מספר השליפות המינימלי האפשרי (בתרחיש שבו בכל שליפה יוצא פתק חדש), אך אינו התוחלת."
      },
      {
        id: "prob-q11-opt3",
        plainText: "$E[Y_6] = 1 + \\frac{n}{n - 1} + \\frac{n}{n - 2} + \\frac{n}{n - 3} + \\frac{n}{n - 4} + \\frac{n}{n - 5}$",
        mathText: "E[Y_6] = 1 + n\\sum_{i=1}^5 \\frac{1}{n - i}",
        isCorrect: true,
        explanation: "נכון: השליפה הראשונה מניבה תמיד ערך חדש בהסתברות 1. לאחר שיש $i$ ערכים שונים, הסיכוי לקבל ערך חדש בשליפה הבאה הוא $\\frac{n-i}{n}$, ומספר הניסיונות עד להצלחתו מתפלג גאומטרית עם תוחלת $\\frac{n}{n-i}$. מליניאריות התוחלת: $E[Y_6] = 1 + \\sum_{i=1}^5 \\frac{n}{n-i}$."
      },
      {
        id: "prob-q11-opt4",
        plainText: "$E[Y_6] = n \\ln 6$",
        isCorrect: false,
        explanation: "שגוי: זהו קירוב אסימפטוטי באמצעות אינטגרל שאינו נותן את הערך הבדיד המדויק."
      }
    ]
  },
  {
    id: "prob-q12-mle-bounded-support-invariance",
    domain: "נראות מקסימלית בתחום חסום ועקרון האינווריאנטיות",
    title: "הסתברות וסטטיסטיקה - נראות מקסימלית בתחום חסום ועקרון האינווריאנטיות",
    context: "זמן החיים של רכיב הוא משתנה מקרי בעל פונקציית צפיפות $f(x; \\theta) = \\frac{3x^2}{\\theta^3}$ עבור $0 \\le x \\le \\theta$ (ואפס אחרת). נתון מדגם מקרי $X_1, \\dots, X_n$.",
    formulaLatex: "L(\\theta) = \\frac{3^n}{\\theta^{3n}} \\prod_{i=1}^n x_i^2 \\quad \\text{for } \\theta \\ge \\max_{1 \\le i \\le n}(X_i)",
    instruction: "מהו אומד הנראות המקסימלית $\\hat{M}_{MLE}$ לחציון זמן החיים של הרכיב?",
    options: [
      {
        id: "prob-q12-opt1",
        plainText: "$\\hat{M} = \\frac{1}{2}\\max(X_i)$",
        isCorrect: false,
        explanation: "שגוי: החציון אינו מחצית הפרמטר $\\theta$ משום שהצפיפות אינה אחידה אלא ריבועית."
      },
      {
        id: "prob-q12-opt2",
        plainText: "$\\hat{M} = \\sqrt[3]{0.5} \\,\\bar{X}$",
        isCorrect: false,
        explanation: "שגוי: אומד הנראות המקסימלית ל-$\\theta$ אינו ממוצע המדגם אלא הסטטיסטי הסדורי המקסימלי."
      },
      {
        id: "prob-q12-opt3",
        plainText: "$\\hat{M} = \\sqrt[3]{0.5} \\,\\max_{1 \\le i \\le n}(X_i)$",
        mathText: "\\hat{M} = \\sqrt[3]{0.5} \\,\\max_{1 \\le i \\le n}(X_i)",
        isCorrect: true,
        explanation: "נכון: הנראות $L(\\theta) \\propto \\theta^{-3n}$ יורדת מונוטונית ב-$\\theta$, ולכן המקסימום מתקבל בערך המינימלי האפשרי של התחום: $\\hat{\\theta}_{MLE} = \\max(X_i)$. החציון האוכלוסייתי מקיים $\\int_0^M \\frac{3x^2}{\\theta^3}dx = \\frac{M^3}{\\theta^3} = 0.5 \\implies M = \\sqrt[3]{0.5}\\,\\theta$. לפי עקרון האינווריאנטיות של MLE, $\\hat{M}_{MLE} = \\sqrt[3]{0.5}\\,\\hat{\\theta}_{MLE} = \\sqrt[3]{0.5}\\max(X_i)$."
      },
      {
        id: "prob-q12-opt4",
        plainText: "$\\hat{M} = \\max(X_i)$",
        isCorrect: false,
        explanation: "שגוי: זהו האומד עבור החסם העליון $\\theta$ של זמן החיים, ולא עבור החציון שבו מצטברת 50% מההסתברות."
      }
    ]
  },
  {
    id: "prob-q13-poisson-autocorrelation-covariance",
    domain: "פונקציית אוטוקורלציה של תהליך פואסון",
    title: "הסתברות וסטטיסטיקה - פונקציית אוטוקורלציה של תהליך פואסון",
    context: "יהי $\\{N(t), t \\ge 0\\}$ תהליך פואסון הומוגני עם פרמטר קצב $\\lambda$. נתונה פונקציית האוטוקורלציה $R_N(t, s) = E[N(t)N(s)]$.",
    formulaLatex: "N(t) = N(s) + [N(t) - N(s)] \\quad (s < t), \\quad N(t) - N(s) \\perp N(s)",
    instruction: "למה שווה פונקציית האוטוקורלציה $R_N(t, s)$ לכל $t, s \\ge 0$?",
    options: [
      {
        id: "prob-q13-opt1",
        plainText: "$R_N(t, s) = \\lambda^2 t s$",
        isCorrect: false,
        explanation: "שגוי: ביטוי זה שווה למכפלת התוחלות $E[N(t)]E[N(s)]$, והוא מתעלם מהתלות המובנית הנובעת מחפיפת קטעי הזמן."
      },
      {
        id: "prob-q13-opt2",
        plainText: "$R_N(t, s) = \\lambda |t - s| + \\lambda^2 t s$",
        isCorrect: false,
        explanation: "שגוי: התוספת תלויה במינימום שבין הזמנים ולא בהפרש המוחלט ביניהם."
      },
      {
        id: "prob-q13-opt3",
        plainText: "$R_N(t, s) = \\lambda^2 t s + \\lambda \\min(t, s)$",
        mathText: "R_N(t, s) = \\lambda^2 t s + \\lambda \\min(t, s)",
        isCorrect: true,
        explanation: "נכון: בהנחה ש-$s \\le t$: נפרק $N(t) = N(s) + [N(t) - N(s)]$. לפי תכונת התוספות הבלתי תלויות: $E[N(t)N(s)] = E[N(s)^2] + E[N(s)]E[N(t)-N(s)] = (\\lambda s + \\lambda^2 s^2) + \\lambda s \\cdot \\lambda(t-s) = \\lambda s + \\lambda^2 st$. באופן כללי עבור כל $s,t \\ge 0$ מתקבל $\\lambda^2 st + \\lambda\\min(s,t)$."
      },
      {
        id: "prob-q13-opt4",
        plainText: "$R_N(t, s) = \\lambda \\max(t, s)$",
        isCorrect: false,
        explanation: "שגוי: ביטוי שגוי מבחינת ממדים, שאינו כולל את האיבר הריבועי של התוחלת."
      }
    ]
  },
  {
    id: "prob-q14-confidence-interval-hypothesis-duality",
    domain: "דואליות בין רווחי סמך לבדיקת השערות",
    title: "הסתברות וסטטיסטיקה - דואליות בין רווחי סמך לבדיקת השערות",
    context: "ברמת סמך של 96% התקבל רווח סמך לתוחלת משקל מוצר: $[249.946, 254.054]$ (השונות ידועה ושימש משתנה נורמלי $Z_{0.98} = 2.054$). נבדקות ההשערות $H_0: \\mu = 250$ מול $H_1: \\mu \\neq 250$.",
    formulaLatex: "\\bar{X} = \\frac{249.946 + 254.054}{2} = 252, \\quad \\frac{\\sigma}{\\sqrt{n}} = 1",
    instruction: "מהו ערכו של סטטיסטי המבחן $Z$, ומהי המסקנה ברמת מובהקות $\\alpha = 0.05$?",
    options: [
      {
        id: "prob-q14-opt1",
        plainText: "$Z = 1.0$, ולא דוחים את $H_0$ ברמת מובהקות $0.05$.",
        isCorrect: false,
        explanation: "שגוי: סטטיסטי המבחן מחושב ביחס לערך המשוער תחת השערת האפס ($250$) ולא ביחס לערך אחר."
      },
      {
        id: "prob-q14-opt2",
        plainText: "$Z = 2.054$, ודוחים את $H_0$ ברמת מובהקות $0.01$.",
        isCorrect: false,
        explanation: "שגוי: $2.054$ הוא הערך הקריטי של התפלגות $Z$ ברמת סמך 96%, ולא ערכו של סטטיסטי המבחן המדגמי."
      },
      {
        id: "prob-q14-opt3",
        plainText: "$Z = 2.0$, ודוחים את $H_0$ ברמת מובהקות $0.05$ (ערך ה-$p$ הוא $0.0456$).",
        mathText: "Z = 2.0, \\quad p\\text{-value} = 0.0456 < 0.05",
        isCorrect: true,
        explanation: "נכון: מרווח הסמך: המרכז הוא $\\bar{X} = 252$, וחצי הרוחב הוא $Z_{0.98}\\frac{\\sigma}{\\sqrt{n}} = 2.054 \\implies \\frac{\\sigma}{\\sqrt{n}} = 1$. סטטיסטי המבחן: $Z = \\frac{\\bar{X} - \\mu_0}{\\sigma/\\sqrt{n}} = \\frac{252 - 250}{1} = 2.0$. במבחן דו-צדדי: $p\\text{-value} = 2(1 - \\Phi(2)) = 2(1 - 0.9772) = 0.0456$. מכיוון ש-$0.0456 < 0.05$, דוחים את השערת האפס."
      },
      {
        id: "prob-q14-opt4",
        plainText: "$Z = 2.0$, אך לא ניתן לדחות את $H_0$ כי הרווח הנתון מכיל את הערך $250$.",
        isCorrect: false,
        explanation: "שגוי: הרווח הנתון היה עבור 96% ($\alpha = 0.04$). עבור $\alpha = 0.05$ הרווח צר יותר ($Z_{0.975} = 1.96$), והערך 250 נופל מחוצה לו."
      }
    ]
  },
  {
    id: "prob-q15-chebyshev-sample-size-bound",
    domain: "אי-שוויון צ׳בישב וקביעת גודל מדגם",
    title: "הסתברות וסטטיסטיקה - אי-שוויון צ׳בישב וקביעת גודל מדגם",
    context: "משתנה מקרי $X$ מקיים תוחלת $E[X] = 0$ ושונות $\\operatorname{Var}(X) = 4$. דוגמים $n$ תצפיות בלתי תלויות שוות-התפלגות $X_1, \\dots, X_n$.",
    formulaLatex: "P\\left(|\\bar{X}_n - E[X]| \\ge 0.25\\right) \\le \\frac{\\operatorname{Var}(\\bar{X}_n)}{0.25^2} = \\frac{4/n}{1/16} = \\frac{64}{n}",
    instruction: "מהו גודל המדגם המינימלי $n$ המבטיח לפי אי-שוויון צ׳בישב כי הסטייה של ממוצע המדגם מהתוחלת תעלה על $0.25$ בהסתברות של לכל היותר $0.2$?",
    options: [
      {
        id: "prob-q15-opt1",
        plainText: "$n = 64$",
        isCorrect: false,
        explanation: "שגוי: הצבה של $n=64$ נותנת חסם הסתברות של $64/64 = 1.0$, שאינו מבטיח הסתברות קטנה מ-$0.2$."
      },
      {
        id: "prob-q15-opt2",
        plainText: "$n = 106$",
        isCorrect: false,
        explanation: "שגוי: $n=106$ הוא גודל המדגם המתקבל מקירוב נורמלי (משפט הגבול המרכזי), אך אי-שוויון צ׳בישב אי-פרמטרי ושמרני יותר ודורש מדגם גדול יותר."
      },
      {
        id: "prob-q15-opt3",
        plainText: "$n = 320$",
        mathText: "n = 320",
        isCorrect: true,
        explanation: "נכון: שונות ממוצע המדגם היא $\\operatorname{Var}(\\bar{X}_n) = \\frac{\\operatorname{Var}(X)}{n} = \\frac{4}{n}$. לפי אי-שוויון צ׳בישב: $P(|\\bar{X}_n - 0| \\ge 0.25) \\le \\frac{\\operatorname{Var}(\\bar{X}_n)}{0.25^2} = \\frac{4/n}{0.0625} = \\frac{64}{n}$. נדרוש $\\frac{64}{n} \\le 0.2 \\implies n \\ge \\frac{64}{0.2} = 320$."
      },
      {
        id: "prob-q15-opt4",
        plainText: "$n = 1280$",
        isCorrect: false,
        explanation: "שגוי: תוצאה משימוש ב-$0.25$ במכנה במקום בריבועו $0.25^2 = 1/16$."
      }
    ]
  },

  // =========================================================================
  // בלוק 4: שאלות 16–20 — מפתח תשובה: אופציה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "prob-q16-joint-exponential-transformation",
    domain: "טרנספורמציה של וקטור אקראי רציף",
    title: "הסתברות וסטטיסטיקה - טרנספורמציה של וקטור אקראי רציף",
    context: "משתנה מקרי דו-ממדי רציף $(X, Y)$ בעל צפיפות משותפת: $f(x, y) = \\frac{a}{y} e^{-ay} e^{-x/y}$ עבור $x > 0, y > 0$ (וקבוע $a > 0$). נגדיר $Z = \\frac{X}{Y}$.",
    formulaLatex: "P(Z \\le t) = \\int_0^\\infty \\int_0^{ty} \\frac{a}{y} e^{-ay} e^{-x/y} \\, dx dy",
    instruction: "כיצד מתפלג המשתנה המקרי $Z$?",
    options: [
      {
        id: "prob-q16-opt1",
        plainText: "$Z \\sim \\operatorname{Exp}(a)$",
        isCorrect: false,
        explanation: "שגוי: הפרמטר $a$ שייך לצפיפות השולית של $Y$ ($Y \\sim \\operatorname{Exp}(a)$), אך מצטמצם באינטגרל המצטבר של היחס $X/Y$."
      },
      {
        id: "prob-q16-opt2",
        plainText: "$Z \\sim U(0, 1)$",
        isCorrect: false,
        explanation: "שגוי: היחס בין שני משתנים חיוביים בעלי תומך אינסופי מקבל כל ערך ב-$(0, \\infty)$ ואינו חסום בקטע יחידה."
      },
      {
        id: "prob-q16-opt3",
        plainText: "$Z \\sim \\operatorname{Gamma}(2, 1)$",
        isCorrect: false,
        explanation: "שגוי: התפלגות גמא מסדר 2 מתקבלת עבור סכום של שני מעריכיים, ולא עבור המנה שלהם."
      },
      {
        id: "prob-q16-opt4",
        plainText: "$Z \\sim \\operatorname{Exp}(1)$",
        mathText: "Z \\sim \\operatorname{Exp}(1), \\quad f_Z(t) = e^{-t} \\; (t > 0)",
        isCorrect: true,
        explanation: "נכון: נחשב התפלגות מצטברת עבור $t > 0$: $F_Z(t) = P(X \\le tY) = \\int_0^\\infty \\frac{a}{y} e^{-ay} \\left(\\int_0^{ty} e^{-x/y} dx\\right) dy = \\int_0^\\infty \\frac{a}{y} e^{-ay} \\left[-y e^{-x/y}\\right]_0^{ty} dy = \\int_0^\\infty a e^{-ay} (1 - e^{-t}) dy = (1 - e^{-t}) \\int_0^\\infty a e^{-ay} dy = 1 - e^{-t}$. זוהי פונקציית ההתפלגות של משתנה מעריכי סטנדרטי $\\operatorname{Exp}(1)$."
      }
    ]
  },
  {
    id: "prob-q17-gamma-mle-bias-analysis",
    domain: "חוסר הטיה של אומד נראות מקסימלית",
    title: "הסתברות וסטטיסטיקה - חוסר הטיה של אומד נראות מקסימלית",
    context: "זמן שירות מתפלג לפי צפיפות גמא: $f(x; \\lambda) = \\frac{1}{2}\\lambda^3 x^2 e^{-\\lambda x}$ עבור $x > 0$. על סמך תצפית בודדת $X_1$ הוצע האומד $\\hat{\\lambda} = \\frac{3}{X_1}$.",
    formulaLatex: "X_1 \\sim \\operatorname{Gamma}(3, \\lambda), \\quad E[\\hat{\\lambda}] = \\int_0^\\infty \\frac{3}{x} \\frac{\\lambda^3 x^2 e^{-\\lambda x}}{2} \\, dx",
    instruction: "מהי התוחלת של האומד $E[\\hat{\\lambda}]$, והאם הוא חסר הטיה?",
    options: [
      {
        id: "prob-q17-opt1",
        plainText: "$E[\\hat{\\lambda}] = \\lambda$, והאומד חסר הטיה.",
        isCorrect: false,
        explanation: "שגוי: אף על פי ש-$E[X_1] = 3/\\lambda$, מאי-שוויון ינסן נובע כי $E[1/X_1] > 1/E[X_1]$, ולכן אומד התלוי בהופכי סובל מהטיה שיטתית כלפי מעלה."
      },
      {
        id: "prob-q17-opt2",
        plainText: "$E[\\hat{\\lambda}] = \\frac{2}{3}\\lambda$, והאומד מוטה כלפי מטה.",
        isCorrect: false,
        explanation: "שגוי: תוצאה הנובעת מהיפוך המקדמים המספריים של נוסחת התוחלת."
      },
      {
        id: "prob-q17-opt3",
        plainText: "$E[\\hat{\\lambda}] = 3\\lambda$, והאומד מוטה פי 3.",
        isCorrect: false,
        explanation: "שגוי: חישוב אינטגרל שגוי עם השמטת עצרת הסדר בחישוב המומנט של פונקציית הגמא."
      },
      {
        id: "prob-q17-opt4",
        plainText: "$E[\\hat{\\lambda}] = \\frac{3}{2}\\lambda$, ולכן האומד מוטה (אינו חסר הטיה).",
        mathText: "E[\\hat{\\lambda}] = \\frac{3}{2}\\lambda \\neq \\lambda",
        isCorrect: true,
        explanation: "נכון: $E[\\hat{\\lambda}] = 3 \\int_0^\\infty \\frac{1}{x} \\frac{\\lambda^3 x^2 e^{-\\lambda x}}{2} dx = \\frac{3}{2}\\lambda^3 \\int_0^\\infty x e^{-\\lambda x} dx = \\frac{3}{2}\\lambda^3 \\frac{1}{\\lambda^2} = \\frac{3}{2}\\lambda$. התוחלת אינה שווה ל-$\\lambda$, אלא גדולה ממנה ב-50% ($+\\lambda/2$), ולכן האומד מוטה כלפי מעלה."
      }
    ]
  },
  {
    id: "prob-q18-clt-sample-mean-payoff",
    domain: "משפט הגבול המרכזי (CLT) על הפרש משתנים",
    title: "הסתברות וסטטיסטיקה - משפט הגבול המרכזי (CLT) על הפרש משתנים",
    context: "שני שחקנים משחקים משחק שבו תוצאת שחקן א׳ היא $X \\sim \\operatorname{Geo}(1/3)$ ותוצאת שחקן ב׳ היא $Y \\sim \\operatorname{Pois}(3)$ (בלתי תלויים). הרווח של שחקן א׳ במשחק בודד הוא $D = X - Y$. משחקים $n=100$ משחקים בלתי תלויים.",
    formulaLatex: "E[D] = 3 - 3 = 0, \\quad \\operatorname{Var}(D) = \\frac{1 - 1/3}{(1/3)^2} + 3 = 6 + 3 = 9, \\quad \\bar{D}_{100} \\sim N(0, 0.09)",
    instruction: "מהי בקירוב ההסתברות שממוצע הרווח למשחק ב-100 המשחקים יהיה לכל הפחות $1$?",
    options: [
      {
        id: "prob-q18-opt1",
        plainText: "$0.5000$",
        isCorrect: false,
        explanation: "שגוי: תוחלת הממוצע היא 0, ולכן ההסתברות לחרוג מעל 1 אינה חצי אלא נמצאת בזנב ההתפלגות."
      },
      {
        id: "prob-q18-opt2",
        plainText: "$0.1587$",
        isCorrect: false,
        explanation: "שגוי: מתאים לסטיית תקן שלמה אחת מעל התוחלת ($Z=1.0$), הנובעת משכחת החלוקה בשורש גודל המדגם $\\sqrt{100}=10$."
      },
      {
        id: "prob-q18-opt3",
        plainText: "$0.0228$",
        isCorrect: false,
        explanation: "שגוי: מתאים לציון תקן $Z=2.0$, שאינו תואם את סטיית התקן של ממוצע המדגם."
      },
      {
        id: "prob-q18-opt4",
        plainText: "$0.0004$",
        mathText: "P(\\bar{D}_{100} \\ge 1) \\approx 1 - \\Phi(3.33) = 0.0004",
        isCorrect: true,
        explanation: "נכון: $E[X] = 3, \\operatorname{Var}(X) = \\frac{2/3}{1/9} = 6$. $E[Y] = 3, \\operatorname{Var}(Y) = 3$. לכן לכל משחק: $E[D] = 0$ ו-$\\operatorname{Var}(D) = 6 + 3 = 9$. לפי משפט הגבול המרכזי: $\\bar{D}_{100} \\sim N(0, 9/100)$ וסטיית התקן היא $\\sigma_{\\bar{D}} = \\sqrt{0.09} = 0.3$. לכן: $P(\\bar{D}_{100} \\ge 1) = P\\left(Z \\ge \\frac{1 - 0}{0.3}\\right) = P(Z \\ge 3.33) = 1 - \\Phi(3.33) = 1 - 0.9996 = 0.0004$."
      }
    ]
  },
  {
    id: "prob-q19-memoryless-exponential-system-reliability",
    domain: "תכונת חוסר הזיכרון ואמינות מערכות",
    title: "הסתברות וסטטיסטיקה - תכונת חוסר הזיכרון ואמינות מערכות",
    context: "במערכת 3 נורות בעלות אורך חיים מעריכי בלתי תלוי $T_i \\sim \\operatorname{Exp}(\\lambda = 1)$ (בשנים). ידוע כי נורה 1 הוחלפה זה עתה ($T_1$), ואילו נורה 2 הוחלפה לפני שנה בדיוק ועדיין פועלת ($T_2 > 1$).",
    formulaLatex: "P(T_1 < T_2 \\mid T_2 > 1) = P(T_1 < T_2 - 1 \\mid T_2 > 1)",
    instruction: "מהי ההסתברות שנורה 1 תישרף לפני נורה 2?",
    options: [
      {
        id: "prob-q19-opt1",
        plainText: "$P = e^{-1} \\approx 0.368$",
        isCorrect: false,
        explanation: "שגוי: זוהי ההסתברות שנורה בודדת תשרוד שנה אחת, ואינה עונה על שאלת הקדימות בין שתי הנורות."
      },
      {
        id: "prob-q19-opt2",
        plainText: "$P = 1 - e^{-1} \\approx 0.632$",
        isCorrect: false,
        explanation: "שגוי: מסיח הנובע מאינטואיציה שגויה שנורה ישנה ״עייפה״ יותר ולכן סיכויה להישרף גבוה יותר."
      },
      {
        id: "prob-q19-opt3",
        plainText: "$P = \\frac{1}{3}$",
        isCorrect: false,
        explanation: "שגוי: $1/3$ הוא הסיכוי של נורה ספציפית להיות הראשונה להישרף מתוך 3 נורות חדשות, אך כאן מדובר בתחרות בין 2 נורות בלבד."
      },
      {
        id: "prob-q19-opt4",
        plainText: "$P = \\frac{1}{2}$",
        mathText: "P(T_1 < T_2 \\mid T_2 > 1) = \\frac{1}{2}",
        isCorrect: true,
        explanation: "נכון: לפי תכונת חוסר הזיכרון של ההתפלגות המעריכית, אורך החיים הנותר של נורה 2 מעבר לשנה שכבר פעלה מתפלג שוב בדיוק $\\operatorname{Exp}(\\lambda=1)$, כאילו הותקנה כעת מחדש. לכן שני המשתנים בעלי התפלגות זהה ובלתי תלויים, והסיכוי של כל אחת מהן להישרף ראשונה הוא בדיוק חצי: $P(T_1 < T_2) = \\frac{\\lambda}{\\lambda + \\lambda} = 1/2$."
      }
    ]
  },
  {
    id: "prob-q20-hypothesis-power-and-type-ii-error",
    domain: "עוצמת מבחן וטעות מסוג שני",
    title: "הסתברות וסטטיסטיקה - עוצמת מבחן וטעות מסוג שני",
    context: "בבדיקת השערות על תוחלת אורך חיים של נורות: $H_0: \\mu = 1250$ מול $H_1: \\mu < 1250$ עם סטיית תקן ידועה $\\sigma = 60$ ומדגם של $n=49$ נורות. ברמת מובהקות $\\alpha = 0.05$, אזור הדחייה נקבע עבור $\\bar{X} < 1235.9$.",
    formulaLatex: "\\beta = P_{H_1}(\\bar{X} \\ge 1235.9 \\mid \\mu = 1230), \\quad \\sigma_{\\bar{X}} = \\frac{60}{7} \\approx 8.571",
    instruction: "מהי ההסתברות $\\beta$ לטעות מסוג שני אם תוחלת החיים האמיתית בפועל היא $\\mu_1 = 1230$?",
    options: [
      {
        id: "prob-q20-opt1",
        plainText: "$\\beta = 0.0500$",
        isCorrect: false,
        explanation: "שגוי: זוהי רמת המובהקות $\\alpha$ (ההסתברות לטעות מסוג ראשון) ולא טעות מסוג שני."
      },
      {
        id: "prob-q20-opt2",
        plainText: "$\\beta = 0.7549$",
        isCorrect: false,
        explanation: "שגוי: $0.7549$ היא עוצמת המבחן $\\pi = 1 - \\beta$ (ההסתברות לדחות את $H_0$ בצדק כאשר $\\mu=1230$), ולא ההסתברות לטעות."
      },
      {
        id: "prob-q20-opt3",
        plainText: "$\\beta = 0.0668$",
        isCorrect: false,
        explanation: "שגוי: תוצאה המבלבלת עם ערך $\\alpha$ בשאלת התרעה קודמת."
      },
      {
        id: "prob-q20-opt4",
        plainText: "$\\beta = 0.2451$",
        mathText: "\\beta = 1 - \\Phi(0.69) = 0.2451",
        isCorrect: true,
        explanation: "נכון: תחת האלטרנטיבה $\\mu_1 = 1230$, ממוצע המדגם מתפלג $\\bar{X} \\sim N(1230, (60/7)^2)$. טעות מסוג שני היא קבלת $H_0$ כשהיא שגויה: $\\beta = P(\\bar{X} \\ge 1235.9) = P\\left(Z \\ge \\frac{1235.9 - 1230}{60/7}\\right) = P(Z \\ge 0.69) = 1 - \\Phi(0.69) = 1 - 0.7549 = 0.2451$."
      }
    ]
  }
];

export const ACADEMIC_PROB_QUESTIONS = PROBABILITY_STATISTICS_QUESTIONS;

export function sampleProbabilityStatisticsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = PROBABILITY_STATISTICS_QUESTIONS.slice(0, 7);
  const groupB = PROBABILITY_STATISTICS_QUESTIONS.slice(7, 14);
  const groupC = PROBABILITY_STATISTICS_QUESTIONS.slice(14, 20);
  if (!groupA.length || !groupB.length || !groupC.length) return [];
  const pickedA = groupA[Math.floor(Math.random() * groupA.length)];
  const pickedB = groupB[Math.floor(Math.random() * groupB.length)];
  const pickedC = groupC[Math.floor(Math.random() * groupC.length)];
  const sampled = [pickedA, pickedB, pickedC].filter((q): q is AcademicDiagnosticQuestion => Boolean(q));
  if (sampled.length !== 3) return [];
  for (let i = sampled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sampled[i], sampled[j]] = [sampled[j], sampled[i]];
  }
  return sampled;
}
