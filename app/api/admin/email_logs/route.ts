import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    const { rows } = await pool.query(`SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 100`);
    return NextResponse.json({ logs: rows });
  } catch (error: any) {
    console.error("Fetch email logs error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
