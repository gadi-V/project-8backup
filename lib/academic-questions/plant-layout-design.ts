import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic תכנון מערכי מפעל וייצור diagnostic bank (12Q).
 * Display name: "תכנון מערכי מפעל וייצור" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const PLANT_LAYOUT_DESIGN_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "plant-q01-slp-systematic-layout-planning",
    domain: "תכנון מערך שיטתי (SLP)",
    title: "תכנון מערכי מפעל וייצור - תכנון מערך שיטתי (Systematic Layout Planning)",
    context:
      "מתודולוגיית SLP של Muther מגדירה תהליך מובנה לתכנון מערך: מאיסוף נתוני זרימה ויחסים, דרך דיאגרמת יחסי פעילויות, ועד להצבת מחלקות במרחב ופיתוח חלופות מערך להערכה.",
    formulaLatex:
      "\\text{SLP}:\\ \\text{PQRST} \\to \\text{Flow/REL} \\to \\text{ARD} \\to \\text{Space} \\to \\text{Layout alternatives}",
    instruction:
      "מהו סדר השלבים המרכזי ב-SLP, ומה תפקיד נתוני ה-PQRST בתחילת התהליך?",
    options: [
      {
        id: "plant-q01-opt1",
        plainText:
          "אוספים תחילה נתוני Product / Quantity / Routing / Services / Timing (PQRST), גוזרים מהם תרשימי זרימה ותרשימי יחסים (REL), בונים דיאגרמת יחסי פעילויות (ARD), מחשבים דרישות שטח, ורק אז מפתחים חלופות מערך ומעריכים אותן.",
        mathText:
          "\\text{PQRST} \\xrightarrow{\\text{flow/REL}} \\text{ARD} \\xrightarrow{\\text{space}} \\text{layouts}",
        isCorrect: true,
        explanation:
          "נכון: SLP הוא תהליך מלמעלה-למטה. שלב ה-PQRST מגדיר מה מייצרים, בכמה, באיזה מסלול, אילו שירותים תומכים, ובאיזה תזמון — וממנו נגזרים From-To ו-REL. רק לאחר דיאגרמת היחסים ודרישות השטח עוברים להצבת מחלקות ולחלופות מערך. דילוג על PQRST או התחלה ישירה משרטוט רצפה מפר את המתודולוגיה.",
      },
      {
        id: "plant-q01-opt2",
        plainText:
          "מתחילים בהצבת מכונות על תוכנית הרצפה, ורק לאחר מכן אוספים נתוני PQRST לתיעוד.",
        isCorrect: false,
        explanation:
          "שגוי: הצבה מוקדמת ללא ניתוח זרימה ויחסים יוצרת מערך אד-הוק ולא שיטתי.",
      },
      {
        id: "plant-q01-opt3",
        plainText:
          "SLP דורש רק טבלת עלויות טיפול בחומר ומתעלם מיחסי קרבה איכותיים.",
        isCorrect: false,
        explanation:
          "שגוי: SLP משלב זרימה כמותית (From-To) עם יחסי קרבה איכותיים (REL/Muther).",
      },
      {
        id: "plant-q01-opt4",
        plainText:
          "ב-SLP בוחרים תחילה אלגוריתם CRAFT ואז מגדירים את נתוני הקלט.",
        isCorrect: false,
        explanation:
          "שגוי: CRAFT הוא כלי אופטימיזציה מאוחר יותר; SLP קובע תחילה את מבנה הנתונים והיחסים.",
      },
    ],
  },
  {
    id: "plant-q02-from-to-chart-flow-intensity",
    domain: "תרשים From-To ועוצמת זרימה",
    title: "תכנון מערכי מפעל וייצור - תרשים From-To ועוצמת זרימת חומרים",
    context:
      "נתונה מטריצת From-To בין $n=4$ מחלקות. הכניסה $f_{ij}$ מייצגת את נפח התנועות ממחלקה $i$ למחלקה $j$ ליחידת זמן. מרחק המרכזים בין מחלקות הוא $d_{ij}$.",
    formulaLatex:
      "F = [f_{ij}], \\quad TC = \\sum_{i=1}^{n}\\sum_{j=1}^{n} f_{ij}\\, d_{ij}\\, c_{ij}",
    instruction:
      "כיצד מפרשים את תרשים ה-From-To, ומה הקשר בין עוצמת הזרימה $f_{ij}$ לבין עלות הטיפול הכוללת $TC$?",
    options: [
      {
        id: "plant-q02-opt1",
        plainText:
          "התרשים הוא מטריצה מכוונת של עוצמות זרימה; זוגות עם $f_{ij}$ גבוהים מועמדים להצבה קרובה כי תרומתם ל-$TC = \\sum_i\\sum_j f_{ij} d_{ij} c_{ij}$ גדולה כאשר $d_{ij}$ גדול.",
        mathText: "TC = \\sum_i\\sum_j f_{ij} d_{ij} c_{ij}",
        isCorrect: true,
        explanation:
          "נכון: From-To מתעד זרימה כמותית מכוונת. עלות הטיפול הכוללת היא סכום מכפלות העוצמה, המרחק ועלות היחידה. לכן זוגות בעוצמה גבוהה מקבלים עדיפות לקירוב מרחקים במערך — זה הבסיס הכמותי להחלטות הצבה ולמדדי הערכה של חלופות.",
      },
      {
        id: "plant-q02-opt2",
        plainText:
          "תרשים From-To הוא סימטרי תמיד, ולכן $f_{ij} = f_{ji}$ בהכרח לכל זוג.",
        isCorrect: false,
        explanation:
          "שגוי: זרימה יכולה להיות חד-כיוונית; הסימטריה אינה מובטחת אלא אם מאחדים כיוונים במכוון.",
      },
      {
        id: "plant-q02-opt3",
        plainText:
          "העלות $TC$ אינה תלויה במרחקים $d_{ij}$ אלא רק במספר המחלקות $n$.",
        isCorrect: false,
        explanation:
          "שגוי: המרחק הוא משתנה ההחלטה המרכזי במערך; $TC$ ליניארי ב-$d_{ij}$ תחת מודל עלות סטנדרטי.",
      },
      {
        id: "plant-q02-opt4",
        plainText:
          "עוצמת זרימה גבוהה מחייבת תמיד מערך Fixed-Position ללא קשר למרחק.",
        isCorrect: false,
        explanation:
          "שגוי: Fixed-Position מתאים למוצרים גדולים/נייחים; עוצמת זרימה גבוהה דווקא דוחפת לקירוב מחלקות במערך תהליך/מוצר.",
      },
    ],
  },
  {
    id: "plant-q03-rel-chart-activity-relationship",
    domain: "תרשים REL ודיאגרמת יחסים",
    title: "תכנון מערכי מפעל וייצור - תרשים REL ודיאגרמת יחסי פעילויות (ARD)",
    context:
      "תרשים Relationship Chart (REL) מקצה לכל זוג מחלקות דירוג קרבה איכותי לפי סולם Muther. דיאגרמת יחסי הפעילויות (Activity Relationship Diagram) מתרגמת את הדירוגים לגרף הצבה ראשוני.",
    formulaLatex:
      "\\text{REL}:\\ (i,j) \\mapsto \\{A,E,I,O,U,X\\}, \\quad \\text{lines} \\propto \\text{closeness}",
    instruction:
      "מה הקשר בין דירוגי ה-REL לבין בניית דיאגרמת יחסי הפעילויות (ARD)?",
    options: [
      {
        id: "plant-q03-opt1",
        plainText:
          "ב-ARD מחברים מחלקות בקווים שמספרם/עוביים משקף את חוזק הקרבה (למשל $A$ בארבעה קווים, $E$ בשלושה), בעוד דירוג $X$ מסמן הפרדה נדרשת; הדיאגרמה משמשת בסיס ויזואלי לפני הקצאת שטחים והצבה סופית.",
        mathText: "A\\!:4,\\ E\\!:3,\\ I\\!:2,\\ O\\!:1,\\ U\\!:0,\\ X\\!:\\text{repel}",
        isCorrect: true,
        explanation:
          "נכון: REL הוא קלט איכותי; ARD הוא ייצוג גרפי שבו חוזק הקשר מוצג בקווים. דירוגי $A$/$E$ נמשכים למרכז/קירוב, ו-$X$ נדחף להפרדה. השלב הבא הוא שילוב עם דרישות שטח ליצירת Block Layout — לא דילוג ישיר לשרטוט ציוד מפורט.",
      },
      {
        id: "plant-q03-opt2",
        plainText:
          "ARD מחליף לחלוטין את תרשים ה-From-To ואוסר שימוש בנתוני זרימה כמותיים.",
        isCorrect: false,
        explanation:
          "שגוי: SLP משלב From-To כמותי עם REL איכותי; ARD אינו מבטל זרימה.",
      },
      {
        id: "plant-q03-opt3",
        plainText:
          "דירוג $U$ מחייב הצבה צמודה יותר מדירוג $A$.",
        isCorrect: false,
        explanation:
          "שגוי: $U$ הוא Unimportant (אין חשיבות לקרבה), בעוד $A$ הוא Absolutely necessary.",
      },
      {
        id: "plant-q03-opt4",
        plainText:
          "ARD נבנה רק לאחר התקנת המכונות בפועל על הרצפה.",
        isCorrect: false,
        explanation:
          "שגוי: ARD הוא שלב תכנון מוקדם לפני הצבה פיזית וביצוע.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "plant-q04-craft-aldep-layout-algorithms",
    domain: "אלגוריתמי CRAFT ו-ALDEP",
    title: "תכנון מערכי מפעל וייצור - אלגוריתמי CRAFT ו-ALDEP לבניית מערך",
    context:
      "CRAFT (Computerized Relative Allocation of Facilities Technique) ו-ALDEP (Automated Layout Design Program) הם אלגוריתמים קלאסיים למערך מחלקות. נתון מודל עלות $TC = \\sum_i\\sum_j f_{ij} d_{ij}$.",
    formulaLatex:
      "\\Delta TC_{\\text{swap}} = TC_{\\text{new}} - TC_{\\text{old}}, \\quad \\text{accept if } \\Delta TC < 0",
    instruction:
      "מה ההבדל המהותי בין CRAFT ל-ALDEP מבחינת אסטרטגיית חיפוש המערך?",
    options: [
      {
        id: "plant-q04-opt1",
        plainText:
          "שניהם בונים מערך מאפס ע״י הוספת מחלקה אחת בכל שלב לפי ציון REL בלבד, ללא שיפור איטרטיבי.",
        isCorrect: false,
        explanation:
          "שגוי: זה מתאר בעיקר בנייה קונסטרוקטיבית כמו ALDEP/CORELAP, לא את CRAFT.",
      },
      {
        id: "plant-q04-opt2",
        plainText:
          "CRAFT הוא אלגוריתם שיפור (improvement): מתחיל ממערך התחלתי ומבצע החלפות/הזזות שמקטינות את $TC$; ALDEP הוא אלגוריתם בנייה (construction) שמרכיב מערך חדש לפי דירוגי קרבה ומגבלות רצפה, ולכן רגיש לסדר ההכנסה.",
        mathText: "\\text{CRAFT: improve } TC;\\quad \\text{ALDEP: construct from REL}",
        isCorrect: true,
        explanation:
          "נכון: CRAFT משפר פתרון קיים ע״י חילופי מחלקות (לרוב בעלות שטח דומה) ומקבל מהלך אם $\\Delta TC < 0$. ALDEP בונה מערך מחלקה-אחר-מחלקה לפי ציוני קרבה ומגבלות צורה, ולכן תוצאתו תלויה בסדר ובפרמטרים. בפועל משלבים לעיתים בנייה ואז שיפור.",
      },
      {
        id: "plant-q04-opt3",
        plainText:
          "ALDEP ממזער תמיד את $TC$ לאופטימום גלובלי בזמן פולינומי ל-$n$ שרירותי.",
        isCorrect: false,
        explanation:
          "שגוי: בעיית הקצאת מתקנים היא NP-קשה; ALDEP הוא היוריסטי ולא מבטיח אופטימום גלובלי.",
      },
      {
        id: "plant-q04-opt4",
        plainText:
          "CRAFT מתעלם ממרחקים $d_{ij}$ ומשתמש רק בדירוגי Muther.",
        isCorrect: false,
        explanation:
          "שגוי: פונקציית המטרה של CRAFT מבוססת במפורש על $f_{ij} d_{ij}$ (זרימה×מרחק).",
      },
    ],
  },
  {
    id: "plant-q05-product-vs-process-layout",
    domain: "מערך מוצר מול מערך תהליך",
    title: "תכנון מערכי מפעל וייצור - מערך לפי מוצר מול מערך לפי תהליך",
    context:
      "מערך Product (קו/זרימה) מסדר תחנות לפי רצף הייצור של מוצר/משפחה. מערך Process (פונקציונלי/Job Shop) מקבץ מכונות דומות לפי סוג תהליך. מדד זרימה אופייני: מרחק ממוצע ליחידה $\\bar{d} = \\frac{\\sum f_{ij} d_{ij}}{\\sum f_{ij}}$.",
    formulaLatex:
      "\\bar{d} = \\frac{\\sum_{i,j} f_{ij} d_{ij}}{\\sum_{i,j} f_{ij}}",
    instruction:
      "מתי עדיף מערך מוצר ומתי מערך תהליך, וכיצד זה משתקף ב-$\\bar{d}$ ובגמישות?",
    options: [
      {
        id: "plant-q05-opt1",
        plainText:
          "מערך תהליך תמיד מניב $\\bar{d}$ נמוך יותר מכל מערך מוצר, ולכן הוא ברירת המחדל לנפח גבוה.",
        isCorrect: false,
        explanation:
          "שגוי: בנפח גבוה ומסלול יציב, מערך מוצר מקצר זרימה ומקטין $\\bar{d}$ משמעותית.",
      },
      {
        id: "plant-q05-opt2",
        plainText:
          "מערך מוצר מתאים לנפח גבוה ומגוון נמוך (זרימה ליניארית, $\\bar{d}$ קטן, ניצולת גבוהה אך גמישות נמוכה); מערך תהליך מתאים לנפח נמוך ומגוון גבוה (גמישות וניצולת משאבים, אך $\\bar{d}$ וטיפול בחומר גדולים יותר).",
        mathText:
          "\\text{Product: high } V,\\ low\\ variety;\\ \\text{Process: low } V,\\ high\\ variety",
        isCorrect: true,
        explanation:
          "נכון: כאשר הביקוש גדול והמסלול קבוע, Product Layout מצמצם תנועות ומלאי בתהליך. כאשר המגוון גדול והמנות קטנות, Process Layout מאפשר ניתוב גמיש בין מחלקות פונקציונליות במחיר זרימה ארוכה יותר וסיבוך תזמון.",
      },
      {
        id: "plant-q05-opt3",
        plainText:
          "שני המערכים זהים תפעולית; ההבדל הוא רק בשם הארגוני של המחלקה.",
        isCorrect: false,
        explanation:
          "שגוי: ההבדל משפיע על זרימה, תזמון, מלאי בתהליך, עלויות טיפול וגמישות לשינוי מוצר.",
      },
      {
        id: "plant-q05-opt4",
        plainText:
          "מערך מוצר מתאים רק לייצור יחידני של אבות-טיפוס במעבדה.",
        isCorrect: false,
        explanation:
          "שגוי: מערך מוצר אופייני לייצור המוני/קווי; אבות-טיפוס נוטים למערך תהליך או Fixed-Position.",
      },
    ],
  },
  {
    id: "plant-q06-cellular-manufacturing-gt",
    domain: "ייצור תאי (Cellular Manufacturing)",
    title: "תכנון מערכי מפעל וייצור - ייצור תאי וטכנולוגיית קבוצות",
    context:
      "ב-Cellular Manufacturing מקבצים חלקים למשפחות (Part Families) ומכונות לתאים לפי Group Technology. מדד טיפוסי לזרימה בתא: חלק הזרימה התוך-תאית $\\rho = \\frac{F_{\\text{intra}}}{F_{\\text{intra}}+F_{\\text{inter}}}$.",
    formulaLatex:
      "\\rho = \\frac{F_{\\text{intra}}}{F_{\\text{intra}} + F_{\\text{inter}}}, \\quad 0 \\le \\rho \\le 1",
    instruction:
      "מה המטרה התפעולית של מעבר ממערך תהליך לתאים, וכיצד מתפרש $\\rho$ גבוה?",
    options: [
      {
        id: "plant-q06-opt1",
        plainText:
          "תאים מגדילים במכוון את $F_{\\text{inter}}$ כדי לפזר עומס בין כל המפעל.",
        isCorrect: false,
        explanation:
          "שגוי: המטרה היא להקטין תנועות בין-תאיות, לא להגדיל אותן.",
      },
      {
        id: "plant-q06-opt2",
        plainText:
          "התא מרכז את רוב מסלולי המשפחה בתוכו כך ש-$\\rho$ גבוה (רוב הזרימה תוך-תאית), מקצר זמני מעבר ומלאי בתהליך, ומשלב יתרונות של זרימה ממוקדת עם גמישות יחסית למערך קו טהור.",
        mathText: "\\rho \\to 1 \\implies \\text{mostly intra-cell flow}",
        isCorrect: true,
        explanation:
          "נכון: GT/Cellular שואף שמשפחת חלקים תושלם בתוך תא עם מינימום נסיעות החוצה. $\\rho$ קרוב ל-$1$ מעיד על תא מוצלח. התוצאה: פחות טיפול בחומר, בקרה פשוטה יותר, וזמני אספקה קצרים יותר לעומת Job Shop מלא.",
      },
      {
        id: "plant-q06-opt3",
        plainText:
          "Cellular Manufacturing אוסר כפילות מכונות ודורש מכונה אחת בלבד לכל סוג במפעל.",
        isCorrect: false,
        explanation:
          "שגוי: לעיתים משכפלים מכונות בין תאים כדי לסגור משפחות; האיסור אינו חלק מההגדרה.",
      },
      {
        id: "plant-q06-opt4",
        plainText:
          "המעבר לתאים רלוונטי רק למערך Fixed-Position של ספינות ומטוסים.",
        isCorrect: false,
        explanation:
          "שגוי: Fixed-Position הוא מקרה נפרד; תאים נפוצים בייצור דיסקרטי של חלקים מכניים/אלקטרוניים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "plant-q07-aisle-design-circulation",
    domain: "תכנון מעברים (Aisles)",
    title: "תכנון מערכי מפעל וייצור - תכנון מעברים וזרימת תנועה",
    context:
      "מעברים ראשיים ומשניים תופסים שטח יקר וקובעים את נתיבי מלגזות והולכי רגל. רוחב מעבר אפקטיבי תלוי בציוד: למשל מלגזה הדורשת רוחב $w$, ותנועה דו-כיוונית עשויה לדרוש כ-$2w + c$ עם מרווח ביטחון $c$.",
    formulaLatex:
      "A_{\\text{aisle}} = L \\times W, \\quad W_{\\text{two-way}} \\approx 2w + c",
    instruction:
      "מהו עיקרון תכנון מעברים נכון ביחס לזרימה, בטיחות וניצולת שטח?",
    options: [
      {
        id: "plant-q07-opt1",
        plainText:
          "מעברים ראשיים צריכים להיות צרים ככל האפשר ($W < w$) כדי למקסם שטח ייצור בכל מחיר.",
        isCorrect: false,
        explanation:
          "שגוי: רוחב מתחת לדרישת הציוד יוצר צווארי בקבוק וסיכון בטיחותי חמור.",
      },
      {
        id: "plant-q07-opt2",
        plainText:
          "אין צורך להפריד בין מסלולי הולכי רגל למסלולי ציוד הרמה אם הצפיפות נמוכה.",
        isCorrect: false,
        explanation:
          "שגוי: הפרדת תנועה היא עקרון בטיחות מרכזי גם בצפיפות בינונית/נמוכה.",
      },
      {
        id: "plant-q07-opt3",
        plainText:
          "מתכננים היררכיית מעברים (ראשי/משני) לאורך צירי זרימה עיקריים, ממדידים $W$ לפי ציוד ותנועה חד/דו-כיוונית ($W_{\\text{two-way}} \\approx 2w+c$), ונמנעים ממעברים מתים תוך איזון בין $A_{\\text{aisle}}$ לבין נגישות ובטיחות.",
        mathText: "W_{\\text{two-way}} \\approx 2w + c",
        isCorrect: true,
        explanation:
          "נכון: מעברים הם תשתית זרימה. צירי ראשיים מיושרים עם תנועות עצימות; הרוחב נגזר מציוד ומספר נתיבים; מרווחי ביטחון חובה. שטח מעברים נספר בדרישות השטח אך אינו «מיותר» אם הוא מונע התנגשויות ומקצר מסלולים בפועל.",
      },
      {
        id: "plant-q07-opt4",
        plainText:
          "כל המעברים במפעל חייבים להיות ברוחב זהה בדיוק, ללא קשר לסוג התנועה.",
        isCorrect: false,
        explanation:
          "שגוי: מעבר משני להולכי רגל שונה ממעבר ראשי למלגזות כבדות; אחידות עיוורת מבזבזת שטח או יוצרת מחסור.",
      },
    ],
  },
  {
    id: "plant-q08-material-flow-intensity-metric",
    domain: "מדדי עוצמת זרימת חומרים",
    title: "תכנון מערכי מפעל וייצור - מדדי עוצמת זרימה והערכת מערך",
    context:
      "להשוואת חלופות מערך משתמשים במדדי זרימה: עלות טיפול $TC = \\sum_i\\sum_j f_{ij} d_{ij} c_{ij}$, ומרחק ממוצע משוקלל $\\bar{d}$. לעיתים מנרמלים גם לפי משקל או יחידות עומס (unit loads).",
    formulaLatex:
      "TC = \\sum_{i,j} f_{ij} d_{ij} c_{ij}, \\quad \\bar{d} = \\frac{\\sum_{i,j} f_{ij} d_{ij}}{\\sum_{i,j} f_{ij}}",
    instruction:
      "כיצד משתמשים בעוצמת הזרימה $f_{ij}$ להערכת איכות מערך בין שתי חלופות?",
    options: [
      {
        id: "plant-q08-opt1",
        plainText:
          "בוחרים תמיד את המערך בעל הסכום $\\sum_{i,j} d_{ij}$ המינימלי, תוך התעלמות מ-$f_{ij}$.",
        isCorrect: false,
        explanation:
          "שגוי: מרחק לא משוקלל מתעלם מזוגות עצימים; זוג נדיר רחוק פחות מזיק מזוג תכוף רחוק.",
      },
      {
        id: "plant-q08-opt2",
        plainText:
          "מערך טוב מוגדר כזה שממקסם את $TC$ כדי «לנצל» את מערכת השינוע.",
        isCorrect: false,
        explanation:
          "שגוי: המטרה הסטנדרטית היא מזעור עלות/מרחק משוקלל, לא מיקסום.",
      },
      {
        id: "plant-q08-opt3",
        plainText:
          "משווים חלופות לפי $TC$ או $\\bar{d}$ תחת אותם $f_{ij}$ ו-$c_{ij}$; מערך שמקצר מרחקים לזוגות בעלי $f_{ij}$ גבוה יניב $TC$ נמוך יותר ונחשב עדיף מבחינת זרימה.",
        mathText: "\\min TC \\mid \\{f_{ij}, c_{ij}\\} \\text{ fixed}",
        isCorrect: true,
        explanation:
          "נכון: הנתונים $f_{ij}$ הם קלט תפעולי; המערך משנה את $d_{ij}$. לכן ההשוואה ההוגנת מקבעת את הזרימות ומודדת ירידה ב-$TC$ או ב-$\\bar{d}$. זה גם מסביר מדוע קירוב מחלקות «כבדות זרימה» קריטי יותר מקירוב מחלקות בעוצמה אפסית.",
      },
      {
        id: "plant-q08-opt4",
        plainText:
          "עוצמת זרימה רלוונטית רק לתכנון מחסן ולא לרצפת ייצור.",
        isCorrect: false,
        explanation:
          "שגוי: ניתוח זרימה הוא ליבת תכנון מערך ייצור, הרכבה ושירותים תומכים.",
      },
    ],
  },
  {
    id: "plant-q09-space-requirements-sizing",
    domain: "חישוב דרישות שטח",
    title: "תכנון מערכי מפעל וייצור - חישוב דרישות שטח למחלקות",
    context:
      "דרישת השטח למחלקה כוללת שטח ציוד, מפעילים, אחסון בתהליך, ומעברים פנימיים. מודל פשוט: $S_k = S^{\\text{eq}}_k + S^{\\text{ops}}_k + S^{\\text{wip}}_k + S^{\\text{aisle}}_k$, ולעיתים מוסיפים מקדם התרחבות $\\alpha$.",
    formulaLatex:
      "S_k = (S^{\\text{eq}}_k + S^{\\text{ops}}_k + S^{\\text{wip}}_k)(1+\\alpha) + S^{\\text{aisle}}_k",
    instruction:
      "כיצד יש לחשב ולשלב דרישות שטח בתהליך SLP לפני הצבת Block Layout?",
    options: [
      {
        id: "plant-q09-opt1",
        plainText:
          "מסתפקים בשטח הרצפה של בסיס המכונה בלבד ($S_k = S^{\\text{eq}}_k$) ומתעלמים מ-WIP וממעברים.",
        isCorrect: false,
        explanation:
          "שגוי: התעלמות מפעילים, מלאי בתהליך ומעברים יוצרת מערך צפוף מדי ולא ישים.",
      },
      {
        id: "plant-q09-opt2",
        plainText:
          "קובעים לכל מחלקה שטח זהה $S_k = S_{\\text{total}}/n$ ללא קשר לציוד.",
        isCorrect: false,
        explanation:
          "שגוי: חלוקה שווה מתעלמת מצפיפות ציוד שונה ומעוותת את המערך.",
      },
      {
        id: "plant-q09-opt3",
        plainText:
          "מחשבים לכל מחלקה $S_k$ כסכום ציוד+מפעילים+WIP, מוסיפים מקדם התרחבות $\\alpha$ לפי הצורך, ומוסיפים מעברים; סך $S_k$ הופך לאילוץ בגודל בלוקים ב-ARD/Block Layout.",
        mathText: "S_k = (S^{\\text{eq}}+S^{\\text{ops}}+S^{\\text{wip}})(1+\\alpha)+S^{\\text{aisle}}",
        isCorrect: true,
        explanation:
          "נכון: ב-SLP שלב השטח ממיר צרכים תפעוליים לבלוקים בעלי שטח ידוע. בלי $S_k$ אמין, דיאגרמת היחסים לא ניתנת להטמעה ברצפה האמיתית. מקדם $\\alpha$ משקף צמיחה/גמישות עתידית.",
      },
      {
        id: "plant-q09-opt4",
        plainText:
          "דרישות שטח נקבעות רק לאחר הרצת CRAFT, כי האלגוריתם ממציא את השטחים.",
        isCorrect: false,
        explanation:
          "שגוי: CRAFT מקבל שטחי מחלקות כקלט; הוא אינו מחליף את חישוב הדרישות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "plant-q10-muther-closeness-ratings",
    domain: "סולם קרבה של Muther",
    title: "תכנון מערכי מפעל וייצור - דירוגי קרבה של Muther (A–E–I–O–U–X)",
    context:
      "סולם Muther מקצה לזוג מחלקות קוד קרבה: $A$ (Absolutely necessary), $E$ (Especially important), $I$ (Important), $O$ (Ordinary), $U$ (Unimportant), $X$ (Undesirable). לעיתים ממפים לקודים מספריים לצורך אלגוריתמים, למשל $A\\!=\\!4,\\ldots,U\\!=\\!0,X\\!=\\!-1$.",
    formulaLatex:
      "v(A)=4,\\ v(E)=3,\\ v(I)=2,\\ v(O)=1,\\ v(U)=0,\\ v(X)=-1",
    instruction:
      "מה המשמעות התכנונית של דירוג $X$ לעומת $A$, וכיצד משתלב הסולם עם נתוני זרימה כמותיים?",
    options: [
      {
        id: "plant-q10-opt1",
        plainText:
          "דירוג $X$ זהה ל-$A$ ומחייב הצבה צמודה לשיפור תקשורת.",
        isCorrect: false,
        explanation:
          "שגוי: $X$ מסמן קרבה לא רצויה (רעש, בטיחות, זיהום), ההפך מ-$A$.",
      },
      {
        id: "plant-q10-opt2",
        plainText:
          "הסולם הכמותי $v(\\cdot)$ מחליף לחלוטין את $f_{ij}$ ואין צורך ב-From-To.",
        isCorrect: false,
        explanation:
          "שגוי: דירוגי Muther משלימים זרימה כמותית; הם לא תחליף אוטומטי לנתוני תנועה.",
      },
      {
        id: "plant-q10-opt3",
        plainText:
          "דירוג $U$ מחייב הפרדה מקסימלית בין המחלקות בכל מערך.",
        isCorrect: false,
        explanation:
          "שגוי: $U$ אומר שאין חשיבות לקרבה; ההפרדה המחייבת שייכת ל-$X$.",
      },
      {
        id: "plant-q10-opt4",
        plainText:
          "$A$ דורש קרבה מקסימלית מסיבות תפעוליות/בטיחות/שירות, בעוד $X$ דורש הפרדה; ב-SLP משלבים את הדירוגים האיכותיים עם $f_{ij}$ הכמותיים כדי לאזן זרימה כבדה מול אילוצי הפרדה (למשל צבע מול ריתוך).",
        mathText: "A\\!:\\text{attract},\\ X\\!:\\text{repel};\\ \\text{combine with } f_{ij}",
        isCorrect: true,
        explanation:
          "נכון: Muther מטפל ביחסים שאינם נמדדים רק בטון·מטר — כמו רעש, סיכון אש, או צורך בפיקוח. $A$/$E$ דוחפים לקירוב; $X$ דוחף להרחקה גם אם יש זרימה מסוימת. השילוב עם From-To מונע מערך ש«נכון» כמותית אך בלתי קביל איכותית.",
      },
    ],
  },
  {
    id: "plant-q11-activity-relationship-diagram",
    domain: "דיאגרמת יחסי פעילויות (ARD)",
    title: "תכנון מערכי מפעל וייצור - בניית דיאגרמת יחסי פעילויות והצבה ראשונית",
    context:
      "לאחר מילוי תרשים REL, בונים ARD: מציבים פעילויות כצמתים ומחברים אותן לפי חוזק הקרבה. לאחר מכן ממירים ל-Space Relationship Diagram עם בלוקים בשטח $S_k$.",
    formulaLatex:
      "\\text{score}(L) = \\sum_{(i,j)} v_{ij}\\cdot \\mathbb{1}_{\\text{adjacent}}(i,j) - \\lambda \\sum_{(i,j)\\in X} \\mathbb{1}_{\\text{adjacent}}(i,j)",
    instruction:
      "מהו תפקיד ה-ARD בתהליך, ומה נחשב סימן לאיכות דיאגרמה לפני שרטוט סופי?",
    options: [
      {
        id: "plant-q11-opt1",
        plainText:
          "ARD הוא שרטוט חשמל של המפעל וכולל תוכניות כבלים בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ARD עוסק ביחסי קרבה בין פעילויות/מחלקות, לא בתכנון חשמל.",
      },
      {
        id: "plant-q11-opt2",
        plainText:
          "ב-ARD מתעלמים מדירוגי $A$ וממקדים רק במחלקות בעלות $U$.",
        isCorrect: false,
        explanation:
          "שגוי: דירוגי $A$/$E$ הם בדיוק אלה שמעצבים את ליבת הדיאגרמה.",
      },
      {
        id: "plant-q11-opt3",
        plainText:
          "ARD מחליף את הצורך בחישוב שטחים $S_k$ ובדיקת התאמה לרצפה.",
        isCorrect: false,
        explanation:
          "שגוי: אחרי ARD חייבים Space Relationship Diagram והתאמה לגבולות המבנה.",
      },
      {
        id: "plant-q11-opt4",
        plainText:
          "ARD הוא מודל הצבה רעיוני שממקסם סמיכות לזוגות בעלי $v_{ij}$ גבוה ונמנע מסמיכות לזוגות $X$; לאחר מכן משלבים שטחים $S_k$ ליצירת Block Layout שניתן להעריך ב-$TC$ ובאילוצי מבנה.",
        mathText: "\\max \\sum v_{ij}\\mathbb{1}_{\\text{adj}} - \\lambda\\,\\#\\{X\\text{-adjacencies}\\}",
        isCorrect: true,
        explanation:
          "נכון: ה-ARD מגשר בין טבלת יחסים לבין גאומטריית רצפה. איכותו נמדדת בכך שקשרי $A$/$E$ קצרים/צמודים וקשרי $X$ אינם צמודים. רק אחרי הטמעת שטחים מתקבלים חלופות מערך ברות-השוואה כמותית.",
      },
    ],
  },
  {
    id: "plant-q12-fixed-position-layout",
    domain: "מערך מיקום קבוע (Fixed-Position)",
    title: "תכנון מערכי מפעל וייצור - מערך מיקום קבוע למוצר נייח",
    context:
      "במערך Fixed-Position המוצר העיקרי נשאר במקומו (ספינה, מטוס, טורבינה גדולה, בנייה באתר), בעוד עובדים, כלים וחומרים מגיעים אליו. מדד תכנון אופייני: מזעור תנועת משאבים אל המוצר $\\sum_r f_r d_r$.",
    formulaLatex:
      "\\min \\sum_{r \\in \\text{resources}} f_r d_r \\quad \\text{s.t. site & safety constraints}",
    instruction:
      "מתי בוחרים Fixed-Position, ומה האתגר התכנוני המרכזי לעומת מערך מוצר/תהליך?",
    options: [
      {
        id: "plant-q12-opt1",
        plainText:
          "Fixed-Position מתאים רק לייצור המוני של ברגים קטנים בקו רציף.",
        isCorrect: false,
        explanation:
          "שגוי: מוצרים קטנים בנפח גבוה מתאימים למערך מוצר/תא, לא למיקום קבוע.",
      },
      {
        id: "plant-q12-opt2",
        plainText:
          "במערך זה המוצר נע על מסוע והעובדים נייחים לחלוטין לאורך כל המחזור.",
        isCorrect: false,
        explanation:
          "שגוי: זה תיאור של קו ייצור (Product Layout); ב-Fixed-Position המוצר נייח.",
      },
      {
        id: "plant-q12-opt3",
        plainText:
          "אין צורך בתכנון מערך במקרה זה כי אין זרימת חומרים כלל.",
        isCorrect: false,
        explanation:
          "שגוי: יש זרימה ערה של אנשים, כלים וחומרים אל האתר — וזה לב התכנון.",
      },
      {
        id: "plant-q12-opt4",
        plainText:
          "בוחרים Fixed-Position כאשר המוצר כבד/גדול/נייח; התכנון מתמקד בתיזמון הגעת צוותים וציוד, במזעור $\\sum_r f_r d_r$, בניהול שטחי התארגנות ובאילוצי בטיחות באתר — בניגוד להזזת המוצר בין מחלקות.",
        mathText: "\\min_r \\sum f_r d_r \\text{ to fixed product}",
        isCorrect: true,
        explanation:
          "נכון: כשהזזת המוצר בלתי אפשרית או יקרה מדי, «המערך בא אל המוצר». האתגרים: תיאום קבלני-משנה, אחסון זמני, נגישות מנופים, ומניעת התנגשויות באתר. מדדי From-To הקלאסיים בין מחלקות מותאמים לתנועת משאבים אל נקודה קבועה.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_PLANT_LAYOUT_QUESTIONS = PLANT_LAYOUT_DESIGN_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function samplePlantLayoutOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = PLANT_LAYOUT_DESIGN_QUESTIONS.slice(0, 3);
  const groupB = PLANT_LAYOUT_DESIGN_QUESTIONS.slice(3, 6);
  const groupC = PLANT_LAYOUT_DESIGN_QUESTIONS.slice(6, 12);

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
