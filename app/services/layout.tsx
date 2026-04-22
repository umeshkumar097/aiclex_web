import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Digital Marketing, Zoom Reseller & AI Services India | AICLEX"
  },
  description: "Explore AICLEX's services, Zoom Reselling, Digital Marketing, Google & Meta Ads, Custom SaaS, and AI Workflow Automation for businesses across India.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
