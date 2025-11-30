// components/ProcessSection.tsx
"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
import { Phone, BookOpen, Heart, UserCheck } from "lucide-react";

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  ctaText: string;
  ctaLink: string;
  iconBg: string;
  iconColor: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Contact us first",
    description:
      "Contact AICLEX TECHNOLOGIES today to discover how our expert team can help your business achieve unparalleled growth and success.",
    icon: Phone,
    ctaText: "CONTACT US >",
    ctaLink: "/contact",
    iconBg: "bg-[#001341]",
    iconColor: "text-white",
  },
  {
    id: 2,
    title: "Consult with us",
    description:
      "Unlock your business's potential with expert guidance from AICLEX TECHNOLOGIES. Our consultation services are designed to provide you with tailored strategies.",
    icon: UserCheck,
    ctaText: "APPOINTMENT >",
    ctaLink: "/appointment",
    iconBg: "bg-gradient-to-br from-purple-400 to-blue-400",
    iconColor: "text-white",
  },
  {
    id: 3,
    title: "Send Your Requirements",
    description:
      "Send us your detailed requirements, and our expert team will get back to you with a customized plan.",
    icon: BookOpen,
    ctaText: "ORDER NOW >",
    ctaLink: "/order",
    iconBg: "bg-gradient-to-br from-purple-400 to-blue-400",
    iconColor: "text-white",
  },
  {
    id: 4,
    title: "Make Payment",
    description:
      "Securely make your payment to AICLEX TECHNOLOGIES to get started with our exceptional services.",
    icon: Heart,
    ctaText: "PAYMENT >",
    ctaLink: "/payment",
    iconBg: "bg-[#001341]",
    iconColor: "text-white",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-center text-4xl font-extrabold text-[#001341] dark:text-white mb-16">
          Most prominent side is our devoted features
        </h2>

        <motion.div
          className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((step) => (
            <motion.div
              key={step.id}
              variants={stepVariants}
              className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-transform duration-500 group cursor-pointer"
            >
              {/* Number */}
              <div className="absolute -top-5 -left-5 text-7xl font-extrabold text-gray-200 dark:text-gray-700 pointer-events-none">
                {step.id}
              </div>

              {/* Icon */}
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-xl ${step.iconBg} ${step.iconColor} shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}
              >
                <step.icon size={36} />
              </div>

              <h3 className="mt-6 text-xl md:text-2xl font-extrabold text-[#001341] dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                {step.description}
              </p>

              <a
                href={step.ctaLink}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center group-hover:translate-x-1 duration-300"
              >
                {step.ctaText}
                <span className="ml-1">→</span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
