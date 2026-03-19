import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET All Leads (For Admin CRM)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "";
    const phone = searchParams.get("phone") || "";
    const date = searchParams.get("date") || "";

    let query = "SELECT * FROM leads WHERE 1=1";
    const params: any[] = [];

    if (name) {
      params.push(`%${name}%`);
      query += ` AND name ILIKE $${params.length}`;
    }
    if (phone) {
      params.push(`%${phone}%`);
      query += ` AND phone ILIKE $${params.length}`;
    }
    if (date) {
      params.push(date);
      query += ` AND created_at::date = $${params.length}`;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// POST New Lead (From Front-end Forms)
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, type, requirement } = await req.json();

    if (!name || !phone || !type) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const query = `
      INSERT INTO leads (name, email, phone, type, requirement)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, phone, type, requirement]);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
  }
}
