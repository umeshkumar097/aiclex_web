"use client";

import React, { memo } from "react";

// Real client list provided by AICLEX team
const clients = [
  { name: "Shoolini University", industry: "Education", initial: "SU" },
  { name: "Aditech", industry: "Technology", initial: "AT" },
  { name: "Total Solutions", industry: "Consulting", initial: "TS" },
  { name: "Crux Management Services", industry: "Management", initial: "CM" },
  { name: "Sannam S4 Group", industry: "Advisory", initial: "S4" },
  { name: "Clever", industry: "Digital", initial: "CL" },
  { name: "Plum Insight", industry: "Analytics", initial: "PI" },
  { name: "Infedis Infotech", industry: "IT Services", initial: "II" },
  { name: "PSM", industry: "Solutions", initial: "PS" },
  { name: "RC Consultancy", industry: "Consulting", initial: "RC" },
  { name: "Sunkiran Dimex", industry: "Manufacturing", initial: "SD" },
  { name: "Rode Exports & Services", industry: "Exports", initial: "RE" },
  { name: "Recplus HR Solutions", industry: "HR & Staffing", initial: "RH" },
  { name: "Premier Plasmotec", industry: "Manufacturing", initial: "PP" },
  { name: "Skanda Technologies", industry: "Technology", initial: "SK" },
];

// Color palette for initial badges (cycles through)
const colors = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-orange-500",
  "bg-cyan-600",
  "bg-emerald-600",
  "bg-rose-600",
  "bg-amber-600",
  "bg-teal-600",
  "bg-purple-600",
  "bg-sky-600",
  "bg-pink-600",
  "bg-lime-600",
  "bg-red-600",
  "bg-fuchsia-600",
];

// Duplicate for seamless loop
const sliderItems = [...clients, ...clients];

const PartnerSlider = () => {
  return (
    <section className="w-full py-20 bg-white overflow-hidden border-y border-gray-50">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <span className="text-[#5271ff] font-bold tracking-widest uppercase text-xs mb-3 block">Trusted Network</span>
        <h2 className="text-3xl md:text-4xl font-black text-[#001341]">
          Trusted by <span className="text-[#ff914d]">Industry Leaders</span>
        </h2>
        <p className="text-gray-400 mt-3 font-medium text-sm max-w-xl mx-auto">
          From EdTech unicorns to manufacturing exporters — 15+ companies rely on AICLEX for growth.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          className="flex w-max animate-scroll"
          style={{ willChange: "transform" }}
        >
          {sliderItems.map((client, index) => (
            <div
              key={index}
              className="mx-4 flex-shrink-0 w-[200px]"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center text-center gap-3">
                {/* Initial Badge */}
                <div className={`w-12 h-12 rounded-xl ${colors[index % colors.length]} flex items-center justify-center text-white font-black text-sm tracking-widest shadow-md`}>
                  {client.initial}
                </div>

                {/* Client Name */}
                <div>
                  <p className="text-[#001341] font-bold text-sm leading-tight">{client.name}</p>
                  <p className="text-[#ff914d] font-bold text-[10px] uppercase tracking-wider mt-1">{client.industry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(PartnerSlider);