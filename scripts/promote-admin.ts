/**
 * Promote an existing user to ADMIN by phone number.
 * Usage: npx tsx scripts/promote-admin.ts 0501234567
 */
import { PrismaClient } from "@prisma/client";

const phone = process.argv[2];

if (!phone) {
  console.error("Usage: npx tsx scripts/promote-admin.ts <phone>");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    console.error("User not found for that phone");
    process.exit(1);
  }

  await prisma.user.update({
    where: { phone },
    data: { role: "ADMIN", isApproved: true },
  });

  console.log(`OK: user promoted to ADMIN (${user.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
