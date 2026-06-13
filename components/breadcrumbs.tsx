"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") return null;

  // Define logical hierarchy mapping for flat paths
  const getBreadcrumbs = (path: string) => {
    const items = [{ label: "Home", href: "/" }];

    switch (path) {
      case "/about":
        items.push({ label: "About Us", href: "/about" });
        break;
      case "/blogs":
        items.push({ label: "Blogs", href: "/blogs" });
        break;
      case "/contact":
        items.push({ label: "Contact Us", href: "/contact" });
        break;
      case "/courses":
        items.push({ label: "Courses", href: "/courses" });
        break;
      case "/library":
        items.push({ label: "Courses", href: "/courses" });
        items.push({ label: "Digital Library", href: "/library" });
        break;
      case "/digital-library":
        items.push({ label: "Courses", href: "/courses" });
        items.push({ label: "Digital Library", href: "/library" });
        break;
      case "/interview-prep":
        items.push({ label: "Courses", href: "/courses" });
        items.push({ label: "Interview Prep", href: "/interview-prep" });
        break;
      case "/dsa-solver":
        items.push({ label: "Courses", href: "/courses" });
        items.push({ label: "DSA Problem Solver", href: "/dsa-solver" });
        break;
      case "/donate":
        items.push({ label: "Get Involved", href: "/programs" });
        items.push({ label: "Donate", href: "/donate" });
        break;
      case "/volunteer":
        items.push({ label: "Get Involved", href: "/programs" });
        items.push({ label: "Volunteer", href: "/volunteer" });
        break;
      case "/programs":
        items.push({ label: "Programs", href: "/programs" });
        break;
      case "/gallery":
        items.push({ label: "Gallery", href: "/gallery" });
        break;
      default:
        // Fallback parsing for other nested or single segment paths
        const segments = path.split("/").filter(Boolean);
        segments.forEach((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
          items.push({ label, href });
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
          <div key={item.label + "-" + index} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />}
            {isLast ? (
              <span className="text-white font-bold tracking-tight">{item.label}</span>
            ) : item.href === "#" ? (
              <span className="text-white/60 cursor-default">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-accent-400 text-white/75 transition-colors duration-200 flex items-center gap-1.5"
              >
                {index === 0 && <Home className="h-3.5 w-3.5" />}
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
