import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, requirement, source } = body;

    if (!name || !whatsapp || !requirement || !source) {
      return NextResponse.json(
        { error: "Missing required fields: name, whatsapp, requirement, source" },
        { status: 400 }
      );
    }

    const result = await saveLead({
      name,
      email,
      whatsapp,
      requirement,
      source,
      status: "new"
    });

    if (result.success) {
      return NextResponse.json({ success: true, id: result.id });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("API Lead Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
