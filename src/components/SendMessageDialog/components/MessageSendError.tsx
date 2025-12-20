import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function MessageSendError({
  handleFinish,
  handleRetry,
}: {
  handleFinish: () => void;
  handleRetry: () => void;
}) {
  return (
    <>
      <h1>Whoops!</h1>
      <div className="post-send-text">
        <p>Something went wrong sending your message...</p>
      </div>
      <div className="flex row gap-1">
        <button onClick={handleRetry} type="button">
          <FontAwesomeIcon icon={faArrowLeft} className="try-again-icon" />
          Try Again
        </button>
        <button onClick={handleFinish} type="button">
          I&rsquo;m Finished
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
        </button>
      </div>
    </>
  );
}
