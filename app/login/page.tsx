"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

function getSafeRedirectTarget(from: string | null): string {
  if (!from) return "/dashboard";
  if (!from.startsWith("/")) return "/dashboard";
  if (from.startsWith("//")) return "/dashboard";
  if (from === "/login" || from.startsWith("/login?")) return "/dashboard";
  if (from === "/register" || from.startsWith("/register?")) return "/dashboard";
  if (from === "/forgot-password" || from.startsWith("/forgot-password?")) {
    return "/dashboard";
  }
  return from;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const checkedSession = useRef(false);

  useEffect(() => {
    if (checkedSession.current) return;
    checkedSession.current = true;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok || cancelled) return;
        router.replace(getSafeRedirectTarget(searchParams.get("from")));
      } catch {
        // stay on login
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginToast = toast.loading("מתחבר לסביבת העבודה המאובטחת...");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "פרטי ההתחברות שגויים");
      }

      toast.success(`ברוך הבא, ${data.user.name}! 👋`, { id: loginToast });
      router.replace(getSafeRedirectTarget(searchParams.get("from")));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "שגיאה בהתחברות";
      toast.error(message, { id: loginToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-slate-800/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-md relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            כניסה למערכת
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            אזור כניסה מאוחד לתלמידים, הורים וצוות המורים.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            עדיין אין לך חשבון?{" "}
            <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              להרשמה בחינם
            </Link>
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1 px-1">אימייל או מספר טלפון</label>
            <input
              type="text"
              required
              disabled={loading}
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-left dir-ltr disabled:opacity-50"
              placeholder="0501234567 או email@example.com"
              value={formData.identifier || ""}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 px-1">
              <label className="text-xs font-bold text-slate-400">סיסמה</label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                שכחת סיסמה?
              </Link>
            </div>
            <input
              type="password"
              required
              disabled={loading}
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-left disabled:opacity-50"
              placeholder="••••••••"
              value={formData.password || ""}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:translate-y-[-1px] mt-6 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? "מבצע אימות מאובטח..." : "התחברות לפלטפורמה"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center" dir="rtl">
          טוען...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
