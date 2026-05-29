import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "@/components/ServiceIcon"; 
import LeadForm from "@/components/LeadForm";
import { 
  CheckCircle, ArrowLeft, Home, Factory, 
  Store, HeartPulse, GraduationCap, Briefcase 
} from "lucide-react";
import { Metadata } from "next";
import { servicesData } from "@/lib/servicesData";
import { getCityName, majorCities } from "@/lib/citiesData";

// Updated components
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";
import ServiceSchema from "@/components/seo/ServiceSchema";

export const dynamic = 'force-dynamic';

interface ServiceDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  icon: string;
  color: string;
  isSeoOnly?: boolean;
}

type Props = {
  params: Promise<{ slug: string }>;
};

async function getService(slug: string): Promise<{ service: ServiceDetail | null, city: string | null }> {
  // Pattern: service-slug-in-city-slug
  if (slug.includes("-in-")) {
    const parts = slug.split("-in-");
    const serviceSlug = parts[0];
    const citySlug = parts[1];
    const cityName = getCityName(citySlug);
    
    if (cityName) {
      const service = servicesData.find((s) => s.slug === serviceSlug);
      if (service) {
        return { service: service as ServiceDetail, city: cityName };
      }
    }
  }

  const service = servicesData.find((s) => s.slug === slug);
  return { service: (service as ServiceDetail) || null, city: null };
}

interface CityContext {
  industry: string;
  landmark: string;
  localTerm: string;
}

function getCityContext(city: string): CityContext {
  const c = city.toLowerCase();
  
  if (c.includes("mumbai")) {
    return {
      industry: "financial institutions, corporate headquarters, and media agencies",
      landmark: "Bandra Kurla Complex (BKC) and Nariman Point",
      localTerm: "India's financial capital"
    };
  }
  if (c.includes("bangalore") || c.includes("bengaluru")) {
    return {
      industry: "cutting-edge software startups, aerospace companies, and tech giants",
      landmark: "Whitefield, Electronic City, and Koramangala",
      localTerm: "the Silicon Valley of India"
    };
  }
  if (c.includes("delhi")) {
    return {
      industry: "e-commerce brands, government agencies, and retail enterprises",
      landmark: "Connaught Place, Okhla Industrial Area, and Nehru Place",
      localTerm: "the national capital region"
    };
  }
  if (c.includes("gurgaon") || c.includes("gurugram")) {
    return {
      industry: "multinational corporations, tech consultancies, and modern real estate firms",
      landmark: "Cyber City, Golf Course Road, and Sector 49",
      localTerm: "the leading corporate hub of Haryana"
    };
  }
  if (c.includes("noida") || c.includes("greater noida")) {
    return {
      industry: "IT parks, manufacturing units, and top-tier educational institutions",
      landmark: "Sector 62, Film City, and Expressway business parks",
      localTerm: "the fast-growing corporate core of UP"
    };
  }
  if (c.includes("hyderabad")) {
    return {
      industry: "pharmaceutical majors, global IT services, and biotechnology firms",
      landmark: "HITEC City, Gachibowli, and Madhapur",
      localTerm: "the historic Cyberabad region"
    };
  }
  if (c.includes("pune")) {
    return {
      industry: "automotive giants, IT outsourcing centers, and prestigious engineering colleges",
      landmark: "Hinjewadi IT Park, Kharadi, and Viman Nagar",
      localTerm: "the Oxford of the East"
    };
  }
  if (c.includes("chennai")) {
    return {
      industry: "automobile manufacturers, SaaS startups, and healthcare facilities",
      landmark: "OMR IT Corridor, Guindy Industrial Estate, and T-Nagar",
      localTerm: "the Detroit of India"
    };
  }
  if (c.includes("kolkata")) {
    return {
      industry: "traditional trade houses, creative agencies, and emerging tech centers",
      landmark: "Salt Lake Sector V, New Town, and Park Street",
      localTerm: "the cultural and commercial gateway of the East"
    };
  }
  if (c.includes("ahmedabad")) {
    return {
      industry: "pharmaceutical giants, textile mills, and chemical industries",
      landmark: "SG Highway, GIFT City, and Ashram Road",
      localTerm: "the commercial heart of Gujarat"
    };
  }
  if (c.includes("surat")) {
    return {
      industry: "diamond polishing centers, textile manufacturing hubs, and trade houses",
      landmark: "Varachha, Ring Road commercial markets, and Ichchhapor",
      localTerm: "the diamond capital of the world"
    };
  }
  if (c.includes("jaipur")) {
    return {
      industry: "handicraft exporters, tourism brands, and emerging gemstone traders",
      landmark: "Malviya Nagar, Sitapura Industrial Area, and Mansarovar",
      localTerm: "the Pink City"
    };
  }
  if (c.includes("lucknow")) {
    return {
      industry: "retail chains, handicraft exporters, and educational institutes",
      landmark: "Hazratganj, Gomti Nagar, and Alambagh commercial zones",
      localTerm: "the city of Nawabs"
    };
  }
  if (c.includes("kota")) {
    return {
      industry: "national coaching centers, prestigious schools, and educational institutes",
      landmark: "Indraprastha Industrial Area and Rajiv Gandhi Nagar",
      localTerm: "the coaching capital of India"
    };
  }
  if (c.includes("dehradun")) {
    return {
      industry: "prestigious boarding schools, research institutes, and tourism agencies",
      landmark: "Rajpur Road, Patel Nagar, and Subhash Nagar",
      localTerm: "the educational hub of Uttarakhand"
    };
  }
  if (c.includes("chandigarh") || c.includes("mohali") || c.includes("panchkula")) {
    return {
      industry: "IT outsourcing agencies, educational centers, and pharma consultancies",
      landmark: "Sector 17, Rajiv Gandhi Chandigarh Technology Park, and Phase 8 Mohali",
      localTerm: "the beautiful tri-city region"
    };
  }

  // Default fallback for any other city
  const hashCode = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fallbackIndustries = [
    "commercial enterprises, retail showrooms, and local service providers",
    "growing SMEs, manufacturing workshops, and regional trading houses",
    "private colleges, healthcare clinics, and business consultancies",
    "agricultural trading hubs, logistics services, and expanding retail markets"
  ];
  const fallbackLandmarks = [
    "the central commercial district and main market lanes",
    "the industrial estate and primary business corridors",
    "the main bypass roads and commercial hubs",
    "the central trading zones and corporate offices"
  ];
  const fallbackTerms = [
    `the major economic hub of the district`,
    `a fast-developing urban trade center`,
    `a key focus market for digital growth`,
    `a rapidly growing commercial center`
  ];

  return {
    industry: fallbackIndustries[hashCode % fallbackIndustries.length],
    landmark: fallbackLandmarks[(hashCode + 2) % fallbackLandmarks.length],
    localTerm: fallbackTerms[(hashCode + 5) % fallbackTerms.length]
  };
}

