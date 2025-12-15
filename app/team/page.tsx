  "use client";

  import React, { useState, useEffect } from "react";
  import Link from "next/link";
  import { Linkedin, Twitter, Mail, Loader2, ArrowRight } from "lucide-react";

  export default function OurTeamPage() {
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTeam = async () => {
        try {
          const res = await fetch("/api/team");
          const data = await res.json();
          setTeamMembers(data);
        } catch (error) {
          console.error("Error loading team");
        } finally {
          setLoading(false);
        }
      };
      fetchTeam();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-[#5271ff]"/></div>;

    return (
      <div className="w-full bg-white">
        {/* HERO SECTION */}
        <section className="relative w-full mt-10 py-16 bg-gray-50 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <span className="text-[#5271ff] font-bold tracking-wider uppercase text-sm mb-2 block">The Minds Behind Aiclex</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5271ff] to-purple-600">Expert Team</span></h1>
          </div>
        </section>

        {/* TEAM GRID */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative w-full h-80 bg-gray-200 overflow-hidden">
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-[#5271ff]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                    {member.linkedin && <Link href={member.linkedin} className="p-3 bg-white rounded-full text-[#5271ff] hover:scale-110"><Linkedin size={20} /></Link>}
                    {member.twitter && <Link href={member.twitter} className="p-3 bg-white rounded-full text-[#5271ff] hover:scale-110"><Twitter size={20} /></Link>}
                    {member.email && <Link href={`mailto:${member.email}`} className="p-3 bg-white rounded-full text-[#5271ff] hover:scale-110"><Mail size={20} /></Link>}
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm font-semibold text-[#5271ff] uppercase tracking-wide mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }