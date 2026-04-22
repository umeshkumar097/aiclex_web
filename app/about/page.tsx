"use client";

import React, { useState } from "react";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";
import { 
  Users, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Clock,
  CheckCircle
} from "lucide-react";

// --- Types ---
type FAQItem = {
  question: string;
  answer: string;
};

// --- Data ---

const features = [
  {
    icon: <Clock className="w-8 h-8 text-white" />,
    title: "AI-First Innovation",
    description:
      "We build and scale businesses using the same advanced AI technologies and data-driven strategies that power our own high-growth products.",
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "Innovative Solutions",
    description:
      "We stay ahead of the curve by incorporating the latest technologies and trends into our designs to keep you competitive.",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Client-Centric Approach",
    description:
      "We prioritize your vision and goals, ensuring that every project is tailored specifically to your unique business needs.",
  },
];

const proofPoints = [
  {
    icon: "🎯",
    metric: "100K+",
    label: "B2B Leads Generated",
    desc: "Verified business leads delivered via DhandaLeads.com across 12+ industry categories."
  },
  {
    icon: "🏢",
    metric: "50+",
    label: "Real Estate Projects",
    desc: "Live townships and developers powered by Siteboard.in — India's enterprise property SaaS."
  },
  {
    icon: "🏆",
    metric: "Certified",
    label: "HubSpot + Zoom Authorized",
    desc: "Official Zoom Reseller in India and HubSpot Certified Partner — verified credentials."
  },
];

// Updated FAQs focusing on Ad Services
const faqs: FAQItem[] = [
  {
    question: "What services does AICLEX TECHNOLOGIES offer?",
    answer:
      "We offer a wide range of digital solutions including website designing, digital marketing, automation, social media management, application development, brand development strategies, SEO, content writing, and comprehensive ad management.",
  },
  {
    question: "Do you specialize in Google Ads (PPC) management?",
    answer:
      "Yes, we are experts in Google Ads. We create data-driven PPC campaigns designed to place your business at the top of search results. Our focus is on maximizing your ROI by capturing high-intent leads exactly when they are searching for your specific products or services.",
  },
  {
    question: "Can you help run targeted ads on Facebook and Meta platforms?",
    answer:
      "Absolutely. We specialize in Meta Ads (Facebook and Instagram). Our team designs engaging creatives and utilizes advanced audience targeting strategies (including retargeting and lookalike audiences) to help you reach your ideal customers and boost brand awareness.",
  },
  {
    question: "How does your digital marketing approach help my business grow?",
    answer:
      "Digital marketing enhances your online visibility and drives targeted traffic. By leveraging a mix of SEO, social media organic growth, and paid advertising (Google/Meta), we ensure you reach a broader audience, increase conversions, and achieve sustainable business growth.",
  },
  {
    question: "What is the process for developing a website with AICLEX?",
    answer:
      "Our website development process includes an initial consultation to understand your requirements, followed by strategic design and development phases. We ensure regular updates and feedback sessions to align with your vision. After thorough testing, we launch the website and provide ongoing support.",
  },
];

// --- Components ---

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

export default function AboutUs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="w-full bg-white mt-10 overflow-hidden">
      
      {/* ==================== 1. HERO / INTRO SECTION ==================== */}
      <section className="relative w-full py-16 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-block">
              <span className="text-[#ff914d] font-bold tracking-wider uppercase text-sm mb-2 block">About Us</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#001341] leading-tight">
                We help you
              </h2>
              <p className="text-lg text-gray-500 font-medium mt-2">
                Most prominent side is our devoted features
              </p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#001341]">
              We have digital experiences. With extensive knowledge and expertise, we design for growth.
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              At <strong className="text-gray-900">AICLEX TECHNOLOGIES</strong>, we bring deep industry knowledge to every project we undertake. Our team is dedicated to designing exceptional digital experiences that not only meet but exceed your expectations. We combine innovation, creativity, and technical proficiency to deliver solutions that drive engagement and achieve your business goals.
            </p>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
             <img 
               src="/assets/about/hero.png" 
               alt="Aiclex Team" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             {/* Overlay Gradient (Clean, no video button) */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#001341]/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* ==================== 2. PROOF POINTS SECTION ==================== */}
      <section className="w-full py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image/Graphic */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-8 border-gray-50 bg-gray-100 flex items-center justify-center">
               <img 
                 src="/assets/about/expertise.png" 
                 alt="Digital Expertise" 
                 className="w-full h-auto object-cover"
               />
            </div>

            {/* Right: Concrete Proof Points */}
            <div>
              <span className="text-[#5271ff] font-bold tracking-wider uppercase text-sm mb-2 block">Our Track Record</span>
              <h2 className="text-3xl font-extrabold text-[#001341] mb-8">
                Proven Results, <br/> <span className="text-[#ff914d]">Not Just Claims</span>
              </h2>

              <div className="space-y-6">
                {proofPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-5 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                    <div className="text-4xl flex-shrink-0">{point.icon}</div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-black text-[#001341]">{point.metric}</span>
                        <span className="text-sm font-bold text-[#ff914d] uppercase tracking-wider">{point.label}</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 3. WHY CHOOSE US (FEATURES) ==================== */}
      <section className="w-full py-20 bg-[#F0F2FB] relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#5271ff]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff914d]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001341] mb-4">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff914d] to-[#5271ff] mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We combine years of experience with a passion for innovation to deliver results that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5271ff] to-[#3a5ccc] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#001341] mb-4 group-hover:text-[#5271ff] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WorkProcess />
      <SuccessStats />  

      {/* ==================== 4. FAQ / COMMON QUESTIONS ==================== */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001341] mb-4">Common Questions</h2>
            <p className="text-gray-500">Everything you need to know about our process, ads management, and services.</p>
          </div>

          <div className="space-y-3">
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
      </section>

    </div>
  );
}