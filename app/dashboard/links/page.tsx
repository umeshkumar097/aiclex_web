"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LinksPage() {
  const router = useRouter();
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    short_slug: "",
    target_url: ""
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/short-links");
      if(res.ok) setLinks(await res.json());
    } catch (error) {
      console.error("Failed to fetch links", error);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setShowForm(true);
    setIsEditing(false);
    setFormData({ short_slug: "", target_url: "" });
  };

  const handleEdit = (item: any) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(item.id);
    setFormData({ short_slug: item.slug, target_url: item.target_url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEditing && editId ? `/api/short-links?id=${editId}` : `/api/short-links`;
    const method = isEditing && editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: formData.short_slug, target_url: formData.target_url }),
    });

    setFormData({ short_slug: "", target_url: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setSaving(false);
    
    fetchLinks();
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this short link?")) return;
    await fetch(`/api/short-links?id=${id}`, { method: "DELETE" });
    fetchLinks();
    router.refresh();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#001341]">Short Link Manager</h2>
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
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Link Reference Name</label>
                      <input 
                          type="text" 
                          placeholder="e.g. Promo Link"
                          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none text-lg font-semibold" 
                          value={formData.short_slug} 
                          onChange={(e) => setFormData({ 
                              ...formData, 
                              short_slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") 
                          })} 
                          required 
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Permalink / Slug</label>
                      <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-xl text-gray-500 text-sm overflow-hidden whitespace-nowrap">
                          <Globe size={14} /> <span>aiclex.in/</span><strong>{formData.short_slug}</strong>
                      </div>
                  </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Destination URL</label>
                      <input 
                          type="url" 
                          placeholder="https://google.com/..." 
                          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#001341] outline-none" 
                          value={formData.target_url} 
                          onChange={(e) => setFormData({...formData, target_url: e.target.value})} 
                          required
                      />
                  </div>
              </div>
              <div className="flex gap-4 border-t border-gray-50 pt-8">
                  <button disabled={saving} className="bg-[#001341] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                      {saving ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                      {isEditing ? "Save Changes" : "Create Link"}
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
                        <th className="p-6">Short Link</th>
                        <th className="p-6">Target URL</th>
                        <th className="p-6">Clicks</th>
                        <th className="p-6 text-right">Settings</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {links.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm flex items-center justify-center">
                                      <Globe className="w-full h-full p-3 text-gray-300" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#001341] leading-none mb-1">aiclex.in/{item.slug}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-6">
                                <span className="text-xs text-gray-500 truncate max-w-xs block">{item.target_url}</span>
                            </td>
                            <td className="p-6">
                                <span className="px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-black rounded-lg uppercase tracking-wide">{item.clicks || 0} Clicks</span>
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
                    {links.length === 0 && (
                        <tr><td colSpan={4} className="p-10 text-center text-gray-400">No short links found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}