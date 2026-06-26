"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Home,
  LogOut,
  Sparkles,
  Users
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const menuItems = [
    { label: "Overview Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Manage Applications", href: "/admin/applications", icon: FileText },
  ];

  return (
    <div className="w-64 bg-[#0A1F2E] border-r border-[#1E3A4C] flex flex-col h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#1E3A4C] flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center text-white text-lg font-bold">
          AD
        </div>
        <div>
          <h2 className="text-sm font-black text-white">Admin Portal</h2>
          <p className="text-[10px] text-[#F97316] font-semibold uppercase tracking-wider mt-0.5">
            IMS System
          </p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all
                ${isActive
                  ? "bg-[#1E3A4C] text-[#F97316] border-l-2 border-[#F97316]"
                  : "text-slate-300 hover:bg-[#1A3347] hover:text-white"}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <div className="h-px bg-slate-800/80 my-4" />

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:bg-[#1A3347] hover:text-white transition-all"
        >
          <Home className="h-4 w-4 shrink-0" />
          Public Website
        </Link>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#1E3A4C] bg-slate-950/40 shrink-0">
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
export default AdminSidebar;
