"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import Script from "next/script";

const PLANS: Record<string, { name: string, price: number, billing: string, slug: string }> = {
  "whatspilot-starter": { name: "WhatsPilot Starter", price: 1599, billing: "Monthly", slug: "whatspilot-starter" },
  "whatspilot-business": { name: "WhatsPilot Business Pro", price: 3999, billing: "Monthly", slug: "whatspilot-business" },
  "zoom-pro-basic": { name: "Zoom Pro Basic", price: 11200, billing: "Yearly", slug: "zoom-pro-basic" },
  "zoom-coaches-plan": { name: "Zoom Coaches Plan", price: 50000, billing: "Yearly", slug: "zoom-coaches-plan" },
  "zoom-business": { name: "Zoom Business", price: 18500, billing: "Yearly", slug: "zoom-business" },
  "zoom-webinar-500": { name: "Zoom Webinar Plan", price: 70000, billing: "Yearly", slug: "zoom-webinar-500" },
  "zoom-smart-coach-webinar-plus": { name: "Smart Coach Webinar Plus", price: 90000, billing: "Yearly", slug: "zoom-smart-coach-webinar-plus" },
};

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planSlug = searchParams.get("plan");
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gstin: ""
  });

  const [error, setError] = useState("");

  const selectedPlan = planSlug ? PLANS[planSlug] : null;

  useEffect(() => {
    if (!planSlug || !selectedPlan) {
      router.push("/pricing");
    }
  }, [planSlug, selectedPlan, router]);

  if (!selectedPlan) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#5271ff]" size={40} /></div>;

  const basePrice = selectedPlan.price;
  const gstAmount = basePrice * 0.18;
  const totalAmount = basePrice + gstAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planSlug: selectedPlan.slug,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerGst: formData.gstin || null
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Payment creation failed");
      }

      if (data.payment_session_id) {
        // Initialize Cashfree SDK
        // @ts-ignore
        const { load } = await import("@cashfreepayments/cashfree-js");
        const cashfree = await load({
          mode: data.environment as "sandbox" | "production"
        });

        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_self"
        });
      } else {
        throw new Error("No payment session returned from server");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CheckoutPage",
    "name": "Secure Checkout - Aiclex",
    "description": `Checkout for ${selectedPlan.name} plan at ₹${totalAmount}.`,
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 text-[#001341]">
      <Script
        id="checkout-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <ShieldCheck size={48} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-black mb-4">Secure Checkout</h1>
          <p className="text-gray-500">Complete your payment securely via Cashfree Payments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-fit">
            <h2 className="text-xl font-black mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold">{selectedPlan.name} ({selectedPlan.billing})</span>
                <span className="font-black">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 text-sm">
                <span>GST (18%)</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-6">
              <div className="flex justify-between items-center text-xl">
                <span className="font-black">Total Payable</span>
                <span className="font-black text-[#5271ff]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-4 rounded-xl flex gap-3 text-sm text-gray-500">
              <CheckCircle size={20} className="text-green-500 shrink-0" />
              <p>Instant activation after successful payment. Invoice will be emailed immediately.</p>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-xl font-black mb-6 border-b pb-4">Billing Details</h2>
            
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 font-semibold text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#5271ff] transition-all font-semibold"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#5271ff] transition-all font-semibold"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={15}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#5271ff] transition-all font-semibold"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">GST Number (Optional)</label>
                <input 
                  type="text" 
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  maxLength={15}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#5271ff] transition-all font-semibold uppercase"
                  placeholder="22AAAAA0000A1Z5"
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">For Input Tax Credit</p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 mt-6 bg-[#001341] text-white hover:bg-[#5271ff] font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <span>Proceed to Pay ₹{totalAmount.toLocaleString('en-IN')}</span>}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#5271ff]" size={40} /></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
