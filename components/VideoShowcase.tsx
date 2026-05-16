"use client";
import React from 'react';

export default function VideoShowcase() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#5271ff] text-xs font-bold uppercase tracking-widest">
              Authorized Zoom Solutions
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001341] leading-[1.1]">
              Redefining <span className="text-[#5271ff]">Collaboration</span> <br />
              with Zoom & AI
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Discover how our growth-oriented Zoom solutions empower teams to achieve more. We combine high-performance communication tools with AI-driven insights to help your business scale seamlessly.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#5271ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#001341]">Official Partner</h4>
                  <p className="text-sm text-gray-500">Certified reseller & support in India.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#ff914d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#001341]">Instant Setup</h4>
                  <p className="text-sm text-gray-500">Quick provisioning & deployment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#5271ff] to-[#ff914d] rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-700"></div>
              <div className="relative bg-[#001341] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <video 
                  className="w-full aspect-video object-cover"
                  controls
                  playsInline
                >
                  <source src="https://ai.siteboard.in/AIclex%20Technologies%20-%20Growth-Oriented%20Zoom%20Solutions_1080p_caption.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block animate-bounce">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Customer Trust</div>
                  <div className="text-sm font-bold text-[#001341]">99% Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
