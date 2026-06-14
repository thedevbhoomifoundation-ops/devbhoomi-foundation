"use client";
import { useTranslation } from "react-i18next";

import { Section, Card } from "@/components/ui";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function Contact() {
  return (
    <main className="pt-20">
      <HeroContact />
      <ContactSection />
    </main>
  );
}

function HeroContact() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.contact.page.getInTouch')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t('app.contact.page.haveQuestionsWedLoveToHea')}
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      title: t('app.contact.page.email'),
      details: "nextgendevbhoomi@gmail.com",
      subtitle: t('app.contact.page.wellRespondWithin24Hours'),
    },
    {
      icon: Phone,
      title: t('app.contact.page.phone'),
      details: "+91 (XXX) XXX-XXXX",
      subtitle: t('app.contact.page.available9Am6PmIst'),
    },
    {
      icon: MapPin,
      title: t('app.contact.page.office'),
      details: t('app.contact.page.biharIndia'),
      subtitle: t('app.contact.page.visitUsByAppointment'),
    },
    {
      icon: Clock,
      title: t('app.contact.page.hours'),
      details: t('app.contact.page.monFri9Am6Pm'),
      subtitle: t('app.contact.page.saturday10Am4Pm'),
    },
  ];

  return (
    <Section className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <Card key={i}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-white font-medium">
                          {info.details}
                        </p>
                        <p className="text-sm text-primary-300">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('app.contact.page.sendUsAMessage')}
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t('app.contact.page.fullName')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('app.contact.page.yourName')}
                      className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t('app.contact.page.email')}
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t('app.contact.page.subject')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('app.contact.page.howCanWeHelp')}
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t('app.contact.page.message')}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t('app.contact.page.tellUsMoreAboutYourQuery')}
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer"
                >
                  {t('app.contact.page.sendMessage')}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
