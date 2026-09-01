"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

/**
 * עמוד ניהול שכר וסליקה מרוכז למנהל (ADMIN/MANAGER).
 * ・ טבלת תור סליקה: SCHEDULED / PROCESSING עם פרטי המורה ובנק.
 * ・ סימון כתשלום (settle) — נעשה דרך /api/admin/payouts/settle (ledger immutable).
 * ・ ייצוא קובץ מס"ב (CSV) לכל הפריטים בתור, לפי פורמט העברות בנקאיות.
 */

type PayoutBank = {
  bankName: string | null;
  bankBranch: string | null;
  accountNumber: string | null;
  accountHolderName: string | null;
};

type PayoutItem = {
  id: string;
  amount: string;
  currency: string;
  status: string;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
  lessonId: string | null;
  lesson: { id: string; title: string | null; scheduledAt: string } | null;
  teacher: {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    bank: PayoutBank | null;
  };
};

type PayoutsResponse = {
  payouts: PayoutItem[];
};

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<PayoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [settlingId, setSettlingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchPayouts = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch("/api/admin/payouts");
      if (!res.ok) throw new Error("Failed to load payouts");
      const data: PayoutsResponse = await res.json();
      setPayouts(data.payouts ?? []);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  const handleSettle = async (payoutId: string) => {
    setSettlingId(payoutId);
    try {
      const res = await fetch("/api/admin/payouts/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payoutId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to settle payout");
      toast.success("התשלום סומן כשולם");
      await fetchPayouts();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Settle failed");
    } finally {
      setSettlingId(null);
    }
  };

  const totalAmount = useMemo(
    () => payouts.reduce((acc, p) => acc + Number(p.amount || 0), 0),
    [payouts]
  );

  // ייצוא קובץ מס"ב (CSV) — פורמט העברות מסלקת / בנק.
  const exportMasavCsv = () => {
    if (payouts.length === 0) return;
    const rows = payouts.map((p) => {
      const bank = p.teacher.bank;
      return [
        p.teacher.name,
        p.teacher.phone,
        bank?.bankName ?? "",
        bank?.bankBranch ?? "",
        bank?.accountNumber ?? "",
        bank?.accountHolderName ?? "",
        p.amount,
        p.currency,
        p.status,
        p.createdAt,
      ]
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(",");
    });
    const header = [
      "שם מורה",
      "טלפון",
      "בנק",
      "סניף",
      "חשבון",
      "שם בעל החשבון",
      "סכום",
      "מטבע",
      "סטטוס",
      "נוצר ב",
    ].join(",");
    const csv = `${header}\n${rows.join("\n")}`;
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payouts-masav-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 font-sans" dir="rtl">
        <div className="text-lg font-medium text-slate-600">טוען תור סליקה...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 font-sans text-slate-900" dir="rtl">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-800">ניהול שכר וסליקה</h1>
            <p className="text-sm text-slate-500">
              {payouts.length} תשלומים בתור · סה״כ {totalAmount.toLocaleString("he-IL")} ₪
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportMasavCsv}
              disabled={payouts.length === 0}
              className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 disabled:opacity-40"
            >
              ייצוא קובץ מס"ב (CSV)
            </button>
            <Link
              href="/admin"
              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              חזרה לדשבורד
            </Link>
          </div>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-bold text-rose-700">
            {errorMsg}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-slate-200">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-right text-xs font-black text-slate-600">
                <th className="px-4 py-3 ps-5 pe-4">מורה</th>
                <th className="px-4 py-3">פרטי בנק</th>
                <th className="px-4 py-3">סכום</th>
                <th className="px-4 py-3">סטטוס</th>
                <th className="px-4 py-3">פריט</th>
                <th className="px-4 py-3">פעולה</th>
              </tr>
            </thead>
            <tbody>
              {payouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm font-bold text-slate-400">
                    אין תשלומים ממתינים לסליקה כרגע
                  </td>
                </tr>
              ) : (
                payouts.map((p) => {
                  const bank = p.teacher.bank;
                  return (
                    <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                      <td className="px-4 py-3 ps-5 pe-4">
                        <p className="font-black text-slate-800">{p.teacher.name}</p>
                        <p className="text-xs text-slate-500">
                          {p.teacher.phone} · {p.teacher.email ?? ""}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {bank?.bankName ? (
                          <>
                            <p className="font-bold">{bank.bankName}</p>
                            <p>
                              סניף {bank.bankBranch ?? "—"} · {bank.accountNumber ?? "—"}
                            </p>
                            <p>{bank.accountHolderName ?? ""}</p>
                          </>
                        ) : (
                          <span className="text-slate-400">לא הוזנו פרטי בנק</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-black text-slate-800">
                        {Number(p.amount).toLocaleString("he-IL")} {p.currency}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-black ${
                            p.status === "PAID"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              : p.status === "FAILED"
                                ? "bg-rose-100 text-rose-700 border border-rose-300"
                                : "bg-amber-100 text-amber-700 border border-amber-300"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {p.lesson
                          ? `${p.lesson.title ?? "שיעור"} · ${new Date(p.lesson.scheduledAt).toLocaleDateString("he-IL")}`
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {p.status === "SCHEDULED" || p.status === "PROCESSING" ? (
                          <button
                            type="button"
                            disabled={settlingId === p.id}
                            onClick={() => handleSettle(p.id)}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                          >
                            {settlingId === p.id ? "מעדכן..." : "סמן כשולם"}
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-700">שולם</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}