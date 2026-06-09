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

import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";
import { generateInvoicePdf } from "@/lib/invoice-generator";

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

    if (payload && payload.type === "TEST") {
      return NextResponse.json({ status: "OK", message: "Test successful" });
    }

    try {
      Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid Signature but acknowledged" }, { status: 200 });
    }

    if (payload && payload.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const orderId = payload.data.order.order_id;
      
      // Update Subscription
      await pool.query(
        `UPDATE subscriptions 
         SET status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP
         WHERE order_id = $1`,
        [orderId]
      );
      
      // Fetch subscription details
      const subResult = await pool.query(`SELECT * FROM subscriptions WHERE order_id = $1`, [orderId]);
      const sub = subResult.rows[0];

      if (sub) {
        // Check if user exists
        const userResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [sub.customer_email]);
        let user = userResult.rows[0];
        let tempPassword = null;

        if (!user) {
          // Generate temp password
          tempPassword = Math.random().toString(36).slice(-8);
          const hash = await bcrypt.hash(tempPassword, 10);
          
          const newUserResult = await pool.query(
            `INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [sub.customer_name, sub.customer_email, sub.customer_phone, hash, 'client']
          );
          user = newUserResult.rows[0];
        }

        // Send Email
        const loginUrl = 'https://aiclex.in/signin';
        let emailHtml = `
          <h2>Thank you for your purchase, ${sub.customer_name}!</h2>
          <p>Your subscription for <strong>${sub.plan_name}</strong> is now ACTIVE.</p>
          <p>Order ID: ${orderId}</p>
          <p>Amount Paid: ₹${sub.total_amount}</p>
          <br/>
          <h3>Access Your Client Portal</h3>
          <p>You can access your client portal to manage your services and view subscriptions here: <a href="${loginUrl}">${loginUrl}</a></p>
        `;

        if (tempPassword) {
          emailHtml += `
            <div style="background: #f4f6f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p>An account has been automatically created for you.</p>
              <p><strong>Email:</strong> ${sub.customer_email}</p>
              <p><strong>Temporary Password:</strong> <span style="font-family: monospace; font-size: 18px; color: #5271ff;">${tempPassword}</span></p>
              <p><em>Please change this password after logging in for the first time.</em></p>
            </div>
          `;
        }

        const invoiceDate = new Date(sub.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        
        // Generate PAID PDF
        const pdfBuffer = await generateInvoicePdf({
          invoice_number: sub.invoice_number,
          invoice_date: invoiceDate,
          due_date: invoiceDate,
          status: 'ACTIVE',
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

        await sendEmail({
          to: sub.customer_email,
          subject: `Subscription Activated - ${sub.plan_name}`,
          html: emailHtml,
          attachments: [
            {
              filename: `${sub.invoice_number}.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf'
            }
          ]
        });

        // --- Pabbly Webhook for Zoom Payments ---
        if (sub.plan_slug && sub.plan_slug.toLowerCase().includes('zoom')) {
          try {
            await fetch("https://connect.pabbly.com/webhook-listener/webhook/IjU3NjYwNTZlMDYzNTA0MzI1MjZiIg_3D_3D_pc/IjU3NjcwNTY5MDYzNjA0MzE1MjZjNTUzNzUxMzEi_pc", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event: "ZOOM_PAYMENT_SUCCESS",
                order_id: orderId,
                customer_name: sub.customer_name,
                customer_email: sub.customer_email,
                customer_phone: sub.customer_phone,
                customer_gstin: sub.customer_gstin || "",
                plan_name: sub.plan_name,
                plan_slug: sub.plan_slug,
                amount_paid: sub.total_amount,
                payment_status: "ACTIVE",
                invoice_number: sub.invoice_number,
                created_at: new Date().toISOString()
              })
            });
            console.log(`Successfully fired Pabbly webhook for Zoom order ${orderId}`);
          } catch (webhookErr) {
            console.error("Failed to fire Pabbly webhook:", webhookErr);
          }
        }
      }
      
      console.log(`Order ${orderId} marked as ACTIVE via webhook.`);
    }

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
