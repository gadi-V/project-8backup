import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Systems analysis, design & information-systems architecture bank (12Q).
 * Display name: "ניתוח, תכן וארכיטקטורת מערכות מידע" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS: AcademicDiagnosticQuestion[] =
  [
    // =========================================================================
    // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
    // =========================================================================
    {
      id: "archsys-q01-ddd-bounded-context-aggregates",
      domain: "DDD, Bounded Context ו-Aggregate",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - עיצוב מונחה-דומיין והקשרים תחומיים",
      context:
        "במתודולוגיית Domain-Driven Design (Eric Evans), מנתחים מערכת ארגונית מורכבת ומחלקים אותה למספר Bounded Contexts עצמאיים עם שפה אחידה (Ubiquitous Language).",
      formulaLatex:
        "\\text{Context Map: } \\text{Upstream (U)} \\to \\text{Downstream (D)}, \\quad \\text{Anti-Corruption Layer (ACL)}",
      instruction:
        "מהו ההבדל המבני בין ישות (Entity) לאובייקט ערך (Value Object) ב-DDD, וכיצד מוגדר Aggregate Root?",
      options: [
        {
          id: "archsys-q01-opt1",
          plainText:
            "ישות (Entity) מוגדרת ע״י זהות ייחודית ורציפה לאורך זמן (Identity) ללא תלות בערכי שדותיה, בעוד שאובייקט ערך (Value Object) הוא בלתי-משתנה (Immutable) ומוגדר אך ורק ע״י ערכי תכונותיו (שוויון שדות); ו-Aggregate Root הוא ישות השער המרכזית האחראית בלעדית על אכיפת כל אינווריאנטי העקביות של צבר האובייקטים ומהווה את נקודת הגישה החיצונית הבלעדית אליהם.",
          isCorrect: true,
          explanation:
            "נכון: 1. Entity: אובייקט בעל מזהה ייחודי (כגון מספר תעודת זהות של לקוח או מספר הזמנה). גם אם כל תכונותיו השתנו (שם, כתובת, סטטוס), הוא נותר אותו אובייקט עצמו לאורך כל מחזור חייו. 2. Value Object: אובייקט חסר זהות המוגדר ע״י ערכו בלבד (כגון סכום כסף עם מטבע $\\mathrm{Money}(50, \\mathrm{USD})$ או כתובת למשלוח). אם שני Value Objects בעלי אותם שדות, הם שווים לחלוטין וניתנים להחלפה (והם תמיד Immutable). 3. Aggregate Root: אשכול של ישויות ו-Value Objects הקשורים זה לזה בגבול עקביות הדוק (Transactional Boundary). אף גורם מחוץ ל-Aggregate אינו מורשה להחזיק הפניה ישירה לישויות הפנימיות, וכל שינוי חייב לעבור דרך ה-Root בלבד, שמבטיח שכל חוקי העסק (Invariants) נאכפים באופן אטומי לפני כל שמירה.",
        },
        {
          id: "archsys-q01-opt2",
          plainText:
            "Entity הוא תמיד מבנה נתונים מסוג XML, ו-Value Object הוא קובץ בינארי בלבד.",
          isCorrect: false,
          explanation:
            "שגוי: אלו מושגים לוגיים תאורטיים של מודל הדומיין בתוכנה מונחית-עצמים ואינם פורמטים של קבצים.",
        },
        {
          id: "archsys-q01-opt3",
          plainText:
            "כל אובייקט במערכת חייב להיות מוגדר כ-Aggregate Root בפני עצמו כדי לאפשר מקבול מלא.",
          isCorrect: false,
          explanation:
            "שגוי: פיצול יתר שובר עקביות עסקית; Aggregate מאגד מספר אובייקטים תחת שער יחיד כדי לאכוף אילוצים משותפים.",
        },
        {
          id: "archsys-q01-opt4",
          plainText:
            "Value Object מורשה לשנות את שדותיו באופן א-סינכרוני דרך שרת Redis מרכזי.",
          isCorrect: false,
          explanation:
            "שגוי: עקרון יסוד של Value Object ב-DDD הוא היותו בלתי-משתנה (Immutable) לחלוטין מרגע יצירתו.",
        },
      ],
    },
    {
      id: "archsys-q02-cqrs-event-sourcing-eventual-consistency",
      domain: "CQRS ו-Event Sourcing",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - ארכיטקטורת CQRS ו-Event Sourcing",
      context:
        "במערכות עתירות עומס ומורכבות עסקית, משלבים את תבנית CQRS (Command Query Responsibility Segregation) יחד עם Event Sourcing (ES).",
      formulaLatex:
        "\\mathrm{State}(t) = \\sum_{i=1}^{t} \\mathrm{Event}_i = \\mathrm{Fold}(\\mathrm{Events}, S_0)",
      instruction:
        "מה מאפיין את שמירת הנתונים ב-Event Sourcing, וכיצד CQRS מפרידה בין מודל הכתיבה למודל הקריאה?",
      options: [
        {
          id: "archsys-q02-opt1",
          plainText:
            "במקום לשמור את המצב הנוכחי בלבד (Current State), המערכת שומרת ב-Event Store בלתי-משתנה (Append-Only) את כל רצף האירועים העסקיים שהתרחשו בהיסטוריה; ו-CQRS מפרידה לחלוטין בין מודל הפקודות (Commands המשנות מצב ומייצרות אירועים) לבין מודל השאילתות (Queries המקבלות אירועים ומעדכנות תצוגות קריאה דה-מנורמלות אופטימליות בעקביות בסופו של דבר).",
          isCorrect: true,
          explanation:
            "נכון: 1. Event Sourcing: במקום לבצע $\\mathrm{UPDATE}$ על שורה בטבלה ולדרוס את העבר (כמו ב-CRUD מסורתי), המערכת שומרת זרם בלתי-משתנה של אירועי עבר בעלי משמעות עסקית ($\\mathrm{OrderCreated}$, $\\mathrm{ItemAdded}$, $\\mathrm{PaymentReceived}$). המצב הנוכחי מתקבל תמיד ע״י שחזור וסכימת כל האירועים מתחילת הזמן (Replaying/Folding), מה שמספק יומן ביקורת (Audit Log) מובנה מושלם, יכולת חזרה בזמן (Time-Travel Debugging), וביטול נעילות כתיבה. 2. CQRS: מאחר שקריאת אירועים רבים וחישוב המצב בזמן-אמת איטיים ביותר, תבנית CQRS מפרידה את הארכיטקטורה: צד הכתיבה (Write/Command Model) מאמת חוקים עסקיים וכותב ל-Event Store ב-$O(1)$. ברקע, רכיבי Projections מאזינים לאירועים ומעדכנים מודל קריאה (Read/Query Model) דה-מנורמל במיוחד לשליפה מהירה (למשל במסד מסמכים או קריאה טבלאית שטוחה), לרוב בעקביות בסופו של דבר.",
        },
        {
          id: "archsys-q02-opt2",
          plainText:
            "CQRS דורשת שכל שאילתת קריאה תבצע נעילת כתיבה בלעדית על כל בסיסי הנתונים בארגון.",
          isCorrect: false,
          explanation:
            "שגוי: כל מטרתה של CQRS היא הפרדה מלאה ללא נעילות בין קוראים לכותבים.",
        },
        {
          id: "archsys-q02-opt3",
          plainText:
            "ב-Event Sourcing מוחקים את כל האירועים הישנים מדי לילה כדי לחסוך שטח דיסק.",
          isCorrect: false,
          explanation:
            "שגוי: אירועים ב-Event Sourcing הם האמת הבלעדית של המערכת (Single Source of Truth) ואסור למחוק אותם לעולם (חוסכים מקום באמצעות Snapshots בלבד).",
        },
        {
          id: "archsys-q02-opt4",
          plainText: "התבנית תקפה אך ורק במערכות שאינן מחוברות לרשת האינטרנט.",
          isCorrect: false,
          explanation:
            "שגוי: CQRS ו-Event Sourcing מהוות את עמוד התווך של מערכות ענן מודרניות מבוזרות בקנה מידה עצום.",
        },
      ],
    },
    {
      id: "archsys-q03-conways-law-microservices-alignment",
      domain: "חוק קונוויי והתאמת צוותים לארכיטקטורה",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - חוק קונוויי ומבנה ארגוני מול ארכיטקטורה",
      context:
        'מלווין קונוויי ניסח ב-1967 חוק סוציו-טכנולוגי יסודי לגבי הקשר בין הארגון לבין המערכות שהוא מייצר: "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations".',
      formulaLatex:
        "\\text{Architecture} \\approx \\text{Org communication graph}",
      instruction:
        "מהי המשמעות המעשית של חוק קונוויי במעבר מארכיטקטורת מונולית לארכיטקטורת מיקרו-שירותים (Microservices), ומהו תמרון קונוויי ההפוך (Inverse Conway Maneuver)?",
      options: [
        {
          id: "archsys-q03-opt1",
          plainText:
            "מבנה המערכת משקף בהכרח את מבנה התקשורת הארגוני (צוותי מונולית בשכבות יפיקו מונולית בשכבות); תמרון קונוויי ההפוך קובע כי כדי להשיג ארכיטקטורת מיקרו-שירותים מבוזרת ומודולרית, יש לארגן מראש את צוותי הפיתוח כצוותים רב-תחומיים עצמאיים קטנים (Cross-functional, Two-Pizza Teams) המיושרים סביב תחומי אחריות עסקיים מוגדרים (Bounded Contexts).",
          isCorrect: true,
          explanation:
            "נכון: חוק קונוויי קובע שארכיטקטורת תוכנה תמיד תחקה את מבנה התקשורת האנושית בארגון. אם מחלקים את החברה לצוות DBA נפרד, צוות Backend נפרד וצוות UI נפרד, המערכת תתפתח בהכרח כמונולית תלת-שכבתי מצומד. תמרון קונוויי ההפוך (Inverse Conway Maneuver) רותם חוק זה: כדי לייצר ארכיטקטורת מיקרו-שירותים בעלת צימוד רופף (Loosely Coupled), הארגון מגדיר מראש צוותים קטנים ואוטונומיים מקצה-לקצה (Cross-functional: כוללים מפתחים, אנשי דאטה ו-DevOps יחד), כאשר כל צוות אחראי באופן בלעדי על שירות או תחום עסקי בודד (Bounded Context). מבנה הצוותים מכתיב ומייצב את ארכיטקטורת השירותים הרצויה.",
        },
        {
          id: "archsys-q03-opt2",
          plainText:
            "חוק קונוויי קובע שכל שירות חייב להיכתב באותה שפת תכנות שבה נכתבה מערכת ההפעלה.",
          isCorrect: false,
          explanation:
            "שגוי: אין קשר לשפת תכנות; החוק עוסק במבנה צוותים ותקשורת בין-אישית מול צימוד מודולים.",
        },
        {
          id: "archsys-q03-opt3",
          plainText:
            "חוק קונוויי מוכיח שארכיטקטורת מונולית תמיד עדיפה על פני מיקרו-שירותים לכל גודל ארגון.",
          isCorrect: false,
          explanation:
            "שגוי: החוק מתאר שיקוף ארגוני ואינו פוסק עדיפות מוחלטת של ארכיטקטורה זו או אחרת.",
        },
        {
          id: "archsys-q03-opt4",
          plainText:
            "תמרון קונוויי ההפוך מבטל לחלוטין את הצורך במנהלי מוצר ומעביר את ההחלטות ל-AI.",
          isCorrect: false,
          explanation: "שגוי: התמרון עוסק בארגון צוותי הנדסה סביב ערך עסקי.",
        },
      ],
    },

    // =========================================================================
    // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
    // =========================================================================
    {
      id: "archsys-q04-clean-architecture-dependency-inversion",
      domain: "ארכיטקטורה נקייה וכלל התלות",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - ארכיטקטורה נקייה וכלל התלות",
      context:
        "בארכיטקטורה נקייה (Clean Architecture של Robert C. Martin) ובארכיטקטורת משושים (Hexagonal / Ports & Adapters של Alistair Cockburn), המערכת מאורגנת במעגלים קונצנטריים: ישויות דומיין במרכז, Use Cases במעגל הבא, מתאמים (Adapters/Controllers) במעגל החיצוני, ומסדי נתונים/UI במעטפת החיצונית ביותר.",
      formulaLatex:
        "\\text{The Dependency Rule: Dependencies point inward towards Domain Entities}",
      instruction:
        "מה קובע ״כלל התלות״ (The Dependency Rule), וכיצד מיושם עקרון היפוך התלויות (DIP) כדי למנוע תלות של הלוגיקה העסקית במסד הנתונים?",
      options: [
        {
          id: "archsys-q04-opt1",
          plainText:
            "תלויות קוד חייבות להצביע תמיד כלפי חוץ, כך שהדומיין תלוי ישירות בטבלאות ה-SQL של בסיס הנתונים.",
          isCorrect: false,
          explanation:
            "שגוי: זהו בדיוק התכנון הקלוקל המסורתי שארכיטקטורה נקייה נועדה לבער; תלויות חייבות להצביע פנימה ולא החוצה.",
        },
        {
          id: "archsys-q04-opt2",
          plainText:
            "כל התלויות בקוד המקור חייבות להצביע אך ורק פנימה, לעבר המעגלים הפנימיים בעלי רמת ההפשטה הגבוהה ביותר (הדומיין לעולם אינו מכיר את ה-UI או ה-DB); שכבת ה-Use Case מגדירה ממשק (Port / Interface) לשמירת נתונים, ושכבת התשתית החיצונית (Adapter) מממשת ממשק זה, כך שכיוון זרימת השליטה הפוך לכיוון תלות קוד המקור.",
          isCorrect: true,
          explanation:
            "נכון: 1. The Dependency Rule: שום שם, פונקציה, ספריה או פרט מימוש של מעגל חיצוני אינו מורשה להופיע בתוך מעגל פנימי. ישויות הדומיין וחוקי ה-Use Cases אינם מודעים לקיומם של PostgreSQL, React, AWS או HTTP. 2. Dependency Inversion Principle (DIP): במבנה נאיבי, Use Case צריך לקרוא ל-Database כדי לשמור נתון, מה שהיה מייצר תלות ישירה במסד הנתונים. כדי למנוע זאת, ה-Use Case מגדיר במעגל שלו ממשק מופשט (Port). שכבת ה-DB החיצונית מיישמת ממשק זה במחלקה קונקרטית (Adapter). כתוצאה מכך, זרימת הבקרה בזמן ריצה היא מה-Use Case למסד הנתונים, אך תלות קוד המקור (Source Code Dependency) מצביעה פנימה מה-DB אל ה-Use Case, ומאפשרת להחליף מסד נתונים, UI או ספק ענן מבלי לגעת בשורת קוד אחת של הליבה העסקית.",
        },
        {
          id: "archsys-q04-opt3",
          plainText:
            "כלל התלות מחייב שכל המודולים יתקשרו אך ורק דרך קבצי טקסט משותפים בדיסק.",
          isCorrect: false,
          explanation:
            "שגוי: התקשורת מתבצעת באמצעות קריאות פולימורפיות לממשקים בשפת התכנות.",
        },
        {
          id: "archsys-q04-opt4",
          plainText:
            "הארכיטקטורה דורשת שכל מחלקת דומיין תירש ממחלקת ה-Controller הראשית.",
          isCorrect: false,
          explanation:
            "שגוי: Controller נמצא בשכבה חיצונית ומכיר את ה-Use Cases, בעוד שהדומיין אינו מכיר Controllers כלל.",
        },
      ],
    },
    {
      id: "archsys-q05-circuit-breaker-pattern-resilience",
      domain: "עמידות ותבנית מפסק הזרם",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - עמידות ותבנית מפסק הזרם",
      context:
        "במערכת מבוזרת, שירות $A$ פונה סינכרונית ברשת לשירות חיצוני $B$. שירות $B$ חווה האטה כבדה, זמני התגובה שלו מזנקים, ורוב הבקשות נתקעות ומגיעות ל-Timeout.",
      formulaLatex:
        "\\text{States: } \\text{Closed} \\xrightarrow{\\text{Failures } > \\text{ Threshold}} \\text{Open} \\xrightarrow{\\text{Sleep Window}} \\text{Half-Open}",
      instruction:
        "כיצד תבנית מפסק הזרם (Circuit Breaker של Michael Nygard) מונעת קריסה בשרשרת (Cascading Failure) של שירות $A$, ומהם שלושת מצבי מכונת המצבים שלה?",
      options: [
        {
          id: "archsys-q05-opt1",
          plainText:
            "היא מכפילה את כמות הבקשות לשירות $B$ כדי לאלץ אותו להגיב מהר יותר.",
          isCorrect: false,
          explanation:
            "שגוי: הפצצת שירות קורס בעוד בקשות (Retry Storm) תגרום להפלתו הסופית ולחנק הרשת.",
        },
        {
          id: "archsys-q05-opt2",
          plainText:
            "במצב Closed המפסק מעביר בקשות כרגיל וסופר שגיאות; כאשר שיעור הכשלים חוצה סף, הוא עובר למצב Open שבו הוא מכשיל בקשות מיידית (Fail-Fast) ללא פנייה לרשת ומחזיר Fallback, ובכך מגן על חוטי שירות $A$; לאחר זמן המתנה קצוב הוא עובר ל-Half-Open, מאפשר למספר בקשות בודדות לעבור, ואם הן מצליחות חוזר ל-Closed (או ל-Open אם נכשלו).",
          isCorrect: true,
          explanation:
            "נכון: 1. סכנת ה-Cascading Failure: ללא מפסק, חוטים (Threads) וחיבורי TCP בשירות $A$ נתקעים בהמתנה לבקשות ששוהות עד ל-Timeout של שניות ארוכות. תוך זמן קצר כל מאגר החוטים של שירות $A$ אוזל (Thread Pool Exhaustion), ושירות $A$ מפסיק להגיב ללקוחותיו שלו וקורס גם כן. 2. מנגנון Circuit Breaker: במצב Closed, הכל תקין. אם שיעור הכישלונות חוצה סף (למשל $50\\%$ שגיאות בחלון זמן), המפסק קופץ למצב Open. במצב Open, המפסק אינו מבצע שום קריאת רשת ומחזיר שגיאה או פתרון ברירת מחדל חלופי (Fallback) באופן מיידי ב-$0\\,\\mathrm{ms}$ (Fail Fast), מה שמשחרר מיד את משאבי שירות $A$ ומאפשר לשירות $B$ זמן להתאושש. לאחר חלון צינון, המפסק עובר ל-Half-Open: מעביר מדגם קטן של תעבורה. אם השירות התאושש, המפסק נסגר חזרה ל-Closed; אם לא, הוא חוזר מיד ל-Open.",
        },
        {
          id: "archsys-q05-opt3",
          plainText:
            "המפסק מנתק את אספקת החשמל הפיזית לשרת של שירות $B$ באמצעות מתג חומרה.",
          isCorrect: false,
          explanation:
            "שגוי: זהו דפוס תוכנתי לוגי טהור לניהול קריאות רשת מרוחקות, ואינו מפסק חשמל פיזי.",
        },
        {
          id: "archsys-q05-opt4",
          plainText:
            "המפסק מבטל את הצורך ב-Timeouts ומאפשר המתנה אינסופית לכל חבילה.",
          isCorrect: false,
          explanation: "שגוי: המתנה אינסופית היא בדיוק הסיבה לקריסת המערכת.",
        },
      ],
    },
    {
      id: "archsys-q06-api-gateway-vs-service-mesh-sidecar",
      domain: "API Gateway מול Service Mesh",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - API Gateway מול Service Mesh",
      context:
        "במערכת מבוזרת מרובת שירותים, משלבים בין שער כניסה (API Gateway) לבין רשת שירותים (Service Mesh מבוססת Sidecar Proxy כגון Istio/Envoy).",
      formulaLatex:
        "\\text{North--South: Gateway}, \\quad \\text{East--West: Service Mesh}",
      instruction:
        "מהו ההבדל המרכזי בין תחומי האחריות של API Gateway (תקשורת צפון-דרום) לבין Service Mesh (תקשורת מזרח-מערב)?",
      options: [
        {
          id: "archsys-q06-opt1",
          plainText:
            "API Gateway מטפל אך ורק בהצפנת דיסקים, ו-Service Mesh מטפל בשאילתות SQL.",
          isCorrect: false,
          explanation:
            "שגוי: שני הרכיבים עוסקים בניתוב, ניטור ואבטחת תעבורת רשת בין שירותים.",
        },
        {
          id: "archsys-q06-opt2",
          plainText:
            "ה-API Gateway מנהל תעבורת צפון-דרום (North-South: מלקוחות חיצוניים לעבר אשכול השירותים) וכולל אימות משתמשים (AuthN/AuthZ), ניתוב כתובות API, המרת פרוטוקולים והגבלת קצב (Rate Limiting); בעוד ש-Service Mesh מנהלת תעבורת מזרח-מערב (East-West: תקשורת פנימית בין שירותים בתוך האשכול) ומספקת באופן שקוף mTLS הדדי, גילוי שירותים (Service Discovery), ניטור טלמטריה וניתוב מתקדם (Canary/Tracing) ללא שינוי קוד האפליקציה.",
          isCorrect: true,
          explanation:
            "נכון: זוהי החלוקה הסטנדרטית בתעשייה: 1. North-South Traffic (תנועת כניסה מהעולם החיצון): מנוהלת ע״י API Gateway. השער מיועד ללקוחות קצה חיצוניים (Web/Mobile) שאינם מכירים את המבנה הפנימי. הוא עוסק בהמרת פורמטים (REST ל-gRPC), אימות טוקנים (OAuth2/JWT), צמצום קריאות (BFF — Backend for Frontend), וגביית API. 2. East-West Traffic (תנועה פנימית באשכול): מנוהלת ע״י Service Mesh. כאשר מיקרו-שירות פונה לעשרות שירותים פנימיים, פרוקסי ייעודי המוצמד לכל שירות (Sidecar Pattern) מיירט את התעבורה ברמת הרשת, ומספק אוטומטית הצפנת mTLS הדדית, שבירת מעגלים, איסוף מדדי ביצועים ו-Distributed Tracing ללא צורך בספריות קוד ייעודיות באפליקציה.",
        },
        {
          id: "archsys-q06-opt3",
          plainText:
            "Service Mesh מייתרת לחלוטין את ה-API Gateway ומבטלת את הצורך בחומת אש חיצונית.",
          isCorrect: false,
          explanation:
            "שגוי: השניים משלימים זה את זה; Service Mesh אינה מטפלת ברישום משתמשים חיצוניים ופונקציונליות לקוח-שרת של Gateway.",
        },
        {
          id: "archsys-q06-opt4",
          plainText: "API Gateway הוא רכיב חומרה בלבד שלא ניתן להרצה בתוכנה.",
          isCorrect: false,
          explanation:
            "שגוי: כמעט כל ה-API Gateways המודרניים הם יישומי תוכנה מבוססי NGINX, Envoy או Node.js.",
        },
      ],
    },

    // =========================================================================
    // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
    // =========================================================================
    {
      id: "archsys-q07-api-design-rest-vs-graphql-grpc",
      domain: "REST מול GraphQL מול gRPC",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - תכנון ממשקים: REST, GraphQL ו-gRPC",
      context:
        "משווים בין שלושה פרוטוקולי תקשורת מרכזיים ליישום ממשקי API: RESTful HTTP/JSON, GraphQL, ו-gRPC מבוסס HTTP/2 ו-Protocol Buffers.",
      formulaLatex:
        "\\mathrm{size}(\\mathrm{Protobuf}) \\ll \\mathrm{size}(\\mathrm{JSON}), \\quad \\text{multiplex over HTTP/2}",
      instruction:
        "באילו תרחישים הנדסיים מציג פרוטוקול gRPC עליונות ביצועית מובהקת על פני REST ו-GraphQL?",
      options: [
        {
          id: "archsys-q07-opt1",
          plainText: "gRPC עדיף כאשר הלקוח הוא דפדפן ישן הדורש קבצי XML בלבד.",
          isCorrect: false,
          explanation:
            "שגוי: gRPC מבוסס על סריאליזציה בינארית של Protobuf ודורש תמיכה מתקדמת ב-HTTP/2 Frames.",
        },
        {
          id: "archsys-q07-opt2",
          plainText:
            "gRPC מיועד אך ורק להורדת קבצי וידאו פסיביים ללא תקשורת דו-כיוונית.",
          isCorrect: false,
          explanation:
            "שגוי: gRPC מצטיין במיוחד ב-Bi-directional Streaming אינטראקטיבי בזמן-אמת.",
        },
        {
          id: "archsys-q07-opt3",
          plainText:
            "gRPC עדיף באופן מובהק בתקשורת פנימית מהירה בין מיקרו-שירותים (East-West ב-Backend), תודות לשימוש בסריאליזציה בינארית קומפקטית במיוחד (Protobuf החוסכת מעל $70\\%$ גודל מ-JSON), שימוש בתשתית HTTP/2 מרובת-ערוצים (Multiplexing על גבי חיבור TCP יחיד), ותמיכה מובנית בחוזים מוגדרים קשיח בקוד (Strict Schema Contracts) והזרמת נתונים דו-כיוונית (Bi-directional Streaming).",
          isCorrect: true,
          explanation:
            "נכון: השוואה ארכיטקטונית: 1. REST על גבי JSON הוא טקסטואלי, מסורבל ודורש המרות Parse/Stringify כבדות במעבד, וסובל מ-Over-fetching / Under-fetching. 2. GraphQL פותר בעיות אלו בצד הלקוח ע״י מתן אפשרות לבקש בדיוק את השדות הנדרשים בשאילתה יחידה, אך הוא עדיין מבוסס על מחרוזות JSON ודורש ניתוח שאילתות מורכב בצד השרת. 3. gRPC: משתמש ב-Protocol Buffers (קידוד בינארי הדוק ומהיר בסדרי גודל מפענוח טקסט), מייצר אוטומטית ממשקי קוד Type-Safe בעשרות שפות (Stubs), ופועל ישירות מעל HTTP/2. ה-Multiplexing של HTTP/2 מאפשר העברת מאות קריאות RPC במקביל על גבי סוקט TCP בודד ללא חסימת ראש-התור (Head-of-Line Blocking ברמת HTTP), מה שהופך אותו לסטנדרט המוביל לתקשורת פנימית מהירה במערכות מבוזרות.",
        },
        {
          id: "archsys-q07-opt4",
          plainText:
            "REST עדיף על gRPC בביצועים משום ש-JSON מהיר יותר לפענוח מאשר נתונים בינאריים.",
          isCorrect: false,
          explanation:
            "שגוי: נתונים בינאריים (Protobuf) מהירים פי $5$ עד $10$ לפענוח במעבד מאשר מחרוזות JSON טקסטואליות.",
        },
      ],
    },
    {
      id: "archsys-q08-atam-software-architecture-tradeoffs",
      domain: "הערכת ארכיטקטורה ו-ATAM",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - הערכת ארכיטקטורה ומתודולוגיית ATAM",
      context:
        "בשיטת ניתוח פשרות ארכיטקטוניות (Architecture Tradeoff Analysis Method, ATAM), מעריכים את איכות הארכיטקטורה ביחס לתכונות איכות (Quality Attributes כגון ביצועים, זמינות, אבטחה, יכולת שינוי).",
      formulaLatex:
        "\\text{Utility Tree} \\to \\text{Quality Attribute Scenarios (Stimulus, Response, Metric)}",
      instruction:
        "מהם ״נקודת רגישות״ (Sensitivity Point) ו״נקודת פשרה״ (Tradeoff Point) בניתוח ארכיטקטוני לפי ATAM?",
      options: [
        {
          id: "archsys-q08-opt1",
          plainText:
            "נקודת רגישות היא שגיאת תחביר בקוד, ונקודת פשרה היא הנחה כספית ברכישת שרתים.",
          isCorrect: false,
          explanation:
            "שגוי: ATAM עוסק בהחלטות תכן ארכיטקטוניות ברמה הגבוהה ולא בשגיאות קוד או ברכש מסחרי.",
        },
        {
          id: "archsys-q08-opt2",
          plainText: "נקודת פשרה היא החלטה שאינה משפיעה על אף תכונת איכות במערכת.",
          isCorrect: false,
          explanation:
            "שגוי: זוהי החלטה חסרת משמעות; נקודת פשרה משפיעה על מספר תכונות איכות בכיוונים מנוגדים.",
        },
        {
          id: "archsys-q08-opt3",
          plainText:
            "נקודת רגישות היא החלטת תכן ארכיטקטונית המשפיעה באופן קריטי על תכונת איכות ספציפית אחת (למשל: שימוש בהצפנת AES-256 משפיע ישירות על רמת הסודיות); ונקודת פשרה היא החלטת תכן המשפיעה בו-זמנית על מספר תכונות איכות בכיוונים סותרים (למשל: אותה הצפנה משפרת אבטחה אך פוגעת בזמן התגובה ובביצועים).",
          isCorrect: true,
          explanation:
            "נכון: הגדרות מפתח במתודולוגיית ATAM: 1. Sensitivity Point: תכונה ארכיטקטונית ששינוי קל בה מחולל שינוי משמעותי במדד איכות יחיד. לדוגמה: גודל חוצץ עיבוד המשפיע ישירות על השהיית השמע. 2. Tradeoff Point: החלטה ארכיטקטונית המהווה נקודת רגישות ליותר מתכונת איכות אחת, כאשר השיפור באחת בא בהכרח על חשבון פגיעה באחרת. לדוגמה: הוספת שכבת גיבוב (Caching) משפרת מהירות וזמן תגובה (Performance), אך פוגעת בעקביות המידע (Data Consistency) ומעלה מורכבות פיתוח. זיהוי נקודות פשרה הוא המטרה העליונה של ניתוח ארכיטקטורה, המאפשר למקבלי ההחלטות לבחור פשרה מודעת ומנומקת.",
        },
        {
          id: "archsys-q08-opt4",
          plainText:
            "המתודולוגיה מיועדת רק להערכת חומרת מחשבים אישיים ואינה ישימה לפרויקטי תוכנה.",
          isCorrect: false,
          explanation:
            "שגוי: ATAM היא מתודולוגיה מובילה להערכת ארכיטקטורות תוכנה ארגוניות מורכבות.",
        },
      ],
    },
    {
      id: "archsys-q09-event-driven-idempotent-consumer",
      domain: "ארכיטקטורה מונחית-אירועים וצרכן אידמפוטנטי",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - ארכיטקטורה מונחית-אירועים וצרכן אידמפוטנטי",
      context:
        "במערכת מבוזרת המשתמשת בתווך הודעות (Message Broker כגון Apache Kafka או RabbitMQ), ערבות המסירה המעשית היא מסירה לפחות פעם אחת (At-Least-Once Delivery), עקב שליחה חוזרת של הודעות במקרה של איבוד אישורי הגעה (ACKs).",
      formulaLatex:
        "f(f(x)) = f(x), \\quad \\text{Delivery: At-Least-Once} \\implies \\text{Duplicates}",
      instruction:
        "כיצד תבנית הצרכן האידמפוטנטי (Idempotent Consumer Pattern) מונעת עיבוד כפול שגוי (למשל חיוב כרטיס אשראי פעמיים על אותה הזמנה)?",
      options: [
        {
          id: "archsys-q09-opt1",
          plainText:
            "היא מוחקת את כל ההודעות מתווך ההודעות מיד עם הגעתן ללא קריאה.",
          isCorrect: false,
          explanation:
            "שגוי: מחיקה מוקדמת תגרום לאובדן נתונים מלא במקרה של קריסת הצרכן במהלך העיבוד.",
        },
        {
          id: "archsys-q09-opt2",
          plainText: "היא מכריחה את תווך ההודעות להשתמש בפרוטוקול UDP בלבד.",
          isCorrect: false,
          explanation:
            "שגוי: תווכי הודעות נשענים על TCP להבטחת אמינות; UDP מאבד חבילות ואינו פותר כפילויות.",
        },
        {
          id: "archsys-q09-opt3",
          plainText:
            "כל הודעה נושאת מזהה ייחודי חד-חד-ערכי (Unique Message/Correlation ID); הצרכן בודק באופן אטומי (למשל באמצעות טבלת מזהים שעובדו במסד נתונים עם אילוץ מפתח ראשי $\\mathrm{INSERT}\\ldots\\mathrm{ON\\ CONFLICT\\ DO\\ NOTHING}$) האם המזהה כבר עובד בעבר; אם המזהה קיים, הצרכן מתעלם מגוף ההודעה ומאשר אותה מיד, ובכך מבטיח שפעולה חוזרת לא תשנה את המצב העסקי.",
          isCorrect: true,
          explanation:
            "נכון: 1. כשל הרשת המבוזרת: ברשתות תקשורת, לא ניתן להבדיל בוודאות בין מצב שבו צרכן קרס לפני ביצוע הפעולה לבין מצב שבו הוא ביצע אותה אך ה-ACK שלו אבד ברשת. לכן, מערכות מסרים אמינות משדרות את ההודעה שוב, ומבטיחות At-Least-Once Delivery (לפחות פעם אחת, כלומר ייתכנו שכפולים). 2. תבנית Idempotent Consumer: פעולה היא אידמפוטנטית אם הפעלתה מספר פעמים מניבה בדיוק את אותה תוצאה כמו הפעלה יחידה: $f(f(x)) = f(x)$. המשדר מצמיד לכל אירוע מזהה גלובלי ייחודי (UUID). הצרכן מנהל מעקב (Idempotency Key Store): בעת קבלת הודעה, הוא מנסה לרשום את ה-ID תחת טרנזקציה מקומית. אם ה-ID כבר קיים, משמע שההודעה עובדה כבר בעבר; הצרכן מדלג על הפעולה העסקית (לא מחייב שוב) ומחזיר הצלחה. הדבר הופך את ערבות ה-At-Least-Once להתנהגות שקולה ל-Exactly-Once מבחינה עסקית.",
        },
        {
          id: "archsys-q09-opt4",
          plainText:
            "התבנית משתמשת בשעונים אטומיים בלבד כדי לאפס את תור ההודעות מדי שעה.",
          isCorrect: false,
          explanation:
            "שגוי: אידמפוטנטיות היא עקרון לוגי של התוכנה ואינה תלויה בשעונים אטומיים.",
        },
      ],
    },

    // =========================================================================
    // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
    // =========================================================================
    {
      id: "archsys-q10-uml-sequence-combined-fragments",
      domain: "UML: מקטעים משולבים בדיאגרמת רצף",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - UML: דיאגרמות רצף ומקטעים משולבים",
      context:
        "בדיאגרמת רצף (UML 2.x Sequence Diagram) המתארת תהליך אימות משתמש ורכישה, משתמשים במקטעים משולבים (Combined Fragments) המכילים שומרי תנאי (Interaction Constraints / Guards).",
      formulaLatex:
        "\\text{Combined Fragments: } [\\mathrm{alt}],\\; [\\mathrm{opt}],\\; [\\mathrm{loop}],\\; [\\mathrm{par}]",
      instruction:
        "מהו ההבדל המדויק בין המקטע alt למקטע opt, וכיצד מיוצגת פעילות מקבילית בדיאגרמת רצף?",
      options: [
        {
          id: "archsys-q10-opt1",
          plainText: "alt מציין לולאה אינסופית, ו-opt מציין פעולה שנמחקה.",
          isCorrect: false,
          explanation: "שגוי: לולאה מיוצגת ע״י מקטע loop, ולא ע״י alt.",
        },
        {
          id: "archsys-q10-opt2",
          plainText:
            "שני המקטעים זהים לחלוטין ומשמשים לתיעוד בלבד ללא משמעות סמנטית.",
          isCorrect: false,
          explanation:
            "שגוי: תקן UML 2 מגדיר סמנטיקה קפדנית לחלוטין לכל אופרטור אינטראקציה.",
        },
        {
          id: "archsys-q10-opt3",
          plainText: "opt מחייב לפחות $3$ חלופות מנוגדות, ו-alt פועל ללא שום שומר תנאי.",
          isCorrect: false,
          explanation:
            "שגוי: opt מוגדר לחלופה בודדת, ו-alt מוגדר לבחירה בין מספר חלופות זרות.",
        },
        {
          id: "archsys-q10-opt4",
          plainText:
            "מקטע alt (Alternatives) מייצג בחירה בין חלופות המוציאות זו את זו (שקול למבנה if-else מרובה סעיפים המופרדים בקו מקווקו, שבו מתבצע בדיוק ענף יחיד שתנאי השומר שלו מתקיים); מקטע opt (Option) מייצג פעולה אופציונלית יחידה שתתבצע אך ורק אם התנאי מתקיים (שקול למבנה if בודד ללא else); ופעילות מקבילית מסונכרנת מיוצגת ע״י המקטע par (Parallel).",
          isCorrect: true,
          explanation:
            "נכון: תקן UML 2 מגדיר סמנטיקת Interaction Operators: 1. alt (Alternatives): מייצג לוגיקת בחירה מרובת ענפים (switch/if-else). המקטע מחולק לתאי משנה ע״י קווים מקווקוים, כאשר לכל תא תנאי שומר משלו: $[x > 0]$, $[x \\le 0]$. בכל הרצה מתבצע בדיוק תא אחד שתנאו התקיים. 2. opt (Option): מכיל תא בודד עם תנאי שומר $[condition]$. אם התנאי מתקיים, רצף ההודעות הפנימי מתבצע; אם לא, המקטע מדולג במלואו וממשיכים הלאה (שקול ל-if ללא סעיף else). 3. par (Parallel): תאי המקטע מייצגים תהליכים נפרדים המתבצעים במקביל בזמן, כאשר הודעות מתאים שונים עשויות להשתלב (Interleaving) בכל סדר חוקי.",
        },
      ],
    },
    {
      id: "archsys-q11-strangler-fig-monolith-migration",
      domain: "מודרניזציית לגאסי ותבנית Strangler Fig",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - מודרניזציית לגאסי ותבנית Strangler Fig",
      context:
        'בפרויקט שדרוג מערכת לגאסי ארגונית מונוליתית קריטית ומסובכת, הנהלת הפיתוח פוסלת את גישת "המפץ הגדול" (Big Bang Rewrite — שכתוב כל המערכת מאפס והחלפה ביום אחד) ומיישמת את תבנית Strangler Fig (מרטין פאולר).',
      formulaLatex:
        "\\mathrm{traffic}(t) = (1-\\alpha(t))\\,M_{\\mathrm{legacy}} + \\alpha(t)\\,S_{\\mathrm{new}}, \\quad \\alpha: 0 \\to 1",
      instruction:
        "כיצד מיושמת תבנית ה-Strangler Fig הלכה למעשה, ומדוע היא נחשבת למתודולוגיה הבטוחה ביותר לפרק מונוליתים ענקיים?",
      options: [
        {
          id: "archsys-q11-opt1",
          plainText:
            "היא מוחקת את כל קוד המקור הישן מיד ביום הראשון של הפרויקט כדי למנוע היסוסים.",
          isCorrect: false,
          explanation:
            "שגוי: זוהי בדיוק גישת המפץ הגדול ההרסנית שהובילה לכישלון של אינספור פרויקטים ארגוניים.",
        },
        {
          id: "archsys-q11-opt2",
          plainText:
            "היא דורשת להשאיר את המונולית ללא שום שינוי לעד ולהוסיף רק אפליקציית מובייל.",
          isCorrect: false,
          explanation:
            "שגוי: המטרה של Strangler Fig היא החלפה ופירוק מלא של המונולית הישן שלב אחר שלב.",
        },
        {
          id: "archsys-q11-opt3",
          plainText:
            "היא מתבססת על תרגום קוד אוטומטי של קובול ל-Python באמצעות מנועי שפות פורמליות.",
          isCorrect: false,
          explanation:
            "שגוי: התבנית עוסקת בארכיטקטורת ניתוב מערכתית מודולרית ולא בתרגום תחבירי עיוור.",
        },
        {
          id: "archsys-q11-opt4",
          plainText:
            "מציבים שכבת יירוט וניתוב (Interception Layer / API Gateway) מול מערכת הלגאסי; מפתחים שירותים מודרניים חדשים מחוץ למונולית סביב תחומי יכולת מוגדרים, ומנתבים בהדרגה אחוזים מתעבורת המשתמשים מהמערכת הישנה אל השירותים החדשים; בהדרגה, השירותים החדשים חונקים את המונולית הישן עד אשר כל היכולות מוחלפות במלואן, והמערכת הישנה נכבית בבטחה וללא השבתת פעילות.",
          isCorrect: true,
          explanation:
            "נכון: תבנית Strangler Fig (הקרויה על שם עץ התאנה החונקת הגדל על ענפי עץ מארח עד שהוא מחליף אותו לחלוטין): 1. כשל המפץ הגדול (Big Bang): שכתוב מונולית לגאסי בן עשור מאפס נמשך שנים, חורג מתקציבים, מתעלם מעשרות חוקים עסקיים נסתרים בקוד הישן, ונכשל לרוב בעת ההשקה. 2. מתודולוגיית Strangler: מציבים Proxy/Gateway בחזית המערכת המנתב את כל התעבורה. מזהים יכולת עסקית בודדת מתוך המונולית (למשל מודול התראות או שירות תשלומים). בונים אותה כשירות מודרני עצמאי בחוץ. כאשר השירות מוכן ונבדק, מגדירים ב-Gateway להעביר את כל הבקשות הרלוונטיות לשירות החדש במקום למונולית. התהליך חוזר באופן איטרטיבי ומדורג, פיצ׳ר אחר פיצ׳ר. הסיכון העסקי מזערי, הערך מסופק מהיום הראשון, ובסיום התהליך מכבים ומסירים את שרידי המונולית הישן שהתרוקן מתוכן.",
        },
      ],
    },
    {
      id: "archsys-q12-iso-25010-software-quality-attributes",
      domain: "תקן איכות ISO/IEC 25010",
      title:
        "ניתוח, תכן וארכיטקטורת מערכות מידע - הנדסת דרישות ותקן איכות ISO/IEC 25010",
      context:
        "בהגדרת דרישות לא-פונקציונליות (Non-Functional Requirements / Quality Attributes), פועלים לפי מודל האיכות הבינלאומי ISO/IEC 25010 המחלק את איכות התוכנה ל-$8$ מאפיינים ראשיים.",
      formulaLatex:
        "A = \\frac{\\mathrm{MTBF}}{\\mathrm{MTBF}+\\mathrm{MTTR}}",
      instruction:
        "מהו ההבדל המדויק בין אמינות (Reliability), זמינות (Availability), ויכולת שירות/תחזוקתיות (Maintainability) לפי התקן?",
      options: [
        {
          id: "archsys-q12-opt1",
          plainText:
            "אמינות מודדת כמה שורות קוד נכתבו, וזמינות מודדת את מחיר הרישיון לשנה.",
          isCorrect: false,
          explanation:
            "שגוי: אלו הגדרות שגויות; תקן האיכות עוסק בתכונות הנדסיות ומדדי ביצוע תפעוליים.",
        },
        {
          id: "archsys-q12-opt2",
          plainText: "תחזוקתיות היא היכולת של המשתמש ללמוד את המערכת בחמש דקות בלבד.",
          isCorrect: false,
          explanation:
            "שגוי: קלות למידה שייכת למאפיין השימושיות (Usability); תחזוקתיות עוסקת בשינוי, איתור באגים והרחבת הקוד ע״י מפתחים.",
        },
        {
          id: "archsys-q12-opt3",
          plainText: "זמינות היא תמיד $100\\%$ בכל מערכת הפועלת על גבי שרתי לינוקס.",
          isCorrect: false,
          explanation:
            'שגוי: אף מערכת אינה משיגה $100\\%$ זמינות מוחלטת; זמינות נמדדת ברמות של $99.9\\%$ ("תשעיות").',
        },
        {
          id: "archsys-q12-opt4",
          plainText:
            "אמינות (Reliability) מודדת את ההסתברות שהמערכת תבצע את תפקידיה ללא כשל תחת תנאים מוגדרים לפרק זמן נתון (לרוב מבוטאת ע״י MTBF — זמן ממוצע בין תקלות); זמינות (Availability) מודדת את החלק היחסי של הזמן שבו המערכת במצב פעיל ותקין לשירות (היחס $\\frac{\\mathrm{MTBF}}{\\mathrm{MTBF} + \\mathrm{MTTR}}$); ותחזוקתיות (Maintainability) מודדת את הקלות והמהירות שבהן ניתן לתקן באגים, לעדכן, ולשנות את המערכת (הנשלטת ע״י MTTR נמוך, מודולריות וכיסוי בדיקות).",
          isCorrect: true,
          explanation:
            "נכון: לפי תקן ISO/IEC 25010: 1. Reliability (אמינות): היכולת לשמור על רמת ביצועים מוגדרת לאורך זמן ללא תקלות (חסינות לכשלים). מדד מרכזי: Mean Time Between Failures (MTBF). מערכת בעלת MTBF גבוה היא אמינה מאוד. 2. Availability (זמינות): שיעור הזמן שבו המערכת זמינה ומספקת שירות למשתמש. הנוסחה הקנונית: $A = \\frac{\\mathrm{MTBF}}{\\mathrm{MTBF} + \\mathrm{MTTR}}$. שימו לב: מערכת יכולה להיות בעלת אמינות נמוכה (קורסת כל יום), אך אם יש לה התאוששות אוטומטית מיידית תוך שנייה בודדת ($\\mathrm{MTTR} = 1\\,\\mathrm{s}$), הזמינות שלה תהיה מעל $99.99\\%$. 3. Maintainability (תחזוקתיות): מידת המאמץ הנדרשת מצוות הפיתוח לבצע שינויים, תיקון תקלות (MTTR — Mean Time to Repair), שדרוגים והתאמות. תכונות תומכות: מודולריות, צימוד רופף, עקרונות SOLID, קריאות וכיסוי בדיקות אוטומטיות (Testability).",
        },
      ],
    },
  ];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS =
  SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from DDD / CQRS / Conway (Q1–3, key A)
 * - 1 from Clean Architecture / Circuit Breaker / Gateway (Q4–6, key B)
 * - 1 from gRPC / ATAM / idempotency / UML / Strangler / ISO 25010 (Q7–12, keys C–D)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleSystemsAnalysisArchitectureOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS.slice(0, 3);
  const groupB = SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS.slice(3, 6);
  const groupC = SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS.slice(6, 12);

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
