"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  EyeOff,
  Loader2,
  Files,
  Maximize2,
  X,
  Download,
} from "lucide-react";

type ResumeViewerProps = {
  title: string;
  file: File | null;
};

export default function ResumeViewer({ title, file }: ResumeViewerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    setLoading(true);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Artificial slight delay for a smoother loading state transition
    const timer = setTimeout(() => setLoading(false), 400);

    return () => {
      clearTimeout(timer);
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // Helper to format file sizes nicely
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 backdrop-blur-sm px-6 py-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-105 transition-transform">
            <Files className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm leading-tight tracking-tight">
              {title}
            </h3>
            {file && (
              <p className="text-xs font-medium text-slate-400 mt-0.5 flex items-center gap-1.5">
                <span className="truncate max-w-[180px] sm:max-w-[280px]">
                  {file.name}
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                <span>{formatFileSize(file.size)}</span>
              </p>
            )}
          </div>
        </div>

        {previewUrl && file?.type === "application/pdf" && (
          <button
            onClick={() => setFullscreen(true)}
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 shadow-sm hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all duration-200"
            title="Expand Preview"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Body Area */}
      <div className="h-[520px] bg-slate-50/50 relative">
        {!file ? (
          <div className="h-full flex flex-col items-center justify-center px-4 text-center">
            <div className="p-4 bg-slate-100/80 rounded-2xl text-slate-400 mb-4 ring-8 ring-slate-50">
              <EyeOff className="h-8 w-8" />
            </div>
            <p className="font-medium text-slate-700">No document uploaded</p>
            <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
              Upload a PDF resume to instantly view its contents right here.
            </p>
          </div>
        ) : loading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <Loader2 className="h-9 w-9 animate-spin text-indigo-600 relative z-10" />
              <div className="absolute inset-0 h-9 w-9 bg-indigo-100 rounded-full blur-sm opacity-50" />
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 tracking-wide">
              Rendering secure preview...
            </p>
          </div>
        ) : file.type === "application/pdf" ? (
          <iframe
            src={previewUrl!}
            className="w-full h-full border-none bg-white"
            title="Resume Preview"
          />
        ) : (
          /* Non-PDF Fallback Display */
          <div className="h-full flex flex-col items-center justify-center px-6 text-center">
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 mb-4 ring-8 ring-amber-50/50">
              <FileText className="h-8 w-8" />
            </div>
            <p className="font-semibold text-slate-800">
              Preview unsupported for this format
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px] mb-5">
              Direct previews are built for PDFs. You can still access your file
              below.
            </p>
            <a
              href={previewUrl!}
              download={file.name}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shadow-sm hover:shadow"
            >
              <Download className="h-3.5 w-3.5" />
              Download {file.name.split(".").pop()?.toUpperCase()}
            </a>
          </div>
        )}
      </div>

      {/* Modernized Fullscreen Overlay */}
      {fullscreen && previewUrl && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex flex-col animate-fade-in animate-in fade-in duration-200">
          {/* Top Bar for Fullscreen */}
          <div className="flex items-center justify-between bg-white px-6 py-4 border-b border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Files className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-slate-800 truncate max-w-xs md:max-w-xl">
                {file?.name || "Resume Preview"}
              </p>
            </div>

            <button
              onClick={() => setFullscreen(false)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all duration-150 shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Main Iframe Viewer Body */}
          <div className="flex-1 bg-slate-900/40 p-4 md:p-8 flex justify-center items-center">
            <div className="w-full h-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/50">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="Resume Full Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
