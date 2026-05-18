"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HomeLeadFormProps {
  title?: string;
  subtitle?: string;
  type?: string;
  isEmbedded?: boolean;
}

export default function HomeLeadForm({ 
  title = "Ready to transform your business?", 
  subtitle = "Drop your details and we'll send you a custom proposal.",
  type = "Website",
  isEmbedded = false
}: HomeLeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as any;
    
    const data = {
      name: target.name.value,
      phone: target.phone.value,
      email: target.email.value || "",
      type: target.service.value || type,
      requirement: target.requirement.value || "Lead from Home Page section",
      source_page: window.location.pathname
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#001341] p-12 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden border border-blue-900/50"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff914d] rounded-full blur-[120px] opacity-20 -mr-32 -mt-32 animate-pulse"></div>
        <div className="relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-[#ff914d] to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-orange-500/20"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h3 className="text-4xl font-black mb-4 tracking-tight uppercase">Strategy Booked!</h3>
          <p className="text-blue-100/80 text-xl mb-10 max-w-sm mx-auto leading-relaxed">
            Our success manager will review your roadmap and contact you within <span className="text-[#ff914d] font-black">24 hours</span>.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all border border-white/10 font-bold uppercase tracking-widest text-xs"
          >
            Send another inquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={isEmbedded 
        ? "relative w-full" 
        : "relative w-full rounded-[2.5rem] md:rounded-[3.5rem] bg-[#001341] p-8 md:p-14 lg:p-16 shadow-[0_40px_100px_-20px_rgba(0,19,65,0.4)] border border-[#5271ff]/20 overflow-hidden"
      }
    >
      {/* Decorative Glows (Only for Standalone) */}
      {!isEmbedded && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff914d]/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5271ff]/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        </>
      )}

      <div className={`mb-10 relative z-10 ${!isEmbedded ? 'text-center max-w-2xl mx-auto' : ''}`}>
        {!isEmbedded && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5271ff]/10 border border-[#5271ff]/20 text-[#5271ff] text-[10px] font-black rounded-full uppercase tracking-[0.25em] mb-6">
             <Sparkles size={12} fill="currentColor" /> Premium Strategy Session
          </div>
        )}
        <h3 className={`text-3xl md:text-5xl font-black mb-4 tracking-tighter leading-tight ${isEmbedded ? 'text-[#001341]' : 'text-white'}`}>
          {title}
        </h3>
        <p className={`font-medium text-base md:text-lg leading-relaxed ${isEmbedded ? 'text-gray-500' : 'text-blue-100/70'}`}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name Input */}
          <div className="relative group/input">
            <input 
              name="name"
              type="text" 
              placeholder="Full Name" 
              required
              className={`w-full px-6 py-5 rounded-[1.5rem] outline-none text-sm font-bold transition-all ${
                isEmbedded 
                ? 'bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 text-[#001341] placeholder:text-gray-400' 
                : 'bg-white/5 border border-white/10 focus:bg-white/10 focus:border-[#5271ff] text-white placeholder:text-blue-200/50 backdrop-blur-md'
              }`}
            />
            {/* Minimal Label */}
            <div className={`absolute -top-2.5 left-5 px-2 text-[10px] font-black uppercase tracking-widest ${isEmbedded ? 'bg-white text-gray-500' : 'bg-[#001341] text-[#5271ff]'}`}>
              Your Name
            </div>
          </div>

          {/* Phone Input */}
          <div className="relative group/input">
            <input 
              name="phone"
              type="tel" 
              placeholder="e.g. +91 9876543210" 
              required
              className={`w-full px-6 py-5 rounded-[1.5rem] outline-none text-sm font-bold transition-all ${
                isEmbedded 
                ? 'bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 text-[#001341] placeholder:text-gray-400' 
                : 'bg-white/5 border border-white/10 focus:bg-white/10 focus:border-[#5271ff] text-white placeholder:text-blue-200/50 backdrop-blur-md'
              }`}
            />
            <div className={`absolute -top-2.5 left-5 px-2 text-[10px] font-black uppercase tracking-widest ${isEmbedded ? 'bg-white text-gray-500' : 'bg-[#001341] text-[#5271ff]'}`}>
              Phone / WhatsApp
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email Input */}
          <div className="relative group/input">
            <input 
              name="email"
              type="email" 
              placeholder="name@company.com" 
              className={`w-full px-6 py-5 rounded-[1.5rem] outline-none text-sm font-bold transition-all ${
                isEmbedded 
                ? 'bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 text-[#001341] placeholder:text-gray-400' 
                : 'bg-white/5 border border-white/10 focus:bg-white/10 focus:border-[#5271ff] text-white placeholder:text-blue-200/50 backdrop-blur-md'
              }`}
            />
             <div className={`absolute -top-2.5 left-5 px-2 text-[10px] font-black uppercase tracking-widest ${isEmbedded ? 'bg-white text-gray-500' : 'bg-[#001341] text-[#5271ff]'}`}>
              Business Email
            </div>
          </div>

          {/* Service Dropdown */}
          <div className="relative group/input">
            <select 
              name="service"
              className={`w-full px-6 py-5 rounded-[1.5rem] outline-none text-sm font-bold transition-all cursor-pointer appearance-none ${
                isEmbedded 
                ? 'bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 text-[#001341]' 
                : 'bg-[#0a1f5e]/80 border border-white/10 focus:bg-[#0f2a7a] focus:border-[#5271ff] text-white backdrop-blur-md'
              }`}
            >
              <option value="Website">Website/App Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Zoom">Zoom Meeting Proposal</option>
              <option value="Branding">Branding & UI/UX</option>
            </select>
             <div className={`absolute -top-2.5 left-5 px-2 text-[10px] font-black uppercase tracking-widest ${isEmbedded ? 'bg-white text-gray-500' : 'bg-[#001341] text-[#5271ff]'}`}>
              Growth Pillar
            </div>
            <div className={`absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none ${isEmbedded ? 'text-gray-400' : 'text-blue-300'}`}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative group/input pt-2">
          <textarea 
            name="requirement"
            placeholder="Tell us about your goals..." 
            rows={3}
            className={`w-full px-6 py-5 rounded-[1.5rem] outline-none text-sm font-bold transition-all resize-none ${
              isEmbedded 
              ? 'bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 text-[#001341] placeholder:text-gray-400' 
              : 'bg-white/5 border border-white/10 focus:bg-white/10 focus:border-[#5271ff] text-white placeholder:text-blue-200/50 backdrop-blur-md'
            }`}
          />
           <div className={`absolute top-0 left-5 px-2 text-[10px] font-black uppercase tracking-widest -translate-y-1/2 ${isEmbedded ? 'bg-white text-gray-500' : 'bg-[#001341] text-[#5271ff]'}`}>
              Project Vision
            </div>
        </div>

        {/* Actions Container */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`group/btn w-full sm:w-2/3 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 overflow-hidden relative ${
              isEmbedded 
              ? 'bg-[#001341] text-white hover:bg-[#ff914d] hover:shadow-orange-500/20' 
              : 'bg-[#ff914d] text-white hover:bg-orange-500 hover:shadow-orange-500/30'
            }`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10 flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Request Proposal'}
              {!loading && <Send size={16} className="group-hover/btn:translate-x-1 transition-transform" />}
            </span>
          </motion.button>

          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://scheduler.zoom.us/aiclex-technologies" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full sm:w-1/3 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-2 ${
              isEmbedded 
              ? 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50' 
              : 'bg-transparent border-white/10 text-white hover:border-white/30 hover:bg-white/5'
            }`}
          >
            <Calendar size={16} />
            Meet Now
          </motion.a>
        </div>
        
        {/* Trust Badges */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t ${isEmbedded ? 'border-gray-100' : 'border-white/10'}`}>
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isEmbedded ? 'bg-green-50' : 'bg-green-500/10 border border-green-500/20'}`}>
              <ShieldCheck size={12} className={isEmbedded ? 'text-green-600' : 'text-green-400'} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${isEmbedded ? 'text-green-700' : 'text-green-400'}`}>100% Secure</span>
           </div>
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isEmbedded ? 'bg-blue-50' : 'bg-blue-500/10 border border-blue-500/20'}`}>
              <Sparkles size={12} className={isEmbedded ? 'text-blue-600' : 'text-blue-400'} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${isEmbedded ? 'text-blue-700' : 'text-blue-400'}`}>No Spam Promise</span>
           </div>
        </div>
      </form>
    </motion.div>
  );
}
