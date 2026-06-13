"use client";
import { useTranslation } from "react-i18next";

import React from "react";
import { Section, Card } from "@/components/ui";
import { BookOpen, Users, Heart, TrendingUp } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function Programs() {
  return (
    <main className="pt-20">
      <HeroPrograms />
      <ProgramsGrid />
    </main>
  );
}

function HeroPrograms() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.programs.page.ourPrograms')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t('app.programs.page.comprehensiveLearningPathway')}
        </p>
      </div>
    </section>
  );
}

function ProgramsGrid() {
  const { t } = useTranslation();

  const programs = [
    {
      title: "app.programs.page.technicalEducationProgram",
      icon: BookOpen,
      description: "app.programs.page.comprehensiveCoursesInWebD",
      features: [
        "app.programs.page.expertInstructors",
        "app.programs.page.handsonProjects",
        "app.programs.page.industryrelevant",
        "app.programs.page.certificates",
      ],
      participants: "app.programs.page.8000Participants",
    },
    {
      title: "app.programs.page.mentorshipProgram",
      icon: Users,
      description: "app.programs.page.oneononeGuidanceFromIndustr",
      features: [
        "app.programs.page.personalMentors",
        "app.programs.page.careerGuidance",
        "app.programs.page.networking",
        "app.programs.page.monthlySessions",
      ],
      participants: "app.programs.page.1200Participants",
    },
    {
      title: "app.programs.page.volunteerCommunity",
      icon: Heart,
      description: "app.programs.page.joinOurCommunityOfChangema",
      features: [
        "app.programs.page.multipleRoles",
        "app.programs.page.flexibleSchedule",
        "app.programs.page.recognition",
        "app.programs.page.growthOpportunities",
      ],
      participants: "app.programs.page.2000Participants",
    },
    {
      title: "app.programs.page.scholarshipInitiative",
      icon: TrendingUp,
      description: "app.programs.page.providingFinancialSupportTo",
      features: [
        "app.programs.page.fullScholarships",
        "app.programs.page.partialSupport",
        "app.programs.page.meritbased",
        "app.programs.page.needbased",
      ],
      participants: "app.programs.page.3500Participants",
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
                        {t('app.programs.page.features')}
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
                  {t('app.programs.page.learnMore')}
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
