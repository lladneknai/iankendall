import { Project } from "@shared";
import Tech from "./shared/Tech";
import Links from "./shared/Links";
import Company from "./shared/Company";
import ProjectFilters from "./ProjectFilters";

export default function ProjectSidebar({
  currentProject,
  isLoadingList,
  isLoadingProject,
}: {
  currentProject: Project | null;
  isLoadingList: boolean;
  isLoadingProject: boolean;
}) {
  return (
    <div className="content--sidebar">
      {currentProject && !isLoadingProject ? (
        <>
          <Company company={currentProject.company} />
          <Tech tech={currentProject.tech} />
          <Links links={currentProject.links} />
        </>
      ) : (
        !isLoadingProject && (
          <div
            className={`content--sidebar-filters${
              isLoadingList ? " loading" : ""
            }`}
          >
            <ProjectFilters isLoadingList={isLoadingList} />
          </div>
        )
      )}
    </div>
  );
}
