import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Intro to Data Science & Python diagnostic bank (12Q).
 * Display name: "מבוא למדעי הנתונים ופייתון" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const INTRO_DATA_SCIENCE_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "inds-q01-eda-distribution-outliers",
    domain: "ניתוח חקרני של נתונים (EDA)",
    title: "מבוא למדעי הנתונים ופייתון - ניתוח חקרני של נתונים (EDA)",
    context:
      "לפני אימון מודל, מבצעים EDA על משתנה רציף $X$ עם $n$ תצפיות. מחשבים סטטיסטיקות תיאוריות (ממוצע, חציון, רבעונים) ומציירים היסטוגרמה ודיאגרמת קופסה (Box Plot).",
    formulaLatex:
      "\\operatorname{IQR} = Q_3 - Q_1, \\quad x \\text{ outlier if } x < Q_1 - 1.5\\,\\operatorname{IQR} \\;\\text{or}\\; x > Q_3 + 1.5\\,\\operatorname{IQR}",
    instruction:
      "מדוע השוואת ממוצע לחציון ובחינת ה-IQR חיוניות בשלב ה-EDA לפני בחירת מודל?",
    options: [
      {
        id: "inds-q01-opt1",
        plainText:
          "פער גדול בין ממוצע לחציון מצביע על עיוות (Skewness) או ערכים חריגים; ה-IQR מזהה חריגים באופן עמיד (Robust) שאינו תלוי בסטיית התקן, ומכוון להחלטות כמו טרנספורמציה לוגריתמית, Winsorization או בחירת מודל עמיד.",
        isCorrect: true,
        explanation:
          "נכון: הממוצע רגיש לזנבות ארוכים ולחריגים, בעוד החציון עמיד. פער משמעותי ביניהם הוא אות אזהרה להתפלגות לא-סימטרית. כלל $1.5\\,\\operatorname{IQR}$ של Tukey מזהה חריגים ללא הנחת נורמליות. זיהוי זה בשלב EDA מונע כשלים בהמשך (למשל הנחת OLS על נתונים מעוותים) ומנחה טיפול מקדים מתאים.",
      },
      {
        id: "inds-q01-opt2",
        plainText:
          "אם הממוצע שווה לחציון, חובה להשתמש ברגרסיה ליניארית בלבד; אחרת המודל אינו מוגדר.",
        isCorrect: false,
        explanation:
          "שגוי: שוויון ממוצע-חציון מרמז על סימטריה בקירוב, אך אינו מכתיב בחירת מודל יחידה ואינו תנאי לקיום רגרסיה.",
      },
      {
        id: "inds-q01-opt3",
        plainText:
          "ה-IQR משמש רק לחישוב דיוק סיווג ($Accuracy$) ואינו קשור לזיהוי חריגים.",
        isCorrect: false,
        explanation:
          "שגוי: IQR הוא מדד פיזור תיאורי למשתנים רציפים; Accuracy הוא מדד ביצועים לסיווג ואינו מחושב מ-IQR.",
      },
      {
        id: "inds-q01-opt4",
        plainText:
          "ב-EDA חובה למחוק את כל התצפיות שמחוץ ל-$[\\mu-\\sigma,\\mu+\\sigma]$ לפני כל ניתוח.",
        isCorrect: false,
        explanation:
          "שגוי: כלל $\\pm\\sigma$ אגרסיבי מדי ומניח נורמליות; מחיקה אוטומטית עלולה להסיר אות אמיתי. החלטת טיפול בחריגים דורשת הבנת הקשר העסקי/מדעי.",
      },
    ],
  },
  {
    id: "inds-q02-train-val-test-split",
    domain: "חלוקת Train / Validation / Test",
    title: "מבוא למדעי הנתונים ופייתון - חלוקת Train / Validation / Test",
    context:
      "בונים צינור למידת מכונה עם כוונון היפר-פרמטרים. הנתונים מחולקים לשלוש קבוצות זרות: אימון ($\\mathcal{D}_{\\text{train}}$), אימות ($\\mathcal{D}_{\\text{val}}$) ובדיקה ($\\mathcal{D}_{\\text{test}}$).",
    formulaLatex:
      "\\hat{\\theta} = \\arg\\min_{\\theta}\\, L(\\theta; \\mathcal{D}_{\\text{train}}), \\quad \\lambda^* = \\arg\\min_{\\lambda}\\, L(\\hat{\\theta}_\\lambda; \\mathcal{D}_{\\text{val}})",
    instruction:
      "מהו התפקיד הנכון של כל אחת משלוש הקבוצות, ומדוע אסור להשתמש ב-$\\mathcal{D}_{\\text{test}}$ לכוונון היפר-פרמטרים?",
    options: [
      {
        id: "inds-q02-opt1",
        plainText:
          "Train מאמן פרמטרים; Validation בוחר היפר-פרמטרים ומשווה מודלים; Test מעריך הכללה פעם אחת בסוף בלבד — שימוש חוזר ב-Test לכוונון יוצר דליפת מידע והערכת ביצועים אופטימית מדי.",
        isCorrect: true,
        explanation:
          "נכון: הפרדה תפקודית זו היא עקרון יסוד במדעי הנתונים. כל בחירה המבוססת על Test \"שורפת\" את האובייקטיביות של ההערכה הסופית. Validation משמשת כפרוקסי להכללה בזמן הפיתוח; Test נשמר כאומדן בלתי-משוחד של ביצועים על נתונים שלא נראו מעולם בתהליך הבחירה.",
      },
      {
        id: "inds-q02-opt2",
        plainText:
          "שלוש הקבוצות חייבות להיות זהות בגודלן, ואפשר לאמן על Test אם Validation ריקה.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלים אינם חייבים להיות שווים (למשל $70\\%/15\\%/15\\%$), ואסור לאמן על Test.",
      },
      {
        id: "inds-q02-opt3",
        plainText:
          "Validation ו-Test שקולות מתמטית; אפשר להחליף ביניהן בכל איטרציה ללא השפעה.",
        isCorrect: false,
        explanation:
          "שגוי: תפקידן שונה בפרוטוקול הניסוי. החלפה חוזרת מפרה את עקרון ההערכה הבלתי-תלויה.",
      },
      {
        id: "inds-q02-opt4",
        plainText:
          "Test משמש רק לניקוי ערכים חסרים; Train משמש להערכת ההכללה הסופית.",
        isCorrect: false,
        explanation:
          "שגוי: ניקוי וטרנספורמציות נלמדות על Train ומוחלות על Val/Test; ההערכה הסופית היא על Test.",
      },
    ],
  },
  {
    id: "inds-q03-bias-variance-tradeoff",
    domain: "טרייד-אוף הטיה–שונות (Bias–Variance)",
    title: "מבוא למדעי הנתונים ופייתון - טרייד-אוף הטיה–שונות (Bias–Variance)",
    context:
      "בבעיית רגרסיה עם שגיאה ריבועית, מפרקים את תוחלת שגיאת ההכללה לרכיבי הטיה, שונות ורעש בלתי-ניתן לצמצום.",
    formulaLatex:
      "\\mathbb{E}\\big[(y-\\hat{f}(x))^2\\big] = \\operatorname{Bias}^2(\\hat{f}) + \\operatorname{Var}(\\hat{f}) + \\sigma^2",
    instruction:
      "כיצד משתנים רכיבי ההטיה והשונות כאשר עוברים ממודל פשוט מדי (Underfitting) למודל מורכב מדי (Overfitting)?",
    options: [
      {
        id: "inds-q03-opt1",
        plainText:
          "ב-Underfitting ההטיה גבוהה והשונות נמוכה; ב-Overfitting ההטיה נמוכה והשונות גבוהה — הגדלת סיבוכיות מקטינה $\\operatorname{Bias}^2$ ומגדילה $\\operatorname{Var}$, בעוד $\\sigma^2$ נשאר קבוע.",
        isCorrect: true,
        explanation:
          "נכון: מודל פשוט אינו קולט את המבנה האמיתי (הטיה גבוהה) אך יציב בין מדגמים (שונות נמוכה). מודל גמיש מדי עוקב אחרי רעש האימון (הטיה נמוכה, שונות גבוהה). הרעש $\\sigma^2$ הוא תכונת תהליך ייצור הנתונים ואינו תלוי בסיבוכיות המודל.",
      },
      {
        id: "inds-q03-opt2",
        plainText:
          "הגדלת סיבוכיות מקטינה בו-זמנית את ההטיה ואת השונות לכל גודל מדגם סופי.",
        isCorrect: false,
        explanation:
          "שגוי: זהו בדיוק הטרייד-אוף — לא ניתן להקטין את שני הרכיבים יחד במדגם סופי ללא עלות.",
      },
      {
        id: "inds-q03-opt3",
        plainText:
          "Overfitting מאופיין בהטיה גבוהה ושונות נמוכה, בעוד Underfitting הפוך.",
        isCorrect: false,
        explanation:
          "שגוי: ההגדרות הפוכות. Overfitting = שונות גבוהה; Underfitting = הטיה גבוהה.",
      },
      {
        id: "inds-q03-opt4",
        plainText:
          "$\\sigma^2$ קטן לאפס כאשר מספר הפרמטרים שואף לאינסוף, ולכן Overfitting תמיד אופטימלי.",
        isCorrect: false,
        explanation:
          "שגוי: $\\sigma^2$ אינו תלוי במספר הפרמטרים; Overfitting פוגע בהכללה ואינו אופטימלי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "inds-q04-kfold-cross-validation",
    domain: "אימות צולב (Cross-Validation)",
    title: "מבוא למדעי הנתונים ופייתון - אימות צולב (Cross-Validation)",
    context:
      "כאשר גודל המדגם מוגבל, מעריכים ביצועים באמצעות $K$-Fold Cross-Validation: מחלקים ל-$K$ קיפולים זרים, מאמנים על $K-1$ ומעריכים על הקיפול הנותר.",
    formulaLatex:
      "\\mathrm{CV}_K = \\frac{1}{K}\\sum_{k=1}^{K} L\\big(\\hat{\\theta}^{(-k)}; \\mathcal{D}_k\\big)",
    instruction:
      "מה היתרון המרכזי של $K$-Fold לעומת פיצול חד-פעמי Train/Test, ומה הסיכון בבחירת $K$ קיצוני?",
    options: [
      {
        id: "inds-q04-opt1",
        plainText:
          "$K$-Fold חוסך זמן חישוב כי מאמנים מודל יחיד בלבד, בניגוד לפיצול חד-פעמי.",
        isCorrect: false,
        explanation:
          "שגוי: $K$-Fold דורש $K$ אימונים ולכן יקר יותר חישובית מפיצול חד-פעמי.",
      },
      {
        id: "inds-q04-opt2",
        plainText:
          "כל דוגמה משמשת פעם אחת לאימות ו-$K-1$ פעמים לאימון, מה שמקטין שונות של אומדן הביצועים; $K=n$ (LOOCV) מוריד הטיה אך מייקר חישוב ומעלה שונות בין קיפולים כמעט זהים, בעוד $K$ קטן מדי מגדיל הטיה של האומדן.",
        isCorrect: true,
        explanation:
          "נכון: ניצול מלא יותר של הנתונים להערכה הוא היתרון העיקרי. בחירת $K$ היא טרייד-אוף הטיה–שונות–עלות: ערכים נפוצים הם $K=5$ או $K=10$. LOOCV כמעט בלתי-משוחד אך יקר ובעל שונות גבוהה של האומדן במודלים לא-יציבים.",
      },
      {
        id: "inds-q04-opt3",
        plainText:
          "ב-$K$-Fold חובה להשתמש באותן דוגמאות אימות בכל הקיפולים כדי להבטיח יציבות.",
        isCorrect: false,
        explanation:
          "שגוי: הקיפולים זרים; כל דוגמה מופיעה בדיוק בקיפול אימות אחד.",
      },
      {
        id: "inds-q04-opt4",
        plainText:
          "Cross-Validation מחליף לחלוטין את הצורך בקבוצת Test חיצונית בכל פרויקט.",
        isCorrect: false,
        explanation:
          "שגוי: אם CV משמש גם לבחירת מודל/היפר-פרמטרים, עדיין נדרשת קבוצת Test (או Nested CV) להערכה סופית בלתי-משוחדת.",
      },
    ],
  },
  {
    id: "inds-q05-pandas-numpy-broadcasting",
    domain: "יסודות pandas ו-NumPy",
    title: "מבוא למדעי הנתונים ופייתון - יסודות pandas ו-NumPy",
    context:
      "בפייתון למדעי נתונים, מחשבים על מערך NumPy דו-ממדי $A\\in\\mathbb{R}^{n\\times d}$ ומבצעים פעולות עמודות ווקטוריות (Vectorization) במקום לולאות Python.",
    formulaLatex:
      "A_{:\\,j}^{\\text{(std)}} = \\frac{A_{:\\,j} - \\mu_j}{\\sigma_j}, \\quad \\mu_j = \\frac{1}{n}\\sum_{i=1}^n A_{ij}",
    instruction:
      "מדוע Broadcasting ווקטוריזציה ב-NumPy/pandas עדיפים על לולאות מפורשות לעיבוד טבלאות גדולות, ומה ההבדל התפיסתי בין `DataFrame` ל-`ndarray`?",
    options: [
      {
        id: "inds-q05-opt1",
        plainText:
          "לולאות Python תמיד מהירות יותר כי הן רצות ב-CPython ללא תקורה של הקצאת זיכרון.",
        isCorrect: false,
        explanation:
          "שגוי: לולאות Python איטיות עקב תקורה של ה-interpreter; NumPy מבצע פעולות ב-C/Fortran על בלוקים רציפים.",
      },
      {
        id: "inds-q05-opt2",
        plainText:
          "וקטוריזציה ו-Broadcasting מבצעים פעולות על מערכים שלמים בסיבוכיות נמוכה יותר בפועל (קוד מהודר, SIMD/BLAS); `ndarray` הוא מערך הומוגני מספרי, בעוד `DataFrame` מוסיף תוויות עמודות/שורות, טיפוסים מעורבים ואינדקסים נוחים ל-EDA — אך לחישובים כבדים נהוג לרדת ל-NumPy.",
        isCorrect: true,
        explanation:
          "נכון: זהו הבסיס לביצועים בפייתון מדעי. Broadcasting מאפשר חיסור וקטור ממוצעים מעמודות המטריצה ללא שכפול מפורש. pandas נוח לסינון, מיזוג וטיפול בחסרים; NumPy יעיל יותר לאלגברה ליניארית גולמית.",
      },
      {
        id: "inds-q05-opt3",
        plainText:
          "`DataFrame` ו-`ndarray` זהים לחלוטין; pandas הוא רק alias סינטקטי ל-NumPy.",
        isCorrect: false,
        explanation:
          "שגוי: pandas בנוי מעל NumPy אך מוסיף שכבת מטא-דאטה, אינדקסים וטיפוסים הטרוגניים.",
      },
      {
        id: "inds-q05-opt4",
        plainText:
          "Broadcasting אסור בנרמול עמודות כי הוא משנה את דירוג המטריצה האלגברי.",
        isCorrect: false,
        explanation:
          "שגוי: נרמול עמודות הוא שימוש קלאסי ולגיטימי ב-Broadcasting ואינו קשור לדירוג מטריצה בהכרח.",
      },
    ],
  },
  {
    id: "inds-q06-missing-data-mechanisms",
    domain: "טיפול בערכים חסרים (Missing Data)",
    title: "מבוא למדעי הנתונים ופייתון - טיפול בערכים חסרים (Missing Data)",
    context:
      "בטבלת נתונים יש ערכים חסרים. מבחינים בין מנגנונים: MCAR, MAR ו-MNAR, ובין אסטרטגיות כמו מחיקת שורות, Imputation ממוצע/חציון, ומודלים לחיזוי חסרים.",
    formulaLatex:
      "\\text{MCAR: } P(R\\mid X)=P(R), \\quad \\text{MAR: } P(R\\mid X)=P(R\\mid X_{\\text{obs}})",
    instruction:
      "מתי מחיקת שורות עם חסרים עלולה להטות מסקנות, ומדוע Imputation בממוצע עלול להיות בעייתי?",
    options: [
      {
        id: "inds-q06-opt1",
        plainText:
          "מחיקת שורות תמיד חסרת הטיה, כי חסרים הם בהגדרה אקראיים לחלוטין בכל מאגר.",
        isCorrect: false,
        explanation:
          "שגוי: הנחת MCAR אינה תמיד מתקיימת; במנגנוני MAR/MNAR מחיקה יוצרת הטיה סלקטיבית.",
      },
      {
        id: "inds-q06-opt2",
        plainText:
          "מחיקה בטוחה בעיקר תחת MCAR ובשיעור חסרים נמוך; תחת MAR/MNAR היא עלולה לשנות את התפלגות האוכלוסייה. Imputation בממוצע מקטין שונות מלאכותית ומתעלם מאי-ודאות — עדיף שיטות המשמרות מבנה (למשל חציון לעיוותים, מודל חיזוי, או Multiple Imputation).",
        isCorrect: true,
        explanation:
          "נכון: הבנת מנגנון החסרה קובעת את תקינות הטיפול. ממוצע קבוע \"מושך\" התפלגות למרכז ומקטין קורלציות. בפרקטיקה בוחנים דפוסי חסרה, בוחרים אסטרטגיה לפי סוג המשתנה והמנגנון, ומתעדים את ההשפעה על המדדים.",
      },
      {
        id: "inds-q06-opt3",
        plainText:
          "MNAR הוא המנגנון היחיד שבו מותר למלא חסרים באפס בלבד ללא בדיקה.",
        isCorrect: false,
        explanation:
          "שגוי: MNAR הוא הקשה ביותר לטיפול; מילוי באפס ללא הצדקה עלול להחמיר הטיה.",
      },
      {
        id: "inds-q06-opt4",
        plainText:
          "Imputation בממוצע מגדיל תמיד את ה-$R^2$ של כל מודל ולכן מומלץ כברירת מחדל.",
        isCorrect: false,
        explanation:
          "שגוי: אין ערובה לשיפור $R^2$; הממוצע עלול להסתיר אות ולפגוע בכיול.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "inds-q07-feature-scaling-standardization",
    domain: "סקיילינג של תכונות (Feature Scaling)",
    title: "מבוא למדעי הנתונים ופייתון - סקיילינג של תכונות (Feature Scaling)",
    context:
      "לפני אלגוריתמים הרגישים למרחק או לגרדיאנט (SVM, k-NN, רגרסיה לוגיסטית עם רגולריזציה, רשתות), מנרמלים תכונות. משווים Standardization ל-Min-Max scaling.",
    formulaLatex:
      "z = \\frac{x-\\mu}{\\sigma}, \\quad x' = \\frac{x-x_{\\min}}{x_{\\max}-x_{\\min}}",
    instruction:
      "מתי Standardization עדיף על Min-Max, ומדוע חובה ללמוד פרמטרי הסקיילינג על Train בלבד?",
    options: [
      {
        id: "inds-q07-opt1",
        plainText:
          "Min-Max תמיד עדיף כי הוא משמר נורמליות מדויקת של כל עמודה.",
        isCorrect: false,
        explanation:
          "שגוי: Min-Max אינו יוצר נורמליות; הוא דוחס ל-$[0,1]$ ורגיש לחריגים קיצוניים.",
      },
      {
        id: "inds-q07-opt2",
        plainText:
          "אין צורך בסקיילינג לעולם, כי כל המודלים אינם תלויים ביחידות המדידה.",
        isCorrect: false,
        explanation:
          "שגוי: מודלים מבוססי מרחק/רגולריזציה/$\\ell_2$ רגישים מאוד לסולם התכונות; עצים פחות רגישים.",
      },
      {
        id: "inds-q07-opt3",
        plainText:
          "Standardization עמיד יותר לחריגים יחסית ל-Min-Max ומתאים כשאין גבול טבעי לטווח; פרמטרי $\\mu,\\sigma$ (או min/max) נלמדים על Train בלבד ומוחלים על Val/Test — אחרת נוצרת דליפת סטטיסטיקות מהבדיקה.",
        isCorrect: true,
        explanation:
          "נכון: Min-Max נמעך כאשר יש outlier קיצוני. Standardization ממקם סביב 0 עם שונות 1 ומתאים לשיטות גרדיאנט/רגולריזציה. לימוד הסקיילינג על כל הדאטה כולל Test הוא סוג של leakage שכיח בצינורות מתחילים.",
      },
      {
        id: "inds-q07-opt4",
        plainText:
          "חובה לחשב $\\mu$ ו-$\\sigma$ על איחוד Train+Test כדי שהנרמול יהיה \"הוגן\" לכל הדאטה.",
        isCorrect: false,
        explanation:
          "שגוי: זה בדיוק Data Leakage — סטטיסטיקות Test אינן אמורות להשפיע על עיבוד האימון.",
      },
    ],
  },
  {
    id: "inds-q08-classification-f1-roc-auc",
    domain: "מדדי סיווג: $F_1$ ו-ROC-AUC",
    title: "מבוא למדעי הנתונים ופייתון - מדדי סיווג: $F_1$ ו-ROC-AUC",
    context:
      "בסיווג בינארי עם מחלקות לא-מאוזנות, Accuracy עלול להטעות. משתמשים ב-$F_1$ ובשטח מתחת לעקומת ROC.",
    formulaLatex:
      "F_1 = 2\\cdot\\frac{P\\cdot R}{P+R}, \\quad P=\\frac{\\mathrm{TP}}{\\mathrm{TP}+\\mathrm{FP}}, \\quad R=\\frac{\\mathrm{TP}}{\\mathrm{TP}+\\mathrm{FN}}, \\quad \\mathrm{ROC\\text{-}AUC}=\\int_0^1 \\mathrm{TPR}(\\mathrm{FPR})\\,d(\\mathrm{FPR})",
    instruction:
      "מתי $F_1$ מתאים יותר מ-Accuracy, ומה מבטא ROC-AUC מבחינת דירוג הסתברויות?",
    options: [
      {
        id: "inds-q08-opt1",
        plainText:
          "$F_1$ זהה תמיד ל-Accuracy, ולכן אין יתרון במחלקות לא-מאוזנות.",
        isCorrect: false,
        explanation:
          "שגוי: במחלקה נדירה, Accuracy גבוהה מתקבלת ממודל שחוזה תמיד את הרוב; $F_1$ רגיש ל-Precision/Recall של המחלקה הרלוונטית.",
      },
      {
        id: "inds-q08-opt2",
        plainText:
          "ROC-AUC מוגדר רק עבור רגרסיה רציפה ואינו ישים לסיווג.",
        isCorrect: false,
        explanation:
          "שגוי: ROC-AUC הוא מדד מרכזי לסיווג הסתברותי/דירוגי בינארי.",
      },
      {
        id: "inds-q08-opt3",
        plainText:
          "$F_1$ הוא ממוצע הרמוני של Precision ו-Recall ולכן מתאים כששני סוגי השגיאות חשובים במחלקה החיובית; ROC-AUC מודד איכות דירוג על פני כל ספי ההחלטה — ההסתברות שמקרה חיובי אקראי ידורג מעל מקרה שלילי אקראי.",
        isCorrect: true,
        explanation:
          "נכון: הממוצע ההרמוני נענש חזק כאשר אחד מ-$P$ או $R$ נמוך. ROC-AUC אינטגרלי על עקומת TPR מול FPR ופחות תלוי בסף בודד. באי-איזון קיצוני לעיתים מעדיפים גם PR-AUC, אך $F_1$ ו-ROC-AUC הם כלי יסוד באבחון מודלי סיווג.",
      },
      {
        id: "inds-q08-opt4",
        plainText:
          "ערך $F_1=1$ מתקבל תמיד כאשר ROC-AUC $=0.5$, כי שני המדדים שקולים.",
        isCorrect: false,
        explanation:
          "שגוי: ROC-AUC $=0.5$ הוא ניחוש אקראי; $F_1=1$ דורש Precision ו-Recall מושלמים — המדדים אינם שקולים.",
      },
    ],
  },
  {
    id: "inds-q09-overfitting-detection-regularization",
    domain: "זיהוי Overfitting ובקרה",
    title: "מבוא למדעי הנתונים ופייתון - זיהוי Overfitting ובקרה",
    context:
      "עקומות למידה מראות שגיאת אימון נמוכה מאוד ושגיאת אימות גבוהה. שוקלים Early Stopping, רגולריזציה, הגדלת מדגם והקטנת סיבוכיות.",
    formulaLatex:
      "L_{\\text{reg}}(w)=L_{\\text{emp}}(w)+\\lambda\\|w\\|_p^p, \\quad p\\in\\{1,2\\}",
    instruction:
      "איזו אבחנה והתערבות מתארות נכון התמודדות עם Overfitting במדעי הנתונים?",
    options: [
      {
        id: "inds-q09-opt1",
        plainText:
          "אם שגיאת האימון גבוהה ושגיאת האימות נמוכה, זהו Overfitting קלאסי.",
        isCorrect: false,
        explanation:
          "שגוי: זהו תיאור הפוך (ולמעשה בלתי-טיפוסי); Overfitting = אימון טוב, הכללה גרועה.",
      },
      {
        id: "inds-q09-opt2",
        plainText:
          "הפתרון היחיד ל-Overfitting הוא להסיר את קבוצת ה-Test מהצינור.",
        isCorrect: false,
        explanation:
          "שגוי: הסרת Test אינה פתרון ל-Overfitting ואינה מחליפה רגולריזציה/פישוט/עוד נתונים.",
      },
      {
        id: "inds-q09-opt3",
        plainText:
          "פער גדול בין ביצועי Train ל-Validation מעיד על Overfitting; מטפלים בהקטנת סיבוכיות, הגדלת $\\lambda$, Dropout/Early Stopping, או איסוף נתונים נוספים — תוך מעקב אחרי Validation ולא אחרי Test בזמן הפיתוח.",
        isCorrect: true,
        explanation:
          "נכון: האבחנה היא פער הכללה. הרגולריזציה מגבילה את נורמת המשקלים; Early Stopping עוצר לפני שיעתוק רעש. חשוב לא \"לכוון\" לפי Test, כדי לשמור על הערכת הכללה אמינה.",
      },
      {
        id: "inds-q09-opt4",
        plainText:
          "Overfitting נפתר תמיד על ידי הגדלת מספר הפרמטרים עד ששגיאת האימות מתאפסת.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת סיבוכיות מחמירה בדרך כלל Overfitting במדגם סופי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "inds-q10-reproducibility-seeds-pipeline",
    domain: "שחזוריות (Reproducibility)",
    title: "מבוא למדעי הנתונים ופייתון - שחזוריות (Reproducibility)",
    context:
      "ניסוי מדעי-נתונים כולל דגימה אקראית, פיצול נתונים, אתחול משקלים וספריות לא-דטרמיניסטיות. רוצים שתוצאות יהיו ניתנות לשחזור בין הרצות ומכונות.",
    formulaLatex:
      "\\texttt{seed} = s \\implies \\text{RNG streams aligned for split / init / sampling}",
    instruction:
      "אילו פרקטיקות חיוניות לשחזוריות בניסויי Data Science בפייתון?",
    options: [
      {
        id: "inds-q10-opt1",
        plainText:
          "מספיק להדפיס את ה-$Accuracy$ הסופית; אין צורך בתיעוד גרסאות או זרעים.",
        isCorrect: false,
        explanation:
          "שגוי: ללא seed, גרסאות ספריות וצינור קבוע, אי אפשר לשחזר או לאמת תוצאות.",
      },
      {
        id: "inds-q10-opt2",
        plainText:
          "שחזוריות דורשת להריץ תמיד על GPU שונה בכל ניסוי כדי \"לממוצע רעש חומרה\".",
        isCorrect: false,
        explanation:
          "שגוי: שינוי חומרה מגדיל שונות; לשחזוריות שואפים לקבע סביבה, לא לערבב GPUs.",
      },
      {
        id: "inds-q10-opt3",
        plainText:
          "אסור לקבע seed כי זה פוגע בתוקף הסטטיסטי של כל מבחן השערה.",
        isCorrect: false,
        explanation:
          "שגוי: קביעת seed אינה שקולה לזיוף תוצאות; היא מאפשרת שחזור. תוקף סטטיסטי מגיע מתכנון ניסוי ודגימה נכונים.",
      },
      {
        id: "inds-q10-opt4",
        plainText:
          "קובעים seeds לכל מחולל אקראי (NumPy, random, מסגרת ה-ML), מתעדים גרסאות חבילות/קוד, מפרידים עיבוד מאימון בצינור דטרמיניסטי ככל האפשר, ושומרים קונפיגורציה — כך שאותו קלט יניב אותה חלוקה ואותם מדדים בהרצה חוזרת.",
        isCorrect: true,
        explanation:
          "נכון: Reproducibility היא דרישת ליבה במחקר ובפרודקציה. בנוסף ל-seeds יש לנהל environment lock (למשל קובץ תלויות), לוגים, וגרסאות נתונים. בסביבות GPU ייתכן אי-דטרמיניזם נוסף שדורש הגדרות ייעודיות.",
      },
    ],
  },
  {
    id: "inds-q11-data-leakage-preprocessing",
    domain: "דליפת מידע (Data Leakage)",
    title: "מבוא למדעי הנתונים ופייתון - דליפת מידע (Data Leakage)",
    context:
      "סטודנט מחשב סטנדרטיזציה ובחירת תכונות על כל המאגר, ואז מפצל ל-Train/Test ומדווח CV גבוה במיוחד.",
    formulaLatex:
      "\\text{Leakage if } \\mathrm{Preprocess}(\\mathcal{D}_{\\text{train}}\\cup\\mathcal{D}_{\\text{test}}) \\text{ precedes split}",
    instruction:
      "מהו הכשל המתודולוגי, ומה הפרקטיקה הנכונה בצינור?",
    options: [
      {
        id: "inds-q11-opt1",
        plainText:
          "אין כשל: עיבוד על כל הדאטה מבטיח ש-Test ו-Train באותו סולם ולכן הוגן יותר.",
        isCorrect: false,
        explanation:
          "שגוי: \"הוגנות\" לכאורה זו מזרימה מידע מ-Test לאימון ויוצרת אופטימיות מטעה.",
      },
      {
        id: "inds-q11-opt2",
        plainText:
          "הכשל הוא רק חישובי (איטיות), אך ההערכה הסטטיסטית נותרת חסרת הטיה.",
        isCorrect: false,
        explanation:
          "שגוי: הבעיה אינה מהירות אלא הטיה אופטימית חמורה באומדן ההכללה.",
      },
      {
        id: "inds-q11-opt3",
        plainText:
          "דליפה מתרחשת רק כאשר מעתיקים תוויות מ-Test ל-Train במפורש, לא בעיבוד מוקדם.",
        isCorrect: false,
        explanation:
          "שגוי: גם Target Leakage וגם Leakage דרך סטטיסטיקות עיבוד/בחירת תכונות הם דליפה.",
      },
      {
        id: "inds-q11-opt4",
        plainText:
          "התרחשה Data Leakage: סטטיסטיקות וסינון תכונות ראו את Test. יש לפצל קודם (או בתוך כל Fold), ללמוד עיבוד על Train בלבד, ולהחיל Transform על Val/Test — אחרת מדדי הביצועים אינם מייצגים הכללה אמיתית.",
        isCorrect: true,
        explanation:
          "נכון: זהו אחד הכשלים השכיחים ביותר בקורסי מבוא. Pipeline נכון עוטף את כל שלבי ה-preprocessing בתוך Cross-Validation, כך שכל Fold רואה רק את נתוני האימון של עצמו בעת לימוד הטרנספורמציה.",
      },
    ],
  },
  {
    id: "inds-q12-hypothesis-testing-ds-basics",
    domain: "יסודות בדיקת השערות במדעי נתונים",
    title: "מבוא למדעי הנתונים ופייתון - יסודות בדיקת השערות במדעי נתונים",
    context:
      "משווים המרה (Conversion) בין גרסת אתר A ל-B על מדגמים בלתי-תלויים. מגדירים $H_0$: אין הבדל בשיעורי ההצלחה, מול $H_1$: יש הבדל. משתמשים ברמת מובהקות $\\alpha$.",
    formulaLatex:
      "p = P(\\text{data as extreme}\\mid H_0), \\quad \\text{reject } H_0 \\text{ if } p < \\alpha",
    instruction:
      "מהי פרשנות נכונה של $p$-value במסגרת ניסוי A/B במדעי נתונים, ומהי טעות נפוצה?",
    options: [
      {
        id: "inds-q12-opt1",
        plainText:
          "$p$-value הוא ההסתברות ש-$H_0$ נכונה לאחר שראינו את הנתונים, כלומר $P(H_0\\mid\\text{data})$.",
        isCorrect: false,
        explanation:
          "שגוי: זו פרשנות בייסיאנית שגויה ל-$p$-value השכיח; $p$-value הוא $P(\\text{extreme}\\mid H_0)$, לא ההפך.",
      },
      {
        id: "inds-q12-opt2",
        plainText:
          "אם $p<\\alpha$ אז גודל האפקט בהכרח גדול ומעשי (Practical Significance).",
        isCorrect: false,
        explanation:
          "שגוי: מובהקות סטטיסטית אינה זהה לחשיבות מעשית; במדגם ענק גם אפקט זעיר יכול להיות מובהק.",
      },
      {
        id: "inds-q12-opt3",
        plainText:
          "כשלון בדחיית $H_0$ מוכיח בוודאות ששתי הגרסאות זהות לחלוטין.",
        isCorrect: false,
        explanation:
          "שגוי: אי-דחייה אינה הוכחת $H_0$; ייתכן חוסר עוצמה (Power) או אפקט קטן.",
      },
      {
        id: "inds-q12-opt4",
        plainText:
          "$p$-value מודד עד כמה הנתונים קיצוניים תחת $H_0$; דחייה כאשר $p<\\alpha$ שולטת בשיעור טעויות מסוג I בטווח הארוך. יש ללוות ברווח סמך/גודל אפקט, לתכנן גודל מדגם מראש, ולהימנע מ-p-hacking — אחרת מובהקות מדווחת אינה אמינה.",
        isCorrect: true,
        explanation:
          "נכון: במדעי נתונים יישומיים, בדיקת השערות היא כלי לסינון רעש דגימה — לא תחליף לחשיבה על גודל אפקט, עלויות שגיאה ותקפות חיצונית. דיווח אחראי כולל CI, תיקון להשוואות מרובות בעת הצורך, ופריירג׳יסטרציה של מדדים.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_INTRO_DS_QUESTIONS = INTRO_DATA_SCIENCE_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from EDA / split / bias-variance (Q1–3, key A)
 * - 1 from CV / pandas-numpy / missing data (Q4–6, key B)
 * - 1 from scaling / F1-ROC / overfitting / reproducibility / leakage / hypothesis (Q7–12, keys C–D)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleIntroDataScienceOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = INTRO_DATA_SCIENCE_QUESTIONS.slice(0, 3);
  const groupB = INTRO_DATA_SCIENCE_QUESTIONS.slice(3, 6);
  const groupC = INTRO_DATA_SCIENCE_QUESTIONS.slice(6, 12);

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
