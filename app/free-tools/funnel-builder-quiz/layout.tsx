import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Funnel Strategy Quiz | Find Your Perfect Sales Flow | AICLEX™",
  description: "Not sure which sales funnel works for your business? Take our 2-minute AI Funnel Strategy Quiz to get a customized blueprint based on your industry and goals.",
  keywords: ["AI Funnel Quiz", "Sales Strategy Blueprint", "Marketing Strategy Finder India", "Lead Generation Quiz", "AICLEX AI Tools"],
  openGraph: {
    title: "AI Funnel Strategy Quiz | AICLEX™ Technologies",
    description: "Discover the exact funnel model you need to scale your business with our AI-powered quiz.",
    url: "https://www.aiclex.in/free-tools/funnel-builder-quiz",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
