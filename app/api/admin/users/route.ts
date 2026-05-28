import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    // In a real app we'd verify the admin token here
    const { rows } = await pool.query(`SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC`);
    return NextResponse.json({ users: rows });
  } catch (error: any) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
