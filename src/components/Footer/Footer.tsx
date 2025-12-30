import { useLocation } from "react-router-dom";
import CopyrightText from "./components/CopyrightText";
import ExternalLinks from "./components/ExternalLinks";
import InternalLinks from "./components/InternalLinks";

export default function Footer() {
  const { pathname } = useLocation();
  const route = pathname.split("/")[1] || "home";

  // Don't render on home or contact pages
  if (route === "home" || route === "contact") {
    return null;
  }

  return (
    <div id="Footer">
      <div className="footer-content">
        <div className="footer-links">
          <InternalLinks route={route} />
          <ExternalLinks />
        </div>
        <CopyrightText />
      </div>
    </div>
  );
}
