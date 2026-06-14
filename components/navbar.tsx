"use client";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/language-provider";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, X, User, BookOpen, FileText, Heart, Settings, LogOut, HelpCircle, Phone, Info, UserPlus } from "lucide-react";
import Image from "next/image";
import { LanguageSwitcher } from "./language-switcher";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Nav structure matching the design exactly                          */
/* ------------------------------------------------------------------ */

const desktopLinks: {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}[] = [
  { label: "Home", href: "/" },
  {
    label: "Internship",
    href: "/internship"
  },
  // {
  //   label: "Programs",
  //   href: "/programs",
  //   dropdown: [
  //     { label: "All Programs", href: "/programs" },
  //     { label: "Courses", href: "/courses" },
  //     { label: "Digital Library", href: "/library" },
  //     { label: "Interview Prep", href: "/interview-prep" },
  //     { label: "DSA Problem Solver", href: "/dsa-solver" },
  //   ],
  // },
  // { label: "Digital Library", href: "/library" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const getLinkLabel = (label: string, t: ReturnType<typeof useTranslation>["t"]) => {
  const map: Record<string, string> = {
    "Home": t("nav.home"),
    "About Us": t("nav.about"),
    "Programs": t("nav.programs"),
    "All Programs": t("nav.allPrograms"),
    "Get Involved": t("nav.getInvolved"),
    "Volunteer": t("nav.volunteer"),
    "Donate": t("nav.donate"),
    "Courses": t("nav.courses"),
    "All Courses": t("nav.allCourses"),
    "Digital Library": t("nav.digitalLibrary"),
    "Interview Prep": t("nav.interviewPrep"),
    "DSA Problem Solver": t("nav.dsaSolver"),
    "Blogs": t("nav.blogs"),
    "Contact Us": t("nav.contact"),
  };
  return map[label] ?? label;
};

/* ------------------------------------------------------------------ */
/*  Desktop Dropdown                                                   */
/* ------------------------------------------------------------------ */

