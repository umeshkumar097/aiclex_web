import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";
import { sendLeadEmails } from "@/lib/mail";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      whatsapp, 
      requirement, 
      source,
      city,
      service,
      source_page,
      utm_source,
      utm_medium,
      utm_campaign
    } = body;

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
      status: "new",
      city: city || null,
      service: service || null,
      source_page: source_page || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null
    });

    if (result.success) {
      // Trigger email alert with full tracking and attribution parameters
      await sendLeadEmails({
        name,
        email: email || "",
        phone: whatsapp,
        type: service || source,
        requirement,
        source_page: source_page || source,
        city: city || undefined,
        utm_source: utm_source || undefined,
        utm_medium: utm_medium || undefined,
        utm_campaign: utm_campaign || undefined
      } as any).catch(err => console.error("Email sending failed:", err));

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
    const city = searchParams.get("city") || "";
    const service = searchParams.get("service") || "";

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

    if (city) {
      query += ` AND city ILIKE $${counter}`;
      values.push(`%${city}%`);
      counter++;
    }

    if (service) {
      query += ` AND (service = $${counter} OR source = $${counter})`;
      values.push(service);
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

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();
    const { status, remarks, assigned_to } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const query = `
      UPDATE leads 
      SET status = $1, remarks = $2, assigned_to = $3
      WHERE id = $4
      RETURNING *
    `;
    
    const result = await pool.query(query, [status, remarks, assigned_to, id]);
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error("API Lead PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
