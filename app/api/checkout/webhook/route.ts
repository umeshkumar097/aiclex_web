import { NextRequest, NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";
import { Pool } from "pg";

Cashfree.XClientId = process.env.CASHFREE_APP_ID!;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!;
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" 
  ? Cashfree.Environment.PRODUCTION 
  : Cashfree.Environment.SANDBOX;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature") || "";
    const timestamp = req.headers.get("x-webhook-timestamp") || "";

    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch (e) {
      // Ignore JSON parse errors for empty test pings
    }

    // Bypass signature for Cashfree's dashboard "Test" ping
    if (payload && payload.type === "TEST") {
      return NextResponse.json({ status: "OK", message: "Test successful" });
    }

    try {
      Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      // For test pings from dashboard, sometimes signature fails. We still return 200 to satisfy the UI,
      // but we don't process the database update.
      return NextResponse.json({ error: "Invalid Signature but acknowledged" }, { status: 200 });
    }

    // Process PAYMENT_SUCCESS
    if (payload && payload.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const orderId = payload.data.order.order_id;
      
      await pool.query(
        `UPDATE subscriptions 
         SET status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP
         WHERE order_id = $1`,
        [orderId]
      );
      
      console.log(`Order ${orderId} marked as ACTIVE via webhook.`);
    }

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
