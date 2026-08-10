-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "activeStudentsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ageGroups" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "lastReferralAt" TIMESTAMP(3),
ADD COLUMN     "referralCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "TeacherReferral" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "diagnosticId" TEXT,
    "matchScore" INTEGER NOT NULL DEFAULT 0,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherReferral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeacherReferral_teacherId_createdAt_idx" ON "TeacherReferral"("teacherId", "createdAt");

-- CreateIndex
CREATE INDEX "TeacherReferral_studentId_createdAt_idx" ON "TeacherReferral"("studentId", "createdAt");

-- AddForeignKey
ALTER TABLE "TeacherReferral" ADD CONSTRAINT "TeacherReferral_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherReferral" ADD CONSTRAINT "TeacherReferral_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
