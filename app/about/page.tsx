"use client";
import { useTranslation } from "react-i18next";

import { Section, Card } from "@/components/ui";
import { Timeline, GraduationCap, HeartPulse, Leaf, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function About() {
  return (
    <main className="pt-20">
      <HeroAbout />
      <MissionVisionSection />
      <KeyInitiativesSection />
      <TimelineSection />
      <OpportunitiesSection />
      <MembersSection />
    </main>
  );
}

function HeroAbout() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.about.page.aboutTheNextgenDevbhoomiFo')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t('app.about.page.empoweringCommunitiesThrough')}
        </p>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const { t } = useTranslation();
  return (
    <Section
      title={t('app.about.page.ourMissionVision')}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <h3 className="text-2xl font-bold text-accent-400 mb-4">
              {t('app.about.page.mission')}
            </h3>
            <p className="text-lg text-primary-200 leading-relaxed">
              {t('app.about.page.toProvideAccessibleWorldcla')}
            </p>
          </Card>
          <Card>
            <h3 className="text-2xl font-bold text-accent-400 mb-4">
              {t('app.about.page.vision')}
            </h3>
            <p className="text-lg text-primary-200 leading-relaxed">
              {t('app.about.page.aWorldWhereEveryAspiringI')}
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function KeyInitiativesSection() {
  const { t } = useTranslation();

  const initiatives = [
    {
      icon: GraduationCap,
      titleKey: "app.about.page.initEducationTitle",
      descKey: "app.about.page.initEducationDesc",
      iconClass: "text-blue-400 bg-blue-500/10",
    },
    {
      icon: HeartPulse,
      titleKey: "app.about.page.initHealthcareTitle",
      descKey: "app.about.page.initHealthcareDesc",
      iconClass: "text-red-400 bg-red-500/10",
    },
    {
      icon: Leaf,
      titleKey: "app.about.page.initEnvTitle",
      descKey: "app.about.page.initEnvDesc",
      iconClass: "text-green-400 bg-green-500/10",
    },
    {
      icon: ShieldAlert,
      titleKey: "app.about.page.initReliefTitle",
      descKey: "app.about.page.initReliefDesc",
      iconClass: "text-amber-400 bg-amber-500/10",
    },
  ];

  return (
    <Section
      title={t("app.about.page.keyInitiativesTitle")}
      subtitle={t("app.about.page.keyInitiativesSubtitle")}
      className="bg-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} hover className="flex flex-col items-center text-center p-6 h-full justify-between">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0 ${item.iconClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-primary-200 leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function TimelineSection() {
  const { t } = useTranslation();

  const timeline = [
    { 
      year: "2022", 
      title: t('app.about.page.foundationEstablished'), 
      description: t('app.about.page.startedWithAVisionAndASm') 
    },
    { 
      year: "2023", 
      title: t('app.about.page.1000Students'), 
      description: t('app.about.page.reachedOurFirstMilestoneWi') 
    },
    { 
      year: "2023", 
      title: t('app.about.page.launchVolunteerProgram'), 
      description: t('app.about.page.builtACommunityOfPassionat') 
    },
    { 
      year: "2024", 
      title: t('app.about.page.15000LivesTouched'), 
      description: t('app.about.page.expandedImpactAcrossMultipl') 
    },
  ];

  return (
    <Section
      title={t('app.about.page.ourJourney')}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-1 h-20 bg-gradient-to-b from-accent-500 to-transparent mt-2" />
                )}
              </div>
              <div className="pt-2 pb-8">
                <div className="text-2xl font-bold text-accent-400 mb-1">{item.year}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-200">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function OpportunitiesSection() {
  const { t } = useTranslation();

  const domains = [
    "app.about.page.domainWeb",
    "app.about.page.domainAI",
    "app.about.page.domainDS",
    "app.about.page.domainDM"
  ];

  return (
    <Section
      title={t("app.about.page.opportunitiesTitle")}
      subtitle={t("app.about.page.opportunitiesSubtitle")}
      className="bg-slate-800/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Card className="p-8 md:p-10 border border-accent-500/30 bg-slate-900/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent-500/5 blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <p className="text-lg text-primary-200 leading-relaxed max-w-2xl mx-auto">
              {t("app.about.page.opportunitiesDesc")}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 py-2">
              {domains.map((dom, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700/80 text-sm font-semibold text-accent-400 shadow-inner"
                >
                  {t(dom)}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="https://in.linkedin.com/jobs/view/internship-program-2026-at-nextgen-devbhoomi-foundation-4423621087"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-accent hover:bg-accent-600 text-white font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                {t("app.about.page.linkedinBtn")}
              </a>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function MembersSection() {
  const { t } = useTranslation();

  const members = [
    {
      name: "Saurav Agrawal",
      linkedin: "https://www.linkedin.com/in/agrawal-saurav",
      role: t('app.about.page.coreMember'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ashish Gulshan",
      linkedin: "https://www.linkedin.com/in/aashishgulshan",
      role: t('app.about.page.coreMember'),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Gajendra",
      linkedin: "https://www.linkedin.com/in/gajju-ary",
      role: t('app.about.page.coreMember'),
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kumar Shivam",
      linkedin: "https://www.linkedin.com/in/kumar-shivam-81a190226",
      role: t('app.about.page.coreMember'),
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ujjwal Singh",
      linkedin: "https://www.linkedin.com/in/ujjwal-kumar-1881b8153",
      role: t('app.about.page.coreMember'),
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Vikas Pandey",
      linkedin: "https://www.linkedin.com/in/vikash-kr-pandey-b34955140",
      role: t('app.about.page.coreMember'),
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Pratyush Singh",
      linkedin: "https://www.linkedin.com/in/pratyushkumarsinghse",
      role: t('app.about.page.coreMember'),
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ashutosh Gupta",
      role: t('app.about.page.contributor'),
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Shubham",
      role: t('app.about.page.contributor'),
      image: "https://images.unsplash.com/photo-1536164261511-3a17e658594a?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Shubham Gupta",
      role: t('app.about.page.contributor'),
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Mahesh Agrawal",
      role: t('app.about.page.contributor'),
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <Section
      title={t('app.about.page.ourMembersContributors')}
      subtitle={t('app.about.page.thePassionateIndividualsMak')}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {members.map((member, i) => {
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <Card key={i} hover className="text-center p-5 flex flex-col justify-between items-center h-full">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 shadow-md shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm">
                      {initials}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[11px] text-accent-400 font-medium mb-3">
                    {member.role}
                  </p>
                </div>
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0A66C2] hover:underline"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-[10px] text-primary-500 font-medium italic">
                    {t('app.about.page.community')}
                  </span>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
