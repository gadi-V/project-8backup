export type DiagnosticOption = {
  id: string;
  mathText?: string;
  plainText?: string;
  isCorrect: boolean;
  explanation: string;
};

export type DiagnosticQuestion = {
  id: string;
  domain: string;
  title: string;
  context: string;
  instruction: string;
  formulaLatex: string;
  options: DiagnosticOption[];
};

export const DIAGNOSTIC_3_DOMAIN_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "domain-1-calculus",
    domain: "חדו״א ופונקציות מעריכיות",
    title: "שאלה 1: אנליזה וחקירת פונקציה מעריכית (5 יח״ל / אקדמי)",
    context: "שאלון 582 / חדו״א 1 — גבולות ואסימפטוטות אופקיות",
    instruction: "נתונה הפונקציה המעריכית הבאה. מהי האסימפטוטה האופקית של הפונקציה כאשר x שואף למינוס אינסוף?",
    formulaLatex: "f(x) = \\frac{e^x - 1}{e^x + 1}, \\quad \\lim_{x \\to -\\infty} f(x) = ?",
    options: [
      {
        id: "d1-opt-a",
        mathText: "y = -1",
        isCorrect: true,
        explanation: "נכון מאוד! כאשר x שואף למינוס אינסוף, e^x שואף ל-0, ולכן מתקבל גבול של (0 - 1)/(0 + 1) = -1.",
      },
      {
        id: "d1-opt-b",
        mathText: "y = 1",
        isCorrect: false,
        explanation: "שגיאה נפוצה: y = 1 היא האסימפטוטה כאשר x שואף לפלוס אינסוף (ולא למינוס אינסוף).",
      },
      {
        id: "d1-opt-c",
        mathText: "y = 0",
        isCorrect: false,
        explanation: "שגיאה: המונה שואף ל- (-1) והמכנה שואף ל- 1, כך שהמנה אינה שואפת לאפס.",
      },
      {
        id: "d1-opt-d",
        plainText: "אין אסימפטוטה אופקית (הגבול אינו קיים)",
        isCorrect: false,
        explanation: "שגיאה: הגבול קיים וסופי ושווה בדיוק ל- -1.",
      },
    ],
  },
  {
    id: "domain-2-vectors",
    domain: "וקטורים במרחב וגיאומטריה אנליטית",
    title: "שאלה 2: מכפלה סקלרית ואורתוגונליות במרחב התלת-ממדי",
    context: "שאלון 582 — גיאומטריה וקטורית תלת-ממדית",
    instruction: "נתונים הווקטורים u ו- v. לאיזה ערך של הפרמטר k הווקטורים מאונכים זה לזה?",
    formulaLatex: "\\vec{u} = (2, -1, 3), \\quad \\vec{v} = (k, 4, 2), \\quad \\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0",
    options: [
      {
        id: "d2-opt-a",
        mathText: "k = -1",
        isCorrect: true,
        explanation: "מדויק! המכפלה הסקלרית היא: 2*k + (-1)*4 + 3*2 = 2k - 4 + 6 = 2k + 2 = 0 => k = -1.",
      },
      {
        id: "d2-opt-b",
        mathText: "k = 1",
        isCorrect: false,
        explanation: "שגיאה בחישוב סימנים: הצבת k = 1 מניבה מכפלה סקלרית של 4 ולא 0.",
      },
      {
        id: "d2-opt-c",
        mathText: "k = -5",
        isCorrect: false,
        explanation: "שגיאה: עבור k = -5 מתקבל 2*(-5) + 2 = -8.",
      },
      {
        id: "d2-opt-d",
        mathText: "k = 0",
        isCorrect: false,
        explanation: "שגיאה: עבור k = 0 המכפלה הסקלרית היא 2 ולא 0.",
      },
    ],
  },
  {
    id: "domain-3-complex",
    domain: "מספרים מרוכבים ומשפט דה-מואבר",
    title: "שאלה 3: הצגה קוטבית ושורשי יחידה (De Moivre)",
    context: "שאלון 582 / אלגברה לינארית — שורשי יחידה ומישור גאוס",
    instruction: "נתון המספר המרוכב z בהצגה קוטבית. מהו הערך של z^3 במישור גאוס?",
    formulaLatex: "z = \\sqrt{2} \\cdot \\text{cis}(45^\\circ) = \\sqrt{2} e^{i \\frac{\\pi}{4}}, \\quad z^3 = ?",
    options: [
      {
        id: "d3-opt-a",
        mathText: "z^3 = 2\\sqrt{2} \\cdot \\text{cis}(135^\\circ) = -2 + 2i",
        isCorrect: true,
        explanation: "נכון מאוד! לפי נוסחת דה-מואבר: r^3 = (\\sqrt{2})^3 = 2\\sqrt{2}, והזווית היא 3 * 45° = 135°. בהצגה אלגברית: -2 + 2i.",
      },
      {
        id: "d3-opt-b",
        mathText: "z^3 = 2 \\cdot \\text{cis}(135^\\circ)",
        isCorrect: false,
        explanation: "שגיאה ברדיוס: (\\sqrt{2})^3 = 2\\sqrt{2} ולא 2.",
      },
      {
        id: "d3-opt-c",
        mathText: "z^3 = 2\\sqrt{2} \\cdot \\text{cis}(45^\\circ)",
        isCorrect: false,
        explanation: "שגיאה בזווית: לפי דה-מואבר יש להכפיל את הזווית ב-3 (מתקבל 135° ולא 45°).",
      },
      {
        id: "d3-opt-d",
        mathText: "z^3 = -2 - 2i",
        isCorrect: false,
        explanation: "שגיאה ברביע: זווית 135° נמצאת ברביע השני (חלק ממשי שלילי, מדומה חיובי).",
      },
    ],
  },
];
