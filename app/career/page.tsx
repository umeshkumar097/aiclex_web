"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Search,
  Filter,
  Briefcase,
  ChevronRight,
  Loader2,
  Check
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- TYPES ---
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

export default function CareerPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const toggleLocation = (loc: string) => {
    if (selectedLocations.includes(loc)) {
      setSelectedLocations(selectedLocations.filter(l => l !== loc));
    } else {
      setSelectedLocations([...selectedLocations, loc]);
    }
  };

  const filteredJobs = jobs.filter(job => {
    // 1. Department Filter
    if (filterDepartment !== "All" && job.department !== filterDepartment) return false;

    // 2. Sidebar Checkbox Location Filter
    if (selectedLocations.length > 0 && !selectedLocations.includes(job.location)) return false;

    // 3. Hero Text Search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      if (!job.title.toLowerCase().includes(q) && 
          !job.department.toLowerCase().includes(q) &&
          !job.description.toLowerCase().includes(q)) {
        return false;
      }
    }

    // 4. Hero Location Search
    if (searchLocation.trim() !== "") {
      const loc = searchLocation.toLowerCase();
      if (!job.location.toLowerCase().includes(loc)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafe] pt-28 pb-20 font-sans text-gray-900">
      
      <AnimatePresence>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
             <Loader2 className="animate-spin text-[#ff914d]" size={40} />
          </div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#001341] mb-6 tracking-tight leading-tight">
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] to-[#ff5e00]">Aiclex</span> Team
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
           Build the future of AI automation, digital marketing, and software engineering with us.
        </p>
        
        <div className="bg-white shadow-[0_10px_40px_-10px_rgba(0,19,65,0.1)] border border-blue-50 rounded-full p-2 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-2">
           <div className="flex-1 flex items-center px-4 w-full h-12">
              <Search className="text-[#001341]/40 mr-3" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, skills, or keywords" 
                className="w-full h-full outline-none text-[#001341] font-semibold bg-transparent placeholder-gray-400"
              />
           </div>
           <div className="hidden md:block w-px h-8 bg-gray-100"></div>
           <div className="flex-1 flex items-center px-4 w-full h-12 border-t md:border-t-0 border-gray-100">
              <MapPin className="text-[#001341]/40 mr-3" size={20} />
              <input 
                type="text" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="City, state, or zip code" 
                className="w-full h-full outline-none text-[#001341] font-semibold bg-transparent placeholder-gray-400"
              />
           </div>
           <button className="bg-[#001341] text-white h-12 px-10 rounded-full font-bold hover:bg-[#ff914d] transition-all shadow-md hover:shadow-lg w-full md:w-auto">
              Search
           </button>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <div className="lg:col-span-3 hidden lg:block">
           <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-blue-50/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#001341] flex items-center gap-2 text-lg">
                  <Filter size={18} className="text-[#ff914d]" /> Filters
                </h3>
                {(searchQuery || searchLocation || selectedLocations.length > 0 || filterDepartment !== "All") && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSearchLocation("");
                      setSelectedLocations([]);
                      setFilterDepartment("All");
                    }}
                    className="text-xs text-[#ff914d] hover:underline font-bold"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="mb-8">
                 <h4 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Department</h4>
                 <div className="space-y-3">
                    {["All", "Engineering", "Sales", "Marketing", "Design", "Customer Success"].map(dept => (
                       <div 
                          key={dept} 
                          onClick={() => setFilterDepartment(dept)}
                          className={`flex items-center justify-between text-sm cursor-pointer py-1.5 px-3 rounded-lg transition-all ${filterDepartment === dept ? "bg-orange-50 text-[#ff914d] font-bold" : "text-gray-600 hover:bg-blue-50/50 hover:text-[#001341]"}`}
                        >
                          <span>{dept}</span>
                          {filterDepartment === dept && <ChevronRight size={14} />}
                       </div>
                    ))}
                 </div>
              </div>

              <div>
                 <h4 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Locations</h4>
                 <div className="space-y-3">
                    {["Remote", "Noida, India", "Bangalore", "Mumbai"].map(loc => {
                       const isSelected = selectedLocations.includes(loc);
                       return (
                         <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#ff914d] bg-[#ff914d]' : 'border-gray-200 group-hover:border-[#ff914d]'}`}>
                               {isSelected && <Check size={12} className="text-white" />}
                            </div>
                            <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={isSelected} 
                              onChange={() => toggleLocation(loc)} 
                            />
                            <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-[#001341]' : 'text-gray-600 group-hover:text-[#001341]'}`}>{loc}</span>
                         </label>
                       );
                    })}
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: JOB LIST */}
        <div className="lg:col-span-9">
           <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-[0_5px_20px_-5px_rgba(0,19,65,0.05)] border border-blue-50/50">
              <span className="text-gray-600 font-medium px-2">
                 <span className="font-bold text-[#001341] text-lg">{filteredJobs.length}</span> open roles found
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                 Sort by: <span className="font-bold text-[#ff914d] cursor-pointer bg-orange-50 px-3 py-1.5 rounded-lg">Relevance</span>
              </div>
           </div>

           <div className="space-y-5">
              {filteredJobs.map((job) => (
                 <div 
                    key={job.id}
                    onClick={() => router.push(`/career/${job.slug}`)}
                    className="bg-white border border-blue-50/50 rounded-2xl p-6 hover:shadow-[0_15px_40px_-10px_rgba(0,19,65,0.1)] hover:-translate-y-1 transition-all cursor-pointer group relative flex flex-col md:flex-row gap-6 items-start md:items-center"
                 >
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#ff914d] transition-colors">
                       <Briefcase className="text-[#5271ff] group-hover:text-white" size={24} />
                    </div>

                    <div className="flex-1">
                       <h3 className="text-xl font-extrabold text-[#001341] group-hover:text-[#ff914d] transition-colors mb-2">
                          {job.title}
                       </h3>
                       <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full text-gray-700">{job.department}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {job.location}</span>
                          <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">{job.type}</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end border-t md:border-none border-gray-100 pt-4 md:pt-0">
                       <div className="text-right hidden md:block">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Salary</p>
                          <p className="text-sm font-bold text-[#001341]">{job.salary || "Competitive"}</p>
                       </div>
                       <button className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#001341] group-hover:text-white transition-colors">
                          <ChevronRight size={20} />
                       </button>
                    </div>
                 </div>
              ))}
              
              {filteredJobs.length === 0 && !loading && (
                 <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Search size={30} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-[#001341] mb-2">No roles found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                 </div>
              )}
           </div>
        </div>

      </section>
    </div>
  );
}