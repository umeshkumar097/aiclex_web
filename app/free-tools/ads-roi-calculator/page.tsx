"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Target, 
  Zap,
  Lock,
  ChevronRight,
  PieChart,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdsRoiCalculator() {
  const [step, setStep] = useState(1); // 1: Input, 2: Preview, 3: Lead Form, 4: Full Report
  const [loading, setLoading] = useState(false);
  
  // Inputs
  const [adSpend, setAdSpend] = useState(50000);
  const [totalRevenue, setTotalRevenue] = useState(150000);
  const [leads, setLeads] = useState(250);
  const [sales, setSales] = useState(25);
  
  // Lead info
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // Calculations
  const profit = totalRevenue - adSpend;
  const roasNum = adSpend > 0 ? (totalRevenue / adSpend) : 0;
  const roas = roasNum.toFixed(2);
  const roi = adSpend > 0 ? (((totalRevenue - adSpend) / adSpend) * 100).toFixed(1) : "0";
  const cpl = leads > 0 ? (adSpend / leads).toFixed(2) : "0";
  const cac = sales > 0 ? (adSpend / sales).toFixed(2) : "0";
  const conversionRate = leads > 0 ? ((sales / leads) * 100).toFixed(1) : "0";

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
          requirement: `Ads ROI Analysis: Spend: ₹${adSpend}, Rev: ₹${totalRevenue}, Leads: ${leads}, Sales: ${sales}. ROAS: ${roas}x, Profit: ₹${profit}.`,
          source: "Ads ROI Calculator"
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
            className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
          >
            <History size={16} /> Performance Forecaster
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-[#001341] mb-4">
            Ads <span className="text-[#ff914d]">ROI</span> Calculator
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
             Are your campaigns actually profitable? Track your ROAS, Lead Cost, and Scaling Potential with our executive-grade Ads audit tool.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-900/10 border border-white p-8 md:p-12 overflow-hidden relative">
          
          {/* Step 1: Input Form */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <DollarSign size={16} className="text-purple-500" /> Total Ad Spend (₹)
                  </label>
                  <input 
                    type="number" 
                    value={adSpend} 
                    onChange={(e) => setAdSpend(Number(e.target.value))}
                    className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <TrendingUp size={16} className="text-green-500" /> Total Revenue (₹)
                  </label>
                  <input 
                    type="number" 
                    value={totalRevenue} 
                    onChange={(e) => setTotalRevenue(Number(e.target.value))}
                    className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Target size={16} className="text-blue-500" /> Total Leads
                  </label>
                  <input 
                    type="number" 
                    value={leads} 
                    onChange={(e) => setLeads(Number(e.target.value))}
                    className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-orange-500" /> Total Sales
                  </label>
                  <input 
                    type="number" 
                    value={sales} 
                    onChange={(e) => setSales(Number(e.target.value))}
                    className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-[#001341] text-white py-6 rounded-2xl font-black text-xl hover:bg-purple-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <BarChart3 size={24} />}
                Audit My Campaigns
              </button>
            </motion.div>
          )}

          {/* Step 2: Preview Results */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 text-center">
              <div className="inline-block p-4 bg-purple-50 text-purple-600 rounded-full font-black text-xs uppercase tracking-widest mb-4">
                 Analysis Result: {roasNum > 2 ? "Healthy" : "Low Efficiency"} Campaign
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100">
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Campaign ROAS</p>
                  <h3 className={`text-4xl font-black ${roasNum > 2 ? "text-green-600" : "text-red-600"}`}>{roas}x</h3>
                </div>
                <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Lead Cost (CPL)</p>
                  <h3 className="text-4xl font-black text-blue-600 truncate">₹{cpl}</h3>
                </div>
                <div className="p-8 bg-orange-50 rounded-3xl border border-orange-100">
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Profit/Loss</p>
                  <h3 className={`text-4xl font-black ${profit > 0 ? "text-green-600" : "text-red-600"}`}>₹{(profit / 1000).toFixed(1)}k</h3>
                </div>
              </div>

              <div className="bg-gray-50 p-10 rounded-[2rem] border border-dashed border-gray-200 relative">
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[4px] flex items-center justify-center rounded-[2rem] z-10">
                  <div className="text-center p-8 bg-white shadow-2xl rounded-3xl border border-gray-100 max-w-sm">
                    <Lock className="mx-auto text-purple-500 mb-4" size={40} />
                    <h4 className="text-xl font-bold text-[#001341] mb-2">Detailed ROI Strategy Locked</h4>
                    <p className="text-gray-500 text-sm mb-6">Enter your details to unlock a personalized PDF audit of your CAC, Conversion benchmarks, and Scaling roadmap.</p>
                    <button 
                      onClick={() => setStep(3)}
                      className="w-full bg-[#001341] text-white py-4 rounded-xl font-bold hover:bg-purple-900 transition shadow-lg active:scale-95"
                    >
                      Unlock Full Strategy
                    </button>
                  </div>
                </div>
                <div className="opacity-10 pointer-events-none select-none">
                  <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Lead Form */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-[#001341] mb-2">Where should we send your strategy?</h2>
                <p className="text-gray-500">Get your personalized Ads Optimization Sheet and CPL benchmark guide.</p>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-5">
                <input 
                  required 
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-purple-100 outline-none transition-all font-bold"
                />
                <input 
                  required 
                  placeholder="WhatsApp Number"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-purple-100 outline-none transition-all font-bold"
                />
                <input 
                  required 
                  type="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-purple-100 outline-none transition-all font-bold"
                />

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-purple-800 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Unlock Performance Guide"}
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Full High-End Analysis */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
              <div className="bg-[#001341] p-12 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150">
                  <BarChart3 size={200} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <p className="text-purple-300 font-bold uppercase tracking-widest text-sm mb-2">Total Net Profit</p>
                    <h2 className="text-5xl md:text-7xl font-black">₹{profit.toLocaleString('en-IN')}</h2>
                    <div className="flex items-center gap-3 mt-4 text-purple-200 font-bold">
                      <Zap size={24} className="text-[#ff914d]" /> ROAS Achievement: {roas}x
                    </div>
                  </div>
                  <div className="w-full md:w-auto space-y-4">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                      <p className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Customer Acquisition Cost</p>
                      <p className="text-2xl font-bold">₹{cac}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                      <p className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Lead to Sale %</p>
                      <p className="text-2xl font-bold">{conversionRate}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hook: Your ads are leaking budget */}
              {roasNum < 3 && (
                <div className="bg-orange-50 border-2 border-orange-100 p-8 rounded-[2rem] flex items-center gap-6">
                   <div className="h-16 w-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                      <AlertCircle size={32} />
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-orange-900">Your ad campaigns are leaking budget ⚠️</h4>
                      <p className="text-orange-700 font-bold">A ROAS of {roas}x is below industry standards for scaling. You are likely paying too much for leads or losing them in your funnel.</p>
                   </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-white border border-gray-100 shadow-xl rounded-[2rem] space-y-6">
                  <h3 className="text-xl font-bold text-[#001341] flex items-center gap-2">
                    <PieChart className="text-purple-500" /> Margin Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-500 font-medium">Marketing ROI</span>
                      <span className="font-bold text-[#001341]">{roi}%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-500 font-medium">Cost Per Lead</span>
                      <span className="font-bold text-blue-600">₹{cpl}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <span className="text-purple-600 font-bold">Scaling Potential</span>
                      <span className="font-black text-purple-600 uppercase text-xs">{Number(roas) > 3 ? "HIGH" : "MODERATE"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-purple-50 border border-purple-100 rounded-[2rem] space-y-6 flex flex-col justify-center text-center">
                   <h3 className="text-2xl font-black text-[#001341]">Expert Intervention</h3>
                   <p className="text-gray-600 font-medium italic">
                     "Your metrics suggest that with a 20% improvement in funnel optimization, your Profit could hit ₹{(profit * 1.5 / 1000).toFixed(1)}k with the same spend."
                   </p>
                   <a 
                    href={`https://wa.me/918449488090?text=Hi, My Ads ROAS is ${roas}x and I want to optimize my lead cost (₹${cpl}).`} 
                    target="_blank"
                    className="w-full py-4 bg-[#001341] text-white rounded-xl font-black mt-6 shadow-xl hover:bg-purple-900 transition-all"
                   >
                     Fix My Ads Now
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
