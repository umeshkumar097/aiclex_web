import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | AICLEX Technologies",
  description: "Our terms and conditions govern the use of AICLEX Technologies services and website.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
