"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Phone, PhoneOff, Volume2, Mic, Play, PlayCircle, PauseCircle,
  Building2, CalendarCheck, HeadphonesIcon, CreditCard, UserPlus, Stethoscope,
  TrendingUp, Clock, CheckCircle2, ShieldCheck, Lock, UploadCloud, Cpu, Layers,
  BarChart3, MessageSquare, Zap, Target, ArrowRight, ChevronDown, ChevronUp, Bot
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// --- FAKE UI COMPONENTS ---

const VoiceWave = ({ active }: { active: boolean }) => (
  <div className="flex items-center gap-1 justify-center h-12">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        animate={active ? {
          height: ["20%", "100%", "40%", "80%", "20%"],
          backgroundColor: ["#5271ff", "#ff914d", "#5271ff"]
        } : { height: "10%" }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
          delay: i * 0.1
        }}
        className="w-1.5 bg-[#5271ff]/50 rounded-full"
      />
    ))}
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function AIAgentCallingPage() {
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'speaking'>('idle');
  const [script, setScript] = useState("");
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // --- VOICE SYNTHESIS LOGIC ---
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const indianFemale = voices.find(v => (v.lang.includes('IN') || v.lang.includes('hi')) && (v.name.includes('Female') || v.name.includes('Heera')));
      setVoice(indianFemale || voices[0]);
    };
    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const startCall = async () => {
    setCallState('calling');
    try {
      const res = await fetch("/api/agent-script", { method: "POST" });
      const data = await res.json();
      setScript(data.script);
      setTimeout(() => {
        setCallState('connected');
        speak(data.script);
      }, 2000);
    } catch (error) {
      setCallState('idle');
    }
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    setCallState('speaking');
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onend = () => setTimeout(() => setCallState('idle'), 1000);
    window.speechSynthesis.speak(utterance);
  };

  const endCall = () => {
    window.speechSynthesis.cancel();
    setCallState('idle');
  };

  const faqs = [
    { q: "Can the AI Agent speak Hindi and regional accents?", a: "Yes! Our AI agents support English, Hindi, and Hinglish with ultra-realistic Indian accents specifically trained for local markets." },
    { q: "Does it integrate directly with our CRM?", a: "Absolutely. We integrate natively with Salesforce, HubSpot, Zoho, and via Webhooks/Zapier to any custom CRM." },
    { q: "Can the AI transfer the call to a human agent?", a: "Yes. If the AI detects a complex query, high frustration, or a direct request to speak to a human, it instantly routes the call to your live team." },
    { q: "What is the cost comparison vs a human team?", a: "An AI agent costs roughly ₹8,000 to ₹15,000 per month for unlimited 24/7 calling, whereas a single human agent costs ₹25,000+ for an 8-hour shift." },
    { q: "Are outbound AI calls legal in India?", a: "Yes, provided you comply with TRAI's DND (Do Not Disturb) regulations. Our system automatically filters DND numbers before dialing." }
  ];

  return (
    <div className="w-full bg-white font-sans text-gray-800 overflow-hidden relative selection:bg-[#5271ff] selection:text-white mt-16 lg:mt-20">
      
      {/* 13. STICKY CTA BAR */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-20 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm py-3 px-6 hidden md:flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[#5271ff]">
                <Bot size={16} />
              </div>
              <span className="font-bold text-[#001341]">AICLEX Voice Agents</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-bold text-gray-500 hover:text-[#5271ff]">Try Live Demo</button>
              <Link href="/contact" className="px-6 py-2 bg-[#ff914d] text-white text-sm font-bold rounded-full shadow-lg hover:bg-orange-600 transition">
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center py-20 bg-[#001341] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[150%] h-[150%] bg-[url('https://ai.siteboard.in/Aiclex%20Umesh%20Kumar%20(1).svg')] bg-repeat opacity-5 animate-[spin_240s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5271ff] rounded-full blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff914d] rounded-full blur-[100px] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-200 text-xs font-bold tracking-widest uppercase">Next-Gen Voice AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              AI Agents That Talk Like Humans & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] to-yellow-400">Convert Like Teams.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl font-medium leading-relaxed">
              Automate lead qualification, appointment booking, customer support, and outbound calling with ultra-realistic AI voice agents that never sleep, never quit, and cost 10x less.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#ff914d] to-orange-500 text-white font-black rounded-full shadow-[0_0_40px_rgba(255,145,77,0.4)] hover:shadow-[0_0_60px_rgba(255,145,77,0.6)] hover:-translate-y-1 transition-all text-center">
                Book Live Demo
              </Link>
              <button 
                onClick={() => document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle size={20} /> Watch How It Works
              </button>
            </div>
          </motion.div>

          {/* Right: Fake Live AI Call UI */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl p-8 shadow-2xl flex flex-col">
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5271ff] to-blue-400 p-0.5">
                    <div className="w-full h-full bg-[#001341] rounded-full flex items-center justify-center">
                      <Bot className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">Sarah (AI Agent)</h3>
                    <p className="text-green-400 text-xs font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Call
                    </p>
                  </div>
                </div>
                <div className="text-blue-200 text-sm font-mono bg-white/5 px-3 py-1 rounded-full">
                  02:14
                </div>
              </div>

              {/* Scrolling Transcript */}
              <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 z-10 pointer-events-none" />
                <motion.div 
                  animate={{ y: [-100, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col gap-4 text-sm"
                >
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-blue-100 max-w-[85%]">
                    Hi Rahul, I noticed you registered for our Webinar yesterday. Are you still interested in the CRM software?
                  </div>
                  <div className="bg-[#5271ff]/20 p-3 rounded-2xl rounded-tr-sm text-white self-end max-w-[85%] ml-auto">
                    Yes, but I have some questions about pricing.
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-blue-100 max-w-[85%] border border-blue-500/30">
                    Absolutely! Our premium plan starts at just $49/mo. Would you like me to book a 10-minute demo with our product specialist for tomorrow?
                  </div>
                  <div className="flex gap-1 items-center p-3 text-white/50 text-xs">
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </motion.div>
              </div>

              {/* Wave & Controls */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <VoiceWave active={true} />
                <div className="flex justify-center gap-4 mt-6">
                  <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Mic className="text-white" size={20} />
                  </button>
                  <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                    <PhoneOff className="text-white" size={20} />
                  </button>
                </div>
              </div>

            </div>

            {/* Floating Analytics Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-12 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 hidden md:flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Intent Detected</p>
                <p className="font-bold text-[#001341]">High Likelihood to Buy</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 3. TRUST & SOCIAL PROOF */}
      <section className="py-10 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-gray-400 tracking-widest uppercase mb-8">Trusted by Fast-Growing Companies</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             {['Acme Corp', 'GlobalTech', 'InnovateInc', 'NextGen', 'CloudScale'].map((logo, i) => (
                <div key={i} className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-md" /> {logo}
                </div>
             ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-200/50">
            {[
              { label: "Calls Handled", value: "100K+" },
              { label: "Availability", value: "24/7" },
              { label: "Response Accuracy", value: "95%" },
              { label: "Cost Reduction", value: "80%" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <h4 className="text-3xl md:text-4xl font-black text-[#5271ff] mb-1">{stat.value}</h4>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. LIVE AI DEMO (INTERACTIVE) */}
      <section id="live-demo" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#001341] mb-4">Try The Magic Yourself</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Click the button below to simulate an incoming call from our AI Agent directly in your browser.</p>
        </div>

        <div className="bg-gradient-to-br from-[#f8faff] to-[#eff4ff] rounded-[3rem] p-8 md:p-16 border border-blue-100 shadow-[0_20px_60px_-15px_rgba(0,19,65,0.05)] max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {callState === 'idle' ? (
                        <motion.button
                            key="call-btn"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={startCall}
                            className="group flex flex-col items-center gap-6"
                        >
                            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(74,222,128,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(74,222,128,0.6)] transition-all duration-300 relative">
                                <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-20" />
                                <Phone className="text-white w-12 h-12 fill-current" />
                            </div>
                            <div>
                                <span className="font-black text-[#001341] text-xl block mb-1">Click to Call AI</span>
                                <span className="text-sm font-medium text-gray-500">Ensure your volume is up</span>
                            </div>
                        </motion.button>
                    ) : (
                        <motion.div
                            key="calling-ui"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center gap-8"
                        >
                            <div className="relative">
                                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center bg-gray-50 ${callState === 'calling' ? 'border-blue-400 border-t-transparent animate-spin' : 'border-[#5271ff]'}`}>
                                    <Bot className={`w-16 h-16 ${callState === 'calling' ? 'text-blue-400' : 'text-[#5271ff]'}`} />
                                </div>
                                {callState === 'speaking' && (
                                    <motion.div 
                                        animate={{ scale: [1, 1.2, 1] }} 
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="absolute -bottom-2 -right-2 bg-green-500 p-3 rounded-full text-white shadow-lg border-2 border-white"
                                    >
                                        <Volume2 size={20} />
                                    </motion.div>
                                )}
                            </div>

                            <div className="text-center">
                                <h4 className="text-2xl font-black text-[#001341] capitalize mb-1">{callState === 'calling' ? 'Connecting...' : 'Call Active'}</h4>
                                <p className="text-gray-500 font-medium">
                                    {callState === 'calling' ? 'Routing to nearest available AI node' : 'Agent is speaking'}
                                </p>
                            </div>

                            {callState === 'speaking' && (
                                 <div className="w-full relative">
                                     <VoiceWave active={true} />
                                     <div className="mt-6 w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 relative">
                                        <div className="absolute -top-3 left-6 bg-[#5271ff] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Live Transcript</div>
                                        <p className="text-gray-700 font-medium leading-relaxed italic text-center">"{script}"</p>
                                     </div>
                                 </div>
                            )}

                            <button 
                                onClick={endCall}
                                className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-black rounded-full shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-3 transition-all hover:scale-105"
                            >
                                <PhoneOff size={20} /> END CALL
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* 4. REAL USE CASES (CARDS) */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#5271ff] font-black text-sm tracking-widest uppercase mb-2 block">Built For Scale</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#001341]">Automate Any Phone Workflow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Real Estate Lead Calling", roi: "320% ROI", desc: "Instantly call property inquiries within 5 seconds. Qualify budget, timeline, and book site visits automatically." },
              { icon: CalendarCheck, title: "Appointment Booking", roi: "40% More Shows", desc: "Syncs with Calendly/Google Calendar. Calls prospects, finds open slots, and sends SMS confirmations." },
              { icon: HeadphonesIcon, title: "Customer Support", roi: "24/7 Cover", desc: "Handles level 1 & 2 support tickets via phone. Answers FAQs, checks order status, and escalates complex issues." },
              { icon: CreditCard, title: "Payment Reminders", roi: "60% Recovery", desc: "Polite, automated outbound calls to remind clients of overdue invoices. Sends payment links via WhatsApp." },
              { icon: UserPlus, title: "Recruitment Screening", roi: "10x Faster", desc: "Calls applicants to conduct initial screening interviews, ask technical questions, and rank candidates." },
              { icon: Stethoscope, title: "Healthcare Follow-ups", roi: "90% Engagement", desc: "Checks in on patients post-surgery or appointment. Reminds about medication and books follow-ups securely." }
            ].map((useCase, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-[#5271ff]/30 hover:-translate-y-2 transition-all group">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-[#5271ff] transition-colors">
                        <useCase.icon size={28} className="text-[#5271ff] group-hover:text-white transition-colors" />
                    </div>
                    <span className="bg-green-50 text-green-700 text-xs font-black px-3 py-1.5 rounded-full border border-green-100">{useCase.roi}</span>
                </div>
                <h3 className="text-xl font-black text-[#001341] mb-3">{useCase.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ROI COMPARISON TABLE */}
      <section className="py-24 bg-[#001341] text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://ai.siteboard.in/Aiclex%20Umesh%20Kumar%20(1).svg')] opacity-5" />
         <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-4">The Math is Undeniable</h2>
                <p className="text-blue-200 text-lg">Stop paying for bathroom breaks, attrition, and training.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md">
                <div className="grid grid-cols-3 bg-white/10 p-6 border-b border-white/10 text-xs md:text-sm font-black uppercase tracking-widest text-blue-200">
                    <div>Metric</div>
                    <div className="text-center">Human Team (1 Agent)</div>
                    <div className="text-center text-[#ff914d]">AICLEX AI Agent</div>
                </div>
                {[
                    { metric: "Monthly Cost", human: "₹25,000 - ₹40,000", ai: "From ₹8,000/mo" },
                    { metric: "Availability", human: "8 Hours / 5 Days", ai: "24/7/365" },
                    { metric: "Call Volume", human: "5-6 calls / hour", ai: "Unlimited Parallel Calls" },
                    { metric: "Lead Response Time", human: "15-30 minutes", ai: "Under 5 Seconds" },
                    { metric: "Training Required", human: "3-4 Weeks", ai: "Instant (Upload Script)" },
                    { metric: "Data Entry & CRM", human: "Manual & Prone to errors", ai: "100% Automated" },
                ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center text-sm md:text-base">
                        <div className="font-bold text-gray-300">{row.metric}</div>
                        <div className="text-center text-gray-400 font-medium">{row.human}</div>
                        <div className="text-center font-black text-white flex items-center justify-center gap-2">
                            <CheckCircle2 size={16} className="text-green-400 hidden sm:block" /> {row.ai}
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* 5 & 10. ANIMATED WORKFLOW & DASHBOARD SCREENSHOT */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Left: How it works timeline */}
                <div>
                    <span className="text-[#ff914d] font-black text-sm tracking-widest uppercase mb-2 block">How It Works</span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#001341] mb-12 leading-tight">From Script to Calling in <br/>Minutes, Not Months.</h2>
                    
                    <div className="space-y-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-blue-50 rounded-full" />
                        
                        {[
                            { icon: UploadCloud, title: "1. Upload Your Knowledge Base", desc: "Give the AI your PDFs, website URLs, and past call transcripts to learn your business inside-out." },
                            { icon: Cpu, title: "2. Design the Workflow", desc: "Set the logic: If customer says X, reply with Y. Set up appointment booking and CRM fields." },
                            { icon: Phone, title: "3. Choose a Voice & Dial", desc: "Select from 100+ hyper-realistic voices. Provide a list of numbers or connect to inbound lines." },
                            { icon: BarChart3, title: "4. Analyze & Optimize", desc: "Watch live transcripts, track conversion rates, and see leads automatically populate your CRM." },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 relative z-10 group">
                                <div className="w-14 h-14 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center shrink-0 group-hover:border-[#5271ff] group-hover:bg-blue-50 transition-colors shadow-sm">
                                    <step.icon size={24} className="text-[#001341] group-hover:text-[#5271ff]" />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-xl font-black text-[#001341] mb-2">{step.title}</h4>
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Dashboard Mockup */}
                <div className="relative">
                    <div className="w-full aspect-[4/3] bg-gray-50 rounded-[2rem] border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
                        {/* Mockup Header */}
                        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="mx-auto w-1/2 h-6 bg-gray-100 rounded-md" />
                        </div>
                        {/* Mockup Body */}
                        <div className="flex-1 p-6 flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                                <div className="h-6 w-32 bg-gray-200 rounded-md" />
                                <div className="h-8 w-24 bg-[#5271ff]/20 rounded-lg" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-24 bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg" />
                                    <div className="h-4 w-16 bg-gray-200 rounded" />
                                </div>
                                <div className="h-24 bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 bg-green-50 rounded-lg" />
                                    <div className="h-4 w-16 bg-gray-200 rounded" />
                                </div>
                                <div className="h-24 bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 bg-orange-50 rounded-lg" />
                                    <div className="h-4 w-16 bg-gray-200 rounded" />
                                </div>
                            </div>
                            <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                                <div className="h-4 w-full bg-gray-50 rounded" />
                                <div className="h-4 w-5/6 bg-gray-50 rounded" />
                                <div className="h-4 w-full bg-gray-50 rounded" />
                                <div className="h-4 w-4/6 bg-gray-50 rounded" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce">
                        <ShieldCheck className="text-green-500" size={24} />
                        <div>
                            <p className="font-bold text-[#001341] text-sm">CRM Auto-Sync</p>
                            <p className="text-[10px] text-gray-500">HubSpot Connected</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* 11 & 12. COMPLIANCE & FAQs */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-[#001341] mb-4">Enterprise Grade Security & Compliance</h2>
                <p className="text-gray-500">Your data, and your customers' data, is safe with us.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
                    <Lock className="mx-auto text-[#5271ff] mb-4" size={32} />
                    <h4 className="font-bold text-[#001341] mb-2">SOC2 Compliant</h4>
                    <p className="text-xs text-gray-500">All call data is encrypted at rest and in transit.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
                    <ShieldCheck className="mx-auto text-green-500 mb-4" size={32} />
                    <h4 className="font-bold text-[#001341] mb-2">DND Filtering</h4>
                    <p className="text-xs text-gray-500">Automated TRAI DND list checking before any outbound dial.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
                    <UploadCloud className="mx-auto text-[#ff914d] mb-4" size={32} />
                    <h4 className="font-bold text-[#001341] mb-2">Call Recording</h4>
                    <p className="text-xs text-gray-500">100% of calls are recorded, transcribed, and stored securely.</p>
                </div>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-[#001341]">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300">
                        <button 
                            className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-[#001341]"
                            onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                        >
                            {faq.q}
                            {activeFAQ === i ? <ChevronUp className="text-[#5271ff]" /> : <ChevronDown className="text-gray-400" />}
                        </button>
                        <AnimatePresence>
                            {activeFAQ === i && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-5 text-gray-500 font-medium text-sm leading-relaxed"
                                >
                                    {faq.a}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 14. FINAL CTA SECTION */}
      <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
              <div className="bg-gradient-to-br from-[#001341] to-[#5271ff] rounded-[3rem] p-10 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">Get Started Today</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Launch Your AI Calling Team in <br/><span className="text-[#ff914d]">Less Than 48 Hours.</span></h2>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                        <div className="flex items-center gap-2 font-medium text-blue-100"><CheckCircle2 className="text-green-400" size={18} /> Setup completely done for you</div>
                        <div className="flex items-center gap-2 font-medium text-blue-100"><CheckCircle2 className="text-green-400" size={18} /> No credit card required for demo</div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="px-10 py-5 bg-white text-[#001341] font-black text-lg rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                            Book Your Demo <ArrowRight size={20} />
                        </Link>
                        <a href="https://wa.me/918449432650" target="_blank" rel="noreferrer" className="px-10 py-5 bg-green-500 text-white font-black text-lg rounded-full shadow-xl shadow-green-500/20 hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                            <MessageSquare size={20} /> WhatsApp Us
                        </a>
                    </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
}
