import LoadingBar from "@/components/LoadingBar";
import ProjectGroup from "./components/ProjectGroup";
import DetailContent from "./components/DetailContent";

export default function ProjectContent({
  currentProject,
  isLoading,
  isLoadingList,
  projectsOrganized,
  selectProject,
}: any) {
  // Return loading state for ALL loading - REPLACE WITH A SKELETON
  if (isLoading) {
    return <LoadingBar isLoading />;
  }

  // Return details for selected project
  if (currentProject) {
    return <DetailContent project={currentProject} />;
  }

  // Return list view when non project selected
  return (
    <div
      id="ProjectList"
      className={`content--main ${isLoadingList ? " loading" : ""}`}
    >
      <div className="project-group--timeline" />
      <ProjectGroup
        color="#2d6bf8"
        group={projectsOrganized.phosphorus}
        img="phos.png"
        selectProject={selectProject}
        subtitle="Senior UX Engineer"
        title="Phosphorus Cybersecurity"
        years="2023 &ndash; Present"
      />
      <ProjectGroup
        color="#eb2134"
        group={projectsOrganized.built}
        img="built.svg"
        selectProject={selectProject}
        subtitle="Full Stack Engineer"
        title="Built Technologies"
        years="2021 &ndash; 2023"
      />
      <ProjectGroup
        color="#ffc403"
        group={projectsOrganized.eightHundred}
        img="800.webp"
        selectProject={selectProject}
        subtitle="Solution Architect"
        title="800 Pound Gorilla Media"
        years="2019 &ndash; 2021"
      />
      <ProjectGroup
        color="#fff"
        group={projectsOrganized.foxfuel}
        img="foxfuel.svg"
        selectProject={selectProject}
        subtitle="Web Developer"
        title="FoxFuel Creative"
        years="2017 &ndash; 2019"
      />
    </div>
  );
}
