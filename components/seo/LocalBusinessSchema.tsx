import React from 'react';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AICLEX Technologies",
    "url": "https://aiclex.in",
    "logo": "https://aiclex.in/logo.svg",
    "description": "AI-first product studio offering Zoom Reselling, Digital Marketing, Custom SaaS and AI solutions in India.",
    "telephone": "+918449488090",
    "email": "info@aiclex.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gaur City Mall",
      "addressLocality": "Greater Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201318",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/in/iukbsr/",
      "https://www.linkedin.com/in/gkrishika/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
