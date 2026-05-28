"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState<"LOADING" | "SUCCESS" | "FAILED" | "PENDING">("LOADING");

  useEffect(() => {
    if (orderId) {
      fetch(`/api/checkout/verify?order_id=${orderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status) {
            setStatus(data.status);
          } else {
            setStatus("FAILED");
          }
        })
        .catch(() => setStatus("FAILED"));
    }
  }, [orderId]);

  if (!orderId || status === "LOADING") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfc]">
        <Loader2 className="animate-spin text-[#5271ff] mb-4" size={40} />
        <p className="text-[#001341] font-bold">Verifying your payment securely...</p>
      </div>
    );
  }

  if (status === "FAILED") {
    return (
      <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 text-[#001341] flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border border-gray-100">
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-black mb-4">Payment Failed!</h1>
          <p className="text-gray-500 mb-8">
            Oops! It seems you missed completing the payment. Don't worry, no money was deducted.
          </p>
          <Link 
            href="/pricing"
            className="inline-block py-3 px-8 bg-[#001341] text-white hover:bg-[#5271ff] rounded-xl font-bold transition-all"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  if (status === "PENDING") {
    return (
      <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 text-[#001341] flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border border-gray-100">
          <Loader2 size={80} className="text-yellow-500 animate-spin mx-auto mb-6" />
          <h1 className="text-3xl font-black mb-4">Payment Pending</h1>
          <p className="text-gray-500 mb-8">
            Your payment is taking longer than usual to confirm. Please check your dashboard in a few minutes.
          </p>
          <Link 
            href="/dashboard"
            className="inline-block py-3 px-8 bg-[#001341] text-white hover:bg-[#5271ff] rounded-xl font-bold transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 text-[#001341] flex flex-col items-center justify-center">
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border border-gray-100">
        <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-black mb-4">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your subscription is now active.
          <br />
          Order ID: <span className="font-bold text-[#001341]">{orderId}</span>
        </p>
        <Link 
          href="/dashboard"
          className="inline-block py-3 px-8 bg-[#001341] text-white hover:bg-[#5271ff] rounded-xl font-bold transition-all"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#5271ff]" size={40} /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
