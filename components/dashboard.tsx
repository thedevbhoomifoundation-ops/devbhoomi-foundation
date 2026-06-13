"use client";

import React from "react";
import { LayoutDashboard, BookOpen, Award, Settings, LogOut, Menu, X, Bell, User } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/language-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "student" | "volunteer" | "donor" | "instructor" | "admin";
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useTranslation();
  const { language } = useLanguage(); // consumes language context to trigger re-renders

  const sidebarItems = {
    student: [
      { icon: LayoutDashboard, label: "components.dashboard.dashboard" },
      { icon: BookOpen, label: "components.dashboard.myCourses" },
      { icon: Award, label: "components.dashboard.certificates" },
      { icon: Settings, label: "components.dashboard.settings" },
    ],
    volunteer: [
      { icon: LayoutDashboard, label: "components.dashboard.dashboard" },
      { icon: BookOpen, label: "components.dashboard.myProjects" },
      { icon: Award, label: "components.dashboard.recognition" },
      { icon: Settings, label: "components.dashboard.settings" },
    ],
    donor: [
      { icon: LayoutDashboard, label: "components.dashboard.dashboard" },
      { icon: BookOpen, label: "components.dashboard.myDonations" },
      { icon: Award, label: "components.dashboard.impactReport" },
      { icon: Settings, label: "components.dashboard.settings" },
    ],
    instructor: [
      { icon: LayoutDashboard, label: "components.dashboard.dashboard" },
      { icon: BookOpen, label: "components.dashboard.myCourses" },
      { icon: Award, label: "components.dashboard.students" },
      { icon: Settings, label: "components.dashboard.settings" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "components.dashboard.dashboard" },
      { icon: BookOpen, label: "components.dashboard.manageContent" },
      { icon: Award, label: "components.dashboard.analytics" },
      { icon: Settings, label: "components.dashboard.settings" },
    ],
  };

  const userTypeLabels = {
    student: "components.dashboard.student",
    volunteer: "components.dashboard.volunteer",
    donor: "components.dashboard.donor",
    instructor: "components.dashboard.instructor",
    admin: "components.dashboard.admin",
  };

  return (
    <div className="flex h-screen bg-[#071826]">
      {/* Sidebar */}
      <motion.div
        className={`fixed lg:relative w-64 h-screen bg-gradient-primary text-white shadow-xl z-40 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        initial={false}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="font-bold">DB</span>
            </div>
            <div>
              <p className="font-bold text-sm">{t("components.dashboard.devBhoomi")}</p>
              <p className="text-xs text-white/70">{t("components.dashboard.foundation")}</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 m-4 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20" />
            <div>
              <p className="text-sm font-semibold">{t("components.dashboard.priyaSharma")}</p>
              <p className="text-xs text-white/70 capitalize">{t(userTypeLabels[userType])}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {sidebarItems[userType].map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href="#"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all group"
              >
                <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>{t(item.label)}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all text-white/80 cursor-pointer">
            <LogOut className="h-5 w-5" />
            <span>{t("components.dashboard.logout")}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-slate-800 shadow-md px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 hover:bg-slate-700 rounded-lg cursor-pointer">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer">
              <User className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Student Dashboard
export function StudentDashboard() {
  const { t } = useTranslation();
  const { language } = useLanguage(); // consumes language context to trigger re-renders

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            {t("components.dashboard.welcomeBackPriya")}
          </h1>
          <p className="text-slate-300 mt-1">
            {t("components.dashboard.youreOnTrackKeepUpTheGre")}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-accent-400 font-semibold text-sm mb-1">
              {t("components.dashboard.enrolledCourses")}
            </div>
            <div className="text-3xl font-bold text-white">5</div>
          </Card>
          <Card>
            <div className="text-accent-400 font-semibold text-sm mb-1">
              {t("components.dashboard.completed")}
            </div>
            <div className="text-3xl font-bold text-white">2</div>
          </Card>
          <Card>
            <div className="text-accent-400 font-semibold text-sm mb-1">
              {t("components.dashboard.learningHours")}
            </div>
            <div className="text-3xl font-bold text-white">48h</div>
          </Card>
          <Card>
            <div className="text-accent-400 font-semibold text-sm mb-1">
              {t("components.dashboard.certificates")}
            </div>
            <div className="text-3xl font-bold text-white">2</div>
          </Card>
        </div>

        {/* Active Courses */}
        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">
            {t("components.dashboard.activeCourses")}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-slate-700 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">
                    {t("components.dashboard.advancedReactNextjs")}
                  </h3>
                  <span className="text-sm text-accent-400 font-medium">
                    {t("components.dashboard.65Complete")}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-accent"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
