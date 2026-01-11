import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MessageSendFormMobile({
  // email,
  emailError,
  submissionError,
  // handleEmailChange,
  // handleEmailBlur,
  handleCancel,
  handleSendMessage,
}: {
  email: string;
  emailError: string;
  submissionError: string;
  handleCancel: () => void;
  handleEmailChange: (value: string) => void;
  handleEmailBlur: () => void;
  handleSendMessage: (e?: React.FormEvent) => Promise<void>;
}) {
  const isSubmitDisabled = !!emailError;

  return (
    <>
      <h1>Ready to Send?</h1>
      <form onSubmit={handleSendMessage}>
        {submissionError && <p className="error-message">{submissionError}</p>}
        <div className="actions send-form">
          <button type="button" onClick={handleCancel}>
            Cancel
            <FontAwesomeIcon icon={faClose} />
          </button>
          <button type="submit" disabled={isSubmitDisabled}>
            Send Message
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </>
  );
}
