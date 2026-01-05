import { ProjectProps } from "@shared";
import Company from "./Company";
import Links from "./Links";
import Tech from "./Tech";

export default function ProjectDetails({
  project: { company, content, links, tech },
}: ProjectProps) {
  return (
    <div id="ProjectDetails">
      <div className="non-xl-only">
        <Tech tech={tech} />
      </div>

      <div>
        <h4>About This Project</h4>
        <div
          className="cms-html"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <div className="non-xl-only">
        <Company company={company} />
      </div>

      <div className="non-xl-only">
        <Links links={links} />
      </div>
    </div>
  );
}
