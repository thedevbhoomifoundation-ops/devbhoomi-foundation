"use client";
import { useTranslation } from "react-i18next";

import { useState, useMemo } from "react";
import { Section, Card, Badge } from "@/components/ui";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface TranslatedField {
  en: string;
  hi: string;
}

interface Article {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const categories = [
  { id: "All", label: "app.blogs.page.all" },
  { id: "Education", label: "app.blogs.page.education" },
  { id: "Community", label: "app.blogs.page.community" },
  { id: "Technology", label: "app.blogs.page.technology" },
  { id: "Impact", label: "app.blogs.page.impact" },
  { id: "Careers", label: "app.blogs.page.careers" },
];

const articles: Article[] = [
  {
    title: "app.blogs.page.theFutureOfTechnicalEducat",
    excerpt: "app.blogs.page.exploringHowDigitalPlatform",
    date: "app.blogs.page.may152024",
    author: "app.blogs.page.drRaviSingh",
    category: "app.blogs.page.education",
    readTime: "app.blogs.page.8MinRead",
    featured: true,
  },
  {
    title: "app.blogs.page.volunteerSpotlightMakingImp",
    excerpt: "app.blogs.page.meetThePassionateVolunteers",
    date: "app.blogs.page.may102024",
    author: "app.blogs.page.sarahJohnson",
    category: "app.blogs.page.community",
    readTime: "app.blogs.page.5MinRead",
  },
  {
    title: "app.blogs.page.careerSuccessFromStudentTo",
    excerpt: "app.blogs.page.realSuccessStoriesFromOur",
    date: "app.blogs.page.may52024",
    author: "app.blogs.page.amitPatel",
    category: "app.blogs.page.careers",
    readTime: "app.blogs.page.6MinRead",
  },
  {
    title: "app.blogs.page.buildingInclusiveLearningCo",
    excerpt: "app.blogs.page.howWeCreateWelcomingSpaces",
    date: "app.blogs.page.april282024",
    author: "app.blogs.page.priyaSharma",
    category: "app.blogs.page.community",
    readTime: "app.blogs.page.7MinRead",
  },
  {
    title: "app.blogs.page.scalingEducationThroughTech",
    excerpt: "app.blogs.page.insightsIntoHowWeLeverage",
    date: "app.blogs.page.april202024",
    author: "app.blogs.page.techTeam",
    category: "app.blogs.page.technology",
    readTime: "app.blogs.page.9MinRead",
  },
  {
    title: "app.blogs.page.measuringImpactOur2024Repo",
    excerpt: "app.blogs.page.comprehensiveOverviewOfOur",
    date: "app.blogs.page.april152024",
    author: "app.blogs.page.foundation",
    category: "app.blogs.page.impact",
    readTime: "app.blogs.page.10MinRead",
  },
];

export default function Blog() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const categoryObj = categories.find((c) => c.id === activeCategory);
      const matchesCategory = activeCategory === "All" || article.category === categoryObj?.label;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        t(article.title).toLowerCase().includes(query) ||
        t(article.excerpt).toLowerCase().includes(query) ||
        t(article.author).toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, t]);

  const featuredArticle = useMemo(() => {
    return filteredArticles.find((a) => a.featured);
  }, [filteredArticles]);

  const otherArticles = useMemo(() => {
    return filteredArticles.filter((a) => !a.featured || !featuredArticle);
  }, [filteredArticles, featuredArticle]);

  return (
    <main className="pt-20 bg-slate-900 text-slate-100 min-h-screen">
      <HeroBlog searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogGrid
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        featuredArticle={featuredArticle}
        otherArticles={otherArticles}
      />
    </main>
  );
}

function HeroBlog({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.blogs.page.ourBlog')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-8">
          {t('app.blogs.page.insightsStoriesAndLessonsF')}
        </p>

        <div className="flex gap-3 max-w-xl mx-auto">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 border border-white/20">
            <Search className="h-5 w-5 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('app.blogs.page.searchArticles')}
              className="bg-transparent text-white placeholder-white/50 outline-none w-full text-sm"
            />
          </div>
          <button className="px-6 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer text-sm">
            {t('app.blogs.page.search')}
          </button>
        </div>
      </div>
    </section>
  );
}

function BlogGrid({
  activeCategory,
  setActiveCategory,
  featuredArticle,
  otherArticles,
}: {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  featuredArticle?: Article;
  otherArticles: Article[];
}) {
  const { t } = useTranslation();

  return (
    <Section className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Filter */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all text-xs cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-accent text-white"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <Card className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-6 bg-slate-800 border-slate-700/80">
              <div className="h-64 lg:h-96 bg-gradient-to-br from-primary-950 to-accent-600 lg:col-span-1" />
              <div className="p-6 flex flex-col justify-center lg:col-span-1">
                <Badge className="w-fit mb-3">{t(featuredArticle.category)}</Badge>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {t(featuredArticle.title)}
                </h2>
                <p className="text-lg text-primary-300 mb-4">
                  {t(featuredArticle.excerpt)}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-primary-300">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {t(featuredArticle.author)}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t(featuredArticle.date)}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-accent-400">
                    {t(featuredArticle.readTime)}
                  </span>
                </div>
                <button className="flex items-center space-x-2 text-accent-400 font-semibold hover:text-accent-300 transition-colors group cursor-pointer text-sm">
                  <span>{t('app.blogs.page.readArticle')}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article, i) => (
            <Card key={i} hover className="flex flex-col bg-slate-800 border-slate-700/80">
              <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg mb-4" />

              <Badge className="w-fit mb-3">{t(article.category)}</Badge>

              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 flex-1">
                {t(article.title)}
              </h3>

              <p className="text-sm text-primary-300 mb-4 line-clamp-2">
                {t(article.excerpt)}
              </p>

              <div className="border-t border-slate-700 pt-4">
                <div className="flex items-center justify-between mb-3 text-xs text-primary-450">
                  <span>{t(article.date)}</span>
                  <span>{t(article.readTime)}</span>
                </div>
                <button className="text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors group flex items-center cursor-pointer">
                  <span>{t('app.blogs.page.readMore')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <button className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-all text-sm cursor-pointer">
            {t('app.blogs.page.previous')}
          </button>
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg transition-all text-sm cursor-pointer ${
                i === 1
                  ? "bg-gradient-accent text-white"
                  : "border border-slate-700 hover:bg-slate-800"
              }`}
            >
              {i}
            </button>
          ))}
          <button className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-all text-sm cursor-pointer">
            {t('app.blogs.page.next')}
          </button>
        </div>
      </div>
    </Section>
  );
}

