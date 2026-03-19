import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// 1. Configure Cloudflare R2 Client
const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${(process.env.R2_ACCOUNT_ID || "").trim()}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: (process.env.R2_ACCESS_KEY_ID || "").trim(),
    secretAccessKey: (process.env.R2_SECRET_ACCESS_KEY || "").trim(),
  },
});

export async function POST(req: NextRequest) {
  try {
    // 2. Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Convert file to buffer for upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Create a unique filename
    const uniqueName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    // 5. Upload to Cloudflare R2
    await R2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: uniqueName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // 6. Return the public URL
    // NOTE: R2_PUBLIC_URL should be your custom domain or the R2.dev URL
    const url = `${process.env.R2_PUBLIC_URL}/${uniqueName}`;
    
    return NextResponse.json({ url });

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
  }
}