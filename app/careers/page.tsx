"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  Users,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section, Card, Badge } from "@/components/ui";
import { useLanguage } from "@/providers/language-provider";

interface TranslatedField {
  en: string;
  hi: string;
}

interface Position {
  id: string;
  title: TranslatedField;
  department: TranslatedField;
  location: TranslatedField;
  type: TranslatedField;
  description: TranslatedField;
  requirements: TranslatedField[];
  responsibilities: TranslatedField[];
}

const positionsData: Position[] = [
  {
    id: "1",
    title: { en: "Technical Instructor (Full-Stack Web)", hi: "तकनीकी प्रशिक्षक (फुल-स्टैक वेब)" },
    department: { en: "Education", hi: "शिक्षा" },
    location: { en: "Rishikesh, Uttarakhand (Hybrid)", hi: "ऋषिकेश, उत्तराखंड (हाइब्रिड)" },
    type: { en: "Full-Time", hi: "पूर्णकालिक" },
    description: {
      en: "Teach and mentor young students from underprivileged backgrounds, helping them master frontend and backend web technologies to secure jobs.",
      hi: "वंचित पृष्ठभूमि के युवा छात्रों को पढ़ाएं और उनका मार्गदर्शन करें, जिससे उन्हें नौकरी पाने के लिए फ्रंटएंड और बैकएंड वेब प्रौद्योगिकियों में महारत हासिल करने में मदद मिल सके।"
    },
    requirements: [
      { en: "2+ years of software development experience (JavaScript/React/Node.js/SQL)", hi: "2+ वर्ष का सॉफ्टवेयर विकास अनुभव (जावास्क्रिप्ट/रिएक्ट/नोड.जेएस/एसक्यूएल)" },
      { en: "Strong understanding of core CS concepts (databases, web protocols, REST APIs)", hi: "कोर सीएस अवधारणाओं (डेटाबेस, वेब प्रोटोकॉल, रेस्ट एपीआई) की मजबूत समझ" },
      { en: "Excellent communication and a passion for teaching and helping others grow", hi: "उत्कृष्ट संचार और शिक्षण तथा दूसरों को आगे बढ़ने में मदद करने का जुनून" },
      { en: "Prior teaching, lecturing, or mentorship experience is a plus", hi: "पूर्व शिक्षण, व्याख्यान या मार्गदर्शन का अनुभव एक अतिरिक्त लाभ है" },
    ],
    responsibilities: [
      { en: "Conduct daily interactive lectures and coding sandbox sessions", hi: "दैनिक इंटरैक्टिव व्याख्यान और कोडिंग सैंडबॉक्स सत्र आयोजित करना" },
      { en: "Review student code submissions and provide constructive, detailed feedback", hi: "छात्रों के कोड सबमिशन की समीक्षा करना और रचनात्मक, विस्तृत प्रतिक्रिया प्रदान करना" },
      { en: "Design project-based course curriculum aligned with standard tech requirements", hi: "मानक तकनीकी आवश्यकताओं के अनुरूप परियोजना-आधारित पाठ्यक्रम तैयार करना" },
      { en: "Guide students through their final capstone web app projects", hi: "छात्रों को उनके अंतिम कैपस्टोन वेब ऐप प्रोजेक्ट्स के माध्यम से निर्देशित करना" },
    ],
  },
  {
    id: "2",
    title: { en: "DSA & Algorithm Mentor", hi: "डीएसए और एल्गोरिदम मेंटर" },
    department: { en: "Education", hi: "शिक्षा" },
    location: { en: "Remote (India)", hi: "रिमोट (भारत)" },
    type: { en: "Part-Time / Volunteer", hi: "अंशकालिक / स्वयंसेवक" },
    description: {
      en: "Prepare advanced students for competitive coding and engineering interviews by explaining data structures, patterns, and complex algorithms.",
      hi: "उन्नत छात्रों को डेटा संरचनाओं, पैटर्नों और जटिल एल्गोरिदम को समझाकर प्रतिस्पर्धी कोडिंग और इंजीनियरिंग साक्षात्कार के लिए तैयार करें।"
    },
    requirements: [
      { en: "Solid mastery of Data Structures and Algorithms (Trees, Graphs, DP, Sorting)", hi: "डेटा स्ट्रक्चर्स और एल्गोरिदम (ट्री, ग्राफ, डीपी, सॉर्टिंग) पर ठोस महारत" },
      { en: "Active profile on coding platforms (LeetCode, Codeforces, HackerRank, etc.)", hi: "कोडिंग प्लेटफॉर्म (लीटकोड, कोडफोर्स, हैकररैंक आदि) पर सक्रिय प्रोफाइल" },
      { en: "Strong verbal and written guidance capability to clarify algorithmic approaches", hi: "एल्गोरिथम दृष्टिकोण को स्पष्ट करने के लिए मजबूत मौखिक और लिखित मार्गदर्शन क्षमता" },
      { en: "Available for at least 6-8 hours per week", hi: "प्रति सप्ताह कम से कम 6-8 घंटे उपलब्ध रहें" },
    ],
    responsibilities: [
      { en: "Conduct weekly live interactive coding sandboxes explaining key patterns", hi: "प्रमुख पैटर्नों को समझाते हुए साप्ताहिक लाइव इंटरैक्टिव कोडिंग सैंडबॉक्स आयोजित करना" },
      { en: "Run mock interviews (technical & behavioral) and provide improvement scorecards", hi: "मॉक इंटरव्यू (तकनीकी और व्यवहार संबंधी) आयोजित करना और सुधार स्कोरकार्ड प्रदान करना" },
      { en: "Moderate student coding discussion channels to resolve query roadblocks", hi: "प्रश्नों के समाधान के लिए छात्र कोडिंग चर्चा चैनलों का संचालन करना" },
      { en: "Formulate practice assignment sheets targeting company interview patterns", hi: "कंपनी के साक्षात्कार पैटर्नों को लक्षित करने वाली अभ्यास असाइनमेंट शीट तैयार करना" },
    ],
  },
  {
    id: "3",
    title: { en: "Program Coordinator", hi: "कार्यक्रम समन्वयक" },
    department: { en: "Operations", hi: "संचालन" },
    location: { en: "Rishikesh, Uttarakhand (On-Site)", hi: "ऋषिकेश, उत्तराखंड (ऑन-साइट)" },
    type: { en: "Full-Time", hi: "पूर्णकालिक" },
    description: {
      en: "Oversee operations at our local Uttarakhand training centers, handle student enrollments, coordinate guest workshops, and manage logistics.",
      hi: "हमारे स्थानीय उत्तराखंड प्रशिक्षण केंद्रों पर संचालन की निगरानी करें, छात्र नामांकन संभालें, अतिथि कार्यशालाओं का समन्वय करें और रसद का प्रबंधन करें।"
    },
    requirements: [
      { en: "1+ year of experience in project coordination, community management, or operations", hi: "परियोजना समन्वय, समुदाय प्रबंधन या संचालन में 1+ वर्ष का अनुभव" },
      { en: "Exceptional organizational and schedule management abilities", hi: "असाधारण संगठनात्मक और समय-सारणी प्रबंधन क्षमताएं" },
      { en: "Fluency in Hindi and English with strong interpersonal skills", hi: "मजबूत पारस्परिक कौशल के साथ हिंदी और अंग्रेजी में प्रवाह" },
      { en: "Empathy and dedication to rural community empowerment", hi: "ग्रामीण समुदाय के सशक्तिकरण के लिए सहानुभूति और समर्पण" },
    ],
    responsibilities: [
      { en: "Oversee day-to-day facilities management at local learning hubs", hi: "स्थानीय शिक्षण केंद्रों पर दैनिक सुविधा प्रबंधन की निगरानी करना" },
      { en: "Organize student outreach, intake registrations, and course completion certificates", hi: "छात्र आउटरीच, पंजीकरण और पाठ्यक्रम पूर्णता प्रमाण पत्र व्यवस्थित करना" },
      { en: "Coordinate scheduling between corporate instructors and student cohorts", hi: "कॉर्पोरेट प्रशिक्षकों और छात्र समूहों के बीच शेड्यूलिंग का समन्वय करना" },
      { en: "Generate monthly center performance reports and student retention scores", hi: "मासिक केंद्र प्रदर्शन रिपोर्ट और छात्र प्रतिधारण स्कोर उत्पन्न करना" },
    ],
  },
  {
    id: "4",
    title: { en: "Community Outreach Lead", hi: "सामुदायिक आउटरीच लीड" },
    department: { en: "Outreach & Growth", hi: "आउटरीच और विकास" },
    location: { en: "Rishikesh, Uttarakhand (Hybrid)", hi: "ऋषिकेश, उत्तराखंड (हाइब्रिड)" },
    type: { en: "Full-Time / Partner", hi: "पूर्णकालिक / भागीदार" },
    description: {
      en: "Drive corporate sponsorship partnerships, manage digital channels, compile impact stories, and coordinate volunteer campaigns to raise support.",
      hi: "कॉर्पोरेट प्रायोजन साझेदारी चलाएं, डिजिटल चैनलों का प्रबंधन करें, प्रभाव की कहानियां संकलित करें और समर्थन जुटाने के लिए स्वयंसेवक अभियानों का समन्वय करें।"
    },
    requirements: [
      { en: "Background in digital marketing, public relations, or NGO management", hi: "डिजिटल मार्केटिंग, जनसंपर्क या एनजीओ प्रबंधन में पृष्ठभूमि" },
      { en: "Excellent copywriting, presentation skills, and graphic creation comfort", hi: "असाधारण कॉपीराइटिंग, प्रस्तुति कौशल और ग्राफिक निर्माण में सहजता" },
      { en: "Familiarity with LinkedIn engagement, newsletter campaigns, and PR outreach", hi: "लिंक्डइन जुड़ाव, समाचार पत्र अभियानों और पीआर आउटरीच से परिचित होना" },
      { en: "Energetic personality comfortable networking with corporate donors", hi: "कॉर्पोरेट दाताओं के साथ नेटवर्किंग में सहज ऊर्जावान व्यक्तित्व" },
    ],
    responsibilities: [
      { en: "Design and execute digital outreach campaigns on LinkedIn, Instagram, and web portals", hi: "लिंक्डइन, इंस्टाग्राम और वेब पोर्टल्स पर डिजिटल आउटरीच अभियान तैयार करना और निष्पादित करना" },
      { en: "Create monthly impact newsletters highlighting student success stories", hi: "छात्रों की सफलता की कहानियों को उजागर करने वाले मासिक प्रभाव समाचार पत्र बनाना" },
      { en: "Pitch program models to potential corporate partners (CSR) and academic sponsors", hi: "संभावित कॉर्पोरेट भागीदारों (सीएसआर) और शैक्षणिक प्रायोजकों के सामने कार्यक्रम मॉडल पेश करना" },
      { en: "Coordinate onboarding and task assignments for our global network of volunteers", hi: "स्वयंसेवकों के हमारे वैश्विक नेटवर्क के लिए ऑनबोर्डिंग और कार्य असाइनमेंट का समन्वय करना" },
    ],
  },
];

