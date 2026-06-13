"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

export function Breadcrumbs() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (!pathname || pathname === "/") return null;

  // Define logical hierarchy mapping for flat paths
  const getBreadcrumbs = (path: string) => {
    const items = [{ label: { en: "Home", hi: "मुख्य पृष्ठ" }, href: "/" }];

    switch (path) {
      case "/about":
        items.push({ label: { en: "About Us", hi: "हमारे बारे में" }, href: "/about" });
        break;
      case "/blogs":
        items.push({ label: { en: "Blogs", hi: "ब्लॉग" }, href: "/blogs" });
        break;
      case "/careers":
        items.push({ label: { en: "Careers", hi: "करियर" }, href: "/careers" });
        break;
      case "/contact":
        items.push({ label: { en: "Contact Us", hi: "संपर्क करें" }, href: "/contact" });
        break;
      case "/courses":
        items.push({ label: { en: "Courses", hi: "पाठ्यक्रम" }, href: "/courses" });
        break;
      case "/library":
        items.push({ label: { en: "Courses", hi: "पाठ्यक्रम" }, href: "/courses" });
        items.push({ label: { en: "Digital Library", hi: "डिजिटल लाइब्रेरी" }, href: "/library" });
        break;
      case "/digital-library":
        items.push({ label: { en: "Courses", hi: "पाठ्यक्रम" }, href: "/courses" });
        items.push({ label: { en: "Digital Library", hi: "डिजिटल लाइब्रेरी" }, href: "/library" });
        break;
      case "/interview-prep":
        items.push({ label: { en: "Courses", hi: "पाठ्यक्रम" }, href: "/courses" });
        items.push({ label: { en: "Interview Prep", hi: "इंटरव्यू तैयारी" }, href: "/interview-prep" });
        break;
      case "/dsa-solver":
        items.push({ label: { en: "Courses", hi: "पाठ्यक्रम" }, href: "/courses" });
        items.push({ label: { en: "DSA Problem Solver", hi: "डीएसए प्रॉब्लम सॉल्वर" }, href: "/dsa-solver" });
        break;
      case "/donate":
        items.push({ label: { en: "Get Involved", hi: "शामिल हों" }, href: "/programs" });
        items.push({ label: { en: "Donate", hi: "दान करें" }, href: "/donate" });
        break;
      case "/volunteer":
        items.push({ label: { en: "Get Involved", hi: "शामिल हों" }, href: "/programs" });
        items.push({ label: { en: "Volunteer", hi: "स्वयंसेवक" }, href: "/volunteer" });
        break;
      case "/programs":
        items.push({ label: { en: "Programs", hi: "कार्यक्रम" }, href: "/programs" });
        break;
      case "/gallery":
        items.push({ label: { en: "Gallery", hi: "गैलरी" }, href: "/gallery" });
        break;
      default:
        // Fallback parsing for other nested or single segment paths
        const segments = path.split("/").filter(Boolean);
        segments.forEach((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const labelText = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
          items.push({ label: { en: labelText, hi: labelText }, href });
        });
    }
    return items;
  };

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden md:flex items-center justify-center space-x-2 text-xs font-semibold text-white/70 mb-4 select-none pointer-events-auto"
    >
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={t(item.label) + "-" + index} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />}
            {isLast ? (
              <span className="text-white font-bold tracking-tight">{t(item.label)}</span>
            ) : item.href === "#" ? (
              <span className="text-white/60 cursor-default">{t(item.label)}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-accent-400 text-white/75 transition-colors duration-200 flex items-center gap-1.5"
              >
                {index === 0 && <Home className="h-3.5 w-3.5" />}
                {t(item.label)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
