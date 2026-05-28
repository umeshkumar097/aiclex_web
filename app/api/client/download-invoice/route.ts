import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import jwt from "jsonwebtoken";
import { generateInvoicePdf } from "@/lib/invoice-generator";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_SECRET = process.env.JWT_SECRET || "aiclex-secret-key-2024";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const url = new URL(req.url);
    const orderId = url.searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    // Get subscription and ensure it belongs to this user
    const { rows } = await pool.query(
      `SELECT s.* FROM subscriptions s
       JOIN users u ON u.email = s.customer_email
       WHERE s.order_id = $1 AND u.id = $2`,
      [orderId, decoded.id]
    );

    const sub = rows[0];

    if (!sub) {
      return NextResponse.json({ error: "Invoice not found or unauthorized" }, { status: 404 });
    }

    const invoiceDate = new Date(sub.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const pdfBuffer = await generateInvoicePdf({
      invoice_number: sub.invoice_number || `INV-DUMMY`,
      invoice_date: invoiceDate,
      due_date: invoiceDate,
      status: sub.status === 'ACTIVE' ? 'ACTIVE' : 'PENDING',
      payment_link: sub.payment_link,
      customer_name: sub.customer_name,
      customer_gstin: sub.customer_gstin,
      customer_phone: sub.customer_phone,
      customer_email: sub.customer_email,
      plan_name: sub.plan_name,
      rate: sub.amount,
      qty: 1,
      taxable_value: sub.amount,
      tax_amount: sub.gst_amount,
      total_amount: sub.total_amount
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${sub.invoice_number || 'invoice'}.pdf"`
      }
    });
  } catch (error: any) {
    console.error("Download invoice error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
}
