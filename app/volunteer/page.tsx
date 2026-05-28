import { Section, Card, Button } from "@/components/ui";
import { Heart, Briefcase, Users, TrendingUp, CheckCircle } from "lucide-react";

export default function Volunteer() {
  return (
    <main className="pt-20">
      <HeroVolunteer />
      <WhyVolunteerSection />
      <VolunteerRolesSection />
      <BenefitsSection />
      <ApplicationSection />
    </main>
  );
}

function HeroVolunteer() {
  return (
    <Section
      className="bg-gradient-to-br from-primary-900 to-primary-800 text-white min-h-[60vh] flex items-center"
      fullWidth
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-6xl font-bold mb-4">Make a Real Impact</h1>
        <p className="text-2xl text-white/80 mb-8">
          Join our community of 2000+ passionate volunteers making a difference
        </p>
        <Button size="lg" className="bg-white text-primary-900 hover:bg-white/90">
          Apply to Volunteer
        </Button>
      </div>
    </Section>
  );
}

function WhyVolunteerSection() {
  const reasons = [
    {
      icon: Heart,
      title: "Make Real Impact",
      description: "Directly contribute to transforming lives and building communities",
    },
    {
      icon: Users,
      title: "Build Network",
      description: "Connect with like-minded individuals and passionate change-makers",
    },
    {
      icon: TrendingUp,
      title: "Grow Skills",
      description: "Develop leadership, mentoring, and professional skills",
    },
    {
      icon: Briefcase,
      title: "Gain Experience",
      description: "Build your portfolio and gain valuable professional experience",
    },
  ];

  return (
    <Section
      title="Why Volunteer With Us?"
      className="bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Card key={i} hover>
                <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-primary-900 dark:text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-300">
                  {reason.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function VolunteerRolesSection() {
  const roles = [
    {
      title: "Student Mentor",
      time: "Flexible (5-10 hrs/week)",
      requirements: "Tech background or teaching passion",
      description: "Guide students through their learning journey and help them overcome challenges",
    },
    {
      title: "Event Organizer",
      time: "Event-based (10-15 hrs/month)",
      requirements: "Organizational and communication skills",
      description: "Organize workshops, webinars, and community events",
    },
    {
      title: "Content Creator",
      time: "Flexible (5-8 hrs/week)",
      requirements: "Writing or video production skills",
      description: "Create educational content and share your expertise",
    },
    {
      title: "Campus Ambassador",
      time: "Regular (8-12 hrs/week)",
      requirements: "Leadership and community engagement skills",
      description: "Represent the foundation at your college or community",
    },
    {
      title: "Tech Support",
      time: "As needed",
      requirements: "Technical troubleshooting skills",
      description: "Provide technical assistance to students and community",
    },
    {
      title: "Social Media Manager",
      time: "Flexible (5-8 hrs/week)",
      requirements: "Social media and design skills",
      description: "Manage our social platforms and engagement",
    },
  ];

  return (
    <Section
      title="Volunteer Opportunities"
      subtitle="Find the perfect role for your skills and schedule"
      className="bg-primary-50 dark:bg-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <Card key={i} hover>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-3">
                {role.title}
              </h3>
              <div className="space-y-2 mb-4 text-sm">
                <p>
                  <span className="font-medium text-primary-900 dark:text-white">Time: </span>
                  <span className="text-primary-600 dark:text-primary-300">{role.time}</span>
                </p>
                <p>
                  <span className="font-medium text-primary-900 dark:text-white">
                    Requirements:
                  </span>
                  <span className="text-primary-600 dark:text-primary-300"> {role.requirements}</span>
                </p>
              </div>
              <p className="text-primary-700 dark:text-primary-200 mb-4">{role.description}</p>
              <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all text-sm">
                Apply Now
              </button>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function BenefitsSection() {
  const benefits = [
    "Certificate of appreciation",
    "Professional reference letters",
    "Access to premium courses",
    "Networking opportunities",
    "Free merchandise",
    "Priority for speaking opportunities",
    "Travel reimbursement (if applicable)",
    "Mentorship from leadership team",
  ];

  return (
    <Section
      title="Volunteer Benefits"
      className="bg-white dark:bg-slate-900"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-accent-600 flex-shrink-0" />
              <span className="text-lg text-primary-900 dark:text-white">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ApplicationSection() {
  return (
    <Section className="bg-gradient-primary text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="text-xl text-white/80 mb-8">
          Join us in our mission to transform lives through education and community
          empowerment. Apply now and become part of the movement!
        </p>
        <button className="px-8 py-3 rounded-lg bg-white text-primary-900 font-semibold hover:shadow-lg transition-all">
          Apply to Volunteer Today
        </button>
      </div>
    </Section>
  );
}
