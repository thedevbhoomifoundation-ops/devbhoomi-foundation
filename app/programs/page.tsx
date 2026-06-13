"use client";

import React from "react";
import { Section, Card } from "@/components/ui";
import { BookOpen, Users, Heart, TrendingUp } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

export default function Programs() {
  return (
    <main className="pt-20">
      <HeroPrograms />
      <ProgramsGrid />
    </main>
  );
}

function HeroPrograms() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t({ en: "Our Programs", hi: "हमारे कार्यक्रम" })}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t({
            en: "Comprehensive learning pathways designed to empower individuals and communities",
            hi: "व्यक्तियों और समुदायों को सशक्त बनाने के लिए डिज़ाइन किए गए व्यापक शिक्षण मार्ग",
          })}
        </p>
      </div>
    </section>
  );
}

function ProgramsGrid() {
  const { t } = useLanguage();

  const programs = [
    {
      title: { en: "Technical Education Program", hi: "तकनीकी शिक्षा कार्यक्रम" },
      icon: BookOpen,
      description: {
        en: "Comprehensive courses in web development, mobile development, data science, and cloud computing.",
        hi: "वेब डेवलपमेंट, मोबाइल डेवलपमेंट, डेटा साइंस और क्लाउड कंप्यूटिंग में व्यापक पाठ्यक्रम।",
      },
      features: [
        { en: "Expert instructors", hi: "विशेषज्ञ शिक्षक" },
        { en: "Hands-on projects", hi: "व्यावहारिक परियोजनाएं" },
        { en: "Industry-relevant", hi: "उद्योग-प्रासंगिक" },
        { en: "Certificates", hi: "प्रमाण पत्र" },
      ],
      participants: { en: "8000+ participants", hi: "8000+ प्रतिभागी" },
    },
    {
      title: { en: "Mentorship Program", hi: "मेंटरशिप कार्यक्रम" },
      icon: Users,
      description: {
        en: "One-on-one guidance from industry professionals to help students navigate their career.",
        hi: "छात्रों को उनके करियर में मार्गदर्शन करने के लिए उद्योग पेशेवरों से व्यक्तिगत मार्गदर्शन।",
      },
      features: [
        { en: "Personal mentors", hi: "व्यक्तिगत मेंटर्स" },
        { en: "Career guidance", hi: "करियर मार्गदर्शन" },
        { en: "Networking", hi: "नेटवर्किंग" },
        { en: "Monthly sessions", hi: "मासिक सत्र" },
      ],
      participants: { en: "1200+ participants", hi: "1200+ प्रतिभागी" },
    },
    {
      title: { en: "Volunteer Community", hi: "स्वयंसेवक समुदाय" },
      icon: Heart,
      description: {
        en: "Join our community of change-makers and make a real impact in education and society.",
        hi: "बदलाव लाने वालों के हमारे समुदाय में शामिल हों और शिक्षा और समाज में वास्तविक प्रभाव डालें।",
      },
      features: [
        { en: "Multiple roles", hi: "कई भूमिकाएँ" },
        { en: "Flexible schedule", hi: "लचीला कार्यक्रम" },
        { en: "Recognition", hi: "मान्यता" },
        { en: "Growth opportunities", hi: "विकास के अवसर" },
      ],
      participants: { en: "2000+ participants", hi: "2000+ प्रतिभागी" },
    },
    {
      title: { en: "Scholarship Initiative", hi: "छात्रवृत्ति पहल" },
      icon: TrendingUp,
      description: {
        en: "Providing financial support to deserving students who lack resources for quality education.",
        hi: "उन योग्य छात्रों को वित्तीय सहायता प्रदान करना जिनके पास गुणवत्तापूर्ण शिक्षा के लिए संसाधनों की कमी है।",
      },
      features: [
        { en: "Full scholarships", hi: "पूर्ण छात्रवृत्ति" },
        { en: "Partial support", hi: "आंशिक सहायता" },
        { en: "Merit-based", hi: "योग्यता-आधारित" },
        { en: "Need-based", hi: "आवश्यकता-आधारित" },
      ],
      participants: { en: "3500+ participants", hi: "3500+ प्रतिभागी" },
    },
  ];

  return (
    <Section className="bg-[#071826]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <Card key={i} hover>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {t(program.title)}
                    </h3>
                    <p className="text-slate-300 mb-4">
                      {t(program.description)}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-white mb-2">
                        {t({ en: "Features:", hi: "विशेषताएँ:" })}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {program.features.map((feature, j) => (
                          <span
                            key={j}
                            className="text-xs bg-slate-800 text-white px-2 py-1 rounded"
                          >
                            {t(feature)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-accent-400">
                      {t(program.participants)}
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer">
                  {t({ en: "Learn More", hi: "अधिक जानें" })}
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
