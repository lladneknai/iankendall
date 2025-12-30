import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCode } from "@fortawesome/free-solid-svg-icons";
import {
  faKeyboard,
  faQuestionCircle,
  faWindowRestore,
} from "@fortawesome/free-regular-svg-icons";

export default function InternalLinks({ route }: { route: string }) {
  return (
    <div className="footer-row">
      <h5>More Here</h5>
      {route !== "code" && (
        <Link to="/code" className="item">
          <FontAwesomeIcon className="footer-icon" icon={faCode} />
          <p>Source Code</p>
          <FontAwesomeIcon className="goto" icon={faArrowRight} />
        </Link>
      )}
      {route !== "projects" && (
        <Link to="/projects" className="item">
          <FontAwesomeIcon className="footer-icon" icon={faWindowRestore} />
          <p>Projects</p>
          <FontAwesomeIcon className="goto" icon={faArrowRight} />
        </Link>
      )}

      {route !== "about" && (
        <a href="/about" className="item">
          <FontAwesomeIcon className="footer-icon" icon={faQuestionCircle} />
          <p>About Me</p>
          <FontAwesomeIcon className="goto" icon={faArrowRight} />
        </a>
      )}

      <a href="/contact" className="item">
        <FontAwesomeIcon className="footer-icon" icon={faKeyboard} />
        <p>Contact</p>
        <FontAwesomeIcon className="goto" icon={faArrowRight} />
      </a>
    </div>
  );
}
