"use client";

import { HeroSection } from "@/components/hero-section";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section, Card } from "@/components/ui";
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
      <TeamSection />
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