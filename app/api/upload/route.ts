import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2. Create a unique filename with a folder prefix
    const uniqueName = `resumes/${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    // 3. Upload to Vercel Blob
    // Using { access: 'public' } so that the uploaded resumes can be viewed easily via the URL.
    const { url } = await put(uniqueName, file, { access: 'public' });

    // 4. Return the public URL
    return NextResponse.json({ url });

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
  }
}