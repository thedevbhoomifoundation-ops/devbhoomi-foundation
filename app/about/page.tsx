import { Section, Card } from "@/components/ui";
import { Timeline } from "lucide-react";

export default function About() {
  return (
    <main className="pt-20">
      <HeroAbout />
      <MissionVisionSection />
      <TimelineSection />
      <TeamSection />
    </main>
  );
}

function HeroAbout() {
  return (
    <Section
      className="bg-gradient-to-br from-primary-900 to-primary-800 text-white min-h-screen flex items-center"
      fullWidth
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-6xl font-bold mb-4">About The Dev Bhoomi Foundation</h1>
        <p className="text-2xl text-white/80">
          Empowering communities through education, technology, and collective action since 2022.
        </p>
      </div>
    </Section>
  );
}

function MissionVisionSection() {
  return (
    <Section
      title="Our Mission & Vision"
      className="bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <h3 className="text-2xl font-bold text-accent-600 mb-4">Mission</h3>
            <p className="text-lg text-primary-700 dark:text-primary-300 leading-relaxed">
              To provide accessible, world-class technical education and create a thriving community
              of empowered developers, social innovators, and volunteers dedicated to positive impact
              in the Himalayan region and beyond.
            </p>
          </Card>
          <Card>
            <h3 className="text-2xl font-bold text-accent-600 mb-4">Vision</h3>
            <p className="text-lg text-primary-700 dark:text-primary-300 leading-relaxed">
              A world where every aspiring individual, regardless of background or geography, has
              access to quality technical education, opportunity to contribute to society, and the
              platform to realize their full potential.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function TimelineSection() {
  const timeline = [
    { year: "2022", title: "Foundation Established", description: "Started with a vision and a small group of passionate educators" },
    { year: "2023", title: "1000+ Students", description: "Reached our first milestone with active enrollment" },
    { year: "2023", title: "Launch Volunteer Program", description: "Built a community of passionate mentors" },
    { year: "2024", title: "15000+ Lives Touched", description: "Expanded impact across multiple regions" },
  ];

  return (
    <Section
      title="Our Journey"
      className="bg-primary-50 dark:bg-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-1 h-20 bg-gradient-to-b from-accent-500 to-transparent mt-2" />
                )}
              </div>
              <div className="pt-2 pb-8">
                <div className="text-2xl font-bold text-accent-600 mb-1">{item.year}</div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function TeamSection() {
  const team = [
    { name: "Dr. Rajesh Sharma", role: "Founder & CEO", bio: "PhD in Computer Science, 15+ years in education" },
    { name: "Priya Verma", role: "Head of Programs", bio: "Education specialist with grassroots impact experience" },
    { name: "Amit Singh", role: "CTO", bio: "Full-stack developer passionate about tech education" },
    { name: "Sarah Williams", role: "Community Lead", bio: "Social entrepreneur building resilient communities" },
  ];

  return (
    <Section
      title="Our Leadership Team"
      subtitle="Meet the people driving our mission"
      className="bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Card key={i} hover className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-accent-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-primary-600 dark:text-primary-300">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
