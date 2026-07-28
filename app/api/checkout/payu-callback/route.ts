import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";
import { generateInvoicePdf } from "@/lib/invoice-generator";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  try {
    // PayU sends a URL-encoded form POST
    const formData = await req.formData();

    const txnid       = formData.get("txnid") as string;
    const status      = formData.get("status") as string;
    const hash        = formData.get("hash") as string;
    const amount      = formData.get("amount") as string;
    const productinfo = formData.get("productinfo") as string;
    const firstname   = formData.get("firstname") as string;
    const email       = formData.get("email") as string;
    const additionalCharges = formData.get("additionalCharges") as string | null;

    const salt = process.env.PAYU_MERCHANT_SALT!;
    const key  = process.env.PAYU_MERCHANT_KEY!;

    // ─── Verify Response Hash ────────────────────────────────────────────────
    // PayU response hash (reverse of request hash):
    // sha512(additionalCharges|SALT|status|udf5|udf4|udf3|udf2|udf1|||||email|firstname|productinfo|amount|txnid|key)
    // = SALT|status + 10 pipes (5 empty udf reversed + 5 empty) + email
    const hashStr = additionalCharges
      ? `${additionalCharges}|${salt}|${status}||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`
      : `${salt}|${status}||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

    const expectedHash = crypto.createHash("sha512").update(hashStr).digest("hex");

    if (expectedHash !== hash) {
      console.error("PayU hash mismatch! Possible tampering.", { expected: expectedHash, received: hash });
      // Still redirect user to failure gracefully
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || "https://aiclex.in"}/pricing?error=Payment+Verification+Failed`, 302);
    }

    // ─── Handle Success ──────────────────────────────────────────────────────
    if (status === "success") {
      // txnid is our ORDER_xxx_xxx id that we stored as order_id
      await pool.query(
        `UPDATE subscriptions SET status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP WHERE order_id = $1 AND status != 'ACTIVE'`,
        [txnid]
      );

      const subResult = await pool.query(
        `SELECT * FROM subscriptions WHERE order_id = $1`,
        [txnid]
      );
      const sub = subResult.rows[0];

      if (sub) {
        // Check / create user account
        const userResult = await pool.query(
          `SELECT * FROM users WHERE email = $1`,
          [sub.customer_email]
        );
        let tempPassword: string | null = null;

        if (userResult.rows.length === 0) {
          tempPassword = Math.random().toString(36).slice(-8);
          const hash = await bcrypt.hash(tempPassword, 10);
          await pool.query(
            `INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, $5)`,
            [sub.customer_name, sub.customer_email, sub.customer_phone, hash, "client"]
          );
        }

        const invoiceDate = new Date(sub.created_at).toLocaleDateString("en-GB", {
          day: "2-digit", month: "short", year: "numeric",
        });

        // Generate paid invoice PDF
        const pdfBuffer = await generateInvoicePdf({
          invoice_number:  sub.invoice_number,
          invoice_date:    invoiceDate,
          due_date:        invoiceDate,
          status:          "ACTIVE",
          customer_name:   sub.customer_name,
          customer_gstin:  sub.customer_gstin,
          customer_phone:  sub.customer_phone,
          customer_email:  sub.customer_email,
          plan_name:       sub.plan_name,
          rate:            sub.amount,
          qty:             1,
          taxable_value:   sub.amount,
          tax_amount:      sub.gst_amount,
          total_amount:    sub.total_amount,
        });

        let emailHtml = `
          <h2>Payment Successful — ${sub.plan_name} is now Active!</h2>
          <p>Hi ${sub.customer_name},</p>
          <p>Your subscription for <strong>${sub.plan_name}</strong> is now <strong>ACTIVE</strong>.</p>
          <p>Order ID: ${txnid}</p>
          <p>Amount Paid: ₹${sub.total_amount}</p>
          <br/>
          <h3>Access Your Client Portal</h3>
          <p><a href="https://aiclex.in/signin">https://aiclex.in/signin</a></p>
        `;

        if (tempPassword) {
          emailHtml += `
            <div style="background:#f4f6f9;padding:15px;border-radius:8px;margin-top:20px;">
              <p>An account has been automatically created for you.</p>
              <p><strong>Email:</strong> ${sub.customer_email}</p>
              <p><strong>Temporary Password:</strong> <span style="font-family:monospace;font-size:18px;color:#5271ff;">${tempPassword}</span></p>
              <p><em>Please change this password after logging in.</em></p>
            </div>
          `;
        }

        await sendEmail({
          to:      sub.customer_email,
          subject: `Subscription Activated - ${sub.plan_name}`,
          html:    emailHtml,
          attachments: [{
            filename:    `${sub.invoice_number}.pdf`,
            content:     pdfBuffer,
            contentType: "application/pdf",
          }],
        });

        // Pabbly webhook for Zoom special plans
        if (
          sub.plan_slug === "zoom-coaches-plan" ||
          sub.plan_slug === "zoom-webinar-500" ||
          sub.plan_slug === "zoom-smart-coach-webinar-plus"
        ) {
          const pabblyPayload = {
            event:            "ZOOM_PAYMENT_SUCCESS",
            order_id:         txnid,
            customer_name:    sub.customer_name,
            customer_email:   sub.customer_email,
            customer_phone:   sub.customer_phone,
            customer_gstin:   sub.customer_gstin || "",
            plan_name:        sub.plan_name,
            plan_slug:        sub.plan_slug,
            amount_paid:      sub.total_amount,
            payment_status:   "ACTIVE",
            invoice_number:   sub.invoice_number,
            created_at:       new Date().toISOString(),
          };
          try {
            await fetch(
              "https://connect.pabbly.com/webhook-listener/webhook/IjU3NjYwNTZlMDYzNTA0MzI1MjZiIg_3D_3D_pc/IjU3NjcwNTY5MDYzNjA0MzE1MjZjNTUzNzUxMzEi_pc",
              { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pabblyPayload) }
            );
            await pool.query(
              `INSERT INTO webhook_logs (order_id, customer_email, plan_slug, payload, status) VALUES ($1,$2,$3,$4,$5)`,
              [txnid, sub.customer_email, sub.plan_slug, JSON.stringify(pabblyPayload), "SUCCESS"]
            );
          } catch {
            await pool.query(
              `INSERT INTO webhook_logs (order_id, customer_email, plan_slug, payload, status) VALUES ($1,$2,$3,$4,$5)`,
              [txnid, sub.customer_email, sub.plan_slug, JSON.stringify(pabblyPayload), "FAILED"]
            );
          }
        }
      }

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://aiclex.in"}/checkout/success?order_id=${txnid}`,
        302
      );
    }

    // ─── Handle Failure / Cancellation ──────────────────────────────────────
    await pool.query(
      `UPDATE subscriptions SET status = 'FAILED', updated_at = CURRENT_TIMESTAMP WHERE order_id = $1 AND status != 'FAILED'`,
      [txnid]
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://aiclex.in"}/pricing?error=Payment+Failed`,
      302
    );
  } catch (error) {
    console.error("PayU Callback Error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://aiclex.in"}/pricing?error=Server+Error`,
      302
    );
  }
}
