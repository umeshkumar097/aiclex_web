import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | AICLEX Technologies",
  description: "Learn about our refund and cancellation policies at AICLEX Technologies.",
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
