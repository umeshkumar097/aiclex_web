import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, role, bio, linkedin, twitter, email, image_url } = await req.json();
    
    const query = `
      INSERT INTO team_members (name, role, bio, linkedin, twitter, email, image_url, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [name, role, bio, linkedin, twitter, email, image_url]);
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // ✅ CHANGED: 'DESC' -> 'ASC' (Oldest first, Newest last)
    const result = await pool.query('SELECT * FROM team_members ORDER BY created_at ASC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}