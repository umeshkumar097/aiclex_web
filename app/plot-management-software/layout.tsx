import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plot Management Software India | Township & Builder Tool",
  description: "Real-time plot availability, booking lock, payment tracking & document management for builders and township developers in India. Book a free demo with AICLEX.",
  keywords: ["plot management software india", "township management software", "builder plot tracking software", "real estate plot inventory management", "plotted development software india"],
  alternates: { canonical: "/plot-management-software" },
  openGraph: {
    title: "Plot Management Software India | Township & Builder Tool",
    description: "Real-time plot availability, booking lock, payment tracking & document management for builders and township developers in India.",
    url: "https://aiclex.in/plot-management-software",
    type: "website",
  },
};

export default function PlotManagementLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
