import React from "react";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  GitBranch,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <GitBranch className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              ResumePulse
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
              Sign In
            </button>
            <button className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          <span>Git-style version control for job seekers</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
          Never lose track of your{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            resume iterations
          </span>{" "}
          again.
        </h1>
        <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
          Track changes, manage tailored versions for different job
          descriptions, and roll back edits seamlessly. Your career history,
          perfectly organized.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5">
            Start Tracking Free
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="w-full sm:w-auto bg-white border border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-xl hover:bg-slate-50 transition">
            Watch Demo
          </button>
        </div>
      </header>

      {/* Visual Feature/Diff Preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-slate-400 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="ml-2 text-slate-300">
                v2.1-senior-role-update.docx
              </span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              + 24 insertions, - 12 deletions
            </span>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6 bg-slate-950 text-slate-100 font-mono text-sm leading-relaxed">
            {/* Before */}
            <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-sans font-bold">
                Previous Version
              </div>
              <p className="line-through text-red-400 bg-red-950/40 p-1 rounded">
                - Managed a team of 3 junior developers to build standard
                internal web apps.
              </p>
              <p className="text-slate-400 p-1">
                - Optimized SQL database queries to improve loading speeds.
              </p>
            </div>
            {/* After */}
            <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-sans font-bold">
                Current Version
              </div>
              <p className="text-emerald-400 bg-emerald-950/40 p-1 rounded">
                + Spearheaded an agile team of 6 engineers delivering high-scale
                cloud architecture, boosting deployment velocity by 40%.
              </p>
              <p className="text-slate-400 p-1">
                + Architected indexing strategies that cut database latency by
                65%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
              Built specifically for iterative tailoring
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Stop saving files as `Resume_Final_v3_actual_final.pdf`. Manage
              your career applications with software developer precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-200">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Visual Diff Tracking
              </h3>
              <p className="text-slate-600">
                Instantly see what keywords you added, sentences you tweaked, or
                metrics you updated between versions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-200">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Targeted Branching
              </h3>
              <p className="text-slate-600">
                Create dedicated variants for Product Manager, Frontend
                Engineer, or Consultant roles from one core source.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-200">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                ATS History Audits
              </h3>
              <p className="text-slate-600">
                Keep a history of exactly which resume version you submitted to
                which company, so you're always prepared for the interview.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 text-slate-500 py-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} ResumePulse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
