import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Insights on Tech and Business | AICLEX",
  description: "Read the latest insights on Zoom, AI automation, and digital marketing trends from AICLEX Technologies.",
  keywords: ["AICLEX Blog", "Tech Insights", "AI Trends India", "Digital Marketing Blog"],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
