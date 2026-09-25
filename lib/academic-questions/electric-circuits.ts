import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Electric Circuits (Linear Circuits) diagnostic bank (12Q).
 * Display name: "תורת המעגלים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const ELECTRIC_CIRCUITS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  {
    id: 'circ-q01-thevenin-dependent-sources',
    domain: "שקול תבנין בנוכחות מקורות תלויים",
    title: "תורת המעגלים - שקול תבנין בנוכחות מקורות תלויים",
    context:
      "נתון מעגל ליניארי חד-מבואי המכיל נגדים, מקור מתח בלתי-תלוי $V_s$, ומקור זרם תלוי-מתח $g_m v_x$. למבוא המעגל מחובר מקור בוחן עצמאי $v_{test}$ כדי למצוא את התנגדות תבנין $R_{th}$.",
    formulaLatex: "R_{th} = \\frac{v_{test}}{i_{test}} \\quad \\text{with all independent sources zeroed}",
    instruction:
      "כיצד יש לחשב נכונה את התנגדות תבנין $R_{th}$ במעגל המכיל מקורות תלויים?",
    options: [
      {
        id: 'circ-q01-opt1',
        plainText:
          "מאפסים את המקורות הבלתי-תלויים בלבד ($V_s = 0$), משאירים את המקורות התלויים פעילים, מחברים מקור בוחן חיצוני $v_{test}$, ומחשבים את היחס $R_{th} = \\frac{v_{test}}{i_{test}}$.",
        isCorrect: true,
        explanation:
          "נכון: מקורות תלויים מייצגים תגובת משוב פנימית של המעגל ולכן אסור לאפס אותם כפי שמאפסים מקורות בלתי-תלויים. הדרך היחידה לחשב את ההתנגדות השקולה היא איפוס מקורות עצמאיים בלבד (מקור מתח לקצר, מקור זרם לנתק), חיבור מקור בוחן חיצוני וחישוב היחס בין המתח לזרם הנכנס. לחלופין ניתן לחשב מתח נתק $v_{oc}$ וזרם קצר $i_{sc}$ ולחשב $R_{th} = v_{oc}/i_{sc}$.",
      },
      {
        id: 'circ-q01-opt2',
        plainText:
          "מאפסים הן את המקורות הבלתי-תלויים והן את המקורות התלויים, ומחשבים את ההתנגדות השקולה ע״י חיבורי טורים ומקבילים רגילים.",
        isCorrect: false,
        explanation:
          "שגוי: איפוס מקור תלוי מבטל את הקשר הפיזיקלי במעגל ומניב התנגדות שגויה לחלוטין.",
      },
      {
        id: 'circ-q01-opt3',
        plainText:
          "התנגדות תבנין שווה תמיד לאפס בכל מעגל המכיל מקורות תלויים ליניאריים.",
        isCorrect: false,
        explanation:
          "שגוי: התנגדות תבנין במעגל עם מקורות תלויים יכולה להיות חיובית, אפסית, ואף שלילית (במעגלים בעלי משוב חיובי).",
      },
      {
        id: 'circ-q01-opt4',
        plainText:
          "מחברים נגד עומס משתנה $R_L$ ומודדים את הזרם המקסימלי ללא איפוס מקורות.",
        isCorrect: false,
        explanation:
          "שגוי: זוהי הגדרה של נקודת עבודה ולא שיטה אנליטית למציאת התנגדות תבנין.",
      },
    ],
  },
  {
    id: 'circ-q02-max-power-complex-conjugate',
    domain: "משפט העברת הספק מקסימלי בעכבות מרוכבות",
    title: "תורת המעגלים - משפט העברת הספק מקסימלי בעכבות מרוכבות",
    context:
      "מעגל AC ליניארי בעל עכבת תבנין מרוכבת $Z_{th} = R_{th} + j X_{th}$ מחובר לעומס פסיבי מרוכב $Z_L = R_L + j X_L$ בתדירות $\\omega$.",
    formulaLatex: "Z_{th} = R_{th} + j X_{th}, \\quad Z_L = R_L + j X_L",
    instruction:
      "מהו התנאי על עכבת העומס $Z_L$ לקבלת הספק ממשי ממוצע מקסימלי בעומס?",
    options: [
      {
        id: 'circ-q02-opt1',
        plainText:
          "העומס חייב להיות הצמוד המרוכב של עכבת תבנין: $Z_L = Z_{th}^*$ (כלומר $R_L = R_{th}$ ו-$X_L = -X_{th}$).",
        mathText: "Z_L = Z_{th}^* \\implies R_L = R_{th}, \\; X_L = -X_{th}",
        isCorrect: true,
        explanation:
          "נכון: הזרם במעגל הוא $I = \\frac{V_{th}}{(R_{th}+R_L) + j(X_{th}+X_L)}$. ההספק הממשי הנצרך בעומס הוא $P = \\frac{1}{2}|I|^2 R_L = \\frac{1}{2} \\frac{|V_{th}|^2 R_L}{(R_{th}+R_L)^2 + (X_{th}+X_L)^2}$. כדי למקסם את הביטוי, יש לאפס תחילה את האיבר המרוכב במכנה ע״י בחירת היגב מבטל $X_L = -X_{th}$ (תהודה). לאחר מכן, גזירה לפי $R_L$ נותנת $R_L = R_{th}$. לכן $Z_L = R_{th} - j X_{th} = Z_{th}^*$.",
      },
      {
        id: 'circ-q02-opt2',
        plainText:
          "העומס חייב להיות שווה במדויק לעכבת תבנין: $Z_L = Z_{th}$ ($R_L = R_{th}, X_L = X_{th}$).",
        isCorrect: false,
        explanation:
          "שגוי: שוויון מוחלט אינו מבטל את ההיגב המרוכב במכנה, אלא מכפיל אותו פי 2, מה שמקטין את הזרם ואת ההספק הנמסר.",
      },
      {
        id: 'circ-q02-opt3',
        plainText:
          "העומס חייב להיות התנגדותי טהור ללא היגב: $X_L = 0$ ו-$R_L = |Z_{th}|$.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה ($R_L = |Z_{th}|$) נכון אך ורק תחת האילוץ שהעומס מוגבל להיות נגד טהור ללא יכולת לשלב רכיב ריאקטיבי ($X_L = 0$). כאשר אין אילוץ, ביטול ההיגב $X_L = -X_{th}$ נותן הספק גבוה יותר.",
      },
      {
        id: 'circ-q02-opt4',
        plainText:
          "ההיגב של העומס חייב לשאוף לאינסוף ($X_L \\to \\infty$).",
        isCorrect: false,
        explanation:
          "שגוי: היגב אינסופי הוא נתק מוחלט שבו לא זורם זרם וההספק הנמסר הוא אפס.",
      },
    ],
  },
  {
    id: 'circ-q03-tellegens-theorem-conservation',
    domain: "משפט טלגן ושימור הספק רגעי",
    title: "תורת המעגלים - משפט טלגן ושימור הספק רגעי",
    context:
      "משפט טלגן (Tellegen's Theorem) מבוסס על הטופולוגיה של רשת מעגלית מקובצת המקיימת חוקי קירכהוף (KCL ו-KVL).",
    formulaLatex: "\\sum_{k=1}^b v_k(t) i_k(t) = 0",
    instruction:
      "איזו מהטענות הבאות נכונה בהכרח לגבי תחולתו ותכונותיו של משפט טלגן?",
    options: [
      {
        id: 'circ-q03-opt1',
        plainText:
          "המשפט תקף לכל מעגל מקובץ ללא תלות באופי הרכיבים: הוא נכון למעגלים ליניאריים, לא-ליניאריים, משתנים בזמן, פסיביים ואקטיביים כאחד.",
        isCorrect: true,
        explanation:
          "נכון: משפט טלגן נגזר אך ורק מתקפות KCL (חוק זרמי הצמתים) ו-KVL (חוק מתחי החוגים), הנובעים ממשוואות מקסוול במודל מעגלים מקובצים. הוכחת המשפט נשענת על אורתוגונליות של מרחבי המתחים והזרמים הטופולוגיים, ללא שום הנחה על משוואת הקשר (Constitutive Relations) של הרכיבים. לכן הוא מתקיים תמיד, אפילו עבור דיודות, טרנזיסטורים, או מעגלים עם אלמנטים לא-ליניאריים.",
      },
      {
        id: 'circ-q03-opt2',
        plainText:
          "המשפט תקף אך ורק במעגלי DC ליניאריים במצב מתמיד.",
        isCorrect: false,
        explanation:
          "שגוי: המשפט תקף בכל רגע בזמן $t$ עבור מעגלי AC, תופעות מעבר ומעגלים דינמיים כלליים.",
      },
      {
        id: 'circ-q03-opt3',
        plainText:
          "המשפט דורש שכל משרני וקבלי המעגל יהיו נקיים מאנרגיה התחלתית ($v_C(0) = i_L(0) = 0$).",
        isCorrect: false,
        explanation:
          "שגוי: תנאי התחלה אינם מגבילים את משפט טלגן; בכל רגע נתון סך כל ההספקים הרגעיים מתאפס.",
      },
      {
        id: 'circ-q03-opt4',
        plainText:
          "המשפט אינו מתקיים במעגלים המכילים מקורות אנרגיה בלתי-תלויים.",
        isCorrect: false,
        explanation:
          "שגוי: ההספק המסופק על ידי המקורות נכלל בסכימה בסימן מנוגד ומאזן במדויק את ההספק הנצרך ברכיבים.",
      },
    ],
  },
  {
    id: 'circ-q04-second-order-rlc-damping-roots',
    domain: "תופעות מעבר במעגל RLC טורי ומצבי ריסון",
    title: "תורת המעגלים - תופעות מעבר במעגל RLC טורי ומצבי ריסון",
    context:
      "במעגל RLC טורי ללא מקור, המשוואה הדיפרנציאלית המתארת את זרם המעגל היא $L \\frac{d^2 i}{dt^2} + R \\frac{di}{dt} + \\frac{1}{C} i = 0$. מקדם הריסון הוא $\\alpha = \\frac{R}{2L}$ ותדירות התהודה העצמית היא $\\omega_0 = \\frac{1}{\\sqrt{LC}}$.",
    formulaLatex: "s^2 + 2\\alpha s + \\omega_0^2 = 0, \\quad s_{1,2} = -\\alpha \\pm \\sqrt{\\alpha^2 - \\omega_0^2}",
    instruction:
      "מהו התנאי על ערך הנגד $R$ לקבלת ריסון קריטי (Critical Damping), ומה מאפיין את תגובת הזרם במצב זה?",
    options: [
      {
        id: 'circ-q04-opt1',
        plainText:
          "$R > 2\\sqrt{\\frac{L}{C}}$, והתגובה אוסצילטורית עם דעיכה מעריכית.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה מגדיר ריסון-יתר (Overdamped), שבו אין תנודות כלל ושורשי המשוואה האופיינית ממשיים ושונים.",
      },
      {
        id: 'circ-q04-opt2',
        plainText:
          "$R = 2\\sqrt{\\frac{L}{C}}$, והתגובה דועכת לאפס במהירות המרבית האפשרית ללא תנודות (ללא חציית האפס).",
        mathText: "R = 2\\sqrt{\\frac{L}{C}} \\iff \\alpha = \\omega_0",
        isCorrect: true,
        explanation:
          "נכון: ריסון קריטי מתקבל כאשר הדיסקרימיננטה מתאפסת: $\\alpha^2 = \\omega_0^2 \\implies \\frac{R^2}{4L^2} = \\frac{1}{LC} \\implies R = 2\\sqrt{\\frac{L}{C}}$. במצב זה שורשי המשוואה האופיינית ממשיים וכפולים ($s_1 = s_2 = -\\alpha$), והפתרון הוא מהצורה $i(t) = (A_1 + A_2 t)e^{-\\alpha t}$. זוהי תגובה א-מחזורית המגיעה למצב מתמיד בזמן המהיר ביותר ללא אוסצילציות.",
      },
      {
        id: 'circ-q04-opt3',
        plainText:
          "$R < 2\\sqrt{\\frac{L}{C}}$, והתגובה מכילה תדירות תנודה $\\omega_d = \\sqrt{\\omega_0^2 - \\alpha^2}$.",
        isCorrect: false,
        explanation:
          "שגוי: תנאי זה מגדיר תת-ריסון (Underdamped), שבו מתקבלות תנודות הרמוניות דועכות.",
      },
      {
        id: 'circ-q04-opt4',
        plainText:
          "$R = 0$, והמעגל מתנודד לנצח ללא שום דעיכה באנרגיה.",
        isCorrect: false,
        explanation:
          "שגוי: $R=0$ הוא מתנד הרמוני טהור אידיאלי (Undamped) ללא שום ריסון.",
      },
    ],
  },
  {
    id: 'circ-q05-initial-conditions-continuity-principles',
    domain: "תנאי רציפות במעגלים מיתוגיים",
    title: "תורת המעגלים - תנאי רציפות במעגלים מיתוגיים",
    context:
      "במעגל חשמלי הכולל קבלים ומשרנים מבוצע מיתוג רגעי בזמן $t = 0$. במעגל אין מקורות אימפולסיביים (אין זרמי/מתחי דלתא של דיראק $\\delta(t)$).",
    formulaLatex: "i_C(t) = C \\frac{dv_C}{dt}, \\quad v_L(t) = L \\frac{di_L}{dt}",
    instruction:
      "אילו גדלים פיזיקליים במעגל חייבים להיות רציפים ברגע המיתוג ($t = 0^-$ מול $t = 0^+$)?",
    options: [
      {
        id: 'circ-q05-opt1',
        plainText:
          "מתח המשרן $v_L(t)$ וזרם הקבל $i_C(t)$ חייבים להיות רציפים.",
        isCorrect: false,
        explanation:
          "שגוי: מתח משרן וזרם קבל יכולים לקפוץ באופן בדיד ואינם רציפים בעת מיתוג.",
      },
      {
        id: 'circ-q05-opt2',
        plainText:
          "מתח הקבל $v_C(t)$ וזרם המשרן $i_L(t)$ חייבים להיות רציפים: $v_C(0^+) = v_C(0^-)$ ו-$i_L(0^+) = i_L(0^-)$.",
        mathText: "v_C(0^+) = v_C(0^-), \\quad i_L(0^+) = i_L(0^-)",
        isCorrect: true,
        explanation:
          "נכון: האנרגיה האגורה בקבל היא $w_C = \\frac{1}{2}C v_C^2$ ובמשרן היא $w_L = \\frac{1}{2}L i_L^2$. קפיצה בדידה במתח קבל או בזרם משרן מחייבת מעבר אנרגיה בזמן אפס, כלומר הספק רגעי אינסופי הנובע מפונקציית דלתא. בהיעדר מקורות אימפולס חיצוניים, חוק שימור האנרגיה מחייב שמתח הקבל וזרם המשרן יישארו רציפים.",
      },
      {
        id: 'circ-q05-opt3',
        plainText:
          "כל המתחים והזרמים בכל ענפי המעגל חייבים להישמר רציפים לפי חוקי קירכהוף.",
        isCorrect: false,
        explanation:
          "שגוי: מיתוג גורם לקפיצות פתאומיות במתחים וזרמים של נגדים ובכל שאר הענפים שאינם מצומדים ישירות לחוקי הרציפות של משרן וקבל.",
      },
      {
        id: 'circ-q05-opt4',
        plainText:
          "אף גודל אינו רציף; המעגל מתאפס לחלוטין ברגע המיתוג ומתחיל מחדש.",
        isCorrect: false,
        explanation:
          "שגוי: האנרגיה המגנטית והאלקטרוסטטית שנאגרה אינה נעלמת ומשמשת כתנאי ההתחלה של המעגל במצבו החדש.",
      },
    ],
  },
  {
    id: 'circ-q06-first-order-rc-switched-response',
    domain: "מעגל RC מסדר ראשון ומציאת זמן התייצבות",
    title: "תורת המעגלים - מעגל RC מסדר ראשון ומציאת זמן התייצבות",
    context:
      "קבל בעל קיבול $C$ נטען ממתח התחלתי $V_0$ דרך נגד $R$ באמצעות סוללת DC בעלת מתח $V_s$ ($V_s > V_0$). משוואת המתח היא:",
    formulaLatex: "v_C(t) = V_s + (V_0 - V_s)e^{-t/RC}",
    instruction:
      "כמה זמן יחלוף מרגע סגירת המפסק עד שמתח הקבל יגיע לערך המהווה בדיוק את מחצית הדרך בין המתח ההתחלתי למתח הסופי ($v_C(t^*) = \\frac{V_0 + V_s}{2}$)?",
    options: [
      {
        id: 'circ-q06-opt1',
        plainText:
          "$t^* = RC$",
        isCorrect: false,
        explanation:
          "שגוי: בזמן קבוע אחד $\\tau = RC$ המתח משלים כ-$63.2\\%$ מהשינוי ($1 - e^{-1} \\approx 0.632$) ולא 50%.",
      },
      {
        id: 'circ-q06-opt2',
        plainText:
          "$t^* = RC \\ln 2 \\approx 0.693 RC$",
        mathText: "t^* = RC \\ln 2",
        isCorrect: true,
        explanation:
          "נכון: נציב את הערך המבוקש במשוואה: $\\frac{V_0 + V_s}{2} = V_s + (V_0 - V_s)e^{-t^*/RC} \\implies \\frac{V_0 - V_s}{2} = (V_0 - V_s)e^{-t^*/RC}$. נחלק ב-$(V_0 - V_s) \\neq 0$: נקבל $e^{-t^*/RC} = \\frac{1}{2} \\implies -t^*/RC = -\\ln 2 \\implies t^* = RC \\ln 2$.",
      },
      {
        id: 'circ-q06-opt3',
        plainText:
          "$t^* = \\frac{RC}{2}$",
        isCorrect: false,
        explanation:
          "שגוי: התגובה היא מעריכית לא-ליניארית, ולכן הגעה לחצי מהמתח אינה אורכת מחצית מזמן קבוע הריסון.",
      },
      {
        id: 'circ-q06-opt4',
        plainText:
          "$t^* = 5 RC$",
        isCorrect: false,
        explanation:
          "שגוי: $5RC$ הוא הזמן המקובל להגעה למצב מתמיד מלא (מעל 99% מהטעינה).",
      },
    ],
  },
  {
    id: 'circ-q07-parallel-rlc-resonance-bandwidth',
    domain: "תהודה במעגל RLC מקבילי וגורם איכות",
    title: "תורת המעגלים - תהודה במעגל RLC מקבילי וגורם איכות",
    context:
      "במעגל RLC מקבילי המחובר למקור זרם סינוסואידלי, הנגד $R$, המשרן $L$ והקבל $C$ מחוברים במקביל. תדירות התהודה היא $\\omega_0 = \\frac{1}{\\sqrt{LC}}$ וגורם האיכות הוא $Q = R\\sqrt{\\frac{C}{L}} = \\omega_0 R C$.",
    formulaLatex: "Y(j\\omega) = \\frac{1}{R} + j\\left(\\omega C - \\frac{1}{\\omega L}\\right), \\quad B = \\frac{\\omega_0}{Q}",
    instruction:
      "מה מתרחש בתדירות התהודה $\\omega_0$, ומהו רוחב הפס $B$ של המעגל?",
    options: [
      {
        id: 'circ-q07-opt1',
        plainText:
          "העכבה השקולה מתאפסת ($Z = 0$), ורוחב הפס הוא $B = \\frac{R}{L}$.",
        isCorrect: false,
        explanation:
          "שגוי: עכבה אפסית בתהודה מאפיינת מעגל RLC טורי (קצר מדומה). במעגל מקבילי העכבה מקסימלית.",
      },
      {
        id: 'circ-q07-opt2',
        plainText:
          "הזרם דרך הנגד מתאפס, ורוחב הפס הוא $B = \\frac{1}{RC}$.",
        isCorrect: false,
        explanation:
          "שגוי: בתהודה כל זרם המקור זורם דרך הנגד משום שההיגבים של המשרן והקבל מבטלים זה את זה לחלוטין.",
      },
      {
        id: 'circ-q07-opt3',
        plainText:
          "העכבה השקולה הינה התנגדותית טהורה ומקבלת ערך מקסימלי $Z(j\\omega_0) = R$, ורוחב הפס הוא $B = \\frac{1}{RC}$.",
        mathText: "Z(j\\omega_0) = R, \\quad B = \\frac{\\omega_0}{Q} = \\frac{1}{RC}",
        isCorrect: true,
        explanation:
          "נכון: האדמיטנס במקביל הוא $Y(j\\omega) = \\frac{1}{R} + j(\\omega C - \\frac{1}{\\omega L})$. בתדירות התהודה $\\omega_0 = \\frac{1}{\\sqrt{LC}}$, החלק המדומה מתאפס: $Y(j\\omega_0) = \\frac{1}{R}$, ולכן העכבה מקסימלית ושווה לנגד $Z(j\\omega_0) = R$. רוחב הפס (מרחק בין תדרי חצי-הספק) מוגדר כ-$B = \\frac{\\omega_0}{Q} = \\frac{\\omega_0}{\\omega_0 R C} = \\frac{1}{RC}$.",
      },
      {
        id: 'circ-q07-opt4',
        plainText:
          "מתח המעגל מתאפס זהותית, ורוחב הפס הוא אינסופי.",
        isCorrect: false,
        explanation:
          "שגוי: העכבה מקסימלית ולכן המתח מגיע לשיא המרבי שלו עבור זרם מקור נתון.",
      },
    ],
  },
  {
    id: 'circ-q08-complex-power-factor-correction',
    domain: "הספק מרוכב ותיקון גורם הספק",
    title: "תורת המעגלים - הספק מרוכב ותיקון גורם הספק",
    context:
      "מפעל צורך הספק ממשי $P = 100\\text{kW}$ בהספק עיוור השראתי $Q_L = 100\\text{kVAR}$ במתח סינוסואידלי בעל ערך יעיל $V_{rms} = 1000\\text{V}$ בתדירות $\\omega = 1000\\text{rad/s}$ (גורם הספק $\\cos\\phi = \\frac{1}{\\sqrt{2}}$ בפיגור).",
    formulaLatex: "S = P + j Q_L = 100 + j 100 \\text{ kVA}, \\quad Q_C = -\\omega C V_{rms}^2",
    instruction:
      "מהו קיבול הקבל $C$ שיש לחבר במקביל למפעל כדי לשפר את גורם ההספק ליחידה ($\\cos\\phi' = 1$, הספק עיוור שקול אפס)?",
    options: [
      {
        id: 'circ-q08-opt1',
        plainText:
          "$C = 10\\mu\\text{F}$",
        isCorrect: false,
        explanation:
          "שגוי: קיבול זה קטן פי 10 מהנדרש ומבטל רק חלק מזערי מההספק העיוור.",
      },
      {
        id: 'circ-q08-opt2',
        plainText:
          "$C = 50\\mu\\text{F}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה מאי-הכללת פקטור 2 בחישוב מתח שיא מול מתח יעיל (כאשר כאן נתון ישירות $V_{rms}$).",
      },
      {
        id: 'circ-q08-opt3',
        plainText:
          "$C = 100\\mu\\text{F}$",
        mathText: "C = 100\\mu\\text{F}",
        isCorrect: true,
        explanation:
          "נכון: כדי להגיע ל-$PF = 1$, הקבל המקבילי חייב לספק הספק עיוור קיבולי המבטל לחלוטין את ההספק העיוור ההשראתי: $Q_C = -Q_L = -100\\text{kVAR} = -100,000\\text{VAR}$. מאידך, ההספק העיוור הנצרך בקבל במתח יעיל $V_{rms}$ הוא $Q_C = -\\omega C V_{rms}^2$. נשווה גדלים: $100,000 = 1000 \\times C \\times (1000)^2 = 10^9 C \\implies C = \\frac{10^5}{10^9} = 10^{-4}\\text{F} = 100\\mu\\text{F}$.",
      },
      {
        id: 'circ-q08-opt4',
        plainText:
          "$C = 1\\text{mF}$",
        isCorrect: false,
        explanation:
          "שגוי: קיבול זה גדול פי 10 וייצור עומס קיבולי יתר משמעותי במעגל שירחיק את גורם ההספק מ-1.",
      },
    ],
  },
  {
    id: 'circ-q09-mutual-inductance-dot-convention-energy',
    domain: "השראות הדדית, חוק הנקודות ואנרגיה במשרנים מצומדים",
    title: "תורת המעגלים - השראות הדדית, חוק הנקודות ואנרגיה במשרנים מצומדים",
    context:
      "שני משרנים בעלי השראויות עצמיות $L_1, L_2$ והשראות הדדית $M$ מצומדים מגנטית. זרמים $i_1(t)$ ו-$i_2(t)$ נכנסים שניהם לנקודות הסימון (Dot Convention).",
    formulaLatex: "v_1 = L_1 \\frac{di_1}{dt} + M \\frac{di_2}{dt}, \\quad v_2 = L_2 \\frac{di_2}{dt} + M \\frac{di_1}{dt}",
    instruction:
      "מהו הביטוי המדויק לאנרגיה המגנטית הרגעית האגורה בצמד המשרנים, ומהו החסם הפיזיקלי על $M$?",
    options: [
      {
        id: 'circ-q09-opt1',
        plainText:
          "$W = \\frac{1}{2}L_1 i_1^2 + \\frac{1}{2}L_2 i_2^2 - M i_1 i_2$, ו-$M$ יכול לקבל כל ערך ממשי.",
        isCorrect: false,
        explanation:
          "שגוי: כאשר שני הזרמים נכנסים לנקודות הצימוד, השטפים המגנטיים מחזקים זה את זה והאיבר ההדדי נוסף בסימן חיובי $+M i_1 i_2$.",
      },
      {
        id: 'circ-q09-opt2',
        plainText:
          "$W = \\frac{1}{2}(L_1 + L_2 + 2M)(i_1 + i_2)^2$, ו-$M \\le \\frac{L_1 + L_2}{2}$.",
        isCorrect: false,
        explanation:
          "שגוי: נוסחה זו שגויה ממדית ומניחה שוויון זרמים מוחלט בין שני המשרנים.",
      },
      {
        id: 'circ-q09-opt3',
        plainText:
          "$W = \\frac{1}{2}L_1 i_1^2 + \\frac{1}{2}L_2 i_2^2 + M i_1 i_2$, כאשר תנאי הפסיביות מחייב חסם הדוק $M \\le \\sqrt{L_1 L_2}$.",
        mathText: "W = \\frac{1}{2}L_1 i_1^2 + \\frac{1}{2}L_2 i_2^2 + M i_1 i_2, \\quad M \\le \\sqrt{L_1 L_2}",
        isCorrect: true,
        explanation:
          "נכון: לפי חוק הנקודות, כניסת שני הזרמים לנקודות מייצרת כא״מ הדדי חיובי ואנרגיה כוללת $W = \\frac{1}{2}L_1 i_1^2 + \\frac{1}{2}L_2 i_2^2 + M i_1 i_2$. כדי שהאנרגיה האגורה ברשת פסיבית תהיה אי-שלילית לכל צירוף זרמים ($W \\ge 0$), התבנית הריבועית מחייבת דיסקרימיננטה אי-חיובית: $M^2 - L_1 L_2 \\le 0 \\implies M \\le \\sqrt{L_1 L_2}$ (מקדם צימוד $k = M/\\sqrt{L_1 L_2} \\le 1$).",
      },
      {
        id: 'circ-q09-opt4',
        plainText:
          "$W = \\frac{1}{2}(L_1 - M)i_1^2 + \\frac{1}{2}(L_2 - M)i_2^2$, ואין הגבלה על מקדם הצימוד.",
        isCorrect: false,
        explanation:
          "שגוי: פירוק זה שייך לרשת T שקולה ואינו מבטא את האנרגיה האגורה במשרנים המקוריים.",
      },
    ],
  },
  {
    id: 'circ-q10-s-domain-impedance-transfer-function',
    domain: "ניתוח במישור לפלס ויציבות רשת",
    title: "תורת המעגלים - ניתוח במישור לפלס (s-Domain) ויציבות רשת",
    context:
      "פונקציית תמסורת של מעגל ליניארי קבוע בזמן נתונה על ידי $H(s) = \\frac{V_{out}(s)}{V_{in}(s)} = \\frac{s + 2}{s^2 + 4s + 13}$.",
    formulaLatex: "H(s) = \\frac{s + 2}{(s + 2)^2 + 3^2} = \\frac{s + 2}{s^2 + 4s + 13}",
    instruction:
      "מהם הקטבים של המערכת, ומהי תגובת ההלם (Impulse Response) $h(t)$ בזמן?",
    options: [
      {
        id: 'circ-q10-opt1',
        plainText:
          "הקטבים הם $s = -4 \\pm j3$, ותגובת ההלם היא $h(t) = e^{-4t}\\cos(3t)u(t)$.",
        isCorrect: false,
        explanation:
          "שגוי: שורשי המכנה הם $s = \\frac{-4 \\pm \\sqrt{16 - 52}}{2} = -2 \\pm j3$, ולא $-4$.",
      },
      {
        id: 'circ-q10-opt2',
        plainText:
          "הקטבים הם $s = 2 \\pm j3$, ותגובת ההלם מתבדרת מעריכית כ-$e^{2t}$.",
        isCorrect: false,
        explanation:
          "שגוי: החלק הממשי של הקטבים הוא שלילי ($-2$) ולכן המערכת יציבה לחלוטין ודועכת.",
      },
      {
        id: 'circ-q10-opt3',
        plainText:
          "הקטבים הם $s = -2 \\pm j3$, ותגובת ההלם היא $h(t) = \\frac{1}{3}e^{-2t}\\sin(3t)u(t)$.",
        isCorrect: false,
        explanation:
          "שגוי: במונה מופיע $s+2$ התואם להתמרה של פונקציית קוסינוס מוזזת ולא סינוס.",
      },
      {
        id: 'circ-q10-opt4',
        plainText:
          "הקטבים הם $s = -2 \\pm j3$ (חצי מישור שמאל, מערכת יציבה), ותגובת ההלם היא $h(t) = e^{-2t}\\cos(3t)u(t)$.",
        mathText: "s_{1,2} = -2 \\pm j3, \\quad h(t) = e^{-2t}\\cos(3t)u(t)",
        isCorrect: true,
        explanation:
          "נכון: נשלים לריבוע במכנה: $s^2 + 4s + 13 = (s + 2)^2 + 3^2$. שורשי המכנה (הקטבים) הם $s_{1,2} = -2 \\pm j3$. מכיוון שהחלק הממשי של כל הקטבים שלילי ממש ($\\text{Re}(s) = -2 < 0$), המערכת יציבה אסימפטוטית (BIBO Stable). לפי טבלת התמרות לפלס: $\\mathcal{L}\\{e^{-at}\\cos(\\omega t)u(t)\\} = \\frac{s + a}{(s + a)^2 + \\omega^2}$. כאן $a = 2, \\omega = 3$, ולכן ההתמרה ההפוכה הישירה של $\\frac{s+2}{(s+2)^2+3^2}$ היא $h(t) = e^{-2t}\\cos(3t)u(t)$.",
      },
    ],
  },
  {
    id: 'circ-q11-opamp-negative-feedback-saturation',
    domain: "מגבר שרת עם משוב שלילי ומגבלות מודל אידיאלי",
    title: "תורת המעגלים - מגבר שרת (Op-Amp) עם משוב שלילי ומגבלות מודל אידיאלי",
    context:
      "מגבר שרת מחובר בתצורת מגבר מהפך (Inverting Amplifier) עם נגד מבוא $R_1 = 10\\text{k}\\Omega$ ונגד משוב $R_f = 100\\text{k}\\Omega$. מתחי האספקה של המגבר הם $V_{CC} = +15\\text{V}$ ו-$V_{EE} = -15\\text{V}$. מתח המבוא הוא $v_{in} = 2\\text{V}$.",
    formulaLatex: "v_{out,ideal} = -\\frac{R_f}{R_1} v_{in} = -10 v_{in}, \\quad -V_{EE} \\le v_{out} \\le V_{CC}",
    instruction:
      "מהו מתח המוצא $v_{out}$ בפועל, ומהו מתח ההדק המהפך $v^-$ במצב זה?",
    options: [
      {
        id: 'circ-q11-opt1',
        plainText:
          "$v_{out} = -20\\text{V}$, ומתח ההדק המהפך הוא אדמה מדומה מדויקת $v^- = 0\\text{V}$.",
        isCorrect: false,
        explanation:
          "שגוי: מתח המוצא אינו יכול לחרוג ממתחי האספקה של המגבר (הרוויה ננעלת ב-$-15\\text{V}$).",
      },
      {
        id: 'circ-q11-opt2',
        plainText:
          "$v_{out} = -15\\text{V}$, וההדק המהפך נשאר אדמה מדומה $v^- = 0\\text{V}$.",
        isCorrect: false,
        explanation:
          "שגוי: מרגע שהמוצא נכנס לרוויה, המשוב השלילי מפסיק לפעול וההדק $v^-$ מתנתק מהאדמה המדומה.",
      },
      {
        id: 'circ-q11-opt3',
        plainText:
          "$v_{out} = 0\\text{V}$, משום שהמעגל נשרף מעומס יתר.",
        isCorrect: false,
        explanation:
          "שגוי: רוויה אינה שורפת מגבר שרת תקין אלא קוטמת את המתח ברמת האספקה.",
      },
      {
        id: 'circ-q11-opt4',
        plainText:
          "$v_{out} = -15\\text{V}$ (רוויה שלילית), וההדק המהפך אינו אדמה מדומה אלא מגיע למתח חיובי $v^- \\approx 0.455\\text{V}$.",
        mathText: "v_{out} = -15\\text{V}, \\quad v^- = \\frac{R_f v_{in} + R_1 V_{sat}^-}{R_1 + R_f} \\approx 0.455\\text{V}",
        isCorrect: true,
        explanation:
          "נכון: ההגבר האידיאלי הוא $-R_f/R_1 = -10$. עבור כניסה של $2\\text{V}$, המוצא המחושב הוא $-20\\text{V}$. מאחר שמתח האספקה המינימלי הוא $-15\\text{V}$, המגבר נכנס לרוויה (Saturation) והמוצא ננעל על $v_{out} = -15\\text{V}$. במצב רוויה המגבר אינו מתפקד כמגבר ליניארי והמשוב השלילי אינו שומר עוד על מתח הדקים זהה (נשבר הקונספט של אדמה מדומה). מתח ההדק $v^-$ נקבע לפי מחלק מתח פשוט בין $v_{in}$ ל-$v_{out}$: $v^- = v_{in} + (v_{out} - v_{in})\\frac{R_1}{R_1 + R_f} = 2 + (-15 - 2)\\frac{10}{110} = 2 - \\frac{170}{110} \\approx 0.455\\text{V}$.",
      },
    ],
  },
  {
    id: 'circ-q12-two-port-parameters-reciprocity-symmetry',
    domain: "רשתות דו-שעריות והדדיות",
    title: "תורת המעגלים - רשתות דו-שעריות (Two-Port Networks) והדדיות",
    context:
      "רשת דו-שערית ליניארית ופסיבית נטולת מקורות בלתי-תלויים מתוארת על ידי מטריצת עכבות $Z$ ומטריצת תמסורת $T$ (ABCD):",
    formulaLatex: "\\begin{pmatrix} V_1 \\\\ V_2 \\end{pmatrix} = \\begin{pmatrix} z_{11} & z_{12} \\\\ z_{21} & z_{22} \\end{pmatrix} \\begin{pmatrix} I_1 \\\\ I_2 \\end{pmatrix}, \\quad \\begin{pmatrix} V_1 \\\\ I_1 \\end{pmatrix} = \\begin{pmatrix} A & B \\\\ C & D \\end{pmatrix} \\begin{pmatrix} V_2 \\\\ -I_2 \\end{pmatrix}",
    instruction:
      "מהם התנאים השקולים ההכרחיים והמספיקים לכך שהרשת תהיה הדדית (Reciprocal) ולכך שהיא תהיה סימטרית (Symmetric)?",
    options: [
      {
        id: 'circ-q12-opt1',
        plainText:
          "הדדיות: $z_{11} = z_{22}$; סימטריות: $z_{12} = z_{21}$.",
        isCorrect: false,
        explanation:
          "שגוי: התנאים הוחלפו; שוויון איברי האלכסון הראשי הוא סימטריות, ושיוויון איברי האלכסון המשני הוא הדדיות.",
      },
      {
        id: 'circ-q12-opt2',
        plainText:
          "הדדיות: $\\det(Z) = 1$; סימטריות: $\\det(T) = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: דטרמיננטת $Z$ אינה מוגבלת ל-1 ברשתות הדדיות, ודטרמיננטה אפסית של $T$ מייצגת רשת סינגולרית שאינה הפיכה.",
      },
      {
        id: 'circ-q12-opt3',
        plainText:
          "הדדיות וסימטריות הן שקולות תמיד ברשתות פסיביות ללא מקורות תלויים.",
        isCorrect: false,
        explanation:
          "שגוי: רשת יכולה להיות הדדית (למשל מנחת בצורת T עם נגדים שונים $R_1 \\neq R_2$) אך לא סימטרית.",
      },
      {
        id: 'circ-q12-opt4',
        plainText:
          "הדדיות: $z_{12} = z_{21}$ (שקול ל-$AD - BC = 1$); סימטריות: $z_{11} = z_{22}$ (שקול ל-$A = D$).",
        mathText: "\\text{Reciprocity: } z_{12} = z_{21} \\; (AD - BC = 1), \\quad \\text{Symmetry: } z_{11} = z_{22} \\; (A = D)",
        isCorrect: true,
        explanation:
          "נכון: הדדיות (Reciprocity) משמעה שהעברת אות ממבוא 1 למבוא 2 זהה להעברה ההפוכה, מה שמתבטא במטריצת עכבות סימטרית $z_{12} = z_{21}$ ובמטריצת תמסורת בעלת דטרמיננטה אחת $AD - BC = 1$. סימטריות פיזית (Symmetry) משמעה ששני השערים בלתי ניתנים להבחנה חשמלית מבחוץ, דבר המתקיים אם ורק אם עכבות הכניסה העצמיות זהות: $z_{11} = z_{22}$, ושקול במטריצת התמסורת לשוויון מקדמי האלכסון $A = D$.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_ELECTRIC_CIRCUITS_QUESTIONS = ELECTRIC_CIRCUITS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Thevenin / max power / Tellegen (Q1–3)
 * - 1 from RLC damping / continuity / RC transient (Q4–6)
 * - 1 from resonance / PF / mutual L / s-domain / op-amp / two-port (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleCircuitsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupBasics = ELECTRIC_CIRCUITS_QUESTIONS.slice(0, 3);
  const groupMid = ELECTRIC_CIRCUITS_QUESTIONS.slice(3, 6);
  const groupAdvanced = ELECTRIC_CIRCUITS_QUESTIONS.slice(6, 12);

  if (
    groupBasics.length === 0 ||
    groupMid.length === 0 ||
    groupAdvanced.length === 0
  ) {
    return [];
  }

  const pickedA =
    groupBasics[Math.floor(Math.random() * groupBasics.length)];
  const pickedB = groupMid[Math.floor(Math.random() * groupMid.length)];
  const pickedC =
    groupAdvanced[Math.floor(Math.random() * groupAdvanced.length)];

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
