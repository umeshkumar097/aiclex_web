"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ 
          text: "Password recovery link has been dispatched to your email address.", 
          type: "success" 
        });
        setEmail("");
      } else {
        setMessage({ 
          text: data.error || "Failed to initiate recovery request.", 
          type: "error" 
        });
      }
    } catch (err) {
      setMessage({ 
        text: "Connection failure. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] mt-10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
        
        <div className="mb-6">
          <Link 
            href="/signin" 
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#001341] font-bold"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-[#001341] rounded-xl flex items-center justify-center text-[#ff914d] font-bold text-2xl mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-bold text-[#001341]">Recover Password</h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001341]"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
              message.type === "success" 
                ? "bg-green-50 text-green-700 border border-green-150" 
                : "bg-red-50 text-red-700 border border-red-150"
            }`}>
              {message.type === "success" ? <CheckCircle size={14} className="shrink-0" /> : <ShieldAlert size={14} className="shrink-0" />}
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#001341] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
