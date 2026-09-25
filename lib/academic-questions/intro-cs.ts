import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Introduction to Computer Science diagnostic bank (12Q).
 * Display name: "מבוא למדעי המחשב" — no institutional course codes / "ת" nicknames.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const INTRO_CS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 (סיבוכיות לולאות, מודל הזיכרון ומצביעים) — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "cs-q01-nested-loops-geometric-complexity",
    domain: "סיבוכיות זמן - לולאות",
    title: "מבוא למדעי המחשב - סיבוכיות זמן של לולאות מקוננות",
    context: "נתון קטע הקוד הבא התלוי בקלט בגודל $n \\ge 1$:",
    formulaLatex:
      "\\begin{aligned} &\\text{int count} = 0; \\\\ &\\text{for (int } i = 1; \\; i \\le n; \\; i *= 2) \\\\ &\\quad \\text{for (int } j = 0; \\; j < i; \\; j++) \\\\ &\\qquad \\text{count}++; \\end{aligned}",
    instruction:
      "מהי סיבוכיות זמן הריצה של הקטע במונחי $\\Theta$ הדוקים כפונקציה של $n$?",
    options: [
      {
        id: "cs-q01-opt1",
        plainText: "$\\Theta(n)$",
        mathText: "\\Theta(n)",
        isCorrect: true,
        explanation:
          "נכון: הלולאה החיצונית רצה על ערכי חזקות של 2: $i = 1, 2, 4, 8, \\dots, 2^{\\lfloor \\log_2 n \\rfloor}$. הלולאה הפנימית מבצעת בדיוק $i$ איטרציות בכל שלב. סך כל הפעולות הוא סכום של טור הנדסי: $\\sum_{k=0}^{\\lfloor \\log_2 n \\rfloor} 2^k = 2^{\\lfloor \\log_2 n \\rfloor + 1} - 1$. מכיוון ש-$2^{\\lfloor \\log_2 n \\rfloor} \\le n < 2^{\\lfloor \\log_2 n \\rfloor + 1}$, הסכום שווה ל-$2n - 1 = \\Theta(n)$. זוהי מלכודת קלאסית של לולאה כפולה שאינה $O(n \\log n)$.",
      },
      {
        id: "cs-q01-opt2",
        plainText: "$\\Theta(n \\log n)$",
        mathText: "\\Theta(n \\log n)",
        isCorrect: false,
        explanation:
          "שגוי: זוהי טעות נפוצה הנובעת מהכפלת מספר האיטרציות החיצוניות ($\\log n$) בחסם העליון של הלולאה הפנימית ($n$). בפועל, הלולאה הפנימית קצרה בהרבה ברוב הסיבובים וגדלה גאומטרית בלבד.",
      },
      {
        id: "cs-q01-opt3",
        plainText: "$\\Theta(n^2)$",
        mathText: "\\Theta(n^2)",
        isCorrect: false,
        explanation:
          "שגוי: הלולאה החיצונית אינה מתקדמת בצעדי $i++$ (שאז הסיבוכיות הייתה $\\Theta(n^2)$), אלא מוכפלת פי 2 בכל איטרציה.",
      },
      {
        id: "cs-q01-opt4",
        plainText: "$\\Theta(\\log n)$",
        mathText: "\\Theta(\\log n)",
        isCorrect: false,
        explanation:
          "שגוי: זהו רק מספר האיטרציות של הלולאה החיצונית, תוך התעלמות מוחלטת מהעבודה שנעשית בלולאה הפנימית.",
      },
    ],
  },
  {
    id: "cs-q02-pointer-pass-by-value",
    domain: "מצביעים ומודל זיכרון",
    title: "מבוא למדעי המחשב - מצביעים, העברה לפונקציות ומחסנית",
    context: "נתונה פונקציה המנסה להחליף בין שני מצביעים, והקוד הקורא לה:",
    formulaLatex:
      "\\begin{aligned} &\\text{void swapPtr(int *p, int *q) } \\{ \\\\ &\\quad \\text{int *temp = p; } p = q; \\; q = \\text{temp}; \\\\ &\\} \\\\ &\\text{int a = 10, b = 20; } \\\\ &\\text{int *pa = \\&a, *pb = \\&b; } \\\\ &\\text{swapPtr(pa, pb); } \\end{aligned}",
    instruction:
      "מה יהיו ערכי הביטויים $*pa$ ו-$*pb$ מיד לאחר סיום ביצוע הקריאה ל-$\\operatorname{swapPtr}(pa, pb)$?",
    options: [
      {
        id: "cs-q02-opt1",
        plainText:
          "$*pa == 10$ וגם $*pb == 20$ (המצביעים והערכים לא השתנו כלל).",
        isCorrect: true,
        explanation:
          "נכון: בשפת C העברת פרמטרים לפונקציה מתבצעת תמיד לפי ערך (Pass-by-value). הפונקציה מקבלת העתקים מקומיים של המצביעים על גבי מסגרת המחסנית (Stack Frame) שלה. ההשמה $p = q$ משנה רק את המשתנים המקומיים $p$ ו-$q$ של הפונקציה, בעוד שהמצביעים המקוריים $pa$ ו-$pb$ בפונקציה הקוראת נותרים ללא שינוי וממשיכים להצביע על $a$ ו-$b$. כדי לשנות את כיוון המצביעים המקוריים, היה נדרש להעביר מצביע כפול ($\\texttt{int **}$).",
      },
      {
        id: "cs-q02-opt2",
        plainText:
          "$*pa == 20$ וגם $*pb == 10$ (המצביעים החליפו ביניהם את כתובות היעד).",
        isCorrect: false,
        explanation:
          "שגוי: זוהי המלכודת האינטואיטיבית של מתכנתים מתחילים; המצביעים עצמם מועברים לפי ערך, ולכן שינוי כתובת היעד בתוך הפונקציה אינו משפיע על הקורא.",
      },
      {
        id: "cs-q02-opt3",
        plainText:
          "הפונקציה גורמת לשגיאת זמן ריצה (Segmentation Fault) עקב גישה לזיכרון ששוחרר.",
        isCorrect: false,
        explanation:
          "שגוי: הקוד חוקי לחלוטין תחבירית ומבצע פעולות על משתנים מקומיים חוקיים בלבד, ללא גישה לא חוקית לזיכרון.",
      },
      {
        id: "cs-q02-opt4",
        plainText:
          "הערכים בכתובות המקוריות הוחלפו כך ש-$a = 20$ ו-$b = 10$.",
        isCorrect: false,
        explanation:
          "שגוי: הפונקציה אינה מבצעת דה-רפרנס (Dereference, כלומר אין שימוש באופרטור $*p$), ולכן אין שינוי של ערכי המשתנים בזיכרון.",
      },
    ],
  },
  {
    id: "cs-q03-tail-recursion-call-stack",
    domain: "רקורסיה ומחסנית קריאות",
    title: "מבוא למדעי המחשב - רקורסיה ומודל מחסנית הקריאות",
    context: "נתונה פונקציה רקורסיבית לחישוב עצרת $n!$:",
    formulaLatex:
      "f(n) = \\begin{cases} 1 & n \\le 1 \\\\ n \\cdot f(n - 1) & n > 1 \\end{cases}",
    instruction:
      "מדוע פונקציה זו אינה רקורסיית זנב (Tail Recursive), ומהי ההשלכה של עובדה זו על צריכת הזיכרון במחסנית?",
    options: [
      {
        id: "cs-q03-opt1",
        plainText:
          "הפעולה האחרונה היא הכפל ב-$n$ ולא הקריאה הרקורסיבית, ולכן נדרש לשמור $O(n)$ מסגרות מחסנית בזיכרון עד סיום הרקורסיה.",
        mathText: "O(n) \\text{ Stack Frames}",
        isCorrect: true,
        explanation:
          "נכון: ברקורסיית זנב הקריאה הרקורסיבית חייבת להיות הפעולה האחרונה המוחלטת של הפונקציה ללא פעולות נוספות לאחריה. כאן, המחשב חייב להמתין לחזרת הערך מ-$f(n-1)$ כדי להכפילו ב-$n$, ולכן לא ניתן למחזר את מסגרת המחסנית ונוצר עומק מחסנית של $\\Theta(n)$ מסגרות קריאה.",
      },
      {
        id: "cs-q03-opt2",
        plainText:
          "הפונקציה היא כן רקורסיית זנב, וכל מהדר יבצע עליה אופטימיזציה לצריכת זיכרון קבועה של $O(1)$.",
        isCorrect: false,
        explanation:
          "שגוי: הקריאה הרקורסיבית אינה הפעולה האחרונה (הכפל ב-$n$ מתבצע אחריה), ולכן מהדר סטנדרטי אינו יכול לבצע Tail Call Elimination ללא שינוי מבנה הפונקציה עם אקומולטור.",
      },
      {
        id: "cs-q03-opt3",
        plainText:
          "הפונקציה אינה רקורסיית זנב משום שקיים בה תנאי עצירה ($n \\le 1$).",
        isCorrect: false,
        explanation:
          "שגוי: תנאי עצירה קיים בכל רקורסיה תקינה ואינו קשור להגדרת רקורסיית זנב.",
      },
      {
        id: "cs-q03-opt4",
        plainText:
          "מספר מסגרות הקריאה במחסנית הוא $\\Theta(\\log n)$ משום שהמספר קטן ב-1 בכל שלב.",
        isCorrect: false,
        explanation:
          "שגוי: ההפחתה ב-1 בכל שלב מייצרת שרשרת קריאות באורך מלא $n$, ולכן עומק המחסנית הוא ליניארי $\\Theta(n)$ ולא לוגריתמי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 (מניפולציית סיביות, אלגוריתמי מיון וניהול זיכרון) — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "cs-q04-bitwise-kernighan-algorithm",
    domain: "פעולות ברמת סיביות",
    title: "מבוא למדעי המחשב - פעולות ברמת סיביות (Bitwise Operations)",
    context:
      "נתונה הפונקציה הבאה המקבלת מספר שלם אי-שלילי $n$ בייצוג בינארי (משלים ל-2):",
    formulaLatex:
      "\\begin{aligned} &\\text{int countBits(unsigned int } n) \\{ \\\\ &\\quad \\text{int } c = 0; \\\\ &\\quad \\text{while } (n > 0) \\{ \\\\ &\\qquad n = n \\;\\&\\; (n - 1); \\\\ &\\qquad c++; \\\\ &\\quad \\} \\\\ &\\quad \\text{return } c; \\\\ &\\} \\end{aligned}",
    instruction:
      "מה מחשבת פונקציה זו, ומהי סיבוכיות הזמן שלה ביחס למספר הסיביות הדלוקות (סיביות שערכן 1) $k$?",
    options: [
      {
        id: "cs-q04-opt1",
        plainText:
          "היא בודקת אם המספר הוא חזקה של 2, ורצה תמיד ב-$O(1)$ פעולות לכל מספר.",
        isCorrect: false,
        explanation:
          "שגוי: הפעולה $n \\;\\&\\; (n-1) == 0$ אכן בודקת אם מספר הוא חזקה של 2, אך כאן מדובר בלולאה שסופרת איטרציות ולא בבדיקה יחידה.",
      },
      {
        id: "cs-q04-opt2",
        plainText:
          "היא סופרת את מספר הסיביות הדלוקות ($1$) בייצוג של $n$, וסיבוכיותה היא $\\Theta(k)$ איטרציות (כאשר $k$ הוא מספר האחדות בלבד).",
        mathText: "\\Theta(k) \\text{ iterations}",
        isCorrect: true,
        explanation:
          "נכון: זהו אלגוריתם בריאן קרניהאן (Brian Kernighan's Algorithm). הביטוי $n \\;\\&\\; (n - 1)$ מאפס בדיוק את הסיבית הדלוקה הימנית ביותר (ה-LSB שערכו 1) בכל איטרציה. לכן הלולאה מתבצעת בדיוק $k$ פעמים (כמספר הסיביות הדלוקות), ללא תלות במספר האפסים.",
      },
      {
        id: "cs-q04-opt3",
        plainText:
          "היא מחשבת את ערך החזקה הגבוהה ביותר של 2 המחלקת את $n$, ורצה ב-$\\Theta(\\log n)$ איטרציות תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: הפונקציה סופרת כמה פעמים נמחקה סיבית 1, ולכן היא מושפעת ממספר האחדות ולא מהמיקום של החזקה הגבוהה ביותר.",
      },
      {
        id: "cs-q04-opt4",
        plainText:
          "היא הופכת את סדר הסיביות של $n$ ורצה ב-$\\Theta(b)$ איטרציות, כאשר $b$ הוא גודל המשתנה בסיביות (למשל 32).",
        isCorrect: false,
        explanation:
          "שגוי: אלגוריתם נאיבי עם הזזות ימינה רץ כמספר הסיביות הכולל, אך אלגוריתם זה מדלג על רצפי אפסים ורץ רק כמספר האחדות.",
      },
    ],
  },
  {
    id: "cs-q05-sorting-stability-invariants",
    domain: "אלגוריתמי מיון - יציבות",
    title: "מבוא למדעי המחשב - יציבות באלגוריתמי מיון ואינווריאנטים",
    context:
      "אנו מעוניינים למיין מערך של רשומות סטודנטים המכילות ציון ושם. המערך כבר ממוין אלפביתית לפי שם, וכעת אנו ממיינים אותו לפי ציון.",
    instruction:
      "איזה מאלגוריתמי המיון הבאים מבטיח בוודאות שסדר השמות עבור סטודנטים בעלי אותו ציון יישמר (מיון יציב - Stable Sort), בסיבוכיות זמן של $O(n \\log n)$ במקרה הגרוע ביותר?",
    options: [
      {
        id: "cs-q05-opt1",
        plainText: "מיון ערימה (HeapSort)",
        isCorrect: false,
        explanation:
          "שגוי: מיון ערימה אינו מיון יציב; פעולת ה-Heapify והחלפת השורש עם האיבר האחרון משנה את הסדר היחסי בין איברים שווי ערך.",
      },
      {
        id: "cs-q05-opt2",
        plainText: "מיון מיזוג (MergeSort)",
        isCorrect: true,
        explanation:
          "נכון: מיון מיזוג הוא מיון יציב (בתנאי שבשלב המיזוג נותנים עדיפות לאיבר מהתת-מערך השמאלי במקרה של שוויון: $A[i] \\le A[j]$), והוא מבטיח סיבוכיות של $O(n \\log n)$ בכל המקרים (כולל המקרה הגרוע).",
      },
      {
        id: "cs-q05-opt3",
        plainText:
          "מיון מהיר (QuickSort) במימוש הסטנדרטי של חלוקת לומוטו או הואר",
        isCorrect: false,
        explanation:
          "שגוי: מיון מהיר במימושו הסטנדרטי אינו יציב (החלפות סביב ה-Pivot עלולות לשנות סדר יחסי), ובנוסף סיבוכיות המקרה הגרוע שלו היא $O(n^2)$.",
      },
      {
        id: "cs-q05-opt4",
        plainText: "מיון בחירה (SelectionSort)",
        isCorrect: false,
        explanation:
          "שגוי: מיון בחירה אינו יציב וסיבוכיותו היא $\\Theta(n^2)$ בכל המקרים.",
      },
    ],
  },
  {
    id: "cs-q06-dynamic-memory-realloc-leak",
    domain: "ניהול זיכרון דינמי",
    title: "מבוא למדעי המחשב - ניהול זיכרון דינמי ומלכודת realloc",
    context:
      "מתכנת כתב את שורת הקוד הבאה במטרה להגדיל מערך דינמי מוקצה בערימה (Heap):",
    formulaLatex: "ptr = (int *) realloc(ptr, new\\_size * sizeof(int));",
    instruction:
      "מהו הכשל החמור שעלול להתרחש אם הקצאת הזיכרון החדשה תיכשל ($\\operatorname{realloc}$ תחזיר $\\texttt{NULL}$)?",
    options: [
      {
        id: "cs-q06-opt1",
        plainText:
          "בלוק הזיכרון המקורי משוחרר אוטומטית על ידי מערכת ההפעלה, ולכן המשתנה $ptr$ הופך למצביע תלוי (Dangling Pointer).",
        isCorrect: false,
        explanation:
          "שגוי: לפי תקן שפת C, כאשר $\\operatorname{realloc}$ נכשלת, בלוק הזיכרון המקורי אינו משתחרר ונותר תקף ושלם בזיכרון.",
      },
      {
        id: "cs-q06-opt2",
        plainText:
          "מתרחשת דליפת זיכרון (Memory Leak), משום שהכתובת של הבלוק המקורי נדרסת ונאבדת עקב השמת ה-$\\texttt{NULL}$ לתוך $ptr$.",
        isCorrect: true,
        explanation:
          "נכון: אם $\\operatorname{realloc}$ נכשלת היא מחזירה $\\texttt{NULL}$, אך הבלוק המקורי נשאר שמור בערימה. ביצוע ההשמה הישירה ל-$ptr$ דורס את המצביע היחיד שהחזיק את כתובת הבלוק המקורי, ולכן לא ניתן יהיה לגשת אליו או לשחררו בעתיד באמצעות $\\operatorname{free}$ — זוהי דליפת זיכרון מובהקת. הפתרון הנכון הוא שימוש במצביע זמני.",
      },
      {
        id: "cs-q06-opt3",
        plainText:
          "הפונקציה תגרום מיידית לקריסת התוכנית (Crash) כבר במהלך ביצוע שורת ההשמה.",
        isCorrect: false,
        explanation:
          "שגוי: השמת $\\texttt{NULL}$ למצביע היא פעולה חוקית לחלוטין שאינה קורסת; הקריסה תתרחש רק אם המתכנת ינסה לבצע דה-רפרנס ל-$ptr$ בהמשך מבלי לבדוק אותו.",
      },
      {
        id: "cs-q06-opt4",
        plainText:
          "הקוד בטוח לחלוטין משום ש-$\\operatorname{realloc}$ מבטיחה שאם אין זיכרון פנוי היא תצמצם את גודל הבקשה עצמאית.",
        isCorrect: false,
        explanation:
          "שגוי: $\\operatorname{realloc}$ אינה מקצה \"חצי כמות\"; אם אין מספיק זיכרון רציף עבור הבקשה המלאה, היא נכשלת ומחזירה $\\texttt{NULL}$ בלבד.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 (מבני נתונים בסיסיים, מחרוזות ו-Struct Alignment) — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "cs-q07-floyd-cycle-detection",
    domain: "רשימות מקושרות",
    title: "מבוא למדעי המחשב - רשימות מקושרות ואלגוריתם פלויד",
    context:
      "נתונה רשימה מקושרת חד-כיוונית (Singly Linked List) באורך $n$ שבה ייתכן מעגל. מפעילים את אלגוריתם הצב והארנב של פלויד (Tortoise and Hare): המצביע האיטי מתקדם צעד אחד בכל שלב, והמצביע המהיר מתקדם 2 צעדים.",
    instruction:
      "מהן סיבוכיות הזמן וסיבוכיות המקום (זיכרון עזר נוסף) הנדרשות לגילוי קיום מעגל ברשימה באמצעות אלגוריתם זה?",
    options: [
      {
        id: "cs-q07-opt1",
        plainText:
          "זמן $O(n \\log n)$, ומקום נוסף $O(n)$ לשמירת הכתובות במערך גיבוב.",
        isCorrect: false,
        explanation:
          "שגוי: שימוש בטבלת גיבוב דורש זיכרון ליניארי, אך אלגוריתם פלויד תוכנן בדיוק כדי להימנע מכך.",
      },
      {
        id: "cs-q07-opt2",
        plainText: "זמן $O(n^2)$, ומקום נוסף $O(1)$.",
        isCorrect: false,
        explanation:
          "שגוי: המצביע המהיר סוגר את הפער במעגל בקצב של צעד אחד בכל סיבוב, ולכן המפגש מתרחש תוך פחות מסיבוב שלם אחד מרגע כניסת המצביע האיטי למעגל ($O(n)$ פעולות בלבד).",
      },
      {
        id: "cs-q07-opt3",
        plainText: "זמן $O(n)$, ומקום נוסף $O(1)$ בלבד.",
        mathText: "O(n) \\text{ Time}, \\quad O(1) \\text{ Space}",
        isCorrect: true,
        explanation:
          "נכון: אם קיים מעגל באורך $C \\le n$, מרגע שהצב נכנס למעגל, המרחק בין הארנב לצב גדל ב-1 מודולו $C$ בכל שלב. לכן הם ייפגשו תוך לכל היותר $C$ צעדים נוספים, סך הכל $O(n)$ פעולות זמן. מכיוון שמשתמשים רק בשני מצביעים עזר, סיבוכיות המקום היא $O(1)$ קבועה לחלוטין.",
      },
      {
        id: "cs-q07-opt4",
        plainText: "זמן $O(1)$, ומקום נוסף $O(n)$.",
        isCorrect: false,
        explanation:
          "שגוי: לא ניתן לזהות מעגל ברשימה באורך שרירותי בזמן קבוע $O(1)$ מבלי לסרוק את האיברים.",
      },
    ],
  },
  {
    id: "cs-q08-string-null-terminator-sizeof",
    domain: "מחרוזות ב-C",
    title: "מבוא למדעי המחשב - מחרוזות ב-C, התו המסיים ואופרטור sizeof",
    context:
      "נתונות שתי הצהרות על מערך ומצביע בשפת C על מערכת 64-bit:",
    formulaLatex:
      "\\begin{aligned} &\\text{char str1[] = \"Technion\"; } \\\\ &\\text{char *str2 = \"Technion\"; } \\end{aligned}",
    instruction:
      "מה יהיו ערכי הביטויים $\\operatorname{sizeof}(str1)$ ו-$\\operatorname{sizeof}(str2)$ בהתאמה?",
    options: [
      {
        id: "cs-q08-opt1",
        plainText:
          "$\\operatorname{sizeof}(str1) == 8$ וגם $\\operatorname{sizeof}(str2) == 8$",
        isCorrect: false,
        explanation:
          "שגוי: המילה Technion מכילה 8 תווים נראים, אך המערך מקצה מקום נוסף לתו המסיים (null terminator), ולכן גודלו הוא 9 בייטים.",
      },
      {
        id: "cs-q08-opt2",
        plainText:
          "$\\operatorname{sizeof}(str1) == 8$ וגם $\\operatorname{sizeof}(str2) == 4$",
        isCorrect: false,
        explanation:
          "שגוי: גם ספירת התווים שגויה (נשמט התו המסיים) וגם גודל מצביע במערכת 64-bit הוא 8 בייטים ולא 4.",
      },
      {
        id: "cs-q08-opt3",
        plainText:
          "$\\operatorname{sizeof}(str1) == 9$ וגם $\\operatorname{sizeof}(str2) == 8$",
        mathText:
          "\\operatorname{sizeof}(str1) = 9, \\quad \\operatorname{sizeof}(str2) = 8",
        isCorrect: true,
        explanation:
          "נכון: המערך $str1$ מאותחל עם המחרוזת ומכיל 8 אותיות בתוספת התו המסיים (סך הכל 9 תווים מסוג $\\texttt{char}$ שכל אחד גודלו 1 בייט), ולכן $\\operatorname{sizeof}(str1) == 9$. לעומת זאת, $str2$ הוא משתנה מצביע ($\\texttt{char *}$), ובארכיטקטורת 64-bit גודלו של כל מצביע בזיכרון הוא 8 בייטים.",
      },
      {
        id: "cs-q08-opt4",
        plainText:
          "$\\operatorname{sizeof}(str1) == 9$ וגם $\\operatorname{sizeof}(str2) == 9$",
        isCorrect: false,
        explanation:
          "שגוי: האופרטור $\\operatorname{sizeof}$ על מצביע מחזיר את גודל המצביע עצמו (8 בייטים) ולא את אורך המחרוזת שאליה הוא מצביע.",
      },
    ],
  },
  {
    id: "cs-q09-struct-alignment-padding",
    domain: "יישור זיכרון - Struct",
    title: "מבוא למדעי המחשב - יישור זיכרון (Struct Alignment & Padding)",
    context:
      "נתון מבנה (struct) בשפת C המוגדר בארכיטקטורת 64-bit סטנדרטית (יישור טבעי של טיפוסים לגודלם):",
    formulaLatex:
      "\\begin{aligned} &\\text{struct Data } \\{ \\\\ &\\quad \\text{char a; } \\\\ &\\quad \\text{int b; } \\\\ &\\quad \\text{short c; } \\\\ &\\}; \\end{aligned}",
    instruction:
      "בהנחה ש-$\\operatorname{sizeof}(\\texttt{char}) == 1$, $\\operatorname{sizeof}(\\texttt{short}) == 2$, $\\operatorname{sizeof}(\\texttt{int}) == 4$, מהו הגודל $\\operatorname{sizeof}(\\texttt{struct Data})$ בבייטים?",
    options: [
      {
        id: "cs-q09-opt1",
        plainText:
          "$7$ בייטים (סכום הגדלים הישיר $1 + 4 + 2$ ללא ריפוד).",
        isCorrect: false,
        explanation:
          "שגוי: המהדר מחייב יישור כתובות (Alignment) בהתאם למשתנה הגדול במבנה כדי לאפשר גישת חומרה יעילה, ולכן מוסיף בייטים של ריפוד (Padding).",
      },
      {
        id: "cs-q09-opt2",
        plainText: "$8$ בייטים",
        isCorrect: false,
        explanation:
          "שגוי: המשתנה $b$ דורש כתובת המתחלקת ב-4 ולכן נדרש ריפוד של 3 בייטים אחרי $a$, בנוסף ה-$\\texttt{short}$ והריפוד בסוף גורמים לגודל לחרוג מ-8.",
      },
      {
        id: "cs-q09-opt3",
        plainText: "$12$ בייטים",
        mathText: "12 \\text{ Bytes}",
        isCorrect: true,
        explanation:
          "נכון: החישוב לפי כללי היישור (Alignment): השדה $a$ תופס בייט אחד (היסט 0). השדה $\\texttt{int } b$ דורש יישור לכתובת המתחלקת ב-4, ולכן המהדר מוסיף 3 בייטי ריפוד בהיסטים 1–3, ו-$b$ ממוקם בהיסטים 4–7. השדה $\\texttt{short } c$ דורש יישור ל-2 וממוקם בהיסטים 8–9 (סך הכל 10 בייטים). כעת, גודל המבנה כולו חייב להיות כפולה של גודל האיבר המקסימלי (4 בייטים עבור ה-$\\texttt{int}$), ולכן מתווספים עוד 2 בייטי ריפוד בסוף (היסטים 10–11). סך הכל: 12 בייטים.",
      },
      {
        id: "cs-q09-opt4",
        plainText: "$16$ בייטים",
        isCorrect: false,
        explanation:
          "שגוי: יישור המבנה נעשה לפי הטיפוס המקסימלי בו שהוא $\\texttt{int}$ (4 בייטים), ולא לפי גודל מילה של 8 בייטים (מכיוון שאין במבנה מצביעים או $\\texttt{long}$/$\\texttt{double}$).",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 (משפט המאסטר, חסם תחתון למיונים ומערכים דינמיים) — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "cs-q10-master-theorem-extended-case",
    domain: "סיבוכיות - משפט המאסטר",
    title: "מבוא למדעי המחשב - משפט המאסטר ומקרי קצה בנוסחאות נסיגה",
    context:
      "נתונה נוסחת הנסיגה הבאה המתארת זמן ריצה של אלגוריתם \"הפרד ומשול\":",
    formulaLatex: "T(n) = 2 T\\left(\\frac{n}{2}\\right) + n \\log_2 n",
    instruction: "מהו הפתרון האסימפטוטי ההדוק עבור $T(n)$?",
    options: [
      {
        id: "cs-q10-opt1",
        plainText: "$T(n) = \\Theta(n)$",
        mathText: "T(n) = \\Theta(n)",
        isCorrect: false,
        explanation:
          "שגוי: שלב הפיצול והמיזוג דורש לבדו $n \\log n$ פעולות בכל שלב, ולכן הפתרון אינו יכול להיות ליניארי.",
      },
      {
        id: "cs-q10-opt2",
        plainText: "$T(n) = \\Theta(n \\log n)$",
        mathText: "T(n) = \\Theta(n \\log n)",
        isCorrect: false,
        explanation:
          "שגוי: זהו הפתרון של $T(n) = 2T(n/2) + n$ (כמו ב-MergeSort), שבו שלב המיזוג הוא $O(n)$ ולא $n \\log n$.",
      },
      {
        id: "cs-q10-opt3",
        plainText: "$T(n) = \\Theta(n^2)$",
        mathText: "T(n) = \\Theta(n^2)",
        isCorrect: false,
        explanation:
          "שגוי: הגידול האיטרטיבי של עץ הרקורסיה אינו ריבועי משום ש-$n \\log n$ אינו גדול פולינומית מ-$n^{\\log_2 2} = n$.",
      },
      {
        id: "cs-q10-opt4",
        plainText: "$T(n) = \\Theta(n \\log^2 n)$",
        mathText: "T(n) = \\Theta(n \\log^2 n)",
        isCorrect: true,
        explanation:
          "נכון: כאן $a = 2, b = 2 \\implies n^{\\log_b a} = n^{\\log_2 2} = n$. הפונקציה הלא-הומוגנית היא $f(n) = n \\log n = n^{\\log_b a} \\log^k n$ כאשר $k = 1$. לפי ההרחבה של מקרה 2 במשפט המאסטר, כאשר $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$, הפתרון הוא $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n) = \\Theta(n \\log^2 n)$. לחלופין, בעץ רקורסיה בעל $\\log n$ רמות, בכל רמה מושקעת עבודה של $n \\log n$, ולכן הסך הכולל הוא $n \\log^2 n$.",
      },
    ],
  },
  {
    id: "cs-q11-comparison-sort-decision-tree-bound",
    domain: "חסמים תחתונים למיון",
    title: "מבוא למדעי המחשב - מודל עץ ההכרעה וחסם תחתון למיון",
    context:
      "במודל עץ ההכרעה (Decision Tree Model) להשוואת איברים, כל צומת פנימי מייצג השוואה $A[i] \\le A[j]$ וכל עלה מייצג תמורה אפשרית של המערך.",
    formulaLatex:
      "2^h \\ge n! \\implies h \\ge \\log_2(n!) = \\Omega(n \\log n)",
    instruction:
      "מדוע אלגוריתם מיון מבוסס השוואות בלבד אינו יכול לפעול בסיבוכיות זמן של $O(n)$ במקרה הגרוע עבור מערך כללי בגודל $n$?",
    options: [
      {
        id: "cs-q11-opt1",
        plainText:
          "משום שכל פעולת השוואה בודדת של שני מספרים דורשת $O(\\log n)$ פעולות מעבד פנימיות.",
        isCorrect: false,
        explanation:
          "שגוי: במודל עץ ההכרעה ההנחה היא שהשוואה בין שני מספרים נעשית ב-$O(1)$ פעולות בסיסיות.",
      },
      {
        id: "cs-q11-opt2",
        plainText:
          "משום שחייבים לסרוק את כל המערך לפחות פעמיים כדי לוודא שאין איברים כפולים.",
        isCorrect: false,
        explanation:
          "שגוי: סריקת המערך פעמיים אורכת $2n = O(n)$ ואינה מונעת חסם ליניארי.",
      },
      {
        id: "cs-q11-opt3",
        plainText:
          "משום שקיימים בדיוק $2^n$ סידורים אפשריים שונים של המערך.",
        isCorrect: false,
        explanation:
          "שגוי: מספר התמורות האפשריות של $n$ איברים שונים הוא $n!$ (עצרת) ולא $2^n$.",
      },
      {
        id: "cs-q11-opt4",
        plainText:
          "משום שלמערך יש $n!$ תמורות אפשריות ולכן בעץ בינארי גובה העץ המינימלי חייב להיות $h \\ge \\log_2(n!) = \\Omega(n \\log n)$.",
        mathText: "h \\ge \\lceil \\log_2(n!) \\rceil = \\Omega(n \\log n)",
        isCorrect: true,
        explanation:
          "נכון: עץ הכרעה בינארי בעל גובה $h$ מכיל לכל היותר $2^h$ עלים. כדי שהאלגוריתם יוכל להבחין בין כל אחת מ-$n!$ התמורות האפשריות של הקלט, חייבים להתקיים לפחות $n!$ עלים שונים. לכן $2^h \\ge n! \\implies h \\ge \\log_2(n!)$. לפי קירוב סטירלינג, $\\log_2(n!) = \\Theta(n \\log n)$, ומאחר שגובה העץ מייצג את מספר ההשוואות במקרה הגרוע, החסם התחתון הוא $\\Omega(n \\log n)$.",
      },
    ],
  },
  {
    id: "cs-q12-dynamic-array-amortized-doubling",
    domain: "ניתוח לשיעורין",
    title: "מבוא למדעי המחשב - ניתוח לשיעורין (Amortized Analysis) והכפלת מערך",
    context:
      "מממשים מערך דינמי (בדומה ל-$\\texttt{std::vector}$ ב-C++). כאשר המערך מתמלא, מקצים מערך חדש ומעתיקים את האיברים. אנו משווים שתי אסטרטגיות להגדלת הקיבולת:",
    formulaLatex:
      "\\text{Strategy A: } C_{\\text{new}} = 2 \\cdot C_{\\text{old}}, \\quad \\text{Strategy B: } C_{\\text{new}} = C_{\\text{old}} + 100",
    instruction:
      "מהי הסיבוכיות לשיעורין (Amortized Complexity) של פעולת הכנסת איבר בודד ($\\texttt{push\\_back}$) בכל אחת משתי האסטרטגיות?",
    options: [
      {
        id: "cs-q12-opt1",
        plainText:
          "באסטרטגיה A הסיבוכיות לשיעורין היא $O(n)$, ובאסטרטגיה B היא $O(1)$.",
        isCorrect: false,
        explanation:
          "שגוי: התוצאה הפוכה לחלוטין; הגדלה קבועה גורמת למספר עצום של העתקות יקרות.",
      },
      {
        id: "cs-q12-opt2",
        plainText:
          "בשתי האסטרטגיות הסיבוכיות לשיעורין היא $O(1)$ משום שההעתקות מתרחשות לעיתים רחוקות.",
        isCorrect: false,
        explanation:
          "שגוי: באסטרטגיה B ההעתקה מתרחשת כל 100 איברים, ולכן בסדרה של $n$ איברים יש $n/100$ העתקות שעלותן הכוללת ריבועית $\\Theta(n^2)$.",
      },
      {
        id: "cs-q12-opt3",
        plainText:
          "בשתי האסטרטגיות הסיבוכיות לשיעורין היא $O(n)$ בגלל המקרה הגרוע של ההקצאה מחדש.",
        isCorrect: false,
        explanation:
          "שגוי: סיבוכיות לשיעורין (Amortized) מודדת ממוצע לאורך סדרת פעולות ולא את המקרה הגרוע של פעולה בודדת.",
      },
      {
        id: "cs-q12-opt4",
        plainText:
          "באסטרטגיה A הסיבוכיות לשיעורין היא $O(1)$, בעוד שבאסטרטגיה B היא $O(n)$.",
        mathText:
          "\\text{A: } O(1) \\text{ Amortized}, \\quad \\text{B: } O(n) \\text{ Amortized}",
        isCorrect: true,
        explanation:
          "נכון: באסטרטגיה A (הכפלה גאומטרית), עלות ההעתקות עבור $n$ איברים היא טור הנדסי $1 + 2 + 4 + \\dots + n = 2n = O(n)$. בחלוקה ל-$n$ פעולות מקבלים עלות ממוצעת לשיעורין של $O(1)$ לפעולה. לעומת זאת, באסטרטגיה B (הגדלה אריתמטית בקבוע $k$), עלות ההעתקות היא $k + 2k + 3k + \\dots + n = \\Theta(n^2/k)$. בחלוקה ל-$n$ פעולות, העלות הממוצעת לשיעורין היא $\\Theta(n)$ לפעולה בודדת.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_INTRO_CS_QUESTIONS = INTRO_CS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from basics (Q1–3): loops, pointers, recursion
 * - 1 from mid core (Q4–6): bits, sorting, memory
 * - 1 from advanced (Q7–12): lists, strings, alignment, master theorem, bounds, amortized
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleIntroCSOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupBasics = INTRO_CS_QUESTIONS.slice(0, 3);
  const groupAlgorithms = INTRO_CS_QUESTIONS.slice(3, 6);
  const groupAdvanced = INTRO_CS_QUESTIONS.slice(6, 12);

  if (
    groupBasics.length === 0 ||
    groupAlgorithms.length === 0 ||
    groupAdvanced.length === 0
  ) {
    return [];
  }

  const pickedA =
    groupBasics[Math.floor(Math.random() * groupBasics.length)];
  const pickedB =
    groupAlgorithms[Math.floor(Math.random() * groupAlgorithms.length)];
  const pickedC =
    groupAdvanced[Math.floor(Math.random() * groupAdvanced.length)];

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
