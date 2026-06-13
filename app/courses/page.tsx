import { Section, Card, Badge } from "@/components/ui";
import { Clock, Users, Star, Filter } from "lucide-react";

export default function Courses() {
  return (
    <main className="pt-20">
      <HeroCourses />
      <CoursesGrid />
    </main>
  );
}

function HeroCourses() {
  return (
    <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Learn From the Best</h1>
        <p className="text-lg sm:text-xl text-white/80 mb-6">
          Access world-class technical education curated by industry experts
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            placeholder="Search courses..."
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 flex-1 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
          />
          <button className="px-6 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all text-sm whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

function CoursesGrid() {
  const categories = ["All", "Web Development", "Mobile", "AI/ML", "DevOps", "Data Science"];
  
  const courses = [
    {
      title: "Web Development Fundamentals",
      category: "Web Development",
      level: "Beginner",
      students: 2400,
      rating: 4.9,
      price: "₹2999",
      duration: "8 weeks",
      instructor: "John Smith",
      description: "Master HTML, CSS, JavaScript and build your first web projects",
    },
    {
      title: "Advanced React & Next.js",
      category: "Web Development",
      level: "Advanced",
      students: 1200,
      rating: 4.8,
      price: "₹4999",
      duration: "10 weeks",
      instructor: "React Expert",
      description: "Build scalable, production-ready applications with React and Next.js",
    },
    {
      title: "Full-Stack Development Bootcamp",
      category: "Web Development",
      level: "Intermediate",
      students: 1800,
      rating: 4.9,
      price: "₹5999",
      duration: "12 weeks",
      instructor: "Full Stack Pro",
      description: "Complete journey from frontend to backend development",
    },
    {
      title: "Data Science & ML Mastery",
      category: "AI/ML",
      level: "Advanced",
      students: 950,
      rating: 4.8,
      price: "₹6999",
      duration: "14 weeks",
      instructor: "Dr. AI Expert",
      description: "Learn machine learning, deep learning, and data analysis",
    },
    {
      title: "Cloud & DevOps Essentials",
      category: "DevOps",
      level: "Intermediate",
      students: 1100,
      rating: 4.7,
      price: "₹3999",
      duration: "8 weeks",
      instructor: "Cloud Pro",
      description: "Master AWS, Docker, Kubernetes, and modern deployment practices",
    },
    {
      title: "Mobile App Development",
      category: "Mobile",
      level: "Intermediate",
      students: 1550,
      rating: 4.9,
      price: "₹4999",
      duration: "10 weeks",
      instructor: "Mobile Expert",
      description: "Build iOS and Android apps with React Native",
    },
  ];

  return (
    <Section className="bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-primary-900 dark:text-white" />
            <span className="font-semibold">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <Card key={i} hover className="flex flex-col">
              <div className="h-40 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <Badge>{course.category}</Badge>
                  <Badge variant="info">{course.level}</Badge>
                </div>

                <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-primary-600 dark:text-primary-300 mb-4">
                  {course.description}
                </p>

                <div className="space-y-2 text-sm text-primary-600 dark:text-primary-300">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {course.students} students
                  </div>
                </div>
              </div>

              <div className="border-t border-primary-100 dark:border-slate-700 pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-primary-900 dark:text-white">
                      {course.price}
                    </div>
                    <div className="text-xs text-primary-500 dark:text-primary-400">
                      {course.instructor}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-semibold">{course.rating}</span>
                  </div>
                </div>
                <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all">
                  Enroll Now
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
