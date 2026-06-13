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
  Briefcase,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

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
    question: { en: "What is a closure in JavaScript?", hi: "जावास्क्रिप्ट में क्लोजर (closure) क्या है?" },
    category: "frontend",
    difficulty: { en: "Medium", hi: "मध्यम" },
    answer: {
      en: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has returned.",
      hi: "क्लोजर एक फ़ंक्शन का अपने आस-पास की स्थिति (लेक्सिकल वातावरण) के संदर्भों के साथ बंडल (संलग्न) होने का संयोजन है। दूसरे शब्दों में, एक क्लोजर एक आंतरिक फ़ंक्शन को बाहरी फ़ंक्शन के दायरे (scope) तक पहुंच प्रदान करता है, भले ही बाहरी फ़ंक्शन वापस आ गया हो।"
    },
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
    question: { en: "Explain the difference between SQL and NoSQL databases.", hi: "SQL और NoSQL डेटाबेस के बीच अंतर स्पष्ट करें।" },
    category: "backend",
    difficulty: { en: "Easy", hi: "आसान" },
    answer: {
      en: "SQL databases are relational, table-based, have predefined schema, and scale vertically (buying bigger servers). NoSQL databases are non-relational, document/key-value/graph-based, have dynamic schemas, and scale horizontally (adding more servers).",
      hi: "SQL डेटाबेस रिलेशनल, टेबल-आधारित होते हैं, इनमें पूर्व-निर्धारित स्कीमा होता है, और वे वर्टिकली स्केल (बड़े सर्वर खरीदकर) होते हैं। NoSQL डेटाबेस नॉन-रिलेशनल, दस्तावेज़/की-वैल्यू/ग्राफ-आधारित होते हैं, इनमें डायनेमिक स्कीमा होते हैं, और वे हॉरिजॉन्टली स्केल (अधिक सर्वर जोड़कर) होते हैं।"
    },
  },
  {
    id: "3",
    question: { en: "How do you detect a cycle in a linked list?", hi: "आप एक लिंक्ड लिस्ट में चक्र (cycle) का पता कैसे लगाते हैं?" },
    category: "dsa",
    difficulty: { en: "Medium", hi: "मध्यम" },
    answer: {
      en: "You can detect a cycle using Floyd's Cycle-Finding Algorithm (also known as the Tortoise and the Hare algorithm). You use two pointers: a slow pointer that moves 1 step at a time, and a fast pointer that moves 2 steps at a time. If there is a cycle, the fast pointer will eventually meet the slow pointer. If they hit null/end, there is no cycle.",
      hi: "आप फ़्लॉइड के साइकिल-फाइंडिंग एल्गोरिदम (जिसे कछुआ और खरगोश एल्गोरिदम भी कहा जाता है) का उपयोग करके एक चक्र का पता लगा सकते हैं। आप दो पॉइंटर्स का उपयोग करते हैं: एक धीमा पॉइंटर जो एक बार में 1 कदम आगे बढ़ता है, और एक तेज़ पॉइंटर जो एक बार में 2 कदम आगे बढ़ता है। यदि कोई चक्र है, तो तेज़ पॉइंटर अंततः धीमे पॉइंटर से मिल जाएगा। यदि वे अंत (null) तक पहुँचते हैं, तो कोई चक्र नहीं है।"
    },
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
    question: { en: "How do you handle conflict with a co-worker or teammate?", hi: "आप किसी सहकर्मी या टीम के साथी के साथ संघर्ष (conflict) को कैसे संभालते हैं?" },
    category: "behavioral",
    difficulty: { en: "Easy", hi: "आसान" },
    answer: {
      en: "Using the STAR method (Situation, Task, Action, Result): I stay calm, listen actively to their perspective without interrupting, focus on the objective/problem rather than personal feelings, identify a compromise or shared goal, and check in later to ensure a positive working relationship. For example, when a teammate and I disagreed on code architecture, we listed the pros and cons of both, consulted senior guidelines, and chose the one that met performance requirements better.",
      hi: "STAR पद्धति (स्थिति, कार्य, क्रिया, परिणाम) का उपयोग करते हुए: मैं शांत रहता हूं, बिना किसी बाधा के सक्रिय रूप से उनके दृष्टिकोण को सुनता हूं, व्यक्तिगत भावनाओं के बजाय उद्देश्य/समस्या पर ध्यान केंद्रित करता हूं, एक समझौता या साझा लक्ष्य की पहचान करता हूं, और बाद में एक सकारात्मक कामकाजी संबंध सुनिश्चित करने के लिए जांच करता हूं। उदाहरण के लिए, जब एक टीम के साथी और मैं कोड आर्किटेक्चर पर असहमत थे, तो हमने दोनों के पक्ष और विपक्ष को सूचीबद्ध किया, वरिष्ठ दिशानिर्देशों से परामर्श किया, और उस एक को चुना जो प्रदर्शन आवश्यकताओं को बेहतर ढंग से पूरा करता था।"
    },
  },
  {
    id: "5",
    question: { en: "What are React hooks, and why were they introduced?", hi: "रिएक्ट हुक्स (React hooks) क्या हैं, और उन्हें क्यों पेश किया गया था?" },
    category: "frontend",
    difficulty: { en: "Medium", hi: "मध्यम" },
    answer: {
      en: "Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They were introduced in React 16.8 to resolve class component issues: reusing stateful logic without changing component hierarchy, avoiding complex lifecycle methods, and keeping related logic grouped together.",
      hi: "हुक्स ऐसे फ़ंक्शन हैं जो आपको फ़ंक्शन घटकों से रिएक्ट स्थिति और जीवनचक्र सुविधाओं से जुड़ने की अनुमति देते हैं। उन्हें क्लास घटकों की समस्याओं को हल करने के लिए रिएक्ट 16.8 में पेश किया गया था: घटक पदानुक्रम को बदले बिना स्टेटफुल तर्क का पुन: उपयोग करना, जटिल जीवनचक्र विधियों से बचना, और संबंधित तर्क को एक साथ समूहित रखना।"
    },
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
  { id: "all", label: { en: "All Topics", hi: "सभी विषय" }, icon: BookOpen },
  { id: "frontend", label: { en: "Frontend", hi: "फ्रंटएंड" }, icon: Terminal },
  { id: "backend", label: { en: "Backend", hi: "बैकएंड" }, icon: Cpu },
  { id: "dsa", label: { en: "DSA Concepts", hi: "डीएसए अवधारणाएं" }, icon: Terminal },
  { id: "behavioral", label: { en: "Behavioral / HR", hi: "व्यवहारिक / एचआर" }, icon: Users },
];

