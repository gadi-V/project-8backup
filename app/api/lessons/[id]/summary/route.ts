import { NextRequest, NextResponse } from "next/server";
import { savePostLessonSummary } from "../../../../../lib/lesson-summary";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const lessonId = resolvedParams.id;
    const body = await request.json();

    const {
      teacherId,
      summaryText,
      homeworkAssigned,
      resolvedGaps,
      remainingGaps,
      studentRating,
    } = body;

    if (!teacherId || !summaryText) {
      return NextResponse.json(
        { error: "Missing required fields: teacherId and summaryText are mandatory" },
        { status: 400 }
      );
    }

    const result = await savePostLessonSummary({
      lessonId,
      teacherId,
      summaryText,
      homeworkAssigned,
      resolvedGaps: Array.isArray(resolvedGaps) ? resolvedGaps : [],
      remainingGaps: Array.isArray(remainingGaps) ? remainingGaps : [],
      studentRating: studentRating ? Number(studentRating) : undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to save post-lesson summary:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
