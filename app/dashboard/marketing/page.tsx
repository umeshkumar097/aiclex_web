"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Globe, Target, FileText, Settings, 
  ShieldCheck, Loader2, Play, Users, Mail
} from "lucide-react";

function MarketingContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "campaigns";

  const getHeader = () => {
    switch (tab) {
      case "campaigns": return { title: "Campaigns Planner", desc: "Build, launch, and monitor active marketing campaigns", icon: Target };
      case "landing-pages": return { title: "Landing Pages builder", desc: "Manage layout landing pages and funnel simulations", icon: Globe };
      case "forms": return { title: "Forms Lead Capture", desc: "Generate contact templates and input fields forms", icon: FileText };
      default: return { title: "Marketing Campaign Hub", desc: "Manage campaigns, landing pages, and lead captures", icon: Target };
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
          <button className="px-4 py-2 bg-[#001341] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition cursor-pointer">
            Create Campaign
          </button>
        </div>
      </div>

      {/* Simulator Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main interactive simulation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            
            {tab === "campaigns" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Active Marketing Campaigns</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
                        <th className="p-3">Campaign Name</th>
                        <th className="p-3">Budget</th>
                        <th className="p-3">Leads Captured</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">AdWords - Google Ads Zoom</td>
                        <td className="p-3 text-gray-500">₹40,000 / mo</td>
                        <td className="p-3 font-bold">142 Leads</td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">RUNNING</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">Meta Retargeting Leads</td>
                        <td className="p-3 text-gray-500">₹15,000 / mo</td>
                        <td className="p-3 font-bold">48 Leads</td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">PAUSED</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "landing-pages" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Funnel Landing Pages</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 border border-gray-150 rounded-2xl space-y-2">
                    <h4 className="font-bold text-[#001341]">Google AdWords Promo</h4>
                    <p className="text-gray-500">URL: aiclex.in/promo/zoom-discount</p>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded">Active</span>
                  </div>
                  <div className="p-4 border border-gray-150 rounded-2xl space-y-2">
                    <h4 className="font-bold text-[#001341]">AI calling Sandbox Launch</h4>
                    <p className="text-gray-500">URL: aiclex.in/solutions/ai-calling</p>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded">Active</span>
                  </div>
                </div>
              </div>
            )}

            {tab === "forms" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Lead Capture Forms</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
                        <th className="p-3">Form Name</th>
                        <th className="p-3">Inputs</th>
                        <th className="p-3 text-right">Submissions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">Contact Us Page Form</td>
                        <td className="p-3 text-gray-500">Name, Email, Message, Phone</td>
                        <td className="p-3 text-right font-black text-blue-600">824</td>
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
              <Settings size={18} className="text-gray-400" /> Marketing Stats
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Startup India Badge:</span>
                <span className="text-emerald-600 font-black flex items-center gap-1">
                  <ShieldCheck size={14} /> Registered
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Total Email Sends:</span>
                <span className="text-gray-700 font-black">12,480 / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Conversion Rate:</span>
                <span className="text-blue-600 font-black">4.82%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function MarketingPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Loader2 className="animate-spin text-[#001341] mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading marketing campaign workspace...</p>
      </div>
    }>
      <MarketingContent />
    </Suspense>
  );
}
