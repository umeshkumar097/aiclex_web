import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Marketing Assistant | Content & Strategy Generator | AICLEX™",
  description: "Boost your social media growth with our free AI Marketing Assistant. Generate high-converting captions, posts, and marketing strategies for Instagram, LinkedIn, and Facebook in seconds.",
  keywords: ["AI Marketing Assistant", "Social Media Content Generator", "Free Marketing Tools India", "AI Caption Generator", "AICLEX AI Tools"],
  openGraph: {
    title: "Free AI Marketing Assistant | AICLEX™ Technologies",
    description: "Generate viral marketing content and seasonal strategies instantly with our AI-powered assistant.",
    url: "https://www.aiclex.in/free-tools/ai-marketing-assistant",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
