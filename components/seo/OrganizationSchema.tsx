import React from "react";

/**
 * Organization Schema for AICLEX Technologies.
 * Helps with Knowledge Graph and general authority.
 */
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AICLEX Technologies",
    "alternateName": "AICLEX",
    "url": "https://www.aiclex.in",
    "logo": "https://www.aiclex.in/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918449488090",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "Hindi"]
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
