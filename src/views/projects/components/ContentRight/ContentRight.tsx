import Links from "../shared/Links";
import { Project } from "@shared";
import Company from "../shared/Company";
import Tech from "../shared/Tech";
import LoadingBar from "@/components/LoadingBar";
import ProjectFilters from "../shared/ProjectFilters";

export default function ContentRight({
  // isFiltering, // use?
  isLoading,
  isListView,
  project,
}: {
  isFiltering: boolean;
  isLoading: boolean;
  isListView: boolean;
  project: Project | null;
}) {
  return (
    <div className="sidebar">
      {isLoading ? (
        <LoadingBar isLoading />
      ) : isListView ? (
        <>
          <h4>Filters</h4>
          <ProjectFilters />
        </>
      ) : project ? (
        <>
          <Company company={project.company} />
          <Tech tech={project.tech} />
          <Links links={project.links} />
        </>
      ) : (
        <>
          <h4>Fuck</h4>
          <p>Somethings up</p>
        </>
      )}
    </div>
  );

  if (isListView) {
    return <ProjectFilters />;
  }
  return (
    //
    <>ContentRight</>
  );
}
