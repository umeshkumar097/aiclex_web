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
    { name: "About Us", href: "/about", icon: <User size={18} aria-hidden="true" /> },
    { name: "Zoom", href: "/zoom", icon: <Video size={18} aria-hidden="true" /> },
    { name: "Services", href: "/services", icon: <Layers size={18} aria-hidden="true" /> },
    {
      name: "Company",
      href: "#",
      icon: <Building2 size={18} aria-hidden="true" />,
      children: [
        { name: "Our Team", href: "/team", icon: <Users size={18} aria-hidden="true" /> },
        {
          name: "Brochure",
          href: "/brouchure.pdf",
          icon: <FileText size={18} aria-hidden="true" />,
          isFile: true,
        },
        { name: "Careers", href: "/career", icon: <Users size={18} aria-hidden="true" /> },
      ],
    },
    {
      name: "AI Tools Suite™",
      href: "/ai-tools",
      icon: <Sparkles size={18} aria-hidden="true" className="text-orange-500" />,
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
            <img src="/logo.svg" alt="AICLEX Technologies Logo" width={150} height={60} />
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full min-w-[220px] bg-white shadow-xl rounded-b-lg overflow-hidden border-t-2 border-orange-400 z-50"
                      >
                        {item.children?.map((child) => {
                          if (child.isFile) {
                            return (
                              <a
                                key={child.name}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                              >
                                {child.icon}
                                <span className="font-medium text-sm">
                                  {child.name}
                                </span>
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="flex items-center gap-3 px-6 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                            >
                              {child.icon}
                              <span className="font-medium text-sm">
                                {child.name}
                              </span>
                            </Link>
                          );
                        })}
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
          <img src="/logo.svg" alt="AICLEX Logo" width={150} height={60} />
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