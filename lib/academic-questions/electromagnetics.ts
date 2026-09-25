import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic גלים ושדות אלקטרומגנטיים diagnostic bank (12Q).
 * Display name: "גלים ושדות אלקטרומגנטיים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const ELECTROMAGNETICS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "em-q01-maxwell-displacement-current-continuity",
    domain: "זרם העתקה ותיקון מקסוול לחוק אמפר",
    title: "שדות אלקטרומגנטיים - זרם העתקה ותיקון מקסוול לחוק אמפר",
    context: "חוק אמפר הקלאסי לזרמים יציבים הוא $\\nabla \\times \\vec{H} = \\vec{J}_c$. בהפעלת דיברגנס על שני האגפים מתקבל $\\nabla \\cdot (\\nabla \\times \\vec{H}) = 0$, בעוד ממשוואת הרציפות של המטען מתקיים $\\nabla \\cdot \\vec{J}_c = -\\frac{\\partial \\rho}{\\partial t}$.",
    formulaLatex: "\\nabla \\times \\vec{H} = \\vec{J}_c + \\frac{\\partial \\vec{D}}{\\partial t}, \\quad \\vec{J}_d = \\frac{\\partial \\vec{D}}{\\partial t}",
    instruction: "כיצד פותר זרם ההעתקה $\\vec{J}_d = \\frac{\\partial \\vec{D}}{\\partial t}$ של מקסוול את הסתירה המתמטית בין חוק אמפר למשוואת הרציפות בעת טעינת קבל?",
    options: [
      {
        id: "em-q01-opt1",
        plainText: "לפי חוק גאוס $\\rho = \\nabla \\cdot \\vec{D}$; גזירת שני האגפים בזמן נותנת $-\\nabla \\cdot \\vec{J}_c = \\nabla \\cdot \\frac{\\partial \\vec{D}}{\\partial t}$, ולכן הוספת $\\frac{\\partial \\vec{D}}{\\partial t}$ מאפסת זהותית את הדיברגנס של אגף ימין ($\\nabla \\cdot (\\vec{J}_c + \\vec{J}_d) = 0$), מה שמבטיח רציפות מתמטית של שטף הזרם הכולל דרך כל משטח (כולל המרווח הריק בין לוחות הקבל).",
        isCorrect: true,
        explanation: "נכון: הדיברגנס של שדה קרל מתאפס תמיד זהותית: $\\nabla \\cdot (\\nabla \\times \\vec{H}) \\equiv 0$. לפיכך אגף ימין של משוואת אמפר חייב להיות בעל דיברגנס אפס. מאחר שמשוואת הרציפות קובעת $\\nabla \\cdot \\vec{J}_c = -\\frac{\\partial \\rho}{\\partial t}$, אמפר הקלאסי נכשל בתנאי שאינם יציבים (כמו טעינת קבל שבה מצטבר מטען על הלוח). מקסוול החליף את $\\rho$ בעזרת חוק גאוס ($\\rho = \\nabla \\cdot \\vec{D}$), והגיע ל-$\\nabla \\cdot (\\vec{J}_c + \\frac{\\partial \\vec{D}}{\\partial t}) = -\\frac{\\partial \\rho}{\\partial t} + \\frac{\\partial \\rho}{\\partial t} = 0$. זרם ההעתקה $\\vec{J}_d$ סוגר את מעגל הזרם במרווח הדיאלקטרי בין לוחות הקבל ומנבא את קיומם של גלים אלקטרומגנטיים."
      },
      {
        id: "em-q01-opt2",
        plainText: "זרם ההעתקה מורכב מזרימה פיזית של אלקטרונים הנעים במהירות האור בריק בין הלוחות.",
        isCorrect: false,
        explanation: "שגוי: בריק אין מטענים ואין אלקטרונים; זרם העתקה אינו זרם מטענים פיזי אלא קצב שינוי בזמן של השדה החשמלי."
      },
      {
        id: "em-q01-opt3",
        plainText: "זרם ההעתקה מבטל את קיומו של השדה המגנטי סביב קבלים.",
        isCorrect: false,
        explanation: "שגוי: זרם ההעתקה מייצר בעצמו שדה מגנטי מעגלי, בדיוק כפי שעושה זרם הולכה רגיל."
      },
      {
        id: "em-q01-opt4",
        plainText: "התיקון תקף אך ורק עבור מוליכי-על בטמפרטורת האפס המוחלט.",
        isCorrect: false,
        explanation: "שגוי: משוואות מקסוול עם זרם העתקה הן חוקי יסוד אוניברסליים התקפים בכל תווך ובכל טמפרטורה."
      },
    ],
  },
  {
    id: "em-q02-wave-propagation-lossy-skin-depth",
    domain: "התפשטות גל בתווך הפסדי ועומק חדירה (Skin Depth)",
    title: "שדות אלקטרומגנטיים - התפשטות גל בתווך הפסדי ועומק חדירה (Skin Depth)",
    context: "גל מישורי הרמוני בתדר $\\omega$ מתפשט בכיוון $z$ בתוך מוליך טוב בעל מוליכות סגולית גבוהה $\\sigma$, מקדם דיאלקטרי $\\epsilon$, ומקדם מגנטי $\\mu$ (כאשר $\\frac{\\sigma}{\\omega \\epsilon} \\gg 1$). קבוע ההתפשטות הוא $\\gamma = \\alpha + j\\beta = \\sqrt{j\\omega\\mu(\\sigma + j\\omega\\epsilon)}$.",
    formulaLatex: "\\gamma \\approx \\sqrt{j\\omega\\mu\\sigma} = (1 + j)\\sqrt{\\frac{\\omega\\mu\\sigma}{2}}, \\quad \\delta = \\frac{1}{\\alpha}",
    instruction: "מהם קבוע הניחות $\\alpha$, קבוע הפאזה $\\beta$, ועומק החדירה $\\delta$ במוליך טוב?",
    options: [
      {
        id: "em-q02-opt1",
        mathText: "\\alpha = \\beta = \\sqrt{\\pi f \\mu \\sigma}, \\quad \\delta = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}",
        plainText: "$\\alpha = \\beta = \\sqrt{\\frac{\\omega\\mu\\sigma}{2}} = \\sqrt{\\pi f \\mu \\sigma}$, ועומק החדירה הוא $\\delta = \\frac{1}{\\alpha} = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}$, שבו אמפליטודת הגל דועכת ל-$e^{-1} \\approx 36.8\\%$ מערכה בשפה.",
        isCorrect: true,
        explanation: "נכון: במוליך טוב $\\sigma \\gg \\omega\\epsilon$, ולכן זרם ההולכה דומיננטי לחלוטין על זרם ההעתקה. קבוע ההתפשטות: $\\gamma = \\sqrt{j\\omega\\mu\\sigma} = \\sqrt{\\omega\\mu\\sigma} \\cdot e^{j\\pi/4} = \\sqrt{\\omega\\mu\\sigma}\\left(\\frac{1}{\\sqrt{2}} + j\\frac{1}{\\sqrt{2}}\\right) = \\sqrt{\\frac{\\omega\\mu\\sigma}{2}} + j\\sqrt{\\frac{\\omega\\mu\\sigma}{2}}$. לכן קבוע הניחות $\\alpha$ שווה במדויק לקבוע הפאזה $\\beta$. עומק החדירה $\\delta$ מוגדר כמרחק שבו הגל דועך בפקטור של $1/e$: $\\delta = 1/\\alpha = \\sqrt{\\frac{2}{\\omega\\mu\\sigma}} = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}$. ככל שהתדר עולה, $\\delta$ מתכווץ והזרם נדחק לשכבה דקה על פני השטח (Skin Effect)."
      },
      {
        id: "em-q02-opt2",
        plainText: "$\\alpha = 0$, $\\beta = \\omega\\sqrt{\\mu\\epsilon}$, והגל מתפשט ללא שום ניחות.",
        isCorrect: false,
        explanation: "שגוי: תיאור זה מתאים לתווך דיאלקטרי אידיאלי חסר הפסדים ($\\sigma = 0$), ולא למוליך צמיג."
      },
      {
        id: "em-q02-opt3",
        plainText: "$\\alpha = \\frac{\\sigma}{2}\\sqrt{\\frac{\\mu}{\\epsilon}}$, ו-$\\delta$ אינו תלוי בתדר הזרימה $f$.",
        isCorrect: false,
        explanation: "שגוי: ביטוי זה מתאר דיאלקטרי בעל הפסדים נמוכים (Low-loss dielectric שבו $\\sigma \\ll \\omega\\epsilon$), ולא מוליך טוב."
      },
      {
        id: "em-q02-opt4",
        plainText: "$\\delta = \\frac{\\lambda}{2}$ קבוע לכל החומרים.",
        isCorrect: false,
        explanation: "שגוי: עומק החדירה תלוי במוליכות הסגולית $\\sigma$ וקטן בהרבה מאורך הגל בריק."
      },
    ],
  },
  {
    id: "em-q03-wave-polarization-state-conditions",
    domain: "מצבי קיטוב של גלים אלקטרומגנטיים",
    title: "שדות אלקטרומגנטיים - מצבי קיטוב של גלים אלקטרומגנטיים",
    context: "גל אלקטרומגנטי מישורי הרמוני מתפשט בריק בכיוון $+z$. וקטור השדה החשמלי ב-$z = 0$ נתון על ידי:",
    formulaLatex: "\\vec{E}(0, t) = E_0 \\cos(\\omega t) \\hat{x} + E_0 \\cos\\left(\\omega t + \\frac{\\pi}{2}\\right) \\hat{y} = E_0 \\cos(\\omega t) \\hat{x} - E_0 \\sin(\\omega t) \\hat{y}",
    instruction: "מהו מצב הקיטוב של הגל, ומהו כיוון הסיבוב של וקטור השדה החשמלי (עבור צופה המביט אל מקור הגל, כלומר בכיוון $-z$ לפי תקן IEEE)?",
    options: [
      {
        id: "em-q03-opt1",
        plainText: "קיטוב מעגלי ימני (Right-Hand Circular Polarization - RHCP); גודל הווקטור קבוע $|\\vec{E}| = E_0$, והוא מסתובב בכיוון השעון במבט מול כיוון ההתקדמות.",
        isCorrect: true,
        explanation: "נכון: נבדוק שני תנאים: 1. אמפליטודות שני הרכיבים הניצבים שוות: $E_{0x} = E_{0y} = E_0$. 2. הפרש הפאזה הוא בדיוק $\\Delta\\phi = \\phi_y - \\phi_x = +\\pi/2$. מכיוון ש-$\\cos(\\omega t + \\pi/2) = -\\sin(\\omega t)$, מתקיים $E_x^2 + E_y^2 = E_0^2(\\cos^2\\omega t + \\sin^2\\omega t) = E_0^2 = \\text{const}$, מה שמוכיח שהווקטור מתווה מעגל מושלם (קיטוב מעגלי). כעת נבחן את כיוון הסיבוב במישור $x-y$: ב-$t=0$: $\\vec{E} = E_0 \\hat{x}$. ברבע מחזור $\\omega t = \\pi/2$: $\\vec{E} = -E_0 \\hat{y}$. הווקטור נע מציר $+x$ אל ציר $-y$. לפי תקן IEEE (מבט מול כיוון התקדמות הגל, כלומר עם הפנים אל הקרינה הנכנסת לכיוון $-z$), כיוון זה הוא סיבוב בכיוון השעון, המוגדר לפי כלל יד ימין כקיטוב מעגלי ימני (RHCP)."
      },
      {
        id: "em-q03-opt2",
        plainText: "קיטוב ליניארי בזווית של $45^\\circ$ ביחס לציר $x$.",
        isCorrect: false,
        explanation: "שגוי: קיטוב ליניארי דורש שהפרש הפאזה בין הרכיבים יהיה 0 או $\\pi$ (רכיבים באותו מופע או מופע הפוך)."
      },
      {
        id: "em-q03-opt3",
        plainText: "קיטוב מעגלי שמאלי (LHCP) משום שסימן רכיב ה-$y$ שלילי.",
        isCorrect: false,
        explanation: "שגוי: לפי הגדרת IEEE, תנועה מ-$+x$ אל $-y$ כאשר הגל מתקדם ב-$+z$ תואמת קיטוב ימני ולא שמאלי."
      },
      {
        id: "em-q03-opt4",
        plainText: "קיטוב אליפטי בעל יחס צירים (Axial Ratio) של 2.",
        isCorrect: false,
        explanation: "שגוי: האמפליטודות שוות והפרש הפאזה $90^\\circ$ מדויק, ולכן יחס הצירים הוא בדיוק 1 (מעגל ולא אליפסה)."
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "em-q04-oblique-incidence-brewster-angle-tm",
    domain: "פגיעה משופעת, קיטוב TM וזווית ברוסטר",
    title: "שדות אלקטרומגנטיים - פגיעה משופעת, קיטוב TM וזווית ברוסטר",
    context: "גל אלקטרומגנטי פוגע פגיעה משופעת בזווית $\\theta_1$ בממשק מישורי בין שני תווכים דיאלקטרים אידיאליים לא-מגנטיים ($\\mu_1 = \\mu_2 = \\mu_0$) בעלי מקדמים $\\epsilon_1$ ו-$\\epsilon_2$ ($n_1 = \\sqrt{\\epsilon_1 / \\epsilon_0}, n_2 = \\sqrt{\\epsilon_2 / \\epsilon_0}$). הגל מקוטב בקיטוב מקביל (TM / Parallel Polarization).",
    formulaLatex: "r_{||} = \\frac{n_2 \\cos\\theta_1 - n_1 \\cos\\theta_2}{n_2 \\cos\\theta_1 + n_1 \\cos\\theta_2} = 0 \\implies \\theta_1 = \\theta_B",
    instruction: "מה מאפיין את זווית ברוסטר (Brewster Angle) $\\theta_B$, ומהו ערכה?",
    options: [
      {
        id: "em-q04-opt1",
        plainText: "זווית ברוסטר מתקיימת עבור קיטוב TE בלבד וערכה $\\sin\\theta_B = n_2 / n_1$.",
        isCorrect: false,
        explanation: "שגוי: בדיאלקטרים לא-מגנטיים אין זווית ברוסטר לקיטוב TE (רכיב ההחזרה אינו מתאפס לעולם), והנוסחה עם הסינוס שייכת לזווית הקריטית."
      },
      {
        id: "em-q04-opt2",
        mathText: "\\tan\\theta_B = \\frac{n_2}{n_1} = \\sqrt{\\frac{\\epsilon_2}{\\epsilon_1}}",
        plainText: "בזווית ברוסטר מקדם ההחזרה של קיטוב TM מתאפס לחלוטין ($r_{||} = 0$, כל האנרגיה מועברת לתווך השני ללא החזרה), וערכה נתון ע״י $\\tan\\theta_B = \\sqrt{\\frac{\\epsilon_2}{\\epsilon_1}} = \\frac{n_2}{n_1}$.",
        isCorrect: true,
        explanation: "נכון: לפי משוואות פרנל עבור קיטוב מקביל (TM / p-polarization): מקדם ההחזרה מתאפס כאשר $n_2 \\cos\\theta_1 = n_1 \\cos\\theta_2$. בשילוב חוק סנל ($n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$), מקבלים שהקרן המוחזרת והקרן הנשברת ניצבות זו לזו ($\\theta_1 + \\theta_2 = 90^\\circ$). מכאן $\\cos\\theta_2 = \\sin\\theta_1$, והצבה מניבה $n_2 \\cos\\theta_1 = n_1 \\sin\\theta_1 \\implies \\tan\\theta_B = n_2/n_1$. בזווית זו אין כל החזרה של גל TM, מה שמשמש לייצור אור מקוטב ליניארית (חלונות ברוסטר בלייזרים)."
      },
      {
        id: "em-q04-opt3",
        plainText: "בזווית ברוסטר כל האנרגיה מוחזרת במלואה עקב החזרה פנימית מלאה ($|r_{||}| = 1$).",
        isCorrect: false,
        explanation: "שגוי: החזרה מלאה מתרחשת בזווית הקריטית $\\theta_c$ ומעבר לה, בעוד בברוסטר מתרחש ההפך הגמור: 100% העברה ואפס החזרה."
      },
      {
        id: "em-q04-opt4",
        plainText: "זווית ברוסטר תלויה בתדירות הגל $f$ ומגיעה ל-$0^\\circ$ עבור גלי רדיו.",
        isCorrect: false,
        explanation: "שגוי: בדיאלקטרי אידיאלי המקדמים קבועים וזווית ברוסטר היא גודל גאומטרי שאינו תלוי בתדר."
      },
    ],
  },
  {
    id: "em-q05-quarter-wave-transformer-matching",
    domain: "קווי תמסורת ותיאום עכבות ברבע אורך גל",
    title: "שדות אלקטרומגנטיים - קווי תמסורת ותיאום עכבות ברבע אורך גל",
    context: "קו תמסורת חסר הפסדים בעל עכבה אופיינית $Z_0 = 50\\,\\Omega$ מחובר לעומס ממשי טהור $R_L = 200\\,\\Omega$. מעוניינים לבצע תיאום עכבות מלא בתדר העבודה באמצעות קטע קו תמסורת באורך רבע אורך גל ($l = \\lambda/4$) בעל עכבה אופיינית $Z_1$.",
    formulaLatex: "Z_{in} = \\frac{Z_1^2}{R_L} = Z_0 \\implies Z_1 = \\sqrt{Z_0 R_L}",
    instruction: "מה צריכה להיות העכבה האופיינית $Z_1$ של מתאם רבע אורך הגל כדי להבטיח מקדם החזרה אפס (תיאום מושלם $\\Gamma_{in} = 0$) בקו ההזנה הראשי?",
    options: [
      {
        id: "em-q05-opt1",
        plainText: "$Z_1 = 125\\,\\Omega$ (הממוצע החשבוני בין $Z_0$ ל-$R_L$)",
        isCorrect: false,
        explanation: "שגוי: עכבת הקו ברבע גל דורשת ממוצע הנדסי (גאומטרי) של העכבות ולא ממוצע חשבוני."
      },
      {
        id: "em-q05-opt2",
        mathText: "Z_1 = \\sqrt{Z_0 R_L} = \\sqrt{50 \\times 200} = \\sqrt{10000} = 100\\,\\Omega",
        plainText: "$Z_1 = 100\\,\\Omega$",
        isCorrect: true,
        explanation: "נכון: נוסחת עכבת המבוא של קו תמסורת באורך רבע גל ($l = \\lambda/4$, שבו $\\beta l = \\frac{2\\pi}{\\lambda}\\frac{\\lambda}{4} = \\frac{\\pi}{2}$) הופכת את עכבת העומס לפי תכונת ההיפוך: $Z_{in} = \\frac{Z_1^2}{Z_L}$. כדי שהקו הראשי ($Z_0 = 50\\,\\Omega$) יראה תיאום מושלם ללא שום החזרת גל, נדרוש $Z_{in} = Z_0$. לכן: $Z_0 = \\frac{Z_1^2}{R_L} \\implies Z_1 = \\sqrt{Z_0 R_L} = \\sqrt{50 \\times 200} = \\sqrt{10,000} = 100\\,\\Omega$."
      },
      {
        id: "em-q05-opt3",
        plainText: "$Z_1 = 50\\,\\Omega$",
        isCorrect: false,
        explanation: "שגוי: אם $Z_1 = 50\\,\\Omega$, הקו אינו משנה את יחס העכבות ותיווצר החזרה משמעותית של $\\Gamma = (200-50)/(200+50) = 0.6$."
      },
      {
        id: "em-q05-opt4",
        plainText: "$Z_1 = 400\\,\\Omega$",
        isCorrect: false,
        explanation: "שגוי: עכבה זו תגדיל את אי-ההתאמה במקום למתנה."
      },
    ],
  },
  {
    id: "em-q06-poynting-vector-energy-flow-coaxial",
    domain: "וקטור פוינטינג וזרימת אנרגיה בכבל קואקסיאלי",
    title: "שדות אלקטרומגנטיים - וקטור פוינטינג וזרימת אנרגיה בכבל קואקסיאלי",
    context: "כבל קואקסיאלי אידיאלי מוליך זרם DC ישר $I$ מוליך פנימי ברדיוס $a$ אל מוליך חיצוני ברדיוס $b$. הפרש המתחים בין המוליכים הוא $V$. השדה החשמלי הסטטי הוא רדיאלי $\\vec{E} = \\frac{V}{\\ln(b/a) r}\\hat{r}$, והשדה המגנטי הוא מעגלי $\\vec{B} = \\frac{\\mu_0 I}{2\\pi r}\\hat{\\phi}$.",
    formulaLatex: "\\vec{S} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B}), \\quad P = \\iint_{\\text{cross-section}} \\vec{S} \\cdot d\\vec{A}",
    instruction: "לאיזה כיוון מצביע וקטור פוינטינג $\\vec{S}$, ומהו שטף ההספק הכולל הזורם במרחב הדיאלקטרי של הכבל?",
    options: [
      {
        id: "em-q06-opt1",
        plainText: "וקטור פוינטינג מצביע רדיאלית כלפי פנים ($\\hat{S} = -\\hat{r}$), וההספק הכולל מתאפס.",
        isCorrect: false,
        explanation: "שגוי: המכפלה הווקטורית של שדה רדיאלי ושדה מעגלי מצביעה תמיד לאורך ציר הכבל ולא רדיאלית."
      },
      {
        id: "em-q06-opt2",
        mathText: "\\vec{S} = \\frac{V I}{2\\pi \\ln(b/a) r^2} \\hat{z}, \\quad P = \\int_a^b S_z (2\\pi r dr) = V I",
        plainText: "וקטור פוינטינג מצביע במקביל לציר הכבל לעבר העומס ($\\hat{S} = \\hat{z}$), וסך כל שטף האנרגיה הזורם במרחב הריק/דיאלקטרי שבין המוליכים שווה בדיוק להספק החשמלי הנצרך בעומס: $P = V \\cdot I$.",
        isCorrect: true,
        explanation: "נכון: נחשב את וקטור פוינטינג: $\\vec{S} = \\frac{1}{\\mu_0}(\\vec{E} \\times \\vec{B}) = \\frac{1}{\\mu_0} \\left(\\frac{V}{\\ln(b/a)r} \\hat{r}\\right) \\times \\left(\\frac{\\mu_0 I}{2\\pi r} \\hat{\\phi}\\right) = \\frac{V I}{2\\pi \\ln(b/a) r^2} (\\hat{r} \\times \\hat{\\phi}) = \\frac{V I}{2\\pi \\ln(b/a) r^2} \\hat{z}$. הווקטור מצביע במדויק בכיוון התפשטות האנרגיה לאורך ציר הכבל ($+z$). אינטגרציה על שטח החתך הטבעתי: $P = \\int_a^b \\frac{V I}{2\\pi \\ln(b/a) r^2} (2\\pi r\\,dr) = \\frac{V I}{\\ln(b/a)} \\int_a^b \\frac{dr}{r} = \\frac{V I}{\\ln(b/a)} \\ln(b/a) = V I$. זוהי הדגמה מרהיבה של האלקטרודינמיקה: האנרגיה החשמלית זורמת בשדות במרחב שבין המוליכים ולא בתוך המתכת עצמה!"
      },
      {
        id: "em-q06-opt3",
        plainText: "וקטור פוינטינג קיים אך ורק בתוך גוף מוליכי הנחושת שבהם זורם הזרם הפיזי.",
        isCorrect: false,
        explanation: "שגוי: במוליך אידיאלי השדה החשמלי בתוכו אפס ($E=0$) ולכן וקטור פוינטינג בתוך המוליך עצמו מתאפס זהותית."
      },
      {
        id: "em-q06-opt4",
        plainText: "האנרגיה זורמת בתנודה מעגלית סביב המוליך המרכזי ללא התקדמות קדימה.",
        isCorrect: false,
        explanation: "שגוי: השדה המגנטי מעגלי, אך המכפלה הווקטורית עם השדה הרדיאלי מייצרת זרימה קווית טהורה קדימה ($\\hat{r} \\times \\hat{\\phi} = \\hat{z}$)."
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "em-q07-te10-waveguide-cutoff-phase-velocity",
    domain: "מוליכי גלים מלבניים ואופן התפשטות דומיננטי $TE_{10}$",
    title: "שדות אלקטרומגנטיים - מוליכי גלים מלבניים ואופן התפשטות דומיננטי $TE_{10}$",
    context: "במוליך גלים מלבני חלול בעל דפנות מתכת אידיאליות וממדים $a \\times b$ ($a > b$), מתפשט אופן התנודה הדומיננטי $TE_{10}$. תדר הקטעון הוא $f_c = \\frac{c}{2a}$. הגל מוזן בתדר $f > f_c$.",
    formulaLatex: "v_p = \\frac{c}{\\sqrt{1 - (f_c / f)^2}}, \\quad v_g = c \\sqrt{1 - (f_c / f)^2}, \\quad v_p \\cdot v_g = c^2",
    instruction: "מה ניתן לקבוע לגבי מהירות הפאזה $v_p$ ומהירות החבורה (העברת האנרגיה) $v_g$ במוליך הגלים?",
    options: [
      {
        id: "em-q07-opt1",
        plainText: "מהירות הפאזה ומהירות החבורה שתיהן שוות למהירות האור בריק ($v_p = v_g = c$).",
        isCorrect: false,
        explanation: "שגוי: שוויון ל-$c$ מתקיים אך ורק באופני TEM (כמו בכבל קואקסיאלי), אך במוליך גלים חלול קיימת דיספרסיה גאומטרית."
      },
      {
        id: "em-q07-opt2",
        plainText: "מהירות הפאזה קטנה מ-$c$, ומהירות החבורה גדולה מ-$c$ ומפרה את תורת היחסות.",
        isCorrect: false,
        explanation: "שגוי: מהירות העברת מידע ואנרגיה היא מהירות החבורה $v_g$, והיא חסומה תמיד מתחת ל-$c$."
      },
      {
        id: "em-q07-opt3",
        mathText: "v_p > c, \\quad v_g < c, \\quad v_p v_g = c^2",
        plainText: "מהירות הפאזה גדולה ממהירות האור בריק ($v_p > c$), בעוד שמהירות החבורה המעבירה אנרגיה קטנה ממהירות האור ($v_g < c$), ומכפלתן מקיימת במדויק $v_p \\cdot v_g = c^2$.",
        isCorrect: true,
        explanation: "נכון: הגל במוליך גלים מלבני מתקדם באמצעות החזרות זיגזג של גלים מישוריים מהדפנות בזווית $\\theta$. מהירות הפאזה מודדת את קצב התקדמות חזית הגל לאורך הדופן: $v_p = \\frac{c}{\\cos\\theta} = \\frac{c}{\\sqrt{1 - (f_c/f)^2}} > c$. מהירות זו יכולה לעלות על $c$ משום שאינה מעבירה חומר או מידע עצמאי (זוהי תופעה גאומטרית כמו חיתוך להבי מספריים). מאידך, האנרגיה מתקדמת במסלול הזיגזג הארוך, ורכיב ההתקדמות נטו שלה בציר המוליך הוא מהירות החבורה: $v_g = c \\cos\\theta = c \\sqrt{1 - (f_c/f)^2} < c$. מכפלתן היא $v_p v_g = c^2$, בהתאמה מלאה ליחסות הפרטית."
      },
      {
        id: "em-q07-opt4",
        plainText: "אם $f < f_c$, מהירות הפאזה הופכת לממשית ומוכפלת פי 2.",
        isCorrect: false,
        explanation: "שגוי: כאשר $f < f_c$, קבוע הפאזה הופך למדומה טהור, הגל אינו מתפשט כלל אלא דועך אקספוננציאלית (Evanescent Mode)."
      },
    ],
  },
  {
    id: "em-q08-vswr-reflection-coefficient-relation",
    domain: "יחס גל עומד (VSWR) ומקדם החזרה בקווי תמסורת",
    title: "שדות אלקטרומגנטיים - יחס גל עומד (VSWR) ומקדם החזרה בקווי תמסורת",
    context: "בקו תמסורת חסר הפסדים בעל עכבה אופיינית $Z_0 = 50\\,\\Omega$, מודדים יחס גל עומד במתח $\\text{VSWR} = S = 3.0$. העומס הוא בעל אופי התנגדותי טהור וגדול מ-$Z_0$ ($R_L > Z_0$).",
    formulaLatex: "S = \\frac{1 + |\\Gamma|}{1 - |\\Gamma|}, \\quad |\\Gamma| = \\frac{S - 1}{S + 1}",
    instruction: "מהו גודל מקדם ההחזרה $|\\Gamma|$ ומהו ערך עכבת העומס $R_L$?",
    options: [
      {
        id: "em-q08-opt1",
        plainText: "$|\\Gamma| = 0.333$, ו-$R_L = 75\\,\\Omega$",
        isCorrect: false,
        explanation: "שגוי: ערך ה-$\\Gamma$ מחושב שגוי; הפיכת הנוסחה נותנת $2/4 = 0.5$."
      },
      {
        id: "em-q08-opt2",
        plainText: "$|\\Gamma| = 0.667$, ו-$R_L = 100\\,\\Omega$",
        isCorrect: false,
        explanation: "שגוי: $0.667$ מתקבל עבור יחס גל עומד של 5 ולא של 3."
      },
      {
        id: "em-q08-opt3",
        mathText: "|\\Gamma| = \\frac{3 - 1}{3 + 1} = 0.5, \\quad R_L = S \\cdot Z_0 = 3 \\times 50 = 150\\,\\Omega",
        plainText: "$|\\Gamma| = 0.5$, ו-$R_L = 150\\,\\Omega$",
        isCorrect: true,
        explanation: "נכון: לפי הגדרת ה-VSWR: $|\\Gamma| = \\frac{S - 1}{S + 1} = \\frac{3 - 1}{3 + 1} = \\frac{2}{4} = 0.5$. עבור עומס התנגדותי טהור שבו $R_L > Z_0$, מקדם ההחזרה ממשי וחיובי: $\\Gamma = \\frac{R_L - Z_0}{R_L + Z_0} = 0.5 \\implies R_L - 50 = 0.5(R_L + 50) \\implies 0.5 R_L = 75 \\implies R_L = 150\\,\\Omega$. (לחלופין: $S = R_L / Z_0 \\implies R_L = 3 \\times 50 = 150\\,\\Omega$)."
      },
      {
        id: "em-q08-opt4",
        plainText: "$|\\Gamma| = 1.0$, ו-$R_L = \\infty$ (נתק מושלם)",
        isCorrect: false,
        explanation: "שגוי: נתק מייצר גל עומד אינסופי ($S = \\infty$) ולא $S=3$."
      },
    ],
  },
  {
    id: "em-q09-total-internal-reflection-evanescent-wave",
    domain: "החזרה פנימית מלאה וגל דועך (Evanescent Wave)",
    title: "שדות אלקטרומגנטיים - החזרה פנימית מלאה וגל דועך (Evanescent Wave)",
    context: "גל אלקטרומגנטי נע מתווך צפוף אופטית בעל מקדם שבירה $n_1$ לתווך דליל בעל מקדם שבירה $n_2$ ($n_1 > n_2$). זווית הפגיעה גדולה מהזווית הקריטית: $\\theta_1 > \\theta_c = \\arcsin(n_2/n_1)$.",
    formulaLatex: "\\sin\\theta_2 = \\frac{n_1}{n_2}\\sin\\theta_1 > 1 \\implies k_{z2} = -j \\alpha_2 = -j k_0 \\sqrt{n_1^2 \\sin^2\\theta_1 - n_2^2}",
    instruction: "מהו האופי הפיזיקלי של הגל בתווך השני (הדליל), ומה מתרחש לממוצע וקטור פוינטינג הניצב לממשק?",
    options: [
      {
        id: "em-q09-opt1",
        plainText: "הגל בתווך השני הוא גל מישורי מתפשט רגיל בעל מהירות גבוהה פי 2.",
        isCorrect: false,
        explanation: "שגוי: אין גל מתפשט בניצב לממשק; רכיב וקטור הגל הניצב הוא מדומה טהור."
      },
      {
        id: "em-q09-opt2",
        plainText: "השדה החשמלי בתווך השני מתאפס במדויק על פני כל המרחב ($E_2 = 0$).",
        isCorrect: false,
        explanation: "שגוי: שדות אלקטרומגנטיים חייבים לקיים תנאי רציפות בשפה, ולכן השדה חודר לעומק מסוים בתווך השני."
      },
      {
        id: "em-q09-opt3",
        plainText: "נוצר גל דועך (Evanescent Wave) שמתפשט במקביל לממשק ודועך אקספוננציאלית בניצב לו; ממוצע וקטור פוינטינג הניצב לממשק מתאפס זהותית ($\\langle S_n \\rangle = 0$), כך שאין מעבר אנרגיה ממוצעת נטו לתווך השני (100% החזרה).",
        isCorrect: true,
        explanation: "נכון: מחוק סנל נקבל כי $\\cos\\theta_2 = \\sqrt{1 - \\sin^2\\theta_2} = j\\sqrt{(n_1/n_2)^2\\sin^2\\theta_1 - 1}$. וקטור הגל הניצב הופך למדומה טהור: $e^{-j k_{z2} z} = e^{-\\alpha_2 z}$. השדה חודר לתווך השני ודועך אקספוננציאלית (גל אוונסנטי / דועך). השדות $\\vec{E}$ ו-$\\vec{H}$ בניצב לממשק נמצאים בהפרש מופע של בדיוק $90^\\circ$, ולכן השטף הממוצע בזמן של וקטור פוינטינג הניצב לממשק הוא אפס: $\\langle S_z \\rangle = \\frac{1}{2}\\operatorname{Re}(E_x H_y^*) = 0$. כל האנרגיה הממוצעת מוחזרת במלואה לתווך הראשון ($|R| = 1$)."
      },
      {
        id: "em-q09-opt4",
        plainText: "הגל בתווך השני מומר לגלי קול עקב אי-רציפות בצפיפות.",
        isCorrect: false,
        explanation: "שגוי: אין המרה לגלים אקוסטיים בדיאלקטרי רגיל; התופעה אלקטרומגנטית טהורה."
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "em-q10-hertzian-dipole-radiation-resistance",
    domain: "קרינה ואנטנות: דיפול הרץ (Hertzian Dipole)",
    title: "שדות אלקטרומגנטיים - קרינה ואנטנות: דיפול הרץ (Hertzian Dipole)",
    context: "דיפול הרץ קצר בעל אורך $dl \\ll \\lambda$ נושא זרם הרמוני אחיד $I_0 \\cos(\\omega t)$. צפיפות ההספק המוקרן במרחב הרחוק (Far-field) היא $S_{avg}(r, \\theta) = \\frac{\\eta_0 I_0^2}{8\\lambda^2 r^2} (dl)^2 \\sin^2\\theta$.",
    formulaLatex: "P_{rad} = \\frac{1}{2} I_0^2 R_{rad} = \\int_0^{2\\pi}\\int_0^\\pi S_{avg} r^2 \\sin\\theta \\, d\\theta d\\phi",
    instruction: "מהי התנגדות הקרינה (Radiation Resistance) $R_{rad}$ של הדיפול, ומהו הכיווניות (Directivity) המקסימלית שלו?",
    options: [
      {
        id: "em-q10-opt1",
        plainText: "$R_{rad} = 50\\,\\Omega$, והכיווניות היא $D = 1.0$ (קרינה איזוטרופית אחידה).",
        isCorrect: false,
        explanation: "שגוי: דיפול אינו קורן באופן איזוטרופי; יש לו דיאגרמת קרינה בצורת בייגלה (Donut) עם אפס קרינה לאורך ציר הדיפול."
      },
      {
        id: "em-q10-opt2",
        plainText: "$R_{rad} = 120\\pi \\frac{dl}{\\lambda}$, והכיווניות היא $D = 2.15$.",
        isCorrect: false,
        explanation: "שגוי: התנגדות הקרינה תלויה בריבוע היחס $(dl/\\lambda)^2$ ולא באופן ליניארי."
      },
      {
        id: "em-q10-opt3",
        plainText: "$R_{rad} = 73\\,\\Omega$, והכיווניות היא $D = 1.64$.",
        isCorrect: false,
        explanation: "שגוי: $73\\,\\Omega$ ו-1.64 שייכים לדיפול חצי-גל (Half-wave dipole $\\lambda/2$), ולא לדיפול קצר אינפיניטסימלי."
      },
      {
        id: "em-q10-opt4",
        mathText: "R_{rad} = 80\\pi^2 \\left(\\frac{dl}{\\lambda}\\right)^2, \\quad D_{\\max} = 1.5",
        plainText: "$R_{rad} = 80\\pi^2 \\left(\\frac{dl}{\\lambda}\\right)^2 \\approx 789.6 \\left(\\frac{dl}{\\lambda}\\right)^2 \\Omega$, והכיווניות המקסימלית במישור המשווה היא $D = 1.5$ ($1.76\\text{ dBi}$).",
        isCorrect: true,
        explanation: "נכון: אינטגרל על כל המרחב: $\\int_0^\\pi \\sin^3\\theta d\\theta = 4/3$. ההספק המוקרן הכולל הוא $P_{rad} = \\frac{\\eta_0 I_0^2 (dl)^2 \\pi}{4\\lambda^2} \\cdot \\frac{4}{3} = \\frac{40\\pi^2 I_0^2}{3}\\left(\\frac{dl}{\\lambda}\\right)^2$ (עם $\\eta_0 = 120\\pi$). מהשוואה ל-$P_{rad} = \\frac{1}{2}I_0^2 R_{rad}$ מקבלים: $R_{rad} = 80\\pi^2(dl/\\lambda)^2\\,\\Omega$. הכיווניות מוגדרת כ-$D = \\frac{4\\pi U_{\\max}}{P_{rad}} = \\frac{4\\pi \\sin^2(90^\\circ)}{\\int_0^{2\\pi}\\int_0^\\pi \\sin^3\\theta d\\theta d\\phi} = \\frac{4\\pi}{2\\pi (4/3)} = \\frac{3}{2} = 1.5$."
      },
    ],
  },
  {
    id: "em-q11-tem-mode-impossibility-hollow-waveguide",
    domain: "אי-היתכנות אופן TEM במוליך גלים חלול בעל מוליך יחיד",
    title: "שדות אלקטרומגנטיים - אי-היתכנות אופן TEM במוליך גלים חלול בעל מוליך יחיד",
    context: "אופן תנודה TEM (Transverse Electromagnetic) מוגדר כמצב שבו השדה החשמלי והשדה המגנטי שניהם רוחביים לחלוטין לכיוון ההתקדמות ($E_z = 0, H_z = 0$).",
    formulaLatex: "\\nabla_t^2 \\Phi = 0 \\quad \\text{in cross-section } S, \\quad \\Phi|_{\\partial S} = \\text{const}",
    instruction: "מדוע אופן TEM **אינו יכול להתקיים כלל** בתוך מוליך גלים מתכתי חלול בעל מעטפת סגורה יחידה?",
    options: [
      {
        id: "em-q11-opt1",
        plainText: "משום שמהירות האור בתוך מוליך חלול שואפת לאפס ומקפיאה את השדות הרוחביים.",
        isCorrect: false,
        explanation: "שגוי: מהירות האור בריק שבתוך מוליך חלול היא $c$ רגילה לחלוטין."
      },
      {
        id: "em-q11-opt2",
        plainText: "משום שתדרי אופן TEM נבלמים על ידי תופעת יצירת חום בג׳ול על הדפנות.",
        isCorrect: false,
        explanation: "שגוי: אי-ההיתכנות היא טופולוגית-אלקטרוסטטית ומתקיימת גם במוליך-על ללא שום התנגדות או חום."
      },
      {
        id: "em-q11-opt3",
        plainText: "משום שאופן TEM דורש קיומם של מטענים מגנטיים חופשיים (מונופולים) על הדפנות.",
        isCorrect: false,
        explanation: "שגוי: אופן TEM מתקיים מצוין בכבל קואקסיאלי בעל שני מוליכים ללא שום מונופולים מגנטיים."
      },
      {
        id: "em-q11-opt4",
        plainText: "כאשר $E_z = 0$ השדה הרוחבי גזיר מפוטנציאל הרמוני דו-ממדי $\\nabla_t^2 \\Phi = 0$; מאחר שדפנות המוליך מהוות שפה שוות-פוטנציאל מחוברת יחידה, לפי עקרון המקסימום הפוטנציאל חייב להיות קבוע בכל השטח, מה שמאפס את השדה החשמלי לחלוטין ($\\vec{E}_t = -\\nabla_t \\Phi = 0$). אופן TEM מחייב לפחות שני מוליכים מבודדים נפרדים לקיום הפרש פוטנציאלים.",
        isCorrect: true,
        explanation: "נכון: עבור אופן TEM מתקיים $E_z = 0, B_z = 0$. ממשוואות מקסוול נובע שמשוואת השדה בחתך הרוחב שקולה לאלקטרוסטטיקה דו-ממדית: $\\vec{E}_t = -\\nabla_t \\Phi$ כאשר $\\nabla_t^2 \\Phi = 0$. דופן המתכת היא מוליך אידיאלי ולכן שוות-פוטנציאל ($\\Phi = V_0$ קבוע על כל השפה $\\partial S$). לפי משפט היחידות ועקרון המקסימום למשוואת לפלס בתחום פשוט-קשר חסום: אם פונקציה הרמונית קבועה על השפה, היא חייבת להיות קבועה זהותית בכל פנים התחום ($\\Phi(x,y) \\equiv V_0$). לכן השדה החשמלי מתאפס זהותית: $\\vec{E}_t = -\\nabla_t \\Phi = 0$, ואין גל. כדי שיתקיים פתרון לא-טריוויאלי חייבים לפחות שני מוליכים נפרדים (כמו קו דו-גידי או כבל קואקסיאלי) המאפשרים הפרש מתחים ביניהם."
      },
    ],
  },
  {
    id: "em-q12-smith-chart-quarter-wave-stub-location",
    domain: "דיאגרמת סמית׳ ותיאום באמצעות סטאב בודד (Single-Stub)",
    title: "שדות אלקטרומגנטיים - דיאגרמת סמית׳ ותיאום באמצעות סטאב בודד (Single-Stub)",
    context: "במעגל תיאום עכבות של קו תמסורת $Z_0$ עם עומס לא-מתואם $Z_L$, משתמשים בסטאב מקבילי (Shunt Stub) קצר או פתוח המחובר במרחק $d$ מהעומס.",
    instruction: "כיצד נקבע המרחק $d$ של הסטאב מהעומס בדיאגרמת סמית׳ (במישור האדמיטנס $y = Y/Y_0 = g + jb$)?",
    options: [
      {
        id: "em-q12-opt1",
        plainText: "המרחק $d$ נקבע בנקודה שבה החלק המדומה של האדמיטנס מתאפס ($b = 0$).",
        isCorrect: false,
        explanation: "שגוי: איפוס החלק המדומה מתרחש בנקודות מתח מקסימלי או מינימלי על הקו, אך שם המוליכות $g$ אינה שווה ל-1 ולכן חיבור סטאב מקבילי לא יתאם את המעגל."
      },
      {
        id: "em-q12-opt2",
        plainText: "המרחק $d$ נקבע תמיד בדיוק באורך חצי גל ($d = \\lambda/2$) מהעומס.",
        isCorrect: false,
        explanation: "שגוי: באורך חצי גל העכבה חוזרת בדיוק לערך העומס המקורי $Z_L$ ללא שינוי."
      },
      {
        id: "em-q12-opt3",
        plainText: "המרחק $d$ נקבע במרכז הדיאגרמה שבה מקדם ההחזרה שווה ל-1.",
        isCorrect: false,
        explanation: "שגוי: במרכז הדיאגרמה מקדם ההחזרה שווה ל-0 (תיאום מלא), ולא 1."
      },
      {
        id: "em-q12-opt4",
        plainText: "המרחק $d$ נקבע ע״י תנועה מהעומס לכיוון המחולל עד לנקודת המפגש הראשונה עם מעגל המוליכות היחידה ($g = 1$, המעגל שעובר במרכז הדיאגרמה), כך שהאדמיטנס במבוא הוא $y_{in} = 1 + jb$; אז מחברים סטאב מקבילי בעל סוספטנס מנוגד $b_{stub} = -b$ המאפס את החלק המדומה ומביא את המערכת למרכז הדיאגרמה ($y = 1 + j0$).",
        isCorrect: true,
        explanation: "נכון: עקרון התיאום בסטאב מקבילי: סטאב במקביל מוסיף אך ורק סוספטנס מדומה טהור ($j b_{stub}$), מבלי לשנות את החלק הממשי של האדמיטנס (המוליכות $g$). לכן, השלב הראשון הוא לנוע לאורך קו התמסורת מהעומס לעבר המקור (בכיוון השעון בדיאגרמת סמית׳) עד אשר האדמיטנס הנרמל פוגש את מעגל $g = 1$ (מעגל שבו המוליכות שווה בדיוק ל-$Y_0$). בנקודה זו $y = 1 + jb$. כעת, כל שנותר לעשות הוא לחבר במקביל סטאב באורך מחושב כך שיתרום בדיוק סוספטנס הפוך $b_{stub} = -b$. חיבור המקבילים נותן $y_{total} = y + j b_{stub} = (1 + jb) - jb = 1 + j0$, כלומר תיאום עכבות מלא למקור."
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_ELECTROMAGNETICS_QUESTIONS = ELECTROMAGNETICS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleElectromagneticsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = ELECTROMAGNETICS_QUESTIONS.slice(0, 3);
  const groupB = ELECTROMAGNETICS_QUESTIONS.slice(3, 6);
  const groupC = ELECTROMAGNETICS_QUESTIONS.slice(6, 12);

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
