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
  isSeoOnly?: boolean;
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 16,
    title: "WhatsApp Automation",
    slug: "whatsapp-automation",
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 17,
    title: "AI Automation",
    slug: "ai-automation",
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 18,
    title: "CRM Software",
    slug: "crm-software",
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 19,
    title: "Lead Generation",
    slug: "lead-generation",
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 20,
    title: "SaaS Development",
    slug: "saas-development",
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 21,
    title: "AI Chatbot",
    slug: "ai-chatbot",
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 22,
    title: "WhatsApp Business API Provider",
    slug: "whatsapp-business-api-provider",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 23,
    title: "WhatsApp API Provider India",
    slug: "whatsapp-api-provider-india",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 24,
    title: "Official WhatsApp API",
    slug: "official-whatsapp-api",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 25,
    title: "WhatsApp Cloud API",
    slug: "whatsapp-cloud-api",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 26,
    title: "WhatsApp API Integration",
    slug: "whatsapp-api-integration",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 27,
    title: "WhatsApp Business Solution Provider",
    slug: "whatsapp-business-solution-provider",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 28,
    title: "WhatsApp API Pricing",
    slug: "whatsapp-api-pricing",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 29,
    title: "WhatsApp API For Business",
    slug: "whatsapp-api-for-business",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 30,
    title: "WhatsApp API Company",
    slug: "whatsapp-api-company",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 31,
    title: "Best WhatsApp API Provider",
    slug: "best-whatsapp-api-provider",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 32,
    title: "Affordable WhatsApp API Provider",
    slug: "affordable-whatsapp-api-provider",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 33,
    title: "Best WhatsApp API Provider In India",
    slug: "best-whatsapp-api-provider-in-india",
    isSeoOnly: true,
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 34,
    title: "WhatsApp Automation Company",
    slug: "whatsapp-automation-company",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 35,
    title: "WhatsApp Automation Service",
    slug: "whatsapp-automation-service",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 36,
    title: "WhatsApp Automation Software",
    slug: "whatsapp-automation-software",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 37,
    title: "WhatsApp Automation Platform",
    slug: "whatsapp-automation-platform",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 38,
    title: "WhatsApp Marketing Software",
    slug: "whatsapp-marketing-software",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 39,
    title: "WhatsApp Marketing Company",
    slug: "whatsapp-marketing-company",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 40,
    title: "WhatsApp Campaign Software",
    slug: "whatsapp-campaign-software",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 41,
    title: "WhatsApp Broadcast Software",
    slug: "whatsapp-broadcast-software",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 42,
    title: "Bulk WhatsApp Marketing",
    slug: "bulk-whatsapp-marketing",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 43,
    title: "WhatsApp CRM",
    slug: "whatsapp-crm",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 44,
    title: "WhatsApp Lead Generation",
    slug: "whatsapp-lead-generation",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 45,
    title: "WhatsApp Sales Automation",
    slug: "whatsapp-sales-automation",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 46,
    title: "WhatsApp Business Automation",
    slug: "whatsapp-business-automation",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 47,
    title: "WhatsApp Automation India",
    slug: "whatsapp-automation-india",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 48,
    title: "WhatsApp Automation For Real Estate",
    slug: "whatsapp-automation-for-real-estate",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 49,
    title: "WhatsApp Automation For Builders",
    slug: "whatsapp-automation-for-builders",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 50,
    title: "WhatsApp Automation For Schools",
    slug: "whatsapp-automation-for-schools",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 51,
    title: "WhatsApp Automation For Colleges",
    slug: "whatsapp-automation-for-colleges",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 52,
    title: "WhatsApp Automation For Universities",
    slug: "whatsapp-automation-for-universities",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 53,
    title: "WhatsApp Automation For Hospitals",
    slug: "whatsapp-automation-for-hospitals",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 54,
    title: "WhatsApp Automation For Clinics",
    slug: "whatsapp-automation-for-clinics",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 55,
    title: "WhatsApp Automation For Travel Agencies",
    slug: "whatsapp-automation-for-travel-agencies",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 56,
    title: "WhatsApp Automation For Gyms",
    slug: "whatsapp-automation-for-gyms",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 57,
    title: "WhatsApp Automation For Ecommerce",
    slug: "whatsapp-automation-for-ecommerce",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 58,
    title: "Best WhatsApp Marketing Software",
    slug: "best-whatsapp-marketing-software",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 59,
    title: "Best WhatsApp Marketing Software For Business",
    slug: "best-whatsapp-marketing-software-for-business",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 60,
    title: "Enterprise WhatsApp Automation Platform",
    slug: "enterprise-whatsapp-automation-platform",
    isSeoOnly: true,
    description: "End-to-end WhatsApp automation software for lead generation, sales workflows, and abandoned cart recovery.",
    longDescription: "Automate your entire sales funnel with our advanced WhatsApp Automation platform. From lead generation chatbots to multi-step drip campaigns, we help you put your marketing on autopilot. Capture leads directly from Facebook Ads and instantly engage them on WhatsApp.",
    features: [
      "No-Code Chatbot Builder",
      "Facebook Ads to WhatsApp Sync",
      "Drip Marketing Campaigns",
      "Abandoned Cart Recovery Flows",
      "Agent Live Chat Dashboard",
      "Detailed Analytics & Tracking"
    ],
    benefits: [
      { title: "Instant Lead Engagement", desc: "Automatically reply to leads within seconds, drastically increasing conversion rates." },
      { title: "Reduced Support Costs", desc: "Automate answers to common questions (FAQs), freeing up your human agents." },
      { title: "Higher Sales Recovery", desc: "Automatically message users who left items in their cart, recovering lost revenue." },
      { title: "Centralized Inbox", desc: "Manage thousands of customer conversations from a single unified team inbox." },
      { title: "Data-Driven Decisions", desc: "Track message delivery, read receipts, and link clicks in real-time." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map out your customer journey and identify automation opportunities." },
      { step: "02", title: "Bot Development", desc: "Building the conversation logic, automated replies, and routing rules." },
      { step: "03", title: "CRM Sync", desc: "Connecting the WhatsApp automation platform to your sales databases." },
      { step: "04", title: "Testing & Launch", desc: "Rigorous testing of edge cases before deploying the live automation." }
    ],
    icon: "Bot",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 61,
    title: "AI Voice Agent",
    slug: "ai-voice-agent",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 62,
    title: "AI Voice Agents",
    slug: "ai-voice-agents",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 63,
    title: "AI Calling Agent",
    slug: "ai-calling-agent",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 64,
    title: "AI Calling Software",
    slug: "ai-calling-software",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 65,
    title: "AI Call Center Software",
    slug: "ai-call-center-software",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 66,
    title: "AI Telecalling Software",
    slug: "ai-telecalling-software",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 67,
    title: "AI Customer Support AI",
    slug: "ai-customer-support-ai",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 68,
    title: "AI Receptionist",
    slug: "ai-receptionist",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 69,
    title: "AI Voice Bot",
    slug: "ai-voice-bot",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 70,
    title: "AI Sales Agent",
    slug: "ai-sales-agent",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 71,
    title: "AI Outbound Calling",
    slug: "ai-outbound-calling",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 72,
    title: "AI Lead Qualification Agent",
    slug: "ai-lead-qualification-agent",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 73,
    title: "AI Appointment Booking Agent",
    slug: "ai-appointment-booking-agent",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 74,
    title: "AI Voice Assistant For Business",
    slug: "ai-voice-assistant-for-business",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 75,
    title: "Conversational AI Voice Bot",
    slug: "conversational-ai-voice-bot",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 76,
    title: "AI Voice Agent For Real Estate",
    slug: "ai-voice-agent-for-real-estate",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 77,
    title: "AI Voice Agent For Education",
    slug: "ai-voice-agent-for-education",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 78,
    title: "AI Voice Agent For Healthcare",
    slug: "ai-voice-agent-for-healthcare",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 79,
    title: "AI Voice Agent For Travel",
    slug: "ai-voice-agent-for-travel",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 80,
    title: "AI Voice Agent For Ecommerce",
    slug: "ai-voice-agent-for-ecommerce",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 81,
    title: "Best AI Voice Agent Company",
    slug: "best-ai-voice-agent-company",
    isSeoOnly: true,
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
  {
    id: 12,
    title: "WhatsApp Marketing & Automations",
    slug: "whatsapp-marketing-automations",
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 82,
    title: "AI Automation Company",
    slug: "ai-automation-company",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 83,
    title: "AI Automation Services",
    slug: "ai-automation-services",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 84,
    title: "Business Process Automation",
    slug: "business-process-automation",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 85,
    title: "Workflow Automation",
    slug: "workflow-automation",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 86,
    title: "Enterprise Automation",
    slug: "enterprise-automation",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 87,
    title: "AI Workflow Automation",
    slug: "ai-workflow-automation",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 88,
    title: "Business Automation Services",
    slug: "business-automation-services",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 89,
    title: "AI Integration Company",
    slug: "ai-integration-company",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 90,
    title: "Automation Consulting",
    slug: "automation-consulting",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 91,
    title: "AI Business Automation",
    slug: "ai-business-automation",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 92,
    title: "Best AI Automation Company",
    slug: "best-ai-automation-company",
    isSeoOnly: true,
    description: "Enterprise AI automation services to streamline business processes, optimize workflows, and reduce manual labor.",
    longDescription: "AICLEX Technologies provides comprehensive AI business automation solutions. We integrate artificial intelligence into your daily operations—from AI-driven data entry and document processing to automated customer onboarding. Our AI workflow automation reduces human error and cuts operational costs.",
    features: [
      "AI-Powered Workflow Automation",
      "Intelligent Document Processing (OCR)",
      "Automated Data Entry & Syncing",
      "Custom Zapier / Make Integrations",
      "Predictive Analytics Models",
      "Enterprise Automation Consulting"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Reduce the need for manual data entry staff and lower operational overheads." },
      { title: "Zero Human Error", desc: "AI systems process data with 100% accuracy, eliminating costly mistakes." },
      { title: "Faster Turnaround", desc: "Tasks that took hours can now be completed in seconds by AI scripts." },
      { title: "Scalable Operations", desc: "Grow your business volume without linearly increasing your headcount." },
      { title: "Data Insights", desc: "Uncover hidden patterns in your data using machine learning algorithms." }
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying repetitive manual tasks suitable for AI automation." },
      { step: "02", title: "Solution Design", desc: "Architecting the AI model and integration pathways." },
      { step: "03", title: "Implementation", desc: "Developing and training the AI agents on your specific business data." },
      { step: "04", title: "Deployment", desc: "Rolling out the automation and monitoring its impact on efficiency." }
    ],
    icon: "Cpu",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 93,
    title: "CRM Development Company",
    slug: "crm-development-company",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 94,
    title: "Custom CRM Software",
    slug: "custom-crm-software",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 95,
    title: "Sales CRM Software",
    slug: "sales-crm-software",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 96,
    title: "Lead Management CRM",
    slug: "lead-management-crm",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 97,
    title: "Customer Management Software",
    slug: "customer-management-software",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 98,
    title: "Education CRM",
    slug: "education-crm",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 99,
    title: "Healthcare CRM",
    slug: "healthcare-crm",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 100,
    title: "CRM Development Services",
    slug: "crm-development-services",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 101,
    title: "Best CRM Software For Real Estate",
    slug: "best-crm-software-for-real-estate",
    isSeoOnly: true,
    description: "Custom CRM software development tailored for education, healthcare, and B2B sales lead management.",
    longDescription: "Don't settle for generic CRMs that force you to change how you work. We build Custom CRM software designed specifically around your unique sales process. Whether you need an Education CRM for student admissions or a Healthcare CRM for patient management, our platforms are scalable and secure.",
    features: [
      "Custom Lead Management Pipelines",
      "Automated Task & Follow-up Creation",
      "Third-Party API Integrations",
      "Role-Based Access Control",
      "Custom Reporting Dashboards",
      "Mobile-Friendly Interfaces"
    ],
    benefits: [
      { title: "Perfect Fit", desc: "A CRM built entirely around your business logic, terminology, and workflows." },
      { title: "No Subscription Fees", desc: "Avoid paying per-user monthly fees by owning your custom software." },
      { title: "High Security", desc: "Enterprise-grade encryption and dedicated servers to protect your client data." },
      { title: "Seamless Integration", desc: "Connects flawlessly with your existing website, ERP, and marketing tools." },
      { title: "Enhanced Productivity", desc: "Automate repetitive data entry so your team can focus on selling." }
    ],
    process: [
      { step: "01", title: "Requirements Gathering", desc: "Documenting your exact sales funnel, data fields, and user roles." },
      { step: "02", title: "Wireframing", desc: "Creating the UI/UX design for your custom CRM dashboard." },
      { step: "03", title: "Development", desc: "Coding the backend architecture and frontend interfaces securely." },
      { step: "04", title: "Data Migration", desc: "Securely importing your existing leads and training your team." }
    ],
    icon: "Users",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 102,
    title: "Real Estate CRM Software",
    slug: "real-estate-crm-software",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 103,
    title: "Builder CRM Software",
    slug: "builder-crm-software",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 104,
    title: "Property CRM",
    slug: "property-crm",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 105,
    title: "Property Management CRM",
    slug: "property-management-crm",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 106,
    title: "Real Estate Sales CRM",
    slug: "real-estate-sales-crm",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 107,
    title: "Real Estate Lead Management",
    slug: "real-estate-lead-management",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 108,
    title: "Builder Lead Management",
    slug: "builder-lead-management",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 109,
    title: "Township Management Software",
    slug: "township-management-software",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 110,
    title: "Real Estate Automation",
    slug: "real-estate-automation",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 111,
    title: "Real Estate Marketing Automation",
    slug: "real-estate-marketing-automation",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 112,
    title: "Property Dealer CRM",
    slug: "property-dealer-crm",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 113,
    title: "Best Real Estate CRM Software",
    slug: "best-real-estate-crm-software",
    isSeoOnly: true,
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 114,
    title: "Lead Generation Company",
    slug: "lead-generation-company",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 115,
    title: "Lead Generation Services",
    slug: "lead-generation-services",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 116,
    title: "B2B Lead Generation",
    slug: "b2b-lead-generation",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 117,
    title: "B2B Leads Provider",
    slug: "b2b-leads-provider",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 118,
    title: "Business Leads Database",
    slug: "business-leads-database",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 119,
    title: "Verified Leads Database",
    slug: "verified-leads-database",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 120,
    title: "Decision Maker Database",
    slug: "decision-maker-database",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 121,
    title: "Company Database India",
    slug: "company-database-india",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 122,
    title: "Business Contact Database",
    slug: "business-contact-database",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 123,
    title: "Marketing Leads",
    slug: "marketing-leads",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 124,
    title: "Real Estate Leads",
    slug: "real-estate-leads",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 125,
    title: "School Leads",
    slug: "school-leads",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 126,
    title: "Education Leads",
    slug: "education-leads",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 127,
    title: "Best Lead Generation Company In India",
    slug: "best-lead-generation-company-in-india",
    isSeoOnly: true,
    description: "Targeted B2B lead generation services and verified business databases to fuel your sales pipeline.",
    longDescription: "Accelerate your revenue with our premium B2B lead generation services. We combine advanced data mining, LinkedIn outreach, and targeted cold email campaigns to deliver highly qualified, decision-maker leads directly to your sales team.",
    features: [
      "Targeted B2B Prospecting",
      "Verified Business Contact Databases",
      "LinkedIn & Cold Email Outreach",
      "Lead Qualification & Scoring",
      "Appointment Setting Services",
      "Real Estate & Education Leads"
    ],
    benefits: [
      { title: "Guaranteed Quality", desc: "We provide highly verified data, ensuring low bounce rates and high engagement." },
      { title: "Decision Makers Only", desc: "Bypass gatekeepers and pitch directly to CEOs, Founders, and Directors." },
      { title: "Predictable Pipeline", desc: "Ensure your sales team always has a consistent flow of fresh prospects." },
      { title: "Time Savings", desc: "We handle the grueling prospecting work so you can focus on closing." },
      { title: "Niche Targeting", desc: "Filter leads by specific industries, company size, revenue, and location." }
    ],
    process: [
      { step: "01", title: "Ideal Customer Profile", desc: "Defining exactly who your perfect buyer is." },
      { step: "02", title: "Data Mining", desc: "Extracting and verifying contact details using our proprietary tools." },
      { step: "03", title: "Campaign Launch", desc: "Initiating multi-channel outreach (Email, LinkedIn, Calls)." },
      { step: "04", title: "Lead Handoff", desc: "Transferring warm, interested prospects directly to your CRM." }
    ],
    icon: "Filter",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 128,
    title: "Saas Development Company",
    slug: "saas-development-company",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 129,
    title: "Saas Application Development",
    slug: "saas-application-development",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 130,
    title: "Custom Software Development",
    slug: "custom-software-development",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 131,
    title: "Web Application Development",
    slug: "web-application-development",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 132,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 133,
    title: "Enterprise Software Development",
    slug: "enterprise-software-development",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 134,
    title: "Startup Software Development",
    slug: "startup-software-development",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 135,
    title: "Saas Product Development",
    slug: "saas-product-development",
    isSeoOnly: true,
    description: "End-to-end SaaS application development for startups and enterprises seeking scalable cloud software.",
    longDescription: "Turn your vision into a scalable, revenue-generating product with our SaaS development services. Our expert engineering team builds robust, multi-tenant web applications with secure architectures, subscription billing integrations, and modern tech stacks like Next.js and Node.js.",
    features: [
      "Multi-Tenant Architecture Design",
      "Subscription Billing (Stripe/Razorpay)",
      "High-Performance API Development",
      "Scalable Cloud Hosting (AWS/GCP)",
      "Automated CI/CD Pipelines",
      "SaaS Product Consulting"
    ],
    benefits: [
      { title: "Rapid Go-To-Market", desc: "Our agile sprints ensure you launch your MVP quickly to test the market." },
      { title: "Infinite Scalability", desc: "Built on serverless architectures that can handle millions of concurrent users." },
      { title: "Bank-Grade Security", desc: "Implementation of JWT auth, data encryption, and regular vulnerability audits." },
      { title: "Flawless UX", desc: "Beautiful, intuitive interfaces that ensure low churn and high user retention." },
      { title: "Full IP Ownership", desc: "You retain 100% of the source code and intellectual property." }
    ],
    process: [
      { step: "01", title: "Product Strategy", desc: "Defining the MVP features, user personas, and tech stack." },
      { step: "02", title: "UI/UX Design", desc: "Creating high-fidelity prototypes of the SaaS platform." },
      { step: "03", title: "Agile Engineering", desc: "Developing frontend, backend, and billing systems in two-week sprints." },
      { step: "04", title: "Launch & Support", desc: "Deploying to production and providing ongoing technical maintenance." }
    ],
    icon: "Cloud",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 136,
    title: "AI Chatbot Development",
    slug: "ai-chatbot-development",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 137,
    title: "AI Chatbot Company",
    slug: "ai-chatbot-company",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 138,
    title: "Chatbot For Business",
    slug: "chatbot-for-business",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 139,
    title: "Customer Support Chatbot",
    slug: "customer-support-chatbot",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 140,
    title: "Website Chatbot",
    slug: "website-chatbot",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 141,
    title: "WhatsApp AI Chatbot",
    slug: "whatsapp-ai-chatbot",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 142,
    title: "Lead Generation Chatbot",
    slug: "lead-generation-chatbot",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 143,
    title: "Sales Chatbot",
    slug: "sales-chatbot",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 144,
    title: "Chatgpt Chatbot Integration",
    slug: "chatgpt-chatbot-integration",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 145,
    title: "Best WhatsApp Chatbot Company",
    slug: "best-whatsapp-chatbot-company",
    isSeoOnly: true,
    description: "Intelligent ChatGPT-powered AI chatbots for websites and WhatsApp to automate customer support and sales.",
    longDescription: "Elevate your customer experience with cutting-edge AI Chatbot development. We integrate large language models (like ChatGPT) directly into your website or WhatsApp. These aren't generic menu-based bots; they understand context, answer complex queries based on your knowledge base, and capture leads naturally.",
    features: [
      "Custom LLM / ChatGPT Integration",
      "Website & WhatsApp Deployment",
      "Knowledge Base Training",
      "Lead Generation & Form Capture",
      "Human Agent Handoff Protocols",
      "Multilingual AI Support"
    ],
    benefits: [
      { title: "Human-Like Conversations", desc: "Deliver highly contextual and accurate answers using advanced NLP." },
      { title: "Always On", desc: "Provide instant resolutions to customer queries 24/7/365." },
      { title: "Fewer Support Tickets", desc: "Automatically resolve up to 80% of routine inquiries instantly." },
      { title: "Natural Lead Capture", desc: "Collect emails and phone numbers smoothly during the conversation." },
      { title: "Consistent Brand Voice", desc: "Train the AI to speak exactly in your company's tone and style." }
    ],
    process: [
      { step: "01", title: "Data Training", desc: "Ingesting your website content, FAQs, and documents into the AI model." },
      { step: "02", title: "Bot Design", desc: "Defining the chatbot's personality, guardrails, and fallback behaviors." },
      { step: "03", title: "Integration", desc: "Embedding the bot on your website and connecting it to WhatsApp." },
      { step: "04", title: "Optimization", desc: "Analyzing chat transcripts to continuously improve the AI's accuracy." }
    ],
    icon: "MessageCircle",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: 146,
    title: "Whatspilot Vs Wati",
    slug: "whatspilot-vs-wati",
    isSeoOnly: true,
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 147,
    title: "Whatspilot Vs Interakt",
    slug: "whatspilot-vs-interakt",
    isSeoOnly: true,
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 148,
    title: "Whatspilot Vs Aisensy",
    slug: "whatspilot-vs-aisensy",
    isSeoOnly: true,
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 149,
    title: "Whatspilot Vs Zoko",
    slug: "whatspilot-vs-zoko",
    isSeoOnly: true,
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 150,
    title: "Whatspilot Vs Gallabox",
    slug: "whatspilot-vs-gallabox",
    isSeoOnly: true,
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 151,
    title: "Whatspilot Alternatives",
    slug: "whatspilot-alternatives",
    isSeoOnly: true,
    description: "Engage your customers directly on WhatsApp with targeted broadcast campaigns and smart AI chatbot automations.",
    longDescription: "Transform how you communicate with your audience using our enterprise WhatsApp Marketing & Automation solutions. We build sophisticated WhatsApp flows that nurture leads, provide instant customer support, and drive sales directly through the world's most popular messaging app.",
    features: ["Automated Chatbot Workflows", "Bulk WhatsApp Broadcasting", "CRM & API Integrations", "Green Tick Verification Support"],
    benefits: [
      { title: "Incredible Open Rates", desc: "WhatsApp messages boast a 98% open rate, guaranteeing your message is seen." },
      { title: "24/7 Instant Support", desc: "Automate FAQs and customer service to provide immediate responses around the clock." },
      { title: "Conversational Commerce", desc: "Guide users through the purchasing journey seamlessly within their chat window." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "API Setup", desc: "Configuring the WhatsApp Business API and securing approvals." },
      { step: "02", title: "Flow Design", desc: "Mapping out the conversational logic and user journeys." },
      { step: "03", title: "Integration", desc: "Connecting the WhatsApp bots to your CRM and backend systems." },
      { step: "04", title: "Campaign Launch", desc: "Executing broadcast campaigns and monitoring engagement." }
    ],
    icon: "MessageCircle",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 13,
    title: "ERP Software Solutions",
    slug: "erp-software-solutions",
    description: "Enterprise Resource Planning (ERP) software specializing in School, College, and University Management systems, alongside tailored modules for manufacturing, real estate, and retail.",
    longDescription: "AICLEX™ Technologies provides robust, customized, and scalable Enterprise Resource Planning (ERP) software solutions, with a primary specialization in advanced School, College, and University Campus Management systems. Our solutions integrate admissions portals, automated online fee collection with WhatsApp notifications, student-parent information systems, smart timetable schedulers, and grade book generators. Alongside educational ERPs, we design tailored modules for accounting, inventory, HRMS, CRM, and supply chain management for all major industries. Designed to eliminate administrative complexity, our ERP systems allow schools, colleges, and multi-industry corporations to operate with unified efficiency.",
    features: [
      "All-in-One Educational ERP (Fee collection, admissions, grading, parent portal)",
      "Custom Module Development (CRM, HRMS, Accounting, Inventory & Asset tracking)",
      "Dynamic Timetable, Library, and Hostel Management systems",
      "Real-time Dashboards, Reports, and Campus Analytics",
      "Seamless API Integrations (Payment Gateways, SMS & WhatsApp APIs)",
      "Secure Cloud-based Hosting with Advanced Role-based Access Control"
    ],
    benefits: [
      { title: "Specialized Campus Automation", desc: "Completely automate admissions, secure online fee gateways, track daily student/staff attendance, and send automated notifications to parents." },
      { title: "Departmental Synchronization", desc: "Connect admin, academic, finance, and logistics teams in real-time, eliminating data silos and double entries." },
      { title: "Scalable Cloud Architecture", desc: "Our ERP systems scale organically to handle unlimited student batches, transaction volumes, and legacy data migrations." },
      ...commonBenefits.slice(0, 2)
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "We map your current processes across all departments to identify bottlenecks." },
      { step: "02", title: "System Prototyping", desc: "Designing user journeys, custom modules, database architectures, and UI wireframes." },
      { step: "03", title: "Core Coding & Integrations", desc: "Developing secure backend frameworks, API gateways, and importing legacy records." },
      { step: "04", title: "QA Testing & Onboarding", desc: "Performing extreme load testing followed by comprehensive employee training and live deployment." }
    ],
    icon: "Database",
    color: "from-indigo-600 to-purple-800",
  },
  {
    id: 14,
    title: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "End-to-end Real Estate CRM software to manage property leads, builder projects, broker commissions, and township sales automation.",
    longDescription: "AICLEX™ Technologies builds specialized Real Estate CRM software tailored for builders, property developers, and real estate agencies in India. Our platform automates lead capturing, site visit scheduling, property inventory tracking, and sales pipeline management. By integrating directly with WhatsApp APIs and property portals, we help real estate teams close deals faster without losing any prospects in the pipeline.",
    features: [
      "Property Inventory & Plot Management",
      "Automated Lead Capture (Facebook/WhatsApp/MagicBricks)",
      "Site Visit Scheduling & Follow-up Reminders",
      "Broker & Channel Partner Commission Tracking",
      "Dynamic Pricing & Payment Plan Generators",
      "Direct WhatsApp API & Telephony Integration"
    ],
    benefits: [
      { title: "Zero Lead Leakage", desc: "Automatically capture leads from all marketing channels directly into one centralized dashboard." },
      { title: "Automated Follow-ups", desc: "Trigger instant WhatsApp messages to prospects the moment they submit an inquiry for a property." },
      { title: "Inventory Synchronization", desc: "Real-time updates on plot availability across all sales teams, preventing double-bookings." },
      { title: "Broker Management", desc: "Track channel partner performance and calculate commissions automatically based on successful closures." },
      { title: "Increased Conversions", desc: "Equip your sales team with complete prospect history and follow-up tools to close deals faster." }
    ],
    process: [
      { step: "01", title: "Sales Process Mapping", desc: "We map your entire real estate sales journey from lead generation to final booking." },
      { step: "02", title: "System Setup", desc: "Configuring property inventory, project details, and pricing structures in the CRM." },
      { step: "03", title: "API Integrations", desc: "Connecting your Facebook Ads, property portals, and WhatsApp API for automated lead flow." },
      { step: "04", title: "Training & Launch", desc: "Onboarding your sales teams and brokers to maximize CRM adoption and performance." }
    ],
    icon: "Home",
    color: "from-blue-600 to-cyan-700",
  },
  {
    id: 15,
    title: "WhatsApp Business API",
    slug: "whatsapp-business-api",
    description: "Official WhatsApp Business API integration for enterprise messaging, bulk broadcasting, and secure customer support.",
    longDescription: "AICLEX Technologies is a leading WhatsApp Business Solution Provider offering official WhatsApp Cloud API integrations. We empower businesses to send bulk promotional broadcasts, transactional alerts, and provide 24/7 customer support on WhatsApp with green tick verification.",
    features: [
      "Official WhatsApp API Integration",
      "Green Tick Verification Support",
      "Unlimited Bulk Broadcasting",
      "Interactive Buttons & List Messages",
      "Template Message Approvals",
      "Seamless CRM & ERP Sync"
    ],
    benefits: [
      { title: "Highest Open Rates", desc: "Achieve 98% open rates compared to traditional email or SMS marketing." },
      { title: "Brand Trust", desc: "Get the coveted Green Tick badge to establish trust and authenticity with your customers." },
      { title: "Automated Workflows", desc: "Trigger automatic order updates, payment links, and delivery notifications." },
      { title: "Two-Way Communication", desc: "Allow customers to reply and interact via buttons directly inside their chat." },
      { title: "No Blocking Risks", desc: "Unlike unofficial tools, using the official API ensures your business number is never banned." }
    ],
    process: [
      { step: "01", title: "Business Verification", desc: "We assist in verifying your Meta Business Manager to unlock API access." },
      { step: "02", title: "API Configuration", desc: "Setting up your WhatsApp Cloud API environment and billing." },
      { step: "03", title: "Template Design", desc: "Drafting and submitting high-converting message templates for Meta approval." },
      { step: "04", title: "Go Live", desc: "Integrating the API with your existing CRM and launching your first broadcast." }
    ],
    icon: "MessageSquare",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 16,
    title: "JioHotstar Ads",
    slug: "jiohotstar-ads",
    description: "Launch premium high-ROI video ad campaigns on JioHotstar (Disney+ Hotstar) to reach millions of viewers during live sports like TATA IPL, popular TV shows, and blockbuster movies.",
    longDescription: "Maximize your brand visibility on India's top OTT platform. As a verified agency partner for JioHotstar Ads (Disney+ Hotstar), AICLEX SOLUTIONS PRIVATE LIMITED helps brands plan, execute, and scale targeted video ad campaigns. From high-impact live sports sponsorships (such as TATA IPL and ICC tournaments) to precise socio-demographic targeting on entertainment channels, we provide complete media strategy, creative validation, and transparent real-time analytics to ensure every rupee spent translates into growth.",
    features: [
      "Live Sports Ads (TATA IPL, ICC World Cups)",
      "Socio-Demographic & Interest Targeting",
      "Interactive Connected TV (CTV) Ads",
      "Unskippable Mid-roll & Pre-roll Video Formats",
      "Real-time Dashboard Analytics & Campaign Auditing",
      "Official JioHotstar Ads Agency Partner Access"
    ],
    benefits: [
      { title: "Official Agency Credentials", desc: "Access premium inventory and direct campaign support from Hotstar Ad Manager through our verified agency account." },
      { title: "Precise Audience Filters", desc: "Target viewers by city/state, age, gender, device cost, network speed, and streaming preferences." },
      { title: "Unmatched View Rates", desc: "Our unskippable video ad strategies deliver view-through rates (VTR) exceeding 90%." },
      { title: "Connected TV (CTV) Targeting", desc: "Showcase your brand in stunning 4K on smart TVs, targeting premium households with high disposable income." },
      { title: "Govt. Recognized Trust", desc: "AICLEX is a DPIIT Recognized Startup (DIPP271379) under the Government of India, ensuring transparent operations and escrow options." }
    ],
    process: [
      { step: "01", title: "Strategy & Media Planning", desc: "Analyzing your target audience and creating a customized budget plan with projected cost-per-view (CPV)." },
      { step: "02", title: "Creative Compliance Check", desc: "Formatting and auditing your video assets to meet JioHotstar's strict quality and legal guidelines." },
      { step: "03", title: "Campaign Tuning", desc: "Configuring precise demography, geography, interest tags, and ad placements in Hotstar Ad Manager." },
      { step: "04", title: "Launch & Optimization", desc: "Monitoring pacing and adjusting bids daily to maximize impressions and view-through rates." }
    ],
    icon: "Tv",
    color: "from-amber-500 to-[#ff914d]"
  }
];
