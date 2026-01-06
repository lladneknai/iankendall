import { ProjectListItem } from "@shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Tech from "../../../shared/Tech";

export default function ProjectCard({
  project,
  selectProject,
}: {
  project: ProjectListItem;
  selectProject: (key: string) => void;
}) {
  const handleKeydownSelect = (e: any) => {
    if (e.key === "Enter" || e.key === " ") {
      selectProject(project.key);
    }
  };

  return (
    <div
      className="project-card"
      onClick={() => selectProject(project.key)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeydownSelect}
    >
      <h3>{project.name} </h3>
      <p>{project.description}</p>
      <Tech skipHeader tech={project.tech} />
      <p className="view-project">
        View project <FontAwesomeIcon icon={faArrowRightLong} />
      </p>
    </div>
  );
}
