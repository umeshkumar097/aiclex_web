"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#5271ff] mb-4" size={40} />
        <p>Verifying payment...</p>
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
