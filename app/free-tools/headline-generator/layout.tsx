import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Viral Headline Generator | Catchy Title & Subject Lines | AICLEX™",
  description: "Stop writing boring headlines. Use our AI Headline Generator to create viral-ready titles for blogs, emails, and social media that maximize your click-through rates (CTR).",
  keywords: ["AI Headline Generator", "Viral Title Maker", "Catchy Subject Line Tool", "Blog Title Generator India", "AICLEX AI Tools"],
  openGraph: {
    title: "AI Viral Headline Generator | AICLEX™ Technologies",
    description: "Generate 10+ high-converting headlines for any topic in seconds using AI psychology.",
    url: "https://aiclex.in/free-tools/headline-generator",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
