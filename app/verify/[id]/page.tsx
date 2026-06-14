import { prisma } from "@/lib/db";
import { CheckCircle2, XCircle, Award, User, ShieldCheck, Calendar } from "lucide-react";
import Link from "next/link";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;
  let isValid = false;
  let type: "ID_CARD" | "CERTIFICATE" | null = null;
  let details: any = null;

  // 1. Check if it's an ID Card
  const idCard = await prisma.generatedIDCard.findUnique({
    where: { internId: id },
    include: {
      application: true,
    },
  });

  if (idCard) {
    isValid = true;
    type = "ID_CARD";
    details = {
      name: idCard.application.fullName,
      domain: idCard.application.domain,
      id: idCard.internId,
      date: new Date(idCard.generatedAt).toLocaleDateString(),
      duration: "8 Weeks",
      additional: "Internship Active / Selected",
    };
  } else {
    // 2. Check if it's a Completion Certificate
    const cert = await prisma.generatedCertificate.findFirst({
      where: {
        OR: [
          { certificateNumber: id },
          { verificationCode: id }
        ]
      },
      include: {
        application: true,
      },
    });

    if (cert) {
      isValid = true;
      type = "CERTIFICATE";
      details = {
        name: cert.application.fullName,
        domain: cert.application.domain,
        id: cert.certificateNumber,
        date: new Date(cert.issuedAt).toLocaleDateString(),
        duration: "8 Weeks",
        additional: "Internship Successfully Completed & Certified",
      };
    }
  }

  return (
    <div className="min-h-screen bg-[#071826] text-slate-100 flex flex-col items-center justify-center p-4 pt-24 pb-16">
      <div className="max-w-md w-full bg-[#0F2233] border border-[#1E3A4C] rounded-3xl p-6 md:p-8 shadow-2xl relative text-center">
        {/* Logo context */}
        <div className="mb-8">
          <h1 className="text-lg font-black text-white">NextGen Devbhoomi Foundation</h1>
          <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">Verification Portal</p>
        </div>

        {isValid ? (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/20">
              <ShieldCheck className="h-9 w-9 shrink-0" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Document Valid
              </span>
              <h2 className="text-xl font-bold text-white pt-3">Verification Successful</h2>
              <p className="text-xs text-slate-400 mt-1">This credential has been officially issued by the foundation.</p>
            </div>

            {/* Verification details table */}
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/30 text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-500 font-semibold">Credential Type</span>
                <span className="text-white font-bold">{type === "CERTIFICATE" ? "Completion Certificate" : "Intern Identity Card"}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-500 font-semibold">Student Name</span>
                <span className="text-white font-bold">{details.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-500 font-semibold">Intern ID / Cert No</span>
                <span className="text-[#F97316] font-bold">{details.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-500 font-semibold">Specialization Domain</span>
                <span className="text-white font-bold">{details.domain}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-500 font-semibold">Program Duration</span>
                <span className="text-white font-bold">{details.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Issued Date</span>
                <span className="text-white font-bold">{details.date}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-400 font-medium leading-relaxed">
              {details.additional}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-rose-950/20">
              <XCircle className="h-9 w-9 shrink-0" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                Invalid
              </span>
              <h2 className="text-xl font-bold text-white pt-3">Verification Failed</h2>
              <p className="text-xs text-slate-400 mt-1">The provided verification key could not be recognized.</p>
            </div>

            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl text-xs text-slate-300 leading-relaxed text-left">
              <strong>Warning:</strong> This key (<code>{id}</code>) does not match any valid generated ID card or completion certificate in the database. Please verify the credentials or contact support if you believe this is an error.
            </div>
          </div>
        )}

        <hr className="border-slate-800 my-6" />

        <Link
          href="/"
          className="text-xs font-bold text-[#F97316] hover:underline inline-flex items-center gap-1.5"
        >
          Return to home page
        </Link>
      </div>
    </div>
  );
}
