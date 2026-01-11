import useProjects from "@hooks/useProjects";
import ProjectHero from "./components/ProjectHero";
import ProjectError from "./components/ProjectError";
import ProjectEditor from "./components/ProjectEditor";
import ProjectContent from "./components/ProjectContent";
import ProjectSidebar from "./components/ProjectSidebar";
import ProjectPanel from "./components/ProjectPanel";

/**
 * PROJECTS ROUTE
 * --------------
 * - /projects = List view of all projects
 * - /projects/:key = Detail view of specific project
 */
const Projects = () => {
  const {
    methods: {
      backToList,
      onSave,
      selectProject,
      setIsEditing,
      setIsFiltering,
      setIsTreeVisible,
    },
    state: {
      currentProject,
      error,
      filters,
      isEditing,
      isFiltering,
      isLoading,
      isLoadingList,
      isLoadingProject,
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
        backToList={backToList}
        filters={filters}
        isEditing={isEditing}
        isFiltering={isFiltering}
        isListView={isListView}
        isLoading={isLoading}
        isTreeShown={isTreeShown}
        setIsEditing={setIsEditing}
        setIsFiltering={setIsFiltering}
        setIsTreeVisible={setIsTreeVisible}
      />

      <div className="content">
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
              isLoadingList={isLoadingList}
              isLoadingProject={isLoadingProject}
              projectsOrganized={projectsOrganized}
              selectProject={selectProject}
            />
            <ProjectSidebar
              currentProject={currentProject}
              isLoadingList={isLoadingList}
              isLoadingProject={isLoadingProject}
            />
            <ProjectPanel
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
