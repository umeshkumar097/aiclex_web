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

    try {
      Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    
    // Process PAYMENT_SUCCESS
    if (payload.type === "PAYMENT_SUCCESS_WEBHOOK") {
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
