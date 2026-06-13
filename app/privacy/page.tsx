"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Sparkles } from "lucide-react";

import { Section, Card } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface PolicySectionType {
  id: string;
  titleKey: string;
  contentKey: string;
}

const sections: PolicySectionType[] = [
  {
    id: "intro",
    titleKey: "app.privacy.sections.intro.title",
    contentKey: "app.privacy.sections.intro.content",
  },
  {
    id: "collect",
    titleKey: "app.privacy.sections.collect.title",
    contentKey: "app.privacy.sections.collect.content",
  },
  {
    id: "use",
    titleKey: "app.privacy.sections.use.title",
    contentKey: "app.privacy.sections.use.content",
  },
  {
    id: "sharing",
    titleKey: "app.privacy.sections.sharing.title",
    contentKey: "app.privacy.sections.sharing.content",
  },
  {
    id: "cookies",
    titleKey: "app.privacy.sections.cookies.title",
    contentKey: "app.privacy.sections.cookies.content",
  },
  {
    id: "rights",
    titleKey: "app.privacy.sections.rights.title",
    contentKey: "app.privacy.sections.rights.content",
  },
  {
    id: "thirdparty",
    titleKey: "app.privacy.sections.thirdparty.title",
    contentKey: "app.privacy.sections.thirdparty.content",
  },
  {
    id: "changes",
    titleKey: "app.privacy.sections.changes.title",
    contentKey: "app.privacy.sections.changes.content",
  },
  {
    id: "contact",
    titleKey: "app.privacy.sections.contact.title",
    contentKey: "app.privacy.sections.contact.content",
  },
];

export default function PrivacyPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>("intro");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -65% 0px", // triggers when section is in upper-mid screen
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
      const headerOffset = 90; // offset for the navbar
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-950 text-white py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading flex items-center justify-center gap-3">
            <Shield className="h-10 w-10 text-accent-500 shrink-0" />
            {t("app.privacy.page.title")}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-sm sm:text-base mb-4">
            {t("app.privacy.page.subtitle")}
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-accent-400 border border-slate-700">
            {t("app.privacy.page.effectiveDate")}
          </span>
        </div>
      </section>

      {/* Content Section */}
      <Section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Left Sidebar Table of Contents */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 self-start bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 pb-2 border-b border-slate-700/60 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent-500" />
                  {t("app.privacy.page.tocTitle")}
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

            {/* Right Column Detailed Policy */}
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
