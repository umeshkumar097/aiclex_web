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

export async function GET(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("order_id");
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Check with Cashfree API
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    
    // PGOrderFetchPayments returns an array of payments for the order
    const payments = response.data;
    
    if (!payments || payments.length === 0) {
      return NextResponse.json({ status: "PENDING" });
    }

    // Look for a successful payment
    const successfulPayment = payments.find(p => p.payment_status === "SUCCESS");
    if (successfulPayment) {
      // Update DB if not already updated by webhook
      await pool.query(
        `UPDATE subscriptions SET status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP WHERE order_id = $1 AND status != 'ACTIVE'`,
        [orderId]
      );
      
      // Get the plan slug to return for the dashboard link if needed, but not necessary right now
      return NextResponse.json({ status: "SUCCESS" });
    }

    // Check if any payment is pending
    const pendingPayment = payments.find(p => p.payment_status === "PENDING");
    if (pendingPayment) {
      return NextResponse.json({ status: "PENDING" });
    }

    // Otherwise it's failed
    await pool.query(
      `UPDATE subscriptions SET status = 'FAILED', updated_at = CURRENT_TIMESTAMP WHERE order_id = $1 AND status != 'FAILED'`,
      [orderId]
    );

    return NextResponse.json({ status: "FAILED" });

  } catch (error: any) {
    console.error("Order verification error:", error?.response?.data || error.message);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
