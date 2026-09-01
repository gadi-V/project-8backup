import "dotenv/config";
import { PrismaClient, Role, VettingStepName, VettingStepStatus, PayoutType, PreLessonAssetType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const teacherUser = await prisma.user.upsert({
    where: { email: "vetting-teacher@demo.com" },
    update: {},
    create: {
      email: "vetting-teacher@demo.com",
      name: "Demo Vetting Teacher",
      phone: "0501234567",
      password: passwordHash,
      role: Role.TEACHER,
      isApproved: false,
    },
  });

  const profile = await prisma.teacherProfile.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: {
      userId: teacherUser.id,
      subjects: ["Math", "Physics"],
      ageGroups: ["high-school", "academic"],
      bio: "Demo teacher going through the vetting funnel",
      cvUrl: "https://example.com/cv.pdf",
      topicProficiencies: { algebra: 0.8, calculus: 0.6 },
      vettingStatus: "IN_PROGRESS",
      vettingStage: "SCREENING",
      payoutType: PayoutType.SLIP,
      isApproved: false,
    },
  });

  const stepDefs: Array<{ stepNumber: number; stepName: VettingStepName; status: VettingStepStatus }> = [
    { stepNumber: 1, stepName: VettingStepName.REGISTRATION_AND_CV, status: VettingStepStatus.PASSED },
    { stepNumber: 2, stepName: VettingStepName.SCREENING_CALL, status: VettingStepStatus.PASSED },
    { stepNumber: 3, stepName: VettingStepName.TEACHING_SIMULATION, status: VettingStepStatus.PENDING },
    { stepNumber: 4, stepName: VettingStepName.EXAM_581, status: VettingStepStatus.PENDING },
    { stepNumber: 5, stepName: VettingStepName.FINAL_VIDEO_CALL, status: VettingStepStatus.PENDING },
    { stepNumber: 6, stepName: VettingStepName.FINAL_APPROVAL, status: VettingStepStatus.PENDING },
  ];

  for (const def of stepDefs) {
    await prisma.vettingStepLog.upsert({
      where: {
        teacherProfileId_stepNumber: {
          teacherProfileId: profile.id,
          stepNumber: def.stepNumber,
        },
      },
      update: {},
      create: {
        teacherProfileId: profile.id,
        stepNumber: def.stepNumber,
        stepName: def.stepName,
        status: def.status,
        completedAt: def.status === VettingStepStatus.PASSED ? new Date() : null,
      },
    });
  }

  const pkg = await prisma.package.upsert({
    where: { code: "DEMO_VETTING_PKG" },
    update: {},
    create: {
      code: "DEMO_VETTING_PKG",
      name: "Demo Vetting Package",
      credits: 5,
      priceIls: 900,
    },
  });

  const chat = await prisma.unifiedPackageChat.upsert({
    where: { packageId: pkg.id },
    update: {},
    create: {
      packageId: pkg.id,
      streamChannelId: `package-${pkg.id}`,
      isActive: true,
    },
  });

  const asset = await prisma.preLessonAsset.create({
    data: {
      packageId: pkg.id,
      chatId: chat.id,
      assetType: PreLessonAssetType.TEXT_NOTE,
      textContent: "Please review quadratic equations and derivative basics before the lesson.",
      uploadedById: teacherUser.id,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "demo-student@demo.com" },
    update: {},
    create: {
      email: "demo-student@demo.com",
      name: "Demo Student",
      phone: "0507654321",
      password: passwordHash,
      role: Role.STUDENT,
      lessonCredits: 5,
    },
  });

  const lesson = await prisma.lesson.create({
    data: {
      packageId: pkg.id,
      studentId: student.id,
      teacherId: teacherUser.id,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "SCHEDULED",
      durationMinutes: 50,
    },
  });

  console.log("=== Seed complete ===");
  console.log("Teacher profile id:", profile.id);
  console.log("Package id:", pkg.id);
  console.log("Unified chat id:", chat.id);
  console.log("PreLessonAsset id:", asset.id);
  console.log("Lesson id:", lesson.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
