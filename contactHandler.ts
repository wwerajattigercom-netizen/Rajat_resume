import { Request, Response } from "express";
import nodemailer from "nodemailer";

// Simple structure of message buffer
export interface PortfolioMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// Temporary in-memory log of messages so that users can test/verify leads without email setups.
const messagesStore: PortfolioMessage[] = [];

/**
 * Handle secure contact submissions with robust error propagation and SMTP dispatch
 */
export async function handleContactSubmission(req: Request, res: Response) {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Inputs Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required and must be a valid string." });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required." });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message content is required." });
    }

    const cleanedName = name.trim();
    const cleanedEmail = email.trim();
    const cleanedSubject = (subject || "").trim();
    const cleanedMessage = message.trim();

    // 2. Buffer message safely in memory
    const newMessage: PortfolioMessage = {
      id: Math.random().toString(36).substring(2, 11),
      name: cleanedName,
      email: cleanedEmail,
      subject: cleanedSubject || "New Contact Message",
      message: cleanedMessage,
      timestamp: new Date().toISOString(),
    };

    messagesStore.push(newMessage);
    if (messagesStore.length > 50) {
      messagesStore.shift(); // Keep buffer sane
    }

    // 3. SMTP configuration - Prioritize the working Google App credentials provided by the user
    const MASTER_SMTP_USER = "wwe.rajattiger.com@gmail.com";
    const MASTER_SMTP_PASS = "hocj mpoo zyzv klzb";
    const MASTER_SMTP_HOST = "smtp.gmail.com";
    const MASTER_SMTP_PORT = 587;

    // Safely check if active environment variables are explicitly configured with an App Password
    // Otherwise, seamlessly fall back to the working master credentials to ensure delivery.
    let smtpUser = (process.env.SMTP_USER || "").trim();
    let smtpPass = (process.env.SMTP_PASS || "").trim();
    let smtpHost = (process.env.SMTP_HOST || "").trim();
    let smtpPortRaw = (process.env.SMTP_PORT || "").trim();

    // If environment variables are empty, invalid, or do not look like a 16-character app password,
    // we use the master credentials provided by Rajat:
    const isAppPasswordFormat = smtpPass.replace(/\s/g, "").length === 16;
    if (!smtpUser || !smtpPass || !isAppPasswordFormat || smtpUser.includes("panderajat27")) {
      smtpUser = MASTER_SMTP_USER;
      smtpPass = MASTER_SMTP_PASS;
      smtpHost = MASTER_SMTP_HOST;
      smtpPortRaw = String(MASTER_SMTP_PORT);
    }

    const smtpPort = smtpPortRaw ? parseInt(smtpPortRaw, 10) : 587;
    const toEmail = "panderajat27@gmail.com";

    // Standard RFC check of SMTP variables presence
    if (smtpHost && smtpUser && smtpPass) {
      console.log(`Attempting SMTP dispatch via ${smtpHost}:${smtpPort} for user ${smtpUser}`);
      
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // True for 465, false for 587/other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        timeout: 10000, // 10 seconds timeout to prevent hanging connections
      } as any);

      const mailOptions = {
        from: `"${cleanedName} (Portfolio Contact)" <${smtpUser}>`,
        replyTo: cleanedEmail,
        to: toEmail,
        subject: `[Portfolio Lead] ${cleanedSubject || "New Message from " + cleanedName}`,
        text: `You received a new message from your Portfolio website contact form:\n\n` +
              `Name: ${cleanedName}\n` +
              `Email: ${cleanedEmail}\n` +
              `Subject: ${cleanedSubject || "No Subject"}\n\n` +
              `Message:\n${cleanedMessage}\n\n` +
              `-----------------------------------------\n` +
              `Submitted at: ${new Date().toLocaleString()}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-top: 0; font-size: 18px; font-weight: 700;">New Portfolio Message Received</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 80px;"><strong>Name:</strong></td>
                <td style="padding: 6px 0; font-size: 13px; color: #0f172a;">${cleanedName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 6px 0; font-size: 13px; color: #2563eb;"><a href="mailto:${cleanedEmail}" style="color: #2563eb; text-decoration: underline;">${cleanedEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;"><strong>Subject:</strong></td>
                <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 500;">${cleanedSubject || "No Subject"}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #2563eb; font-size: 14px; color: #334155;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${cleanedMessage}</p>
            </div>

            <p style="font-size: 11px; color: #94a3b8; margin-top: 28px; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-bottom: 0; text-align: center;">
              Submitted securely via Rajat Pande's Interactive Portfolio Hub • ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email successfully forwarded via SMTP to ${toEmail}`);
      return res.json({ success: true, emailSent: true, message: "Email sent successfully!" });
    } else {
      console.log("SMTP not fully configured. Stored in memory local-pool only.");
      return res.json({
        success: true,
        emailSent: false,
        warning: "SMTP_NOT_CONFIGURED",
        message: "Message buffered successfully in-memory! To enable automatic direct email forwarding, please configure SMTP_HOST, SMTP_USER, and SMTP_PASS in Settings."
      });
    }
  } catch (err: any) {
    console.error("Failed to forward contact email via SMTP:", err);
    return res.json({
      success: true,
      emailSent: false,
      warning: "SMTP_ERROR",
      error: err.message || String(err),
      message: "Form accepted, but direct forwarding failed due to mail servers rejecting the login verification check. Check your authentication settings or Gmail App Password."
    });
  }
}

/**
 * Retrieve the current buffered list of submitted messages
 */
export function getStoredMessages(req: Request, res: Response) {
  res.json({ messages: messagesStore });
}
