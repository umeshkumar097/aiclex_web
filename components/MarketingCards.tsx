"use client";

import React from "react";
// In your actual Next.js project, uncomment the line below and use <Image> instead of <img>
// import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// Defined one consistent gradient for all cards and buttons default state
const CARD_GRADIENT = "from-blue-600 to-indigo-600";

const cards = [
  {
    title: "Zoom Reseller",
    description:
      "Seamlessly connect with your team and clients through Zoom. Schedule meetings, webinars, and collaborate efficiently with a single platform.",
    imgSrc: "/services/zoom.jpg",
  },
  {
    title: "AI Agent Calling",
    description:
      "Automate customer interactions with AI-powered calling agents. Reduce manual effort, improve response time, and scale your outreach effectively.",
    imgSrc: "/services/sales-ajent.jpg",
  },
  {
    title: "Paid Media Advertisement",
    description:
      "Quickly connect with customers through data-driven PPC campaigns. Our experts identify the exact keywords and audiences for maximum ROI and efficiency.",
    imgSrc: "/services/media.jpg",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

export default function MarketingCards() {
  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-orange-600 uppercase tracking-wider">
            OUR SERVICES
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-[#001341] dark:text-white sm:text-5xl">
            Elevating Your Digital Presence
          </h2>
        </div>

        {/* Cards */}
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
              className="relative rounded-xl cursor-pointer group p-0.5"
            >
              {/* Card Inner Content */}
              <div
                className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden 
                transition-all duration-300 flex flex-col h-full
                
                /* DEFAULT: White Background */
                
                /* HOVER: Solid Blue #5271ff Background */
                group-hover:bg-[#5271ff]
                `}
              >
                
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden p-3">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200">
                    {/* Using standard <img> tag for preview compatibility */}
                    <img
                      src={card.imgSrc}
                      alt={card.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-all duration-500 rounded-xl"
                      // Fallback for preview only
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x400/png?text=${card.title.split(' ')[0]}`;
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center flex flex-col flex-grow">

                  {/* Title */}
                  <h3
                    className="text-2xl font-extrabold text-[#001341] dark:text-gray-50 mb-3 
                    group-hover:text-white transition-colors duration-300"
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-gray-600 dark:text-gray-300 font-medium text-base mb-6 flex-grow
                    group-hover:text-white transition-colors duration-300"
                  >
                    {card.description}
                  </p>

                  {/* Explore Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`
                      mt-auto px-6 py-2.5 rounded-full font-bold
                      transition-all duration-300 shadow-md
                      
                      /* DEFAULT STATE: Solid Blue (#5271ff), White Text */
                      bg-[#5271ff] text-white
                      
                      /* HOVER STATE (Button Hover): Gradient Background */
                      hover:bg-gradient-to-r hover:${CARD_GRADIENT}
                      
                      /* CARD HOVER STATE (Inherited): 
                         - Background: Orange (#ff914d) when hovering the card itself (optional if desired, 
                           but user asked for gradient on hover of button specifically)
                         - Let's keep the previous logic for Card Hover distinct if needed, 
                           or override it. Based on "explore btn on hover from-blue-600 to-indigo-600",
                           it implies button hover.
                           
                           If the user meant "When hovering the card, the button becomes orange", we keep that.
                           If the user meant "When hovering the BUTTON itself, it becomes gradient", we add that.
                           
                           I will combine:
                           1. Default: Solid Blue (#5271ff)
                           2. Card Hover: Orange (#ff914d) (from previous request)
                           3. Button Hover (Direct): Gradient (blue-indigo)
                      */
                      group-hover:bg-[#ff914d] group-hover:text-black
                      hover:!bg-gradient-to-r 
                    `}
                  >
                    Explore
                  </motion.button>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Services Button */}
        <div className="text-center mt-14">
         <Link href="/services"
            className={`
              inline-block px-8 py-3 rounded-full font-bold
              bg-gradient-to-r ${CARD_GRADIENT} text-white
              shadow-lg hover:shadow-xl hover:scale-105
              transition-all duration-300
            `}
          >
            View More Services
         
         </Link>
        </div>

      </div>
    </section>
  );
}