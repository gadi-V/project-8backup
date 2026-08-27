import { prisma } from "./prisma";
import { Role } from "@prisma/client";

/**
 * Validates if a specific user is authorized to access a specific lesson.
 * @param lessonId - The ID of the lesson
 * @param userId - The ID of the current user
 * @param role - The role of the current user
 * @returns The lesson object if authorized, null otherwise
 */
export async function getAuthorizedLessonById(lessonId: string, userId: string, role: Role) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      teacher: { select: { id: true, name: true } },
      student: { select: { id: true, name: true } },
      chatChannel: true,
    },
  });

  if (!lesson) return null;

  if (role === "MANAGER" || role === "ADMIN") {
    return lesson;
  }

  if (role === "TEACHER" && lesson.teacherId === userId) {
    return lesson;
  }

  if (role === "STUDENT" && lesson.studentId === userId) {
    return lesson;
  }

  return null;
}