export default function CareersPage() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyClick = (title: string) => {
    setSelectedRole(title);
    const formElement = document.getElementById("apply-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error(t({ en: "Please select a position to apply for.", hi: "कृपया आवेदन करने के लिए एक पद का चयन करें।" }));
      return;
    }
    setSubmitLoading(true);
    toast.loading(t({ en: "Submitting your application...", hi: "आपका आवेदन जमा किया जा रहा है..." }));

    setTimeout(() => {
      setSubmitLoading(false);
      toast.dismiss();
      toast.success(
        t({
          en: `Application for '${selectedRole}' submitted successfully! We will contact you soon.`,
          hi: `'${selectedRole}' के लिए आपका आवेदन सफलतापूर्वक प्राप्त हुआ! हम आपसे जल्द ही संपर्क करेंगे।`,
        })
      );
      setFormInputs({
        name: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
      });
      setSelectedRole("");
    }, 1500);
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-20 pt-24 text-slate-100">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-950 text-white py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <Breadcrumbs />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            {t({ en: "Join Our Team", hi: "हमारी टीम में शामिल हों" })}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            {t({
              en: "Build a resilient future by empowering rural youth with technical education. Find full-time, part-time, and volunteer roles.",
              hi: "तकनीकी शिक्षा के साथ ग्रामीण युवाओं को सशक्त बनाकर एक लचीला भविष्य बनाएं। पूर्णकालिक, अंशकालिक और स्वयंसेवक भूमिकाएं खोजें।",
            })}
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <Section
        title={t({ en: "Why Work With Us?", hi: "हमारे साथ काम क्यों करें?" })}
        subtitle={t({
          en: "Be part of a thriving ecosystem focused on educational inclusion and digital empowerment.",
          hi: "शैक्षिक समावेश और डिजिटल सशक्तिकरण पर केंद्रित एक फलते-फूलते पारिस्थितिकी तंत्र का हिस्सा बनें।",
        })}
        className="bg-slate-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-accent-950/20 text-accent-400 flex items-center justify-center mb-5 shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t({ en: "Meaningful Impact", hi: "सार्थक प्रभाव" })}
            </h3>
            <p className="text-sm text-primary-300 leading-relaxed">
              {t({
                en: "Your daily efforts directly help students from remote communities learn technology, crack placement interviews, and lift their families.",
                hi: "आपके दैनिक प्रयास सीधे दूरदराज के समुदायों के छात्रों को प्रौद्योगिकी सीखने, प्लेसमेंट साक्षात्कार पास करने और उनके परिवारों के उत्थान में मदद करते हैं।",
              })}
            </p>
          </Card>
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/20 text-emerald-450 flex items-center justify-center mb-5 shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t({ en: "Empowering Culture", hi: "सशक्त बनाने वाली संस्कृति" })}
            </h3>
            <p className="text-sm text-primary-300 leading-relaxed">
              {t({
                en: "Work alongside passionate software engineers, expert educators, and global community builders committed to positive social change.",
                hi: "सकारात्मक सामाजिक परिवर्तन के लिए प्रतिबद्ध उत्साही सॉफ्टवेयर इंजीनियरों, विशेषज्ञ शिक्षकों और वैश्विक समुदाय के निर्माताओं के साथ मिलकर काम करें।",
              })}
            </p>
          </Card>
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-950/20 text-blue-400 flex items-center justify-center mb-5 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t({ en: "Growth & Learning", hi: "विकास और सीखना" })}
            </h3>
            <p className="text-sm text-primary-300 leading-relaxed">
              {t({
                en: "Design cutting-edge tech curriculum, build learning systems, and take absolute ownership of educational operations.",
                hi: "अत्याधुनिक तकनीकी पाठ्यक्रम तैयार करें, शिक्षण प्रणालियों का निर्माण करें और शैक्षिक कार्यों का पूर्ण स्वामित्व लें।",
              })}
            </p>
          </Card>
        </div>
      </Section>

      {/* Open Positions Accordions */}
      <Section
        title={t({ en: "Open Opportunities", hi: "खुले अवसर" })}
        subtitle={t({
          en: "Explore open positions and pick the one that matches your passion and skill set.",
          hi: "खुले पदों का अन्वेषण करें और वह चुनें जो आपके जुनून और कौशल सेट से मेल खाता हो।",
        })}
        className="bg-slate-800/40"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          {positionsData.map((position) => {
            const isExpanded = expandedId === position.id;
            return (
              <motion.div
                key={position.id}
                layout
                className="bg-slate-800 rounded-2xl border border-slate-700/80 shadow-sm overflow-hidden"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleExpand(position.id)}
                  className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:bg-slate-750/30 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-accent-950/20 text-accent-400 px-2 py-0.5 rounded">
                      {t(position.department)}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {t(position.title)}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-primary-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {t(position.location)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {t(position.type)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center self-end sm:self-center gap-2">
                    <span className="text-xs font-bold text-accent-400 hidden sm:inline">
                      {isExpanded
                        ? t({ en: "Show Less", hi: "कम दिखाएं" })
                        : t({ en: "View Details", hi: "विवरण देखें" })}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-primary-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary-400" />
                    )}
                  </div>
                </button>

                {/* Details Accordion Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-slate-700/50 bg-slate-900/40 px-6 py-6"
                    >
                      <div className="space-y-6">
                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-2">
                            {t({ en: "Role Description", hi: "भूमिका का विवरण" })}
                          </h4>
                          <p className="text-sm text-primary-300 leading-relaxed">
                            {t(position.description)}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-2 flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4" /> {t({ en: "Key Responsibilities", hi: "मुख्य जिम्मेदारियां" })}
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-primary-300 space-y-1.5">
                            {position.responsibilities.map((resp, i) => (
                              <li key={i}>{t(resp)}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-2 flex items-center gap-1.5">
                            <GraduationCap className="h-4 w-4" /> {t({ en: "Role Requirements", hi: "भूमिका की आवश्यकताएं" })}
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-primary-300 space-y-1.5">
                            {position.requirements.map((req, i) => (
                              <li key={i}>{t(req)}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Quick Apply button */}
                        <div className="pt-4 border-t border-slate-800 flex justify-end">
                          <button
                            onClick={() => handleApplyClick(position.title.en)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-accent hover:shadow-lg text-white font-bold text-xs transition-all cursor-pointer"
                          >
                            {t({ en: "Apply for this Role", hi: "इस भूमिका के लिए आवेदन करें" })}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Application Form */}
      <section id="apply-form-section" className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <Card className="p-8 sm:p-10 shadow-lg bg-slate-800 border-slate-700/80">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {t({ en: "Job Application Form", hi: "नौकरी आवेदन पत्र" })}
            </h2>
            <p className="text-sm text-primary-300">
              {t({
                en: "Submit your profile details. Our hiring team will review your background and respond within 5 business days.",
                hi: "अपने प्रोफाइल का विवरण जमा करें। हमारी भर्ती टीम आपकी पृष्ठभूमि की समीक्षा करेगी और 5 कार्य दिवसों के भीतर प्रतिक्रिया देगी।",
              })}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t({ en: "Full Name", hi: "पूरा नाम" })}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formInputs.name}
                  onChange={handleInputChange}
                  placeholder={t({ en: "Enter your full name", hi: "अपना पूरा नाम दर्ज करें" })}
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t({ en: "Email Address", hi: "ईमेल पता" })}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formInputs.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t({ en: "Phone Number", hi: "फ़ोन नंबर" })}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formInputs.phone}
                  onChange={handleInputChange}
                  placeholder={t({ en: "10-digit phone number", hi: "10 अंकों का फ़ोन नंबर" })}
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t({ en: "Position Applying For", hi: "जिस पद के लिए आवेदन कर रहे हैं" })}
                </label>
                <select
                  name="role"
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner cursor-pointer"
                >
                  <option value="">{t({ en: "Select a position...", hi: "एक पद चुनें..." })}</option>
                  {positionsData.map((p) => (
                    <option key={p.id} value={p.title.en}>
                      {t(p.title)}
                    </option>
                  ))}
                  <option value="General Volunteer">{t({ en: "General Volunteer / Intern", hi: "सामान्य स्वयंसेवक / इंटर्न" })}</option>
                </select>
              </div>
            </div>

            {/* Resume Link */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t({ en: "Resume / Portfolio URL", hi: "रिज्यूमे / पोर्टफोलियो URL" })}
              </label>
              <input
                type="url"
                name="resumeUrl"
                required
                value={formInputs.resumeUrl}
                onChange={handleInputChange}
                placeholder={t({ en: "Google Drive, Dropbox, or LinkedIn link", hi: "गूगल ड्राइव, ड्रॉपबॉक्स या लिंक्डइन लिंक" })}
                className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t({ en: "Why do you want to join us?", hi: "आप हमारे साथ क्यों जुड़ना चाहते हैं?" })}
              </label>
              <textarea
                name="coverLetter"
                rows={5}
                required
                value={formInputs.coverLetter}
                onChange={handleInputChange}
                placeholder={t({
                  en: "Share a brief statement about your drive and how you can add value to the community...",
                  hi: "अपने जुनून और इस बारे में एक संक्षिप्त विवरण साझा करें कि आप समुदाय में कैसे मूल्य जोड़ सकते हैं...",
                })}
                className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-primary hover:shadow-lg text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitLoading ? t({ en: "Submitting Application...", hi: "आवेदन जमा किया जा रहा है..." }) : (
                <>
                  {t({ en: "Submit Application", hi: "आवेदन जमा करें" })} <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}

