"use client";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/language-provider";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Home,
  Layers,
  BookOpen,
  Info,
  LogIn,
  FileText,
  Award,
  User,
  Heart,
  Calendar,
  Trophy,
  Bell,
} from "lucide-react";

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { isLoaded, isSignedIn, user } = useUser();
  const [appCount, setAppCount] = useState<number | null>(null);

  // If path is admin route, do not render bottom nav
  if (pathname.startsWith("/admin")) return null;

  const userRoles = (user?.publicMetadata?.roles as string[]) || [];
  const isStudent = isSignedIn && userRoles.includes("STUDENT");
  const isVolunteer = isSignedIn && userRoles.includes("VOLUNTEER");
  const isAdmin = isSignedIn && userRoles.includes("ADMIN");

  // Fetch application counts for student role
  useEffect(() => {
    if (isStudent) {
      fetch("/api/internship/applications")
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setAppCount(data.length);
          }
        })
        .catch((err) => console.error("Error fetching bottom nav app count:", err));
    }
  }, [isStudent]);

  // Admin redirection check
  useEffect(() => {
    if (isLoaded && isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isLoaded, isAdmin, router]);

  if (isLoaded && isAdmin) {
    return null;
  }

  // Determine dynamic tabs based on roles
  let tabs = [];
  if (!isSignedIn) {
    // 1. Guest User
    tabs = [
      { label: "Home", href: "/", icon: Home },
      { label: "Programs", href: "/programs", icon: Layers },
      { label: "Courses", href: "/courses", icon: BookOpen },
      { label: "About", href: "/about", icon: Info },
      { label: "Login", href: "/login", icon: LogIn },
    ];
  } else if (isStudent && isVolunteer) {
    // 4. Combined Student + Volunteer User
    tabs = [
      { label: "Home", href: "/", icon: Home },
      { label: "Internships", href: "/dashboard/applications", icon: FileText, badge: appCount },
      { label: "Volunteer", href: "/volunteer", icon: Heart },
      { label: "Updates", href: "/dashboard/updates", icon: Bell, badge: 3 },
      { label: "Profile", href: "/profile", icon: User },
    ];
  } else if (isStudent) {
    // 2. Student / Intern User
    tabs = [
      { label: "Home", href: "/", icon: Home },
      { label: "Applications", href: "/dashboard/applications", icon: FileText, badge: appCount },
      { label: "Learning", href: "/dashboard/learning", icon: BookOpen },
      { label: "Certificate", href: "/dashboard/certificates", icon: Award },
      { label: "Profile", href: "/dashboard/profile", icon: User },
    ];
  } else if (isVolunteer) {
    // 3. Volunteer User
    tabs = [
      { label: "Home", href: "/", icon: Home },
      { label: "Volunteer", href: "/volunteer", icon: Heart },
      { label: "Activities", href: "/volunteer/activities", icon: Calendar, badge: 2 },
      { label: "Achievements", href: "/volunteer/achievements", icon: Trophy },
      { label: "Profile", href: "/profile", icon: User },
    ];
  } else {
    // Fallback Guest
    tabs = [
      { label: "Home", href: "/", icon: Home },
      { label: "Programs", href: "/programs", icon: Layers },
      { label: "Courses", href: "/courses", icon: BookOpen },
      { label: "About", href: "/about", icon: Info },
      { label: "Login", href: "/login", icon: LogIn },
    ];
  }

  const getTabLabel = (label: string) => {
    switch (label) {
      case "Home": return t("nav.home");
      case "Programs": return t("nav.programs");
      case "Courses": return t("nav.courses");
      case "About": return t("nav.about");
      case "Login": return t("nav.loginRegister").split("/")[0].trim();
      case "Applications": return "Applications";
      case "Learning": return "Learning";
      case "Certificate": return "Certificate";
      case "Profile": return "Profile";
      case "Volunteer": return "Volunteer";
      case "Activities": return "Activities";
      case "Achievements": return "Achievements";
      case "Internships": return "Internships";
      case "Updates": return "Updates";
      default: return label;
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A1F2E]/95 backdrop-blur-md border-t border-[#1E3A4C]/60 shadow-[0_-4px_24px_rgba(0,0,0,0.3)] h-16 px-2 pb-safe">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          
          return (
            <Link
              key={tab.label + tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all relative ${
                isActive
                  ? "text-[#F97316] font-extrabold"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all duration-200 relative ${
                  isActive ? "bg-[#F97316]/10 scale-105" : ""
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? "stroke-[2.5px] text-[#F97316]" : "stroke-[2px]"
                  }`}
                />
                
                {/* Badge Support */}
                {tab.badge !== undefined && tab.badge !== null && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#F97316] text-[8px] font-black text-white px-1 shadow-md shadow-[#F97316]/20">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] mt-0.5 tracking-wide font-semibold">
                {getTabLabel(tab.label)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
