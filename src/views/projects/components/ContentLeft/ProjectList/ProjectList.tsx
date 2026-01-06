import type { ProjectListProps } from "@shared";
import ProjectCard from "./components/ProjectCard";
import ProjectGroupTitle from "./components/ProjectGroupTitle";

/**
 * PROJECT LIST VIEW
 * -----------------
 * Shows organized list of all projects (displayed when on /projects base route)
 */
export default function ProjectList({
  projectsOrganized,
  selectProject,
}: ProjectListProps) {
  return (
    <div id="ProjectList" className="content">
      <div className="project-group">
        <ProjectGroupTitle
          subtitle="Senior UX Engineer (2023-present)"
          title="Phosphorus Cybersecurity"
        />
        {projectsOrganized.phosphorus.map((project) => (
          <ProjectCard
            key={project.key}
            project={project}
            selectProject={selectProject}
          />
        ))}
      </div>

      <div className="project-group">
        <ProjectGroupTitle
          subtitle="Full Stack Engineer (2021-23)"
          title="Built Technologies"
        />
        {projectsOrganized.built.map((project) => (
          <ProjectCard
            key={project.key}
            project={project}
            selectProject={selectProject}
          />
        ))}
      </div>

      <div className="project-group">
        <ProjectGroupTitle
          subtitle="Solution Architect (2019-21)"
          title="800 Pound Gorilla Media"
        />
        {projectsOrganized.eightHundred.map((project) => (
          <ProjectCard
            key={project.key}
            project={project}
            selectProject={selectProject}
          />
        ))}
      </div>

      <div className="project-group">
        <ProjectGroupTitle
          subtitle="Web Developer (2017-19)"
          title="FoxFuel Creative"
        />
        {projectsOrganized.foxfuel.map((project) => (
          <ProjectCard
            key={project.key}
            project={project}
            selectProject={selectProject}
          />
        ))}
      </div>
    </div>
  );
}
