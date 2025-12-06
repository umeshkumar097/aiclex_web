"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Pencil, 
  Trash2, 
  X,
  Eye 
} from "lucide-react";

export default function Dashboard() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("overview"); 
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ title: "", slug: "", image: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  // --- LOAD DATA ---
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts");
    }
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = isEditing && editId ? `/api/blog/${editId}` : "/api/blog";
    const method = isEditing && editId ? "PUT" : "POST";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        image: formData.image.trim(),
      }),
    });

    setFormData({ title: "", slug: "", image: "", content: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
    fetchPosts();
    router.refresh();
    alert(isEditing ? "✅ Post Updated!" : "✅ Post Created!");
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchPosts();
    router.refresh();
  };

  // --- EDIT SETUP ---
  const handleEdit = (post: any) => {
    setActiveTab("blogs");
    setShowForm(true);
    setIsEditing(true);
    setEditId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      image: post.image_url || "",
      content: post.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            onClick={() => setActiveTab("settings")} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition-all cursor-pointer"
          >
            <Settings size={20} /> <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-3xl font-extrabold text-[#001341]">
                    {activeTab === 'overview' ? 'Dashboard Overview' : 'Manage Blogs'}
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
                            Here is what is happening with your blog today. You have published 
                            <span className="font-bold text-[#ff914d] mx-1">{posts.length}</span> 
                            posts so far. Keep up the great work!
                        </p>
                        <button 
                            onClick={() => { setActiveTab("blogs"); setShowForm(true); }}
                            className="mt-6 bg-[#ff914d] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={20} /> Write New Blog
                        </button>
                    </div>
                    {/* Decorative Circle */}
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
                            <LayoutDashboard size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Views</p>
                            <h3 className="text-2xl font-bold text-[#001341]">12.5k <span className="text-xs text-green-500 ml-1">↑ 12%</span></h3>
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

                {/* 3. Recent Activity Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-[#001341]">Recent Publications</h3>
                        <button 
                            onClick={() => setActiveTab("blogs")}
                            className="text-sm text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {posts.slice(0, 3).map((post) => (
                            <div 
                                key={post.id} 
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer" 
                                onClick={() => handleEdit(post)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                        {post.image_url ? (
                                            <img src={post.image_url} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">IMG</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#001341] line-clamp-1">{post.title}</h4>
                                        <p className="text-xs text-gray-500">Published on {new Date(post.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 transition cursor-pointer">
                                        <Pencil size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {posts.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                No activity yet. Start writing!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* --- BLOGS TAB --- */}
        {activeTab === "blogs" && (
            <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#001341]">Blog Posts</h2>
                    {!showForm && (
                        <button 
                            onClick={() => { setShowForm(true); setIsEditing(false); setFormData({ title: "", slug: "", image: "", content: "" }); }} 
                            className="bg-[#ff914d] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md cursor-pointer"
                        >
                            <Plus size={18} /> Add New Blog
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
                        
                        <h3 className="text-xl font-bold mb-6 text-[#001341]">{isEditing ? "Edit Blog Post" : "Create New Post"}</h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Slug (Auto-generated)</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
                                        value={formData.slug} 
                                        readOnly 
                                    />
                                </div>
                            </div>

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

                            <div className="flex gap-3 pt-2">
                                <button 
                                    disabled={loading} 
                                    className="bg-[#001341] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg cursor-pointer"
                                >
                                    {loading ? "Saving..." : isEditing ? "Update Post" : "Publish Post"}
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
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-5 font-semibold text-gray-600 text-sm">Title</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm">Date</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="p-5 font-medium text-[#001341]">{post.title}</td>
                                    <td className="p-5 text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</td>
                                    
                                    <td className="p-5 flex justify-end gap-3">
                                        <Link 
                                            href={`/blog/${post.slug}`} 
                                            target="_blank" 
                                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition cursor-pointer"
                                            title="View Live"
                                        >
                                            <Eye size={18} />
                                        </Link>

                                        <button 
                                            onClick={() => handleEdit(post)} 
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                                            title="Edit"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button 
                                            onClick={() => handleDelete(post.id)} 
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
                </div>
            </div>
        )}
      </main>
    </div>
  );
}