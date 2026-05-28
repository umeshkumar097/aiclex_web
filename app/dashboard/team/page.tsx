"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeamPage() {
  const router = useRouter();
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", image: ""
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team");
      if(res.ok) setTeam(await res.json());
    } catch (error) {
      console.error("Failed to fetch team", error);
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
    setFormData({ name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", image: "" });
  };

  const handleEdit = (item: any) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(item.id);
    setFormData({ 
      name: item.name, 
      role: item.role, 
      image: item.image_url || "", 
      bio: item.bio, 
      linkedin: item.linkedin || "", 
      twitter: item.twitter || "", 
      email: item.email || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEditing && editId ? `/api/team/${editId}` : `/api/team`;
    const method = isEditing && editId ? "PUT" : "POST";

    const payload = { 
        name: formData.name, 
        role: formData.role, 
        bio: formData.bio, 
        linkedin: formData.linkedin, 
        twitter: formData.twitter, 
        email: formData.email, 
        image_url: formData.image 
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setFormData({ name: "", role: "", bio: "", linkedin: "", twitter: "", email: "", image: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setSaving(false);
    
    fetchTeam();
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    fetchTeam();
    router.refresh();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#001341]">Team Directory</h2>
        {!showForm && (
            <button onClick={openNewForm} className="bg-[#ff914d] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md cursor-pointer">
                <Plus size={18} /> Add Member
            </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
          <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition cursor-pointer">
              <X size={24} />
          </button>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="space-y-4">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Image</label>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="w-32 h-32 shrink-0">
                          <div className="relative group overflow-hidden rounded-full border-2 border-dashed border-gray-200 h-full w-full flex items-center justify-center bg-gray-50">
                              {formData.image ? (
                                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                  <div className="text-center text-gray-400">
                                      <ImageIcon size={32} className="mx-auto mb-1 opacity-20" />
                                  </div>
                              )}
                              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                  <span className="text-white font-bold bg-[#ff914d] px-2 py-1 rounded-lg text-[10px]">Change</span>
                                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                              </label>
                          </div>
                      </div>
                      <div className="w-full md:flex-1 space-y-2">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="p-4 bg-gray-50 border-none rounded-xl" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required/>
                  <input type="text" placeholder="Role (e.g. CTO)" className="p-4 bg-gray-50 border-none rounded-xl" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required/>
                  
                  <input type="email" placeholder="Email Address" className="p-4 bg-gray-50 border-none rounded-xl" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input type="text" placeholder="LinkedIn URL" className="p-4 bg-gray-50 border-none rounded-xl" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
                  <input type="text" placeholder="Twitter URL" className="p-4 bg-gray-50 border-none rounded-xl" value={formData.twitter} onChange={(e) => setFormData({...formData, twitter: e.target.value})} />

                  <textarea rows={4} className="md:col-span-2 p-4 bg-gray-50 border-none rounded-xl" placeholder="Bio..." value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
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
                        <th className="p-6">Identity</th>
                        <th className="p-6">Position</th>
                        <th className="p-6 text-right">Settings</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {team.map((item) => (
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
                                        <p className="font-bold text-[#001341] leading-none mb-1">{item.name}</p>
                                        <p className="text-xs text-gray-400 truncate max-w-xs">{item.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-6">
                                <span className="px-3 py-1 bg-blue-50 text-[#001341] text-[10px] font-black rounded-lg uppercase tracking-wide">{item.role}</span>
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
                    {team.length === 0 && (
                        <tr><td colSpan={3} className="p-10 text-center text-gray-400">No team members found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}