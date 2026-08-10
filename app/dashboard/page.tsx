"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import TeacherOnboardingTimeline from "../../components/TeacherOnboardingTimeline";
import type { TeacherOnboardingStatus } from "../../lib/teacher-onboarding";

interface LoggedInUser {
  id: string;
  name: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  lessonCredits: number;
  isApproved: boolean;
}

interface AvailabilitySlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface OpenBookingSlot extends AvailabilitySlot {
  teacher: {
    id: string;
    name: string;
    teacherProfile?: {
      subjects: string[];
      ageGroups?: string[];
      bio: string | null;
    } | null;
  };
}

interface Lesson {
  id: string;
  title: string | null;
  scheduledAt: string;
  status: string;
  teacher: { id: string; name: string };
  student: { id: string; name: string };
}

interface TeacherMatch {
  teacherId: string;
  teacherName: string;
  matchScore: number;
  reasons: string[];
  referralCount: number;
  activeStudentsCount: number;
  openSlotsCount: number;
  bio: string | null;
  subjects: string[];
  ageGroups: string[];
}

interface TeacherProfileForm {
  subjectsText: string;
  ageGroups: string[];
  bio: string;
  profileImageUrl: string;
  referralCount: number;
  activeStudentsCount: number;
  lastReferralAt: string | null;
}

const AGE_GROUP_OPTIONS = ["יסודי", "חטיבה", "תיכון", "אקדמיה"] as const;

const DAYS_OF_WEEK = [
  { label: "א'", key: 0 },
  { label: "ב'", key: 1 },
  { label: "ג'", key: 2 },
  { label: "ד'", key: 3 },
  { label: "ה'", key: 4 },
  { label: "ו'", key: 5 },
  { label: "שבת", key: 6 },
];

