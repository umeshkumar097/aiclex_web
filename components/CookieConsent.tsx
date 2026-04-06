"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, ChevronRight, Settings, Info } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    strictly: true,
    functional: false,
    performance: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("aiclex-cookie-consent");
    if (!consent) {
      // Delay for premium feel
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = (all: boolean = false) => {
    const finalPrefs = all 
      ? { strictly: true, functional: true, performance: true, marketing: true } 
      : preferences;
    
    localStorage.setItem("aiclex-cookie-consent", JSON.stringify(finalPrefs));
    setIsVisible(false);
  };

  const handleReject = () => {
    const finalPrefs = { strictly: true, functional: false, performance: false, marketing: false };
    localStorage.setItem("aiclex-cookie-consent", JSON.stringify(finalPrefs));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "strictly") return; // Cannot toggle strictly necessary
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-md z-[9999] p-6 flex flex-col pointer-events-none"
      >
        <div className="bg-white/95 backdrop-blur-xl h-full w-full rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col pointer-events-auto overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-50 flex justify-between items-start">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-[#5271ff] rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-2xl font-bold text-[#001341] tracking-tight">Cookie Policy Intelligence</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">AICLEX™ Technologies Compliance</p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-2 text-gray-400 hover:text-[#001341] hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <p className="text-sm text-gray-500 leading-relaxed">
              This website uses cookies to provide you the best online experience. Please let us know if you agree by clicking on the "Accept" option below. If you'd like to find out more about the cookies we use and set your individual cookie preferences, please review our <Link href="/privacy-policy" className="text-[#5271ff] font-bold hover:underline">Privacy Policy</Link>.
            </p>

            {/* Toggle Sections */}
            <div className="space-y-3 pt-4">
              <CookieToggle 
                title="Strictly necessary" 
                desc="Essential for site basic functions."
                isActive={preferences.strictly}
                isLocked={true}
                onToggle={() => {}}
              />
              <CookieToggle 
                title="Functional" 
                desc="Remembers your preferences & choices."
                isActive={preferences.functional}
                onToggle={() => togglePreference("functional")}
              />
              <CookieToggle 
                title="Performance" 
                desc="Helps us understand how you use the site."
                isActive={preferences.performance}
                onToggle={() => togglePreference("performance")}
              />
              <CookieToggle 
                title="Marketing / Third Party" 
                desc="Used for targeted advertising and social media."
                isActive={preferences.marketing}
                onToggle={() => togglePreference("marketing")}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-gray-50/50 border-t border-gray-100 space-y-3">
            <button 
              onClick={() => handleSave(true)}
              className="w-full py-4 bg-[#001341] text-white font-bold rounded-2xl hover:bg-[#5271ff] transition-all shadow-lg hover:shadow-blue-200"
            >
              Accept all
            </button>
            <button 
              onClick={() => handleSave(false)}
              className="w-full py-4 bg-white text-[#001341] font-extrabold border border-gray-200 rounded-2xl hover:border-[#ff914d] transition-all"
            >
              Accept only selected
            </button>
            <button 
              onClick={handleReject}
              className="w-full py-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-red-500 transition-colors"
            >
              Reject all
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CookieToggle({ 
  title, 
  desc, 
  isActive, 
  isLocked = false, 
  onToggle 
}: { 
  title: string; 
  desc: string; 
  isActive: boolean; 
  isLocked?: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all group">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-[#001341] flex items-center gap-2">
          {title} <ChevronRight size={14} className="text-gray-300 group-hover:text-[#5271ff] transition-colors" />
        </span>
        <span className="text-[11px] text-gray-400 leading-tight">{desc}</span>
      </div>
      <button 
        onClick={onToggle}
        disabled={isLocked}
        className={`w-12 h-6 rounded-full relative transition-all ${
          isActive ? "bg-[#5271ff]" : "bg-gray-200"
        } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <motion.div 
          animate={{ x: isActive ? 24 : 4 }}
          className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );
}
