"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  Users,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section, Card, Badge, Button } from "@/components/ui";

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const positionsData: Position[] = [
  {
    id: "1",
    title: "Technical Instructor (Full-Stack Web)",
    department: "Education",
    location: "Rishikesh, Uttarakhand (Hybrid)",
    type: "Full-Time",
    description: "Teach and mentor young students from underprivileged backgrounds, helping them master frontend and backend web technologies to secure jobs.",
    requirements: [
      "2+ years of software development experience (JavaScript/React/Node.js/SQL)",
      "Strong understanding of core CS concepts (databases, web protocols, REST APIs)",
      "Excellent communication and a passion for teaching and helping others grow",
      "Prior teaching, lecturing, or mentorship experience is a plus",
    ],
    responsibilities: [
      "Conduct daily interactive lectures and coding sandbox sessions",
      "Review student code submissions and provide constructive, detailed feedback",
      "Design project-based course curriculum aligned with standard tech requirements",
      "Guide students through their final capstone web app projects",
    ],
  },
  {
    id: "2",
    title: "DSA & Algorithm Mentor",
    department: "Education",
    location: "Remote (India)",
    type: "Part-Time / Volunteer",
    description: "Prepare advanced students for competitive coding and engineering interviews by explaining data structures, patterns, and complex algorithms.",
    requirements: [
      "Solid mastery of Data Structures and Algorithms (Trees, Graphs, DP, Sorting)",
      "Active profile on coding platforms (LeetCode, Codeforces, HackerRank, etc.)",
      "Strong verbal and written guidance capability to clarify algorithmic approaches",
      "Available for at least 6-8 hours per week",
    ],
    responsibilities: [
      "Conduct weekly live interactive coding sandboxes explaining key patterns",
      "Run mock interviews (technical & behavioral) and provide improvement scorecards",
      "Moderate student coding discussion channels to resolve query roadblocks",
      "Formulate practice assignment sheets targeting company interview patterns",
    ],
  },
  {
    id: "3",
    title: "Program Coordinator",
    department: "Operations",
    location: "Rishikesh, Uttarakhand (On-Site)",
    type: "Full-Time",
    description: "Oversee operations at our local Uttarakhand training centers, handle student enrollments, coordinate guest workshops, and manage logistics.",
    requirements: [
      "1+ year of experience in project coordination, community management, or operations",
      "Exceptional organizational and schedule management abilities",
      "Fluency in Hindi and English with strong interpersonal skills",
      "Empathy and dedication to rural community empowerment",
    ],
    responsibilities: [
      "Oversee day-to-day facilities management at local learning hubs",
      "Organize student outreach, intake registrations, and course completion certificates",
      "Coordinate scheduling between corporate instructors and student cohorts",
      "Generate monthly center performance reports and student retention scores",
    ],
  },
  {
    id: "4",
    title: "Community Outreach Lead",
    department: "Outreach & Growth",
    location: "Rishikesh, Uttarakhand (Hybrid)",
    type: "Full-Time / Partner",
    description: "Drive corporate sponsorship partnerships, manage digital channels, compile impact stories, and coordinate volunteer campaigns to raise support.",
    requirements: [
      "Background in digital marketing, public relations, or NGO management",
      "Excellent copywriting, presentation skills, and graphic creation comfort",
      "Familiarity with LinkedIn engagement, newsletter campaigns, and PR outreach",
      "Energetic personality comfortable networking with corporate donors",
    ],
    responsibilities: [
      "Design and execute digital outreach campaigns on LinkedIn, Instagram, and web portals",
      "Create monthly impact newsletters highlighting student success stories",
      "Pitch program models to potential corporate partners (CSR) and academic sponsors",
      "Coordinate onboarding and task assignments for our global network of volunteers",
    ],
  },
];

