"use client";

import React from "react";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";
import { 
  Megaphone, 
  Smartphone, 
  PenTool, 
  LayoutGrid, 
  ShoppingCart, 
  Palette, 
  Monitor, 
  Share2 
} from "lucide-react";

// --- DATA: Services ---
const services = [
  {
    id: 1,
    title: "Digital Marketing",
    description: "Digital Marketing in Facebook, LinkedIn, Instagram, and Google can help generate leads and grow your business online.",
    icon: <Megaphone className="w-8 h-8 text-white" />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Application Development",
    description: "Custom mobile and web application development to meet your specific business needs and enhance user engagement.",
    icon: <Smartphone className="w-8 h-8 text-white" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Brand Development",
    description: "Develop a strong brand identity and implement effective strategies to position your business for long-term success.",
    icon: <PenTool className="w-8 h-8 text-white" />,
    color: "from-orange-400 to-red-500",
  },
  {
    id: 4,
    title: "Google Ads & Meta",
    description: "Create and manage effective Google Ads and Meta campaigns to drive targeted traffic and maximize ROI.",
    icon: <LayoutGrid className="w-8 h-8 text-white" />,
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 5,
    title: "E-commerce Solutions",
    description: "Comprehensive e-commerce solutions, including website development, payment gateway integration, and inventory management.",
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: 6,
    title: "Graphic Design",
    description: "Enhance your brand’s visual appeal with eye-catching designs for your marketing materials and digital platforms.",
    icon: <Palette className="w-8 h-8 text-white" />,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 7,
    title: "Website Designing",
    description: "We create stunning, user-friendly websites tailored to your business needs, ensuring a seamless online experience.",
    icon: <Monitor className="w-8 h-8 text-white" />,
    color: "from-teal-400 to-cyan-600",
  },
  {
    id: 8,
    title: "Social Media Marketing",
    description: "Our Lead-driven inbound content marketing strategies will make you stand out and build a loyal community.",
    icon: <Share2 className="w-8 h-8 text-white" />,
    color: "from-indigo-500 to-purple-600",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full mt-10">
      
      {/* ==================== SECTION 1: SERVICES GRID ==================== */}
      <section className="w-full py-20 bg-gray-50 relative overflow-hidden">
        
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
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
            <p className="text-lg text-gray-600">
              Empowering your digital journey with comprehensive solutions tailored to drive growth and efficiency.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#5271ff] to-[#ff914d] mx-auto mt-8 rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon Box */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-md transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5271ff] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-[#5271ff] transition-colors cursor-pointer">
                  <span>Learn More</span>
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                
                {/* Bottom Border Line */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-500`}></div>
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