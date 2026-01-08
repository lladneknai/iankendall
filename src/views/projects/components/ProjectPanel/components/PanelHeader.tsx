import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * SELECT PROJECT PANEL | Header
 * - Display hide / show buttons and filters
 */
export default function PanelHeader({ setIsFiltering, setIsTreeVisible }: any) {
  return (
    <>
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
      {/*       
      <div className="project-filter-actions">
        <Link to="/projects">
          <FontAwesomeIcon icon={faReplyAll} /> All Projects
        </Link>
      </div> */}
    </>
  );
}
