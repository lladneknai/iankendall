import { ProjectProps } from "@shared";
import Company from "./Company";
import Links from "./Links";
import Tech from "./Tech";

export default function ProjectDetailsSidebar({ project }: ProjectProps) {
  return (
    <div id="ProjectDetailsSidebar">
      <Tech tech={project.tech} />
      <Company company={project.company} />
      <Links links={project.links} />
    </div>
  );
}
