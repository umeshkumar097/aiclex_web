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
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[#001341] mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="name"
            type="text" 
            placeholder="Your Full Name" 
            required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm"
          />
          <input 
            name="phone"
            type="tel" 
            placeholder="Phone Number (+91...)" 
            required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="email"
            type="email" 
            placeholder="Email Address (Optional)" 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm"
          />
          <select 
            name="service"
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm text-gray-500"
          >
            <option value="Website">Website/App Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Zoom">Zoom Meeting Proposal</option>
            <option value="Branding">Branding & UI/UX</option>
          </select>
        </div>

        <textarea 
          name="requirement"
          placeholder="Tell us a bit about your project requirements..." 
          rows={3}
          className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm"
        />

        <button 
          disabled={loading}
          className="w-full bg-[#001341] text-white py-4 rounded-2xl font-bold hover:bg-blue-900 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
          Get Instant Proposal
        </button>
      </form>
    </div>
  );
}
