import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { title, slug, content, image_url } = await req.json();
    
    // ✅ CHANGED: Table name is now 'posts' to match your existing data
    const query = `
      INSERT INTO posts (title, slug, content, image_url, created_at) 
      VALUES ($1, $2, $3, $4, NOW()) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [title, slug, content, image_url]);
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // ✅ CHANGED: Table name is now 'posts'
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}