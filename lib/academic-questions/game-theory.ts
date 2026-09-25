import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Game Theory diagnostic bank (12Q).
 * Display name: "תורת המשחקים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const GAME_THEORY_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "gt-q01-nash-equilibrium-definition",
    domain: "Nash equilibrium",
    title: "תורת המשחקים - Nash equilibrium",
    context:
      "משחק אסטרטגי סופי עם שחקנים $i=1,\\dots,n$, מרחבי אסטרטגיות $S_i$, ופונקציות תועלת $u_i: S_1\\times\\cdots\\times S_n \\to \\mathbb{R}$.",
    formulaLatex:
      "u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*) \\quad \\forall s_i \\in S_i,\\ \\forall i",
    instruction:
      "מהי ההגדרה המדויקת של שיווי משקל נאש באסטרטגיות טהורות?",
    options: [
      {
        id: "gt-q01-opt1",
        plainText:
          "פרופיל $s^*$ הוא שיווי משקל נאש אם לכל שחקן $i$ האסטרטגיה $s_i^*$ היא תגובה מיטבית ל-$s_{-i}^*$: אף שחקן אינו מרוויח מסטייה חד-צדדית.",
        mathText:
          "u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*) \\ \\forall s_i",
        isCorrect: true,
        explanation:
          "נכון: זו הגדרת Nash (1950). היציבות היא מושגית מקומית לכל שחקן בנפרד מול האחרים הקבועים. אין דרישה ליעילות פארטו או למקסום רווחה חברתית — רק לחוסר תמריץ לסטייה חד-צדדית.",
      },
      {
        id: "gt-q01-opt2",
        plainText: "שיווי משקל נאש דורש שכל השחקנים יקבלו תועלת זהה $u_1=u_2=\\cdots=u_n$.",
        isCorrect: false,
        explanation:
          "שגוי: שוויון תועלות אינו חלק מההגדרה; משחקים אסימטריים מקיימים נאש עם payoffs שונים.",
      },
      {
        id: "gt-q01-opt3",
        plainText: "נאש קיים רק אם יש אסטרטגיה שלטת חזקה לכל שחקן.",
        isCorrect: false,
        explanation:
          "שגוי: אסטרטגיה שלטת מספיקה לנאש אך אינה הכרחית; משחקים רבים בעלי נאש ללא שליטה חזקה.",
      },
      {
        id: "gt-q01-opt4",
        plainText: "בשיווי משקל נאש חייב להתקיים מקסימום לסכום התועלות $\\sum_i u_i$.",
        isCorrect: false,
        explanation:
          "שגוי: דילמת האסיר היא דוגמה קלאסית לנאש שאינו יעיל פארטו ואינו ממקסם סכום תועלות.",
      },
    ],
  },
  {
    id: "gt-q02-dominant-strategies",
    domain: "dominant strategies",
    title: "תורת המשחקים - dominant strategies",
    context:
      "לשחקן $i$ יש אסטרטגיה $s_i^D$ ואסטרטגיה חלופית $s_i'$. התועלות מושוות לכל פרופיל אסטרטגיות של האחרים $s_{-i}$.",
    formulaLatex:
      "u_i(s_i^D, s_{-i}) \\ge u_i(s_i', s_{-i}) \\quad \\forall s_{-i},\\ \\forall s_i' \\neq s_i^D",
    instruction:
      "מתי אסטרטגיה נקראת שלטת (חלשה/חזקה), ומה הקשר לשיווי משקל?",
    options: [
      {
        id: "gt-q02-opt1",
        plainText:
          "אסטרטגיה שלטת חלשה מניבה תועלת שאינה נמוכה יותר מכל חלופה לכל $s_{-i}$ (ולפחות אי-שוויון חזק באחד); אם לכל שחקן יש אסטרטגיה שלטת, פרופיל האסטרטגיות השלטוּת הוא שיווי משקל נאש.",
        isCorrect: true,
        explanation:
          "נכון: שליטה חזקה דורשת $>$ לכל $s_{-i}$; שליטה חלשה דורשת $\\ge$ עם יתרון לפחות במקרה אחד. חיתוך אסטרטגיות שלטוּת הוא נאש (ואף DSЕ). עם זאת, נאש יכול להתקיים גם בלי שליטה.",
      },
      {
        id: "gt-q02-opt2",
        plainText: "אסטרטגיה שלטת חייבת להיות הטובה ביותר רק מול שיווי משקל נאש אחד ספציפי.",
        isCorrect: false,
        explanation:
          "שגוי: שליטה נבדקת מול כל $s_{-i}$ אפשרי, לא רק מול שיווי משקל יחיד.",
      },
      {
        id: "gt-q02-opt3",
        plainText: "קיום אסטרטגיה שלטת מבטיח יחידות של שיווי משקל נאש בכל משחק.",
        isCorrect: false,
        explanation:
          "שגוי: ייתכנו נאש נוספים באסטרטגיות מעורבות או באסטרטגיות לא-שלטוּת של שחקנים אחרים.",
      },
      {
        id: "gt-q02-opt4",
        plainText: "אסטרטגיה שלטת מוגדרת רק במשחקי סכום-אפס עם ערך מינימקס.",
        isCorrect: false,
        explanation:
          "שגוי: שליטה מוגדרת לכל משחק אסטרטגי כללי, לא רק לסכום-אפס.",
      },
    ],
  },
  {
    id: "gt-q03-mixed-strategy-nash",
    domain: "mixed strategies",
    title: "תורת המשחקים - mixed strategies",
    context:
      "במשחק $2\\times 2$ ללא נאש טהור (למשל Matching Pennies), שחקן $i$ בוחר התפלגות $\\sigma_i$ מעל אסטרטגיות טהורות.",
    formulaLatex:
      "u_i(\\sigma_i^*,\\sigma_{-i}^*) \\ge u_i(\\sigma_i,\\sigma_{-i}^*) \\quad \\forall \\sigma_i,\\quad \\text{support: equalizing payoffs}",
    instruction:
      "מה מאפיין שיווי משקל נאש באסטרטגיות מעורבות?",
    options: [
      {
        id: "gt-q03-opt1",
        plainText:
          "בשיווי משקל מעורב, כל אסטרטגיה טהורה בתומך (support) של $\\sigma_i^*$ מניבה אותה תוחלת תועלת מול $\\sigma_{-i}^*$, והשחקן אדיש ביניהן; אסטרטגיות מחוץ לתומך אינן עדיפות.",
        mathText:
          "u_i(s_i,\\sigma_{-i}^*) = u_i(s_i',\\sigma_{-i}^*) \\text{ for } s_i,s_i'\\in \\mathrm{supp}(\\sigma_i^*)",
        isCorrect: true,
        explanation:
          "נכון: תנאי האדישות (indifference) קובע את ההסתברויות של היריב. ב-Matching Pennies כל שחקן משחק $1/2$–$1/2$ כדי להפוך את היריב לאדיש. משפט נאש מבטיח קיום נאש מעורב במשחקים סופיים גם כשאין נאש טהור.",
      },
      {
        id: "gt-q03-opt2",
        plainText: "אסטרטגיה מעורבת פירושה שהשחקן משנה את פונקציית התועלת עצמה במהלך המשחק.",
        isCorrect: false,
        explanation:
          "שגוי: התועלת $u_i$ קבועה; המעורבות היא התפלגות על פעולות, לא שינוי העדפות.",
      },
      {
        id: "gt-q03-opt3",
        plainText: "בנאש מעורב חייבים כל האסטרטגיות הטהורות לקבל הסתברות חיובית זהה תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: התומך והמשקלות נקבעים מאיפוק אדישות; לא כל האסטרטגיות חייבות בתומך, וההסתברויות אינן בהכרח אחידות.",
      },
      {
        id: "gt-q03-opt4",
        plainText: "אסטרטגיות מעורבות אסורות במשחקים עם תועלת צפויה ליניארית ב-von Neumann–Morgenstern.",
        isCorrect: false,
        explanation:
          "שגוי: דווקא תועלת vNM ליניארית בהתפלגות היא הבסיס לניתוח אסטרטגיות מעורבות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "gt-q04-prisoners-dilemma",
    domain: "Prisoner's dilemma",
    title: "תורת המשחקים - Prisoner's dilemma",
    context:
      "בדילמת האסיר הקלאסית לכל שחקן יש פעולות C (שיתוף) ו-D (בגידה), עם payoffs המקיימים $T>R>P>S$ ו-$2R>T+S$.",
    formulaLatex:
      "u(D,C)=T>R=u(C,C)>P=u(D,D)>S=u(C,D)",
    instruction:
      "מהו התוצאה התאורטית המרכזית בדילמת האסיר החד-פעמית?",
    options: [
      {
        id: "gt-q04-opt1",
        plainText: "שיווי המשקל היחיד הוא $(C,C)$ כי הוא יעיל פארטו.",
        isCorrect: false,
        explanation:
          "שגוי: $(C,C)$ יעיל פארטו אך אינו נאש; לכל אחד יש תמריץ לסטות ל-$D$.",
      },
      {
        id: "gt-q04-opt2",
        plainText:
          "$(D,D)$ הוא שיווי משקל נאש באסטרטגיות שלטוּת, אף שהוא נחות פארטו ל-$(C,C)$ — המחשה למתח בין רציונליות אישית ליעילות קולקטיבית.",
        isCorrect: true,
        explanation:
          "נכון: $D$ שולט על $C$ לכל שחקן, ולכן $(D,D)$ הוא נאש יחיד בטהורות. עם זאת $R>P$ כך ש-$(C,C)$ עדיף לשניהם. זה הבסיס לניתוח כשלי שיתוף, הסכמים ואכיפה, ומשחקים חוזרים (folk theorems) שיכולים לתמוך בשיתוף.",
      },
      {
        id: "gt-q04-opt3",
        plainText: "אין שיווי משקל נאש בדילמת האסיר החד-פעמית.",
        isCorrect: false,
        explanation:
          "שגוי: $(D,D)$ הוא נאש מובהק; הבעיה היא יעילות, לא קיום.",
      },
      {
        id: "gt-q04-opt4",
        plainText: "התנאי $2R>T+S$ מבטל את האפשרות לשיווי משקל מעורב.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה מבטיח שיעילות קולקטיבית של שיתוף עדיפה על תנודות ניצול; הוא אינו קשור ישירות לביטול מעורבות. ב-PD הטהור השליטה ב-$D$ ממילא מונעת מעורבות פנימית.",
      },
    ],
  },
  {
    id: "gt-q05-stackelberg-leadership",
    domain: "Stackelberg",
    title: "תורת המשחקים - Stackelberg",
    context:
      "במשחק Stackelberg מנהיג (Leader) בוחר כמות/פעולה $q_L$ ראשון, והעוקב (Follower) בוחר $q_F$ לאחר שראה את $q_L$. הפונקציות הן רווחי קורנו סטנדרטיים.",
    formulaLatex:
      "q_F^*(q_L)=\\arg\\max_{q_F} \\pi_F(q_L,q_F),\\quad q_L^*=\\arg\\max_{q_L}\\pi_L(q_L,q_F^*(q_L))",
    instruction:
      "מה מבדיל שיווי משקל Stackelberg משיווי משקל נאש סימולטני (Cournot)?",
    options: [
      {
        id: "gt-q05-opt1",
        plainText: "ב-Stackelberg שני השחקנים בוחרים בו-זמנית ללא תצפית.",
        isCorrect: false,
        explanation:
          "שגוי: זו הגדרת Cournot/Nash סימולטני; Stackelberg הוא משחק סדרתי עם יתרון מהלך ראשון.",
      },
      {
        id: "gt-q05-opt2",
        plainText:
          "המנהיג מפנימי את פונקציית התגובה של העוקב ובוחר נקודה על עקומת התגובה של העוקב; בדרך כלל המנהיג מרוויח יותר מאשר ב-Cournot הסימולטני (יתרון מהלך ראשון).",
        isCorrect: true,
        explanation:
          "נכון: הפתרון הוא SPNE של משחק אקסטנסיבי: העוקב מייעל בהינתן $q_L$, והמנהיג ממקסם תוך התחשבות ב-$q_F^*(q_L)$. בכמויות הומוגניות המנהיג מייצר יותר, העוקב פחות, ורווח המנהיג גבוה מרווח Cournot הסימטרי — כל עוד אין אמינות/מחויבות שבורה.",
      },
      {
        id: "gt-q05-opt3",
        plainText: "ב-Stackelberg העוקב תמיד מקבל תועלת גבוהה יותר מהמנהיג בהכרח.",
        isCorrect: false,
        explanation:
          "שגוי: במודל הכמויות הסטנדרטי דווקא המנהיג נהנה מיתרון; העוקב נפגע יחסית.",
      },
      {
        id: "gt-q05-opt4",
        plainText: "Stackelberg דורש מידע חסר מושלם ואין לו פתרון באינדוקציה לאחור.",
        isCorrect: false,
        explanation:
          "שגוי: המודל הקלאסי הוא מידע מושלם על המהלך הקודם, ונפתר באינדוקציה לאחור / SPNE.",
      },
    ],
  },
  {
    id: "gt-q06-bayesian-games-harsanyi",
    domain: "Bayesian games",
    title: "תורת המשחקים - Bayesian games",
    context:
      "לשחקנים טיפוסים פרטיים $\\theta_i$ עם התפלגות משותפת קודמת $p(\\theta)$, ופעולות נבחרות לפני/ללא ידיעת טיפוסי האחרים.",
    formulaLatex:
      "\\sigma_i(\\cdot\\mid\\theta_i)\\in\\arg\\max \\sum_{\\theta_{-i}} p(\\theta_{-i}\\mid\\theta_i)\\, u_i(a_i,a_{-i},\\theta)",
    instruction:
      "כיצד מוגדר שיווי משקל באיזיאני (Bayesian Nash Equilibrium)?",
    options: [
      {
        id: "gt-q06-opt1",
        plainText: "כל שחקן ממקסם תועלת כאילו הטיפוסים של כולם ידועים בוודאות לפני הבחירה.",
        isCorrect: false,
        explanation:
          "שגוי: זהו משחק מידע מלא; בבייזיאני הטיפוסים הפרטיים אינם ידועים לאחרים.",
      },
      {
        id: "gt-q06-opt2",
        plainText:
          "כל טיפוס $\\theta_i$ בוחר אסטרטגיה הממקסמת את תוחלת התועלת ביחס לאמונה המותנית על $\\theta_{-i}$ ולפרופיל האסטרטגיות של האחרים — שיווי משקל נאש במשחק המורחב של Harsanyi.",
        isCorrect: true,
        explanation:
          "נכון: Harsanyi ממיר אי-ודאות לטיפוסים מהטבע. BNE דורש אופטימליות לכל טיפוס בנפרד תחת Bayesian updating. דוגמאות: מכרזים, משא ומתן עם ערכים פרטיים, משחקי כניסה לשוק עם עלויות לא ידועות.",
      },
      {
        id: "gt-q06-opt3",
        plainText: "במשחק בייזיאני אסורות אסטרטגיות התלויות בטיפוס; חייבים לשחק אותה פעולה לכל $\\theta_i$.",
        isCorrect: false,
        explanation:
          "שגוי: אסטרטגיה בייזיאנית היא פונקציה מטיפוס להתפלגות על פעולות; התלות ב-$\\theta_i$ היא ליבת המודל.",
      },
      {
        id: "gt-q06-opt4",
        plainText: "שיווי משקל בייזיאני קיים רק אם $p(\\theta)$ מנוונת לנקודה יחידה.",
        isCorrect: false,
        explanation:
          "שגוי: קיום כללי במשחקים סופיים עם תוחלות מוגדרות היטב, גם תחת אי-ודאות לא-מנוונת.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "gt-q07-extensive-form-spne",
    domain: "extensive form SPNE",
    title: "תורת המשחקים - extensive form SPNE",
    context:
      "משחק בצורה אקסטנסיבית עם מידע מושלם סופי. שיווי משקל נאש של הצורה הנורמלית עלול לכלול איומים לא-אמינים מחוץ לנתיב המשחק.",
    formulaLatex:
      "\\text{SPNE: Nash in every subgame}",
    instruction:
      "מהו שיווי משקל נאש מושלם תת-משחק (SPNE), וכיצד מחשבים אותו?",
    options: [
      {
        id: "gt-q07-opt1",
        plainText: "SPNE הוא כל נאש של הצורה הנורמלית, ללא בדיקה בתתי-משחקים.",
        isCorrect: false,
        explanation:
          "שגוי: SPNE מחמיר מנאש רגיל ודורש אופטימליות בכל תת-משחק, גם מחוץ לנתיב שיווי המשקל.",
      },
      {
        id: "gt-q07-opt2",
        plainText: "SPNE קיים רק במשחקים בלי תתי-משחקים ראויים (proper subgames).",
        isCorrect: false,
        explanation:
          "שגוי: דווקא משחקים עם תתי-משחקים הם הזירה שבה SPNE מסנן איומים לא-אמינים.",
      },
      {
        id: "gt-q07-opt3",
        plainText:
          "SPNE הוא פרופיל אסטרטגיות המשרה נאש בכל תת-משחק; במשחקי מידע מושלם סופיים מחשבים באינדוקציה לאחור (backward induction) ופוסלים איומים שאינם אופטימליים אם התת-משחק מופעל.",
        isCorrect: true,
        explanation:
          "נכון: דוגמת שרשרת החנויות / כניסה לשוק: איום בלוחמה במחירים אינו אמין אם בפועל עדיף להכיל. אינדוקציה לאחור בוחרת בכל צומת סופי פעולה מיטבית וגולשת לאחור. במשחקי מידע לא-מושלם משתמשים בהרחבות (PBE וכד').",
      },
      {
        id: "gt-q07-opt4",
        plainText: "SPNE דורש ערבוב הסתברותי בכל צומת, גם אם יש תגובה מיטבית טהורה.",
        isCorrect: false,
        explanation:
          "שגוי: מעורבות נדרשת רק כשאין תגובה מיטבית טהורה יחידה / לצורך אדישות; אינה חובה כללית.",
      },
    ],
  },
  {
    id: "gt-q08-zero-sum-minimax",
    domain: "zero-sum minimax",
    title: "תורת המשחקים - zero-sum minimax",
    context:
      "משחק סכום-אפס סופי לשני שחקנים עם מטריצת תשלומים $A$ לשחקן השורה; לשחקן העמודה התשלום הוא $-A$.",
    formulaLatex:
      "\\max_{\\sigma_1}\\min_{\\sigma_2} \\sigma_1^T A \\sigma_2 = \\min_{\\sigma_2}\\max_{\\sigma_1} \\sigma_1^T A \\sigma_2 = v",
    instruction:
      "מה קובע משפט המינימקס של von Neumann למשחקי סכום-אפס?",
    options: [
      {
        id: "gt-q08-opt1",
        plainText: "לשחקן השורה תמיד יש אסטרטגיה שלטת טהורה שממקסמת את כל רכיבי $A$.",
        isCorrect: false,
        explanation:
          "שגוי: לא תמיד קיימת אסטרטגיה שלטת טהורה; הערך מובטח באסטרטגיות מעורבות.",
      },
      {
        id: "gt-q08-opt2",
        plainText: "בסכום-אפס אין שיווי משקל נאש לעולם.",
        isCorrect: false,
        explanation:
          "שגוי: משפט המינימקס מבטיח ערך $v$ ואסטרטגיות אופטימליות שהן בדיוק נאש של המשחק.",
      },
      {
        id: "gt-q08-opt3",
        plainText:
          "קיים ערך משחק $v$ כך שהמקסימין של השורה שווה למינימקס של העמודה; אסטרטגיות מעורבות אופטימליות מבטיחות לפחות $v$ (לשורה) ולכל היותר $v$ (לעמודה).",
        mathText: "\\max\\min = \\min\\max = v",
        isCorrect: true,
        explanation:
          "נכון: זהו משפט המינימקס. במשחקי סכום-אפס קבוצת נאש מזדהה עם זוגות אסטרטגיות מינימקס. הערך $v$ הוא תוחלת התשלום בשיווי משקל. במשחקים לא-סכום-אפס אין בהכרח שוויון מקסימין–מינימקס באותו מובן.",
      },
      {
        id: "gt-q08-opt4",
        plainText: "הערך $v$ קיים רק אם $A$ סימטרית אנטי-סימטרית עם אלכסון אפס בהכרח לכל מטריצה ריבועית בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: המשפט תקף לכל מטריצה ממשית סופית; אנטי-סימטריה היא מקרה פרטי (משחקים סימטריים עם $v=0$).",
      },
    ],
  },
  {
    id: "gt-q09-mechanism-design-basics",
    domain: "mechanism design basics",
    title: "תורת המשחקים - mechanism design basics",
    context:
      "מתכנן חברתי רוצה ליישם כלל בחירה חברתי $f(\\theta)$ כאשר הטיפוסים $\\theta$ פרטיים. המנגנון מגדיר הודעות $m_i$ ותוצאה/תשלומים כפונקציה של ההודעות.",
    formulaLatex:
      "\\text{IC: } \\theta_i \\in \\arg\\max_{\\hat\\theta_i} u_i\\big(g(\\hat\\theta_i,\\theta_{-i}),\\theta_i\\)",
    instruction:
      "מהו הרעיון המרכזי של תכנון מנגנונים (Mechanism Design) ועקרון גילוי האמת?",
    options: [
      {
        id: "gt-q09-opt1",
        plainText: "תכנון מנגנונים מניח שטיפוסים ציבוריים וידועים, ולכן IC מיותר.",
        isCorrect: false,
        explanation:
          "שגוי: ליבת השדה היא תמריצים תחת מידע פרטי; בלי אי-ודאות אין בעיית גילוי.",
      },
      {
        id: "gt-q09-opt2",
        plainText: "כל מנגנון שרירותי מממש אוטומטית כל כלל חברתי ללא תנאי תמריצים.",
        isCorrect: false,
        explanation:
          "שגוי: בלי תנאי תאימות תמריצים (IC) ועצמאות להשתתפות (IR) שחקנים ישקרו או לא ישתתפו.",
      },
      {
        id: "gt-q09-opt3",
        plainText:
          "לפי עקרון הגילוי (Revelation Principle), אם כלל ישים במנגנון כלשהו בשיווי משקל, הוא ישים גם במנגנון ישיר ותמריצי-אמת (truthful) שבו דיווח הטיפוס האמיתי אופטימלי — בכפוף ל-IC (ולרוב IR).",
        isCorrect: true,
        explanation:
          "נכון: ניתן לצמצם את מרחב החיפוש למנגנונים ישירים עם דיווח אמת. האתגר הוא לבנות תשלומים/הקצאות כך שדיווח $\\hat\\theta_i=\\theta_i$ יהיה אופטימלי. דוגמאות: VCG, מכרזים אופטימליים, בחירה ציבורית תחת אילוצי תמריצים.",
      },
      {
        id: "gt-q09-opt4",
        plainText: "עקרון הגילוי קובע שאי-אפשר לעולם ליישם כלל פארטו-יעיל עם מידע פרטי.",
        isCorrect: false,
        explanation:
          "שגוי: משפטי אי-אפשרות (כמו Myerson–Satterthwaite) חלים במקרים מסוימים, אך עקרון הגילוי עצמו הוא כלי ייצוג חיובי, לא אי-אפשרות גורפת.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "gt-q10-vickrey-auction",
    domain: "auction theory Vickrey",
    title: "תורת המשחקים - auction theory Vickrey",
    context:
      "מכרז Vickrey (מחיר שני, sealed-bid): כל משתתף מגיש הצעה $b_i$; הזוכה הוא בעל ההצעה הגבוהה ביותר, ומשלם את ההצעה השנייה בגובהה. ערכים פרטיים בלתי-תלויים $v_i$.",
    formulaLatex:
      "u_i = \\begin{cases} v_i - \\max_{j\\neq i} b_j & b_i > \\max_{j\\neq i} b_j \\\\ 0 & \\text{otherwise} \\end{cases}",
    instruction:
      "מהי האסטרטגיה השולטת במכרז Vickrey, ומדוע?",
    options: [
      {
        id: "gt-q10-opt1",
        plainText: "הגשה אופטימלית היא $b_i=0$ תמיד כדי לא לשלם.",
        isCorrect: false,
        explanation:
          "שגוי: הצעת אפס מוותרת על זכייה כאשר $v_i$ גבוה; אינה שולטת.",
      },
      {
        id: "gt-q10-opt2",
        plainText: "יש להגיש $b_i \\to \\infty$ כדי להבטיח זכייה בכל מחיר.",
        isCorrect: false,
        explanation:
          "שגוי: במחיר שני התשלום אינו ההצעה העצמית, אך הצעת יתר עלולה לגרום לזכייה בהפסד כאשר המחיר השני $>v_i$.",
      },
      {
        id: "gt-q10-opt3",
        plainText: "Vickrey שקול אסטרטגית למכרז מחיר ראשון עם אותה הצעה תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: במחיר ראשון יש shaded bids; ב-Vickrey דיווח אמת הוא שליט. Equivalence היא בתשלומים תוחלתיים תחת הנחות, לא באסטרטגיה זהה.",
      },
      {
        id: "gt-q10-opt4",
        plainText:
          "הגשת $b_i=v_i$ היא אסטרטגיה שלטת חלשה: המחיר נקבע ע״י אחרים, ולכן אין רווח משקרי כלפי מעלה/מטה — שקר למעלה מסכן זכייה מפסידה, שקר למטה מסכן אובדן עסקה רווחית.",
        mathText: "b_i^*=v_i",
        isCorrect: true,
        explanation:
          "נכון: זהו מקרה פרטי של VCG ליחידה בודדת. תמריץ האמת נובע מכך שהתשלום החיצוני (מחיר שני) אינו תלוי ב-$b_i$ פרט להכרעת הזכייה. לכן Vickrey יעיל הקצאתית (הערך הגבוה ביותר זוכה) תחת ערכים פרטיים סטנדרטיים.",
      },
    ],
  },
  {
    id: "gt-q11-cooperative-vs-noncooperative",
    domain: "cooperative vs noncooperative",
    title: "תורת המשחקים - cooperative vs noncooperative",
    context:
      "במשחק לא-שיתופי השחקנים בוחרים אסטרטגיות באופן עצמאי; במשחק שיתופי ניתן לכרות הסכמים מחייבים ולבחון קואליציות $S\\subseteq N$ עם פונקציית ערך $v(S)$.",
    formulaLatex:
      "\\text{Core: } \\sum_{i\\in S} x_i \\ge v(S)\\ \\forall S,\\quad \\sum_{i\\in N} x_i = v(N)",
    instruction:
      "מהו ההבדל המרכזי בין גישה לא-שיתופית לגישה שיתופית?",
    options: [
      {
        id: "gt-q11-opt1",
        plainText: "במשחק שיתופי אסור לדבר; בלא-שיתופי חובה לחתום על חוזים.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך המושגי — שיתופי מניח הסכמים מחייבים/קואליציות; לא-שיתופי מתמקד באסטרטגיות יחידניות.",
      },
      {
        id: "gt-q11-opt2",
        plainText: "נאש מוגדר רק במשחקים שיתופיים, והליבה רק בלא-שיתופיים.",
        isCorrect: false,
        explanation:
          "שגוי: נאש הוא מושג לא-שיתופי; הליבה (core), Shapley וכו' הם מושגי פתרון שיתופיים.",
      },
      {
        id: "gt-q11-opt3",
        plainText: "אין הבדל אנליטי: כל משחק שיתופי זהה לנאש של צורה נורמלית.",
        isCorrect: false,
        explanation:
          "שגוי: ניתן לקשר ביניהם דרך משחקים עם אכיפה, אך מושגי הפתרון והשאלות שונים (יציבות קואליציונית מול סטייה יחידנית).",
      },
      {
        id: "gt-q11-opt4",
        plainText:
          "בלא-שיתופי היציבות היא מול סטייה חד-צדדית מאסטרטגיה (נאש/SPNE); בשיתופי בוחנים חלוקות של $v(N)$ שאינן ניתנות לחסימה ע״י קואליציה (למשל הליבה) תחת הנחת הסכמים מחייבים.",
        isCorrect: true,
        explanation:
          "נכון: הגישה הלא-שיתופית שואלת 'מה ישחקו בלי אכיקה חיצונית?'; השיתופית שואלת 'כיצד לחלק רווח קואליציוני אם אפשר לאכוף הסכמים?'. כלים: נאש מול Core/Shapley/nucleolus. יישומים: מיקוח, עלויות משותפות, הקצאת רווחי שיתוף פעולה בשרשרת אספקה.",
      },
    ],
  },
  {
    id: "gt-q12-pareto-efficiency",
    domain: "Pareto efficiency",
    title: "תורת המשחקים - Pareto efficiency",
    context:
      "פרופיל תוצאות/אסטרטגיות $x$ משווה לפרופיל $y$ באמצעות וקטורי תועלת $(u_1,\\dots,u_n)$.",
    formulaLatex:
      "x \\succ_{P} y \\iff u_i(x)\\ge u_i(y)\\ \\forall i \\text{ and } > \\text{ for some } i",
    instruction:
      "מתי תוצאה נקראת יעילה פארטו, ומה הקשר לשיווי משקל נאש?",
    options: [
      {
        id: "gt-q12-opt1",
        plainText: "כל שיווי משקל נאש הוא בהכרח יעיל פארטו.",
        isCorrect: false,
        explanation:
          "שגוי: דילמת האסיר מפריכה זאת — $(D,D)$ נאש אך נשלט פארטו ע״י $(C,C)$.",
      },
      {
        id: "gt-q12-opt2",
        plainText: "יעילות פארטו דורשת מקסום של סכום התועלות בלבד תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: מקסום סכום (utilitarian) הוא קריטריון חזק יותר/אחר; יעילות פארטו היא היעדר שיפור חד-משמעי לכולם.",
      },
      {
        id: "gt-q12-opt3",
        plainText: "תוצאה יעילה פארטו קיימת רק אם המשחק סכום-אפס.",
        isCorrect: false,
        explanation:
          "שגוי: בסכום-אפס כל התוצאות יעילות פארטו במובן חלש לעיתים קרובות, אך היעילות מוגדרת גם במשחקים כלליים.",
      },
      {
        id: "gt-q12-opt4",
        plainText:
          "תוצאה יעילה פארטו אם אין תוצאה אחרת שמשפרת לפחות שחקן אחד בלי להרע לאחר; יעילות פארטו ונאש הם מושגים בלתי-תלויים — ייתכן נאש לא-יעיל וייתכנו תוצאות יעילות שאינן נאש.",
        isCorrect: true,
        explanation:
          "נכון: פארטו עוסק ברווחה השוואתית של וקטור התועלות; נאש עוסק בתמריצים לסטייה. הפער ביניהם הוא ליבת כשלי תיאום. כלים לגישור: חוזים, משחקים חוזרים, מנגנונים ותכנון תמריצים.",
      },
    ],
  },
];

export const ACADEMIC_GAME_THEORY_QUESTIONS = GAME_THEORY_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleGameTheoryOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = GAME_THEORY_QUESTIONS.slice(0, 3);
  const groupB = GAME_THEORY_QUESTIONS.slice(3, 6);
  const groupC = GAME_THEORY_QUESTIONS.slice(6, 12);

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
