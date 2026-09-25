/** Local mirror of DiagnosticQuestion — avoids circular import with diagnostic-questions. */
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

/* -------------------------------------------------------------------------- */
/* BAGRUT — Computer Science: שאלון ראשון (יסודות ועצמים)                      */
/* -------------------------------------------------------------------------- */

export const BAGRUT_CS_1_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "b-cs1-pass-by-value-reference",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - העברת פרמטרים וזיכרון (Java)",
    context:
      "נתון קטע הקוד הבא המופעל ב-main: int[] arr={1,2}; int num=5; modify(arr,num);",
    instruction:
      "מה יודפס בסיום ביצוע הקריאה לפעולה, אם הפעולה מוגדרת כך:",
    formulaLatex:
      "\\text{public static void modify(int[] a, int b) \\{} \\\\ \\quad \\text{b = b * 2;} \\\\ \\quad \\text{a[0] = a[0] + b;} \\\\ \\quad \\text{a = new int[]\\{10, 20\\};} \\\\ \\quad \\text{a[0] = 99;} \\\\ \\text{\\}}",
    options: [
      {
        id: "1",
        plainText: "11, 2, 5",
        isCorrect: true,
        explanation:
          "משתנה פרימיטיבי (num) מועבר כערך ולא משתנה. המערך arr מועבר כהפניה, ולכן a[0]+=b משנה את המערך המקורי ל-11. יצירת אובייקט חדש (new int[]) בתוך הפעולה משנה רק את ההפניה המקומית, ואינה משפיעה על arr המקורי.",
      },
      {
        id: "2",
        plainText: "99, 20, 5",
        isCorrect: false,
        explanation:
          "מסיח הנובע ממחשבה שיצירת האובייקט החדש דורסת את ההפניה המקורית.",
      },
      {
        id: "3",
        plainText: "99, 2, 10",
        isCorrect: false,
        explanation: "מסיח המניח שערך פרימיטיבי מועבר כהפניה.",
      },
      {
        id: "4",
        plainText: "11, 2, 10",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-polymorphism-overloading",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - פולימורפיזם והעמסת פעולות",
    context:
      'נתונות מחלקת Base ותת-מחלקה Sub (הדורסת פעולה מסוימת ומגדירה אחרת). בקוד מוגדר: Base b = new Sub(); Object s = "Hello"; b.print(s);',
    instruction:
      "מה תהיה תוצאת הריצה בהינתן החתימות הבאות במחלקות?",
    formulaLatex:
      "\\text{Base: void print(Object), void print(String)} \\\\ \\text{Sub: @Override void print(Object), void print(String)}",
    options: [
      {
        id: "1",
        plainText: "Sub-Str",
        isCorrect: false,
        explanation:
          "מסיח הנובע מהנחה שסוג האובייקט בזיכרון קובע את בחירת חתימת הפעולה בקומפילציה.",
      },
      {
        id: "2",
        plainText: "Sub-Obj",
        isCorrect: true,
        explanation:
          "בזמן קומפילציה נקבעת החתימה לפי הטיפוס המוצהר (Object), ולכן נבחרת החתימה print(Object). בזמן ריצה, מנגנון הקישור הדינמי מפעיל את הפעולה הדורסת במחלקה של האובייקט בפועל (Sub). לכן יודפס Sub-Obj.",
      },
      {
        id: "3",
        plainText: "Base-Str",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "שגיאת קומפילציה עקב אי-ודאות בזיהוי החתימה",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-2d-array-symmetric",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - מערך דו-ממדי ומטריצה סימטרית",
    context:
      "פעולה מקבלת מערך דו-ממדי ומבצעת לולאה כפולה. הלולאה החיצונית סורקת שורות (i), והלולאה הפנימית סורקת עמודות החל מ-j = i+1. בתוך הלולאה מחושב סכום: sum += mat[i][j] - mat[j][i].",
    instruction:
      "איזו מהטענות הבאות נכונה בהכרח לגבי הערך המוחזר עבור כל מטריצה סימטרית (כאשר mat[i][j] == mat[j][i])?",
    options: [
      {
        id: "1",
        plainText: "הפעולה תחזיר את סכום איברי האלכסון הראשי",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "הפעולה תחזיר 0 רק אם כל איברי המטריצה חיוביים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "הפעולה תחזיר תמיד 0",
        isCorrect: true,
        explanation:
          "הלולאות סורקות אך ורק את המשולש העליון של המטריצה (מעל האלכסון הראשי). מכיוון שהמטריצה סימטרית, כל איבר מתאפס בדיוק מול המקביל לו מעבר לאלכסון (mat[i][j] - mat[j][i] = 0). הסכום הכללי יהיה בהכרח 0.",
      },
      {
        id: "4",
        plainText: "תיזרק שגיאת ריצה ArrayIndexOutOfBoundsException",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-constructors-super",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - שרשור בנאים (Constructors)",
    context:
      "נתונות מחלקת Alpha ומחלקת Beta שיורשת ממנה. כל אחת מגדירה בנאי ריק ובנאי המקבל פרמטר, עם קריאות ל-this() ול-super(5).",
    instruction:
      "מה יודפס כתוצאה מביצוע ההוראה: Alpha obj = new Beta(3);?",
    formulaLatex:
      '\\text{Alpha(): print("A ")} \\\\ \\text{Alpha(int): this(); print("A"+x+" ")} \\\\ \\text{Beta(): super(5); print("B ")} \\\\ \\text{Beta(int): this(); print("B"+y+" ")}',
    options: [
      {
        id: "1",
        plainText: "A A5 B B3",
        isCorrect: false,
        explanation:
          "מסיח הנובע מאי-הבנה ש-super(5) לא קורא לבנאי הריק של Alpha אלא לבנאי עם הפרמטר (אשר קורא בתורו ל-this() הריק).",
      },
      {
        id: "2",
        plainText: "A B B3",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "A B3 B A5",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "A A5 B B3",
        isCorrect: true,
        explanation:
          "קריאה ל-Beta(3) קוראת ל-this() של Beta, אשר קורא ל-super(5) של Alpha. בנאי זה של Alpha קורא ל-this() (בנאי ריק) שמדפיס 'A ', ואז חוזר ומדפיס 'A5 '. לאחר מכן הבנאי הריק של Beta ממשיך ומדפיס 'B ', ולבסוף הבנאי Beta(3) מדפיס 'B3 '.",
      },
    ],
  },
  {
    id: "b-cs1-string-pool",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - מחרוזות (String Pool)",
    context:
      's1 = "Java", s2 = "Ja" + "va", s3 = new String("Java"), s4 = s3.intern(). משווים את המשתנים זה לזה פעם אחת עם אופרטור \'==\' ופעם עם equals.',
    instruction:
      "מה יודפס ברצף ההשוואות: (s1==s2), (s1==s3), (s1==s4), (s1.equals(s3))?",
    options: [
      {
        id: "1",
        plainText: "true false true true",
        isCorrect: true,
        explanation:
          "שרשור ליטרלים כמו s2 מתבצע בקומפילציה, ולכן נשמר ב-String Pool וזהה להפניה s1 (ההשוואה == מניבה true). יצירת new יוצרת אובייקט חדש בערימה (== מניב false). הפעולה intern() מחזירה את ההפניה מה-Pool (== מניב true). הפעולה equals() בודקת תוכן ולכן נכונה תמיד (true).",
      },
      {
        id: "2",
        plainText: "false false false true",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "true false false true",
        isCorrect: false,
        explanation: "מסיח (התעלמות מפעולת intern).",
      },
      {
        id: "4",
        plainText: "true true true true",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-null-pointer-array",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - מערך עצמים ומצביעי Null",
    context:
      "מערך people בגודל 5 נוצר כ-Person[]. בלולאה המקדמת ב-2 צעדים (i += 2), כל תא זוגי (0,2,4) מאותחל באובייקט Person חדש.",
    instruction:
      'מה תהיה התוצאה של ניסיון לגשת לשורה: System.out.println(people[1].getName()); ?',
    options: [
      {
        id: "1",
        plainText: 'יודפס "null"',
        isCorrect: false,
        explanation: "מסיח (הפעולה getName לא תחזיר מחרוזת מ-null).",
      },
      {
        id: "2",
        plainText: "תיזרק שגיאת זמן ריצה מסוג NullPointerException",
        isCorrect: true,
        explanation:
          "במערך אובייקטים שלא אותחל במלואו, תאים ריקים מקבלים אוטומטית ערך null. מכיוון שהתא באינדקס 1 (שאינו זוגי) מעולם לא קיבל אובייקט, פנייה לפעולת המחלקה עליו תגרור NullPointerException.",
      },
      {
        id: "3",
        plainText:
          "תתרחש שגיאת קומפילציה כיוון שהמערך לא אותחל במלואו",
        isCorrect: false,
        explanation: "מסיח (מערכים אינם מחייבים אתחול מלא בקומפילציה).",
      },
      {
        id: "4",
        plainText: 'יודפס ערך ברירת מחדל ריק ""',
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-short-circuit-eval",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - הערכה מקוצרת ופעולות קידום",
    context:
      "נתונים המשתנים x=4, y=8. הביטוי הראשון: res = (x++ > 4) && (++y > 8). הביטוי השני: res2 = (++x > 5) || (y++ > 8).",
    instruction:
      "מהם ערכי המשתנים x ו-y שיוצגו בסיום ביצוע שני הביטויים הללו?",
    options: [
      {
        id: "1",
        plainText: "6, 9",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "5, 9",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "6, 8",
        isCorrect: true,
        explanation:
          "בביטוי הראשון: נבדק האם 4 > 4 (שקר), ולאחר מכן x מקודם ל-5. בגלל קצר של AND, צד ימין (y) לא מתבצע. בביטוי השני: מקודם x ל-6 ונבדק 6 > 5 (אמת). בגלל קצר של OR, צד ימין שוב לא מתבצע ו-y נותר 8. התוצאה: 6, 8.",
      },
      {
        id: "4",
        plainText: "5, 8",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-static-variables",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - משתנים סטטיים",
    context:
      "מחלקה Counter כוללת משתנה סטטי count=0 ומשתנה מופע id=0. בבנאי (Constructor) מקדמים את count ב-1 ומקצים אותו ל-id. ב-main יוצרים את c1 ו-c2, ואז מוסיפים 5 ל-c1.count.",
    instruction:
      'מה יודפס כתוצאה מהשורה: System.out.println(c1.id + ", " + c2.id + ", " + Counter.count); ?',
    options: [
      {
        id: "1",
        plainText: "6, 2, 7",
        isCorrect: false,
        explanation:
          "מסיח המניח ששינוי השדה הסטטי משפיע רטרואקטיבית על משתני מופע.",
      },
      {
        id: "2",
        plainText: "1, 2, 2",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "שגיאת קומפילציה (אסור לגשת לשדה סטטי דרך מופע)",
        isCorrect: false,
        explanation: "מסיח (ב-Java מותר אך לא מומלץ לגשת דרך מופע).",
      },
      {
        id: "4",
        plainText: "1, 2, 7",
        isCorrect: true,
        explanation:
          "שדה סטטי הוא משותף לכלל המופעים במחלקה. בבנאי של c1 הוא מקודם ל-1 וה-id שלו 1. בבנאי c2 הוא מקודם ל-2 וה-id שלו 2. כשמגדילים דרך מופע (c1.count += 5) השדה המשותף מגיע ל-7. משתני ה-id הפרטיים נשארים ללא שינוי.",
      },
    ],
  },
  {
    id: "b-cs1-class-cast-exception",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - המרה דינמית ופולימורפיזם",
    context: "מחלקות Dog ו-Cat יורשות ממחלקת האב Animal.",
    instruction:
      "איזו משורות הקוד תעבור קומפילציה בהצלחה אך תזרוק שגיאת זמן ריצה ClassCastException?",
    options: [
      {
        id: "1",
        plainText: "Animal a = new Dog(); Dog d = (Dog) a;",
        isCorrect: false,
        explanation: "מסיח (המרה תקינה לחלוטין).",
      },
      {
        id: "2",
        plainText: "Animal a = new Animal(); Dog d = (Dog) a;",
        isCorrect: true,
        explanation:
          "הקומפיילר רואה המרה בין טיפוס האב לטיפוס הבן ומאשר אותה (Downcasting). עם זאת, בזמן הריצה נבדק האובייקט האמיתי בערימה (שהוא Animal בלבד). מאחר שהאובייקט אינו Dog, נזרקת השגיאה ClassCastException.",
      },
      {
        id: "3",
        plainText: "Dog d = new Dog(); Cat c = (Cat) d;",
        isCorrect: false,
        explanation:
          "מסיח (לא יעבור קומפילציה, אלו ענפים מקבילים בעץ ההורשה).",
      },
      {
        id: "4",
        plainText: "Animal a = new Dog(); Cat c = (Cat) (Animal) new Dog();",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-binary-search-logic",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - חיפוש בינארי",
    context:
      "נתונה פעולת חיפוש בינארי סטנדרטית, בה אם התנאי (arr[mid] < mid) מתקיים, אז מקדמים את low ל-mid + 1, אחרת מתקנים את high.",
    instruction:
      "מהו התנאי ההכרחי והמספיק על המערך כדי שהפעולה תמצא בוודאות איבר המקיים (arr[i] == i) אם הוא קיים?",
    options: [
      {
        id: "1",
        plainText: "המערך ממוין עולה ויכול לכלול איברים זהים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "המערך כולל רק איברים חיוביים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "המערך ממוין בסדר עולה ממש של מספרים שלמים שונים זה מזה",
        isCorrect: true,
        explanation:
          "החיפוש הבינארי מניח שאם arr[mid] < mid, אין טעם לחפש בחצי השמאלי (כי הערכים קטנים מהאינדקסים בקצב מהיר יותר). הלוגיקה הזו נשמרת אך ורק אם כל איברי המערך הם מספרים שלמים השונים זה מזה ממש (כפילויות ישברו את קצב הגידול). לכן נדרש מערך ממוין עולה ונטול כפילויות.",
      },
      {
        id: "4",
        plainText:
          "הפעולה תמצא את האיבר לכל מערך ממוין ללא תלות בכפילויות",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs1-min-max-search-opt",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - אלגוריתמיקה: חיפוש אופטימלי",
    context: "נתון מערך באורך n >= 2.",
    instruction:
      "כמה פעולות השוואה בין איברים לכל היותר נדרשות בגישה האופטימלית למציאת איבר המינימום והמקסימום גם יחד?",
    options: [
      {
        id: "1",
        plainText: "2n - 2",
        isCorrect: false,
        explanation:
          "מסיח המתאר את הגישה הנאיבית של שתי ריצות עוקבות.",
      },
      {
        id: "2",
        plainText: "n * log(n)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "n - 1",
        isCorrect: false,
        explanation: "מסיח המייצג חיפוש של מקסימום בלבד.",
      },
      {
        id: "4",
        plainText: "כ- 1.5n השוואות (באופן מדויק 3n/2 - 2)",
        mathText: "\\approx \\lceil \\frac{3n}{2} \\rceil - 2",
        isCorrect: true,
        explanation:
          "בגישה אופטימלית, משווים תחילה את האיברים בזוגות (n/2 השוואות). המנצחים נבדקים מול המקסימום המקומי (n/2 השוואות נוספות), והמפסידים נבדקים מול המינימום. סך כל ההשוואות קרוב ל-3n/2 במקום 2n בגישה רגילה.",
      },
    ],
  },
  {
    id: "b-cs1-java-access-modifiers",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון ראשון - רמות נגישות (Access Modifiers)",
    context:
      "החוקים הקובעים את תכונות ההורשה (Inheritance) והדריסה (Overriding) ב-Java.",
    instruction:
      "איזו מהטענות הבאות לגבי מנגנון ההורשה וההרשאה נכונה תמיד?",
    options: [
      {
        id: "1",
        plainText:
          "מחלקת בן יכולה לשנות חופשית את סוג הערך המוחזר בעת דריסה",
        isCorrect: false,
        explanation:
          "מסיח (הערך המוחזר חייב להיות אותו טיפוס או תת-טיפוס שלו - Covariant Return Type).",
      },
      {
        id: "2",
        plainText:
          "בנאי (Constructor) אינו קורא לבנאי האב אוטומטית אלא אם צוין במפורש",
        isCorrect: false,
        explanation: "מסיח (נקרא תמיד בנאי אב ריק כברירת מחדל).",
      },
      {
        id: "3",
        plainText:
          "מחלקה ב-Java יכולה לרשת ממספר מחלקות אב במקביל (Multiple Inheritance)",
        isCorrect: false,
        explanation:
          "מסיח (Java תומכת בהורשה יחידה בלבד למחלקות, אך מאפשרת מימוש של ריבוי ממשקים - Interfaces).",
      },
      {
        id: "4",
        plainText:
          "שיטה הדורסת שיטה ממחלקת אב אינה יכולה להחמיר את רמת הגישה שלה (למשל מ-protected ל-private)",
        isCorrect: true,
        explanation:
          "עקרון ההחלפה של ליסקוב מחייב שמחלקת בת תשמר או תרחיב את הגישה שניתנה במחלקת האב. לכן, שיטה מוגנת (protected) תוכל להישאר מוגנת או להפוך לפומבית (public), אך אסור לה להפוך לפרטית (private).",
      },
    ],
  },
];


/* -------------------------------------------------------------------------- */
/* BAGRUT — Computer Science: שאלון שני (מבני נתונים ואוטומטים)               */
/* -------------------------------------------------------------------------- */

export const BAGRUT_CS_2_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "b-cs2-recursion-tree",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - מעקב רקורסיה עצי",
    context:
      "נתונה פעולה רקורסיבית rec המקבלת (n, k). תנאי העצירה: אם (n <= 0 || k <= 0) החזר 1. הצעד הרקורסיבי: return rec(n-1, k) + rec(n, k-1).",
    instruction:
      "מהו הערך המוחזר עבור הקריאה rec(2, 2) וכמה קריאות רקורסיביות יבוצעו בסך הכל?",
    options: [
      {
        id: "1",
        plainText: "ערך מוחזר 4, מספר קריאות 7",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "ערך מוחזר 6, מספר קריאות 11",
        isCorrect: true,
        explanation:
          "עץ הקריאות מתפצל לשניים בכל צעד. הקריאה rec(2,2) דורשת את rec(1,2) ו-rec(2,1). בסופו של עץ קריאות מלא (ניתן לדמות זאת למציאת מסלולים בסריג), ישנן 11 קריאות סך הכל לפעולה, והערך המוחזר מתנאי העצירה (שנכנס 6 פעמים לעלים) הוא 6.",
      },
      {
        id: "3",
        plainText: "ערך מוחזר 6, מספר קריאות 9",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "הפעולה נכנסת ללולאה אינסופית",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs2-complexity-nested-loops",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - סיבוכיות זמן ריצה",
    context:
      "קטע קוד כולל לולאה חיצונית הרצה מ-1 עד n בצעדי ++i, ובתוכה לולאה פנימית הרצה מ-1 עד n בצעדי של כפל: j *= 2.",
    instruction:
      "מהי סיבוכיות זמן הריצה (במקרה הגרוע) של קטע הקוד כתלות ב-n?",
    options: [
      {
        id: "1",
        plainText: "O(n^2)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "O(log n)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "O(n)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "O(n log n)",
        mathText: "O(n \\log n)",
        isCorrect: true,
        explanation:
          "הלולאה החיצונית ליניארית (n שלבים). הלולאה הפנימית מקדמת את המונה בכפל, ולכן רצה עד log(n) שלבים עבור כל ריצה חיצונית. כפל הסיבוכיות מניב O(n log n).",
      },
    ],
  },
  {
    id: "b-cs2-stack-permutation",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - סדר הוצאה ממחסנית (Stack)",
    context:
      "איברים מוכנסים למחסנית בסדר 1, 2, 3, 4, 5. ניתן לבצע פעולות push ו-pop לסירוגין.",
    instruction:
      "איזו מסדרות הפליטה (Pop) הבאות אינה אפשרית בשום פנים ואופן?",
    options: [
      {
        id: "1",
        plainText: "4, 5, 3, 2, 1",
        isCorrect: false,
        explanation:
          "מסיח (הוצאה חוקית אם מכניסים עד 4, שולפים, מכניסים 5 ושולפים את השאר).",
      },
      {
        id: "2",
        plainText: "1, 2, 3, 4, 5",
        isCorrect: false,
        explanation: "מסיח (חוקי - הכנסה ושליפה לסירוגין כל פעם).",
      },
      {
        id: "3",
        plainText: "3, 1, 2, 4, 5",
        isCorrect: true,
        explanation:
          "כדי שהאיבר 3 ייצא ראשון, יש להכניס את 1, 2, ואז 3 ואז לשלוף את 3. בשלב זה ראש המחסנית מכיל את 2, ומעליו אין דבר (ה-1 נמצא מתחתיו). לכן, הפעולה הבאה חייבת להוציא את 2 (או להכניס את 4). שליפה של 1 כאיבר שני אינה חוקית כי 2 חוסם אותו.",
      },
      {
        id: "4",
        plainText: "2, 4, 3, 5, 1",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs2-circular-queue-full",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - תור מעגלי (Circular Queue)",
    context:
      "נתון תור הממומש באמצעות מערך מעגלי בגודל N עם אינדקס ראש (head) וזנב (tail). מקובל לשמור תא אחד ריק כדי להבחין בין תור מלא לריק.",
    instruction:
      "מהו התנאי המקובל המצביע על כך שהתור מלא לחלוטין?",
    options: [
      {
        id: "1",
        plainText: "tail == head",
        isCorrect: false,
        explanation: "מסיח המעיד לרוב על תור ריק.",
      },
      {
        id: "2",
        plainText: "(head + 1) % N == tail",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "tail - head == N",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "(tail + 1) % N == head",
        isCorrect: true,
        explanation:
          "הוספת איבר לתור מעגלי מקדמת את אינדקס הזנב בצורה מודולרית. כדי להבדיל בין מצב ריק (זנב=ראש) למלא, אנו מונעים מהזנב לדרוס את הראש ומשאירים רווח של איבר אחד. לכן התור מוגדר כמלא כאשר זנב+1 מודולו גודל המערך מגיע בחזרה לאינדקס הראש.",
      },
    ],
  },
  {
    id: "b-cs2-linked-list-skip",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - מניפולציית רשימה מקושרת",
    context:
      "רשימה מקושרת לא ריקה מתחילה באיבר ראשון. בלולאה, כל עוד p אינו null ויש לו איבר עוקב, מבוצעת הפקודה: p.setNext(p.getNext().getNext()), ולאחר מכן p מוקדם ל-getNext() שנקבע כרגע.",
    instruction:
      "מה מבצעת הפעולה על הרשימה: 1 -> 2 -> 3 -> 4 -> 5 -> null ?",
    options: [
      {
        id: "1",
        plainText:
          "מוחקת את כל האיברים שבמקומות הזוגיים (הפלט: 1 -> 3 -> 5)",
        isCorrect: true,
        explanation:
          "באיטרציה הראשונה, p עומד על האיבר ה-1. הפקודה קובעת שהאיבר הבא אחרי 1 לא יהיה 2, אלא הבא אחריו - 3 (מחיקת חוליה 2). לאחר מכן מצביע p מדלג ישירות ל-3 (שהפך להיות ה-next של 1), ומוחק את 4. התוצאה הסופית תשאיר רק את האיברים במיקומים האי-זוגיים (1, 3, 5).",
      },
      {
        id: "2",
        plainText:
          "מוחקת את כל האיברים שבמקומות האי-זוגיים (הפלט: 2 -> 4)",
        isCorrect: false,
        explanation: "מסיח הפוך.",
      },
      {
        id: "3",
        plainText: "הופכת את כיוון החוליות ברשימה",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "זורקת שגיאת זמן ריצה NullPointerException",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs2-bst-inorder",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - עץ חיפוש בינארי (BST)",
    context:
      "סורקים עץ חיפוש בינארי המכיל מפתחות שונים שלמים בסריקה תוך-סדרית (In-order).",
    instruction: "מה תבטיח בהכרח סריקה זו?",
    options: [
      {
        id: "1",
        plainText: "את שורש העץ כאיבר הראשון בסדרה",
        isCorrect: false,
        explanation: "מסיח המתאים לסריקה טרום-סדרית (Pre-order).",
      },
      {
        id: "2",
        plainText: "סדרה ממוינת בסדר יורד",
        isCorrect: false,
        explanation: "מסיח המתאים לסריקה הפוכה (Right-Root-Left).",
      },
      {
        id: "3",
        plainText: "סדרה ממוינת בסדר עולה ממש של המפתחות בעץ",
        isCorrect: true,
        explanation:
          "תכונת עץ חיפוש בינארי קובעת שכל המפתחות בענף השמאלי קטנים מהשורש, ובימני גדולים ממנו. סריקת In-order מבקרת בשמאל, בשורש, ואז בימין, ולכן סורקת את הערכים בדיוק לפי סדר הגודל שלהם, באופן עולה.",
      },
      {
        id: "4",
        plainText: "את כל העלים בעץ לפני הצמתים הפנימיים",
        isCorrect: false,
        explanation:
          "מסיח המתאים חלקית לסריקה סופית (Post-order), אך גם הוא לא מדויק שם.",
      },
    ],
  },
  {
    id: "b-cs2-binary-tree-one-child",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - ספירת צמתים מיוחדים בעץ",
    context:
      "פעולה רקורסיבית מקבלת שורש. אם יש לשורש בן שמאלי ואין לו בן ימני, או אם אין לו שמאלי ויש לו בן ימני, מונה c שווה 1. הפעולה מחזירה c ועוד הקריאות הרקורסיביות לתתי-העצים.",
    instruction: "מה מחשבת פעולה זו בעץ הבינארי?",
    options: [
      {
        id: "1",
        plainText: "את מספר העלים בעץ",
        isCorrect: false,
        explanation: "מסיח (לצומת עלה אין אף בן).",
      },
      {
        id: "2",
        plainText: "את מספר הצמתים הפנימיים בעלי שני בנים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "את מספר הצמתים בעץ שיש להם בדיוק בן יחיד",
        isCorrect: true,
        explanation:
          "תנאי ה-XOR (שמאל ואין ימין, או ימין ואין שמאל) מזהה במדויק צמתים שלהם בן אחד בלבד. מכיוון שהסכימה אוספת את כל הצמתים העונים על התנאי משני צידי העץ, התוצאה היא ספירה מלאה של צמתים בעלי בן אחד בלבד בעץ.",
      },
      {
        id: "4",
        plainText: "את עומק העץ המקסימלי",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs2-dfa-10-ends",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - אוטומט סופי דטרמיניסטי (DFA)",
    context:
      "אוטומט (DFA) מעל {0,1}: מצב התחלתי q0 (לא מקבל). מ-q0 ב-0 ל-q0, ב-1 ל-q1. מ-q1 ב-0 ל-q2, ב-1 ל-q1. מ-q2 ב-0 ל-q0, ב-1 ל-q1. המצב המקבל היחיד הוא q2.",
    instruction: "איזו שפה מזוהה על ידי אוטומט זה?",
    options: [
      {
        id: "1",
        plainText: "כל המילים המכילות מספר אי-זוגי של 1",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "כל המילים שהתו השלישי מהסוף הוא 1",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "כל המילים שאינן מכילות את הרצף 00",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "כל המילים המסתיימות ברצף '10'",
        isCorrect: true,
        explanation:
          "המצב המקבל הוא q2. כדי להגיע אליו צריך לקרוא '0' מהמצב q1. כדי להגיע ל-q1 צריך לקרוא '1'. לכן רק מילים שהסיומת שלהן היא קריאת '1' ואחריה '0' יוכלו לסיים ב-q2 (אם נקרא 0 נוסף האוטומט יחזור להתחלה). התוצאה היא כל המילים המסתיימות ב-10.",
      },
    ],
  },
  {
    id: "b-cs2-regular-languages-pumping",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - שפות רגולריות",
    context:
      "נתונה השפה L של כל המילים מעל {a,b} שבהן מספר המופעים של a שווה בדיוק למספר המופעים של b.",
    instruction:
      "איזו מהטענות הבאות נכונה בהכרח לגבי השפה L?",
    options: [
      {
        id: "1",
        plainText: "השפה היא רגולרית כי האלפבית סופי",
        isCorrect: false,
        explanation: "מסיח (אלפבית סופי אינו מבטיח שפה רגולרית).",
      },
      {
        id: "2",
        plainText: "המשלים של השפה הוא בהכרח שפה רגולרית",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "השפה דורשת אוטומט לא דטרמיניסטי (NFA)",
        isCorrect: false,
        explanation: "מסיח (NFA לא מוסיף כוח ביטוי על פני DFA).",
      },
      {
        id: "4",
        plainText:
          "השפה אינה רגולרית ולכן לא קיים אוטומט סופי המקבל אותה",
        isCorrect: true,
        explanation:
          "ספירה והשוואה של כמויות בלתי חסומות (a^n b^n או כל סידור זהה) מצריכה זיכרון בלתי חסום. כיוון שלאוטומט סופי (DFA) יש רק מספר קבוע של מצבים, הוא אינו יכול לזכור מספר אינסופי של אופציות. לפי למת הניפוח, שפה זו אינה רגולרית.",
      },
    ],
  },
  {
    id: "b-cs2-dfa-modulo-states",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - אוטומטים ומודולו",
    context:
      "נדרש לבנות אוטומט סופי דטרמיניסטי (DFA) קטן ככל האפשר המזהה מילים שבהן כמות המופעים של האות 'a' מתחלקת ב-3 ללא שארית.",
    instruction:
      "מהו מספר המצבים המינימלי שיידרש לבניית אוטומט זה?",
    options: [
      {
        id: "1",
        plainText: "4 מצבים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "2 מצבים",
        isCorrect: false,
        explanation: "מסיח המייצג זוגיות בלבד.",
      },
      {
        id: "3",
        plainText: "3 מצבים",
        isCorrect: true,
        explanation:
          "האוטומט עוקב אחר שארית החלוקה ב-3 של מספר ה-a-ים. לשארית זו יש בדיוק 3 אפשרויות: 0 (מצב מקבל התחלתי), 1 ו-2. קריאת האות 'b' לא משנה את המצב (לולאה עצמית). לכן המינימום הדרוש הוא 3 מצבים.",
      },
      {
        id: "4",
        plainText: "6 מצבים",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "b-cs2-regular-languages-closure",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - תכונות סגירות של שפות",
    context: "תהי L1 שפה רגולרית, ותהי L2 שפה שאינה רגולרית.",
    instruction:
      "איזו מהטענות הבאות נכונה תמיד בנוגע לחיתוך השפות, איחודן או שרשורן?",
    options: [
      {
        id: "1",
        plainText: "איחוד השפות הוא תמיד שפה לא-רגולרית",
        isCorrect: false,
        explanation:
          "מסיח (אם L1 שפת כל המילים, גם האיחוד יהיה כל המילים, שהיא שפה רגולרית).",
      },
      {
        id: "2",
        plainText: "חיתוך השפות לעולם אינו רגולרי",
        isCorrect: false,
        explanation: "מסיח (הופרך בתשובה הנכונה).",
      },
      {
        id: "3",
        plainText: "השרשור של שתי השפות הוא תמיד שפה רגולרית",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText:
          "חיתוך השפות עשוי להיות שפה רגולרית (לדוגמה אם L1 היא השפה הריקה)",
        isCorrect: true,
        explanation:
          "אף על פי שלרוב חיתוך של שפה רגולרית ולא-רגולרית נותן שפה לא-רגולרית, קיימים מקרי קצה. אם השפה הרגולרית L1 ריקה, החיתוך בינה לבין כל שפה אחרת יהיה קבוצה ריקה, שהיא שפה רגולרית חוקית. לכן 'עשוי להיות רגולרי' היא הטענה הנכונה היחידה.",
      },
    ],
  },
  {
    id: "b-cs2-divide-and-conquer-master-theorem",
    domain: "COMPUTER_SCIENCE",
    title: "שאלון שני - משפט המאסטר ביעילות ריצה",
    context:
      "אלגוריתם מסוג 'הפרד ומשול' (Divide and Conquer) מפצל קלט בגודל n ל-2 תתי-קלטים שווים בגודל n/2, פותר אותם ברקורסיה, וממזג את הפתרונות בזמן של O(n) (ליניארי).",
    instruction:
      "מהי סיבוכיות זמן הריצה הכוללת של האלגוריתם (בדומה לאלגוריתם מיון מיזוג)?",
    options: [
      {
        id: "1",
        plainText: "O(n^2)",
        isCorrect: false,
        explanation:
          "מסיח האופייני לאלגוריתמי מיון בסיסיים כמו מיון בועות.",
      },
      {
        id: "2",
        plainText: "O(log n)",
        isCorrect: false,
        explanation: "מסיח האופייני לחיפוש בינארי.",
      },
      {
        id: "3",
        plainText: "O(n)",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "O(n log n)",
        mathText: "O(n \\log n)",
        isCorrect: true,
        explanation:
          "נוסחת הנסיגה של האלגוריתם (כמו ב-Merge Sort) היא T(n) = 2T(n/2) + O(n). לפי משפט המאסטר, a=2 ו-b=2, לכן הקריטריון הקריטי log_b(a) שווה 1. מכיוון שפונקציית המיזוג היא n^1, מדובר במקרה השני של משפט המאסטר, והסיבוכיות הכוללת היא n*log(n).",
      },
    ],
  },
];
