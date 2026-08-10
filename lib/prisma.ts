import { config as loadEnv } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

// Ensure .env is loaded even if the process was started without it
loadEnv({ path: resolve(process.cwd(), ".env") });

function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env as postgresql://... and restart the server."
    );
  }
  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) {
    throw new Error(
      `DATABASE_URL must start with postgresql:// or postgres:// (got "${url.slice(0, 24)}..."). Check that .env has a newline between variables.`
    );
  }
  return url;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: resolveDatabaseUrl() },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
