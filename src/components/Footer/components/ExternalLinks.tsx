import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faAt,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

export default function ExternalLinks() {
  return (
    <div className="footer-row">
      <h5>More Elsewhere</h5>
      <Link to="/resume" className="item">
        <FontAwesomeIcon className="footer-icon" icon={faNewspaper} />
        <p>Resume</p>
        <FontAwesomeIcon
          className="goto external"
          icon={faArrowUpRightFromSquare}
        />
      </Link>
      <a href="https://github.com/lladneknai" className="item">
        <FontAwesomeIcon className="footer-icon" icon={faGithub} />
        <p>GitHub</p>
        <FontAwesomeIcon
          className="goto external"
          icon={faArrowUpRightFromSquare}
        />
      </a>
      <a href="https://www.linkedin.com/in/lladneknai/" className="item">
        <FontAwesomeIcon className="footer-icon" icon={faLinkedin} />
        <p>LinkedIn</p>
        <FontAwesomeIcon
          className="goto external"
          icon={faArrowUpRightFromSquare}
        />
      </a>
      <a href="mailto:iankendall17@gmail.com" className="item">
        <FontAwesomeIcon className="footer-icon" icon={faAt} />
        <p>Email</p>
        <FontAwesomeIcon
          className="goto external"
          icon={faArrowUpRightFromSquare}
        />
      </a>
    </div>
  );
}
