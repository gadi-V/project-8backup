import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Organization Theory & Management diagnostic bank (12Q).
 * Display name: "תורת הארגון והניהול" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const ORGANIZATION_THEORY_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 (Weber, contingency, Mintzberg) — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "orgth-q01-weber-bureaucracy-ideal-type",
    domain: "בירוקרטיה וברית - Max Weber",
    title: "תורת הארגון והניהול - בירוקרטיה אידיאלית לפי ובר",
    context:
      "ובר (Weber) תיאר את הבירוקרטיה כטיפוס אידיאלי (ideal type) של סמכות רציונלית-חוקית. נבחן את מאפייניה המרכזיים לעומת סמכות מסורתית וכריזמטית.",
    formulaLatex:
      "\\text{Authority: legal-rational } \\succ \\text{ traditional, charismatic (ideal type)}",
    instruction:
      "איזו קבוצת מאפיינים מתארת נכון את הטיפוס הבירוקרטי האידיאלי של ובר?",
    options: [
      {
        id: "orgth-q01-opt1",
        plainText:
          "היררכיה ברורה, חלוקת עבודה פורמלית, כללים כתובים, גיוס לפי כישורים (merit), והפרדה בין תפקיד לבין בעלות אישית על המשאבים.",
        isCorrect: true,
        explanation:
          "נכון: אצל ובר הבירוקרטיה מבוססת על סמכות חוקית-רציונלית: משרות מוגדרות בכללים, שרשרת פיקוח היררכית, תיעוד כתוב, מינוי מקצועי לפי מומחיות, ושכר קבוע — תוך הפרדת רכוש הארגון מרכוש בעל התפקיד. זהו מודל יעילות אדמיניסטרטיבית, לא תיאור אמפירי של כל ארגון.",
      },
      {
        id: "orgth-q01-opt2",
        plainText:
          "מנהיגות כריזמטית אישית, גמישות מוחלטת בכללים, וגיוס על בסיס קרבה משפחתית בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: אלה מאפיינים של סמכות כריזמטית או מסורתית/פטרונימית, לא של הטיפוס הבירוקרטי.",
      },
      {
        id: "orgth-q01-opt3",
        plainText:
          "ביטול מוחלט של היררכיה לטובת דמוקרטיה ישירה בכל החלטה תפעולית.",
        isCorrect: false,
        explanation:
          "שגוי: ובר ראה בהיררכיה מרכיב מרכזי של הבירוקרטיה; דמוקרטיזציה מלאה של כל החלטה אינה חלק מהטיפוס האידיאלי שלו.",
      },
      {
        id: "orgth-q01-opt4",
        plainText:
          "ובר טען שהבירוקרטיה היא צורת ארגון לא-יעילה שצריך להחליף בשוק חופשי בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ובר ראה בבירוקרטיה את הצורה היעילה ביותר טכנית של ארגון בקנה מידה גדול — לצד אזהרותיו מפני \"כלוב הברזל\" של רציונליזציה.",
      },
    ],
  },
  {
    id: "orgth-q02-contingency-theory-fit",
    domain: "תיאוריית התלות ההקשרית (Contingency)",
    title: "תורת הארגון והניהול - תיאוריית Contingency",
    context:
      "תיאוריות Contingency (למשל Lawrence & Lorsch, Burns & Stalker) מדגישות התאמה בין מבנה הארגון לבין סביבה וטכנולוגיה. נסמן את רמת אי-הוודאות הסביבתית ב-$U$ ואת מידת האורגניות של המבנה ב-$O$.",
    formulaLatex:
      "\\text{Performance} \\uparrow \\iff \\operatorname{Fit}(O, U,\\ \\text{Technology})",
    instruction:
      "מהו העיקרון המרכזי של תיאוריית התלות ההקשרית?",
    options: [
      {
        id: "orgth-q02-opt1",
        plainText:
          "אין מבנה אוניברסלי אופטימלי: בסביבה יציבה מתאים מבנה מכניסטי/פורמלי, ובסביבה דינמית ובעלת $U$ גבוהה מתאים מבנה אורגני וגמיש יותר.",
        isCorrect: true,
        explanation:
          "נכון: Contingency דוחה \"one best way\". ההתאמה (fit) בין מבנה, סביבה וטכנולוגיה קובעת ביצועים. Burns & Stalker: מכניסטי ליציבות, אורגני לחדשנות ואי-ודאות. Lawrence & Lorsch: דיפרנציאציה גבוהה דורשת אינטגרציה מתאימה.",
      },
      {
        id: "orgth-q02-opt2",
        plainText:
          "מבנה בירוקרטי הדוק הוא תמיד העדיף, ללא תלות בסביבה.",
        isCorrect: false,
        explanation:
          "שגוי: זו גישת ה-Classical Management / Scientific Management, לא Contingency.",
      },
      {
        id: "orgth-q02-opt3",
        plainText:
          "ככל שאי-הוודאות $U$ גבוהה יותר, יש להקטין תמיד את הדיפרנציאציה לאפס.",
        isCorrect: false,
        explanation:
          "שגוי: בסביבות מורכבות לעיתים מגדילים דיפרנציאציה בין יחידות, ומפצים באינטגרציה — לא מבטלים התמחות.",
      },
      {
        id: "orgth-q02-opt4",
        plainText:
          "המבנה נקבע רק על ידי גודל הארגון $N$, לפי $O = \\log N$, ללא קשר לסביבה.",
        isCorrect: false,
        explanation:
          "שגוי: גודל הוא משתנה Contingency אפשרי, אך אינו הנוסחה היחידה; הסביבה והטכנולוגיה מרכזיות לא פחות.",
      },
    ],
  },
  {
    id: "orgth-q03-mintzberg-five-configurations",
    domain: "מבני מינצברג (Mintzberg)",
    title: "תורת הארגון והניהול - תצורות מבניות של Mintzberg",
    context:
      "מינצברג מבחין בחמישה חלקים בסיסיים (strategic apex, middle line, operating core, technostructure, support staff) ובמנגנוני תיאום דומיננטיים.",
    formulaLatex:
      "\\text{Machine Bureaucracy} \\leftrightarrow \\text{Standardization of work processes}",
    instruction:
      "באיזו תצורה מנגנון התיאום הדומיננטי הוא סטנדרטיזציה של תהליכי עבודה באמצעות technostructure חזקה?",
    options: [
      {
        id: "orgth-q03-opt1",
        plainText:
          "בירוקרטיה מכונתית (Machine Bureaucracy) — לדוגמה ארגון ייצור המוני עם נהלים מפורטים.",
        isCorrect: true,
        explanation:
          "נכון: ב-Machine Bureaucracy ה-technostructure (תכנון, איכות, Methods) דומיננטית, והתיאום נעשה בעיקר על ידי סטנדרטיזציה של תהליכים. לעומת זאת, Professional Bureaucracy מסתמכת על סטנדרטיזציה של כישורים; Adhocracy על התאמה הדדית; Simple Structure על פיקוח ישיר.",
      },
      {
        id: "orgth-q03-opt2",
        plainText:
          "Adhocracy — כי חדשנות דורשת תמיד נהלי עבודה קשיחים מראש.",
        isCorrect: false,
        explanation:
          "שגוי: Adhocracy מבוססת על התאמה הדדית (mutual adjustment) וצוותים זמניים, לא על סטנדרטיזציית תהליכים.",
      },
      {
        id: "orgth-q03-opt3",
        plainText:
          "Simple Structure — כי הצמרת האסטרטגית כותבת נהלים מפורטים לכל עובד.",
        isCorrect: false,
        explanation:
          "שגוי: במבנה פשוט התיאום הדומיננטי הוא פיקוח ישיר של המנהל, לא מערכת נהלים מפותחת.",
      },
      {
        id: "orgth-q03-opt4",
        plainText:
          "Divisionalized Form — כי כל חטיבה חייבת זהות מוחלטת של תהליכי ליבה.",
        isCorrect: false,
        explanation:
          "שגוי: בחטיבתיות התיאום המרכזי הוא סטנדרטיזציה של תפוקות/ביצועים (performance control), לא בהכרח זהות תהליכים בכל החטיבות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 (agency, TCE, motivation) — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "orgth-q04-agency-theory-moral-hazard",
    domain: "תיאוריית הסוכנות (Agency Theory)",
    title: "תורת הארגון והניהול - Agency Theory וסיכוני מוסר",
    context:
      "בעל מניות (principal) ממנה מנכ״ל (agent). התועלת של הסוכן תלויה במאמץ $e$ ובתגמול $w$, ותוצאת הפירמה $x = e + \\varepsilon$ כאשר $\\varepsilon$ הוא רעש אקראי שאינו נצפה ישירות.",
    formulaLatex:
      "x = e + \\varepsilon,\\quad \\varepsilon \\sim \\text{noise};\\quad e\\ \\text{unobservable}",
    instruction:
      "מהו הפתרון החוזי הטיפוסי לבעיית הסיכון המוסרי (moral hazard) במודל זה?",
    options: [
      {
        id: "orgth-q04-opt1",
        plainText:
          "תשלום קבוע $w$ שאינו תלוי ב-$x$, כדי לבטל לחלוטין את סיכון הסוכן.",
        isCorrect: false,
        explanation:
          "שגוי: שכר קבוע מחליש תמריצים למאמץ כאשר $e$ אינו נצפה — זו בדיוק בעיית הסיכון המוסרי.",
      },
      {
        id: "orgth-q04-opt2",
        plainText:
          "חוזה תמריצים הקושר חלק מהתגמול לביצועים הנצפים $x$ (למשל בונוס/אופציות), תוך פשרה בין תמריץ לבין שיתוף בסיכון עם סוכן שונא-סיכון.",
        mathText: "w = w(x)\\ \\text{(incentive–risk trade-off)}",
        isCorrect: true,
        explanation:
          "נכון: כש-$e$ אינו בר-תצפית, מעצבים חוזה $w(x)$ שיוצר תמריץ למאמץ. אם הסוכן שונא סיכון, רגישות גבוהה מדי ל-$x$ יקרה — מכאן ה-trade-off הקלאסי בין incentive ל-risk sharing בתיאוריית הסוכנות.",
      },
      {
        id: "orgth-q04-opt3",
        plainText:
          "ביטול מוחלט של פיקוח דירקטוריון, כי השוק יפתור הכל ללא עלות.",
        isCorrect: false,
        explanation:
          "שגוי: מנגנוני ממשל תאגידי (דירקטוריון, ביקורת) הם דווקא כלים להפחתת עלויות סוכנות.",
      },
      {
        id: "orgth-q04-opt4",
        plainText:
          "הבעיה אינה קיימת אם $\\varepsilon \\neq 0$, כי אז לא ניתן להסיק דבר על $e$.",
        isCorrect: false,
        explanation:
          "שגוי: דווקא כשיש רעש נוצרת בעיית הסקה; עדיין ניתן לעצב חוזים אופטימליים במונחי תוחלת, גם אם אינם מזהים את $e$ בוודאות.",
      },
    ],
  },
  {
    id: "orgth-q05-transaction-cost-economics-make-or-buy",
    domain: "כלכלת עלויות עסקה (TCE)",
    title: "תורת הארגון והניהול - Transaction Cost Economics",
    context:
      "לפי Williamson, הבחירה בין שוק להיררכיה (make-or-buy) תלויה בעלויות עסקה. נסמן ספציפיות נכסים ב-$k$, אי-ודאות ב-$u$, ותדירות עסקאות ב-$f$.",
    formulaLatex:
      "\\text{Governance}^* = \\arg\\min \\{\\text{TC}_{\\text{market}},\\ \\text{TC}_{\\text{hybrid}},\\ \\text{TC}_{\\text{hierarchy}}\\}",
    instruction:
      "מתי תיאוריית TCE חוזה העדפה להיררכיה פנים-ארגונית על פני שוק?",
    options: [
      {
        id: "orgth-q05-opt1",
        plainText:
          "כאשר $k \\approx 0$ והשוק תחרותי לחלוטין — אז תמיד עדיף לייצר בפנים.",
        isCorrect: false,
        explanation:
          "שגוי: בספציפיות נכסים נמוכה השוק זול יחסית; ההיררכיה יקרה בתקורה בירוקרטית.",
      },
      {
        id: "orgth-q05-opt2",
        plainText:
          "כאשר ספציפיות הנכסים $k$ גבוהה (חשש ל-hold-up), יחד עם אי-ודאות $u$ ותדירות $f$ משמעותיות — אז עלויות החוזה בשוק עולות וההיררכיה נעשית עדיפה.",
        mathText: "k\\uparrow,\\ u\\uparrow,\\ f\\uparrow \\Rightarrow \\text{hierarchy}",
        isCorrect: true,
        explanation:
          "נכון: נכסים ספציפיים יוצרים תלות דו-צדדית וסיכון לניצול אחרי השקעה (hold-up). חוזים לא-שלמים בסביבה לא-ודאית מייקרים משא ומתן ופיקוח בשוק; לכן אינטגרציה אנכית / היררכיה מפחיתה עלויות עסקה — זה לב TCE.",
      },
      {
        id: "orgth-q05-opt3",
        plainText:
          "TCE טוענת שמבנה הממשל אינו רלוונטי כי עלויות העסקה תמיד אפסיות.",
        isCorrect: false,
        explanation:
          "שגוי: הנחת Coase/Williamson היא דווקא שעלויות עסקה חיוביות ומעצבות מוסדות.",
      },
      {
        id: "orgth-q05-opt4",
        plainText:
          "היררכיה נבחרת רק כשעלות הייצור הטכנית המינימלית נמוכה יותר, ללא קשר לחוזים.",
        isCorrect: false,
        explanation:
          "שגוי: הבחנה מרכזית ב-TCE היא בין עלויות ייצור לבין עלויות עסקה (משא ומתן, פיקוח, אופורטוניזם).",
      },
    ],
  },
  {
    id: "orgth-q06-motivation-expectancy-equity",
    domain: "מוטיבציה - Expectancy ו-Equity",
    title: "תורת הארגון והניהול - מוטיבציה: Expectancy ו-Equity",
    context:
      "מודל ה-Expectancy של Vroom מגדיר מוטיבציה כ-$M = E \\times I \\times V$, ומודל ה-Equity של Adams משווה יחסי תפוקות/תשומות בין פרט לבין אחרים להשוואה.",
    formulaLatex:
      "M = E \\times I \\times V,\\qquad \\frac{O_p}{I_p} \\stackrel{?}{=} \\frac{O_o}{I_o}",
    instruction:
      "עובד מעריך $E$ גבוה ו-$V$ גבוה, אך מאמין שביצוע לא יוביל לתגמול ($I \\approx 0$). במקביל הוא חש ש-$O_p/I_p < O_o/I_o$. מה צפוי?",
    options: [
      {
        id: "orgth-q06-opt1",
        plainText:
          "המוטיבציה תהיה מקסימלית כי $E$ ו-$V$ גבוהים מספיקים לבדם.",
        isCorrect: false,
        explanation:
          "שגוי: במכפלת Vroom אם $I \\approx 0$ אז $M \\approx 0$ — אין קישור ביצוע→תגמול.",
      },
      {
        id: "orgth-q06-opt2",
        plainText:
          "המוטיבציה לפי Expectancy נמוכה בגלל $I \\approx 0$, ונוסף לכך תחושת אי-צדק (inequity) עלולה להוביל להפחתת מאמץ, עזיבה או שינוי תפיסת ההשוואה.",
        isCorrect: true,
        explanation:
          "נכון: Expectancy דורש שלושה רכיבים חיוביים; כשל ב-instrumentality מחליש מוטיבציה גם אם היכולת והערך גבוהים. Equity מוסיף השוואה חברתית: תת-תגמול יחסי מעורר מתח ומנגנוני איזון (הפחתת $I_p$, הגדלת $O_p$, עזיבה, או רציונליזציה).",
      },
      {
        id: "orgth-q06-opt3",
        plainText:
          "מודל Equity קובע שתמיד $O_p/I_p = 1$ במספרים מוחלטים, ללא השוואה לאחרים.",
        isCorrect: false,
        explanation:
          "שגוי: Equity הוא יחס יחסי לאחר השוואה ($o$), לא נורמה מוחלטת של 1.",
      },
      {
        id: "orgth-q06-opt4",
        plainText:
          "כאשר $I \\approx 0$ העובד מגדיל אוטומטית את $V$ עד שהמכפלה מפוצה.",
        isCorrect: false,
        explanation:
          "שגוי: אין מנגנון כזה במודל; ערך התגמול ($V$) אינו \"מתקן\" היעדר קשר ביצוע–תגמול.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 (culture, span of control, matrix) — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "orgth-q07-organizational-culture-levels",
    domain: "תרבות ארגונית",
    title: "תורת הארגון והניהול - תרבות ארגונית (Schein)",
    context:
      "Schein מבחין בשלוש רמות תרבות: artifacts, espoused values, ו-basic underlying assumptions.",
    formulaLatex:
      "\\text{Artifacts} \\rightarrow \\text{Espoused Values} \\rightarrow \\text{Basic Assumptions}",
    instruction:
      "מנהל חדש רואה משרדים פתוחים וסיסמאות על \"חדשנות\", אך העובדים נענשים בפועל על ניסוי וטעייה. מהו הניתוח הנכון?",
    options: [
      {
        id: "orgth-q07-opt1",
        plainText:
          "ה-artifacts והסיסמאות הם התרבות האמיתית; אין צורך לבחון הנחות עמוקות.",
        isCorrect: false,
        explanation:
          "שגוי: artifacts הם השכבה הנראית בלבד ועלולים להטעות לגבי ההנחות האמיתיות.",
      },
      {
        id: "orgth-q07-opt2",
        plainText:
          "תרבות ארגונית אינה קיימת כקונסטרוקט מדעי ואין לה השפעה על התנהגות.",
        isCorrect: false,
        explanation:
          "שגוי: בספרות הארגונית תרבות נחשבת למשתנה מרכזי המעצב נורמות, למידה ושינוי.",
      },
      {
        id: "orgth-q07-opt3",
        plainText:
          "קיים פער בין ערכים מוצהרים (espoused) לבין הנחות בסיס/פרקטיקה בפועל; התרבות האפקטיבית מתגלית בהתנהגות המתוגמלת, לא בסיסמאות.",
        isCorrect: true,
        explanation:
          "נכון: לפי Schein, basic assumptions הן הליבה — לרוב לא-מודעות וקשות לשינוי. כאשר artifacts וערכים מוצהרים סותרים את מה שמתוגמל בפועל, ההתנהגות תואמת את ההנחות האמיתיות (כאן: הימנעות מסיכון), לא את הסיסמה.",
      },
      {
        id: "orgth-q07-opt4",
        plainText:
          "משרד פתוח מוכיח מתמטית ש-$\\text{Innovation Rate} = 1$ בארגון.",
        isCorrect: false,
        explanation:
          "שגוי: עיצוב פיזי הוא artifact; אין קשר דטרמיניסטי פשוט בין layout לבין חדשנות בפועל.",
      },
    ],
  },
  {
    id: "orgth-q08-span-of-control-tradeoff",
    domain: "טווח שליטה (Span of Control)",
    title: "תורת הארגון והניהול - Span of Control",
    context:
      "ארגון עם $N$ עובדי קו וטווח שליטה אחיד $s$ (מספר כפיפים ישירים למנהל) יוצר מספר דרגות היררכיה מקורב $h \\approx \\log_s N$.",
    formulaLatex: "h \\approx \\log_s N,\\qquad s = \\text{span of control}",
    instruction:
      "מהו ה-trade-off המרכזי בהגדלת $s$?",
    options: [
      {
        id: "orgth-q08-opt1",
        plainText:
          "הגדלת $s$ תמיד משפרת פיקוח פרטני ומגדילה את $h$.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת $s$ מקטינה את $h$ (היררכיה שטוחה יותר) ומחלישה את עומק הפיקוח הפרטני.",
      },
      {
        id: "orgth-q08-opt2",
        plainText:
          "$s$ אינו משפיע על מספר הדרגות; $h$ תלוי רק בתרבות הלאומית.",
        isCorrect: false,
        explanation:
          "שגוי: הקשר הלוגריתמי $h \\approx \\log_s N$ הוא עקרון מבני בסיסי בתורת הארגון.",
      },
      {
        id: "orgth-q08-opt3",
        plainText:
          "הגדלת $s$ מקטינה את מספר הדרגות $h$ ואת עלויות הניהול, אך מגדילה את העומס על כל מנהל ומקטינה פיקוח צמוד — במיוחד כשהמשימות מורכבות ותלויות-גומלין.",
        mathText: "s\\uparrow \\Rightarrow h\\downarrow,\\ \\text{managerial load}\\uparrow",
        isCorrect: true,
        explanation:
          "נכון: span רחב → ארגון שטוח וזול יותר בהיררכיה, אך כל מנהל מפקח על יותר אנשים. במשימות מורכבות/תלויות נדרש לרוב span צר יותר. זו פשרה קלאסית בין עלות שליטה לבין איכות תיאום.",
      },
      {
        id: "orgth-q08-opt4",
        plainText:
          "הערך האופטימלי האוניברסלי הוא תמיד $s = 2$, לכל טכנולוגיה וסביבה.",
        isCorrect: false,
        explanation:
          "שגוי: אין מספר קסם אוניברסלי; האופטימום תלוי Contingency (מורכבות, דמיון משימות, פיזור גאוגרפי).",
      },
    ],
  },
  {
    id: "orgth-q09-matrix-organization-dual-authority",
    domain: "מבנה מטריצה (Matrix)",
    title: "תורת הארגון והניהול - ארגון מטריציוני",
    context:
      "במבנה Matrix עובד מדווח בו-זמנית למנהל פונקציונלי ולמנהל פרויקט/מוצר (dual authority).",
    formulaLatex:
      "\\text{Employee} \\leftarrow \\text{Functional Mgr} \\times \\text{Project Mgr}",
    instruction:
      "מהו היתרון המרכזי ומהו הסיכון המבני האופייני למטריצה?",
    options: [
      {
        id: "orgth-q09-opt1",
        plainText:
          "יתרון: ביטול מוחלט של קונפליקטים; סיכון: היעדר גמישות הקצאת מומחים.",
        isCorrect: false,
        explanation:
          "שגוי: מטריצה דווקא מגדילה פוטנציאל קונפליקט סמכויות, וגמישות הקצאת מומחים היא יתרון.",
      },
      {
        id: "orgth-q09-opt2",
        plainText:
          "מטריצה זהה מבנית לבירוקרטיה מכונתית עם שרשרת פיקוד יחידה בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: עקרון unity of command מופר במכוון במטריצה לטובת דיווח כפול.",
      },
      {
        id: "orgth-q09-opt3",
        plainText:
          "יתרון: שילוב מומחיות פונקציונלית עם מיקוד פרויקטלי/מוצרי וגמישות משאבים; סיכון: מעמעום אחריות, קונפליקטי סמכות ועלות תיאום גבוהה.",
        isCorrect: true,
        explanation:
          "נכון: המטריצה נועדה לאזן בין יתרונות חלוקה פונקציונלית לבין צרכי פרויקט חוצי-יחידות. המחיר הוא הפרת unity of command: דיווח כפול מייצר קונפליקטים, משא ומתן מתמיד על זמן העובד, ועומס תיאום ניהולי.",
      },
      {
        id: "orgth-q09-opt4",
        plainText:
          "במטריצה אין כלל מנהלים פונקציונליים — רק צוותי פרויקט זמניים.",
        isCorrect: false,
        explanation:
          "שגוי: תיאור זה קרוב יותר ל-projectized / Adhocracy טהורה; במטריצה שני צירי סמכות מתקיימים במקביל.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 (change, principal-agent, bounded rationality) — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "orgth-q10-change-management-kotter-lewin",
    domain: "ניהול שינוי ארגוני",
    title: "תורת הארגון והניהול - Change Management",
    context:
      "מודלים קלאסיים לשינוי כוללים את Lewin ($\\text{Unfreeze} \\rightarrow \\text{Change} \\rightarrow \\text{Refreeze}$) ואת 8 השלבים של Kotter (בהם יצירת urgency, קואליציה מנחה, חזון, והטמעה בתרבות).",
    formulaLatex:
      "\\text{Lewin: Unfreeze} \\to \\Delta \\to \\text{Refreeze}",
    instruction:
      "ארגון משיק מערכת מידע חדשה, מפיץ סיסמאות בלבד, ואינו מטפל בהתנגדות ובמבני תמריצים. לפי המודלים, מה חסר?",
    options: [
      {
        id: "orgth-q10-opt1",
        plainText:
          "חסר רק חומרה חזקה יותר; התנהגות אנושית אינה רלוונטית לשינוי ארגוני.",
        isCorrect: false,
        explanation:
          "שגוי: ליבת ניהול השינוי היא אנושית-ארגונית (התנגדות, קואליציות, הטמעה), לא רק טכנולוגיה.",
      },
      {
        id: "orgth-q10-opt2",
        plainText:
          "לפי Lewin מספיק שלב ה-Change בלבד; Unfreeze ו-Refreeze מיותרים.",
        isCorrect: false,
        explanation:
          "שגוי: בלי Unfreeze אין מוכנות, ובלי Refreeze השינוי אינו מתייצב בנורמות ובמערכות.",
      },
      {
        id: "orgth-q10-opt3",
        plainText:
          "Kotter טוען שדי בחזון כתוב על הקיר ללא קואליציה או wins קצרי-טווח.",
        isCorrect: false,
        explanation:
          "שגוי: Kotter מדגיש urgency, guiding coalition, תקשורת חזון, empowering, short-term wins והטמעה.",
      },
      {
        id: "orgth-q10-opt4",
        plainText:
          "חסרים Unfreeze אמיתי (דחיפות, פירוק הגנות), קואליציית שינוי, יישור תמריצים/מבנה, ו-Refreeze תרבותי — בלי אלה השינוי נותר סיסמה ולא מוסד.",
        isCorrect: true,
        explanation:
          "נכון: גם Lewin וגם Kotter מדגישים הכנת המערכת לשינוי והטמעתו במבנים, מדידה ותגמולים. התעלמות מהתנגדות ומתמריצים משאירה artifacts של שינוי ללא שינוי בהתנהגות — כישלון הטמעה קלאסי.",
      },
    ],
  },
  {
    id: "orgth-q11-principal-agent-adverse-selection",
    domain: "Principal–Agent ומידע אסימטרי",
    title: "תורת הארגון והניהול - Principal–Agent ו-Adverse Selection",
    context:
      "לפני חתימת חוזה, לסוכן יש מידע פרטי על טיפוסו (למשל פרודוקטיביות $\\theta \\in \\{\\theta_L, \\theta_H\\}$) שאינו ידוע ל-principal. לאחר החתימה עשויה להופיע גם בעיית מאמץ נסתר.",
    formulaLatex:
      "\\theta \\in \\{\\theta_L,\\theta_H\\}\\ \\text{(private pre-contract)};\\quad e\\ \\text{(post-contract)}",
    instruction:
      "איזו הבחנה נכונה בין Adverse Selection לבין Moral Hazard בהקשר Principal–Agent?",
    options: [
      {
        id: "orgth-q11-opt1",
        plainText:
          "שני המונחים זהים לחלוטין ומתארים רק בעיות אחרי החתימה.",
        isCorrect: false,
        explanation:
          "שגוי: Adverse Selection היא בעיית מידע נסתר לפני החוזה; Moral Hazard היא פעולה נסתרת אחריו.",
      },
      {
        id: "orgth-q11-opt2",
        plainText:
          "Adverse Selection קיימת רק בביטוח רפואי ואינה רלוונטית לארגונים.",
        isCorrect: false,
        explanation:
          "שגוי: בגיוס עובדים, בחירת קבלנים ובממשל תאגידי — Adverse Selection מרכזית גם בארגונים.",
      },
      {
        id: "orgth-q11-opt3",
        plainText:
          "Moral Hazard נפתרת תמיד על ידי העלאת שכר קבוע ללא תמריצים.",
        isCorrect: false,
        explanation:
          "שגוי: שכר קבוע מחליש תמריצים; ל-Moral Hazard נדרשים ניטור, תמריצים או סנקציות.",
      },
      {
        id: "orgth-q11-opt4",
        plainText:
          "Adverse Selection: מידע נסתר על טיפוס לפני החוזה (סינון/סיגנלים/screening); Moral Hazard: פעולה נסתרת אחרי החוזה (תמריצים/ניטור). שניהם עלויות סוכנות.",
        isCorrect: true,
        explanation:
          "נכון: זו ההבחנה הסטנדרטית בכלכלת מידע. לפני החוזה — מנגנוני screening (תפריט חוזים) או signaling (השכלה, ערבויות). אחרי החוזה — incentive compatibility וניטור. יחד הם מרכיבים מרכזיים של עלויות הסוכנות בארגון.",
      },
    ],
  },
  {
    id: "orgth-q12-bounded-rationality-satisficing",
    domain: "רציונליות חסומה (Bounded Rationality)",
    title: "תורת הארגון והניהול - Bounded Rationality של Simon",
    context:
      "Herbert Simon טען שמקבלי החלטות בארגון פועלים תחת מגבלות קוגניטיביות ומידע. במקום מקסום גלובלי של פונקציית תועלת $U(x)$, הם מחפשים חלופה מספקת (satisficing) מעל סף שאיפה $\\alpha$.",
    formulaLatex:
      "\\text{Choose first } x\\ \\text{s.t. } U(x) \\ge \\alpha\\quad (\\text{satisficing})",
    instruction:
      "מהי המשמעות הארגונית של Bounded Rationality?",
    options: [
      {
        id: "orgth-q12-opt1",
        plainText:
          "מנהלים תמיד ממקסמים תוחלת תועלת עם מידע מלא וכוח חישוב אינסופי.",
        isCorrect: false,
        explanation:
          "שגוי: זהו מודל הרציונליות הכלכלית הקלאסית ש-Simon ביקר.",
      },
      {
        id: "orgth-q12-opt2",
        plainText:
          "Bounded Rationality פירושה שמנהלים בוחרים באקראי לחלוטין ללא כללים.",
        isCorrect: false,
        explanation:
          "שגוי: הם רציונליים באופן מוגבל — משתמשים בהיוריסטיקות, שגרות וסף שאיפה, לא באקראיות טהורה.",
      },
      {
        id: "orgth-q12-opt3",
        plainText:
          "המושג רלוונטי רק לפסיכולוגיה אישית ואין לו השלכות על מבנה ארגוני.",
        isCorrect: false,
        explanation:
          "שגוי: Simon קישר ישירות בין מגבלות קוגניטיביות לבין חלוקת עבודה, SOPs והיררכיה כמנגנוני פישוט החלטות.",
      },
      {
        id: "orgth-q12-opt4",
        plainText:
          "עקב מגבלות מידע וחישוב, ארגונים נשענים על שגרות, SOPs והיררכיה, ומקבלי החלטות מסתפקים בחלופה העוברת סף $\\alpha$ במקום למקסם גלובלית — זהו satisficing.",
        mathText: "\\text{satisficing: } U(x)\\ge\\alpha",
        isCorrect: true,
        explanation:
          "נכון: Bounded Rationality מסבירה מדוע ארגונים מפצלים בעיות, קובעים נהלים ומדדים מקומיים, ומדוע החלטות הן \"טובות מספיק\" ולא אופטימום תיאורטי. סף השאיפה $\\alpha$ עצמו מתעדכן בלמידה ארגונית — ליבת הגישה ההתנהגותית לארגון של Simon.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_ORGANIZATION_THEORY_QUESTIONS =
  ORGANIZATION_THEORY_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Weber / Contingency / Mintzberg (Q1–3)
 * - 1 from Agency / TCE / Motivation (Q4–6)
 * - 1 from Culture / Span / Matrix / Change / Principal–Agent / Bounded Rationality (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleOrganizationTheoryOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupBasics = ORGANIZATION_THEORY_QUESTIONS.slice(0, 3);
  const groupMid = ORGANIZATION_THEORY_QUESTIONS.slice(3, 6);
  const groupAdvanced = ORGANIZATION_THEORY_QUESTIONS.slice(6, 12);

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
