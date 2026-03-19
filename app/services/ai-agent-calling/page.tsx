import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Mic, Brain, Zap, Cpu } from "lucide-react";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";

export const metadata: Metadata = {
  title: "AI Agent Calling Services | Indian Business Automation",
  description: "Scale your customer outreach with AI Powered Calling Agents. Automate lead qualification, appointment setting, and support with human-like voice AI.",
  keywords: ["AI Agent Calling", "Automated Calling Services", "Lead Qualification AI", "Voice AI India", "AICLEX AI solutions"],
};

export default function AIAgentCallingPage() {
  return (
    <div className="w-full mt-20 bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full py-24 overflow-hidden bg-[#001341] text-white">
        <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link href="/" className="inline-flex items-center text-blue-300 hover:text-[#ff914d] mb-6 transition-colors font-medium text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Revolutionizing <br/><span className="text-[#ff914d]">Customer Outreach</span> <br/>With AI Agents
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
              Automate lead qualification and customer support calls with state-of-the-art Natural Language Processing. Scale your voice operations without hiring more staff.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-10 py-4 rounded-full text-white font-bold shadow-lg bg-[#ff914d] hover:bg-orange-600 hover:scale-105 transition-all duration-300"
            >
              Book a Live Demo
            </Link>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-[#5271ff] to-blue-800 rounded-[3rem] shadow-2xl flex items-center justify-center animate-pulse">
                    <Mic size={100} className="text-white" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl text-[#001341] flex items-center gap-3 animate-bounce">
                    <Brain className="text-[#5271ff]" />
                    <span className="font-bold text-sm">Powered by LLMs</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED CONTENT */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">Human-Like Conversations <br/>At Infinite Scale</h2>
                <div className="space-y-6">
                    <div className="flex gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#5271ff] rounded-2xl flex items-center justify-center text-white shrink-0"><Cpu size={24} /></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Advanced Voice Synthesis</h4>
                            <p className="text-sm text-gray-500 italic">Select from hundreds of life-like voices that capture the right tone and emotion for your brand.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#ff914d] rounded-2xl flex items-center justify-center text-white shrink-0"><Zap size={24} /></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Real-time Lead Scoring</h4>
                            <p className="text-sm text-gray-500 italic">AI automatically tags and scores leads based on call sentiment and responses, syncing them to your CRM.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-10 bg-blue-50 rounded-[3.5rem] border-2 border-dashed border-blue-200">
                <h3 className="text-2xl font-bold text-[#001341] mb-6">Popular Use Cases</h3>
                <ul className="space-y-4">
                    {["Lead Qualification & Filtering", "Appointment Reminders & Scheduling", "Customer Satisfaction Surveys", "Past-due Payment Reminders", "Order Tracking & Updates"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium font-sans">
                            <CheckCircle className="text-[#5271ff]" size={20} /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* CTA SECTION */}
        <div className="bg-gradient-to-r from-[#001341] to-blue-900 rounded-[3.5rem] p-12 md:p-20 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Ready to automate your <br/>first 10,000 calls?</h2>
            <p className="text-blue-200 mb-12 max-w-2xl mx-auto">Join the future of customer interaction. Our AI agents are ready to work for you 24/7 with zero overhead.</p>
            <Link href="/contact" className="px-12 py-5 bg-white text-[#001341] font-black rounded-full hover:scale-105 transition-all uppercase tracking-widest shadow-xl">Get Started Now</Link>
        </div>
      </section>

      <WorkProcess />
      <SuccessStats />
    </div>
  );
}
