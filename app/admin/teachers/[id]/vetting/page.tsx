"use client";

import React, { useEffect, useState, use } from "react";
import { VettingStepName, VettingStepStatus, VettingStatus } from "@prisma/client";

interface VettingStepLog {
  id: string;
  stepNumber: number;
  stepName: VettingStepName;
  status: VettingStepStatus;
  adminNotes: string | null;
  bypassedByAdmin: boolean;
  evaluatedByAdminId: string | null;
  completedAt: string | null;
}

interface TeacherProfileData {
  id: string;
  cvUrl: string | null;
  vettingStatus: VettingStatus;
  vettingNotes: string | null;
  payoutType: string;
  isApproved: boolean;
  bankName: string | null;
  accountNumber: string | null;
  user: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
  };
}

interface VettingProgressResponse {
  profile: TeacherProfileData;
  steps: VettingStepLog[];
  isComplete: boolean;
}

const STEP_LABELS: Record<VettingStepName, { title: string; desc: string }> = {
  REGISTRATION_AND_CV: {
    title: "1. רישום וקורות חיים",
    desc: "בדיקת מסמכי השכלה, קורות חיים ופרטים אישיים",
  },
  SCREENING_CALL: {
    title: "2. שיחת סינון טלפונית",
    desc: "תיאום ציפיות, זמינות ורמת מחויבות",
  },
  TEACHING_SIMULATION: {
    title: "3. סימולציית הוראה",
    desc: "העברת שיעור דוגמה קצר ובחינת מתודולוגיה פדגוגית",
  },
  EXAM_581: {
    title: "4. מבחן בגרות 581",
    desc: "בדיקת שליטה מקצועית במתמטיקה ברמת 5 יח״ל",
  },
  FINAL_VIDEO_CALL: {
    title: "5. ראיון וידאו מסכם",
    desc: "ראיון אישי עם מנהל פדגוגי והתרשמות כוללת",
  },
  FINAL_APPROVAL: {
    title: "6. אישור סופי והפעלת חשבון",
    desc: "חתימה על הסכם עבודה ופתיחת פרופיל למערכת השיעורים",
  },
};

const ORDERED_STEPS: VettingStepName[] = [
  VettingStepName.REGISTRATION_AND_CV,
  VettingStepName.SCREENING_CALL,
  VettingStepName.TEACHING_SIMULATION,
  VettingStepName.EXAM_581,
  VettingStepName.FINAL_VIDEO_CALL,
  VettingStepName.FINAL_APPROVAL,
];

