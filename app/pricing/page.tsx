"use client";

import React, { useState } from "react";
import { Check, Sparkles, Building2, ShieldCheck, ArrowRight, Video, MessageCircle, BarChart3, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Script from "next/script";

type PricingCategory = "whatspilot" | "zoom" | "ads";

export default function PricingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PricingCategory>("whatspilot");

  const handleCheckout = (planSlug: string) => {
    router.push(`/checkout?plan=${planSlug}`);
  };

  const tabs = [
    { id: "whatspilot", label: "WhatsPilot SaaS", icon: <MessageCircle size={16} /> },
    { id: "zoom", label: "Zoom Reselling", icon: <Video size={16} /> },
    { id: "ads", label: "Paid Media & Ads", icon: <BarChart3 size={16} /> }
  ];

  // --- SEO JSON-LD ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Aiclex Subscription Plans",
    "description": "Flexible and high-ROI plans for growing businesses, including WhatsPilot CRM, Zoom Licenses, and Paid Media Management.",
    "brand": {
      "@type": "Brand",
      "name": "Aiclex"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "1599",
      "highPrice": "50000"
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 text-[#001341] overflow-hidden">
      <Script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#5271ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#ff914d]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-[#5271ff]/10 text-[#5271ff] text-xs font-black uppercase tracking-widest rounded-full inline-block mb-4">
            Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Flexible & High-ROI Plans for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5271ff] to-[#ff914d]">
              Growing Businesses
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            Empower your team, automate communication, and scale lead generation with verified business solutions tailored for your success.
          </p>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 flex gap-1.5 md:gap-3 flex-wrap justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PricingCategory)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#001341] text-white shadow-md scale-[1.02]"
                    : "text-gray-500 hover:text-[#001341] hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "whatspilot" && (
              <motion.div
                key="whatspilot"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
              >
                {/* Plan 1 */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1">Starter</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">Perfect for small teams</p>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold">₹</span>
                        <span className="text-5xl font-black tracking-tight">1,599</span>
                        <span className="text-gray-400 ml-2 text-sm font-semibold">/ month</span>
                      </div>
                      <span className="text-gray-400 mt-1.5 text-xs font-extrabold uppercase tracking-wide">
                        + 18% GST (Recurring)
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span><strong>1 WhatsApp Device</strong> Connection</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Unlimited Broadcast Campaigns</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Interactive Message Flow Builder</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Basic Contacts & List Management</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleCheckout("whatspilot-starter")}
                    className="w-full py-4 px-6 bg-gray-50 hover:bg-[#5271ff] hover:text-white text-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Subscribe Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Plan 2 */}
                <div className="bg-white rounded-3xl p-8 border-2 border-[#5271ff] shadow-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group scale-[1.03] z-10 bg-gradient-to-b from-white to-[#5271ff]/5">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="bg-[#5271ff] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={10} />
                      <span>Most Popular</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1">Business Pro</h3>
                    <p className="text-xs text-[#5271ff] font-bold mb-6 uppercase tracking-wider">Fastest scaling features</p>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold text-[#5271ff]">₹</span>
                        <span className="text-5xl font-black tracking-tight text-[#001341]">3,999</span>
                        <span className="text-gray-400 ml-2 text-sm font-semibold">/ month</span>
                      </div>
                      <span className="text-gray-400 mt-1.5 text-xs font-extrabold uppercase tracking-wide">
                        + 18% GST (Recurring)
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span><strong>3 WhatsApp Devices</strong> Syncing</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Shared Multi-Agent Team Inbox</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Dynamic AI Chatbot Auto-Responder</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>API & Webhooks + CRM Integration</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleCheckout("whatspilot-business")}
                    className="w-full py-4 px-6 bg-[#5271ff] text-white hover:bg-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Subscribe Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Plan 3 */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1 font-bold">Enterprise</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">Tailored for large organizations</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-black text-[#001341]">Custom</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span><strong>Unlimited WhatsApp Devices</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Custom-Trained AI LLM Assistant</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Private Dedicated Cloud Node Hosting</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Official WhatsApp Cloud API Direct Bypass</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      const event = new CustomEvent("open-proposal-drawer", { detail: { service: "WhatsPilot Enterprise" }});
                      window.dispatchEvent(event);
                    }}
                    className="w-full py-4 px-6 bg-[#001341] hover:bg-[#ff914d] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Contact Sales</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "zoom" && (
              <motion.div
                key="zoom"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
              >
                {/* Zoom Pro */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1">Zoom Pro Basic</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">For professionals</p>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold">₹</span>
                        <span className="text-5xl font-black tracking-tight">11,200</span>
                      </div>
                      <span className="text-gray-400 mt-1.5 text-xs font-extrabold uppercase tracking-wide">
                        + 18% GST / YEAR
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Host up to <strong>100 participants</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Unlimited Group Meetings (Up to 30 Hours)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span><strong>5GB Cloud Recording</strong> per License</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleCheckout("zoom-pro-basic")}
                    className="w-full py-4 px-6 bg-gray-50 hover:bg-[#5271ff] hover:text-white text-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Buy License</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Zoom Webinar Plan */}
                <div className="bg-white rounded-3xl p-8 border-2 border-[#ff914d] shadow-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group scale-[1.03] z-10 bg-gradient-to-b from-white to-[#ff914d]/5">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="bg-[#ff914d] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={10} />
                      <span>Webinar Special</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1">Zoom Webinar</h3>
                    <p className="text-xs text-[#ff914d] font-bold mb-6 uppercase tracking-wider">For Large Scale Events</p>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-baseline">
                        <span className="text-xl font-bold text-gray-400 line-through mr-3">₹12,000</span>
                        <span className="text-3xl font-extrabold text-[#ff914d]">₹</span>
                        <span className="text-5xl font-black tracking-tight text-[#001341]">7,000</span>
                        <span className="text-gray-400 ml-2 text-sm font-semibold">/ month</span>
                      </div>
                      <span className="text-gray-400 mt-2 text-xs font-extrabold uppercase tracking-wide">
                        Billed Annually at ₹70,000 + 18% GST
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Host up to <strong>500 Webinar Attendees</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Includes Meetings & Webinar Features</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Practice Session & Green Room</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Q&A, Polling, and Post-Event Reporting</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Priority Support</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleCheckout("zoom-webinar-500")}
                    className="w-full py-4 px-6 bg-[#ff914d] text-white hover:bg-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Subscribe Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Zoom Business */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1">Zoom Business</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">Designed for SME teams</p>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold">₹</span>
                        <span className="text-5xl font-black tracking-tight">18,500</span>
                      </div>
                      <span className="text-gray-400 mt-1.5 text-xs font-extrabold uppercase tracking-wide">
                        + 18% GST / YEAR
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Host up to <strong>300 participants</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Single Sign-On (SSO)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Company Branding (Custom URLs)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Meeting transcripts & Smart Summaries</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleCheckout("zoom-business")}
                    className="w-full py-4 px-6 bg-[#001341] hover:bg-[#ff914d] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Buy License</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Ads section remains for Proposal only */}
            {activeTab === "ads" && (
              <motion.div
                key="ads"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
              >
                {/* Plan 1 */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1">Growth</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">Best for localized campaigns</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-extrabold">₹</span>
                      <span className="text-5xl font-black tracking-tight">15,000</span>
                      <span className="text-gray-400 ml-2 text-sm font-semibold">/ month</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Manage up to ₹1,00,000 monthly ad spend</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      const event = new CustomEvent("open-proposal-drawer", { detail: { service: "Growth Ads" }});
                      window.dispatchEvent(event);
                    }}
                    className="w-full py-4 px-6 bg-gray-50 hover:bg-[#5271ff] hover:text-white text-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GST & Extra Notes */}
        <div className="mt-16 text-center text-xs text-gray-400 font-bold max-w-xl mx-auto space-y-2 uppercase tracking-wide">
          <p>
            * Prices displayed are exclusive of GST. 18% GST will be applied during checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
