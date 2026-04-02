"use client";

import React, { useState } from "react";
import { 
  BarChart, 
  TrendingDown, 
  AlertCircle, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Target, 
  Zap,
  Lock,
  ChevronRight,
  TrendingUp,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadCostCalculator() {
  const [step, setStep] = useState(1); // 1: Input, 2: Preview, 3: Lead Form, 4: Full Report
  const [loading, setLoading] = useState(false);
  
  // Inputs
  const [adSpend, setAdSpend] = useState(25000);
  const [leads, setLeads] = useState(100);
  const [niche, setNiche] = useState("Real Estate");
  
  // Lead info
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // Calculations
  const cplNum = leads > 0 ? (adSpend / leads) : 0;
  const cpl = cplNum.toFixed(2);
  
  // Benchmark logic (simplified for India)
  const getStatus = () => {
    const val = cplNum;
    if (val < 50) return { label: "Excellent", color: "text-green-600", bg: "bg-green-50" };
    if (val < 150) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50" };
    if (val < 400) return { label: "High", color: "text-orange-600", bg: "bg-orange-50" };
    return { label: "Critical", color: "text-red-600", bg: "bg-red-50" };
  };

  const status = getStatus();

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          requirement: `Lead Cost Analysis (Niche: ${niche}): Spend: ₹${adSpend}, Leads: ${leads}. CPL: ₹${cpl}. Status: ${status.label}.`,
          source: "Lead Cost Calculator"
        })
      });
      setStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
          >
            <BarChart size={16} /> Budget Efficiency Tool
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-[#001341] mb-4">
            Lead <span className="text-[#ff914d]">Cost</span> Calculator
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            "Aapka 1 lead kitne ka pad raha hai?" Calculate your exact CPL and see if you are overpaying compared to your competitors.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white p-8 md:p-12 overflow-hidden relative">
          
          {/* Step 1: Input Form */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <DollarSign size={16} className="text-blue-500" /> Monthly Ad Spend (₹)
                  </label>
                  <input 
                    type="number" 
                    value={adSpend} 
                    onChange={(e) => setAdSpend(Number(e.target.value))}
                    className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Target size={16} className="text-orange-500" /> Total Leads Received
                  </label>
                  <input 
                    type="number" 
                    value={leads} 
                    onChange={(e) => setLeads(Number(e.target.value))}
                    className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4 sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <TrendingUp size={16} className="text-green-500" /> Your Business Niche
                  </label>
                  <select 
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full text-xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-green-100 outline-none transition-all appearance-none"
                  >
                    <option>Real Estate</option>
                    <option>E-commerce</option>
                    <option>Health & Coaching</option>
                    <option>Software/SaaS</option>
                    <option>Local Service (Gym/Spa)</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-[#001341] text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <TrendingUp size={24} />}
                Audit My Lead Cost
              </button>
            </motion.div>
          )}

          {/* Step 2: Preview Results */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 text-center">
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Cost Per Lead</p>
                <h3 className="text-7xl font-black text-[#001341]">₹{cpl}</h3>
                <div className={`inline-block px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest ${status.bg} ${status.color}`}>
                   Efficiency: {status.label}
                </div>
              </div>

              <div className="bg-gray-50 p-10 rounded-[2rem] border border-dashed border-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[6px] flex items-center justify-center rounded-[2rem] z-10 transition-all">
                  <div className="text-center p-8 bg-white shadow-2xl rounded-3xl border border-gray-100 max-w-sm">
                    <Lock className="mx-auto text-blue-500 mb-4" size={40} />
                    <h4 className="text-xl font-bold text-[#001341] mb-2">Benchmarking Report Locked</h4>
                    <p className="text-gray-500 text-sm mb-6">Compare your ₹{cpl} lead cost against your top 3 competitors in the {niche} sector.</p>
                    <button 
                      onClick={() => setStep(3)}
                      className="w-full bg-[#001341] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg active:scale-95"
                    >
                      Unlock Full Comparison
                    </button>
                  </div>
                </div>
                <div className="opacity-10 pointer-events-none select-none p-10 space-y-4">
                   <div className="h-4 w-full bg-gray-400 rounded"></div>
                   <div className="h-4 w-5/6 bg-gray-400 rounded"></div>
                   <div className="h-4 w-4/6 bg-gray-400 rounded"></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Lead Form */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-[#001341] mb-2">Where should we send your report?</h2>
                <p className="text-gray-500">Get your personalized Lead Optimization Sheet and scaling benchmarks.</p>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-5">
                <input 
                  required 
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                />
                <input 
                  required 
                  placeholder="WhatsApp Number"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                />
                <input 
                  required 
                  type="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                />

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Unlock Comparison Data"}
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Final Benchmarking Analysis */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
              <div className="bg-[#001341] p-12 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150">
                  <TrendingUp size={200} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-300 uppercase tracking-widest mb-2">Efficiency Analysis</h2>
                    <h2 className="text-5xl md:text-7xl font-black italic">₹{cpl}</h2>
                    <p className="text-blue-100 mt-4 text-lg">Your cost per lead is {status.label} for the {niche} market.</p>
                  </div>
                  <div className="w-full md:w-64 space-y-4">
                     <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                        <p className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Industry Leader</p>
                        <p className="text-2xl font-bold">₹{niche === 'Real Estate' ? '95' : '45'}</p>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                        <p className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Aiclex™ Optimized Target</p>
                        <p className="text-2xl font-bold text-green-400">₹{(Number(cpl) * 0.4).toFixed(0)}</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Hook: You are overpaying */}
              {cplNum > 200 && (
                <div className="bg-red-50 border-2 border-red-100 p-10 rounded-[2.5rem] flex items-start gap-6 animate-pulse">
                   <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                      <AlertCircle size={32} />
                   </div>
                   <div>
                      <h4 className="text-2xl font-black text-red-900 leading-tight">You are overpaying for leads ⚠️</h4>
                      <p className="text-red-700 font-bold mt-2">
                        At ₹{cpl} per lead, your customer acquisition cost is likely eating into your entire profit margin. For {niche}, we typically achieve leads under ₹150 using Aiclex™ High-Intensity Funnels.
                      </p>
                   </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-[2rem] space-y-6">
                    <h3 className="text-xl font-bold text-[#001341] flex items-center gap-2">
                      <TrendingDown className="text-red-500" /> Revenue Leakage
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 font-medium font-bold">Est. Monthly Loss</span>
                        <span className="font-black text-red-500">₹{(adSpend * 0.45).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-400">Calculated based on average conversion inefficiencies found in your {niche} lead cost.</p>
                    </div>
                  </div>

                  <div className="p-8 bg-[#ff914d] rounded-[2rem] text-white space-y-6">
                    <h3 className="text-xl font-black">Reduce Lead Cost by 60%</h3>
                    <p className="text-white/90 font-bold">
                       Use our automated AI calling agents to filter out junk leads and only talk to high-intent buyers.
                    </p>
                    <a 
                      href={`https://wa.me/918449488090?text=Hi, My current lead cost is ₹${cpl} in ${niche} and I want to reduce it.`} 
                      target="_blank"
                      className="inline-block px-8 py-4 bg-[#001341] text-white rounded-xl font-black shadow-xl hover:scale-105 transition-all text-sm"
                    >
                      Audit My Funnel for Free
                    </a>
                  </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
