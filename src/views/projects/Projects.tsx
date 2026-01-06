import useProjects from "@hooks/useProjects";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";
import ProjectEditor from "./components/ProjectEditor";
import ProjectError from "./components/ProjectError";
import ProjectHero from "./components/ProjectHero";
import SelectProjectPanel from "./components/SelectProjectPanel";

/**
 * PROJECTS ROUTE
 * --------------
 * - /projects = List view of all projects
 * - /projects/:key = Detail view of specific project
 */
const Projects = () => {
  const {
    methods: {
      onSave,
      selectProject,
      setIsEditing,
      setIsFiltering,
      setIsTreeVisible,
    },
    state: {
      currentProject,
      error,
      isEditing,
      isFiltering,
      isLoading,
      isListView,
      isTreeShown,
      projectList,
      projectsOrganized,
      selectedKey,
    },
  } = useProjects();

  return (
    <div id="Projects" className="page">
      <ProjectHero
        isTreeShown={isTreeShown}
        isListView={isListView}
        isLoading={isLoading}
        projectList={projectList}
        projectsOrganized={projectsOrganized}
        selectedKey={selectedKey}
        selectProject={selectProject}
        setIsTreeVisible={setIsTreeVisible}
      />

      <div className={`page-content${isLoading ? " loading" : ""}`}>
        {error ? (
          <ProjectError error={error} />
        ) : /****************
              PROJECT EDITOR
             ****************/
        isEditing && currentProject ? (
          <ProjectEditor
            onSave={onSave}
            project={currentProject}
            setIsEditing={setIsEditing}
          />
        ) : (
          /**********************
            STANDARD PAGE CONTENT    
           ***********************/
          <>
            <ContentLeft
              isListView={isListView}
              isLoading={isLoading}
              project={currentProject}
              projectsOrganized={projectsOrganized}
              selectProject={selectProject}
            />
            <ContentRight
              isFiltering={isFiltering}
              isListView={isListView}
              isLoading={isLoading}
              project={currentProject}
            />
            <SelectProjectPanel
              isFiltering={isFiltering}
              isTreeShown={isTreeShown}
              projectsOrganized={projectsOrganized}
              selectedKey={selectedKey}
              selectProject={selectProject}
              setIsFiltering={setIsFiltering}
              setIsTreeVisible={setIsTreeVisible}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
