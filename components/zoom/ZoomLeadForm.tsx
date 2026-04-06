"use client";

import React, { useState } from "react";
import { CheckCircle, Send, Loader2 } from "lucide-react";

export default function ZoomLeadForm({ initialPlan }: { initialPlan?: string }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as any;
    
    const data = {
      name: target.name.value,
      email: target.email.value,
      phone: target.phone.value,
      type: "Zoom",
      requirement: `Plan: ${target.plan.value}`,
      source: "zoom_reseller",
      source_page: window.location.pathname
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-50">
      <h3 className="text-2xl font-bold text-[#001341] mb-6">Get a Customized Zoom Quote</h3>
      <p className="text-gray-500 text-sm mb-8 italic">Fill the form below and our Zoom Product Specialist will contact you within 30 minutes for Zoom reselling inquiries.</p>
      
      {submitted ? (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Requested!</h3>
          <p className="text-gray-500 mb-8">Our Zoom specialist has received your request and will call you within 30 minutes.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[#5271ff] font-bold hover:underline"
          >
            Request another quote
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="zoom-name" className="sr-only">Full Name</label>
              <input id="zoom-name" name="name" type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#5271ff]" required />
            </div>
            <div className="space-y-1">
              <label htmlFor="zoom-email" className="sr-only">Work Email</label>
              <input id="zoom-email" name="email" type="email" placeholder="Work Email" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#5271ff]" required />
            </div>
            <div className="space-y-1">
              <label htmlFor="zoom-phone" className="sr-only">Phone Number</label>
              <input id="zoom-phone" name="phone" type="tel" placeholder="Phone Number" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#5271ff]" required />
            </div>
            <div className="space-y-1">
              <label htmlFor="zoom-plan" className="sr-only">Select Zoom Plan</label>
              <select id="zoom-plan" name="plan" defaultValue={initialPlan || "Zoom Meetings (10-100 Licensed Users)"} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-gray-400">
                  <option value="Zoom Meetings (10-100 Licensed Users)">Zoom Meetings (10-100 Licensed Users)</option>
                  <option value="Zoom Webinar (500+ Attendees)">Zoom Webinar (500+ Attendees)</option>
                  <option value="Zoom Rooms / Workspace">Zoom Rooms / Workspace</option>
                  <option value="Zoom Phone Implementation">Zoom Phone Implementation</option>
                  <option value="Zoom Basic">Zoom Basic</option>
                  <option value="Zoom Pro">Zoom Pro</option>
                  <option value="Zoom Business">Zoom Business</option>
                  <option value="Zoom Enterprise">Zoom Enterprise</option>
              </select>
            </div>
            <button 
              disabled={loading}
              className="w-full py-4 bg-[#5271ff] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
              Submit Request
            </button>
        </form>
      )}
    </div>
  );
}
