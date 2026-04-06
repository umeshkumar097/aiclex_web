"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZoomLeadForm from "@/components/zoom/ZoomLeadForm";
import PricingComparison from "@/components/zoom/PricingComparison";
import { 
  Video, 
  Users, 
  Bot, 
  MessageSquare, 
  LayoutTemplate, 
  FileText, 
  Calendar, 
  Film, 
  Mail, 
  Cloud, 
  CheckCircle2, 
  Shield, 
  Phone, 
  MonitorPlay, 
  Globe, 
  Briefcase,
  Clock,
  ArrowUpCircle,
  Workflow,
  LayoutGrid,
  MessageCircle,
  AppWindow,
  CheckSquare,
  Grid,
  CalendarCheck,
  UserCheck,
  Languages,
  Monitor,
  X as CloseIcon
} from "lucide-react";

// --- Data: Content Updated According to Your Request ---
const pricingPlans = [
  {
    id: "basic",
    title: "Zoom Basic",
    price: "Free",
    description: "Best for personal use.",
    frequency: "Forever free",
    buttonText: "Contact sales team",
    isPopular: false,
    theme: "white", 
    features: [
      { text: "40 minutes per meeting", icon: <Clock size={18} /> },
      { text: "100 participants per meeting", icon: <Users size={18} /> },
      { text: "AI Companion: Available with 3 meetings/mo", icon: <Bot size={18} /> },
      { text: "Team Chat", icon: <MessageSquare size={18} /> },
      { text: "Whiteboard: 3 editable whiteboards", icon: <LayoutTemplate size={18} /> },
      { text: "Docs: Share up to 10 docs", icon: <FileText size={18} /> },
      { text: "Clips: 5 two-minute clips", icon: <Film size={18} /> },
      { text: "Mail: Connect Gmail/Outlook in Zoom", icon: <Mail size={18} /> },
      { text: "Calendar: Sync Google/Microsoft calendars", icon: <Calendar size={18} /> },
      { text: "Tasks: Manual entry", icon: <CheckSquare size={18} /> },
      { text: "Hub: Basic", icon: <Grid size={18} /> }
    ],
    tags: ["Personal", "Free"]
  },
  {
    id: "pro",
    title: "Zoom Pro",
    price: "Best Discount",
    description: "Best for personal use or small teams.",
    frequency: "Contact sales for pricing",
    buttonText: "Contact sales team",
    isPopular: true,
    theme: "brand", // Highlighted Card (Blue/Orange Brand Theme)
    features: [
      { text: "30 hours per meeting", icon: <Clock size={18} /> },
      { text: "100 participants", icon: <Users size={18} /> },
      { text: "Increase with Large Meeting", icon: <ArrowUpCircle size={18} /> },
      { text: "AI Companion: Schedule, Synthesize & Tasks", icon: <Bot size={18} /> },
      { text: "Docs: Unlimited docs", icon: <FileText size={18} /> },
      { text: "Clips: Unlimited clips & Custom avatars", icon: <Film size={18} /> },
      { text: "Mail: Zoom Mail or Gmail/Outlook", icon: <Mail size={18} /> },
      { text: "Calendar: Zoom Calendar or Sync", icon: <Calendar size={18} /> },
      { text: "Tasks: AI-first task management", icon: <CheckCircle2 size={18} /> },
      { text: "Workflow automation", icon: <Workflow size={18} /> },
      { text: "Hub: All features", icon: <LayoutGrid size={18} /> },
      { text: "Cloud storage: 10 GB", icon: <Cloud size={18} /> },
      { text: "Live Chat Support", icon: <MessageCircle size={18} /> },
      { text: "Essential Apps: Free premium apps for 1 year", icon: <AppWindow size={18} /> }
    ],
    tags: ["AI Features", "Cloud Storage"]
  },
  {
    id: "business",
    title: "Zoom Business",
    price: "Best Discount",
    description: "Best for larger teams.",
    frequency: "Contact sales for pricing",
    buttonText: "Contact sales team",
    isPopular: false,
    theme: "white",
    features: [
      { text: "Meetings: 300 participants", icon: <Users size={18} /> },
      { text: "Increase with Large Meeting", icon: <ArrowUpCircle size={18} /> },
      { text: "Scheduler: All features", icon: <CalendarCheck size={18} /> },
      { text: "Whiteboard: Unlimited whiteboards", icon: <LayoutTemplate size={18} /> },
      { text: "Extras: SSO, managed domains & more", icon: <Shield size={18} /> },
      { text: "Company branding", icon: <Briefcase size={18} /> }
    ],
    tags: ["SSO", "Branding"]
  },
  {
    id: "enterprise",
    title: "Zoom Enterprise",
    price: "Custom",
    description: "Best for even larger teams.",
    frequency: "Contact sales for pricing",
    buttonText: "Contact sales team",
    isPopular: false,
    theme: "white",
    features: [
      { text: "Meetings: 1000 participants", icon: <Users size={18} /> },
      { text: "Phone: Full-featured PBX", icon: <Phone size={18} /> },
      { text: "Webinars: 500 attendees", icon: <MonitorPlay size={18} /> },
      { text: "Rooms", icon: <Monitor size={18} /> },
      { text: "Workspace Reservation", icon: <CalendarCheck size={18} /> },
      { text: "Visitor Management", icon: <UserCheck size={18} /> },
      { text: "Translated captions", icon: <Languages size={18} /> }
    ],
    tags: ["Unlimited", "Enterprise"]
  }
];

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleOpenModal = (plan: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <section className="w-full py-20 bg-gray-50 mt-8 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Lead Capture Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setModalOpen(false)}
               className="absolute inset-0 bg-[#001341]/60 backdrop-blur-md"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-xl z-10"
            >
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#001341] transition-colors z-20"
              >
                <CloseIcon size={24} />
              </button>
              <ZoomLeadForm initialPlan={selectedPlan} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Blur Backgrounds using Brand Colors */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#5271ff]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff914d]/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-sm mb-3 block">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-6 tracking-tight">
            Choose the plan that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5271ff] to-[#ff914d]">
              fits your needs
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, transparent pricing. No hidden fees. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-start">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-2 group h-full ${
                plan.theme === "brand"
                  ? "bg-white border-[#5271ff] shadow-2xl shadow-blue-100/50 z-10 transform md:scale-105" // Highlighted Card Style
                  : "bg-white border-gray-100 shadow-xl hover:shadow-2xl hover:border-[#ff914d]/30" // Standard Card Style
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-[#5271ff] to-[#ff914d] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                   Most Popular
                </div>
              )}

              {/* Top Content */}
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${plan.theme === 'brand' ? 'text-[#5271ff]' : 'text-[#001341]'}`}>
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 min-h-[40px] font-medium leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-1">
                  <span className="text-4xl font-extrabold text-[#001341] tracking-tight">{plan.price}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide mb-8">
                  {plan.frequency}
                </p>

                {/* Main Action Button */}
                <button
                  onClick={() => handleOpenModal(plan.title)}
                  className={`w-full py-4 rounded-full font-bold cursor-pointer text-sm transition-all duration-300 active:scale-95 shadow-lg ${
                    plan.theme === "brand"
                      ? "bg-[#5271ff] text-white hover:bg-[#001341]"
                      : "bg-[#001341] text-white hover:bg-[#ff914d]"
                  }`}
                >
                  {plan.buttonText}
                </button>

               
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-100 mb-8 mt-8"></div>

              {/* Features List with Specific Icons */}
              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/li">
                      {/* Icon Container */}
                      <div className={`mt-0.5 min-w-[20px] transition-colors ${
                        plan.theme === 'brand' ? 'text-[#ff914d]' : 'text-[#5271ff]'
                      }`}>
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-600 leading-tight group-hover/li:text-[#001341] transition-colors">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tags (Pill Style) */}
              <div className="mt-auto">
                <p className="text-[10px] font-extrabold text-gray-400 mb-3 uppercase tracking-widest">Included Features</p>
                <div className="flex flex-wrap gap-2">
                  {plan.tags.map((tag, idx) => (
                    <span 
                        key={idx} 
                        className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-colors ${
                            plan.theme === 'brand' 
                            ? 'bg-[#5271ff]/5 border-[#5271ff]/20 text-[#5271ff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-500'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      
      <PricingComparison />
    </section>
  );
}