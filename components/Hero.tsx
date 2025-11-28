"use client";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";

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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start px-6 md:px-10 relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center space-y-6 mt-4 md:mt-20"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05]">
            We Help to <br />
            Grow Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-6xl md:text-7xl lg:text-8xl">
              Business
            </span>
          </h1>

          <p className="text-3xl md:text-4xl font-semibold flex items-center gap-4 text-orange-600 tracking-tight">
            <span className="w-10 md:w-14 h-2 mt-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300"></span>
            Marketing Solution
          </p>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <LayoutTextFlip
              text=""
              words={[
                "Google Ads",
                "Facebook Ads",
                "Snapchat Ads",
                "Web Development",
              ]}
            />
          </motion.div>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            At <span className="font-bold">AICLEX TECHNOLOGS</span>, we empower
            businesses with innovative brand development strategies. Our expert
            team will help you build a strong presence.
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

            <button className="group relative overflow-hidden px-8 py-3 bg-[#0A1A4A] text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative">Hire Now</span>
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 mt-2 flex justify-center relative"
          initial={{ x: 120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/hero.webp"
            alt="Hero Image"
            width={650}
            height={550}
            className="relative z-10 object-contain min-h-[450px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
