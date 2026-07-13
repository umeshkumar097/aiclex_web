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

export async function PUT(req: NextRequest) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: "User ID and role are required" }, { status: 400 });
    }

    await pool.query("UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [role, userId]);
    return NextResponse.json({ success: true, message: "User role updated successfully" });
  } catch (error: any) {
    console.error("Update user role error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
