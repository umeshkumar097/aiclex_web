import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zoom Reseller In India | AICLEX™ Technologies",
  description: "Official Zoom Reseller in India. Get the best enterprise pricing, local support, and expert configuration for Zoom Meetings, Phone, and Webinars through AICLEX™ Technologies.",
  keywords: ["Zoom Reseller In India", "Zoom Partner India", "Zoom License Cost India", "Zoom Authorized Dealer", "Zoom Business Solutions India", "Aiclex Technologies Zoom"],
  alternates: {
    canonical: "/zoom",
  },
  openGraph: {
    title: "Zoom Reseller In India | AICLEX™ Technologies",
    description: "Official Zoom Reseller in India. Enterprise pricing and local support for Zoom users.",
    url: "https://aiclex.in/zoom",
    siteName: "AICLEX™ Technologies",
    locale: "en_IN",
    type: "website",
  },
};

export default function ZoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
