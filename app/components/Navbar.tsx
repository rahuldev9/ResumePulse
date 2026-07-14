"use client";
import { GitBranch } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <GitBranch className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            ResumePulse
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/history"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
          >
            History
          </Link>
          <Link
            href="/resume-analyzer"
            className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
