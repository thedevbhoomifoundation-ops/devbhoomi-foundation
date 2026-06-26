"use client";
import { useTranslation } from "react-i18next";

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

interface TranslatedField {
  en: string;
  hi: string;
}

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const positionsData: Position[] = [
  {
    id: "1",
    title: "app.careers.page.technicalInstructorFullstack",
    department: "app.careers.page.education",
    location: "app.careers.page.patnaBiharHybrid",
    type: "app.careers.page.fulltime",
    description: "app.careers.page.teachAndMentorYoungStudent",
    requirements: [
      "app.careers.page.2YearsOfSoftwareDevelopmen",
      "app.careers.page.strongUnderstandingOfCoreC",
      "app.careers.page.excellentCommunicationAndA",
      "app.careers.page.priorTeachingLecturingOrMe",
    ],
    responsibilities: [
      "app.careers.page.conductDailyInteractiveLect",
      "app.careers.page.reviewStudentCodeSubmission",
      "app.careers.page.designProjectbasedCourseCur",
      "app.careers.page.guideStudentsThroughTheirF",
    ],
  },
  {
    id: "2",
    title: "app.careers.page.dsaAlgorithmMentor",
    department: "app.careers.page.education",
    location: "app.careers.page.remoteIndia",
    type: "app.careers.page.parttimeVolunteer",
    description: "app.careers.page.prepareAdvancedStudentsFor",
    requirements: [
      "app.careers.page.solidMasteryOfDataStructur",
      "app.careers.page.activeProfileOnCodingPlatf",
      "app.careers.page.strongVerbalAndWrittenGuid",
      "app.careers.page.availableForAtLeast68Hour",
    ],
    responsibilities: [
      "app.careers.page.conductWeeklyLiveInteractiv",
      "app.careers.page.runMockInterviewsTechnical",
      "app.careers.page.moderateStudentCodingDiscus",
      "app.careers.page.formulatePracticeAssignment",
    ],
  },
  {
    id: "3",
    title: "app.careers.page.programCoordinator",
    department: "app.careers.page.operations",
    location: "app.careers.page.patnaBiharOnsite",
    type: "app.careers.page.fulltime",
    description: "app.careers.page.overseeOperationsAtOurLoca",
    requirements: [
      "app.careers.page.1YearOfExperienceInProjec",
      "app.careers.page.exceptionalOrganizationalAnd",
      "app.careers.page.fluencyInHindiAndEnglishW",
      "app.careers.page.empathyAndDedicationToRura",
    ],
    responsibilities: [
      "app.careers.page.overseeDaytodayFacilitiesMa",
      "app.careers.page.organizeStudentOutreachInta",
      "app.careers.page.coordinateSchedulingBetween",
      "app.careers.page.generateMonthlyCenterPerfor",
    ],
  },
  {
    id: "4",
    title: "app.careers.page.communityOutreachLead",
    department: "app.careers.page.outreachGrowth",
    location: "app.careers.page.patnaBiharHybrid",
    type: "app.careers.page.fulltimePartner",
    description: "app.careers.page.driveCorporateSponsorshipPa",
    requirements: [
      "app.careers.page.backgroundInDigitalMarketin",
      "app.careers.page.excellentCopywritingPresenta",
      "app.careers.page.familiarityWithLinkedinEnga",
      "app.careers.page.energeticPersonalityComforta",
    ],
    responsibilities: [
      "app.careers.page.designAndExecuteDigitalOut",
      "app.careers.page.createMonthlyImpactNewslett",
      "app.careers.page.pitchProgramModelsToPotent",
      "app.careers.page.coordinateOnboardingAndTask",
    ],
  },
];

