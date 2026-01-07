import useProjects from "@hooks/useProjects";
import ProjectHero from "./components/ProjectHero";
import ProjectError from "./components/ProjectError";
import ProjectEditor from "./components/ProjectEditor";
import ProjectContent from "./components/ProjectContent";
import ProjectSidebar from "./components/ProjectSidebar";
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
        isEditing={isEditing}
        isListView={isListView}
        isLoading={isLoading}
        isTreeShown={isTreeShown}
        projectList={projectList}
        projectsOrganized={projectsOrganized}
        selectedKey={selectedKey}
        selectProject={selectProject}
        setIsEditing={setIsEditing}
        setIsTreeVisible={setIsTreeVisible}
      />

      <div className={`content${isLoading ? " loading" : ""}`}>
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
            <ProjectContent
              currentProject={currentProject}
              isFiltering={isFiltering}
              isListView={isListView}
              isLoading={isLoading}
              projectsOrganized={projectsOrganized}
              selectProject={selectProject}
            />
            <ProjectSidebar
              currentProject={currentProject}
              isLoading={isLoading}
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
