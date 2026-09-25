import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Computer Architecture diagnostic bank (12Q).
 * Display name: "מבנה מחשבים וארכיטקטורה" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const COMPUTER_ARCHITECTURE_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "arch-q01-pipeline-data-hazard-load-use",
    domain: "סכנות נתונים בצינור עיבוד",
    title:
      "מבנה מחשבים וארכיטקטורה - סכנות נתונים בצינור עיבוד (Pipeline Load-Use Hazard)",
    context:
      "בצינור עיבוד קלאסי בן 5 שלבים (IF, ID, EX, MEM, WB) עם מנגנון עקיפה מלא (Full Forwarding / Bypassing), מבוצע קטע הקוד הבא:",
    formulaLatex:
      "\\begin{aligned} &\\text{lw } \\$t0, 0(\\$t1) \\\\ &\\text{add } \\$t2, \\$t0, \\$t3 \\end{aligned}",
    instruction:
      "כמה מחזורי השעיה (Stall cycles / Bubbles) נדרשים בין שתי ההוראות לצורך שמירה על תקינות הנתונים?",
    options: [
      {
        id: "arch-q01-opt1",
        plainText:
          "מחזור השעיה אחד בדיוק ($1\\text{ Stall cycle}$), משום שהנתון מקריאת הזיכרון זמין רק בסוף שלב MEM, בעוד הוראת ה-add זקוקה לו בתחילת שלב EX.",
        isCorrect: true,
        explanation:
          "נכון: זוהי סכנת ה-Load-Use הקלאסית. הוראת ה-$\\text{lw}$ קוראת את הנתון מה-Data Memory בשלב MEM (שלב 4), ולכן הנתון זמין לעקיפה רק בסוף שלב זה. מאידך, הוראת ה-$\\text{add}$ זקוקה לערך של $\\$t0$ עבור ה-ALU בשלב EX (שלב 3). גם עם חומרת Forwarding מלאה, הנתון אינו יכול לנוע אחורה בזמן. לכן יחידת הבקרה (Hazard Detection Unit) חייבת להחדיר בועה אחת (1 Stall), ולאחריה הנתון מועבר ישירות ממוצא שלב MEM למבוא שלב EX של ה-$\\text{add}$.",
      },
      {
        id: "arch-q01-opt2",
        plainText:
          "$0$ מחזורי השעיה; חומרת ה-Forwarding מסוגלת להעביר את הנתון ללא כל השהיה.",
        isCorrect: false,
        explanation:
          "שגוי: הנתון פיזית אינו קיים במעבד לפני סיום שלב MEM, ולכן אף מנגנון עקיפה אינו יכול למנוע השעיה זו.",
      },
      {
        id: "arch-q01-opt3",
        plainText:
          "$2$ מחזורי השעיה, משום שחייבים להמתין עד שהנתון ייכתב בחזרה לקובץ האוגרים בשלב WB.",
        isCorrect: false,
        explanation:
          "שגוי: 2 מחזורי השעיה נדרשים רק במעבד נאיבי נטול מנגנון Forwarding; עם Forwarding מספיק מחזור השעיה יחיד.",
      },
      {
        id: "arch-q01-opt4",
        plainText:
          "$3$ מחזורי השעיה עקב סכנת מבנה (Structural Hazard) בגישה לקובץ האוגרים.",
        isCorrect: false,
        explanation:
          "שגוי: כתיבה וקריאה לקובץ אוגרים מפוצלות לשני חצאי מחזור (כתיבה בחצי ראשון, קריאה בשני) ולכן אין סכנת מבנה.",
      },
    ],
  },
  {
    id: "arch-q02-single-cycle-critical-path",
    domain: "מסלול קריטי וזמן מחזור שעון במעבד חד-מחזורי",
    title:
      "מבנה מחשבים וארכיטקטורה - מסלול קריטי וזמן מחזור שעון במעבד חד-מחזורי",
    context:
      "במעבד חד-מחזורי (Single-Cycle Datapath), זמני ההשהיה של הרכיבים העיקריים הם: זיכרון הוראות $250\\text{ps}$, פענוח וקובץ אוגרים $150\\text{ps}$, יחידת ALU $200\\text{ps}$, זיכרון נתונים $250\\text{ps}$, וכתיבה לאוגרים $100\\text{ps}$. שאר הרכיבים זניחים.",
    formulaLatex: "T_{clock} \\ge \\max_{\\text{instruction } I} \\text{Delay}(I)",
    instruction:
      "מהו מסלול השהיית הזמן הקריטי (Critical Path), ומהו זמן מחזור השעון המינימלי $T_{clock}$ של המעבד?",
    options: [
      {
        id: "arch-q02-opt1",
        plainText:
          "המסלול הקריטי נקבע ע״י הוראת $\\text{lw}$ (טעינה מהזיכרון), וזמן המחזור המינימלי הוא $950\\text{ps}$.",
        mathText: "T_{clock} = 250 + 150 + 200 + 250 + 100 = 950\\text{ps}",
        isCorrect: true,
        explanation:
          "נכון: הוראת $\\text{lw}$ היא ההוראה היחידה שעוברת דרך כל 5 הרכיבים הראשיים ברצף: שליפת הוראה (250ps) + קריאת אוגר בסיס (150ps) + חישוב כתובת ב-ALU (200ps) + קריאה מזיכרון נתונים (250ps) + כתיבת הנתון לקובץ האוגרים (100ps). סך ההשהיה הוא $250 + 150 + 200 + 250 + 100 = 950\\text{ps}$. במעבד חד-מחזורי השעון חייב להתאים להוראה האיטית ביותר, ולכן $T_{clock} = 950\\text{ps}$.",
      },
      {
        id: "arch-q02-opt2",
        plainText:
          "המסלול הקריטי נקבע ע״י הוראת $\\text{R-type}$ (כגון $\\text{add}$), וזמן המחזור הוא $700\\text{ps}$.",
        isCorrect: false,
        explanation:
          "שגוי: הוראת R-type אינה פונה לזיכרון הנתונים (חוסכת 250ps) ולכן אינה המסלול הארוך ביותר.",
      },
      {
        id: "arch-q02-opt3",
        plainText:
          "המסלול הקריטי נקבע ע״י הוראת הסתעפות $\\text{beq}$, וזמן המחזור הוא $600\\text{ps}$.",
        isCorrect: false,
        explanation:
          "שגוי: הוראת $\\text{beq}$ מסתיימת לאחר ה-ALU ואינה כותבת לאוגרים ואינה פונה לזיכרון נתונים.",
      },
      {
        id: "arch-q02-opt4",
        plainText:
          "המסלול הקריטי נקבע ע״י הוראת $\\text{sw}$, וזמן המחזור הוא $850\\text{ps}$.",
        isCorrect: false,
        explanation:
          "שגוי: הוראת $\\text{sw}$ כותבת לזיכרון אך אינה כותבת בחזרה לקובץ האוגרים (חוסכת 100ps מול $\\text{lw}$).",
      },
    ],
  },
  {
    id: "arch-q03-cache-field-breakdown-bits",
    domain: "חלוקת שדות כתובת בזיכרון מטמון",
    title:
      "מבנה מחשבים וארכיטקטורה - חלוקת שדות כתובת בזיכרון מטמון (Cache Mapping)",
    context:
      "מערכת משתמשת בכתובות זיכרון של 32 סיביות בגישה לפי בתים (Byte-addressable). זיכרון המטמון (Cache) הוא בנפח נתונים כולל של $64\\text{KB}$, עם גודל בלוק של $64\\text{B}$, ומאורגן כ-4-way Set Associative.",
    formulaLatex:
      "\\text{Address: } [\\text{Tag}] \\; [\\text{Index}] \\; [\\text{Offset}], \\quad \\text{Cache Size} = 64\\text{KB} = 2^{16}\\text{B}",
    instruction:
      "מהו מספר הסיביות המוקצה לכל אחד מהשדות: Offset, Index, ו-Tag בהתאמה?",
    options: [
      {
        id: "arch-q03-opt1",
        plainText:
          "$\\text{Offset} = 6$ סיביות, $\\text{Index} = 8$ סיביות, $\\text{Tag} = 18$ סיביות.",
        mathText: "\\text{Offset: } 6, \\; \\text{Index: } 8, \\; \\text{Tag: } 18",
        isCorrect: true,
        explanation:
          "נכון: 1. גודל בלוק הוא $64\\text{B} = 2^6\\text{B}$, ולכן נדרשות $\\log_2(64) = 6$ סיביות עבור ה-Offset. 2. מספר השורות/קבוצות (Sets): נפח הקאש הוא $64\\text{KB} = 2^{16}\\text{B}$. מספר הבלוקים הכולל הוא $\\frac{2^{16}}{2^6} = 2^{10} = 1024$ בלוקים. מאחר שהקאש הוא 4-way, בכל קבוצה יש 4 בלוקים, ולכן מספר הקבוצות הוא $\\frac{1024}{4} = 256 = 2^8$ קבוצות. נדרשות $\\log_2(256) = 8$ סיביות עבור ה-Index. 3. שדה ה-Tag משלים ל-32 סיביות: $32 - (8 + 6) = 18$ סיביות.",
      },
      {
        id: "arch-q03-opt2",
        plainText:
          "$\\text{Offset} = 6$ סיביות, $\\text{Index} = 10$ סיביות, $\\text{Tag} = 16$ סיביות.",
        isCorrect: false,
        explanation:
          "שגוי: חלוקה זו מתאימה לקאש במיפוי ישיר (Direct-Mapped) בעל 1024 קבוצות, ללא חלוקה ב-4 דרכי האסוציאטיביות.",
      },
      {
        id: "arch-q03-opt3",
        plainText:
          "$\\text{Offset} = 8$ סיביות, $\\text{Index} = 8$ סיביות, $\\text{Tag} = 16$ סיביות.",
        isCorrect: false,
        explanation:
          "שגוי: גודל בלוק הוא $64\\text{B}$ הדורש 6 סיביות היסט בלבד, ולא 8.",
      },
      {
        id: "arch-q03-opt4",
        plainText:
          "$\\text{Offset} = 6$ סיביות, $\\text{Index} = 6$ סיביות, $\\text{Tag} = 20$ סיביות.",
        isCorrect: false,
        explanation:
          "שגוי: שגיאה בחישוב מספר הקבוצות (הנחה שגויה של 64 קבוצות במקום 256).",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "arch-q04-amat-multilevel-cache-calculation",
    domain: "זמן גישה ממוצע לזיכרון בהיררכיה דו-רמתית",
    title:
      "מבנה מחשבים וארכיטקטורה - זמן גישה ממוצע לזיכרון (AMAT) בהיררכיה דו-רמתית",
    context:
      "במערכת מחשב זמן פגיעה ב-L1 הוא מחזור שעון יחיד ($1\\text{ cycle}$), ושיעור ההחטאות של L1 הוא $5\\%$. זמן הפגיעה ב-L2 הוא $10\\text{ cycles}$, ושיעור ההחטאות המקומי (Local Miss Rate) של L2 הוא $20\\%$. קנס ההחטאה לזיכרון הראשי (DRAM Penalty) הוא $100\\text{ cycles}$.",
    formulaLatex:
      "\\text{AMAT} = t_{hit,L1} + \\text{MissRate}_{L1} \\times [t_{hit,L2} + \\text{LocalMissRate}_{L2} \\times \\text{Penalty}_{DRAM}]",
    instruction: "מהו זמן הגישה הממוצע לזיכרון (AMAT) במחזורי שעון?",
    options: [
      {
        id: "arch-q04-opt1",
        plainText: "$1.5\\text{ cycles}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה המניחה בטעות שאין קנס של זיכרון ראשי בעת החטאה ב-L2.",
      },
      {
        id: "arch-q04-opt2",
        plainText: "$2.5\\text{ cycles}$",
        mathText: "\\text{AMAT} = 1 + 0.05 \\times [10 + 0.20 \\times 100] = 2.5",
        isCorrect: true,
        explanation:
          "נכון: קנס ההחטאה הממוצע של L1 מחושב מתוך ביצועי L2: $\\text{Penalty}_{L1} = t_{hit,L2} + \\text{LocalMissRate}_{L2} \\times \\text{Penalty}_{DRAM} = 10 + 0.20 \\times 100 = 10 + 20 = 30\\text{ cycles}$. כעת נציב בנוסחת ה-AMAT של המערכת: $\\text{AMAT} = t_{hit,L1} + \\text{MissRate}_{L1} \\times \\text{Penalty}_{L1} = 1 + 0.05 \\times 30 = 1 + 1.5 = 2.5\\text{ cycles}$.",
      },
      {
        id: "arch-q04-opt3",
        plainText: "$3.0\\text{ cycles}$",
        isCorrect: false,
        explanation:
          "שגוי: שקלול שגוי שבו הוכפל שיעור ההחטאה של L2 ישירות ללא חיבור זמן הפגיעה ב-L2.",
      },
      {
        id: "arch-q04-opt4",
        plainText: "$6.0\\text{ cycles}$",
        isCorrect: false,
        explanation:
          "שגוי: שימוש בשיעור החטאה גלובלי שגוי של $5\\% + 20\\% = 25\\%$.",
      },
    ],
  },
  {
    id: "arch-q05-tomasulo-register-renaming-wao-waw",
    domain: "אלגוריתם תומסולו וביטול תלויות שווא",
    title: "מבנה מחשבים וארכיטקטורה - אלגוריתם תומסולו וביטול תלויות שווא",
    context:
      "במעבדים מודרניים המבצעים פקודות שלא לפי הסדר (Out-of-Order Execution), אלגוריתם תומסולו (Tomasulo's Algorithm) משתמש בתחנות הזמנה (Reservation Stations) ובאפיק תוצאות משותף (CDB).",
    instruction:
      "כיצד מבטל אלגוריתם תומסולו את תלויות השווא מסוג WAR (Write-After-Read) ו-WAW (Write-After-Write)?",
    options: [
      {
        id: "arch-q05-opt1",
        plainText:
          "על ידי החדרת השעיות תוכנה (Compiler Stalls) המונעות פליטה של הוראות עם שמות אוגרים זהים.",
        isCorrect: false,
        explanation:
          "שגוי: תומסולו הוא אלגוריתם חומרתי דינמי הפועל בזמן ריצה ואינו דורש התערבות מהדר.",
      },
      {
        id: "arch-q05-opt2",
        plainText:
          "באמצעות שינוי שמות אוגרים דינמי (Dynamic Register Renaming) הממפה שמות אוגרים ארכיטקטוניים לתחנות הזמנה או ערכים ממשיים, כך שהוראות מאוחרות אינן דורסות אוגר שעדיין נקרא או נכתב ע״י הוראה קודמת.",
        isCorrect: true,
        explanation:
          "נכון: תלויות WAR ו-WAW אינן תלויות נתונים אמיתיות (RAW), אלא נובעות ממחסור בשמות אוגרים ארכיטקטוניים (שמות משותפים). תומסולו משנה שמות אוגרים דינמית: ברגע שהוראה נקלטת בתחנת ההזמנה, היא מקבלת ישירות את ערכי האופרנדים שכבר זמינים, או תגית (Pointer/Tag) של תחנת ההזמנה שתפיק את הערך. כתיבה מאוחרת של הוראה קודמת משנה רק את השם המקורי ולא פוגעת בקריאות או בכתיבות של הוראות חדשות יותר.",
      },
      {
        id: "arch-q05-opt3",
        plainText:
          "על ידי ביצוע ספקולטיבי באמצעות חיזוי הסתעפויות מדויק של 2 סיביות.",
        isCorrect: false,
        explanation:
          "שגוי: חיזוי הסתעפויות מטפל בסכנות בקרה (Control Hazards), בעוד שתומסולו במקור מטפל בסכנות נתונים ותלויות שווא.",
      },
      {
        id: "arch-q05-opt4",
        plainText:
          "על ידי אילוץ כתיבה לקובץ האוגרים בסדר התוכנית המקורי (In-order Writeback).",
        isCorrect: false,
        explanation:
          "שגוי: תומסולו המקורי כותב ל-CDB ברגע שהתוצאה מוכנה (Out-of-Order Writeback). שמירה על סדר התוכנית הוספה רק מאוחר יותר באמצעות Reorder Buffer (ROB) לצורך טיפול בפסיקות מדויקות.",
      },
    ],
  },
  {
    id: "arch-q06-branch-prediction-2bit-counter",
    domain: "חיזוי הסתעפויות דינמי עם מונה 2 סיביות",
    title:
      "מבנה מחשבים וארכיטקטורה - חיזוי הסתעפויות דינמי עם מונה 2 סיביות רווי",
    context:
      "במנגנון חיזוי הסתעפויות דינמי מקומי, נעזרים במכונת מצבים בת 2 סיביות רוויות (2-bit Saturating Counter): מצב 00 (Strongly Not-Taken), 01 (Weakly Not-Taken), 10 (Weakly Taken), 11 (Strongly Taken). המנחש מתחיל במצב Strongly Taken (11).",
    formulaLatex:
      "\\text{Initial State: } 11 \\text{ (Strongly Taken)}, \\quad \\text{Outcomes: } T, NT, T, NT",
    instruction:
      "נתונה לולאה מקוננת שבה ההסתעפות מתנהגת לפי הרצף הבא: נלקחת (T), לא נלקחת (NT), נלקחת (T), לא נלקחת (NT). כמה שגיאות חיזוי (Mispredictions) יתרחשו ברצף זה?",
    options: [
      {
        id: "arch-q06-opt1",
        plainText:
          "$0$ שגיאות חיזוי (המנחש מסתגל מיד לתבנית המתחלפת)",
        isCorrect: false,
        explanation:
          "שגוי: מונה רווי אינו יכול ללמוד תבניות מתחלפות תקופתיות קצרות ללא היסטוריית הסתעפות דו-רמתית (Two-level Adaptive / Correlating Predictor).",
      },
      {
        id: "arch-q06-opt2",
        plainText: "$2$ שגיאות חיזוי",
        isCorrect: true,
        explanation:
          "נכון: ננתח צעד אחר צעד: 1. מתחילים ב-11 (חוזה T). תוצאה: T. חיזוי מוצלח! מצב נשאר 11. 2. מצב 11 (חוזה T). תוצאה: NT. שגיאת חיזוי ראשונה (1)! המצב יורד ל-10 (Weakly Taken). 3. מצב 10 (חוזה T). תוצאה: T. חיזוי מוצלח! המצב עולה ל-11 (Strongly Taken). 4. מצב 11 (חוזה T). תוצאה: NT. שגיאת חיזוי שנייה (2)! המצב יורד ל-10. סך הכל: 2 שגיאות חיזוי מתוך 4 פעמים.",
      },
      {
        id: "arch-q06-opt3",
        plainText: "$4$ שגיאות חיזוי (כל הניחושים נכשלים)",
        isCorrect: false,
        explanation:
          "שגוי: בשני הצעדים שבהם ההסתעפות נלקחה (T), המנחש חזה Taken בהצלחה.",
      },
      {
        id: "arch-q06-opt4",
        plainText: "$1$ שגיאת חיזוי בלבד",
        isCorrect: false,
        explanation:
          "שגוי: המנחש חוזה Taken בכל 4 השלבים, ולכן בכל פעם שהתוצאה היא Not-Taken (פעמיים ברצף) מתרחשת שגיאה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "arch-q07-mesi-cache-coherence-state-transitions",
    domain: "עקביות זיכרון מטמון ופרוטוקול MESI",
    title: "מבנה מחשבים וארכיטקטורה - עקביות זיכרון מטמון ופרוטוקול MESI",
    context:
      "במערכת מרובת-ליבות (Multi-Core) מיושם פרוטוקול עקביות מטמון מסוג MESI (Modified, Exclusive, Shared, Invalid) מבוסס האזנה (Bus Snooping). לליבה 1 בלוק זיכרון במצב Exclusive (E).",
    formulaLatex:
      "\\text{State in Core 1: } E \\implies \\text{Core 2 issues BusRd}",
    instruction:
      "מה קורה כאשר ליבה 2 מנסה לבצע פעולת קריאה מאותה כתובת זיכרון (משדרת $\\text{BusRd}$ בערוץ המשותף)?",
    options: [
      {
        id: "arch-q07-opt1",
        plainText:
          "ליבה 1 מתעלמת מהבקשה, והבלוק שלה עובר למצב Modified (M).",
        isCorrect: false,
        explanation:
          "שגוי: מצב E מציין שהבלוק נקי ותואם ל-DRAM; קריאה של ליבה אחרת מחייבת שיתוף הבלוק.",
      },
      {
        id: "arch-q07-opt2",
        plainText:
          "ליבה 1 שולחת אות ביטול (Abort), וליבה 2 מקבלת פסיקת Bus Error.",
        isCorrect: false,
        explanation:
          "שגוי: פרוטוקולי עקביות מתוכננים לשתף נתונים בצורה שקופה ולא להפיל מעבדים.",
      },
      {
        id: "arch-q07-opt3",
        plainText:
          "ליבה 1 מאזינה לערוץ (Snoops), מעבירה את הבלוק שלה למצב Shared (S), וליבה 2 טוענת את הבלוק למטמון שלה במצב Shared (S) גם כן.",
        isCorrect: true,
        explanation:
          "נכון: מצב Exclusive (E) פירושו שהבלוק שמור אך ורק במטמון של ליבה 1 ותואם לחלוטין לזיכרון הראשי (Clean). כאשר ליבה 2 משדרת $\\text{BusRd}$, ליבה 1 מזהה זאת באמצעות ה-Snooping Logic, מבינה שהבלוק כבר אינו בלעדי, ומעבירה את מצבו ל-Shared (S). ליבה 2 מקבלת את הנתון וטוענת אותו במצב Shared (S). מאחר שהבלוק היה נקי ב-E, אין צורך לכתוב אותו לזיכרון הראשי.",
      },
      {
        id: "arch-q07-opt4",
        plainText:
          "הבלוק בליבה 1 הופך מיד ל-Invalid (I), וליבה 2 מקבלת את הבלוק במצב Exclusive (E).",
        isCorrect: false,
        explanation:
          "שגוי: מעבר ל-Invalid נדרש רק כאשר הליבה השנייה מבצעת *כתיבה* ($\\text{BusRdX}$), ולא כאשר היא מבצעת קריאה בלבד.",
      },
    ],
  },
  {
    id: "arch-q08-virtual-memory-vipt-cache-aliasing",
    domain: "זיכרון וירטואלי וארגון VIPT",
    title:
      "מבנה מחשבים וארכיטקטורה - זיכרון וירטואלי וארגון VIPT (Virtually-Indexed Physically-Tagged)",
    context:
      "כדי לאפשר גישה מהירה במקביל לתרגום כתובות ע״י ה-TLB, מעבדים מודרניים רבים משתמשים בזיכרון מטמון מסוג VIPT (Virtually Indexed, Physically Tagged). גודל הדף הווירטואלי במערכת הוא $4\\text{KB}$ ($12$ סיביות היסט דף).",
    formulaLatex:
      "\\text{Page Offset} = 12 \\text{ bits} \\implies \\text{Index Bits} + \\text{Cache Offset Bits} \\le 12",
    instruction:
      "מהו התנאי ההכרחי והמספיק על ממדי זיכרון המטמון כדי להבטיח שלא תתרחש תופעת כפילות כינויים (Cache Aliasing / Homonyms) במטמון VIPT זה?",
    options: [
      {
        id: "arch-q08-opt1",
        plainText: "נפח הקאש הכולל חייב להיות קטן מ-$4\\text{KB}$.",
        isCorrect: false,
        explanation:
          "שגוי: הקאש יכול להיות גדול בהרבה מ-$4\\text{KB}$ (למשל $16\\text{KB}$ או $32\\text{KB}$), בתנאי שמשתמשים באסוציאטיביות מתאימה.",
      },
      {
        id: "arch-q08-opt2",
        plainText: "הקאש חייב להיות במיפוי ישיר (Direct-Mapped) בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: מיפוי ישיר עם קאש גדול מחמיר את בעיית ה-Aliasing ולא פותר אותה.",
      },
      {
        id: "arch-q08-opt3",
        plainText:
          "גודל כל דרך במטמון (Cache Way Size = $\\frac{\\text{Total Cache Size}}{\\text{Associativity}}$) אינו עולה על גודל הדף ($4\\text{KB}$), כך שכל סיביות ה-Index מגיעות מה-Page Offset שאינו משתנה בתרגום הכתובות.",
        isCorrect: true,
        explanation:
          "נכון: סיביות ה-Offset של הדף הווירטואלי ($12$ סיביות) זהות לחלוטין לסיביות ההיסט של המסגרת הפיזית ואינן משתנות ע״י ה-TLB. ב-VIPT, סיביות האינדקס של הקאש נשלפות מהכתובת הווירטואלית. אם מספר סיביות האינדקס וההיסט של הקאש יחד אינו עולה על 12 (כלומר $\\text{Number of Sets} \\times \\text{Block Size} \\le 4096\\text{B}$), כל סיביות האינדקס מגיעות מתוך האזור הבלתי-משתנה. כתוצאה מכך, אותה כתובת פיזית תמופה תמיד לאותה קבוצה (Set) בדיוק, ונמנעת תופעת Aliasing לחלוטין.",
      },
      {
        id: "arch-q08-opt4",
        plainText:
          "חייבים לאפס את כל המטמון (Flush) בכל החלפת הקשר (Context Switch).",
        isCorrect: false,
        explanation:
          "שגוי: הצורך ב-Flush מאפיין קאש וירטואלי מלא (VIVT); במטמון VIPT התגיות פיזיות (Physical Tag) ולכן הנתונים מזוהים חד-ערכית לפי הכתובת הפיזית שלהם בזיכרון.",
      },
    ],
  },
  {
    id: "arch-q09-raid-5-small-write-penalty",
    domain: "ארגון מערכי דיסקים וקנס כתיבה קטנה ב-RAID 5",
    title:
      "מבנה מחשבים וארכיטקטורה - ארגון מערכי דיסקים וקנס כתיבה קטנה ב-RAID 5",
    context:
      "במערך אחסון מסוג RAID 5 המורכב מ-$N$ דיסקים ($N \\ge 4$), מיושמת חלוקת נתונים עם זוגיות מבוזרת (Distributed Parity).",
    formulaLatex: "P_{\\text{new}} = P_{\\text{old}} \\oplus D_{\\text{old}} \\oplus D_{\\text{new}}",
    instruction:
      "כמה פעולות I/O פיזיות לדיסק (קריאות וכתיבות) נדרשות לביצוע עדכון של בלוק נתונים בודד (Small Write Penalty)?",
    options: [
      {
        id: "arch-q09-opt1",
        plainText: "פעולת כתיבה אחת בלבד ($1\\text{ Write}$).",
        isCorrect: false,
        explanation:
          "שגוי: עדכון נתון משנה את הזוגיות (Parity) ולכן מחייב עדכון נפרד של בלוק הזוגיות בדיסק אחר.",
      },
      {
        id: "arch-q09-opt2",
        plainText: "$2$ פעולות I/O: כתיבת הנתון וכתיבת הזוגיות.",
        isCorrect: false,
        explanation:
          "שגוי: כדי לדעת מהי הזוגיות החדשה, הבקר חייב לקרוא קודם את הנתון הישן ואת הזוגיות הישנה כדי לחשב את השינוי באמצעות XOR.",
      },
      {
        id: "arch-q09-opt3",
        plainText:
          "$4$ פעולות I/O: קריאת הנתון הישן, קריאת הזוגיות הישנה, כתיבת הנתון החדש, וכתיבת הזוגיות החדשה ($2\\text{ Reads} + 2\\text{ Writes}$).",
        mathText: "2 \\text{ Reads} + 2 \\text{ Writes} = 4 \\text{ Disk I/Os}",
        isCorrect: true,
        explanation:
          "נכון: זוהי תופעת ה-Small-Write Penalty המפורסמת של RAID 5. הנוסחה לחישוב הזוגיות החדשה ללא קריאת כל $N-1$ הדיסקים היא: $P_{new} = P_{old} \\oplus D_{old} \\oplus D_{new}$. לשם כך הבקר חייב לבצע: 1. קריאת $D_{old}$. 2. קריאת $P_{old}$. 3. כתיבת $D_{new}$. 4. כתיבת $P_{new}$. סך הכל 2 קריאות ו-2 כתיבות (4 פעולות דיסק עבור כתיבה לוגית בודדת).",
      },
      {
        id: "arch-q09-opt4",
        plainText:
          "$N$ פעולות I/O: קריאת כל שאר $N-1$ הדיסקים וכתיבת הזוגיות החדשה.",
        isCorrect: false,
        explanation:
          "שגוי: קריאת כל הדיסקים נדרשת רק אם מבצעים Reconstruct-Write, אך בעדכון של בלוק בודד משתמשים בטכניקת השינוי ההפרשי של 4 פעולות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "arch-q10-amdahl-law-multicore-speedup",
    domain: "חוק אמדל ומגבלות האצה מקבילית",
    title: "מבנה מחשבים וארכיטקטורה - חוק אמדל ומגבלות האצה מקבילית",
    context:
      "תוכנית מחשב עוברת אופטימיזציה להרצה על גבי מעבד מרובה-ליבות. ידוע כי $20\\%$ מזמן הריצה של התוכנית הוא סדרתי לחלוטין ואינו ניתן למקבול בשום צורה, בעוד ש-$80\\%$ הנותרים ניתנים למקבול מושלם.",
    formulaLatex: "\\text{Speedup} = \\frac{1}{(1 - f) + \\frac{f}{p}}",
    instruction:
      "מהו החסם העליון התאורטי על ההאצה (Speedup) שניתן להשיג לתוכנית זו, גם אם מספר הליבות ישאף לאינסוף ($p \\to \\infty$)?",
    options: [
      {
        id: "arch-q10-opt1",
        plainText:
          "ההאצה המקסימלית היא פי 80, כמספר האחוזים שניתן למקבול.",
        isCorrect: false,
        explanation:
          "שגוי: אחוז החלק המקבילי אינו מייצג ישירות את פקטור ההאצה הכולל של התוכנית.",
      },
      {
        id: "arch-q10-opt2",
        plainText:
          "ההאצה תשאף לאינסוף מכיוון שרוב מוחלט של התוכנית ($80\\%$) מואץ.",
        isCorrect: false,
        explanation:
          "שגוי: החלק הסדרתי של $20\\%$ מהווה צוואר בקבוק קשיח החוסם את ההאצה הכוללת.",
      },
      {
        id: "arch-q10-opt3",
        plainText: "ההאצה המקסימלית היא פי 4.",
        isCorrect: false,
        explanation:
          "שגוי: $4 = 0.8/0.2$ הוא היחס בין החלק המקבילי לחלק הסדרתי, אך אינו מבטא את חוק אמדל על זמן הריצה הכולל.",
      },
      {
        id: "arch-q10-opt4",
        plainText: "ההאצה המקסימלית חסומה בפי 5 בלבד.",
        mathText:
          "\\lim_{p \\to \\infty} \\text{Speedup} = \\frac{1}{1 - f} = \\frac{1}{0.2} = 5",
        isCorrect: true,
        explanation:
          "נכון: לפי חוק אמדל: $\\text{Speedup} = \\frac{1}{(1-f) + \\frac{f}{p}}$, כאשר $f = 0.8$ הוא החלק המקבילי ו-$1 - f = 0.2$ הוא החלק הסדרתי. כאשר מספר הליבות שואף לאינסוף ($p \\to \\infty$), האיבר המקבילי מתאפס ($f/p \\to 0$). נקבל: $\\text{Speedup}_{\\max} = \\frac{1}{1 - f} = \\frac{1}{0.2} = 5$. לא ניתן לעקוף חסם זה ללא שינוי אלגוריתמי המקטין את החלק הסדרתי.",
      },
    ],
  },
  {
    id: "arch-q11-cpi-stall-cycles-memory-bound",
    domain: "מדדי ביצועים וחישוב CPI עם השעיות זיכרון",
    title:
      "מבנה מחשבים וארכיטקטורה - מדדי ביצועים וחישוב CPI עם השעיות זיכרון",
    context:
      "למעבד יש $\\text{CPI}_{\\text{ideal}} = 1.0$ בהנחה שכל הפניות לזיכרון פוגעות במטמון. בתוכנית נתונה, $30\\%$ מכלל ההוראות הן הוראות טעינה/שמירה מהזיכרון ($\\text{load/store}$). שיעור ההחטאות של מטמון ההוראות הוא $1\\%$, ושיעור ההחטאות של מטמון הנתונים הוא $10\\%$. קנס ההחטאה הוא $50$ מחזורים לכל החטאה.",
    formulaLatex:
      "\\text{CPI} = \\text{CPI}_{\\text{ideal}} + \\text{Instruction Miss Stalls} + \\text{Data Miss Stalls}",
    instruction: "מהו ה-CPI הכולל האמיתי של המעבד בעת הרצת תוכנית זו?",
    options: [
      {
        id: "arch-q11-opt1",
        plainText: "$\\text{CPI} = 1.55$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה מאי-הכללת שגיאות מטמון ההוראות (Instruction Cache Misses).",
      },
      {
        id: "arch-q11-opt2",
        plainText: "$\\text{CPI} = 2.00$",
        isCorrect: false,
        explanation: "שגוי: שקלול לקוי של תדירות הוראות הזיכרון.",
      },
      {
        id: "arch-q11-opt3",
        plainText: "$\\text{CPI} = 6.50$",
        isCorrect: false,
        explanation:
          "שגוי: הנחה שגויה שכל הוראה פונה לזיכרון הנתונים, במקום $30\\%$ בלבד.",
      },
      {
        id: "arch-q11-opt4",
        plainText: "$\\text{CPI} = 3.00$",
        mathText:
          "\\text{CPI} = 1.0 + (1 \\times 0.01 \\times 50) + (0.30 \\times 0.10 \\times 50) = 3.00",
        isCorrect: true,
        explanation:
          "נכון: 1. החטאות שליפת הוראה: כל הוראה נשלפת פעם אחת, ולכן מחזורי ההשעיה להוראה הם $1 \\times 0.01 \\times 50 = 0.5\\text{ cycles}$. 2. החטאות נתונים: רק $30\\%$ מההוראות ניגשות לנתונים, ולכן מחזורי ההשעיה מנתונים להוראה הם $0.30 \\times 0.10 \\times 50 = 1.5\\text{ cycles}$. 3. סך הכל: $\\text{CPI} = \\text{CPI}_{\\text{ideal}} + \\text{Stalls} = 1.0 + 0.5 + 1.5 = 3.00$. שגיאות הזיכרון מאטות את המעבד פי 3 ביחס לביצועיו האידיאליים!",
      },
    ],
  },
  {
    id: "arch-q12-riscv-mips-instruction-formats-imm",
    domain: "קידוד פקודות ב-RISC והרחבת סימן",
    title:
      "מבנה מחשבים וארכיטקטורה - קידוד פקודות ב-RISC (MIPS / RISC-V) והרחבת סימן",
    context:
      "בארכיטקטורת מחשב RISC (כגון MIPS או RISC-V), פקודת טעינה מיידית מסוג I-type כוללת שדה ערך מיידי (Immediate) של 16 סיביות (ב-MIPS) או 12 סיביות (ב-RISC-V).",
    formulaLatex:
      "\\text{MIPS I-Type: } [\\text{Opcode: } 6] \\; [\\text{rs: } 5] \\; [\\text{rt: } 5] \\; [\\text{Immediate: } 16]",
    instruction:
      "כיצד מטופל שדה ה-Immediate בחומרת המעבד בהוראות אריתמטיות ($\\text{addi}$), בהוראות לוגיות ($\\text{andi}$), ובהוראות ענף מותנה ($\\text{beq}$)?",
    options: [
      {
        id: "arch-q12-opt1",
        plainText:
          "בכל ההוראות מבוצעת הרחבת אפסים (Zero-Extension) ל-32 סיביות כדי למנוע יצירת מספרים שליליים.",
        isCorrect: false,
        explanation:
          "שגוי: בהוראות אריתמטיות ($\\text{addi}$) חייבים הרחבת סימן כדי לאפשר חיסור והזזות שליליות.",
      },
      {
        id: "arch-q12-opt2",
        plainText:
          "בכל ההוראות מבוצעת הרחבת סימן (Sign-Extension), ולאחר מכן כפל ב-4.",
        isCorrect: false,
        explanation:
          "שגוי: כפל ב-4 (הזזה של 2 סיביות שמאלה) מתבצע אך ורק בחישוב כתובות יעד של הסתעפויות ($\\text{beq}$), ואינו מתבצע בהוראות אריתמטיות רגילות.",
      },
      {
        id: "arch-q12-opt3",
        plainText:
          "ב-$\\text{addi}$ מבוצעת הרחבת אפסים, וב-$\\text{andi}$ מבוצעת הרחבת סימן.",
        isCorrect: false,
        explanation:
          "שגוי: הטיפול הפוך לחלוטין; פעולות לוגיות מבוססות על מסכות סיביות ולכן דורשות הרחבת אפסים.",
      },
      {
        id: "arch-q12-opt4",
        plainText:
          "ב-$\\text{addi}$ מבוצעת הרחבת סימן (Sign-Extension); ב-$\\text{andi}$ מבוצעת הרחבת אפסים (Zero-Extension); וב-$\\text{beq}$ מבוצעת הרחבת סימן ולאחריה הזזה שמאלה ב-2 סיביות (כפל ב-4) לצורך חישוב היסט מילים ביחס ל-$PC+4$.",
        isCorrect: true,
        explanation:
          "נכון: 1. הוראות אריתמטיות כגון $\\text{addi}$ מתייחסות למספר כבעל סימן במשלים ל-2 ולכן דורשות Sign-Extension לשמירה על הערך המספרי השלילי ב-32 סיביות. 2. הוראות לוגיות כגון $\\text{andi}$ מתייחסות לערך כמסכת סיביות (Bitmask) ולכן מרחיבות באפסים (Zero-Extension). 3. הוראות הסתעפות כגון $\\text{beq}$ מחשבות כתובת יעד יחסית למחשבון התוכנית (PC-Relative); הכתובות תמיד מיושרות למילים (Word-aligned, כפולות של 4), ולכן ההיסט מורחב בסימן ומוזז 2 סיביות שמאלה (מכפיל פי 4 את טווח הקפיצה).",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_COMPUTER_ARCHITECTURE_QUESTIONS =
  COMPUTER_ARCHITECTURE_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from pipeline / single-cycle / cache fields (Q1–3)
 * - 1 from AMAT / Tomasulo / branch prediction (Q4–6)
 * - 1 from MESI / VIPT / RAID / Amdahl / CPI / RISC immediates (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleComputerArchitectureOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = COMPUTER_ARCHITECTURE_QUESTIONS.slice(0, 3);
  const groupB = COMPUTER_ARCHITECTURE_QUESTIONS.slice(3, 6);
  const groupC = COMPUTER_ARCHITECTURE_QUESTIONS.slice(6, 12);

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
