"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  
  // Exclude tracking for admin/dashboard pages
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-NXMJRG75EX"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NXMJRG75EX', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
