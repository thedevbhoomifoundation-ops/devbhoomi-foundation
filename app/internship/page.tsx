"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Layers,
  BarChart3,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Users,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const tracks = [
  {
    icon: Code2,
    name: "Web Development",
    description: "Learn Next.js, React, Node.js, and Prisma. Build robust, scalable web applications.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30"
  },
  {
    icon: Layers,
    name: "Mobile Development",
    description: "Master React Native and Expo. Create native iOS and Android experiences with shared codebase.",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30"
  },
  {
    icon: Sparkles,
    name: "UI/UX Design",
    description: "Learn user research, wireframing, high-fidelity UI design in Figma, and micro-interactions.",
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30"
  },
  {
    icon: BarChart3,
    name: "Data Science",
    description: "Analyze datasets, build pipelines, run statistical analysis, and clean real-world data with Python.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30"
  },
  {
    icon: Cpu,
    name: "AI / Machine Learning",
    description: "Train models, implement NLP and computer vision using PyTorch, TensorFlow, and Gemini APIs.",
    color: "from-indigo-500/20 to-violet-500/20",
    border: "border-indigo-500/30"
  },
  {
    icon: Users,
    name: "Digital Marketing",
    description: "Master SEO, social media growth hacks, email marketing, analytics, and content planning strategies.",
    color: "from-rose-500/20 to-red-500/20",
    border: "border-rose-500/30"
  }
];

const timelineSteps = [
  {
    step: "01",
    title: "Online Application",
    desc: "Submit your details, background information, skill set, and upload your resume."
  },
  {
    step: "02",
    title: "Resume Screening",
    desc: "Our volunteers evaluate candidate profiles and shortlist applications based on projects and drive."
  },
  {
    step: "03",
    title: "Interview / Task",
    desc: "Shortlisted candidates complete a small project assignment or technical interview session."
  },
  {
    step: "04",
    title: "Selection & ID Card",
    desc: "Get your official selection letter and generated Internship ID Card automatically from the system."
  },
  {
    step: "05",
    title: "Active Internship",
    desc: "Work on live real-world projects with dedicated mentors, weekly checkins, and workshops."
  },
  {
    step: "06",
    title: "Certification",
    desc: "Upon successful project delivery and review, download your verified, QR-coded Completion Certificate."
  }
];

const faqs = [
  {
    q: "What is the duration of the internship?",
    a: "Standard internship cohorts last for 8 to 12 weeks. We offer flexible options depending on the domain and participant's availability."
  },
  {
    q: "Is this a remote or onsite internship?",
    a: "We offer both hybrid (in Bihar regional centers) and fully remote tracks depending on your choice during the application flow."
  },
  {
    q: "Are there any application fees or charges?",
    a: "No, the internship program is completely free of charge. We support learning for students of all backgrounds."
  },
  {
    q: "Will I get a certificate upon completion?",
    a: "Yes, you will receive an official verifiable Completion Certificate with a secure QR code which can be scanned for validation."
  },
  {
    q: "What are the eligibility criteria?",
    a: "Any student currently studying B.Tech, BCA, MCA, BSc IT, or self-taught developers with strong passion and intermediate coding skills."
  }
];

export default function InternshipProgramPage() {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#071826] text-slate-100 pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 md:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,138,31,0.08),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-[#F97316] text-[13px] font-bold mb-6"
          >
            <Sparkles className="h-4 w-4" />
            Empowering Next-Gen Technical Talent
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6"
          >
            Transform Your Skills with our <br />
            <span className="bg-gradient-to-r from-[#F97316] to-[#E58A1F] bg-clip-text text-transparent">
              IT Internship Program
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Gain hands-on experience by building actual web apps, learning core software standards, and receiving personal mentorship from tech industry experts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/internship/apply"
              className="px-8 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA6B0C] text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Apply for Internship
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#tracks"
              className="px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/80 text-white text-sm font-bold transition-all duration-200 flex items-center justify-center"
            >
              Explore Tracks
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto pt-10 border-t border-slate-800/60">
            <div className="text-center">
              <h3 className="text-3xl font-black text-white">8-12</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Weeks Duration</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-[#F97316]">100%</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Free Program</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-white">6+</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Domain Tracks</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-[#F97316]">QR</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Verifiable Certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Why Join Our Program?</h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
            Get structural training designed by developers to help you build solid career fundamentals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-[#0F2233] border border-[#1E3A4C] hover:border-accent-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#F97316] mb-5">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real-world Projects</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No toy sandbox assignments. You'll contribute to open-source systems, community helper tools, and non-profit websites.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F2233] border border-[#1E3A4C] hover:border-accent-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#F97316] mb-5">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dedicated Mentorship</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get direct guidance from senior engineers. Weekly project reviews and feedback sessions resolve your structural doubts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F2233] border border-[#1E3A4C] hover:border-accent-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#F97316] mb-5">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Verifiable Credentials</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Receive a secure ID Card when selected, and download a unique QR-code verified certificate once you successfully finish.
            </p>
          </div>
        </div>
      </section>

      {/* Available Tracks */}
      <section id="tracks" className="py-20 bg-[#0A1F2E] border-y border-slate-800 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Choose Your Track</h2>
            <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
              Select a domain matching your interest area and master specialized technical stacks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.name}
                className={`p-6 rounded-2xl bg-gradient-to-br ${track.color} border ${track.border} hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-white mb-4">
                    <track.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{track.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{track.description}</p>
                </div>
                <div className="mt-6">
                  <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider">Active Track</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Timeline */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-5">Eligibility Criteria</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>Academic:</strong> Open to technical course students (B.Tech, BCA, MCA, BSc IT, or related degrees).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>Self-Taught:</strong> Enthusiastic self-taught coders with solid baseline project files are welcome.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>Availability:</strong> Able to commit at least 15-20 hours per week for project tasks and checkins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>Special Priority:</strong> Students residing in regional regions of Bihar receive priority slots.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-2xl bg-[#0F2233] border border-[#1E3A4C] text-center">
            <Calendar className="h-12 w-12 text-[#F97316] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ongoing Enrollment</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed mb-6">
              Applications are reviewed on a rolling basis. Apply today and start in the upcoming monthly batch.
            </p>
            <Link
              href="/internship/apply"
              className="inline-block px-6 py-2.5 rounded-lg bg-[#F97316] hover:bg-[#EA6B0C] text-white text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              Start Application
            </Link>
          </div>
        </div>

        {/* Timeline Flow */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white">Application & Program Timeline</h2>
            <p className="text-slate-400 mt-2 text-sm max-w-sm mx-auto">
              Follow these simple steps from registry to certificate downloads.
            </p>
          </div>

          <div className="relative border-l-2 border-[#1E3A4C] ml-4 md:ml-32 space-y-12">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10">
                {/* Stepper Dot */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#071826] border-2 border-[#F97316] flex items-center justify-center text-xs font-bold text-[#F97316] shadow-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#0A1F2E] border-t border-slate-800 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white">Got Questions? FAQs</h2>
            <p className="text-slate-400 mt-2 text-sm max-w-xs mx-auto">
              Quick replies to standard student enquiries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#1E3A4C] bg-[#0F2233] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:bg-slate-800/40 focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-[#F97316] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 text-center px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.06),transparent_50%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Ready to Build Your Career?
          </h2>
          <p className="text-slate-300 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Fill the multi-step application form and jump-start your technical education journey. Our admins and coordinators are waiting for your request.
          </p>
          <Link
            href="/internship/apply"
            className="inline-flex px-8 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA6B0C] text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-[#F97316]/20 cursor-pointer"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
