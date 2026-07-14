"use client";

import { useEffect, useState } from "react";
import api from "@/app/services/api";
import {
  AlertTriangle,
  FileBadge2,
  Layers,
  Sparkles,
  Trash2,
  History,
  Calendar,
  FileText,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await api.get("/resumes/history");
        setHistory(response.data?.history || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm(
      "Delete this comparison and its uploaded files? This cannot be undone.",
    );
    if (!ok) return;

    try {
      await api.delete(`/resumes/history/${id}`);
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete record");
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
    <div className="min-h-screen bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6 mb-8">
          <div className="bg-indigo-100 text-indigo-700 p-2.5 rounded-xl">
            <History className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Comparison History
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Reviewing all parsed differences, changes, and anomalies stored in
              MongoDB.
            </p>
          </div>
        </div>

        {/* Dynamic Layout Pipelines */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
            <p className="mt-3 text-sm font-medium text-slate-500">
              Retrieving historical records...
            </p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <div className="inline-flex p-3 rounded-full bg-slate-100 text-slate-400 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">
              No history found
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto">
              Run a fresh profile analysis logic sequence to populate records
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            {history.map((item) => {
              const comparison = item.comparison || {};
              const stats = comparison.stats || {};

              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow duration-200"
                >
                  {/* Top Meta Details bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                        {item.candidateName || "Candidate Profile Revision"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-500 mt-1 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg w-fit">
                        <span className="truncate max-w-[160px] sm:max-w-xs">
                          {item.oldResumeName}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 text-slate-400" />
                        <span className="truncate max-w-[160px] sm:max-w-xs text-indigo-600 font-medium">
                          {item.newResumeName}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 h-fit self-start sm:self-center">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Summary Status Text */}
                  <div className="mt-4 leading-relaxed text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-100/70 px-4 py-3 rounded-xl flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>
                      Status:{" "}
                      {comparison.summary || "Significant Profile Update"}
                    </span>
                  </div>

                  {/* Operational Summary Grid Metrics */}
                  <div className="mt-4 grid gap-3 grid-cols-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <Layers className="h-3 w-3" /> Total Diff logs
                      </div>
                      <div className="mt-0.5 text-xl font-extrabold text-slate-800">
                        {stats.totalChanges ?? 0}
                      </div>
                    </div>
                    <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-3 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600/80">
                        <FileBadge2 className="h-3 w-3" /> Important
                      </div>
                      <div className="mt-0.5 text-xl font-extrabold text-amber-700">
                        {stats.importantChanges ?? 0}
                      </div>
                    </div>
                    <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-3 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-600/80">
                        <AlertTriangle className="h-3 w-3" /> Reviews
                      </div>
                      <div className="mt-0.5 text-xl font-extrabold text-rose-700">
                        {stats.reviewChanges ?? 0}
                      </div>
                    </div>
                  </div>

                  {/* All Structural Highlights Changes Breakdown */}
                  <div className="mt-6 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      All Changes Identified
                    </h4>
                    {comparison.highlights &&
                    comparison.highlights.length > 0 ? (
                      comparison.highlights.map(
                        (highlight: any, idx: number) => (
                          <div
                            key={`${highlight.category}-${highlight._id || idx}`}
                            className="rounded-xl border border-slate-100 bg-white p-4 shadow-2xs hover:border-slate-200 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-0.5">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500 block">
                                  {highlight.category}
                                </span>
                                <div className="text-sm font-bold text-slate-800">
                                  {highlight.title}
                                </div>
                                <div className="mt-1 text-xs text-slate-500 leading-normal">
                                  {highlight.detail}
                                </div>
                              </div>
                              <span
                                className={`rounded-md border px-2 py-0.5 text-[10px] font-bold shrink-0 tracking-wide ${getSeverityStyles(highlight.severity)}`}
                              >
                                {highlight.severity || "Minor"}
                              </span>
                            </div>

                            {/* Render all internal details arrays from items key */}
                            {highlight.items && highlight.items.length > 0 && (
                              <div className="mt-3 border-t border-slate-100 pt-2.5">
                                <ul className="list-inside list-disc space-y-1 text-xs text-slate-600">
                                  {highlight.items.map(
                                    (entry: string, entryIdx: number) => (
                                      <li
                                        key={`${idx}-${entryIdx}`}
                                        className="text-slate-700 leading-normal"
                                      >
                                        <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-slate-600 font-mono text-[11px]">
                                          {entry}
                                        </span>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        ),
                      )
                    ) : (
                      <div className="text-center py-4 text-xs italic text-slate-400">
                        No detailed updates parsed for this entry.
                      </div>
                    )}
                  </div>

                  {/* Control Ribbon Strip */}
                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                      Archived Node Log ID:{" "}
                      <span className="font-mono text-slate-500">
                        {item._id}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-100 px-3 py-1.5 rounded-lg transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete Log
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
