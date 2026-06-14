"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Eye,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface ApplicationSummary {
  id: string;
  fullName: string;
  email: string;
  domain: string;
  appliedDate: string;
  status: string;
}

export default function AdminApplicationsTable() {
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search, filter, page params
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");
  const [sortBy, setSortBy] = useState("appliedDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        domain,
        sortBy,
        sortOrder,
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`/api/admin/applications?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await res.json();
      setApplications(data.applications);
      setTotalPages(data.pagination.pages);
      setTotalItems(data.pagination.total);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load applications list");
    } finally {
      setLoading(false);
    }
  };

  // Trigger refetch on param changes
  useEffect(() => {
    fetchApplications();
  }, [status, domain, sortBy, sortOrder, page]);

  // Handle manual submit search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchApplications();
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const getStatusBadge = (status: string) => {
    let color = "bg-slate-500/10 border-slate-500/30 text-slate-400";
    if (status === "PENDING") color = "bg-amber-500/10 border-amber-500/30 text-amber-500";
    else if (status === "UNDER_REVIEW") color = "bg-blue-500/10 border-blue-500/30 text-blue-400";
    else if (status === "SHORTLISTED") color = "bg-indigo-500/10 border-indigo-500/30 text-indigo-400";
    else if (status === "SELECTED" || status === "INTERNSHIP_ACTIVE") color = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
    else if (status === "REJECTED") color = "bg-rose-500/10 border-rose-500/30 text-rose-400";
    else if (status === "COMPLETED" || status === "CERTIFIED") color = "bg-teal-500/10 border-teal-500/30 text-teal-400";

    return (
      <span className={`px-2 py-0.5 border font-semibold rounded-full text-[9px] uppercase tracking-wide ${color}`}>
        {status.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Manage Applications</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, filter, and modify student internship requests.
        </p>
      </div>

      {/* Filter controls row */}
      <div className="p-5 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-slate-950 border border-[#1E3A4C] rounded-lg text-xs text-white focus:border-[#F97316] outline-none"
              placeholder="Search by ID, Name, Email or College..."
            />
          </div>
          <button
            type="submit"
            className="px-4 bg-[#F97316] hover:bg-[#EA6B0C] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="h-10 px-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-xs text-white focus:border-[#F97316] outline-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
            <option value="INTERNSHIP_ACTIVE">Internship Active</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {/* Domain filter */}
          <select
            value={domain}
            onChange={(e) => { setDomain(e.target.value); setPage(1); }}
            className="h-10 px-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-xs text-white focus:border-[#F97316] outline-none cursor-pointer"
          >
            <option value="">All Domains</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Data Science">Data Science</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Applications Table Card */}
      <div className="bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-2xl overflow-hidden relative min-h-[350px]">
        {loading ? (
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-[#F97316]" />
          </div>
        ) : null}

        {applications.length === 0 && !loading ? (
          <div className="text-center py-20 space-y-3">
            <AlertCircle className="h-10 w-10 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400 font-semibold">No applications matching criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A4C] bg-slate-950/40 text-slate-300 font-bold uppercase tracking-wider select-none">
                    <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort("id")}>
                      Application ID <ArrowUpDown className="inline h-3 w-3 ml-1" />
                    </th>
                    <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort("fullName")}>
                      Name <ArrowUpDown className="inline h-3 w-3 ml-1" />
                    </th>
                    <th className="p-4">Domain</th>
                    <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort("appliedDate")}>
                      Applied Date <ArrowUpDown className="inline h-3 w-3 ml-1" />
                    </th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-800/10 transition-colors">
                      <td className="p-4 font-bold text-white">{app.id}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-200">{app.fullName}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{app.email}</div>
                      </td>
                      <td className="p-4 text-slate-300 font-medium">{app.domain}</td>
                      <td className="p-4 text-slate-400">{new Date(app.appliedDate).toLocaleDateString()}</td>
                      <td className="p-4">{getStatusBadge(app.status)}</td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E3A4C] hover:bg-[#254960] text-[10px] font-bold text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 bg-slate-950/40 border-t border-[#1E3A4C] flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold">Total: {totalItems} application(s)</span>
              <div className="flex items-center gap-4">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="p-1.5 rounded-lg border border-slate-700 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-800 text-white cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-[10px] font-bold">Page {page} of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-1.5 rounded-lg border border-slate-700 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-800 text-white cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
