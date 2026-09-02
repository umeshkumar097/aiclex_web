import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import * as XLSX from "xlsx";

// Helper function to format array or object to clean Excel text
function formatVal(val: any): string {
  if (val === null || val === undefined) return "";
  if (Array.isArray(val)) return val.join(", ");
  if (typeof val === "boolean") return val ? "Yes" : "No";
  if (typeof val === "object") {
    return Object.entries(val)
      .map(([k, v]) => `${k}: ${v}`)
      .join("; ");
  }
  return String(val);
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { export_type, ids } = body; // export_type: 'all' | 'selected' | 'single'

    let query = "SELECT * FROM cob_submissions ORDER BY created_at DESC";
    let queryParams: any[] = [];

    if ((export_type === "selected" || export_type === "single") && Array.isArray(ids) && ids.length > 0) {
      query = "SELECT * FROM cob_submissions WHERE id = ANY($1::int[]) OR submission_id = ANY($1::text[]) ORDER BY created_at DESC";
      queryParams = [ids];
    }

    const result = await pool.query(query, queryParams);
    const rows = result.rows;

    if (rows.length === 0) {
      return NextResponse.json({ error: "No records found to export" }, { status: 404 });
    }

    // Map rows to clean Excel column key-value objects
    const excelRows = rows.map((row: any) => {
      const p = row.payload || {};

      return {
        "Submission ID": row.submission_id,
        "Submission Date": row.created_at ? new Date(row.created_at).toLocaleDateString("en-IN") : "",
        "Submission Time": row.created_at ? new Date(row.created_at).toLocaleTimeString("en-IN") : "",
        "Status": row.status || "New",
        "Admin Notes": row.admin_notes || "",

        // SECTION 1 — Basic Business Information
        "Full Name": formatVal(p.sec1_full_name || row.full_name),
        "Business / Brand Name": formatVal(p.sec1_business_name || row.business_name),
        "Designation / Role": formatVal(p.sec1_designation),
        "Phone Number": formatVal(p.sec1_phone || row.phone),
        "WhatsApp Number": formatVal(p.sec1_whatsapp || row.whatsapp),
        "Email Address": formatVal(p.sec1_email || row.email),
        "City": formatVal(p.sec1_city || row.city),
        "State": formatVal(p.sec1_state || row.state),
        "Website": formatVal(p.sec1_website || row.website),
        "Business Start Year": formatVal(p.sec1_start_year),
        "Business Type": formatVal(p.sec1_business_type),
        "Coaching Category": formatVal(p.sec1_coaching_category),
        "Business Description": formatVal(p.sec1_business_description),

        // SECTION 2 — Coaching & Offer Details
        "What You Help Achieve": formatVal(p.sec2_help_achieve),
        "Main Coaching Program": formatVal(p.sec2_main_program),
        "Program Name": formatVal(p.sec2_program_name),
        "Program Duration": formatVal(p.sec2_program_duration),
        "Program Price": formatVal(p.sec2_program_price),
        "Pricing Model": formatVal(p.sec2_pricing_model),
        "Coaching Format": formatVal(p.sec2_coaching_format),
        "Delivery Mode": formatVal(p.sec2_delivery_mode),
        "Program Inclusions": formatVal(p.sec2_program_inclusions),
        "Biggest Result / Transformation": formatVal(p.sec2_biggest_transformation),
        "Differentiation from Competitors": formatVal(p.sec2_differentiation),
        "3 Biggest Problems Solved": formatVal(p.sec2_problems_solved),
        "Client Results Achieved": formatVal(p.sec2_client_results),
        "Has Testimonials": formatVal(p.sec2_has_testimonials),
        "Offer Testimonials Link": formatVal(p.sec2_testimonials_link),
        "Has Case Studies": formatVal(p.sec2_has_case_studies),
        "Certifications / Awards": formatVal(p.sec2_certifications),

        // SECTION 3 — Target Audience
        "Ideal Client": formatVal(p.sec3_ideal_client),
        "Who Should NOT Buy": formatVal(p.sec3_who_not_buy),
        "Primary Audience": formatVal(p.sec3_primary_audience),
        "Target Age Group": formatVal(p.sec3_target_age),
        "Target Gender": formatVal(p.sec3_target_gender),
        "Target Cities / Countries": formatVal(p.sec3_target_locations),
        "Preferred Audience Language": formatVal(p.sec3_preferred_language),
        "Audience Income Range": formatVal(p.sec3_income_range),
        "Audience Current Situation": formatVal(p.sec3_current_situation),
        "Audience Biggest Problem": formatVal(p.sec3_biggest_problem),
        "What Audience Is Trying to Achieve": formatVal(p.sec3_trying_to_achieve),
        "What Prevents Audience": formatVal(p.sec3_what_prevents),
        "Audience Biggest Fears": formatVal(p.sec3_biggest_fears),
        "Audience Objections Before Buying": formatVal(p.sec3_objections),
        "Repeated Prospect Questions": formatVal(p.sec3_repeated_questions),
        "Why Clients Choose You": formatVal(p.sec3_why_choose_you),
        "Ideal Customer Description": formatVal(p.sec3_ideal_customer_desc),

        // SECTION 4 — Existing Social Media
        "Platforms Used": formatVal(p.sec4_platforms),
        "Instagram Details": formatVal(p.sec4_instagram_details),
        "Facebook Details": formatVal(p.sec4_facebook_details),
        "YouTube Details": formatVal(p.sec4_youtube_details),
        "LinkedIn Details": formatVal(p.sec4_linkedin_details),
        "X/Twitter Details": formatVal(p.sec4_x_details),
        "Threads Details": formatVal(p.sec4_threads_details),
        "Website/Blog Details": formatVal(p.sec4_blog_details),
        "Currently Running Meta Ads": formatVal(p.sec4_running_meta_ads),
        "Meta Ads Objective": formatVal(p.sec4_meta_ads_objective),

        // SECTION 5 — Content & Personal Brand
        "Camera Appearance Comfort": formatVal(p.sec5_camera_comfort),
        "Comfortable Recording Reels": formatVal(p.sec5_reels_comfort),
        "Comfortable Live Sessions": formatVal(p.sec5_live_comfort),
        "Comfortable Podcasts/Interviews": formatVal(p.sec5_podcasts_comfort),
        "Has Professional Photos": formatVal(p.sec5_has_photos),
        "Has Professional Videos": formatVal(p.sec5_has_videos),
        "Has Testimonial Videos": formatVal(p.sec5_has_testimonial_videos),
        "Brand Personality Descriptors": formatVal(p.sec5_personality_traits),
        "Content Enjoyed Creating": formatVal(p.sec5_content_enjoyed),
        "Content NOT Wanting to Create": formatVal(p.sec5_content_avoid),
        "Forbidden Topics": formatVal(p.sec5_forbidden_topics),
        "Favorite Social Accounts (3-5)": formatVal(p.sec5_favorite_accounts),
        "Why Favorite Accounts Liked": formatVal(p.sec5_why_favorite_accounts),

        // SECTION 6 — Social Media Goals
        "Primary Social Media Goal": formatVal(p.sec6_primary_goal),
        "Monthly Lead Target": formatVal(p.sec6_monthly_lead_target),
        "Monthly Sales Target": formatVal(p.sec6_monthly_sales_target),
        "Current Avg Monthly Leads": formatVal(p.sec6_current_avg_leads),
        "Current Conversion Rate %": formatVal(p.sec6_conversion_rate),
        "Avg Coaching Sales / Month": formatVal(p.sec6_avg_sales_count),
        "Average Customer Value": formatVal(p.sec6_avg_customer_value),
        "Biggest Social Media Problem": formatVal(p.sec6_biggest_sm_problem),
        "6-Month Ideal Vision": formatVal(p.sec6_six_month_vision),

        // SECTION 7 — Competitor Research
        "Competitor 1": formatVal(p.sec7_comp1),
        "Competitor 2": formatVal(p.sec7_comp2),
        "Competitor 3": formatVal(p.sec7_comp3),
        "Competitor 4": formatVal(p.sec7_comp4),
        "Competitor 5": formatVal(p.sec7_comp5),
        "Biggest Competitor": formatVal(p.sec7_biggest_competitor),
        "Why Considered Competitor": formatVal(p.sec7_why_competitor),
        "What They Do Better": formatVal(p.sec7_they_do_better),
        "What You Do Better": formatVal(p.sec7_you_do_better),
        "Competitor Content Performing Well": formatVal(p.sec7_comp_content_well),
        "Competitor Positioning to Avoid": formatVal(p.sec7_positioning_to_avoid),

        // SECTION 8 — Brand Positioning
        "What to be Remembered For": formatVal(p.sec8_remembered_for),
        "Sentence Completion": formatVal(p.sec8_sentence_completion),
        "3 Brand Words": formatVal(p.sec8_three_brand_words),
        "Biggest Professional Achievement": formatVal(p.sec8_biggest_achievement),
        "What Makes You Credible": formatVal(p.sec8_what_makes_credible),
        "Has Unique Framework": formatVal(p.sec8_has_methodology),
        "Framework Description": formatVal(p.sec8_methodology_desc),
        "Counter-Intuitive Beliefs": formatVal(p.sec8_different_beliefs),
        "Industry Advice Disagreed With": formatVal(p.sec8_disagreed_advice),
        "Expert Area Goal": formatVal(p.sec8_expert_area),

        // SECTION 9 — Sales Process
        "Lead Sources": formatVal(p.sec9_lead_sources),
        "How New Lead Contacts You": formatVal(p.sec9_lead_contact_method),
        "WhatsApp Number for Sales": formatVal(p.sec9_whatsapp_number),
        "Booking Link": formatVal(p.sec9_booking_link),
        "Offers Free Consultation": formatVal(p.sec9_free_consultation),
        "Consultation Duration": formatVal(p.sec9_consultation_duration),
        "Who Handles Sales Calls": formatVal(p.sec9_who_handles_sales),
        "Avg Calls Per Month": formatVal(p.sec9_avg_calls_per_month),
        "Approx Closing Rate %": formatVal(p.sec9_closing_rate),
        "Most Common Reason Prospects Don't Buy": formatVal(p.sec9_why_prospects_dont_buy),
        "Post-Lead Flow": formatVal(p.sec9_post_lead_flow),
        "Uses CRM": formatVal(p.sec9_uses_crm),
        "CRM Name": formatVal(p.sec9_crm_name),

        // SECTION 10 — Existing Marketing & Ads
        "Run Meta Ads Before": formatVal(p.sec10_meta_ads_before),
        "Run Google Ads Before": formatVal(p.sec10_google_ads_before),
        "Current Monthly Ad Budget": formatVal(p.sec10_current_ad_budget),
        "Previous Monthly Ad Budget": formatVal(p.sec10_previous_ad_budget),
        "Previous Campaign Results": formatVal(p.sec10_previous_campaign_results),
        "Average CPL": formatVal(p.sec10_average_cpl),
        "Avg Monthly Leads from Ads": formatVal(p.sec10_avg_leads_from_ads),
        "Best Performing Campaign": formatVal(p.sec10_best_campaign),
        "Worst Performing Campaign": formatVal(p.sec10_worst_campaign),
        "Offer Advertised": formatVal(p.sec10_offer_advertised),
        "Landing Page Used": formatVal(p.sec10_landing_page_used),
        "Previous Ad Creatives Link": formatVal(p.sec10_previous_ad_creatives_link),
        "Meta Business Manager Available": formatVal(p.sec10_meta_bm_available),
        "Google Ads Available": formatVal(p.sec10_google_ads_available),
        "Google Analytics Available": formatVal(p.sec10_ga_available),
        "Meta Pixel Installed": formatVal(p.sec10_meta_pixel_installed),
        "Conversion Tracking Installed": formatVal(p.sec10_conversion_tracking_installed),

        // SECTION 11 — Testimonials & Proof
        "Number of Clients Coached": formatVal(p.sec11_client_count),
        "Years of Coaching Experience": formatVal(p.sec11_experience_years),
        "Biggest Client Success Story": formatVal(p.sec11_biggest_success_story),
        "Client Transformation Examples": formatVal(p.sec11_transformation_examples),
        "Proof Testimonials Link": formatVal(p.sec11_testimonials_link),
        "Video Testimonials Link": formatVal(p.sec11_video_testimonials_link),
        "Screenshots / Results Link": formatVal(p.sec11_screenshots_link),
        "Media Coverage": formatVal(p.sec11_media_coverage),
        "Podcasts / Interviews": formatVal(p.sec11_podcasts_interviews),
        "Awards": formatVal(p.sec11_awards),
        "Certifications": formatVal(p.sec11_certifications),
        "Publications / Books": formatVal(p.sec11_publications),

        // SECTION 12 — Content Assets
        "Drive / Assets Folder": formatVal(p.sec12_drive_folder),
        "Photos Folder": formatVal(p.sec12_photos_folder),
        "Videos Folder": formatVal(p.sec12_videos_folder),
        "Logo Link": formatVal(p.sec12_logo_link),
        "Brand Guidelines Link": formatVal(p.sec12_brand_guidelines_link),
        "Presentations Link": formatVal(p.sec12_presentations_link),
        "Other Assets Link": formatVal(p.sec12_other_assets_link),

        // SECTION 13 — Brand Restrictions
        "Topics Not to Discuss": formatVal(p.sec13_avoid_topics),
        "Phrases Not to Use": formatVal(p.sec13_avoid_phrases),
        "Political Content Allowed": formatVal(p.sec13_political_allowed),
        "Religious Content Allowed": formatVal(p.sec13_religious_allowed),
        "Controversial Content Allowed": formatVal(p.sec13_controversial_allowed),
        "Competitors Mentioned Allowed": formatVal(p.sec13_competitors_mentioned),
        "Client Names Mentioned Allowed": formatVal(p.sec13_client_names_mentioned),
        "Client Screenshots Posted Allowed": formatVal(p.sec13_client_screenshots_posted),
        "Client Results in Marketing Allowed": formatVal(p.sec13_client_results_used),
        "Legal / Compliance Restrictions": formatVal(p.sec13_legal_restrictions),
        "NEVER Post Item": formatVal(p.sec13_never_post_item),

        // SECTION 14 — Working Process
        "Content Approver": formatVal(p.sec14_content_approver),
        "Preferred Approval Channel": formatVal(p.sec14_approval_channel),
        "Preferred Communication Channel": formatVal(p.sec14_comm_channel),
        "Advance Notice Required": formatVal(p.sec14_advance_notice),
        "Who Provides Videos": formatVal(p.sec14_who_provides_videos),
        "Recording Frequency": formatVal(p.sec14_recording_frequency),
        "Preferred Recording Day": formatVal(p.sec14_recording_day),
        "Preferred Content Language": formatVal(p.sec14_content_language),
        "Preferred Formats": formatVal(p.sec14_preferred_formats),

        // SECTION 15 — Final Business Questions
        "Biggest Business Problem Right Now": formatVal(p.sec15_biggest_biz_problem),
        "Problem Social Media Should Solve": formatVal(p.sec15_sm_problem_to_solve),
        "ONE Thing Audience Should Remember": formatVal(p.sec15_one_thing_to_remember),
        "Top 3 Business Goals (12 Months)": formatVal(p.sec15_top_3_goals),
        "Additional Information": formatVal(p.sec15_additional_notes),
      };
    });

    // Generate Excel Sheet & Workbook using XLSX
    const worksheet = XLSX.utils.json_to_sheet(excelRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "COB Submissions");

    // Auto-width for columns
    const colWidths = Object.keys(excelRows[0] || {}).map((key) => ({
      wch: Math.max(key.length + 4, 18),
    }));
    worksheet["!cols"] = colWidths;

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    const filename = `Aiclex_Coach_Onboarding_Submissions_${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Error exporting COB Excel:", error);
    return NextResponse.json({ error: "Failed to generate Excel export" }, { status: 500 });
  }
}
