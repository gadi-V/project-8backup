import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic מעגלים אלקטרוניים אנלוגיים וספרתיים diagnostic bank (12Q).
 * Display name: "מעגלים אלקטרוניים אנלוגיים וספרתיים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const ELECTRONIC_CIRCUITS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "el-q01-small-signal-mosfet-transconductance",
    domain: "מודל אות קטן של MOSFET ומוליכות הדדית",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - מודל אות קטן של MOSFET ומוליכות הדדית ($g_m$)",
    context:
      "טרנזיסטור NMOS פועל באזור הרוויה (Saturation) בזרם שפך $I_D$. מתח היתר (Overdrive Voltage) מוגדר כ-$V_{ov} = V_{GS} - V_{th}$. מודל האות הקטן כולל את המוליכות ההדדית $g_m = \\left.\\frac{\\partial i_D}{\\partial v_{GS}}\\right|_{Q}$ ואת התנגדות המוצא $r_o = \\frac{1}{\\lambda I_D}$.",
    formulaLatex:
      "g_m = \\frac{2 I_D}{V_{ov}} = \\sqrt{2 \\mu_n C_{ox} \\frac{W}{L} I_D} = \\mu_n C_{ox} \\frac{W}{L} V_{ov}",
    instruction:
      "כיצד משתנה המוליכות ההדדית $g_m$ כאשר מכפילים את זרם העבודה פי 4 ($I_D' = 4 I_D$) תוך שמירה על ממדי הטרנזיסטור ($W/L$ קבוע)?",
    options: [
      {
        id: "el-q01-opt1",
        plainText:
          "המוליכות ההדדית מוכפלת פי 2 בדיוק ($g_m' = 2 g_m$), משום ש-$g_m \\propto \\sqrt{I_D}$ עבור גיאומטריה קבועה.",
        mathText: "g_m \\propto \\sqrt{I_D} \\implies g_m' = \\sqrt{4} g_m = 2 g_m",
        isCorrect: true,
        explanation:
          "נכון: לפי נוסחת הטרנסקונדקטנס ברוויה: $g_m = \\sqrt{2 k_n' \\frac{W}{L} I_D}$. כאשר ממדי התעלה $W/L$ ומקדמי הטכנולוגיה קבועים, $g_m$ תלוי ישירות בשורש הריבועי של זרם השפך $I_D$. לכן הכפלת הזרם פי 4 מעלה את ה-$g_m$ בפקטור של $\\sqrt{4} = 2$. (שימו לב: אם $V_{ov}$ היה נשמר קבוע ע״י שינוי $W$, ה-$g_m$ היה עולה פי 4, אך כאן מפורש שהגיאומטריה $W/L$ קבועה).",
      },
      {
        id: "el-q01-opt2",
        plainText: "המוליכות ההדדית גדלה פי 4 ($g_m' = 4 g_m$) לפי חוק אוהם הליניארי.",
        isCorrect: false,
        explanation:
          "שגוי: תלות ליניארית בזרם ($g_m = I_C/V_t$) מאפיינת טרנזיסטור ביפולרי BJT, אך ב-MOSFET התלות היא בשורש הזרם.",
      },
      {
        id: "el-q01-opt3",
        plainText: "המוליכות ההדדית קטנה פי 2 משום שהתנגדות המוצא $r_o$ קטנה פי 4.",
        isCorrect: false,
        explanation:
          "שגוי: התנגדות המוצא $r_o$ אכן קטנה, אך $g_m$ הוא מדד להגבר הזרם מהשער ולעולם אינו יורד עם עליית הזרם.",
      },
      {
        id: "el-q01-opt4",
        plainText: "המוליכות ההדדית נשארת קבועה משום שהיא תלויה אך ורק במתח הסף $V_{th}$.",
        isCorrect: false,
        explanation: "שגוי: $V_{th}$ קובע את נקודת ההתחלה, אך שיפוע עקומת הזרם גדל עם הזרם.",
      },
    ],
  },
  {
    id: "el-q02-miller-effect-input-capacitance",
    domain: "אפקט מילר וקיבול מבוא אפקטיבי",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - אפקט מילר וקיבול מבוא אפקטיבי בדרגת הגבר",
    context:
      "במגבר שפופרת/טרנזיסטור בתצורת Common Source (או Inverting Amplifier), קיים קבל צימוד טפילי $C_{gd}$ בין השער (המבוא) לבין השפך (המוצא). הגבר המתח של הדרגה ברוחב הסרט הוא $A_v = \\frac{v_{out}}{v_{in}} = -g_m R_L' < 0$ (מגבר מהפך).",
    formulaLatex: "C_{in,Miller} = C_{gd} (1 - A_v) = C_{gd} (1 + |A_v|)",
    instruction: "כיצד משפיע אפקט מילר (Miller Effect) על קיבול המבוא הכולל הנראה מהכניסה ועל תגובת התדר של המגבר?",
    options: [
      {
        id: "el-q02-opt1",
        plainText:
          "הקיבול הטפילי $C_{gd}$ מוכפל בפקטור ההגבר ($1 + |A_v|$) ומופיע במבוא כקיבול ענק במקביל ל-$C_{gs}$, מה שיוצר קוטב דומיננטי בתדר נמוך ומצר באופן דרמטי את רוחב הפס של המגבר.",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט מילר, קבל המחובר בין שני צמתים בעלי הגבר $A_v$ מושך זרם $i = \\frac{v_{in} - v_{out}}{1/j\\omega C} = j\\omega C (v_{in} - A_v v_{in}) = j\\omega C(1 - A_v) v_{in}$. מבחינת המבוא, הזרם הנמשך שקול לקבל מוגדל לאדמה שערכו $C_M = C_{gd}(1 - A_v) = C_{gd}(1 + |A_v|)$. אם המגבר בעל הגבר גבוה (למשל $A_v = -100$), קבל קטן של $1\\text{ pF}$ נראה במבוא כמו $101\\text{ pF}$. קיבול מוגדל זה, בשילוב עם התנגדות המקור $R_{sig}$, יוצר קוטב דומיננטי בתדר נמוך $\\omega_p = \\frac{1}{R_{sig}(C_{gs} + C_M)}$ ומגביל קשות את תגובת התדר של דרגות Common-Source/Common-Emitter.",
      },
      {
        id: "el-q02-opt2",
        plainText: "אפקט מילר מקטין את קיבול המבוא לאפס ומאפשר רוחב פס אינסופי.",
        isCorrect: false,
        explanation:
          "שגוי: אפקט מילר מכפיל ומגדיל את הקיבול במגבר מהפך ($A_v < 0$) ולא מקטין אותו; הקטנת קיבול (Bootstrapping) קורית רק בהגבר חיובי קטן מ-1.",
      },
      {
        id: "el-q02-opt3",
        plainText: "האפקט מבטל את ההגבר של הטרנזיסטור ב-DC.",
        isCorrect: false,
        explanation: "שגוי: ב-DC הקבל מהווה נתק מוחלט ($j\\omega C = 0$) ואין לאפקט מילר שום השפעה על הגבר ה-DC.",
      },
      {
        id: "el-q02-opt4",
        plainText: "האפקט מתרחש אך ורק במגבר עוקב מקור (Source Follower).",
        isCorrect: false,
        explanation:
          "שגוי: ב-Source Follower ההגבר חיובי ($A_v \\approx +1$), ולכן הקיבול מתבטל ($1 - 1 \\approx 0$); אפקט מילר המזיק מתרחש במגבר מהפך.",
      },
    ],
  },
  {
    id: "el-q03-cascode-amplifier-advantages",
    domain: "דרגת הגבר קסקוד",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - דרגת הגבר קסקוד (Cascode Amplifier) ותכונותיה",
    context:
      "מגבר קסקוד מורכב משרשור של שתי דרגות: דרגת Common-Source (או Common-Emitter) בכניסה המזינה דרגת Common-Gate (או Common-Base) במוצא.",
    formulaLatex: "R_{out} \\approx (g_{m2} r_{o2}) r_{o1}, \\quad A_v \\approx -g_{m1} R_{out}",
    instruction: "מהם שני היתרונות המרכזיים של תצורת הקסקוד בהשוואה לדרגת Common-Source פשוטה?",
    options: [
      {
        id: "el-q03-opt1",
        plainText:
          "הגדלה דרמטית של התנגדות המוצא (פי $g_{m2} r_{o2}$) המאפשרת הגבר מתח גבוה בהרבה, וביטול כמעט מוחלט של אפקט מילר במבוא המאפשר הרחבה ניכרת של רוחב הפס.",
        isCorrect: true,
        explanation:
          "נכון: 1. ביטול אפקט מילר: הטרנזיסטור התחתון ($M_1$) רואה בעומס שלו את עכבת המבוא הנמוכה מאוד של הטרנזיסטור העליון ($1/g_{m2}$). לכן הגבר המתח של הדרגה הראשונה הוא $A_{v1} \\approx -g_{m1} (1/g_{m2}) \\approx -1$. מכיוון שההגבר הוא 1 בלבד, קיבול מילר של $C_{gd1}$ מוכפל רק פי 2 ($1 - (-1) = 2$) במקום פי עשרות, ורוחב הפס מתרחב משמעותית. 2. התנגדות מוצא עצומה: הטרנזיסטור העליון ($M_2$) מנוון במקורו ע״י $r_{o1}$, ולכן התנגדות המוצא הכוללת נוסקת ל-$R_{out} \\approx g_{m2} r_{o2} r_{o1}$, מה שמאפשר השגת הגבר מתח עצום ($A_v \\approx -g_{m1} R_{out} \\propto (g_m r_o)^2$) בדרגה אחת.",
      },
      {
        id: "el-q03-opt2",
        plainText: "הורדת מתח האספקה המינימלי הנדרש ($V_{DD}$) לחצי ממתח של טרנזיסטור בודד.",
        isCorrect: false,
        explanation:
          "שגוי: קסקוד דורש ערימה של שני טרנזיסטורים בטור (Stacking) ולכן סובל מחיסרון של הקטנת תחום הדינמי של המתח במוצא (Voltage Headroom).",
      },
      {
        id: "el-q03-opt3",
        plainText: "הפיכת המגבר לדיגיטלי טהור ללא צורך בממתחי DC.",
        isCorrect: false,
        explanation: "שגוי: קסקוד הוא מעגל אנלוגי מובהק המחייב ממתחי שער מדויקים בשני הטרנזיסטורים.",
      },
      {
        id: "el-q03-opt4",
        plainText: "ביטול הצורך בשימוש במראות זרם לטעינה אקטיבית.",
        isCorrect: false,
        explanation: "שגוי: לרוב משלבים קסקוד עם מראת זרם מסוג Cascode Current Mirror כדי לממש עומס אקטיבי בעל התנגדות תואמת.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "el-q04-differential-pair-cmrr-tail-current",
    domain: "זוג הפרשי ויחס דחיית אות משותף",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - זוג הפרשי (Differential Pair) ויחס דחיית אות משותף (CMRR)",
    context:
      "בזוג הפרשי סימטרי עם עומס נגדי $R_D$, זרם הזנב מסופק ע״י מקור זרם מעשי בעל התנגדות יציאה סופית $R_{SS}$ (התנגדות הזנב).",
    formulaLatex:
      "A_d = -g_m R_D, \\quad A_{cm} = -\\frac{g_m R_D}{1 + 2 g_m R_{SS}} \\approx -\\frac{R_D}{2 R_{SS}}, \\quad \\text{CMRR} = \\left|\\frac{A_d}{A_{cm}}\\right|",
    instruction: "מהו יחס דחיית האות המשותף (CMRR) של המגבר, וכיצד משפיעה הגדלת התנגדות הזנב $R_{SS}$ על דחיית רעשים?",
    options: [
      {
        id: "el-q04-opt1",
        plainText: "$\\text{CMRR} = g_m R_D$; הגדלת $R_{SS}$ פוגעת בהגבר ההפרשי של המעגל.",
        isCorrect: false,
        explanation:
          "שגוי: ההגבר ההפרשי אינו תלוי ב-$R_{SS}$ משום שבמצב הפרשי צומת הזנב מהווה אדמה מדומה (Virtual Ground).",
      },
      {
        id: "el-q04-opt2",
        plainText:
          "$\\text{CMRR} \\approx 2 g_m R_{SS}$; ככל שהתנגדות מקור הזנב $R_{SS}$ גבוהה יותר, הגבר האות המשותף $A_{cm}$ קטן, והמגבר דוחה ביעילות רבה יותר רעשים והפרעות המשותפים לשני המבואות.",
        mathText: "\\text{CMRR} = 2 g_m R_{SS}",
        isCorrect: true,
        explanation:
          "נכון: 1. במצב הפרשי ($v_{in1} = -v_{in2}$), צומת הזנב המשותף נמצא במתח קבוע (אדמה מדומה מרוכבת), ולכן התנגדות הזנב $R_{SS}$ אינה משפיעה וההגבר ההפרשי הוא $A_d = -g_m R_D$. 2. במצב אות משותף ($v_{in1} = v_{in2} = v_{cm}$), שני הצדדים פועלים במקביל כמגבר עם ניוון מקור (Source Degeneration) בעל נגד מקור של $2R_{SS}$. ההגבר המשותף הוא $A_{cm} = -\\frac{g_m R_D}{1 + 2g_m R_{SS}} \\approx -\\frac{R_D}{2R_{SS}}$. 3. יחס הדחייה: $\\text{CMRR} = |A_d / A_{cm}| = g_m R_D / \\frac{g_m R_D}{1 + 2g_m R_{SS}} = 1 + 2g_m R_{SS} \\approx 2g_m R_{SS}$. ככל ש-$R_{SS} \\to \\infty$ (מקור זרם אידיאלי), $A_{cm} \\to 0$ ו-$\\text{CMRR} \\to \\infty$.",
      },
      {
        id: "el-q04-opt3",
        plainText: "$\\text{CMRR} = \\frac{1}{2 g_m R_{SS}}$; המגבר דוחה אותות רק כאשר $R_{SS} = 0$.",
        isCorrect: false,
        explanation: "שגוי: אם $R_{SS} = 0$ המגבר יגביר אות משותף במלוא העוצמה ודחיית הרעשים תתאפס.",
      },
      {
        id: "el-q04-opt4",
        plainText: "ה-CMRR תלוי אך ורק באי-התאמה (Mismatch) בין הנגדים ואינו מושפע כלל מ-$R_{SS}$.",
        isCorrect: false,
        explanation:
          "שגוי: Mismatch מייצר המרה מאות משותף לאות הפרשי, אך גם במעגל סימטרי לחלוטין ה-CMRR נקבע ישירות ע״י $2g_m R_{SS}$.",
      },
    ],
  },
  {
    id: "el-q05-feedback-topologies-impedance-effects",
    domain: "משוב שלילי והשפעתו על עכבות",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - משוב שלילי והשפעתו על עכבות מבוא ומוצא",
    context:
      "במגבר משוב שלילי, משווים בין 4 טופולוגיות בסיסיות: משוב מתח-טורי (Series-Shunt), משוב זרם-טורי (Series-Series), משוב מתח-מקבילי (Shunt-Shunt), ומשוב זרם-מקבילי (Shunt-Series). גורם השיפור במשוב הוא $1 + T = 1 + A\\beta > 1$.",
    instruction:
      "כיצד משפיע חיבור משוב במבוא (Series מול Shunt) ודגימת האות במוצא (Shunt-Voltage מול Series-Current) על עכבות המבוא והמוצא של המגבר?",
    options: [
      {
        id: "el-q05-opt1",
        plainText: "חיבור Shunt תמיד מגדיל עכבה, וחיבור Series תמיד מקטין עכבה.",
        isCorrect: false,
        explanation: "שגוי: הכלל הפוך; חיבור מקבילי (Shunt) מקטין עכבה וחיבור טורי (Series) מגדיל עכבה.",
      },
      {
        id: "el-q05-opt2",
        plainText:
          "חיבור טורי במבוא (Series Mixing) מגדיל את עכבת המבוא פי $(1 + T)$, חיבור מקבילי במבוא (Shunt Mixing) מקטין את עכבת המבוא פי $(1 + T)$; דגימת מתח במוצא (Shunt Sampling) מקטינה את עכבת המוצא פי $(1 + T)$, ודגימת זרם במוצא (Series Sampling) מגדילה את עכבת המוצא פי $(1 + T)$.",
        mathText:
          "R_{in,series} = R_{in}(1 + T), \\; R_{in,shunt} = \\frac{R_{in}}{1 + T}; \\quad R_{out,shunt} = \\frac{R_{out}}{1 + T}, \\; R_{out,series} = R_{out}(1 + T)",
        isCorrect: true,
        explanation:
          "נכון: עקרונות המשוב השלילי: 1. במבוא: אם מחברים בטור (Series), המתח שהמקור צריך לספק מתנגד למתח המשוב, ולכן נדרש יותר מתח לאותו זרם $\\implies$ עכבת המבוא גדלה פי $1+T$ (אידיאלי למגבר מתח). אם מחברים במקביל (Shunt), זרם המשוב שואב חלק מהזרם $\\implies$ עכבת המבוא קטנה פי $1+T$ (אידיאלי למגבר זרם). 2. במוצא: דגימת מתח במקביל (Shunt) שואפת לשמור על מתח מוצא יציב כנגד שינויי עומס (מקור מתח אידיאלי) $\\implies$ עכבת המוצא קטנה פי $1+T$. דגימת זרם בטור (Series) שואפת לקבע זרם עומס (מקור זרם אידיאלי) $\\implies$ עכבת המוצא גדלה פי $1+T$.",
      },
      {
        id: "el-q05-opt3",
        plainText: "כל סוגי המשוב מקטינים את כל העכבות במעגל פי $(1 + T)$ כדי להאיץ את תגובת הזמן.",
        isCorrect: false,
        explanation: "שגוי: עכבות טוריות גדלות בהכרח תחת משוב שלילי.",
      },
      {
        id: "el-q05-opt4",
        plainText: "העכבות אינן משתנות ע״י משוב; רק ההגבר הכולל נחתך מ-$A$ ל-$\\frac{A}{1+A\\beta}$.",
        isCorrect: false,
        explanation: "שגוי: משוב משנה באופן רדיקלי את עכבות הכניסה והיציאה של המגבר.",
      },
    ],
  },
  {
    id: "el-q06-cmos-inverter-noise-margins-sizing",
    domain: "שער אינוורטר CMOS ומתח המיתוג",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - שער אינוורטר CMOS ואפיון מתח המיתוג ($V_M$)",
    context:
      "באינוורטר CMOS סטנדרטי המורכב מ-NMOS ו-PMOS עם מתחי סף סימטריים $V_{tn} = |V_{tp}| = V_{th}$. מתח המיתוג הלוגי מוגדר בנקודה שבה $V_{in} = V_{out} = V_M$. ניידות האלקטרונים גדולה מניידות החורים: $\\mu_n \\approx 2.5 \\mu_p$.",
    formulaLatex:
      "V_M = \\frac{V_{DD} - |V_{tp}| + \\sqrt{k_n / k_p} V_{tn}}{1 + \\sqrt{k_n / k_p}}, \\quad k = \\mu C_{ox}\\frac{W}{L}",
    instruction:
      "מהו היחס בין רוחב תעלת ה-PMOS לרוחב ה-NMOS ($W_p / W_n$) הנדרש כדי להבטיח אופיין מיתוג סימטרי מושלם ($V_M = V_{DD}/2$) ושולי רעש (Noise Margins) מקסימליים שווים?",
    options: [
      {
        id: "el-q06-opt1",
        plainText: "$\\frac{W_p}{W_n} = 1$ (רוחב זהה לחלוטין לשני הטרנזיסטורים)",
        isCorrect: false,
        explanation:
          "שגוי: אם $W_p = W_n$, מאחר ש-$\\mu_n > \\mu_p$, ה-NMOS יהיה חזק בהרבה מה-PMOS, עקומת ה-VTC תוסט שמאלה, ומתח המיתוג יהיה נמוך מ-$V_{DD}/2$.",
      },
      {
        id: "el-q06-opt2",
        plainText:
          "$\\frac{W_p}{W_n} = \\frac{\\mu_n}{\\mu_p} \\approx 2.5$ (רוחב ה-PMOS מתוכנן להיות רחב פי 2 עד 3 מרוחב ה-NMOS כדי לפצות על הניידות הנמוכה של החורים).",
        mathText: "\\frac{W_p}{W_n} = \\frac{\\mu_n}{\\mu_p}",
        isCorrect: true,
        explanation:
          "נכון: כדי שמתח המיתוג יהיה בדיוק במרכז תחום המתחים $V_M = V_{DD}/2$, נדרש שפרמטרי ההולכה של שני הטרנזיסטורים יהיו שווים: $k_n = k_p \\implies \\mu_n C_{ox} (W/L)_n = \\mu_p C_{ox} (W/L)_p$. בהנחה שאורכי התעלה זהים ($L_n = L_p = L_{min}$), מקבלים: $\\frac{W_p}{W_n} = \\frac{\\mu_n}{\\mu_p}$. בסיליקון, ניידות האלקטרונים גדולה פי 2 עד 3 מניידות החורים (עקב פיזור סריגי שונה). לכן מתכננים את טרנזיסטור ה-PMOS רחב פי 2 עד 3 מטרנזיסטור ה-NMOS, מה שמבטיח זמני עלייה ונפילה שווים ($t_{PLH} \\approx t_{PHL}$) ושולי רעש סימטריים אופטימליים $NM_H \\approx NM_L$.",
      },
      {
        id: "el-q06-opt3",
        plainText: "$\\frac{W_p}{W_n} = \\frac{\\mu_p}{\\mu_n} \\approx 0.4$",
        isCorrect: false,
        explanation: "שגוי: הקטנת ה-PMOS תחליש אותו עוד יותר ותהפוך את ה-Inverter לאיטי ביותר בזמני עלייה.",
      },
      {
        id: "el-q06-opt4",
        plainText: "$\\frac{W_p}{W_n} = \\left(\\frac{\\mu_n}{\\mu_p}\\right)^2 \\approx 6.25$",
        isCorrect: false,
        explanation: "שגוי: התלות בזרם ליניארית ברוחב התעלה $W$ ולכן אין צורך בריבוע היחס.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "el-q07-cmos-power-dissipation-dynamic-static",
    domain: "צריכת הספק במעגלי CMOS דיגיטליים",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - צריכת הספק במעגלי CMOS דיגיטליים",
    context:
      "שער לוגי CMOS מיתוגי מניע עומס קיבולי $C_L$ במתח הזנה $V_{DD}$ ובתדר שעון $f_{clk}$. פעילות המיתוג (Switching Activity) היא $\\alpha$.",
    formulaLatex: "P_{total} = P_{dyn} + P_{sc} + P_{stat} = \\alpha C_L V_{DD}^2 f_{clk} + I_{sc} V_{DD} + I_{leak} V_{DD}",
    instruction: "מהו ההספק הדינמי $P_{dyn}$ הנצרך ע״י השער, ומה קורה לאנרגיה הנמשכת מספק הכוח בכל מחזור טעינה ופריקה של הקבל?",
    options: [
      {
        id: "el-q07-opt1",
        plainText: "ההספק הדינמי הוא $P_{dyn} = \\frac{1}{2} C_L V_{DD}^2 f$, וכל האנרגיה נשמרת בקבל ללא שום הפסדי חום.",
        isCorrect: false,
        explanation: "שגוי: טעינת קבל דרך מתג התנגדותי (PMOS) מבזבזת תמיד בדיוק חצי מהאנרגיה כחום על גבי הטרנזיסטור.",
      },
      {
        id: "el-q07-opt2",
        plainText: "ההספק הדינמי תלוי בריבוע התדר $f_{clk}^2$ ובמתח בחזקה ראשונה.",
        isCorrect: false,
        explanation: "שגוי: ההספק ליניארי בתדר וריבועי במתח ($V_{DD}^2$).",
      },
      {
        id: "el-q07-opt3",
        plainText:
          "בכל מיתוג, ספק הכוח מספק אנרגיה של $E_{supply} = C_L V_{DD}^2$; מחציתה ($\\frac{1}{2}C_L V_{DD}^2$) מתפזרת כחום על ה-PMOS בעת הטעינה, והמחצית השנייה שנאגרה בקבל מתפזרת כחום על ה-NMOS בעת הפריקה, כך ש-$P_{dyn} = \\alpha C_L V_{DD}^2 f_{clk}$.",
        mathText: "P_{dyn} = \\alpha C_L V_{DD}^2 f_{clk}",
        isCorrect: true,
        explanation:
          "נכון: ניתוח אנרגטי קלאסי: בעת מעבר מ-0 ל-1, ה-PMOS נדלק וטוען את קבל העומס ל-$V_{DD}$. המטען הנמשך מהספק הוא $Q = C_L V_{DD}$, ולכן האנרגיה שסיפק מקור המתח היא $E_{supply} = Q V_{DD} = C_L V_{DD}^2$. האנרגיה האלקטרוסטטית שנאגרת בקבל בסיום היא $E_{cap} = \\frac{1}{2}C_L V_{DD}^2$. יתרת האנרגיה, בדיוק $\\frac{1}{2}C_L V_{DD}^2$, מתפזרת בהכרח כחום על תעלת ה-PMOS ללא תלות בהתנגדותו. בעת מעבר מ-1 ל-0, ה-NMOS נדלק ופורק את האנרגיה האגורה בקבל ($\\frac{1}{2}C_L V_{DD}^2$) כחום לאדמה. סך האנרגיה הנצרכת במחזור מיתוג שלם היא $C_L V_{DD}^2$, וההספק הממוצע הוא מכפלתה בפקטור הפעילות ובתדר: $P_{dyn} = \\alpha C_L V_{DD}^2 f_{clk}$.",
      },
      {
        id: "el-q07-opt4",
        plainText: "במעגלי CMOS ההספק הדינמי מתאפס תמיד וקיים רק הספק זליגה סטטי.",
        isCorrect: false,
        explanation: "שגוי: בעבר ההספק הסטטי היה אפסי וכיום שניהם משמעותיים, אך ההספק הדינמי דומיננטי בפעילות מיתוג גבוהה.",
      },
    ],
  },
  {
    id: "el-q08-sequential-timing-setup-hold-violations",
    domain: "תזמון מעגלים ספרתיים (Setup & Hold)",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - תזמון מעגלים ספרתיים (Setup & Hold Time) ואי-ודאות שעון",
    context:
      "במסלול תזמון סינכרוני בין שני דלגלגי D (Flip-Flops), זמן המחזור של השעון הוא $T_{clk}$, עיכוב השעון (Clock Skew) בין הדלגלגים הוא $t_{skew} = t_{clk2} - t_{clk1}$. זמן ההפצה של הלוגיקה הצירופית חסום בין $t_{comb,\\min}$ ל-$t_{comb,\\max}$. זמני הדלגלג הם: זמן שעון-למוצא $t_{cq}$, זמן הכנה $t_{setup}$, וזמן החזקה $t_{hold}$.",
    formulaLatex:
      "T_{clk} \\ge t_{cq} + t_{comb,\\max} + t_{setup} - t_{skew}, \\quad t_{cq} + t_{comb,\\min} \\ge t_{hold} + t_{skew}",
    instruction: "מה מאפיין את ההבדל הקריטי בין הפרת זמן הכנה (Setup Time Violation) לבין הפרת זמן החזקה (Hold Time Violation)?",
    options: [
      {
        id: "el-q08-opt1",
        plainText:
          "הפרת זמן החזקה ניתנת לפתרון פשוט ע״י הורדת תדר השעון של המערכת, בעוד שהפרת זמן הכנה מחייבת תכנון מחדש של הסיליקון.",
        isCorrect: false,
        explanation:
          "שגוי: התוצאה הפוכה בדיוק; Setup תלוי בזמן המחזור $T_{clk}$ ונפתר ע״י האטת השעון, בעוד Hold בלתי תלוי בשעון.",
      },
      {
        id: "el-q08-opt2",
        plainText: "שתי ההפרות תלויות באופן שווה בתדר השעון $f_{clk}$ ונפתרות ע״י שינוי מתח האספקה.",
        isCorrect: false,
        explanation: "שגוי: אי-שוויון Hold אינו מכיל את $T_{clk}$ כלל.",
      },
      {
        id: "el-q08-opt3",
        plainText:
          "הפרת Setup (מסלול ארוך / Max Delay) נגרמת מאיטיות הלוגיקה וניתנת לפתרון בבדיקות Post-Silicon ע״י האטת תדר השעון (הגדלת $T_{clk}$); לעומת זאת, הפרת Hold (מסלול קצר / Race Condition) מתרחשת כשהמידע החדש רץ מהר מדי ודורס את המידע הישן לפני שננעל, אינה תלויה כלל בתדר השעון ($T_{clk}$ אינו מופיע בנוסחה), והיא קטלנית ומחייבת תיקון פיזי של המעגל (הוספת השהיות/Buffers).",
        isCorrect: true,
        explanation:
          "נכון: 1. Setup Time: המידע צריך להגיע ולהתייצב לפני עליית השעון הבאה: $T_{clk} \\ge t_{cq} + t_{comb,\\max} + t_{setup} - t_{skew}$. אם התנאי מופר (המסלול איטי מדי), ניתן תמיד להציל את השבב בפועל ע״י הורדת תדר העבודה (הגדלת $T_{clk}$). 2. Hold Time: המידע המשודר חייב להישאר יציב למשך זמן $t_{hold}$ לאחר עליית השעון: $t_{cq} + t_{comb,\\min} \\ge t_{hold} + t_{skew}$. שימו לב שזמן מחזור השעון $T_{clk}$ אינו מופיע כלל במשוואה! אם המידע מתפשט מהר מדי (למשל כאשר $t_{comb}$ קצר מאוד ויש Skew חיובי), המידע החדש יגיע לדלגלג השני וידרוס את הדגימה של המחזור הנוכחי. זוהי שגיאה פטאלית בסיליקון שאינה ניתנת לתיקון ע״י שינוי תדר השעון ומחייבת ייצור מחדש (Respin) עם הוספת חוצצי השהיה מכוונים.",
      },
      {
        id: "el-q08-opt4",
        plainText: "הפרת Hold מתרחשת אך ורק במעגלים א-סינכרוניים ללא קו שעון.",
        isCorrect: false,
        explanation: "שגוי: Hold Time הוא מושג סינכרוני מובהק המוגדר ביחס לקצה עליית השעון של הדלגלג.",
      },
    ],
  },
  {
    id: "el-q09-data-converters-snr-enob-quantization",
    domain: "ממירי ADC ורעש קוונטיזציה",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - ממירי נתונים אנלוגיים לספרתיים (ADC) ורעש קוונטיזציה",
    context:
      "בממיר ADC אידיאלי בעל $N$ סיביות עם מתח תחום מלא $V_{FS}$, גודל מדרגת הקוונטיזציה הוא $\\Delta = \\frac{V_{FS}}{2^N}$. שגיאת הקוונטיזציה מתפלגת אחיד בין $-\\Delta/2$ ל-$+\\Delta/2$. ממירים אות סינוסואידלי מלא.",
    formulaLatex:
      "\\sigma_e^2 = \\frac{\\Delta^2}{12}, \\quad P_{sig} = \\frac{(V_{FS}/2)^2}{2} = \\frac{V_{FS}^2}{8}, \\quad \\text{SNR} = 10\\log_{10}\\left(\\frac{P_{sig}}{\\sigma_e^2}\\right)",
    instruction: "מהו יחס האות לרעש המקסימלי התאורטי (SNR) ב-dB כפונקציה של מספר הסיביות $N$?",
    options: [
      {
        id: "el-q09-opt1",
        plainText: "$\\text{SNR} = 20 N\\text{ dB}$",
        isCorrect: false,
        explanation: "שגוי: כל סיבית נוספת מוסיפה כ-$6\\text{ dB}$ ולא $20\\text{ dB}$.",
      },
      {
        id: "el-q09-opt2",
        plainText: "$\\text{SNR} = 3.01 N + 1.25\\text{ dB}$",
        isCorrect: false,
        explanation:
          "שגוי: פקטור של $3\\text{ dB}$ מתקבל עבור הכפלת הספק פי 2, אך הכפלת מספר הדרגות ($2^N$) מכפילה את המתח ומקטינה את רעש ההספק פי 4 ($6.02\\text{ dB}$).",
      },
      {
        id: "el-q09-opt3",
        plainText:
          "$\\text{SNR} = 6.02 N + 1.76\\text{ dB}$; כל תוספת של סיבית אחת ($N \\to N+1$) משפרת את ה-SNR ב-$\\approx 6\\text{ dB}$ ומכפילה את הטווח הדינמי פי 2.",
        mathText: "\\text{SNR} = 6.02 N + 1.76\\text{ dB}",
        isCorrect: true,
        explanation:
          "נכון: נפתח את היחס: שונות רעש הקוונטיזציה של התפלגות אחידה ברוחב $\\Delta$ היא $\\sigma_e^2 = \\frac{\\Delta^2}{12} = \\frac{V_{FS}^2}{12 \\cdot 2^{2N}}$. הספק אות סינוס מלא בתחום $[-V_{FS}/2, +V_{FS}/2]$ הוא $P_{signal} = \\frac{(V_{FS}/2)^2}{2} = \\frac{V_{FS}^2}{8}$. יחס האות לרעש: $\\frac{P_{signal}}{\\sigma_e^2} = \\frac{V_{FS}^2 / 8}{V_{FS}^2 / (12 \\cdot 2^{2N})} = \\frac{12}{8} \\cdot 2^{2N} = 1.5 \\cdot 2^{2N}$. במדד לוגריתמי בדציבלים: $\\text{SNR}_{\\text{dB}} = 10\\log_{10}(1.5 \\cdot 2^{2N}) = 10\\log_{10}(1.5) + 20 N \\log_{10}(2) = 1.761 + 20(0.30103)N = 6.02 N + 1.76\\text{ dB}$. זוהי הנוסחה הבסיסית ביותר לאפיון ממירים וקביעת מספר הסיביות האפקטיבי (ENOB).",
      },
      {
        id: "el-q09-opt4",
        plainText: "$\\text{SNR} = 10 N - 3.5\\text{ dB}$",
        isCorrect: false,
        explanation: "שגוי: שימוש בבסיס עשרוני שגוי במקום פקטור $20\\log_{10}(2) \\approx 6.02$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "el-q10-barkhausen-stability-criterion-oscillators",
    domain: "מתנדים הרמוניים וקריטריון ברקהאוזן",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - מתנדים הרמוניים וקריטריון היציבות של ברקהאוזן",
    context: "מעגל מתנד ליניארי מורכב ממגבר בעל הגבר $A(s)$ ורשת משוב בעלת תמסורת $\\beta(s)$ המחוברים בלולאת משוב חיובי.",
    formulaLatex: "T(s) = A(s)\\beta(s), \\quad \\frac{V_{out}}{V_{in}} = \\frac{A(s)}{1 - A(s)\\beta(s)}",
    instruction:
      "מהם שני תנאי ברקהאוזן (Barkhausen Criteria) המדויקים הנדרשים לקיום תנודות הרמוניות יציבות ומתמשכות בתדר התהודה $\\omega_0$?",
    options: [
      {
        id: "el-q10-opt1",
        plainText: "הגבר החוג חייב להיות אפס ($|A\\beta| = 0$), והמופע חייב להיות $90^\\circ$.",
        isCorrect: false,
        explanation: "שגוי: בהגבר חוג אפס אין תנודות כלל והמעגל מת.",
      },
      {
        id: "el-q10-opt2",
        plainText: "הגבר החוג חייב לשאוף לאינסוף ($|A\\beta| \\to \\infty$), והמופע הוא $180^\\circ$.",
        isCorrect: false,
        explanation:
          "שגוי: הגבר אינסופי מייצר נעילה (Latch/Saturation) וריבועים קטומים (כמו במולטיוויברטור), ולא תנודה סינוסואידלית יציבה.",
      },
      {
        id: "el-q10-opt3",
        plainText: "הגבר החוג חייב להיות קטן ממש מ-1 ($|A\\beta| < 1$) כדי למנוע התחממות.",
        isCorrect: false,
        explanation: "שגוי: הגבר קטן מ-1 יגרום לכל תנודה דועכת לדעוך לאפס מוחלט.",
      },
      {
        id: "el-q10-opt4",
        plainText:
          "גודל הגבר החוג הפתוח בתדר התנודה חייב להיות שווה בדיוק ליחידה ($|A(j\\omega_0)\\beta(j\\omega_0)| = 1$), וסך כל הזזת המופע סביב החוג השלם חייבת להיות כפולה שלמה של $360^\\circ$ ($\\angle A(j\\omega_0)\\beta(j\\omega_0) = 2\\pi k = 0^\\circ$).",
        mathText: "|A(j\\omega_0)\\beta(j\\omega_0)| = 1, \\quad \\angle A(j\\omega_0)\\beta(j\\omega_0) = 0^\\circ \\; (\\text{or } 360^\\circ k)",
        isCorrect: true,
        explanation:
          "נכון: כדי שהמעגל ייצר תנודה מתמדת ללא מקור עירור חיצוני ($V_{in} = 0$), מכנה פונקציית התמסורת בחוג סגור חייב להתאפס: $1 - A(s)\\beta(s) = 0 \\implies A(s)\\beta(s) = 1$. הצבת $s = j\\omega_0$ מפרקת דרישה זו לשני תנאי ברקהאוזן: 1. תנאי אמפליטודה: $|A(j\\omega_0)\\beta(j\\omega_0)| = 1$ (הפסדי האנרגיה ברשת המשוב מפוצים בדיוק ע״י הגבר המגבר). 2. תנאי מופע: המופע הכולל סביב החוג הוא $0^\\circ$ (או כפולה של $360^\\circ$), כך שהאות המוחזר מחזק את האות המקורי במשוב חיובי מושלם. (בפועל, בעת אתחול מתוכנן $|A\\beta| > 1$ כדי שהתנודות יצמחו מרעש תרמי, ומנגנון אי-ליניארי מייצב את ההגבר על 1 מדויק ברוויה).",
      },
    ],
  },
  {
    id: "el-q11-opamp-slew-rate-full-power-bandwidth",
    domain: "קצב עלייה ורוחב פס בהספק מלא",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - מגברי שרת, קצב עלייה (Slew Rate) ורוחב פס בהספק מלא",
    context:
      "למגבר שרת (Op-Amp) יש קצב עלייה מרבי (Slew Rate) של $\\text{SR} = 10\\text{ V/}\\mu\\text{s} = 10^7\\text{ V/s}$. המגבר מפיק אות מוצא סינוסואידלי בעל אמפליטודת שיא $V_p = 5\\text{ V}$: $v_{out}(t) = V_p \\sin(2\\pi f t)$.",
    formulaLatex: "\\text{SR} = \\max\\left|\\frac{dv_{out}}{dt}\\right| = 2\\pi f V_p \\implies f_{\\max} = \\frac{\\text{SR}}{2\\pi V_p}",
    instruction:
      "מהו התדר המקסימלי (Full-Power Bandwidth) שבו המגבר יכול לפעול באמפליטודה מלאה זו ללא עיוות צורני הנובע ממגבלת ה-Slew Rate?",
    options: [
      {
        id: "el-q11-opt1",
        plainText: "$f_{\\max} = 2\\text{ MHz}$",
        isCorrect: false,
        explanation: "שגוי: תוצאה מאי-הכללת הפקטור $\\pi$ במכנה (חלוקה ב-$V_p$ בלבד).",
      },
      {
        id: "el-q11-opt2",
        plainText: "$f_{\\max} = 1\\text{ MHz}$",
        isCorrect: false,
        explanation: "שגוי: תדר זה מתאים לאות בעל אמפליטודה נמוכה בהרבה, אך ב-5V המגבר ייכנס לעיוות משולש חריף.",
      },
      {
        id: "el-q11-opt3",
        plainText: "$f_{\\max} = 628\\text{ kHz}$",
        isCorrect: false,
        explanation: "שגוי: תוצאה מחישוב שגוי של קצב השינוי המקסימלי של גל סינוס.",
      },
      {
        id: "el-q11-opt4",
        plainText:
          "$f_{\\max} = \\frac{10 \\times 10^6}{2\\pi \\times 5} \\approx 318.3\\text{ kHz}$ (מעבר לתדר זה הסינוס יתעוות לצורת גל משולש)",
        mathText: "f_{\\max} = \\frac{\\text{SR}}{2\\pi V_p} = \\frac{10^7}{10\\pi} \\approx 318.3\\text{ kHz}",
        isCorrect: true,
        explanation:
          "נכון: קצב השינוי של גל סינוס נתון ע״י הנגזרת: $\\frac{dv_{out}}{dt} = 2\\pi f V_p \\cos(2\\pi f t)$. השיפוע המקסימלי מתקבל במעבר באפס ושווה ל-$(\\frac{dv_{out}}{dt})_{\\max} = 2\\pi f V_p$. מגבלת ה-Slew Rate של מגבר השרת נובעת מהזרם המקסימלי שזרם הזנב יכול לספק לטעינת קבל הפיצוי הפנימי ($I_{tail}/C_c$). כדי שלא יתרחש עיוות, נדרש שקצב שינוי האות לא יעלה על ה-Slew Rate: $2\\pi f V_p \\le \\text{SR} \\implies f \\le \\frac{\\text{SR}}{2\\pi V_p}$. נציב: $f_{\\max} = \\frac{10 \\times 10^6\\text{ V/s}}{2\\pi \\times 5\\text{ V}} = \\frac{10^6}{\\pi} \\approx 318{,}310\\text{ Hz} \\approx 318.3\\text{ kHz}$. אם נזין תדר גבוה יותר, המגבר לא יוכל לעקוב אחר השיפוע והאות יהפוך לגל משולש בעל אמפליטודה מנוחתת.",
      },
    ],
  },
  {
    id: "el-q12-cmos-latchup-parasitic-scr-prevention",
    domain: "תופעת Latch-up ומבנה SCR טפילי",
    title: "מעגלים אלקטרוניים אנלוגיים וספרתיים - תופעת ה-Latch-up ב-CMOS ומבנה SCR טפילי",
    context:
      "בטכנולוגיית CMOS בתפזורת (Bulk CMOS), המבנה הפיזי של טרנזיסטורי NMOS ו-PMOS הממוקמים בסמיכות יוצר מבנה טפילי של ארבע שכבות p-n-p-n הפועל כדיריסטור (Silicon Controlled Rectifier - SCR).",
    formulaLatex: "\\beta_1 (\\text{Q1}_{pnp}) \\times \\beta_2 (\\text{Q2}_{npn}) \\ge 1",
    instruction: "מה גורם להצתת ה-Latch-up המובילה לקצר הרסני בין $V_{DD}$ ל-GND, ואילו שיטות תכן ננקטות למניעתה?",
    options: [
      {
        id: "el-q12-opt1",
        plainText: "חדירת לחות לתוך מארז השבב הגורמת לקורוזיה של פסי האלומיניום.",
        isCorrect: false,
        explanation: "שגוי: Latch-up היא תופעה מוליכת-למחצה פנימית במבנה המצע של הסיליקון ואינה קשורה לקורוזיה.",
      },
      {
        id: "el-q12-opt2",
        plainText: "קרינת UV המאפסת את מטעני ה-Floating Gate בטרנזיסטורי הזיכרון.",
        isCorrect: false,
        explanation: "שגוי: מחיקת UV מאפיינת רכיבי EPROM ישנים ואינה קשורה לקצר ה-Latch-up.",
      },
      {
        id: "el-q12-opt3",
        plainText: "שימוש בתדר שעון נמוך מ-1kHz הגורם להפרת רציפות זרם המשרן.",
        isCorrect: false,
        explanation: "שגוי: Latch-up מוצת ממתחי יתר או קפיצות זרם, ואינו תלוי בתדר שעון נמוך.",
      },
      {
        id: "el-q12-opt4",
        plainText:
          "קפיצות מתח או רעשי מצע מזריקים זרם דרך התנגדויות המצע/הבאר ($R_{sub}, R_{well}$), ממתחים קדימה את הדיודות של הטרנזיסטורים הביפולריים הטפיליים, ומציתים לולאת משוב חיובי עם הגבר חוג $\\beta_1 \\beta_2 \\ge 1$; הפתרון הוא שימוש בטבעות שמירה (Guard Rings), ריבוי מגעים למצע ולבאר (Substrate/Well Taps), או מעבר לטכנולוגיית SOI (Silicon-on-Insulator).",
        isCorrect: true,
        explanation:
          "נכון: במצע CMOS, חיבורי ה-PMOS (בבאר N) וה-NMOS (במצע P) יוצרים שני טרנזיסטורים ביפולריים טפיליים מוצלבים: BJT מסוג PNP ו-BJT מסוג NPN, המחוברים במשוב חיובי. בדרך כלל שניהם כבויים. אולם אם מופיע ספייק של מתח יתר (Undershoot/Overshoot) באחד מפיני ה-I/O או רעש מצע כבד, זורם זרם דרך התנגדות המצע $R_{sub}$ או הבאר $R_{well}$. מפל מתח זה גורם לממתח קדמי בצומת בסיס-פולט של אחד ה-BJTs. הוא נדלק, מזרים זרם לבסיס של ה-BJT השני, שמדליק אותו בחזרה במעגל סגור. אם $\\beta_{pnp} \\times \\beta_{npn} \\ge 1$, המערכת ננעלת (Latch-up) במצב קצר בעל עכבה אפסית בין $V_{DD}$ ל-GND. זרם ענק זורם דרך הסיליקון ושורף את השבב. מניעה: מזעור התנגדויות המצע ע״י שפע Taps, טבעות הגנה Guard Rings הקולטות נושאי מיעוט, או בידוד דיאלקטרי מלא באמצעות שבבי SOI.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_ELECTRONIC_CIRCUITS_QUESTIONS = ELECTRONIC_CIRCUITS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleElectronicCircuitsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = ELECTRONIC_CIRCUITS_QUESTIONS.slice(0, 3);
  const groupB = ELECTRONIC_CIRCUITS_QUESTIONS.slice(3, 6);
  const groupC = ELECTRONIC_CIRCUITS_QUESTIONS.slice(6, 12);

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
