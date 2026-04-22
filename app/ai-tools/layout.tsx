import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "AI Tools Suite™ for Business Automation | AICLEX Technologies"
  },
  description: "Consolidate your marketing architecture. Access 9+ high-performance AI tools designed to find leakage, audit competitors, and automate your revenue growth.",
  alternates: {
    canonical: "/ai-tools",
  },
};

export default function AiToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
