"use client";

import { Heading } from "@/lib/blog-utils";
import { List, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ToCProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: ToCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#001341] px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
          <List size={16} className="text-white" />
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-widest">Table of Contents</h3>
      </div>

      {/* Links */}
      <nav className="p-4 space-y-0.5 max-h-[60vh] overflow-y-auto">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                window.history.pushState(null, "", `#${heading.id}`);
                setActiveId(heading.id);
              }}
              className={`
                flex items-start gap-2.5 py-2 px-3 rounded-xl text-sm transition-all duration-200
                ${isH3 ? "ml-4" : ""}
                ${isActive
                  ? "bg-blue-50 text-[#5271ff] font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#001341] font-medium"}
              `}
            >
              <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${isActive ? "bg-[#ff914d] scale-125" : isH3 ? "bg-gray-200" : "bg-gray-300"}`} />
              <span className="line-clamp-2 leading-snug">{heading.text}</span>
            </a>
          );
        })}
      </nav>

      {/* Footer CTA */}
      <div className="px-4 pb-4">
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
          <p className="text-[10px] font-black text-[#ff914d] uppercase tracking-widest">Quick Navigation</p>
        </div>
      </div>
    </div>
  );
}
