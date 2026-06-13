import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "@/providers/language-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Nextgen Devbhoomi Foundation - Technical Education & Community Empowerment",
  description:
    "Transform lives through world-class technical education, volunteer opportunities, and community empowerment in the Himalayan region.",
  keywords: ["education", "technology", "foundation", "NGO", "volunteering", "coding"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="font-body antialiased bg-[#071826] text-[#EAF2F8]">
        <LanguageProvider>
          <div className="min-h-screen overflow-x-hidden bg-[#071826] text-[#EAF2F8]">
            <Navbar />
            <main className="pb-16 md:pb-0">{children}</main>
            <BottomNavigation />
            <Footer />
            <Toaster position="top-center" richColors />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
