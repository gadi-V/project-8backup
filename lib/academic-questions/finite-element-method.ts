import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Finite Element Method (FEM) diagnostic bank (12Q).
 * Display name: "שיטת האלמנטים הסופיים (FEM)" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const FINITE_ELEMENT_METHOD_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "fem-q01-shape-functions-partition-of-unity",
    domain: "פונקציות צורה",
    title: "שיטת האלמנטים הסופיים (FEM) - פונקציות צורה $N_i$ וחלוקת יחידה",
    context:
      "באלמנט סופי חד-ממדי ליניארי (מוט / בר) עם שני צמתים בקואורדינטות מקומיות $\\xi \\in [-1, 1]$, שדה העקירה מאופיין ע״י $u(\\xi) = \\sum_{i=1}^{2} N_i(\\xi)\\, u_i$.",
    formulaLatex:
      "u(\\xi) = \\sum_{i=1}^{n} N_i(\\xi)\\, u_i, \\quad N_1(\\xi) = \\frac{1-\\xi}{2}, \\quad N_2(\\xi) = \\frac{1+\\xi}{2}",
    instruction:
      "מהן התכונות ההכרחיות של פונקציות הצורה $N_i$ להבטחת רציפות $C^0$ והתכנסות של שיטת גלרקין?",
    options: [
      {
        id: "fem-q01-opt1",
        plainText:
          "חייבות לקיים את תכונת הדלתא של קרונקר $N_i(\\xi_j)=\\delta_{ij}$, חלוקת יחידה $\\sum_i N_i(\\xi)=1$ (ייצוג מדויק של תנועת גוף קשיח), ולהיות רציפות לפחות $C^0$ בין אלמנטים שכנים לשדות עם נגזרות מסדר ראשון באנרגיה.",
        mathText:
          "N_i(\\xi_j)=\\delta_{ij}, \\quad \\sum_i N_i(\\xi)=1, \\quad N_i \\in C^0",
        isCorrect: true,
        explanation:
          "נכון: 1. $N_i(\\xi_j)=\\delta_{ij}$ מבטיח שדרגות החופש $u_i$ הן בדיוק ערכי השדה בצמתים. 2. $\\sum_i N_i = 1$ (Partition of Unity) מבטיח ייצוג מדויק של תנועת גוף קשיח $u=\\text{const}$, תנאי הכרחי להתכנסות (Patch Test מסדר 0). 3. לרציפות $C^0$ נדרשת התאמה של ערכי $N_i$ על גבולות משותפים בין אלמנטים; בבעיות עם אנרגיה התלויה בנגזרות שניות (קורות/לוחות קירכהוף) נדרשת $C^1$.",
      },
      {
        id: "fem-q01-opt2",
        plainText:
          "פונקציות הצורה חייבות להיות אורתוגונליות בלבד: $\\int_{-1}^{1} N_i N_j\\,d\\xi = 0$ לכל $i \\neq j$, ללא דרישת חלוקת יחידה.",
        isCorrect: false,
        explanation:
          "שגוי: אורתוגונליות אינה תנאי הכרחי לפונקציות צורה סטנדרטיות של לגרנז׳/הרמיט; חלוקת יחידה ותכונת הדלתא הן הקריטיות להתכנסות.",
      },
      {
        id: "fem-q01-opt3",
        plainText:
          "מספיק ש-$N_i$ יהיו $C^{-1}$ (דיסקונטינואיות) כדי לייצג בעיות אלסטיות ליניאריות עם אנרגיית מאמץ.",
        isCorrect: false,
        explanation:
          "שגוי: דיסקונטינואיות ב-$u$ גורמות לאנרגיה אינסופית במתיחה/כיפוף סטנדרטיים; אלמנטים דיסקונטינואיים (DG) דורשים ניסוח חלש שונה עם פנלטי/פלוקס מספרי.",
      },
      {
        id: "fem-q01-opt4",
        plainText:
          "פונקציות הצורה חייבות לקיים $\\sum_i N_i(\\xi)=0$ כדי לבטל תנועות גוף קשיח בכל אלמנט.",
        isCorrect: false,
        explanation:
          "שגוי: בדיוק ההפך — $\\sum_i N_i = 1$ מאפשר תנועת גוף קשיח; סכום אפס היה מונע ייצוג של $u=\\text{const}$.",
      },
    ],
  },
  {
    id: "fem-q02-element-stiffness-matrix-definition",
    domain: "מטריצת קשיחות",
    title: "שיטת האלמנטים הסופיים (FEM) - מטריצת הקשיחות האלמנטרית $[K]^e$",
    context:
      "בבעיית אלסטיות ליניארית, שדה העקירה באלמנט מאופיין כ-$\\mathbf{u}=\\mathbf{N}\\mathbf{d}^e$, מאמצים $\\boldsymbol{\\sigma}=\\mathbf{D}\\boldsymbol{\\varepsilon}$, ומתחי $\\boldsymbol{\\varepsilon}=\\mathbf{B}\\mathbf{d}^e$ כאשר $\\mathbf{B}=\\partial\\mathbf{N}$.",
    formulaLatex:
      "[K]^e = \\int_{\\Omega^e} \\mathbf{B}^T \\mathbf{D}\\, \\mathbf{B}\\, dV",
    instruction:
      "כיצד מוגדרת מטריצת הקשיחות האלמנטרית $[K]^e$, ומה משמעות הסימטריה והחיוביות-למחצה שלה?",
    options: [
      {
        id: "fem-q02-opt1",
        plainText:
          "$[K]^e = \\int_{\\Omega^e} \\mathbf{B}^T \\mathbf{D}\\,\\mathbf{B}\\,dV$ מתקבלת ממינימיזציית האנרגיה הפוטנציאלית / ניסוח גלרקין; היא סימטרית ($[K]^e=[K]^{eT}$) בשל סימטריית $\\mathbf{D}$, וחיובית-למחצה — הגרעין שלה הוא מרחב תנועות הגוף הקשיח עד להטלת תנאי שפה.",
        mathText: "[K]^e = \\int_{\\Omega^e} B^T D B\\, dV, \\quad [K]^e = [K]^{eT} \\succeq 0",
        isCorrect: true,
        explanation:
          "נכון: הצבת $\\boldsymbol{\\varepsilon}=\\mathbf{B}\\mathbf{d}^e$ באנרגיית המאמץ $\\frac{1}{2}\\int \\boldsymbol{\\varepsilon}^T\\mathbf{D}\\boldsymbol{\\varepsilon}\\,dV$ נותנת $\\frac{1}{2}(\\mathbf{d}^e)^T [K]^e \\mathbf{d}^e$ עם $[K]^e=\\int B^T D B\\,dV$. סימטריית $\\mathbf{D}$ גוררת סימטריית $[K]^e$. ללא תנאי שפה דיריכלה, $[K]^e$ (וגם הגלובלית) סינגולרית כי תנועות גוף קשיח נותנות אנרגיה אפס — הגרעין מוסר ע״י BC.",
      },
      {
        id: "fem-q02-opt2",
        plainText:
          "$[K]^e$ מוגדרת כ-$\\int \\mathbf{N}^T\\mathbf{N}\\,dV$ בלבד, ללא תלות במטריצת החומר $\\mathbf{D}$.",
        isCorrect: false,
        explanation:
          "שגוי: $\\int N^T N\\,dV$ היא מטריצת מסה / השלכה $L^2$, לא מטריצת קשיחות אלסטית.",
      },
      {
        id: "fem-q02-opt3",
        plainText:
          "$[K]^e$ תמיד חיובית בהחלט גם לפני הטלת תנאי שפה, ולכן תמיד הפיכה בכל אלמנט בודד.",
        isCorrect: false,
        explanation:
          "שגוי: ללא קיבוע, תנועות גוף קשיח שייכות לגרעין של $[K]^e$; החיוביות המוחלטת מתקבלת רק אחרי BC מספיקים על המערכת המורכבת.",
      },
      {
        id: "fem-q02-opt4",
        plainText:
          "$[K]^e = \\mathbf{D}\\,\\mathbf{B}$ ללא אינטגרציה על נפח האלמנט — זוהי מטריצה נקודתית בצומת בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: הקשיחות היא אופרטור אינטגרלי על $\\Omega^e$; $DB$ אינו ממדים נכונים ואינו נובע מווריאציה של האנרגיה.",
      },
    ],
  },
  {
    id: "fem-q03-global-assembly-direct-stiffness",
    domain: "הרכבה גלובלית",
    title: "שיטת האלמנטים הסופיים (FEM) - הרכבת מטריצת הקשיחות הגלובלית",
    context:
      "רשת עם $n_{eq}$ דרגות חופש גלובליות. לכל אלמנט $e$ יש מפת מיפוי (LM / connectivity) המקשרת דרגות חופש מקומיות לגלובליות. המשוואה הגלובלית היא $[K]\\{\\mathbf{U}\\}=\\{\\mathbf{F}\\}$.",
    formulaLatex:
      "K_{IJ} = \\sum_{e} \\sum_{i,j} L_{Ii}^e\\, K_{ij}^e\\, L_{Jj}^e, \\quad [K]\\{\\mathbf{U}\\}=\\{\\mathbf{F}\\}",
    instruction:
      "מהו עקרון ההרכבה הישירה (Direct Stiffness Method), וכיצד נשמרת רציפות $C^0$ בין אלמנטים?",
    options: [
      {
        id: "fem-q03-opt1",
        plainText:
          "תרומות $[K]^e$ מתווספות למיקומים הגלובליים לפי מפת הקישוריות; דרגות חופש משותפות בצומת מקבלות סכום תרומות מכל האלמנטים הצמודים, כך שערך העקירה $U_I$ זהה בכל האלמנטים — ומכאן רציפות $C^0$ אוטומטית.",
        mathText:
          "K_{IJ} = \\sum_e (L^e)^T [K]^e L^e \\quad (\\text{scatter/assemble})",
        isCorrect: true,
        explanation:
          "נכון: ההרכבה היא פיזור (scatter) של $[K]^e$ לתוך $[K]$ הגלובלית לפי אינדקסי LM. צומת משותף מופיע במספר אלמנטים עם אותו אינדקס גלובלי $I$, ולכן $u$ בצומת יחיד — רציפות ערכים מובטחת. כוחות פנימיים בגבולות פנימיים מתבטלים (פעולה-תגובה) ונשארים רק כוחות חיצוניים ב-$\\{\\mathbf{F}\\}$.",
      },
      {
        id: "fem-q03-opt2",
        plainText:
          "ההרכבה מבוצעת ע״י כפל טנזורי של כל מטריצות האלמנטים ללא שימוש במפת קישוריות.",
        isCorrect: false,
        explanation:
          "שגוי: ללא מפת קישוריות אין משמעות גיאומטרית למיקומי האיברים; הכפל הטנזורי אינו שיטת ההרכבה הסטנדרטית.",
      },
      {
        id: "fem-q03-opt3",
        plainText:
          "רציפות $C^0$ מושגת רק אם מוסיפים אילוצי לגרנז׳ מפורשים בין כל זוג אלמנטים שכנים.",
        isCorrect: false,
        explanation:
          "שגוי: באלמנטי עקירה סטנדרטיים (conforming) הרציפות נובעת משיתוף דרגות החופש הצמתיות; אילוצי לגרנז׳ נדרשים בעיקר באלמנטים לא-מתאימים או בשיטות ממשק.",
      },
      {
        id: "fem-q03-opt4",
        plainText:
          "בהרכבה הגלובלית מוחקים את כל השורות והעמודות של אלמנטים פנימיים ומשאירים רק אלמנטי שפה.",
        isCorrect: false,
        explanation:
          "שגוי: כל האלמנטים תורמים ל-$[K]$; מחיקה מתבצעת רק לשורות/עמודות של דרגות חופש מקובעות (דיריכלה), לא לאלמנטים שלמים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "fem-q04-boundary-conditions-dirichlet-neumann",
    domain: "תנאי שפה",
    title: "שיטת האלמנטים הסופיים (FEM) - תנאי שפה דיריכלה ונוימן",
    context:
      "לאחר ההרכבה מתקבלת המערכת $[K]\\{\\mathbf{U}\\}=\\{\\mathbf{F}\\}$. על חלק מהשפה $\\Gamma_u$ נתונות עקירות ידועות $\\bar{u}$ (דיריכלה), ועל $\\Gamma_t$ נתונים מאמצי שפה / כוחות $\\bar{\\mathbf{t}}$ (נוימן).",
    formulaLatex:
      "u = \\bar{u}\\ \\text{on}\\ \\Gamma_u, \\quad \\mathbf{t} = \\boldsymbol{\\sigma}\\cdot\\mathbf{n} = \\bar{\\mathbf{t}}\\ \\text{on}\\ \\Gamma_t",
    instruction:
      "כיצד מוטלים תנאי השפה במערכת האלגברית של FEM, ומה ההבדל בין דיריכלה לנוין?",
    options: [
      {
        id: "fem-q04-opt1",
        plainText:
          "תנאי דיריכלה מוכנסים אוטומטית לוקטור העומס דרך אינטגרל השפה $\\int_{\\Gamma} \\mathbf{N}^T\\bar{\\mathbf{t}}\\,dA$, בעוד תנאי נוימן דורשים מחיקת שורות ועמודות.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך — נוימן נכנסים ל-$\\{\\mathbf{F}\\}$ דרך אינטגרל השפה; דיריכלה הם אילוצים חזקים על $\\{\\mathbf{U}\\}$ ומטופלים במחיקה/פנלטי/לגרנז׳.",
      },
      {
        id: "fem-q04-opt2",
        plainText:
          "תנאי נוימן הטבעיים נכנסים לאיבר הימני $\\{\\mathbf{F}\\}$ דרך $\\int_{\\Gamma_t}\\mathbf{N}^T\\bar{\\mathbf{t}}\\,dA$; תנאי דיריכלה חיוניים מוטלים ע״י קיבוע $U_I=\\bar{u}_I$ (מחיקת שורה/עמודה, פנלטי, או מכפיל לגרנז׳) כדי להסיר את סינגולריות $[K]$.",
        mathText:
          "F_I^{\\Gamma} = \\int_{\\Gamma_t} N_I\\,\\bar{t}\\,dA,\\quad U_I = \\bar{u}_I\\ \\text{on}\\ \\Gamma_u",
        isCorrect: true,
        explanation:
          "נכון: בנוסח החלש, תנאי נוימן הם תנאים טבעיים ומופיעים באיבר הגבול של עקרון העבודה הווירטואלית. תנאי דיריכלה חיוניים ואינם נובעים מהנוסח החלש — יש להטילם במפורש על דרגות החופש. ללא דיריכלה מספיקים, $[K]$ סינגולרית עקב תנועות גוף קשיח.",
      },
      {
        id: "fem-q04-opt3",
        plainText:
          "גם דיריכלה וגם נוימן מטופלים אך ורק ע״י שינוי אלכסון $[K]$ ל-$10^{20}$ ללא הבחנה ביניהם.",
        isCorrect: false,
        explanation:
          "שגוי: שיטת הפנלטי הגדולה מתאימה לדיריכלה בלבד; נוימן אינם אילוצי עקירה ואינם מטופלים כך.",
      },
      {
        id: "fem-q04-opt4",
        plainText:
          "בתנאי דיריכלה הווקטור $\\{\\mathbf{F}\\}$ מתאפס כולו, ו-$[K]$ נשארת ללא שינוי.",
        isCorrect: false,
        explanation:
          "שגוי: הטלת דיריכלה משנה את המערכת (מחיקה/פנלטי) ועשויה להעביר תרומות ידועות לאיבר הימני; אין איפוס גורף של $\\{\\mathbf{F}\\}$.",
      },
    ],
  },
  {
    id: "fem-q05-isoparametric-elements",
    domain: "אלמנטים איזופרמטריים",
    title: "שיטת האלמנטים הסופיים (FEM) - אלמנטים איזופרמטריים",
    context:
      "באלמנט איזופרמטרי, גם הגיאומטריה וגם שדה העקירה ממופים מאותן פונקציות צורה במרחב ההורה $(\\xi,\\eta)$: $\\mathbf{x}=\\sum_i N_i(\\xi,\\eta)\\,\\mathbf{x}_i$ ו-$\\mathbf{u}=\\sum_i N_i(\\xi,\\eta)\\,\\mathbf{u}_i$.",
    formulaLatex:
      "\\mathbf{x} = \\sum_i N_i(\\xi,\\eta)\\,\\mathbf{x}_i, \\quad \\mathbf{u} = \\sum_i N_i(\\xi,\\eta)\\,\\mathbf{u}_i",
    instruction:
      "מהו העיקרון האיזופרמטרי, ומה היתרון המרכזי שלו בניסוח FEM?",
    options: [
      {
        id: "fem-q05-opt1",
        plainText:
          "הגיאומטריה ממופה בפולינומים מסדר גבוה יותר משדה העקירה (סאבפרמטרי הפוך), כדי להבטיח דיוק גיאומטרי מקסימלי תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: זהו תיאור של מיפוי סופרפרמטרי/סאבפרמטרי; באיזופרמטרי הסדרים זהים.",
      },
      {
        id: "fem-q05-opt2",
        plainText:
          "אותן $N_i$ משמשות למיפוי גיאומטריה ועקירה; כך ניתן לטפל באלמנטים מעוקלים/כלליים על אלמנט הורה סטנדרטי, והמיפוי מבטיח (עם $N_i$ מתאימות) מעבר מדויק של תנועות גוף קשיח ועיוות קבוע (Patch Test).",
        mathText:
          "\\mathbf{x}=\\sum_i N_i\\mathbf{x}_i,\\quad \\mathbf{u}=\\sum_i N_i\\mathbf{u}_i",
        isCorrect: true,
        explanation:
          "נכון: האיזופרמטריות מאפשרת אינטגרציה נוחה ב-$(\\xi,\\eta)$ עם יעקוביאן, תומכת באלמנטים מעוקלים, ומבטיחה — כאשר $\\sum N_i=1$ — ייצוג תנועת גוף קשיח גם בגיאומטריה מעוותת. סאבפרמטרי משתמש בסדר נמוך יותר לגיאומטריה; סופרפרמטרי — גבוה יותר.",
      },
      {
        id: "fem-q05-opt3",
        plainText:
          "אלמנט איזופרמטרי אוסר שימוש בנקודות אינטגרציה של גאוס ודורש אינטגרציה אנליטית בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: להפך — אלמנטים איזופרמטריים מסתמכים כמעט תמיד על קוודרטורת גאוס במרחב ההורה.",
      },
      {
        id: "fem-q05-opt4",
        plainText:
          "באיזופרמטרי שדה העקירה מיוצג בקואורדינטות גלובליות בלבד ללא פונקציות צורה מקומיות.",
        isCorrect: false,
        explanation:
          "שגוי: הבסיס הוא תמיד $N_i(\\xi,\\eta)$ במרחב ההורה; הקואורדינטות הגלובליות מתקבלות מהמיפוי.",
      },
    ],
  },
  {
    id: "fem-q06-jacobian-mapping-parent-to-physical",
    domain: "יעקוביאן המיפוי",
    title: "שיטת האלמנטים הסופיים (FEM) - יעקוביאן המיפוי האיזופרמטרי",
    context:
      "במיפוי דו-ממדי $\\mathbf{x}(\\xi,\\eta)$ מאלמנט הורה למרחב הפיזי, הנגזרות הפיזיקליות של $N_i$ מתקבלות דרך מטריצת היעקוביאן $\\mathbf{J}$.",
    formulaLatex:
      "\\mathbf{J} = \\begin{pmatrix} \\partial x/\\partial\\xi & \\partial y/\\partial\\xi \\\\ \\partial x/\\partial\\eta & \\partial y/\\partial\\eta \\end{pmatrix}, \\quad \\begin{pmatrix} N_{i,x} \\\\ N_{i,y} \\end{pmatrix} = \\mathbf{J}^{-1}\\begin{pmatrix} N_{i,\\xi} \\\\ N_{i,\\eta} \\end{pmatrix}",
    instruction:
      "מה תפקיד היעקוביאן $\\mathbf{J}$ בחישוב $\\mathbf{B}$ ובאינטגרציה, ומה קורה כאשר $\\det\\mathbf{J}\\le 0$?",
    options: [
      {
        id: "fem-q06-opt1",
        plainText:
          "היעקוביאן משמש רק לסיבוב מערכת הצירים הגלובלית ואינו משפיע על נפח האינטגרציה.",
        isCorrect: false,
        explanation:
          "שגוי: $dV = |\\det J|\\,d\\xi\\,d\\eta$ — היעקוביאן קובע גם את מידת הנפח וגם את המרת הנגזרות.",
      },
      {
        id: "fem-q06-opt2",
        plainText:
          "$\\mathbf{J}$ ממיר נגזרות ב-$(\\xi,\\eta)$ לנגזרות ב-$(x,y)$ לצורך בניית $\\mathbf{B}$, ו-$dA=|\\det\\mathbf{J}|\\,d\\xi\\,d\\eta$; אם $\\det\\mathbf{J}\\le 0$ המיפוי מנוון או הפוך (אלמנט מעוות/מקופל) והפתרון בלתי תקף.",
        mathText:
          "dA = |\\det J|\\,d\\xi\\,d\\eta,\\quad \\det J > 0\\ \\text{required}",
        isCorrect: true,
        explanation:
          "נכון: שרשרת הנגזרות $\\nabla_{xy} N = J^{-T}\\nabla_{\\xi\\eta} N$ (או עם $J^{-1}$ לפי סידור) חיונית ל-$\\mathbf{B}$. תנאי $\\det J>0$ בכל נקודת אינטגרציה מבטיח מיפוי חד-חד-ערכי ושומר אוריינטציה; עיוות יתר של אלמנט מרובע עלול להפר זאת.",
      },
      {
        id: "fem-q06-opt3",
        plainText:
          "כאשר $\\det\\mathbf{J}<0$ האלמנט עדיין תקף כל עוד $|\\det\\mathbf{J}|$ גדול, כי הקשיחות תלויה בערך המוחלט בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: סימן שלילי מצביע על היפוך אוריינטציה / קיפול; האלמנט פסול מבחינה גיאומטרית גם אם הערך המוחלט גדול.",
      },
      {
        id: "fem-q06-opt4",
        plainText:
          "באלמנטים איזופרמטריים $\\mathbf{J}\\equiv I$ תמיד, ולכן אין צורך בחישוב יעקוביאן.",
        isCorrect: false,
        explanation:
          "שגוי: $\\mathbf{J}=I$ רק במקרה הפרטי של אלמנט מלבני מיושר לצירי ההורה בגודל זהה; במקרה הכללי $\\mathbf{J}$ משתנה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "fem-q07-gauss-quadrature-integration",
    domain: "קוודרטורת גאוס",
    title: "שיטת האלמנטים הסופיים (FEM) - קוודרטורת גאוס לאינטגרציה נומרית",
    context:
      "חישוב $[K]^e = \\int_{-1}^{1}\\int_{-1}^{1} \\mathbf{B}^T\\mathbf{D}\\mathbf{B}\\,|\\det\\mathbf{J}|\\,d\\xi\\,d\\eta$ מבוצע בנקודות גאוס עם משקלות $w_g$.",
    formulaLatex:
      "\\int_{-1}^{1} f(\\xi)\\,d\\xi \\approx \\sum_{g=1}^{n_g} w_g\\, f(\\xi_g)",
    instruction:
      "מהו כלל הדיוק של קוודרטורת גאוס-לז׳נדר, ומתי בוחרים Reduced Integration?",
    options: [
      {
        id: "fem-q07-opt1",
        plainText:
          "נקודת גאוס אחת ($n_g=1$) משלבת בדיוק כל פולינום עד סדר 5 ב-$[-1,1]$.",
        isCorrect: false,
        explanation:
          "שגוי: $n_g$ נקודות משלבות בדיוק פולינומים עד סדר $2n_g-1$; לכן $n_g=1$ מדויק עד סדר 1 בלבד.",
      },
      {
        id: "fem-q07-opt2",
        plainText:
          "Reduced Integration מגדילה תמיד את דיוק האינטגרציה של $[K]^e$ מעבר ל-Full Integration.",
        isCorrect: false,
        explanation:
          "שגוי: Reduced Integration מפחיתה את סדר הקוודרטורה — לעיתים כדי לרכך locking, אך עלולה להכניס מצבי שעון חול (hourglass) ולא לשפר דיוק אינטגרלי.",
      },
      {
        id: "fem-q07-opt3",
        plainText:
          "$n_g$ נקודות גאוס-לז׳נדר מדויקות לפולינומים עד סדר $2n_g-1$; Full Integration בוחרת $n_g$ מספיק לאינטגרציה מדויקת של האינטגרנד כש-$\\mathbf{J}$ קבוע, בעוד Reduced Integration משמשת להקלת נעילת נפח/גזירה במחיר סיכון ל-hourglass modes.",
        mathText:
          "\\text{exact for deg}\\le 2n_g-1,\\quad K^e\\approx\\sum_g w_g B_g^T D B_g |\\det J_g|",
        isCorrect: true,
        explanation:
          "נכון: כלל הדיוק $2n_g-1$ הוא תכונה קלאסית של גאוס-לז׳נדר. באלמנט דו-ממדי ליניארי עם $\\mathbf{J}$ קבוע, $2\\times 2$ מספיק לרוב; Reduced ($1\\times 1$) מורידה את דרגת הקשיחות המלאכותית בנעילה, אך דורשת ייצוב hourglass. בגיאומטריה מעוותת האינטגרנד רציונלי וקוודרטורה מלאה אינה בהכרח מדויקת אנליטית.",
      },
      {
        id: "fem-q07-opt4",
        plainText:
          "קוודרטורת גאוס אסורה ב-FEM; חובה להשתמש בכלל הסימפסון בלבד על רשת אחידה.",
        isCorrect: false,
        explanation:
          "שגוי: גאוס-לז׳נדר היא שיטת האינטגרציה הסטנדרטית ב-FEM על אלמנט ההורה.",
      },
    ],
  },
  {
    id: "fem-q08-hp-convergence-rates",
    domain: "התכנסות h/p",
    title: "שיטת האלמנטים הסופיים (FEM) - התכנסות $h$- ו-$p$-refinement",
    context:
      "פתרון FEM $\\mathbf{u}_h$ מקורב לפתרון החלש $\\mathbf{u}$ במרחב אלמנטים מגודל אופייני $h$ ודרגת פולינום $p$. השגיאה נמדדת בנורמת האנרגיה $\\|\\cdot\\|_E$.",
    formulaLatex:
      "\\|\\mathbf{u}-\\mathbf{u}_h\\|_E \\le C h^{\\min(p,k)} \\|\\mathbf{u}\\|_{H^{k+1}}",
    instruction:
      "מה ההבדל בין $h$-refinement ל-$p$-refinement מבחינת קצב התכנסות?",
    options: [
      {
        id: "fem-q08-opt1",
        plainText:
          "$h$-refinement משנה רק את דרגת הפולינום $p$ ללא עידון הרשת, ו-$p$-refinement מקטין את $h$ בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ההגדרות הפוכות — $h$ הוא עידון גודל אלמנט, $p$ הוא העלאת סדר פולינום.",
      },
      {
        id: "fem-q08-opt2",
        plainText:
          "בפתרון אנליטי חלק, $h$-refinement מתכנס תמיד אקספוננציאלית בעוד $p$-refinement מתכנס אלגברית בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: בפתרון חלק, $p$-refinement נותן התכנסות אקספוננציאלית; $h$-refinement אלגברי מסדר התלוי ב-$p$.",
      },
      {
        id: "fem-q08-opt3",
        plainText:
          "ב-$h$-refinement עם $p$ קבוע השגיאה בנורמת אנרגיה היא $O(h^{\\min(p,k)})$; בפתרון חלק מספיק, $p$-refinement נותן התכנסות אקספוננציאלית ב-$p$, בעוד שבסינגולריות מומלץ $hp$-adaptive.",
        mathText:
          "\\|e\\|_E = O(h^{\\min(p,k)}),\\quad \\text{smooth}\\Rightarrow\\|e\\|_E\\sim e^{-\\gamma p}",
        isCorrect: true,
        explanation:
          "נכון: תורת הקירוב מנבאת קצב אלגברי ב-$h$ התלוי בסדר $p$ ובמידת הרגולריות $k$ של הפתרון. כאשר הפתרון אנליטי, העלאת $p$ על רשת קבועה נותנת שגיאה אקספוננציאלית. ליד סינגולריות קצה/סדק — שילוב $hp$ (עידון מקומי + $p$ גבוה באזורים חלקים) אופטימלי.",
      },
      {
        id: "fem-q08-opt4",
        plainText:
          "קצב ההתכנסות של FEM אינו תלוי ב-$h$ או ב-$p$, אלא רק במספר הצמתים הגלובלי $n_{eq}$.",
        isCorrect: false,
        explanation:
          "שגוי: $n_{eq}$ קשור ל-$h$ ו-$p$, אך תורת השגיאה מנוסחת במפורש במונחי $h$, $p$ ורגולריות.",
      },
    ],
  },
  {
    id: "fem-q09-bar-truss-beam-elements",
    domain: "אלמנטי מוט, מסבך וקורה",
    title: "שיטת האלמנטים הסופיים (FEM) - אלמנטי מוט, מסבך וקורה",
    context:
      "אלמנט מוט/מסבך דו-צמתי נושא כוח צירי בלבד; אלמנט קורת אוילר-ברנולי נושא כיפוף עם רציפות $C^1$; אלמנט טימושנקו כולל גזירה רוחבית.",
    formulaLatex:
      "K_{\\text{bar}}^e = \\frac{EA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix},\\quad V = \\int \\frac{EI}{2}(u'')^2 dx\\ \\text{(Euler–Bernoulli)}",
    instruction:
      "מה מבדיל בין אלמנט מסבך (truss) לאלמנט קורת אוילר-ברנולי מבחינת דרגות חופש ודרישות רציפות?",
    options: [
      {
        id: "fem-q09-opt1",
        plainText:
          "שניהם דורשים רציפות $C^1$ של העקירה הרוחבית ומשתמשים בפונקציות הרמיט זהות.",
        isCorrect: false,
        explanation:
          "שגוי: אלמנט מסבך הוא צירי בלבד עם $C^0$ על $u$ האורכי; הרמיט/$C^1$ שייכים לקורת אוילר-ברנולי.",
      },
      {
        id: "fem-q09-opt2",
        plainText:
          "אלמנט קורה נושא כוח צירי בלבד, בעוד אלמנט מסבך נושא מומנטי כיפוף בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך המושגי — מסבך/מוט צירי; קורה — כיפוף (ולעיתים גזירה).",
      },
      {
        id: "fem-q09-opt3",
        plainText:
          "מסבך: דרגות חופש ציריות, $K^e=\\frac{EA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$ (במערכת מקומית) ו-$C^0$; קורת אוילר-ברנולי: עקירה וסיבוב בצומת, בסיס הרמיט $C^1$ כי האנרגיה תלויה ב-$u''$; טימושנקו: עקירה וסיבוב בלתי-תלויים עם אנרגיית גזירה.",
        mathText:
          "\\text{truss: }C^0\\text{ axial};\\quad\\text{EB beam: }C^1\\text{ Hermite};\\quad\\text{Timoshenko: }C^0",
        isCorrect: true,
        explanation:
          "נכון: במסבך מרחבי ממפים את $K^e$ המקומית לגלובלית בקוסינוסי כיוון. באוילר-ברנולי $\\theta=u'$ ולכן נדרשת $C^1$. בטימושנקו $\\theta$ בלתי תלוי ו-$C^0$ מספיקה, אך עלולה להופיע נעילת גזירה בעובי דק ללא אינטגרציה מותאמת.",
      },
      {
        id: "fem-q09-opt4",
        plainText:
          "אלמנט מסבך ואלמנט קורה זהים לחלוטין מבחינת מטריצת הקשיחות — ההבדל הוא רק בשם.",
        isCorrect: false,
        explanation:
          "שגוי: המטריצות, דרגות החופש והפיזיקה שונים מהותית (צירי מול כיפוף).",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "fem-q10-plane-stress-plane-strain",
    domain: "מאמץ מישורי ומעוות מישורי",
    title: "שיטת האלמנטים הסופיים (FEM) - Plane Stress מול Plane Strain",
    context:
      "בבעיות דו-ממדיות משתמשים במטריצת חומר מצומצמת $\\mathbf{D}$. לחומר איזוטרופי ליניארי עם מודול יאנג $E$ ויחס פואסון $\\nu$.",
    formulaLatex:
      "\\mathbf{D}_{\\sigma} = \\frac{E}{1-\\nu^2}\\begin{pmatrix}1&\\nu&0\\\\\\nu&1&0\\\\0&0&(1-\\nu)/2\\end{pmatrix},\\quad \\mathbf{D}_{\\varepsilon} = \\frac{E(1-\\nu)}{(1+\\nu)(1-2\\nu)}\\begin{pmatrix}\\cdots\\end{pmatrix}",
    instruction:
      "מתי משתמשים ב-Plane Stress ומתי ב-Plane Strain, ומה ההבדל ב-$\\mathbf{D}$?",
    options: [
      {
        id: "fem-q10-opt1",
        plainText:
          "Plane Stress ו-Plane Strain משתמשים תמיד באותה מטריצת $\\mathbf{D}$ זהה לחומר תלת-ממדי מלא.",
        isCorrect: false,
        explanation:
          "שגוי: שתי ההנחות מצמצמות את $\\mathbf{D}$ באופנים שונים; אינן זהות ל-$\\mathbf{D}_{3D}$.",
      },
      {
        id: "fem-q10-opt2",
        plainText:
          "Plane Strain מתאים ללוחות דקים חופשיים בעובי, ו-Plane Stress לסכרים ארוכים עם $\\varepsilon_z=0$.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך — Plane Stress ללוחות/דיסקים דקים ($\\sigma_z\\approx 0$); Plane Strain למבנים ארוכים ($\\varepsilon_z=0$).",
      },
      {
        id: "fem-q10-opt3",
        plainText:
          "ב-Plane Strain חייבים להציב $\\nu=0$ תמיד, אחרת $\\mathbf{D}$ סינגולרית.",
        isCorrect: false,
        explanation:
          "שגוי: $\\mathbf{D}$ של Plane Strain מוגדרת היטב ל-$\\nu<1/2$; ב-$\\nu\\to 1/2$ מופיעה נעילת נפח, לא דרישה ל-$\\nu=0$.",
      },
      {
        id: "fem-q10-opt4",
        plainText:
          "Plane Stress ($\\sigma_z=\\tau_{xz}=\\tau_{yz}=0$): לוחות דקים, $\\mathbf{D}=\\frac{E}{1-\\nu^2}\\begin{pmatrix}1&\\nu&0\\\\\\nu&1&0\\\\0&0\\frac{1-\\nu}{2}\\end{pmatrix}$; Plane Strain ($\\varepsilon_z=0$): גופים ארוכים, $\\mathbf{D}$ עם מכנה $(1+\\nu)(1-2\\nu)$ — קשיח יותר לקראת $\\nu\\to 1/2$.",
        mathText:
          "\\text{PS: }\\sigma_z=0;\\quad\\text{PE: }\\varepsilon_z=0,\\ D\\propto\\frac{E(1-\\nu)}{(1+\\nu)(1-2\\nu)}",
        isCorrect: true,
        explanation:
          "נכון: בלוח דק המאמץ הניצב זניח (Plane Stress). בסכר/צינור ארוך המעוות הניצב נחסם (Plane Strain). ההבדל ב-$\\mathbf{D}$ משפיע ישירות על $[K]$ ועל רגישות לנעילת נפח בחומרים כמעט-אי-דחיסים תחת Plane Strain.",
      },
    ],
  },
  {
    id: "fem-q11-volumetric-shear-locking",
    domain: "נעילת נפח וגזירה",
    title: "שיטת האלמנטים הסופיים (FEM) - Volumetric ו-Shear Locking",
    context:
      "באלמנטים ליניאריים תחת יחס פואסון $\\nu\\to 1/2$ (אי-דחיסות) או בקורות/לוחות דקים של טימושנקו, הקשיחות המספרית עלולה להיות גבוהה בהרבה מהפיזיקלית.",
    formulaLatex:
      "\\nu \\to \\tfrac{1}{2} \\Rightarrow K_{\\text{vol}}\\to\\infty,\\quad \\text{shear locking in thin Timoshenko elements}",
    instruction:
      "מהם מנגנוני ה-locking העיקריים, וכיצד מתמודדים איתם ב-FEM?",
    options: [
      {
        id: "fem-q11-opt1",
        plainText:
          "Locking הוא באג תוכנה בלבד ונעלם תמיד בהגדלת דיוק נקודה צפה ל-quad precision.",
        isCorrect: false,
        explanation:
          "שגוי: Locking הוא פגם במרחב הקירוב הדיסקרטי, לא בעיית דיוק נקודה צפה.",
      },
      {
        id: "fem-q11-opt2",
        plainText:
          "Volumetric locking מופיע רק באלמנטי קורה, ו-Shear locking רק בחומרים תלת-ממדיים אי-דחיסים.",
        isCorrect: false,
        explanation:
          "שגוי: Volumetric locking אופייני לאלמנטי רצף תחת $\\nu\\approx 1/2$; Shear locking — לקורות/לוחות דקים.",
      },
      {
        id: "fem-q11-opt3",
        plainText:
          "הפתרון היחיד ל-locking הוא לעדן את הרשת ($h\\to 0$) ללא שינוי בניסוח האלמנט.",
        isCorrect: false,
        explanation:
          "שגוי: עידון לבדו מתכנס לאט מאוד תחת נעילה; נדרשים Reduced/Selective Integration, אלמנטי תערובת, או Enhanced Assumed Strain.",
      },
      {
        id: "fem-q11-opt4",
        plainText:
          "Volumetric locking: מרחב $\\mathbf{B}$ הליניארי אינו מייצג $\\operatorname{div}\\mathbf{u}\\approx 0$ — נפתר ב-selective reduced integration / mixed $u$-$p$; Shear locking בקורות דקות — גזירה מספרית עודפת, נפתר ב-reduced integration או אלמנטי תערובת/ANS.",
        mathText:
          "\\text{selective RI / mixed }u\\text{-}p\\text{; thin beam: RI or ANS}",
        isCorrect: true,
        explanation:
          "נכון: באי-דחיסות, אילוץ $\\nabla\\cdot\\mathbf{u}=0$ כמעט בכל נקודה מגביל יתר על המידה את דרגות החופש של אלמנט ליניארי. Selective RI משלב את חלק הנפח בנקודה אחת. בטימושנקו דק, אנרגיית הגזירה שולטת מספריות ו״נועלת״ כיפוף — RI או ניסוחי תערובת משחררים זאת, עם זהירות מ-hourglass.",
      },
    ],
  },
  {
    id: "fem-q12-a-posteriori-error-estimators",
    domain: "אומדי שגיאה",
    title: "שיטת האלמנטים הסופיים (FEM) - אומדי שגיאה א-פוסטריורי ו-Adaptivity",
    context:
      "לאחר פתרון $\\mathbf{u}_h$, רוצים לאמוד את השגיאה $\\|\\mathbf{u}-\\mathbf{u}_h\\|_E$ ללא ידיעת $\\mathbf{u}$, ולעדן את הרשת באופן אדפטיבי (adaptive $h$-refinement).",
    formulaLatex:
      "\\eta^2 = \\sum_e \\eta_e^2 \\approx \\|\\mathbf{u}-\\mathbf{u}_h\\|_E^2,\\quad \\theta = \\frac{\\eta}{\\|e\\|_E}\\approx 1",
    instruction:
      "מהו עקרון אומד השגיאה של Zienkiewicz–Zhu (ZZ), וכיצד משתמשים בו לעידון אדפטיבי?",
    options: [
      {
        id: "fem-q12-opt1",
        plainText:
          "אומד ZZ דורש פתרון אנליטי מדויק של $\\mathbf{u}$ ומשווה אליו ישירות בכל צומת.",
        isCorrect: false,
        explanation:
          "שגוי: אומד א-פוסטריורי אינו משתמש בפתרון האנליטי — אחרת לא היה שימושי בבעיות כלליות.",
      },
      {
        id: "fem-q12-opt2",
        plainText:
          "אומדי שגיאה מותרים רק בבעיות חד-ממדיות; בדו- ותלת-ממד אין תיאוריה תקפה.",
        isCorrect: false,
        explanation:
          "שגוי: Residual-based ו-recovery-based estimators מפותחים היטב גם ב-2D/3D.",
      },
      {
        id: "fem-q12-opt3",
        plainText:
          "בעידון אדפטיבי מחלקים תמיד את כל האלמנטים באותו יחס, ללא תלות ב-$\\eta_e$.",
        isCorrect: false,
        explanation:
          "שגוי: הרעיון המרכזי הוא עידון סלקטיבי של אלמנטים עם $\\eta_e$ גדול (marking strategies).",
      },
      {
        id: "fem-q12-opt4",
        plainText:
          "ZZ משחזר שדה מאמצים חלק $\\boldsymbol{\\sigma}^*$ (למשל SPR) מתוך $\\boldsymbol{\\sigma}_h=\\mathbf{D}\\mathbf{B}\\mathbf{u}_h$ הדיסקונטינואי, ואומד $\\eta_e^2=\\int_{\\Omega^e}(\\boldsymbol{\\sigma}^*-\\boldsymbol{\\sigma}_h):\\mathbf{D}^{-1}(\\boldsymbol{\\sigma}^*-\\boldsymbol{\\sigma}_h)\\,dV$; אלמנטים עם $\\eta_e$ גבוה מסומנים לעידון עד $\\eta$ מתחת לסבילות.",
        mathText:
          "\\eta_e^2 = \\int_{\\Omega^e}(\\sigma^*-\\sigma_h):D^{-1}(\\sigma^*-\\sigma_h)\\,dV",
        isCorrect: true,
        explanation:
          "נכון: מאמצי FEM סטנדרטיים דיסקונטינואיים בין אלמנטים. שחזור (recovery) ל-$\\boldsymbol{\\sigma}^*$ חלק נותן קירוב טוב יותר למאמץ האמיתי, וההפרש בנורמת אנרגיה משמש כאומד מקומי. יעילות האומד $\\theta\\approx 1$ מבטיחה אמינות; marking (Dörfler וכו') מניע $h$-adaptivity יעיל ליד סינגולריות.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_FEM_QUESTIONS = FINITE_ELEMENT_METHOD_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3 (shape functions / stiffness / assembly)
 * - 1 from Q4–6 (BC / isoparametric / Jacobian)
 * - 1 from Q7–12 (Gauss / h-p / bar-beam / plane / locking / estimators)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleFemOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = FINITE_ELEMENT_METHOD_QUESTIONS.slice(0, 3);
  const groupB = FINITE_ELEMENT_METHOD_QUESTIONS.slice(3, 6);
  const groupC = FINITE_ELEMENT_METHOD_QUESTIONS.slice(6, 12);

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
