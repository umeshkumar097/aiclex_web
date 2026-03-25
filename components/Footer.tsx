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
  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/career" },
    { name: "Services", href: "/services" },
    { name: "Latest Blogs", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "AI Agent Calling", href: "/services/ai-agent-calling" },
    { name: "Zoom Reseller", href: "/services/zoom-reseller" },
    { name: "App Development", href: "/services/application-development" },
    { name: "Brand Development", href: "/services/brand-development" },
  ];

  const solutionLinks = [
    { name: "Zoom Partner India", href: "/solutions/zoom-partner-india" },
    { name: "Zoom License Cost", href: "/solutions/zoom-license-cost-india" },
    { name: "Zoom Distributor Delhi", href: "/solutions/zoom-distributor-delhi" },
    { name: "Best Zoom Reseller", href: "/solutions/best-zoom-reseller-india" },
    { name: "Zoom Pro Reseller", href: "/solutions/zoom-pro-reseller" },
    { name: "Buy Zoom India", href: "/solutions/how-to-buy-zoom-subscription-india" },
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

        {/* --- COLUMN 2: COMPANY --- */}
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-[15px] font-medium text-[#4A4A4A]">
              {companyLinks.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="group flex items-center gap-2 transition-all">
                    <ChevronRight size={18} className="text-[#5271FF]" />
                    <span className="hover:text-[#5271FF] transition-colors">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
        </div>

        {/* --- COLUMN 3: OUR SERVICES --- */}
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-4 text-[15px] font-medium text-[#4A4A4A]">
              {serviceLinks.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="group flex items-center gap-2 transition-all">
                    <ChevronRight size={18} className="text-[#5271FF]" />
                    <span className="hover:text-[#5271FF] transition-colors">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
        </div>

        {/* --- COLUMN 4: SOLUTIONS --- */}
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3 text-[14px] font-medium text-[#4A4A4A]">
              {solutionLinks.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="group flex items-center gap-1 transition-all">
                    <ChevronRight size={16} className="text-[#5271FF]" />
                    <span className="hover:text-[#5271FF] transition-colors">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Newsletter moved under Solutions or we can keep it elsewhere */}
            <div className="mt-8 pt-4 border-t border-gray-100">
               <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <Link href="/term-and-condition" className="text-xs font-semibold text-gray-500 hover:text-[#5271FF]">Terms</Link>
                  <Link href="/privacy-policy" className="text-xs font-semibold text-gray-500 hover:text-[#5271FF]">Privacy</Link>
                  <Link href="/refund-policy" className="text-xs font-semibold text-gray-500 hover:text-[#5271FF]">Refund</Link>
                  <Link href="/disclaimer" className="text-xs font-semibold text-gray-500 hover:text-[#5271FF]">Disclaimer</Link>
               </div>
            </div>
        </div>

        {/* --- COLUMN 4: FOLLOW US + PRIVACY --- */}
        <div className="flex flex-col h-full">
          <div>
            <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <Link href="https://www.instagram.com/aiclex_in?igsh=c3J6czRqZ3dmaWIy" target="_blank" aria-label="Follow us on Instagram">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Instagram size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" aria-hidden="true" />
                </div>
              </Link>
              {/* Facebook */}
              <Link href="#" target="_blank" aria-label="Follow us on Facebook">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Facebook size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" aria-hidden="true" />
                </div>
              </Link>
              {/* Linkedin */}
              <Link href="https://www.linkedin.com/company/aiclex/posts/?feedView=all" target="_blank" aria-label="Follow us on LinkedIn">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Linkedin size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" aria-hidden="true" />
                </div>
              </Link>
              {/* Twitter */}
              <Link href="#" target="_blank" aria-label="Follow us on Twitter">
                <div className="group h-10 w-10 rounded-full bg-[#EDEDED] flex items-center justify-center transition-all duration-300 hover:bg-[#5271FF] hover:scale-110">
                  <Twitter size={20} className="text-[#1D1D1D] transition-colors group-hover:text-white" aria-hidden="true" />
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
        aria-label="Contact us on WhatsApp"
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
          aria-label="Back to top"
          className="fixed bottom-6 right-6 h-12 w-12 cursor-pointer flex items-center justify-center rounded-full bg-[#0C0C0C] hover:bg-[#5271FF] transition-all z-[9999]"
        >
          <ArrowUp size={22} className="text-white" aria-hidden="true" />
        </button>
      )}
    </footer>
  );
}