import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI WhatsApp Funnel Architect | Sales Strategy Generator | AICLEX™",
  description: "Build high-converting WhatsApp sales funnels in seconds. Our AI architect designs your message flow, automated responses, and follow-up strategy to increase your sales on WhatsApp.",
  keywords: ["WhatsApp Funnel Architect", "AI Sales Funnel Tool", "WhatsApp Marketing Strategy India", "Automated Sales Assistant", "AICLEX AI Tools"],
  openGraph: {
    title: "AI WhatsApp Funnel Architect | AICLEX™ Technologies",
    description: "Map out your entire customer journey on WhatsApp with AI-generated templates and automation logic.",
    url: "https://www.aiclex.in/free-tools/whatsapp-funnel-generator",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
