"use client";

import { useEffect, useState } from "react";
import api from "@/app/services/api";
import DeleteConfirmModal from "@/app/components/DeleteConfirmModal";
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
  ChevronDown,
} from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await api.get("/resumes/history");
        setHistory(response.data?.history || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const openDeleteModal = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await api.delete(`/resumes/history/${deleteTargetId}`);
      setHistory((prev) => prev.filter((h) => h._id !== deleteTargetId));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTargetId(null);
      setIsDeleteOpen(false);
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
      {/* High-End Ambient Background Wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-100 pointer-events-none opacity-40 mix-blend-multiply overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[15%] w-125 h-125 rounded-full bg-slate-100 blur-[100px]" />
        <div className="absolute top-[-10%] right-[15%] w-112.5 h-112.5 rounded-full bg-indigo-50/60 blur-[100px]" />
      </div>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        {/* Page Operational Header */}
        <div className="flex items-start gap-4 border-b border-slate-100 pb-6 mb-10">
          <div className="bg-slate-50 text-slate-900 p-3 rounded-2xl border border-slate-200/60 shadow-xs shrink-0">
            <History className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">
              <span>Database</span>
              <span className="text-slate-300">/</span>
              <span className="text-indigo-600 font-bold">
                Immutable History
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Comparison History
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-normal leading-relaxed">
              Reviewing all parsed delta insights, layout structures, and
              candidate document mutations securely logged into MongoDB.
            </p>
          </div>
        </div>

        {/* Dynamic State Layout Pipelines */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <div className="relative p-3 bg-slate-50 rounded-xl border border-slate-100 mb-3">
              <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
            </div>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase text-[10px]">
              Querying history timelines...
            </p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border-dashed">
            <div className="inline-flex p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-400 mb-4 shadow-xs">
              <FileText className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Timeline Index Empty
            </h3>
            <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto font-normal leading-relaxed">
              Initialize a fresh resume revision comparison sequence to populate
              interactive logs.
            </p>
          </div>
        ) : (
          /* Core History Feed with Accordion Functionality */
          <div className="space-y-4 animate-in fade-in duration-300">
            {history.map((item) => {
              const comparison = item.comparison || {};
              const stats = comparison.stats || {};
              const isExpanded = !!expandedItems[item._id];

              return (
                <div
                  key={item._id}
                  className="group rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_25px_-10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_-12px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all duration-300 overflow-hidden"
                >
                  {/* ACCORDION HEADER TRIGGER */}
                  <div
                    onClick={() => toggleItem(item._id)}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 cursor-pointer select-none bg-white hover:bg-slate-50/40 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      {/* Interactive Chevron Rotation Indicator */}
                      <div className="mt-1 shrink-0">
                        <ChevronDown
                          className={`h-5 w-5 text-slate-400 transition-transform duration-300 ease-in-out ${
                            isExpanded
                              ? "transform rotate-180 text-indigo-600"
                              : ""
                          }`}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-black text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                            {item.candidateName || "Candidate Profile Revision"}
                          </h3>
                          {/* Minimal summary counter tag visible when closed */}
                          {!isExpanded && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100/30">
                              {stats.totalChanges ?? 0} Diffs
                            </span>
                          )}
                        </div>

                        {/* Document Delta Path Tags */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mt-2 bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 rounded-xl w-fit shadow-2xs">
                          <span className="truncate max-w-35 sm:max-w-xs text-slate-600 font-medium">
                            {item.oldResumeName}
                          </span>
                          <ArrowRight className="h-3 w-3 shrink-0 text-slate-400" />
                          <span className="truncate max-w-35 sm:max-w-xs text-indigo-600 font-semibold">
                            {item.newResumeName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TOP-RIGHT CONTROLS: Date Stamp & Repositioned Delete Button */}
                    <div
                      className="flex items-center gap-3 self-end md:self-center shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{new Date(item.createdAt).toLocaleString()}</span>
                      </div>

                      <button
                        onClick={() => openDeleteModal(item._id)}
                        className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50/50 border border-slate-200 hover:border-rose-200/80 shadow-2xs transition-all duration-200 active:scale-90 cursor-pointer"
                        title="Delete Log Entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* ACCORDION CONTENT PANEL */}
                  <div
                    className={`transition-all duration-300 ease-in-out origin-top ${
                      isExpanded
                        ? "max-h-[2000px] border-t border-slate-100 p-6 bg-white opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    {/* Summary Status Box Callout */}
                    <div className="leading-relaxed text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex items-start gap-2.5 shadow-2xs">
                      <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                      <p className="font-normal text-slate-600">
                        <span className="font-bold text-slate-800">
                          Executive Summary:{" "}
                        </span>
                        {comparison.summary ||
                          "Significant structural profile metrics updated."}
                      </p>
                    </div>

                    {/* Operational Summary Grid Metrics Block */}
                    <div className="mt-4 grid gap-4 grid-cols-3 max-w-xl">
                      <div className="rounded-xl border border-slate-200/60 bg-white p-3 flex flex-col items-center justify-center shadow-2xs">
                        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
                          <Layers className="h-3 w-3 text-slate-400" /> Diffs
                        </div>
                        <div className="mt-0.5 text-xl font-black text-slate-900">
                          {stats.totalChanges ?? 0}
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-200/70 bg-amber-50/20 p-3 flex flex-col items-center justify-center shadow-2xs">
                        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-amber-700">
                          <FileBadge2 className="h-3 w-3 text-amber-500" />{" "}
                          Important
                        </div>
                        <div className="mt-0.5 text-xl font-black text-amber-700">
                          {stats.importantChanges ?? 0}
                        </div>
                      </div>

                      <div className="rounded-xl border border-rose-200/70 bg-rose-50/20 p-3 flex flex-col items-center justify-center shadow-2xs">
                        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-rose-700">
                          <AlertTriangle className="h-3 w-3 text-rose-500" />{" "}
                          Reviews
                        </div>
                        <div className="mt-0.5 text-xl font-black text-rose-700">
                          {stats.reviewChanges ?? 0}
                        </div>
                      </div>
                    </div>

                    {/* Identified Mutations Cards Array */}
                    <div className="mt-6 space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 select-none">
                        Identified Modifications Logs
                      </h4>

                      {comparison.highlights &&
                      comparison.highlights.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {comparison.highlights.map(
                            (highlight: any, idx: number) => (
                              <div
                                key={`${highlight.category}-${highlight._id || idx}`}
                                className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <span className="text-[9px] uppercase font-black tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/40">
                                      {highlight.category || "General Variant"}
                                    </span>
                                    <span
                                      className={`rounded-md border px-2 py-0.5 text-[9px] font-bold shrink-0 tracking-wide uppercase ${getSeverityStyles(
                                        highlight.severity,
                                      )}`}
                                    >
                                      {highlight.severity || "Minor"}
                                    </span>
                                  </div>
                                  <h5 className="text-sm font-bold text-slate-950 tracking-tight">
                                    {highlight.title}
                                  </h5>
                                  <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
                                    {highlight.detail}
                                  </p>
                                </div>

                                {highlight.items &&
                                  highlight.items.length > 0 && (
                                    <div className="mt-3 border-t border-slate-100 pt-3">
                                      <ul className="space-y-1.5 text-xs text-slate-600">
                                        {highlight.items.map(
                                          (entry: string, entryIdx: number) => (
                                            <li
                                              key={`${idx}-${entryIdx}`}
                                              className="flex items-start gap-2 text-slate-700 leading-normal"
                                            >
                                              <span className="text-indigo-500 select-none font-bold mt-0.5">
                                                •
                                              </span>
                                              <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-slate-600 font-mono text-[10px] block w-full">
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
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-5 text-xs italic text-slate-400 bg-slate-50 border border-slate-100 rounded-xl">
                          No micro-updates logged for this entry payload.
                        </div>
                      )}
                    </div>

                    {/* Bottom Node snapshot metadata line */}
                    <div className="mt-6 flex items-center gap-1.5 text-[10px] font-medium text-slate-400 select-none border-t border-slate-100 pt-4">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Node Snapshot Hash: </span>
                      <span className="font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/40">
                        {item._id}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setDeleteTargetId(null);
          setIsDeleteOpen(false);
        }}
        onConfirm={handleDelete}
        title="Delete history entry?"
        description="This will permanently remove this comparison log and its associated uploaded files from the history list."
        confirmLabel="Yes, delete it"
        cancelLabel="Keep entry"
      />
    </div>
  );
}
