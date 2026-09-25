export type DiagnosticTrackType =
  | "BAGRUT"
  | "ACADEMIC"
  | "MECHINA"
  | "PSYCHOMETRIC"
  | "SCREENING_INST";

export interface TrackMeta {
  id: DiagnosticTrackType;
  title: string;
  subtitle: string;
  icon: string;
  tag: string;
}

export const TRACK_OPTIONS: TrackMeta[] = [
  {
    id: "BAGRUT",
    title: "בגרויות ותיכון (משרד החינוך)",
    subtitle: "הכנה לשאלוני בגרות רשמיים, שיפור יחידות וסגירת פערים מהיסוד",
    icon: "בג",
    tag: "3/4/5 יח״ל",
  },
  {
    id: "ACADEMIC",
    title: "אקדמיה וטכניון (סטנדרט אוניברסיטאי)",
    subtitle: "קורסי ליבה במדעים מדויקים, הנדסה, מדמ״ח, כלכלה ורפואה לפי מספרי קטלוג",
    icon: "אק",
    tag: "שנים א׳-ד׳",
  },
  {
    id: "MECHINA",
    title: "מכינות קדם-אקדמיות",
    subtitle: "הכנה ממוקדת לקדם-הנדסה, מדעים מדויקים, מכינת 30+ ותנאי קבלה",
    icon: "מכ",
    tag: "תנאי סף וקבלה",
  },
  {
    id: "PSYCHOMETRIC",
    title: "פסיכומטרי ומבחני מאלו״ו (NITE)",
    subtitle: "בחינה פסיכומטרית, אמיר״ם/אמי״ר (פטור אנגלית), יע״ל/יע״ל-נט ומימ״ד",
    icon: "פסי",
    tag: "ארצי (מאלו״ו)",
  },
  {
    id: "SCREENING_INST",
    title: "מכוני מיון, צו ראשון וביטחון",
    subtitle: "דפ״ר צה״ל, ירפ״א טיס, קינן-שפי, אדם-מילא, פילת, SHL, CCAT ומו״ר",
    icon: "מיון",
    tag: "מבחני מיון מתקדמים",
  },
];

/* -------------------------------------------------------------------------- */
/* TRACK 1: BAGRUT (בגרויות - שאלוני משרד החינוך)                              */
/* -------------------------------------------------------------------------- */

export interface BagrutSubject {
  id: string;
  name: string;
  units: {
    unitCount: number;
    label: string;
    examPapers: Array<{ code: string; name: string }>;
  }[];
}

