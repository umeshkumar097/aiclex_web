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
  Globe,
  Download,
  Save,
  MessageSquare,
  Filter
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
  const [activeTab, setActiveTab] = useState<"overview" | "blogs" | "team" | "jobs" | "applications" | "crm" | "links">("overview"); 
  const [posts, setPosts] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 
  const [uploading, setUploading] = useState(false);
  
  // CRM Filters
  const [crmFilters, setCrmFilters] = useState({ name: "", phone: "", date: "", source: "", city: "", service: "" });
  
  // Form State
  const [formData, setFormData] = useState({ 
    title: "", slug: "", content: "", meta_description: "", show_popup: true,
    name: "", role: "", bio: "", linkedin: "", twitter: "", email: "",
    image: "",
    department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: "",
    short_slug: "", target_url: ""
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
    await Promise.all([fetchPosts(), fetchTeam(), fetchLeads(), fetchJobs(), fetchApplications(), fetchLinks()]);
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
      const { name, phone, date, source, city, service } = crmFilters;
      const params = new URLSearchParams({ name, phone, date, source, city, service });
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

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/short-links");
      if(res.ok) setLinks(await res.json());
    } catch (error) { console.error("Failed to fetch links"); }
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

    const endpoint = activeTab === "blogs" ? "blog" : activeTab === "team" ? "team" : activeTab === "jobs" ? "jobs" : "short-links";
    const url = isEditing && editId 
      ? (activeTab === "links" ? `/api/${endpoint}?id=${editId}` : `/api/${endpoint}/${editId}`)
      : `/api/${endpoint}`;
    const method = isEditing && editId ? "PUT" : "POST";

    let payload: any;
    if (activeTab === "blogs") {
      payload = { 
        title: formData.title, 
        slug: formData.slug, 
        content: formData.content, 
        image_url: formData.image,
        meta_description: formData.meta_description,
        show_popup: formData.show_popup
      };
    } else if (activeTab === "team") {
      payload = { name: formData.name, role: formData.role, bio: formData.bio, linkedin: formData.linkedin, twitter: formData.twitter, email: formData.email, image_url: formData.image };
    } else if (activeTab === "links") {
      payload = { 
        slug: formData.short_slug, 
        target_url: formData.target_url 
      };
    } else {
      payload = { 
        title: formData.title, slug: formData.slug, department: formData.department, 
        location: formData.location, type: formData.type, salary: formData.salary, 
        description: formData.content, experience: formData.experience,
        requirements: typeof formData.requirements === 'string' ? formData.requirements.split(",").map(r => r.trim()) : formData.requirements
      };
    }

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setFormData({ 
      title: "", slug: "", content: "", meta_description: "", show_popup: true, 
      name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", 
      image: "",
      department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: "", short_slug: "", target_url: ""
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
    const endpoint = activeTab === "blogs" ? "blog" : activeTab === "team" ? "team" : activeTab === "jobs" ? "jobs" : "short-links";
    const deleteUrl = activeTab === "links" ? `/api/${endpoint}?id=${id}` : `/api/${endpoint}/${id}`;
    await fetch(deleteUrl, { method: "DELETE" });
    fetchData();
    router.refresh();
  };

  const handleLeadUpdate = async (id: number, updates: any) => {
    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to update lead", error);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      "Name", "Email", "WhatsApp", "Status", "Requirement", "Source", "Date",
      "City", "Service", "Captured URL", "UTM Source", "UTM Medium", "UTM Campaign"
    ];
    const rows = leads.map(l => [
      `"${l.name}"`, 
      `"${l.email || ''}"`, 
      `"${l.whatsapp}"`, 
      `"${l.status}"`, 
      `"${l.requirement?.replace(/"/g, '""')}"`, 
      `"${l.source || ''}"`, 
      `"${new Date(l.created_at).toLocaleDateString()}"`,
      `"${l.city || ''}"`,
      `"${l.service || ''}"`,
      `"${l.source_page || ''}"`,
      `"${l.utm_source || ''}"`,
      `"${l.utm_medium || ''}"`,
      `"${l.utm_campaign || ''}"`
    ]);
    const csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `aiclex_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (item: any) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (activeTab === "blogs") {
      setFormData({ 
        ...formData, 
        title: item.title, 
        slug: item.slug, 
        image: item.image_url || "", 
        content: item.content,
        meta_description: item.meta_description || "",
        show_popup: item.show_popup !== false
      });
    } else if (activeTab === "team") {
      setFormData({ 
        ...formData, 
        name: item.name, 
        role: item.role, 
        image: item.image_url || "", 
        bio: item.bio, 
        linkedin: item.linkedin || "", 
        twitter: item.twitter || "", 
        email: item.email || "",
      });
    } else if (activeTab === "jobs") {
      setFormData({ 
        ...formData, 
        title: item.title, 
        slug: item.slug, 
        department: item.department,
        location: item.location,
        type: item.type,
        salary: item.salary,
        content: item.description,
        experience: item.experience,
        requirements: Array.isArray(item.requirements) ? item.requirements.join(", ") : item.requirements
      });
    } else if (activeTab === "links") {
      setFormData({ 
        ...formData, 
        short_slug: item.slug, 
        target_url: item.target_url 
      });
    }
  };

  const openNewForm = () => {
    setShowForm(true);
    setIsEditing(false);
    setFormData({ 
      title: "", slug: "", content: "", meta_description: "", show_popup: true, 
      name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", 
      image: "",
      department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: "", short_slug: "", target_url: ""
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
          <span className="text-xl font-bold tracking-wide">AICLEX™ Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
            { id: "blogs", icon: FileText, label: "Blog Management" },
            { id: "team", icon: Users, label: "Team Management" },
            { id: "jobs", icon: Briefcase, label: "Job Management" },
            { id: "applications", icon: FileText, label: "Applications" },
            { id: "crm", icon: Phone, label: "CRM / Leads" },
            { id: "links", icon: Globe, label: "Short Links" },
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
                            You have <span className="font-bold text-[#ff914d]">{posts.length}</span> blogs, <span className="font-bold text-[#ff914d]">{jobs.length}</span> jobs, <span className="font-bold text-[#ff914d]">{leads.length}</span> leads, and <span className="font-bold text-[#ff914d]">{links.length}</span> short links.
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatsCard title="Total Posts" count={posts.length} icon={FileText} color="blue" />
                    <StatsCard title="Inbound Leads" count={leads.length} icon={Briefcase} color="green" />
                    <StatsCard title="Short Links" count={links.length} icon={Globe} color="blue" />
                    <StatsCard title="Team Members" count={team.length} icon={Users} color="orange" />
                </div>

                {/* Lead Source Breakdown */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-[#001341]">Top Conversion Channels</h3>
                            <p className="text-gray-400 text-sm">Leads generated by AI Tools & Packages</p>
                        </div>
                        <div className="px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                            Real-time Data
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from(new Set(leads.map(l => l.source))).filter(Boolean).map(source => {
                            const count = leads.filter(l => l.source === source).length;
                            return (
                                <div key={source} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#ff914d]/50 transition-colors group">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#ff914d]">{source.replace(/-/g, ' ')}</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-black text-[#001341]">{count}</span>
                                        <span className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase">Leads</span>
                                    </div>
                                </div>
                            );
                        })}
                        {leads.filter(l => !l.source).length > 0 && (
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Direct / Legacy</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-[#001341]">{leads.filter(l => !l.source).length}</span>
                                    <span className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase">Leads</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* --- BLOGS, TEAM, OR JOBS TAB --- */}
        {(activeTab === "blogs" || activeTab === "team" || activeTab === "jobs" || activeTab === "links") && (
            <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#001341]">
                      {activeTab === 'blogs' ? "Premium Blog Editor" : activeTab === 'team' ? "Team Directory" : activeTab === 'jobs' ? "Job Listings" : "Short Link Manager"}
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
                                {(activeTab === "blogs" || activeTab === "jobs" || activeTab === "links") && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                                  {activeTab === 'blogs' ? 'Post Title' : activeTab === 'jobs' ? 'Job Title' : 'Link Reference Name'}
                                                </label>
                                                <input 
                                                    type="text" 
                                                    placeholder={activeTab === 'blogs' ? "The Future of AI..." : "MERN Developer"}
                                                    className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none text-lg font-semibold" 
                                                    value={formData.title} 
                                                    onChange={(e) => setFormData({ 
                                                        ...formData, 
                                                        title: e.target.value, 
                                                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") 
                                                    })} 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Permalink / Slug</label>
                                                <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-xl text-gray-500 text-sm overflow-hidden whitespace-nowrap">
                                                    <Globe size={14} /> <span>{activeTab === 'blogs' ? 'aiclex.in/' : activeTab === 'jobs' ? 'aiclex.in/career/' : 'aiclex.in/'}</span><strong>{activeTab === 'links' ? formData.short_slug : formData.slug}</strong>
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

                                              <div className="mt-4 flex flex-col md:flex-row gap-6">
                                                  <div className="flex-1">
                                                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Meta Description (SEO)</label>
                                                      <textarea 
                                                          rows={3}
                                                          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none text-sm"
                                                          placeholder="Enter a compelling description for Google search results..."
                                                          value={formData.meta_description}
                                                          onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                                                      />
                                                  </div>
                                                  <div className="md:w-64 flex items-center gap-3 bg-orange-50 p-4 rounded-xl border border-orange-100">
                                                      <input 
                                                          type="checkbox" 
                                                          id="show_popup"
                                                          className="w-5 h-5 accent-[#ff914d] cursor-pointer"
                                                          checked={formData.show_popup}
                                                          onChange={(e) => setFormData({...formData, show_popup: e.target.checked})}
                                                      />
                                                      <label htmlFor="show_popup" className="text-sm font-bold text-[#001341] cursor-pointer">
                                                          Show Lead Popup
                                                      </label>
                                                  </div>
                                              </div>
                                          </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                              {activeTab === 'blogs' ? 'Article Content' : activeTab === 'jobs' ? 'Job Description' : 'Description'}
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
                                        {activeTab === "links" && (
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                              <div className="space-y-2">
                                                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Desired Slug (aiclex.in/x)</label>
                                                  <input 
                                                      type="text" 
                                                      placeholder="e.g. promo-2024" 
                                                      className="w-full p-4 bg-gray-50 border-none rounded-xl" 
                                                      value={formData.short_slug} 
                                                      onChange={(e) => setFormData({...formData, short_slug: e.target.value})} 
                                                  />
                                              </div>
                                              <div className="space-y-2">
                                                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Destination URL</label>
                                                  <input 
                                                      type="text" 
                                                      placeholder="https://google.com/..." 
                                                      className="w-full p-4 bg-gray-50 border-none rounded-xl" 
                                                      value={formData.target_url} 
                                                      onChange={(e) => setFormData({...formData, target_url: e.target.value})} 
                                                  />
                                              </div>
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
                                      {activeTab === 'blogs' ? 'Publication' : activeTab === 'team' ? 'Identity' : activeTab === 'jobs' ? 'Job Title' : 'Short Link'}
                                    </th>
                                    <th className="p-6">
                                      {activeTab === 'blogs' ? 'Status/Date' : activeTab === 'team' ? 'Position' : activeTab === 'jobs' ? 'Department/Loc' : 'Clicks'}
                                    </th>
                                    <th className="p-6 text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(activeTab === 'blogs' ? posts : activeTab === 'team' ? team : activeTab === 'jobs' ? jobs : links).map((item) => (
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
                                            ) : activeTab === 'links' ? (
                                                <span className="px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-black rounded-lg uppercase tracking-wide">{item.clicks} Clicks</span>
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
                    {/* CRM STATS */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-[#001341] to-[#0a1f5e] p-6 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Total Leads</p>
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Users size={14} className="text-blue-300"/></div>
                                </div>
                                <p className="text-4xl font-black text-white">{leads.length}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-[#5271ff] p-6 rounded-3xl shadow-2xl border border-blue-400/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">New Leads</p>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><MessageSquare size={14} className="text-white"/></div>
                                </div>
                                <p className="text-4xl font-black text-white">{leads.filter(l => l.status === 'new' || !l.status).length}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#ff914d] to-orange-600 p-6 rounded-3xl shadow-2xl border border-orange-400/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black text-orange-100 uppercase tracking-widest">In Progress</p>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Phone size={14} className="text-white"/></div>
                                </div>
                                <p className="text-4xl font-black text-white">{leads.filter(l => l.status === 'contacted' || l.status === 'qualified').length}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-3xl shadow-2xl border border-green-400/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black text-green-100 uppercase tracking-widest">Converted</p>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle size={14} className="text-white"/></div>
                                </div>
                                <p className="text-4xl font-black text-white">{leads.filter(l => l.status === 'closed').length}</p>
                            </div>
                        </div>
                    </div>

                    {/* FILTERS */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,19,65,0.05)] border border-gray-100/50 p-8 sticky top-24 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h3 className="font-black text-[#001341] text-base flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-blue-50 text-[#5271ff] flex items-center justify-center">
                                        <Filter size={14} />
                                    </span>
                                    Filter Leads
                                </h3>
                                <button 
                                    onClick={exportToCSV}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-[#5271ff] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 group cursor-pointer"
                                    title="Export to CSV"
                                >
                                    <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                                    Export
                                </button>
                            </div>
                            
                            <div className="space-y-5 relative z-10">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Search Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                                        placeholder="Type name..."
                                        value={crmFilters.name}
                                        onChange={(e) => setCrmFilters({...crmFilters, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                                        placeholder="84494..."
                                        value={crmFilters.phone}
                                        onChange={(e) => setCrmFilters({...crmFilters, phone: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Registration Date</label>
                                    <input 
                                        type="date" 
                                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all text-gray-600"
                                        value={crmFilters.date}
                                        onChange={(e) => setCrmFilters({...crmFilters, date: e.target.value})}
                                    />
                                </div>
                                 <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Tool Source</label>
                                    <select 
                                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all text-gray-600 cursor-pointer appearance-none"
                                        value={crmFilters.source}
                                        onChange={(e) => setCrmFilters({...crmFilters, source: e.target.value})}
                                    >
                                        <option value="">All Tools / Channels</option>
                                        <option value="zoom_reseller">Zoom Reseller Package</option>
                                        <option value="ai-seo-checker">AI Website Auditor</option>
                                        <option value="ads-roi-calculator">Paid Ads ROI Calc</option>
                                        <option value="lead-cost-calculator">Lead Cost Benchmarker</option>
                                        <option value="webinar-profit-calculator">Webinar Profit Predictor</option>
                                        <option value="headline-generator">Viral Headline Gen</option>
                                        <option value="whatsapp-funnel-generator">WhatsApp Funnel Architect</option>
                                        <option value="funnel-builder-quiz">Funnel Strategy Quiz</option>
                                        <option value="product-background-changer">AI Product Photo Edit</option>
                                        <option value="ai-marketing-assistant">AI Marketing Assistant</option>
                                        <option value="HomeLeadForm">Strategy Call Form</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Filter by City</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                                        placeholder="e.g. Noida, Kota..."
                                        value={crmFilters.city}
                                        onChange={(e) => setCrmFilters({...crmFilters, city: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Filter by Service</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                                        placeholder="e.g. ERP, SEO..."
                                        value={crmFilters.service}
                                        onChange={(e) => setCrmFilters({...crmFilters, service: e.target.value})}
                                    />
                                </div>
                                <button onClick={() => setCrmFilters({name: "", phone: "", date: "", source: "", city: "", service: ""})} className="w-full py-4 mt-2 text-gray-400 font-bold text-xs uppercase hover:text-[#001341] transition cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-xl border border-transparent hover:border-gray-200">
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                         {/* LEADS LIST */}
                    <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,19,65,0.05)] border border-gray-100/50 flex flex-col h-full max-h-[900px] overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                            <div className="relative z-10">
                                <h3 className="font-black text-[#001341] text-lg">Lead Management</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time submission pipeline</p>
                            </div>
                            <div className="relative z-10 flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5271ff]"></span>
                                </span>
                                <span className="px-4 py-2 bg-[#001341] text-white text-[10px] font-black rounded-xl uppercase tracking-wider shadow-lg shadow-blue-900/20">{leads.length} Active Leads</span>
                            </div>
                        </div>
                        
                        <div className="divide-y divide-gray-50 overflow-y-auto flex-1 bg-gray-50/10">
                            {leads.length === 0 ? (
                                <div className="p-20 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                                    <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-blue-500/5 flex items-center justify-center mb-6 relative group">
                                        <div className="absolute inset-0 bg-blue-50 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
                                        <Users className="text-gray-300 group-hover:text-[#5271ff] transition-colors relative z-10" size={40} />
                                    </div>
                                    <h4 className="text-xl font-black text-[#001341] mb-2">No Leads Found</h4>
                                    <p className="text-gray-400 font-medium text-sm max-w-xs mx-auto">Adjust your filters or wait for new leads to enter the pipeline.</p>
                                </div>
                            ) : leads.map((lead) => (
                                <div key={lead.id} className="p-8 hover:bg-white transition-all group border-l-4 border-transparent hover:border-l-[#5271ff] hover:shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] relative">
                                    <div className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center text-[#001341] font-black text-sm uppercase shadow-sm border border-white">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <p className="font-black text-[#001341] text-xl leading-tight">{lead.name}</p>
                                                <div className="relative ml-2">
                                                    <select 
                                                        value={lead.status || 'new'} 
                                                        onChange={(e) => handleLeadUpdate(lead.id, { status: e.target.value })}
                                                        className={`appearance-none pl-4 pr-8 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none outline-none cursor-pointer shadow-sm transition-colors ${
                                                            lead.status === 'closed' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                                            lead.status === 'qualified' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                                                            lead.status === 'contacted' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                                                            'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        <option value="new">🆕 New</option>
                                                        <option value="contacted">📞 Contacted</option>
                                                        <option value="qualified">⭐ Qualified</option>
                                                        <option value="closed">✅ Closed / Converted</option>
                                                        <option value="junk">🚫 Junk / Spam</option>
                                                    </select>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-50">
                                                        <svg width="8" height="6" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                {lead.email && (
                                                    <a href={`mailto:${lead.email}`} className="text-xs text-gray-500 hover:text-[#5271ff] flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                                        <Globe size={12} className="text-gray-400" /> {lead.email}
                                                    </a>
                                                )}
                                                <a href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 hover:text-white hover:bg-green-500 flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 shadow-sm transition-all hover:shadow-md font-bold">
                                                    <Phone size={12} /> {lead.whatsapp}
                                                </a>
                                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 ml-2">
                                                    <CalendarIcon size={12} />
                                                    {new Date(lead.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                         <div className="flex flex-wrap xl:flex-col items-end gap-2 shrink-0 w-full xl:w-auto mt-4 xl:mt-0">
                                            <span className="px-3 py-1.5 bg-white text-[#5271ff] text-[9px] font-black rounded-lg border border-gray-100 shadow-sm uppercase tracking-widest flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#5271ff]"></span>
                                                {lead.source?.replace(/-/g, ' ') || 'Direct'}
                                            </span>
                                            {lead.service && (
                                                <span className="px-3 py-1.5 bg-white text-purple-600 text-[9px] font-black rounded-lg border border-gray-100 shadow-sm uppercase tracking-widest flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                                    Service: {lead.service}
                                                </span>
                                            )}
                                            {lead.city && (
                                                <span className="px-3 py-1.5 bg-white text-amber-600 text-[9px] font-black rounded-lg border border-gray-100 shadow-sm uppercase tracking-widest flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                    City: {lead.city}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100/50 group-hover:bg-white group-hover:border-gray-100 transition-colors">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <MessageSquare size={12} className="text-[#5271ff]" />
                                                User Requirement
                                            </p>
                                            <p className="text-xs text-gray-700 leading-relaxed font-medium italic">"{lead.requirement || 'No detailed requirement provided.'}"</p>
                                        </div>
                                        
                                        <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100/30 group-hover:bg-blue-50 group-hover:border-blue-100/50 transition-colors focus-within:bg-blue-50 focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-100">
                                            <p className="text-[10px] font-black text-[#5271ff] uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Pencil size={12} />
                                                Internal Remarks
                                            </p>
                                            <textarea 
                                                className="w-full bg-transparent border-none outline-none text-xs text-gray-700 font-medium placeholder:text-gray-400 resize-none min-h-[40px]"
                                                placeholder="Add internal notes about this lead... (Auto-saves on blur)"
                                                defaultValue={lead.remarks || ''}
                                                onBlur={(e) => handleLeadUpdate(lead.id, { remarks: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    
                                    {(lead.source_page || lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                                        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 pt-5 border-t border-gray-100 border-dashed">
                                            {lead.source_page && (
                                                <div className="flex items-center gap-2">
                                                    <Globe size={10} className="text-gray-400" />
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">Captured At:</p>
                                                    <a href={lead.source_page} target="_blank" rel="noopener noreferrer" className="text-[9px] text-[#5271ff] font-mono bg-blue-50/50 px-2.5 py-1 rounded-md border border-blue-100/50 truncate max-w-[200px] sm:max-w-[300px] hover:bg-blue-100 hover:border-blue-200 transition" title={lead.source_page}>{lead.source_page}</a>
                                                </div>
                                            )}
                                            {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <AlertTriangle size={10} className="text-gray-400" />
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">UTM Data:</span>
                                                    {lead.utm_source && (
                                                        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-bold rounded-md border border-rose-100 shadow-sm">
                                                            src: {lead.utm_source}
                                                        </span>
                                                    )}
                                                    {lead.utm_medium && (
                                                        <span className="px-2 py-0.5 bg-teal-50 text-teal-600 text-[9px] font-bold rounded-md border border-teal-100 shadow-sm">
                                                            med: {lead.utm_medium}
                                                        </span>
                                                    )}
                                                    {lead.utm_campaign && (
                                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-md border border-indigo-100 shadow-sm">
                                                            cmp: {lead.utm_campaign}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>                 </div>
                </div>
            </div>
        )}

        {/* --- SHORT LINKS TAB --- */}
        {activeTab === "links" && (
            <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#001341]">Short Link Manager</h2>
                    {!showForm && (
                        <button onClick={openNewForm} className="bg-[#ff914d] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md cursor-pointer">
                            <Plus size={18} /> Create Link
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {links.map((link) => (
                            <div key={link.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#ff914d] font-bold shadow-sm">
                                            <Globe size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#001341] text-lg leading-tight flex items-center gap-2">
                                                aiclex.in/{link.slug}
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded uppercase tracking-widest">{link.clicks} clicks</span>
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Redirects to: <span className="text-blue-500 font-mono break-all">{link.target_url}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleDelete(link.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {links.length === 0 && (
                            <div className="p-20 text-center flex flex-col items-center gap-4">
                                <Globe size={48} className="text-gray-100" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No short links created yet.</p>
                            </div>
                        )}
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