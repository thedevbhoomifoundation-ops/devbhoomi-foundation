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
  AlertCircle
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

export function StudentDashboard() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut } = useClerk();
  
  const [activeTab, setActiveTab] = useState<"dashboard" | "applications" | "certificates" | "settings">("dashboard");
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
          <button
            onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "dashboard" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            Dashboard Home
          </button>

          <button
            onClick={() => { setActiveTab("applications"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "applications" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            My Applications
          </button>

          <button
            onClick={() => { setActiveTab("certificates"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
              ${activeTab === "certificates" ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]" : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
          >
            <Award className="h-4 w-4 shrink-0" />
            My Certificates
          </button>
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
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === "dashboard" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">Welcome, {user?.firstName}!</h1>
                    <p className="text-xs text-slate-400 mt-1">Track your internship records, certificate codes, and project logs.</p>
                  </div>

                  {/* Summary grid */}
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

                  {/* Recent Applications card */}
                  <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                      <h3 className="text-sm font-extrabold text-white">Recent Application Status</h3>
                      <button onClick={() => setActiveTab("applications")} className="text-xs font-bold text-[#F97316] hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    {applications.length === 0 ? (
                      <div className="text-center py-10 space-y-4">
                        <AlertCircle className="h-8 w-8 text-slate-500 mx-auto" />
                        <p className="text-xs text-slate-400">You haven't submitted any internship applications yet.</p>
                        <Link
                          href="/internship"
                          className="inline-block px-5 py-2.5 bg-[#F97316] hover:bg-[#EA6B0C] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Explore Programs
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applications.slice(0, 3).map((app) => (
                          <div
                            key={app.id}
                            className="p-4 rounded-xl border border-slate-800 bg-slate-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">{app.domain} Internship</h4>
                              <p className="text-[10px] text-slate-400 mt-1">ID: <span className="font-semibold">{app.id}</span> • Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] border font-bold ${getStatusColor(app.status)}`}>
                                {getStatusLabel(app.status)}
                              </span>
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="px-3 py-1.5 bg-[#1E3A4C] hover:bg-[#254960] text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MY APPLICATIONS LIST & LOGS */}
              {activeTab === "applications" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-white">My Applications</h1>
                      <p className="text-xs text-slate-400 mt-1">Monitor the state of your application submissions.</p>
                    </div>
                    <Link
                      href="/internship"
                      className="px-4 py-2 bg-[#F97316] hover:bg-[#EA6B0C] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
                    >
                      New Application
                    </Link>
                  </div>

                  <div className="bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl overflow-hidden">
                    {applications.length === 0 ? (
                      <div className="text-center py-20">
                        <AlertCircle className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                        <p className="text-sm text-slate-400">No applications found.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-[#1E3A4C] bg-slate-950/50 text-slate-300 font-bold uppercase tracking-wider">
                              <th className="p-4">Application ID</th>
                              <th className="p-4">Program / Domain</th>
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
                                    className="px-3.5 py-1.5 bg-[#1E3A4C] hover:bg-[#254960] text-[10px] font-bold text-white rounded-lg transition-all cursor-pointer"
                                  >
                                    View
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

              {/* TAB 3: CERTIFICATES & ID CARDS */}
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
                                <div>
                                  <h4 className="text-xs font-bold text-white">{app.domain}</h4>
                                  <p className="text-[10px] text-slate-400 mt-0.5">ID: {app.idCard?.internId}</p>
                                </div>
                                <a
                                  href={app.idCard?.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
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
                                <div>
                                  <h4 className="text-xs font-bold text-white">{app.domain}</h4>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Code: {app.certificate?.certificateNumber}</p>
                                </div>
                                <a
                                  href={app.certificate?.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold text-white rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
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
                      <div className="p-4 rounded-xl border-teal-500/20 bg-teal-500/5 text-center">
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
