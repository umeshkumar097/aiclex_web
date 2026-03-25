import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // 👈 Import our new wrapper
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aiclex.in'),
  title: {
    default: "AICLEX Technologies | Elevating Your Digital Presence",
    template: "%s | AICLEX Technologies"
  },
  description: "Official Zoom Reseller in India. AICLEX Technologies provides high-performance Digital Marketing, AI Agent Calling, and custom Software Development solutions.",
  keywords: ["Zoom Reseller In India", "Digital Marketing Agency", "AI Agent Calling", "App Development India", "AICLEX Technologies"],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "AICLEX Technologies",
    description: "Official Zoom Reseller and AI Solutions Provider in India.",
    url: "https://aiclex.in",
    siteName: "AICLEX Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AICLEX Technologies",
    description: "Official Zoom Reseller and AI Solutions Provider in India.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        {/* Wrap the app in ClientLayout so it controls the Header/Footer */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}