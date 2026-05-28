"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="h-10 w-10 rounded-xl bg-primary-100/50 dark:bg-slate-700/50 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center h-10 w-10 rounded-xl
          bg-primary-100/80 dark:bg-slate-700/80 
          hover:bg-primary-200 dark:hover:bg-slate-600 
          border border-primary-200/50 dark:border-slate-600/50
          transition-all duration-300 group
          focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <div className="relative h-5 w-5">
          <Sun
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ease-in-out
              ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
              text-amber-500`}
            strokeWidth={2}
          />
          <Moon
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ease-in-out
              ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
              text-blue-400`}
            strokeWidth={2}
          />
        </div>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute inset-0 rounded-xl blur-sm ${
            isDark
              ? "bg-blue-400/10"
              : "bg-amber-400/15"
          }`} />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 origin-top-right 
            bg-white dark:bg-slate-800 
            border border-primary-100 dark:border-slate-700
            rounded-xl shadow-xl dark:shadow-2xl 
            ring-1 ring-black/5 dark:ring-white/5
            overflow-hidden
            animate-fade-in z-50"
        >
          <div className="p-1.5">
            {options.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? "bg-primary-100 dark:bg-slate-700 text-primary-900 dark:text-white"
                      : "text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-700/50 hover:text-primary-900 dark:hover:text-white"
                    }`}
                >
                  <Icon className={`h-4 w-4 ${
                    isActive 
                      ? option.value === "dark" 
                        ? "text-blue-400" 
                        : option.value === "light" 
                          ? "text-amber-500" 
                          : "text-accent-500"
                      : ""
                  }`} />
                  <span>{option.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
