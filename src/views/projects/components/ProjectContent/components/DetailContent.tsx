import { Project } from "@shared";

export default function DetailContent({ project }: { project: Project }) {
  return (
    <div className="content--main">
      <div className="header">
        <h3>{project.name}</h3>
      </div>
      <div
        className="cms-html"
        dangerouslySetInnerHTML={{
          __html: project.content,
        }}
      />
    </div>
  );
}
