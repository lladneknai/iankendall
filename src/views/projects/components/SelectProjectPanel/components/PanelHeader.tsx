import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectFilters from "../../shared/ProjectFilters";

/**
 * SELECT PROJECT PANEL | Header
 * - Display hide / show buttons and filters
 */
export default function PanelHeader({
  isFiltering,
  setIsFiltering,
  setIsTreeVisible,
}: any) {
  return (
    <>
      <button
        className="hide-projects"
        onClick={() => setIsTreeVisible(false)}
        type="button"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>

      <div
        className={`project-filter-container${isFiltering ? "" : " hidden"}`}
      >
        <button
          className="project-filter-button"
          onClick={() => setIsFiltering(!isFiltering)}
        >
          <FontAwesomeIcon icon={faFilter} />
          {isFiltering ? "Collapse..." : "Filters..."}
        </button>

        <ProjectFilters />
      </div>
    </>
  );
}
