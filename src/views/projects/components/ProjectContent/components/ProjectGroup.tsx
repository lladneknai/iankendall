import { ProjectListItem } from "@shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Tech from "../../shared/Tech";

export default function ProjectGroup({
  group,
  selectProject,
  subtitle,
  title,
}: {
  group: ProjectListItem[];
  selectProject: any;
  subtitle: string;
  title: string;
}) {
  const handleKeydownSelect = (e: any, key: string) => {
    if (e.key === "Enter" || e.key === " ") {
      selectProject(key);
    }
  };

  return (
    <div className="project-group">
      <div className="col">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
      {group.map((project) => (
        <div
          className="project-card"
          key={project.key}
          onClick={() => selectProject(project.key)}
          onKeyDown={(e) => handleKeydownSelect(e, project.key)}
          role="button"
          tabIndex={0}
        >
          <h3>{project.name} </h3>
          <p>{project.description}</p>
          <Tech skipHeader tech={project.tech} />
          <p className="view-project">
            View project <FontAwesomeIcon icon={faArrowRightLong} />
          </p>
        </div>
      ))}
    </div>
  );
}
