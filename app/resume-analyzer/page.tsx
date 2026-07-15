"use client";
import React from "react";
import UploadForm from "@/app/components/UploadForm";
import { GitCompare, History, HelpCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function ResumeAnalyzer() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
      {/* High-End Ambient Lighting Layers (Pure White Clean Canvas Spec) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 pointer-events-none opacity-[0.45] mix-blend-multiply overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[15%] w-150 h-150 rounded-full bg-indigo-50/80 blur-[120px]" />
        <div className="absolute top-[-10%] right-[15%] w-125 h-125 rounded-full bg-slate-100 blur-[100px]" />
      </div>

      {/* Main Structural Layout Grid Container */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10">
        {/* Top Operational Breadcrumb & Dashboard Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
          {/* Identity & Context Block */}
          <div className="flex items-start gap-4">
            <div className="bg-slate-50 text-slate-900 p-3 rounded-2xl border border-slate-200/60 shadow-xs shrink-0">
              <GitCompare className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">
                <span>Workspace</span>
                <span className="text-slate-300">/</span>
                <span className="text-indigo-600 font-bold">Diff Systems</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Profile Change Tracker
              </h1>
              <p className="text-sm text-slate-500 mt-1 font-normal max-w-xl leading-relaxed">
                Audit document variants, cross-examine technical milestones, and
                isolate semantic keyword trends.
              </p>
            </div>
          </div>

          {/* Tactical Application Utilities Panel */}
          <div className="flex items-center gap-2.5 sm:self-center">
            <button
              onClick={() => router.push("/history")}
              className="group flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 px-4 py-2.5 rounded-xl transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] cursor-pointer active:scale-98"
            >
              <History className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              <span>Past Comparisons</span>
            </button>

            <button
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
              title="Help Documentation"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Elevated Workspace Platform Wrapper */}
        <div className="relative bg-white rounded-3xl border border-slate-100/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] p-1 sm:p-2 md:p-3 transition-all duration-300">
          <UploadForm />
        </div>
      </main>
    </div>
  );
}
