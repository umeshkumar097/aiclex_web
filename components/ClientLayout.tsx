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
          {/* Grouped Connect Menu (Handled inside WhatsPilotChatbot now) */}
          <WhatsPilotChatbot />

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