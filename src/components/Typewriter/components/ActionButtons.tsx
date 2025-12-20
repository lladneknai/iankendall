import { MIN_SEND_LENGTH } from "@/config/typing";
import useExitingElement from "@hooks/useExitingElement";
import { useSendMessageStore } from "@/store/sendMessageStore";
import { useAppStore } from "@/store/appStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faArrowsRotate, faCode } from "@fortawesome/free-solid-svg-icons";

/**
 * TYPEWRITER | Action Buttons
 * ---------------------------
 * - #SendMessageButton
 *   - Displayed when auto-typing is complete
 *   - Allows user to send their message to a recipient
 *
 * - #ResetButton
 *   - Reset the typewriter to its initial state
 *
 * - #SourceCodeButton
 *   - Pop open the source code window
 */

export default function ActionButtons({
  handleDismissTip,
  isAutoTyping,
  text,
}: {
  handleDismissTip: () => void;
  isAutoTyping: boolean;
  text: string;
}) {
  const { handleRequestSendMessage, handleViewCode, sendProgress } =
    useSendMessageStore();

  // Couple dev switches in here
  const isDev = import.meta.env.MODE === "development";

  const requestTypewriterReset = useAppStore((s) => s.requestTypewriterReset);

  // Handle send message: dismiss tip and send message
  const handleSendClick = () => {
    handleDismissTip(); // Dismiss the "send" tip
    handleRequestSendMessage(text);
  };

  // Disable "Reset"
  const isResetDisabled = isAutoTyping || text.length === 0;

  // Disable the "Send Message" button until the user has typed enough.
  const isSendDisabled = isAutoTyping || text.length <= MIN_SEND_LENGTH;

  // Manage element actually exiting from the DOM.
  const { className, shouldRender } = useExitingElement(!!sendProgress);
  if (!shouldRender) {
    return null;
  }

  return (
    <div id="ActionButtonContainer" className={className}>
      <button
        id="SendMessageButton"
        disabled={!isDev && isSendDisabled}
        onClick={handleSendClick}
        type="button"
      >
        Send Message
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
      <button id="SourceCodeButton" onClick={handleViewCode} type="button">
        View Source Code
        <FontAwesomeIcon icon={faCode} />
      </button>
      <button
        id="ResetButton"
        disabled={isResetDisabled}
        onClick={requestTypewriterReset}
        type="button"
      >
        Reset Typewriter
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
}
