import { Project } from "@shared";
import Tech from "./shared/Tech";
import Links from "./shared/Links";
import Company from "./shared/Company";
import ProjectFilters from "./shared/ProjectFilters";

export default function ProjectSidebar({
  isLoadingList,
  currentProject,
}: {
  currentProject: Project | null;
  isLoadingList: boolean;
}) {
  return (
    <div className="content--sidebar">
      {currentProject ? (
        <>
          <Company company={currentProject.company} />
          <Tech tech={currentProject.tech} />
          <Links links={currentProject.links} />
        </>
      ) : (
        <div
          className={`content--sidebar-filters${
            isLoadingList ? " loading" : ""
          }`}
        >
          <ProjectFilters />
        </div>
      )}
    </div>
  );
}
