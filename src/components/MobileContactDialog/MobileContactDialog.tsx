import { useEffect } from "react";
import { TypewriterFlowProps } from "@shared";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSendMessageStore } from "@store/sendMessageStore";
import useSendMessageDialog from "@hooks/useSendMessageDialog";
import MessageHasSent from "@components/SendMessageDialog/components/MessageHasSent";
import MessageSendFormMobile from "./components/MessageSendFormMobile";
import MessageCreationForm from "./components/MessageCreationForm";
import MessageSendError from "@components/SendMessageDialog/components/MessageSendError";
import MessageIsSending from "@components/SendMessageDialog/components/MessageIsSending";

export default function MobileContactDialog({
  isAutoTyping,
  progress,
  setProgress,
  setText,
  suggestionText,
  text,
  typeBlock,
}: TypewriterFlowProps) {
  const dialogState = useSendMessageDialog();
  const { handleCancelSend, sendProgress, setSendProgress } =
    useSendMessageStore();

  const handleCancelMobile = () => {
    setSendProgress("create");
  };

  // const sendProgress = "preSend";

  useEffect(() => {
    setSendProgress("create");
  }, []);

  const gotoPreSend = () => setSendProgress("preSend");

  return (
    <div id="SendMessageDialog" className={isAutoTyping ? "is-typing" : ""}>
      <div className={`dialog-content dialog-content--${sendProgress}`}>
        {/* 
              STEP 0: type aht the mad libs
              STEP 1: enter CC (optional) and confirm send
              STEP 2: paper plane animation while sending
              STEP 3: successful send, present CTA
              ERROR:  provide error page and option to return to preSend
            */}
        {sendProgress === "create" && (
          <MessageCreationForm
            text={text}
            setText={setText}
            isAutoTyping={isAutoTyping}
            onFinish={gotoPreSend}
            progress={progress}
            suggestionText={suggestionText}
            setProgress={setProgress}
            typeBlock={typeBlock}
          />
        )}
        {sendProgress === "preSend" && (
          <MessageSendFormMobile
            {...dialogState}
            handleCancel={handleCancelMobile}
          />
        )}
        {sendProgress === "isSending" && <MessageIsSending />}
        {sendProgress === "hasSent" && (
          <MessageHasSent handleFinish={dialogState.handleFinish} />
        )}
        {sendProgress === "error" && (
          <MessageSendError
            handleFinish={dialogState.handleFinish}
            handleRetry={gotoPreSend}
          />
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
