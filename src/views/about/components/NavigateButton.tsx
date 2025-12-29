import { handleSmoothScroll } from "@util/dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function NavigateButton({
  direction,
  scrollTo,
  text,
}: {
  direction: string;
  scrollTo: string;
  text: string;
}) {
  return (
    <div
      className={`navigate-button ${direction}`}
      onClick={() => handleSmoothScroll(scrollTo)}
    >
      {direction === "up" && (
        <div className="svg-container">
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      )}

      <span className="navigate-btn">{text}</span>

      {direction === "down" && (
        <div className="svg-container">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      )}
    </div>
  );
}
