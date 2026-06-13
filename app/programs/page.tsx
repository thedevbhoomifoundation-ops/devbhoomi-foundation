import { Section, Card } from "@/components/ui";
import { BookOpen, Users, Heart, TrendingUp } from "lucide-react";

export default function Programs() {
  return (
    <main className="pt-20">
      <HeroPrograms />
      <ProgramsGrid />
    </main>
  );
}

function HeroPrograms() {
  return (
    <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Programs</h1>
        <p className="text-lg sm:text-xl text-white/80">
          Comprehensive learning pathways designed to empower individuals and communities
        </p>
      </div>
    </section>
  );
}

function ProgramsGrid() {
  const programs = [
    {
      title: "Technical Education Program",
      icon: BookOpen,
      description:
        "Comprehensive courses in web development, mobile development, data science, and cloud computing.",
      features: ["Expert instructors", "Hands-on projects", "Industry-relevant", "Certificates"],
      participants: "8000+",
    },
    {
      title: "Mentorship Program",
      icon: Users,
      description:
        "One-on-one guidance from industry professionals to help students navigate their career.",
      features: ["Personal mentors", "Career guidance", "Networking", "Monthly sessions"],
      participants: "1200+",
    },
    {
      title: "Volunteer Community",
      icon: Heart,
      description:
        "Join our community of change-makers and make a real impact in education and society.",
      features: ["Multiple roles", "Flexible schedule", "Recognition", "Growth opportunities"],
      participants: "2000+",
    },
    {
      title: "Scholarship Initiative",
      icon: TrendingUp,
      description:
        "Providing financial support to deserving students who lack resources for quality education.",
      features: ["Full scholarships", "Partial support", "Merit-based", "Need-based"],
      participants: "3500+",
    },
  ];

  return (
    <Section className="bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <Card key={i} hover>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-primary-900 dark:text-white mb-2">
                      {program.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-300 mb-4">
                      {program.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-primary-900 dark:text-white mb-2">
                        Features:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {program.features.map((feature, j) => (
                          <span
                            key={j}
                            className="text-xs bg-primary-100 dark:bg-slate-700 text-primary-900 dark:text-white px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-accent-600">
                      {program.participants} participants
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all">
                  Learn More
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
