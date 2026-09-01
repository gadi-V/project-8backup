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

export const DIAGNOSTIC_MATH_BANK: Record<string, DiagnosticQuestion[]> = {
  math_581: [
    {
      id: "q1_diff",
      topic: "Differential calculus",
      questionText: "What is the derivative of the function below?",
      questionLatex: "f(x) = x \\cdot \\sin(x)",
      options: [
        {
          id: "a",
          text: "Sum rule + product",
          textLatex: "f'(x) = \\sin(x) + x\\cos(x)",
          isCorrect: true,
        },
        {
          id: "b",
          text: "Cosine only",
          textLatex: "f'(x) = \\cos(x)",
          isCorrect: false,
          gapIndication: "Product rule ignored",
        },
        {
          id: "c",
          text: "Sign error",
          textLatex: "f'(x) = \\sin(x) - x\\cos(x)",
          isCorrect: false,
          gapIndication: "Sign error in trig derivatives",
        },
        {
          id: "d",
          text: "Second term only",
          textLatex: "f'(x) = x\\cos(x)",
          isCorrect: false,
          gapIndication: "Partial differentiation, missing first term",
        },
      ],
    },
    {
      id: "q2_geom",
      topic: "Geometry and proportion",
      questionText: "In a right triangle the hypotenuse is 10 and one angle is 30 degrees. What is the length of the opposite leg?",
      options: [
        { id: "a", text: "5", textLatex: "5", isCorrect: true },
        {
          id: "b",
          text: "5*sqrt(3)",
          textLatex: "5\\sqrt{3}",
          isCorrect: false,
          gapIndication: "Confusion between opposite and adjacent leg in 30-60-90",
        },
        {
          id: "c",
          text: "10*sqrt(3)",
          textLatex: "10\\sqrt{3}",
          isCorrect: false,
          gapIndication: "No mastery of the 30-60-90 theorem",
        },
        { id: "d", text: "2.5", textLatex: "2.5", isCorrect: false, gapIndication: "Basic calculation error in trigonometry" },
      ],
    },
    {
      id: "q3_seq",
      topic: "Sequences",
      questionText: "In an arithmetic sequence the first term is 3 and the common difference is 4. What is the 10th term a10?",
      options: [
        { id: "a", text: "39", textLatex: "39", isCorrect: true },
        {
          id: "b",
          text: "43",
          textLatex: "43",
          isCorrect: false,
          gapIndication: "Used n instead of (n-1) in the general term formula",
        },
        {
          id: "c",
          text: "40",
          textLatex: "40",
          isCorrect: false,
          gapIndication: "No mastery of the an formula in arithmetic sequences",
        },
        {
          id: "d",
          text: "36",
          textLatex: "36",
          isCorrect: false,
          gapIndication: "Omitted the first term a1",
        },
      ],
    },
  ],
};
