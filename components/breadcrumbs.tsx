"use client";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const { t } = useTranslation();

  if (!pathname || pathname === "/") return null;

  // Define logical hierarchy mapping for flat paths
  const getBreadcrumbs = (path: string) => {
    const items = [{ label: "components.breadcrumbs.home", href: "/" }];

    switch (path) {
      case "/about":
        items.push({ label: "components.breadcrumbs.aboutUs", href: "/about" });
        break;
      case "/faqs":
        items.push({ label: "components.breadcrumbs.faq", href: "/faqs" });
        break;
      case "/privacy":
        items.push({ label: "components.breadcrumbs.privacy", href: "/privacy" });
        break;
      case "/terms":
        items.push({ label: "components.breadcrumbs.terms", href: "/terms" });
        break;
      case "/refund-policy":
        items.push({ label: "components.breadcrumbs.refundPolicy", href: "/refund-policy" });
        break;
      case "/blogs":
        items.push({ label: "components.breadcrumbs.blogs", href: "/blogs" });
        break;
      case "/careers":
        items.push({ label: "components.breadcrumbs.careers", href: "/careers" });
        break;
      case "/contact":
        items.push({ label: "components.breadcrumbs.contactUs", href: "/contact" });
        break;
      case "/courses":
        items.push({ label: "components.breadcrumbs.courses", href: "/courses" });
        break;
      case "/library":
        items.push({ label: "components.breadcrumbs.courses", href: "/courses" });
        items.push({ label: "components.breadcrumbs.digitalLibrary", href: "/library" });
        break;
      case "/digital-library":
        items.push({ label: "components.breadcrumbs.courses", href: "/courses" });
        items.push({ label: "components.breadcrumbs.digitalLibrary", href: "/library" });
        break;
      case "/interview-prep":
        items.push({ label: "components.breadcrumbs.courses", href: "/courses" });
        items.push({ label: "components.breadcrumbs.interviewPrep", href: "/interview-prep" });
        break;
      case "/dsa-solver":
        items.push({ label: "components.breadcrumbs.courses", href: "/courses" });
        items.push({ label: "components.breadcrumbs.dsaProblemSolver", href: "/dsa-solver" });
        break;
      case "/donate":
        items.push({ label: "components.breadcrumbs.getInvolved", href: "/programs" });
        items.push({ label: "components.breadcrumbs.donate", href: "/donate" });
        break;
      case "/volunteer":
        items.push({ label: "components.breadcrumbs.getInvolved", href: "/programs" });
        items.push({ label: "components.breadcrumbs.volunteer", href: "/volunteer" });
        break;
      case "/programs":
        items.push({ label: "components.breadcrumbs.programs", href: "/programs" });
        break;
      case "/gallery":
        items.push({ label: "components.breadcrumbs.gallery", href: "/gallery" });
        break;
      default:
        // Fallback parsing for other nested or single segment paths
        const segments = path.split("/").filter(Boolean);
        segments.forEach((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const labelText = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
          items.push({ label: labelText, href });
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
