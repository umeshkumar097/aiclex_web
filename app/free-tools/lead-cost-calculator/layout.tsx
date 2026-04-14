import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Cost Benchmarker | Calculate Cost-Per-Lead (CPL) | AICLEX™",
  description: "Find out if you are overpaying for leads. Use our AI Lead Cost Calculator to benchmark your CPL against industry standards in India and optimize your marketing spend.",
  keywords: ["Lead Cost Calculator", "CPL Benchmarking Tool", "Marketing Cost Calculator India", "B2B Lead Cost Analysis", "AICLEX AI Tools"],
  openGraph: {
    title: "Lead Cost Benchmarker | AICLEX™ Technologies",
    description: "Compare your lead costs with current market data and find opportunities to save on your marketing budget.",
    url: "https://www.aiclex.in/free-tools/lead-cost-calculator",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
