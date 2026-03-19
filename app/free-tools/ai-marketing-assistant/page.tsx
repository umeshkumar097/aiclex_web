"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Loader2, 
  Copy, 
  Download, 
  Sparkles, 
  Globe, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Linkedin,
  ArrowRight,
  CheckCircle,
  Phone
} from "lucide-react";

const PLATFORMS = [
  { id: "Instagram", icon: <Instagram className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
  { id: "Facebook", icon: <Facebook className="w-5 h-5" />, color: "from-blue-600 to-blue-400" },
  { id: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, color: "from-blue-700 to-blue-500" },
  { id: "WhatsApp", icon: <MessageSquare className="w-5 h-5" />, color: "from-green-500 to-emerald-400" }
];

const TONES = ["Professional", "Witty", "Exciting", "Educational", "Hinglish Mix"];

export default function AiToolPage() {
  const [step, setStep] = useState(1); // 1: Input, 2: Lead Capture, 3: Result
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    platform: "Instagram",
    tone: "Professional",
    name: "",
    email: "",
    whatsapp: ""
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (!formData.topic) {
        setError("Please enter a topic first.");
        return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.whatsapp) {
        setError("Please fill in all details to see your result.");
        return;
    }
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  const downloadResult = () => {
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `aiclex-ai-result-${formData.platform.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans pt-20">
      
      {/* --- HERO / INTRO --- */}
      <section className="pt-12 pb-12 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold shadow-sm"
          >
            <Sparkles size={16} /> AI-Powered Marketing Assistant
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-[#001341] tracking-tight">
            Smart Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Generator</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            High-converting captions, posts, and marketing strategy in seconds. Tailored for the Indian market by <span className="font-bold">Aiclex</span>.
          </p>
        </div>
      </section>

      {/* --- TOOL CONTAINER --- */}
      <section className="pb-24 px-6 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden relative">
            
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
               <motion.div 
                 initial={{ width: "33%" }}
                 animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                 className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
               />
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: INPUT */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">What are we building today?</h2>
                        <p className="text-sm text-gray-500">Pick your platform and tell us your topic.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Topic */}
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-gray-700 ml-1">Topic / Business Idea</label>
                           <textarea 
                             name="topic"
                             value={formData.topic}
                             onChange={handleInputChange}
                             placeholder="E.g. Launching a new Cafe in Greater Noida with Live Music..."
                             className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 h-32 resize-none"
                           />
                        </div>

                        {/* Platform Selection */}
                        <div className="space-y-3">
                           <label className="text-sm font-bold text-gray-700 ml-1">Target Platform</label>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                             {PLATFORMS.map((p) => (
                               <button
                                 key={p.id}
                                 onClick={() => setFormData({ ...formData, platform: p.id })}
                                 className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border-2 ${
                                   formData.platform === p.id 
                                     ? "border-blue-500 bg-blue-50 text-blue-600 shadow-md" 
                                     : "border-gray-50 bg-gray-50 text-gray-400 hover:bg-gray-100"
                                 }`}
                               >
                                 <div className={`p-2 rounded-lg bg-gradient-to-br ${p.color} text-white`}>
                                   {p.icon}
                                 </div>
                                 <span className="text-xs font-bold uppercase tracking-wider">{p.id}</span>
                               </button>
                             ))}
                           </div>
                        </div>

                        {/* Tone */}
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 ml-1">Preferred Tone</label>
                          <select 
                            name="tone"
                            value={formData.tone}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 appearance-none"
                          >
                             {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                    <button
                      onClick={handleNextStep}
                      className="w-full py-4 bg-[#001341] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-900 shadow-xl transition-all group"
                    >
                      Next: Unlock AI Strategy <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: LEAD CAPTURE */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Globe size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Unlock your AI Result</h2>
                        <p className="text-sm text-gray-500">Your strategy is ready! Tell us where to send the performance tips.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Your Name</label>
                         <input 
                           name="name"
                           value={formData.name}
                           onChange={handleInputChange}
                           required
                           type="text" 
                           placeholder="Umesh Kumar"
                           className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                         />
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                            <input 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              type="email" 
                              placeholder="info@aiclex.in"
                              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">WhatsApp Number</label>
                            <input 
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              required
                              type="tel" 
                              placeholder="+91 8449488090"
                              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>
                       </div>

                       <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-2xl text-xs font-medium border border-green-100">
                          <CheckCircle size={16} /> 
                          Guaranteed NO Spam. Exclusive marketing insights only.
                       </div>

                       {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                       <button
                         disabled={loading}
                         type="submit"
                         className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-black text-xl rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                       >
                         {loading ? <Loader2 className="animate-spin" /> : <Send size={22} />}
                         {loading ? "Generating Strategy..." : "GENERATE NOW"}
                       </button>

                       <button 
                         type="button"
                         onClick={() => setStep(1)}
                         className="w-full text-center text-sm text-gray-400 font-bold hover:text-gray-600 transition-colors"
                       >
                          ← Back to edit topic
                       </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: RESULT */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
                       <div className="text-center md:text-left">
                          <h2 className="text-2xl font-bold text-gray-900">Your AI Strategy</h2>
                          <p className="text-sm text-gray-500">Perfectly crafted for <span className="font-bold text-blue-600">{formData.platform}</span></p>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={copyToClipboard} className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 font-bold text-xs" title="Copy to Clipboard">
                             <Copy size={16} /> COPY
                          </button>
                          <button onClick={downloadResult} className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 font-bold text-xs" title="Download TXT">
                             <Download size={16} /> SAVE.TXT
                          </button>
                       </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 min-h-[300px] whitespace-pre-wrap text-gray-700 leading-relaxed font-sans text-lg shadow-inner">
                        {result}
                    </div>

                    {/* CTAs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a 
                          href="https://wa.me/918449488090" 
                          target="_blank"
                          className="p-6 bg-[#001341] text-white rounded-[2rem] flex flex-col gap-3 hover:bg-blue-900 transition-all shadow-xl group"
                        >
                            <h3 className="font-black text-xl leading-tight">Book Free <br/> Consultation</h3>
                            <button className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase group-hover:gap-4 transition-all">
                               Talk with Experts <ArrowRight size={16} />
                            </button>
                        </a>
                        <a 
                          href="/contact" 
                          className="p-6 bg-gradient-to-r from-[#ff914d] to-[#ff6b6b] text-white rounded-[2rem] flex flex-col gap-3 hover:shadow-2xl hover:scale-[1.02] transition-all shadow-xl group"
                        >
                            <h3 className="font-black text-xl leading-tight">Done-For-You <br/> Services</h3>
                            <button className="flex items-center gap-2 text-white/90 font-bold text-sm uppercase group-hover:gap-4 transition-all">
                               Get Started <ArrowRight size={16} />
                            </button>
                        </a>
                    </div>
                    
                    <button 
                      onClick={() => setStep(1)}
                      className="w-full py-4 text-center font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                       + Make Another Strategy
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Branding */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-center gap-2">
                 <img src="/logo.svg" alt="Aiclex Logo" width={80} className="opacity-50" />
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">POWERED BY AICLEX AI</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
