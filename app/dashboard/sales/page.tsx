"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  DollarSign, FileText, BarChart3, Settings, 
  ShieldCheck, Loader2, ArrowRight, Plus
} from "lucide-react";

function SalesContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "quotations";

  const getHeader = () => {
    switch (tab) {
      case "quotations": return { title: "Quotations Builder", desc: "Create, view, and send custom corporate sales quotes", icon: FileText };
      case "payments": return { title: "Payments Ledger", desc: "Track invoice subscription transactions and ledger entry history", icon: DollarSign };
      case "revenue": return { title: "Revenue Reports", desc: "Interactive MRR growth statistics and billing details", icon: BarChart3 };
      default: return { title: "Sales & Billing Control", desc: "Manage billing, transactions, and business quotations", icon: DollarSign };
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
            <Plus size={14} /> Create Quotation
          </button>
        </div>
      </div>

      {/* Simulator Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main interactive simulation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            
            {tab === "quotations" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Corporate Sales Proposals</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
                        <th className="p-3">Proposal ID</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">QT-2026-084</td>
                        <td className="p-3 text-gray-500">Jack Constructions Ltd</td>
                        <td className="p-3 font-bold">₹84,000</td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 text-[10px] font-bold rounded uppercase">PENDING</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">QT-2026-081</td>
                        <td className="p-3 text-gray-500">Tata Group India</td>
                        <td className="p-3 font-bold">₹2,40,000</td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">APPROVED</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "payments" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001341] mb-2">Billing Ledger History</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Invoice Email</th>
                        <th className="p-3">Gateway</th>
                        <th className="p-3 text-right">Settled</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-3 font-semibold text-[#001341]">order_88204901</td>
                        <td className="p-3 text-gray-500">umeshkumarceo@gmail.com</td>
                        <td className="p-3 text-gray-500">Cashfree PG</td>
                        <td className="p-3 text-right font-black text-green-600">SUCCESS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "revenue" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-150 rounded-2xl">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Monthly Recurring Revenue (MRR)</span>
                    <h4 className="text-2xl font-black text-[#001341] mt-1">₹4,82,000</h4>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Annual Run Rate (ARR)</span>
                    <h4 className="text-2xl font-black text-[#001341] mt-1">₹57,84,000</h4>
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
              <Settings size={18} className="text-gray-400" /> Sales Ledger
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">GSTIN Verified:</span>
                <span className="text-green-600 font-black flex items-center gap-1">
                  <ShieldCheck size={14} /> 09ABGCA0151N1ZL
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">CIN Code:</span>
                <span className="text-gray-700 font-black">U62099UW2026PTC254970</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Active Tax Schema:</span>
                <span className="text-blue-600 font-black">GST (18%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SalesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Loader2 className="animate-spin text-[#001341] mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading sales ledger workspace...</p>
      </div>
    }>
      <SalesContent />
    </Suspense>
  );
}
