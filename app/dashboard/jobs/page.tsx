"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Briefcase, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "", slug: "", content: "",
    department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: ""
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if(res.ok) setJobs(await res.json());
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setShowForm(true);
    setIsEditing(false);
    setFormData({ 
      title: "", slug: "", content: "", 
      department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: ""
    });
  };

  const handleEdit = (item: any) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(item.id);
    setFormData({ 
      title: item.title, 
      slug: item.slug, 
      content: item.description,
      department: item.department,
      location: item.location,
      type: item.type,
      salary: item.salary || "",
      experience: item.experience || "",
      requirements: item.requirements ? (Array.isArray(item.requirements) ? item.requirements.join(", ") : item.requirements) : ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEditing && editId ? `/api/jobs/${editId}` : `/api/jobs`;
    const method = isEditing && editId ? "PUT" : "POST";

    const payload = { 
        title: formData.title, 
        slug: formData.slug, 
        department: formData.department, 
        location: formData.location, 
        type: formData.type, 
        salary: formData.salary, 
        description: formData.content, 
        experience: formData.experience,
        requirements: typeof formData.requirements === 'string' ? formData.requirements.split(",").map(r => r.trim()) : formData.requirements
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setFormData({ title: "", slug: "", content: "", department: "Engineering", location: "Remote", type: "Full-time", salary: "", experience: "", requirements: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setSaving(false);
    
    fetchJobs();
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    fetchJobs();
    router.refresh();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#001341]">Job Listings</h2>
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
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Title</label>
                      <input 
                          type="text" 
                          placeholder="MERN Developer"
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
                          <Globe size={14} /> <span>aiclex.in/career/</span><strong>{formData.slug}</strong>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Department</label>
                    <select className="w-full p-4 bg-gray-50 border-none rounded-xl" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                      {["Engineering", "Sales", "Marketing", "Design", "HR", "Support", "Other"].map(d => <option key={d}>{d}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-xl" placeholder="Remote / Noida" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required/>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Salary Range</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-xl" placeholder="₹8L - ₹15L" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Experience</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-xl" placeholder="2-4 Years" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Type</label>
                    <select className="w-full p-4 bg-gray-50 border-none rounded-xl" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      {["Full-time", "Part-time", "Contract", "Internship"].map(d => <option key={d}>{d}</option>)}
                    </select>
                 </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Requirements (Comma separated)</label>
                 <textarea rows={3} className="w-full p-4 bg-gray-50 border-none rounded-xl" placeholder="React.js, Node.js, TypeScript..." value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} />
              </div>

              <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Description</label>
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
                        <th className="p-6">Job Title</th>
                        <th className="p-6">Department/Loc</th>
                        <th className="p-6 text-right">Settings</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {jobs.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm flex items-center justify-center">
                                      <Briefcase className="text-blue-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#001341] leading-none mb-1">{item.title}</p>
                                        <p className="text-xs text-gray-400 truncate max-w-xs">{item.slug}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-6">
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold text-gray-600">{item.department}</span>
                                  <span className="text-[10px] text-gray-400 uppercase">{item.location}</span>
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
                    {jobs.length === 0 && (
                        <tr><td colSpan={3} className="p-10 text-center text-gray-400">No jobs found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}