// components/AiSalesAgentHeroSplit.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from 'react';

// Helper component for the Typewriter effect (RETAINED)
const TypewriterEffect: React.FC<{ words: string[]; speed?: number }> = ({ words, speed = 150 }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentFullWord = words[currentWordIndex];

        if (isDeleting) {
            timeout = setTimeout(() => {
                setCurrentText(prev => prev.substring(0, prev.length - 1));
            }, speed / 2);
        } else {
            timeout = setTimeout(() => {
                setCurrentText(prev => currentFullWord.substring(0, prev.length + 1));
            }, speed);
        }

        if (!isDeleting && currentText === currentFullWord) {
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            clearTimeout(timeout);
            timeout = setTimeout(() => {}, 500);
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, speed]);

    return (
        // FIX RETAINED: Ensures no line breaking on mobile
        <span className="inline-block relative w-max whitespace-nowrap"> 
            {currentText}
            {/* Blinking cursor */}
            <span className="inline-block w-1 h-full bg-cyan-600 align-text-bottom animate-blink absolute right-0 top-0"></span>
        </span>
    );
};


// Main Hero Component
export default function AiSalesAgentHeroSplit() {
    
    // --- ANIMATION VARIANTS ---
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 50 }, 
        show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, x: -50 }, 
        show: { 
            opacity: 1, 
            scale: 1, 
            x: 0, 
            transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } 
        },
    };

    return (
        <section className="relative w-full py-16 md:py-28 bg-gray-50 text-gray-900 overflow-hidden">
            
            {/* BACKGROUND DECORATION */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                <div className="absolute w-[400px] h-[400px] bg-blue-200 rounded-full blur-[100px] opacity-50 top-1/4 left-0 transform -translate-y-1/2"></div>
                <div className="absolute w-[300px] h-[300px] bg-cyan-100 rounded-full blur-[100px] opacity-60 bottom-0 right-1/4 transform translate-y-1/2"></div>
                <div className="absolute inset-0 opacity-40 bg-repeat bg-grid"></div>
            </div>

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:px-8 flex flex-col md:flex-row items-center justify-between"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {/* LEFT COLUMN: IMAGE (Slide In from Left) */}
                <motion.div
                    className="w-full md:w-5/12 flex justify-center mb-12 md:mb-0"
                    variants={imageVariants} 
                >
                    <Image
                        src="/ajent.jpg"
                        alt="AI Sales Agent for Business Automation, AICLEX Technologies India"
                        width={450} 
                        height={450} 
                        className="w-[350px] md:w-[450px] h-auto object-contain drop-shadow-xl" 
                    />
                </motion.div>
                
                {/* RIGHT COLUMN: CONTENT & CTA (Slide In from Right - Clean Card) */}
                <motion.div
                    className="w-full md:w-6/12 p-8 md:p-12 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg space-y-6"
                    variants={containerVariants} 
                >
                    <motion.p 
                        className="text-base font-semibold uppercase text-cyan-600"
                        variants={itemVariants}
                    >
                        
                    </motion.p>
                    
                    <motion.h1
                        className="text-3xl  sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight"
                        variants={itemVariants}
                    >
                        <span className="text-transparent   bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">AI SALES AGENT</span>
                        <br />
                        Future of <TypewriterEffect 
                                    // ✅ UPDATED WORDS
                                    words={["Sales", "Growth", "Revenue"]} 
                                    speed={120} 
                                    />
                    </motion.h1>

                    <motion.p
            className="text-base text-gray-700 font-medium pt-2"
            variants={itemVariants}
                    >
                        Introducing AI-powered sales agents that help you scale your business and automate your sales process. Save time, increase conversions, and engage with customers instantly.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={itemVariants}>
                        <Link href="/contact">
                            <motion.button 
                                className="relative px-8 cursor-pointer py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4"
                                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(255, 165, 0, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                REQUEST AI SALES PRICING <ArrowRight size={20} className="ml-2" aria-hidden="true" /> 
                            </motion.button>
                        </Link>
                    </motion.div>
                    
                </motion.div>
            </motion.div>
        </section>
    );
}