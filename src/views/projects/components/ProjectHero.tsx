import LoadingBar from "@components/LoadingBar";
import { useSearchParams } from "react-router-dom";
import {
  faFilter,
  faFilterCircleXmark,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function ProjectHero({
  backToList,
  filters,
  isEditing,
  isFiltering,
  isListView,
  isLoading,
  isTreeShown,
  setIsEditing,
  setIsFiltering,
  setIsTreeVisible,
}: any) {
  const [_, setSearchParams] = useSearchParams();
  const clearFilters = () => setSearchParams({});

  const numFilters = Object.values(filters).filter(
    (f: any) => f.length > 0
  ).length;
  const isFilterApplied = numFilters > 0;

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 onClick={backToList}>Projects</h1>

        {/* SUBHEADER / ACTION */}
        <div className="hero-action">
          {isListView && <p>Select a project to learn more.</p>}

          <div
            className={`hero-action--buttons ${isListView ? "list" : "detail"}`}
          >
            {/* FILTERS BUTTON */}
            <button
              id="hero-view-filters"
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
              <span className="btn-text">
                Filters{isFilterApplied ? ` (${numFilters})` : ""}
              </span>
            </button>

            {/* CLEAR FILTERS BUTTON */}
            {isFilterApplied && (
              <button
                id="hero-clear-filters"
                onClick={clearFilters}
                type="button"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
                <span className="btn-text">Clear Filters</span>
              </button>
            )}

            {/* VIEW TREE BUTTON */}
            <button
              id="hero-view-tree"
              className={isTreeShown ? "active" : ""}
              onClick={() => {
                setIsTreeVisible(!isTreeShown);
                setIsFiltering(false);
              }}
              type="button"
            >
              <FontAwesomeIcon icon={isTreeShown ? faFolderOpen : faFolder} />
              <span className="btn-text">
                {isFilterApplied ? "View Matches" : "View All"}
              </span>
            </button>
          </div>
        </div>

        {/* DEV ONLY - EDIT PROJECT */}
        {!isListView && !isEditing && (
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
