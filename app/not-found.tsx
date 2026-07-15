"use client";

import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm mb-6">
          <SearchX className="h-8 w-8" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 mb-3">
          404 Error
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
          Page not found
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
          Return home and continue exploring your resume insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
