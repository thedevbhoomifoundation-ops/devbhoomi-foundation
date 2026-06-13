"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, HelpCircle, Sparkles } from "lucide-react";

import { Section, Card } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface FAQItemType {
  category: string;
  questionKey: string;
  answerKey: string;
}

const faqData: FAQItemType[] = [
  {
    category: "general",
    questionKey: "app.faqs.questions.general1",
    answerKey: "app.faqs.answers.general1",
  },
  {
    category: "general",
    questionKey: "app.faqs.questions.general2",
    answerKey: "app.faqs.answers.general2",
  },
  {
    category: "programs",
    questionKey: "app.faqs.questions.programs1",
    answerKey: "app.faqs.answers.programs1",
  },
  {
    category: "programs",
    questionKey: "app.faqs.questions.programs2",
    answerKey: "app.faqs.answers.programs2",
  },
  {
    category: "programs",
    questionKey: "app.faqs.questions.programs3",
    answerKey: "app.faqs.answers.programs3",
  },
  {
    category: "donations",
    questionKey: "app.faqs.questions.donations1",
    answerKey: "app.faqs.answers.donations1",
  },
  {
    category: "donations",
    questionKey: "app.faqs.questions.donations2",
    answerKey: "app.faqs.answers.donations2",
  },
  {
    category: "volunteering",
    questionKey: "app.faqs.questions.volunteering1",
    answerKey: "app.faqs.answers.volunteering1",
  },
  {
    category: "volunteering",
    questionKey: "app.faqs.questions.volunteering2",
    answerKey: "app.faqs.answers.volunteering2",
  },
];

export default function FAQPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", labelKey: "app.faqs.page.all" },
    { id: "general", labelKey: "app.faqs.page.general" },
    { id: "programs", labelKey: "app.faqs.page.programs" },
    { id: "donations", labelKey: "app.faqs.page.donations" },
    { id: "volunteering", labelKey: "app.faqs.page.volunteering" },
  ];

  const filteredFaqs = faqData.filter((item) => {
    // filter by category
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }
    // filter by search term
    if (searchTerm.trim() !== "") {
      const question = t(item.questionKey).toLowerCase();
      const answer = t(item.answerKey).toLowerCase();
      const term = searchTerm.toLowerCase();
      return question.includes(term) || answer.includes(term);
    }
    return true;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="pt-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-950 text-white py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            {t("app.faqs.page.title")}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            {t("app.faqs.page.subtitle")}
          </p>
        </div>
      </section>

      {/* Main FAQ Content Section */}
      <Section className="bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Search Bar & Categories Container */}
          <div className="mb-10 space-y-6">
            {/* Search Input */}
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("app.faqs.page.searchPlaceholder")}
                className="w-full pl-12 pr-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-md transition-all"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-primary-300" />
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenIndex(null); // Close accordion on category switch
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-gradient-accent text-white shadow-md scale-105"
                        : "bg-slate-800 text-primary-200 hover:bg-slate-700/80 hover:text-white"
                    }`}
                  >
                    {t(cat.labelKey)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <Card className="p-8">
            <div className="divide-y divide-slate-700/50">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <FAQAccordionItem
                      key={idx}
                      question={t(faq.questionKey)}
                      answer={t(faq.answerKey)}
                      isOpen={isOpen}
                      onToggle={() => toggleAccordion(idx)}
                    />
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="mx-auto h-12 w-12 text-primary-400 mb-4 animate-bounce-light" />
                  <p className="text-lg font-semibold text-white mb-2">
                    {t("app.faqs.page.noResults")}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </Section>
    </main>
  );
}

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left py-2 group focus:outline-none cursor-pointer"
      >
        <span className="font-heading font-bold text-base md:text-lg text-white group-hover:text-accent-400 transition-colors flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-accent-500 shrink-0 mt-0.5 group-hover:animate-pulse" />
          {question}
        </span>
        <span className="ml-4 flex-shrink-0 text-accent-500">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-primary-200 mt-3 pl-8 text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
