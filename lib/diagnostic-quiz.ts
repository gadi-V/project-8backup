import { prisma } from "./prisma";

export interface QuizSubmissionData {
  packageId: string;
  studentId: string;
  topic: string;
  score: number;
  totalQuestions: number;
  answersSummary?: Record<string, unknown>;
  identifiedGaps?: string[];
}

export async function submitDiagnosticQuiz(data: QuizSubmissionData) {
  const {
    packageId,
    studentId,
    topic,
    score,
    totalQuestions,
    answersSummary = {},
    identifiedGaps = [],
  } = data;

  const quiz = await prisma.diagnosticQuiz.create({
    data: {
      packageId,
      studentId,
      subject: topic,
      ageGroup: "GENERAL",
      challenge: topic,
      topic: topic,
      score,
      totalQuestions,
      answersSummary: JSON.stringify(answersSummary),
      identifiedGaps,
    },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return quiz;
}

export async function getPackageDiagnosticSummary(packageId: string) {
  const quizzes = await prisma.diagnosticQuiz.findMany({
    where: { packageId },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const scored = quizzes.filter(
    (q) => q.score !== null && q.totalQuestions !== null && q.totalQuestions > 0
  ) as Array<(typeof quizzes)[number] & { score: number; totalQuestions: number }>;

  const totalQuizzes = quizzes.length;
  const averageScore =
    scored.length > 0
      ? Math.round(
          scored.reduce((acc, q) => acc + (q.score / q.totalQuestions) * 100, 0) /
            scored.length
        )
      : 0;

  const allGaps = Array.from(
    new Set(quizzes.flatMap((q) => q.identifiedGaps || []))
  );

  return {
    packageId,
    totalQuizzes,
    averageScore,
    identifiedGaps: allGaps,
    quizzes,
  };
}
