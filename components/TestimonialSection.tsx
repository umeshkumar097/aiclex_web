"use client";

import React, { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    company: "Sonu Singh",
    type: "Managing Director",
    meta: "Digital Marketing Strategy",
    image: "https://aiclex.in/wp-content/uploads/2023/12/h10-testimonial2.jpg",
    quote: "AICLEX TECHNOLOGIES transformed our online presence with their comprehensive digital marketing strategy. Our website traffic has increased significantly, and our sales have never been better. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    company: "Ronald Richard",
    type: "Jayveer",
    meta: "Social Media Management",
    image: "https://aiclex.in/wp-content/uploads/2023/12/h10-testimonial1.jpg",
    quote: "Thanks to AICLEX TECHNOLOGIES , our social media engagement has skyrocketed. Their content creation and social media management services are top-notch",
    rating: 5,
  },
  {
    id: 3,
    company: "Rajeev Singh",
    type: "Managing Director",
    meta: "Web Design & SEO",
    image: "https://aiclex.in/wp-content/uploads/2023/12/h10-testimonial4.jpg",
    quote: "The team at AICLEX TECHNOLOGIES is exceptional! They designed a stunning, user-friendly website for us and helped us rank higher on search engines with their advanced SEO services",
    rating: 5,
  },
  {
    id: 4,
    company: "Raftaar Singh",
    type: "Managing Director",
    meta: "Brand Development",
    image: "https://aiclex.in/wp-content/uploads/2023/12/h10-testimonial3.jpg",
    quote: "AICLEX TECHNOLOGIES provided us with excellent brand development and strategy services. Our brand now has a strong identity that resonates with our target audience.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Clone the first 2 items for infinite loop
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials.slice(0, 2),
  ];
  const totalRealItems = testimonials.length;

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (isResetting) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isResetting]);

  const prevSlide = () => {
    if (isResetting) return;
    setCurrentIndex((prev) => (prev === 0 ? totalRealItems - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    if (isResetting) return;
    setCurrentIndex(index);
  };

  // Handle the "Snap" back to 0
  const handleTransitionEnd = () => {
    if (currentIndex >= totalRealItems) {
      setIsResetting(true);
      setCurrentIndex(0);
      setTimeout(() => {
        setIsResetting(false);
      }, 50);
    }
  };

  // Auto-play
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    // Added overflow-hidden to prevent horizontal scrollbars on the page
    <section className="w-full py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          What Our Clients Say
        </h2>

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slider Window */}
          <div className="overflow-hidden px-2 py-4 -mx-2 -my-4">
            <div
              className={`flex ${
                isResetting ? "" : "transition-transform duration-500 ease-out"
              }`}
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
                    {/* Top Gradient Bar: Orange to Blue */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff914d] to-[#5271ff]"></div>

                    <div className="p-8 pt-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4">
                          {/* Quote Icon Circle: Blue */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#5271ff] flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                            </svg>
                          </div>

                          {/* Text Info */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                              {item.company}
                            </h3>
                            {/* Type Text: Orange */}
                            <p className="text-[#ff914d] font-medium text-sm mb-1">
                              {item.type}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {item.meta}
                            </p>
                          </div>
                        </div>

                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.company}
                            className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-gray-100"
                            onError={(e) => {
                                // Fallback if the external image is blocked
                                e.currentTarget.src = `https://placehold.co/150/f3f4f6/666?text=${item.company.charAt(0)}`;
                            }}
                          />
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < item.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-gray-700 italic text-lg leading-relaxed flex-grow">
                        "{item.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {/* Updated: Fixed positioning inside container and removed opacity-0 to ensure visibility */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#5271ff] hover:scale-110 transition-all focus:outline-none border border-gray-100 opacity-100 z-30"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Updated: Fixed positioning inside container and removed opacity-0 to ensure visibility */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#5271ff] hover:scale-110 transition-all focus:outline-none border border-gray-100 opacity-100 z-30"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalRealItems }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  (currentIndex % totalRealItems) === index
                    ? "bg-[#5271ff] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}