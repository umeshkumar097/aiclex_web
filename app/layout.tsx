import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // 👈 Import our new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AICLEX",
  description: "Elevate your brand with AICLEX TECHNOLOGIES",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the app in ClientLayout so it controls the Header/Footer */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}