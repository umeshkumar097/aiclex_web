"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Clock, Loader2, ArrowRight, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type VerifyResponse = {
  status: "SUCCESS" | "FAILED" | "PENDING";
  plan_name?: string;
  customer_name?: string;
  customer_email?: string;
  total_amount?: number;
  error?: string;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [state, setState] = useState<"LOADING" | "SUCCESS" | "FAILED" | "PENDING">("LOADING");
  const [details, setDetails] = useState<VerifyResponse | null>(null);

  useEffect(() => {
    if (!orderId) { setState("FAILED"); return; }

    let attempts = 0;
    const maxAttempts = 6; // poll up to 6 times × 3s = 18 seconds

    const poll = async () => {
      try {
        const res  = await fetch(`/api/checkout/verify?order_id=${orderId}`);
        const data: VerifyResponse = await res.json();
        setDetails(data);

        if (data.status === "SUCCESS") { setState("SUCCESS"); return; }
        if (data.status === "FAILED")  { setState("FAILED");  return; }

        // PENDING — retry
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 3000);
        } else {
          setState("PENDING"); // show pending after max retries
        }
      } catch {
        setState("FAILED");
      }
    };

    poll();
  }, [orderId]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (state === "LOADING") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfc]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="text-[#5271ff]" size={48} />
        </motion.div>
        <p className="text-[#001341] font-bold mt-6 text-lg">Verifying your payment securely…</p>
        <p className="text-gray-400 text-sm mt-2">This usually takes just a few seconds.</p>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (state === "SUCCESS") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-[#eef1ff] flex flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="bg-white rounded-3xl shadow-2xl border border-green-100 p-12 max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={52} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-[#001341] mb-3">Payment Successful! 🎉</h1>
          <p className="text-gray-500 mb-6">
            Your subscription is now <span className="font-black text-green-600">ACTIVE</span>.
            A confirmation & invoice has been sent to your email.
          </p>

          {/* Details card */}
          <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 mb-8 border border-gray-100">
            {details?.plan_name && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold">Plan</span>
                <span className="font-black text-[#001341]">{details.plan_name}</span>
              </div>
            )}
            {details?.total_amount !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold">Amount Paid</span>
                <span className="font-black text-[#5271ff]">₹{Number(details.total_amount).toLocaleString("en-IN")}</span>
              </div>
            )}
            {orderId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold">Order ID</span>
                <span className="font-mono text-xs text-gray-600 break-all">{orderId}</span>
              </div>
            )}
            {details?.customer_email && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold">Invoice sent to</span>
                <span className="font-semibold text-[#001341]">{details.customer_email}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 py-3 px-6 bg-[#001341] hover:bg-[#5271ff] text-white rounded-xl font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={16} />
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-[#001341] rounded-xl font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <Home size={16} />
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Pending ──────────────────────────────────────────────────────────────
  if (state === "PENDING") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl border border-yellow-100 p-12 max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock size={52} className="text-yellow-500" />
          </div>
          <h1 className="text-3xl font-black text-[#001341] mb-3">Payment Pending ⏳</h1>
          <p className="text-gray-500 mb-6">
            Your payment is still being confirmed by the bank. This can take a few minutes.
            Please check your dashboard after some time — your subscription will activate automatically.
          </p>
          {orderId && (
            <p className="text-xs text-gray-400 mb-8 font-mono bg-gray-50 p-3 rounded-xl">Order ID: {orderId}</p>
          )}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 py-3 px-8 bg-[#001341] hover:bg-[#5271ff] text-white rounded-xl font-black uppercase tracking-wide transition-all"
          >
            <LayoutDashboard size={16} />
            Check Dashboard
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── Failed ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="bg-white rounded-3xl shadow-2xl border border-red-100 p-12 max-w-lg w-full text-center"
      >
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={52} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-[#001341] mb-3">Payment Failed ❌</h1>
        <p className="text-gray-500 mb-6">
          Oops! The payment could not be completed. No money has been deducted from your account.
          Please try again or contact us if the issue persists.
        </p>
        {orderId && (
          <p className="text-xs text-gray-400 mb-8 font-mono bg-gray-50 p-3 rounded-xl">Order ID: {orderId}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/pricing"
            className="flex-1 py-3 px-6 bg-[#001341] hover:bg-[#5271ff] text-white rounded-xl font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight size={16} />
            Try Again
          </Link>
          <Link
            href="/contact"
            className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-[#001341] rounded-xl font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5271ff]" size={40} />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
