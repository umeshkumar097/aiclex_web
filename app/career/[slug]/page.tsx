import { Metadata } from "next";
import { notFound } from "next/navigation";
import pool from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Calendar, Share2, CheckCircle } from "lucide-react";

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
    title: `${job.title} | Careers at Aiclex Technologies`,
    description: description,
    keywords: [job.title, job.department, "career", "job opening", "Aiclex Technologies", job.location],
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

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link href="/career" className="inline-flex items-center text-blue-600 hover:underline mb-10 transition-all gap-2 font-medium">
          <ArrowLeft size={18} /> Back to Careers
        </Link>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-500/5">
          <header className="mb-12 border-b border-gray-100 pb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
               <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider">
                  {job.department}
               </span>
               <span className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-full text-sm font-medium">
                  {job.type}
               </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-6 leading-tight">
              {job.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-500">
               <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-blue-500" />
                  <span className="font-medium">{job.location}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-blue-500" />
                  <span className="font-medium">Posted {new Date(job.posted_at).toLocaleDateString()}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-500" />
                  <span className="font-medium">{job.salary || "Competitive"}</span>
               </div>
            </div>
          </header>

          <section className="prose prose-lg max-w-none text-gray-600 mb-12">
            <h2 className="text-2xl font-bold text-[#001341] mb-6">About the Role</h2>
            <p className="leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
          </section>

          {job.requirements && job.requirements.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#001341] mb-6">What We're Looking For</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <span className="font-medium text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <Link 
              href={`/career?apply=${job.id}`}
              className="w-full md:w-auto px-10 py-5 bg-[#1967d2] text-white rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all text-center"
            >
              Apply for this position
            </Link>
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition-colors">
              <Share2 size={20} /> Share this job
            </button>
          </div>
        </div>

        <div className="mt-20 text-center bg-blue-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
           <h3 className="text-3xl font-bold mb-4 relative z-10">Not the right fit?</h3>
           <p className="text-blue-100 mb-8 relative z-10 text-lg">Send us your CV anyway and we'll keep you in mind for future openings.</p>
           <Link href="/contact" className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg relative z-10">
              General Application
           </Link>
        </div>
      </div>
    </div>
  );
}
