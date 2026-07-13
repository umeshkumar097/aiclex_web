import { Metadata } from "next";
import { notFound } from "next/navigation";
import pool from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Calendar, Share2, CheckCircle } from "lucide-react";
import ApplyForm from "./ApplyForm";

interface Job {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  posted_at: string;
}

async function getJob(slug: string): Promise<Job | null> {
  const result = await pool.query("SELECT * FROM jobs WHERE slug = $1", [slug]);
  return result.rows[0] || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Job Not Found" };

  const description = job.description.substring(0, 160);

  return {
    title: `${job.title} | Careers at Aiclex™ Technologies`,
    description: description,
    alternates: {
      canonical: `https://aiclex.in/career/${slug}`,
    },
    keywords: [job.title, job.department, "career", "job opening", "Aiclex™ Technologies", job.location],
    openGraph: {
      title: `${job.title} at Aiclex`,
      description: description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at Aiclex`,
      description: description,
    }
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return notFound();
  }

  // --- GOOGLE JOBS STRUCTURED DATA (JSON-LD) ---
  // This allows instant indexing into Google for Jobs when the post is opened/crawled
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description + (job.requirements?.length ? " Requirements: " + job.requirements.join(", ") : ""),
    "datePosted": new Date(job.posted_at).toISOString(),
    "validThrough": new Date(new Date(job.posted_at).setMonth(new Date(job.posted_at).getMonth() + 2)).toISOString(),
    "employmentType": job.type.toUpperCase().replace("-", "_"),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Aiclex™ Technologies",
      "sameAs": "https://aiclex.in",
      "logo": "https://aiclex.in/icon.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location === "Remote" ? "Remote" : job.location.split(",")[0],
        "addressCountry": "IN"
      }
    },
    "jobLocationType": job.location === "Remote" ? "TELECOMMUTE" : undefined,
    "baseSalary": job.salary ? {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary,
        "unitText": "YEAR"
      }
    } : undefined
  };

  return (
    <div className="min-h-screen bg-[#f8fafe] pt-32 pb-20 font-sans">
      
      {/* INJECT STRUCTURED DATA FOR GOOGLE INDEXING */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        
        <Link href="/career" className="inline-flex items-center text-[#ff914d] hover:text-[#e07b3c] mb-10 transition-all gap-2 font-bold bg-orange-50 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md">
          <ArrowLeft size={18} /> Back to Open Roles
        </Link>

        <div className="bg-white border border-blue-50/50 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,19,65,0.05)] relative overflow-hidden">
          {/* Decorative Gradient Blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#ff914d]/20 to-transparent rounded-full blur-3xl"></div>

          <header className="mb-12 border-b border-gray-100 pb-10 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
               <span className="px-5 py-2 bg-blue-50 text-[#5271ff] rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                  {job.department}
               </span>
               <span className="px-5 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                  {job.type}
               </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-[#001341] mb-8 leading-tight tracking-tight">
              {job.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-500 font-medium bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#ff914d]" />
                  </div>
                  <span>{job.location}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Briefcase size={18} className="text-[#ff914d]" />
                  </div>
                  <span>{job.salary || "Competitive"}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-[#ff914d]" />
                  </div>
                  <span>{new Date(job.posted_at).toLocaleDateString()}</span>
               </div>
            </div>
          </header>

          <section className="prose prose-lg max-w-none text-gray-600 mb-12 relative z-10">
            <h2 className="text-2xl font-black text-[#001341] mb-6">About the Role</h2>
            <div 
              className="leading-relaxed font-medium text-gray-600 prose-headings:text-[#001341] prose-headings:font-bold prose-ul:list-disc prose-ul:pl-5 prose-li:my-1 space-y-4"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </section>

          {job.requirements && job.requirements.length > 0 && (
            <section className="mb-12 relative z-10">
              <h2 className="text-2xl font-black text-[#001341] mb-6">What We're Looking For</h2>
              <ul className="grid grid-cols-1 gap-4">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] hover:border-blue-100 hover:shadow-blue-500/5 transition-all">
                    <div className="mt-0.5 bg-green-50 rounded-full p-1 shrink-0">
                      <CheckCircle className="text-green-500" size={18} />
                    </div>
                    <span className="font-semibold text-gray-700 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <a 
              href="#apply-form"
              className="w-full md:w-auto px-12 py-5 bg-[#001341] text-white rounded-full font-bold text-lg hover:bg-[#ff914d] shadow-xl shadow-blue-900/10 transition-all text-center"
            >
              Apply Now
            </a>
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#ff914d] font-bold transition-colors">
              <Share2 size={20} /> Share this job
            </button>
          </div>
        </div>

        {/* --- APPLICATION FORM (CLIENT COMPONENT) --- */}
        <ApplyForm jobId={job.id} jobTitle={job.title} />

        <div className="mt-16 text-center bg-gradient-to-br from-[#001341] to-[#001a59] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl border border-blue-800">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff914d] rounded-full blur-[120px] opacity-20"></div>
           <h3 className="text-3xl font-black mb-4 relative z-10">Not the right fit?</h3>
           <p className="text-blue-200 mb-8 relative z-10 text-lg font-medium max-w-lg mx-auto">Send us your CV anyway and we'll keep you in mind for future openings when they become available.</p>
           <Link href="/contact" className="inline-block px-10 py-4 bg-white text-[#001341] rounded-full font-black hover:bg-[#ff914d] hover:text-white transition-all shadow-lg relative z-10">
              General Application
           </Link>
        </div>
      </div>
    </div>
  );
}
