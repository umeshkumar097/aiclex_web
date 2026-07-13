import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

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
    const { userId, name, email, phone, role } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (name !== undefined || email !== undefined || phone !== undefined || role !== undefined) {
      const fields: string[] = [];
      const values: any[] = [];
      let counter = 1;

      if (name !== undefined) {
        fields.push(`name = $${counter++}`);
        values.push(name);
      }
      if (email !== undefined) {
        fields.push(`email = $${counter++}`);
        values.push(email);
      }
      if (phone !== undefined) {
        fields.push(`phone = $${counter++}`);
        values.push(phone);
      }
      if (role !== undefined) {
        fields.push(`role = $${counter++}`);
        values.push(role);
      }

      values.push(userId);
      const queryText = `UPDATE users SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = $${counter}`;
      await pool.query(queryText, values);
    }

    return NextResponse.json({ success: true, message: "User details updated successfully" });
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