// שמירה קפדנית על מערך השעות המקורי והמדויק שלך
const HOURS_OF_DAY = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", 
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [availLoading, setAvailLoading] = useState(false);
  const [mySlots, setMySlots] = useState<AvailabilitySlot[]>([]);
  const [viewType, setViewType] = useState<"day" | "week" | "month">("week");
  const [currentWeekDates, setCurrentWeekDates] = useState<Date[]>([]);
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [openSlots, setOpenSlots] = useState<OpenBookingSlot[]>([]);
  const [myLessons, setMyLessons] = useState<Lesson[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [recommendedMatch, setRecommendedMatch] = useState<TeacherMatch | null>(null);
  const [matchLoading, setMatchLoading] = useState(false);
  const [referralAssigned, setReferralAssigned] = useState(false);
  const [teacherProfileForm, setTeacherProfileForm] = useState<TeacherProfileForm>({
    subjectsText: "",
    ageGroups: [],
    bio: "",
    profileImageUrl: "",
    referralCount: 0,
    activeStudentsCount: 0,
    lastReferralAt: null,
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [teacherOnboarding, setTeacherOnboarding] = useState<TeacherOnboardingStatus | null>(
    null
  );

  // 🔥 סטייטים חדשים ומבודדים לניהול שאלון הסיווג הדינמי והאדפטיבי של התלמיד
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState<"welcome" | "branch_select" | "school_form" | "academia_form">("welcome");
  
  // שדות הטופס הדינמי
  const [quizBranch, setQuizBranch] = useState<"school" | "academia" | null>(null);
  const [schoolSubject, setSchoolSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [schoolGrade, setSchoolGrade] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [schoolTopics, setSchoolTopics] = useState("");
  const [schoolChallenge, setSchoolChallenge] = useState("");
  const [schoolTarget, setSchoolTarget] = useState("");

  // שדות אקדמיה
  const [academyInstitution, setAcademyInstitution] = useState("");
  const [academyDegree, setAcademyDegree] = useState("");
  const [academyCourse, setAcademyCourse] = useState("");
  const [academyTarget, setAcademyTarget] = useState("");
  const [academyChallenge, setAcademyChallenge] = useState("");

  useEffect(() => {
    let cancelled = false;
    const redirected = { current: false };

    const loadUser = async () => {
      try {
        const response = await fetch("/api/me");
        if (!response.ok) {
          if (!cancelled && !redirected.current) {
            redirected.current = true;
            router.replace("/login?from=/dashboard");
          }
          return;
        }

        const data = await response.json();
        if (cancelled) return;

        setUser(data.user);
        setHasCompletedQuiz(data.hasCompletedQuiz);
        if (data.teacherOnboarding) {
          setTeacherOnboarding(data.teacherOnboarding);
        }

        if (data.user.role === "TEACHER" && data.user.isApproved) {
          fetchTeacherSlots();
          fetchTeacherProfile();
          fetchMyLessons();
        }
        if (data.user.role === "STUDENT" && data.hasCompletedQuiz) {
          fetchMyLessons();
          fetchRecommendedMatch();
        }
      } catch {
        if (!cancelled && !redirected.current) {
          redirected.current = true;
          router.replace("/login?from=/dashboard");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUser();
    calculateCurrentWeek();

    return () => {
      cancelled = true;
    };
    // Mount-only: do not depend on `router` (unstable identity can re-trigger forever)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateCurrentWeek = () => {
    const current = new Date();
    const sunday = new Date(current.setDate(current.getDate() - current.getDay()));
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(sunday);
      nextDay.setDate(sunday.getDate() + i);
      dates.push(nextDay);
    }
    setCurrentWeekDates(dates);
  };

  const getDaysInCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const refreshTeacherOnboarding = async () => {
    try {
      const response = await fetch("/api/me");
      if (!response.ok) return;
      const data = await response.json();
      if (data.teacherOnboarding) {
        setTeacherOnboarding(data.teacherOnboarding);
      }
    } catch {
      /* ignore */
    }
  };

  const fetchTeacherProfile = async () => {
    try {
      const response = await fetch("/api/admin/teacher-profile");
      if (!response.ok) return;
      const data = await response.json();
      const profile = data.profile;
      if (!profile) {
        setTeacherProfileForm({
          subjectsText: "",
          ageGroups: [],
          bio: "",
          profileImageUrl: "",
          referralCount: 0,
          activeStudentsCount: 0,
          lastReferralAt: null,
        });
        return;
      }
      setTeacherProfileForm({
        subjectsText: (profile.subjects as string[]).join(", "),
        ageGroups: profile.ageGroups ?? [],
        bio: profile.bio ?? "",
        profileImageUrl: profile.profileImageUrl ?? "",
        referralCount: profile.referralCount ?? 0,
        activeStudentsCount: profile.activeStudentsCount ?? 0,
        lastReferralAt: profile.lastReferralAt ?? null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecommendedMatch = async () => {
    setMatchLoading(true);
    try {
      const response = await fetch("/api/match");
      const data = await response.json();
      if (!response.ok) {
        setRecommendedMatch(null);
        return;
      }
      setRecommendedMatch(data.recommended ?? null);
    } catch (err) {
      console.error(err);
      setRecommendedMatch(null);
    } finally {
      setMatchLoading(false);
    }
  };

  const saveOwnTeacherProfile = async () => {
    const subjects = teacherProfileForm.subjectsText
      .split(/[,،\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (subjects.length === 0) {
      toast.error("יש להזין לפחות מקצוע התמחות אחד");
      return;
    }
    setProfileSaving(true);
    const t = toast.loading("שומר פרופיל...");
    try {
      const response = await fetch("/api/admin/teacher-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjects,
          ageGroups: teacherProfileForm.ageGroups,
          bio: teacherProfileForm.bio,
          profileImageUrl: teacherProfileForm.profileImageUrl,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "שמירה נכשלה");
      toast.success(data.message || "הפרופיל נשמר", { id: t });
      await fetchTeacherProfile();
      await refreshTeacherOnboarding();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בשמירה", { id: t });
    } finally {
      setProfileSaving(false);
    }
  };

  const ensureTeacherReferral = async (teacherId: string) => {
    if (referralAssigned) return;
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId }),
      });
      if (response.ok) {
        setReferralAssigned(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeacherSlots = async () => {
    try {
      const response = await fetch("/api/availability");
      if (response.ok) {
        const data = await response.json();
        setMySlots(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyLessons = async () => {
    try {
      const response = await fetch("/api/lessons");
      if (response.ok) {
        const data = await response.json();
        setMyLessons(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openBookingFlow = async () => {
    if (!user) return;
    if (user.lessonCredits < 1) {
      toast.error("אין מספיק קרדיטים — רכשו חבילה לפני השיבוץ");
      return;
    }
    setShowBookingPanel(true);
    setSlotsLoading(true);
    try {
      let teacherId = recommendedMatch?.teacherId;
      if (!teacherId) {
        const matchRes = await fetch("/api/match");
        const matchData = await matchRes.json();
        if (matchRes.ok && matchData.recommended) {
          setRecommendedMatch(matchData.recommended);
          teacherId = matchData.recommended.teacherId as string;
        }
      }

      const url = teacherId
        ? `/api/availability?teacherId=${encodeURIComponent(teacherId)}`
        : "/api/availability";
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "שגיאה בטעינת שעות פנויות");
      setOpenSlots(data);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בטעינת השעות");
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleBookSlot = async (slotId: string) => {
    setBookingLoading(true);
    const bookingToast = toast.loading("משבץ שיעור ומנכה קרדיט...");
    try {
      const slot = openSlots.find((s) => s.id === slotId);
      if (slot?.teacher?.id) {
        await ensureTeacherReferral(slot.teacher.id);
      }

      const response = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "השיבוץ נכשל");

      setUser((prev) => (prev ? { ...prev, lessonCredits: data.newCredits } : prev));
      setOpenSlots((prev) => prev.filter((s) => s.id !== slotId));
      await fetchMyLessons();
      toast.success("השיעור שובץ בהצלחה!", { id: bookingToast });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בשיבוץ", { id: bookingToast });
    } finally {
      setBookingLoading(false);
    }
  };

  // 🔥 פונקציית שיגור נתוני השאלון האדפטיבי ל-Backend של האבחונים
  const handleSaveQuiz = async (branchType: "school" | "academia") => {
    if (!user) return;
    
    let payload = {};
    if (branchType === "school") {
      const finalSubject = schoolSubject === "אחר" ? customSubject : schoolSubject;
      if (!finalSubject || !schoolGrade || !schoolLevel || !schoolChallenge || !schoolTarget) {
        toast.error("אנא מלאו את כל שדות החובה באבחון בית הספר");
        return;
      }
      payload = {
        ageGroup: `בית ספר - כיתה ${schoolGrade}`,
        subject: finalSubject,
        challenge: JSON.stringify({
          level: schoolLevel,
          specificTopics: schoolTopics,
          coreChallenge: schoolChallenge,
          learningTarget: schoolTarget
        })
      };
    } else {
      if (!academyInstitution || !academyDegree || !academyCourse || !academyTarget || !academyChallenge) {
        toast.error("אנא מלאו את כל שדות החובה באבחון האקדמי");
        return;
      }
      payload = {
        ageGroup: "אקדמיה / סטודנט",
        subject: academyCourse,
        challenge: JSON.stringify({
          institution: academyInstitution,
          degreeName: academyDegree,
          learningTarget: academyTarget,
          coreChallenge: academyChallenge
        })
      };
    }

    const quizToast = toast.loading("מעבד ומנתח את פרופיל הלמידה בענן...");
    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("שגיאה במהלך שמירת פרופיל האבחון");

      toast.success("פרופיל הלמידה פוענח בהצלחה! מחשבים התאמת מורה...", { id: quizToast });
      setHasCompletedQuiz(true);
      await fetchRecommendedMatch();
    } catch (err: any) {
      toast.error(err.message, { id: quizToast });
    }
  };

  // מנגנון רכישת חבילות ועדכון קרדיטים בזמן אמת לסטודנטים
  const handlePurchase = async (packageType: "SINGLE" | "TRIO" | "MULTI") => {
    if (!user) return;
    setPurchaseLoading(true);
    const purchaseToast = toast.loading("מתקשר עם חברת הסליקה המאובטחת...");

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageType }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "הרכישה נכשלה");

      setUser({ ...user, lessonCredits: data.newCredits });
      toast.success(`החבילה נטענה בהצלחה! יתרתך הנוכחית: ${data.newCredits} שיעורים 🎉`, { id: purchaseToast });
    } catch (err: any) {
      toast.error(err.message, { id: purchaseToast });
    } finally {
      setPurchaseLoading(false);
    }
  };

  const createSlot = async (dateTimeString: string) => {
    if (!user) return;
    setAvailLoading(true);
    const availToast = toast.loading("נועל את חלון הזמן ביומן...");

    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime: dateTimeString }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "שגיאה בנעילת השעה");

      toast.success("חלון הזמן ננעל ונפתח לשיבוץ תלמידים! 📅", { id: availToast });
      fetchTeacherSlots();
      await refreshTeacherOnboarding();
    } catch (err: any) {
      toast.error(err.message, { id: availToast });
    } finally {
      setAvailLoading(false);
    }
  };

  const findSlotInGrid = (date: Date, hourStr: string) => {
    return mySlots.find((slot) => {
      const slotDate = new Date(slot.startTime);
      const [h] = hourStr.split(":");
      return (
        slotDate.getDate() === date.getDate() &&
        slotDate.getMonth() === date.getMonth() &&
        slotDate.getFullYear() === date.getFullYear() &&
        slotDate.getHours() === parseInt(h)
      );
    });
  };

  const handleCellClick = (date: Date, hourStr: string, existingSlot?: AvailabilitySlot) => {
    if (existingSlot) return;
    if (availLoading) return;

    const [h, m] = hourStr.split(":");
    const targetDate = new Date(date);
    targetDate.setHours(parseInt(h), parseInt(m), 0, 0);

    const offset = targetDate.getTimezoneOffset() * 60000;
    const localISOTime = new Date(targetDate.getTime() - offset).toISOString().slice(0, 16);

    createSlot(localISOTime);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">טוען...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-8 pt-12" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* כותרת עליונה */}
        <div className="flex justify-between items-center bg-slate-800/30 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          <div>
            <span className="text-xs font-bold text-blue-400 block mb-1">
              {user.role === "ADMIN"
                ? "🛡️ מנהל מערכת"
                : user.role === "TEACHER"
                  ? "👨‍🏫 מורה פרימיום - יומן עבודה"
                  : "🎓 אזור סטודנטים והורים"}
            </span>
            <h1 className="text-2xl font-black">שלום, {user.name} 👋</h1>
          </div>
          <div className="flex items-center gap-3">
            {user.role === "ADMIN" && (
              <a
                href="/admin"
                className="text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white py-2 px-4 rounded-xl"
              >
                לוח ניהול
              </a>
            )}
            <button onClick={handleLogout} className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded-xl border border-slate-700">
              התנתקות
            </button>
          </div>
        </div>

        {/* אדמין */}
        {user.role === "ADMIN" && (
          <div className="bg-violet-500/10 border border-violet-500/40 p-8 rounded-2xl text-right space-y-4">
            <h2 className="text-xl font-black text-violet-300">ממשק מנהל מערכת</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              כאן תוכלו לאשר מורים, לטפל בלידים ולצפות באבחונים של תלמידים.
            </p>
            <a
              href="/admin"
              className="inline-block bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold py-3 px-6 rounded-xl"
            >
              כניסה ללוח הניהול ←
            </a>
          </div>
        )}

        {/* מורה — מסלול קליטה מאחורי הקלעים */}
        {user.role === "TEACHER" && teacherOnboarding && !teacherOnboarding.isFullyActive && (
          <div className="bg-amber-500/10 border border-amber-500/40 p-8 rounded-2xl text-right space-y-5">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-amber-300">
                {user.isApproved
                  ? "השלמת פרופיל המורה"
                  : "חשבון המורה ממתין לאישור צוות"}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {user.isApproved
                  ? "החשבון אושר. השלימו את השלבים הבאים כדי להתחיל לקבל שיבוצים מתלמידים."
                  : "ההרשמה התקבלה בהצלחה. צוות PROJECT8 מלווה את תהליך הקליטה — עדכונים יופיעו כאן."}
              </p>
            </div>
            <TeacherOnboardingTimeline onboarding={teacherOnboarding} />
          </div>
        )}

        {/* ======================= 🎓 חלק א': תצוגת סטודנט / הורה ======================= */}
        {user.role === "STUDENT" && (
          <div className="space-y-8">
            
            {!hasCompletedQuiz ? (
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-md shadow-2xl space-y-6 max-w-2xl mx-auto">
                
                {/* 1. מסך פתיחה ומבוא */}
                {quizStep === "welcome" && (
                  <div className="text-center space-y-6 py-4">
                    <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto text-xl">🎯</div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-black text-white">התאמת מורה פרטי ברמת פרימיום</h2>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                        כדי שנוכל לסווג את הפרופיל הלימודי המדויק ולהתאים לכם מרצה מומחה, נשמח לעבור אפיון מקצועי קצרצר.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button onClick={() => setQuizStep("branch_select")} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-lg shadow-blue-600/10">
                        התחל אבחון דיאגנוסטי מודרך 🚀
                      </button>
                      {/* 🔥 הכפתור המדויק והחכם שלך שמדלג ישירות לבחירת הקושי בענף */}
                      <button onClick={() => { setQuizStep("branch_select"); }} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-6 rounded-xl text-xs border border-slate-700 transition-all">
                        יודע כבר במה הקושי?
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. מסך פיצול הענפים המרכזי */}
                {quizStep === "branch_select" && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-black text-white text-center">אנא בחרו את מסלול הלימודים הרלוונטי:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <button onClick={() => { setQuizBranch("school"); setQuizStep("school_form"); }} className="bg-slate-900 hover:bg-slate-950 border border-slate-800 hover:border-blue-500 p-6 rounded-2xl text-right transition-all flex flex-col justify-between h-32 group">
                        <span className="text-2xl">🎒</span>
                        <div>
                          <span className="block font-black text-sm text-white">תלמיד בית ספר / הורה</span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">יסודי, חטיבה, תיכון והכנה לבגרויות</span>
                        </div>
                      </button>

                      <button onClick={() => { setQuizBranch("academia"); setQuizStep("academia_form"); }} className="bg-slate-900 hover:bg-slate-950 border border-slate-800 hover:border-blue-500 p-6 rounded-2xl text-right transition-all flex flex-col justify-between h-32 group">
                        <span className="text-2xl">🎓</span>
                        <div>
                          <span className="block font-black text-sm text-white">סטודנט באקדמיה</span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">קורסים אקדמיים באוניברסיטאות ומכללות</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* 🎒 ענף א': טופס ממוקד בית ספר (תמיכה מלאה בכל המקצועות + בחירה חופשית) */}
                {quizStep === "school_form" && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-black text-white border-b border-slate-800 pb-2">📋 אפיון ממוקד - מסלול בית ספר</h2>
                    
                    {/* א. בחירת מקצוע מורחב */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400">באיזה מקצוע הקושי? (חובה)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["מתמטיקה", "אנגלית", "פיזיקה", "כימיה/ביולוגיה", "לשון והבעה", "אחר"].map((sub) => (
                          <button key={sub} type="button" onClick={() => setSchoolSubject(sub)} className={`py-2 px-3 text-center text-xs font-bold rounded-xl border transition-all ${schoolSubject === sub ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"}`}>
                            {sub}
                          </button>
                        ))}
                      </div>
                      {schoolSubject === "אחר" && (
                        <input type="text" value={customSubject} onChange={(e) => setCustomSubject(e.target.value)} placeholder="הקלידו כאן את שם המקצוע המבוקש..." className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white placeholder-slate-500 mt-2 focus:border-blue-500 focus:outline-none" />
                      )}
                    </div>

                    {/* ב. כיתה והקבצה */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400">כיתה</label>
                        <input type="text" value={schoolGrade} onChange={(e) => setSchoolGrade(e.target.value)} placeholder="למשל: י', ח', יא'" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400">הקבצה / רמת יחידות</label>
                        <input type="text" value={schoolLevel} onChange={(e) => setSchoolLevel(e.target.value)} placeholder="למשל: 4 יח', 5 יח', הקבצה א'" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>

                    {/* ג. נושאים ספציפיים */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">אילו נושאים ספציפיים צריכים חיזוק?</label>
                      <input type="text" value={schoolTopics} onChange={(e) => setSchoolTopics(e.target.value)} placeholder="למשל: גאומטריה, זמנים באנגלית, בעיות תנועה..." className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                    </div>

                    {/* ד. שורש הבעיה */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400">סמנו בקליק: איפה עיקר הקושי בא לידי ביטוי?</label>
                      <div className="space-y-2">
                        {[
                          "חרדת בחינות וצורך בטכניקות מענה לחומר",
                          "חוסר בהבנת חומר בסיסי ופערי עבר משמעותיים",
                          "חוסר משמעת עצמית, סדר וארגון זמן למידה",
                          "הבנת חומר מצוינת - רצון להצטיין ולהתקדם מעבר לכיתה"
                        ].map((ch) => (
                          <button key={ch} type="button" onClick={() => setSchoolChallenge(ch)} className={`w-full text-right p-3 rounded-xl text-xs font-bold border transition-all flex justify-between items-center ${schoolChallenge === ch ? "bg-blue-600/20 border-blue-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                            <span>🔍 {ch}</span>
                            {schoolChallenge === ch && <span className="text-blue-400 text-xs">✓</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ה. יעד המפגשים */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400">מהו יעד הלימודים המרכזי?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "🎯 מרתון ממוקד למבחן קרוב", val: "MARATHON" },
                          { label: "🛡️ ליווי שוטף ארוך טווח", val: "LONG_TERM" }
                        ].map((t) => (
                          <button key={t.val} type="button" onClick={() => setSchoolTarget(t.label)} className={`p-4 rounded-xl text-center text-xs font-bold border transition-all ${schoolTarget === t.label ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => handleSaveQuiz("school")} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg mt-4">
                      שמור נתוני אבחון ונעל פרופיל תלמיד 🔒
                    </button>
                  </div>
                )}

                {/* 🎓 ענף ב': טופס ממוקד אקדמיה וקורסים אקדמיים */}
                {quizStep === "academia_form" && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-black text-white border-b border-slate-800 pb-2">📋 אפיון ממוקד - מסלול אקדמיה</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400">מוסד הלימודים Academic Institution</label>
                        <input type="text" value={academyInstitution} onChange={(e) => setAcademyInstitution(e.target.value)} placeholder="למשל: הטכניון, אוניברסיטת תל אביב" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400">מסלול התואר / פקולטה</label>
                        <input type="text" value={academyDegree} onChange={(e) => setAcademyDegree(e.target.value)} placeholder="למשל: מדעי המחשב, כלכלה, הנדסה" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">מהו שם הקורס המדויק שבו נדרשת עזרה?</label>
                      <input type="text" value={academyCourse} onChange={(e) => setAcademyCourse(e.target.value)} placeholder="למשל: אינפי 1, אלגברה ליניארית ת', מבני נתונים..." className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                    </div>

                    {/* יעד לימודים אקדמי */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400">מהו אופי הליווי המבוקש?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "🎯 מרתון ממוקד למבחן (מועד א'/ב')", val: "EXAM" },
                          { label: "🛡️ ליווי שוטף לאורך כל הסמסטר", val: "SEMESTER" }
                        ].map((t) => (
                          <button key={t.val} type="button" onClick={() => setAcademyTarget(t.label)} className={`p-4 rounded-xl text-center text-xs font-bold border transition-all ${academyTarget === t.label ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* מוקד קושי אקדמי */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400">איפה ממוקם הקושי המרכזי בקורס?</label>
                      <div className="space-y-2">
                        {[
                          "🧩 קושי בהבנת קונספטים מופשטים ותיאורטיים של המרצה בהרצאות",
                          "✍️ חוסר הצלחה ופרקטיקה בפתרון תרגילי הבית והבנת גיליונות התרגול",
                          "⏰ לחץ זמן חריג וצורך בטכניקות מעשיות לניהול זמן בבחינה עצמה"
                        ].map((ch) => (
                          <button key={ch} type="button" onClick={() => setAcademyChallenge(ch)} className={`w-full text-right p-3 rounded-xl text-xs font-bold border transition-all flex justify-between items-center ${academyChallenge === ch ? "bg-blue-600/20 border-blue-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                            <span>{ch}</span>
                            {academyChallenge === ch && <span className="text-blue-400 text-xs">✓</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => handleSaveQuiz("academia")} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg mt-4">
                      שמור נתוני אבחון ונעל פרופיל אקדמי 🔒
                    </button>
                  </div>
                )}

              </div>
            ) : (
              
              /* 🟢 הדאשבורד של הסטודנט נפתח במלואו רק לאחר שמירת האבחון בענן */
              <div className="space-y-6 animate-fadeIn">
                {(matchLoading || recommendedMatch) && (
                  <div className="bg-gradient-to-br from-violet-600/15 to-slate-900/40 border border-violet-500/30 p-6 rounded-2xl text-right space-y-2">
                    <h3 className="text-sm font-bold text-violet-300">המורה המומלץ לפי האבחון</h3>
                    {matchLoading && !recommendedMatch ? (
                      <p className="text-xs text-slate-400">מחשב התאמה שוויונית...</p>
                    ) : recommendedMatch ? (
                      <>
                        <p className="text-lg font-black text-white">{recommendedMatch.teacherName}</p>
                        <p className="text-xs text-slate-300">
                          ציון התאמה: {recommendedMatch.matchScore} · הפניות:{" "}
                          {recommendedMatch.referralCount} · שעות פנויות:{" "}
                          {recommendedMatch.openSlotsCount}
                        </p>
                        {recommendedMatch.subjects.length > 0 && (
                          <p className="text-[11px] text-violet-200">
                            {recommendedMatch.subjects.join(" · ")}
                          </p>
                        )}
                        {recommendedMatch.reasons.length > 0 && (
                          <p className="text-[11px] text-slate-500">
                            {recommendedMatch.reasons.join(" · ")}
                          </p>
                        )}
                        {recommendedMatch.bio && (
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {recommendedMatch.bio}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-slate-400">
                        אין כרגע מורה מתאים — ודאו שיש מורים מאושרים עם פרופיל מלא.
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/5 border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-500/5">
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 mb-2">יתרת שיעורים בחבילה</h3>
                      <div className="text-5xl font-black text-white tracking-tight mb-2">
                        {user.lessonCredits} <span className="text-xl font-medium text-slate-400">שיעורים</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">כל שיעור מחושב לפי 50 דקות עבודה ממוקדות.</p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-300 mb-2">שיבוץ שעות מול מורה</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {recommendedMatch
                          ? `השעות מוצגות לפי המורה המומלץ (${recommendedMatch.teacherName}) לחלוקה שוויונית.`
                          : "בחרו שעה פנויה מיומן המורים המאושרים. כל שיבוץ מנכה קרדיט אחד."}
                      </p>
                    </div>
                    <button
                      onClick={openBookingFlow}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all mt-4"
                    >
                      ➕ בקשת שיבוץ שיעור חדש
                    </button>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-green-400 mb-2">💬 חדר בקרה - WhatsApp</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">צוות הניהול מקים כעת קבוצה ייעודית מבוקרת הכוללת את המורה הפרטי, הסטודנט וההורה לצורך מעקב רציף.</p>
                    </div>
                    <div className="text-center text-xs text-slate-500 border border-slate-800 bg-slate-900/40 py-2 rounded-xl mt-4 font-mono">
                      סנכרון פעיל ✅
                    </div>
                  </div>
                </div>

                {showBookingPanel && (
                  <div className="bg-slate-800/30 border border-slate-700 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-sm font-bold text-white">שעות פנויות לשיבוץ</h2>
                      <button
                        onClick={() => setShowBookingPanel(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        סגור
                      </button>
                    </div>
                    {slotsLoading ? (
                      <p className="text-xs text-slate-400">טוען שעות פנויות...</p>
                    ) : openSlots.length === 0 ? (
                      <p className="text-xs text-slate-400">אין כרגע שעות פנויות. נסו שוב מאוחר יותר או השאירו פנייה בדף הבית.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {openSlots.map((slot) => (
                          <button
                            key={slot.id}
                            disabled={bookingLoading}
                            onClick={() => handleBookSlot(slot.id)}
                            className="text-right bg-slate-900/70 border border-slate-700 hover:border-blue-500/50 p-4 rounded-xl transition-all disabled:opacity-50"
                          >
                            <div className="text-xs font-bold text-blue-300">{slot.teacher.name}</div>
                            <div className="text-sm font-black text-white mt-1">
                              {new Date(slot.startTime).toLocaleString("he-IL", {
                                weekday: "short",
                                day: "numeric",
                                month: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            {slot.teacher.teacherProfile?.subjects?.length ? (
                              <div className="text-[11px] text-slate-500 mt-1">
                                {slot.teacher.teacherProfile.subjects.join(" · ")}
                              </div>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {myLessons.length > 0 && (
                  <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <h2 className="text-sm font-bold text-slate-300">השיעורים המשובצים שלי</h2>
                    <div className="space-y-2">
                      {myLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-4 text-xs gap-3"
                        >
                          <div className="text-right">
                            <div className="font-bold text-white">{lesson.title || "שיעור פרטי"}</div>
                            <div className="text-blue-300 mt-1">מורה: {lesson.teacher.name}</div>
                            <div className="text-slate-400 mt-0.5">
                              {new Date(lesson.scheduledAt).toLocaleString("he-IL")}
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
                            <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-center">
                              {lesson.status}
                            </span>
                            {(lesson.status === "SCHEDULED" || lesson.status === "IN_PROGRESS") && (
                              <a
                                href={`/lessons/${lesson.id}`}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all"
                              >
                                כניסה לשיעור בלייב
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* חלון רכישת חבילות וסימולציית סליקה מאובטחת */}
                <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-2xl">
                  <h2 className="text-sm font-bold text-slate-300 mb-4">💳 רכישת חבילת שיעורים פרימיום (סליקה מאובטחת)</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button disabled={purchaseLoading} onClick={() => handlePurchase("SINGLE")} className="bg-slate-900/60 hover:bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 p-5 rounded-xl text-right transition-all disabled:opacity-50 group flex flex-col justify-between h-32">
                      <div>
                        <div className="text-xs font-bold text-slate-400 group-hover:text-blue-400">חבילת יסוד</div>
                        <div className="text-xl font-black text-white mt-1">שיעור בודד</div>
                      </div>
                      <div className="text-xs text-blue-400 font-mono font-bold bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded-md w-fit">180 ₪</div>
                    </button>

                    <button disabled={purchaseLoading} onClick={() => handlePurchase("TRIO")} className="bg-slate-900/60 hover:bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 p-5 rounded-xl text-right transition-all disabled:opacity-50 group flex flex-col justify-between h-32 relative overflow-hidden">
                      <div className="absolute top-0 left-0 bg-blue-600 text-[10px] font-black px-2 py-0.5 rounded-br-lg text-white">פופולרי</div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 group-hover:text-blue-400">חבילת תגבור מקיפה</div>
                        <div className="text-xl font-black text-white mt-1">שלשה (3 שיעורים)</div>
                      </div>
                      <div className="text-xs text-blue-400 font-mono font-bold bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded-md w-fit">510 ₪</div>
                    </button>

                    <button disabled={purchaseLoading} onClick={() => handlePurchase("MULTI")} className="bg-slate-900/60 hover:bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 p-5 rounded-xl text-right transition-all disabled:opacity-50 group flex flex-col justify-between h-32">
                      <div>
                        <div className="text-xs font-bold text-slate-400 group-hover:text-blue-400">חבילת מרתון פרימיום</div>
                        <div className="text-xl font-black text-white mt-1">חמישייה (5 שיעורים)</div>
                      </div>
                      <div className="text-xs text-blue-400 font-mono font-bold bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded-md w-fit">800 ₪</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================= 👨‍🏫 חלק ב': תצוגת מורה (נשאר ללא שינוי בכלל!) ======================= */}
        {user.role === "TEACHER" && user.isApproved && (
          <div className="space-y-6">
            <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-2xl space-y-4 text-right">
              <div>
                <h2 className="text-lg font-black text-white">פרופיל מורה</h2>
                <p className="text-xs text-slate-400">
                  תחומי התמחות וקבוצות גיל משמשים להתאמה לפי אבחון התלמיד ולחלוקה שוויונית.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-[10px] text-slate-500 font-bold">הפניות</div>
                  <div className="text-xl font-black text-white">
                    {teacherProfileForm.referralCount}
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-[10px] text-slate-500 font-bold">תלמידים פעילים</div>
                  <div className="text-xl font-black text-white">
                    {teacherProfileForm.activeStudentsCount}
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-[10px] text-slate-500 font-bold">הפניה אחרונה</div>
                  <div className="text-xs font-bold text-slate-300 mt-1">
                    {teacherProfileForm.lastReferralAt
                      ? new Date(teacherProfileForm.lastReferralAt).toLocaleDateString("he-IL")
                      : "—"}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400">
                  תחומי התמחות (מופרדים בפסיק)
                </label>
                <input
                  type="text"
                  value={teacherProfileForm.subjectsText}
                  onChange={(e) =>
                    setTeacherProfileForm((p) => ({ ...p, subjectsText: e.target.value }))
                  }
                  placeholder="מתמטיקה, פיזיקה, אינפי 1"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400">קבוצות גיל</label>
                <div className="flex flex-wrap gap-2 justify-end">
                  {AGE_GROUP_OPTIONS.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() =>
                        setTeacherProfileForm((p) => ({
                          ...p,
                          ageGroups: p.ageGroups.includes(group)
                            ? p.ageGroups.filter((g) => g !== group)
                            : [...p.ageGroups, group],
                        }))
                      }
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        teacherProfileForm.ageGroups.includes(group)
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400">אודות</label>
                <textarea
                  value={teacherProfileForm.bio}
                  onChange={(e) =>
                    setTeacherProfileForm((p) => ({ ...p, bio: e.target.value }))
                  }
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-y"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400">קישור לתמונה (אופציונלי)</label>
                <input
                  type="url"
                  dir="ltr"
                  value={teacherProfileForm.profileImageUrl}
                  onChange={(e) =>
                    setTeacherProfileForm((p) => ({ ...p, profileImageUrl: e.target.value }))
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                disabled={profileSaving}
                onClick={saveOwnTeacherProfile}
                className="text-xs font-bold py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
              >
                {profileSaving ? "שומר..." : "שמור פרופיל מורה"}
              </button>
            </div>

          <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white">📅 יומן השעות המנוהל שלך</h2>
                <p className="text-xs text-slate-400">ניהול, סינון ופתיחת שעות בלייב על גבי מטריצת הזמן שלך</p>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex gap-1 text-xs font-bold self-start">
                <button onClick={() => setViewType("day")} className={`px-4 py-1.5 rounded-lg transition-all ${viewType === "day" ? "bg-slate-800 text-white" : "text-slate-400"}`}>יום</button>
                <button onClick={() => setViewType("week")} className={`px-4 py-1.5 rounded-lg transition-all ${viewType === "week" ? "bg-slate-800 text-white" : "text-slate-400"}`}>שבוע</button>
                <button onClick={() => setViewType("month")} className={`px-4 py-1.5 rounded-lg transition-all ${viewType === "month" ? "bg-slate-800 text-white" : "text-slate-400"}`}>חודש</button>
              </div>
            </div>

            {/* 1. מצב יום (Day View) */}
            {viewType === "day" && (
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-slate-800 rounded-2xl">
                <div className="min-w-[400px] bg-slate-900/40">
                  <div className="grid grid-cols-2 bg-slate-900/90 border-b border-slate-800 text-center py-3 text-xs font-bold text-slate-400 sticky top-0 z-20 backdrop-blur-md">
                    <div className="border-l border-slate-800/50">שעה</div>
                    <div>
                      <div>יום {new Date().toLocaleDateString("he-IL", { weekday: "long" })}</div>
                      <div className="text-[10px] text-blue-400 font-mono mt-0.5">
                        {new Date().toLocaleDateString("he-IL", { day: "numeric", month: "numeric", year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-800/40">
                    {HOURS_OF_DAY.map((hourStr) => {
                      const today = new Date();
                      const slot = findSlotInGrid(today, hourStr);
                      return (
                        <div key={hourStr} className="grid grid-cols-2 items-stretch min-h-[58px]">
                          <div className="bg-slate-900/30 border-l border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-500">
                            {hourStr}
                          </div>
                          <div onClick={() => handleCellClick(today, hourStr, slot)} className={`p-1 flex items-center justify-center relative group select-none ${!slot ? "cursor-pointer hover:bg-blue-500/5 transition-colors" : ""}`}>
                            {!slot && <span className="opacity-0 group-hover:opacity-100 text-blue-500/60 text-[11px] font-bold transition-opacity font-mono">+ {hourStr}</span>}
                            {slot && !slot.isBooked && (
                              <div className="absolute inset-1 rounded-xl bg-amber-500/10 border border-amber-500/50 text-amber-400 px-3 py-1 flex flex-col justify-center text-right shadow-md">
                                <span className="text-[10px] font-black uppercase bg-amber-500/10 px-1.5 py-0.5 rounded w-fit">פנוי</span>
                              </div>
                            )}
                            {slot && slot.isBooked && (
                              <div className="absolute inset-1 rounded-xl bg-emerald-600 border border-emerald-500 text-white px-3 py-1 flex flex-col justify-center text-right shadow-lg">
                                <span className="text-[9px] font-black bg-white/20 px-1.5 py-0.5 rounded w-fit uppercase">סגור</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. מצב שבוע (Week View) */}
            {viewType === "week" && currentWeekDates.length > 0 && (
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-slate-800 rounded-2xl">
                <div className="min-w-[800px] bg-slate-900/40">
                  <div className="grid grid-cols-8 bg-slate-900/90 border-b border-slate-800 text-center py-3 text-xs font-bold text-slate-400 sticky top-0 z-20 backdrop-blur-md">
                    <div className="border-l border-slate-800/50">שעה</div>
                    {DAYS_OF_WEEK.map((day) => {
                      const dateObj = currentWeekDates[day.key];
                      return (
                        <div key={day.key} className="border-l border-slate-800/50 last:border-0">
                          <div>יום {day.label}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{dateObj?.getDate()}/{dateObj?.getMonth() + 1}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="divide-y divide-slate-800/40">
                    {HOURS_OF_DAY.map((hourStr) => (
                      <div key={hourStr} className="grid grid-cols-8 items-stretch min-h-[58px]">
                        <div className="bg-slate-900/30 border-l border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-500 sticky right-0 z-10">
                          {hourStr}
                        </div>
                        {DAYS_OF_WEEK.map((day) => {
                          const dateObj = currentWeekDates[day.key];
                          const slot = dateObj ? findSlotInGrid(dateObj, hourStr) : undefined;
                          return (
                            <div key={day.key} onClick={() => dateObj && handleCellClick(dateObj, hourStr, slot)} className={`border-l border-slate-800/60 p-1 flex items-center justify-center relative group select-none last:border-0 ${!slot ? "cursor-pointer hover:bg-blue-500/5 transition-colors" : ""}`}>
                              {!slot && <span className="opacity-0 group-hover:opacity-100 text-blue-500/60 text-[11px] font-bold transition-opacity font-mono">+ {hourStr}</span>}
                              {slot && !slot.isBooked && (
                                <div className="absolute inset-1 rounded-xl bg-amber-500/10 border border-amber-500/50 text-amber-400 px-2 py-1 flex flex-col justify-between text-right shadow-md z-10">
                                  <div className="text-[9px] font-black tracking-wide uppercase bg-amber-500/10 px-1 rounded w-fit">פנוי</div>
                                  <div className="text-xs font-black font-mono tracking-tight">{hourStr}</div>
                                </div>
                              )}
                              {slot && slot.isBooked && (
                                <div className="absolute inset-1 rounded-xl bg-emerald-600 border border-emerald-500 text-white px-2 py-1 flex flex-col justify-between text-right shadow-lg z-10">
                                  <div><div className="text-[9px] font-black bg-white/20 px-1 rounded w-fit uppercase">סגור</div></div>
                                  <div className="text-xs font-black font-mono tracking-tight">{hourStr}</div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. מצב חודש (Month View) */}
            {viewType === "month" && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 border-b border-slate-800 pb-2 mb-2">
                  <div>ראשון</div><div>שני</div><div>שלישי</div><div>רביעי</div><div>חמישי</div><div>שישי</div><div>שבת</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="min-h-[85px] bg-slate-900/10 border border-transparent rounded-xl"></div>
                  ))}
                  {getDaysInCurrentMonth().map((day) => {
                    const daySlots = mySlots.filter((slot) => {
                      const d = new Date(slot.startTime);
                      return d.getDate() === day.getDate() && d.getMonth() === day.getMonth() && d.getFullYear() === day.getFullYear();
                    });
                    const openCount = daySlots.filter(s => !s.isBooked).length;
                    const bookedCount = daySlots.filter(s => s.isBooked).length;
                    return (
                      <div key={day.toISOString()} className="min-h-[85px] bg-slate-900/40 border border-slate-800/80 rounded-xl p-2 flex flex-col justify-between">
                        <span className="text-xs font-mono font-bold text-slate-500">{day.getDate()}</span>
                        <div className="space-y-1 mt-1">
                          {openCount > 0 && <div className="text-[10px] font-black text-amber-400 bg-amber-500/5 border border-amber-500/20 px-1 py-0.5 rounded text-center">🟡 {openCount} פנויים</div>}
                          {bookedCount > 0 && <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-1 py-0.5 rounded text-center">🟢 {bookedCount} סגורים</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* הצגת שיעורים המשובצים למורה */}
            {myLessons.length > 0 && (
              <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-2xl space-y-3">
                <h2 className="text-sm font-bold text-slate-300">השיעורים המשובצים שלי</h2>
                <div className="space-y-2">
                  {myLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-4 text-xs gap-3"
                    >
                      <div className="text-right">
                        <div className="font-bold text-white">{lesson.title || "שיעור פרטי"}</div>
                        <div className="text-indigo-300 mt-1">תלמיד: {lesson.student?.name}</div>
                        <div className="text-slate-400 mt-0.5">
                          {new Date(lesson.scheduledAt).toLocaleString("he-IL")}
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-center">
                          {lesson.status}
                        </span>
                        {(lesson.status === "SCHEDULED" || lesson.status === "IN_PROGRESS") && (
                          <a
                            href={`/lessons/${lesson.id}`}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all"
                          >
                            התחל שיעור בלייב
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
          </div>
        )}

      </div>
    </div>
  );
}