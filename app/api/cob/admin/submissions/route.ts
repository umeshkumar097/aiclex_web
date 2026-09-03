import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY HELPERS — Admin API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Verify admin session token exists.
 * In production, replace with JWT signature verification or server-side session lookup.
 */
function isAuthorizedAdmin(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "").trim() || req.cookies.get("admin_token")?.value;
  if (!token || token.length < 10) return false;
  return true;
}

/** Sanitize free-text to safe plain text (no HTML, no SQL injectors) */
function sanitizeText(val: any, maxLen = 2000): string | null {
  if (val === null || val === undefined) return null;
  let str = String(val);

  // Strip HTML tags
  str = str.replace(/<[^>]*>/g, "");
  // Strip JS dangerous patterns
  str = str.replace(/javascript\s*:/gi, "");
  str = str.replace(/on\w+\s*=/gi, "");
  str = str.replace(/eval\s*\(/gi, "");
  str = str.replace(/document\s*\./gi, "");
  str = str.replace(/window\s*\./gi, "");
  // Strip SQL injection patterns
  str = str.replace(/\bDROP\s+TABLE\b/gi, "");
  str = str.replace(/\bDELETE\s+FROM\b/gi, "");
  str = str.replace(/\bUNION\s+SELECT\b/gi, "");
  str = str.replace(/\bOR\s+1\s*=\s*1\b/gi, "");
  str = str.replace(/\/\*[\s\S]*?\*\//g, "");

  return str.trim().slice(0, maxLen) || null;
}

/** Only allow known status values */
const ALLOWED_STATUSES = new Set(["New", "Reviewed", "In Progress", "Completed"]);

/** Only allow reasonable page/limit bounds */
function safePagination(val: string | null, defaultVal: number, max: number): number {
  const parsed = parseInt(val || String(defaultVal), 10);
  if (isNaN(parsed) || parsed < 1) return defaultVal;
  return Math.min(parsed, max);
}

// ─────────────────────────────────────────────────────────────────────────────
// GET: Fetch list of COB submissions with filters & stats
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    // Sanitize all incoming filter params
    const search = sanitizeText(searchParams.get("search"), 200) || "";
    const category = sanitizeText(searchParams.get("category"), 100) || "";
    const businessType = sanitizeText(searchParams.get("business_type"), 100) || "";
    const goal = sanitizeText(searchParams.get("goal"), 255) || "";
    const rawStatus = sanitizeText(searchParams.get("status"), 50) || "";
    // Only allow known status values to prevent filter injection
    const status = ALLOWED_STATUSES.has(rawStatus) ? rawStatus : "";

    const page = safePagination(searchParams.get("page"), 1, 1000);
    const limit = safePagination(searchParams.get("limit"), 20, 100);
    const offset = (page - 1) * limit;

    // Build parameterized WHERE clause — NEVER string-interpolate user input
    let whereConditions: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    if (search) {
      whereConditions.push(`(
        full_name ILIKE $${paramIndex} OR 
        business_name ILIKE $${paramIndex} OR 
        email ILIKE $${paramIndex} OR 
        phone ILIKE $${paramIndex} OR 
        submission_id ILIKE $${paramIndex} OR 
        city ILIKE $${paramIndex}
      )`);
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (category) {
      whereConditions.push(`coaching_category = $${paramIndex}`);
      queryParams.push(category);
      paramIndex++;
    }

    if (businessType) {
      whereConditions.push(`business_type = $${paramIndex}`);
      queryParams.push(businessType);
      paramIndex++;
    }

    if (goal) {
      whereConditions.push(`primary_goal = $${paramIndex}`);
      queryParams.push(goal);
      paramIndex++;
    }

    if (status) {
      whereConditions.push(`status = $${paramIndex}`);
      queryParams.push(status);
      paramIndex++;
    }

    const whereClause =
      whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    // Count total matching records
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM cob_submissions ${whereClause}`,
      queryParams
    );
    const totalRecords = parseInt(countResult.rows[0].count, 10);

    // Fetch paginated records
    const dataResult = await pool.query(
      `SELECT id, submission_id, full_name, business_name, designation, phone, whatsapp, email,
              city, state, website, business_start_year, business_type, coaching_category,
              primary_audience, primary_goal, monthly_lead_target, monthly_sales_target,
              status, admin_notes, created_at, updated_at
       FROM cob_submissions
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...queryParams, limit, offset]
    );

    // Stats overview (unfiltered totals)
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'New') as new_responses,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as this_week,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as this_month,
        COUNT(*) FILTER (WHERE status = 'Completed') as completed,
        COUNT(*) FILTER (WHERE status = 'In Progress') as in_progress
      FROM cob_submissions
    `);

    return NextResponse.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        total: totalRecords,
        page,
        limit,
        totalPages: Math.ceil(totalRecords / limit),
      },
      stats: statsResult.rows[0] || {
        total: 0, new_responses: 0, this_week: 0,
        this_month: 0, completed: 0, in_progress: 0,
      },
    });
  } catch (error: any) {
    console.error("[COB Admin GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PUT: Update Submission Status or Admin Notes
// ─────────────────────────────────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, admin_notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
    }

    // Validate ID is a safe string (no SQL injection via ID)
    const safeId = sanitizeText(String(id), 50);
    if (!safeId) {
      return NextResponse.json({ error: "Invalid submission ID" }, { status: 400 });
    }

    let updateFields: string[] = ["updated_at = CURRENT_TIMESTAMP"];
    let queryParams: any[] = [];
    let paramIndex = 1;

    // Only allow known status values
    if (status !== undefined) {
      const safeStatus = ALLOWED_STATUSES.has(status) ? status : null;
      if (!safeStatus) {
        return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
      }
      updateFields.push(`status = $${paramIndex}`);
      queryParams.push(safeStatus);
      paramIndex++;
    }

    if (admin_notes !== undefined) {
      const safeNotes = sanitizeText(admin_notes, 10000);
      updateFields.push(`admin_notes = $${paramIndex}`);
      queryParams.push(safeNotes);
      paramIndex++;
    }

    // Block empty updates
    if (queryParams.length === 0) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    queryParams.push(safeId);

    const query = `
      UPDATE cob_submissions
      SET ${updateFields.join(", ")}
      WHERE id::text = $${paramIndex} OR submission_id = $${paramIndex}
      RETURNING id, submission_id, status, admin_notes, updated_at
    `;

    const result = await pool.query(query, queryParams);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Submission updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("[COB Admin PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE: Delete Submission by ID
// ─────────────────────────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const rawId = searchParams.get("id");

    if (!rawId) {
      return NextResponse.json({ error: "ID parameter required" }, { status: 400 });
    }

    const safeId = sanitizeText(rawId, 50);
    if (!safeId) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Use parameterized query — never string-interpolate the id
    const result = await pool.query(
      `DELETE FROM cob_submissions WHERE id::text = $1 OR submission_id = $1 RETURNING id`,
      [safeId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error: any) {
    console.error("[COB Admin DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
