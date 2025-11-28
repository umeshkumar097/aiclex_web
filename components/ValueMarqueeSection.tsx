// components/ValueMarqueeSection.tsx
"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
import { Star } from "lucide-react";

const marqueeContent = [
  "GROW YOUR BUSINESS",
  "BE SUCCESSFUL",
  "AUTOMATE SALES",
  "MAXIMIZE CONVERSION",
];

const marqueeVariants: Variants = {
  animate: {
    x: ['0%', '-50%'], // Use -50% because we doubled content
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 80, // Slower speed for smoother motion
        ease: 'linear',
      },
    },
  },
};

export default function ValueMarqueeSection(): JSX.Element {
  // Duplicate content to avoid gaps
  const doubledContent = [...marqueeContent, ...marqueeContent];

  return (
    <section className="py-8 bg-[#E6F0FF] dark:bg-gray-900 border-y border-blue-200 dark:border-gray-800 overflow-hidden">
      <motion.div
        className="w-max flex flex-row space-x-12 md:space-x-20 whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        {doubledContent.map((phrase, index) => (
          <span
            key={index}
            className="flex items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#001341] dark:text-gray-100 opacity-20 flex-shrink-0"
          >
            {phrase}
            <Star
              className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-6 md:mx-10 flex-shrink-0"
              fill="currentColor"
            />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
