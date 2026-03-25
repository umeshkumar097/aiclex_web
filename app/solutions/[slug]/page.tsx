import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Video, ShieldCheck, Mail } from "lucide-react";
import { zoomKeywordsSolutions } from "@/lib/zoom-keywords";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return zoomKeywordsSolutions.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = zoomKeywordsSolutions.find((item) => item.slug === slug);
  
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    keywords: [data.keyword, "Zoom Reseller India", "Zoom Partner", "AICLEX Technologies"],
    alternates: {
       canonical: `/solutions/${slug}`
    }
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const data = zoomKeywordsSolutions.find((item) => item.slug === slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="w-full mt-24 bg-white pb-20">
      
      {/* Hero / Header */}
      <section className="bg-gray-50 py-20 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <Link href="/services/zoom-reseller" className="inline-flex items-center gap-2 text-blue-600 font-medium mb-8 hover:underline">
            <ArrowLeft size={18} /> Our Main Zoom Services
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#001341] mb-6 leading-tight">
            {data.keyword}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Guide on {data.keyword}</h2>
              <p className="mb-6">{data.content}</p>
              <p>
                At AICLEX Technologies, we specialize in providing end-to-end solutions for organizations searching for **{data.keyword}**. 
                Whether you are a small startup or a large enterprise, our team in India ensures that your Zoom deployment is seamless, 
                compliant, and cost-effective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                 <ShieldCheck className="text-blue-600 mb-4" size={32} />
                 <h3 className="font-bold text-gray-900 mb-2">Verified Partner</h3>
                 <p className="text-sm text-gray-600">Official status ensures authentic licenses and direct priority support.</p>
              </div>
              <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                 <Video className="text-green-600 mb-4" size={32} />
                 <h3 className="font-bold text-gray-900 mb-2">Seamless Setup</h3>
                 <p className="text-sm text-gray-600">Configuration assistance for Zoom Rooms, Webinars, and Phone systems.</p>
              </div>
            </div>

            <div className="bg-[#001341] p-8 md:p-12 rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">Ready to Get Started?</h3>
                <p className="text-lg mb-8 text-blue-100">Contact the authorized {data.keyword} specialist in India for a customized proposal and bulk discounts.</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-8 py-4 bg-[#ff914d] text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg text-center">Contact Us Now</Link>
                  <Link href="/services/zoom-reseller" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all text-center">Full Service List</Link>
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 sticky top-28">
                <h4 className="font-bold text-gray-900 mb-6 text-xl">Quick Support</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Us</p>
                      <p className="font-bold text-gray-900 text-sm">support@aiclex.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Fast Setup</p>
                      <p className="font-bold text-gray-900 text-sm">Active in 60 Mins</p>
                    </div>
                  </div>
                </div>
                
                <hr className="my-8 border-gray-200" />
                
                <div className="space-y-4">
                  <p className="text-sm font-bold text-[#001341]">Other Solutions</p>
                  {zoomKeywordsSolutions.filter(item => item.slug !== slug).slice(0, 4).map((item) => (
                    <Link key={item.slug} href={`/solutions/${item.slug}`} className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      • {item.keyword}
                    </Link>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
}
