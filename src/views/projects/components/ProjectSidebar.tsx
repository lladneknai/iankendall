import { Project } from "@shared";
import LoadingBar from "@components/LoadingBar";
import Tech from "./shared/Tech";
import Links from "./shared/Links";
import Company from "./shared/Company";
import ProjectFilters from "./shared/ProjectFilters";

export default function ProjectSidebar({
  isLoading,
  currentProject,
}: {
  currentProject: Project | null;
  isLoading: boolean;
}) {
  return (
    <div className="content--sidebar">
      {isLoading ? (
        <LoadingBar isLoading />
      ) : currentProject ? (
        <>
          <Company company={currentProject.company} />
          <Tech tech={currentProject.tech} />
          <Links links={currentProject.links} />
        </>
      ) : (
        <>
          <h4>Filters</h4>
          <ProjectFilters />
        </>
      )}
    </div>
  );
}
