import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Common Questions & Support | AICLEX",
  description: "Find answers to frequently asked questions about Zoom Reselling, AI Agent Calling, and our Digital Marketing processes.",
  keywords: ["AICLEX FAQs", "Zoom Reselling FAQs", "AI Agent Support", "Digital Marketing Help"],
};

export default function FagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
