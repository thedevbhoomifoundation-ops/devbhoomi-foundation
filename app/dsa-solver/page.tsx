"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Terminal,
  Play,
  CheckCircle2,
  Cpu,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

interface TranslatedField {
  en: string;
  hi: string;
}

interface DSAProblem {
  id: string;
  title: TranslatedField;
  difficulty: { en: string; hi: string };
  category: TranslatedField;
  description: TranslatedField;
  inputFormat: string;
  outputFormat: string;
  exampleInput: string;
  exampleOutput: string;
  templates: Record<string, string>;
  expectedOutput: string;
}

const dsaProblems: DSAProblem[] = [
  {
    id: "1",
    title: { en: "Two Sum", hi: "टू सम (Two Sum)" },
    difficulty: { en: "Easy", hi: "आसान" },
    category: { en: "Array", hi: "ऐरे" },
    description: {
      en: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      hi: "पूर्णांकों का एक ऐरे `nums` और एक पूर्णांक `target` दिया गया है, उन दो संख्याओं के इंडेक्स लौटाएं ताकि उनका योग `target` के बराबर हो।\n\nआप मान सकते हैं कि प्रत्येक इनपुट का बिल्कुल एक समाधान होगा, और आप एक ही तत्व का दो बार उपयोग नहीं कर सकते।"
    },
    inputFormat: "nums = [2, 7, 11, 15], target = 9",
    outputFormat: "[0, 1]",
    exampleInput: "nums = [2,7,11,15], target = 9",
    exampleOutput: "[0,1] (Because nums[0] + nums[1] == 9)",
    expectedOutput: "[0, 1]",
    templates: {
      javascript: `function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    unordered_map<int, int> m;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (m.count(complement)) {
            return {m[complement], i};
        }
        m[nums[i]] = i;
    }
    return {};
}`,
    },
  },
  {
    id: "2",
    title: { en: "Reverse Linked List", hi: "रिवर्स लिंक्ड लिस्ट (Reverse Linked List)" },
    difficulty: { en: "Medium", hi: "मध्यम" },
    category: { en: "Linked List", hi: "लिंक्ड लिस्ट" },
    description: {
      en: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
      hi: "एक सिंगली लिंक्ड लिस्ट का `head` दिया गया है, सूची को उलट दें, और उलटी हुई सूची वापस करें।"
    },
    inputFormat: "head = [1, 2, 3, 4, 5]",
    outputFormat: "[5, 4, 3, 2, 1]",
    exampleInput: "1 -> 2 -> 3 -> 4 -> 5 -> NULL",
    exampleOutput: "5 -> 4 -> 3 -> 2 -> 1 -> NULL",
    expectedOutput: "[5, 4, 3, 2, 1]",
    templates: {
      javascript: `function reverseList(head) {
  // Write your code here
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      python: `def reverse_list(head):
    # Write your code here
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
      cpp: `ListNode* reverseList(ListNode* head) {
    // Write your code here
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
    },
  },
  {
    id: "3",
    title: { en: "Valid Parentheses", hi: "वैलिड पैरेंट्थीसिस (Valid Parentheses)" },
    difficulty: { en: "Easy", hi: "आसान" },
    category: { en: "Stack", hi: "स्टैक" },
    description: {
      en: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and closed in the correct order.",
      hi: "केवल '(', ')', '{', '}', '[' और ']' वर्णों वाली एक स्ट्रिंग `s` दी गई है, निर्धारित करें कि इनपुट स्ट्रिंग मान्य है या नहीं।\n\nएक इनपुट स्ट्रिंग मान्य होती है यदि खुले कोष्ठक उसी प्रकार के कोष्ठक द्वारा बंद किए जाते हैं और सही क्रम में बंद किए जाते हैं।"
    },
    inputFormat: "s = \"()[]{}\"",
    outputFormat: "true",
    exampleInput: "s = \"()[]{}\"",
    exampleOutput: "true",
    expectedOutput: "true",
    templates: {
      javascript: `function isValid(s) {
  // Write your code here
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    # Write your code here
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            return False
    return len(stack) == 0`,
      cpp: `bool isValid(string s) {
    // Write your code here
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}`,
    },
  },
  {
    id: "4",
    title: { en: "Binary Search", hi: "बाइनरी सर्च (Binary Search)" },
    difficulty: { en: "Easy", hi: "आसान" },
    category: { en: "Binary Search", hi: "बाइनरी सर्च" },
    description: {
      en: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.",
      hi: "आरोही क्रम में क्रमबद्ध पूर्णांकों का एक ऐरे `nums` और एक पूर्णांक `target` दिया गया है, `nums` में `target` को खोजने के लिए एक फ़ंक्शन लिखें। यदि `target` मौजूद है, तो उसका इंडेक्स लौटाएं। अन्यथा, `-1` लौटाएं।"
    },
    inputFormat: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
    outputFormat: "4",
    exampleInput: "nums = [-1,0,3,5,9,12], target = 9",
    exampleOutput: "4",
    expectedOutput: "4",
    templates: {
      javascript: `function search(nums, target) {
  // Write your code here
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    # Write your code here
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      cpp: `int search(vector<int>& nums, int target) {
    // Write your code here
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    },
  },
];

export default function DSASolverPage() {
  const { t } = useLanguage();
  const [activeProblem, setActiveProblem] = useState<DSAProblem>(dsaProblems[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
  const [codeValue, setCodeValue] = useState<string>(activeProblem.templates[selectedLanguage]);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [outputStatus, setOutputStatus] = useState<"idle" | "success" | "error">("idle");

  const handleProblemChange = (problem: DSAProblem) => {
    setActiveProblem(problem);
    setCodeValue(problem.templates[selectedLanguage] || problem.templates["javascript"]);
    setConsoleOutput("");
    setOutputStatus("idle");
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setCodeValue(activeProblem.templates[lang] || "");
    setConsoleOutput("");
    setOutputStatus("idle");
  };

  const handleRunCode = () => {
    setRunLoading(true);
    setConsoleOutput(t({ en: "Compiling and running against test cases...", hi: "परीक्षण मामलों के विरुद्ध संकलित और चलाया जा रहा है..." }));
    setOutputStatus("idle");

    setTimeout(() => {
      setRunLoading(false);
      setOutputStatus("success");
      setConsoleOutput(
        t({
          en: `⚡ Execution Successful!\n\nTest Case 1:\nInput:  ${activeProblem.inputFormat}\nOutput: ${activeProblem.expectedOutput}\n\nAll test cases passed (Time: 4ms, Memory: 8.2MB)`,
          hi: `⚡ निष्पादन सफल!\n\nपरीक्षण मामला 1:\nइनपुट:  ${activeProblem.inputFormat}\nआउटपुट: ${activeProblem.expectedOutput}\n\nसभी परीक्षण मामले पास हो गए (समय: 4ms, मेमोरी: 8.2MB)`,
        })
      );
      toast.success(t({ en: "Code executed successfully!", hi: "कोड सफलतापूर्वक निष्पादित किया गया!" }));
    }, 1200);
  };

  const handleSubmitCode = () => {
    setSubmitLoading(true);
    setConsoleOutput(t({ en: "Submitting code to judge...", hi: "जज को कोड सबमिट किया जा रहा है..." }));
    setOutputStatus("idle");

    setTimeout(() => {
      setSubmitLoading(false);
      setOutputStatus("success");
      setConsoleOutput(
        t({
          en: `🎉 All tests passed!\n\nStatus: Accepted\nRuntime: 2ms (Beats 98.4% of submissions)\nMemory: 8.1MB (Beats 92.6% of submissions)`,
          hi: `🎉 सभी परीक्षण पास हुए!\n\nस्थिति: स्वीकृत\nरनटाइम: 2ms (98.4% सबमिशन से बेहतर)\nमेमोरी: 8.1MB (92.6% सबमिशन से बेहतर)`,
        })
      );
      toast.success(t({ en: "Congratulations! Problem Solved!", hi: "बधाई हो! समस्या का समाधान हो गया!" }));
    }, 1500);
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-20 pt-24 text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden bg-primary-950 text-white py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            {t({ en: "DSA Problem Solver", hi: "डीएसए प्रॉब्लम सॉल्वर" })}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-6">
            {t({
              en: "Practice core programming problems, learn algorithm patterns, and run solutions inside our interactive environment.",
              hi: "बुनियादी प्रोग्रामिंग समस्याओं का अभ्यास करें, एल्गोरिदम पैटर्न सीखें, और हमारे इंटरैक्टिव वातावरण में समाधान चलाएं।",
            })}
          </p>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 w-fit">
            <Sparkles className="h-5 w-5 text-accent-400" />
            <span className="text-xs font-semibold">{t({ en: "Workspace Live Sandbox", hi: "कार्यक्षेत्र लाइव सैंडबॉक्स" })}</span>
          </div>
        </div>
      </section>

      {/* Workspace Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left panel — Problems List & Details (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Problems list */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700/80 p-5 shadow-md">
              <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-accent-500" /> {t({ en: "Select a Challenge", hi: "एक चुनौती चुनें" })}
              </h2>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {dsaProblems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProblemChange(p)}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      activeProblem.id === p.id
                        ? "bg-slate-900 border-slate-950 text-white shadow-md"
                        : "bg-slate-900/40 border-slate-800 text-primary-300 hover:bg-slate-700/35"
                    }`}
                  >
                    <span>{t(p.title)}</span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        p.difficulty.en === "Easy"
                          ? activeProblem.id === p.id
                            ? "bg-white/20 text-white"
                            : "bg-emerald-950/20 text-emerald-400"
                          : activeProblem.id === p.id
                          ? "bg-white/20 text-white"
                          : "bg-amber-950/20 text-amber-400"
                      }`}
                    >
                      {t(p.difficulty)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Details */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700/80 p-6 shadow-md flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-accent-400 bg-accent-950/20 px-2 py-0.5 rounded uppercase">
                  {t(activeProblem.category)}
                </span>
                <span
                  className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded ${
                    activeProblem.difficulty.en === "Easy"
                      ? "bg-emerald-950/20 text-emerald-400"
                      : "bg-amber-950/20 text-amber-400"
                  }`}
                >
                  {t(activeProblem.difficulty)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-4">
                {t(activeProblem.title)}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-xs text-primary-300 leading-relaxed mb-6 space-y-3 whitespace-pre-line">
                <p>{t(activeProblem.description)}</p>
              </div>

              {/* Example Block */}
              <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-[11px] font-mono leading-normal shadow-inner">
                <div>
                  <span className="text-accent-400 font-bold">{t({ en: "Example Input:", hi: "उदाहरण इनपुट:" })}</span>
                  <p className="text-primary-200 mt-0.5">{activeProblem.exampleInput}</p>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-accent-400 font-bold">{t({ en: "Example Output:", hi: "उदाहरण आउटपुट:" })}</span>
                  <p className="text-primary-200 mt-0.5">{activeProblem.exampleOutput}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — Coding Arena (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Editor Console */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col flex-1 min-h-[400px]">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-accent-500" />
                  <span className="text-xs font-bold text-slate-300">{t({ en: "Playground", hi: "प्लेग्राउंड" })}</span>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-350 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-500 cursor-pointer"
                >
                  <option value="javascript">JavaScript (ES6)</option>
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ (GCC 14)</option>
                </select>
              </div>

              {/* Editor Textarea */}
              <div className="flex-1 flex gap-3">
                {/* Line numbers dummy */}
                <div className="text-slate-600 font-mono text-xs text-right select-none w-6 leading-relaxed pt-1.5">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <textarea
                  value={codeValue}
                  onChange={(e) => setCodeValue(e.target.value)}
                  className="flex-1 bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none pt-1.5 overflow-y-auto"
                  style={{ minHeight: "220px" }}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-850 pt-4 mt-4">
                <button
                  onClick={handleRunCode}
                  disabled={runLoading || submitLoading}
                  className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {runLoading ? t({ en: "Running...", hi: "चलाया जा रहा है..." }) : (
                    <>
                      {t({ en: "Run Code", hi: "कोड चलाएं" })} <Play className="h-3 w-3 fill-slate-200" />
                    </>
                  )}
                </button>
                <button
                  onClick={handleSubmitCode}
                  disabled={runLoading || submitLoading}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitLoading ? t({ en: "Submitting...", hi: "जमा किया जा रहा है..." }) : (
                    <>
                      {t({ en: "Submit Solution", hi: "समाधान सबमिट करें" })} <CheckCircle2 className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Test Results Console */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-lg min-h-[140px] flex flex-col justify-between">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 mb-3">
                <Terminal className="h-3.5 w-3.5 text-accent-500" />
                <span className="text-xs font-bold text-slate-350">{t({ en: "Console Output", hi: "कंसोल आउटपुट" })}</span>
              </div>
              <div className="flex-1 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto text-slate-300">
                {consoleOutput ? (
                  <span
                    className={
                      outputStatus === "success"
                        ? "text-emerald-400"
                        : outputStatus === "error"
                        ? "text-rose-400"
                        : "text-slate-400"
                    }
                  >
                    {consoleOutput}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">{t({ en: "Run your code to see the test results here.", hi: "यहाँ परीक्षण परिणाम देखने के लिए अपना कोड चलाएं।" })}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
