import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// 1. DELETE FUNCTION
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // ✅ CHANGED: Table name is now 'posts'
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. UPDATE FUNCTION (PUT)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, slug, content, image_url } = await req.json();

    // ✅ CHANGED: Table name is now 'posts'
    const query = `
      UPDATE posts 
      SET title = $1, slug = $2, content = $3, image_url = $4 
      WHERE id = $5 
      RETURNING *
    `;
    
    const result = await pool.query(query, [title, slug, content, image_url, id]);
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}