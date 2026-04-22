"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

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
      <div className="bg-[#001341] p-12 rounded-[2.5rem] text-center text-white shadow-2xl animate-fade-in border border-blue-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff914d] rounded-full blur-[80px] opacity-20"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#ff914d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#ff914d]" />
          </div>
          <h3 className="text-3xl font-bold mb-3">Submission Successful!</h3>
          <p className="text-blue-100/80 text-lg mb-8">
            Thank you for reaching out. Our success manager will review your details and contact you within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,19,65,0.1)] border border-gray-100 relative overflow-hidden group">
      {/* Decorative Gradient Background Elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff914d] rounded-full blur-[100px] opacity-[0.08] pointer-events-none group-hover:opacity-[0.12] transition-opacity"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#5271ff] rounded-full blur-[100px] opacity-[0.08] pointer-events-none"></div>

      <div className="mb-10 text-center md:text-left relative z-10">
        <div className="inline-block px-3 py-1 bg-orange-50 text-[#ff914d] text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4">
          Free Strategy Session
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-[#001341] mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-500 font-medium max-w-md">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              name="name"
              type="text" 
              placeholder="e.g. Rahul Sharma" 
              required
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#5271ff]/10 focus:border-[#5271ff] outline-none text-sm transition-all placeholder:text-gray-300 font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input 
              name="phone"
              type="tel" 
              placeholder="+91-9999999999" 
              required
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#5271ff]/10 focus:border-[#5271ff] outline-none text-sm transition-all placeholder:text-gray-300 font-medium"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              placeholder="name@company.com" 
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#5271ff]/10 focus:border-[#5271ff] outline-none text-sm transition-all placeholder:text-gray-300 font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Desired Service</label>
            <select 
              name="service"
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#5271ff]/10 focus:border-[#5271ff] outline-none text-sm transition-all text-gray-600 font-medium cursor-pointer"
            >
              <option value="Website">Website/App Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Zoom">Zoom Meeting Proposal</option>
              <option value="Branding">Branding & UI/UX</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brief Requirements</label>
          <textarea 
            name="requirement"
            placeholder="Tell us about your project or business challenges..." 
            rows={3}
            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#5271ff]/10 focus:border-[#5271ff] outline-none text-sm transition-all placeholder:text-gray-300 font-medium resize-none"
          />
        </div>

        <button 
          disabled={loading}
          className="group/btn w-full bg-[#001341] hover:bg-[#001e6a] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-[0_10px_25px_-5px_rgba(0,19,65,0.4)] hover:shadow-[0_20px_35px_-10px_rgba(0,19,65,0.5)] hover:-translate-y-1 disabled:opacity-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
          Talk to Our Team, Free
        </button>

        <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">OR</span>
            <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <a 
          href="https://calendly.com/aiclex/discovery-call" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-slate-50 border border-slate-200 text-slate-600 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-3 group/cal"
        >
          <span className="text-lg group-hover/cal:scale-125 transition-transform">📅</span>
          Schedule a Strategy Call
        </a>
        
        <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
           <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.925-3.467 9.47-9.065 10.955a1.196 1.196 0 01-.568 0C2.735 16.47 0 11.925 0 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure & 256-bit Encrypted</span>
        </div>
      </form>
    </div>
  );
}
