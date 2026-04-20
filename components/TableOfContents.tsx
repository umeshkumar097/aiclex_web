"use client";

import { Heading } from "@/lib/blog-utils";
import { ListIcon, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ToCProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: ToCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 sticky top-28 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
          <ListIcon size={20} />
        </div>
        <h3 className="text-xl font-black text-[#001341] tracking-tight">Table of Contents</h3>
      </div>

      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              // Update URL without jump
              window.history.pushState(null, "", `#${heading.id}`);
            }}
            className={`
              block py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 group
              ${heading.level === 3 ? "ml-6 text-gray-400 border-l border-gray-100 pl-6" : ""}
              ${activeId === heading.id 
                ? "bg-blue-50 text-blue-600 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-[#001341]"}
            `}
          >
            {activeId === heading.id && <ArrowRight size={14} className="animate-in slide-in-from-left-1 duration-300" />}
            <span className="line-clamp-2">{heading.text}</span>
          </a>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-50">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest text-center">
              Quick Navigation Box
          </p>
      </div>
    </div>
  );
}
