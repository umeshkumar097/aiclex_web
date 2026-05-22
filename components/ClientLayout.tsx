"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Ensure these match your actual file names
import Footer from "./Footer"; 
import CookieConsent from "./CookieConsent";
import LeadForm from "./LeadForm";
import WhatsPilotChatbot from "./WhatsPilotChatbot";
import { MessageSquare, X } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledRequirement, setPrefilledRequirement] = useState("");

  useEffect(() => {
    const handleOpenDrawer = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setPrefilledService(customEvent.detail.service || "");
        setPrefilledRequirement(customEvent.detail.requirement || "");
      } else {
        setPrefilledService("");
        setPrefilledRequirement("");
      }
      setIsOpen(true);
    };

    window.addEventListener("open-proposal-drawer", handleOpenDrawer);
    return () => {
      window.removeEventListener("open-proposal-drawer", handleOpenDrawer);
    };
  }, []);

  // Logic: If the URL starts with "/dashboard", hide the header/footer
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      <CookieConsent />
      {/* 1. Only show Navbar on public pages */}
      {!isDashboard && <Navbar />}
      
      {/* 2. Main Content Area */}
      {/* We remove min-h-screen from dashboard because it handles its own height */}
      <main className={!isDashboard ? "min-h-screen" : ""}>
        {children}
      </main>

      {/* 3. Only show Footer on public pages */}
      {!isDashboard && <Footer />}

      {/* 4. Global Floating Lead Drawer */}
      {!isDashboard && (
        <>
          {/* Floating Action Button (Proposal Drawer) */}
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-24 z-50 hidden sm:flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#ff914d] to-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border border-white/20"
            style={{ boxShadow: "0 10px 25px -5px rgba(255, 145, 77, 0.4)" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <MessageSquare size={16} className="animate-pulse" />
            <span>Free Proposal</span>
          </button>

          {/* WhatsPilot AI Support Chat Widget (Bottom-Right) */}
          <WhatsPilotChatbot />

          {/* Sticky WhatsApp Floating Launcher (Bottom-Left) */}
          <a
            href="https://wa.me/918449488090?text=Hi%20Aiclex%20team,%20I'm%20interested%20in%20scaling%20my%20business.%20Let's%20connect!"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-500 to-green-600 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 hover:shadow-emerald-500/20"
            style={{ boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)" }}
            aria-label="Contact us on WhatsApp"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25" />
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 fill-current" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.415 9.86-9.86.002-2.638-1.024-5.117-2.884-6.979C16.578 1.897 14.1 1.07 11.465 1.07c-5.44 0-9.862 4.416-9.864 9.862-.001 1.702.451 3.361 1.309 4.8l-.995 3.637 3.732-.979zm11.287-7.406c-.302-.15-.1787-.262-.777-.561-.177-.089-.307-.15-.562-.275-.255-.125-.337-.15-.462.037-.125.187-.487.612-.598.737-.112.125-.224.137-.525-.012-.302-.15-1.273-.469-2.426-1.496-.897-.8-1.502-1.787-1.678-2.087-.177-.3-.019-.462.13-.611.135-.134.302-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.6-.145-.825-1.987-.225-.562-.462-.575-.637-.575h-.525c-.175 0-.462.062-.7.325-.237.262-.912.887-.912 2.162 0 1.275.925 2.512 1.05 2.687.125.175 1.82 2.78 4.409 3.896.615.265 1.096.423 1.469.542.617.196 1.178.169 1.622.1.494-.075 1.525-.625 1.737-1.225.213-.6.213-1.125.15-1.225-.063-.1-.225-.15-.525-.3z"/>
            </svg>
          </a>

          {/* Sliding Drawer Container */}
          <div
            className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#001341]/60 backdrop-blur-sm transition-opacity duration-300"
            />

            {/* Drawer */}
            <div
              className={`absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl border-l border-gray-100 flex flex-col transition-transform duration-300 ease-in-out transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Aiclex CRM pipeline</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-[#001341] hover:bg-gray-100 rounded-full transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto">
                <LeadForm 
                  isEmbedded={false} 
                  defaultService={prefilledService}
                  defaultRequirement={prefilledRequirement}
                  key={`${isOpen}-${prefilledService}-${prefilledRequirement}`}
                  onSuccess={() => {
                    // Auto-close drawer after 3.5 seconds on successful submission
                    setTimeout(() => setIsOpen(false), 3500);
                  }} 
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}