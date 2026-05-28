import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_SECRET = process.env.JWT_SECRET || "aiclex-secret-key-2024";

export async function POST(req: NextRequest) {
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

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Passwords are required" }, { status: 400 });
    }

    // Get user from DB
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [decoded.id]);
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
    }

    // Hash new password
    const hashedNew = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [hashedNew, user.id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Update password error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
