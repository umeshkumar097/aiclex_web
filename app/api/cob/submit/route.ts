import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Required fields check
    const fullName = payload.sec1_full_name?.trim();
    const businessName = payload.sec1_business_name?.trim();
    const phone = payload.sec1_phone?.trim();
    const email = payload.sec1_email?.trim();
    const achieveDesc = payload.sec2_help_achieve?.trim();
    const idealClient = payload.sec3_ideal_client?.trim();
    const idealCustomerDesc = payload.sec3_ideal_customer_desc?.trim();
    const sixMonthVision = payload.sec6_six_month_vision?.trim();

    if (!fullName || !businessName || !phone || !email) {
      return NextResponse.json(
        { error: "Please fill in all mandatory fields (Name, Business Name, Phone, Email)." },
        { status: 400 }
      );
    }

    if (!achieveDesc || !idealClient || !idealCustomerDesc || !sixMonthVision) {
      return NextResponse.json(
        { error: "Please complete all mandatory section questions before submitting." },
        { status: 400 }
      );
    }

    // Generate unique Submission ID (e.g. COB-20260902-8419)
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `COB-${dateStr}-${randomSuffix}`;

    // Extract quick queryable fields
    const designation = payload.sec1_designation || null;
    const whatsapp = payload.sec1_whatsapp || null;
    const city = payload.sec1_city || null;
    const state = payload.sec1_state || null;
    const website = payload.sec1_website || null;
    const startYear = payload.sec1_start_year ? parseInt(payload.sec1_start_year, 10) : null;
    const businessType = payload.sec1_business_type || null;
    const coachingCategory = payload.sec1_coaching_category || null;

    const primaryAudience = Array.isArray(payload.sec3_primary_audience)
      ? payload.sec3_primary_audience.join(", ")
      : payload.sec3_primary_audience || null;

    const primaryGoal = payload.sec6_primary_goal || null;
    const monthlyLeadTarget = payload.sec6_monthly_lead_target ? parseInt(payload.sec6_monthly_lead_target, 10) : null;
    const monthlySalesTarget = payload.sec6_monthly_sales_target ? parseInt(payload.sec6_monthly_sales_target, 10) : null;

    // Insert into database
    const query = `
      INSERT INTO cob_submissions (
        submission_id, full_name, business_name, designation, phone, whatsapp, email,
        city, state, website, business_start_year, business_type, coaching_category,
        primary_audience, primary_goal, monthly_lead_target, monthly_sales_target,
        status, payload
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'New', $18)
      RETURNING id, submission_id, created_at
    `;

    const values = [
      submissionId, fullName, businessName, designation, phone, whatsapp, email,
      city, state, website, startYear, businessType, coachingCategory,
      primaryAudience, primaryGoal, monthlyLeadTarget, monthlySalesTarget,
      JSON.stringify(payload)
    ];

    const result = await pool.query(query, values);
    const insertedRow = result.rows[0];

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      submission_id: insertedRow.submission_id,
      created_at: insertedRow.created_at,
    });
  } catch (error: any) {
    console.error("Error submitting COB form:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process form submission. Please try again." },
      { status: 500 }
    );
  }
}
