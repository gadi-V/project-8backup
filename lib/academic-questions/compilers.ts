import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic קומפילציה ושפות תכנות diagnostic bank (12Q).
 * Display name: "קומפילציה ושפות תכנות" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const COMPILERS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "comp-q01-dfa-minimization-hopcroft",
    domain: "ניתוח לקסיקלי וצמצום אוטומטים (DFA Minimization)",
    title: "קומפילציה - ניתוח לקסיקלי וצמצום אוטומטים (DFA Minimization)",
    context: "בשלב הניתוח הלקסיקלי, בונים אוטומט דטרמיניסטי מינימלי (Minimal DFA) עבור שפת מזהים לפי אלגוריתם הופקרופט (Hopcroft's Algorithm) לחלוקת מצבים למחלקות שקילות.",
    formulaLatex: "P_{k+1} = \\text{split}(P_k, a), \\quad p \\sim q \\iff \\forall w \\in \\Sigma^*: (\\hat{\\delta}(p, w) \\in F \\iff \\hat{\\delta}(q, w) \\in F)",
    instruction: "מהו התנאי ההכרחי והמספיק לכך ששני מצבים $p, q$ ב-DFA שלם ללא מצבים בלתי-נגישים ימוזגו לאותו מצב באוטומט המינימלי?",
    options: [
      {
        id: "comp-q01-opt1",
        plainText: "המצבים $p$ ו-$q$ שקולים לפי מייהיל-נירוד ($p \\sim q$): לכל מילה $w \\in \\Sigma^*$, הריצה מ-$p$ והריצה מ-$q$ תחת $w$ מסתיימות שתיהן במצב מקבל או ששתיהן מסתיימות במצב דוחה.",
        isCorrect: true,
        explanation: "נכון: לפי משפט מייהיל-נירוד, האוטומט המינימלי מכיל מצב יחיד לכל מחלקת שקילות של יחס אי-ההבחנה. שני מצבים $p, q$ ניתנים למיזוג אם ורק אם הם בלתי ניתנים להבחנה (Indistinguishable), כלומר אין שום מילת סיומת $w$ שמפרידה ביניהם (מביאה אחד למצב מקבל ואת השני למצב דוחה). אלגוריתם הופקרופט מפריד תחילה בין מקבלים ללא-מקבלים ומעדכן את החלוקה עד לנקודת שבת בזמן $O(|\\Sigma| |Q| \\log |Q|)$."
      },
      {
        id: "comp-q01-opt2",
        plainText: "לשני המצבים יש בדיוק את אותן הקשתות הנכנסות מאותם המצבים בגרף.",
        isCorrect: false,
        explanation: "שגוי: שקילות מצבים נקבעת על פי התנהגות עתידית (קשתות יוצאות ומילים מתקבלות מכאן והלאה) ולא על פי ההיסטוריה של הקשתות הנכנסות."
      },
      {
        id: "comp-q01-opt3",
        plainText: "שני המצבים שייכים למעגל פנימי באוטומט המכיל מילת ריק ($\\epsilon$-transition).",
        isCorrect: false,
        explanation: "שגוי: ב-DFA אין מעברי $\\epsilon$ כלל, וקיום מעגל אינו מעיד על שקילות."
      },
      {
        id: "comp-q01-opt4",
        plainText: "מספר המעברים היוצאים משני המצבים שווה למספר המצבים המקבלים באוטומט.",
        isCorrect: false,
        explanation: "שגוי: ב-DFA שלם מכל מצב יוצא בדיוק מעבר אחד לכל אות באלפבית ($|\\Sigma|$ מעברים), ללא קשר לשקילות."
      }
    ]
  },
  {
    id: "comp-q02-ll1-grammar-first-follow-conflict",
    domain: "ניתוח תחבירי Top-Down ותנאי דקדוק LL(1)",
    title: "קומפילציה - ניתוח תחבירי Top-Down ותנאי דקדוק LL(1)",
    context: "נתון הדקדוק חסר ההקשר הבא מעל הטרמינלים $\\{a, b, c\\}$:",
    formulaLatex: "\\begin{aligned} &S \\to A b \\mid B c \\\\ &A \\to a \\mid \\epsilon \\\\ &B \\to a \\mid \\epsilon \\end{aligned}",
    instruction: "מדוע דקדוק זה **אינו** דקדוק מסוג LL(1)?",
    options: [
      {
        id: "comp-q02-opt1",
        plainText: "קיימת התנגשות בטבלת ה-LL(1): עבור הטרמינל $a$, קבוצות ה-FIRST של שני הכללים של $S$ אינן זרות ($\\text{FIRST}(Ab) \\cap \\text{FIRST}(Bc) = \\{a\\} \\neq \\emptyset$), ולכן המנתח אינו יודע איזה כלל לפרוש על סמך האות הבאה.",
        isCorrect: true,
        explanation: "נכון: תנאי הכרחי ומספיק לדקדוק LL(1) הוא שעבור כל משתנה $A$ עם חלופות $A \\to \\alpha_1 \\mid \\alpha_2$, קבוצות המבט קדימה שלהן יהיו זרות: $\\text{FIRST}(\\alpha_1 \\text{FOLLOW}(A)) \\cap \\text{FIRST}(\\alpha_2 \\text{FOLLOW}(A)) = \\emptyset$. כאן: $\\text{FIRST}(Ab) = \\text{FIRST}(A) \\setminus \\{\\epsilon\\} \\cup \\{b\\} = \\{a, b\\}$. באופן דומה: $\\text{FIRST}(Bc) = \\{a, c\\}$. החיתוך מכיל את $a$ (שתיהן יכולות להתחיל ב-$a$). בעת קריאת התו $a$ בראש הקלט, המנתח Top-Down אינו יכול להכריע איזה כלל להפעיל ללא התבוננות מעבר לתו אחד (Lookahead)."
      },
      {
        id: "comp-q02-opt2",
        plainText: "הדקדוק סובל מרקורסיה שמאלית ישירה (Left Recursion) במשתנה $S$.",
        isCorrect: false,
        explanation: "שגוי: אף כלל אינו מתחיל באותו משתנה של האגף השמאלי; אין כאן רקורסיה שמאלית."
      },
      {
        id: "comp-q02-opt3",
        plainText: "קבוצת ה-FOLLOW של המשתנה $S$ ריקה לחלוטין.",
        isCorrect: false,
        explanation: "שגוי: $S$ הוא משתנה הפתיחה, ולכן $\\text{FOLLOW}(S)$ מכיל תמיד את סמן סוף הקלט $\\{\\$\\}\\neq \\emptyset$."
      },
      {
        id: "comp-q02-opt4",
        plainText: "השפה שהדקדוק מייצר אינה שפה רגולרית.",
        isCorrect: false,
        explanation: "שגוי: השפה סופית לחלוטין ($\\{ab, b, ac, c\\}$) ולכן רגולרית מובהקת."
      }
    ]
  },
  {
    id: "comp-q03-lr-parsing-table-conflict-hierarchy",
    domain: "ניתוח תחבירי Bottom-Up והיררכיית מנתחי LR",
    title: "קומפילציה - ניתוח תחבירי Bottom-Up והיררכיית מנתחי LR",
    context: "משווים בין עוצמת המנתחים התחביריים: LR(0), SLR(1), LALR(1), ו-LR(1) קנוני.",
    formulaLatex: "\\text{LR}(0) \\subsetneq \\text{SLR}(1) \\subsetneq \\text{LALR}(1) \\subsetneq \\text{LR}(1)",
    instruction: "איזו מהטענות הבאות נכונה בהכרח לגבי מצבי האוטומט וההתנגשויות (Conflicts) במנתח LALR(1) בהשוואה ל-LR(1)?",
    options: [
      {
        id: "comp-q03-opt1",
        plainText: "LALR(1) ממזג מצבי LR(1) בעלי אותה ליבה (Core of Items); מיזוג זה לעולם אינו מייצר התנגשות Shift/Reduce חדשה, אך עלול לייצר התנגשות Reduce/Reduce שלא הייתה קיימת במקור.",
        isCorrect: true,
        explanation: "נכון: אוטומט LALR(1) נוצר מאיחוד כל המצבים באוטומט LR(1) הקנוני החולקים את אותה ליבת פריטים (LR(0) items) תוך איחוד קבוצות ה-Lookahead שלהם. משפט ידוע מוכיח שמיזוג כזה לעולם אינו מייצר התנגשות Shift/Reduce (אם הייתה קיימת התנגשות כזו ב-LALR, היא הייתה קיימת בהכרח באחד ממצבי ה-LR(1) המקוריים). אולם, מיזוג Lookaheads שונים עבור שני כללי צמצום נפרדים עשוי לייצר חפיפה בקבוצות המבט קדימה, ולחולל התנגשות Reduce/Reduce חדשה."
      },
      {
        id: "comp-q03-opt2",
        plainText: "LALR(1) מכיל מספר מצבים זהה בדיוק ל-LR(1) הקנוני, ורק טבלת ה-GOTO קטנה יותר.",
        isCorrect: false,
        explanation: "שגוי: כל יתרונו של LALR(1) הוא שמספר המצבים שלו קטן דרמטית מ-LR(1) וזהה בדיוק למספר המצבים המצומצם של LR(0)/SLR(1)."
      },
      {
        id: "comp-q03-opt3",
        plainText: "LALR(1) חזק מ-LR(1) הקנוני ומסוגל לנתח כל דקדוק שאינו מעורפל.",
        isCorrect: false,
        explanation: "שגוי: LR(1) חזק ממש מ-LALR(1); קיימים דקדוקי LR(1) שאינם LALR(1)."
      },
      {
        id: "comp-q03-opt4",
        plainText: "מיזוג המצבים ב-LALR(1) גורר בהכרח התנגשויות Shift/Reduce בלבד.",
        isCorrect: false,
        explanation: "שגוי: התנגשויות Shift/Reduce אינן נוצרות במיזוג ליבות; רק התנגשויות Reduce/Reduce עלולות להיווצר."
      }
    ]
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "comp-q04-s-attributed-vs-l-attributed-sdd",
    domain: "תרגום מונחה-תחביר (SDD) ותכונות מורשות מול מסונתזות",
    title: "קומפילציה - תרגום מונחה-תחביר (SDD) ותכונות מורשות מול מסונתזות",
    context: "בהגדרת תרגום מונחה-תחביר (Syntax-Directed Definition - SDD), כללים סמנטיים מחשבים תכונות (Attributes) של צמתים בעץ הגזירה.",
    formulaLatex: "A \\to X_1 X_2 \\dots X_k, \\quad X_i.s = f(A.i, X_1.s, \\dots, X_{i-1}.s)",
    instruction: "מהו ההבדל המבני בין SDD מסוג S-attributed לבין SDD מסוג L-attributed, וכיצד הוא מוכתב באלגוריתם הניתוח?",
    options: [
      {
        id: "comp-q04-opt1",
        plainText: "S-attributed משתמש אך ורק בתכונות מורשות (Inherited), ולכן מחייב מעבר סדרתי משמאל לימין מלמעלה למטה.",
        isCorrect: false,
        explanation: "שגוי: S-attributed מוגדר כשימוש בתכונות מסונתזות (Synthesized) בלבד, ללא תכונות מורשות."
      },
      {
        id: "comp-q04-opt2",
        plainText: "S-attributed מכיל תכונות מסונתזות בלבד (ניתן להערכה מלאה ב-Bottom-Up תוך כדי פעולות Reduce במחסנית); L-attributed מתיר גם תכונות מורשות, בתנאי שכל תכונה מורשת של צומת תלויה אך ורק בתכונות ההורה שלו או בתכונות של אֶחָיו משמאל בלבד.",
        isCorrect: true,
        explanation: "נכון: בהגדרה: 1. S-attributed מכיל אך ורק תכונות מסונתזות (ערך צומת תלוי בבניו בלבד). הוא מתאים באופן טבעי למנתחי LR (Bottom-Up), שכן בעת ביצוע צמצום (Reduce), כל ערכי הבנים כבר חושבו ונמצאים בראש המחסנית. 2. L-attributed מתיר תכונות מורשות (זרימת מידע מלמעלה למטה), אך אוסר תלות באחים מימין: תכונה מורשת של $X_i$ תלויה אך ורק ב-$A$ (ההורה) או ב-$X_1, \\dots, X_{i-1}$ (אחים משמאל). הדבר מבטיח שניתן להעריך את כל התכונות במעבר אחד משמאל לימין (Depth-First Left-to-Right), המתאים למנתחי Top-Down או שילוב מבוקר."
      },
      {
        id: "comp-q04-opt3",
        plainText: "כל הגדרה שהיא L-attributed היא בהכרח S-attributed.",
        isCorrect: false,
        explanation: "שגוי: היחס הפוך; מחלקת S-attributed מוכלת ממש ב-L-attributed (משום שתכונות מסונתזות מקיימות תמיד את תנאי L-attributed)."
      },
      {
        id: "comp-q04-opt4",
        plainText: "L-attributed מתיר תלויות מעגליות בין אחים ומחושב באמצעות מנוע SAT.",
        isCorrect: false,
        explanation: "שגוי: גרף התלויות של L-attributed הוא DAG נטול מעגלים המבטיח סדר טופולוגי חד-כיווני."
      }
    ]
  },
  {
    id: "comp-q05-ssa-form-phi-functions",
    domain: "ייצוג ביניים SSA (Static Single Assignment) ופונקציות $\\phi$",
    title: "קומפילציה - ייצוג ביניים SSA (Static Single Assignment) ופונקציות $\\phi$",
    context: "בייצוג ביניים מודרני מסוג SSA, כל משתנה מקבל ערך (מושם) בדיוק פעם אחת בקוד הסטטי. בנקודות מפגש של זרימת בקרה (Join points בגרף CFG), מוכנסות פונקציות $\\phi$ (Phi-functions).",
    formulaLatex: "x_3 = \\phi(x_1, x_2)",
    instruction: "היכן בדיוק ממוקמות פונקציות ה-$\\phi$ ב-CFG, וכיצד הן מומרות לקוד מכונה אמיתי בשלב פליטת הקוד?",
    options: [
      {
        id: "comp-q05-opt1",
        plainText: "פונקציות $\\phi$ ממוקמות בכל בלוק בסיסי ברשת, ומבוצעות ע״י פקודת חומרה ייעודית של המעבד.",
        isCorrect: false,
        explanation: "שגוי: מעבדים אינם כוללים פקודת חומרה מסוג $\\phi$; זהו מושג הפשטה סטטי של המהדר."
      },
      {
        id: "comp-q05-opt2",
        plainText: "פונקציות $\\phi$ מוכנסות בחזית השליטה (Dominance Frontier) של הבלוקים שבהם מתבצעות ההשמות; לקראת פליטת קוד מכונה, הן מסולקות (Out of SSA) ומומרות להוראות העתקה רגילות (`copy / mov`) בסוף הבלוקים המזינים.",
        isCorrect: true,
        explanation: "נכון: האלגוריתם הקלאסי של Cytron להצבת פונקציות $\\phi$ קובע כי אם משתנה $x$ מוגדר בבלוק $B$, פונקציית $\\phi$ נדרשת בכל בלוק השייך לחזית השליטה האיטרטיבית $DF^+(B)$ (נקודות המפגש שבהן השליטה של $B$ פוסקת). חומרת המעבד אינה מבינה פונקציית $\\phi$; לכן, בשלב סיום האופטימיזציות מפרקים את ה-SSA ע״י החלפת כל ארגומנט של $\\phi$ בפקודת `mov` פשוטה בסוף הבלוק המקדים התואם (Predecessor block), או ע״י שבירת קשתות קריטיות."
      },
      {
        id: "comp-q05-opt3",
        plainText: "פונקציות $\\phi$ משמשות רק לניהול חריגות (Exception Handling) ונמחקות בזמן קומפילציה ללא שום תחליף.",
        isCorrect: false,
        explanation: "שגוי: $\\phi$ מאחדת גרסאות של משתנים רגילים המגיעים ממסלולי if/else או לולאות, ומחיקתה ללא הוראות העתקה תשחית את הנתונים."
      },
      {
        id: "comp-q05-opt4",
        plainText: "הצבת פונקציות $\\phi$ דורשת זמן ריצה אקספוננציאלי ולכן אינה מיושמת במהדרי ייצור כגון LLVM או GCC.",
        isCorrect: false,
        explanation: "שגוי: חישוב Dominance Frontiers מתבצע בזמן כמעט ליניארי, וכל המהדרים המודרניים מבוססי SSA מלא."
      }
    ]
  },
  {
    id: "comp-q06-hindley-milner-type-inference-unification",
    domain: "הסקת טיפוסים ואלגוריתם האיחוד (Robinson Unification)",
    title: "קומפילציה - הסקת טיפוסים ואלגוריתם האיחוד (Robinson Unification)",
    context: "במערכת טיפוסים סטטית פונקציונלית (Hindley-Milner / Algorithm W), מסיקים טיפוסים אוטומטית ללא הצהרות מפורשות באמצעות יצירת משוואות שקילות ואלגוריתם איחוד (Unification).",
    formulaLatex: "\\tau_1 \\doteq \\tau_2, \\quad \\text{Unify}(\\alpha, \\tau) = [\\alpha \\mapsto \\tau] \\quad \\text{if } \\alpha \\notin \\text{free}(\\tau)",
    instruction: "מהו תפקידה של בדיקת ההתרחשות (Occurs Check) באלגוריתם האיחוד, ואיזו שגיאה היא מונעת?",
    options: [
      {
        id: "comp-q06-opt1",
        plainText: "היא בודקת שהמשתנה אינו מצביע ל-NULL, ומונעת קריסות של חריגת זיכרון.",
        isCorrect: false,
        explanation: "שגוי: הסקת טיפוסים פועלת על מבני תחביר מופשטים ולא על כתובות זיכרון."
      },
      {
        id: "comp-q06-opt2",
        plainText: "היא מוודאת שמשתנה הטיפוס $\\alpha$ אינו מופיע בתוך הביטוי $\\tau$ שאליו הוא מושווה ($\\alpha \\notin \\text{free}(\\tau)$), ובכך מונעת יצירת טיפוס מעגלי אינסופי (כגון $\\alpha = \\alpha \\to \\text{Int}$) שאינו בר-הגדרה במערכת.",
        isCorrect: true,
        explanation: "נכון: כאשר האלגוריתם מנסה לאחד משתנה טיפוס $\\alpha$ עם ביטוי טיפוס מורכב $\\tau$ (למשל בניסיון להסיק טיפוס עבור פונקציה שמפעילה את עצמה על עצמה: $\\lambda x. x x$), אם $\\alpha$ מוכל בתוך $\\tau$, החלפה תמימה תיצור טיפוס רקורסיבי אינסופי: $\\alpha = \\alpha \\to \\beta = (\\alpha \\to \\beta) \\to \\beta = \\dots$. ה-Occurs Check מזהה מעגליות זו, עוצרת את האיחוד ומדווחת על שגיאת טיפוסים (Type Error). (השמטת הבדיקה מטעמי ביצועים בפרולוג קלאסי גרמה ללולאות אינסופיות)."
      },
      {
        id: "comp-q06-opt3",
        plainText: "היא מוודאת שהפונקציה אינה מכילה משתנים גלובליים ללא שימוש.",
        isCorrect: false,
        explanation: "שגוי: בדיקת משתנים ללא שימוש נעשית באנליזת Dead Code ואינה קשורה לאיחוד טיפוסים."
      },
      {
        id: "comp-q06-opt4",
        plainText: "היא בודקת שכל המחלקות במערכת יורשות ממחלקת Object יחידה.",
        isCorrect: false,
        explanation: "שגוי: מערכת Hindley-Milner היא מערכת טיפוסים פרמטרית (Parametric Polymorphism) שאינה מבוססת על היררכיית עצמים."
      }
    ]
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "comp-q07-runtime-activation-records-static-links",
    domain: "סביבת זמן ריצה, מסגרות הפעלה (Stack Frames) וקשרים סטטיים",
    title: "קומפילציה - סביבת זמן ריצה, מסגרות הפעלה (Stack Frames) וקשרים סטטיים",
    context: "בשפה התומכת בפונקציות מקוננות (Nested Functions) וסקופ לקסיקלי סטטי (כגון Pascal או שמירת Closures), פונקציה פנימית עשויה לגשת למשתנים מקומיים של הפונקציה העוטפת אותה.",
    formulaLatex: "\\text{Frame Pointer (FP)} \\to [\\text{Return Addr}] \\; [\\text{Dynamic Link}] \\; [\\text{Static Link}] \\; [\\text{Locals}]",
    instruction: "מהו ההבדל המדויק בין הקשר הדינמי (Dynamic Link / Control Link) לבין הקשר הסטטי (Static Link / Access Link) ברשומת ההפעלה במחסנית?",
    options: [
      {
        id: "comp-q07-opt1",
        plainText: "הקשר הסטטי מצביע לפונקציה שקראה לפונקציה הנוכחית, והקשר הדינמי מצביע למשתנים הגלובליים.",
        isCorrect: false,
        explanation: "שגוי: הקשר שמצביע לפונקציה הקוראת הוא הקשר הדינמי, ולא הסטטי."
      },
      {
        id: "comp-q07-opt2",
        plainText: "שני הקשרים זהים תמיד בכל שפות התכנות ומצביעים לאותו בלוק במחסנית.",
        isCorrect: false,
        explanation: "שגוי: הם מתלכדים רק אם פונקציה קוראת לפונקציה העוטפת אותה ישירות; בסדר קריאות שרירותי הם נבדלים לחלוטין."
      },
      {
        id: "comp-q07-opt3",
        plainText: "הקשר הדינמי מצביע למסגרת ההפעלה של הפונקציה הקוראת (משקף את היסטוריית הקריאות בזמן ריצה ומאפשר שחרור מסגרת בסיום); הקשר הסטטי מצביע למסגרת ההפעלה העדכנית ביותר של הפונקציה העוטפת מבחינה תחבירית בקוד המקור (ומאפשר גישה למשתנים לקסיקליים לא-מקומיים).",
        isCorrect: true,
        explanation: "נכון: 1. Dynamic Link (או Control Link) שומר את ה-Frame Pointer הישן של הפונקציה שקראה לפונקציה הנוכחית. הוא משקף את ה-Call Chain בזמן ריצה ומשמש לשחזור המחסנית בעת יציאה (Return). 2. Static Link (או Access Link) מצביע למסגרת ההפעלה של הפונקציה שבה הפונקציה הנוכחית מוגדרת פיזית בטקסט של התוכנית (Lexical Scope). כדי לגשת למשתנה המוגדר ברמת קינון $k$ מעל הפונקציה, המעבד עוקב אחר $k$ קשרים סטטיים במחסנית ומאתר את הנתון בהיסט קבוע וידוע מראש."
      },
      {
        id: "comp-q07-opt4",
        plainText: "הקשר הסטטי נשמר ברגיסטר המעבד והקשר הדינמי נשמר בזיכרון ה-Heap.",
        isCorrect: false,
        explanation: "שגוי: שני הקשרים הם שדות מצביעים רגילים הנשמרים בתוך מסגרת ההפעלה על גבי ה-Stack."
      }
    ]
  },
  {
    id: "comp-q08-garbage-collection-cheney-copying",
    domain: "ניהול זיכרון אוטומטי ואלגוריתם איסוף אשפה בהעתקה (Cheney Copying GC)",
    title: "קומפילציה - ניהול זיכרון אוטומטי ואלגוריתם איסוף אשפה בהעתקה (Cheney Copying GC)",
    context: "במערכת איסוף אשפה מבוססת העתקה (Copying Garbage Collector), מרחב הזיכרון מחולק לשני חצאים שווים: From-Space ו-To-Space. אלגוריתם צ׳ייני (Cheney's Algorithm) סורק אובייקטים בעזרת שני מצביעים: `scan` ו-`free`.",
    instruction: "איזה יתרון מובהק מקנה אלגוריתם Cheney על פני Mark-and-Sweep מסורתי, ומהי סיבוכיות הזמן שלו?",
    options: [
      {
        id: "comp-q08-opt1",
        plainText: "הוא דורש מחצית מנפח הזיכרון הכולל ומסוגל לפעול ללא עצירת התוכנית (Zero Stop-the-World).",
        isCorrect: false,
        explanation: "שגוי: אלגוריתם העתקה דורש פי שניים זיכרון (החצי השני ריק תמיד וממתין), והאלגוריתם הקלאסי עוצר את העולם."
      },
      {
        id: "comp-q08-opt2",
        plainText: "הוא פותר בעיות שחרור זיכרון באמצעות ספירת הפניות (Reference Counting) ללא סריקת מצביעים.",
        isCorrect: false,
        explanation: "שגוי: צ׳ייני הוא אלגוריתם Tracing מלא המבוסס על סריקת שורשים (Roots) ומצביעים, ואינו משתמש במוני הפניות."
      },
      {
        id: "comp-q08-opt3",
        plainText: "זמן הריצה שלו פרופורציוני ישירות לכמות האובייקטים החיים בלבד ($O(\\text{Live})$) ללא תלות בכמות האשפה המתה, והוא מבצע דחיסת זיכרון מלאה (Compaction) המבטלת פיצול חיצוני (Fragmentation) ללא צורך במחסנית עזר רקורסיבית (סריקת BFS בעזרת שני מצביעים).",
        isCorrect: true,
        explanation: "נכון: 1. ב-Mark-and-Sweep, שלב ה-Sweep חייב לסרוק את כל מרחב ה-Heap ($O(\\text{Heap Size})$) כולל האשפה. ב-Cheney, מעתיקים רק את האובייקטים הנגישים משורשי המערכת אל ה-To-Space; כל האשפה נזנחת כולה בפעימה אחת ע״י החלפת תפקידי החצאים, ולכן זמן הריצה תלוי אך ורק בנפח המידע החי ($O(\\text{Live})$). 2. האובייקטים מועתקים ברצף צפוף אל תחילת ה-To-Space, כך שהפיצול החיצוני נעלם לחלוטין וההקצאה הבאה מתבצעת ב-$O(1)$ (Pointer bumping). 3. המצביעים `scan` ו-`free` בתוך ה-To-Space משמשים כתור (Queue) למימוש סריקת BFS מובנית ללא צורך במחסנית רקורסיה."
      },
      {
        id: "comp-q08-opt4",
        plainText: "הוא מזהה וממחזר משאבי מערכת הפעלה כגון סוקטים של רשת ללא סגירה ידנית.",
        isCorrect: false,
        explanation: "שגוי: איסוף אשפה מטפל בזיכרון RAM בלבד ואינו מהווה תחליף לניהול משאבים חיצוניים."
      }
    ]
  },
  {
    id: "comp-q09-call-by-name-thunks-jensen",
    domain: "מנגנוני העברת פרמטרים וקריאה לפי שם (Call-by-Name)",
    title: "קומפילציה - מנגנוני העברת פרמטרים וקריאה לפי שם (Call-by-Name)",
    context: "בשפת תכנות המיישמת מנגנון Call-by-Name (כגון Algol 60, הממומש ע״י Thunks), נתון קוד המיישם את ״ההתקן של ינסן״ (Jensen's Device):",
    formulaLatex: "\\text{real procedure Sum(k, low, high, expr); } \\dots \\text{ for } k := low \\text{ step } 1 \\text{ until } high \\text{ do } s := s + expr;",
    instruction: "מה מתרחש בפועל בעת העברת פרמטר ב-Call-by-Name, ומה קורה כאשר מפעילים את הפונקציה עם `Sum(i, 1, 10, A[i])`?",
    options: [
      {
        id: "comp-q09-opt1",
        plainText: "הביטוי `A[i]` מחושב פעם אחת בלבד בעת הכניסה לפונקציה לפי ערכו ההתחלתי של `i`, והתוצאה מוכפלת פי 10.",
        isCorrect: false,
        explanation: "שגוי: חישוב מראש בכניסה מאפיין העברה לפי ערך (Call-by-value); ב-Call-by-name הביטוי אינו מחושב מראש."
      },
      {
        id: "comp-q09-opt2",
        plainText: "הפונקציה מקבלת מצביע קבוע לזיכרון של המערך ומבצעת חישוב וקטורי ב-SIMD.",
        isCorrect: false,
        explanation: "שגוי: Call-by-name הוא מנגנון סמנטי של הערכה מושהית ואינו קשור לחומרת וקטורים."
      },
      {
        id: "comp-q09-opt3",
        plainText: "הפרמטר אינו מחושב בעת הקריאה, אלא מועבר כפונקציה חסרת ארגומנטים (Thunk); בכל פעם שהשם `expr` מופיע בלולאה, ה-Thunk מופעל מחדש בסביבת הקורא ומחשב את `A[i]` מחדש עם הערך המעודכן של `i`, כך שמחושב הסכום $\\sum_{i=1}^{10} A[i]$.",
        isCorrect: true,
        explanation: "נכון: לפי כלל ההחלפה של אלגול (Copy Rule), Call-by-Name שקול להחלפה טקסטואלית של שם הפרמטר בגוף הפונקציה בביטוי שהועבר. המהדר מממש זאת ע״י עטיפת הביטוי בפונקציה מיוחדת ללא ארגומנטים המכונה Thunk, הכוללת גישה לסביבה הלקסיקלית של הקורא. בכל איטרציה של הלולאה, המשתנה `k` (שקשור ל-`i`) מקודם ב-1, ולאחר מכן הקריאה ל-`expr` מפעילה את ה-Thunk המחשב מחדש את `A[i]` עם ה-$i$ החדש. זוהי הדוגמה הקלאסית ל-Jensen's Device המאפשרת כתיבת פונקציות סכימה גנריות של ביטויים תלויי-אינדקס."
      },
      {
        id: "comp-q09-opt4",
        plainText: "המערכת מייצרת שגיאת הידור משום שאסור לאינדקס הלולאה להופיע בתוך הביטוי הנסכם.",
        isCorrect: false,
        explanation: "שגוי: זהו בדיוק השימוש המכוון והתקני של Call-by-name באלגול 60."
      }
    ]
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "comp-q10-dataflow-analysis-frameworks-lattice",
    domain: "ניתוח זרימת מידע (Dataflow Analysis) ותבניות סריג",
    title: "קומפילציה - ניתוח זרימת מידע (Dataflow Analysis) ותבניות סריג",
    context: "בניתוח זרימת מידע מבחינים בארבע תבניות קלאסיות: Reaching Definitions, Available Expressions, Live Variables, ו-Very Busy Expressions.",
    formulaLatex: "\\text{IN}[B] = \\bigcap_{P \\in \\text{pred}(B)} \\text{OUT}[P], \\quad \\text{OUT}[B] = \\text{gen}[B] \\cup (\\text{IN}[B] \\setminus \\text{kill}[B])",
    instruction: "לאיזה ניתוח שייכות המשוואות המוצגות לעיל, ומה מאפיין את כיוון הזרימה ואופרטור המפגש (Meet Operator) שלו?",
    options: [
      {
        id: "comp-q10-opt1",
        plainText: "Reaching Definitions: ניתוח לאחור (Backward) עם אופרטור איחוד ($\\cup$).",
        isCorrect: false,
        explanation: "שגוי: Reaching Definitions הוא ניתוח לפנים (Forward) עם אופרטור איחוד ($\\cup$), ולא חיתוך."
      },
      {
        id: "comp-q10-opt2",
        plainText: "Live Variables: ניתוח לפנים (Forward) עם אופרטור חיתוך ($\\cap$).",
        isCorrect: false,
        explanation: "שגוי: Live Variables הוא ניתוח לאחור (Backward) עם אופרטור איחוד (משתנה חי אם יש *לפחות* מסלול אחד שבו ישתמשו בו)."
      },
      {
        id: "comp-q10-opt3",
        plainText: "Very Busy Expressions: ניתוח לפנים עם אופרטור איחוד.",
        isCorrect: false,
        explanation: "שגוי: Very Busy Expressions הוא ניתוח לאחור (Backward)."
      },
      {
        id: "comp-q10-opt4",
        plainText: "Available Expressions: ניתוח לפנים (Forward) עם אופרטור חיתוך ($\\cap$ - Must Analysis), המשמש לביטול תת-ביטויים משותפים (Common Subexpression Elimination).",
        isCorrect: true,
        explanation: "נכון: 1. ביטוי $x+y$ זמין (Available) בכניסה לבלוק $B$ אם הוא חושב כבר בכל מסלול אפשרי מראשית התוכנית אל $B$, ומאז החישוב אף אחד מהאופרנדים שלו לא שונה (Must Analysis). 2. הדרישה שיתקיים \"בכל המסלולים\" מכתיבה אופרטור מפגש של חיתוך: $\\text{IN}[B] = \\bigcap_{P} \\text{OUT}[P]$. 3. כיוון הזרימה הוא קדימה (Forward): המידע זורם מנקודת ההתחלה אל נקודות השימוש. ניתוח זה מאפשר להחליף חישוב חוזר של $x+y$ בקריאת ערך שכבר נשמר קודם לכן."
      }
    ]
  },
  {
    id: "comp-q11-dominance-natural-loops-licm",
    domain: "שליטה בגרף זרימה (Dominance) ולולאות טבעיות",
    title: "קומפילציה - שליטה בגרף זרימה (Dominance) ולולאות טבעיות",
    context: "בגרף זרימת בקרה (CFG) עם צומת כניסה $Entry$, צומת $d$ שולט על צומת $n$ ($d \\text{ dom } n$) אם כל מסלול מ-$Entry$ אל $n$ עובר בהכרח דרך $d$. קשת מכוונת $n \\to d$ נקראת קשת לאחור (Back-edge) אם $d \\text{ dom } n$.",
    formulaLatex: "\\text{Loop}(n \\to d) = \\{ d \\} \\cup \\{ m \\in V \\mid \\exists \\text{ path from } m \\text{ to } n \\text{ not containing } d \\}",
    instruction: "מה מגדירה קשת לאחור $n \\to d$, ואיזה תנאי הכרחי נדרש לצורך הוצאת קוד בלתי-תלוי מתוך לולאה (Loop-Invariant Code Motion - LICM)?",
    options: [
      {
        id: "comp-q11-opt1",
        plainText: "היא מגדירה קריאה רקורסיבית, ו-LICM דורש שכל המשתנים בלולאה יהיו מסוג float.",
        isCorrect: false,
        explanation: "שגוי: קשת לאחור ב-CFG מגדירה מבנה לולאה פנימי של פונקציה ואינה קשורה לקריאה רקורסיבית."
      },
      {
        id: "comp-q11-opt2",
        plainText: "היא מגדירה מעגל מת מושבת, ו-LICM מוחק את הבלוק כולו מהתוכנית.",
        isCorrect: false,
        explanation: "שגוי: לולאה טבעית היא קוד פעיל וחיוני; LICM מעביר פקודות לקדם-הלולאה (Preheader) ולא מוחק אותן."
      },
      {
        id: "comp-q11-opt3",
        plainText: "היא מוכיחה שהגרף אינו ניתן לצמצום (Irreducible Graph), ולכן LICM אינו אפשרי.",
        isCorrect: false,
        explanation: "שגוי: קיום עץ שליטה והגדרת קשת לאחור לפי שליטה תקפים בדיוק בגרפים רדוקטיביים (Reducible CFGs)."
      },
      {
        id: "comp-q11-opt4",
        plainText: "היא מגדירה ״לולאה טבעית״ (Natural Loop) בעלת שער כניסה יחיד ($d$, ה-Header); הוצאת השמה $x = y + z$ מתוך הלולאה לקדם-הלולאה (Preheader) מחייבת שהבלוק המכיל אותה ישלוט על כל יציאות הלולאה (או ש-$x$ אינו חי ביציאה), שאין השמות נוספות ל-$x$ בלולאה, ושכל שימוש ב-$x$ בלולאה נשלט ע״י השמה זו.",
        isCorrect: true,
        explanation: "נכון: 1. בהינתן קשת לאחור $n \\to d$, הלולאה הטבעית מוגדרת כ-$d$ וכל הקודקודים שמסוגלים להגיע ל-$n$ מבלי לעבור דרך $d$. הצומת $d$ מהווה את נקודת הכניסה הבלעדית ללולאה (Single Entry). 2. באופטימיזציית LICM, הוצאת פקודה $x = y + z$ אל מחוץ ללולאה (אל ה-Preheader) היא מסוכנת אם היא עלולה לשנות ערך של $x$ שייקרא מחוץ ללולאה במקרה שהלולאה רצה 0 פעמים, או לדרוס השמה אחרת. לכן תנאי הנכונות הקפדניים דורשים: הבלוק המכיל את ההשמה חייב לשלוט (Dominate) על כל בלוקי היציאה מהלולאה (אלא אם $x$ מת ביציאה), לא קיימת שום הגדרה אחרת ל-$x$ בלולאה, וההשמה שולטת על כל השימושים ב-$x$ בתוך הלולאה."
      }
    ]
  },
  {
    id: "comp-q12-register-allocation-graph-coloring-chaitin",
    domain: "הקצאת אוגרים, גרף התנגשויות וצביעת גרפים (Chaitin's Algorithm)",
    title: "קומפילציה - הקצאת אוגרים, גרף התנגשויות וצביעת גרפים (Chaitin's Algorithm)",
    context: "באלגוריתם הקצאת האוגרים של צ׳ייטין (Chaitin), בונים גרף התנגשויות (Interference Graph) שבו צמתים מייצגים משתנים זמניים (Variables/Virtual Registers) וקשת מחברת שני משתנים שחיים בו-זמנית (Live at the same program point). המטרה היא לצבוע את הגרף ב-$K$ צבעים (כמספר האוגרים הפיזיים הפנויים במעבד).",
    formulaLatex: "\\text{deg}(v) < K \\implies v \\text{ is trivially colorable}",
    instruction: "מהו העיקרון המנחה של היוריסטיקת קמפה (Kempe's Heuristic) בשלב הפישוט (Simplify), וכיצד פועל האלגוריתם כאשר לא נמצא אף קודקוד בעל דרגה קטנה מ-$K$?",
    options: [
      {
        id: "comp-q12-opt1",
        plainText: "האלגוריתם עוצר ומדווח על שגיאת קומפילציה כי צביעת גרף היא בעיה NP-שלמה.",
        isCorrect: false,
        explanation: "שגוי: מהדר אינו נכשל כשהאוגרים נגמרים, אלא פולט קוד ששומר משתנים בזיכרון (Spilling)."
      },
      {
        id: "comp-q12-opt2",
        plainText: "קמפה מאחד את כל הקודקודים בעלי אותה דרגה לקודקוד-על יחיד.",
        isCorrect: false,
        explanation: "שגוי: איחוד קודקודים (Coalescing) מתבצע רק בין משתנים שמועברים ביניהם פקודות העתקה (`mov`), ולא לפי דרגות."
      },
      {
        id: "comp-q12-opt3",
        plainText: "האלגוריתם מקצה שני אוגרים שונים בו-זמנית לאותו משתנה ומבטל את השימוש במחסנית.",
        isCorrect: false,
        explanation: "שגוי: לא ניתן לפתור חוסר באוגרים ע״י הקצאת יתר."
      },
      {
        id: "comp-q12-opt4",
        plainText: "כל קודקוד בעל דרגה $\\text{deg}(v) < K$ מוסר מהגרף ונדחף למחסנית (משום שלאחר צביעת שאר הגרף ב-$K$ צבעים יישאר לו לפחות צבע פנוי אחד מובטח); אם כל הקודקודים בעלי דרגה $\\ge K$, נבחר משתנה מועמד לגלישה (Spill Candidate) על פי יחס עלות/דרגה, והוא נשמר בזיכרון המחסנית תוך שילוב פקודות load/store.",
        isCorrect: true,
        explanation: "נכון: 1. היוריסטיקת קמפה קובעת שאם לדרגת הצומת יש פחות מ-$K$ שכנים, לא משנה איך ייצבעו שכניו, הם יתפסו לכל היותר $K-1$ צבעים שונים, ולכן תמיד יישאר צבע חוקי עבורו. מסירים אותו ודוחפים למחסנית. 2. אם כל הקודקודים בעלי דרגה $\\ge K$, לא מובטחת צביעה חלקה. המהדר בוחר משתנה לגלישה (Spill): משתנה בעל עלות שימוש נמוכה (למשל מחוץ ללולאות עמוקות) ודרגה גבוהה (שפינויו מוריד דרגות לשכנים רבים). המשתנה מוקצה למסגרת המחסנית, מתווספות הוראות `store` לאחר הגדרתו ו-`load` לפני שימושיו, והאלגוריתם מעדכן את הגרף ומנסה לצבוע שוב."
      }
    ]
  }
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_COMPILERS_QUESTIONS = COMPILERS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleCompilersOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = COMPILERS_QUESTIONS.slice(0, 3);
  const groupB = COMPILERS_QUESTIONS.slice(3, 6);
  const groupC = COMPILERS_QUESTIONS.slice(6, 12);

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
