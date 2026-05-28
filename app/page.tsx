"use client";

import { HeroSection } from "@/components/hero-section";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Heart,
  Users,
  Globe,
  Monitor,
  UserCheck,
  ArrowRight,
  Send,
  Play,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ImpactStatsBar />
      <ProgramsSection />
      <ImpactSection />
      <NewsletterSection />
    </>
  );
}

/* ─────────────────────── SECTION 2: Impact Stats Bar ─────────────────────── */

const stats = [
  {
    icon: GraduationCap,
    value: "12,500+",
    label: "Students Trained",
  },
  {
    icon: Heart,
    value: "₹ 2.8 Cr+",
    label: "Donations Received",
  },
  {
    icon: Users,
    value: "3,200+",
    label: "Active Volunteers",
  },
  {
    icon: Globe,
    value: "150+",
    label: "Communities Impacted",
  },
];

function ImpactStatsBar() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px]">
      <motion.div
        className="bg-primary-900 dark:bg-primary-950 rounded-2xl py-8 px-6 md:px-10 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/70 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── SECTION 3: Our Programs ─────────────────────── */

const programs = [
  {
    icon: Monitor,
    title: "Technical Education",
    description:
      "Industry-oriented courses in web development, data science, and cloud computing — designed to make students job-ready from day one.",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Globe,
    title: "Community Development",
    description:
      "Empowering rural communities through digital literacy workshops, infrastructure support, and grassroots development programs.",
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  },
  {
    icon: Users,
    title: "Volunteer Program",
    description:
      "A network of passionate volunteers who mentor students, organize events, and drive meaningful change across communities.",
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Heart,
    title: "Donation Campaigns",
    description:
      "Bringing education to every doorstep through targeted fundraising campaigns that sponsor scholarships, labs, and learning materials.",
    color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  },
];

function ProgramsSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 mb-3">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-white">
            Our Programs
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={i}
                className="group bg-white dark:bg-slate-800/60 rounded-2xl border border-primary-100 dark:border-slate-700 p-6 flex flex-col hover:shadow-xl hover:border-accent-500 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ translateY: -6 }}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${program.color}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-primary-900 dark:text-white mb-2">
                  {program.title}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-300 leading-relaxed flex-1">
                  {program.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center mt-5 text-sm font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 transition-colors group-hover:gap-2 gap-1"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── SECTION 4: Impact Section ─────────────────────── */

const progressData = [
  { label: "Education Support", percent: 90 },
  { label: "Community Development", percent: 75 },
  { label: "Skills & Training Programs", percent: 85 },
  { label: "Volunteer Engagement", percent: 80 },
];

const galleryImages = [
  {
    src: "/images/gallery-community.png",
    alt: "Community outreach",
  },
  {
    src: "/images/gallery-volunteers.png",
    alt: "Volunteers in action",
  },
  {
    src: "/images/gallery-teaching.png",
    alt: "Teaching session",
  },
  {
    src: "/images/hero-students.png",
    alt: "Students learning",
    hasPlay: true,
  },
];

function CircularProgress({
  percent,
  label,
}: {
  percent: number;
  label: string;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-primary-100 dark:text-slate-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            className="text-accent-500"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-primary-900 dark:text-white">
            {percent}%
          </span>
        </div>
      </div>
      <p className="text-xs font-medium text-primary-600 dark:text-primary-300 text-center leading-tight max-w-[100px]">
        {label}
      </p>
    </div>
  );
}

function ImpactSection() {
  return (
    <section className="py-20 bg-primary-50/50 dark:bg-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 mb-3">
              Our Impact
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 dark:text-white mb-2">
              Transforming Lives{" "}
              <span className="font-accent italic font-normal">Together</span>
            </h2>
            <p className="text-primary-600 dark:text-primary-300 leading-relaxed mt-4 mb-8">
              Through education, community engagement, and targeted programs,
              we&apos;re building a future where opportunity knows no boundaries.
              Every number represents a real story of change.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary-900 dark:bg-primary-800 text-white font-semibold text-sm hover:bg-primary-800 dark:hover:bg-primary-700 transition-colors shadow-lg"
            >
              View Impact Report
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* Circular Progress Indicators */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {progressData.map((item, i) => (
                <CircularProgress
                  key={i}
                  percent={item.percent}
                  label={item.label}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column — Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-primary-900 dark:text-white">
                Moments of Change
              </h3>
              <a
                href="#"
                className="text-sm font-semibold text-accent-600 dark:text-accent-400 hover:underline inline-flex items-center gap-1"
              >
                View Gallery
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300" />
                  {/* Play button overlay */}
                  {img.hasPlay && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 dark:bg-white/80 flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <Play className="h-6 w-6 text-primary-900 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── SECTION 5: Newsletter Bar ─────────────────────── */

function NewsletterSection() {
  return (
    <section className="bg-primary-900 dark:bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left */}
          <div className="flex items-start gap-4 max-w-md">
            <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Send className="h-6 w-6 text-accent-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1" style={{width:"max-content"}}>
                Stay Connected
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Get updates on our latest programs, impact stories, and
                opportunities to make a difference.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <form className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors shadow-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
