import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Advanced Machine Learning diagnostic bank (12Q).
 * Display name: "למידת מכונה מתקדמת" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const ADVANCED_MACHINE_LEARNING_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "aml-q01-pac-learning-vc-dimension-bound",
    domain: "תאוריית למידה חישובית (PAC) וממד VC",
    title: "למידת מכונה מתקדמת - תאוריית למידה חישובית (PAC) וממד VC",
    context:
      "במודל PAC (Probably Approximately Correct), מחלקת השערות $\\mathcal{H}$ בעלת ממד VC סופי $d = \\operatorname{VC}(\\mathcal{H}) < \\infty$ משמשת לסיווג בינארי מעל מרחב מדגם בגודל $n$.",
    formulaLatex:
      "n \\ge \\frac{C}{\\epsilon} \\left( d \\ln\\left(\\frac{1}{\\epsilon}\\right) + \\ln\\left(\\frac{1}{\\delta}\\right) \\right), \\quad \\operatorname{VC}(\\text{Halfspaces in } \\mathbb{R}^d) = d + 1",
    instruction:
      "מה קובע משפט היסוד של למידה סטטיסטית (Fundamental Theorem of Statistical Learning) לגבי ממד VC ויכולת למידה ב-PAC?",
    options: [
      {
        id: "aml-q01-opt1",
        plainText:
          "מחלקת השערות $\\mathcal{H}$ ניתנת ללמידה ב-PAC (PAC-learnable) אם ורק אם ממד ה-VC שלה סופי ($d < \\infty$); חסם גודל המדגם $n(\\epsilon, \\delta)$ תלוי ליניארית בממד ה-VC ואינו תלוי כלל בגודל מרחב הדגימה המקורי $\\mathcal{X}$ (גם אם $\\mathcal{X} = \\mathbb{R}^d$ אינסופי).",
        isCorrect: true,
        explanation:
          "נכון: משפט היסוד של למידה סטטיסטית קובע שקילות מלאה בין שלושה מושגים: (1) המחלקה $\\mathcal{H}$ היא PAC-learnable, (2) לכל אלגוריתם מזעור שגיאה אמפירית (ERM) מתקיימת התכנסות אחידה (Uniform Convergence), (3) ממד ה-VC של המחלקה סופי: $\\operatorname{VC}(\\mathcal{H}) < \\infty$. החסם התחתון והעליון על גודל המדגם הנדרש להבטחת שגיאת הכללה $\\le \\epsilon$ ברמת ביטחון $1-\\delta$ הוא $n = \\Theta\\left(\\frac{d + \\ln(1/\\delta)}{\\epsilon}\\right)$ במקרה בר-המימוש (Realizable). העובדה שגודל המדגם נקבע ע״י ה-VC dimension בלבד מדגימה כיצד ניתן ללמוד במרחבים רציפים אינסופיים ללא תלות במספר הנקודות במרחב.",
      },
      {
        id: "aml-q01-opt2",
        plainText:
          "כל מחלקת השערות אינסופית היא בהכרח בעלת ממד VC אינסופי ואינה ניתנת ללמידה.",
        isCorrect: false,
        explanation:
          "שגוי: חצאי-מרחבים ב-$\\mathbb{R}^d$ מהווים קבוצה אינסופית של פונקציות, אך ממד ה-VC שלהם הוא $d+1$ סופי לחלוטין ולכן הם ניתנים ללמידה.",
      },
      {
        id: "aml-q01-opt3",
        plainText:
          "ממד ה-VC שווה בדיוק למספר הפרמטרים החופשיים של המודל לכל ארכיטקטורה.",
        isCorrect: false,
        explanation:
          "שגוי: משפחת הפונקציות $f_\\alpha(x) = \\operatorname{sign}(\\sin(\\alpha x))$ מכילה פרמטר יחיד ($\\alpha$), אך ממד ה-VC שלה אינסופי לחלוטין; מספר פרמטרים אינו שווה ל-VC dimension.",
      },
      {
        id: "aml-q01-opt4",
        plainText:
          "למידת PAC דורשת שהאלגוריתם ישיג $0\\%$ שגיאת אימון בכל הרצה ללא שום הנחה על המדגם.",
        isCorrect: false,
        explanation:
          "שגוי: מודל PAC האגנוסטי (Agnostic PAC) מתיר שגיאה אמפירית חיובית ומבטיח התכנסות אל ההשערה האופטימלית במחלקה.",
      },
    ],
  },
  {
    id: "aml-q02-kernel-mercer-theorem-rkhs",
    domain: "שיטות גרעין (Kernel Methods), משפט מרסר ומרחבי RKHS",
    title: "למידת מכונה מתקדמת - שיטות גרעין (Kernel Methods), משפט מרסר ומרחבי RKHS",
    context:
      "פונקציה רציפה $K: \\mathcal{X} \\times \\mathcal{X} \\to \\mathbb{R}$ נקראת גרעין מרסר חוקי (Mercer Kernel). גרעין RBF גאוסי מוגדר כ-$K(x, z) = \\exp\\left(-\\frac{\\|x - z\\|^2}{2\\sigma^2}\\right)$.",
    formulaLatex:
      "\\sum_{i=1}^n \\sum_{j=1}^n c_i c_j K(x_i, x_j) \\ge 0 \\quad \\forall \\{x_i\\}_{i=1}^n, \\; \\forall c_i \\in \\mathbb{R}",
    instruction:
      "מהו התנאי המתמטי לפי משפט מרסר (Mercer's Theorem) לקיום מרחב תכונות הילברט (RKHS) שבו $K(x, z) = \\langle \\Phi(x), \\Phi(z) \\rangle$, ומהו ממד מרחב התכונות של גרעין RBF גאוסי?",
    options: [
      {
        id: "aml-q02-opt1",
        mathText:
          "K \\succeq 0 \\implies K(x, z) = \\langle \\Phi(x), \\Phi(z) \\rangle_{\\mathcal{H}}, \\quad \\dim(\\mathcal{H}_{RBF}) = \\infty",
        plainText:
          "מטריצת הגרם (Gram Matrix) חייבת להיות חיובית חצי-מוגדרת ($K \\succeq 0$) לכל קבוצת נקודות סופית; עבור גרעין RBF גאוסי, מרחב התכונות המרומז $\\Phi(x)$ הוא בעל ממד אינסופי.",
        isCorrect: true,
        explanation:
          "נכון: לפי משפט מרסר: פונקציה סימטרית $K(x, z) = K(z, x)$ מגדירה מכפלה פנימית במרחב הילברט של תכונות (Reproducing Kernel Hilbert Space - RKHS) אם ורק אם אופרטור האינטגרל המתאים לה הוא חיובי חצי-מוגדר, תנאי השקול לכך שמטריצת הגרם $G_{ij} = K(x_i, x_j)$ היא חיובית חצי-מוגדרת ($c^T G c \\ge 0$) לכל מדגם. עבור גרעין RBF גאוסי, פיתוח טור טיילור של האקספוננט מציג סכום אינסופי של מונומים: $e^{-\\|x-z\\|^2/2\\sigma^2} = e^{-\\|x\\|^2/2\\sigma^2} e^{-\\|z\\|^2/2\\sigma^2} \\sum_{k=0}^\\infty \\frac{(x^T z / \\sigma^2)^k}{k!}$. פיתוח זה מייצג מכפלה פנימית במרחב תכונות אינסוף-ממדי, מה שמאפשר ל-SVM עם גרעין גאוסי לבנות על-מישורי הפרדה ליניאריים במרחב בעל כושר ביטוי אינסופי.",
      },
      {
        id: "aml-q02-opt2",
        plainText:
          "הגרעין חייב להיות מטריצה סימטרית בעלת דטרמיננטה $1$, וממד מרחב RBF שווה למספר התצפיות במדגם ($n$).",
        isCorrect: false,
        explanation:
          "שגוי: דטרמיננטה $1$ אינה נדרשת כלל, וממד מרחב התכונות התאורטי של RBF הוא אינסופי ואינו תלוי בגודל המדגם.",
      },
      {
        id: "aml-q02-opt3",
        plainText:
          "מרחב התכונות של RBF הוא סופי וממדו $d^2$ (ריבוע מספר המשתנים).",
        isCorrect: false,
        explanation:
          "שגוי: מרחב תכונות ריבועי מתקבל מגרעין פולינומיאלי מדרגה $2$ ($(x^T z + c)^2$), בעוד RBF מכיל איברים מכל הדרגות $k \\to \\infty$.",
      },
      {
        id: "aml-q02-opt4",
        plainText:
          "משפט מרסר דורש שכל הערכים העצמיים של הגרעין יהיו שליליים.",
        isCorrect: false,
        explanation:
          "שגוי: חיוביות חצי-מוגדרת מחייבת שכל הערכים העצמיים יהיו אי-שליליים ($\\lambda_i \\ge 0$).",
      },
    ],
  },
  {
    id: "aml-q03-adaboost-exponential-loss-margin",
    domain: "שיטות Boosting, אלגוריתם AdaBoost והפסד אקספוננציאלי",
    title: "למידת מכונה מתקדמת - שיטות Boosting, אלגוריתם AdaBoost והפסד אקספוננציאלי",
    context:
      "באלגוריתם AdaBoost לסיווג בינארי $y_i \\in \\{-1, +1\\}$, משלבים מסווגים חלשים $h_t(x)$ עם משקולות $\\alpha_t = \\frac{1}{2}\\ln\\left(\\frac{1 - \\epsilon_t}{\\epsilon_t}\\right)$, וממזערים בהדרגה את פונקציית ההפסד האקספוננציאלי $L(F) = \\frac{1}{n}\\sum_{i=1}^n e^{-y_i F(x_i)}$.",
    formulaLatex:
      "F_T(x) = \\sum_{t=1}^T \\alpha_t h_t(x), \\quad \\frac{1}{n}\\sum_{i=1}^n \\mathbb{I}(y_i \\neq \\operatorname{sign}(F(x_i))) \\le \\frac{1}{n}\\sum_{i=1}^n e^{-y_i F(x_i)} \\le \\prod_{t=1}^T 2\\sqrt{\\epsilon_t(1 - \\epsilon_t)}",
    instruction:
      "מהו ההסבר התאורטי לכך ש-AdaBoost ממשיך לשפר את שגיאת המבחן (Generalization Error) ולהימנע מ-Overfitting גם זמן רב לאחר ששגיאת האימון כבר התאפסה לחלוטין ($0\\%$ Training Error)?",
    options: [
      {
        id: "aml-q03-opt1",
        plainText:
          "המשך האימון ממקסם את שולי הסיווג המנורמלים (Margins: $\\rho_i = \\frac{y_i F(x_i)}{\\sum |\\alpha_t|}$) של דוגמאות האימון ודוחף אותן הרחק מעל-מישור ההפרדה; לפי תאוריית המרווחים של שפייר (Schapire et al.), חסם שגיאת ההכללה תלוי ישירות בהתפלגות המרווחים ודועך ככל שהמרווחים גדלים.",
        isCorrect: true,
        explanation:
          "נכון: תופעה זו היוותה תעלומה בראשית ימי ה-Boosting: אלגוריתם AdaBoost המשיך לרוץ מאות איטרציות לאחר ששגיאת האימון הגיעה ל-$0$, ובאופן מפתיע שגיאת המבחן המשיכה לרדת. שפייר, פרוינד, ברטלט ולי מצאו את ההסבר באמצעות Margin Theory: גם כאשר כל הדוגמאות מסווגות נכון ($y_i F(x_i) > 0$), המשך האימון ממשיך להקטין את ההפסד האקספוננציאלי $\\sum e^{-y_i F(x_i)}$, מה שמאלץ את המרווח המנורמל של הדוגמאות הקשות ביותר ($y_i F(x_i) / \\sum \\alpha_t$) לגדול. גידול המרווחים הופך את הסיווג לחסין ועמיד בהרבה לרעשי בדיקה, וחסמי ה-Generalization המבוססים על מרווחים מסבירים את החסינות החריגה מ-Overfitting.",
      },
      {
        id: "aml-q03-opt2",
        plainText:
          "משום שהמשקולות $\\alpha_t$ מתאפסות כולן והמודל הופך למסווג ליניארי יחיד.",
        isCorrect: false,
        explanation:
          "שגוי: המשקולות $\\alpha_t$ חיוביות לכל מסווג חלש שטוב מניחוש אקראי ($\\epsilon_t < 0.5$) ואינן מתאפסות.",
      },
      {
        id: "aml-q03-opt3",
        plainText:
          "משום ש-AdaBoost מבצע בחירת תכונות לפי נורמת $L_1$ בלבד ומאפס $99\\%$ מהמשקלים.",
        isCorrect: false,
        explanation:
          "שגוי: AdaBoost מצרף מסווגים שלמים (למשל Decision Stumps) ואינו רגרסיית Lasso.",
      },
      {
        id: "aml-q03-opt4",
        plainText:
          "התופעה מתרחשת אך ורק אם שגיאת המסווג החלש עולה על $50\\%$ בכל איטרציה.",
        isCorrect: false,
        explanation:
          "שגוי: אם $\\epsilon_t \\ge 0.5$, האלגוריתם נעצר משום שהמסווג אינו עדיף על הטלת מטבע.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "aml-q04-em-algorithm-elbo-jensen-convergence",
    domain: "אלגוריתם תוחלת-מקסום (EM), חסם ELBO ואי-שוויון ינסן",
    title: "למידת מכונה מתקדמת - אלגוריתם תוחלת-מקסום (EM), חסם ELBO ואי-שוויון ינסן",
    context:
      "במודל משתנים חבויים (Latent Variable Model) עם נתונים נצפים $X$, משתנים חבויים $Z$, ופרמטרים $\\theta$, מעוניינים למקסם את הלוג-נראות $\\ln p(X \\mid \\theta) = \\sum_i \\ln \\sum_z p(x_i, z \\mid \\theta)$. מגדירים התפלגות עזר $q(Z)$.",
    formulaLatex:
      "\\ln p(X \\mid \\theta) = \\mathcal{L}(q, \\theta) + D_{KL}(q(Z) \\parallel p(Z \\mid X, \\theta)), \\quad \\mathcal{L}(q, \\theta) = \\mathbb{E}_q\\left[\\ln \\frac{p(X, Z \\mid \\theta)}{q(Z)}\\right]",
    instruction:
      "כיצד פועלים שלב ה-E (Expectation) ושלב ה-M (Maximization) ביחס לחסם ה-ELBO (Evidence Lower Bound) ולדיברגנס KL?",
    options: [
      {
        id: "aml-q04-opt1",
        plainText:
          "שלב ה-E מקבע את הפרמטרים ומגדיל את מרחק ה-KL לאינסוף; שלב ה-M מאפס את ה-ELBO.",
        isCorrect: false,
        explanation:
          "שגוי: שלב ה-E מאפס את מרחק ה-KL (ולא מגדיל אותו), ושלב ה-M ממקסם את ה-ELBO.",
      },
      {
        id: "aml-q04-opt2",
        plainText:
          "שלב ה-E מקבע את הפרמטרים $\\theta^{(t)}$ ובוחר $q(Z) = p(Z \\mid X, \\theta^{(t)})$, מה שמאפס את דיברגנס ה-KL ($D_{KL} = 0$) ומהדק את החסם $\\mathcal{L}(q, \\theta^{(t)}) = \\ln p(X \\mid \\theta^{(t)})$; שלב ה-M ממקסם את $\\mathcal{L}(q, \\theta)$ ביחס ל-$\\theta$ לקבלת $\\theta^{(t+1)}$, מה שמבטיח עליה מונוטונית של הנראות $\\ln p(X \\mid \\theta^{(t+1)}) \\ge \\ln p(X \\mid \\theta^{(t)})$.",
        isCorrect: true,
        explanation:
          "נכון: פירוק הלוג-נראות נשען על אי-שוויון ינסן: $\\ln p(X \\mid \\theta) = \\mathcal{L}(q, \\theta) + D_{KL}(q \\parallel p(Z|X, \\theta))$. מאחר שדיברגנס KL תמיד אי-שלילי ($D_{KL} \\ge 0$), ה-ELBO $\\mathcal{L}(q, \\theta)$ מהווה חסם תחתון על הנראות האמיתית. 1. שלב ה-E: מקבעים את $\\theta^{(t)}$ וממקסמים את $\\mathcal{L}$ ביחס ל-$q$. המקסימום מושג כאשר בוחרים את הפוסטריור המדויק $q(Z) = p(Z \\mid X, \\theta^{(t)})$, שבו $D_{KL} = 0$ והחסם נוגע בדיוק בפונקציית הנראות. 2. שלב ה-M: מקבעים את $q$ וממקסמים את ה-ELBO ביחס ל-$\\theta$: $\\theta^{(t+1)} = \\arg\\max_\\theta \\mathbb{E}_q[\\ln p(X, Z \\mid \\theta)]$. מכיוון שהחסם עלה בנקודה זו ודיברגנס KL חיובי, הנראות הכוללת מובטחת לא לרדת בכל איטרציה.",
      },
      {
        id: "aml-q04-opt3",
        plainText:
          "אלגוריתם EM מוצא תמיד את המקסימום הגלובלי המוחלט של הנראות ללא תלות באתחול.",
        isCorrect: false,
        explanation:
          "שגוי: הלוג-נראות של מודלי תערובות אינה קמורה ויש לה מקסימומים מקומיים רבים; אלגוריתם EM מתכנס לרוב לנקודה סטציונרית מקומית בלבד.",
      },
      {
        id: "aml-q04-opt4",
        plainText:
          "שלב ה-E משתמש בשיפוע יורד מקרי (SGD), ושלב ה-M פותר אלגוריתם גנטי.",
        isCorrect: false,
        explanation:
          "שגוי: EM פועל בחישוב תוחלת אנליטי ופתרון משוואות נראות במצב סגור (כגון ב-GMM).",
      },
    ],
  },
  {
    id: "aml-q05-policy-gradient-theorem-reinforce-baseline",
    domain: "למידת חיזוק (RL), משפט גרדיאנט המדיניות ו-REINFORCE",
    title: "למידת מכונה מתקדמת - למידת חיזוק (RL), משפט גרדיאנט המדיניות ו-REINFORCE",
    context:
      "בלמידת חיזוק מבוססת מדיניות עם פרמטרים $\\theta$, מטרת הסוכן היא למקסם את תוחלת התגמול המצטבר $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[R(\\tau)]$. לפי משפט גרדיאנט המדיניות (Policy Gradient Theorem):",
    formulaLatex:
      "\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta}\\left[ \\sum_{t=0}^T \\nabla_\\theta \\ln \\pi_\\theta(a_t \\mid s_t) \\left( G_t - b(s_t) \\right) \\right]",
    instruction:
      "מהו תפקידו של קו הבסיס (Baseline) $b(s_t)$, וכיצד הוא משפיע על התוחלת והשונות של אומד הגרדיאנט?",
    options: [
      {
        id: "aml-q05-opt1",
        plainText:
          "ה-Baseline מגדיל את התוחלת של הגרדיאנט כדי להאיץ את ההתכנסות של רשת ה-Actor.",
        isCorrect: false,
        explanation:
          "שגוי: ה-Baseline אינו משנה את התוחלת כלל (הוא שומר על אומד חסר הטיה).",
      },
      {
        id: "aml-q05-opt2",
        plainText:
          "ה-Baseline מקטין משמעותית את השונות (Variance) הגבוהה של דגימות מונטה-קרלו מבלי להכניס שום הטיה (Bias) לתוחלת הגרדיאנט, משום שמתקיים $\\mathbb{E}_{\\pi}[\\nabla_\\theta \\ln \\pi_\\theta(a_t \\mid s_t) b(s_t)] = 0$.",
        isCorrect: true,
        explanation:
          "נכון: באלגוריתם REINFORCE הבסיסי, תשואת המסלול $G_t$ סובלת משונות עצומה עקב אי-הוודאות ברצף הפעולות והתגמולים לאורך כל ה-Trajectory. הוספת פונקציית Baseline התלויה במצב בלבד ($b(s_t)$, לרוב פונקציית הערך $\\hat{V}(s_t)$ הנלמדת ע״י רשת Critic): $\\sum_a \\pi_\\theta(a|s) \\nabla_\\theta \\ln\\pi_\\theta(a|s) b(s) = b(s) \\sum_a \\nabla_\\theta \\pi_\\theta(a|s) = b(s) \\nabla_\\theta (1) = 0$. מכיוון שתוחלת האיבר היא אפס מדויק, הפחתת ה-Baseline אינה מכניסה שום הטיה באומדן הגרדיאנט (Unbiased). מאידך, ההפרש $G_t - V(s_t)$ (איבר היתרון - Advantage) ממורכז ובעל שונות קטנה בהרבה, מה שמייצב דרמטית את אלגוריתמי Actor-Critic.",
      },
      {
        id: "aml-q05-opt3",
        plainText:
          "ה-Baseline ממיר את הבעיה לתהליך תורים מסוג $M/M/1$ בעל הסתברות חסימה אפס.",
        isCorrect: false,
        explanation:
          "שגוי: אין קשר לתורת התורים; מדובר באלגוריתם אופטימיזציה סטוכסטית ב-RL.",
      },
      {
        id: "aml-q05-opt4",
        plainText:
          "ה-Baseline מאלץ את פונקציית המדיניות להיות דטרמיניסטית בכל מצב.",
        isCorrect: false,
        explanation:
          "שגוי: פונקציית המדיניות $\\pi_\\theta(a|s)$ נשארת סטוכסטית לחלוטין כדי לאפשר חקירה (Exploration).",
      },
    ],
  },
  {
    id: "aml-q06-variational-inference-mean-field-cavity",
    domain: "הסקה וריאציונית (Variational Inference) וקירוב Mean-Field",
    title: "למידת מכונה מתקדמת - הסקה וריאציונית (Variational Inference) וקירוב Mean-Field",
    context:
      "במודלים גרפיים הסתברותיים שבהם חישוב הפוסטריור המדויק $p(z \\mid x)$ אינו אפשרי חישובית (Intractable), מפעילים הסקה וריאציונית תחת קירוב השדה הממוצע (Mean-Field Approximation):",
    formulaLatex:
      "q(z) = \\prod_{j=1}^m q_j(z_j), \\quad \\ln q_j^*(z_j) = \\mathbb{E}_{i \\neq j}[\\ln p(x, z)] + \\text{const}",
    instruction:
      "מה מאפיין את התפלגות העזר $q(z)$ בקירוב Mean-Field, וכיצד מתבצע העדכון של כל גורם $q_j^*(z_j)$ (Coordinate Ascent Variational Inference - CAVI)?",
    options: [
      {
        id: "aml-q06-opt1",
        plainText:
          "ההתפלגות מניחה תלות קו-ליניארית מלאה בין כל המשתנים, והעדכון מתבצע באמצעות היפוך מטריצת קו-וריאנס בגודל $m \\times m$.",
        isCorrect: false,
        explanation:
          "שגוי: קירוב Mean-Field מבוסס בדיוק על ההנחה ההפוכה — פירוק למכפלה של משתנים בלתי-תלויים לחלוטין.",
      },
      {
        id: "aml-q06-opt2",
        plainText:
          "ההתפלגות הווריאציונית מניחה פירוק מלא למכפלת גורמים עצמאיים ($q(z) = \\prod q_j(z_j)$); והעדכון האופטימלי של כל רכיב $q_j^*(z_j)$ פרופורציוני לאקספוננט של תוחלת הלוג-נראות המשותפת $\\ln p(x, z)$ הממוצעת מעל כל שאר המשתנים החבויים $\\{z_i\\}_{i \\neq j}$.",
        isCorrect: true,
        explanation:
          "נכון: 1. קירוב Mean-Field (המושאל מפיזיקה סטטיסטית) מגביל את מרחב החיפוש של ההתפלגויות $q$ להתפלגויות פריקות לחלוטין ללא תלות הדדית: $q(z) = \\prod_{j=1}^m q_j(z_j)$. 2. מזעור $D_{KL}(q \\parallel p(z|x))$ שקול למקסום ה-ELBO. גזירה וריאציונית לפי הגורם הבודד $q_j(z_j)$ תוך קיבוע שאר הגורמים מראה שפתרון ה-Coordinate Ascent הוא: $q_j^*(z_j) \\propto \\exp\\left( \\mathbb{E}_{q_{-j}}[\\ln p(x, z_j, z_{-j})] \\right)$. כל משתנה חבוי $z_j$ רואה את יתר המשתנים דרך שדה ממוצע (תוחלת האנרגיה תחת ההתפלגויות הנוכחיות שלהם), מה שמאפשר אלגוריתם CAVI איטרטיבי המתכנס למינימום מקומי של דיברגנס KL.",
      },
      {
        id: "aml-q06-opt3",
        plainText:
          "ההסקה הווריאציונית ממקסמת את דיברגנס KL במקום למזער אותו כדי להגדיל את האנטרופיה.",
        isCorrect: false,
        explanation:
          "שגוי: המטרה היא התאמת $q$ ל-$p$, ולכן חובה למזער את דיברגנס ה-KL לכיוון אפס.",
      },
      {
        id: "aml-q06-opt4",
        plainText:
          "קירוב Mean-Field מדויק לחלוטין ומשחזר תמיד את פונקציית הפוסטריור האמיתית ללא שום שגיאת קירוב.",
        isCorrect: false,
        explanation:
          "שגוי: הנחת האי-תלות מבטלת מתאמים אמיתיים בין המשתנים, ולכן הקירוב נוטה להמעיט בשונות הפוסטריור (Underestimates variance).",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "aml-q07-gaussian-processes-regression-kernel-posterior",
    domain: "תהליכים גאוסיים (Gaussian Processes) לרגרסיה לא-פרמטרית",
    title: "למידת מכונה מתקדמת - תהליכים גאוסיים (Gaussian Processes) לרגרסיה לא-פרמטרית",
    context:
      "בתהליך גאוסי (GP) לרגרסיה, מגדירים פריור על פונקציות: $f(x) \\sim \\mathcal{GP}(0, k(x, x'))$. בהינתן נתוני אימון מורעשים $y = f(X) + \\epsilon$ (כאשר $\\epsilon \\sim \\mathcal{N}(0, \\sigma_n^2 I)$), מחשבים את התפלגות החיזוי בנקודת מבחן חדשה $x_*$.",
    formulaLatex:
      "f_* \\mid X, y, x_* \\sim \\mathcal{N}(\\bar{f}_*, \\operatorname{Var}(f_*)), \\quad \\bar{f}_* = k_*^T (K + \\sigma_n^2 I)^{-1} y",
    instruction:
      "מהו הביטוי לשונות התחזית (אי-הוודאות של המודל) $\\operatorname{Var}(f_*)$ בנקודה $x_*$, וממה היא מושפעת?",
    options: [
      {
        id: "aml-q07-opt1",
        plainText: "$\\operatorname{Var}(f_*) = 0$ תמיד בכל נקודת בדיקה.",
        isCorrect: false,
        explanation:
          "שגוי: תהליך גאוסי הוא מודל בייסיאני המספק אי-ודאות חיובית ומכוילת היטב בכל נקודה במרחב.",
      },
      {
        id: "aml-q07-opt2",
        plainText:
          "$\\operatorname{Var}(f_*) = k(x_*, x_*) + y^T K y$; השונות גדלה ככל שערך התגובה $y$ גבוה יותר.",
        isCorrect: false,
        explanation:
          "שגוי: במודל רגרסיה גאוסי, שונות הפוסטריור אינה תלויה בערכי התוויות הנצפות $y$ אלא רק בפיזור המרחבי של הדגימות $X$.",
      },
      {
        id: "aml-q07-opt3",
        mathText:
          "\\operatorname{Var}(f_*) = k(x_*, x_*) - k_*^T (K + \\sigma_n^2 I)^{-1} k_*",
        plainText:
          "$\\operatorname{Var}(f_*) = k(x_*, x_*) - k_*^T (K + \\sigma_n^2 I)^{-1} k_*$; השונות תלויה במיקום הגיאומטרי של נקודת המבחן ביחס לנתוני האימון $X$ (קטנה סמוך לדוגמאות אימון וגדלה לאי-ודאות הפריור באזורים נטולי מידע), ובלתי-תלויה בערכי התוויות $y$.",
        isCorrect: true,
        explanation:
          "נכון: לפי תכונות התפלגות גאוסית רב-ממדית מותנית: ההתפלגות המשותפת של $y$ ו-$f_*$ היא גאוסית בעלת בלוקים: $\\begin{pmatrix} y \\\\ f_* \\end{pmatrix} \\sim \\mathcal{N}\\left( \\mathbf{0}, \\begin{pmatrix} K + \\sigma_n^2 I & k_* \\\\ k_*^T & k(x_*, x_*) \\end{pmatrix} \\right)$. שונות הפוסטריור מתקבלת ישירות ממשלים שור (Schur Complement): $\\operatorname{Var}(f_*) = k(x_*, x_*) - k_*^T (K + \\sigma_n^2 I)^{-1} k_*$. 1. הביטוי תלוי במטריצת הגרעין בלבד ובמיקומי הדגימות $x_*$ ו-$X$, ואינו תלוי כלל בערכים הנמדדים $y$. 2. בקרבת דוגמאות אימון, הווקטור $k_*$ מתואם חזק ועמודותיו מקזזות את הפריור, כך שהשונות צונחת לאזור רעש המדידה $\\sigma_n^2$. באזורים מרוחקים שבהם אין דאטה, $k_* \\to 0$ והשונות חוזרת לאי-הוודאות הפריורית המלאה $k(x_*, x_*)$. תכונה זו הופכת תהליכים גאוסיים לבסיס של אופטימיזציה בייסיאנית (Bayesian Optimization).",
      },
      {
        id: "aml-q07-opt4",
        plainText: "השונות דורשת פתרון משוואת בלמן בעזרת אופרטור כיווץ.",
        isCorrect: false,
        explanation:
          "שגוי: משוואת בלמן שייכת ל-MDP ולמידת חיזוק, ולא לתהליכים גאוסיים.",
      },
    ],
  },
  {
    id: "aml-q08-semi-supervised-manifold-graph-laplacian",
    domain: "למידה מונחית-למחצה ולפלסיאן של גרף (Manifold Regularization)",
    title:
      "למידת מכונה מתקדמת - למידה מונחית-למחצה ולפלסיאן של גרף (Manifold Regularization)",
    context:
      "בלמידה מונחית-למחצה (Semi-Supervised Learning), נתונות מעט דוגמאות מתויגות $L$ והרבה דוגמאות בלתי-מתויגות $U$. בונים גרף שכנים עם מטריצת דמיון $W$ ומטריצת דרגות $D$. לפלסיאן הגרף מוגדר כ-$L_G = D - W$.",
    formulaLatex:
      "\\min_f \\sum_{i \\in L} \\mathcal{L}(f(x_i), y_i) + \\gamma_I \\mathbf{f}^T L_G \\mathbf{f} + \\gamma_A \\|f\\|_K^2, \\quad \\mathbf{f}^T L_G \\mathbf{f} = \\frac{1}{2}\\sum_{i,j} W_{ij}(f(x_i) - f(x_j))^2",
    instruction:
      "מה מייצג האיבר $\\mathbf{f}^T L_G \\mathbf{f}$ (הלפלסיאן של הגרף), וכיצד הוא רותם את הנתונים הבלתי-מתויגים?",
    options: [
      {
        id: "aml-q08-opt1",
        plainText: "הוא מחשב את מספר הרכיבים הקשירים בגרף ומבטל קשתות אקראיות.",
        isCorrect: false,
        explanation:
          "שגוי: הלפלסיאן משמש כרגולריזטור חלקות ולא כאלגוריתם ספירת רכיבים.",
      },
      {
        id: "aml-q08-opt2",
        plainText: "הוא מאלץ את המסווג לקבוע תחזית קבועה $0$ לכל הדוגמאות הלא-מתויגות.",
        isCorrect: false,
        explanation: "שגוי: המטרה היא להפיץ תוויות בצורה חלקה ולא לאפס את התחזית.",
      },
      {
        id: "aml-q08-opt3",
        plainText:
          "הוא מיישם את הנחת היריעה (Manifold Assumption / Smoothness): אם שני וקטורים $x_i, x_j$ קרובים זה לזה במרחב (משקל $W_{ij}$ גבוה), האיבר קונס בחומרה פער בין התחזיות שלהם $(f(x_i) - f(x_j))^2$, ובכך מאלץ את פונקציית הסיווג להשתנות בצורה חלקה לאורך הגאומטריה הפנימית של הנתונים הבלתי-מתויגים ולהעביר את גבול ההפרדה באזורי צפיפות נמוכה.",
        isCorrect: true,
        explanation:
          "נכון: זהו העיקרון המרכזי של Manifold Regularization (Belkin, Niyogi, Sindhwani, 2006). התבנית הריבועית של הלפלסיאן שווה במדויק לסכום המשוקלל: $\\mathbf{f}^T L_G \\mathbf{f} = \\frac{1}{2}\\sum_{i,j} W_{ij}(f_i - f_j)^2$. אם שתי נקודות סמוכות זו לזו על גבי היריעה (Manifold) שנחשפת ע״י מיליוני הדוגמאות הבלתי-מתויגות, המשקל $W_{ij}$ ביניהן גבוה. כל שינוי חד בתחזית ביניהן ייקנס בכבדות. הדבר מאלץ את פונקציית ההחלטה להיות חלקה לאורך ענני הנקודות הצפופים, ומנחה את גבול ההפרדה של המסווג לעבור באזורים דלילים שבהם אין נתונים (Cluster Assumption), תוך הפצת התוויות המועטות לאורך כל הגרף.",
      },
      {
        id: "aml-q08-opt4",
        plainText: "הוא גורם למטריצת המשקלים להפוך למטריצה מנוונת בשיטת SFINAE.",
        isCorrect: false,
        explanation:
          "שגוי: SFINAE שייך לקומפילציית תבניות ב-C++ ואינו קשור למודלים סטטיסטיים.",
      },
    ],
  },
  {
    id: "aml-q09-multi-armed-bandits-ucb1-regret",
    domain: "שודדים רב-זרועיים (Multi-Armed Bandits) ואלגוריתם UCB1",
    title: "למידת מכונה מתקדמת - שודדים רב-זרועיים (Multi-Armed Bandits) ואלגוריתם UCB1",
    context:
      "בבעיית Multi-Armed Bandit סטוכסטית עם $K$ זרועות, אלגוריתם UCB1 (Auer et al., 2002) בוחר בכל צעד $t$ את הזרוע הממקסמת את גבול הביטחון העליון:",
    formulaLatex:
      "I_t = \\arg\\max_{i=1,\\dots,K} \\left[ \\hat{\\mu}_i + \\sqrt{\\frac{2\\ln t}{T_i(t - 1)}} \\right]",
    instruction:
      "איזה עקרון יסוד מיישם אלגוריתם UCB1 לאיזון בין ניצול (Exploitation) לחקירה (Exploration), ומהו חסם החרטה המצטברת (Regret Bound) שלו?",
    options: [
      {
        id: "aml-q09-opt1",
        plainText:
          "הוא בוחר תמיד את הזרוע שנבדקה הכי מעט פעמים, והחרטה המצטברת גדלה ליניארית עם הזמן $O(T)$.",
        isCorrect: false,
        explanation:
          "שגוי: חרטה ליניארית $O(T)$ מעידה על אלגוריתם כושל שאינו לומד; UCB1 מאזן בין שני התחומים ומשיג חרטה תת-ליניארית.",
      },
      {
        id: "aml-q09-opt2",
        plainText: "הוא בוחר את הזרוע בעלת הממוצע הנוכחי הגבוה ביותר בלבד ללא שום חקירה.",
        isCorrect: false,
        explanation:
          "שגוי: זוהי גישה חמדנית טהורה (Greedy) הננעלת על זרועות תת-אופטימליות.",
      },
      {
        id: "aml-q09-opt3",
        plainText:
          "הוא מיישם את עקרון האופטימיות תחת אי-ודאות (Optimism in the Face of Uncertainty): האיבר הראשון $\\hat{\\mu}_i$ מנצל זרועות בעלות תגמול ממוצע גבוה, והאיבר השני $\\sqrt{\\frac{2\\ln t}{T_i}}$ מעודד חקירת זרועות שנדגמו מעט פעמים; והוא משיג חסם חרטה לוגריתמי אופטימלי $R(T) = O(\\ln T)$ התואם את החסם התחתון של לאי ורובינס.",
        isCorrect: true,
        explanation:
          "נכון: 1. עקרון Optimism in the Face of Uncertainty: האלגוריתם מעריך לכל זרוע חסם עליון סביר על התוחלת האמיתית שלה ברמת ביטחון גבוהה (לפי אי-שוויון צ׳רנוף-הופדינג). אם זרוע נדגמה מעט פעמים ($T_i$ קטן), אי-הוודאות גדולה, איבר הבונוס $\\sqrt{\\frac{2\\ln t}{T_i}}$ מזנק, והאלגוריתם נותן לה ליהנות מהספק וחוקר אותה. ככל שזרוע נדגמת יותר, איבר החקירה דועך, והבחירה נשלטת ע״י הממוצע הנצפה $\\hat{\\mu}_i$ (ניצול). 2. חסם החרטה (Regret): משפט לאי ורובינס (Lai & Robbins, 1985) הוכיח ששום אלגוריתם אינו יכול להשיג חרטה מצטברת טובה יותר מ-$\\Omega\\left(\\sum \\frac{\\ln T}{\\Delta_i}\\right)$. אלגוריתם UCB1 משיג במדויק חרטה של $O(\\ln T)$, מה שמוכיח שהוא אופטימלי אסימפטוטית.",
      },
      {
        id: "aml-q09-opt4",
        plainText:
          "האלגוריתם בוחר זרועות לפי חלוקת דיריכלה סטוכסטית בשיטת תומפסון בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: דגימה מהפוסטריור מאפיינת את Thompson Sampling (בייסיאני), בעוד UCB1 הוא אלגוריתם דטרמיניסטי-תדירותי מבוסס חסמים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "aml-q10-online-learning-ogd-no-regret-bound",
    domain: "למידה מקוונת (Online Learning) - שיפוע יורד מקוון (OGD)",
    title:
      "למידת מכונה מתקדמת - למידה מקוונת (Online Learning), שיפוע יורד מקוון (OGD) וחרטה תת-ליניארית",
    context:
      "במשחק למידה מקוונת קמורה (Online Convex Optimization - OCO), בכל צעד $t = 1, \\dots, T$ השחקן בוחר וקטור $w_t \\in \\mathcal{W}$ (כאשר קוטר הקבוצה חסום ע״י $D$), היריב חושף פונקציית הפסד קמורה $f_t(w)$ בעלת גרדיאנט חסום $\\|\\nabla f_t(w)\\| \\le G$, והשחקן משלם הפסד $f_t(w_t)$. החרטה מוגדרת כך:",
    formulaLatex:
      "\\text{Regret}_T = \\sum_{t=1}^T f_t(w_t) - \\min_{u \\in \\mathcal{W}} \\sum_{t=1}^T f_t(u), \\quad w_{t+1} = \\Pi_\\mathcal{W}(w_t - \\eta \\nabla f_t(w_t))",
    instruction:
      "מהו קצב הלמידה האופטימלי $\\eta$, ומהו חסם החרטה המובטח של אלגוריתם Online Gradient Descent (Zinkevich, 2003)?",
    options: [
      {
        id: "aml-q10-opt1",
        plainText:
          "קצב הלמידה הוא $\\eta = 1/T^2$, וחסם החרטה הוא ליניארי $\\text{Regret} = O(T)$.",
        isCorrect: false,
        explanation:
          "שגוי: חרטה $O(T)$ מעידה על אלגוריתם שאינו לומד (הממוצע לצעד אינו דועך לאפס).",
      },
      {
        id: "aml-q10-opt2",
        plainText:
          "קצב הלמידה חייב לשאוף לאינסוף, והחרטה חסומה ע״י $O(\\log T)$ לכל פונקציה קמורה כללית.",
        isCorrect: false,
        explanation:
          "שגוי: חרטה לוגריתמית אפשרית רק עבור פונקציות קמורות חזק (Strongly Convex); לפונקציות קמורות כלליות החסם הוא שורש הזמן.",
      },
      {
        id: "aml-q10-opt3",
        plainText: "לא ניתן להשיג חרטה תת-ליניארית תחת יריב אדברסרי משתנה בזמן.",
        isCorrect: false,
        explanation:
          "שגוי: כל יופיה של תורת הלמידה המקוונת הוא השגת חרטה תת-ליניארית מובטחת אפילו מול יריב אדברסרי אדפטיבי.",
      },
      {
        id: "aml-q10-opt4",
        mathText:
          "\\text{Regret}_T \\le \\frac{D^2}{2\\eta} + \\frac{\\eta G^2 T}{2} \\stackrel{\\eta^*}{\\implies} \\text{Regret}_T \\le D G \\sqrt{T}",
        plainText:
          "בבחירת קצב למידה אופטימלי $\\eta = \\frac{D}{G \\sqrt{T}}$, חסם החרטה של OGD הוא תת-ליניארי: $\\text{Regret}_T \\le D G \\sqrt{T} = O(\\sqrt{T})$, מה שמבטיח שקצב החרטה הממוצע לצעד דועך לאפס ($\\lim_{T \\to \\infty} \\frac{\\text{Regret}_T}{T} = 0$, אלגוריתם No-Regret).",
        isCorrect: true,
        explanation:
          "נכון: לפי ניתוח זינקביץ׳ (Zinkevich, 2003): מקמירות הפונקציות מתקיים $f_t(w_t) - f_t(u) \\le \\nabla f_t(w_t)^T(w_t - u)$. נסמן $g_t = \\nabla f_t(w_t)$. מניתוח המרחק האוקלידי לפתרון $u$: $\\|w_{t+1} - u\\|^2 = \\|\\Pi_\\mathcal{W}(w_t - \\eta g_t) - u\\|^2 \\le \\|w_t - \\eta g_t - u\\|^2 = \\|w_t - u\\|^2 - 2\\eta g_t^T(w_t - u) + \\eta^2 \\|g_t\\|^2$. סכימת הטור לאורך $T$ צעדים מניבה: $\\text{Regret}_T \\le \\frac{\\|w_1 - u\\|^2}{2\\eta} + \\frac{\\eta}{2}\\sum_{t=1}^T \\|g_t\\|^2 \\le \\frac{D^2}{2\\eta} + \\frac{\\eta G^2 T}{2}$. גזירה לפי $\\eta$ נותנת את הצעד האופטימלי $\\eta^* = \\frac{D}{G\\sqrt{T}}$, והצבה מניבה את החסם היסודי: $\\text{Regret}_T \\le DG\\sqrt{T}$. מאחר שהחרטה גדלה רק כ-$O(\\sqrt{T})$, ממוצע החרטה לצעד הוא $\\frac{\\text{Regret}_T}{T} \\le \\frac{DG}{\\sqrt{T}} \\to 0$. השחקן לומד להתחרות באסטרטגיה הסטטית האופטימלית הטובה ביותר במבט לאחור.",
      },
    ],
  },
  {
    id: "aml-q11-markov-random-fields-hammersley-clifford",
    domain: "שדות מרקוב אקראיים (MRF) ומשפט המרסלי-קליפורד",
    title:
      "למידת מכונה מתקדמת - שדות מרקוב אקראיים (MRF) ומשפט המרסלי-קליפורד",
    context:
      "במודל גרפי לא-מכוון (Markov Random Field - MRF / Gibbs Random Field) מעל גרף $G = (V, E)$, התפלגות ההסתברות המשותפת מקיימת תכונת אי-תלות מרקובית גלובלית: $X_A \\perp X_B \\mid X_C$ כאשר $C$ מפריד בין $A$ ל-$B$ בגרף.",
    formulaLatex:
      "P(X) = \\frac{1}{Z} \\prod_{c \\in \\mathcal{C}} \\psi_c(X_c) = \\frac{1}{Z} \\exp\\left( -\\sum_{c \\in \\mathcal{C}} E_c(X_c) \\right)",
    instruction:
      "מהו התנאי ההכרחי לפי משפט המרסלי-קליפורד (Hammersley-Clifford Theorem) לכך שההתפלגות $P(X)$ תתפרק באופן שקול כמכפלת פוטנציאלים מעל הקליקות המקסימליות (Maximal Cliques) של הגרף?",
    options: [
      {
        id: "aml-q11-opt1",
        plainText: "הגרף חייב להיות עץ נטול מעגלים (Tree Graph) בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: המשפט תקף לכל גרף כללי עם מעגלים (כולל רשתות סריג דו-ממדיות כמו מודל איזינג).",
      },
      {
        id: "aml-q11-opt2",
        plainText: "פונקציות הפוטנציאל $\\psi_c$ חייבות להיות ליניאריות לחלוטין.",
        isCorrect: false,
        explanation:
          "שגוי: פוטנציאלי קליקות יכולים להיות כל פונקציה חיובית שרירותית (בדרך כלל אקספוננט של אנרגיה).",
      },
      {
        id: "aml-q11-opt3",
        plainText: "מספר המשתנים בגרף חייב להיות זוגי.",
        isCorrect: false,
        explanation: "שגוי: אין שום מגבלה על זוגיות מספר הקודקודים.",
      },
      {
        id: "aml-q11-opt4",
        plainText:
          "ההתפלגות חייבת להיות חיובית ממש לכל קונפיגורציה אפשרית ($P(X = x) > 0$ לכל $x$, Positivity Assumption); ללא תנאי החיוביות, ייתכנו תלויות לוגיות דטרמיניסטיות (הסתברות $0$) המפרות את השקילות ומייצרות שדה מרקוב שאינו שדה גיבס.",
        isCorrect: true,
        explanation:
          "נכון: משפט המרסלי-קליפורד (1971) הוא משפט הליבה של מודלים גרפיים לא-מכוונים. הוא קובע כי התפלגות הסתברות מקיימת את תכונות מרקוב ביחס לגרף לא-מכוון $G$ אם ורק אם היא שדה גיבס המתפרק למכפלת פונקציות פוטנציאל חיוביות מעל הקליקות המקסימליות של הגרף: $P(x) = \\frac{1}{Z}\\prod_{c \\in \\mathcal{C}} \\psi_c(x_c)$. תנאי מוחלט לקיום המשפט הוא תנאי החיוביות החמורה (Positivity Condition): $P(x) > 0$ לכל קונפיגורציה $x$. Moussouris (1974) הראה שכאשר קיימות קונפיגורציות בעלות הסתברות $0$ (אילוצים דטרמיניסטיים מוחלטים), תכונות אי-תלות מקומיות אינן גוררות בהכרח פקטוריזציה מעל קליקות, וקיימות דוגמאות נגדיות של שדות מרקוב שאינם שדות גיבס.",
      },
    ],
  },
  {
    id: "aml-q12-self-supervised-infonce-contrastive-mutual-information",
    domain: "למידה ניגודית (Contrastive Learning) ופונקציית הפסד InfoNCE",
    title:
      "למידת מכונה מתקדמת - למידה ניגודית (Contrastive Learning) ופונקציית הפסד InfoNCE",
    context:
      "בלמידה ייצוגית מונחית-עצמית (Self-Supervised Learning, כגון SimCLR, MoCo, CPC), מאמנים רשת לקשר בין דוגמה חיובית $x^+$ (אוגמנטציה שונה של אותה תמונה $x$) לבין $K$ דוגמאות שליליות $x_k^-$ באמצעות פונקציית ההפסד InfoNCE עם טמפרטורה $\\tau$:",
    formulaLatex:
      "\\mathcal{L}_{\\text{InfoNCE}} = -\\mathbb{E}\\left[ \\ln \\frac{\\exp(\\operatorname{sim}(z, z^+) / \\tau)}{\\exp(\\operatorname{sim}(z, z^+) / \\tau) + \\sum_{k=1}^K \\exp(\\operatorname{sim}(z, z_k^-) / \\tau)} \\right]",
    instruction:
      "מה מבטאת פונקציית ההפסד InfoNCE מבחינת תורת המידע (Information Theory), ומה מתרחש ככל שמספר הדוגמאות השליליות $K$ גדל?",
    options: [
      {
        id: "aml-q12-opt1",
        plainText: "היא ממזערת את האנטרופיה של משקלי הרשת ומקטינה את מספר הפרמטרים.",
        isCorrect: false,
        explanation:
          "שגוי: InfoNCE פועלת על מרחב הווקטורים המיוצגים ($z$) ואינה משנה ארכיטקטורה.",
      },
      {
        id: "aml-q12-opt2",
        plainText:
          "היא שקולה במדויק לשגיאת ריבועים פחותים (MSE) מעל התמונות המקוריות.",
        isCorrect: false,
        explanation:
          "שגוי: זוהי פונקציית Cross-Entropy רב-מחלקתית על דמיון קוסינוס במרחב סמוי ולא שחזור פיקסלים.",
      },
      {
        id: "aml-q12-opt3",
        plainText: "ההפסד מתכנס תמיד לאפס כאשר הטמפרטורה $\\tau \\to \\infty$.",
        isCorrect: false,
        explanation:
          "שגוי: כאשר $\\tau \\to \\infty$, כל האקספוננטים הופכים ל-$1$ וההפסד שואף ל-$\\ln(1 + K) > 0$.",
      },
      {
        id: "aml-q12-opt4",
        plainText:
          "מזעור פונקציית ההפסד InfoNCE שקול למקסום חסם תחתון על המידע ההדדי (Mutual Information) בין שני מבטים של אותה דוגמה: $I(z; z^+) \\ge \\ln(K) - \\mathcal{L}_{\\text{InfoNCE}}$; ככל שמספר הדוגמאות השליליות $K$ גדל, החסם על המידע ההדדי נעשה הדוק וגבוה יותר ($I \\ge \\ln K$), מה שמאלץ את המודל ללמוד ייצוגים עשירים ואינפורמטיביים בהרבה.",
        isCorrect: true,
        explanation:
          "נכון: מאמר היסוד של ואן דן אורד (van den Oord et al., 2018, CPC): פונקציית InfoNCE מנוסחת כמסווג רב-מחלקתי (Softmax) שמטרתו לזהות את הדוגמה החיובית היחידה $z^+$ מבין $K$ דוגמאות שליליות אקראיות. הוכח מתמטית שמזעור $\\mathcal{L}_{\\text{InfoNCE}}$ ממקסם חסם תחתון וריאציוני על המידע ההדדי (Mutual Information) בין הייצוגים: $I(X; Y) \\ge \\ln(K+1) - \\mathcal{L}_{\\text{InfoNCE}}$. החסם העליון התיאורטי על המידע שהרשת יכולה לחלץ חסום ע״י $\\ln(K+1)$. אם $K$ קטן (למשל $K=1$), המודל יכול להשיג הפסד אפס מבלי ללמוד תכונות עמוקות. ככל שמאכילים את המודל ביותר דוגמאות שליליות (ב-MoCo וב-SimCLR משתמשים ב-$K = 4096$ עד $65536$), החסם $\\ln K$ מזנק, המשימה הופכת למאתגרת ביותר, והרשת נאלצת לחלץ תכונות סמנטיות מופשטות ברמה המשתווה או עולה על אימון מונחה (Supervised Pretraining).",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_ADVANCED_MACHINE_LEARNING_QUESTIONS =
  ADVANCED_MACHINE_LEARNING_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from PAC / kernels / AdaBoost (Q1–3, key A)
 * - 1 from EM / policy gradient / mean-field (Q4–6, key B)
 * - 1 from GP / SSL / bandits / OGD / MRF / InfoNCE (Q7–12, keys C–D)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleAdvancedMachineLearningOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = ADVANCED_MACHINE_LEARNING_QUESTIONS.slice(0, 3);
  const groupB = ADVANCED_MACHINE_LEARNING_QUESTIONS.slice(3, 6);
  const groupC = ADVANCED_MACHINE_LEARNING_QUESTIONS.slice(6, 12);

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
