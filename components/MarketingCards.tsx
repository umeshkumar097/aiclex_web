"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const CARD_GRADIENT = "from-blue-600 to-indigo-600";

const cards = [
  {
    title: "Zoom Reseller",
    slug: "zoom-reseller",
    description:
      "Seamlessly connect with your team and clients through Zoom. Schedule meetings, webinars, and collaborate efficiently with a single platform.",
    imgSrc: "/services/zoom.jpg",
  },
  {
    title: "AI Agent Calling",
    slug: "ai-agent-calling",
    description:
      "Automate customer interactions with AI-powered calling agents. Reduce manual effort, improve response time, and scale your outreach effectively.",
    imgSrc: "/services/sales-ajent.jpg",
  },
  {
    title: "Paid Media Advertisement",
    slug: "paid-media-advertisement",
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
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
  },
};

export default function MarketingCards() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative rounded-xl cursor-pointer group p-0.5"
            >
              {/* Card Container */}
              <Link
                href={`/services/${card.slug}`}
                className="
                  relative bg-white dark:bg-gray-800 rounded-xl shadow-xl 
                  overflow-hidden transition-all duration-300 flex flex-col h-full
                  group-hover:bg-[#5271ff] block
                "
              >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden p-3">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200">
                    <img
                      src={card.imgSrc}
                      alt={card.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-all duration-500 rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x400/png?text=${card.title.split(" ")[0]}`;
                      }}
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 text-center flex flex-col flex-grow">
                  <h3
                    className="
                      text-2xl font-extrabold text-[#001341] dark:text-gray-50 mb-3
                      group-hover:text-white transition-colors duration-300
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      text-gray-600 dark:text-gray-300 font-medium text-base mb-6 flex-grow
                      group-hover:text-white transition-colors duration-300
                    "
                  >
                    {card.description}
                  </p>

                  {/* Explore Button (Final Fixed Version) */}
                  <div
                    className="
                      mt-auto px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-md inline-block
                      bg-[#5271ff] text-white              /* Default */
                      group-hover:bg-[#ff914d]             /* Card Hover */
                      group-hover:text-black
                    "
                  >
                    Explore
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Services Button */}
        <div className="text-center mt-14">
          <Link
            href="/services"
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
