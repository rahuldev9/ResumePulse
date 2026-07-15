"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  ArrowRight,
  RefreshCw,
  Layers,
  CheckCircle2,
  Trash2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  GraduationCap,
  Code,
} from "lucide-react";

type Tab = "analyzer" | "history";
type Step = "idle" | "processing" | "result";

interface HistoryItem {
  id: string;
  name: string;
  originalFile: string;
  updatedFile: string;
  diffs: number;
  timestamp: string;
}

export default function ResumePulseAutomated() {
  const [activeTab, setActiveTab] = useState<Tab>("analyzer");
  const [step, setStep] = useState<Step>("idle");
  const [expandedHistory, setExpandedHistory] = useState<
    Record<string, boolean>
  >({ "1": true });
  const [currentActionText, setCurrentActionText] =
    useState<string>("Initializing...");

  // Mock database history list
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "1",
      name: "Rahul_old",
      originalFile: "Rahul_old.pdf",
      updatedFile: "Rahul_Resume.pdf",
      diffs: 7,
      timestamp: "7/15/2026, 2:43:56 PM",
    },
    {
      id: "2",
      name: "Rahul_old",
      originalFile: "Rahul_old.pdf",
      updatedFile: "Rahul_Resume.pdf",
      diffs: 0,
      timestamp: "7/15/2026, 2:42:48 PM",
    },
  ]);

  // --- AUTOMATED DEMO TIMELINE LOOP ---
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runDemoTimeline = () => {
      // Phase 1: Upload / Idle state showing files
      setStep("idle");
      setActiveTab("analyzer");
      setCurrentActionText("Selecting files & preparing comparison...");

      // Phase 2: Trigger 'Compare Resumes' click automatically after 2.5s
      timer = setTimeout(() => {
        setStep("processing");
        setCurrentActionText("Running real-time delta parsing structure...");

        // Phase 3: Transition to full Analysis results report after 4s of scanning
        timer = setTimeout(() => {
          setStep("result");
          setCurrentActionText(
            "Generation complete! Displaying metrics & modifications logs...",
          );

          // Phase 4: Automatically navigate to the MongoDB History tab after 5s
          timer = setTimeout(() => {
            setActiveTab("history");
            setExpandedHistory({ "1": true });
            setCurrentActionText(
              "Reviewing saved immutable version tracking tables...",
            );

            // Phase 5: Reset timeline loop back to the beginning after 5s
            timer = setTimeout(() => {
              runDemoTimeline();
            }, 5000);
          }, 5000);
        }, 4000);
      }, 2500);
    };

    runDemoTimeline();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-h-screen overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 text-slate-900 shadow-[0_12px_35px_-12px_rgba(0,0,0,0.12)] antialiased">
      {/* --- Main Content Area --- */}
      <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 transition-all duration-500">
        {/* ================= TAB 1: ANALYZER ================= */}
        {activeTab === "analyzer" && (
          <div className="space-y-8">
            {step !== "result" && (
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Compare Versions
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Upload your original and new variations to view a structural
                  profile analysis.
                </p>
              </div>
            )}

            {/* Step: Idle View */}
            {step === "idle" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Original Resume
                    </label>
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <FileText size={18} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          Rahul_old.pdf
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      New Variant
                    </label>
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <FileText size={18} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          Rahul_Resume.pdf
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl text-sm shadow-md ring-4 ring-indigo-100 animate-pulse">
                    Compare Resumes (Auto Clicking...)
                  </button>
                </div>

                {/* Blurs */}
                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                  {[
                    { label: "Previous Resume", size: "105.4 KB" },
                    { label: "Updated Resume", size: "113.7 KB" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center"
                    >
                      <div className="w-full justify-between flex items-center text-xs text-slate-400 font-medium border-b pb-2 mb-3">
                        <span>{doc.label}</span>
                        <span>{doc.size}</span>
                      </div>
                      <div className="w-full h-80 bg-slate-50 rounded-lg border p-4 space-y-3 opacity-60 overflow-hidden select-none">
                        <div className="h-4 bg-slate-400 w-1/3 rounded" />
                        <div className="h-2 bg-slate-300 w-1/2 rounded" />
                        <div className="h-3 bg-slate-200 w-full rounded mt-6" />
                        <div className="h-2 bg-slate-200 w-5/6 rounded" />
                        <div className="h-2 bg-slate-200 w-full rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step: Processing Scanning View */}
            {step === "processing" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-56">
                  <div className="space-y-4">
                    <div className="h-10 bg-slate-100 rounded-xl w-full animate-pulse" />
                    <div className="h-10 bg-slate-100 rounded-xl w-full animate-pulse" />
                  </div>
                  <button
                    disabled
                    className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center space-x-2"
                  >
                    <RefreshCw
                      size={16}
                      className="animate-spin text-indigo-400"
                    />
                    <span>Processing Revisions...</span>
                  </button>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                  {["Analyzing Resume...", "Analyzing Resume..."].map(
                    (text, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col items-center"
                      >
                        <div className="w-full h-80 bg-slate-100/50 rounded-lg filter blur-[2px] p-4 space-y-4">
                          <div className="h-4 bg-slate-300 w-1/3 rounded" />
                          <div className="h-2 bg-slate-300 w-full rounded" />
                          <div className="h-2 bg-slate-200 w-full rounded" />
                        </div>

                        {/* Scanning Line HUD Effect */}
                        <div
                          className="absolute left-0 right-0 h-1 bg-cyan-500 shadow-md shadow-cyan-400 animate-bounce top-0"
                          style={{ animationDuration: "2s" }}
                        />

                        <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                          <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-md flex items-center space-x-2 text-xs font-semibold text-slate-700">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                            <span>{text}</span>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Step: Results Layout */}
            {step === "result" && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Comparison Analysis Report</span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-800 mt-1">
                    AI-generated comprehensive delta evaluation logs.
                  </h1>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    Executive Summary: Significant Profile Update
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-sm">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Total Diffs
                    </span>
                    <span className="block text-3xl font-black text-slate-800 mt-1">
                      7
                    </span>
                  </div>
                  <div className="border border-amber-200 bg-amber-50/20 p-5 rounded-2xl text-center shadow-sm">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-600">
                      ⚠️ Important
                    </span>
                    <span className="block text-3xl font-black text-amber-600 mt-1">
                      3
                    </span>
                  </div>
                  <div className="border border-rose-200 bg-rose-50/20 p-5 rounded-2xl text-center shadow-sm">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-rose-500">
                      🚨 Reviews
                    </span>
                    <span className="block text-3xl font-black text-rose-500 mt-1">
                      2
                    </span>
                  </div>
                </div>

                <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 pt-4">
                  Identified Modifications Logs
                </h3>
                <ReportLogsGrid />
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: HISTORY ================= */}
        {activeTab === "history" && (
          <div className="space-y-6 max-w-5xl">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <span>Database / Immutable History</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-0.5">
                Comparison History
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Reviewing all parsed delta insights securely logged into
                MongoDB.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {history.map((item) => {
                const isExpanded = !!expandedHistory[item.id];
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all"
                  >
                    <div className="p-5 flex items-center justify-between select-none bg-slate-50/20">
                      <div className="flex items-center space-x-4">
                        <div className="text-slate-400">
                          {isExpanded ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2.5">
                            <span className="font-bold text-slate-800 text-base">
                              {item.name}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                item.diffs > 0
                                  ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {item.diffs} Diffs
                            </span>
                          </div>

                          <div className="inline-flex items-center space-x-2 text-xs text-slate-500 mt-1.5 font-mono bg-white px-2 py-1 rounded border">
                            <span>{item.originalFile}</span>
                            <ArrowRight size={12} className="text-slate-400" />
                            <span className="text-indigo-600 font-medium">
                              {item.updatedFile}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-xs text-slate-400 font-medium bg-white px-2.5 py-1 rounded border">
                          📅 {item.timestamp}
                        </div>
                        <div className="p-2 text-slate-300">
                          <Trash2 size={16} />
                        </div>
                      </div>
                    </div>

                    {isExpanded && item.diffs > 0 && (
                      <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center space-x-3">
                          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-xs font-semibold text-slate-700">
                            Executive Summary: Significant Profile Update
                          </span>
                        </div>
                        <ReportLogsGrid />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ReportLogsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 uppercase tracking-wide inline-flex items-center">
            <Code size={10} className="mr-1" /> SKILLS ADDED
          </span>
          <span className="text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
            IMPORTANT
          </span>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Skills Added</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Candidate added new skills to their profile.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-[11px] text-slate-600 leading-relaxed">
          • DevPlus, Expo, PHP, Git, GitHub, ChatGPT, Claude, Gemini
          Programming, RA G, GitHub Copilot
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-600 uppercase tracking-wide">
            SKILLS REMOVED
          </span>
          <span className="text-[9px] font-extrabold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            MINOR
          </span>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Skills Removed</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Candidate removed a skill from their profile.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-[11px] text-slate-600 leading-relaxed">
          • Socket.io
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 uppercase tracking-wide inline-flex items-center">
            <GraduationCap size={10} className="mr-1" /> EDUCATION CHANGES
          </span>
          <span className="text-[9px] font-extrabold bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded">
            NEEDS REVIEW
          </span>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">
            Education Changes
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            No changes detected in education section.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-[11px] text-slate-400 italic">
          • No changes detected in education section.
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600 uppercase tracking-wide inline-flex items-center">
            <MapPin size={10} className="mr-1" /> LOCATION CHANGES
          </span>
          <span className="text-[9px] font-extrabold bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded">
            NEEDS REVIEW
          </span>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Location Changes</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            No changes detected in location.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-[11px] text-slate-400 italic">
          • No changes detected in location.
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 md:col-span-2 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 uppercase tracking-wide inline-flex items-center">
            <Calendar size={10} className="mr-1" /> EMPLOYMENT DATE
            INCONSISTENCIES
          </span>
          <span className="text-[9px] font-extrabold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            MINOR
          </span>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">
            Employment Date Inconsistencies
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            No inconsistencies detected in employment dates.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-[11px] text-slate-600 space-y-1">
          <div>• May 2024</div>
          <div className="text-slate-400">
            • No inconsistencies detected in employment dates.
          </div>
        </div>
      </div>
    </div>
  );
}
