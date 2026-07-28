import { NextRequest, NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";
import { Pool } from "pg";
import { generateInvoicePdf } from "@/lib/invoice-generator";
import { sendEmail } from "@/lib/email";
import bcrypt from "bcryptjs";
import crypto from "crypto";

Cashfree.XClientId = process.env.CASHFREE_APP_ID!;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!;
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" 
  ? Cashfree.Environment.PRODUCTION 
  : Cashfree.Environment.SANDBOX;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const PLANS: Record<string, { name: string, price: number }> = {
  "test-monthly": { name: "Test Subscription Plan", price: 50 },
  "whatspilot-starter": { name: "WhatsPilot Starter", price: 1599 },
  "whatspilot-business": { name: "WhatsPilot Business Pro", price: 3999 },
  "siteboard-annual": { name: "Siteboard Developer Pro", price: 100000 },
  "zoom-pro-basic": { name: "Zoom Pro Basic", price: 11200 },
  "zoom-coaches-plan": { name: "Zoom Coaches Plan", price: 50000 },
  "zoom-business": { name: "Zoom Business", price: 18500 },
  "zoom-webinar-500": { name: "Zoom Webinar Plan", price: 70000 },
  "zoom-smart-coach-webinar-plus": { name: "Smart Coach Webinar Plus", price: 90000 },
};

export async function POST(req: NextRequest) {
  try {
    const { planSlug, customerName, customerEmail, customerPhone, customerGst, quantity, gateway } = await req.json();
    const selectedGateway: "cashfree" | "payu" = gateway === "payu" ? "payu" : "cashfree";

    const plan = PLANS[planSlug];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const qty = quantity ? parseInt(quantity, 10) : 1;
    const basePrice = plan.price * qty;
    const gstAmount = basePrice * 0.18;
    const totalAmount = basePrice + gstAmount;
    const planNameWithQty = qty > 1 ? `${plan.name} (x${qty})` : plan.name;

    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // ── PayU Branch ─────────────────────────────────────────────────────────
    if (selectedGateway === "payu") {
      const payuKey  = process.env.PAYU_MERCHANT_KEY!;
      const payuSalt = process.env.PAYU_MERCHANT_SALT!;
      const payuEnv  = process.env.PAYU_ENVIRONMENT === "PRODUCTION" ? "PRODUCTION" : "TEST";
      const payuActionUrl = payuEnv === "PRODUCTION"
        ? "https://secure.payu.in/_payment"
        : "https://test.payu.in/_payment";

      // Hash formula (OFFICIAL PayU): sha512(key|txnid|amount|productinfo|firstname|email|||||||||||SALT)
      // email ke baad exactly 11 pipes (udf1..udf5 empty + 6 more empty fields)
      const amountStr = totalAmount.toFixed(2);
      const hashInput = `${payuKey}|${orderId}|${amountStr}|${planNameWithQty}|${customerName}|${customerEmail}|||||||||||${payuSalt}`;
      const payuHash  = crypto.createHash("sha512").update(hashInput).digest("hex");

      // Insert subscription row BEFORE redirecting
      const { rows: insertedSub } = await pool.query(
        `INSERT INTO subscriptions 
        (order_id, plan_slug, plan_name, amount, gst_amount, total_amount, customer_name, customer_email, customer_phone, customer_gstin, payment_session_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
        [orderId, planSlug, planNameWithQty, basePrice, gstAmount, totalAmount, customerName, customerEmail, customerPhone, customerGst || null, orderId]
      );
      const subId = insertedSub[0].id;
      const invoiceNumber = `INV-${1000 + parseInt(subId)}`;
      const invoiceDate   = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const paymentLink   = payuActionUrl;

      // User creation
      const { rows: existingUser } = await pool.query("SELECT * FROM users WHERE email = $1", [customerEmail]);
      let tempPassword: string | null = null;
      if (existingUser.length === 0) {
        tempPassword = Math.random().toString(36).slice(-8);
        const hashedPw = await bcrypt.hash(tempPassword, 10);
        await pool.query(
          "INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1,$2,$3,$4,$5)",
          [customerName, customerEmail, customerPhone, hashedPw, "client"]
        );
      }

      await pool.query(
        `UPDATE subscriptions SET invoice_number = $1, payment_link = $2 WHERE id = $3`,
        [invoiceNumber, paymentLink, subId]
      );

      // Proforma invoice email
      const pdfBuffer = await generateInvoicePdf({
        invoice_number: invoiceNumber, invoice_date: invoiceDate, due_date: invoiceDate,
        status: "PENDING", payment_link: paymentLink,
        customer_name: customerName, customer_gstin: customerGst, customer_phone: customerPhone, customer_email: customerEmail,
        plan_name: plan.name, rate: basePrice, qty: 1, taxable_value: basePrice, tax_amount: gstAmount, total_amount: totalAmount,
      });

      const emailBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
          <h2>Order Received: Action Required</h2>
          <p>Hi ${customerName},</p>
          <p>Thank you for initiating the purchase of <strong>${plan.name}</strong>.</p>
          <p>Your payment is being processed via PayU. Once completed, your subscription will be activated automatically.</p>
          ${tempPassword ? `
          <div style="background:#f4f6f9;padding:15px;border-radius:8px;margin-top:20px;">
            <h3 style="margin-top:0;">Your Client Portal Account</h3>
            <p><strong>Login URL:</strong> <a href="https://aiclex.in/signin">aiclex.in/signin</a><br>
            <strong>Email:</strong> ${customerEmail}<br>
            <strong>Temporary Password:</strong> ${tempPassword}</p>
            <p style="font-size:12px;color:#666;">Please change this password after logging in.</p>
          </div>` : ""}
          <p>Proforma invoice is attached for your records.</p>
          <p>Best regards,<br><strong>AICLEX™ Technologies</strong></p>
        </div>
      `;

      await sendEmail({
        to: customerEmail,
        subject: `Order Received: ${plan.name} (Invoice ${invoiceNumber})`,
        html: emailBody,
        attachments: [{ filename: `${invoiceNumber}.pdf`, content: pdfBuffer, contentType: "application/pdf" }],
      });

      return NextResponse.json({
        gateway: "payu",
        payu_params: {
          key:         payuKey,
          txnid:       orderId,
          amount:      amountStr,
          productinfo: planNameWithQty,
          firstname:   customerName,
          email:       customerEmail,
          phone:       customerPhone,
          surl:        `https://aiclex.in/api/checkout/payu-callback`,
          furl:        `https://aiclex.in/api/checkout/payu-callback`,
          hash:        payuHash,
          udf1:        "", udf2: "", udf3: "", udf4: "", udf5: "",
        },
        payu_action_url: payuActionUrl,
      });
    }

    // ── Cashfree Branch ──────────────────────────────────────────────────────
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
      order_note: `${planNameWithQty} Subscription${customerGst ? " - GST: " + customerGst : ""}`
    };

    // Create Order with Cashfree
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    const orderData = response.data;

    if (!orderData || !orderData.payment_session_id) {
      throw new Error("Failed to create Cashfree order");
    }

    // Insert to database first to get sequential ID
    const { rows: insertedSub } = await pool.query(
      `INSERT INTO subscriptions 
      (order_id, plan_slug, plan_name, amount, gst_amount, total_amount, customer_name, customer_email, customer_phone, customer_gstin, payment_session_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [orderId, planSlug, planNameWithQty, basePrice, gstAmount, totalAmount, customerName, customerEmail, customerPhone, customerGst || null, orderData.payment_session_id]
    );

    const subId = insertedSub[0].id;
    
    // Generate Sequential Invoice Number based on Database ID
    const invoiceNumber = `INV-${1000 + parseInt(subId)}`;
    const envString = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" ? "production" : "sandbox";
    const paymentLink = `https://aiclex.in/checkout/pay?session_id=${orderData.payment_session_id}&env=${envString}`;
    const invoiceDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Handle User Creation if they drop
    const { rows: existingUser } = await pool.query('SELECT * FROM users WHERE email = $1', [customerEmail]);
    let tempPassword = null;
    let userId;
    
    if (existingUser.length === 0) {
      tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const { rows: newUser } = await pool.query(
        'INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [customerName, customerEmail, customerPhone, hashedPassword, 'client']
      );
      userId = newUser[0].id;
    } else {
      userId = existingUser[0].id;
    }

    // Update subscription with generated invoice number and payment link
    await pool.query(
      `UPDATE subscriptions SET invoice_number = $1, payment_link = $2 WHERE id = $3`,
      [invoiceNumber, paymentLink, subId]
    );

    // Generate PDF Invoice (DUE)
    const pdfBuffer = await generateInvoicePdf({
      invoice_number: invoiceNumber,
      invoice_date: invoiceDate,
      due_date: invoiceDate,
      status: 'PENDING',
      payment_link: paymentLink,
      customer_name: customerName,
      customer_gstin: customerGst,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      plan_name: plan.name,
      rate: basePrice,
      qty: 1,
      taxable_value: basePrice,
      tax_amount: gstAmount,
      total_amount: totalAmount
    });

    // Send the Drop / Proforma Email immediately
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Order Received: Action Required</h2>
        <p>Hi ${customerName},</p>
        <p>Thank you for initiating the purchase of <strong>${plan.name}</strong>.</p>
        <p>If you haven't completed your payment yet, you can do so safely using the link below:</p>
        <p><a href="${paymentLink}" style="display:inline-block; padding:10px 20px; background:#001341; color:#fff; text-decoration:none; font-weight:bold; border-radius:5px;">Pay Securely via Cashfree</a></p>
        
        ${tempPassword ? `
        <div style="background:#f4f6f9; padding:15px; border-radius:8px; margin-top:20px;">
          <h3 style="margin-top:0;">Your Client Portal Account</h3>
          <p>We have created an account for you to track your subscriptions and download invoices.</p>
          <p><strong>Login URL:</strong> <a href="https://aiclex.in/signin">aiclex.in/signin</a><br>
          <strong>Email:</strong> ${customerEmail}<br>
          <strong>Temporary Password:</strong> ${tempPassword}</p>
          <p style="font-size:12px; color:#666;">Please change this password after logging in.</p>
        </div>` : ''}

        <p>We have attached the Proforma Invoice (DUE) for your records.</p>
        <p>Best regards,<br><strong>AICLEX™ Technologies</strong><br><span style="font-size:11px;color:#888;">A brand of Aiclex Solutions Pvt. Ltd.</span></p>
      </div>
    `;

    await sendEmail({
      to: customerEmail, 
      subject: `Order Received: ${plan.name} (Invoice ${invoiceNumber})`, 
      html: emailBody,
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    return NextResponse.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderId,
      environment: process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" ? "production" : "sandbox"
    });
  } catch (error: any) {
    console.error("Payment Order Error:", error?.response?.data || error.message);
    const errorMessage = error?.response?.data?.message || "Could not initialize payment. Please try again.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
