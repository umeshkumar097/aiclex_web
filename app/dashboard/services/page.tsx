"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, Star } from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    pricing: "",
    status: "active",
    featured: false
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      if (res.ok) setServices(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/services/${editId}` : "/api/services";
    const method = isEditing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    setShowForm(false);
    fetchServices();
  };

  const handleEdit = (service: any) => {
    setFormData({
      name: service.name,
      pricing: service.pricing || "",
      status: service.status,
      featured: service.featured
    });
    setEditId(service.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this service?")) {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#001341]">Services Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your agency offerings</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => {
              setFormData({ name: "", pricing: "", status: "active", featured: false });
              setIsEditing(false);
              setShowForm(true);
            }} 
            className="bg-[#5271ff] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-600 transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus size={18} /> Add Service
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative max-w-2xl">
          <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition cursor-pointer">
              <X size={20} />
          </button>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Service Name</label>
                <input 
                    type="text" 
                    placeholder="e.g. AI Calling, SEO"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#5271ff] focus:border-[#5271ff] outline-none text-sm font-semibold" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    required 
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pricing / Starting From</label>
                <input 
                    type="text" 
                    placeholder="e.g. ₹15,000 / month"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm font-semibold" 
                    value={formData.pricing} 
                    onChange={(e) => setFormData({...formData, pricing: e.target.value})} 
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#5271ff] outline-none text-sm font-semibold"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input 
                    type="checkbox" 
                    id="featured" 
                    className="w-5 h-5 rounded border-gray-300 text-[#5271ff] focus:ring-[#5271ff]"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <label htmlFor="featured" className="text-sm font-bold text-gray-700 cursor-pointer flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" /> Featured Service
                  </label>
                </div>
            </div>
            
            <button type="submit" className="w-full bg-[#001341] text-white p-4 rounded-xl font-bold hover:bg-blue-900 transition mt-2">
                {isEditing ? "Update Service" : "Save Service"}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100 group relative">
            {service.featured && (
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                <Star size={18} className="text-white fill-white" />
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#5271ff] font-black text-sm uppercase">
                {service.name.substring(0, 2)}
              </div>
              <div>
                <h3 className="font-black text-[#001341] text-lg leading-tight">{service.name}</h3>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${service.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {service.status}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pricing</p>
              <p className="text-sm font-bold text-gray-700">{service.pricing || 'Custom Pricing'}</p>
            </div>
            
            <div className="flex justify-end gap-2 border-t border-gray-50 pt-4">
              <button onClick={() => handleEdit(service)} className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-blue-50 hover:text-[#5271ff] transition">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(service.id)} className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && !showForm && (
          <div className="col-span-full p-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No services added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
