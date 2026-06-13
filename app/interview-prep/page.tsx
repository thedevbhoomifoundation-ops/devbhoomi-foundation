"use client";

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
  ArrowLeft,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

interface InterviewQuestion {
  id: string;
  question: string;
  category: "frontend" | "backend" | "dsa" | "behavioral";
  difficulty: "Easy" | "Medium" | "Hard";
  answer: string;
  codeSnippet?: string;
}

const interviewQuestions: InterviewQuestion[] = [
  {
    id: "1",
    question: "What is a closure in JavaScript?",
    category: "frontend",
    difficulty: "Medium",
    answer: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has returned.",
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
    question: "Explain the difference between SQL and NoSQL databases.",
    category: "backend",
    difficulty: "Easy",
    answer: "SQL databases are relational, table-based, have predefined schema, and scale vertically (buying bigger servers). NoSQL databases are non-relational, document/key-value/graph-based, have dynamic schemas, and scale horizontally (adding more servers).",
  },
  {
    id: "3",
    question: "How do you detect a cycle in a linked list?",
    category: "dsa",
    difficulty: "Medium",
    answer: "You can detect a cycle using Floyd's Cycle-Finding Algorithm (also known as the Tortoise and the Hare algorithm). You use two pointers: a slow pointer that moves 1 step at a time, and a fast pointer that moves 2 steps at a time. If there is a cycle, the fast pointer will eventually meet the slow pointer. If they hit null/end, there is no cycle.",
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
    question: "How do you handle conflict with a co-worker or teammate?",
    category: "behavioral",
    difficulty: "Easy",
    answer: "Using the STAR method (Situation, Task, Action, Result): I stay calm, listen actively to their perspective without interrupting, focus on the objective/problem rather than personal feelings, identify a compromise or shared goal, and check in later to ensure a positive working relationship. For example, when a teammate and I disagreed on code architecture, we listed the pros and cons of both, consulted senior guidelines, and chose the one that met performance requirements better.",
  },
  {
    id: "5",
    question: "What are React hooks, and why were they introduced?",
    category: "frontend",
    difficulty: "Medium",
    answer: "Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They were introduced in React 16.8 to resolve class component issues: reusing stateful logic without changing component hierarchy, avoiding complex lifecycle methods, and keeping related logic grouped together.",
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
  { id: "all", label: "All Topics", icon: BookOpen },
  { id: "frontend", label: "Frontend", icon: Terminal },
  { id: "backend", label: "Backend", icon: Cpu },
  { id: "dsa", label: "DSA Concepts", icon: Terminal },
  { id: "behavioral", label: "Behavioral / HR", icon: Users },
];

export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchesTab = activeTab === "all" || q.category === activeTab;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 min-h-screen pb-20 pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 text-white py-16 dark:bg-primary-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-sm font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            Interview Preparation Portal
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            Master your coding, system design, and behavioral interviews with standard interview questions, cheat sheets, and structured answers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
        {/* Prep Tips banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-primary-100 dark:border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-950/20 flex items-center justify-center text-accent-600 dark:text-accent-400 shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-primary-900 dark:text-white text-sm mb-1">STAR Method</h3>
              <p className="text-xs text-primary-600 dark:text-primary-300 leading-relaxed">
                Answer behavioral questions with Situation, Task, Action, and Result.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-primary-100 dark:border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-primary-900 dark:text-white text-sm mb-1">Explain First</h3>
              <p className="text-xs text-primary-600 dark:text-primary-300 leading-relaxed">
                Before writing DSA solutions, explain your logic, time & space complexities.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-primary-100 dark:border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-primary-900 dark:text-white text-sm mb-1">Clean Code</h3>
              <p className="text-xs text-primary-600 dark:text-primary-300 leading-relaxed">
                Write readable, self-documenting code with meaningful variable names.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-primary-100 dark:border-slate-700/80 shadow-md flex items-center gap-3">
            <Search className="h-5 w-5 text-primary-400 shrink-0" />
            <input
              type="text"
              placeholder="Search interview questions by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-primary-900 dark:text-white placeholder-primary-400 dark:placeholder-primary-500 focus:outline-none text-sm"
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
                      : "bg-white dark:bg-slate-800 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
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
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700/80 shadow-sm overflow-hidden"
                  >
                    {/* Header/Question Trigger */}
                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-750/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <span
                          className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md ${
                            q.difficulty === "Easy"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                              : q.difficulty === "Medium"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                          }`}
                        >
                          {q.difficulty}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-primary-900 dark:text-white leading-tight group-hover:text-accent-500 transition-colors">
                          {q.question}
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
                          className="border-t border-primary-50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/10 px-6 py-5"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-1.5">
                                Explanation
                              </h4>
                              <p className="text-sm text-primary-800 dark:text-primary-250 leading-relaxed">
                                {q.answer}
                              </p>
                            </div>

                            {q.codeSnippet && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-1.5">
                                  Example Code
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
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700/80 p-12 text-center shadow-md">
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  No interview questions found matching &quot;{searchQuery}&quot;. Try different keywords.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
