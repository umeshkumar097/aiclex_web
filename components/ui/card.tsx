// components/MarketingCards.tsx
"use client";

import React from "react";
import { Plus, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image"; // Use Image for icons if they are static assets

// --- TYPE SAFETY ---
interface MarketingCard {
  title: string;
  description: string;
  icon: string;
  gradient: string; // Gradient color class for border/buttons
}

// --- UPDATED DATA ---
const cards: MarketingCard[] = [
  {
    title: "Paid Media Advertisement",
    description:
      "Quickly connect with customers through data-driven PPC campaigns. Our experts identify the exact keywords and audiences for maximum ROI and efficiency.",
    icon: "/icons/paid-media.svg",
    gradient: "from-orange-500 to-pink-500", 
  },
  {
    title: "Funnel Automation & Marketing",
    description:
      "Develop a powerful funnel marketing strategy and achieve goals effortlessly. We automate lead nurture, boosting efficiency and sales velocity.",
    icon: "/icons/funnel.svg",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "Generate more quality leads",
    description:
      "Attract the right audience by targeting high-intent keywords and optimizing campaigns for better reach. Use data-driven insights to fill your pipeline faster.",
    icon: "/icons/rocket.svg",
    gradient: "from-purple-600 to-pink-400",
  },
];

// --- FRAMER MOTION VARIANTS (RETAINED) ---
const cardVariants: Variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.6 } },
};

export default function MarketingCards() {
  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
            <p className="text-base font-semibold text-orange-600 uppercase tracking-wider">OUR SERVICES</p>
            <h2 className="mt-2 text-4xl font-extrabold text-[#001341] dark:text-white sm:text-5xl">
                Elevating Your Digital Presence
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              // Added staggered delay
              style={{ transitionDelay: `${index * 0.15}s` }} 
              className="h-full relative p-0.5 rounded-xl cursor-pointer group" // Added padding for the gradient border
            >
              {/* Card Container (The element that will show the gradient border) */}
              <div 
                className={`relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl transition-all duration-300 group-hover:scale-[1.02] overflow-hidden`}
              >
                
                {/* 🌟 Gradient Border Effect */}
                <span className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none 
                                bg-gradient-to-br ${card.gradient}`} 
                />
                
                {/* INNER CONTENT */}
                <div className="relative z-10 flex flex-col items-center text-center p-8 h-full bg-white dark:bg-gray-800 rounded-xl">
                    
                    {/* ICON - Large, Centered Focus */}
                    <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-100 dark:border-gray-700 shadow-md mb-6">
                        <Image 
                            src={card.icon} 
                            alt={card.title} 
                            width={40} 
                            height={40} 
                            className="w-10 h-10 object-contain" 
                        />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-extrabold text-[#001341] dark:text-gray-50 mb-3">
                        {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-base flex-1 mb-6">
                        {card.description}
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className={`mt-auto px-6 py-2 rounded-full font-semibold text-white transition-transform duration-300 
                                    bg-gradient-to-r ${card.gradient} shadow-lg shadow-gray-500/30 dark:shadow-none`}
                    >
                        Explore <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                    </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}