import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Ads ROI Calculator | Predict Campaign Profitability | AICLEX™",
  description: "Calculate your Google and Facebook Ads ROI instantly with our AI-powered calculator. Predict profit, ROAS, and customer acquisition costs before you spend a rupee.",
  keywords: ["Ads ROI Calculator", "PPC Profit Predictor", "ROAS Calculator India", "Facebook Ads ROI Tool", "AICLEX AI Tools"],
  openGraph: {
    title: "Free Ads ROI Calculator | AICLEX™ Technologies",
    description: "Input your budget and expected metrics to see your projected ROI in real-time.",
    url: "https://aiclex.in/free-tools/ads-roi-calculator",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
