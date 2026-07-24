# Walkthrough - Footer Certifications Update

Successfully added the official certifications banner to the website's main footer component.

---

## Deliverables Completed

### 1. Saved Certifications Asset (`public/certificates.png`)
* Retrieved and copied the uploaded trust marks image (featuring Startup India, ISO 9001:2015, and IAF credentials) into the public assets directory as `public/certificates.png`.

### 2. Centered Certification Banner (`components/Footer.tsx`)
* Integrated a clean, centered certifications banner section right above the dark bottom copyright bar in the global `Footer` component:
  ```tsx
  {/* --- TRUST MARKS / CERTIFICATIONS --- */}
  <div className="border-t border-gray-100 bg-[#F3F5FC]/50 py-6">
    <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
      <Image
        src="/certificates.png"
        alt="Aiclex Solutions - Startup India, ISO 9001:2015 Certified, IAF Accredited"
        width={600}
        height={75}
        className="h-12 w-auto object-contain opacity-90 select-none mix-blend-multiply"
      />
    </div>
  </div>
  ```
* Used `mix-blend-multiply` to blend the image seamlessly against the light grey-blue background (`#F3F5FC/50`) of the certifications row.

---

## Verification & Compilation
* Verified that the project builds cleanly via `npm run build`. Pushed successfully to `main`.
