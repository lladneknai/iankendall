import { useState, useEffect } from "react";
import { useAppStore } from "@/store/appStore";
import { useSendMessageStore } from "@/store/sendMessageStore";

/**
 * USE SEND MESSAGE DIALOG
 * -----------------------
 * - Manage SendMessageDialog component logic
 * - Handles all form state, validation, and submission logic
 * - Reads message text from the appStore, clearing after send is complete.
 */
export default function useSendMessageDialog() {
  const { savedMessage, setSavedMessage, setIsSendingMessage } = useAppStore();
  const setSendProgress = useSendMessageStore((s) => s.setSendProgress);
  const requestTypewriterReset = useAppStore((s) => s.requestTypewriterReset);

  // Form state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  //
  // EMAIL VALIDATION
  // Email is optional, but if provided, must be valid
  //
  const validateEmail = (emailValue: string): string => {
    if (!emailValue || emailValue.trim() === "") {
      return "";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!hasAttemptedSubmit) {
      setEmailError("");
    } else {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  //
  // FORM SUBMISSION
  //
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setHasAttemptedSubmit(true);

    // Validate email before sending
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setSendProgress("isSending");
    setSubmissionError("");

    try {
      const response = await fetch("/api/messages/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: savedMessage,
          ccEmail: email || null,
          recipientEmail: "iankendall17@gmail.com",
        }),
      });

      if (!response.ok) {
        setSendProgress("error");
        console.log("[useSendMessageDialog] ERROR SENDING MESSAGE:", response);
        return;
      }

      setSendProgress("hasSent");

      // Clear the saved message after successful send
      setSavedMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmissionError("Failed to send message. Please try again.");
      setSendProgress("error");
    }
  };

  //
  // HANDLE FINISHING (after message sent)
  //
  const handleFinish = () => {
    // Reset all form state
    setEmail("");
    setEmailError("");
    setSubmissionError("");
    setHasAttemptedSubmit(false);
    setSendProgress("");
    // Close dialog and reactivate typewriter
    setIsSendingMessage(false);
    requestTypewriterReset();
  };

  //
  // RESET FORM STATE when dialog closes
  //
  useEffect(() => {
    // If savedMessage is cleared externally (cancel/reset), reset form
    if (!savedMessage) {
      setEmail("");
      setEmailError("");
      setSubmissionError("");
      setHasAttemptedSubmit(false);
    }
  }, [savedMessage]);

  return {
    // State
    email,
    emailError,
    submissionError,
    savedMessage,

    // Actions
    handleEmailChange,
    handleEmailBlur,
    handleSendMessage,
    handleFinish,
  };
}
