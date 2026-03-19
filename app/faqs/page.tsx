"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What services does AICLEX TECHNOLOGIES offer?",
    answer: "We offer a wide range of digital solutions including website design, digital marketing, automation, social media management, mobile application development, brand strategy, SEO, and content writing.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "The timeline for a website project depends on its complexity. A standard business website usually takes 2-4 weeks, while more complex e-commerce sites or custom applications can take 6-10 weeks.",
  },
  {
    question: "Do you provide SEO services?",
    answer: "Yes, we provide comprehensive SEO services including keyword research, on-page optimization, technical SEO, and backlink building to help your website rank higher on search engines.",
  },
  {
    question: "Can you manage our social media accounts?",
    answer: "Absolutely! We offer full social media management services, including content creation, scheduling, community engagement, and paid advertising on platforms like Meta, LinkedIn, and Instagram.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer both project-based pricing and monthly retainer models, depending on the nature of the service. We provide customized quotes after an initial consultation to understand your specific needs.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we providing ongoing maintenance and support services to ensure your digital assets remain secure, updated, and performing optimally.",
  }
];

const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 text-left flex items-center justify-between focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? "text-[#5271ff]" : "text-gray-800 group-hover:text-[#5271ff]"}`}>
          {item.question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? "bg-[#5271ff] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-[#5271ff] group-hover:text-white"}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[#5271ff] font-bold tracking-wider uppercase text-sm mb-2 block">Assistance</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-4">Frequently Asked Questions</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#5271ff] to-[#ff914d] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Everything you need to know about our services and process.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              item={faq}
              isOpen={openFAQ === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
