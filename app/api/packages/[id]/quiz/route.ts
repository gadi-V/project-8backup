import { NextRequest, NextResponse } from "next/server";
import {
  getPackageDiagnosticSummary,
  submitDiagnosticQuiz,
} from "../../../../../lib/diagnostic-quiz";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const packageId = resolvedParams.id;

    const summary = await getPackageDiagnosticSummary(packageId);
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch package diagnostic summary:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const packageId = resolvedParams.id;
    const body = await request.json();

    const {
      studentId,
      topic,
      score,
      totalQuestions,
      answersSummary,
      identifiedGaps,
    } = body;

    if (!studentId || !topic || score === undefined || !totalQuestions) {
      return NextResponse.json(
        { error: "Missing required quiz parameters" },
        { status: 400 }
      );
    }

    const quiz = await submitDiagnosticQuiz({
      packageId,
      studentId,
      topic,
      score: Number(score),
      totalQuestions: Number(totalQuestions),
      answersSummary,
      identifiedGaps: Array.isArray(identifiedGaps) ? identifiedGaps : [],
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error("Failed to submit diagnostic quiz:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
