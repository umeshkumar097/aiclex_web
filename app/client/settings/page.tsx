"use client";

import { useState } from "react";
import { Loader2, Lock, Save } from "lucide-react";

export default function ClientSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/client/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "Password updated successfully!", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: data.error || "Failed to update password", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "A network error occurred.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-[#001341] mb-6">Settings</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 text-[#5271ff] rounded-xl flex items-center justify-center">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#001341]">Change Password</h2>
            <p className="text-sm text-gray-500">Update your temporary or existing password</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-sm font-bold text-center ${message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
              {message.text}
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#001341] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#5271ff] transition flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
