import React from "react";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#071826] text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar header */}
        <header className="h-16 border-b border-[#1E3A4C] bg-[#0A1F2E]/95 px-6 flex items-center justify-between shrink-0">
          <span className="text-xs font-extrabold text-[#F97316] uppercase tracking-wider">
            IMS Admin Dashboard
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-semibold">
              Root Administrator
            </span>
          </div>
        </header>

        {/* Dynamic page context */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
