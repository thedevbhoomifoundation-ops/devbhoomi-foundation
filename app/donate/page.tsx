"use client";
import { useTranslation } from "react-i18next";

import { Section, Card } from "@/components/ui";
import { Heart, TrendingUp, Users, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

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
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white py-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          {t('app.donate.page.supportOurMission')}
        </h1>
        <p className="max-w-2xl mx-auto text-primary-200 text-base sm:text-lg">
          {t('app.donate.page.yourDonationDirectlyImpacts')}
        </p>
      </div>
    </section>
  );
}

function DonationPlansSection() {
  const { t } = useTranslation();

  const plans = [
    {
      title: t('app.donate.page.studentSupport'),
      amount: "₹999",
      period: t('app.donate.page.onetime'),
      description: t('app.donate.page.supportOneStudentsCourseEn'),
      impact: t('app.donate.page.help1StudentAccessPremium'),
      icon: "🎓",
    },
    {
      title: t('app.donate.page.scholarshipFund'),
      amount: "₹2,499",
      period: t('app.donate.page.onetime'),
      description: t('app.donate.page.provideAMonthlyStipendToA'),
      impact: t('app.donate.page.support1StudentForAMonth'),
      icon: "📚",
    },
    {
      title: t('app.donate.page.monthlySupporter'),
      amount: t('app.donate.page.500month'),
      period: t('app.donate.page.monthly'),
      description: t('app.donate.page.joinAsARecurringMonthlyDo'),
      impact: t('app.donate.page.provideOngoingSupportToStu'),
      icon: "💝",
    },
    {
      title: t('app.donate.page.programSponsor'),
      amount: "₹5,000",
      period: t('app.donate.page.onetime'),
      description: t('app.donate.page.sponsorAnEntireCourseOrPr'),
      impact: t('app.donate.page.enableFullProgramForMultip'),
      icon: "🚀",
    },
    {
      title: t('app.donate.page.infrastructure'),
      amount: "₹10,000",
      period: t('app.donate.page.onetime'),
      description: t('app.donate.page.supportBuildingLearningCent'),
      impact: t('app.donate.page.buildALearningFacilityInR'),
      icon: "🏢",
    },
    {
      title: t('app.donate.page.communityHero'),
      amount: "₹25,000+",
      period: t('app.donate.page.custom'),
      description: t('app.donate.page.customDonationForMaximumIm'),
      impact: t('app.donate.page.personalizedImpactBasedOnY'),
      icon: "👑",
    },
  ];

  return (
    <Section
      title={t('app.donate.page.donationPlans')}
      subtitle={t('app.donate.page.chooseHowYoudLikeToMakeA')}
      className="bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <Card key={i} hover className="flex flex-col">
              <div className="text-5xl mb-4">{plan.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {plan.title}
              </h3>
              <div className="mb-4">
                <div className="text-3xl font-bold text-accent-500">{plan.amount}</div>
                <div className="text-sm text-primary-300">{plan.period}</div>
              </div>
              <p className="text-sm text-primary-300 mb-3 flex-1">
                {plan.description}
              </p>
              <div className="p-3 bg-accent-900/20 rounded-lg mb-4">
                <p className="text-sm font-medium text-accent-300">
                  ✨ {plan.impact}
                </p>
              </div>
              <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer">
                {t('app.donate.page.donateNow')}
              </button>
            </Card>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mx-auto">
          <Card>
            <h3 className="text-xl font-semibold text-white mb-4">
              {t('app.donate.page.customDonation')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t('app.donate.page.enterAmount')}
                </label>
                <input
                  type="number"
                  placeholder={t('app.donate.page.enterAnyAmount')}
                  className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <button className="w-full py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer">
                {t('app.donate.page.proceedToPayment')}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function ImpactSection() {
  const { t } = useTranslation();

  const impacts = [
    {
      icon: Users,
      stat: "15000+",
      label: t('app.donate.page.studentsReached'),
      description: t('app.donate.page.directBeneficiariesOfOurPr'),
    },
    {
      icon: TrendingUp,
      stat: "₹50L+",
      label: t('app.donate.page.amountDonated'),
      description: t('app.donate.page.totalFundsRaisedAndUtilize'),
    },
    {
      icon: Award,
      stat: "50+",
      label: t('app.donate.page.coursesOffered'),
      description: t('app.donate.page.diverseLearningOpportunities'),
    },
    {
      icon: Heart,
      stat: "2000+",
      label: t('app.donate.page.activeVolunteers'),
      description: t('app.donate.page.communityMembersContributing'),
    },
  ];

  return (
    <Section
      title={t('app.donate.page.yourDonationsImpact')}
      className="bg-slate-850"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, i) => {
            const Icon = impact.icon;
            return (
              <Card key={i} className="text-center">
                <Icon className="h-12 w-12 text-accent-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {impact.stat}
                </div>
                <div className="text-white font-semibold mb-2">
                  {impact.label}
                </div>
                <p className="text-sm text-primary-300">
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
  const { t } = useTranslation();

  const faqs = [
    {
      q: t('app.donate.page.isMyDonationTaxdeductible'),
      a: t('app.donate.page.yesWereARegistered80gNgo'),
    },
    {
      q: t('app.donate.page.howIsMyDonationUsed'),
      a: t('app.donate.page.100OfDonationsGoDirectlyT'),
    },
    {
      q: t('app.donate.page.canITrackMyDonationsImpac'),
      a: t('app.donate.page.yesAllDonorsReceiveRegular'),
    },
    {
      q: t('app.donate.page.whatPaymentMethodsDoYouAc'),
      a: t('app.donate.page.weAcceptAllMajorCreditdebi'),
    },
  ];

  return (
    <Section
      title={t('app.donate.page.frequentlyAskedQuestions')}
      className="bg-slate-900"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <h3 className="text-lg font-semibold text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-primary-300">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  const { t } = useTranslation();

  return (
    <Section className="bg-gradient-to-r from-[#0B3C5D] to-[#E58A1F] text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heart className="h-12 w-12 mx-auto mb-4 fill-white text-white" />
        <h2 className="text-4xl font-bold mb-4">
          {t('app.donate.page.readyToMakeADifference')}
        </h2>
        <p className="text-xl text-white/80 mb-8 mx-auto">
          {t('app.donate.page.yourGenerosityDirectlyTrans')}
        </p>
        <button className="px-8 py-3 rounded-lg bg-white text-primary-900 font-semibold hover:shadow-lg transition-all cursor-pointer">
          {t('app.donate.page.makeADonation')}
        </button>
      </div>
    </Section>
  );
}
