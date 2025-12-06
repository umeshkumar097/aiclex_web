"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Heart, 
  Zap, 
  Users, 
  Globe, 
  CheckCircle2, 
  X, 
  UploadCloud, 
  Loader2,
  ChevronRight,
  Search,
  Building2,
  ArrowLeft,
  Share2,
  DollarSign,
  Filter,
  Bookmark
} from "lucide-react";

// --- TYPES ---
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  desc: string;
  requirements: string[];
  postedAt: string;
}

// --- JOBS DATA ---
const JOBS_DATA: Job[] = [
  {
    id: 1,
    title: "MERN Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "₹8L - ₹15L",
    postedAt: "2 days ago",
    desc: "We are looking for a full-stack wizard to build scalable web applications using MongoDB, Express, React, and Node.js. You will be responsible for the entire software development lifecycle, from conception to deployment. You should be comfortable working in an agile environment and ready to tackle complex technical challenges.",
    requirements: [
      "Strong proficiency in JavaScript, TypeScript, and modern ES6+ syntax.",
      "Deep understanding of React.js workflows (Redux, Context API, Hooks).",
      "Experience building RESTful APIs with Node.js and Express.",
      "Familiarity with database design (MongoDB) and cloud services (AWS/Firebase)."
    ]
  },
  {
    id: 2,
    title: "Sales Executive",
    department: "Sales",
    location: "Noida, India",
    type: "Full-time",
    salary: "₹4L - ₹8L + Comm.",
    postedAt: "5 days ago",
    desc: "Drive our business growth by identifying new opportunities and building strong relationships with clients. You will be the face of AICLEX for new partners and help expand our market reach. This role requires high energy and a passion for closing deals.",
    requirements: [
      "Proven experience in B2B sales or business development.",
      "Excellent communication, negotiation, and presentation skills.",
      "Ability to understand client needs and propose suitable technical solutions.",
      "Self-motivated with a track record of meeting or exceeding sales targets."
    ]
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "₹5L - ₹9L",
    postedAt: "1 week ago",
    desc: "Lead our digital presence by creating compelling campaigns across social media, SEO, and paid channels to increase brand awareness and lead generation. You will analyze metrics and adjust strategies to maximize ROI.",
    requirements: [
      "Experience in SEO, SEM, and social media marketing strategies.",
      "Proficiency with Google Analytics, Google Ads, and Facebook Ads Manager.",
      "Strong content creation skills for blogs, newsletters, and social posts.",
      "Ability to analyze data trends and optimize campaigns for ROI."
    ]
  },
  {
    id: 4,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    salary: "Project Based",
    postedAt: "Just now",
    desc: "Design intuitive and beautiful user interfaces that solve complex user problems. Work closely with the product team to create seamless experiences. You should have a keen eye for detail and a user-first mindset.",
    requirements: [
      "Proficiency in Figma, Adobe XD, or similar design tools.",
      "Strong portfolio demonstrating user-centric design solutions.",
      "Understanding of wireframing, prototyping, and design systems.",
      "Ability to collaborate closely with developers to implement designs."
    ]
  }
];

