import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic תכנות מונחה עצמים ומתקדם diagnostic bank (12Q).
 * Display name: "תכנות מונחה עצמים ומתקדם" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const OOP_ADVANCED_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "oop-q01-virtual-destructor-ub-leak",
    domain: "מפרק וירטואלי ופולימורפיזם",
    title: "תכנות מונחה עצמים - מנגנון פולימורפיזם וצורך במפרק וירטואלי (Virtual Destructor)",
    context: "ב-++C מוגדרת מחלקת בסיס `Base` ומחלקה יורשת `Derived` המקצה זיכרון דינמי בבנאי שלה. משחררים אובייקט באמצעות מצביע מטיפוס הבסיס: `Base* ptr = new Derived(); delete ptr;`. מפרק מחלקת הבסיס אינו מוגדר כ-`virtual`.",
    formulaLatex: "\\text{Base* ptr = new Derived(); delete ptr;}",
    instruction: "מה מתרחש בעת ביצוע הפקודה `delete ptr` לפי תקן השפה, ומהו הכשל הפיזיקלי שייווצר?",
    options: [
      {
        id: "oop-q01-opt1",
        plainText: "התנהגות בלתי מוגדרת (Undefined Behavior); בפועל ייקרא רק המפרק של `Base`, המפרק של `Derived` לא יופעל כלל, והזיכרון הדינמי שהוקצה על ידו ידלוף (Memory Leak).",
        isCorrect: true,
        explanation: "נכון: לפי תקן ++C, מחיקת אובייקט דרך מצביע למחלקת בסיס שאין לה מפרק וירטואלי היא Undefined Behavior. מאחר שטבלת הפונקציות הווירטואליות (vtable) אינה מכילה כתובת מפרק וירטואלי, הקישור הוא סטטי (Early Binding), ונקרא רק המפרק של `Base`. כתוצאה מכך המפרק של `Derived` אינו מופעל, פעולות ניקוי משאבים במחלקה היורשת נזנחות, והמשאבים דולפים.",
      },
      {
        id: "oop-q01-opt2",
        plainText: "שני המפרקים יופעלו בסדר הנכון (קודם `Derived` ואז `Base`), אך תיווצר שגיאת קומפילציה.",
        isCorrect: false,
        explanation: "שגוי: הקוד עובר הידור תקין לחלוטין; הבעיה מתרחשת בזמן ריצה עקב קישור סטטי של המפרק.",
      },
      {
        id: "oop-q01-opt3",
        plainText: "המפרק של `Derived` יופעל ראשון, אך המפרק של `Base` ייחסם בגלל אבטחת זיכרון של ה-OS.",
        isCorrect: false,
        explanation: "שגוי: המהדר מכיר רק את טיפוס המצביע הסטטי (`Base*`) ולכן אינו מודע לקיומו של `Derived` ללא וירטואליות.",
      },
      {
        id: "oop-q01-opt4",
        plainText: "האובייקט יימחק בהצלחה ללא דליפה משום שגודל שניהם זהה בזיכרון ה-Heap.",
        isCorrect: false,
        explanation: "שגוי: מחלקה נגזרת מכילה שדות נוספים ומקצה משאבים עצמאיים, וללא וירטואליות מתרחשת דליפה חמורה.",
      },
    ],
  },
  {
    id: "oop-q02-move-semantics-rvalue-state",
    domain: "סמנטיקת תנועה (Move Semantics)",
    title: "תכנות מונחה עצמים - סמנטיקת תנועה (Move Semantics) ומצב האובייקט המקורקע",
    context: "ב-++C מודרנית (C++11 ואילך), בנאי תנועה מקבל הפניה ל-rvalue: `MyVector(MyVector&& other) noexcept`.",
    formulaLatex: "\\text{std::vector<int> a = \\{1, 2, 3\\}; std::vector<int> b = std::move(a);}",
    instruction: "מה מתבצע בפועל בפעולת תנועה (Move), ומהו המצב המובטח של האובייקט `a` לאחר שנגזל ע״י `std::move`?",
    options: [
      {
        id: "oop-q02-opt1",
        plainText: "מתבצעת העברת בעלות על מצביעי הזיכרון הפנימיים ב-$O(1)$ ללא העתקת איברים, והאובייקט `a` נותר במצב חוקי אך בלתי-מוגדר (Valid but unspecified state), שבו בטוח להרוס אותו או להציב לתוכו ערך חדש.",
        isCorrect: true,
        explanation: "נכון: תנועה מעבירה את המצביעים והמשאבים הפנימיים מהאובייקט המקורקע `other` לאובייקט החדש, ומאפסת את המצביעים ב-`other` (כדי שמפרקו לא ישחרר את הזיכרון שהועבר). לפי תקן השפה, אובייקט שהועבר נמצא במצב \"Valid but unspecified\" — מותר לקרוא לפונקציות שאינן מניחות מצב קודם (כגון `clear()`, `size()` או השמה חדשה) ומובטח שמפרקו יעבוד בשלום, אך תוכנו הספציפי אינו מובטח.",
      },
      {
        id: "oop-q02-opt2",
        plainText: "האובייקט `a` נמחק מיידית ממרחב המחסנית (Stack) וכל גישה אליו גורמת ל-Segmentation Fault.",
        isCorrect: false,
        explanation: "שגוי: `a` עדיין קיים במחסנית כמשתנה חי עד אשר בלוק הקוד שלו מסתיים; רק המשאבים הדינמיים שלו הועברו.",
      },
      {
        id: "oop-q02-opt3",
        plainText: "מבוצעת העתקה עמוקה מלאה (Deep Copy) של כל האיברים, ו-`a` שומר על ערכו המקורי.",
        isCorrect: false,
        explanation: "שגוי: העתקה עמוקה מאפיינת בנאי העתקה (Copy Constructor); כל מטרת התנועה היא הימנעות מהעתקה יקרה.",
      },
      {
        id: "oop-q02-opt4",
        plainText: "הפונקציה `std::move` מבצעת את ההעברה בעצמה ע״י פקודת מעבד ייעודית.",
        isCorrect: false,
        explanation: "שגוי: `std::move` אינה מבצעת תנועה בפועל; היא מבצעת המרת טיפוס בלבד (Type Cast) ל-rvalue reference (`T&&`).",
      },
    ],
  },
  {
    id: "oop-q03-object-slicing-pass-by-value",
    domain: "תופעת הקיטום (Object Slicing)",
    title: "תכנות מונחה עצמים - תופעת הקיטום (Object Slicing)",
    context: "נתונה פונקציה המקבלת אובייקט לפי ערך: `void printInfo(Base b)`. מעבירים לפונקציה אובייקט של מחלקה יורשת: `Derived d; printInfo(d);`. לשתי המחלקות פונקציה וירטואלית `display()`.",
    formulaLatex: "\\text{void printInfo(Base b) } \\{ \\text{b.display();} \\}",
    instruction: "מה מתרחש בעת הקריאה לפונקציה (תופעת ה-Object Slicing)?",
    options: [
      {
        id: "oop-q03-opt1",
        plainText: "נוצר אובייקט חדש מטיפוס `Base` בלבד באמצעות ה-Copy Constructor של `Base`; כל שדות הנתונים הייחודיים של `Derived` נחתכים ונעלמים, וטבלת ה-vtable שלו מתקבעת ל-`Base`, כך שנקראת `Base::display`.",
        isCorrect: true,
        explanation: "נכון: בהעברה לפי ערך (Pass-by-value), מוקצה במחסנית מקום בדיוק בגודל המחלקה `Base`. המהדר מעתיק רק את חלק ה-Base של האובייקט `d`, וקוצץ (Slices) את כל השדות והמתודות של `Derived`. בתוך האובייקט החדש, מצביע ה-vptr מאותחל ל-vtable של `Base`, ולכן פולימורפיזם אינו מתקיים כלל. כדי לשמר פולימורפיזם מלא ללא קיטום, חובה להעביר לפי הפניה (`const Base&`) או מצביע (`Base*`).",
      },
      {
        id: "oop-q03-opt2",
        plainText: "התוכנית קורסת בזמן ריצה עקב גלישת חוצץ במחסנית (Stack Buffer Overflow).",
        isCorrect: false,
        explanation: "שגוי: המהדר מקצה מקום תקין מראש עבור `Base`, ולכן אין חריגת זיכרון או קריסה.",
      },
      {
        id: "oop-q03-opt3",
        plainText: "הפונקציה קוראת ל-`Derived::display` באמצעות מנגנון פולימורפיזם דינמי מלא.",
        isCorrect: false,
        explanation: "שגוי: פולימורפיזם דינמי פועל אך ורק דרך מצביעים או הפניות, ולא דרך העתקת ערך של אובייקט בסיס.",
      },
      {
        id: "oop-q03-opt4",
        plainText: "המהדר מייצר שגיאת קומפילציה המונעת העברת אובייקט יורש למחלקת בסיס.",
        isCorrect: false,
        explanation: "שגוי: המרה זו חוקית לחלוטין בתקן ++C (Upcasting תקין תחבירית), גם אם לרוב היא מהווה כשל לוגי של המתכנת.",
      },
    ],
  },
  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "oop-q04-diamond-inheritance-virtual-base",
    domain: "בעיית היהלום והורשה וירטואלית",
    title: "תכנות מונחה עצמים - בעיית היהלום והורשה וירטואלית (Virtual Inheritance)",
    context: "במערכת מוגדרת הורשה מרובה בצורת יהלום: המחלקות $B$ ו-$C$ יורשות שתיהן מ-$A$, והמחלקה $D$ יורשת מ-$B$ ומ-$C$ במקביל.",
    formulaLatex: "A \\leftarrow B, \\; A \\leftarrow C, \\quad B, C \\leftarrow D",
    instruction: "מה תהיה התוצאה אם $B$ ו-$C$ יורשות מ-$A$ ללא המילה השמורה `virtual`, לעומת הורשה באמצעות `virtual public A`?",
    options: [
      {
        id: "oop-q04-opt1",
        plainText: "ללא `virtual` לא ניתן להדר את הקוד כלל; עם `virtual` נוצרים שני מופעים נפרדים של שדות $A$ בתוך $D$.",
        isCorrect: false,
        explanation: "שגוי: הקוד מתהדר היטב ללא וירטואליות; הבעיה מתעוררת רק בעת גישה לשדות עקב עמימות (Ambiguity), והורשה וירטואלית ממזגת למופע יחיד ולא יוצרת שני מופעים.",
      },
      {
        id: "oop-q04-opt2",
        plainText: "ללא `virtual`, אובייקט מטיפוס $D$ מכיל שני עותקים נפרדים של שדות המחלקה $A$ (היוצרים עמימות בפנייה); שימוש ב-`virtual` מבטיח עותק משותף יחיד של $A$, ומטיל את האחריות לקריאת הבנאי של $A$ ישירות על המחלקה הנגזרת ביותר $D$.",
        isCorrect: true,
        explanation: "נכון: בהורשה מרובה רגילה, $D$ מקבלת תת-אובייקט של $A$ דרך $B$ ותת-אובייקט נפרד של $A$ דרך $C$, מה שיוצר כפילות זיכרון ועמימות בפנייה לשדות $A$. הורשה וירטואלית (`class B : virtual public A`) משתמשת במצביע פנימי (vptr/vbase_offset) ומבטיחה שיהיה מופע פיזי יחיד של $A$ בתוך $D$. מאחר ש-$B$ ו-$C$ אינן יכולות לאתחל את המופע המשותף באופן בלעדי, האחריות על קריאת הבנאי של מחלקת הבסיס הווירטואלית $A$ עוברת ישירות למחלקה הסופית ביותר ($D$).",
      },
      {
        id: "oop-q04-opt3",
        plainText: "הורשה וירטואלית הופכת את כל הפונקציות של $A$ לפונקציות טהורות (Pure Virtual) ומחייבת מימוש מחדש ב-$D$.",
        isCorrect: false,
        explanation: "שגוי: הורשה וירטואלית קשורה למבנה האובייקט בזיכרון (Memory Layout) ואינה משנה את חתימת הפונקציות.",
      },
      {
        id: "oop-q04-opt4",
        plainText: "הורשה וירטואלית מונעת מ-$D$ לרשת מ-$C$, והופכת את ההורשה ליחידה מ-$B$.",
        isCorrect: false,
        explanation: "שגוי: $D$ ממשיכה לרשת משתי המחלקות במקביל; המיזוג חל רק על תת-אובייקט הבסיס המשותף $A$.",
      },
    ],
  },
  {
    id: "oop-q05-liskov-substitution-principle-rectangle-square",
    domain: "עקרון החלפת ליסקוב (LSP)",
    title: "תכנות מונחה עצמים - עקרונות SOLID ועקרון החלפת ליסקוב (LSP)",
    context: "במערכת גרפית קיימת מחלקה `Rectangle` עם פונקציות `setWidth(w)` ו-`setHeight(h)`. מתכנת מייצר מחלקה `Square` היורשת מ-`Rectangle` ודורסת את המתודות כך ששינוי רוחב מעדכן גם את הגובה לערך זהה.",
    instruction: "מדוע תכנון זה מפר באופן מובהק את עקרון החלפת ליסקוב (Liskov Substitution Principle - LSP)?",
    options: [
      {
        id: "oop-q05-opt1",
        plainText: "משום שריבוע אינו צורה גאומטרית תקינה בעולם המחשבים.",
        isCorrect: false,
        explanation: "שגוי: ריבוע הוא צורה תקינה לחלוטין, אך ההורשה בינו לבין מלבן נכשלת ברמת ההתנהגות (Behavioral Subtyping).",
      },
      {
        id: "oop-q05-opt2",
        plainText: "פונקציה המקבלת הפניה ל-`Rectangle` ומניחה ששינוי הרוחב אינו משפיע על הגובה (אינווריאנט של מלבן) תיכשל או תשבור נכונות כאשר יועבר לה אובייקט `Square`, ולכן המחלקה היורשת אינה יכולה להחליף את הבסיס בשקיפות מלאה.",
        isCorrect: true,
        explanation: "נכון: עקרון ליסקוב קובע שאם $S$ היא תת-מחלקה של $T$, יש לאפשר שימוש באובייקטים מטיפוס $S$ בכל מקום שבו מצופה $T$, מבלי לשנות את נכונות התוכנית או את החוזה (Invariants) שלה. החוזה של `Rectangle` מניח תלות בלתי-תלויה בין רוחב לגובה (למשל פונקציה שקובעת רוחב 5 וגובה 4 ומצפה לשטח 20). ב-`Square`, שינוי הרוחב דורס את הגובה ומייצר שטח 16, מה ששובר את הציפיות של הלקוח. יחס \"is-a\" גאומטרי אינו בהכרח יחס \"is-a\" התנהגותי מונחה-עצמים.",
      },
      {
        id: "oop-q05-opt3",
        plainText: "משום שהמחלקה `Square` דורשת הקצאת זיכרון כפולה מזו של `Rectangle`.",
        isCorrect: false,
        explanation: "שגוי: ריבוע יכול להסתפק אפילו בשדה יחיד; הבעיה היא הפרת חוזה התנהגותי.",
      },
      {
        id: "oop-q05-opt4",
        plainText: "משום שתקן השפה אוסר על דריסת פונקציות שמקבלות פרמטר מספרי.",
        isCorrect: false,
        explanation: "שגוי: דריסת פונקציות (Overriding) היא הבסיס לפולימורפיזם וחוקית לחלוטין תחבירית.",
      },
    ],
  },
  {
    id: "oop-q06-decorator-vs-inheritance-pattern",
    domain: "תבנית המעצב (Decorator Pattern)",
    title: "תכנות מונחה עצמים - תבניות תכן ותבנית המעצב (Decorator Pattern)",
    context: "במערכת בית קפה קיימים עשרות שילובים של משקאות ותוספות (חלב סויה, קצפת, שוקולד, קינמון). שימוש בהורשה קלאסית מוביל לפיצוץ קומבינטורי של מחלקות (`CoffeeWithMilkAndWhip`, `CoffeeWithSoyAndCinnamon` וכו').",
    formulaLatex: "\\text{Decorator } \\bowtie \\text{ Component (Aggregation over Inheritance)}",
    instruction: "כיצד תבנית המעצב (Decorator) פותרת בעיה זו, ואיזה יתרון מבני היא מספקת?",
    options: [
      {
        id: "oop-q06-opt1",
        plainText: "היא יוצרת מחלקה יורשת אחת גדולה הכוללת משתני דגלים (booleans) לכל התוספות האפשריות.",
        isCorrect: false,
        explanation: "שגוי: תכנון עם דגלים פנימיים מפר את עקרון הפתיחות/סגירות (OCP) ומסרבל את מחלקת הבסיס.",
      },
      {
        id: "oop-q06-opt2",
        plainText: "היא מאפשרת הוספת תחומי אחריות והתנהגויות לאובייקטים באופן דינמי בזמן ריצה (Runtime) באמצעות עטיפה מקוננת (Wrapping) של ממשק משותף, תוך העדפת הרכבה (Composition) על פני הורשה סטטית.",
        isCorrect: true,
        explanation: "נכון: תבנית Decorator יורשת מאותו ממשק של הרכיב הבסיסי (Component) ומחזיקה במקביל הפניה/מצביע אליו (הדדיות שהיא Composition + Inheritance). כל Decorator עוטף אובייקט קיים, מוסיף את התנהגותו שלו (למשל חישוב עלות התוספת) ומעביר את שאר הקריאות לאובייקט העטוף. הדבר מאפשר הרכבת אינסוף קומבינציות בזמן ריצה באופן מודולרי לחלוטין ללא פיצוץ של תת-מחלקות סטטיות בעת קימפול.",
      },
      {
        id: "oop-q06-opt3",
        plainText: "היא ממירה את כל האובייקטים למבנה של Singleton המשותף לכל חלקי התוכנית.",
        isCorrect: false,
        explanation: "שגוי: Decorator עוסק בהרחבת התנהגות של מופעים בדידים, בעוד Singleton מגביל מחלקה למופע יחיד.",
      },
      {
        id: "oop-q06-opt4",
        plainText: "היא מבטלת את מנגנון ה-vtable של השפה ומאיצה את הקריאה למתודות inline.",
        isCorrect: false,
        explanation: "שגוי: Decorator נשען במפורש על פונקציות וירטואליות ואינו קשור לאופטימיזציית inline.",
      },
    ],
  },
  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "oop-q07-smart-pointers-circular-weak-ptr",
    domain: "מצביעים חכמים ומעגליות",
    title: "תכנות מונחה עצמים - מצביעים חכמים, מעגליות ופתרון `std::weak_ptr`",
    context: "שני אובייקטים $A$ ו-$B$ מחזיקים מצביע זה לזה: אובייקט $A$ מכיל `std::shared_ptr<B>`, ואובייקט $B$ מכיל `std::shared_ptr<A>`.",
    formulaLatex: "A.\\text{ptrB} \\leftrightarrow B.\\text{ptrA} \\implies \\text{use\\_count} = 2",
    instruction: "מה תהיה התוצאה כאשר כל המצביעים החיצוניים לשני האובייקטים יוצאים מטווח ההכרה (Scope), וכיצד פותרים זאת?",
    options: [
      {
        id: "oop-q07-opt1",
        plainText: "שני האובייקטים יימחקו מיד ע״י מנגנון איסוף אשפה פנימי של ה-C++ Runtime.",
        isCorrect: false,
        explanation: "שגוי: ב-++C אין Garbage Collector מובנה של מחזורי הפניות; ניהול הזיכרון ב-`shared_ptr` מבוסס על מונה הפניות דטרמיניסטי בלבד.",
      },
      {
        id: "oop-q07-opt2",
        plainText: "המערכת תזרוק שגיאת `std::bad_alloc` בעת היציאה מה-Scope.",
        isCorrect: false,
        explanation: "שגוי: שחרור מצביעים אינו זורק חריגת הקצאה אלא מוריד את המונה הפנימי.",
      },
      {
        id: "oop-q07-opt3",
        plainText: "נוצרת דליפת זיכרון מוחלטת (Memory Leak) משום שמונה ההפניות של שני האובייקטים לעולם אינו מגיע ל-0 (כל אחד נשמר חי ע״י השני); הפתרון הוא שבירת המעגל ע״י הגדרת אחד המצביעים כ-`std::weak_ptr`.",
        isCorrect: true,
        explanation: "נכון: `std::shared_ptr` מוחק את האובייקט אך ורק כאשר מונה ה-`use_count` מגיע בדיוק ל-0. במעגל הפניות הדדי, כל אובייקט מחזיק בעלות חזקה על חברו. כאשר המצביעים החיצוניים מתים, המונה של כל אחד יורד מ-2 ל-1, אך לעולם אינו מגיע ל-0; לכן אף מפרק אינו מופעל ושני האובייקטים נשארים תקועים בזיכרון לנצח. `std::weak_ptr` הוא מצביע צופה שאינו מעלה את מונה הבעלות החזקה, ומאפשר גישה זמנית באמצעות `.lock()`, ובכך שובר את המעגל ומאפשר איפוס מלא של המונה ומחיקה תקינה.",
      },
      {
        id: "oop-q07-opt4",
        plainText: "יש להמיר את שניהם למצביעים עירומים (Raw Pointers `A*`, `B*`) ולסמוך על מערכת ההפעלה שתנקה את התהליך.",
        isCorrect: false,
        explanation: "שגוי: מעבר למצביעים חשופים מבטל את היתרונות של מודל RAII ואינו מספק ניקוי זיכרון בזמן ריצת התוכנית.",
      },
    ],
  },
  {
    id: "oop-q08-observer-pattern-dangling-listener-leak",
    domain: "תבנית הצופה ובעיית Lapsed Listener",
    title: "תכנות מונחה עצמים - תבנית הצופה (Observer) ובעיית ה-Lapsed Listener",
    context: "במערכת מיושמת תבנית תכן Observer (מאזין-נצפה). אובייקטים מסוג `Subscriber` נרשמים לקבלת עדכונים מהאובייקט המרכזי `Subject` באמצעות מתודת `registerListener()`.",
    instruction: "מהו כשל הזיכרון המפורסם (המכונה Lapsed Listener Problem) העלול להתרחש בשפות מנוהלות זיכרון (כגון Java או C#) אם מאזין שאינו בשימוש שוכח לבצע ביטול רישום (`unregister`)?",
    options: [
      {
        id: "oop-q08-opt1",
        plainText: "ה-Subject יקרוס מיד בפקודת NullPointerException כאשר המאזין יפסיק להגיב.",
        isCorrect: false,
        explanation: "שגוי: המאזין עדיין קיים בזיכרון ולכן אינו מצביע ל-null; הקריסה אינה מתרחשת אך הזיכרון נאגר.",
      },
      {
        id: "oop-q08-opt2",
        plainText: "מנגנון ה-GC יזהה שהמאזין אינו פעיל וימחק אותו ואת ה-Subject יחד באופן אטומי.",
        isCorrect: false,
        explanation: "שגוי: ה-Garbage Collector פועל לפי נגישות משורשי ה-GC (Reachability). כל עוד ה-Subject חי ומחזיק הפניה אליו, המאזין נחשב נגיש לחלוטין.",
      },
      {
        id: "oop-q08-opt3",
        plainText: "מתרחשת דליפת זיכרון חמורה בשפה מנוהלת; ה-Subject מחזיק הפניה חזקה (Strong Reference) אל המאזין ברשימה הפנימית שלו, מה שמונע מאיסוף האשפה (Garbage Collector) למחזר אותו, גם כאשר שאר התוכנית אינה מחזיקה בו שום שימוש.",
        isCorrect: true,
        explanation: "נכון: זוהי דליפת הזיכרון הנפוצה ביותר בשפות עם איסוף אשפה אוטומטי (כמו Java/C#). אובייקט שנרשם כמאזין נכנס למבנה נתונים פנימי של ה-Subject. גם אם החלק באפליקציה שהשתמש במאזין מסיים את חייו, קיומה של ההפניה ברשימת ה-Subject משאיר את המאזין (וכל עץ האובייקטים שהוא מחזיק) בסטטוס \"Reachable\", וה-GC מנוע מלמחזר אותו. הפתרון הוא הקפדה על Unregister או שימוש בהפניות חלשות (WeakReference / WeakListener).",
      },
      {
        id: "oop-q08-opt4",
        plainText: "הודעות העדכון יישלחו בלולאה אינסופית המכפילה את קצב השעון של המעבד.",
        isCorrect: false,
        explanation: "שגוי: ה-Subject ישלח עדכון למאזין הרדום, אך אין הדבר יוצר לולאת משוב אינסופית בהכרח.",
      },
    ],
  },
  {
    id: "oop-q09-template-sfinae-compile-time-polymorphism",
    domain: "פולימורפיזם סטטי ו-SFINAE",
    title: "תכנות מונחה עצמים - פולימורפיזם סטטי, תבניות ומנגנון SFINAE",
    context: "ב-++C משווים בין פולימורפיזם דינמי (Dynamic Polymorphism המבוסס על פונקציות וירטואליות ב-Runtime) לבין פולימורפיזם סטטי (Static Polymorphism המבוסס על Templates ו-CRTP).",
    formulaLatex: "\\text{SFINAE: Substitution Failure Is Not An Error}",
    instruction: "מהו עקרון SFINAE בתבניות ++C, ומהו היתרון המרכזי של פולימורפיזם סטטי בביצועים?",
    options: [
      {
        id: "oop-q09-opt1",
        plainText: "SFINAE מאפשר לתקן שגיאות תחביר בזמן ריצה על ידי הרצת מפרש JIT ייעודי.",
        isCorrect: false,
        explanation: "שגוי: ++C היא שפה מהודרת ללא JIT, ו-SFINAE מתרחש כולו בשלב ההידור (Compile-time).",
      },
      {
        id: "oop-q09-opt2",
        plainText: "SFINAE מונע מקרים של חלוקה באפס בחישובים נומריים של מטריצות.",
        isCorrect: false,
        explanation: "שגוי: המנגנון עוסק בהתאמת טיפוסים בהעמסת תבניות ואינו קשור לפעולות אריתמטיות.",
      },
      {
        id: "oop-q09-opt3",
        plainText: "כישלון בהצבת טיפוס בתבנית אינו גורר שגיאת קומפילציה אלא רק מסיר את הפונקציה ממרחב המועמדים להעמסה (Overload Set); היתרון בביצועים הוא אפס תקורת זמן ריצה (Zero Runtime Overhead) משום שהקריאות נפתרות במלואן בהידור, ללא גישה ל-vtable וללא פגיעה באופטימיזציות Inlining.",
        isCorrect: true,
        explanation: "נכון: עקרון SFINAE קובע שאם בעת ניסיון גזירת טיפוס לתבנית נוצר טיפוס לא חוקי, המהדר לא יודיע על שגיאה, אלא פשוט יתעלם מהמועמד ויחפש העמסה מתאימה אחרת (מאפשר מימוש Type Traits ו-`std::enable_if`). פולימורפיזם סטטי (כגון Curiously Recurring Template Pattern - CRTP) מאפשר התנהגות פולימורפית ללא שימוש בפונקציות וירטואליות; הקריאות מקושרות ישירות בקומפילציה, נחסכת קפיצה עקיפה דרך vptr/vtable, והמהדר מסוגל לבצע Inlining מלא של הקוד להשגת ביצועי חומרה מרביים.",
      },
      {
        id: "oop-q09-opt4",
        plainText: "פולימורפיזם סטטי דורש נפח זיכרון RAM כפול בזמן ריצה בהשוואה למחלקות וירטואליות.",
        isCorrect: false,
        explanation: "שגוי: הפולימורפיזם הסטטי חוסך זיכרון RAM בזמן ריצה (אין צורך בשדות vptr פנימיים באובייקטים).",
      },
    ],
  },
  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "oop-q10-rule-of-five-special-member-functions",
    domain: "כלל החמישה (Rule of Five)",
    title: "תכנות מונחה עצמים - כלל החמישה (Rule of Five) וניהול משאבים",
    context: "במחלקה המנהלת משאב מערכת בלעדי (כגון זיכרון דינמי, File Descriptor או נעילת Mutex), מיושם עקרון RAII (Resource Acquisition Is Initialization).",
    formulaLatex: "\\text{Rule of 5: } \\sim C(), \\; C(C\\&), \\; C\\& \\text{ op}=(C\\&), \\; C(C\\&\\&), \\; C\\& \\text{ op}=(C\\&\\&)",
    instruction: "מה קובע ״כלל החמישה״ (Rule of Five) ב-++C מודרנית כאשר מממשים מפרק (Destructor) מותאם אישית?",
    options: [
      {
        id: "oop-q10-opt1",
        plainText: "אין צורך לממש שום פונקציה נוספת; המהדר מייצר אוטומטית העתקה ותנועה אופטימליות.",
        isCorrect: false,
        explanation: "שגוי: ברירת המחדל של המהדר תבצע העתקה שטחית (Shallow Copy) שתגרום למחיקה כפולה (Double Free).",
      },
      {
        id: "oop-q10-opt2",
        plainText: "חובה להגדיר 5 בנאים שונים המקבלים מספר משתנה של פרמטרים.",
        isCorrect: false,
        explanation: "שגוי: הכלל מתייחס לחמש מתודות ייעודיות לניהול מחזור חיים והעתקה/תנועה, ולא לבנאים כלליים.",
      },
      {
        id: "oop-q10-opt3",
        plainText: "הכלל אוסר על שימוש באופרטור השמה (`operator=`) במחלקות המכילות מצביעים.",
        isCorrect: false,
        explanation: "שגוי: הכלל מחייב לנהל במפורש את אופרטור ההשמה ולא לאסור עליו.",
      },
      {
        id: "oop-q10-opt4",
        plainText: "אם מחלקה דורשת מימוש מפורש של מפרק (Destructor) לשחרור משאב, היא דורשת כמעט בוודאות מימוש מפורש (או מחיקה `=delete`) של כל 4 הפונקציות המיוחדות האחרות: בנאי העתקה, אופרטור השמת העתקה, בנאי תנועה, ואופרטור השמת תנועה.",
        isCorrect: true,
        explanation: "נכון: אם מחלקה מנהלת משאב שמחייב שחרור ייעודי במפרק (מצביע זיכרון, קובץ וכו'), ברירות המחדל של המהדר להעתקה יבצעו העתקת ביטים שטחית (Shallow Copy). כתוצאה מכך שני אובייקטים יצביעו לאותו משאב ואחד מהם ישחרר אותו כפול בעת מפרק (Double Free Crash). כמו כן, הגדרת מפרק ידני מונעת מהמהדר לייצר אוטומטית בנאי ואופרטור תנועה (Move Constructor & Assignment). לכן חובה להגדיר במפורש את כל החמישה (Destructor, Copy Ctor, Copy Assign, Move Ctor, Move Assign) או להשתמש ב-Rule of Zero ע״י שימוש במחלקות מעטפת חכמות (כגון `std::unique_ptr`).",
      },
    ],
  },
  {
    id: "oop-q11-abstract-factory-vs-factory-method",
    domain: "Factory Method מול Abstract Factory",
    title: "תכנות מונחה עצמים - תבניות תכן: Factory Method מול Abstract Factory",
    context: "משווים בין שתי תבניות תכן ליצירת אובייקטים: Factory Method ו-Abstract Factory.",
    instruction: "מהו ההבדל המבני והארכיטקטוני המרכזי בין שתי התבניות?",
    options: [
      {
        id: "oop-q11-opt1",
        plainText: "Factory Method יוצרת רק אובייקטים מטיפוס בסיסי, ו-Abstract Factory יוצרת רק מחלקות וירטואליות.",
        isCorrect: false,
        explanation: "שגוי: שתיהן עוסקות ביצירת מופעים של מחלקות קונקרטיות המממשות ממשקים מופשטים.",
      },
      {
        id: "oop-q11-opt2",
        plainText: "Abstract Factory אינה ניתנת למימוש בשפות ללא תמיכה מובנית ב-Reflection.",
        isCorrect: false,
        explanation: "שגוי: שתי התבניות מממשות פולימורפיזם קלאסי טהור ועובדות בכל שפה מונחית-עצמים ללא תלות ב-Reflection.",
      },
      {
        id: "oop-q11-opt3",
        plainText: "Factory Method פועלת תמיד בזמן ריצה ו-Abstract Factory פועלת רק בזמן קומפילציה.",
        isCorrect: false,
        explanation: "שגוי: שתי התבניות מיועדות ליצירה דינמית בזמן ריצה.",
      },
      {
        id: "oop-q11-opt4",
        plainText: "Factory Method נשענת על הורשה ומגדירה מתודה יחידה ליצירת מוצר בודד שמימושה מוטל על מחלקות יורשות; Abstract Factory נשענת על הרכבה (Object Composition) ומספקת ממשק ליצירת משפחה שלמה של מוצרים תלויים או מקושרים (כגון רכיבי ממשק משתמש התואמים לערכת נושא ספציפית).",
        isCorrect: true,
        explanation: "נכון: 1. Factory Method משתמשת בהורשה: המחלקה הבסיסית מכריזה על מתודה וירטואלית `createProduct()`, וכל תת-מחלקה יורשת (Creator) דורסת אותה ומחליטה איזה מוצר קונקרטי יחיד לייצר. 2. Abstract Factory היא אובייקט מפעל שלם המכיל מספר מתודות מפעל (`createButton()`, `createScrollBar()`, `createWindow()`). היא מאגדת יצירה של משפחת מוצרים שלמה בעלת תאימות הדדית (למשל ערכת Windows מול ערכת MacOS), כך שהלקוח מקבל מפעל שלם ואינו מערבב רכיבים ממשפחות שונות ללא צורך בהורשה של הלקוח עצמו.",
      },
    ],
  },
  {
    id: "oop-q12-java-generics-type-erasure-arrays",
    domain: "גנריות ב-Java ו-Type Erasure",
    title: "תכנות מונחה עצמים - גנריות ב-Java ומנגנון מחיקת טיפוסים (Type Erasure)",
    context: "ב-Java, מנגנון ה-Generics מיושם באמצעות Type Erasure. הקוד הבא אינו מתהדר ומייצר שגיאת קומפילציה:",
    formulaLatex: "\\text{public class MyClass<T> } \\{ \\text{ T[] arr = new T[10]; } \\}",
    instruction: "מדוע שפת Java אוסרת יצירה ישירה של מערך גנרי (`new T[10]`), וכיצד מנגנון מחיקת הטיפוסים משפיע על כך?",
    options: [
      {
        id: "oop-q12-opt1",
        plainText: "משום שמערכים ב-Java מוקצים על ה-Stack ו-Generics מוקצים ב-Heap.",
        isCorrect: false,
        explanation: "שגוי: כל המערכים ב-Java הם אובייקטים המוקצים תמיד על גבי ה-Heap.",
      },
      {
        id: "oop-q12-opt2",
        plainText: "משום שגודל המערך חייב להיות ידוע בעת כתיבת קוד המקור של המערכת.",
        isCorrect: false,
        explanation: "שגוי: גודל מערך יכול להיקבע דינמית בזמן ריצה; הבעיה היא ידיעת *טיפוס* הרכיבים.",
      },
      {
        id: "oop-q12-opt3",
        plainText: "משום שהשפה אינה מאפשרת להקצות יותר מ-8 איברים במערך גנרי.",
        isCorrect: false,
        explanation: "שגוי: אין שום מגבלה על מספר האיברים.",
      },
      {
        id: "oop-q12-opt4",
        plainText: "מערכים ב-Java שומרים על מידע הטיפוס שלהם בזמן ריצה (Reified) ובודקים השמות באופן דינמי (Covariant), בעוד ש-Generics נמחקים בקומפילציה ל-`Object` (Type Erasure); אילו הדבר היה מותר, מחיקת הטיפוס הייתה מייצרת מערך `Object[]` שהיה שובר את בטיחות הטיפוסים (Type Safety) וגורם ל-`ClassCastException` בלתי-צפוי בהמשך.",
        isCorrect: true,
        explanation: "נכון: מערכים ב-Java הם Reified (ה-JVM יודע את הטיפוס המדויק שלהם בזמן ריצה) והם Covariant (כלומר `String[]` הוא תת-טיפוס של `Object[]`). לעומת זאת, גנריות ב-Java מומשה מטעמי תאימות לאחור באמצעות Type Erasure: בזמן ריצה ה-JVM אינו יודע מהו `T` ורואה אותו כ-`Object`. אילו הפקודה `new T[10]` הייתה חוקית, המהדר היה מייצר `new Object[10]`. מכיוון ש-`Object[]` אינו יכול לעבור המרה בטוחה ל-`T[]` (למשל `String[]`), השפה אוסרת זאת מראש כדי למנוע קריסה בזמן ריצה. הפתרון המקובל הוא שימוש ב-`ArrayList<T>` או העברת `Class<T>` בבנאי.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_OOP_ADVANCED_QUESTIONS = OOP_ADVANCED_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleOOPAdvancedOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = OOP_ADVANCED_QUESTIONS.slice(0, 3);
  const groupB = OOP_ADVANCED_QUESTIONS.slice(3, 6);
  const groupC = OOP_ADVANCED_QUESTIONS.slice(6, 12);

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
