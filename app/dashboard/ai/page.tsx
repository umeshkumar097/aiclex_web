"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Brain, PhoneCall, MessageSquare, Target, Sparkles, Mail, BarChart3, 
  Play, Settings, ArrowRight, ShieldCheck, Zap, Loader2
} from "lucide-react";

function AIContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "calling";

  const getHeader = () => {
    switch (tab) {
      case "calling": return { title: "AI Calling Agent", desc: "Outbound and inbound autonomous voice agent simulation", icon: PhoneCall };
      case "chat": return { title: "AI Agent Chat", desc: "Custom GPT-style customer support sandbox simulation", icon: MessageSquare };
      case "lead-score": return { title: "AI Predictive Scoring", desc: "Evaluate and rank inbound leads based on conversion probability", icon: Target };
      case "follow-up": return { title: "AI Automated Follow-ups", desc: "Contextual conversation follow-up sequences", icon: Sparkles };
      case "email": return { title: "AI Smart Emailer", desc: "Generate sales copy and schedule custom follow-up sequences", icon: Mail };
      case "analytics": return { title: "AI Analytics", desc: "Predictive intelligence reports and agent performance charts", icon: BarChart3 };
      default: return { title: "AI Engine Workspace", desc: "Configure and manage autonomous AI workflows", icon: Brain };
    }
  };

  const header = getHeader();
  const Icon = header.icon;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#001341] text-blue-400 rounded-2xl shadow-md">
              <Icon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#001341]">{header.title}</h1>
              <p className="text-gray-500 text-sm mt-1">{header.desc}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 rounded-full animate-pulse">
            Enterprise AI active
          </span>
        </div>
      </div>

      {/* Simulator Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main interactive simulation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#001341] mb-4 flex items-center gap-2">
              <Zap size={18} className="text-blue-500" /> Agent Simulator Panel
            </h3>

            {tab === "calling" && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#001341] text-sm">Lead: +91 84494 88090</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Campaign: Outbound Renewal Call</p>
                  </div>
                  <button className="px-4 py-2 bg-[#001341] text-white hover:bg-blue-900 text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer">
                    <Play size={12} className="fill-white" /> Start Voice Call
                  </button>
                </div>
                <div className="border border-gray-100 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Agent Configuration</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Select Voice Accent</label>
                      <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-xs font-semibold text-[#001341] outline-none">
                        <option>Indian English (Aditi)</option>
                        <option>US Female (Emily)</option>
                        <option>UK Male (Oliver)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Max Duration</label>
                      <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-xs font-semibold text-[#001341] outline-none">
                        <option>3 Minutes</option>
                        <option>5 Minutes</option>
                        <option>Unlimited</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "chat" && (
              <div className="space-y-4">
                <div className="h-64 border border-gray-100 rounded-2xl p-4 bg-gray-50 overflow-y-auto space-y-4 text-xs">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">AI</div>
                    <div className="p-3 bg-white rounded-2xl border border-gray-150 max-w-[80%]">
                      Hello! I am your Aiclex AI agent. How can I help you choose the best Zoom package for your team today?
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="p-3 bg-[#001341] text-white rounded-2xl max-w-[80%] font-medium">
                      What is the difference between Zoom Business and Business Plus?
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type message to test AI agent response..." 
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#001341]"
                  />
                  <button className="px-4 py-3 bg-[#001341] text-white hover:bg-blue-900 text-xs font-bold rounded-xl transition cursor-pointer">
                    Send
                  </button>
                </div>
              </div>
            )}

            {tab === "lead-score" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 border border-green-150 rounded-2xl text-center">
                    <h5 className="text-2xl font-black text-green-700">92%</h5>
                    <p className="text-xs text-green-600 font-bold mt-1">High Conversion Probability</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-150 rounded-2xl text-center">
                    <h5 className="text-2xl font-black text-blue-700">74%</h5>
                    <p className="text-xs text-blue-600 font-bold mt-1">Medium Probability</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl text-center">
                    <h5 className="text-2xl font-black text-gray-700">35%</h5>
                    <p className="text-xs text-gray-600 font-bold mt-1">Low Conversion Probability</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                        <th className="p-3">Lead Email</th>
                        <th className="p-3">Score Factors</th>
                        <th className="p-3 text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">rahul.gupta@outlook.com</td>
                        <td className="p-3 text-gray-500">Visited Pricing Page 4x, Downloaded Proposal</td>
                        <td className="p-3 text-right font-black text-green-600">95/100</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">pooja.sharma@tata.com</td>
                        <td className="p-3 text-gray-500">Opened Email Campaign, Clicked CTA Link</td>
                        <td className="p-3 text-right font-black text-blue-600">72/100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab !== "calling" && tab !== "chat" && tab !== "lead-score" && (
              <div className="py-12 text-center text-gray-400 text-xs font-bold space-y-2">
                <Brain size={32} className="mx-auto text-blue-400 mb-2 animate-bounce" />
                <p>Advanced AI feature setup simulation for "{header.title}"</p>
                <p className="text-[10px] text-gray-400">Configuration panel is loading live pipeline events...</p>
              </div>
            )}

          </div>
        </div>

        {/* Right 1 Column: Stats & logs */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#001341] mb-4 border-b border-gray-50 pb-3 flex items-center gap-2">
              <Settings size={18} className="text-gray-400" /> Engine Settings
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">API Status:</span>
                <span className="text-green-600 font-black flex items-center gap-1">
                  <ShieldCheck size={14} /> Operational
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Model Engine:</span>
                <span className="text-blue-600 font-black">Gemini 1.5 Flash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Latency average:</span>
                <span className="text-gray-700 font-black">240ms</span>
              </div>
              <div className="pt-2">
                <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 font-bold text-xs transition">
                  Regenerate API Tokens
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AIPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Loader2 className="animate-spin text-[#001341] mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading AI dashboard workspace...</p>
      </div>
    }>
      <AIContent />
    </Suspense>
  );
}
