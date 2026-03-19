import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "@/components/ServiceIcon"; 
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import pool from "@/lib/db";

// Updated components
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";

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

async function getService(slug: string): Promise<ServiceDetail | null> {
  const result = await pool.query("SELECT * FROM services WHERE slug = $1", [slug]);
  return result.rows[0] || null;
}

async function getAllServices(): Promise<ServiceDetail[]> {
  const result = await pool.query("SELECT * FROM services ORDER BY title ASC");
  return result.rows;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | AICLEX Services`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  const allServices = await getAllServices();

  if (!service) {
    return notFound();
  }

  return (
    <div className="w-full mt-20 bg-white">
      
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
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {service.description}
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
                {service.longDescription}
              </p>
            </div>

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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose AICLEX TECHNOLOGIES?</h3>
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
                <h3 className="text-xl font-bold mb-4 relative z-10">Ready to Grow?</h3>
                <p className="text-blue-100 text-sm mb-6 relative z-10">Let's discuss how {service.title} can help your business.</p>
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
