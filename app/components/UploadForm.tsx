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
      console.error(err);
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

  return (
    <div className=" w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* 1. LEFT PANEL: Upload Controls */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Compare Resume Versions
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload your original and new variations to view a structural profile
            analysis.
          </p>
        </div>

        {/* Status Notifications */}
        {status && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm border ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Stacked Vertical Upload Cards */}
          <div className="flex flex-col gap-3">
            {/* Previous Resume Slot */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                Original Resume
              </label>
              <div
                className={`relative h-20 border-2 border-dashed rounded-xl transition-all duration-200 flex flex-col items-center justify-center p-2 text-center ${
                  oldResume
                    ? "border-indigo-500 bg-indigo-50/30 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                {oldResume ? (
                  <div className="flex items-center justify-between w-full px-4 relative z-10 animate-in fade-in duration-150 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <UploadCloud className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span className="text-xs text-slate-700 font-medium truncate block">
                        {oldResume.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOldResume(null)}
                      className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-600 hover:border-rose-200 shadow-xs transition-colors shrink-0"
                      title="Remove file"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <UploadCloud className="h-4 w-4 text-slate-400" />
                      <span className="text-xs text-slate-600 font-medium">
                        Choose original file
                      </span>
                      <span className="text-[10px] text-slate-400">
                        or drag here
                      </span>
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
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                New Variant
              </label>
              <div
                className={`relative h-20 border-2 border-dashed rounded-xl transition-all duration-200 flex flex-col items-center justify-center p-2 text-center ${
                  newResume
                    ? "border-indigo-500 bg-indigo-50/30 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                {newResume ? (
                  <div className="flex items-center justify-between w-full px-4 relative z-10 animate-in fade-in duration-150 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <UploadCloud className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span className="text-xs text-slate-700 font-medium truncate block">
                        {newResume.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewResume(null)}
                      className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-600 hover:border-rose-200 shadow-xs transition-colors shrink-0"
                      title="Remove file"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <UploadCloud className="h-4 w-4 text-slate-400" />
                      <span className="text-xs text-slate-600 font-medium">
                        Choose new variant
                      </span>
                      <span className="text-[10px] text-slate-400">
                        or drag here
                      </span>
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
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition shadow-sm shadow-indigo-100 disabled:shadow-none disabled:cursor-not-allowed mt-1"
          >
            {isUploading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Processing Diffs...</span>
              </>
            ) : (
              <span>Compare Resumes</span>
            )}
          </button>
        </div>
      </div>

      {/* 2. RIGHT PANEL: Document Viewers Side-by-Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 p-6 rounded-2xl h-full align-stretch">
        <ResumeViewer title="Previous Resume" file={oldResume} />
        <ResumeViewer title="Updated Resume" file={newResume} />
      </div>

      {/* 3. BOTTOM PANEL: Spans full width underneath left & right sections */}
      {comparison && (
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 text-indigo-700 border-b border-slate-100 pb-4 mb-4">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h3 className="font-bold text-lg text-slate-900">
              Comparison Report
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 border border-slate-100 p-4 rounded-xl">
            {comparison.summary}
          </p>

          {/* Quick Metrics Breakdown counters */}
          <div className="mt-6 grid gap-4 grid-cols-3 max-w-2xl">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 flex flex-col items-center justify-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Layers className="h-3 w-3" /> Total
              </div>
              <div className="text-2xl font-extrabold mt-0.5 text-slate-800">
                {comparison?.stats?.totalChanges}
              </div>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-3 flex flex-col items-center justify-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600/80 flex items-center gap-1">
                <FileBadge2 className="h-3 w-3" /> Important
              </div>
              <div className="text-2xl font-extrabold mt-0.5 text-amber-700">
                {comparison?.stats?.importantChanges}
              </div>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-3 flex flex-col items-center justify-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600/80 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Reviews
              </div>
              <div className="text-2xl font-extrabold mt-0.5 text-rose-700">
                {comparison?.stats?.reviewChanges}
              </div>
            </div>
          </div>

          {/* Detailed Structural Revision Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparison.highlights?.length ? (
              comparison.highlights.map((item, index) => (
                <div
                  key={`${item.category}-${index}`}
                  className="rounded-xl border border-slate-200/80 bg-white p-4 hover:border-slate-300 transition-colors shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500 block">
                        {item.category || "General Variation"}
                      </span>
                      <div className="font-bold text-slate-900 text-sm">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 leading-normal">
                        {item.detail}
                      </div>
                    </div>
                    <span
                      className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold shrink-0 tracking-wide ${getSeverityStyles(
                        item.severity,
                      )}`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  {item.items && item.items.length > 0 && (
                    <ul className="mt-3 list-inside list-disc space-y-1.5 border-t border-slate-50 pt-3 text-xs text-slate-600">
                      {item.items.map((entry, subIdx) => (
                        <li
                          key={`${index}-${subIdx}`}
                          className="pl-1 text-slate-700 leading-normal"
                        >
                          <span className="text-slate-600 font-mono">
                            {entry}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-6 text-sm text-slate-400 italic bg-slate-200/20 rounded-xl">
                No major modifications highlighted.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
