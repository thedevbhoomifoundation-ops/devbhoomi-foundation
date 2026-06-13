"use client";

import { Section, Card } from "@/components/ui";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

export default function Contact() {
  return (
    <main className="pt-20">
      <HeroContact />
      <ContactSection />
    </main>
  );
}

function HeroContact() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t({ en: "Get in Touch", hi: "संपर्क में रहें" })}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t({ en: "Have questions? We'd love to hear from you. Reach out to us anytime.", hi: "कोई प्रश्न हैं? हम आपसे सुनना पसंद करेंगे। किसी भी समय हमसे संपर्क करें।" })}
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      title: t({ en: "Email", hi: "ईमेल" }),
      details: "hello@devbhoomi.org",
      subtitle: t({ en: "We'll respond within 24 hours", hi: "हम 24 घंटे के भीतर जवाब देंगे" }),
    },
    {
      icon: Phone,
      title: t({ en: "Phone", hi: "फ़ोन" }),
      details: "+91 (XXX) XXX-XXXX",
      subtitle: t({ en: "Available 9 AM - 6 PM IST", hi: "उपलब्ध सुबह 9 बजे - शाम 6 बजे IST" }),
    },
    {
      icon: MapPin,
      title: t({ en: "Office", hi: "कार्यालय" }),
      details: t({ en: "Bihar, India", hi: "बिहार, भारत" }),
      subtitle: t({ en: "Visit us by appointment", hi: "नियुक्ति द्वारा हमसे मिलें" }),
    },
    {
      icon: Clock,
      title: t({ en: "Hours", hi: "समय" }),
      details: t({ en: "Mon - Fri: 9 AM - 6 PM", hi: "सोम - शुक्र: सुबह 9 बजे - शाम 6 बजे" }),
      subtitle: t({ en: "Saturday: 10 AM - 4 PM", hi: "शनिवार: सुबह 10 बजे - शाम 4 बजे" }),
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
                {t({ en: "Send us a Message", hi: "हमें संदेश भेजें" })}
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t({ en: "Full Name", hi: "पूरा नाम" })}
                    </label>
                    <input
                      type="text"
                      placeholder={t({ en: "Your name", hi: "आपका नाम" })}
                      className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t({ en: "Email", hi: "ईमेल" })}
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
                    {t({ en: "Subject", hi: "विषय" })}
                  </label>
                  <input
                    type="text"
                    placeholder={t({ en: "How can we help?", hi: "हम किस प्रकार सहायता कर सकते हैं?" })}
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t({ en: "Message", hi: "संदेश" })}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t({ en: "Tell us more about your query...", hi: "अपनी क्वेरी के बारे में हमें और बताएं..." })}
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer"
                >
                  {t({ en: "Send Message", hi: "संदेश भेजें" })}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
