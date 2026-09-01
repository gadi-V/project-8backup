"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import MathFormula from "../../../components/MathFormula";
import {
  DIAGNOSTIC_3_DOMAIN_QUESTIONS,
  type DiagnosticQuestion,
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

export default function OnboardingDiagnosticPage() {
  const router = useRouter();

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
  const [unlocking, setUnlocking] = useState(false);
  const [dispatchWorking, setDispatchWorking] = useState(false);

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
  const [bagrutExamCode, setBagrutExamCode] = useState("582");

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

  // Teaser & Quad Data
  const [teaserData, setTeaserData] = useState<TeaserResult | null>(null);

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

  const activeQuestion: DiagnosticQuestion = DIAGNOSTIC_3_DOMAIN_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    if (!answers[activeQuestion.id]) {
      toast.error("יש לבחור תשובה כדי להמשיך לשאלה הבאה");
      return;
    }
    if (currentQuestionIdx < DIAGNOSTIC_3_DOMAIN_QUESTIONS.length - 1) {
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
    if (!answers[activeQuestion.id]) {
      toast.error("יש לבחור תשובה לשאלה הנוכחית");
      return;
    }

    let correctCount = 0;
    const answerSummaries: string[] = [];

    DIAGNOSTIC_3_DOMAIN_QUESTIONS.forEach((q) => {
      const selectedOptId = answers[q.id];
      const opt = q.options.find((o) => o.id === selectedOptId);
      if (opt?.isCorrect) {
        correctCount++;
      }
      answerSummaries.push(`${q.domain}: ${opt?.mathText || opt?.plainText || "לא נענה"}`);
    });

    const timeframeObj = EXAM_TIMEFRAMES.find((t) => t.id === selectedTimeframe);
    const resolvedSubject = getDerivedSubject();
    const resolvedAgeGroup = activeTrack === "ACADEMIC" || activeTrack === "MECHINA" || activeTrack === "PSYCHOMETRIC" 
      ? "ACADEMIC" 
      : activeTrack === "SCREENING_INST" 
        ? "ACADEMIC" 
        : "HIGH_SCHOOL";

    setLoading(true);
    try {
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
          challengeAnswer: answerSummaries.join(" | "),
          correctCount,
          totalQuestions: DIAGNOSTIC_3_DOMAIN_QUESTIONS.length,
          isChallengeCorrect: correctCount === DIAGNOSTIC_3_DOMAIN_QUESTIONS.length,
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

  const handleOpenQuadEcosystem = async () => {
    if (!teaserData?.id) return;
    setDispatchWorking(true);
    try {
      const pkg = teaserData.recommendation?.packageRecommendation ?? "TRIO";
      const res = await fetch("/api/whatsapp/dispatch-channel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageType: pkg,
          studentName: studentName.trim() || "תלמיד",
          gapTopicsCount: teaserData.topicsCount,
          gapTopicsNames: teaserData.maskedTopics?.map((m) => m.maskedName) ?? [],
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "פתיחת קבוצת הליווי נכשלה");
      }
      toast.success("נפתחה קבוצת WhatsApp מרובעת ייעודית");
      if (data.data.quadGroupUrl) {
        window.open(data.data.quadGroupUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בפתיחת קבוצת הליווי");
    } finally {
      setDispatchWorking(false);
    }
  };

  const handleUnlockAndMatch = async () => {
    if (!teaserData?.id) return;
    setUnlocking(true);
    try {
      const res = await fetch("/api/diagnostic/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diagnosticId: teaserData.id }),
      });

      const data = await res.json();
      if (res.status === 401) {
        toast("יש להתחבר כדי לפתוח את הדו״ח המלא", { icon: "🔒" });
        router.push("/login?from=/onboarding/diagnostic");
        return;
      }

      if (res.status === 402 || data.requiresPurchase) {
        toast.error("נדרשת יתרת שיעורים לפתיחת העץ הפדגוגי ושיבוץ המורה");
        router.push("/pricing");
        return;
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || "פתיחת הדו״ח נכשלה");
      }

      setTeaserData(data.data);
      setMicroStep(7);
      toast.success("העץ הפדגוגי נפתח ושובץ מורה מומחה! 🎓");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בפתיחת הדו״ח");
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-violet-500 selection:text-white" dir="rtl">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-violet-500/25">
              P8
            </span>
            <span className="text-lg font-black tracking-tight text-white">Project8 Academy</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 px-3 py-1.5 rounded-full">
            <span>🛡️</span>
            <span>Quad-Ecosystem: מורים שכירים + התחייבות לתוצאות</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Dynamic Journey Progress Bar */}
        {microStep <= 5 && (
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-black text-slate-400">
              <span className="text-violet-400">
                שלב {microStep} מתוך {totalFunnelSteps}: {
                  microStep === 1 ? "בחירת מסלול לימודים" :
                  microStep === 2 ? "אפיון מקצוע ודרישות" :
                  microStep === 3 ? "פרטי התקשרות ומוסד" :
                  microStep === 4 ? "דחיפות וציון בסיס" : `שאלות עומק (${currentQuestionIdx + 1}/3)`
                }
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MICRO-STEP 1: TRACK SELECTION (5 Main Tracks)                      */}
        {/* ================================================================== */}
        {microStep === 1 && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-violet-950/20">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-400">שלב 1: מסלול לימודים מרכזי</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">באיזה תחום אתם צריכים שדרוג הישגים?</h1>
              <p className="text-sm text-slate-400 font-medium mt-1">
                מערכת ה-AI תתאים את תוכנית ההכשרה, מוקדי הידע ומבחן האתגר בהתאם למסלול הנבחר.
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-1">
              {TRACK_OPTIONS.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrack(track.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-right transition-all flex items-center justify-between group ${
                    activeTrack === track.id
                      ? "bg-violet-950/70 border-violet-500 ring-2 ring-violet-500/30"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl p-3 bg-slate-900 rounded-2xl border border-slate-800 group-hover:border-slate-700">
                      {track.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white">{track.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-violet-300 border border-slate-700">
                          {track.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-1">{track.subtitle}</p>
                    </div>
                  </div>

                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                    activeTrack === track.id ? "bg-violet-600 border-violet-500 text-white" : "border-slate-700"
                  }`}>
                    {activeTrack === track.id && "✓"}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMicroStep(2)}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
            >
              המשך לאפיון המסלול ←
            </button>
          </section>
        )}

        {/* ================================================================== */}
        {/* MICRO-STEP 2: TRACK-SPECIFIC CASCADING TAXONOMY                    */}
        {/* ================================================================== */}
        {microStep === 2 && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-400">
                שלב 2: אפיון מקצוע ושאלון ({TRACK_OPTIONS.find(t => t.id === activeTrack)?.title})
              </span>
              <h2 className="text-2xl font-black text-white mt-1">הגדירו את המקצוע ורמת הקושי המדויקת</h2>
            </div>

            {/* TRACK 1: BAGRUT CASCADING */}
            {activeTrack === "BAGRUT" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">מקצוע בגרות</label>
                  <select
                    value={bagrutSubjectId}
                    onChange={(e) => {
                      setBagrutSubjectId(e.target.value);
                      const subj = BAGRUT_SUBJECTS.find(s => s.id === e.target.value);
                      if (subj && subj.units[0]) {
                        setBagrutUnitCount(subj.units[0].unitCount);
                        setBagrutExamCode(subj.units[0].examPapers[0]?.code || "");
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                  >
                    {BAGRUT_SUBJECTS.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">מספר יחידות לימוד</label>
                    <select
                      value={bagrutUnitCount}
                      onChange={(e) => {
                        const count = Number(e.target.value);
                        setBagrutUnitCount(count);
                        const unitObj = availableBagrutUnits.find(u => u.unitCount === count);
                        if (unitObj && unitObj.examPapers[0]) {
                          setBagrutExamCode(unitObj.examPapers[0].code);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                    >
                      {availableBagrutUnits.map((u) => (
                        <option key={u.unitCount} value={u.unitCount}>{u.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">מספר שאלון יעד</label>
                    <select
                      value={bagrutExamCode}
                      onChange={(e) => setBagrutExamCode(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                    >
                      {selectedBagrutUnit.examPapers.map((paper) => (
                        <option key={paper.code} value={paper.code}>{paper.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TRACK 2: ACADEMIC CASCADING */}
            {activeTrack === "ACADEMIC" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">תחום התואר האקדמי</label>
                  <select
                    value={degreeFieldId}
                    onChange={(e) => {
                      setDegreeFieldId(e.target.value);
                      const field = ACADEMIC_DEGREE_FIELDS.find(d => d.id === e.target.value);
                      if (field && field.years[0]) {
                        setAcademicYearId(field.years[0].yearId);
                        setSelectedCourse(field.years[0].courses[0] || "");
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                  >
                    {ACADEMIC_DEGREE_FIELDS.map((deg) => (
                      <option key={deg.id} value={deg.id}>{deg.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">שנת לימודים</label>
                    <select
                      value={academicYearId}
                      onChange={(e) => {
                        setAcademicYearId(e.target.value);
                        const yr = selectedDegreeField.years.find(y => y.yearId === e.target.value);
                        if (yr && yr.courses[0]) {
                          setSelectedCourse(yr.courses[0]);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                    >
                      {selectedDegreeField.years.map((y) => (
                        <option key={y.yearId} value={y.yearId}>{y.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">קורס הליבה המבוקש</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                    >
                      {selectedYear.courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TRACK 3: MECHINA CASCADING */}
            {activeTrack === "MECHINA" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">מקצוע מכינה מבוקש</label>
                  <select
                    value={mechinaSubject}
                    onChange={(e) => setMechinaSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                  >
                    {MECHINA_SUBJECTS.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">מסלול המכינה</label>
                  <select
                    value={mechinaTrackType}
                    onChange={(e) => setMechinaTrackType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                  >
                    {MECHINA_TRACK_TYPES.map((tr) => (
                      <option key={tr} value={tr}>{tr}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* TRACK 4: PSYCHOMETRIC CASCADING */}
            {activeTrack === "PSYCHOMETRIC" && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">יחידות מתמטיקה בתיכון</label>
                    <select
                      value={hsMathUnits}
                      onChange={(e) => setHsMathUnits(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-medium"
                    >
                      {HS_UNIT_OPTIONS.map((opt) => (
                        <option key={opt.val} value={opt.val}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">יחידות אנגלית בתיכון</label>
                    <select
                      value={hsEnglishUnits}
                      onChange={(e) => setHsEnglishUnits(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-medium"
                    >
                      {HS_UNIT_OPTIONS.map((opt) => (
                        <option key={opt.val} value={opt.val}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">האם נגשת כבר לפסיכומטרי בעבר?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFirstPsychometric(true)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        isFirstPsychometric ? "bg-violet-950 border-violet-500 text-white" : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      פעם ראשונה שלי
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFirstPsychometric(false)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        !isFirstPsychometric ? "bg-violet-950 border-violet-500 text-white" : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      נגשתי בעבר (שיפור ציון)
                    </button>
                  </div>
                </div>

                {isFirstPsychometric ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">מועד בחינה יעד</label>
                    <select
                      value={targetPsychSession}
                      onChange={(e) => setTargetPsychSession(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                    >
                      {PSYCHOMETRIC_TEST_SESSIONS.map((sess) => (
                        <option key={sess} value={sess}>{sess}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                    <h4 className="text-xs font-black text-violet-300">ציוני מבחן קודם (מיקוד פערים)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">ציון כללי</label>
                        <input
                          type="number"
                          min={200}
                          max={800}
                          value={prevPsychTotal}
                          onChange={(e) => setPrevPsychTotal(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">כמותי (50-150)</label>
                        <input
                          type="number"
                          min={50}
                          max={150}
                          value={prevPsychQuant}
                          onChange={(e) => setPrevPsychQuant(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">מילולי (50-150)</label>
                        <input
                          type="number"
                          min={50}
                          max={150}
                          value={prevPsychVerbal}
                          onChange={(e) => setPrevPsychVerbal(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">אנגלית (50-150)</label>
                        <input
                          type="number"
                          min={50}
                          max={150}
                          value={prevPsychEnglish}
                          onChange={(e) => setPrevPsychEnglish(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TRACK 5: SCREENING INSTITUTES CASCADING */}
            {activeTrack === "SCREENING_INST" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">5.1 גוף יעד / סקטור מיונים</label>
                  <select
                    value={screeningSectorId}
                    onChange={(e) => {
                      setScreeningSectorId(e.target.value);
                      const sec = SCREENING_SECTORS.find(s => s.id === e.target.value);
                      if (sec && sec.institutes[0]) {
                        setScreeningInstituteId(sec.institutes[0].id);
                        setScreeningBattery(sec.institutes[0].batteries[0] || "");
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                  >
                    {SCREENING_SECTORS.map((sec) => (
                      <option key={sec.id} value={sec.id}>{sec.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">5.2 מכון מיון / מסגרת בחינה</label>
                  <select
                    value={screeningInstituteId}
                    onChange={(e) => {
                      setScreeningInstituteId(e.target.value);
                      const inst = selectedScreeningSector.institutes.find(i => i.id === e.target.value);
                      if (inst && inst.batteries[0]) {
                        setScreeningBattery(inst.batteries[0]);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
                  >
                    {selectedScreeningSector.institutes.map((inst) => (
                      <option key={inst.id} value={inst.id}>{inst.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">5.3 סוללת מבחנים מבוקשת</label>
                  <select
                    value={screeningBattery}
                    onChange={(e) => setScreeningBattery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 font-medium"
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
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                חזרה למסלולים
              </button>
              <button
                type="button"
                onClick={() => setMicroStep(3)}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-violet-600/30"
              >
                המשך לפרטי התקשרות ←
              </button>
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* MICRO-STEP 3: CONTACT & INSTITUTION INFO                           */}
        {/* ================================================================== */}
        {microStep === 3 && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-400">שלב 3: מוסד לימודים וחיבור הורים</span>
              <h2 className="text-2xl font-black text-white mt-1">פרטי התקשרות והצטרפות ל-Quad Ecosystem</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">
                מערכת ה-Quad מחברת את התלמיד, ההורים, מורה מומחה ומנהל פדגוגי לעדכונים שוטפים.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5" htmlFor="f-school">
                  שם בית ספר / מכללה / אוניברסיטה / יחידה
                </label>
                <input
                  id="f-school"
                  type="text"
                  placeholder="לדוגמה: תיכון הריאלי חיפה, אוניברסיטת תל אביב, מכינת הטכניון"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-violet-500 font-medium"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1" htmlFor="f-sname">
                    שם התלמיד/ה <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="f-sname"
                    type="text"
                    required
                    placeholder="לדוגמה: יונתן כהן"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-violet-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1" htmlFor="f-sphone">
                    טלפון תלמיד/ה <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="f-sphone"
                    type="tel"
                    required
                    placeholder="050-0000000"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-violet-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1" htmlFor="f-pname">
                    שם ההורה (למעקב משותף)
                  </label>
                  <input
                    id="f-pname"
                    type="text"
                    placeholder="לדוגמה: רונית כהן"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1" htmlFor="f-pphone">
                    WhatsApp הורה לקבלת סיכומי שיעור
                  </label>
                  <input
                    id="f-pphone"
                    type="tel"
                    placeholder="052-0000000"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMicroStep(2)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                חזרה
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
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-violet-600/30"
              >
                המשך לקביעת יעד ודחיפות ←
              </button>
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* MICRO-STEP 4: URGENCY, GOAL & BASELINE GRADE                       */}
        {/* ================================================================== */}
        {microStep === 4 && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-400">שלב 4: מטרות ודחיפות</span>
              <h2 className="text-2xl font-black text-white mt-1">מתי המבחן הקרוב ומה ציון היעד?</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">דחיפות לוח זמנים</label>
                <div className="space-y-2">
                  {EXAM_TIMEFRAMES.map((tf) => (
                    <button
                      key={tf.id}
                      type="button"
                      onClick={() => setSelectedTimeframe(tf.id)}
                      className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-center justify-between text-xs font-black ${
                        selectedTimeframe === tf.id
                          ? "bg-violet-950/60 border-violet-500 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      <span>{tf.label}</span>
                      <span>{selectedTimeframe === tf.id ? "✓" : ""}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">מטרת העל שלכם</label>
                <div className="space-y-2">
                  {LEARNING_GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setLearningGoal(g.id)}
                      className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                        learningGoal === g.id
                          ? "bg-violet-950/60 border-violet-500"
                          : "bg-slate-950 border-slate-800"
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black text-white block">{g.title}</span>
                        <span className="text-[11px] text-slate-400 font-medium block mt-0.5">{g.desc}</span>
                      </div>
                      <span className="text-xs font-bold text-violet-400">{learningGoal === g.id ? "✓" : ""}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">ציון אחרון במקצוע / ציון בסיס נוכחי: {lastGrade}</label>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <input
                    type="range"
                    min={30}
                    max={100}
                    value={lastGrade}
                    onChange={(e) => setLastGrade(Number(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-bold">
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
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                חזרה
              </button>
              <button
                type="button"
                onClick={() => setMicroStep(5)}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-violet-600/30"
              >
                מעבר למבחן 3 שאלות העומק ⚡
              </button>
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* MICRO-STEP 5: 3-DOMAIN LATEX EXAM SUITE                            */}
        {/* ================================================================== */}
        {microStep === 5 && activeQuestion && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -start-12 w-40 h-40 bg-violet-600/20 blur-3xl -z-0" />

            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 bg-rose-950/80 border border-rose-800/80 text-rose-300 rounded-full text-xs font-black">
                ⚠️ שאלת עומק {currentQuestionIdx + 1} מתוך 3: {activeQuestion.domain}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                שאלה {currentQuestionIdx + 1} / {DIAGNOSTIC_3_DOMAIN_QUESTIONS.length}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {activeQuestion.title}
              </h2>
              <p className="text-xs font-bold text-slate-400 mt-1">
                {activeQuestion.context}
              </p>
            </div>

            {/* LaTeX Formula Display Card with strict LTR isolation */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <p className="text-xs text-slate-300 font-medium">{activeQuestion.instruction}</p>
              <div className="py-2 px-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                <MathFormula math={activeQuestion.formulaLatex} block className="text-base sm:text-lg text-indigo-300" />
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {activeQuestion.options.map((opt) => {
                const isSelected = answers[activeQuestion.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(activeQuestion.id, opt.id)}
                    className={`w-full p-4 rounded-xl border text-right transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-violet-950/80 border-violet-500 ring-2 ring-violet-500/30"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex-1 pe-3">
                      {opt.mathText ? (
                        <MathFormula math={opt.mathText} className="text-sm font-bold text-slate-100" />
                      ) : (
                        <span className="text-sm font-bold text-slate-100">{opt.plainText}</span>
                      )}
                    </div>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                      isSelected ? "bg-violet-600 border-violet-500 text-white" : "border-slate-700"
                    }`}>
                      {isSelected && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons for 3-Domain Questions */}
            <div className="flex gap-3 pt-2">
              {currentQuestionIdx > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  שאלה קודמת
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMicroStep(4)}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  חזרה
                </button>
              )}

              {currentQuestionIdx < DIAGNOSTIC_3_DOMAIN_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  disabled={!answers[activeQuestion.id]}
                  onClick={handleNextQuestion}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-violet-600/30 disabled:opacity-40"
                >
                  שאלה הבאה ←
                </button>
              ) : (
                <button
                  type="button"
                  disabled={loading || !answers[activeQuestion.id]}
                  onClick={handleSubmitDiagnostic}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-violet-600/30 disabled:opacity-40"
                >
                  {loading ? "מחשב מדד מוכנות פדגוגי משוקלל..." : "חשב מדד מוכנות סופי למבחן 🎯"}
                </button>
              )}
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* MICRO-STEP 6: TEASER PAYWALL & WAKE-UP GAUGE                       */}
        {/* ================================================================== */}
        {microStep === 6 && teaserData && (
          <section className="space-y-6">
            {/* Urgency Readiness Gauge */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-900/60 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 start-1/2 -translate-x-1/2 w-72 h-36 bg-rose-600/20 blur-3xl -z-0" />

              <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-rose-950/90 text-rose-300 border border-rose-800/80">
                🚨 התראת מוכנות פדגוגית קריטית
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                מדד מוכנות למבחן ({getDerivedSubject()}): {teaserData.estimatedScore}%
              </h2>

              <div className="flex items-center justify-center my-4">
                <div className="relative w-40 h-40 rounded-full border-4 border-rose-500/50 flex items-center justify-center bg-slate-950/90 shadow-2xl shadow-rose-950/50">
                  <div className="text-center">
                    <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300">
                      {teaserData.estimatedScore}%
                    </span>
                    <span className="block text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1">
                      רמת סיכון גבוהה
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/90 border border-rose-900/50 rounded-2xl p-4 max-w-lg mx-auto text-xs font-bold text-rose-200 leading-relaxed">
                {teaserData.recommendationSummary}
              </div>
            </div>

            {/* Hard Gated Blurred Knowledge Tree Paywall */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white">עץ פערי הידע של תכנית הלימודים</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    זוהו {teaserData.topicsCount} מוקדי פער קריטיים שעלולים להכשיל בבחינה
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span>🔒</span> נעול עד רכישה
                </span>
              </div>

              {/* Blurred Masked Topic Cards (Guaranteed zero real data leak) */}
              <div className="space-y-3 relative">
                <div className="space-y-3 filter blur-md select-none pointer-events-none opacity-40" aria-hidden="true">
                  {teaserData.maskedTopics?.map((t, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-slate-200">{t.maskedName}</span>
                        <span className="text-xs font-black text-violet-400 bg-violet-950 px-2.5 py-1 rounded-lg">
                          {Math.round(t.weightInExam * 100)}% משקל בבחינה
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="h-4 w-28 bg-slate-800 rounded-md" />
                        <span className="h-4 w-36 bg-slate-800 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overlaid Hard Paywall & Quad Value Proposition */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/90 backdrop-blur-lg rounded-2xl border border-violet-500/50 text-center space-y-4 shadow-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/40">
                    🛡️
                  </div>

                  <div className="max-w-md space-y-2">
                    <h4 className="text-base sm:text-xl font-black text-white">
                      פתיחת מעטפת הליווי והצלת ציון הבגרות
                    </h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      חיבור מיידי של התלמיד, מורה שכיר מומחה, ההורים והמנהל הפדגוגי לקבוצת WhatsApp ייעודית עם תוכנית עבודה אישית לסגירת הפערים.
                    </p>
                    {teaserData.recommendation && (
                      <div className="inline-flex items-center gap-2 rounded-xl bg-violet-950/70 border border-violet-700/60 px-3 py-1.5 text-xs font-black text-violet-200">
                        <span>ההמלצה הפדגוגית עבורך</span>
                        <span className="rounded-lg bg-violet-600 px-2 py-0.5 text-white">
                          {teaserData.recommendation.packageRecommendation === "MULTI"
                            ? "Multi · 5 שיעורים"
                            : "Trio · 3 שיעורים"}
                        </span>
                        <span>
                          ({teaserData.topicsCount} {teaserData.topicsCount === 1 ? "נושא" : "נושאים"})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-2">
                    <button
                      type="button"
                      disabled={unlocking}
                      onClick={handleUnlockAndMatch}
                      className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-xs font-black py-3.5 rounded-xl transition-all shadow-lg shadow-violet-600/30"
                    >
                      {unlocking ? "משבץ מורה מומחה..." : "פתח עם שיעורים קיימים ✓"}
                    </button>
                    <button
                      type="button"
                      disabled={dispatchWorking}
                      onClick={handleOpenQuadEcosystem}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30 disabled:opacity-50"
                    >
                      {dispatchWorking ? "פותח קבוצת ליווי..." : "כניסה למעטפת הליווי ופתיחת קבוצה מרובעת"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <Link
                      href={
                        teaserData.recommendation?.packageRecommendation === "MULTI"
                          ? "/pricing?package=MULTI"
                          : "/pricing?package=TRIO"
                      }
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black py-3.5 rounded-xl text-center transition-all shadow-lg shadow-emerald-600/30"
                    >
                      רכישת החבילה המומלצת ⚡
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3.5 rounded-xl text-center transition-colors"
                    >
                      לכל החבילות
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* MICRO-STEP 7: UNLOCKED KNOWLEDGE TREE                              */}
        {/* ================================================================== */}
        {microStep === 7 && teaserData && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/60">
                  ✓ דו״ח פדגוגי פתוח ומאומת
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  עץ פערי ידע מלא — {getDerivedSubject()}
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  ציון מוכנות נוכחי: {teaserData.estimatedScore}%
                </p>
              </div>

              <Link
                href="/dashboard"
                className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-colors shrink-0"
              >
                מעבר ללוח השעות ←
              </Link>
            </div>

            {/* Matched Teacher & Quad Group Hub */}
            {teaserData.matchedTeacher && (
              <div className="bg-gradient-to-r from-violet-950/60 to-indigo-950/60 border border-violet-800/50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-lg font-black">
                      👨‍🏫
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-white">
                        המורה המומחה שלך: {teaserData.matchedTeacher.teacherName}
                      </h4>
                      <p className="text-xs text-violet-300 font-medium">
                        ציון התאמה פדגוגי: {teaserData.matchedTeacher.matchScore}% · {teaserData.matchedTeacher.openSlotsCount} משבצות פנויות
                      </p>
                    </div>
                  </div>

                  {teaserData.quadGroupUrl && (
                    <a
                      href={teaserData.quadGroupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>💬</span> כניסה לקבוצת ה-Quad ב-WhatsApp
                    </a>
                  )}
                </div>

                {teaserData.matchedTeacher.reasons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {teaserData.matchedTeacher.reasons.map((r, i) => (
                      <span key={i} className="text-[10px] font-bold bg-violet-900/50 text-violet-200 px-2 py-0.5 rounded-md">
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Unlocked Topics List */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-300">נושאי מיקוד הדורשים ליטוש מיידי:</h3>
              {teaserData.topics && teaserData.topics.length > 0 ? (
                teaserData.topics.map((t) => (
                  <div
                    key={t.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-white">{t.topicName}</h4>
                      <span className="text-xs font-black bg-indigo-950 text-indigo-300 border border-indigo-800/50 px-2.5 py-1 rounded-lg">
                        {Math.round(t.weightInExam * 100)}% משקל בבחינה
                      </span>
                    </div>

                    {Array.isArray(t.subTopics) && t.subTopics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {t.subTopics.map((sub: string, i: number) => (
                          <span
                            key={i}
                            className="text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg"
                          >
                            🎯 {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs font-bold">
                  לא זוהו נושאים ספציפיים במערכת — המורה המומחה יבצע מיפוי פרטני בשיעור הראשון.
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-slate-200">מוכנים לשיעור הראשון?</p>
                <p className="text-[11px] text-slate-400 font-medium">המורה המומחה והמנהל הפדגוגי כבר קיבלו את דו״ח האבחון המלא שלך.</p>
              </div>
              <Link
                href="/dashboard"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20"
              >
                בחירת מועד לשיעור בלוח ⚡
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
