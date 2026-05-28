import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { job_id, full_name, email, message, resume_url } = data;

    if (!resume_url) {
      return NextResponse.json({ error: "Resume URL is required" }, { status: 400 });
    }

    // Save to Database
    const result = await pool.query(
      `INSERT INTO job_applications (job_id, full_name, email, resume_url, message) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [job_id, full_name, email, resume_url, message]
    );

    return NextResponse.json({ success: true, application: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT ja.*, j.title as job_title 
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       ORDER BY ja.applied_at DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
