import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Deep Learning diagnostic bank (12Q).
 * Display name: "למידה עמוקה" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const DEEP_LEARNING_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "dl-q01-scaled-dot-product-attention-scale-factor",
    domain: "מנגנון תשומת לב ופקטור הנירמול",
    title: "למידה עמוקה - מנגנון תשומת לב (Attention) ופקטור הנירמול $\\sqrt{d_k}$",
    context:
      "במנגנון ה-Scaled Dot-Product Attention של מודלי Transformer, מחושבת המטריצה: $\\operatorname{Attention}(Q, K, V) = \\operatorname{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$, כאשר ממדי הווקטורים של ה-Query וה-Key הם $d_k$.",
    formulaLatex:
      "q_i, k_j \\stackrel{i.i.d.}{\\sim} \\mathcal{N}(0, 1) \\implies q_i \\cdot k_j = \\sum_{m=1}^{d_k} q_{im} k_{jm}",
    instruction:
      "מדוע קריטי לחלק בפקטור $\\sqrt{d_k}$ לפני הפעלת פונקציית ה-Softmax, במיוחד עבור ממדים גבוהים ($d_k \\ge 64$)?",
    options: [
      {
        id: "dl-q01-opt1",
        plainText:
          "המכפלה הסקלרית $q \\cdot k$ היא סכום של $d_k$ איברים בלתי-תלויים בעלי תוחלת 0 ושונות 1, ולכן שונות המכפלה גדלה ליניארית ל-$d_k$ וסטיית התקן שלה היא $\\sqrt{d_k}$; ללא חלוקה זו, עבור $d_k$ גדול הערכים מתבדרים, פונקציית ה-Softmax נדחפת לאזורי רוויה חריפים עם ערכי הסתברות קרובים ל-1 ו-0, והגרדיאנטים נעלמים (Vanishing Gradients) בעת ה-Backpropagation.",
        isCorrect: true,
        explanation:
          "נכון: אם רכיבי $q$ ו-$k$ הם משתנים אקראיים עם ממוצע 0 ושונות 1, המכפלה של כל רכיב $q_m k_m$ היא בעלת תוחלת 0 ושונות 1. סכום של $d_k$ איברים כאלו מניב משתנה בעל שונות $d_k$ וסטיית תקן $\\sqrt{d_k}$. עבור ממדים סטנדרטיים (כגון $d_k = 64$ או $128$), המכפלות מקבלות ערכים מספריים גדולים מאוד (למשל עשרות). פונקציית ה-Softmax על ערכים בעלי פערים גדולים מתנהגת כפונקציית $\\operatorname{argmax}$ חדה (One-hot distribution), שבה כל המשקל מועבר לאיבר הבודד והשאר אפסים. באזורים אלו נגזרת ה-Softmax שואפת לאפס, מה שמשתק לחלוטין את זרימת הגרדיאנטים ומפסיק את למידת המודל. חלוקה ב-$\\sqrt{d_k}$ מנרמלת את השונות חזרה ל-1 ושומרת על גרדיאנט בריא.",
      },
      {
        id: "dl-q01-opt2",
        plainText:
          "החלוקה ב-$\\sqrt{d_k}$ מבטלת את הצורך במשקלי ה-Value ($V$) והופכת את המטריצה לאוניטרית.",
        isCorrect: false,
        explanation:
          "שגוי: מטריצת $V$ נשארת פעילה לחלוטין ומייצגת את המידע הנשלף; החלוקה עוסקת ביציבות נומרית של ה-Softmax בלבד.",
      },
      {
        id: "dl-q01-opt3",
        plainText: "הפקטור מוודא שמטריצת הקשב תהיה סימטרית ($A = A^T$) בכל איטרציה.",
        isCorrect: false,
        explanation:
          "שגוי: מטריצת הקשב אינה סימטרית בדרך כלל (תשומת לב של מילה A למילה B שונה מתשומת הלב של B ל-A).",
      },
      {
        id: "dl-q01-opt4",
        plainText: "החלוקה מקטינה את זמן החישוב של כפל המטריצות מ-$O(N^2)$ ל-$O(N\\log N)$.",
        isCorrect: false,
        explanation:
          "שגוי: חלוקה בסקלר היא פעולה ב-$O(N^2)$ ואינה משנה את סיבוכיות כפל המטריצות הריבועית.",
      },
    ],
  },
  {
    id: "dl-q02-batch-normalization-train-vs-eval",
    domain: "נרמול אצווה: אימון מול הסקה",
    title: "למידה עמוקה - שכבת נרמול אצווה (Batch Normalization): אימון מול הסקה",
    context:
      "שכבת Batch Normalization (BN) מנרמלת את הקלטים בתוך מיני-אצווה (Mini-Batch) של $m$ דוגמאות: $\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$, ולאחר מכן מפעילה פרמטרים נלמדים: $y_i = \\gamma \\hat{x}_i + \\beta$.",
    formulaLatex:
      "\\mu_B = \\frac{1}{m}\\sum_{i=1}^m x_i, \\quad \\sigma_B^2 = \\frac{1}{m}\\sum_{i=1}^m (x_i - \\mu_B)^2, \\quad \\mu_{run} = (1 - \\alpha)\\mu_{run} + \\alpha \\mu_B",
    instruction:
      "כיצד פועלת שכבת ה-Batch Normalization בזמן אימון (Training) בהשוואה לזמן בדיקה/הסקה (Inference/Evaluation)?",
    options: [
      {
        id: "dl-q02-opt1",
        plainText:
          "באימון, הממוצע והשונות מחושבים ישירות מתוך המיני-אצווה הנוכחית (ומשמשים גם לעדכון ממוצע נע של המדגם הכולל); בזמן הסקה, השימוש בסטטיסטיקת המיני-אצווה נפסק לחלוטין, ובמקומם משתמשים בממוצע ובשונות הנעים הגלובליים שנאגרו באימון ($\\mu_{run}, \\sigma_{run}^2$) כפרמטרים קבועים, מה שמבטיח פלט דטרמיניסטי לדוגמה בודדת.",
        isCorrect: true,
        explanation:
          "נכון: בזמן אימון, ה-BN משתמשת בסטטיסטיקה של ה-Batch הספציפי ($\\mu_B, \\sigma_B^2$), מה שמייצר תופעת לוואי מועילה של רעש רגולריזציה קל (דוגמאות תלויות זו בזו בתוך האצווה). במקביל, השכבה מחשבת ממוצע נע מעריכי (Exponential Moving Average) של הממוצעים והשונויות לרוחב כל האיטרציות. בזמן בדיקה/הסקה, המודל עשוי לקבל דוגמה בודדת ($m=1$) שעבורה לא ניתן לחשב שונות; לכן מקפיאים את השכבה ומשתמשים בסטטיסטיקה הגלובלית שנצברה (Running Mean & Variance). הפעולה הופכת להעתקה ליניארית קבועה: $y = \\frac{\\gamma}{\\sqrt{\\sigma_{run}^2+\\epsilon}} x + (\\beta - \\frac{\\gamma \\mu_{run}}{\\sqrt{\\sigma_{run}^2+\\epsilon}})$, הניתנת למיזוג (Fusion) ישיר לתוך משקלי שכבת ה-Conv הקודמת להאצת מהירות הריצה.",
      },
      {
        id: "dl-q02-opt2",
        plainText: "בזמן הסקה מחשבים את הממוצע והשונות מחדש על כל קבוצת המבחן יחד לפני חיזוי.",
        isCorrect: false,
        explanation:
          "שגוי: בהסקה המודל אמור לפעול בזמן-אמת על דוגמאות בודדות המגיעות ברצף, ללא תלות בדוגמאות מבחן אחרות.",
      },
      {
        id: "dl-q02-opt3",
        plainText: "הפרמטרים הנלמדים $\\gamma$ ו-$\\beta$ מתאפסים בזמן הסקה כדי לאפשר חיזוי אובייקטיבי.",
        isCorrect: false,
        explanation:
          "שגוי: $\\gamma$ ו-$\\beta$ הם משקלים נלמדים חיוניים המשחזרים את כושר הביטוי של הרשת (יכולת להחזיר שונות וממוצע נדרשים).",
      },
      {
        id: "dl-q02-opt4",
        plainText: "שכבת BN אינה פעילה כלל בזמן אימון ומופעלת אך ורק בזמן הסקה לצורך חיסכון בחשמל.",
        isCorrect: false,
        explanation:
          "שגוי: BN הומצאה במקור כדי לייצב ולהאיץ את תהליך האימון ולהפחית את תופעת ה-Internal Covariate Shift.",
      },
    ],
  },
  {
    id: "dl-q03-cnn-effective-receptive-field-growth",
    domain: "שדה קליטה אפקטיבי ברשתות קונבולוציה",
    title:
      "למידה עמוקה - רשתות קונבולוציה (CNN) וחישוב שדה קליטה אפקטיבי (Receptive Field)",
    context:
      "ברשת קונבולוציה עמוקה, שדה הקליטה של נוירון בשכבה $l$ מוגדר כאזור בתמונת הקלט המקורית המשפיע על ערכו של אותו נוירון.",
    formulaLatex: "RF_{l} = RF_{l-1} + (k_l - 1) \\times S_{l-1}, \\quad S_{l-1} = \\prod_{i=1}^{l-1} s_i",
    instruction:
      "ברשת המורכבת משכבת כניסה ולאחריה שרשור של 3 שכבות קונבולוציה עם גרעין בגודל $k = 3 \\times 3$ ופסיעה (Stride) של $s = 1$ ללא שכבות Pooling, מהו שדה הקליטה הסופי ($RF_3$) של נוירון בשכבה השלישית, ומה היה גודלו אם היינו משתמשים בשכבות Dilated Convolution עם פקטורי התרחבות $d = 1, 2, 4$ בהתאמה?",
    options: [
      {
        id: "dl-q03-opt1",
        plainText:
          "בקונבולוציה רגילה שדה הקליטה גדל ליניארית ל-$7 \\times 7$; עם Dilated Convolutions שדה הקליטה מזנק אקספוננציאלית ל-$15 \\times 15$ ללא תוספת פרמטרים או פגיעה ברזולוציה.",
        mathText: "RF_{\\text{standard}} = 1 + 3 \\times (3 - 1) = 7, \\quad RF_{\\text{dilated}} = 1 + 2 \\times (1 + 2 + 4) = 15",
        isCorrect: true,
        explanation:
          "נכון: 1. ברשת רגילה עם $k=3, s=1$: כל שכבה מוסיפה $k-1 = 2$ פיקסלים לשדה הקליטה: שכבה 1 היא $3 \\times 3$, שכבה 2 היא $3 + 2 = 5 \\times 5$, ושכבה 3 היא $5 + 2 = 7 \\times 7$. 2. בקונבולוציה מורחבת (Dilated / Atrous Conv), גודל הגרעין האפקטיבי הוא $k' = k + (k-1)(d-1) = 1 + d(k-1)$. עבור $k=3$: בשכבה 1 ($d=1$) התוספת היא $2 \\times 1 = 2$ ($RF_1 = 3$). בשכבה 2 ($d=2$) התוספת היא $2 \\times 2 = 4$ ($RF_2 = 3 + 4 = 7$). בשכבה 3 ($d=4$) התוספת היא $2 \\times 4 = 8$ ($RF_3 = 7 + 8 = 15$). שדה הקליטה מגיע ל-$15 \\times 15$ באותו מספר משקלים בדיוק (9 משקלים לשכבה), עיקרון יסוד ברשתות סגמנטציה ו-WaveNet.",
      },
      {
        id: "dl-q03-opt2",
        plainText: "בקונבולוציה רגילה שדה הקליטה הוא $3 \\times 3$, ואינו משתנה עם העומק עקב חוק שימור הרזולוציה.",
        isCorrect: false,
        explanation: "שגוי: שדה הקליטה מתרחב בהכרח עם כל שכבה נוספת ברשת.",
      },
      {
        id: "dl-q03-opt3",
        plainText: "בקונבולוציה מורחבת שדה הקליטה קטן פי 4 משום שמוחדרים אפסים בין המשקלים.",
        isCorrect: false,
        explanation:
          "שגוי: החדרת חורים (Dilation) מרחיבה את טווח הדגימה במרחב ומגדילה את שדה הקליטה ולא מקטינה אותו.",
      },
      {
        id: "dl-q03-opt4",
        plainText: "בשני המקרים שדה הקליטה שווה בדיוק ל-$9 \\times 9$ כמכפלת ממדי הגרעין.",
        isCorrect: false,
        explanation:
          "שגוי: החישוב אינו מכפלה פשוטה של גדלי הגרעין אלא סכימת ההיסטים לפי נוסחת הרקורסיה של שדה הקליטה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "dl-q04-adam-optimizer-bias-correction",
    domain: "אלגוריתם Adam ותיקון הטיה",
    title: "למידה עמוקה - אלגוריתם אופטימיזציה Adam ותיקון הטיה (Bias Correction)",
    context:
      "אלגוריתם Adam משלב תנע (Momentum) עם קצב למידה אדפטיבי (RMSprop) תוך שמירת ממוצעים נעים מעריכיים של הגרדיאנט והגרדיאנט בריבוע: $m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t$ ו-$v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2$, כאשר $m_0 = v_0 = 0$.",
    formulaLatex:
      "\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}, \\quad \\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t",
    instruction: "מדוע חיוני לבצע תיקון הטיה (חלוקה ב-$1 - \\beta^t$) באיטרציות הראשונות של האימון?",
    options: [
      {
        id: "dl-q04-opt1",
        plainText: "כדי למנוע מהגרדיאנטים להתבדר לאינסוף באיטרציה הראשונה עקב חלוקה באפס.",
        isCorrect: false,
        explanation:
          "שגוי: האיבר $\\epsilon$ במכנה מונע חלוקה באפס; תיקון ההטיה נועד לטפל בהטיה כלפי מטה ולא בהתבדרות לאינסוף.",
      },
      {
        id: "dl-q04-opt2",
        plainText:
          "מאחר ש-$m_0$ ו-$v_0$ מאותחלים באפס, הממוצעים הנעים סובלים מהטיה כבדה כלפי אפס בשלבים הראשונים (במיוחד כאשר $\\beta_1 = 0.9, \\beta_2 = 0.999$), ותיקון ההטיה מבטיח שהאומדנים יהיו חסרי הטיה לתוחלת האמיתית של הגרדיאנט וריבועו.",
        mathText: "\\mathbb{E}[m_t] = \\mathbb{E}[g] (1 - \\beta_1^t) \\implies \\mathbb{E}[\\hat{m}_t] = \\mathbb{E}[g]",
        isCorrect: true,
        explanation:
          "נכון: נפתח את נוסחת הנסיגה מ-$m_0 = 0$: $m_t = (1 - \\beta_1)\\sum_{i=1}^t \\beta_1^{t-i} g_i$. אם נניח שהגרדיאנט מגיע מהתפלגות יציבה עם תוחלת $\\mathbb{E}[g]$: $\\mathbb{E}[m_t] = \\mathbb{E}[g] (1 - \\beta_1)\\sum_{i=1}^t \\beta_1^{t-i} = \\mathbb{E}[g] (1 - \\beta_1) \\frac{1 - \\beta_1^t}{1 - \\beta_1} = \\mathbb{E}[g] (1 - \\beta_1^t)$. מאחר ש-$\\beta_1 = 0.9$ ו-$\\beta_2 = 0.999$, עבור $t=1$: $1 - \\beta_2^1 = 0.001$, ולכן ללא תיקון $v_1$ יהיה קטן פי 1000 מערכו האמיתי! חלוקה ב-$1 - \\beta^t$ מבטלת את ההטיה הנובעת מאתחול באפס ומנרמלת את האומדן להיות חסר הטיה (כאשר $t \\to \\infty$, מתקיים $\\beta^t \\to 0$ והתיקון דועך ל-1 באופן טבעי).",
      },
      {
        id: "dl-q04-opt3",
        plainText: "התיקון מבטל את הצורך בקצב למידה $\\eta$ והופך את האופטימיזציה ללא-פרמטרית.",
        isCorrect: false,
        explanation: "שגוי: קצב הלמידה $\\eta$ נשאר היפר-פרמטר קריטי ביותר ב-Adam.",
      },
      {
        id: "dl-q04-opt4",
        plainText: "התיקון מאלץ את מטריצת המשקלים להישאר חיובית מוגדרת בכל צעד.",
        isCorrect: false,
        explanation: "שגוי: עדכון המשקלים מתבצע פר-קואורדינטה ואינו כולל בדיקות חיוביות מטריציוניות.",
      },
    ],
  },
  {
    id: "dl-q05-resnet-identity-shortcut-gradient-highway",
    domain: "רשתות שאריתיות וחיבורי קיצור",
    title: "למידה עמוקה - רשתות שאריתיות (ResNet) וחיבורי קיצור (Skip Connections)",
    context:
      "רשתות עמוקות מאוד סובלות מבעיית הדגרדציה (Degradation Problem): הוספת שכבות מעלה את שגיאת האימון ולא רק את שגיאת המבחן. ארכיטקטורת ResNet פותרת זאת באמצעות חיבורי קיצור זהות (Identity Shortcuts): $\\mathbf{x}_{l+1} = \\mathbf{x}_l + \\mathcal{F}(\\mathbf{x}_l, \\mathcal{W}_l)$.",
    formulaLatex:
      "\\frac{\\partial \\mathcal{E}}{\\partial \\mathbf{x}_l} = \\frac{\\partial \\mathcal{E}}{\\partial \\mathbf{x}_L} \\frac{\\partial \\mathbf{x}_L}{\\partial \\mathbf{x}_l} = \\frac{\\partial \\mathcal{E}}{\\partial \\mathbf{x}_L} \\left( \\mathbf{I} + \\frac{\\partial}{\\partial \\mathbf{x}_l} \\sum_{i=l}^{L-1} \\mathcal{F}_i \\right)",
    instruction: "כיצד מאפשר מבנה מתמטי זה לאמן רשתות בעלות מאות ואלפי שכבות ללא היעלמות גרדיאנטים?",
    options: [
      {
        id: "dl-q05-opt1",
        plainText:
          "חיבור הקיצור מבטל את הצורך בפונקציות שפעול לא-ליניאריות והופך את כל הרשת למערכת ליניארית.",
        isCorrect: false,
        explanation:
          "שגוי: בתוך הבלוק $\\mathcal{F}$ קיימות שכבות לא-ליניאריות ו-ReLU; ללא אי-ליניאריות הרשת תתנוון למטריצה בודדת.",
      },
      {
        id: "dl-q05-opt2",
        plainText:
          "איבר היחידה $\\mathbf{I}$ בנוסחת הנגזרת מייצר \"אוטוסטרדת גרדיאנטים\" (Gradient Highway), המאפשרת לגרדיאנט משכבת המוצא $L$ לזרום ישירות לכל שכבה מוקדמת $l$ ללא מעבר דרך מכפלות מטריצות משקל, גם אם הנגזרות של הבלוקים $\\mathcal{F}$ דועכות לאפס.",
        isCorrect: true,
        explanation:
          "נכון: בפיתוח רקורסיבי: $\\mathbf{x}_L = \\mathbf{x}_l + \\sum_{i=l}^{L-1} \\mathcal{F}_i$. כאשר גוזרים את פונקציית ההפסד לפי $\\mathbf{x}_l$, כלל השרשרת נותן: $\\frac{\\partial \\mathcal{E}}{\\partial \\mathbf{x}_l} = \\frac{\\partial \\mathcal{E}}{\\partial \\mathbf{x}_L} (\\mathbf{I} + \\frac{\\partial}{\\partial \\mathbf{x}_l}\\sum \\mathcal{F}_i)$. הביטוי מכיל איבר חיבורי ישיר $\\frac{\\partial \\mathcal{E}}{\\partial \\mathbf{x}_L} \\cdot \\mathbf{I}$. גם אם כל המשקלים בתוך הבלוקים קטנים מאוד או שהנגזרות שלהם קורסות, הגרדיאנט לעולם אינו נעלם משום שהוא עובר ללא ניחות ישירות דרך חיבור הזהות לכל שכבה קודמת. יתרה מכך, הרשת יכולה ללמוד בקלות פונקציית זהות ע״י איפוס המשקלים של $\\mathcal{F} \\to 0$.",
      },
      {
        id: "dl-q05-opt3",
        plainText: "חיבורי הקיצור מקטינים את מספר הפרמטרים של הרשת בחצי ומאיצים את פעולת ה-Forward.",
        isCorrect: false,
        explanation:
          "שגוי: חיבורי קיצור זהות אינם מוסיפים ואינם מחסירים פרמטרים נלמדים (הם פעולת חיבור אלמנט-אלמנט פשוטה).",
      },
      {
        id: "dl-q05-opt4",
        plainText: "החיבור השאריתי גורם לכל שכבה ללמוד את פונקציית הקירוב של טיילור במקום את פונקציית המטרה.",
        isCorrect: false,
        explanation: "שגוי: השכבה לומדת שארית (Residual mapping $\\mathcal{H}(x) - x$), ואינה מוגבלת לקירוב טיילור.",
      },
    ],
  },
  {
    id: "dl-q06-layer-norm-vs-batch-norm-transformers",
    domain: "נרמול שכבה מול נרמול אצווה ב-Transformer",
    title:
      "למידה עמוקה - נרמול שכבה (Layer Normalization) מול Batch Normalization בארכיטקטורת Transformer",
    context:
      "במודלי עיבוד שפה טבעית (NLP) ו-Transformers, שכבת הנרמול המועדפת היא Layer Normalization (LN) במקום Batch Normalization (BN).",
    formulaLatex:
      "\\text{BN: Normalize across Batch } (N), \\quad \\text{LN: Normalize across Features } (C, H, W \\text{ or } d_{model})",
    instruction:
      "מדוע Layer Normalization מתאימה ועדיפה בהרבה עבור מודלי שפה ורצפים דינמיים בהשוואה ל-Batch Normalization?",
    options: [
      {
        id: "dl-q06-opt1",
        plainText: "משום ש-LN דורשת זיכרון GPU כפול ומאיצה את פעולת ה-Softmax פי 4.",
        isCorrect: false,
        explanation: "שגוי: LN אינה דורשת זיכרון כפול ואינה קשורה ישירות לפעולת ה-Softmax.",
      },
      {
        id: "dl-q06-opt2",
        plainText:
          "LN מחשבת ממוצע ושונות לרוחב ממד התכונות/ההטמעה (Hidden Dimension) עבור כל דוגמה וכל מילה ברצף באופן עצמאי לחלוטין; היא אינה תלויה בדוגמאות אחרות באצווה (מתפקדת מעולה עם $Batch=1$) ופועלת בצורה אחידה ללא תלות באורך הרצף המשתנה (Variable Sequence Length).",
        isCorrect: true,
        explanation:
          "נכון: 1. BN מנרמלת לאורך ציר ה-Batch. בטקסטים וברצפים, משפטים מגיעים באורכים שונים (דרוש ריפוד באפסים - Padding). חישוב ממוצע Batch עבור מילים במיקומים שונים הוא בעייתי, ובפרט עבור מילים בקצה הרצף שבו רוב המשפטים כבר הסתיימו. 2. BN נכשלת לחלוטין כאשר גודל ה-Batch קטן מאוד (למשל באימון מודלי שפה ענקיים עם מודל מקבילי שבו $Batch=1$ או $2$ לכל GPU). 3. LN מנרמלת את כל התכונות של טוקן בודד מתוך עצמן: $\\mu_i = \\frac{1}{d}\\sum_{j=1}^d x_{ij}$. הסטטיסטיקה מחושבת עצמאית לכל מילה ולכל דוגמה ללא שום תלות בגודל ה-Batch או במילים שכנות, ופועלת בדיוק באותו אופן הן באימון והן בהסקה מקבילית או אוטו-רגרסיבית.",
      },
      {
        id: "dl-q06-opt3",
        plainText: "משום ש-BN מייצרת ערכים מדומים בלתי-אפשריים כאשר מפעילים אותה על טקסט באנגלית.",
        isCorrect: false,
        explanation:
          "שגוי: כל החישובים מבוצעים במספרים ממשיים ($float32/bfloat16$) ואינם מייצרים ערכים מדומים.",
      },
      {
        id: "dl-q06-opt4",
        plainText: "משום ש-LN מבטלת לחלוטין את הצורך במטריצות משקל בשכבות ה-Feed-Forward.",
        isCorrect: false,
        explanation:
          "שגוי: שכבות ה-FFN נשארות רכיב הליבה של ה-Transformer המכיל את רוב הפרמטרים של המודל.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "dl-q07-dropout-inverted-scaling-ensemble",
    domain: "רגולריזציית Dropout ו-Inverted Dropout",
    title: "למידה עמוקה - רגולריזציית Dropout ו-Inverted Dropout",
    context:
      "במהלך אימון רשת נוירונים עם שכבת Dropout בעלת הסתברות שימור $p$ (והסתברות השמטה $1 - p$), כל נוירון מוכפל במשתנה ברנולי $r_i \\sim \\operatorname{Bernoulli}(p)$.",
    formulaLatex:
      "\\text{Training (Inverted Dropout): } y = \\frac{1}{p} (r \\odot x), \\quad \\text{Inference: } y = x",
    instruction:
      "מדוע במימוש המודרני (Inverted Dropout) מחלקים בפקטור $p$ כבר בזמן האימון, וכיצד פועלת השכבה בזמן בדיקה/הסקה?",
    options: [
      {
        id: "dl-q07-opt1",
        plainText: "החלוקה ב-$p$ מגדילה את זמן הריצה פי שניים כדי לאמן רשת מקבילית.",
        isCorrect: false,
        explanation: "שגוי: חלוקה בסקלר היא פעולת אלמנט-אלמנט זניחה מבחינת זמן ריצה.",
      },
      {
        id: "dl-q07-opt2",
        plainText: "בזמן בדיקה ממשיכים להפיל נוירונים באותה הסתברות כדי לשמור על אקראיות.",
        isCorrect: false,
        explanation: "שגוי: בזמן בדיקה חובה לספק תחזית דטרמיניסטית עקבית, ולכן אסור להפיל נוירונים אקראית.",
      },
      {
        id: "dl-q07-opt3",
        plainText:
          "החלוקה ב-$p$ בזמן אימון (Scaling) שומרת על התוחלת של האות ($\\mathbb{E}[y] = \\mathbb{E}[\\frac{r}{p} x] = x$), ומאפשרת להשאיר את המודל ללא שום שינוי וללא שום חישוב נוסף בזמן בדיקה ($y = x$), מה שחוסך תקורת זמן בהסקה.",
        isCorrect: true,
        explanation:
          "נכון: ב-Dropout מקורי של Srivastava, בזמן אימון השאירו את הנוירונים הפעילים כמו שהם ($y = r \\odot x$), ולכן תוחלת הפלט ירדה ל-$p x$. בזמן בדיקה נדרש היה לכפול את כל משקלי הרשת בפקטור $p$ ($W_{test} = p W$) כדי להתאים את עוצמת האות. Inverted Dropout מיישם את הנרמול מראש בזמן האימון: ע״י חלוקה ב-$p$ על הדגימות הפעילות ($y = \\frac{1}{p} r \\odot x$), התוחלת נשמרת זהה לחלוטין לאות המקורי: $\\mathbb{E}[y] = \\frac{1}{p} \\mathbb{E}[r] x = \\frac{p}{p} x = x$. כתוצאה מכך, בזמן בדיקה והפצה לשרתי ייצור (Inference), שכבת ה-Dropout מתנוונת למעקף זהות פשוט ($y = x$) ללא צורך בשום שינוי משקלים או פעולות מתמטיות נוספות.",
      },
      {
        id: "dl-q07-opt4",
        plainText: "Dropout גורם לכל המשקלים להתכנס לערך 0 ומבטל את תופעת ה-Sparsity.",
        isCorrect: false,
        explanation:
          "שגוי: Dropout מונע Co-adaptation (הסתמכות הדדית של נוירונים זה על זה) ומשמש כאלטרנטיבה לאנסמבל ענק של רשתות.",
      },
    ],
  },
  {
    id: "dl-q08-transformer-quadratic-complexity-bottleneck",
    domain: "סיבוכיות Self-Attention",
    title: "למידה עמוקה - סיבוכיות מנגנון Self-Attention ואתגר אורך ההקשר",
    context:
      "במנגנון ה-Standard Full Self-Attention, מחושבת מכפלת המטריצות $Q K^T$ עבור רצף קלט באורך $N$ טוקנים (אורך ההקשר - Sequence Length) וממד הטמעה $d_{model}$.",
    formulaLatex:
      "Q, K, V \\in \\mathbb{R}^{N \\times d}, \\quad A = \\operatorname{softmax}\\left(\\frac{Q K^T}{\\sqrt{d}}\\right) \\in \\mathbb{R}^{N \\times N}, \\quad \\text{Output} = A V",
    instruction:
      "מהן סיבוכיות הזמן (חישוב FLOPS) וסיבוכיות המקום (זיכרון GPU ל-Activation Map) של חישוב מטריצת הקשב $A$ כפונקציה של אורך הרצף $N$ וממד המודל $d$?",
    options: [
      {
        id: "dl-q08-opt1",
        plainText: "זמן $O(N d)$, ומקום $O(d^2)$",
        isCorrect: false,
        explanation:
          "שגוי: סיבוכיות ליניארית ב-$N$ קיימת בארכיטקטורות RNN, State-Space Models (Mamba) או Linear Attention, אך לא ב-Self-Attention הסטנדרטי.",
      },
      {
        id: "dl-q08-opt2",
        plainText: "זמן $O(N \\log N)$, ומקום $O(N)$",
        isCorrect: false,
        explanation: "שגוי: חישוב מכפלת כל זוג טוקנים אפשרי דורש מטריצה מלאה מסדר $N \\times N$, ולא התכנסות לוגריתמית.",
      },
      {
        id: "dl-q08-opt3",
        plainText:
          "סיבוכיות הזמן היא ריבועית באורך הרצף $O(N^2 d)$, וסיבוכיות המקום של מטריצת הקשב היא ריבועית $O(N^2)$ (מה שמהווה את צוואר הבקבוק הראשי בהרחבת חלון ההקשר במודלי LLM).",
        mathText: "\\text{Time: } O(N^2 d), \\quad \\text{Space: } O(N^2)",
        isCorrect: true,
        explanation:
          "נכון: 1. חישוב המכפלה $Q K^T$: כפל מטריצה בגודל $N \\times d$ במטריצה משוחלפת $d \\times N$ דורש $N \\times N \\times d$ פעולות כפל וחיבור, כלומר סיבוכיות זמן של $O(N^2 d)$. 2. מטריצת התוצאה $A = \\operatorname{softmax}(QK^T / \\sqrt{d})$ היא בגודל $N \\times N$. שמירת משקלי הקשב בזיכרון ה-VRAM לצורך שלב ה-Backward דורשת $O(N^2)$ מקום עבור כל ראש קשב ובכל שכבה. כאשר מגדילים את אורך ההקשר מ-2,000 טוקנים ל-100,000 טוקנים, דרישת הזיכרון מזנקת פי $50^2 = 2500$! אלגוריתם FlashAttention פותר את בעיית הזיכרון ע״י חישוב Tiling ב-SRAM המהיר ללא מימוש מלא של מטריצת ה-$N \\times N$ ב-HBM, אך סיבוכיות ה-FLOPS הבסיסית נותרת $O(N^2 d)$.",
      },
      {
        id: "dl-q08-opt4",
        plainText: "סיבוכיות הזמן היא $O(d^3)$ ואינה תלויה כלל באורך הרצף $N$.",
        isCorrect: false,
        explanation: "שגוי: $N$ מופיע בריבוע ומכתיב את עיקר עומס החישוב ברצפים ארוכים.",
      },
    ],
  },
  {
    id: "dl-q09-weight-initialization-xavier-vs-kaiming-he",
    domain: "אתחול משקלים: Xavier מול He",
    title: "למידה עמוקה - אתחול משקלים: זאבייר (Xavier/Glorot) מול קיימינג (He/Kaiming)",
    context:
      "בנוירון בעל $n_{in}$ כניסות, הפלט הליניארי הוא $z = \\sum_{i=1}^{n_{in}} w_i x_i$. שונות הקלטים היא $\\operatorname{Var}(x)$. מאתחלים את המשקלים ממשתנה אקראי עם תוחלת 0 ושונות $\\operatorname{Var}(w) = \\sigma_w^2$.",
    formulaLatex:
      "\\text{Xavier: } \\sigma_w^2 = \\frac{2}{n_{in} + n_{out}}, \\quad \\text{He (Kaiming): } \\sigma_w^2 = \\frac{2}{n_{in}}",
    instruction:
      "מדוע אתחול Xavier (המתוכנן כ-$\\sigma_w^2 = 1/n_{in}$) נכשל ברשתות עמוקות המשתמשות בפונקציית שפעול מסוג ReLU, ומדוע אתחול He מכפיל את השונות פי 2?",
    options: [
      {
        id: "dl-q09-opt1",
        plainText: "משום ש-ReLU מכפילה את כל הערכים פי 2 ומחייבת חלוקה בשורש של 2.",
        isCorrect: false,
        explanation: "שגוי: ReLU שומרת על ערכי $x$ חיוביים כמות שהם ($f(x)=x$) ואינה מכפילה ב-2.",
      },
      {
        id: "dl-q09-opt2",
        plainText: "משום שאתחול He מיועד לשפות ללא תמיכה במספרים שליליים.",
        isCorrect: false,
        explanation: "שגוי: שניהם אלגוריתמים מתמטיים של התפלגות גאוסית סטנדרטית.",
      },
      {
        id: "dl-q09-opt3",
        plainText:
          "אתחול Xavier פותח תחת ההנחה של פונקציית שפעול ליניארית או סימטרית סביב האפס (כגון tanh); פונקציית $\\operatorname{ReLU}(z) = \\max(0, z)$ מאפסת בממוצע בדיוק מחצית מהנוירונים (עבור ערכים שליליים), מה שחוצה את שונות האות בחצי בכל שכבה; אתחול He מכפיל את שונות המשקלים פי 2 ($\\sigma_w^2 = 2/n_{in}$) כדי לפצות במדויק על אובדן מחצית האות ולשמור על שונות יציבה לכל עומק הרשת.",
        isCorrect: true,
        explanation:
          "נכון: פיתוח השונות עבור נוירון ליניארי מראה ש-$\\operatorname{Var}(z) = n_{in} \\operatorname{Var}(w) \\operatorname{Var}(x)$. ב-Xavier דרשו $\\operatorname{Var}(z) = \\operatorname{Var}(x)$, ולכן קבעו $\\operatorname{Var}(w) = 1/n_{in}$ (הנחה שתקפה ל-tanh עם נגזרת 1 באפס). אולם כאשר האות עובר דרך ReLU, כל החצי השלילי של ההתפלגות הסימטרית נחתך לאפס: $\\operatorname{Var}(\\operatorname{ReLU}(z)) = \\frac{1}{2} \\operatorname{Var}(z)$. בכל שכבה השונות של האקטיבציה נחתכת במחצית ($1/2$). ברשת של 50 שכבות, עוצמת האות והגרדיאנט דועכים בפקטור של $(1/2)^{50} \\approx 10^{-15}$ (היעלמות מוחלטת). Kaiming He תיקן זאת: הוא דרש $n_{in} \\cdot \\operatorname{Var}(w) \\cdot \\frac{1}{2} = 1 \\implies \\operatorname{Var}(w) = \\frac{2}{n_{in}}$. פקטור ה-2 מפצה בדיוק על הנוירונים הכבויים ומאפשר אימון חלק ויציב של רשתות עמוקות.",
      },
      {
        id: "dl-q09-opt4",
        plainText: "אתחול He מבטל את הצורך בפונקציית הפסד ומאמן את הרשת בסגנון Hebbian Learning.",
        isCorrect: false,
        explanation:
          "שגוי: אתחול משקלים הוא רק תנאי ההתחלה ברגע $t=0$; האימון מתבצע ב-SGD ו-Backpropagation כרגיל.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "dl-q10-label-smoothing-overconfidence-regularization",
    domain: "החלקת תוויות ומניעת ביטחון-יתר",
    title: "למידה עמוקה - החלקת תוויות (Label Smoothing) ומניעת ביטחון-יתר",
    context:
      "בסיווג רב-מחלקתי עם $K$ מחלקות ופונקציית Cross-Entropy, התוויות המקוריות מקודדות כ-One-Hot ($y_k = 1$ למחלקה הנכונה, ו-$0$ לאחרות). בטכניקת Label Smoothing עם מקדם $\\epsilon$, וקטור המטרה מוחלף ב-:",
    formulaLatex:
      "y_k^{LS} = (1 - \\epsilon) y_k + \\frac{\\epsilon}{K} = \\begin{cases} 1 - \\epsilon + \\frac{\\epsilon}{K} & k = y \\\\ \\frac{\\epsilon}{K} & k \\neq y \\end{cases}",
    instruction:
      "מדוע אימון עם תוויות One-Hot קשיחות דוחף את המשקלים לערכים אינסופיים (Overconfidence), וכיצד החלקת תוויות מונעת זאת?",
    options: [
      {
        id: "dl-q10-opt1",
        plainText: "החלקת תוויות ממירה את בעיית הסיווג לבעיית רגרסיה ריבועית פשוטה.",
        isCorrect: false,
        explanation: "שגוי: המודל נשאר מסווג קטגוריאלי עם פונקציית הפסד Cross-Entropy לכל דבר.",
      },
      {
        id: "dl-q10-opt2",
        plainText: "תוויות One-Hot גורמות לקריסת המודל עקב חלוקה באפס בחישוב ה-Logits.",
        isCorrect: false,
        explanation: "שגוי: ה-Logits מחושבים ככפל מטריצות רגיל ללא חלוקה.",
      },
      {
        id: "dl-q10-opt3",
        plainText: "החלקת תוויות משמשת רק להאצת זמן האימון על מעבדי TPU ייעודיים.",
        isCorrect: false,
        explanation: "שגוי: זהו מנגנון רגולריזציה תאורטי לשיפור איכות המודל וכיול ההסתברויות, ואינו האצת חומרה.",
      },
      {
        id: "dl-q10-opt4",
        plainText:
          "פונקציית ה-Softmax מסוגלת להפיק הסתברות מדויקת של $p_k = 1$ אך ורק כאשר פער ה-Logits שואף לאינסוף ($z_k - z_j \\to \\infty$); עקב כך, מזעור Cross-Entropy עם תוויות One-Hot מאלץ את הרשת להגדיל את נורמת המשקלים ללא חסם ולהפוך לבטוחה בעצמה יתר על המידה (Overconfident); החלקת תוויות דורשת הסתברות סופית ($1 - \\epsilon$) ומונעת התנפחות משקלים.",
        isCorrect: true,
        explanation:
          "נכון: לפי הגדרת ה-Softmax: $p_k = \\frac{e^{z_k}}{\\sum e^{z_j}}$. כדי ש-$p_k = 1.0$ במדויק וכל שאר ההסתברויות יהיו $0$, נדרש שה-Logit של המחלקה הנכונה יהיה אינסופי ביחס לאחרות ($z_k \\to +\\infty$). לכן, ה-Cross-Entropy ממשיך לדחוף את משקלי השכבה האחרונה לגדול עוד ועוד כדי להגדיל את הפער. הדבר גורם למודל להיות Overconfident ובעל כיול הסתברויות לקוי (Poor Calibration) — הוא חוזה בביטחון של 99.99% גם על דוגמאות גבוליות, וסובל מ-Overfitting. בהחלקת תוויות (Label Smoothing), המטרה עבור המחלקה הנכונה היא ערך קטן מ-1 (למשל $0.9$), מה שמושג ע״י פער Logits סופי ובר-השגה. הדבר מונע התנפחות משקלים, משפר רגולריזציה וכושר הכללה, ומכייל את הסתברויות המודל.",
      },
    ],
  },
  {
    id: "dl-q11-wgan-wasserstein-earth-mover-lipschitz",
    domain: "רשתות יוצרות ומרחק וסרשטיין",
    title: "למידה עמוקה - רשתות יוצרות (GANs) ומרחק וסרשטיין (WGAN)",
    context:
      "במודל WGAN (Wasserstein GAN), מחליפים את דיברגנס JS במרחק וסרשטיין (Earth Mover's Distance - EMD). לפי דואליות קנטורוביץ׳-רובינשטיין:",
    formulaLatex:
      "W(P_r, P_g) = \\sup_{\\|D\\|_L \\le 1} \\mathbb{E}_{x \\sim P_r}[D(x)] - \\mathbb{E}_{y \\sim P_g}[D(y)]",
    instruction:
      "מדוע מרחק וסרשטיין עדיף באופן מכריע על פני דיברגנס JS באימון רשתות יוצרות, ואיזה אילוץ חובה להטיל על רשת המבקר (Critic)?",
    options: [
      {
        id: "dl-q11-opt1",
        plainText: "מרחק וסרשטיין מאפשר אימון ללא שימוש ב-Backpropagation ומבטל את הצורך בגנרטור.",
        isCorrect: false,
        explanation: "שגוי: WGAN מאומנת במלואה באמצעות שיפוע יורד ו-Backpropagation עם גנרטור ומבקר.",
      },
      {
        id: "dl-q11-opt2",
        plainText: "מרחק וסרשטיין מוגבל אך ורק לתמונות בשחור-לבן ואינו ישים לנתונים רציפים.",
        isCorrect: false,
        explanation: "שגוי: המרחק מוגדר מעל כל מרחב הסתברות מטרי כללי.",
      },
      {
        id: "dl-q11-opt3",
        plainText: "הרשת דורשת שהמבקר יפיק הסתברות בין 0 ל-1 באמצעות שכבת סיגמואיד בסיום.",
        isCorrect: false,
        explanation:
          "שגוי: ב-WGAN המבקר אינו מסווג הסתברותי (אין סיגמואיד במוצא), אלא פונקציית רגרסיה ליפשיצית המפיקה ערך ממשי.",
      },
      {
        id: "dl-q11-opt4",
        plainText:
          "כאשר תומכי ההתפלגויות של הנתונים האמיתיים והמיוצרים נמצאים על יריעות בממדים נמוכים ואינם חופפים, דיברגנס JS הוא קבוע בלתי-רציף ($\\ln 2$) והגרדיאנט שלו מתאפס; מרחק וסרשטיין רציף וגזיר בכל מקום ומספק גרדיאנט חלק ובעל משמעות, בתנאי שרשת המבקר מקיימת אילוץ 1-ליפשיץ (הממומש ע״י Weight Clipping או Gradient Penalty - WGAN-GP).",
        isCorrect: true,
        explanation:
          "נכון: ב-GAN קלאסי (Goodfellow), המרחק הנמדד הוא Jensen-Shannon Divergence. כאשר התפלגות הנתונים האמיתיים $P_r$ והתפלגות הגנרטור $P_g$ נתמכות על גבי יריעות דקות במרחב רב-ממדי (המצב הטיפוסי בתמונות), ההסתברות לחפיפה ביניהן בראשית האימון היא 0. במצב זה, $D_{JS}(P_r \\parallel P_g) = \\ln 2$ קבוע לחלוטין, והגרדיאנט לגנרטור מתאפס (איבוד גרדיאנט מוחלט / Vanishing Gradient). מרחק וסרשטיין מודד את העבודה המינימלית הנדרשת להסעת מסת ההסתברות ממקום למקום. גם אם אין חפיפה, המרחק יורד באופן חלק ככל שהיריעות מתקרבות זו לזו, ומספק גרדיאנט רציף ואיכותי. כדי שדואליות קנטורוביץ׳ תתקיים, חובה שרשת המבקר $D$ תהיה פונקציה 1-ליפשיצית ($\\|\\nabla_x D(x)\\| \\le 1$), תנאי שנאכף במודרני ע״י קנס על נורמת הגרדיאנט (Gradient Penalty: $(\\|\\nabla_{\\hat{x}} D\\| - 1)^2$).",
      },
    ],
  },
  {
    id: "dl-q12-transformers-sinusoidal-positional-encoding",
    domain: "קידוד מיקום סינוסואידלי",
    title: "למידה עמוקה - קידוד מיקום סינוסואידלי (Sinusoidal Positional Encoding) ב-Transformer",
    context:
      "במאמר \"Attention Is All You Need\", מאחר שמנגנון ה-Self-Attention הוא אינווריאנטי לתמורות (Permutation-Equivariant), מוסיפים לווקטורי הקלט קידוד מיקום סינוסואידלי קבוע:",
    formulaLatex:
      "PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d}}\\right), \\quad PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d}}\\right)",
    instruction:
      "מהו היתרון המתמטי של שימוש בפונקציות טריגונומטריות אלו, וכיצד הן מאפשרות למודל ללמוד קשרים יחסיים בין טוקנים?",
    options: [
      {
        id: "dl-q12-opt1",
        plainText: "הן הופכות את כל המילים ברצף לאורתוגונליות זו לזו במרחב הילברט.",
        isCorrect: false,
        explanation: "שגוי: הקידוד אינו מאפס את המכפלה הסקלרית בין מילים אלא מוסיף מידע על מרחק וסדר.",
      },
      {
        id: "dl-q12-opt2",
        plainText: "הן מבטלות את הצורך בחישוב מכפלת $Q K^T$ והופכות את הקשב לפונקציה סטטית.",
        isCorrect: false,
        explanation:
          "שגוי: הקידוד מתווסף לקלט לפני יצירת המטריצות $Q, K, V$, ומנגנון הקשב נשאר דינמי לחלוטין.",
      },
      {
        id: "dl-q12-opt3",
        plainText: "הן מגבילות את אורך המשפטים המקסימלי ל-10,000 מילים בדיוק.",
        isCorrect: false,
        explanation: "שגוי: 10,000 הוא בסיס התדרים בסקאלה, והפונקציות מוגדרות לכל $pos$ שלם מ-0 ועד אינסוף.",
      },
      {
        id: "dl-q12-opt4",
        plainText:
          "לכל היסט קבוע $k$, וקטור המיקום $PE_{pos+k}$ ניתן לייצוג כהעתקה ליניארית ישירה (טרנספורמציית סיבוב במטריצה קבועה התלויה ב-$k$ בלבד) של הווקטור $PE_{pos}$, מה שמאפשר למנגנון הקשב ללמוד ולזהות בקלות מרחקים יחסיים בין מילים ללא תלות במיקומן האבסולוטי, ותומך בהכללה לאורכי רצף ארוכים מאלו שנראו באימון.",
        isCorrect: true,
        explanation:
          "נכון: מזהויות טריגונומטריות של חיבור זוויות: $\\sin(\\omega(pos + k)) = \\sin(\\omega pos)\\cos(\\omega k) + \\cos(\\omega pos)\\sin(\\omega k)$, וכן $\\cos(\\omega(pos + k)) = \\cos(\\omega pos)\\cos(\\omega k) - \\sin(\\omega pos)\\sin(\\omega k)$. עבור כל זוג קואורדינטות $(2i, 2i+1)$, המעבר ממיקום $pos$ למיקום $pos+k$ הוא מכפלה במטריצת סיבוב אורתוגונלית דו-ממדית פשוטה: $\\begin{pmatrix} \\cos(\\omega_i k) & \\sin(\\omega_i k) \\\\ -\\sin(\\omega_i k) & \\cos(\\omega_i k) \\end{pmatrix}$. מכיוון שמטריצה זו תלויה בהיסט היחסי $k$ בלבד, מנגנון הקשב הליניארי ($Q K^T$) יכול ללמוד בקלות לשים לב לטוקן שנמצא \"3 מילים לפניו\" או \"5 מילים אחריו\" באמצעות טרנספורמציה ליניארית קבועה. בנוסף, בהיותה פונקציה רציפה חלקה ודטרמיניסטית, היא מסוגלת להכליל למרחקים ורצפים שלא נצפו כלל באימון (בניגוד ל-Learned Positional Embeddings המוגבלים לאורך החלון שנלמד).",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_DEEP_LEARNING_QUESTIONS = DEEP_LEARNING_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from attention / batch-norm / receptive field (Q1–3, key A)
 * - 1 from Adam / ResNet / LayerNorm (Q4–6, key B)
 * - 1 from dropout / complexity / init / smoothing / WGAN / PE (Q7–12, keys C–D)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleDeepLearningOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = DEEP_LEARNING_QUESTIONS.slice(0, 3);
  const groupB = DEEP_LEARNING_QUESTIONS.slice(3, 6);
  const groupC = DEEP_LEARNING_QUESTIONS.slice(6, 12);

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
