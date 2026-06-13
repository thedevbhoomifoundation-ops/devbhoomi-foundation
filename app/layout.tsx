import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen overflow-x-hidden bg-white dark:bg-slate-900 text-primary-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="pb-16 md:pb-0">{children}</main>
            <BottomNavigation />
            <Footer />
            <Toaster position="top-center" richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
