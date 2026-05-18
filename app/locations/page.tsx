import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData } from "@/lib/servicesData";
import { majorCities } from "@/lib/citiesData";

export const metadata: Metadata = {
  title: "Areas We Serve | AICLEX Service Locations",
  description: "Explore the major cities across India where AICLEX provides top-tier digital marketing, AI development, and Zoom solutions.",
};

export default function LocationsDirectory() {
  return (
    <main className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-xs mb-2 block">
            HTML Sitemap
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-6">
            Areas We Serve
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            AICLEX Technologies is proud to deliver world-class digital solutions across India. Browse our comprehensive list of service locations below to find tailored expertise in your city.
          </p>
        </div>

        <div className="space-y-16">
          {servicesData.map((service) => (
            <div key={service.id} className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                  {service.title.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#001341]">{service.title} Locations</h2>
                  <p className="text-sm text-gray-500 mt-1">Available in {majorCities.length} major cities.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-6">
                {majorCities.sort().map((city) => {
                  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link 
                      key={`${service.slug}-${city}`}
                      href={`/services/${service.slug}-in-${citySlug}`}
                      className="text-gray-600 hover:text-[#5271ff] text-sm font-medium transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#ff914d] transition-colors"></span>
                      {city}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
