import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faAt,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

export default function Links() {
  return (
    <div className="action-row">
      <Link to="/resume" className="social-icon">
        <FontAwesomeIcon className="social" icon={faNewspaper} />
        <h4>Resume</h4>
        <FontAwesomeIcon className="goto" icon={faArrowUpRightFromSquare} />
      </Link>
      <a href="https://github.com/lladneknai" className="social-icon">
        <FontAwesomeIcon className="social" icon={faGithub} />
        <h4>GitHub</h4>
        <FontAwesomeIcon className="goto" icon={faArrowUpRightFromSquare} />
      </a>
      <a href="https://www.linkedin.com/in/lladneknai/" className="social-icon">
        <FontAwesomeIcon className="social" icon={faLinkedin} />
        <h4>LinkedIn</h4>
        <FontAwesomeIcon className="goto" icon={faArrowUpRightFromSquare} />
      </a>
      <a href="mailto:iankendall17@gmail.com" className="social-icon">
        <FontAwesomeIcon className="social" icon={faAt} />
        <h4>Email</h4>
        <FontAwesomeIcon className="goto" icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
}
