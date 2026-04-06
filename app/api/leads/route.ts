import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";
import pool from "@/lib/db";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "";
    const phone = searchParams.get("phone") || "";
    const date = searchParams.get("date") || "";
    const source = searchParams.get("source") || "";

    let query = "SELECT * FROM leads WHERE 1=1";
    const values: any[] = [];
    let counter = 1;

    if (name) {
      query += ` AND name ILIKE $${counter}`;
      values.push(`%${name}%`);
      counter++;
    }

    if (phone) {
      query += ` AND whatsapp ILIKE $${counter}`;
      values.push(`%${phone}%`);
      counter++;
    }

    if (source) {
      query += ` AND source = $${counter}`;
      values.push(source);
      counter++;
    }

    if (date) {
      query += ` AND created_at::date = $${counter}`;
      values.push(date);
      counter++;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("API Lead GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
