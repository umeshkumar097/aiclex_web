"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bot, 
  Video, 
  BarChart3, 
  Code2, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

const services = [
  {
    id: "ai-calling",
    title: "AI Voice Agents",
    subtitle: "24/7 Intelligent Sales",
    desc: "Human-like calling agents that handle sales and support with zero latency.",
    slug: "ai-agent-calling",
    icon: <Bot className="w-8 h-8 md:w-10 md:h-10" />,
    className: "lg:col-span-2 lg:row-span-2 bg-[#001341] text-white",
    size: "large"
  },
  {
    id: "zoom",
    title: "Zoom Reseller",
    subtitle: "Enterprise Partner",
    desc: "Official Zoom licenses with India-based billing & support.",
    slug: "zoom-reseller",
    icon: <Video className="w-6 h-6 md:w-8 md:h-8" />,
    className: "bg-white/40 border-slate-200/50 backdrop-blur-xl",
    size: "medium"
  },
  {
    id: "marketing",
    title: "Performance Ads",
    subtitle: "ROI Driven Marketing",
    desc: "Scale with precision Google & Meta Ad campaigns.",
    slug: "paid-media-advertisement",
    icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8" />,
    className: "bg-white/40 border-slate-200/50 backdrop-blur-xl",
    size: "medium"
  },
  {
    id: "saas",
    title: "Custom SaaS",
    subtitle: "Product Studio",
    desc: "High-performance web & mobile products.",
    slug: "web-development",
    icon: <Code2 className="w-5 h-5" />,
    className: "bg-white/40 border-slate-200/50 backdrop-blur-md",
    size: "small"
  },
  {
    id: "automation",
    title: "AI Workflows",
    subtitle: "Process Automation",
    desc: "Automate tasks with custom LLM agents.",
    slug: "ai-automation",
    icon: <Zap className="w-5 h-5" />,
    className: "bg-white/40 border-slate-200/50 backdrop-blur-md",
    size: "small"
  }
];

export default function BentoServices() {
  return (
    <section className="py-24 bg-white font-sans overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header - Fixed Alignment */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="flex items-center gap-2 text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6"
            >
              <div className="w-8 h-[1px] bg-blue-600/30"></div>
              Intelligence Layer
            </motion.div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#001341] leading-[0.9] tracking-tighter">
              We Build The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400">Infrastructure</span> <br/>
              Of Digital Growth
            </h2>
          </div>
          <div className="lg:max-w-sm">
             <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed border-l-2 border-blue-100 pl-6">
                Official licensing, human-like voice agents, and the code that powers modern industry leaders.
             </p>
          </div>
        </div>

        {/* Bento Grid - Fixed internal alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative rounded-[2.5rem] p-8 md:p-10 border transition-all duration-700 flex flex-col justify-between overflow-hidden
                ${service.className}
              `}
            >
              {/* Primary AI Card Visuals (Mesh/Noise) */}
              {service.size === "large" && (
                <>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-400/30 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
                </>
              )}

              {/* Card Header (Icon + Stacked Text) */}
              <div className="relative z-10">
                <div className={`
                  mb-8 w-fit p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                  ${service.size === "large" ? "bg-white/10 text-white border border-white/10" : "bg-white text-[#5271ff] shadow-xl shadow-blue-500/5"}
                `}>
                  {service.icon}
                </div>
                
                <div className="space-y-2">
                  <div className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-1 ${service.size === "large" ? "text-blue-300" : "text-blue-400"}`}>
                    {service.subtitle}
                  </div>
                  <h3 className={`font-black tracking-tighter ${service.size === "large" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"} leading-tight`}>
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer (Description + Link) - Better Bottom Alignment */}
              <div className="relative z-10 flex items-end justify-between gap-4">
                <p className={`text-sm font-semibold max-w-[220px] leading-relaxed line-clamp-2 ${service.size === "large" ? "text-blue-100/70" : "text-slate-500"}`}>
                   {service.desc}
                </p>
                
                <Link 
                  href={`/services/${service.slug}`}
                  className={`
                    flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:gap-2
                    ${service.size === "large" ? "bg-white text-[#001341] hover:bg-[#ff914d] hover:text-white" : "bg-[#001341] text-white hover:scale-110 shadow-xl shadow-blue-900/10"}
                  `}
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Stats Card - Upgraded Elite Feel */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="hidden lg:flex flex-col justify-center p-10 bg-[#f8fafc]/50 backdrop-blur-sm border border-slate-200/40 rounded-[2.5rem] relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent"></div>
             <Sparkles className="absolute top-6 right-6 text-blue-200 animate-pulse" size={40} />
             
             <div className="relative z-10 text-center">
                 <div className="text-5xl lg:text-7xl font-black text-[#001341] tracking-tighter mb-2 group-hover:scale-105 transition-transform">98%</div>
                 <div className="text-[10px] font-black text-[#ff914d] uppercase tracking-[0.3em]">Client Satisfaction</div>
                 <p className="text-xs font-bold text-slate-400 mt-6 leading-relaxed">
                    Trusted by 50+ enterprise teams across 15 nations.
                 </p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
