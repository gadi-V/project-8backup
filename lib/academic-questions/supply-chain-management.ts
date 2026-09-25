import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Supply Chain Management diagnostic bank (12Q).
 * Display name: "ניהול שרשרת אספקה" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const SUPPLY_CHAIN_MANAGEMENT_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "scm-q01-eoq-classic-tradeoff",
    domain: "EOQ",
    title: "ניהול שרשרת אספקה - EOQ",
    context:
      "קמעונאי מתמודד עם ביקוש שנתי דטרמיניסטי קבוע $D$, עלות הזמנה קבועה $S$ לכל הזמנה, ועלות החזקה שנתית ליחידה $H$. האספקה מיידית ואין מחסור מותר.",
    formulaLatex:
      "TC(Q) = \\frac{D}{Q}S + \\frac{Q}{2}H, \\quad Q^* = \\sqrt{\\frac{2DS}{H}}",
    instruction:
      "מהו האיזון הכלכלי שמגדיר את גודל ההזמנה הכלכלי $Q^*$, וכיצד מגיב $Q^*$ לעלייה ב-$H$?",
    options: [
      {
        id: "scm-q01-opt1",
        plainText:
          "בנקודת האופטימום עלות ההזמנה השנתית שווה לעלות ההחזקה השנתית ($\\frac{D}{Q^*}S = \\frac{Q^*}{2}H$), ו-$Q^*$ יורד כשורש כאשר $H$ עולה: $Q^* \\propto 1/\\sqrt{H}$.",
        mathText: "Q^* = \\sqrt{\\frac{2DS}{H}}",
        isCorrect: true,
        explanation:
          "נכון: נגזרת העלות הכוללת $\\frac{dTC}{dQ} = -\\frac{DS}{Q^2} + \\frac{H}{2}$ מתאפסת כאשר $\\frac{DS}{Q^2} = \\frac{H}{2}$, כלומר עלות הזמנה שנתית = עלות החזקה שנתית. מכך $Q^* = \\sqrt{2DS/H}$. עלייה ב-$H$ מייקרת מלאי ומסיטה את האופטימום למנות קטנות יותר בתדירות גבוהה יותר, בפרופורציה הפוכה לשורש $H$.",
      },
      {
        id: "scm-q01-opt2",
        plainText: "$Q^*$ עולה ליניארית עם $H$ כי מלאי יקר דורש הזמנות גדולות יותר לחיסכון בהובלה.",
        isCorrect: false,
        explanation:
          "שגוי: מלאי יקר מעודד דווקא מנות קטנות. התלות היא $Q^* \\propto 1/\\sqrt{H}$, לא עלייה ליניארית.",
      },
      {
        id: "scm-q01-opt3",
        plainText: "האופטימום נקבע כאשר $Q^* = D$, כלומר הזמנה אחת לשנה בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: $Q^*=D$ הוא מקרה פרטי בלבד אם $\\sqrt{2DS/H}=D$. בדרך כלל מספר מחזורי ההזמנה הוא $D/Q^* \\neq 1$.",
      },
      {
        id: "scm-q01-opt4",
        plainText: "מודל EOQ דורש ביקוש סטוכסטי וחישוב שבר קריטי כמו בניוזבנדור.",
        isCorrect: false,
        explanation:
          "שגוי: EOQ הקלאסי הוא דטרמיניסטי ורציף; השבר הקריטי שייך למודלי newsvendor עם אי-ודאות ביקוש.",
      },
    ],
  },
  {
    id: "scm-q02-newsvendor-critical-fractile",
    domain: "newsvendor",
    title: "ניהול שרשרת אספקה - newsvendor",
    context:
      "מוצר עונתי נרכש לפני העונה במחיר $c$, נמכר במחיר $p$, ועודף בסוף העונה נמכר בערך הצלה $s$ ($p > c > s$). הביקוש האקראי $D$ בעל CDF $F$.",
    formulaLatex:
      "C_u = p - c,\\quad C_o = c - s,\\quad F(Q^*) = \\frac{C_u}{C_u + C_o}",
    instruction:
      "מהו התנאי לקביעת כמות ההזמנה האופטימלית $Q^*$ במודל מוכר העיתונים?",
    options: [
      {
        id: "scm-q02-opt1",
        plainText:
          "מזמינים עד השבר הקריטי $F(Q^*) = \\frac{C_u}{C_u + C_o}$: תוספת יחידה משתלמת כל עוד ההסתברות למכור אותה גדולה מספיק ביחס לעלות העודף.",
        mathText: "F(Q^*) = \\frac{C_u}{C_u + C_o}",
        isCorrect: true,
        explanation:
          "נכון: האיזון השולי הוא $C_u\\,P(D>Q) = C_o\\,P(D\\le Q)$. פתרון המשוואה נותן את השבר הקריטי. אם $C_u \\gg C_o$ (מוצר רווחי מאוד), $F(Q^*)$ קרוב ל-1 ומזמינים גבוה מעל החציון; אם עודף יקר, מזמינים שמרנית.",
      },
      {
        id: "scm-q02-opt2",
        plainText: "תמיד $Q^* = \\mathbb{E}[D]$, ללא תלות ב-$p,c,s$.",
        isCorrect: false,
        explanation:
          "שגוי: הזמנת התוחלת אופטימלית רק כאשר השבר הקריטי תואם את $F(\\mathbb{E}[D])$ (למשל $C_u=C_o$ בהתפלגות סימטרית).",
      },
      {
        id: "scm-q02-opt3",
        plainText: "האופטימום הוא $Q^* = \\sqrt{2DS/H}$ כמו ב-EOQ רב-תקופתי.",
        isCorrect: false,
        explanation:
          "שגוי: EOQ מאזן עלויות הזמנה/החזקה לאורך זמן; newsvendor מאזן חוסר מול עודף בתקופה בודדת.",
      },
      {
        id: "scm-q02-opt4",
        plainText: "יש להזמין עד שההסתברות לחוסר מתאפסת לחלוטין ($F(Q^*)=1$).",
        isCorrect: false,
        explanation:
          "שגוי: כיסוי מלא של הביקוש אופטימלי רק אם $C_o=0$. בעלות עודף חיובית תמיד יש פשרה סטטיסטית.",
      },
    ],
  },
  {
    id: "scm-q03-safety-stock-service-level",
    domain: "safety stock",
    title: "ניהול שרשרת אספקה - safety stock",
    context:
      "במדיניות $(R,Q)$ עם זמן אספקה $L$, ביקוש יומי בעל תוחלת $\\mu$ וסטיית תקן $\\sigma$, ורמת שירות מחזורית $CSL$ (הסתברות לאי-מחסור במחזור).",
    formulaLatex:
      "ROP = \\mu L + z_{CSL}\\,\\sigma\\sqrt{L},\\quad SS = z_{CSL}\\,\\sigma\\sqrt{L}",
    instruction:
      "מהו תפקיד מלאי הביטחון $SS$, וכיצד הוא תלוי בזמן האספקה $L$?",
    options: [
      {
        id: "scm-q03-opt1",
        plainText:
          "מלאי הביטחון מגן מפני אי-ודאות הביקוש במהלך זמן האספקה; תחת הנחות סטנדרטיות $SS \\propto \\sqrt{L}$, כך שקיצור $L$ מפחית את $SS$ בפרופורציה לשורש.",
        mathText: "SS = z_{CSL}\\,\\sigma\\sqrt{L}",
        isCorrect: true,
        explanation:
          "נכון: נקודת ההזמנה כוללת ביקוש צפוי במהלך $L$ ועוד כרית סטטיסטית $z\\sigma_L$. אם הביקושים היומיים בלתי-תלויים, $\\mathrm{Var}(D_L)=L\\sigma^2$ ולכן $\\sigma_L=\\sigma\\sqrt{L}$. קיצור זמן אספקה מקטין גם את הביקוש הצפוי וגם את מלאי הביטחון.",
      },
      {
        id: "scm-q03-opt2",
        plainText: "$SS$ עולה ליניארית עם $L$ תמיד ($SS \\propto L$), ללא תלות בשונות הביקוש.",
        isCorrect: false,
        explanation:
          "שגוי: תחת אי-תלות סטיית התקן של הביקוש בזמן האספקה גדלה כ-$\\sqrt{L}$, לא כ-$L$. הביקוש הצפוי גדל ליניארית, אך הוא אינו מלאי ביטחון.",
      },
      {
        id: "scm-q03-opt3",
        plainText: "מלאי ביטחון מחליף לחלוטין את הצורך בנקודת הזמנה; מספיק להחזיק $SS$ בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ROP כולל גם את הביקוש הצפוי $\\mu L$. מלאי ביטחון הוא רק הרכיב הסטוכסטי מעל התוחלת.",
      },
      {
        id: "scm-q03-opt4",
        plainText: "עלייה ב-$CSL$ מקטינה את $z_{CSL}$ ומאפשרת מלאי ביטחון נמוך יותר.",
        isCorrect: false,
        explanation:
          "שגוי: רמת שירות גבוהה יותר דורשת קוונטיל גבוה יותר ($z$ גדול יותר) ומלאי ביטחון גדול יותר.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "scm-q04-bullwhip-effect-amplification",
    domain: "bullwhip effect",
    title: "ניהול שרשרת אספקה - bullwhip effect",
    context:
      "בשרשרת רב-שלבית, הביקוש בקצה הלקוח יציב יחסית, אך תנודות ההזמנות גדלות ככל שעולים במעלה הזרם (קמעונאי → סיטונאי → יצרן).",
    formulaLatex:
      "\\mathrm{Var}(q_{\\text{upstream}}) > \\mathrm{Var}(d_{\\text{retail}})",
    instruction:
      "מהו אפקט השוט (Bullwhip Effect), ומהם מנגנונים מרכזיים המגבירים אותו?",
    options: [
      {
        id: "scm-q04-opt1",
        plainText: "האפקט הוא ירידה הדרגתית בשונות ההזמנות במעלה השרשרת עקב ממוצע נע.",
        isCorrect: false,
        explanation:
          "שגוי: אפקט השוט הוא הגברה של שונות, לא דעיכה. ממוצע נע עלול דווקא לתרום להגברה בגלל עדכון תחזיות.",
      },
      {
        id: "scm-q04-opt2",
        plainText:
          "האפקט הוא הגברת שונות הביקוש במעלה השרשרת, בין היתר עקב עדכון תחזיות, הזמנות במנות, מחסור/משחקי הקצאה, ושינויי מחיר המעודדים הזמנות מוקדמות.",
        mathText: "\\mathrm{Var}(q) \\uparrow \\text{ upstream}",
        isCorrect: true,
        explanation:
          "נכון: כל שלב מפרש רעש מקומי כשינוי מגמה ומזמין ביתר. הזמנות במנות (batching) מצטברות לדופקים גדולים; במחסור לקוחות מגדילים הזמנות (rationing game); מבצעים יוצרים הזמנות מוקדמות. התוצאה: מלאי עודף, עלויות ייצור תנודתיות, וזמני אספקה ארוכים יותר במעלה הזרם.",
      },
      {
        id: "scm-q04-opt3",
        plainText: "האפקט קיים רק בשרשרות עם ביקוש דטרמיניסטי קבוע וללא תחזיות.",
        isCorrect: false,
        explanation:
          "שגוי: בביקוש דטרמיניסטי יציב ללא עיוותי הזמנה אין הגברה. האפקט נולד מאי-ודאות וממדיניות הזמנה מעוותת.",
      },
      {
        id: "scm-q04-opt4",
        plainText: "שיתוף מידע על ביקוש נקודת המכירה (POS) מחמיר בהכרח את אפקט השוט.",
        isCorrect: false,
        explanation:
          "שגוי: שיתוף POS ו-VMI הם כלים מרכזיים להפחתת האפקט, כי הם מקטינים עיוותי תחזית בין השלבים.",
      },
    ],
  },
  {
    id: "scm-q05-beer-game-dynamics",
    domain: "beer game",
    title: "ניהול שרשרת אספקה - beer game",
    context:
      "במשחק הבירה הקלאסי ארבעה שחקנים (קמעונאי, סיטונאי, מפיץ, מבשל) מזמינים על בסיס מידע מקומי בלבד, עם עיכובי משלוח קבועים.",
    formulaLatex:
      "\\text{Order}_t = \\widehat{D}_t + \\alpha(\\text{TargetInv} - \\text{Inv}_t) + \\beta(\\text{Pipeline gap})",
    instruction:
      "מה מלמד משחק הבירה על התנהגות שרשראות אספקה מבוזרות?",
    options: [
      {
        id: "scm-q05-opt1",
        plainText: "השחקנים מגיעים מיד לאופטימום גלובלי כי לכל אחד יש מידע מלא על הביקוש הסופי.",
        isCorrect: false,
        explanation:
          "שגוי: במשחק הקלאסי המידע מוגבל להזמנות מהשכן במורד הזרם בלבד; אין ראייה גלובלית של הביקוש.",
      },
      {
        id: "scm-q05-opt2",
        plainText:
          "עיכובי משלוח, מלאי בצנרת שלא נספר, ותגובות יתר לתנודות מקומיות יוצרים תנודות מוגברות במעלה השרשרת — הדגמה חיה של אפקט השוט ושל כשל תיאום.",
        isCorrect: true,
        explanation:
          "נכון: שחקנים נוטים להתעלם ממלאי בדרך (pipeline) ולהגיב ביתר למחסור נקודתי. העיכובים גורמים לתיקונים מאוחרים שמצטברים לגלים. המשחק ממחיש מדוע שקיפות, מדיניות הזמנה ממושמעת ושיתוף ביקוש אמיתי קריטיים לביצועי שרשרת.",
      },
      {
        id: "scm-q05-opt3",
        plainText: "המשחק מוכיח שמלאי ביטחון אינו נחוץ כלל בשרשרות רב-שלביות.",
        isCorrect: false,
        explanation:
          "שגוי: דווקא חוסר בכרית מלאי/צנרת מתוכננת מחמיר תגובות יתר. הבעיה היא תיאום, לא ביטול מלאי.",
      },
      {
        id: "scm-q05-opt4",
        plainText: "התוצאה היציבה היחידה היא הזמנה אפס בכל שלב בכל תקופה.",
        isCorrect: false,
        explanation:
          "שגוי: ביקוש הלקוח החיובי מחייב זרימת הזמנות חיובית; הבעיה היא הגברה, לא אפס פעילות.",
      },
    ],
  },
  {
    id: "scm-q06-postponement-form-time",
    domain: "postponement",
    title: "ניהול שרשרת אספקה - postponement",
    context:
      "יצרן מייצר משפחת מוצרים הדומים עד נקודת התמיינות (differentiation point), ואז מתאימים צבע/תצורה לפי ביקוש אזורי.",
    formulaLatex:
      "\\text{Risk pooling via delayed differentiation} \\Rightarrow \\sigma_{\\text{generic}} < \\sum_i \\sigma_i",
    instruction:
      "מהו עקרון הדחייה (Postponement) ומה תועלתו הכלכלית המרכזית?",
    options: [
      {
        id: "scm-q06-opt1",
        plainText: "דחייה פירושה ייצור מלא מראש של כל הגרסאות הסופיות כדי לקצר את זמן האספקה ללקוח.",
        isCorrect: false,
        explanation:
          "שגוי: זהו ההפך — ייצור מוקדם של גרסאות סופיות מגדיל חשיפה לאי-ודאות מקומית.",
      },
      {
        id: "scm-q06-opt2",
        plainText:
          "דחיית ההתמיינות הסופית מאפשרת להחזיק מלאי גנרי משותף ולהתאים מוצר ספציפי קרוב יותר לביקוש בפועל, ובכך מנצלת איגום סיכונים ומקטינה מלאי עודף/חוסר.",
        isCorrect: true,
        explanation:
          "נכון: כל עוד המוצר גנרי, הביקושים האזוריים מתקזזים סטטיסטית (risk pooling). רק אחרי התגלות ביקוש מבצעים התאמה יקרה. התועלת: פחות מלאי ביטחון, גמישות גבוהה יותר, ופחות מדחי מדף — במחיר זמן התאמה ומורכבות תפעולית.",
      },
      {
        id: "scm-q06-opt3",
        plainText: "דחייה מועילה רק כאשר הביקושים לגרסאות מתואמים לחלוטין ($\\rho=1$).",
        isCorrect: false,
        explanation:
          "שגוי: תועלת האיגום גדולה יותר כאשר המתאם נמוך; ב-$\\rho=1$ אין כמעט קיזוז סטטיסטי.",
      },
      {
        id: "scm-q06-opt4",
        plainText: "דחייה מבטלת לחלוטין את הצורך בתחזית ביקוש לכל מוצר.",
        isCorrect: false,
        explanation:
          "שגוי: עדיין נדרשות תחזיות לרכיבים גנריים וליכולת התאמה; רק רזולוציית אי-הוודאות משתנה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "scm-q07-mto-vs-mts",
    domain: "make-to-order vs make-to-stock",
    title: "ניהול שרשרת אספקה - make-to-order vs make-to-stock",
    context:
      "מנהל תפעול בוחר בין Make-to-Stock (MTS) לבין Make-to-Order (MTO) עבור קו מוצרים בעל שונות ביקוש ועלות מלאי גבוהה.",
    formulaLatex:
      "\\text{MTS: inventory risk},\\quad \\text{MTO: lead-time / capacity risk}",
    instruction:
      "מהו ההבדל האסטרטגי המרכזי בין MTS ל-MTO?",
    options: [
      {
        id: "scm-q07-opt1",
        plainText: "MTS ו-MTO זהים תפעולית; ההבדל הוא שיווקי בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: נקודת ההתחייבות לייצור ביחס להתגלות הביקוש שונה מהותית, ומשנה סיכון מלאי מול זמן אספקה.",
      },
      {
        id: "scm-q07-opt2",
        plainText: "MTO תמיד עדיף כי אינו מחזיק מלאי מוגמר, ללא תלות בזמן אספקה או בעלות החלפה.",
        isCorrect: false,
        explanation:
          "שגוי: MTO מאריך זמן אספקה ודורש גמישות קיבולת; למוצרים סטנדרטיים עם ביקוש יציב MTS עשוי להיות עדיף.",
      },
      {
        id: "scm-q07-opt3",
        plainText:
          "ב-MTS מייצרים למלאי לפני הביקוש (סיכון עודף/חוסר על מוצר מוגמר); ב-MTO מתחילים ייצור אחרי הזמנה (סיכון זמן אספקה ועומס קיבולת). הבחירה תלויה בשונות, בעלות מלאי ובנכונות הלקוח להמתין.",
        isCorrect: true,
        explanation:
          "נכון: MTS מזיז את נקודת החדירה ללקוח (CODP) אחורה ומאפשר אספקה מיידית במחיר מלאי. MTO מזיז את ה-CODP קדימה ומפחית סיכון מלאי מוגמר אך מעביר אי-ודאות לזמן ולתזמון. מוצרים מותאמים/יקרים וביקוש תנודתי נוטים ל-MTO; מוצרי מדף סטנדרטיים ל-MTS או להיברידיות (ATO).",
      },
      {
        id: "scm-q07-opt4",
        plainText: "MTS אסור כלכלית בכל מקרה שבו קיים מודל EOQ.",
        isCorrect: false,
        explanation:
          "שגוי: EOQ הוא כלי לתכנון מלאי בתוך משטר MTS; הוא אינו פוסל את MTS.",
      },
    ],
  },
  {
    id: "scm-q08-inventory-turnover",
    domain: "inventory turnover",
    title: "ניהול שרשרת אספקה - inventory turnover",
    context:
      "חברה מדווחת על עלות מכר שנתית (COGS) $C$ ומלאי ממוצע בערך עלות $I$.",
    formulaLatex:
      "\\text{ITO} = \\frac{C}{I},\\quad \\text{Days of inventory} = \\frac{365}{\\text{ITO}}",
    instruction:
      "מה משמעות מחזוריות המלאי (Inventory Turnover), ומה הסיכון בפרשנות נאיבית של ITO גבוה?",
    options: [
      {
        id: "scm-q08-opt1",
        plainText: "ITO גבוה תמיד מוכיח שרשרת אופטימלית ללא סיכון שירות.",
        isCorrect: false,
        explanation:
          "שגוי: ITO גבוה יכול לנבוע ממלאי רזה מדי שפוגע ברמת השירות ובמכירות אבודות.",
      },
      {
        id: "scm-q08-opt2",
        plainText: "ITO מוגדר כ-$I/C$ וירידה ב-$C$ משפרת אוטומטית את המחזוריות.",
        isCorrect: false,
        explanation:
          "שגוי: ההגדרה הסטנדרטית היא $C/I$. ירידה ב-COGS לבדה מקטינה את ITO אם המלאי קבוע.",
      },
      {
        id: "scm-q08-opt3",
        plainText:
          "ITO = COGS / מלאי ממוצע מודד כמה פעמים המלאי 'מתחלף' בשנה; גבוה יותר משמעו פחות הון קשור במלאי ליחידת מכירות, אך יש לאזן מול רמת שירות ועלויות מחסור.",
        isCorrect: true,
        explanation:
          "נכון: מחזוריות גבוהה משקפת זרימה מהירה ויעילות הון חוזר, ומקבילה לימי מלאי נמוכים ($365/\\text{ITO}$). עם זאת, דילול יתר של מלאי עלול להעלות stockouts. יש לפרש ITO יחד עם fill rate, גיל מלאי, ותמהיל מוצרים (SKU איטיים מורידים ממוצע).",
      },
      {
        id: "scm-q08-opt4",
        plainText: "ITO זהה תמיד לחוק ליטל עם $L=\\lambda W$ ללא המרה ליחידות.",
        isCorrect: false,
        explanation:
          "שגוי: יש קשר רעיוני (מלאי ≈ קצב × זמן), אך ITO הוא יחס חשבונאי ולא זהה אוטומטית ל-$L=\\lambda W$ ללא הגדרת יחידות עקבית.",
      },
    ],
  },
  {
    id: "scm-q09-littles-law-supply-chain",
    domain: "Little's law in SC",
    title: "ניהול שרשרת אספקה - Little's law in SC",
    context:
      "במחסן מרכזי זורמות יחידות בקצב ממוצע יציב $\\lambda$ (יחידות ליחידת זמן), ומספר היחידות הממוצע במערכת (מלאי בתהליך + מלאי מדף רלוונטי) הוא $L$.",
    formulaLatex: "L = \\lambda W",
    instruction:
      "כיצד מיושם חוק ליטל בניהול שרשרת אספקה, ומה משמעות $W$?",
    options: [
      {
        id: "scm-q09-opt1",
        plainText: "החוק תקף רק לתורי M/M/1 במחסן ואינו חל על מלאי פיזי כללי.",
        isCorrect: false,
        explanation:
          "שגוי: חוק ליטל כללי לכל מערכת יציבה בזרימה; אינו דורש פואסון או שירות מעריכי.",
      },
      {
        id: "scm-q09-opt2",
        plainText: "בשרשרת אספקה $L=\\lambda W$ גורר ש-$W$ חייב להיות אפס אם המלאי חיובי.",
        isCorrect: false,
        explanation:
          "שגוי: מלאי חיובי משמעו זמן שהייה חיובי $W=L/\\lambda$; אין סתירה.",
      },
      {
        id: "scm-q09-opt3",
        plainText:
          "במצב מתמיד, המלאי הממוצע $L$ שווה לקצב הזרימה $\\lambda$ כפול זמן המחזור הממוצע $W$ של יחידה במערכת; כך ניתן לאמוד ימי מלאי או זמן מעבר מתוך נתוני מלאי ותפוקה.",
        mathText: "W = L / \\lambda",
        isCorrect: true,
        explanation:
          "נכון: אם יודעים מלאי ממוצע ותפוקה, מקבלים זמן שהייה ממוצע (ולהפך). זהו כלי אבחוני לצווארי בקבוק, להשוואת מחסנים, ולקישור בין ITO לימי מלאי — בתנאי יציבות ושמרנות זרימה (אין יצירה/השמדה של יחידות מחוץ לגבולות המערכת המוגדרת).",
      },
      {
        id: "scm-q09-opt4",
        plainText: "החוק דורש ש-$\\lambda$ יגדל מעל קיבולת המערכת ($\\rho>1$).",
        isCorrect: false,
        explanation:
          "שגוי: מעל קיבולת אין מצב מתמיד ו-$L$ גדל ללא גבול; חוק ליטל דורש יציבות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "scm-q10-vmi-vendor-managed-inventory",
    domain: "VMI",
    title: "ניהול שרשרת אספקה - VMI",
    context:
      "ספק מנהל את מלאי הלקוח (Vendor-Managed Inventory): הספק רואה נתוני מלאי/מכירות וקובע מועדי השלמה לפי הסכם רמות שירות.",
    formulaLatex:
      "\\text{VMI: supplier decides replenishment using shared demand/inventory visibility}",
    instruction:
      "מהי התועלת המרכזית של VMI ביחס להזמנות ידניות מבוזרות של הלקוח?",
    options: [
      {
        id: "scm-q10-opt1",
        plainText: "VMI מעביר את כל הסיכון הפיננסי ללקוח ומבטל את אחריות הספק.",
        isCorrect: false,
        explanation:
          "שגוי: ב-VMI הספק נוטל אחריות תפעולית גבוהה יותר על השלמות; חלוקת הסיכון נקבעת בחוזה.",
      },
      {
        id: "scm-q10-opt2",
        plainText: "VMI מגביר בהכרח את אפקט השוט כי הספק מזמין ללא מידע.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך — ראות לביקוש אמיתי אמורה להפחית עיוותי הזמנה ואפקט שוט.",
      },
      {
        id: "scm-q10-opt3",
        plainText: "VMI זהה משפטית לקונסיגנציה ואין הבדל כלכלי ביניהם.",
        isCorrect: false,
        explanation:
          "שגוי: קונסיגנציה עוסקת בבעלות המלאי עד מכירה; VMI עוסק במי מחליט על השלמה. ניתן לשלבם אך אינם זהים.",
      },
      {
        id: "scm-q10-opt4",
        plainText:
          "VMI מרכז החלטות השלמה אצל הספק עם שקיפות מלאי/ביקוש, מפחית הזמנות מעוותות ומחסור תיאום, ויכול לשפר רמת שירות ולהקטין מלאי מערכת — בכפוף לאמון, חוזים ומדדי ביצוע ברורים.",
        isCorrect: true,
        explanation:
          "נכון: הספק מתזמן השלמות לפי מצב אמיתי ולא לפי הזמנות מנופחות. התועלות תלויות באיכות נתונים, בהגדרת min/max או יעדי שירות, ובתמריצים שלא יגרמו לספק לדחוף מלאי עודף. ללא ממשל חוזי, VMI עלול להיכשל.",
      },
    ],
  },
  {
    id: "scm-q11-risk-pooling-decentralized-stock",
    domain: "risk pooling",
    title: "ניהול שרשרת אספקה - risk pooling",
    context:
      "שני אזורים עם ביקושים בלתי-תלויים $D_1,D_2$ בעלי סטיות תקן $\\sigma$, לעומת מחסן מרכזי אחד המשרת את שניהם.",
    formulaLatex:
      "\\sigma_{\\text{central}} = \\sqrt{\\sigma_1^2 + \\sigma_2^2} = \\sigma\\sqrt{2} < \\sigma_1 + \\sigma_2",
    instruction:
      "מהו עקרון איגום הסיכונים (Risk Pooling) במלאי, ומה קורה למלאי הביטחון הנדרש בריכוז?",
    options: [
      {
        id: "scm-q11-opt1",
        plainText: "ריכוז מלאי מגדיל תמיד את סך מלאי הביטחון כי יש מחסן גדול יותר.",
        isCorrect: false,
        explanation:
          "שגוי: סטיית התקן המצרפית קטנה מסכום הסטיות; לכן מלאי הביטחון הכולל בדרך כלל יורד.",
      },
      {
        id: "scm-q11-opt2",
        plainText: "איגום סיכונים דורש מתאם מושלם חיובי בין הביקושים ($\\rho=1$).",
        isCorrect: false,
        explanation:
          "שגוי: התועלת מקסימלית כשהמתאם נמוך/שלילי; ב-$\\rho=1$ אין קיזוז סטטיסטי.",
      },
      {
        id: "scm-q11-opt3",
        plainText: "במחסן מרכזי $\\sigma$ המצרפי שווה תמיד ל-$\\sigma_1+\\sigma_2$.",
        isCorrect: false,
        explanation:
          "שגוי: שוויון כזה מתקיים רק במתאם $+1$. באי-תלות הסכום הוא $\\sqrt{\\sigma_1^2+\\sigma_2^2}$.",
      },
      {
        id: "scm-q11-opt4",
        plainText:
          "ריכוז ביקושים בלתי-מתואמים במלאי משותף מקטין את סטיית התקן המצרפית ביחס לסכום הסטיות המקומיות, ולכן מאפשר מלאי ביטחון כולל נמוך יותר לאותה רמת שירות — במחיר אפשרי של זמן אספקה/הובלה ללקוח.",
        mathText: "\\sigma_{\\text{central}} = \\sigma\\sqrt{2}",
        isCorrect: true,
        explanation:
          "נכון: $\\mathrm{Var}(D_1+D_2)=\\sigma_1^2+\\sigma_2^2+2\\rho\\sigma_1\\sigma_2$. כאשר $\\rho<1$ יש חיסכון סטטיסטי. זה הבסיס למחסנים אזוריים, להחלפת מקומות מלאי, ולדחיית התמיינות. העלות הנגדית היא מרחק ללקוח וגמישות משלוחים.",
      },
    ],
  },
  {
    id: "scm-q12-transportation-inventory-tradeoff",
    domain: "transportation tradeoffs",
    title: "ניהול שרשרת אספקה - transportation tradeoffs",
    context:
      "מתכנן רשת בוחר בין הובלה מהירה ויקרה (אוויר) לבין הובלה איטית וזולה (ים), עבור מוצר בעל עלות החזקה גבוהה וביקוש לא-ודאי.",
    formulaLatex:
      "\\text{Total landed cost} = c_{\\text{transport}} + c_{\\text{inventory}}(L,\\sigma_L) + c_{\\text{stockout}}",
    instruction:
      "מהו הפשרה המרכזית בין מצב הובלה לבין עלויות מלאי בשרשרת?",
    options: [
      {
        id: "scm-q12-opt1",
        plainText: "תמיד כדאי לבחור בהובלה הזולה ביותר כי עלות מלאי זניחה בהגדרה.",
        isCorrect: false,
        explanation:
          "שגוי: הובלה איטית מגדילה מלאי בצנרת ומלאי ביטחון; למוצרים יקרים/מתכלים זה יקר מאוד.",
      },
      {
        id: "scm-q12-opt2",
        plainText: "הובלה מהירה מקטינה עלות הובלה ליחידה אך מגדילה את $L$ ואת $SS$.",
        isCorrect: false,
        explanation:
          "שגוי: הובלה מהירה בדרך כלל מייקרת את ההובלה ומקצרת את $L$, מה שמקטין מלאי בצנרת ו-$SS$.",
      },
      {
        id: "scm-q12-opt3",
        plainText: "אין קשר בין זמן הובלה למלאי ביטחון; $SS$ תלוי רק במחיר המוצר.",
        isCorrect: false,
        explanation:
          "שגוי: $SS \\propto \\sigma\\sqrt{L}$ תלוי ישירות בזמן האספקה ובשונות הביקוש לאורכו.",
      },
      {
        id: "scm-q12-opt4",
        plainText:
          "הובלה זולה/איטית חוסכת בדמי שינוע אך מעלה מלאי בצנרת ומלאי ביטחון ($\\propto\\sqrt{L}$); הובלה יקרה/מהירה מקטינה סיכון מלאי וחוסר במחיר שינוע גבוה. הבחירה לפי עלות כוללת (landed + inventory + service), לא לפי רכיב בודד.",
        isCorrect: true,
        explanation:
          "נכון: זו פשרת תחבורה–מלאי קלאסית. מוצרים בעלי ערך גבוה, מחזור חיים קצר או ביקוש תנודתי נוטים למסלולים מהירים; מטענים זולים ויציבים — לים/יבשה איטית. יש לשקלל גם גודל מנה (economies of scale בהובלה) מול עלות החזקה.",
      },
    ],
  },
];

export const ACADEMIC_SUPPLY_CHAIN_QUESTIONS = SUPPLY_CHAIN_MANAGEMENT_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleSupplyChainOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = SUPPLY_CHAIN_MANAGEMENT_QUESTIONS.slice(0, 3);
  const groupB = SUPPLY_CHAIN_MANAGEMENT_QUESTIONS.slice(3, 6);
  const groupC = SUPPLY_CHAIN_MANAGEMENT_QUESTIONS.slice(6, 12);

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
