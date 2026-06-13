"use client";

import { Section, Card, Button } from "@/components/ui";
import { Heart, Briefcase, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

export default function Volunteer() {
  return (
    <main className="pt-20">
      <HeroVolunteer />
      <WhyVolunteerSection />
      <VolunteerRolesSection />
      <BenefitsSection />
      <ApplicationSection />
    </main>
  );
}

function HeroVolunteer() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t({ en: "Make a Real Impact", hi: "एक वास्तविक प्रभाव डालें" })}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-6">
          {t({ en: "Join our community of 2000+ passionate volunteers making a difference", hi: "हमारे 2000+ उत्साही स्वयंसेवकों के समुदाय में शामिल हों जो बदलाव ला रहे हैं" })}
        </p>
        <div className="flex justify-center">
          <Button size="lg" className="bg-white text-primary-900 hover:bg-white/90 cursor-pointer">
            {t({ en: "Apply to Volunteer", hi: "स्वयंसेवक के रूप में आवेदन करें" })}
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyVolunteerSection() {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: Heart,
      title: t({ en: "Make Real Impact", hi: "वास्तविक प्रभाव डालें" }),
      description: t({ en: "Directly contribute to transforming lives and building communities", hi: "जीवन को बदलने और समुदायों के निर्माण में सीधे योगदान दें" }),
    },
    {
      icon: Users,
      title: t({ en: "Build Network", hi: "नेटवर्क बनाएं" }),
      description: t({ en: "Connect with like-minded individuals and passionate change-makers", hi: "समान विचारधारा वाले व्यक्तियों और उत्साही बदलाव लाने वालों से जुड़ें" }),
    },
    {
      icon: TrendingUp,
      title: t({ en: "Grow Skills", hi: "कौशल बढ़ाएं" }),
      description: t({ en: "Develop leadership, mentoring, and professional skills", hi: "नेतृत्व, सलाह और व्यावसायिक कौशल विकसित करें" }),
    },
    {
      icon: Briefcase,
      title: t({ en: "Gain Experience", hi: "अनुभव प्राप्त करें" }),
      description: t({ en: "Build your portfolio and gain valuable professional experience", hi: "अपना पोर्टफोलियो बनाएं और मूल्यवान व्यावसायिक अनुभव प्राप्त करें" }),
    },
  ];

  return (
    <Section
      title={t({ en: "Why Volunteer With Us?", hi: "हमारे साथ स्वयंसेवा क्यों करें?" })}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Card key={i} hover>
                <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-primary-300">
                  {reason.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function VolunteerRolesSection() {
  const { t } = useLanguage();

  const roles = [
    {
      title: t({ en: "Student Mentor", hi: "छात्र सलाहकार (मेंटोर)" }),
      time: t({ en: "Flexible (5-10 hrs/week)", hi: "लचीला (5-10 घंटे/सप्ताह)" }),
      requirements: t({ en: "Tech background or teaching passion", hi: "तकनीकी पृष्ठभूमि या शिक्षण का जुनून" }),
      description: t({ en: "Guide students through their learning journey and help them overcome challenges", hi: "छात्रों को उनकी सीखने की यात्रा में मार्गदर्शन करें और चुनौतियों से उबरने में मदद करें" }),
    },
    {
      title: t({ en: "Event Organizer", hi: "इवेंट आयोजक" }),
      time: t({ en: "Event-based (10-15 hrs/month)", hi: "इवेंट-आधारित (10-15 घंटे/माह)" }),
      requirements: t({ en: "Organizational and communication skills", hi: "संगठनात्मक और संचार कौशल" }),
      description: t({ en: "Organize workshops, webinars, and community events", hi: "कार्यशालाओं, वेबिनार और सामुदायिक कार्यक्रमों का आयोजन करें" }),
    },
    {
      title: t({ en: "Content Creator", hi: "सामग्री निर्माता (कंटेंट क्रिएटर)" }),
      time: t({ en: "Flexible (5-8 hrs/week)", hi: "लचीला (5-8 घंटे/सप्ताह)" }),
      requirements: t({ en: "Writing or video production skills", hi: "लेखन या वीडियो उत्पादन कौशल" }),
      description: t({ en: "Create educational content and share your expertise", hi: "शैक्षिक सामग्री बनाएं और अपनी विशेषज्ञता साझा करें" }),
    },
    {
      title: t({ en: "Campus Ambassador", hi: "कैंपस एंबेसडर" }),
      time: t({ en: "Regular (8-12 hrs/week)", hi: "नियमित (8-12 घंटे/सप्ताह)" }),
      requirements: t({ en: "Leadership and community engagement skills", hi: "नेतृत्व और सामुदायिक जुड़ाव कौशल" }),
      description: t({ en: "Represent the foundation at your college or community", hi: "अपने कॉलेज या समुदाय में फाउंडेशन का प्रतिनिधित्व करें" }),
    },
    {
      title: t({ en: "Tech Support", hi: "तकनीकी सहायता" }),
      time: t({ en: "As needed", hi: "आवश्यकतानुसार" }),
      requirements: t({ en: "Technical troubleshooting skills", hi: "तकनीकी समस्या निवारण कौशल" }),
      description: t({ en: "Provide technical assistance to students and community", hi: "छात्रों और समुदाय को तकनीकी सहायता प्रदान करें" }),
    },
    {
      title: t({ en: "Social Media Manager", hi: "सोशल मीडिया मैनेजर" }),
      time: t({ en: "Flexible (5-8 hrs/week)", hi: "लचीला (5-8 घंटे/सप्ताह)" }),
      requirements: t({ en: "Social media and design skills", hi: "सोशल मीडिया और डिजाइन कौशल" }),
      description: t({ en: "Manage our social platforms and engagement", hi: "हमारे सोशल प्लेटफॉर्म और जुड़ाव का प्रबंधन करें" }),
    },
  ];

  return (
    <Section
      title={t({ en: "Volunteer Opportunities", hi: "स्वयंसेवा के अवसर" })}
      subtitle={t({ en: "Find the perfect role for your skills and schedule", hi: "अपने कौशल और कार्यक्रम के लिए सही भूमिका खोजें" })}
      className="bg-slate-850"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <Card key={i} hover>
              <h3 className="text-lg font-semibold text-white mb-3">
                {role.title}
              </h3>
              <div className="space-y-2 mb-4 text-sm">
                <p>
                  <span className="font-medium text-white">{t({ en: "Time: ", hi: "समय: " })}</span>
                  <span className="text-primary-300">{role.time}</span>
                </p>
                <p>
                  <span className="font-medium text-white">
                    {t({ en: "Requirements:", hi: "आवश्यकताएं:" })}
                  </span>
                  <span className="text-primary-300"> {role.requirements}</span>
                </p>
              </div>
              <p className="text-primary-200 mb-4">{role.description}</p>
              <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all text-sm cursor-pointer">
                {t({ en: "Apply Now", hi: "अभी आवेदन करें" })}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function BenefitsSection() {
  const { t } = useLanguage();

  const benefits = [
    t({ en: "Certificate of appreciation", hi: "प्रशंसा प्रमाण पत्र" }),
    t({ en: "Professional reference letters", hi: "पेशेवर संदर्भ पत्र" }),
    t({ en: "Access to premium courses", hi: "प्रीमियम पाठ्यक्रमों तक पहुंच" }),
    t({ en: "Networking opportunities", hi: "नेटवर्किंग के अवसर" }),
    t({ en: "Free merchandise", hi: "मुफ्त मर्चेंडाइज (सामग्री)" }),
    t({ en: "Priority for speaking opportunities", hi: "बोलने के अवसरों के लिए प्राथमिकता" }),
    t({ en: "Travel reimbursement (if applicable)", hi: "यात्रा प्रतिपूर्ति (यदि लागू हो)" }),
    t({ en: "Mentorship from leadership team", hi: "नेतृत्व टीम से मार्गदर्शन" }),
  ];

  return (
    <Section
      title={t({ en: "Volunteer Benefits", hi: "स्वयंसेवा के लाभ" })}
      className="bg-slate-900"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-accent-500 flex-shrink-0" />
              <span className="text-lg text-white">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ApplicationSection() {
  const { t } = useLanguage();

  return (
    <Section className="bg-gradient-primary text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {t({ en: "Ready to Make an Impact?", hi: "क्या आप प्रभाव डालने के लिए तैयार हैं?" })}
        </h2>
        <p className="text-xl text-white/80 mb-8">
          {t({
            en: "Join us in our mission to transform lives through education and community empowerment. Apply now and become part of the movement!",
            hi: "शिक्षा और सामुदायिक सशक्तिकरण के माध्यम से जीवन को बदलने के हमारे मिशन में शामिल हों। अभी आवेदन करें और आंदोलन का हिस्सा बनें!"
          })}
        </p>
        <button className="px-8 py-3 rounded-lg bg-white text-primary-900 font-semibold hover:shadow-lg transition-all cursor-pointer">
          {t({ en: "Apply to Volunteer Today", hi: "आज ही स्वयंसेवा के लिए आवेदन करें" })}
        </button>
      </div>
    </Section>
  );
}
