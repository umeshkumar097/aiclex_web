import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData } from "@/lib/servicesData";
import { majorCities } from "@/lib/citiesData";

export const metadata: Metadata = {
  title: "Sitemap | AICLEX Technologies",
  description: "HTML Sitemap for AICLEX Technologies showing all services, locations, and resources.",
};

export default function SitemapPage() {
  return (
    <main className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-6">
            AICLEX Sitemap
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Navigate through our complete directory of services, locations, and resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Pages */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#001341] mb-6 border-b pb-4">Main Pages</h2>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-[#5271ff]">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-[#5271ff]">About Us</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-[#5271ff]">All Services</Link></li>
              <li><Link href="/locations" className="text-gray-600 hover:text-[#5271ff]">Locations</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-[#5271ff]">Blog</Link></li>
              <li><Link href="/career" className="text-gray-600 hover:text-[#5271ff]">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#5271ff]">Contact Us</Link></li>
              <li><Link href="/faqs" className="text-gray-600 hover:text-[#5271ff]">FAQs</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#001341] mb-6 border-b pb-4">Our Core Services</h2>
            <ul className="space-y-3">
              {servicesData.filter(s => !s.isSeoOnly).map(service => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="text-gray-600 hover:text-[#5271ff]">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specific Solutions */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#001341] mb-6 border-b pb-4">Specialized Solutions</h2>
            <div className="h-96 overflow-y-auto pr-4 custom-scrollbar">
              <ul className="space-y-3">
                {servicesData.filter(s => s.isSeoOnly).map(service => (
                  <li key={service.id}>
                    <Link href={`/services/${service.slug}`} className="text-gray-600 hover:text-[#5271ff] text-sm">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 md:col-span-2">
            <h2 className="text-2xl font-bold text-[#001341] mb-6 border-b pb-4">Service Locations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6">
              {majorCities.sort().map((city) => {
                const citySlug = city.toLowerCase().replace(/\s+/g, '-');
                // We point to the locations hub page or we could list all city combinations
                // For a clean sitemap, we link to the specific city filter or general location hub.
                return (
                  <span key={city} className="text-gray-600 text-sm font-medium">
                    {city}
                  </span>
                );
              })}
            </div>
            <div className="mt-6">
              <Link href="/locations" className="text-[#5271ff] font-medium hover:underline">
                View all localized services &rarr;
              </Link>
            </div>
          </div>
          
          {/* Legal */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 md:col-span-2">
            <h2 className="text-2xl font-bold text-[#001341] mb-6 border-b pb-4">Legal</h2>
            <ul className="flex flex-wrap gap-6">
              <li><Link href="/privacy-policy" className="text-gray-600 hover:text-[#5271ff]">Privacy Policy</Link></li>
              <li><Link href="/term-and-condition" className="text-gray-600 hover:text-[#5271ff]">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="text-gray-600 hover:text-[#5271ff]">Refund Policy</Link></li>
              <li><Link href="/disclaimer" className="text-gray-600 hover:text-[#5271ff]">Disclaimer</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </main>
  );
}
