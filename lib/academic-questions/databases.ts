import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Databases diagnostic bank (12Q).
 * Display name: "בסיסי נתונים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const DATABASES_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "db-q01-normalization-bcnf-lossless-dependency",
    domain: "נרמול, BCNF ושימור תלויות",
    title:
      "בסיסי נתונים - נרמול, BCNF ושימור תלויות",
    context:
      "נתונה סכמת יחס $R(A, B, C, D)$ עם קבוצת התלויות הפונקציונליות $F = \\{ A \\to B, \\; B \\to C, \\; C \\to D, \\; D \\to A \\}$.",
    formulaLatex: "F = \\{ A \\to B, \\; B \\to C, \\; C \\to D, \\; D \\to A \\}",
    instruction:
      "מהם מפתחות המועמד (Candidate Keys) של $R$, ובאיזה אופן נורמלי עליון נמצא היחס?",
    options: [
      {
        id: "db-q01-opt1",
        plainText:
          "כל אחת מארבע התכונות היא מפתח מועמד יחיד בפני עצמה ($A, B, C, D$), והיחס נמצא ב-BCNF (ולכן גם ב-3NF וב-2NF).",
        isCorrect: true,
        explanation:
          "נכון: מכיוון שמתקיים מעגל תלויות $A \\to B \\to C \\to D \\to A$, סגור התכונות של כל תכונה בודדת מכיל את כל תכונות היחס: $A^+ = B^+ = C^+ = D^+ = \\{A, B, C, D\\}$. לכן כל אחת מהתכונות היא מפתח מועמד מינימלי. בהגדרה של BCNF נדרש כי לכל תלות פונקציונלית לא-טריוויאלית $X \\to Y$, האגף השמאלי $X$ יהיה מפתח-על (Superkey). מכיוון שכל אגף שמאלי כאן הוא מפתח מועמד, היחס ב-BCNF.",
      },
      {
        id: "db-q01-opt2",
        plainText:
          "המפתח המועמד היחיד הוא הצירוף $\\{A, B, C, D\\}$, והיחס ב-1NF בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: מפתח מועמד חייב להיות מינימלי. מאחר שכל תכונה בודדת קובעת את שאר התכונות, הצירוף של כולן הוא מפתח-על אך אינו מפתח מועמד.",
      },
      {
        id: "db-q01-opt3",
        plainText:
          "היחס נמצא ב-3NF אך אינו ב-BCNF עקב תלות טרנזיטיבית בין $A$ ל-$C$.",
        isCorrect: false,
        explanation:
          "שגוי: תלות טרנזיטיבית מפרה 3NF רק אם היא מובילה לתכונה שאינה שייכת לאף מפתח (Non-prime attribute), אך כאן כל התכונות הן תכונות מפתח.",
      },
      {
        id: "db-q01-opt4",
        plainText:
          "היחס אינו ב-2NF משום שקיימת תלות חלקית במפתח מורכב.",
        isCorrect: false,
        explanation:
          "שגוי: כל המפתחות הם בני תכונה יחידה (לא מורכבים), ולכן לא תיתכן תלות חלקית בהגדרה.",
      },
    ],
  },
  {
    id: "db-q02-b-plus-tree-io-height-fanout",
    domain: "אינדקס B+ Tree וסיבוכיות חיפוש בבלוקים",
    title:
      "בסיסי נתונים - אינדקס B+ Tree וסיבוכיות חיפוש בבלוקים",
    context:
      "אינדקס B+ Tree מאורגן בבלוקי דיסק בגודל $B = 4096\\text{ bytes}$. מפתח תופס 8 בייטים ומצביע בלוק/דף תופס 8 בייטים. רשומות המידע נשמרות בעלים בלבד.",
    formulaLatex: "p \\times 8 + (p - 1) \\times 8 \\le 4096 \\implies 16p - 8 \\le 4096",
    instruction:
      "מהו סדר הפיצול המקסימלי (Fan-out / Order) $p$ של צומת פנימי, ומהו מספר הגישות המקסימלי לדיסק (I/O) לחיפוש רשומה בודדת בעץ בעל $10^7$ רשומות?",
    options: [
      {
        id: "db-q02-opt1",
        plainText:
          "ה-Fan-out הוא $p = 256$, ועבור $10^7$ רשומות עומק העץ קטן או שווה ל-4 (לכל היותר 4 גישות דיסק לחיפוש).",
        mathText: "p = \\left\\lfloor \\frac{4096 + 8}{16} \\right\\rfloor = 256, \\quad h \\le \\lceil \\log_{128}(10^7) \\rceil \\le 4",
        isCorrect: true,
        explanation:
          "נכון: בצומת פנימי בעל $p$ מצביעים יש $p-1$ מפתחות. המשוואה: $8p + 8(p-1) \\le 4096 \\implies 16p \\le 4104 \\implies p = 256$. במקרה הגרוע (צמתים חצי-מלאים עם דרגה $\\lceil p/2 \\rceil = 128$), העץ מכיל בכל רמה פי 128 צמתים. עומק העץ הנדרש לייצוג 10 מיליון רשומות: $\\log_{128}(10^7) \\approx \\frac{7}{2.107} \\approx 3.32$. לכן גובה העץ אינו עולה על 4, ונדרשות לכל היותר 4 פעולות קריאת בלוקים מהדיסק.",
      },
      {
        id: "db-q02-opt2",
        plainText:
          "ה-Fan-out הוא $p = 512$, ועומק העץ הוא 7 גישות דיסק.",
        isCorrect: false,
        explanation:
          "שגוי: 512 מצביעים יחד עם 511 מפתחות דורשים מעל $8\\text{KB}$, פי שניים מגודל הבלוק הנתון.",
      },
      {
        id: "db-q02-opt3",
        plainText:
          "ה-Fan-out הוא $p = 64$, והחיפוש דורש $\\Theta(\\log_2(10^7)) \\approx 24$ פעולות I/O.",
        isCorrect: false,
        explanation:
          "שגוי: חיפוש בדיסק ב-B+ Tree מתבצע לפי בסיס ה-Fan-out של הבלוק ולא לפי בסיס בינארי 2.",
      },
      {
        id: "db-q02-opt4",
        plainText:
          "ה-Fan-out אינו מוגבל ב-B+ Tree משום שעלים מקושרים ברשימה מקושרת כפולה.",
        isCorrect: false,
        explanation:
          "שגוי: הרשימה המקושרת בעלים משמשת לסריקות טווח (Range Queries), אך כל צומת מוגבל קשיח בגודל בלוק הדיסק.",
      },
    ],
  },
  {
    id: "db-q03-relational-algebra-division-operator",
    domain: "אלגברה רלציונית ואופרטור החילוק (Relational Division)",
    title:
      "בסיסי נתונים - אלגברה רלציונית ואופרטור החילוק (Relational Division)",
    context:
      "נתונות שתי סכמות: סטודנטים וקורסים שלמדו $Takes(student\\_id, course\\_id)$, וקורסי חובה $Mandatory(course\\_id)$. אנו מעוניינים למצוא את הסטודנטים שלמדו את כל קורסי החובה.",
    formulaLatex: "Takes \\div Mandatory = \\pi_{student\\_id}(Takes) - \\pi_{student\\_id}\\left((\\pi_{student\\_id}(Takes) \\times Mandatory) - Takes\\right)",
    instruction:
      "כיצד מיוצגת שאילתה זו באלגברה רלציונית בסיסית ללא שימוש ישיר בסימון החילוק ($\\div$)?",
    options: [
      {
        id: "db-q03-opt1",
        plainText:
          "$\\pi_{student\\_id}(Takes) - \\pi_{student\\_id}\\left((\\pi_{student\\_id}(Takes) \\times Mandatory) - Takes\\right)$",
        mathText: "\\pi_{S}(Takes) - \\pi_{S}((\\pi_{S}(Takes) \\times Mandatory) - Takes)",
        isCorrect: true,
        explanation:
          "נכון: זהו הפירוק הקלאסי של אופרטור החילוק: 1. $\\pi_{student\\_id}(Takes) \\times Mandatory$ מייצר את כל הזוגות האפשריים של סטודנט וקורס חובה. 2. חיסור $Takes$ מבודד את הזוגות שבהם סטודנט *לא* לקח קורס חובה מסוים. 3. היטל על $student\\_id$ מפיק את כל הסטודנטים שהחמיצו לפחות קורס חובה אחד. 4. חיסור קבוצה זו מכלל הסטודנטים מותיר בדיוק את הסטודנטים שלמדו את כל קורסי החובה ללא יוצא מן הכלל.",
      },
      {
        id: "db-q03-opt2",
        plainText:
          "$\\pi_{student\\_id}(Takes \\bowtie Mandatory)$",
        isCorrect: false,
        explanation:
          "שגוי: צירוף טבעי מחזיר סטודנטים שלמדו *לפחות* קורס חובה אחד, ולא את אלו שלמדו את כולם.",
      },
      {
        id: "db-q03-opt3",
        plainText:
          "$\\pi_{student\\_id}(Takes) \\cap \\pi_{course\\_id}(Mandatory)$",
        isCorrect: false,
        explanation:
          "שגוי: פעולת חיתוך אינה חוקית בין תכונות בעלות דומיינים שונים ($student\\_id$ מול $course\\_id$).",
      },
      {
        id: "db-q03-opt4",
        plainText:
          "$\\sigma_{course\\_id = \\text{all}}(Takes)$",
        isCorrect: false,
        explanation:
          "שגוי: אופרטור הבחירה $\\sigma$ בודק תנאי לוגי על שורה בודדת ואינו יכול להשוות מול קבוצה שלמה של שורות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "db-q04-concurrency-2pl-deadlock-cascading",
    domain: "בקרת מקביליות ופרוטוקול נעילה דו-שלבי (2PL)",
    title:
      "בסיסי נתונים - בקרת מקביליות ופרוטוקול נעילה דו-שלבי (2PL)",
    context:
      "משווים בין שלושה פרוטוקולי נעילה: 2PL בסיסי, Strict 2PL, ו-Rigorous 2PL (Strong 2PL).",
    instruction:
      "איזו תכונה מהותית מובטחת על ידי Strict 2PL שאינה מובטחת על ידי 2PL הבסיסי?",
    options: [
      {
        id: "db-q04-opt1",
        plainText:
          "מניעה מוחלטת של מצבי קיפאון (Deadlock-free).",
        isCorrect: false,
        explanation:
          "שגוי: גם ב-Strict 2PL תיתכן המתנה מעגלית על מנעולים ועלולים להתרחש Deadlocks (הנפתרים באמצעות Wait-Die, Wound-Wait או גרף המתנה).",
      },
      {
        id: "db-q04-opt2",
        plainText:
          "מניעת ביטולים בשרשרת (Cascading Aborts / Rollbacks) ושמירה על סדר התאוששות קפדני (Strict Execution), משום שכל המנעולים הבלעדיים (X-locks) מוחזקים עד לסיום הטרנזקציה (Commit/Abort).",
        isCorrect: true,
        explanation:
          "נכון: ב-2PL בסיסי, טרנזקציה יכולה לשחרר מנעול כתיבה בשלב הכיווץ (Shrinking phase) לפני ביצוע Commit. אם טרנזקציה אחרת קוראת את הנתון שנכתב והטרנזקציה הראשונה מתבטלת, נוצר ביטול בשרשרת (Cascading Rollback). Strict 2PL אוסר שחרור מנעולי X עד ל-Commit/Abort, ובכך מבטיח שאף טרנזקציה לא תקרא נתון בלתי-מאושר (מונע Dirty Reads ומבטיח Strict Schedule).",
      },
      {
        id: "db-q04-opt3",
        plainText:
          "הבטחת סריאליזביליות של תצוגה (View Serializability) ללא סריאליזביליות של קונפליקט.",
        isCorrect: false,
        explanation:
          "שגוי: כל גרסאות 2PL מבטיחות Conflict Serializability, שהיא תנאי חזק יותר מ-View Serializability.",
      },
      {
        id: "db-q04-opt4",
        plainText:
          "ביטול הצורך ביומן רישום (Write-Ahead Logging).",
        isCorrect: false,
        explanation:
          "שגוי: נעילות מטפלות בבידוד (Isolation); יומן הרישום (WAL) נדרש תמיד להבטחת שרידות ואטומיות (Atomicity & Durability).",
      },
    ],
  },
  {
    id: "db-q05-query-optimization-hash-vs-sort-merge",
    domain: "ייעול שאילתות ועלות I/O של אלגוריתמי Join",
    title:
      "בסיסי נתונים - ייעול שאילתות ועלות I/O של אלגוריתמי Join",
    context:
      "נתונים שני יחסים: $R$ בעל $B_R = 1,000$ בלוקים, ו-$S$ בעל $B_S = 10,000$ בלוקים. גודל זיכרון המחשב הזמין ב-Buffer Pool הוא $M = 101$ בלוקים. מעוניינים לבצע צירוף טבעי $R \\bowtie S$.",
    formulaLatex: "\\text{Block Nested Loop: } B_R + \\left\\lceil \\frac{B_R}{M - 2} \\right\\rceil \\times B_S",
    instruction:
      "מהי עלות ה-I/O המינימלית (במספר קריאות בלוקים) הנדרשת לביצוע הצירוף באמצעות Block Nested Loop Join?",
    options: [
      {
        id: "db-q05-opt1",
        plainText:
          "$11,000$ גישות דיסק",
        isCorrect: false,
        explanation:
          "שגוי: $11,000$ גישות מושגות רק אם אחד היחסים נכנס במלואו לזיכרון בבת אחת ($B_R \\le M-2$), אך כאן $B_R = 1,000 > 99$.",
      },
      {
        id: "db-q05-opt2",
        plainText:
          "$111,000$ גישות דיסק (כאשר היחס הקטן $R$ משמש כיחס החיצוני בלולאה)",
        mathText: "1000 + \\left\\lceil \\frac{1000}{99} \\right\\rceil \\times 10000 = 1000 + 11 \\times 10000 = 111,000",
        isCorrect: true,
        explanation:
          "נכון: ב-Block Nested Loop Join, מקצים $M-2 = 99$ בלוקים לקריאת בלוקים מהיחס החיצוני, בלוק אחד לקריאת היחס הפנימי, ובלוק אחד לפלט. אם נבחר ב-$R$ כיחס החיצוני: נדרשים $\\lceil 1000/99 \\rceil = 11$ מעברים על כל היחס $S$. סך ה-I/O: קריאת $R$ פעם אחת ($1,000$) ועוד $11$ סריקות מלאות של $S$ ($11 \\times 10,000 = 110,000$), סך הכל $111,000$. (אילו בחרנו ב-$S$ כיחס החיצוני, העלות הייתה מזנקת למעלה ממיליון גישות).",
      },
      {
        id: "db-q05-opt3",
        plainText:
          "$1,001,000$ גישות דיסק",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה זו מתקבלת מבחירה שגויה של היחס הגדול $S$ כיחס החיצוני במקום $R$.",
      },
      {
        id: "db-q05-opt4",
        plainText:
          "$10,000,000$ גישות דיסק",
        isCorrect: false,
        explanation:
          "שגוי: זוהי עלות של Simple Nested Loop Join (השוואת רשומות בודדות ללא בלוקים).",
      },
    ],
  },
  {
    id: "db-q06-aries-recovery-steal-no-force",
    domain: "התאוששות מתקלות ואלגוריתם ARIES",
    title:
      "בסיסי נתונים - התאוששות מתקלות ואלגוריתם ARIES",
    context:
      "באלגוריתם ההתאוששות ARIES, מנהל הזיכרון פועל תחת מדיניות Steal / No-Force תוך שימוש ב-Write-Ahead Logging (WAL) עם מספרי LSN (Log Sequence Number).",
    instruction:
      "מה משמעות השילוב של מדיניות Steal ו-No-Force על פעולות ה-Recovery לאחר קריסה?",
    options: [
      {
        id: "db-q06-opt1",
        plainText:
          "המערכת אינה צריכה לבצע Undo ואינה צריכה לבצע Redo כלל בעת הדלקה מחדש.",
        isCorrect: false,
        explanation:
          "שגוי: היעדר Undo ו-Redo מתאפשר רק במדיניות No-Steal / Force (שהיא איטית ובלתי-יעילה ביותר לביצועי זמן ריצה).",
      },
      {
        id: "db-q06-opt2",
        plainText:
          "מדיניות Steal מחייבת שמירת רשומות Undo ביומן (כי שינויים של טרנזקציות שלא אושרו עלולים להיכתב לדיסק לפני Commit), ומדיניות No-Force מחייבת שמירת רשומות Redo (כי דפים מאושרים אינם נכתבים מיידית לדיסק).",
        isCorrect: true,
        explanation:
          "נכון: 1. Steal מתיר לפנות מסגרת זיכרון ולכתוב דף מלוכלך של טרנזקציה פעילה לדיסק לפני שהיא ביצעה Commit; לכן אם המערכת קורסת, חייבים לבצע Undo לשחזור הערך הישן. 2. No-Force אינו מחייב כתיבת כל הדפים המלוכלכים של טרנזקציה לדיסק בעת Commit (כדי להימנע מ-I/O אקראי אטי); לכן אם המערכת קורסת, שינויים מאושרים שנשארו ב-RAM חייבים להשתחזר באמצעות Redo מתוך היומן.",
      },
      {
        id: "db-q06-opt3",
        plainText:
          "מדיניות Steal מונעת קריסות חומרה, ומדיניות No-Force מכפילה את נפח ה-Buffer Pool.",
        isCorrect: false,
        explanation:
          "שגוי: אלו הגדרות שגויות; מדיניות זיכרון אינה מונעת קריסות פיזיות.",
      },
      {
        id: "db-q06-opt4",
        plainText:
          "אלגוריתם ARIES מבצע שלב Undo לפני שלב ה-Redo כדי לחסוך קריאות דיסק.",
        isCorrect: false,
        explanation:
          "שגוי: סדר השלבים ב-ARIES הוא קשיח: Analysis, לאחר מכן Redo (שחזור היסטוריה מלאה לרגע הקריסה), ורק לבסוף Undo (ביטול טרנזקציות פעילות).",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "db-q07-isolation-levels-anomalies-matrix",
    domain: "רמות בידוד ב-SQL (Isolation Levels) ואנומליות סנכרון",
    title:
      "בסיסי נתונים - רמות בידוד ב-SQL (Isolation Levels) ואנומליות סנכרון",
    context:
      "תקן SQL-92 מגדיר 4 רמות בידוד: Read Uncommitted, Read Committed, Repeatable Read, ו-Serializable, בהתאם לאנומליות שהן מונעות.",
    instruction:
      "איזו אנומליה מותרת תחת רמת הבידוד Repeatable Read, אך נמנעת לחלוטין תחת Serializable?",
    options: [
      {
        id: "db-q07-opt1",
        plainText:
          "קריאה מלוכלכת (Dirty Read - קריאת נתון שנכתב ע״י טרנזקציה שטרם ביצעה Commit).",
        isCorrect: false,
        explanation:
          "שגוי: קריאה מלוכלכת נמנעת כבר ברמת Read Committed ומעלה.",
      },
      {
        id: "db-q07-opt2",
        plainText:
          "קריאה בלתי-חוזרת (Non-repeatable Read - קריאת אותה שורה פעמיים וקבלת ערכים שונים עקב עדכון של טרנזקציה אחרת).",
        isCorrect: false,
        explanation:
          "שגוי: קריאה בלתי-חוזרת נמנעת כבר ברמת Repeatable Read ע״י נעילת השורות הקיימות שנשלפו.",
      },
      {
        id: "db-q07-opt3",
        plainText:
          "תופעת פנטום (Phantom Read - שאילתת טווח המבוצעת פעמיים ומחזירה שורות חדשות שנוספו על ידי טרנזקציה אחרת שביצעה Commit).",
        isCorrect: true,
        explanation:
          "נכון: Repeatable Read נועלת מנעולי שיתוף (S-locks) על השורות הבדידות שנקראו, אך אינה מונעת מטרנזקציות אחרות להכניס שורות *חדשות* (Inserts) העונות על תנאי הטווח של השאילתה. שורות חדשות אלו נקראות \"פנטומים\". רק רמת Serializable (באמצעות נעילת אינטרוולים - Predicate/Index-Range Locking) מונעת הופעת פנטומים לחלוטין.",
      },
      {
        id: "db-q07-opt4",
        plainText:
          "עדכון אבוד (Lost Update - דריסת נתונים שנכתבו במקביל).",
        isCorrect: false,
        explanation:
          "שגוי: עדכון אבוד נמנע בכל רמות הבידוד התקינות באמצעות נעילות כתיבה בלעדיות.",
      },
    ],
  },
  {
    id: "db-q08-sql-null-three-valued-logic",
    domain: "לוגיקה תלת-ערכית (3VL) וסמנטיקת ערכי NULL",
    title:
      "בסיסי נתונים - לוגיקה תלת-ערכית (3VL) וסמנטיקת ערכי NULL",
    context:
      "בטבלת עובדים $Employees(id, salary)$ קיימות שורות שבהן ערך המשכורת אינו ידוע ($salary \\text{ IS NULL}$). מתכנת מריץ את שתי השאילתות הבאות:",
    formulaLatex: "\\text{Q1: } \\text{SELECT COUNT(*) FROM Employees WHERE salary > 5000 OR salary } \\le 5000;",
    instruction:
      "האם התוצאה של שתי השאילתות תהיה זהה לסך כל השורות בטבלה (`SELECT COUNT(*) FROM Employees`), ומדוע?",
    options: [
      {
        id: "db-q08-opt1",
        plainText:
          "כן, לפי חוק השלישי הנמנע בלוגיקה מתמטית: הפסוק $P \\lor \\neg P$ הוא טאוטולוגיה שתמיד מחזירה TRUE.",
        isCorrect: false,
        explanation:
          "שגוי: ב-SQL מתקיימת לוגיקה תלת-ערכית (3VL: TRUE, FALSE, UNKNOWN), וחוק השלישי הנמנע אינו מתקיים עבור ערכי NULL.",
      },
      {
        id: "db-q08-opt2",
        plainText:
          "כן, משום שערך NULL מומר אוטומטית ל-0 בהשוואות מספריות.",
        isCorrect: false,
        explanation:
          "שגוי: NULL מייצג ערך חסר ואינו מומר ל-0; כל השוואה חשבונית מול NULL מניבה UNKNOWN.",
      },
      {
        id: "db-q08-opt3",
        plainText:
          "לא; עבור כל עובד עם משכורת NULL, שני התנאים ($salary > 5000$ ו-$salary \\le 5000$) מוערכים כ-UNKNOWN, והביטוי $UNKNOWN \\lor UNKNOWN$ הוא UNKNOWN; תנאי `WHERE` מסנן שורות כאלו והן לא ייספרו.",
        isCorrect: true,
        explanation:
          "נכון: לפי חוקי ה-3VL ב-SQL: כל השוואה מול NULL (כולל שוויון או אי-שוויון) מחזירה ערך אמת UNKNOWN. פסוק ה-`WHERE` דורש שערך התנאי הכולל יהיה TRUE באופן מוחלט כדי להעביר את השורה; ערך UNKNOWN נדחה (נחשב כ-False לצורך סינון). לכן עובדים ששכרם הוא NULL יושמטו משאילתה Q1, ומספר השורות שיוחזר יהיה קטן מ-`COUNT(*)`, אלא אם משתמשים במפורש ב-`salary IS NULL`.",
      },
      {
        id: "db-q08-opt4",
        plainText:
          "השאילתה תיכשל ותחזיר שגיאת זמן ריצה (Type Mismatch Exception).",
        isCorrect: false,
        explanation:
          "שגוי: השאילתה חוקית לחלוטין לפי תקן ה-SQL ואינה מייצרת שגיאה אלא מסננת שורות.",
      },
    ],
  },
  {
    id: "db-q09-conflict-serializability-precedence-graph",
    domain: "לוחות זמנים (Schedules) וגרף קדימויות",
    title:
      "בסיסי נתונים - לוחות זמנים (Schedules) וגרף קדימויות",
    context:
      "נתון לוח הזמנים (Schedule) הבא המכיל פעולות של שלוש טרנזקציות: $S: r_1(A); \\; r_2(A); \\; w_1(B); \\; w_2(A); \\; r_3(B); \\; w_3(C); \\; w_1(A);$.",
    formulaLatex: "S = r_1(A) \\, r_2(A) \\, w_1(B) \\, w_2(A) \\, r_3(B) \\, w_3(C) \\, w_1(A)",
    instruction:
      "מה ניתן לקבוע לגבי סריאליזביליות של קונפליקט (Conflict Serializability) עבור לוח זמנים $S$?",
    options: [
      {
        id: "db-q09-opt1",
        plainText:
          "הלוח הוא Conflict-Serializable, והסדר הסריאלי השקול היחיד הוא $T_1 \\to T_2 \\to T_3$.",
        isCorrect: false,
        explanation:
          "שגוי: בין $T_1$ ל-$T_2$ קיים קונפליקט הדדי היוצר מעגל בגרף הקדימויות.",
      },
      {
        id: "db-q09-opt2",
        plainText:
          "הלוח הוא Conflict-Serializable, והסדר הסריאלי השקול הוא $T_3 \\to T_1 \\to T_2$.",
        isCorrect: false,
        explanation:
          "שגוי: $T_3$ קוראת את $B$ לאחר ש-$T_1$ כותבת אותו, ולכן $T_1$ חייבת לקדום ל-$T_3$.",
      },
      {
        id: "db-q09-opt3",
        plainText:
          "הלוח אינו Conflict-Serializable, משום שגרף הקדימויות (Precedence Graph) מכיל מעגל בין $T_1$ ל-$T_2$ עקב הקונפליקטים על פריט הנתונים $A$.",
        isCorrect: true,
        explanation:
          "נכון: נזהה קשתות בגרף הקדימויות (פעולות קונפליקט של טרנזקציות שונות על אותו פריט נתונים שבהן לפחות אחת היא כתיבה): 1. $r_1(A)$ מופיע לפני $w_2(A) \\implies$ קשת $T_1 \\to T_2$. 2. $w_2(A)$ מופיע לפני $w_1(A) \\implies$ קשת $T_2 \\to T_1$. נוצר מעגל מכוון $T_1 \\rightleftarrows T_2$. משפט יסודי קובע שלוח זמנים הוא Conflict-Serializable אם ורק אם גרף הקדימויות הוא DAG (נטול מעגלים). לכן לוח זמנים זה אינו שקול לאף לוח סריאלי.",
      },
      {
        id: "db-q09-opt4",
        plainText:
          "הלוח אינו חוקי משום שאסור לשתי טרנזקציות לקרוא את אותו פריט נתונים $A$ בזמנים סמוכים.",
        isCorrect: false,
        explanation:
          "שגוי: שתי פעולות קריאה ($r_1(A), r_2(A)$) אינן בקונפליקט ואינן מפרות שום כלל מקביליות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "db-q10-cap-theorem-nosql-partition-tolerance",
    domain: "משפט CAP ומודל העקביות במערכות מבוזרות",
    title:
      "בסיסי נתונים - משפט CAP ומודל העקביות במערכות מבוזרות",
    context:
      "משפט CAP של אריק ברואר (Brewer's CAP Theorem) מנתח מערכות אחסון נתונים מבוזרות תחת שלושה מאפיינים: עקביות חזקה (Consistency - Linearizability), זמינות (Availability), ועמידות בפני חלוקת רשת (Partition Tolerance).",
    formulaLatex: "\\text{CAP: Choose at most 2 of } \\{C, A, P\\}",
    instruction:
      "מדוע במערכת מבוזרת הפועלת על גבי רשת תקשורת פיזית (כגון שרתי ענן) הבחירה המעשית האמיתית היא בין $CP$ לבין $AP$, ומדוע לא ניתן לבחור מערכת $CA$?",
    options: [
      {
        id: "db-q10-opt1",
        plainText:
          "משום שמערכות $CA$ אינן תומכות בשפת SQL אלא ב-NoSQL בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: משפט CAP הוא תאוריה מבוזרת של עקביות וזמני תקשורת ואינו קשור לתחביר השאילתות.",
      },
      {
        id: "db-q10-opt2",
        plainText:
          "משום שזמינות (Availability) מחייבת שימוש במבנה נתונים מסוג B+ Tree בודד.",
        isCorrect: false,
        explanation:
          "שגוי: אינדקסים מקומיים אינם מכתיבים את אופי ההסכמה (Consensus) המבוזרת ברשת.",
      },
      {
        id: "db-q10-opt3",
        plainText:
          "משום שמערכות $CA$ דורשות סינכרון שעונים אטומיים ברמת חומרה שאינם קיימים.",
        isCorrect: false,
        explanation:
          "שגוי: אף שעונים אטומיים (כמו ב-Google Spanner) אינם מונעים ניתוקי כבלים או נפילות מתגים ברשת.",
      },
      {
        id: "db-q10-opt4",
        plainText:
          "משום שחלוקות רשת וניתוקי תקשורת (Network Partitions) הם מאפיין פיזי בלתי-נמנע של רשתות בעולם האמיתי, ולכן כאשר מתרחש נתק, המערכת חייבת לבחור: לבטל זמינות כדי לשמור על עקביות ($CP$), או להחזיר נתונים לא-עדכניים כדי לשמור על זמינות ($AP$).",
        isCorrect: true,
        explanation:
          "נכון: ברשתות מחשבים פיזיות, ניתוקי תקשורת ואיבודי חבילות הם עובדת חיים בלתי נמנעת ($P$ אינו אופציה לבחירה אלא אילוץ קיים). כאשר הרשת מתפצלת לשני מקטעים שאינם רואים זה את זה, אם מתקבלת כתיבה בצד אחד: אם נאפשר אותה ונענה ב-Success, קריאה בצד השני תחזיר נתון ישן (ויתור על Consistency לטובת Availability - מערכת $AP$). אם נסרב לשרת קריאות או כתיבות עד לחידוש הקשר (ויתור על Availability לטובת Consistency - מערכת $CP$). לכן לא קיימת מערכת $CA$ טהורה בסביבה מבוזרת אמיתית.",
      },
    ],
  },
  {
    id: "db-q11-mvcc-snapshot-isolation-write-skew",
    domain: "בקרת מקביליות רב-גרסאות (MVCC) ואנומלית Write Skew",
    title:
      "בסיסי נתונים - בקרת מקביליות רב-גרסאות (MVCC) ואנומלית Write Skew",
    context:
      "מערכות בסיסי נתונים מודרניות רבות (PostgreSQL, Oracle) מממשות את רמת הבידוד Snapshot Isolation (SI) באמצעות Multi-Version Concurrency Control (MVCC).",
    formulaLatex: "\\text{Constraint: } x + y \\ge 0, \\quad T_1: \\text{if } x+y-100 \\ge 0 \\implies x \\mathrel{-}= 100, \\quad T_2: \\text{if } x+y-100 \\ge 0 \\implies y \\mathrel{-}= 100",
    instruction:
      "איזו אנומליה מפורסמת עלולה להתרחש תחת Snapshot Isolation שאינה מונעת אילוץ שלמות זה, על אף ששתיהן רואות תמונת מצב עקבית לחלוטין?",
    options: [
      {
        id: "db-q11-opt1",
        plainText:
          "אנומלית קריאה מלוכלכת (Dirty Read).",
        isCorrect: false,
        explanation:
          "שגוי: ב-MVCC קריאה תמיד פונה לגרסה מאושרת (Committed) מתמונת המצב, כך שקריאות מלוכלכות נמנעות תמיד.",
      },
      {
        id: "db-q11-opt2",
        plainText:
          "תופעת העדכון האבוד (Lost Update).",
        isCorrect: false,
        explanation:
          "שגוי: Snapshot Isolation מיישמת את כלל First-Committer-Wins (זיהוי קונפליקט כתיבה על אותו פריט בדיוק), ולכן דריסה של אותו פריט נחסמת.",
      },
      {
        id: "db-q11-opt3",
        plainText:
          "קיפאון חומרתי במעבד (CPU Latch Deadlock).",
        isCorrect: false,
        explanation:
          "שגוי: זהו כשל של ארכיטקטורת מעבד ולא אנומליה לוגית של מודל עקביות בטרנזקציות.",
      },
      {
        id: "db-q11-opt4",
        plainText:
          "אנומלית הטיית כתיבה (Write Skew), שבה שתי הטרנזקציות קוראות את אותם הנתונים החופפים אך כותבות לפריטים שונים ($T_1$ מעדכנת את $x$ ו-$T_2$ מעדכנת את $y$), וכך מפרות אילוץ גלובלי משותף.",
        isCorrect: true,
        explanation:
          "נכון: זוהי נקודת התורפה הקלאסית של Snapshot Isolation. נניח ש-$x=50, y=50$ והאילוץ הוא $x+y \\ge 0$. שתי הטרנזקציות רצות במקביל: $T_1$ קוראת $x=50, y=50$, רואה שסכומם 100, ומורידה 100 מ-$x$ ($x=-50$). בו-זמנית $T_2$ רואה את אותו Snapshot ומורידה 100 מ-$y$ ($y=-50$). מכיוון שכל טרנזקציה עדכנה פריט נתונים שונה ($x$ מול $y$), כלל ה-First-Committer-Wins אינו מזהה קונפליקט ושתי הטרנזקציות מבצעות Commit בהצלחה. המצב הסופי הוא $x=-50, y=-50 \\implies x+y = -100 < 0$, בניגוד לאילוץ. רק Serializable Snapshot Isolation (SSI) או נעילות מפורשות פותרות זאת.",
      },
    ],
  },
  {
    id: "db-q12-minimal-cover-armstrong-axioms",
    domain: "תלויות פונקציונליות וכיסוי קנוני מינימלי",
    title:
      "בסיסי נתונים - תלויות פונקציונליות וכיסוי קנוני מינימלי",
    context:
      "נתונה סכמת יחס עם קבוצת התלויות: $F = \\{ A \\to BC, \\; B \\to C, \\; A \\to B, \\; AB \\to C \\}$. אנו מחשבים כיסוי מינימלי (Minimal / Canonical Cover) $F_c$.",
    formulaLatex: "F_c \\equiv F, \\quad \\text{RHS is singleton, no redundant FDs, no extraneous attributes}",
    instruction:
      "מהו הכיסוי המינימלי הקנוני $F_c$ השקול לקבוצה $F$?",
    options: [
      {
        id: "db-q12-opt1",
        plainText:
          "$F_c = \\{ A \\to B, \\; A \\to C, \\; B \\to C, \\; AB \\to C \\}$",
        isCorrect: false,
        explanation:
          "שגוי: קבוצה זו עדיין מכילה תלויות מיותרות ($A \\to C$ נובעת מטרנזיטיביות) ותכונה מיותרת באגף שמאל ($B$ מיותר ב-$AB \\to C$).",
      },
      {
        id: "db-q12-opt2",
        plainText:
          "$F_c = \\{ A \\to BC \\}$",
        isCorrect: false,
        explanation:
          "שגוי: הכיסוי אינו שקול ל-$F$ משום שנשמטה התלות $B \\to C$ שלא ניתן להסיקה מ-$A \\to BC$ בלבד.",
      },
      {
        id: "db-q12-opt3",
        plainText:
          "$F_c = \\{ A \\to C, \\; B \\to C \\}$",
        isCorrect: false,
        explanation:
          "שגוי: מקבוצה זו לא ניתן לגזור את התלות $A \\to B$, ולכן היא אינה שקולה ל-$F$.",
      },
      {
        id: "db-q12-opt4",
        plainText:
          "$F_c = \\{ A \\to B, \\; B \\to C \\}$",
        mathText: "F_c = \\{ A \\to B, \\; B \\to C \\}",
        isCorrect: true,
        explanation:
          "נכון: שלבי מציאת כיסוי קנוני: 1. פירוק אגפי ימין ליחידים: $\\{A \\to B, A \\to C, B \\to C, A \\to B, AB \\to C\\}$. 2. הסרת כפילויות: $\\{A \\to B, A \\to C, B \\to C, AB \\to C\\}$. 3. הסרת תכונות זרות מאגף שמאל: ב-$AB \\to C$, מאחר ש-$A \\to B$, סגור של $A$ ללא $B$ הוא $A^+ = \\{A, B, C\\}$ ומכיל את $C$; לכן $B$ תכונה זרה וניתן להחליפה ב-$A \\to C$. 4. הסרת תלויות מיותרות: את $A \\to C$ ניתן להסיק טרנזיטיבית מ-$A \\to B$ ו-$B \\to C$, ולכן היא מיותרת. נותרנו עם הכיסוי המינימלי ההדוק: $\\{A \\to B, \\; B \\to C\\}$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_DATABASES_QUESTIONS =
  DATABASES_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from normalization / B+ Tree / relational division (Q1–3)
 * - 1 from 2PL / join I/O / ARIES (Q4–6)
 * - 1 from isolation / NULL 3VL / serializability / CAP / MVCC / FD cover (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleDatabasesOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = DATABASES_QUESTIONS.slice(0, 3);
  const groupB = DATABASES_QUESTIONS.slice(3, 6);
  const groupC = DATABASES_QUESTIONS.slice(6, 12);

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
