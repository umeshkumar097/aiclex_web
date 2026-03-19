import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import pool from "@/lib/db";

// Configure Cloudflare R2 Client
const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const job_id = formData.get("job_id");
    const full_name = formData.get("full_name");
    const email = formData.get("email");
    const message = formData.get("message");
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }

    // 1. Upload Resume to Cloudflare R2 (Private prefix)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueKey = `resumes/${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    await R2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: uniqueKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // 2. Save to Database
    // Note: We store the 'Key' instead of a public URL for privacy/security
    const result = await pool.query(
      `INSERT INTO job_applications (job_id, full_name, email, resume_url, message) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [job_id, full_name, email, uniqueKey, message]
    );

    return NextResponse.json({ success: true, application: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT ja.*, j.title as job_title 
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       ORDER BY ja.applied_at DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
