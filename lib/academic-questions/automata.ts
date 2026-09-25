import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Computational Models & Automata diagnostic bank (12Q).
 * Display name: "מודלים חישוביים ואוטומטים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const AUTOMATA_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 (NFA/DFA, מייהיל-נירוד, למת ניפוח) — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "auto-q01-nfa-to-dfa-state-explosion",
    domain: "אוטומטים סופיים - NFA/DFA",
    title: "מודלים חישוביים - שקילות NFA ו-DFA וחסם תחתון למצבים",
    context:
      "תהי השפה $L_k$ מעל האלפבית $\\Sigma = \\{0, 1\\}$ המוגדרת על ידי כל המילים שבהן האות ה-$k$ מהסוף היא $1$ ($k \\ge 1$ קבוע):",
    formulaLatex:
      "L_k = \\{ w \\in \\{0, 1\\}^* \\mid |w| \\ge k \\text{ and } w[|w| - k + 1] = 1 \\}",
    instruction:
      "מהו מספר המצבים המינימלי ב-NFA המקבל את $L_k$, ומהו מספר המצבים המינימלי ב-DFA דטרמיניסטי עבורה?",
    options: [
      {
        id: "auto-q01-opt1",
        plainText:
          "ב-NFA נדרשים בדיוק $k + 1$ מצבים, ואילו בכל DFA דטרמיניסטי נדרשים לפחות $2^k$ מצבים.",
        mathText: "|Q_{NFA}| = k + 1, \\quad |Q_{DFA}| \\ge 2^k",
        isCorrect: true,
        explanation:
          "נכון: ה-NFA מנחש מתי מתחילות $k$ האותיות האחרונות בעזרת לולאה עצמית בראשית ו-$k$ מעברים קדימה (סה״כ $k+1$ מצבים). מאידך, לפי משפט מייהיל-נירוד, כל $2^k$ המילים באורך $k$ שונות זו מזו ביחס אי-ההבחנה $R_{L_k}$ (אם $x \\neq y$ באורך $k$, קיים סיומת $z = 0^j$ שבה אחד מתקבל והשני נדחה), ולכן כל DFA חייב לפחות $2^k$ מצבים שונים.",
      },
      {
        id: "auto-q01-opt2",
        plainText:
          "הן ב-NFA והן ב-DFA ניתן להסתפק ב-$k+1$ מצבים על ידי שימוש במצבי זיכרון מעגליים.",
        isCorrect: false,
        explanation:
          "שגוי: DFA דטרמיניסטי אינו מסוגל לנחש את העתיד וחייב לזכור במדויק את כל $k$ הסיביות האחרונות, מה שמחייב לפחות $2^k$ מצבים.",
      },
      {
        id: "auto-q01-opt3",
        plainText:
          "ב-NFA נדרשים $2^k$ מצבים, ואילו ב-DFA נדרשים $2^{2^k}$ מצבים לפי בניית קבוצת החזקה.",
        isCorrect: false,
        explanation:
          "שגוי: ב-NFA נדרשים רק $k+1$ מצבים; החסם $2^k$ הוא של ה-DFA.",
      },
      {
        id: "auto-q01-opt4",
        plainText:
          "השפה $L_k$ אינה רגולרית כלל עבור $k \\ge 10$ לפי למת הניפוח.",
        isCorrect: false,
        explanation:
          "שגוי: השפה רגולרית לכל $k$ סופי קבוע, וניתנת לביטוי רגולרי פשוט $(0+1)^* 1 (0+1)^{k-1}$.",
      },
    ],
  },
  {
    id: "auto-q02-myhill-nerode-equivalence-classes",
    domain: "מייהיל-נירוד ואי-רגולריות",
    title: "מודלים חישוביים - משפט מייהיל-נירוד ואי-רגולריות",
    context:
      "נגדיר את יחס מייהיל-נירוד $R_L$ מעל $\\Sigma^*$ עבור השפה $L$: שתי מילים מקיימות $x \\equiv_L y$ אם ורק אם לכל מילה $z \\in \\Sigma^*$ מתקיים $xz \\in L \\iff yz \\in L$.",
    formulaLatex:
      "x \\equiv_L y \\iff \\forall z \\in \\Sigma^*: (xz \\in L \\iff yz \\in L)",
    instruction:
      "איזו מהשפות הבאות הינה בעלת אינדקס מייהיל-נירוד אינסופי ($[\\Sigma^* : R_L] = \\infty$), ולכן אינה רגולרית?",
    options: [
      {
        id: "auto-q02-opt1",
        plainText: "$L = \\{a^n b^n \\mid n \\ge 0\\}$ מעל $\\Sigma = \\{a, b\\}$.",
        mathText: "L = \\{a^n b^n \\mid n \\ge 0\\}",
        isCorrect: true,
        explanation:
          "נכון: נבחן את קבוצת המילים האינסופית $S = \\{a^i \\mid i \\ge 0\\}$. לכל זוג שונה $i \\neq j$, נבחר את מילת ההפרדה $z = b^i$. מתקיים $a^i z = a^i b^i \\in L$, בעוד ש-$a^j z = a^j b^i \\notin L$ (כי $i \\neq j$). לכן כל שתי מילים ב-$S$ שייכות למחלקות שקילות שונות של $R_L$. מספר המחלקות אינסופי, ולפי משפט מייהיל-נירוד השפה אינה רגולרית.",
      },
      {
        id: "auto-q02-opt2",
        plainText:
          "$L = \\{w \\in \\{a, b\\}^* \\mid |w| \\equiv 0 \\pmod{10^6}\\}$",
        isCorrect: false,
        explanation:
          "שגוי: שפה זו מונה אורך מודולו מיליון, ויש לה בדיוק $10^6$ מחלקות שקילות (אינדקס סופי), ולכן היא רגולרית לחלוטין.",
      },
      {
        id: "auto-q02-opt3",
        plainText:
          "$L = \\{w \\in \\{0, 1\\}^* \\mid w \\text{ contains the substring } 1011\\}$",
        isCorrect: false,
        explanation:
          "שגוי: זוהי שפה רגולרית פשוטה הניתנת לזיהוי ע״י DFA בעל 5 מצבים.",
      },
      {
        id: "auto-q02-opt4",
        plainText: "$L = \\Sigma^*$",
        isCorrect: false,
        explanation: "שגוי: לשפה זו יש מחלקת שקילות אחת ויחידה (אינדקס 1).",
      },
    ],
  },
  {
    id: "auto-q03-regular-pumping-lemma-boundary",
    domain: "למת הניפוח הרגולרית",
    title: "מודלים חישוביים - למת הניפוח לשפות רגולריות",
    context:
      "תהי $L$ שפה רגולרית עם קבוע ניפוח $p$. לפי למת הניפוח, לכל מילה $w \\in L$ עם $|w| \\ge p$, ניתן לפרק $w = xyz$ כך שמתקיימים שלושת התנאים: (1) $|y| > 0$, (2) $|xy| \\le p$, (3) $\\forall i \\ge 0: x y^i z \\in L$.",
    formulaLatex:
      "w = xyz, \\quad |y| > 0, \\quad |xy| \\le p, \\quad \\forall i \\ge 0: x y^i z \\in L",
    instruction:
      "מדוע התנאי (2) $|xy| \\le p$ הוא קריטי להוכחת אי-רגולריות של שפות כגון $L = \\{w w \\mid w \\in \\{0, 1\\}^*\\}$?",
    options: [
      {
        id: "auto-q03-opt1",
        plainText:
          "משום שללא התנאי $|xy| \\le p$, היריב יכול היה לבחור את תת-המילה המנופחת $y$ בתוך החצי השני של המילה או לחצות את נקודת האמצע, ובכך למנוע סתירה ישירה של המבנה.",
        isCorrect: true,
        explanation:
          "נכון: התנאי $|xy| \\le p$ מאלץ את החלק המנופח $y$ להימצא כולו בתוך $p$ האותיות הראשונות של המילה שנבחרה (למשל $w = 0^p 1 0^p 1$). עקב כך, ניפוח $y$ משנה אך ורק את רצף האפסים הראשון מבלי להשפיע על רצף האפסים השני, מה שמפר את השוויון בין החצאים ומבטיח סתירה. ללא תנאי זה, היריב היה יכול לבחור $y = 0^p 1$ ולנפח את שני החצאים סימטרית.",
      },
      {
        id: "auto-q03-opt2",
        plainText:
          "משום שללא תנאי זה לא מובטח שהאוטומט מכיל מצב מקבל.",
        isCorrect: false,
        explanation:
          "שגוי: כל מילה בשפה מגיעה בהכרח למצב מקבל מעצם השתייכותה ל-$L$.",
      },
      {
        id: "auto-q03-opt3",
        plainText: "משום שהתנאי מוכיח שהשפה חסרת הקשר (CFL).",
        isCorrect: false,
        explanation:
          "שגוי: השפה $\\{ww\\}$ אינה חסרת הקשר כלל; למת הניפוח הרגולרית אינה מוכיחה חוסר-הקשר.",
      },
      {
        id: "auto-q03-opt4",
        plainText:
          "משום שהקבוע $p$ חייב להיות מספר ראשוני לפי משפט דירichlet.",
        isCorrect: false,
        explanation:
          "שגוי: קבוע הניפוח הוא פשוט מספר המצבים ב-DFA ($|Q|$), ואינו מוגבל למספרים ראשוניים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 (סגירות CFL, DPDA/NPDA, ערפול) — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "auto-q04-cfl-closure-properties-intersection",
    domain: "שפות חסרות הקשר - סגירות",
    title: "מודלים חישוביים - תכונות סגיר של שפות חסרות הקשר (CFL)",
    context:
      "משפחת השפות חסרות ההקשר (CFL) סגורה תחת פעולות רבות, אך אינה סגורה תחת אחרות.",
    instruction:
      "תחת אילו מהפעולות הבאות מחלקת השפות חסרות ההקשר **אינה** סגורה בהכרח?",
    options: [
      {
        id: "auto-q04-opt1",
        plainText:
          "איחוד, שרשור וכוכב קליני ($L_1 \\cup L_2$, $L_1 L_2$, $L_1^*$).",
        isCorrect: false,
        explanation:
          "שגוי: CFL סגורה לחלוטין תחת איחוד, שרשור וכוכב קליני (בנייה פשוטה של כללי דקדוק חדשים).",
      },
      {
        id: "auto-q04-opt2",
        plainText:
          "חיתוך בין שתי שפות חסרות הקשר ($L_1 \\cap L_2$), ומשלים ($\\bar{L_1}$).",
        mathText: "L_1 \\cap L_2, \\quad \\Sigma^* \\setminus L_1",
        isCorrect: true,
        explanation:
          "נכון: CFL אינה סגורה תחת חיתוך. לדוגמה: $L_1 = \\{a^n b^n c^m\\}$ ו-$L_2 = \\{a^m b^n c^n\\}$ הן שתיהן CFL, אך חיתוכן הוא $\\{a^n b^n c^n\\}$ שידועה כאינה CFL. לפי חוקי דה-מורגן ($L_1 \\cap L_2 = \\overline{\\bar{L_1} \\cup \\bar{L_2}}$), היות ש-CFL סגורה לאיחוד, אי-הסגיר לחיתוך גורר מיד אי-סגיר למשלים.",
      },
      {
        id: "auto-q04-opt3",
        plainText: "חיתוך עם שפה רגולרית ($L_1 \\cap R$).",
        isCorrect: false,
        explanation:
          "שגוי: CFL סגורה תחת חיתוך עם שפה רגולרית (בניית מכפלה של PDA עם DFA תוך שמירה על אותה מחסנית יחידה).",
      },
      {
        id: "auto-q04-opt4",
        plainText: "היפוך מילים ($L^R$) והומומורפיזם.",
        isCorrect: false,
        explanation:
          "שגוי: CFL סגורה הן תחת היפוך (היפוך אגפי ימין בכללי ה-CFG) והן תחת הומומורפיזם.",
      },
    ],
  },
  {
    id: "auto-q05-pda-determinism-vs-nondeterminism",
    domain: "אוטומט מחסנית - DPDA/NPDA",
    title:
      "מודלים חישוביים - אוטומט מחסנית דטרמיניסטי (DPDA) מול לא-דטרמיניסטי",
    context:
      "נסמן ב-CFL את משפחת השפות המתקבלות על ידי אוטומט מחסנית לא-דטרמיניסטי (NPDA), וב-DCFL את השפות המתקבלות על ידי אוטומט מחסנית דטרמיניסטי (DPDA).",
    instruction: "איזו מהטענות הבאות נכונה בהכרח לגבי הקשר בין המחלקות?",
    options: [
      {
        id: "auto-q05-opt1",
        plainText:
          "$\\text{DCFL} = \\text{CFL}$, בדיוק כפי ש-DFA שקול בעוצמתו ל-NFA.",
        isCorrect: false,
        explanation:
          "שגוי: באוטומט מחסנית, אי-דטרמיניזם מוסיף כוח חישובי מהותי; לא כל שפה חסרת הקשר ניתנת לזיהוי דטרמיניסטי.",
      },
      {
        id: "auto-q05-opt2",
        plainText:
          "$\\text{DCFL} \\subsetneq \\text{CFL}$; שפת הפלינדרומים הזוגיים $L = \\{w w^R \\mid w \\in \\{0, 1\\}^*\\}$ היא ב-CFL אך אינה ב-DCFL.",
        mathText:
          "\\text{DCFL} \\subsetneq \\text{CFL}, \\quad \\{w w^R\\} \\in \\text{CFL} \\setminus \\text{DCFL}",
        isCorrect: true,
        explanation:
          "נכון: המחלקה DCFL מוכלת ממש ב-CFL. השפה $\\{w w^R\\}$ היא CFL קלאסית, אך אינה ב-DCFL משום שאוטומט דטרמיניסטי אינו יכול לנחש מתי הסתיימה המילה $w$ והתחיל השיקוף $w^R$ ללא אות מפרידה מפורשת (לעומת $\\{w c w^R\\}$ שהיא כן ב-DCFL). בנוסף, DCFL סגורה למשלים, בעוד ש-CFL אינה סגורה למשלים.",
      },
      {
        id: "auto-q05-opt3",
        plainText: "משפחת DCFL אינה מכילה את כל השפות הרגולריות.",
        isCorrect: false,
        explanation:
          "שגוי: כל שפה רגולרית היא ב-DCFL (אוטומט מחסנית דטרמיניסטי שאינו עושה שימוש במחסנית שקול ל-DFA).",
      },
      {
        id: "auto-q05-opt4",
        plainText: "משפחת DCFL אינה סגורה תחת פעולת המשלים.",
        isCorrect: false,
        explanation:
          "שגוי: אחת התכונות המרכזיות של DCFL היא שהיא כן סגורה למשלים (בניגוד ל-CFL הכללית).",
      },
    ],
  },
  {
    id: "auto-q06-cfg-ambiguity-inherent",
    domain: "דקדוקים חסרי הקשר - ערפול",
    title: "מודלים חישוביים - דקדוקים חסרי הקשר ושפות מעורפלות מטבען",
    context:
      "דקדוק חסר הקשר נקרא מעורפל (Ambiguous) אם קיימת מילה בשפתו בעלת לפחות שני עצי גזירה שונים (או שתי גזירות שמאליות שונות).",
    instruction: 'מהי ״שפה מעורפלת מטבעה״ (Inherently Ambiguous Language)?',
    options: [
      {
        id: "auto-q06-opt1",
        plainText: "שפה שקיים עבורה לפחות דקדוק אחד מעורפל.",
        isCorrect: false,
        explanation:
          "שגוי: כמעט לכל שפה (כולל שפות רגולריות) ניתן לכתוב דקדוק מעורפל אם מוסיפים כללים מיותרים; זהו ערפול של הדקדוק ולא של השפה.",
      },
      {
        id: "auto-q06-opt2",
        plainText:
          "שפה חסרת הקשר שכל דקדוק חסר הקשר המייצר אותה הוא בהכרח מעורפל (למשל $L = \\{a^i b^j c^k \\mid i = j \\lor j = k\\}$).",
        isCorrect: true,
        explanation:
          "נכון: שפה נקראת Inherently Ambiguous אם לא קיים עבורה אף דקדוק בלתי מעורפל. הדוגמה המפורסמת ביותר היא $L = \\{a^i b^j c^k \\mid i = j \\text{ or } j = k\\}$. כל דקדוק חייב לייצר גזירות שונות עבור מילים שבהן $i = j = k$, ולכן שפה זו מעורפלת מטבעה.",
      },
      {
        id: "auto-q06-opt3",
        plainText:
          "שפה שאינה ניתנת להכרעה על ידי מכונת טיורינג בזמן פולינומי.",
        isCorrect: false,
        explanation:
          "שגוי: כל שפה חסרת הקשר ניתנת להכרעה פולינומית (למשל ע״י אלגוריתם CYK בזמן $O(n^3)$).",
      },
      {
        id: "auto-q06-opt4",
        plainText:
          "שפה שלא ניתן להמיר את הדקדוק שלה לצורה הנורמלית של חומסקי (CNF).",
        isCorrect: false,
        explanation:
          "שגוי: כל דקדוק חסר הקשר שאינו מייצר את המילה הריקה ניתן להמרה ל-CNF, ללא תלות בערפול.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 (כריעות, רייס, קנטור) — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "auto-q07-decidability-turing-recognizable-classes",
    domain: "כריעות ומשפט פוסט",
    title:
      "מודלים חישוביים - כריעות, שפות כריעות (R) ושפות ניתנות לזיהוי (RE)",
    context:
      "תהי $L$ שפה מעל $\\Sigma$. ידוע כי $L \\in \\text{RE}$ (כלומר קיימת מכונת טיורינג המקבלת את $L$, אך עשויה להסתחרר על מילים שאינן ב-$L$), וכן $\\bar{L} \\in \\text{RE}$ (השפה המשלימה ניתנת לזיהוי).",
    formulaLatex: "L \\in \\text{RE} \\quad \\land \\quad \\bar{L} \\in \\text{RE}",
    instruction: "מה ניתן להסיק בוודאות לגבי השפה $L$ לפי משפט פוסט?",
    options: [
      {
        id: "auto-q07-opt1",
        plainText:
          "לא ניתן להסיק דבר; ייתכן שהשפה אינה כריעה, כפי שקורה עבור שפת העצירה $HALT_{TM}$.",
        isCorrect: false,
        explanation:
          "שגוי: שפת העצירה מקיימת $HALT \\in \\text{RE}$ אך $\\overline{HALT} \\notin \\text{RE}$, ולכן אינה מהווה דוגמה נגדית.",
      },
      {
        id: "auto-q07-opt2",
        plainText:
          "השפה $L$ היא בהכרח שפה חסרת הקשר דטרמיניסטית (DCFL).",
        isCorrect: false,
        explanation:
          "שגוי: קיימות שפות כריעות רבות שאינן חסרות הקשר (למשל $\\{a^n b^n c^n\\}$).",
      },
      {
        id: "auto-q07-opt3",
        plainText:
          "השפה $L$ כריעה בהכרח ($L \\in R = \\text{Decidable}$); ניתן לבנות מכונה העוצרת תמיד על ידי הרצה במקביל של שתי המכונות.",
        mathText:
          "L \\in \\text{RE} \\cap \\text{co-RE} \\iff L \\in \\text{Decidable}",
        isCorrect: true,
        explanation:
          "נכון: זהו משפט פוסט (Post's Theorem). בהינתן קלט $w$, מריצים במקביל (צעד אחר צעד) את מכונת הזיהוי של $L$ ואת מכונת הזיהוי של $\\bar{L}$. מאחר ש-$w \\in L$ או $w \\in \\bar{L}$, בדיוק אחת משתי המכונות תעצור ותקבל תוך מספר סופי של צעדים. המכונה המשולבת עוצרת תמיד ומכריעה את השפה.",
      },
      {
        id: "auto-q07-opt4",
        plainText: "השפה $L$ אינה בת-מנייה לפי האלכסון של קנטור.",
        isCorrect: false,
        explanation:
          "שגוי: כל שפה מעל אלפבית סופי מוכלת ב-$\\Sigma^*$ שהוא קבוצה בת-מנייה.",
      },
    ],
  },
  {
    id: "auto-q08-rices-theorem-semantic-property",
    domain: "משפט רייס",
    title: "מודלים חישוביים - משפט רייס ותכונות סמנטיות של שפות",
    context:
      "משפט רייס קובע כי כל תכונה סמנטית לא-טריוויאלית של שפות הניתנות לזיהוי ע״י מכונת טיורינג (שפות RE) היא בלתי כריעה.",
    formulaLatex:
      "P \\subseteq \\text{RE}, \\quad P \\neq \\emptyset, \\quad P \\neq \\text{RE} \\implies L_P = \\{\\langle M \\rangle \\mid L(M) \\in P\\} \\notin R",
    instruction:
      "איזו מבין בעיות ההחלטה הבאות היא **כריעה** (כלומר משפט רייס אינו תקף לגביה משום שאינה תכונה סמנטית של השפה)?",
    options: [
      {
        id: "auto-q08-opt1",
        plainText:
          "$L_1 = \\{\\langle M \\rangle \\mid L(M) \\text{ is a regular language}\\}$",
        isCorrect: false,
        explanation:
          "שגוי: רגולריות היא תכונה סמנטית לא-טריוויאלית של השפה $L(M)$, ולכן אינה כריעה לפי משפט רייס.",
      },
      {
        id: "auto-q08-opt2",
        plainText:
          "$L_2 = \\{\\langle M \\rangle \\mid |L(M)| < \\infty\\}$ (האם השפה סופית)",
        isCorrect: false,
        explanation:
          "שגוי: סופיות השפה היא תכונה סמנטית של השפה המזוהה, ולכן בלתי כריעה.",
      },
      {
        id: "auto-q08-opt3",
        plainText:
          "$L_3 = \\{\\langle M \\rangle \\mid M \\text{ has at most } 100 \\text{ states}\\}$",
        isCorrect: true,
        explanation:
          "נכון: זוהי תכונה תחבירית (סינטקטית) של הקידוד של המכונה $M$ ולא תכונה של השפה $L(M)$. ייתכנו שתי מכונות שונות המקבלות בדיוק את אותה השפה אך לאחת יש 50 מצבים ולשנייה 200 מצבים. בדיקת מספר המצבים בקוד המכונה היא בעיה פשוטה וכריעה ב-$O(|\\langle M \\rangle|)$.",
      },
      {
        id: "auto-q08-opt4",
        plainText: "$L_4 = \\{\\langle M \\rangle \\mid \\epsilon \\in L(M)\\}$",
        isCorrect: false,
        explanation:
          "שגוי: קבלת המילה הריקה היא תכונה סמנטית לא-טריוויאלית (שקולה לבעיית הקבלה $A_{TM}$), ולכן בלתי כריעה.",
      },
    ],
  },
  {
    id: "auto-q09-cantor-diagonalization-existence",
    domain: "עוצמות ואלכסון קנטור",
    title:
      "מודלים חישוביים - עוצמות, אלכסון קנטור ושפות בלתי ניתנות לזיהוי",
    context:
      "יהי $\\Sigma = \\{0, 1\\}$. קבוצת כל המילים $\\Sigma^*$ היא בת-מנייה. נסמן ב-$\\mathcal{L}$ את קבוצת כל השפות האפשריות מעל $\\Sigma$, וב-$\\mathcal{M}$ את קבוצת כל מכונות הטיורינג האפשריות.",
    formulaLatex:
      "|\\mathcal{L}| = |\\mathcal{P}(\\Sigma^*)| = 2^{\\aleph_0} = \\mathfrak{c}, \\quad |\\mathcal{M}| = \\aleph_0",
    instruction:
      "מהי המסקנה הישירה מהשוואת עוצמות זו לגבי קיום שפות שאינן ניתנות לזיהוי (Non-RE)?",
    options: [
      {
        id: "auto-q09-opt1",
        plainText:
          "כל שפה ניתנת לזיהוי ע״י מכונת טיורינג מתאימה, אך לא כולן כריעות.",
        isCorrect: false,
        explanation:
          "שגוי: מספר המכונות בן-מנייה ומספר השפות בעל עוצמת הרצף, ולכן רוב השפות אינן ניתנות לזיהוי כלל.",
      },
      {
        id: "auto-q09-opt2",
        plainText:
          "קיימות שפות שאינן RE רק אם השערת הרצף (CH) נכונה.",
        isCorrect: false,
        explanation:
          "שגוי: אי-השוויון $\\aleph_0 < 2^{\\aleph_0}$ מוכח במשפט קנטור ללא כל תלות בהשערת הרצף.",
      },
      {
        id: "auto-q09-opt3",
        plainText:
          "עוצמת קבוצת השפות היא עוצמת הרצף בעוד שמספר מכונות הטיורינג הוא בן-מנייה, ולכן כמעט כל השפות אינן ניתנות אפילו לזיהוי (Non-RE).",
        mathText:
          "|\\text{RE}| = \\aleph_0 < 2^{\\aleph_0} = |\\mathcal{P}(\\Sigma^*)|",
        isCorrect: true,
        explanation:
          "נכון: כל מכונת טיורינג מוגדרת ע״י קידוד סופי בינארי, ולכן קבוצת המכונות היא בת-מנייה ($|\\mathcal{M}| = \\aleph_0$). היות שכל מכונה מזהה לכל היותר שפה אחת, יש לכל היותר $\\aleph_0$ שפות ב-RE. מאידך, קבוצת כל השפות היא קבוצת החזקה $\\mathcal{P}(\\Sigma^*)$ שעוצמתה $2^{\\aleph_0} = \\mathfrak{c}$. מכיוון ש-$\\aleph_0 < \\mathfrak{c}$, קיים אינסוף בלתי מניו של שפות שאינן ניתנות אפילו לזיהוי חלקי.",
      },
      {
        id: "auto-q09-opt4",
        plainText:
          "מספר השפות הכריעות שווה למספר השפות שאינן כריעות.",
        isCorrect: false,
        explanation:
          "שגוי: השפות הכריעות הן בנות-מנייה (מוכלות ב-RE), בעוד שהשפות הלא-כריעות הן בעלות עוצמת הרצף.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 (חומסקי, כריעות CFL, רדוקציות) — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "auto-q10-chomsky-hierarchy-strict-inclusions",
    domain: "היררכיית חומסקי",
    title: "מודלים חישוביים - היררכיית חומסקי והכלות ממש",
    context:
      "היררכיית חומסקי מסווגת שפות לארבע מחלקות: רגולריות (סוג 3), חסרות הקשר (סוג 2), תלויות הקשר (סוג 1), וניתנות לזיהוי ע״י טיורינג (סוג 0).",
    formulaLatex:
      "\\text{Regular} \\subsetneq \\text{CFL} \\subsetneq \\text{CSL} \\subsetneq \\text{RE}",
    instruction:
      "איזו מהדוגמאות הבאות מדגימה במדויק שפה תלויה-הקשר (CSL) שאינה חסרת הקשר (Non-CFL)?",
    options: [
      {
        id: "auto-q10-opt1",
        plainText: "$L = \\{a^n b^n \\mid n \\ge 0\\}$",
        isCorrect: false,
        explanation:
          "שגוי: שפה זו היא חסרת הקשר (CFL) דטרמיניסטית קלאסית.",
      },
      {
        id: "auto-q10-opt2",
        plainText: "$L = \\{a^n b^m \\mid n, m \\ge 0\\}$",
        isCorrect: false,
        explanation: "שגוי: זוהי שפה רגולרית פשוטה ($a^* b^*$).",
      },
      {
        id: "auto-q10-opt3",
        plainText:
          "$L = \\{w \\in \\{0, 1\\}^* \\mid w = w^R\\}$ (פלינדרומים)",
        isCorrect: false,
        explanation:
          "שגוי: שפת הפלינדרומים היא חסרת הקשר (CFL) מוכרת הנוצרת ע״י $S \\to 0S0 \\mid 1S1 \\mid \\epsilon$.",
      },
      {
        id: "auto-q10-opt4",
        plainText: "$L = \\{a^n b^n c^n \\mid n \\ge 0\\}$",
        mathText: "\\{a^n b^n c^n \\mid n \\ge 0\\} \\in \\text{CSL} \\setminus \\text{CFL}",
        isCorrect: true,
        explanation:
          "נכון: לפי למת הניפוח לשפות חסרות הקשר, חלוקת המילה $w = u v x y z$ יכולה לכלול לכל היותר שני סוגי אותיות ב-$vy$, ולכן ניפוח מפר את השוויון המשולש בין מספרי ה-$a, b, c$, מה שמוכיח שאינה CFL. מאידך, היא ניתנת לזיהוי ע״י אוטומט חסום ליניארית (LBA), ולכן היא שפה תלוית הקשר (CSL).",
      },
    ],
  },
  {
    id: "auto-q11-undecidable-cfl-problems",
    domain: "כריעות ב-CFL",
    title: "מודלים חישוביים - בעיות החלטה בלתי-כריעות בדקדוקים חסרי הקשר",
    context: "נתונים שני דקדוקים חסרי הקשר $G_1, G_2$ מעל אלפבית $\\Sigma$.",
    instruction:
      "איזו מבין בעיות ההחלטה הבאות לגבי דקדוקים חסרי הקשר היא **בלתי כריעה** (Undecidable)?",
    options: [
      {
        id: "auto-q11-opt1",
        plainText: "האם שפת הדקדוק ריקה: $L(G_1) = \\emptyset$?",
        isCorrect: false,
        explanation:
          "שגוי: בדיקת ריקות של CFG כריעה בזמן פולינומי ע״י אלגוריתם סימון משתנים פוריים (Generating symbols).",
      },
      {
        id: "auto-q11-opt2",
        plainText: "האם מילה נתונה שייכת לשפה: $w \\in L(G_1)$?",
        isCorrect: false,
        explanation:
          "שגוי: זוהי בעיית ה-Parsing הכריעה ב-$O(|w|^3)$ ע״י אלגוריתם CYK.",
      },
      {
        id: "auto-q11-opt3",
        plainText: "האם שפת הדקדוק אינסופית: $|L(G_1)| = \\infty$?",
        isCorrect: false,
        explanation:
          "שגוי: בדיקת אינסופיות של CFG כריעה באמצעות חיפוש מעגלים בגרף המשתנים של דקדוק בצורת חומסקי.",
      },
      {
        id: "auto-q11-opt4",
        plainText: "האם חיתוך השפות ריק: $L(G_1) \\cap L(G_2) = \\emptyset$?",
        mathText: "L(G_1) \\cap L(G_2) \\stackrel{?}{=} \\emptyset",
        isCorrect: true,
        explanation:
          "נכון: שאלת זרות השפות של שני דקדוקים חסרי הקשר $L(G_1) \\cap L(G_2) = \\emptyset$ היא בלתי כריעה (הוכחה באמצעות רדוקציה מבעיית ההתאמה של פוסט PCP או ממסלולי חישוב מקבלים של מכונת טיורינג). באותו אופן, שאלת שוויון השפות $L(G_1) = L(G_2)$ ושאלת האוניברסליות $L(G_1) = \\Sigma^*$ הן בלתי כריעות.",
      },
    ],
  },
  {
    id: "auto-q12-mapping-reductions-complements",
    domain: "רדוקציות מיפוי",
    title: "מודלים חישוביים - רדוקציות מיפוי (Mapping Reductions) ומשלימים",
    context:
      "תהיינה $A, B$ שפות מעל אלפבית סופי. נתון כי קיימת רדוקציית מיפוי $A \\le_m B$.",
    formulaLatex:
      "A \\le_m B \\iff \\exists f \\text{ computable}: w \\in A \\iff f(w) \\in B",
    instruction:
      "איזו מהטענות הבאות נכונה בהכרח לגבי השפות המשלימות $\\bar{A}$ ו-$\\bar{B}$?",
    options: [
      {
        id: "auto-q12-opt1",
        plainText:
          "הרדוקציה הופכת כיוון עבור המשלימים: $\\bar{B} \\le_m \\bar{A}$.",
        isCorrect: false,
        explanation:
          "שגוי: רדוקציית מיפוי אינה הופכת כיוון אלא שומרת על אותו כיוון בדיוק עבור המשלימים.",
      },
      {
        id: "auto-q12-opt2",
        plainText: "אם $B$ שפה רגולרית, אזי בהכרח $A$ שפה בלתי כריעה.",
        isCorrect: false,
        explanation:
          "שגוי: אם $B$ רגולרית היא כריעה, ואם $A \\le_m B$ אזי $A$ חייבת להיות כריעה גם כן.",
      },
      {
        id: "auto-q12-opt3",
        plainText:
          "לא ניתן להסיק קשר בין $\\bar{A}$ ל-$\\bar{B}$ ללא בדיקת תכונת חוסר הזיכרון של פונקציית המיפוי $f$.",
        isCorrect: false,
        explanation:
          "שגוי: הקשר בין המשלימים נובע ישירות מהגדרת הלוגיקה של שקילות אמיתות.",
      },
      {
        id: "auto-q12-opt4",
        plainText:
          "מתקיימת רדוקציית מיפוי באותו כיוון בדיוק בין המשלימים: $\\bar{A} \\le_m \\bar{B}$, באמצעות אותה פונקציה חשיבה $f$.",
        mathText: "A \\le_m B \\iff \\bar{A} \\le_m \\bar{B}",
        isCorrect: true,
        explanation:
          "נכון: לפי הגדרת רדוקציית מיפוי: $w \\in A \\iff f(w) \\in B$. משלילת שני אגפי השקילות הלוגית מקבלים: $w \\notin A \\iff f(w) \\notin B$, דבר השקול להגדרה $w \\in \\bar{A} \\iff f(w) \\in \\bar{B}$. לכן אותה פונקציה $f$ עצמה מהווה רדוקציית מיפוי חוקית מ-$\\bar{A}$ ל-$\\bar{B}$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_AUTOMATA_QUESTIONS = AUTOMATA_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from basics (Q1–3): NFA/DFA, Myhill-Nerode, pumping lemma
 * - 1 from mid core (Q4–6): CFL closure, PDA, CFG ambiguity
 * - 1 from advanced (Q7–12): decidability, Rice, Cantor, Chomsky, CFL undecidability, reductions
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleAutomataOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupBasics = AUTOMATA_QUESTIONS.slice(0, 3);
  const groupMidCore = AUTOMATA_QUESTIONS.slice(3, 6);
  const groupAdvanced = AUTOMATA_QUESTIONS.slice(6, 12);

  if (
    groupBasics.length === 0 ||
    groupMidCore.length === 0 ||
    groupAdvanced.length === 0
  ) {
    return [];
  }

  const pickedA =
    groupBasics[Math.floor(Math.random() * groupBasics.length)];
  const pickedB =
    groupMidCore[Math.floor(Math.random() * groupMidCore.length)];
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
