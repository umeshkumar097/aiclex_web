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
    let { slug, target_url } = await request.json();
    
    if (target_url && !target_url.startsWith('http')) {
      target_url = `https://${target_url}`;
    }
    
    if (!slug || !target_url) {
      return NextResponse.json({ error: "Slug and Target URL are required" }, { status: 400 });
    }

    // Check if slug already exists (case-insensitive)
    const existing = await pool.query('SELECT id FROM short_links WHERE LOWER(slug) = LOWER($1)', [slug]);
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

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let { slug, target_url } = await request.json();
    
    if (target_url && !target_url.startsWith('http')) {
      target_url = `https://${target_url}`;
    }
    
    if (!id || !slug || !target_url) {
      return NextResponse.json({ error: "ID, Slug and Target URL are required" }, { status: 400 });
    }

    // Check if new slug already exists elsewhere (case-insensitive)
    const existing = await pool.query('SELECT id FROM short_links WHERE LOWER(slug) = LOWER($1) AND id != $2', [slug, id]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const result = await pool.query(
      'UPDATE short_links SET slug = $1, target_url = $2 WHERE id = $3 RETURNING *',
      [slug, target_url, id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