export default function CareersPage() {
  const { t } = useTranslation();
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
      toast.error(t('app.careers.page.pleaseSelectAPositionToAp'));
      return;
    }
    setSubmitLoading(true);
    toast.loading(t('app.careers.page.submittingYourApplication'));

    setTimeout(() => {
      setSubmitLoading(false);
      toast.dismiss();
      toast.success(
        t('app.careers.page.applicationSuccess', { role: t(selectedRole) })
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
            {t('app.careers.page.joinOurTeam')}
          </h1>
          <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
            {t('app.careers.page.buildAResilientFutureByEm')}
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <Section
        title={t('app.careers.page.whyWorkWithUs')}
        subtitle={t('app.careers.page.bePartOfAThrivingEcosyste')}
        className="bg-slate-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-accent-950/20 text-accent-400 flex items-center justify-center mb-5 shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('app.careers.page.meaningfulImpact')}
            </h3>
            <p className="text-sm text-primary-300 leading-relaxed">
              {t('app.careers.page.yourDailyEffortsDirectlyHe')}
            </p>
          </Card>
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/20 text-emerald-450 flex items-center justify-center mb-5 shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('app.careers.page.empoweringCulture')}
            </h3>
            <p className="text-sm text-primary-300 leading-relaxed">
              {t('app.careers.page.workAlongsidePassionateSoft')}
            </p>
          </Card>
          <Card hover className="text-center p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-950/20 text-blue-400 flex items-center justify-center mb-5 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('app.careers.page.growthLearning')}
            </h3>
            <p className="text-sm text-primary-300 leading-relaxed">
              {t('app.careers.page.designCuttingedgeTechCurric')}
            </p>
          </Card>
        </div>
      </Section>

      {/* Open Positions Accordions */}
      <Section
        title={t('app.careers.page.openOpportunities')}
        subtitle={t('app.careers.page.exploreOpenPositionsAndPic')}
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
                        ? t('app.careers.page.showLess')
                        : t('app.careers.page.viewDetails')}
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
                            {t('app.careers.page.roleDescription')}
                          </h4>
                          <p className="text-sm text-primary-300 leading-relaxed">
                            {t(position.description)}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-2 flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4" /> {t('app.careers.page.keyResponsibilities')}
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
                            <GraduationCap className="h-4 w-4" /> {t('app.careers.page.roleRequirements')}
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
                            onClick={() => handleApplyClick(position.title)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-accent hover:shadow-lg text-white font-bold text-xs transition-all cursor-pointer"
                          >
                            {t('app.careers.page.applyForThisRole')}
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
              {t('app.careers.page.jobApplicationForm')}
            </h2>
            <p className="text-sm text-primary-300">
              {t('app.careers.page.submitYourProfileDetailsOu')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t('app.careers.page.fullName')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formInputs.name}
                  onChange={handleInputChange}
                  placeholder={t('app.careers.page.enterYourFullName')}
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t('app.careers.page.emailAddress')}
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
                  {t('app.careers.page.phoneNumber')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formInputs.phone}
                  onChange={handleInputChange}
                  placeholder={t('app.careers.page.10digitPhoneNumber')}
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t('app.careers.page.positionApplyingFor')}
                </label>
                <select
                  name="role"
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner cursor-pointer"
                >
                  <option value="">{t('app.careers.page.selectAPosition')}</option>
                  {positionsData.map((p) => (
                    <option key={p.id} value={p.title}>
                      {t(p.title)}
                    </option>
                  ))}
                  <option value="General Volunteer">{t('app.careers.page.generalVolunteerIntern')}</option>
                </select>
              </div>
            </div>

            {/* Resume Link */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t('app.careers.page.resumePortfolioUrl')}
              </label>
              <input
                type="url"
                name="resumeUrl"
                required
                value={formInputs.resumeUrl}
                onChange={handleInputChange}
                placeholder={t('app.careers.page.googleDriveDropboxOrLinked')}
                className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t('app.careers.page.whyDoYouWantToJoinUs')}
              </label>
              <textarea
                name="coverLetter"
                rows={5}
                required
                value={formInputs.coverLetter}
                onChange={handleInputChange}
                placeholder={t('app.careers.page.shareABriefStatementAbout')}
                className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm shadow-inner resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-primary hover:shadow-lg text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitLoading ? t('app.careers.page.submittingApplication') : (
                <>
                  {t('app.careers.page.submitApplication')} <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}

