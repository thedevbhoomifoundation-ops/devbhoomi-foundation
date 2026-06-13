"use client";
import { useTranslation } from "react-i18next";

import { Section, Card, Button } from "@/components/ui";
import { Heart, Briefcase, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

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
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.volunteer.page.makeARealImpact')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg mb-6">
          {t('app.volunteer.page.joinOurCommunityOf2000Pas')}
        </p>
        <div className="flex justify-center">
          <Button size="lg" className="bg-white text-primary-900 hover:bg-white/90 cursor-pointer">
            {t('app.volunteer.page.applyToVolunteer')}
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyVolunteerSection() {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: Heart,
      title: t('app.volunteer.page.makeRealImpact'),
      description: t('app.volunteer.page.directlyContributeToTransfo'),
    },
    {
      icon: Users,
      title: t('app.volunteer.page.buildNetwork'),
      description: t('app.volunteer.page.connectWithLikemindedIndivi'),
    },
    {
      icon: TrendingUp,
      title: t('app.volunteer.page.growSkills'),
      description: t('app.volunteer.page.developLeadershipMentoringA'),
    },
    {
      icon: Briefcase,
      title: t('app.volunteer.page.gainExperience'),
      description: t('app.volunteer.page.buildYourPortfolioAndGain'),
    },
  ];

  return (
    <Section
      title={t('app.volunteer.page.whyVolunteerWithUs')}
      className="bg-slate-900"
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
                <h3 className="font-semibold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-primary-300">
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
  const { t } = useTranslation();

  const roles = [
    {
      title: t('app.volunteer.page.studentMentor'),
      time: t('app.volunteer.page.flexible510Hrsweek'),
      requirements: t('app.volunteer.page.techBackgroundOrTeachingPa'),
      description: t('app.volunteer.page.guideStudentsThroughTheirL'),
    },
    {
      title: t('app.volunteer.page.eventOrganizer'),
      time: t('app.volunteer.page.eventbased1015Hrsmonth'),
      requirements: t('app.volunteer.page.organizationalAndCommunicati'),
      description: t('app.volunteer.page.organizeWorkshopsWebinarsAn'),
    },
    {
      title: t('app.volunteer.page.contentCreator'),
      time: t('app.volunteer.page.flexible58Hrsweek'),
      requirements: t('app.volunteer.page.writingOrVideoProductionSk'),
      description: t('app.volunteer.page.createEducationalContentAnd'),
    },
    {
      title: t('app.volunteer.page.campusAmbassador'),
      time: t('app.volunteer.page.regular812Hrsweek'),
      requirements: t('app.volunteer.page.leadershipAndCommunityEngag'),
      description: t('app.volunteer.page.representTheFoundationAtYo'),
    },
    {
      title: t('app.volunteer.page.techSupport'),
      time: t('app.volunteer.page.asNeeded'),
      requirements: t('app.volunteer.page.technicalTroubleshootingSkil'),
      description: t('app.volunteer.page.provideTechnicalAssistanceT'),
    },
    {
      title: t('app.volunteer.page.socialMediaManager'),
      time: t('app.volunteer.page.flexible58Hrsweek'),
      requirements: t('app.volunteer.page.socialMediaAndDesignSkills'),
      description: t('app.volunteer.page.manageOurSocialPlatformsAn'),
    },
  ];

  return (
    <Section
      title={t('app.volunteer.page.volunteerOpportunities')}
      subtitle={t('app.volunteer.page.findThePerfectRoleForYour')}
      className="bg-slate-850"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <Card key={i} hover>
              <h3 className="text-lg font-semibold text-white mb-3">
                {role.title}
              </h3>
              <div className="space-y-2 mb-4 text-sm">
                <p>
                  <span className="font-medium text-white">{t('app.volunteer.page.time')}</span>
                  <span className="text-primary-300">{role.time}</span>
                </p>
                <p>
                  <span className="font-medium text-white">
                    {t('app.volunteer.page.requirements')}
                  </span>
                  <span className="text-primary-300"> {role.requirements}</span>
                </p>
              </div>
              <p className="text-primary-200 mb-4">{role.description}</p>
              <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all text-sm cursor-pointer">
                {t('app.volunteer.page.applyNow')}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function BenefitsSection() {
  const { t } = useTranslation();

  const benefits = [
    t('app.volunteer.page.certificateOfAppreciation'),
    t('app.volunteer.page.professionalReferenceLetters'),
    t('app.volunteer.page.accessToPremiumCourses'),
    t('app.volunteer.page.networkingOpportunities'),
    t('app.volunteer.page.freeMerchandise'),
    t('app.volunteer.page.priorityForSpeakingOpportun'),
    t('app.volunteer.page.travelReimbursementIfApplic'),
    t('app.volunteer.page.mentorshipFromLeadershipTea'),
  ];

  return (
    <Section
      title={t('app.volunteer.page.volunteerBenefits')}
      className="bg-slate-900"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-accent-500 flex-shrink-0" />
              <span className="text-lg text-white">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ApplicationSection() {
  const { t } = useTranslation();

  return (
    <Section className="bg-gradient-primary text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {t('app.volunteer.page.readyToMakeAnImpact')}
        </h2>
        <p className="text-xl text-white/80 mb-8">
          {t('app.volunteer.page.joinUsInOurMissionToTran')}
        </p>
        <button className="px-8 py-3 rounded-lg bg-white text-primary-900 font-semibold hover:shadow-lg transition-all cursor-pointer">
          {t('app.volunteer.page.applyToVolunteerToday')}
        </button>
      </div>
    </Section>
  );
}
