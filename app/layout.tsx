import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // 👈 Import our new wrapper
import GoogleAnalytics from "@/components/GoogleAnalytics";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aiclex.in'),
  title: {
    default: "AICLEX™ Technologies | Elevating Your Digital Presence",
    template: "%s | AICLEX™ Technologies"
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
    url: "https://www.aiclex.in",
    siteName: "AICLEX Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AICLEX Technologies",
    description: "Official Zoom Reseller and AI Solutions Provider in India.",
  },
  verification: {
    google: "UmwQdEsVEUPUkavhn1dpxw8NcABZMiWunsWpQBpKjTo",
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
        <Script id="zi-tracking" strategy="afterInteractive">
          {`
            window[(function(_KFE,_vQ){var _RwiIN='';for(var _ndfxCr=0;_ndfxCr<_KFE.length;_ndfxCr++){_RwiIN==_RwiIN;var _d3NH=_KFE[_ndfxCr].charCodeAt();_d3NH-=_vQ;_d3NH+=61;_d3NH%=94;_d3NH+=33;_d3NH!=_ndfxCr;_vQ>8;_RwiIN+=String.fromCharCode(_d3NH)}return _RwiIN})(atob('I3B3OzgzLiw9ci5C'), 39)] = 'dc1c015f531774628067';
            var zi = document.createElement('script');
            (zi.type = 'text/javascript'),
            (zi.async = true),
            (zi.src = (function(_cAH,_Ed){var _jVRMc='';for(var _Ewfmd3=0;_Ewfmd3<_cAH.length;_Ewfmd3++){var _3Ah7=_cAH[_Ewfmd3].charCodeAt();_3Ah7-=_Ed;_Ed>8;_3Ah7+=61;_3Ah7!=_Ewfmd3;_3Ah7%=94;_jVRMc==_jVRMc;_3Ah7+=33;_jVRMc+=String.fromCharCode(_3Ah7)}return _jVRMc})(atob('cn5+en1EOTl0fTgmczd9bXxzen59OG15dzkmczd+a3E4dH0='), 10)),
            document.readyState === 'complete'?document.body.appendChild(zi):
            window.addEventListener('load', function(){
                document.body.appendChild(zi)
            });
          `}
        </Script>
        {/* Wrap the app in ClientLayout so it controls the Header/Footer */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}