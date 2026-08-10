import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/session";
import { prisma } from "../../../lib/prisma";
import {
  getTeacherOnboardingStatus,
  isTeacherProfileComplete,
} from "../../../lib/teacher-onboarding";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "נדרשת התחברות למערכת" }, { status: 401 });
    }

    const diagnosticCount = await prisma.diagnosticQuiz.count({
      where: { studentId: user.id },
    });

    let teacherOnboarding = null;

    if (user.role === "TEACHER") {
      const teacherData = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          teacherProfile: {
            select: {
              subjects: true,
              ageGroups: true,
              bio: true,
            },
          },
          _count: {
            select: { availabilities: true },
          },
        },
      });

      const profile = teacherData?.teacherProfile ?? null;
      teacherOnboarding = getTeacherOnboardingStatus({
        isApproved: user.isApproved,
        hasProfile: Boolean(profile),
        profileComplete: isTeacherProfileComplete(profile),
        availabilityCount: teacherData?._count.availabilities ?? 0,
      });
    }

    return NextResponse.json({
      user,
      hasCompletedQuiz: diagnosticCount > 0,
      teacherOnboarding,
    });
  } catch (error) {
    console.error("Me API Error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת פרטי המשתמש" }, { status: 500 });
  }
}
