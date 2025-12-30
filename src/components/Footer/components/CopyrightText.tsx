import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

export default function CopyrightText() {
  const [shown, setShown] = useState(false);

  const year = useMemo(() => {
    const now = new Date();
    return now.getFullYear();
  }, []);

  return (
    <div className="footer-row copyright">
      <h5>Site Info</h5>
      <div
        className="item hoverable"
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <FontAwesomeIcon className="footer-icon" icon={faCopyright} />
        <p>{year} Ian Kendall</p>
      </div>
      <div className={`item showable ${shown ? "shown" : "hidden"}`}>
        <p>No unauthorized reuse.</p>
      </div>
    </div>
  );
}
