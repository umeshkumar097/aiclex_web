"use client";
import React from 'react';
import { MessageCircle, Bot, Zap, ShieldCheck } from 'lucide-react';

export default function WhatsAppShowcase() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative border-t border-gray-100">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-200 rounded-full blur-[100px] opacity-40 -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 -left-10 w-80 h-80 bg-emerald-100 rounded-full blur-[80px] opacity-50 -z-10" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest">
              Introducing WhatsPilot
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001341] leading-[1.1]">
              Automate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">WhatsApp Mastery</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Turn the world's most popular messaging app into your ultimate sales and support engine. Engage customers instantly, automate follow-ups, and scale your business with intelligent AI chatbots.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#001341]">Smart AI Chatbots</h4>
                  <p className="text-sm text-gray-500">24/7 automated lead qualification.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#001341]">Bulk Broadcasting</h4>
                  <p className="text-sm text-gray-500">Reach thousands with one click.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
               <a 
                 href="https://wa.me/918449488090?text=I%20want%20to%20know%20more%20about%20WhatsPilot" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
               >
                 <MessageCircle className="w-5 h-5" />
                 Get WhatsPilot Today
               </a>
            </div>
          </div>

          {/* Video Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative group">
              {/* Glow effect behind video */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
              
              <div className="relative bg-[#001341] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white">
                <video 
                  className="w-full aspect-video object-cover"
                  controls
                  playsInline
                  autoPlay
                  muted
                  loop
                >
                  <source src="https://ai.siteboard.in/WhatsPilot_%20Automate%20Your%20WhatsApp%20Mastery_1080p_caption.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:flex items-center gap-3 animate-bounce">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#5271ff]" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Enterprise Grade</div>
                <div className="text-sm font-bold text-[#001341]">Official API Ready</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
