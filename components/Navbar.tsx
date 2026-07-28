"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Home,
  Video,
  User,
  Layers,
  Phone,
  Building2,
  Users,
  FileText,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null
  );

  // 👇 REPLACE THIS WITH YOUR WHATSAPP NUMBER
  // Format: Country code + Number (No plus sign, no dashes)
  // Example: 919876543210 for India
  const WHATSAPP_NUMBER = "918449488090"; 
  const WHATSAPP_MESSAGE = "Hi, I would like to get a quote.";

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={18} aria-hidden="true" /> },
    {
      name: "Solutions",
      href: "#",
      icon: <Layers size={18} aria-hidden="true" />,
      children: [
        { name: "All Services", href: "/services", desc: "Discover our full range of digital & AI scaling platforms.", icon: <Layers size={18} aria-hidden="true" /> },
        { name: "AI Tools Suite™", href: "/ai-tools", desc: "Experience our advanced, custom GPT-powered workflow tools.", icon: <Sparkles size={18} aria-hidden="true" className="text-orange-500" /> },
      ],
    },
    { name: "Pricing", href: "/pricing", icon: <CreditCard size={18} aria-hidden="true" /> },
    {
      name: "Company",
      href: "#",
      icon: <Building2 size={18} aria-hidden="true" />,
      children: [
        { name: "About Us", href: "/about", desc: "Learn about our vision, leadership, and startup journey.", icon: <User size={18} aria-hidden="true" /> },
        { name: "Our Team", href: "/team", desc: "Meet the tech experts building the future of AI automation.", icon: <Users size={18} aria-hidden="true" /> },
        { name: "Careers", href: "/career", desc: "Join our fast-paced, high-growth engineering studio.", icon: <Users size={18} aria-hidden="true" /> },
        {
          name: "Brochure",
          href: "/brouchure.pdf",
          desc: "Download our agency portfolio and client results.",
          icon: <FileText size={18} aria-hidden="true" />,
          isFile: true,
        },
      ],
    },
    { name: "Contact Us", href: "/contact", icon: <Phone size={18} aria-hidden="true" /> },
  ];

  useEffect(() => {
    let activeName = "";
    for (const item of menuItems) {
      if (item.href === pathname) {
        activeName = item.name;
        break;
      }
      if (item.children) {
        if (item.children.some((child) => child.href === pathname)) {
          activeName = item.name;
          break;
        }
      }
    }
    setActive(activeName);
  }, [pathname]);

  return (
    <>
      <nav className="w-full px-6 py-4 flex items-center top-0 fixed justify-between bg-white z-50 shadow-sm">
        <Link href="/">
          <div className="flex items-center gap-2 mb-6 mt-2">
            <img src="/logo.svg" alt="AICLEX™ Technologies Logo" width={150} height={60} />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex bg-white shadow relative rounded-lg">
          {menuItems.map((item) => {
            const isActive = active === item.name;
            const isHover = hovered === item.name;
            const hasChildren = !!item.children;

            return (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Main Menu Item */}
                <div className="relative">
                  {hasChildren ? (
                    <div className="relative px-4 py-4 flex items-center gap-2 cursor-pointer">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-md"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHover || isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ transformOrigin: "center" }}
                      />
                      <div className="relative flex items-center gap-2 z-10">
                        {item.icon}
                        <span
                          className={`font-semibold transition-colors ${
                            isActive ? "text-white" : "text-black"
                          }`}
                        >
                          {item.name}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`transition-colors ${
                            isActive ? "text-white" : "text-black"
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative px-4 py-4 flex items-center gap-2 cursor-pointer"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-md"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHover || isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ transformOrigin: "center" }}
                      />
                      <div className="relative flex items-center gap-2 z-10">
                        {item.icon}
                        <span
                          className={`font-semibold transition-colors ${
                            isActive ? "text-white" : "text-black"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Desktop Dropdown */}
                {hasChildren && (
                  <AnimatePresence>
                    {isHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[580px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100 z-50 p-6 grid grid-cols-12 gap-6"
                      >
                        {/* Left Side: Submenu List (7 columns) */}
                        <div className="col-span-7 flex flex-col gap-4">
                          {item.children?.map((child) => {
                            const InnerContent = (
                              <div className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-300 group/item">
                                <div className="mt-1 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#5271ff] group-hover/item:bg-orange-50 group-hover/item:border-orange-100 group-hover/item:text-orange-500 transition-colors">
                                  {child.icon}
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="font-bold text-sm text-[#001341] group-hover/item:text-[#5271ff] transition-colors leading-tight">
                                    {child.name}
                                  </span>
                                  {child.desc && (
                                    <span className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed">
                                      {child.desc}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );

                            if (child.isFile) {
                              return (
                                <a
                                  key={child.name}
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  {InnerContent}
                                </a>
                              );
                            }

                            return (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block"
                              >
                                {InnerContent}
                              </Link>
                            );
                          })}
                        </div>

                        {/* Right Side: Featured Card Banner (5 columns) */}
                        <div className="col-span-5 flex">
                          {item.name === "Solutions" ? (
                            /* Solutions Featured Card: ZONVO AI */
                            <Link
                              href="/services/ai-agent-calling"
                              className="w-full flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#001341] text-white border border-white/5 relative overflow-hidden group/card shadow-lg hover:shadow-xl transition-all"
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-50"></div>
                              
                              <div className="relative z-10">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[9px] font-black uppercase tracking-wider mb-4">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                                  Featured Product
                                </div>
                                <h4 className="font-black text-lg tracking-tight text-white mb-1 group-hover/card:text-cyan-400 transition-colors">
                                  ZONVO AI
                                </h4>
                                <p className="text-[11px] text-slate-300 font-medium leading-normal">
                                  Deploy human-like conversational voice agents in minutes.
                                </p>
                              </div>

                              <div className="relative z-10 pt-4 flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover/card:translate-x-1 transition-transform">
                                Try Live Demo →
                              </div>
                            </Link>
                          ) : (
                            /* Company Featured Card: Startup India Registered */
                            <div className="w-full flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-orange-50/50 to-amber-50/50 border border-orange-100 relative overflow-hidden group/card shadow-sm">
                              <div>
                                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-[9px] font-black uppercase tracking-wider mb-4">
                                  Accredited
                                </div>
                                <h4 className="font-black text-base tracking-tight text-[#001341] mb-1">
                                  Startup India
                                </h4>
                                <p className="text-[11px] text-slate-500 font-bold leading-normal">
                                  Aiclex Solutions Pvt. Ltd. is officially recognized by DPIIT, Government of India.
                                </p>
                              </div>

                              <div className="pt-4 border-t border-orange-100 flex items-center justify-between text-[10px] text-orange-700 font-black">
                                <span>Reg: DIPP271379</span>
                                <span className="opacity-60">Govt. Certified</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* ✅ CHANGED: Quote Button now links to WhatsApp */}
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <motion.button
            className="hidden md:block px-6 py-3 bg-[#001341] cursor-pointer text-white rounded-md font-semibold relative overflow-hidden"
            onMouseEnter={() => setHovered("quote")}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered === "quote" ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ transformOrigin: "center" }}
            />
            <span className=" relative z-10">Get a quote →</span>
          </motion.button>
        </a>

        <button 
          className="md:hidden p-2" 
          onClick={() => setMobileOpen(true)}
          aria-label="Open mobile menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={26} aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2 focus:outline-none"
          onClick={() => setMobileOpen(false)}
          aria-label="Close mobile menu"
        >
          <X size={24} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 mb-6 mt-2">
          <img src="/logo.svg" alt="AICLEX™ Logo" width={150} height={60} />
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search site"
            className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = active === item.name;
            const hasChildren = !!item.children;
            const isSubmenuOpen = mobileSubmenuOpen === item.name;

            if (hasChildren) {
              return (
                <div key={item.name} className="border-b border-gray-200 pb-2">
                  <button
                    onClick={() =>
                      setMobileSubmenuOpen(isSubmenuOpen ? null : item.name)
                    }
                    className={`w-full flex items-center justify-between gap-2 ${
                      isActive ? "text-orange-400" : "text-black"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.name}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        isSubmenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Submenu Dropdown */}
                  <AnimatePresence>
                    {isSubmenuOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-6 mt-2 flex flex-col gap-3"
                      >
                        {item.children?.map((child) => {
                          if (child.isFile) {
                            return (
                              <a
                                key={child.name}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500"
                              >
                                {child.icon}
                                {child.name}
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500"
                            >
                              {child.icon}
                              {child.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                href={item.href}
                key={item.name}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 pb-2 border-b border-gray-200 ${
                  isActive ? "text-orange-400" : "text-black"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}