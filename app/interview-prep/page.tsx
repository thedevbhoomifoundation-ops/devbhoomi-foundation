"use client";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  Terminal,
  Users,
  Award,
  Briefcase,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface TranslatedField {
  en: string;
  hi: string;
}

interface InterviewQuestion {
  id: string;
  question: TranslatedField;
  category: "frontend" | "backend" | "dsa" | "behavioral";
  difficulty: { en: string; hi: string };
  answer: TranslatedField;
  codeSnippet?: string;
}

const interviewQuestions: InterviewQuestion[] = [
  {
    id: "1",
    question: "app.interview-prep.page.whatIsAClosureInJavascrip",
    category: "frontend",
    difficulty: "app.interview-prep.page.medium",
    answer: "app.interview-prep.page.aClosureIsTheCombinationO",
    codeSnippet: `function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('Outer:', outerVariable);
    console.log('Inner:', innerVariable);
  }
}
const newFunction = outerFunction('outside');
newFunction('inside'); // Logs: Outer: outside, Inner: inside`,
  },
  {
    id: "2",
    question: "app.interview-prep.page.explainTheDifferenceBetween",
    category: "backend",
    difficulty: "app.interview-prep.page.easy",
    answer: "app.interview-prep.page.sqlDatabasesAreRelationalT",
  },
  {
    id: "3",
    question: "app.interview-prep.page.howDoYouDetectACycleInA",
    category: "dsa",
    difficulty: "app.interview-prep.page.medium",
    answer: "app.interview-prep.page.youCanDetectACycleUsingF",
    codeSnippet: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // Cycle detected
  }
  return false;
}`,
  },
  {
    id: "4",
    question: "app.interview-prep.page.howDoYouHandleConflictWit",
    category: "behavioral",
    difficulty: "app.interview-prep.page.easy",
    answer: "app.interview-prep.page.usingTheStarMethodSituatio",
  },
  {
    id: "5",
    question: "app.interview-prep.page.whatAreReactHooksAndWhyW",
    category: "frontend",
    difficulty: "app.interview-prep.page.medium",
    answer: "app.interview-prep.page.hooksAreFunctionsThatLetY",
    codeSnippet: `import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count is \${count}\`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
  },
];

const categoryTabs = [
  { id: "all", label: "app.interview-prep.page.allTopics", icon: BookOpen },
  { id: "frontend", label: "app.interview-prep.page.frontend", icon: Terminal },
  { id: "backend", label: "app.interview-prep.page.backend", icon: Cpu },
  { id: "dsa", label: "app.interview-prep.page.dsaConcepts", icon: Terminal },
  { id: "behavioral", label: "app.interview-prep.page.behavioralHr", icon: Users },
];

export default function InterviewPrepPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchesTab = activeTab === "all" || q.category === activeTab;
    const matchesSearch =
      t(q.question).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(q.answer).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-slate-900 min-h-screen pb-20 pt-24 text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-950 text-white py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            {t('app.interview-prep.page.interviewPreparationPortal')}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            {t('app.interview-prep.page.masterYourCodingSystemDesi')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
        {/* Prep Tips banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-950/20 flex items-center justify-center text-accent-400 shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">
                {t('app.interview-prep.page.starMethod')}
              </h3>
              <p className="text-xs text-primary-300 leading-relaxed">
                {t('app.interview-prep.page.answerBehavioralQuestionsWi')}
              </p>
            </div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-950/20 flex items-center justify-center text-blue-400 shrink-0">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">
                {t('app.interview-prep.page.explainFirst')}
              </h3>
              <p className="text-xs text-primary-300 leading-relaxed">
                {t('app.interview-prep.page.beforeWritingDsaSolutionsE')}
              </p>
            </div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/20 flex items-center justify-center text-emerald-450 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">
                {t('app.interview-prep.page.cleanCode')}
              </h3>
              <p className="text-xs text-primary-300 leading-relaxed">
                {t('app.interview-prep.page.writeReadableSelfdocumenting')}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700/80 shadow-md flex items-center gap-3">
            <Search className="h-5 w-5 text-primary-400 shrink-0" />
            <input
              type="text"
              placeholder={t('app.interview-prep.page.searchInterviewQuestionsBy')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-primary-500 focus:outline-none text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setExpandedId(null);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                      : "bg-slate-800 text-primary-300 border border-slate-700/80 hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t(tab.label)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions Accordion */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => {
                const isExpanded = expandedId === q.id;
                return (
                  <motion.div
                    key={q.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-slate-800 rounded-2xl border border-slate-700/80 shadow-sm overflow-hidden"
                  >
                    {/* Header/Question Trigger */}
                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group hover:bg-slate-750/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <span
                          className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md ${
                            q.difficulty.en === "Easy"
                              ? "bg-emerald-950/20 text-emerald-400"
                              : q.difficulty.en === "Medium"
                              ? "bg-amber-950/20 text-amber-400"
                              : "bg-rose-950/20 text-rose-400"
                          }`}
                        >
                          {t(q.difficulty)}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-accent-500 transition-colors">
                          {t(q.question)}
                        </h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-primary-400 group-hover:text-accent-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary-400 group-hover:text-accent-500" />
                      )}
                    </button>

                    {/* Answer Area */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-slate-700/50 bg-slate-900/40 px-6 py-5"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-1.5">
                                {t('app.interview-prep.page.explanation')}
                              </h4>
                              <p className="text-sm text-primary-300 leading-relaxed">
                                {t(q.answer)}
                              </p>
                            </div>

                            {q.codeSnippet && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-1.5">
                                  {t('app.interview-prep.page.exampleCode')}
                                </h4>
                                <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto border border-slate-800 shadow-inner">
                                  <code>{q.codeSnippet}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="bg-slate-800 rounded-2xl border border-slate-700/80 p-12 text-center shadow-md">
                <p className="text-sm text-primary-350">
                  {t('app.interview-prep.page.noInterviewQuestionsFoundM')}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

