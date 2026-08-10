import { cookies } from "next/headers";
import type { Role } from "@prisma/client";
import { SESSION_COOKIE, verifySession } from "./auth";
import { prisma } from "./prisma";

export type AuthUser = {
  id: string;
  name: string;
  role: Role;
  lessonCredits: number;
  isApproved: boolean;
};

export async function getSessionPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSessionPayload();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      role: true,
      lessonCredits: true,
      isApproved: true,
    },
  });
}
