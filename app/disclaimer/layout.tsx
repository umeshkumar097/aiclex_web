import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | AICLEX Technologies",
  description: "The disclaimer for AICLEX Technologies website and services.",
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
