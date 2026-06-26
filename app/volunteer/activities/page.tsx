"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Calendar, Clock, MapPin, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VolunteerActivitiesPage() {
  const { user, isLoaded } = useUser();
  const name = user?.firstName || user?.fullName || "Volunteer";

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#071826] flex items-center justify-center text-slate-100">
        <div className="h-8 w-8 animate-spin border-4 border-t-transparent border-[#F97316] rounded-full" />
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-8 min-h-screen bg-[#071826] text-slate-100">
      <div className="flex items-center gap-3">
        <Link href="/volunteer" className="p-2 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Volunteer Activities</h1>
          <p className="text-xs text-slate-400 mt-1">Review your schedules, active tasks, and attendance tracking.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Active Activities */}
          <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white pb-2 border-b border-slate-800">Community Programs & Events</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white">Youth Technical Literacy Drive</h4>
                  <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-[9px] font-bold">Scheduled</span>
                </div>
                <p className="text-[11px] text-slate-400">Assisting children at the Shiv Mandir community library center to learn basic computer skills.</p>
                <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Shiv Mandir, Dew, Bihar</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> June 20, 2026</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 10:00 AM - 1:00 PM</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white">Web Dev Bootcamp TA Session</h4>
                  <span className="px-2 py-0.5 bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] rounded-full text-[9px] font-bold">Weekly Task</span>
                </div>
                <p className="text-[11px] text-slate-400">Moderating student queries, checking project submissions, and providing debugging support.</p>
                <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Online Zoom Room</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Every Wednesday</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 4:00 PM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance & Hours logged */}
        <div className="space-y-6">
          <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white pb-2 border-b border-slate-800">Attendance Log</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 border border-slate-800">
                <div>
                  <p className="text-xs font-bold text-white">Digital Library Setup</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">June 10, 2026 • 4 Hours</p>
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 border border-slate-800">
                <div>
                  <p className="text-xs font-bold text-white">Technical Seminar Mentorship</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">June 3, 2026 • 3 Hours</p>
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 border border-slate-800">
                <div>
                  <p className="text-xs font-bold text-white">Community Literacy Campaign</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">May 27, 2026 • 6 Hours</p>
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
