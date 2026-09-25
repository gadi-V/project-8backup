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
/* BAGRUT — Chemistry 5 units (12 authentic items)                             */
/*                                                                            */
/* Contract:                                                                  */
/* - domain: always "CHEMISTRY"                                               */
/* - title: "כימיה - [שם הנושא]" (no exam paper codes)                        */
/* - instruction: short Hebrew only (no embedded formulae)                    */
/* - formulaLatex: reactions / equilibria / calc isolated here                */
/* - options: exactly 4; balanced correct ids (3 of each 1–4 across 12)       */
/* - compounds via mathText; full pedagogical explanation on every option     */
/* -------------------------------------------------------------------------- */

export const BAGRUT_CHEMISTRY_QUESTIONS: DiagnosticQuestion[] = [
  // ================= פרק 1: מבנה וקישור =================
  {
    id: "chem-bonding-boiling-point",
    domain: "CHEMISTRY",
    title: "כימיה - כוחות בין-מולקולריים ונקודת רתיחה",
    context:
      "נתונות חמש המולקולות הבאות: חנקן, אתן, חמצן, מתאנאל (פורמאלדהיד) ואתאן.",
    instruction: "לאיזו מבין המולקולות הבאות נקודת הרתיחה הגבוהה ביותר?",
    formulaLatex:
      "\\text{N}_2, \\quad \\text{C}_2\\text{H}_4, \\quad \\text{O}_2, \\quad \\text{CH}_2\\text{O}, \\quad \\text{C}_2\\text{H}_6",
    options: [
      {
        id: "1",
        plainText: "CH2O (מתאנאל)",
        mathText: "\\text{CH}_2\\text{O}",
        isCorrect: true,
        explanation:
          "המולקולה CH2O היא מולקולה קוטבית בעלת מומנט דיפול קבוע, ולכן בין מולקולותיה פועלות אינטראקציות דיפול-דיפול חזקות (נוסף על כוחות לונדון). שאר המולקולות אינן קוטביות וביניהן פועלים כוחות ונדר-ואלס בלבד, שהם חלשים יותר במולקולות בעלות מסה מולרית דומה.",
      },
      {
        id: "2",
        plainText: "C2H6 (אתאן)",
        mathText: "\\text{C}_2\\text{H}_6",
        isCorrect: false,
        explanation:
          "מסיח: אתאן היא מולקולה לא-קוטבית שבינה פועלים כוחות לונדון בלבד.",
      },
      {
        id: "3",
        plainText: "O2 (חמצן)",
        mathText: "\\text{O}_2",
        isCorrect: false,
        explanation:
          "מסיח: חמצן אינו קוטבי ובעל ענן אלקטרונים קטן יחסית.",
      },
      {
        id: "4",
        plainText: "N2 (חנקן)",
        mathText: "\\text{N}_2",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "chem-acid-base-reaction-form",
    domain: "CHEMISTRY",
    title: "כימיה - ניסוח תגובות חומצה-בסיס במים",
    context:
      "לפניכם ארבעה ניסוחים לתגובות המתרחשות בעת הוספת חומרים שונים למים.",
    instruction: "מהו הניסוח הנכון של תגובת חומצה-בסיס מלאה במים?",
    formulaLatex:
      "\\text{HNO}_{3(l)} + \\text{H}_2\\text{O}_{(l)} \\rightarrow \\text{H}_3\\text{O}^+_{(aq)} + \\text{NO}_3^-_{(aq)}",
    options: [
      {
        id: "1",
        plainText: "HNO3(l) + H2O(l) -> H3O+(aq) + NO3-(aq)",
        mathText:
          "\\text{HNO}_{3(l)} + \\text{H}_2\\text{O}_{(l)} \\rightarrow \\text{H}_3\\text{O}^+_{(aq)} + \\text{NO}_3^-_{(aq)}",
        isCorrect: true,
        explanation:
          "חומצה חנקתית (HNO3) היא חומצה חזקה המוסרת פרוטון (H+) למולקולת מים ליצירת יון הידרוניום ויון חנקה.",
      },
      {
        id: "2",
        plainText: "NH3(g) + H2O(l) -> H3O+(aq) + NH2-(aq)",
        mathText:
          "\\text{NH}_{3(g)} + \\text{H}_2\\text{O}_{(l)} \\rightarrow \\text{H}_3\\text{O}^+_{(aq)} + \\text{NH}_2^-_{(aq)}",
        isCorrect: false,
        explanation:
          "מסיח: אמוניה מתנהגת כבסיס במים וקולטת פרוטון (נוצרים יוני OH- ולא H3O+).",
      },
      {
        id: "3",
        plainText: "HI(g) + H2O(l) -> H2I+(aq) + OH-(aq)",
        mathText:
          "\\text{HI}_{(g)} + \\text{H}_2\\text{O}_{(l)} \\rightarrow \\text{H}_2\\text{I}^+_{(aq)} + \\text{OH}^-_{(aq)}",
        isCorrect: false,
        explanation:
          "מסיח: HI היא חומצה חזקה המוסרת פרוטון למים ולא קולטת אותו.",
      },
      {
        id: "4",
        plainText: "H2SO4(l) + H2O(l) -> H3O+(aq) + SO4-(aq)",
        mathText:
          "\\text{H}_2\\text{SO}_{4(l)} + \\text{H}_2\\text{O}_{(l)} \\rightarrow \\text{H}_3\\text{O}^+_{(aq)} + \\text{SO}_4^-_{(aq)}",
        isCorrect: false,
        explanation:
          "מסיח: תוצר מסירת פרוטון יחיד מחומצה גופרתית הוא יון ביסולפט HSO4- ולא SO4-.",
      },
    ],
  },
  {
    id: "chem-redox-oxidation-states",
    domain: "CHEMISTRY",
    title: "כימיה - דרגות חמצון ותהליכי חמצון-חיזור",
    context:
      "חומרים שונים יכולים לפעול כמחמצנים, כמחזרים או כשניהם בהתאם לדרגות החמצון האפשריות של האטומים המרכיבים אותם.",
    instruction: "מהו ההיגד הנכון לגבי תהליכי חמצון-חיזור?",
    options: [
      {
        id: "1",
        plainText: "האטומים במולקולת פלואור (F2) יכולים לעבור רק תהליך חיזור",
        mathText: "\\text{F}_2",
        isCorrect: true,
        explanation:
          "פלואור הוא היסוד בעל האלקטרושליליות הגבוהה ביותר בטבלה המחזורית. דרגת החמצון שלו במולקולה F2 היא 0, ומאחר שאינו יכול לקבל דרגת חמצון חיובית לעולם, הוא יכול רק לקבל אלקטרון לדרגת חמצון 1- (כלומר לעבור חיזור בלבד).",
      },
      {
        id: "2",
        plainText: "האטומים במולקולת חמצן (O2) יכולים לעבור רק תהליך חיזור",
        mathText: "\\text{O}_2",
        isCorrect: false,
        explanation:
          "מסיח: חמצן ב-O2 (דרגת חמצון 0) יכול לעבור חמצון בתגובה עם פלואור ליצירת OF2 (דרגת חמצון 2+).",
      },
      {
        id: "3",
        plainText: "אטומי המימן במולקולת מים (H2O) יכולים לעבור חמצון או חיזור",
        mathText: "\\text{H}_2\\text{O}",
        isCorrect: false,
        explanation:
          "מסיח: במים דרגת החמצון של מימן היא 1+ (המקסימלית עבורו), ולכן הוא יכול רק להצטמצם (לעבור חיזור).",
      },
      {
        id: "4",
        plainText: "אטומי הגופרית ביון סולפיט (SO3^2-) יכולים לעבור רק חיזור",
        mathText: "\\text{SO}_3^{2-}",
        isCorrect: false,
        explanation:
          "מסיח: דרגת החמצון של גופרית ביון סולפיט היא 4+, ולכן היא יכולה לעבור חמצון ל-6+ או חיזור לערכים נמוכים יותר.",
      },
    ],
  },

  // ================= פרק 2: חומצות ובסיסים וקינטיקה =================
  {
    id: "chem-neutralization-titration-calc",
    domain: "CHEMISTRY",
    title: "כימיה - תגובת סתירה וסטוכיומטריית יונים",
    context:
      'ערבבו 100 מ"ל תמיסת בריום הידרוקסידי Ba(OH)2 בריכוז 0.1M עם 100 מ"ל תמיסה מימית של חומצה. התרחשה תגובת סתירה מלאה ובתום התגובה נמדד pH = 7.',
    instruction: "איזו מן התמיסות הבאות היא תמיסת החומצה ששימשה בניסוי?",
    formulaLatex:
      "V_1 = 100\\text{ mL}, \\; [\\text{Ba(OH)}_2] = 0.1\\text{ M}, \\quad V_2 = 100\\text{ mL}, \\; \\text{pH} = 7",
    options: [
      {
        id: "1",
        plainText: "תמיסת HNO3 בריכוז 0.4M",
        mathText: "0.4\\text{ M } \\text{HNO}_{3(aq)}",
        isCorrect: false,
        explanation:
          'מסיח: תמיסה זו תספק 0.04 מול הידרוניום, כמות כפולה מהנדרש לסתירה מלאה.',
      },
      {
        id: "2",
        plainText: "תמיסת HNO3 בריכוז 0.2M",
        mathText: "0.2\\text{ M } \\text{HNO}_{3(aq)}",
        isCorrect: true,
        explanation:
          'ב-100 מ"ל של Ba(OH)2 בריכוז 0.1M יש 0.01 מול מלח המשחרר 0.02 מול יוני OH-. לסתירה מלאה של 0.02 מול בסיס נדרשים בדיוק 0.02 מול יוני H3O+. עבור חומצה חד-פרוטית בנפח 100 מ"ל, הריכוז הנדרש הוא 0.02 מול חלקי 0.1 ליטר = 0.2M.',
      },
      {
        id: "3",
        plainText: "תמיסת H2SO4 בריכוז 0.4M",
        mathText: "0.4\\text{ M } \\text{H}_2\\text{SO}_{4(aq)}",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "תמיסת H2SO4 בריכוז 0.2M",
        mathText: "0.2\\text{ M } \\text{H}_2\\text{SO}_{4(aq)}",
        isCorrect: false,
        explanation:
          "מסיח: חומצה גופרתית היא דו-פרוטית, ולכן בריכוז 0.2M תספק 0.04 מול הידרוניום.",
      },
    ],
  },
  {
    id: "chem-kinetics-h2o2-rate",
    domain: "CHEMISTRY",
    title: "כימיה - קינטיקה וקצב תגובה",
    context:
      'במבחנה נמצאים 10 מ"ל תמיסת מי חמצן H2O2 בריכוז 0.88M (3%) בטמפרטורת החדר. התגובה הנחקרת היא תגובת הפירוק של מי חמצן.',
    instruction: "איזו מן ההצעות הבאות תגביר את קצב התגובה?",
    formulaLatex:
      "2\\text{H}_2\\text{O}_{2(aq)} \\rightarrow 2\\text{H}_2\\text{O}_{(l)} + \\text{O}_{2(g)}",
    options: [
      {
        id: "1",
        plainText:
          'הכפלת נפח מי החמצן במבחנה ל-20 מ"ל (באותו ריכוז)',
        isCorrect: false,
        explanation:
          "מסיח: שינוי נפח ללא שינוי בריכוז המגיב אינו משנה את תדירות ההתנגשויות ליחידת נפח ולכן אינו משפיע על הקצב.",
      },
      {
        id: "2",
        plainText: "הכפלת ריכוז מי החמצן במבחנה ל-1.76M (6%)",
        mathText: "[\\text{H}_2\\text{O}_2] = 1.76\\text{ M}",
        isCorrect: true,
        explanation:
          "העלאת ריכוז המגיבים בתמיסה הומוגנית מגדילה את צפיפות החלקיקים ליחידת נפח ואת תדירות ההתנגשויות הפוריות ביניהם, מה שמעלה ישירות את קצב התגובה.",
      },
      {
        id: "3",
        plainText: "הורדת טמפרטורת התמיסה במבחנה ל-15 מעלות צלזיוס",
        isCorrect: false,
        explanation:
          "מסיח: הורדת טמפרטורה מקטינה את האנרגיה הקינטית הממוצעת ומאטה את התגובה.",
      },
      {
        id: "4",
        plainText: "הגדלת שטח פני הנוזל על ידי העברה לארלנמייר רחב",
        isCorrect: false,
        explanation:
          "מסיח: בתגובה הומוגנית בנוזל שטח פני הנוזל אינו משפיע על קצב הפירוק הפנימי.",
      },
    ],
  },
  {
    id: "chem-bonding-lewis-resonance",
    domain: "CHEMISTRY",
    title: "כימיה - מבנה לואיס ורזוננס ביון פוספט",
    context:
      "יון מימן זרחתי (HPO4^2-) מורכב מאטום זרחן מרכזי הקשור למימן ולארבעה אטומי חמצן.",
    instruction: "איזו מהקביעות הבאות מתארת בצורה המדויקת ביותר את מבנה היון?",
    formulaLatex: "\\text{HPO}_4^{2-}",
    options: [
      {
        id: "1",
        plainText: "מבנה לואיס בודד ללא רזוננס, גיאומטריה טטרהדרלית",
        isCorrect: false,
        explanation:
          "מסיח: הקשר הכפול אינו מקובע וקיים רזוננס בין אטומי החמצן שאינם קשורים למימן.",
      },
      {
        id: "2",
        plainText:
          "שלושה מבנים רזוננטיביים, מטען פורמלי 0 על הזרחן, וגיאומטריה טטרהדרלית",
        isCorrect: true,
        explanation:
          "במבנה לואיס המועדף לזרחן 5 קשרים (קשר כפול אחד ו-3 קשרים יחידים, כולל קבוצת OH). המטען הפורמלי על הזרחן הוא 0. הקשר הכפול מתחלק ברזוננס בין שלושת החמצנים נטולי המימן (3 מבני רזוננס). סביב הזרחן 4 מוקדי אלקטרונים ולכן הגיאומטריה היא טטרהדרלית.",
      },
      {
        id: "3",
        plainText:
          "שלושה מבנים רזוננטיביים, מטען פורמלי 0, וגיאומטריה של משולש מישורי",
        isCorrect: false,
        explanation: "מסיח הנובע משגיאה בגיאומטריה המרחבית.",
      },
      {
        id: "4",
        plainText:
          "שני מבנים רזוננטיביים, מטען פורמלי (1+), וגיאומטריה טטרהדרלית",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 3: גזים, תרמודינמיקה ושיווי משקל =================
  {
    id: "chem-gases-avogadro-law",
    domain: "CHEMISTRY",
    title: "כימיה - חוק אבוגדרו ונפח גזים",
    context:
      "נתונים שני כלים סגורים, A ו-B, בעלי נפח זהה. כלי A מכיל גז מתאן (CH4) וכלי B מכיל גז חמצן (O2). הטמפרטורה והלחץ שווים בשני הכלים.",
    instruction: "מהו ההיגד הנכון לגבי תכולת שני הכלים?",
    formulaLatex:
      "V_A = V_B, \\quad T_A = T_B, \\quad P_A = P_B, \\quad \\text{CH}_{4(g)} \\text{ vs } \\text{O}_{2(g)}",
    options: [
      {
        id: "1",
        plainText: "המסה של הגז בכלי A שווה למסה של הגז בכלי B",
        isCorrect: false,
        explanation:
          "מסיח: המסה המולרית של O2 כפולה מזו של מתאן, ולכן המסות שונות.",
      },
      {
        id: "2",
        plainText: "מספר המולים של הגז בכלי B כפול ממספר המולים בכלי A",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText:
          "מספר המולקולות של הגז בכלי A שווה למספר המולקולות בכלי B",
        isCorrect: true,
        explanation:
          "לפי חוק אבוגדרו, נפחים שווים של גזים שונים באותם תנאי טמפרטורה ולחץ מכילים מספר שווה של מולים ומולקולות (n_A = n_B, N_A = N_B).",
      },
      {
        id: "4",
        plainText: "המסה של הגז בכלי A כפולה מן המסה של הגז בכלי B",
        isCorrect: false,
        explanation: "מסיח הפוך.",
      },
    ],
  },
  {
    id: "chem-thermo-heating-curve-capacity",
    domain: "CHEMISTRY",
    title: "כימיה - עקומת חימום וקיבול חום סגולי",
    context:
      "נתונה עקומת חימום של חומר המוצק בראשית החימום. החימום מתבצע בקצב קבוע ובלחץ אטמוספרי, ושיפוע העקומה במצב הגזי מתון בהרבה מאשר במצבים האחרים.",
    instruction:
      "על סמך עקומת החימום (טמפרטורה כפונקציה של כמות החום Q), איזה מהמשפטים הבאים נכון בהכרח?",
    formulaLatex: "\\Delta T = \\frac{1}{m \\cdot C} \\cdot Q",
    options: [
      {
        id: "1",
        plainText:
          "קיבול החום של החומר במצב נוזל גבוה מאשר במצבי הצבירה האחרים",
        isCorrect: false,
        explanation:
          "מסיח: בנוזל השיפוע הוא התלול ביותר ולכן קיבול החום בו הוא הקטן ביותר.",
      },
      {
        id: "2",
        plainText: "קיבול החום של החומר קבוע עבור שלושת מצבי הצבירה",
        isCorrect: false,
        explanation: "מסיח: השיפועים שונים ולכן קיבולי החום שונים.",
      },
      {
        id: "3",
        plainText:
          "קיבול החום של החומר במצב גז גבוה מאשר במצבי הצבירה האחרים",
        isCorrect: true,
        explanation:
          "השיפוע של גרף טמפרטורה כפונקציה של כמות חום שווה ל-1 חלקי (m*C). שיפוע מתון יותר מעיד על קיבול חום (C) גבוה יותר, שכן נדרשת כמות אנרגיה רבה יותר כדי להעלות את הטמפרטורה במעלה אחת.",
      },
      {
        id: "4",
        plainText: "קיבול החום של החומר במצב מוצק הוא הגבוה ביותר",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },
  {
    id: "chem-acid-base-salt-ph-calc",
    domain: "CHEMISTRY",
    title: "כימיה - חישוב pH של תמיסת מלח חומצי",
    context:
      "אמוניום חנקתי NH4NO3 הוא מלח הנוצר מחומצה חזקה ובסיס חלש ומתפרק בתמיסה. נתונה תמיסה בריכוז 0.9M וקבוע הבסיס של אמוניה.",
    instruction: "מהו ה-pH של תמיסת האמוניום החנקתי?",
    formulaLatex:
      "[\\text{NH}_4\\text{NO}_3] = 0.9\\text{ M}, \\quad K_b(\\text{NH}_3) = 1.8 \\times 10^{-5}",
    options: [
      {
        id: "1",
        plainText: "pH = 10.71",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב מוטעה של תמיסה בסיסית במקום חומצית.",
      },
      {
        id: "2",
        plainText: "pH = 2.40",
        isCorrect: false,
        explanation: "מסיח הנובע מהנחת פירוק מלא של חומצה חזקה.",
      },
      {
        id: "3",
        plainText: "pH = 4.65",
        mathText: "\\text{pH} = 4.65",
        isCorrect: true,
        explanation:
          "קבוע החומצה של יון האמוניום הוא Ka = Kw / Kb = 10^-14 / (1.8*10^-5) = 5.56*10^-10. ריכוז ההידרוניום הוא sqrt(Ka * C) = sqrt(5.56*10^-10 * 0.9) = 2.24*10^-5 M. חישוב ה-pH נותן: -log(2.24*10^-5) = 4.65.",
      },
      {
        id: "4",
        plainText: "pH = 3.65",
        isCorrect: false,
        explanation: "מסיח.",
      },
    ],
  },

  // ================= פרק 4: סטוכיומטריה וחמצון-חיזור =================
  {
    id: "chem-stoich-alcl3-ions",
    domain: "CHEMISTRY",
    title: "כימיה - המסה ומספר מולי יונים בתמיסה",
    context:
      "תמיסה מימית של אלומיניום כלורי AlCl3 מכילה 2.67 גרם מומס. המסה המולרית של AlCl3 היא 133.5 גרם למול.",
    instruction: "מהו מספר המולים הכולל של היונים בתמיסה?",
    formulaLatex:
      "m = 2.67\\text{ g}, \\quad M_w(\\text{AlCl}_3) = 133.5\\text{ g/mol}, \\quad \\text{AlCl}_{3(s)} \\xrightarrow{\\text{H}_2\\text{O}} \\text{Al}^{3+}_{(aq)} + 3\\text{Cl}^-_{(aq)}",
    options: [
      {
        id: "1",
        plainText: "0.02 מול יונים",
        isCorrect: false,
        explanation:
          "מסיח הנובע מחישוב מולי המלח בלבד ללא הכפלה במספר היונים.",
      },
      {
        id: "2",
        plainText: "0.04 מול יונים",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "0.06 מול יונים",
        isCorrect: false,
        explanation: "מסיח הנובע מחישוב יוני הכלוריד בלבד.",
      },
      {
        id: "4",
        plainText: "0.08 מול יונים",
        mathText: "n_{\\text{ions}} = 0.08\\text{ mol}",
        isCorrect: true,
        explanation:
          "מספר מולי המלח המומס הוא 2.67 חלקי 133.5 = 0.02 מול. כל מול של AlCl3 מתפרק במים ל-1 יון אלומיניום ו-3 יוני כלוריד (סך הכול 4 מולי יונים לכל מול מלח). לכן סך כל מולי היונים הוא 0.02 כפול 4 = 0.08 מול.",
      },
    ],
  },
  {
    id: "chem-redox-observation-vs-interpretation",
    domain: "CHEMISTRY",
    title: "כימיה - תצפית מול פירוש ברמה המיקרוסקופית",
    context:
      "תלמידים הכניסו פס מגנזיום Mg למבחנה המכילה תמיסת יוני הידרוניום H3O+, והתרחשה תגובה פולטת חום שבה נפלט גז מימן והפס התמוסס.",
    instruction: "איזה מן המשפטים הבאים אינו מתאר תצפית במהלך הניסוי?",
    formulaLatex:
      "\\text{Mg}_{(s)} + 2\\text{H}_3\\text{O}^+_{(aq)} \\rightarrow \\text{H}_{2(g)} + \\text{Mg}^{2+}_{(aq)} + 2\\text{H}_2\\text{O}_{(l)} \\quad (\\Delta H^0 < 0)",
    options: [
      {
        id: "1",
        plainText: "יש פליטת בועות גז במגע בין הפס לתמיסה",
        isCorrect: false,
        explanation: "זוהי תצפית מאקרוסקופית ישירה באמצעות חוש הראייה.",
      },
      {
        id: "2",
        plainText: "כאשר מחזיקים במבחנה חשים שהיא מתחממת",
        isCorrect: false,
        explanation: "זוהי תצפית מאקרוסקופית ישירה באמצעות חוש המישוש.",
      },
      {
        id: "3",
        plainText: "פס המגנזיום הולך וקטן בהדרגה",
        isCorrect: false,
        explanation: "זוהי תצפית מאקרוסקופית ישירה.",
      },
      {
        id: "4",
        plainText: "אלקטרונים עוברים מאטומי המגנזיום אל יוני ההידרוניום",
        isCorrect: true,
        explanation:
          "מעבר אלקטרונים הוא הסבר תיאורטי ברמה המיקרוסקופית (פירוש/הסבר) ולא תצפית שניתן לקלוט ישירות בחושים.",
      },
    ],
  },
  {
    id: "chem-stoich-combustion-limiting-stp",
    domain: "CHEMISTRY",
    title: "כימיה - סטוכיומטריית שריפה וגורם מגביל ב-STP",
    context:
      "בכלי נסגר 1.6 מול פרופאן וכמות לא ידועה של חמצן. לאחר תום תגובת השריפה המלאה נמדדו 13.62 ליטרים של אדי מים בתנאי תקן STP (שבהם נפח מולרי של גז הוא 22.7 ליטר למול).",
    instruction:
      "כמה מולים של חמצן היו בכלי בתחילת התגובה בהנחה שהוא היה הגורם המגביל?",
    formulaLatex:
      "\\text{C}_3\\text{H}_{8(g)} + 5\\text{O}_{2(g)} \\rightarrow 3\\text{CO}_{2(g)} + 4\\text{H}_2\\text{O}_{(g)}",
    options: [
      {
        id: "1",
        plainText: "1.60 מול חמצן",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "2",
        plainText: "2.00 מול חמצן",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "3",
        plainText: "2.40 מול חמצן",
        isCorrect: false,
        explanation: "מסיח.",
      },
      {
        id: "4",
        plainText: "0.75 מול חמצן",
        mathText: "n(\\text{O}_2) = 0.75\\text{ mol}",
        isCorrect: true,
        explanation:
          "מספר מולי המים שנוצרו הוא 13.62 ליטר חלקי 22.7 ליטר למול = 0.60 מול מים. לפי היחס הסטוכיומטרי המאוזן, על כל 5 מולי חמצן נוצרים 4 מולי מים. לכן כמות החמצן שהגיבה היא 0.60 כפול (5/4) = 0.75 מול. מאחר שהחמצן היה הגורם המגביל, זוהי בדיוק כמותו ההתחלתית.",
      },
    ],
  },
];
