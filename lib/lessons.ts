import { prisma } from "./prisma";
import { Role } from "@prisma/client";

/**
 * Fetches lessons that a user is authorized to see based on their role.
 * - MANAGER or ADMIN: sees all lessons.
 * - TEACHER: sees lessons where they are the teacher.
 * - STUDENT: sees lessons where they are the student.
 * 
 * @param userId - The ID of the current user
 * @param role - The role of the current user
 * @returns An array of authorized lessons
 */
export async function getAuthorizedLessons(userId: string, role: Role) {
  if (role === "MANAGER" || role === "ADMIN") {
    return prisma.lesson.findMany({
      include: {
        teacher: { select: { id: true, name: true } },
        student: { select: { id: true, name: true } },
        chatChannel: true,
      },
      orderBy: { scheduledAt: "asc" },
    });
  }

  if (role === "TEACHER") {
    return prisma.lesson.findMany({
      where: { teacherId: userId },
      include: {
        student: { select: { id: true, name: true } },
        chatChannel: true,
      },
      orderBy: { scheduledAt: "asc" },
    });
  }

  if (role === "STUDENT") {
    return prisma.lesson.findMany({
      where: { studentId: userId },
      include: {
        teacher: { select: { id: true, name: true, teacherProfile: true } },
        chatChannel: true,
      },
      orderBy: { scheduledAt: "asc" },
    });
  }

  return [];
}

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
