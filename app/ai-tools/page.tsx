"use client";

import React from "react";
import { 
  Sparkles, 
  Zap, 
  BarChart3, 
  TrendingUp, 
  Layers, 
  MessageSquare, 
  ShieldCheck, 
  Calculator, 
  Target, 
  Globe, 
  ArrowRight,
  ChevronRight,
  Search,
  Database,
  Cpu,
  ZapOff,
  Video,
  ImageIcon,
  PieChart
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "audit",
    name: "Audit & Analytics",
    icon: <BarChart3 size={20} />,
    color: "from-blue-600 to-indigo-600",
    tools: [
      {
        title: "AI Website Auditor™",
        description: "Professional Moz-style technical deep-dive with DA and Spam risk prediction.",
        href: "/free-tools/ai-seo-checker",
        icon: <Search className="text-blue-500" />,
        badge: "Most Popular"
      },
      {
        title: "Ads ROI Auditor™",
        description: "Predictive campaign profitability analysis and revenue leakage hooks.",
        href: "/free-tools/ads-roi-calculator",
        icon: <PieChart className="text-indigo-500" />
      },
      {
        title: "Lead Cost Benchmarker™",
        description: "Compare your CPL against Indian industry standards and competitor data.",
        href: "/free-tools/lead-cost-calculator",
        icon: <ShieldCheck className="text-cyan-500" />
      }
    ]
  },
  {
    id: "creative",
    name: "Creative Intelligence",
    icon: <Sparkles size={20} />,
    color: "from-pink-600 to-rose-600",
    tools: [
      {
        title: "AI Viral Headline Gen",
        description: "Generate 10+ scroll-stopping ad headlines and Reel hooks with Gemini Pro.",
        href: "/free-tools/headline-generator",
        icon: <Sparkles className="text-pink-500" />,
        badge: "Gemini 1.5"
      },
      {
        title: "WhatsApp Funnel Architect™",
        description: "Automated 5-day high-conversion sequence drafting for your niche.",
        href: "/free-tools/whatsapp-funnel-generator",
        icon: <MessageSquare className="text-purple-500" />
      },
      {
        title: "AI Marketing Assistant",
        description: "Social media caption and strategy engine for the Indian B2B market.",
        href: "/free-tools/ai-marketing-assistant",
        icon: <Cpu className="text-rose-500" />
      }
    ]
  },
  {
    id: "strategy",
    name: "Strategy & Forecast",
    icon: <Target size={20} />,
    color: "from-amber-500 to-orange-600",
    tools: [
      {
        title: "Funnel Strategy Quiz",
        description: "Discover the perfect marketing architecture for your business model.",
        href: "/free-tools/funnel-builder-quiz",
        icon: <Layers className="text-orange-500" />
      },
      {
        title: "Webinar Profit Predictor",
        description: "Forecast revenue and ad spend targets for your next big launch.",
        href: "/free-tools/webinar-profit-calculator",
        icon: <Calculator className="text-amber-500" />
      },
      {
        title: "AI Product Photo Editor",
        description: "Instant background removal and studio-grade background replacement.",
        href: "/free-tools/product-background-changer",
        icon: <ImageIcon className="text-emerald-500" />
      }
    ]
  }
];

export default function AiToolsHub() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#001341] selection:bg-orange-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-50 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-orange-50 border border-orange-100 text-[#ff914d] rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
               <Zap size={14} fill="currentColor" /> Enterprise AI Intelligence Suite™
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] text-[#001341]">
               Build. Audit. <br/> <span className="text-[#ff914d] uppercase italic">Scale with AI™</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed">
              Consolidate your marketing architecture. Access 9+ high-performance AI tools designed to find leakage, audit competitors, and automate your revenue growth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
               <div className="flex items-center gap-3 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  <ShieldCheck size={18} className="text-blue-500" /> Secure Analysis
               </div>
               <div className="flex items-center gap-3 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  <Database size={18} className="text-indigo-500" /> Live Data Benchmarking
               </div>
               <div className="flex items-center gap-3 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  <ZapOff size={18} className="text-orange-500" /> zero manual follow-ups
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- GRID SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 pb-40 space-y-32">
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.id} className="space-y-12">
            
            {/* Category Header */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className={`h-12 w-12 rounded-2xl bg-white shadow-lg shadow-gray-200 border border-gray-100 flex items-center justify-center`}>
                  {cat.icon}
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#001341]">{cat.name}</h2>
                <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Intelligence Layer {idx + 1}</p>
              </div>
            </motion.div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.tools.map((tool, tIdx) => (
                 <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: tIdx * 0.1 }}
                 >
                    <Link 
                      href={tool.href}
                      className="group block h-full p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:bg-white hover:border-[#ff914d] hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-start">
                          <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-50 transition-all border border-gray-100">
                             {tool.icon}
                          </div>
                          {tool.badge && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                               {tool.badge}
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black text-[#001341] group-hover:text-[#ff914d] transition-colors uppercase tracking-tight">{tool.title}</h3>
                           <p className="text-gray-500 text-sm font-medium leading-relaxed">
                              {tool.description}
                           </p>
                        </div>

                        <div className="pt-4 flex items-center gap-2 text-[#ff914d] font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                           Open Suite <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                 </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* --- ENTERPRISE CTA --- */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="p-12 md:p-24 bg-[#001341] rounded-[4rem] text-center space-y-12 shadow-3xl shadow-blue-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-20 opacity-5 text-white">
              <Cpu size={300} />
           </div>
           <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black leading-tight text-white">
                Want a custom AI Engine for your business?
              </h2>
              <p className="text-blue-100 text-lg md:text-2xl font-medium opacity-80 leading-relaxed">
                Our tools are just the beginning. We build custom AI calling agents, automated CRM funnels, and proprietary marketing engines for enterprises scaling to ₹10Cr+.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <a 
                  href="https://wa.me/918449488090?text=Hi Aiclex Team, I am interested in custom AI Marketing Solutions for my business." 
                  target="_blank"
                  className="px-12 py-6 bg-[#ff914d] text-white rounded-2xl font-black text-xl hover:scale-[1.03] transition-all shadow-2xl flex items-center gap-3"
                >
                  Consult AI Strategist <ChevronRight size={24} />
                </a>
                <Link 
                  href="/contact"
                  className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xl hover:bg-white/20 transition-all"
                >
                  Request Case Studies
                </Link>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
