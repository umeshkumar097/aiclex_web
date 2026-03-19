"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Mic, Brain, Zap, Cpu, Phone, PhoneOff, Volume2 } from "lucide-react";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";
import { motion, AnimatePresence } from "framer-motion";

// --- Voice Agent Component ---
const VoiceAgent = () => {
    const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'speaking'>('idle');
    const [script, setScript] = useState("");
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load Voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            // Try to find an Indian Female voice
            const indianFemale = voices.find(v => (v.lang.includes('IN') || v.lang.includes('hi')) && (v.name.includes('Female') || v.name.includes('Heera') || v.name.includes('Google Hindi')));
            setVoice(indianFemale || voices[0]);
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    const startCall = async () => {
        setCallState('calling');
        
        try {
            // Fetch Script from Gemini
            const res = await fetch("/api/agent-script", { method: "POST" });
            const data = await res.json();
            setScript(data.script);

            // Simulate Network Delay/Dialing
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
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher for "female" feel if generic

        utterance.onend = () => {
            setTimeout(() => setCallState('idle'), 1000);
        };

        window.speechSynthesis.speak(utterance);
    };

    const endCall = () => {
        window.speechSynthesis.cancel();
        setCallState('idle');
    };

    return (
        <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
                {callState === 'idle' ? (
                    <motion.button
                        key="call-btn"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={startCall}
                        className="group flex flex-col items-center gap-4"
                    >
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-200 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                            <Phone className="text-white w-10 h-10 fill-current" />
                        </div>
                        <span className="font-bold text-[#001341] uppercase tracking-wider text-sm">Test Live Call</span>
                    </motion.button>
                ) : (
                    <motion.div
                        key="calling-ui"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="w-full max-w-sm bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-100 flex flex-col items-center gap-6"
                    >
                        <div className="relative">
                            <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center ${callState === 'calling' ? 'border-blue-400 border-t-transparent animate-spin' : 'border-green-500'}`}>
                                <UserIcon className={`w-14 h-14 ${callState === 'calling' ? 'text-blue-400' : 'text-green-500'}`} />
                            </div>
                            {callState === 'speaking' && (
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1] }} 
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="absolute -top-2 -right-2 bg-pink-500 p-2 rounded-full text-white"
                                >
                                    <Volume2 size={16} />
                                </motion.div>
                            )}
                        </div>

                        <div className="text-center">
                            <h4 className="text-xl font-bold text-gray-900 capitalize">{callState}...</h4>
                            <p className="text-gray-500 text-sm">
                                {callState === 'calling' ? 'Wait while we connect you' : 'Agent Aiclex is Speaking'}
                            </p>
                        </div>

                        {callState === 'speaking' && (
                             <div className="w-full bg-blue-50 p-4 rounded-2xl border border-blue-100 italic text-sm text-blue-800 text-center">
                                "{script}"
                             </div>
                        )}

                        <button 
                            onClick={endCall}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
                        >
                            <PhoneOff size={20} /> End Call
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

// --- Main Page Component ---
export default function AIAgentCallingPage() {
  return (
    <div className="w-full mt-20 bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full py-24 overflow-hidden bg-[#001341] text-white">
        <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link href="/" className="inline-flex items-center text-blue-300 hover:text-[#ff914d] mb-6 transition-colors font-medium text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Revolutionizing <br/><span className="text-[#ff914d]">Customer Outreach</span> <br/>With AI Agents
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
              Automate lead qualification and customer support calls with state-of-the-art Natural Language Processing. Scale your voice operations without hiring more staff.
            </p>
            <div className="flex flex-wrap gap-4">
                <Link 
                href="/contact"
                className="inline-flex items-center px-10 py-4 rounded-full text-white font-bold shadow-lg bg-[#ff914d] hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                >
                Book a Live Demo
                </Link>
                <div className="hidden md:block">
                     <VoiceAgent />
                </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-[#5271ff] to-blue-800 rounded-[3rem] shadow-2xl flex items-center justify-center animate-pulse">
                    <Mic size={100} className="text-white" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl text-[#001341] flex items-center gap-3 animate-bounce">
                    <Brain className="text-[#5271ff]" />
                    <span className="font-bold text-sm">Powered by LLMs</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE DEMO (Always Visible on Mobile) */}
      <section className="md:hidden py-16 px-6 bg-blue-50 flex flex-col items-center italic">
           <h3 className="text-xl font-bold text-[#001341] mb-8">Try Our AI Agent Live</h3>
           <VoiceAgent />
      </section>

      {/* DETAILED CONTENT */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">Human-Like Conversations <br/>At Infinite Scale</h2>
                <div className="space-y-6">
                    <div className="flex gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#5271ff] rounded-2xl flex items-center justify-center text-white shrink-0"><Cpu size={24} /></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Advanced Voice Synthesis</h4>
                            <p className="text-sm text-gray-500 italic">Select from hundreds of life-like voices that capture the right tone and emotion for your brand.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#ff914d] rounded-2xl flex items-center justify-center text-white shrink-0"><Zap size={24} /></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Real-time Lead Scoring</h4>
                            <p className="text-sm text-gray-500 italic">AI automatically tags and scores leads based on call sentiment and responses, syncing them to your CRM.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-10 bg-blue-50 rounded-[3.5rem] border-2 border-dashed border-blue-200">
                <h3 className="text-2xl font-bold text-[#001341] mb-6">Popular Use Cases</h3>
                <ul className="space-y-4">
                    {["Lead Qualification & Filtering", "Appointment Reminders & Scheduling", "Customer Satisfaction Surveys", "Past-due Payment Reminders", "Order Tracking & Updates"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium font-sans">
                            <CheckCircle className="text-[#5271ff]" size={20} /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* CTA SECTION */}
        <div className="bg-gradient-to-r from-[#001341] to-blue-900 rounded-[3.5rem] p-12 md:p-20 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Ready to automate your <br/>first 10,000 calls?</h2>
            <p className="text-blue-200 mb-12 max-w-2xl mx-auto">Join the future of customer interaction. Our AI agents are ready to work for you 24/7 with zero overhead.</p>
            <Link href="/contact" className="px-12 py-5 bg-white text-[#001341] font-black rounded-full hover:scale-105 transition-all uppercase tracking-widest shadow-xl">Get Started Now</Link>
        </div>
      </section>

      <WorkProcess />
      <SuccessStats />
    </div>
  );
}
