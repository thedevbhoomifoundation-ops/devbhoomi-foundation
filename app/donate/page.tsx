"use client";

import { Section, Card } from "@/components/ui";
import { Heart, TrendingUp, Users, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

export default function Donate() {
  return (
    <main className="pt-20">
      <HeroDonate />
      <DonationPlansSection />
      <ImpactSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

function HeroDonate() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t({ en: "Support Our Mission", hi: "हमारे मिशन का समर्थन करें" })}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t({
            en: "Your donation directly impacts thousands of lives. Help us provide quality education and opportunities to deserving students.",
            hi: "आपका दान सीधे हजारों जिंदगियों को प्रभावित करता है। योग्य छात्रों को गुणवत्तापूर्ण शिक्षा और अवसर प्रदान करने में हमारी सहायता करें।"
          })}
        </p>
      </div>
    </section>
  );
}

function DonationPlansSection() {
  const { t } = useLanguage();

  const plans = [
    {
      title: t({ en: "Student Support", hi: "छात्र सहायता" }),
      amount: "₹999",
      period: t({ en: "One-time", hi: "एक बार" }),
      description: t({ en: "Support one student's course enrollment", hi: "एक छात्र के पाठ्यक्रम नामांकन का समर्थन करें" }),
      impact: t({ en: "Help 1 student access premium education", hi: "1 छात्र को प्रीमियम शिक्षा प्राप्त करने में मदद करें" }),
      icon: "🎓",
    },
    {
      title: t({ en: "Scholarship Fund", hi: "छात्रवृत्ति कोष" }),
      amount: "₹2,499",
      period: t({ en: "One-time", hi: "एक बार" }),
      description: t({ en: "Provide a monthly stipend to a deserving student", hi: "एक योग्य छात्र को मासिक वजीफा प्रदान करें" }),
      impact: t({ en: "Support 1 student for a month", hi: "1 महीने के लिए 1 छात्र का समर्थन करें" }),
      icon: "📚",
    },
    {
      title: t({ en: "Monthly Supporter", hi: "मासिक समर्थक" }),
      amount: t({ en: "₹500/month", hi: "₹500/माह" }),
      period: t({ en: "Monthly", hi: "मासिक" }),
      description: t({ en: "Join as a recurring monthly donor", hi: "एक आवर्ती मासिक दाता के रूप में शामिल हों" }),
      impact: t({ en: "Provide ongoing support to students", hi: "छात्रों को निरंतर सहायता प्रदान करें" }),
      icon: "💝",
    },
    {
      title: t({ en: "Program Sponsor", hi: "कार्यक्रम प्रायोजक" }),
      amount: "₹5,000",
      period: t({ en: "One-time", hi: "एक बार" }),
      description: t({ en: "Sponsor an entire course or program", hi: "एक पूरे पाठ्यक्रम या कार्यक्रम को प्रायोजित करें" }),
      impact: t({ en: "Enable full program for multiple students", hi: "एकाधिक छात्रों के लिए पूर्ण कार्यक्रम सक्षम करें" }),
      icon: "🚀",
    },
    {
      title: t({ en: "Infrastructure", hi: "बुनियादी ढांचा" }),
      amount: "₹10,000",
      period: t({ en: "One-time", hi: "एक बार" }),
      description: t({ en: "Support building learning centers", hi: "लर्निंग सेंटरों के निर्माण में सहायता करें" }),
      impact: t({ en: "Build a learning facility in rural areas", hi: "ग्रामीण क्षेत्रों में एक शिक्षण सुविधा का निर्माण करें" }),
      icon: "🏢",
    },
    {
      title: t({ en: "Community Hero", hi: "सामुदायिक नायक" }),
      amount: "₹25,000+",
      period: t({ en: "Custom", hi: "कस्टम" }),
      description: t({ en: "Custom donation for maximum impact", hi: "अधिकतम प्रभाव के लिए कस्टम दान" }),
      impact: t({ en: "Personalized impact based on your contribution", hi: "आपके योगदान के आधार पर व्यक्तिगत प्रभाव" }),
      icon: "👑",
    },
  ];

  return (
    <Section
      title={t({ en: "Donation Plans", hi: "दान योजनाएं" })}
      subtitle={t({ en: "Choose how you'd like to make an impact", hi: "चुनें कि आप किस प्रकार प्रभाव डालना चाहते हैं" })}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <Card key={i} hover className="flex flex-col">
              <div className="text-5xl mb-4">{plan.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {plan.title}
              </h3>
              <div className="mb-4">
                <div className="text-3xl font-bold text-accent-500">{plan.amount}</div>
                <div className="text-sm text-primary-300">{plan.period}</div>
              </div>
              <p className="text-sm text-primary-300 mb-3 flex-1">
                {plan.description}
              </p>
              <div className="p-3 bg-accent-900/20 rounded-lg mb-4">
                <p className="text-sm font-medium text-accent-300">
                  ✨ {plan.impact}
                </p>
              </div>
              <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer">
                {t({ en: "Donate Now", hi: "अभी दान करें" })}
              </button>
            </Card>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mx-auto">
          <Card>
            <h3 className="text-xl font-semibold text-white mb-4">
              {t({ en: "Custom Donation", hi: "कस्टम दान" })}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t({ en: "Enter amount (₹)", hi: "राशि दर्ज करें (₹)" })}
                </label>
                <input
                  type="number"
                  placeholder={t({ en: "Enter any amount", hi: "कोई भी राशि दर्ज करें" })}
                  className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <button className="w-full py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer">
                {t({ en: "Proceed to Payment", hi: "भुगतान के लिए आगे बढ़ें" })}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function ImpactSection() {
  const { t } = useLanguage();

  const impacts = [
    {
      icon: Users,
      stat: "15000+",
      label: t({ en: "Students Reached", hi: "छात्रों तक पहुंचे" }),
      description: t({ en: "Direct beneficiaries of our programs", hi: "हमारे कार्यक्रमों के प्रत्यक्ष लाभार्थी" }),
    },
    {
      icon: TrendingUp,
      stat: "₹50L+",
      label: t({ en: "Amount Donated", hi: "दान की गई राशि" }),
      description: t({ en: "Total funds raised and utilized", hi: "कुल एकत्रित और उपयोग की गई धनराशि" }),
    },
    {
      icon: Award,
      stat: "50+",
      label: t({ en: "Courses Offered", hi: "प्रस्तावित पाठ्यक्रम" }),
      description: t({ en: "Diverse learning opportunities", hi: "विविध शिक्षण अवसर" }),
    },
    {
      icon: Heart,
      stat: "2000+",
      label: t({ en: "Active Volunteers", hi: "सक्रिय स्वयंसेवक" }),
      description: t({ en: "Community members contributing", hi: "योगदान देने वाले समुदाय के सदस्य" }),
    },
  ];

  return (
    <Section
      title={t({ en: "Your Donation's Impact", hi: "आपके दान का प्रभाव" })}
      className="bg-slate-850"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, i) => {
            const Icon = impact.icon;
            return (
              <Card key={i} className="text-center">
                <Icon className="h-12 w-12 text-accent-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {impact.stat}
                </div>
                <div className="text-white font-semibold mb-2">
                  {impact.label}
                </div>
                <p className="text-sm text-primary-300">
                  {impact.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function FAQSection() {
  const { t } = useLanguage();

  const faqs = [
    {
      q: t({ en: "Is my donation tax-deductible?", hi: "क्या मेरा दान कर-मुक्त है?" }),
      a: t({ en: "Yes, we're a registered 80G NGO. Your donations are eligible for tax deductions under Indian tax laws.", hi: "हाँ, हम एक पंजीकृत 80G एनजीओ हैं। आपका दान भारतीय कर कानूनों के तहत कर कटौती के लिए पात्र है।" }),
    },
    {
      q: t({ en: "How is my donation used?", hi: "मेरे दान का उपयोग कैसे किया जाता है?" }),
      a: t({ en: "100% of donations go directly to student scholarships, course development, and community programs. No administrative overhead is deducted.", hi: "100% दान सीधे छात्र छात्रवृत्ति, पाठ्यक्रम विकास और सामुदायिक कार्यक्रमों में जाता है। कोई प्रशासनिक खर्च नहीं काटा जाता है।" }),
    },
    {
      q: t({ en: "Can I track my donation's impact?", hi: "क्या मैं अपने दान के प्रभाव को ट्रैक कर सकता हूँ?" }),
      a: t({ en: "Yes, all donors receive regular impact reports showing how their contribution is making a difference.", hi: "हाँ, सभी दाताओं को नियमित प्रभाव रिपोर्ट प्राप्त होती है जो दिखाती है कि उनका योगदान कैसे बदलाव ला रहा है।" }),
    },
    {
      q: t({ en: "What payment methods do you accept?", hi: "आप कौन सी भुगतान विधियां स्वीकार करते हैं?" }),
      a: t({ en: "We accept all major credit/debit cards, UPI, net banking, and bank transfers.", hi: "हम सभी प्रमुख क्रेडिट/डेबिट कार्ड, यूपीआई, नेट बैंकिंग और बैंक ट्रांसफर स्वीकार करते हैं।" }),
    },
  ];

  return (
    <Section
      title={t({ en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" })}
      className="bg-slate-900"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <h3 className="text-lg font-semibold text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-primary-300">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  const { t } = useLanguage();

  return (
    <Section className="bg-gradient-to-r from-[#0B3C5D] to-[#E58A1F] text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heart className="h-12 w-12 mx-auto mb-4 fill-white text-white" />
        <h2 className="text-4xl font-bold mb-4">
          {t({ en: "Ready to Make a Difference?", hi: "बदलाव लाने के लिए तैयार हैं?" })}
        </h2>
        <p className="text-xl text-white/80 mb-8 mx-auto">
          {t({
            en: "Your generosity directly transforms lives. Every rupee counts. Donate today and help us create a brighter future for thousands of aspiring learners.",
            hi: "आपकी उदारता सीधे जीवन बदल देती है। हर रुपया मायने रखता है। आज ही दान करें और हजारों महत्वाकांक्षी शिक्षार्थियों के लिए एक उज्जवल भविष्य बनाने में हमारी मदद करें।"
          })}
        </p>
        <button className="px-8 py-3 rounded-lg bg-white text-primary-900 font-semibold hover:shadow-lg transition-all cursor-pointer">
          {t({ en: "Make a Donation", hi: "दान करें" })}
        </button>
      </div>
    </Section>
  );
}
