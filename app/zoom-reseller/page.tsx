"use client";

import { motion } from "framer-motion";
import { Calendar, Phone, CheckCircle, ArrowRight, MessageCircle, Star } from "lucide-react";

const comparisonRows = [
  { feature: "Billing Currency", direct: "USD", aiclex: "INR ✅" },
  { feature: "GST Invoice", direct: "❌", aiclex: "✅" },
  { feature: "Local Support", direct: "❌", aiclex: "✅ Phone + WhatsApp" },
  { feature: "Payment Method", direct: "International Card", aiclex: "UPI, NEFT, Bank Transfer ✅" },
  { feature: "Onboarding Help", direct: "Self-serve", aiclex: "Done with you ✅" },
  { feature: "License Management", direct: "You handle it", aiclex: "We manage it for you ✅" },
];

const plans = [
  { name: "Zoom Pro", desc: "For small teams and freelancers", details: "Up to 100 participants · 30-hour meetings · AI Companion · Cloud Storage" },
  { name: "Zoom Business", desc: "For growing organizations", details: "Up to 300 participants · SSO · Company branding · Unlimited whiteboards", popular: true },
  { name: "Zoom Business Plus", desc: "With translated captions & more", details: "Workspace reservations · Translated captions · All Business features" },
  { name: "Zoom Enterprise", desc: "For large enterprises", details: "Unlimited cloud storage · Dedicated CSM · 1000+ participants" },
  { name: "Zoom Webinar Add-on", desc: "For coaches & event organizers", details: "Up to 500 webinar attendees · Q&A, polling, reporting" },
  { name: "Zoom Phone", desc: "Cloud calling for your business", details: "Full-featured cloud PBX · Indian number support · Call recording" },
];

const audiences = [
  { icon: "🎓", label: "Schools, colleges & coaching institutes running online classes" },
  { icon: "🏢", label: "Corporate teams for daily standups and client meetings" },
  { icon: "🎙️", label: "Trainers, coaches & educators hosting webinars" },
  { icon: "🏗️", label: "Real estate teams for virtual site tours and team meetings" },
  { icon: "🏥", label: "Healthcare & telemedicine providers" },
  { icon: "🎤", label: "Event organizers & conference hosts" },
];

const trustSignals = [
  "Authorized Zoom Reseller, India",
  "50+ active Zoom clients across India",
  "GST-registered, compliant invoices for all licenses",
  "Based in Greater Noida, reachable on call & WhatsApp",
];

export default function ZoomResellerPage() {
  return (
    <div className="w-full bg-white font-sans overflow-hidden mt-20">

      {/* ===================== HERO ===================== */}
      <section className="relative bg-gradient-to-br from-[#001341] via-[#0a1f5e] to-[#001341] text-white py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff914d]/10 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#ff914d]/20 border border-[#ff914d]/30 text-[#ff914d] text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
              Authorized Zoom Reseller · India
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              Buy Official Zoom Licenses in India<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] to-yellow-400">
                INR Billing · GST Invoice · Local Support
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed mb-10">
              AICLEX Technologies is an authorized Zoom reseller based in Greater Noida. Get genuine Zoom Pro, Business, or Enterprise plans with Indian billing — no dollar payments, no international credit card needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918449488090?text=Hi%20AICLEX%2C%20I%20want%20a%20Zoom%20license%20quote%20for%20my%20organization."
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#ff914d] hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Get Zoom Pricing on WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://calendly.com/aiclex/discovery-call"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== WHY BUY FROM US ===================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#5271ff] font-black uppercase tracking-widest text-xs mb-3 block">Why AICLEX</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#001341]">
              Why 200+ Organizations Buy Zoom Through AICLEX
            </h2>
          </div>

          <div className="overflow-x-auto rounded-[1.5rem] border border-gray-100 shadow-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#001341] text-white">
                  <th className="p-5 text-left font-bold text-xs uppercase tracking-widest w-1/3">Feature</th>
                  <th className="p-5 text-center font-bold text-xs uppercase tracking-widest">Zoom Direct</th>
                  <th className="p-5 text-center font-bold text-xs uppercase tracking-widest text-[#ff914d]">AICLEX (Zoom Reseller)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="p-5 font-bold text-[#001341]">{row.feature}</td>
                    <td className="p-5 text-center text-gray-500 font-medium">{row.direct}</td>
                    <td className="p-5 text-center font-bold text-green-700 bg-green-50/30">{row.aiclex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================== PLANS ===================== */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#5271ff] font-black uppercase tracking-widest text-xs mb-3 block">All Plans</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#001341]">
              All Zoom Plans, <span className="text-[#ff914d]">Priced in INR</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative p-6 rounded-[1.5rem] border-2 transition-all hover:shadow-lg ${plan.popular ? "border-[#5271ff] bg-white shadow-xl" : "border-gray-100 bg-white"}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#5271ff] to-[#ff914d] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-lg font-black mb-1 ${plan.popular ? "text-[#5271ff]" : "text-[#001341]"}`}>{plan.name}</h3>
                <p className="text-gray-500 text-sm font-medium mb-3">{plan.desc}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{plan.details}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#001341] rounded-[1.5rem] p-8 text-center text-white">
            <p className="text-lg font-bold mb-2">Not sure which plan fits?</p>
            <p className="text-blue-200/80 mb-6">We'll recommend the right one based on your team size and usage. No upselling — just honest advice.</p>
            <a
              href="https://wa.me/918449488090?text=Hi%20AICLEX%2C%20I%20need%20help%20choosing%20the%20right%20Zoom%20plan."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ff914d] hover:bg-orange-500 text-white px-8 py-3 rounded-xl font-black transition-all hover:scale-105"
            >
              Get a Custom Quote →
            </a>
          </div>
        </div>
      </section>

      {/* ===================== WHO IS IT FOR ===================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#001341] text-center mb-12">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audiences.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all">
                <span className="text-3xl">{a.icon}</span>
                <p className="text-gray-700 font-semibold">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SOCIAL PROOF ===================== */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#001341] mb-10">What Our Clients Say</h2>

          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 mb-10 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5271ff] to-[#ff914d]" />
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <blockquote className="text-gray-700 text-lg italic leading-relaxed mb-6">
              "We conduct frequent Zoom sessions, and Aiclex made the entire setup effortless for us. Everything works perfectly, and their support team is quick and reliable."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ff914d] flex items-center justify-center text-white font-black">MK</div>
              <div>
                <p className="font-black text-[#001341]">Mohit Kumar</p>
                <p className="text-[#ff914d] text-sm font-bold">ProEditorsClub</p>
              </div>
              <div className="ml-auto bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                ✅ Zero downtime in 100+ sessions
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustSignals.map((signal, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-2" />
                <p className="text-gray-600 text-xs font-semibold leading-tight">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#001341] to-[#0a2066] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Get Your Zoom License?</h2>
          <p className="text-blue-100/80 text-lg mb-10">
            Tell us how many users you need licenses for and we'll send you a quote within <strong className="text-[#ff914d]">2 hours</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/918449488090?text=Hi%20AICLEX%2C%20please%20send%20me%20a%20Zoom%20license%20quote."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Request a Zoom Quote
            </a>
            <a
              href="https://calendly.com/aiclex/discovery-call"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
