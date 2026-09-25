import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic בינה עסקית ומחסני נתונים (BI) diagnostic bank (12Q).
 * Display name: "בינה עסקית ומחסני נתונים (BI)" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const BUSINESS_INTELLIGENCE_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "bi-q01-star-vs-snowflake-schema",
    domain: "סכמת כוכב מול פתית שלג",
    title:
      "בינה עסקית ומחסני נתונים (BI) - סכמת כוכב (Star) מול פתית שלג (Snowflake)",
    context:
      "במודל ממדי, טבלת עובדות $F$ מתחברת לממדים $D_1,\\ldots,D_k$. ב-Star כל ממד מיוצג בטבלה שטוחה (דנורמלית); ב-Snowflake הממדים מפורקים להיררכיות מנורמלות (למשל $\\mathrm{Product}\\to\\mathrm{Category}\\to\\mathrm{Department}$). מספר ה-Joins לשאילתה על היררכיה בעומק $h$ הוא $1$ ב-Star לעומת $h$ ב-Snowflake.",
    formulaLatex:
      "\\#\\mathrm{joins}_{\\mathrm{Star}}=1,\\quad \\#\\mathrm{joins}_{\\mathrm{Snow}}=h,\\quad t_{q}\\propto \\#\\mathrm{joins}\\cdot |F|",
    instruction:
      "מה ההבדל המרכזי בין Star ל-Snowflake מבחינת ביצועי שאילתת OLAP ותחזוקת ממד?",
    options: [
      {
        id: "bi-q01-opt1",
        plainText:
          "Star מצמצם את השאילתה ל-$F \\bowtie D_i$ עם פחות Joins ולרוב latency נמוך יותר; Snowflake מנרמל ממדים, חוסך נפח ומפשט עדכוני היררכיה, אך מוסיף Joins ומעלה לעיתים את $t_q$.",
        mathText:
          "\\#\\mathrm{joins}_{\\mathrm{Star}} < \\#\\mathrm{joins}_{\\mathrm{Snow}};\\quad t_{q,\\mathrm{Star}} \\lesssim t_{q,\\mathrm{Snow}}",
        isCorrect: true,
        explanation:
          "נכון: בגישת Kimball כוכב הוא ברירת המחדל לסריקות אנליטיות — טבלת עובדות גדולה מצטרפת לממד דנורמלי בודד לכל ציר ניתוח, כך ש-$\\#\\mathrm{joins}$ קטן ו-$t_q$ נוטה להיות נמוך יותר. פתית שלג מפרק היררכיה לטבלאות $D_i^{(0)}\\bowtie D_i^{(1)}\\bowtie\\cdots\\bowtie D_i^{(h-1)}$, מפחית כפילות תיאורים בממדים גדולים ומקל על עדכון צומת היררכיה בודד, אך מגדיל את עלות ה-Join ואת תוכנית השאילתה. הבחירה היא פשרה מפורשת בין latency אנליטי לבין נרמול/תחזוקה — לא כלל «תמיד אחד עדיף».",
      },
      {
        id: "bi-q01-opt2",
        plainText:
          "Snowflake אוסר שימוש בטבלת עובדות ושומר רק ממדים מנורמלים ללא מדדים.",
        isCorrect: false,
        explanation:
          "שגוי: בשתי הסכמות קיימת טבלת עובדות $F$ עם מדדים; ההבדל הוא אך ורק במידת נרמול הממדים סביב $F$.",
      },
      {
        id: "bi-q01-opt3",
        plainText:
          "Star דורש תמיד יותר Joins מ-Snowflake לאותה היררכיית מוצר בעומק $h$.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך — ב-Star ההיררכיה מגולמת בתוך טבלת ממד אחת, ולכן $\\#\\mathrm{joins}_{\\mathrm{Star}}=1\\le h=\\#\\mathrm{joins}_{\\mathrm{Snow}}$.",
      },
      {
        id: "bi-q01-opt4",
        plainText:
          "אין הבדל ביצועי אפשרי כי שני המודלים שקולים תמיד בזמן $O(1)$ ללא תלות ב-$|F|$.",
        isCorrect: false,
        explanation:
          "שגוי: מספר ה-Joins, סדר ההצטרפות ונפח הסריקה של $F$ משפיעים ישירות על $t_q$; השקילות הסמנטית אינה גוררת שקילות ביצועים.",
      },
    ],
  },
  {
    id: "bi-q02-fact-dimension-tables",
    domain: "טבלאות עובדות וממדים",
    title:
      "בינה עסקית ומחסני נתונים (BI) - טבלאות עובדות (Fact) וממדים (Dimension)",
    context:
      "טבלת עובדות מאחסנת מדדים כמותיים ברמת ה-Grain שנבחרה, עם מפתחות זרים לממדים. לדוגמה מכירות: $Sales(\\mathit{date\\_key},\\mathit{store\\_key},\\mathit{product\\_key},\\mathit{qty},\\mathit{amount})$. סכמה כללית: $F(k_1,\\ldots,k_d,m_1,\\ldots,m_p)$ כאשר $k_j$ הם FK לממדים ו-$m_\\ell$ הם מדדים.",
    formulaLatex:
      "F(\\underbrace{k_1,\\ldots,k_d}_{\\mathrm{FK\\ to\\ dims}},\\underbrace{m_1,\\ldots,m_p}_{\\mathrm{measures}})",
    instruction:
      "מה מאפיין נכון של Fact מול Dimension במחסן נתונים ממדי?",
    options: [
      {
        id: "bi-q02-opt1",
        plainText:
          "Fact מכילה מדדים מספריים (additive / semi-additive / non-additive) ומפתחות זרים לממדים; Dimension מכילה תיאורים והיררכיות לניתוח (זמן, מוצר, לקוח) ולרוב רחבה יחסית עם קרדינליות נמוכה מ-$|F|$.",
        mathText: "F:\\mathrm{keys}+\\mathrm{measures};\\quad D:\\mathrm{attrs/hierarchies}",
        isCorrect: true,
        explanation:
          "נכון: העובדות הן «מה קרה» ברמת הפירוט $G$ שנקבעה — שורות צרות וארוכות עם מדדים ומפתחות; הממדים הם «לפי מה חותכים» — תכונות תיאוריות והיררכיות (יום→חודש→שנה, מוצר→קטגוריה). שאילתת OLAP מסננת/מקבצת לפי תכונות ממד ומסכמת $\\mathrm{Agg}(m_\\ell)$. בלבול בין Fact ל-Dimension שובר את ה-Grain, מייצר כפילויות ב-$\\sum m$ ומעוות KPI. בפועל $|F|\\gg|D_i|$ כמעט תמיד, ולכן אופטימיזציית latency מתמקדת בסריקת העובדות וב-Joins אליהן.",
      },
      {
        id: "bi-q02-opt2",
        plainText:
          "Dimension תמיד מכילה רק מספרים מצטברים, ו-Fact מכילה רק טקסט חופשי ללא מדדים.",
        isCorrect: false,
        explanation:
          "שגוי: זה הפוך לתפקידים הסטנדרטיים — המדדים המספריים נמצאים ב-Fact; הממדים נושאים תיאורים (ולעיתים גם דגלים/קודים שאינם מדדי סיכום).",
      },
      {
        id: "bi-q02-opt3",
        plainText:
          "אסור שיהיו מפתחות זרים ב-Fact; כל הקישורים נעשים בזמן הריצה בלבד ללא סכמה.",
        isCorrect: false,
        explanation:
          "שגוי: מפתחות זרים (לרוב Surrogate Keys שלמים) הם הבסיס ל-Join ממדי יציב ולשמירת היסטוריית SCD.",
      },
      {
        id: "bi-q02-opt4",
        plainText:
          "Fact ו-Dimension הם שמות נרדפים לאותה טבלה ב-3NF תפעולית (OLTP).",
        isCorrect: false,
        explanation:
          "שגוי: מודל ממדי (OLAP/DW) מפריד במכוון עובדות מממדים; מודל OLTP נורמלי אינו מחליף את ההפרדה הזו.",
      },
    ],
  },
  {
    id: "bi-q03-olap-cube-slice-dice-rollup-drilldown",
    domain: "פעולות קוביית OLAP",
    title:
      "בינה עסקית ומחסני נתונים (BI) - פעולות קובייה: Slice, Dice, Roll-up ו-Drill-down",
    context:
      "קוביית OLAP ממודלת כ-$C[d_1,\\ldots,d_n]=m$. פעולות ניווט משנות חתך או רמת היררכיה $\\ell$. לדוגמה מדד מכירות $m=\\sum qty$. Roll-up מעלה רמה ($\\ell\\mapsto\\ell-1$) ו-Drill-down מוריד ($\\ell\\mapsto\\ell+1$).",
    formulaLatex:
      "\\mathrm{Roll\\text{-}up}:\\ C[\\ldots,\\ell]\\to C[\\ldots,\\ell-1];\\quad \\mathrm{Drill\\text{-}down}:\\ \\ell\\to\\ell+1",
    instruction:
      "כיצד נבדלות ארבע הפעולות Slice / Dice / Roll-up / Drill-down בניווט אנליטי?",
    options: [
      {
        id: "bi-q03-opt1",
        plainText:
          "Slice מקבע ממד לערך בודד (חתך); Dice מסנן טווחים/ערכים במספר ממדים; Roll-up מעלה בהיררכיה (פחות פירוט, למשל יום→חודש); Drill-down מוריד בהיררכיה לפירוט עמוק יותר.",
        mathText:
          "\\mathrm{Slice:\\ fix\\ }d_i;\\ \\mathrm{Dice:\\ filter};\\ \\mathrm{Roll\\text{-}up}\\uparrow;\\ \\mathrm{Drill\\text{-}down}\\downarrow",
        isCorrect: true,
        explanation:
          "נכון: Slice הוא חתך חד-ממדי — למשל $C[\\mathit{year}=2024,\\ldots]$ — המקטין את הקובייה לממד פחות אחד בערך קבוע. Dice בוחר תת-קובייה רב-ממדית ע\"י סינון על כמה צירים בו-זמנית (טווחי תאריכים, קבוצת חנויות, קטגוריות). Roll-up מאגד לפי היררכיה קיימת ומחשב מחדש את $\\mathrm{Agg}(m)$ ברמה גסה יותר; Drill-down הוא הפעולה ההפוכה — פירוק לרמה עדינה יותר באותה היררכיה. אלה אבני בניין של ניווט OLAP, לא שלבי ETL; הן אינן מוחקות נתונים מהמחסן אלא משנות את תצוגת האגרגציה.",
      },
      {
        id: "bi-q03-opt2",
        plainText:
          "Roll-up ו-Drill-down זהים לחלוטין ל-Slice, ו-Dice הוא שם אחר לתהליך ETL.",
        isCorrect: false,
        explanation:
          "שגוי: Slice/Dice משנים חתך ערכים; Roll-up/Drill-down משנים רמת היררכיה; ETL הוא צינור טעינה נפרד לחלוטין.",
      },
      {
        id: "bi-q03-opt3",
        plainText:
          "Drill-down תמיד מוחק לצמיתות מדדים מטבלת העובדות במחסן.",
        isCorrect: false,
        explanation:
          "שגוי: Drill-down הוא פעולת שאילתה/תצוגה בלבד; נתוני המחסן נשארים ברמת ה-Grain המקורית.",
      },
      {
        id: "bi-q03-opt4",
        plainText:
          "Slice אפשרי רק על ממד הזמן ואסור על ממד המוצר או הלקוח.",
        isCorrect: false,
        explanation:
          "שגוי: ניתן לבצע Slice על כל ממד בדיד בקובייה — זמן, מוצר, גאוגרפיה, ערוץ וכו'.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "bi-q04-etl-pipeline-latency",
    domain: "תהליך ETL",
    title:
      "בינה עסקית ומחסני נתונים (BI) - צינור ETL והשפעה על latency אנליטי",
    context:
      "ETL (Extract–Transform–Load) מעתיק נתונים ממערכות מקור, מנקה/מתרגם, וטוען למחסן. נסמן $T_{\\mathrm{ETL}}=T_E+T_T+T_L$, ואת ה-latency מקצה-לקצה כ-$L=T_{\\mathrm{ETL}}+T_{\\mathrm{query}}$. Freshness של דוח תלוי ב-$T_{\\mathrm{ETL}}$; נכונות ה-KPI תלויה באיכות $T_T$.",
    formulaLatex:
      "T_{\\mathrm{ETL}}=T_E+T_T+T_L,\\quad L=T_{\\mathrm{ETL}}+T_{\\mathrm{query}}",
    instruction:
      "מהו תפקיד שלב ה-Transform, וכיצד כשל בו משפיע על אמינות המדדים גם כש-$T_{\\mathrm{query}}$ קצר?",
    options: [
      {
        id: "bi-q04-opt1",
        plainText:
          "Transform רק מעתיק בתים בינאריים ללא ניקוי, והמדדים תמיד נכונים אם ה-Extract הצליח.",
        isCorrect: false,
        explanation:
          "שגוי: Transform כולל ניקוי, האחדת מפתחות, חישובי מדדים, התאמת Grain וטיפול ב-SCD — זה לב איכות הנתונים, לא העתקה גולמית.",
      },
      {
        id: "bi-q04-opt2",
        plainText:
          "Transform ממיר לפורמט ממדי (Surrogate Keys, התאמת Grain, כללי עסקים); שגיאה בשלב זה משבשת KPI גם אם $T_{\\mathrm{query}}$ קצר, ולכן $L$ ואיכות האנליטיקה תלויים ב-$T_T$ איכותי ולא רק בביצועי שאילתה.",
        mathText: "L=T_E+T_T+T_L+T_{\\mathrm{query}}",
        isCorrect: true,
        explanation:
          "נכון: בינה עסקית נמדדת גם ב-freshness ($T_{\\mathrm{ETL}}$ קטן → נתונים עדכניים) וגם בנכונות סמנטית. בשלב Transform מגדירים משמעות עסקית: מיפוי מקורות ל-$sk$, חישוב מדדים, טיפול בכפילויות ו-SCD. אינדקסים, Partitioning או מטמון שמקצרים את $T_{\\mathrm{query}}$ אינם מתקנים Grain שגוי, כפילות טעינה או כלל עסקי שבור ב-$T_T$. לכן אופטימיזציית latency של שאילתה משלימה — אך אינה מחליפה — צינור Transform אמין. בוריאנט ELT ההמרה מתבצעת אחרי Load במחסן, אך עדיין קיים שלב המרה לוגי שקול באחריותו.",
      },
      {
        id: "bi-q04-opt3",
        plainText:
          "ETL רלוונטי רק ל-OLTP תפעולי ואסור במחסני נתונים וב-Data Marts.",
        isCorrect: false,
        explanation:
          "שגוי: ETL/ELT הוא מנגנון הליבה למילוי מחסן נתונים ו-Data Marts אנליטיים.",
      },
      {
        id: "bi-q04-opt4",
        plainText:
          "Load חייב תמיד להיעשות לפני Transform (סדר קשיח L→T→E בלבד).",
        isCorrect: false,
        explanation:
          "שגוי: הסדר הקלאסי הוא E→T→L; וריאנט ELT הוא E→L→T במחסן — אך לא L→T→E.",
      },
    ],
  },
  {
    id: "bi-q05-slowly-changing-dimensions",
    domain: "ממדים משתנים לאט (SCD)",
    title:
      "בינה עסקית ומחסני נתונים (BI) - ממדים משתנים לאט (Slowly Changing Dimensions)",
    context:
      "כאשר תכונת ממד משתנה (למשל כתובת לקוח), בוחרים מדיניות SCD. Type 1 דורס את הערך; Type 2 שומר היסטוריה בשורות עם תוקף; Type 3 שומר ערך קודם בעמודה נפרדת. מודל SCD2 טיפוסי: $(sk,nk,\\mathrm{attrs},\\mathit{from},\\mathit{to},\\mathit{is\\_current})$ עם $from\\le t<to$.",
    formulaLatex:
      "\\mathrm{SCD2}:\\ (sk,nk,\\mathrm{attrs},from,to,is\\_current),\\quad from\\le t<to",
    instruction:
      "איזו גישה נדרשת כאשר חייבים לשחזר עובדות היסטוריות לפי ערך הממד בזמן האירוע?",
    options: [
      {
        id: "bi-q05-opt1",
        plainText:
          "Type 1 בלבד, כי דריסת הערך הישן משמרת אוטומטית את כל ההיסטוריה לניתוח «כפי שהיה».",
        isCorrect: false,
        explanation:
          "שגוי: Type 1 מוחק את הערך הקודם; ניתוח היסטורי לפי מצב הממד דאז נשבר.",
      },
      {
        id: "bi-q05-opt2",
        plainText:
          "Type 2: יוצרים שורת ממד חדשה עם Surrogate Key חדש וחלון תוקף $[from,to)$; עובדות חדשות מצביעות ל-$sk$ העדכני, כך ש-$\\sum$ היסטורי נשאר משויך לגרסת הממד הנכונה.",
        mathText: "sk_{\\mathrm{new}}\\text{ on change};\\quad from\\le t<to",
        isCorrect: true,
        explanation:
          "נכון: SCD Type 2 הוא הסטנדרט לניתוח «as was». כל שינוי עסקי רלוונטי מקבל $sk$ חדש לאותו Natural Key $nk$, עם חלון תוקף. עובדות שנרשמו בתקופה $t$ מצביעות ל-$sk$ התקף ב-$t$, ולכן אגרגציה היסטורית $\\sum m$ נשארת משויכת לגרסת הממד הנכונה (למשל אזור מכירות ישן). Type 1 מתאים כשאין צורך בהיסטוריית תכונה (תיקון שגיאה). Type 3 מוגבל למספר קטן של ערכים קודמים בעמודות קבועות ואינו סקלבילי לשרשרת שינויים ארוכה. בלי Type 2 (או מנגנון היסטוריה שקול) לא ניתן לשחזר נאמנה «מה היה נכון בזמן האירוע».",
      },
      {
        id: "bi-q05-opt3",
        plainText:
          "אין צורך ב-SCD אם משתמשים ב-Snowflake בלבד במקום Star.",
        isCorrect: false,
        explanation:
          "שגוי: שינויי ממד מתרחשים גם ב-Star וגם ב-Snowflake; SCD הוא מדיניות היסטוריה, לא תוצאה של נרמול הממד.",
      },
      {
        id: "bi-q05-opt4",
        plainText:
          "Type 2 אוסר שימוש במפתחות Surrogate ודורש Natural Key בלבד כ-FK בעובדות.",
        isCorrect: false,
        explanation:
          "שגוי: Type 2 נשען בדיוק על Surrogate Keys — לכל גרסה של אותו $nk$ יש $sk$ נפרד שאליו מצביעות העובדות.",
      },
    ],
  },
  {
    id: "bi-q06-kimball-vs-inmon",
    domain: "Kimball מול Inmon",
    title:
      "בינה עסקית ומחסני נתונים (BI) - גישת Kimball מול גישת Inmon",
    context:
      "שתי אסכולות מובילות לארכיטקטורת מחסן: Kimball (Bottom-up — Bus של Data Marts ממדיים עם Conformed Dimensions) ו-Inmon (Top-down — EDW נורמלי ב-3NF ואז גזירת Marts ממדיים).",
    formulaLatex:
      "\\mathrm{Kimball:}\\ \\bigcup_i\\mathrm{Mart}_i\\ (\\mathrm{dimensional});\\quad \\mathrm{Inmon:}\\ \\mathrm{EDW}_{3NF}\\to\\mathrm{Marts}",
    instruction:
      "מה ההבדל הארכיטקטוני העקרוני בין Kimball ל-Inmon?",
    options: [
      {
        id: "bi-q06-opt1",
        plainText:
          "שתי הגישות אוסרות Data Marts ומתירות רק קובץ CSV שטוח יחיד לכל הארגון.",
        isCorrect: false,
        explanation:
          "שגוי: שתיהן משתמשות במחסן ו/או במרטים; הוויכוח הוא על הסדר, המודל המרכזי ורמת הנרמול.",
      },
      {
        id: "bi-q06-opt2",
        plainText:
          "Kimball בונה במהירות Data Marts ממדיים סביב תהליכים עסקיים עם Conformed Dimensions; Inmon מקים תחילה EDW נורמלי כמקור אמת ארגוני ואז גוזר מרטים — פשרה בין Time-to-value לבין אינטגרציה מרכזית.",
        mathText:
          "\\mathrm{Kimball}\\uparrow\\mathrm{marts};\\quad \\mathrm{Inmon}\\uparrow\\mathrm{EDW\\ first}",
        isCorrect: true,
        explanation:
          "נכון: Kimball מדגיש מסירה איטרטיבית — כל Mart ממדי סביב תהליך (מכירות, מלאי) על «אוטובוס» ממדים מתואמים ($D_c$), כך שדוחות חוצי-מחלקות נשארים עקביים. Inmon מדגיש תחילה EDW ארגוני ב-3NF כמקור אמת יחיד, ורק ממנו גוזרים Marts לצורכי הצגה. הראשון נוטה ל-Time-to-value גבוה יותר; השני נוטה לאינטגרציה חזקה יותר במחיר זמן הקמה. בפועל ארגונים רבים משלבים רעיונות משני העולמות (EDW + ממדים מתואמים).",
      },
      {
        id: "bi-q06-opt3",
        plainText:
          "Inmon דורש אך ורק קוביות MOLAP בזיכרון ללא מסד רלציוני כלל.",
        isCorrect: false,
        explanation:
          "שגוי: Inmon מזוהה עם EDW רלציוני נורמלי; אין חובת MOLAP כהגדרה של הגישה.",
      },
      {
        id: "bi-q06-opt4",
        plainText:
          "Kimball אוסר Conformed Dimensions ומתיר שמות ממד שונים לכל מרט ללא תיאום.",
        isCorrect: false,
        explanation:
          "שגוי: Conformed Dimensions הם עמוד תווך בגישת ה-Bus של Kimball — בלעדיהם נוצרים סילואים אנליטיים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "bi-q07-measures-vs-dimensions",
    domain: "מדדים מול ממדים",
    title:
      "בינה עסקית ומחסני נתונים (BI) - מדדים (Measures) מול ממדים (Dimensions)",
    context:
      "בדוח OLAP, ממדים מגדירים את צירי הניתוח ומדדים הם הערכים המסוכמים. סיווג מדד: additive (למשל $qty$ לכל הממדים), semi-additive (יתרת מלאי — לא לאורך זמן), non-additive (יחסים כמו $\\frac{\\mathrm{margin}}{\\mathrm{sales}}$). KPI כללי: $\\mathrm{KPI}=\\mathrm{Agg}_{D'\\subseteq D}(m)$.",
    formulaLatex:
      "\\mathrm{KPI}=\\mathrm{Agg}_{D'\\subseteq D}(m),\\quad m\\in\\{\\mathrm{add},\\mathrm{semi},\\mathrm{non}\\}",
    instruction:
      "כיצד מבחינים נכון בין Measure ל-Dimension בעת עיצוב דוח, ומה חשיבות סוג האדיטיביות?",
    options: [
      {
        id: "bi-q07-opt1",
        plainText:
          "כל עמודה מספרית היא Dimension, וכל טקסט הוא Measure שחובה לסכום ב-$\\sum$.",
        isCorrect: false,
        explanation:
          "שגוי: מספרים יכולים להיות מפתחות/קודים ממדיים; טקסט אינו Measure לסיכום מספרי.",
      },
      {
        id: "bi-q07-opt2",
        plainText:
          "Measures ו-Dimensions ניתנים להחלפה חופשית בכל שאילתה ללא השפעה על Grain או על $\\mathrm{Agg}(m)$.",
        isCorrect: false,
        explanation:
          "שגוי: החלפה שוברת את משמעות ה-KPI ואת רמת הפירוט שנקבעה ב-Grain.",
      },
      {
        id: "bi-q07-opt3",
        plainText:
          "Dimension מספקת הקשר לחיתוך/קיבוץ (מי, מתי, איפה, מה); Measure הוא ערך כמותי לסיכום תחת $\\mathrm{Agg}$ — ויש לבחור אגרגציה המתאימה לסוג המדד (למשל AVG/אחרון ל-semi-additive, לא SUM עיוור לאורך זמן).",
        mathText: "\\mathrm{Agg}_{D'}(m)\\ \\text{with correct additivity}",
        isCorrect: true,
        explanation:
          "נכון: זו אבחנה יסודית ב-BI. ממד עונה «לפי מה?»; מדד עונה «כמה?». טעות נפוצה היא לסכום יתרות מלאי לאורך ימים (semi-additive לאורך ממד הזמן — נכון יותר לקחת ערך בנקודת זמן או ממוצע מתאים) או לסכום יחסים non-additive במקום לחשב מחדש $\\frac{\\sum\\mathrm{margin}}{\\sum\\mathrm{sales}}$ ברמת האגרגציה הרצויה. בחירת $\\mathrm{Agg}$ חייבת להתאים לאדיטיביות; אחרת $t_q$ יכול להיות נמוך והתשובה עדיין שגויה עסקית.",
      },
      {
        id: "bi-q07-opt4",
        plainText:
          "Non-additive measure ניתן תמיד לסכום בבטחה לכל צירוף ממדים ב-$\\sum$.",
        isCorrect: false,
        explanation:
          "שגוי: מדד לא-אדיטיבי דורש חישוב מחדש ברמת האגרגציה הרצויה, לא SUM של יחסים מוכנים מראש.",
      },
    ],
  },
  {
    id: "bi-q08-bitmap-indexes-olap",
    domain: "אינדקסי Bitmap",
    title:
      "בינה עסקית ומחסני נתונים (BI) - אינדקסי Bitmap לשאילתות ממדיות",
    context:
      "במחסן אנליטי עם ממדים בעלי קרדינליות נמוכה (למשל מגדר, סטטוס, אזור עם $c$ ערכיםDistinct), אינדקס Bitmap שומר לכל ערך וקטור סיביות באורך $N$ שורות. שאילתת AND/OR בין תנאים מתבצעת כפעולות סיביות. גודל גולמי מקורב: $\\mathrm{size}\\approx\\frac{c\\cdot N}{8}$ בתים (ללא דחיסה).",
    formulaLatex:
      "\\mathrm{size}\\approx\\frac{c\\cdot N}{8}\\ \\mathrm{bytes},\\quad t_{\\mathrm{filter}}\\propto\\mathrm{bitwise\\ ops}",
    instruction:
      "מתי Bitmap Index עדיף על B-Tree בשאילתות BI, ומה הסיכון העיקרי ל-$t_{\\mathrm{filter}}$ ולכתיבות?",
    options: [
      {
        id: "bi-q08-opt1",
        plainText:
          "Bitmap תמיד עדיף על עמודות ייחודיות בעלות קרדינליות $c\\approx N$ גם בעדכונים תכופים מאוד (OLTP כבד).",
        isCorrect: false,
        explanation:
          "שגוי: בקרדינליות גבוהה ובעומס כתיבה, Bitmap בזבזני ונעול; B-Tree מתאים יותר.",
      },
      {
        id: "bi-q08-opt2",
        plainText:
          "Bitmap אינו יכול לייצג תנאי AND בין שני ממדים שונים.",
        isCorrect: false,
        explanation:
          "שגוי: חוזק מרכזי של Bitmap הוא בדיוק AND/OR סיביים בין אינדקסים של ממדים שונים.",
      },
      {
        id: "bi-q08-opt3",
        plainText:
          "עבור ממדים בעלי $c\\ll N$ ועומס קריאה אנליטי, Bitmap מאיץ סינון רב-תנאי ומקטין $t_{\\mathrm{filter}}$; הסיכון הוא נעילה/עלות עדכון גבוהה בכתיבות תכופות ונפח גדול כש-$c$ גדל ללא דחיסה.",
        mathText: "c\\ll N:\\ \\mathrm{Bitmap\\ good};\\quad \\mathrm{write\\text{-}heavy:\\ risk}",
        isCorrect: true,
        explanation:
          "נכון: מחסני BI בעומס שאילתות נהנים מ-Bitmap על ממדים קטגוריאליים — צירוף תנאי «אזור∧מגדר∧סטטוס» הופך ל-AND סיבי מהיר ומקטין את $t_{\\mathrm{filter}}$ לפני סריקת מדדים. כש-$c$ קרוב ל-$N$ (מפתחות כמעט ייחודיים) הגודל $\\frac{cN}{8}$ מתנפח; בעדכונים תכופים נעילות Bitmap יקרות. לכן בוחרים לפי סטטיסטיקת עמודה ופרופיל עומס (קריאה אנליטית מול כתיבה תפעולית), לא כברירת מחדל גורפת לכל עמודה.",
      },
      {
        id: "bi-q08-opt4",
        plainText:
          "גודל Bitmap תלוי רק במספר העמודות בטבלת הממדים ולא במספר השורות $N$.",
        isCorrect: false,
        explanation:
          "שגוי: האורך הבסיסי של כל וקטור סיביות הוא מספר שורות העובדות/הטבלה $N$.",
      },
    ],
  },
  {
    id: "bi-q09-query-latency-analytic",
    domain: "latency של שאילתות אנליטיות",
    title:
      "בינה עסקית ומחסני נתונים (BI) - השהיית שאילתה (Query Latency) במחסן",
    context:
      "זמן תגובה לשאילתת OLAP מפורק ל-$T_{\\mathrm{query}}=T_{\\mathrm{scan}}+T_{\\mathrm{join}}+T_{\\mathrm{agg}}+T_{\\mathrm{net}}$. קירוב גס לסריקה מלאה: $T_{\\mathrm{scan}}\\approx\\frac{N\\cdot r}{B}$ כאשר $N$ מספר שורות, $r$ גודל שורה ו-$B$ קצב I/O אפקטיבי.",
    formulaLatex:
      "T_{\\mathrm{query}}=T_{\\mathrm{scan}}+T_{\\mathrm{join}}+T_{\\mathrm{agg}}+T_{\\mathrm{net}},\\quad T_{\\mathrm{scan}}\\approx\\frac{Nr}{B}",
    instruction:
      "איזו אסטרטגיה מפחיתה נכון את $T_{\\mathrm{query}}$ במודל ממדי בלי לשנות את משמעות ה-KPI?",
    options: [
      {
        id: "bi-q09-opt1",
        plainText:
          "הסרת כל האינדקסים והגדלת $N$ בטבלת העובדות ללא Partitioning תמיד מקטינים latency.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת נפח הסריקה וחוסר אינדקסים/חלוקה בדרך כלל מעלה את $T_{\\mathrm{scan}}$.",
      },
      {
        id: "bi-q09-opt2",
        plainText:
          "החלפת Star ב-Snowflake עם יותר Joins מובטחת להקטין תמיד את $T_{\\mathrm{join}}$.",
        isCorrect: false,
        explanation:
          "שגוי: תוספת Joins להיררכיה מנורמלת נוטה להגדיל את $T_{\\mathrm{join}}$, לא להקטין.",
      },
      {
        id: "bi-q09-opt3",
        plainText:
          "מצמצמים $T_{\\mathrm{scan}}$ ע\"י Partitioning/Pruning לפי ממד זמן, מצמצמים $T_{\\mathrm{join}}$ במודל Star צר, ומשתמשים באגרגציות/אינדקסים מתאימים — כך יורד $T_{\\mathrm{query}}$ מבלי לשנות את משמעות ה-KPI.",
        mathText: "\\downarrow T_{\\mathrm{scan}},\\ \\downarrow T_{\\mathrm{join}}\\ \\Rightarrow\\ \\downarrow T_{\\mathrm{query}}",
        isCorrect: true,
        explanation:
          "נכון: latency אנליטי נשלט בעיקר ע\"י נפח נסרק ומספר/עלות Joins. חלוקה לפי תאריך מאפשרת Partition Pruning כך שרק חלק מ-$N$ נסרק; מודל Star עם ממדים דנורמלים מצמצם $\\#\\mathrm{joins}$; אינדקסי Bitmap/עמודות, סינון מוקדם, ומטריצות אגרגציה מקדימות מקטינים $T_{\\mathrm{scan}}$ ו-$T_{\\mathrm{agg}}$. קיצור $T_{\\mathrm{net}}$ חשוב ב-BI מופץ אך אינו מחליף סריקה יעילה של $F$. חשוב: אופטימיזציה זו משמרת את ה-Grain והסמנטיקה — בניגוד ל«קיצור» ע\"י שינוי שגוי של מדד או ערבוב רמות פירוט.",
      },
      {
        id: "bi-q09-opt4",
        plainText:
          "הדרך היחידה להקטין latency היא להעלות את $r$ (שורות רחבות יותר) בכל טבלה.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת $r$ מעלה את $T_{\\mathrm{scan}}$ בנוסחה $\\frac{Nr}{B}$; לרוב שואפים לצמצם רוחב עובדות רלוונטיות לשאילתה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "bi-q10-data-marts-scope",
    domain: "Data Marts",
    title:
      "בינה עסקית ומחסני נתונים (BI) - Data Marts והיקף נושאי",
    context:
      "Data Mart הוא מחסן ממוקד לנושא/מחלקה (מכירות, כספים, שרשרת אספקה), לעיתים כחלק מ-Bus ממדי או כנגזרת מ-EDW. נסמן את היקף המרט כקבוצת תהליכים $P_m$ וממדים משותפים $D_c=\\bigcap_p\\mathrm{dims}(p)$.",
    formulaLatex:
      "\\mathrm{Mart}_m=(\\{F_p\\}_{p\\in P_m},\\,D_c),\\quad D_c=\\bigcap_p\\mathrm{dims}(p)",
    instruction:
      "מהו תפקיד ה-Data Mart ומה הסיכון בבניית מרטים מבודדים ללא ממדים מתואמים?",
    options: [
      {
        id: "bi-q10-opt1",
        plainText:
          "Data Mart חייב לכלול את כל נתוני הארגון ב-3NF לפני כל דוח.",
        isCorrect: false,
        explanation:
          "שגוי: זה קרוב יותר לתיאור EDW של Inmon; מרט הוא ממוקד נושא $P_m$, לא ארגון שלם ב-3NF.",
      },
      {
        id: "bi-q10-opt2",
        plainText:
          "מרטים אסורים בגישת Kimball ומותרים רק ב-Inmon.",
        isCorrect: false,
        explanation:
          "שגוי: Kimball ממקם Data Marts במרכז הארכיטקטורה; גם Inmon משתמש במרטים נגזרים מה-EDW.",
      },
      {
        id: "bi-q10-opt3",
        plainText:
          "אין סיכון בקישוריות אם כל מחלקה מגדירה «לקוח» אחר ללא Conformed Dimensions.",
        isCorrect: false,
        explanation:
          "שגוי: זה בדיוק סיכון ה-independent marts — KPI בלתי-השוואתיים בין מחלקות.",
      },
      {
        id: "bi-q10-opt4",
        plainText:
          "Mart מספק מודל ממדי ממוקד ל-$P_m$ עם זמן פיתוח קצר; בלי Conformed Dimensions ($D_c$) נוצרים סילואים אנליטיים — אותם מושגים עסקיים אינם מתכנסים בין מרטים והשוואת מדדים חוצת-ארגון נשברת.",
        mathText: "\\mathrm{need\\ }D_c\\neq\\emptyset\\ \\mathrm{across\\ marts}",
        isCorrect: true,
        explanation:
          "נכון: מרטים מאיצים מסירה עסקית סביב תהליך מוגדר, אך חייבים «אוטובוס» ממדים מתואם (או EDW מזין) כדי למנוע גרסאות סותרות של לקוח/מוצר/זמן. אם $D_c=\\emptyset$ בפועל — כל מרט מגדיר ממד «לקוח» אחר — לא ניתן לחשב KPI ארגוני עקבי, גם אם כל מרט לבדו בעל $T_{\\mathrm{query}}$ מצוין. זה לב הדיון Kimball (Conformed Dimensions) מול מרטים עצמאיים.",
      },
    ],
  },
  {
    id: "bi-q11-fact-table-grain",
    domain: "Grain של טבלת עובדות",
    title:
      "בינה עסקית ומחסני נתונים (BI) - קביעת ה-Grain של טבלת העובדות",
    context:
      "ה-Grain מגדיר מה מייצגת שורה ב-Fact. לדוגמה: «שורה = פריט בשורת חשבונית» לעומת «שורה = סיכום יומי לחנות×מוצר». אם $G$ עדין/גס מדי או מעורב, האגרגציות $\\sum m$ משנות משמעות. פורמלית: שורה אחת $\\equiv$ אירוע עסקי ברמת $G$.",
    formulaLatex:
      "\\mathrm{Grain\\ }G:\\ 1\\ \\mathrm{row}\\equiv\\mathrm{business\\ event\\ at\\ level\\ }G",
    instruction:
      "מדוע חובה לקבע Grain לפני בניית הממדים והמדדים, ומה קורה אם מערבבים רמות פירוט?",
    options: [
      {
        id: "bi-q11-opt1",
        plainText:
          "Grain הוא שם נרדף לאינדקס Bitmap ואינו קשור לרמת הפירוט של השורה.",
        isCorrect: false,
        explanation:
          "שגוי: Grain הוא חוזה סמנטי על מהות השורה, לא מבנה אינדקס פיזי.",
      },
      {
        id: "bi-q11-opt2",
        plainText:
          "ניתן להחליף Grain בכל שאילתה בלי לעדכן את מודל ה-ETL או את המפתחות.",
        isCorrect: false,
        explanation:
          "שגוי: שינוי Grain דורש שינוי טעינה, מפתחות ומדדים — לא החלפה אד-הוק בשאילתה.",
      },
      {
        id: "bi-q11-opt3",
        plainText:
          "ערבוב שורות יומיות ושורות חשבונית באותה Fact תמיד משפר דיוק כי יש יותר נתונים.",
        isCorrect: false,
        explanation:
          "שגוי: ערבוב רמות יוצר כפילות/חוסר עקביות בסיכומים ושובר KPI ו-Roll-up.",
      },
      {
        id: "bi-q11-opt4",
        plainText:
          "ה-Grain נקבע ראשון כמשפט עסקי חד-משמעי; ממנו נגזרים הממדים, המדדים והמפתחות. ערבוב רמות פירוט באותה טבלה מעוות $\\sum m$ ומונע Roll-up/Drill-down אמינים.",
        mathText: "\\mathrm{declare\\ }G\\ \\Rightarrow\\ \\mathrm{keys,\\ measures,\\ ETL}",
        isCorrect: true,
        explanation:
          "נכון: Kimball מדגיש «Grain first». בלי משפט Grain ברור אי אפשר לדעת אם SUM כפול, אם ממד חסר, או אם דוח יומי דוגם נכון מאירועי שורת חשבונית. ערבוב $G$ שונים באותה $F$ הופך את $\\mathrm{Agg}(m)$ לבלתי-מוגדר עסקית ושובר ניווט היררכי. תיקון מאוחר יקר: שובר ETL, מפתחות, SCD ואת כל שכבת הדוחות. לכן Grain הוא החוזה הראשון — ורק אחריו מעצבים ממדים ומדדים.",
      },
    ],
  },
  {
    id: "bi-q12-surrogate-keys-dimensions",
    domain: "מפתחות Surrogate",
    title:
      "בינה עסקית ומחסני נתונים (BI) - מפתחות Surrogate בממדים ובעובדות",
    context:
      "Surrogate Key ($sk$) הוא מזהה שלם סינתטי בטבלת ממד, בעוד Natural Key ($nk$) מגיע ממערכת המקור. טבלת העובדות מאחסנת $sk$ כ-FK: $D(sk,nk,\\mathrm{attrs},\\ldots)$, $F(\\ldots,sk,\\ldots)$ עם $sk\\notin$ מערכות המקור. זה קריטי במיוחד תחת SCD Type 2.",
    formulaLatex:
      "D(sk,nk,\\mathrm{attrs},\\ldots),\\quad F(\\ldots,sk,\\ldots),\\quad sk\\notin\\mathrm{source\\ systems}",
    instruction:
      "מדוע מעדיפים Surrogate Keys במחסן ממדי על פני שימוש ישיר ב-Natural Keys כ-FK בעובדות?",
    options: [
      {
        id: "bi-q12-opt1",
        plainText:
          "Surrogate Keys אסורים כאשר יש SCD Type 2, כי אז חובה לשמור רק $nk$ בעובדות.",
        isCorrect: false,
        explanation:
          "שגוי: SCD2 נשען על $sk$ חדש לכל גרסה של אותו $nk$; העובדות מצביעות ל-$sk$ התקף.",
      },
      {
        id: "bi-q12-opt2",
        plainText:
          "Natural Key תמיד יציב יותר מ-$sk$ גם כשמערכות מקור מתמזגות ומשנות קודים.",
        isCorrect: false,
        explanation:
          "שגוי: Natural Keys לעיתים קרובות משתנים או מתנגשים בין מקורות — זו סיבה מרכזית ל-$sk$.",
      },
      {
        id: "bi-q12-opt3",
        plainText:
          "אין הבדל: $sk$ ו-$nk$ חייבים להיות זהים מספריים בכל הממדים.",
        isCorrect: false,
        explanation:
          "שגוי: $sk$ סינתטי ועצמאי; אין דרישה לשוויון מספרי עם מזהה המקור.",
      },
      {
        id: "bi-q12-opt4",
        plainText:
          "Surrogate Keys מבודדים את המחסן משינויי קודים במקור, מאפשרים גרסאות SCD2 לאותו $nk$, ומייעלים Joins על עמודות שלמות צרות — לכן $F$ מצביעה ל-$sk$ ולא ל-$nk$ ישירות.",
        mathText: "F\\ni sk;\\quad \\mathrm{SCD2:\\ }nk\\mapsto\\{sk_1,sk_2,\\ldots\\}",
        isCorrect: true,
        explanation:
          "נכון: $sk$ נותן יציבות סכמטית, ביצועי Join (השוואת integers צרים מול מפתחות טקסט/מורכבים), והיסטוריית SCD2: אותו $nk$ ממופה לקבוצת $\\{sk_1,sk_2,\\ldots\\}$ לפי חלונות תוקף. כאשר מקורות מחליפים מזהים או כאשר אותו ישות עסקית מופיעה במערכות שונות, האינטגרציה נעשית בממד והעובדות נשארות מקושרות דרך $sk$ יציב — בלי לשכתב היסטוריית $F$ בכל שינוי קוד במקור.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_BI_QUESTIONS = BUSINESS_INTELLIGENCE_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from schemas / facts / OLAP ops (Q1–3)
 * - 1 from ETL / SCD / Kimball–Inmon (Q4–6)
 * - 1 from measures / bitmap / latency / marts / grain / surrogate (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleBusinessIntelligenceOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = BUSINESS_INTELLIGENCE_QUESTIONS.slice(0, 3);
  const groupB = BUSINESS_INTELLIGENCE_QUESTIONS.slice(3, 6);
  const groupC = BUSINESS_INTELLIGENCE_QUESTIONS.slice(6, 12);

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
