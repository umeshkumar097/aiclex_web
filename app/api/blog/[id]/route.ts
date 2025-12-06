import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// 1. DELETE FUNCTION
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Delete the post with this specific ID
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    
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
    const { title, slug, content, image } = await req.json();

    // Update the specific row with new data
    const query = `
      UPDATE posts 
      SET title = $1, slug = $2, content = $3, image_url = $4 
      WHERE id = $5 
      RETURNING *
    `;
    
    await pool.query(query, [title, slug, content, image, id]);
    
    return NextResponse.json({ message: "Updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}