"use client";

import React from "react";
import { HeroSection } from "@/components/hero-section";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section, Card } from "@/components/ui";
import { toast } from "sonner";
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
      <PartnersTicker />
      <ProgramsSection />
      <ActionWidgetSection />
      <ImpactSection />
      <TestimonialsSection />
      <TeamSection />
      <FaqSection />
      <LatestBlogSection />
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
    <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-20px] md:mt-[-40px]">
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
                href="/gallery"
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
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Send className="h-6 w-6 text-accent-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Stay Connected
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Get updates on our latest programs, impact stories, and
                opportunities to make a difference.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
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

/* ─────────────────────── Who We Are Section ─────────────────────── */

function WhoWeAreSection() {
  return (
    <section className="py-20 bg-primary-50/30 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 mb-3">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-white leading-tight">
                Empowering Lives Through <br />
                <span className="font-accent italic text-accent-500 font-normal">Education & Technology</span>
              </h2>
            </div>

            <p className="text-primary-600 dark:text-primary-300 leading-relaxed">
              Nextgen Devbhoomi Foundation is a dedicated non-profit organization focused on bridging the digital divide. We believe that modern technical education and resources should be accessible to everyone, regardless of their background or geographic location.
            </p>
            
            <p className="text-primary-600 dark:text-primary-300 leading-relaxed">
              By offering industry-oriented IT internships, mentorship, and community programs, we strive to build a resilient, self-reliant future for students and aspiring professionals across the region.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-600 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-primary-900 dark:text-white text-base">Practical IT Internships</h4>
                  <p className="text-sm text-primary-600 dark:text-primary-300">Providing real hands-on training to make students industry-ready.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-600 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-primary-900 dark:text-white text-base">Community Empowerment</h4>
                  <p className="text-sm text-primary-600 dark:text-primary-300">Bringing digital literacy and learning labs to rural classrooms.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-600 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-primary-900 dark:text-white text-base">Dedicated Mentorship</h4>
                  <p className="text-sm text-primary-600 dark:text-primary-300">Guiding future tech leaders with advice from seasoned experts.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-600 to-accent-400 text-white font-semibold text-sm hover:shadow-lg transition-all"
              >
                Read Our Story
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Right: Image Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white dark:border-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Collaborative learning environment"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Accent stamp / badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary-900 dark:bg-accent-600 text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-[200px]">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-400 dark:text-white mb-1">Our Mission</p>
              <p className="text-sm font-semibold text-white/90 leading-tight">Empowering youth with skills for a digital-first world.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Latest Blog Section ─────────────────────── */

const featuredPosts = [
  {
    title: "The Future of Technical Education in India",
    excerpt:
      "Exploring how digital platforms are revolutionizing access to quality technical education in emerging markets.",
    date: "May 15, 2024",
    author: "Dr. Ravi Singh",
    category: "Education",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Volunteer Spotlight: Making Impact Together",
    excerpt:
      "Meet the passionate volunteers driving change in our communities and transforming lives daily.",
    date: "May 10, 2024",
    author: "Sarah Johnson",
    category: "Community",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Career Success: From Student to Tech Professional",
    excerpt:
      "Real success stories from our graduates and their career journeys in the tech industry.",
    date: "May 5, 2024",
    author: "Amit Patel",
    category: "Careers",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2959d43?auto=format&fit=crop&w=600&q=80",
  },
];

function LatestBlogSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 mb-3">
              Stay Updated
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-white">
              Latest from Our Blog
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 md:mt-0"
          >
            <a
              href="/blogs"
              className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 font-bold transition-all group"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, i) => (
            <motion.div
              key={i}
              className="group flex flex-col bg-white dark:bg-slate-800/40 rounded-2xl border border-primary-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-accent-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ translateY: -6 }}
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-accent-600 px-2.5 py-1 rounded-full shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-primary-900 dark:text-white leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    <a href="/blogs">{post.title}</a>
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="border-t border-primary-100 dark:border-slate-700 mt-6 pt-4 flex items-center justify-between text-xs text-primary-600 dark:text-primary-400">
                  <span className="font-semibold">{post.author}</span>
                  <div className="flex items-center gap-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function TeamSection() {
  const team = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Founder & CEO",
      bio: "PhD in Computer Science, 15+ years in education",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Priya Verma",
      role: "Head of Programs",
      bio: "Education specialist with grassroots impact experience",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Amit Singh",
      role: "CTO",
      bio: "Full-stack developer passionate about tech education",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Sarah Williams",
      role: "Community Lead",
      bio: "Social entrepreneur building resilient communities",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
  ];

  return (
    <Section
      title="Our Leadership Team"
      subtitle="Meet the people driving our mission"
      className="bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Card key={i} hover className="text-center p-6 flex flex-col justify-between items-center h-full">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-primary-100 dark:border-slate-700">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-accent-600 dark:text-accent-400 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-primary-600 dark:text-primary-300 leading-relaxed mb-4">{member.bio}</p>
              </div>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline mt-auto"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Partners Ticker ─────────────────────── */

function PartnersTicker() {
  const partners = [
    { name: "Graphic Era University", type: "Academic Partner" },
    { name: "Uttarakhand Technical University", type: "Affiliation" },
    { name: "Uttarakhand Open University", type: "Academic Partner" },
    { name: "Microsoft for Startups", type: "Tech Supporter" },
    { name: "Google Cloud", type: "Infrastructure" },
    { name: "TCS", type: "Recruiting Partner" },
    { name: "Infosys", type: "Recruiting Partner" },
    { name: "Wipro", type: "Recruiting Partner" },
  ];

  return (
    <section className="py-10 bg-primary-50/20 dark:bg-slate-900/50 border-t border-b border-primary-100 dark:border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-400 dark:text-primary-500">
          Trusted by &amp; Partnered with Leading Institutions
        </p>
      </div>
      <div className="relative w-full overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* First loop */}
          <div className="flex shrink-0 items-center justify-around gap-16 min-w-full">
            {partners.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-2xl">🏫</span>
                <div>
                  <p className="text-sm font-bold text-primary-900 dark:text-white">{p.name}</p>
                  <p className="text-[10px] text-accent-500 font-semibold uppercase tracking-wider">{p.type}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Second loop (mirror) */}
          <div className="flex shrink-0 items-center justify-around gap-16 min-w-full">
            {partners.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-2xl">🏫</span>
                <div>
                  <p className="text-sm font-bold text-primary-900 dark:text-white">{p.name}</p>
                  <p className="text-[10px] text-accent-500 font-semibold uppercase tracking-wider">{p.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Action Widget Section ─────────────────────── */

function ActionWidgetSection() {
  const [donateAmount, setDonateAmount] = React.useState("1000");
  const [donateName, setDonateName] = React.useState("");
  const [donateEmail, setDonateEmail] = React.useState("");
  const [volName, setVolName] = React.useState("");
  const [volEmail, setVolEmail] = React.useState("");
  const [volInterest, setVolInterest] = React.useState("mentor");

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateName || !donateEmail || !donateAmount) {
      toast.error("Please fill in all donation details.");
      return;
    }
    const loadId = toast.loading("Simulating secure payment gateway connection...");
    setTimeout(() => {
      toast.dismiss(loadId);
      toast.success(`Thank you, ${donateName}! Your simulated donation of ₹${donateAmount} was successful. (80G Receipt sent to ${donateEmail})`);
      setDonateName("");
      setDonateEmail("");
    }, 2000);
  };

  const handleVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || !volEmail) {
      toast.error("Please fill in your name and email.");
      return;
    }
    const loadId = toast.loading("Submitting interest form...");
    setTimeout(() => {
      toast.dismiss(loadId);
      toast.success(`Welcome aboard, ${volName}! We have received your application for '${volInterest}' and will reach out to ${volEmail} shortly.`);
      setVolName("");
      setVolEmail("");
    }, 1500);
  };

  return (
    <Section className="bg-primary-50/30 dark:bg-slate-900/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Left: Quick Donation */}
        <Card className="flex flex-col justify-between border-primary-200/60 dark:border-slate-700/80">
          <form onSubmit={handleDonate} className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">Make an Impact</span>
              <h3 className="text-2xl font-bold text-primary-900 dark:text-white mt-1">Support Our Cause</h3>
              <p className="text-sm text-primary-600 dark:text-primary-300 mt-2">
                Your contribution directly sponsors student scholarships, internet labs, and coding materials.
              </p>
            </div>

            {/* Preset Amount buttons */}
            <div className="grid grid-cols-4 gap-2">
              {["500", "1000", "2500", "5000"].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDonateAmount(amt)}
                  className={`py-2 px-3 text-xs font-extrabold rounded-lg transition-all border cursor-pointer ${
                    donateAmount === amt
                      ? "bg-accent-600 border-accent-600 text-white shadow-md"
                      : "bg-white dark:bg-slate-800 border-primary-200 dark:border-slate-700 text-primary-800 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-primary-800 dark:text-slate-300 uppercase mb-1">Custom Amount (₹)</label>
                <input
                  type="number"
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full rounded-xl border border-primary-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 py-2.5 px-4 text-sm text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-accent-500"
                  min="1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-primary-800 dark:text-slate-300 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={donateName}
                    onChange={(e) => setDonateName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-primary-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 py-2.5 px-4 text-sm text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-accent-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary-800 dark:text-slate-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={donateEmail}
                    onChange={(e) => setDonateEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-primary-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 py-2.5 px-4 text-sm text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-accent-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Donate ₹{donateAmount || "0"} Now
            </button>
          </form>
        </Card>

        {/* Right: Become a Volunteer */}
        <Card className="flex flex-col justify-between border-primary-200/60 dark:border-slate-700/80">
          <form onSubmit={handleVolunteer} className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">Join the Movement</span>
              <h3 className="text-2xl font-bold text-primary-900 dark:text-white mt-1">Become a Volunteer</h3>
              <p className="text-sm text-primary-600 dark:text-primary-300 mt-2">
                Share your time and skills as a mentor, designer, or coordinator to transform local developer talent.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-primary-800 dark:text-slate-300 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={volName}
                  onChange={(e) => setVolName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-primary-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 py-2.5 px-4 text-sm text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-accent-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary-800 dark:text-slate-300 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={volEmail}
                  onChange={(e) => setVolEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-primary-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 py-2.5 px-4 text-sm text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-accent-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary-800 dark:text-slate-300 uppercase mb-1">Area of Interest</label>
                <select
                  value={volInterest}
                  onChange={(e) => setVolInterest(e.target.value)}
                  className="w-full rounded-xl border border-primary-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-4 text-sm text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="mentor">Technical Mentor &amp; Instructor</option>
                  <option value="events">Event Coordinator</option>
                  <option value="content">Content Writer / Social Media</option>
                  <option value="admin">Operations &amp; Outreach Support</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary-900 dark:bg-slate-800 hover:bg-primary-800 dark:hover:bg-slate-700 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Submit Volunteer Application
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
}

/* ─────────────────────── Testimonials Section ─────────────────────── */

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rohit Negi",
      role: "Software Engineer @ Amazon",
      text: "The Nextgen Devbhoomi program was the turning point of my college life. The instructors provided deep practical insights that are not taught in college classes. The DSA solver helped me crack product interviews.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Anjali Rawat",
      role: "Frontend Engineer @ Razorpay",
      text: "Coming from a tier-3 college in Uttarakhand, I lacked confidence and resources. Through the Devbhoomi scholarship program, I learned React, web architecture, and got mentored directly by industry experts. I landed my dream job!",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Deepak Bhatt",
      role: "Fullstack Developer @ Zoho",
      text: "The library and coding bootcamps are fully community-oriented. Working on open-source projects under a personal mentor gave me hands-on confidence. Highly recommend this foundation to all developers.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    },
  ];

  const [index, setIndex] = React.useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <Section className="bg-white dark:bg-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Left: Branding & Overview */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 space-y-6"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 mb-3">
              Alumni Success
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-white leading-tight">
              Stories of <br />
              <span className="font-accent italic text-accent-500 font-normal">Real Transformation</span>
            </h2>
          </div>
          <p className="text-primary-600 dark:text-primary-300 leading-relaxed">
            Our graduates have gone from learning basics in small villages to building production software at top global companies. Hear directly about their journeys.
          </p>
          <div className="bg-primary-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-primary-100 dark:border-slate-700">
            <h4 className="text-3xl font-extrabold text-accent-600 mb-1">94%</h4>
            <p className="text-sm font-bold text-primary-900 dark:text-white">Job &amp; Internship Placement</p>
            <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">Rate achieved within 6 months of program graduation.</p>
          </div>
        </motion.div>

        {/* Right: Interactive Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-2 relative"
        >
          <Card className="p-8 md:p-10 border-primary-100 dark:border-slate-800 min-h-[300px] flex flex-col justify-between relative overflow-hidden bg-primary-50/10 dark:bg-slate-850/50">
            {/* Quote watermark */}
            <span className="absolute -top-10 -right-4 text-[120px] font-black text-primary-200/20 dark:text-slate-800/30 font-accent pointer-events-none select-none">
              “
            </span>

            <p className="text-base md:text-lg text-primary-800 dark:text-primary-200 italic leading-relaxed z-10">
              &ldquo;{active.text}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-primary-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-900 dark:text-white leading-none mb-1">{active.name}</h4>
                  <p className="text-xs text-accent-500 font-semibold uppercase tracking-wider">{active.role}</p>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-primary-200 dark:border-slate-700 flex items-center justify-center text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:border-accent-500 hover:text-accent-600 transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-primary-200 dark:border-slate-700 flex items-center justify-center text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:border-accent-500 hover:text-accent-600 transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────── FAQ Section ─────────────────────── */

function FaqSection() {
  const faqs = [
    {
      q: "Are donations to the Nextgen Devbhoomi Foundation tax-exempt?",
      a: "Yes, Nextgen Devbhoomi Foundation is a registered NGO under the Societies Registration Act and holds 80G tax-exemption approval. All contributions qualify for a 50% tax deduction under Section 80G of the Income Tax Act.",
    },
    {
      q: "Who is eligible to apply for the IT Internship Program?",
      a: "The program is open to undergraduate and postgraduate technical students (B.Tech, BCA, MCA, BSc IT) as well as self-taught developers. We give special placement priority to students belonging to regional communities in the Himalayan foothills.",
    },
    {
      q: "How does the Digital Library support student learning?",
      a: "The Digital Library provides free access to curated engineering books, curriculum guides, interview reference sheets, and standard test prep materials. It is designed to save students from purchasing expensive academic resources.",
    },
    {
      q: "Can I volunteer remotely or part-time?",
      a: "Absolutely! We offer flexible remote mentoring roles where developers guide students over online portals. Local event support is also available for regional workshops and campus ambassador activities.",
    },
  ];

  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  };

  return (
    <Section className="bg-primary-50/20 dark:bg-slate-900/40">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 mb-3">
            Got Questions?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-white dark:bg-slate-800/40 border border-primary-100 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-xs hover:border-accent-500/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left font-bold text-primary-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400 transition-colors text-base cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45 text-accent-600" : "text-primary-400"}`}>
                    +
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 px-6 text-sm text-primary-600 dark:text-primary-300 leading-relaxed border-t border-primary-50/50 dark:border-slate-700/50 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}