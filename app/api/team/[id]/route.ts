import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await pool.query('DELETE FROM team_members WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, role, bio, linkedin, twitter, email, image_url } = await req.json();

    const query = `
      UPDATE team_members 
      SET name = $1, role = $2, bio = $3, linkedin = $4, twitter = $5, email = $6, image_url = $7 
      WHERE id = $8 
      RETURNING *
    `;
    
    const result = await pool.query(query, [name, role, bio, linkedin, twitter, email, image_url, id]);
    
    if (result.rowCount === 0) return NextResponse.json({ error: "Member not found" }, { status: 404 });
    
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}