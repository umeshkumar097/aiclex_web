import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    const result = await pool.query(
      `SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 100`
    );

    return NextResponse.json({ logs: result.rows });
  } catch (error) {
    console.error("Error fetching webhook logs:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
