"use client";

import React from "react";
import { Check, X } from "lucide-react"; // Import X icon

// --- Data extracted directly from the uploaded comparison table images ---
const comparisonData = [
  {
    category: "Meetings",
    features: [
      { name: "Meeting duration", basic: "40 mins", pro: "30 hours", business: "30 hours", enterprise: "30 hours" },
      { name: "Participant capacity", basic: "100", pro: "100", business: "300", enterprise: "500+" },
      { name: "Recording", basic: "Local", pro: "Local & 10 GB cloud (per license)", business: "Local & 10 GB cloud (per license)", enterprise: "Local & Unlimited cloud" },
      { name: "Unlimited meetings", basic: true, pro: true, business: true, enterprise: true },
      { name: "Automated Captions", basic: true, pro: true, business: true, enterprise: true },
    ]
  },
  {
    category: "AI Companion",
    features: [
      { name: "AI Companion features", basic: false, pro: true, business: true, enterprise: true },
    ]
  },
  {
    category: "Team Collaboration",
    features: [
      { name: "Team Chat", basic: true, pro: true, business: true, enterprise: true },
      { name: "Phone", basic: false, pro: false, business: false, enterprise: true },
      { name: "Scheduler", basic: false, pro: false, business: true, enterprise: true },
      { name: "Whiteboard", basic: "3", pro: "3", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Docs", basic: "Limited features", pro: true, business: true, enterprise: true },
      { name: "Clips", basic: "5 Included", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Mail", basic: true, pro: true, business: true, enterprise: true },
      { name: "Calendar", basic: true, pro: true, business: true, enterprise: true },
      { name: "Tasks", basic: "Limited features", pro: true, business: true, enterprise: true },
      { name: "Workflow Automation", basic: false, pro: "Complimentary access", business: "Complimentary access", enterprise: "Complimentary access" },
      { name: "Hub", basic: "Limited features", pro: true, business: true, enterprise: true },
    ]
  },
  {
    category: "Additional Features",
    features: [
      { name: "Webinars", basic: false, pro: false, business: false, enterprise: "Webinars 500" },
      { name: "Rooms", basic: false, pro: false, business: false, enterprise: true },
      { name: "Workspace Reservation", basic: false, pro: false, business: false, enterprise: true },
      { name: "Visitor Management", basic: false, pro: false, business: false, enterprise: true },
      { name: "Cloud Storage", basic: false, pro: "10 GB", business: "10 GB", enterprise: "Unlimited" },
      { name: "Support", basic: true, pro: true, business: true, enterprise: true },
      { name: "Essential Apps", basic: false, pro: "Free premium apps for 1 year", business: "Free premium apps for 1 year", enterprise: "Free premium apps for 1 year" },
      { name: "Translated Captions", basic: false, pro: false, business: false, enterprise: true },
      { name: "Workplace Integrations", basic: true, pro: true, business: true, enterprise: true },
      { name: "Security And Compliance", basic: true, pro: true, business: true, enterprise: true },
    ]
  }
];

export default function PricingComparison() {
  return (
    <section className="w-full py-20 bg-white px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#001341] mb-4">Compare Plans</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A detailed look at what's included in each plan to help you make the right choice.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto shadow-lg rounded-3xl border border-gray-100">
          <table className="w-full border-collapse min-w-[900px] bg-white text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-6 text-lg font-bold text-[#001341] w-1/4 sticky left-0 bg-gray-50 z-10 border-b border-gray-200">
                  Features
                </th>
                <th className="p-6 text-center text-lg font-bold text-[#001341] w-[18%] border-b border-gray-200">
                  Basic
                  <span className="block text-xs font-normal text-gray-500 mt-1">Free</span>
                </th>
                <th className="p-6 text-center text-lg font-bold text-[#5271ff] w-[18%] bg-[#5271ff]/5 border-b border-gray-200 border-t-4 border-t-[#5271ff]">
                  Pro
                  <span className="block text-xs font-normal text-gray-500 mt-1">Popular</span>
                </th>
                <th className="p-6 text-center text-lg font-bold text-[#001341] w-[18%] border-b border-gray-200">
                  Business
                  <span className="block text-xs font-normal text-gray-500 mt-1">Small Biz</span>
                </th>
                <th className="p-6 text-center text-lg font-bold text-[#001341] w-[18%] border-b border-gray-200">
                  Enterprise
                  <span className="block text-xs font-normal text-gray-500 mt-1">Large Scale</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  {/* Category Section Header */}
                  <tr className="bg-gray-100/50">
                    <td colSpan={5} className="p-4 pl-6 font-extrabold text-sm text-[#001341] uppercase tracking-wider border-y border-gray-200">
                      {section.category}
                    </td>
                  </tr>
                  
                  {/* Feature Rows */}
                  {section.features.map((row, rIdx) => (
                    <tr key={rIdx} className="group transition-colors hover:bg-gray-50">
                      <td className="p-4 pl-6 text-sm font-medium text-gray-700 border-b border-gray-100 sticky left-0 bg-white group-hover:bg-gray-50">
                        {row.name}
                      </td>
                      
                      {/* Basic Cell */}
                      <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">
                        {renderCell(row.basic)}
                      </td>
                      
                      {/* Pro Cell (Highlighted) */}
                      <td className="p-4 text-center text-sm text-gray-900 font-medium bg-[#5271ff]/5 border-b border-[#5271ff]/10 group-hover:bg-[#5271ff]/10 transition-colors">
                        {renderCell(row.pro)}
                      </td>
                      
                      {/* Business Cell */}
                      <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">
                        {renderCell(row.business)}
                      </td>
                      
                      {/* Enterprise Cell */}
                      <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">
                        {renderCell(row.enterprise)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

// Helper function to render different data types (Check, Cross, or Text)
function renderCell(value: string | boolean) {
  if (value === true) {
    return <div className="flex justify-center"><Check size={20} className="text-[#5271ff] stroke-[3]" /></div>;
  }
  if (value === false) {
    // Replaced Minus with X (Cross) icon
    return <div className="flex justify-center"><X size={20} className="text-gray-300" /></div>;
  }
  return <span className="leading-snug block max-w-[150px] mx-auto">{value}</span>;
}