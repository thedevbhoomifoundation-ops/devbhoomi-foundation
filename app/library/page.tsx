"use client";
import { useTranslation } from "react-i18next";

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
    title: "app.library.page.introductionToPythonProgram",
    category: "app.library.page.computerScience",
    type: "PDF",
    size: "3.8 MB",
    description: "app.library.page.aBeginnerfriendlyGuideToCo",
    downloadUrl: "#",
    author: "app.library.page.nextgenTechTeam",
  },
  {
    id: "2",
    title: "app.library.page.class10MathematicsStudyGui",
    category: "app.library.page.mathematics",
    type: "PDF",
    size: "5.4 MB",
    description: "app.library.page.importantFormulasTheoremsAn",
    downloadUrl: "#",
    author: "app.library.page.rameshNegi",
  },
  {
    id: "3",
    title: "app.library.page.introductionToHtmlCss",
    category: "app.library.page.computerScience",
    type: "PDF",
    size: "2.1 MB",
    description: "app.library.page.masterTheBuildingBlocksOf",
    downloadUrl: "#",
    author: "app.library.page.nextgenTechTeam",
  },
  {
    id: "4",
    title: "app.library.page.generalScienceQuestionBank",
    category: "app.library.page.science",
    type: "PDF",
    size: "4.7 MB",
    description: "app.library.page.comprehensivePhysicsChemistr",
    downloadUrl: "#",
    author: "app.library.page.nextgenScienceDept",
  },
  {
    id: "5",
    title: "app.library.page.englishGrammarHandbook",
    category: "app.library.page.languages",
    type: "PDF",
    size: "1.9 MB",
    description: "app.library.page.essentialGrammarRulesUsage",
    downloadUrl: "#",
    author: "app.library.page.poojaSharma",
  },
  {
    id: "6",
    title: "app.library.page.webDevelopmentRoadmap2026",
    category: "app.library.page.computerScience",
    type: "PDF",
    size: "1.2 MB",
    description: "app.library.page.anInteractivePathwayShowing",
    downloadUrl: "#",
    author: "app.library.page.industryAdvisoryCouncil",
  },
  {
    id: "7",
    title: "app.library.page.class12PhysicsNotes",
    category: "app.library.page.science",
    type: "PDF",
    size: "6.2 MB",
    description: "app.library.page.detailedSyllabusNotesCoveri",
    downloadUrl: "#",
    author: "app.library.page.drSKBhatt",
  },
  {
    id: "8",
    title: "app.library.page.basicDigitalLiteracyCourseb",
    category: "app.library.page.digitalLiteracy",
    type: "PDF",
    size: "3.1 MB",
    description: "app.library.page.fundamentalDigitalTrainingO",
    downloadUrl: "#",
    author: "app.library.page.literacyCommittee",
  },
];

const categories = [
  { id: "All", label: "app.library.page.all" },
  { id: "Computer Science", label: "app.library.page.computerScience" },
  { id: "Mathematics", label: "app.library.page.mathematics" },
  { id: "Science", label: "app.library.page.science" },
  { id: "Languages", label: "app.library.page.languages" },
  { id: "Digital Literacy", label: "app.library.page.digitalLiteracy" },
];

export default function LibraryPage() {
  const { t } = useTranslation();
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
    toast.success(t('app.library.page.startingDownloadForTitle'));
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
        t('app.library.page.thankYouYourBooknotesReque')
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
            {t('app.library.page.digitalLibrary')}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            {t('app.library.page.freeAccessToTextbookSoluti')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar - Filters */}
          <aside className="bg-slate-800 rounded-2xl p-6 border border-slate-700/80 shadow-md">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <Filter className="h-5 w-5 text-accent-500" /> {t('app.library.page.filterResources')}
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
                <HelpCircle className="h-4 w-4 text-accent-500" /> {t('app.library.page.cantFindABook')}
              </h3>
              <p className="text-xs text-primary-400 leading-relaxed mb-4">
                {t('app.library.page.letUsKnowWhatNotesOrRefe')}
              </p>
              <form onSubmit={handleRequestSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder={t('app.library.page.bookOrTopicTitle')}
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
                  <option value="">{t('app.library.page.selectCategoryOptional')}</option>
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
                  {requestLoading ? t('app.library.page.submitting') : t('app.library.page.requestDocument')}
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
                placeholder={t('app.library.page.searchResourcesByTitleDesc')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-primary-500 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-accent-400 hover:text-accent-300 font-semibold px-2 cursor-pointer"
                >
                  {t('app.library.page.clear')}
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
                          {t('app.library.page.preparedBy')}<span className="font-semibold">{t(item.author)}</span>
                        </p>

                        {/* Description */}
                        <p className="text-sm text-primary-300 leading-relaxed line-clamp-3">
                          {t(item.description)}
                        </p>
                      </div>

                      {/* Download Section */}
                      <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                        <span className="text-xs text-primary-400 font-medium">
                          {t('app.library.page.freeLicense')}
                        </span>
                        <button
                          onClick={() => handleDownload(t(item.title))}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-slate-700 text-white rounded-xl hover:bg-accent-500 dark:hover:bg-accent-600 transition-colors shadow cursor-pointer"
                        >
                          {t('app.library.page.download')} <Download className="h-3.5 w-3.5" />
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
                    {t('app.library.page.noResourcesFound')}
                  </h3>
                  <p className="text-sm text-primary-450 max-w-sm mb-6">
                    {t('app.library.page.weCouldntFindAnyDocuments')}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t('app.library.page.resetFilters')}
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
