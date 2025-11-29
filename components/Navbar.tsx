"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Home,Video, User, Layers, Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const current = menuItems.find((i) => i.href === pathname);
    setActive(current?.name || "");
  }, [pathname]);

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "About Us", href: "/about", icon: <User size={18} /> },
    { name: "Zoom", href: "/zoom", icon: <Video size={18} /> },
    { name: "Services", href: "/services", icon: <Layers size={18} /> },
    { name: "Contact Us", href: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <>
      {/* MAIN NAVBAR: EXACTLY as you provided (no border, no extra shadow) */}
      <nav className="w-full px-6 py-4 flex items-center top-0 fixed justify-between bg-white z-50">
       <Link href="/">
          <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="AICLEX Logo" width={177} height={60} />
        </div>
       </Link>

        {/* Desktop Menu: EXACTLY as you provided */}
        <div className="hidden md:flex bg-white shadow relative">
          {menuItems.map((item) => {
            const isActive = active === item.name;
            const isHover = hovered === item.name;

            return (
              <Link
                href={item.href}
                key={item.name}
                className="relative px-6 py-4 flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hover / Active BG */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHover || isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ transformOrigin: "center" }}
                />

                {/* ICON + TEXT */}
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
            );
          })}
        </div>

        {/* GET A QUOTE BUTTON: EXACTLY as you provided */}
        <motion.button
          className="hidden md:block px-6 py-3 bg-[#001341] text-white rounded-md font-semibold relative overflow-hidden"
          onMouseEnter={() => setHovered("quote")}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Hover animation BG */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered === "quote" ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ transformOrigin: "center" }}
          />

          <span className="relative z-10">Get a quote →</span>
        </motion.button>

        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu size={26} />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setMobileOpen(false)}
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-2 mb-6 mt-2">
          <Image src="/logo.svg" alt="AICLEX Logo" width={150} height={60} />
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 outline-none"
          />
          <Search className="absolute left-3 top-2.5" size={18} />
        </div>

        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = active === item.name;

            return (
              <Link
                href={item.href}
                key={item.name}
                onClick={() => {
                  setMobileOpen(false);
                }}
                // MODIFICATION: Added 'border-b border-gray-200' here for the mobile link separator
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