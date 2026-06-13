import { Section, Card } from "@/components/ui";
import { Timeline } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <main className="pt-20">
      <HeroAbout />
      <MissionVisionSection />
      <TimelineSection />
      {/* <TeamSection /> */}
      <MembersSection />
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
        <h1 className="text-6xl font-bold mb-4">About The Nextgen Devbhoomi Foundation</h1>
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

function MembersSection() {
  const members = [
    {
      name: "Saurav Agrawal",
      linkedin: "https://www.linkedin.com/in/agrawal-saurav",
      role: "Core Member",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Ashish Gulshan",
      linkedin: "https://www.linkedin.com/in/aashishgulshan",
      role: "Core Member",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Gajendra",
      linkedin: "https://www.linkedin.com/in/gajju-ary",
      role: "Core Member",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Kumar Shivam",
      linkedin: "https://www.linkedin.com/in/kumar-shivam-81a190226",
      role: "Core Member",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Ujjwal Singh",
      linkedin: "https://www.linkedin.com/in/ujjwal-kumar-1881b8153",
      role: "Core Member",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Vikas Pandey",
      linkedin: "https://www.linkedin.com/in/vikash-kr-pandey-b34955140",
      role: "Core Member",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Pratyush Singh",
      linkedin: "https://www.linkedin.com/in/pratyushkumarsinghse",
      role: "Core Member",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Ashutosh Gupta",
      role: "Contributor",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Shubham",
      role: "Contributor",
      image: "https://images.unsplash.com/photo-1536164261511-3a17e658594a?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Shubham Gupta",
      role: "Contributor",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Mahesh Agrawal",
      role: "Contributor",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=150&h=150",
    },
  ];

  return (
    <Section
      title="Our Members & Contributors"
      subtitle="The passionate individuals making our programs possible"
      className="bg-primary-50 dark:bg-slate-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {members.map((member, i) => {
            // Get initials
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <Card key={i} hover className="text-center p-5 flex flex-col justify-between items-center h-full">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 shadow-md shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm">
                      {initials}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-900 dark:text-white leading-tight mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[11px] text-accent-600 dark:text-accent-400 font-medium mb-3">
                    {member.role}
                  </p>
                </div>
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0A66C2] hover:underline"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-[10px] text-primary-400 dark:text-primary-500 font-medium italic">
                    Community
                  </span>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
