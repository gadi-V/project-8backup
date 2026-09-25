import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic תורת החומרים diagnostic bank (12Q).
 * Display name: "תורת החומרים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const MATERIALS_SCIENCE_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "matsci-q01-crystal-structures-fcc-bcc-hcp-apf",
    domain: "מבנים גבישיים",
    title: "תורת החומרים - מבנים גבישיים FCC, BCC ו-HCP ומקדם אריזה אטומי",
    context:
      "מתכות טהורות מתגבשות לרוב באחד משלושת המבנים: FCC (Face-Centered Cubic), BCC (Body-Centered Cubic) או HCP (Hexagonal Close-Packed). מקדם האריזה האטומי מוגדר כ-$\\text{APF} = \\frac{N_{\\text{atoms}} \\cdot V_{\\text{atom}}}{V_{\\text{cell}}}$, כאשר האטומים ממודלים ככדורים קשיחים הנוגעים זה בזה לאורך כיוון הצפיפות המרבית.",
    formulaLatex:
      "\\text{APF}_{\\text{FCC}} = \\frac{\\pi}{3\\sqrt{2}} \\approx 0.74, \\quad \\text{APF}_{\\text{BCC}} = \\frac{\\pi\\sqrt{3}}{8} \\approx 0.68",
    instruction:
      "מהו מקדם האריזה האטומי של FCC לעומת BCC, ומה משמעות הדבר לגבי צפיפות ומישורי החלקה?",
    options: [
      {
        id: "matsci-q01-opt1",
        plainText:
          "ב-FCC (וגם ב-HCP) $\\text{APF} \\approx 0.74$ — אריזה צפופה מקסימלית עם מישורי החלקה צפופים $\\{111\\}$ בעלי 12 מערכות החלקה; ב-BCC $\\text{APF} \\approx 0.68$ — אריזה פחות צפופה, אך מספר מערכות ההחלקה גבוה יותר ולכן BCC נותר משיך בטמפרטורת החדר.",
        mathText:
          "\\text{APF}_{\\text{FCC}} = \\frac{\\pi}{3\\sqrt{2}} \\approx 0.74, \\quad \\text{APF}_{\\text{BCC}} = \\frac{\\pi\\sqrt{3}}{8} \\approx 0.68",
        isCorrect: true,
        explanation:
          "נכון: ב-FCC יש 4 אטומים לתא יחידה וקוטר האטום מקיים $a\\sqrt{2} = 4R$, ולכן $\\text{APF} = \\frac{4 \\cdot (4\\pi R^3/3)}{a^3} = \\pi/(3\\sqrt{2}) \\approx 0.74$. אותו ערך מתקבל ב-HCP. ב-BCC יש 2 אטומים לתא ו-$a\\sqrt{3} = 4R$, ולכן $\\text{APF} = \\pi\\sqrt{3}/8 \\approx 0.68$. הצפיפות הגבוהה ב-FCC משמעה מישורי $\\{111\\}$ צפופים מאוד עם אנרגיית שגיאת ערבוב נמוכה — מה שמסביר את המשיכות הגבוהה של Al, Cu, Au, Ni. ב-BCC המישור הצפוף ביותר הוא $\\{110\\}$ והכיוון $[111]$, אך קיימות מערכות רבות ($\\{110\\}$, $\\{112\\}$, $\\{123\\}$) שמפצות על ה-APF הנמוך יותר ומאפשרות משיכות בטמפרטורת החדר (למשל α-Fe).",
      },
      {
        id: "matsci-q01-opt2",
        plainText: "BCC תמיד צפוף יותר מ-FCC כי יש אטום במרכז התא.",
        isCorrect: false,
        explanation:
          "שגוי: האטום המרכזי ב-BCC אינו מגדיל את ה-APF מעבר ל-$0.68$; FCC עם 4 אטומים לתא צפוף יותר ($0.74$).",
      },
      {
        id: "matsci-q01-opt3",
        plainText: "HCP אינו מבנה צפוף מקסימלי; רק FCC מגיע ל-$\\text{APF} = 0.74$.",
        isCorrect: false,
        explanation:
          "שגוי: HCP ו-FCC שניהם אריזה צפופה מקסימלית עם $\\text{APF} = 0.74$; ההבדל הוא בסדר שכבות ($ABAB$ מול $ABCABC$).",
      },
      {
        id: "matsci-q01-opt4",
        plainText: "מקדם האריזה האטומי תלוי במסה האטומית בלבד ואינו קשור לגיאומטריית התא.",
        isCorrect: false,
        explanation:
          "שגוי: APF הוא גודל גיאומטרי חסר ממדים התלוי במספר האטומים ובנפח התא ביחס לנפח הכדורים — לא במסה.",
      },
    ],
  },
  {
    id: "matsci-q02-miller-indices-planes-directions",
    domain: "אינדקסי מילר",
    title: "תורת החומרים - אינדקסי מילר למישורים וכיוונים גבישיים",
    context:
      "במערכת קואורדינטות של תא יחידה קובית, מישור גבישי חותך את הצירים ב-$x = a/h'$, $y = a/k'$, $z = a/l'$. אינדקסי מילר $(hkl)$ מתקבלים מההופכיים של נקודות החיתוך לאחר נירמול למספרים שלמים קטנים ביותר. כיוון גבישי מסומן $[uvw]$.",
    formulaLatex:
      "(hkl) = \\left(\\frac{1}{x/a},\\;\\frac{1}{y/a},\\;\\frac{1}{z/a}\\right)_{\\text{cleared}}, \\quad [uvw] \\parallel \\text{vector}",
    instruction:
      "מישור חותך את הצירים ב-$x = a$, $y = a/2$, $z = \\infty$ (מקביל לציר $z$). מהם אינדקסי מילר של המישור, ומה הקשר בינם לבין הנורמל למישור בתא קובי?",
    options: [
      {
        id: "matsci-q02-opt1",
        plainText:
          "ההופכיים הם $(1, 2, 0)$, ולכן המישור הוא $(120)$; בתא קובי הנורמל למישור $(hkl)$ מקביל לכיוון $[hkl]$, כלומר הנורמל כאן הוא $[120]$.",
        mathText: "(120), \\quad \\mathbf{n} \\parallel [120] \\; (\\text{cubic})",
        isCorrect: true,
        explanation:
          "נכון: נקודות החיתוך ביחידות של $a$: $1$, $1/2$, $\\infty$. ההופכיים: $1/1 = 1$, $1/(1/2) = 2$, $1/\\infty = 0$. לאחר נירמול למספרים שלמים מקבלים $(120)$. בתא קובי (ורק בו) וקטור הנורמל למישור $(hkl)$ הוא בדיוק $[hkl]$ במערכת הקריסטלוגרפית — תוצאה של אורתוגונליות הצירים ואורכי תא שווים. לכן הנורמל הוא $[120]$. שימו לב: סימון עגול $(hkl)$ למישור, מרובע $[uvw]$ לכיוון, וסוגריים מסולסלים $\\{hkl\\}$ למשפחת מישורים שקולה סימטרית.",
      },
      {
        id: "matsci-q02-opt2",
        plainText: "המישור הוא $(210)$ כי לוקחים את נקודות החיתוך עצמן ללא הופכיים.",
        isCorrect: false,
        explanation:
          "שגוי: אינדקסי מילר מוגדרים כהופכיים של נקודות החיתוך; $(210)$ היה מתקבל לו החיתוכים היו $a/2$, $a$, $\\infty$.",
      },
      {
        id: "matsci-q02-opt3",
        plainText: "המישור הוא $(12\\infty)$ כי חיתוך באינסוף נשמר בסימון.",
        isCorrect: false,
        explanation:
          "שגוי: חיתוך באינסוף הופך ל-$0$ באינדקס; אין כותבים $\\infty$ בתוך $(hkl)$.",
      },
      {
        id: "matsci-q02-opt4",
        plainText: "בתא קובי הנורמל למישור $(hkl)$ הוא תמיד $[111]$, ללא תלות ב-$(hkl)$.",
        isCorrect: false,
        explanation:
          "שגוי: הנורמל מקביל ל-$[hkl]$ עצמו; $[111]$ הוא הנורמל רק למישור $(111)$.",
      },
    ],
  },
  {
    id: "matsci-q03-dislocations-burgers-slip-systems",
    domain: "דיסלוקציות",
    title: "תורת החומרים - דיסלוקציות, וקטור ברגרס ומערכות החלקה",
    context:
      "פלסטיות במתכות מתרחשת בעיקר ע״י תנועת דיסלוקציות. וקטור ברגרס $\\mathbf{b}$ מאפיין את העיוות השמור סביב קו הדיסלוקציה. מאמץ הגזירה הקריטי המפוזר (CRSS) על מערכת החלקה הוא $\\tau_{\\text{CRSS}} = \\sigma \\cos\\phi \\cos\\lambda$ (חוק שמיד).",
    formulaLatex:
      "\\mathbf{b}_{\\text{FCC}} = \\frac{a}{2}\\langle 110\\rangle, \\quad \\tau_{\\text{RSS}} = \\sigma \\cos\\phi \\cos\\lambda",
    instruction:
      "מהו וקטור ברגרס האופייני לדיסלוקציה מושלמת ב-FCC, וכיצד הוא קשור למישור ולכיוון ההחלקה?",
    options: [
      {
        id: "matsci-q03-opt1",
        plainText:
          "ב-FCC: $\\mathbf{b} = \\frac{a}{2}\\langle 110\\rangle$ על מישור $\\{111\\}$ — זהו הווקטור הקצר ביותר המחבר שתי נקודות סריג שכנות במישור הצפוף; אנרגיית הדיסלוקציה $\\propto |\\mathbf{b}|^2$ ולכן דיסלוקציות עם $|\\mathbf{b}|$ קטן מועדפות, וההחלקה מתרחשת במערכות $\\{111\\}\\langle 110\\rangle$.",
        mathText:
          "\\mathbf{b} = \\frac{a}{2}\\langle 110\\rangle, \\quad E_{\\text{el}} \\propto Gb^2, \\quad \\{111\\}\\langle 110\\rangle",
        isCorrect: true,
        explanation:
          "נכון: דיסלוקציה מושלמת (Perfect) ב-FCC מחברת שתי נקודות סריג שכנות לאורך כיוון הצפיפות המרבית $\\langle 110\\rangle$, ולכן $\\mathbf{b} = (a/2)\\langle 110\\rangle$ ו-$|\\mathbf{b}| = a/\\sqrt{2}$. אנרגיית העיוות האלסטית ליחידת אורך היא בקירוב $E \\approx \\alpha G b^2$; לכן הטבע מעדיף דיסלוקציות עם $|\\mathbf{b}|$ מינימלי. מישור ההחלקה הוא המישור הצפוף $\\{111\\}$, שבו ההתנגדות לתנועה נמוכה ביותר. 12 מערכות ההחלקה $\\{111\\}\\langle 110\\rangle$ מסבירות את המשיכות הגבוהה של מתכות FCC. דיסלוקציות חלקיות (Shockley) $\\mathbf{b} = (a/6)\\langle 112\\rangle$ מפצלות את הדיסלוקציה המושלמת ויוצרות שגיאת ערבוב (Stacking Fault).",
      },
      {
        id: "matsci-q03-opt2",
        plainText: "וקטור ברגרס ב-FCC הוא תמיד $a\\langle 100\\rangle$ כי אלה צירי התא.",
        isCorrect: false,
        explanation:
          "שגוי: $a\\langle 100\\rangle$ ארוך יותר מ-$(a/2)\\langle 110\\rangle$ ואנרגטית יקר בהרבה; אינו וקטור ההחלקה המועדף.",
      },
      {
        id: "matsci-q03-opt3",
        plainText: "דיסלוקציות נעות רק בניצב לוקטור ברגרס, ולכן אין קשר למישור החלקה.",
        isCorrect: false,
        explanation:
          "שגוי: דיסלוקציית קצה נעה בכיוון $\\mathbf{b}$ בתוך מישור ההחלקה; דיסלוקציית בורג נעה בניצב ל-$\\mathbf{b}$ — אך תמיד בתוך מישור ההחלקה.",
      },
      {
        id: "matsci-q03-opt4",
        plainText: "חוק שמיד קובע שמאמץ המתיחה $\\sigma$ שווה תמיד ל-$\\tau_{\\text{CRSS}}$ ללא תלות בזוויות.",
        isCorrect: false,
        explanation:
          "שגוי: $\\tau_{\\text{RSS}} = \\sigma \\cos\\phi \\cos\\lambda$; מקדם שמיד $\\cos\\phi\\cos\\lambda$ קובע מתי מושגת הכניעה על מערכת נתונה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "matsci-q04-fe-c-phase-diagram-eutectoid",
    domain: "דיאגרמת פאזות Fe-C",
    title: "תורת החומרים - דיאגרמת הפאזות Fe–C והתמרה אוטקטואידית",
    context:
      "בדיאגרמת שיווי המשקל ברזל–פחמן, ההתמרה האוטקטואידית מתרחשת ב-$T_e = 727^\\circ\\text{C}$ ובריכוז $C_e = 0.76\\,\\text{wt\\% C}$. האוסטניט ($\\gamma$) הופך לפרליט — מבנה שכבתי של פרית ($\\alpha$) וצמנטיט ($\\text{Fe}_3\\text{C}$).",
    formulaLatex:
      "\\gamma\\;(0.76\\,\\text{wt\\% C}) \\xrightarrow{727^\\circ\\text{C}} \\alpha + \\text{Fe}_3\\text{C} \\quad (\\text{pearlite})",
    instruction:
      "מה מתרחש בהתמרה האוטקטואידית בפלדת פחמן היפו-אוטקטואידית ($C_0 < 0.76\\,\\text{wt\\%}$), ומהו מבנה המיקרו הסופי לאחר קירור איטי?",
    options: [
      {
        id: "matsci-q04-opt1",
        plainText: "כל האוסטניט הופך ישירות לצמנטיט טהור ללא פרית.",
        isCorrect: false,
        explanation:
          "שגוי: ההתמרה האוטקטואידית מייצרת תערובת פרית+צמנטיט (פרליט), לא צמנטיט בלבד.",
      },
      {
        id: "matsci-q04-opt2",
        plainText:
          "תחילה נוצרת פרית פרו-אוטקטואידית מתוך האוסטניט מעל $727^\\circ\\text{C}$; האוסטניט הנותר בריכוז $0.76\\,\\text{wt\\%}$ הופך ב-$727^\\circ\\text{C}$ לפרליט. המבנה הסופי: פרית פרו-אוטקטואידית + פרליט.",
        mathText:
          "W_{\\text{pearlite}} = \\frac{C_0 - 0.022}{0.76 - 0.022}, \\quad W_{\\alpha'} = 1 - W_{\\text{pearlite}}",
        isCorrect: true,
        explanation:
          "נכון: בפלדה היפו-אוטקטואידית ($C_0 < 0.76\\,\\text{wt\\% C}$), בקירור איטי דרך שדה $\\alpha+\\gamma$ נוצרת פרית פרו-אוטקטואידית על גבולות גרעיני האוסטניט, והאוסטניט הנותר מתעשר עד $0.76\\,\\text{wt\\% C}$. ב-$727^\\circ\\text{C}$ האוסטניט הנותר עובר התמרה אוטקטואידית לפרליט ($\\alpha + \\text{Fe}_3\\text{C}$ בשכבות). כלל המנוף נותן את שבר הפרליט: $W_p = (C_0 - 0.022)/(0.76 - 0.022)$. ככל ש-$C_0$ קרוב יותר ל-$0.76$, אחוז הפרליט עולה והחוזק עולה. בפלדה היפר-אוטקטואידית ($C_0 > 0.76$) נוצר תחילה צמנטיט פרו-אוטקטואידי, ואז פרליט.",
      },
      {
        id: "matsci-q04-opt3",
        plainText: "ההתמרה האוטקטואידית זהה להתמרה האוטקטית ב-$1147^\\circ\\text{C}$ ומייצרת לדה-בוריט.",
        isCorrect: false,
        explanation:
          "שגוי: האוטקטיקה ($1147^\\circ\\text{C}$, $4.3\\,\\text{wt\\% C}$) מייצרת לדה-בוריט מנוזל; האוטקטואיד הוא התמרה מוצק–מוצק ב-$727^\\circ\\text{C}$.",
      },
      {
        id: "matsci-q04-opt4",
        plainText: "בפלדה היפו-אוטקטואידית אין פרליט כלל — רק מרטנזיט.",
        isCorrect: false,
        explanation:
          "שגוי: מרטנזיט נוצר בקירור מהיר (המרה ללא דיפוזיה); בקירור איטי מתקבל פרליט + פרית פרו-אוטקטואידית.",
      },
    ],
  },
  {
    id: "matsci-q05-fick-diffusion-steady-nonsteady",
    domain: "דיפוזיה לפי פיק",
    title: "תורת החומרים - דיפוזיה: חוקי פיק ומקדם דיפוזיה",
    context:
      "דיפוזיה אטומית במצב מוצק מתוארת ע״י חוקי פיק. במצב מתמיד חד-ממדי השטף $J = -D\\,\\partial C/\\partial x$. במצב לא-מתמיד: $\\partial C/\\partial t = D\\,\\partial^2 C/\\partial x^2$. מקדם הדיפוזיה תלוי בטמפרטורה: $D = D_0\\exp(-Q_d/RT)$.",
    formulaLatex:
      "J = -D\\frac{\\partial C}{\\partial x}, \\quad \\frac{\\partial C}{\\partial t} = D\\frac{\\partial^2 C}{\\partial x^2}, \\quad D = D_0 e^{-Q_d/RT}",
    instruction:
      "בתהליך קרבוריזציה (העשרת פני שטח בפלדה בפחמן), מה קובע את עומק השכבה המעשרת לאחר זמן $t$, וכיצד משפיעה העלאת הטמפרטורה?",
    options: [
      {
        id: "matsci-q05-opt1",
        plainText: "עומק הדיפוזיה פרופורציונלי ל-$t^2$ ואינו תלוי ב-$D$.",
        isCorrect: false,
        explanation:
          "שגוי: אורך הדיפוזיה האופייני הוא $\\sqrt{Dt}$, לא $t^2$; ותלוי חזק ב-$D$.",
      },
      {
        id: "matsci-q05-opt2",
        plainText:
          "הפרופיל $C(x,t)$ נשלט ע״י $\\text{erf}(x/(2\\sqrt{Dt}))$; עומק חדירה אופייני $\\propto \\sqrt{Dt}$. העלאת $T$ מגדילה את $D$ אקספוננציאלית ($D = D_0 e^{-Q_d/RT}$) ומאיצה דרמטית את הקרבוריזציה.",
        mathText:
          "\\frac{C_x - C_0}{C_s - C_0} = 1 - \\text{erf}\\!\\left(\\frac{x}{2\\sqrt{Dt}}\\right), \\quad x \\sim \\sqrt{Dt}",
        isCorrect: true,
        explanation:
          "נכון: לבעיית חצי-מרחב עם ריכוז פנים קבוע $C_s$ וריכוז התחלתי $C_0$, הפתרון הוא $(C_x-C_0)/(C_s-C_0) = 1 - \\text{erf}(x/(2\\sqrt{Dt}))$. לכן מיקום שבו מושג ריכוז יעד נתון מקיים $x/(2\\sqrt{Dt}) = \\text{const}$, כלומר $x \\propto \\sqrt{Dt}$. מכאן: הכפלת הזמן מגדילה את העומק רק פי $\\sqrt{2}$. מאחר ש-$D = D_0\\exp(-Q_d/RT)$ תלוי אקספוננציאלית ב-$T$, העלאת טמפרטורת הכבשן (בגבולות המטאלוגיים) יעילה בהרבה מהארכת הזמן. $Q_d$ לדיפוזיית פחמן באוסטניט נמוך יחסית לדיפוזיית תחליף (substitutional), ולכן קרבוריזציה מעשית ב-$850$–$950^\\circ\\text{C}$.",
      },
      {
        id: "matsci-q05-opt3",
        plainText: "חוק פיק הראשון תקף רק במצב לא-מתמיד, והשני רק במצב מתמיד.",
        isCorrect: false,
        explanation:
          "שגוי: להפך — חוק ראשון מתאר שטף (שימושי במצב מתמיד); חוק שני הוא משוואת הרציפות לריכוז בזמן.",
      },
      {
        id: "matsci-q05-opt4",
        plainText: "מקדם הדיפוזיה $D$ קטן עם עליית הטמפרטורה כי האטומים נעים פחות.",
        isCorrect: false,
        explanation:
          "שגוי: $D$ גדל אקספוננציאלית עם $T$ עקב תדירות קפיצות מוגברת וריכוז מקומות פנויים גבוה יותר.",
      },
    ],
  },
  {
    id: "matsci-q06-strengthening-mechanisms-hall-petch-precipitate",
    domain: "מנגנוני חיזוק",
    title: "תורת החומרים - מנגנוני חיזוק: גודל גרעין, תמיסה מוצקה ומשקעים",
    context:
      "חוזק הכניעה של מתכות ניתן להעלאה ע״י עיכוב תנועת דיסלוקציות. ארבעה מנגנונים מרכזיים: חיזוק גודל-גרעין (Hall–Petch), חיזוק תמיסה מוצקה, חישול-עבודה (התקשות בעיוות), וחיזוק משקעים/פיזור.",
    formulaLatex:
      "\\sigma_y = \\sigma_0 + k_y d^{-1/2}, \\quad \\tau_{\\text{Orowan}} \\approx \\frac{Gb}{L}",
    instruction:
      "כיצד פועל חוק הול–פטש, ומה ההבדל המהותי בין חיזוק משקעים ע״י חיתוך (Shearing) לבין מנגנון אורוואן (Orowan Looping)?",
    options: [
      {
        id: "matsci-q06-opt1",
        plainText: "הקטנת גודל הגרעין $d$ מורידה את $\\sigma_y$ כי יש יותר גבולות גרעין חלשים.",
        isCorrect: false,
        explanation:
          "שגוי: לפי הול–פטש $\\sigma_y = \\sigma_0 + k_y d^{-1/2}$; הקטנת $d$ מעלה את חוזק הכניעה.",
      },
      {
        id: "matsci-q06-opt2",
        plainText:
          "גבולות גרעין חוסמים דיסלוקציות; $d$ קטן יותר $\\Rightarrow$ $\\sigma_y$ גבוה יותר ($\\propto d^{-1/2}$). במשקעים עדינים הדיסלוקציה חותכת אותם; מעל רדיוס קריטי היא עוקפת ומשאירה לולאות אורוואן ($\\tau \\propto Gb/L$), ואז חיזוק מרבי מתקבל בפיזור אופטימלי.",
        mathText:
          "\\sigma_y = \\sigma_0 + k_y d^{-1/2}, \\quad \\tau_{\\text{Orowan}} \\approx Gb/L",
        isCorrect: true,
        explanation:
          "נכון: 1. הול–פטש: ערימת דיסלוקציות בגבול גרעין יוצרת ריכוז מאמץ שמפעיל גרעין שכן; ככל שהגרעין קטן יותר, אורך הערימה קצר יותר ונדרש מאמץ חיצוני גבוה יותר — $\\sigma_y = \\sigma_0 + k_y d^{-1/2}$. 2. חיזוק משקעים: חלקיקים קוהרנטיים קטנים נחתכים ע״י דיסלוקציות (התנגדות עולה עם רדיוס המשקע). מעל גודל קריטי, הדיסלוקציה עוקפת את החלקיק ומשאירה לולאת אורוואן; אז $\\tau \\approx Gb/L$ כאשר $L$ הוא המרווח בין חלקיקים. לכן קיים רדיוס אופטימלי שבו החיזוק מקסימלי (בסיס לטיפול הזדקנות ב-Al-Cu, Ni-superalloys). חישול-עבודה מעלה צפיפות דיסלוקציות ($\\rho$) ומחזק לפי $\\tau \\propto Gb\\sqrt{\\rho}$.",
      },
      {
        id: "matsci-q06-opt3",
        plainText: "מנגנון אורוואן פועל רק בפולימרים אמורפיים ללא סריג גבישי.",
        isCorrect: false,
        explanation:
          "שגוי: אורוואן הוא מנגנון מתכתי/גבישי לעקיפת חלקיקי פיזור ע״י דיסלוקציות.",
      },
      {
        id: "matsci-q06-opt4",
        plainText: "חיזוק תמיסה מוצקה נובע רק מהגדלת מודול יאנג $E$ של המטריצה.",
        isCorrect: false,
        explanation:
          "שגוי: החיזוק נובע בעיקר מעיוות סריג מקומי סביב אטומי מומס (הבדלי רדיוס ומודול) שמפריעים לתנועת דיסלוקציות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "matsci-q07-fracture-toughness-kic-griffith",
    domain: "קשיחות שבר",
    title: "תורת החומרים - קשיחות שבר $K_{Ic}$ וקריטריון גריפית׳",
    context:
      "במכניקת שבר לינארית-אלסטית (LEFM), מקדם עוצמת המאמץ במוד I הוא $K_I = \\sigma\\sqrt{\\pi a}\\,Y$. קשיחות השבר $K_{Ic}$ היא הערך הקריטי שבו מתחיל שבר פריך בלתי-יציב. אנרגיית השבר של גריפית׳ לחומר פריך: $\\sigma_f = \\sqrt{2E\\gamma_s/(\\pi a)}$.",
    formulaLatex:
      "K_I = Y\\sigma\\sqrt{\\pi a}, \\quad K_{Ic} = Y\\sigma_f\\sqrt{\\pi a}, \\quad G_c = \\frac{K_{Ic}^2}{E'}",
    instruction:
      "רכיב פריך עם סדק שפתח באורך $a$ נתון למאמץ מתיחה $\\sigma$. מתי יתרחש כשל שבר, ומה הקשר בין $K_{Ic}$ לגודל הסדק הקריטי?",
    options: [
      {
        id: "matsci-q07-opt1",
        plainText: "כשל מתרחש כאשר $\\sigma = E$, ללא תלות באורך הסדק.",
        isCorrect: false,
        explanation:
          "שגוי: חוזק תאורטי $\\sim E/10$ אינו רלוונטי בנוכחות סדקים; הכשל נקבע ע״י $K_I = K_{Ic}$.",
      },
      {
        id: "matsci-q07-opt2",
        plainText: "$K_{Ic}$ גדל לינארית עם אורך הסדק $a$, ולכן סדקים ארוכים בטוחים יותר.",
        isCorrect: false,
        explanation:
          "שגוי: $K_{Ic}$ הוא תכונת חומר; $K_I$ גדל עם $\\sqrt{a}$, ולכן סדק ארוך יותר מסוכן יותר.",
      },
      {
        id: "matsci-q07-opt3",
        plainText:
          "כשל כאשר $K_I = K_{Ic}$, כלומר $\\sigma_f = K_{Ic}/(Y\\sqrt{\\pi a})$. הסדק הקריטי ב-$\\sigma$ נתון: $a_c = \\frac{1}{\\pi}(K_{Ic}/(Y\\sigma))^2$. חומר עם $K_{Ic}$ גבוה סובל סדקים ארוכים יותר לפני שבר.",
        mathText:
          "\\sigma_f = \\frac{K_{Ic}}{Y\\sqrt{\\pi a}}, \\quad a_c = \\frac{1}{\\pi}\\left(\\frac{K_{Ic}}{Y\\sigma}\\right)^2",
        isCorrect: true,
        explanation:
          "נכון: תנאי הכשל ב-LEFM הוא $K_I = Y\\sigma\\sqrt{\\pi a} = K_{Ic}$. פתרון למאמץ הכשל: $\\sigma_f = K_{Ic}/(Y\\sqrt{\\pi a})$ — מאמץ הכשל יורד עם $\\sqrt{a}$. פתרון לאורך הקריטי: $a_c = (1/\\pi)(K_{Ic}/(Y\\sigma))^2$. לכן תכן בטוח מחייב בקרת גודל פגמים (NDT) ו/או בחירת חומר עם $K_{Ic}$ גבוה (למשל פלדות משיכות מול קרמיקות). הקשר לאנרגיה: $G_c = K_{Ic}^2/E'$ (מישור מאמץ/מישור עיבור). בחומרים משיכים יש אזור פלסטי בקצה הסדק ו-$K_{Ic}$ תקף רק כאשר האזור קטן ביחס ל-$a$ ולמימדי הדגם (תנאי Small-Scale Yielding).",
      },
      {
        id: "matsci-q07-opt4",
        plainText: "קריטריון גריפית׳ תקף רק למתכות משיכות עם זוננת פלסטית גדולה.",
        isCorrect: false,
        explanation:
          "שגוי: גריפית׳ המקורי נגזר לחומרים פריכים (זכוכית); למתכות משיכות נדרשת הרחבה עם $\\gamma_p$ או מעבר ל-$J$-integral / CTOD.",
      },
    ],
  },
  {
    id: "matsci-q08-fatigue-sn-paris-law",
    domain: "עייפות",
    title: "תורת החומרים - עייפות: עקומת S–N וחוק פאריס",
    context:
      "כשל עייפות מתפתח תחת מאמץ מחזורי מתחת לחוזק הסטטי. עקומת S–N מציגה את המשרעת $\\sigma_a$ מול מספר המחזורים לכשל $N_f$. בקצב גידול סדק עייפות, חוק פאריס: $da/dN = C(\\Delta K)^m$, כאשר $\\Delta K = K_{\\max} - K_{\\min}$.",
    formulaLatex:
      "\\frac{da}{dN} = C(\\Delta K)^m, \\quad \\Delta K = Y\\Delta\\sigma\\sqrt{\\pi a}",
    instruction:
      "מה מאפיין את שלושת שלבי גידול סדק העייפות, ומה משמעות מעבר סף $\\Delta K_{th}$?",
    options: [
      {
        id: "matsci-q08-opt1",
        plainText: "סדק עייפות גדל בקצב קבוע מהמחזור הראשון ללא תלות ב-$\\Delta K$.",
        isCorrect: false,
        explanation:
          "שגוי: קצב הגידול תלוי חזק ב-$\\Delta K$ לפי פאריס, ומתחת ל-$\\Delta K_{th}$ הגידול זניח.",
      },
      {
        id: "matsci-q08-opt2",
        plainText: "בפלדות יש תמיד גבול עייפות $\\sigma_e = 0$, ולכן כל מאמץ מחזורי גורם לכשל.",
        isCorrect: false,
        explanation:
          "שגוי: לפלדות BCC רבות יש גבול עייפות ($\\sigma_e > 0$) שמתחתיו חיים אינסופיים בקירוב; ל-FCC (Al) אין גבול ברור.",
      },
      {
        id: "matsci-q08-opt3",
        plainText:
          "שלב I: גידול איטי ליד סף $\\Delta K_{th}$; שלב II: פאריס $da/dN = C(\\Delta K)^m$ (יציב בלוג–לוג); שלב III: גידול מואץ לקראת $K_{Ic}$. מתחת ל-$\\Delta K_{th}$ הסדק אינו גדל באופן מעשי.",
        mathText:
          "\\Delta K < \\Delta K_{th}:\\;\\frac{da}{dN}\\approx 0; \\quad \\text{II: } C(\\Delta K)^m; \\quad \\text{III: } K_{\\max}\\to K_{Ic}",
        isCorrect: true,
        explanation:
          "נכון: דיאגרמת $da/dN$ מול $\\Delta K$ (לוג–לוג) מחולקת לשלושה אזורים: (I) ליד סף העייפות $\\Delta K_{th}$ — גידול זניח/עצירה, תלוי ביחס $R = K_{\\min}/K_{\\max}$ ובסביבה; (II) משטר פאריס הליניארי בלוג–לוג עם שיפוע $m$ (טיפוסי $2$–$4$ למתכות), שבו רוב חיי הרכיב מחושבים באינטגרציה $N_f = \\int_{a_i}^{a_c} da/(C(\\Delta K)^m)$; (III) גידול מואץ כאשר $K_{\\max}$ מתקרב ל-$K_{Ic}$ ושבר סופי. תכן עייפות יכול להתבסס על חיים סופיים (S–N) או על סבילות נזק (Damage Tolerance) עם בקרת סדקים.",
      },
      {
        id: "matsci-q08-opt4",
        plainText: "חוק פאריס תקף רק לעומס סטטי מונוטוני, לא למחזורים.",
        isCorrect: false,
        explanation:
          "שגוי: פאריס מתאר במפורש גידול סדק למחזור תחת $\\Delta K$ מחזורי.",
      },
    ],
  },
  {
    id: "matsci-q09-creep-norton-larson-miller",
    domain: "זחילה",
    title: "תורת החומרים - זחילה בטמפרטורה גבוהה ופרמטר לרסון–מילר",
    context:
      "זחילה (Creep) היא עיוות תלוי-זמן תחת מאמץ קבוע בטמפרטורה גבוהה ($T \\gtrsim 0.4\\,T_m$). עקומת הזחילה כוללת שלב ראשוני (דעיכה), משני (קצב מינימלי יציב) ושלישוני (האצה לקראת שבר). קצב הזחילה המשני לפי נורטון: $\\dot{\\varepsilon}_{ss} = A\\sigma^n\\exp(-Q_c/RT)$.",
    formulaLatex:
      "\\dot{\\varepsilon}_{ss} = A\\sigma^n e^{-Q_c/RT}, \\quad P_{LM} = T\\bigl(\\log t_r + C\\bigr)",
    instruction:
      "מה מאפיין את משטר הזחילה המשני, וכיצד משמש פרמטר לרסון–מילר לחיזוי חיי שבר?",
    options: [
      {
        id: "matsci-q09-opt1",
        plainText: "זחילה מתרחשת רק ב-$T = 0\\,\\text{K}$ ואינה תלויה במאמץ.",
        isCorrect: false,
        explanation:
          "שגוי: זחילה דורשת טמפרטורה גבוהה יחסית ל-$T_m$ ומאמץ; ב-$0\\,\\text{K}$ אין דיפוזיה מספקת.",
      },
      {
        id: "matsci-q09-opt2",
        plainText: "השלב המשני מאופיין בקצב זחילה הולך וגדל עד השבר המיידי.",
        isCorrect: false,
        explanation:
          "שגוי: בשלב המשני הקצב מינימלי ויציב בקירוב; ההאצה היא בשלב השלישוני.",
      },
      {
        id: "matsci-q09-opt3",
        plainText:
          "בשלב המשני $\\dot{\\varepsilon}_{ss} = A\\sigma^n e^{-Q_c/RT}$ (איזון בין התקשות לריכוך דיפוזיוני). פרמטר לרסון–מילר $P_{LM} = T(\\log t_r + C)$ מאפשר אקסטרפולציה של חיי שבר $t_r$ מבדיקות קצרות ב-$T$ גבוהה לתנאי שירות ארוכים.",
        mathText:
          "\\dot{\\varepsilon}_{ss} = A\\sigma^n e^{-Q_c/RT}, \\quad P_{LM} = T(\\log t_r + C)",
        isCorrect: true,
        explanation:
          "נכון: בשלב הזחילה המשני קצב יצירת דיסלוקציות מאוזן ע״י שחזור דיפוזיוני (climb/recovery), ולכן $\\dot{\\varepsilon}_{ss}$ קבוע בקירוב. התלות במאמץ מעריכית עם $n\\approx 3$–$8$ בזחילת נקע, ו-$n\\approx 1$ בזחילת דיפוזיה (Nabarro–Herring / Coble). אנרגיית האקטיבציה $Q_c$ קרובה לזו של דיפוזיה עצמית. פרמטר לרסון–מילר מבוסס על כך ששילוב $T$ ו-$\\log t_r$ קובע את המאמץ לכשל: בדיקות מואצות בטמפרטורה גבוהה נותנות $P_{LM}$, וממנו גוזרים $t_r$ בטמפרטורת השירות — כלי מרכזי בתכן טורבינות, דוודים וצנרת לחץ.",
      },
      {
        id: "matsci-q09-opt4",
        plainText: "פרמטר לרסון–מילר תקף רק לפולימרים מתחת ל-$T_g$ ואינו רלוונטי למתכות.",
        isCorrect: false,
        explanation:
          "שגוי: לרסון–מילר פותח במקור למתכות בטמפרטורה גבוהה; לפולימרים משתמשים במודלים ויסקו-אלסטיים אחרים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "matsci-q10-polymers-tg-viscoelasticity-mw",
    domain: "פולימרים",
    title: "תורת החומרים - פולימרים: מעבר זכוכיתי, ויסקו-אלסטיות ומשקל מולקולרי",
    context:
      "פולימרים אמורפיים עוברים ממצב זכוכיתי למצב גומי סביב טמפרטורת המעבר הזכוכיתי $T_g$. התנהגות מכנית ויסקו-אלסטית מתוארת לעיתים במודל מקסוול או קלווין–וייט. דרגת הפילמור ומשקל מולקולרי ממוצע $M_w$ משפיעים חזק על החוזק והצמיגות.",
    formulaLatex:
      "E(t) = E_0 e^{-t/\\tau}, \\quad \\tau = \\frac{\\eta}{E}, \\quad T_g = T_g(M, \\text{chemistry})",
    instruction:
      "מה קורה מכנית במעבר דרך $T_g$, וכיצד משפיע הגדלת המשקל המולקולרי על תכונות התרמופלסט?",
    options: [
      {
        id: "matsci-q10-opt1",
        plainText: "$T_g$ הוא טמפרטורת ההיתוך של גבישי הפולימר, ומעליה המודול קופץ מעלה.",
        isCorrect: false,
        explanation:
          "שגוי: $T_m$ הוא היתוך גבישי; $T_g$ הוא מעבר אמורפי שבו המודול יורד בסדרי גודל (זכוכית→גומי).",
      },
      {
        id: "matsci-q10-opt2",
        plainText: "ויסקו-אלסטיות משמעה שהחומר הוא אלסטי מושלם ללא תלות בזמן או בקצב.",
        isCorrect: false,
        explanation:
          "שגוי: ויסקו-אלסטיות משמעה תלות מפורשת בזמן/קצב — רלקסציית מאמץ וקריפ.",
      },
      {
        id: "matsci-q10-opt3",
        plainText: "הגדלת $M_w$ מורידה תמיד את טמפרטורת המעבר הזכוכיתי $T_g$ לאפס.",
        isCorrect: false,
        explanation:
          "שגוי: $T_g$ עולה עם $M$ עד אסימפטוטה; אינו יורד לאפס עם עליית משקל מולקולרי.",
      },
      {
        id: "matsci-q10-opt4",
        plainText:
          "מתחת ל-$T_g$ הפולימר האמורפי קשיח ופריך (מודול גבוה); מעליו שרשראות מקבלות ניידות מקומית והמודול צונח למצב גומי. הגדלת $M_w$ מעלה שזירות (Entanglements), מגדילה חוזק/צמיגות נמס, ומשפרת עמידות לזחילה — עד גבול עיבוד.",
        mathText:
          "T < T_g:\\; E \\sim \\text{GPa}; \\quad T > T_g:\\; E \\sim \\text{MPa (rubber)}; \\quad \\nu_e \\propto M_w",
        isCorrect: true,
        explanation:
          "נכון: ב-$T < T_g$ זמן הרלקסציה של מקטעי שרשרת ארוך מזמן הניסוי — התנהגות זכוכיתית קשיחה. סביב $T_g$ (ולמעשה על פני טווח) המודול יורד בחדות. מעל $T_g$ (ובעיקר מעל $T_g$ עם שזירות) מתקבל משטר גומי רך עם מודול הנשלט ע״י צפיפות השזירות. עליית $M_w$ מגדילה את מספר השזירות ליחידת נפח האפקטיביות, מעלה את חוזק המתיחה ואת הצמיגות של הנמס ($\\eta \\propto M_w^{3.4}$ מעל משקל שזירה קריטי) — יתרון לביצועים אך קושי בעיבוד (הזרקה/שיחול). קריסטליניות חלקית (PE, PP, PET) מוסיפה פאזה קשיחה ומעלה חוזק מעל $T_g$ של האזור האמורפי.",
      },
    ],
  },
  {
    id: "matsci-q11-ceramics-brittleness-weibull-ionic-covalent",
    domain: "קרמיקות",
    title: "תורת החומרים - קרמיקות: פריכות, סטטיסטיקת וייבול וקשרים יוניים/קוולנטיים",
    context:
      "קרמיקות הנדסיות ($\\text{Al}_2\\text{O}_3$, $\\text{Si}_3\\text{N}_4$, $\\text{ZrO}_2$) מתאפיינות במודול גבוה, עמידות תרמית וכימית, אך פריכות גבוהה עקב קושי בהפעלת מערכות החלקה. חוזק הכשל סטטיסטי ומתואר לעיתים בהתפלגות וייבול.",
    formulaLatex:
      "P_f = 1 - \\exp\\!\\left[-V\\left(\\frac{\\sigma}{\\sigma_0}\\right)^m\\right], \\quad K_{Ic}^{\\text{cer}} \\ll K_{Ic}^{\\text{metal}}",
    instruction:
      "מדוע קרמיקות פריכות בהשוואה למתכות, ומה משמעות מודול וייבול $m$ גבוה?",
    options: [
      {
        id: "matsci-q11-opt1",
        plainText: "קרמיקות משיכות כי דיסלוקציות נעות בהן בקלות בטמפרטורת החדר כמו ב-FCC.",
        isCorrect: false,
        explanation:
          "שגוי: קשרים יוניים/קוולנטיים חזקים ומישורי החלקה מוגבלים מונעים פלסטיות משמעותית ב-$T_{\\text{room}}$.",
      },
      {
        id: "matsci-q11-opt2",
        plainText: "מודול וייבול $m$ גבוה משמעו שונות חוזק גדולה מאוד בין דגמים.",
        isCorrect: false,
        explanation:
          "שגוי: $m$ גבוה משמעו התפלגות צרה ואמינות גבוהה יותר; $m$ נמוך — שונות גדולה.",
      },
      {
        id: "matsci-q11-opt3",
        plainText: "חוזק קרמיקה אינו תלוי בגודל הדגם או בנפח תחת מאמץ.",
        isCorrect: false,
        explanation:
          "שגוי: לפי וייבול, נפח גדול יותר מעלה את ההסתברות לפגם קריטי ומוריד את החוזק הממוצע.",
      },
      {
        id: "matsci-q11-opt4",
        plainText:
          "פריכות נובעת מחוסר מערכות החלקה פעילות ומ-$K_{Ic}$ נמוך; כשל נשלט ע״י הפגם הגדול ביותר. $P_f = 1 - \\exp[-V(\\sigma/\\sigma_0)^m]$: $m$ גבוה $\\Rightarrow$ חוזק עקבי. לכן תכן קרמי מחייב בקרת פגמים, לחיצה עדיפה על מתיחה, והקשחת מעבר פאזה (למשל $\\text{ZrO}_2$ מיוצב).",
        mathText:
          "P_f = 1 - e^{-V(\\sigma/\\sigma_0)^m}, \\quad m \\uparrow \\Rightarrow \\text{reliability}\\uparrow",
        isCorrect: true,
        explanation:
          "נכון: בקרמיקות יוניות/קוולנטיות תנועת דיסלוקציות קשה בטמפרטורת החדר, ולכן אין מנגנון לפיזור אנרגיה פלסטית בקצה סדק — $K_{Ic}$ נמוך (טיפוסי $1$–$5\\,\\text{MPa}\\sqrt{\\text{m}}$ מול עשרות במתכות). הכשל נקבע ע״י הסדק/נקבוביות הגרועים ביותר (Weakest Link), ולכן החוזק סטטיסטי ותלוי נפח. התפלגות וייבול: $m$ גבוה (למשל $15$–$20$) מציין איכות תהליך טובה ושונות נמוכה; $m$ נמוך ($5$–$10$) — רגישות גבוהה לפגמים. אסטרטגיות: הקטנת גודל גרעין/נקבוביות, ציפויים לדחיסת פנים, והקשחה ע״י מעבר פאזה בזרקוניה (Transformation Toughening) שמעלה $K_{Ic}$ אפקטיבית.",
      },
    ],
  },
  {
    id: "matsci-q12-composites-rule-of-mixtures-fiber",
    domain: "חומרים מרוכבים",
    title: "תורת החומרים - מרוכבים: כלל התערובות, סיבים אורכיים ורוחביים",
    context:
      "במרוכב סיבי רציף חד-כיווני, שבר נפח הסיבים הוא $V_f$ ושבר המטריצה $V_m = 1 - V_f$. במתיחה מקבילה לסיבים (איזואסטרain) ובניצב להם (איזואסטרס) מתקבלים חסמים שונים למודול האפקטיבי.",
    formulaLatex:
      "E_{\\parallel} = E_f V_f + E_m V_m, \\quad E_{\\perp} = \\left(\\frac{V_f}{E_f} + \\frac{V_m}{E_m}\\right)^{-1}",
    instruction:
      "מהו מודול האלסטיות לאורך הסיבים לעומת לרוחבם, ומדוע חוזק המרוכב רגיש לאוריינטציית הסיבים?",
    options: [
      {
        id: "matsci-q12-opt1",
        plainText: "$E_{\\parallel} = E_{\\perp}$ תמיד, כי המרוכב איזוטרופי מטבעו.",
        isCorrect: false,
        explanation:
          "שגוי: מרוכב חד-כיווני אורתוטרופי במובהק; $E_{\\parallel} \\gg E_{\\perp}$ בדרך כלל.",
      },
      {
        id: "matsci-q12-opt2",
        plainText: "כלל התערובות הליניארי תקף רק למודול הניצב לסיבים, לא למקביל.",
        isCorrect: false,
        explanation:
          "שגוי: כלל התערובות הליניארי ($E_{\\parallel} = E_f V_f + E_m V_m$) הוא לכיוון המקביל (איזואסטרain).",
      },
      {
        id: "matsci-q12-opt3",
        plainText: "שבירת סיב בודד אינה משפיעה על חוזק המרוכב כי המטריצה נושאת את כל העומס.",
        isCorrect: false,
        explanation:
          "שגוי: בטעינה מקבילה הסיבים נושאים את רוב העומס; כשל סיבים (ומנגנון העברת עומס במטריצה) קובעים את החוזק.",
      },
      {
        id: "matsci-q12-opt4",
        plainText:
          "לאורך: $E_{\\parallel} = E_f V_f + E_m V_m$ (איזואסטרain) — הסיבים השולטים נושאים את רוב המאמץ. לרוחב: $E_{\\perp} = (V_f/E_f + V_m/E_m)^{-1}$ (איזואסטרס) — נשלט ע״י המטריצה הרכה. לכן סטיית אוריינטציה מהכיוון הראשי מורידה דרמטית קשיחות וחוזק.",
        mathText:
          "E_{\\parallel} = E_f V_f + E_m V_m, \\quad E_{\\perp} = \\bigl(V_f/E_f + V_m/E_m\\bigr)^{-1}",
        isCorrect: true,
        explanation:
          "נכון: תחת איזואסטרain לאורך הסיבים, המאמצים מתחלקים לפי המודולים והשטחים האפקטיביים, ומקבלים את כלל התערובות הליניארי — $E_{\\parallel}$ קרוב ל-$E_f V_f$ כאשר $E_f \\gg E_m$. בניצב, אותו מאמץ עובר בסידרה דרך סיב ומטריצה, ולכן המודול הוא ממוצע הרמוני — נשלט ע״י המטריצה החלשה. חוזק המתיחה לאורך תלוי בחוזק הסיבים ובשבר הנפח (עם תיקוני אורך קריטי וסטיסטיקת כשל סיבים); בזווית $\\theta$ משתמשים בטרנספורמצית קשיחות הלמינציה ($\\bar{Q}_{ij}(\\theta)$). לכן תכן מרוכבים מבוסס על יישור סיבים בכיוון העומסים הראשיים ועל למינציה מאוזנת למניעת עיוותי צימוד.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_MATERIALS_SCIENCE_QUESTIONS = MATERIALS_SCIENCE_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3, 1 from Q4–6, 1 from Q7–12; then Fisher–Yates shuffle.
 * Fail-closed if any stratum empty.
 */
export function sampleMaterialsScienceOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = MATERIALS_SCIENCE_QUESTIONS.slice(0, 3);
  const groupB = MATERIALS_SCIENCE_QUESTIONS.slice(3, 6);
  const groupC = MATERIALS_SCIENCE_QUESTIONS.slice(6, 12);

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
