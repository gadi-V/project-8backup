import { NextRequest, NextResponse } from "next/server";
import { DIAGNOSTIC_MATH_BANK } from "../../../../lib/diagnostic-bank";
import { submitDiagnosticQuiz } from "../../../../lib/diagnostic-quiz";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageId, studentId, topicKey, answers } = body;

    if (!packageId || !studentId || !topicKey || !answers) {
      return NextResponse.json(
        { error: "Missing required quiz parameters" },
        { status: 400 }
      );
    }

    const questions = DIAGNOSTIC_MATH_BANK[topicKey] || [];
    if (questions.length === 0) {
      return NextResponse.json(
        { error: "Topic questions bank not found" },
        { status: 404 }
      );
    }

    let correctCount = 0;
    const identifiedGaps: string[] = [];

    questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find((opt) => opt.id === selectedOptionId);

      if (selectedOption) {
        if (selectedOption.isCorrect) {
          correctCount++;
        } else if (selectedOption.gapIndication) {
          identifiedGaps.push(selectedOption.gapIndication);
        }
      } else {
        identifiedGaps.push(`No answer in topic: ${q.topic}`);
      }
    });

    const quizRecord = await submitDiagnosticQuiz({
      packageId,
      studentId,
      topic: topicKey,
      score: correctCount,
      totalQuestions: questions.length,
      answersSummary: answers,
      identifiedGaps: Array.from(new Set(identifiedGaps)),
    });

    return NextResponse.json(
      {
        quiz: quizRecord,
        score: correctCount,
        totalQuestions: questions.length,
        percentage: Math.round((correctCount / questions.length) * 100),
        identifiedGaps: Array.from(new Set(identifiedGaps)),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to evaluate diagnostic quiz:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
