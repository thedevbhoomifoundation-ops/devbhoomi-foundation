import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Nextgen Devbhoomi Foundation",
  description:
    "Learn about Nextgen Devbhoomi Foundation, a non-profit organization dedicated to holistic societal development. Discover our initiatives in Education, Healthcare, Sustainability, and Community Relief, and explore remote internship opportunities.",
  keywords: [
    "About Nextgen Devbhoomi Foundation",
    "holistic societal development",
    "education support",
    "healthcare initiatives",
    "environment sustainability",
    "disaster relief",
    "remote internships students freshers",
    "Web/App Development",
    "AI/Machine Learning",
    "Data Science",
    "Digital Marketing",
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
