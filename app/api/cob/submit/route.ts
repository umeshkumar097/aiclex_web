import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Safe integer parser — strips non-numeric characters completely
function parseSafeInt(val: any): number | null {
  if (val === null || val === undefined || val === "") return null;
  const numStr = String(val).replace(/[^0-9]/g, "");
  if (!numStr) return null;
  const parsed = parseInt(numStr, 10);
  return isNaN(parsed) ? null : parsed;
}

// Strip ALL HTML tags, script blocks, event handlers, and dangerous patterns
function stripDangerous(val: any): string | null {
  if (val === null || val === undefined) return null;
  let str = String(val);

  // Remove <script>, <style>, <iframe>, <object>, <embed>, <form>, <input>, <svg> tags and their content
  str = str.replace(/<script[\s\S]*?<\/script>/gi, "");
  str = str.replace(/<style[\s\S]*?<\/style>/gi, "");
  str = str.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  str = str.replace(/<object[\s\S]*?<\/object>/gi, "");
  str = str.replace(/<embed[\s\S]*?>/gi, "");
  str = str.replace(/<svg[\s\S]*?<\/svg>/gi, "");

  // Strip ALL remaining HTML tags
  str = str.replace(/<[^>]*>/g, "");

  // Remove javascript: protocol (XSS via href/src/action)
  str = str.replace(/javascript\s*:/gi, "");
  str = str.replace(/vbscript\s*:/gi, "");
  str = str.replace(/data\s*:/gi, "");

  // Remove common XSS payloads
  str = str.replace(/on\w+\s*=/gi, "");           // onclick=, onload=, onerror=, etc.
  str = str.replace(/expression\s*\(/gi, "");      // CSS expression()
  str = str.replace(/alert\s*\(/gi, "");
  str = str.replace(/document\s*\./gi, "");
  str = str.replace(/window\s*\./gi, "");
  str = str.replace(/eval\s*\(/gi, "");
  str = str.replace(/execScript\s*\(/gi, "");
  str = str.replace(/setTimeout\s*\(/gi, "");
  str = str.replace(/setInterval\s*\(/gi, "");

  // Neutralize SQL injection tokens
  str = str.replace(/(['";`])\s*--/g, "");          // SQL comment via --
  str = str.replace(/\/\*[\s\S]*?\*\//g, "");       // SQL block comments /**/
  str = str.replace(/\bDROP\s+TABLE\b/gi, "");
  str = str.replace(/\bDELETE\s+FROM\b/gi, "");
  str = str.replace(/\bINSERT\s+INTO\b/gi, "");
  str = str.replace(/\bUPDATE\s+\w+\s+SET\b/gi, "");
  str = str.replace(/\bEXEC\s*\(/gi, "");
  str = str.replace(/\bUNION\s+SELECT\b/gi, "");
  str = str.replace(/\bSELECT\s+\*/gi, "");
  str = str.replace(/\bOR\s+1\s*=\s*1\b/gi, "");
  str = str.replace(/\bAND\s+1\s*=\s*1\b/gi, "");

  // Decode & re-strip HTML entities to prevent bypass
  str = str.replace(/&lt;/gi, "").replace(/&gt;/gi, "").replace(/&amp;/gi, "");
  str = str.replace(/%3C/gi, "").replace(/%3E/gi, "").replace(/%22/gi, "");

  return str.trim();
}

// Sanitize string with max length constraint
function sanitizeText(val: any, maxLength = 2000): string | null {
  const cleaned = stripDangerous(val);
  if (!cleaned) return null;
  return cleaned.slice(0, maxLength);
}

// Validate and sanitize email format strictly
function sanitizeEmail(val: any): string | null {
  const cleaned = stripDangerous(val);
  if (!cleaned) return null;
  const trimmed = cleaned.toLowerCase().trim().slice(0, 254);
  // RFC 5322 simplified safe regex
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return null;
  return trimmed;
}

// Validate and sanitize phone number (digits, +, spaces, dashes, parens only)
function sanitizePhone(val: any): string | null {
  const cleaned = stripDangerous(val);
  if (!cleaned) return null;
  // Only allow phone-safe characters
  const phone = cleaned.replace(/[^0-9+\-\s()]/g, "").trim().slice(0, 20);
  if (phone.length < 7) return null;
  return phone;
}

// Sanitize URL — only allow http/https schemes, block javascript: / data: / file:
function sanitizeUrl(val: any): string | null {
  const cleaned = stripDangerous(val);
  if (!cleaned) return null;
  const trimmed = cleaned.trim().slice(0, 500);
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

// Sanitize array of strings (e.g. checkbox fields)
function sanitizeArray(val: any, maxItems = 20, maxEachLength = 200): string[] {
  if (!Array.isArray(val)) return [];
  return val
    .slice(0, maxItems)
    .map((item) => sanitizeText(item, maxEachLength))
    .filter(Boolean) as string[];
}

// Deep sanitize an entire JSONB payload object — recursively
function sanitizePayload(obj: any, depth = 0): any {
  if (depth > 6) return {}; // prevent deeply nested attacks
  if (obj === null || obj === undefined) return null;

  if (Array.isArray(obj)) {
    return obj.slice(0, 50).map((item) => sanitizePayload(item, depth + 1));
  }

  if (typeof obj === "object") {
    const safe: Record<string, any> = {};
    let keyCount = 0;
    for (const key of Object.keys(obj)) {
      if (keyCount++ > 300) break; // prevent key flooding attacks
      const safeKey = sanitizeText(key, 100) || "__invalid_key__";
      safe[safeKey] = sanitizePayload(obj[key], depth + 1);
    }
    return safe;
  }

  if (typeof obj === "number") {
    return isFinite(obj) ? obj : null;
  }

  if (typeof obj === "boolean") return obj;

  return sanitizeText(String(obj), 5000);
}

// ─────────────────────────────────────────────────────────────────────────────
// RATE LIMITING (in-memory, per IP, per minute)
// ─────────────────────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxPerMinute = 3): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true; // allowed
  }
  if (entry.count >= maxPerMinute) return false; // blocked
  entry.count++;
  return true; // allowed
}

// Clean old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}, 5 * 60 * 1000);

// ─────────────────────────────────────────────────────────────────────────────
// POST HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting — max 3 submissions per IP per minute
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip, 3)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // 2. Content-Type validation
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
    }

    // 3. Payload size guard (max 512 KB)
    const rawBody = await req.text();
    if (rawBody.length > 512_000) {
      return NextResponse.json(
        { error: "Submission data too large. Maximum allowed is 512 KB." },
        { status: 413 }
      );
    }

    let rawPayload: any;
    try {
      rawPayload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    if (typeof rawPayload !== "object" || Array.isArray(rawPayload) || rawPayload === null) {
      return NextResponse.json({ error: "Invalid submission format." }, { status: 400 });
    }

    // 4. Sanitize ALL fields before processing
    const fullName = sanitizeText(rawPayload.sec1_full_name, 100);
    const businessName =
      sanitizeText(rawPayload.sec1_business_name, 200) ||
      fullName ||
      "Independent Practice";
    const phone = sanitizePhone(rawPayload.sec1_phone);
    const email = sanitizeEmail(rawPayload.sec1_email);

    // 5. Required field validation — AFTER sanitization
    if (!fullName) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json(
        { error: "A valid Phone Number is required (digits only, 7-20 characters)." },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { error: "A valid Email Address is required." },
        { status: 400 }
      );
    }

    // 6. Auto-ensure cob_submissions table exists
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
        submitted_ip VARCHAR(45),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Generate unique Submission ID (e.g. COB-20260903-8419)
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `COB-${dateStr}-${randomSuffix}`;

    // 8. Sanitize individual queryable fields
    const designation = sanitizeText(rawPayload.sec1_designation, 150);
    const whatsapp = sanitizePhone(rawPayload.sec1_whatsapp);
    const city = sanitizeText(rawPayload.sec1_city, 100);
    const state = sanitizeText(rawPayload.sec1_state, 100);
    const website = sanitizeUrl(rawPayload.sec1_website);
    const startYear = parseSafeInt(rawPayload.sec1_start_year);
    const businessType = sanitizeText(rawPayload.sec1_business_type, 100);
    const coachingCategory = sanitizeText(rawPayload.sec1_coaching_category, 100);

    const rawAudience = rawPayload.sec3_primary_audience;
    const primaryAudience = Array.isArray(rawAudience)
      ? sanitizeArray(rawAudience, 20, 200).join(", ")
      : sanitizeText(rawAudience, 500);

    const primaryGoal = sanitizeText(rawPayload.sec6_primary_goal, 255);
    const monthlyLeadTarget = parseSafeInt(rawPayload.sec6_monthly_lead_target);
    const monthlySalesTarget = parseSafeInt(rawPayload.sec6_monthly_sales_target);

    // 9. Deep-sanitize the full payload before storing as JSONB
    const sanitizedPayload = sanitizePayload(rawPayload);

    // 10. Insert into database using parameterized queries (no string interpolation)
    const query = `
      INSERT INTO cob_submissions (
        submission_id, full_name, business_name, designation, phone, whatsapp, email,
        city, state, website, business_start_year, business_type, coaching_category,
        primary_audience, primary_goal, monthly_lead_target, monthly_sales_target,
        status, payload, submitted_ip
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'New', $18, $19)
      RETURNING id, submission_id, created_at
    `;

    const values = [
      submissionId,
      fullName,
      businessName,
      designation,
      phone,
      whatsapp,
      email,
      city,
      state,
      website,
      startYear,
      businessType,
      coachingCategory,
      primaryAudience,
      primaryGoal,
      monthlyLeadTarget,
      monthlySalesTarget,
      JSON.stringify(sanitizedPayload),
      ip.slice(0, 45), // store submitter IP (truncated safely)
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
    // Never leak internal error messages to client
    console.error("[COB Submit] Error:", error);
    return NextResponse.json(
      { error: "Failed to process your submission. Please try again." },
      { status: 500 }
    );
  }
}
