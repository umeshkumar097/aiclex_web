"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("user_info", JSON.stringify(data.user));
        
        if (data.user.role !== 'client') {
          router.push("/dashboard");
        } else {
          router.push("/client");
        }
      } else {
        setError(data.error || "Invalid email or password");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] mt-10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-[#001341] rounded-xl flex items-center justify-center text-[#ff914d] font-bold text-2xl mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-bold text-[#001341]">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to manage your blog</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="email" 
                required
                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]"
                placeholder="admin@aiclex.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <a href="/forgot-password" className="text-xs text-[#5271ff] hover:underline font-bold">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="password" 
                required
                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#001341] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2"
          >
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}