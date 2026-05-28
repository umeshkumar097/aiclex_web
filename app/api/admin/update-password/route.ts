import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, currentPassword, newPassword } = await req.json();

    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Verify current password
    const { rows } = await pool.query(
      "SELECT * FROM admin_users WHERE username = $1 AND password = $2",
      [username, currentPassword]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Invalid current username or password" }, { status: 401 });
    }

    // Update to new password
    await pool.query(
      "UPDATE admin_users SET password = $1 WHERE id = $2",
      [newPassword, rows[0].id]
    );

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
