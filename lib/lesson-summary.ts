import { prisma } from "./prisma";

export interface PostLessonSummaryInput {
  lessonId: string;
  teacherId: string;
  summaryText: string;
  homeworkAssigned?: string;
  resolvedGaps?: string[];
  remainingGaps?: string[];
  studentRating?: number;
}

export async function savePostLessonSummary(data: PostLessonSummaryInput) {
  const {
    lessonId,
    teacherId,
    summaryText,
    homeworkAssigned,
    resolvedGaps = [],
    remainingGaps = [],
    studentRating,
  } = data;

  return await prisma.$transaction(async (tx) => {
    const lesson = await tx.lesson.update({
      where: { id: lessonId },
      data: {
        status: "COMPLETED",
        pedagogicalBrief: summaryText,
      },
    });

    if (lesson.packageId && resolvedGaps.length > 0) {
      const activeQuizzes = await tx.diagnosticQuiz.findMany({
        where: { packageId: lesson.packageId },
      });

      for (const quiz of activeQuizzes) {
        if (quiz.identifiedGaps && quiz.identifiedGaps.length > 0) {
          const updatedGaps = quiz.identifiedGaps.filter(
            (gap) => !resolvedGaps.includes(gap)
          );
          await tx.diagnosticQuiz.update({
            where: { id: quiz.id },
            data: { identifiedGaps: updatedGaps },
          });
        }
      }
    }

    return {
      lesson,
      summaryText,
      homeworkAssigned,
      resolvedGaps,
      remainingGaps,
      studentRating,
    };
  });
}

export async function getLessonPedagogicalHistory(packageId: string) {
  return await prisma.lesson.findMany({
    where: {
      packageId,
      status: "COMPLETED",
    },
    select: {
      id: true,
      scheduledAt: true,
      pedagogicalBrief: true,
      teacher: {
        select: {
          id: true,
          user: { select: { name: true, email: true } },
        },
      },
    },
    orderBy: { scheduledAt: "desc" },
  });
}
