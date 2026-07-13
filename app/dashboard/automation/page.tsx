"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Zap, Globe, Settings, ShieldCheck, 
  Loader2, Play, Users, Link as LinkIcon, Plus
} from "lucide-react";

function AutomationContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "workflows";

  const getHeader = () => {
    switch (tab) {
      case "workflows": return { title: "Workflows Automation Builder", desc: "Design and deploy multi-step conditional trigger workflows", icon: Zap };
      case "webhooks": return { title: "Webhooks Integration", desc: "Manage inbound HTTP listener payloads and event triggers", icon: Globe };
      case "integrations": return { title: "Workspace Integrations", desc: "Connect Aiclex CRM with external platforms and tools", icon: LinkIcon };
      default: return { title: "Automations Control Panel", desc: "Configure workflows, webhooks, and third-party integrations", icon: Zap };
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
          <button className="px-4 py-2 bg-[#001341] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2">
            <Plus size={14} /> New Workflow
          </button>
        </div>
      </div>

      {/* Simulator Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main interactive simulation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            
            {tab === "workflows" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Automated Active Workflows</h3>
                <div className="space-y-3 text-xs">
                  <div className="p-4 border border-gray-150 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-[#001341]">When Lead is created → Send WhatsApp Welcome Message</h4>
                      <p className="text-gray-500 mt-1">Trigger: CRM Lead Onboarding | Run Count: 482 times</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg uppercase">ACTIVE</span>
                  </div>
                  <div className="p-4 border border-gray-150 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-[#001341]">When Zoom Order Succeeded → Create Invoice PDF</h4>
                      <p className="text-gray-500 mt-1">Trigger: Subscriptions Ledger Settlement | Run Count: 1,029 times</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg uppercase">ACTIVE</span>
                  </div>
                </div>
              </div>
            )}

            {tab === "webhooks" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Webhooks Endpoint Setup</h3>
                <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl text-xs space-y-2">
                  <span className="font-bold text-gray-500 block uppercase tracking-wider text-[9px]">Your Webhook Listener URL</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value="https://aiclex.in/api/webhooks/orders" 
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none font-mono"
                    />
                    <button className="px-4 py-2 bg-[#001341] text-white hover:bg-blue-900 rounded-lg font-bold">Copy</button>
                  </div>
                </div>
              </div>
            )}

            {tab === "integrations" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Connected Platforms</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 border border-gray-150 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#001341]">Cashfree Payments</h4>
                      <p className="text-gray-500 mt-0.5">Status: Linked</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  </div>
                  <div className="p-4 border border-gray-150 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#001341]">Twilio SMS Console</h4>
                      <p className="text-gray-500 mt-0.5">Status: Linked</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right 1 Column: Stats & settings */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#001341] mb-4 border-b border-gray-50 pb-3 flex items-center gap-2">
              <Settings size={18} className="text-gray-400" /> Automation Stats
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Total Operations:</span>
                <span className="text-gray-700 font-black">15,820 / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Success Rate:</span>
                <span className="text-green-600 font-black">99.85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Integration Limit:</span>
                <span className="text-blue-600 font-black">Unlimited</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AutomationPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Loader2 className="animate-spin text-[#001341] mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading automations workspace...</p>
      </div>
    }>
      <AutomationContent />
    </Suspense>
  );
}
