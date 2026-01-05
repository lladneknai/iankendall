import { ProjectContentProps } from "@shared";
import Tech from "./components/Tech";
import Links from "./components/Links";
import Header from "./components/Header";
import Company from "./components/Company";
import ProjectEditor from "./components/ProjectEditor";
import ProjectDetailsSidebar from "./components/ProjectDetailsSidebar";

/**
 * PROJECT CONTENT
 * --------------
 * - View content for the selected project
 * - Data-driven via AMPT cloud storage and CRUD ops
 * - Edtable on page via Admin-only CMS (see ProjectEditor)
 */

const ProjectContent = ({
  isEditing,
  onSave,
  project,
  setIsEditing,
}: ProjectContentProps) => {
  if (isEditing) {
    return (
      <ProjectEditor
        onSave={onSave}
        project={project}
        setIsEditing={setIsEditing}
      />
    );
  }

  const {
    company,
    content,
    links,
    tech,
  } = project;
  return (
    <div id="ProjectContent">
      <Header
        name={project.name}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <div className="content">
        <div className="details">
          <div
            className="cms-html"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="non-xl-only">
            <Tech tech={tech} />
          </div>

          <div className="non-xl-only">
            <Company company={company} />
          </div>

          <div className="non-xl-only">
            <Links links={links} />
          </div>
        </div>
        <ProjectDetailsSidebar project={project} />
      </div>
    </div>
  );
};

export default ProjectContent;
