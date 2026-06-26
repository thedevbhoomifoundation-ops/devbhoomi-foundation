"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Loader2,
  AlertCircle,
  Clock,
  Download,
  ExternalLink,
  PlusCircle,
  FileText,
  User,
  GraduationCap,
  Sparkles,
  Heart,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface Doc {
  id: string;
  type: string;
  url: string;
  fileName: string;
}

interface StatusHistory {
  id: string;
  status: string;
  changedAt: string;
  comment?: string | null;
}

interface Note {
  id: string;
  note: string;
  createdAt: string;
  author: {
    name: string | null;
    email: string;
  };
}

interface ApplicationDetails {
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
  documents: Doc[];
  statusHistory: StatusHistory[];
  adminNotes: Note[];
  idCard?: { id: string; pdfUrl: string; internId: string } | null;
  certificate?: { id: string; pdfUrl: string; certificateNumber: string } | null;
}

export default function AdminApplicationReview() {
  const router = useRouter();
  const { id } = useParams();

  const [application, setApplication] = useState<ApplicationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  // Form states
  const [noteContent, setNoteContent] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [statusComment, setStatusComment] = useState("");

  const fetchApplicationDetails = async () => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`);
      if (!res.ok) {
        throw new Error("Application details fetch failed");
      }
      const data = await res.json();
      setApplication(data);
      setNewStatus(data.status);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchApplicationDetails();
    }
  }, [id]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setAddingNote(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: noteContent }),
      });

      if (!res.ok) {
        throw new Error("Failed to add note");
      }

      const freshNote = await res.json();
      setApplication((prev) =>
        prev
          ? {
              ...prev,
              adminNotes: [freshNote, ...prev.adminNotes],
            }
          : null
      );
      setNoteContent("");
      toast.success("Note added successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to add admin note");
    } finally {
      setAddingNote(false);
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus) return;

    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, comment: statusComment }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      toast.success(`Application status successfully updated to ${newStatus}!`);
      setStatusComment("");
      // Refetch to load updated documents/status lists
      fetchApplicationDetails();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to change application status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 border-amber-500/30 text-amber-500";
      case "UNDER_REVIEW":
        return "bg-blue-500/10 border-blue-500/30 text-blue-400";
      case "SHORTLISTED":
        return "bg-indigo-500/10 border-indigo-500/30 text-indigo-400";
      case "SELECTED":
      case "INTERNSHIP_ACTIVE":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "REJECTED":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400";
      case "COMPLETED":
      case "CERTIFIED":
        return "bg-teal-500/10 border-teal-500/30 text-teal-400";
      default:
        return "bg-slate-500/10 border-slate-500/30 text-slate-400";
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#F97316]" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-20 space-y-4">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Application Not Found</h2>
        <Link href="/admin/applications" className="inline-block px-5 py-2.5 bg-[#F97316] text-xs font-bold text-white rounded-lg hover:bg-[#EA6B0C] cursor-pointer">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Applications Table
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white">{application.fullName}</h1>
          <p className="text-xs text-slate-400 mt-1">Application ID: <span className="font-bold text-white">{application.id}</span> • Domain: {application.domain}</p>
        </div>
        <span className={`px-3.5 py-1.5 border font-bold rounded-full text-xs ${getStatusColor(application.status)}`}>
          Status: {application.status.replace("_", " ")}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Center: Application Form details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1 & 2 Info */}
          <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#F97316] uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="h-4 w-4" /> Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Full Name</span>
                  <p className="text-white mt-0.5">{application.fullName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Email Address</span>
                  <p className="text-white mt-0.5">{application.email}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Mobile Number</span>
                  <p className="text-white mt-0.5">{application.mobile}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Gender</span>
                  <p className="text-white mt-0.5">{application.gender}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Date of Birth</span>
                  <p className="text-white mt-0.5">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Pincode</span>
                  <p className="text-white mt-0.5">{application.pincode}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 font-semibold">Full Address</span>
                  <p className="text-white mt-0.5 leading-relaxed">{application.address}, {application.city}, {application.state}</p>
                </div>
              </div>
            </div>

            <hr className="border-slate-800" />

            <div>
              <h3 className="text-xs font-bold text-[#F97316] uppercase tracking-wider mb-4 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Educational Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">College Name</span>
                  <p className="text-white mt-0.5">{application.collegeName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">University</span>
                  <p className="text-white mt-0.5">{application.university}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Degree / Branch</span>
                  <p className="text-white mt-0.5">{application.degree} in {application.branch}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Current Year / Semester</span>
                  <p className="text-white mt-0.5">{application.currentYearSem}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Graduation Year</span>
                  <p className="text-white mt-0.5">{application.graduationYear}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">CGPA / Percentage</span>
                  <p className="text-white mt-0.5">{application.cgpa}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical skills */}
          <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#F97316] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Technical Skills & Profiles
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Skills / Technologies</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {application.skills.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 bg-slate-950 border border-[#1E3A4C] rounded text-[10px] text-white">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold">Programming Languages</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {application.programmingLanguages.map((l) => (
                      <span key={l} className="px-2.5 py-0.5 bg-slate-950 border border-[#1E3A4C] rounded text-[10px] text-white">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold">Projects Description</span>
                  <p className="text-white mt-1.5 bg-slate-950/40 border border-slate-800 p-3 rounded-lg leading-relaxed max-h-32 overflow-y-auto">{application.projects}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div>
                    <span className="text-slate-400 font-semibold">Portfolio</span>
                    {application.portfolioUrl ? (
                      <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-[#F97316] flex items-center gap-1 mt-1 truncate hover:underline">
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : <p className="text-slate-500 mt-1">Not provided</p>}
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">GitHub</span>
                    {application.githubUrl ? (
                      <a href={application.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#F97316] flex items-center gap-1 mt-1 truncate hover:underline">
                        GitHub <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : <p className="text-slate-500 mt-1">Not provided</p>}
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">LinkedIn</span>
                    {application.linkedinUrl ? (
                      <a href={application.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#F97316] flex items-center gap-1 mt-1 truncate hover:underline">
                        LinkedIn <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : <p className="text-slate-500 mt-1">Not provided</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences & Documents */}
          <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#F97316] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4" /> Preferences & Uploads
              </h3>
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 font-semibold">Preferred Domain</span>
                    <p className="text-[#F97316] font-bold mt-1 text-sm">{application.domain}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Weekly Availability</span>
                    <p className="text-white font-semibold mt-1">{application.availableHours} Hours / Week</p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold">Motivation to Join</span>
                  <p className="text-white mt-1.5 bg-slate-950/40 border border-slate-800 p-3 rounded-lg leading-relaxed max-h-32 overflow-y-auto">{application.whyJoin}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold mb-2 block">Submitted Documents</span>
                  <div className="flex flex-wrap gap-3">
                    {application.documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-slate-950 hover:bg-[#1E3A4C]/20 border border-[#1E3A4C] rounded-xl text-white font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-[#F97316]" />
                        {doc.type}: {doc.fileName}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Status change form, admin notes, credentials */}
        <div className="space-y-6">
          {/* Status change box */}
          <div className="p-5 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Update Status</h3>
            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-xs text-white focus:border-[#F97316] outline-none"
                  required
                >
                  <option value="PENDING">Pending</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="SHORTLISTED">Shortlist</option>
                  <option value="SELECTED">Select Candidate (Auto ID Card)</option>
                  <option value="REJECTED">Reject Candidate</option>
                  <option value="INTERNSHIP_ACTIVE">Internship Active</option>
                  <option value="COMPLETED">Complete Internship (Auto Certificate)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Comment / Log</label>
                <textarea
                  value={statusComment}
                  onChange={(e) => setStatusComment(e.target.value)}
                  rows={2}
                  className="w-full p-2 bg-slate-950 border border-[#1E3A4C] rounded-lg text-xs text-white focus:border-[#F97316] outline-none resize-none"
                  placeholder="Optional log message or comment explaining update..."
                />
              </div>

              <button
                type="submit"
                disabled={updatingStatus}
                className="w-full flex items-center justify-center gap-1.5 h-9 bg-[#F97316] hover:bg-[#EA6B0C] disabled:bg-slate-800 disabled:text-slate-500 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-[#F97316]/10"
              >
                {updatingStatus ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating Status...
                  </>
                ) : (
                  "Update & Save"
                )}
              </button>
            </form>
          </div>

          {/* Credentials Download links */}
          {(application.idCard || application.certificate) && (
            <div className="p-5 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Issued Credentials</h3>
              {application.idCard && (
                <a
                  href={application.idCard.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold rounded-xl text-xs hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <span>ID Card: {application.idCard.internId}</span>
                  <Download className="h-4 w-4 shrink-0" />
                </a>
              )}
              {application.certificate && (
                <a
                  href={application.certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 font-semibold rounded-xl text-xs hover:bg-teal-500/20 transition-all cursor-pointer"
                >
                  <span>Certificate Complete</span>
                  <Download className="h-4 w-4 shrink-0" />
                </a>
              )}
            </div>
          )}

          {/* Admin notes section */}
          <div className="p-5 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Admin Notes feed</h3>
            
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={2}
                className="w-full p-2 bg-slate-950 border border-[#1E3A4C] rounded-lg text-xs text-white focus:border-[#F97316] outline-none resize-none"
                placeholder="Write an internal admin note..."
                required
              />
              <button
                type="submit"
                disabled={addingNote}
                className="w-full flex items-center justify-center gap-1.5 h-8 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {addingNote ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <PlusCircle className="h-3.5 w-3.5" />}
                Add Note
              </button>
            </form>

            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {application.adminNotes.length === 0 ? (
                <p className="text-[10px] text-slate-500 text-center py-4 italic">No internal notes added yet.</p>
              ) : (
                application.adminNotes.map((note) => (
                  <div key={note.id} className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-[10px] leading-relaxed">
                    <p className="text-white">{note.note}</p>
                    <div className="flex justify-between items-center mt-1 text-[8px] text-slate-500 font-semibold uppercase">
                      <span>{note.author.name || "Admin"}</span>
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
