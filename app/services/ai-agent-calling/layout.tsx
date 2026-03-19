import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Calling Services | Indian Business Automation",
  description: "Scale your customer outreach with AI Powered Calling Agents. Automate lead qualification, appointment setting, and support with human-like voice AI.",
  keywords: ["AI Agent Calling", "Automated Calling Services", "Lead Qualification AI", "Voice AI India", "AICLEX AI solutions"],
};

export default function AIAgentCallingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
