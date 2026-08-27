import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { requireAuth } from "../../../../../lib/api-auth";

type RateBody = {
  rating?: unknown;
  reviewComment?: unknown;
};

export async function POST(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id: lessonId } = await ctx.params;

    const auth = await requireAuth(["STUDENT"]);
    if (auth.error) return auth.error;

    const body = (await request.json()) as RateBody;
    const { rating, reviewComment } = body;

    if (
      typeof rating !== "number" ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { success: false, error: "דירוג חייב להיות מספר שלם בין 1 ל-5" },
        { status: 400 }
      );
    }

    const comment =
      typeof reviewComment === "string" && reviewComment.trim().length > 0
        ? reviewComment.trim().slice(0, 1000)
        : null;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        id: true,
        teacherId: true,
        studentId: true,
        status: true,
        rating: true,
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: "השיעור לא נמצא" },
        { status: 404 }
      );
    }

    if (lesson.studentId !== auth.user.id) {
      return NextResponse.json(
        { success: false, error: "אין לך הרשאה לדרג שיעור זה" },
        { status: 403 }
      );
    }

    if (lesson.status !== "COMPLETED") {
      return NextResponse.json(
        { success: false, error: "ניתן לדרג רק שיעורים שהסתיימו" },
        { status: 409 }
      );
    }

    if (lesson.rating !== null) {
      return NextResponse.json(
        { success: false, error: "שיעור זה כבר דורג" },
        { status: 409 }
      );
    }

    const ratedAt = new Date();

    // Atomic: update lesson + recalculate teacher average rating in one transaction.
    const result = await prisma.$transaction(async (tx) => {
      await tx.lesson.update({
        where: { id: lessonId },
        data: { rating, reviewComment: comment, ratedAt },
      });

      // Recompute from all rated lessons for this teacher (including the one just rated).
      const allRatings = await tx.lesson.findMany({
        where: {
          teacherId: lesson.teacherId,
          rating: { not: null },
        },
        select: { rating: true },
      });

      const totalReviews = allRatings.length;
      const sum = allRatings.reduce((acc, l) => acc + (l.rating ?? 0), 0);
      const averageRating =
        totalReviews > 0
          ? Math.round((sum / totalReviews) * 100) / 100
          : 5.0;

      await tx.teacherProfile.updateMany({
        where: { userId: lesson.teacherId },
        data: { averageRating, totalReviews },
      });

      return { averageRating, totalReviews };
    });

    return NextResponse.json({
      success: true,
      data: {
        message: "תודה! הדירוג נשמר בהצלחה.",
        rating,
        teacherAverageRating: result.averageRating,
        teacherTotalReviews: result.totalReviews,
      },
    });
  } catch (error) {
    console.error("Lesson Rate Error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה פנימית בשמירת הדירוג" },
      { status: 500 }
    );
  }
}
