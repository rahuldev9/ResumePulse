"use client";
import React from "react";
import UploadForm from "@/app/components/UploadForm";
import { GitCompare, History, HelpCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const ResumeAnalyzer = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          {/* Top Meta Navigation / Breadcrumb strip */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-700 p-2 rounded-xl">
                <GitCompare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Profile Change Tracker
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Audit document revisions and track iterative keyword changes.
                </p>
              </div>
            </div>

            {/* Quick utility links */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => router.push("/history")}
                className="flex items-center cursor-pointer gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-2 rounded-lg transition shadow-sm"
              >
                <History className="h-3.5 w-3.5" />
                Past Comparisons
              </button>
              <button
                className="text-slate-400 hover:text-slate-600 transition"
                title="Help docs"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          <UploadForm />
        </div>
      </div>
    </>
  );
};

export default ResumeAnalyzer;
