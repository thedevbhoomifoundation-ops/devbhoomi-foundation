"use client";

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
  return (
    <footer className="bg-gradient-dark text-white dark:bg-primary-950">
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
                <p className="font-heading font-semibold text-lg text-white tracking-wide">NextGen Dev Bhoomi</p>
              </div>
            </div>

            <p className="text-sm text-primary-300 leading-relaxed">
              Building a resilient future through education, empowerment and
              community development.
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
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Get Involved ── */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2.5">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Us ── */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="text-primary-300 text-sm leading-relaxed group-hover:text-accent-500 transition-colors duration-300">
                    {item.text}
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
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-400">
          <p>© 2026 Nextgen Devbhoomi Foundation. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Designed with{" "}
            <Heart className="h-4 w-4 text-accent-500 fill-accent-500" /> for a
            better tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
