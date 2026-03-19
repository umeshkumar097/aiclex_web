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
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const quickLinks = [
    { name: "Zoom", href: "/zoom" },
    { name: "Blogs", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
  ];

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 250);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="w-full bg-[#F7F8FD] text-[#1D1D1D] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* --- COLUMN 1: ADDRESS & INFO --- */}
        <div className="space-y-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Aiclex Logo"
              width={180}
              height={80}
              className="select-none cursor-pointer"
            />
          </Link>

          <p className="text-[15px] leading-relaxed text-black">
            Elevate your brand with{" "}
            <span className="font-bold">AICLEX TECHNOLOGIES!</span>
            Our comprehensive brand development strategies are designed to make
            your business stand out.
          </p>

          <div className="space-y-4 text-[15px] font-semibold">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#5271FF]" />
              +91 8449488090
            </div>

            <div className="flex gap-3">
              <Mail size={18} className="text-[#5271FF] mt-1" />
              <div className="flex flex-col leading-tight">
                <span>info@aiclex.in </span>
                <span>sales@aiclex.in</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#5271FF]" />
              Gaur City Mall, Greater Noida, 201318
            </div>
          </div>
        </div>

        {/* --- COLUMN 2: QUICK LINKS + TERMS --- */}
        <div className="flex flex-col h-full">
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-[15px] font-medium text-[#4A4A4A]">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="group flex items-center gap-2 transition-all">
                    <ChevronRight
                      size={18}
                      className="text-[#5271FF] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#5271FF]"
                    />
                    <span className="relative transition-all duration-300 group-hover:text-[#5271FF] group-hover:translate-x-1">
                      {item.name}
                      <span className="absolute left-0 -bottom-1 h-[2px] bg-[#5271FF] w-0 rounded-md transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Terms moved to bottom of this column */}
          <div className="mt-auto pt-8">
            <div className="flex flex-col gap-2">
              <Link href="/term-and-condition" className="text-[15px] font-medium text-[#4A4A4A] hover:text-[#5271FF] transition-colors">
                 Terms & Conditions
              </Link>
              <Link href="/disclaimer" className="text-[15px] font-medium text-[#4A4A4A] hover:text-[#5271FF] transition-colors">
                 Disclaimer
              </Link>
            </div>
          </div>
        </div>

        {/* --- COLUMN 3: SUBSCRIBE + REFUND --- */}
        <div className="flex flex-col h-full">
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
            <p className="text-[14px] text-[#5A5A5A] mb-4">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <form className="relative w-full max-w-sm">
              <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white border border-gray-200 text-sm rounded-lg pl-4 pr-12 py-3 outline-none focus:border-[#5271FF] focus:ring-1 focus:ring-[#5271FF] transition-all shadow-sm"
              />
              <button 
                  type="submit" 
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#5271FF] hover:bg-blue-700 text-white px-3 rounded-md transition-all flex items-center justify-center"
              >
                  <Send size={16} />
              </button>
            </form>
          </div>

          {/* Refund moved to bottom of this column */}
          <div className="mt-auto pt-8">
            <Link href="/refund-policy" className="text-[15px] font-medium text-[#4A4A4A] hover:text-[#5271FF] transition-colors">
               Refund Policy
            </Link>
          </div>
        </div>

        {/* --- COLUMN 4: FOLLOW US + PRIVACY --- */}
        <div className="flex flex-col h-full">
          <div>
            <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <Link href="https://www.instagram.com/aiclex_in?igsh=c3J6czRqZ3dmaWIy" target="_blank">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Instagram size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" />
                </div>
              </Link>
              {/* Facebook */}
              <Link href="#" target="_blank">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Facebook size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" />
                </div>
              </Link>
              {/* Linkedin */}
              <Link href="https://www.linkedin.com/company/aiclex/posts/?feedView=all" target="_blank">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Linkedin size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" />
                </div>
              </Link>
              {/* Twitter */}
              <Link href="#" target="_blank">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Twitter size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" />
                </div>
              </Link>
            </div>
          </div>

          {/* Privacy moved to bottom of this column */}
          <div className="mt-auto pt-8">
            <Link href="/privacy-policy" className="text-[15px] font-medium text-[#4A4A4A] hover:text-[#5271FF] transition-colors">
               Privacy Policy
            </Link>
          </div>
        </div>

      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="border-t border-gray-200 bg-[#001341]">
        <div className="max-w-7xl mx-auto px-6 py-6 text-[14px] font-medium text-white/80 text-center ">
             2025-26 © All rights reserved by Aiclex Technologies.
        </div>
      </div>

      {/* WHATSAPP BUTTON */}
      <Link
        href="https://wa.me/918449488090"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full bg-white shadow-xl overflow-hidden flex items-center justify-center hover:scale-110 transition-all duration-300 z-[99999]"
      >
        <Image
          src='/whatsapp.jpeg'
          alt='WhatsApp'
          width={56}
          height={56}
          className="object-cover p-2"
        />
      </Link>

      {/* BACK TO TOP BUTTON */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 h-12 w-12 cursor-pointer flex items-center justify-center rounded-full bg-[#0C0C0C] hover:bg-[#5271FF] transition-all z-[9999]"
        >
          <ArrowUp size={22} className="text-white" />
        </button>
      )}
    </footer>
  );
}