import LoadingBar from "@/components/LoadingBar";
import ProjectGroup from "./components/ProjectGroup";
import DetailContent from "./components/DetailContent";

export default function ProjectContent({
  currentProject,
  isLoading,
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
    <div id="ProjectList" className="content--main">
      <ProjectGroup
        subtitle="Senior UX Engineer (2023-present)"
        title="Phosphorus Cybersecurity"
        group={projectsOrganized.phosphorus}
        selectProject={selectProject}
      />
      <ProjectGroup
        subtitle="Full Stack Engineer (2021-23)"
        title="Built Technologies"
        group={projectsOrganized.built}
        selectProject={selectProject}
      />
      <ProjectGroup
        subtitle="Solution Architect (2019-21)"
        title="800 Pound Gorilla Media"
        group={projectsOrganized.eightHundred}
        selectProject={selectProject}
      />
      <ProjectGroup
        subtitle="Web Developer (2017-19)"
        title="FoxFuel Creative"
        group={projectsOrganized.foxfuel}
        selectProject={selectProject}
      />
    </div>
  );
}
