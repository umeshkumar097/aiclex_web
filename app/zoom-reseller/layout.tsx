import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Zoom Licenses in India | Official Reseller | AICLEX",
  description: "Get genuine Zoom Pro, Business & Enterprise licenses with INR billing, GST invoice & local support. Authorized Zoom reseller in India. Get your quote in 2 hours.",
  keywords: ["zoom reseller india", "buy zoom license india inr", "zoom pro india price", "zoom business india", "authorized zoom reseller india", "zoom gst invoice india"],
  alternates: { canonical: "/zoom-reseller" },
  openGraph: {
    title: "Buy Zoom Licenses in India | Official Reseller | AICLEX",
    description: "Get genuine Zoom Pro, Business & Enterprise licenses with INR billing, GST invoice & local support. Authorized Zoom reseller in India.",
    url: "https://aiclex.in/zoom-reseller",
    type: "website",
  },
};

export default function ZoomResellerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
