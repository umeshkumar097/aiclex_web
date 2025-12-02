"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Building2, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Lalit Arora",
    type: "Digital Marketing",
    company: "KW Academy",
    image: "/testimonial/lalit.webp",
    quote: "Our digital presence improved noticeably after working with Aiclex. The marketing strategies they provided were practical and result-driven. We started seeing better engagement and more leads within weeks.",
    rating: 5,
  },
  {
    id: 2,
    name: "Eric S. Yuan ",
    type: "Zoom Services ",
    company: "Zoom CEO ",
    image: "/testimonial/yuan.webp",
    quote: "Aiclex has shown impressive understanding and execution of Zoom-related services. Their team handles integrations and setup with great accuracy and reliability. It’s always good to see partners who maintain such high standards. ",
    rating: 5,
  },
  {
    id: 3,
    name: "Sachin Gupta ",
    type: "Lead Generation",
    company: "UC Property ",
    image: "/testimonial/Sachin-gupta.webp",
    quote: "The lead generation support from Aiclex has helped us reach more serious buyers. The leads were relevant and the process was very well managed. Great teamwork and timely updates.",
    rating: 5,
  },
  {
    id: 4,
    name: "Mohit Kumar ",
    type: "Zoom Meeting Support",
    company: "ProEditorsClub",
    image: "/testimonial/mohit.webp",
    quote: "We conduct frequent Zoom sessions, and Aiclex made the entire setup effortless for us. Everything works perfectly, and their support team is quick and reliable. Excellent service overall.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, 2)];
  const totalRealItems = testimonials.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (!isResetting) setCurrentIndex((p) => p + 1);
  }, [isResetting]);

  const prevSlide = () => {
    if (!isResetting)
      setCurrentIndex((p) => (p === 0 ? totalRealItems - 1 : p - 1));
  };

  const goToSlide = (i: number) => {
    if (!isResetting) setCurrentIndex(i);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= totalRealItems) {
      setIsResetting(true);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="w-full py-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          What Our Clients Say
        </h2>

        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden px-2 py-4 -mx-2 -my-4">
            <div
              className={`flex ${isResetting ? "" : "transition-transform duration-500 ease-out"}`}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {extendedTestimonials.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-full md:w-1/2 px-3"
                >
                  <div className="relative bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff914d] to-[#5271ff]"></div>

                    <div className="p-8 pt-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#5271ff] flex items-center justify-center">
                            {/* lucide-react ICON */}
                            <Building2 className="w-6 h-6 text-white" />
                          </div>

                          {/* NAME → COMPANY → TYPE */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                              {item.name}
                            </h3>

                            <p className="text-[#ff914d] font-bold text-sm mb-1">
                              {item.company}
                            </p>

                            <p className="text-gray-400 text-xs">
                              {item.type}
                            </p>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-gray-100"
                            onError={(e) =>
                              (e.currentTarget.src = `https://placehold.co/150/f3f4f6/666?text=${item.name.charAt(
                                0
                              )}`)}
                          />
                        </div>
                      </div>

                      {/* lucide-react STARS */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={
                              i < item.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                      <blockquote className="text-gray-700 italic text-lg leading-relaxed flex-grow">
                        "{item.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 0 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#5271ff] hover:scale-110 transition-all border border-gray-100 z-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#5271ff] hover:scale-110 transition-all border border-gray-100 z-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* DOTS */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalRealItems }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex % totalRealItems === index
                    ? "bg-[#5271ff] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
