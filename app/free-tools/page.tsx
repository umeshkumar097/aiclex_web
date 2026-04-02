"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  MessageSquare, 
  ArrowRight,
  Search,
  CheckCircle,
  Zap,
  Calculator,
  BarChart3,
  TrendingUp,
  Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const TOOLS = [
  {
    title: "Website SEO Audit (Moz-Style)",
    description: "Deep technical analysis with DA prediction, keyword tracking, and spam risk score. Fix issues losing you customers.",
    href: "/free-tools/ai-seo-checker",
    icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
    tag: "Technical SEO",
    gradient: "from-blue-50 to-indigo-50"
  },
  {
    title: "Webinar Profit Calculator",
    description: "Analyze your webinar's potential ROI. Calculate revenue, ad spend targets, and net profit in one click.",
    href: "/free-tools/webinar-profit-calculator",
    icon: <Calculator className="w-8 h-8 text-green-500" />,
    tag: "Marketing Tool",
    gradient: "from-green-50 to-emerald-50"
  },
  {
    title: "WhatsApp Funnel Generator",
    description: "Use AI to build a 5-day high-converting WhatsApp automation script for your specific business niche.",
    href: "/free-tools/whatsapp-funnel-generator",
    icon: <MessageSquare className="w-8 h-8 text-indigo-500" />,
    tag: "Aiclex™ Exclusive",
    gradient: "from-indigo-50 to-purple-50"
  },
  {
    title: "Ads ROI Calculator",
    description: "Are your ads profitable? Track ROAS, CAC, and Revenue leakage hooks to optimize your budget.",
    href: "/free-tools/ads-roi-calculator",
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    tag: "Ads Growth",
    gradient: "from-purple-50 to-fuchsia-50"
  },
  {
    title: "Lead Cost (CPL) Checker",
    description: "Stop overpaying for leads. Compare your CPL against Indian industry benchmarks and reduce leakage.",
    href: "/free-tools/lead-cost-calculator",
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    tag: "Benchmarking",
    gradient: "from-orange-50 to-amber-50"
  },
  {
    title: "Viral Headline Generator",
    description: "Generate 10+ scroll-stopping headlines and reel hooks for your business niche using Gemini AI.",
    href: "/free-tools/headline-generator",
    icon: <Sparkles className="w-8 h-8 text-pink-500" />,
    tag: "Copywriting AI",
    gradient: "from-pink-50 to-rose-50"
  },
  {
    title: "Funnel Builder Quiz",
    description: "Answer 3 quick questions to discover the perfect marketing funnel strategy to scale your business.",
    href: "/free-tools/funnel-builder-quiz",
    icon: <Layers className="w-8 h-8 text-cyan-600" />,
    tag: "Strategy Tool",
    gradient: "from-cyan-50 to-sky-50"
  }
];

export default function FreeToolsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col pt-12">
      
      {/* --- HERO --- */}
      <section className="px-6 text-center max-w-4xl mx-auto space-y-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
         >
           <Zap size={12} fill="currentColor" /> Premium Free Utilities
         </motion.div>
         
         <h1 className="text-4xl md:text-6xl font-black text-[#001341] tracking-tight leading-tight">
            Supercharge your business with <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">AI-Powered FREE Tools</span>
         </h1>
         
         <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Boost your productivity and marketing results with our custom-built AI tools, specifically designed for modern entrepreneurs and creators.
         </p>
      </section>

      {/* --- SEARCH / FILTER (MOCK) --- */}
      <section className="mt-12 px-6">
         <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for a tool..." 
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
            />
         </div>
      </section>

      {/* --- TOOLS GRID --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           {TOOLS.map((tool, index) => (
             <motion.div
               key={tool.title}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               whileHover={{ y: -8 }}
             >
                <Link href={tool.href} className="group block h-full">
                   <div className={`h-full p-8 rounded-[2.5rem] bg-gradient-to-br ${tool.gradient} border border-gray-50 shadow-sm group-hover:shadow-2xl group-hover:border-white transition-all duration-500 flex flex-col`}>
                      <div className="flex items-center justify-between mb-8">
                         <div className="p-4 bg-white rounded-2xl shadow-md rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            {tool.icon}
                         </div>
                         <span className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/50">
                            {tool.tag}
                         </span>
                      </div>
                      
                      <div className="space-y-4 flex-grow">
                         <h2 className="text-2xl font-black text-[#001341] flex items-center gap-2">
                           {tool.title} 
                           <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                         </h2>
                         <p className="text-gray-500 text-sm leading-relaxed">
                            {tool.description}
                         </p>
                      </div>

                      <div className="mt-8 pt-8 border-t border-black/5 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                            <CheckCircle size={14} className="text-green-500" /> No Card Required
                         </div>
                         <span className="text-blue-600 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                            Try Now <ArrowRight size={14} />
                         </span>
                      </div>
                   </div>
                </Link>
             </motion.div>
           ))}
        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="pb-32 px-6">
         <div className="max-w-5xl mx-auto bg-[#001341] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  Have a custom requirement? <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Let's build your dream project.</span>
               </h2>
               <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <a 
                    href="/contact" 
                    className="px-10 py-5 bg-white text-[#001341] font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                  >
                     Start Free Quote
                  </a>
                  <a 
                    href="https://wa.me/918449488090"
                    target="_blank"
                    className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black text-lg rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                     Chat with Us <ArrowRight size={22} />
                  </a>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
