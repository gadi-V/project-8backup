"use client";

import React, { useState, useEffect } from "react";
import { PreLessonAssetType } from "@prisma/client";

interface PreLessonAssetItem {
  id: string;
  assetType: PreLessonAssetType;
  assetUrl: string | null;
  textContent: string | null;
  createdAt: string;
  uploadedBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface PreLessonAssetsSectionProps {
  packageId: string;
  currentUserId: string;
  isTeacher?: boolean;
}

export default function PreLessonAssetsSection({
  packageId,
  currentUserId,
  isTeacher = false,
}: PreLessonAssetsSectionProps) {
  const [assets, setAssets] = useState<PreLessonAssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [assetType, setAssetType] = useState<PreLessonAssetType>(PreLessonAssetType.IMAGE);
  const [assetUrl, setAssetUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/packages/${packageId}/assets`);
      if (!res.ok) throw new Error("error loading assets");
      const data = await res.json();
      setAssets(data.assets || []);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "error loading");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (packageId) {
      fetchAssets();
    }
  }, [packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (assetType === PreLessonAssetType.TEXT_NOTE && !textContent.trim()) {
      alert("please enter text content");
      return;
    }
    if (assetType !== PreLessonAssetType.TEXT_NOTE && !assetUrl.trim()) {
      alert("please enter a file URL");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/packages/${packageId}/assets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetType,
          assetUrl: assetType !== PreLessonAssetType.TEXT_NOTE ? assetUrl.trim() : undefined,
          textContent: assetType === PreLessonAssetType.TEXT_NOTE ? textContent.trim() : undefined,
          uploadedById: currentUserId,
        }),
      });

      if (!res.ok) throw new Error("upload failed");

      setAssetUrl("");
      setTextContent("");
      await fetchAssets();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm font-sans" dir="rtl">
      <div className="border-b border-slate-100 pb-4 mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          Pre-lesson Materials & Pedagogical Brief
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {isTeacher
            ? "Materials and questions the student shared before the next lesson"
            : "Upload questions, notebook screenshots, or topics to focus on"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 rounded-lg bg-slate-50 p-4 border border-slate-200">
        <div className="font-semibold text-xs text-slate-700 mb-2">Add material:</div>
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            onClick={() => setAssetType(PreLessonAssetType.IMAGE)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              assetType === PreLessonAssetType.IMAGE
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Image
          </button>
          <button
            type="button"
            onClick={() => setAssetType(PreLessonAssetType.PDF)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              assetType === PreLessonAssetType.PDF
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            PDF
          </button>
          <button
            type="button"
            onClick={() => setAssetType(PreLessonAssetType.TEXT_NOTE)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              assetType === PreLessonAssetType.TEXT_NOTE
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Text Note
          </button>
        </div>

        {assetType === PreLessonAssetType.TEXT_NOTE ? (
          <textarea
            rows={3}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Write your question or focus points..."
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        ) : (
          <input
            type="url"
            value={assetUrl}
            onChange={(e) => setAssetUrl(e.target.value)}
            placeholder={
              assetType === PreLessonAssetType.IMAGE
                ? "Paste image URL..."
                : "Paste PDF URL..."
            }
            className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        )}

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Add to brief"}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-4 text-xs text-slate-500">Loading...</div>
        ) : errorMsg ? (
          <div className="text-center py-4 text-xs text-rose-500">{errorMsg}</div>
        ) : assets.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-xs text-slate-400">
            No materials uploaded yet
          </div>
        ) : (
          assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-start justify-between rounded-lg border border-slate-100 bg-slate-50 p-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {asset.assetType}
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    by {asset.uploadedBy.name || asset.uploadedBy.email}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(asset.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {asset.textContent && (
                  <p className="text-xs text-slate-800 whitespace-pre-wrap mt-1 bg-white p-2 rounded border border-slate-100">
                    {asset.textContent}
                  </p>
                )}

                {asset.assetUrl && (
                  <div className="mt-1">
                    <a
                      href={asset.assetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 underline hover:text-indigo-800 inline-flex items-center gap-1"
                    >
                      Open source file
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
