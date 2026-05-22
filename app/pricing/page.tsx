"use client";

import React, { useState } from "react";
import { Check, Sparkles, Building2, ShieldCheck, ArrowRight, Video, MessageCircle, BarChart3, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PricingCategory = "whatspilot" | "zoom" | "ads";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<PricingCategory>("whatspilot");

  const openProposalDrawer = (service: string, planName: string, price: string, billing: string) => {
    const requirementText = `Hi Aiclex Team,\n\nI am interested in your "${planName}" plan for "${service}" (${price} - ${billing}). Please guide me through the onboarding process and share the technical proposal.`;
    
    const event = new CustomEvent("open-proposal-drawer", {
      detail: {
        service: service,
        requirement: requirementText
      }
    });
    window.dispatchEvent(event);
  };

  const tabs = [
    { id: "whatspilot", label: "WhatsPilot SaaS", icon: <MessageCircle size={16} /> },
    { id: "zoom", label: "Zoom Reselling", icon: <Video size={16} /> },
    { id: "ads", label: "Paid Media & Ads", icon: <BarChart3 size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 text-[#001341] overflow-hidden">
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
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-extrabold">₹</span>
                      <span className="text-5xl font-black tracking-tight">1,499</span>
                      <span className="text-gray-400 ml-2 text-sm font-semibold">/ month</span>
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
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Automatic Email Lead Notifications</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("WhatsPilot CRM", "Starter", "₹1,499", "monthly")}
                    className="w-full py-4 px-6 bg-gray-50 hover:bg-[#5271ff] hover:text-white text-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gray-100 group-hover:hover:bg-[#5271ff] cursor-pointer"
                  >
                    <span>Activate Auto-Pilot</span>
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
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-extrabold text-[#5271ff]">₹</span>
                      <span className="text-5xl font-black tracking-tight text-[#001341]">3,499</span>
                      <span className="text-gray-400 ml-2 text-sm font-semibold">/ month</span>
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
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>High-Speed Dedicated Router Channels</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Priority Phone & Chat Support</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("WhatsPilot CRM", "Business Pro", "₹3,499", "monthly")}
                    className="w-full py-4 px-6 bg-[#5271ff] text-white hover:bg-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Unlock Pro Automation</span>
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
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Custom CRM integrations & Custom SLA</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("WhatsPilot CRM", "Enterprise Custom", "Custom Quote", "custom")}
                    className="w-full py-4 px-6 bg-[#001341] hover:bg-[#ff914d] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Talk to Enterprise Architect</span>
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
                {/* Plan 1 */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1">Zoom Pro Basic</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">For professional freelancers & educators</p>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold">₹</span>
                        <span className="text-5xl font-black tracking-tight">11,200</span>
                      </div>
                      <span className="text-gray-400 mt-1.5 text-xs font-extrabold uppercase tracking-wide">
                        + GST / YEAR (Annual Billing Only)
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
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Official <strong>Zoom AI Companion</strong> Included</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Secure Admin Portal Dashboard access</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("Zoom Licenses", "Zoom Pro Basic", "₹11,200 + GST", "annual")}
                    className="w-full py-4 px-6 bg-gray-50 hover:bg-[#5271ff] hover:text-white text-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gray-100 group-hover:hover:bg-[#5271ff] cursor-pointer"
                  >
                    <span>Secure Pro License</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Plan 2 */}
                <div className="bg-white rounded-3xl p-8 border-2 border-[#ff914d] shadow-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group scale-[1.03] z-10 bg-gradient-to-b from-white to-[#ff914d]/5">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="bg-[#ff914d] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={10} />
                      <span>Best Value</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1">Zoom Business</h3>
                    <p className="text-xs text-[#ff914d] font-bold mb-6 uppercase tracking-wider">Designed for active teams & SMEs</p>
                    <div className="flex flex-col mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold text-[#ff914d]">₹</span>
                        <span className="text-5xl font-black tracking-tight text-[#001341]">18,500</span>
                      </div>
                      <span className="text-gray-400 mt-1.5 text-xs font-extrabold uppercase tracking-wide">
                        + GST / YEAR (Annual Billing Only)
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Host up to <strong>300 participants</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Single Sign-On (SSO) Enterprise Login</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Company Branding (Custom meeting emails & URL)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Meeting transcripts & Smart Summaries</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Managed Domains + Co-host permissions</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#ff914d] mt-0.5 shrink-0" />
                        <span>Priority support + Custom account manager</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("Zoom Licenses", "Zoom Business", "₹18,500 + GST", "annual")}
                    className="w-full py-4 px-6 bg-[#ff914d] text-white hover:bg-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Upgrade Team Zoom</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Plan 3 */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1">Events & Enterprise</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">For large institutions & global webinars</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-black text-[#001341]">Custom</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Host up to <strong>1,000+ participants</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Unlimited Cloud Storage for video logs</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Zoom Events & Zoom Webinars bundle licenses</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Zoom Phone & Zoom Room hardware mapping</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Direct Account Executive + SLA Contract</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("Zoom Licenses", "Events & Enterprise Custom", "Custom Annual Quote", "annual-custom")}
                    className="w-full py-4 px-6 bg-[#001341] hover:bg-[#ff914d] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Contact Enterprise Specialist</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

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
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">Best for localized or small campaigns</p>
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
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Google Search Ads + Meta (FB/IG) Lead Ads</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Proven ad copywriting & creative templates</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Landing page structure advisory</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Bi-weekly PDF Performance Reports</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("Ads & Lead Generation", "Growth Ads", "₹15,000 Management", "monthly")}
                    className="w-full py-4 px-6 bg-gray-50 hover:bg-[#5271ff] hover:text-white text-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gray-100 group-hover:hover:bg-[#5271ff] cursor-pointer"
                  >
                    <span>Initiate Campaign Setup</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Plan 2 */}
                <div className="bg-white rounded-3xl p-8 border-2 border-[#5271ff] shadow-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group scale-[1.03] z-10 bg-gradient-to-b from-white to-[#5271ff]/5">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="bg-[#5271ff] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={10} />
                      <span>Elite Scale</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1">Elite Scale</h3>
                    <p className="text-xs text-[#5271ff] font-bold mb-6 uppercase tracking-wider">For high-growth scaleups & institutes</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-extrabold text-[#5271ff]">₹</span>
                      <span className="text-5xl font-black tracking-tight text-[#001341]">35,000</span>
                      <span className="text-gray-400 ml-2 text-sm font-semibold">/ month</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Manage up to ₹5,00,000 monthly ad spend</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Omnichannel: Google Search/Display, YouTube, Meta</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span><strong>1 Premium Custom Coded Landing Page</strong> included</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Real-time Looker Studio Lead ROI Dashboard</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Advanced Competitor ad analysis mapping</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#5271ff] mt-0.5 shrink-0" />
                        <span>Weekly consulting + Video strategy alignments</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("Ads & Lead Generation", "Elite Scale Ads", "₹35,000 Management", "monthly")}
                    className="w-full py-4 px-6 bg-[#5271ff] text-white hover:bg-[#001341] font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Scale Campaigns Pro</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Plan 3 */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group">
                  <div>
                    <h3 className="text-xl font-black mb-1">Enterprise Media</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">For major educational brands & corporations</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-black text-[#001341]">Custom %</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Manage ₹5,00,000+ monthly marketing budget</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Full funnel design, programmatic buy & automated routing</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>WhatsApp Automation + Lead CRM API bridge native integration</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Dedicated Media Buying Specialist & Account Director</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Custom legal SLA contract + absolute safety parameters</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => openProposalDrawer("Ads & Lead Generation", "Enterprise Media Management", "Custom %", "custom-roi")}
                    className="w-full py-4 px-6 bg-[#001341] hover:bg-[#ff914d] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Connect Media Director</span>
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
            * Prices displayed are subject to standard applicable terms. 
            Zoom plans are official licenses only, billed annually, and exclusive of GST.
          </p>
          <p className="text-[#5271ff]">
            Need a completely custom service bundle? Our product studio can craft the exact CRM, automation, and ads pipeline you require.
          </p>
        </div>

        {/* Trust Badge Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-white border border-gray-100 shadow-xl rounded-[2.5rem]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#5271ff]/10 text-[#5271ff] rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-base mb-1">Official Zoom Partner</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Buy official Zoom licenses securely. Direct deployment, native partner invoicing with compliance guarantees.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#ff914d]/10 text-[#ff914d] rounded-2xl flex items-center justify-center shrink-0">
              <MessageCircle size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-base mb-1">WhatsPilot Native Automation</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Direct official API bridges or standard automation servers. Complete auto-responder triggers without chat markup overhead.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#001341]/10 text-[#001341] rounded-2xl flex items-center justify-center shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-base mb-1">Aiclex CRM Pipelines</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Automatically funnel leads to your admin dashboards. Real-time logging of campaigns, dynamic cities, and conversion rates.
              </p>
            </div>
          </div>
        </div>

        {/* Simple Interactive FAQ Accordion */}
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="mx-auto text-[#ff914d] mb-3" size={32} />
            <h2 className="text-2xl md:text-3xl font-black">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-sm mb-2">Can I purchase Zoom licenses on a monthly basis?</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                No, as an official Zoom Reseller partner in India, Zoom Pro Basic and Business licenses are only available on an annual payment basis. There is no monthly billing subscription option for these reseller packages.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-sm mb-2">Are there conversation limits or hidden charges on WhatsPilot?</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Unlike general APIs that charge per conversational window, WhatsPilot operates with zero conversation charge overlays. You pay your simple flat monthly starting price, managing campaigns directly without usage bill surprises.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-sm mb-2">How fast will my ad campaigns and dashboard be launched?</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Standard lead generation campaign builds are completed in 3 to 5 business days. Real-time reporting trackers, copy sets, and custom CRM dashboards go live simultaneously so you monitor verified metrics from day one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
