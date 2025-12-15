"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";
import ServiceIcon from "@/components/ServiceIcon"; // Import our new helper
import { Loader2 } from "lucide-react";

// Define the type for the data we get from API
interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full mt-10">
      
      {/* ==================== SECTION 1: SERVICES GRID ==================== */}
      <section className="w-full py-20 bg-gray-50 relative overflow-hidden">
        
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#5271ff] font-bold tracking-wider uppercase text-sm mb-2 block">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              We provide most effective <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5271ff] to-[#ff914d]">
                Popular Services
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#5271ff] to-[#ff914d] mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} key={service.id} className="block group">
                <div className="h-full relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 overflow-hidden">
                  
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon Box using Helper Component */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-md transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
                    <ServiceIcon iconName={service.icon} className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5271ff] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-[#5271ff] transition-colors">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-500`}></div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
            
      <WorkProcess />
      <SuccessStats />
    </div>
  );
}