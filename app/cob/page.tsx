"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2, CheckCircle2, ChevronRight, ChevronLeft, Save, Sparkles,
  ShieldCheck, AlertCircle, FileText, ArrowRight, Loader2,
  RefreshCw, Check, Star, Lock, Award, Users, Target, BarChart3, Video,
  Briefcase, Zap, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CobFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 15;
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [savedDraftNotice, setSavedDraftNotice] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Complete Form Payload State
  const [formData, setFormData] = useState<Record<string, any>>({
    // Section 1
    sec1_full_name: "",
    sec1_business_name: "",
    sec1_designation: "",
    sec1_phone: "",
    sec1_whatsapp: "",
    sec1_email: "",
    sec1_city: "",
    sec1_state: "",
    sec1_website: "",
    sec1_start_year: "",
    sec1_business_type: "Online Coaching",
    sec1_coaching_category: "Business",
    sec1_business_description: "",

    // Section 2
    sec2_help_achieve: "",
    sec2_main_program: "",
    sec2_program_name: "",
    sec2_program_duration: "",
    sec2_program_price: "",
    sec2_pricing_model: "One-time",
    sec2_coaching_format: ["1:1 Coaching", "Group Coaching"],
    sec2_delivery_mode: ["Online"],
    sec2_program_inclusions: "",
    sec2_biggest_transformation: "",
    sec2_differentiation: "",
    sec2_problems_solved: "",
    sec2_client_results: "",
    sec2_has_testimonials: "Yes",
    sec2_testimonials_link: "",
    sec2_has_case_studies: "Yes",
    sec2_certifications: "",

    // Section 3
    sec3_ideal_client: "",
    sec3_who_not_buy: "",
    sec3_primary_audience: ["Working Professionals", "Entrepreneurs"],
    sec3_target_age: "25–34",
    sec3_target_gender: "All",
    sec3_target_locations: "",
    sec3_preferred_language: ["English", "Hinglish"],
    sec3_income_range: "₹5 Lakhs - ₹15 Lakhs / year",
    sec3_current_situation: "",
    sec3_biggest_problem: "",
    sec3_trying_to_achieve: "",
    sec3_what_prevents: "",
    sec3_biggest_fears: "",
    sec3_objections: "",
    sec3_repeated_questions: "",
    sec3_why_choose_you: "",
    sec3_ideal_customer_desc: "",

    // Section 4
    sec4_platforms: ["Instagram", "YouTube", "LinkedIn"],
    sec4_instagram_details: "",
    sec4_facebook_details: "",
    sec4_youtube_details: "",
    sec4_linkedin_details: "",
    sec4_x_details: "",
    sec4_threads_details: "",
    sec4_blog_details: "",
    sec4_running_meta_ads: "No",
    sec4_meta_ads_objective: "",

    // Section 5
    sec5_camera_comfort: "Comfortable",
    sec5_reels_comfort: "Yes",
    sec5_live_comfort: "Yes",
    sec5_podcasts_comfort: "Yes",
    sec5_has_photos: "Yes",
    sec5_has_videos: "Yes",
    sec5_has_testimonial_videos: "Yes",
    sec5_personality_traits: ["Professional", "Educational", "Motivational"],
    sec5_content_enjoyed: "",
    sec5_content_avoid: "",
    sec5_forbidden_topics: "",
    sec5_favorite_accounts: "",
    sec5_why_favorite_accounts: "",

    // Section 6
    sec6_primary_goal: "Generate Leads",
    sec6_monthly_lead_target: "",
    sec6_monthly_sales_target: "",
    sec6_current_avg_leads: "",
    sec6_conversion_rate: "",
    sec6_avg_sales_count: "",
    sec6_avg_customer_value: "",
    sec6_biggest_sm_problem: "",
    sec6_six_month_vision: "",

    // Section 7
    sec7_comp1: "",
    sec7_comp2: "",
    sec7_comp3: "",
    sec7_comp4: "",
    sec7_comp5: "",
    sec7_biggest_competitor: "",
    sec7_why_competitor: "",
    sec7_they_do_better: "",
    sec7_you_do_better: "",
    sec7_comp_content_well: "",
    sec7_positioning_to_avoid: "",

    // Section 8
    sec8_remembered_for: "",
    sec8_sentence_completion: "",
    sec8_three_brand_words: "",
    sec8_biggest_achievement: "",
    sec8_what_makes_credible: "",
    sec8_has_methodology: "Yes",
    sec8_methodology_desc: "",
    sec8_different_beliefs: "",
    sec8_disagreed_advice: "",
    sec8_expert_area: "",

    // Section 9
    sec9_lead_sources: ["Instagram", "WhatsApp", "Referrals"],
    sec9_lead_contact_method: "",
    sec9_whatsapp_number: "",
    sec9_booking_link: "",
    sec9_free_consultation: "Yes",
    sec9_consultation_duration: "30 Mins",
    sec9_who_handles_sales: "Myself",
    sec9_avg_calls_per_month: "",
    sec9_closing_rate: "",
    sec9_why_prospects_dont_buy: "",
    sec9_post_lead_flow: "",
    sec9_uses_crm: "No",
    sec9_crm_name: "",

    // Section 10
    sec10_meta_ads_before: "Yes",
    sec10_google_ads_before: "No",
    sec10_current_ad_budget: "",
    sec10_previous_ad_budget: "",
    sec10_previous_campaign_results: "",
    sec10_average_cpl: "",
    sec10_avg_leads_from_ads: "",
    sec10_best_campaign: "",
    sec10_worst_campaign: "",
    sec10_offer_advertised: "",
    sec10_landing_page_used: "",
    sec10_previous_ad_creatives_link: "",
    sec10_meta_bm_available: "Yes",
    sec10_google_ads_available: "No",
    sec10_ga_available: "Yes",
    sec10_meta_pixel_installed: "Yes",
    sec10_conversion_tracking_installed: "Yes",

    // Section 11
    sec11_client_count: "",
    sec11_experience_years: "",
    sec11_biggest_success_story: "",
    sec11_transformation_examples: "",
    sec11_testimonials_link: "",
    sec11_video_testimonials_link: "",
    sec11_screenshots_link: "",
    sec11_media_coverage: "",
    sec11_podcasts_interviews: "",
    sec11_awards: "",
    sec11_certifications: "",
    sec11_publications: "",

    // Section 12
    sec12_drive_folder: "",
    sec12_photos_folder: "",
    sec12_videos_folder: "",
    sec12_logo_link: "",
    sec12_brand_guidelines_link: "",
    sec12_presentations_link: "",
    sec12_other_assets_link: "",

    // Section 13
    sec13_avoid_topics: "",
    sec13_avoid_phrases: "",
    sec13_political_allowed: "No",
    sec13_religious_allowed: "No",
    sec13_controversial_allowed: "No",
    sec13_competitors_mentioned: "No",
    sec13_client_names_mentioned: "Yes",
    sec13_client_screenshots_posted: "Yes",
    sec13_client_results_used: "Yes",
    sec13_legal_restrictions: "",
    sec13_never_post_item: "",

    // Section 14
    sec14_content_approver: "Myself",
    sec14_approval_channel: "WhatsApp",
    sec14_comm_channel: "WhatsApp",
    sec14_advance_notice: "24 Hours",
    sec14_who_provides_videos: "Myself",
    sec14_recording_frequency: "2–3 times/week",
    sec14_recording_day: "Weekends",
    sec14_content_language: "Hinglish",
    sec14_preferred_formats: ["Reels", "Carousels", "Stories"],

    // Section 15
    sec15_biggest_biz_problem: "",
    sec15_sm_problem_to_solve: "",
    sec15_one_thing_to_remember: "",
    sec15_top_3_goals: "",
    sec15_additional_notes: "",
  });

  // Auto-load draft from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aiclex_cob_draft");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.formData) {
            setFormData(parsed.formData);
            if (parsed.currentStep) setCurrentStep(parsed.currentStep);
            setSavedDraftNotice(true);
          }
        } catch (e) {}
      }
    }
  }, []);

  const saveDraftLocally = (updatedData?: any, step?: number) => {
    if (typeof window !== "undefined") {
      const dataToSave = updatedData || formData;
      const stepToSave = step || currentStep;
      localStorage.setItem(
        "aiclex_cob_draft",
        JSON.stringify({ formData: dataToSave, currentStep: stepToSave, time: new Date().toISOString() })
      );
    }
  };

  const handleInputChange = (field: string, val: any) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    saveDraftLocally(updated);
  };

  const handleCheckboxToggle = (field: string, option: string) => {
    const currentList: string[] = Array.isArray(formData[field]) ? formData[field] : [];
    const updatedList = currentList.includes(option)
      ? currentList.filter((item) => item !== option)
      : [...currentList, option];
    handleInputChange(field, updatedList);
  };

  const sectionTitles = [
    { num: 1, name: "Basic Business Info", icon: Building2 },
    { num: 2, name: "Coaching & Offer", icon: Briefcase },
    { num: 3, name: "Target Audience", icon: Users },
    { num: 4, name: "Existing Social Media", icon: Globe },
    { num: 5, name: "Content & Personal Brand", icon: Video },
    { num: 6, name: "Social Media Goals", icon: Target },
    { num: 7, name: "Competitor Research", icon: BarChart3 },
    { num: 8, name: "Brand Positioning", icon: Award },
    { num: 9, name: "Sales Process", icon: Zap },
    { num: 10, name: "Marketing & Meta Ads", icon: Globe },
    { num: 11, name: "Testimonials & Proof", icon: Star },
    { num: 12, name: "Content Assets", icon: FileText },
    { num: 13, name: "Brand Restrictions", icon: Lock },
    { num: 14, name: "Working Process", icon: CheckCircle2 },
    { num: 15, name: "Final Business Vision", icon: Sparkles },
  ];

  const validateCurrentStep = (): boolean => {
    setErrorMsg("");
    if (currentStep === 1) {
      if (!formData.sec1_full_name?.trim()) { setErrorMsg("Please enter your Full Name."); return false; }
      if (!formData.sec1_phone?.trim()) { setErrorMsg("Please enter your Phone Number."); return false; }
      if (!formData.sec1_email?.trim()) { setErrorMsg("Please enter a valid Email Address."); return false; }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        const next = currentStep + 1;
        setCurrentStep(next);
        saveDraftLocally(formData, next);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setShowReviewModal(true);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveDraftLocally(formData, prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmitForm = async () => {
    setErrorMsg("");

    if (!formData.sec1_full_name?.trim() || !formData.sec1_phone?.trim() || !formData.sec1_email?.trim()) {
      setErrorMsg("Please complete Section 1 (Full Name, Phone Number, and Email Address) before submitting.");
      setCurrentStep(1);
      setShowReviewModal(false);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/cob/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please check required fields.");
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("aiclex_cob_draft");
      }

      setSubmittedData({
        submission_id: data.submission_id,
        created_at: data.created_at || new Date().toISOString(),
        full_name: formData.sec1_full_name,
        business_name: formData.sec1_business_name || formData.sec1_full_name,
      });

      setShowReviewModal(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentProgressPct = Math.round((currentStep / totalSteps) * 100);

  // SUCCESS CONFIRMATION SCREEN
  if (submittedData) {
    return (
      <div className="min-h-screen bg-[#fafbfc] text-[#001341] flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl text-center relative z-10"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md border border-emerald-100">
            <CheckCircle2 size={48} />
          </div>

          <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-widest inline-block mb-4">
            Submission Confirmed
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-[#001341] mb-4 leading-tight">
            Thank You, {submittedData.full_name}!
          </h1>

          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed font-medium">
            Your business discovery information has been submitted successfully for{" "}
            <strong className="text-[#5271ff]">{submittedData.business_name}</strong>.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Submission ID:</span>
              <span className="font-mono font-black text-[#5271ff] text-base tracking-wider">
                {submittedData.submission_id}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Date & Time:</span>
              <span className="font-semibold text-[#001341]">
                {new Date(submittedData.created_at).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold">Status:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#5271ff] text-xs font-black uppercase border border-blue-200">
                Under Review
              </span>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-8 text-sm text-gray-700 text-left flex gap-3">
            <Sparkles size={20} className="text-[#5271ff] shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong>Team Aiclex Technologies</strong> will review your information and use it to analyze your business, audience, positioning, competitor landscape, and social media content requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 py-4 px-6 bg-[#001341] hover:bg-[#5271ff] text-white rounded-2xl font-black text-sm uppercase tracking-wider transition shadow-lg shadow-[#001341]/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Back to Home</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-[#001341] rounded-2xl font-black text-sm uppercase tracking-wider transition border border-gray-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Print Submission Copy</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#001341] flex flex-col font-sans relative selection:bg-[#5271ff] selection:text-white">
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Aiclex Technologies" width={130} height={40} className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
            <Sparkles size={14} className="text-[#5271ff] animate-pulse" />
            <span className="text-xs font-bold text-[#001341]">
              Coach Social Media Onboarding & Business Discovery
            </span>
          </div>

          <div className="flex items-center gap-3">
            {savedDraftNotice && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <RefreshCw size={12} className="animate-spin text-amber-600" /> Draft Restored
              </span>
            )}
            <Link
              href="/signin"
              className="text-xs font-bold text-[#001341] hover:text-[#5271ff] px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider mb-2">
            <span className="text-[#5271ff] flex items-center gap-1.5">
              <span>Section {currentStep} of {totalSteps}</span>
              <span className="text-gray-300">•</span>
              <span className="text-[#001341] font-bold">{sectionTitles[currentStep - 1].name}</span>
            </span>
            <span className="text-[#5271ff] font-black">{currentProgressPct}% Complete</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200/60">
            <motion.div
              className="bg-gradient-to-r from-[#001341] via-[#5271ff] to-[#ff914d] h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* STEP NAVIGATION PILLS (DESKTOP) */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 overflow-x-auto scrollbar-hide shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max">
          {sectionTitles.map((sec) => {
            const Icon = sec.icon;
            const isDone = sec.num < currentStep;
            const isCurrent = sec.num === currentStep;

            return (
              <button
                key={sec.num}
                onClick={() => {
                  if (sec.num <= currentStep || validateCurrentStep()) {
                    setCurrentStep(sec.num);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isCurrent
                    ? "bg-[#001341] text-white shadow-md"
                    : isDone
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isDone ? <Check size={12} /> : <Icon size={12} />}
                <span>{sec.num}. {sec.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN FORM CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 relative z-10">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-3 shadow-md">
            <AlertCircle size={20} className="shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-xl text-[#001341]"
        >
          {/* STEP HEADER CARD */}
          <div className="border-b border-gray-100 pb-6 mb-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#5271ff] flex items-center justify-center shrink-0 shadow-xs">
              {React.createElement(sectionTitles[currentStep - 1].icon, { size: 24 })}
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#5271ff]">
                SECTION {currentStep} OF {totalSteps}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#001341] mt-1">
                {sectionTitles[currentStep - 1].name}
              </h2>
              <p className="text-gray-500 text-sm mt-1 font-medium">
                Please provide accurate details so Team Aiclex Technologies can build your social media strategy.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1 — BASIC BUSINESS INFORMATION */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sec1_full_name}
                    onChange={(e) => handleInputChange("sec1_full_name", e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Business / Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sec1_business_name}
                    onChange={(e) => handleInputChange("sec1_business_name", e.target.value)}
                    placeholder="e.g. Leadership Mastermind Hub"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={formData.sec1_designation}
                    onChange={(e) => handleInputChange("sec1_designation", e.target.value)}
                    placeholder="e.g. Founder & Lead Coach"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.sec1_phone}
                    onChange={(e) => handleInputChange("sec1_phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.sec1_whatsapp}
                    onChange={(e) => handleInputChange("sec1_whatsapp", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.sec1_email}
                    onChange={(e) => handleInputChange("sec1_email", e.target.value)}
                    placeholder="coach@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.sec1_city}
                    onChange={(e) => handleInputChange("sec1_city", e.target.value)}
                    placeholder="e.g. Mumbai / Delhi / Bengaluru"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.sec1_state}
                    onChange={(e) => handleInputChange("sec1_state", e.target.value)}
                    placeholder="e.g. Maharashtra"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.sec1_website}
                    onChange={(e) => handleInputChange("sec1_website", e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Business Start Year
                  </label>
                  <input
                    type="number"
                    value={formData.sec1_start_year}
                    onChange={(e) => handleInputChange("sec1_start_year", e.target.value)}
                    placeholder="e.g. 2020"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Business Type
                  </label>
                  <select
                    value={formData.sec1_business_type}
                    onChange={(e) => handleInputChange("sec1_business_type", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  >
                    {["Personal Brand", "Coaching Institute", "Online Coaching", "Offline Coaching", "Hybrid", "Other"].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Coaching Category
                  </label>
                  <select
                    value={formData.sec1_coaching_category}
                    onChange={(e) => handleInputChange("sec1_coaching_category", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                  >
                    {["Career", "Business", "Fitness", "Life", "Relationship", "Finance", "Education", "Sales", "Marketing", "Leadership", "Other"].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                  Briefly Describe Your Coaching Business
                </label>
                <textarea
                  rows={4}
                  value={formData.sec1_business_description}
                  onChange={(e) => handleInputChange("sec1_business_description", e.target.value)}
                  placeholder="Share a overview of your coaching practice, niche, and history..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2 — COACHING & OFFER DETAILS */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                  What exactly do you help people achieve? <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.sec2_help_achieve}
                  onChange={(e) => handleInputChange("sec2_help_achieve", e.target.value)}
                  placeholder="e.g. I help corporate managers transition into 6-figure independent business consultants in 90 days."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] focus:bg-white transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Main Coaching Program
                  </label>
                  <input
                    type="text"
                    value={formData.sec2_main_program}
                    onChange={(e) => handleInputChange("sec2_main_program", e.target.value)}
                    placeholder="e.g. 1:1 Executive Accelerator"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Program Name
                  </label>
                  <input
                    type="text"
                    value={formData.sec2_program_name}
                    onChange={(e) => handleInputChange("sec2_program_name", e.target.value)}
                    placeholder="e.g. Freedom Business Mastery"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold outline-none focus:border-[#5271ff] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Program Duration
                  </label>
                  <input
                    type="text"
                    value={formData.sec2_program_duration}
                    onChange={(e) => handleInputChange("sec2_program_duration", e.target.value)}
                    placeholder="e.g. 3 Months / 12 Weeks"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Program Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.sec2_program_price}
                    onChange={(e) => handleInputChange("sec2_program_price", e.target.value)}
                    placeholder="e.g. 49999"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] placeholder-gray-400 font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Pricing Model
                  </label>
                  <select
                    value={formData.sec2_pricing_model}
                    onChange={(e) => handleInputChange("sec2_pricing_model", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#001341] font-semibold text-sm"
                  >
                    {["One-time", "Monthly", "Subscription", "Other"].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                  Coaching Format (Select All That Apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["1:1 Coaching", "Group Coaching", "Workshop", "Course", "Masterclass", "Other"].map((item) => {
                    const selected = Array.isArray(formData.sec2_coaching_format) && formData.sec2_coaching_format.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleCheckboxToggle("sec2_coaching_format", item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                          selected
                            ? "bg-blue-50 border-[#5271ff] text-[#5271ff]"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span>{item}</span>
                        {selected && <Check size={14} className="text-[#5271ff]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 3 — TARGET AUDIENCE */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                  Who is your ideal client? <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.sec3_ideal_client}
                  onChange={(e) => handleInputChange("sec3_ideal_client", e.target.value)}
                  placeholder="Describe your target buyer in detail..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-[#001341] placeholder-gray-400 font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                  Primary Audience Categories (Select All That Apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Students", "Working Professionals", "Entrepreneurs", "Business Owners",
                    "Coaches", "Creators", "Job Seekers", "Homemakers", "Other"
                  ].map((item) => {
                    const selected = Array.isArray(formData.sec3_primary_audience) && formData.sec3_primary_audience.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleCheckboxToggle("sec3_primary_audience", item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                          selected
                            ? "bg-blue-50 border-[#5271ff] text-[#5271ff]"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="truncate">{item}</span>
                        {selected && <Check size={14} className="text-[#5271ff] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                  Describe your ideal customer in your own words <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.sec3_ideal_customer_desc}
                  onChange={(e) => handleInputChange("sec3_ideal_customer_desc", e.target.value)}
                  placeholder="Share a vivid summary of your dream client..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-[#001341] placeholder-gray-400 font-semibold text-sm"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 4 - 15 GENERIC CARDS FORM LIGHT STYLING */}
          {/* ========================================================================= */}
          {currentStep > 3 && (
            <div className="space-y-6">
              {currentStep === 4 && (
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    Which platforms do you currently use?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {["Instagram", "Facebook", "YouTube", "LinkedIn", "X", "Threads", "Website/Blog", "Other"].map((item) => {
                      const selected = Array.isArray(formData.sec4_platforms) && formData.sec4_platforms.includes(item);
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => handleCheckboxToggle("sec4_platforms", item)}
                          className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            selected ? "bg-blue-50 border-[#5271ff] text-[#5271ff]" : "bg-gray-50 border-gray-200 text-gray-700"
                          }`}
                        >
                          <span>{item}</span>
                          {selected && <Check size={14} className="text-[#5271ff]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#001341] mb-2">
                    If social media works perfectly over next 6 months, what should it achieve? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.sec6_six_month_vision}
                    onChange={(e) => handleInputChange("sec6_six_month_vision", e.target.value)}
                    placeholder="Describe your 6-month breakthrough milestone..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-[#001341] placeholder-gray-400 font-semibold text-sm"
                  />
                </div>
              )}

              {currentStep === 10 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex gap-3 text-amber-900 text-xs font-semibold">
                  <ShieldCheck size={20} className="shrink-0 text-amber-600" />
                  <div>
                    <strong>Aiclex Technologies Security Notice:</strong> Never share passwords for Meta, Google, Instagram, or personal accounts.
                  </div>
                </div>
              )}

              {/* Dynamic light input rendering */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <h4 className="font-black text-sm text-[#001341]">
                  Section {currentStep} Additional Details & Inputs
                </h4>
                <textarea
                  rows={4}
                  value={formData[`sec${currentStep}_additional`] || ""}
                  onChange={(e) => handleInputChange(`sec${currentStep}_additional`, e.target.value)}
                  placeholder="Share details, preferences, links, or notes for this section..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 text-[#001341] placeholder-gray-400 font-semibold text-sm"
                />
              </div>
            </div>
          )}

          {/* STEP NAVIGATION BUTTONS */}
          <div className="border-t border-gray-100 pt-6 mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                currentStep === 1
                  ? "opacity-30 cursor-not-allowed text-gray-400 bg-gray-100"
                  : "bg-gray-100 hover:bg-gray-200 text-[#001341] cursor-pointer"
              }`}
            >
              <ChevronLeft size={16} />
              <span>Previous Step</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => saveDraftLocally()}
                className="hidden sm:inline-flex py-3.5 px-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 font-bold text-xs transition items-center gap-2 cursor-pointer"
              >
                <Save size={14} />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="py-3.5 px-8 bg-[#001341] hover:bg-[#5271ff] text-white rounded-2xl font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#001341]/10 flex items-center gap-2 cursor-pointer"
              >
                <span>{currentStep === totalSteps ? "Review & Submit" : "Next Step"}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* FINAL REVIEW & SUBMIT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#001341]/40 backdrop-blur-sm" onClick={() => setShowReviewModal(false)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-xl w-full bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-[#001341]"
            >
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-black uppercase text-[#5271ff] tracking-wider">Final Verification</span>
                  <h3 className="text-xl font-black text-[#001341] mt-1">Review & Submit Business Discovery</h3>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2 text-xs text-gray-700 font-semibold">
                <p><strong>Name:</strong> {formData.sec1_full_name}</p>
                <p><strong>Brand:</strong> {formData.sec1_business_name}</p>
                <p><strong>Phone:</strong> {formData.sec1_phone}</p>
                <p><strong>Email:</strong> {formData.sec1_email}</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gray-100 text-gray-700 font-bold text-xs uppercase"
                >
                  Back to Form
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmitForm}
                  className="flex-1 py-3 px-5 rounded-2xl bg-[#001341] hover:bg-[#5271ff] text-white font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <span>Confirm & Submit</span>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
