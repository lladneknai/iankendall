import type { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import type { SendMessageRequest } from "@shared";
import { EMAIL_SERVICE, EMAIL_SUBJECT } from "api/config";
import SendMessageUCDev from "./SendMessageUCDev";

/**
 * MESSAGES | Send Message
 */
export default async function SendMessageUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { message, ccEmail, recipientEmail } = req.body as SendMessageRequest;

  if (!message || !recipientEmail) {
    res.status(400).json({
      error: "Missing required fields: message and recipientEmail are required",
    });
    return;
  }

  // DEV-ONLY: Don't actually send the message.
  if (process.env.NODE_ENV === "development") {
    return SendMessageUCDev({ message, ccEmail, recipientEmail }, res);
  }

  // Get email credentials from environment variables
  const MY_ADDRESS = process.env.EMAIL_ADDRESS;
  const MY_PASSWORD = process.env.EMAIL_PASSWORD;

  if (!MY_ADDRESS || !MY_PASSWORD) {
    res.status(500).json({
      error: "Server configuration error: Email credentials not set",
    });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: MY_ADDRESS,
        pass: MY_PASSWORD,
      },
    });

    const formattedMessage = message.replace(/\n/g, "<br>");

    const html = `
      <h3>New Message from iankendall.me Typewriter</h3>
      <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #333; margin: 20px 0;">
        ${formattedMessage}
      </div>
      ${ccEmail ? `<p><em>CC'd to: ${ccEmail}</em></p>` : ""}
    `;

    const mailOptions = {
      from: MY_ADDRESS,
      to: recipientEmail,
      cc: ccEmail || undefined,
      subject: EMAIL_SUBJECT,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    res.json({
      status: "ok",
      message: "Email sent successfully",
      data: { recipientEmail, ccEmail },
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
