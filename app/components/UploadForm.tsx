"use client";

import { useState } from "react";
import api from "@/app/services/api";
import {
  UploadCloud,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Layers,
  FileBadge2,
  AlertTriangle,
  X,
} from "lucide-react";

import ResumeViewer from "@/app/components/ResumeFileCard";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ResumeScanner from "./ResumeScanner";

type ComparisonItem = {
  category: string;
  title: string;
  detail: string;
  severity: "Important" | "Minor" | "Needs Review" | string;
  items: string[];
};

type ComparisonData = {
  summary?: string;
  highlights?: ComparisonItem[];
  stats?: {
    totalChanges?: number;
    importantChanges?: number;
    minorChanges?: number;
    reviewChanges?: number;
  };
};

export default function UploadForm() {
  const [oldResume, setOldResume] = useState<File | null>(null);
  const [newResume, setNewResume] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<"old" | "new" | null>(null);

  const handleSubmit = async () => {
    if (!oldResume || !newResume) {
      setStatus({
        type: "error",
        message: "Please upload both resumes before continuing.",
      });
      return;
    }

    setIsUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("oldResume", oldResume);
    formData.append("newResume", newResume);

    try {
      const res = await api.post("/resumes/compare", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = res.data?.data?.comparison;

      setComparison({
        summary: response?.summary || "Comparison completed successfully.",
        highlights: response?.highlights || [],
        stats: {
          totalChanges: response?.stats?.totalChanges ?? 0,
          importantChanges: response?.stats?.importantChanges ?? 0,
          minorChanges: response?.stats?.minorChanges ?? 0,
          reviewChanges: response?.stats?.reviewChanges ?? 0,
        },
      });

      setStatus({ type: "success", message: "Comparison generated below." });
    } catch (err) {
      console.log(err);
      setStatus({
        type: "error",
        message:
          "Failed to compare resumes. Please check your files and try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "needs review":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "important":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "minor":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
  };

  const openDeleteModal = (target: "old" | "new") => {
    setDeleteTarget(target);
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    if (deleteTarget === "old") {
      setOldResume(null);
    } else if (deleteTarget === "new") {
      setNewResume(null);
    }

    setDeleteTarget(null);
    setIsDeleteOpen(false);
    setStatus(null);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 1. LEFT PANEL: Upload Controls (Takes 5 cols on large screens) */}
      <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] h-full">
        <div className="mb-6">
          <h2 className="text-xl font-black tracking-tight text-slate-900">
            Compare Versions
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-normal leading-relaxed">
            Upload your original and new variations to view a structural profile
            analysis.
          </p>
        </div>

        {/* Status Notifications */}
        {status && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm border shadow-xs animate-in fade-in duration-200 ${
              status.type === "success"
                ? "bg-emerald-50/50 text-emerald-800 border-emerald-200/60"
                : "bg-rose-50/50 text-rose-800 border-rose-200/60"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            )}
            <span className="font-medium">
              {typeof status.message === "string" ? status.message : ""}
            </span>
          </div>
        )}

        <div className="space-y-5">
          {/* Stacked Vertical Upload Cards */}
          <div className="flex flex-col gap-4">
            {/* Previous Resume Slot */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                Original Resume
              </label>
              <div
                className={`relative h-24 border border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center p-4 text-center group ${
                  oldResume
                    ? "border-indigo-500/80 bg-indigo-50/30 shadow-[0_4px_12px_rgba(99,102,241,0.04)]"
                    : "border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-white shadow-xs"
                }`}
              >
                {oldResume ? (
                  <div className="flex items-center justify-between w-full relative z-10 animate-in fade-in zoom-in-95 duration-150 gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100/50">
                        <UploadCloud className="h-4 w-4" />
                      </div>
                      <span className="text-xs text-slate-800 font-semibold truncate block">
                        {oldResume.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openDeleteModal("old")}
                      className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 shadow-xs transition-all cursor-pointer shrink-0 active:scale-90"
                      title="Remove file"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-1">
                      <UploadCloud className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <div className="text-xs text-slate-700 font-semibold mt-1">
                        Choose original file{" "}
                        <span className="text-slate-400 font-normal">
                          or drag here
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      onChange={(e) => {
                        setOldResume(e.target.files?.[0] || null);
                        setStatus(null);
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Updated Resume Slot */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                New Variant
              </label>
              <div
                className={`relative h-24 border border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center p-4 text-center group ${
                  newResume
                    ? "border-indigo-500/80 bg-indigo-50/30 shadow-[0_4px_12px_rgba(99,102,241,0.04)]"
                    : "border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-white shadow-xs"
                }`}
              >
                {newResume ? (
                  <div className="flex items-center justify-between w-full relative z-10 animate-in fade-in zoom-in-95 duration-150 gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100/50">
                        <UploadCloud className="h-4 w-4" />
                      </div>
                      <span className="text-xs text-slate-800 font-semibold truncate block">
                        {newResume.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openDeleteModal("new")}
                      className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 shadow-xs transition-all cursor-pointer shrink-0 active:scale-90"
                      title="Remove file"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-1">
                      <UploadCloud className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <div className="text-xs text-slate-700 font-semibold mt-1">
                        Choose new variant{" "}
                        <span className="text-slate-400 font-normal">
                          or drag here
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      onChange={(e) => {
                        setNewResume(e.target.files?.[0] || null);
                        setStatus(null);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Refined Action Trigger Button */}
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] disabled:shadow-none disabled:cursor-not-allowed mt-2 transform active:scale-98 cursor-pointer"
          >
            {isUploading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-white" />
                <span>Processing Revisions...</span>
              </>
            ) : (
              <span>Compare Resumes</span>
            )}
          </button>
        </div>
      </div>

      {/* 2. RIGHT PANEL: Document Viewers Side-by-Side (Takes 7 cols on large screens) */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-100 p-6 rounded-2xl h-full items-stretch">
        <ResumeScanner loading={isUploading}>
          <ResumeViewer title="Previous Resume" file={oldResume} />
        </ResumeScanner>

        <ResumeScanner loading={isUploading}>
          <ResumeViewer title="Updated Resume" file={newResume} />
        </ResumeScanner>
      </div>

      {/* 3. BOTTOM PANEL: Spans full width underneath left & right sections */}
      {comparison && (
        <div className="lg:col-span-12 bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-[0_12px_40px_-15px_rgba(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-6 duration-400 mt-2">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-5 mb-5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 tracking-tight">
                Comparison Analysis Report
              </h3>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                AI-generated comprehensive delta evaluation logs.
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 bg-slate-50/70 border border-slate-100 p-4 rounded-xl font-normal">
            {comparison.summary}
          </p>

          {/* Premium Quick Metrics Breakdown counters */}
          <div className="mt-6 grid gap-4 grid-cols-3 max-w-xl">
            <div className="rounded-xl border border-slate-200/60 bg-white p-3.5 flex flex-col items-center justify-center shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-slate-400" /> Total Diffs
              </div>
              <div className="text-3xl font-black mt-1 text-slate-900">
                {comparison?.stats?.totalChanges}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200/70 bg-amber-50/20 p-3.5 flex flex-col items-center justify-center shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1.5">
                <FileBadge2 className="h-3 w-3 text-amber-500" /> Important
              </div>
              <div className="text-3xl font-black mt-1 text-amber-700">
                {comparison?.stats?.importantChanges}
              </div>
            </div>

            <div className="rounded-xl border border-rose-200/70 bg-rose-50/20 p-3.5 flex flex-col items-center justify-center shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-widest text-rose-700 flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 text-rose-500" /> Reviews
              </div>
              <div className="text-3xl font-black mt-1 text-rose-700">
                {comparison?.stats?.reviewChanges}
              </div>
            </div>
          </div>

          {/* Detailed Structural Revision Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {comparison.highlights?.length ? (
              comparison.highlights.map((item, index) => (
                <div
                  key={`${item.category}-${index}`}
                  className="rounded-xl border border-slate-200/70 bg-white p-5 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-black tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/40">
                          {item.category || "General Variation"}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base mt-2 tracking-tight">
                          {item.title}
                        </h4>
                      </div>
                      <span
                        className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold shrink-0 tracking-wide uppercase ${getSeverityStyles(
                          item.severity,
                        )}`}
                      >
                        {item.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>

                  {item.items && item.items.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs">
                      {item.items.map((entry, subIdx) => (
                        <li
                          key={`${index}-${subIdx}`}
                          className="flex items-start gap-2 text-slate-700 leading-normal"
                        >
                          <span className="text-indigo-500 select-none font-bold mt-0.5">
                            •
                          </span>
                          <span className="text-slate-600 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 block w-full text-[11px]">
                            {entry}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-sm text-slate-400 font-medium bg-slate-50 border border-slate-100 rounded-xl border-dashed">
                No structural metrics highlighted for comparison.
              </div>
            )}
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setDeleteTarget(null);
          setIsDeleteOpen(false);
        }}
        onConfirm={handleDelete}
        title={
          deleteTarget === "old"
            ? "Delete original resume?"
            : "Delete new resume?"
        }
        description="This will remove the selected uploaded resume from the comparison form. You can add another file at any time."
        confirmLabel="Yes, remove it"
        cancelLabel="Keep file"
      />
    </div>
  );
}
