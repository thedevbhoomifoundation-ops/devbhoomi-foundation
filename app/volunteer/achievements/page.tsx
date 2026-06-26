"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Trophy, Award, Star, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VolunteerAchievementsPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#071826] flex items-center justify-center text-slate-100">
        <div className="h-8 w-8 animate-spin border-4 border-t-transparent border-[#F97316] rounded-full" />
      </div>
    );
  }

  const badges = [
    { name: "Himalayan Leader", desc: "Mentored 10+ students", icon: Trophy, color: "text-[#F97316] bg-[#F97316]/10" },
    { name: "50+ Hours Contributor", desc: "Contributed over 50 logged hours", icon: Award, color: "text-emerald-400 bg-emerald-500/10" },
    { name: "Digital Literacy Pioneer", desc: "Assisted in community library setup", icon: Star, color: "text-blue-400 bg-blue-500/10" },
  ];

  return (
    <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-8 min-h-screen bg-[#071826] text-slate-100">
      <div className="flex items-center gap-3">
        <Link href="/volunteer" className="p-2 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Achievements & Recognition</h1>
          <p className="text-xs text-slate-400 mt-1">Review your rewards, appreciation certificates, and active badges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Grid */}
        <div className="lg:col-span-2 p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-6">
          <h3 className="text-sm font-extrabold text-white pb-2 border-b border-slate-800">Earned Recognition Badges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.name} className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${badge.color} shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificates & Appreciation Letters */}
        <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl h-fit space-y-4">
          <h3 className="text-sm font-extrabold text-white pb-2 border-b border-slate-800">Certificates of Appreciation</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">Appreciation Certificate 2026</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Issued: June 1, 2026</p>
              </div>
              <button className="p-2 bg-slate-800/65 hover:bg-[#F97316] border border-slate-700/50 hover:border-[#F97316] text-slate-350 hover:text-white rounded-xl transition-all cursor-pointer shrink-0">
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
