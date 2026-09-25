import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Introduction to Python Programming diagnostic bank (12Q).
 * Display name: "מבוא לתכנות בפייתון" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const PYTHON_PROGRAMMING_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 (mutability, Big-O, comprehensions) — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "py-q01-list-dict-mutability-aliasing",
    domain: "רשימות ומילונים - שינוי במקום והפניות",
    title: "מבוא לתכנות בפייתון - mutability של lists ו-dicts",
    context:
      "נתונים הקטעים הבאים המדגימים שיתוף אובייקטים (aliasing) בין משתנים:",
    formulaLatex:
      "\\begin{aligned} &a = [1, 2];\\; b = a;\\; b.append(3) \\\\ &d = \\{``x\": 1\\};\\; e = d;\\; e[``y\"] = 2 \\end{aligned}",
    instruction:
      "מה יהיו ערכי $a$ ו-$d$ לאחר ביצוע הקטעים, ומדוע?",
    options: [
      {
        id: "py-q01-opt1",
        plainText:
          "$a = [1, 2, 3]$ ו-$d = \\{``x\": 1, ``y\": 2\\}$, כי $\\texttt{list}$ ו-$\\texttt{dict}$ הם mutable והשמות מצביעים על אותו אובייקט בזיכרון.",
        isCorrect: true,
        explanation:
          "נכון: בפייתון שמות משתנים הם תוויות (labels) לאובייקטים. ההשמה $b = a$ ו-$e = d$ אינה מעתיקה את התוכן אלא יוצרת כינוי נוסף לאותו אובייקט. מכיוון ש-$\\texttt{list}$ ו-$\\texttt{dict}$ הם mutable, $\\texttt{append}$ ו-$\\texttt{e[``y\"] = 2}$ משנים את האובייקט במקום (in-place), ולכן השינוי נראה גם דרך $a$ ו-$d$.",
      },
      {
        id: "py-q01-opt2",
        plainText:
          "$a = [1, 2]$ ו-$d = \\{``x\": 1\\}$, כי פייתון מעתיקה תמיד את האובייקט בהשמה $b = a$.",
        isCorrect: false,
        explanation:
          "שגוי: העתקה עמוקה/שטחית אינה מתרחשת בהשמה רגילה; רק יצירה מפורשת ($\\texttt{list(a)}$, $\\texttt{a[:]}$, $\\texttt{copy.copy}$) יוצרת אובייקט חדש.",
      },
      {
        id: "py-q01-opt3",
        plainText:
          "$a$ משתנה אך $d$ נשאר ללא שינוי, כי מילונים הם immutable בפייתון.",
        isCorrect: false,
        explanation:
          "שגוי: מילונים הם mutable; דווקא $\\texttt{tuple}$ ו-$\\texttt{frozenset}$ הם immutable. ההשמה ל-$e[``y\"]$ משנה את אותו מילון.",
      },
      {
        id: "py-q01-opt4",
        plainText:
          "שני הקטעים יגרמו ל-$\\texttt{TypeError}$ כי לא ניתן לשנות אובייקטים אחרי יצירתם.",
        isCorrect: false,
        explanation:
          "שגוי: $\\texttt{TypeError}$ יופיע בניסיון לשנות immutable (למשל $t[0] = 1$ ל-$\\texttt{tuple}$), לא עבור $\\texttt{list.append}$ או השמה למילון.",
      },
    ],
  },
  {
    id: "py-q02-list-dict-set-operation-complexity",
    domain: "סיבוכיות פעולות על מבני נתונים",
    title: "מבוא לתכנות בפייתון - Big-O של פעולות על list/dict/set",
    context:
      "נתונים מבני הנתונים הסטנדרטיים של פייתון בגודל $n$, ונבדקות פעולות בודדות בממוצע (average case) תחת הנחות hashing תקינות.",
    formulaLatex:
      "\\text{ops: } \\texttt{list.append},\\; \\texttt{x in list},\\; \\texttt{dict[k]},\\; \\texttt{set.add}",
    instruction:
      "מהן סיבוכויות הזמן האסימפטוטיות הנכונות לפעולות אלה (ממוצע / amortized)?",
    options: [
      {
        id: "py-q02-opt1",
        plainText:
          "$\\texttt{list.append}$: $O(1)$ amortized; $\\texttt{x in list}$: $O(n)$; $\\texttt{dict[k]}$ ו-$\\texttt{set.add}$: $O(1)$ ממוצע.",
        mathText:
          "\\texttt{append}: O(1)_{\\mathrm{amort}},\\; \\texttt{in list}: O(n),\\; \\texttt{dict/set}: O(1)_{\\mathrm{avg}}",
        isCorrect: true,
        explanation:
          "נכון: רשימה דינמית מגדילה קיבולת גאומטרית ולכן $\\texttt{append}$ הוא $O(1)$ לשיעורין. חיפוש ליניארי ברשימה הוא $O(n)$. מילון וקבוצה מבוססי טבלת גיבוב (hash table) עם מקדם עומס חסום, ולכן גישה/הוספה בממוצע הן $\\Theta(1)$.",
      },
      {
        id: "py-q02-opt2",
        plainText:
          "כל ארבע הפעולות הן $O(1)$ כי פייתון ממומשת ב-$\\texttt{C}$ וכל מבנה נתונים הוא hashed.",
        isCorrect: false,
        explanation:
          "שגוי: רשימה היא מערך דינמי ולא טבלת גיבוב; בדיקת שייכות ברשימה דורשת סריקה ליניארית.",
      },
      {
        id: "py-q02-opt3",
        plainText:
          "$\\texttt{dict[k]}$ הוא $O(\\log n)$ כי מילונים ממומשים כעצי חיפוש מאוזנים.",
        isCorrect: false,
        explanation:
          "שגוי: מימוש $\\texttt{dict}$ ב-CPython הוא hash table (עם שמירת סדר הכנסה מאז 3.7), לא עץ מאוזן. עצי חיפוש יופיעו במבנים כמו $\\texttt{SortedDict}$ בספריות חיצוניות.",
      },
      {
        id: "py-q02-opt4",
        plainText:
          "$\\texttt{list.append}$ הוא תמיד $\\Theta(n)$ כי כל הוספה מעתיקה את כל האיברים.",
        isCorrect: false,
        explanation:
          "שגוי: ההעתקה מתרחשת רק בעת גדילת הקיבולת; בניתוח amortized על סדרת $n$ הוספות העלות הממוצעת היא $O(1)$.",
      },
    ],
  },
  {
    id: "py-q03-list-comprehension-scoping-semantics",
    domain: "Comprehensions - סמנטיקה והיקף",
    title: "מבוא לתכנות בפייתון - list comprehensions",
    context:
      "נבחן את הביטוי הבא בפייתון 3, כאשר $n = 5$ ו-$\\texttt{xs}$ היא רשימה באורך $n$:",
    formulaLatex:
      "\\texttt{ys = [x * x for x in xs if x \\% 2 == 0]}",
    instruction:
      "איזו טענה מתארת נכון את הסמנטיקה והסיבוכיות של הביטוי?",
    options: [
      {
        id: "py-q03-opt1",
        plainText:
          "נוצרת רשימה חדשה של ריבועי האיברים הזוגיים בלבד בזמן $O(n)$ ובמקום $O(k)$ כאשר $k$ הוא מספר הזוגיים; משתנה הלולאה $x$ אינו דולף להיקף החיצוני בפייתון 3.",
        mathText: "O(n)\\ \\text{time},\\ O(k)\\ \\text{space};\\ x\\ \\text{scoped}",
        isCorrect: true,
        explanation:
          "נכון: comprehension שקול ללולאה שבונה רשימה חדשה עם סינון. הסריקה היא ליניארית באורך הקלט. בפייתון 3 משתנה הלולאה של comprehension נשמר בהיקף זמני נפרד ואינו דולף החוצה (בניגוד לפייתון 2).",
      },
      {
        id: "py-q03-opt2",
        plainText:
          "הביטוי מחזיר generator lazy ולא רשימה, ולכן צריכת הזיכרון היא תמיד $O(1)$.",
        isCorrect: false,
        explanation:
          "שגוי: סוגריים מרובעים $[\\ldots]$ יוצרים $\\texttt{list}$; generator comprehension משתמש בסוגריים עגולים $(\\ldots)$.",
      },
      {
        id: "py-q03-opt3",
        plainText:
          "הסיבוכיות היא $O(n\\log n)$ כי comprehension ממיין תמיד את התוצאה לפני ההחזרה.",
        isCorrect: false,
        explanation:
          "שגוי: אין מיון מובנה ב-comprehension; הסדר נשמר לפי סדר הסריקה של $\\texttt{xs}$.",
      },
      {
        id: "py-q03-opt4",
        plainText:
          "בפייתון 3 משתנה $x$ נשאר בהיקף החיצוני עם הערך האחרון מהלולאה, כמו ב-$\\texttt{for}$ רגיל.",
        isCorrect: false,
        explanation:
          "שגוי: זו הייתה התנהגות פייתון 2; בפייתון 3 comprehension אינו מדליף את משתנה הלולאה להיקף החיצוני.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 (generators, recursion, OOP) — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "py-q04-generators-yield-lazy-evaluation",
    domain: "Generators ו-yield",
    title: "מבוא לתכנות בפייתון - generators ו-yield",
    context:
      "נתונה הפונקציה הבאה המייצרת את סדרת פיבונאצ׳י:",
    formulaLatex:
      "\\begin{aligned} &\\texttt{def fib():} \\\\ &\\quad \\texttt{a, b = 0, 1} \\\\ &\\quad \\texttt{while True:} \\\\ &\\quad\\quad \\texttt{yield a} \\\\ &\\quad\\quad \\texttt{a, b = b, a + b} \\end{aligned}",
    instruction:
      "מה מאפיין נכון את האובייקט שמוחזר מקריאה ל-$\\texttt{fib()}$?",
    options: [
      {
        id: "py-q04-opt1",
        plainText:
          "מוחזרת רשימה סופית של כל מספרי פיבונאצ׳י עד גבול קבוע מראש.",
        isCorrect: false,
        explanation:
          "שגוי: אין בניית רשימה; $\\texttt{yield}$ יוצר generator iterator שמחשב ערכים לפי דרישה.",
      },
      {
        id: "py-q04-opt2",
        plainText:
          "מוחזר generator lazy: כל קריאה ל-$\\texttt{next}$ ממשיכה מהמצב השמור ($\\texttt{a},\\texttt{b}$) בלי לבנות את כל הסדרה בזיכרון; צריכת הזיכרון היא $O(1)$ לכל ערך בודד.",
        mathText: "\\text{lazy generator},\\ O(1)\\ \\text{per value}",
        isCorrect: true,
        explanation:
          "נכון: פונקציה עם $\\texttt{yield}$ מחזירה אובייקט generator. המצב המקומי נשמר בין קריאות ל-$\\texttt{next}$, והחישוב הוא עציל (lazy). הלולאה האינסופית אינה רצה מראש — רק צעד אחד בכל שלב — ולכן הזיכרון לכל ערך בודד קבוע.",
      },
      {
        id: "py-q04-opt3",
        plainText:
          "הפונקציה תיכנס ללולאה אינסופית מיד בקריאה ל-$\\texttt{fib()}$ ותגרום ל-$\\texttt{RecursionError}$.",
        isCorrect: false,
        explanation:
          "שגוי: הקריאה ל-$\\texttt{fib()}$ רק יוצרת את ה-generator; גוף הפונקציה רץ רק בעת איטרציה. אין כאן רקורסיה כלל.",
      },
      {
        id: "py-q04-opt4",
        plainText:
          "אחרי קריאה אחת ל-$\\texttt{next(fib())}$ הסדרה מתממשת כולה כ-$\\texttt{tuple}$ בלתי ניתן לשינוי.",
        isCorrect: false,
        explanation:
          "שגוי: $\\texttt{next}$ מחזיר ערך בודד; המימוש המלא דורש צריכה מפורשת (למשל $\\texttt{list(islice(...))}$).",
      },
    ],
  },
  {
    id: "py-q05-recursion-depth-tail-call",
    domain: "רקורסיה ומחסנית קריאות",
    title: "מבוא לתכנות בפייתון - רקורסיה ומגבלת עומק",
    context:
      "נתונה פונקציה רקורסיבית לחישוב סכום $1+\\cdots+n$:",
    formulaLatex:
      "s(n) = \\begin{cases} 0 & n = 0 \\\\ n + s(n-1) & n > 0 \\end{cases}",
    instruction:
      "עבור $n$ גדול (למשל $n = 10^5$), מהי ההתנהגות הצפויה ב-CPython הסטנדרטי?",
    options: [
      {
        id: "py-q05-opt1",
        plainText:
          "המהדר יבצע Tail Call Optimization אוטומטית והזיכרון יהיה $O(1)$.",
        isCorrect: false,
        explanation:
          "שגוי: CPython אינו מבצע Tail Call Elimination; גם רקורסיית זנב אמיתית תצרוך מחסנית ליניארית.",
      },
      {
        id: "py-q05-opt2",
        plainText:
          "עומק המחסנית הוא $\\Theta(n)$, ולכן עבור $n$ גדול תופיע $\\texttt{RecursionError}$ כשחורגים מ-$\\texttt{sys.getrecursionlimit()}$ (ברירת מחדל כ-$10^3$).",
        mathText: "\\Theta(n)\\ \\text{stack} \\Rightarrow \\texttt{RecursionError}",
        isCorrect: true,
        explanation:
          "נכון: כל קריאה ממתינה לתוצאת $s(n-1)$ לפני החיבור, ולכן נדרשות $\\Theta(n)$ מסגרות. ב-CPython מגבלת העומק מוגדרת (ברירת מחדל בסביבות $1000$), ומעבר לה מעלה $\\texttt{RecursionError}$. פתרון מעשי: לולאה איטרטיבית או הגדלת המגבלה בזהירות.",
      },
      {
        id: "py-q05-opt3",
        plainText:
          "הסיבוכיות במחסנית היא $\\Theta(\\log n)$ כי $n$ קטן בחצי בכל שלב.",
        isCorrect: false,
        explanation:
          "שגוי: כאן $n$ קטן ב-1 בכל שלב, לא בחצי; העומק ליניארי.",
      },
      {
        id: "py-q05-opt4",
        plainText:
          "פייתון ממירה אוטומטית כל רקורסיה ללולאה בזמן קומפילציה ל-bytecode.",
        isCorrect: false,
        explanation:
          "שגוי: ה-bytecode של CPython שומר על קריאות פונקציה מפורשות; אין המרה אוטומטית לרקורסיה→איטרציה.",
      },
    ],
  },
  {
    id: "py-q06-oop-mro-new-style-classes",
    domain: "OOP בפייתון - MRO וירושה מרובה",
    title: "מבוא לתכנות בפייתון - OOP, MRO וירושה מרובה",
    context:
      "נתונות המחלקות הבאות בפייתון 3 (new-style):",
    formulaLatex:
      "\\begin{aligned} &\\texttt{class A: }\\; \\texttt{def f(self): return ``A''} \\\\ &\\texttt{class B(A): }\\; \\texttt{def f(self): return ``B''} \\\\ &\\texttt{class C(A): }\\; \\texttt{pass} \\\\ &\\texttt{class D(B, C): }\\; \\texttt{pass} \\end{aligned}",
    instruction:
      "מה יוחזר מ-$\\texttt{D().f()}$, ועל פי איזה עיקרון?",
    options: [
      {
        id: "py-q06-opt1",
        plainText:
          "$``A''$, כי תמיד נבחרת המחלקה הבסיסית העמוקה ביותר בעץ הירושה.",
        isCorrect: false,
        explanation:
          "שגוי: $B$ דורסת את $f$, ו-$B$ מופיעה לפני $A$ ב-MRO של $D$.",
      },
      {
        id: "py-q06-opt2",
        plainText:
          "$``B''$, לפי C3 linearization: $\\operatorname{MRO}(D) = [D, B, C, A, \\texttt{object}]$, ולכן $B.f$ נבחרת לפני $A.f$.",
        mathText: "\\operatorname{MRO}(D)=[D,B,C,A,\\texttt{object}]",
        isCorrect: true,
        explanation:
          "נכון: פייתון 3 משתמשת באלגוריתם C3 לליניאריזציית MRO. עבור יהלום $D\\to B,C\\to A$, הסדר הוא $D, B, C, A, \\texttt{object}$. חיפוש מתודות עובר על הסדר הזה, ולכן $B.f$ גוברת על $A.f$.",
      },
      {
        id: "py-q06-opt3",
        plainText:
          "תועלה $\\texttt{TypeError}$ כי ירושה מרובה אסורה בפייתון.",
        isCorrect: false,
        explanation:
          "שגוי: ירושה מרובה חוקית בפייתון; שגיאה תופיע רק אם ה-MRO אינו עקבי (C3 failure).",
      },
      {
        id: "py-q06-opt4",
        plainText:
          "$``C''$, כי בפייתון נבחרת תמיד המחלקה האחרונה ברשימת הבסיסים של $D$.",
        isCorrect: false,
        explanation:
          "שגוי: הסדר הוא משמאל לימין ברשימת הבסיסים, ואז המשך לפי C3; $B$ קודמת ל-$C$, ו-$C$ כלל לא מגדירה $f$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 (exceptions, NumPy, hashing) — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "py-q07-exceptions-else-finally-semantics",
    domain: "טיפול בחריגות",
    title: "מבוא לתכנות בפייתון - exceptions: else ו-finally",
    context:
      "נתון המבנה:",
    formulaLatex:
      "\\texttt{try / except / else / finally}",
    instruction:
      "מתי בדיוק רץ בלוק $\\texttt{else}$, ומה מובטח לגבי $\\texttt{finally}$?",
    options: [
      {
        id: "py-q07-opt1",
        plainText:
          "$\\texttt{else}$ רץ תמיד אחרי $\\texttt{except}$, ו-$\\texttt{finally}$ רץ רק אם לא הייתה חריגה.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך — $\\texttt{else}$ רץ כשלא נתפסה חריגה, ו-$\\texttt{finally}$ רץ תמיד (בכפוע ל-$\\texttt{os._exit}$ וכדומה).",
      },
      {
        id: "py-q07-opt2",
        plainText:
          "$\\texttt{else}$ ו-$\\texttt{finally}$ הם מילים נרדפות וניתן להחליף ביניהם.",
        isCorrect: false,
        explanation:
          "שגוי: תפקידיהם שונים לחלוטין — $\\texttt{else}$ לנתיב ההצלחה, $\\texttt{finally}$ לניקוי מובטח.",
      },
      {
        id: "py-q07-opt3",
        plainText:
          "$\\texttt{else}$ רץ אם ורק אם בלוק ה-$\\texttt{try}$ הסתיים ללא חריגה; $\\texttt{finally}$ רץ תמיד, גם אם יש $\\texttt{return}$ או חריגה ב-$\\texttt{try}$/$\\texttt{except}$.",
        isCorrect: true,
        explanation:
          "נכון: $\\texttt{else}$ מיועד לקוד שתלוי בהצלחת ה-$\\texttt{try}$ בלי להרחיב את אזור הלכידה. $\\texttt{finally}$ מבטיח שחרור משאבים; אם גם בו וגם ב-$\\texttt{try}$ יש חריגה, חריגת ה-$\\texttt{finally}$ היא הדומיננטית (עם שרשור בגרסאות חדשות).",
      },
      {
        id: "py-q07-opt4",
        plainText:
          "$\\texttt{finally}$ מדכא תמיד כל חריגה ומחזיר $\\texttt{None}$ בשקט.",
        isCorrect: false,
        explanation:
          "שגוי: חריגה שנוצרה ב-$\\texttt{try}$ ממשיכה להתפשט אחרי $\\texttt{finally}$, אלא אם $\\texttt{except}$ תפס אותה או ש-$\\texttt{finally}$ עצמו מעלה חריגה חדשה.",
      },
    ],
  },
  {
    id: "py-q08-numpy-broadcasting-rules",
    domain: "NumPy - Broadcasting",
    title: "מבוא לתכנות בפייתון - NumPy broadcasting בסיסי",
    context:
      "נתונים שני מערכים: $A$ בצורת $(3, 1)$ ו-$B$ בצורת $(1, 4)$. מבצעים $C = A + B$.",
    formulaLatex: "A.\\mathrm{shape}=(3,1),\\quad B.\\mathrm{shape}=(1,4)",
    instruction:
      "מהי צורת התוצאה $C$, ומהו העיקרון?",
    options: [
      {
        id: "py-q08-opt1",
        plainText:
          "הפעולה תיכשל ב-$\\texttt{ValueError}$ כי הממדים אינם זהים ממש.",
        isCorrect: false,
        explanation:
          "שגוי: broadcasting מתיר ממדים 1 להתמתח לממדים תואמים; אין דרישה לזהות מלאה של הצורות.",
      },
      {
        id: "py-q08-opt2",
        plainText:
          "התוצאה בצורת $(1, 1)$ לאחר כיווץ ממדים (squeeze) אוטומטי.",
        isCorrect: false,
        explanation:
          "שגוי: broadcasting מרחיב ממדים, אינו מכווץ אותם אוטומטית בפעולת חיבור.",
      },
      {
        id: "py-q08-opt3",
        plainText:
          "התוצאה בצורת $(3, 4)$: ממדים מיושרים מימין, ומימד בגודל 1 משודר (broadcast) למימד הנגדי.",
        mathText: "C.\\mathrm{shape}=(3,4)",
        isCorrect: true,
        explanation:
          "נכון: כללי broadcasting של NumPy מיישרים צורות מימין. עבור $(3,1)$ ו-$(1,4)$: במימד האחרון $1$ מול $4$ → $4$; במימד שלפניו $3$ מול $1$ → $3$. מתקבל מערך $(3,4)$ בלי העתקה מפורשת של הנתונים לכל תא לפני החישוב האלמנט-wise.",
      },
      {
        id: "py-q08-opt4",
        plainText:
          "התוצאה בצורת $(3, 1, 1, 4)$ כי NumPy תמיד משרשרת צורות (concatenate) לפני חיבור.",
        isCorrect: false,
        explanation:
          "שגוי: אין שרשור ממדים; יש הרחבה וירטואלית של מימדי יחידה בלבד.",
      },
    ],
  },
  {
    id: "py-q09-hashing-dict-keys-requirements",
    domain: "גיבוב ומפתחות מילון",
    title: "מבוא לתכנות בפייתון - hashing ומפתחות dict",
    context:
      "מנסים להשתמש באובייקטים שונים כמפתחות במילון $\\texttt{dict}$.",
    formulaLatex:
      "\\texttt{\\{ [1, 2]: ``a'' \\}}\\quad \\text{vs}\\quad \\texttt{\\{ (1, 2): ``a'' \\}}",
    instruction:
      "איזו טענה נכונה לגבי דרישות hashing למפתח?",
    options: [
      {
        id: "py-q09-opt1",
        plainText:
          "כל אובייקט בפייתון ניתן לגיבוב; $\\texttt{list}$ כמפתח חוקי לחלוטין.",
        isCorrect: false,
        explanation:
          "שגוי: $\\texttt{list}$ אינו hashable וניסיון כזה מעלה $\\texttt{TypeError}$.",
      },
      {
        id: "py-q09-opt2",
        plainText:
          "רק מספרים שלמים יכולים להיות מפתחות; מחרוזות ו-$\\texttt{tuple}$ אסורים.",
        isCorrect: false,
        explanation:
          "שגוי: מחרוזות, $\\texttt{tuple}$ של hashables, $\\texttt{frozenset}$ ועוד — כולם מפתחות חוקיים.",
      },
      {
        id: "py-q09-opt3",
        plainText:
          "המפתח חייב להיות hashable (לממש $\\texttt{\\_\\_hash\\_\\_}$ עקבי עם $\\texttt{\\_\\_eq\\_\\_}$ ולהיות immutable בסמנטיקה); לכן $\\texttt{(1,2)}$ חוקי ו-$\\texttt{[1,2]}$ אינו חוקי.",
        isCorrect: true,
        explanation:
          "נכון: טבלת גיבוב דורשת ש-$\\texttt{hash(k)}$ יהיה יציב לאורך חיי המפתח במילון. אובייקט mutable כמו $\\texttt{list}$ עלול להשתנות אחרי ההכנסה ולשבור את שלמות הטבלה, ולכן אינו hashable. $\\texttt{tuple}$ של ערכים hashable הוא immutable ולכן כשיר.",
      },
      {
        id: "py-q09-opt4",
        plainText:
          "$\\texttt{tuple}$ לעולם אינו hashable כי הוא יכול להכיל רשימות.",
        isCorrect: false,
        explanation:
          "שגוי: $\\texttt{tuple}$ הוא hashable אם ורק אם כל איבריו hashable; $\\texttt{(1, [2])}$ אינו, אך $\\texttt{(1, 2)}$ כן.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 (slicing, call-by-object, decorators) — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "py-q10-slicing-semantics-copy-stride",
    domain: "חיתוך רשימות (Slicing)",
    title: "מבוא לתכנות בפייתון - slicing של רשימות",
    context:
      "נתון $a = [0, 1, 2, 3, 4, 5]$ ומבצעים:",
    formulaLatex:
      "b = a[1:5:2];\\quad b[0] = 99",
    instruction:
      "מה יהיו ערכי $a$ ו-$b$ לאחר ההשמה, ומדוע?",
    options: [
      {
        id: "py-q10-opt1",
        plainText: "$a$ ו-$b$ שניהם $[99, 3]$ כי slice הוא view משותף כמו ב-NumPy.",
        isCorrect: false,
        explanation:
          "שגוי: ב-$\\texttt{list}$ של פייתון slice יוצר רשימה חדשה (עותק שטוח של ההפניות), לא view.",
      },
      {
        id: "py-q10-opt2",
        plainText:
          "$a = [0, 99, 2, 3, 4, 5]$ ו-$b = [99, 3]$, כי החיתוך משנה את המקור.",
        isCorrect: false,
        explanation:
          "שגוי: שינוי ב-$b$ אינו משנה את $a$; אין שיתוף מבני בין הרשימות לאחר slice.",
      },
      {
        id: "py-q10-opt3",
        plainText:
          "תועלה $\\texttt{IndexError}$ כי הצעד (stride) $2$ אינו חוקי בפייתון.",
        isCorrect: false,
        explanation:
          "שגוי: תחביר $a[\\textit{start}:\\textit{stop}:\\textit{step}]$ חוקי לחלוטין.",
      },
      {
        id: "py-q10-opt4",
        plainText:
          "$a$ נשאר $[0,1,2,3,4,5]$ ו-$b = [99, 3]$: החיתוך $a[1:5:2]$ יוצר רשימה חדשה $[1,3]$, ושינוי $b[0]$ אינו משפיע על $a$.",
        mathText: "a\\ \\text{unchanged},\\ b=[99,3]",
        isCorrect: true,
        explanation:
          "נכון: $a[1:5:2]$ בוחר אינדקסים $1,3$ (עד ולא כולל $5$, בצעד $2$) ובונה רשימה חדשה. זו העתקה שטחית של ההפניות לאיברים; השמה ל-$b[0]$ מחליפה הפניה ברשימה החדשה בלבד. (בניגוד ל-$\\texttt{numpy.ndarray}$ שבו slice הוא לעיתים view.)",
      },
    ],
  },
  {
    id: "py-q11-call-by-object-reference",
    domain: "העברת פרמטרים - Call by Object",
    title: "מבוא לתכנות בפייתון - call-by-object (sharing)",
    context:
      "נתונות שתי פונקציות:",
    formulaLatex:
      "\\begin{aligned} &\\texttt{def f(x):}\\; \\texttt{x.append(4)} \\\\ &\\texttt{def g(x):}\\; \\texttt{x = x + [4]} \\\\ &\\texttt{a=[1,2,3];}\\; \\texttt{f(a);}\\; \\texttt{b=[1,2,3];}\\; \\texttt{g(b)} \\end{aligned}",
    instruction:
      "מה יהיו $a$ ו-$b$ לאחר הקריאות?",
    options: [
      {
        id: "py-q11-opt1",
        plainText: "$a = [1,2,3]$ ו-$b = [1,2,3,4]$ כי פייתון היא pass-by-value תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך כאן — $f$ משנה את $a$ במקום, בעוד $g$ אינו משנה את $b$.",
      },
      {
        id: "py-q11-opt2",
        plainText: "$a = b = [1,2,3,4]$ כי כל השמה לפרמטר מעדכנת את הקורא.",
        isCorrect: false,
        explanation:
          "שגוי: השמה לפרמטר המקומי $x$ ב-$g$ רק מחברת מחדש את התווית המקומית לאובייקט חדש.",
      },
      {
        id: "py-q11-opt3",
        plainText:
          "שתי הקריאות יגרמו ל-$\\texttt{UnboundLocalError}$.",
        isCorrect: false,
        explanation:
          "שגוי: הקוד חוקי; אין גישה למשתנה מקומי לפני השמה בעייתית.",
      },
      {
        id: "py-q11-opt4",
        plainText:
          "$a = [1,2,3,4]$ ו-$b = [1,2,3]$: מועברת הפניה לאובייקט (call-by-object-sharing); $\\texttt{append}$ משנה במקום, בעוד $x = x + [4]$ יוצר אובייקט חדש מקומי בלבד.",
        isCorrect: true,
        explanation:
          "נכון: פייתון מעבירה הפניות לאובייקטים (לעיתים נקרא call-by-sharing). מוטציה של האובייקט הנכנס נראית לקורא; Rebound של שם הפרמטר המקומי אינו משנה את השם בקורא. $x + [4]$ בונה רשימה חדשה ומשאיר את $b$ ללא שינוי.",
      },
    ],
  },
  {
    id: "py-q12-decorators-closures-basics",
    domain: "Decorators ו-Closures",
    title: "מבוא לתכנות בפייתון - decorators ו-closures בסיסיים",
    context:
      "נתון הדקורטור:",
    formulaLatex:
      "\\begin{aligned} &\\texttt{def once(f):} \\\\ &\\quad \\texttt{cache = \\{\\}} \\\\ &\\quad \\texttt{def wrapper(*a):} \\\\ &\\quad\\quad \\texttt{if ``v'' not in cache: cache[``v''] = f(*a)} \\\\ &\\quad\\quad \\texttt{return cache[``v'']} \\\\ &\\quad \\texttt{return wrapper} \\end{aligned}",
    instruction:
      "מהו התפקיד של $\\texttt{cache}$, ומה קורה ב-$\\texttt{@once}\\;\\texttt{def h(x): return x+1}$ ואז $h(1);\\; h(99)$?",
    options: [
      {
        id: "py-q12-opt1",
        plainText:
          "$\\texttt{cache}$ הוא משתנה גלובלי משותף לכל הדקורטורים במודול, ולכן $h(99)$ יחזיר $100$.",
        isCorrect: false,
        explanation:
          "שגוי: $\\texttt{cache}$ הוא משתנה בהיקף של $\\texttt{once}$ — closure פר-עטיפה, לא גלובלי לכל המודול.",
      },
      {
        id: "py-q12-opt2",
        plainText:
          "הדקורטור נכשל כי אי-אפשר לסגור (close over) על מילון mutable.",
        isCorrect: false,
        explanation:
          "שגוי: closure יכול לסגור על אובייקטים mutable; זו תבנית נפוצה למטמון.",
      },
      {
        id: "py-q12-opt3",
        plainText:
          "שתי הקריאות מריצות את $h$ מחדש, כי decorators בפייתון הם רק סוכר תחבירי ללא השפעה בזמן ריצה.",
        isCorrect: false,
        explanation:
          "שגוי: $\\texttt{@once}$ שקול ל-$h = \\texttt{once}(h)$ ומחליף את הפונקציה ב-$\\texttt{wrapper}$ פעיל.",
      },
      {
        id: "py-q12-opt4",
        plainText:
          "$\\texttt{cache}$ הוא closure מקומי של העטיפה: $h(1)$ מחשב $2$ ושומר; $h(99)$ מחזיר שוב $2$ בלי לקרוא ל-$f$, כי התוצאה הראשונה ממולאת במטמון.",
        mathText: "h(1)=h(99)=2\\ \\text{(cached)}",
        isCorrect: true,
        explanation:
          "נכון: $\\texttt{wrapper}$ סוגר על המילון $\\texttt{cache}$ מההיקף החיצוני של $\\texttt{once}$. אחרי החישוב הראשון המפתח $``v''$ קיים, ולכן קריאות הבאות מחזירות את הערך השמור בהתעלם מהארגומנטים — זו תמצית רעיון הדקורטור כהרכבת פונקציות עם מצב.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_PYTHON_QUESTIONS = PYTHON_PROGRAMMING_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from mutability / Big-O / comprehensions (Q1–3)
 * - 1 from generators / recursion / OOP (Q4–6)
 * - 1 from exceptions / NumPy / hashing / slicing / call-by-object / decorators (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function samplePythonProgrammingOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupBasics = PYTHON_PROGRAMMING_QUESTIONS.slice(0, 3);
  const groupMid = PYTHON_PROGRAMMING_QUESTIONS.slice(3, 6);
  const groupAdvanced = PYTHON_PROGRAMMING_QUESTIONS.slice(6, 12);

  if (
    groupBasics.length === 0 ||
    groupMid.length === 0 ||
    groupAdvanced.length === 0
  ) {
    return [];
  }

  const pickedA =
    groupBasics[Math.floor(Math.random() * groupBasics.length)];
  const pickedB = groupMid[Math.floor(Math.random() * groupMid.length)];
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
