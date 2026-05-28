import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM enquiries ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cols = Object.keys(data).join(", ");
    const vals = Object.values(data);
    const placeholders = vals.map((_, i) => "$" + (i + 1)).join(", ");
    
    const { rows } = await pool.query(
      "INSERT INTO enquiries (" + cols + ") VALUES (" + placeholders + ") RETURNING *",
      vals
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
  }
}