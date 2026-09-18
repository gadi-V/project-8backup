"use client";

import { useState, useMemo, useEffect, type SVGProps } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import MathFormula from "../../../components/MathFormula";
import type {
  ChallengeCourseKey,
  SanitizedChallengeQuestion,
} from "../../../lib/diagnostic-questions";
import {
  TRACK_OPTIONS,
  BAGRUT_SUBJECTS,
  ACADEMIC_DEGREE_FIELDS,
  MECHINA_SUBJECTS,
  MECHINA_TRACK_TYPES,
  PSYCHOMETRIC_TEST_SESSIONS,
  HS_UNIT_OPTIONS,
  SCREENING_SECTORS,
  type DiagnosticTrackType,
} from "../../../lib/diagnostic-taxonomy";
import {
  frostCard,
  pageCanvas,
  primaryCta,
  secondaryCta,
  fieldClass,
  eyebrow as eyebrowClass,
} from "../../../lib/ui";

/** Legacy localStorage key that cached full explanations — must never be written again. */
const LEGACY_PENDING_REVIEWS_KEY = "pending_diagnostic_question_reviews";

/** RTL back — points right (toward previous in Hebrew reading order) */
function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={props.className} width={16} height={16}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/** RTL proceed — points left (toward next in Hebrew reading order) */
function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={props.className} width={16} height={16}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
  );
}

type MaskedTopic = {
  id: string;
  maskedName: string;
  weightInExam: number;
  subTopicsCount?: number;
  isLocked: boolean;
};

type UnlockedTopic = {
  id: string;
  topicName: string;
  subTopics: string[] | unknown;
  weightInExam: number;
  gradeLevel: string;
};

type MatchedTeacherBrief = {
  teacherId: string;
  teacherName: string;
  matchScore: number;
  reasons: string[];
  openSlotsCount: number;
};

type PackageRecommendation = {
  packageRecommendation: "TRIO" | "MULTI";
  lessons: number;
  whatsappMessage?: string;
};

type TeaserResult = {
  id: string;
  isUnlocked: boolean;
  estimatedScore: number;
  recommendationSummary: string;
  topicsCount: number;
  maskedTopics?: MaskedTopic[];
  topics?: UnlockedTopic[];
  sampleExplanation?: string | null;
  quadGroupUrl?: string;
  matchedTeacher?: MatchedTeacherBrief | null;
  paywallNotice?: string;
  recommendation?: PackageRecommendation;
};

const EXAM_TIMEFRAMES = [
  { id: "less_than_1_month", label: "כן, פחות מחודש (דחוף ביותר)", hasExam: true },
  { id: "1_to_3_months", label: "כן, בעוד 1-3 חודשים", hasExam: true },
  { id: "no_exam_soon", label: "אין מבחן קרוב כרגע", hasExam: false },
];

const LEARNING_GOALS = [
  { id: "EXAM_PREP", title: "הכנה למבחן / בגרות / מיונים", desc: "מיקוד בנושאי מפתח ופתרון שאלות מבחן בזמן אמת" },
  { id: "GAP_CLOSING", title: "סגירת פערים יסודית", desc: "הבנת עומק של החומר מתחילת השנה וחיזוק מיומנויות בסיס" },
  { id: "HIGH_SCORE_BOOST", title: "הגעה למצטיינים (95+ / דפ״ר 90)", desc: "ליטוש טקטי ותרגול שאלות קצה ברמת קושי מקסימלית" },
];

const fieldClassSm =
  "w-full bg-neutral-50/90 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-neutral-900 text-start focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400";
const labelClass = "block text-xs font-medium text-neutral-600 mb-1.5 text-start";
const trackBadge =
  "bg-neutral-900/[0.04] border border-neutral-900/[0.08] text-neutral-800 text-xs px-3 py-1 rounded-full font-medium";
const backBtnClass = `${secondaryCta} inline-flex items-center gap-1.5 text-sm`;
const proceedBtnClass = `${primaryCta} flex-1 inline-flex items-center justify-center gap-2`;

function choiceCardClass(isSelected: boolean): string {
  return `w-full p-3.5 rounded-2xl text-start transition-all flex items-center justify-between ${
    isSelected
      ? "border-2 border-neutral-900 bg-neutral-50"
      : "border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
  }`;
}

function checkDotClass(isSelected: boolean): string {
  return `w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
    isSelected ? "bg-neutral-900 border-neutral-900 text-white" : "border-neutral-300"
  }`;
}

