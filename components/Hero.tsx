"use client";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative w-full min-h-screen mt-22 md:mt-20 overflow-hidden  bg-gradient-to-r from-pink-100 to-orange-100 md:bg-none md:bg-white md:dark:bg-black
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
          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
            We Build <br />
            AI-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-6xl md:text-8xl">
              Products
            </span>
          </h1>

          <p className="text-2xl md:text-3xl font-bold flex items-center gap-4 text-orange-600 tracking-tight">
            <span className="w-10 md:w-14 h-2 mt-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300"></span>
            & Scale Businesses
          </p>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <LayoutTextFlip
              text="with"
              words={[
                "AI Development",
                "SaaS Solutions",
                "Lead Intelligence",
                "Zoom Integration",
              ]}
            />
          </motion.div>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
            Aiclex Technologies is an <span className="font-bold text-[#001341]">AI-First Product Studio</span>. We leverage the same logic and intelligence layer used in our own global SaaS ventures to help your business dominate the digital landscape.
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
