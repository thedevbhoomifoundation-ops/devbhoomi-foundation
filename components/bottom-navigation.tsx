"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import {
  Home,
  BookOpen,
  Layers,
  Library,
  MoreHorizontal,
  Info,
  Heart,
  Image as ImageIcon,
  Briefcase,
  LayoutDashboard,
  HelpCircle,
  FileText,
  LogIn,
} from "lucide-react";

export function BottomNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const tabs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Programs", href: "/programs", icon: Layers },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Library", href: "/library", icon: Library },
  ];

  const secondaryLinks = [
    { label: "About Us", href: "/about", icon: Info },
    { label: "Volunteer", href: "/volunteer", icon: Heart },
    { label: "Blogs", href: "/blogs", icon: FileText },
    { label: "Gallery", href: "/gallery", icon: ImageIcon },
    { label: "Careers", href: "/careers", icon: Briefcase },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Interview Prep", href: "/interview-prep", icon: HelpCircle },
    { label: "DSA Solver", href: "/dsa-solver", icon: BookOpen },
    { label: "Login / Register", href: "/login", icon: LogIn },
  ];

  const getTabLabel = (label: string) => {
    switch (label) {
      case "Home": return t("nav.home");
      case "Programs": return t("nav.programs");
      case "Courses": return t("nav.courses");
      case "Library": return t("nav.digitalLibrary");
      case "About Us": return t("nav.about");
      case "Volunteer": return t("nav.volunteer");
      case "Blogs": return t("nav.blogs");
      case "Gallery": return t({ en: "Gallery", hi: "गैलरी" });
      case "Careers": return t({ en: "Careers", hi: "करियर" });
      case "Dashboard": return t("nav.dashboard");
      case "Interview Prep": return t("nav.interviewPrep");
      case "DSA Solver": return t("nav.dsaSolver");
      case "Login / Register": return t("nav.loginRegister");
      default: return label;
    }
  };

  return (
    <>
      {/* Bottom Sheet Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="md:hidden fixed bottom-16 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800/90 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] px-6 pt-4 pb-8 max-h-[60vh] overflow-y-auto"
            >
              {/* Drag Handle Bar */}
              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-5" />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-extrabold text-white font-heading">
                  {t("nav.moreOptions")}
                </h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-semibold text-accent-500 hover:text-accent-600 cursor-pointer"
                >
                  {t("nav.close")}
                </button>
              </div>

              {/* Grid of Apps Links */}
              <div className="grid grid-cols-3 gap-4">
                {secondaryLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-accent-950/20 border-accent-800/50 text-accent-400"
                          : "bg-slate-800/40 border-slate-700/50 text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="h-5 w-5 mb-2 shrink-0 stroke-[2px]" />
                      <span className="text-[10px] font-bold tracking-tight text-center leading-tight">
                        {getTabLabel(link.label)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-t border-slate-800/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] h-16 px-2 pb-safe">
        <div className="flex justify-around items-center h-full max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href && !isMenuOpen;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all relative ${
                  isActive
                    ? "text-accent-500 font-semibold"
                    : "text-slate-400 hover:text-slate-350"
                }`}
              >
                <div
                  className={`p-1 rounded-xl transition-all duration-250 ${
                    isActive ? "bg-accent-950/20 scale-105" : ""
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform ${
                      isActive ? "stroke-[2.5px] text-accent-500" : "stroke-[2px]"
                    }`}
                  />
                </div>
                <span className="text-[9px] mt-0.5 tracking-wide font-medium">
                  {getTabLabel(tab.label)}
                </span>
              </Link>
            );
          })}

          {/* More Tab */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all relative cursor-pointer ${
              isMenuOpen
                ? "text-accent-500 font-semibold"
                : "text-slate-400 hover:text-slate-350"
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all duration-250 ${
                isMenuOpen ? "bg-accent-950/20 scale-105" : ""
              }`}
            >
              <MoreHorizontal
                className={`h-5 w-5 transition-transform ${
                  isMenuOpen ? "stroke-[2.5px] text-accent-500" : "stroke-[2px]"
                }`}
              />
            </div>
            <span className="text-[9px] mt-0.5 tracking-wide font-medium">
              {t("nav.more")}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
