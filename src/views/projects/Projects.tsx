import LoadingBar from "@components/LoadingBar";
import useProjects from "@hooks/useProjects";
import ProjectSelect from "./components/ProjectSelect";
import ProjectContent from "./components/ProjectContent";
import ProjectFileTree from "./components/ProjectFileTree";

/**
 * PROJECTS ROUTE
 * --------------
 * - A showcase of projects I've worked on throughout my career
 * - Data-driven via AMPT cloud storage and custom CMS (see ProjectEditor)
 *
 * - Components:
 *  - ProjectNav      | choose a project -> DESKTOP ONLY
 *  - ProjectSelect   | choose a project -> MOBILE ONLY
 *  - ProjectContent  | details of the selected project
 */
const Projects = () => {
  const {
    methods: { onSave, setId, selectProjectMobile, setIsEditing },
    state: {
      error,
      id,
      isEditing,
      isLoading,
      project,
      projects,
      projectsOrganized,
    },
  } = useProjects();

  return (
    <div id="Projects" className="page">
      <div className="hero">
        <div className="hero-content">
          <h1>Projects</h1>
          {/* Hot reload */}
          <h6>Select a project to learn more.</h6>
          <ProjectSelect
            id={id}
            projects={projects}
            projectsOrganized={projectsOrganized}
            selectProjectMobile={selectProjectMobile}
          />
        </div>
        <LoadingBar isLoading={isLoading} />
      </div>

      <div className={`page-content${isLoading ? " loading" : ""}`}>
        {error && <h1>Error Loading Projects. Try again.</h1>}
        {!error && (
          <>
            <ProjectFileTree
              id={id}
              projectsOrganized={projectsOrganized}
              setId={setId}
            />
            <ProjectContent
              isEditing={isEditing}
              onSave={onSave}
              project={project}
              setIsEditing={setIsEditing}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
