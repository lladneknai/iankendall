import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { IanKendallProps } from "@shared";

export default function IanKendall({ handleIanKendall }: IanKendallProps) {
  return (
    <div id="NavbarIan">
      <button onClick={handleIanKendall} type="button">
        Ian Kendall
      </button>
      <div id="NavbarSocials">
        <a href="https://github.com/lladneknai" className="social-icon">
          <FontAwesomeIcon className="social" icon={faGithub} />
          <FontAwesomeIcon className="goto" icon={faArrowUpRightFromSquare} />
        </a>
        <a
          href="https://www.linkedin.com/in/lladneknai"
          className="social-icon"
        >
          <FontAwesomeIcon className="social" icon={faLinkedinIn} />
          <FontAwesomeIcon className="goto" icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </div>
  );
}
