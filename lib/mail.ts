import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendLeadEmails = async (leadData: {
  name: string;
  email: string;
  phone: string;
  type: string;
  requirement: string;
  source_page?: string;
}) => {
  const { name, email, phone, type, requirement, source_page } = leadData;

  // 1. Send Notification to Admin
  const adminMailOptions = {
    from: `"AICLEX System" <${process.env.SMTP_USER}>`,
    to: "info@aiclex.in",
    subject: `🚀 New Lead: ${name} (${type})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #001341;">New Lead Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${type}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Requirement:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${requirement}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">Source: ${source_page || "Direct"}</p>
      </div>
    `,
  };

  // 2. Send Confirmation to User
  const userMailOptions = {
    from: `"AICLEX Technologies" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Thank you for contacting AICLEX Technologies!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #001341;">Hello ${name},</h2>
        <p>Thank you for reaching out to **AICLEX Technologies**.</p>
        <p>We have received your inquiry regarding <strong>${type}</strong>. Our success manager will review your requirements and get back to you within 24 hours.</p>
        <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #555;"><strong>Your Requirement:</strong></p>
          <p style="margin: 5px 0; font-style: italic;">"${requirement}"</p>
        </div>
        <p>In the meantime, feel free to visit our website [www.aiclex.in](https://www.aiclex.in) or reply to this email for any urgent matters.</p>
        <br />
        <p>Best Regards,<br /><strong>The AICLEX Team</strong></p>
      </div>
    `,
  };

  try {
    // Send to admin
    await transporter.sendMail(adminMailOptions);
    console.log("✅ Admin notification email sent");

    // Send to user (if email provided)
    if (email && email.includes("@")) {
      await transporter.sendMail(userMailOptions);
      console.log("✅ User confirmation email sent");
    }
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    // We don't throw here to avoid failing the whole API request just because of email
  }
};
