"use client";

import React, { memo } from "react";

// Partner images named 1.jpg to 7.jpg
// Optimization: Static data is defined outside the component to avoid recreation on every render.
const logos = Array.from({ length: 7 }, (_, i) => `/partners/${i + 1}.jpg`);

const PartnerSlider = () => {
  // Optimization: 2x loop is standard for seamless horizontal marquee without looking like 'padding'
  const sliderItems = [...logos, ...logos];

  return (
    <section className="w-full py-16 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-base font-bold text-[#5271ff] text-center uppercase tracking-widest mb-3">
          Our Network
        </h2>
        <h3 className="text-3xl md:text-4xl font-black text-center mb-12 text-[#001341]">
          Strategic Partners & <span className="text-[#ff914d]">Clients</span>
        </h3>

        <div className="relative w-full overflow-hidden">
          {/* Gradients: Adds a fade effect to the sides for a smoother look */}
          <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

          
          <div 
            className="flex w-max animate-scroll pb-4"
            style={{ willChange: "transform" }}
          >
            {sliderItems.map((logo, index) => (
              <div
                key={index}
                className="mx-4 flex-shrink-0"
              >
                <div className="w-[200px] h-[150px] p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center transition-shadow hover:shadow-md">
                
                  <img
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={200}
                    height={150}
                    loading="lazy"
                    decoding="async"
                    // Logos are colorful by default (no grayscale filter)
                    className="w-full h-full object-contain"
                    // Fallback for preview environment only
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/200x150/png?text=Logo+${(index % 7) + 1}`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      
    </section>
  );
};

// Optimization: React.memo prevents unnecessary re-renders if parent props change
export default memo(PartnerSlider);