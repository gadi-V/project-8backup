"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

type GradeLevel = "ELEMENTARY" | "MIDDLE_SCHOOL" | "HIGH_SCHOOL" | "ACADEMIC";

type ParsedTopic = {
  subject: string;
  topicName: string;
  subTopics: string[];
  gradeLevel: GradeLevel;
  weightInExam: number;
};

type ExplorerTopic = ParsedTopic & {
  id: string;
  teacherNames: string[];
  teacherCount: number;
};

type ExplorerGroup = {
  subject: string;
  gradeLevel: string;
  topics: ExplorerTopic[];
};

const GRADE_LABELS: Record<GradeLevel, string> = {
  ELEMENTARY: "יסודי",
  MIDDLE_SCHOOL: "חטיבת ביניים",
  HIGH_SCHOOL: "תיכון / בגרות",
  ACADEMIC: "אקדמיה",
};

const SAMPLE_SYLLABUS = `מתמטיקה 5 יח״ל שאלון 582:
- וקטורים (אלגבריים וגיאומטריים)
- גאומטריה אנליטית (אליפסה והיפרבולה)
- מספרים מרוכבים
- חדו״א של פונקציות מעריכיות ולוגריתמיות`;

export default function AdminCurriculumPage() {
  const router = useRouter();
  const [rawText, setRawText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [preview, setPreview] = useState<ParsedTopic[] | null>(null);
  const [committing, setCommitting] = useState(false);
  const [groups, setGroups] = useState<ExplorerGroup[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loadingTree, setLoadingTree] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingTopic, setEditingTopic] = useState<ParsedTopic | null>(null);

  const loadTree = useCallback(async () => {
    setLoadingTree(true);
    try {
      const res = await fetch("/api/admin/curriculum");
      if (res.status === 401 || res.status === 403) {
        router.replace("/login?from=/admin/curriculum");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "שגיאה בשליפת התכנית");
      }
      const data = (await res.json()) as { groups: ExplorerGroup[] };
      setGroups(data.groups);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בטעינת עץ התכנית");
    } finally {
      setLoadingTree(false);
    }
  }, [router]);

  useEffect(() => {
    loadTree();
  }, [loadTree]);

  const handleParse = async () => {
    if (rawText.trim().length < 10) {
      toast.error("הדביקו תחילה טקסט סילבוס (מינימום 10 תווים)");
      return;
    }
    setParsing(true);
    setPreview(null);
    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });
      if (res.status === 401 || res.status === 403) {
        router.replace("/login?from=/admin/curriculum");
        return;
      }
      const data = (await res.json()) as { topics?: ParsedTopic[]; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "ההנמכה נכשלה");
      }
      setPreview(data.topics ?? []);
      if (data.topics && data.topics.length > 0) {
        toast.success(
          `האג'נט ניתח ${data.topics.length} נושאים — בדקו את התצוגה לפני שמירה`
        );
      } else {
        toast.error("האג'נט לא זיהה נושאים");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בניתוח הסילבוס");
    } finally {
      setParsing(false);
    }
  };

  const handleCommit = async () => {
    if (!preview || preview.length === 0) return;
    setCommitting(true);
    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics: preview }),
      });
      const data = (await res.json()) as { count?: number; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "שגיאה בהמחזת נושאים");
      }
      toast.success(`נשמרו ${data.count ?? preview.length} נושאים ל-Database`);
      setPreview(null);
      setRawText("");
      await loadTree();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בשמירת הנושאים");
    } finally {
      setCommitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/curriculum?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "שגיאה במחיקת הנושא");
      }
      toast.success("הנושא נמחק");
      await loadTree();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה במחיקה");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (topic: ExplorerTopic) => {
    setEditingTopic({
      subject: topic.subject,
      topicName: topic.topicName,
      subTopics: topic.subTopics,
      gradeLevel: topic.gradeLevel,
      weightInExam: topic.weightInExam,
    });
  };

  const toggleGroup = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const groupKey = (g: ExplorerGroup) => `${g.subject}::${g.gradeLevel}`;

