"use client";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative w-full py-12 md:py-24 mt-22 md:mt-20 overflow-hidden bg-gradient-to-r from-pink-100 to-orange-100 md:bg-none md:bg-white md:dark:bg-black
      "
    >
      <motion.div
        className="absolute inset-0 md:hidden bg-gradient-to-r from-pink-100 to-orange-100"
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-10 relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center space-y-6 mt-10 md:mt-20 text-center md:text-left"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
            India's AI & Digital Agency for{" "}<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              Real Estate, EdTech
            </span>{" "}&{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Enterprises
            </span>
          </h1>

          <p className="text-base md:text-lg font-semibold text-gray-500 tracking-tight">
            Zoom Licenses · Performance Ads · Custom SaaS · AI Voice Agents
          </p>

          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-xl">
            Trusted by <span className="font-bold text-[#001341]">50+ businesses</span> across Real Estate, Education, and Enterprise sectors. We bring the tech stack that dominates your market.
          </p>

          {/* REVIEWS + CTA */}
          <div
            className="
              mt-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 
              bg-gradient-to-b from-pink-100 to-orange-100 p-6 rounded-xl md:bg-transparent
            "
          >
            <div className="flex items-center gap-3">
              <Star className="w-10 h-10 text-yellow-500" />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Google Review
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  4.5 <span className="text-yellow-500 text-xl">★★★★★</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="w-10 h-10 text-orange-500" />
              <div>
                <p className="text-lg font-semibold text-gray-800">HubSpot</p>
                <p className="text-sm text-gray-600">Certified Partner</p>
              </div>
            </div>

            <Link href="/contact">
              <button className="group relative overflow-hidden px-8 py-3 bg-[#0A1A4A] text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="relative">Hire Now</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 mt-12 md:mt-2 flex justify-center relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/hero.webp"
            alt="Hero Image"
            width={650}
            height={550}
            className="relative z-10 object-contain max-h-[350px] md:max-h-[550px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
