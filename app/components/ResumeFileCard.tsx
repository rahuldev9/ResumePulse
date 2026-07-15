"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  EyeOff,
  Loader2,
  Files,
  ExternalLink,
  Download,
} from "lucide-react";

type ResumeViewerProps = {
  title: string;
  file: File | null;
};

export default function ResumeViewer({ title, file }: ResumeViewerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    setLoading(true);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Smooth artificial parsing latency state transition
    const timer = setTimeout(() => setLoading(false), 500);

    return () => {
      clearTimeout(timer);
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="group relative rounded-2xl border border-slate-200/60 bg-white shadow-[0_4px_25px_-10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_35px_-12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full">
      {/* Premium Sub-Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 backdrop-blur-md px-5 py-4 select-none">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-white rounded-xl text-slate-700 border border-slate-200/80 shadow-xs group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:bg-indigo-50/40 transition-all duration-300 shrink-0">
            <Files className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">
              {title}
            </h3>
            {file ? (
              <p className="text-[11px] font-medium text-slate-400 mt-0.5 flex items-center gap-1.5 min-w-0">
                <span className="truncate max-w-30 sm:max-w-50 font-mono text-slate-500 bg-slate-100 px-1 py-0.5 rounded border border-slate-200/40 text-[10px]">
                  {file.name}
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                <span className="shrink-0 font-sans text-slate-400">
                  {formatFileSize(file.size)}
                </span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                Awaiting revision slot...
              </p>
            )}
          </div>
        </div>

        {previewUrl && !loading && (
          <button
            onClick={() =>
              window.open(previewUrl, "_blank", "noopener,noreferrer")
            }
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
            title="Open frame in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Primary Rendering Sandbox Frame */}
      <div className="h-130 bg-slate-50/30 relative flex-1">
        {!file ? (
          /* Empty Sandbox Empty View */
          <div className="h-full flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-300">
            <div className="p-4 bg-white rounded-2xl text-slate-400 mb-4 border border-slate-200/60 shadow-xs">
              <EyeOff className="h-6 w-6 text-slate-400" />
            </div>
            <p className="font-bold text-slate-900 text-sm tracking-tight">
              No document initialized
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-55 font-normal leading-relaxed">
              Drop or upload a parsing profile asset to generate an
              instantaneous secure viewport.
            </p>
          </div>
        ) : loading ? (
          /* Clean Sandbox AI Parser Loading View */
          <div className="h-full flex flex-col items-center justify-center animate-in fade-in duration-200">
            <div className="relative flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-xs">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-600 relative z-10" />
              <div className="absolute inset-0 h-full w-full bg-indigo-50/50 rounded-2xl blur-md -z-10" />
            </div>
            <p className="mt-4 text-xs font-semibold text-slate-800 tracking-wider uppercase text-[10px]">
              Rendering secure sandbox...
            </p>
          </div>
        ) : file.type === "application/pdf" ? (
          /* Standard Sandbox Sandbox Viewport */
          <iframe
            src={previewUrl!}
            className="w-full h-full border-none bg-white animate-in fade-in duration-300"
            title="Secure Canvas Workspace Viewport"
          />
        ) : (
          /* Complex Sandbox Word/Text Fallback Engine View */
          <div className="h-full flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-300">
            <div className="p-4 bg-amber-50/50 rounded-2xl text-amber-600 mb-4 border border-amber-200/60 shadow-2xs">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
            <p className="font-bold text-slate-900 text-sm tracking-tight">
              Preview engine bypassed
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-60 leading-relaxed mb-6 font-normal">
              Direct rendering viewports are optimized for PDF matrix specs. Tap
              down below to audit the source text blocks.
            </p>
            <a
              href={previewUrl!}
              download={file.name}
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-98 select-none"
            >
              <Download className="h-3.5 w-3.5" />
              Download {file.name.split(".").pop()?.toUpperCase()} Source
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
