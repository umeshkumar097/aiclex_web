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
  History,
  Layers,
  HelpCircle,
  MessageSquare,
  Globe,
  Rocket,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FunnelBuilderQuiz() {
  const [step, setStep] = useState(0); // 0: Start, 1-3: Questions, 4: Lead Form, 5: Result
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<any>({});
  
  // Lead info
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const QUESTIONS = [
    {
      id: "business_type",
      question: "What is your primary business model?",
      options: [
        { label: "Coaching / Digital Products", icon: <Layers /> },
        { label: "E-commerce / Physical Goods", icon: <Globe /> },
        { label: "Local Service / Agency", icon: <Users /> },
        { label: "Real Estate / High-Ticket", icon: <Target /> }
      ]
    },
    {
      id: "marketing_bottleneck",
      question: "What is your #1 growth bottleneck?",
      options: [
        { label: "Not enough leads", icon: <MessageSquare /> },
        { label: "Low conversion rate", icon: <TrendingUp /> },
        { label: "Manual follow-up stress", icon: <History /> },
        { label: "Costly ad spend", icon: <DollarSign /> }
      ]
    },
    {
      id: "monthly_goal",
      question: "What is your target monthly revenue?",
      options: [
        { label: "₹1L - ₹5L", icon: <BarChart3 /> },
        { label: "₹5L - ₹20L", icon: <TrendingUp /> },
        { label: "₹20L - ₹50L", icon: <Rocket /> },
        { label: "₹50L+", icon: <Zap /> }
      ]
    }
  ];

  const handleAnswer = (qid: string, val: string) => {
    setAnswers({ ...answers, [qid]: val });
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(4);
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
          requirement: `Funnel Quiz Analysis: Type: ${answers.business_type}, Bottleneck: ${answers.marketing_bottleneck}, Goal: ${answers.monthly_goal}.`,
          source: "Funnel Builder Quiz"
        })
      });
      setStep(5);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStrategy = () => {
    if (answers.business_type === "Coaching / Digital Products") return "Webinar → Automated Email Funnel";
    if (answers.business_type === "E-commerce / Physical Goods") return "Low-ticket Frontend → WhatsApp Cross-sell";
    if (answers.business_type === "Local Service / Agency") return "Google Ads → Landing Page → Lead Qualify AI";
    return "Facebook Ads → Pre-Vetted Application Funnel";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
          >
            <HelpCircle size={16} /> Strategy Architect
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-[#001341] mb-4">
             Funnel <span className="text-[#ff914d]">Builder</span> Quiz
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
             Stop building random pages. Answer 3 quick questions to discover the perfect marketing funnel strategy for your specific business.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white p-8 md:p-12 overflow-hidden relative min-h-[500px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            
            {/* Step 0: Start */}
            {step === 0 && (
              <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-8">
                 <div className="h-32 w-32 bg-blue-50 text-blue-600 rounded-[3rem] items-center justify-center flex mx-auto">
                    <Rocket size={60} />
                 </div>
                 <h2 className="text-3xl font-black text-[#001341]">Discover Your Path to Scale</h2>
                 <p className="text-gray-500 max-w-md mx-auto">We've analyzed 500+ successful Indian businesses. We know what works for your niche.</p>
                 <button 
                  onClick={() => setStep(1)}
                  className="px-12 py-6 bg-[#001341] text-white font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-xl"
                 >
                   Start Strategy Quiz
                 </button>
              </motion.div>
            )}

            {/* Steps 1-3: Questions */}
            {step >= 1 && step <= 3 && (
              <motion.div key={`step${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                 <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest px-2">
                    <span>Question {step}/3</span>
                    <span className="text-blue-500">{((step/3)*100).toFixed(0)}% Profiled</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-black text-[#001341] text-center">
                    {QUESTIONS[step-1].question}
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {QUESTIONS[step-1].options.map((opt, i) => (
                      <button 
                         key={i} 
                         onClick={() => handleAnswer(QUESTIONS[step-1].id, opt.label)}
                         className="p-8 bg-gray-50 border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 rounded-3xl transition-all group text-left space-y-4"
                      >
                         <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                            {opt.icon}
                         </div>
                         <h4 className="font-black text-lg text-[#001341]">{opt.label}</h4>
                      </button>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* Step 4: Lead Form */}
            {step === 4 && (
              <motion.div key="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
                 <div className="text-center mb-10">
                    <div className="h-20 w-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                       <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-[#001341] mb-2">Strategy Map Ready</h2>
                    <p className="text-gray-500">Provide your details to get the "Custom Funnel Map" and scaling advice for {answers.business_type}.</p>
                 </div>
                 <form onSubmit={handleSubmitLead} className="space-y-4">
                    <input required placeholder="Name" className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={name} onChange={e=>setName(e.target.value)} />
                    <input required placeholder="WhatsApp" className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} />
                    <input required placeholder="Email" type="email" className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={email} onChange={e=>setEmail(e.target.value)} />
                    <button type="submit" disabled={loading} className="w-full py-5 bg-[#001341] text-white rounded-2xl font-black text-xl hover:bg-blue-900 transition-all shadow-xl mt-4">
                       {loading ? <Loader2 className="animate-spin" /> : "Unlock My Strategy Map"}
                    </button>
                 </form>
              </motion.div>
            )}

            {/* Step 5: Final Result */}
            {step === 5 && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                 <div className="bg-[#001341] p-12 rounded-[3rem] text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute right-0 bottom-0 p-12 opacity-10 -rotate-12 scale-150">
                       <Zap size={150} />
                    </div>
                    <div className="relative z-10 space-y-6">
                       <p className="text-blue-300 font-black uppercase tracking-widest text-xs">Aiclex™ Recommended Path</p>
                       <h2 className="text-4xl md:text-5xl font-black">{getStrategy()}</h2>
                       <div className="flex flex-wrap gap-4 pt-4">
                          <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold border border-white/10 uppercase">{answers.business_type}</div>
                          <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold border border-white/10 uppercase">Goal: {answers.monthly_goal}</div>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border border-gray-100 rounded-3xl space-y-4 shadow-sm">
                       <h3 className="font-black text-[#001341] text-xl flex items-center gap-2">
                          <TrendingUp className="text-green-500" /> Scaling Advice
                       </h3>
                       <p className="text-gray-500 text-sm leading-relaxed">
                          "For {answers.business_type}, the key is to decouple your time from the sale. A {getStrategy()} setup allows you to handle 10x more volume without manual work."
                       </p>
                    </div>
                    <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl flex flex-col justify-between">
                       <h3 className="font-black text-blue-900 text-xl">Let's build this for you.</h3>
                       <p className="text-blue-700 font-bold mb-6 italic text-sm">Most businesses fail by building the funnel wrong. We guarantee 2x higher conversion rate.</p>
                       <a 
                        href={`https://wa.me/918449488090?text=Hi, I just finished the Aiclex Funnel Quiz. My recommended strategy is ${getStrategy()}. Let's discuss implementing this.`}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-center hover:scale-105 transition-all text-sm"
                       >
                         Talk to Growth Architect
                       </a>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
