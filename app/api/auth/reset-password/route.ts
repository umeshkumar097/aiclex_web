import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Verify token exists and is valid (e.g. updated_at is within 2 hours)
    const { rows } = await pool.query(
      `SELECT email 
       FROM users 
       WHERE reset_token = $1 AND updated_at > CURRENT_TIMESTAMP - INTERVAL '2 hours'`,
      [token]
    );

    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired recovery link" }, { status: 404 });
    }

    return NextResponse.json({ success: true, email: user.email });
  } catch (error: any) {
    console.error("Verify reset token error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Password and token are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    // 1. Verify token validity
    const { rows } = await pool.query(
      `SELECT id 
       FROM users 
       WHERE reset_token = $1 AND updated_at > CURRENT_TIMESTAMP - INTERVAL '2 hours'`,
      [token]
    );

    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired recovery link" }, { status: 400 });
    }

    // 2. Hash and update password, clear token
    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE users 
       SET password_hash = $1, reset_token = NULL, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2`,
      [passwordHash, user.id]
    );

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
