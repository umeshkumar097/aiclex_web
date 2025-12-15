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
  Loader2 
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  // --- AUTH STATE ---
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- APP STATE ---
  const [activeTab, setActiveTab] = useState("overview"); 
  const [posts, setPosts] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // For form saving
  
  // Form State
  const [formData, setFormData] = useState({ 
    title: "", slug: "", content: "",
    name: "", role: "", bio: "", linkedin: "", twitter: "", email: "",
    image: "" 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // --- 🔒 AUTHENTICATION CHECK ---
  useEffect(() => {
    // Check if code is running in browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      
      if (!token) {
        // Not logged in? Redirect immediately
        router.push("/signin"); 
      } else {
        // Logged in? Allow access
        setIsAuthorized(true);
        // Fetch data only after auth is confirmed
        fetchPosts();
        fetchTeam();
      }
    }
  }, [router]);

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

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    // 1. Remove the token
    localStorage.removeItem("admin_token");
    // 2. Redirect to login
    router.push("/signin");
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = activeTab === "blogs" ? "blog" : "team";
    const url = isEditing && editId ? `/api/${endpoint}/${editId}` : `/api/${endpoint}`;
    const method = isEditing && editId ? "PUT" : "POST";

    const payload = activeTab === "blogs" 
      ? { title: formData.title, slug: formData.slug, content: formData.content, image_url: formData.image }
      : { name: formData.name, role: formData.role, bio: formData.bio, linkedin: formData.linkedin, twitter: formData.twitter, email: formData.email, image_url: formData.image };

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setFormData({ title: "", slug: "", content: "", name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", image: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
    
    if (activeTab === "blogs") fetchPosts();
    else fetchTeam();
    
    router.refresh();
    alert(isEditing ? "✅ Updated successfully!" : "✅ Created successfully!");
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const endpoint = activeTab === "blogs" ? "blog" : "team";
    await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
    
    if (activeTab === "blogs") fetchPosts();
    else fetchTeam();
    
    router.refresh();
  };

  // --- EDIT SETUP ---
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
    setFormData({ title: "", slug: "", content: "", name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", image: "" });
  };

  // 🚫 BLOCK RENDER UNTIL AUTH CHECK IS DONE
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

  // ✅ RENDER DASHBOARD (Only if Authorized)
  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#001341] text-white hidden md:flex flex-col h-screen fixed left-0 top-0 z-50">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="h-8 w-8 bg-[#ff914d] rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="text-xl font-bold tracking-wide">AICLEX Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("overview")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "overview" ? "bg-[#ff914d] text-white shadow-lg" : "text-gray-300 hover:bg-white/10"}`}
          >
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab("blogs")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "blogs" ? "bg-[#ff914d] text-white shadow-lg" : "text-gray-300 hover:bg-white/10"}`}
          >
            <FileText size={20} /> <span>Blog Management</span>
          </button>

          <button 
            onClick={() => setActiveTab("team")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "team" ? "bg-[#ff914d] text-white shadow-lg" : "text-gray-300 hover:bg-white/10"}`}
          >
            <Users size={20} /> <span>Team Management</span>
          </button>

          <button 
            onClick={() => setActiveTab("settings")} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition-all cursor-pointer"
          >
            <Settings size={20} /> <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={20} />
            <span>Logout</span>
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
                {/* 1. Welcome Banner */}
                <div className="bg-gradient-to-r from-[#001341] to-[#1e3a8a] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
                        <p className="text-blue-100 max-w-xl">
                            You have <span className="font-bold text-[#ff914d] mx-1">{posts.length}</span> blog posts and <span className="font-bold text-[#ff914d] mx-1">{team.length}</span> team members.
                        </p>
                        <button 
                          onClick={() => { setActiveTab("blogs"); openNewForm(); }}
                          className="mt-6 bg-[#ff914d] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={20} /> Write New Blog
                        </button>
                    </div>
                    <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                {/* 2. Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-[#001341]">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Posts</p>
                            <h3 className="text-2xl font-bold text-[#001341]">{posts.length}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Team Members</p>
                            <h3 className="text-2xl font-bold text-[#001341]">{team.length}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <Settings size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">System Status</p>
                            <h3 className="text-2xl font-bold text-[#001341]">Active</h3>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- BLOGS OR TEAM TAB --- */}
        {(activeTab === "blogs" || activeTab === "team") && (
            <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#001341]">{activeTab === 'blogs' ? "Blog Posts" : "Team List"}</h2>
                    {!showForm && (
                        <button 
                            onClick={openNewForm} 
                            className="bg-[#ff914d] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md cursor-pointer"
                        >
                            <Plus size={18} /> Add New
                        </button>
                    )}
                </div>

                {/* FORM SECTION */}
                {showForm && (
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
                        <button 
                            onClick={() => setShowForm(false)} 
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition cursor-pointer"
                        >
                            <X size={24} />
                        </button>
                        
                        <h3 className="text-xl font-bold mb-6 text-[#001341]">{isEditing ? "Edit Item" : "Create New Item"}</h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            
                            {activeTab === "blogs" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter title..." 
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]" 
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
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
                                            value={formData.slug} 
                                            readOnly 
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "team" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                        <input type="text" placeholder="Name" className="w-full p-3 border border-gray-200 rounded-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                                        <input type="text" placeholder="e.g. CEO" className="w-full p-3 border border-gray-200 rounded-lg" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Short Bio</label>
                                        <textarea rows={3} placeholder="Bio..." className="w-full p-3 border border-gray-200 rounded-lg" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                                    </div>
                                    <input type="text" placeholder="LinkedIn URL" className="w-full p-3 border border-gray-200 rounded-lg" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
                                    <input type="text" placeholder="Twitter URL" className="w-full p-3 border border-gray-200 rounded-lg" value={formData.twitter} onChange={(e) => setFormData({...formData, twitter: e.target.value})} />
                                    <input type="email" placeholder="Email" className="w-full p-3 border border-gray-200 rounded-lg md:col-span-2" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                                <input 
                                    type="text" 
                                    placeholder="https://..." 
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]" 
                                    value={formData.image} 
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                                />
                            </div>

                            {activeTab === 'blogs' && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Content (Markdown)</label>
                                    <textarea 
                                        rows={8} 
                                        placeholder="# Write content here..." 
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341] font-mono text-sm" 
                                        value={formData.content} 
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                                        required 
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button 
                                    disabled={loading} 
                                    className="bg-[#001341] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg cursor-pointer"
                                >
                                    {loading ? "Saving..." : isEditing ? "Update" : "Publish"}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setShowForm(false)} 
                                    className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* TABLE */}
                {!showForm && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">{activeTab === 'blogs' ? 'Title' : 'Name'}</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">{activeTab === 'blogs' ? 'Date' : 'Role'}</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(activeTab === 'blogs' ? posts : team).map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="p-5 font-medium text-[#001341]">
                                            <div className="flex items-center gap-3">
                                                {item.image_url && <img src={item.image_url} alt="" className="w-8 h-8 rounded-full object-cover" />}
                                                {item.title || item.name}
                                            </div>
                                        </td>
                                        <td className="p-5 text-gray-500 text-sm">
                                            {activeTab === 'blogs' ? new Date(item.created_at).toLocaleDateString() : item.role}
                                        </td>
                                        
                                        <td className="p-5 flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleEdit(item)} 
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                                                title="Edit"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button 
                                                onClick={() => handleDelete(item.id)} 
                                                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(activeTab === 'blogs' ? posts : team).length === 0 && (
                            <div className="p-8 text-center text-gray-400">No records found.</div>
                        )}
                    </div>
                )}
            </div>
        )}
      </main>
    </div>
  );
}