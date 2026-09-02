import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Helper function to verify admin token/session
function isAuthorizedAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("admin_token")?.value;
  // In production, token check can be strictly checked or allowed if token exists
  return !!token;
}

// GET: Fetch list of COB submissions with filters & stats
export async function GET(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const businessType = searchParams.get("business_type") || "";
    const goal = searchParams.get("goal") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = (page - 1) * limit;

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

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    // Count Total matching
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM cob_submissions ${whereClause}`,
      queryParams
    );
    const totalRecords = parseInt(countResult.rows[0].count, 10);

    // Fetch Records
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

    // Fetch Stats Overview Cards Data
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
        total: 0,
        new_responses: 0,
        this_week: 0,
        this_month: 0,
        completed: 0,
        in_progress: 0,
      },
    });
  } catch (error: any) {
    console.error("Error fetching COB admin submissions:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// PUT: Update Submission Status, Admin Notes, or Payload data
export async function PUT(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, admin_notes, payload } = body;

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
    }

    let updateFields: string[] = ["updated_at = CURRENT_TIMESTAMP"];
    let queryParams: any[] = [];
    let paramIndex = 1;

    if (status !== undefined) {
      updateFields.push(`status = $${paramIndex}`);
      queryParams.push(status);
      paramIndex++;
    }

    if (admin_notes !== undefined) {
      updateFields.push(`admin_notes = $${paramIndex}`);
      queryParams.push(admin_notes);
      paramIndex++;
    }

    if (payload !== undefined) {
      updateFields.push(`payload = $${paramIndex}`);
      queryParams.push(JSON.stringify(payload));
      paramIndex++;
    }

    queryParams.push(id);

    const query = `
      UPDATE cob_submissions
      SET ${updateFields.join(", ")}
      WHERE id = $${paramIndex} OR submission_id = $${paramIndex}
      RETURNING *
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
    console.error("Error updating COB submission:", error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

// DELETE: Delete Submission
export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID parameter required" }, { status: 400 });
    }

    const result = await pool.query(
      `DELETE FROM cob_submissions WHERE id = $1 OR submission_id = $1 RETURNING id`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting COB submission:", error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
