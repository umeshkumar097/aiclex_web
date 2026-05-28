"use client";

import { motion } from "framer-motion";
import { Star, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full pt-28 pb-8 md:pt-32 md:pb-12 overflow-hidden bg-[#f8fafc]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-300/20 rounded-full blur-[150px] mix-blend-multiply"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#001341 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-10 relative z-10 gap-8 lg:gap-12">
        
        {/* LEFT CONTENT */}
        <motion.div
          className="w-full md:w-[55%] flex flex-col justify-center space-y-6 text-center md:text-left"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm shadow-blue-900/5 mx-auto md:mx-0 w-fit">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold text-[#001341] tracking-wide uppercase">Trusted by 50+ Enterprises</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-black leading-[1.1] tracking-tight text-[#001341]">
            India's AI & Digital Agency for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Real Estate, EdTech
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] to-orange-500">
              Enterprises
            </span>
          </h1>

          {/* Subtags */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            {["Zoom Licenses", "Performance Ads", "Custom SaaS", "AI Voice Agents"].map((tag, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-600 bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                {tag}
              </div>
            ))}
          </div>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 font-medium">
            We bring the exact tech stack and growth architecture that dominates your market. Official licenses, scalable platforms, and AI that converts.
          </p>

          {/* Actions & Reviews */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group relative overflow-hidden px-8 py-4 bg-[#001341] text-white font-bold rounded-xl shadow-xl hover:shadow-blue-900/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Proposal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>

            <div className="flex items-center gap-4 border-l-2 border-slate-200 pl-6 hidden sm:flex">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200 z-${40-i*10} overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 mt-0.5">4.9/5 Average ROI</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="hidden md:flex w-full md:w-[45%] relative justify-center"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div 
            className="relative z-10 w-full px-4 py-8 flex justify-center items-center"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <img
              src="/hero-new.png"
              alt="Digital Marketing and AI Agency India, AICLEX"
              width={700}
              height={600}
              className="w-full max-w-[500px] lg:max-w-[600px] object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Floating elements */}
          <motion.div 
            className="absolute top-10 -right-6 bg-white p-3 rounded-2xl shadow-xl shadow-blue-900/10 border border-slate-100 z-20 flex items-center gap-3"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          >
            <Award className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certified</p>
              <p className="text-sm font-black text-[#001341]">HubSpot Partner</p>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
