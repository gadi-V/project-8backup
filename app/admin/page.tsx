"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

type Tab = "overview" | "teachers" | "leads" | "diagnostics";

type Stats = {
  studentsCount: number;
  teachersCount: number;
  pendingTeachers: number;
  openLeads: number;
  lessonsCount: number;
  paymentsCount: number;
  revenueTotal: number;
};

type TeacherProfileData = {
  subjects: string[];
  ageGroups: string[];
  bio: string | null;
  profileImageUrl: string | null;
  referralCount: number;
  activeStudentsCount: number;
  lastReferralAt: string | null;
};

type Teacher = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  isApproved: boolean;
  createdAt: string;
  teacherProfile: TeacherProfileData | null;
  _count: { availabilities: number; givenLessons: number };
};

type ProfileFormState = {
  subjectsText: string;
  ageGroups: string[];
  bio: string;
  profileImageUrl: string;
};

type MatchPreview = {
  teacherId: string;
  teacherName: string;
  matchScore: number;
  reasons: string[];
  referralCount: number;
};

const AGE_GROUP_OPTIONS = ["יסודי", "חטיבה", "תיכון", "אקדמיה"] as const;

type Lead = {
  id: string;
  name: string;
  phone: string;
  grade: string;
  requestedHours: string;
  isHandled: boolean;
  createdAt: string;
};

