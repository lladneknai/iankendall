import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * SELECT PROJECT PANEL | Header
 * - Displays a close button for the panel
 * - Kept in its own component FOR NOW incase design changes.
 */
export default function PanelHeader({ setIsFiltering, setIsTreeVisible }: any) {
  return (
    <button
      className="hide-projects"
      onClick={() => {
        setIsFiltering(false);
        setIsTreeVisible(false);
      }}
      type="button"
    >
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
}
