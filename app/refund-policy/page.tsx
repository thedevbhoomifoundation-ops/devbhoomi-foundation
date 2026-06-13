"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RotateCcw, Gift, BookOpen, Clock, Mail, Sparkles } from "lucide-react";

import { Section, Card } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface RefundSectionType {
  id: string;
  titleKey: string;
  contentKey: string;
}

const sections: RefundSectionType[] = [
  {
    id: "intro",
    titleKey: "app.refund.sections.intro.title",
    contentKey: "app.refund.sections.intro.content",
  },
  {
    id: "donations",
    titleKey: "app.refund.sections.donations.title",
    contentKey: "app.refund.sections.donations.content",
  },
  {
    id: "courses",
    titleKey: "app.refund.sections.courses.title",
    contentKey: "app.refund.sections.courses.content",
  },
  {
    id: "events",
    titleKey: "app.refund.sections.events.title",
    contentKey: "app.refund.sections.events.content",
  },
  {
    id: "request",
    titleKey: "app.refund.sections.request.title",
    contentKey: "app.refund.sections.request.content",
  },
  {
    id: "processing",
    titleKey: "app.refund.sections.processing.title",
    contentKey: "app.refund.sections.processing.content",
  },
];

export default function RefundPolicyPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>("intro");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const headerOffset = 90;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const statCards = [
    {
      icon: Gift,
      title: t("app.refund.page.statDonationTitle"),
      val: t("app.refund.page.statDonationVal"),
      desc: t("app.refund.page.statDonationDesc"),
      iconColor: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      icon: BookOpen,
      title: t("app.refund.page.statCourseTitle"),
      val: t("app.refund.page.statCourseVal"),
      desc: t("app.refund.page.statCourseDesc"),
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Clock,
      title: t("app.refund.page.statTimelineTitle"),
      val: t("app.refund.page.statTimelineVal"),
      desc: t("app.refund.page.statTimelineDesc"),
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Mail,
      title: t("app.refund.page.statSupportTitle"),
      val: t("app.refund.page.statSupportVal"),
      desc: t("app.refund.page.statSupportDesc"),
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-950 text-white py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading flex items-center justify-center gap-3">
            <RotateCcw className="h-10 w-10 text-accent-500 shrink-0" />
            {t("app.refund.page.title")}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-sm sm:text-base mb-4">
            {t("app.refund.page.subtitle")}
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-accent-400 border border-slate-700">
            {t("app.refund.page.effectiveDate")}
          </span>
        </div>
      </section>

      {/* Overview Dashboard */}
      <Section className="bg-slate-900 pb-10" fullWidth={false}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Card key={i} className="flex flex-col items-center text-center p-6" hover>
                  <div className={`p-4 rounded-2xl ${card.bgColor} ${card.iconColor} mb-4 shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xs font-semibold text-primary-300 tracking-wider uppercase mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xl font-bold text-white mb-2">
                    {card.val}
                  </p>
                  <p className="text-[11px] text-primary-400">
                    {card.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Detailed Content Section */}
      <Section className="bg-slate-900/60 pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Left Sidebar Table of Contents */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 self-start bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 pb-2 border-b border-slate-700/60 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent-500" />
                  {t("app.refund.page.tocTitle")}
                </h4>
                <ul className="space-y-3">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          onClick={(e) => handleTocClick(e, sec.id)}
                          className={`block text-sm font-medium transition-all duration-200 pl-3 border-l-2 py-0.5 ${
                            isActive
                              ? "text-accent-400 border-accent-500 font-bold scale-[1.02]"
                              : "text-primary-300 border-transparent hover:text-white hover:border-slate-600"
                          }`}
                        >
                          {t(sec.titleKey).split(".")[1]?.trim() || t(sec.titleKey)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Right Column Detailed Sections */}
            <div className="lg:col-span-3 space-y-8">
              {sections.map((sec) => (
                <Card
                  key={sec.id}
                  id={sec.id}
                  className={`scroll-mt-24 p-6 md:p-8 transition-all duration-300 ${
                    activeSection === sec.id ? "border-accent-500/60 shadow-xl" : ""
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gradient-accent rounded-full shrink-0" />
                    {t(sec.titleKey)}
                  </h3>
                  <p className="text-primary-200 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {t(sec.contentKey)}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