type Diagnostic = {
  id: string;
  ageGroup: string;
  subject: string;
  challenge: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    lessonCredits: number;
  };
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [adminName, setAdminName] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    subjectsText: "",
    ageGroups: [],
    bio: "",
    profileImageUrl: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [matchPreview, setMatchPreview] = useState<Record<string, MatchPreview | null>>({});

  const loadOverview = useCallback(async () => {
    const res = await fetch("/api/admin/overview");
    if (!res.ok) throw new Error("שגיאה בטעינת סקירה");
    const data = await res.json();
    setStats(data.stats);
  }, []);

  const loadTeachers = useCallback(async () => {
    const res = await fetch("/api/admin/teachers");
    if (!res.ok) throw new Error("שגיאה בטעינת מורים");
    const data = await res.json();
    setTeachers(data.teachers);
  }, []);

  const loadLeads = useCallback(async () => {
    const res = await fetch("/api/admin/leads");
    if (!res.ok) throw new Error("שגיאה בטעינת לידים");
    const data = await res.json();
    setLeads(data.leads);
  }, []);

  const loadDiagnostics = useCallback(async () => {
    const res = await fetch("/api/admin/diagnostics");
    if (!res.ok) throw new Error("שגיאה בטעינת אבחונים");
    const data = await res.json();
    setDiagnostics(data.diagnostics);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const redirected = { current: false };

    const boot = async () => {
      try {
        const meRes = await fetch("/api/me");
        if (!meRes.ok) {
          if (!cancelled && !redirected.current) {
            redirected.current = true;
            router.replace("/login?from=/admin");
          }
          return;
        }
        const me = await meRes.json();
        if (cancelled) return;

        if (me.user.role !== "ADMIN" && me.user.role !== "MANAGER") {
          toast.error("אין הרשאת מנהל");
          router.replace("/dashboard");
          return;
        }
        setAdminName(me.user.name);
        await Promise.all([loadOverview(), loadTeachers(), loadLeads()]);
      } catch {
        if (!cancelled && !redirected.current) {
          redirected.current = true;
          router.replace("/login?from=/admin");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    boot();
    return () => {
      cancelled = true;
    };
    // Mount-only: unstable `router` identity must not re-trigger this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tab === "diagnostics" && diagnostics.length === 0) {
      loadDiagnostics().catch(() => toast.error("שגיאה בטעינת אבחונים"));
    }
  }, [tab, diagnostics.length, loadDiagnostics]);

  const toggleTeacher = async (teacherId: string, isApproved: boolean) => {
    setActionLoading(teacherId);
    const t = toast.loading(isApproved ? "מאשר מורה..." : "מבטל אישור...");
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId, isApproved }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "עדכון נכשל");
      toast.success(data.message, { id: t });
      await Promise.all([loadTeachers(), loadOverview()]);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה", { id: t });
    } finally {
      setActionLoading(null);
    }
  };

  const toggleLead = async (leadId: string, isHandled: boolean) => {
    setActionLoading(leadId);
    const t = toast.loading(isHandled ? "מסמן כטופל..." : "פותח מחדש...");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, isHandled }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "עדכון נכשל");
      toast.success(data.message, { id: t });
      await Promise.all([loadLeads(), loadOverview()]);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה", { id: t });
    } finally {
      setActionLoading(null);
    }
  };

  const openProfileEditor = (teacher: Teacher) => {
    const profile = teacher.teacherProfile;
    setEditingTeacherId(teacher.id);
    setProfileForm({
      subjectsText: profile?.subjects?.join(", ") ?? "",
      ageGroups: profile?.ageGroups ?? [],
      bio: profile?.bio ?? "",
      profileImageUrl: profile?.profileImageUrl ?? "",
    });
  };

  const toggleAgeGroup = (group: string) => {
    setProfileForm((prev) => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(group)
        ? prev.ageGroups.filter((g) => g !== group)
        : [...prev.ageGroups, group],
    }));
  };

  const saveTeacherProfile = async (teacherId: string) => {
    const subjects = profileForm.subjectsText
      .split(/[,،\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (subjects.length === 0) {
      toast.error("יש להזין לפחות מקצוע התמחות אחד");
      return;
    }

    setProfileSaving(true);
    const t = toast.loading("שומר פרופיל מורה...");
    try {
      const res = await fetch("/api/admin/teacher-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId,
          subjects,
          ageGroups: profileForm.ageGroups,
          bio: profileForm.bio,
          profileImageUrl: profileForm.profileImageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שמירת הפרופיל נכשלה");
      toast.success(data.message || "הפרופיל נשמר", { id: t });
      setEditingTeacherId(null);
      await loadTeachers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בשמירה", { id: t });
    } finally {
      setProfileSaving(false);
    }
  };

  const runMatchForStudent = async (studentId: string) => {
    setActionLoading(`match-${studentId}`);
    const t = toast.loading("מחשב התאמת מורה...");
    try {
      const res = await fetch(`/api/match?studentId=${encodeURIComponent(studentId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "ההתאמה נכשלה");
      const recommended = data.recommended as MatchPreview | null;
      setMatchPreview((prev) => ({ ...prev, [studentId]: recommended }));
      if (!recommended) {
        toast.error("לא נמצא מורה מתאים", { id: t });
      } else {
        toast.success(
          `מומלץ: ${recommended.teacherName} (ציון ${recommended.matchScore})`,
          { id: t }
        );
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בהתאמה", { id: t });
    } finally {
      setActionLoading(null);
    }
  };

  const assignMatchForStudent = async (studentId: string) => {
    const preview = matchPreview[studentId];
    if (!preview) {
      toast.error("יש להריץ התאמה לפני שיוך");
      return;
    }
    setActionLoading(`assign-${studentId}`);
    const t = toast.loading("משייך הפנייה למורה...");
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, teacherId: preview.teacherId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "השיוך נכשל");
      toast.success(data.message || "הפנייה נרשמה", { id: t });
      await loadTeachers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בשיוך", { id: t });
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center" dir="rtl">
        טוען לוח ניהול...
      </div>
    );
  }

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview", label: "סקירה" },
    { id: "teachers", label: "מורים", badge: stats?.pendingTeachers },
    { id: "leads", label: "לידים", badge: stats?.openLeads },
    { id: "diagnostics", label: "אבחונים" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <div>
            <span className="text-xs font-bold text-violet-400 block mb-1">לוח בקרה · ADMIN / MANAGER</span>
            <h1 className="text-2xl font-black">שלום, {adminName}</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded-xl border border-slate-700"
            >
              לדאשבורד
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded-xl border border-slate-700"
            >
              התנתקות
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-900/40 border border-slate-800 p-2 rounded-xl">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`text-xs font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2 ${
                tab === item.id ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              {item.label}
              {typeof item.badge === "number" && item.badge > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "overview" && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "תלמידים", value: stats.studentsCount },
              { label: "מורים", value: stats.teachersCount },
              { label: "מורים ממתינים", value: stats.pendingTeachers, highlight: true },
              { label: "לידים פתוחים", value: stats.openLeads, highlight: true },
              { label: "שיעורים", value: stats.lessonsCount },
              { label: "רכישות", value: stats.paymentsCount },
              { label: "הכנסות (₪)", value: stats.revenueTotal },
            ].map((card) => (
              <div
                key={card.label}
                className={`border p-5 rounded-2xl ${
                  card.highlight
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                <div className="text-[11px] font-bold text-slate-400 mb-2">{card.label}</div>
                <div className="text-3xl font-black">{card.value}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "teachers" && (
          <div className="space-y-3">
            {teachers.length === 0 ? (
              <p className="text-sm text-slate-400">אין מורים רשומים עדיין.</p>
            ) : (
              teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="text-right space-y-1 flex-1">
                      <div className="flex items-center gap-2 justify-end">
                        <h3 className="font-black text-white">{teacher.name}</h3>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded ${
                            teacher.isApproved
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {teacher.isApproved ? "מאושר" : "ממתין"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400" dir="ltr">
                        {teacher.phone}
                        {teacher.email ? ` · ${teacher.email}` : ""}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {teacher._count.availabilities} שעות פתוחות · {teacher._count.givenLessons}{" "}
                        שיעורים · נרשם {new Date(teacher.createdAt).toLocaleDateString("he-IL")}
                      </p>
                      {teacher.teacherProfile ? (
                        <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
                          <p className="text-violet-300">
                            מקצועות: {teacher.teacherProfile.subjects.join(" · ") || "—"}
                          </p>
                          <p>
                            קבוצות גיל:{" "}
                            {teacher.teacherProfile.ageGroups.join(" · ") || "לא הוגדר"}
                          </p>
                          <p>
                            הפניות: {teacher.teacherProfile.referralCount} · תלמידים פעילים:{" "}
                            {teacher.teacherProfile.activeStudentsCount}
                            {teacher.teacherProfile.lastReferralAt
                              ? ` · הפניה אחרונה: ${new Date(
                                  teacher.teacherProfile.lastReferralAt
                                ).toLocaleDateString("he-IL")}`
                              : " · ללא הפניות עדיין"}
                          </p>
                          {teacher.teacherProfile.bio ? (
                            <p className="text-slate-500 line-clamp-2">{teacher.teacherProfile.bio}</p>
                          ) : null}
                        </div>
                      ) : (
                        <p className="text-[11px] text-amber-400/80">טרם הוגדר פרופיל מורה</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          editingTeacherId === teacher.id
                            ? setEditingTeacherId(null)
                            : openProfileEditor(teacher)
                        }
                        className="text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                      >
                        {editingTeacherId === teacher.id ? "סגור עריכה" : "ערוך פרופיל"}
                      </button>
                      <button
                        disabled={actionLoading === teacher.id}
                        onClick={() => toggleTeacher(teacher.id, !teacher.isApproved)}
                        className={`text-xs font-bold py-2.5 px-4 rounded-xl disabled:opacity-50 ${
                          teacher.isApproved
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white"
                        }`}
                      >
                        {teacher.isApproved ? "בטל אישור" : "אשר מורה"}
                      </button>
                    </div>
                  </div>

                  {editingTeacherId === teacher.id && (
                    <div className="border-t border-slate-800 pt-4 space-y-4 text-right">
                      <h4 className="text-xs font-black text-violet-300">עריכת TeacherProfile</h4>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400">
                          תחומי התמחות (מופרדים בפסיק)
                        </label>
                        <input
                          type="text"
                          value={profileForm.subjectsText}
                          onChange={(e) =>
                            setProfileForm((p) => ({ ...p, subjectsText: e.target.value }))
                          }
                          placeholder="מתמטיקה, פיזיקה, אינפי 1"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400">קבוצות גיל</label>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {AGE_GROUP_OPTIONS.map((group) => (
                            <button
                              key={group}
                              type="button"
                              onClick={() => toggleAgeGroup(group)}
                              className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                                profileForm.ageGroups.includes(group)
                                  ? "bg-violet-600 border-violet-500 text-white"
                                  : "bg-slate-950 border-slate-700 text-slate-400"
                              }`}
                            >
                              {group}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400">ביוגרפיה קצרה</label>
                        <textarea
                          value={profileForm.bio}
                          onChange={(e) =>
                            setProfileForm((p) => ({ ...p, bio: e.target.value }))
                          }
                          rows={3}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 resize-y"
                          placeholder="ניסיון, גישה פדגוגית..."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400">
                          קישור לתמונת פרופיל (אופציונלי)
                        </label>
                        <input
                          type="url"
                          dir="ltr"
                          value={profileForm.profileImageUrl}
                          onChange={(e) =>
                            setProfileForm((p) => ({ ...p, profileImageUrl: e.target.value }))
                          }
                          placeholder="https://..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={profileSaving}
                        onClick={() => saveTeacherProfile(teacher.id)}
                        className="text-xs font-bold py-2.5 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-50"
                      >
                        {profileSaving ? "שומר..." : "שמור פרופיל"}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "leads" && (
          <div className="space-y-3">
            {leads.length === 0 ? (
              <p className="text-sm text-slate-400">אין לידים במערכת.</p>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 justify-end">
                      <h3 className="font-black text-white">{lead.name}</h3>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded ${
                          lead.isHandled
                            ? "bg-slate-700 text-slate-300"
                            : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {lead.isHandled ? "טופל" : "פתוח"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400" dir="ltr">
                      {lead.phone}
                    </p>
                    <p className="text-xs text-slate-300">{lead.grade}</p>
                    <p className="text-[11px] text-slate-500">{lead.requestedHours}</p>
                    <p className="text-[11px] text-slate-600">
                      {new Date(lead.createdAt).toLocaleString("he-IL")}
                    </p>
                  </div>
                  <button
                    disabled={actionLoading === lead.id}
                    onClick={() => toggleLead(lead.id, !lead.isHandled)}
                    className={`text-xs font-bold py-2.5 px-4 rounded-xl disabled:opacity-50 ${
                      lead.isHandled
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                    }`}
                  >
                    {lead.isHandled ? "פתח מחדש" : "סמן כטופל"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "diagnostics" && (
          <div className="space-y-3">
            {diagnostics.length === 0 ? (
              <p className="text-sm text-slate-400">אין אבחונים שמורים עדיין.</p>
            ) : (
              diagnostics.map((item) => {
                let challengePreview = item.challenge;
                try {
                  const parsed = JSON.parse(item.challenge);
                  challengePreview =
                    parsed.bottleneckLabel ||
                    parsed.coreChallenge ||
                    parsed.learningTarget ||
                    item.challenge;
                } catch {
                  /* keep raw */
                }
                return (
                  <div
                    key={item.id}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-right space-y-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-black text-white">{item.student.name}</h3>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString("he-IL")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400" dir="ltr">
                      {item.student.phone}
                    </p>
                    <p className="text-xs text-violet-300">
                      {item.ageGroup} · {item.subject}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{challengePreview}</p>
                    <p className="text-[11px] text-slate-500">
                      יתרת קרדיטים: {item.student.lessonCredits}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-end pt-2">
                      <button
                        type="button"
                        disabled={actionLoading === `match-${item.student.id}`}
                        onClick={() => runMatchForStudent(item.student.id)}
                        className="text-[11px] font-bold py-2 px-3 rounded-lg bg-violet-600/80 hover:bg-violet-500 text-white disabled:opacity-50"
                      >
                        חשב התאמת מורה
                      </button>
                      {matchPreview[item.student.id] && (
                        <button
                          type="button"
                          disabled={actionLoading === `assign-${item.student.id}`}
                          onClick={() => assignMatchForStudent(item.student.id)}
                          className="text-[11px] font-bold py-2 px-3 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white disabled:opacity-50"
                        >
                          שייך הפנייה למורה המומלץ
                        </button>
                      )}
                    </div>
                    {matchPreview[item.student.id] && (
                      <div className="bg-slate-950/60 border border-violet-500/20 rounded-xl p-3 text-[11px] space-y-1">
                        <p className="font-bold text-violet-300">
                          מומלץ: {matchPreview[item.student.id]!.teacherName} · ציון{" "}
                          {matchPreview[item.student.id]!.matchScore}
                        </p>
                        <p className="text-slate-400">
                          הפניות עד כה: {matchPreview[item.student.id]!.referralCount}
                        </p>
                        {matchPreview[item.student.id]!.reasons.length > 0 && (
                          <p className="text-slate-500">
                            {matchPreview[item.student.id]!.reasons.join(" · ")}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
