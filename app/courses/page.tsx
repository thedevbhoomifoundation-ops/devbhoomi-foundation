"use client";

import { Section, Card, Badge } from "@/components/ui";
import { Clock, Users, Star, Filter } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "@/providers/language-provider";

export default function Courses() {
  return (
    <main className="pt-20">
      <HeroCourses />
      <CoursesGrid />
    </main>
  );
}

function HeroCourses() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t({ en: "Learn From the Best", hi: "सर्वश्रेष्ठ से सीखें" })}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-6">
          {t({ en: "Access world-class technical education curated by industry experts", hi: "उद्योग विशेषज्ञों द्वारा तैयार की गई विश्व स्तरीय तकनीकी शिक्षा प्राप्त करें" })}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            placeholder={t({ en: "Search courses...", hi: "कोर्स खोजें..." })}
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 flex-1 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
          />
          <button className="px-6 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all text-sm whitespace-nowrap cursor-pointer">
            {t({ en: "Search", hi: "खोजें" })}
          </button>
        </div>
      </div>
    </section>
  );
}

function CoursesGrid() {
  const { t } = useLanguage();

  const categories = [
    t({ en: "All", hi: "सभी" }),
    t({ en: "Web Development", hi: "वेब डेवलपमेंट" }),
    t({ en: "Mobile", hi: "मोबाइल" }),
    t({ en: "AI/ML", hi: "एआई/एमएल" }),
    t({ en: "DevOps", hi: "डेवऑप्स" }),
    t({ en: "Data Science", hi: "डेटा साइंस" })
  ];
  
  const courses = [
    {
      title: t({ en: "Web Development Fundamentals", hi: "वेब डेवलपमेंट फंडामेंटल्स" }),
      category: t({ en: "Web Development", hi: "वेब डेवलपमेंट" }),
      level: t({ en: "Beginner", hi: "शुरुआती" }),
      students: 2400,
      rating: 4.9,
      price: "₹2999",
      duration: t({ en: "8 weeks", hi: "8 सप्ताह" }),
      instructor: t({ en: "John Smith", hi: "जॉन स्मिथ" }),
      description: t({ en: "Master HTML, CSS, JavaScript and build your first web projects", hi: "HTML, CSS, JavaScript में महारत हासिल करें और अपनी पहली वेब परियोजनाएं बनाएं" }),
    },
    {
      title: t({ en: "Advanced React & Next.js", hi: "उन्नत रिएक्ट और नेक्स्ट.जेएस" }),
      category: t({ en: "Web Development", hi: "वेब डेवलपमेंट" }),
      level: t({ en: "Advanced", hi: "उन्नत" }),
      students: 1200,
      rating: 4.8,
      price: "₹4999",
      duration: t({ en: "10 weeks", hi: "10 सप्ताह" }),
      instructor: t({ en: "React Expert", hi: "रिएक्ट एक्सपर्ट" }),
      description: t({ en: "Build scalable, production-ready applications with React and Next.js", hi: "रिएक्ट और नेक्स्ट.जेएस के साथ स्केलेबल, प्रोडक्शन-रेडी एप्लिकेशन बनाएं" }),
    },
    {
      title: t({ en: "Full-Stack Development Bootcamp", hi: "फुल-स्टैक डेवलपमेंट बूटकैंप" }),
      category: t({ en: "Web Development", hi: "वेब डेवलपमेंट" }),
      level: t({ en: "Intermediate", hi: "मध्यम" }),
      students: 1800,
      rating: 4.9,
      price: "₹5999",
      duration: t({ en: "12 weeks", hi: "12 सप्ताह" }),
      instructor: t({ en: "Full Stack Pro", hi: "फुल स्टैक प्रो" }),
      description: t({ en: "Complete journey from frontend to backend development", hi: "फ्रंटएंड से बैकएंड डेवलपमेंट तक की पूरी यात्रा" }),
    },
    {
      title: t({ en: "Data Science & ML Mastery", hi: "डेटा साइंस और एमएल मास्टरी" }),
      category: t({ en: "Data Science", hi: "डेटा साइंस" }),
      level: t({ en: "Advanced", hi: "उन्नत" }),
      students: 950,
      rating: 4.8,
      price: "₹6999",
      duration: t({ en: "14 weeks", hi: "14 सप्ताह" }),
      instructor: t({ en: "Dr. AI Expert", hi: "डॉ एआई एक्सपर्ट" }),
      description: t({ en: "Learn machine learning, deep learning, and data analysis", hi: "मशीन लर्निंग, डीप लर्निंग और डेटा विश्लेषण सीखें" }),
    },
    {
      title: t({ en: "Cloud & DevOps Essentials", hi: "क्लाउड और डेवऑप्स एसेंशियल" }),
      category: t({ en: "DevOps", hi: "डेवऑप्स" }),
      level: t({ en: "Intermediate", hi: "मध्यम" }),
      students: 1100,
      rating: 4.7,
      price: "₹3999",
      duration: t({ en: "8 weeks", hi: "8 सप्ताह" }),
      instructor: t({ en: "Cloud Pro", hi: "क्लाउड प्रो" }),
      description: t({ en: "Master AWS, Docker, Kubernetes, and modern deployment practices", hi: "AWS, डॉकर, कुबेरनेट्स और आधुनिक परिनियोजन प्रथाओं में महारत हासिल करें" }),
    },
    {
      title: t({ en: "Mobile App Development", hi: "मोबाइल ऐप डेवलपमेंट" }),
      category: t({ en: "Mobile", hi: "मोबाइल" }),
      level: t({ en: "Intermediate", hi: "मध्यम" }),
      students: 1550,
      rating: 4.9,
      price: "₹4999",
      duration: t({ en: "10 weeks", hi: "10 सप्ताह" }),
      instructor: t({ en: "Mobile Expert", hi: "मोबाइल एक्सपर्ट" }),
      description: t({ en: "Build iOS and Android apps with React Native", hi: "रिएक्ट नेटिव के साथ iOS और एंड्रॉइड ऐप बनाएं" }),
    },
  ];

  return (
    <Section className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-white" />
            <span className="font-semibold">{t({ en: "Filter by category", hi: "श्रेणी के अनुसार फ़िल्टर करें" })}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                  idx === 0
                    ? "bg-gradient-accent text-white"
                    : "bg-slate-800 text-white hover:bg-slate-700"
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

                <h3 className="text-lg font-semibold text-white mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-primary-300 mb-4">
                  {course.description}
                </p>

                <div className="space-y-2 text-sm text-primary-300">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {course.students} {t({ en: "students", hi: "छात्र" })}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {course.price}
                    </div>
                    <div className="text-xs text-primary-400">
                      {course.instructor}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-semibold text-white">{course.rating}</span>
                  </div>
                </div>
                <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer">
                  {t({ en: "Enroll Now", hi: "अभी नामांकन करें" })}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
