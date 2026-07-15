"use client";
import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "History", href: "/history" },
    { name: "Analyzer", href: "/resume-analyzer" },
  ];

  return (
    <nav className="border-b border-slate-100 bg-white/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div
          onClick={() => {
            setIsOpen(false);
            router.push("/");
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="h-8 w-8 relative flex items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 group-hover:scale-105 transition-transform duration-300 shadow-xs">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-6 w-6 object-contain"
            />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
            Resume<span className="text-indigo-600">Pulse</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 hover:text-slate-900 ${
                    isActive
                      ? "text-indigo-600 font-semibold"
                      : "text-slate-500"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-200" />

          <Link
            href="/resume-analyzer"
            className="group flex items-center gap-1.5 text-sm font-semibold bg-slate-950 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl shadow-xs transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] transform active:scale-98"
          >
            Get Started Free
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200 focus:outline-hidden active:scale-95"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-5 w-5" />
            ) : (
              <Menu className="block h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Transition Overlay */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-300 ease-in-out z-40 origin-top shadow-lg ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-4 pb-6 space-y-3 mx-auto max-w-7xl">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50/80 text-indigo-700 font-bold border border-indigo-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/resume-analyzer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold px-4 py-3.5 rounded-xl shadow-xs text-center transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
