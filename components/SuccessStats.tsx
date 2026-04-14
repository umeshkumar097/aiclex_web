"use client";

import React from "react";
import { Users, CheckCircle, Award, Coffee } from "lucide-react";

// --- Types ---
interface StatItem {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}

// --- DATA: Statistics ---
const stats: StatItem[] = [
  { id: 1, value: "50+", label: "Happy Clients", icon: <Users className="w-8 h-8 text-[#5271ff]" aria-hidden="true" /> },
  { id: 2, value: "Proven", label: "ROI Growth", icon: <CheckCircle className="w-8 h-8 text-[#ff914d]" aria-hidden="true" /> },
  { id: 3, value: "50+", label: "Projects Done", icon: <Award className="w-8 h-8 text-[#5271ff]" aria-hidden="true" /> },
  { id: 4, value: "2+", label: "Years Experience", icon: <Coffee className="w-8 h-8 text-[#ff914d]" aria-hidden="true" /> },
];

export default function SuccessStats() {
  return (
    <section className="w-full py-16 bg-[#0F0F29] text-white relative">
      {/* Diagonal Divider (Top) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[50px] transform rotate-180">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="p-4 group">
              <div className="flex justify-center mb-4 group-hover:animate-bounce">
                <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5271ff] group-hover:to-[#ff914d] transition-all">
                {stat.value}
              </h2>
              <p className="text-gray-400 font-medium uppercase tracking-wide text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}