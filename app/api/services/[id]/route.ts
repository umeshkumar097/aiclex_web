import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, pricing, status, featured } = await req.json();
    const { rows } = await pool.query(
      "UPDATE services SET name = $1, pricing = $2, status = $3, featured = $4 WHERE id = $5 RETURNING *",
      [name, pricing, status, featured, id]
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await pool.query("DELETE FROM services WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
