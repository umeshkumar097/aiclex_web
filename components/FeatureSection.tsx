// components/FeatureSection.tsx
"use client";

import { motion, Variants } from "framer-motion"; // <-- Imported 'Variants'
import { Zap, TrendingUp, Users, Code, LucideIcon } from "lucide-react"; // <-- Imported 'LucideIcon' instead of 'Icon'

// 1. Define the type for a single feature item for type safety
interface Feature {
  icon: LucideIcon; // <-- Using the correct type 'LucideIcon'
  title: string;
  description: string;
  color: string;
}

// 2. Define the data array for the features
const features: Feature[] = [
  {
    icon: Zap,
    title: "Performance Marketing",
    description: "Drive immediate results with targeted ads and highly optimized campaigns across all major platforms.",
    color: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Brand Strategy & Growth",
    description: "Develop a strong, unified brand identity that resonates with your audience and scales your market presence.",
    color: "text-orange-600",
  },
  {
    icon: Users,
    title: "Customer Engagement",
    description: "Implement AI-driven tools and personalized journeys to boost loyalty and lifetime customer value.",
    color: "text-green-600",
  },
  {
    icon: Code,
    title: "Custom Web Development",
    description: "Building fast, secure, and SEO-friendly websites using Next.js to ensure top-tier performance and user experience.",
    color: "text-purple-600",
  },
];

// 3. Animation variants (Explicitly typed as Variants)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = { // <-- Explicitly typed as Variants
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};


// 4. Feature Card Component
const FeatureCard: React.FC<Feature> = ({ icon: IconComponent, title, description, color }) => {
  return (
    <motion.div 
      className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
      variants={cardVariants}
      whileHover={{ scale: 1.03, zIndex: 1 }} // Slight lift on hover
    >
      <div className={`p-3 w-14 h-14 rounded-full bg-opacity-10 mb-4 flex items-center justify-center ${color.replace('text', 'bg')}`}>
        <IconComponent className={`w-8 h-8 ${color}`} />
      </div>
      <h3 className="text-xl font-bold text-[#001341] mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};


// 5. Main Feature Section Component
export default function FeatureSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
          <p className="text-base font-semibold text-orange-600 uppercase tracking-wide">
            Our Expertise
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-[#001341] dark:text-white sm:text-5xl">
            Solutions to Drive Your Business Forward
          </h2>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animation triggers when section scrolls into view
          viewport={{ once: true, amount: 0.4 }} // Trigger when 40% of the element is visible
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}