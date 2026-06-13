"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Filter,
  Sparkles,
  Inbox,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

interface TranslatedField {
  en: string;
  hi: string;
}

interface DocumentResource {
  id: string;
  title: TranslatedField;
  category: TranslatedField;
  type: string;
  size: string;
  description: TranslatedField;
  downloadUrl: string;
  author: TranslatedField;
}

const resourcesData: DocumentResource[] = [
  {
    id: "1",
    title: { en: "Introduction to Python Programming", hi: "पायथन प्रोग्रामिंग का परिचय" },
    category: { en: "Computer Science", hi: "कंप्यूटर विज्ञान" },
    type: "PDF",
    size: "3.8 MB",
    description: { en: "A beginner-friendly guide to coding, variables, loops, and functions in Python.", hi: "पायथन में कोडिंग, वेरिएबल, लूप और फ़ंक्शंस के लिए एक शुरुआती-अनुकूल मार्गदर्शिका।" },
    downloadUrl: "#",
    author: { en: "Nextgen Tech Team", hi: "नेक्स्टजेन टेक टीम" },
  },
  {
    id: "2",
    title: { en: "Class 10 Mathematics Study Guide", hi: "कक्षा 10 गणित अध्ययन मार्गदर्शिका" },
    category: { en: "Mathematics", hi: "गणित" },
    type: "PDF",
    size: "5.4 MB",
    description: { en: "Important formulas, theorems, and solved question sets for Class 10 Board preparation.", hi: "कक्षा 10 बोर्ड की तैयारी के लिए महत्वपूर्ण सूत्र, प्रमेय और हल किए गए प्रश्न सेट।" },
    downloadUrl: "#",
    author: { en: "Ramesh Negi", hi: "रमेश नेगी" },
  },
  {
    id: "3",
    title: { en: "Introduction to HTML & CSS", hi: "HTML और CSS का परिचय" },
    category: { en: "Computer Science", hi: "कंप्यूटर विज्ञान" },
    type: "PDF",
    size: "2.1 MB",
    description: { en: "Master the building blocks of web development. Includes practical examples and cheatsheets.", hi: "वेब विकास के बुनियादी घटकों में महारत हासिल करें। व्यावहारिक उदाहरण और चीटशीट शामिल हैं।" },
    downloadUrl: "#",
    author: { en: "Nextgen Tech Team", hi: "नेक्स्टजेन टेक टीम" },
  },
  {
    id: "4",
    title: { en: "General Science Question Bank", hi: "सामान्य विज्ञान प्रश्न बैंक" },
    category: { en: "Science", hi: "विज्ञान" },
    type: "PDF",
    size: "4.7 MB",
    description: { en: "Comprehensive physics, chemistry, and biology question bank for high school students.", hi: "हाई स्कूल के छात्रों के लिए व्यापक भौतिकी, रसायन विज्ञान और जीव विज्ञान प्रश्न बैंक।" },
    downloadUrl: "#",
    author: { en: "Nextgen Science Dept", hi: "नेक्स्टजेन विज्ञान विभाग" },
  },
  {
    id: "5",
    title: { en: "English Grammar Handbook", hi: "अंग्रेजी व्याकरण हैंडबुक" },
    category: { en: "Languages", hi: "भाषाएँ" },
    type: "PDF",
    size: "1.9 MB",
    description: { en: "Essential grammar rules, usage conventions, and vocabulary building practice exercises.", hi: "आवश्यक व्याकरण नियम, उपयोग की परंपराएं और शब्दावली निर्माण अभ्यास कार्य।" },
    downloadUrl: "#",
    author: { en: "Pooja Sharma", hi: "पूजा शर्मा" },
  },
  {
    id: "6",
    title: { en: "Web Development Roadmap 2026", hi: "वेब डेवलपमेंट रोडमैप 2026" },
    category: { en: "Computer Science", hi: "कंप्यूटर विज्ञान" },
    type: "PDF",
    size: "1.2 MB",
    description: { en: "An interactive pathway showing necessary milestones for frontend, backend, and fullstack engineering.", hi: "फ्रंटएंड, बैकएंड और फुलस्टैक इंजीनियरिंग के लिए आवश्यक मील के पत्थर दिखाने वाला एक इंटरैक्टिव मार्ग।" },
    downloadUrl: "#",
    author: { en: "Industry Advisory Council", hi: "उद्योग सलाहकार परिषद" },
  },
  {
    id: "7",
    title: { en: "Class 12 Physics Notes", hi: "कक्षा 12 भौतिकी नोट्स" },
    category: { en: "Science", hi: "विज्ञान" },
    type: "PDF",
    size: "6.2 MB",
    description: { en: "Detailed syllabus notes covering electrostatics, electromagnetic induction, optics, and modern physics.", hi: "स्थिरवैद्युतिकी, विद्युत चुंबकीय प्रेरण, प्रकाशिकी और आधुनिक भौतिकी को कवर करने वाले विस्तृत पाठ्यक्रम नोट्स।" },
    downloadUrl: "#",
    author: { en: "Dr. S. K. Bhatt", hi: "डॉ. एस. के. भट्ट" },
  },
  {
    id: "8",
    title: { en: "Basic Digital Literacy Coursebook", hi: "बुनियादी डिजिटल साक्षरता पाठ्यक्रम पुस्तक" },
    category: { en: "Digital Literacy", hi: "डिजिटल साक्षरता" },
    type: "PDF",
    size: "3.1 MB",
    description: { en: "Fundamental digital training: operating systems, web browsing, emailing, and online safety practices.", hi: "मौलिक डिजिटल प्रशिक्षण: ऑपरेटिंग सिस्टम, वेब ब्राउज़िंग, ईमेल और ऑनलाइन सुरक्षा प्रथाएं।" },
    downloadUrl: "#",
    author: { en: "Literacy Committee", hi: "साक्षरता समिति" },
  },
];

