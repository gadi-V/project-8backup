import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic NLP / Language Processing diagnostic bank (12Q).
 * Display name: "עיבוד שפה טבעית (NLP)" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const NLP_LANGUAGE_PROCESSING_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "nlp-q01-tokenization-subword-bpe",
    domain: "טוקניזציה ותת-מילים (BPE / WordPiece)",
    title: "עיבוד שפה טבעית (NLP) - טוקניזציה ותת-מילים (BPE / WordPiece)",
    context:
      "לפני הזנת טקסט למודל שפה, מפרקים מחרוזת ליחידות דיסקרטיות (טוקנים) מתוך מילון סופי $V$. משווים בין טוקניזציה ברמת מילה שלמה, ברמת תו, וברמת תת-מילה (Subword) כגון Byte-Pair Encoding (BPE) או WordPiece.",
    formulaLatex:
      "x \\mapsto (t_1,\\dots,t_m),\\quad t_i \\in V,\\quad |V| \\ll |\\{\\text{word types}\\}|",
    instruction:
      "מדוע טוקניזציית Subword (למשל BPE) הפכה לסטנדרט במודלי שפה מודרניים, בהשוואה לפיצול למילים שלמות או לתווים בלבד?",
    options: [
      {
        id: "nlp-q01-opt1",
        plainText:
          "Subword מאזן בין מילון סופי לבין כיסוי של מילים נדירות/חדשות ע״י פירוק למרכיבים חוזרים; מקטין OOV, משמר מורפולוגיה חלקית, ושומר על $|V|$ סביר לאימון — בניגוד למילים שלמות (OOV גבוה) או לתווים בלבד (רצפים ארוכים מאוד).",
        isCorrect: true,
        explanation:
          "נכון: 1. כשל ברמת מילה: מילון של טיפוסי מילים שלמות מתנפח במהירות, וכל מילה שלא הופיעה באימון הופכת ל-$\\langle\\mathrm{unk}\\rangle$ (OOV). בשפות מורפולוגיות עשירות (עברית, טורקית, פינית) הבעיה חמורה במיוחד. 2. כשל ברמת תו: $|V|$ קטן, אך כל מילה מפורקת לרצף ארוך מאוד; המודל נאלץ ללמוד הרכבת מילים מאפס, והקשר האפקטיבי מתקצר. 3. BPE: מתחיל מתווים ולומד באופן איטרטיבי למזג את הזוגות השכיחים ביותר לקודים חדשים, עד הגעה לגודל מילון יעד. מילה נדירה מפורקת ליחידות מוכרות (למשל \"un\"+\"believ\"+\"able\"), כך שכמעט אין OOV, אורך הרצף נשאר סביר, וחלק מהמידע המורפולוגי נשמר בתת-היחידות.",
      },
      {
        id: "nlp-q01-opt2",
        plainText:
          "טוקניזציית מילים שלמות מבטלת לחלוטין את בעיית OOV ולכן עדיפה תמיד על BPE.",
        isCorrect: false,
        explanation:
          "שגוי: דווקא פיצול למילים שלמות סובל מ-OOV חמור על מילים, שמות פרטיים וצורות מורפולוגיות שלא הופיעו באימון.",
      },
      {
        id: "nlp-q01-opt3",
        plainText:
          "BPE דורש שמספר הטוקנים בכל משפט יהיה זהה לאורך האימון, אחרת המודל אינו מוגדר.",
        isCorrect: false,
        explanation:
          "שגוי: אורכי רצפים משתנים באופן טבעי; מטפלים בכך ב-padding/packing ובמסכות Attention, לא באילוץ אורך קבוע של BPE.",
      },
      {
        id: "nlp-q01-opt4",
        plainText:
          "טוקניזציה ברמת תו היא תמיד מהירה וסמנטית יותר כי $|V|=26$ באנגלית בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: ברמת תו הרצפים ארוכים מאוד והמודל נדרש ללמוד הרכבת מילים מאפס; גם אין הגבלה ל-$26$ תווים בטקסט רב-לשוני או ביוניקוד.",
      },
    ],
  },
  {
    id: "nlp-q02-tfidf-vector-space",
    domain: "ייצוג TF-IDF במרחב וקטורי",
    title: "עיבוד שפה טבעית (NLP) - ייצוג TF-IDF במרחב וקטורי",
    context:
      "במודל שק-מילים (Bag-of-Words), מסמך $d$ מיוצג ע״י משקלי TF-IDF מעל אוצר מונחים. תדירות המונח במסמך ותדירות המסמכים ההופכית באוסף $D$ משולבות למשקל סופי לכל מונח $t$.",
    formulaLatex:
      "\\mathrm{TF\\text{-}IDF}(t,d,D) = \\mathrm{TF}(t,d)\\times\\mathrm{IDF}(t,D),\\quad \\mathrm{IDF}(t,D)=\\ln\\frac{|D|}{|\\{d'\\in D : t\\in d'\\}|}",
    instruction:
      "כיצד רכיב ה-IDF מדכא מילות קישור נפוצות, ומה מגבלת הייצוג הסטטי של TF-IDF לעומת שיכונים הקשריים?",
    options: [
      {
        id: "nlp-q02-opt1",
        plainText:
          "מונחים המופיעים כמעט בכל המסמכים מקבלים $\\mathrm{IDF}\\approx\\ln(1)=0$ ולכן משקלם מתאפס; TF-IDF הוא ייצוג דליל וסטטי שאינו מבחין בין חושים שונים של אותה מילה בהקשרים שונים — בניגוד לשיכונים קונטקסטואליים.",
        isCorrect: true,
        explanation:
          "נכון: 1. דיכוי Stop Words: מילות קישור כמו \"של\", \"על\", \"the\" מופיעות כמעט בכל מסמך, ולכן $|\\{d' : t\\in d'\\}|\\approx|D|$. השבר בלוגריתם שואף ל-$1$ ו-$\\mathrm{IDF}\\approx 0$, כך שמשקלן ב-TF-IDF מתאפס אוטומטית. מונחים נדירים ודיסקרימינטיביים מקבלים IDF גבוה ומבליטים את נושא המסמך. 2. מגבלות הייצוג: אותו וקטור מילה זהה בכל הופעה (אין Word-Sense Disambiguation), סדר המילים אובד לחלוטין (Bag-of-Words), והייצוג דליל בממד $|V|$. לכן TF-IDF חזק כ-baseline לאחזור מידע ולסיווג טקסט קלאסי, אך מוגבל להבנת משמעות עמוקה בהשוואה לשיכונים קונטקסטואליים (BERT וכדומה).",
      },
      {
        id: "nlp-q02-opt2",
        plainText:
          "IDF מעניק משקל מקסימלי למילות Stop Words כי הן מופיעות בכל מסמך.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך — מילות קישור מקבלות IDF מזערי או אפסי בדיוק משום שהן מופיעות כמעט בכל המסמכים.",
      },
      {
        id: "nlp-q02-opt3",
        plainText:
          "TF-IDF מייצר בהכרח שיכון צפוף ב-$\\mathbb{R}^{768}$ הזהה ל-BERT.",
        isCorrect: false,
        explanation:
          "שגוי: TF-IDF הוא בדרך כלל וקטור דליל בממד $|V|$; BERT הוא מודל נוירונים עם ייצוגים צפופים ותלויי-הקשר.",
      },
      {
        id: "nlp-q02-opt4",
        plainText:
          "בנוסחת TF-IDF חובה להחליף את הלוגריתם ב-$\\sin$ כדי לשמור על נורמת יחידה.",
        isCorrect: false,
        explanation:
          "שגוי: אין דרישה כזו; נרמול (למשל לדמיון קוסינוס) נעשה בנפרד על הווקטורים במידת הצורך.",
      },
    ],
  },
  {
    id: "nlp-q03-ngram-language-model-probs",
    domain: "מודלי $n$-gram והסתברויות מותנות",
    title: "עיבוד שפה טבעית (NLP) - מודלי $n$-gram והסתברויות מותנות",
    context:
      "מודל שפה קלאסי מפרק את הסתברות המשפט לפי כלל השרשרת, ומקרב את ההיסטוריה המלאה ל-$n-1$ הטוקנים הקודמים בלבד (הנחת מרקוב).",
    formulaLatex:
      "P(w_1,\\dots,w_m)=\\prod_{i=1}^{m} P(w_i\\mid w_{1:i-1}) \\approx \\prod_{i=1}^{m} P(w_i\\mid w_{i-n+1:i-1})",
    instruction:
      "מהו הקירוב המרכזי במודל $n$-gram, ומה מחירו מבחינת דלילות סטטיסטית?",
    options: [
      {
        id: "nlp-q03-opt1",
        plainText:
          "מניחים תלות מארקובית מסדר $n-1$ בלבד; ככל ש-$n$ גדל הקירוב עשיר יותר אך ספירות $n$-gram נדירות מאוד (Data Sparsity), ולכן נדרשת החלקה (למשל Add-$k$, Kneser–Ney) כדי להימנע מהסתברויות אפס.",
        isCorrect: true,
        explanation:
          "נכון: 1. קירוב מרקוב: במקום להתנות על כל ההיסטוריה $w_{1:i-1}$, מתנים רק על חלון מקומי באורך $n-1$ (יוניגרם / ביגרם / טריגרם וכו'). 2. טרייד-אוף: $n$ גדול יותר לוכד הקשר עשיר יותר, אך מספר הצירופים האפשריים גדל כמו $|V|^n$, ורוב ה-$n$-grams לא נצפים כלל באימון. ללא החלקה, $P(w_i\\mid\\text{history})=0$ לכל צירוף חסר — והסתברות המשפט כולו מתאפסת. 3. החלקה (Add-$k$, Good–Turing, Kneser–Ney) מעבירה מסה הסתברותית מצירופים נצפים לנדירים/חסרים, וזו הייתה ליבת מודלי השפה הסטטיסטיים לפני עידן הרשתות.",
      },
      {
        id: "nlp-q03-opt2",
        plainText:
          "מודל $n$-gram מניח אי-תלות מלאה בין כל המילים, כלומר $P(w_i\\mid\\cdot)=P(w_i)$.",
        isCorrect: false,
        explanation:
          "שגוי: זו הנחת Unigram בלבד; $n$-gram מתנה במפורש על היסטוריה מקומית באורך $n-1$.",
      },
      {
        id: "nlp-q03-opt3",
        plainText:
          "ככל ש-$n$ גדל, מספר הפרמטרים קטן תמיד והספירות נעשות צפופות יותר.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת $n$ מרחיבה את מרחב הצירופים אקספוננציאלית ומחמירה את הדלילות.",
      },
      {
        id: "nlp-q03-opt4",
        plainText:
          "הסתברות $n$-gram מוגדרת רק עבור טקסטים באורך בדיוק $n$ ואינה חלה על משפטים ארוכים.",
        isCorrect: false,
        explanation:
          "שגוי: המשפט מפורק למכפלת הסתברויות מותנות לאורך כל העמדות $i=1,\\dots,m$, ללא הגבלה לאורך $n$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "nlp-q04-word2vec-embeddings",
    domain: "שיכוני Word2Vec (Embeddings)",
    title: "עיבוד שפה טבעית (NLP) - שיכוני Word2Vec (Embeddings)",
    context:
      "Word2Vec לומד שיכונים צפופים כך שמילים בהקשרים דומים קרובות במרחב הווקטורי. ב-Skip-gram מנבאים מילות הקשר ממילת מטרה; ב-CBOW הכיוון הפוך.",
    formulaLatex:
      "\\mathcal{L}_{\\mathrm{SG}}=\\sum_{t}\\sum_{c\\in\\mathrm{Ctx}(t)}\\log P(w_c\\mid w_t),\\quad P(w_c\\mid w_t)=\\frac{\\exp(v'_{w_c}{}^{\\!T} v_{w_t})}{\\sum_{w}\\exp(v'_w{}^{\\!T} v_{w_t})}",
    instruction:
      "מה לומד Word2Vec בפועל, ומה מגבלת השיכון הסטטי ביחס למשמעות תלוית-הקשר?",
    options: [
      {
        id: "nlp-q04-opt1",
        plainText:
          "Word2Vec בונה עץ תחביר מלא (Parse Tree) לכל משפט כפלט יחיד.",
        isCorrect: false,
        explanation:
          "שגוי: Word2Vec לומד וקטורי מילים (שיכונים) ולא מנתח תחביר מפורש.",
      },
      {
        id: "nlp-q04-opt2",
        plainText:
          "המודל לומד שיכונים סטטיים שבהם קרבה וקטורית משקפת דמיון התפלגותי (Distributional Hypothesis); עם זאת לכל טיפוס מילה יש וקטור יחיד — אין הבחנה בין חושים שונים (למשל bank), בניגוד לשיכונים קונטקסטואליים.",
        isCorrect: true,
        explanation:
          "נכון: 1. השערת ההתפלגות: \"מילים המופיעות בהקשרים דומים נוטות למשמעות דומה\". Word2Vec מממש זאת ע״י חיזוי הקשר (Skip-gram) או מילה מתוך הקשר (CBOW), כך שקרבה ב-$\\mathbb{R}^d$ משקפת דמיון סטטיסטי. 2. אנלוגיות ליניאריות כגון $\\vec{v}_{\\mathrm{king}}-\\vec{v}_{\\mathrm{man}}+\\vec{v}_{\\mathrm{woman}}\\approx\\vec{v}_{\\mathrm{queen}}$ נובעות ממבנה זה. 3. המגבלה הקלאסית: Lookup טבלה אחת — לכל טיפוס מילה וקטור יחיד, ללא תלות במשפט. לכן \"bank\" (בנק) ו-\"bank\" (גדה) חולקים אותו ייצוג. Negative Sampling מאפשר אימון יעיל על קורפוסים גדולים במקום Softmax מלא על $|V|$.",
      },
      {
        id: "nlp-q04-opt3",
        plainText:
          "Skip-gram ו-CBOW זהים מתמטית לכל היפר-פרמטר ומייצרים תמיד אותו שיכון.",
        isCorrect: false,
        explanation:
          "שגוי: כיוון החיזוי שונה והתנהגותם empirically שונה (Skip-gram לרוב חזק יותר למילים נדירות).",
      },
      {
        id: "nlp-q04-opt4",
        plainText:
          "Word2Vec דורש תוויות POS לכל מילה באימון, אחרת הגרדיאנט אינו מוגדר.",
        isCorrect: false,
        explanation:
          "שגוי: האימון הוא Self-supervised מטקסט גולמי ללא תוויות חיצוניות.",
      },
    ],
  },
  {
    id: "nlp-q05-self-attention-transformers",
    domain: "Self-Attention בטרנספורמרים",
    title: "עיבוד שפה טבעית (NLP) - Self-Attention בטרנספורמרים",
    context:
      "בשכבת Self-Attention של Transformer, כל מיקום ברצף מחשב צירוף משוקלל של ערכים (Values) לפי דמיון בין Queries ל-Keys. זו ליבת ארכיטקטורת Attention Is All You Need.",
    formulaLatex:
      "\\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\!\\left(\\frac{QK^{\\!T}}{\\sqrt{d_k}}\\right)V",
    instruction:
      "מה תפקיד החילוק ב-$\\sqrt{d_k}$, וכיצד Self-Attention מאפשר תלויות ארוכות טווח בהשוואה ל-RNN?",
    options: [
      {
        id: "nlp-q05-opt1",
        plainText:
          "החילוק ב-$\\sqrt{d_k}$ מבטל את ה-softmax לחלוטין ומחליף אותו ב-ReLU.",
        isCorrect: false,
        explanation:
          "שגוי: ה-softmax נשאר במלואו; הסקיילינג רק מייצב את סקאלת המכפלות הסקלריות לפני ה-softmax.",
      },
      {
        id: "nlp-q05-opt2",
        plainText:
          "כאשר $d_k$ גדול, מכפלות סקלריות גדלות בסדר גודל ודוחפות את ה-softmax לאזורים בעלי גרדיאנט זעיר; הסקיילינג מייצב אימון. בניגוד ל-RNN, כל זוג מיקומים מתקשר ב-$O(1)$ שכבות Attention (מסלול ישיר), במחיר סיבוכיות $O(m^2)$ באורך הרצף.",
        isCorrect: true,
        explanation:
          "נכון: 1. סקיילינג: אם רכיבי $Q$ ו-$K$ הם בערך בלתי-תלויים עם שונות $1$, אזי $\\mathrm{Var}(q\\cdot k)=d_k$. בלי חלוקה ב-$\\sqrt{d_k}$, ה-logits גדלים עם $d_k$, ה-softmax הופך ל\"חד\" (קרוב ל-one-hot), והגרדיאנטים דועכים. 2. טווח ארוך: ב-RNN מידע עובר צעד-אחר-צעד לאורך $m$ צעדים (מסלול באורך $O(m)$); ב-Self-Attention כל זוג טוקנים מחובר ישירות דרך מטריצת הקשב, במסלול באורך $O(1)$. 3. המחיר: חישוב וזיכרון $O(m^2 d)$ לרצף באורך $m$. Multi-Head Attention מפצל את $d_k$ לראשים מקבילים הלומדים סוגי קשרים שונים (תחביר, ליבה סמנטית, יישור וכו').",
      },
      {
        id: "nlp-q05-opt3",
        plainText:
          "Self-Attention מוגדר רק עבור רצפים באורך $m\\le 8$ ואינו ישים למשפטים ארוכים.",
        isCorrect: false,
        explanation:
          "שגוי: הוא ישים לרצפים ארוכים; האתגר הוא עלות ריבועית בזיכרון/חישוב, לא אי-הגדרה מתמטית.",
      },
      {
        id: "nlp-q05-opt4",
        plainText:
          "בנוסחה $V$ חייב להיות זהה ל-$Q$ תמיד, ו-$K$ חייב להיות מטריצת היחידה.",
        isCorrect: false,
        explanation:
          "שגוי: $Q,K,V$ הם השלכות נלמדות נפרדות של אותן כניסות (או וריאנטים קרובים), ואינם כפופים לאילוץ זה.",
      },
    ],
  },
  {
    id: "nlp-q06-perplexity-language-models",
    domain: "פרפלקסיטי (Perplexity) להערכת מודל שפה",
    title: "עיבוד שפה טבעית (NLP) - פרפלקסיטי (Perplexity) להערכת מודל שפה",
    context:
      "מעריכים מודל שפה על קורפוס מבחן $W=(w_1,\\dots,w_m)$ באמצעות Perplexity — מדד אי-הוודאות הממוצעת של המודל בחיזוי הטוקן הבא.",
    formulaLatex:
      "\\mathrm{PPL}(W)=P(w_1,\\dots,w_m)^{-1/m}=\\exp\\!\\left(-\\frac{1}{m}\\sum_{i=1}^{m}\\log P(w_i\\mid w_{<i})\\right)",
    instruction:
      "כיצד מפרשים Perplexity נמוכה יותר, ומה יש לשים לב בהשוואה בין מודלים?",
    options: [
      {
        id: "nlp-q06-opt1",
        plainText:
          "Perplexity גבוהה יותר תמיד אומרת שמודל השפה טוב יותר לסיכום מסמכים.",
        isCorrect: false,
        explanation:
          "שגוי: Perplexity נמוכה יותר מעידה על התאמה טובה יותר להתפלגות הטקסט (תחת אותו טוקנייזר ותחום).",
      },
      {
        id: "nlp-q06-opt2",
        plainText:
          "PPL הוא אקספוננט של ה-Cross-Entropy הממוצעת; ערך נמוך משמעו שהמודל מופתע פחות מהטקסט. השוואה הוגנת דורשת אותו טוקנייזר ואותו קורפוס — אחרת המספרים אינם ברי-השוואה.",
        isCorrect: true,
        explanation:
          "נכון: 1. קשר ל-Cross-Entropy: אם $H=-\\frac{1}{m}\\sum_i\\log P(w_i\\mid w_{<i})$ היא האנטרופיה הצולבת הממוצעת לטוקן, אזי $\\mathrm{PPL}=e^{H}$ (או $2^{H}$ לפי בסיס הלוג). ערך נמוך = המודל מקצה הסתברות גבוהה יותר לטוקנים האמיתיים. 2. פרשנות אינטואיטיבית: PPL≈$k$ שקול ל\"בלבול\" בין כ-$k$ אפשרויות בכל צעד. 3. השוואה הוגנת: שינוי טוקניזציה משנה את $m$ ואת מרחב האירועים; קורפוסים מתחומים שונים אינם בני-השוואה. בנוסף, PPL נמוך הוא אות חזק לאיכות LM Intrinsic, אך אינו מבטיח הצלחה בכל משימת Downstream (סיכום, תרגום, שאלות-תשובות).",
      },
      {
        id: "nlp-q06-opt3",
        plainText:
          "Perplexity מוגדרת רק עבור מסווגים בינאריים עם Accuracy מעל $90\\%$.",
        isCorrect: false,
        explanation:
          "שגוי: PPL שייך למודלי שפה הסתברותיים, לא לסיווג בינארי.",
      },
      {
        id: "nlp-q06-opt4",
        plainText:
          "בנוסחת PPL מחליפים את $\\exp$ ב-$\\max$ כדי לקבל ציון BLEU.",
        isCorrect: false,
        explanation:
          "שגוי: BLEU הוא מדד חפיפת $n$-gram לתרגום/ג׳נרציה; אינו זהה ל-Perplexity ואינו מתקבל מהחלפת $\\exp$.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "nlp-q07-neural-language-models",
    domain: "מודלי שפה נוירוניים",
    title: "עיבוד שפה טבעית (NLP) - מודלי שפה נוירוניים",
    context:
      "מעבר מטבלאות ספירה של $n$-gram למודלי שפה נוירוניים (NNLM / RNN-LM / Transformer-LM) מאפשר הכללה טובה יותר דרך שיכונים רציפים ופרמטרים משותפים.",
    formulaLatex:
      "P(w_i\\mid w_{<i})=\\mathrm{softmax}(W h_i + b),\\quad h_i = f_\\theta(w_{<i})",
    instruction:
      "מה היתרון המרכזי של מודל שפה נוירוני על פני טבלת ספירות $n$-gram?",
    options: [
      {
        id: "nlp-q07-opt1",
        plainText:
          "מודל נוירוני אוסר שימוש בשיכונים ושומר רק על ספירות גולמיות בטבלה.",
        isCorrect: false,
        explanation:
          "שגוי: השיכונים והפרמטרים המשותפים הם לב היתרון על פני ספירות דלילות.",
      },
      {
        id: "nlp-q07-opt2",
        plainText:
          "מודלי שפה נוירוניים אינם מפיקים התפלגות על המילון אלא רק תווית POS.",
        isCorrect: false,
        explanation:
          "שגוי: הם מפיקים התפלגות Softmax (או חלופה יעילה) מעל אוצר הטוקנים.",
      },
      {
        id: "nlp-q07-opt3",
        plainText:
          "ייצוגים רציפים ופרמטרים משותפים מאפשרים הכללה לצירופים שלא נראו (Smoothing מובנה), ולכידת תלויות ארוכות יותר מחלון $n$ קשיח — במיוחד ב-Transformer עם Self-Attention — במחיר אימון כבד יותר.",
        isCorrect: true,
        explanation:
          "נכון: 1. הכללה: במקום לאמוד ישירות $P(w_i\\mid w_{i-n+1:i-1})$ לכל צירוף נדיר בטבלה, המודל ממפה היסטוריות דומות ל-$h_i$ קרובים במרחב רציף ומכליל לצירופים שלא נראו (\"החלקה מובנית\"). 2. טווח הקשר: RNN/LSTM לוכדים היסטוריה ארוכה יותר מחלון $n$ קבוע; Transformer עם Self-Attention מאפשר תלויות גלובליות בתוך חלון הקונטקסט במקביליות גבוהה. 3. המחיר: אימון יקר יותר, רגישות להיפר-פרמטרים, וצורך בנתונים/חישוב רבים — אך זהו המעבר ההיסטורי מ-Bengio et al. ועד GPT.",
      },
      {
        id: "nlp-q07-opt4",
        plainText:
          "יתרונם היחיד הוא שהם קטנים יותר בזיכרון מכל מודל Unigram.",
        isCorrect: false,
        explanation:
          "שגוי: מודלי שפה נוירוניים מודרניים גדולים בהרבה מ-Unigram במספר פרמטרים ובזיכרון.",
      },
    ],
  },
  {
    id: "nlp-q08-f1-precision-recall",
    domain: "מדדי Precision, Recall ו-$F_1$",
    title: "עיבוד שפה טבעית (NLP) - מדדי Precision, Recall ו-$F_1$",
    context:
      "במשימות תיוג רצף וסיווג טקסט (למשל NER, זיהוי ספאם, סיווג סנטימנט), מדווחים לעיתים Precision ו-Recall ולא רק Accuracy — במיוחד כשיש אי-איזון מחלקות. הממוצע ההרמוני שלהם הוא מדד $F_1$.",
    formulaLatex:
      "P=\\frac{TP}{TP+FP},\\quad R=\\frac{TP}{TP+FN},\\quad F_1=\\frac{2PR}{P+R}",
    instruction:
      "מדוע $F_1$ עדיף על Accuracy במשימות NLP לא-מאוזנות, ומה משמעות הממוצע ההרמוני?",
    options: [
      {
        id: "nlp-q08-opt1",
        plainText:
          "$F_1$ זהה תמיד ל-Accuracy ולכן מיותר בכל משימת סיווג.",
        isCorrect: false,
        explanation:
          "שגוי: באי-איזון מחלקות Accuracy יכול להיות גבוה ע״י ניחוש המחלקה הרוב, בעוד Precision/Recall/$F_1$ חושפים כשל על המחלקה הנדירה.",
      },
      {
        id: "nlp-q08-opt2",
        plainText:
          "$F_1$ מתחשב רק ב-True Negatives ומתעלם לחלוטין מ-False Positives.",
        isCorrect: false,
        explanation:
          "שגוי: $F_1$ מבוסס על $P$ ו-$R$, שתלויים ב-$TP,FP,FN$; True Negatives אינם נכנסים ישירות לנוסחה.",
      },
      {
        id: "nlp-q08-opt3",
        plainText:
          "Accuracy מטעה כשהמחלקה החיובית נדירה (מודל שתמיד מנחש שלילי משיג Accuracy גבוה); $F_1$ הוא ממוצע הרמוני של Precision ו-Recall שמעניש חוסר-איזון ביניהם — ערך גבוה דורש גם דיוק וגם כיסוי של החיוביים.",
        isCorrect: true,
        explanation:
          "נכון: 1. מלכודת Accuracy: אם רק $1\\%$ מהטוקנים/המסמכים חיוביים, מסווג שתמיד פולט שלילי מגיע ל-$99\\%$ Accuracy אך $R=0$. 2. Precision מול Recall: $P$ גבוה = מעט אזעקות שווא; $R$ גבוה = מעט החמצות. לעיתים יש טרייד-אוף (סף החלטה). 3. ממוצע הרמוני: $F_1=\\frac{2PR}{P+R}$ קרוב יותר למינימום מאשר ממוצע חשבוני — אם אחד מהם נמוך מאוד, $F_1$ נפגע בחדות. לכן $F_1$ (ולעיתים Macro/Micro-$F_1$) הוא סטנדרט ב-NER, בחילוץ מידע ובסיווג לא-מאוזן.",
      },
      {
        id: "nlp-q08-opt4",
        plainText:
          "$F_1$ מוגדר רק עבור מודלי שפה ושווה תמיד ל-$1/\\mathrm{PPL}$.",
        isCorrect: false,
        explanation:
          "שגוי: $F_1$ הוא מדד סיווג/תיוג; Perplexity הוא מדד למודלי שפה — אין שוויון כזה.",
      },
    ],
  },
  {
    id: "nlp-q09-named-entity-recognition",
    domain: "זיהוי ישויות בשם (NER)",
    title: "עיבוד שפה טבעית (NLP) - זיהוי ישויות בשם (NER)",
    context:
      "במשימת Named Entity Recognition מזהים ישויות כמו Person, Organization, Location ברצף הטקסט ומסמנים את גבולותיהן בסכמת תיוג כגון BIO או BILOU.",
    formulaLatex:
      "\\text{BIO: } B\\text{-}\\mathrm{PER},\\; I\\text{-}\\mathrm{PER},\\; O,\\;\\dots",
    instruction:
      "מדוע סכמת BIO נחוצה, ומה מבדיל NER מסיווג מסמך רגיל?",
    options: [
      {
        id: "nlp-q09-opt1",
        plainText:
          "NER מחזיר רק הסתברות מולטינומית אחת לכל המסמך ללא תוויות לטוקנים.",
        isCorrect: false,
        explanation:
          "שגוי: NER הוא תיוג רצף ברמת טוקן/מרווח (span), לא סיווג מסמך יחיד.",
      },
      {
        id: "nlp-q09-opt2",
        plainText:
          "סכמת BIO מיועדת רק לדחיסת קבצים ואינה קשורה לגבולות ישויות.",
        isCorrect: false,
        explanation:
          "שגוי: BIO מקודדת התחלה (Begin) / המשך (Inside) / מחוץ לישות (Outside) עבור ישויות רב-טוקניות.",
      },
      {
        id: "nlp-q09-opt3",
        plainText:
          "NER הוא Sequence Labeling שצריך לזהות גם סוג ישות וגם גבולותיה; BIO מאפשר לייצג ישויות באורך משתנה. האתגרים כוללים ישויות נדירות, שמות פרטיים מחוץ ללקסיקון, ומדדי הערכה ברמת ישות (Precision/Recall/$F_1$ על spans) ולא רק Accuracy לטוקן.",
        isCorrect: true,
        explanation:
          "נכון: 1. מבנה המשימה: לכל טוקן תג; ישות רב-מילית (\"New York\") מיוצגת כ-$B\\text{-}\\mathrm{LOC}, I\\text{-}\\mathrm{LOC}$. 2. למה לא Accuracy לטוקן בלבד: מודל יכול לתייג נכון רוב תוויות $O$ אך לטעות בגבולות הישות — לכן מדווחים $F_1$ ברמת spans (התאמה מלאה של סוג+גבולות). 3. מודלים: קלאסית HMM/CRF; מודרנית Encoder קונטקסטואלי (BiLSTM/Transformer) עם ראש CRF או סיווג טוקנים. האתגרים כוללים ישויות נדירות, שמות פרטיים חדשים, ועמימות הקשרית.",
      },
      {
        id: "nlp-q09-opt4",
        plainText:
          "ב-NER אסור להשתמש בהקשר המשפט; רק בצורת המילה המבודדת.",
        isCorrect: false,
        explanation:
          "שגוי: ההקשר חיוני להבחנה בין ישות לבין מילה כללית ובין סוגי ישויות.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "nlp-q10-bleu-rouge-evaluation",
    domain: "מדדי BLEU ו-ROUGE",
    title: "עיבוד שפה טבעית (NLP) - מדדי BLEU ו-ROUGE",
    context:
      "בהערכת תרגום מכונה וסיכום אוטומטי משווים פלט מועמד לייחוס(ים) באמצעות חפיפת $n$-grams. BLEU מדגיש Precision עם Brevity Penalty; ROUGE מדגיש Recall (נפוץ בסיכום).",
    formulaLatex:
      "\\mathrm{BLEU}=\\mathrm{BP}\\cdot\\exp\\Big(\\sum_{n=1}^{N} w_n\\log p_n\\Big),\\quad \\mathrm{ROUGE}\\text{-}N=\\frac{\\sum \\#\\text{overlaps}}{\\sum \\#\\,n\\text{-grams in ref}}",
    instruction:
      "מה ההבדל התפיסתי בין BLEU ל-ROUGE, ומה מגבלתם המשותפת?",
    options: [
      {
        id: "nlp-q10-opt1",
        plainText:
          "BLEU ו-ROUGE זהים לחלוטין ומוגדרים רק עבור סיווג תמונות.",
        isCorrect: false,
        explanation:
          "שגוי: אלה מדדי טקסט ל-NLG (תרגום/סיכום); אינם זהים ואינם מיועדים למשימות ראייה.",
      },
      {
        id: "nlp-q10-opt2",
        plainText:
          "ROUGE בודק רק תקינות דקדוקית ע״י Parser מלא, ללא $n$-grams.",
        isCorrect: false,
        explanation:
          "שגוי: ROUGE מבוסס חפיפת יחידות עם ייחוס (לרוב $n$-grams או LCS), לא Parser מלא.",
      },
      {
        id: "nlp-q10-opt3",
        plainText:
          "BLEU מעניש רק על אורך יתר ואינו מתחשב בחפיפת $n$-grams כלל.",
        isCorrect: false,
        explanation:
          "שגוי: ליבת BLEU היא Precision של $n$-grams; Brevity Penalty מטפל בעיקר באורכים קצרים מדי.",
      },
      {
        id: "nlp-q10-opt4",
        plainText:
          "BLEU קרוב יותר ל-Precision משוקלל של $n$-grams עם עונש קיצור; ROUGE קרוב ל-Recall מול הייחוס ולכן נפוץ בסיכום. שניהם שטחיים סמנטית — ייתכן ניסוח נכון סמנטית עם חפיפה נמוכה — ולכן משלימים לעיתים במדדים סמנטיים/הערכה אנושית.",
        isCorrect: true,
        explanation:
          "נכון: 1. BLEU: ממוצע גאומטרי של Precision ל-$n$-grams (לרוב עד $4$) כפול BP שמונע תרגומים קצרים מדי ש\"מרמים\" Precision. 2. ROUGE: בסיכום חשוב לכסות את תוכן הייחוס, ולכן Recall של $n$-grams (או LCS ב-ROUGE-L) מתאים יותר. 3. מגבלה משותפת: Surface Overlap — פראפרזה נכונה סמנטית עלולה לקבל ציון נמוך; ניסוח שטחי דומה לייחוס עלול לקבל ציון גבוה. לכן במחקר מודרני משלימים ב-BERTScore, הערכה אנושית, ומדדי משימה ייעודיים.",
      },
    ],
  },
  {
    id: "nlp-q11-seq2seq-encoder-decoder",
    domain: "מודלי Seq2Seq (Encoder–Decoder)",
    title: "עיבוד שפה טבעית (NLP) - מודלי Seq2Seq (Encoder–Decoder)",
    context:
      "בארכיטקטורת Sequence-to-Sequence, Encoder ממפה רצף מקור לייצוגים; Decoder מייצר רצף יעד באופן אוטורגרסיבי. מנגנון Attention מאפשר לדיקודר להתמקד בחלקים רלוונטיים במקור בכל צעד.",
    formulaLatex:
      "h_t^{\\mathrm{enc}}=f_\\theta(x_t,h_{t-1}^{\\mathrm{enc}}),\\quad P(y_t\\mid y_{<t},x)=g_\\phi(y_{t-1},s_t,c_t)",
    instruction:
      "מה הבעיה ש-Attention פתר ב-Seq2Seq הקלאסי לתרגום מכונה?",
    options: [
      {
        id: "nlp-q11-opt1",
        plainText:
          "Attention מבטל את הצורך בדיקודר ומייצר את היעד מהמקור בלי פרמטרים.",
        isCorrect: false,
        explanation:
          "שגוי: Attention משלים את הדיקודר (בונה קונטקסט $c_t$) ואינו מחליף אותו כליל.",
      },
      {
        id: "nlp-q11-opt2",
        plainText:
          "Seq2Seq עם Attention מיועד רק לתוויות POS ואינו ישים לתרגום.",
        isCorrect: false,
        explanation:
          "שגוי: תרגום מכונה היה יישום הדגל של Seq2Seq+Attention (Bahdanau/Luong).",
      },
      {
        id: "nlp-q11-opt3",
        plainText:
          "הבעיה היחידה הייתה חוסר תמיכה בטוקניזציה, ו-Attention מוסיף BPE בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: BPE הוא עיבוד קדם נפרד; Attention פותר צוואר בקבוק של ייצוג מקור קבוע.",
      },
      {
        id: "nlp-q11-opt4",
        plainText:
          "ב-Seq2Seq ללא Attention כל המקור נדחס לווקטור הקשר יחיד (Information Bottleneck) שנחלש במשפטים ארוכים; Attention בונה קונטקסט $c_t$ דינמי כצירוף משוקלל של מצבי ה-Encoder, ומשפר יישור והעתקת מידע לאורך התרגום.",
        isCorrect: true,
        explanation:
          "נכון: 1. צוואר הבקבוק: ב-Seq2Seq המוקדם (Sutskever et al.) כל המשפט מקודד לווקטור קבוע יחיד; במשפטים ארוכים מידע הולך לאיבוד והדיקודר מתקשה. 2. Attention (Bahdanau): בכל צעד $t$ מחשבים משקלי יישור מול כל מצבי ה-Encoder ובונים $c_t=\\sum_i \\alpha_{ti} h_i^{\\mathrm{enc}}$ — קונטקסט רך ודינמי. 3. המשך: הטרנספורמר הכליל את הרעיון ל-Self-Attention מלא במקביל, אך עקרון Encoder–Decoder נותר מרכזי ב-MT, בסיכום מופשט ובמשימות Seq2Seq נוספות.",
      },
    ],
  },
  {
    id: "nlp-q12-contextual-vs-static-embeddings",
    domain: "שיכונים הקשריים מול סטטיים",
    title: "עיבוד שפה טבעית (NLP) - שיכונים הקשריים מול סטטיים",
    context:
      "משווים שיכונים סטטיים (Word2Vec/GloVe) לשיכונים קונטקסטואליים ממודלי שפה (ELMo/BERT/GPT): בסטטיים וקטור המילה קבוע; בקונטקסטואליים הווקטור תלוי בכל המשפט הסובב.",
    formulaLatex:
      "v_{\\mathrm{static}}(w)=e_w,\\quad v_{\\mathrm{ctx}}(w,x)=\\mathrm{Enc}_\\theta(w\\mid x)_{[\\mathrm{pos}(w)]}",
    instruction:
      "מה היתרון המרכזי של שיכונים קונטקסטואליים לטיפול בפוליסמיה ובהרכבת משמעות?",
    options: [
      {
        id: "nlp-q12-opt1",
        plainText:
          "שיכונים סטטיים תמיד עדיפים כי הם מייצרים וקטור שונה לכל הופעה של המילה.",
        isCorrect: false,
        explanation:
          "שגוי: דווקא סטטיים נותנים וקטור אחד לטיפוס מילה; קונטקסטואליים משתנים לפי ההופעה במשפט.",
      },
      {
        id: "nlp-q12-opt2",
        plainText:
          "שיכונים קונטקסטואליים אוסרים שימוש ב-Self-Attention ומתבססים רק על TF-IDF.",
        isCorrect: false,
        explanation:
          "שגוי: מודלים קונטקסטואליים מודרניים מבוססים במידה רבה על Self-Attention, לא על TF-IDF בלבד.",
      },
      {
        id: "nlp-q12-opt3",
        plainText:
          "אין הבדל ייצוגי: BERT ו-Word2Vec מפיקים תמיד אותו וקטור למילה \"bank\".",
        isCorrect: false,
        explanation:
          "שגוי: ב-BERT וקטור \"bank\" במשפט פיננסי שונה מזה שבמשפט על גדת נהר.",
      },
      {
        id: "nlp-q12-opt4",
        plainText:
          "שיכון קונטקסטואלי מחשב ייצוג תלוי-משפט ולכן מבדיל חושים שונים ומקודד תלויות תחביריות/סמנטיות עשירות; שיכון סטטי הוא Lookup קבוע — יעיל ופשוט, אך חלש בפוליסמיה ובהבנת הקשר ארוך.",
        isCorrect: true,
        explanation:
          "נכון: 1. סטטי: $e_w$ זהה בכל הופעה — ממוצע של כל החושים באימון; חלש בפוליסמיה. 2. קונטקסטואלי: Encoder (BiLM ב-ELMo; Transformer ב-BERT/GPT) בונה ייצוג כפונקציה של כל המשפט $x$, כך שאותה מחרוזת מקבלת וקטורים שונים בהקשרים שונים. 3. השלכות: שיפור דרמטי ב-NER, QA, NLI ועוד; המחיר הוא חישוב יקר יותר מ-Lookup. בפרקטיקה עדיין משתמשים בשיכונים סטטיים כ-baseline קל או במערכות מוגבלות משאבים.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_NLP_QUESTIONS = NLP_LANGUAGE_PROCESSING_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from tokenization / TF-IDF / n-grams (Q1–3, key A)
 * - 1 from Word2Vec / Self-Attention / Perplexity (Q4–6, key B)
 * - 1 from neural LMs / F1 / NER / BLEU-ROUGE / Seq2Seq / contextual embeddings (Q7–12, keys C–D)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleNlpOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = NLP_LANGUAGE_PROCESSING_QUESTIONS.slice(0, 3);
  const groupB = NLP_LANGUAGE_PROCESSING_QUESTIONS.slice(3, 6);
  const groupC = NLP_LANGUAGE_PROCESSING_QUESTIONS.slice(6, 12);

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
