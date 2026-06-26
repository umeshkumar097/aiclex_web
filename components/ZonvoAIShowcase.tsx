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
    icon: <PhoneCall className="w-5 h-5 text-cyan-400" />,
    title: "Human-like Voice",
    desc: "Emotion-aware conversations with <300ms latency in Hindi, Hinglish & 28+ more languages.",
  },
  {
    icon: <Mic className="w-5 h-5 text-blue-400" />,
    title: "Outbound & Inbound",
    desc: "Handles cold calling, lead qualification, appointment booking, and customer support.",
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
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
      className="py-28 bg-[#01091f] overflow-hidden relative border-t border-white/5"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"
          style={{ animationDelay: "1.5s" }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* ── Left: Image side ── */}
          <div
            className={`w-full lg:w-1/2 relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Glow halo behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[2.5rem] blur-2xl scale-95" />

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#030d1f]">
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
            <div className="absolute -bottom-5 -right-5 md:flex hidden items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <div>
                <div className="text-white text-xs font-bold">AI Agent Live</div>
                <div className="text-green-400 text-[10px]">Calling now...</div>
              </div>
            </div>

            {/* Floating stat badge */}
            <div className="absolute -top-5 -left-5 md:flex hidden items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-2xl">
              <PhoneCall className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-white text-xs font-bold">500+ Calls/Day</div>
                <div className="text-cyan-400 text-[10px]">Per Agent</div>
              </div>
            </div>
          </div>

          {/* ── Right: Content side ── */}
          <div
            className={`w-full lg:w-1/2 space-y-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Mic className="w-3.5 h-3.5" />
              Introducing ZONVO AI
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.1]">
              AI Voice Agents That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Close Deals
              </span>{" "}
              While You Sleep
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              Deploy human-like AI calling agents that handle outbound sales, lead qualification,
              appointment booking, and customer support — 24/7, in 28+ languages, at{" "}
              <span className="text-cyan-400 font-semibold">{"<"}300ms latency</span>.
            </p>

            {/* Feature list */}
            <div className="space-y-5">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-0.5">{f.title}</h4>
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-center mb-1 text-cyan-400">{s.icon}</div>
                  <div className="text-white font-black text-lg leading-none">{s.value}</div>
                  <div className="text-gray-500 text-[10px] mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://zonvo.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-7 py-4 rounded-full transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Try ZONVO AI Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918449488090?text=I%20want%20to%20know%20more%20about%20ZONVO%20AI%20Voice%20Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold px-7 py-4 rounded-full transition-all"
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
