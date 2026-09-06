"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  fieldClass,
  frostCard,
  pageCanvas,
  primaryCta,
  secondaryCta,
} from "../../lib/ui";

type Step = "phone" | "otp" | "password";

/** RTL back: arrow points right (visual →) */
function BackArrow({ className = "ms-1.5 inline-block h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** RTL forward: arrow points left (visual ←) */
function ForwardArrow({ className = "me-1.5 inline-block h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      className={`${pageCanvas} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}
      dir="rtl"
    >
      <div className={`max-w-md w-full space-y-6 ${frostCard} p-8`}>
        <div className="text-center space-y-2">
          <Link
            href="/login"
            className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            חזרה להתחברות
            <BackArrow />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            שחזור סיסמה
          </h1>
          <p className="text-xs text-neutral-500">
            שלב {stepIndex} מתוך 3 — אימות באמצעות קוד SMS (Mock)
          </p>
        </div>

        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-neutral-900 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(stepIndex / 3) * 100}%` }}
          />
        </div>

        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-neutral-600 block mb-1.5 text-start">
                מספר הטלפון הרשום במערכת
              </label>
              <input
                type="tel"
                required
                disabled={loading}
                dir="rtl"
                className={fieldClass}
                placeholder="0501234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" disabled={loading} className={`w-full ${primaryCta}`}>
              {loading ? "שולח..." : "שלח קוד"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyStep} className="space-y-5">
            <p className="text-xs text-neutral-500 text-start leading-relaxed">
              הזינו את קוד ה־6 ספרות שנשלח ל־
              <span className="text-neutral-800 font-mono" dir="ltr">
                {phone}
              </span>
              . בבדיקה מקומית הקוד מופיע בטרמינל השרת.
            </p>
            <div>
              <label className="text-xs font-semibold text-neutral-600 block mb-1.5 text-start">
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
                className={`${fieldClass} tracking-[0.4em] text-center font-mono`}
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
                className={`flex-1 inline-flex items-center justify-center ${secondaryCta} text-xs`}
              >
                חזור אחורה
                <BackArrow />
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 inline-flex items-center justify-center ${primaryCta}`}
              >
                <ForwardArrow />
                המשך
              </button>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => void sendOtp()}
              className="w-full text-xs text-neutral-500 hover:text-neutral-800"
            >
              שלח קוד מחדש
            </button>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-neutral-600 block mb-1.5 text-start">
                סיסמה חדשה
              </label>
              <input
                type="password"
                required
                disabled={loading}
                minLength={6}
                dir="rtl"
                className={fieldClass}
                placeholder="לפחות 6 תווים"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-600 block mb-1.5 text-start">
                אימות סיסמה חדשה
              </label>
              <input
                type="password"
                required
                disabled={loading}
                minLength={6}
                dir="rtl"
                className={fieldClass}
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
                className={`flex-1 inline-flex items-center justify-center ${secondaryCta} text-xs`}
              >
                חזור אחורה
                <BackArrow />
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 ${primaryCta}`}
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
