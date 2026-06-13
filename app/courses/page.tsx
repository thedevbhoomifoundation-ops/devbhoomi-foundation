"use client";
import { useTranslation } from "react-i18next";

import { Section, Card, Badge } from "@/components/ui";
import { Clock, Users, Star, Filter } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function Courses() {
  return (
    <main className="pt-20">
      <HeroCourses />
      <CoursesGrid />
    </main>
  );
}

function HeroCourses() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.courses.page.learnFromTheBest')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-6">
          {t('app.courses.page.accessWorldclassTechnicalEd')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            placeholder={t('app.courses.page.searchCourses')}
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 flex-1 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
          />
          <button className="px-6 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all text-sm whitespace-nowrap cursor-pointer">
            {t('app.courses.page.search')}
          </button>
        </div>
      </div>
    </section>
  );
}

function CoursesGrid() {
  const { t } = useTranslation();

  const categories = [
    t('app.courses.page.all'),
    t('app.courses.page.webDevelopment'),
    t('app.courses.page.mobile'),
    t('app.courses.page.aiml'),
    t('app.courses.page.devops'),
    t('app.courses.page.dataScience')
  ];
  
  const courses = [
    {
      title: t('app.courses.page.webDevelopmentFundamentals'),
      category: t('app.courses.page.webDevelopment'),
      level: t('app.courses.page.beginner'),
      students: 2400,
      rating: 4.9,
      price: "₹2999",
      duration: t('app.courses.page.8Weeks'),
      instructor: t('app.courses.page.johnSmith'),
      description: t('app.courses.page.masterHtmlCssJavascriptAnd'),
    },
    {
      title: t('app.courses.page.advancedReactNextjs'),
      category: t('app.courses.page.webDevelopment'),
      level: t('app.courses.page.advanced'),
      students: 1200,
      rating: 4.8,
      price: "₹4999",
      duration: t('app.courses.page.10Weeks'),
      instructor: t('app.courses.page.reactExpert'),
      description: t('app.courses.page.buildScalableProductionready'),
    },
    {
      title: t('app.courses.page.fullstackDevelopmentBootcamp'),
      category: t('app.courses.page.webDevelopment'),
      level: t('app.courses.page.intermediate'),
      students: 1800,
      rating: 4.9,
      price: "₹5999",
      duration: t('app.courses.page.12Weeks'),
      instructor: t('app.courses.page.fullStackPro'),
      description: t('app.courses.page.completeJourneyFromFrontend'),
    },
    {
      title: t('app.courses.page.dataScienceMlMastery'),
      category: t('app.courses.page.dataScience'),
      level: t('app.courses.page.advanced'),
      students: 950,
      rating: 4.8,
      price: "₹6999",
      duration: t('app.courses.page.14Weeks'),
      instructor: t('app.courses.page.drAiExpert'),
      description: t('app.courses.page.learnMachineLearningDeepLe'),
    },
    {
      title: t('app.courses.page.cloudDevopsEssentials'),
      category: t('app.courses.page.devops'),
      level: t('app.courses.page.intermediate'),
      students: 1100,
      rating: 4.7,
      price: "₹3999",
      duration: t('app.courses.page.8Weeks'),
      instructor: t('app.courses.page.cloudPro'),
      description: t('app.courses.page.masterAwsDockerKubernetesA'),
    },
    {
      title: t('app.courses.page.mobileAppDevelopment'),
      category: t('app.courses.page.mobile'),
      level: t('app.courses.page.intermediate'),
      students: 1550,
      rating: 4.9,
      price: "₹4999",
      duration: t('app.courses.page.10Weeks'),
      instructor: t('app.courses.page.mobileExpert'),
      description: t('app.courses.page.buildIosAndAndroidAppsWit'),
    },
  ];

  return (
    <Section className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-white" />
            <span className="font-semibold">{t('app.courses.page.filterByCategory')}</span>
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
                    {course.students} {t('app.courses.page.students')}
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
                  {t('app.courses.page.enrollNow')}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
