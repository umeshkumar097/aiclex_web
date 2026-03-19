import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET ALL JOBS
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs WHERE is_active = true ORDER BY posted_at DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST NEW JOB (Admin)
export async function POST(req: Request) {
  try {
    const { title, slug, department, location, type, salary, description, requirements, experience } = await req.json();

    const result = await pool.query(
      `INSERT INTO jobs (title, slug, department, location, type, salary, description, requirements, experience) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [title, slug, department, location, type, salary, description, JSON.stringify(requirements), experience]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
