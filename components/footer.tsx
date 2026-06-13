"use client";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { foundationInfo, socialLinks } from "@/lib/constants";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart, Clock } from "lucide-react";
import { motion } from "framer-motion";
import {
  LuFacebook,
  LuTwitter,
  LuLinkedin,
  LuInstagram,
  LuYoutube,
} from "react-icons/lu";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Courses", href: "/courses" },
  { label: "Digital Library", href: "/library" },
  { label: "Interview Prep", href: "/interview-prep" },
  { label: "DSA Problem Solver", href: "/dsa-solver" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
];

const getInvolvedLinks = [
  { label: "Donate Now", href: "/donate" },
  { label: "Become a Volunteer", href: "/volunteer" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Fundraise", href: "/fundraise" },
  { label: "Events", href: "/events" },
];

const supportLinks = [
  { label: "FAQ", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Sitemap", href: "/sitemap" },
];

const contactDetails = [
  {
    icon: MapPin,
    text: "123, Dev Bhoomi Marg, Rishikesh, Uttarakhand, India",
    href: undefined,
  },
  {
    icon: Phone,
    text: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    text: "info@devbhoomifoundation.org",
    href: "mailto:info@devbhoomifoundation.org",
  },
  {
    icon: Clock,
    text: "Mon - Sat: 9:00 AM - 6:00 PM",
    href: undefined,
  },
];

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <LuFacebook className="h-4 w-4" />,
  twitter: <LuTwitter className="h-4 w-4" />,
  instagram: <LuInstagram className="h-4 w-4" />,
  linkedin: <LuLinkedin className="h-4 w-4" />,
  youtube: <LuYoutube className="h-4 w-4" />,
};

export function Footer() {
  const { t } = useTranslation();

  const getFooterLinkLabel = (label: string) => {
    switch (label) {
      case "About Us": return t("nav.about");
      case "Programs": return t("nav.programs");
      case "Courses": return t("nav.courses");
      case "Digital Library": return t("nav.digitalLibrary");
      case "Interview Prep": return t("nav.interviewPrep");
      case "DSA Problem Solver": return t("nav.dsaSolver");
      case "Blog": return t("nav.blogs");
      case "Contact Us": return t("nav.contact");
      case "Gallery": return t('components.footer.gallery');
      case "Careers": return t('components.footer.careers');
      
      case "Donate Now": return t("nav.donate");
      case "Become a Volunteer": return t("nav.becomeVolunteer");
      case "Partner With Us": return t("nav.partnerWithUs");
      case "Fundraise": return t("nav.fundraise");
      case "Events": return t("nav.events");
      
      case "FAQ": return t('components.footer.faq');
      case "Privacy Policy": return t('components.footer.privacyPolicy');
      case "Terms & Conditions": return t('components.footer.termsConditions');
      case "Refund Policy": return t('components.footer.refundPolicy');
      case "Sitemap": return t('components.footer.sitemap');
      default: return label;
    }
  };

  const getContactText = (text: string) => {
    if (text.startsWith("123, Dev Bhoomi")) {
      return t("contact.address");
    }
    if (text.startsWith("Mon - Sat")) {
      return t("contact.hours");
    }
    return text;
  };

  return (
    <footer className="bg-gradient-dark text-white border-t border-slate-800">
      {/* Row 1 — Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* ── Brand Column ── */}
          <div className="col-span-2 lg:col-span-1 space-y-5">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/devbhoomi-logo.jpeg"
                alt="Nextgen Devbhoomi Foundation logo"
                width={40}
                height={40}
                className="rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div>
                <p className="font-heading font-semibold text-lg text-white tracking-wide">
                  {t('components.footer.nextgenDevbhoomi')}
                </p>
              </div>
            </div>

            <p className="text-sm text-primary-300 leading-relaxed">
              {t("brand.description")}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-accent-500 flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={social.label}
                >
                  {socialIcons[social.icon]}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {getFooterLinkLabel(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Get Involved ── */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              {t("footer.getInvolved")}
            </h4>
            <ul className="space-y-2.5">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {getFooterLinkLabel(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              {t("footer.support")}
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {getFooterLinkLabel(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Us ── */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="text-primary-300 text-sm leading-relaxed group-hover:text-accent-500 transition-colors duration-300">
                    {getContactText(item.text)}
                  </span>
                );

                return (
                  <li key={item.text} className="flex items-start gap-3 group">
                    <Icon className="h-4 w-4 text-accent-500 mt-0.5 shrink-0" />
                    {item.href ? (
                      <a href={item.href} className="group">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 2 — Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-400">
          <p>{t("footer.rights")}</p>
          <p className="flex items-center gap-1">
            {t("footer.designedWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
