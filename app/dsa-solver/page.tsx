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
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface DSAProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Array" | "Linked List" | "Stack" | "Binary Search";
  description: string;
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
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
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
    title: "Reverse Linked List",
    difficulty: "Medium",
    category: "Linked List",
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
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
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and closed in the correct order.",
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
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.",
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
    setConsoleOutput("Compiling and running against test cases...");
    setOutputStatus("idle");

    setTimeout(() => {
      setRunLoading(false);
      setOutputStatus("success");
      setConsoleOutput(
        `⚡ Execution Successful!\n\nTest Case 1:\nInput:  ${activeProblem.inputFormat}\nOutput: ${activeProblem.expectedOutput}\n\nAll test cases passed (Time: 4ms, Memory: 8.2MB)`
      );
      toast.success("Code executed successfully!");
    }, 1200);
  };

  const handleSubmitCode = () => {
    setSubmitLoading(true);
    setConsoleOutput("Submitting code to judge...");
    setOutputStatus("idle");

    setTimeout(() => {
      setSubmitLoading(false);
      setOutputStatus("success");
      setConsoleOutput(
        `🎉 All tests passed!\n\nStatus: Accepted\nRuntime: 2ms (Beats 98.4% of submissions)\nMemory: 8.1MB (Beats 92.6% of submissions)`
      );
      toast.success("Congratulations! Problem Solved!");
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 min-h-screen pb-20 pt-24">
      {/* Header */}
      <section className="relative overflow-hidden bg-primary-900 text-white py-16 dark:bg-primary-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            DSA Problem Solver
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-6">
            Practice core programming problems, learn algorithm patterns, and run solutions inside our interactive environment.
          </p>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 w-fit">
            <Sparkles className="h-5 w-5 text-accent-400" />
            <span className="text-xs font-semibold">Workspace Live Sandbox</span>
          </div>
        </div>
      </section>

      {/* Workspace Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left panel — Problems List & Details (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Problems list */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700/80 p-5 shadow-md">
              <h2 className="text-base font-bold text-primary-900 dark:text-white flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-accent-500" /> Select a Challenge
              </h2>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {dsaProblems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProblemChange(p)}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      activeProblem.id === p.id
                        ? "bg-primary-900 border-primary-900 text-white shadow-md"
                        : "bg-slate-50 dark:bg-slate-900/40 border-primary-50 dark:border-slate-800 text-primary-700 dark:text-primary-300 hover:bg-slate-100 dark:hover:bg-slate-700/35"
                    }`}
                  >
                    <span>{p.title}</span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        p.difficulty === "Easy"
                          ? activeProblem.id === p.id
                            ? "bg-white/20 text-white"
                            : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                          : activeProblem.id === p.id
                          ? "bg-white/20 text-white"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Details */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700/80 p-6 shadow-md flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-accent-700 dark:text-accent-400 bg-accent-50 dark:bg-accent-950/20 px-2 py-0.5 rounded">
                  {activeProblem.category}
                </span>
                <span
                  className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded ${
                    activeProblem.difficulty === "Easy"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                  }`}
                >
                  {activeProblem.difficulty}
                </span>
              </div>
              <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-4">
                {activeProblem.title}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-xs text-primary-750 dark:text-primary-300 leading-relaxed mb-6 space-y-3 whitespace-pre-line">
                <p>{activeProblem.description}</p>
              </div>

              {/* Example Block */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-primary-50 dark:border-slate-800 text-[11px] font-mono leading-normal shadow-inner">
                <div>
                  <span className="text-accent-600 dark:text-accent-400 font-bold">Example Input:</span>
                  <p className="text-primary-800 dark:text-primary-200 mt-0.5">{activeProblem.exampleInput}</p>
                </div>
                <div className="pt-2 border-t border-primary-100 dark:border-slate-800">
                  <span className="text-accent-600 dark:text-accent-400 font-bold">Example Output:</span>
                  <p className="text-primary-800 dark:text-primary-200 mt-0.5">{activeProblem.exampleOutput}</p>
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
                  <span className="text-xs font-bold text-slate-300">Playground</span>
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
                  {runLoading ? "Running..." : (
                    <>
                      Run Code <Play className="h-3 w-3 fill-slate-200" />
                    </>
                  )}
                </button>
                <button
                  onClick={handleSubmitCode}
                  disabled={runLoading || submitLoading}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitLoading ? "Submitting..." : (
                    <>
                      Submit Solution <CheckCircle2 className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Test Results Console */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-lg min-h-[140px] flex flex-col justify-between">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 mb-3">
                <Terminal className="h-3.5 w-3.5 text-accent-500" />
                <span className="text-xs font-bold text-slate-350">Console Output</span>
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
                  <span className="text-slate-500 italic">Run your code to see the test results here.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
