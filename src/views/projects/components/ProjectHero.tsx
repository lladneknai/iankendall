import { Link } from "react-router-dom";
import LoadingBar from "@components/LoadingBar";
import {
  faFilter,
  faFilterCircleXmark,
  faFolderOpen,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProjectHero({
  isEditing,
  isFiltering,
  isListView,
  isLoading,
  isTreeShown,
  setIsEditing,
  setIsFiltering,
  setIsTreeVisible,
}: any) {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          <Link to="/projects">Projects</Link>
        </h1>

        {/* SUBHEADER / ACTION */}
        <div className="hero-action">
          {isListView && <p>Select a project to learn more.</p>}

          <div
            className={`hero-action--buttons ${isListView ? "list" : "detail"}`}
          >
            <button
              className={isFiltering ? "active" : ""}
              onClick={() => {
                setIsFiltering(!isFiltering);
                setIsTreeVisible(false);
              }}
              type="button"
            >
              <FontAwesomeIcon
                icon={isFiltering ? faFilterCircleXmark : faFilter}
              />
              {/* TODO: BUTTON TEXT (REFLECT # TOTAL FILTERS) */}
              <span className="btn-text">Filters</span>
            </button>

            <button
              className={isTreeShown ? "active" : ""}
              onClick={() => {
                setIsTreeVisible(!isTreeShown);
                setIsFiltering(false);
              }}
              type="button"
            >
              <FontAwesomeIcon icon={isTreeShown ? faFolderOpen : faFolder} />
              <span className="btn-text">View All</span>
            </button>
          </div>
        </div>

        {/* DEV ONLY - EDIT PROJECT */}
        {!isEditing && (
          <button
            id="EditProjectBtn"
            className="btn btn-edit"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit Project
          </button>
        )}
      </div>

      <LoadingBar isLoading={isLoading} />
    </div>
  );
}
