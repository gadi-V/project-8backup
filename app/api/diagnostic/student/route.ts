import { NextResponse } from "next/server";
import type { CurriculumTopic } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";

/**
 * Fetch diagnostic reports for student or authorized staff.
 * If student has not unlocked (0 credits), redacts topic names & knowledge trees.
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT", "TEACHER", "ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const user = await prisma.user.findUnique({
      where: { id: auth.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "משתמש לא נמצא" },
        { status: 404 }
      );
    }

    const isStaff = user.role === "ADMIN" || user.role === "MANAGER" || user.role === "TEACHER";

    // If specific ID is requested
    if (id) {
      const diagnostic = await prisma.diagnosticQuiz.findUnique({
        where: { id },
        include: {
          topics: true,
          student: {
            select: {
              id: true,
              name: true,
              phone: true,
              parentName: true,
              parentPhone: true,
              lessonCredits: true,
            },
          },
        },
      });

      if (!diagnostic) {
        return NextResponse.json(
          { success: false, error: "דו״ח אבחון לא נמצא" },
          { status: 404 }
        );
      }

      // Security check: Student can only view their own diagnostic
      if (!isStaff && diagnostic.studentId !== user.id) {
        return NextResponse.json(
          { success: false, error: "אין הרשאה לצפייה באבחון זה" },
          { status: 403 }
        );
      }

      const shouldExposeFull = isStaff || diagnostic.isUnlocked || user.lessonCredits > 0;

      if (!shouldExposeFull) {
        return NextResponse.json({
          success: true,
          data: {
            id: diagnostic.id,
            isUnlocked: false,
            estimatedScore: diagnostic.estimatedScore,
            recommendationSummary: diagnostic.recommendationSummary,
            maskedTopics: diagnostic.topics.map((t: CurriculumTopic, index: number) => ({
              id: `topic-masked-${index + 1}`,
              maskedName: `נושא מיקוד ${index + 1} (${Math.round(t.weightInExam * 100)}% מציון הבחינה)`,
              weightInExam: t.weightInExam,
              isLocked: true,
            })),
          },
        });
      }

      return NextResponse.json({
        success: true,
        data: {
          id: diagnostic.id,
          isUnlocked: true,
          estimatedScore: diagnostic.estimatedScore,
          recommendationSummary: diagnostic.recommendationSummary,
          ageGroup: diagnostic.ageGroup,
          subject: diagnostic.subject,
          challenge: diagnostic.challenge,
          topics: diagnostic.topics,
          quadGroupUrl: user.quadGroupUrl,
          student: isStaff ? diagnostic.student : undefined,
        },
      });
    }

    // Default: Return latest diagnostic for logged-in student
    const latest = await prisma.diagnosticQuiz.findFirst({
      where: isStaff ? {} : { studentId: user.id },
      orderBy: { createdAt: "desc" },
      include: { topics: true },
    });

    if (!latest) {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    const shouldExposeFull = isStaff || latest.isUnlocked || user.lessonCredits > 0;

    if (!shouldExposeFull) {
      return NextResponse.json({
        success: true,
        data: {
          id: latest.id,
          isUnlocked: false,
          estimatedScore: latest.estimatedScore,
          recommendationSummary: latest.recommendationSummary,
          maskedTopics: latest.topics.map((t: CurriculumTopic, index: number) => ({
            id: `topic-masked-${index + 1}`,
            maskedName: `נושא מיקוד ${index + 1} (${Math.round(t.weightInExam * 100)}% מציון הבחינה)`,
            weightInExam: t.weightInExam,
            isLocked: true,
          })),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: latest.id,
        isUnlocked: true,
        estimatedScore: latest.estimatedScore,
        recommendationSummary: latest.recommendationSummary,
        ageGroup: latest.ageGroup,
        subject: latest.subject,
        challenge: latest.challenge,
        topics: latest.topics,
        quadGroupUrl: user.quadGroupUrl,
      },
    });
  } catch (error: unknown) {
    console.error("Diagnostic student GET error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בשליפת האבחון" },
      { status: 500 }
    );
  }
}
