export interface DiagnosticQuestion {
  id: string;
  topic: string;
  questionText: string;
  questionLatex?: string;
  options: {
    id: string;
    text: string;
    textLatex?: string;
    isCorrect: boolean;
    gapIndication?: string;
  }[];
}

/**
 * High-rigor Bagrut math bank — multi-step calculus, vectors, and complex numbers.
 * Used by onboarding challenge suite via bankToOnboardingQuestions.
 */
export const DIAGNOSTIC_MATH_BANK: Record<string, DiagnosticQuestion[]> = {
  math_581: [
    {
      id: "q1_calc_chain_extrema",
      topic: "חדו״א — נגזרת מורכבת ואופטימיזציה",
      questionText:
        "נתונה f(x) = e^{sin(x)} · cos(x). מהו f'(0)?",
      questionLatex:
        "f(x)=e^{\\sin x}\\cos x,\\quad f'(0)=?",
      options: [
        {
          id: "a",
          text: "1",
          textLatex: "1",
          isCorrect: true,
        },
        {
          id: "b",
          text: "0",
          textLatex: "0",
          isCorrect: false,
          gapIndication: "שכחת כלל מכפלה — רק נגזרת הגורם המעריכי",
        },
        {
          id: "c",
          text: "-1",
          textLatex: "-1",
          isCorrect: false,
          gapIndication: "סימן שגוי בנגזרת cos",
        },
        {
          id: "d",
          text: "e",
          textLatex: "e",
          isCorrect: false,
          gapIndication: "בלבול בין f(0) ל-f'(0)",
        },
      ],
    },
    {
      id: "q2_vectors_plane",
      topic: "וקטורים — מישור ומכפלה וקטורית",
      questionText:
        "נתונים הנקודות A(1,0,2), B(2,1,3), C(0,−1,1). מהו וקטור נורמל למישור ABC?",
      questionLatex:
        "\\overrightarrow{AB}=(1,1,1),\\; \\overrightarrow{AC}=(-1,-1,-1).\\quad \\vec{n}=\\overrightarrow{AB}\\times\\overrightarrow{AC}=?",
      options: [
        {
          id: "a",
          text: "n = (0,0,0) — הנקודות על ישר אחד",
          textLatex: "\\vec{n}=(0,0,0)\\;(\\text{collinear})",
          isCorrect: true,
        },
        {
          id: "b",
          text: "n = (1,−1,0)",
          textLatex: "\\vec{n}=(1,-1,0)",
          isCorrect: false,
          gapIndication: "חישוב שגוי של מכפלה וקטורית / התעלמות מתלות לינארית",
        },
        {
          id: "c",
          text: "n = (1,1,1)",
          textLatex: "\\vec{n}=(1,1,1)",
          isCorrect: false,
          gapIndication: "ערבוב בין וקטור כיוון לנורמל",
        },
        {
          id: "d",
          text: "n = (−1,1,0)",
          textLatex: "\\vec{n}=(-1,1,0)",
          isCorrect: false,
          gapIndication: "סימנים שגויים במכפלה הוקטורית",
        },
      ],
    },
    {
      id: "q3_complex_de_moivre",
      topic: "מספרים מרוכבים — דה-מואבר ושורשים",
      questionText:
        "נתון z = 2·cis(120°). מהו הסכום של כל שורשי הריבוע של z (במישור גאוס)?",
      questionLatex:
        "z = 2\\,\\mathrm{cis}(120^\\circ),\\quad w^2 = z.\\quad \\sum_{k=0}^{1} w_k = ?",
      options: [
        {
          id: "a",
          text: "0",
          textLatex: "0",
          isCorrect: true,
        },
        {
          id: "b",
          text: "2·cis(60°)",
          textLatex: "2\\,\\mathrm{cis}(60^\\circ)",
          isCorrect: false,
          gapIndication: "סכמת שורש אחד במקום סכום כל השורשים",
        },
        {
          id: "c",
          text: "√2 · cis(60°)",
          textLatex: "\\sqrt{2}\\,\\mathrm{cis}(60^\\circ)",
          isCorrect: false,
          gapIndication: "רדיוס שגוי + שכחת ששורשי היחידה מסתכמים לאפס",
        },
        {
          id: "d",
          text: "2",
          textLatex: "2",
          isCorrect: false,
          gapIndication: "בלבול בין מודולוס לסכום הווקטורים במישור",
        },
      ],
    },
  ],
};
