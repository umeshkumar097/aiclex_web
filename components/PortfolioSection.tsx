"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Smartphone, BarChart3, Building2 } from "lucide-react";

const projects = [
  {
    title: "Siteboard.in",
    description: "Enterprise SaaS for Real Estate developers. Currently powering 50+ premium townships and developers across India with automated inventory management.",
    url: "https://siteboard.in",
    image: "/siteboard.png",
    icon: <Building2 className="text-blue-500" />,
    tag: "LIVE: Enterprise SaaS",
    impact: "Powering 50+ Real Estate Projects Safely"
  },
  {
    title: "DhandaLeads.com",
    description: "Smart B2B Lead Intelligence platform. Helping agencies and sales teams scale with 5,000+ verified business leads across 12+ industry categories.",
    url: "https://dhandaleads.com",
    image: "/dhandaleads.png",
    icon: <BarChart3 className="text-purple-500" />,
    tag: "GROWING: Lead Gen",
    impact: "Generated 100k+ Verified B2B Leads"
  },
  {
    title: "Passfit.in",
    description: "India's massive Gym Marketplace. Connecting 10,000+ monthly active users with the best 200+ premium fitness centers in Delhi-NCR.",
    url: "https://passfit.in",
    image: "/passfit.png",
    icon: <Smartphone className="text-orange-500" />,
    tag: "SCALE: Marketplace",
    impact: "20k+ Active Monthly Workout Sessions"
  }
];

export default function PortfolioSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base font-bold text-[#5271ff] uppercase tracking-widest mb-3">Our Work & Ventures</h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#001341] mb-6">Expertise Verified by <br/> <span className="text-[#ff914d]">Real Projects</span></h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We don't just build for others; we launch and scale our own successful digital products. Trust a team that knows how to succeed in the market.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-xl border border-gray-100 aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001341] via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[#001341] text-xs font-bold rounded-full shadow-lg">
                    {project.tag}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                   <a 
                     href={project.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-3 text-white group/link"
                   >
                     <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover/link:bg-[#ff914d] transition-colors duration-300">
                        {project.icon}
                     </div>
                     <div>
                        <h4 className="font-bold text-xl flex items-center gap-2">
                          {project.title} <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-blue-200 text-xs hidden group-hover:block transition-all">{project.url}</p>
                     </div>
                   </a>
                </div>
              </div>

              <div className="mt-8 px-4">
                 <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Impact Traction:</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{project.impact}</span>
                 </div>
                 <p className="text-gray-600 leading-relaxed text-sm italic">
                    {project.description}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 p-6 bg-gray-50 border border-gray-100 rounded-[2rem] shadow-inner">
                <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Client" />
                        </div>
                    ))}
                </div>
                <p className="text-sm font-bold text-[#001341]">
                    Trusted by <span className="text-[#ff914d]">50+ Businesses</span> Worldwide
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