function generateLocationContent(serviceTitle: string, city: string) {
  const context = getCityContext(city);
  const intros = [
    `Transforming the business landscape in ${city} with world-class ${serviceTitle.toLowerCase()} solutions tailored for ${context.industry}.`,
    `Empowering ${city}-based enterprises to dominate their niche using data-driven ${serviceTitle.toLowerCase()} strategies around ${context.landmark}.`,
    `Your trusted local partner for premium ${serviceTitle.toLowerCase()} in ${city}, delivering measurable growth and high ROI across ${context.localTerm}.`,
    `AICLEX™ Technologies brings cutting-edge ${serviceTitle.toLowerCase()} expertise directly to the doorstep of businesses and institutions in ${city}.`
  ];

  const cityContexts = [
    `As ${city} continues to grow as a major economic hub, having a strong ${serviceTitle.toLowerCase()} strategy is no longer optional—it's a necessity for survival in ${context.localTerm}.`,
    `In the fast-paced markets of ${city}, our ${serviceTitle.toLowerCase()} services provide the competitive edge your business needs to stand out from other brands near ${context.landmark}.`,
    `The digital ecosystem in ${city} is evolving rapidly. We help local businesses stay ahead of the curve with innovative ${serviceTitle.toLowerCase()} techniques customized for ${context.industry}.`,
    `Whether you are a startup in ${city} or an established enterprise near ${context.landmark}, our ${serviceTitle.toLowerCase()} solutions are engineered to meet specific demands.`
  ];

  const seed = (serviceTitle.length + city.length) % intros.length;
  const contextSeed = (city.length * serviceTitle.length) % cityContexts.length;

  return {
    intro: intros[seed],
    context: cityContexts[contextSeed]
  };
}

