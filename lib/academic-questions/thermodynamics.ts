import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic תרמודינמיקה הנדסית diagnostic bank (12Q).
 * Display name: "תרמודינמיקה הנדסית" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const THERMODYNAMICS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "thermo-q01-clausius-inequality-entropy-generation",
    domain: "אי-שוויון קלאוזיוס ויצירת אנטרופיה",
    title: "תרמודינמיקה - אי-שוויון קלאוזיוס ויצירת אנטרופיה",
    context: "אי-שוויון קלאוזיוס (Clausius Inequality) מהווה את הבסיס המתמטי להגדרת מושג האנטרופיה מתוך החוק השני של התרמודינמיקה עבור מחזור תרמודינמי סגור.",
    formulaLatex: "\\oint \\frac{\\delta Q}{T} \\le 0, \\quad \\Delta S = \\int_1^2 \\frac{\\delta Q}{T} + S_{gen}",
    instruction: "מה מתקיים לגבי האינטגרל $\\oint \\frac{\\delta Q}{T}$ במחזור הפיך לחלוטין מול מחזור בלתי-הפיך?",
    options: [
      {
        id: "thermo-q01-opt1",
        plainText: "במחזור הפיך מתקיים שוויון מלא $\\oint \\frac{\\delta Q}{T} = 0$, ובמחזור בלתי-הפיך (ממשי) האינטגרל שלילי ממש $\\oint \\frac{\\delta Q}{T} < 0$, מה שמוכיח שיצירת האנטרופיה חיובית תמיד ($S_{gen} > 0$).",
        isCorrect: true,
        explanation: "נכון: עבור מחזור הפיך לחלוטין (Internal & External Reversible), התהליך משמר איכות אנרגיה ואינטגרל המעגל מתאפס: $\\oint \\frac{\\delta Q_{rev}}{T} = 0$, מה שמוכיח שהפונקציה $dS = \\frac{\\delta Q_{rev}}{T}$ היא דיפרנציאל שלם ומהווה פונקציית מצב (State Variable). בנוכחות אי-הפיכויות פנימיות (חיכוך, ערבוב, מעבר חום במפל טמפרטורה סופי), יצירת האנטרופיה חיובית ($S_{gen} > 0$). ממאזן אנטרופיה למחזור ($0 = \\oint \\frac{\\delta Q}{T} + S_{gen}$) נובע בהכרח $\\oint \\frac{\\delta Q}{T} = -S_{gen} < 0$.",
      },
      {
        id: "thermo-q01-opt2",
        plainText: "במחזור בלתי-הפיך האינטגרל חיובי ממש $\\oint \\frac{\\delta Q}{T} > 0$ משום שהאנטרופיה של היקום גדלה תמיד.",
        isCorrect: false,
        explanation: "שגוי: אינטגרל קלאוזיוס של $\\delta Q/T$ במחזור בלתי הפיך הוא תמיד שלילי; הגידול באנטרופיה מתבטא ביצירת האנטרופיה הפנימית $S_{gen}$.",
      },
      {
        id: "thermo-q01-opt3",
        plainText: "האינטגרל מתאפס תמיד לכל מחזור אפשרי בטבע עקב חוק שימור האנרגיה (החוק הראשון).",
        isCorrect: false,
        explanation: "שגוי: החוק הראשון מבטיח $\\oint \\delta Q = \\oint \\delta W$, אך אינטגרל קלאוזיוס שוקל חום בטמפרטורה ושייך לחוק השני.",
      },
      {
        id: "thermo-q01-opt4",
        plainText: "האינטגרל אינו מוגדר למערכות המשתמשות בגז אידיאלי.",
        isCorrect: false,
        explanation: "שגוי: אי-שוויון קלאוזיוס הוא חוק אוניברסלי לכל זורם ולכל חומר עבודה בטבע.",
      },
    ],
  },
  {
    id: "thermo-q02-brayton-regenerative-effectiveness",
    domain: "מחזור ברייטון עם רגנרציה",
    title: "תרמודינמיקה - מחזור ברייטון לגזי שריפה עם רגנרציה (Regenerative Brayton Cycle)",
    context: "במחזור טורבינת גז (ברייטון) אידיאלי עם רגנרטור (מחליף חום בין גזי הפליטה של הטורבינה לאוויר הדחוס ביציאה מהמדחס), נצילות הרגנרטור מוגדרת כ-$\\epsilon = \\frac{h_5 - h_2}{h_4 - h_2}$.",
    formulaLatex: "\\eta_{th,regen} = 1 - \\left(\\frac{T_1}{T_3}\\right) (r_p)^{\\frac{\\gamma - 1}{\\gamma}}",
    instruction: "כיצד משפיעה הגדלת יחס הלחצים במדחס ($r_p = P_2/P_1$) על הנצילות התרמית של מחזור ברייטון עם רגנרציה מושלמת ($\\epsilon = 1$), לעומת מחזור ברייטון רגיל?",
    options: [
      {
        id: "thermo-q02-opt1",
        plainText: "במחזור עם רגנרציה הנצילות דווקא יורדת ככל ש-$r_p$ גדל (בניגוד למחזור רגיל שבו היא עולה), משום שהדחיסה מעלה את טמפרטורת מוצא המדחס ($T_2$) ומקטינה את פוטנציאל קליטת החום מגזי הפליטה של הטורבינה.",
        isCorrect: true,
        explanation: "נכון: במחזור ברייטון רגיל, $\\eta = 1 - (r_p)^{-(\\gamma-1)/\\gamma}$ עולה עם עליית יחס הלחצים. לעומת זאת, במחזור עם רגנרציה: $\\eta_{regen} = 1 - (T_1/T_3)(r_p)^{(\\gamma-1)/\\gamma}$. ככל ש-$r_p$ גדל, טמפרטורת האוויר ביציאה מהמדחס ($T_2$) מתקרבת לטמפרטורת הגזים הנפלטים מהטורבינה ($T_4$). אם $r_p$ גבוה מדי, $T_2$ אף תעלה מעל $T_4$, והרגנרטור יחמם את גזי הפליטה במקום את האוויר הדחוס. לכן ברגנרציה הנצילות מקסימלית דווקא ביחסי לחצים נמוכים.",
      },
      {
        id: "thermo-q02-opt2",
        plainText: "הנצילות במחזור רגנרציה עולה אקספוננציאלית עם $r_p$ ומגיעה ל-$100\\%$ ביחס לחצים של 20.",
        isCorrect: false,
        explanation: "שגוי: אף מחזור אינו מגיע ל-100% (סותר את חוק קלווין-פלאנק), וכאן הנצילות יורדת עם $r_p$.",
      },
      {
        id: "thermo-q02-opt3",
        plainText: "הנצילות קבועה לחלוטין ובלתי תלויה ביחס הלחצים עקב שימור אנרגיה ברגנרטור.",
        isCorrect: false,
        explanation: "שגוי: הנצילות תלויה חזק בטמפרטורות הכניסה והיציאה וב-$r_p$.",
      },
      {
        id: "thermo-q02-opt4",
        plainText: "רגנרטור אינו משפיע על הנצילות התרמית אלא רק מוריד את כוח ה-Back Work Ratio.",
        isCorrect: false,
        explanation: "שגוי: רגנרציה חוסכת שריפת דלק ומעלה דרמטית את הנצילות התרמית ביחסי לחץ מתאימים.",
      },
    ],
  },
  {
    id: "thermo-q03-throttling-joule-thomson-inversion",
    domain: "תהליך חניקה ומקדם ג׳ול-תומסון",
    title: "תרמודינמיקה - תהליך חניקה (Throttling) ומקדם ג׳ול-תומסון",
    context: "זורם עובר תהליך חניקה אדיאבטי דרך שסתום או ספוג נקבובי ללא ביצוע עבודה ($W = 0, Q = 0$). מקדם ג׳ול-תומסון מוגדר כ-$\\mu_{JT} = \\left(\\frac{\\partial T}{\\partial P}\\right)_h$.",
    formulaLatex: "h_1 = h_2, \\quad \\mu_{JT} = \\left(\\frac{\\partial T}{\\partial P}\\right)_h = \\frac{1}{c_p}\\left[ T \\left(\\frac{\\partial v}{\\partial T}\\right)_P - v \\right]",
    instruction: "מה מאפיין גז אידיאלי בתהליך חניקה, ומתי חניקה של גז ממשי גורמת לקירור ($T_2 < T_1$)?",
    options: [
      {
        id: "thermo-q03-opt1",
        plainText: "עבור גז אידיאלי $\\mu_{JT} = 0$ והטמפרטורה נשארת קבועה ($T_1 = T_2$); בגז ממשי מתרחש קירור (מפל לחץ גורר מפל טמפרטורה) אם ורק אם $\\mu_{JT} > 0$ (הגז נמצא מתחת לטמפרטורת האינוורסיה שלו).",
        isCorrect: true,
        explanation: "נכון: תהליך חניקה הוא איזואנתלפי ($h_1 = h_2$). באנתלפיה של גז אידיאלי $h = h(T)$ בלבד, ולכן $h_1 = h_2 \\implies T_1 = T_2$ (כלומר $\\mu_{JT} = 0$ זהותית). בגז ממשי, כוחות המשיכה הבין-מולקולריים דורשים אנרגיה פנימית לפירוקם בעת התפשטות. אם $\\mu_{JT} = \\left(\\frac{\\partial T}{\\partial P}\\right)_h > 0$, ירידת לחץ ($\\Delta P < 0$) תגרור ירידת טמפרטורה ($\\Delta T < 0$, קירור). מצב זה מתקיים בתוך עקומת האינוורסיה, המשמשת במערכות קירור והנזלת גזים (מחזור לינדה).",
      },
      {
        id: "thermo-q03-opt2",
        plainText: "גז אידיאלי תמיד מתקרר בחניקה עקב החוק הראשון, בעוד גז ממשי תמיד מתחמם.",
        isCorrect: false,
        explanation: "שגוי: גז אידיאלי אינו משנה את טמפרטורתו כלל בחניקה משום שהאנתלפיה שלו תלויה בטמפרטורה בלבד.",
      },
      {
        id: "thermo-q03-opt3",
        plainText: "תהליך חניקה הוא איזואנטרופי ($s_1 = s_2$), ולכן מפל הטמפרטורה נקבע לפי יחס ההתפשטות הפולטרופי.",
        isCorrect: false,
        explanation: "שגוי: חניקה היא תהליך בלתי-הפיך באופן מובהק שבו נוצרת אנטרופיה רבה עקב חיכוך והתפשטות חופשית ($s_2 > s_1$).",
      },
      {
        id: "thermo-q03-opt4",
        plainText: "מקדם ג׳ול-תומסון חיובי תמיד לכל גז בכל טמפרטורה, ולכן כל חניקה מייצרת קירור.",
        isCorrect: false,
        explanation: "שגוי: בטמפרטורות גבוהות (מעל טמפרטורת האינוורסיה, כמו מימן בטמפרטורת החדר) $\\mu_{JT} < 0$ וחניקה גורמת דווקא לחימום מסוכן.",
      },
    ],
  },
  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "thermo-q04-carnot-refrigerator-cop-limit",
    domain: "מקרר קרנו ומקדם ביצועים (COP)",
    title: "תרמודינמיקה - מקרר קרנו ומקדם ביצועים מקסימלי (COP)",
    context: "מקרר פועל במחזור קרנו הפוך ומפנה חום מחלל מקורר בטמפרטורה $T_L = -10^\\circ\\text{C}$ לסביבה בטמפרטורה $T_H = +30^\\circ\\text{C}$. קצב פינוי החום הנדרש הוא $\\dot{Q}_L = 10\\text{ kW}$.",
    formulaLatex: "T_L = 263.15\\text{ K}, \\quad T_H = 303.15\\text{ K}, \\quad \\text{COP}_{R,rev} = \\frac{T_L}{T_H - T_L}",
    instruction: "מהו מקדם הביצועים המקסימלי (COP) של המקרר, ומהו הספק העבודה המינימלי $\\dot{W}_{in}$ הנדרש להפעלתו?",
    options: [
      {
        id: "thermo-q04-opt1",
        plainText: "$\\text{COP} = 0.25$, וההספק הנדרש הוא $40\\text{ kW}$.",
        isCorrect: false,
        explanation: "שגוי: חישוב בטמפרטורות צלזיוס שגויות ($-10 / (30 - (-10)) = -0.25$); חובה להמיר לקלווין אבסולוטי.",
      },
      {
        id: "thermo-q04-opt2",
        mathText: "\\text{COP}_{R} = \\frac{263.15}{40} \\approx 6.58, \\quad \\dot{W}_{in} = \\frac{10}{6.58} \\approx 1.52\\text{ kW}",
        plainText: "$\\text{COP}_{rev} \\approx 6.58$, והספק העבודה המינימלי הוא $\\dot{W}_{in} \\approx 1.52\\text{ kW}$.",
        isCorrect: true,
        explanation: "נכון: המרת טמפרטורות לקלווין אבסולוטי היא חובה קריטית בתרמודינמיקה: $T_L = -10 + 273.15 = 263.15\\text{ K}$, ו-$T_H = 30 + 273.15 = 303.15\\text{ K}$. הפרש הטמפרטורות הוא $T_H - T_L = 40\\text{ K}$. מקדם הביצועים האידיאלי של מקרר קרנו: $\\text{COP}_{R,rev} = \\frac{T_L}{T_H - T_L} = \\frac{263.15}{40} \\approx 6.5788$. הספק העבודה המינימלי לפי הגדרת ה-COP: $\\dot{W}_{in} = \\frac{\\dot{Q}_L}{\\text{COP}} = \\frac{10\\text{ kW}}{6.5788} \\approx 1.52\\text{ kW}$.",
      },
      {
        id: "thermo-q04-opt3",
        plainText: "$\\text{COP}_{rev} = 7.58$, וההספק הוא $1.32\\text{ kW}$.",
        isCorrect: false,
        explanation: "שגוי: $7.58$ הוא מקדם הביצועים של משאבת חום ($\\text{COP}_{HP} = \\text{COP}_R + 1$), ולא של מקרר.",
      },
      {
        id: "thermo-q04-opt4",
        plainText: "$\\text{COP}_{rev} = 1.0$, וההספק שווה בדיוק לחום המפונה ($10\\text{ kW}$).",
        isCorrect: false,
        explanation: "שגוי: $\\text{COP}$ של מקרר אינו מוגבל ל-1 ויכול להיות גבוה בהרבה כאשר הפרש הטמפרטורות מתון.",
      },
    ],
  },
  {
    id: "thermo-q05-gouy-stodola-exergy-destruction",
    domain: "השמדת אקסרגיה ומשפט גואי-סטודולה",
    title: "תרמודינמיקה - השמדת אקסרגיה (זמינות) ומשפט גואי-סטודולה",
    context: "בתהליך תרמודינמי פתוח במצב מתמיד (Steady-Flow), מתרחש מעבר חום $\\dot{Q}$ דרך מעטפת המערכת בטמפרטורה $T_b$. טמפרטורת הסביבה היא $T_0$. קצב יצירת האנטרופיה הכולל במערכת ובסביבתה הוא $\\dot{S}_{gen}$.",
    formulaLatex: "\\dot{X}_{destroyed} = T_0 \\dot{S}_{gen}",
    instruction: "מה קובע משפט גואי-סטודולה (Gouy-Stodola Theorem) לגבי קצב השמדת האקסרגיה (אובדן פוטנציאל העבודה המקסימלית)?",
    options: [
      {
        id: "thermo-q05-opt1",
        plainText: "השמדת האקסרגיה שווה לאנטרופיה הנפלטת לסביבה מוכפלת בטמפרטורת הגבול $\\dot{X} = T_b \\dot{S}_{out}$.",
        isCorrect: false,
        explanation: "שגוי: המכפלה היא בטמפרטורת הסביבה האבסולוטית $T_0$ וביצירת האנטרופיה $S_{gen}$, ולא בטמפרטורת הגבול.",
      },
      {
        id: "thermo-q05-opt2",
        mathText: "\\dot{X}_{destroyed} = T_0 \\dot{S}_{gen} \\ge 0",
        plainText: "קצב אובדן פוטנציאל העבודה השימושית (השמדת האקסרגיה) פרופורציוני ישירות לקצב יצירת האנטרופיה הכולל ונתון במדויק ע״י $\\dot{X}_{destroyed} = T_0 \\dot{S}_{gen}$.",
        isCorrect: true,
        explanation: "נכון: משפט גואי-סטודולה הוא עקרון היסוד של אנליזת חוק שני (Exergy Analysis). הוא קובע כי אובדן העבודה השימושית המקסימלית (Irreversibility / Exergy Destruction) שווה למכפלת טמפרטורת הסביבה של הסביבה החופשית (Dead State Temperature $T_0$ בקלווין) בקצב יצירת האנטרופיה הכולל $\\dot{S}_{gen}$. בתהליך הפיך $\\dot{S}_{gen} = 0 \\implies \\dot{X}_{destroyed} = 0$, ובכל תהליך ממסי מתקיים $\\dot{X}_{destroyed} > 0$.",
      },
      {
        id: "thermo-q05-opt3",
        plainText: "האקסרגיה נשמרת תמיד בכל תהליך לפי חוק שימור הזמינות של גיבס.",
        isCorrect: false,
        explanation: "שגוי: אנרגיה אכן נשמרת תמיד (חוק ראשון), אך אקסרגיה מושמדת תמיד בכל תהליך בלתי-הפיך עקב פיחות באיכות האנרגיה.",
      },
      {
        id: "thermo-q05-opt4",
        plainText: "השמדת האקסרגיה שווה לעבודה המופקת בפועל $\\dot{W}_{act}$.",
        isCorrect: false,
        explanation: "שגוי: השמדת האקסרגיה היא הפער בין העבודה המקסימלית התאורטית ההפיכה לבין העבודה המופקת בפועל.",
      },
    ],
  },
  {
    id: "thermo-q06-rankine-reheat-moisture-reduction",
    domain: "מחזור רנקין עם חימום ביניים",
    title: "תרמודינמיקה - מחזור רנקין לקיטור עם חימום ביניים (Reheat Rankine Cycle)",
    context: "בתחנת כוח תרמית הפועלת במחזור רנקין עם חימום ביניים (Reheat), הקיטור מתפשט בטורבינת לחץ גבוה (HPT), מוחזר לדוד ומחומם שנית בלחץ קבוע לטמפרטורת השיא, ואז מתפשט בטורבינת לחץ נמוך (LPT) אל המעבה.",
    instruction: "מהו היתרון התפעולי והתרמודינמי המרכזי של שלב חימום הביניים מעבר להעלאה מתונה בנצילות?",
    options: [
      {
        id: "thermo-q06-opt1",
        plainText: "הוא מבטל לחלוטין את הצורך במשאבת הזנה לדוד המים.",
        isCorrect: false,
        explanation: "שגוי: משאבת ההזנה נדרשת תמיד כדי להעלות את לחץ המים מלחץ המעבה הנמוך ללחץ הדוד הגבוה.",
      },
      {
        id: "thermo-q06-opt2",
        plainText: "הוא מסיט את מסלול ההתפשטות ימינה בדיאגרמת $T-s$, ובכך מקטין דרמטית את תכולת הלחות (מעלה את איכות הקיטור $x$) בדרגות האחרונות של הטורבינה ומונע שחיקה וארוזיה של הלהבים.",
        isCorrect: true,
        explanation: "נכון: בהתפשטות רציפה מלחץ גבוה מאוד ללחץ מעבה נמוך (למשל $0.08\\text{ bar}$), הקיטור נכנס עמוק לתוך אזור התערובת הרטובה ואיכות הקיטור עלולה לרדת מתחת ל-$88\\%$ ($x < 0.88$). טיפות המים הנוצרות בקיטור פוגעות במהירות על-קולית בלהבי הטורבינה וגורמות לשחיקה וארוזיה מכנית חמורה. ע״י עצירת ההתפשטות בלחץ ביניים וחימום מחדש של הקיטור לטמפרטורה גבוהה, עקומת ההתפשטות בטורבינת הלחץ הנמוך מוסטת ימינה בדיאגרמת $T-s$, והקיטור יוצא מהטורבינה כשהוא יבש כמעט לחלוטין ($x > 0.92-0.95$), מה שמאריך את חיי הטורבינה.",
      },
      {
        id: "thermo-q06-opt3",
        plainText: "הוא מאפשר לדחוס את המים במצב גזי טהור בתוך המעבה.",
        isCorrect: false,
        explanation: "שגוי: במעבה הקיטור מתעבה לנוזל רווי מלא כדי לאפשר דחיסת נוזל חסכונית במשאבה.",
      },
      {
        id: "thermo-q06-opt4",
        plainText: "הוא מכפיל את טמפרטורת השריפה המרבית מעבר לגבול המטלורגי של הפלדה.",
        isCorrect: false,
        explanation: "שגוי: הטמפרטורה המקסימלית מוגבלת תמיד על ידי המטלורגיה של הצינורות (כ-$560-600^\\circ\\text{C}$) ואסור לחרוג ממנה.",
      },
    ],
  },
  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "thermo-q07-maxwell-relations-helmholtz-free-energy",
    domain: "יחסי מקסוול ופונקציות תרמודינמיות",
    title: "תרמודינמיקה - יחסי מקסוול ופונקציות תרמודינמיות",
    context: "האנרגיה החופשית של הלמהולץ מוגדרת כ-$a = u - Ts$, והדיפרנציאל השלם שלה הוא $da = -s dT - P dv$.",
    formulaLatex: "da = -s\\,dT - P\\,dv \\implies \\left(\\frac{\\partial a}{\\partial T}\\right)_v = -s, \\; \\left(\\frac{\\partial a}{\\partial v}\\right)_T = -P",
    instruction: "איזה מקשרי מקסוול (Maxwell Relations) נגזר ישירות משוויון הנגזרות המעורבות של האנרגיה החופשית של הלמהולץ?",
    options: [
      {
        id: "thermo-q07-opt1",
        plainText: "$\\left(\\frac{\\partial T}{\\partial v}\\right)_s = -\\left(\\frac{\\partial P}{\\partial s}\\right)_v$",
        isCorrect: false,
        explanation: "שגוי: קשר זה נגזר מהאנרגיה הפנימית $du = Tds - Pdv$.",
      },
      {
        id: "thermo-q07-opt2",
        plainText: "$\\left(\\frac{\\partial T}{\\partial P}\\right)_s = \\left(\\frac{\\partial v}{\\partial s}\\right)_P$",
        isCorrect: false,
        explanation: "שגוי: קשר זה נגזר מהאנתלפיה $dh = Tds + vdP$.",
      },
      {
        id: "thermo-q07-opt3",
        mathText: "\\left(\\frac{\\partial s}{\\partial v}\\right)_T = \\left(\\frac{\\partial P}{\\partial T}\\right)_v",
        plainText: "$\\left(\\frac{\\partial s}{\\partial v}\\right)_T = \\left(\\frac{\\partial P}{\\partial T}\\right)_v$",
        isCorrect: true,
        explanation: "נכון: מכיוון ש-$da$ הוא דיפרנציאל שלם של פונקציית מצב חלקה, לפי משפט שוורץ הנגזרות החלקיות המעורבות שוות: $\\frac{\\partial}{\\partial v}\\left[\\left(\\frac{\\partial a}{\\partial T}\\right)_v\\right]_T = \\frac{\\partial}{\\partial T}\\left[\\left(\\frac{\\partial a}{\\partial v}\\right)_T\\right]_v$. נציב את הנגזרות מהדיפרנציאל: $\\left(\\frac{\\partial a}{\\partial T}\\right)_v = -s$ ו-$\\left(\\frac{\\partial a}{\\partial v}\\right)_T = -P$. נקבל: $\\frac{\\partial(-s)}{\\partial v}\\Big|_T = \\frac{\\partial(-P)}{\\partial T}\\Big|_v \\implies \\left(\\frac{\\partial s}{\\partial v}\\right)_T = \\left(\\frac{\\partial P}{\\partial T}\\right)_v$. זהו קשר מקסוול קריטי המאפשר למדוד שינויי אנטרופיה מתוך משוואת מצב $P(v, T)$ בלבד.",
      },
      {
        id: "thermo-q07-opt4",
        plainText: "$\\left(\\frac{\\partial s}{\\partial P}\\right)_T = -\\left(\\frac{\\partial v}{\\partial T}\\right)_P$",
        isCorrect: false,
        explanation: "שגוי: קשר זה נגזר מהאנרגיה החופשית של גיבס $dg = vdP - sdT$.",
      },
    ],
  },
  {
    id: "thermo-q08-polytropic-work-isothermal-limit",
    domain: "תהליך פוליטרופי ועבודת התפשטות",
    title: "תרמודינמיקה - תהליך פוליטרופי ועבודת התפשטות בגז אידיאלי",
    context: "גז אידיאלי בעל מסה $m$ וקבוע גז $R$ עובר תהליך התפשטות פוליטרופי $P v^n = \\text{const}$ ממצב $(P_1, V_1)$ למצב $(P_2, V_2)$.",
    formulaLatex: "W_{12} = \\int_1^2 P\\,dV = \\frac{P_2 V_2 - P_1 V_1}{1 - n} = \\frac{m R (T_2 - T_1)}{1 - n} \\quad (n \\neq 1)",
    instruction: "מהו ביטוי העבודה כאשר מקדם הפוליטרופיה שואף ל-1 ($n \\to 1$, תהליך איזותרמי)?",
    options: [
      {
        id: "thermo-q08-opt1",
        plainText: "$W_{12} = 0$ (אין עבודה בתהליך איזותרמי)",
        isCorrect: false,
        explanation: "שגוי: בהתפשטות בטמפרטורה קבועה הנפח גדל והמערכת מבצעת עבודה חיובית רבה ע״י קליטת חום.",
      },
      {
        id: "thermo-q08-opt2",
        plainText: "$W_{12} = P_1(V_2 - V_1)$",
        isCorrect: false,
        explanation: "שגוי: זהו ביטוי לעבודה בתהליך איזוברי ($n=0$, לחץ קבוע), ולא איזותרמי.",
      },
      {
        id: "thermo-q08-opt3",
        mathText: "W_{12} = m R T \\ln\\left(\\frac{V_2}{V_1}\\right)",
        plainText: "$W_{12} = P_1 V_1 \\ln\\left(\\frac{V_2}{V_1}\\right) = m R T \\ln\\left(\\frac{P_1}{P_2}\\right)$",
        isCorrect: true,
        explanation: "נכון: כאשר $n = 1$, נוסחת הפוליטרופיה נותנת $PV = \\text{const} = C$. מאינטגרציה ישירה: $W_{12} = \\int_{V_1}^{V_2} \\frac{C}{V} dV = C \\ln(V_2/V_1) = P_1 V_1 \\ln(V_2/V_1)$. בגז אידיאלי $PV = mRT$, ומכיוון ש-$T = \\text{const}$ מתקיים $V_2/V_1 = P_1/P_2$. (ניתן גם לקבל זאת מגבול לופיטל על הנוסחה הכללית: $\\lim_{n \\to 1} \\frac{P_1 V_1 ((V_1/V_2)^{n-1} - 1)}{1 - n} = P_1 V_1 \\ln(V_2/V_1)$).",
      },
      {
        id: "thermo-q08-opt4",
        plainText: "$W_{12} = \\frac{m R T}{\\gamma - 1}$",
        isCorrect: false,
        explanation: "שגוי: ביטוי זה קשור לעבודה אדיאבטית איזואנטרופית ($n = \\gamma$).",
      },
    ],
  },
  {
    id: "thermo-q09-van-der-waals-critical-constants",
    domain: "משוואת ואן דר ואלס והנקודה הקריטית",
    title: "תרמודינמיקה - משוואת ואן דר ואלס והנקודה הקריטית",
    context: "משוואת המצב של ואן דר ואלס לגזים ממשיים היא $\\left(P + \\frac{a}{v^2}\\right)(v - b) = R T$. בנקודה הקריטית האיזותרמה מגיעה לנקודת פיתול עם משיק אופקי.",
    formulaLatex: "\\left(\\frac{\\partial P}{\\partial v}\\right)_{T=T_c} = 0, \\quad \\left(\\frac{\\partial^2 P}{\\partial v^2}\\right)_{T=T_c} = 0",
    instruction: "מהם ערכי הנפח הקריטי $v_c$ והפקטור הדחיסות הקריטי $Z_c = \\frac{P_c v_c}{R T_c}$ החזויים אוניברסלית לפי ואן דר ואלס?",
    options: [
      {
        id: "thermo-q09-opt1",
        plainText: "$v_c = b$, ו-$Z_c = 1.0$",
        isCorrect: false,
        explanation: "שגוי: $v = b$ הוא הנפח המינימלי שבו המכנה מתאפס (גבול מוצק), ו-$Z=1$ מתאים לגז אידיאלי בלבד.",
      },
      {
        id: "thermo-q09-opt2",
        plainText: "$v_c = 2b$, ו-$Z_c = 0.5$",
        isCorrect: false,
        explanation: "שגוי: ערכים שגויים הנובעים מאי-הכללת הנגזרת השנייה.",
      },
      {
        id: "thermo-q09-opt3",
        mathText: "v_c = 3b, \\quad Z_c = \\frac{P_c v_c}{R T_c} = \\frac{3}{8} = 0.375",
        plainText: "$v_c = 3b$, ופקטור הדחיסות הקריטי הוא קבוע אוניברסלי $Z_c = \\frac{3}{8} = 0.375$ לכל גז ואן דר ואלס.",
        isCorrect: true,
        explanation: "נכון: נבודד את הלחץ: $P = \\frac{RT}{v-b} - \\frac{a}{v^2}$. נגזור פעמיים לפי $v$ ונשווה לאפס: $\\frac{\\partial P}{\\partial v} = -\\frac{RT}{(v-b)^2} + \\frac{2a}{v^3} = 0$, וכן $\\frac{\\partial^2 P}{\\partial v^2} = \\frac{2RT}{(v-b)^3} - \\frac{6a}{v^4} = 0$. חלוקת המשוואות מניבה ישירות: $\\frac{v-b}{2} = \\frac{v}{3} \\implies 3v - 3b = 2v \\implies v_c = 3b$. הצבה חוזרת נותנת $T_c = \\frac{8a}{27Rb}$ ו-$P_c = \\frac{a}{27b^2}$. חישוב פקטור הדחיסות בנקודה הקריטית: $Z_c = \\frac{P_c v_c}{R T_c} = \\frac{(a / 27b^2)(3b)}{R (8a / 27Rb)} = \\frac{3/27}{8/27} = \\frac{3}{8} = 0.375$.",
      },
      {
        id: "thermo-q09-opt4",
        plainText: "$v_c = 8b$, ו-$Z_c = 0.28$ המשתנה בהתאם למסה המולרית.",
        isCorrect: false,
        explanation: "שגוי: במודל ואן דר ואלס הפקטור $Z_c$ הוא חסר ממדים ובלתי תלוי בפרמטרים $a, b$ או במסה המולרית.",
      },
    ],
  },
  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "thermo-q10-entropy-mixing-gibbs-paradox",
    domain: "אנטרופיית ערבוב ופרדוקס גיבס",
    title: "תרמודינמיקה - אנטרופיית ערבוב של גזים אידיאליים ופרדוקס גיבס",
    context: "מכל מבודד קשיח מחולק לשני תאים שווים בנפח $V$: תא אחד מכיל $N$ מולקולות של גז אידיאלי $A$, ותא שני מכיל $N$ מולקולות של גז אידיאלי $B$ באותו לחץ $P$ וטמפרטורה $T$. מסירים את המחיצה והגזים מתערבבים.",
    formulaLatex: "\\Delta S_{mix} = -k_B \\sum N_i \\ln(x_i) = -n R \\sum x_i \\ln x_i",
    instruction: "מהו השינוי באנטרופיה $\\Delta S$ אם שני הגזים שונים זה מזה ($A \\neq B$), לעומת המצב שבו שני התאים הכילו את אותו הגז בדיוק ($A = B$, פרדוקס גיבס)?",
    options: [
      {
        id: "thermo-q10-opt1",
        plainText: "בשני המקרים $\\Delta S = 0$ משום שהמכל קשיח ומבודד ואין מעבר חום חיצוני.",
        isCorrect: false,
        explanation: "שגוי: ערבוב גזים שונים הוא תהליך בלתי-הפיך המייצר אנטרופיה גם ללא מעבר חום.",
      },
      {
        id: "thermo-q10-opt2",
        plainText: "בשני המקרים $\\Delta S = 2N k_B \\ln 2$ עקב הכפלת הנפח הזמין לכל מולקולה.",
        isCorrect: false,
        explanation: "שגוי: הסרת מחיצה בין שני גזים זהים היא תהליך הפיך סטטיסטית שאינו משנה את מצב המערכת, ולכן עבור גזים זהים השינוי באנטרופיה חייב להיות אפס (פרדוקס גיבס שנפתר ע״י חלוקה ב-$N!$).",
      },
      {
        id: "thermo-q10-opt3",
        plainText: "עבור גזים שונים $\\Delta S < 0$, ועבור גזים זהים $\\Delta S > 0$.",
        isCorrect: false,
        explanation: "שגוי: אנטרופיית ערבוב של מערכת מבודדת לעולם אינה יכולה לרדת לפי החוק השני.",
      },
      {
        id: "thermo-q10-opt4",
        mathText: "A \\neq B \\implies \\Delta S = 2N k_B \\ln 2, \\quad A = B \\implies \\Delta S = 0",
        plainText: "עבור גזים שונים מתרחש ערבוב בלתי-הפיך ונוצרת אנטרופיה $\\Delta S = 2N k_B \\ln 2 > 0$; עבור גזים זהים לחלוטין התהליך הפיך ואין שום שינוי במצב המקרוסקופי ולכן $\\Delta S = 0$.",
        isCorrect: true,
        explanation: "נכון: עבור גזים הניתנים להבחנה (Distinguishable, $A \\neq B$), כל גז מתפשט חופשית לנפח כפול $2V$. שינוי האנטרופיה של כל גז הוא $\\Delta S_i = N k_B \\ln(V_f/V_i) = N k_B \\ln 2$. סך השינוי הוא $\\Delta S_{mix} = 2N k_B \\ln 2$. לעומת זאת, כאשר הגזים זהים לחלוטין (Indistinguishable), הסרת המחיצה אינה משנה שום גודל תרמודינמי מקרוסקופי (הטמפרטורה, הלחץ והצפיפות נשארים $T, P, N/V$). החזרת המחיצה משחזרת את המצב המקורי ללא השקעת עבודה, ולכן עבור גזים זהים $\\Delta S = 0$. הפרדוקס הקלאסי נפתר במכניקה סטטיסטית ע״י פקטור חוסר-ההבחנה $1/N!$ של גיבס.",
      },
    ],
  },
  {
    id: "thermo-q11-otto-vs-diesel-efficiency-comparison",
    domain: "השוואת נצילות אוטו מול דיזל",
    title: "תרמודינמיקה - השוואת נצילות מחזור אוטו (Otto) מול דיזל (Diesel)",
    context: "משווים בין מחזור אוטו אידיאלי (הוספת חום בנפח קבוע) למחזור דיזל אידיאלי (הוספת חום בלחץ קבוע, יחס קטעון $r_c = v_3/v_2 > 1$). נצילות דיזל נתונה ע״י $\\eta_{Diesel} = 1 - \\frac{1}{r^{\\gamma - 1}} \\left[ \\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} \\right]$.",
    formulaLatex: "\\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} > 1 \\quad \\forall r_c > 1, \\; \\gamma > 1",
    instruction: "מה ניתן לקבוע לגבי הנצילות התרמית של שני המחזורים כאשר משווים ביניהם עבור אותו יחס דחיסה $r$?",
    options: [
      {
        id: "thermo-q11-opt1",
        plainText: "מחזור דיזל תמיד יעיל יותר ממחזור אוטו עבור אותו יחס דחיסה.",
        isCorrect: false,
        explanation: "שגוי: במציאות מנוע דיזל יעיל יותר רק משום שהוא מסוגל לפעול ביחס דחיסה גבוה בהרבה (ללא Detonation), אך מתמטית באותו יחס דחיסה אוטו יעיל יותר.",
      },
      {
        id: "thermo-q11-opt2",
        plainText: "לשני המחזורים אותה נצילות תרמית מדויקת התלויה רק ב-$r$.",
        isCorrect: false,
        explanation: "שגוי: הסוגריים המרובעים בדיזל תלויים ביחס הקיטוע $r_c$ ומקטינים את הנצילות.",
      },
      {
        id: "thermo-q11-opt3",
        plainText: "נצילות מחזור אוטו אינה תלויה במקדם הפוליטרופי $\\gamma$.",
        isCorrect: false,
        explanation: "שגוי: נצילות אוטו תלויה מפורשות ב-$\\gamma$: $\\eta = 1 - r^{-(\\gamma-1)}$.",
      },
      {
        id: "thermo-q11-opt4",
        mathText: "\\eta_{Otto} > \\eta_{Diesel} \\quad (\\text{for same } r)",
        plainText: "עבור אותו יחס דחיסה $r$, מחזור אוטו יעיל יותר ממחזור דיזל ($\\eta_{Otto} > \\eta_{Diesel}$), משום שהסוגריים המרובעים בדיזל גדולים ממש מ-1 לכל $r_c > 1$.",
        isCorrect: true,
        explanation: "נכון: מאחר ש-$r_c > 1$ ו-$\\gamma > 1$, הפונקציה הקמורה $f(x) = x^\\gamma$ מקיימת תמיד $\\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} > 1$. לכן הביטוי המופחת מ-1 בנוסחת נצילות הדיזל גדול יותר מהביטוי המופחת בנוסחת אוטו ($1/r^{\\gamma-1}$), מה שגורר $\\eta_{Otto} > \\eta_{Diesel}$ עבור אותו $r$. הסיבה הפיזיקלית: הוספת חום בנפח קבוע (אוטו) מתרחשת בטמפרטורה ממוצעת גבוהה יותר מאשר הוספת חום בלחץ קבוע שבו הנפח גדל והטמפרטורה נבנית בהדרגה.",
      },
    ],
  },
  {
    id: "thermo-q12-psychrometrics-relative-humidity-dew-point",
    domain: "אוויר לח וטמפרטורת נקודת הטל",
    title: "תרמודינמיקה - תרמודינמיקה של אוויר לח וטמפרטורת נקודת הטל",
    context: "תערובת אוויר-אדי מים נמצאת בלחץ כולל $P = 100\\text{ kPa}$ ובטמפרטורת בצל יבש $T = 25^\\circ\\text{C}$. לחץ האדים החלקי של המים באוויר נמדד כ-$P_v = 1.57\\text{ kPa}$. לחץ הרוויה של מים ב-25°C הוא $P_{sat}(25^\\circ\\text{C}) = 3.17\\text{ kPa}$, ולחץ הרוויה ב-13.8°C הוא $1.57\\text{ kPa}$.",
    formulaLatex: "\\phi = \\frac{P_v}{P_{sat}(T)}, \\quad T_{dp} = T_{sat}(P_v)",
    instruction: "מהי הלחות היחסית (Relative Humidity) $\\phi$ של האוויר, ומהי טמפרטורת נקודת הטל (Dew Point Temperature) $T_{dp}$?",
    options: [
      {
        id: "thermo-q12-opt1",
        plainText: "$\\phi = 100\\%$, ו-$T_{dp} = 25^\\circ\\text{C}$ (האוויר רווי לחלוטין).",
        isCorrect: false,
        explanation: "שגוי: לחץ האדים $1.57\\text{ kPa}$ נמוך בהרבה מלחץ הרוויה $3.17\\text{ kPa}$, ולכן האוויר אינו רווי.",
      },
      {
        id: "thermo-q12-opt2",
        plainText: "$\\phi = 1.57\\%$, ו-$T_{dp} = 0^\\circ\\text{C}$.",
        isCorrect: false,
        explanation: "שגוי: לחות יחסית היא היחס בין לחץ האדים ללחץ הרוויה, ולא ערך הלחץ עצמו.",
      },
      {
        id: "thermo-q12-opt3",
        plainText: "$\\phi = 25\\%$, ו-$T_{dp} = 10^\\circ\\text{C}$.",
        isCorrect: false,
        explanation: "שגוי: שגיאת חישוב של יחס הלחצים.",
      },
      {
        id: "thermo-q12-opt4",
        mathText: "\\phi = \\frac{P_v}{P_{sat}(T)} = \\frac{1.57}{3.17} \\approx 49.5\\%, \\quad T_{dp} = T_{sat}(P_v) = 13.8^\\circ\\text{C}",
        plainText: "$\\phi = \\frac{1.57}{3.17} \\approx 49.5\\%$, וטמפרטורת נקודת הטל היא $T_{dp} = 13.8^\\circ\\text{C}$ (הטמפרטורה שבה יחל עיבוי אם האוויר יקורר בלחץ קבוע).",
        isCorrect: true,
        explanation: "נכון: 1. לחות יחסית מוגדרת כיחס בין לחץ האדים בפועל ללחץ הרוויה בטמפרטורת האוויר: $\\phi = \\frac{P_v}{P_{sat}(T)} = \\frac{1.57\\text{ kPa}}{3.17\\text{ kPa}} \\approx 0.4953 = 49.5\\%$. 2. טמפרטורת נקודת הטל ($T_{dp}$) היא הטמפרטורה שבה אדי המים יגיעו למצב רוויה ($P_v = P_{sat}$) אם האוויר יקורר בלחץ קבוע ללא שינוי בכמות הלחות. מכיוון שנתון שלחץ הרוויה ב-$13.8^\\circ\\text{C}$ שווה ל-$1.57\\text{ kPa}$, זוהי בדיוק נקודת הטל שבה תתחיל התעבות טל.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_THERMODYNAMICS_QUESTIONS = THERMODYNAMICS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleThermodynamicsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = THERMODYNAMICS_QUESTIONS.slice(0, 3);
  const groupB = THERMODYNAMICS_QUESTIONS.slice(3, 6);
  const groupC = THERMODYNAMICS_QUESTIONS.slice(6, 12);

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
