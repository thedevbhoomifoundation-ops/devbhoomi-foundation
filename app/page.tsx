"use client";
import { useTranslation } from "react-i18next";

import React, { useMemo } from "react";
import { HeroSection } from "@/components/hero-section";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "@/components/ui";
import { toast } from "sonner";
import {
  GraduationCap,
  Heart,
  Users,
  Globe,
  Monitor,
  ArrowRight,
  Send,
  Play,
} from "lucide-react";

interface TranslatedField {
  en: string;
  hi: string;
}

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

function ImpactStatsBar() {
  const { t } = useTranslation();

  const stats = useMemo(() => [
    {
      icon: GraduationCap,
      value: "12,500+",
      label: "app.page.studentsTrained",
    },
    {
      icon: Heart,
      value: "app.page.28Cr",
      label: "app.page.donationsReceived",
    },
    {
      icon: Users,
      value: "3,200+",
      label: "app.page.activeVolunteers",
    },
    {
      icon: Globe,
      value: "150+",
      label: "app.page.communitiesImpacted",
    },
  ], []);

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-20px] md:mt-[-40px]">
      <motion.div
        className="bg-primary-950 rounded-2xl py-8 px-6 md:px-10 shadow-2xl border border-slate-800"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const displayValue = typeof stat.value === "string" ? stat.value : t(stat.value);
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
                    {displayValue}
                  </p>
                  <p className="text-sm text-white/70 font-medium mt-0.5">
                    {t(stat.label)}
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

function ProgramsSection() {
  const { t } = useTranslation();

  const programs = useMemo(() => [
    {
      icon: Monitor,
      title: "app.page.technicalEducation",
      description: "app.page.industryorientedCoursesInWe",
      color: "bg-blue-900/30 text-blue-400",
    },
    {
      icon: Globe,
      title: "app.page.communityDevelopment",
      description: "app.page.empoweringRuralCommunitiesT",
      color: "bg-green-900/30 text-green-400",
    },
    {
      icon: Users,
      title: "app.page.volunteerProgram",
      description: "app.page.aNetworkOfPassionateVolunt",
      color: "bg-purple-900/30 text-purple-400",
    },
    {
      icon: Heart,
      title: "app.page.donationCampaigns",
      description: "app.page.bringingEducationToEveryDo",
      color: "bg-red-900/30 text-red-400",
    },
  ], []);

  return (
    <section className="py-20 bg-slate-900">
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
            {t('app.page.whatWeDo')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t('app.page.ourPrograms')}
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={i}
                className="group bg-slate-800/60 rounded-2xl border border-slate-700 p-6 flex flex-col hover:shadow-xl hover:border-accent-500 transition-all duration-300"
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
                <h3 className="text-lg font-bold text-white mb-2">
                  {t(program.title)}
                </h3>
                <p className="text-sm text-primary-300 leading-relaxed flex-1">
                  {t(program.description)}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center mt-5 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors group-hover:gap-2 gap-1"
                >
                  {t('app.page.learnMore')}
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
            className="text-slate-705"
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
          <span className="text-lg font-bold text-white">
            {percent}%
          </span>
        </div>
      </div>
      <p className="text-xs font-medium text-primary-300 text-center leading-tight max-w-[100px]">
        {label}
      </p>
    </div>
  );
}

