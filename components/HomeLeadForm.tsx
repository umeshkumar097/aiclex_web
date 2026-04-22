"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HomeLeadFormProps {
  title?: string;
  subtitle?: string;
  type?: string;
}

export default function HomeLeadForm({ 
  title = "Ready to transform your business?", 
  subtitle = "Drop your details and we'll send you a custom proposal.",
  type = "Website" 
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-10 md:p-16 rounded-[4rem] shadow-[0_32px_80px_rgba(0,19,65,0.12)] border border-gray-100 relative overflow-hidden group"
    >
      {/* Premium Decorative Elements */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#ff914d] to-orange-300 rounded-full blur-[120px] opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-1000"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#5271ff] to-blue-300 rounded-full blur-[120px] opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-1000"></div>

      <div className="mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#ff914d] text-[10px] font-black rounded-full uppercase tracking-[0.25em] mb-5">
           <Sparkles size={12} fill="currentColor" /> Premium Strategy Session
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-[#001341] mb-4 tracking-tighter leading-none">{title}</h3>
        <p className="text-gray-400 font-medium text-lg max-w-md leading-relaxed">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Partnership Name</label>
            <input 
              name="name"
              type="text" 
              placeholder="Full Name" 
              required
              className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-[#5271ff]/5 focus:border-[#5271ff] focus:bg-white outline-none text-sm transition-all placeholder:text-gray-300 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Contact Link (Phone)</label>
            <input 
              name="phone"
              type="tel" 
              placeholder="+91" 
              required
              className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-[#5271ff]/5 focus:border-[#5271ff] focus:bg-white outline-none text-sm transition-all placeholder:text-gray-300 font-bold"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Business Email</label>
            <input 
              name="email"
              type="email" 
              placeholder="name@company.com" 
              className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-[#5271ff]/5 focus:border-[#5271ff] focus:bg-white outline-none text-sm transition-all placeholder:text-gray-300 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Growth Pillar</label>
            <div className="relative">
              <select 
                name="service"
                className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-[#5271ff]/5 focus:border-[#5271ff] focus:bg-white outline-none text-sm transition-all text-gray-700 font-bold cursor-pointer appearance-none"
              >
                <option value="Website">Website/App Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Zoom">Zoom Meeting Proposal</option>
                <option value="Branding">Branding & UI/UX</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <Send size={14} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Project Vision / Requirements</label>
          <textarea 
            name="requirement"
            placeholder="How can we help your business dominate?" 
            rows={4}
            className="w-full p-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-[#5271ff]/5 focus:border-[#5271ff] focus:bg-white outline-none text-sm transition-all placeholder:text-gray-300 font-bold resize-none"
          />
        </div>

        <motion.button 
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="group/btn w-full bg-[#001341] text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,19,65,0.3)] hover:shadow-[0_30px_60px_-10px_rgba(0,19,65,0.4)] disabled:opacity-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
          Finalize Proposal Request
        </motion.button>

        <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-gray-50"></div>
            <span className="flex-shrink mx-6 text-[10px] font-black text-gray-200 uppercase tracking-[0.4em]">Fast Track</span>
            <div className="flex-grow border-t border-gray-50"></div>
        </div>

        <motion.a 
          whileHover={{ y: -2 }}
          href="https://calendly.com/aiclex/discovery-call" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-white border-2 border-gray-50 text-[#001341] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-3 group/cal"
        >
          <Calendar size={18} className="text-blue-500 group-hover/cal:scale-110 transition-transform" />
          Instant Discovery Call
        </motion.a>
        
        <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-gray-50">
           <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <ShieldCheck size={12} className="text-green-600" />
              <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">End-to-End Encrypted</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <Sparkles size={12} className="text-blue-600" />
              <span className="text-[9px] font-black text-blue-700 uppercase tracking-widest">AI Audit Included</span>
           </div>
        </div>
      </form>
    </motion.div>
  );
}
