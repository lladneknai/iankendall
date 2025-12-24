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
  const handleScrollClick = () => {
    console.log("scrolling TO:", scrollTo);
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`navigate-button ${direction}`} onClick={handleScrollClick}>
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
