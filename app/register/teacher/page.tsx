"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AGE_GROUP_OPTIONS = ["יסודי", "חטיבה", "תיכון", "אקדמיה"] as const;

type TeacherFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  subjectsText: string;
  ageGroups: string[];
  bio: string;
  profileImageUrl: string;
};

export default function TeacherRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<TeacherFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    subjectsText: "",
    ageGroups: [],
    bio: "",
    profileImageUrl: "",
  });

  const toggleAgeGroup = (group: string) => {
    setFormData((prev) => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(group)
        ? prev.ageGroups.filter((g) => g !== group)
        : [...prev.ageGroups, group],
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim()) {
        toast.error("אנא מלאו שם מלא ומספר טלפון");
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        toast.error("יש לבחור סיסמה של לפחות 6 תווים");
        return;
      }
    }
    if (step === 2) {
      const subjects = formData.subjectsText
        .split(/[,،\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (subjects.length === 0) {
        toast.error("יש להזין לפחות מקצוע התמחות אחד");
        return;
      }
      if (formData.ageGroups.length === 0) {
        toast.error("יש לבחור לפחות קבוצת גיל אחת");
        return;
      }
    }
    setSubmitError("");
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    const subjects = formData.subjectsText
      .split(/[,،\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (subjects.length === 0) {
      toast.error("יש להזין לפחות מקצוע התמחות אחד");
      return;
    }

    setLoading(true);
    setSubmitError("");
    const progressToast = toast.loading("יוצר חשבון מורה ושומר פרופיל...");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          password: formData.password,
          role: "TEACHER",
          subjects,
          ageGroups: formData.ageGroups,
          bio: formData.bio.trim() || undefined,
          profileImageUrl: formData.profileImageUrl.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "שגיאה ביצירת חשבון המורה");
      }

      toast.success(
        `ברוך הבא, ${data.user.name}! החשבון ממתין לאישור צוות.`,
        { id: progressToast }
      );
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "שגיאה בלתי צפויה במהלך הרישום";
      setSubmitError(message);
      toast.error(message, { id: progressToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans antialiased py-16 px-6"
      dir="rtl"
    >
      <div className="max-w-xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <Link
            href="/register"
            className="text-xs font-black tracking-widest text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            ← חזרה לבחירת סוג הרשמה
          </Link>
          <h1 className="text-4xl font-black text-[#1d1d1f] tracking-tight pt-4">
            הרשמת מורה / מרצה
          </h1>
          <p className="text-xs font-bold text-[#6e6e73]">
            פתיחת חשבון TEACHER עם פרופיל מקצועי — לאחר אישור אדמין
          </p>
        </div>

        <div className="w-full bg-[#e5e5e7] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#0071e3] h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="bg-white border border-[#e5e5e7] p-8 rounded-3xl shadow-sm space-y-8">
          {step === 1 && (
            <div className="space-y-4 text-right animate-fadeIn">
              <h3 className="text-xl font-black text-[#1d1d1f]">פרטי התקשרות וכניסה</h3>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="שם מלא *"
                className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="מספר טלפון *"
                className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none text-right"
                dir="ltr"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="אימייל (אופציונלי)"
                className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none text-right"
                dir="ltr"
              />
              <div className="space-y-1">
                <label className="text-xs font-black text-[#6e6e73]">סיסמה *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="לפחות 6 תווים"
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none text-right"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 text-right animate-fadeIn">
              <h3 className="text-xl font-black text-[#1d1d1f]">פרופיל הוראה מקצועי</h3>
              <div className="space-y-1">
                <label className="text-xs font-black text-[#6e6e73]">
                  תחומי התמחות (מופרדים בפסיק) *
                </label>
                <input
                  type="text"
                  value={formData.subjectsText}
                  onChange={(e) =>
                    setFormData({ ...formData, subjectsText: e.target.value })
                  }
                  placeholder="מתמטיקה, פיזיקה, אינפי 1"
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-[#6e6e73]">
                  קבוצות גיל להוראה *
                </label>
                <div className="flex flex-wrap gap-2 justify-end">
                  {AGE_GROUP_OPTIONS.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => toggleAgeGroup(group)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        formData.ageGroups.includes(group)
                          ? "bg-[#0071e3] border-[#0071e3] text-white"
                          : "bg-[#f5f5f7] border-slate-200 text-[#6e6e73]"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-[#6e6e73]">אודות / ניסיון</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  placeholder="רקע פדגוגי, ניסיון, גישה להוראה..."
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none resize-y"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-[#6e6e73]">
                  קישור לתמונת פרופיל (אופציונלי)
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={formData.profileImageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, profileImageUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-right animate-fadeIn">
              <h3 className="text-xl font-black text-[#1d1d1f]">סיכום לפני שליחה</h3>
              <div className="bg-[#f5f5f7] border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                <p>
                  <span className="font-black text-[#6e6e73]">שם: </span>
                  {formData.name}
                </p>
                <p dir="ltr" className="text-right">
                  <span className="font-black text-[#6e6e73]">טלפון: </span>
                  {formData.phone}
                </p>
                <p>
                  <span className="font-black text-[#6e6e73]">מקצועות: </span>
                  {formData.subjectsText}
                </p>
                <p>
                  <span className="font-black text-[#6e6e73]">קבוצות גיל: </span>
                  {formData.ageGroups.join(" · ")}
                </p>
                {formData.bio ? (
                  <p>
                    <span className="font-black text-[#6e6e73]">אודות: </span>
                    {formData.bio}
                  </p>
                ) : null}
              </div>
              <p className="text-[11px] font-bold text-[#6e6e73] leading-relaxed">
                לאחר ההרשמה החשבון יועבר לדאשבורד המורה במצב &quot;ממתין לאישור&quot;.
                פתיחת שעות ביומן תתאפשר רק אחרי אישור אדמין. זמינות ראשונית אפשר
                להגדיר מהיומן בדאשבורד אחרי האישור.
              </p>
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-xl">
                  {submitError}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e7]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setSubmitError("");
                  setStep((s) => s - 1);
                }}
                disabled={loading}
                className="text-xs font-black text-[#6e6e73] hover:text-[#1d1d1f] transition-colors disabled:opacity-50"
              >
                חזור אחורה
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-black text-xs py-3 px-6 rounded-full transition-all shadow-md"
              >
                המשך לשלב הבא ←
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white font-black text-xs py-3 px-8 rounded-full transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "יוצר חשבון מורה..." : "פתיחת חשבון מורה"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
