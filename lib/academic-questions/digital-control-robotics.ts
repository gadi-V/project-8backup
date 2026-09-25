import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Digital Control & Robotics diagnostic bank (12Q).
 * Display name: "בקרה ספרתית ורובוטיקה" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const DIGITAL_CONTROL_ROBOTICS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "dcr-q01-z-transform-discrete-transfer",
    domain: "התמרת Z",
    title: "בקרה ספרתית ורובוטיקה - התמרת $z$ ופונקציית תמסורת דיסקרטית",
    context:
      "אות בדיד $f[k]$ (דוגמאות בזמנים $t=kT$) מותמר ל-$F(z)=\\mathcal{Z}\\{f[k]\\}$. מערכת ליניארית קבועת-פרמטרים בדידה מתוארת ע״י פונקציית תמסורת $G(z)=Y(z)/U(z)$.",
    formulaLatex:
      "F(z) = \\sum_{k=0}^{\\infty} f[k]\\, z^{-k}, \\quad \\mathcal{Z}\\{f[k-1]\\} = z^{-1} F(z) + f[-1]",
    instruction:
      "מהי משמעות תכונת ההזזה של התמרת $z$, וכיצד נקבעת יציבות אסימפטוטית של מערכת $G(z)$?",
    options: [
      {
        id: "dcr-q01-opt1",
        plainText:
          "הזזה בזמן של דגימה אחת מכפילה ב-$z^{-1}$ (עם תנאי התחלה); המערכת יציבה אסימפטוטית אם ורק אם כל הקטבים של $G(z)$ נמצאים בתוך עיגול היחידה $|z|<1$.",
        mathText:
          "\\mathcal{Z}\\{f[k-1]\\}=z^{-1}F(z),\\quad \\text{stable}\\iff |p_i|<1",
        isCorrect: true,
        explanation:
          "נכון: 1. התמרת $z$ מוגדרת $F(z)=\\sum_{k=0}^{\\infty} f[k] z^{-k}$ ומקבילה להתמרת לפלס בבקרה בדידה. 2. תכונת ההזזה אחורה: $\\mathcal{Z}\\{f[k-1]\\}=z^{-1}F(z)+f[-1]$ (עבור אות סיבתי $f[-1]=0$ מתקבל בדיוק כפל ב-$z^{-1}$); הזזה קדימה: $\\mathcal{Z}\\{f[k+1]\\}=zF(z)-zf[0]$. 3. מיפוי $z=e^{sT}$ שולח את חצי המישור השמאלי $\\operatorname{Re}(s)<0$ לתוך עיגול היחידה $|z|<1$. לכן מערכת עם פונקציית תמסורת רציונלית $G(z)$ יציבה אסימפטוטית אם ורק אם כל הקטבים מקיימים $|p_i|<1$; קטבים על $|z|=1$ נותנים יציבות שולית/תנודות מתמשכות, וקטבים מחוץ לעיגול — התבדרות.",
      },
      {
        id: "dcr-q01-opt2",
        plainText:
          "יציבות בדידה דורשת שכל הקטבים יהיו בחצי המישור השמאלי $\\operatorname{Re}(z)<0$, כמו בבקרה רציפה.",
        isCorrect: false,
        explanation:
          "שגוי: קריטריון היציבות הבדיד הוא $|z|<1$, לא $\\operatorname{Re}(z)<0$. חצי המישור השמאלי שייך למישור $s$.",
      },
      {
        id: "dcr-q01-opt3",
        plainText:
          "התמרת $z$ מוגדרת רק לאותות רציפים $f(t)$ ואינה חלה על סדרות בדידות $f[k]$.",
        isCorrect: false,
        explanation:
          "שגוי: התמרת $z$ מוגדרת בדיוק על סדרות בדידות; לאותות רציפים משתמשים בלפלס/פוריה.",
      },
      {
        id: "dcr-q01-opt4",
        plainText:
          "הזזה קדימה בזמן $f[k+1]$ תמיד זהה להזזה אחורה $f[k-1]$ תחת התמרת $z$.",
        isCorrect: false,
        explanation:
          "שגוי: $\\mathcal{Z}\\{f[k+1]\\}=z F(z)-z f[0]$ שונה מ-$z^{-1}F(z)$; הכיוון והתנאים ההתחלתיים שונים.",
      },
    ],
  },
  {
    id: "dcr-q02-discrete-state-space",
    domain: "מרחב מצב בדיד",
    title: "בקרה ספרתית ורובוטיקה - ייצוג מרחב-מצב בדיד",
    context:
      "מערכת רציפה $\\dot{\\mathbf{x}}=A\\mathbf{x}+B\\mathbf{u}$ נדגמת עם מחזיק מסדר אפס (ZOH) בזמן דגימה $T$. המודל הבדיד הוא $\\mathbf{x}[k+1]=\\Phi\\mathbf{x}[k]+\\Gamma\\mathbf{u}[k]$.",
    formulaLatex:
      "\\mathbf{x}[k+1] = \\Phi\\mathbf{x}[k] + \\Gamma\\mathbf{u}[k],\\quad \\Phi = e^{AT},\\quad \\Gamma = \\int_0^T e^{A\\tau}\\,d\\tau\\, B",
    instruction:
      "כיצד מתקבלות מטריצות $\\Phi$ ו-$\\Gamma$ מדגימה עם ZOH, ומה תנאי היציבות למערכת החופשית?",
    options: [
      {
        id: "dcr-q02-opt1",
        plainText:
          "$\\Phi=e^{AT}$ ו-$\\Gamma=\\int_0^T e^{A\\tau}d\\tau\\,B$; המערכת החופשית יציבה אסימפטוטית אם כל הערכים העצמיים של $\\Phi$ מקיימים $|\\lambda_i(\\Phi)|<1$.",
        mathText:
          "\\Phi=e^{AT},\\ \\Gamma=\\int_0^T e^{A\\tau}d\\tau\\,B,\\quad \\rho(\\Phi)<1",
        isCorrect: true,
        explanation:
          "נכון: 1. תחת מחזיק מסדר אפס, $\\mathbf{u}(t)=\\mathbf{u}[k]$ קבוע לכל $t\\in[kT,(k+1)T)$. 2. פתרון המשוואה הרציפה: $\\mathbf{x}((k+1)T)=e^{AT}\\mathbf{x}(kT)+\\int_{kT}^{(k+1)T} e^{A((k+1)T-\\tau)} B\\,\\mathbf{u}[k]\\,d\\tau$. בהחלפת משתנה $\\sigma=(k+1)T-\\tau$ מתקבל $\\Phi=e^{AT}$ ו-$\\Gamma=\\big(\\int_0^T e^{A\\sigma}\\,d\\sigma\\big)B$. אם $A$ הפיכה: $\\Gamma=A^{-1}(e^{AT}-I)B$. 3. המערכת החופשית $\\mathbf{x}[k+1]=\\Phi\\mathbf{x}[k]$ יציבה אסימפטוטית אם ורק אם הרדיוס הספקטרלי $\\rho(\\Phi)=\\max_i|\\lambda_i(\\Phi)|<1$ — שקול לכך שכל הערכים העצמיים של $\\Phi$ בתוך עיגול היחידה.",
      },
      {
        id: "dcr-q02-opt2",
        plainText:
          "$\\Phi=A$ ו-$\\Gamma=B$ ללא תלות ב-$T$, כי הדגימה אינה משנה את המטריצות.",
        isCorrect: false,
        explanation:
          "שגוי: הדגימה משנה מהותית את הדינמיקה; $\\Phi$ ו-$\\Gamma$ תלויים אקספוננציאלית ב-$T$.",
      },
      {
        id: "dcr-q02-opt3",
        plainText:
          "היציבות הבדידה דורשת שכל הערכים העצמיים של $\\Phi$ יהיו בעלי חלק ממשי שלילי בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: זהו קריטריון רציף על $A$; לבדיד נדרש $|\\lambda(\\Phi)|<1$.",
      },
      {
        id: "dcr-q02-opt4",
        plainText:
          "עם ZOH מתקבל תמיד $\\Gamma=0$, כי הכניסה קבועה אינה משפיעה על המצב.",
        isCorrect: false,
        explanation:
          "שגוי: כניסה קבועה במרווח הדגימה כן מניעה את המצב; $\\Gamma$ מייצג בדיוק את השפעתה המשולבת.",
      },
    ],
  },
  {
    id: "dcr-q03-sampling-theorem-aliasing",
    domain: "משפט הדגימה",
    title: "בקרה ספרתית ורובוטיקה - משפט הדגימה של נייקוויסט-שנון",
    context:
      "אות רציף חוסם-סרט בעל תדר מקסימלי $f_{\\max}$ נדגם בתדר $f_s=1/T$. לאחר הדגימה עלול להופיע ערבוב ספקטרלי (aliasing) אם $f_s$ נמוך מדי.",
    formulaLatex:
      "f_s > 2 f_{\\max} \\quad (\\text{Nyquist rate}), \\quad \\omega_s = 2\\pi / T",
    instruction:
      "מהו תנאי משפט הדגימה לשחזור חד-משמעי, ומה הקשר לבחירת $T$ בבקרה ספרתית?",
    options: [
      {
        id: "dcr-q03-opt1",
        plainText:
          "נדרש $f_s > 2f_{\\max}$ (קצב נייקוויסט) לשחזור תיאורטי ללא aliasing; בפועל בבקרה בוחרים $f_s$ גבוה בהרבה מרוחב הסרט הסגור (למשל פי 10–30) עקב רעש, אנטי-אליאסינג והשהיית חישוב.",
        mathText: "f_s > 2 f_{\\max},\\quad T \\ll 2\\pi/\\omega_b",
        isCorrect: true,
        explanation:
          "נכון: 1. משפט שנון–נייקוויסט: אם $F(j\\omega)=0$ לכל $|\\omega|>\\omega_{\\max}=2\\pi f_{\\max}$, אז $f_s>2f_{\\max}$ מאפשר שחזור חד-משמעי דרך מסנן low-pass אידיאלי. 2. עבור $f_s\\le 2f_{\\max}$ רכיבי ספקטרום ב-$\\omega\\pm k\\omega_s$ מתערבבים (aliasing) ולא ניתן להפריד ביניהם. 3. בבקרה ספרתית האות אינו חוסם-סרט מושלם: משתמשים במסנן אנטי-אליאסינג לפני הדגימה; בנוסף, ZOH מכניס השהיה אפקטיבית של כ-$T/2$ הפוגעת בשולי המופע. לכן בפועל בוחרים $f_s$ גבוה בהרבה מרוחב הסרט הסגור $\\omega_b$ (כלל אצבע נפוץ: פי 10–30), ולא רק את קצב נייקוויסט המינימלי.",
      },
      {
        id: "dcr-q03-opt2",
        plainText:
          "מספיק $f_s = f_{\\max}$ בדיוק, ואין צורך במסנן אנטי-אליאסינג לעולם.",
        isCorrect: false,
        explanation:
          "שגוי: השוויון $f_s=f_{\\max}$ מתחת לקצב נייקוויסט ($2f_{\\max}$) וגורם ל-aliasing חמור.",
      },
      {
        id: "dcr-q03-opt3",
        plainText:
          "ככל ש-$T$ גדול יותר, שחזור האות תמיד מדויק יותר כי יש פחות דגימות מיותרות.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת $T$ מורידה את $f_s$ ומחמירה aliasing ואובדן מידע על דינמיקה מהירה.",
      },
      {
        id: "dcr-q03-opt4",
        plainText:
          "משפט הדגימה חל רק על אותות דטרמיניסטיים ואינו רלוונטי למערכות בקרה עם משוב.",
        isCorrect: false,
        explanation:
          "שגוי: המשפט חל על אותות בנדווידתיים כלליים; בחוג בקרה הוא קובע מגבלות על מדידה ובקרה בדידה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "dcr-q04-dh-parameters",
    domain: "פרמטרי דנביט-הרטנברג",
    title: "בקרה ספרתית ורובוטיקה - פרמטרי Denavit–Hartenberg (DH)",
    context:
      "לשרשרת קינמטית של $n$ מפרקים מגדירים לכל חוליה $i$ ארבעה פרמטרים $(a_i,\\alpha_i,d_i,\\theta_i)$ והומוגנית ${}^{i-1}T_i\\in SE(3)$.",
    formulaLatex:
      "{}^{i-1}T_i = \\operatorname{Rot}_{z}(\\theta_i)\\operatorname{Trans}_{z}(d_i)\\operatorname{Trans}_{x}(a_i)\\operatorname{Rot}_{x}(\\alpha_i)",
    instruction:
      "מה משמעות ארבעת פרמטרי DH, וכיצד נבנית הטרנספורמציה בין מערכות צירים צמודות?",
    options: [
      {
        id: "dcr-q04-opt1",
        plainText:
          "פרמטרי DH הם שישה תמיד ($x,y,z,\\alpha,\\beta,\\gamma$) לכל מפרק, ללא צמצום.",
        isCorrect: false,
        explanation:
          "שגוי: הקונבנציה הקלאסית של DH מצמצמת ל-4 פרמטרים ע״י בחירת מערכות צירים צמודות לכלים.",
      },
      {
        id: "dcr-q04-opt2",
        plainText:
          "$a_i$ — אורך החוליה, $\\alpha_i$ — פיתול החוליה, $d_i$ — היסט מפרק (פריזמטי/משתנה), $\\theta_i$ — זווית מפרק סיבובי; המכפלה ${}^{0}T_n={}^{0}T_1\\cdots{}^{n-1}T_n$ נותנת את תנוחת האפקטור.",
        mathText:
          "{}^{0}T_n = \\prod_{i=1}^{n}{}^{i-1}T_i(a_i,\\alpha_i,d_i,\\theta_i)",
        isCorrect: true,
        explanation:
          "נכון: 1. קונבנציית DH הקלאסית בוחרת מערכות צירים כך שציר $z_{i-1}$ לאורך מפרק $i$, וציר $x_i$ לאורך המשותף המשותף ל-$z_{i-1}$ ו-$z_i$ — ובכך מצמצמים 6 DOF יחסיים ל-4 פרמטרים. 2. המשמעויות: $a_i$ (link length) — מרחק לאורך $x_i$ בין $z_{i-1}$ ל-$z_i$; $\\alpha_i$ (link twist) — זווית בין $z_{i-1}$ ל-$z_i$ סביב $x_i$; $d_i$ (link offset) — היסט לאורך $z_{i-1}$; $\\theta_i$ — זווית בין $x_{i-1}$ ל-$x_i$ סביב $z_{i-1}$. 3. למפרק סיבובי $\\theta_i$ הוא המשתנה; לפריזמטי $d_i$ הוא המשתנה. 4. הקינמטיקה הקדמית: ${}^{0}T_n=\\prod_{i=1}^{n}{}^{i-1}T_i$ נותנת את תנוחת האפקטור ב-$SE(3)$.",
      },
      {
        id: "dcr-q04-opt3",
        plainText:
          "פרמטרי DH מתארים רק דינמיקת מסות ואינרציה, ולא את הגיאומטריה של השרשרת.",
        isCorrect: false,
        explanation:
          "שגוי: DH הוא תיאור קינמטי-גיאומטרי של מיקום יחסי בין חוליות; דינמיקה דורשת בנוסף מסות/אינרציות.",
      },
      {
        id: "dcr-q04-opt4",
        plainText:
          "${}^{i-1}T_i$ תלויה תמיד ב-$6n$ דרגות חופש בלתי-תלויות ללא קשר לסוג המפרק.",
        isCorrect: false,
        explanation:
          "שגוי: לכל מפרק דרגת חופש אחת (בדרך כלל), והטרנספורמציה פרמטרית במשתנה המפרק המתאים.",
      },
    ],
  },
  {
    id: "dcr-q05-forward-inverse-kinematics",
    domain: "קינמטיקה קדמית והפוכה",
    title: "בקרה ספרתית ורובוטיקה - קינמטיקה קדמית והפוכה",
    context:
      "וקטור המפרקים $\\mathbf{q}\\in\\mathbb{R}^n$ ממפה לתנוחת האפקטור $\\mathbf{x}=f(\\mathbf{q})\\in SE(3)$ (או לתת-מרחב משימות). הקינמטיקה ההפוכה מחפשת $\\mathbf{q}$ כך ש-$f(\\mathbf{q})=\\mathbf{x}_d$.",
    formulaLatex:
      "\\mathbf{x} = f(\\mathbf{q}), \\quad \\mathbf{q} = f^{-1}(\\mathbf{x}_d)",
    instruction:
      "מה ההבדל המהותי בין קינמטיקה קדמית להפוכה מבחינת קיום ויחידות פתרון?",
    options: [
      {
        id: "dcr-q05-opt1",
        plainText:
          "הקינמטיקה ההפוכה תמיד יחידה וקלה אנליטית, בעוד הקדמית עשויה להיות ריקה מפתרונות.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך — הקדמית חד-ערכית וסגורה; ההפוכה עלולה להיות ריקה, יחידה או מרובת פתרונות.",
      },
      {
        id: "dcr-q05-opt2",
        plainText:
          "הקדמית $f(\\mathbf{q})$ חד-ערכית וניתנת תמיד ממכפלת DH; ההפוכה לא-ליניארית — עשויה להיות ללא פתרון (מחוץ ל-workspace), יחידה, או מרובת תצורות (למשל elbow-up/down), ולעיתים נפתרת נומרית.",
        mathText:
          "f:\\mathbf{q}\\mapsto\\mathbf{x}\\ \\text{unique};\\quad f^{-1}\\ \\text{0/1/many}",
        isCorrect: true,
        explanation:
          "נכון: 1. קינמטיקה קדמית $f:\\mathbb{R}^n\\to SE(3)$ (או לתת-מרחב משימות) חד-ערכית: לכל תצורת מפרקים $\\mathbf{q}$ יש תנוחת אפקטור יחידה, ומחושבת במפורש ממכפלת מטריצות DH. 2. קינמטיקה הפוכה $f^{-1}$ היא פתרון מערכת משוואות לא-ליניאריות (טריגונומטריות/אלגבריות): ייתכן אין פתרון ($\\mathbf{x}_d$ מחוץ ל-workspace), פתרון יחיד, או מספר סופי של תצורות (elbow-up/down, wrist-flip). 3. ברובוטים רדודנטים ($n>6$ למשימת $SE(3)$ מלאה) קיים יריעת פתרונות ממימד $n-6$, ונדרש קריטריון משני (מניפולביליות, הימנעות ממכשולים, אופטימיזציה בגרעין של $J$). 4. כאשר אין פתרון אנליטי סגור משתמשים בשיטות נומריות (Newton–Raphson על $J\\Delta\\mathbf{q}$).",
      },
      {
        id: "dcr-q05-opt3",
        plainText:
          "אין הבדל מתמטי: $f$ ו-$f^{-1}$ ליניאריות תמיד ומתקבלות מהיעקוביאן בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: $f$ לא-ליניארית; היעקוביאן הוא ליניאריזציה מקומית של מהירויות, לא של מיפוי התנוחה עצמו.",
      },
      {
        id: "dcr-q05-opt4",
        plainText:
          "הקינמטיקה הקדמית מוגדרת רק לרובוטים נייחים, וההפוכה רק לניידים.",
        isCorrect: false,
        explanation:
          "שגוי: שני המושגים חלים על מניפולטורים תעשייתיים נייחים ועל פלטפורמות ניידות כאחד.",
      },
    ],
  },
  {
    id: "dcr-q06-geometric-jacobian-jq",
    domain: "יעקוביאן רובוטי",
    title: "בקרה ספרתית ורובוטיקה - היעקוביאן הגיאומטרי $J(\\mathbf{q})$",
    context:
      "מהירות האפקטור $\\boldsymbol{\\nu}=(\\mathbf{v},\\boldsymbol{\\omega})$ קשורה למהירויות המפרקים ע״י $\\boldsymbol{\\nu}=J(\\mathbf{q})\\dot{\\mathbf{q}}$.",
    formulaLatex:
      "\\boldsymbol{\\nu} = J(\\mathbf{q})\\,\\dot{\\mathbf{q}}, \\quad J(\\mathbf{q})\\in\\mathbb{R}^{6\\times n}",
    instruction:
      "מה מייצגות עמודות $J(\\mathbf{q})$, וכיצד משתמשים ביעקוביאן לבקרת מהירות?",
    options: [
      {
        id: "dcr-q06-opt1",
        plainText:
          "$J(\\mathbf{q})$ הוא מטריצת הקשיחות האלסטית של החוליות ואינו קשור למהירויות.",
        isCorrect: false,
        explanation:
          "שגוי: היעקוביאן הקינמטי מקשר מהירויות מפרק למהירויות מרחביות; קשיחות שייכת לדינמיקה/אלסטיות.",
      },
      {
        id: "dcr-q06-opt2",
        plainText:
          "עמודת $i$ של $J$ היא טוויסט האפקטור עקב $\\dot{q}_i=1$ ושאר המפרקים קפואים; לבקרת מהירות פותרים $\\dot{\\mathbf{q}}=J^{+}\\boldsymbol{\\nu}_d$ (פסאודו-הפוך) כאשר $J$ מדרגה מלאה.",
        mathText:
          "\\dot{\\mathbf{q}} = J^{+}(\\mathbf{q})\\,\\boldsymbol{\\nu}_d,\\quad J^{+}=J^T(JJ^T)^{-1}",
        isCorrect: true,
        explanation:
          "נכון: 1. היעקוביאן הגיאומטרי מקיים $\\boldsymbol{\\nu}=J(\\mathbf{q})\\dot{\\mathbf{q}}$ עם $J\\in\\mathbb{R}^{6\\times n}$. 2. עמודת $i$: תרומת $\\dot{q}_i=1$ לשאר המפרקים קפואים — למפרק סיבובי $(\\mathbf{z}_{i-1}\\times(\\mathbf{p}_e-\\mathbf{p}_{i-1}),\\,\\mathbf{z}_{i-1})$; לפריזמטי $(\\mathbf{z}_{i-1},\\,\\mathbf{0})$. 3. בקרת מהירות: בהינתן $\\boldsymbol{\\nu}_d$ רצוי, אם $J$ מדרגה מלאה ו-$n=6$ פותרים $\\dot{\\mathbf{q}}=J^{-1}\\boldsymbol{\\nu}_d$; אם $n>6$ משתמשים בפסאודו-הפוך הימני $J^{+}=J^T(JJ^T)^{-1}$ ומוסיפים $(I-J^{+}J)\\dot{\\mathbf{q}}_0$ לאופטימיזציה בגרעין. 4. זהו הבסיס גם לרזולוציה דיפרנציאלית ולמיפוי כוחות דרך $J^T$ (דואליות סטטית).",
      },
      {
        id: "dcr-q06-opt3",
        plainText:
          "$J(\\mathbf{q})$ תמיד ריבועית והפיכה לכל $\\mathbf{q}$, ולכן אין צורך בפסאודו-הפוך.",
        isCorrect: false,
        explanation:
          "שגוי: $J$ היא $6\\times n$; לרדודנטיות או ליד סינגולריות היא אינה הפיכה במובן הרגיל.",
      },
      {
        id: "dcr-q06-opt4",
        plainText:
          "היעקוביאן תלוי רק בזמן $t$ ולא בתצורת המפרקים $\\mathbf{q}$.",
        isCorrect: false,
        explanation:
          "שגוי: $J=J(\\mathbf{q})$ — תלות מפורשת בתצורה; לאורך מסלול הוא משתנה עם $\\mathbf{q}(t)$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "dcr-q07-kinematic-singularity",
    domain: "סינגולריות קינמטיות",
    title: "בקרה ספרתית ורובוטיקה - סינגולריות של $J(\\mathbf{q})$",
    context:
      "בתצורה $\\mathbf{q}_s$ מטריצת היעקוביאן מאבדת דרגה: $\\operatorname{rank} J(\\mathbf{q}_s)<\\min(6,n)$. כיוונים מסוימים במרחב המשימה אינם ניתנים למימוש.",
    formulaLatex:
      "\\det\\big(J(\\mathbf{q}_s)J(\\mathbf{q}_s)^T\\big)=0 \\quad (n\\ge 6),\\quad \\sigma_{\\min}(J)\\to 0",
    instruction:
      "מהי משמעות סינגולריות קינמטית, ומה קורה לבקרת מהירות לידה?",
    options: [
      {
        id: "dcr-q07-opt1",
        plainText:
          "בסינגולריות הרובוט תמיד קורס מכנית כי המומנטים במפרקים מתאפסים זהותית.",
        isCorrect: false,
        explanation:
          "שגוי: סינגולריות היא תופעה קינמטית של אובדן ניידות כיוונית; אינה בהכרח כשל מכני מיידי.",
      },
      {
        id: "dcr-q07-opt2",
        plainText:
          "סינגולריות פירושה ש-$J$ מדרגה מלאה ו-$\\sigma_{\\min}$ מקסימלי — הנקודה הבטוחה ביותר לבקרה.",
        isCorrect: false,
        explanation:
          "שגוי: סינגולריות מוגדרת ע״י אובדן דרגה ו-$\\sigma_{\\min}\\to 0$, לא מקסימום.",
      },
      {
        id: "dcr-q07-opt3",
        plainText:
          "בסינגולריות $\\operatorname{rank} J$ יורד: יש כיוון משימה עם $\\boldsymbol{\\nu}$ שלא ב-$\\operatorname{Im} J$; $J^{+}$ מתבדר ($\\|\\dot{\\mathbf{q}}\\|\\to\\infty$ למהירות משימה סופית) — נדרשים שיטות דמפד/אלומות או מעקף מסלול.",
        mathText:
          "\\sigma_{\\min}(J)\\to 0 \\Rightarrow \\|J^{+}\\|\\to\\infty",
        isCorrect: true,
        explanation:
          "נכון: 1. סינגולריות קינמטית מוגדרת ע״י $\\operatorname{rank} J(\\mathbf{q}_s)<\\min(6,n)$, או שקול: הערך הסינגולרי המינימלי $\\sigma_{\\min}(J)\\to 0$ ומדד המניפולביליות $\\sqrt{\\det(JJ^T)}$ מתאפס. 2. משמעות: קיים כיוון $\\boldsymbol{\\nu}\\notin\\operatorname{Im} J$ שאינו ניתן למימוש במהירויות מפרק סופיות; במקביל, כיוונים ב-$\\operatorname{Im} J$ דורשים $\\|\\dot{\\mathbf{q}}\\|\\to\\infty$ למהירות משימה סופית כי $\\|J^{+}\\|\\propto 1/\\sigma_{\\min}$. 3. דוגמאות: יישור מרפק, סינגולריות פרק כף היד ברובוט 6DOF. 4. פתרונות מעשיים: Damped Least Squares $J^{\\#}=J^T(JJ^T+\\lambda^2 I)^{-1}$, מעקב מניפולביליות בתכנון מסלול, או מעקף גיאומטרי של אזור הסינגולריות.",
      },
      {
        id: "dcr-q07-opt4",
        plainText:
          "סינגולריות מתרחשת רק ברובוטים עם פחות מ-3 מפרקים ואינה רלוונטית ל-6DOF.",
        isCorrect: false,
        explanation:
          "שגוי: רובוטי 6DOF תעשייתיים סובלים מסינגולריות מוכרות היטב בתוך ה-workspace.",
      },
    ],
  },
  {
    id: "dcr-q08-discrete-pid-implementation",
    domain: "PID בדיד",
    title: "בקרה ספרתית ורובוטיקה - מימוש PID בדיד",
    context:
      "בקר PID רציף $C(s)=K_p+K_i/s+K_d s$ ממומש בדגימה $T$ על שגיאה $e[k]=r[k]-y[k]$. האינטגרל והנגזרת מואפסים נומרית.",
    formulaLatex:
      "u[k] = K_p e[k] + K_i T\\sum_{j=0}^{k} e[j] + K_d\\frac{e[k]-e[k-1]}{T}",
    instruction:
      "מהו מימוש המיקום (positional) הסטנדרטי של PID בדיד, ומה סכנת windup?",
    options: [
      {
        id: "dcr-q08-opt1",
        plainText:
          "ב-PID בדיד משמיטים תמיד את איבר האינטגרל, כי סכימה בדידה אינה מוגדרת.",
        isCorrect: false,
        explanation:
          "שגוי: האינטגרל ממומש בסכום רימן/טרפז; הוא מרכזי לביטול שגיאת מצב מתמיד.",
      },
      {
        id: "dcr-q08-opt2",
        plainText:
          "הנגזרת הבדידה $\\frac{e[k]-e[k-1]}{T}$ חסינה לחלוטין לרעש מדידה ולכן עדיפה תמיד על נגזרת מסוננת.",
        isCorrect: false,
        explanation:
          "שגוי: הפרש קדימה מחזק רעש בתדר גבוה; בפועל משתמשים בנגזרת מסוננת או על $-y$.",
      },
      {
        id: "dcr-q08-opt3",
        plainText:
          "מימוש מיקום: $u[k]=K_p e[k]+K_i T\\sum e[j]+K_d\\frac{e[k]-e[k-1]}{T}$; ברווית מפעיל האינטגרל ממשיך לצבור (integrator windup) — נדרש anti-windup (clamp/back-calculation).",
        mathText:
          "u[k]=K_p e[k]+K_i T\\sum_{j} e[j]+K_d\\frac{\\Delta e[k]}{T}",
        isCorrect: true,
        explanation:
          "נכון: 1. קירוב אוילר קדימה לאינטגרל: $\\int e\\,dt \\approx T\\sum_{j=0}^{k} e[j]$; לנגזרת: $\\dot{e}\\approx(e[k]-e[k-1])/T$ — זהו מימוש המיקום (positional form). 2. צורת המהירות (velocity form) מחשבת $\\Delta u[k]$ ונוחה יותר ל-anti-windup ולמעבר חלק בין מצבים. 3. Integrator windup: כאשר המפעיל ברוויה ($|u|=u_{\\max}$), השגיאה ממשיכה להצטבר בסכום האינטגרלי; לאחר חזרה לטווח הליניארי הבקר ״תקוע״ עם $u$ גדול וזמן ההתאוששות מתארך. 4. הגנות: clamping של האינטגרל, back-calculation, או עצירת האינטגרציה ברוויה; לנגזרת — סינון או גזירת $-y$ במקום $e$ למניעת derivative kick.",
      },
      {
        id: "dcr-q08-opt4",
        plainText:
          "PID בדיד זהה מתמטית ל-$C(s)$ לכל $T$, כולל $T\\to\\infty$, ללא שגיאת קירוב.",
        isCorrect: false,
        explanation:
          "שגוי: הדיסקרטיזציה מקורבת; עבור $T$ גדול התגובה והיציבות סוטות משמעותית מהרציף.",
      },
    ],
  },
  {
    id: "dcr-q09-deadbeat-control",
    domain: "בקרת Deadbeat",
    title: "בקרה ספרתית ורובוטיקה - בקרת Deadbeat",
    context:
      "עבור מערכת בדידה $G(z)=B(z)/A(z)$ מתכננים בקר כך ששגיאת המעקב לאות ייחוס (למשל מדרגה) מתאפסת תוך מספר סופי מינימלי של דגימות ונשארת אפס.",
    formulaLatex:
      "E(z) = 0 \\quad \\text{for } k \\ge N,\\quad N = \\deg A\\ \\text{(typical minimal)}",
    instruction:
      "מהי תכונת deadbeat, ומה חסרונה העיקרי בפני רעש ואי-ודאות מודל?",
    options: [
      {
        id: "dcr-q09-opt1",
        plainText:
          "Deadbeat מבטיח זמן התיישבות אינסופי עם ריסון קריטי בלבד, ללא אפסת שגיאה סופית.",
        isCorrect: false,
        explanation:
          "שגוי: הרעיון המרכזי הוא דווקא אפסת שגיאה תוך מספר סופי של צעדים.",
      },
      {
        id: "dcr-q09-opt2",
        plainText:
          "Deadbeat אפשרי רק במערכות רציפות עם $C(s)$ פרופר, ולא במערכות בדידות.",
        isCorrect: false,
        explanation:
          "שגוי: Deadbeat הוא מושג ייחודי כמעט לבקרה בדידה (ביטול פולינום השגיאה ב-$z$).",
      },
      {
        id: "dcr-q09-opt3",
        plainText:
          "מתכננים את החוג הסגור כך שפולינום השגיאה הוא סופי (FIR): השגיאה נעלמת לאחר $N$ דגימות; המחיר — אות בקרה אלים ורגישות גבוהה לרעש ולאי-דיוק מודל (ביטול אפסים/קטבים).",
        mathText:
          "Y(z)/R(z) = z^{-N}\\ \\text{(ideal step deadbeat)},\\quad u\\ \\text{aggressive}",
        isCorrect: true,
        explanation:
          "נכון: 1. ב-deadbeat מתכננים את פונקציית התמסורת בחוג סגור כך שפולינום השגיאה $E(z)$ הוא פולינום סופי (FIR): לאחר $N$ דגימות $e[k]=0$ לכל $k\\ge N$. 2. עבור כניסת מדרגה אידיאלית לעיתים $Y(z)/R(z)=z^{-N}$ עם $N$ מינימלי התלוי בדרגת המכנה של התהליך. 3. המחיר: אות הבקרה $u[k]$ אלים (קפיצות גדולות), ולעיתים נדרש ביטול אפסים של $G(z)$ — רגיש מאוד לאי-דיוק מודל ולרעש מדידה. 4. בפועל מעדיפים שיבוץ קטבים מתון, LQR בדיד, או deadbeat מרוכך עם אילוצי $|u|\\le u_{\\max}$.",
      },
      {
        id: "dcr-q09-opt4",
        plainText:
          "Deadbeat זהה לבקרת bang-bang רציפה ומבטיח $|u|\\le u_{\\max}$ תמיד ללא תכנון.",
        isCorrect: false,
        explanation:
          "שגוי: Deadbeat אינו מגביל מפורשות את $|u|$; להפך, הוא נוטה לדרוש $u$ גדול.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "dcr-q10-lagrange-robot-dynamics",
    domain: "דינמיקת רובוט — לגרנז׳",
    title: "בקרה ספרתית ורובוטיקה - משוואות לגרנז׳ לדינמיקת מניפולטור",
    context:
      "למניפולטור עם קואורדינטות מוכללות $\\mathbf{q}$ מגדירים אנרגיה קינטית $T=\\frac{1}{2}\\dot{\\mathbf{q}}^T M(\\mathbf{q})\\dot{\\mathbf{q}}$ ואנרגיה פוטנציאלית $V(\\mathbf{q})$.",
    formulaLatex:
      "\\frac{d}{dt}\\frac{\\partial L}{\\partial\\dot{\\mathbf{q}}}-\\frac{\\partial L}{\\partial\\mathbf{q}}=\\boldsymbol{\\tau},\\quad L=T-V",
    instruction:
      "מהי הצורה הסטנדרטית של משוואות התנועה, ומה תכונת הסימטריה החשובה של $M(\\mathbf{q})$?",
    options: [
      {
        id: "dcr-q10-opt1",
        plainText:
          "הדינמיקה היא תמיד $\\ddot{\\mathbf{q}}=\\boldsymbol{\\tau}$ ללא תלות במסה או בגרביטציה.",
        isCorrect: false,
        explanation:
          "שגוי: זו הזנחה קיצונית; $M(\\mathbf{q})$, קוריוליס וגרביטציה חיוניים.",
      },
      {
        id: "dcr-q10-opt2",
        plainText:
          "מטריצת האינרציה $M(\\mathbf{q})$ אנטי-סימטרית תמיד, ולכן $M=-M^T$.",
        isCorrect: false,
        explanation:
          "שגוי: $M(\\mathbf{q})$ סימטרית וחיובית בהחלט; האנטי-סימטריה שייכת ל-$\\dot{M}-2C$ תחת כריסטופל.",
      },
      {
        id: "dcr-q10-opt3",
        plainText:
          "משוואות לגרנז׳ אינן חלות על רובוטים עם מפרקים פריזמטיים — רק על סיבוביים.",
        isCorrect: false,
        explanation:
          "שגוי: הפורמליזם חל על כל קואורדינטות מוכללות, כולל פריזמטיים ומשולבים.",
      },
      {
        id: "dcr-q10-opt4",
        plainText:
          "מתקבל $M(\\mathbf{q})\\ddot{\\mathbf{q}}+C(\\mathbf{q},\\dot{\\mathbf{q}})\\dot{\\mathbf{q}}+\\mathbf{g}(\\mathbf{q})=\\boldsymbol{\\tau}$ עם $M=M^T\\succ 0$; תחת בחירה סטנדרטית של $C$, המטריצה $\\dot{M}-2C$ אנטי-סימטרית — תכונה מרכזית לניתוח יציבות פסיביות.",
        mathText:
          "M(q)\\ddot{q}+C(q,\\dot{q})\\dot{q}+g(q)=\\tau,\\quad \\dot{M}-2C\\ \\text{skew}",
        isCorrect: true,
        explanation:
          "נכון: 1. מלגרנז׳ $L=T-V$ עם $T=\\frac{1}{2}\\dot{\\mathbf{q}}^T M(\\mathbf{q})\\dot{\\mathbf{q}}$ מתקבלת הצורה $M(\\mathbf{q})\\ddot{\\mathbf{q}}+C(\\mathbf{q},\\dot{\\mathbf{q}})\\dot{\\mathbf{q}}+\\mathbf{g}(\\mathbf{q})=\\boldsymbol{\\tau}$. 2. $M(\\mathbf{q})=M(\\mathbf{q})^T\\succ 0$ נגזרת מאנרגיות קינטיות של החוליות (נוסחת שטיינר + יעקוביאני מהירות). 3. $C$ כולל קוריוליס וצנטריפוגלי דרך סמלי כריסטופל של $M$; $\\mathbf{g}=\\partial V/\\partial\\mathbf{q}$. 4. תחת בחירה סטנדרטית של $C$, המטריצה $\\dot{M}-2C$ אנטי-סימטרית, ולכן $\\dot{\\mathbf{q}}^T(\\dot{M}-2C)\\dot{\\mathbf{q}}=0$ — זה הבסיס להוכחות פסיביות וליציבות של PD עם פיצוי גרביטציה $\\boldsymbol{\\tau}=-K_p\\tilde{\\mathbf{q}}-K_d\\dot{\\mathbf{q}}+\\mathbf{g}(\\mathbf{q})$ ושל בקרים אדפטיביים.",
      },
    ],
  },
  {
    id: "dcr-q11-trajectory-planning",
    domain: "תכנון מסלולים",
    title: "בקרה ספרתית ורובוטיקה - תכנון מסלול (Trajectory Planning)",
    context:
      "נדרש לתכנן $\\mathbf{q}(t)$ (או $\\mathbf{x}(t)$ במרחב משימה) בין תצורת התחלה לסיום בזמן $t_f$, עם אילוצי מהירות/תאוצה ורציפות.",
    formulaLatex:
      "\\mathbf{q}(0)=\\mathbf{q}_0,\\ \\mathbf{q}(t_f)=\\mathbf{q}_f,\\ \\dot{\\mathbf{q}}(0)=\\dot{\\mathbf{q}}(t_f)=\\mathbf{0}",
    instruction:
      "מה ההבדל בין תכנון במרחב מפרקים למרחב משימה, ומדוע נפוצים פולינומי דרגה 5?",
    options: [
      {
        id: "dcr-q11-opt1",
        plainText:
          "תכנון במרחב משימה מבטיח תמיד הימנעות מסינגולריות ומגבולות מפרק ללא בדיקה.",
        isCorrect: false,
        explanation:
          "שגוי: מסלול משימה עלול לעבור בסינגולריות או לדרוש $\\mathbf{q}$ מחוץ לגבולות — יש לבדוק קינמטיקה הפוכה.",
      },
      {
        id: "dcr-q11-opt2",
        plainText:
          "פולינום ליניארי בזמן מספיק תמיד ל-$\\mathbf{q}(t)$ כי הוא מקיים אוטומטית תנאי מהירות ותאוצה אפס בקצוות.",
        isCorrect: false,
        explanation:
          "שגוי: קו ישר ב-$\\mathbf{q}$ נותן מהירות קפיצית בקצוות אם לא מתוכנן פרופיל; אינו מקיים 6 תנאי קצה.",
      },
      {
        id: "dcr-q11-opt3",
        plainText:
          "תכנון מסלול עוסק רק בבחירת בקר PID ואינו כולל יצירת ייחוס $\\mathbf{q}_d(t)$.",
        isCorrect: false,
        explanation:
          "שגוי: תכנון מסלול יוצר את אות הייחוס; הבקר עוקב אחריו — שכבות נפרדות.",
      },
      {
        id: "dcr-q11-opt4",
        plainText:
          "במרחב מפרקים קל לכבד גבולות $\\mathbf{q},\\dot{\\mathbf{q}}$; במרחב משימה קל ליישר קו/קשת ב-$\\mathbf{x}$ אך נדרשת קינמטיקה הפוכה. פולינום מדרגה 5 מקיים 6 תנאי קצה ($q,\\dot{q},\\ddot{q}$ בהתחלה ובסוף) לרציפות תאוצה.",
        mathText:
          "q(t)=a_0+a_1 t+\\cdots+a_5 t^5\\quad (6\\ \\text{BCs})",
        isCorrect: true,
        explanation:
          "נכון: 1. במרחב מפרקים: מתכננים $\\mathbf{q}_d(t)$ ישירות — קל לכבד $\\mathbf{q}_{\\min}\\le\\mathbf{q}\\le\\mathbf{q}_{\\max}$ וגבולות $\\dot{\\mathbf{q}},\\ddot{\\mathbf{q}}$, אך מסלול האפקטור ב-$\\mathbf{x}$ אינו קו ישר בהכרח. 2. במרחב משימה: מתכננים $\\mathbf{x}_d(t)$ (קו/קשת/ספליין) ואז מחשבים $\\mathbf{q}_d=f^{-1}(\\mathbf{x}_d)$ — נוח לריתוך/הרכבה, אך חובה לנטר סינגולריות וגבולות מפרק לאורך המסלול. 3. פולינום מדרגה 5 $q(t)=\\sum_{i=0}^{5}a_i t^i$ מספק בדיוק 6 דרגות חופש ל-6 תנאי קצה: $q,\\dot{q},\\ddot{q}$ ב-$t=0$ וב-$t=t_f$ — כך התאוצה רציפה וה-jerk מוגבל יחסית. 4. חלופות נפוצות: פרופיל טרפז מהירות, S-curve, ו-cubic/quintic splines בין נקודות ביניים.",
      },
    ],
  },
  {
    id: "dcr-q12-discrete-controllability-observability",
    domain: "שליטות וצפיות בדידה",
    title: "בקרה ספרתית ורובוטיקה - Controllability ו-Observability בדידים",
    context:
      "מערכת בדידה ליניארית $\\mathbf{x}[k+1]=\\Phi\\mathbf{x}[k]+\\Gamma\\mathbf{u}[k]$, $\\mathbf{y}[k]=C\\mathbf{x}[k]$. רוצים שיבוץ קטבים ע״י משוב מצב וצופה מצב.",
    formulaLatex:
      "\\mathcal{C} = [\\Gamma\\ \\Phi\\Gamma\\ \\cdots\\ \\Phi^{n-1}\\Gamma],\\quad \\mathcal{O}=\\begin{bmatrix}C\\\\C\\Phi\\\\\\vdots\\\\C\\Phi^{n-1}\\end{bmatrix}",
    instruction:
      "מהם תנאי השליטות והצפיות הבדידים, ומה הקשר לשיבוץ קטבים ולצופה?",
    options: [
      {
        id: "dcr-q12-opt1",
        plainText:
          "המערכת שליטה אם ורק אם $\\Phi$ סינגולרית, ללא תלות ב-$\\Gamma$.",
        isCorrect: false,
        explanation:
          "שגוי: שליטות נקבעת ע״י דרגת מטריצת השליטות $\\mathcal{C}(\\Phi,\\Gamma)$, לא ע״י סינגולריות $\\Phi$ לבדה.",
      },
      {
        id: "dcr-q12-opt2",
        plainText:
          "צפיות בדידה דורשת רק ש-$C$ תהיה ריבועית והפיכה, ללא תלות ב-$\\Phi$.",
        isCorrect: false,
        explanation:
          "שגוי: נדרש $\\operatorname{rank}\\mathcal{O}=n$; $C$ הפיכה מספיקה אך אינה הכרחית (די בפלט חלקי עם דינמיקה מתאימה).",
      },
      {
        id: "dcr-q12-opt3",
        plainText:
          "אם המערכת הרציפה $(A,B)$ שליטה, אז לכל $T>0$ המערכת הדגומה $(\\Phi,\\Gamma)$ שליטה תמיד — ללא חריגים.",
        isCorrect: false,
        explanation:
          "שגוי: קיימים זמני דגימה פתולוגיים שבהם אובדת שליטות (למשל הפרשי ערכים עצמיים השווים $j2\\pi k/T$).",
      },
      {
        id: "dcr-q12-opt4",
        plainText:
          "שליטות: $\\operatorname{rank}\\mathcal{C}=n$ מאפשרת שיבוץ שרירותי של קטבי $\\Phi-\\Gamma K$ (תחת שדה מרוכב); צפיות: $\\operatorname{rank}\\mathcal{O}=n$ מאפשרת צופה $\\hat{\\mathbf{x}}[k+1]=(\\Phi-LC)\\hat{\\mathbf{x}}[k]+\\Gamma\\mathbf{u}[k]+L\\mathbf{y}[k]$ עם קטבי $\\Phi-LC$ חופשיים — עקרון ההפרדה הבדיד.",
        mathText:
          "\\operatorname{rank}\\mathcal{C}=\\operatorname{rank}\\mathcal{O}=n \\Rightarrow\\ \\text{pole placement + observer}",
        isCorrect: true,
        explanation:
          "נכון: 1. מטריצת השליטות הבדידה $\\mathcal{C}=[\\Gamma\\ \\Phi\\Gamma\\ \\cdots\\ \\Phi^{n-1}\\Gamma]$; המערכת שליטה מלאה אם $\\operatorname{rank}\\mathcal{C}=n$, ואז קיים $K$ כך שקטבי $\\Phi-\\Gamma K$ ניתנים לשיבוץ שרירותי (מעל $\\mathbb{C}$). 2. מטריצת הצפיות $\\mathcal{O}=[C^T\\ (C\\Phi)^T\\ \\cdots\\ (C\\Phi^{n-1})^T]^T$; $\\operatorname{rank}\\mathcal{O}=n$ מאפשרת צופה לואנברגר בדיד $\\hat{\\mathbf{x}}[k+1]=(\\Phi-LC)\\hat{\\mathbf{x}}[k]+\\Gamma\\mathbf{u}[k]+L\\mathbf{y}[k]$ עם שיבוץ חופשי של קטבי $\\Phi-LC$. 3. עקרון ההפרדה נשמר: הפולינום האופייני של המערכת המשולבת הוא מכפלת הפולינומים של הבקר ושל הצופה. 4. אזהרה: גם אם $(A,B)$ שליטה ברציף, קיימים $T$ פתולוגיים (הפרשי ערכים עצמיים $j 2\\pi k/T$) שבהם $(\\Phi,\\Gamma)$ מאבדת שליטות — יש לבחור $T$ בהתאם.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_DIGITAL_CONTROL_ROBOTICS_QUESTIONS =
  DIGITAL_CONTROL_ROBOTICS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from Q1–3 (z-transform / discrete state-space / sampling)
 * - 1 from Q4–6 (DH / kinematics / Jacobian)
 * - 1 from Q7–12 (singularity / PID / deadbeat / Lagrange / trajectory / controllability)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleDigitalControlRoboticsOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = DIGITAL_CONTROL_ROBOTICS_QUESTIONS.slice(0, 3);
  const groupB = DIGITAL_CONTROL_ROBOTICS_QUESTIONS.slice(3, 6);
  const groupC = DIGITAL_CONTROL_ROBOTICS_QUESTIONS.slice(6, 12);

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
