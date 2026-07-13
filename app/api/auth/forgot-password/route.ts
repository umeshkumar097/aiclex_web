import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if email exists in users table
    const { rows } = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    const user = rows[0];

    if (!user) {
      // Return success even if email is missing to prevent user enumeration
      return NextResponse.json({ success: true, message: "If the email is registered, a password recovery link has been sent." });
    }

    // Generate secure recovery token
    const token = crypto.randomBytes(32).toString("hex");

    // Save token to database
    await pool.query(
      "UPDATE users SET reset_token = $1, updated_at = CURRENT_TIMESTAMP WHERE email = $2",
      [token, email]
    );

    // Send reset email
    try {
      await sendPasswordResetEmail(email, token);
    } catch (mailErr: any) {
      console.error("Forgot password email dispatch failed:", mailErr);
      return NextResponse.json({ error: "Failed to dispatch recovery email. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "If the email is registered, a password recovery link has been sent." });
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
