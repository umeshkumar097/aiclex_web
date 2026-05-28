"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    name: "Umesh Kumar",
    role: "Founder & CEO",
    image: "/our-members/ceo.webp",
    bio: "Driving the vision and strategy at Aiclex, bringing cutting-edge AI and digital growth solutions to enterprises.",
    socials: {
      linkedin: "https://www.linkedin.com/in/iukbsr/",
    },
  },
  {
    id: 2,
    name: "Krishika Gupta",
    role: "Social Media Manager",
    image: "/our-members/co-founder.jpg",
    bio: "Crafting viral, high-converting social campaigns and building engaging community experiences across platforms.",
    socials: {
      linkedin: "https://www.linkedin.com/in/gkrishika/",
    },
  },
];

export default function OurTeamPage() {
  return (
    <main className="w-full bg-[#f8fafc] min-h-screen pt-24 pb-20">
      
      {/* HEADER SECTION */}
      <section className="relative w-full py-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[100px] mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-orange-300/30 rounded-full blur-[100px] mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mx-auto"
          >
            <span className="text-xs font-bold text-[#001341] tracking-wider uppercase">The Brains Behind Aiclex</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#001341] leading-[1.1]"
          >
            Meet the Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Leadership Team</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium"
          >
            A dedicated team of AI engineers, digital marketers, and growth architects helping businesses scale effortlessly.
          </motion.p>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id} 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative w-full h-[400px] overflow-hidden bg-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x600/f8fafc/001341?text=${member.name.charAt(0)}`;
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001341]/90 via-[#001341]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Social Links on Hover */}
                <div className="absolute bottom-8 left-0 w-full flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {Object.entries(member.socials).map(([platform, link]) => (
                    <Link key={platform} href={link as string} target="_blank" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#001341] hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white transition-all shadow-lg hover:scale-110">
                      {platform === "linkedin" && <Linkedin size={22} />}
                      {platform === "twitter" && <Twitter size={22} />}
                      {platform === "email" && <Mail size={22} />}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8 md:p-10 text-center relative bg-white">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                <h3 className="text-2xl font-bold text-[#001341] mb-2">{member.name}</h3>
                <p className="text-sm font-bold text-[#ff914d] uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-slate-600 font-medium leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Join CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-10 bg-[#001341] rounded-[2rem] text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-4">Want to work with us?</h3>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto text-lg">We are always looking for driven individuals to join our mission of reshaping the digital landscape with AI.</p>
            <Link href="/career">
              <button className="px-8 py-4 bg-white text-[#001341] font-bold rounded-xl hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto">
                View Open Positions <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}