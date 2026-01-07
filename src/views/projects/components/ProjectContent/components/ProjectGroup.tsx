import { ProjectListItem } from "@shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Tech from "../../shared/Tech";

export default function ProjectGroup({
  color,
  group,
  img,
  selectProject,
  subtitle,
  title,
  years,
}: {
  color: string;
  group: ProjectListItem[];
  img: string;
  selectProject: any;
  subtitle: string;
  title: string;
  years: string;
}) {
  const handleKeydownSelect = (e: any, key: string) => {
    if (e.key === "Enter" || e.key === " ") {
      selectProject(key);
    }
  };

  // Hide the group if NO matches
  if (group.length === 0) {
    return null;
  }

  return (
    <div className="project-group">
      <div className="project-group--years">{years}</div>
      <div className="project-group--label">
        <img height={25} src={`/img/icon/${img}`} />
        <p>
          <strong style={{ color }}>{title}</strong> | {subtitle}
        </p>
      </div>
      <div className="project-group--content">
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
    </div>
  );
}
