"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { navLinks } from "@/lib/constants";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

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
const displayLinks: {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}[] = [
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
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary-900 dark:text-primary-100 hover:text-accent-500 transition-colors duration-300 relative group"
      >
        {label}
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
            className="absolute left-0 top-full mt-1 w-52 origin-top-left rounded-xl bg-white dark:bg-slate-800 border border-primary-100 dark:border-slate-700 shadow-xl ring-1 ring-black/5 dark:ring-white/5 overflow-hidden z-50"
          >
            <div className="p-1.5">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-slate-700/60 hover:text-primary-900 dark:hover:text-white transition-colors duration-200"
                >
                  {item.label}
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
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
      >
        <span>{label}</span>
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
                className="block px-3 py-2 rounded-lg text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
              >
                {item.label}
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg h-16"
          : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* -------- Left: Logo -------- */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* Logo image (place your image at /public/images/devbhoomi-logo.png) */}
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
                <p className="text-sm font-bold uppercase tracking-wide text-primary-900 dark:text-white">
                  Nextgen Devbhoomi Foundation
                </p>
                <p className="text-[11px] text-primary-500 dark:text-primary-400">
                  Building a Resilient Future
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
                  className="px-3 py-2 text-sm font-medium text-primary-900 dark:text-primary-100 hover:text-accent-500 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          {/* -------- Right: Theme Toggle + CTA + Hamburger -------- */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Login / Register – desktop only */}
            <Link
              href="/login"
              className="hidden lg:inline-flex items-center bg-primary-900 hover:bg-primary-800 text-white text-sm font-semibold rounded-full px-5 py-2 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Login / Register
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 transition-all duration-300"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-primary-900 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-primary-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* -------- Mobile Menu -------- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-white dark:bg-slate-900 border-t border-primary-100 dark:border-slate-700 rounded-b-2xl shadow-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {displayLinks.map((link) =>
                  link.dropdown ? (
                    <MobileAccordion
                      key={link.label}
                      label={link.label}
                      items={link.dropdown}
                      onNavigate={() => setIsOpen(false)}
                    />
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 rounded-lg text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}

                {/* Divider + CTA */}
                <div className="pt-3 mt-2 border-t border-primary-100 dark:border-slate-700">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-primary-900 hover:bg-primary-800 text-white text-sm font-semibold rounded-full px-5 py-2.5 transition-colors duration-300"
                  >
                    Login / Register
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
