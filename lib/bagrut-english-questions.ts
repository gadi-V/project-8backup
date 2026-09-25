/** Local mirror of DiagnosticQuestion — avoids circular import. */
type DiagnosticQuestion = {
  id: string;
  domain: string;
  title: string;
  context: string;
  instruction: string;
  formulaLatex?: string;
  options: {
    id: string;
    mathText?: string;
    plainText?: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export interface EnglishWritingPrompt {
  level: "4_POINTS" | "5_POINTS";
  title: string;
  topic: string;
  instructions: string;
  minWords: number;
  maxWords: number;
}

export const ENGLISH_WRITING_PROMPTS: Record<string, EnglishWritingPrompt> = {
  "4_POINTS": {
    level: "4_POINTS",
    title: "משימת כתיבה - 4 יחידות לימוד",
    topic: "Your city wants to build more bike paths. Do you think this is a good idea?",
    instructions:
      "Write a composition stating and explaining your opinion. Write 100–120 words in English.",
    minWords: 100,
    maxWords: 120,
  },
  "5_POINTS": {
    level: "5_POINTS",
    title: "משימת כתיבה - 5 יחידות לימוד",
    topic: "What skills and/or abilities do you think can help you most in life?",
    instructions:
      "Choose one or two skills and/or abilities and explain your choice. You may relate to your own experience and/or that of others. Write 120–140 words in English.",
    minWords: 120,
    maxWords: 140,
  },
};

/* -------------------------------------------------------------------------- */
/* BAGRUT — English: vocabulary + restatements                                 */
/* -------------------------------------------------------------------------- */

export const BAGRUT_ENGLISH_QUESTIONS: DiagnosticQuestion[] = [
  // ================= חלק א': אוצר מילים בהקשר =================
  {
    id: "eng-vocab-discrepancy",
    domain: "VOCABULARY",
    title: "אנגלית - אוצר מילים בהקשר",
    context: "The accountant found a ___ in the financial records.",
    instruction: "בחר את המילה המתאימה ביותר להשלמת המשפט:",
    options: [
      {
        id: "1",
        plainText: "discrepancy",
        isCorrect: true,
        explanation:
          'פירוש המילה discrepancy הוא אי-התאמה או סתירה, מה שמתאים ביותר לגילוי שנעשה בדו"חות פיננסיים.',
      },
      {
        id: "2",
        plainText: "supremacy",
        isCorrect: false,
        explanation: "supremacy פירושו עליונות או שליטה.",
      },
      {
        id: "3",
        plainText: "bias",
        isCorrect: false,
        explanation: "bias פירושו דעה קדומה או נטייה.",
      },
      {
        id: "4",
        plainText: "haven",
        isCorrect: false,
        explanation: "haven פירושו מקלט או מקום מבטחים.",
      },
    ],
  },
  {
    id: "eng-vocab-sheer",
    domain: "VOCABULARY",
    title: "אנגלית - אוצר מילים בהקשר",
    context:
      "The curtains were made of ___ material, allowing sunlight to pass through easily.",
    instruction: "בחר את המילה המתאימה ביותר להשלמת המשפט:",
    options: [
      {
        id: "1",
        plainText: "vapid",
        isCorrect: false,
        explanation: "vapid פירושו תפל, משעמם או חסר חיות.",
      },
      {
        id: "2",
        plainText: "sheer",
        isCorrect: true,
        explanation:
          "sheer מתאר אריג דקיק ושקוף למחצה, המאפשר לאור השמש לעבור דרכו בקלות.",
      },
      {
        id: "3",
        plainText: "slated",
        isCorrect: false,
        explanation: "slated פירושו מתוכנן או מיועד למועד מסוים.",
      },
      {
        id: "4",
        plainText: "fond",
        isCorrect: false,
        explanation: "fond פירושו מחבב או בעל חיבה למשהו.",
      },
    ],
  },
  {
    id: "eng-vocab-accustomed",
    domain: "VOCABULARY",
    title: "אנגלית - אוצר מילים בהקשר",
    context: "He is not ___ to eating spicy food.",
    instruction: "בחר את המילה המתאימה ביותר להשלמת המשפט:",
    options: [
      {
        id: "1",
        plainText: "steadfast",
        isCorrect: false,
        explanation: "steadfast פירושו נחוש או יציב.",
      },
      {
        id: "2",
        plainText: "accustomed",
        isCorrect: true,
        explanation:
          "הביטוי accustomed to פירושו 'מורגל ב-', ומתאים בדיוק להקשר של הרגלי אכילה.",
      },
      {
        id: "3",
        plainText: "imminent",
        isCorrect: false,
        explanation: "imminent פירושו עומד להתרחש בקרוב.",
      },
      {
        id: "4",
        plainText: "formidable",
        isCorrect: false,
        explanation: "formidable פירושו מרתיע או מאיים.",
      },
    ],
  },
  {
    id: "eng-vocab-indispensable",
    domain: "VOCABULARY",
    title: "אנגלית - אוצר מילים בהקשר",
    context: "A good dictionary is an ___ tool for learning a new language.",
    instruction: "בחר את המילה המתאימה ביותר להשלמת המשפט:",
    options: [
      {
        id: "1",
        plainText: "exalted",
        isCorrect: false,
        explanation: "exalted פירושו רם מעלה או נשגב.",
      },
      {
        id: "2",
        plainText: "far-fetched",
        isCorrect: false,
        explanation: "far-fetched פירושו מופרך או בלתי סביר.",
      },
      {
        id: "3",
        plainText: "indispensable",
        isCorrect: true,
        explanation:
          "indispensable פירושו חיוני שאי אפשר בלעדיו, ומתאים לתיאור כלי עזר הכרחי.",
      },
      {
        id: "4",
        plainText: "sublime",
        isCorrect: false,
        explanation: "sublime פירושו נשגב או מעולה.",
      },
    ],
  },
  {
    id: "eng-vocab-inevitable",
    domain: "VOCABULARY",
    title: "אנגלית - אוצר מילים בהקשר",
    context: "Change is ___; you cannot stop it from happening.",
    instruction: "בחר את המילה המתאימה ביותר להשלמת המשפט:",
    options: [
      {
        id: "1",
        plainText: "ambiguous",
        isCorrect: false,
        explanation: "ambiguous פירושו מעורפל או בעל משמעות כפולה.",
      },
      {
        id: "2",
        plainText: "lucid",
        isCorrect: false,
        explanation: "lucid פירושו צלול או ברור.",
      },
      {
        id: "3",
        plainText: "inevitable",
        isCorrect: true,
        explanation:
          "inevitable פירושו בלתי נמנע, וממשיך את הרעיון שאי אפשר לעצור את השינוי.",
      },
      {
        id: "4",
        plainText: "obstinate",
        isCorrect: false,
        explanation: "obstinate פירושו עקשן.",
      },
    ],
  },
  {
    id: "eng-vocab-unprecedented",
    domain: "VOCABULARY",
    title: "אנגלית - אוצר מילים בהקשר",
    context: "The team's success was ___; they had never won before.",
    instruction: "בחר את המילה המתאימה ביותר להשלמת המשפט:",
    options: [
      {
        id: "1",
        plainText: "curvilinear",
        isCorrect: false,
        explanation: "curvilinear פירושו עקום או מעוגל.",
      },
      {
        id: "2",
        plainText: "contiguous",
        isCorrect: false,
        explanation: "contiguous פירושו סמוך או גובל.",
      },
      {
        id: "3",
        plainText: "pervasive",
        isCorrect: false,
        explanation: "pervasive פירושו מתפשט או חודר לכל מקום.",
      },
      {
        id: "4",
        plainText: "unprecedented",
        isCorrect: true,
        explanation:
          "unprecedented פירושו חסר תקדים, כפי שמסביר המשכו של המשפט: 'הם מעולם לא ניצחו קודם לכן'.",
      },
    ],
  },

  // ================= חלק ב': ניסוח מחדש (Restatements) =================
  {
    id: "eng-restatement-lemming",
    domain: "RESTATEMENT",
    title: "אנגלית - ניסוח מחדש",
    context: "The lemming, a small rodent, is the snowy owl's main prey.",
    instruction: "בחר את המשפט שמשמעותו היא הקרובה ביותר למשפט המקורי:",
    options: [
      {
        id: "1",
        plainText: "The snowy owl hunts mostly small rodents called lemmings.",
        isCorrect: true,
        explanation:
          "המשפט משמר במדויק את הקביעה שהלמינג הוא הטרף המרכזי (main prey -> hunts mostly) של הינשוף.",
      },
      {
        id: "2",
        plainText: "Both snowy owls and lemmings hunt small rodents.",
        isCorrect: false,
        explanation: "מסיח הטוען בטעות ששני בעלי החיים צדים מכרסמים.",
      },
      {
        id: "3",
        plainText: "Lemmings are the only rodents eaten by the snowy owl.",
        isCorrect: false,
        explanation:
          "מסיח המקצין ל-'רק' (the only), בעוד המקור דיבר על טרף עיקרי.",
      },
      {
        id: "4",
        plainText: "Snowy owls eat rodents and lemmings.",
        isCorrect: false,
        explanation:
          "מסיח שאינו משקף את העובדה שלמינג הוא סוג של מכרסם.",
      },
    ],
  },
  {
    id: "eng-restatement-olympics",
    domain: "RESTATEMENT",
    title: "אנגלית - ניסוח מחדש",
    context: "The Olympic Games were originally held in Greece in 776 B.C.E.",
    instruction: "בחר את המשפט שמשמעותו היא הקרובה ביותר למשפט המקורי:",
    options: [
      {
        id: "1",
        plainText: "The first Olympic Games took place in Greece in 776 B.C.E.",
        isCorrect: true,
        explanation:
          'המילה originally מקבילה במשמעותה ל-the first games, ושתיהן מתארכות את התחרות הראשונה לשנת 776 לפנה"ס.',
      },
      {
        id: "2",
        plainText:
          "The Olympic Games have been held in Greece since 776 B.C.E.",
        isCorrect: false,
        explanation:
          "מסיח הטוען שהמשחקים מתקיימים ברצף מאז ועד היום.",
      },
      {
        id: "3",
        plainText:
          "By 776 B.C.E., Olympic Games were held regularly in Greece.",
        isCorrect: false,
        explanation:
          "מסיח המציג את המשחקים כאירוע שכבר היה סדיר לפני תאריך זה.",
      },
      {
        id: "4",
        plainText: "In 776 B.C.E., the Olympic Games took place in Greece.",
        isCorrect: false,
        explanation: "מסיח המשמיט את מרכיב הראשוניות (originally).",
      },
    ],
  },
  {
    id: "eng-restatement-parrot",
    domain: "RESTATEMENT",
    title: "אנגלית - ניסוח מחדש",
    context: "The African Grey parrot can mimic human speech.",
    instruction: "בחר את המשפט שמשמעותו היא הקרובה ביותר למשפט המקורי:",
    options: [
      {
        id: "1",
        plainText:
          "The African Grey parrot can be taught to communicate verbally.",
        isCorrect: false,
        explanation:
          "מסיח המייחס לתוכי הבנה תקשורתית, בעוד המקור מתאר חיקוי קולי בלבד.",
      },
      {
        id: "2",
        plainText: "The African Grey parrot can imitate a person speaking.",
        isCorrect: true,
        explanation:
          "הפועל imitate הוא מילה נרדפת מדויקת ל-mimic, ו-a person speaking מקביל ל-human speech.",
      },
      {
        id: "3",
        plainText: "The African Grey parrot interacts well with humans.",
        isCorrect: false,
        explanation: "מסיח המתייחס להתנהגות חברתית.",
      },
      {
        id: "4",
        plainText: "The African Grey parrot understands human speech.",
        isCorrect: false,
        explanation: "מסיח הטוען להבנת השפה (understands).",
      },
    ],
  },
  {
    id: "eng-restatement-belize",
    domain: "RESTATEMENT",
    title: "אנגלית - ניסוח מחדש",
    context:
      "Tourists are drawn to Belize's Turneffe Islands by the promise of pristine beaches.",
    instruction: "בחר את המשפט שמשמעותו היא הקרובה ביותר למשפט המקורי:",
    options: [
      {
        id: "1",
        plainText:
          "Beach-loving tourists will not be disappointed by Belize's Turneffe Islands.",
        isCorrect: false,
        explanation: "מסיח שאינו משקף את הסיבתיות שבמשפט המקורי.",
      },
      {
        id: "2",
        plainText:
          "The once peaceful beaches of Belize's Turneffe Islands have been overrun by tourists.",
        isCorrect: false,
        explanation: "מסיח בעל קונוטציה שלילית שאינה מופיעה במקור.",
      },
      {
        id: "3",
        plainText:
          "Unspoiled beaches make Belize's Turneffe Islands a popular tourist destination.",
        isCorrect: true,
        explanation:
          "המילה unspoiled היא תרגום ישיר ל-pristine (בתולי/לא נגוע), והמשפט משמר במדויק את המשיכה התיירותית.",
      },
      {
        id: "4",
        plainText:
          "Visitors to Belize's Turneffe Islands rave about the magnificent beaches.",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "eng-restatement-indonesia",
    domain: "RESTATEMENT",
    title: "אנגלית - ניסוח מחדש",
    context:
      "Never before has Indonesia been mentioned in the American press as frequently as this year.",
    instruction: "בחר את המשפט שמשמעותו היא הקרובה ביותר למשפט המקורי:",
    options: [
      {
        id: "1",
        plainText:
          "This year, Indonesia was mentioned in the American press just as frequently as in any previous year.",
        isCorrect: false,
        explanation: "מסיח הטוען לשוויון בתדירות במקום שיא חדש.",
      },
      {
        id: "2",
        plainText:
          "This year, according to many reports in American newspapers, was Indonesia's most eventful year ever.",
        isCorrect: false,
        explanation: "מסיח המסיט את הנושא לתוכן האירועים באינדונזיה.",
      },
      {
        id: "3",
        plainText:
          "This year, more American newspapers were read in Indonesia than ever before.",
        isCorrect: false,
        explanation: "מסיח המציג קריאת עיתונים אמריקאיים בתוך אינדונזיה.",
      },
      {
        id: "4",
        plainText:
          "This year, the American press has mentioned Indonesia more often than during any previous year.",
        isCorrect: true,
        explanation:
          "המשפט מנסח מחדש בצורה חיובית את משפט השלילה: מעולם לא הוזכרה כה רבות = השנה הוזכרה יותר מאי פעם בעבר.",
      },
    ],
  },
  {
    id: "eng-restatement-cowardice",
    domain: "RESTATEMENT",
    title: "אנגלית - ניסוח מחדש",
    context:
      '"To know what is right and not to do it is the worst cowardice." (Confucius)',
    instruction: "בחר את המשפט שמשמעותו היא הקרובה ביותר למשפט המקורי:",
    options: [
      {
        id: "1",
        plainText: "Only cowards do not know what is right.",
        isCorrect: false,
        explanation:
          "מסיח המציג אי-ידיעה, בעוד הפתגם מדבר על מי שיודע ובכל זאת נמנע מפעולה.",
      },
      {
        id: "2",
        plainText: "Not knowing what is right is worse than cowardice.",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "Cowards never do the right thing.",
        isCorrect: false,
        explanation: "מסיח מכליל.",
      },
      {
        id: "4",
        plainText: "Not doing what you know is right is cowardly.",
        isCorrect: true,
        explanation:
          "המשפט משמר את הליבה המדויקת של קונפוציוס: הימנעות מביצוע מה שאתה יודע שנכון מהווה מעשה פחדני.",
      },
    ],
  },
];
