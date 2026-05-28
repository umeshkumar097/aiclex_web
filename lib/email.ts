import nodemailer from "nodemailer";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Configure standard SMTP using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE === "true" || true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  let status = "FAILED";
  let errorMessage = null;

  try {
    const info = await transporter.sendMail({
      from: `"Aiclex Support" <${process.env.SMTP_USER || "support@aiclex.in"}>`,
      to,
      subject,
      html,
    });
    
    status = "SUCCESS";
    console.log("Email sent successfully: ", info.messageId);
    return true;
  } catch (error: any) {
    status = "FAILED";
    errorMessage = error.message;
    console.error("Error sending email: ", error);
    return false;
  } finally {
    // Always log the email attempt to the database
    try {
      await pool.query(
        `INSERT INTO email_logs (recipient, subject, status, error_message) VALUES ($1, $2, $3, $4)`,
        [to, subject, status, errorMessage]
      );
    } catch (logError) {
      console.error("Failed to log email into database: ", logError);
    }
  }
}
