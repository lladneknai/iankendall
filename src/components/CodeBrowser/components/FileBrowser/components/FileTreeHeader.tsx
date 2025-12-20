import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { CollapsibleProps } from "@shared";

export default function FileTreeHeader({
  isCollapsed,
  setIsCollapsed,
}: CollapsibleProps) {
  return (
    <>
      <button
        id="ExpandCollapseTree"
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
      >
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
      </button>

      <a href="https://github.com/lladneknai" className="repo-link">
        <h4>
          iankendall.me
          <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon className="goto" icon={faArrowUpRightFromSquare} />
        </h4>
      </a>
    </>
  );
}
