"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.span
        layoutId="subtext"
        className="text-[28px] md:text-[38px] font-bold tracking-tight text-[#a80c0e]"
      >
        {text}
      </motion.span>

      {/* FIXED WIDTH BOX */}
      <motion.span
        layout
        className="relative w-[280px] md:w-[360px] overflow-hidden rounded-md 
                   border border-[#a80c0e] bg-white px-4 py-2 
                   font-sans text-[28px] md:text-[38px] font-bold tracking-tight 
                   text-[#a80c0e] shadow-sm drop-shadow-lg"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: 40, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
