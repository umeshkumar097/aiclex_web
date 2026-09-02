import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Helper function to verify admin authentication
function isAuthorizedAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("admin_token")?.value;
  return !!token;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
    }

    const query = `
      SELECT * FROM cob_submissions
      WHERE id::text = $1 OR submission_id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Submission record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error fetching single COB submission:", error);
    return NextResponse.json({ error: "Failed to fetch submission details" }, { status: 500 });
  }
}
