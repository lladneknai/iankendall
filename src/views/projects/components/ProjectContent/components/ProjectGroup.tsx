import { ProjectListItem } from "@shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Tech from "../../shared/Tech";
import RevealOnScroll from "@/components/RevealOnScroll";

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
    <RevealOnScroll
      className="vertical"
      distance="25vh"
      duration="750ms"
      threshold={0.15}
    >
      <div className="project-group">
        <div className="project-group--years">{years}</div>
        <div className="project-group--label">
          <img height={25} src={`/img/icon/${img}`} />
          <div className="project-group--text">
            <p className="shop" style={{ color }}>
              {title}
            </p>
            <p className="pipe">|</p>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="project-group--content">
          {group.map((project) => (
            <RevealOnScroll
              className="vertical"
              distance="10vh"
              duration="750ms"
              threshold={0.1}
            >
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
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}
