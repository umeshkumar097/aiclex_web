import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowLeft, BarChart3, TrendingUp, Target, MousePointerClick } from "lucide-react";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";

export const metadata: Metadata = {
  title: "Paid Media Advertisement Agency | Google & Meta Ads",
  description: "Scale your ROI with high-performance Paid Media Advertisement. Expert management for Google Ads, Meta Ads, and LinkedIn B2B campaigns.",
  keywords: ["Paid Media Advertisement", "Google Ads Agency India", "PPC Management Services", "Meta Ads Expert", "Facebook Marketing Agency"],
};

export default function PaidMediaPage() {
  return (
    <div className="w-full mt-20 bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full py-24 overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5271ff] opacity-10 blur-[120px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#5271ff] mb-6 transition-colors font-medium text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Data-Driven <br/><span className="text-[#5271ff]">Paid Media</span> <br/>Growth Engines
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
              We go beyond clicks. Our focus is on high-quality lead generation and measurable ROI through expert-managed PPC campaigns on Google, Meta, and LinkedIn.
            </p>
            <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="px-8 py-4 bg-[#5271ff] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all">Audit My Campaigns</Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm italic font-medium border-l border-gray-700 pl-4">
                    <TrendingUp className="text-green-500" /> Average 4.2x ROAS for Clients
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center space-y-2">
                <Target className="mx-auto text-blue-500" size={40} />
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#5271ff]">Targeting</h4>
                <p className="text-2xl font-black">99.8%</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 mt-10 text-center space-y-2">
                <BarChart3 className="mx-auto text-[#ff914d]" size={40} />
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#ff914d]">Growth</h4>
                <p className="text-2xl font-black">+142%</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight uppercase tracking-tighter">Strategic Ad Management</h2>
            <p className="text-gray-500 font-medium">Stop wasting budget on broad keywords. Our surgical approach to paid media ensures every dollar spent contributes to your business objectives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
            {[
                { title: "Google Search Ads", desc: "Capture high-intent traffic exactly when they are searching for your services.", icon: MousePointerClick, color: "blue" },
                { title: "Meta Advertisement", desc: "Reach billions of users on Facebook & Instagram with scroll-stopping creatives.", icon: Target, color: "indigo" },
                { title: "B2B LinkedIn Ads", desc: "Connect directly with decision-makers and C-suite executives in your niche.", icon: TrendingUp, color: "blue" }
            ].map((card, i) => (
                <div key={i} className="group p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className={`w-14 h-14 bg-${card.color}-50 rounded-2xl flex items-center justify-center text-${card.color}-600 mb-8 group-hover:scale-110 transition-transform`}>
                        <card.icon size={28} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
            ))}
        </div>

        {/* RESULTS-FIRST APPROACH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-gray-50 rounded-[4rem] p-10 md:p-20 border border-gray-100 shadow-inner">
            <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Our ROI-First <br/><span className="text-[#5271ff]">Methodology</span></h2>
                <div className="space-y-4">
                    {["Deep Audience & Competitor Research", "High-Converting Dedicated Landing Pages", "Continuous A/B Testing of Creative & Copy", "Weekly Transparent Performance Reporting", "Advanced Server-Side Conversion Tracking"].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center font-bold text-gray-700">
                            <CheckCircle className="text-[#5271ff]" /> {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#001341] p-10 rounded-[3rem] text-white space-y-6">
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="w-12 h-12 bg-[#ff914d] rounded-full flex items-center justify-center font-black">?</div>
                    <div>
                        <h4 className="font-bold">Not sure where to start?</h4>
                        <p className="text-xs text-blue-200">Get a free $500 audit of your current ad accounts.</p>
                    </div>
                </div>
                <Link href="/contact" className="block w-full text-center py-4 bg-white text-[#001341] font-black rounded-2xl hover:bg-gray-100 transition-colors uppercase text-sm tracking-widest">Request Audit →</Link>
            </div>
        </div>
      </section>

      <WorkProcess />
      <SuccessStats />
    </div>
  );
}
