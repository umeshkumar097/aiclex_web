"use client";

import React from "react";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";

// --- Types ---
interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data: Process ---
const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery",
    description: "We dive deep into your business model, market, and goals to understand your unique needs.",
    icon: <Search className="w-6 h-6 text-white" />,
  },
  {
    id: 2,
    title: "Strategy",
    description: "Our team crafts a tailored roadmap, selecting the right channels and technologies for growth.",
    icon: <Lightbulb className="w-6 h-6 text-white" />,
  },
  {
    id: 3,
    title: "Execution",
    description: "We bring the plan to life with precision development, creative design, and targeted marketing.",
    icon: <Rocket className="w-6 h-6 text-white" />,
  },
  {
    id: 4,
    title: "Scale & Optimize",
    description: "Continuous monitoring and data-driven optimizations to ensure sustained growth and ROI.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
  },
];

export default function WorkProcess() {
  return (
    <section className="w-full py-10 md:py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-30">
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#5271ff] rounded-full mix-blend-multiply filter blur-[100px]"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#ff914d] rounded-full mix-blend-multiply filter blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#5271ff] font-bold tracking-wider uppercase text-sm">How We Work</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            Our Proven <span className="text-[#ff914d]">Process</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#5271ff] to-[#ff914d] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

          {processSteps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center group">
              {/* Step Number / Icon Bubble */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5271ff] to-[#001341] flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 border-4 border-white relative z-10">
                {step.icon}
                {/* Small number badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ff914d] rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">
                  {step.id}
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}