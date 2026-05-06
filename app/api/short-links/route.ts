import { NextResponse } from 'next/server';
import pool from '@/lib/db';

async function ensureTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS short_links (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      target_url TEXT NOT NULL,
      clicks INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await ensureTableExists();
    const result = await pool.query('SELECT * FROM short_links ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const { slug, target_url } = await request.json();
    
    if (!slug || !target_url) {
      return NextResponse.json({ error: "Slug and Target URL are required" }, { status: 400 });
    }

    // Check if slug already exists
    const existing = await pool.query('SELECT id FROM short_links WHERE slug = $1', [slug]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const result = await pool.query(
      'INSERT INTO short_links (slug, target_url) VALUES ($1, $2) RETURNING *',
      [slug, target_url]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await pool.query('DELETE FROM short_links WHERE id = $1', [id]);
    return NextResponse.json({ message: "Link deleted successfully" });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
