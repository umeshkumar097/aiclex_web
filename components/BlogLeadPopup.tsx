"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogLeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    // Check session storage to prevent multiple popups
    const seen = sessionStorage.getItem("blog_popup_seen");
    if (seen) {
        setHasSeen(true);
        return;
    }

    const handleScroll = () => {
      if (hasSeen || isVisible || submitted) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const scrollPercentage = (scrollPos / scrollHeight) * 100;

      if (scrollPercentage >= 25) {
        setIsVisible(true);
        sessionStorage.setItem("blog_popup_seen", "true");
        setHasSeen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasSeen, isVisible, submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as any;

    const data = {
      name: target.name.value,
      phone: target.phone.value,
      email: target.email.value || "",
      type: "Blog Lead",
      requirement: "User interested while reading blog post",
      source_page: window.location.pathname
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setIsVisible(false), 3000); // Close after 3 seconds on success
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all z-20"
            >
              <X size={20} />
            </button>

            {/* Header image/gradient */}
            <div className="h-32 bg-gradient-to-r from-[#001341] to-[#5271ff] relative flex items-center justify-center">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                    <Send className="text-white w-8 h-8" />
                 </div>
            </div>

            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#001341] mb-2 text-sans">Thank You!</h3>
                  <p className="text-gray-500 text-sm">Our team will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#001341] mb-2 font-sans">Let's Connect!</h3>
                    <p className="text-gray-500 text-sm italic">
                      Enjoying the read? Fill the form and our team will help you scale your business.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Your Full Name" 
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm font-sans"
                    />
                    <input 
                      name="phone"
                      type="tel" 
                      placeholder="Phone Number (+91...)" 
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm font-sans"
                    />
                    <input 
                      name="email"
                      type="email" 
                      placeholder="Email Address (Optional)" 
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm font-sans"
                    />
                    
                    <button 
                      disabled={loading}
                      className="w-full bg-[#ff914d] text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-4 uppercase tracking-wider text-sm"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                      Contact Me
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
