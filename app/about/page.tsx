"use client";

import { Section, Card } from "@/components/ui";
import { Timeline } from "lucide-react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

export default function About() {
  return (
    <main className="pt-20">
      <HeroAbout />
      <MissionVisionSection />
      <TimelineSection />
      <MembersSection />
    </main>
  );
}

function HeroAbout() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t({ en: "About The Nextgen Devbhoomi Foundation", hi: "नेक्स्टजेन देवभूमि फाउंडेशन के बारे में" })}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t({ en: "Empowering communities through education, technology, and collective action since 2022.", hi: "2022 से शिक्षा, प्रौद्योगिकी और सामूहिक कार्रवाई के माध्यम से समुदायों को सशक्त बनाना।" })}
        </p>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const { t } = useLanguage();
  return (
    <Section
      title={t({ en: "Our Mission & Vision", hi: "हमारा उद्देश्य और दृष्टिकोण" })}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <h3 className="text-2xl font-bold text-accent-400 mb-4">
              {t({ en: "Mission", hi: "उद्देश्य" })}
            </h3>
            <p className="text-lg text-primary-200 leading-relaxed">
              {t({ en: "To provide accessible, world-class technical education and create a thriving community of empowered developers, social innovators, and volunteers dedicated to positive impact in the Himalayan region and beyond.", hi: "हिमालयी क्षेत्र और उससे आगे सकारात्मक प्रभाव के लिए समर्पित सशक्त डेवलपर्स, सामाजिक नवोन्मेषकों और स्वयंसेवकों का एक समृद्ध समुदाय बनाना और सुलभ, विश्व स्तरीय तकनीकी शिक्षा प्रदान करना।" })}
            </p>
          </Card>
          <Card>
            <h3 className="text-2xl font-bold text-accent-400 mb-4">
              {t({ en: "Vision", hi: "दृष्टिकोण" })}
            </h3>
            <p className="text-lg text-primary-200 leading-relaxed">
              {t({ en: "A world where every aspiring individual, regardless of background or geography, has access to quality technical education, opportunity to contribute to society, and the platform to realize their full potential.", hi: "एक ऐसी दुनिया जहां हर महत्वाकांक्षी व्यक्ति, चाहे उसकी पृष्ठभूमि या भूगोल कुछ भी हो, गुणवत्तापूर्ण तकनीकी शिक्षा, समाज में योगदान करने का अवसर और अपनी पूरी क्षमता को महसूस करने का मंच प्राप्त कर सके।" })}
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function TimelineSection() {
  const { t } = useLanguage();

  const timeline = [
    { 
      year: "2022", 
      title: t({ en: "Foundation Established", hi: "फाउंडेशन की स्थापना" }), 
      description: t({ en: "Started with a vision and a small group of passionate educators", hi: "एक विज़न और उत्साही शिक्षकों के एक छोटे समूह के साथ शुरुआत हुई" }) 
    },
    { 
      year: "2023", 
      title: t({ en: "1000+ Students", hi: "1000+ छात्र" }), 
      description: t({ en: "Reached our first milestone with active enrollment", hi: "सक्रिय नामांकन के साथ हमारे पहले मील के पत्थर तक पहुंचे" }) 
    },
    { 
      year: "2023", 
      title: t({ en: "Launch Volunteer Program", hi: "स्वयंसेवक कार्यक्रम की शुरुआत" }), 
      description: t({ en: "Built a community of passionate mentors", hi: "उत्साही सलाहकारों के समुदाय का निर्माण किया" }) 
    },
    { 
      year: "2024", 
      title: t({ en: "15000+ Lives Touched", hi: "15000+ जीवन को प्रभावित किया" }), 
      description: t({ en: "Expanded impact across multiple regions", hi: "कई क्षेत्रों में प्रभाव का विस्तार किया" }) 
    },
  ];

  return (
    <Section
      title={t({ en: "Our Journey", hi: "हमारी यात्रा" })}
      className="bg-slate-800/50"
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

function MembersSection() {
  const { t } = useLanguage();

  const members = [
    {
      name: "Saurav Agrawal",
      linkedin: "https://www.linkedin.com/in/agrawal-saurav",
      role: t({ en: "Core Member", hi: "मुख्य सदस्य" }),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ashish Gulshan",
      linkedin: "https://www.linkedin.com/in/aashishgulshan",
      role: t({ en: "Core Member", hi: "मुख्य सदस्य" }),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Gajendra",
      linkedin: "https://www.linkedin.com/in/gajju-ary",
      role: t({ en: "Core Member", hi: "मुख्य सदस्य" }),
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kumar Shivam",
      linkedin: "https://www.linkedin.com/in/kumar-shivam-81a190226",
      role: t({ en: "Core Member", hi: "मुख्य सदस्य" }),
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ujjwal Singh",
      linkedin: "https://www.linkedin.com/in/ujjwal-kumar-1881b8153",
      role: t({ en: "Core Member", hi: "मुख्य सदस्य" }),
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Vikas Pandey",
      linkedin: "https://www.linkedin.com/in/vikash-kr-pandey-b34955140",
      role: t({ en: "Core Member", hi: "मुख्य सदस्य" }),
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Pratyush Singh",
      linkedin: "https://www.linkedin.com/in/pratyushkumarsinghse",
      role: t({ en: "Core Member", hi: "मुख्य सदस्य" }),
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ashutosh Gupta",
      role: t({ en: "Contributor", hi: "योगदानकर्ता" }),
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Shubham",
      role: t({ en: "Contributor", hi: "योगदानकर्ता" }),
      image: "https://images.unsplash.com/photo-1536164261511-3a17e658594a?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Shubham Gupta",
      role: t({ en: "Contributor", hi: "योगदानकर्ता" }),
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Mahesh Agrawal",
      role: t({ en: "Contributor", hi: "योगदानकर्ता" }),
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <Section
      title={t({ en: "Our Members & Contributors", hi: "हमारे सदस्य और योगदानकर्ता" })}
      subtitle={t({ en: "The passionate individuals making our programs possible", hi: "हमारे कार्यक्रमों को संभव बनाने वाले उत्साही व्यक्ति" })}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {members.map((member, i) => {
            // Get initials
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
                    {t({ en: "Community", hi: "समुदाय" })}
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
