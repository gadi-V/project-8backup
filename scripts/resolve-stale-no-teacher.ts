/**
 * Day-0 data maintenance — resolve stale NO_TEACHER_ASSIGNED anomalies.
 *
 * Mirrors the Head-of-Desk risk surface (2h completed payments without
 * unlock / referral / upcoming lesson). For each hit, assigns an approved
 * teacher via TeacherReferral (non-destructive, additive only).
 *
 * Run: npx tsx scripts/resolve-stale-no-teacher.ts
 * Exit: 0 when all anomalies cleared (or none found).
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Anomaly = { paymentId: string; studentId: string; packageType: string };

async function findAnomalies(): Promise<Anomaly[]> {
  const since = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const recentPayments = await prisma.payment.findMany({
    where: { createdAt: { gte: since }, status: "COMPLETED" },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const hits: Anomaly[] = [];
  for (const payment of recentPayments) {
    const [unlocked, referral, upcoming] = await Promise.all([
      prisma.diagnosticQuiz.findFirst({
        where: { studentId: payment.studentId, isUnlocked: true },
        select: { id: true },
      }),
      prisma.teacherReferral.findFirst({
        where: { studentId: payment.studentId },
        select: { id: true },
      }),
      prisma.lesson.findFirst({
        where: {
          studentId: payment.studentId,
          status: { in: ["SCHEDULED", "IN_PROGRESS"] },
        },
        select: { id: true },
      }),
    ]);
    if (!unlocked && !referral && !upcoming) {
      hits.push({
        paymentId: payment.id,
        studentId: payment.studentId,
        packageType: payment.packageType,
      });
    }
  }
  return hits;
}

async function pickApprovedTeacher(): Promise<string | null> {
  const profile = await prisma.teacherProfile.findFirst({
    where: { vettingStage: "APPROVED" },
    orderBy: { lastReferralAt: "asc" },
    select: { userId: true },
  });
  return profile?.userId ?? null;
}

async function resolveOne(anomaly: Anomaly, teacherId: string): Promise<boolean> {
  const existing = await prisma.teacherReferral.findFirst({
    where: { studentId: anomaly.studentId },
  });
  if (existing) return true;

  const diagnostic = await prisma.diagnosticQuiz.findFirst({
    where: { studentId: anomaly.studentId },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  await prisma.teacherReferral.create({
    data: {
      teacherId,
      studentId: anomaly.studentId,
      diagnosticId: diagnostic?.id ?? null,
      matchScore: 0,
      reason: "day0-maintenance-no-teacher-resolved",
    },
  });

  await prisma.teacherProfile.update({
    where: { userId: teacherId },
    data: {
      referralCount: { increment: 1 },
      lastReferralAt: new Date(),
    },
  });

  return true;
}

async function main() {
  console.log("=== Resolve stale NO_TEACHER_ASSIGNED (2h window) ===\n");

  const anomalies = await findAnomalies();
  console.log(`Found ${anomalies.length} unassigned payment(s) in 2h window.`);

  if (anomalies.length === 0) {
    console.log("Nothing to resolve — DB already quiet.");
    return;
  }

  const teacherId = await pickApprovedTeacher();
  if (!teacherId) {
    console.error("FAIL: no APPROVED teacher profile available for assignment.");
    process.exit(1);
  }

  let resolved = 0;
  for (const a of anomalies) {
    try {
      await resolveOne(a, teacherId);
      resolved += 1;
      console.log(`  ✓ assigned teacher to student ${a.studentId.slice(0, 8)}… (payment ${a.paymentId.slice(0, 8)}…)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ failed payment ${a.paymentId.slice(0, 8)}…: ${msg}`);
    }
  }

  const remaining = await findAnomalies();
  console.log(`\nResolved: ${resolved}/${anomalies.length}. Remaining: ${remaining.length}.`);

  if (remaining.length > 0) {
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
