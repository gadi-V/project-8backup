import { config as loadEnv } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

// Ensure .env is loaded even if the process was started without it
loadEnv({ path: resolve(process.cwd(), ".env") });

/** Used only when DATABASE_URL is unset (e.g. Vercel build without project secrets). */
const BUILD_FALLBACK_DATABASE_URL =
  "postgresql://dummy:dummy@localhost:5432/dummy";

function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL?.trim() || BUILD_FALLBACK_DATABASE_URL;
  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) {
    throw new Error(
      `DATABASE_URL must start with postgresql:// or postgres:// (got "${url.slice(0, 24)}..."). Check that .env has a newline between variables.`
    );
  }
  return url;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: { url: resolveDatabaseUrl() },
    },
  });
}

/**
 * Lazy Prisma accessor — client is constructed on first property access, not at
 * module import. Prisma does not open a TCP connection until a query runs, so
 * Next.js static/page-data collection can import this module during build
 * without a live database.
 */
function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
