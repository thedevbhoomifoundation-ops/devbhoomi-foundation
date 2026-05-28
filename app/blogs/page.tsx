import { Section, Card, Badge } from "@/components/ui";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <main className="pt-20">
      <HeroBlog />
      <BlogGrid />
    </main>
  );
}

function HeroBlog() {
  return (
    <Section
      className="bg-gradient-to-br from-primary-900 to-primary-800 text-white min-h-[60vh] flex items-center"
      fullWidth
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <h1 className="text-6xl font-bold mb-4">Our Blog</h1>
        <p className="text-2xl text-white/80 mb-8">
          Insights, stories, and lessons from the Dev Bhoomi community
        </p>

        <div className="flex gap-3 mx-auto">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 border border-white/20">
            <Search className="h-5 w-5 text-white/60" />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-transparent text-white placeholder-white/50 outline-none w-full"
            />
          </div>
          <button className="px-6 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all">
            Search
          </button>
        </div>
      </div>
    </Section>
  );
}

function BlogGrid() {
  const categories = ["All", "Education", "Community", "Technology", "Impact", "Careers"];

  const articles = [
    {
      title: "The Future of Technical Education in India",
      excerpt:
        "Exploring how digital platforms are revolutionizing access to quality technical education in emerging markets.",
      date: "May 15, 2024",
      author: "Dr. Ravi Singh",
      category: "Education",
      readTime: "8 min read",
      featured: true,
    },
    {
      title: "Volunteer Spotlight: Making Impact Together",
      excerpt:
        "Meet the passionate volunteers driving change in our communities and transforming lives daily.",
      date: "May 10, 2024",
      author: "Sarah Johnson",
      category: "Community",
      readTime: "5 min read",
    },
    {
      title: "Career Success: From Student to Tech Professional",
      excerpt:
        "Real success stories from our graduates and their career journeys in the tech industry.",
      date: "May 5, 2024",
      author: "Amit Patel",
      category: "Careers",
      readTime: "6 min read",
    },
    {
      title: "Building Inclusive Learning Communities",
      excerpt:
        "How we create welcoming spaces where every student feels valued and supported in their journey.",
      date: "April 28, 2024",
      author: "Priya Sharma",
      category: "Community",
      readTime: "7 min read",
    },
    {
      title: "Scaling Education Through Technology",
      excerpt:
        "Insights into how we leverage modern tech stack to reach thousands of learners efficiently.",
      date: "April 20, 2024",
      author: "Tech Team",
      category: "Technology",
      readTime: "9 min read",
    },
    {
      title: "Measuring Impact: Our 2024 Report",
      excerpt:
        "Comprehensive overview of our achievements, challenges, and goals for the coming year.",
      date: "April 15, 2024",
      author: "Foundation",
      category: "Impact",
      readTime: "10 min read",
    },
  ];

  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);

  return (
    <Section className="bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Filter */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                cat === "All"
                  ? "bg-gradient-accent text-white"
                  : "bg-primary-100 dark:bg-slate-800 text-primary-900 dark:text-white hover:bg-primary-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <Card hover className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-6">
              <div className="h-64 lg:h-96 bg-gradient-to-br from-primary-900 to-accent-600 lg:col-span-1" />
              <div className="p-6 flex flex-col justify-center lg:col-span-1">
                <Badge className="w-fit mb-3">{featuredArticle.category}</Badge>
                <h2 className="text-3xl font-bold text-primary-900 dark:text-white mb-3">
                  {featuredArticle.title}
                </h2>
                <p className="text-lg text-primary-600 dark:text-primary-300 mb-4">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-primary-600 dark:text-primary-300">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {featuredArticle.date}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-accent-600">
                    {featuredArticle.readTime}
                  </span>
                </div>
                <button className="flex items-center space-x-2 text-accent-600 font-semibold hover:text-accent-700 transition-colors group">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article, i) => (
            <Card key={i} hover className="flex flex-col">
              <div className="h-40 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-slate-700 dark:to-slate-600 rounded-lg mb-4" />

              <Badge className="w-fit mb-3">{article.category}</Badge>

              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2 line-clamp-2 flex-1">
                {article.title}
              </h3>

              <p className="text-sm text-primary-600 dark:text-primary-300 mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              <div className="border-t border-primary-100 dark:border-slate-700 pt-4">
                <div className="flex items-center justify-between mb-3 text-xs text-primary-600 dark:text-primary-400">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <button className="text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors group flex items-center">
                  <span>Read More</span>
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <button className="px-4 py-2 rounded-lg border border-primary-300 dark:border-slate-700 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all">
            Previous
          </button>
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg transition-all ${
                i === 1
                  ? "bg-gradient-accent text-white"
                  : "border border-primary-300 dark:border-slate-700 hover:bg-primary-50 dark:hover:bg-slate-800"
              }`}
            >
              {i}
            </button>
          ))}
          <button className="px-4 py-2 rounded-lg border border-primary-300 dark:border-slate-700 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all">
            Next
          </button>
        </div>
      </div>
    </Section>
  );
}
