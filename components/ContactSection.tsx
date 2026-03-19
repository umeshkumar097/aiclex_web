"use client";

import React from "react";
import { MapPin, Phone, Mail, ChevronDown, ShieldCheck, Send, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <section className="relative w-full py-16 overflow-hidden min-h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-16 text-center animate-fade-in border border-blue-50">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-[#0F0F29] mb-4">Message Received!</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              Thank you for reaching out. We've sent a confirmation to your email, and our team will contact you shortly to discuss your project.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-10 px-8 py-3 bg-[#5271ff] text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Back to Form
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-16  overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96  rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20  w-80 h-80  rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column */}
          <div className="lg:w-5/12 bg-[#0F0F29] text-white p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5271ff] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff914d] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse delay-1000"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Let's discuss <br />
                something <span className="text-[#5271ff]">cool</span> together
              </h2>

              <p className="text-gray-400 text-lg mb-12">
                We're interested in hearing about your project. Give us a call or drop a message below.
              </p>

              <div className="space-y-8">

                {/* Address */}
                <div className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#5271ff]/20 flex items-center justify-center group-hover:bg-[#5271ff] transition-all">
                    <MapPin className="w-6 h-6 text-[#5271ff] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Head Office</h3>
                    <p className="text-gray-400 mt-1">Gaur City Mall, Greater Noida , 201318</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#ff914d]/20 flex items-center justify-center group-hover:bg-[#ff914d] transition-all">
                    <Phone className="w-6 h-6 text-[#ff914d] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-gray-400 mt-1">+91 84494 88090</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition-all">
                    <Mail className="w-6 h-6 text-green-500 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-gray-400 mt-1">info@aiclex.in</p>
                  </div>
                </div>
              </div>
            </div>

          
          </div>

          {/* Right Column */}
          <div className="lg:w-7/12 bg-white p-10 lg:p-16">
            <div className="max-w-xl mx-auto">

              <h3 className="text-3xl font-bold text-gray-900 mb-8">Get Started</h3>
              
              <form 
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  const target = e.target as any;
                  const data = {
                    name: target.name.value,
                    phone: target.phone.value,
                    email: target.email.value,
                    type: target.service.value,
                    requirement: `Budget: ${target.budget.value || "Not specified"}`,
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
                    alert("❌ Failed to send proposal.");
                  } finally {
                    setLoading(false);
                  }
                }}
              >

                {/* Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Your Name <span className="text-[#5271ff]">*</span>
                    </label>
                    <input 
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#5271ff] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Phone Number <span className="text-[#5271ff]">*</span>
                    </label>
                    <input 
                      name="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#5271ff] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address <span className="text-[#5271ff]">*</span>
                  </label>
                  <input 
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#5271ff] outline-none transition-all"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Service Required <span className="text-[#5271ff]">*</span>
                  </label>
                  <div className="relative">
                    <select name="service" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#5271ff] outline-none cursor-pointer appearance-none text-gray-600">
                      <option value="Website">Website Design & Development</option>
                      <option value="Mobile">Mobile App Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Zoom">Zoom Meeting Proposal</option>
                      <option value="SEO">SEO Optimization</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Project Budget */}
                <div className="space-y-2 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Project Budget <span className="text-[#5271ff]">*</span>
                  </label>
                  

                  <div className="flex flex-wrap gap-3 my-1">
                    {["1.5L - 2.5L", "2.5L - 8L", "8L+"].map((budget, idx) => (
                      <label key={idx} className="cursor-pointer">
                        <input type="radio" value={budget} name="budget" className="sr-only peer" defaultChecked={idx === 0} />
                        <span className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm peer-checked:bg-[#5271ff] peer-checked:text-white peer-checked:border-[#5271ff] hover:bg-gray-50 transition-all">
                          {budget}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Captcha + Submit Row */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  
                  {/* Captcha */}
                  <div className="w-full sm:w-auto px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3 shadow-sm min-w-[200px] h-[52px]">
                    <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-[#5271ff]" />
                    <span className="text-sm text-gray-600">I am human</span>
                    <div className="ml-auto pl-2 border-l border-gray-300">
                      <ShieldCheck className="w-6 h-6 text-[#5271ff]" />
                    </div>
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#5271ff] to-[#3a5ccc] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#5271ff]/30 transition-all active:scale-95 h-[52px] disabled:opacity-50"
                  >
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
