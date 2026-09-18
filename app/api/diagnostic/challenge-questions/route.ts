import { NextResponse } from "next/server";
import {
  getSanitizedOnboardingChallengeQuestions,
  type ChallengeCourseKey,
} from "../../../../lib/diagnostic-questions";
import type { DiagnosticTrackType } from "../../../../lib/diagnostic-taxonomy";

const VALID_TRACKS: DiagnosticTrackType[] = [
  "BAGRUT",
  "ACADEMIC",
  "MECHINA",
  "PSYCHOMETRIC",
  "SCREENING_INST",
];

/**
 * GET /api/diagnostic/challenge-questions
 *
 * Delivers the onboarding 3-domain suite with isCorrect / explanation stripped.
 * Canonical answer keys never leave the server.
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const trackTypeRaw = url.searchParams.get("trackType") || "BAGRUT";

    if (!VALID_TRACKS.includes(trackTypeRaw as DiagnosticTrackType)) {
      return NextResponse.json(
        { success: false, error: "מסלול לימודים לא תקין" },
        { status: 400 }
      );
    }

    const courseKey: ChallengeCourseKey = {
      trackType: trackTypeRaw as DiagnosticTrackType,
      examCode: url.searchParams.get("examCode"),
      subjectId: url.searchParams.get("subjectId"),
      courseId: url.searchParams.get("courseId"),
      mechinaSubject: url.searchParams.get("mechinaSubject"),
      screeningBattery: url.searchParams.get("screeningBattery"),
    };

    const questions = getSanitizedOnboardingChallengeQuestions(courseKey);

    return NextResponse.json({
      success: true,
      data: {
        courseKey,
        questions,
      },
    });
  } catch (error: unknown) {
    console.error("Challenge questions delivery error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בטעינת שאלות האבחון" },
      { status: 500 }
    );
  }
}
