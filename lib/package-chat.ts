import { prisma } from "./prisma";
import { PreLessonAssetType } from "@prisma/client";
import {
  createPackageStreamChannel,
  streamChannelIdForPackage,
} from "./stream";

export async function getOrCreatePackageChat(packageId: string) {
  let chat = await prisma.unifiedPackageChat.findUnique({
    where: { packageId },
    include: { preLessonAssets: true },
  });

  if (!chat) {
    chat = await prisma.unifiedPackageChat.create({
      data: {
        packageId,
        streamChannelId: streamChannelIdForPackage(packageId),
        isActive: true,
      },
      include: { preLessonAssets: true },
    });
  } else if (!chat.streamChannelId) {
    chat = await prisma.unifiedPackageChat.update({
      where: { id: chat.id },
      data: { streamChannelId: streamChannelIdForPackage(packageId) },
      include: { preLessonAssets: true },
    });
  }

  return chat;
}

/**
 * Resolve (or create) the UnifiedPackageChat Stream channel for a package
 * and ensure the given members are on the channel.
 * Returns the Stream channel id used for ClassroomChat.
 */
export async function ensureUnifiedPackageStreamChannel(
  packageId: string,
  memberIds: string[]
): Promise<string> {
  const chat = await getOrCreatePackageChat(packageId);

  const streamChannelId = await createPackageStreamChannel(
    packageId,
    memberIds
  );

  if (chat.streamChannelId !== streamChannelId) {
    await prisma.unifiedPackageChat.update({
      where: { id: chat.id },
      data: { streamChannelId },
    });
  }

  return streamChannelId;
}

/**
 * Prefer the package-scoped UnifiedPackageChat channel when the lesson
 * belongs to a package; otherwise fall back to the per-lesson ChatChannel.
 *
 * ChatChannel.streamChannelId is unique per row, so package lessons must
 * NOT duplicate the package Stream id into ChatChannel — resolve at read time.
 */
export async function resolveLessonStreamChannelId(lesson: {
  id: string;
  packageId: string | null;
  teacherId: string;
  studentId: string;
  chatChannel?: { streamChannelId: string } | null;
}): Promise<string | null> {
  if (lesson.packageId) {
    const managers = await prisma.user.findMany({
      where: { role: { in: ["MANAGER", "ADMIN"] } },
      select: { id: true },
    });
    const memberIds = [
      lesson.teacherId,
      lesson.studentId,
      ...managers.map((m) => m.id),
    ];
    return ensureUnifiedPackageStreamChannel(lesson.packageId, memberIds);
  }

  return lesson.chatChannel?.streamChannelId ?? null;
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
