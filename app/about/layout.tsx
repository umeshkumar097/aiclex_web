import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "AI-First Product Studio India, About AICLEX Technologies",
  },
  description: "Learn about AICLEX Technologies, an AI-first product studio founded by Umesh Kumar & Krishika Gupta, based in Greater Noida, India.",
  keywords: ["About AICLEX", "Digital Agency India", "Technology Solutions Partner", "AICLEX Team"],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
