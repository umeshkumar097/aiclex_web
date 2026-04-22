import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Official Zoom Reseller India, Buy Zoom License | AICLEX Technologies"
  },
  description: "Buy official Zoom licenses in India through AICLEX Technologies, authorized Zoom reseller. Best pricing for Zoom Meetings, Webinars & Rooms with local billing & support.",
  keywords: ["Zoom Reseller In India", "Zoom Partner India", "Zoom License Cost India", "Zoom Authorized Dealer", "Zoom Business Solutions India", "Aiclex Technologies Zoom"],
  alternates: {
    canonical: "/zoom",
  },
  openGraph: {
    title: "Official Zoom Reseller India, Buy Zoom License | AICLEX Technologies",
    description: "Buy official Zoom licenses in India through AICLEX Technologies. Local billing & support.",
    url: "https://aiclex.in/zoom",
    siteName: "AICLEX Technologies",
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
