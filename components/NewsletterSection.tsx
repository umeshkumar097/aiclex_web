"use client";

import React from "react";

export default function NewsletterSection() {
  return (
    <section className="w-full py-10 bg-white flex justify-center">
      <div className="w-full max-w-7xl px-4">
        <div className="relative bg-[#0F0F29] rounded-[3rem] overflow-hidden px-6 py-10 md:py-14 md:px-16 text-center shadow-2xl">
          
          {/* --- Background Decorative Shapes --- */}
          
          {/* Right Bottom Wave (Blue/Purple Gradient) */}
          <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none overflow-hidden">
             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#5271ff] rounded-full blur-3xl opacity-50 mix-blend-screen"></div>
             <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#5271ff] to-transparent opacity-80 rounded-full blur-[80px]"></div>
             
             {/* Creating the wave curve effect using SVG for precision */}
             <svg 
               className="absolute bottom-0 right-0 w-full md:w-2/3 h-full text-[#5271ff] opacity-90"
               viewBox="0 0 100 100" 
               preserveAspectRatio="none"
             >
               <path d="M50 100 C 50 100 20 100 50 50 Q 80 0 100 0 V 100 Z" fill="url(#wave-gradient)" />
               <defs>
                 <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" /> 
                   <stop offset="100%" stopColor="#5271ff" stopOpacity="1" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          {/* Floating Dots (Orange) */}
          <div className="absolute top-12 right-1/4 w-3 h-3 bg-[#ff914d] rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 left-12 w-2 h-2 bg-[#ff914d] rounded-full opacity-60"></div>


          {/* --- Content Content --- */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Subscribe to our <span className="underline decoration-[#5271ff] decoration-4 underline-offset-4">newsletter!</span>
            </h2>
            
            {/* Subheading */}
            <p className="text-gray-300 text-lg md:text-xl">
              And Get the latest update of our company
            </p>

            {/* Input Form */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto w-full">
              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="email address"
                className="w-full sm:flex-1 py-4 px-6 rounded-lg text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#5271ff] shadow-lg"
              />
              <button
                aria-label="Subscribe to newsletter"
                className="w-full sm:w-auto py-4 px-8 rounded-lg bg-gradient-to-r from-[#ff914d] to-[#ff6b6b] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}