import { Project } from "@shared";
import PostContentCTA from "./PostContentCTA";

export default function DetailContent({ project }: { project: Project }) {
  return (
    <div className="content--main content--detail">
      <div className="header">
        <h3>{project.name}</h3>
      </div>
      <div
        className="cms-html"
        dangerouslySetInnerHTML={{
          __html: project.content,
        }}
      />
      <PostContentCTA company={project.company} />
    </div>
  );
}
