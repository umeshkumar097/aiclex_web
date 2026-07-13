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
  city?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}) => {
  const { 
    name, 
    email, 
    phone, 
    type, 
    requirement, 
    source_page,
    city,
    utm_source,
    utm_medium,
    utm_campaign
  } = leadData;

  // 1. Send Notification to Admin
  const adminMailOptions = {
    from: `"AICLEX System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || "info@aiclex.co.in",
    subject: `🚀 New Lead: ${name} (${city ? `${city} | ` : ''}${type})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f1f5f9;">
          <h2 style="color: #001341; margin: 0; font-size: 24px; font-weight: 800;">🚀 New Business Lead</h2>
          <p style="color: #64748b; font-size: 13px; margin: 5px 0 0 0; text-transform: uppercase; tracking-wider: 1px; font-weight: 700;">AICLEX™ Real-Time CRM pipeline</p>
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #0f172a; font-size: 16px; margin-bottom: 10px; border-left: 4px solid #5271ff; padding-left: 8px;">Lead Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; width: 35%; color: #64748b;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #5271ff; font-weight: 600;">${email || "N/A"}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Phone / WhatsApp:</strong></td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #16a34a; font-weight: 700;">${phone}</td></tr>
          </table>
        </div>

        <div style="margin-top: 20px;">
          <h3 style="color: #0f172a; font-size: 16px; margin-bottom: 10px; border-left: 4px solid #ff914d; padding-left: 8px;">Captured Location & Service</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; width: 35%; color: #64748b;"><strong>Service Category:</strong></td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${type}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Target City:</strong></td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600; text-transform: capitalize;">${city || "Global / General"}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Captured Page:</strong></td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #475569; font-family: monospace; font-size: 11px; word-break: break-all;">${source_page || "Direct"}</td></tr>
          </table>
        </div>

        ${(utm_source || utm_medium || utm_campaign) ? `
        <div style="margin-top: 20px; background-color: #f8fafc; padding: 15px; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <h3 style="color: #0f172a; font-size: 12px; margin: 0 0 10px 0; font-weight: 700; text-transform: uppercase; color: #001341;">Attribution Channels (UTM)</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${utm_source ? `<tr><td style="padding: 6px 0; color: #64748b; font-size: 13px;"><strong>UTM Source:</strong></td><td style="padding: 6px 0; color: #334155; font-size: 13px; font-weight: 600;">${utm_source}</td></tr>` : ''}
            ${utm_medium ? `<tr><td style="padding: 6px 0; color: #64748b; font-size: 13px;"><strong>UTM Medium:</strong></td><td style="padding: 6px 0; color: #334155; font-size: 13px; font-weight: 600;">${utm_medium}</td></tr>` : ''}
            ${utm_campaign ? `<tr><td style="padding: 6px 0; color: #64748b; font-size: 13px;"><strong>UTM Campaign:</strong></td><td style="padding: 6px 0; color: #334155; font-size: 13px; font-weight: 600;">${utm_campaign}</td></tr>` : ''}
          </table>
        </div>
        ` : ''}

        <div style="margin-top: 20px; background-color: #f1f5f9; padding: 15px; border-radius: 12px;">
          <strong style="color: #334155; font-size: 12px; display: block; margin-bottom: 5px; text-transform: uppercase;">Lead Requirement:</strong>
          <p style="margin: 0; color: #0f172a; font-size: 13px; font-style: italic; line-height: 1.5; font-weight: 500;">"${requirement || 'No detailed requirement provided.'}"</p>
        </div>

        <div style="margin-top: 25px; text-align: center; font-size: 11px; color: #94a3b8;">
          This notification was automatically sent by AICLEX™ lead attribution systems.
        </div>
      </div>
    `,
  };

  // 2. Send Confirmation to User
  const userMailOptions = {
    from: `"AICLEX™ Technologies" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Thank you for contacting AICLEX™ Technologies!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #001341;">Hello ${name},</h2>
        <p>Thank you for reaching out to **AICLEX Technologies**.</p>
        <p>We have received your inquiry regarding <strong>${type}</strong>. Our success manager will review your requirements and get back to you within 24 hours.</p>
        <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #555;"><strong>Your Requirement:</strong></p>
          <p style="margin: 5px 0; font-style: italic;">"${requirement}"</p>
        </div>
        <p>In the meantime, feel free to visit our website [aiclex.in](https://aiclex.in) or reply to this email for any urgent matters.</p>
        <br />
        <p>Best Regards,<br /><strong>AICLEX™ Technologies</strong><br /><span style="font-size:11px;color:#888;">A brand of Aiclex Solutions Pvt. Ltd.</span></p>
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

export const sendInvitationEmail = async (email: string, token: string, role: string) => {
  const inviteLink = `https://aiclex.in/join-team?token=${token}`;
  
  const mailOptions = {
    from: `"AICLEX™ Workspaces" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Invitation to join AICLEX as ${role.toUpperCase()}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f1f5f9;">
          <h2 style="color: #001341; margin: 0; font-size: 22px;">Join AICLEX Workspaces</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 5px;">Access Management Invitation</p>
        </div>
        <div style="margin-top: 25px;">
          <p style="font-size: 15px; color: #334155; line-height: 1.6;">Hello,</p>
          <p style="font-size: 15px; color: #334155; line-height: 1.6;">
            You have been invited to join the official **AICLEX™ Technologies** workspace with the role of **${role.toUpperCase()}**.
          </p>
          <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 30px;">
            To set up your account, choose your password, and access the admin dashboard, please click the button below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${inviteLink}" style="background-color: #001341; color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 19, 65, 0.15);">
              Accept Invitation & Join Team
            </a>
          </div>
          
          <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser: <br/>
            <a href="${inviteLink}" style="color: #5271ff; word-break: break-all;">${inviteLink}</a>
          </p>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            This invitation link is secure and will expire in 7 days. If you were not expecting this invite, please ignore this email.
          </p>
        </div>
        <div style="margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
          <strong>AICLEX™ Technologies</strong><br/>
          A brand of Aiclex Solutions Pvt. Ltd.
        </div>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};
