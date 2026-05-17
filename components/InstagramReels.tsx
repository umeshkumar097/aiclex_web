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

        {/* Widget Container */}
        <div className="relative w-full rounded-3xl bg-gray-50 border border-gray-100 p-4 md:p-8 min-h-[400px] flex items-center justify-center overflow-hidden">
          {/* Decorative background blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
          </div>

          <div className="relative z-10 w-full">
            {/* 
              INSTRUCTIONS FOR USER:
              1. Go to https://elfsight.com/instagram-feed-instashow/
              2. Create a free widget and connect your Instagram account (@aiclex_in).
              3. Choose a "Slider" or "Grid" template for Reels.
              4. They will give you a code snippet that looks like: <div class="elfsight-app-xxxxxx"></div>
              5. Paste that snippet right here below this comment!
            */}
            
            {/* PLACEHOLDER - Remove this when adding widget */}
            <div className="elfsight-app-REPLACE-WITH-YOUR-ID">
               <div className="text-center py-20 bg-white/50 backdrop-blur rounded-2xl border border-dashed border-gray-300">
                  <Instagram size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-700">Instagram Feed Widget Placeholder</h3>
                  <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">Please insert your free Elfsight or SnapWidget embed code here to display the live Reels feed.</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
