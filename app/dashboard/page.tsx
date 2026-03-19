"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Pencil, 
  Trash2, 
  X,
  Loader2,
  Briefcase,
  Search,
  Calendar as CalendarIcon,
  CheckCircle,
  AlertTriangle,
  Image as ImageIcon,
  Phone,
  BarChart3,
  Globe
} from "lucide-react";
import dynamic from "next/dynamic";

// --- DYNAMIC IMPORT FOR RICH TEXT EDITOR ---
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function Dashboard() {
  const router = useRouter();

  // --- AUTH STATE ---
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- APP STATE ---
  const [activeTab, setActiveTab] = useState("overview"); 
  const [posts, setPosts] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 
  const [uploading, setUploading] = useState(false);
  
  // CRM Filters
  const [crmFilters, setCrmFilters] = useState({ name: "", phone: "", date: "" });
  
  // Form State
  const [formData, setFormData] = useState({ 
    title: "", slug: "", content: "",
    name: "", role: "", bio: "", linkedin: "", twitter: "", email: "",
    image: "",
    department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // --- 🔒 AUTHENTICATION CHECK ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.push("/signin"); 
      } else {
        setIsAuthorized(true);
        fetchData();
      }
    }
  }, [router]);

  const fetchData = async () => {
    await Promise.all([fetchPosts(), fetchTeam(), fetchLeads(), fetchJobs(), fetchApplications()]);
  };

  // --- DATA FETCHING ---
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      if(res.ok) setPosts(await res.json());
    } catch (error) { console.error("Failed to fetch posts"); }
  };

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team");
      if(res.ok) setTeam(await res.json());
    } catch (error) { console.error("Failed to fetch team"); }
  };

  const fetchLeads = async () => {
    try {
      const { name, phone, date } = crmFilters;
      const params = new URLSearchParams({ name, phone, date });
      const res = await fetch(`/api/leads?${params.toString()}`);
      if(res.ok) setLeads(await res.json());
    } catch (error) { console.error("Failed to fetch leads"); }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if(res.ok) setJobs(await res.json());
    } catch (error) { console.error("Failed to fetch jobs"); }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/job-applications");
      if(res.ok) setApplications(await res.json());
    } catch (error) { console.error("Failed to fetch applications"); }
  };

  useEffect(() => {
    if (activeTab === "crm") fetchLeads();
  }, [crmFilters, activeTab]);

  // --- SEO SCORING LOGIC ---
  const getSEOScore = () => {
    let score = 0;
    const checks = [];
    
    // Word count check
    const wordCount = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(x => x.length > 0).length;
    if (wordCount > 300) { score += 25; checks.push({ label: "Content length (>300 words)", ok: true }); }
    else checks.push({ label: "Content too short", ok: false });

    // H2 check
    if (formData.content.includes('<h2')) { score += 25; checks.push({ label: "Used subheadings (H2)", ok: true }); }
    else checks.push({ label: "Missing subheadings", ok: false });

    // Image check
    if (formData.image || formData.content.includes('<img')) { score += 25; checks.push({ label: "Featured image present", ok: true }); }
    else checks.push({ label: "Missing image", ok: false });

    // Title length
    if (formData.title.length > 30 && formData.title.length < 70) { score += 25; checks.push({ label: "Optimal title length", ok: true }); }
    else checks.push({ label: "Title length suboptimal", ok: false });

    return { score, checks };
  };

  // --- IMAGE UPLOAD TO R2 ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        alert("🖼️ Image uploaded to Cloudflare R2!");
      } else {
        throw new Error("No URL returned from server");
      }
    } catch (err: any) {
      console.error("Upload failed", err);
      alert(`❌ Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/signin");
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = activeTab === "blogs" ? "blog" : activeTab === "team" ? "team" : "jobs";
    const url = isEditing && editId ? `/api/${endpoint}/${editId}` : `/api/${endpoint}`;
    const method = isEditing && editId ? "PUT" : "POST";

    let payload: any;
    if (activeTab === "blogs") {
      payload = { title: formData.title, slug: formData.slug, content: formData.content, image_url: formData.image };
    } else if (activeTab === "team") {
      payload = { name: formData.name, role: formData.role, bio: formData.bio, linkedin: formData.linkedin, twitter: formData.twitter, email: formData.email, image_url: formData.image };
    } else {
      payload = { 
        title: formData.title, slug: formData.slug, department: formData.department, 
        location: formData.location, type: formData.type, salary: formData.salary, 
        description: formData.content, experience: formData.experience,
        requirements: formData.requirements.split(",").map(r => r.trim())
      };
    }

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setFormData({ 
      title: "", slug: "", content: "", 
      name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", 
      image: "",
      department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: "" 
    });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
    
    fetchData();
    router.refresh();
    alert(isEditing ? "✅ Updated successfully!" : "✅ Created successfully!");
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const endpoint = activeTab === "blogs" ? "blog" : activeTab === "team" ? "team" : "jobs";
    await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
    fetchData();
    router.refresh();
  };

  const handleEdit = (item: any) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (activeTab === "blogs") {
      setFormData({ ...formData, title: item.title, slug: item.slug, image: item.image_url || "", content: item.content });
    } else {
      setFormData({ ...formData, name: item.name, role: item.role, image: item.image_url || "", bio: item.bio, linkedin: item.linkedin || "", twitter: item.twitter || "", email: item.email || "" });
    }
  };

  const openNewForm = () => {
    setShowForm(true);
    setIsEditing(false);
    setFormData({ 
      title: "", slug: "", content: "", 
      name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", 
      image: "",
      department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: "" 
    });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-[#001341]" size={40} />
            <p className="text-gray-500 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#001341] text-white hidden md:flex flex-col h-screen fixed left-0 top-0 z-50">
        <div className="p-6 border-b border-white/10 flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("overview")}>
          <div className="h-8 w-8 bg-[#ff914d] rounded-lg flex items-center justify-center font-bold text-white">A</div>
          <span className="text-xl font-bold tracking-wide">AICLEX Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
            { id: "blogs", icon: FileText, label: "Blog Management" },
            { id: "team", icon: Users, label: "Team Management" },
            { id: "jobs", icon: Briefcase, label: "Job Management" },
            { id: "applications", icon: FileText, label: "Applications" },
            { id: "crm", icon: Phone, label: "CRM / Leads" },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === tab.id ? "bg-[#ff914d] text-white shadow-lg" : "text-gray-300 hover:bg-white/10"}`}
            >
              <tab.icon size={20} /> <span>{tab.label}</span>
            </button>
          ))}

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition-all cursor-pointer">
            <Settings size={20} /> <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-3xl font-extrabold text-[#001341] capitalize">
                    {activeTab === 'overview' ? 'Dashboard Overview' : `Manage ${activeTab}`}
                </h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back, Admin.</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#001341] text-white flex items-center justify-center font-bold shadow-md">A</div>
        </div>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === "overview" && (
            <div className="animate-fade-in space-y-8">
                <div className="bg-gradient-to-r from-[#001341] to-[#1e3a8a] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
                        <p className="text-blue-100 max-w-xl">
                            You have <span className="font-bold text-[#ff914d]">{posts.length}</span> blogs, <span className="font-bold text-[#ff914d]">{jobs.length}</span> jobs, and <span className="font-bold text-[#ff914d]">{leads.length}</span> active leads.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <button onClick={() => { setActiveTab("blogs"); openNewForm(); }} className="bg-[#ff914d] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg flex items-center gap-2 cursor-pointer">
                                <Plus size={20} /> Write Blog
                            </button>
                            <button onClick={() => setActiveTab("crm")} className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition flex items-center gap-2 cursor-pointer border border-white/20">
                                <BarChart3 size={20} /> View Leads
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Total Posts" count={posts.length} icon={FileText} color="blue" />
                    <StatsCard title="Inbound Leads" count={leads.length} icon={Briefcase} color="green" />
                    <StatsCard title="Team Members" count={team.length} icon={Users} color="orange" />
                </div>
            </div>
        )}

        {/* --- BLOGS, TEAM, OR JOBS TAB --- */}
        {(activeTab === "blogs" || activeTab === "team" || activeTab === "jobs") && (
            <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#001341]">
                      {activeTab === 'blogs' ? "Premium Blog Editor" : activeTab === 'team' ? "Team Directory" : "Job Listings"}
                    </h2>
                    {!showForm && (
                        <button onClick={openNewForm} className="bg-[#ff914d] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md cursor-pointer">
                            <Plus size={18} /> Add New
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* MAIN FORM */}
                        <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
                            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition cursor-pointer">
                                <X size={24} />
                            </button>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                {(activeTab === "blogs" || activeTab === "jobs") && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                                  {activeTab === 'blogs' ? 'Post Title' : 'Job Title'}
                                                </label>
                                                <input 
                                                    type="text" 
                                                    placeholder={activeTab === 'blogs' ? "The Future of AI..." : "MERN Developer"}
                                                    className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none text-lg font-semibold" 
                                                    value={formData.title} 
                                                    onChange={(e) => setFormData({ 
                                                        ...formData, 
                                                        title: e.target.value, 
                                                        slug: isEditing ? formData.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") 
                                                    })} 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Permalink / Slug</label>
                                                <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-xl text-gray-500 text-sm overflow-hidden whitespace-nowrap">
                                                    <Globe size={14} /> <span>{activeTab === 'blogs' ? 'aiclex.in/blog/' : 'aiclex.in/career/'}</span><strong>{formData.slug}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        {activeTab === "jobs" && (
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                             <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Department</label>
                                                <select className="w-full p-4 bg-gray-50 border-none rounded-xl" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                                                  {["Engineering", "Sales", "Marketing", "Design", "HR", "Support"].map(d => <option key={d}>{d}</option>)}
                                                </select>
                                             </div>
                                             <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                                                <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-xl" placeholder="Remote / Noida" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                                             </div>
                                             <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Salary Range</label>
                                                <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-xl" placeholder="₹8L - ₹15L" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
                                             </div>
                                          </div>
                                        )}

                                        {activeTab === "blogs" && (
                                          <div className="space-y-4">
                                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Media</label>
                                              <div className="flex flex-col md:flex-row gap-4 items-center">
                                                  <div className="flex-1 w-full">
                                                      <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 aspect-video flex items-center justify-center bg-gray-50">
                                                          {formData.image ? (
                                                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                          ) : (
                                                              <div className="text-center text-gray-400">
                                                                  <ImageIcon size={48} className="mx-auto mb-2 opacity-20" />
                                                                  <p className="text-sm">No image uploaded</p>
                                                              </div>
                                                          )}
                                                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                              <span className="text-white font-bold bg-[#ff914d] px-4 py-2 rounded-lg text-sm">Change Image</span>
                                                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                          </label>
                                                      </div>
                                                  </div>
                                                  <div className="w-full md:w-64 space-y-2">
                                                      <p className="text-[10px] text-gray-400 font-bold uppercase">Direct URL</p>
                                                      <input 
                                                          type="text" 
                                                          className="w-full p-3 bg-gray-50 border-none rounded-lg text-xs" 
                                                          value={formData.image} 
                                                          onChange={(e) => setFormData({...formData, image: e.target.value})} 
                                                          placeholder="https://..."
                                                      />
                                                      {uploading && <div className="flex items-center gap-2 text-[#ff914d] text-xs font-bold"><Loader2 size={12} className="animate-spin" /> Uploading to R2...</div>}
                                                  </div>
                                              </div>
                                          </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                              {activeTab === 'blogs' ? 'Article Content' : 'Job Description'}
                                            </label>
                                            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 min-h-[400px]">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={formData.content} 
                                                    onChange={(val) => setFormData({...formData, content: val})} 
                                                    className="h-[350px]"
                                                />
                                            </div>
                                        </div>

                                        {activeTab === "jobs" && (
                                          <div>
                                             <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Requirements (Comma separated)</label>
                                             <textarea rows={3} className="w-full p-4 bg-gray-50 border-none rounded-xl" placeholder="React.js, Node.js, TypeScript..." value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} />
                                          </div>
                                        )}
                                    </>
                                )}

                                {activeTab === "team" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input type="text" placeholder="Full Name" className="p-4 bg-gray-50 border-none rounded-xl" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                        <input type="text" placeholder="Role (e.g. CTO)" className="p-4 bg-gray-50 border-none rounded-xl" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                                        <textarea rows={4} className="md:col-span-2 p-4 bg-gray-50 border-none rounded-xl" placeholder="Bio..." value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                                    </div>
                                )}

                                <div className="flex gap-4 border-t border-gray-50 pt-8">
                                    <button disabled={loading} className="bg-[#001341] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                                        {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                                        {isEditing ? "Save Changes" : "Publish to Site"}
                                    </button>
                                    <button type="button" onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition cursor-pointer">
                                        Discard
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* TABLE LIST */}
                {!showForm && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                <tr>
                                    <th className="p-6">
                                      {activeTab === 'blogs' ? 'Publication' : activeTab === 'team' ? 'Identity' : 'Job Title'}
                                    </th>
                                    <th className="p-6">
                                      {activeTab === 'blogs' ? 'Status/Date' : activeTab === 'team' ? 'Position' : 'Department/Loc'}
                                    </th>
                                    <th className="p-6 text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(activeTab === 'blogs' ? posts : activeTab === 'team' ? team : jobs).map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm flex items-center justify-center">
                                                    {item.image_url ? (
                                                      <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                                                    ) : activeTab === 'jobs' ? (
                                                      <Briefcase className="text-blue-500" size={24} />
                                                    ) : (
                                                      <ImageIcon className="w-full h-full p-3 text-gray-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#001341] leading-none mb-1">{item.title || item.name}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-xs">{item.slug || item.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {activeTab === 'blogs' ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Live - {new Date(item.created_at).toLocaleDateString()}</span>
                                                </div>
                                            ) : activeTab === 'team' ? (
                                                <span className="px-3 py-1 bg-blue-50 text-[#001341] text-[10px] font-black rounded-lg uppercase tracking-wide">{item.role}</span>
                                            ) : (
                                              <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-600">{item.department}</span>
                                                <span className="text-[10px] text-gray-400 uppercase">{item.location}</span>
                                              </div>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => {
                                                  handleEdit(item);
                                                  if(activeTab === 'jobs') {
                                                    setFormData(prev => ({
                                                      ...prev,
                                                      department: item.department,
                                                      location: item.location,
                                                      type: item.type,
                                                      salary: item.salary || "",
                                                      experience: item.experience || "",
                                                      requirements: item.requirements ? item.requirements.join(", ") : ""
                                                    }));
                                                  }
                                                }} className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                                                    <Pencil size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )}

        {/* --- CRM TAB --- */}
        {activeTab === "crm" && (
            <div className="animate-fade-in space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* FILTERS */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-full">
                            <h3 className="text-lg font-bold text-[#001341] mb-6 flex items-center gap-2">
                                <Search size={20} className="text-[#ff914d]" /> Filter Leads
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Search Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none text-sm"
                                        placeholder="Type name..."
                                        value={crmFilters.name}
                                        onChange={(e) => setCrmFilters({...crmFilters, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none text-sm"
                                        placeholder="84494..."
                                        value={crmFilters.phone}
                                        onChange={(e) => setCrmFilters({...crmFilters, phone: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Registration Date</label>
                                    <input 
                                        type="date" 
                                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none text-sm"
                                        value={crmFilters.date}
                                        onChange={(e) => setCrmFilters({...crmFilters, date: e.target.value})}
                                    />
                                </div>
                                <button onClick={() => setCrmFilters({name: "", phone: "", date: ""})} className="w-full py-4 text-gray-400 font-bold text-xs uppercase hover:text-[#001341] transition cursor-pointer">
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* LEADS LIST */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-[#001341]">Recent Submissions</h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{leads.length} Leads Found</span>
                        </div>
                        
                        <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                            {leads.map((lead) => (
                                <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold text-[#001341] text-lg leading-tight">{lead.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <a href={`mailto:${lead.email}`} className="text-xs text-gray-400 hover:text-[#001341] flex items-center gap-1"><Globe size={10} /> {lead.email}</a>
                                                <a href={`tel:${lead.phone}`} className="text-xs text-gray-400 hover:text-[#001341] flex items-center gap-1 font-semibold"><Phone size={10} /> {lead.phone}</a>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                            lead.type === 'Zoom' ? 'bg-purple-100 text-purple-700' :
                                            lead.type === 'Website' ? 'bg-blue-100 text-blue-700' :
                                            lead.type === 'Mobile' ? 'bg-green-100 text-green-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                            {lead.type} Lead
                                        </span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Requirement</p>
                                            <p className="text-xs text-gray-600 italic leading-relaxed">"{lead.requirement || 'No detailed requirement provided.'}"</p>
                                        </div>
                                        {lead.source_page && (
                                            <div className="pt-2 border-t border-gray-100">
                                                <p className="text-[10px] font-black text-[#5271ff] uppercase tracking-widest mb-1">Lead Source Page</p>
                                                <p className="text-[10px] text-gray-500 font-mono bg-white p-2 rounded-lg border border-gray-100 break-all">{lead.source_page}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-[10px] text-gray-300 font-bold uppercase">{new Date(lead.created_at).toLocaleString()}</p>
                                        <button className="text-[#ff914d] text-[10px] font-black uppercase tracking-widest hover:underline cursor-pointer">View CRM Record →</button>
                                    </div>
                                </div>
                            ))}
                            {leads.length === 0 && (
                                <div className="p-20 text-center flex flex-col items-center gap-4">
                                    <Search size={48} className="text-gray-100" />
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No leads found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- APPLICATIONS TAB --- */}
        {activeTab === "applications" && (
            <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#001341]">Candidate Applications</h2>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {applications.map((app) => (
                            <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                                            {app.full_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#001341] text-lg leading-tight">{app.full_name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-400">Applying for: <strong className="text-blue-600 uppercase">{app.job_title}</strong></span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                                <span className="text-xs text-gray-400">{new Date(app.applied_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a 
                                          href={`${process.env.NEXT_PUBLIC_R2_URL || "https://pub-e058a2f2b6f9136b65d2d513dc98c5a2.r2.dev"}/${app.resume_url}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="bg-[#001341] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition flex items-center gap-2"
                                        >
                                            <ImageIcon size={14} /> View CV
                                        </a>
                                        <a href={`mailto:${app.email}`} className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition flex items-center gap-2">
                                            Email
                                        </a>
                                    </div>
                                </div>
                                {app.message && (
                                    <div className="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Candidate Message</p>
                                        <p className="text-xs text-gray-600 italic">"{app.message}"</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {applications.length === 0 && (
                            <div className="p-20 text-center flex flex-col items-center gap-4">
                                <Briefcase size={48} className="text-gray-100" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No applications received yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}

function StatsCard({ title, count, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-xl transition-all group">
        <div className={`h-16 w-16 rounded-2xl ${colors[color]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon size={32} />
        </div>
        <div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-4xl font-black text-[#001341] leading-none">{count}</h3>
        </div>
    </div>
  );
}