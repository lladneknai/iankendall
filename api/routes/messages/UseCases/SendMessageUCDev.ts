import type { Response } from "express";
import type { SendMessageRequest } from "@shared";
import { DEV_MOCK_DELAY_MS } from "api/config";

/**
 * Dev mode handler for SendMessageUC
 * Returns true if handled (dev mode), false if not (production)
 */
export default async function SendMessageUCDev(
  { message, ccEmail, recipientEmail }: SendMessageRequest,
  res: Response
): Promise<void> {
  console.log("[DEV MODE] Mocking email send response with 2s delay:");
  console.log("  To:", recipientEmail);
  console.log("  CC:", ccEmail || "(none)");
  console.log("  Message:", message.substring(0, 100) + "...");

  await new Promise((resolve) => setTimeout(resolve, DEV_MOCK_DELAY_MS));

  res.json({
    status: "ok",
    message: "Email sent successfully (DEV MODE - not actually sent)",
    data: { recipientEmail, ccEmail },
  });
}
