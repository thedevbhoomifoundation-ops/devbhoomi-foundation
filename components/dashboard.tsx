"use client";

import React from "react";
import { LayoutDashboard, BookOpen, Award, Settings, LogOut, Menu, X, Bell, User } from "lucide-react";
import { useState } from "react";
import { Card, Section } from "@/components/ui";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "student" | "volunteer" | "donor" | "instructor" | "admin";
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = {
    student: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: BookOpen, label: "My Courses" },
      { icon: Award, label: "Certificates" },
      { icon: Settings, label: "Settings" },
    ],
    volunteer: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: BookOpen, label: "My Projects" },
      { icon: Award, label: "Recognition" },
      { icon: Settings, label: "Settings" },
    ],
    donor: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: BookOpen, label: "My Donations" },
      { icon: Award, label: "Impact Report" },
      { icon: Settings, label: "Settings" },
    ],
    instructor: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: BookOpen, label: "My Courses" },
      { icon: Award, label: "Students" },
      { icon: Settings, label: "Settings" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: BookOpen, label: "Manage Content" },
      { icon: Award, label: "Analytics" },
      { icon: Settings, label: "Settings" },
    ],
  };

  return (
    <div className="flex h-screen bg-primary-50 dark:bg-slate-900">
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
              <p className="font-bold text-sm">Dev Bhoomi</p>
              <p className="text-xs text-white/70">Foundation</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 m-4 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20" />
            <div>
              <p className="text-sm font-semibold">Priya Sharma</p>
              <p className="text-xs text-white/70 capitalize">{userType}</p>
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
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all text-white/80">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white dark:bg-slate-800 shadow-md px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-primary-100 dark:hover:bg-slate-700 rounded-lg"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 hover:bg-primary-100 dark:hover:bg-slate-700 rounded-lg">
              <Bell className="h-6 w-6 text-primary-900 dark:text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-primary-100 dark:hover:bg-slate-700 rounded-lg">
              <User className="h-6 w-6 text-primary-900 dark:text-white" />
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
  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-4xl font-bold text-primary-900 dark:text-white">
            Welcome back, Priya!
          </h1>
          <p className="text-primary-600 dark:text-primary-300 mt-1">
            You're on track. Keep up the great work!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-accent-600 font-semibold text-sm mb-1">
              Enrolled Courses
            </div>
            <div className="text-3xl font-bold text-primary-900 dark:text-white">5</div>
          </Card>
          <Card>
            <div className="text-accent-600 font-semibold text-sm mb-1">
              Completed
            </div>
            <div className="text-3xl font-bold text-primary-900 dark:text-white">2</div>
          </Card>
          <Card>
            <div className="text-accent-600 font-semibold text-sm mb-1">
              Learning Hours
            </div>
            <div className="text-3xl font-bold text-primary-900 dark:text-white">48h</div>
          </Card>
          <Card>
            <div className="text-accent-600 font-semibold text-sm mb-1">
              Certificates
            </div>
            <div className="text-3xl font-bold text-primary-900 dark:text-white">2</div>
          </Card>
        </div>

        {/* Active Courses */}
        <Card>
          <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-4">
            Active Courses
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-primary-200 dark:border-slate-700 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-primary-900 dark:text-white">
                    Advanced React & Next.js
                  </h3>
                  <span className="text-sm text-accent-600 font-medium">65% Complete</span>
                </div>
                <div className="w-full h-2 bg-primary-200 dark:bg-slate-700 rounded-full overflow-hidden">
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
