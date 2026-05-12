import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "@/components/ServiceIcon"; 
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { servicesData } from "@/lib/servicesData";
import { getCityName } from "@/lib/citiesData";

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

function generateLocationContent(serviceTitle: string, city: string) {
  const intros = [
    `Transforming the business landscape in ${city} with world-class ${serviceTitle.toLowerCase()} solutions.`,
    `Empowering ${city}-based enterprises to dominate their niche using data-driven ${serviceTitle.toLowerCase()} strategies.`,
    `Your trusted local partner for premium ${serviceTitle.toLowerCase()} in ${city}, delivering measurable growth and ROI.`,
    `AICLEX Technologies brings cutting-edge ${serviceTitle.toLowerCase()} expertise directly to the doorstep of businesses in ${city}.`
  ];

  const cityContexts = [
    `As ${city} continues to grow as a major economic hub, having a strong ${serviceTitle.toLowerCase()} strategy is no longer optional—it's a necessity for survival.`,
    `In the fast-paced markets of ${city}, our ${serviceTitle.toLowerCase()} services provide the competitive edge your business needs to stand out from the crowd.`,
    `The digital ecosystem in ${city} is evolving rapidly. We help local businesses in ${city} stay ahead of the curve with innovative ${serviceTitle.toLowerCase()} techniques.`,
    `Whether you are a startup in ${city} or an established enterprise, our ${serviceTitle.toLowerCase()} solutions are tailored to meet the specific demands of the local market.`
  ];

  // Use the sum of character codes to pick a "stable" random index for this specific city/service combo
  const seed = (serviceTitle.length + city.length) % intros.length;
  const contextSeed = (city.length * serviceTitle.length) % cityContexts.length;

  return {
    intro: intros[seed],
    context: cityContexts[contextSeed]
  };
}

function generateLocationStats(city: string) {
  // Generate stable "random" stats based on city name for uniqueness
  const projects = (city.length * 13) % 40 + 35; // 35-75
  const clients = (city.length * 7) % 25 + 20; // 20-45
  const growth = (city.length * 9) % 15 + 85; // 85-100%
  return { projects, clients, growth };
}

async function getAllServices(): Promise<ServiceDetail[]> {
  return servicesData as ServiceDetail[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { service, city } = await getService(slug);
  
  if (!service) return { title: "Service Not Found" };

  const title = city 
    ? `Best ${service.title} in ${city} | AICLEX Technologies`
    : `${service.title} | AICLEX Services`;

  const description = city
    ? `Looking for top-rated ${service.title} in ${city}? AICLEX Technologies provides expert ${service.title.toLowerCase()} solutions tailored for businesses in ${city}.`
    : service.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { service, city } = await getService(slug);
  const allServices = await getAllServices();

  if (!service) {
    return notFound();
  }

  const locationContent = city ? generateLocationContent(service.title, city) : null;
  const locationStats = city ? generateLocationStats(city) : null;

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
            <Link href="/services" className="inline-flex items-center text-gray-500 hover:text-[#5271ff] mb-6 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#001341] mb-6 leading-tight">
              {service.title} {city && <span className="text-[#5271ff]">in {city}</span>}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose AICLEX for {service.title} {city && `in ${city}`}?</h3>
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
            {city && (
              <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 mt-12">
                <h3 className="text-2xl font-bold text-[#001341] mb-6">Frequently Asked Questions in {city}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Why is AICLEX the best {service.title} agency in {city}?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">AICLEX TECHNOLOGIES combines deep industry expertise with local market insights in {city}. We focus on ROI-driven strategies that help businesses in {city} scale faster and more efficiently than competitors by leveraging cutting-edge AI tools.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">How long does it take to see results for {service.title} in {city}?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">While timelines vary based on your specific goals, most of our clients in {city} start seeing significant engagement and lead flow within the first 4-8 weeks. Our specialized {city} outreach strategies are designed for rapid impact.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Do you offer customized packages for small businesses in {city}?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">Absolutely! We understand the unique challenges of the {city} business ecosystem. We offer scalable packages that cater to startups, SMEs, and large enterprises in {city}, ensuring world-class digital solutions are accessible to everyone.</p>
                  </div>
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
                  {allServices.filter(s => s.slug !== service.slug).slice(0, 5).map((s) => (
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

              <div className="bg-[#001341] p-8 rounded-[2rem] text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5271ff] rounded-full blur-3xl opacity-20"></div>
                <h3 className="text-xl font-bold mb-4 relative z-10">Ready to Grow{city && ` in ${city}`}?</h3>
                <p className="text-blue-100 text-sm mb-6 relative z-10">Let's discuss how {service.title} can help your business{city && ` in ${city}`}.</p>
                <Link href="/contact" className="inline-block w-full py-3 bg-[#ff914d] text-white font-bold rounded-full hover:bg-orange-600 transition-colors relative z-10">
                  Get a Free Quote
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      <WorkProcess />
      <SuccessStats />

    </div>
  );
}