export default function OnboardingDiagnosticPage() {
  // Navigation state machine
  const [activeTrack, setActiveTrack] = useState<DiagnosticTrackType>("BAGRUT");
  // microStep:
  // 1: Track Selection
  // 2: Track-Specific Parameters
  // 3: Contact & Institution Info
  // 4: Urgency & Baseline Grade
  // 5: 3-Domain Challenge Suite
  // 6: Gated Teaser Paywall & Gauge
  // 7: Unlocked Knowledge Tree
  const [microStep, setMicroStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [loading, setLoading] = useState(false);

  // Common Contact & Profile Fields
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");

  // Common Urgency & Goals
  const [selectedTimeframe, setSelectedTimeframe] = useState("less_than_1_month");
  const [learningGoal, setLearningGoal] = useState("EXAM_PREP");
  const [lastGrade, setLastGrade] = useState<number>(64);

  // Track 1: Bagrut Fields
  const [bagrutSubjectId, setBagrutSubjectId] = useState("math");
  const [bagrutUnitCount, setBagrutUnitCount] = useState<number>(5);
  const [bagrutExamCode, setBagrutExamCode] = useState("35582");

  // Track 2: Academic Fields
  const [degreeFieldId, setDegreeFieldId] = useState("cs_sw_eng");
  const [academicYearId, setAcademicYearId] = useState("YEAR_A");
  const [selectedCourse, setSelectedCourse] = useState("חדו״א 1 / אינפי 1");

  // Track 3: Mechina Fields
  const [mechinaSubject, setMechinaSubject] = useState(MECHINA_SUBJECTS[0]);
  const [mechinaTrackType, setMechinaTrackType] = useState(MECHINA_TRACK_TYPES[0]);

  // Track 4: Psychometric Fields
  const [hsMathUnits, setHsMathUnits] = useState<number>(5);
  const [hsEnglishUnits, setHsEnglishUnits] = useState<number>(5);
  const [isFirstPsychometric, setIsFirstPsychometric] = useState<boolean>(true);
  const [prevPsychTotal, setPrevPsychTotal] = useState<number>(580);
  const [prevPsychQuant, setPrevPsychQuant] = useState<number>(105);
  const [prevPsychVerbal, setPrevPsychVerbal] = useState<number>(108);
  const [prevPsychEnglish, setPrevPsychEnglish] = useState<number>(112);
  const [targetPsychSession, setTargetPsychSession] = useState(PSYCHOMETRIC_TEST_SESSIONS[0]);

  // Track 5: Screening & Placement Fields
  const [screeningSectorId, setScreeningSectorId] = useState("defense_idf");
  const [screeningInstituteId, setScreeningInstituteId] = useState("idf_internal");
  const [screeningBattery, setScreeningBattery] = useState("מבחן דפ״ר אדפטיבי (צו ראשון)");

  // Step 5: 3-Domain Question Answers State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [challengeQuestions, setChallengeQuestions] = useState<SanitizedChallengeQuestion[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  // Teaser & Quad Data
  const [teaserData, setTeaserData] = useState<TeaserResult | null>(null);

  // Clear any legacy cached explanations that previously leaked solution text.
  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_PENDING_REVIEWS_KEY);
    } catch {
      // Ignore private-mode / storage failures.
    }
  }, []);

  // Derived taxonomy options
  const selectedBagrutSubject = useMemo(
    () => BAGRUT_SUBJECTS.find((s) => s.id === bagrutSubjectId) || BAGRUT_SUBJECTS[0],
    [bagrutSubjectId]
  );
  const availableBagrutUnits = selectedBagrutSubject.units;
  const selectedBagrutUnit = useMemo(
    () => availableBagrutUnits.find((u) => u.unitCount === bagrutUnitCount) || availableBagrutUnits[0],
    [availableBagrutUnits, bagrutUnitCount]
  );

  const selectedDegreeField = useMemo(
    () => ACADEMIC_DEGREE_FIELDS.find((d) => d.id === degreeFieldId) || ACADEMIC_DEGREE_FIELDS[0],
    [degreeFieldId]
  );
  const selectedYear = useMemo(
    () => selectedDegreeField.years.find((y) => y.yearId === academicYearId) || selectedDegreeField.years[0],
    [selectedDegreeField, academicYearId]
  );

  const selectedScreeningSector = useMemo(
    () => SCREENING_SECTORS.find((s) => s.id === screeningSectorId) || SCREENING_SECTORS[0],
    [screeningSectorId]
  );
  const selectedScreeningInstitute = useMemo(
    () => selectedScreeningSector.institutes.find((i) => i.id === screeningInstituteId) || selectedScreeningSector.institutes[0],
    [selectedScreeningSector, screeningInstituteId]
  );

  // Dynamic progress steps calculation
  const totalFunnelSteps = 5;
  const progressPercent = Math.min(100, Math.round((microStep / totalFunnelSteps) * 100));

  // Course key echoed to the teaser API so the server re-resolves the same bank.
  const courseKey: ChallengeCourseKey = useMemo(
    () => ({
      trackType: activeTrack,
      examCode: activeTrack === "BAGRUT" ? bagrutExamCode : null,
      subjectId: activeTrack === "BAGRUT" ? bagrutSubjectId : null,
      courseId: activeTrack === "ACADEMIC" ? selectedCourse : null,
      mechinaSubject: activeTrack === "MECHINA" ? mechinaSubject : null,
      screeningBattery: activeTrack === "SCREENING_INST" ? screeningBattery : null,
    }),
    [
      activeTrack,
      bagrutExamCode,
      bagrutSubjectId,
      selectedCourse,
      mechinaSubject,
      screeningBattery,
    ]
  );

  // Fetch sanitized questions from the server — never import answer keys into the client bundle.
  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    params.set("trackType", courseKey.trackType);
    if (courseKey.examCode) params.set("examCode", courseKey.examCode);
    if (courseKey.subjectId) params.set("subjectId", courseKey.subjectId);
    if (courseKey.courseId) params.set("courseId", courseKey.courseId);
    if (courseKey.mechinaSubject) params.set("mechinaSubject", courseKey.mechinaSubject);
    if (courseKey.screeningBattery) params.set("screeningBattery", courseKey.screeningBattery);

    setQuestionsLoading(true);
    setQuestionsError(null);

    fetch(`/api/diagnostic/challenge-questions?${params.toString()}`)
      .then(async (res) => {
        const data: unknown = await res.json();
        if (!res.ok || !data || typeof data !== "object") {
          throw new Error("שגיאה בטעינת שאלות האבחון");
        }
        const payload = data as {
          success?: boolean;
          error?: string;
          data?: { questions?: SanitizedChallengeQuestion[] };
        };
        if (!payload.success || !payload.data?.questions) {
          throw new Error(payload.error || "שגיאה בטעינת שאלות האבחון");
        }
        if (!cancelled) {
          setChallengeQuestions(payload.data.questions);
          setCurrentQuestionIdx(0);
          setAnswers({});
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setChallengeQuestions([]);
          setQuestionsError(err instanceof Error ? err.message : "שגיאה בטעינת שאלות האבחון");
        }
      })
      .finally(() => {
        if (!cancelled) setQuestionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [courseKey]);

  const activeQuestion: SanitizedChallengeQuestion | undefined =
    challengeQuestions[Math.min(currentQuestionIdx, Math.max(0, challengeQuestions.length - 1))];

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    if (!activeQuestion || !answers[activeQuestion.id]) {
      toast.error("יש לבחור תשובה כדי להמשיך לשאלה הבאה");
      return;
    }
    if (currentQuestionIdx < challengeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  // Compile final Subject / Topic representation for matching engine
  const getDerivedSubject = () => {
    switch (activeTrack) {
      case "BAGRUT":
        return `${selectedBagrutSubject.name} (${bagrutUnitCount} יח״ל - ${bagrutExamCode})`;
      case "ACADEMIC":
        return `${selectedCourse} (${selectedDegreeField.name})`;
      case "MECHINA":
        return `${mechinaSubject} (${mechinaTrackType})`;
      case "PSYCHOMETRIC":
        return `פסיכומטרי (${targetPsychSession})`;
      case "SCREENING_INST":
        return `${screeningBattery} (${selectedScreeningInstitute.name})`;
      default:
        return "מתמטיקה (5 יח״ל)";
    }
  };

  const handleSubmitDiagnostic = async () => {
    if (!activeQuestion || !answers[activeQuestion.id]) {
      toast.error("יש לבחור תשובה לשאלה הנוכחית");
      return;
    }

    if (challengeQuestions.length === 0) {
      toast.error(questionsError || "שאלות האבחון עדיין לא נטענו");
      return;
    }

    // Client submits selections only — server scores authoritatively.
    const answerPayload = challengeQuestions.map((q) => ({
      questionId: q.id,
      selectedOptionId: answers[q.id],
    }));

    if (answerPayload.some((a) => !a.selectedOptionId)) {
      toast.error("יש לענות על כל השאלות לפני חישוב מדד המוכנות");
      return;
    }

    const timeframeObj = EXAM_TIMEFRAMES.find((t) => t.id === selectedTimeframe);
    const resolvedSubject = getDerivedSubject();
    const resolvedAgeGroup = activeTrack === "ACADEMIC" || activeTrack === "MECHINA" || activeTrack === "PSYCHOMETRIC"
      ? "ACADEMIC"
      : activeTrack === "SCREENING_INST"
        ? "ACADEMIC"
        : "HIGH_SCHOOL";

    setLoading(true);
    try {
      // Never cache explanations / reviews client-side.
      try {
        window.localStorage.removeItem(LEGACY_PENDING_REVIEWS_KEY);
      } catch {
        // Ignore storage failures.
      }

      const res = await fetch("/api/diagnostic/teaser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: studentName.trim() || "תלמיד",
          studentPhone: studentPhone.trim() || "0500000000",
          parentName: parentName.trim() || null,
          parentPhone: parentPhone.trim() || null,
          schoolName: schoolName.trim() || null,
          classTrack: activeTrack === "BAGRUT" ? `${bagrutUnitCount} יח״ל` : activeTrack,
          trackType: activeTrack,
          ageGroup: resolvedAgeGroup,
          subject: resolvedSubject,
          examNumber: activeTrack === "BAGRUT" ? bagrutExamCode : null,
          unitsCount: activeTrack === "BAGRUT" ? bagrutUnitCount : activeTrack === "PSYCHOMETRIC" ? hsMathUnits : null,
          degreeField: activeTrack === "ACADEMIC" ? selectedDegreeField.name : null,
          academicYear: activeTrack === "ACADEMIC" ? selectedYear.label : null,
          coreCourse: activeTrack === "ACADEMIC" ? selectedCourse : null,
          mechinaTrack: activeTrack === "MECHINA" ? mechinaTrackType : null,
          isFirstAttempt: activeTrack === "PSYCHOMETRIC" ? isFirstPsychometric : null,
          psychometricTotal: activeTrack === "PSYCHOMETRIC" && !isFirstPsychometric ? prevPsychTotal : null,
          psychometricQuant: activeTrack === "PSYCHOMETRIC" && !isFirstPsychometric ? prevPsychQuant : null,
          psychometricVerbal: activeTrack === "PSYCHOMETRIC" && !isFirstPsychometric ? prevPsychVerbal : null,
          psychometricEnglish: activeTrack === "PSYCHOMETRIC" && !isFirstPsychometric ? prevPsychEnglish : null,
          targetTestSession: activeTrack === "PSYCHOMETRIC" ? targetPsychSession : null,
          targetOrganization: activeTrack === "SCREENING_INST" ? selectedScreeningSector.name : null,
          testingInstitute: activeTrack === "SCREENING_INST" ? selectedScreeningInstitute.name : null,
          examBattery: activeTrack === "SCREENING_INST" ? screeningBattery : null,
          hasUpcomingExam: timeframeObj?.hasExam ?? true,
          examTimeframe: selectedTimeframe,
          learningGoal,
          lastGrade,
          challenge: `${learningGoal} - ${resolvedSubject}`,
          courseKey,
          answers: answerPayload,
          topicIds: [],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "שגיאה בעיבוד האבחון");
      }

      setTeaserData(data.data);
      if (data.data.isUnlocked) {
        setMicroStep(7);
      } else {
        setMicroStep(6);
      }
      toast.success("אבחון פערי הידע הושלם בהצלחה!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בחישוב האבחון");
    } finally {
      setLoading(false);
    }
  };

  const recommendedPackage =
    teaserData?.recommendation?.packageRecommendation ??
    (teaserData && teaserData.topicsCount >= 3 ? "MULTI" : "TRIO");
  const recommendedLessons =
    teaserData?.recommendation?.lessons ?? (recommendedPackage === "MULTI" ? 5 : 3);

  const stepLabel =
    microStep === 1 ? "בחירת מסלול לימודים" :
    microStep === 2 ? "אפיון מקצוע ודרישות" :
    microStep === 3 ? "פרטי התקשרות ומוסד" :
    microStep === 4 ? "דחיפות וציון בסיס" : `שאלות עומק (${currentQuestionIdx + 1}/3)`;

  return (
    <div className={`${pageCanvas}`} dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {microStep <= 5 && (
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
              <span className="text-neutral-900">
                שלב {microStep} מתוך {totalFunnelSteps}: {stepLabel}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-900 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* MICRO-STEP 1: TRACK SELECTION */}
        {microStep === 1 && (
          <section className={`${frostCard} p-6 sm:p-8 space-y-6`}>
            <div className="text-start">
              <span className={eyebrowClass}>שלב 1: מסלול לימודים מרכזי</span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mt-1 [text-wrap:balance]">
                באיזה תחום לימוד תרצו להתמקד?
              </h1>
              <p className="text-sm text-neutral-500 font-medium mt-2">
                התאמת תוכנית הלמידה והמיקוד לפי תחום הלימוד שנבחר
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-1">
              {TRACK_OPTIONS.map((track) => {
                const isSelected = activeTrack === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveTrack(track.id)}
                    className={`p-4 sm:p-5 rounded-2xl text-start transition-all flex items-center justify-between group ${
                      isSelected
                        ? "border-2 border-neutral-900 bg-neutral-50"
                        : "border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold tracking-tight text-neutral-700 p-3 bg-neutral-50 rounded-2xl border border-neutral-200 min-w-[3rem] text-center">
                        {track.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-semibold text-neutral-900">{track.title}</span>
                          <span className={trackBadge}>{track.tag}</span>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium mt-1">{track.subtitle}</p>
                      </div>
                    </div>

                    <span className={checkDotClass(isSelected)}>
                      {isSelected && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMicroStep(2)}
              className={`${primaryCta} w-full inline-flex items-center justify-center gap-2`}
            >
              <ArrowLeft className="me-2" />
              המשך לאפיון המסלול
            </button>
          </section>
        )}

        {/* MICRO-STEP 2: TRACK-SPECIFIC TAXONOMY */}
        {microStep === 2 && (
          <section className={`${frostCard} p-6 sm:p-8 space-y-6`}>
            <div className="text-start">
              <span className={eyebrowClass}>
                שלב 2: אפיון מקצוע ושאלון ({TRACK_OPTIONS.find((t) => t.id === activeTrack)?.title})
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1 [text-wrap:balance]">
                הגדירו את המקצוע ורמת הקושי המדויקת
              </h2>
            </div>

            {activeTrack === "BAGRUT" && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>מקצוע בגרות</label>
                  <select
                    value={bagrutSubjectId}
                    onChange={(e) => {
                      setBagrutSubjectId(e.target.value);
                      const subj = BAGRUT_SUBJECTS.find((s) => s.id === e.target.value);
                      if (subj && subj.units[0]) {
                        setBagrutUnitCount(subj.units[0].unitCount);
                        setBagrutExamCode(subj.units[0].examPapers[0]?.code || "");
                      }
                    }}
                    className={fieldClass}
                  >
                    {BAGRUT_SUBJECTS.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>מספר יחידות לימוד</label>
                    <select
                      value={bagrutUnitCount}
                      onChange={(e) => {
                        const count = Number(e.target.value);
                        setBagrutUnitCount(count);
                        const unitObj = availableBagrutUnits.find((u) => u.unitCount === count);
                        if (unitObj && unitObj.examPapers[0]) {
                          setBagrutExamCode(unitObj.examPapers[0].code);
                        }
                      }}
                      className={fieldClass}
                    >
                      {availableBagrutUnits.map((u) => (
                        <option key={u.unitCount} value={u.unitCount}>{u.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>מספר שאלון יעד</label>
                    <select
                      value={bagrutExamCode}
                      onChange={(e) => setBagrutExamCode(e.target.value)}
                      className={fieldClass}
                    >
                      {selectedBagrutUnit.examPapers.map((paper) => (
                        <option key={paper.code} value={paper.code}>{paper.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTrack === "ACADEMIC" && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>תחום התואר האקדמי</label>
                  <select
                    value={degreeFieldId}
                    onChange={(e) => {
                      setDegreeFieldId(e.target.value);
                      const field = ACADEMIC_DEGREE_FIELDS.find((d) => d.id === e.target.value);
                      if (field && field.years[0]) {
                        setAcademicYearId(field.years[0].yearId);
                        setSelectedCourse(field.years[0].courses[0] || "");
                      }
                    }}
                    className={fieldClass}
                  >
                    {ACADEMIC_DEGREE_FIELDS.map((deg) => (
                      <option key={deg.id} value={deg.id}>{deg.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>שנת לימודים</label>
                    <select
                      value={academicYearId}
                      onChange={(e) => {
                        setAcademicYearId(e.target.value);
                        const yr = selectedDegreeField.years.find((y) => y.yearId === e.target.value);
                        if (yr && yr.courses[0]) {
                          setSelectedCourse(yr.courses[0]);
                        }
                      }}
                      className={fieldClass}
                    >
                      {selectedDegreeField.years.map((y) => (
                        <option key={y.yearId} value={y.yearId}>{y.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>קורס הליבה המבוקש</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className={fieldClass}
                    >
                      {selectedYear.courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTrack === "MECHINA" && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>מקצוע מכינה מבוקש</label>
                  <select
                    value={mechinaSubject}
                    onChange={(e) => setMechinaSubject(e.target.value)}
                    className={fieldClass}
                  >
                    {MECHINA_SUBJECTS.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>מסלול המכינה</label>
                  <select
                    value={mechinaTrackType}
                    onChange={(e) => setMechinaTrackType(e.target.value)}
                    className={fieldClass}
                  >
                    {MECHINA_TRACK_TYPES.map((tr) => (
                      <option key={tr} value={tr}>{tr}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTrack === "PSYCHOMETRIC" && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>יחידות מתמטיקה בתיכון</label>
                    <select
                      value={hsMathUnits}
                      onChange={(e) => setHsMathUnits(Number(e.target.value))}
                      className={fieldClass}
                    >
                      {HS_UNIT_OPTIONS.map((opt) => (
                        <option key={opt.val} value={opt.val}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>יחידות אנגלית בתיכון</label>
                    <select
                      value={hsEnglishUnits}
                      onChange={(e) => setHsEnglishUnits(Number(e.target.value))}
                      className={fieldClass}
                    >
                      {HS_UNIT_OPTIONS.map((opt) => (
                        <option key={opt.val} value={opt.val}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-neutral-600 text-start">
                    האם נגשת כבר לפסיכומטרי בעבר?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFirstPsychometric(true)}
                      className={`p-3 rounded-2xl text-xs font-medium transition-all ${
                        isFirstPsychometric
                          ? "border-2 border-neutral-900 bg-neutral-50 text-neutral-900"
                          : "border border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"
                      }`}
                    >
                      פעם ראשונה שלי
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFirstPsychometric(false)}
                      className={`p-3 rounded-2xl text-xs font-medium transition-all ${
                        !isFirstPsychometric
                          ? "border-2 border-neutral-900 bg-neutral-50 text-neutral-900"
                          : "border border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"
                      }`}
                    >
                      נגשתי בעבר (שיפור ציון)
                    </button>
                  </div>
                </div>

                {isFirstPsychometric ? (
                  <div>
                    <label className={labelClass}>מועד בחינה יעד</label>
                    <select
                      value={targetPsychSession}
                      onChange={(e) => setTargetPsychSession(e.target.value)}
                      className={fieldClass}
                    >
                      {PSYCHOMETRIC_TEST_SESSIONS.map((sess) => (
                        <option key={sess} value={sess}>{sess}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-2xl space-y-3">
                    <h4 className="text-xs font-semibold text-neutral-700 text-start">ציוני מבחן קודם (מיקוד פערים)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1 text-start">ציון כללי</label>
                        <input
                          type="number"
                          min={200}
                          max={800}
                          value={prevPsychTotal}
                          onChange={(e) => setPrevPsychTotal(Number(e.target.value))}
                          className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1 text-start">כמותי (50-150)</label>
                        <input
                          type="number"
                          min={50}
                          max={150}
                          value={prevPsychQuant}
                          onChange={(e) => setPrevPsychQuant(Number(e.target.value))}
                          className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1 text-start">מילולי (50-150)</label>
                        <input
                          type="number"
                          min={50}
                          max={150}
                          value={prevPsychVerbal}
                          onChange={(e) => setPrevPsychVerbal(Number(e.target.value))}
                          className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1 text-start">אנגלית (50-150)</label>
                        <input
                          type="number"
                          min={50}
                          max={150}
                          value={prevPsychEnglish}
                          onChange={(e) => setPrevPsychEnglish(Number(e.target.value))}
                          className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTrack === "SCREENING_INST" && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>5.1 גוף יעד / סקטור מיונים</label>
                  <select
                    value={screeningSectorId}
                    onChange={(e) => {
                      setScreeningSectorId(e.target.value);
                      const sec = SCREENING_SECTORS.find((s) => s.id === e.target.value);
                      if (sec && sec.institutes[0]) {
                        setScreeningInstituteId(sec.institutes[0].id);
                        setScreeningBattery(sec.institutes[0].batteries[0] || "");
                      }
                    }}
                    className={fieldClass}
                  >
                    {SCREENING_SECTORS.map((sec) => (
                      <option key={sec.id} value={sec.id}>{sec.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>5.2 מכון מיון / מסגרת בחינה</label>
                  <select
                    value={screeningInstituteId}
                    onChange={(e) => {
                      setScreeningInstituteId(e.target.value);
                      const inst = selectedScreeningSector.institutes.find((i) => i.id === e.target.value);
                      if (inst && inst.batteries[0]) {
                        setScreeningBattery(inst.batteries[0]);
                      }
                    }}
                    className={fieldClass}
                  >
                    {selectedScreeningSector.institutes.map((inst) => (
                      <option key={inst.id} value={inst.id}>{inst.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>5.3 סוללת מבחנים מבוקשת</label>
                  <select
                    value={screeningBattery}
                    onChange={(e) => setScreeningBattery(e.target.value)}
                    className={fieldClass}
                  >
                    {selectedScreeningInstitute.batteries.map((bat) => (
                      <option key={bat} value={bat}>{bat}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMicroStep(1)}
                className={backBtnClass}
              >
                חזרה למסלולים
                <ArrowRight className="ms-2" />
              </button>
              <button
                type="button"
                onClick={() => setMicroStep(3)}
                className={proceedBtnClass}
              >
                <ArrowLeft className="me-2" />
                המשך לפרטי התקשרות
              </button>
            </div>
          </section>
        )}

        {/* MICRO-STEP 3: CONTACT & INSTITUTION */}
        {microStep === 3 && (
          <section className={`${frostCard} p-6 sm:p-8 space-y-6`}>
            <div className="text-start">
              <span className={eyebrowClass}>שלב 3: מוסד לימודים וחיבור הורים</span>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1 [text-wrap:balance]">
                פרטי התקשרות לליווי משותף
              </h2>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                קבוצת הווטסאפ המרובעת מחברת מנהל פדגוגי, מורה מומחה, הורה ותלמיד לעדכונים שוטפים.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="f-school">
                  שם בית ספר / מכללה / אוניברסיטה / יחידה
                </label>
                <input
                  id="f-school"
                  type="text"
                  placeholder="לדוגמה: תיכון הריאלי חיפה, אוניברסיטת תל אביב, מכינת הטכניון"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className={`${fieldClass} text-xs`}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1 text-start" htmlFor="f-sname">
                    שם התלמיד/ה <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="f-sname"
                    type="text"
                    required
                    placeholder="לדוגמה: יונתן כהן"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className={fieldClassSm}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1 text-start" htmlFor="f-sphone">
                    טלפון תלמיד/ה <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="f-sphone"
                    type="tel"
                    required
                    placeholder="050-0000000"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className={fieldClassSm}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1 text-start" htmlFor="f-pname">
                    שם ההורה (למעקב משותף)
                  </label>
                  <input
                    id="f-pname"
                    type="text"
                    placeholder="לדוגמה: רונית כהן"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className={fieldClassSm}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1 text-start" htmlFor="f-pphone">
                    WhatsApp הורה לקבלת סיכומי שיעור
                  </label>
                  <input
                    id="f-pphone"
                    type="tel"
                    placeholder="052-0000000"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className={fieldClassSm}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMicroStep(2)}
                className={backBtnClass}
              >
                חזרה
                <ArrowRight className="ms-2" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!studentName.trim() || !studentPhone.trim()) {
                    toast.error("נא למלא שם וטלפון תלמיד/ה");
                    return;
                  }
                  setMicroStep(4);
                }}
                className={proceedBtnClass}
              >
                <ArrowLeft className="me-2" />
                המשך לקביעת יעד ודחיפות
              </button>
            </div>
          </section>
        )}

        {/* MICRO-STEP 4: URGENCY, GOAL & BASELINE */}
        {microStep === 4 && (
          <section className={`${frostCard} p-6 sm:p-8 space-y-6`}>
            <div className="text-start">
              <span className={eyebrowClass}>שלב 4: מטרות ודחיפות</span>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1 [text-wrap:balance]">
                מתי המבחן הקרוב ומה ציון היעד?
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-2 text-start">דחיפות לוח זמנים</label>
                <div className="space-y-2">
                  {EXAM_TIMEFRAMES.map((tf) => {
                    const isSelected = selectedTimeframe === tf.id;
                    return (
                      <button
                        key={tf.id}
                        type="button"
                        onClick={() => setSelectedTimeframe(tf.id)}
                        className={`${choiceCardClass(isSelected)} text-xs font-medium`}
                      >
                        <span className={isSelected ? "text-neutral-900" : "text-neutral-600"}>{tf.label}</span>
                        <span className={checkDotClass(isSelected)}>{isSelected ? "✓" : ""}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-2 text-start">מטרת העל שלכם</label>
                <div className="space-y-2">
                  {LEARNING_GOALS.map((g) => {
                    const isSelected = learningGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setLearningGoal(g.id)}
                        className={choiceCardClass(isSelected)}
                      >
                        <div>
                          <span className="text-xs font-semibold text-neutral-900 block">{g.title}</span>
                          <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">{g.desc}</span>
                        </div>
                        <span className={checkDotClass(isSelected)}>{isSelected ? "✓" : ""}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-2 text-start">
                  ציון אחרון במקצוע / ציון בסיס נוכחי: {lastGrade}
                </label>
                <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-2xl space-y-2">
                  <input
                    type="range"
                    min={30}
                    max={100}
                    value={lastGrade}
                    onChange={(e) => setLastGrade(Number(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 font-medium">
                    <span>30 (פער עמוק)</span>
                    <span>65 (בינוני)</span>
                    <span>100 (מצוינות)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMicroStep(3)}
                className={backBtnClass}
              >
                חזרה
                <ArrowRight className="ms-2" />
              </button>
              <button
                type="button"
                onClick={() => setMicroStep(5)}
                className={proceedBtnClass}
              >
                <ArrowLeft className="me-2" />
                מעבר לשאלות העומק
              </button>
            </div>
          </section>
        )}

        {/* MICRO-STEP 5: 3-DOMAIN QUESTIONS */}
        {microStep === 5 && (
          <section className={`${frostCard} p-6 sm:p-8 space-y-6`}>
            {questionsLoading && (
              <div className="py-12 text-center text-sm font-medium text-neutral-500">
                טוען שאלות עומק...
              </div>
            )}

            {!questionsLoading && questionsError && (
              <div className="space-y-4 text-start">
                <p className="text-sm font-medium text-rose-600">{questionsError}</p>
                <button
                  type="button"
                  onClick={() => setMicroStep(4)}
                  className={backBtnClass}
                >
                  חזרה
                  <ArrowRight className="ms-2" />
                </button>
              </div>
            )}

            {!questionsLoading && !questionsError && activeQuestion && (
              <>
            <div className="flex items-center justify-between">
              <span className={`${trackBadge} text-neutral-700`}>
                שאלת עומק {currentQuestionIdx + 1} מתוך 3: {activeQuestion.domain}
              </span>
              <span className="text-xs font-mono font-medium text-neutral-400">
                שאלה {currentQuestionIdx + 1} / {challengeQuestions.length}
              </span>
            </div>

            <div className="text-start">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 [text-wrap:balance]">
                {activeQuestion.title}
              </h2>
              <p className="text-xs font-medium text-neutral-500 mt-1">
                {activeQuestion.context}
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3">
              <p className="text-xs text-neutral-600 font-medium text-start">{activeQuestion.instruction}</p>
              <div className="py-2 px-3 bg-white border border-neutral-200 rounded-xl">
                <MathFormula math={activeQuestion.formulaLatex} block className="text-base sm:text-lg text-neutral-800" />
              </div>
            </div>

            <div className="space-y-3">
              {activeQuestion.options.map((opt) => {
                const isSelected = answers[activeQuestion.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(activeQuestion.id, opt.id)}
                    className={choiceCardClass(isSelected)}
                  >
                    <div className="flex-1 pe-3">
                      {opt.mathText ? (
                        <MathFormula math={opt.mathText} className="text-sm font-medium text-neutral-800" />
                      ) : (
                        <span className="text-sm font-medium text-neutral-800">{opt.plainText}</span>
                      )}
                    </div>
                    <span className={checkDotClass(isSelected)}>
                      {isSelected && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              {currentQuestionIdx > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  className={backBtnClass}
                >
                  שאלה קודמת
                  <ArrowRight className="ms-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMicroStep(4)}
                  className={backBtnClass}
                >
                  חזרה
                  <ArrowRight className="ms-2" />
                </button>
              )}

              {currentQuestionIdx < challengeQuestions.length - 1 ? (
                <button
                  type="button"
                  disabled={!answers[activeQuestion.id]}
                  onClick={handleNextQuestion}
                  className={proceedBtnClass}
                >
                  <ArrowLeft className="me-2" />
                  שאלה הבאה
                </button>
              ) : (
                <button
                  type="button"
                  disabled={loading || !answers[activeQuestion.id]}
                  onClick={handleSubmitDiagnostic}
                  className={proceedBtnClass}
                >
                  <ArrowLeft className="me-2" />
                  {loading ? "מחשב מדד מוכנות..." : "חשב מדד מוכנות למבחן"}
                </button>
              )}
            </div>
              </>
            )}
          </section>
        )}

        {/* MICRO-STEP 6: TEASER PAYWALL — readiness gauge only + locked gap tree */}
        {microStep === 6 && teaserData && (
          <section className="space-y-6">
            <div className={`${frostCard} p-6 sm:p-8 space-y-4`}>
              <div className="text-start">
                <span className={trackBadge}>מדד מוכנות</span>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mt-2 text-start [text-wrap:balance]">
                  <span className="tabular-nums">{teaserData.estimatedScore}%</span> מדד מוכנות נוכחי
                </h2>
              </div>

              <div className="flex items-center justify-center my-2">
                <div className="relative w-40 h-40 rounded-full border border-white/70 flex items-center justify-center liquid-glass">
                  <div className="text-center">
                    <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900">
                      {teaserData.estimatedScore}%
                    </span>
                    <span className="block text-[10px] font-medium text-neutral-500 tracking-widest mt-1">
                      מדד מוכנות נוכחי
                    </span>
                  </div>
                </div>
              </div>

              {teaserData.sampleExplanation && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-start space-y-1">
                  <span className="text-[11px] font-medium text-neutral-500">דוגמת משוב (שאלה אחת)</span>
                  <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                    {teaserData.sampleExplanation}
                  </p>
                </div>
              )}
            </div>

            <div className={`${frostCard} p-6 sm:p-8 space-y-4`}>
              <div className="text-start">
                <h3 className="text-lg font-semibold text-neutral-900 text-start">עץ פערי ידע</h3>
                <p className="text-xs font-medium text-neutral-500 mt-0.5 text-start">
                  מיפוי פדגוגי מפורט — נעול עד רכישת חבילת למידה
                </p>
              </div>

              <div className="relative overflow-hidden max-h-[340px] rounded-2xl">
                <div className="space-y-3 select-none pointer-events-none" aria-hidden="true">
                  {(teaserData.maskedTopics && teaserData.maskedTopics.length > 0
                    ? teaserData.maskedTopics
                    : ([
                        { id: "gap-a", maskedName: "מוקד פער א׳", weightInExam: 0.22, isLocked: true },
                        { id: "gap-b", maskedName: "מוקד פער ב׳", weightInExam: 0.18, isLocked: true },
                        { id: "gap-c", maskedName: "מוקד פער ג׳", weightInExam: 0.15, isLocked: true },
                      ] as MaskedTopic[])
                  ).map((t) => (
                    <div
                      key={t.id}
                      className="liquid-glass rounded-2xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-neutral-800 text-start">{t.maskedName}</span>
                        <span className={trackBadge}>
                          {Math.round(t.weightInExam * 100)}% משקל בבחינה
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-start">
                        <span className="h-4 w-28 bg-neutral-100/80 rounded-md" />
                        <span className="h-4 w-36 bg-neutral-100/80 rounded-md" />
                        <span className="h-4 w-20 bg-neutral-100/80 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 backdrop-blur-xl bg-white/70 flex flex-col items-center justify-center p-6 text-center z-20 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
                    <LockIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-900">
                    מיפוי פערי הידע המלא נעול
                  </h4>
                  <p className="max-w-md text-sm font-medium text-neutral-700 leading-relaxed">
                    הגישה למערך התרגול המותאם, תוכנית הלמידה האישית ושיבוץ המרצה פתוחים לרוכשי חבילות למידה בלבד.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${frostCard} p-6 sm:p-8 space-y-5`}>
              <div className="text-start space-y-1">
                <span className={trackBadge}>המלצת חבילה לפי עומק הפערים</span>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 text-start mt-2">
                  {recommendedPackage === "MULTI"
                    ? "חבילת MULTI — 5 שיעורים · ₪800"
                    : "חבילת TRIO — 3 שיעורים · ₪510"}
                </h3>
                <p className="text-xs text-neutral-500 font-medium text-start leading-relaxed">
                  {recommendedPackage === "MULTI"
                    ? "זוהו 3+ מוקדי פער — מומלץ מסלול MULTI לכיסוי מעמיק לפני הבחינה."
                    : "זוהו 1–2 מוקדי פער — חבילת TRIO מספיקה למיקוד ממוקד ופתיחת הדו״ח המלא."}
                </p>
              </div>
              <Link
                href={`/pricing?package=${recommendedPackage}`}
                className={`${primaryCta} inline-flex items-center justify-center gap-2 text-sm w-full`}
              >
                <ArrowLeft className="me-2" />
                פתיחת הדו״ח המלא ורכישת חבילת למידה
              </Link>
              <p className="text-[11px] text-neutral-400 font-medium text-start">
                {recommendedLessons} שיעורים · עץ הפערים המלא נפתח לאחר הרכישה בלבד · ללא שיבוץ שיעור לפני תשלום
              </p>
            </div>
          </section>
        )}

        {/* MICRO-STEP 7: UNLOCKED KNOWLEDGE TREE (paid / credited only) */}
        {microStep === 7 && teaserData && (
          <section className={`${frostCard} p-6 sm:p-8 space-y-6`}>
            <div className="border-b border-neutral-200/80 pb-5 text-start">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 [text-wrap:balance]">
                עץ פערי ידע מלא — {getDerivedSubject()}
              </h2>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                {teaserData.estimatedScore}% מדד מוכנות
              </p>
            </div>

            {teaserData.matchedTeacher && (
              <div className="bg-neutral-900/[0.03] border border-neutral-900/[0.08] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium">
                      מ
                    </span>
                    <div className="text-start">
                      <h4 className="text-sm font-semibold text-neutral-900">
                        המורה המומחה שלך: {teaserData.matchedTeacher.teacherName}
                      </h4>
                      <p className="text-xs text-neutral-500 font-medium">
                        ציון התאמה פדגוגי: {teaserData.matchedTeacher.matchScore}% · {teaserData.matchedTeacher.openSlotsCount} משבצות פנויות
                      </p>
                    </div>
                  </div>

                  {teaserData.quadGroupUrl && (
                    <a
                      href={teaserData.quadGroupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${primaryCta} text-xs py-2 px-4`}
                    >
                      כניסה לקבוצת הווטסאפ המרובעת
                    </a>
                  )}
                </div>

                {teaserData.matchedTeacher.reasons.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-start pt-1">
                    {teaserData.matchedTeacher.reasons.map((r, i) => (
                      <span key={i} className={trackBadge}>
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-700 text-start">נושאי מיקוד הדורשים ליטוש:</h3>
              {teaserData.topics && teaserData.topics.length > 0 ? (
                teaserData.topics.map((t) => (
                  <div
                    key={t.id}
                    className={`${frostCard} p-4 space-y-2`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-neutral-900 text-start">{t.topicName}</h4>
                      <span className={trackBadge}>
                        {Math.round(t.weightInExam * 100)}% משקל בבחינה
                      </span>
                    </div>

                    {Array.isArray(t.subTopics) && t.subTopics.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-start">
                        {t.subTopics.map((sub: string, i: number) => (
                          <span key={i} className={trackBadge}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-6 text-neutral-400 text-xs font-medium text-start">
                  לא זוהו נושאים ספציפיים במערכת — המורה המומחה יבצע מיפוי פרטני בשיעור הראשון.
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
