import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Verify admin session token
function isAuthorizedAdmin(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "").trim() || req.cookies.get("admin_token")?.value;
  if (!token || token.length < 10) return false;
  return true;
}

// Safe ID validator — only allow alphanumeric, dash, underscore
function sanitizeId(val: any): string | null {
  if (!val) return null;
  const str = String(val).trim();
  // Allow: digits, letters, dashes, underscores — nothing else (blocks SQL, XSS, path traversal)
  if (!/^[a-zA-Z0-9_\-]{1,50}$/.test(str)) return null;
  return str;
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
    const safeId = sanitizeId(resolvedParams.id);

    if (!safeId) {
      return NextResponse.json({ error: "Invalid or missing submission ID." }, { status: 400 });
    }

    // Fully parameterized — no user value is interpolated into the SQL string
    const result = await pool.query(
      `SELECT * FROM cob_submissions WHERE id::text = $1 OR submission_id = $1 LIMIT 1`,
      [safeId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Submission record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    // Never expose internal error messages
    console.error("[COB Submission Detail] Error:", error);
    return NextResponse.json({ error: "Failed to fetch submission details" }, { status: 500 });
  }
}