export const BAGRUT_SUBJECTS: BagrutSubject[] = [
  {
    id: "math",
    name: "מתמטיקה",
    units: [
      {
        unitCount: 5,
        label: "5 יחידות לימוד (מואץ/מצוינות)",
        examPapers: [
          { code: "35581", name: "שאלון 35581 (581 - אלגברה, טריגו, גיאומטריה, חדו״א, הסתברות)" },
          { code: "35582", name: "שאלון 35582 (582 - וקטורים, מרוכבים, אנליטית, מעריכיות ולוגים)" },
          { code: "ALL_5", name: "כלל שאלוני 5 יח״ל (מיקוד מלא 581 + 582)" },
        ],
      },
      {
        unitCount: 4,
        label: "4 יחידות לימוד",
        examPapers: [
          { code: "35481", name: "שאלון 35481 (481 - אלגברה, הסתברות, טריגו, חדו״א)" },
          { code: "35482", name: "שאלון 35482 (482 - טריגו במרחב, מעריכיות, לוגריתמים וחדו״א)" },
          { code: "ALL_4", name: "כלל שאלוני 4 יח״ל (מיקוד מלא 481 + 482)" },
        ],
      },
      {
        unitCount: 3,
        label: "3 יחידות לימוד",
        examPapers: [
          { code: "35182", name: "שאלון 35182 (801 - צבירה א׳)" },
          { code: "35381", name: "שאלון 35381 (802 - צבירה ב׳)" },
          { code: "35382", name: "שאלון 35382 (803 - צבירה ג׳)" },
          { code: "ALL_3", name: "כלל שאלוני 3 יח״ל (צבירה מלאה)" },
        ],
      },
    ],
  },
  {
    id: "physics",
    name: "פיזיקה",
    units: [
      {
        unitCount: 5,
        label: "5 יחידות לימוד",
        examPapers: [
          { code: "036581", name: "מכניקה (שאלון 036581 / 5381)" },
          { code: "036582", name: "חשמל ומגנטיות (שאלון 036582 / 5382)" },
          { code: "036583", name: "קרינה וחומר / אופטיקה ופיזיקה מודרנית (שאלון 036583 / 5383)" },
          { code: "036586", name: "מעבדת חקר בפיזיקה (שאלון 036586)" },
          { code: "ALL_PHYS", name: "כלל שאלוני פיזיקה 5 יח״ל" },
        ],
      },
    ],
  },
  {
    id: "cs",
    name: "מדעי המחשב",
    units: [
      {
        unitCount: 5,
        label: "5 יחידות לימוד",
        examPapers: [
          {
            code: "899381",
            name: "שאלון ראשון — יסודות ותכנות מונחה עצמים",
          },
          {
            code: "899282",
            name: "שאלון שני — מבני נתונים ומודלים חישוביים",
          },
        ],
      },
    ],
  },
  {
    id: "english",
    name: "אנגלית",
    units: [
      {
        unitCount: 5,
        label: "5 יחידות לימוד (Modules E, F, G)",
        examPapers: [
          { code: "016115", name: "Module E (016115 - הבנת הנשמע והנקרא)" },
          { code: "016116", name: "Module F (016116 - ספרות אנגלית וחיבור)" },
          { code: "016117", name: "Module G (016117 - הבנת הנקרא וכתיבה ממזגת)" },
          { code: "ALL_ENG_5", name: "אנגלית 5 יח״ל מלא (E+F+G + בגרות בע״פ)" },
        ],
      },
      {
        unitCount: 4,
        label: "4 יחידות לימוד (Modules C, D, E)",
        examPapers: [
          { code: "016113", name: "Module C (016113)" },
          { code: "016114", name: "Module D (016114 - ספרות)" },
          { code: "016115", name: "Module E (016115)" },
          { code: "ALL_ENG_4", name: "אנגלית 4 יח״ל מלא (C+D+E)" },
        ],
      },
      {
        unitCount: 3,
        label: "3 יחידות לימוד (Modules A, B, C)",
        examPapers: [
          { code: "016111", name: "Module A (016111)" },
          { code: "016112", name: "Module B (016112)" },
          { code: "016113", name: "Module C (016113)" },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "כימיה",
    units: [
      {
        unitCount: 5,
        label: "5 יחידות לימוד",
        examPapers: [
          { code: "037381", name: "שאלון עיוני ליבה (037381 - 3 יח״ל בסיס: מבנה, קישור, תרמודינמיקה, שיווי משקל)" },
          { code: "037387", name: "שאלון השלמה ל-5 יח״ל ומעבדת חקר (037387 - תרכובות פחמן, ביוכימיה ומעבדה)" },
          { code: "ALL_CHEM", name: "כימיה 5 יח״ל מלא" },
        ],
      },
    ],
  },
  {
    id: "biology",
    name: "ביולוגיה",
    units: [
      {
        unitCount: 5,
        label: "5 יחידות לימוד",
        examPapers: [
          { code: "043381", name: "שאלון עיוני ליבה (043381 - גוף האדם, התא, אקולוגיה)" },
          { code: "043387", name: "ביוחקר ומעבדת חקר מעשית (043387)" },
          { code: "ALL_BIO", name: "ביולוגיה 5 יח״ל מלא" },
        ],
      },
    ],
  },
  {
    id: "hebrew_lang",
    name: "עברית / לשון והבעה",
    units: [
      {
        unitCount: 2,
        label: "2 יחידות לימוד (חובה)",
        examPapers: [
          {
            code: "HEBREW_1",
            name: "שאלון ראשון — מערכת הצורות, תחביר, פיסוק ושם המספר",
          },
          {
            code: "HEBREW_2",
            name: "שאלון שני — הבנת הנקרא, מבנה טיעון, ניבים וסמנטיקה",
          },
        ],
      },
    ],
  },
  {
    id: "civics",
    name: "אזרחות",
    units: [
      {
        unitCount: 2,
        label: "2 יחידות לימוד (חובה)",
        examPapers: [
          {
            code: "34281",
            name: "שאלון ראשון",
          },
          {
            code: "34282",
            name: "שאלון שני",
          },
        ],
      },
    ],
  },
  {
    id: "history",
    name: "היסטוריה",
    units: [
      {
        unitCount: 2,
        label: "2 יחידות לימוד (חובה)",
        examPapers: [
          {
            code: "22261",
            name: "שאלון ראשון",
          },
          {
            code: "22262",
            name: "שאלון שני",
          },
        ],
      },
    ],
  },
  {
    id: "bible",
    name: "תנ״ך",
    units: [
      {
        unitCount: 2,
        label: "2 יחידות לימוד (חובה)",
        examPapers: [
          // Single unified theoretical questionnaire — never surface paper codes in UI
          { code: "BIBLE", name: "שאלון עיוני" },
        ],
      },
    ],
  },
  {
    id: "literature",
    name: "ספרות",
    units: [
      {
        unitCount: 2,
        label: "2 יחידות לימוד (חובה)",
        examPapers: [
          // Single unified theoretical questionnaire — never surface paper codes in UI
          { code: "LITERATURE", name: "שאלון עיוני" },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* TRACK 2: ACADEMIC (אקדמיה - קטלוג הטכניון ואוניברסיטאות המחקר)            */
/* -------------------------------------------------------------------------- */

export interface DegreeField {
  id: string;
  name: string;
  facultyCode?: string;
  years: {
    yearId: string;
    label: string;
    courses: string[];
  }[];
}

export const ACADEMIC_DEGREE_FIELDS: DegreeField[] = [
  {
    id: "cs_sw_eng",
    name: "הנדסת תוכנה ומדעי המחשב",
    facultyCode: "CS",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "חדו״א / אינפי",
          "חדו״א 2 / אינפי 2",
          "אלגברה ליניארית 1",
          "אלגברה ליניארית 2",
          "מתמטיקה בדידה",
          "מבוא למדעי המחשב",
          "פיזיקה 1 - מכניקה",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "מבני נתונים (234218)",
          "אלגוריתמים 1 (234247)",
          "מודלים חישוביים ואוטומטים",
          "תורת החישוב וסיבוכיות",
          "מבנה מחשבים וארכיטקטורה",
          "מערכות ספרתיות ותכן לוגי",
          "מערכות הפעלה",
          "תכנות מונחה עצמים ומתקדם",
          "הסתברות וסטטיסטיקה מ (094412)",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "קומפילציה ושפות תכנות",
          "מבוא ללמידת מכונה",
          "למידת מכונה מתקדמת",
          "למידה עמוקה",
          "כריית נתונים וטקסט",
          "רשתות תקשורת מחשבים",
          "מערכות מבוזרות ומחשוב ענן",
          "ראייה ממוחשבת ועיבוד תמונה",
          "בסיסי נתונים",
          "בסיסי נתונים מתקדמים ומערכות NoSQL",
          "ניתוח, תכן וארכיטקטורת מערכות מידע",
          "תכנון וניתוח אלגוריתמים (236360)",
          "אבטחת מידע וקריפטוגרפיה",
          "אבטחת מערכות מידע וניהול סיכונים",
          "הנדסת דרישות וממשקי משתמש (UI/UX)",
          "חקר ביצועים 2 (מודלים סטוכסטיים ותורת התורים)",
          "אופטימיזציה רציפה ולא-ליניארית",
          "אלגוריתמים לנתוני עתק (Big Data)",
        ],
      },
    ],
  },
  {
    id: "electrical_eng",
    name: "הנדסת חשמל ומחשבים",
    facultyCode: "EE",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "חדו״א / אינפי",
          "חדו״א 2 / אינפי 2",
          "אלגברה ליניארית 1",
          "אלגברה ליניארית 2",
          "פיזיקה 1 - מכניקה",
          "פיזיקה 2 - חשמל ומגנטיות",
          "מבוא להנדסת חשמל ומעגלים (044101)",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "משוואות דיפרנציאליות ת (104035)",
          "משוואות דיפרנציאליות חלקיות וטורי פורייה",
          "פונקציות מרוכבות והתמרות אינטגרליות",
          "אותות ומערכות",
          "תורת הבקרה ומערכות ליניאריות",
          "מבוא ללמידת מכונה",
          "גלים ושדות אלקטרומגנטיים",
          "התקני מוליכים למחצה",
          "מעגלים אלקטרוניים אנלוגיים וספרתיים",
          "מערכות ספרתיות ותכן לוגי",
          "תהליכים אקראיים והסתברות (044201)",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "למידה עמוקה",
          "עיבוד אותות ספרתי - DSP (044198)",
          "תקשורת ספרתית",
          "מבנה מחשבים וארכיטקטורה",
          "מערכות הפעלה",
          "תורת החישוב וסיבוכיות",
          "רשתות תקשורת מחשבים",
          "ראייה ממוחשבת ועיבוד תמונה",
          "מיקרוגלים ואופטיקה (044167)",
          "אלקטרואופטיקה ולייזרים (044191)",
          "המרת אנרגיה ומערכות הספק",
          "אופטימיזציה רציפה ולא-ליניארית",
        ],
      },
    ],
  },
  {
    id: "mech_eng",
    name: "הנדסה מכנית",
    facultyCode: "ME",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "חדו״א / אינפי",
          "חדו״א 2 / אינפי 2",
          "אלגברה ליניארית 1",
          "אלגברה ליניארית 2",
          "פיזיקה 1 - מכניקה",
          "כימיה כללית (125001)",
          "גרפיקה הנדסית ותכן בעזרת מחשב - CAD (034032)",
          "סטטיקה וחוזק חומרים",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "קינמטיקה ודינמיקה של גופים ומנגנונים",
          "סטטיקה וחוזק חומרים",
          "סטטיקה של מבנים",
          "תרמודינמיקה הנדסית",
          "משוואות דיפרנציאליות רגילות להנדסה (104035)",
          "משוואות דיפרנציאליות חלקיות וטורי פורייה",
          "פיזיקה 2 - חשמל ומגנטיות",
          "תורת החומרים (034005)",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "מכניקת זורמים",
          "מעבר חום ומעבר מסה",
          "תורת התנודות והרעידות (034029)",
          "אלמנטים סופיים - FEM (034038)",
          "תכן מכני",
          "תמחור ובקרת עלויות הנדסית",
          "תורת הבקרה ומערכות ליניאריות",
          "בקרה ספרתית ורובוטיקה (034042)",
          "מעבדה להנדסת מכונות (034040)",
          "פרויקט תכן גמר (034046)",
        ],
      },
    ],
  },
  {
    id: "civil_eng",
    name: "הנדסה אזרחית",
    facultyCode: "CE",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "חדו״א / אינפי",
          "חדו״א 2 / אינפי 2",
          "אלגברה ליניארית 1",
          "אלגברה ליניארית 2",
          "פיזיקה 1 - מכניקה",
          "סטטיקה וחוזק חומרים",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "סטטיקה של מבנים",
          "מכניקת זורמים",
          "משוואות דיפרנציאליות רגילות",
          "משוואות דיפרנציאליות חלקיות וטורי פורייה",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "תמחור ובקרת עלויות הנדסית",
        ],
      },
    ],
  },
  {
    id: "ie_mgmt",
    name: "הנדסת תעשייה וניהול",
    facultyCode: "IE",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "חדו״א / אינפי",
          "חדו״א 2 / אינפי 2",
          "אלגברה ליניארית 1",
          "אלגברה ליניארית 2",
          "פיזיקה 1 - מכניקה",
          "עקרונות תכנות ופייתון (094219)",
          "הסתברות (094412)",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "סטטיסטיקה להנדסה (094424)",
          "מודלים סטטיסטיים ורגרסיה ליניארית ומיושמת",
          "חקר ביצועים",
          "חקר ביצועים 2 (מודלים סטוכסטיים ותורת התורים)",
          "תמחור ובקרת עלויות הנדסית",
          "תורת הארגון והתנהגות ארגונית (094115)",
          "הנדסת שיטות וארגונומיה",
          "בסיסי נתונים",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "תכנון ופיקוח הייצור (תפ״י)",
          "סימולציה של מערכות ייצור ושירות",
          "שרשרת אספקה ולוגיסטיקה (094503)",
          "תורת המשחקים ומודלים כלכליים (094320)",
          "ניהול איכות ושיטות שש-סיגמא",
          "תכנון מערכי מפעל ומתקנים (094140)",
          "אופטימיזציה רציפה ולא-ליניארית",
        ],
      },
    ],
  },
  {
    id: "info_systems",
    name: "הנדסת מערכות מידע",
    facultyCode: "IS",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "חדו״א / אינפי",
          "חדו״א 2 / אינפי 2",
          "אלגברה ליניארית 1",
          "אלגברה ליניארית 2",
          "מתמטיקה בדידה",
          "מבוא למדעי המחשב",
          "הסתברות וסטטיסטיקה (094412)",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "מבני נתונים (234218)",
          "בסיסי נתונים",
          "מערכות הפעלה",
          "תכנות מונחה עצמים ומתקדם",
          "סטטיסטיקה להנדסה (094424)",
          "קומפילציה ושפות תכנות",
          "ניתוח, תכן וארכיטקטורת מערכות מידע",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "אלגוריתמים לנתוני עתק (Big Data)",
          "כריית נתונים וטקסט",
          "בסיסי נתונים מתקדמים ומערכות NoSQL",
          "בינה עסקית ו-BI (096210)",
          "מערכות מבוזרות ומחשוב ענן",
          "אבטחת מידע וקריפטוגרפיה",
          "אבטחת מערכות מידע וניהול סיכונים",
          "הנדסת דרישות וממשקי משתמש (UI/UX)",
          "תמחור ובקרת עלויות הנדסית",
        ],
      },
    ],
  },
  {
    id: "data_science",
    name: "מדעי הנתונים (Data Science)",
    facultyCode: "DS",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "חדו״א / אינפי",
          "חדו״א 2 / אינפי 2",
          "אלגברה ליניארית 1",
          "אלגברה ליניארית 2",
          "מבוא למדעי הנתונים ופייתון",
          "הסתברות וסטטיסטיקה מתמטית",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "מבני נתונים ואלגוריתמים",
          "תכנות מונחה עצמים ומתקדם",
          "מודלים סטטיסטיים ורגרסיה ליניארית ומיושמת",
          "מבוא ללמידת מכונה",
          "בסיסי נתונים",
          "משוואות דיפרנציאליות ואופטימיזציה",
          "חקר ביצועים",
          "חקר ביצועים 2 (מודלים סטוכסטיים ותורת התורים)",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "למידה עמוקה",
          "למידת מכונה מתקדמת",
          "כריית נתונים וטקסט",
          "עיבוד שפה טבעית (NLP)",
          "ראייה ממוחשבת ועיבוד תמונה",
          "אופטימיזציה רציפה ולא-ליניארית",
          "אלגוריתמים לנתוני עתק (Big Data)",
          "בסיסי נתונים מתקדמים ומערכות NoSQL",
          "סימולציה של מערכות ייצור ושירות",
        ],
      },
    ],
  },
  {
    id: "econ_business",
    name: "כלכלה, מנהל עסקים וחשבונאות",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "מבוא למיקרו-כלכלה",
          "מבוא למאקרו-כלכלה",
          "מתמטיקה לכלכלנים 1 (חדו״א)",
          "מתמטיקה לכלכלנים 2 (אלגברה ופונקציות מרובות משתנים)",
          "סטטיסטיקה א׳ (הסתברות ומשתנים מקריים)",
          "יסודות החשבונאות ודיווח כספי",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "תורת המחירים (מיקרו-כלכלה תיאורטית א׳+ב׳)",
          "מאקרו-כלכלה תיאורטית א׳+ב׳",
          "סטטיסטיקה ב׳ (הסקה סטטיסטית ובדיקת השערות)",
          "אקונומטריקה 1+2 (מודלים של רגרסיה וסדרות עתיות)",
          "תורת המימון ושוק ההון",
          "חשבונאות פיננסית מתקדמת (IFRS)",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "תורת המשחקים וארגון תעשייתי",
          "הערכת שווי חברות וניירות ערך",
          "כלכלת ישראל וסחר בינלאומי",
          "ניהול פיננסי בינלאומי",
          "ביקורת חשבונות ומיסוי חברות",
        ],
      },
    ],
  },
  {
    id: "life_med_sciences",
    name: "רפואה, פרה-מדיקל ומדעי החיים",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "ביולוגיה של התא",
          "כימיה כללית ואנליטית",
          "כימיה אורגנית 1",
          "פיזיקה לרפואה ולמדעי החיים",
          "מתמטיקה וסטטיסטיקה רפואית",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "ביוכימיה 1+2 (מטבוליזם ומבנה חלבונים)",
          "גנטיקה כללית ומולקולרית",
          "אנטומיה ופיזיולוגיה של האדם 1+2",
          "מיקרוביולוגיה כללית ואימונולוגיה",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "פרמקולוגיה כללית וקלינית",
          "פתולוגיה כללית ומערכתית",
          "נוירוביולוגיה ומדעי המוח",
          "ביולוגיה מולקולרית מתקדמת וגנומיקה",
        ],
      },
    ],
  },
  {
    id: "psychology_social",
    name: "פסיכולוגיה ומדעי החברה",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "מבוא לפסיכולוגיה",
          "סטטיסטיקה לפסיכולוגים א׳ (תיאורית והסתברות)",
          "שיטות מחקר בפסיכולוגיה ומדעי ההתנהגות",
          "פסיכולוגיה פיזיולוגית (מדעי המוח והתנהגות)",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "סטטיסטיקה לפסיכולוגים ב׳ (היסקית ורגרסיות)",
          "פסיכולוגיה קוגניטיבית (קשב, זיכרון, תפיסה)",
          "פסיכולוגיה התפתחותית (מינקות לבגרות)",
          "פסיכולוגיה חברתית",
          "תורות אישיות",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "פסיכופתולוגיה (פסיכולוגיה אבנורמלית)",
          "מבחנים והערכה פסיכולוגית (פסיכודיאגנוסטיקה)",
          "פסיכולוגיה קלינית ושיטות טיפול",
          "סמינר מחקר אמפירי",
        ],
      },
    ],
  },
  {
    id: "law",
    name: "משפטים (LL.B)",
    years: [
      {
        yearId: "YEAR_A",
        label: "שנה א׳",
        courses: [
          "דיני חוזים",
          "משפט חוקתי",
          "דיני עונשין",
          "תורת המשפט (יוריספרודנציה)",
          "מבוא למשפט ישראלי ומקורות המשפט",
        ],
      },
      {
        yearId: "YEAR_B",
        label: "שנה ב׳",
        courses: [
          "דיני נזיקין",
          "משפט מנהלי",
          "דיני קניין",
          "דיני תאגידים וחברות",
          "דיני משפחה וירושה",
        ],
      },
      {
        yearId: "YEAR_C_D",
        label: "שנה ג׳ / ד׳",
        courses: [
          "סדר דין אזרחי (סד״א)",
          "סדר דין פלילי (סד״פ)",
          "דיני ראיות",
          "דיני עבודה",
          "דיני מיסים",
          "משפט בינלאומי פומבי ופרטי",
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* TRACK 3: MECHINA (מכינות קדם-אקדמיות)                                      */
/* -------------------------------------------------------------------------- */

export const MECHINA_SUBJECTS = [
  "מתמטיקה (רמת 5 יח״ל / קדם-הנדסה ומדעים מדויקים)",
  "מתמטיקה (רמת 4 יח״ל / מדעי החברה, רוח וניהול)",
  "פיזיקה - מכניקה למכינות",
  "פיזיקה - חשמל ומגנטיות למכינות",
  "אנגלית אקדמית למכינות (רמות פטור / מתקדמים A/B)",
  "כתיבה מדעית, הבעה ומיומנויות למידה אקדמיות",
  "כימיה למכינות טבע, הנדסה ביוכימית ורפואה",
];

export const MECHINA_TRACK_TYPES = [
  "מכינה ייעודית למדעים מדויקים והנדסה (טכניון, ת״א, בן-גוריון, העברית, בר-אילן, אריאל)",
  "מכינה למדעי החברה, הרוח, מנהל עסקים וכלכלה",
  "מכינת 30+ (חסרי תעודת בגרות מעל גיל 30 לקראת תואר ראשון)",
  "מכינת השלמת ושיפור תעודת בגרות מלאה",
  "מכינה ייעודית לקבלה לרפואה, פרה-מדיקל ומקצועות הבריאות",
  "מכינה ייעודית לעולים חדשים / המגזר החרדי / החברה הערבית",
];

/* -------------------------------------------------------------------------- */
/* TRACK 4: PSYCHOMETRIC & NITE/MALOV TESTS (פסיכומטרי, מאלו״ו)               */
/* -------------------------------------------------------------------------- */

export const PSYCHOMETRIC_EXAM_TYPES = [
  "בחינה פסיכומטרית סטנדרטית (עברית)",
  "בחינה פסיכומטרית בשפות (ערבית, רוסית, צרפתית, אנגלית / משולב)",
  "מבחן אמיר״ם / אמי״ר (מיון רמות באנגלית לקראת פטור אקדמי)",
  "מבחן יע״ל / יע״ל-נט (ידע בעברית לנבחנים בשפה שאינה עברית)",
  "מבחן מימ״ד (מיון למכינות קדם-אקדמיות)",
];

export const PSYCHOMETRIC_TEST_SESSIONS = [
  "מועד אביב (מרץ / אפריל 2026)",
  "מועד קיץ (יולי 2026)",
  "מועד סתיו (ספטמבר / אוקטובר 2026)",
  "מועד חורף (דצמבר 2026)",
  "מועד עתידי / טרם נקבע",
];

export const HS_UNIT_OPTIONS = [
  { val: 5, label: "5 יחידות לימוד" },
  { val: 4, label: "4 יחידות לימוד" },
  { val: 3, label: "3 יחידות לימוד" },
];

/* -------------------------------------------------------------------------- */
/* TRACK 5: SCREENING & PLACEMENT (מכוני מיון, צו ראשון, גופים ביטחוניים)      */
/* -------------------------------------------------------------------------- */

export interface ScreeningSector {
  id: string;
  name: string;
  institutes: {
    id: string;
    name: string;
    batteries: string[];
  }[];
}

export const SCREENING_SECTORS: ScreeningSector[] = [
  {
    id: "defense_idf",
    name: "גופי ביטחון, צה״ל וזרועות הביטחון",
    institutes: [
      {
        id: "idf_internal",
        name: "מדור מדעי ההתנהגות צה״ל (פנימי)",
        batteries: [
          "מבחן דפ״ר אדפטיבי (צו ראשון - חשיבה כמותית, צורנית, מילולית והוראות)",
          "מבחני יום המא״ה (חשיבה כמותית, עיבוד מידע, תפיסה מרחבית והדרכה)",
          "מבחני ירפ״א א׳/ב׳ (מבדקי טיס / צוות אוויר)",
          "מבחני מיון חובלים, צוללות וסיירות עילית",
          "מיוני שחקים, חבצלות, תלפיות וארזים",
          "מיוני בסמ״ח ויחידות הסייבר והטכנולוגיה (8200/81)",
          "מבדקי קצונה (מבד״קים)",
        ],
      },
      {
        id: "keinan_defense",
        name: "קינן-שפי (זרוע ביטחונית)",
        batteries: [
          "מיון קצונה ייעודית ומסלולי עתודה אקדמית / עתידים",
          "מיוני משטרת ישראל, משמר הגבול (מג״ב) ושירות בתי הסוהר (שב״ס)",
          "מיוני שב״כ, מוסד וגופי קהילת המודיעין",
        ],
      },
      {
        id: "adam_milo_defense",
        name: "אדם-מילא (ביטחון ותעשיות ביטחוניות)",
        batteries: [
          "מיוני כוחות הביטחון ומערך האבטחה הממלכתי",
          "מבדקים פסיכוטכניים לתעשיות ביטחוניות (רפאל, אלביט, תע״א, תעש)",
        ],
      },
    ],
  },
  {
    id: "civil_service_gov",
    name: "משרדי ממשלה ונציבות שירות המדינה",
    institutes: [
      {
        id: "pilat_gov",
        name: "פילת (Pilat Assessment)",
        batteries: [
          "מכרזי בכירים בשירות המדינה (נציבות שירות המדינה)",
          "מבחני מיון למשרד החוץ (קורס צוערים דיפלומטי)",
          "מבחני מיון לרשות המיסים, משרד האוצר ובנק ישראל",
          "מבחני כושר ניהולי, חשיבה אנליטית והערכת מנהלים",
        ],
      },
      {
        id: "adam_milo_gov",
        name: "אדם-מילא (ממשלתי וציבורי)",
        batteries: [
          "מכרזי שירות המדינה ודירוג מנהלי / אקדמי",
          "מיוני עובדי הוראה, מפקחים וניהול בתי ספר",
          "מבחני מיון לרשויות מקומיות ועיריות",
        ],
      },
      {
        id: "karni_gov",
        name: "מכון קרני (Karni Assessment)",
        batteries: [
          "מבחני מיון לשירות המדינה ומגזר ציבורי",
          "מבחן פסיכוטכני למורי נהיגה, בוחנים ומנהלים מקצועיים",
        ],
      },
    ],
  },
  {
    id: "national_infra",
    name: "תשתיות לאומיות ותאגידים ציבוריים",
    institutes: [
      {
        id: "milou_infra",
        name: "מילוא (Milou Assessment)",
        batteries: [
          "מיוני חברת החשמל לישראל (חח״י - טכני, הנדסי וניהולי)",
          "מיוני רכבת ישראל ורכבת קלה (נהגי רכבת, פקחים, בטיחות)",
          "מיוני נמלי ישראל (אשדוד, חיפה, המפרץ, נמלי הדרום)",
          "מיוני חברת מקורות ותאגידי מים וביוב",
        ],
      },
      {
        id: "keinan_infra",
        name: "קינן-שפי (תשתיות ותעשייה)",
        batteries: [
          "מיוני תעשייה אווירית (תע״א) ורפאל - מערכות לחימה",
          "מיוני בתי הזיקוק לנפט (בז״ן), כימיקלים לישראל ומפעלי ים המלח",
        ],
      },
    ],
  },
  {
    id: "tech_finance",
    name: "הייטק, בנקים, פיננסים וגלובל",
    institutes: [
      {
        id: "ccat_criteria",
        name: "CCAT / Criteria Cognitive Aptitude Test",
        batteries: [
          "CCAT למיוני הייטק וחברות בינלאומיות (50 שאלות ב-15 דקות: כמותי, מילולי, לוגי וצורני)",
          "Universal Cognitive Aptitude Test (UCAT)",
        ],
      },
      {
        id: "shl_talent",
        name: "SHL Global Assessment",
        batteries: [
          "SHL Verify Numerical Reasoning (חשיבה כמותית, ניתוח טבלאות וגרפים)",
          "SHL Verify Inductive & Deductive Logic (לוגיקה מופשטת, סדרות והיסק)",
          "SHL Calculation & Checking Battery (דיוק ומהירות חישוב)",
        ],
      },
      {
        id: "logipass_tech",
        name: "לוגיפס (Logipass)",
        batteries: [
          "מבחני חשיבה כמותית ולוגית לבנקים (בנק הפועלים, לאומי, דיסקונט, מזרחי-טפחות)",
          "מבחני התאמה לחברות ביטוח ופיננסים (הראל, הפניקס, מגדל, מנורה)",
          "מבחני מיון לחברות תקשורת וטלקום (בזק, פלאפון, סלקום, פרטנר)",
        ],
      },
      {
        id: "codility_hackerrank",
        name: "Codility / HackerRank Assessment",
        batteries: [
          "מבחני קוד מעשיים באלגוריתמים, מבני נתונים ויעילות (Live Coding Assessment)",
          "מבחני ידע בשפות תכנות (Python, Java, C++, TypeScript) ו-System Design",
        ],
      },
    ],
  },
  {
    id: "academia_gifted_med",
    name: "מחוננים, תוכניות מצטיינים ורפואה (מו״ר)",
    institutes: [
      {
        id: "karni_gifted",
        name: "מכון קרני (מחוננים ומצטיינים)",
        batteries: [
          "מבחן איתור מחוננים שלב א׳ (כיתה ב׳/ג׳ - סינון בית ספרי)",
          "מבחן איתור מחוננים שלב ב׳ (קרני/סאלד - קבלה למרכזי מחוננים וכיתות מופ״ת)",
          "מיוני תוכניות אודיסאה, אלפא ואידיאה (מרכז מדעני העתיד)",
        ],
      },
      {
        id: "malov_med",
        name: "המרכז הארצי לבחינות והערכה (מאלו״ו - רפואה)",
        batteries: [
          "מבחני מו״ר ומרק״ם לקבלה ללימודי רפואה (שאלונים ביוגרפיים, יום שאלונים ותחנות סימולציה)",
          "מבחן מיר״ב לקבלה לתוכנית ה-4-שנתית ברפואה",
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* HELPER FUNCTIONS                                                           */
/* -------------------------------------------------------------------------- */

export function getBagrutSubjects(): BagrutSubject[] {
  return BAGRUT_SUBJECTS;
}

export function getAcademicFaculties(): DegreeField[] {
  return ACADEMIC_DEGREE_FIELDS;
}

/**
 * Strip institutional catalog codes / nicknames from academic course labels for UI.
 * Never surface institutional nicknames / course numbers — only clean labels.
 */
export function getAcademicCourseDisplayLabel(course: string): string {
  const stripped = course
    .replace(/\s*\(\d{5,6}\)\s*/g, " ")
    .replace(/\s*0509[.\-]\d+\s*/g, " ")
    .replace(/\s*[-–—]\s*(Machine Learning|DSP|FEM|CAD|Database Systems|Six Sigma)\s*/gi, " ")
    // Strip trailing institutional nicknames (ת / מ) after the course name.
    .replace(/\s+[תמ]'?\s*$/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Deep Learning — before Machine Learning so "Deep Learning" is never collapsed into ML.
  if (
    /למידה\s+עמוקה/.test(stripped) ||
    /Deep\s+Learning/i.test(stripped) ||
    /^academic-deep-learning/.test(stripped) ||
    /^deep-learning/.test(stripped)
  ) {
    return "למידה עמוקה";
  }

  // Advanced ML — before intro ML ("למידת מכונה מתקדמת" ≠ "מבוא ללמידת מכונה").
  if (
    /למידת\s+מכונה\s+מתקדמת/.test(stripped) ||
    /Advanced\s+Machine\s+Learning/i.test(stripped) ||
    /^academic-advanced-ml/.test(stripped) ||
    /^advanced-ml/.test(stripped) ||
    /^advanced-machine-learning/.test(stripped)
  ) {
    return "למידת מכונה מתקדמת";
  }

  // Data & text mining — before Big Data so "כריית טקסט" is not collapsed into Analytics.
  if (
    /כריית\s+נתונים\s+וטקסט/.test(stripped) ||
    (/כריית\s+טקסט/.test(stripped) && !/Big\s+Data\s+Analytics/i.test(stripped)) ||
    /^academic-data-text-mining/.test(stripped) ||
    /^data-text-mining/.test(stripped)
  ) {
    return "כריית נתונים וטקסט";
  }

  // Applied regression — never surface "לינאריים" catalog nicknames.
  if (
    /מודלים\s+סטטיסטיים/.test(stripped) ||
    /רגרסיה\s+ליניארית/.test(stripped) ||
    /רגרסיה\s+מיושמת/.test(stripped) ||
    /הסקה\s+סטטיסטית\s+ומודלים\s+לינאריים/.test(stripped) ||
    /^academic-applied-regression/.test(stripped) ||
    /^applied-regression/.test(stripped)
  ) {
    return "מודלים סטטיסטיים ורגרסיה ליניארית ומיושמת";
  }

  // Probability / statistics — clean UI (prep for dedicated banks).
  if (
    /הסתברות/.test(stripped) ||
    /סטטיסטיקה/.test(stripped) ||
    /תהליכים\s+אקראיים/.test(stripped)
  ) {
    if (/סטטיסטיקה/.test(stripped) && !/הסתברות/.test(stripped)) {
      return "סטטיסטיקה";
    }
    if (/הסתברות/.test(stripped) && /סטטיסטיקה/.test(stripped)) {
      return "הסתברות וסטטיסטיקה";
    }
    if (/תהליכים\s+אקראיים/.test(stripped)) {
      return "תהליכים אקראיים והסתברות";
    }
    return "הסתברות";
  }

  // PDE / Fourier before ODE — dedicated banks.
  if (
    /פורייה|Fourier/i.test(stripped) ||
    /מד״ח|מד"ח/.test(stripped) ||
    /דיפרנציאליות\s+חלקיות/.test(stripped) ||
    /^academic-pde-fourier/.test(stripped) ||
    /^pde-fourier/.test(stripped) ||
    /^pde$/i.test(stripped)
  ) {
    return "משוואות דיפרנציאליות חלקיות וטורי פורייה";
  }
  if (
    /משוואות\s+דיפרנציאליות/.test(stripped) ||
    /מד״ר|מד"ר/.test(stripped) ||
    /^academic-ordinary-differential/.test(stripped) ||
    /^ordinary-differential-equations/.test(stripped) ||
    /^ode$/i.test(stripped)
  ) {
    return "משוואות דיפרנציאליות רגילות";
  }

  // Discrete math — never surface "ת" nicknames or catalog codes.
  if (
    /מתמטיקה\s+בדידה/.test(stripped) ||
    /מתמטיקה\s+דיסקרטית/.test(stripped) ||
    /^academic-discrete-math/.test(stripped) ||
    /^discrete-math/.test(stripped)
  ) {
    return "מתמטיקה בדידה";
  }

  // Intro CS — never surface "ת" nicknames or catalog codes (234114 / 234117).
  if (
    /מבוא\s+למדעי\s+המחשב/.test(stripped) ||
    /^academic-intro-cs/.test(stripped) ||
    /^intro-cs/.test(stripped)
  ) {
    return "מבוא למדעי המחשב";
  }

  // Big Data Analytics — before generic "אלגוריתמים" (נתוני עתק ≠ אלגוריתמים 1 / 236360).
  if (
    /אלגוריתמים\s+לנתוני\s+עתק/.test(stripped) ||
    /נתוני\s+עתק/.test(stripped) ||
    /Big\s+Data\s+Analytics/i.test(stripped) ||
    /^academic-big-data/.test(stripped) ||
    /^big-data/.test(stripped)
  ) {
    return "אלגוריתמים לנתוני עתק (Big Data)";
  }

  // Algorithms — clean UI; unify אלגוריתמים 1 / תכנון וניתוח אלגוריתמים.
  if (
    /תכנון\s+וניתוח\s+אלגוריתמים/.test(stripped) ||
    /אלגוריתמים/.test(stripped) ||
    /^academic-algorithms/.test(stripped) ||
    /^algorithms$/i.test(stripped)
  ) {
    return "תכנון וניתוח אלגוריתמים";
  }

  // Operating systems — never surface catalog codes (234123).
  if (
    /מערכות\s+הפעלה/.test(stripped) ||
    /^academic-operating-systems/.test(stripped) ||
    /^operating-systems/.test(stripped)
  ) {
    return "מערכות הפעלה";
  }

  // Theory of computation & complexity — before automata ("אוטומט").
  if (
    /תורת\s+החישוב/.test(stripped) ||
    /theory[- ]of[- ]computation/i.test(stripped) ||
    /^academic-theory-computation/.test(stripped) ||
    /^theory-computation/.test(stripped)
  ) {
    return "תורת החישוב וסיבוכיות";
  }

  // Automata / computational models — never surface catalog codes.
  if (
    /מודלים\s+חישוביים/.test(stripped) ||
    /אוטומט/.test(stripped) ||
    /^academic-automata/.test(stripped) ||
    /^automata$/i.test(stripped) ||
    /computational-models/i.test(stripped)
  ) {
    return "מודלים חישוביים ואוטומטים";
  }

  // Analog & digital electronic circuits — before circuit-theory label.
  if (
    /מעגלים\s+אלקטרוניים/.test(stripped) ||
    /^academic-electronic-circuits/.test(stripped) ||
    /^electronic-circuits/.test(stripped)
  ) {
    return "מעגלים אלקטרוניים אנלוגיים וספרתיים";
  }

  // Electric / linear circuits — never surface catalog codes (044101).
  if (
    /תורת\s+המעגלים/.test(stripped) ||
    /מעגלים\s+ליניאר/.test(stripped) ||
    /מבוא\s+להנדסת\s+חשמל\s+ומעגלים/.test(stripped) ||
    /^academic-circuits/.test(stripped) ||
    /^circuits$/i.test(stripped) ||
    /^electric-circuits/.test(stripped)
  ) {
    return "תורת המעגלים";
  }

  // Signals & Systems — never surface catalog codes (044131).
  if (
    /אותות\s+ומערכות/.test(stripped) ||
    /^academic-signals-systems/.test(stripped) ||
    /^signals-systems/.test(stripped) ||
    /^signals-and-systems/.test(stripped)
  ) {
    return "אותות ומערכות";
  }

  // Complex functions & integral transforms — before generic transform / Fourier labels.
  if (
    /פונקציות\s+מרוכבות/.test(stripped) ||
    /התמרות\s+אינטגרליות/.test(stripped) ||
    /^academic-complex-functions/.test(stripped) ||
    /^complex-functions/.test(stripped)
  ) {
    return "פונקציות מרוכבות והתמרות אינטגרליות";
  }

  // Digital communications — before computer networks ("תקשורת ספרתית" ≠ "רשתות תקשורת").
  if (
    /תקשורת\s+ספרתית/.test(stripped) ||
    /^academic-digital-communications/.test(stripped) ||
    /^digital-communications/.test(stripped)
  ) {
    return "תקשורת ספרתית";
  }

  // Distributed systems & cloud — before generic "מערכות" / IS architecture labels.
  if (
    /מערכות\s+מבוזרות/.test(stripped) ||
    /מחשוב\s+ענן/.test(stripped) ||
    /ארכיטקטורת\s+ענן/.test(stripped) ||
    /Distributed\s+Systems/i.test(stripped) ||
    /Cloud\s+Computing/i.test(stripped) ||
    /^academic-distributed-systems/.test(stripped) ||
    /^distributed-systems/.test(stripped)
  ) {
    return "מערכות מבוזרות ומחשוב ענן";
  }

  // Computer vision & image processing — never surface English parenthetical nicknames.
  if (
    /ראייה\s+ממוחשבת/.test(stripped) ||
    /עיבוד\s+תמונה/.test(stripped) ||
    /Computer\s+Vision/i.test(stripped) ||
    /Image\s+Processing/i.test(stripped) ||
    /^academic-computer-vision/.test(stripped) ||
    /^computer-vision/.test(stripped)
  ) {
    return "ראייה ממוחשבת ועיבוד תמונה";
  }

  // Digital systems & logic design — before architecture ("מערכות ספרתיות ומבנה מחשבים").
  if (
    (/מערכות\s+ספרתיות/.test(stripped) && !/מבנה\s+מחשבים/.test(stripped)) ||
    /תכן\s+לוגי/.test(stripped) ||
    /לוגיקה\s+ספרתית/.test(stripped) ||
    /^academic-digital-logic/.test(stripped) ||
    /^digital-logic/.test(stripped)
  ) {
    return "מערכות ספרתיות ותכן לוגי";
  }

  // Computer architecture — never surface catalog codes (234145 / 044252).
  if (
    /מבנה\s+מחשבים/.test(stripped) ||
    /ארכיטקטורת?\s+מחשבים/.test(stripped) ||
    /מערכות\s+ספרתיות\s+ומבנה\s+מחשבים/.test(stripped) ||
    /^academic-computer-architecture/.test(stripped) ||
    /^computer-architecture/.test(stripped)
  ) {
    return "מבנה מחשבים וארכיטקטורה";
  }

  // Structural statics — before rigid-body statics / strength of materials.
  if (
    /סטטיקה\s+של\s+מבנים/.test(stripped) ||
    /אנליזת\s+מבנים/.test(stripped) ||
    /^academic-structural-statics/.test(stripped) ||
    /^structural-statics/.test(stripped)
  ) {
    return "סטטיקה של מבנים";
  }

  // Statics & strength of materials — never surface catalog codes (034013 / 034015 / 034016).
  // Guard: סטטיקה ≠ סטטיסטיקה.
  if (
    (/סטטיקה/.test(stripped) && !/סטטיסטיקה/.test(stripped)) ||
    /חוזק\s+חומרים/.test(stripped) ||
    /^academic-mechanics-materials/.test(stripped) ||
    /^mechanics-materials/.test(stripped)
  ) {
    return "סטטיקה וחוזק חומרים";
  }

  // OR2 / stochastic models & queueing — before generic operations research (094314 ≠ 094313).
  if (
    /מודלים\s+סטוכסטיים/.test(stripped) ||
    /תורת\s+התורים/.test(stripped) ||
    /חקר\s+ביצועים\s*2/.test(stripped) ||
    /^academic-stochastic-models/.test(stripped) ||
    /^stochastic-models/.test(stripped)
  ) {
    return "חקר ביצועים 2 (מודלים סטוכסטיים ותורת התורים)";
  }

  // Continuous & nonlinear optimization — before linear OR ("לא-ליניארית" ≠ "ליניארית").
  if (
    /אופטימיזציה\s+רציפה/.test(stripped) ||
    /אופטימיזציה\s+לא[-\s]?לינ/.test(stripped) ||
    /^academic-nonlinear-optimization/.test(stripped) ||
    /^nonlinear-optimization/.test(stripped)
  ) {
    return "אופטימיזציה רציפה ולא-ליניארית";
  }

  // Operations research / linear optimization — never surface catalog codes (094313).
  if (
    /חקר\s+ביצועים/.test(stripped) ||
    /אופטימיזציה\s+ליניארית/.test(stripped) ||
    /^academic-operations-research/.test(stripped) ||
    /^operations-research/.test(stripped)
  ) {
    return "חקר ביצועים";
  }

  // Advanced databases / NoSQL — before basic SQL so "מתקדמים" is never collapsed.
  if (
    /בסיסי\s+נתונים\s+מתקדמים/.test(stripped) ||
    /NoSQL/i.test(stripped) ||
    /^academic-advanced-databases/.test(stripped) ||
    /^advanced-databases/.test(stripped)
  ) {
    return "בסיסי נתונים מתקדמים ומערכות NoSQL";
  }

  // Systems analysis & IS architecture — before computer-architecture label.
  if (
    /ניתוח[,\s]+תכן\s+וארכיטקטורת\s+מערכות\s+מידע/.test(stripped) ||
    /ארכיטקטורת\s+מערכות\s+מידע/.test(stripped) ||
    /ניתוח\s+ועיצוב\s+מערכות\s+מידע/.test(stripped) ||
    /^academic-systems-analysis/.test(stripped) ||
    /^systems-analysis/.test(stripped)
  ) {
    return "ניתוח, תכן וארכיטקטורת מערכות מידע";
  }

  // Databases — never surface catalog codes (236363 / 094220); ≠ מבני נתונים.
  if (
    /בסיסי\s+נתונים/.test(stripped) ||
    /^academic-databases/.test(stripped) ||
    /^databases$/i.test(stripped) ||
    /database-systems/i.test(stripped)
  ) {
    return "בסיסי נתונים";
  }

  // Computer networks — never surface catalog codes (236334) or "מבוא ל…" prefix.
  if (
    /רשתות\s+תקשורת/.test(stripped) ||
    /^academic-computer-networks/.test(stripped) ||
    /^computer-networks/.test(stripped) ||
    /^networks$/i.test(stripped)
  ) {
    return "רשתות תקשורת מחשבים";
  }

  // Intro to Machine Learning — never surface catalog codes (236756).
  if (
    /למידת\s+מכונה/.test(stripped) ||
    /Machine\s+Learning/i.test(stripped) ||
    /^academic-machine-learning/.test(stripped) ||
    /^machine-learning/.test(stripped) ||
    /^ml$/i.test(stripped)
  ) {
    return "מבוא ללמידת מכונה";
  }

  // Control Theory & Linear Systems — never surface catalog codes (044148).
  if (
    /תורת\s+הבקרה/.test(stripped) ||
    /מערכות\s+ליניאריות/.test(stripped) ||
    /^academic-control-theory/.test(stripped) ||
    /^control-theory/.test(stripped)
  ) {
    return "תורת הבקרה ומערכות ליניאריות";
  }

  // OOP / Advanced Programming — never surface catalog codes (234129).
  if (
    /תכנות\s+מונחה\s+עצמים/.test(stripped) ||
    /^academic-oop/.test(stripped) ||
    /^oop$/i.test(stripped)
  ) {
    return "תכנות מונחה עצמים ומתקדם";
  }

  // Engineering Thermodynamics — never surface catalog codes (034028).
  // Must precede kinematics: "דינמיקה" is a substring of "תרמודינמיקה".
  if (
    /תרמודינמיקה/.test(stripped) ||
    /^academic-thermodynamics/.test(stripped) ||
    /^thermodynamics$/i.test(stripped)
  ) {
    return "תרמודינמיקה הנדסית";
  }

  // Kinematics & dynamics of rigid bodies and mechanisms — never surface catalog codes (034014).
  if (
    /קינמטיקה/.test(stripped) ||
    (/דינמיקה/.test(stripped) && !/תרמודינמיקה/.test(stripped)) ||
    /^academic-kinematics-dynamics/.test(stripped) ||
    /^kinematics-dynamics/.test(stripped)
  ) {
    return "קינמטיקה ודינמיקה של גופים ומנגנונים";
  }

  // General chemistry — before generic chemistry / materials mentions.
  if (
    /כימיה\s+כללית/.test(stripped) ||
    /^academic-general-chemistry/.test(stripped) ||
    /^general-chemistry/.test(stripped)
  ) {
    return "כימיה כללית";
  }

  // CAD / computer-aided design — before machine design ("תכן מכני").
  if (
    /תכן\s+בעזרת\s+מחשב/.test(stripped) ||
    /גרפיקה\s+הנדסית/.test(stripped) ||
    /\bCAD\b/i.test(stripped) ||
    /^academic-cad/.test(stripped) ||
    /^cad-mechanical/.test(stripped)
  ) {
    return "גרפיקה הנדסית ותכן בעזרת מחשב";
  }

  // Materials science — before strength-of-materials ("חוזק חומרים").
  if (
    /תורת\s+החומרים/.test(stripped) ||
    /מדע\s+החומרים/.test(stripped) ||
    /^academic-materials-science/.test(stripped) ||
    /^materials-science/.test(stripped)
  ) {
    return "תורת החומרים";
  }

  // Mechanical vibrations — before kinematics/dynamics catch-alls.
  if (
    /תנודות/.test(stripped) ||
    /רעידות/.test(stripped) ||
    /academic-mechanical-vibrations/i.test(stripped) ||
    /^mechanical-vibrations/.test(stripped)
  ) {
    return "תורת התנודות והרעידות";
  }

  // Finite element method (FEM).
  if (
    /אלמנטים\s+סופיים/.test(stripped) ||
    /\bFEM\b/i.test(stripped) ||
    /^academic-fem/.test(stripped) ||
    /^finite-element/.test(stripped)
  ) {
    return "אלמנטים סופיים - FEM";
  }

  // Digital control & robotics — before classical control theory.
  if (
    /בקרה\s+ספרתית/.test(stripped) ||
    /רובוטיקה/.test(stripped) ||
    /academic-digital-control-robotics/i.test(stripped) ||
    /^digital-control-robotics/.test(stripped)
  ) {
    return "בקרה ספרתית ורובוטיקה";
  }

  // Intro to data science & Python — before IE Python / intro CS.
  if (
    /מבוא\s+למדעי\s+הנתונים/.test(stripped) ||
    /^academic-intro-ds/.test(stripped) ||
    /^intro-data-science/.test(stripped)
  ) {
    return "מבוא למדעי הנתונים ופייתון";
  }

  // Natural language processing (NLP).
  if (
    /עיבוד\s+שפה\s+טבעית/.test(stripped) ||
    /\bNLP\b/i.test(stripped) ||
    /^academic-nlp/.test(stripped) ||
    /^nlp-language/.test(stripped)
  ) {
    return "עיבוד שפה טבעית (NLP)";
  }

  // Python programming — IE intro course (distinct from intro CS / intro DS).
  if (
    /עקרונות\s+תכנות\s+ופייתון/.test(stripped) ||
    (/פייתון/.test(stripped) && !/מדעי\s+הנתונים/.test(stripped)) ||
    /Python/i.test(stripped) ||
    /^academic-python/.test(stripped) ||
    /^python-programming/.test(stripped)
  ) {
    return "עקרונות תכנות ופייתון";
  }

  // Organization theory & management.
  if (
    /תורת\s+הארגון/.test(stripped) ||
    /התנהגות\s+ארגונית/.test(stripped) ||
    /academic-organization-theory/i.test(stripped) ||
    /^organization-theory/.test(stripped)
  ) {
    return "תורת הארגון והתנהגות ארגונית";
  }

  // Supply chain management.
  if (
    /שרשרת\s+אספקה/.test(stripped) ||
    /לוגיסטיקה/.test(stripped) ||
    /academic-supply-chain/i.test(stripped) ||
    /^supply-chain/.test(stripped)
  ) {
    return "שרשרת אספקה ולוגיסטיקה";
  }

  // Game theory.
  if (
    /תורת\s+המשחקים/.test(stripped) ||
    /academic-game-theory/i.test(stripped) ||
    /^game-theory/.test(stripped)
  ) {
    return "תורת המשחקים ומודלים כלכליים";
  }

  // Plant layout & facilities design.
  if (
    /מערכי\s+מפעל/.test(stripped) ||
    /תכנון\s+מערכי/.test(stripped) ||
    /academic-plant-layout/i.test(stripped) ||
    /^plant-layout/.test(stripped)
  ) {
    return "תכנון מערכי מפעל ומתקנים";
  }

  // Business intelligence & data warehouses.
  if (
    /בינה\s+עסקית/.test(stripped) ||
    /\bBI\b/.test(stripped) ||
    /מחסני\s+נתונים/.test(stripped) ||
    /^academic-bi/.test(stripped) ||
    /^business-intelligence/.test(stripped)
  ) {
    return "בינה עסקית ומחסני נתונים (BI)";
  }

  // Machine design — never surface catalog codes (034039).
  if (
    /תכן\s+מכני/.test(stripped) ||
    /איברים\s+מכניים/.test(stripped) ||
    /^academic-machine-design/.test(stripped) ||
    /^machine-design/.test(stripped)
  ) {
    return "תכן מכני";
  }

  // Simulation of manufacturing & service systems — never surface catalog codes (094114).
  if (
    /סימולציה\s+של\s+מערכות/.test(stripped) ||
    /^academic-simulation-systems/.test(stripped) ||
    /^simulation-systems/.test(stripped)
  ) {
    return "סימולציה של מערכות ייצור ושירות";
  }

  // Requirements engineering & UI/UX — never surface catalog codes (236370) or HCI nickname.
  if (
    /הנדסת\s+דרישות/.test(stripped) ||
    /ממשקי\s+משתמש/.test(stripped) ||
    /ממשקי\s+אדם[-\s]מחשב/.test(stripped) ||
    /אינטראקציית\s+אדם[-\s]מחשב/.test(stripped) ||
    /UI\s*\/\s*UX/i.test(stripped) ||
    /^academic-ui-ux-engineering/.test(stripped) ||
    /^ui-ux-engineering/.test(stripped)
  ) {
    return "הנדסת דרישות וממשקי משתמש (UI/UX)";
  }

  // Engineering economy & cost analysis — never surface catalog codes (094511).
  if (
    /תמחור\s+ובקרת\s+עלויות/.test(stripped) ||
    /כלכלת\s+הנדסה/.test(stripped) ||
    /^academic-engineering-economy/.test(stripped) ||
    /^engineering-economy/.test(stripped)
  ) {
    return "תמחור ובקרת עלויות הנדסית";
  }

  // Methods engineering & ergonomics — never surface catalog codes (094120).
  if (
    /הנדסת\s+שיטות/.test(stripped) ||
    /מדידת\s+עבודה/.test(stripped) ||
    /ארגונומיה/.test(stripped) ||
    /^academic-methods-ergonomics/.test(stripped) ||
    /^methods-engineering-ergonomics/.test(stripped) ||
    /^methods-ergonomics/.test(stripped)
  ) {
    return "הנדסת שיטות וארגונומיה";
  }

  // IS security & risk management — before cryptography ("אבטחת מידע") and generic IS mentions.
  if (
    /אבטחת\s+מערכות\s+מידע/.test(stripped) ||
    /ניהול\s+סיכוני\s+סייבר/.test(stripped) ||
    /ניהול\s+סיכונים\s+באבטחת/.test(stripped) ||
    /^academic-is-security-risk/.test(stripped) ||
    /^is-security-risk/.test(stripped)
  ) {
    return "אבטחת מערכות מידע וניהול סיכונים";
  }

  // Quality engineering & Six Sigma — never surface catalog codes (094142) or "Six Sigma" nickname.
  // The nickname strip above turns "הנדסת איכות ו-Six Sigma" into "הנדסת איכות ו".
  if (
    /ניהול\s+איכות/.test(stripped) ||
    /הנדסת\s+איכות/.test(stripped) ||
    /שש[-\s]?סיגמ/.test(stripped) ||
    /Six\s*Sigma/i.test(stripped) ||
    /^academic-quality-engineering/.test(stripped) ||
    /^quality-engineering/.test(stripped)
  ) {
    return "ניהול איכות ושיטות שש-סיגמא";
  }

  // Production planning & control — never surface catalog codes (094501).
  if (
    /תכנון\s+ופיקוח\s+הייצור/.test(stripped) ||
    /ניהול\s+ייצור/.test(stripped) ||
    /תפ״י|תפ"י/.test(stripped) ||
    /^academic-production-planning/.test(stripped) ||
    /^production-planning/.test(stripped)
  ) {
    return "תכנון ופיקוח הייצור (תפ״י)";
  }

  // Semiconductor devices / solid-state — never surface catalog codes (044125).
  if (
    /מוליכים\s+למחצה/.test(stripped) ||
    /מל״מ|מל"מ/.test(stripped) ||
    /מצב\s+מוצק/.test(stripped) ||
    /^academic-semiconductors/.test(stripped) ||
    /^semiconductors$/i.test(stripped)
  ) {
    return "התקני מוליכים למחצה";
  }

  // Fluid mechanics — never surface catalog codes (034033).
  if (
    /מכניקת\s+זורמים/.test(stripped) ||
    /^academic-fluid-mechanics/.test(stripped) ||
    /^fluid-mechanics$/i.test(stripped)
  ) {
    return "מכניקת זורמים";
  }

  // Energy conversion & power systems — never surface catalog codes (044109).
  if (
    /המרת\s+אנרגיה/.test(stripped) ||
    /מערכות\s+הספק/.test(stripped) ||
    /^academic-energy-conversion/.test(stripped) ||
    /^energy-conversion$/i.test(stripped)
  ) {
    return "המרת אנרגיה ומערכות הספק";
  }

  // Heat and mass transfer — never surface catalog codes (034035).
  if (
    /מעבר\s+חום/.test(stripped) ||
    /מעבר\s+מסה/.test(stripped) ||
    /^academic-heat-mass-transfer/.test(stripped) ||
    /^heat-mass-transfer$/i.test(stripped)
  ) {
    return "מעבר חום ומעבר מסה";
  }

  // Compilers & programming languages — never surface catalog codes (236703).
  if (
    /קומפילציה/.test(stripped) ||
    /תכנון\s+שפות\s+תכנות/.test(stripped) ||
    /^academic-compilers/.test(stripped) ||
    /^compilers$/i.test(stripped)
  ) {
    return "קומפילציה ושפות תכנות";
  }

  // Information security & cryptography — never surface catalog codes (236350).
  if (
    /אבטחת\s+מידע/.test(stripped) ||
    /אבטחת\s+מחשבים/.test(stripped) ||
    /קריפטוגרפיה/.test(stripped) ||
    /^academic-information-security/.test(stripped) ||
    /^information-security/.test(stripped)
  ) {
    return "אבטחת מידע וקריפטוגרפיה";
  }

  // Waves & electromagnetics — never surface catalog codes (044140).
  if (
    /שדות\s+אלקטרומגנטיים/.test(stripped) ||
    /גלים\s+ושדות/.test(stripped) ||
    /^academic-electromagnetics/.test(stripped) ||
    /^electromagnetics$/i.test(stripped)
  ) {
    return "גלים ושדות אלקטרומגנטיים";
  }

  // Physics 2 — E&M: never surface institutional codes / nicknames (114052, 0509.1829, 2מ/2ח).
  if (
    /פיזיקה\s*2/.test(stripped) ||
    /^academic-physics-2/.test(stripped) ||
    /^physics-?2/.test(stripped) ||
    (/חשמל|מגנטיות/.test(stripped) && /פיזיקה/.test(stripped))
  ) {
    return "פיזיקה 2 - חשמל ומגנטיות";
  }

  // Physics 1 — Mechanics: never surface institutional codes / nicknames (114051, 0509-1118, 1מ/1ר).
  if (
    /פיזיקה\s*1/.test(stripped) ||
    /^academic-physics-1/.test(stripped) ||
    /^physics-?1/.test(stripped)
  ) {
    return "פיזיקה 1 - מכניקה";
  }

  // Linear algebra — never surface "מ" nicknames or catalog codes.
  if (
    /אלגבר[הה]\s+לינ[יא]*רית/.test(stripped) ||
    /אלגברה\s*2/.test(stripped) ||
    /^academic-linear-algebra/.test(stripped) ||
    /^linear-algebra/.test(stripped)
  ) {
    if (
      /academic-linear-algebra-2/.test(stripped) ||
      /linear-algebra-2/.test(stripped) ||
      /לינ[יא]*רית\s*2/.test(stripped) ||
      /אלגברה\s*2/.test(stripped)
    ) {
      return "אלגברה ליניארית 2";
    }
    return "אלגברה ליניארית 1";
  }

  // Leave titled economics/other courses that merely mention חדו״א intact.
  const isCalcFamily =
    /^(חדו|אינפי|חשבון דיפרנציאלי)/.test(stripped) ||
    /^academic-calculus/.test(stripped);
  if (!isCalcFamily) return stripped;

  // Calc 2 before generic calc 1 (e.g. "חדו״א 2ת", "אינפי 2", academic-calculus-2).
  if (
    /academic-calculus-2/.test(stripped) ||
    /חדו״א\s*2/.test(stripped) ||
    /אינפי\s*2/.test(stripped) ||
    /חשבון דיפרנציאלי\s*2/.test(stripped)
  ) {
    return "חדו״א 2 / אינפי 2";
  }

  return "חדו״א / אינפי";
}

export function getScreeningSectors(): ScreeningSector[] {
  return SCREENING_SECTORS;
}

/** Visual optgroup buckets for the academic core-course dropdown (no year filter). */
export type AcademicCourseOptGroupId =
  | "math"
  | "cs"
  | "exact-sciences"
  | "continuation";

export const ACADEMIC_COURSE_OPTGROUP_LABELS: Readonly<
  Record<AcademicCourseOptGroupId, string>
> = {
  math: "📐 מתמטיקה ותשתיות",
  cs: "💻 מדעי המחשב ותכנות",
  "exact-sciences": "⚡ מדעים מדויקים ופיזיקה",
  continuation: "📊 נושאי המשך",
};

const ACADEMIC_OPTGROUP_ORDER: readonly AcademicCourseOptGroupId[] = [
  "math",
  "cs",
  "exact-sciences",
  "continuation",
] as const;

/**
 * Classify a taxonomy course string into a knowledge-division optgroup.
 * Uses clean display labels — never year of study.
 */
export function classifyAcademicCourseOptGroup(
  course: string
): AcademicCourseOptGroupId {
  const label = getAcademicCourseDisplayLabel(course);
  const hay = `${course} ${label}`;

  // Continuation first — avoid misrouting ODE/PDE into calculus via "דיפרנציאלי".
  // IE / OR / quality / supply-chain style courses stay in continuation.
  if (
    /הסתברות|סטטיסטיקה|תהליכים\s+אקראיים/.test(hay) ||
    /משוואות\s+דיפרנציאליות/.test(hay) ||
    /מד״ר|מד"ר|מד״ח|מד"ח/.test(hay) ||
    /פורייה|Fourier/i.test(hay) ||
    /חקר\s+ביצועים/.test(hay) ||
    /מודלים\s+סטוכסטיים/.test(hay) ||
    /תורת\s+התורים/.test(hay) ||
    /סימולציה\s+של\s+מערכות/.test(hay) ||
    /תכנון\s+ופיקוח\s+הייצור/.test(hay) ||
    /ניהול\s+ייצור/.test(hay) ||
    /תפ״י|תפ"י/.test(hay) ||
    /אופטימיזציה\s+ליניארית/.test(hay) ||
    /אופטימיזציה\s+רציפה/.test(hay) ||
    /אופטימיזציה\s+לא[-\s]?לינ/.test(hay) ||
    /nonlinear-optimization/i.test(hay) ||
    /מודלים\s+סטטיסטיים/.test(hay) ||
    /רגרסיה\s+ליניארית/.test(hay) ||
    /רגרסיה\s+מיושמת/.test(hay) ||
    /תורת\s+הארגון/.test(hay) ||
    /התנהגות\s+ארגונית/.test(hay) ||
    /שרשרת\s+אספקה/.test(hay) ||
    /לוגיסטיקה/.test(hay) ||
    /תורת\s+המשחקים/.test(hay) ||
    /מערכי\s+מפעל/.test(hay) ||
    /תכנון\s+מערכי/.test(hay) ||
    /academic-organization-theory/i.test(hay) ||
    /academic-supply-chain/i.test(hay) ||
    /academic-game-theory/i.test(hay) ||
    /academic-plant-layout/i.test(hay)
  ) {
    return "continuation";
  }

  if (
    /מבוא\s+למדעי\s+המחשב/.test(hay) ||
    /מבוא\s+למדעי\s+הנתונים/.test(hay) ||
    /מבני\s+נתונים/.test(hay) ||
    /בסיסי\s+נתונים/.test(hay) ||
    /רשתות\s+תקשורת/.test(hay) ||
    /תכנון\s+וניתוח\s+אלגוריתמים/.test(hay) ||
    /אלגוריתמים\s+לנתוני\s+עתק/.test(hay) ||
    /נתוני\s+עתק/.test(hay) ||
    /Big\s+Data\s+Analytics/i.test(hay) ||
    /אלגוריתמים/.test(hay) ||
    /מודלים\s+חישוביים/.test(hay) ||
    /תורת\s+החישוב/.test(hay) ||
    /theory[- ]of[- ]computation/i.test(hay) ||
    /אוטומט/.test(hay) ||
    /מערכות\s+הפעלה/.test(hay) ||
    /מערכות\s+ספרתיות\s+ותכן\s+לוגי/.test(hay) ||
    /תכן\s+לוגי/.test(hay) ||
    /לוגיקה\s+ספרתית/.test(hay) ||
    /מבנה\s+מחשבים/.test(hay) ||
    /ארכיטקטורת?\s+מחשבים/.test(hay) ||
    /קומפילציה/.test(hay) ||
    /תכנון\s+שפות\s+תכנות/.test(hay) ||
    /תכנות\s+מונחה\s+עצמים/.test(hay) ||
    /עקרונות\s+תכנות/.test(hay) ||
    /פייתון/.test(hay) ||
    /Python/i.test(hay) ||
    /בסיסי\s+נתונים\s+מתקדמים/.test(hay) ||
    /NoSQL/i.test(hay) ||
    /ניתוח[,\s]+תכן\s+וארכיטקטורת\s+מערכות\s+מידע/.test(hay) ||
    /ארכיטקטורת\s+מערכות\s+מידע/.test(hay) ||
    /ניתוח\s+ועיצוב\s+מערכות\s+מידע/.test(hay) ||
    /הנדסת\s+דרישות/.test(hay) ||
    /ממשקי\s+משתמש/.test(hay) ||
    /UI\s*\/\s*UX/i.test(hay) ||
    /למידת\s+מכונה/.test(hay) ||
    /למידה\s+עמוקה/.test(hay) ||
    /Deep\s+Learning/i.test(hay) ||
    /כריית\s+נתונים\s+וטקסט/.test(hay) ||
    /מערכות\s+מבוזרות/.test(hay) ||
    /ראייה\s+ממוחשבת/.test(hay) ||
    /עיבוד\s+שפה\s+טבעית/.test(hay) ||
    /\bNLP\b/i.test(hay) ||
    /בינה\s+עסקית/.test(hay) ||
    /\bBI\b/.test(hay) ||
    /מחסני\s+נתונים/.test(hay) ||
    /אבטחת\s+מידע/.test(hay) ||
    /אבטחת\s+מערכות\s+מידע/.test(hay)
  ) {
    return "cs";
  }

  if (
    /פיזיקה\s*2/.test(hay) ||
    /פיזיקה\s*1/.test(hay) ||
    (/חשמל|מגנטיות/.test(hay) && /פיזיקה/.test(hay)) ||
    (/מכניקה/.test(label) && /פיזיקה/.test(hay)) ||
    /אותות\s+ומערכות/.test(hay) ||
    /פונקציות\s+מרוכבות/.test(hay) ||
    /התמרות\s+אינטגרליות/.test(hay) ||
    /תקשורת\s+ספרתית/.test(hay) ||
    /תורת\s+המעגלים/.test(hay) ||
    /מעגלים\s+אלקטרוניים/.test(hay) ||
    /מוליכים\s+למחצה|מל״מ|מל"מ|מצב\s+מוצק/.test(hay) ||
    /שדות\s+אלקטרומגנטיים/.test(hay) ||
    /גלים\s+ושדות/.test(hay) ||
    /מכניקת\s+זורמים/.test(hay) ||
    /תרמודינמיקה/.test(hay) ||
    /המרת\s+אנרגיה|מערכות\s+הספק/.test(hay) ||
    /מעבר\s+חום|מעבר\s+מסה/.test(hay) ||
    /קינמטיקה/.test(hay) ||
    (/דינמיקה/.test(hay) && !/תרמודינמיקה/.test(hay)) ||
    /תכן\s+מכני/.test(hay) ||
    /איברים\s+מכניים/.test(hay) ||
    /תורת\s+הבקרה/.test(hay) ||
    /בקרה\s+ספרתית/.test(hay) ||
    /רובוטיקה/.test(hay) ||
    /כימיה\s+כללית/.test(hay) ||
    /תכן\s+בעזרת\s+מחשב/.test(hay) ||
    /גרפיקה\s+הנדסית/.test(hay) ||
    /\bCAD\b/i.test(hay) ||
    /תורת\s+החומרים/.test(hay) ||
    /תנודות/.test(hay) ||
    /רעידות/.test(hay) ||
    /אלמנטים\s+סופיים/.test(hay) ||
    /\bFEM\b/i.test(hay) ||
    (/סטטיקה/.test(hay) && !/סטטיסטיקה/.test(hay)) ||
    /חוזק\s+חומרים/.test(hay)
  ) {
    return "exact-sciences";
  }

  if (
    /מתמטיקה\s+בדידה|מתמטיקה\s+דיסקרטית/.test(hay) ||
    /אלגבר[הה]\s+לינ[יא]*רית|אלגברה\s*2/.test(hay) ||
    /^(חדו|אינפי)/.test(label) ||
    /חדו״א|אינפי/.test(hay)
  ) {
    return "math";
  }

  return "continuation";
}

export type AcademicCourseOptGroup = {
  id: AcademicCourseOptGroupId;
  label: string;
  /** Clean display label as both UI text and routing value. */
  courses: readonly { value: string; label: string }[];
};

/**
 * Flatten all years for a degree into optgroups (deduped by clean display label).
 */
export function getAcademicCoursesGroupedForDegree(
  field: DegreeField
): AcademicCourseOptGroup[] {
  const seen = new Set<string>();
  const buckets: Record<AcademicCourseOptGroupId, { value: string; label: string }[]> = {
    math: [],
    cs: [],
    "exact-sciences": [],
    continuation: [],
  };

  for (const year of field.years) {
    for (const raw of year.courses) {
      const label = getAcademicCourseDisplayLabel(raw);
      if (!label || seen.has(label)) continue;
      seen.add(label);
      const groupId = classifyAcademicCourseOptGroup(raw);
      buckets[groupId].push({ value: label, label });
    }
  }

  return ACADEMIC_OPTGROUP_ORDER.filter((id) => buckets[id].length > 0).map(
    (id) => ({
      id,
      label: ACADEMIC_COURSE_OPTGROUP_LABELS[id],
      courses: buckets[id],
    })
  );
}

export function formatExamDisplayName(
  trackType: DiagnosticTrackType,
  params: {
    subject?: string;
    unitsCount?: number;
    examNumber?: string;
    degreeField?: string;
    coreCourse?: string;
    mechinaTrack?: string;
    targetTestSession?: string;
    screeningBattery?: string;
    testingInstitute?: string;
  }
): string {
  switch (trackType) {
    case "BAGRUT":
      return `${params.subject || "מתמטיקה"} (${params.unitsCount || 5} יח״ל${params.examNumber ? ` - שאלון ${params.examNumber}` : ""})`;
    case "ACADEMIC":
      return `${getAcademicCourseDisplayLabel(params.coreCourse || "חדו״א / אינפי")}${params.degreeField ? ` (${params.degreeField})` : ""}`;
    case "MECHINA":
      return `${params.subject || "מתמטיקה"}${params.mechinaTrack ? ` (${params.mechinaTrack})` : ""}`;
    case "PSYCHOMETRIC":
      return `פסיכומטרי${params.targetTestSession ? ` (${params.targetTestSession})` : ""}`;
    case "SCREENING_INST":
      return `${params.screeningBattery || "דפ״ר"}${params.testingInstitute ? ` (${params.testingInstitute})` : ""}`;
    default:
      return params.subject || "מתמטיקה";
  }
}
