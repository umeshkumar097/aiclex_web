"use client";
import React from 'react';
import { Instagram, PlaySquare } from 'lucide-react';
import Link from 'next/link';

export default function InstagramReels() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Instagram size={14} /> Social Feed
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#001341] leading-tight">
              Watch Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">Latest Reels</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl text-lg">
              Stay updated with our newest tips, success stories, and behind-the-scenes moments directly from our Instagram.
            </p>
          </div>
          
          <Link 
            href="https://www.instagram.com/aiclex_in" 
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex-shrink-0"
          >
            <PlaySquare size={18} /> Follow @aiclex_in
          </Link>
        </div>

        {/* Premium Native Visual Reels Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            {
              title: "🚀 Automate WhatsApp Sales with WhatsPilot AI Chatbots!",
              views: "14.2K views",
              likes: "1,240 likes",
              hashtag: "#whatspilot #ai",
              gradient: "from-indigo-600 via-purple-600 to-pink-600",
              link: "https://www.instagram.com/reels/aiclex_in"
            },
            {
              title: "📈 3x Organic Leads Checklist for Schools & Colleges 🏫",
              views: "18.5K views",
              likes: "2,090 likes",
              hashtag: "#leadgen #education",
              gradient: "from-rose-500 via-pink-500 to-orange-500",
              link: "https://www.instagram.com/reels/aiclex_in"
            },
            {
              title: "🔗 Official Zoom Partnership & Reselling License Guide",
              views: "9.8K views",
              likes: "870 likes",
              hashtag: "#zoom #business",
              gradient: "from-blue-600 to-indigo-600",
              link: "https://www.instagram.com/reels/aiclex_in"
            },
            {
              title: "🔥 Paid Ads ROI Calculator to Audit Your Agency Costs",
              views: "12.4K views",
              likes: "1,520 likes",
              hashtag: "#seo #paidmedia",
              gradient: "from-amber-500 via-red-500 to-pink-500",
              link: "https://www.instagram.com/reels/aiclex_in"
            }
          ].map((reel, idx) => (
            <a 
              key={idx}
              href={reel.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative rounded-3xl overflow-hidden aspect-[9/16] bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 border border-white/10 hover:-translate-y-2"
            >
              {/* Vibrant Gradient Background Backdrop mimicking actual video layout */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${reel.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`}></div>
              
              {/* Noise & Mesh effect overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

              {/* Instagram top badge */}
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[1.5px] shadow-md">
                    <div className="w-full h-full rounded-full bg-[#001341] flex items-center justify-center text-[10px] font-black text-white">A</div>
                  </div>
                  <div className="leading-none">
                    <p className="text-[10px] font-black text-white tracking-wide">aiclex_in</p>
                    <p className="text-[8px] text-white/60">Sponsored</p>
                  </div>
                </div>
                <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <Instagram size={12} />
                </div>
              </div>

              {/* Centered Glassmorphic Pulsing Play Button */}
              <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-125 group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 group-hover:border-transparent transition-all duration-500">
                <PlaySquare size={24} className="ml-[2px] group-hover:animate-pulse" />
              </div>

              {/* Visual Statistics & Caption at Bottom */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1">
                    👁️ {reel.views}
                  </span>
                  <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1">
                    ❤️ {reel.likes}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-widest text-[#ff914d] uppercase block mb-1">{reel.hashtag}</span>
                  <p className="text-white text-xs font-bold leading-relaxed line-clamp-2 drop-shadow-md group-hover:text-amber-200 transition-colors duration-300">
                    {reel.title}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
