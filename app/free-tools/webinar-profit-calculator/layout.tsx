import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinar Profit Predictor | Calculate Course & Event ROI | AICLEX™",
  description: "Planning a webinar or online course? Use our AI Webinar Profit Calculator to predict your conversion rates, revenue, and net profit before you go live.",
  keywords: ["Webinar Profit Calculator", "Course ROI Predictor", "Online Event Profitability", "Webinar Funnel Tool India", "AICLEX AI Tools"],
  openGraph: {
    title: "Webinar Profit Predictor | AICLEX™ Technologies",
    description: "Input your registration costs and offer price to see your projected webinar profit instantly.",
    url: "https://aiclex.in/free-tools/webinar-profit-calculator",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
