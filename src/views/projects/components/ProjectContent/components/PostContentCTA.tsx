import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { getCompanyData } from "../../shared/Company/lib/util";

export default function PostContentCTA({ company }: any) {
  const companyData = getCompanyData(company);

  return (
    //
    <div id="PostContentCTA">
      <Link to="/projects">
        <button type="button" className="btn btn--cta">
          <FontAwesomeIcon icon={faArrowLeft} />
          Projects Home
        </button>
      </Link>
      <Link to={`/projects?company=${company}`}>
        <button type="button" className="btn btn--cta">
          <FontAwesomeIcon icon={faFolderOpen} />
          More {companyData.name} Projects
        </button>
      </Link>
    </div>
  );
}
