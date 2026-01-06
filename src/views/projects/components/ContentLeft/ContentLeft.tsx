import LoadingBar from "@components/LoadingBar";
import ProjectList from "./ProjectList";

/**
 * PROJECTS | LEFT CONTENT
 * - LIST VIEW: List of all projects
 * - DETAIL VIEW: Project detail content
 */
export default function ContentLeft({
  isListView,
  isLoading,
  project,
  projectsOrganized,
  selectProject,
}: any) {
  // {
  // isListView: boolean;
  // isLoading: boolean;
  // project: Project | null;
  // }
  if (isLoading) {
    return <LoadingBar isLoading />;
  }

  if (isListView) {
    return (
      <ProjectList
        projectsOrganized={projectsOrganized}
        selectProject={selectProject}
      />
    );
  }

  return (
    <div className="content">
      <div className="header">
        <h3>{project.name}</h3>
      </div>

      <div
        className="cms-html"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />

      {/* SO, with the two-col setup, this should be HANDLED */}
      {/* 
      <div className="details-mobile">
        <Company company={company} />
        <Tech tech={tech} />
        <Links links={links} />
      </div> */}
    </div>
  );
}
