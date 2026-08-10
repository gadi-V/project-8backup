"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Step = "phone" | "otp" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!phone.trim()) {
      toast.error("אנא הזינו מספר טלפון");
      return;
    }

    setLoading(true);
    const t = toast.loading("שולח קוד אימות...");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שליחת הקוד נכשלה");

      toast.success(
        data.sent
          ? "הקוד נשלח — בדקו את טרמינל השרת (Mock SMS)"
          : data.message || "אם המספר רשום, נשלח קוד",
        { id: t }
      );

      if (data.sent) {
        setStep("otp");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה", { id: t });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendOtp();
  };

  const handleVerifyStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code.trim())) {
      toast.error("הקוד חייב להיות בן 6 ספרות");
      return;
    }
    setStep("password");
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("הסיסמאות אינן תואמות");
      return;
    }

    setLoading(true);
    const t = toast.loading("מעדכן סיסמה...");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          code: code.trim(),
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "איפוס הסיסמה נכשל");

      toast.success(data.message || "הסיסמה עודכנה בהצלחה", { id: t });
      router.push("/login");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה", { id: t });
      // If OTP invalid, go back to OTP step
      if (err instanceof Error && err.message.includes("קוד")) {
        setStep("otp");
      }
    } finally {
      setLoading(false);
    }
  };

  const stepIndex = step === "phone" ? 1 : step === "otp" ? 2 : 3;

  return (
    <div
      className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full space-y-6 bg-slate-800/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-md relative z-10">
        <div className="text-center space-y-2">
          <Link
            href="/login"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← חזרה להתחברות
          </Link>
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            שחזור סיסמה
          </h1>
          <p className="text-xs text-slate-400">
            שלב {stepIndex} מתוך 3 — אימות באמצעות קוד SMS (Mock)
          </p>
        </div>

        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${(stepIndex / 3) * 100}%` }}
          />
        </div>

        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1 px-1">
                מספר הטלפון הרשום במערכת
              </label>
              <input
                type="tel"
                required
                disabled={loading}
                dir="ltr"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-left disabled:opacity-50"
                placeholder="0501234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl disabled:opacity-50"
            >
              {loading ? "שולח..." : "שלח קוד"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyStep} className="space-y-5">
            <p className="text-xs text-slate-400 text-right leading-relaxed">
              הזינו את קוד ה־6 ספרות שנשלח ל־
              <span className="text-blue-300 font-mono" dir="ltr">
                {phone}
              </span>
              . בבדיקה מקומית הקוד מופיע בטרמינל השרת.
            </p>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1 px-1">
                קוד אימות
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                required
                disabled={loading}
                dir="ltr"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white tracking-[0.4em] text-center font-mono focus:outline-none focus:border-blue-500 disabled:opacity-50"
                placeholder="••••••"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => setStep("phone")}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs border border-slate-700"
              >
                חזור אחורה
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl disabled:opacity-50"
              >
                המשך
              </button>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => void sendOtp()}
              className="w-full text-xs text-blue-400 hover:text-blue-300"
            >
              שלח קוד מחדש
            </button>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1 px-1">
                סיסמה חדשה
              </label>
              <input
                type="password"
                required
                disabled={loading}
                minLength={6}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                placeholder="לפחות 6 תווים"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1 px-1">
                אימות סיסמה חדשה
              </label>
              <input
                type="password"
                required
                disabled={loading}
                minLength={6}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                placeholder="הקלידו שוב"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => setStep("otp")}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs border border-slate-700"
              >
                חזור אחורה
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl disabled:opacity-50"
              >
                {loading ? "שומר..." : "שמור סיסמה חדשה"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
