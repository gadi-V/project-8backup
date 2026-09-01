import { prisma } from "./prisma";
import { VettingStatus } from "@prisma/client";

export interface TeacherSearchFilters {
  topic?: string;
  limit?: number;
  offset?: number;
}

export async function getApprovedTeachers(filters: TeacherSearchFilters = {}) {
  const { topic, limit = 20, offset = 0 } = filters;

  const teachers = await prisma.teacherProfile.findMany({
    where: {
      isApproved: true,
      vettingStatus: VettingStatus.APPROVED,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      lessons: {
        where: { status: "COMPLETED" },
        select: { id: true },
      },
    },
    take: limit,
    skip: offset,
    orderBy: { createdAt: "desc" },
  });

  if (topic) {
    return teachers.filter((teacher) => {
      const proficiencies = teacher.topicProficiencies;
      if (Array.isArray(proficiencies)) {
        return proficiencies.includes(topic);
      }
      return false;
    });
  }

  return teachers;
}
