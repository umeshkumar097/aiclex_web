"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ClientsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h2 className="text-base font-bold text-[#ff914d] uppercase tracking-widest">Our Trusted Partners</h2>
            <h3 className="text-3xl md:text-5xl font-black text-[#001341] leading-tight">
              Powering Growth for <br/> <span className="text-[#5271ff]">Industry Leaders</span>
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              From top universities to leading tech companies, we've helped diverse organizations achieve their digital transformation goals with our AI and Marketing solutions.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-gray-700">50+ Active Clients</span>
                </div>
                <div className="px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                    <div className="w-2 h-2 bg-[#5271ff] rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-gray-700">98% Satisfaction Rate</span>
                </div>
            </div>
          </motion.div>

          {/* Right: Client Logo Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <motion.div 
                        key={num}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center group transition-all hover:shadow-xl hover:border-blue-100"
                    >
                        <img 
                            src={`/partners/${num}.jpg`} 
                            alt={`Partner logo ${num}`} 
                            className="max-h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100" 
                        />
                    </motion.div>
                ))}
                <div className="bg-[#001341] p-6 rounded-2xl flex items-center justify-center text-center group transition-all hover:bg-[#ff914d]">
                    <span className="text-white font-bold text-xs uppercase tracking-widest leading-tight">And <br/> Many More</span>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
