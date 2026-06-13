"use client";

import { useLanguage } from "@/providers/language-provider";
import { Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSwitcher() {
  const { language, setLanguage, mounted } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-20 rounded-xl bg-slate-800/40 animate-pulse border border-slate-700/30" />
    );
  }

  const options = [
    { value: "en", label: "English", labelNative: "English" },
    { value: "hi", label: "Hindi", labelNative: "हिन्दी" },
  ] as const;

  const currentOption = options.find((opt) => opt.value === language) || options[0];

  return (
    <div className="relative" ref={menuRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center gap-2 h-10 px-3.5 rounded-xl
          bg-slate-800/60 hover:bg-slate-700/80 
          border border-slate-700/50
          transition-all duration-300 group
          focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
          text-[#EAF2F8] text-sm font-semibold cursor-pointer"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="h-4.5 w-4.5 text-accent-500 transition-transform duration-300 group-hover:rotate-12" />
        <span className="uppercase tracking-wider text-[12px]">{language}</span>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-xl blur-sm bg-accent-500/10" />
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 origin-top-right 
              bg-[#122B3D] 
              border border-[#1E3A4C]
              rounded-xl shadow-2xl 
              ring-1 ring-white/5
              overflow-hidden
              z-50"
          >
            <div className="p-1.5 space-y-1">
              {options.map((option) => {
                const isActive = language === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setLanguage(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-200 cursor-pointer
                      ${isActive
                        ? "bg-[#1A2C3A] text-white"
                        : "text-[#EAF2F8]/80 hover:bg-[#1A2C3A]/50 hover:text-white"
                      }`}
                  >
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-sm">{option.labelNative}</span>
                      <span className="text-[10px] opacity-60 font-normal">{option.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
