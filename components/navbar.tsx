"use client";
import { useTranslation } from "react-i18next";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { navLinks } from "@/lib/constants";
import { LanguageSwitcher } from "./language-switcher";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Derive sub-items from the flat navLinks constant                   */
/* ------------------------------------------------------------------ */

const programsSubItems = [
  { label: "All Programs", href: "/programs" },
  { label: "Education", href: "/programs#education" },
  { label: "Community Development", href: "/programs#community" },
  { label: "Technology Training", href: "/programs#technology" },
];

const getInvolvedSubItems = [
  {
    label: "Volunteer",
    href: navLinks.find((l) => l.label === "Volunteer")?.href ?? "/volunteer",
  },
  {
    label: "Donate",
    href: navLinks.find((l) => l.label === "Donate")?.href ?? "/donate",
  },
];

/** The visible top-level items shown in the navbar (re-ordered). */
const displayLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs", dropdown: programsSubItems },
  { label: "Get Involved", href: "#", dropdown: getInvolvedSubItems },
  {
    label: "Courses",
    href: "/courses",
    dropdown: [
      { label: "All Courses", href: "/courses" },
      { label: "Digital Library", href: "/library" },
      { label: "Interview Prep", href: "/interview-prep" },
      { label: "DSA Problem Solver", href: "/dsa-solver" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

const getNavLinkTranslation = (label: string, t: any) => {
  switch (label) {
    case "Home": return t("nav.home");
    case "About Us": return t("nav.about");
    case "Programs": return t("nav.programs");
    case "All Programs": return t("nav.allPrograms");
    case "Education": return t("nav.education");
    case "Community Development": return t("nav.communityDev");
    case "Technology Training": return t("nav.techTraining");
    case "Get Involved": return t("nav.getInvolved");
    case "Volunteer": return t("nav.volunteer");
    case "Donate": return t("nav.donate");
    case "Courses": return t("nav.courses");
    case "All Courses": return t("nav.allCourses");
    case "Digital Library": return t("nav.digitalLibrary");
    case "Interview Prep": return t("nav.interviewPrep");
    case "DSA Problem Solver": return t("nav.dsaSolver");
    case "Blogs": return t("nav.blogs");
    case "Contact Us": return t("nav.contact");
    default: return label;
  }
};

/* ------------------------------------------------------------------ */
/*  Dropdown component (desktop)                                       */
/* ------------------------------------------------------------------ */

function DesktopDropdown({
  label,
  items,
  href,
}: {
  label: string;
  items: { label: string; href: string }[];
  href: string;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary-100 hover:text-accent-500 transition-colors duration-300 relative group"
      >
        {getNavLinkTranslation(label, t)}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-1 w-52 origin-top-left rounded-xl bg-slate-800 border border-slate-700 shadow-xl ring-1 ring-white/5 overflow-hidden z-50"
          >
            <div className="p-1.5">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-primary-200 hover:bg-slate-700/60 hover:text-white transition-colors duration-200"
                >
                  {getNavLinkTranslation(item.label, t)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile accordion for dropdowns                                     */
/* ------------------------------------------------------------------ */

function MobileAccordion({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-white hover:bg-slate-800 transition-colors"
      >
        <span>{getNavLinkTranslation(label, t)}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pl-4"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="block px-3 py-2 rounded-lg text-sm text-primary-300 hover:bg-slate-800 transition-colors"
              >
                {getNavLinkTranslation(item.label, t)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

const getMobileTitle = (path: string, t: any) => {
  switch (path) {
    case "/about":
      return t("nav.about");
    case "/blogs":
      return t("nav.blogs");
    case "/contact":
      return t("nav.contact");
    case "/courses":
      return t("nav.courses");
    case "/library":
    case "/digital-library":
      return t("nav.digitalLibrary");
    case "/interview-prep":
      return t("nav.interviewPrep");
    case "/dsa-solver":
      return t("nav.dsaSolver");
    case "/donate":
      return t("nav.donate");
    case "/volunteer":
      return t("nav.volunteer");
    case "/programs":
      return t("nav.programs");
    case "/gallery":
      return t('components.navbar.gallery');
    case "/careers":
      return t('components.navbar.careers');
    case "/login":
      return t('components.navbar.accountAccess');
    default:
      const lastSegment = path.split("/").pop();
      if (!lastSegment) return "Nextgen";
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ");
  }
};

export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSubpage = pathname !== "/";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSubpage
          ? "bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-800/60 h-auto"
          : isScrolled
          ? "bg-slate-950 shadow-md lg:bg-slate-900/90 lg:backdrop-blur-md lg:shadow-lg h-auto"
          : "bg-slate-950 shadow-md lg:bg-transparent h-auto"
      }`}
    >
      {/* Mobile Home Header Banner (full width, visible only on mobile, and when on homepage) */}
      {!isSubpage && (
        <div className="lg:hidden flex flex-col w-full bg-slate-950 shadow-md">
          {/* Main Header Row */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left: Logo & Text */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 shrink-0">
                <Image
                  src="/images/devbhoomi-logo.jpeg"
                  alt="Nextgen Devbhoomi Foundation logo"
                  width={44}
                  height={44}
                  className="rounded-full object-cover border border-white/20"
                />
              </div>
              <div className="leading-tight">
                <h1 className="text-[14px] sm:text-[15px] font-black tracking-tight leading-none text-white font-heading">
                  NextGen <span className="text-accent-500">Devbhoomi</span> Foundation
                </h1>
                <p className="text-[9px] font-bold text-[#A8BDD1] tracking-wider uppercase mt-0.5 font-body">
                  {t("brand.tagline")}
                </p>
                <p className="text-[8px] text-white/75 font-medium mt-0.5 truncate max-w-[55vw]">
                  {t("brand.mobileSubtitle")}
                </p>
              </div>
            </div>

            {/* Right: Language Switcher */}
            <div className="shrink-0 flex items-center">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Golden Sub-Bar Ticker */}
          <div className="bg-accent-500 py-1.5 px-4 text-center">
            <p className="text-[8px] sm:text-[9px] font-black text-primary-950 tracking-widest uppercase">
              {t("brand.goldenBar")}
            </p>
          </div>
        </div>
      )}

      {/* Container for Desktop Navbar & Mobile Subpage Navbar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        isSubpage
          ? "h-16"
          : isScrolled
          ? "h-16 lg:h-16"
          : "h-16 lg:h-20"
      } ${!isSubpage ? "hidden lg:block" : "block"}`}>
        {/* Mobile Subpage App Bar Mode (visible only on mobile and when on subpage) */}
        {isSubpage ? (
          <div className="flex lg:hidden items-center justify-between h-full w-full">
            {/* Left: Native Back Button */}
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer"
              aria-label={t("nav.back")}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Center: Screen Title */}
            <span className="text-base font-bold text-white truncate max-w-[60vw]">
              {getMobileTitle(pathname, t)}
            </span>

            {/* Right: Language Switcher */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        ) : null}

        {/* Standard Navbar Inner (hidden on all mobile views, visible on desktop) */}
        <div className="justify-between items-center h-full hidden lg:flex">
          {/* -------- Left: Logo -------- */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* Logo image */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/images/devbhoomi-logo.jpeg"
                  alt="Nextgen Devbhoomi Foundation logo"
                  width={40}
                  height={40}
                  className="rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                />
              </div>

              {/* Name + tagline */}
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold uppercase tracking-wide text-white">
                  {t("brand.title")}
                </p>
                <p className="text-[11px] text-primary-400">
                  {t("brand.tagline")}
                </p>
              </div>
            </div>
          </Link>

          {/* -------- Center: Desktop Navigation -------- */}
          <div className="hidden lg:flex items-center gap-0.5">
            {displayLinks.map((link) =>
              link.dropdown ? (
                <DesktopDropdown
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  items={link.dropdown}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-primary-100 hover:text-accent-500 transition-colors duration-300 relative group"
                >
                  {getNavLinkTranslation(link.label, t)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          {/* -------- Right: Language Switcher + CTA -------- */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Login / Register – desktop only */}
            <Link
              href="/login"
              className="hidden lg:inline-flex items-center bg-primary-900 hover:bg-[#1A5A7D] text-white text-sm font-semibold rounded-full px-5 py-2 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {t("nav.loginRegister")}
            </Link>
          </div>
        </div>
      </div>

      {/* Sliding Announcement Bar Ticker */}
      <div className="w-full bg-slate-900 text-slate-300 border-t border-b border-slate-800/60 overflow-hidden py-1.5 select-none z-40 relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex shrink-0 items-center justify-around gap-12 text-[10px] sm:text-xs font-bold uppercase tracking-wider min-w-full">
            <span>{t("ticker.admissions")}</span>
            <span>{t("ticker.library")}</span>
            <span>{t("ticker.volunteers")}</span>
            <span>{t("ticker.taxBenefit")}</span>
          </div>
          <div className="flex shrink-0 items-center justify-around gap-12 text-[10px] sm:text-xs font-bold uppercase tracking-wider min-w-full">
            <span>{t("ticker.admissions")}</span>
            <span>{t("ticker.library")}</span>
            <span>{t("ticker.volunteers")}</span>
            <span>{t("ticker.taxBenefit")}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
