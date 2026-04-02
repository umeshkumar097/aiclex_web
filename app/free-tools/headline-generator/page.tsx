"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  MessageSquare, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  Target, 
  Send,
  Lock,
  ChevronRight,
  TrendingDown,
  RefreshCw,
  Video,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeadlineGenerator() {
  const [step, setStep] = useState(1); // 1: Input, 2: AI Generating, 3: Lead Form, 4: Result
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Inputs
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("Generate Leads");

  // Lead Info
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setStep(2);
    try {
      const res = await fetch("/api/ai/headline-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, goal }),
      });
      const resData = await res.json();
      if (resData.error) throw new Error(resData.error);
      setData(resData);
      setStep(3); // Go to lead form before showing full result
    } catch (err) {
      console.error(err);
      setStep(1);
    } finally {
      setLoading(false);
    }
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
          requirement: `Generated AI Headlines for ${niche} (Goal: ${goal}). Viral hooks & Ad copies requested.`,
          source: "Headline Generator Tool"
        })
      });
      setStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles size={16} fill="currentColor" /> Viral Engagement Engine
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-[#001341] mb-4">
            Headline <span className="text-[#ff914d]">Viral</span> Generator
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
             Enter your niche and let AI generate "Scroll-Stopping" headlines and Reel hooks that demand attention and drive clicks.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-pink-900/10 border border-white p-8 md:p-12 overflow-hidden relative">
          
          {/* Step 1: Input Setup */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4 sm:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Target size={16} className="text-blue-500" /> Your Business Niche
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Skin Care, Real Estate, Yoga"
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full text-xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4 sm:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Zap size={16} className="text-orange-500" /> Current Marketing Goal
                  </label>
                  <select 
                    value={goal} 
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full text-xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-orange-100 outline-none transition-all appearance-none"
                  >
                    <option>Generate High Intent Leads</option>
                    <option>Go Viral (Organic Growth)</option>
                    <option>Sell Low-Ticket Product</option>
                    <option>Build Authority/Trust</option>
                    <option>Webinar Registrations</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!niche || loading}
                className="w-full bg-[#001341] text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={24} />}
                Generate Viral Headlines
              </button>
            </motion.div>
          )}

          {/* Step 2: Generating Animation */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-8">
              <div className="h-24 w-24 border-8 border-gray-100 border-t-pink-500 rounded-full animate-spin mx-auto flex items-center justify-center">
                 <Zap className="text-pink-500" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#001341]">AI Drafting Headlines...</h3>
                <p className="text-gray-500">Injecting psychological triggers and Indian market trends.</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Lead Form */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto py-10">
              <div className="text-center mb-10">
                <div className="h-24 w-24 bg-pink-100 text-pink-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200">
                  <Lock size={40} />
                </div>
                <h2 className="text-3xl font-black text-[#001341] mb-3">10 Viral Headlines Ready</h2>
                <p className="text-gray-500 font-medium">To unlock the full list of Reel hooks and Ad copies, provide your contact details.</p>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-5">
                <input 
                  required 
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-pink-100 outline-none transition-all font-bold"
                />
                <input 
                  required 
                  placeholder="WhatsApp Number"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-pink-100 outline-none transition-all font-bold"
                />
                <input 
                  required 
                  type="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-pink-100 outline-none transition-all font-bold"
                />

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-pink-700 transition-all shadow-xl shadow-pink-200 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Unlock All Headlines"}
                  <ChevronRight size={24} />
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Output Listing */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="flex justify-between items-center pb-8 border-b border-gray-100">
                <div>
                  <h2 className="text-3xl font-black text-[#001341]">Your Viral Assets</h2>
                  <p className="text-gray-500 font-bold">Niche: {data?.niche}</p>
                </div>
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                  <RefreshCw size={16} /> New Set
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data?.headlines.map((item: any, i: number) => (
                  <div key={i} className="group relative bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-pink-500 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                       {item.type.includes("Reel") ? <Video size={100} /> : <FileText size={100} />}
                    </div>
                    <div className="space-y-4 relative z-10">
                      <div className="inline-block px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                        {item.type}
                      </div>
                      <p className="text-xl font-black text-[#001341] leading-tight">"{item.text}"</p>
                      <p className="text-xs text-gray-400 font-bold italic">💡 {item.psychology}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(item.text, i)}
                      className={`mt-6 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copiedIndex === i ? "bg-green-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-[#001341] hover:text-white"}`}
                    >
                      {copiedIndex === i ? <CheckCircle2 size={18} /> : <> <Copy size={18} /> Copy Headline </>}
                    </button>
                  </div>
                ))}
              </div>

              {/* Expert CTA */}
              <div className="mt-16 bg-[#001341] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden text-center shadow-2xl">
                 <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-150">
                    <Sparkles size={180} />
                 </div>
                 <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                    <h3 className="text-3xl md:text-5xl font-black leading-tight">Headlines are only 20% of the game.</h3>
                    <p className="text-blue-100 text-lg font-medium opacity-80 leading-relaxed">
                      To win in the Indian market, you need a high-converting **Aiclex™ Ads Funnel** that turns these clicks into cash in your bank.
                    </p>
                    <a 
                      href={`https://wa.me/918449488090?text=Hi, I generated viral headlines for my ${niche} business and I want to build a landing page for them.`} 
                      target="_blank"
                      className="inline-flex px-12 py-6 bg-[#ff914d] text-white font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-xl"
                    >
                      Scale My Brand Fast <ArrowRight className="inline ml-2" />
                    </a>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">Aiclex Managed Services - Limited Spots Only</p>
                 </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
