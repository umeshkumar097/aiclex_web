export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: { title: string; desc: string }[]; // Updated to hold title + desc
  process: { step: string; title: string; desc: string }[];
  icon: string;
  color: string;
}

// Reusable benefits based on your company profile
const commonBenefits = [
  {
    title: "Expert Team",
    desc: "Our team consists of experienced digital marketing professionals who are passionate about helping businesses succeed online."
  },
  {
    title: "Customized Strategies",
    desc: "We understand that every business is unique. Our tailored strategies are designed to meet your specific needs and goals."
  },
  {
    title: "Proven Results",
    desc: "We have a track record of delivering results that matter. Our clients have seen significant improvements in their online presence and business growth."
  },
  {
    title: "Cutting-Edge Tools",
    desc: "We use the latest digital marketing tools and technologies to ensure your campaigns are effective and efficient."
  },
  {
    title: "Client-Centric Approach",
    desc: "Our clients are our top priority. We take the time to understand their unique needs and challenges, crafting tailored solutions."
  }
];

export const servicesData: Service[] = [
  {
    id: 1,
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Digital Marketing in Facebook, LinkedIn, Instagram, and Google can help generate leads and grow your business online.",
    longDescription: "At AICLEX TECHNOLOGIES, we understand the ever-evolving landscape of digital marketing and how critical it is for businesses to stay ahead. Our comprehensive digital marketing strategies are designed to enhance your online presence, engage your target audience, and drive significant business growth.",
    features: ["Search Engine Optimization (SEO)", "Pay-Per-Click (PPC)", "Email Marketing", "Conversion Rate Optimization"],
    benefits: commonBenefits, // Using your specific AICLEX benefits
    process: [
      { step: "01", title: "Audit & Research", desc: "We analyze your current digital presence and competitors." },
      { step: "02", title: "Strategy Setup", desc: "We build a custom roadmap tailored to your business goals." },
      { step: "03", title: "Execution", desc: "We launch campaigns across selected channels (SEO, PPC, Social)." },
      { step: "04", title: "Optimization", desc: "Continuous monitoring and tweaking to improve performance." }
    ],
    icon: "Megaphone",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Application Development",
    slug: "application-development",
    description: "Custom mobile and web application development to meet your specific business needs and enhance user engagement.",
    longDescription: "Our custom mobile and web application development services are designed to meet your specific business needs. We build robust, scalable, and secure applications that enhance user engagement and drive business value. From concept to deployment, we ensure your app stands out.",
    features: ["iOS & Android Development", "Cross-Platform (Flutter/React Native)", "API Integration", "App Maintenance & Support"],
    benefits: commonBenefits,
    process: [
      { step: "01", title: "Requirement Gathering", desc: "Understanding your vision, features, and user needs." },
      { step: "02", title: "UI/UX Design", desc: "Creating wireframes and prototypes for visual approval." },
      { step: "03", title: "Development", desc: "Coding the application using agile methodologies." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous QA testing followed by deployment to app stores." }
    ],
    icon: "Smartphone",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Brand Development",
    slug: "brand-development",
    description: "Develop a strong brand identity and implement effective strategies to position your business for long-term success.",
    longDescription: "Your brand is your promise to your customer. We help develop a strong brand identity and implement effective strategies to position your business for long-term success. We ensure your brand resonates with your target audience and stands the test of time.",
    features: ["Brand Strategy", "Logo Design", "Brand Guidelines", "Rebranding Services"],
    benefits: commonBenefits,
    process: [
      { step: "01", title: "Discovery", desc: "Workshops to uncover your core values and mission." },
      { step: "02", title: "Identity Design", desc: "Crafting logos, color palettes, and typography." },
      { step: "03", title: "Guidelines", desc: "Creating a brand book to ensure consistency." },
      { step: "04", title: "Rollout", desc: "Applying the new brand to all your assets." }
    ],
    icon: "PenTool",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 4,
    title: "Google Ads & Meta",
    slug: "google-ads-meta",
    description: "Create and manage effective Google Ads and Meta campaigns to drive targeted traffic and maximize ROI.",
    longDescription: "We create and manage effective Google Ads and Meta campaigns to drive targeted traffic and maximize ROI. By utilizing advanced targeting and analytics, we ensure your ad spend delivers real, measurable results for your business.",
    features: ["Campaign Setup & Management", "Audience Targeting", "A/B Testing", "Performance Analytics"],
    benefits: commonBenefits,
    process: [
      { step: "01", title: "Account Audit", desc: "Reviewing past performance and setting up tracking." },
      { step: "02", title: "Campaign Structure", desc: "Organizing ad groups and keywords for relevance." },
      { step: "03", title: "Creative & Copy", desc: "Designing high-converting ad visuals and text." },
      { step: "04", title: "Launch & Optimize", desc: "Going live and daily bid adjustments." }
    ],
    icon: "LayoutGrid",
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 5,
    title: "E-commerce Solutions",
    slug: "ecommerce-solutions",
    description: "Comprehensive e-commerce solutions, including website development, payment gateway integration, and inventory management.",
    longDescription: "We provide comprehensive e-commerce solutions that simplify online selling. From website development to payment gateway integration and inventory management, we build scalable stores that provide seamless shopping experiences for your customers.",
    features: ["Shopify & WooCommerce", "Payment Gateway Integration", "Inventory Management", "Shopping Cart Optimization"],
    benefits: commonBenefits,
    process: [
      { step: "01", title: "Platform Selection", desc: "Choosing the right tech stack (Shopify, Woo, Custom)." },
      { step: "02", title: "Design & Dev", desc: "Building the storefront and product pages." },
      { step: "03", title: "Integration", desc: "Connecting payment gateways and shipping APIs." },
      { step: "04", title: "Testing", desc: "Ensuring checkout flow works perfectly." }
    ],
    icon: "ShoppingCart",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: 6,
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Enhance your brand’s visual appeal with eye-catching designs for your marketing materials and digital platforms.",
    longDescription: "Enhance your brand’s visual appeal with our professional graphic design services. We create eye-catching designs for your marketing materials and digital platforms that effectively communicate your message and captivate your audience.",
    features: ["Social Media Graphics", "Brochure & Flyer Design", "Infographics", "Packaging Design"],
    benefits: commonBenefits,
    process: [
      { step: "01", title: "Briefing", desc: "Understanding the goal of the design." },
      { step: "02", title: "Concepting", desc: "Sketching rough ideas and layouts." },
      { step: "03", title: "Design", desc: "Creating the high-fidelity graphics." },
      { step: "04", title: "Revisions", desc: "Refining based on your feedback." }
    ],
    icon: "Palette",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 7,
    title: "Website Designing",
    slug: "website-designing",
    description: "We create stunning, user-friendly websites tailored to your business needs, ensuring a seamless online experience.",
    longDescription: "We create stunning, user-friendly websites tailored to your business needs. Our designs focus on aesthetics, functionality, and user experience, ensuring a seamless online journey that converts visitors into loyal customers.",
    features: ["UI/UX Design", "Responsive Layouts", "Landing Page Design", "Website Redesign"],
    benefits: commonBenefits,
    process: [
      { step: "01", title: "Sitemap & Wireframe", desc: "Planning the structure and user flow." },
      { step: "02", title: "Visual Design", desc: "Applying colors, fonts, and images." },
      { step: "03", title: "Development", desc: "Turning the design into code (Next.js/React)." },
      { step: "04", title: "Launch", desc: "Deploying to the live server." }
    ],
    icon: "Monitor",
    color: "from-teal-400 to-cyan-600",
  },
  {
    id: 8,
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    description: "Our Lead-driven inbound content marketing strategies will make you stand out and build a loyal community.",
    longDescription: "Our lead-driven inbound content marketing strategies are designed to make you stand out. We help you build a loyal community through engaging content and strategic management, turning your social media channels into powerful growth engines.",
    features: ["Content Calendar Strategy", "Community Management", "Influencer Marketing", "Social Analytics"],
    benefits: commonBenefits,
    process: [
      { step: "01", title: "Audit", desc: "Analyzing current social footprint." },
      { step: "02", title: "Content Plan", desc: "Creating a monthly calendar of posts." },
      { step: "03", title: "Creation", desc: "Designing graphics and writing captions." },
      { step: "04", title: "Engagement", desc: "Replying to comments and analyzing growth." }
    ],
    icon: "Globe", 
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: 9,
    title: "Zoom Reseller In India",
    slug: "zoom-reseller",
    description: "Official Zoom Reseller in India. Best pricing for Zoom Meetings, Webinars, and Rooms for businesses and educational institutions.",
    longDescription: "As a leading Zoom Reseller in India, AICLEX TECHNOLOGIES provides end-to-end support for your video communication needs. Whether you need Zoom Meetings for a small team or Zoom Webinars for large-scale events, we offer customized licensing and technical integration to ensure seamless collaboration across your organization.",
    features: ["Zoom Meetings & Webinars", "Zoom Rooms Integration", "Custom Discounted Pricing", "24/7 Priority Support"],
    benefits: [
      { title: "Localized Billing", desc: "Pay in INR with GST compliant invoices, simplifying your accounting process." },
      { title: "Special Discounts", desc: "Access volume pricing and educational discounts not available on the global store." },
      { title: "Expert Onboarding", desc: "We help you set up and configure your Zoom environment for maximum security and efficiency." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Needs Assessment", desc: "Identifying the right mix of Zoom licenses for your team size." },
      { step: "02", title: "Quote & Billing", desc: "Providing INR quotes with flexible payment options." },
      { step: "03", title: "Activation", desc: "Instances are provisioned instantly upon order confirmation." },
      { step: "04", title: "Support", desc: "Ongoing training and helpdesk for any technical queries." }
    ],
    icon: "Video",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 10,
    title: "AI Agent Calling",
    slug: "ai-agent-calling",
    description: "Revolutionize your customer outreach with AI Powered Calling Agents. Automate lead qualification and customer support calls.",
    longDescription: "Our AI Agent Calling services use state-of-the-art Natural Language Processing (NLP) to handle outbound and inbound calls just like a human. Ideal for lead qualification, appointment setting, and customer surveys, our AI agents scale your operations without increasing headcount.",
    features: ["Natural Sounding Voice AI", "Lead Qualification Bots", "Multilingual Support", "Real-time CRM Integration"],
    benefits: [
      { title: "24/7 Availability", desc: "Your calling operations never sleep, capturing leads even outside business hours." },
      { title: "Cost Efficiency", desc: "Reduce cost-per-lead by automating repetitive initial qualification calls." },
      { title: "Infinite Scalability", desc: "Handle 10,000 calls simultaneously without hiring more staff." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Script Design", desc: "Crafting a conversation flow that achieves your business goals." },
      { step: "02", title: "Voice Training", desc: "Selecting and fine-tuning the AI voice to match your brand." },
      { step: "03", title: "Integration", desc: "Connecting the dialer to your existing CRM system." },
      { step: "04", title: "Launch & Iterate", desc: "Monitoring call performance and refining the AI model." }
    ],
    icon: "PhoneCall",
    color: "from-indigo-600 to-blue-800",
  },
  {
    id: 11,
    title: "Paid Media Advertisement",
    slug: "paid-media-advertisement",
    description: "High-performance PPC campaigns on Google, Meta, and LinkedIn to drive targeted traffic and measurable ROI.",
    longDescription: "Scale your business with data-driven Paid Media strategies. We go beyond simple ad placement, focusing on deep audience research, conversion-centric creative, and continuous bid optimization to ensure every rupee spent contributes to your bottom line.",
    features: ["Google Search & Display Ads", "Meta (Facebook/Instagram) Ads", "LinkedIn B2B Campaigns", "Retargeting & Remarketing"],
    benefits: [
      { title: "ROI Focused", desc: "We prioritize actual conversions and sales over vanity metrics like impressions." },
      { title: "Transparent Reporting", desc: "Get real-time insights into your campaign performance via our custom dashboards." },
      { title: "Creative Excellence", desc: "High-impact visuals and ad-copy designed to stop the scroll and drive clicks." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Audience Audit", desc: "Identifying exactly where your customers spend their time online." },
      { step: "02", title: "Campaign Build", desc: "Setting up complex tracking and high-converting landing pages." },
      { step: "03", title: "A/B Testing", desc: "Testing multiple creatives and headlines to find the winners." },
      { step: "04", title: "Daily Scale", desc: "Increasing budget on winning ads to maximize growth." }
    ],
    icon: "BarChart",
    color: "from-green-500 to-emerald-700",
  },
];