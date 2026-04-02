"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  Phone, 
  Target, 
  Send,
  Lock,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFunnelGenerator() {
  const [step, setStep] = useState(1); // 1: Input, 2: AI Generating, 3: Lead Form, 4: Result
  const [loading, setLoading] = useState(false);
  const [funnel, setFunnel] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Inputs
  const [niche, setNiche] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");

  // Lead Info
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setStep(2);
    try {
      const res = await fetch("/api/ai/whatsapp-funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, product, audience }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setFunnel(data);
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
          requirement: `Generated WhatsApp Funnel for ${niche} (${product}). 5-Day Script personalized for ${audience}.`,
          source: "WhatsApp Funnel Generator"
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
            className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
          >
            <Zap size={16} fill="currentColor" /> High-Conversion AI Engine
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-[#001341] mb-4">
            WhatsApp <span className="text-[#ff914d]">Funnel</span> Generator
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Stop losing leads to silence. Use AI to generate a professional 5-day WhatsApp follow-up script that converts strangers into paying clients.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/10 border border-white p-8 md:p-12 overflow-hidden relative">
          
          {/* Step 1: Input Setup */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Target size={16} className="text-blue-500" /> Your Niche
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Health Coach, Real Estate, Agency"
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full text-xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Zap size={16} className="text-orange-500" /> Main Product/Service
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5-Day Detox, Organic Luxury Flats"
                    value={product} 
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full text-xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>

                <div className="space-y-4 sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Phone size={16} className="text-green-500" /> Target Audience
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Working women aged 30-45, New Home Buyers in Mumbai"
                    value={audience} 
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full text-xl font-bold bg-gray-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!niche || !product || loading}
                className="w-full bg-[#001341] text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={24} />}
                Generate My 5-Day Funnel
              </button>
            </motion.div>
          )}

          {/* Step 2: Generating Animation */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-8">
              <div className="relative inline-block">
                <div className="h-24 w-24 border-8 border-gray-100 border-t-green-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MessageSquare className="text-green-500" size={32} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#001341]">AI Analyzing your Niche...</h3>
                <p className="text-gray-500">Generating direct-response hooks and follow-up psychological triggers.</p>
              </div>
              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                   <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2, repeat: Infinity }} className="h-full w-full bg-green-500" />
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Applying Aiclex™ Persuasion Framework</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Lead Form */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto py-10">
              <div className="text-center mb-10">
                <div className="h-20 w-20 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                  <Lock size={32} />
                </div>
                <h2 className="text-3xl font-black text-[#001341] mb-3">Your script is ready! </h2>
                <p className="text-gray-500 font-medium">To unlock the 5-day automated funnel script, please confirm where to send the documentation.</p>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    required 
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-green-700 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Unlock Full Scripts"}
                  <ChevronRight size={24} />
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Final Funnel Display */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-100">
                <div>
                   <h2 className="text-3xl font-black text-[#001341]">{funnel?.strategyName}</h2>
                   <p className="text-gray-500 font-medium">Personalized follow-up strategy for {product}</p>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm font-bold text-blue-600 h-fit hover:underline"
                >
                  <RefreshCw size={16} /> Start Over
                </button>
              </div>

              <div className="space-y-10">
                {funnel?.messages.map((msg: any, index: number) => (
                  <div key={index} className="relative pl-12 border-l-4 border-green-500/20 group">
                    <div className="absolute top-0 -left-6 h-12 w-12 bg-white border-4 border-[#f8fafc] rounded-2xl shadow-md flex items-center justify-center font-black text-[#001341] group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                      {index + 1}
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-8 space-y-4 shadow-inner">
                      <div className="flex justify-between items-start">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{msg.day}</p>
                           <h4 className="font-bold text-[#001341] text-lg">{msg.objective}</h4>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(msg.text, index)}
                          className={`p-3 rounded-xl transition-all ${copiedIndex === index ? "bg-green-600 text-white" : "bg-white text-gray-400 hover:text-[#001341] shadow-sm"}`}
                        >
                          {copiedIndex === index ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 text-gray-700 whitespace-pre-wrap font-medium">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expert CTA */}
              <div className="mt-16 bg-[#001341] rounded-[2.5rem] p-12 text-white relative overflow-hidden text-center md:text-left">
                  <div className="absolute right-0 bottom-0 p-10 opacity-10 -rotate-12 scale-150">
                    <Send size={150} />
                  </div>
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                       <div className="h-12 w-12 bg-[#ff914d] rounded-2xl flex items-center justify-center">
                          <Sparkles className="text-white" />
                       </div>
                       <h3 className="text-3xl font-black">Want to Automate this?</h3>
                       <p className="text-blue-100 font-medium">
                         Don't manually copy-paste. Let Aiclex™ build a custom AI-voice & WhatsApp automation system that closes sales 24/7.
                       </p>
                    </div>
                    <div className="flex flex-col gap-4">
                       <a 
                        href={`https://wa.me/918449488090?text=Hi, I just generated a ${niche} funnel and I want to automate my WhatsApp sales.`} 
                        className="bg-white text-[#001341] px-10 py-5 rounded-2xl font-black text-lg text-center hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                       >
                         Talk to our Experts <ArrowRight size={22} />
                       </a>
                       <p className="text-center text-[10px] uppercase font-bold text-blue-300 tracking-[0.2em]">Scale your {niche} business now</p>
                    </div>
                  </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
