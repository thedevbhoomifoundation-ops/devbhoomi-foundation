"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Construction, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/providers/language-provider";

interface ComingSoonProps {
  title: string;
  description?: string;
}

const pageTranslations: Record<
  string,
  { title: { en: string; hi: string }; description: { en: string; hi: string } }
> = {
  "Upcoming Events": {
    title: { en: "Upcoming Events", hi: "आगामी कार्यक्रम" },
    description: {
      en: "Stay tuned for upcoming community training programs, tech hackathons, and volunteer meetups. We will be sharing our event calendar shortly.",
      hi: "आगामी सामुदायिक प्रशिक्षण कार्यक्रमों, टेक हैकाथॉन और स्वयंसेवक बैठकों के लिए बने रहें। हम जल्द ही अपना कार्यक्रम कैलेंडर साझा करेंगे।"
    }
  },
  "Frequently Asked Questions (FAQ)": {
    title: { en: "Frequently Asked Questions (FAQ)", hi: "अक्सर पूछे जाने वाले प्रश्न (FAQ)" },
    description: {
      en: "Have questions about Nextgen Devbhoomi Foundation, our courses, donation campaigns, or volunteer options? We are compiling a comprehensive list of FAQs, online soon.",
      hi: "नेक्स्टजेन देवभूमि फाउंडेशन, हमारे पाठ्यक्रमों, दान अभियानों या स्वयंसेवक विकल्पों के बारे में प्रश्न हैं? हम एफएक्यू की एक व्यापक सूची तैयार कर रहे हैं, जो जल्द ही ऑनलाइन होगी।"
    }
  },
  "Fundraise for Us": {
    title: { en: "Fundraise for Us", hi: "हमारे लिए धन जुटाएं" },
    description: {
      en: "Help us bring learning spaces and technical skills to remote corners of the Himalayas by setting up your own fundraising campaign. Detailed tooling is coming soon.",
      hi: "अपनी खुद की धन जुटाने की मुहिम शुरू करके हिमालय के दूरदराज के कोनों में सीखने की जगहें और तकनीकी कौशल लाने में हमारी मदद करें। विस्तृत टूलिंग जल्द ही आ रही है।"
    }
  },
  "Login / Register": {
    title: { en: "Login / Register", hi: "लॉगिन / पंजीकरण" },
    description: {
      en: "Access to the Student and Volunteer portal is currently being integrated. Check back soon for the login page!",
      hi: "छात्र और स्वयंसेवक पोर्टल तक पहुंच वर्तमान में एकीकृत की जा रही है। लॉगिन पेज के लिए जल्द ही वापस जांचें!"
    }
  },
  "Partner With Us": {
    title: { en: "Partner With Us", hi: "हमारे साथ भागीदार बनें" },
    description: {
      en: "We are establishing collaborations with educational institutions, corporates, and technology leaders to amplify our impact. This page will be available soon.",
      hi: "हम अपने प्रभाव को बढ़ाने के लिए शैक्षणिक संस्थानों, कॉर्पोरेट्स और तकनीकी नेताओं के साथ साझेदारी स्थापित कर रहे हैं। यह पृष्ठ जल्द ही उपलब्ध होगा।"
    }
  },
  "Privacy Policy": {
    title: { en: "Privacy Policy", hi: "गोपनीयता नीति" },
    description: {
      en: "We take data privacy and trust seriously. Our updated Privacy Policy explaining how we manage data for volunteers, donors, and students is currently under review and will be published shortly.",
      hi: "हम डेटा गोपनीयता और विश्वास को गंभीरता से लेते हैं। हमारी अद्यतित गोपनीयता नीति, जो बताती है कि हम स्वयंसेवकों, दाताओं और छात्रों के डेटा का प्रबंधन कैसे करते हैं, वर्तमान में समीक्षा के अधीन है और जल्द ही प्रकाशित की जाएगी।"
    }
  },
  "Refund Policy": {
    title: { en: "Refund Policy", hi: "धनवापसी नीति" },
    description: {
      en: "Our guidelines and policies regarding donation refunds and educational course cancellations are being finalized and will be detailed on this page soon.",
      hi: "दान वापसी और शैक्षिक पाठ्यक्रम रद्दीकरण के संबंध में हमारे दिशानिर्देशों और नीतियों को अंतिम रूप दिया जा रहा है और जल्द ही इस पृष्ठ पर विवरण दिया जाएगा।"
    }
  },
  "Sitemap": {
    title: { en: "Sitemap", hi: "साइटमैप" },
    description: {
      en: "A complete directory of all our programs, courses, blogs, and other sub-pages is being generated. This page will be available soon to help you navigate our platform.",
      hi: "हमारे सभी कार्यक्रमों, पाठ्यक्रमों, ब्लॉगों और अन्य उप-पृष्ठों की एक पूरी निर्देशिका तैयार की जा रही है। हमारे प्लेटफॉर्म को नेविगेट करने में आपकी सहायता के लिए यह पृष्ठ जल्द ही उपलब्ध होगा।"
    }
  },
  "Terms & Conditions": {
    title: { en: "Terms & Conditions", hi: "नियम और शर्तें" },
    description: {
      en: "Our standard user terms, volunteer agreements, and platform guidelines are currently being updated. They will be available for review shortly.",
      hi: "हमारे मानक उपयोगकर्ता नियम, स्वयंसेवक समझौते और प्लेटफॉर्म दिशानिर्देश वर्तमान में अपडेट किए जा रहे हैं। वे जल्द ही समीक्षा के लिए उपलब्ध होंगे।"
    }
  }
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const translation = pageTranslations[title];
  const translatedTitle = translation ? t(translation.title) : title;
  const translatedDescription = description
    ? t({ en: description, hi: description })
    : translation
    ? t(translation.description)
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success(t("comingSoon.toastSuccess"));
    }, 1000);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950/40 py-24">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

      <motion.div
        className="relative w-full text-center bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-slate-700/50 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <motion.div
          className="mx-auto w-16 h-16 rounded-2xl bg-accent-950/30 flex items-center justify-center mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Construction className="h-8 w-8 text-accent-500" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {translatedTitle}
        </h1>
        <p className="text-sm font-semibold text-accent-400 tracking-wider uppercase mb-6">
          {t("comingSoon.subtitle")}
        </p>

        {/* Description */}
        <p className="text-primary-200 text-sm leading-relaxed mb-8">
          {translatedDescription}
        </p>

        {/* Notify Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("comingSoon.notifyPlaceholder")}
            required
            className="flex-1 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 whitespace-nowrap cursor-pointer"
          >
            {loading ? t("comingSoon.submitting") : (
              <>
                {t("comingSoon.notifyButton")} <Mail className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-700/50 pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white hover:text-accent-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t("comingSoon.backToHome")}
          </Link>
          <span className="hidden sm:inline text-slate-600">|</span>
          <Link
            href="/volunteer"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-accent-400 hover:text-accent-300 transition-colors"
          >
            {t("comingSoon.joinVolunteer")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
