import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Discrete Mathematics diagnostic bank (12Q).
 * Display name: "מתמטיקה בדידה" — no institutional course codes / "ת" nicknames.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 * Tags enable future reuse for split courses (logic-sets / combinatorics / graphs).
 */
export const DISCRETE_MATHEMATICS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 (תורת הקבוצות, לוגיקה ויחסי סדר) — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "dm-q01-cardinality-function-space",
    domain: "תורת הקבוצות - עוצמות",
    title: "מתמטיקה בדידה - עוצמות ומרחבי פונקציות",
    tags: ["logic-sets"],
    context:
      "תהיינה $A, B$ קבוצות אינסופיות. נסמן ב-$B^A$ את קבוצת כל הפונקציות מ-$A$ ל-$B$. נתון כי $|A| = \\aleph_0$ ו-$|B| = 2^{\\aleph_0} = \\mathfrak{c}$ (עוצמת הרצף).",
    formulaLatex: "|A| = \\aleph_0, \\quad |B| = 2^{\\aleph_0} = \\mathfrak{c}",
    instruction: "מהי העוצמה של מרחב הפונקציות $|B^A|$?",
    options: [
      {
        id: "dm-q01-opt1",
        plainText: "$|B^A| = 2^{\\aleph_0} = \\mathfrak{c}$",
        mathText: "|B^A| = 2^{\\aleph_0} = \\mathfrak{c}",
        isCorrect: true,
        explanation:
          "נכון: לפי אריתמטיקה של עוצמות: $|B^A| = |B|^{|A|} = (2^{\\aleph_0})^{\\aleph_0} = 2^{\\aleph_0 \\cdot \\aleph_0} = 2^{\\aleph_0} = \\mathfrak{c}$. לכן עוצמת קבוצת כל הפונקציות מקבוצה בת-מנייה לקבוצה בעלת עוצמת הרצף נשארת עוצמת הרצף.",
      },
      {
        id: "dm-q01-opt2",
        plainText: "$|B^A| = 2^{\\mathfrak{c}}$",
        mathText: "|B^A| = 2^{\\mathfrak{c}}",
        isCorrect: false,
        explanation:
          "שגוי: עוצמה זו הייתה מתקבלת עבור $|A^B| = \\aleph_0^{\\mathfrak{c}} = 2^{\\mathfrak{c}}$, כלומר עבור פונקציות מהרצף אל קבוצה בת-מנייה, ולא להפך.",
      },
      {
        id: "dm-q01-opt3",
        plainText: "$|B^A| = \\aleph_0$",
        mathText: "|B^A| = \\aleph_0",
        isCorrect: false,
        explanation:
          "שגוי: הקבוצה $B^A$ מכילה את כל הפונקציות הקבועות $f(a) = b$, ומספרן כעוצמת $B$ (עוצמת הרצף), ולכן אינה יכולה להיות בת-מנייה.",
      },
      {
        id: "dm-q01-opt4",
        plainText:
          "לא ניתן להכריע במסגרת תורת הקבוצות האקסיומטית ZFC ללא השערת הרצף (CH).",
        isCorrect: false,
        explanation:
          "שגוי: השוויון $\\aleph_0 \\cdot \\aleph_0 = \\aleph_0$ והזהות $(2^{\\kappa})^\\lambda = 2^{\\kappa \\cdot \\lambda}$ מוכחים לחלוטין ב-ZFC ללא תלות בהשערת הרצף.",
      },
    ],
  },
  {
    id: "dm-q02-first-order-logic-models",
    domain: "לוגיקה - תחשיב פרדיקטים",
    title: "מתמטיקה בדידה - תחשיב הפרדיקטים ומודלים",
    tags: ["logic-sets"],
    context:
      "נתונה השפה מסדר ראשון המכילה סימול יחס בינארי יחיד $R(x, y)$. נתון הפסוק $\\varphi$ הבא:",
    formulaLatex:
      "\\varphi \\equiv \\big(\\forall x \\, \\exists y \\, R(x, y)\\big) \\land \\big(\\forall x \\, \\neg R(x, x)\\big) \\land \\big(\\forall x, y, z \\, (R(x, y) \\land R(y, z) \\to R(x, z))\\big)",
    instruction: "מה ניתן להסיק לגבי קיום מודלים של הפסוק $\\varphi$?",
    options: [
      {
        id: "dm-q02-opt1",
        plainText:
          "לפסוק $\\varphi$ יש מודלים בעלי תחום אינסופי בלבד (אין לו אף מודל בעל תחום סופי).",
        isCorrect: true,
        explanation:
          "נכון: הפסוק מגדיר יחס אי-רפלקסיבי, טרנזיטיבי (כלומר יחס סדר חלקי חזק), שבו לכל איבר קיים איבר הגדול ממנו. בקבוצה סופית לא ריקה עם סדר חזק יש תמיד איבר מקסימלי שאין איבר מעליו, בסתירה לאקסיומה הראשונה. לכן כל מודל של $\\varphi$ (כגון $(\\mathbb{N}, <)$) הוא בהכרח אינסופי.",
      },
      {
        id: "dm-q02-opt2",
        plainText: "הפסוק $\\varphi$ אינו ספיק (סתירה לוגית) ואין לו אף מודל.",
        isCorrect: false,
        explanation:
          "שגוי: המבנה $(\\mathbb{N}, <)$ הוא מודל מושלם עבור הפסוק (סדר חזק שבו לכל $n$ קיים $n+1$).",
      },
      {
        id: "dm-q02-opt3",
        plainText: "לפסוק $\\varphi$ קיים מודל סופי בעל 3 איברים לפחות.",
        isCorrect: false,
        explanation:
          "שגוי: כפי שהוכח, קיומו של מודל סופי סותר את עקרון האיבר המקסימלי בקבוצות סופיות סדורות חזק.",
      },
      {
        id: "dm-q02-opt4",
        plainText:
          "הפסוק $\\varphi$ הוא טאוטולוגיה (תקף בכל מודל שבו היחס $R$ אינו ריק).",
        isCorrect: false,
        explanation:
          "שגוי: במבנים רבים תכונת הטרנזיטיביות או האי-רפלקסיביות אינה מתקיימת.",
      },
    ],
  },
  {
    id: "dm-q03-poset-dilworth-chains",
    domain: "יחסי סדר - משפט דילוורת׳",
    title: "מתמטיקה בדידה - יחסי סדר חלקי ומשפט דילוורת׳",
    tags: ["logic-sets"],
    context:
      "תהי $(P, \\le)$ קבוצה סדורה חלקית (פוסט). נתון כי גודל השרשרת (Chain) המקסימלית ב-$P$ הוא 4, וגודל האנטי-שרשרת (Antichain) המקסימלית ב-$P$ הוא 5.",
    formulaLatex: "\\operatorname{height}(P) = 4, \\quad \\operatorname{width}(P) = 5",
    instruction:
      "מהו המספר המינימלי של שרשראות זרות שאיחודן מכסה את כל איברי $P$?",
    options: [
      {
        id: "dm-q03-opt1",
        plainText: "$5$ שרשראות",
        mathText: "5",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט דילוורת' (Dilworth's Theorem), המספר המינימלי של שרשראות הנדרשות לכיסוי קבוצה סדורה חלקית שווה בדיוק לרוחב הפוסט (גודל האנטי-שרשרת המקסימלית ב-$P$). מאחר שגודל האנטי-שרשרת המקסימלית הוא 5, נדרשות בדיוק 5 שרשראות.",
      },
      {
        id: "dm-q03-opt2",
        plainText: "$4$ שרשראות",
        mathText: "4",
        isCorrect: false,
        explanation:
          "שגוי: 4 שרשראות אינן יכולות לכסות אנטי-שרשרת מגודל 5, שכן לפי עקרון שובך היונים לפחות שני איברים מהאנטי-שרשרת ייפלו באותה שרשרת, בסתירה להגדרת אנטי-שרשרת (שאיבריה אינם בני-השוואה).",
      },
      {
        id: "dm-q03-opt3",
        plainText: "$9$ שרשראות",
        mathText: "4 + 5 = 9",
        isCorrect: false,
        explanation:
          "שגוי: חיבור שני הממדים אינו קשור למשפט המינימקס של דילוורת'.",
      },
      {
        id: "dm-q03-opt4",
        plainText: "$20$ שרשראות",
        mathText: "4 \\times 5 = 20",
        isCorrect: false,
        explanation:
          "שגוי: זוהי מכפלת הגדלים (חסם עליון טריוויאלי על גודל הפוסט כולו במקרים מסוימים), ולא מספר השרשראות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 (קומבינטוריקה ונסיגות) — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "dm-q04-pigeonhole-divisibility",
    domain: "קומבינטוריקה - שובך יונים",
    title: "מתמטיקה בדידה - עקרון שובך היונים וחלוקה",
    tags: ["combinatorics"],
    context:
      "בוחרים תת-קבוצה $S \\subseteq \\{1, 2, 3, \\dots, 2n\\}$ המכילה בדיוק $n+1$ מספרים טבעיים שונים.",
    formulaLatex: "S \\subseteq \\{1, 2, \\dots, 2n\\}, \\quad |S| = n + 1",
    instruction: "איזו מהטענות הבאות נכונה בהכרח לגבי הקבוצה $S$?",
    options: [
      {
        id: "dm-q04-opt1",
        plainText: "קיימים בהכרח ב-$S$ שני מספרים שמכפלתם היא ריבוע שלם.",
        isCorrect: false,
        explanation:
          "שגוי: לדוגמה עבור $n=2$, הקבוצה $S = \\{2, 3, 4\\}$ מקיימת את התנאי אך אין בה שני איברים שמכפלתם ריבוע שלם ($2\\cdot 3 = 6, 2\\cdot 4 = 8, 3\\cdot 4 = 12$).",
      },
      {
        id: "dm-q04-opt2",
        plainText:
          "קיימים ב-$S$ שני מספרים שונים $a, b \\in S$ כך ש-$a$ מחלק את $b$ ללא שארית ($a \\mid b$).",
        mathText: "\\exists a, b \\in S \\; (a \\neq b): \\quad a \\mid b",
        isCorrect: true,
        explanation:
          "נכון: כל מספר טבעי $x$ ניתן להצגה יחידה כ-$x = 2^k \\cdot m$, כאשר $m$ אי-זוגי. בתחום $\\{1, \\dots, 2n\\}$ יש בדיוק $n$ מספרים אי-זוגיים שונים. מכיוון שבחרנו $n+1$ מספרים, לפי עקרון שובך היונים קיימים שני מספרים שונים בעלי אותו חלק אי-זוגי $m$: $a = 2^{k_1}m$ ו-$b = 2^{k_2}m$. אם $k_1 < k_2$, אזי $a$ מחלק את $b$.",
      },
      {
        id: "dm-q04-opt3",
        plainText: "לכל $x \\in S$, קיים $y \\in S$ כך ש-$x + y = 2n + 1$.",
        isCorrect: false,
        explanation:
          "שגוי: ניתן לבחור את הקבוצה $S = \\{n, n+1, \\dots, 2n\\}$, שבה יש $n+1$ איברים אך למשל עבור $2n$ נדרש המספר $1$, שאינו נמצא בקבוצה.",
      },
      {
        id: "dm-q04-opt4",
        plainText: "כל איברי הקבוצה $S$ הם בהכרח זרים זה לזה בזוגות.",
        isCorrect: false,
        explanation:
          "שגוי: בקבוצה יש בהכרח לפחות זוג אחד של מספרים זוגיים, ולכן המחלק המשותף שלהם הוא לפחות 2.",
      },
    ],
  },
  {
    id: "dm-q05-inclusion-exclusion-derangements",
    domain: "קומבינטוריקה - הכלה והפרדה",
    title: "מתמטיקה בדידה - הכלה והפרדה ותמורות ללא נקודות שבת",
    tags: ["combinatorics"],
    context:
      "נסמן ב-$D_n$ את מספר התמורות של הקבוצה $\\{1, 2, \\dots, n\\}$ שבהן אין אף נקודת שבת (תמורות ביבול / Derangements).",
    formulaLatex: "D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}",
    instruction:
      "מהו הגבול $\\lim_{n \\to \\infty} \\frac{D_n}{n!}$, ומהי נוסחת הנסיגה הנכונה עבור $D_n$?",
    options: [
      {
        id: "dm-q05-opt1",
        plainText:
          "הגבול הוא $\\frac{1}{2}$, ונוסחת הנסיגה היא $D_n = n D_{n-1} + (-1)^n$.",
        isCorrect: false,
        explanation:
          "שגוי: הגבול אינו חצי אלא $1/e$. נוסחת הנסיגה $D_n = n D_{n-1} + (-1)^n$ אמנם נכונה בפני עצמה, אך הצימוד לגבול השגוי פוסל את האפשרות כולה.",
      },
      {
        id: "dm-q05-opt2",
        plainText:
          "הגבול הוא $\\frac{1}{e}$, ונוסחת הנסיגה היא $D_n = (n-1)(D_{n-1} + D_{n-2})$.",
        mathText:
          "\\lim_{n \\to \\infty} \\frac{D_n}{n!} = \\frac{1}{e}, \\quad D_n = (n-1)(D_{n-1} + D_{n-2})",
        isCorrect: true,
        explanation:
          "נכון: הסכום $\\sum_{k=0}^n \\frac{(-1)^k}{k!}$ הוא טור טיילור של $e^{-1} = \\frac{1}{e}$ סביב 0, ולכן הגבול הוא $1/e$. נוסחת הנסיגה המפורסמת נובעת מחלוקה למקרים לפי מיקומו של האיבר הראשון: האם נוצר חילוף של 2 איברים ($D_{n-2}$) או מחזור ארוך יותר ($D_{n-1}$), מוכפל ב-$(n-1)$ אפשרויות לבחירת בן-הזוג.",
      },
      {
        id: "dm-q05-opt3",
        plainText: "הגבול הוא $0$, ונוסחת הנסיגה היא $D_n = n D_{n-1} - 1$.",
        isCorrect: false,
        explanation:
          "שגוי: ההסתברות שתמורה תהיה ללא נקודות שבת שואפת לקבוע חיובי ($1/e \\approx 0.368$) ולא לאפס.",
      },
      {
        id: "dm-q05-opt4",
        plainText:
          "הגבול הוא $1 - \\frac{1}{e}$, ונוסחת הנסיגה היא $D_n = (n-1)(D_{n-1} - D_{n-2})$.",
        isCorrect: false,
        explanation:
          "שגוי: $1 - 1/e$ הוא הגבול של תמורות שיש להן לפחות נקודת שבת אחת (המשלים), והסימן בתוך נוסחת הנסיגה חייב להיות חיבור.",
      },
    ],
  },
  {
    id: "dm-q06-recurrence-characteristic-resonance",
    domain: "קומבינטוריקה - משוואות נסיגה",
    title: "מתמטיקה בדידה - משוואות נסיגה לא-הומוגניות ותהודה",
    tags: ["combinatorics"],
    context:
      "נתונה נוסחת הנסיגה הליניארית $a_n - 4a_{n-1} + 4a_{n-2} = 2^n$ עבור $n \\ge 2$. המשוואה האופיינית של החלק ההומוגני היא $r^2 - 4r + 4 = (r-2)^2 = 0$.",
    formulaLatex: "a_n - 4a_{n-1} + 4a_{n-2} = 2^n",
    instruction:
      "מהו המבנה המתמטי הכללי שבו יש לחפש פתרון פרטי $a_n^{(p)}$ למשוואה הלא-הומוגנית?",
    options: [
      {
        id: "dm-q06-opt1",
        plainText: "$a_n^{(p)} = A \\cdot 2^n$",
        mathText: "a_n^{(p)} = A \\cdot 2^n",
        isCorrect: false,
        explanation:
          "שגוי: הבסיס $2^n$ הוא פתרון של המשוואה ההומוגנית (השורש האופייני הוא 2), ולכן הצבתו באגף שמאל תאפס אותו ולא תניב את האיבר $2^n$.",
      },
      {
        id: "dm-q06-opt2",
        plainText: "$a_n^{(p)} = A \\cdot n^2 2^n$",
        mathText: "a_n^{(p)} = A \\cdot n^2 2^n",
        isCorrect: true,
        explanation:
          "נכון: השורש האופייני הוא $r = 2$ בריבוי 2 (שורש כפול). האיבר הלא-הומוגני הוא מהצורה $2^n$. לפי כלל התהודה (Resonance), כאשר האיבר החופשי תואם שורש אופייני בריבוי $k$, יש לכפול את הניחוש הסטנדרטי ב-$n^k$. מכיוון שכאן הריבוי הוא $k=2$, הפתרון הפרטי חייב להיות מהצורה $A \\cdot n^2 2^n$.",
      },
      {
        id: "dm-q06-opt3",
        plainText: "$a_n^{(p)} = A \\cdot n 2^n$",
        mathText: "a_n^{(p)} = A \\cdot n 2^n",
        isCorrect: false,
        explanation:
          "שגוי: $n 2^n$ שייך גם הוא למרחב הפתרונות של המשוואה ההומוגנית עקב הריבוי הכפול של השורש $r=2$, ולכן יתאפס בהצבה.",
      },
      {
        id: "dm-q06-opt4",
        plainText: "$a_n^{(p)} = (A n + B) 2^n$",
        mathText: "a_n^{(p)} = (A n + B) 2^n",
        isCorrect: false,
        explanation:
          "שגוי: צירוף זה הוא בדיוק הפתרון ההומוגני הכללי ואינו מייצר את החלק הלא-הומוגני.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 (פונקציות יוצרות וגרפים) — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "dm-q07-generating-functions-partitions",
    domain: "קומבינטוריקה - פונקציות יוצרות",
    title: "מתמטיקה בדידה - פונקציות יוצרות וחלוקת מטבעות",
    tags: ["combinatorics"],
    context:
      "אנו מעוניינים במספר הדרכים השונות לפרוט סכום של $n$ שקלים באמצעות מטבעות של 1 ש״ח, 2 ש״ח ו-5 ש״ח בלבד (ללא חשיבות לסדר המטבעות).",
    formulaLatex: "A(x) = \\sum_{n=0}^{\\infty} a_n x^n",
    instruction: "מהי הפונקציה היוצרת הרגילה (OGF) של הסדרה $(a_n)_{n=0}^{\\infty}$?",
    options: [
      {
        id: "dm-q07-opt1",
        plainText: "$A(x) = \\frac{1}{(1-x)^3}$",
        mathText: "A(x) = \\frac{1}{(1-x)^3}",
        isCorrect: false,
        explanation:
          "שגוי: פונקציה זו סופרת חלוקות של שלמים חיוביים ל-3 משתנים עם משקל זהה ($x_1+x_2+x_3=n$), ולא מתחשבת במשקלים 2 ו-5 של המטבעות.",
      },
      {
        id: "dm-q07-opt2",
        plainText: "$A(x) = \\frac{1}{1 - (x + x^2 + x^5)}$",
        mathText: "A(x) = \\frac{1}{1 - (x + x^2 + x^5)}",
        isCorrect: false,
        explanation:
          "שגוי: פונקציה זו סופרת מילים או רצפים שבהם יש חשיבות לסדר המטבעות (תמורות של מטבעות).",
      },
      {
        id: "dm-q07-opt3",
        plainText: "$A(x) = \\frac{1}{(1-x)(1-x^2)(1-x^5)}$",
        mathText: "A(x) = \\frac{1}{(1-x)(1-x^2)(1-x^5)}",
        isCorrect: true,
        explanation:
          "נכון: לכל סוג מטבע תרומת החזקות היא טור הנדסי של כפולות ערך המטבע: מטבע 1 תורם $(1+x+x^2+\\dots)=\\frac{1}{1-x}$, מטבע 2 תורם $(1+x^2+x^4+\\dots)=\\frac{1}{1-x^2}$, ומטבע 5 תורם $(1+x^5+x^{10}+\\dots)=\\frac{1}{1-x^5}$. מכפלת הטורים נותנת את הפונקציה היוצרת המבוקשת.",
      },
      {
        id: "dm-q07-opt4",
        plainText: "$A(x) = \\frac{x^8}{(1-x)(1-x^2)(1-x^5)}$",
        mathText: "A(x) = \\frac{x^8}{(1-x)(1-x^2)(1-x^5)}",
        isCorrect: false,
        explanation:
          "שגוי: המונה $x^8$ מחייב שימוש של לפחות מטבע אחד מכל סוג ($1+2+5=8$), בעוד שהשאלה אינה דורשת שימוש חובה בכל המטבעות.",
      },
    ],
  },
  {
    id: "dm-q08-graph-theory-trees-leaves",
    domain: "תורת הגרפים - עצים",
    title: "מתמטיקה בדידה - תורת הגרפים, עצים ונוסחת הדרגות",
    tags: ["graphs"],
    context:
      "יהי $T = (V, E)$ עץ בעל $n$ קודקודים. ידוע כי בעץ ישנם בדיוק 3 קודקודים מדרגה 3, 2 קודקודים מדרגה 4, וכל שאר הקודקודים הם עלים (קודקודים מדרגה 1).",
    formulaLatex: "\\sum_{v \\in V} \\deg(v) = 2|E| = 2(n - 1)",
    instruction: "כמה עלים (קודקודים מדרגה 1) ישנם בעץ $T$?",
    options: [
      {
        id: "dm-q08-opt1",
        plainText: "$7$ עלים",
        mathText: "7",
        isCorrect: false,
        explanation:
          "שגוי: הצבה של 7 עלים מניבה סכום דרגות $3(3) + 2(4) + 7(1) = 24$, בעוד $2(n-1) = 2(12-1) = 22 \\neq 24$.",
      },
      {
        id: "dm-q08-opt2",
        plainText: "$8$ עלים",
        mathText: "8",
        isCorrect: false,
        explanation:
          "שגוי: הצבה של 8 עלים יוצרת סתירה בנוסחת לחיצות הידיים: סכום הדרגות הוא 25 (אי-זוגי), דבר שאינו אפשרי באף גרף.",
      },
      {
        id: "dm-q08-opt3",
        plainText: "$9$ עלים",
        mathText: "9",
        isCorrect: true,
        explanation:
          "נכון: נסמן ב-$k$ את מספר העלים. סך כל הקודקודים בעץ הוא $n = 3 + 2 + k = k + 5$. בעץ מתקיים $|E| = n - 1 = k + 4$. לפי נוסחת סכום הדרגות (למת לחיצות הידיים): $\\sum \\deg(v) = 3\\cdot 3 + 2\\cdot 4 + k\\cdot 1 = 9 + 8 + k = 17 + k$. מאידך, סכום זה שווה ל-$2|E| = 2(k + 4) = 2k + 8$. נשווה: $17 + k = 2k + 8 \\implies k = 9$.",
      },
      {
        id: "dm-q08-opt4",
        plainText: "$10$ עלים",
        mathText: "10",
        isCorrect: false,
        explanation:
          "שגוי: עבור 10 עלים מספר הקשתות הנדרש היה גדול ממספר הקשתות שמאפשר עץ.",
      },
    ],
  },
  {
    id: "dm-q09-bipartite-regular-hall-matching",
    domain: "תורת הגרפים - שידוכים",
    title: "מתמטיקה בדידה - גרפים דו-צדדיים רגולריים ומשפט הול",
    tags: ["graphs"],
    context:
      "יהי $G = (V_1 \\cup V_2, E)$ גרף דו-צדדי $d$-רגולרי (כלומר $\\deg(v) = d$ לכל קודקוד) עם דרגה $d \\ge 1$.",
    formulaLatex:
      "\\forall v \\in V_1 \\cup V_2: \\; \\deg(v) = d \\ge 1, \\quad V_1 \\cap V_2 = \\emptyset",
    instruction: "איזו מבין הטענות הבאות נכונה בהכרח לגבי הגרף $G$?",
    options: [
      {
        id: "dm-q09-opt1",
        plainText: "הגרף מכיל מעגל פשוט מאורך אי-זוגי.",
        isCorrect: false,
        explanation:
          "שגוי: משפט ידוע קובע כי גרף הוא דו-צדדי אם ורק אם אין בו אף מעגל מאורך אי-זוגי.",
      },
      {
        id: "dm-q09-opt2",
        plainText:
          "בגרף קיים שידוך מושלם רק כאשר הדרגה $d$ היא מספר זוגי.",
        isCorrect: false,
        explanation:
          "שגוי: שידוך מושלם קיים לכל $d \\ge 1$, כולל עבור $d$ אי-זוגי (למשל עבור $d=1$ הגרף עצמו הוא אוסף קשתות זרות שמהוות שידוך מושלם).",
      },
      {
        id: "dm-q09-opt3",
        plainText:
          "מתקיים שוויון עוצמות $|V_1| = |V_2|$, ובגרף קיים בהכרח שידוך מושלם (Perfect Matching).",
        mathText: "|V_1| = |V_2| \\quad \\land \\quad \\exists \\text{Perfect Matching}",
        isCorrect: true,
        explanation:
          "נכון: מספר הקשתות מחושב משני הצדדים: $|E| = d|V_1| = d|V_2|$, ומכיוון ש-$d \\ge 1$ נובע ש-$|V_1| = |V_2|$. כמו כן, לכל $S \\subseteq V_1$, מספר הקשתות היוצאות מ-$S$ הוא $d|S|$. כל הקשתות הללו מגיעות לקבוצת השכנים $N(S) \\subseteq V_2$, ומכיוון שדרגת כל קודקוד ב-$N(S)$ היא $d$, לא יכולות להגיע אליהם יותר מ-$d|N(S)|$ קשתות. לכן $d|S| \\le d|N(S)| \\implies |N(S)| \\ge |S|$. תנאי הול מתקיים במלואו, ולכן קיים שידוך מושלם.",
      },
      {
        id: "dm-q09-opt4",
        plainText: "הגרף הוא בהכרח עץ פורש קשיר.",
        isCorrect: false,
        explanation:
          "שגוי: בגרף רגולרי עם $d \\ge 2$ אין אף עלה, בעוד שבכל עץ בעל שני קודקודים לפחות יש לפחות 2 עלים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 (מישוריות, המילטון וצביעה) — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "dm-q10-planar-graphs-triangle-free",
    domain: "תורת הגרפים - מישוריות",
    title: "מתמטיקה בדידה - גרפים מישוריים ללא משולשים",
    tags: ["graphs"],
    context:
      "יהי $G = (V, E)$ גרף מישורי, פשוט וקשיר בעל $v \\ge 3$ קודקודים ו-$e$ קשתות. נתון כי בגרף אין משולשים כלל (המותן של הגרף הוא 4 לפחות, $g(G) \\ge 4$).",
    formulaLatex: "g(G) \\ge 4, \\quad v - e + f = 2",
    instruction:
      "מהו החסם העליון ההדוק על מספר הקשתות $e$ כפונקציה של מספר הקודקודים $v$?",
    options: [
      {
        id: "dm-q10-opt1",
        plainText: "$e \\le 3v - 6$",
        mathText: "e \\le 3v - 6",
        isCorrect: false,
        explanation:
          "שגוי: זהו החסם הכללי לגרפים מישוריים שבהם ייתכנו משולשים (שבהם אורך השפה המינימלי של פאה הוא 3 ולא 4).",
      },
      {
        id: "dm-q10-opt2",
        plainText: "$e \\le \\frac{3}{2}v - 3$",
        mathText: "e \\le \\frac{3}{2}v - 3",
        isCorrect: false,
        explanation:
          "שגוי: חסם נמוך מדי שאינו תואם גרפים דו-צדדיים מישוריים מקסימליים (למשל $K_{2,n}$ מקיים $e = 2v - 4$).",
      },
      {
        id: "dm-q10-opt3",
        plainText: "$e \\le 2v - 2$",
        mathText: "e \\le 2v - 2",
        isCorrect: false,
        explanation:
          "שגוי: הקבוע החופשי שגוי; לפי הצבה ישירה בנוסחת אוילר מתקבל $-4$ ולא $-2$.",
      },
      {
        id: "dm-q10-opt4",
        plainText: "$e \\le 2v - 4$",
        mathText: "e \\le 2v - 4",
        isCorrect: true,
        explanation:
          "נכון: מאחר שאין משולשים, כל פאה בשיכון המישורי מוקפת בלפחות 4 קשתות. לכן $2e = \\sum \\deg(f) \\ge 4f \\implies f \\le \\frac{e}{2}$. נציב בנוסחת אוילר $v - e + f = 2$: נקבל $2 = v - e + f \\le v - e + \\frac{e}{2} = v - \\frac{e}{2}$. מכאן $\\frac{e}{2} \\le v - 2 \\implies e \\le 2v - 4$.",
      },
    ],
  },
  {
    id: "dm-q11-hamiltonian-ore-dirac-theorem",
    domain: "תורת הגרפים - מעגלים המילטוניים",
    title: "מתמטיקה בדידה - מעגלים המילטוניים ומשפט אור",
    tags: ["graphs"],
    context:
      "יהי $G = (V, E)$ גרף פשוט ולא-מכוון בעל $n \\ge 3$ קודקודים.",
    instruction:
      "איזה מהתנאים הבאים מבטיח בוודאות קיום של מעגל המילטוני בגרף $G$?",
    options: [
      {
        id: "dm-q11-opt1",
        plainText: "הגרף קשיר וכל דרגות הקודקודים בו הן מספרים זוגיים.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה מבטיח קיום של מעגל אוילרי (העובר בכל הקשתות), אך אינו מבטיח מעגל המילטוני (למשל גרף בצורת שני משולשים המחוברים בקודקוד יחיד - גרף פרפר).",
      },
      {
        id: "dm-q11-opt2",
        plainText: "הגרף מכיל עץ פורש עם בדיוק 2 עלים.",
        isCorrect: false,
        explanation:
          "שגוי: עץ פורש עם 2 עלים הוא מסלול המילטוני פשוט, אך אין הדבר מבטיח שקצוות המסלול מחוברים בקשת לקבלת מעגל המילטוני סגור.",
      },
      {
        id: "dm-q11-opt3",
        plainText:
          "לכל קודקוד $v \\in V$ מתקיים $\\deg(v) \\ge 2$, והגרף הוא 2-קשיר.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה אינו מספיק למעגל המילטוני (גרף פטרסן הוא 3-רגולרי ו-3-קשיר, אך אינו המילטוני).",
      },
      {
        id: "dm-q11-opt4",
        plainText:
          "לכל זוג קודקודים שאינם מחוברים בקשת, $\\{u, v\\} \\notin E$, מתקיים $\\deg(u) + \\deg(v) \\ge n$.",
        mathText: "\\forall \\{u, v\\} \\notin E: \\quad \\deg(u) + \\deg(v) \\ge n",
        isCorrect: true,
        explanation:
          "נכון: זהו ניסוחו המדויק של משפט אור (Ore's Theorem), המהווה הכללה למשפט דיראק ($\\deg(v) \\ge n/2$). תנאי זה מבטיח באופן מלא קיום מעגל המילטוני בגרף בעל $n \\ge 3$ קודקודים.",
      },
    ],
  },
  {
    id: "dm-q12-graph-coloring-brooks-theorem",
    domain: "תורת הגרפים - צביעה",
    title: "מתמטיקה בדידה - צביעת גרפים ומשפט ברוקס",
    tags: ["graphs"],
    context:
      "יהי $G = (V, E)$ גרף פשוט, קשיר, שאינו גרף שלם ($G \\not\\cong K_n$) ושאינו מעגל מאורך אי-זוגי ($G \\not\\cong C_{2k+1}$). נסמן ב-$\\Delta(G)$ את הדרגה המקסימלית בגרף, וב-$\\chi(G)$ את המספר הכרומטי שלו.",
    formulaLatex: "G \\not\\cong K_n, \\quad G \\not\\cong C_{2k+1}",
    instruction:
      "לפי משפט ברוקס (Brooks' Theorem), מה ניתן לקבוע בוודאות על המספר הכרומטי $\\chi(G)$?",
    options: [
      {
        id: "dm-q12-opt1",
        plainText: "$\\chi(G) = \\Delta(G) + 1$",
        mathText: "\\chi(G) = \\Delta(G) + 1",
        isCorrect: false,
        explanation:
          "שגוי: שוויון זה מתקבל אך ורק עבור גרפים שלמים ומעגלים אי-זוגיים, שנשללו במפורש בנתוני השאלה.",
      },
      {
        id: "dm-q12-opt2",
        plainText: "$\\chi(G) \\le 4$ לכל גרף כזה.",
        mathText: "\\chi(G) \\le 4",
        isCorrect: false,
        explanation:
          "שגוי: חסם 4 תקף לגרפים מישוריים (משפט 4 הצבעים). גרף שאינו מישורי עם דרגה מקסימלית גבוהה אינו חסום בהכרח על ידי 4.",
      },
      {
        id: "dm-q12-opt3",
        plainText: "$\\chi(G) \\ge \\Delta(G)$ בהכרח.",
        mathText: "\\chi(G) \\ge \\Delta(G)",
        isCorrect: false,
        explanation:
          "שגוי: לדוגמה עבור גרף כוכב $K_{1, 10}$, הדרגה המקסימלית היא 10 בעוד שהמספר הכרומטי הוא 2 בלבד (גרף דו-צדדי).",
      },
      {
        id: "dm-q12-opt4",
        plainText: "$\\chi(G) \\le \\Delta(G)$",
        mathText: "\\chi(G) \\le \\Delta(G)",
        isCorrect: true,
        explanation:
          "נכון: האלגוריתם החמדן מבטיח תמיד $\\chi(G) \\le \\Delta(G) + 1$. משפט ברוקס קובע כי לכל גרף קשיר מתקיים החסם ההדוק $\\chi(G) \\le \\Delta(G)$, אלא אם כן הגרף הוא גרף שלם $K_n$ או מעגל אי-זוגי $C_{2k+1}$. מכיוון ששני מקרים אלו הוחרגו, הטענה נכונה בהכרח.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_DISCRETE_MATH_QUESTIONS = DISCRETE_MATHEMATICS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from logic-sets (Q1–3)
 * - 1 from combinatorics incl. generating functions (Q4–7)
 * - 1 from graphs (Q8–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleDiscreteMathOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupLogicSets = DISCRETE_MATHEMATICS_QUESTIONS.slice(0, 3);
  const groupCombinatorics = DISCRETE_MATHEMATICS_QUESTIONS.slice(3, 7);
  const groupGraphs = DISCRETE_MATHEMATICS_QUESTIONS.slice(7, 12);

  if (
    groupLogicSets.length === 0 ||
    groupCombinatorics.length === 0 ||
    groupGraphs.length === 0
  ) {
    return [];
  }

  const pickedA =
    groupLogicSets[Math.floor(Math.random() * groupLogicSets.length)];
  const pickedB =
    groupCombinatorics[Math.floor(Math.random() * groupCombinatorics.length)];
  const pickedC =
    groupGraphs[Math.floor(Math.random() * groupGraphs.length)];

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

/** Future split-course sampler: filter by tag, then take up to `count`. */
export function sampleDiscreteMathByTag(
  tag: "logic-sets" | "combinatorics" | "graphs",
  count = 3
): AcademicDiagnosticQuestion[] {
  const pool = DISCRETE_MATHEMATICS_QUESTIONS.filter((q) =>
    q.tags?.includes(tag)
  );
  if (pool.length === 0) return [];
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}
