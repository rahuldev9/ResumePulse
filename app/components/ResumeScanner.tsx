import React, { ReactNode } from "react";

interface ResumeScannerProps {
  loading: boolean;
  children: ReactNode;
  text?: string;
}

const ResumeScanner: React.FC<ResumeScannerProps> = ({
  loading,
  children,
  text = "Analyzing Resume...",
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-50 dark:border-slate-800/50 dark:bg-slate-950 transition-all duration-300">
      {/* Content Canvas */}
      <div
        className={`h-full w-full transition-all duration-500 ${loading ? "blur-[1.5px] scale-[0.99] select-none pointer-events-none" : ""}`}
      >
        {children}
      </div>

      {/* Modern High-Tech Scanner Mask */}
      <div
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 pointer-events-none ${
          loading ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Soft Modern Dimming Overlay */}
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-950/40 backdrop-blur-[3px]" />

        {/* Cyber Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 dark:from-cyan-500/5 blur-3xl animate-pulse-slow rounded-full" />

        {/* Viewfinder Frame */}
        <div className="relative z-10 w-72 h-96 sm:w-80 sm:h-[420px] rounded-2xl bg-slate-950/5 dark:bg-slate-900/10 backdrop-blur-sm border border-white/10 dark:border-slate-800/40 shadow-2xl transition-all duration-300">
          {/* Dynamic Sleek Corner Accents */}
          <div className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-2 border-l-2 border-cyan-400 dark:border-cyan-500 rounded-tl-lg shadow-[[-2px_-2px_8px_rgba(34,211,238,0.4)]]" />
          <div className="absolute -top-[2px] -right-[2px] w-5 h-5 border-t-2 border-r-2 border-cyan-400 dark:border-cyan-500 rounded-tr-lg shadow-[[2px_-2px_8px_rgba(34,211,238,0.4)]]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 border-b-2 border-l-2 border-cyan-400 dark:border-cyan-500 rounded-bl-lg shadow-[[-2px_2px_8px_rgba(34,211,238,0.4)]]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-2 border-r-2 border-cyan-400 dark:border-cyan-500 rounded-br-lg shadow-[[2px_2px_8px_rgba(34,211,238,0.4)]]" />

          {/* Target Center Haircross Crosshairs */}
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-slate-400/10 dark:bg-slate-700/20" />
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-slate-400/10 dark:bg-slate-700/20" />

          {/* Bound Laser Line */}
          <div className="absolute inset-x-3 pointer-events-none animate-qr-scan">
            {/* Main Glowing Laser */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 dark:via-cyan-400 to-transparent shadow-[0_0_12px_4px_rgba(34,211,238,0.6)]" />
            {/* Subtle Trail Flare */}
            <div className="h-10 w-full bg-gradient-to-b from-cyan-400/10 to-transparent transform -translate-y-[2px]" />
          </div>
        </div>

        {/* Minimal Floating Status Indicator */}
        <div className="relative z-10 mt-6 pointer-events-auto">
          <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-slate-900/90 px-4 py-2 text-xs font-semibold tracking-wide text-slate-800 dark:text-slate-200 shadow-xl backdrop-blur-md">
            {/* Modern Clean Spinner */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-medium font-sans tracking-normal opacity-90">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScanner;
