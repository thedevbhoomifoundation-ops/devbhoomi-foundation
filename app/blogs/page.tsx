"use client";

import { useState, useMemo } from "react";
import { Section, Card, Badge } from "@/components/ui";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

interface TranslatedField {
  en: string;
  hi: string;
}

interface Article {
  title: TranslatedField;
  excerpt: TranslatedField;
  date: TranslatedField;
  author: TranslatedField;
  category: TranslatedField;
  readTime: TranslatedField;
  featured?: boolean;
}

const categories = [
  { id: "All", label: { en: "All", hi: "सभी" } },
  { id: "Education", label: { en: "Education", hi: "शिक्षा" } },
  { id: "Community", label: { en: "Community", hi: "समुदाय" } },
  { id: "Technology", label: { en: "Technology", hi: "तकनीक" } },
  { id: "Impact", label: { en: "Impact", hi: "प्रभाव" } },
  { id: "Careers", label: { en: "Careers", hi: "करियर" } },
];

const articles: Article[] = [
  {
    title: { en: "The Future of Technical Education in India", hi: "भारत में तकनीकी शिक्षा का भविष्य" },
    excerpt: {
      en: "Exploring how digital platforms are revolutionizing access to quality technical education in emerging markets.",
      hi: "यह तलाशना कि डिजिटल प्लेटफॉर्म किस प्रकार उभरते बाजारों में गुणवत्तापूर्ण तकनीकी शिक्षा तक पहुंच में क्रांति ला रहे हैं।"
    },
    date: { en: "May 15, 2024", hi: "15 मई, 2024" },
    author: { en: "Dr. Ravi Singh", hi: "डॉ. रवि सिंह" },
    category: { en: "Education", hi: "शिक्षा" },
    readTime: { en: "8 min read", hi: "8 मिनट का पठन" },
    featured: true,
  },
  {
    title: { en: "Volunteer Spotlight: Making Impact Together", hi: "स्वयंसेवक स्पॉटलाइट: मिलकर प्रभाव डालना" },
    excerpt: {
      en: "Meet the passionate volunteers driving change in our communities and transforming lives daily.",
      hi: "हमारे समुदायों में बदलाव लाने वाले और दैनिक जीवन को बदलने वाले स्वयंसेवकों से मिलें।"
    },
    date: { en: "May 10, 2024", hi: "10 मई, 2024" },
    author: { en: "Sarah Johnson", hi: "सारा जॉनसन" },
    category: { en: "Community", hi: "समुदाय" },
    readTime: { en: "5 min read", hi: "5 मिनट का पठन" },
  },
  {
    title: { en: "Career Success: From Student to Tech Professional", hi: "करियर की सफलता: छात्र से तकनीकी पेशेवर तक" },
    excerpt: {
      en: "Real success stories from our graduates and their career journeys in the tech industry.",
      hi: "हमारे स्नातक की वास्तविक सफलता की कहानियां और तकनीकी उद्योग में उनकी करियर यात्रा।"
    },
    date: { en: "May 5, 2024", hi: "5 मई, 2024" },
    author: { en: "Amit Patel", hi: "अमित पटेल" },
    category: { en: "Careers", hi: "करियर" },
    readTime: { en: "6 min read", hi: "6 मिनट का पठन" },
  },
  {
    title: { en: "Building Inclusive Learning Communities", hi: "समावेशी शिक्षण समुदायों का निर्माण" },
    excerpt: {
      en: "How we create welcoming spaces where every student feels valued and supported in their journey.",
      hi: "हम कैसे स्वागत योग्य स्थान बनाते हैं जहाँ प्रत्येक छात्र अपनी यात्रा में मूल्यवान और समर्थित महसूस करता है।"
    },
    date: { en: "April 28, 2024", hi: "28 अप्रैल, 2024" },
    author: { en: "Priya Sharma", hi: "प्रिया शर्मा" },
    category: { en: "Community", hi: "समुदाय" },
    readTime: { en: "7 min read", hi: "7 मिनट का पठन" },
  },
  {
    title: { en: "Scaling Education Through Technology", hi: "प्रौद्योगिकी के माध्यम से शिक्षा का विस्तार" },
    excerpt: {
      en: "Insights into how we leverage modern tech stack to reach thousands of learners efficiently.",
      hi: "इस बारे में अंतर्दृष्टि कि कैसे हम हजारों शिक्षार्थियों तक कुशलतापूर्वक पहुंचने के लिए आधुनिक तकनीकी स्टैक का लाभ उठाते हैं।"
    },
    date: { en: "April 20, 2024", hi: "20 अप्रैल, 2024" },
    author: { en: "Tech Team", hi: "तकनीकी टीम" },
    category: { en: "Technology", hi: "तकनीक" },
    readTime: { en: "9 min read", hi: "9 मिनट का पठन" },
  },
  {
    title: { en: "Measuring Impact: Our 2024 Report", hi: "प्रभाव का मापन: हमारी 2024 की रिपोर्ट" },
    excerpt: {
      en: "Comprehensive overview of our achievements, challenges, and goals for the coming year.",
      hi: "आने वाले वर्ष के लिए हमारी उपलब्धियों, चुनौतियों और लक्ष्यों का व्यापक अवलोकन।"
    },
    date: { en: "April 15, 2024", hi: "15 अप्रैल, 2024" },
    author: { en: "Foundation", hi: "फाउंडेशन" },
    category: { en: "Impact", hi: "प्रभाव" },
    readTime: { en: "10 min read", hi: "10 मिनट का पठन" },
  },
];

export default function Blog() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category.en === activeCategory;
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
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t({ en: "Our Blog", hi: "हमारा ब्लॉग" })}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-8">
          {t({
            en: "Insights, stories, and lessons from the Dev Bhoomi community",
            hi: "देवभूमि समुदाय से अंतर्दृष्टि, कहानियां और सबक",
          })}
        </p>

        <div className="flex gap-3 max-w-xl mx-auto">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 border border-white/20">
            <Search className="h-5 w-5 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t({ en: "Search articles...", hi: "लेख खोजें..." })}
              className="bg-transparent text-white placeholder-white/50 outline-none w-full text-sm"
            />
          </div>
          <button className="px-6 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer text-sm">
            {t({ en: "Search", hi: "खोजें" })}
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
  const { t } = useLanguage();

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
                  <span>{t({ en: "Read Article", hi: "लेख पढ़ें" })}</span>
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
                  <span>{t({ en: "Read More", hi: "और पढ़ें" })}</span>
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <button className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-all text-sm cursor-pointer">
            {t({ en: "Previous", hi: "पिछला" })}
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
            {t({ en: "Next", hi: "अगला" })}
          </button>
        </div>
      </div>
    </Section>
  );
}

