"use client";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Construction, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ComingSoonProps {
  title: string;
  description?: string;
}

const pageTranslations: Record<
  string,
  { title: string; description: string }
> = {
  "Upcoming Events": {
    title: "components.coming-soon.upcomingEvents",
    description: "components.coming-soon.stayTunedForUpcomingCommun"
  },
  "Frequently Asked Questions (FAQ)": {
    title: "components.coming-soon.frequentlyAskedQuestionsFaq",
    description: "components.coming-soon.haveQuestionsAboutNextgenD"
  },
  "Fundraise for Us": {
    title: "components.coming-soon.fundraiseForUs",
    description: "components.coming-soon.helpUsBringLearningSpaces"
  },
  "Login / Register": {
    title: "components.coming-soon.loginRegister",
    description: "components.coming-soon.accessToTheStudentAndVolu"
  },
  "Partner With Us": {
    title: "components.coming-soon.partnerWithUs",
    description: "components.coming-soon.weAreEstablishingCollaborat"
  },
  "Privacy Policy": {
    title: "components.coming-soon.privacyPolicy",
    description: "components.coming-soon.weTakeDataPrivacyAndTrust"
  },
  "Refund Policy": {
    title: "components.coming-soon.refundPolicy",
    description: "components.coming-soon.ourGuidelinesAndPoliciesRe"
  },
  "Sitemap": {
    title: "components.coming-soon.sitemap",
    description: "components.coming-soon.aCompleteDirectoryOfAllOu"
  },
  "Terms & Conditions": {
    title: "components.coming-soon.termsConditions",
    description: "components.coming-soon.ourStandardUserTermsVolunt"
  }
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const translation = pageTranslations[title];
  const translatedTitle = translation ? t(translation.title) : title;
  const translatedDescription = translation
    ? t(translation.description)
    : description
    ? t(description)
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
