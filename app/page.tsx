"use client";
import React, { useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GitBranch,
  RefreshCw,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Demo from "./components/Demo";

export default function HomePage() {
  const router = useRouter();
  const demoSectionRef = useRef<HTMLElement | null>(null);

  const handleWatchDemo = () => {
    demoSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
      {/* Premium Light Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-150 pointer-events-none opacity-60 mix-blend-multiply overflow-hidden">
        <div className="absolute top-[-30%] left-[20%] w-150 h-150 rounded-full bg-indigo-100/70 blur-[120px]" />
        <div className="absolute top-[-20%] right-[20%] w-125 h-125 rounded-full bg-violet-100/70 blur-[120px]" />
      </div>

      {/* Navigation */}

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 text-center z-10">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-50/80 backdrop-blur-md text-indigo-700 border border-indigo-200/60 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-8 shadow-[0_2px_12px_rgba(99,102,241,0.08)]">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
          <span>Git-style version control for job seekers</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
          Never lose track of your{" "}
          <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            resume iterations
          </span>{" "}
          again.
        </h1>

        <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Track changes, manage tailored versions for distinct roles, and
          analyze differences with surgical precision. Your career journey,
          beautifully versioned.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => router.push("/resume-analyzer")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-medium px-8 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:scale-98"
          >
            Start Tracking Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleWatchDemo}
            className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 font-medium px-8 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm transition-all duration-300 cursor-pointer"
          >
            Watch Demo
          </button>
        </div>
      </header>

      {/* Visual Feature / Split-Screen Diff Preview Container */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 z-10">
        <div className="absolute inset-0 bg-linear-to-b from-indigo-50 to-transparent blur-3xl -z-10 rounded-3xl" />

        {/* Main Mockup Box */}
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-200/80 overflow-hidden">
          {/* Mockup Window Header */}
          <div className="bg-slate-50 px-5 py-4 flex items-center justify-between border-b border-slate-200/60 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              <div className="ml-3 flex items-center gap-1.5 text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-xs">
                <Terminal className="h-3.5 w-3.5 text-indigo-600" />
                <span>v2.1-senior-role-update.docx</span>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded border border-emerald-200 shadow-xs">
              + 24 insertions, - 12 deletions
            </span>
          </div>

          {/* Mockup Split Code View */}
          <div className="p-6 grid md:grid-cols-2 gap-6 bg-slate-50/50 font-mono text-sm leading-relaxed">
            {/* Left Block - Previous */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white relative group hover:border-red-200 transition-all duration-300 shadow-xs">
              <div className="text-slate-400 text-[10px] tracking-widest font-sans font-bold uppercase mb-3 flex justify-between items-center">
                <span>Previous Version</span>
                <span className="text-red-700 bg-red-50 px-1.5 py-0.5 rounded text-[9px] border border-red-100">
                  REMOVED
                </span>
              </div>
              <div className="space-y-3">
                <p className="line-through text-red-600 bg-red-50/60 border-l-2 border-red-500 p-2.5 rounded-r-lg text-[13px]">
                  - Managed a team of 3 junior developers to build standard
                  internal web apps.
                </p>
                <p className="text-slate-500 p-2.5 text-[13px]">
                  - Optimized SQL database queries to improve loading speeds.
                </p>
              </div>
            </div>

            {/* Right Block - Current */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white relative group hover:border-emerald-200 transition-all duration-300 shadow-xs">
              <div className="text-slate-400 text-[10px] tracking-widest font-sans font-bold uppercase mb-3 flex justify-between items-center">
                <span>Current Version</span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] border border-emerald-100">
                  ADDED
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-emerald-700 bg-emerald-50/60 border-l-2 border-emerald-500 p-2.5 rounded-r-lg text-[13px]">
                  + Spearheaded an agile team of 6 engineers delivering
                  high-scale cloud architecture, boosting deployment velocity by
                  40%.
                </p>
                <p className="text-slate-600 bg-slate-50/60 p-2.5 rounded-lg text-[13px]">
                  + Architected indexing strategies that cut database latency by
                  65%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={demoSectionRef}
        className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12 scroll-mt-28"
      >
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Live walkthrough
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See ResumePulse in action
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Watch how resumes move from upload to comparison and history in a
            single, streamlined workflow.
          </p>
        </div>
        <Demo />
      </section>
      {/* Core Features Grid */}
      <section className="bg-white border-t border-slate-100 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight sm:text-5xl">
              Built specifically for iterative tailoring
            </h2>
            <p className="mt-5 text-base md:text-lg text-slate-600 font-normal max-w-2xl mx-auto">
              Stop saving chaotic iterations like{" "}
              <code className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-sm border border-indigo-100">
                Resume_Final_v3_fixed.pdf
              </code>
              . Architect your application strategy.
            </p>
          </div>

          {/* Premium Light Card Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-200/70 hover:border-indigo-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(99,102,241,0.08)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform duration-300">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                Visual Diff Tracking
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Instantly track structural deviations, custom keyword
                insertions, tailored metric phrasing, and experience
                modifications across variants.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-200/70 hover:border-indigo-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(99,102,241,0.08)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform duration-300">
                <GitBranch className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                Targeted Branching
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Isolate distinct vectors for diverse opportunities. Maintain
                variants for Engineering Management, Full-Stack, or Cloud Ops
                from one central timeline.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-200/70 hover:border-indigo-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(99,102,241,0.08)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                ATS History Audits
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Preserve strict immutable logs detailing precisely which
                iteration was dispatched to each target employer. Always walk in
                perfectly sync with your dynamic files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 py-12 text-xs tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} ResumePulse. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
