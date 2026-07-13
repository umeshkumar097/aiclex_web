"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  MessageSquare, PhoneCall, Mail, Settings, 
  ShieldCheck, Loader2, Play, Users, MessageCircle
} from "lucide-react";

function CommContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "whatsapp";

  const getHeader = () => {
    switch (tab) {
      case "whatsapp": return { title: "WhatsApp API Console", desc: "Interact and automate customer queries via official WhatsApp API", icon: MessageCircle };
      case "sms": return { title: "SMS Service Logs", desc: "Outbound Twilio SMS text notification dispatch status", icon: MessageSquare };
      case "calls": return { title: "Voice Call Logs", desc: "Inbound and outbound telephone dialer transcripts", icon: PhoneCall };
      default: return { title: "Communications Hub", desc: "Manage multichannel inbox communications", icon: MessageSquare };
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
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-[#001341] text-white border border-[#131b32] rounded-full">
            Channel Connected
          </span>
        </div>
      </div>

      {/* Simulator Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main interactive simulation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            
            {tab === "whatsapp" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <h3 className="text-base font-bold text-[#001341] flex items-center gap-2">
                    <MessageCircle size={18} className="text-emerald-500" /> WhatsApp Sandbox Conversations
                  </h3>
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold rounded-xl transition cursor-pointer">
                    Sync Messages
                  </button>
                </div>
                <div className="h-64 border border-gray-100 rounded-2xl p-4 bg-[#f0f2f5] overflow-y-auto space-y-4 text-xs">
                  <div className="flex gap-2">
                    <div className="p-3 bg-white rounded-2xl border border-gray-150 max-w-[80%] shadow-sm">
                      Hello! I need to upgrade my invoice billing details.
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="p-3 bg-[#e2f9ff] rounded-2xl max-w-[80%] font-medium shadow-sm">
                      Sure, our support team can assist. Please send your registration certificate.
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type template reply message..." 
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#001341]"
                  />
                  <button className="px-4 py-3 bg-[#001341] text-white hover:bg-blue-900 text-xs font-bold rounded-xl transition cursor-pointer">
                    Send Reply
                  </button>
                </div>
              </div>
            )}

            {tab === "sms" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Twilio SMS Logs</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
                        <th className="p-3">Phone</th>
                        <th className="p-3">SMS Body</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">+91 84494 88090</td>
                        <td className="p-3 text-gray-500">Your Zoom Business invoice A-234 is ready...</td>
                        <td className="p-3 text-right font-black text-green-600">DELIVERED</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">+91 94595 10294</td>
                        <td className="p-3 text-gray-500">Verification code: 88409</td>
                        <td className="p-3 text-right font-black text-blue-600">SENT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "calls" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Recent Call Logs</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
                        <th className="p-3">Caller</th>
                        <th className="p-3">Agent</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3 text-right">Direction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">Aiclex Client (Sumit)</td>
                        <td className="p-3 text-gray-500">AI Calling Voice (Aditi)</td>
                        <td className="p-3">1m 45s</td>
                        <td className="p-3 text-right font-black text-blue-600">OUTBOUND</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right 1 Column: Stats & settings */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#001341] mb-4 border-b border-gray-50 pb-3 flex items-center gap-2">
              <Settings size={18} className="text-gray-400" /> Channel Config
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">WhatsApp API:</span>
                <span className="text-green-600 font-black flex items-center gap-1">
                  <ShieldCheck size={14} /> Operational
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">SMS Engine:</span>
                <span className="text-gray-700 font-black">Twilio Gateway</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Active Webhook:</span>
                <span className="text-blue-600 font-black truncate max-w-[120px]">aiclex.in/api/webhooks</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CommPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Loader2 className="animate-spin text-[#001341] mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading Communications hub...</p>
      </div>
    }>
      <CommContent />
    </Suspense>
  );
}
