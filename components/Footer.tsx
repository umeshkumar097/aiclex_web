"use client";

import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const links = [
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "FAQs", href: "/faqs" },
  ];

  const support = [
    { name: "Submit a Ticket", href: "#" },
    { name: "Visit Knowledge Base", href: "#" },
    { name: "Support System", href: "#" },
    { name: "Refund Policy", href: "#" },
    { name: "Professional Services", href: "#" },
  ];
  const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 250) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <footer className="w-full bg-[#F7F8FD] text-[#1D1D1D] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* ---------- LEFT SIDE ---------- */}
        <div className="space-y-6">
          <Image
            src="/logo.svg"
            alt="Aiclex Logo"
            width={180}
            height={80}
            className="select-none"
          />

          <p className="text-[15px]  leading-relaxed text-black">
            Elevate your brand with{" "}
            <span className="font-bold ">AICLEX TECHNOLOGIES!</span>
           Our comprehensive brand development strategies are designed to make your business stand out. From concept to execution, we ensure your brand resonates with your target audience
          </p>

          {/* CONTACT BOX */}
          <div className="space-y-4 text-[15px] font-semibold">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#5271FF]" />
              +91 8449488090
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#5271FF]" />
              info@aiclex.in
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#5271FF]" />
              Sector 37, Faridabad
            </div>
          </div>
        </div>

        {/* ---------- LINKS SECTION ---------- */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Links</h3>

          <ul className="space-y-4 text-[15px] font-medium text-[#4A4A4A]">
            {links.map((item, i) => (
              <li key={i}>
                <Link href={item.href} className="group flex items-center gap-2 transition-all">

                  {/* ICON */}
                  <ChevronRight
                    size={18}
                    className="text-[#5271FF] transition-all duration-300 group-hover:translate-x-1"
                  />

                  {/* TEXT + ANIMATION */}
                  <span
                    className="
                      relative transition-all duration-300 
                      group-hover:text-[#5271FF]
                      group-hover:translate-x-1
                    "
                  >
                    {item.name}

                    <span
                      className="
                        absolute left-0 -bottom-1 h-[2px] bg-[#5271FF]
                        w-0 rounded-md transition-all duration-300 
                        group-hover:w-full
                      "
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- SUPPORT SECTION ---------- */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Support</h3>

          <ul className="space-y-4 text-[15px] font-medium text-[#4A4A4A]">
            {support.map((item, i) => (
              <li key={i}>
                <Link href={item.href} className="group flex items-center gap-2 transition-all">

                  <ChevronRight
                    size={18}
                    className="text-[#5271FF] transition-all duration-300 group-hover:translate-x-1"
                  />

                  <span
                    className="
                      relative transition-all duration-300
                      group-hover:text-[#5271FF]
                      group-hover:translate-x-1
                    "
                  >
                    {item.name}

                    <span
                      className="
                        absolute left-0 -bottom-1 h-[2px] bg-[#5271FF]
                        w-0 rounded-md transition-all duration-300
                        group-hover:w-full
                      "
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- SOCIAL MEDIA ---------- */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Follow Us</h3>

          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
              <Link href="#" key={i}>
                <div
                  className="
                    h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center
                    transition-all duration-300 
                    hover:bg-[#5271FF] hover:scale-110
                  "
                >
                  <Icon
                    size={20}
                    className="text-[#1D1D1D] transition-all duration-300 hover:text-white"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM BAR ---------- */}
      <div className="border-t border-gray-300 py-4 text-center text-[14px] font-medium text-[#5A5A5A]">
        2025-26 © All rights reserved by Aiclex Technologies.
      </div>

      {/* ---------- BACK TO TOP BUTTON ---------- */}
      {showButton && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="
      fixed bottom-6 cursor-pointer right-6 h-12 w-12 flex items-center justify-center 
      rounded-full bg-[#0C0C0C] hover:bg-[#5271FF] transition-all
    "
  >
    <ArrowUp size={22} className="text-white" />
  </button>
)}

    </footer>
  );
}
