"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Calculator,
  Lock,
  ChevronRight,
  Loader2,
  PieChart,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WebinarProfitCalculator() {
  const [step, setStep] = useState(1); // 1: Inputs, 2: Preview, 3: Lead Form, 4: Full Report
  const [loading, setLoading] = useState(false);
  
  // Inputs
  const [attendees, setAttendees] = useState(500);
  const [conversionRate, setConversionRate] = useState(5);
  const [ticketPrice, setTicketPrice] = useState(9999);
  const [adSpend, setAdSpend] = useState(50000);
  
  // Lead info
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // Calculations
  const sales = Math.round((attendees * conversionRate) / 100);
  const grossRevenue = sales * ticketPrice;
  const netProfit = grossRevenue - adSpend;
  const roas = adSpend > 0 ? (grossRevenue / adSpend).toFixed(2) : "0.00";
  const costPerAcquisition = sales > 0 ? (adSpend / sales).toFixed(2) : "0";

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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          requirement: `Webinar Profit Calculation: Attendees: ${attendees}, Conv: ${conversionRate}%, Price: ${ticketPrice}, AdSpend: ${adSpend}. Projected Revenue: ${grossRevenue}, Profit: ${netProfit}.`,
          source: "Webinar Profit Calculator"
        })
      });
      
      if (res.ok) {
        setStep(4);
      }
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
            <Sparkles size={16} /> Free Marketing Tool
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-[#001341] mb-4">
            Webinar <span className="text-[#ff914d]">Profit</span> Calculator
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Stop guessing your numbers. Calculate exactly how much revenue your next webinar will generate before you spend a single rupee on ads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Card */}
          <div className="md:col-span-12 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white p-8 md:p-12 overflow-hidden relative">
            
            {/* Step 1: Input Form */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      <Users size={16} className="text-blue-500" /> Expected Attendees
                    </label>
                    <input 
                      type="number" 
                      value={attendees} 
                      onChange={(e) => setAttendees(Number(e.target.value))}
                      className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                    <p className="text-xs text-gray-400">Number of people actually showing up to the live session.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      <Target size={16} className="text-orange-500" /> Conversion Rate (%)
                    </label>
                    <input 
                      type="number" 
                      value={conversionRate} 
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                    <p className="text-xs text-gray-400">Industry average is 3-7%. High ticket usually converts lower.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      <DollarSign size={16} className="text-green-500" /> Product/Ticket Price (₹)
                    </label>
                    <input 
                      type="number" 
                      value={ticketPrice} 
                      onChange={(e) => setTicketPrice(Number(e.target.value))}
                      className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                    />
                    <p className="text-xs text-gray-400">The total price of your offer sold on the webinar.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      <TrendingUp size={16} className="text-purple-500" /> Total Ad Spend (₹)
                    </label>
                    <input 
                      type="number" 
                      value={adSpend} 
                      onChange={(e) => setAdSpend(Number(e.target.value))}
                      className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    />
                    <p className="text-xs text-gray-400">Total budget for Meta/Google ads to drive registrations.</p>
                  </div>
                </div>

                <button 
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-[#001341] text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Calculator size={24} />}
                  Calculate My Profits
                </button>
              </motion.div>
            )}

            {/* Step 2: Preview Results */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-[#001341] mb-2">Preliminary Results</h2>
                  <p className="text-gray-500">Based on your inputs, here is your quick snapshot.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Target Sales</p>
                    <h3 className="text-4xl font-black text-blue-600">{sales}</h3>
                  </div>
                  <div className="p-8 bg-orange-50 rounded-3xl border border-orange-100 text-center">
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Ad ROAS</p>
                    <h3 className="text-4xl font-black text-orange-600">{roas}x</h3>
                  </div>
                  <div className="p-8 bg-green-50 rounded-3xl border border-green-100 text-center">
                    <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Est. Revenue</p>
                    <h3 className="text-4xl font-black text-green-600 truncate px-2">₹{(grossRevenue / 1000).toFixed(1)}k</h3>
                  </div>
                </div>

                <div className="bg-gray-50 p-10 rounded-[2rem] border border-dashed border-gray-200 relative">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center rounded-[2rem] z-10 transition-all hover:backdrop-blur-0">
                    <div className="text-center p-8 bg-white/90 shadow-2xl rounded-3xl border border-gray-100 max-w-sm">
                      <Lock className="mx-auto text-orange-500 mb-4" size={40} />
                      <h4 className="text-xl font-bold text-[#001341] mb-2">Detailed Roadmap Locked</h4>
                      <p className="text-gray-500 text-sm mb-6">Enter your details to reveal the net profit, cost per lead targets, and scaling strategy.</p>
                      <button 
                        onClick={() => setStep(3)}
                        className="w-full bg-[#ff914d] text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg active:scale-95"
                      >
                        Unlock Full Report
                      </button>
                    </div>
                  </div>
                  <div className="opacity-10 pointer-events-none select-none">
                    <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Lead Form */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-[#001341] mb-2">Where should we send your report?</h2>
                  <p className="text-gray-500">Get your personalized webinar roadmap and ad strategy templates.</p>
                </div>

                <form onSubmit={handleSubmitLead} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="e.g. +91 91234 56789"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. rahul@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#001341] text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Unlock Detailed Report"}
                    <ArrowRight size={20} />
                  </button>
                  <p className="text-[10px] text-gray-400 text-center font-medium">
                    By clicking, you agree to receive a one-time audit report and professional marketing updates locally in India. No spam, ever.
                  </p>
                </form>
              </motion.div>
            )}

            {/* Step 4: Full High-End Report */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                <div className="bg-[#001341] p-12 rounded-[2.5rem] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150">
                    <TrendingUp size={200} />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-blue-300 font-bold uppercase tracking-widest text-sm mb-2">Net Projected Profit</p>
                      <h2 className="text-5xl md:text-7xl font-black text-white">₹{netProfit.toLocaleString('en-IN')}</h2>
                      <div className="flex items-center gap-3 mt-4 text-blue-200 font-bold">
                        <CheckCircle2 size={24} className="text-[#ff914d]" /> Exceptional Scaling Opportunity
                      </div>
                    </div>
                    <div className="w-full md:w-auto flex flex-col gap-4">
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                        <p className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Break-Even Sales</p>
                        <p className="text-2xl font-bold">{Math.ceil(adSpend / ticketPrice)} Sales</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                        <p className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Target Cost Per Lead</p>
                        <p className="text-2xl font-bold">₹{Math.round(adSpend / attendees)} / Attendee</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white border border-gray-100 shadow-xl rounded-[2rem] space-y-6">
                    <h3 className="text-xl font-bold text-[#001341] flex items-center gap-2">
                      <PieChart className="text-orange-500" /> Revenue Breakdown
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 font-medium">Gross Revenue</span>
                        <span className="font-bold text-[#001341]">₹{grossRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 font-medium">Total Ads Spend</span>
                        <span className="font-bold text-red-500">- ₹{adSpend.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <span className="text-orange-600 font-bold">Estimated Net Profit</span>
                        <span className="font-black text-orange-600">₹{netProfit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-10 bg-blue-50 border border-blue-100 rounded-[2rem] space-y-6">
                    <h3 className="text-xl font-bold text-[#001341] flex items-center gap-2">
                       <Target className="text-blue-600" /> Professional Advice
                    </h3>
                    <div className="space-y-4">
                       <p className="text-sm text-gray-600 leading-relaxed">
                         “Your current ROAS is **{roas}x**. To scale this, you should focus on increasing your 
                         attendee show-up rate with WhatsApp automations.”
                       </p>
                       <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-sm font-bold text-[#001341]">
                            <div className="h-6 w-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">1</div> 
                            Set Goal: {conversionRate + 2}% Conversion
                          </li>
                          <li className="flex items-center gap-3 text-sm font-bold text-[#001341]">
                            <div className="h-6 w-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">2</div> 
                            Add One-Click WhatsApp Reminders
                          </li>
                          <li className="flex items-center gap-3 text-sm font-bold text-[#001341]">
                            <div className="h-6 w-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">3</div> 
                            Reduce CPA to ₹{Math.round(Number(costPerAcquisition) * 0.8)}
                          </li>
                       </ul>
                    </div>
                  </div>
                </div>

                {/* Expert Intervention CTA */}
                <div className="bg-[#ff914d] p-12 rounded-[2.5rem] text-white text-center">
                   <h3 className="text-3xl font-black mb-4 underline decoration-white/40 underline-offset-8 decoration-4">Scale Your Results with Aiclex™</h3>
                   <p className="text-lg font-bold mb-10 text-white/90">
                     Want these results for your actual business? We help coaches and agencies scale from ₹1L/month to ₹10L/month with AI-driven funnels.
                   </p>
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a href={`https://wa.me/918449488090?text=Hi, I just used your Webinar Calculator and I want to scale my webinar at ${ticketPrice} price point.`} className="bg-[#001341] text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl">
                        Talk to an Expert <ChevronRight size={20} />
                      </a>
                      <button onClick={() => window.print()} className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-white/30 transition-all">
                        Download Report PDF
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
