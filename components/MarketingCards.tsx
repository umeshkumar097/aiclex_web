// components/MarketingCards.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface MarketingCard {
  title: string;
  description: string;
  imgSrc: string; // Image from public folder
  gradient: string;
}

const cards: MarketingCard[] = [
  {
    title: "Paid Media Advertisement",
    description:
      "Quickly connect with customers through data-driven PPC campaigns. Our experts identify the exact keywords and audiences for maximum ROI and efficiency.",
    imgSrc: "/media.webp",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    title: "Funnel Automation & Marketing",
    description:
      "Develop a powerful funnel marketing strategy and achieve goals effortlessly. We automate lead nurture, boosting efficiency and sales velocity.",
    imgSrc: "/leads.webp",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    title: "Generate more quality leads",
    description:
      "Attract the right audience by targeting high-intent keywords and optimizing campaigns for better reach. Use data-driven insights to fill your pipeline faster.",
    imgSrc: "/marketing.webp",
    gradient: "from-orange-500 to-pink-500",
  },
];

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
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

        {/* Cards Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="h-full relative p-0.5 rounded-xl cursor-pointer group"
            >
              {/* Card */}
              <div className={`relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl transition-all duration-300 group-hover:scale-[1.02] overflow-hidden`}>
                
                {/* Gradient Border Effect */}
                <span
                  className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${card.gradient}`}
                />

                {/* Inner Content */}
                <div className="relative z-10 flex flex-col items-center text-center p-6 h-full bg-white dark:bg-gray-800 rounded-xl">
                  
                  {/* Image with bigger circle */}
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-r ${card.gradient} shadow-md mb-6 overflow-hidden relative`}>
                    <Image
                      src={card.imgSrc}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-extrabold text-[#001341] dark:text-gray-50 mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 font-semibold text-base flex-1 mb-6">
                    {card.description}
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`mt-auto px-6 py-2 rounded-full font-semibold text-white transition-transform duration-300 bg-gradient-to-r ${card.gradient} shadow-lg shadow-gray-500/30 dark:shadow-none`}
                  >
                    Explore
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
