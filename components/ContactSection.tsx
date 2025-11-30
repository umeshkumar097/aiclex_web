"use client";

import React from "react";
import { MapPin, Phone, Mail, ChevronDown, ShieldCheck, Send } from "lucide-react";

export default function ContactSection() {
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
              
              <form className="space-y-6">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Your Name <span className="text-[#5271ff]">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#5271ff] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Phone Number <span className="text-[#5271ff]">*</span>
                    </label>
                    <input 
                      type="tel"
                      placeholder="+91 00000 00000"
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
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#5271ff] outline-none transition-all"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Service Required <span className="text-[#5271ff]">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#5271ff] outline-none cursor-pointer appearance-none text-gray-600">
                      <option>Website Design & Development</option>
                      <option>Mobile App Development</option>
                      <option>Digital Marketing</option>
                      <option>SEO Optimization</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Project Budget (SPACING FIXED HERE) */}
                <div className="space-y-2 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Project Budget <span className="text-[#5271ff]">*</span>
                  </label>
                 

                  <div className="flex flex-wrap gap-3 my-1">
                    {["1.5L - 2.5L", "2.5L - 8L", "8L+"].map((budget, idx) => (
                      <label key={idx} className="cursor-pointer">
                        <input type="radio" name="budget" className="sr-only peer" />
                        <span className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm peer-checked:bg-[#5271ff] peer-checked:text-white peer-checked:border-[#5271ff] hover:bg-gray-50 transition-all">
                          {budget}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Captcha + Submit Row (SPACING FIXED) */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  
                  {/* Captcha */}
                  <div className="w-full sm:w-auto px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3 shadow-sm min-w-[200px] h-[52px]">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#5271ff]" />
                    <span className="text-sm text-gray-600">I am human</span>
                    <div className="ml-auto pl-2 border-l border-gray-300">
                      <ShieldCheck className="w-6 h-6 text-[#5271ff]" />
                    </div>
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#5271ff] to-[#3a5ccc] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#5271ff]/30 transition-all active:scale-95 h-[52px]"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
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