// --- APPLICATION MODAL COMPONENT ---
const ApplicationModal = ({ job, onClose }: { job: any; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Application Submitted Successfully!");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="border-b border-gray-200 px-8 py-6 flex justify-between items-start bg-white">
          <div>
            <h3 className="text-2xl font-normal text-gray-900">Apply for {job.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{job.department} • {job.location}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                <input required type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              </div>
            </div>
            
            <div className="space-y-1 pt-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Resume/CV</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group">
                <UploadCloud className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors mb-2" />
                <span className="text-sm text-gray-600 font-medium group-hover:text-blue-600">Upload resume</span>
                <span className="text-xs text-gray-400 block mt-1">PDF or DOCX</span>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-full text-blue-600 font-medium hover:bg-blue-50 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="px-8 py-2.5 rounded-full bg-[#1967d2] text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Submit Application"}
                </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- JOB DETAILS MODAL (Google Style Overlay) ---
const JobDetailOverlay = ({ job, onClose, onApply }: { job: Job; onClose: () => void; onApply: () => void }) => {
  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Detail Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-white sticky top-0 z-10 flex justify-between items-start">
           <div>
              <h2 className="text-2xl font-normal text-gray-900 mb-1">{job.title}</h2>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                 <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                 <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
              </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
             <X size={24} className="text-gray-500" />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
           <div className="prose max-w-none">
              <div className="flex gap-4 mb-8">
                 <button onClick={onApply} className="bg-[#1967d2] text-white px-6 py-2.5 rounded-full font-medium shadow-sm hover:shadow-md transition-all hover:bg-blue-700">Apply now</button>
                 <button className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-full font-medium hover:bg-gray-50 flex items-center gap-2">
                    <Share2 size={18} /> Share
                 </button>
              </div>

              <h4 className="text-lg font-medium text-gray-900 mb-3">Minimum qualifications:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                 {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                 ))}
              </ul>

              <h4 className="text-lg font-medium text-gray-900 mb-3">About the job</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                 {job.desc}
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-8">
                 <h4 className="text-blue-900 font-medium mb-2">Why Google-style careers?</h4>
                 <p className="text-blue-800/80 text-sm">
                    Because clean typography, ample whitespace, and focused content help candidates find their dream role faster.
                 </p>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState("All");

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const filteredJobs = filterDepartment === "All" 
    ? JOBS_DATA 
    : JOBS_DATA.filter(j => j.department === filterDepartment);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 font-sans text-gray-900">
      
      <AnimatePresence>
        {isApplicationOpen && selectedJob && (
          <ApplicationModal job={selectedJob} onClose={() => setIsApplicationOpen(false)} />
        )}
        {selectedJob && !isApplicationOpen && (
          <JobDetailOverlay 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
            onApply={() => setIsApplicationOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* --- HERO SEARCH SECTION --- */}
      <section className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-8 tracking-tight">
          Build for everyone
        </h1>
        
        {/* Google Style Search Bar */}
        <div className="bg-white shadow-lg border border-gray-200 rounded-full p-2 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-2">
           <div className="flex-1 flex items-center px-4 w-full h-12">
              <Search className="text-gray-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Job title, skills, or keywords" 
                className="w-full h-full outline-none text-gray-700 bg-transparent placeholder-gray-500"
              />
           </div>
           <div className="hidden md:block w-px h-8 bg-gray-200"></div>
           <div className="flex-1 flex items-center px-4 w-full h-12 border-t md:border-t-0 border-gray-100">
              <MapPin className="text-gray-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="City, state, or zip code" 
                className="w-full h-full outline-none text-gray-700 bg-transparent placeholder-gray-500"
              />
           </div>
           <button className="bg-[#1967d2] text-white h-10 px-8 rounded-full font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
              Search
           </button>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <div className="lg:col-span-3 hidden lg:block">
           <div className="sticky top-28">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                 <Filter size={18} /> Filters
              </h3>
              
              <div className="mb-6">
                 <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Locations</h4>
                 <div className="space-y-2">
                    {["Remote", "Noida, India", "Bangalore", "Mumbai"].map(loc => (
                       <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-4 h-4 rounded border border-gray-300 group-hover:border-blue-500 flex items-center justify-center transition-colors">
                             {/* Checkbox imitation */}
                          </div>
                          <span className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors">{loc}</span>
                       </label>
                    ))}
                 </div>
              </div>

              <div className="mb-6">
                 <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Department</h4>
                 <div className="space-y-2">
                    {["All", "Engineering", "Sales", "Marketing", "Design"].map(dept => (
                       <div 
                          key={dept} 
                          onClick={() => setFilterDepartment(dept)}
                          className={`text-sm cursor-pointer py-1 ${filterDepartment === dept ? "text-[#1967d2] font-medium" : "text-gray-600 hover:text-gray-900"}`}
                        >
                          {dept}
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: JOB LIST */}
        <div className="lg:col-span-9">
           <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">{filteredJobs.length} jobs found</span>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                 Sort by: <span className="font-medium text-gray-900 cursor-pointer">Relevance</span>
              </div>
           </div>

           <div className="space-y-4">
              {filteredJobs.map((job) => (
                 <div 
                    key={job.id}
                    onClick={() => openJobDetails(job)}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer group relative"
                 >
                    <div className="flex justify-between items-start">
                       <div>
                          <h3 className="text-xl font-normal text-[#1967d2] group-hover:underline mb-1">
                             {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                             <span className="flex items-center gap-1 font-medium">{job.department}</span>
                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                             <span className="flex items-center gap-1">{job.location}</span>
                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                             <span className="text-gray-500">Posted {job.postedAt}</span>
                          </div>
                       </div>
                       <button className="text-gray-400 hover:text-[#1967d2] transition-colors p-2">
                          <Bookmark size={20} />
                       </button>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 max-w-3xl">
                       {job.desc}
                    </p>

                    <div className="flex items-center gap-2">
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.type}
                       </span>
                       {job.location === "Remote" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                             Remote eligible
                          </span>
                       )}
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-8 text-center">
              <button className="px-6 py-3 border border-gray-300 rounded-full text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                 Load more jobs
              </button>
           </div>
        </div>

      </section>
    </div>
  );
}