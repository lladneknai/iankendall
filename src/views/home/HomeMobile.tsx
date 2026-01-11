import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Desk from "@components/Desk";
import Room from "@components/Room";
import { useAppStore } from "@store/appStore";
import TypewriterReadOnly from "@components/TypewriterReadOnly";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCode } from "@fortawesome/free-solid-svg-icons";

/**
 * HOME (MOBILE)
 * -------------
 * - A simplified homepage for mobile
 * - The Typewriter types a welcome message once, and that's it.
 */
export default function HomeMobile() {
  const [className, setClassName] = useState("content hidden");
  const setIsMenuOpen = useAppStore((s) => s.setIsMenuOpen);
  const isWelcomeComplete = useAppStore((s) => s.isWelcomeComplete);

  // Trigger the content to slide up after the welcome message completes.
  useEffect(() => {
    if (isWelcomeComplete) {
      setClassName("content shown");
    }
  }, [isWelcomeComplete]);

  return (
    <Room>
      <Desk>
        <TypewriterReadOnly />
      </Desk>
      <div id="MobileHomeContent">
        <div className={className}>
          <h3>Hiya. I'm Ian.</h3>
          <p>Welcome to my corner of the Internet.</p>
          <div className="action-buttons">
            <Link to="/projects">
              <button className="btn mobile-btn">
                View Projects
                <FontAwesomeIcon icon={faFolderOpen} />
              </button>
            </Link>
            <Link to="/code">
              <button className="btn mobile-btn">
                View Code
                <FontAwesomeIcon icon={faCode} />
              </button>
            </Link>
            <button
              className="btn mobile-btn"
              onClick={() => setIsMenuOpen(true)}
            >
              Main Menu
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
    </Room>
  );
}
