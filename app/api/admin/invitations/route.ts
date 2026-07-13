import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import crypto from "crypto";
import { sendInvitationEmail } from "@/lib/mail";

export async function GET(req: NextRequest) {
  try {
    // 1. Fetch registered team members (users who are not clients)
    const { rows: members } = await pool.query(
      "SELECT id, name, email, phone, role, created_at FROM users WHERE role != 'client' ORDER BY created_at DESC"
    );

    // 2. Fetch pending, unexpired, and unaccepted invitations
    const { rows: invitations } = await pool.query(
      `SELECT id, email, role, token, created_at, expires_at 
       FROM invitations 
       WHERE is_accepted = FALSE AND expires_at > CURRENT_TIMESTAMP 
       ORDER BY created_at DESC`
    );

    return NextResponse.json({ members, invitations });
  } catch (error: any) {
    console.error("Fetch team/invitations error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json({ error: "Email and role are required" }, { status: 400 });
    }

    // Check if user already exists as admin or staff
    const { rows: existingUsers } = await pool.query(
      "SELECT id FROM users WHERE email = $1 AND role != 'client'",
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User is already an active team member" }, { status: 400 });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Save invitation to DB (upsert if they were invited previously but token expired)
    await pool.query(
      `INSERT INTO invitations (email, role, token, is_accepted, created_at, expires_at) 
       VALUES ($1, $2, $3, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days')
       ON CONFLICT (email) 
       DO UPDATE SET role = EXCLUDED.role, token = EXCLUDED.token, is_accepted = FALSE, created_at = CURRENT_TIMESTAMP, expires_at = CURRENT_TIMESTAMP + INTERVAL '7 days'`,
      [email, role, token]
    );

    // Send the email
    try {
      await sendInvitationEmail(email, token, role);
    } catch (mailErr: any) {
      console.error("Failed to send invitation email:", mailErr);
      return NextResponse.json({ error: "Failed to send invitation email. Please check SMTP settings." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Invitation sent successfully" });
  } catch (error: any) {
    console.error("Create invitation error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Invitation ID is required" }, { status: 400 });
    }

    await pool.query("DELETE FROM invitations WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: "Invitation revoked successfully" });
  } catch (error: any) {
    console.error("Revoke invitation error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