export default function CareersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyClick = (title: string) => {
    setSelectedRole(title);
    const formElement = document.getElementById("apply-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a position to apply for.");
      return;
    }
    setSubmitLoading(true);
    toast.loading("Submitting your application...");

    setTimeout(() => {
      setSubmitLoading(false);
      toast.dismiss();
      toast.success(`Application for '${selectedRole}' submitted successfully! We will contact you soon.`);
      setFormInputs({
        name: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
      });
      setSelectedRole("");
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 min-h-screen pb-20 pt-24">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-900 text-white py-16 dark:bg-primary-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            Join Our Team
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            Build a resilient future by empowering rural youth with technical education. Find full-time, part-time, and volunteer roles.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <Section
        title="Why Work With Us?"
        subtitle="Be part of a thriving ecosystem focused on educational inclusion and digital empowerment."
        className="bg-white dark:bg-slate-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-accent-100 dark:bg-accent-950/20 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-5 shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-2">Meaningful Impact</h3>
            <p className="text-sm text-primary-600 dark:text-primary-300 leading-relaxed">
              Your daily efforts directly help students from remote communities learn technology, crack placement interviews, and lift their families.
            </p>
          </Card>
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-2">Empowering Culture</h3>
            <p className="text-sm text-primary-600 dark:text-primary-300 leading-relaxed">
              Work alongside passionate software engineers, expert educators, and global community builders committed to positive social change.
            </p>
          </Card>
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-2">Growth & Learning</h3>
            <p className="text-sm text-primary-600 dark:text-primary-300 leading-relaxed">
              Design cutting-edge tech curriculum, build learning systems, and take absolute ownership of educational operations.
            </p>
          </Card>
        </div>
      </Section>

      {/* Open Positions Accordions */}
      <Section
        title="Open Opportunities"
        subtitle="Explore open positions and pick the one that matches your passion and skill set."
        className="bg-slate-50 dark:bg-slate-900/60"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          {positionsData.map((position) => {
            const isExpanded = expandedId === position.id;
            return (
              <motion.div
                key={position.id}
                layout
                className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700/80 shadow-sm overflow-hidden"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleExpand(position.id)}
                  className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750/20 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-accent-50 dark:bg-accent-950/20 text-accent-700 dark:text-accent-400 px-2 py-0.5 rounded">
                      {position.department}
                    </span>
                    <h3 className="text-lg font-bold text-primary-900 dark:text-white leading-tight">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-primary-500 dark:text-primary-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {position.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center self-end sm:self-center gap-2">
                    <span className="text-xs font-bold text-accent-600 dark:text-accent-400 hidden sm:inline">
                      {isExpanded ? "Show Less" : "View Details"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-primary-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary-400" />
                    )}
                  </div>
                </button>

                {/* Details Accordion Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-primary-50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/10 px-6 py-6"
                    >
                      <div className="space-y-6">
                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-650 dark:text-accent-400 mb-2">
                            Role Description
                          </h4>
                          <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">
                            {position.description}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-650 dark:text-accent-400 mb-2 flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4" /> Key Responsibilities
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-primary-700 dark:text-primary-300 space-y-1.5">
                            {position.responsibilities.map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-650 dark:text-accent-400 mb-2 flex items-center gap-1.5">
                            <GraduationCap className="h-4 w-4" /> Role Requirements
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-primary-700 dark:text-primary-300 space-y-1.5">
                            {position.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Quick Apply button */}
                        <div className="pt-4 border-t border-primary-100 dark:border-slate-800 flex justify-end">
                          <button
                            onClick={() => handleApplyClick(position.title)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-accent hover:shadow-lg text-white font-bold text-xs transition-all cursor-pointer"
                          >
                            Apply for this Role
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Application Form */}
      <section id="apply-form-section" className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <Card className="p-8 sm:p-10 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-900 dark:text-white mb-2">Job Application Form</h2>
            <p className="text-sm text-primary-600 dark:text-primary-300">
              Submit your profile details. Our hiring team will review your background and respond within 5 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formInputs.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-primary-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-850 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formInputs.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 border border-primary-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-850 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formInputs.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit phone number"
                  className="w-full px-4 py-2.5 border border-primary-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-850 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Position Applying For
                </label>
                <select
                  name="role"
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-primary-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-850 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner cursor-pointer"
                >
                  <option value="">Select a position...</option>
                  {positionsData.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                  <option value="General Volunteer">General Volunteer / Intern</option>
                </select>
              </div>
            </div>

            {/* Resume Link */}
            <div>
              <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                Resume / Portfolio URL
              </label>
              <input
                type="url"
                name="resumeUrl"
                required
                value={formInputs.resumeUrl}
                onChange={handleInputChange}
                placeholder="Google Drive, Dropbox, or LinkedIn link"
                className="w-full px-4 py-2.5 border border-primary-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-850 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                Why do you want to join us?
              </label>
              <textarea
                name="coverLetter"
                rows={5}
                required
                value={formInputs.coverLetter}
                onChange={handleInputChange}
                placeholder="Share a brief statement about your drive and how you can add value to the community..."
                className="w-full px-4 py-2.5 border border-primary-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-850 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-primary hover:shadow-lg text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitLoading ? "Submitting Application..." : (
                <>
                  Submit Application <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}