function DesktopDropdown({
  label,
  href,
  items,
  isActive,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  isActive: boolean;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div
      className="relative"
      onMouseEnter={() => { if (timer.current) clearTimeout(timer.current); setOpen(true); }}
      onMouseLeave={() => { timer.current = setTimeout(() => setOpen(false), 120); }}
    >
      <Link
        href={href}
        className={`inline-flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200 relative group
          ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`}
      >
        {getLinkLabel(label, t)}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {/* Active underline */}
        <span className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full bg-[#F97316] transition-all duration-200
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-52 origin-top-left rounded-xl bg-[#0F2233] border border-[#1E3A4C] shadow-2xl ring-1 ring-white/5 overflow-hidden z-50"
          >
            <div className="p-1.5 space-y-0.5">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3.5 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-[#1A3347] hover:text-white transition-colors duration-150"
                >
                  {getLinkLabel(item.label, t)}
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
/*  Desktop User Dropdown (logged-in state)                            */
/* ------------------------------------------------------------------ */

function DesktopUserMenu({ name }: { name: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initial = name.charAt(0).toUpperCase();

  const menuItems = [
    { icon: User, label: "My Profile", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard" },
    { icon: FileText, label: "My Applications", href: "/dashboard" },
    { icon: Heart, label: "Donations", href: "/donate" },
    { icon: Settings, label: "Settings", href: "/dashboard" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/50 transition-all duration-200 cursor-pointer focus:outline-none"
      >
        {/* Avatar circle */}
        <span className="w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
          {initial}
        </span>
        <span className="text-[13px] font-semibold text-white">{name}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-[#0F2233] border border-[#1E3A4C] shadow-2xl ring-1 ring-white/5 overflow-hidden z-50"
          >
            <div className="p-1.5 space-y-0.5">
              {menuItems.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-[#1A3347] hover:text-white transition-colors duration-150"
                >
                  <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                  {label}
                </Link>
              ))}
              <div className="h-px bg-slate-700/50 mx-2 my-1" />
              <button
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-[#F97316] hover:bg-[#F97316]/10 transition-colors duration-150 cursor-pointer"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile: Hamburger Menu (not-logged-in)                             */
/* ------------------------------------------------------------------ */

function MobileGuestMenu({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { icon: LogOut, label: "Login", href: "/login" },
    { icon: UserPlus, label: "Register", href: "/login" },
    { icon: Info, label: "About Us", href: "/about" },
    { icon: Phone, label: "Contact Us", href: "/contact" },
    { icon: HelpCircle, label: "Help & Support", href: "/contact" },
  ];

  return (
    <div className="p-2 space-y-0.5">
      {menuItems.map(({ icon: Icon, label, href }) => (
        <Link
          key={label}
          href={href}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-slate-200 hover:bg-[#1A3347] hover:text-white transition-colors duration-150"
        >
          <Icon className="h-4 w-4 shrink-0 text-slate-400" />
          {label}
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile: Profile Menu (logged-in)                                   */
/* ------------------------------------------------------------------ */

function MobileProfileMenu({ name, onClose }: { name: string; onClose: () => void }) {
  const profileItems = [
    { icon: User, label: "My Profile", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard" },
    { icon: FileText, label: "My Applications", href: "/dashboard" },
    { icon: Heart, label: "Donations", href: "/donate" },
    { icon: Settings, label: "Settings", href: "/dashboard" },
  ];

  return (
    <div className="p-2 space-y-0.5">
      {profileItems.map(({ icon: Icon, label, href }) => (
        <Link
          key={label}
          href={href}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-slate-200 hover:bg-[#1A3347] hover:text-white transition-colors duration-150"
        >
          <Icon className="h-4 w-4 shrink-0 text-slate-400" />
          {label}
        </Link>
      ))}
      <div className="h-px bg-slate-700/50 mx-2 my-1" />
      <button
        onClick={onClose}
        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-[#F97316] hover:bg-[#F97316]/10 transition-colors duration-150 cursor-pointer"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Logout
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Navbar                                                         */
/* ------------------------------------------------------------------ */

// Toggle this to simulate logged-in state
const LOGGED_IN = false;
const USER_NAME = "Aashish";

export function Navbar() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuType, setMobileMenuType] = useState<"guest" | "profile">("guest");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const openMobileMenu = (type: "guest" | "profile") => {
    setMobileMenuType(type);
    setMobileMenuOpen(true);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || pathname !== "/"
          ? "bg-[#071826]/95 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-[#071826]"
          }`}
      >
        {/* ============================================================ */}
        {/* MOBILE HEADER                                                */}
        {/* ============================================================ */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
          {/* Left: Logo + Name */}
          <Link href="/" className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/images/devbhoomi-logo.jpeg"
                alt="NextGen Devbhoomi Foundation logo"
                width={40}
                height={40}
                className="rounded-full object-cover border border-white/20"
              />
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-[13.5px] font-black text-white leading-none">
                NextGen{" "}
                <span className="text-[#F97316]">Devbhoomi</span>
              </p>
              <p className="text-[11px] font-semibold text-white leading-tight">
                Foundation
              </p>
            </div>
          </Link>

          {/* Right: Language + Login or Avatar */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher />

            {LOGGED_IN ? (
              /* Logged-in avatar button */
              <button
                onClick={() => openMobileMenu("profile")}
                className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 transition-all duration-200 cursor-pointer"
                aria-label="Open profile menu"
              >
                <span className="w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center text-white text-[12px] font-bold">
                  {USER_NAME.charAt(0)}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ) : (
              /* Not logged in: Login button */
              <button
                onClick={() => openMobileMenu("guest")}
                className="h-9 px-4 rounded-xl border border-[#F97316] text-[#F97316] text-[13px] font-bold hover:bg-[#F97316]/10 transition-all duration-200 cursor-pointer"
              >
                {t("nav.loginRegister").split("/")[0].trim()}
              </button>
            )}
          </div>
        </div>

        {/* Announcement ticker – full width below mobile header */}
        <div className="w-full bg-accent-500 text-black overflow-hidden py-2 md:py-4 select-none">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex shrink-0 items-center justify-around gap-12 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider min-w-full">
              <span>{t("ticker.admissions")}</span>
              <span>{t("ticker.library")}</span>
              <span>{t("ticker.volunteers")}</span>
              <span>{t("ticker.taxBenefit")}</span>
            </div>
            <div className="flex shrink-0 items-center justify-around gap-12 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider min-w-full text-slate-400">
              <span>{t("ticker.admissions")}</span>
              <span>{t("ticker.library")}</span>
              <span>{t("ticker.volunteers")}</span>
              <span>{t("ticker.taxBenefit")}</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP HEADER                                               */}
        {/* ============================================================ */}
        <div className="hidden lg:flex items-center justify-between h-[68px] max-w-7xl mx-auto px-6">
          {/* Left: Logo + Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src="/images/devbhoomi-logo.jpeg"
                alt="NextGen Devbhoomi Foundation logo"
                width={44}
                height={44}
                className="rounded-full object-cover border border-white/10 shadow-md group-hover:shadow-xl transition-shadow"
              />
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-black text-white leading-none">NextGen</p>
              <p className="text-[15px] font-black text-[#F97316] leading-none">Devbhoomi</p>
              <p className="text-[13px] font-semibold text-white leading-tight">Foundation</p>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <div className="flex items-center gap-1">
            {desktopLinks.map((link) =>
              link.dropdown ? (
                <DesktopDropdown
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  items={link.dropdown}
                  isActive={isActive(link.href)}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200 group
                    ${isActive(link.href) ? "text-white" : "text-slate-300 hover:text-white"}`}
                >
                  {getLinkLabel(link.label, t)}
                  <span
                    className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full bg-[#F97316] transition-all duration-200
                      ${isActive(link.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  />
                </Link>
              )
            )}
          </div>

          {/* Right: Language + Auth buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <LanguageSwitcher />

            {LOGGED_IN ? (
              <DesktopUserMenu name={USER_NAME} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="h-9 px-5 rounded-xl border border-[#F97316] text-[#F97316] text-[13px] font-bold hover:bg-[#F97316]/10 transition-all duration-200 flex items-center"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="h-9 px-5 rounded-xl bg-[#F97316] hover:bg-[#EA6B0C] text-white text-[13px] font-bold transition-all duration-200 flex items-center shadow-lg shadow-[#F97316]/20"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* MOBILE SLIDE-IN MENU                                          */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in panel from right */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-[#0A1F2E] border-l border-white/10 shadow-2xl lg:hidden flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/devbhoomi-logo.jpeg"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="rounded-full border border-white/20"
                  />
                  <div className="leading-tight">
                    <p className="text-[12px] font-black text-white leading-none">NextGen <span className="text-[#F97316]">Devbhoomi</span></p>
                    <p className="text-[10px] text-slate-400">Foundation</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto py-2">
                {mobileMenuType === "guest" ? (
                  <MobileGuestMenu onClose={() => setMobileMenuOpen(false)} />
                ) : (
                  <MobileProfileMenu name={USER_NAME} onClose={() => setMobileMenuOpen(false)} />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
