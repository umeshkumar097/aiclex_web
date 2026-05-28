import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_SECRET = process.env.JWT_SECRET || "aiclex-secret-key-2024";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const impersonateEmail = req.headers.get("x-impersonate-email");
    let email = decoded.email;

    // If admin is impersonating a user, use the impersonated email
    if (decoded.role === 'admin' && impersonateEmail) {
      email = impersonateEmail;
    }

    // Fetch subscriptions for this email
    const { rows } = await pool.query(
      `SELECT * FROM subscriptions WHERE customer_email = $1 ORDER BY created_at DESC`,
      [email]
    );

    return NextResponse.json({ subscriptions: rows });
  } catch (error: any) {
    console.error("Fetch client subscriptions error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
