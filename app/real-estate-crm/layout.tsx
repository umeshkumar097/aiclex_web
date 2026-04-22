import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate CRM India | Built for Builders & Brokers",
  description: "Manage leads, site visits, follow-ups & payments in one CRM built for Indian real estate teams. Portal integrations, GST invoices & agent tracking. Book a free demo.",
  keywords: ["real estate crm india", "crm for property developers", "real estate lead management", "builder crm software india", "property broker crm"],
  alternates: { canonical: "/real-estate-crm" },
  openGraph: {
    title: "Real Estate CRM India | Built for Builders & Brokers",
    description: "Manage leads, site visits, follow-ups & payments in one CRM built for Indian real estate teams. Portal integrations, GST invoices & agent tracking.",
    url: "https://aiclex.in/real-estate-crm",
    type: "website",
  },
};

export default function RealEstateCRMLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
