import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Statics & Strength of Materials diagnostic bank (12Q).
 * Display name: "סטטיקה וחוזק חומרים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const MECHANICS_MATERIALS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "mech-q01-truss-method-of-sections-zero-force",
    domain: "מסבכים מישוריים ומוטות אפס",
    title: "סטטיקה וחוזק חומרים - מסבכים מישוריים ומוטות אפס",
    context:
      "במסבך מישורי אידיאלי (חיבורים פרקיים ללא מומנטים ועומסים בצמתים בלבד), צומת $K$ מחבר שלושה מוטות: מוטות $A$ ו-$B$ נמצאים על אותו קו ישר, ומוט $C$ מחובר לצומת בזווית $\\theta \\neq 0, 180^\\circ$ ביחס אליהם. על הצומת $K$ לא פועל שום כוח חיצוני.",
    formulaLatex: "\\sum F_y = F_C \\sin\\theta = 0 \\implies F_C = 0",
    instruction:
      "מה ניתן לקבוע בוודאות לגבי הכוח הפנימי במוט $C$ ובמוטות $A, B$?",
    options: [
      {
        id: "mech-q01-opt1",
        plainText:
          "מוט $C$ הוא מוט אפס בהכרח ($F_C = 0$), והכוחות במוטות $A$ ו-$B$ שווים בגודלם ומנוגדים באופיים ($F_A = F_B$, שניהם במתיחה או שניהם בלחיצה).",
        mathText: "F_C = 0, \\quad F_A = F_B",
        isCorrect: true,
        explanation:
          "נכון: נבחר מערכת צירים שבה ציר $x$ מתלכד עם הקו הישר של מוטות $A$ ו-$B$, וציר $y$ ניצב לו. משוואת שיווי משקל כוחות בציר $y$: $\\sum F_y = F_C \\sin\\theta = 0$. מאחר ש-$\\sin\\theta \\neq 0$, נקבל בהכרח $F_C = 0$ (מוט אפס). כעת, ממשוואת שיווי המשקל בציר $x$: $\\sum F_x = F_A - F_B = 0 \\implies F_A = F_B$, כלומר הכוחות לאורך הקו הישר מאזנים זה את זה במדויק.",
      },
      {
        id: "mech-q01-opt2",
        plainText:
          "שלושת המוטות הם מוטות אפס ($F_A = F_B = F_C = 0$) משום שאין כוח חיצוני בצומת.",
        isCorrect: false,
        explanation:
          "שגוי: מוטות $A$ ו-$B$ יכולים לשאת כוחות משמעותיים המועברים דרך המסבך מצמתים אחרים.",
      },
      {
        id: "mech-q01-opt3",
        plainText: "מוט $C$ נושא כוח לחיצה השווה ל-$F_A \\cos\\theta$.",
        isCorrect: false,
        explanation:
          "שגוי: אין כוח חיצוני או רכיב של מוט אחר בכיוון הניצב לקו הישר שיאזן כוח במוט $C$, ולכן הוא חייב להתאפס.",
      },
      {
        id: "mech-q01-opt4",
        plainText:
          "הכוח במוט $C$ תלוי במודול האלסטיות $E$ של החומר ובשטח החתך שלו.",
        isCorrect: false,
        explanation:
          "שגוי: במסבך מסוים סטטית הכוחות הפנימיים נקבעים ממשוואות שיווי משקל בלבד ללא תלות בתכונות החומר.",
      },
    ],
  },
  {
    id: "mech-q02-shear-stress-beams-jourawski",
    domain: "מאמצי גזירה בכפיפה ונוסחת ז׳ורבסקי",
    title: "סטטיקה וחוזק חומרים - מאמצי גזירה בכפיפה ונוסחת ז׳ורבסקי",
    context:
      "קורה מונחת על שני סמכים ונתונה לכפיפה טהורה עם כוח גזירה אנכי $V$. חתך הקורה הוא מלבני מלא בעל רוחב $b$ וגובה כולל $h$. מומנט האינרציה סביב הציר הניטרלי הוא $I = \\frac{bh^3}{12}$.",
    formulaLatex:
      "\\tau(y) = \\frac{V Q(y)}{I b}, \\quad Q(y) = \\int_y^{h/2} \\eta b \\, d\\eta",
    instruction:
      "מהו מאמץ הגזירה המקסימלי $\\tau_{\\max}$ בחתך, והיכן הוא מתקבל?",
    options: [
      {
        id: "mech-q02-opt1",
        plainText:
          "$\\tau_{\\max} = \\frac{3}{2}\\frac{V}{A} = \\frac{3V}{2bh}$, ומתקבל על הציר הניטרלי ($y = 0$).",
        mathText: "\\tau_{\\max} = 1.5 \\frac{V}{bh} \\quad \\text{at } y = 0",
        isCorrect: true,
        explanation:
          "נכון: המומנט הסטטי של השטח שמעל גובה $y$ הוא $Q(y) = b \\int_y^{h/2} \\eta d\\eta = \\frac{b}{2}\\left(\\frac{h^2}{4} - y^2\\right)$. הערך המקסימלי של $Q$ מתקבל על הציר הניטרלי ($y = 0$): $Q_{\\max} = \\frac{bh^2}{8}$. נציב בנוסחת ז׳ורבסקי: $\\tau_{\\max} = \\frac{V Q_{\\max}}{I b} = \\frac{V (bh^2/8)}{(bh^3/12) b} = \\frac{12}{8} \\frac{V}{bh} = \\frac{3}{2}\\frac{V}{A}$.",
      },
      {
        id: "mech-q02-opt2",
        plainText:
          "$\\tau_{\\max} = \\frac{V}{bh}$, ומתקבל בסיבים החיצוניים העליונים והתחתונים ($y = \\pm h/2$).",
        isCorrect: false,
        explanation:
          "שגוי: בסיבים הקיצוניים $Q(h/2) = 0$ ולכן מאמץ הגזירה מתאפס לחלוטין (שם מאמץ הכפיפה הנורמלי $\\sigma$ הוא מקסימלי).",
      },
      {
        id: "mech-q02-opt3",
        plainText:
          "$\\tau_{\\max} = \\frac{4}{3}\\frac{V}{bh}$, ומתקבל בגובה רבע חתך ($y = h/4$).",
        isCorrect: false,
        explanation:
          "שגוי: הפקטור $4/3$ שייך לחתך מעגלי מלא ולא לחתך מלבני.",
      },
      {
        id: "mech-q02-opt4",
        plainText:
          "$\\tau_{\\max} = \\frac{2V}{bh}$, ומתפלג אחיד לאורך כל גובה הקורה.",
        isCorrect: false,
        explanation: "שגוי: התפלגות מאמצי הגזירה פרבולית ולא אחידה.",
      },
    ],
  },
  {
    id: "mech-q03-mohr-circle-principal-stresses",
    domain: "מעגל מור למאמצים ומאמצים ראשיים",
    title: "סטטיקה וחוזק חומרים - מעגל מור למאמצים ומאמצים ראשיים",
    context:
      "בנקודה מסוימת בגוף שורר מצב מאמצים דו-ממדי מישורי (Plane Stress): $\\sigma_x = 80\\text{ MPa}$, $\\sigma_y = -20\\text{ MPa}$, ומאמץ גזירה $\\tau_{xy} = 40\\text{ MPa}$.",
    formulaLatex:
      "\\sigma_{1,2} = \\frac{\\sigma_x + \\sigma_y}{2} \\pm \\sqrt{\\left(\\frac{\\sigma_x - \\sigma_y}{2}\\right)^2 + \\tau_{xy}^2}",
    instruction:
      "מהם המאמצים הראשיים $\\sigma_1, \\sigma_2$ ומאמץ הגזירה המקסימלי במישור $\\tau_{\\max}$?",
    options: [
      {
        id: "mech-q03-opt1",
        plainText:
          "$\\sigma_1 = 94.03\\text{ MPa}$, $\\sigma_2 = -34.03\\text{ MPa}$, ו-$\\tau_{\\max} = 64.03\\text{ MPa}$.",
        mathText:
          "\\sigma_{1,2} = 30 \\pm \\sqrt{50^2 + 40^2} = 30 \\pm 64.03\\text{ MPa}",
        isCorrect: true,
        explanation:
          "נכון: מרכז מעגל מור הוא $\\sigma_{avg} = \\frac{\\sigma_x + \\sigma_y}{2} = \\frac{80 + (-20)}{2} = 30\\text{ MPa}$. רדיוס המעגל שווה למאמץ הגזירה המקסימלי במישור: $R = \\tau_{\\max} = \\sqrt{\\left(\\frac{\\sigma_x - \\sigma_y}{2}\\right)^2 + \\tau_{xy}^2} = \\sqrt{50^2 + 40^2} = \\sqrt{2500 + 1600} = \\sqrt{4100} \\approx 64.03\\text{ MPa}$. המאמצים הראשיים הם $\\sigma_1 = 30 + 64.03 = 94.03\\text{ MPa}$ ו-$\\sigma_2 = 30 - 64.03 = -34.03\\text{ MPa}$.",
      },
      {
        id: "mech-q03-opt2",
        plainText:
          "$\\sigma_1 = 80\\text{ MPa}$, $\\sigma_2 = -20\\text{ MPa}$, ו-$\\tau_{\\max} = 40\\text{ MPa}$.",
        isCorrect: false,
        explanation:
          "שגוי: אלו המאמצים על המישורים המקוריים ולא המאמצים הראשיים המסובבים.",
      },
      {
        id: "mech-q03-opt3",
        plainText:
          "$\\sigma_1 = 120\\text{ MPa}$, $\\sigma_2 = -60\\text{ MPa}$, ו-$\\tau_{\\max} = 90\\text{ MPa}$.",
        isCorrect: false,
        explanation:
          "שגוי: חישוב מוטעה של רדיוס המעגל ללא חלוקת הפרש המאמצים ב-2.",
      },
      {
        id: "mech-q03-opt4",
        plainText:
          "$\\sigma_1 = 60\\text{ MPa}$, $\\sigma_2 = 0\\text{ MPa}$, ו-$\\tau_{\\max} = 30\\text{ MPa}$.",
        isCorrect: false,
        explanation:
          "שגוי: נשמט סימן המינוס של המאמץ $\\sigma_y$ בחישוב המרכז והרדיוס.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "mech-q04-torsion-hollow-vs-solid-shaft",
    domain: "פיתול מוטות עגולים ויתרון גיאומטרי של מוט חלול",
    title:
      "סטטיקה וחוזק חומרים - פיתול מוטות עגולים ויתרון גיאומטרי של מוט חלול",
    context:
      "משווים שני מוטות פיתול עשויים מאותו חומר, בעלי אותו אורך $L$ ואותה מסה כוללת (אותו שטח חתך $A$): מוט מלא בעל קוטר $d_s$, ומוט חלול בעל קוטר חיצוני $D_o$ וקוטר פנימי $D_i$.",
    formulaLatex:
      "\\tau = \\frac{T r}{J}, \\quad J_{solid} = \\frac{\\pi d_s^4}{32}, \\quad J_{hollow} = \\frac{\\pi (D_o^4 - D_i^4)}{32}",
    instruction:
      "איזה מוט מסוגל לשאת מומנט פיתול $T$ גדול יותר עבור מאמץ גזירה מותר נתון $\\tau_{all}$, ומדוע?",
    options: [
      {
        id: "mech-q04-opt1",
        plainText:
          "המוט המלא חזק יותר משום שאין בו ריכוז מאמצים סביב דופן פנימית ריקה.",
        isCorrect: false,
        explanation:
          "שגוי: בפיתול מעגלי אין ריכוז מאמצים, והחומר במרכז המוט המלא כמעט אינו נושא עומס.",
      },
      {
        id: "mech-q04-opt2",
        plainText:
          "המוט החלול נושא מומנט גדול בהרבה וקשיחותו לפיתול גבוהה יותר, משום שחומרו מרוכז ברדיוס גדול יותר שבו מומנט האינרציה הפולרי $J$ מקסימלי.",
        isCorrect: true,
        explanation:
          "נכון: מאמץ הפיתול גדל ליניארית עם הרדיוס ($r$). במרכז המוט המאמץ אפסי, כך שהחומר שם אינו מנוצל ביעילות. במוט חלול בעל אותו שטח חתך, החומר מרוחק ממרכז הסיבוב, ולכן מומנט האינרציה הפולרי $J$ ומודול החתך לפיתול $W_p = J/r_{\\max}$ גדולים משמעותית מאלו של מוט מלא בעל אותו משקל. כתוצאה מכך המוט החלול קשיח וחזק יותר בהרבה לאותה מסה.",
      },
      {
        id: "mech-q04-opt3",
        plainText:
          "שני המוטות נושאים בדיוק את אותו המומנט משום ששטח החתך והמסה שלהם זהים.",
        isCorrect: false,
        explanation:
          "שגוי: יכולת הנשיאה בפיתול תלויה במומנט הפולרי של השטח ($J$) ולא בשטח החתך הישיר ($A$).",
      },
      {
        id: "mech-q04-opt4",
        plainText:
          "המוט המלא עדיף תמיד משום שזווית הפיתול שלו קטנה פי 4 מזו של מוט חלול.",
        isCorrect: false,
        explanation:
          "שגוי: זווית הפיתול נתונה ע״י $\\phi = \\frac{TL}{GJ}$; מכיוון ש-$J$ של המוט החלול גדול יותר, זווית הפיתול שלו דווקא קטנה יותר.",
      },
    ],
  },
  {
    id: "mech-q05-euler-buckling-effective-length",
    domain: "קריסת עמודי אוילר ומקדמי ריתום",
    title: "סטטיקה וחוזק חומרים - קריסת עמודי אוילר ומקדמי ריתום",
    context:
      "עמוד פלדה אלסטי ארוך ודק בעל קשיחות כפיפה $EI$ ואורך גאומטרי $L$ נתון לעומס לחיצה צירי $P$. עומס הקריסה הקריטי לפי אוילר נתון ע״י $P_{cr} = \\frac{\\pi^2 EI}{(K L)^2}$, כאשר $K$ הוא מקדם האורך האפקטיבי.",
    formulaLatex: "P_{cr} = \\frac{\\pi^2 EI}{L_{eff}^2}, \\quad L_{eff} = K L",
    instruction:
      "מהו היחס בין עומס הקריסה של עמוד בעל שני קצוות מרותקים (Fixed-Fixed, $K=0.5$) לבין עמוד שקצהו האחד מרותק וקצהו השני חופשי לחלוטין (Fixed-Free, $K=2.0$)?",
    options: [
      {
        id: "mech-q05-opt1",
        plainText: "העמוד המרותק בשני קצותיו חזק פי 4.",
        isCorrect: false,
        explanation:
          "שגוי: יחס האורכים האפקטיביים הוא פי 4, אך עומס הקריסה תלוי בריבוע האורך האפקטיבי ולכן מוכפל פי 16.",
      },
      {
        id: "mech-q05-opt2",
        plainText:
          "העמוד המרותק בשני קצותיו חזק פי 16 ($P_{cr}^{(1)} = 16 P_{cr}^{(2)}$).",
        mathText:
          "\\frac{P_{cr}^{\\text{Fixed-Fixed}}}{P_{cr}^{\\text{Fixed-Free}}} = \\frac{(2.0 L)^2}{(0.5 L)^2} = \\frac{4}{0.25} = 16",
        isCorrect: true,
        explanation:
          "נכון: עבור Fixed-Fixed מתקיים $K_1 = 0.5 \\implies L_{eff,1} = 0.5L$, ועבור Fixed-Free מתקיים $K_2 = 2.0 \\implies L_{eff,2} = 2L$. היחס בין העומסים הקריטיים: $\\frac{P_{cr,1}}{P_{cr,2}} = \\frac{L_{eff,2}^2}{L_{eff,1}^2} = \\frac{(2L)^2}{(0.5L)^2} = \\frac{4}{0.25} = 16$. ריסון סיבוב והזזה בשני הקצוות מעלה את עמידות העמוד לקריסה פי 16 בהשוואה לעמוד זיזי.",
      },
      {
        id: "mech-q05-opt3",
        plainText: "העמוד המרותק בשני קצותיו חזק פי 8.",
        isCorrect: false,
        explanation: "שגוי: טעות חישוב של חזקת האורך האפקטיבי.",
      },
      {
        id: "mech-q05-opt4",
        plainText:
          "שני העמודים קורסים באותו עומס משום שהחומר מגיע למאמץ הכניעה $\\sigma_y$.",
        isCorrect: false,
        explanation:
          "שגוי: בעמודים דקים (בעלי תמירות גבוהה $\\lambda$) הכשל נובע מאי-יציבות גאומטרית אלסטית לפי אוילר הרבה לפני שמגיעים למאמץ הכניעה.",
      },
    ],
  },
  {
    id: "mech-q06-bending-moment-shear-relationship",
    domain: "יחסי גזירה ומומנט בכפיפה",
    title: "סטטיקה וחוזק חומרים - יחסי גזירה ומומנט בכפיפה",
    context:
      "על קורה פועל עומס מפורס אופקי/אנכי רציף $q(x)$ (מוגדר חיובי כלפי מטה). לפי המשוואות הדיפרנציאליות של שיווי משקל לקורה: $\\frac{dV}{dx} = -q(x)$ ו-$\\frac{dM}{dx} = V(x)$.",
    formulaLatex:
      "\\frac{dM(x)}{dx} = V(x), \\quad \\frac{dV(x)}{dx} = -q(x)",
    instruction:
      "איזה תנאי הכרחי מתקיים בנקודה שבה מומנט הכפיפה $M(x)$ מגיע לערכו הקיצוני (מקסימום או מינימום מקומי)?",
    options: [
      {
        id: "mech-q06-opt1",
        plainText: "העומס המפורס מתאפס ($q(x) = 0$).",
        isCorrect: false,
        explanation:
          "שגוי: איפוס העומס המפורס גורר שמהלך הגזירה קבוע, אך אינו מאפיין נקודת קיצון של המומנט.",
      },
      {
        id: "mech-q06-opt2",
        plainText:
          "כוח הגזירה מתאפס ($V(x) = 0$) או חוצה את ציר האפס ועובר שינוי סימן.",
        mathText: "V(x) = 0 \\quad \\text{or changes sign}",
        isCorrect: true,
        explanation:
          "נכון: מאחר ש-$\\frac{dM}{dx} = V(x)$, הנגזרת הראשונה של מומנט הכפיפה היא כוח הגזירה. נקודת קיצון של פונקציה חלקה מתקבלת כאשר נגזרתה מתאפסת ($V(x) = 0$). בנוכחות כוחות מרוכזים, הגזירה חווה קפיצה בדידה ונקודת הקיצון של המומנט תתרחש בנקודת החלפת הסימן של $V(x)$.",
      },
      {
        id: "mech-q06-opt3",
        plainText: "שקיעת הקורה שווה לאפס ($w(x) = 0$).",
        isCorrect: false,
        explanation:
          "שגוי: שקיעת הקורה מתאפסת בסמכים, ושם בדרך כלל המומנט אינו מקסימלי.",
      },
      {
        id: "mech-q06-opt4",
        plainText:
          "המומנט השני של השטח $I$ חייב להתאפס באותה נקודה.",
        isCorrect: false,
        explanation:
          "שגוי: מומנט האינרציה $I$ הוא גודל גאומטרי חיובי ממש של חתך הקורה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "mech-q07-thermal-stress-indeterminate-bar",
    domain: "מאמצים תרמיים במערכת לא-מסוימת סטטית",
    title: "סטטיקה וחוזק חומרים - מאמצים תרמיים במערכת לא-מסוימת סטטית",
    context:
      "מוט אחיד בעל שטח חתך $A$, אורך $L$, מודול אלסטיות $E$ ומקדם התפשטות תרמית $\\alpha$ מרותק היטב בין שני קירות קשיחים בלתי מתפשרים במרחק $L$. הטמפרטורה של המוט מועלית ב-$\\Delta T > 0$.",
    formulaLatex:
      "\\delta_{total} = \\delta_T + \\delta_R = \\alpha L \\Delta T + \\frac{R L}{E A} = 0",
    instruction:
      "מהו המאמץ הנורמלי $\\sigma$ הנוצר במוט כתוצאה מחימום זה?",
    options: [
      {
        id: "mech-q07-opt1",
        plainText: "$\\sigma = +E \\alpha \\Delta T$ (מאמץ מתיחה)",
        isCorrect: false,
        explanation:
          "שגוי: המוט שואף להתפשט והקירות בולמים אותו בלחיצה, ולכן המאמץ הוא מאמץ לחיצה (שלילי).",
      },
      {
        id: "mech-q07-opt2",
        plainText:
          "$\\sigma = 0$, משום שהקירות קבועים והמוט אינו מתארך כלל.",
        isCorrect: false,
        explanation:
          "שגוי: מניעת ההתארכות היא בדיוק הסיבה להיווצרות מאמצי תגובה פנימיים גבוהים.",
      },
      {
        id: "mech-q07-opt3",
        plainText: "$\\sigma = -E \\alpha \\Delta T$ (מאמץ לחיצה)",
        mathText: "\\sigma = -E \\alpha \\Delta T",
        isCorrect: true,
        explanation:
          "נכון: ההתפשטות התרמית החופשית היא $\\delta_T = \\alpha L \\Delta T$. תגובת הקירות היא כוח לחיצה $R$ הגורם להתקצרות אלסטית $\\delta_R = -\\frac{R L}{E A}$. מאחר שהקירות אינם מאפשרים תנועה, תנאי התאימות הוא $\\delta_{total} = \\delta_T + \\delta_R = 0 \\implies \\alpha L \\Delta T - \\frac{R L}{E A} = 0 \\implies \\frac{R}{A} = E \\alpha \\Delta T$. כוח התגובה מפעיל לחיצה, ולכן המאמץ הנורמלי הוא $\\sigma = -E \\alpha \\Delta T$.",
      },
      {
        id: "mech-q07-opt4",
        plainText: "$\\sigma = -\\frac{E \\alpha \\Delta T}{1 - 2\\nu}$",
        isCorrect: false,
        explanation:
          "שגוי: מקדם פואסון $\\nu$ נכנס לתמונה רק במצב שבו המוט מרותק תלת-ממדית בכל פאותיו הרוחביות.",
      },
    ],
  },
  {
    id: "mech-q08-castigliano-cantilever-deflection",
    domain: "אנרגיית עיבור ומשפט קסטיליאנו",
    title: "סטטיקה וחוזק חומרים - אנרגיית עיבור ומשפט קסטיליאנו",
    context:
      "קורה זיזית (Cantilever) בעלת אורך $L$ וקשיחות כפיפה קבועה $EI$ עמוסה בכוח מרוכז $P$ בקצה החופשי. אנרגיית העיבור האלסטית בכפיפה היא $U = \\int_0^L \\frac{M(x)^2}{2EI}\\,dx$.",
    formulaLatex:
      "M(x) = P(L - x), \\quad \\delta = \\frac{\\partial U}{\\partial P} = \\int_0^L \\frac{M(x)}{EI} \\frac{\\partial M(x)}{\\partial P} \\, dx",
    instruction:
      "מהי השקיעה האנכית $\\delta$ בקצה החופשי של הקורה לפי משפט קסטיליאנו השני?",
    options: [
      {
        id: "mech-q08-opt1",
        plainText: "$\\delta = \\frac{P L^2}{2EI}$",
        isCorrect: false,
        explanation:
          "שגוי: זהו שיפוע הקורה (הזווית $\\theta = \\frac{dw}{dx}$) בקצה החופשי, ולא השקיעה הקווית.",
      },
      {
        id: "mech-q08-opt2",
        plainText: "$\\delta = \\frac{P L^3}{8EI}$",
        isCorrect: false,
        explanation:
          "שגוי: תוצאה זו מתאימה לשקיעת קורה זיזית תחת עומס מפורס אחיד $q$, ולא כוח מרוכז.",
      },
      {
        id: "mech-q08-opt3",
        plainText: "$\\delta = \\frac{P L^3}{3EI}$",
        mathText: "\\delta = \\frac{P L^3}{3EI}",
        isCorrect: true,
        explanation:
          "נכון: מהלך המומנט לאורך הקורה (כאשר $x$ נמדד מהריתום) הוא $M(x) = -P(L - x)$. הנגזרת החלקית היא $\\frac{\\partial M}{\\partial P} = -(L - x)$. לפי משפט קסטיליאנו: $\\delta = \\frac{\\partial U}{\\partial P} = \\int_0^L \\frac{M}{EI}\\frac{\\partial M}{\\partial P}dx = \\frac{P}{EI}\\int_0^L (L - x)^2 dx = \\frac{P}{EI} \\left[ -\\frac{(L-x)^3}{3} \\right]_0^L = \\frac{P L^3}{3EI}$.",
      },
      {
        id: "mech-q08-opt4",
        plainText: "$\\delta = \\frac{P L^3}{48EI}$",
        isCorrect: false,
        explanation:
          "שגוי: שקיעה זו מתקבלת במרכז קורה על שני סמכים (Simply Supported) תחת כוח מרוכז במרכזה.",
      },
    ],
  },
  {
    id: "mech-q09-thin-walled-cylindrical-vessel",
    domain: "מכלי לחץ דקי-דופן ומאמצי מעטפת",
    title: "סטטיקה וחוזק חומרים - מכלי לחץ דקי-דופן ומאמצי מעטפת",
    context:
      "מכל לחץ גלילי סגור בעל רדיוס פנימי $r$ ועובי דופן דק $t$ ($t \\ll r$) נתון ללחץ גז פנימי אחיד $p$.",
    formulaLatex: "\\sigma_h = \\frac{p r}{t}, \\quad \\sigma_L = \\frac{p r}{2t}",
    instruction:
      "מהו היחס בין המאמץ ההיקפי (Hoop Stress, $\\sigma_h$) לבין המאמץ האורכי (Longitudinal Stress, $\\sigma_L$) בדופן המכל?",
    options: [
      {
        id: "mech-q09-opt1",
        plainText:
          "$\\sigma_h = \\sigma_L = \\frac{p r}{t}$ (שני המאמצים זהים מסימטריה)",
        isCorrect: false,
        explanation:
          "שגוי: שוויון מאמצים קיים אך ורק במכל כדורי מושלם. במכל גלילי המאמץ ההיקפי כפול מהמאמץ האורכי.",
      },
      {
        id: "mech-q09-opt2",
        plainText: "$\\sigma_L = 2\\sigma_h$",
        isCorrect: false,
        explanation:
          "שגוי: המאמץ האורכי קטן במחצית מהמאמץ ההיקפי ולא להפך, משום ששטח החתך האנכי של הגז גדול בהרבה.",
      },
      {
        id: "mech-q09-opt3",
        plainText:
          "$\\sigma_h = 2\\sigma_L$; המאמץ ההיקפי שווה ל-$\\frac{p r}{t}$, והמאמץ האורכי שווה ל-$\\frac{p r}{2t}$.",
        mathText: "\\sigma_h = 2\\sigma_L = \\frac{p r}{t}",
        isCorrect: true,
        explanation:
          "נכון: חיתוך אורכי של הגליל באורך $L$: כוח הלחץ הוא $p(2r L)$, והוא מאוזן על ידי שתי דפנות בשטח $2(t L)$, ומכאן $\\sigma_h = \\frac{2prL}{2tL} = \\frac{pr}{t}$. חיתוך רוחבי (כיפות הקצה): כוח הלחץ הפועל על המכסה הוא $p(\\pi r^2)$, והוא מאוזן על ידי שטח טבעת הדופן $2\\pi r t$, ומכאן $\\sigma_L = \\frac{p \\pi r^2}{2\\pi r t} = \\frac{pr}{2t}$. לכן המאמץ ההיקפי כפול מהאורכי ($\\sigma_h = 2\\sigma_L$), וזו הסיבה שמכלים גליליים נבקעים לאורכם בעת כשל.",
      },
      {
        id: "mech-q09-opt4",
        plainText: "$\\sigma_h = \\frac{p r}{4t}$ עקב דעיכת קרום דק.",
        isCorrect: false,
        explanation:
          "שגוי: ערך זה שגוי לחלוטין ואינו מקיים שיווי משקל כוחות בסיסי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "mech-q10-failure-theories-von-mises-tresca",
    domain: "תאוריות כשל לחומרים משיכים (Tresca vs. Von Mises)",
    title:
      "סטטיקה וחוזק חומרים - תאוריות כשל לחומרים משיכים (Tresca vs. Von Mises)",
    context:
      "במצב מאמצים של גזירה טהורה (Pure Shear: $\\sigma_1 = \\tau, \\sigma_2 = -\\tau, \\sigma_3 = 0$), משווים בין קריטריון מאמץ הגזירה המרבי (טרסקה) לבין קריטריון אנרגיית העיוות המרבית (פון מיזס) עבור חומר משיך בעל מאמץ כניעה במתיחה $\\sigma_y$.",
    formulaLatex:
      "\\tau_{max} = \\frac{\\sigma_1 - \\sigma_3}{2} \\le \\frac{\\sigma_y}{2}, \\quad \\sigma_{vm} = \\sqrt{\\frac{(\\sigma_1-\\sigma_2)^2 + (\\sigma_2-\\sigma_3)^2 + (\\sigma_3-\\sigma_1)^2}{2}} \\le \\sigma_y",
    instruction:
      "מהו מאמץ הגזירה בכניעה $\\tau_y$ החזוי על ידי כל אחת משתי התאוריות במצב גזירה טהורה?",
    options: [
      {
        id: "mech-q10-opt1",
        plainText:
          "שתי התאוריות חוזות בדיוק את אותו מאמץ כניעה: $\\tau_y = 0.5\\sigma_y$.",
        isCorrect: false,
        explanation:
          "שגוי: טרסקה ופון מיזס מתלכדים במתיחה חד-צירית, אך נבדלים בגזירה טהורה ובמצבי מאמץ דו-ציריים.",
      },
      {
        id: "mech-q10-opt2",
        plainText:
          "טרסקה חוזה $\\tau_y = \\frac{\\sigma_y}{\\sqrt{3}}$, ופון מיזס חוזה $\\tau_y = 0.5\\sigma_y$.",
        isCorrect: false,
        explanation:
          "שגוי: התוצאות הוחלפו; קריטריון טרסקה שמרני יותר ומחמיר את סף הכשל.",
      },
      {
        id: "mech-q10-opt3",
        plainText:
          "פון מיזס חוזה $\\tau_y = \\sigma_y$, וטרסקה חוזה $\\tau_y = 0.707\\sigma_y$.",
        isCorrect: false,
        explanation:
          "שגוי: מאמץ הכניעה בגזירה של חומר משיך תמיד נמוך משמעותית ממאמץ הכניעה במתיחה.",
      },
      {
        id: "mech-q10-opt4",
        plainText:
          "קריטריון טרסקה חוזה כניעה בגזירה עבור $\\tau_y = 0.5\\sigma_y$, בעוד שקריטריון פון מיזס מתיר עומס גבוה בכ-15.5% וחוזה $\\tau_y = \\frac{\\sigma_y}{\\sqrt{3}} \\approx 0.577\\sigma_y$.",
        mathText:
          "\\tau_y^{\\text{Tresca}} = 0.5\\sigma_y, \\quad \\tau_y^{\\text{Von Mises}} = \\frac{\\sigma_y}{\\sqrt{3}} \\approx 0.577\\sigma_y",
        isCorrect: true,
        explanation:
          "נכון: בגזירה טהורה המאמצים הראשיים הם $\\sigma_1 = \\tau, \\sigma_2 = 0, \\sigma_3 = -\\tau$. 1. לפי טרסקה: $\\tau_{\\max} = \\frac{\\tau - (-\\tau)}{2} = \\tau$. תנאי הכשל: $\\tau_{\\max} = \\frac{\\sigma_y}{2} \\implies \\tau_y = 0.5\\sigma_y$. 2. לפי פון מיזס: $\\sigma_{vm} = \\sqrt{\\frac{(\\tau - (-\\tau))^2 + (-\\tau - 0)^2 + (0 - \\tau)^2}{2}} = \\sqrt{\\frac{4\\tau^2 + \\tau^2 + \\tau^2}{2}} = \\sqrt{3}\\tau$. תנאי הכשל: $\\sqrt{3}\\tau = \\sigma_y \\implies \\tau_y = \\frac{\\sigma_y}{\\sqrt{3}} \\approx 0.577\\sigma_y$.",
      },
    ],
  },
  {
    id: "mech-q11-unsymmetrical-bending-neutral-axis",
    domain: "כפיפה לא-סימטרית וכיוון הציר הניטרלי",
    title: "סטטיקה וחוזק חומרים - כפיפה לא-סימטרית וכיוון הציר הניטרלי",
    context:
      "קורה בעלת מומנטי אינרציה ראשיים $I_y$ ו-$I_z$ ($I_y \\neq I_z$) מועמסת במומנט כפיפה $M$ הפועל במישור הנטוי בזווית $\\theta$ ביחס לציר הראשי $z$.",
    formulaLatex:
      "\\sigma_x = -\\frac{M_z y}{I_z} + \\frac{M_y z}{I_y}, \\quad \\tan\\alpha = \\frac{I_z}{I_y} \\tan\\theta",
    instruction:
      "מה ניתן לקבוע לגבי כיוון הציר הניטרלי (המישור שבו $\\sigma_x = 0$) ביחס לקו פעולת מומנט הכפיפה?",
    options: [
      {
        id: "mech-q11-opt1",
        plainText:
          "הציר הניטרלי מקביל תמיד לקו פעולת מומנט הכפיפה ($M$).",
        isCorrect: false,
        explanation:
          "שגוי: הקבלה קיימת אך ורק אם $I_y = I_z$ (חתך סימטרי עגול או ריבועי) או כאשר המומנט פועל לאורך ציר אינרציה ראשי.",
      },
      {
        id: "mech-q11-opt2",
        plainText:
          "הציר הניטרלי ניצב תמיד לכיוון השקיעה המקסימלית של הקורה.",
        isCorrect: false,
        explanation:
          "שגוי: הציר הניטרלי מתלכד עם ציר האפס של המאמצים הנורמליים ואינו ניצב לכיוון המומנט בחתך א-סימטרי.",
      },
      {
        id: "mech-q11-opt3",
        plainText:
          "הציר הניטרלי סוטה לכיוון הציר בעל מומנט האינרציה הנמוך יותר בזווית קבועה של $45^\\circ$.",
        isCorrect: false,
        explanation:
          "שגוי: הזווית אינה קבועה אלא תלויה ביחס המדויק $\\frac{I_z}{I_y}\\tan\\theta$.",
      },
      {
        id: "mech-q11-opt4",
        plainText:
          "הציר הניטרלי אינו מתלכד עם קו פעולת המומנט, וזווית נטייתו $\\alpha$ מקיימת $\\tan\\alpha = \\frac{I_z}{I_y} \\tan\\theta$, כך שהוא נוטה תמיד לעבר הציר הראשי בעל קשיחות הכפיפה הגבוהה יותר.",
        mathText: "\\tan\\alpha = \\frac{I_z}{I_y} \\tan\\theta",
        isCorrect: true,
        explanation:
          "נכון: נפרק את המומנט לרכיביו הראשיים: $M_z = M\\cos\\theta, M_y = M\\sin\\theta$. על הציר הניטרלי המאמץ מתאפס: $\\sigma_x = -\\frac{M_z y}{I_z} + \\frac{M_y z}{I_y} = 0 \\implies \\frac{y}{z} = \\frac{M_y I_z}{M_z I_y} = \\frac{I_z}{I_y} \\frac{\\sin\\theta}{\\cos\\theta} = \\frac{I_z}{I_y}\\tan\\theta$. מכיוון ש-$\\tan\\alpha = y/z$, מתקבל $\\tan\\alpha = \\frac{I_z}{I_y}\\tan\\theta$. מכיוון ש-$I_y \\neq I_z$, מתקיים $\\alpha \\neq \\theta$, כלומר הציר הניטרלי אינו ניצב ואינו מקביל לקו המומנט.",
      },
    ],
  },
  {
    id: "mech-q12-elastic-curve-boundary-conditions",
    domain: "המשוואה הדיפרנציאלית של הקו האלסטי ותנאי שפה",
    title:
      "סטטיקה וחוזק חומרים - המשוואה הדיפרנציאלית של הקו האלסטי ותנאי שפה",
    context:
      "שקיעת קורה אלסטית $w(x)$ מתוארת על ידי המשוואה הדיפרנציאלית מסדר רביעי: $EI \\frac{d^4 w}{dx^4} = q(x)$, כאשר $EI$ קבוע.",
    formulaLatex:
      "w(x) = \\text{Deflection}, \\quad w'(x) = \\theta(x), \\quad EI w''(x) = -M(x), \\quad EI w'''(x) = -V(x)",
    instruction:
      "מהם תנאי השפה המדויקים בקצה מרותק אידיאלית (Fixed support) ובסמך פרקי נייד (Roller support) בנקודה $x = x_0$?",
    options: [
      {
        id: "mech-q12-opt1",
        plainText:
          "בריתום: $M = 0, V = 0$; בסמך: $w = 0, \\theta = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: התנאים הוחלפו; בריתום המומנט והגזירה אינם אפס אלא תגובות ריסון.",
      },
      {
        id: "mech-q12-opt2",
        plainText:
          "בריתום ובסמך תנאי השפה זהים לחלוטין: $w = 0$ ו-$w'' = 0$.",
        isCorrect: false,
        explanation:
          "שגוי: בריתום הזווית מרוסנת לחלוטין ($w' = 0$) וקיים מומנט שונה מאפס ($w'' \\neq 0$).",
      },
      {
        id: "mech-q12-opt3",
        plainText:
          "בריתום: $w = 0, V = 0$; בסמך: $\\theta = 0, M = 0$.",
        isCorrect: false,
        explanation: "שגוי: ערבוב שגוי של תנאים קינמטיים ותנאים סטטיים.",
      },
      {
        id: "mech-q12-opt4",
        plainText:
          "בריתום (Fixed): השקיעה והשיפוע מתאפסים ($w = 0, w' = 0$); בסמך (Roller): השקיעה ומומנט הכפיפה מתאפסים ($w = 0, w'' = 0$).",
        mathText:
          "\\text{Fixed: } w(x_0) = 0, \\; w'(x_0) = 0; \\quad \\text{Roller: } w(x_0) = 0, \\; w''(x_0) = 0",
        isCorrect: true,
        explanation:
          "נכון: 1. ריתום אידיאלי מונע הזזה אנכית ומונע סיבוב, ולכן התנאים הקינמטיים הם שקיעה אפסית $w(x_0) = 0$ ושיפוע אפסי $w'(x_0) = 0$ (בעוד שהמומנט והגזירה אינם ידועים מראש). 2. סמך פרקי נייד מונע הזזה אנכית אך חופשי לחלוטין להסתובב סביב הפרק, ולכן השקיעה מתאפסת $w(x_0) = 0$ והמומנט הפנימי מתאפס $M(x_0) = 0 \\implies w''(x_0) = 0$.",
      },
    ],
  },
];

export const ACADEMIC_MECHANICS_MATERIALS_QUESTIONS =
  MECHANICS_MATERIALS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12, then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleMechanicsMaterialsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = MECHANICS_MATERIALS_QUESTIONS.slice(0, 3);
  const groupB = MECHANICS_MATERIALS_QUESTIONS.slice(3, 6);
  const groupC = MECHANICS_MATERIALS_QUESTIONS.slice(6, 12);

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
