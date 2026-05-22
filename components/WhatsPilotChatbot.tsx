"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2, CheckCircle2, Sparkles, User, Phone, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  type?: "text" | "choices" | "form" | "success";
}

export default function WhatsPilotChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showChoices, setShowChoices] = useState(true);
  const [activeChoices, setActiveChoices] = useState<string[]>([]);
  
  // Lead form states inside chat
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    requirement: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage = {
    id: "welcome",
    sender: "bot" as const,
    text: "👋 Hey there! I'm your Aiclex Digital Consultant. How can we help scale your business traffic and automation today?",
    timestamp: new Date(),
    type: "text" as const
  };

  const initialChoices = [
    "WhatsPilot WhatsApp SaaS 🤖",
    "Zoom Reseller Licenses 📹",
    "Paid Media & Google/FB Ads 📈",
    "Talk to Human Expert 👤"
  ];

  // Initialize messages
  useEffect(() => {
    setMessages([initialBotMessage]);
    setActiveChoices(initialChoices);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showForm, showChoices, formSuccess]);

  const addMessage = (sender: "bot" | "user", text: string, type: "text" | "choices" | "form" | "success" = "text") => {
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender,
      text,
      timestamp: new Date(),
      type
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleChoiceClick = (choice: string) => {
    // Add user response message
    addMessage("user", choice);
    setShowChoices(false);

    // Simulate typing delay
    setTimeout(() => {
      if (choice.includes("WhatsPilot")) {
        addMessage(
          "bot",
          "🤖 WhatsPilot is our premium B2B WhatsApp automation platform. Starting at just ₹1,499/mo, you can build smart chat flows, send massive scheduled broadcast campaigns, and setup instant lead alerts with ZERO conversation charges!\n\nWould you like to connect with a consultant for a live sandbox demo?"
        );
        setActiveChoices(["Request Live WhatsPilot Demo 🚀", "View Pricing Page 💳", "Main Menu ↩️"]);
        setShowChoices(true);
      } else if (choice.includes("Zoom")) {
        addMessage(
          "bot",
          "📹 Aiclex is an official Zoom Reseller Partner in India. We deploy compliant business accounts with local billing:\n\n• Zoom Pro Basic: ₹11,200/yr + GST\n• Zoom Business: ₹18,500/yr + GST\n\n⚠️ Note: Official partner licenses are annual-billing only (monthly not available). Would you like to get a formal tax invoice or custom volume quote?"
        );
        setActiveChoices(["Request Zoom Quote 📄", "Main Menu ↩️"]);
        setShowChoices(true);
      } else if (choice.includes("Paid Media") || choice.includes("Ads")) {
        addMessage(
          "bot",
          "📈 Our certified Google & Meta Media Buyers build custom, high-converting pipelines. Our Growth Tier is ₹15,000/mo management fee, while our Elite Scale Tier is ₹35,000/mo management fee (which includes a customcoded fast landing page!). Ready to scale your inbound leads?"
        );
        setActiveChoices(["Request Ads Strategy Consult 📊", "Main Menu ↩️"]);
        setShowChoices(true);
      } else if (choice.includes("Talk to Human") || choice.includes("Demo") || choice.includes("Quote") || choice.includes("Strategy")) {
        // Set up requirement context based on what they clicked
        let detectedRequirement = "Requesting expert consultation.";
        if (choice.includes("WhatsPilot")) detectedRequirement = "Interested in WhatsPilot Live Demo & Setup.";
        if (choice.includes("Zoom")) detectedRequirement = "Interested in purchasing official Zoom Reseller Licenses.";
        if (choice.includes("Ads")) detectedRequirement = "Interested in Paid Ads & Google/Meta management.";

        setFormData(prev => ({ ...prev, requirement: detectedRequirement }));
        
        addMessage(
          "bot",
          "👤 Perfect! Let's connect you directly to Umesh or our senior solutions architect. Please share your contact details below, and we will ring you in less than 2 hours."
        );
        setShowForm(true);
      } else if (choice.includes("View Pricing")) {
        addMessage("bot", "Redirecting you to our standard plans page...");
        window.location.href = "/pricing";
      } else if (choice.includes("Main Menu")) {
        addMessage("bot", "Sure! How else can we help your business grow today?");
        setActiveChoices(initialChoices);
        setShowChoices(true);
      }
    }, 800);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) {
      setFormError("Name and WhatsApp number are required.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const payload = {
        name: formData.name,
        whatsapp: formData.whatsapp,
        requirement: formData.requirement || "Chatbot General Consult Request",
        email: "",
        source: "WhatsPilot Chatbot Widget",
        city: "Interactive Chat",
        service: "Consulting AI Widget",
        source_page: window.location.href,
        utm_source: sessionStorage.getItem("utm_source") || "chatbot",
        utm_medium: sessionStorage.getItem("utm_medium") || "organic",
        utm_campaign: sessionStorage.getItem("utm_campaign") || "direct"
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormSuccess(true);
        setShowForm(false);
        addMessage(
          "bot",
          `🎉 Thank you ${formData.name}! Your consultation request has been registered in our CRM database. One of our specialists will call you on ${formData.whatsapp} within the next 2 hours.`,
          "success"
        );
      } else {
        setFormError(data.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setFormError("A network error occurred. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {unread && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white border border-gray-100 shadow-xl rounded-2xl p-3 mb-3 text-xs font-black text-[#001341] max-w-[200px] text-center relative whitespace-nowrap select-none pointer-events-none"
            >
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100" />
              <span>Questions? Chat with AI ⚡</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setUnread(false);
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20 ${
            isOpen 
              ? "bg-[#001341] rotate-90" 
              : "bg-gradient-to-tr from-[#5271ff] to-[#ff914d] hover:shadow-[#5271ff]/30 hover:shadow-2xl"
          }`}
          aria-label="Toggle chat helper"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} className="animate-pulse" />}
          
          {/* Notification dot */}
          {unread && !isOpen && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-[90%] sm:w-[380px] h-[500px] bg-white/95 backdrop-blur-md rounded-3xl border border-gray-100 shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ boxShadow: "0 20px 50px -12px rgba(0, 19, 65, 0.15)" }}
          >
            {/* Window Header */}
            <div className="bg-[#001341] p-4 text-white flex items-center justify-between border-b border-white/10 relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5271ff] to-[#ff914d] flex items-center justify-center font-black text-white text-sm shadow-md">
                    WP
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#001341] rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm flex items-center gap-1.5">
                    <span>WhatsPilot Consultant</span>
                    <Sparkles size={12} className="text-[#ff914d]" />
                  </h4>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Active Support Agent</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed font-semibold ${
                      msg.sender === "user"
                        ? "bg-[#5271ff] text-white rounded-tr-none shadow-md"
                        : msg.type === "success"
                        ? "bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-tl-none shadow-sm"
                        : "bg-white border border-gray-100 text-[#001341] rounded-tl-none shadow-sm"
                    } whitespace-pre-line`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Inline Lead Form */}
              {showForm && !formSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-100 p-4 rounded-2xl shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Fast Callback Form</span>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setShowChoices(true);
                      }}
                      className="text-xs text-rose-500 font-extrabold hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                  {formError && (
                    <div className="p-2 text-[10px] bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-lg">
                      {formError}
                    </div>
                  )}
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Your Name</label>
                      <div className="relative">
                        <User size={12} className="absolute left-2.5 top-2.5 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Umesh"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full text-xs pl-8 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#5271ff] focus:bg-white transition-all font-semibold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">WhatsApp / Phone</label>
                      <div className="relative">
                        <Phone size={12} className="absolute left-2.5 top-2.5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 84494 88090"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full text-xs pl-8 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#5271ff] focus:bg-white transition-all font-semibold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Attribution Goal</label>
                      <div className="relative">
                        <Briefcase size={12} className="absolute left-2.5 top-2.5 text-gray-400" />
                        <input
                          type="text"
                          readOnly
                          value={formData.requirement}
                          className="w-full text-[10px] pl-8 pr-3 py-2 bg-gray-50 text-gray-500 border border-gray-100 rounded-lg outline-none font-extrabold capitalize"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-2 bg-[#ff914d] text-white hover:bg-orange-600 font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow disabled:opacity-50 cursor-pointer"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>Routing Lead...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Callback</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Quick Choice Buttons */}
              {showChoices && activeChoices.length > 0 && !showForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 pt-2"
                >
                  {activeChoices.map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => handleChoiceClick(choice)}
                      className="w-full text-left px-4 py-2.5 bg-white hover:bg-[#001341]/5 text-[#5271ff] hover:text-[#001341] font-bold text-xs rounded-xl border border-gray-100 hover:border-[#5271ff]/30 shadow-sm transition-all duration-200 flex items-center justify-between group cursor-pointer"
                    >
                      <span>{choice}</span>
                      <Send size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Footer Brand Label */}
            <div className="p-3 bg-white border-t border-gray-50 text-center flex items-center justify-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <span>Powered by</span>
              <span className="text-[#5271ff]">AICLEX™ Studio</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
