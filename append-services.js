const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib/servicesData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Remove the last ];
content = content.trim().replace(/\];$/, '');
if (content.endsWith('}')) {
    content += ',\n';
}

const newServices = `  {
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
  }
];`;

content += newServices;

fs.writeFileSync(filePath, content);
console.log('Appended 7 new services to servicesData.ts');