function generateLocationStats(city: string) {
  const hashCode = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const projects = (hashCode * 13) % 40 + 35; // 35-75
  const clients = (hashCode * 7) % 25 + 20; // 20-45
  const growth = (hashCode * 9) % 15 + 85; // 85-100%
  return { projects, clients, growth };
}

function generateUniqueTitle(serviceTitle: string, city: string, seed: number) {
  const prefixes = ["Best", "Top-rated", "Professional", "Expert", "Leading", "Premium", "Reliable", "Trusted", "#1"];
  const types = ["Company", "Agency", "Services", "Solutions", "Partner", "Provider", "Consultancy", "Experts"];
  const catchphrases = ["for Businesses", "at Best Price", "in India", "2025", "Expert Team", "Boost Growth", "ROI Focused"];

  const p = prefixes[seed % prefixes.length];
  const t = types[Math.floor(seed / prefixes.length) % types.length];
  const c = catchphrases[Math.floor(seed / (prefixes.length * types.length)) % catchphrases.length];

  if (seed % 2 === 0) {
    return `${p} ${serviceTitle} ${t} in ${city} | ${c}`;
  } else {
    return `${serviceTitle} in ${city} - ${p} ${t} | AICLEX`;
  }
}

function getCitySeed(cityName: string, serviceSlug: string): number {
  const str = cityName + serviceSlug;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getCityServiceData(originalService: ServiceDetail, city: string): ServiceDetail {
  const seed = getCitySeed(city, originalService.slug);
  const cleanTitle = originalService.title.replace(/ In India| in India| in india/gi, '');
  const context = getCityContext(city);

  // 1. Generate unique Description
  const descriptions = [
    `Bespoke ${cleanTitle.toLowerCase()} engineered specifically for businesses in ${city}. AICLEX™ Technologies helps local brands in ${context.localTerm} automate, scale, and achieve exceptional market growth.`,
    `Searching for the best ${cleanTitle.toLowerCase()} in ${city}? Our dedicated technical team builds high-performance solutions tailored to the regional business ecosystem near ${context.landmark}.`,
    `AICLEX™ Technologies is a premier provider of ${cleanTitle.toLowerCase()} in ${city}. We deliver secure, scalable, and custom-designed modules to streamline your workflows across ${context.localTerm}.`,
    `Empower your ${city}-based company with expert ${cleanTitle.toLowerCase()} solutions. We build secure cloud architectures to synchronize your operations near ${context.landmark} and reduce overheads.`
  ];
  const chosenDescription = descriptions[seed % descriptions.length];

  // 2. Generate unique Long Description (stitching paragraphs dynamically with absolute independence)
  const p1Options = [
    `In the rapidly expanding business landscape of ${city} (${context.localTerm}), AICLEX™ Technologies is a premier provider of customized ${cleanTitle.toLowerCase()} solutions. We collaborate closely with local enterprises, especially near ${context.landmark}, to streamline manual operations, enhance client satisfaction, and capture market share in a highly competitive digital economy.`,
    `As organizations across ${city} undergo rapid digital transformation, having a high-performance ${cleanTitle.toLowerCase()} system is no longer optional—it is a critical necessity for survival. AICLEX™ Technologies delivers bespoke engineering to help ${context.localTerm}'s top institutions and corporate brands near ${context.landmark} scale effortlessly.`,
    `AICLEX™ Technologies brings world-class ${cleanTitle.toLowerCase()} expertise directly to the doorstep of companies in ${city}. We understand the unique challenges faced by local ${context.industry} and build reliable systems that eliminate departmental silos.`,
    `For startups, SMEs, and large corporations in ${city} looking to achieve sustainable operational efficiency, AICLEX™ Technologies offers top-tier ${cleanTitle.toLowerCase()} consulting and development. We design robust architectures tailored specifically to the regional business environment of ${context.localTerm}, with on-site deployment capabilities around ${context.landmark}.`
  ];

  const p2Options = [
    `Our engineering methodology focuses on building secure, fast-loading, and completely custom-designed systems from scratch. By integrating payment gateways, CRM flows, and automated notification systems for ${context.industry}, we remove departmental silos and let your team operate with unified efficiency.`,
    `Every module and workflow we construct is designed directly around your company's actual operational challenges in ${city}. We eliminate legacy bottlenecks, synchronize inventory/leads, and implement role-based cloud permissions to secure your data in ${context.localTerm}.`,
    `Leveraging state-of-the-art cloud hosting, automated backend workflows, and robust security protocols, we ensure your system runs smoothly under extreme peak loads. Our modern UI designs are crafted to offer intuitive navigation with minimal training required for companies across ${context.landmark}.`,
    `From seamless legacy data migration to advanced reporting dashboards, we cover every technical detail. Our focus is on automating manual data entry, reducing human errors, and maximizing productivity across the growing ${context.industry} sectors in ${city}.`
  ];

  const p3OptionsGeneric = [
    `AICLEX™ Technologies provides 24/7 dedicated support and training modules for all clients in ${city}, ensuring your team transitions seamlessly with zero operational downtime.`,
    `By partnering with AICLEX™ in ${city}, you gain a dedicated technical partner who understands the local consumer behavior, offering ongoing feature updates and performance optimizations across ${context.landmark}.`,
    `Our local team coordinates closely with your executives in ${city} from initial prototype wireframes to final QA testing and secure production launch, guaranteeing high-quality results for ${context.localTerm}'s business community.`,
    `We provide highly customizable and scalable pricing packages for businesses in ${city}, ensuring that world-class software engineering and digital solutions are accessible to growing brands in the ${context.industry} fields.`
  ];

  const p3OptionsERP = [
    `Specifically for educational institutions, schools, and colleges based in ${city}, our flagship Campus ERP provides a completely integrated digital ecosystem. It handles student admissions, automated online fee collection schedules, exam report card builders, library cards, hostel assignments, and parent WhatsApp updates under a single unified dashboard, trusted by campuses in ${context.landmark}.`,
    `For academies, colleges, and private schools in ${city}, our specialized Educational ERP automates complex administrative workflows. Parents in the ${context.localTerm} region receive real-time fee receipt alerts and attendance notifications, significantly reducing manual coordination and follow-up overheads.`,
    `Our university and campus management ERP is highly trusted by leading educational brands in ${city}. We integrate secure local payment gateways with automatic WhatsApp and SMS notifications, making fee collection and parent-teacher communication extremely efficient across ${context.landmark}.`,
    `With our flagship school management ERP, campuses across ${city} can coordinate staff timetables, student attendance records, exams, and libraries under a highly secure, role-permissioned cloud infrastructure. This completely eliminates manual paperwork and cuts administrative costs, establishing a new benchmark in ${context.localTerm}.`
  ];

  // Mathematical decomposition to achieve true independence across 64 unique permutations
  const idx1 = seed % p1Options.length;
  const idx2 = Math.floor(seed / p1Options.length) % p2Options.length;
  const idx3 = Math.floor(seed / (p1Options.length * p2Options.length)) % p3OptionsGeneric.length;

  const p1 = p1Options[idx1];
  const p2 = p2Options[idx2];
  const p3 = originalService.slug === "erp-software-solutions"
    ? p3OptionsERP[idx3]
    : p3OptionsGeneric[idx3];

  const chosenLongDescription = `${p1} ${p2} ${p3}`;

  // 3. Generate unique Features list
  const uniqueFeatures = originalService.features ? [...originalService.features] : [];
  if (uniqueFeatures.length > 0) {
    const featureIndex = seed % uniqueFeatures.length;
    const cityFeatureAdditions = [
      `Tailored regional deployment with local compliance support in ${city}`,
      `Custom configurations engineered specifically for the ${city} market near ${context.landmark}`,
      `On-site onboarding workshops and dedicated executive coordination across ${context.localTerm}`,
      `Localized system integrations optimized for businesses operating in ${city}`
    ];
    uniqueFeatures[featureIndex] = cityFeatureAdditions[seed % cityFeatureAdditions.length];
  }

  // 4. Generate unique Benefits list
  const uniqueBenefits = originalService.benefits 
    ? originalService.benefits.map((b, idx) => {
        if (idx === 0) {
          return {
            title: b.title.includes("Campus") ? `Campus Automation in ${city}` : `${b.title} in ${city}`,
            desc: b.desc.replace(/companies|businesses/gi, `businesses in ${city}`).replace(/workflows/gi, `workflows across ${context.localTerm}`)
          };
        }
        if (idx === 1) {
          return {
            title: b.title,
            desc: `${b.desc} This has been highly optimized for local ${context.industry} operations in ${city}.`
          };
        }
        return b;
      })
    : [];

  // 5. Generate unique Process list
  const uniqueProcess = originalService.process
    ? originalService.process.map((p, idx) => {
        if (idx === 0) {
          return {
            ...p,
            desc: `${p.desc} We study your direct competitors in the ${city} ecosystem and ${context.landmark} corridor.`
          };
        }
        if (idx === 3) {
          return {
            ...p,
            desc: `${p.desc} Followed by dedicated launch support and training workshops for your staff in ${city} (${context.localTerm}).`
          };
        }
        return p;
      })
    : [];

  return {
    ...originalService,
    description: chosenDescription,
    longDescription: chosenLongDescription,
    features: uniqueFeatures,
    benefits: uniqueBenefits,
    process: uniqueProcess
  };
}

function generateCityFAQs(serviceTitle: string, city: string, seed: number) {
  const cleanTitle = serviceTitle.replace(/ In India| in India| in india/gi, '');
  const context = getCityContext(city);
  
  // FAQ 1 Answers
  const faq1Answers = [
    `AICLEX™ Technologies brings a powerful combination of technical expertise and local market intelligence to businesses in ${city}. We do not believe in one-size-fits-all blueprints; instead, our engineering team custom-tailors every ${cleanTitle.toLowerCase()} module to align with the regional market dynamics, consumer behaviors, and unique competitive environment of ${context.localTerm}.`,
    `AICLEX™ Technologies is widely trusted across ${city} because of our committed focus on security, scalability, and measurable ROI. Whether it is a specialized campus management ERP for school chains in ${city} or advanced automation for retail brands near ${context.landmark}, we build custom solutions using cutting-edge AI protocols and modern UI patterns to maximize efficiency.`,
    `We combine highly experienced software developers, solid security practices, and deep local insights to serve companies in ${city}. By automating repetitive manual inputs and synchronizing cross-departmental operations, we help organizations in ${context.localTerm} reduce administrative costs and outpace local competition.`,
    `AICLEX™ stands out in ${city} by delivering premium, cloud-hosted systems with role-based permissions and 24/7 technical support. We build intuitive portals that eliminate legacy software bottlenecks and require zero technical learning curve, allowing businesses across ${context.landmark} to scale without disruptions.`
  ];

  // FAQ 2 Answers
  const faq2Answers = [
    `The implementation and deployment timeline depends on the system complexity. Simple integrations can go live within 2-4 weeks, while comprehensive, multi-module systems (like a university-wide Campus ERP in ${city}) are prototyped, tested, and deployed within 6-12 weeks. Our regional sprint coordinators in ${context.landmark} ensure on-time delivery.`,
    `While custom software engineering takes precise planning, our sprint methodology enables us to launch initial prototype modules within 3-5 weeks. For businesses in ${city}, this allows your team to start onboarding while we securely scale the backend infrastructure, leading to rapid operational impact across ${context.localTerm}.`,
    `Most of our corporate and school clients in ${city} observe measurable efficiency improvements, reduced error rates, and automated report generation within the first 30 days of launch. We perform strict load testing before staging goes live to guarantee smooth performance in the ${context.landmark} region.`,
    `We design in weekly sprints to ensure transparent progress. From database architectural design to final user acceptance tests, our team in ${city} typically completes system deployment within 4 to 8 weeks, ensuring minimal disruption to daily operations in ${context.localTerm}.`
  ];

  // FAQ 3 Answers
  const faq3Answers = [
    `Yes, absolutely! We understand the financial challenges of startups, private academies, and small companies in ${city}. Our pricing packages are highly flexible and scalable, allowing you to pay only for the custom modules you actually require today, and scale seamlessly as your users in ${context.localTerm} increase.`,
    `Definitely. AICLEX™ is committed to supporting both local startups and growing educational institutions in ${city}. We provide customized engagement packages with modular billing, making top-tier software engineering and secure cloud hosting accessible to every business in the ${city} ecosystem around ${context.landmark}.`,
    `Yes, all of our solutions are highly scalable. We offer special customized plans for small businesses, schools, and growing organizations in ${city}, offering the exact same robust security standards and localized parent/client WhatsApp messaging channels as our enterprise plans across ${context.localTerm}.`,
    `Every project we deliver in ${city} comes with flexible package choices. You can start with basic core modules and add custom extensions (like inventory trackers or parent apps) as your revenue and user base expand across ${context.landmark} and neighboring markets.`
  ];

  // Decompose seed mathematically to ensure completely independent question options
  const idx1 = seed % faq1Answers.length;
  const idx2 = Math.floor(seed / faq1Answers.length) % faq2Answers.length;
  const idx3 = Math.floor(seed / (faq1Answers.length * faq2Answers.length)) % faq3Answers.length;

  return [
    {
      q: `Why is AICLEX™ the best ${serviceTitle} company in ${city}?`,
      a: faq1Answers[idx1]
    },
    {
      q: `How long does it take to deploy ${serviceTitle} solutions in ${city}?`,
      a: faq2Answers[idx2]
    },
    {
      q: `Do you offer customized packages for small businesses or schools in ${city}?`,
      a: faq3Answers[idx3]
    }
  ];
}

async function getAllServices(): Promise<ServiceDetail[]> {
  return servicesData as ServiceDetail[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { service: originalService, city } = await getService(slug);
  
  if (!originalService) return { title: "Service Not Found" };

  const service = city ? getCityServiceData(originalService, city) : originalService;

  // CRITICAL SEO FIX: Prevent cannibalization of "In India" keywords for local city pages
  const cleanServiceTitle = city 
    ? service.title.replace(/ In India| in India| in india/gi, '') 
    : service.title;

  const seed = city ? getCitySeed(city, service.slug) : 0;

  const title = city 
    ? generateUniqueTitle(cleanServiceTitle, city, seed)
    : `${service.title} | AICLEX™ Services`;

  const description = service.description;

  const currentUrl = `https://aiclex.in/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { service: originalService, city } = await getService(slug);
  const allServices = await getAllServices();

  if (!originalService) {
    return notFound();
  }

  const service = city ? getCityServiceData(originalService, city) : originalService;

  // Use clean title for local pages to prevent national keyword cannibalization
  const cleanServiceTitle = city 
    ? service.title.replace(/ In India| in India| in india/gi, '') 
    : service.title;

  const locationContent = city ? generateLocationContent(cleanServiceTitle, city) : null;
  const locationStats = city ? generateLocationStats(city) : null;
  const citySeed = city ? getCitySeed(city, service.slug) : 0;
  const cityFAQs = city ? generateCityFAQs(service.title, city, citySeed) : [];

  return (
    <div className="w-full mt-20 bg-white">
      <ServiceSchema 
        title={service.title} 
        description={service.description} 
        url={`https://aiclex.in/services/${slug}`} 
      />
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative w-full py-24 overflow-hidden bg-gray-50">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`}></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-6 space-x-2">
              <Link href="/" className="hover:text-[#5271ff] transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" /> Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#5271ff] transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-[#001341] truncate max-w-[200px] sm:max-w-xs">{cleanServiceTitle}</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#001341] mb-6 leading-tight">
              {cleanServiceTitle} {city && <span className="text-[#5271ff]">in {city}</span>}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {locationContent 
                ? locationContent.intro
                : service.description
              }
            </p>
            <Link 
              href="/contact"
              className={`inline-flex items-center px-8 py-4 rounded-full text-white font-bold shadow-lg bg-gradient-to-r ${service.color} hover:shadow-xl hover:scale-105 transition-all duration-300`}
            >
              Get Started
            </Link>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className={`w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl rotate-3 transform hover:rotate-6 transition-transform duration-500`}>
              <div className="scale-150 transform text-white">
                 <ServiceIcon iconName={service.icon} className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTENT SECTION ==================== */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- LEFT COLUMN (Main Content) --- */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* 1. Overview */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                Overview
                <div className={`ml-4 h-1 flex-grow bg-gradient-to-r ${service.color} rounded-full opacity-20`}></div>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {locationContent 
                  ? `${locationContent.context} ${service.longDescription}`
                  : service.longDescription
                }
              </p>
            </div>

            {/* Local Impact Stats for City */}
            {city && locationStats && (
              <div className="grid grid-cols-3 gap-4 py-8 px-6 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5271ff]">{locationStats.projects}+</div>
                  <div className="text-xs text-gray-500 font-medium">Projects in {city}</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-2xl font-bold text-[#5271ff]">{locationStats.clients}+</div>
                  <div className="text-xs text-gray-500 font-medium">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5271ff]">{locationStats.growth}%</div>
                  <div className="text-xs text-gray-500 font-medium">Success Rate</div>
                </div>
              </div>
            )}

            {/* ERP Custom Industry Showcase Section */}
            {service.slug === "erp-software-solutions" && (
              <div className="bg-gradient-to-br from-indigo-50/40 to-purple-50/40 p-8 rounded-3xl border border-indigo-100/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Industries We Serve</h3>
                <p className="text-slate-500 text-sm mb-8">Custom modules and workflows engineered to fit the unique operational needs of your specific industry sector.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Flagship: School, College & University ERP */}
                  <div className="p-5 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 rounded-2xl border-2 border-indigo-200/80 shadow-md hover:shadow-lg transition-shadow group relative overflow-hidden md:col-span-2">
                    <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      Flagship Solution
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-2">School, College & University Campus ERP</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      End-to-end student admission portals, online fee collection with auto-reminders, timetable schedules, grading systems, examination/report card builders, library cards, hostel allocations, and direct WhatsApp alerts for parents and staff.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Home className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Real Estate & Plot Management</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Integrated billing, property listings, plot status trackers, customer lead mapping, and real-time agent/broker commission modules.</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Factory className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Manufacturing & Inventory</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Material resources planning (MRP), stock tracking with automated low-stock alerts, warehouse syncing, and vendor supply chain analytics.</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Store className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Retail & E-commerce</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Multi-outlet Point of Sale (POS) synchronization, centralized inventory management, digital invoice generation, and customer loyalty flows.</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Healthcare & Clinics</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Secure Electronic Health Records (EHR), OPD/IPD billing system, digital doctor rosters, automated patient appointment reminders, and clinic analytics.</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Professional Services & HRMS</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Employee payroll processing, dynamic attendance tracking, leaves workflow management, project timesheets, and staff portals.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Key Features */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features?.map((feature, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors group">
                    <CheckCircle className="w-6 h-6 text-[#5271ff] mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Why Choose AICLEX? */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose AICLEX™ for {service.title} {city && `in ${city}`}?</h3>
              <div className="grid grid-cols-1 gap-6">
                {service.benefits?.map((benefit, index) => (
                   <div key={index} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                         {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{benefit.desc}</p>
                      </div>
                   </div>
                ))}
              </div>
            </div>

            {/* 4. Our Process */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Approach</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {service.process?.map((step, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-[#5271ff]">
                      {step.step}
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 shadow bg-white hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-slate-900">{step.title}</div>
                      </div>
                      <div className="text-slate-500 text-sm">{step.desc}</div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* 5. Location-based FAQ */}
            {city && cityFAQs.length > 0 && (
              <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 mt-12">
                <h3 className="text-2xl font-bold text-[#001341] mb-6">Frequently Asked Questions in {city}</h3>
                <div className="space-y-6">
                  {cityFAQs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN (Sidebar) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Other Services</h4>
                <div className="space-y-3">
                  {allServices.filter(s => s.slug !== service.slug && !s.isSeoOnly).slice(0, 5).map((s) => (
                    <Link 
                      key={s.id} 
                      href={`/services/${s.slug}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-[#5271ff] transition-all text-sm font-medium flex items-center justify-between group"
                    >
                      {s.title}
                      <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              <LeadForm 
                defaultService={service.title}
                defaultCity={city || "global"}
                isEmbedded={true}
              />

            </div>
          </div>

        </div>
      </section>

      {/* ==================== RELATED CITIES ==================== */}
      {city && (
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Also providing {cleanServiceTitle} in:</h3>
            <div className="flex flex-wrap gap-3">
              {majorCities
                .filter(c => c !== city)
                .slice(0, 15)
                .map(c => (
                  <Link 
                    key={c}
                    href={`/services/${originalService.slug}-in-${c.toLowerCase().replace(/\\s+/g, '-')}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:text-[#5271ff] hover:border-[#5271ff] transition-all"
                  >
                    {c}
                  </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <WorkProcess />
      <SuccessStats />

    </div>
  );
}
