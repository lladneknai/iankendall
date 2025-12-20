import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { TypingTipsProps } from "@shared";

export default function TypingTips({
  handleDismissTip,
  paperStyles: { right, top },
  tipText,
}: TypingTipsProps) {
  return (
    <div
      id="TypingTips"
      className={tipText ? "shown" : "hidden"}
      style={{
        // Always positioned above the paper
        // Just reuse the styles with modified px
        right: right - 37,
        top: top - 50,
      }}
    >
      <p>{tipText}</p>
      <button type="button" onClick={handleDismissTip}>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
}
