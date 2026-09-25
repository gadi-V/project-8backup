import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic כימיה כללית diagnostic bank (12Q).
 * Display name: "כימיה כללית" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const GENERAL_CHEMISTRY_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "gchem-q01-stoichiometry-limiting-reagent-yield",
    domain: "סטויכיומטריה",
    title: "כימיה כללית - סטויכיומטריה ומגיב מגביל",
    context:
      "בתגובה $2\\,\\mathrm{Al} + 3\\,\\mathrm{Cl}_2 \\rightarrow 2\\,\\mathrm{AlCl}_3$ מערבבים $0.400\\text{ mol}$ אלומיניום עם $0.500\\text{ mol}$ כלור. נדרש לזהות את המגיב המגביל ולחשב את כמות התוצר המקסימלית התאורטית.",
    formulaLatex:
      "n_{\\mathrm{AlCl}_3}^{\\max} = \\min\\!\\left(\\frac{n_{\\mathrm{Al}}}{2},\\,\\frac{n_{\\mathrm{Cl}_2}}{3}\\right)\\times 2",
    instruction:
      "מי המגיב המגביל, ומהי כמות $\\mathrm{AlCl}_3$ המקסימלית שניתן לקבל (במול)?",
    options: [
      {
        id: "gchem-q01-opt1",
        plainText:
          "$\\mathrm{Cl}_2$ מגביל; $n_{\\mathrm{AlCl}_3} = \\frac{2}{3}\\times 0.500 = 0.333\\text{ mol}$. יחס הסטויכיומטריה דורש $3\\text{ mol}$ כלור לכל $2\\text{ mol}$ אלומיניום, ולכן $0.500\\text{ mol}$ כלור מספיקים רק ל-$0.333\\text{ mol}$ תוצר, בעוד $0.400\\text{ mol}$ אלומיניום היו יכולים לתת $0.400\\text{ mol}$ תוצר.",
        mathText:
          "n_{\\mathrm{AlCl}_3} = \\frac{2}{3}\\times 0.500 = 0.333\\text{ mol}",
        isCorrect: true,
        explanation:
          "נכון: מחשבים יחסי צריכה לפי המקדמים. עבור האלומיניום: $0.400/2 = 0.200$ 'יחידות תגובה'; עבור הכלור: $0.500/3 \\approx 0.167$. היחידה הקטנה יותר שייכת לכלור, ולכן $\\mathrm{Cl}_2$ הוא המגיב המגביל. כמות התוצר: $n_{\\mathrm{AlCl}_3} = 2 \\times (0.500/3) = 1/3 \\approx 0.333\\text{ mol}$. האלומיניום העודף נותר: $0.400 - 2\\times(0.500/3) = 0.067\\text{ mol}$.",
      },
      {
        id: "gchem-q01-opt2",
        plainText:
          "$\\mathrm{Al}$ מגביל; $n_{\\mathrm{AlCl}_3} = 0.400\\text{ mol}$, כי מספר המולים של אלומיניום קטן יותר מזה של כלור.",
        isCorrect: false,
        explanation:
          "שגוי: השוואת מולים גולמית מתעלמת ממקדמי הסטויכיומטריה. נדרשים $1.5$ מול $\\mathrm{Cl}_2$ לכל מול $\\mathrm{Al}$, ולכן הכלור נגמר לפני האלומיניום למרות שיש לו יותר מולים מוחלטים.",
      },
      {
        id: "gchem-q01-opt3",
        plainText:
          "שני המגיבים נגמרים יחד; $n_{\\mathrm{AlCl}_3} = 0.450\\text{ mol}$ (ממוצע אריתמטי של כמויות המוצא).",
        isCorrect: false,
        explanation:
          "שגוי: תגובה אינה 'ממוצעת' כמויות. המגיבים נגמרים יחד רק ביחס הסטויכיומטרי המדויק $2:3$; כאן $0.400:0.500 = 4:5 \\neq 2:3$.",
      },
      {
        id: "gchem-q01-opt4",
        plainText:
          "$\\mathrm{Cl}_2$ מגביל; $n_{\\mathrm{AlCl}_3} = 0.500\\text{ mol}$ כי יחס התוצר לכלור הוא $1:1$.",
        isCorrect: false,
        explanation:
          "שגוי: לפי המשוואה המאוזנת $3\\,\\mathrm{Cl}_2 \\rightarrow 2\\,\\mathrm{AlCl}_3$, היחס הוא $2/3$ ולא $1$. לכן $0.500\\text{ mol}$ כלור נותנים $0.333\\text{ mol}$ תוצר, לא $0.500$.",
      },
    ],
  },
  {
    id: "gchem-q02-acid-base-weak-acid-ka-ph",
    domain: "שיווי משקל חומצה–בסיס",
    title: "כימיה כללית - שיווי משקל חומצה–בסיס וקבוע $K_a$",
    context:
      "חומצה חלשה חד-פרוטית $\\mathrm{HA}$ בריכוז התחלתי $C = 0.100\\text{ M}$ בעלת $K_a = 1.8\\times 10^{-5}$. מניחים קירוב $\\alpha \\ll 1$ (דיסוציאציה חלקית קטנה).",
    formulaLatex:
      "K_a = \\frac{[\\mathrm{H}^+][\\mathrm{A}^-]}{[\\mathrm{HA}]} \\approx \\frac{x^2}{C}, \\quad [\\mathrm{H}^+] \\approx \\sqrt{K_a C}",
    instruction:
      "מהו $[\\mathrm{H}^+]$ בקירוב הסטנדרטי, ומהו ה-$\\mathrm{pH}$ של התמיסה?",
    options: [
      {
        id: "gchem-q02-opt1",
        plainText:
          "$[\\mathrm{H}^+] \\approx \\sqrt{(1.8\\times 10^{-5})(0.100)} = \\sqrt{1.8\\times 10^{-6}} \\approx 1.34\\times 10^{-3}\\text{ M}$, ולכן $\\mathrm{pH} \\approx 2.87$. הקירוב תקף כי $\\alpha = x/C \\approx 1.3\\%$ קטן מ-$5\\%$.",
        mathText:
          "[\\mathrm{H}^+] \\approx \\sqrt{K_a C} \\approx 1.34\\times 10^{-3},\\; \\mathrm{pH}\\approx 2.87",
        isCorrect: true,
        explanation:
          "נכון: מתוך $K_a = x^2/(C-x)\\approx x^2/C$ מתקבל $x = \\sqrt{K_a C} = \\sqrt{1.8\\times 10^{-6}} \\approx 1.34\\times 10^{-3}\\text{ M}$. $\\mathrm{pH} = -\\log(1.34\\times 10^{-3}) \\approx 2.87$. בדיקת קירוב: $x/C = 0.0134 < 0.05$, ולכן הזנחת $x$ במכנה מוצדקת. אין צורך בנוסחת השורשים המדויקת כאן.",
      },
      {
        id: "gchem-q02-opt2",
        plainText:
          "$[\\mathrm{H}^+] = K_a = 1.8\\times 10^{-5}\\text{ M}$, ולכן $\\mathrm{pH} = 4.74$.",
        isCorrect: false,
        explanation:
          "שגוי: $K_a$ הוא קבוע שיווי משקל חסר יחידות ריכוז פשוטות; הוא אינו שווה ל-$[\\mathrm{H}^+]$. הערך $4.74$ הוא $\\mathrm{p}K_a$, לא $\\mathrm{pH}$ של תמיסת החומצה הטהורה.",
      },
      {
        id: "gchem-q02-opt3",
        plainText:
          "$[\\mathrm{H}^+] = C = 0.100\\text{ M}$, ולכן $\\mathrm{pH} = 1.00$, כי כל מולקולת $\\mathrm{HA}$ מתפרקת.",
        isCorrect: false,
        explanation:
          "שגוי: הנחה זו נכונה רק לחומצות חזקות ($\\alpha \\approx 1$). עבור $K_a = 1.8\\times 10^{-5}$ הדיסוציאציה חלקית מאוד.",
      },
      {
        id: "gchem-q02-opt4",
        plainText:
          "$[\\mathrm{H}^+] = K_a / C = 1.8\\times 10^{-4}\\text{ M}$, ולכן $\\mathrm{pH} \\approx 3.74$.",
        isCorrect: false,
        explanation:
          "שגוי: הביטוי $K_a/C$ אינו נובע ממשוואת שיווי המשקל. הנכון הוא $[\\mathrm{H}^+]\\approx\\sqrt{K_a C}$, לא מנה לינארית.",
      },
    ],
  },
  {
    id: "gchem-q03-thermo-gibbs-spontaneity",
    domain: "תרמודינמיקה של תגובות",
    title: "כימיה כללית - תרמודינמיקה של תגובות ו-$\\Delta G$",
    context:
      "לתגובה כימית בלחץ קבוע נתונים $\\Delta H^\\circ = +55.0\\text{ kJ}\\,\\mathrm{mol}^{-1}$ ו-$\\Delta S^\\circ = +150\\text{ J}\\,\\mathrm{K}^{-1}\\,\\mathrm{mol}^{-1}$. הטמפרטורה $T = 400\\text{ K}$.",
    formulaLatex:
      "\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ, \\quad K = e^{-\\Delta G^\\circ / RT}",
    instruction:
      "מהו $\\Delta G^\\circ$ ב-$400\\text{ K}$, והאם התגובה ספונטנית בתנאים סטנדרטיים בטמפרטורה זו?",
    options: [
      {
        id: "gchem-q03-opt1",
        plainText:
          "$\\Delta G^\\circ = 55.0 - 400\\times 0.150 = -5.0\\text{ kJ}\\,\\mathrm{mol}^{-1} < 0$; התגובה ספונטנית בתנאים סטנדרטיים כי התועלת האנטרופית $T\\Delta S$ גוברת על האנדותרמיות. זו תגובה אנדותרמית הנעשית ספונטנית בטמפרטורה גבוהה מספיק ($T > \\Delta H/\\Delta S$).",
        mathText:
          "\\Delta G^\\circ = -5.0\\text{ kJ}\\,\\mathrm{mol}^{-1} < 0",
        isCorrect: true,
        explanation:
          "נכון: יש להמיר יחידות — $\\Delta S^\\circ = 0.150\\text{ kJ}\\,\\mathrm{K}^{-1}\\,\\mathrm{mol}^{-1}$. אז $\\Delta G^\\circ = 55.0 - 400\\times 0.150 = 55.0 - 60.0 = -5.0\\text{ kJ}\\,\\mathrm{mol}^{-1}$. מאחר ש-$\\Delta G^\\circ < 0$, $K > 1$ והתגובה נוטה לתוצרים בתנאים סטנדרטיים. טמפרטורת המעבר: $T^* = \\Delta H/\\Delta S = 55/0.150 \\approx 367\\text{ K}$; מעל $T^*$ התגובה ספונטנית.",
      },
      {
        id: "gchem-q03-opt2",
        plainText:
          "$\\Delta G^\\circ = +55.0\\text{ kJ}\\,\\mathrm{mol}^{-1}$; התגובה אינה ספונטנית כי $\\Delta H > 0$ תמיד קובע.",
        isCorrect: false,
        explanation:
          "שגוי: ספונטניות נקבעת ע״י $\\Delta G$, לא ע״י $\\Delta H$ לבדו. תגובות אנדותרמיות עם $\\Delta S > 0$ יכולות להיות ספונטניות בחום גבוה (כמו המסת קרח ב-$T>0^\\circ\\mathrm{C}$).",
      },
      {
        id: "gchem-q03-opt3",
        plainText:
          "$\\Delta G^\\circ = 55.0 - 400\\times 150 = -59945\\text{ kJ}\\,\\mathrm{mol}^{-1}$; ערך אבסורדי אך פורמלית שלילי.",
        isCorrect: false,
        explanation:
          "שגוי: זו טעות יחידות קלאסית — הכפלת $T$ ב-$\\Delta S$ ב-$\\mathrm{J}$ במקום $\\mathrm{kJ}$ מגדילה את האיבר בפקטור $1000$ ומייצרת תוצאה חסרת משמעות פיזיקלית.",
      },
      {
        id: "gchem-q03-opt4",
        plainText:
          "$\\Delta G^\\circ = +5.0\\text{ kJ}\\,\\mathrm{mol}^{-1}$; התגובה אינה ספונטנית כי הסימן של $\\Delta G$ הפוך לסימן של $\\Delta S$.",
        isCorrect: false,
        explanation:
          "שגוי: החישוב הנכון נותן $-5.0$ ולא $+5.0$. בנוסף, אין כלל ש-$\\Delta G$ ו-$\\Delta S$ חייבים להיות באותו סימן; הם מקושרים דרך $\\Delta H - T\\Delta S$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "gchem-q04-kinetics-integrated-second-order",
    domain: "קינטיקה",
    title: "כימיה כללית - קינטיקה ומשוואה אינטגרלית מסדר שני",
    context:
      "תגובה $2\\mathrm{A} \\rightarrow$ תוצרים מתנהגת כמסדר שני ביחס ל-$\\mathrm{A}$: $-\\frac{d[\\mathrm{A}]}{dt} = k[\\mathrm{A}]^2$. הריכוז ההתחלתי $[\\mathrm{A}]_0 = 0.200\\text{ M}$, ו-$k = 0.500\\text{ M}^{-1}\\,\\mathrm{s}^{-1}$.",
    formulaLatex:
      "\\frac{1}{[\\mathrm{A}]} - \\frac{1}{[\\mathrm{A}]_0} = kt, \\quad t_{1/2} = \\frac{1}{k[\\mathrm{A}]_0}",
    instruction:
      "מהו זמן מחצית החיים $t_{1/2}$, ומהו $[\\mathrm{A}]$ לאחר $t = 10.0\\text{ s}$?",
    options: [
      {
        id: "gchem-q04-opt1",
        plainText:
          "$t_{1/2} = \\ln 2 / k = 1.39\\text{ s}$; $[\\mathrm{A}] = [\\mathrm{A}]_0 e^{-kt} = 0.0013\\text{ M}$.",
        isCorrect: false,
        explanation:
          "שגוי: נוסחאות אלו שייכות לסדר ראשון. בסדר שני $t_{1/2}$ תלוי בריכוז ההתחלתי, והדעיכה אינה אקספוננציאלית.",
      },
      {
        id: "gchem-q04-opt2",
        plainText:
          "$t_{1/2} = 1/(k[\\mathrm{A}]_0) = 1/(0.500\\times 0.200) = 10.0\\text{ s}$; לאחר $10.0\\text{ s}$ מתקבל $[\\mathrm{A}] = 0.100\\text{ M}$. מהמשוואה האינטגרלית: $1/[\\mathrm{A}] = 1/0.200 + 0.500\\times 10 = 10.0$, כלומר $[\\mathrm{A}] = 0.100\\text{ M}$.",
        mathText:
          "t_{1/2}=10.0\\text{ s},\\; [\\mathrm{A}](10\\text{ s})=0.100\\text{ M}",
        isCorrect: true,
        explanation:
          "נכון: למסדר שני $t_{1/2} = 1/(k[\\mathrm{A}]_0) = 10.0\\text{ s}$ — זהה בדיוק לזמן הנשאל, ולכן הריכוז יורד לחצי: $0.100\\text{ M}$. אימות במשוואה האינטגרלית: $1/[\\mathrm{A}] = 5.00 + 5.00 = 10.0 \\Rightarrow [\\mathrm{A}] = 0.100\\text{ M}$. שימו לב שכל מחצית חיים הבאה ארוכה יותר כי $[\\mathrm{A}]$ קטן.",
      },
      {
        id: "gchem-q04-opt3",
        plainText:
          "$t_{1/2} = [\\mathrm{A}]_0/(2k) = 0.200\\text{ s}$; $[\\mathrm{A}] = 0$ לאחר $10\\text{ s}$.",
        isCorrect: false,
        explanation:
          "שגוי: הביטוי $[\\mathrm{A}]_0/(2k)$ אינו $t_{1/2}$ של סדר שני. בנוסף, ריכוז לעולם אינו מגיע לאפס בזמן סופי לפי חוק הקצב הזה.",
      },
      {
        id: "gchem-q04-opt4",
        plainText:
          "$t_{1/2}$ בלתי תלוי ב-$[\\mathrm{A}]_0$ ושווה ל-$2.00\\text{ s}$; $[\\mathrm{A}] = 0.050\\text{ M}$ אחרי $10\\text{ s}$.",
        isCorrect: false,
        explanation:
          "שגוי: אי-תלות של $t_{1/2}$ בריכוז מאפיינת סדר ראשון בלבד. בסדר שני $t_{1/2}\\propto 1/[\\mathrm{A}]_0$.",
      },
    ],
  },
  {
    id: "gchem-q05-electrochemistry-nernst-cell-potential",
    domain: "אלקטרוכימיה",
    title: "כימיה כללית - אלקטרוכימיה ומשוואת נרנסט",
    context:
      "תא גלווני: $\\mathrm{Zn}|\\mathrm{Zn}^{2+}(0.010\\text{ M})\\|\\mathrm{Cu}^{2+}(1.0\\text{ M})|\\mathrm{Cu}$. נתון $E^\\circ_{\\mathrm{cell}} = 1.10\\text{ V}$ ב-$25^\\circ\\mathrm{C}$, ומספר האלקטרונים $n = 2$.",
    formulaLatex:
      "E = E^\\circ - \\frac{0.0592}{n}\\log Q, \\quad Q = \\frac{[\\mathrm{Zn}^{2+}]}{[\\mathrm{Cu}^{2+}]}",
    instruction:
      "מהו פוטנציאל התא $E$ בתנאים אלה?",
    options: [
      {
        id: "gchem-q05-opt1",
        plainText:
          "$E = 1.10 - \\frac{0.0592}{2}\\log(100) = 1.10 - 0.0592 = 1.04\\text{ V}$.",
        isCorrect: false,
        explanation:
          "שגוי: $Q = [\\mathrm{Zn}^{2+}]/[\\mathrm{Cu}^{2+}] = 0.010/1.0 = 0.010$, לא $100$. הלוגריתם של $100$ הופך את כיוון תיקון נרנסט.",
      },
      {
        id: "gchem-q05-opt2",
        plainText:
          "$E = 1.10 - \\frac{0.0592}{2}\\log(0.010) = 1.10 - 0.0296\\times(-2) = 1.10 + 0.0592 = 1.16\\text{ V}$. ריכוז נמוך של $\\mathrm{Zn}^{2+}$ (תוצר החמצון) דוחף את שיווי המשקל לכיוון התוצרים ומגדיל את $E$.",
        mathText: "E = 1.16\\text{ V}",
        isCorrect: true,
        explanation:
          "נכון: $Q = 0.010/1.0 = 10^{-2}$. $\\log Q = -2$, ולכן $-\\frac{0.0592}{2}(-2) = +0.0592$. מתקבל $E = 1.10 + 0.0592 = 1.1592 \\approx 1.16\\text{ V}$. פירוש: יחס ריכוזים שמקטין את $Q$ מעלה את כוח הדחיפה של התגובה הספונטנית לפי לה שטלייה.",
      },
      {
        id: "gchem-q05-opt3",
        plainText:
          "$E = E^\\circ = 1.10\\text{ V}$ תמיד, כי פוטנציאל תלוי רק בזהות האלקטרודות.",
        isCorrect: false,
        explanation:
          "שגוי: $E^\\circ$ מוגדר לריכוזים סטנדרטיים ($1\\text{ M}$ או פעילות $1$). שינוי ריכוזים משנה את $E$ לפי נרנסט.",
      },
      {
        id: "gchem-q05-opt4",
        plainText:
          "$E = 1.10 - \\frac{0.0592}{2}\\log(0.010) = 1.10 - 0.0592 = 1.04\\text{ V}$ (שכחה שהלוגריתם שלילי).",
        isCorrect: false,
        explanation:
          "שגוי: $\\log(0.010) = -2$; הזנחת הסימן מחסירה במקום להוסיף $0.0592$ ונותנת תוצאה הפוכה.",
      },
    ],
  },
  {
    id: "gchem-q06-atomic-structure-quantum-numbers",
    domain: "מבנה אטומי",
    title: "כימיה כללית - מבנה אטומי ומספרים קוונטיים",
    context:
      "אלקטרון באטום המימן נמצא באורביטל המתואר ע״י המספרים הקוונטיים $n$, $\\ell$, $m_\\ell$, $m_s$. נדרש לזהות סט חוקי עבור אורביטל $3d$.",
    formulaLatex:
      "n = 1,2,3,\\ldots;\\; \\ell = 0,\\ldots,n-1;\\; m_\\ell = -\\ell,\\ldots,+\\ell;\\; m_s = \\pm\\tfrac{1}{2}",
    instruction:
      "איזה סט מספרים קוונטיים חוקי עבור אלקטרון באורביטל $3d$?",
    options: [
      {
        id: "gchem-q06-opt1",
        plainText: "$n=3,\\;\\ell=3,\\;m_\\ell=0,\\;m_s=+\\tfrac{1}{2}$ (אורביטל $3f$).",
        isCorrect: false,
        explanation:
          "שגוי: עבור $n=3$ המקסימום הוא $\\ell = n-1 = 2$. אורביטלי $f$ ($\\ell=3$) מופיעים רק מ-$n\\ge 4$. בנוסף, $3d$ דורש $\\ell=2$, לא $3$.",
      },
      {
        id: "gchem-q06-opt2",
        plainText:
          "$n=3,\\;\\ell=2,\\;m_\\ell=-1,\\;m_s=-\\tfrac{1}{2}$. כאן $\\ell=2$ מתאים לתת-קליפה $d$, ו-$m_\\ell=-1$ הוא אחד מחמשת האורביטלים $d$ האפשריים ($m_\\ell=-2,-1,0,+1,+2$).",
        mathText: "n=3,\\;\\ell=2,\\;m_\\ell=-1,\\;m_s=-1/2",
        isCorrect: true,
        explanation:
          "נכון: תת-קליפה $d$ מוגדרת ע״י $\\ell=2$. עבור $n=3$ זה חוקי ($\\ell\\le 2$). $m_\\ell$ חייב להיות בטווח $\\{-2,-1,0,1,2\\}$, ו-$m_s=\\pm 1/2$. הסט הנתון מקיים את כל האילוצים ומתאר אלקטרון באחד מאורביטלי $3d$.",
      },
      {
        id: "gchem-q06-opt3",
        plainText: "$n=3,\\;\\ell=2,\\;m_\\ell=+3,\\;m_s=+\\tfrac{1}{2}$.",
        isCorrect: false,
        explanation:
          "שגוי: עבור $\\ell=2$, $|m_\\ell|\\le 2$. הערך $m_\\ell=+3$ בלתי אפשרי; הוא היה דורש לפחות $\\ell=3$.",
      },
      {
        id: "gchem-q06-opt4",
        plainText: "$n=2,\\;\\ell=2,\\;m_\\ell=0,\\;m_s=+\\tfrac{1}{2}$.",
        isCorrect: false,
        explanation:
          "שגוי: כאשר $n=2$, $\\ell$ המקסימלי הוא $1$ (אורביטלי $2p$). אין אורביטלי $2d$; הראשונים מסוג $d$ הם $3d$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "gchem-q07-bonding-vsepr-hybridization",
    domain: "קשר כימי",
    title: "כימיה כללית - קשר כימי, VSEPR והיברידיזציה",
    context:
      "מולקולת $\\mathrm{SF}_4$ כוללת אטום גופרית מרכזי עם ארבעה קשרי $\\mathrm{S–F}$ וזוג אלקטרונים לא-קושר אחד. נדרש לחזות גיאומטריה והיברידיזציה.",
    formulaLatex:
      "\\text{SN} = \\text{קשרים} + \\text{זוגות לא-קושרים} = 5 \\Rightarrow sp^3d",
    instruction:
      "מהי הגיאומטריה המולקולרית של $\\mathrm{SF}_4$ ומהי ההיברידיזציה של הגופרית?",
    options: [
      {
        id: "gchem-q07-opt1",
        plainText:
          "טטרהדרלית ($T_d$) עם היברידיזציה $sp^3$, כי יש ארבעה קשרים בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ספירת סטריאומספר חייבת לכלול גם זוגות לא-קושרים. ל-$\\mathrm{SF}_4$ יש $\\mathrm{SN}=5$, לא $4$; הטטרהדר אינו מתאר את מיקום האטומים בפועל.",
      },
      {
        id: "gchem-q07-opt2",
        plainText:
          "פירמידה משולשת ($C_{3v}$) עם $sp^3$, כמו ב-$\\mathrm{NH}_3$.",
        isCorrect: false,
        explanation:
          "שגוי: $\\mathrm{NH}_3$ הוא $\\mathrm{SN}=4$. ב-$\\mathrm{SF}_4$ חמשת האזורים האלקטרוניים יוצרים מבנה בסיסי של ביפירמידה משולשת עם זוג לא-קושר בעמדה אקווטוריאלית.",
      },
      {
        id: "gchem-q07-opt3",
        plainText:
          "גיאומטריית 'נדנדה' (seesaw, $C_{2v}$) עם היברידיזציה $sp^3d$: הזוג הלא-קושר תופס עמדה אקווטוריאלית בביפירמידה משולשת כדי למזער דחייה, ושני אטומי $\\mathrm{F}$ אקסיאליים + שניים אקווטוריאליים נותרים.",
        mathText: "\\mathrm{SF}_4:\\; \\text{seesaw},\\; sp^3d",
        isCorrect: true,
        explanation:
          "נכון: $\\mathrm{SN}=5$ ⇒ סידור אלקטרוני של ביפירמידה משולשת והיברידיזציה $sp^3d$. הזוג הלא-קושר מעדיף עמדה אקווטוריאלית (זוויות $120^\\circ$ במקום $90^\\circ$), ולכן ארבעת אטומי הפלואור יוצרים צורת נדנדה. זוויות הקשר בפועל סוטות מעט עקב דחיית הזוג הלא-קושר.",
      },
      {
        id: "gchem-q07-opt4",
        plainText:
          "אוקטהדרלית עם $sp^3d^2$, כי לגופרית יש אורביטלי $d$ פנויים.",
        isCorrect: false,
        explanation:
          "שגוי: אוקטהדר דורש $\\mathrm{SN}=6$ (כמו $\\mathrm{SF}_6$). ב-$\\mathrm{SF}_4$ יש רק חמישה אזורים אלקטרוניים סביב הגופרית.",
      },
    ],
  },
  {
    id: "gchem-q08-gas-laws-van-der-waals",
    domain: "חוקי גזים",
    title: "כימיה כללית - חוקי גזים ומשוואת ואן-דר-ואלס",
    context:
      "גז ממשי מתואר ע״י $\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT$. הפרמטר $a$ קשור לכוחות משיכה בין-מולקולריים, ו-$b$ לנפח המולקולרי העצמי.",
    formulaLatex:
      "\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT",
    instruction:
      "כיצד משפיעים $a$ ו-$b$ על הלחץ הנמדד בהשוואה לגז אידיאלי באותם $n,V,T$?",
    options: [
      {
        id: "gchem-q08-opt1",
        plainText:
          "$a$ ו-$b$ תמיד מעלים את הלחץ מעל $nRT/V$, כי מולקולות מתנגשות יותר.",
        isCorrect: false,
        explanation:
          "שגוי: משיכה ($a$) מורידה את הלחץ על הדפנות; נפח עצמי ($b$) מעלה את הלחץ האפקטיבי. הכיוון אינו אחיד ותלוי בתנאי הצפיפות.",
      },
      {
        id: "gchem-q08-opt2",
        plainText:
          "רק $b$ משפיע; $a$ הוא קבוע קריטי חסר משמעות דינמית בלחץ סופי.",
        isCorrect: false,
        explanation:
          "שגוי: האיבר $an^2/V^2$ הוא תיקון לחץ מפורש במשוואה. בלחצים בינוניים משיכה בין-מולקולרית היא אפקט מרכזי ($Z<1$).",
      },
      {
        id: "gchem-q08-opt3",
        plainText:
          "כוחות המשיכה ($a$) מקטינים את הלחץ הנמדד ביחס לאידיאלי, בעוד שנפח המולקולות ($b$) מקטין את הנפח החופשי ומגדיל את תדירות ההתנגשויות — כך שבצפיפות גבוהה $b$ דומיננטי ו-$P$ עולה מעל $nRT/V$, ובצפיפות בינונית $a$ דומיננטי ו-$P$ יורד.",
        mathText:
          "P = \\frac{nRT}{V-nb} - \\frac{an^2}{V^2}",
        isCorrect: true,
        explanation:
          "נכון: הצורה המפורשת $P = nRT/(V-nb) - an^2/V^2$ מראה שני תיקונים מנוגדים. $V-nb < V$ מגדיל את האיבר הקינטי; $-an^2/V^2$ מוריד לחץ עקב משיכה. מקדם הדחיסות $Z=PV/nRT$ יכול להיות קטן או גדול מ-$1$ בהתאם לאיזה איבר שולט — בהתאם לאיזוטרמות ניסוייות של גזים ממשיים.",
      },
      {
        id: "gchem-q08-opt4",
        plainText:
          "בגבול $V\\to\\infty$ הפרמטרים $a,b$ נשארים דומיננטיים והגז לעולם אינו מתקרב לאידיאליות.",
        isCorrect: false,
        explanation:
          "שגוי: כאשר $V\\to\\infty$, $an^2/V^2\\to 0$ ו-$nb\\ll V$, ולכן המשוואה מתנוונת ל-$PV=nRT$ — גבול הגז האידיאלי.",
      },
    ],
  },
  {
    id: "gchem-q09-colligative-osmotic-pressure",
    domain: "תכונות קוליגטיביות",
    title: "כימיה כללית - תכונות קוליגטיביות ולחץ אוסמוטי",
    context:
      "תמיסת גלוקוז ($\\mathrm{C}_6\\mathrm{H}_{12}\\mathrm{O}_6$, $M=180\\text{ g}\\,\\mathrm{mol}^{-1}$) בנפח $1.00\\text{ L}$ מכילה $36.0\\text{ g}$ מומס ב-$T=300\\text{ K}$. מניחים תמיסה אידיאלית דלילה ו-$R=0.0821\\text{ L}\\,\\mathrm{atm}\\,\\mathrm{K}^{-1}\\,\\mathrm{mol}^{-1}$.",
    formulaLatex: "\\Pi = iCRT, \\quad i=1\\;(\\text{לא-אלקטרוליט})",
    instruction:
      "מהו הלחץ האוסמוטי $\\Pi$ של התמיסה?",
    options: [
      {
        id: "gchem-q09-opt1",
        plainText:
          "$\\Pi = (36.0)(0.0821)(300) = 886\\text{ atm}$ — שימוש במסה במקום במולליות/מולריות.",
        isCorrect: false,
        explanation:
          "שגוי: בנוסחת ואן-טהוף $C$ הוא ריכוז מולרי ($\\mathrm{mol}\\,\\mathrm{L}^{-1}$), לא מסה בגרמים. התוצאה גדולה בסדרי גודל.",
      },
      {
        id: "gchem-q09-opt2",
        plainText:
          "$\\Pi = 2CRT = 9.85\\text{ atm}$ כי גלוקוז מתפרק לשני חלקיקים.",
        isCorrect: false,
        explanation:
          "שגוי: גלוקוז הוא לא-אלקטרוליט; $i=1$. מקדם ואן-טהוף $i=2$ מתאים לאלקטרוליטים כמו $\\mathrm{NaCl}$ בדיסוציאציה מלאה.",
      },
      {
        id: "gchem-q09-opt3",
        plainText:
          "$C = 36.0/180 = 0.200\\text{ M}$, ולכן $\\Pi = (1)(0.200)(0.0821)(300) = 4.93\\text{ atm}$. הלחץ האוסמוטי תלוי במספר חלקיקי המומס בלבד, לא בזהותם הכימית.",
        mathText: "\\Pi = 4.93\\text{ atm}",
        isCorrect: true,
        explanation:
          "נכון: מספר המולים $n=36.0/180=0.200\\text{ mol}$ ב-$1.00\\text{ L}$ ⇒ $C=0.200\\text{ M}$. עבור לא-אלקטרוליט $i=1$, ולכן $\\Pi=CRT=0.200\\times 0.0821\\times 300=4.926\\approx 4.93\\text{ atm}$. זו תכונה קוליגטיבית: אותה מולריות של סוכרוז הייתה נותנת אותו $\\Pi$.",
      },
      {
        id: "gchem-q09-opt4",
        plainText:
          "$\\Pi = CRT / M = 0.027\\text{ atm}$ — חלוקה מיותרת במסה המולרית שוב.",
        isCorrect: false,
        explanation:
          "שגוי: המסה המולרית כבר שימשה לחישוב $C$; חלוקה נוספת ב-$M$ משבשת את הממדים ואת הערך המספרי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "gchem-q10-redox-oxidation-number-balance",
    domain: "חמצון–חיזור",
    title: "כימיה כללית - חמצון–חיזור ומספרי חמצון",
    context:
      "בתגובה בסיסית: $\\mathrm{MnO}_4^- + \\mathrm{SO}_3^{2-} \\rightarrow \\mathrm{MnO}_2 + \\mathrm{SO}_4^{2-}$. יש לאזן בשיטת מחציות התגובה ולזהות את המחמצן.",
    formulaLatex:
      "\\mathrm{Mn}^{VII}\\to\\mathrm{Mn}^{IV}\\;(+3e^-),\\quad \\mathrm{S}^{IV}\\to\\mathrm{S}^{VI}\\;(-2e^-)",
    instruction:
      "מהי המשוואה המאוזנת הנכונה, ומי המחמצן?",
    options: [
      {
        id: "gchem-q10-opt1",
        plainText:
          "$\\mathrm{MnO}_4^- + \\mathrm{SO}_3^{2-} \\rightarrow \\mathrm{MnO}_2 + \\mathrm{SO}_4^{2-}$ כבר מאוזנת; $\\mathrm{SO}_3^{2-}$ הוא המחמצן.",
        isCorrect: false,
        explanation:
          "שגוי: המשוואה אינה מאוזנת באטומים, במטען או באלקטרונים. בנוסף, $\\mathrm{SO}_3^{2-}$ מחומצן (מספר חמצון של $\\mathrm{S}$ עולה מ-$+4$ ל-$+6$) ולכן הוא המחזר, לא המחמצן.",
      },
      {
        id: "gchem-q10-opt2",
        plainText:
          "$2\\mathrm{MnO}_4^- + 3\\mathrm{SO}_3^{2-} + 4\\mathrm{H}^+ \\rightarrow 2\\mathrm{MnO}_2 + 3\\mathrm{SO}_4^{2-} + 2\\mathrm{H}_2\\mathrm{O}$ — איזון חומצי.",
        isCorrect: false,
        explanation:
          "שגוי: היחס $2:3$ נכון אלקטרונית, אך הסביבה בסיסית; הוספת $\\mathrm{H}^+$ אינה מתאימה. בסיסית מאזנים עם $\\mathrm{OH}^-$ ו-$\\mathrm{H}_2\\mathrm{O}$.",
      },
      {
        id: "gchem-q10-opt3",
        plainText:
          "$\\mathrm{MnO}_4^-$ הוא המחזר כי המנגן מאבד חמצן ($\\mathrm{MnO}_4^-\\to\\mathrm{MnO}_2$).",
        isCorrect: false,
        explanation:
          "שגוי: אובדן חמצן פורמלי אינו הגדרת חיזור מודרנית. מספר החמצון של $\\mathrm{Mn}$ יורד מ-$+7$ ל-$+4$ — זה חיזור, ולכן $\\mathrm{MnO}_4^-$ הוא המחמצן.",
      },
      {
        id: "gchem-q10-opt4",
        plainText:
          "$2\\mathrm{MnO}_4^- + 3\\mathrm{SO}_3^{2-} + \\mathrm{H}_2\\mathrm{O} \\rightarrow 2\\mathrm{MnO}_2 + 3\\mathrm{SO}_4^{2-} + 2\\mathrm{OH}^-$; $\\mathrm{MnO}_4^-$ הוא המחמצן (מקבל $3e^-$ למנגן) ו-$\\mathrm{SO}_3^{2-}$ הוא המחזר.",
        mathText:
          "2\\mathrm{MnO}_4^- + 3\\mathrm{SO}_3^{2-} + \\mathrm{H}_2\\mathrm{O} \\to 2\\mathrm{MnO}_2 + 3\\mathrm{SO}_4^{2-} + 2\\mathrm{OH}^-",
        isCorrect: true,
        explanation:
          "נכון: מחצית חיזור: $\\mathrm{MnO}_4^- + 2\\mathrm{H}_2\\mathrm{O} + 3e^- \\rightarrow \\mathrm{MnO}_2 + 4\\mathrm{OH}^-$. מחצית חמצון: $\\mathrm{SO}_3^{2-} + 2\\mathrm{OH}^- \\rightarrow \\mathrm{SO}_4^{2-} + \\mathrm{H}_2\\mathrm{O} + 2e^-$. הכפלה ל-$6e^-$ נותנת $2\\mathrm{MnO}_4^- + 3\\mathrm{SO}_3^{2-} + \\mathrm{H}_2\\mathrm{O} \\rightarrow 2\\mathrm{MnO}_2 + 3\\mathrm{SO}_4^{2-} + 2\\mathrm{OH}^-$. המנגן מחוזר ⇒ $\\mathrm{MnO}_4^-$ מחמצן.",
      },
    ],
  },
  {
    id: "gchem-q11-buffers-henderson-hasselbalch",
    domain: "בופרים",
    title: "כימיה כללית - בופרים ומשוואת הנדרסון–האסלבלך",
    context:
      "בופר מורכב מחומצה אצטית ($\\mathrm{p}K_a = 4.76$) ומאצטט נתרן. הריכוזים: $[\\mathrm{HA}] = 0.10\\text{ M}$, $[\\mathrm{A}^-] = 0.20\\text{ M}$.",
    formulaLatex:
      "\\mathrm{pH} = \\mathrm{p}K_a + \\log\\frac{[\\mathrm{A}^-]}{[\\mathrm{HA}]}",
    instruction:
      "מהו ה-$\\mathrm{pH}$ של הבופר, ומה קורה ל-$\\mathrm{pH}$ אם מוסיפים כמות קטנה של חומצה חזקה?",
    options: [
      {
        id: "gchem-q11-opt1",
        plainText:
          "$\\mathrm{pH} = 4.76$; הוספת חומצה חזקה אינה משנה כלל את ה-$\\mathrm{pH}$ כי הבופר 'מושלם'.",
        isCorrect: false,
        explanation:
          "שגוי: כאשר $[\\mathrm{A}^-]\\neq[\\mathrm{HA}]$, $\\mathrm{pH}\\neq\\mathrm{p}K_a$. בנוסף, בופר ממתן שינוי אך אינו מבטל אותו לחלוטין.",
      },
      {
        id: "gchem-q11-opt2",
        plainText:
          "$\\mathrm{pH} = 4.76 + \\log(0.10/0.20) = 4.46$; הוספת חומצה מעלה את ה-$\\mathrm{pH}$.",
        isCorrect: false,
        explanation:
          "שגוי: היחס בלוגריתם הפוך — צריך $[\\mathrm{A}^-]/[\\mathrm{HA}]=2$, לא $1/2$. כמו כן הוספת חומצה מורידה $\\mathrm{pH}$, לא מעלה.",
      },
      {
        id: "gchem-q11-opt3",
        plainText:
          "$\\mathrm{pH} = \\mathrm{p}K_a - \\log([\\mathrm{A}^-]/[\\mathrm{HA}]) = 4.46$; הבופר עמיד רק לבסיסים, לא לחומצות.",
        isCorrect: false,
        explanation:
          "שגוי: משוואת הנדרסון–האסלבלך משתמשת ב-$+\\log([\\mathrm{A}^-]/[\\mathrm{HA}])$, לא במינוס. בנוסף, בופר חומצה חלשה/בסיס מצומד ממתן גם תוספות חומצה (ע״י $\\mathrm{A}^-$) וגם בסיס (ע״י $\\mathrm{HA}$).",
      },
      {
        id: "gchem-q11-opt4",
        plainText:
          "$\\mathrm{pH} = 4.76 + \\log(0.20/0.10) = 4.76 + \\log 2 \\approx 5.06$. הוספת חומצה חזקה ממירה חלק מ-$\\mathrm{A}^-$ ל-$\\mathrm{HA}$, מקטינה את היחס $[\\mathrm{A}^-]/[\\mathrm{HA}]$ ומורידה מעט את ה-$\\mathrm{pH}$ — אך השינוי קטן בהרבה מאשר במים ללא בופר.",
        mathText:
          "\\mathrm{pH}=4.76+\\log 2\\approx 5.06",
        isCorrect: true,
        explanation:
          "נכון: לפי הנדרסון–האסלבלך $\\mathrm{pH}=\\mathrm{p}K_a+\\log([\\mathrm{A}^-]/[\\mathrm{HA}])=4.76+\\log 2\\approx 5.06$. קיבולת הבופר מקסימלית סביב $\\mathrm{p}K_a$ וכאשר שני הרכיבים בריכוז דומה. הוספת $\\mathrm{H}^+$ צורכת בסיס מצומד: $\\mathrm{A}^- + \\mathrm{H}^+ \\rightarrow \\mathrm{HA}$, ולכן היחס יורד וה-$\\mathrm{pH}$ יורד במתינות כל עוד לא ממצים את קיבולת הבופר.",
      },
    ],
  },
  {
    id: "gchem-q12-solubility-product-ksp",
    domain: "מכפלת מסיסות",
    title: "כימיה כללית - מכפלת מסיסות $K_{sp}$",
    context:
      "למלח דל-מסיס $\\mathrm{PbCl}_2$ נתון $K_{sp} = 1.7\\times 10^{-5}$ ב-$25^\\circ\\mathrm{C}$. בתמיסה מימית טהורה המסיסות המולרית היא $s$.",
    formulaLatex:
      "\\mathrm{PbCl}_2(s) \\rightleftharpoons \\mathrm{Pb}^{2+}(aq) + 2\\mathrm{Cl}^-(aq),\\quad K_{sp}=[\\mathrm{Pb}^{2+}][\\mathrm{Cl}^-]^2 = 4s^3",
    instruction:
      "מהי המסיסות המולרית $s$, וכיצד תושפע מסיסות $\\mathrm{PbCl}_2$ בהוספת $\\mathrm{NaCl}$ (אפקט היון המשותף)?",
    options: [
      {
        id: "gchem-q12-opt1",
        plainText:
          "$s = \\sqrt{K_{sp}} = 4.1\\times 10^{-3}\\text{ M}$; הוספת $\\mathrm{NaCl}$ מגדילה את המסיסות.",
        isCorrect: false,
        explanation:
          "שגוי: עבור $\\mathrm{MX}_2$ היחס הוא $K_{sp}=4s^3$, לא $s^2$. בנוסף, יון משותף $\\mathrm{Cl}^-$ מזיז את השיוויון שמאלה ומקטין מסיסות.",
      },
      {
        id: "gchem-q12-opt2",
        plainText:
          "$s = K_{sp}/4 = 4.25\\times 10^{-6}\\text{ M}$; הוספת $\\mathrm{NaCl}$ אינה משפיעה כי $K_{sp}$ קבוע.",
        isCorrect: false,
        explanation:
          "שגוי: $K_{sp}$ קבוע בטמפרטורה נתונה, אך הריכוזים בשיווי משקל משתנים. $s\\neq K_{sp}/4$; יש לפתור $4s^3=K_{sp}$.",
      },
      {
        id: "gchem-q12-opt3",
        plainText:
          "$s = (K_{sp}/4)^{1/3} \\approx 1.6\\times 10^{-2}\\text{ M}$; הוספת $\\mathrm{NaCl}$ מגדילה מסיסות עקב עליית כוח יוני בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: החישוב המספרי של $s$ קרוב, אך הכיוון של אפקט היון המשותף הפוך — מסיסות יורדת. אפקט כוח יוני משני לעומת היון המשותף בריכוזים סבירים.",
      },
      {
        id: "gchem-q12-opt4",
        plainText:
          "$s = (K_{sp}/4)^{1/3} = (4.25\\times 10^{-6})^{1/3} \\approx 1.6\\times 10^{-2}\\text{ M}$; הוספת $\\mathrm{NaCl}$ מעלה $[\\mathrm{Cl}^-]$ ומקטינה את $[\\mathrm{Pb}^{2+}]$ (ולכן את מסיסות $\\mathrm{PbCl}_2$) לפי לה שטלייה, בעוד $K_{sp}$ נותר קבוע.",
        mathText:
          "s=(K_{sp}/4)^{1/3}\\approx 1.6\\times 10^{-2}\\text{ M}",
        isCorrect: true,
        explanation:
          "נכון: אם המסיסות $s$, אז $[\\mathrm{Pb}^{2+}]=s$ ו-$[\\mathrm{Cl}^-]=2s$, ולכן $K_{sp}=s(2s)^2=4s^3$. מכאן $s=(K_{sp}/4)^{1/3}\\approx 1.62\\times 10^{-2}\\text{ M}$. בהוספת $\\mathrm{NaCl}$, $[\\mathrm{Cl}^-]$ עולה ⇒ כדי לשמור על $K_{sp}$ קבוע חייב $[\\mathrm{Pb}^{2+}]$ לרדת ⇒ פחות $\\mathrm{PbCl}_2$ מתמוסס (אפקט יון משותף).",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_GENERAL_CHEMISTRY_QUESTIONS = GENERAL_CHEMISTRY_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleGeneralChemistryOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = GENERAL_CHEMISTRY_QUESTIONS.slice(0, 3);
  const groupB = GENERAL_CHEMISTRY_QUESTIONS.slice(3, 6);
  const groupC = GENERAL_CHEMISTRY_QUESTIONS.slice(6, 12);

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
