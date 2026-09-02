"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2, CheckCircle2, ChevronRight, ChevronLeft, Save, Sparkles,
  ShieldCheck, HelpCircle, AlertCircle, FileText, ArrowRight, Loader2,
  RefreshCw, Check, Star, Lock, Award, Users, Target, BarChart3, Video,
  MessageSquare, Share2, Briefcase, Zap, Eye, Globe
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

  // Auto-save draft on form changes
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

  // Section titles list
  const sectionTitles = [
    { num: 1, name: "Basic Business Info", icon: Building2 },
    { num: 2, name: "Coaching & Offer", icon: Briefcase },
    { num: 3, name: "Target Audience", icon: Users },
    { num: 4, name: "Existing Social Media", icon: Share2 },
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

  // Validation per step
  const validateCurrentStep = (): boolean => {
    setErrorMsg("");
    if (currentStep === 1) {
      if (!formData.sec1_full_name.trim()) { setErrorMsg("Please enter your Full Name."); return false; }
      if (!formData.sec1_business_name.trim()) { setErrorMsg("Please enter your Business / Brand Name."); return false; }
      if (!formData.sec1_phone.trim()) { setErrorMsg("Please enter your Phone Number."); return false; }
      if (!formData.sec1_email.trim()) { setErrorMsg("Please enter a valid Email Address."); return false; }
    }
    if (currentStep === 2) {
      if (!formData.sec2_help_achieve.trim()) { setErrorMsg("Please describe what you help people achieve."); return false; }
    }
    if (currentStep === 3) {
      if (!formData.sec3_ideal_client.trim()) { setErrorMsg("Please describe your ideal client."); return false; }
      if (!formData.sec3_ideal_customer_desc.trim()) { setErrorMsg("Please describe your ideal customer in your own words."); return false; }
    }
    if (currentStep === 6) {
      if (!formData.sec6_six_month_vision.trim()) { setErrorMsg("Please share your 6-month social media vision."); return false; }
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

  // Final Form Submission
  const handleSubmitForm = async () => {
    setSubmitting(true);
    setErrorMsg("");

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

      // Clear local draft
      if (typeof window !== "undefined") {
        localStorage.removeItem("aiclex_cob_draft");
      }

      setSubmittedData({
        submission_id: data.submission_id,
        created_at: data.created_at || new Date().toISOString(),
        full_name: formData.sec1_full_name,
        business_name: formData.sec1_business_name,
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
      <div className="min-h-screen bg-[#070b16] text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glowing Accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-[#0e1528] border border-[#202e52] rounded-3xl p-8 md:p-12 shadow-2xl text-center relative z-10"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 size={48} />
          </div>

          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest inline-block mb-4">
            Submission Confirmed
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Thank You, {submittedData.full_name}!
          </h1>

          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-medium">
            Your business discovery information has been submitted successfully for{" "}
            <strong className="text-blue-400">{submittedData.business_name}</strong>.
          </p>

          <div className="bg-[#131d36] border border-[#23335b] rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-[#23335b] pb-3">
              <span className="text-gray-400 font-medium">Submission ID:</span>
              <span className="font-mono font-black text-amber-400 text-base tracking-wider">
                {submittedData.submission_id}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-[#23335b] pb-3">
              <span className="text-gray-400 font-medium">Date & Time:</span>
              <span className="font-semibold text-gray-200">
                {new Date(submittedData.created_at).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">Status:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase border border-blue-500/30">
                Under Review
              </span>
            </div>
          </div>

          <div className="bg-[#090e1c] border border-[#1b2848] rounded-2xl p-5 mb-8 text-sm text-gray-300 text-left flex gap-3">
            <Sparkles size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Team Aiclex Technologies</strong> will review your information and use it to analyze your business, audience, positioning, competitor landscape, and social media content requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-wider transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 py-4 px-6 bg-[#16213c] hover:bg-[#1e2d52] text-gray-200 rounded-2xl font-black text-sm uppercase tracking-wider transition border border-[#2b3d68] flex items-center justify-center gap-2"
            >
              <span>Print Submission Copy</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b16] text-white flex flex-col font-sans relative selection:bg-blue-600 selection:text-white">
      {/* BACKGROUND ACCENTS */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#090d1b]/90 backdrop-blur-md border-b border-[#1a2645] px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Aiclex Technologies" width={130} height={40} className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-2 bg-[#121b33] border border-[#202f54] px-4 py-2 rounded-full">
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-gray-200">
              Coach Social Media Onboarding & Business Discovery
            </span>
          </div>

          <div className="flex items-center gap-3">
            {savedDraftNotice && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                <RefreshCw size={12} className="animate-spin" /> Draft Restored
              </span>
            )}
            <Link
              href="/signin"
              className="text-xs font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg bg-[#141e38] border border-[#213057] transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider mb-2">
            <span className="text-blue-400 flex items-center gap-1.5">
              <span>Section {currentStep} of {totalSteps}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300 font-bold">{sectionTitles[currentStep - 1].name}</span>
            </span>
            <span className="text-amber-400 font-bold">{currentProgressPct}% Complete</span>
          </div>
          <div className="w-full bg-[#121c36] h-2 rounded-full overflow-hidden border border-[#202f54]/50">
            <motion.div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* STEP NAVIGATION PILLS (DESKTOP) */}
      <div className="bg-[#090e1e] border-b border-[#172342] px-4 py-2.5 overflow-x-auto scrollbar-hide">
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
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : isDone
                    ? "bg-[#141f3b] text-emerald-400 hover:bg-[#1a294f]"
                    : "bg-[#0d1429] text-gray-500 hover:text-gray-300"
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
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-semibold flex items-center gap-3 shadow-lg">
            <AlertCircle size={20} className="shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-[#0c1326] border border-[#1d2b4f] rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          {/* STEP HEADER CARD */}
          <div className="border-b border-[#1b284a] pb-6 mb-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              {React.createElement(sectionTitles[currentStep - 1].icon, { size: 24 })}
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                SECTION {currentStep} OF {totalSteps}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
                {sectionTitles[currentStep - 1].name}
              </h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">
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
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sec1_full_name}
                    onChange={(e) => handleInputChange("sec1_full_name", e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Business / Brand Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sec1_business_name}
                    onChange={(e) => handleInputChange("sec1_business_name", e.target.value)}
                    placeholder="e.g. Leadership Mastermind Hub"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={formData.sec1_designation}
                    onChange={(e) => handleInputChange("sec1_designation", e.target.value)}
                    placeholder="e.g. Founder & Lead Coach"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.sec1_phone}
                    onChange={(e) => handleInputChange("sec1_phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.sec1_whatsapp}
                    onChange={(e) => handleInputChange("sec1_whatsapp", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.sec1_email}
                    onChange={(e) => handleInputChange("sec1_email", e.target.value)}
                    placeholder="coach@example.com"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.sec1_city}
                    onChange={(e) => handleInputChange("sec1_city", e.target.value)}
                    placeholder="e.g. Mumbai / Delhi / Bengaluru"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.sec1_state}
                    onChange={(e) => handleInputChange("sec1_state", e.target.value)}
                    placeholder="e.g. Maharashtra"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.sec1_website}
                    onChange={(e) => handleInputChange("sec1_website", e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Business Start Year
                  </label>
                  <input
                    type="number"
                    value={formData.sec1_start_year}
                    onChange={(e) => handleInputChange("sec1_start_year", e.target.value)}
                    placeholder="e.g. 2020"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Business Type
                  </label>
                  <select
                    value={formData.sec1_business_type}
                    onChange={(e) => handleInputChange("sec1_business_type", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  >
                    {["Personal Brand", "Coaching Institute", "Online Coaching", "Offline Coaching", "Hybrid", "Other"].map((opt) => (
                      <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Coaching Category
                  </label>
                  <select
                    value={formData.sec1_coaching_category}
                    onChange={(e) => handleInputChange("sec1_coaching_category", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  >
                    {["Career", "Business", "Fitness", "Life", "Relationship", "Finance", "Education", "Sales", "Marketing", "Leadership", "Other"].map((opt) => (
                      <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Briefly Describe Your Coaching Business
                </label>
                <textarea
                  rows={4}
                  value={formData.sec1_business_description}
                  onChange={(e) => handleInputChange("sec1_business_description", e.target.value)}
                  placeholder="Share a overview of your coaching practice, niche, and history..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
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
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  What exactly do you help people achieve? <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.sec2_help_achieve}
                  onChange={(e) => handleInputChange("sec2_help_achieve", e.target.value)}
                  placeholder="e.g. I help corporate managers transition into 6-figure independent business consultants in 90 days."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Main Coaching Program
                  </label>
                  <input
                    type="text"
                    value={formData.sec2_main_program}
                    onChange={(e) => handleInputChange("sec2_main_program", e.target.value)}
                    placeholder="e.g. 1:1 Executive Accelerator"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Program Name
                  </label>
                  <input
                    type="text"
                    value={formData.sec2_program_name}
                    onChange={(e) => handleInputChange("sec2_program_name", e.target.value)}
                    placeholder="e.g. Freedom Business Mastery"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Program Duration
                  </label>
                  <input
                    type="text"
                    value={formData.sec2_program_duration}
                    onChange={(e) => handleInputChange("sec2_program_duration", e.target.value)}
                    placeholder="e.g. 3 Months / 12 Weeks"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Program Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.sec2_program_price}
                    onChange={(e) => handleInputChange("sec2_program_price", e.target.value)}
                    placeholder="e.g. 49999"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Pricing Model
                  </label>
                  <select
                    value={formData.sec2_pricing_model}
                    onChange={(e) => handleInputChange("sec2_pricing_model", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  >
                    {["One-time", "Monthly", "Subscription", "Other"].map((opt) => (
                      <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
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
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          selected
                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                            : "bg-[#121b33] border-[#22325c] text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>{item}</span>
                        {selected && <Check size={14} className="text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Delivery Mode (Select All That Apply)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Online", "Offline", "Hybrid"].map((item) => {
                    const selected = Array.isArray(formData.sec2_delivery_mode) && formData.sec2_delivery_mode.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleCheckboxToggle("sec2_delivery_mode", item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          selected
                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                            : "bg-[#121b33] border-[#22325c] text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>{item}</span>
                        {selected && <Check size={14} className="text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What is included in your program?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec2_program_inclusions}
                    onChange={(e) => handleInputChange("sec2_program_inclusions", e.target.value)}
                    placeholder="e.g. Weekly live calls, WhatsApp support, template vault, 1:1 audit"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Biggest transformation/result clients get
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec2_biggest_transformation}
                    onChange={(e) => handleInputChange("sec2_biggest_transformation", e.target.value)}
                    placeholder="e.g. 3x revenue growth within 60 days without burnout"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What makes your coaching different from competitors?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec2_differentiation}
                    onChange={(e) => handleInputChange("sec2_differentiation", e.target.value)}
                    placeholder="What is your unique edge?"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What are the 3 biggest problems you solve?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec2_problems_solved}
                    onChange={(e) => handleInputChange("sec2_problems_solved", e.target.value)}
                    placeholder="1. Low lead quality 2. Unclear offer 3. Sales call anxiety"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Do you have client testimonials?
                  </label>
                  <select
                    value={formData.sec2_has_testimonials}
                    onChange={(e) => handleInputChange("sec2_has_testimonials", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Testimonial Link / Folder URL
                  </label>
                  <input
                    type="url"
                    value={formData.sec2_testimonials_link}
                    onChange={(e) => handleInputChange("sec2_testimonials_link", e.target.value)}
                    placeholder="Google Drive link or website URL"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
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
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Who is your ideal client? <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.sec3_ideal_client}
                  onChange={(e) => handleInputChange("sec3_ideal_client", e.target.value)}
                  placeholder="Describe your target buyer in detail..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Who should NOT buy your coaching?
                </label>
                <textarea
                  rows={2}
                  value={formData.sec3_who_not_buy}
                  onChange={(e) => handleInputChange("sec3_who_not_buy", e.target.value)}
                  placeholder="e.g. People looking for get-rich-quick schemes or unwilling to execute"
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
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
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          selected
                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                            : "bg-[#121b33] border-[#22325c] text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{item}</span>
                        {selected && <Check size={14} className="text-blue-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Target Age Group
                  </label>
                  <select
                    value={formData.sec3_target_age}
                    onChange={(e) => handleInputChange("sec3_target_age", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  >
                    {["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"].map((opt) => (
                      <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Target Gender
                  </label>
                  <select
                    value={formData.sec3_target_gender}
                    onChange={(e) => handleInputChange("sec3_target_gender", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  >
                    {["Male", "Female", "All", "Other"].map((opt) => (
                      <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Target Income Range
                  </label>
                  <input
                    type="text"
                    value={formData.sec3_income_range}
                    onChange={(e) => handleInputChange("sec3_income_range", e.target.value)}
                    placeholder="e.g. ₹5 Lakhs - ₹15 Lakhs"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Target Cities / Countries
                </label>
                <input
                  type="text"
                  value={formData.sec3_target_locations}
                  onChange={(e) => handleInputChange("sec3_target_locations", e.target.value)}
                  placeholder="e.g. Tier 1 Cities India, USA NRI, UAE, Worldwide"
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What is their biggest problem & current pain point?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec3_biggest_problem}
                    onChange={(e) => handleInputChange("sec3_biggest_problem", e.target.value)}
                    placeholder="What keeps them awake at night?"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What objections do they usually have before buying?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec3_objections}
                    onChange={(e) => handleInputChange("sec3_objections", e.target.value)}
                    placeholder="e.g. Price too high, no time, tried previous programs"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Describe your ideal customer in your own words <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.sec3_ideal_customer_desc}
                  onChange={(e) => handleInputChange("sec3_ideal_customer_desc", e.target.value)}
                  placeholder="Share a vivid summary of your dream client..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 4 — EXISTING SOCIAL MEDIA */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
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
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          selected
                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                            : "bg-[#121b33] border-[#22325c] text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>{item}</span>
                        {selected && <Check size={14} className="text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 border-t border-[#1a2747] pt-6">
                <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
                  Platform Details & Best Performing Content
                </h4>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Instagram Handle / URL / Followers / Posting Frequency
                  </label>
                  <input
                    type="text"
                    value={formData.sec4_instagram_details}
                    onChange={(e) => handleInputChange("sec4_instagram_details", e.target.value)}
                    placeholder="@yourhandle | 15k followers | 3 reels/week"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    YouTube Channel / Subscribers / Frequency
                  </label>
                  <input
                    type="text"
                    value={formData.sec4_youtube_details}
                    onChange={(e) => handleInputChange("sec4_youtube_details", e.target.value)}
                    placeholder="channel link | 5k subs | 1 video/week"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    LinkedIn Profile / Followers / Frequency
                  </label>
                  <input
                    type="text"
                    value={formData.sec4_linkedin_details}
                    onChange={(e) => handleInputChange("sec4_linkedin_details", e.target.value)}
                    placeholder="linkedin.com/in/yourname | 8k followers"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#1a2747] pt-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Are you currently running Instagram / Meta Ads?
                  </label>
                  <select
                    value={formData.sec4_running_meta_ads}
                    onChange={(e) => handleInputChange("sec4_running_meta_ads", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    If yes, what is the objective?
                  </label>
                  <input
                    type="text"
                    value={formData.sec4_meta_ads_objective}
                    onChange={(e) => handleInputChange("sec4_meta_ads_objective", e.target.value)}
                    placeholder="e.g. WhatsApp Leads / Webinar Registrations"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 5 — CONTENT & PERSONAL BRAND */}
          {/* ========================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Camera Comfort Level
                  </label>
                  <select
                    value={formData.sec5_camera_comfort}
                    onChange={(e) => handleInputChange("sec5_camera_comfort", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="Very Comfortable">Very Comfortable</option>
                    <option value="Comfortable">Comfortable</option>
                    <option value="Somewhat Uncomfortable">Somewhat Uncomfortable</option>
                    <option value="I Don't Want to Appear">I Don't Want to Appear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Comfortable recording Reels / Short Videos?
                  </label>
                  <select
                    value={formData.sec5_reels_comfort}
                    onChange={(e) => handleInputChange("sec5_reels_comfort", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Personality Descriptors (Select All That Apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Professional", "Friendly", "Bold", "Serious", "Funny",
                    "Motivational", "Educational", "Premium/Luxury", "Other"
                  ].map((item) => {
                    const selected = Array.isArray(formData.sec5_personality_traits) && formData.sec5_personality_traits.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleCheckboxToggle("sec5_personality_traits", item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          selected
                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                            : "bg-[#121b33] border-[#22325c] text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>{item}</span>
                        {selected && <Check size={14} className="text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Topics you don't want us to discuss
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec5_forbidden_topics}
                    onChange={(e) => handleInputChange("sec5_forbidden_topics", e.target.value)}
                    placeholder="Any sensitive topics to avoid"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Share 3–5 social accounts whose content you admire
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec5_favorite_accounts}
                    onChange={(e) => handleInputChange("sec5_favorite_accounts", e.target.value)}
                    placeholder="Handles or links..."
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 6 — SOCIAL MEDIA GOALS */}
          {/* ========================================================================= */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Primary Goal from Social Media
                  </label>
                  <select
                    value={formData.sec6_primary_goal}
                    onChange={(e) => handleInputChange("sec6_primary_goal", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    {[
                      "Generate Leads", "Book Discovery Calls", "Sell Coaching Programs",
                      "Build Personal Brand", "Increase Followers", "Build Authority",
                      "Speaking Opportunities", "Grow YouTube", "Build Community", "Other"
                    ].map((opt) => (
                      <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Monthly Lead Target (Number of Leads)
                  </label>
                  <input
                    type="number"
                    value={formData.sec6_monthly_lead_target}
                    onChange={(e) => handleInputChange("sec6_monthly_lead_target", e.target.value)}
                    placeholder="e.g. 200"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Monthly Sales Target (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.sec6_monthly_sales_target}
                    onChange={(e) => handleInputChange("sec6_monthly_sales_target", e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Current Avg Monthly Leads
                  </label>
                  <input
                    type="number"
                    value={formData.sec6_current_avg_leads}
                    onChange={(e) => handleInputChange("sec6_current_avg_leads", e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Average Customer Value (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.sec6_avg_customer_value}
                    onChange={(e) => handleInputChange("sec6_avg_customer_value", e.target.value)}
                    placeholder="e.g. 40000"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  If social media works perfectly over next 6 months, what should it achieve? <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.sec6_six_month_vision}
                  onChange={(e) => handleInputChange("sec6_six_month_vision", e.target.value)}
                  placeholder="Describe your 6-month breakthrough milestone..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 7 — COMPETITOR RESEARCH */}
          {/* ========================================================================= */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400 font-medium mb-4">
                List up to 3 key competitors so our research team can analyze their positioning.
              </p>

              {[1, 2, 3].map((num) => (
                <div key={num} className="bg-[#10182e] border border-[#1f2d52] rounded-2xl p-4 space-y-4">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Competitor {num}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formData[`sec7_comp${num}`]}
                      onChange={(e) => handleInputChange(`sec7_comp${num}`, e.target.value)}
                      placeholder={`Competitor ${num} Name / Brand`}
                      className="bg-[#141f3b] border border-[#22325c] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-xs font-semibold"
                    />
                    <input
                      type="text"
                      value={formData[`sec7_comp${num}_details`]}
                      onChange={(e) => handleInputChange(`sec7_comp${num}_details`, e.target.value)}
                      placeholder="Instagram / Website URL & Approx Price"
                      className="bg-[#141f3b] border border-[#22325c] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-xs font-semibold"
                    />
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What do they do better than you?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec7_they_do_better}
                    onChange={(e) => handleInputChange("sec7_they_do_better", e.target.value)}
                    placeholder="Their strengths..."
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What do you do better than them?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sec7_you_do_better}
                    onChange={(e) => handleInputChange("sec7_you_do_better", e.target.value)}
                    placeholder="Your super-power..."
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 8 — BRAND POSITIONING */}
          {/* ========================================================================= */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Complete this sentence: "I help ______ achieve ______ without ______."
                </label>
                <input
                  type="text"
                  value={formData.sec8_sentence_completion}
                  onChange={(e) => handleInputChange("sec8_sentence_completion", e.target.value)}
                  placeholder="I help sales managers achieve 3x revenue without cold calling."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    3 Words you want associated with your brand
                  </label>
                  <input
                    type="text"
                    value={formData.sec8_three_brand_words}
                    onChange={(e) => handleInputChange("sec8_three_brand_words", e.target.value)}
                    placeholder="e.g. Authority, Results, Premium"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    What makes you credible & authoritative?
                  </label>
                  <input
                    type="text"
                    value={formData.sec8_what_makes_credible}
                    onChange={(e) => handleInputChange("sec8_what_makes_credible", e.target.value)}
                    placeholder="e.g. Ex-Fortune 500 VP, 10+ years exp, 500+ clients"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  What common advice in your industry do you strongly disagree with?
                </label>
                <textarea
                  rows={3}
                  value={formData.sec8_disagreed_advice}
                  onChange={(e) => handleInputChange("sec8_disagreed_advice", e.target.value)}
                  placeholder="Your contrarian view..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 9 — SALES PROCESS */}
          {/* ========================================================================= */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Where do your leads currently come from?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {["Instagram", "WhatsApp", "Facebook", "YouTube", "Google", "Referrals", "LinkedIn", "Other"].map((item) => {
                    const selected = Array.isArray(formData.sec9_lead_sources) && formData.sec9_lead_sources.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleCheckboxToggle("sec9_lead_sources", item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          selected
                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                            : "bg-[#121b33] border-[#22325c] text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>{item}</span>
                        {selected && <Check size={14} className="text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Offers Free Consultation / Call?
                  </label>
                  <select
                    value={formData.sec9_free_consultation}
                    onChange={(e) => handleInputChange("sec9_free_consultation", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Who Handles Sales Calls?
                  </label>
                  <input
                    type="text"
                    value={formData.sec9_who_handles_sales}
                    onChange={(e) => handleInputChange("sec9_who_handles_sales", e.target.value)}
                    placeholder="Myself / Sales Team"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Approx Closing Rate (%)
                  </label>
                  <input
                    type="text"
                    value={formData.sec9_closing_rate}
                    onChange={(e) => handleInputChange("sec9_closing_rate", e.target.value)}
                    placeholder="e.g. 20%"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Most common reason prospects don't buy?
                </label>
                <textarea
                  rows={3}
                  value={formData.sec9_why_prospects_dont_buy}
                  onChange={(e) => handleInputChange("sec9_why_prospects_dont_buy", e.target.value)}
                  placeholder="Main friction point in closing..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 10 — EXISTING MARKETING & ADS */}
          {/* ========================================================================= */}
          {currentStep === 10 && (
            <div className="space-y-6">
              {/* Security Disclaimer Notice */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex gap-3 text-amber-300 text-xs font-semibold">
                <ShieldCheck size={20} className="shrink-0 text-amber-400" />
                <div>
                  <strong>Aiclex Technologies Security Notice:</strong> Never share passwords for Meta, Google, Instagram, or personal accounts. Only authorized asset links or manager invites will be requested.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Current Monthly Ad Budget (INR ₹)
                  </label>
                  <input
                    type="text"
                    value={formData.sec10_current_ad_budget}
                    onChange={(e) => handleInputChange("sec10_current_ad_budget", e.target.value)}
                    placeholder="e.g. ₹50,000 / month"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Meta Business Manager Available?
                  </label>
                  <select
                    value={formData.sec10_meta_bm_available}
                    onChange={(e) => handleInputChange("sec10_meta_bm_available", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Previous ad creatives link (Google Drive / Dropbox)
                </label>
                <input
                  type="url"
                  value={formData.sec10_previous_ad_creatives_link}
                  onChange={(e) => handleInputChange("sec10_previous_ad_creatives_link", e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 11 — TESTIMONIALS & PROOF */}
          {/* ========================================================================= */}
          {currentStep === 11 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Total Clients Coached to Date
                  </label>
                  <input
                    type="number"
                    value={formData.sec11_client_count}
                    onChange={(e) => handleInputChange("sec11_client_count", e.target.value)}
                    placeholder="e.g. 250"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Years of Coaching Experience
                  </label>
                  <input
                    type="number"
                    value={formData.sec11_experience_years}
                    onChange={(e) => handleInputChange("sec11_experience_years", e.target.value)}
                    placeholder="e.g. 6"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Biggest Client Success Story
                </label>
                <textarea
                  rows={3}
                  value={formData.sec11_biggest_success_story}
                  onChange={(e) => handleInputChange("sec11_biggest_success_story", e.target.value)}
                  placeholder="Share a standout case study..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Video Testimonials Link (Drive / YouTube)
                  </label>
                  <input
                    type="url"
                    value={formData.sec11_video_testimonials_link}
                    onChange={(e) => handleInputChange("sec11_video_testimonials_link", e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Certifications / Media / Books
                  </label>
                  <input
                    type="text"
                    value={formData.sec11_certifications}
                    onChange={(e) => handleInputChange("sec11_certifications", e.target.value)}
                    placeholder="e.g. ICF Certified, Featured on Josh Talks"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 12 — CONTENT ASSETS */}
          {/* ========================================================================= */}
          {currentStep === 12 && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400 font-medium">
                Provide links to your media assets folder so our creative team can design graphics, banners, and thumbnails.
              </p>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Main Google Drive / Dropbox Assets Folder
                </label>
                <input
                  type="url"
                  value={formData.sec12_drive_folder}
                  onChange={(e) => handleInputChange("sec12_drive_folder", e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Professional Photos Folder Link
                  </label>
                  <input
                    type="url"
                    value={formData.sec12_photos_folder}
                    onChange={(e) => handleInputChange("sec12_photos_folder", e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Raw / Edited Videos Folder Link
                  </label>
                  <input
                    type="url"
                    value={formData.sec12_videos_folder}
                    onChange={(e) => handleInputChange("sec12_videos_folder", e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 13 — BRAND RESTRICTIONS */}
          {/* ========================================================================= */}
          {currentStep === 13 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Is Political Content Allowed?
                  </label>
                  <select
                    value={formData.sec13_political_allowed}
                    onChange={(e) => handleInputChange("sec13_political_allowed", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Is Religious Content Allowed?
                  </label>
                  <select
                    value={formData.sec13_religious_allowed}
                    onChange={(e) => handleInputChange("sec13_religious_allowed", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Is Controversial Content Allowed?
                  </label>
                  <select
                    value={formData.sec13_controversial_allowed}
                    onChange={(e) => handleInputChange("sec13_controversial_allowed", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Anything we should NEVER post on your social media?
                </label>
                <textarea
                  rows={3}
                  value={formData.sec13_never_post_item}
                  onChange={(e) => handleInputChange("sec13_never_post_item", e.target.value)}
                  placeholder="Strict taboos or red lines..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 14 — WORKING PROCESS */}
          {/* ========================================================================= */}
          {currentStep === 14 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Who Approves Content?
                  </label>
                  <input
                    type="text"
                    value={formData.sec14_content_approver}
                    onChange={(e) => handleInputChange("sec14_content_approver", e.target.value)}
                    placeholder="Myself / Assistant Name"
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    Preferred Approval & Communication Channel
                  </label>
                  <select
                    value={formData.sec14_approval_channel}
                    onChange={(e) => handleInputChange("sec14_approval_channel", e.target.value)}
                    className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                  >
                    {["WhatsApp", "Email", "Slack", "Other"].map((opt) => (
                      <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  How Frequently Can You Record Videos?
                </label>
                <select
                  value={formData.sec14_recording_frequency}
                  onChange={(e) => handleInputChange("sec14_recording_frequency", e.target.value)}
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white text-sm font-semibold"
                >
                  {["Daily", "2–3 times/week", "Weekly", "Monthly"].map((opt) => (
                    <option key={opt} value={opt} className="bg-[#121b33]">{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 15 — FINAL BUSINESS VISION */}
          {/* ========================================================================= */}
          {currentStep === 15 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  What is the biggest problem in your business right now?
                </label>
                <textarea
                  rows={3}
                  value={formData.sec15_biggest_biz_problem}
                  onChange={(e) => handleInputChange("sec15_biggest_biz_problem", e.target.value)}
                  placeholder="Share your current bottleneck..."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  If we could make your audience remember only ONE thing about you, what should it be?
                </label>
                <input
                  type="text"
                  value={formData.sec15_one_thing_to_remember}
                  onChange={(e) => handleInputChange("sec15_one_thing_to_remember", e.target.value)}
                  placeholder="e.g. The #1 authority in B2B sales coaching in India."
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  Top 3 business goals for the next 12 months
                </label>
                <textarea
                  rows={3}
                  value={formData.sec15_top_3_goals}
                  onChange={(e) => handleInputChange("sec15_top_3_goals", e.target.value)}
                  placeholder="1. Hit ₹1 Cr Annual Revenue 2. Launch Mastermind 3. Reach 100k Followers"
                  className="w-full bg-[#121b33] border border-[#22325c] rounded-xl p-4 text-white placeholder-gray-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* STEP NAVIGATION BUTTONS */}
          <div className="border-t border-[#1b284a] pt-6 mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`py-3 px-6 rounded-2xl font-black text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                currentStep === 1
                  ? "opacity-30 cursor-not-allowed text-gray-500 bg-[#10182c]"
                  : "bg-[#141f3a] text-gray-200 hover:bg-[#1d2d54] cursor-pointer"
              }`}
            >
              <ChevronLeft size={16} />
              <span>Previous Step</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => saveDraftLocally()}
                className="hidden sm:inline-flex py-3 px-5 rounded-2xl bg-[#121c35] border border-[#22335c] text-amber-400 hover:bg-[#182647] font-bold text-xs transition items-center gap-2"
              >
                <Save size={14} />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/25 flex items-center gap-2 cursor-pointer"
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
            <div className="fixed inset-0 bg-[#030611]/80 backdrop-blur-sm" onClick={() => setShowReviewModal(false)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-xl w-full bg-[#0c1428] border border-[#213259] rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-start border-b border-[#1c2c52] pb-4">
                <div>
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider">Final Verification</span>
                  <h3 className="text-xl font-black text-white mt-1">Review & Submit Business Discovery</h3>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="bg-[#121c36] border border-[#203157] rounded-2xl p-4 space-y-2 text-xs text-gray-300">
                <p><strong>Name:</strong> {formData.sec1_full_name}</p>
                <p><strong>Brand:</strong> {formData.sec1_business_name}</p>
                <p><strong>Phone:</strong> {formData.sec1_phone}</p>
                <p><strong>Email:</strong> {formData.sec1_email}</p>
                <p><strong>Primary Goal:</strong> {formData.sec6_primary_goal}</p>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                By submitting this business discovery portal, you authorize Team Aiclex Technologies to store and analyze your information for strategy and onboarding.
              </p>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 px-5 rounded-2xl bg-[#14203d] text-gray-300 font-bold text-xs uppercase"
                >
                  Back to Form
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmitForm}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
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
