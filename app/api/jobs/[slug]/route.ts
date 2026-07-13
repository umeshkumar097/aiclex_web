import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET JOB (By ID or Slug)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const isId = /^\d+$/.test(slug);
    
    const queryText = isId 
      ? "SELECT * FROM jobs WHERE id = $1" 
      : "SELECT * FROM jobs WHERE slug = $1";
      
    const result = await pool.query(queryText, [isId ? parseInt(slug) : slug]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

// PUT (UPDATE) JOB BY ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const isId = /^\d+$/.test(slug);

    if (!isId) {
      return NextResponse.json({ error: "Numeric ID is required for editing" }, { status: 400 });
    }

    const { title, slug: jobSlug, department, location, type, salary, description, requirements, experience } = await request.json();

    const result = await pool.query(
      `UPDATE jobs 
       SET title = $1, slug = $2, department = $3, location = $4, type = $5, salary = $6, description = $7, requirements = $8, experience = $9, posted_at = CURRENT_TIMESTAMP
       WHERE id = $10 
       RETURNING *`,
      [title, jobSlug, department, location, type, salary, description, JSON.stringify(requirements), experience, parseInt(slug)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE JOB BY ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const isId = /^\d+$/.test(slug);

    if (!isId) {
      return NextResponse.json({ error: "Numeric ID is required for deletion" }, { status: 400 });
    }

    const result = await pool.query("DELETE FROM jobs WHERE id = $1 RETURNING *", [parseInt(slug)]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
