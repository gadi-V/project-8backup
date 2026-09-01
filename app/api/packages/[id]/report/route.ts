import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const packageId = resolvedParams.id;

    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
      include: {
        lessons: {
          orderBy: { scheduledAt: "asc" },
          include: {
            teacher: {
              select: {
                id: true,
                user: { select: { name: true, email: true } },
              },
            },
          },
        },
        preLessonAssets: {
          orderBy: { createdAt: "desc" },
          include: {
            uploadedBy: { select: { name: true, email: true } },
          },
        },
      },
    });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const quizzes = await prisma.diagnosticQuiz.findMany({
      where: { packageId },
      orderBy: { createdAt: "desc" },
    });

    const completedLessons = pkg.lessons.filter((l) => l.status === "COMPLETED");
    const totalLessons = pkg.lessons.length;
    const activeGaps = Array.from(new Set(quizzes.flatMap((q) => q.identifiedGaps || [])));

    return NextResponse.json(
      {
        package: pkg,
        stats: {
          totalLessons,
          completedLessonsCount: completedLessons.length,
          completionRate:
            totalLessons > 0
              ? Math.round((completedLessons.length / totalLessons) * 100)
              : 0,
          activeGapsCount: activeGaps.length,
          quizzesCount: quizzes.length,
        },
        activeGaps,
        quizzes,
        lessonsHistory: completedLessons,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to generate package report:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
