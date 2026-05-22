"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Phone, FileText, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface LeadFormProps {
  defaultService?: string;
  defaultCity?: string;
  defaultRequirement?: string;
  onSuccess?: () => void;
  isEmbedded?: boolean;
}

export default function LeadForm({
  defaultService = "",
  defaultCity = "",
  defaultRequirement = "",
  onSuccess,
  isEmbedded = true
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    requirement: defaultRequirement,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Tracking details
  const [tracking, setTracking] = useState({
    city: defaultCity,
    service: defaultService,
    source_page: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: ""
  });

  useEffect(() => {
    // 1. Capture Page Info
    const currentPath = window.location.pathname;
    const currentHref = window.location.href;

    // 2. Parse slug for city and service if not passed as props
    let detectedCity = defaultCity;
    let detectedService = defaultService;

    if (!detectedCity || !detectedService) {
      const slugParts = currentPath.split("/").pop(); // Get last path segment
      if (slugParts && slugParts.includes("-in-")) {
        const parts = slugParts.split("-in-");
        // Convert dash service-slug into Title Case for user-friendly logging
        detectedService = parts[0].replace(/-/g, " ");
        detectedCity = parts[1].replace(/-/g, " ");
      } else if (slugParts) {
        detectedService = slugParts.replace(/-/g, " ");
      }
    }

    // 3. Extract and Cache UTM Parameters
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");

    // Enterprise attribution: Save original UTMs in sessionStorage so they are preserved
    // even if the user navigates to other sub-pages before converting
    if (utmSource) sessionStorage.setItem("utm_source", utmSource);
    if (utmMedium) sessionStorage.setItem("utm_medium", utmMedium);
    if (utmCampaign) sessionStorage.setItem("utm_campaign", utmCampaign);

    const savedUtmSource = sessionStorage.getItem("utm_source") || "";
    const savedUtmMedium = sessionStorage.getItem("utm_medium") || "";
    const savedUtmCampaign = sessionStorage.getItem("utm_campaign") || "";

    setTracking({
      city: detectedCity || "global",
      service: detectedService || "general inquiry",
      source_page: currentHref,
      utm_source: savedUtmSource,
      utm_medium: savedUtmMedium,
      utm_campaign: savedUtmCampaign
    });
  }, [defaultCity, defaultService]);

  useEffect(() => {
    if (defaultRequirement) {
      setFormData(prev => ({
        ...prev,
        requirement: defaultRequirement
      }));
    }
  }, [defaultRequirement]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.requirement) {
      setError("Please fill out all required fields: Name, Phone, and Requirement.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        requirement: formData.requirement,
        source: tracking.service || "Website Form",
        city: tracking.city,
        service: tracking.service,
        source_page: tracking.source_page,
        utm_source: tracking.utm_source || null,
        utm_medium: tracking.utm_medium || null,
        utm_campaign: tracking.utm_campaign || null
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", whatsapp: "", requirement: "" });
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Form Submission Error:", err);
      setError("A connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-8 rounded-3xl text-center shadow-lg animate-fade-in">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-white animate-bounce">
          <CheckCircle2 size={36} />
        </div>
        <h4 className="text-2xl font-black text-[#001341] mb-3">Request Received!</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
          Thank you, <span className="font-bold text-[#001341]">{formData.name || "there"}</span>. 
          Our success consultant has received your inquiry for <span className="font-bold text-[#5271ff]">{tracking.service}</span>
          {tracking.city && tracking.city !== "global" && (
            <span> in <span className="font-bold text-[#ff914d] capitalize">{tracking.city}</span></span>
          )}. 
          We will contact you within the next 2 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition shadow cursor-pointer"
        >
          Submit Another Query
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${isEmbedded ? "bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl" : "p-6"}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-black text-[#001341] leading-tight">
          Get a Fast Proposal
        </h3>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
          <span>Attribution: {tracking.service}</span>
          {tracking.city && tracking.city !== "global" && (
            <span className="text-[#ff914d] capitalize">• {tracking.city}</span>
          )}
        </p>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-[10px] font-black text-[#001341] uppercase tracking-widest mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User size={16} />
            </div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Umesh Kumar"
              className="block w-full pl-10 pr-4 py-3 text-sm text-[#001341] font-semibold bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#5271ff] transition-all outline-none"
            />
          </div>
        </div>

        {/* WhatsApp/Phone */}
        <div>
          <label className="block text-[10px] font-black text-[#001341] uppercase tracking-widest mb-1.5">
            Phone / WhatsApp *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Phone size={16} />
            </div>
            <input
              type="tel"
              name="whatsapp"
              required
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="e.g. +91 9876543210"
              className="block w-full pl-10 pr-4 py-3 text-sm text-[#001341] font-semibold bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#5271ff] transition-all outline-none"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[10px] font-black text-[#001341] uppercase tracking-widest mb-1.5">
            Email Address (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail size={16} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. info@aiclex.co.in"
              className="block w-full pl-10 pr-4 py-3 text-sm text-[#001341] font-semibold bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#5271ff] transition-all outline-none"
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-[10px] font-black text-[#001341] uppercase tracking-widest mb-1.5">
            Business Requirements *
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 text-gray-400">
              <FileText size={16} />
            </div>
            <textarea
              name="requirement"
              required
              rows={4}
              value={formData.requirement}
              onChange={handleChange}
              placeholder="Explain your goals (e.g. School ERP with automatic fee collection and parent WhatsApp alerts...)"
              className="block w-full pl-10 pr-4 py-3 text-sm text-[#001341] font-semibold bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#5271ff] transition-all outline-none resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#ff914d] to-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Processing Proposal...
            </>
          ) : (
            <>
              Request Free Consult
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-400 text-center font-semibold mt-4">
          🛡️ Zero spam guarantee. Your details are safe with us.
        </p>
      </form>
    </div>
  );
}
