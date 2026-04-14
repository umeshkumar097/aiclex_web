import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI SEO Checker | Website Audit & Optimization Tool | AICLEX™",
  description: "Get a comprehensive website audit in seconds with our Free AI SEO Checker. Identify technical SEO gaps, fix meta tags, and improve your Google rankings instantly.",
  keywords: ["Free AI SEO Checker", "Website Audit Tool India", "SEO Optimization Assistant", "Next.js SEO Tool", "AICLEX AI Tools"],
  openGraph: {
    title: "Free AI SEO Checker | AICLEX™ Technologies",
    description: "Scan your website for SEO errors and get actionable AI-generated recommendations to rank on Page 1.",
    url: "https://www.aiclex.in/free-tools/ai-seo-checker",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
