import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { title, slug, content, image } = await req.json();
    
    // Insert data into your new table
    const query = `
      INSERT INTO posts (title, slug, content, image_url) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    
    await pool.query(query, [title, slug, content, image]);
    
    return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get all posts, newest first
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}