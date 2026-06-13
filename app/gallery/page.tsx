import { Section } from "@/components/ui";

export default function Gallery() {
  return (
    <main className="pt-20">
      <HeroGallery />
      <GalleryGrid />
    </main>
  );
}

function HeroGallery() {
  return (
    <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Gallery</h1>
        <p className="text-lg sm:text-xl text-white/80">
          Moments from our community, events, and impact stories
        </p>
      </div>
    </section>
  );
}

function GalleryGrid() {
  const images = [
    {
      title: "Workshop Session",
      category: "Events",
      aspect: "square",
    },
    {
      title: "Student Success Story",
      category: "Impact",
      aspect: "rect-h",
    },
    {
      title: "Volunteer Meetup",
      category: "Community",
      aspect: "rect-w",
    },
    {
      title: "Coding Bootcamp",
      category: "Education",
      aspect: "square",
    },
    {
      title: "Team Celebration",
      category: "Behind Scenes",
      aspect: "rect-w",
    },
    {
      title: "Classroom Learning",
      category: "Education",
      aspect: "rect-h",
    },
    {
      title: "Hackathon Winners",
      category: "Events",
      aspect: "square",
    },
    {
      title: "Community Impact",
      category: "Impact",
      aspect: "rect-w",
    },
    {
      title: "Mentor Sessions",
      category: "Community",
      aspect: "square",
    },
  ];

  return (
    <Section className="bg-white dark:bg-slate-900">
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
                  className="w-full h-64 sm:h-full bg-gradient-to-br from-primary-900 to-accent-600 flex items-center justify-center text-6xl font-bold text-white/20"
                >
                  📸
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  {/* Content appears on hover */}
                  <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-sm font-semibold mb-2 opacity-75">
                      {image.category}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{image.title}</h3>
                    <button className="px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-all">
                      View
                    </button>
                  </div>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold text-white bg-accent-600 px-2 py-1 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all hover:scale-105">
            Load More Photos
          </button>
        </div>
      </div>
    </Section>
  );
}
