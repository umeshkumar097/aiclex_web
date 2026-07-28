import { NextRequest, NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";
import { Pool } from "pg";

Cashfree.XClientId = process.env.CASHFREE_APP_ID!;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!;
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
  ? Cashfree.Environment.PRODUCTION
  : Cashfree.Environment.SANDBOX;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("order_id");
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // ── Step 1: Always check our own database first ───────────────────────────
    // This handles BOTH Cashfree and PayU payments — PayU callback already
    // sets status = 'ACTIVE' or 'FAILED' in DB before redirecting here.
    const dbResult = await pool.query(
      `SELECT status, plan_slug, plan_name, customer_name, customer_email, total_amount
       FROM subscriptions WHERE order_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [orderId]
    );

    if (dbResult.rows.length > 0) {
      const sub = dbResult.rows[0];

      if (sub.status === "ACTIVE") {
        return NextResponse.json({
          status: "SUCCESS",
          plan_name:      sub.plan_name,
          customer_name:  sub.customer_name,
          customer_email: sub.customer_email,
          total_amount:   sub.total_amount,
        });
      }

      if (sub.status === "FAILED") {
        return NextResponse.json({ status: "FAILED" });
      }

      // Status is PENDING — for PayU orders the callback hasn't arrived yet.
      // For Cashfree orders, double-check with Cashfree API below.
    }

    // ── Step 2: Cashfree live-check for PENDING orders ────────────────────────
    // Only applicable for Cashfree orders (PayU callback handles its own status).
    try {
      const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
      const payments = response.data;

      if (payments && payments.length > 0) {
        const successfulPayment = payments.find((p: any) => p.payment_status === "SUCCESS");
        if (successfulPayment) {
          await pool.query(
            `UPDATE subscriptions SET status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP
             WHERE order_id = $1 AND status != 'ACTIVE'`,
            [orderId]
          );
          return NextResponse.json({ status: "SUCCESS" });
        }

        const pendingPayment = payments.find((p: any) => p.payment_status === "PENDING");
        if (pendingPayment) {
          return NextResponse.json({ status: "PENDING" });
        }

        // All payments failed
        await pool.query(
          `UPDATE subscriptions SET status = 'FAILED', updated_at = CURRENT_TIMESTAMP
           WHERE order_id = $1 AND status != 'FAILED'`,
          [orderId]
        );
        return NextResponse.json({ status: "FAILED" });
      }
    } catch {
      // Cashfree API will throw if the order is a PayU order (not found in Cashfree).
      // That is fine — we already checked DB above. Fall through to PENDING.
    }

    // ── Step 3: Fallback — return PENDING (user can retry) ────────────────────
    return NextResponse.json({ status: "PENDING" });

  } catch (error: any) {
    console.error("Order verification error:", error?.response?.data || error.message);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
