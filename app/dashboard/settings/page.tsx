"use client";

import { useState } from "react";
import { User, Lock, Save, Loader2, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    username: "admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/update-password", {
        method: "POST",
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setForm(f => ({ ...f, currentPassword: "", newPassword: "", confirmPassword: "" }));
      } else {
        alert(data.error || "Failed to update password");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100">
        <h2 className="text-2xl font-black text-[#001341] mb-2">Security Settings</h2>
        <p className="text-gray-500 text-sm mb-8">Update your administrator credentials.</p>

        {success && (
          <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 font-bold text-sm">
            <CheckCircle size={20} className="text-green-500" />
            Password updated successfully!
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={form.username}
                onChange={e => setForm({...form, username: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#5271ff] focus:ring-4 focus:ring-blue-50 transition-all text-[#001341] font-bold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                value={form.currentPassword}
                onChange={e => setForm({...form, currentPassword: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#5271ff] focus:ring-4 focus:ring-blue-50 transition-all text-[#001341] font-bold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={form.newPassword}
                  onChange={e => setForm({...form, newPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#5271ff] focus:ring-4 focus:ring-blue-50 transition-all text-[#001341] font-bold"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={form.confirmPassword}
                  onChange={e => setForm({...form, confirmPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#5271ff] focus:ring-4 focus:ring-blue-50 transition-all text-[#001341] font-bold"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#5271ff] hover:bg-blue-600 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Update Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}