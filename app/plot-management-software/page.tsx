"use client";

import { motion } from "framer-motion";
import { Calendar, Phone, ChevronDown, Map, Lock, CreditCard, FolderOpen, BarChart3, Layers, Download, ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";

const problems = [
  { q: "A buyer asks: 'Is Plot 47 available?'", a: "you dig through spreadsheets for 10 minutes" },
  { q: "Two agents book the same plot", a: "angry customer, lost trust, reputation damage" },
  { q: "A buyer calls asking about their next EMI", a: "you have no idea what was promised" },
  { q: "Documents are scattered across drives, WhatsApp, and email", a: "every request takes hours to answer" },
];

const features = [
  { icon: <Map className="w-6 h-6" />, title: "Interactive Plot Map", desc: "Visual layout of your project — green/yellow/red status at a glance. Know what's available instantly." },
  { icon: <Lock className="w-6 h-6" />, title: "Real-time Booking Lock", desc: "When one agent books a plot, it's instantly blocked for everyone else. Double-booking is impossible." },
  { icon: <CreditCard className="w-6 h-6" />, title: "Payment Schedule Tracker", desc: "Token → Agreement → Registry → EMIs, all tracked per buyer. No more manual reminders." },
  { icon: <FolderOpen className="w-6 h-6" />, title: "Buyer Document Vault", desc: "Store KYC, allotment letter, sale deed per plot/buyer. Fully organized, always accessible." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Project Dashboard", desc: "Sold, available, blocked, and pending plots in one real-time view. Know your status anytime." },
  { icon: <Layers className="w-6 h-6" />, title: "Multi-Project Support", desc: "Managing more than one township? Switch between projects instantly. No separate logins needed." },
  { icon: <Download className="w-6 h-6" />, title: "Export Reports", desc: "Generate project status and payment reports in PDF or Excel. Ready for management or audits." },
];

const audiences = [
  { icon: "🗺️", label: "Township Developers", sub: "managing 100–5000 plots" },
  { icon: "🏗️", label: "Real Estate Builders", sub: "with plotted project inventory" },
  { icon: "📋", label: "Project Management Teams", sub: "overseeing multiple sites" },
  { icon: "🤝", label: "Real Estate Brokers", sub: "with exclusive inventory to manage" },
];

const faqs = [
  {
    q: "We already have an Excel sheet that works.",
    a: "Until a double-booking happens, or a buyer disputes a payment record, or your manager needs a report at 9 PM. Excel works — until it doesn't. This does everything Excel does, plus it never makes mistakes.",
  },
  {
    q: "Is it complicated to set up?",
    a: "We handle the onboarding. You share your project layout and we configure it for you. Most teams are live within 3–5 working days.",
  },
  {
    q: "Can we customize it for our project?",
    a: "Yes. We build and modify as needed — we're a product studio, not a rigid SaaS vendor. Your project layout, your branding, your workflow.",
  },
];

export default function PlotManagementPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-white font-sans overflow-hidden mt-20">

      {/* ===================== HERO ===================== */}
      <section className="relative bg-gradient-to-br from-[#001341] via-[#0a1f5e] to-[#001341] text-white py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#ff914d]/20 border border-[#ff914d]/30 text-[#ff914d] text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
              Plot Management Software India
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              Stop Managing Plots on Excel.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] to-yellow-400">
                Start Using Software Built for It.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed mb-10">
              Our Plot Management Software gives builders and township developers a real-time view of their entire project — availability, bookings, payments, and documents — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/aiclex/discovery-call"
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#ff914d] hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                See a Live Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/918449488090?text=Hi%20AICLEX%2C%20I%20want%20to%20see%20a%20demo%20of%20your%20Plot%20Management%20Software."
                target="_blank" rel="noopener noreferrer"
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
          <h2 className="text-3xl md:text-4xl font-black text-[#001341] text-center mb-4">
            Managing a plotted project without the right software looks like this:
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">These scenarios cost you deals, trust, and time every single week.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm"
              >
                <p className="font-black text-[#001341] mb-2">😰 {p.q}</p>
                <p className="text-red-500 text-sm font-semibold">→ {p.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-br from-[#001341] to-[#0a2066] text-white p-8 rounded-[2rem] text-center">
            <p className="text-lg md:text-xl font-bold leading-relaxed">
              This is how deals fall apart and projects get delayed.<br />
              <span className="text-[#ff914d]">There's a better way.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#5271ff] font-black uppercase tracking-widest text-xs mb-3 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#001341]">
              Built for Builders, Developers &<br />
              <span className="text-[#ff914d]">Township Managers</span>
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
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ff914d] flex items-center justify-center mb-5 group-hover:bg-[#ff914d] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-[#001341] font-black text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHO IT'S FOR ===================== */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#001341] text-center mb-12">Who It's For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {audiences.map((a, i) => (
              <div key={i} className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-orange-100 hover:shadow-md transition-all">
                <span className="text-4xl">{a.icon}</span>
                <div>
                  <p className="font-black text-[#001341] text-lg">{a.label}</p>
                  <p className="text-gray-500 text-sm">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SOCIAL PROOF ===================== */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#001341] to-[#0a2066] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[#ff914d]/20 border border-[#ff914d]/30 text-[#ff914d] text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
            Built at Scale
          </span>
          <h2 className="text-3xl font-black mb-6">Built by a Team Already Running Real Estate SaaS at Scale</h2>
          <p className="text-blue-100/80 text-lg leading-relaxed mb-8">
            AICLEX Technologies powers <strong className="text-[#ff914d]">Siteboard.in</strong> — an enterprise SaaS platform already managing <strong className="text-white">50+ premium township and developer projects</strong> across India. Plot Management Software is built on the same foundation, battle-tested at scale.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { stat: "50+", label: "Township projects live" },
              { stat: "100K+", label: "Leads managed" },
              { stat: "3–5 days", label: "Average onboarding time" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <div className="text-2xl font-black text-[#ff914d]">{item.stat}</div>
                <div className="text-blue-200 text-xs mt-1 font-medium">{item.label}</div>
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
                  <ChevronDown className={`w-5 h-5 text-[#ff914d] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 bg-orange-50/20">
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
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to See Your Project in Real-Time?</h2>
          <p className="text-blue-100/80 text-lg mb-10">
            Book a free demo and we'll show you what your township looks like inside the software — using your own plot layout if you share it with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/aiclex/discovery-call"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#ff914d] hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl"
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
