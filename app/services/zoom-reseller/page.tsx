import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Video, IndianRupee, Headphones, Clock } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";
import ZoomLeadForm from "@/components/zoom/ZoomLeadForm";

export const metadata: Metadata = {
  title: "Official Zoom Reseller In India | Pricing, License & Support",
  description: "Authorized Zoom Reseller in India. Get Zoom Meetings, Webinars, and Rooms with INR billing, special discounts, and 24/7 technical support. Official Zoom Partner India.",
  keywords: [
    "zoom distributors in india", "zoom reselling", "zoom partner in india", "zoominfo pricing in india",
    "how to buy zoom subscription in india", "zoom meeting reseller", "zoom pro reseller", "zoom license cost india",
    "zoom distributor in delhi", "zoom reseller in india", "zoom reseller in india price", "list of zoom reseller in india",
    "best zoom reseller in india", "zoom reseller in india cost", "zoom partner portal", "zoom license distributor",
    "zoom partner portal login", "zoom partner registration", "AICLEX Zoom services"
  ],
};

export default function ZoomResellerPage() {
  const service = {
    title: "Official Zoom Reseller In India",
    slug: "zoom-reseller",
    description: "Empowering Indian businesses with seamless video communication. Get specialized Zoom licensing, local support, and INR billing.",
    longDescription: "As the premier Zoom Reseller in India, AICLEX Technologies understands the unique requirements of the Indian market. We bridge the gap between global technology and local business needs, offering compliant GST invoicing, competitive INR pricing, and dedicated implementation support for Zoom Meetings, Zoom Webinars, Zoom Rooms, and Zoom Phone.",
    features: [
      "Official Zoom Partner in India",
      "GST Compliant INR Billing",
      "Special Educational & Bulk Pricing",
      "Localized Technical Support",
      "Custom Zoom Rooms Setup",
      "Direct API & CRM Integrations"
    ],
    benefits: [
      { title: "No Foreign Transaction Fees", desc: "Pay via Bank Transfer, UPI, or Corporate Cards in INR without hidden currency costs." },
      { title: "Personalized Onboarding", desc: "Our certified engineers help you set up single sign-on (SSO) and security policies." },
      { title: "Dedicated Success Manager", desc: "A single point of contact for all your licensing, training, and troubleshooting needs." },
      { title: "24/7 Priority Assistance", desc: "Reach us anytime via call (8449488090) or email for critical meeting support." }
    ],
    icon: "Video",
    color: "from-blue-500 to-blue-700",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Zoom Reseller In India",
    "provider": {
      "@type": "LocalBusiness",
      "name": "AICLEX Technologies",
      "image": "https://ai.siteboard.in/aiclex-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Noida",
        "addressLocality": "Delhi NCR",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      },
      "telephone": "+91 8449488090"
    },
    "description": "Authorized Zoom Partner and Reseller in India providing Zoom Meetings, Webinars, and pro licenses with INR billing and GST compliance.",
    "areaServed": "IN",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Zoom Licensing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Zoom Meetings Pro Reseller" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Zoom Webinar Reseller India" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Zoom License Distributor" } }
      ]
    }
  };

  const faqs = [
    { q: "How to buy Zoom subscription in India?", a: "You can buy Zoom subscriptions directly through AICLEX Technologies, an authorized Zoom Reseller in India. We provide INR invoicing, GST compliance, and local payment methods like UPI and Bank Transfer." },
    { q: "What is the Zoom license cost in India?", a: "Zoom license costs vary based on the plan (Pro, Business, Enterprise) and number of users. As a leading Zoom reseller in India, we offer competitive pricing and special discounts for annual subscriptions." },
    { q: "Are you a Zoom distributor in Delhi NCR?", a: "Yes, AICLEX Technologies is a prominent Zoom distributor in Delhi and Noida, providing localized support and implementation services for corporate and educational clients." },
    { q: "Is AICLEX an official Zoom Partner in India?", a: "Absolutely. We are an official Zoom partner in India, registered on the Zoom Partner Portal, ensuring you get authentic licenses and direct support." },
    { q: "Can I get Zoom reseller in India price list?", a: "Yes, contact our sales team at +91 8449488090 for the latest list of Zoom reseller prices in India, including specific costs for Zoom Meetings, Webinars, and Rooms." }
  ];

  return (
    <div className="w-full mt-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative w-full py-24 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-5"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#5271ff] mb-6 transition-colors font-medium text-sm lg:text-base">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Best <span className="text-[#5271ff]">Zoom Reseller</span> <br/>In India
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Authorized Zoom Partner providing discounted Zoom licensing, local technical support, and INR billing for Indian businesses.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-full text-white font-bold shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Indian Pricing Now
            </Link>
          </div>
          
          <div className="flex justify-center lg:justify-end">
             <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-white border border-gray-100 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden transform group-hover:-rotate-3 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=800" alt="Zoom Meeting India" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                    <Video size={100} className="text-[#5271ff] relative z-20" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SEARCH INDEXING RICH CONTENT */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Why Companies Trust AICLEX as their <br/>Authorized Zoom Reseller?</h2>
            <p className="text-gray-600 text-lg">We don't just sell licenses; we build communication bridges for the digital-first Indian economy. As a leading Zoom license distributor, we ensure 100% compliance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center">
            <div className="p-8 bg-blue-50 rounded-3xl group hover:bg-[#5271ff] transition-all duration-500 shadow-sm">
                <IndianRupee className="mx-auto mb-4 text-[#5271ff] group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">INR Invoicing</h3>
                <p className="text-xs text-gray-500 group-hover:text-blue-100">Zero cross-border taxation or currency conversion headaches with our Zoom partner registration services.</p>
            </div>
            <div className="p-8 bg-purple-50 rounded-3xl group hover:bg-purple-500 transition-all duration-500 shadow-sm">
                <CheckCircle className="mx-auto mb-4 text-purple-600 group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">Compliance</h3>
                <p className="text-xs text-gray-500 group-hover:text-purple-100">100% Tax compliant billing with valid Input Tax Credit (ITC) for Zoom license cost in India.</p>
            </div>
            <div className="p-8 bg-green-50 rounded-3xl group hover:bg-green-500 transition-all duration-500 shadow-sm">
                <Clock className="mx-auto mb-4 text-green-600 group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">Instant Setup</h3>
                <p className="text-xs text-gray-500 group-hover:text-green-100">Most licenses are provisioned via the Zoom Partner Portal and active within 60 minutes.</p>
            </div>
            <div className="p-8 bg-orange-50 rounded-3xl group hover:bg-orange-500 transition-all duration-500 shadow-sm">
                <Headphones className="mx-auto mb-4 text-orange-600 group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">Expert Care</h3>
                <p className="text-xs text-gray-500 group-hover:text-orange-100">Direct access to Zoom Certified Support Engineers from the best Zoom reseller in India.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Zoom Service Offerings</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">As a trusted Zoom meeting reseller and Zoom pro reseller, we provide solutions tailored for the Indian corporate ecosystem. Our services include Zoominfo pricing in India comparison and subscription guidance.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((f, i) => (
                  <div key={i} className="flex gap-2 items-center text-sm font-semibold text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle size={16} className="text-[#5271ff]" /> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-[#001341] rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-bold mb-4">Zoom For Education & Enterprise</h3>
                <p className="text-blue-200 text-sm mb-8 leading-relaxed italic">"We provide special discounted rates for educational institutions and non-profits in India. Contact us to learn about the customized enterprise plans and Zoom partner portal login access."</p>
                <Link href="/contact" className="px-8 py-3 bg-[#ff914d] text-white rounded-full font-bold hover:bg-orange-600 transition-colors">Request a Proposal</Link>
            </div>
          </div>

          <ZoomLeadForm />
        </div>
      </section>

      {/* FAQ SECTION FOR SEO */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <WorkProcess />
      <SuccessStats />

    </div>
  );
}
