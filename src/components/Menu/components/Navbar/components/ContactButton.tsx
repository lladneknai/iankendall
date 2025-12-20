import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import ContactButtonFlightPath from "@components/FlightPaths/ContactButtonFlightPath";
import { useAppStore } from "@/store/appStore";
import { wait } from "@/util/promises";
import { ContactButtonProps } from "@shared";

export default function ContactButton({ handleContactClick }: ContactButtonProps) {
  const { pathname } = useLocation();
  const { hasSentMessage } = useAppStore();
  const isContactRoute = pathname === "/contact";

  const [showIcon, setShowIcon] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showFlightPath, setShowFlightPath] = useState(false);

  // Track if animation has already been triggered for this route visit
  const hasTriggeredAnimationRef = useRef(false);

  // When we navigate TO the contact route, trigger the animation sequence (once)
  useEffect(() => {
    async function handleContactRouteMount() {
      // Step 1: Immediately hide icon and show flight path
      setShowIcon(false);
      setShowFlightPath(true);

      // Step 2: After 1000ms, hide the entire button
      await wait(1000);
      setShowButton(false);
    }

    if (isContactRoute && showIcon && !hasTriggeredAnimationRef.current) {
      hasTriggeredAnimationRef.current = true;
      handleContactRouteMount();
    }
  }, [isContactRoute, showIcon]);

  // When we navigate AWAY from contact route, reset everything
  useEffect(() => {
    if (!isContactRoute && !hasSentMessage) {
      setShowIcon(true);
      setShowButton(true);
      setShowFlightPath(false);
      hasTriggeredAnimationRef.current = false;
    }
  }, [isContactRoute, hasSentMessage]);

  // Hide if message has been already sent
  if (hasSentMessage) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        id="ContactButton"
        disabled={!showButton}
        onClick={handleContactClick}
        className={showButton ? "" : "has-been-clicked"}
      >
        Contact
        {showIcon ? (
          <FontAwesomeIcon
            id="ContactIcon"
            icon={faPaperPlane}
            className="action-icon"
          />
        ) : (
          <div className="action-icon" />
        )}
      </button>
      {showFlightPath && <ContactButtonFlightPath />}
    </>
  );
}
