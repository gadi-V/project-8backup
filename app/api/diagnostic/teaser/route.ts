import { NextResponse } from "next/server";
import type { CurriculumTopic } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/session";
import {
  sendParentDiagnosticAlertNotification,
  buildPersonalizedDiagnosticConversion,
  dispatchWhatsAppCloser,
} from "../../../../lib/whatsapp";

/**
 * 5-Step Diagnostic & Wake-up Call Funnel Intake.
 * Public endpoint that processes:
 * 1. Subject & Grade Level
 * 2. Exam Urgency & Timeframe
 * 3. Learning Goal
 * 4. Last Baseline Grade
 * 5. High-difficulty challenge answer
 * 
 * Computes an aggressive urgency readiness score (38%–54% when failing challenge)
 * to demonstrate clear pedagogical vulnerability without unpaid curriculum leak.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      ageGroup,
      subject,
      challenge,
      topicIds,
      studentName,
      studentPhone,
      parentName,
      parentPhone,
      schoolName,
      classTrack,
      trackType,
      examNumber,
      unitsCount,
      degreeField,
      academicYear,
      coreCourse,
      mechinaTrack,
      isFirstAttempt,
      psychometricTotal,
      psychometricQuant,
      psychometricVerbal,
      psychometricEnglish,
      targetTestSession,
      targetOrganization,
      testingInstitute,
      examBattery,
      hasUpcomingExam,
      examTimeframe,
      learningGoal,
      lastGrade,
      challengeAnswer,
      isChallengeCorrect,
      correctCount = 0,
      totalQuestions = 3,
    } = body;

    if (!ageGroup || !subject) {
      return NextResponse.json(
        { success: false, error: "שכבת גיל ומקצוע לימוד הם שדות חובה" },
        { status: 400 }
      );
    }

    const sessionUser = await getCurrentUser();
    let targetUserId = sessionUser?.id;

    // Associate or create student user record if phone provided
    if (!targetUserId && studentPhone) {
      const cleanPhone = String(studentPhone).replace(/[\s\-()+/]/g, "").trim();
      if (cleanPhone.length >= 7) {
        const existingUser = await prisma.user.findUnique({
          where: { phone: cleanPhone },
        });

        if (existingUser) {
          targetUserId = existingUser.id;
          if (parentName || parentPhone || schoolName || classTrack || trackType || degreeField || targetOrganization) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                parentName: parentName || existingUser.parentName,
                parentPhone: parentPhone || existingUser.parentPhone,
                schoolName: schoolName || existingUser.schoolName,
                classTrack: classTrack || existingUser.classTrack,
                trackType: trackType || existingUser.trackType,
                degreeField: degreeField || existingUser.degreeField,
                academicYear: academicYear || existingUser.academicYear,
                targetOrganization: targetOrganization || existingUser.targetOrganization,
              },
            });
          }
        } else {
          const newUser = await prisma.user.create({
            data: {
              name: studentName || "תלמיד חדש",
              phone: cleanPhone,
              password: "MOCK_PASSWORD_ONBOARDING",
              role: "STUDENT",
              parentName: parentName || null,
              parentPhone: parentPhone || null,
              schoolName: schoolName || null,
              classTrack: classTrack || null,
              trackType: trackType || null,
              degreeField: degreeField || null,
              academicYear: academicYear || null,
              targetOrganization: targetOrganization || null,
              notifyParentViaWhatsApp: !!parentPhone,
            },
          });
          targetUserId = newUser.id;
        }
      }
    }

    // Guest fallback
    if (!targetUserId) {
      let fallbackUser = await prisma.user.findFirst({
        where: { phone: "0500000000" },
      });
      if (!fallbackUser) {
        fallbackUser = await prisma.user.create({
          data: {
            name: studentName || "אורח אבחון",
            phone: "0500000000",
            password: "MOCK_PASSWORD_GUEST",
            role: "STUDENT",
          },
        });
      }
      targetUserId = fallbackUser.id;
    }

    // Determine target curriculum topics
    let mappedTopicIds: string[] = [];
    if (Array.isArray(topicIds) && topicIds.length > 0) {
      mappedTopicIds = topicIds;
    } else {
      const matchingTopics = await prisma.curriculumTopic.findMany({
        where: {
          subject: { contains: subject.slice(0, 5), mode: "insensitive" },
        },
        take: 5,
      });
      mappedTopicIds = matchingTopics.map((t: CurriculumTopic) => t.id);
    }

    // 5-Step Wake-up Call Scoring Engine (3-Domain Aggregated)
    // If student fails or struggles on challenge questions, calculate aggressive readiness score (38% - 52%)
    let calculatedScore = 44;
    const numCorrect = typeof correctCount === "number" ? correctCount : (isChallengeCorrect ? 1 : 0);
    const totalQ = typeof totalQuestions === "number" && totalQuestions > 0 ? totalQuestions : 3;
    const baseline = typeof lastGrade === "number" ? lastGrade : 65;

    if (numCorrect === totalQ) {
      calculatedScore = Math.min(88, Math.max(72, baseline + 8));
    } else if (numCorrect >= 2) {
      calculatedScore = Math.min(68, Math.max(56, Math.round(baseline * 0.78)));
    } else if (numCorrect === 1) {
      calculatedScore = Math.min(52, Math.max(42, Math.round(baseline * 0.58)));
    } else {
      // 0 correct -> severe gap wake-up call
      calculatedScore = Math.min(42, Math.max(34, Math.round(baseline * 0.48)));
    }

    const urgencyNote =
      hasUpcomingExam && examTimeframe?.includes("month")
        ? " ⚠️ התראה: בחינה קרובה בטווח של פחות מחודש — סיכון מובהק לפגיעה בציון הבגרות."
        : "";

    const recommendationSummary = numCorrect < totalQ
      ? `מדד מוכנות למבחן: ${calculatedScore}%. זוהו ${totalQ - numCorrect} פערי ליבה בחשיבה אנליטית, חקירת גבולות ופתרון שאלות ברמת בחינה.${urgencyNote}`
      : `מדד מוכנות למבחן: ${calculatedScore}%. בסיס סביר, אך נדרש דיוק ומהירות לפתרון מבחן 5 יח״ל בזמן אמת.${urgencyNote}`;

    const isStudentPaying = sessionUser ? sessionUser.lessonCredits > 0 : false;

    // Create Diagnostic record with 5-step funnel tracking
    const diagnostic = await prisma.diagnosticQuiz.create({
      data: {
        studentId: targetUserId,
        ageGroup: ageGroup || "HIGH_SCHOOL",
        subject: subject || "מתמטיקה",
        challenge: challenge || learningGoal || "הכנה לבחינה וסגירת פערים",
        topicIds: mappedTopicIds,
        estimatedScore: calculatedScore,
        isUnlocked: isStudentPaying,
        unlockedAt: isStudentPaying ? new Date() : null,
        recommendationSummary,
        hasUpcomingExam: !!hasUpcomingExam,
        examTimeframe: examTimeframe || null,
        learningGoal: learningGoal || null,
        lastGrade: typeof lastGrade === "number" ? lastGrade : null,
        challengeAnswer: challengeAnswer || null,
        schoolName: schoolName || null,
        classTrack: classTrack || null,
        trackType: trackType || null,
        examNumber: examNumber || null,
        unitsCount: typeof unitsCount === "number" ? unitsCount : null,
        degreeField: degreeField || null,
        academicYear: academicYear || null,
        coreCourse: coreCourse || null,
        mechinaTrack: mechinaTrack || null,
        isFirstAttempt: typeof isFirstAttempt === "boolean" ? isFirstAttempt : null,
        psychometricTotal: typeof psychometricTotal === "number" ? psychometricTotal : null,
        psychometricQuant: typeof psychometricQuant === "number" ? psychometricQuant : null,
        psychometricVerbal: typeof psychometricVerbal === "number" ? psychometricVerbal : null,
        psychometricEnglish: typeof psychometricEnglish === "number" ? psychometricEnglish : null,
        targetTestSession: targetTestSession || null,
        targetOrganization: targetOrganization || null,
        testingInstitute: testingInstitute || null,
        examBattery: examBattery || null,
        topics: {
          connect: mappedTopicIds.map((id) => ({ id })),
        },
      },
      include: {
        topics: true,
      },
    });

    // Notify Parent via WhatsApp
    if (parentPhone) {
      try {
        await sendParentDiagnosticAlertNotification({
          parentPhone,
          parentName,
          studentName: studentName || "ילדכם",
          subject,
          estimatedScore: calculatedScore,
        });
      } catch (waErr) {
        console.error("WhatsApp parent notification error:", waErr);
      }
    }

    // WhatsApp Closer (additive, step 6): share the funnel-closing engine with
    // the paid-out package this diagnostic points at, without altering the
    // existing response contract. Fail-open — delivery errors never fail intake.
    let closerAnalysis: import("../../../../lib/whatsapp").GapAnalysisResult | null = null;
    let closerDispatch: import("../../../../lib/whatsapp").WhatsAppCloserResult["dispatch"] | null = null;
    const closerPhone = parentPhone || studentPhone;
    if (closerPhone) {
      try {
        const closerResult = await dispatchWhatsAppCloser({
          studentId: targetUserId ?? undefined,
          studentName: studentName || "תלמיד",
          trackName: diagnostic.trackType ?? subject,
          identifiedGaps: mappedTopicIds.length > 0
            ? mappedTopicIds
            : [subject],
          studentPhone: studentPhone || null,
          parentPhone: parentPhone || null,
          recipientPhone: closerPhone,
          recipientName: parentName || studentName,
        });
        closerAnalysis = closerResult.analysis;
        closerDispatch = closerResult.dispatch;
      } catch (closerErr) {
        console.error("WhatsApp Closer (teaser) error:", closerErr);
      }
    }

    // If already paying/unlocked, return full data
    if (isStudentPaying) {
      return NextResponse.json({
        success: true,
        data: {
          id: diagnostic.id,
          isUnlocked: true,
          estimatedScore: diagnostic.estimatedScore,
          recommendationSummary: diagnostic.recommendationSummary,
          topicsCount: diagnostic.topics.length,
          topics: diagnostic.topics.map((t: CurriculumTopic) => ({
            id: t.id,
            topicName: t.topicName,
            subTopics: t.subTopics,
            weightInExam: t.weightInExam,
            gradeLevel: t.gradeLevel,
          })),
          closer: closerAnalysis && closerDispatch
            ? { analysis: closerAnalysis, dispatch: closerDispatch }
            : null,
        },
      });
    }

    // STRICT TEASER PAYLOAD: Mask topic names to prevent exploitation
    const maskedTopics = diagnostic.topics.map((t: CurriculumTopic, index: number) => ({
      id: `topic-masked-${index + 1}`,
      maskedName: `נושא מיקוד ${index + 1} (${Math.round(t.weightInExam * 100)}% מציון הבחינה)`,
      weightInExam: t.weightInExam,
      subTopicsCount: Array.isArray(t.subTopics) ? t.subTopics.length : 2,
      isLocked: true,
    }));

    // Gap-depth analysis → recommended package (TRIO for 1-2 weak topics, MULTI for 3+).
    const gapTopicsCount = diagnostic.topics.length;
    const recommendation = {
      packageRecommendation: (gapTopicsCount >= 3 ? "MULTI" : "TRIO") as "TRIO" | "MULTI",
      lessons: gapTopicsCount >= 3 ? 5 : 3,
      whatsappMessage: buildPersonalizedDiagnosticConversion({
        firstName: studentName ? studentName.split(" ")[0] : "תלמיד",
        gapTopicsCount: Math.max(1, gapTopicsCount),
        trackLabel: diagnostic.trackType ?? subject,
      }),
    };

    return NextResponse.json({
      success: true,
      data: {
        id: diagnostic.id,
        isUnlocked: false,
        estimatedScore: diagnostic.estimatedScore,
        recommendationSummary: diagnostic.recommendationSummary,
        topicsCount: diagnostic.topics.length,
        maskedTopics,
        recommendation,
        closer: closerAnalysis && closerDispatch
          ? { analysis: closerAnalysis, dispatch: closerDispatch }
          : null,
        paywallNotice: "העץ הפדגוגי המלא, ניתוח פערי הידע ושיבוץ המורה המומחה ייפתחו עם רכישת חבילת שיעורים.",
      },
    });
  } catch (error: unknown) {
    console.error("Diagnostic teaser 5-step error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה פנימית ביצירת דו״ח האבחון" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/diagnostic/teaser?quizId=... | packageId=...
 *
 * Teaser Paywall view-model: exposes the readiness score + summary while the
 * full knowledge-gap tree stays Locked & Blurred (masked) until purchase.
 * Returns the recommended package by gap depth (TRIO 1-2, MULTI 3+) together
 * with the personalized WhatsApp conversion message.
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const quizId = url.searchParams.get("quizId");
    const packageId = url.searchParams.get("packageId");

    const diagnostic = await prisma.diagnosticQuiz.findFirst({
      where: quizId
        ? { id: quizId }
        : packageId
          ? { packageId, createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
          : { id: "___none___" },
      orderBy: { createdAt: "desc" },
      include: { topics: true },
    });

    if (!diagnostic) {
      return NextResponse.json(
        { success: false, error: "דו״ח אבחון לא נמצא. נדרש quizId או packageId תקינים." },
        { status: 404 }
      );
    }

    // Readiness score: prefer estimatedScore; fall back to quiz score ratio.
    const readinessScore =
      typeof diagnostic.estimatedScore === "number" && diagnostic.estimatedScore > 0
        ? diagnostic.estimatedScore
        : diagnostic.score !== null && diagnostic.totalQuestions && diagnostic.totalQuestions > 0
          ? Math.round((diagnostic.score / diagnostic.totalQuestions) * 100)
          : 0;

    const summaryText =
      diagnostic.recommendationSummary ??
      `מדד המוכנות למבחן: ${readinessScore}%. מומלץ לפתוח את מפת פערי הידע המלאה להמשך תכנון.`;

    const gapTopicsCount = diagnostic.topics.length;
    const isLocked = !diagnostic.isUnlocked;
    const gapTree = isLocked
      ? // Locked & Blurred — return structural meta only, zero real data.
        diagnostic.topics.map((t: CurriculumTopic, index: number) => ({
          id: `topic-masked-${index + 1}`,
          maskedName: `נושא מיקוד ${index + 1}`,
          weightInExam: t.weightInExam,
          subTopicsCount: Array.isArray(t.subTopics) ? t.subTopics.length : 2,
          isLocked: true,
        }))
      : diagnostic.topics.map((t: CurriculumTopic) => ({
          id: t.id,
          topicName: t.topicName,
          subTopics: Array.isArray(t.subTopics) ? t.subTopics : [],
          weightInExam: t.weightInExam,
          gradeLevel: t.gradeLevel,
          isLocked: false,
        }));

    const recommendation = {
      packageRecommendation: (gapTopicsCount >= 3 ? "MULTI" : "TRIO") as "TRIO" | "MULTI",
      lessons: gapTopicsCount >= 3 ? 5 : 3,
      whatsappMessage: buildPersonalizedDiagnosticConversion({
        firstName: diagnostic.studentId?.slice(0, 8) ?? "תלמיד",
        gapTopicsCount: Math.max(1, gapTopicsCount),
        trackLabel: diagnostic.trackType ?? diagnostic.subject,
      }),
    };

    return NextResponse.json({
      success: true,
      data: {
        quizId: diagnostic.id,
        packageId: diagnostic.packageId,
        readinessScore,
        summaryText,
        isLocked,
        topicsCount: gapTopicsCount,
        gapTree,
        identifiedGapsCount: diagnostic.identifiedGaps?.length ?? 0,
        recommendation,
        paywallNotice: "מפת פערי הידע המלאה, פירוט הנושאים והשיבוץ מוצפנים עד לרכישת חבילת שיעורים.",
      },
    });
  } catch (error: unknown) {
    console.error("Diagnostic teaser GET error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בשליפת דו״ח האבחון" },
      { status: 500 }
    );
  }
}
