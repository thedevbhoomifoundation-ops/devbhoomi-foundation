"use client";

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
import { useLanguage } from "@/providers/language-provider";

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
  const { t } = useLanguage();

  const stats = useMemo(() => [
    {
      icon: GraduationCap,
      value: "12,500+",
      label: { en: "Students Trained", hi: "छात्र प्रशिक्षित" },
    },
    {
      icon: Heart,
      value: { en: "₹ 2.8 Cr+", hi: "₹ 2.8 करोड़+" },
      label: { en: "Donations Received", hi: "प्राप्त दान" },
    },
    {
      icon: Users,
      value: "3,200+",
      label: { en: "Active Volunteers", hi: "सक्रिय स्वयंसेवक" },
    },
    {
      icon: Globe,
      value: "150+",
      label: { en: "Communities Impacted", hi: "प्रभावित समुदाय" },
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
  const { t } = useLanguage();

  const programs = useMemo(() => [
    {
      icon: Monitor,
      title: { en: "Technical Education", hi: "तकनीकी शिक्षा" },
      description: {
        en: "Industry-oriented courses in web development, data science, and cloud computing — designed to make students job-ready from day one.",
        hi: "वेब विकास, डेटा विज्ञान और क्लाउड कंप्यूटिंग में उद्योग-उन्मुख पाठ्यक्रम - पहले दिन से ही छात्रों को नौकरी के लिए तैयार करने के लिए डिज़ाइन किए गए हैं।"
      },
      color: "bg-blue-900/30 text-blue-400",
    },
    {
      icon: Globe,
      title: { en: "Community Development", hi: "सामुदायिक विकास" },
      description: {
        en: "Empowering rural communities through digital literacy workshops, infrastructure support, and grassroots development programs.",
        hi: "डिजिटल साक्षरता कार्यशालाओं, बुनियादी ढांचे के समर्थन और जमीनी स्तर के विकास कार्यक्रमों के माध्यम से ग्रामीण समुदायों को सशक्त बनाना।"
      },
      color: "bg-green-900/30 text-green-400",
    },
    {
      icon: Users,
      title: { en: "Volunteer Program", hi: "स्वयंसेवक कार्यक्रम" },
      description: {
        en: "A network of passionate volunteers who mentor students, organize events, and drive meaningful change across communities.",
        hi: "उत्साही स्वयंसेवकों का एक नेटवर्क जो छात्रों को सलाह देते हैं, कार्यक्रमों का आयोजन करते हैं और समुदायों में सार्थक बदलाव लाते हैं।"
      },
      color: "bg-purple-900/30 text-purple-400",
    },
    {
      icon: Heart,
      title: { en: "Donation Campaigns", hi: "दान अभियान" },
      description: {
        en: "Bringing education to every doorstep through targeted fundraising campaigns that sponsor scholarships, labs, and learning materials.",
        hi: "लक्षित धन उगाहने वाले अभियानों के माध्यम से हर घर तक शिक्षा पहुंचाना जो छात्रवृत्ति, प्रयोगशालाओं और शिक्षण सामग्री को प्रायोजित करते हैं।"
      },
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
            {t({ en: "What We Do", hi: "हम क्या करते हैं" })}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t({ en: "Our Programs", hi: "हमारे कार्यक्रम" })}
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
                  {t({ en: "Learn More", hi: "अधिक जानें" })}
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
  const { t } = useLanguage();

  const progressData = useMemo(() => [
    { label: { en: "Education Support", hi: "शिक्षा सहायता" }, percent: 90 },
    { label: { en: "Community Development", hi: "सामुदायिक विकास" }, percent: 75 },
    { label: { en: "Skills & Training", hi: "कौशल और प्रशिक्षण" }, percent: 85 },
    { label: { en: "Volunteer Engagement", hi: "स्वयंसेवक जुड़ाव" }, percent: 80 },
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
              {t({ en: "Our Impact", hi: "हमारा प्रभाव" })}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {t({ en: "Transforming Lives ", hi: "जीवन बदलना " })}
              <span className="font-accent italic font-normal text-accent-500">{t({ en: "Together", hi: "साथ मिलकर" })}</span>
            </h2>
            <p className="text-primary-300 leading-relaxed mt-4 mb-8 text-sm">
              {t({
                en: "Through education, community engagement, and targeted programs, we're building a future where opportunity knows no boundaries. Every number represents a real story of change.",
                hi: "शिक्षा, सामुदायिक जुड़ाव और लक्षित कार्यक्रमों के माध्यम से, हम एक ऐसे भविष्य का निर्माण कर रहे हैं जहाँ अवसर की कोई सीमा नहीं होती। प्रत्येक संख्या बदलाव की एक वास्तविक कहानी का प्रतिनिधित्व करती है।"
              })}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-850 hover:bg-slate-750 text-white font-semibold text-sm transition-colors shadow-lg cursor-pointer"
            >
              {t({ en: "View Impact Report", hi: "प्रभाव रिपोर्ट देखें" })}
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
                {t({ en: "Moments of Change", hi: "बदलाव के क्षण" })}
              </h3>
              <a
                href="/gallery"
                className="text-sm font-semibold text-accent-400 hover:text-accent-300 inline-flex items-center gap-1 cursor-pointer"
              >
                {t({ en: "View Gallery", hi: "गैलरी देखें" })}
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
  const { t } = useLanguage();

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
                {t({ en: "Stay Connected", hi: "जुड़े रहें" })}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t({
                  en: "Get updates on our latest programs, impact stories, and opportunities to make a difference.",
                  hi: "हमारे नवीनतम कार्यक्रमों, प्रभाव की कहानियों और बदलाव लाने के अवसरों के बारे में अपडेट प्राप्त करें।",
                })}
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t({ en: "Enter your email", hi: "अपना ईमेल दर्ज करें" })}
              className="flex-1 md:w-72 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
              required
            />
            <button
              type="submit"
              onClick={() => toast.success(t({ en: "Subscribed successfully!", hi: "सफलतापूर्वक सदस्यता ली गई!" }))}
              className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors shadow-lg whitespace-nowrap cursor-pointer"
            >
              {t({ en: "Subscribe", hi: "सदस्यता लें" })}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Who We Are Section ─────────────────────── */

function WhoWeAreSection() {
  const { t } = useLanguage();

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
                {t({ en: "Who We Are", hi: "हम कौन हैं" })}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {t({ en: "Empowering Lives Through ", hi: "शिक्षा और प्रौद्योगिकी के माध्यम से " })}<br />
                <span className="font-accent italic text-accent-500 font-normal">{t({ en: "Education & Technology", hi: "जीवन को सशक्त बनाना" })}</span>
              </h2>
            </div>

            <p className="text-primary-300 leading-relaxed text-sm">
              {t({
                en: "Nextgen Devbhoomi Foundation is a dedicated non-profit organization focused on bridging the digital divide. We believe that modern technical education and resources should be accessible to everyone, regardless of their background or geographic location.",
                hi: "नेक्स्टजेन देवभूमि फाउंडेशन एक समर्पित गैर-लाभकारी संगठन है जो डिजिटल अंतर को पाटने पर केंद्रित है। हमारा मानना है कि आधुनिक तकनीकी शिक्षा और संसाधन सभी के लिए सुलभ होने चाहिए, चाहे उनकी पृष्ठभूमि या भौगोलिक स्थिति कुछ भी हो।"
              })}
            </p>
            
            <p className="text-primary-300 leading-relaxed text-sm">
              {t({
                en: "By offering industry-oriented IT internships, mentorship, and community programs, we strive to build a resilient, self-reliant future for students and aspiring professionals across the region.",
                hi: "उद्योग-उन्मुख आईटी इंटर्नशिप, मेंटरशिप और सामुदायिक कार्यक्रमों की पेशकश करके, हम पूरे क्षेत्र में छात्रों और महत्वाकांक्षी पेशेवरों के लिए एक लचीला, आत्मनिर्भर भविष्य बनाने का प्रयास करते हैं।"
              })}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-400 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t({ en: "Practical IT Internships", hi: "व्यावहारिक आईटी इंटर्नशिप" })}</h4>
                  <p className="text-xs text-primary-300">{t({ en: "Providing real hands-on training to make students industry-ready.", hi: "छात्रों को उद्योग के लिए तैयार करने के लिए वास्तविक व्यावहारिक प्रशिक्षण प्रदान करना।" })}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-400 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t({ en: "Community Empowerment", hi: "सामुदायिक सशक्तिकरण" })}</h4>
                  <p className="text-xs text-primary-300">{t({ en: "Bringing digital literacy and learning labs to rural classrooms.", hi: "ग्रामीण कक्षाओं में डिजिटल साक्षरता और शिक्षण प्रयोगशालाएं लाना।" })}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-6.5 h-6.5 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-400 shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t({ en: "Dedicated Mentorship", hi: "समर्पित मेंटरशिप" })}</h4>
                  <p className="text-xs text-primary-300">{t({ en: "Guiding future tech leaders with advice from seasoned experts.", hi: "अनुभवी विशेषज्ञों की सलाह के साथ भविष्य के तकनीकी नेताओं का मार्गदर्शन करना।" })}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-600 to-accent-400 text-white font-semibold text-sm hover:shadow-lg transition-all cursor-pointer"
              >
                {t({ en: "Read Our Story", hi: "हमारी कहानी पढ़ें" })}
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
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-1">{t({ en: "Our Mission", hi: "हमारा मिशन" })}</p>
              <p className="text-sm font-semibold text-white/90 leading-tight">{t({ en: "Empowering youth with skills for a digital-first world.", hi: "डिजिटल-प्रथम दुनिया के लिए कौशल के साथ युवाओं को सशक्त बनाना।" })}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Latest Blog Section ─────────────────────── */

function LatestBlogSection() {
  const { t } = useLanguage();

  const featuredPosts = useMemo(() => [
    {
      title: { en: "The Future of Technical Education in India", hi: "भारत में तकनीकी शिक्षा का भविष्य" },
      excerpt: {
        en: "Exploring how digital platforms are revolutionizing access to quality technical education in emerging markets.",
        hi: "यह तलाशना कि डिजिटल प्लेटफॉर्म किस प्रकार उभरते बाजारों में गुणवत्तापूर्ण तकनीकी शिक्षा तक पहुंच में क्रांति ला रहे हैं।"
      },
      date: { en: "May 15, 2024", hi: "15 मई, 2024" },
      author: { en: "Dr. Ravi Singh", hi: "डॉ. रवि सिंह" },
      category: { en: "Education", hi: "शिक्षा" },
      readTime: { en: "8 min read", hi: "8 मिनट का पठन" },
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: { en: "Volunteer Spotlight: Making Impact Together", hi: "स्वयंसेवक स्पॉटलाइट: मिलकर प्रभाव डालना" },
      excerpt: {
        en: "Meet the passionate volunteers driving change in our communities and transforming lives daily.",
        hi: "हमारे समुदायों में बदलाव लाने वाले और दैनिक जीवन को बदलने वाले स्वयंसेवकों से मिलें।"
      },
      date: { en: "May 10, 2024", hi: "10 मई, 2024" },
      author: { en: "Sarah Johnson", hi: "सारा जॉनसन" },
      category: { en: "Community", hi: "समुदाय" },
      readTime: { en: "5 min read", hi: "5 मिनट का पठन" },
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: { en: "Career Success: From Student to Tech Professional", hi: "करियर की सफलता: छात्र से तकनीकी पेशेवर तक" },
      excerpt: {
        en: "Real success stories from our graduates and their career journeys in the tech industry.",
        hi: "हमारे स्नातकों की वास्तविक सफलता की कहानियां और तकनीकी उद्योग में उनकी करियर यात्रा।"
      },
      date: { en: "May 5, 2024", hi: "5 मई, 2024" },
      author: { en: "Amit Patel", hi: "अमित पटेल" },
      category: { en: "Careers", hi: "करियर" },
      readTime: { en: "6 min read", hi: "6 मिनट का पठन" },
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
              {t({ en: "Stay Updated", hi: "अपडेट रहें" })}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t({ en: "Latest from Our Blog", hi: "हमारे ब्लॉग से नवीनतम" })}
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
              {t({ en: "View All Articles", hi: "सभी लेख देखें" })}
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
  const { t } = useLanguage();

  const team = useMemo(() => [
    {
      name: "Dr. Rajesh Sharma",
      role: { en: "Founder & CEO", hi: "संस्थापक और सीईओ" },
      bio: { en: "PhD in Computer Science, 15+ years in education", hi: "कंप्यूटर विज्ञान में पीएचडी, शिक्षा क्षेत्र में 15+ वर्ष" },
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Priya Verma",
      role: { en: "Head of Programs", hi: "कार्यक्रम प्रमुख" },
      bio: { en: "Education specialist with grassroots impact experience", hi: "जमीनी स्तर के प्रभाव के अनुभव के साथ शिक्षा विशेषज्ञ" },
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Amit Singh",
      role: { en: "CTO", hi: "मुख्य तकनीकी अधिकारी" },
      bio: { en: "Full-stack developer passionate about tech education", hi: "तकनीकी शिक्षा के प्रति जुनूनी फुल-स्टैक डेवलपर" },
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Sarah Williams",
      role: { en: "Community Lead", hi: "समुदाय प्रमुख" },
      bio: { en: "Social entrepreneur building resilient communities", hi: "लचीला समुदायों का निर्माण करने वाली सामाजिक उद्यमी" },
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
      linkedin: "https://linkedin.com",
    },
  ], []);

  return (
    <Section
      title={t({ en: "Our Leadership Team", hi: "हमारी नेतृत्व टीम" })}
      subtitle={t({ en: "Meet the people driving our mission", hi: "हमारे मिशन को चलाने वाले लोगों से मिलें" })}
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
  const { t } = useLanguage();

  const partners = useMemo(() => [
    { name: "Graphic Era University", type: { en: "Academic Partner", hi: "शैक्षणिक भागीदार" } },
    { name: "Uttarakhand Technical University", type: { en: "Affiliation", hi: "संबद्धता" } },
    { name: "Uttarakhand Open University", type: { en: "Academic Partner", hi: "शैक्षणिक भागीदार" } },
    { name: "Microsoft for Startups", type: { en: "Tech Supporter", hi: "तकनीकी समर्थक" } },
    { name: "Google Cloud", type: { en: "Infrastructure", hi: "बुनियादी ढांचा" } },
    { name: "TCS", type: { en: "Recruiting Partner", hi: "भर्ती भागीदार" } },
    { name: "Infosys", type: { en: "Recruiting Partner", hi: "भर्ती भागीदार" } },
    { name: "Wipro", type: { en: "Recruiting Partner", hi: "भर्ती भागीदार" } },
  ], []);

  return (
    <section className="py-10 bg-slate-900/50 border-t border-b border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
          {t({ en: "Trusted by & Partnered with Leading Institutions", hi: "अग्रणी संस्थानों द्वारा विश्वसनीय और उनके साथ भागीदारी" })}
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
  const { t } = useLanguage();
  const [donateAmount, setDonateAmount] = React.useState("1000");
  const [donateName, setDonateName] = React.useState("");
  const [donateEmail, setDonateEmail] = React.useState("");
  const [volName, setVolName] = React.useState("");
  const [volEmail, setVolEmail] = React.useState("");
  const [volInterest, setVolInterest] = React.useState("mentor");

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateName || !donateEmail || !donateAmount) {
      toast.error(t({ en: "Please fill in all donation details.", hi: "कृपया सभी दान विवरण भरें।" }));
      return;
    }
    const loadId = toast.loading(t({ en: "Simulating secure payment gateway connection...", hi: "सुरक्षित भुगतान गेटवे कनेक्शन का अनुकरण किया जा रहा है..." }));
    setTimeout(() => {
      toast.dismiss(loadId);
      toast.success(
        t({
          en: `Thank you, ${donateName}! Your simulated donation of ₹${donateAmount} was successful. (80G Receipt sent to ${donateEmail})`,
          hi: `धन्यवाद, ${donateName}! आपका ₹${donateAmount} का अनुकरणीय दान सफल रहा। (80G रसीद ${donateEmail} पर भेजी गई है)`,
        })
      );
      setDonateName("");
      setDonateEmail("");
    }, 2000);
  };

  const handleVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || !volEmail) {
      toast.error(t({ en: "Please fill in your name and email.", hi: "कृपया अपना नाम और ईमेल भरें।" }));
      return;
    }
    const loadId = toast.loading(t({ en: "Submitting interest form...", hi: "रुचि फ़ॉर्म जमा किया जा रहा है..." }));
    setTimeout(() => {
      toast.dismiss(loadId);
      toast.success(
        t({
          en: `Welcome aboard, ${volName}! We have received your application for '${volInterest}' and will reach out to ${volEmail} shortly.`,
          hi: `स्वागत है, ${volName}! हमें '${volInterest}' के लिए आपका आवेदन प्राप्त हो गया है और हम जल्द ही ${volEmail} पर आपसे संपर्क करेंगे।`,
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
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">{t({ en: "Make an Impact", hi: "प्रभाव डालें" })}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{t({ en: "Support Our Cause", hi: "हमारे उद्देश्य का समर्थन करें" })}</h3>
              <p className="text-sm text-primary-300 mt-2">
                {t({
                  en: "Your contribution directly sponsors student scholarships, internet labs, and coding materials.",
                  hi: "आपका योगदान सीधे छात्रों की छात्रवृत्ति, इंटरनेट प्रयोगशालाओं और कोडिंग सामग्रियों को प्रायोजित करता है।",
                })}
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
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t({ en: "Custom Amount (₹)", hi: "कस्टम राशि (₹)" })}</label>
                <input
                  type="number"
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(e.target.value)}
                  placeholder={t({ en: "Enter custom amount", hi: "कस्टम राशि दर्ज करें" })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                  min="1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t({ en: "Full Name", hi: "पूरा नाम" })}</label>
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
                  <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t({ en: "Email Address", hi: "ईमेल पता" })}</label>
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
              {t({ en: "Donate ", hi: "दान करें " })}₹{donateAmount || "0"}{t({ en: " Now", hi: " अभी" })}
            </button>
          </form>
        </Card>

        {/* Right: Become a Volunteer */}
        <Card className="flex flex-col justify-between border-slate-700/80 bg-slate-800">
          <form onSubmit={handleVolunteer} className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">{t({ en: "Join the Movement", hi: "आंदोलन में शामिल हों" })}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{t({ en: "Become a Volunteer", hi: "स्वयंसेवक बनें" })}</h3>
              <p className="text-sm text-primary-300 mt-2">
                {t({
                  en: "Share your time and skills as a mentor, designer, or coordinator to transform local developer talent.",
                  hi: "स्थानीय डेवलपर प्रतिभा को बदलने के लिए एक मेंटर, डिज़ाइनर या समन्वयक के रूप में अपना समय और कौशल साझा करें।",
                })}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t({ en: "Full Name", hi: "पूरा नाम" })}</label>
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
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t({ en: "Email Address", hi: "ईमेल पता" })}</label>
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
                <label className="block text-xs font-bold text-slate-350 uppercase mb-1">{t({ en: "Area of Interest", hi: "रुचि का क्षेत्र" })}</label>
                <select
                  value={volInterest}
                  onChange={(e) => setVolInterest(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer shadow-inner"
                >
                  <option value="mentor">{t({ en: "Technical Mentor & Instructor", hi: "तकनीकी मेंटर और प्रशिक्षक" })}</option>
                  <option value="events">{t({ en: "Event Coordinator", hi: "कार्यक्रम समन्वयक" })}</option>
                  <option value="content">{t({ en: "Content Writer / Social Media", hi: "सामग्री लेखक / सोशल मीडिया" })}</option>
                  <option value="admin">{t({ en: "Operations & Outreach Support", hi: "संचालन और आउटरीच सहायता" })}</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {t({ en: "Submit Volunteer Application", hi: "स्वयंसेवक आवेदन सबमिट करें" })}
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
}

/* ─────────────────────── Testimonials Section ─────────────────────── */

function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = useMemo(() => [
    {
      name: "Rohit Negi",
      role: { en: "Software Engineer @ Amazon", hi: "सॉफ्टवेयर इंजीनियर @ अमेज़न" },
      text: {
        en: "The Nextgen Devbhoomi program was the turning point of my college life. The instructors provided deep practical insights that are not taught in college classes. The DSA solver helped me crack product interviews.",
        hi: "नेक्स्टजेन देवभूमि कार्यक्रम मेरे कॉलेज जीवन का महत्वपूर्ण मोड़ था। प्रशिक्षकों ने गहरे व्यावहारिक अंतर्दृष्टि प्रदान किए जो कॉलेज की कक्षाओं में नहीं सिखाए जाते हैं। डीएसए सॉल्वर ने मुझे उत्पाद साक्षात्कारों को क्रैक करने में मदद की।"
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Anjali Rawat",
      role: { en: "Frontend Engineer @ Razorpay", hi: "फ्रंटएंड इंजीनियर @ रेज़रपे" },
      text: {
        en: "Coming from a tier-3 college in Uttarakhand, I lacked confidence and resources. Through the Devbhoomi scholarship program, I learned React, web architecture, and got mentored directly by industry experts. I landed my dream job!",
        hi: "उत्तराखंड के टियर-3 कॉलेज से होने के कारण मुझमें आत्मविश्वास और संसाधनों की कमी थी। देवभूमि छात्रवृत्ति कार्यक्रम के माध्यम से, मैंने रिएक्ट, वेब आर्किटेक्चर सीखा और उद्योग के विशेषज्ञों द्वारा सीधे मार्गदर्शन प्राप्त किया। मुझे मेरी पसंदीदा नौकरी मिल गई!"
      },
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Deepak Bhatt",
      role: { en: "Fullstack Developer @ Zoho", hi: "फुलstack डेवलपर @ जोहो" },
      text: {
        en: "The library and coding bootcamps are fully community-oriented. Working on open-source projects under a personal mentor gave me hands-on confidence. Highly recommend this foundation to all developers.",
        hi: "लाइब्रेरी और कोडिंग बूटकैंप पूरी तरह से समुदाय-उन्मुख हैं। व्यक्तिगत मेंटर के तहत ओपन-सोर्स प्रोजेक्ट्स पर काम करने से मुझे व्यावहारिक आत्मविश्वास मिला। सभी डेवलपर्स को इस फाउंडेशन की अत्यधिक सिफारिश करता हूं।"
      },
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
              {t({ en: "Alumni Success", hi: "पूर्व छात्र सफलता" })}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {t({ en: "Stories of ", hi: "वास्तविक परिवर्तन " })}<br />
              <span className="font-accent italic text-accent-500 font-normal">{t({ en: "Real Transformation", hi: "की कहानियाँ" })}</span>
            </h2>
          </div>
          <p className="text-primary-300 leading-relaxed text-sm">
            {t({
              en: "Our graduates have gone from learning basics in small villages to building production software at top global companies. Hear directly about their journeys.",
              hi: "हमारे स्नातक छोटे गांवों में बुनियादी बातें सीखने से लेकर शीर्ष वैश्विक कंपनियों में प्रोडक्शन सॉफ्टवेयर बनाने तक पहुंच गए हैं। सीधे उनकी यात्रा के बारे में सुनें।"
            })}
          </p>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <h4 className="text-3xl font-extrabold text-accent-650 dark:text-accent-400 mb-1">94%</h4>
            <p className="text-sm font-bold text-white">{t({ en: "Job & Internship Placement", hi: "नौकरी और इंटर्नशिप प्लेसमेंट" })}</p>
            <p className="text-xs text-primary-300 mt-1">{t({ en: "Rate achieved within 6 months of program graduation.", hi: "कार्यक्रम पूरा होने के 6 महीने के भीतर हासिल की गई दर।" })}</p>
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
  const { t } = useLanguage();

  const faqs = useMemo(() => [
    {
      q: {
        en: "Are donations to the Nextgen Devbhoomi Foundation tax-exempt?",
        hi: "क्या नेक्स्टजेन देवभूमि फाउंडेशन को दिया गया दान कर-मुक्त है?"
      },
      a: {
        en: "Yes, Nextgen Devbhoomi Foundation is a registered NGO under the Societies Registration Act and holds 80G tax-exemption approval. All contributions qualify for a 50% tax deduction under Section 80G of the Income Tax Act.",
        hi: "हाँ, नेक्स्टजेन देवभूमि फाउंडेशन सोसाइटीज़ रजिस्ट्रेशन एक्ट के तहत एक पंजीकृत एनजीओ है और इसके पास 80G टैक्स-छूट की मंजूरी है। आयकर अधिनियम की धारा 80G के तहत सभी योगदान 50% कर कटौती के लिए पात्र हैं।"
      },
    },
    {
      q: {
        en: "Who is eligible to apply for the IT Internship Program?",
        hi: "आईटी इंटर्नशिप कार्यक्रम के लिए आवेदन करने के लिए कौन पात्र है?"
      },
      a: {
        en: "The program is open to undergraduate and postgraduate technical students (B.Tech, BCA, MCA, BSc IT) as well as self-taught developers. We give special placement priority to students belonging to regional communities in the Himalayan foothills.",
        hi: "यह कार्यक्रम स्नातक और स्नातकोत्तर तकनीकी छात्रों (बी.टेक, बीसीए, एमसीए, बीएससी आईटी) के साथ-साथ स्व-सिखाया डेवलपर्स के लिए खुला है। हम हिमालय की तलहटी में क्षेत्रीय समुदायों के छात्रों को विशेष प्लेसमेंट प्राथमिकता देते हैं।"
      },
    },
    {
      q: {
        en: "How does the Digital Library support student learning?",
        hi: "डिजिटल लाइब्रेरी छात्र सीखने का समर्थन कैसे करती है?"
      },
      a: {
        en: "The Digital Library provides free access to curated engineering books, curriculum guides, interview reference sheets, and standard test prep materials. It is designed to save students from purchasing expensive academic resources.",
        hi: "डिजिटल लाइब्रेरी क्यूरेटेड इंजीनियरिंग पुस्तकों, पाठ्यक्रम गाइडों, साक्षात्कार संदर्भ पत्रकों और मानक परीक्षण तैयारी सामग्री तक मुफ्त पहुंच प्रदान करती है। यह छात्रों को महंगे शैक्षणिक संसाधनों को खरीदने से बचाने के लिए डिज़ाइन किया गया है।"
      },
    },
    {
      q: {
        en: "Can I volunteer remotely or part-time?",
        hi: "क्या मैं दूरस्थ रूप से या अंशकालिक रूप से स्वयंसेवा कर सकता हूँ?"
      },
      a: {
        en: "Absolutely! We offer flexible remote mentoring roles where developers guide students over online portals. Local event support is also available for regional workshops and campus ambassador activities.",
        hi: "बिल्कुल! हम लचीली रिमोट मेंटरिंग भूमिकाओं की पेशकश करते हैं जहाँ डेवलपर्स ऑनलाइन पोर्टल्स पर छात्रों का मार्गदर्शन करते हैं। क्षेत्रीय कार्यशालाओं और कैंपस एंबेसडर गतिविधियों के लिए स्थानीय कार्यक्रम सहायता भी उपलब्ध है।"
      },
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
            {t({ en: "Got Questions?", hi: "प्रश्न हैं?" })}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t({ en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" })}
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