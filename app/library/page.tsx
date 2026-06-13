"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Filter,
  ArrowLeft,
  Sparkles,
  Inbox,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Mock Data
interface DocumentResource {
  id: string;
  title: string;
  category: string;
  type: string;
  size: string;
  description: string;
  downloadUrl: string;
  author: string;
}

const resourcesData: DocumentResource[] = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    category: "Computer Science",
    type: "PDF",
    size: "3.8 MB",
    description: "A beginner-friendly guide to coding, variables, loops, and functions in Python.",
    downloadUrl: "#",
    author: "Nextgen Tech Team",
  },
  {
    id: "2",
    title: "Class 10 Mathematics Study Guide",
    category: "Mathematics",
    type: "PDF",
    size: "5.4 MB",
    description: "Important formulas, theorems, and solved question sets for Class 10 Board preparation.",
    downloadUrl: "#",
    author: "Educator Ramesh Negi",
  },
  {
    id: "3",
    title: "Introduction to HTML & CSS",
    category: "Computer Science",
    type: "PDF",
    size: "2.1 MB",
    description: "Master the building blocks of web development. Includes practical examples and cheatsheets.",
    downloadUrl: "#",
    author: "Nextgen Tech Team",
  },
  {
    id: "4",
    title: "General Science Question Bank",
    category: "Science",
    type: "PDF",
    size: "4.7 MB",
    description: "Comprehensive physics, chemistry, and biology question bank for high school students.",
    downloadUrl: "#",
    author: "Nextgen Science Dept",
  },
  {
    id: "5",
    title: "English Grammar Handbook",
    category: "Languages",
    type: "PDF",
    size: "1.9 MB",
    description: "Essential grammar rules, usage conventions, and vocabulary building practice exercises.",
    downloadUrl: "#",
    author: "Instructor Pooja Sharma",
  },
  {
    id: "6",
    title: "Web Development Roadmap 2026",
    category: "Computer Science",
    type: "PDF",
    size: "1.2 MB",
    description: "An interactive pathway showing necessary milestones for frontend, backend, and fullstack engineering.",
    downloadUrl: "#",
    author: "Industry Advisory Council",
  },
  {
    id: "7",
    title: "Class 12 Physics Notes",
    category: "Science",
    type: "PDF",
    size: "6.2 MB",
    description: "Detailed syllabus notes covering electrostatics, electromagnetic induction, optics, and modern physics.",
    downloadUrl: "#",
    author: "Dr. S. K. Bhatt",
  },
  {
    id: "8",
    title: "Basic Digital Literacy Coursebook",
    category: "Digital Literacy",
    type: "PDF",
    size: "3.1 MB",
    description: "Fundamental digital training: operating systems, web browsing, emailing, and online safety practices.",
    downloadUrl: "#",
    author: "Literacy Committee",
  },
];

const categories = ["All", "Computer Science", "Mathematics", "Science", "Languages", "Digital Literacy"];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [requestBookTitle, setRequestBookTitle] = useState("");
  const [requestBookCategory, setRequestBookCategory] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleDownload = (title: string) => {
    toast.success(`Starting download for: ${title}`);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestBookTitle) return;
    setRequestLoading(true);
    setTimeout(() => {
      setRequestLoading(false);
      setRequestBookTitle("");
      setRequestBookCategory("");
      toast.success("Thank you! Your book/notes request has been logged. We'll look into adding it.");
    }, 1200);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 min-h-screen pb-20 pt-24">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-900 text-white py-16 dark:bg-primary-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-sm font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            Digital Library
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            Free access to textbook solutions, notes, cheat sheets, and books prepared by volunteers and educators to support your educational journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar - Filters */}
          <aside className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-primary-100 dark:border-slate-700/80 shadow-md">
            <h2 className="text-lg font-bold text-primary-900 dark:text-white flex items-center gap-2 mb-5">
              <Filter className="h-5 w-5 text-accent-500" /> Filter Resources
            </h2>
            <div className="space-y-1.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                      : "text-primary-700 dark:text-primary-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Request a Resource Box */}
            <div className="mt-8 pt-6 border-t border-primary-100 dark:border-slate-700">
              <h3 className="text-sm font-bold text-primary-900 dark:text-white flex items-center gap-1.5 mb-3">
                <HelpCircle className="h-4 w-4 text-accent-500" /> Can&apos;t find a book?
              </h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 leading-relaxed mb-4">
                Let us know what notes or reference books you need, and our community will try to find it for you!
              </p>
              <form onSubmit={handleRequestSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Book or topic title"
                  required
                  value={requestBookTitle}
                  onChange={(e) => setRequestBookTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-700 text-primary-900 dark:text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                />
                <select
                  value={requestBookCategory}
                  onChange={(e) => setRequestBookCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-700 text-primary-900 dark:text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                >
                  <option value="">Select Category (Optional)</option>
                  {categories.slice(1).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={requestLoading}
                  className="w-full text-center bg-primary-900 dark:bg-primary-850 hover:bg-primary-800 text-white font-semibold text-xs py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {requestLoading ? "Submitting..." : "Request Document"}
                </button>
              </form>
            </div>
          </aside>

          {/* Right Area - Search & Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-primary-100 dark:border-slate-700/80 shadow-md flex items-center gap-3">
              <Search className="h-5 w-5 text-primary-400 shrink-0" />
              <input
                type="text"
                placeholder="Search resources by title, description, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-primary-900 dark:text-white placeholder-primary-400 dark:placeholder-primary-500 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-primary-400 hover:text-primary-600 dark:hover:text-primary-200 font-semibold px-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Resources Grid */}
            <AnimatePresence mode="popLayout">
              {filteredResources.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredResources.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700/80 p-6 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent-500 transition-all duration-300 group"
                    >
                      <div>
                        {/* Tags */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-700 dark:text-accent-400 bg-accent-50 dark:bg-accent-950/20 px-2.5 py-1 rounded-full">
                            <Sparkles className="h-3 w-3" /> {item.category}
                          </span>
                          <span className="text-[10px] font-bold tracking-wider text-primary-400 dark:text-primary-500 uppercase flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" /> {item.type} • {item.size}
                          </span>
                        </div>

                        {/* Title & Author */}
                        <h3 className="text-lg font-bold text-primary-900 dark:text-white mb-1 leading-tight group-hover:text-accent-500 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-primary-400 dark:text-primary-500 mb-4">
                          Prepared by: <span className="font-semibold">{item.author}</span>
                        </p>

                        {/* Description */}
                        <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Download Section */}
                      <div className="mt-6 pt-4 border-t border-primary-50 dark:border-slate-700/50 flex items-center justify-between">
                        <span className="text-xs text-primary-400 dark:text-primary-500 font-medium">
                          Free License
                        </span>
                        <button
                          onClick={() => handleDownload(item.title)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-primary-900 dark:bg-slate-700 text-white rounded-xl hover:bg-accent-500 dark:hover:bg-accent-600 transition-colors shadow shadow-primary-900/10 cursor-pointer"
                        >
                          Download <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700/80 p-12 text-center shadow-md flex flex-col items-center justify-center"
                >
                  <Inbox className="h-16 w-16 text-primary-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-bold text-primary-900 dark:text-white mb-2">
                    No resources found
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 max-w-sm mb-6">
                    We couldn&apos;t find any documents matching &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Reset filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
