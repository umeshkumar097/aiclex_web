"use client";

import React from "react";
import Link from "next/link";

// Lucide Icons
import { Linkedin, Twitter, Instagram, Github } from "lucide-react";

// 🔥 Type-safe social links
type SocialLinks = {
  [key: string]: string;
};

// Team Members
const teamMembers: {
  id: number;
  name: string;
  role: string;
  image: string;
  socials: SocialLinks;
}[] = [
  {
    id: 1,
    name: "Umesh Kumar",
    role: "Founder & CEO",
    image: "/our-members/ceo.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/iukbsr/",
      
      
    },
  },
  {
    id: 2,
    name: "Krishika Gupta",
    role: "Co-Founder & Social Media Head",
    image:
      "/our-members/co-founder.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/gkrishika/",
      
    },
  },
];

export default function TeamSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            The talented individuals behind our success, dedicated to delivering
            excellence in every project.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff914d] to-[#5271ff] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
            >
              {/* Gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ff914d] to-[#5271ff]"></div>

              {/* Image */}
              <div className="relative w-full aspect-[4/4] overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/400x400/f3f4f6/666?text=${member.name.charAt(
                      0
                    )}`;
                  }}
                />

                {/* Social Icons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {Object.keys(member.socials).map((platform) => (
                      <Link
                        key={platform}
                        href={member.socials[platform]}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-[#5271ff] transition-colors shadow-lg"
                        aria-label={`${member.name}'s ${platform}`}
                      >
                        {platform === "linkedin" && <Linkedin size={20} />}
                        {platform === "twitter" && <Twitter size={20} />}
                        {platform === "instagram" && <Instagram size={20} />}
                        {platform === "github" && <Github size={20} />}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 text-center border-t border-[0.5px] border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#5271ff] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#ff914d] font-medium text-sm">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
