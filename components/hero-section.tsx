"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ─── animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

/* ─── circular text for the stamp badge ─── */
function CircularText({ text, radius }: { text: string; radius: number }) {
  const chars = text.split("");
  const degreesPerChar = 360 / chars.length;
  return (
    <svg
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      className="w-full h-full animate-[spin_20s_linear_infinite]"
    >
      {chars.map((char, i) => {
        const angle = degreesPerChar * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = radius + (radius - 10) * Math.cos(rad);
        const y = radius + (radius - 10) * Math.sin(rad);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            transform={`rotate(${angle + 90}, ${x}, ${y})`}
            className="fill-white text-[6.5px] font-bold tracking-widest uppercase"
          >
            {char}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── avatar placeholders ─── */
const avatarColors = [
  "bg-accent-500",
  "bg-primary-600",
  "bg-emerald-500",
  "bg-rose-500",
];

/* ─── component ─── */
export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-slate-900 pt-20">
      {/* ── mountain background overlay ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-mountains.png"
          alt="Himalayan mountains"
          fill
          priority
          className="object-cover object-center opacity-[0.06] dark:opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900" />
      </div>

      {/* ── soft accent glow ── */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

      {/* ── content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* ═══ LEFT COLUMN ═══ */}
          <motion.div className="space-y-7" {...fadeUp()}>
            {/* subtitle */}
            <motion.p
              className="text-sm font-semibold tracking-widest uppercase text-accent-600 dark:text-accent-400"
              {...fadeUp(0.1)}
            >
              Together We Can
            </motion.p>

            {/* heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              {...fadeUp(0.2)}
            >
              <span className="text-primary-900 dark:text-white">
                Build a Resilient
              </span>
              <br />
              <span className="font-accent italic bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
                Future
              </span>
            </motion.h1>

            {/* description */}
            <motion.p
              className="text-lg text-primary-700 dark:text-primary-200 leading-relaxed"
              {...fadeUp(0.3)}
            >
              Nextgen Devbhoomi Foundation is dedicated to empowering individuals with
              technical skills, fostering sustainable communities, and building a
              stronger tomorrow.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              {...fadeUp(0.4)}
            >
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-600 to-accent-400 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
                Donate Now <span aria-hidden="true">❤️</span>
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-900 dark:border-white px-8 py-3.5 text-base font-semibold text-primary-900 dark:text-white hover:bg-primary-900/5 dark:hover:bg-white/10 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
                Explore Programs <span aria-hidden="true">→</span>
              </button>
            </motion.div>

            {/* avatar group + social proof */}
            <motion.div
              className="flex flex-wrap items-center gap-4 pt-4"
              {...fadeUp(0.5)}
            >
              {/* overlapping avatars */}
              <div className="flex -space-x-3">
                {avatarColors.map((bg, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full ${bg} ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["A", "R", "S", "M"][i]}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full bg-accent-100 dark:bg-accent-900/30 px-3 py-1 text-sm font-bold text-accent-700 dark:text-accent-300">
                  500+
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary-900 dark:text-white leading-tight">
                    Volunteers &amp; Supporters
                  </p>
                  <p className="text-xs text-primary-500 dark:text-primary-400">
                    Join us in creating impact
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            {...fadeRight(0.3)}
          >
            {/* main image */}
            <div className="relative w-full max-w-[320px] aspect-[4/5] sm:max-w-[380px] lg:max-w-[420px] rounded-3xl overflow-hidden shadow-2xl mx-auto lg:mx-0">
              <Image
                src="/images/hero-students.png"
                alt="Students at Nextgen Devbhoomi Foundation"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* mentor circle — overlapping bottom-left */}
            <motion.div
              className="absolute -bottom-4 -left-2 sm:bottom-4 sm:-left-8 lg:-left-12 w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl z-20"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Image
                src="/images/hero-mentor.png"
                alt="Mentor at Nextgen Devbhoomi Foundation"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* circular badge / stamp — top-right */}
            <motion.div
              className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary-900 dark:bg-accent-600 flex items-center justify-center shadow-xl z-20"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
            >
              <CircularText
                text="THE NEXTGEN DEVBHOOMI FOUNDATION • BUILDING A RESILIENT FUTURE • "
                radius={60}
              />
              {/* centre icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent-400 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l2.09 6.26L21 9.27l-5.18 3.73L17.82 21 12 17.27 6.18 21l1.91-7.99L3 9.27l6.91.01L12 3z"
                  />
                </svg>
              </div>
            </motion.div>

            {/* floating decorative dots */}
            <motion.div
              className="absolute top-1/2 -right-10 hidden lg:grid grid-cols-3 gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-accent-500"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary-900/30 dark:border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-primary-900/40 dark:bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
