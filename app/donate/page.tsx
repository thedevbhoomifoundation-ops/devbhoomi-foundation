import { Section, Card } from "@/components/ui";
import { Heart, TrendingUp, Users, Award } from "lucide-react";

export default function Donate() {
  return (
    <main className="pt-20">
      <HeroDonate />
      <DonationPlansSection />
      <ImpactSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

function HeroDonate() {
  return (
    <Section
      className="bg-gradient-to-br from-primary-900 to-primary-800 text-white min-h-[60vh] flex items-center"
      fullWidth
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-6xl font-bold mb-4">Support Our Mission</h1>
        <p className="text-2xl text-white/80 mb-8">
          Your donation directly impacts thousands of lives. Help us provide quality
          education and opportunities to deserving students.
        </p>
      </div>
    </Section>
  );
}

function DonationPlansSection() {
  const plans = [
    {
      title: "Student Support",
      amount: "₹999",
      period: "One-time",
      description: "Support one student's course enrollment",
      impact: "Help 1 student access premium education",
      icon: "🎓",
    },
    {
      title: "Scholarship Fund",
      amount: "₹2,499",
      period: "One-time",
      description: "Provide a monthly stipend to a deserving student",
      impact: "Support 1 student for a month",
      icon: "📚",
    },
    {
      title: "Monthly Supporter",
      amount: "₹500/month",
      period: "Monthly",
      description: "Join as a recurring monthly donor",
      impact: "Provide ongoing support to students",
      icon: "💝",
    },
    {
      title: "Program Sponsor",
      amount: "₹5,000",
      period: "One-time",
      description: "Sponsor an entire course or program",
      impact: "Enable full program for multiple students",
      icon: "🚀",
    },
    {
      title: "Infrastructure",
      amount: "₹10,000",
      period: "One-time",
      description: "Support building learning centers",
      impact: "Build a learning facility in rural areas",
      icon: "🏢",
    },
    {
      title: "Community Hero",
      amount: "₹25,000+",
      period: "Custom",
      description: "Custom donation for maximum impact",
      impact: "Personalized impact based on your contribution",
      icon: "👑",
    },
  ];

  return (
    <Section
      title="Donation Plans"
      subtitle="Choose how you'd like to make an impact"
      className="bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <Card key={i} hover className="flex flex-col">
              <div className="text-5xl mb-4">{plan.icon}</div>
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                {plan.title}
              </h3>
              <div className="mb-4">
                <div className="text-3xl font-bold text-accent-600">{plan.amount}</div>
                <div className="text-sm text-primary-600 dark:text-primary-300">{plan.period}</div>
              </div>
              <p className="text-sm text-primary-600 dark:text-primary-300 mb-3 flex-1">
                {plan.description}
              </p>
              <div className="p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg mb-4">
                <p className="text-sm font-medium text-accent-700 dark:text-accent-300">
                  ✨ {plan.impact}
                </p>
              </div>
              <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all">
                Donate Now
              </button>
            </Card>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mx-auto">
          <Card>
            <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-4">
              Custom Donation
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-900 dark:text-white mb-2">
                  Enter amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter any amount"
                  className="w-full px-4 py-2 border border-primary-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <button className="w-full py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all">
                Proceed to Payment
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function ImpactSection() {
  const impacts = [
    {
      icon: Users,
      stat: "15000+",
      label: "Students Reached",
      description: "Direct beneficiaries of our programs",
    },
    {
      icon: TrendingUp,
      stat: "50L+",
      label: "Amount Donated",
      description: "Total funds raised and utilized",
    },
    {
      icon: Award,
      stat: "50+",
      label: "Courses Offered",
      description: "Diverse learning opportunities",
    },
    {
      icon: Heart,
      stat: "2000+",
      label: "Active Volunteers",
      description: "Community members contributing",
    },
  ];

  return (
    <Section
      title="Your Donation's Impact"
      className="bg-primary-50 dark:bg-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, i) => {
            const Icon = impact.icon;
            return (
              <Card key={i} className="text-center">
                <Icon className="h-12 w-12 text-accent-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary-900 dark:text-white mb-1">
                  {impact.stat}
                </div>
                <div className="text-primary-900 dark:text-white font-semibold mb-2">
                  {impact.label}
                </div>
                <p className="text-sm text-primary-600 dark:text-primary-300">
                  {impact.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Is my donation tax-deductible?",
      a: "Yes, we're a registered 80G NGO. Your donations are eligible for tax deductions under Indian tax laws.",
    },
    {
      q: "How is my donation used?",
      a: "100% of donations go directly to student scholarships, course development, and community programs. No administrative overhead is deducted.",
    },
    {
      q: "Can I track my donation's impact?",
      a: "Yes, all donors receive regular impact reports showing how their contribution is making a difference.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards, UPI, net banking, and bank transfers.",
    },
  ];

  return (
    <Section
      title="Frequently Asked Questions"
      className="bg-white dark:bg-slate-900"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-primary-600 dark:text-primary-300">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  return (
    <Section className="bg-gradient-to-r from-primary-900 to-accent-600 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heart className="h-12 w-12 mx-auto mb-4 fill-white" />
        <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl text-white/80 mb-8 mx-auto">
          Your generosity directly transforms lives. Every rupee counts. Donate today and
          help us create a brighter future for thousands of aspiring learners.
        </p>
        <button className="px-8 py-3 rounded-lg bg-white text-primary-900 font-semibold hover:shadow-lg transition-all">
          Make a Donation
        </button>
      </div>
    </Section>
  );
}
