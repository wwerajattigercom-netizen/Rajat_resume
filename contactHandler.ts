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
  let resendErrorDetail: string | null = null;
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

    // Check if the configured host looks like it is Google/Gmail
    const isGmailService = smtpHost.toLowerCase().includes("gmail") || smtpUser.toLowerCase().endsWith("@gmail.com");

    // Only force fallback to MASTER if user has not provided SMTP_USER/SMTP_PASS,
    // OR if they provided a Gmail address but did not provide a valid 16-char app password format:
    const isAppPasswordFormat = smtpPass.replace(/\s/g, "").length === 16;
    const shouldFallbackToMaster = !smtpUser || !smtpPass || (isGmailService && !isAppPasswordFormat) || smtpUser.includes("panderajat27");

    if (shouldFallbackToMaster) {
      smtpUser = MASTER_SMTP_USER;
      smtpPass = MASTER_SMTP_PASS;
      smtpHost = MASTER_SMTP_HOST;
      smtpPortRaw = String(MASTER_SMTP_PORT);
    }

    const smtpPort = smtpPortRaw ? parseInt(smtpPortRaw, 10) : 587;
    const toEmail = (process.env.TO_EMAIL || "panderajat27@gmail.com").trim();

    const emailHtml = `
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
    `;

    const emailSubject = `[Portfolio Lead] ${cleanedSubject || "New Message from " + cleanedName}`;
    const emailText = `You received a new message from your Portfolio website contact form:\n\n` +
          `Name: ${cleanedName}\n` +
          `Email: ${cleanedEmail}\n` +
          `Subject: ${cleanedSubject || "No Subject"}\n\n` +
          `Message:\n${cleanedMessage}\n\n` +
          `-----------------------------------------\n` +
          `Submitted at: ${new Date().toLocaleString()}`;


    // A. Check for HTTP REST-based Resend API first.
    // HTTP bypasses ALL outbound firewall / port 465 / port 587 blocking on Render Free Tiers seamlessly. 
    const resendApiKey = (process.env.RESEND_API_KEY || "").trim();
    if (resendApiKey) {
      console.log("RESEND_API_KEY detected. Utilizing premium HTTP REST API to dispatch message (bypassing SMTP port filters)...");
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Rajat Portfolio <onboarding@resend.dev>",
            to: toEmail,
            reply_to: cleanedEmail,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
          }),
        });

        if (response.ok) {
          const resJson = await response.json();
          console.log("Resend HTTP API transmission succeeded! Email delivered. ID:", resJson.id);
          return res.json({ success: true, emailSent: true, message: "Email sent successfully via Resend HTTP REST API!" });
        } else {
          const errMsg = await response.text();
          resendErrorDetail = `Resend HTTP API error (Status ${response.status}): ${errMsg}`;
          console.error(resendErrorDetail);
        }
      } catch (httpErr: any) {
        resendErrorDetail = `Resend HTTP Fetch connection error: ${httpErr.message || String(httpErr)}`;
        console.error("Resend HTTP API failed, falling back to SMTP cascade tries:", httpErr);
      }
    }

    // B. Standard SMTP check of variables presence
    if (smtpHost && smtpUser && smtpPass) {
      console.log(`Attempting cascading SMTP dispatch for user ${smtpUser}`);

      const mailOptions = {
        from: `"${cleanedName} (Portfolio Contact)" <${smtpUser}>`,
        replyTo: cleanedEmail,
        to: toEmail,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      };

      let emailSent = false;
      let lastError: any = null;

      // Attempt 1: Contact standard Gmail service helper (if Gmail domain or gmail host is specified)
      if (smtpHost.toLowerCase().includes("gmail") || smtpUser.toLowerCase().endsWith("@gmail.com")) {
        try {
          console.log("SMTP Attempt 1: Standard 'gmail' helper...");
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 10000,
          });
          await transporter.sendMail(mailOptions);
          emailSent = true;
          console.log("SMTP Attempt 1 (gmail helper) Succeeded!");
        } catch (err1) {
          console.warn("SMTP Attempt 1 (gmail helper) Failed:", err1);
          lastError = err1;
        }
      }

      // Attempt 2: Precise custom port transmission (e.g. standard fallback Port 2525, 80, 8080, etc.)
      // This is highly recommended to bypass general cloud outbound blocks on standard mail ports!
      if (!emailSent) {
        try {
          console.log(`SMTP Attempt 2: Target host ${smtpHost} over specified Port ${smtpPort}...`);
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // True ONLY if standard SSL port 465 is explicitly requested
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
            connectionTimeout: 8500,
            greetingTimeout: 8500,
            socketTimeout: 10500,
          } as any);
          await transporter.sendMail(mailOptions);
          emailSent = true;
          console.log(`SMTP Attempt 2 (Port ${smtpPort}) Succeeded!`);
        } catch (err2) {
          console.warn(`SMTP Attempt 2 (Port ${smtpPort}) Failed:`, err2);
          lastError = err2;
        }
      }

      // Attempt 3: Outbound SMTP over standard SSL Port 465 (fallback)
      if (!emailSent && smtpPort !== 465) {
        try {
          console.log(`SMTP Attempt 3: Outbound to ${smtpHost} over default SSL Port 465...`);
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: 465,
            secure: true,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 10000,
          } as any);
          await transporter.sendMail(mailOptions);
          emailSent = true;
          console.log("SMTP Attempt 3 (Port 465 SSL Fallback) Succeeded!");
        } catch (err3) {
          console.warn("SMTP Attempt 3 (Port 465 SSL Fallback) Failed:", err3);
          lastError = err3;
        }
      }

      // Attempt 4: Outbound SMTP over STARTTLS Port 587 (fallback)
      if (!emailSent && smtpPort !== 587) {
        try {
          console.log(`SMTP Attempt 4: Outbound to ${smtpHost} over STARTTLS Port 587...`);
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: 587,
            secure: false, // TLS on 587 is STARTTLS
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 10050,
          } as any);
          await transporter.sendMail(mailOptions);
          emailSent = true;
          console.log("SMTP Attempt 4 (Port 587 STARTTLS Fallback) Succeeded!");
        } catch (err4) {
          console.warn("SMTP Attempt 4 (Port 587 STARTTLS Fallback) Failed:", err4);
          lastError = err4;
        }
      }

      if (emailSent) {
        console.log(`Email successfully forwarded via SMTP to ${toEmail}`);
        return res.json({ success: true, emailSent: true, message: "Email sent successfully!" });
      } else {
        throw lastError || new Error("All cascading SMTP delivery attempts (including custom configurations) timed out or failed on Render network.");
      }
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
    console.error("Failed to forward contact email:", err);
    let errorDetail = err.message || String(err);
    if (resendErrorDetail) {
      errorDetail = `[Resend Fail: ${resendErrorDetail}] [SMTP Timeout: ${errorDetail}]`;
    }
    let customMsg = "Note: Render Free tiers block outbound SMTP ports (25, 465, 587) causing connection timeouts. An HTTP-based API like Resend is required. Please verify that your configured RESEND_API_KEY is a real Resend Key (starts with 're_'); the key in your settings starts with 'rnd_' which is a Render platform token instead. Note that Resend's free tier restricts sending only to the email that registered the Resend account. To deliver mail successfully, set the TO_EMAIL environment variable on Render to your Resend account's email address.";
    return res.json({
      success: true,
      emailSent: false,
      warning: "SMTP_ERROR",
      error: errorDetail,
      message: customMsg
    });
  }
}

/**
 * Retrieve the current buffered list of submitted messages
 */
export function getStoredMessages(req: Request, res: Response) {
  res.json({ messages: messagesStore });
}
