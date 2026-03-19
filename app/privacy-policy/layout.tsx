import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AICLEX Technologies",
  description: "Our privacy policy outlines how we collect, use, and protect your data at AICLEX Technologies.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
