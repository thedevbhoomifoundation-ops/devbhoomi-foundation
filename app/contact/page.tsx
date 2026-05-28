import { Section, Card } from "@/components/ui";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <main className="pt-20">
      <HeroContact />
      <ContactSection />
    </main>
  );
}

function HeroContact() {
  return (
    <Section
      className="bg-gradient-to-br from-primary-900 to-primary-800 text-white min-h-[60vh] flex items-center"
      fullWidth
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-6xl font-bold mb-4">Get in Touch</h1>
        <p className="text-2xl text-white/80">
          Have questions? We'd love to hear from you. Reach out to us anytime.
        </p>
      </div>
    </Section>
  );
}

function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "hello@devbhoomi.org",
      subtitle: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 (XXX) XXX-XXXX",
      subtitle: "Available 9 AM - 6 PM IST",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "Bihar, India",
      subtitle: "Visit us by appointment",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon - Fri: 9 AM - 6 PM",
      subtitle: "Saturday: 10 AM - 4 PM",
    },
  ];

  return (
    <Section className="bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <Card key={i}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-900 dark:text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-primary-900 dark:text-white font-medium">
                          {info.details}
                        </p>
                        <p className="text-sm text-primary-600 dark:text-primary-300">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-6">
                Send us a Message
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-primary-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-primary-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-900 dark:text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 border border-primary-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-900 dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your query..."
                    className="w-full px-4 py-2 border border-primary-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
