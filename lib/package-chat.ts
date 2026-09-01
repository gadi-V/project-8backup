import { prisma } from "./prisma";
import { PreLessonAssetType } from "@prisma/client";

export async function getOrCreatePackageChat(packageId: string) {
  let chat = await prisma.unifiedPackageChat.findUnique({
    where: { packageId },
    include: { preLessonAssets: true },
  });

  if (!chat) {
    chat = await prisma.unifiedPackageChat.create({
      data: {
        packageId,
        streamChannelId: `package-${packageId}`,
        isActive: true,
      },
      include: { preLessonAssets: true },
    });
  }

  return chat;
}

export async function uploadPreLessonAsset(data: {
  packageId: string;
  lessonId?: string;
  assetType: PreLessonAssetType;
  assetUrl?: string;
  textContent?: string;
  uploadedById: string;
}) {
  const chat = await getOrCreatePackageChat(data.packageId);

  return await prisma.preLessonAsset.create({
    data: {
      packageId: data.packageId,
      lessonId: data.lessonId,
      chatId: chat.id,
      assetType: data.assetType,
      assetUrl: data.assetUrl,
      textContent: data.textContent,
      uploadedById: data.uploadedById,
    },
    include: {
      uploadedBy: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  });
}

export async function getPackagePedagogicalBrief(packageId: string) {
  return await prisma.package.findUnique({
    where: { id: packageId },
    include: {
      chat: true,
      preLessonAssets: {
        include: {
          uploadedBy: {
            select: { id: true, name: true, email: true },
          },
          lesson: true,
        },
        orderBy: { createdAt: "desc" },
      },
      lessons: {
        orderBy: { scheduledAt: "asc" },
      },
    },
  });
}
