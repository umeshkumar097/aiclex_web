import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Expertise & Vision",
  description: "Learn about AICLEX Technologies, a leading digital agency in India specializing in Zoom Reselling, AI solutions, and digital transformation.",
  keywords: ["About AICLEX", "Digital Agency India", "Technology Solutions Partner", "AICLEX Team"],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