function topicKey(group: ExplorerGroup) {
  return `${group.subject}::${group.gradeLevel}`;
}

  return (
    <main className="min-h-screen bg-slate-950 text-white" dir="rtl">
      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              ← חזרה ללוח הניהול
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
              עץ תכנית לימודים ונושאים
            </h1>
            <p className="text-sm text-slate-400 font-bold mt-1">
              מערכת הזרקת תכניות לימודים לסילונים, מיקודי בגרות ותוכניות מתקדמות
            </p>
          </div>
          <span className="bg-violet-600 text-white text-xs font-black px-3 py-1.5 rounded-full">
            ADMIN / MANAGER
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Ingest panel */}
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">הזרקת תכנית מארק־דאון</h2>
              <button
                type="button"
                onClick={() => setRawText(SAMPLE_SYLLABUS)}
                className="text-xs font-bold text-violet-300 hover:text-violet-200"
              >
                הדבק דוגמה
              </button>
            </div>

            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={
                "הדביקו כאן טקסט של סילבוס / מיקור / פירוט בחינה…\n\nלדוגמה:\nמתמטיקה 5 יַח״ל שאר 582:\n- וקטורים (אלגבריים וגיאומטריים)\n- גאומטריה אניטית…"
              }
              className="w-full min-h-[200px] bg-slate-950 text-sm text-slate-100 border border-slate-700 rounded-xl p-3 font-mono leading-relaxed placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="button"
              disabled={parsing || rawText.trim().length < 10}
              onClick={handleParse}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {parsing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  טוען את ה‑Agent Hive…
                </span>
              ) : (
                "Parse with AI Hive ⚡"
              )}
            </button>

            {preview && preview.length > 0 && (
              <div className="border-t border-slate-800 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-200">
                    תצוגת עץ (לפני שמירה)
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {preview.length} נושאים
                  </span>
                </div>

                <ul className="space-y-3">
                  {preview.map((t, idx) => (
                    <li key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-sm font-black text-white block truncate">
                            {t.topicName}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">
                            {t.subject} · {GRADE_LABELS[t.gradeLevel]}
                          </span>
                        </div>
                        <span className="shrink-0 text-[11px] font-black bg-violet-900/60 text-violet-200 px-2 py-0.5 rounded-lg">
                          {Math.round(t.weightInExam * 100)}% במבחן
                        </span>
                      </div>

                      {t.subTopics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {t.subTopics.map((s, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  disabled={committing}
                  onClick={handleCommit}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {committing ? "משמר ל‑Database…" : "אישור והזרקת הנושאים ✓"}
                </button>
              </div>
            )}
          </section>

          {/* Explorer */}
          <section className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">סייר הנושאים</h2>
              <button
                type="button"
                onClick={loadTree}
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                refresh ↗
              </button>
            </div>

            {loadingTree ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-slate-800 rounded-xl" />
                ))}
              </div>
            ) : groups.length === 0 ? (
              <div className="text-center text-sm font-bold text-slate-500 py-12">
                עדיין אין נושאים — התחילו בהדבקת סילובס משמאל.
              </div>
            ) : (
              <div className="space-y-3">
                {groups.map((group) => {
                  const key = topicKey(group);
                  const isOpen = expanded[key] ?? false;
                  return (
                    <div key={key} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleGroup(key)}
                        className="w-full flex items-center justify-between px-4 py-3 text-right hover:bg-slate-900 transition-colors"
                      >
                        <div>
                          <span className="text-sm font-black text-white">{group.subject}</span>
                          <span className="mr-2 text-[11px] font-bold text-slate-500">
                            {GRADE_LABELS[group.gradeLevel as GradeLevel] ?? group.gradeLevel}
                          </span>
                        </div>
                        <span className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-violet-300 bg-violet-900/40 px-2 py-0.5 rounded-full">
                            {group.topics.length} נושאים
                          </span>
                          <svg
                            className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-800 divide-y divide-slate-800/60">
                          {group.topics.map((topic) => (
                            <div key={topic.id} className="px-4 py-3 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm font-black text-slate-100">{topic.topicName}</p>
                                  {topic.subTopics.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {topic.subTopics.map((s, i) => (
                                        <span key={i} className="text-[10px] font-bold bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
                                          {s}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[10px] font-black text-emerald-300 bg-emerald-900/40 px-2 py-1 rounded-lg">
                                    {topic.teacherCount} מורים
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleEdit(topic)}
                                    className="text-[10px] font-black text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg transition-colors"
                                    title="עריכת משקל / תתי-נושאים"
                                  >
                                    עריכ
                                  </button>
                                  <button
                                    type="button"
                                    disabled={deletingId === topic.id}
                                    onClick={() => handleDelete(topic.id)}
                                    className="text-[10px] font-black text-red-400 hover:text-red-300 bg-slate-800 px-2 py-1 rounded-lg transition-colors disabled:opacity-40"
                                  >
                                    {deletingId === topic.id ? "…" : "✕"}
                                  </button>
                                </div>
                              </div>

                              {topic.teacherNames.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {topic.teacherNames.slice(0, 6).map((n, i) => (
                                    <span key={i} className="text-[10px] font-bold bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded-full">
                                      👨‍🏫 {n}
                                    </span>
                                  ))}
                                  {topic.teacherNames.length > 6 && (
                                    <span className="text-[10px] font-bold text-slate-500">
                                      +{topic.teacherNames.length - 6} נוספים
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Edit modal */}
        {editingTopic && (
          <EditTopicModal
            topic={editingTopic}
            onClose={() => setEditingTopic(null)}
            onSaved={(updated) => {
              setEditingTopic(null);
              loadTree();
              toast.success("הנושא עודכן");
            }}
          />
        )}
      </div>
    </main>
  );
}

/**
 * Lightweight inline edit modal — re-commits through PUT (additive upsert by
 * subject + topicName + gradeLevel) so the 09-database-safety rule is respected.
 */
function EditTopicModal({
  topic,
  onClose,
  onSaved,
}: {
  topic: ParsedTopic;
  onClose: () => void;
  onSaved: (t: ParsedTopic) => void;
}) {
  const [form, setForm] = useState<ParsedTopic>({ ...topic });
  const [saving, setSaving] = useState(false);

  const update = (patch: Partial<ParsedTopic>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics: [form] }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "שגיאה בעדכון הנושא");
      onSaved(form);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "שגיאה בעדכון");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 w-full max-w-md space-y-4">
        <h3 className="text-lg font-black text-white">עריכת נושא</h3>

        <label className="block text-xs font-bold text-slate-400" htmlFor="ed-topic">
          שם הנושא
        </label>
        <input
          id="ed-topic"
          value={form.topicName}
          onChange={(e) => update({ topicName: e.target.value })}
          className="w-full bg-slate-950 text-sm text-slate-100 border border-slate-700 rounded-xl px-3 py-2"
        />

        <label className="block text-xs font-bold text-slate-400">תת־נושאים (מופרדים בפסיק)</label>
        <input
          value={form.subTopics.join(", ")}
          onChange={(e) =>
            update({ subTopics: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
          }
          className="w-full bg-slate-950 text-sm text-slate-100 border border-slate-700 rounded-xl px-3 py-2"
        />

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-bold text-slate-400">
            רמת לימוד
            <select
              value={form.gradeLevel}
              onChange={(e) => update({ gradeLevel: e.target.value as GradeLevel })}
              className="w-full bg-slate-950 text-sm text-slate-100 border border-slate-700 rounded-xl px-2 py-2 mt-1"
            >
              <option value="ELEMENTARY">יסודי</option>
              <option value="MIDDLE_SCHOOL">חטיבת ביניים</option>
              <option value="HIGH_SCHOOL">תיכון / בגרות</option>
              <option value="ACADEMIC">אקדמיה</option>
            </select>
          </label>
          <label className="block text-xs font-bold text-slate-400">
            משקל במבחן
            <input
              type="number"
              min={0.1}
              max={1}
              step={0.05}
              value={form.weightInExam}
              onChange={(e) => update({ weightInExam: Number(e.target.value) })}
              className="w-full bg-slate-950 text-sm text-slate-100 border border-slate-700 rounded-xl px-2 py-2 mt-1"
            />
          </label>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl disabled:opacity-40"
          >
            {saving ? "מששר..." : "שמירה"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl"
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}