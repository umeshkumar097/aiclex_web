"use client";

import { useState, useEffect } from "react";
// import Link from "next/link"; // UNCOMMENT IN NEXT.JS
// import { usePathname } from "next/navigation"; // UNCOMMENT IN NEXT.JS
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
  ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // MOCK PATHNAME FOR PREVIEW
  const pathname = "/"; 
  // const pathname = usePathname(); // UNCOMMENT IN NEXT.JS

  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "About Us", href: "/about", icon: <User size={18} /> },
    { name: "Zoom", href: "/zoom", icon: <Video size={18} /> },
    { name: "Services", href: "/services", icon: <Layers size={18} /> },
    { 
      name: "Company", 
      href: "#", 
      icon: <Building2 size={18} />,
      children: [
        { name: "Our Team", href: "/team", icon: <Users size={18} /> },
        // isDownload flag now effectively means "Open in new tab as file"
        { 
          name: "Brochure", 
          href: "/brouchure.pdf", 
          icon: <FileText size={18} />,
          isFile: true // Renamed for clarity (optional)
        },
      ]
    },
    { name: "Contact Us", href: "/contact", icon: <Phone size={18} /> },
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
      <nav className="w-full px-6 py-4 flex items-center top-0 fixed justify-between bg-white z-50">
        <a href="/">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="AICLEX Logo" width={177} height={60} />
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex bg-white shadow relative">
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
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHover || isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ transformOrigin: "center" }}
                      />
                      <div className="relative flex items-center gap-2 z-10">
                        {item.icon}
                        <span className={`font-semibold transition-colors ${isActive ? "text-white" : "text-black"}`}>
                          {item.name}
                        </span>
                        <ChevronDown size={14} className={`transition-colors ${isActive ? "text-white" : "text-black"}`} />
                      </div>
                    </div>
                  ) : (
                    <a href={item.href} className="relative px-4 py-4 flex items-center gap-2 cursor-pointer">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHover || isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ transformOrigin: "center" }}
                      />
                      <div className="relative flex items-center gap-2 z-10">
                        {item.icon}
                        <span className={`font-semibold transition-colors ${isActive ? "text-white" : "text-black"}`}>
                          {item.name}
                        </span>
                      </div>
                    </a>
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
                        {item.children?.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            // CHANGE 1: Logic updated to open in new tab without forced download
                            target={child.isFile ? "_blank" : undefined}
                            rel={child.isFile ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-3 px-6 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                          >
                            {child.icon}
                            <span className="font-medium text-sm">{child.name}</span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* Quote Button */}
        <motion.button
          className="hidden md:block px-6 py-3 bg-[#001341] text-white rounded-md font-semibold relative overflow-hidden"
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
          <img src="/logo.svg" alt="AICLEX Logo" width={150} height={60} />
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
            const hasChildren = !!item.children;
            const isSubmenuOpen = mobileSubmenuOpen === item.name;

            if (hasChildren) {
              return (
                <div key={item.name} className="border-b border-gray-200 pb-2">
                  <button
                    onClick={() => setMobileSubmenuOpen(isSubmenuOpen ? null : item.name)}
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
                      className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`}
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
                        {item.children?.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            // CHANGE 2: Same logic for mobile
                            target={child.isFile ? "_blank" : undefined}
                            rel={child.isFile ? "noopener noreferrer" : undefined}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500"
                          >
                            {child.icon}
                            {child.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                href={item.href}
                key={item.name}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 pb-2 border-b border-gray-200 ${
                  isActive ? "text-orange-400" : "text-black"
                }`}
              >
                {item.icon}
                {item.name}
              </a>
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