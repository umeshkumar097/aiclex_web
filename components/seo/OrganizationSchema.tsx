import React from "react";

/**
 * Organization Schema for AICLEX™ Technologies (Aiclex Solutions Pvt. Ltd.).
 * Helps with Knowledge Graph and general authority.
 */
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aiclex Solutions Pvt. Ltd.",
    "alternateName": ["AICLEX™ Technologies", "AICLEX™"],
    "legalName": "Aiclex Solutions Pvt. Ltd.",
    "url": "https://aiclex.in",
    "logo": "https://aiclex.in/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918449488090",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit No 8125, 8th Floor, Gaur City Mall Office Space, Sector 4",
      "addressLocality": "Greater Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201318",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/aiclex",
      "https://twitter.com/aiclex_tech"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
