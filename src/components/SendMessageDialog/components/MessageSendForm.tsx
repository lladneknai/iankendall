import { useSendMessageStore } from "@/store/sendMessageStore";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MessageSendForm({
  email,
  emailError,
  submissionError,
  handleEmailChange,
  handleEmailBlur,
  handleSendMessage,
}: {
  email: string;
  emailError: string;
  submissionError: string;
  handleEmailChange: (value: string) => void;
  handleEmailBlur: () => void;
  handleSendMessage: (e?: React.FormEvent) => Promise<void>;
}) {
  const handleCancelSend = useSendMessageStore((s) => s.handleCancelSend);
  const isSubmitDisabled = !!emailError;

  return (
    <>
      <h1>Ready to Send?</h1>

      <form onSubmit={handleSendMessage}>
        {submissionError && <p className="error-message">{submissionError}</p>}
        <label htmlFor="email" className={emailError ? "error" : ""}>
          {emailError || "Enter an email address for CC (optional)"}
        </label>
        <input
          autoComplete="email"
          id="email"
          name="email"
          type="email"
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={handleEmailBlur}
          placeholder="your-email@example.com"
          value={email}
        />
        <div className="actions send-form">
          <button type="submit" disabled={isSubmitDisabled}>
            Send Message
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          <button type="button" onClick={handleCancelSend}>
            Never Mind
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </form>
    </>
  );
}
