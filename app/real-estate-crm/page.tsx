"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Link2, Bell, Calendar, BarChart3, CreditCard, FolderOpen, FileText,
  CheckCircle, ArrowRight, Phone, Star, Building2, ChevronDown, MessageCircle
} from "lucide-react";
import { useState } from "react";

const problems = [
  "Leads are coming from 5 different portals, and getting lost",
  "Sales team doesn't follow up on time, and you find out too late",
  "No clear picture of which agent is performing and which isn't",
  "Sending payment reminders manually every month",
];

const features = [
  { icon: <Link2 className="w-6 h-6" />, title: "Portal Lead Capture", desc: "Auto-import leads from 99acres, MagicBricks, Housing.com — no manual entry." },
  { icon: <Bell className="w-6 h-6" />, title: "Follow-up Reminders", desc: "Never miss a callback. Automated nudges for every agent, every lead." },
  { icon: <Calendar className="w-6 h-6" />, title: "Site Visit Scheduling", desc: "Book, track, and confirm visits in one click. No more missed appointments." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Agent Performance Dashboard", desc: "See who's closing and who needs coaching. Real-time team visibility." },
  { icon: <CreditCard className="w-6 h-6" />, title: "Payment Milestone Tracker", desc: "Track token, agreement, and EMI payments per buyer, automatically." },
  { icon: <FolderOpen className="w-6 h-6" />, title: "Document Manager", desc: "Store agreements, KYC, and allotment letters per client. Always accessible." },
  { icon: <FileText className="w-6 h-6" />, title: "GST Invoice Generation", desc: "One-click compliant invoices for every transaction. No accountant needed." },
];

const faqs = [
  {
    q: "We already use a generic CRM, why switch?",
    a: "Generic CRMs don't understand site visits, plot inventory, or portal integrations. We do. This is built from the ground up for real estate — not retrofitted from a generic sales tool.",
  },
  {
    q: "Will my team actually use it?",
    a: "We've designed it for field agents, not just managers. Simple mobile interface, WhatsApp integration, and onboarding support included. Most teams are fully onboarded within a week.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Monthly plans available. Start small, scale when you're ready. No lock-ins, no hidden fees.",
  },
];

export default function RealEstateCRMPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-white font-sans overflow-hidden mt-20">

      {/* ===================== HERO ===================== */}
      <section className="relative bg-gradient-to-br from-[#001341] via-[#0a1f5e] to-[#001341] text-white py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#ff914d]/20 border border-[#ff914d]/30 text-[#ff914d] text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
              Real Estate CRM India
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              The CRM Built for Indian<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] to-yellow-400">
                Real Estate Teams
              </span>
              , Not Generic Sales Teams
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed mb-10">
              From first inquiry to final possession, track every lead, follow-up, site visit, and payment in one place. Designed for Indian builders, developers, and brokers who are tired of Excel and WhatsApp chaos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/aiclex/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#ff914d] hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-orange-500/30 hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                Book a Free Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/918449488090?text=Hi%20AICLEX%2C%20I%20want%20to%20know%20more%20about%20your%20Real%20Estate%20CRM."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 text-green-400" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== PROBLEM ===================== */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#001341] text-center mb-4">
              Sound familiar?
            </h2>
            <p className="text-center text-gray-500 mb-12 text-lg">These are the signs your team needs a real CRM.</p>

            <div className="space-y-4">
              {problems.map((problem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-red-100 shadow-sm"
                >
                  <span className="text-red-500 text-xl flex-shrink-0 mt-0.5">❌</span>
                  <p className="text-gray-700 font-semibold text-lg">{problem}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 bg-gradient-to-br from-[#001341] to-[#0a2066] text-white p-8 rounded-[2rem] text-center">
              <p className="text-lg md:text-xl font-bold leading-relaxed">
                If any of this is your reality, your team is working harder than it needs to.<br />
                <span className="text-[#ff914d]">Our Real Estate CRM fixes this</span> — built specifically for how Indian property businesses work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#5271ff] font-black uppercase tracking-widest text-xs mb-3 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#001341] tracking-tight">
              Everything Your Sales Team Needs,<br />
              <span className="text-[#ff914d]">Nothing They Don't</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-7 bg-white rounded-[1.5rem] border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#5271ff] flex items-center justify-center mb-5 group-hover:bg-[#5271ff] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-[#001341] font-black text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SOCIAL PROOF ===================== */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#5271ff] font-black uppercase tracking-widest text-xs mb-3 block">Client Trust</span>
          <h2 className="text-3xl font-black text-[#001341] mb-12">
            Trusted by Real Estate Teams Across India
          </h2>

          {/* Testimonial */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 mb-10 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5271ff] to-[#ff914d]" />
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <blockquote className="text-gray-700 text-lg md:text-xl italic leading-relaxed mb-6">
              "The lead generation support from Aiclex has helped us reach more serious buyers. The leads were relevant and the process was very well managed."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5271ff] flex items-center justify-center text-white font-black">SG</div>
              <div>
                <p className="font-black text-[#001341]">Sachin Gupta</p>
                <p className="text-[#ff914d] text-sm font-bold">UC Property</p>
              </div>
              <div className="ml-auto bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                ✅ 40+ buyer leads in first month
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "🏢", stat: "50+", label: "Real estate projects powered via Siteboard.in" },
              { icon: "🎯", stat: "100K+", label: "Leads managed across platforms" },
              { icon: "🏆", stat: "Built by", label: "A team that also runs its own real estate SaaS" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-2xl font-black text-[#001341]">{item.stat}</div>
                <div className="text-gray-500 text-sm font-medium mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ / OBJECTIONS ===================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#001341] text-center mb-12">Your Questions, Answered</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-[#001341] text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#5271ff] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 bg-blue-50/30">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#001341] to-[#0a2066] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[#ff914d]/20 border border-[#ff914d]/30 text-[#ff914d] text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
            Free Demo — No Obligation
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">See It in Action</h2>
          <p className="text-blue-100/80 text-lg mb-10">
            Schedule a 30-minute demo and we'll show you exactly how it works with your team's workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/aiclex/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#ff914d] hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl shadow-orange-500/30"
            >
              <Calendar className="w-5 h-5" />
              Book a Free Demo
            </a>
            <a
              href="tel:+918449488090"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              +91 84494 88090
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
