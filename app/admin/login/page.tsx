import { SignIn } from "@clerk/nextjs";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#071826] flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-xl md:text-2xl font-black text-white">NextGen Devbhoomi Foundation</h1>
        <p className="text-xs text-[#F97316] font-semibold mt-1">Secure Administrator Portal</p>
      </div>

      <SignIn
        routing="hash"
        forceRedirectUrl="/admin/dashboard"
        appearance={{
          elements: {
            rootBox: "mx-auto shadow-2xl rounded-2xl border border-[#1E3A4C]",
            card: "bg-[#0F2233] text-white",
            headerTitle: "text-white text-lg font-bold",
            headerSubtitle: "text-slate-400 text-xs",
            formButtonPrimary: "bg-[#F97316] hover:bg-[#EA6B0C] text-sm text-white",
            footerActionLink: "text-[#F97316] hover:text-[#EA6B0C]",
          },
        }}
      />
    </div>
  );
}
