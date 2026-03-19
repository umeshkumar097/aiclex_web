import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Video, IndianRupee, headphones, Clock } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import WorkProcess from "@/components/WorkProcess";
import SuccessStats from "@/components/SuccessStats";

export const metadata: Metadata = {
  title: "Official Zoom Reseller In India",
  description: "Looking for an authorized Zoom Reseller in India? AICLEX Technologies provides Zoom Meetings, Webinars, and Rooms with INR billing, special discounts, and 24/7 support.",
  keywords: ["Zoom Reseller In India", "Zoom Partner India", "Zoom Meetings Price India", "Zoom Webinar Reseller", "AICLEX Zoom services"],
};

export default function ZoomResellerPage() {
  const service = {
    title: "Official Zoom Reseller In India",
    slug: "zoom-reseller",
    description: "Empowering Indian businesses with seamless video communication. Get specialized Zoom licensing, local support, and INR billing.",
    longDescription: "As the premier Zoom Reseller in India, AICLEX Technologies understands the unique requirements of the Indian market. We bridge the gap between global technology and local business needs, offering compliant GST invoicing, competitive INR pricing, and dedicated implementation support for Zoom Meetings, Zoom Webinars, Zoom Rooms, and Zoom Phone.",
    features: [
      "Official Zoom Partner in India",
      "GST Compliant INR Billing",
      "Special Educational & Bulk Pricing",
      "Localized Technical Support",
      "Custom Zoom Rooms Setup",
      "Direct API & CRM Integrations"
    ],
    benefits: [
      { title: "No Foreign Transaction Fees", desc: "Pay via Bank Transfer, UPI, or Corporate Cards in INR without hidden currency costs." },
      { title: "Personalized Onboarding", desc: "Our certified engineers help you set up single sign-on (SSO) and security policies." },
      { title: "Dedicated Success Manager", desc: "A single point of contact for all your licensing, training, and troubleshooting needs." },
      { title: "24/7 Priority Assistance", desc: "Reach us anytime via call (8449488090) or email for critical meeting support." }
    ],
    icon: "Video",
    color: "from-blue-500 to-blue-700",
  };

  return (
    <div className="w-full mt-20 bg-white">
      
      {/* HERO SECTION */}
      <section className="relative w-full py-24 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-5"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#5271ff] mb-6 transition-colors font-medium text-sm lg:text-base">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Best <span className="text-[#5271ff]">Zoom Reseller</span> <br/>In India
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {service.description}
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-full text-white font-bold shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Indian Pricing Now
            </Link>
          </div>
          
          <div className="flex justify-center lg:justify-end">
             <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-white border border-gray-100 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden transform group-hover:-rotate-3 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=800" alt="Zoom Meeting India" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                    <Video size={100} className="text-[#5271ff] relative z-20" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SEARCH INDEXING RICH CONTENT */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Why Companies Trust AICLEX as their <br/>Authorized Zoom Reseller?</h2>
            <p className="text-gray-600 text-lg">We don't just sell licenses; we build communication bridges for the digital-first Indian economy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center">
            <div className="p-8 bg-blue-50 rounded-3xl group hover:bg-[#5271ff] transition-all duration-500 shadow-sm">
                <IndianRupee className="mx-auto mb-4 text-[#5271ff] group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">INR Invoicing</h3>
                <p className="text-xs text-gray-500 group-hover:text-blue-100">Zero cross-border taxation or currency conversion headaches.</p>
            </div>
            <div className="p-8 bg-purple-50 rounded-3xl group hover:bg-purple-500 transition-all duration-500 shadow-sm">
                <CheckCircle className="mx-auto mb-4 text-purple-600 group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">Compliance</h3>
                <p className="text-xs text-gray-500 group-hover:text-purple-100">100% Tax compliant billing with valid Input Tax Credit (ITC).</p>
            </div>
            <div className="p-8 bg-green-50 rounded-3xl group hover:bg-green-500 transition-all duration-500 shadow-sm">
                <Clock className="mx-auto mb-4 text-green-600 group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">Instant Setup</h3>
                <p className="text-xs text-gray-500 group-hover:text-green-100">Most licenses are provisioned and active within 60 minutes.</p>
            </div>
            <div className="p-8 bg-orange-50 rounded-3xl group hover:bg-orange-500 transition-all duration-500 shadow-sm">
                <headphones className="mx-auto mb-4 text-orange-600 group-hover:text-white transition-colors" size={40} />
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2">Expert Care</h3>
                <p className="text-xs text-gray-500 group-hover:text-orange-100">Direct access to Zoom Certified Support Engineers in India.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Zoom Service Offerings</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.longDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((f, i) => (
                  <div key={i} className="flex gap-2 items-center text-sm font-semibold text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle size={16} className="text-[#5271ff]" /> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-[#001341] rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-bold mb-4">Zoom For Education & Enterprise</h3>
                <p className="text-blue-200 text-sm mb-8 leading-relaxed italic">"We provide special discounted rates for educational institutions and non-profits in India. Contact us to learn about the customized enterprise plans."</p>
                <Link href="/contact" className="px-8 py-3 bg-[#ff914d] text-white rounded-full font-bold hover:bg-orange-600 transition-colors">Request a Proposal</Link>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-50 sticky top-28">
            <h3 className="text-2xl font-bold text-[#001341] mb-6">Get a Customized Zoom Quote</h3>
            <p className="text-gray-500 text-sm mb-8 italic">Fill the form below and our Zoom Product Specialist will contact you within 30 minutes.</p>
            
            <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#5271ff]" required />
                <input type="email" placeholder="Work Email" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#5271ff]" required />
                <input type="tel" placeholder="Phone Number" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#5271ff]" required />
                <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-gray-400">
                    <option>Zoom Meetings (10-100 Licensed Users)</option>
                    <option>Zoom Webinar (500+ Attendees)</option>
                    <option>Zoom Rooms / Workspace</option>
                    <option>Zoom Phone Implementation</option>
                </select>
                <button className="w-full py-4 bg-[#5271ff] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg">Submit Request</button>
            </form>
          </div>
        </div>
      </section>

      <WorkProcess />
      <SuccessStats />

    </div>
  );
}
