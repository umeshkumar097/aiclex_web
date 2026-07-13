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

    // Verify token exists, is not accepted, and is not expired
    const { rows } = await pool.query(
      `SELECT email, role, expires_at, is_accepted 
       FROM invitations 
       WHERE token = $1`,
      [token]
    );

    const invite = rows[0];

    if (!invite) {
      return NextResponse.json({ error: "Invalid invitation token" }, { status: 404 });
    }

    if (invite.is_accepted) {
      return NextResponse.json({ error: "This invitation has already been accepted" }, { status: 400 });
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: "This invitation token has expired" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      email: invite.email, 
      role: invite.role 
    });
  } catch (error: any) {
    console.error("Validate token error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { token, name, password } = await req.json();

    if (!token || !name || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    // 1. Fetch invitation and verify validity
    const { rows } = await pool.query(
      `SELECT email, role, expires_at, is_accepted 
       FROM invitations 
       WHERE token = $1`,
      [token]
    );

    const invite = rows[0];

    if (!invite) {
      return NextResponse.json({ error: "Invalid invitation token" }, { status: 404 });
    }

    if (invite.is_accepted) {
      return NextResponse.json({ error: "This invitation has already been accepted" }, { status: 400 });
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: "This invitation has expired" }, { status: 400 });
    }

    // 2. Begin Transaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create new user (upsert if they previously registered as a general client)
      await client.query(
        `INSERT INTO users (name, email, password_hash, role) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) 
         DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash, role = EXCLUDED.role, updated_at = CURRENT_TIMESTAMP`,
        [name, invite.email, passwordHash, invite.role]
      );

      // Mark invitation as accepted
      await client.query(
        "UPDATE invitations SET is_accepted = TRUE WHERE token = $1",
        [token]
      );

      await client.query("COMMIT");
    } catch (err: any) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true, message: "Account created successfully" });
  } catch (error: any) {
    console.error("Register invite error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
