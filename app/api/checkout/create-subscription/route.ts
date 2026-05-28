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

const PLANS: Record<string, { name: string, price: number }> = {
  "whatspilot-starter": { name: "WhatsPilot Starter", price: 1599 },
  "whatspilot-business": { name: "WhatsPilot Business Pro", price: 3999 },
  "zoom-pro-basic": { name: "Zoom Pro Basic", price: 11200 },
  "zoom-coaches-plan": { name: "Zoom Coaches Plan", price: 50000 },
  "zoom-business": { name: "Zoom Business", price: 18500 },
};

export async function POST(req: NextRequest) {
  try {
    const { planSlug, customerName, customerEmail, customerPhone, customerGst } = await req.json();

    const plan = PLANS[planSlug];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const basePrice = plan.price;
    const gstAmount = basePrice * 0.18;
    const totalAmount = basePrice + gstAmount;

    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const request = {
      order_amount: totalAmount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        customer_name: customerName,
      },
      order_meta: {
        return_url: `https://aiclex.in/checkout/success?order_id=${orderId}`,
        notify_url: `https://aiclex.in/api/checkout/webhook`,
        payment_methods: "cc,dc,ccc,upi,nb,app,emi,paylater"
      },
      order_note: `${plan.name} Subscription${customerGst ? ' - GST: ' + customerGst : ''}`
    };

    // Create Order with Cashfree
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    const orderData = response.data;

    if (!orderData || !orderData.payment_session_id) {
      throw new Error("Failed to create Cashfree order");
    }

    // Save to database
    await pool.query(
      `INSERT INTO subscriptions 
      (order_id, plan_slug, plan_name, amount, gst_amount, total_amount, customer_name, customer_email, customer_phone, customer_gstin, payment_session_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [orderId, planSlug, plan.name, basePrice, gstAmount, totalAmount, customerName, customerEmail, customerPhone, customerGst || null, orderData.payment_session_id]
    );

    return NextResponse.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderId,
      environment: process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" ? "production" : "sandbox"
    });
  } catch (error: any) {
    console.error("Cashfree Order Error:", error?.response?.data || error.message);
    return NextResponse.json({ error: "Could not initialize payment. Please try again." }, { status: 500 });
  }
}
