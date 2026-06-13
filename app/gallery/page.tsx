"use client";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface TranslatedField {
  en: string;
  hi: string;
}

interface GalleryImage {
  title: TranslatedField;
  category: TranslatedField;
  aspect: "square" | "rect-h" | "rect-w";
}

export default function Gallery() {
  return (
    <main className="pt-20 bg-slate-900 min-h-screen text-slate-100">
      <HeroGallery />
      <GalleryGrid />
    </main>
  );
}

function HeroGallery() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.gallery.page.gallery')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t('app.gallery.page.momentsFromOurCommunityEve')}
        </p>
      </div>
    </section>
  );
}

function GalleryGrid() {
  const { t } = useTranslation();

  const images: GalleryImage[] = [
    {
      title: "app.gallery.page.workshopSession",
      category: "app.gallery.page.events",
      aspect: "square",
    },
    {
      title: "app.gallery.page.studentSuccessStory",
      category: "app.gallery.page.impact",
      aspect: "rect-h",
    },
    {
      title: "app.gallery.page.volunteerMeetup",
      category: "app.gallery.page.community",
      aspect: "rect-w",
    },
    {
      title: "app.gallery.page.codingBootcamp",
      category: "app.gallery.page.education",
      aspect: "square",
    },
    {
      title: "app.gallery.page.teamCelebration",
      category: "app.gallery.page.behindScenes",
      aspect: "rect-w",
    },
    {
      title: "app.gallery.page.classroomLearning",
      category: "app.gallery.page.education",
      aspect: "rect-h",
    },
    {
      title: "app.gallery.page.hackathonWinners",
      category: "app.gallery.page.events",
      aspect: "square",
    },
    {
      title: "app.gallery.page.communityImpact",
      category: "app.gallery.page.impact",
      aspect: "rect-w",
    },
    {
      title: "app.gallery.page.mentorSessions",
      category: "app.gallery.page.community",
      aspect: "square",
    },
  ];

  return (
    <Section className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {images.map((image, i) => {
            const heightClass =
              image.aspect === "rect-h" ? "sm:row-span-2" : "sm:col-span-1";

            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${heightClass}`}
              >
                {/* Image Background */}
                <div
                  className="w-full h-64 sm:h-full bg-gradient-to-br from-slate-850 to-slate-750 flex items-center justify-center text-6xl font-bold text-white/20 min-h-[200px]"
                >
                  📸
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center">
                  {/* Content appears on hover */}
                  <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 p-4">
                    <div className="text-xs font-semibold mb-2 opacity-75">
                      {t(image.category)}
                    </div>
                    <h3 className="text-lg font-bold mb-4">{t(image.title)}</h3>
                    <button className="px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-all text-xs cursor-pointer">
                      {t('app.gallery.page.view')}
                    </button>
                  </div>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-white bg-accent-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {t(image.category)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all hover:scale-105 cursor-pointer text-sm">
            {t('app.gallery.page.loadMorePhotos')}
          </button>
        </div>
      </div>
    </Section>
  );
}

