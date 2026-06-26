"use client";

import React, { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Calendar,
  ExternalLink,
  Download,
  Loader2,
  Clock,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/language-provider";
import { toast } from "sonner";
import Link from "next/link";

interface Application {
  id: string;
  domain: string;
  appliedDate: string;
  status: string;
  fullName: string;
  email: string;
  mobile: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  collegeName: string;
  university: string;
  degree: string;
  branch: string;
  currentYearSem: string;
  graduationYear: number;
  cgpa: string;
  skills: string[];
  programmingLanguages: string[];
  projects: string;
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  availableHours: number;
  whyJoin: string;
  documents: { id: string; type: string; url: string; fileName: string }[];
  statusHistory: { id: string; status: string; changedAt: string; comment?: string | null }[];
  idCard?: { id: string; pdfUrl: string; internId: string } | null;
  certificate?: { id: string; pdfUrl: string; certificateNumber: string } | null;
}

export function StudentDashboard({ activeTab = "applications" }: { activeTab?: "applications" | "learning" | "certificates" | "profile" | "updates" }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut } = useClerk();
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Fetch applications on load
  useEffect(() => {
    if (!userLoaded || !user) return;
    
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/internship/applications");
        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await res.json();
        setApplications(data);
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load your applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userLoaded, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 border-amber-500/30 text-amber-500";
      case "UNDER_REVIEW":
        return "bg-blue-500/10 border-blue-500/30 text-blue-500";
      case "SHORTLISTED":
        return "bg-indigo-500/10 border-indigo-500/30 text-indigo-500";
      case "SELECTED":
      case "INTERNSHIP_ACTIVE":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-500";
      case "REJECTED":
        return "bg-rose-500/10 border-rose-500/30 text-rose-500";
      case "COMPLETED":
      case "CERTIFIED":
        return "bg-teal-500/10 border-teal-500/30 text-teal-500";
      default:
        return "bg-slate-500/10 border-slate-500/30 text-slate-500";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace("_", " ");
  };

  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-[#071826] flex items-center justify-center text-slate-100">
        <Loader2 className="h-8 w-8 animate-spin text-[#F97316]" />
      </div>
    );
  }

  const initials = user?.firstName?.charAt(0).toUpperCase() || "U";
  const userRoles = (user?.publicMetadata?.roles as string[]) || ["STUDENT"];

  return (
    <div className="flex h-screen bg-[#071826] text-slate-100 overflow-hidden pt-16 md:pt-0">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#0A1F2E] border-r border-[#1E3A4C] z-40 transition-transform duration-300 lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* User Info */}
        <div className="p-6 border-b border-[#1E3A4C] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white truncate">{user?.fullName}</h2>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
              {userRoles.join(" & ")}
            </p>
          </div>
        </div>

        {/* Nav list */}
        <nav className="p-4 space-y-1">
          <Link
            href="/dashboard/applications"
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "applications" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            My Applications
          </Link>

          <Link
            href="/dashboard/learning"
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "learning" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            Learning Hub
          </Link>

          <Link
            href="/dashboard/certificates"
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "certificates" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <Award className="h-4 w-4 shrink-0" />
            Certificates & IDs
          </Link>

          <Link
            href="/dashboard/updates"
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "updates" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <Bell className="h-4 w-4 shrink-0" />
            Updates & Alerts
          </Link>

          <Link
            href="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "profile" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <User className="h-4 w-4 shrink-0" />
            My Profile
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1E3A4C] bg-slate-950/40">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden h-14 border-b border-[#1E3A4C] bg-[#0A1F2E]/95 backdrop-blur px-4 flex items-center justify-between shrink-0 absolute top-0 left-0 right-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-xs font-extrabold text-white uppercase tracking-wider">Applicant Hub</span>
          <div className="w-9 h-9 rounded-full bg-[#F97316] flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        </div>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pt-6">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#F97316]" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* TAB: APPLICATIONS */}
              {activeTab === "applications" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-white">Welcome, {user?.firstName}!</h1>
                      <p className="text-xs text-slate-400 mt-1">Track your internship records, certificate codes, and project logs.</p>
                    </div>
                    <Link
                      href="/internship/apply"
                      className="px-4 py-2.5 bg-[#F97316] hover:bg-[#EA6B0C] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer text-center md:text-left shadow-lg shadow-[#F97316]/20"
                    >
                      New Application
                    </Link>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-5 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl flex items-center justify-between shadow-xl">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Applied Programs</span>
                        <h3 className="text-2xl font-black text-white mt-1">{applications.length}</h3>
                      </div>
                      <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="p-5 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl flex items-center justify-between shadow-xl">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Internships</span>
                        <h3 className="text-2xl font-black text-emerald-400 mt-1">
                          {applications.filter((a) => a.status === "INTERNSHIP_ACTIVE").length}
                        </h3>
                      </div>
                      <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="p-5 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl flex items-center justify-between shadow-xl">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Certificates Issued</span>
                        <h3 className="text-2xl font-black text-teal-400 mt-1">
                          {applications.filter((a) => a.certificate).length}
                        </h3>
                      </div>
                      <div className="w-10 h-10 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Applications List */}
                  <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                    <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">Submitted Applications</h3>
                    
                    {applications.length === 0 ? (
                      <div className="text-center py-10 space-y-4">
                        <AlertCircle className="h-8 w-8 text-slate-500 mx-auto" />
                        <p className="text-xs text-slate-400">You haven't submitted any internship applications yet.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-[#1E3A4C] bg-slate-950/50 text-slate-300 font-bold uppercase tracking-wider">
                              <th className="p-4">Application ID</th>
                              <th className="p-4">Domain</th>
                              <th className="p-4">Applied Date</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {applications.map((app) => (
                              <tr key={app.id} className="hover:bg-slate-800/10 transition-colors">
                                <td className="p-4 font-bold text-white">{app.id}</td>
                                <td className="p-4 font-semibold text-slate-300">{app.domain}</td>
                                <td className="p-4 text-slate-400">{new Date(app.appliedDate).toLocaleDateString()}</td>
                                <td className="p-4">
                                  <span className={`px-2.5 py-1 rounded-full text-[9px] border font-bold ${getStatusColor(app.status)}`}>
                                    {getStatusLabel(app.status)}
                                  </span>
                                </td>
                                <td className="p-4 text-right">
                                  <button
                                    onClick={() => setSelectedApp(app)}
                                    className="px-3 py-1.5 bg-[#1E3A4C] hover:bg-[#254960] text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer"
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB: LEARNING HUB */}
              {activeTab === "learning" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">Learning Hub</h1>
                    <p className="text-xs text-slate-400 mt-1">Access your assigned courses, learning resources, and active internship tasks.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Courses & Tasks */}
                    <div className="space-y-6">
                      <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                        <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">Assigned Courses</h3>
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-xs font-bold text-white">Advanced React & Next.js 16</h4>
                                <p className="text-[10px] text-slate-400 mt-0.5">Assigned by Mentor • 8 Weeks</p>
                              </div>
                              <span className="px-2 py-0.5 bg-accent-500/10 border border-accent-500/20 text-accent-400 rounded-full text-[9px] font-bold">In Progress</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                              <div className="bg-[#F97316] h-full rounded-full" style={{ width: "65%" }} />
                            </div>
                            <div className="flex justify-between items-center text-[9px] text-slate-500 mt-1.5">
                              <span>65% Completed</span>
                              <span>12/18 Lessons</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-xs font-bold text-white">PostgreSQL & Prisma Integration</h4>
                                <p className="text-[10px] text-slate-400 mt-0.5">Assigned by Mentor • 4 Weeks</p>
                              </div>
                              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[9px] font-bold">Completed</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
                            </div>
                            <div className="flex justify-between items-center text-[9px] text-slate-500 mt-1.5">
                              <span>100% Completed</span>
                              <span>8/8 Lessons</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                        <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">Internship Tasks</h3>
                        <div className="space-y-3">
                          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/10 hover:bg-slate-950/30 cursor-pointer">
                            <input type="checkbox" defaultChecked className="mt-0.5 border-slate-700 bg-slate-900 rounded text-[#F97316] focus:ring-[#F97316] focus:ring-offset-0 focus:outline-none" />
                            <div>
                              <p className="text-xs font-bold text-white line-through decoration-slate-600">Phase 1: Environment Setup & Prisma Integration</p>
                              <p className="text-[9px] text-slate-500 mt-0.5">Completed: Jun 14, 2026</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/10 hover:bg-slate-950/30 cursor-pointer">
                            <input type="checkbox" defaultChecked className="mt-0.5 border-slate-700 bg-slate-900 rounded text-[#F97316] focus:ring-[#F97316] focus:ring-offset-0 focus:outline-none" />
                            <div>
                              <p className="text-xs font-bold text-white line-through decoration-slate-600">Phase 2: Refactor PDF API JSX handlers</p>
                              <p className="text-[9px] text-slate-500 mt-0.5">Completed: Jun 14, 2026</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/10 hover:bg-slate-950/30 cursor-pointer">
                            <input type="checkbox" className="mt-0.5 border-slate-700 bg-slate-900 rounded text-[#F97316] focus:ring-[#F97316] focus:ring-offset-0 focus:outline-none" />
                            <div>
                              <p className="text-xs font-bold text-white">Phase 3: Design & Implement Role-Based Bottom Navigation Bar</p>
                              <p className="text-[9px] text-slate-400 mt-0.5">Due date: In Progress</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl h-fit">
                      <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">Learning Resources</h3>
                      <div className="space-y-3">
                        <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-950/20 transition-all group">
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-[#F97316] transition-colors">Next.js 16 Documentation</p>
                            <p className="text-[9px] text-slate-500 mt-0.5">Official framework routing & rendering guides</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-[#F97316] transition-colors" />
                        </a>
                        <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-950/20 transition-all group">
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-[#F97316] transition-colors">Tailwind CSS v4 Quick Reference</p>
                            <p className="text-[9px] text-slate-500 mt-0.5">Responsive UI style system classes & variables</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-[#F97316] transition-colors" />
                        </a>
                        <a href="https://www.prisma.io/docs" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-950/20 transition-all group">
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-[#F97316] transition-colors">Prisma ORM Cheat Sheet</p>
                            <p className="text-[9px] text-slate-500 mt-0.5">Query builders, models, schema definitions</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-[#F97316] transition-colors" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB: CREDENTIALS & ID CARDS */}
              {activeTab === "certificates" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">Credentials</h1>
                    <p className="text-xs text-slate-400 mt-1">Download generated ID cards and completed program credentials.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ID Cards Section */}
                    <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                      <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">IT Internship ID Cards</h3>
                      
                      {applications.filter((a) => a.idCard).length === 0 ? (
                        <div className="text-center py-10 space-y-2">
                          <AlertCircle className="h-6 w-6 text-slate-500 mx-auto" />
                          <p className="text-xs text-slate-400">No ID cards generated yet. Standard ID cards are generated when status is marked as SELECTED.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {applications
                            .filter((a) => a.idCard)
                            .map((app) => (
                              <div key={app.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-white truncate">{app.domain}</h4>
                                  <p className="text-[10px] text-slate-400 mt-0.5">ID: {app.idCard?.internId}</p>
                                </div>
                                <a
                                  href={app.idCard?.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer inline-flex items-center gap-1 shrink-0"
                                >
                                  <Download className="h-3 w-3" />
                                  Download
                                </a>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Completion Certificates */}
                    <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                      <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">Completion Certificates</h3>
                      
                      {applications.filter((a) => a.certificate).length === 0 ? (
                        <div className="text-center py-10 space-y-2">
                          <AlertCircle className="h-6 w-6 text-slate-500 mx-auto" />
                          <p className="text-xs text-slate-400">No certificates generated yet. Verifiable certificates are issued upon successful completion.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {applications
                            .filter((a) => a.certificate)
                            .map((app) => (
                              <div key={app.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-white truncate">{app.domain}</h4>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Code: {app.certificate?.certificateNumber}</p>
                                </div>
                                <a
                                  href={app.certificate?.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-[#F97316] hover:bg-[#EA6B0C] text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer inline-flex items-center gap-1 shrink-0"
                                >
                                  <Download className="h-3 w-3" />
                                  Download
                                </a>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB: UPDATES & ALERTS */}
              {activeTab === "updates" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">Updates & Announcements</h1>
                    <p className="text-xs text-slate-400 mt-1">Stay informed about critical announcements, platform developments, and internship operations.</p>
                  </div>

                  <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                    <div className="divide-y divide-slate-850">
                      <div className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-xs font-bold text-white hover:text-[#F97316] transition-colors">Role-Based Bottom Navigation System Live</h4>
                          <span className="text-[9px] text-slate-500 bg-[#1A3347] px-2 py-0.5 rounded-full shrink-0">Today</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                          We have rolled out a dedicated role-based bottom navigation layout for all mobile users, including integrated dashboard redirects, stats, and real-time updates.
                        </p>
                      </div>

                      <div className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-xs font-bold text-white">NextGen Foundation community drive and workshop</h4>
                          <span className="text-[9px] text-slate-500 bg-[#1A3347] px-2 py-0.5 rounded-full shrink-0">3 days ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                          An community drive event has been scheduled for next Saturday. All active volunteers and students are encouraged to register and participate in the technical literacy drive.
                        </p>
                      </div>

                      <div className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-xs font-bold text-white">IT Internship Certification generation enabled</h4>
                          <span className="text-[9px] text-slate-500 bg-[#1A3347] px-2 py-0.5 rounded-full shrink-0">1 week ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                          Automatic PDF Certificate generation is now configured for completed internship applications. Download your certificates directly from the Certificates and IDs tab.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB: PROFILE & SETTINGS */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">My Profile</h1>
                    <p className="text-xs text-slate-400 mt-1">Manage your identity details, access resumes, and view account roles.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Card */}
                    <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl flex flex-col items-center text-center h-fit">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#F97316] to-[#EA6B0C] flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
                        {initials}
                      </div>
                      <h2 className="text-base font-extrabold text-white leading-snug">{user?.fullName}</h2>
                      <p className="text-xs text-slate-450 mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
                      
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {userRoles.map((role) => (
                          <span key={role} className="px-2.5 py-1 bg-accent-950/30 border border-accent-800/40 text-accent-400 rounded-full text-[9px] font-bold tracking-wider uppercase">
                            {role}
                          </span>
                        ))}
                      </div>

                      <div className="h-px bg-slate-800 w-full my-6" />

                      <button
                        onClick={() => signOut()}
                        className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout from Account
                      </button>
                    </div>

                    {/* Information Grid */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                        <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">Registration Information</h3>
                        {applications.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-slate-300">
                            <div>
                              <span className="text-slate-500 font-semibold">Full Name</span>
                              <p className="text-white font-medium mt-0.5">{applications[0].fullName}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Mobile Number</span>
                              <p className="text-white font-medium mt-0.5">{applications[0].mobile}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Gender</span>
                              <p className="text-white font-medium mt-0.5">{applications[0].gender}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Birthdate</span>
                              <p className="text-white font-medium mt-0.5">{new Date(applications[0].dateOfBirth).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Address</span>
                              <p className="text-white font-medium mt-0.5 leading-snug">{applications[0].address}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">City, State</span>
                              <p className="text-white font-medium mt-0.5">{applications[0].city}, {applications[0].state} - {applications[0].pincode}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">Complete an internship application to populate your verified profile data.</p>
                        )}
                      </div>

                      <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                        <h3 className="text-sm font-extrabold text-white mb-4 pb-2 border-b border-slate-800">Academic Credentials</h3>
                        {applications.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-slate-300">
                            <div>
                              <span className="text-slate-500 font-semibold">College / Institute</span>
                              <p className="text-white font-medium mt-0.5 leading-snug">{applications[0].collegeName}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Affiliated University</span>
                              <p className="text-white font-medium mt-0.5 leading-snug">{applications[0].university}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Degree & Major</span>
                              <p className="text-white font-medium mt-0.5">{applications[0].degree} ({applications[0].branch})</p>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Current Semester & CGPA</span>
                              <p className="text-white font-medium mt-0.5">{applications[0].currentYearSem} • {applications[0].cgpa} CGPA</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">No academic data linked yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* DETAIL MODAL / DRAWER VIEW */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0F2233] border border-[#1E3A4C] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-[#1E3A4C] bg-slate-950/40 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-sm font-extrabold text-white">Application Detail: {selectedApp.id}</h3>
                  <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[9px] border font-bold ${getStatusColor(selectedApp.status)}`}>
                    {getStatusLabel(selectedApp.status)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
                {/* 1. Track Progress timeline */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20">
                  <h4 className="text-xs font-bold text-white mb-4">Application Progress Logs</h4>
                  <div className="relative border-l border-slate-700 pl-5 space-y-5 ml-2">
                    {selectedApp.statusHistory.map((hist, idx) => (
                      <div key={hist.id} className="relative">
                        <div className={`absolute -left-[25px] top-0.5 w-3 h-3 rounded-full border border-slate-950
                          ${idx === 0 ? "bg-[#F97316]" : "bg-slate-600"}`}
                        />
                        <div className="leading-tight">
                          <p className="text-xs font-bold text-white">{getStatusLabel(hist.status)}</p>
                          <p className="text-[9px] text-slate-500 mt-0.5">{new Date(hist.changedAt).toLocaleString()}</p>
                          {hist.comment && <p className="text-[10px] text-slate-400 mt-1 italic">"{hist.comment}"</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Download Credentials Section */}
                {(selectedApp.idCard || selectedApp.certificate) && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedApp.idCard && (
                      <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
                        <p className="text-[10px] font-bold text-emerald-400">ID Card Available</p>
                        <a
                          href={selectedApp.idCard.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download ID Card
                        </a>
                      </div>
                    )}
                    {selectedApp.certificate && (
                      <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 text-center">
                        <p className="text-[10px] font-bold text-teal-400">Certificate Issued</p>
                        <a
                          href={selectedApp.certificate.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Certificate
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Applicant Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-1 uppercase tracking-wider">Submitted Form details</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 font-semibold">Full Name</p>
                      <p className="text-white mt-0.5">{selectedApp.fullName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Email</p>
                      <p className="text-white mt-0.5">{selectedApp.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Mobile</p>
                      <p className="text-white mt-0.5">{selectedApp.mobile}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Preferred Domain</p>
                      <p className="text-[#F97316] font-bold mt-0.5">{selectedApp.domain}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">College Name</p>
                      <p className="text-white mt-0.5">{selectedApp.collegeName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Degree / Branch</p>
                      <p className="text-white mt-0.5">{selectedApp.degree} in {selectedApp.branch}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-400 font-semibold">Projects</p>
                    <p className="text-white mt-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 leading-relaxed max-h-32 overflow-y-auto">{selectedApp.projects}</p>
                  </div>
                </div>

                {/* 4. Uploaded Files Links */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-1 uppercase tracking-wider">Uploaded Documents</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedApp.documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl border border-[#1E3A4C] hover:bg-[#1E3A4C]/30 text-white font-bold transition-all inline-flex items-center gap-1.5"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-[#F97316]" />
                        {doc.type}: {doc.fileName}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