export default function InterviewPrepPage() {
  const { t } = useLanguage();
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
            {t({ en: "Interview Preparation Portal", hi: "साक्षात्कार तैयारी पोर्टल" })}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            {t({
              en: "Master your coding, system design, and behavioral interviews with standard interview questions, cheat sheets, and structured answers.",
              hi: "मानक साक्षात्कार प्रश्नों, चीट शीट्स और संरचित उत्तरों के साथ अपने कोडिंग, सिस्टम डिज़ाइन और व्यवहार संबंधी साक्षात्कार में महारत हासिल करें।",
            })}
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
                {t({ en: "STAR Method", hi: "STAR विधि" })}
              </h3>
              <p className="text-xs text-primary-300 leading-relaxed">
                {t({
                  en: "Answer behavioral questions with Situation, Task, Action, and Result.",
                  hi: "व्यवहार संबंधी प्रश्नों के उत्तर सिचुएशन (स्थिति), टास्क (कार्य), एक्शन (क्रिया) और रिजल्ट (परिणाम) के साथ दें।",
                })}
              </p>
            </div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-950/20 flex items-center justify-center text-blue-400 shrink-0">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">
                {t({ en: "Explain First", hi: "पहले समझाएं" })}
              </h3>
              <p className="text-xs text-primary-300 leading-relaxed">
                {t({
                  en: "Before writing DSA solutions, explain your logic, time & space complexities.",
                  hi: "डीएसए समाधान लिखने से पहले, अपने तर्क, समय और स्थान जटिलताओं को समझाएं।",
                })}
              </p>
            </div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/80 shadow-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/20 flex items-center justify-center text-emerald-450 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">
                {t({ en: "Clean Code", hi: "स्वच्छ कोड" })}
              </h3>
              <p className="text-xs text-primary-300 leading-relaxed">
                {t({
                  en: "Write readable, self-documenting code with meaningful variable names.",
                  hi: "अर्थपूर्ण चर (variable) नामों के साथ पठनीय, स्व-दस्तावेजी कोड लिखें।",
                })}
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
              placeholder={t({ en: "Search interview questions by keyword...", hi: "कीवर्ड द्वारा साक्षात्कार प्रश्न खोजें..." })}
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
                                {t({ en: "Explanation", hi: "स्पष्टीकरण" })}
                              </h4>
                              <p className="text-sm text-primary-300 leading-relaxed">
                                {t(q.answer)}
                              </p>
                            </div>

                            {q.codeSnippet && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-1.5">
                                  {t({ en: "Example Code", hi: "उदाहरण कोड" })}
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
                  {t({
                    en: `No interview questions found matching "${searchQuery}". Try different keywords.`,
                    hi: `"${searchQuery}" से मेल खाने वाला कोई साक्षात्कार प्रश्न नहीं मिला। विभिन्न कीवर्ड आज़माएं।`,
                  })}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

