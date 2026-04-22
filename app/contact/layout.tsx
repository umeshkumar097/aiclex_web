import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Contact AICLEX Technologies, Zoom Reseller & Digital Marketing India",
  },
  description: "Get in touch with AICLEX Technologies for Zoom licensing, digital marketing, custom SaaS, and AI solutions. Book a free strategy call today.",
  alternates: {
    canonical: "/contact",
  },
  keywords: ["Contact AICLEX", "Zoom Support India", "Business Consultation", "AI Agent Demo"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
