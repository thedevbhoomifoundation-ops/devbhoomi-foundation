"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Layers, Library, Mail } from "lucide-react";

export function BottomNavigation() {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Programs", href: "/programs", icon: Layers },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Library", href: "/library", icon: Library },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200/80 dark:border-slate-800/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] h-16 px-2 pb-safe">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all relative ${
                isActive
                  ? "text-accent-500 font-semibold"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-350"
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all duration-250 ${
                  isActive ? "bg-accent-50 dark:bg-accent-950/20 scale-105" : ""
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? "stroke-[2.5px] text-accent-500" : "stroke-[2px]"
                  }`}
                />
              </div>
              <span className="text-[9px] mt-0.5 tracking-wide font-medium">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
