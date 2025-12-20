import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default function MessageHasSent({
  handleFinish,
}: {
  handleFinish: () => void;
}) {
  return (
    <>
      <h1>Message Sent!</h1>
      <div className="post-send-text">
        <p>Thanks &ndash; I&rsquo;ll get back to you.</p>
        <p>In the meantime, here&rsquo;s some more stuff to do.</p>
      </div>
      <div className="flex row gap-1">
        <Link to="/projects">
          <button type="button">
            See Projects
            <FontAwesomeIcon icon={faFolderOpen} />
          </button>
        </Link>
        <Link to="/about">
          <button type="button">
            About Me
            <FontAwesomeIcon icon={faUserSecret} />
          </button>
        </Link>
        <button type="button" onClick={handleFinish}>
          I&rsquo;m Finished
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
        </button>
      </div>
    </>
  );
}
