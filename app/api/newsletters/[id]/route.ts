import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const setClause = Object.keys(data).map((k, i) => k + " = $" + (i + 1)).join(", ");
    const vals = [...Object.values(data), id];
    
    const { rows } = await pool.query(
      "UPDATE newsletters SET " + setClause + " WHERE id = $" + vals.length + " RETURNING *",
      vals
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update newsletter" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await pool.query("DELETE FROM newsletters WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete newsletter" }, { status: 500 });
  }
}