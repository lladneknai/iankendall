import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppStore } from "@store/appStore";
import { useSendMessageStore } from "@store/sendMessageStore";
import useSendMessageDialog from "@hooks/useSendMessageDialog";
import MessageHasSent from "./components/MessageHasSent";
import MessageSendForm from "./components/MessageSendForm";
import MessageSendError from "./components/MessageSendError";
import MessageIsSending from "./components/MessageIsSending";

/**
 * SEND MESSAGE DIALOG
 * -------------------
 * - Drawer that allows the user to send a message
 * - Opens when the user clicks "Send Message" below the Typewriter
 */
export default function SendMessageDialog() {
  const dialogState = useSendMessageDialog();
  const { isSendingMessage } = useAppStore();
  const { handleCancelSend, sendProgress, setSendProgress } =
    useSendMessageStore();

  return (
    <div id="SendMessageDialog" className={!isSendingMessage ? "hidden" : ""}>
      <div className="content">
        {false ? ( // flip to 'true' to test out any part of the flow
          <MessageSendError
            handleFinish={dialogState.handleFinish}
            handleRetry={() => setSendProgress("preSend")}
          />
        ) : (
          <>
            {/* 
              STEP 1: enter CC (optional) and confirm send
              STEP 2: paper plane animation while sending
              STEP 3: successful send, present CTA
              ERROR:  provide error page and option to return to preSend
            */}
            {sendProgress === "preSend" && <MessageSendForm {...dialogState} />}
            {sendProgress === "isSending" && <MessageIsSending />}
            {sendProgress === "hasSent" && (
              <MessageHasSent handleFinish={dialogState.handleFinish} />
            )}
            {sendProgress === "error" && (
              <MessageSendError
                handleFinish={dialogState.handleFinish}
                handleRetry={() => setSendProgress("preSend")}
              />
            )}
          </>
        )}
      </div>

      {sendProgress && (
        <button id="CloseSendMessage" onClick={handleCancelSend} type="button">
          <FontAwesomeIcon icon={faClose} />
        </button>
      )}
    </div>
  );
}
