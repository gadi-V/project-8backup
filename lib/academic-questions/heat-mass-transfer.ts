import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic מעבר חום ומעבר מסה diagnostic bank (12Q).
 * Display name: "מעבר חום ומעבר מסה" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const HEAT_MASS_TRANSFER_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "hmt-q01-critical-radius-of-insulation",
    domain: "רדיוס בידוד קריטי",
    title: "מעבר חום ומעבר מסה - רדיוס בידוד קריטי עבור צינור מעגלי",
    context:
      "צינור גלילי מעגלי בעל רדיוס חיצוני $r_1$ עוטף זורם חם. מצפים את הצינור בשכבת בידוד תרמי בעלת מוליכות חום $k$. מעבר החום החיצוני לאוויר מתבצע בהסעה חופשית עם מקדם $h$.",
    formulaLatex:
      "R_{total}(r) = \\frac{\\ln(r/r_1)}{2\\pi k L} + \\frac{1}{2\\pi r h L}, \\quad \\frac{dR_{total}}{dr} = 0 \\implies r_{cr} = \\frac{k}{h}",
    instruction:
      "מהו רדיוס הבידוד הקריטי $r_{cr}$, ומה מתרחש לקצב איבוד החום $\\dot{Q}$ אם מוסיפים בידוד לצינור שרדיוסו ההתחלתי קטן מרדיוס זה ($r_1 < r_{cr}$)?",
    options: [
      {
        id: "hmt-q01-opt1",
        plainText:
          "רדיוס הבידוד הקריטי הוא $r_{cr} = \\frac{k}{h}$; אם $r_1 < r_{cr}$, הוספת שכבת בידוד דקה תגדיל בהכרח את קצב איבוד החום, משום שהגדלת שטח הפנים החיצוני להסעה דומיננטית יותר מתוספת ההתנגדות להולכה.",
        isCorrect: true,
        explanation:
          "נכון: ההתנגדות הכוללת היא $R = \\frac{\\ln(r/r_1)}{2\\pi k L} + \\frac{1}{2\\pi r h L}$. גזירה לפי $r$ והשוואה לאפס נותנת $\\frac{dR}{dr} = \\frac{1}{2\\pi k L r} - \\frac{1}{2\\pi h L r^2} = 0$, ולכן $r_{cr} = \\frac{k}{h}$. הנגזרת השנייה חיובית, וב-$r_{cr}$ ההתנגדות התרמית מינימלית וקצב איבוד החום מקסימלי. אם $r_1 < r_{cr}$ (נפוץ בחוטי חשמל דקים), הוספת בידוד מקטינה את ההתנגדות הכוללת ומגבירה את איבוד החום, עד שהרדיוס החיצוני חוצה את $r_{cr}$.",
      },
      {
        id: "hmt-q01-opt2",
        plainText: "הוספת בידוד תמיד מקטינה את איבוד החום לכל גיאומטריה ולכל רדיוס לפי החוק הראשון.",
        isCorrect: false,
        explanation:
          "שגוי: תפיסה זו נכונה לקיר מישורי שטוח שבו השטח קבוע, אך בצינור השטח החיצוני גדל עם עובי הבידוד.",
      },
      {
        id: "hmt-q01-opt3",
        plainText: "רדיוס הבידוד הקריטי הוא $r_{cr} = \\frac{h}{k}$, ואיבוד החום מתאפס בנקודה זו.",
        isCorrect: false,
        explanation:
          "שגוי: יחידות המידה הפוכות ($k/h$ נמדד במטרים, בעוד $h/k$ הוא $1/\\text{m}$), ואיבוד החום מקסימלי ולא אפס.",
      },
      {
        id: "hmt-q01-opt4",
        plainText: "רדיוס קריטי קיים אך ורק בקרינה תרמית לפי חוק סטפן-בולצמן.",
        isCorrect: false,
        explanation: "שגוי: רדיוס קריטי נובע משילוב הולכה גלילית והסעה חיצונית, ואינו תוצאה של קרינה.",
      },
    ],
  },
  {
    id: "hmt-q02-biot-number-lumped-capacitance",
    domain: "מספר ביו וקיבול מקובץ",
    title: "מעבר חום ומעבר מסה - הולכת חום לא-מתמדת ומודל הקיבול המקובץ",
    context:
      "גוף מוצק בטמפרטורה $T_i$ מוכנס לנוזל קירור בטמפרטורה $T_\\infty$ עם מקדם הסעה $h$. מוליכות החום של המוצק היא $k$, נפחו $V$ ושטח פניו $A$. האורך האופייני הוא $L_c = V/A$. מספר ביו מוגדר כ-$Bi = \\frac{h L_c}{k}$.",
    formulaLatex: "Bi = \\frac{L_c/k}{1/h} = \\frac{h L_c}{k}",
    instruction:
      "מהו התנאי המתמטי המקובל להפעלת מודל הקיבול המקובץ (הנחת טמפרטורה מרחבית אחידה בגוף בכל רגע, $T(x,t) \\approx T(t)$)?",
    options: [
      {
        id: "hmt-q02-opt1",
        plainText:
          "$Bi < 0.1$; התנגדות ההולכה בתוך המוצק זניחה ביחס להתנגדות ההסעה בשפה, ולכן מפל הטמפרטורה הפנימי זניח ושגיאת המודל נמוכה מכ-$5\\%$.",
        mathText: "Bi = \\frac{h L_c}{k} < 0.1",
        isCorrect: true,
        explanation:
          "נכון: מספר ביו הוא היחס בין התנגדות ההולכה הפנימית להתנגדות ההסעה החיצונית: $Bi = \\frac{R_{cond}}{R_{conv}} = \\frac{h L_c}{k}$. אם $Bi < 0.1$, צוואר הבקבוק הוא השפה בלבד, גרדיאנט הטמפרטורה בתוך המוצק זניח, וניתן לכתוב $T(t) = T_\\infty + (T_i - T_\\infty)e^{-t/\\tau}$ כאשר $\\tau = \\frac{\\rho V c_p}{h A}$. אם $Bi > 0.1$ חובה לפתור את משוואת הדיפוזיה המרחבית (טורי פורייה / תרשימי הייזלר).",
      },
      {
        id: "hmt-q02-opt2",
        plainText: "$Bi > 100$; הגוף מוליך חום מושלם רק כאשר מקדם ההסעה שואף לאינסוף.",
        isCorrect: false,
        explanation:
          "שגוי: אם $Bi > 100$ התנגדות ההולכה הפנימית עצומה, פני השטח מתקררים מיד ופנים הגוף נשאר חם (פילוג מרחבי תלול).",
      },
      {
        id: "hmt-q02-opt3",
        plainText: "$Bi = 1$; כאשר שתי ההתנגדויות שוות במדויק מתקבל איזון תרמי.",
        isCorrect: false,
        explanation:
          "שגוי: עבור $Bi = 1$ מפל הטמפרטורה הפנימי משמעותי, והנחת הקיבול המקובץ שגויה בעשרות אחוזים.",
      },
      {
        id: "hmt-q02-opt4",
        plainText: "המודל תקף תמיד לכל גוף ללא תלות במספר ביו, בתנאי שמספר נוסלט $Nu < 1$.",
        isCorrect: false,
        explanation:
          "שגוי: מספר ביו מודד הולכה במוצק ($k_{solid}$), בעוד שמספר נוסלט מודד הסעה בזורם ($k_{fluid}$). אסור לבלבל ביניהם.",
      },
    ],
  },
  {
    id: "hmt-q03-fin-effectiveness-conduction-criterion",
    domain: "צלעות קירור ויעילותן",
    title: "מעבר חום ומעבר מסה - צלעות קירור ויעילות תוספת שטח",
    context:
      "צלע קירור בעלת שטח חתך $A_c$, היקף $P$ ומוליכות חום $k$ מותקנת על משטח להגברת פינוי חום להסעה בעלת מקדם $h$. יעילות הצלע (Fin Effectiveness) מוגדרת כיחס בין החום המפונה ע״י הצלע לחום שהיה מפונה מאותו שטח בסיס בלעדיה: $\\epsilon_f = \\frac{\\dot{Q}_{fin}}{h A_c \\theta_b}$.",
    formulaLatex:
      "\\epsilon_f = \\frac{\\dot{Q}_{fin}}{h A_c (T_b - T_\\infty)} \\approx \\sqrt{\\frac{k P}{h A_c}}",
    instruction: "מתי הצדקת השימוש בצלעות קירור היא המובהקת והיעילה ביותר הנדסית?",
    options: [
      {
        id: "hmt-q03-opt1",
        plainText:
          "כאשר מקדם ההסעה $h$ נמוך במיוחד (כגון הסעה חופשית באוויר) ומוליכות החומר $k$ גבוהה מאוד (נחושת, אלומיניום), כך ש-$\\epsilon_f \\ge 2$ מוצדק.",
        isCorrect: true,
        explanation:
          "נכון: עבור צלע ארוכה $\\epsilon_f = \\sqrt{\\frac{k P}{h A_c}}$. כדי להצדיק התקנת צלעות נדרש לפחות $\\epsilon_f \\ge 2$. הנוסחה מראה ש-$\\epsilon_f$ עולה ככל ש-$k$ גבוה וככל ש-$h$ קטן. לכן צלעות יעילות ביותר בצד שבו מקדם ההסעה נמוך (הסעת אוויר טבעית, $h \\approx 5$-$25\\,\\text{W/m}^2\\text{K}$). בנוזלים או ברתיחה שבהם $h > 1000\\,\\text{W/m}^2\\text{K}$, $\\epsilon_f$ עלול לרדת מתחת ל-$1$ והצלע תפעל כמבודד.",
      },
      {
        id: "hmt-q03-opt2",
        plainText: "בתוך מים רותחים שבהם מקדם ההסעה $h$ מגיע לעשרות אלפי יחידות.",
        isCorrect: false,
        explanation:
          "שגוי: בערכי $h$ גבוהים הצלע מהווה התנגדות הולכה מעכבת, והתקנת צלעות אינה יעילה.",
      },
      {
        id: "hmt-q03-opt3",
        plainText: "כאשר שטח החתך $A_c$ של הצלע שואף לאינסוף.",
        isCorrect: false,
        explanation:
          "שגוי: צלע עבה מדי מבזבזת משקל ושטח בסיס מבלי להגדיל את יחס ההיקף לחתך $P/A_c$.",
      },
      {
        id: "hmt-q03-opt4",
        plainText: "כאשר הצלע עשויה מחומר בידוד פלסטי בעל מוליכות תרמית נמוכה $k \\to 0$.",
        isCorrect: false,
        explanation: "שגוי: חומר בעל $k$ נמוך אינו מאפשר לחום להתקדם לאורך הצלע, והחום נבלם בבסיס.",
      },
    ],
  },
  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "hmt-q04-lmtd-counterflow-vs-parallel",
    domain: "מחליפי חום ו-LMTD",
    title: "מעבר חום ומעבר מסה - מחליפי חום והפרש טמפרטורות ממוצע לוגריתמי",
    context:
      "משווים בין מחליף חום בזרימה מקבילה (Parallel Flow) למחליף חום בזרימה נגדית (Counter Flow) הפועלים בין אותן טמפרטורות כניסה ויציאה של שני הזורמים.",
    formulaLatex:
      "\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1/\\Delta T_2)}, \\quad \\dot{Q} = U A \\Delta T_{lm}",
    instruction:
      "מדוע מחליף חום בזרימה נגדית יעיל יותר תרמודינמית, ואיזה יתרון טמפרטורה הוא מאפשר שבלתי אפשרי בזרימה מקבילה?",
    options: [
      {
        id: "hmt-q04-opt1",
        plainText: "בזרימה נגדית מקדם מעבר החום הכולל $U$ מוכפל פי $10$ עקב לחץ הידרודינמי.",
        isCorrect: false,
        explanation:
          "שגוי: מקדם $U$ נקבע ע״י תכונות הזורמים והדופן, ואינו משתנה פי $10$ רק משינוי כיוון הצנרת.",
      },
      {
        id: "hmt-q04-opt2",
        plainText:
          "עבור אותן טמפרטורות, ה-$\\Delta T_{lm}$ של זרימה נגדית תמיד גדול או שווה לזה של זרימה מקבילה (ולכן נדרש שטח החלפה $A$ קטן יותר לאותו הספק); ובנוסף, בזרימה נגדית טמפרטורת היציאה של הזורם הקר יכולה להיות גבוהה מטמפרטורת היציאה של הזורם החם ($T_{c,out} > T_{h,out}$).",
        mathText:
          "\\Delta T_{lm,\\mathrm{counter}} \\ge \\Delta T_{lm,\\mathrm{parallel}}, \\quad T_{c,out} > T_{h,out}",
        isCorrect: true,
        explanation:
          "נכון: בזרימה מקבילה שני הזורמים נכנסים באותו צד, הפרש הטמפרטורות דועך בחדות, וטמפרטורת היציאה של הזורם הקר אינה יכולה לחצות את טמפרטורת היציאה של הזורם החם ($T_{c,out} < T_{h,out}$). בזרימה נגדית מפל הטמפרטורה נשמר אחיד יותר, ולכן $\\Delta T_{lm}$ גבוה יותר ונדרש שטח קטן יותר לאותו $\\dot{Q} = UA\\Delta T_{lm}$. הזורם הקר פוגש ביציאתו את הזורם החם ביותר, ולכן ייתכן $T_{c,out} > T_{h,out}$.",
      },
      {
        id: "hmt-q04-opt3",
        plainText: "בזרימה מקבילה ה-LMTD תמיד אינסופי, ולכן לא ניתן לתכנן מחליף חום מקבילי.",
        isCorrect: false,
        explanation: "שגוי: זרימה מקבילית מוגדרת ופתירה מתמטית, אף שהיא פחות יעילה.",
      },
      {
        id: "hmt-q04-opt4",
        plainText: "שיטת LMTD אינה ישימה לזרימה נגדית, וחובה להשתמש בשיטת $\\epsilon$-NTU בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: שתי השיטות שקולות מתמטית. LMTD נוחה כאשר כל הטמפרטורות ידועות, ו-$\\epsilon$-NTU נוחה כאשר טמפרטורות היציאה אינן ידועות.",
      },
    ],
  },
  {
    id: "hmt-q05-prandtl-boundary-layers-ratio",
    domain: "מספר פרנטל ושכבות גבול",
    title: "מעבר חום ומעבר מסה - מספר פרנטל והיחס בין שכבות הגבול",
    context:
      "מספר פרנטל מוגדר כיחס בין הדיפוזיביות המולקולרית של תנע (צמיגות קינמטית $\\nu$) לבין הדיפוזיביות התרמית ($\\alpha = k/\\rho c_p$).",
    formulaLatex: "Pr = \\frac{\\nu}{\\alpha} = \\frac{\\mu c_p}{k}, \\quad \\frac{\\delta}{\\delta_t} \\approx Pr^{1/3}",
    instruction:
      "מהו היחס בין עובי שכבת הגבול ההידרודינמית ($\\delta$) לעובי שכבת הגבול התרמית ($\\delta_t$) במתכות נוזליות ($Pr \\ll 1$, כגון כספית או נתרן נוזלי) מול שמנים צמיגים ($Pr \\gg 1$)?",
    options: [
      {
        id: "hmt-q05-opt1",
        plainText: "במתכות נוזליות $\\delta \\gg \\delta_t$, ובשמנים $\\delta \\ll \\delta_t$.",
        isCorrect: false,
        explanation:
          "שגוי: היחסים הפוכים. במתכות נוזליות מוליכות החום עצומה ולכן שכבת הגבול התרמית עבה בהרבה מההידרודינמית.",
      },
      {
        id: "hmt-q05-opt2",
        plainText:
          "במתכות נוזליות ($Pr \\ll 1$) דיפוזיית החום מהירה בהרבה מדיפוזיית התנע ולכן $\\delta_t \\gg \\delta$; בשמנים צמיגים ($Pr \\gg 1$) דיפוזיית התנע דומיננטית ולכן $\\delta \\gg \\delta_t$.",
        mathText: "Pr \\ll 1 \\implies \\delta_t \\gg \\delta; \\quad Pr \\gg 1 \\implies \\delta \\gg \\delta_t",
        isCorrect: true,
        explanation:
          "נכון: לפי אנליזת שכבות גבול, $\\frac{\\delta}{\\delta_t} \\approx Pr^{1/3}$. במתכות נוזליות ($Pr \\approx 0.005$-$0.02$) מוליכות החום האלקטרונית ענקית ($\\alpha \\gg \\nu$), ולכן $\\delta_t \\gg \\delta$. בשמנים כבדים ($Pr > 1000$) הצמיגות ענקית ($\\nu \\gg \\alpha$), ולכן $\\delta \\gg \\delta_t$. בגזים $Pr \\approx 0.7$-$1$ ושתי השכבות בעלות עובי דומה.",
      },
      {
        id: "hmt-q05-opt3",
        plainText: "לכל הזורמים $\\delta = \\delta_t$ באופן זהה לפי אנלוגיית ריינולדס.",
        isCorrect: false,
        explanation:
          "שגוי: שוויון שכבות גבול ($\\delta = \\delta_t$) מתקיים אך ורק עבור $Pr = 1$. אנלוגיית ריינולדס הפשוטה תקפה רק במקרה פרטי זה.",
      },
      {
        id: "hmt-q05-opt4",
        plainText: "מספר פרנטל תלוי במהירות הזרימה ומשתנה מנקודה לנקודה לאורך המשטח.",
        isCorrect: false,
        explanation:
          "שגוי: מספר פרנטל הוא תכונה תרמו-פיזיקלית של החומר ($Pr = \\mu c_p/k$) ואינו תלוי במהירות או בגיאומטריית הזרימה.",
      },
    ],
  },
  {
    id: "hmt-q06-radiation-view-factor-reciprocity-enclosure",
    domain: "קרינה ופקטור ראייה",
    title: "מעבר חום ומעבר מסה - קרינה תרמית, יחסי גומלין ופקטור ראייה",
    context:
      "בחלל סגור (Enclosure) המורכב מ-$N$ משטחים אפורים ודיפוזיים, פקטור הראייה $F_{ij}$ מוגדר כחלק היחסי של קרינת הדיפוזיה הנפלטת ממשטח $i$ הפוגע ישירות במשטח $j$.",
    formulaLatex:
      "A_i F_{ij} = A_j F_{ji}, \\quad \\sum_{j=1}^{N} F_{ij} = 1",
    instruction:
      "כדור קטן בעל שטח פנים $A_1$ מוכל במלואו בתוך חלל כדורי סגור גדול בעל שטח פנים $A_2 = 4 A_1$. מהם פקטורי הראייה $F_{12}$, $F_{21}$ ו-$F_{22}$?",
    options: [
      {
        id: "hmt-q06-opt1",
        plainText: "$F_{12} = 0.5$, $F_{21} = 0.5$, $F_{22} = 0$",
        isCorrect: false,
        explanation:
          "שגוי: כל הקרינה מהכדור הפנימי הקמור פוגעת במעטפת החיצונית, ולכן $F_{12} = 1$ ולא $0.5$.",
      },
      {
        id: "hmt-q06-opt2",
        plainText: "$F_{12} = 1.0$, $F_{21} = 0.25$, $F_{22} = 0.75$",
        mathText: "F_{12} = 1, \\quad F_{21} = \\frac{A_1}{A_2} = 0.25, \\quad F_{22} = 0.75",
        isCorrect: true,
        explanation:
          "נכון: משטח $1$ קמור, ולכן $F_{11} = 0$. מאחר שהוא מוכל כולו בתוך משטח $2$, $F_{12} = 1$. לפי הדדיות: $A_1 F_{12} = A_2 F_{21} \\implies F_{21} = \\frac{A_1}{A_2} = 0.25$. לפי כלל הסכימה: $F_{21} + F_{22} = 1 \\implies F_{22} = 0.75$. משטח $2$ קעור ורואה $75\\%$ מעצמו.",
      },
      {
        id: "hmt-q06-opt3",
        plainText: "$F_{12} = 1.0$, $F_{21} = 1.0$, $F_{22} = 0$",
        isCorrect: false,
        explanation:
          "שגוי: סותר את משפט ההדדיות. שטחי המשטחים שונים ($A_2 = 4A_1$), ולכן $F_{21}$ אינו שווה ל-$F_{12}$.",
      },
      {
        id: "hmt-q06-opt4",
        plainText: "$F_{12} = 0.25$, $F_{21} = 1.0$, $F_{22} = 0.5$",
        isCorrect: false,
        explanation: "שגוי: היפוך של פקטורי הראייה. הכדור הפנימי רואה $100\\%$ מהמעטפת החיצונית.",
      },
    ],
  },
  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "hmt-q07-radiation-shields-heat-reduction",
    domain: "מגיני קרינה תרמית",
    title: "מעבר חום ומעבר מסה - מגיני קרינה תרמית",
    context:
      "בין שני לוחות אינסופיים מקבילים בעלי אמיסיביות זהה $\\epsilon_1 = \\epsilon_2 = \\epsilon$ בטמפרטורות $T_1$ ו-$T_2$, מציבים $N$ מגיני קרינה דקים בעלי אותה אמיסיביות $\\epsilon$ משני צדיהם.",
    formulaLatex: "\\dot{q}_{N} = \\frac{1}{N+1}\\,\\dot{q}_{0}",
    instruction:
      "מהו היחס בין קצב מעבר החום בקרינה בנוכחות $N$ מגינים לבין מעבר החום ללא מגינים כלל?",
    options: [
      {
        id: "hmt-q07-opt1",
        plainText: "מעבר החום יורד בפקטור מעריכי של $e^{-N}$.",
        isCorrect: false,
        explanation:
          "שגוי: רשת ההתנגדויות של מגיני קרינה מחוברת בטור ליניארי, ולכן הדעיכה אלגברית ולא מעריכית.",
      },
      {
        id: "hmt-q07-opt2",
        plainText: "מעבר החום נשאר זהה משום שהמגינים דקים וחסרי מסה.",
        isCorrect: false,
        explanation:
          "שגוי: כל מגן מוסיף התנגדויות משטח ומרווח קרינה, ובכך בולם את השטף באופן משמעותי.",
      },
      {
        id: "hmt-q07-opt3",
        plainText:
          "קצב מעבר החום קטן בדיוק בפקטור של $N+1$ (כלומר $\\dot{q}_{N} = \\frac{1}{N+1}\\dot{q}_{0}$).",
        mathText: "\\dot{q}_{N} = \\frac{1}{N+1}\\dot{q}_{12}",
        isCorrect: true,
        explanation:
          "נכון: ההתנגדות לקרינה בין שני משטחים זהים היא $R = \\frac{2}{\\epsilon}-1$. כל מגן זהה מוסיף עוד מרווח בעל אותה התנגדות בטור. עבור $N$ מגינים יש $N+1$ מרווחים: $R_{total} = (N+1)R$. מאחר שהפוטנציאל $\\sigma(T_1^4 - T_2^4)$ קבוע, השטף קטן פי $N+1$: $\\dot{q}_N = \\frac{\\sigma(T_1^4-T_2^4)}{(N+1)R} = \\frac{1}{N+1}\\dot{q}_0$.",
      },
      {
        id: "hmt-q07-opt4",
        plainText: "מעבר החום קטן בפקטור של $2^N$ עקב חוק ההכפלה.",
        isCorrect: false,
        explanation: "שגוי: התנגדויות קרינה בטור נסכמות חיבורית ($R+R+\\cdots$) ולא כפילתית.",
      },
    ],
  },
  {
    id: "hmt-q08-natural-convection-grashof-rayleigh",
    domain: "הסעה טבעית ומספר גרשוף",
    title: "מעבר חום ומעבר מסה - הסעה טבעית, מספר גרשוף ומספר ריילי",
    context:
      "בהסעה חופשית מעל פלטה אנכית חמה, התנועה נוצרת מכוחות ציפה תרמיים (קירוב בוסניסק: $\\Delta\\rho \\approx -\\rho\\beta\\Delta T$). מספר גרשוף ומספר ריילי מוגדרים כדלקמן.",
    formulaLatex:
      "Gr_L = \\frac{g\\beta (T_s-T_\\infty)L^3}{\\nu^2}, \\quad Ra_L = Gr_L \\cdot Pr = \\frac{g\\beta (T_s-T_\\infty)L^3}{\\nu\\alpha}",
    instruction:
      "מהי המשמעות הפיזיקלית של מספר גרשוף, ומה קובע את המעבר מזרימה למינרית לטורבולנטית בהסעה טבעית?",
    options: [
      {
        id: "hmt-q08-opt1",
        plainText: "מספר גרשוף מייצג את יחס הלחצים, והמעבר לטורבולנציה מתרחש כאשר $Gr_L > 2300$ כמו בצינור.",
        isCorrect: false,
        explanation:
          "שגוי: $Re = 2300$ שייך לזרימה מאולצת פנימית בצינור. בהסעה חופשית המנגנון מונע ציפה והסף הקריטי שונה בסדרי גודל.",
      },
      {
        id: "hmt-q08-opt2",
        plainText: "מספר גרשוף מודד את קצב פליטת הקרינה ביחס להסעה מאולצת.",
        isCorrect: false,
        explanation: "שגוי: מספר גרשוף אינו עוסק בקרינה אלא באיזון בין כוחות ציפה לכוחות צמיגות.",
      },
      {
        id: "hmt-q08-opt3",
        plainText:
          "מספר גרשוף $Gr$ מייצג את היחס בין כוחות הציפה לכוחות החיכוך הצמיגים; המעבר מזרימה למינרית לטורבולנטית על פלטה אנכית נשלט ע״י מספר ריילי ומתרחש סביב $Ra_{crit} \\approx 10^9$.",
        isCorrect: true,
        explanation:
          "נכון: בהסעה חופשית המהירות אינה מוכתבת מבחוץ. מספר גרשוף ממלא את תפקיד מספר ריינולדס: $Gr = \\frac{g\\beta\\Delta T L^3}{\\nu^2}$. מכפלת $Gr$ ב-$Pr$ נותנת את מספר ריילי $Ra = Gr\\cdot Pr$. על משטח אנכי המעבר לזרימה טורבולנטית מתרחש בסביבות $Ra_L \\approx 10^9$.",
      },
      {
        id: "hmt-q08-opt4",
        plainText: "הסעה טבעית תמיד נשארת למינרית לכל אורך וגובה פלטה לפי משוואת אוילר.",
        isCorrect: false,
        explanation:
          "שגוי: בפלטות גבוהות שכבת הגבול מגיעה לטורבולנציה עקב תלות האורך בחזקה שלישית ($L^3$).",
      },
    ],
  },
  {
    id: "hmt-q09-fick-law-equimolar-counter-diffusion",
    domain: "חוק פיק ודיפוזיה שוות-מולים",
    title: "מעבר חום ומעבר מסה - דיפוזיה מולקולרית וחוק פיק הראשון",
    context:
      "בתערובת בינארית של שני גזים אידיאליים $A$ ו-$B$ בלחץ כולל $P$ וטמפרטורה $T$ קבועים, מתרחשת דיפוזיה שוות-מולים נגדית (Equimolar Counter-Diffusion), שבה שטף המולים נטו מתאפס: $N_A'' = -N_B''$.",
    formulaLatex:
      "N_A'' = -D_{AB}\\frac{dC_A}{dx} + y_A(N_A''+N_B'') = -D_{AB}\\frac{dC_A}{dx}",
    instruction:
      "מהו שטף המולים הספציפי $N_A''$ של גז $A$ לאורך שכבה בעובי $L$ בין הריכוזים $C_{A,1}$ ל-$C_{A,2}$ במצב מתמיד?",
    options: [
      {
        id: "hmt-q09-opt1",
        plainText: "$N_A'' = -D_{AB}\\dfrac{C_{A,1}+C_{A,2}}{2}$",
        isCorrect: false,
        explanation:
          "שגוי: דיפוזיה מונעת מגרדיאנט ריכוזים (הפרש ריכוזים מחולק במרחק), ולא מממוצע חשבוני של הריכוז.",
      },
      {
        id: "hmt-q09-opt2",
        plainText: "$N_A'' = D_{AB} P \\ln\\left(\\dfrac{1-y_{A,2}}{1-y_{A,1}}\\right)$",
        isCorrect: false,
        explanation:
          "שגוי: נוסחה לוגריתמית זו מאפיינת דיפוזיה חד-כיוונית דרך גז עומד ($N_B'' = 0$, כגון אידוי), ולא דיפוזיה שוות-מולים נגדית.",
      },
      {
        id: "hmt-q09-opt3",
        plainText:
          "$N_A'' = D_{AB}\\dfrac{C_{A,1}-C_{A,2}}{L} = \\dfrac{D_{AB}}{R_u T L}(P_{A,1}-P_{A,2})$ (פרופיל ריכוזים ליניארי טהור ללא הסעה כוללת).",
        mathText: "N_A'' = D_{AB}\\frac{C_{A,1}-C_{A,2}}{L}",
        isCorrect: true,
        explanation:
          "נכון: משוואת המעבר הכללית היא $N_A'' = -D_{AB}\\frac{dC_A}{dx} + y_A(N_A''+N_B'')$. בדיפוזיה שוות-מולים $N_A''+N_B'' = 0$, ולכן איבר ההסעה (Stefan flow) מתאפס. נשאר חוק פיק הטהור. במצב מתמיד דרך שכבה מישורית ללא מקורות הגרדיאנט ליניארי, ומתקבל $N_A'' = D_{AB}\\frac{C_{A,1}-C_{A,2}}{L}$. לפי $C_A = P_A/(R_u T)$ השטף גם פרופורציוני להפרש הלחצים החלקיים.",
      },
      {
        id: "hmt-q09-opt4",
        plainText: "$N_A'' = 0$ משום שחוק שימור המסה אוסר דיפוזיה בלחץ קבוע.",
        isCorrect: false,
        explanation:
          "שגוי: הלחץ הכולל קבוע, אך הלחצים החלקיים שונים, וזה בדיוק מה שמניע דיפוזיה.",
      },
    ],
  },
  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "hmt-q10-boiling-nukiyama-curve-chf-burnout",
    domain: "רתיחה ושטף חום קריטי",
    title: "מעבר חום ומעבר מסה - עקומת הרתיחה של נוקיאמה ושטף חום קריטי",
    context:
      "בעקומת הרתיחה של נוקיאמה עבור מים בלחץ אטמוספרי, מודדים את שטף החום $\\dot{q}''$ כפונקציה של טמפרטורת היתר $\\Delta T_{excess} = T_w - T_{sat}$.",
    formulaLatex: "\\Delta T_{excess} = T_w - T_{sat}, \\quad \\dot{q}''_{\\max} = \\text{CHF}",
    instruction:
      "מה מתרחש כאשר מעלים את שטף החום מעבר לשטף החום הקריטי (Critical Heat Flux / Burnout), ומדוע תופעה זו מסוכנת בכורים גרעיניים?",
    options: [
      {
        id: "hmt-q10-opt1",
        plainText: "הרתיחה נפסקת לחלוטין והמים חוזרים למצב הולכה טהורה.",
        isCorrect: false,
        explanation: "שגוי: המים ממשיכים לרתוח, אך עוברים למשטר רתיחת פילם גזי מבודד.",
      },
      {
        id: "hmt-q10-opt2",
        plainText: "מקדם מעבר החום $h$ שואף לאינסוף והדופן מתקררת לטמפרטורת המים.",
        isCorrect: false,
        explanation: "שגוי: מקדם ההסעה דווקא קורס עקב היווצרות שכבת קיטור מבודדת.",
      },
      {
        id: "hmt-q10-opt3",
        plainText: "קצב הבועות מתייצב בנקודת ליידנפרוסט ללא שינוי טמפרטורה.",
        isCorrect: false,
        explanation:
          "שגוי: נקודת ליידנפרוסט היא נקודת המינימום של רתיחת פילם, ולא נקודת המקסימום של שטף החום הקריטי.",
      },
      {
        id: "hmt-q10-opt4",
        plainText:
          "צפיפות בועות הקיטור נעשית כה גבוהה עד שהן מתמזגות לשכבת פילם גז רציפה המבודדת את הדופן (Film Boiling). מאחר שמוליכות הקיטור זעירה ביחס למים, מקדם ההסעה קורס, וטמפרטורת הדופן מזנקת במאות עד אלפי מעלות (Burnout / Departure from Nucleate Boiling) עד להתכת גוף החימום.",
        isCorrect: true,
        explanation:
          "נכון: ברתיחת בועות (Nucleate Boiling) התנתקות הבועות מערבלת את הנוזל ומפיקה מקדמי מעבר חום גבוהים מאוד. בשיא העקומה (CHF) בועות מתלכדות לשמיכת קיטור רציפה שמונעת הרטבה של הדופן. אם שולטים בשטף החום (כמו במוטות דלק גרעיניים), אי-היכולת לפנות את החום מאלצת את טמפרטורת הדופן לזנק, לעתים מעל $1000^\\circ\\text{C}$, עד להתכת המעטפת (Boiling Crisis / Burnout).",
      },
    ],
  },
  {
    id: "hmt-q11-chilton-colburn-analogy-heat-mass-friction",
    domain: "אנלוגיית צ׳ילטון-קולברן",
    title: "מעבר חום ומעבר מסה - אנלוגיית צ׳ילטון-קולברן",
    context:
      "בזרימה מאולצת מעל משטחים או בצינורות, אנלוגיית צ׳ילטון-קולברן מקשרת בין מקדם החיכוך $C_f$, מעבר חום ומעבר מסה באמצעות גורמי ה-$j$.",
    formulaLatex:
      "j_H = St \\cdot Pr^{2/3} = \\frac{C_f}{2}, \\quad j_D = St_m \\cdot Sc^{2/3} = \\frac{C_f}{2}",
    instruction:
      "מהו הקשר הישיר בין מקדם מעבר החום בהסעה $h$ לבין מקדם מעבר המסה בהסעה $h_m$ הנובע מאנלוגיה זו עבור גזים לחים ($Le = Sc/Pr = \\alpha/D_{AB} \\approx 1$)?",
    options: [
      {
        id: "hmt-q11-opt1",
        plainText: "$\\frac{h}{h_m} = 1$ תמיד לכל זורם ולכל לחץ.",
        isCorrect: false,
        explanation:
          "שגוי: היחידות שונות ($h$ ב-$\\text{W/m}^2\\text{K}$ ו-$h_m$ ב-$\\text{m/s}$), ולכן היחס חייב להכיל את קיבול החום הנפחי.",
      },
      {
        id: "hmt-q11-opt2",
        plainText: "$\\frac{h}{h_m} = \\frac{\\mu}{\\rho D_{AB}}$ (מספר שמידט בלבד).",
        isCorrect: false,
        explanation: "שגוי: ביטוי זה אינו תואם ממדים ואינו נובע מהשוואת גורמי קולברן.",
      },
      {
        id: "hmt-q11-opt3",
        plainText: "מעבר מסה ומעבר חום בלתי תלויים זה בזה עקב חוק שימור המומנט של סטוקס.",
        isCorrect: false,
        explanation: "שגוי: האנלוגיה קושרת את פרופילי שכבות הגבול של תנע, חום ומסה.",
      },
      {
        id: "hmt-q11-opt4",
        plainText:
          "$\\frac{h}{h_m} = \\rho c_p Le^{2/3} \\approx \\rho c_p$ (עבור אוויר-מים מספר לואיס קרוב ל-$1$, והיחס שווה בקירוב לקיבול החום הנפחי של האוויר). כך ניתן לחשב קצבי אידוי מתוך מקדמי מעבר חום ידועים.",
        mathText: "\\frac{h}{h_m} = \\rho c_p Le^{2/3}",
        isCorrect: true,
        explanation:
          "נכון: מהשוואת גורמי קולברן $St\\,Pr^{2/3} = St_m\\,Sc^{2/3}$, עם $St = \\frac{h}{\\rho c_p V}$ ו-$St_m = \\frac{h_m}{V}$, מתקבל $\\frac{h}{h_m} = \\rho c_p\\left(\\frac{Sc}{Pr}\\right)^{2/3} = \\rho c_p Le^{2/3}$, כאשר $Le = \\alpha/D_{AB}$. עבור אוויר ואדי מים $Le \\approx 1$, ולכן $\\frac{h}{h_m} \\approx \\rho c_p$ (יחס לואיס). זהו בסיס לחישובי מיזוג אוויר, מגדלי קירור ופסיכרומטריה.",
      },
    ],
  },
  {
    id: "hmt-q12-transient-semi-infinite-erfc-solution",
    domain: "הולכה לא-מתמדת בחצי-מרחב",
    title: "מעבר חום ומעבר מסה - הולכת חום לא-מתמדת בחצי-מרחב ופונקציית השגיאה",
    context:
      "תווך חצי-אינסופי ($x \\ge 0$) בעל תכונות קבועות ($k$, $\\rho$, $c_p$, $\\alpha$) נמצא בתחילה בטמפרטורה אחידה $T_i$. ברגע $t = 0$ פני השטח ב-$x = 0$ מובאים לטמפרטורה קבועה $T_s \\neq T_i$. משוואת הדיפוזיה היא $\\frac{\\partial T}{\\partial t} = \\alpha \\frac{\\partial^2 T}{\\partial x^2}$.",
    formulaLatex:
      "\\eta = \\frac{x}{2\\sqrt{\\alpha t}}, \\quad \\frac{T(x,t)-T_s}{T_i-T_s} = \\operatorname{erf}(\\eta)",
    instruction: "מהו שטף החום הנכנס דרך פני השטח $\\dot{q}_s''(t)$ ב-$x = 0$ כפונקציה של הזמן?",
    options: [
      {
        id: "hmt-q12-opt1",
        plainText: "$\\dot{q}_s''(t) = \\frac{k(T_s-T_i)}{x}$ קבוע לכל זמן.",
        isCorrect: false,
        explanation: "שגוי: שטף קבוע מאפיין מצב מתמיד בקיר בעל עובי סופי. בחצי-מרחב השטף דועך בזמן.",
      },
      {
        id: "hmt-q12-opt2",
        plainText: "$\\dot{q}_s''(t) = k(T_s-T_i)e^{-\\alpha t}$",
        isCorrect: false,
        explanation:
          "שגוי: דעיכה מעריכית טהורה מאפיינת מודל קיבול מקובץ, ולא חצי-מרחב עם דיפוזיה לפי פונקציית שגיאה.",
      },
      {
        id: "hmt-q12-opt3",
        plainText: "$\\dot{q}_s''(t) = \\frac{k(T_s-T_i)}{\\pi \\alpha t}$",
        isCorrect: false,
        explanation: "שגוי: התלות בזמן שגויה. הדעיכה היא כשורש הזמן, $t^{-1/2}$, ולא ביחס ישר לזמן.",
      },
      {
        id: "hmt-q12-opt4",
        plainText:
          "$\\dot{q}_s''(t) = \\frac{k(T_s-T_i)}{\\sqrt{\\pi\\alpha t}}$. ב-$t \\to 0$ השטף שואף לאינסוף תאורטית, ודועך כ-$t^{-1/2}$ ככל ששכבת החום מעמיקה.",
        mathText: "\\dot{q}_s''(t) = \\frac{k(T_s-T_i)}{\\sqrt{\\pi\\alpha t}}",
        isCorrect: true,
        explanation:
          "נכון: $T(x,t) = T_s + (T_i-T_s)\\operatorname{erf}\\!\\left(\\frac{x}{2\\sqrt{\\alpha t}}\\right)$. לפי חוק פורייה ב-$x = 0$: $\\dot{q}_s'' = -k\\left.\\frac{\\partial T}{\\partial x}\\right|_{x=0}$. הנגזרת של פונקציית השגיאה היא $\\frac{d}{d\\eta}\\operatorname{erf}(\\eta) = \\frac{2}{\\sqrt{\\pi}}e^{-\\eta^2}$, וב-$\\eta = 0$ ערכה $\\frac{2}{\\sqrt{\\pi}}$. עם $\\frac{\\partial\\eta}{\\partial x} = \\frac{1}{2\\sqrt{\\alpha t}}$ מתקבל $\\dot{q}_s''(t) = \\frac{k(T_s-T_i)}{\\sqrt{\\pi\\alpha t}}$. ברגע הראשון השטף שואף לאינסוף, ואחר כך דועך ביחס הפוך לשורש הזמן.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_HEAT_MASS_TRANSFER_QUESTIONS = HEAT_MASS_TRANSFER_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleHeatMassTransferOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = HEAT_MASS_TRANSFER_QUESTIONS.slice(0, 3);
  const groupB = HEAT_MASS_TRANSFER_QUESTIONS.slice(3, 6);
  const groupC = HEAT_MASS_TRANSFER_QUESTIONS.slice(6, 12);

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
