import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Safe integer parser helper
function parseSafeInt(val: any): number | null {
  if (val === null || val === undefined || val === "") return null;
  const numStr = String(val).replace(/[^0-9]/g, "");
  if (!numStr) return null;
  const parsed = parseInt(numStr, 10);
  return isNaN(parsed) ? null : parsed;
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Required fields check (Basic contact details)
    const fullName = payload.sec1_full_name?.trim();
    const businessName = payload.sec1_business_name?.trim() || payload.sec1_full_name?.trim() || "Independent Practice";
    const phone = payload.sec1_phone?.trim();
    const email = payload.sec1_email?.trim();

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { error: "Please fill in mandatory contact information (Full Name, Phone Number, and Email Address)." },
        { status: 400 }
      );
    }

    // Auto-ensure cob_submissions table exists (idempotent safety)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cob_submissions (
        id SERIAL PRIMARY KEY,
        submission_id VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        business_name VARCHAR(255) NOT NULL,
        designation VARCHAR(255),
        phone VARCHAR(50) NOT NULL,
        whatsapp VARCHAR(50),
        email VARCHAR(255) NOT NULL,
        city VARCHAR(255),
        state VARCHAR(255),
        website VARCHAR(255),
        business_start_year INTEGER,
        business_type VARCHAR(100),
        coaching_category VARCHAR(100),
        primary_audience TEXT,
        primary_goal VARCHAR(255),
        monthly_lead_target INTEGER,
        monthly_sales_target INTEGER,
        status VARCHAR(50) DEFAULT 'New',
        admin_notes TEXT,
        payload JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Generate unique Submission ID (e.g. COB-20260903-8419)
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `COB-${dateStr}-${randomSuffix}`;

    // Extract quick queryable fields with safe integer conversion
    const designation = payload.sec1_designation?.trim() || null;
    const whatsapp = payload.sec1_whatsapp?.trim() || null;
    const city = payload.sec1_city?.trim() || null;
    const state = payload.sec1_state?.trim() || null;
    const website = payload.sec1_website?.trim() || null;
    const startYear = parseSafeInt(payload.sec1_start_year);
    const businessType = payload.sec1_business_type?.trim() || null;
    const coachingCategory = payload.sec1_coaching_category?.trim() || null;

    const primaryAudience = Array.isArray(payload.sec3_primary_audience)
      ? payload.sec3_primary_audience.join(", ")
      : payload.sec3_primary_audience?.trim() || null;

    const primaryGoal = payload.sec6_primary_goal?.trim() || null;
    const monthlyLeadTarget = parseSafeInt(payload.sec6_monthly_lead_target);
    const monthlySalesTarget = parseSafeInt(payload.sec6_monthly_sales_target);

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