function ImpactSection() {
  const { t } = useTranslation();

  const progressData = useMemo(() => [
    { label: "app.page.educationSupport", percent: 90 },
    { label: "app.page.communityDevelopment", percent: 75 },
    { label: "app.page.skillsTraining", percent: 85 },
    { label: "app.page.volunteerEngagement", percent: 80 },
  ], []);

  const galleryImages = useMemo(() => [
    {
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
      alt: "Community outreach",
    },
    {
      src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=400&q=80",
      alt: "Volunteers in action",
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
      alt: "Teaching session",
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
      alt: "Students learning",
      hasPlay: true,
    },
  ], []);

  return (
    <section className="py-20 bg-slate-800/40">
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
              {t('app.page.ourImpact')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {t('app.page.transformingLives')}
              <span className="font-accent italic font-normal text-accent-500">{t('app.page.together')}</span>
            </h2>
            <p className="text-primary-300 leading-relaxed mt-4 mb-8 text-sm">
              {t('app.page.throughEducationCommunityEn')}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-850 hover:bg-slate-750 text-white font-semibold text-sm transition-colors shadow-lg cursor-pointer"
            >
              {t('app.page.viewImpactReport')}
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* Circular Progress Indicators */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {progressData.map((item, i) => (
                <CircularProgress
                  key={i}
                  percent={item.percent}
                  label={t(item.label)}
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
              <h3 className="text-xl font-bold text-white">
                {t('app.page.momentsOfChange')}
              </h3>
              <a
                href="/gallery"
                className="text-sm font-semibold text-accent-400 hover:text-accent-300 inline-flex items-center gap-1 cursor-pointer"
              >
                {t('app.page.viewGallery')}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-700"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
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
  const { t } = useTranslation();

  return (
    <section className="bg-primary-950 border-t border-slate-805">
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
                {t('app.page.stayConnected')}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t('app.page.getUpdatesOnOurLatestProg')}
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t('app.page.enterYourEmail')}
              className="flex-1 md:w-72 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
              required
            />
            <button
              type="submit"
              onClick={() => toast.success(t('app.page.subscribedSuccessfully'))}
              className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors shadow-lg whitespace-nowrap cursor-pointer"
            >
              {t('app.page.subscribe')}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Who We Are Section ─────────────────────── */

function WhoWeAreSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-slate-900/50">
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
                {t('app.page.whoWeAre')}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {t('app.page.empoweringLivesThrough')}<br />
                <span className="font-accent italic text-accent-500 font-normal">{t('app.page.educationTechnology')}</span>
              </h2>
            </div>

            <p className="text-primary-300 leading-relaxed text-sm">
              {t('app.page.nextgenDevbhoomiFoundationI')}
            </p>
            
            <p className="text-primary-300 leading-relaxed text-sm">
              {t('app.page.byOfferingIndustryorientedI')}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-400 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t('app.page.practicalItInternships')}</h4>
                  <p className="text-xs text-primary-300">{t('app.page.providingRealHandsonTrainin')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-400 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t('app.page.communityEmpowerment')}</h4>
                  <p className="text-xs text-primary-300">{t('app.page.bringingDigitalLiteracyAnd')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-400 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t('app.page.dedicatedMentorship')}</h4>
                  <p className="text-xs text-primary-300">{t('app.page.guidingFutureTechLeadersWi')}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-600 to-accent-400 text-white font-semibold text-sm hover:shadow-lg transition-all cursor-pointer"
              >
                {t('app.page.readOurStory')}
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border-4 border-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Collaborative learning environment"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Accent stamp / badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent-600 text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-[200px] border border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-1">{t('app.page.ourMission')}</p>
              <p className="text-sm font-semibold text-white/90 leading-tight">{t('app.page.empoweringYouthWithSkillsF')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Latest Blog Section ─────────────────────── */

function LatestBlogSection() {
  const { t } = useTranslation();

  const featuredPosts = useMemo(() => [
    {
      title: "app.page.theFutureOfTechnicalEducat",
      excerpt: "app.page.exploringHowDigitalPlatform",
      date: "app.page.may152024",
      author: "app.page.drRaviSingh",
      category: "app.page.education",
      readTime: "app.page.8MinRead",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "app.page.volunteerSpotlightMakingImp",
      excerpt: "app.page.meetThePassionateVolunteers",
      date: "app.page.may102024",
      author: "app.page.sarahJohnson",
      category: "app.page.community",
      readTime: "app.page.5MinRead",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "app.page.careerSuccessFromStudentTo",
      excerpt: "app.page.realSuccessStoriesFromOur",
      date: "app.page.may52024",
      author: "app.page.amitPatel",
      category: "app.page.careers",
      readTime: "app.page.6MinRead",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2959d43?auto=format&fit=crop&w=600&q=80",
    },
  ], []);

  return (
    <section className="py-20 bg-slate-900">
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
              {t('app.page.stayUpdated')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t('app.page.latestFromOurBlog')}
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
              className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-bold transition-all group cursor-pointer"
            >
              {t('app.page.viewAllArticles')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, i) => (
            <motion.div
              key={i}
              className="group flex flex-col bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden hover:shadow-xl hover:border-accent-500/50 transition-all duration-300"
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
                  alt={t(post.title)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-accent-600 px-2.5 py-1 rounded-full shadow-md">
                    {t(post.category)}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent-400 transition-colors">
                    <a href="/blogs">{t(post.title)}</a>
                  </h3>
                  <p className="text-sm text-primary-300 line-clamp-3 leading-relaxed">
                    {t(post.excerpt)}
                  </p>
                </div>

                <div className="border-t border-slate-700 mt-6 pt-4 flex items-center justify-between text-xs text-primary-405">
                  <span className="font-semibold">{t(post.author)}</span>
                  <div className="flex items-center gap-3">
                    <span>{t(post.date)}</span>
                    <span>•</span>
                    <span>{t(post.readTime)}</span>
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
  const { t } = useTranslation();

  const team = useMemo(() => [
    {
      name: "Dr. Rajesh Sharma",
      role: "app.page.founderCeo",
      bio: "app.page.phdInComputerScience15Yea",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Priya Verma",
      role: "app.page.headOfPrograms",
      bio: "app.page.educationSpecialistWithGras",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Amit Singh",
      role: "app.page.cto",
      bio: "app.page.fullstackDeveloperPassionate",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Sarah Williams",
      role: "app.page.communityLead",
      bio: "app.page.socialEntrepreneurBuildingR",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
  ], []);

  return (
    <Section
      title={t('app.page.ourLeadershipTeam')}
      subtitle={t('app.page.meetThePeopleDrivingOurMi')}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Card key={i} hover className="text-center p-6 flex flex-col justify-between items-center h-full bg-slate-800 border-slate-700/80">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-slate-700">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-accent-400 font-medium mb-3">{t(member.role)}</p>
                <p className="text-sm text-primary-300 leading-relaxed mb-4">{t(member.bio)}</p>
              </div>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline mt-auto cursor-pointer"
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
  const { t } = useTranslation();

  const partners = useMemo(() => [
    { name: "Graphic Era University", type: "app.page.academicPartner" },
    { name: "Uttarakhand Technical University", type: "app.page.affiliation" },
    { name: "Uttarakhand Open University", type: "app.page.academicPartner" },
    { name: "Microsoft for Startups", type: "app.page.techSupporter" },
    { name: "Google Cloud", type: "app.page.infrastructure" },
    { name: "TCS", type: "app.page.recruitingPartner" },
    { name: "Infosys", type: "app.page.recruitingPartner" },
    { name: "Wipro", type: "app.page.recruitingPartner" },
  ], []);

  return (
    <section className="py-10 bg-slate-900/50 border-t border-b border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
          {t('app.page.trustedByPartneredWithLea')}
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
                  <p className="text-sm font-bold text-white">{p.name}</p>
                  <p className="text-[10px] text-accent-400 font-semibold uppercase tracking-wider">{t(p.type)}</p>
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
                  <p className="text-sm font-bold text-white">{p.name}</p>
                  <p className="text-[10px] text-accent-400 font-semibold uppercase tracking-wider">{t(p.type)}</p>
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
  const { t } = useTranslation();
  const [donateAmount, setDonateAmount] = React.useState("1000");
  const [donateName, setDonateName] = React.useState("");
  const [donateEmail, setDonateEmail] = React.useState("");
  const [volName, setVolName] = React.useState("");
  const [volEmail, setVolEmail] = React.useState("");
  const [volInterest, setVolInterest] = React.useState("mentor");

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateName || !donateEmail || !donateAmount) {
      toast.error(t('app.page.pleaseFillInAllDonationDe'));
      return;
    }
    const loadId = toast.loading(t('app.page.simulatingSecurePaymentGate'));
    setTimeout(() => {
      toast.dismiss(loadId);
      toast.success(
        t('app.page.simulatedDonationSuccess', {
          name: donateName,
          amount: donateAmount,
          email: donateEmail,
        })
      );
      setDonateName("");
      setDonateEmail("");
    }, 2000);
  };

  const handleVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || !volEmail) {
      toast.error(t('app.page.pleaseFillInYourNameAndE'));
      return;
    }
    const loadId = toast.loading(t('app.page.submittingInterestForm'));
    setTimeout(() => {
      toast.dismiss(loadId);
      const getInterestLabel = (interest: string) => {
        switch (interest) {
          case "mentor": return t('app.page.technicalMentorInstructor');
          case "events": return t('app.page.eventCoordinator');
          case "content": return t('app.page.contentWriterSocialMedia');
          case "admin": return t('app.page.operationsOutreachSupport');
          default: return interest;
        }
      };
      toast.success(
        t('app.page.welcomeAboardVolunteerSuccess', {
          name: volName,
          interest: getInterestLabel(volInterest),
          email: volEmail,
        })
      );
      setVolName("");
      setVolEmail("");
    }, 1500);
  };

  return (
    <Section className="bg-slate-900/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Left: Quick Donation */}
        <Card className="flex flex-col justify-between border-slate-700/80 bg-slate-800">
          <form onSubmit={handleDonate} className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">{t('app.page.makeAnImpact')}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{t('app.page.supportOurCause')}</h3>
              <p className="text-sm text-primary-300 mt-2">
                {t('app.page.yourContributionDirectlySpo')}
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
                      : "bg-slate-805 border-slate-700 text-slate-200 hover:bg-slate-700/50"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t('app.page.customAmount')}</label>
                <input
                  type="number"
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(e.target.value)}
                  placeholder={t('app.page.enterCustomAmount')}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                  min="1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t('app.page.fullName')}</label>
                  <input
                    type="text"
                    value={donateName}
                    onChange={(e) => setDonateName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t('app.page.emailAddress')}</label>
                  <input
                    type="email"
                    value={donateEmail}
                    onChange={(e) => setDonateEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {t('app.page.donate')}₹{donateAmount || "0"}{t('app.page.now')}
            </button>
          </form>
        </Card>

        {/* Right: Become a Volunteer */}
        <Card className="flex flex-col justify-between border-slate-700/80 bg-slate-800">
          <form onSubmit={handleVolunteer} className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">{t('app.page.joinTheMovement')}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{t('app.page.becomeAVolunteer')}</h3>
              <p className="text-sm text-primary-300 mt-2">
                {t('app.page.shareYourTimeAndSkillsAs')}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t('app.page.fullName')}</label>
                <input
                  type="text"
                  value={volName}
                  onChange={(e) => setVolName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t('app.page.emailAddress')}</label>
                <input
                  type="email"
                  value={volEmail}
                  onChange={(e) => setVolEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t('app.page.areaOfInterest')}</label>
                <select
                  value={volInterest}
                  onChange={(e) => setVolInterest(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer shadow-inner"
                >
                  <option value="mentor">{t('app.page.technicalMentorInstructor')}</option>
                  <option value="events">{t('app.page.eventCoordinator')}</option>
                  <option value="content">{t('app.page.contentWriterSocialMedia')}</option>
                  <option value="admin">{t('app.page.operationsOutreachSupport')}</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {t('app.page.submitVolunteerApplication')}
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
}

/* ─────────────────────── Testimonials Section ─────────────────────── */

function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = useMemo(() => [
    {
      name: "Rohit Negi",
      role: "app.page.softwareEngineerAmazon",
      text: "app.page.theNextgenDevbhoomiProgram",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Anjali Rawat",
      role: "app.page.frontendEngineerRazorpay",
      text: "app.page.comingFromATier3CollegeIn",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Deepak Bhatt",
      role: "app.page.fullstackDeveloperZoho",
      text: "app.page.theLibraryAndCodingBootcam",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    },
  ], []);

  const [index, setIndex] = React.useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <Section className="bg-slate-900">
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
              {t('app.page.alumniSuccess')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {t('app.page.storiesOf')}<br />
              <span className="font-accent italic text-accent-500 font-normal">{t('app.page.realTransformation')}</span>
            </h2>
          </div>
          <p className="text-primary-300 leading-relaxed text-sm">
            {t('app.page.ourGraduatesHaveGoneFromL')}
          </p>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <h4 className="text-3xl font-extrabold text-accent-650 dark:text-accent-400 mb-1">94%</h4>
            <p className="text-sm font-bold text-white">{t('app.page.jobInternshipPlacement')}</p>
            <p className="text-xs text-primary-300 mt-1">{t('app.page.rateAchievedWithin6Months')}</p>
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
          <Card className="p-8 md:p-10 border-slate-700 min-h-[300px] flex flex-col justify-between relative overflow-hidden bg-slate-800">
            {/* Quote watermark */}
            <span className="absolute -top-10 -right-4 text-[120px] font-black text-slate-800/30 font-accent pointer-events-none select-none">
              “
            </span>

            <p className="text-base md:text-lg text-primary-200 italic leading-relaxed z-10">
              &ldquo;{t(active.text)}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-700">
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
                  <h4 className="text-sm font-bold text-white leading-none mb-1">{active.name}</h4>
                  <p className="text-xs text-accent-400 font-semibold uppercase tracking-wider">{t(active.role)}</p>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-primary-300 hover:bg-slate-750 hover:border-accent-500 hover:text-accent-400 transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-primary-300 hover:bg-slate-750 hover:border-accent-500 hover:text-accent-400 transition-all cursor-pointer"
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
  const { t } = useTranslation();

  const faqs = useMemo(() => [
    {
      q: "app.page.areDonationsToTheNextgenD",
      a: "app.page.yesNextgenDevbhoomiFoundati",
    },
    {
      q: "app.page.whoIsEligibleToApplyForT",
      a: "app.page.theProgramIsOpenToUndergr",
    },
    {
      q: "app.page.howDoesTheDigitalLibraryS",
      a: "app.page.theDigitalLibraryProvidesF",
    },
    {
      q: "app.page.canIVolunteerRemotelyOrPa",
      a: "app.page.absolutelyWeOfferFlexibleR",
    },
  ], []);

  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  };

  return (
    <Section className="bg-slate-900/40">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 mb-3">
            {t('app.page.gotQuestions')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('app.page.frequentlyAskedQuestions')}
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-slate-805 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xs hover:border-accent-500/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left font-bold text-white hover:text-accent-400 transition-colors text-base cursor-pointer"
                >
                  <span>{t(faq.q)}</span>
                  <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45 text-accent-600" : "text-primary-400"}`}>
                    +
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 px-6 text-sm text-primary-300 leading-relaxed border-t border-slate-700/50 pt-4">
                    {t(faq.a)}
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