const categories = [
  { id: "All", label: { en: "All", hi: "सभी" } },
  { id: "Computer Science", label: { en: "Computer Science", hi: "कंप्यूटर विज्ञान" } },
  { id: "Mathematics", label: { en: "Mathematics", hi: "गणित" } },
  { id: "Science", label: { en: "Science", hi: "विज्ञान" } },
  { id: "Languages", label: { en: "Languages", hi: "भाषाएँ" } },
  { id: "Digital Literacy", label: { en: "Digital Literacy", hi: "डिजिटल साक्षरता" } },
];

export default function LibraryPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [requestBookTitle, setRequestBookTitle] = useState("");
  const [requestBookCategory, setRequestBookCategory] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesSearch =
        t(item.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(item.description).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(item.author).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category.en === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, t]);

  const handleDownload = (title: string) => {
    toast.success(t({ en: `Starting download for: ${title}`, hi: `${title} के लिए डाउनलोड शुरू हो रहा है...` }));
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestBookTitle) return;
    setRequestLoading(true);
    setTimeout(() => {
      setRequestLoading(false);
      setRequestBookTitle("");
      setRequestBookCategory("");
      toast.success(
        t({
          en: "Thank you! Your book/notes request has been logged. We'll look into adding it.",
          hi: "धन्यवाद! आपकी पुस्तक/नोट्स का अनुरोध दर्ज कर लिया गया है। हम इसे जोड़ने पर विचार करेंगे।",
        })
      );
    }, 1200);
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-20 pt-24 text-slate-100">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-955 text-white py-16 dark:bg-primary-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            {t({ en: "Digital Library", hi: "डिजिटल लाइब्रेरी" })}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            {t({
              en: "Free access to textbook solutions, notes, cheat sheets, and books prepared by volunteers and educators to support your educational journey.",
              hi: "आपकी शैक्षिक यात्रा का समर्थन करने के लिए स्वयंसेवकों और शिक्षकों द्वारा तैयार की गई पाठ्यपुस्तक समाधानों, नोट्स, चीट शीट्स और पुस्तकों तक निःशुल्क पहुँच।",
            })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar - Filters */}
          <aside className="bg-slate-800 rounded-2xl p-6 border border-slate-700/80 shadow-md">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <Filter className="h-5 w-5 text-accent-500" /> {t({ en: "Filter Resources", hi: "संसाधन फ़िल्टर करें" })}
            </h2>
            <div className="space-y-1.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                      : "text-primary-300 hover:bg-slate-700/50"
                  }`}
                >
                  {t(category.label)}
                </button>
              ))}
            </div>

            {/* Request a Resource Box */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5 mb-3">
                <HelpCircle className="h-4 w-4 text-accent-500" /> {t({ en: "Can't find a book?", hi: "किताब नहीं मिल रही?" })}
              </h3>
              <p className="text-xs text-primary-400 leading-relaxed mb-4">
                {t({
                  en: "Let us know what notes or reference books you need, and our community will try to find it for you!",
                  hi: "हमें बताएं कि आपको किन नोट्स या संदर्भ पुस्तकों की आवश्यकता है, और हमारा समुदाय उन्हें आपके लिए खोजने का प्रयास करेगा!",
                })}
              </p>
              <form onSubmit={handleRequestSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder={t({ en: "Book or topic title", hi: "पुस्तक या विषय का शीर्षक" })}
                  required
                  value={requestBookTitle}
                  onChange={(e) => setRequestBookTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-primary-550 focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-inner"
                />
                <select
                  value={requestBookCategory}
                  onChange={(e) => setRequestBookCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-primary-550 focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-inner cursor-pointer"
                >
                  <option value="">{t({ en: "Select Category (Optional)", hi: "श्रेणी चुनें (वैकल्पिक)" })}</option>
                  {categories.slice(1).map((c) => (
                    <option key={c.id} value={c.id}>
                      {t(c.label)}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={requestLoading}
                  className="w-full text-center bg-slate-750 hover:bg-slate-700 text-white font-semibold text-xs py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {requestLoading ? t({ en: "Submitting...", hi: "जमा किया जा रहा है..." }) : t({ en: "Request Document", hi: "दस्तावेज़ अनुरोध" })}
                </button>
              </form>
            </div>
          </aside>

          {/* Right Area - Search & Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Panel */}
            <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700/80 shadow-md flex items-center gap-3">
              <Search className="h-5 w-5 text-primary-400 shrink-0" />
              <input
                type="text"
                placeholder={t({ en: "Search resources by title, description, or author...", hi: "शीर्षक, विवरण या लेखक द्वारा संसाधनों की खोज करें..." })}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-primary-500 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-accent-400 hover:text-accent-300 font-semibold px-2 cursor-pointer"
                >
                  {t({ en: "Clear", hi: "साफ़ करें" })}
                </button>
              )}
            </div>

            {/* Resources Grid */}
            <AnimatePresence mode="popLayout">
              {filteredResources.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredResources.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-slate-800 rounded-2xl border border-slate-700/80 p-6 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent-500 transition-all duration-300 group"
                    >
                      <div>
                        {/* Tags */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-400 bg-accent-950/20 px-2.5 py-1 rounded-full">
                            <Sparkles className="h-3 w-3" /> {t(item.category)}
                          </span>
                          <span className="text-[10px] font-bold tracking-wider text-primary-450 uppercase flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" /> {item.type} • {item.size}
                          </span>
                        </div>

                        {/* Title & Author */}
                        <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-accent-500 transition-colors">
                          {t(item.title)}
                        </h3>
                        <p className="text-xs text-primary-400 mb-4">
                          {t({ en: "Prepared by: ", hi: "तैयारकर्ता: " })}<span className="font-semibold">{t(item.author)}</span>
                        </p>

                        {/* Description */}
                        <p className="text-sm text-primary-300 leading-relaxed line-clamp-3">
                          {t(item.description)}
                        </p>
                      </div>

                      {/* Download Section */}
                      <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                        <span className="text-xs text-primary-400 font-medium">
                          {t({ en: "Free License", hi: "निःशुल्क लाइसेंस" })}
                        </span>
                        <button
                          onClick={() => handleDownload(t(item.title))}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-slate-700 text-white rounded-xl hover:bg-accent-500 dark:hover:bg-accent-600 transition-colors shadow cursor-pointer"
                        >
                          {t({ en: "Download", hi: "डाउनलोड करें" })} <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-800 rounded-2xl border border-slate-700/80 p-12 text-center shadow-md flex flex-col items-center justify-center"
                >
                  <Inbox className="h-16 w-16 text-slate-600 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {t({ en: "No resources found", hi: "कोई संसाधन नहीं मिले" })}
                  </h3>
                  <p className="text-sm text-primary-450 max-w-sm mb-6">
                    {t({
                      en: `We couldn't find any documents matching "${searchQuery}" in the "${selectedCategory}" category.`,
                      hi: `हमें "${selectedCategory}" श्रेणी में "${searchQuery}" से मेल खाने वाला कोई दस्तावेज़ नहीं मिला।`,
                    })}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t({ en: "Reset filters", hi: "फ़िल्टर रीसेट करें" })}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
