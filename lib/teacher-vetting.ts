import { prisma } from "./prisma";
import {
  VettingStatus,
  VettingStepName,
  VettingStepStatus,
  TeacherVettingStage,
} from "@prisma/client";

export const VETTING_STEPS_ORDER: VettingStepName[] = [
  VettingStepName.REGISTRATION_AND_CV,
  VettingStepName.SCREENING_CALL,
  VettingStepName.TEACHING_SIMULATION,
  VettingStepName.EXAM_581,
  VettingStepName.FINAL_VIDEO_CALL,
  VettingStepName.FINAL_APPROVAL,
];

export async function getTeacherVettingProgress(teacherProfileId: string) {
  const profile = await prisma.teacherProfile.findUnique({
    where: { id: teacherProfileId },
    include: {
      user: {
        select: { id: true, name: true, email: true, phone: true },
      },
      vettingStepLogs: {
        orderBy: { stepNumber: "asc" },
      },
    },
  });

  if (!profile) return null;

  return {
    profile,
    steps: profile.vettingStepLogs,
    isComplete: profile.vettingStatus === VettingStatus.APPROVED,
  };
}

export async function updateVettingStep(data: {
  teacherProfileId: string;
  stepNumber: number;
  stepName: VettingStepName;
  status: VettingStepStatus;
  adminNotes?: string;
  evaluatedByAdminId?: string;
  bypassedByAdmin?: boolean;
}) {
  const {
    teacherProfileId,
    stepNumber,
    stepName,
    status,
    adminNotes,
    evaluatedByAdminId,
    bypassedByAdmin = false,
  } = data;

  const isFinished =
    status === VettingStepStatus.PASSED ||
    status === VettingStepStatus.SKIPPED;

  const stepLog = await prisma.vettingStepLog.upsert({
    where: {
      teacherProfileId_stepNumber: {
        teacherProfileId,
        stepNumber,
      },
    },
    create: {
      teacherProfileId,
      stepNumber,
      stepName,
      status,
      adminNotes,
      evaluatedByAdminId,
      bypassedByAdmin,
      completedAt: isFinished ? new Date() : null,
    },
    update: {
      status,
      adminNotes,
      evaluatedByAdminId,
      bypassedByAdmin,
      completedAt: isFinished ? new Date() : null,
    },
  });

  const allLogs = await prisma.vettingStepLog.findMany({
    where: { teacherProfileId },
  });

  const passedCount = allLogs.filter(
    (log) =>
      log.status === VettingStepStatus.PASSED ||
      log.status === VettingStepStatus.SKIPPED
  ).length;

  const isFullyApproved = passedCount === VETTING_STEPS_ORDER.length;

  let newStatus: VettingStatus = VettingStatus.IN_PROGRESS;;
  let newStage: TeacherVettingStage = TeacherVettingStage.SCREENING;;

  if (isFullyApproved) {
    newStatus = VettingStatus.APPROVED;;
    newStage = TeacherVettingStage.APPROVED;;
  } else if (status === VettingStepStatus.FAILED) {

    newStatus = VettingStatus.REJECTED;;
    newStage = TeacherVettingStage.REJECTED;;
  }

  await prisma.teacherProfile.update({
    where: { id: teacherProfileId },
    data: {
      vettingStatus: newStatus,
      vettingStage: newStage,
      isApproved: isFullyApproved,
    },
  });

  return stepLog;;
}
