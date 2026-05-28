import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM services ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, pricing, status, featured } = await req.json();
    const { rows } = await pool.query(
      "INSERT INTO services (name, pricing, status, featured) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, pricing, status || 'active', featured || false]
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}