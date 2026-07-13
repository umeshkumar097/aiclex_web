"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, Loader2, CheckCircle, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Recovery token is missing. Please request a new reset link.");
      setLoading(false);
      return;
    }

    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const res = await fetch(`/api/auth/reset-password?token=${token}`);
      const data = await res.json();

      if (res.ok) {
        setEmail(data.email);
      } else {
        setError(data.error || "This password recovery link is invalid or has expired.");
      }
    } catch (err) {
      setError("Failed to verify recovery link. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      } else {
        setError(data.error || "Failed to update your password.");
      }
    } catch (err) {
      setError("Connection failure. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Loader2 className="animate-spin text-[#001341] mb-4" size={40} />
        <p className="text-gray-500 font-medium">Validating recovery link...</p>
      </div>
    );
  }

  if (error && !success) {
    return (
      <div className="bg-red-50/50 border border-red-100 p-8 rounded-3xl text-center space-y-4">
        <div className="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto">
          <ShieldAlert size={28} />
        </div>
        <h2 className="text-xl font-bold text-[#001341]">Invalid Link</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">{error}</p>
        <div className="pt-2">
          <Link 
            href="/forgot-password" 
            className="inline-block px-6 py-2.5 bg-[#001341] text-white font-bold rounded-xl text-xs hover:bg-blue-900 transition shadow-sm"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-green-50/50 border border-green-100 p-8 rounded-3xl text-center space-y-4">
        <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
          <CheckCircle size={28} />
        </div>
        <h2 className="text-xl font-bold text-[#001341]">Password Reset!</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Your account password was successfully updated. Redirecting you to sign in...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
      <div className="text-center mb-8 border-b border-gray-50 pb-5">
        <div className="h-12 w-12 bg-[#001341] rounded-2xl flex items-center justify-center text-[#ff914d] font-black text-2xl mx-auto mb-4">
          A
        </div>
        <h1 className="text-2xl font-bold text-[#001341]">Reset Password</h1>
        <p className="text-gray-500 text-sm mt-1">
          Specify a new password for your account
        </p>
        <p className="text-gray-400 text-xs mt-0.5 font-semibold">{email}</p>
      </div>

      <form onSubmit={handleReset} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
            <input
              type="password"
              required
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#001341] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
            <input
              type="password"
              required
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#001341] outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
            <ShieldAlert size={14} className="shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-[#001341] hover:bg-blue-900 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Resetting Password...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <Loader2 className="animate-spin text-[#001341] mb-4" size={40} />
          <p className="text-gray-500 font-medium">Loading password reset form...</p>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
