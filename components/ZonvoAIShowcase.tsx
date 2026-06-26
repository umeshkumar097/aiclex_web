"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, Mic, Zap, Users, Clock, TrendingUp, ArrowRight, PhoneCall } from "lucide-react";

const stats = [
  { value: "300ms", label: "Response Time", icon: <Zap className="w-4 h-4" /> },
  { value: "28+", label: "Languages", icon: <Users className="w-4 h-4" /> },
  { value: "24/7", label: "Availability", icon: <Clock className="w-4 h-4" /> },
  { value: "5X", label: "More Calls/Day", icon: <TrendingUp className="w-4 h-4" /> },
];

const features = [
  {
    icon: <PhoneCall className="w-5 h-5 text-[#ff914d]" />,
    title: "Human-like Voice",
    desc: "Emotion-aware conversations with <300ms latency in Hindi, Hinglish & 28+ more languages.",
  },
  {
    icon: <Mic className="w-5 h-5 text-[#5271ff]" />,
    title: "Outbound & Inbound",
    desc: "Handles cold calling, lead qualification, appointment booking, and customer support.",
  },
  {
    icon: <Zap className="w-5 h-5 text-[#ff914d]" />,
    title: "No-Code Setup",
    desc: "Deploy your AI voice agent in minutes — no engineers needed. Plug into any CRM.",
  },
];

export default function ZonvoAIShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden relative border-t border-gray-100"
    >
      {/* Subtle background blobs matching site palette */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#5271ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-[#ff914d]/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* ── Left: Image side ── */}
          <div
            className={`w-full lg:w-1/2 relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Glow halo matching brand */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#5271ff]/20 to-[#ff914d]/20 rounded-[2.5rem] blur opacity-60" />

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="/zonvo-ai-hero.png"
                alt="ZONVO AI Voice Calling Agent"
                width={680}
                height={680}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Floating live-call badge */}
            <div className="absolute -bottom-5 -right-5 hidden md:flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <div>
                <div className="text-[#001341] text-xs font-bold">AI Agent Live</div>
                <div className="text-green-500 text-[10px]">Calling now...</div>
              </div>
            </div>

            {/* Floating stat badge */}
            <div className="absolute -top-5 -left-5 hidden md:flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-xl">
              <div className="w-8 h-8 rounded-lg bg-[#ff914d]/10 flex items-center justify-center">
                <PhoneCall className="w-4 h-4 text-[#ff914d]" />
              </div>
              <div>
                <div className="text-[#001341] text-xs font-bold">500+ Calls/Day</div>
                <div className="text-gray-400 text-[10px]">Per Agent</div>
              </div>
            </div>
          </div>

          {/* ── Right: Content side ── */}
          <div
            className={`w-full lg:w-1/2 space-y-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Badge — matches site style */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff914d]/10 border border-[#ff914d]/20 text-[#ff914d] text-xs font-bold uppercase tracking-widest">
              <Mic className="w-3.5 h-3.5" />
              Introducing ZONVO AI
            </div>

            {/* Heading — uses site font/colors */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-[#001341] leading-[1.1]">
              AI Voice Agents That{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5271ff] to-[#ff914d]">
                Close Deals
              </span>{" "}
              While You Sleep
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Deploy human-like AI calling agents that handle outbound sales, lead qualification,
              appointment booking, and customer support — 24/7, in 28+ languages, at{" "}
              <span className="text-[#5271ff] font-semibold">{"<"}300ms latency</span>.
            </p>

            {/* Feature list */}
            <div className="space-y-5">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#001341] text-sm mb-0.5">{f.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-3 pt-2">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-1 text-[#5271ff]">{s.icon}</div>
                  <div className="text-[#001341] font-black text-lg leading-none">{s.value}</div>
                  <div className="text-gray-400 text-[10px] mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons — site style */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://zonvo.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#001341] hover:bg-[#ff914d] text-white font-black px-7 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Try ZONVO AI Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918449488090?text=I%20want%20to%20know%20more%20about%20ZONVO%20AI%20Voice%20Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-[#001341] border border-gray-200 font-bold px-7 py-4 rounded-full transition-all"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
