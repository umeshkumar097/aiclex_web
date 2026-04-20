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
  Cpu
} from "lucide-react";

const services = [
  {
    id: "ai-calling",
    title: "AI Voice Agents",
    subtitle: "24/7 Sales & Support",
    desc: "Human-like AI calling agents that handle outbound sales and inbound support with zero latency.",
    slug: "ai-agent-calling",
    icon: <Bot className="w-10 h-10" />,
    className: "lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#001341] to-[#0A2666] text-white",
    size: "large"
  },
  {
    id: "zoom",
    title: "Zoom Reseller",
    subtitle: "Authorized Partner",
    desc: "Official Zoom licenses with India-based billing and enterprise support.",
    slug: "zoom-reseller",
    icon: <Video className="w-8 h-8" />,
    className: "bg-blue-50 border-blue-100",
    size: "medium"
  },
  {
    id: "marketing",
    title: "Performance Ads",
    subtitle: "Data-Driven ROI",
    desc: "Scale your business with precision-targeted Google and Meta Ads.",
    slug: "paid-media-advertisement",
    icon: <BarChart3 className="w-8 h-8" />,
    className: "bg-orange-50 border-orange-100",
    size: "medium"
  },
  {
    id: "saas",
    title: "Custom SaaS",
    subtitle: "Product Studio",
    desc: "We build high-performance web and mobile products.",
    slug: "web-development",
    icon: <Code2 className="w-6 h-6" />,
    className: "bg-gray-50 border-gray-100",
    size: "small"
  },
  {
    id: "automation",
    title: "Workflows",
    subtitle: "AI Automation",
    desc: "Automate boring tasks with custom LLM agents.",
    slug: "ai-automation",
    icon: <Zap className="w-6 h-6" />,
    className: "bg-gray-50 border-gray-100",
    size: "small"
  }
];

export default function BentoServices() {
  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4"
            >
              <Cpu size={14} /> Intelligence Layer
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-[#001341] leading-[0.95] tracking-tighter">
              We Build The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Infrastructure</span> Of Growth
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-lg leading-relaxed font-medium">
            From official Zoom licensing to human-like AI calling agents, we provide the tech stack that dominates markets.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative rounded-[2.5rem] p-8 border transition-all duration-500 flex flex-col justify-between overflow-hidden
                ${service.className}
              `}
            >
              {/* Background Glow for Dark Cards */}
              {service.size === "large" && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              )}

              <div className="relative z-10">
                <div className={`
                  mb-6 w-fit p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110
                  ${service.size === "large" ? "bg-white/10 text-white" : "bg-white text-[#5271ff] shadow-sm"}
                `}>
                  {service.icon}
                </div>
                
                <div>
                  <div className={`text-xs font-black uppercase tracking-widest mb-1 ${service.size === "large" ? "text-blue-200" : "text-[#ff914d]"}`}>
                    {service.subtitle}
                  </div>
                  <h3 className={`font-black tracking-tight ${service.size === "large" ? "text-3xl md:text-5xl" : "text-2xl"} leading-none`}>
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="relative z-10 mt-6 flex justify-between items-end">
                <p className={`text-sm font-medium max-w-[200px] leading-relaxed ${service.size === "large" ? "text-blue-100/70" : "text-gray-500"}`}>
                  {service.desc}
                </p>
                
                <Link 
                  href={`/services/${service.slug}`}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${service.size === "large" ? "bg-white text-[#001341] hover:bg-[#ff914d] hover:text-white" : "bg-[#001341] text-white hover:scale-110 shadow-lg"}
                  `}
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Stats Card (Fill) */}
          <div className="hidden lg:flex flex-col justify-center p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] text-center">
             <TrendingUp className="mx-auto mb-4 text-[#ff914d]" size={32} />
             <div className="text-4xl font-black text-[#001341]">98%</div>
             <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
