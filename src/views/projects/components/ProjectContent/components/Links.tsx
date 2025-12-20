import { ProjectLink } from "@shared";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Links({ links }: { links: ProjectLink[] }) {
  if (!links || links.length === 0) {
    return null;
  }
  return (
    <div>
      <h4>Links</h4>
      <ul>
        {links.map((link) => (
          <li key={link.url}>
            <div className="disc" />
            <Link className="link" to={link.url}>
              {link.title}
              <FontAwesomeIcon
                className="goto"
                icon={faArrowUpRightFromSquare}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
