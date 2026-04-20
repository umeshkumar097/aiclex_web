import React from "react";

interface ServiceSchemaProps {
  title: string;
  description: string;
  url: string;
}

/**
 * Service Schema for AICLEX Services.
 * Helps search engines understand specific service offerings.
 */
export default function ServiceSchema({ title, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": title,
    "provider": {
      "@type": "Organization",
      "name": "AICLEX Technologies",
      "url": "https://www.aiclex.in"
    },
    "description": description,
    "url": url,
    "areaServed": "IN",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AICLEX Premium AI & Digital Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": title
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
