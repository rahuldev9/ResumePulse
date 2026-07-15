"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete History Log Entry?",
  description = "Are you absolutely sure you want to drop this history node log from MongoDB? This operational action is permanent and cannot be undone.",
  confirmLabel = "Confirm Delete",
  cancelLabel = "Cancel, Keep Log",
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop Blur Overlayer */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      {/* Dialog Body Box */}
      <div className="relative bg-white rounded-2xl max-w-md w-full border border-slate-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] z-10 transform scale-100 animate-in zoom-in-95 duration-200 flex flex-col gap-4">
        {/* Modal Header Controls */}
        <div className="flex items-start justify-between">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100/60 shadow-2xs">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Explanatory Message Content */}
        <div>
          <h3 className="text-lg font-black tracking-tight text-slate-900">
            {title}
          </h3>
          <p className="text-sm text-slate-500 font-normal mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Decision Trigger Trays */}
        <div className="flex items-center justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer active:scale-98 shadow-2xs bg-white"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-[0_4px_12px_rgba(225,29,72,0.2)] transition-all cursor-pointer active:scale-98"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
