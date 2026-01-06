import { Link } from "react-router-dom";
import LoadingBar from "@components/LoadingBar";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectSelect from "./ProjectSelect";

export default function ProjectHero({
  isListView,
  isLoading,
  isTreeShown,
  setIsTreeVisible,
  projectsOrganized,
  selectedKey,
  selectProject,
  projectList,
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
            <h6>Select a project to learn more.</h6>
          ) : (
            <button onClick={() => setIsTreeVisible(true)} type="button">
              <FontAwesomeIcon icon={faFolderOpen} />
              View All Projects
            </button>
          )}
        </div>

        {/* MOBILE-ONLY SELECT */}
        <ProjectSelect
          selectedKey={selectedKey}
          projectList={projectList}
          projectsOrganized={projectsOrganized}
          selectProject={selectProject}
        />
      </div>

      {/* TODO: move this into the select component? */}
      <LoadingBar isLoading={isLoading} />
    </div>
  );
}
