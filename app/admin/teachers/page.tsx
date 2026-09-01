"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { VettingStatus } from "@prisma/client";

interface TeacherItem {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  vettingStatus: VettingStatus;
  vettingStage: string | null;
  payoutType: string;
  isApproved: boolean;
  passedStepsCount: number;
  totalSteps: number;
  createdAt: string;
}

const TABS: { id: string; label: string; status?: VettingStatus }[] = [
  { id: "ALL", label: "All teachers and candidates" },
  { id: "PENDING", label: "Pending screening", status: VettingStatus.PENDING },
  { id: "IN_PROGRESS", label: "In screening", status: VettingStatus.IN_PROGRESS },
  { id: "APPROVED", label: "Approved and active", status: VettingStatus.APPROVED },
  { id: "REJECTED", label: "Rejected", status: VettingStatus.REJECTED },
];

export default function AdminTeachersListPage() {
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const activeTab = TABS.find((t) => t.id === selectedTab);
      const params = new URLSearchParams();

      if (activeTab?.status) params.set("status", activeTab.status);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());

      const res = await fetch(`/api/admin/teachers?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load teachers");
      const data = await res.json();
      setTeachers(data.teachers || []);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [selectedTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTeachers();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans text-slate-900" dir="rtl">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Teacher vetting queue</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage candidates, track the 6 pedagogical screening steps, and approve teaching profiles.
            </p>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-64 shadow-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading...</div>
          ) : errorMsg ? (
            <div className="py-12 text-center text-xs text-rose-500">{errorMsg}</div>
          ) : teachers.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">No teachers in this view</div>
          ) : (
            <table className="w-full text-right text-xs">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4 font-bold">Teacher</th>
                  <th className="p-4 font-bold">Contact</th>
                  <th className="p-4 font-bold">Screening progress</th>
                  <th className="p-4 font-bold">Funnel status</th>
                  <th className="p-4 font-bold">Payout</th>
                  <th className="p-4 font-bold">Submitted</th>
                  <th className="p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-bold text-slate-800">{teacher.name}</td>
                    <td className="p-4 text-slate-600 space-y-0.5">
                      <div>{teacher.email}</div>
                      <div className="text-[11px] text-slate-400">{teacher.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                          <div
                            className="h-full bg-indigo-600 transition-all duration-300"
                            style={{
                              width: `${(teacher.passedStepsCount / teacher.totalSteps) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700">
                          {teacher.passedStepsCount}/{teacher.totalSteps}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          teacher.vettingStatus === VettingStatus.APPROVED
                            ? "bg-emerald-100 text-emerald-800"
                            : teacher.vettingStatus === VettingStatus.REJECTED
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {teacher.vettingStatus}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{teacher.payoutType}</td>
                    <td className="p-4 text-slate-500 text-[11px]">
                      {new Date(teacher.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/teachers/${teacher.id}/vetting`}
                        className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition"
                      >
                        Manage screening
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
