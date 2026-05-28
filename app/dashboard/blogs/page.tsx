"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Image as ImageIcon, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function BlogsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    meta_description: "",
    show_popup: true,
    image: ""
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      if(res.ok) setPosts(await res.json());
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

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

      if (!res.ok) throw new Error(`Upload failed`);
      const data = await res.json();
      
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const openNewForm = () => {
    setShowForm(true);
    setIsEditing(false);
    setFormData({ title: "", slug: "", content: "", meta_description: "", show_popup: true, image: "" });
  };

  const handleEdit = (item: any) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(item.id);
    setFormData({ 
      title: item.title, 
      slug: item.slug, 
      image: item.image_url || "", 
      content: item.content,
      meta_description: item.meta_description || "",
      show_popup: item.show_popup !== false
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEditing && editId ? `/api/blog/${editId}` : `/api/blog`;
    const method = isEditing && editId ? "PUT" : "POST";

    const payload = { 
        title: formData.title, 
        slug: formData.slug, 
        content: formData.content, 
        image_url: formData.image,
        meta_description: formData.meta_description,
        show_popup: formData.show_popup
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setFormData({ title: "", slug: "", content: "", meta_description: "", show_popup: true, image: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setSaving(false);
    
    fetchPosts();
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchPosts();
    router.refresh();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#001341]">Premium Blog Editor</h2>
        {!showForm && (
            <button onClick={openNewForm} className="bg-[#ff914d] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md cursor-pointer">
                <Plus size={18} /> Add New
            </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
          <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition cursor-pointer">
              <X size={24} />
          </button>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Post Title</label>
                      <input 
                          type="text" 
                          placeholder="The Future of AI..."
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
                          <Globe size={14} /> <span>aiclex.in/blog/</span><strong>{formData.slug}</strong>
                      </div>
                  </div>
              </div>

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

              <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Article Content</label>
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 min-h-[400px]">
                      <ReactQuill 
                          theme="snow" 
                          value={formData.content} 
                          onChange={(val) => setFormData({...formData, content: val})} 
                          className="h-[350px]"
                      />
                  </div>
              </div>

              <div className="flex gap-4 border-t border-gray-50 pt-8">
                  <button disabled={saving} className="bg-[#001341] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                      {saving ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                      {isEditing ? "Save Changes" : "Publish to Site"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition cursor-pointer">
                      Discard
                  </button>
              </div>
          </form>
        </div>
      )}

      {!showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                        <th className="p-6">Publication</th>
                        <th className="p-6">Status/Date</th>
                        <th className="p-6 text-right">Settings</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {posts.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm flex items-center justify-center">
                                        {item.image_url ? (
                                          <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                          <ImageIcon className="w-full h-full p-3 text-gray-300" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#001341] leading-none mb-1">{item.title}</p>
                                        <p className="text-xs text-gray-400 truncate max-w-xs">{item.slug}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Live - {new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                            </td>
                            <td className="p-6 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(item)} className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {posts.length === 0 && (
                        <tr><td colSpan={3} className="p-10 text-center text-gray-400">No blogs found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}