import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Consultation | AICLEX",
  description: "Get in touch with AICLEX Technologies for Zoom Reselling, AI Agent development, or Digital Marketing services. We provide 24/7 support for Indian businesses.",
  keywords: ["Contact AICLEX", "Zoom Support India", "Business Consultation", "AI Agent Demo"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
