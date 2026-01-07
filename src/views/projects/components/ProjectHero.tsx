import { Link } from "react-router-dom";
import LoadingBar from "@components/LoadingBar";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectSelect from "./ProjectSelect";

export default function ProjectHero({
  isEditing,
  isListView,
  isLoading,
  isTreeShown,
  projectList,
  projectsOrganized,
  selectedKey,
  selectProject,
  setIsEditing,
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
          {isListView || isTreeShown ? (
            <p>Select a project to learn more.</p>
          ) : (
            <button onClick={() => setIsTreeVisible(true)} type="button">
              <FontAwesomeIcon icon={faFolderOpen} />
              View All Projects
            </button>
          )}
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

        {/* MOBILE-ONLY SELECT */}
        <ProjectSelect
          selectedKey={selectedKey}
          projectList={projectList}
          projectsOrganized={projectsOrganized}
          selectProject={selectProject}
        />
      </div>

      <LoadingBar isLoading={isLoading} />
    </div>
  );
}
