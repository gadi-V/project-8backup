import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic תכן בעזרת מחשב (CAD) diagnostic bank (12Q).
 * Display name: "תכן בעזרת מחשב (CAD)" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const CAD_MECHANICAL_DESIGN_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "cad-q01-gdt-position-tolerance-mmc",
    domain: "GD&T",
    title: "תכן בעזרת מחשב (CAD) - GD&T וסבילות מיקום ב-MMC",
    context:
      "בחור קוטר $\\varnothing 10.0\\pm 0.1$ מוגדרת סבילות מיקום (Position) של $\\varnothing 0.2$ ביחס למערכת דאטום $A|B|C$, עם משנה חומר מקסימלי (MMC). קוטר ה-MMC של החור הוא הקוטר הקטן ביותר ($\\varnothing 9.9$).",
    formulaLatex:
      "\\text{Bonus} = \\varnothing_{\\text{actual}} - \\varnothing_{\\text{MMC}},\\quad \\text{Virtual Condition} = \\varnothing_{\\text{MMC}} - t_{\\text{pos}}",
    instruction:
      "מה משמעות MMC בסבילות מיקום לחור, ומהו קוטר תנאי הווירטואלי (Virtual Condition) להרכבה?",
    options: [
      {
        id: "cad-q01-opt1",
        plainText:
          "ב-MMC החור הקטן ביותר ($\\varnothing 9.9$) מקבל רק את סבילות המיקום הנומינלית $\\varnothing 0.2$; ככל שהחור גדל מעל MMC מתקבל Bonus למיקום. תנאי הווירטואלי להרכבה הוא $\\varnothing_{VC} = 9.9 - 0.2 = 9.7$ — זהו הגבול הקריטי למניעת התנגשות עם פינים/ברגים.",
        mathText: "\\varnothing_{VC} = 9.9 - 0.2 = 9.7",
        isCorrect: true,
        explanation:
          "נכון: לפי ASME Y14.5, משנה MMC על Position לחור קושר בין גודל למיקום. בחור הכי קטן (MMC) מותרת רק סבילות המיקום המצוינת; כל הגדלה בקוטר מוסיפה Bonus לקוטר אזור הסבילות: $\\text{Bonus} = \\varnothing_{\\text{actual}} - 9.9$. Virtual Condition לחור הוא $\\varnothing_{\\text{MMC}} - t = 9.9 - 0.2 = 9.7$, ומייצג את המעטפת הפנימית הגרועה ביותר מבחינת הרכבה. זה מאפשר תכן פונקציונלי עם בדיקת Go-gauge פשוטה: אם מד-עבור בקוטר $9.7$ עובר ביחס לדאטומים, ההרכבה מובטחת בכל מצבי הגודל–מיקום המותרים.",
      },
      {
        id: "cad-q01-opt2",
        plainText:
          "MMC פירושו שהחור הגדול ביותר מקבל את סבילות המיקום המחמירה ביותר, ותנאי הווירטואלי הוא $10.1 + 0.2 = 10.3$.",
        isCorrect: false,
        explanation:
          "שגוי: לחור, MMC הוא הקוטר הקטן ($\\varnothing 9.9$) — חומר מקסימלי בקיר — לא הגדול. החישוב $10.1+0.2=10.3$ מערבב LMC עם מעטפת חיצונית של פין; עבור חור ב-MMC, VC הוא חיסור הסבילות מה-MMC ($9.9-0.2$), לא חיבור לקוטר המקסימלי.",
      },
      {
        id: "cad-q01-opt3",
        plainText:
          "משנה MMC מבטל לחלוטין את הצורך בדאטומים $A|B|C$ כי הגודל קובע את המיקום.",
        isCorrect: false,
        explanation:
          "שגוי: דאטומים מגדירים את מערכת הייחוס (Datum Reference Frame) שביחס אליה נמדד מיקום ציר החור. MMC רק משנה את גודל אזור הסבילות כפונקציה של גודל הישות בפועל; בלי $A|B|C$ אין כיוון ומקור למדידת Position.",
      },
      {
        id: "cad-q01-opt4",
        plainText:
          "סבילות מיקום ב-MMC חלה רק על משטחים שטוחים, לא על חורים גליליים.",
        isCorrect: false,
        explanation:
          "שגוי: Position עם MMC הוא כלי מרכזי בדיוק לחורים, פינים ודיבלים — יישומי הרכבה קלאסיים ב-GD&T. משטחים שטוחים משתמשים לרוב ב-Flatness/Perpendicularity/Profile, לא ב-Position גלילי.",
      },
    ],
  },
  {
    id: "cad-q02-parametric-modeling-design-intent",
    domain: "מידול פרמטרי",
    title: "תכן בעזרת מחשב (CAD) - מידול פרמטרי וכוונת תכן",
    context:
      "במודל פרמטרי (Feature-based Parametric CAD) מידות הסקיצה מקושרות במשתנים וביחסים ($d_2 = 2\\cdot d_1$, $d_3 = d_1 + 5\\text{ mm}$). שינוי בפרמטר מניע עדכון של כל הפיצ'רים התלויים בגרף האילוצים.",
    formulaLatex: "d_2 = 2 d_1,\\quad d_3 = d_1 + 5\\text{ mm}",
    instruction:
      "מהי 'כוונת תכן' (Design Intent) במידול פרמטרי, וכיצד יש לבנות סקיצה כדי לשמר אותה?",
    options: [
      {
        id: "cad-q02-opt1",
        plainText:
          "כוונת תכן היא קידוד מפורש של יחסים פונקציונליים בין מידות (סימטריה, יחסים, משוואות) כך ששינוי פרמטר קלט יעדכן אוטומטית את הגיאומטריה מבלי לשבור אילוצים. סקיצה טובה תהיה Fully Constrained, עם מידות נדירות מיותרות ומשוואות במקום ערכים קשיחים כפולים.",
        mathText: "d_2=2d_1\\;\\Rightarrow\\;\\text{update propagates}",
        isCorrect: true,
        explanation:
          "נכון: Parametric CAD מפריד בין גיאומטריה לבין פרמטרים/אילוצים. Design Intent נשמר כאשר היחסים החשובים לתפקוד (למשל 'הרוחב תמיד כפול הגובה') מבוטאים כמשוואות או אילוצי סימטריה, ולא כמידות מספריות בלתי תלויות. סקיצה תחת-מוגדרת (Under-constrained) מאפשרת גרירות לא צפויות; סקיצה יתר-מוגדרת (Over-constrained) נכשלת בעדכון. המטרה: שינוי $d_1$ מעדכן את $d_2=2d_1$ ואת $d_3=d_1+5$ באופן עקבי בכל Rebuild.",
      },
      {
        id: "cad-q02-opt2",
        plainText:
          "כוונת תכן פירושה לייצא STL בכל שינוי מידה כדי 'לנעול' את הצורה.",
        isCorrect: false,
        explanation:
          "שגוי: STL הוא רשת משולשים לא-פרמטרית; ייצוא אליו מאבד היסטוריית פיצ'רים, משוואות ואילוצים. זהו הפוך משימור Design Intent — אחרי STL נותר 'Dumb Solid' שדורש עריכה ידנית בכל שינוי.",
      },
      {
        id: "cad-q02-opt3",
        plainText:
          "עדיף להשאיר את כל הסקיצות Under-constrained כדי לאפשר חופש עיצובי מקסימלי בכל עדכון.",
        isCorrect: false,
        explanation:
          "שגוי: סקיצה לא יציבה גורמת לפתרון אילוצים לא דטרמיניסטי — פיצ'רים 'קופצים' בעדכון פרמטרים. חופש עיצובי מושג בפרמטרים מבוקרים ובקונפיגורציות, לא בחוסר אילוצים.",
      },
      {
        id: "cad-q02-opt4",
        plainText:
          "מידול פרמטרי אוסר שימוש במשוואות בין מידות; מותרות רק מידות נומריות קשיחות.",
        isCorrect: false,
        explanation:
          "שגוי: משוואות וקישורי פרמטרים (Equations, Global Variables, Linked Dimensions) הם ליבת המידול הפרמטרי המודרני; מידות קשיחות בלבד שוברות כוונת תכן בעדכון.",
      },
    ],
  },
  {
    id: "cad-q03-feature-tree-parent-child",
    domain: "עץ פיצ'רים",
    title: "תכן בעזרת מחשב (CAD) - עץ פיצ'רים ותלויות Parent–Child",
    context:
      "בעץ היסטוריה (Feature Tree / Model Tree) פיצ'ר Extrude-2 נבנה על פנים שנוצרו ב-Extrude-1, ו-Fillet-1 מתייחס לקצוות של Extrude-2. מחיקה או כשל של Extrude-1 שובר את השרשרת.",
    formulaLatex: "\\text{Extrude-1} \\prec \\text{Extrude-2} \\prec \\text{Fillet-1}",
    instruction:
      "מהי תלות Parent–Child בעץ פיצ'רים, ומהי אסטרטגיה נכונה לצמצום שבריריות המודל?",
    options: [
      {
        id: "cad-q03-opt1",
        plainText:
          "פיצ'ר-ילד תלוי בגיאומטריה/במישור/בשרטוט של הורה; כשל בהורה גורם ל-Feature Fail בילדים. יש לבנות על דאטומים יציבים (מישורי Origin, Sketch ראשוני חזק), להימנע מהתייחסות לפנים זמניות שעלולות להיעלם, ולהשתמש ב-Rollback לבדיקת סדר בנייה.",
        isCorrect: true,
        explanation:
          "נכון: היסטוריית ה-CAD היא גרף תלויות מכוון $\\text{Extrude-1}\\prec\\text{Extrude-2}\\prec\\text{Fillet-1}$. כאשר ילד מתייחס לפאה שנוצרה בהורה, מחיקת ההורה או שינוי טופולוגי שלו שובר את הייחוס (Missing Reference). שיטות טובות: (1) אילוץ לסקיצות על מישורי בסיס קבועים; (2) שימוש ב-Reference Geometry ייעודי; (3) דחיית Fillets/Chamfers לסוף העץ; (4) הימנעות מ-Select על פנים שעשויות להתחלף ב-Rebuild. כך המודל עמיד לשינויי פרמטרים.",
      },
      {
        id: "cad-q03-opt2",
        plainText:
          "סדר הפיצ'רים בעץ אינו משפיע על התוצאה הגיאומטרית כי Boolean סופי קומוטטיבי תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: בפילטים, חריטות, דפוסים ובחירת פנים — הסדר קריטי לתוצאה ולתלויות. גם פעולות Boolean אינן תמיד קומוטטיביות כשיש תלויות היסטוריה ובחירת פנים דינמית.",
      },
      {
        id: "cad-q03-opt3",
        plainText:
          "מומלץ תמיד למחוק את כל ההיסטוריה (Delete All Features) לפני כל שינוי מידה.",
        isCorrect: false,
        explanation:
          "שגוי: מחיקת היסטוריה הופכת את המודל ל'Dumb Solid' ומאבדת פרמטריות וכוונת תכן. שינוי מידה אמור להתבצע דרך הפרמטרים והאילוצים, לא דרך השמדת העץ.",
      },
      {
        id: "cad-q03-opt4",
        plainText:
          "Fillet חייב תמיד להיות הפיצ'ר הראשון בעץ כדי למנוע כשלים.",
        isCorrect: false,
        explanation:
          "שגוי: להפך — פיצ'רי עיגול בקצוות מומלץ לדחות לסוף העץ, כי הם תלויים בקצוות שנוצרים מפיצ'רי הנפח העיקריים; Fillet מוקדם נשבר בכל שינוי טופולוגיה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "cad-q04-assemblies-constraints-dof",
    domain: "מכלולים ואילוצים",
    title: "תכן בעזרת מחשב (CAD) - מכלולים, אילוצים ודרגות חופש",
    context:
      "גוף קשיח חופשי במרחב תלת-ממדי בעל $6$ דרגות חופש (DOF): $3$ תזוזות ו-$3$ סיבובים. במכלול CAD, Mate/Constraint מפחית DOF עד שהרכיב קבוע או נותר עם תנועה מכוונת (מנגנון).",
    formulaLatex:
      "\\mathrm{DOF}_{\\text{remaining}} = 6 - \\sum \\mathrm{DOF}_{\\text{removed by mates}}",
    instruction:
      "כיצד פועל אילוץ Concentric בין גליל לחור, ומה נותר לרוב ב-DOF אחריו (לפני אילוצים נוספים)?",
    options: [
      {
        id: "cad-q04-opt1",
        plainText:
          "Concentric נועל את כל $6$ דרגות החופש מיד, כולל סיבוב סביב ציר החור והתזוזה לאורכו.",
        isCorrect: false,
        explanation:
          "שגוי: Concentric מיישר צירים וחוסם בעיקר $2$ תזוזות רדיאליות ו-$2$ סיבובי הטיה — אך משאיר בדרך כלל תזוזה צירית וסיבוב סביב הציר המשותף. נעילה מלאה דורשת Mates נוספים.",
      },
      {
        id: "cad-q04-opt2",
        plainText:
          "Concentric מיישר את צירי הגליל והחור ומסיר בעיקר את התזוזות הניצבות לציר ואת סיבובי ההטיה; לרוב נותרות תזוזה לאורך הציר וסיבוב סביבו — אותן נועלים ב-Coincident/Distance על פנים וב-Angle/Parallel לפי הצורך. כך בונים מכלול קינמטי מבוקר ולא 'דביק' יתר.",
        mathText:
          "\\text{Concentric}:\\; \\text{typically leaves axial slide + spin}",
        isCorrect: true,
        explanation:
          "נכון: בניתוח DOF של מכלולים, Mate מסוג Concentric (או Insert) מגדיר קואקסיאליות. הרכיב עדיין יכול להחליק לאורך הציר ולהסתובב סביבו עד שמוסיפים Mate על פנים קצה (Coincident/Distance) ו/או אילוץ כיוון. הבנה זו חיונית לתכן מנגנונים (צירים, בוכנות) לעומת קיבוע מלא של חלקי מבנה — ומונעת Over-constraint מיותר.",
      },
      {
        id: "cad-q04-opt3",
        plainText:
          "במכלול CAD אין מושג של DOF; האילוצים הם תוויות תצוגה בלבד שאינן משפיעות על מיקום.",
        isCorrect: false,
        explanation:
          "שגוי: מנוע המכלול פותר מערכת אילוצים גיאומטריים בזמן אמת; ללא Mates רכיבים נשארים 'צפים' עם $6$ DOF ונגררים בחופשיות במרחב.",
      },
      {
        id: "cad-q04-opt4",
        plainText:
          "כל Mate מסיר בדיוק דרגת חופש אחת תמיד, ללא תלות בסוג האילוץ.",
        isCorrect: false,
        explanation:
          "שגוי: סוגים שונים מסירים מספר שונה של DOF (למשל Fixed מסיר $6$; Coincident בין מישורים מסיר תזוזה ניצבת אחת ועוד). ספירה עיוורת של 'מספר Mates' מטעה בניתוח קינמטי.",
      },
    ],
  },
  {
    id: "cad-q05-bom-balloon-structure",
    domain: "BOM",
    title: "תכן בעזרת מחשב (CAD) - BOM ורשימת חלקים",
    context:
      "בשרטוט מכלול מופקת טבלת Bill of Materials (BOM) עם עמודות Item, Part Number, Description, Qty. בלונים (Balloons) על המבט מקשרים פריטים לשורות בטבלה.",
    formulaLatex:
      "\\text{Qty}_{\\text{total}} = \\sum_i n_i \\cdot q_i\\;\\text{(instances $\\times$ unit qty)}",
    instruction:
      "מה ההבדל בין BOM שטוח (Parts Only) ל-BOM היררכי (Indented), ומתי כל אחד מתאים?",
    options: [
      {
        id: "cad-q05-opt1",
        plainText:
          "BOM שטוח והיררכי זהים תמיד; ההבדל הוא רק צבע הבלונים בשרטוט.",
        isCorrect: false,
        explanation:
          "שגוי: מבנה הנתונים שונה מהותית — היררכיה משמרת תתי-מכלולים ורמות הרכבה; שטוח מרכז כמויות לפי מספר חלק. צבע בלונים אינו מגדיר את סוג ה-BOM.",
      },
      {
        id: "cad-q05-opt2",
        plainText:
          "Parts Only (שטוח) מרכז את כל המופעים של אותו Part Number לשורה אחת עם כמות כוללת — מתאים לרכש ומלאי. Indented BOM שומר היררכיית תתי-מכלולים (Sub-assemblies) — מתאים להרכבה בקו ולניהול מבנה מוצר (MBOM/EBOM). בלונים חייבים להתאים למספרי הפריט בטבלה הפעילה.",
        isCorrect: true,
        explanation:
          "נכון: BOM שטוח פותר את שאלת 'כמה יחידות לקנות מכל מק\"ט' ($\\text{Qty}_{\\text{total}}=\\sum n_i q_i$). BOM מורכב (Indented) עונה 'באיזה סדר ובאיזה תת-מכלול מרכיבים'. ערבוב ביניהם גורם לשגיאות רכש או להוראות הרכבה חסרות. קישור Balloon↔Item Number חייב להיות עקבי עם סוג ה-BOM שנבחר בשרטוט ועם ה-Rev של המכלול.",
      },
      {
        id: "cad-q05-opt3",
        plainText:
          "ב-BOM אסור לכלול מחברים סטנדרטיים (ברגים, אומים) כי הם אינם 'חלקי תכן'.",
        isCorrect: false,
        explanation:
          "שגוי: מחברים סטנדרטיים הם פריטי BOM קריטיים לרכש ולהרכבה; לעיתים מופיעים גם כ-Bulk Items עם יחידות מידה מיוחדות (מטרים של אטם, גרמים של דבק).",
      },
      {
        id: "cad-q05-opt4",
        plainText:
          "כמות ב-BOM נקבעת רק ממספר הבלונים על השרטוט, לא ממספר המופעים במודל המכלול.",
        isCorrect: false,
        explanation:
          "שגוי: המקור לספירה הוא מבנה המכלול התלת-ממדי (Instances); בלונים הם ייצוג גרפי. חוסר התאמה בין בלונים לכמויות הוא שגיאת תיעוד, לא מקור נתונים.",
      },
    ],
  },
  {
    id: "cad-q06-tolerances-stackup-worst-case",
    domain: "סבילויות",
    title: "תכן בעזרת מחשב (CAD) - סבילויות וניתוח Stack-up",
    context:
      "שרשרת מידות לינארית: שלושה חלקים באורכים נומינליים $L_1=20$, $L_2=30$, $L_3=25$ (ב-$\\text{mm}$) עם סבילויות דו-צדדיות $\\pm 0.1$, $\\pm 0.15$, $\\pm 0.05$ בהתאמה. הפער הפונקציונלי הוא הסכום $G = L_1+L_2+L_3$.",
    formulaLatex:
      "G = \\sum L_i,\\quad \\Delta G_{\\text{WC}} = \\sum t_i,\\quad \\Delta G_{\\text{RSS}} = \\sqrt{\\sum t_i^2}",
    instruction:
      "מהו טווח הפער בשיטת Worst-Case לעומת RSS, ומתי בוחרים בכל שיטה?",
    options: [
      {
        id: "cad-q06-opt1",
        plainText:
          "Worst-Case נותן $\\Delta G = \\sqrt{0.1^2+0.15^2+0.05^2}\\approx 0.187$; RSS נותן סכום לינארי $0.30$.",
        isCorrect: false,
        explanation:
          "שגוי: ההגדרות הפוכות — Worst-Case הוא סכום לינארי של הסבילויות ($\\sum t_i=0.30$); RSS הוא שורש סכום הריבועים ($\\approx 0.187$).",
      },
      {
        id: "cad-q06-opt2",
        plainText:
          "Worst-Case: $G=75\\pm 0.30$ ($\\Delta G=\\sum t_i=0.30$) — ערבון הרכבה של $100\\%$ אך שמרני. RSS: $\\Delta G=\\sqrt{0.1^2+0.15^2+0.05^2}\\approx 0.187$ — ריאליסטי יותר לייצור סדרתי בלתי-מתואם. WC לתכן קריטי/בטיחותי; RSS לאופטימיזציית עלות כשהסטטיסטיקה מוצדקת.",
        mathText: "G_{WC}=75\\pm 0.30,\\; \\Delta G_{RSS}\\approx 0.187",
        isCorrect: true,
        explanation:
          "נכון: בניתוח Stack-up לינארי, שיטת המקרה הגרוע מחברת את כל הסטיות בכיוון הגרוע ביותר — מתאימה לדרישות אפס-פחת בהרכבה. RSS מניח אי-תלות סטטיסטית ומקטין את תחזית הפיזור, ולכן מאפשר סבילויות רחבות יותר וזולות יותר אם מקבלים שיעור פחת קטן. הנומינל $20+30+25=75\\text{ mm}$. מודל CAD סטנדרטי הוא נומינלי; ה-Stack-up מתבצע על המידות והסבילויות שבשרטוט/MBD.",
      },
      {
        id: "cad-q06-opt3",
        plainText:
          "ב-CAD אין צורך ב-Stack-up כי המודל התלת-ממדי תמיד 'בדיוק נומינלי' ומייצג את כל הסבילויות.",
        isCorrect: false,
        explanation:
          "שגוי: מודל CAD סטנדרטי הוא נומינלי; סבילויות מתועדות ב-MBD/שרטוט ודורשות ניתוח נפרד (או כלי TolAnalyst/CETOL). חלקים ללא חפיפה נומינלית עדיין עלולים להתנגש בקצות סבילות.",
      },
      {
        id: "cad-q06-opt4",
        plainText:
          "RSS תמיד מחמיר יותר מ-Worst-Case ולכן מחליף אותו בכל תכן תעופתי.",
        isCorrect: false,
        explanation:
          "שגוי: RSS מקל ביחס ל-WC ($0.187<0.30$). תעשיות בטיחותיות לעיתים דורשות דווקא WC או שיטות סטטיסטיות מבוקרות עם $C_{pk}$ מוכח — לא החלפה עיוורת ב-RSS.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "cad-q07-orthographic-projections-third-angle",
    domain: "הטלות אורתוגרפיות",
    title: "תכן בעזרת מחשב (CAD) - הטלות אורתוגרפיות",
    context:
      "בשרטוט הנדסי תלת-ממדי מוצגות הטלות אורתוגרפיות (Orthographic Views) לפי תקן First-Angle או Third-Angle. המבט הקדמי, העליון והצדדי חייבים להיות עקביים בקידוד הגובה/רוחב/עומק.",
    formulaLatex:
      "\\text{Third-Angle}:\\; \\text{Top above Front},\\; \\text{Right right of Front}",
    instruction:
      "בשיטת Third-Angle Projection, היכן ממוקם מבט הימין יחסית למבט הקדמי, ומה מסמן משולש ההטלה בתבנית השרטוט?",
    options: [
      {
        id: "cad-q07-opt1",
        plainText:
          "מבט הימין משמאל למבט הקדמי; המשולש מציין First-Angle בלבד בכל העולם.",
        isCorrect: false,
        explanation:
          "שגוי: ב-Third-Angle (המקובל בארה\"ב/ASME) מבט הימין מימין לקדמי. סימן ההטלה בתבנית מבדיל בין First ל-Third; אינו זהה גלובלית ואינו 'First בלבד'.",
      },
      {
        id: "cad-q07-opt2",
        plainText:
          "אין הבדל מעשי בין First-Angle ל-Third-Angle בפריסת המבטים; ההבדל הוא רק ביחידות מידה.",
        isCorrect: false,
        explanation:
          "שגוי: הפריסות הפוכות לוגית (מיקום מבט עליון/צד). בלבול ביניהן גורם לפרשנות שגויה של עומק וצדדים בייצור — זו טעות קלאסית בפרויקטים בינלאומיים.",
      },
      {
        id: "cad-q07-opt3",
        plainText:
          "ב-Third-Angle מבט הימין מימין למבט הקדמי ומבט עליון מעל הקדמי (כאילו הפרוסה 'נפתחת' מהאובייקט). סמל ההטלה בתבנית מצהיר איזו שיטה בתוקף בשרטוט — חובה לקרוא אותו לפני פירוש המבטים.",
        isCorrect: true,
        explanation:
          "נכון: ב-Third-Angle הצופה נמצא ב'רביע השלישי' והמבטים מסודרים כך שהצד הנראה במבט ממוקם באותו צד בדף: Top מעל Front, Right מימין ל-Front. ב-First-Angle (ISO/אירופה לעיתים) הפריסה הפוכה. סמל Projection בתבנית השרטוט הוא חלק מתקני ASME Y14.3 / ISO 128 ומונע טעויות ייצור חוצות-יבשות.",
      },
      {
        id: "cad-q07-opt4",
        plainText:
          "הטלה אורתוגרפית כוללת בהכרח פרספקטיבה עם נקודת מגוז אחת לשיפור הריאליזם.",
        isCorrect: false,
        explanation:
          "שגוי: אורתוגרפיה היא הטלה מקבילה ללא פרספקטיבה — מידות נשמרות על מישורים מקבילים למישור ההטלה. פרספקטיבה שייכת להדמיות שיווקיות, לא לשרטוט ייצור סטנדרטי.",
      },
    ],
  },
  {
    id: "cad-q08-solid-vs-surface-modeling",
    domain: "מידול מוצק מול משטחי",
    title: "תכן בעזרת מחשב (CAD) - מידול מוצק מול מידול משטחי",
    context:
      "Solid Modeling מייצג נפח סגור עם פנים פנימיות/חיצוניות (B-rep manifold סגור), בעוד Surface Modeling מתמקד במשטחים (NURBS) שיכולים להיות פתוחים. Hybrid modeling משלב את השניים.",
    formulaLatex:
      "\\text{Solid}:\\; \\partial \\Omega \\text{ closed manifold},\\quad \\text{Surface}:\\; \\text{NURBS patches}",
    instruction:
      "מתי עדיף Solid ומתי Surface, ומה הסיכון במעבר ממשטח למוצק (Knit/Stitch)?",
    options: [
      {
        id: "cad-q08-opt1",
        plainText:
          "Surface תמיד עדיף לייצור מכני כי קל יותר לחשב נפח ומסה ממשטח פתוח.",
        isCorrect: false,
        explanation:
          "שגוי: מסה, נפח, מרכז כובד ו-FEA דורשים גוף מוצק סגור (או מעטפת בעובי מוגדר). משטח פתוח אינו מגדיר נפח $\\Omega$ ולכן לא מפיק תכונות אינרציה.",
      },
      {
        id: "cad-q08-opt2",
        plainText:
          "Solid ו-Surface זהים מתמטית; ההבדל הוא רק שם הכפתור בממשק המשתמש.",
        isCorrect: false,
        explanation:
          "שגוי: הייצוג הטופולוגי שונה — מוצק דורש סגירות ונטיה עקבית של נורמלים ($\\partial\\Omega$ סגור); משטחים יכולים להיות לא-סגורים ולא-manifold.",
      },
      {
        id: "cad-q08-opt3",
        plainText:
          "Solid מתאים לחלקי מכונות, עיבוד שבבי וניתוחי מסה/הרכבה. Surface מתאים לצורות חופשיות מורכבות (A-Class, יציקות מורכבות, עיצוב תעשייתי). ב-Knit למוצק נדרשת סגירה הרמטית ללא מרווחים; כשל בנורמלים/בסדקים מונע יצירת Solid תעשייתי תקין.",
        isCorrect: true,
        explanation:
          "נכון: בחירת הפרדיגמה נובעת מהגיאומטריה והשימוש במורד הזרם. חלקי פריזמטיים עם Feature Tree קלאסי — Solid. מעטפות אורגניות — Surface/NURBS. מעבר Surface→Solid (Knit, Cap, Thicken) נכשל אם יש Gaps גדולים מערך הסבילות הגיאומטרית או נורמלים הפוכים — ואז לא ניתן לייצר BOM מסה, הדפסה תעשייתית אמינה או אנליזה. Hybrid מאפשר לשלב את השניים בזהירות.",
      },
      {
        id: "cad-q08-opt4",
        plainText:
          "אחרי יצירת Solid אסור לחזור לערוך משטחים; הפרדיגמות מוציאות זו את זו לחלוטין.",
        isCorrect: false,
        explanation:
          "שגוי: מערכות Hybrid מאפשרות עריכת משטחים, חיתוך מוצקים במשטחים, ו-Boolean משולב — זה סטנדרט בתוכנות מתקדמות (CATIA, NX, SolidWorks surfaces).",
      },
    ],
  },
  {
    id: "cad-q09-interference-detection-clearance",
    domain: "זיהוי התנגשויות",
    title: "תכן בעזרת מחשב (CAD) - זיהוי התנגשויות (Interference Detection)",
    context:
      "במכלול CAD מריצים בדיקת Interference/Collision בין רכיבים. התוצאה יכולה להיות חדירה נפחית (Interference), מגע מדויק (Abutting), או מרווח (Clearance) עם ערך מינימלי.",
    formulaLatex:
      "d_{\\min} = \\min_{p\\in A, q\\in B}\\|p-q\\|,\\quad \\text{interference if } V_A \\cap V_B \\neq \\emptyset",
    instruction:
      "מה ההבדל בין Static Interference ל-Dynamic/Motion Clash, ומתי 'התנגשות' מכוונת אינה שגיאה?",
    options: [
      {
        id: "cad-q09-opt1",
        plainText:
          "כל חפיפה נפחית במודל היא תמיד שגיאת תכן חמורה שיש להעלים, כולל הברגות ושיבוצים בלחיצה.",
        isCorrect: false,
        explanation:
          "שגוי: מודלים נומינליים של הברגות, Press-fits ו-Overlaps מכוונים מציגים חפיפה מכוונת ($V_A\\cap V_B\\neq\\emptyset$ בכוונה). יש לסנן לפי זוגות רכיבים או להגדיר Clearance/Interference מתוכנן.",
      },
      {
        id: "cad-q09-opt2",
        plainText:
          "Dynamic Clash בודק רק שני חלקים סטטיים ב-$t=0$; Static בודק את כל מסלול התנועה.",
        isCorrect: false,
        explanation:
          "שגוי: ההגדרות הפוכות — Static בודק תצורת מכלול קבועה; Dynamic/Motion בודק לאורך אנימציה/מסלול קינמטי לאורך הזמן.",
      },
      {
        id: "cad-q09-opt3",
        plainText:
          "Static Interference מזהה חדירת נפחים בתנוחה נוכחית; Dynamic Clash סורק לאורך תנועה ממונעת (מנגנון). חפיפות מכוונות (Thread cosmetic, Press-fit) יש להחריג. Clearance Analysis מודד $d_{\\min}$ ומוודא מרווחי תפעול/הרכבה — קריטי לפני שחרור לייצור.",
        isCorrect: true,
        explanation:
          "נכון: כלי הזיהוי מונעים כשלים יקרים בהרכבה. Static מתאים לבדיקת מבנה 'קפוא'; Dynamic חובה לדלתות, מגירות, רובוטיקה ומנגנונים. יש להגדיר רשימות Include/Exclude, לבדוק גם כבלים/אטמים אם ממודלים, ולתעד Clearance מינימלי $d_{\\min}$ לדרישות תכן (למשל $>0.5\\text{ mm}$ לתנועה חופשית). Interference Detection אינו מחליף GD&T/Stack-up.",
      },
      {
        id: "cad-q09-opt4",
        plainText:
          "Interference Detection מחליף לחלוטין GD&T ו-Stack-up כי אם אין חפיפה במודל הנומינלי הייצור מובטח.",
        isCorrect: false,
        explanation:
          "שגוי: המודל הנומינלי אינו כולל סבילויות ייצור. חלקים ללא חפיפה נומינלית עדיין עלולים להתנגש בקצות סבילות — לכן נדרש גם ניתוח סבילויות ו-WC/RSS.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "cad-q10-drawing-standards-asme-iso",
    domain: "תקני שרטוט",
    title: "תכן בעזרת מחשב (CAD) - תקני שרטוט הנדסי",
    context:
      "שרטוט ייצור חייב לעמוד בתקן מוצהר (למשל ASME Y14.5 ל-GD&T או ISO GPS). התבנית כוללת גליון, בלוק כותרת, סולם, יחידות, וסט ברירת-מחדל לסבילויות כלליות.",
    formulaLatex:
      "\\text{Title Block}:\\; \\text{scale},\\; \\text{units},\\; \\text{standard},\\; \\text{rev}",
    instruction:
      "מה חייב להופיע באופן חד-משמעי בשרטוט ייצור תקני, ומדוע 'המודל שולט' (Model-Based Definition) אינו מבטל את הצורך בכללים אלה?",
    options: [
      {
        id: "cad-q10-opt1",
        plainText:
          "מספיק צילום מסך איזומטרי צבעוני ללא מידות, כי היצרן 'יבין מהמודל'.",
        isCorrect: false,
        explanation:
          "שגוי: ללא מידות, סבילויות, תקן וסטטוס Rev אין חוזה ייצור בר-אכיפה. צילום מסך אינו מסמך הנדסי ואינו עומד ב-ASME Y14.100.",
      },
      {
        id: "cad-q10-opt2",
        plainText:
          "יחידות מידה יכולות להיות מעורבות (מ\"מ ואינצ'ים באותה מידה) ללא הצהרה, כל עוד המספרים 'נראים סבירים'.",
        isCorrect: false,
        explanation:
          "שגוי: ערבוב יחידות הוא מקור קלאסי לכשלים קטסטרופליים. השרטוט חייב להצהיר יחידה ראשית באופן מפורש בבלוק הכותרת.",
      },
      {
        id: "cad-q10-opt3",
        plainText:
          "מספר ה-Revision בתבנית הוא אופציונלי לאחר האישור הראשון, כי הקובץ ב-PDM כבר מנהל גרסאות.",
        isCorrect: false,
        explanation:
          "שגוי: גם עם PDM, מסמך ה-PDF/הדפסה חייב לשאת Rev תואם כדי למנוע ייצור לפי גרסה ישנה בקו. Rev על השרטוט הוא חלק משרשרת האחריות ההנדסית.",
      },
      {
        id: "cad-q10-opt4",
        plainText:
          "חובה: יחידות, סולם, תקן GD&T/GPS מוצהר, סבילויות כלליות או MBD מלא, בלוק כותרת עם Part Number/Rev, ומבטים מספיקים להגדרה חד-משמעית. גם ב-MBD אותם כללי סמנטיקה חלים על ה-PMI התלת-ממדי — המדיום משתנה, לא הדרישה להגדרה חד-משמעית.",
        isCorrect: true,
        explanation:
          "נכון: מטרת השרטוט/MBD היא להעביר Design Authority לייצור ובדיקה. תקנים (ASME Y14.100/Y14.5, ISO GPS) מגדירים פרשנות אחידה למידות, סבילויות וסימנים. היעדר תקן מוצהר יוצר עמימות משפטית וטכנית. MBD מעביר PMI למודל, אך עדיין דורש שלמות סמנטית, Rev control וכללי פילוח מבטים/דאטומים — 'המודל שולט' אינו פטור מכללים.",
      },
    ],
  },
  {
    id: "cad-q11-datums-reference-frame",
    domain: "דאטומים",
    title: "תכן בעזרת מחשב (CAD) - דאטומים ומערכת ייחוס",
    context:
      "מערכת דאטומים $A|B|C$ ב-GD&T בונה Datum Reference Frame (DRF) תלת-ממדית: דאטום ראשי חוסם $3$ DOF, משני חוסם $2$, ושלישוני חוסם $1$ (במקרה הקלאסי של מישור–מישור–מישור).",
    formulaLatex:
      "A:\\,3\\,\\mathrm{DOF},\\; B:\\,2\\,\\mathrm{DOF},\\; C:\\,1\\,\\mathrm{DOF}\\;\\Rightarrow\\; 6\\text{ locked}",
    instruction:
      "מדוע סדר הדאטומים $A|B|C$ קריטי, ומה הקשר לפונקציית ההרכבה של החלק?",
    options: [
      {
        id: "cad-q11-opt1",
        plainText:
          "הסדר $A|B|C$ קוסמטי בלבד; אותם שלושה מישורים תמיד נותנים אותו DRF ללא תלות בסדר.",
        isCorrect: false,
        explanation:
          "שגוי: הסדר קובע איזה משטח 'יושב' ראשון בפיקסצ'ר הבדיקה/ההרכבה וכיצד מתפלגות השגיאות. החלפת סדר משנה את אזורי הסבילות בפועל גם אם אותם שלושה מישורים נבחרים.",
      },
      {
        id: "cad-q11-opt2",
        plainText:
          "דאטום ראשי $A$ חייב תמיד להיות החור הקטן ביותר בחלק, ללא קשר לתפקוד.",
        isCorrect: false,
        explanation:
          "שגוי: בחירת דאטומים נגזרת ממשטחי תפקוד והרכבה (Functional Datums), לא מגודל שרירותי של חור. חור קטן כ-$A$ עלול לייצר DRF לא יציב ולא רלוונטי לתפקוד.",
      },
      {
        id: "cad-q11-opt3",
        plainText:
          "ב-CAD אין קשר בין דאטומים בשרטוט לבין מכלול; הדאטומים הם סימון נייר בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ב-MBD ובמתודולוגיית תכן טובה, הדאטומים משקפים את אופן האחיזה בהרכבה ובבדיקה — ויש ליישר אליהם גם אסטרטגיית עיבוד ומתקני מדידה.",
      },
      {
        id: "cad-q11-opt4",
        plainText:
          "סדר $A|B|C$ מגדיר היררכיית מגע: $A$ מייצב את החלק (למשל משטח ישיבה, $3$ DOF), $B$ מיישר כיוון ($2$ DOF), $C$ נועל את השארית ($1$ DOF). יש לבחור דאטומים לפי פונקציית ההרכבה האמיתית כדי שמדידת GD&T תשקף את הביצועים בשטח ולא רק נוחות שרטוט.",
        isCorrect: true,
        explanation:
          "נכון: DRF הוא המקבילה הגיאומטרית לקיבוע החלק ב-$6$ DOF ($3+2+1$). אם הדאטום הראשי אינו משטח ההרכבה האמיתי, חלק 'עובר' בדיקה אך נכשל בתפקוד (או להפך). לכן תכן GD&T מתחיל מניתוח פונקציונלי: איפה החלק יושב, במה הוא מיושר, ומה נועל סיבוב אחרון — ואז מתרגמים ל-$A|B|C$ ולסבילויות הנגזרות.",
      },
    ],
  },
  {
    id: "cad-q12-mates-advanced-limit-path",
    domain: "Mates מתקדמים",
    title: "תכן בעזרת מחשב (CAD) - Mates מתקדמים במכלול",
    context:
      "במכלולים מתקדמים קיימים Limit Mates (טווח תנועה), Path/Cam Mates, Width Mates ו-Mechanical Mates (גלגלת/בורג). הם מאפשרים סימולציית מנגנון מעבר לקיבוע סטטי.",
    formulaLatex:
      "\\theta_{\\min} \\le \\theta \\le \\theta_{\\max},\\quad s \\in [s_{\\min}, s_{\\max}]",
    instruction:
      "מהו Limit Mate וכיצד הוא שונה מ-Lock/Fixed Mate בבדיקת תחום תנועה של מנגנון?",
    options: [
      {
        id: "cad-q12-opt1",
        plainText:
          "Limit Mate נועל את הרכיב לחלוטין כמו Fixed; אין הבדל פונקציונלי.",
        isCorrect: false,
        explanation:
          "שגוי: Fixed מסיר את כל ה-$6$ DOF. Limit מגדיר טווח מותר לתנועה שנותרה — הרכיב עדיין זז בתוך $[q_{\\min}, q_{\\max}]$.",
      },
      {
        id: "cad-q12-opt2",
        plainText:
          "Limit Mate משמש רק לתיעוד טקסטואלי ב-BOM ואינו משפיע על הקינמטיקה במודל.",
        isCorrect: false,
        explanation:
          "שגוי: Limit Mate הוא אילוץ פעיל במנוע המכלול; הוא מונע גרירה מעבר לזווית/מרחק המוגדרים ומשפיע ישירות על Motion Study ועל בדיקות Clash.",
      },
      {
        id: "cad-q12-opt3",
        plainText:
          "Path Mate ו-Limit Mate אסורים בתכן מכני כי הם 'לא פיזיקליים'; מותרים רק Mate של Coincident.",
        isCorrect: false,
        explanation:
          "שגוי: הם כלים לגיטימיים לייצוג מסילות, מצלמות ומגבילי תנועה. הפיזיקליות והמאמצים נבדקים לאחר מכן ב-Dynamic/FEA לפי הצורך — לא נאסרים ברמת ה-Mate.",
      },
      {
        id: "cad-q12-opt4",
        plainText:
          "Limit Mate מגביל דרגת חופש שנותרה לטווח $[q_{\\min}, q_{\\max}]$ (זווית או מרחק) ומאפשר תנועה חוקית בתוך הטווח — בניגוד ל-Fixed שנועל לחלוטין. זה מאפשר לבדוק התנגשויות דינמיות, טווחי פתיחה, ומגבילי תכן לפני אבטיפוס. יש לוודא שהמנגנון לא Over-constrained ע״י שילוב Limit עם Mates סטטיים עודפים.",
        mathText: "q \\in [q_{\\min}, q_{\\max}]\\;\\text{(Limit Mate)}",
        isCorrect: true,
        explanation:
          "נכון: לאחר ש-Concentric/Coincident משאירים DOF רצוי (למשל סיבוב ציר), Limit Angle/Distance מגדיר את שבץ התנועה הפיזיקלי (למשל דלת $0^\\circ\\le\\theta\\le 90^\\circ$). ב-Motion Study ניתן לסרוק את הטווח ולאתר Clash. Over-constraint נוצר כשמוסיפים Mate סטטי שסותר את חופש התנועה — ואז המכלול 'אדום' או קופא. ניהול נכון: קיבוע חלקי מבנה, חופש מבוקר למנגנון, Limit לגבולות, ואז Interference לאורך המסלול.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_CAD_QUESTIONS = CAD_MECHANICAL_DESIGN_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleCadMechanicalDesignOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = CAD_MECHANICAL_DESIGN_QUESTIONS.slice(0, 3);
  const groupB = CAD_MECHANICAL_DESIGN_QUESTIONS.slice(3, 6);
  const groupC = CAD_MECHANICAL_DESIGN_QUESTIONS.slice(6, 12);

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