export default function TeacherVettingAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const teacherId = resolvedParams.id;

  const [data, setData] = useState<VettingProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStep, setUpdatingStep] = useState<number | null>(null);
  const [notesInput, setNotesInput] = useState<Record<number, string>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [strengthsInput, setStrengthsInput] = useState("");
  const [weaknessesInput, setWeaknessesInput] = useState("");
  const [savingPedagogy, setSavingPedagogy] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/teachers/${teacherId}/vetting`);
      if (!res.ok) throw new Error("Failed to fetch vetting data");
      const json: VettingProgressResponse = await res.json();
      setData(json);

      const initialNotes: Record<number, string> = {};
      json.steps.forEach((s) => {
        if (s.adminNotes) initialNotes[s.stepNumber] = s.adminNotes;

      });
      setNotesInput(initialNotes);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [teacherId]);

  const handleUpdateStatus = async (
    stepNumber: number,
    stepName: VettingStepName,
    status: VettingStepStatus,
    bypassed = false
  ) => {
    try {
      setUpdatingStep(stepNumber);
      const res = await fetch(`/api/admin/teachers/${teacherId}/vetting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepNumber,
          stepName,
          status,
          adminNotes: notesInput[stepNumber] || "",
          bypassedByAdmin: bypassed,
        }),
      });

      if (!res.ok) throw new Error("Failed to update step");
      await fetchData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingStep(null);
    }
  };

  // Saves a structured pedagogical evaluation (strengths/weaknesses) to the
  // FINAL_APPROVAL step notes — additive, never overwrites prior notes.
  const handleSavePedagogicalAssessment = async () => {
    if (!strengthsInput.trim() && !weaknessesInput.trim()) return;
    setSavingPedagogy(true);
    try {
      const { stepNumber, stepName } =
        ORDERED_STEPS.length > 0
          ? { stepNumber: ORDERED_STEPS.length, stepName: ORDERED_STEPS[ORDERED_STEPS.length - 1] }
          : { stepNumber: 1, stepName: VettingStepName.REGISTRATION_AND_CV };

      const evaluationText = [
        strengthsInput.trim() ? `חוזקות: ${strengthsInput.trim()}` : "",
        weaknessesInput.trim() ? `חולשות: ${weaknessesInput.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch(`/api/admin/teachers/${teacherId}/vetting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepNumber,
          stepName,
          status: VettingStepStatus.PENDING,
          adminNotes: evaluationText,
          bypassedByAdmin: false,
        }),
      });
      if (!res.ok) throw new Error("Failed to save assessment");
      await fetchData();
      alert("ההערכה הפדגוגית נשמרה");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to save assessment");
    } finally {
      setSavingPedagogy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 font-sans" dir="rtl">
        <div className="text-lg font-medium text-slate-600">טוען נתוני משפך סינון...</div>
      </div>
    );
  }

  if (errorMsg || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 font-sans" dir="rtl">
        <div className="rounded-lg bg-red-50 p-6 text-red-700 shadow">
          <p className="font-bold">שגיאה בטעינת הנתונים</p>
          <p className="text-sm">{errorMsg || "פרופיל המורה לא נמצא"}</p>
        </div>
      </div>
    );
  }

  const { profile, steps } = data;
  const logsMap = new Map(steps.map((s) => [s.stepNumber, s]));

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans text-slate-900" dir="rtl">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* כותרת ופרטי מורה */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                משפך סינון וקליטה: {profile.user.name || "ללא שם"}
              </h1>
              <p className="text-sm text-slate-500">
                אימייל: {profile.user.email} | טלפון: {profile.user.phone || "לא צוין"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">סטטוס משפך כללי:</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  profile.vettingStatus === VettingStatus.APPROVED
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : profile.vettingStatus === VettingStatus.REJECTED
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {profile.vettingStatus}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-700">סוג תשלום: </span>
              {profile.payoutType}
            </div>
            <div>
              <span className="font-semibold text-slate-700">חשבון בנק: </span>
              {profile.bankName ? `${profile.bankName} (${profile.accountNumber})` : "לא הוזן"}
            </div>
            <div>
              <span className="font-semibold text-slate-700">קורות חיים: </span>
              {profile.cvUrl ? (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  צפה בקובץ CV
                </a>
              ) : (
                "לא הועלה קובץ"
              )}
            </div>
          </div>

          {/* הערכה מילולית מובנית: חוזקות / חולשות פדגוגיות */}
          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700">
                חוזקות פדגוגיות
              </label>
              <textarea
                value={strengthsInput}
                onChange={(e) => setStrengthsInput(e.target.value)}
                placeholder="למשל: הסבר מסודר, סבלנות, שליטה בחומר 5 יח״ל..."
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700">
                חולשות / נקודות לשיפור
              </label>
              <textarea
                value={weaknessesInput}
                onChange={(e) => setWeaknessesInput(e.target.value)}
                placeholder="למשל: ניהול זמן, היערכות לשיעור ראשון..."
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <button
              type="button"
              disabled={savingPedagogy || (!strengthsInput.trim() && !weaknessesInput.trim())}
              onClick={() => handleSavePedagogicalAssessment()}
              className="justify-self-start rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {savingPedagogy ? "שומר..." : "שמירת הערכה פדגוגית"}
            </button>
          </div>
        </div>

        {/* דיאגרמת שלבים ויזואלית: V הושלם · - ממתין · X נדחה */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="mb-4 text-sm font-black text-slate-800">דיאגרמת שלבי הקליטה</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {ORDERED_STEPS.map((stepName, idx) => {
              const stepNumber = idx + 1;
              const log = logsMap.get(stepNumber);
              const status = log ? log.status : VettingStepStatus.PENDING;
              const isPassed =
                status === VettingStepStatus.PASSED ||
                status === VettingStepStatus.SKIPPED;
              const isFailed = status === VettingStepStatus.FAILED;

              return (
                <div
                  key={stepName}
                  className={`rounded-xl border p-3 text-center transition ${
                    isFailed
                      ? "border-rose-300 bg-rose-50"
                      : isPassed
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div
                    className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${
                      isFailed
                        ? "bg-rose-600 text-white"
                        : isPassed
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isFailed ? "X" : isPassed ? "V" : "-"}
                  </div>
                  <p className="text-[11px] font-black text-slate-700">
                    {STEP_LABELS[stepName].title.replace(/^\d+\.\s*/, "")}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold text-slate-500">
                    {isFailed ? "נדחה" : isPassed ? "הושלם" : "ממתין"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6 שלבי המשפך */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">שלבי הסינון (6 שלבים מלאים)</h2>
          {ORDERED_STEPS.map((stepName, idx) => {
            const stepNumber = idx + 1;
            const log = logsMap.get(stepNumber);
            const status = log ? log.status : VettingStepStatus.PENDING;
            const isUpdating = updatingStep === stepNumber;
            const stepInfo = STEP_LABELS[stepName];

            return (
              <div
                key={stepName}
                className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 transition hover:border-slate-300"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-slate-800">{stepInfo.title}</span>
                      <span
                        className={`rounded px-2.5 py-0.5 text-xs font-semibold ${
                          status === VettingStepStatus.PASSED
                            ? "bg-emerald-100 text-emerald-700"
                            : status === VettingStepStatus.FAILED
                            ? "bg-rose-100 text-rose-700"
                            : status === VettingStepStatus.SKIPPED
                            ? "bg-purple-100 text-purple-700"
                            : status === VettingStepStatus.PENDING
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{stepInfo.desc}</p>
                    {log?.completedAt && (
                      <p className="text-[11px] text-slate-400">
                        הושלם בתאריך: {new Date(log.completedAt).toLocaleString("he-IL")}
                      </p>
                    )}
                  </div>

                  {/* כפתורי פעולה */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        handleUpdateStatus(stepNumber, stepName, VettingStepStatus.PASSED)
                      }
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {isUpdating ? "מעדכן..." : "אשר שלב (Pass)"}
                    </button>
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        handleUpdateStatus(stepNumber, stepName, VettingStepStatus.FAILED)
                      }
                      className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50"
                    >
                      פסול (Fail)
                    </button>
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        handleUpdateStatus(stepNumber, stepName, VettingStepStatus.SKIPPED, true)
                      }
                      className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-300 disabled:opacity-50"
                    >
                      דלג מנהל (Bypass)
                    </button>

                    {/* Skip Exam Stage — ייעודי לשלב 4 (מבחן 581) */}
                    {stepName === VettingStepName.EXAM_581 && (
                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          handleUpdateStatus(stepNumber, stepName, VettingStepStatus.SKIPPED, true)
                        }
                        className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-purple-700 disabled:opacity-50"
                        title="מאשר את השלב עבור מורים מצטיינים / בעלי ותק מוכח — ללא מבחן"
                      >
                        Skip Exam Stage
                      </button>
                    )}

                    {/* אישור סופי — מעביר את השלב האחרון ופותח את המורה */}
                    {stepName === VettingStepName.FINAL_APPROVAL && (
                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          handleUpdateStatus(stepNumber, stepName, VettingStepStatus.PASSED)
                        }
                        className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-50"
                        title="מאשר את המורה סופית — פותח לו דף שעות שבועי"
                      >
                        אישור סופי (Approve Teacher)
                      </button>
                    )}
                  </div>
                </div>

                {/* הערות מנהל לשלב */}
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="הוסף הערת מנהל לשלב זה..."
                      value={notesInput[stepNumber] || ""}
                      onChange={(e) =>
                        setNotesInput((prev) => ({ ...prev, [stepNumber]: e.target.value }))
                      }
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
